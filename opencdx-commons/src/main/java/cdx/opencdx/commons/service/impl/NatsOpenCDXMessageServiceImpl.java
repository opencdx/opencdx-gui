/*
 * Copyright 2024 Safe Health Systems, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package cdx.opencdx.commons.service.impl;

import cdx.opencdx.commons.annotations.ExcludeFromJacocoGeneratedReport;
import cdx.opencdx.commons.annotations.RetryAnnotation;
import cdx.opencdx.commons.exceptions.OpenCDXInternal;
import cdx.opencdx.commons.exceptions.OpenCDXNotAcceptable;
import cdx.opencdx.commons.handlers.OpenCDXMessageHandler;
import cdx.opencdx.commons.service.OpenCDXCurrentUser;
import cdx.opencdx.commons.service.OpenCDXMessageService;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.micrometer.observation.annotation.Observed;
import io.micrometer.tracing.Span;
import io.micrometer.tracing.TraceContext;
import io.micrometer.tracing.Tracer;
import io.nats.client.*;
import io.nats.client.api.*;
import java.io.IOException;
import java.time.Duration;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;

/**
 * NATS based implementation of OpenCDXMessageService
 */
@Slf4j
@Observed(name = "opencdx")
public class NatsOpenCDXMessageServiceImpl implements OpenCDXMessageService {

    private static final String DOMAIN = "NatsOpenCDXMessageServiceImpl";
    private static final String OPENCDX = "opencdx";
    private final Connection natsConnection;

    private final ObjectMapper objectMapper;
    private final String applicationName;
    private final Map<String, Dispatcher> subscriptionMap;

    private final OpenCDXCurrentUser openCDXCurrentUser;

    private final Tracer tracer;

    record NatsMessage(String spanId, String traceId, String parentId, String json) {}

    /**
     * Constructor for setting up NATS based OpenCDXMessageService
     * @param natsConnection NATS Connection
     * @param objectMapper Jackson Object Mapper
     * @param applicationName Name of the application
     * @param openCDXCurrentUser System for setting the current user
     * @param tracer Micrometer Tracer
     */
    public NatsOpenCDXMessageServiceImpl(
            Connection natsConnection,
            ObjectMapper objectMapper,
            @Value("${spring.application.name}") String applicationName,
            OpenCDXCurrentUser openCDXCurrentUser,
            Tracer tracer) {
        log.info("Creating NATS OpenCDXMessageService");
        this.openCDXCurrentUser = openCDXCurrentUser;
        this.subscriptionMap = new HashMap<>();
        this.applicationName = applicationName;
        this.natsConnection = natsConnection;
        this.objectMapper = objectMapper;
        this.tracer = tracer;

        try {
            JetStreamManagement jetStreamManagement = this.natsConnection.jetStreamManagement();
            StreamConfiguration configuration = StreamConfiguration.builder()
                    .name(OPENCDX)
                    .subjects(OpenCDXMessageService.SUBJECTS)
                    .maxAge(Duration.ofDays(7))
                    .maxConsumers(OpenCDXMessageService.SUBJECTS.size() + 2L)
                    .storageType(StorageType.File)
                    .noAck(false)
                    .build();

            StreamInfo streamInfo = jetStreamManagement.addStream(configuration);

            if (streamInfo != null) {
                log.info("JetStream created successfully: "
                        + streamInfo.getConfiguration().getName());
            } else {
                throw new OpenCDXInternal(DOMAIN, 3, "Failed to create JetStream");
            }
        } catch (JetStreamApiException | IOException e) {
            throw new OpenCDXInternal(DOMAIN, 2, "Failed to create JetStream", e);
        }
    }

    @Override
    @RetryAnnotation
    public void subscribe(String subject, OpenCDXMessageHandler handler) {
        log.info("Subscribing to: {}", subject);
        PushSubscribeOptions subscribeOptions = PushSubscribeOptions.builder().stream(OPENCDX)
                .durable(this.applicationName + "_" + subject.replace(".", "_"))
                .build();

        try {
            Dispatcher dispatcher = this.natsConnection.createDispatcher();
            natsConnection
                    .jetStream()
                    .subscribe(
                            subject,
                            dispatcher,
                            new NatsMessageHandler(handler, this.openCDXCurrentUser, this.objectMapper, this.tracer),
                            true,
                            subscribeOptions);

            this.subscriptionMap.put(subject, dispatcher);
        } catch (IOException | JetStreamApiException e) {
            throw new OpenCDXInternal(DOMAIN, 2, "Failed JetStream Subscribe", e);
        }
    }

    @Override
    @RetryAnnotation
    public void unSubscribe(String subject) {
        log.info("Unsubscribing from: {}", subject);
        Dispatcher dispatcher = this.subscriptionMap.get(subject);
        if (dispatcher != null) {
            dispatcher.unsubscribe(subject);
        }
        this.subscriptionMap.remove(subject);
    }

