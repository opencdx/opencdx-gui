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
package cdx.opencdx.connected.lab.model;

import cdx.opencdx.grpc.common.Address;
import cdx.opencdx.grpc.common.ContactInfo;
import cdx.opencdx.grpc.common.EmailAddress;
import cdx.opencdx.grpc.common.PhoneNumber;
import cdx.opencdx.grpc.lab.connected.ConnectedLab;
import cdx.opencdx.grpc.lab.connected.LabMetaDataProcessor;
import java.time.Instant;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 * Model for OpenCDX Connected Lab
 */
@Slf4j
@Data
@Builder
@AllArgsConstructor
@RequiredArgsConstructor
@Document("connected-lab")
public class OpenCDXConnectedLabModel {
    @Id
    private ObjectId id;

    private String name;
    private String identifier;
    private ObjectId organizationId;
    private ObjectId workspaceId;
    private ContactInfo contactInfo;
    private Address labAddress;
    private EmailAddress labEmail;
    private PhoneNumber labPhone;
    private String labWebsite;
    private String labDescription;
    private List<String> labCertifications;
    private LabMetaDataProcessor labProcessor;
    private Instant created;
    private Instant modified;
    private ObjectId creator;
    private ObjectId modifier;

    /**
     * Constructor for OpenCDXConnectedLabModel
     * @param lab ConnectedLab to use
     */
    public OpenCDXConnectedLabModel(ConnectedLab lab) {
        if (lab.hasId()) {
            this.id = new ObjectId(lab.getId());
        }

        this.name = lab.getName();
        this.identifier = lab.getIdentifier();
        this.organizationId = new ObjectId(lab.getOrganizationId());
        this.workspaceId = new ObjectId(lab.getWorkspaceId());
        this.contactInfo = lab.getContactInfo();
        if (lab.hasLabAddress()) {
            this.labAddress = lab.getLabAddress();
        }
        if (lab.hasLabEmail()) {
            this.labEmail = lab.getLabEmail();
        }
        if (lab.hasLabPhone()) {
            this.labPhone = lab.getLabPhone();
        }
        this.labWebsite = lab.getLabWebsite();
        this.labDescription = lab.getLabDescription();
        this.labCertifications = lab.getLabCertificationsList();
        if (lab.hasLabProcessor()) {
            this.labProcessor = lab.getLabProcessor();
        }

        if (lab.hasCreated()) {
            this.created = Instant.ofEpochSecond(
                    lab.getCreated().getSeconds(), lab.getCreated().getNanos());
        }
        if (lab.hasModified()) {
            this.modified = Instant.ofEpochSecond(
                    lab.getModified().getSeconds(), lab.getModified().getNanos());
        }
        if (lab.hasCreator()) {
            this.creator = new ObjectId(lab.getCreator());
        }
        if (lab.hasModifier()) {
            this.modifier = new ObjectId(lab.getModifier());
        }
    }
    /**
     * Get the protobuf representation of this object
     * @return ConnectedLab protobuf
     */
    @SuppressWarnings("java:S3776")
    public ConnectedLab getProtobuf() {
        ConnectedLab.Builder builder = ConnectedLab.newBuilder();

        if (this.id != null) {
            builder.setId(this.id.toHexString());
        }
        if (this.name != null) {
            builder.setName(this.name);
        }
        if (this.identifier != null) {
            builder.setIdentifier(this.identifier);
        }
        if (this.organizationId != null) {
            builder.setOrganizationId(this.organizationId.toHexString());
        }
        if (this.workspaceId != null) {
            builder.setWorkspaceId(this.workspaceId.toHexString());
        }
        if (this.contactInfo != null) {
            builder.setContactInfo(this.contactInfo);
        }
        if (this.labAddress != null) {
            builder.setLabAddress(this.labAddress);
        }
        if (this.labEmail != null) {
            builder.setLabEmail(this.labEmail);
        }
        if (this.labPhone != null) {
            builder.setLabPhone(this.labPhone);
        }
        if (this.labWebsite != null) {
            builder.setLabWebsite(this.labWebsite);
        }
        if (this.labDescription != null) {
            builder.setLabDescription(this.labDescription);
        }
        if (this.labCertifications != null) {
            builder.addAllLabCertifications(this.labCertifications);
        }
        if (this.labProcessor != null) {
            builder.setLabProcessor(this.labProcessor);
        }
        if (this.created != null) {
            builder.setCreated(com.google.protobuf.Timestamp.newBuilder()
                    .setSeconds(this.created.getEpochSecond())
                    .setNanos(this.created.getNano())
                    .build());
        }
        if (this.modified != null) {
            builder.setModified(com.google.protobuf.Timestamp.newBuilder()
                    .setSeconds(this.modified.getEpochSecond())
                    .setNanos(this.modified.getNano())
                    .build());
        }
        if (this.creator != null) {
            builder.setCreator(this.creator.toHexString());
        }
        if (this.modifier != null) {
            builder.setModifier(this.modifier.toHexString());
        }

        return builder.build();
    }
}
