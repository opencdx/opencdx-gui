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
package cdx.opencdx.communications.model;

import cdx.opencdx.grpc.communication.*;
import com.google.protobuf.Timestamp;
import org.bson.types.ObjectId;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

class OpenCDXNotificationEventModelTest {
    @Test
    void getProtobufMessage_1() {
        NotificationEvent notificationEvent = NotificationEvent.newBuilder(NotificationEvent.getDefaultInstance())
                .setEventId(ObjectId.get().toHexString())
                .setEmailTemplateId(ObjectId.get().toHexString())
                .setSmsTemplateId(ObjectId.get().toHexString())
                .setCreated(Timestamp.getDefaultInstance())
                .setModified(Timestamp.getDefaultInstance())
                .setCreator(ObjectId.get().toHexString())
                .setModifier(ObjectId.get().toHexString())
                .build();

        OpenCDXNotificationEventModel model = new OpenCDXNotificationEventModel(notificationEvent);

        Assertions.assertEquals(notificationEvent, model.getProtobufMessage());
    }

    @Test
    void getProtobufMessage_2() {
        NotificationEvent notificationEvent = NotificationEvent.newBuilder(NotificationEvent.getDefaultInstance())
                .setEventId(ObjectId.get().toHexString())
                .setEmailTemplateId(ObjectId.get().toHexString())
                .setSmsTemplateId(ObjectId.get().toHexString())
                .setMessageTemplateId(ObjectId.get().toHexString())
                .build();

        OpenCDXNotificationEventModel model = new OpenCDXNotificationEventModel(notificationEvent);

        Assertions.assertEquals(notificationEvent, model.getProtobufMessage());
    }

    @Test
    void getProtobufMessage_3() {
        OpenCDXNotificationEventModel model = new OpenCDXNotificationEventModel();
        Assertions.assertDoesNotThrow(() -> model.getProtobufMessage());
    }

    @Test
    void getProtobufMessage_4() {
        NotificationEvent notificationEvent = NotificationEvent.newBuilder(NotificationEvent.getDefaultInstance())
                .build();

        OpenCDXNotificationEventModel model = new OpenCDXNotificationEventModel(notificationEvent);

        Assertions.assertEquals(notificationEvent, model.getProtobufMessage());
    }
}
