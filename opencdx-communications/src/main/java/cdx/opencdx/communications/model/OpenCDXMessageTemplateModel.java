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

import cdx.opencdx.grpc.communication.MessageTemplate;
import cdx.opencdx.grpc.communication.MessageType;
import com.google.protobuf.Timestamp;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 * Model for OpecCDXSMSTemplate in Mongo.  Features conversions
 * to Protobuf messages.
 */
@Data
@Builder
@AllArgsConstructor
@RequiredArgsConstructor
@Document("message-template")
public class OpenCDXMessageTemplateModel {

    @Id
    private ObjectId id;

    private List<String> variables;
    private String title;
    private String content;

    private MessageType messageType;

    private Instant created;
    private Instant modified;
    private ObjectId creator;
    private ObjectId modifier;

    /**
     * Constructor to create based on an MessageTemplate
     * @param template MessageTemplate for this model
     */
    public OpenCDXMessageTemplateModel(MessageTemplate template) {
        if (template.hasTemplateId()) {
            this.id = new ObjectId(template.getTemplateId());
        }
        this.variables = new ArrayList<>(template.getVariablesList());
        this.title = template.getTitle();
        this.content = template.getContent();
        this.messageType = template.getType();

        if (template.hasCreated()) {
            this.created = Instant.ofEpochSecond(
                    template.getCreated().getSeconds(), template.getCreated().getNanos());
        }
        if (template.hasModified()) {
            this.modified = Instant.ofEpochSecond(
                    template.getModified().getSeconds(), template.getModified().getNanos());
        }
        if (template.hasCreator()) {
            this.creator = new ObjectId(template.getCreator());
        }
        if (template.hasModifier()) {
            this.modifier = new ObjectId(template.getModifier());
        }
    }

    /**
     * Converts this model into an MessageTemplate
     * @return MessageTemplate of this model.
     */
    public MessageTemplate getProtobufMessage() {
        MessageTemplate.Builder builder = MessageTemplate.newBuilder();

        if (id != null) {
            builder.setTemplateId(this.id.toHexString());
        }
        if (variables != null) {
            builder.addAllVariables(this.variables);
        }
        if (title != null) {
            builder.setTitle(this.title);
        }
        if (content != null) {
            builder.setContent(this.content);
        }
        if (messageType != null) {
            builder.setType(this.messageType);
        }
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