    @Override
    @RetryAnnotation
    @ExcludeFromJacocoGeneratedReport
    public void send(String subject, Object object) {

        Span span = this.tracer
                .spanBuilder()
                .setParent(Objects.requireNonNull(this.tracer.currentSpan()).context())
                .name("NATS: Producer")
                .remoteServiceName("NATS")
                .kind(Span.Kind.PRODUCER)
                .tag("nats.subject", subject)
                .start();

        try (Tracer.SpanInScope ws = tracer.withSpan(span)) {
            TraceContext context = span.context();

            String json = this.objectMapper
                    .writerWithDefaultPrettyPrinter()
                    .writeValueAsString(new NatsMessage(
                            context.spanId(),
                            context.traceId(),
                            context.parentId(),
                            this.objectMapper.writerWithDefaultPrettyPrinter().writeValueAsString(object)));
            log.debug("Sending Message: {}", subject);
            natsConnection.jetStream().publishAsync(subject, json.getBytes());
            log.debug("Message Sent: {}", subject);
        } catch (IOException e) {
            span.error(e);
            OpenCDXNotAcceptable openCDXNotAcceptable =
                    new OpenCDXNotAcceptable(DOMAIN, 1, "Failed NATS Publish on: " + object.toString(), e);
            openCDXNotAcceptable.setMetaData(new HashMap<>());
            openCDXNotAcceptable.getMetaData().put("Subject", subject);
            openCDXNotAcceptable.getMetaData().put("Object", object.toString());
            throw openCDXNotAcceptable;
        } finally {
            span.end();
        }
    }

    /**
     * Handler wrapper for NATS
     */
    @Slf4j
    protected static class NatsMessageHandler implements MessageHandler {
        final OpenCDXMessageHandler handler;

        private final OpenCDXCurrentUser openCDXCurrentUser;

        private final ObjectMapper objectMapper;

        private final Tracer tracer;

        @Value("${spring.application.name}")
        private String appName;

        /**
         * Constructor for wrapping a OpenCDXMessageHandler
         *
         * @param handler            OpenCDXMessageHandler to wrap.
         * @param openCDXCurrentUser System for setting the current user
         * @param objectMapper      Jackson Object Mapper
         * @param tracer             Micrometer Tracer
         */
        protected NatsMessageHandler(
                OpenCDXMessageHandler handler,
                OpenCDXCurrentUser openCDXCurrentUser,
                ObjectMapper objectMapper,
                Tracer tracer) {
            log.info("Creating NATS Message Handler");
            this.handler = handler;
            this.openCDXCurrentUser = openCDXCurrentUser;
            this.objectMapper = objectMapper;
            this.tracer = tracer;
        }

        @Override
        @SuppressWarnings("java:S1141")
        public void onMessage(Message msg) {
            this.openCDXCurrentUser.configureAuthentication("SYSTEM");
            log.debug("Received Message: {}", msg.getSubject());

            try {
                String json = new String(msg.getData());
                NatsMessage natsMessage = objectMapper.readValue(json, NatsMessage.class);

                TraceContext context = this.tracer
                        .traceContextBuilder()
                        .spanId(natsMessage.spanId())
                        .traceId(natsMessage.traceId())
                        .parentId(natsMessage.parentId())
                        .build();

                Span span = this.tracer
                        .spanBuilder()
                        .setParent(context)
                        .kind(Span.Kind.CONSUMER)
                        .remoteServiceName("NATS")
                        .tag("nats.subject", msg.getSubject())
                        .tag("nats.replyTo", msg.getReplyTo())
                        .tag("nats.url", msg.getConnection().getConnectedUrl())
                        .tag("nats.host", msg.getConnection().getServerInfo().getHost())
                        .tag("nats.port", msg.getConnection().getServerInfo().getPort())
                        .name("NATS: Consumer")
                        .start();

                try (Tracer.SpanInScope ws = this.tracer.withSpan(span)) {
                    processMessage(natsMessage);
                } catch (Throwable e) {
                    log.error("Failed to process message", e);
                    span.error(e);
                    throw e;
                } finally {
                    log.debug("Message Processed");
                    span.end();
                }

            } catch (IOException e) {
                throw new OpenCDXInternal(DOMAIN, 4, "Failed to read NATS Message", e);
            }

            log.debug("Received Message: {}", msg);
        }

        private void processMessage(NatsMessage natsMessage) {
            Span span = this.tracer.nextSpan();
            span.name(this.getClass().getCanonicalName());
            span.start();
            try (Tracer.SpanInScope ws = this.tracer.withSpan(span)) {
                log.debug("Received Message: \n{}", natsMessage.json);
                handler.receivedMessage(natsMessage.json().getBytes());
            } catch (Throwable e) {
                log.error("Failed to process message", e);
                span.error(e);
                throw e;
            } finally {
                log.debug("Message Processed");
                span.end();
            }
        }
    }
}
