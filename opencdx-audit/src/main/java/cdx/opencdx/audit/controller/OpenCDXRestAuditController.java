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
package cdx.opencdx.audit.controller;

import cdx.opencdx.audit.handlers.OpenCDXAuditMessageHandler;
import cdx.opencdx.grpc.audit.*;
import io.micrometer.observation.annotation.Observed;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Controller for mapping /audit/
 */
@Slf4j
@RestController
@RequestMapping(produces = MediaType.APPLICATION_JSON_VALUE)
@Observed(name = "opencdx")
public class OpenCDXRestAuditController {
    private final OpenCDXAuditMessageHandler openCDXAuditMessageHandler;

    /**
     * Constructor to handle processing by using the OpenCDXAuditMessageHandler.
     * @param openCDXAuditMessageHandler Handler for processing AuditEvents
     */
    public OpenCDXRestAuditController(OpenCDXAuditMessageHandler openCDXAuditMessageHandler) {
        this.openCDXAuditMessageHandler = openCDXAuditMessageHandler;
    }

    /**
     * Post Hello Rest API
     * @param request HelloRequest indicating who to say hello to.
     * @return HelloReply with the hello message.
     */
    @PostMapping(value = "/event", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<AuditStatus> event(@RequestBody AuditEvent request) {
        log.info("Received Audit Event from: {}", request.getAuditSource().getSystemInfo());
        this.openCDXAuditMessageHandler.processAuditEvent(request);

        return new ResponseEntity<>(AuditStatus.newBuilder().setSuccess(true).build(), HttpStatus.OK);
    }
}
