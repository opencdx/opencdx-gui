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
import java.time.Instant;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 * Model for OpenCDXMessageModel in Mongo.  Features conversions
 * to Protobuf messages.
 */
@Data
@Builder
@AllArgsConstructor
@RequiredArgsConstructor
@Document("messages")
public class OpenCDXMessageModel {

    @Id
    private ObjectId id;

    private ObjectId patientId;
    private String title;
    private String message;

    private MessageType messageType;
    private MessageStatus messageStatus;

    private Instant created;
    private Instant modified;
    private ObjectId creator;
    private ObjectId modifier;

    /**
     * Constructor taking a Message and generating the Model
     * @param message Message to generate model for.
     */
    public OpenCDXMessageModel(Message message) {
        if (message.hasId()) {
            this.id = new ObjectId(message.getId());
        }
        this.patientId = new ObjectId(message.getPatientId());
        this.title = message.getTitle();
        this.message = message.getMessage();
        this.messageType = message.getType();
        this.messageStatus = message.getStatus();

        if (message.hasCreated()) {
            this.created = Instant.ofEpochSecond(
                    message.getCreated().getSeconds(), message.getCreated().getNanos());
        }
        if (message.hasModified()) {
            this.modified = Instant.ofEpochSecond(
                    message.getModified().getSeconds(), message.getModified().getNanos());
        }
        if (message.hasCreator()) {
            this.creator = new ObjectId(message.getCreator());
        }
        if (message.hasModifier()) {
            this.modifier = new ObjectId(message.getModifier());
        }
    }

    /**
     * Method to generate an Protobuf equivalent message
     * @return Message as the protobuf message.
     */
    public Message getProtobufMessage() {
        Message.Builder builder = Message.newBuilder();
        builder.setId(this.id.toHexString());

        builder.setPatientId(this.patientId.toHexString());

        builder.setTitle(this.title);
        builder.setType(this.messageType);
        builder.setStatus(this.messageStatus);
        builder.setMessage(this.message);

        if (this.created != null) {
            builder.setCreated(Timestamp.newBuilder()
                    .setSeconds(this.created.getEpochSecond())
                    .setNanos(this.created.getNano())
                    .build());
        }
        if (this.modified != null) {
            builder.setModified(Timestamp.newBuilder()
                    .setSeconds(this.modified.getEpochSecond())
                    .setNanos(this.modified.getNano())
                    .build());
        }
        if (this.creator != null) {
            builder.setCreator(this.creator.toHexString());
        }
        if (this.modified != null) {
            builder.setModifier(this.modifier.toHexString());
        }

        return builder.build();
    }
}
