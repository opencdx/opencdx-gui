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
package cdx.opencdx.audit.handlers;

import cdx.opencdx.audit.repository.OpenCDXAuditEventRepository;
import cdx.opencdx.commons.exceptions.OpenCDXInternal;
import cdx.opencdx.commons.service.impl.NoOpOpenCDXMessageServiceImpl;
import cdx.opencdx.grpc.audit.*;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.hubspot.jackson.datatype.protobuf.ProtobufModule;
import java.io.IOException;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.Mockito;

class OpenCDXAuditMessageHandlerTest {

    @Mock
    OpenCDXAuditEventRepository openCDXAuditEventRepository;

    @Test
    void receivedMessage() throws JsonProcessingException {
        this.openCDXAuditEventRepository = Mockito.mock(OpenCDXAuditEventRepository.class);
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.registerModule(new ProtobufModule());
        objectMapper.registerModule(new JavaTimeModule());

        AuditEvent event = AuditEvent.newBuilder()
                .setEventType(AuditEventType.AUDIT_EVENT_TYPE_USER_PHI_CREATED)
                .build();
        String json = objectMapper.writeValueAsString(event);
        OpenCDXAuditMessageHandler openCDXAuditMessageHandler = new OpenCDXAuditMessageHandler(
                objectMapper, new NoOpOpenCDXMessageServiceImpl(), openCDXAuditEventRepository);
        Assertions.assertDoesNotThrow(() -> openCDXAuditMessageHandler.receivedMessage(json.getBytes()));
    }

    @Test
    void ioExceptionTest() throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.registerModule(new ProtobufModule());
        objectMapper.registerModule(new JavaTimeModule());

        ObjectMapper mapper = Mockito.mock(ObjectMapper.class);
        AuditEvent event = AuditEvent.newBuilder()
                .setEventType(AuditEventType.AUDIT_EVENT_TYPE_USER_PHI_CREATED)
                .build();
        byte[] bytes = objectMapper.writeValueAsString(event).getBytes();

        Mockito.when(mapper.readValue(bytes, AuditEvent.class)).thenThrow(new IOException("Test"));
        OpenCDXAuditMessageHandler openCDXAuditMessageHandler = new OpenCDXAuditMessageHandler(
                mapper, new NoOpOpenCDXMessageServiceImpl(), openCDXAuditEventRepository);
        Assertions.assertThrows(OpenCDXInternal.class, () -> openCDXAuditMessageHandler.receivedMessage(bytes));
    }
}
