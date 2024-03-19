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
import cdx.opencdx.audit.repository.OpenCDXAuditEventRepository;
import cdx.opencdx.grpc.audit.*;
import com.google.protobuf.Timestamp;
import io.grpc.stub.StreamObserver;
import org.bson.types.ObjectId;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit.jupiter.SpringExtension;

@ActiveProfiles({"test", "managed"})
@ExtendWith(SpringExtension.class)
@SpringBootTest(properties = {"spring.cloud.config.enabled=false", "mongock.enabled=false"})
class OpenCDXGrpcAuditControllerTest {

    OpenCDXGrpcAuditController openCDXGrpcAuditController;

    @Autowired
    OpenCDXAuditMessageHandler openCDXAuditMessageHandler;

    @MockBean
    OpenCDXAuditEventRepository openCDXAuditEventRepository;

    @BeforeEach
    void setup() {
        this.openCDXGrpcAuditController = new OpenCDXGrpcAuditController(this.openCDXAuditMessageHandler);
    }

    @Test
    void event() {
        StreamObserver<AuditStatus> responseObserver = Mockito.mock(StreamObserver.class);
        AuditEvent event = AuditEvent.newBuilder()
                .setEventType(AuditEventType.AUDIT_EVENT_TYPE_USER_PHI_CREATED)
                .setCreated(Timestamp.getDefaultInstance())
                .setAuditSource(AuditSource.getDefaultInstance())
                .setCreated(Timestamp.getDefaultInstance())
                .setModified(Timestamp.getDefaultInstance())
                .setCreator(ObjectId.get().toHexString())
                .setModifier(ObjectId.get().toHexString())
                .build();

        this.openCDXGrpcAuditController.event(event, responseObserver);

        Mockito.verify(responseObserver, Mockito.times(1))
                .onNext(AuditStatus.newBuilder().setSuccess(true).build());
        Mockito.verify(responseObserver, Mockito.times(1)).onCompleted();
    }
}
