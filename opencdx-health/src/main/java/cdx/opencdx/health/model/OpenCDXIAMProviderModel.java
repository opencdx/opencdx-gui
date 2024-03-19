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
package cdx.opencdx.health.model;

import cdx.opencdx.commons.model.OpenCDXCountryModel;
import cdx.opencdx.commons.repository.OpenCDXCountryRepository;
import cdx.opencdx.grpc.common.Address;
import cdx.opencdx.grpc.common.AddressPurpose;
import cdx.opencdx.grpc.provider.*;
import cdx.opencdx.health.dto.OpenCDXDtoNpiResult;
import com.google.protobuf.Timestamp;
import java.util.List;
import java.util.Optional;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 * Model for Provider in Mongo. Features conversions to/from Protobuf messages.
 */
@Slf4j
@Data
@Builder
@AllArgsConstructor
@RequiredArgsConstructor
@Document("provider")
@SuppressWarnings({"java:S3776", "java:S1117", "java:S116"})
public class OpenCDXIAMProviderModel {
    @Id
    private ObjectId id;

    private String userId;
    private String created_epoch;
    private String enumeration_type;
    private String last_updated_epoch;
    private String number;
    private List<Address> addresses;
    private List<String> practiceLocations;
    private BasicInfo basic;
    private List<Taxonomy> taxonomies;
    private List<Identifier> identifiers;
    private List<String> endpoints;
    private List<String> otherNames;
    private com.google.protobuf.Timestamp created;
    private com.google.protobuf.Timestamp modified;
    private String creator;
    private String modifier;
    private ProviderStatus status;

    /**
     * Constructor for Provider Model
     * @param result NPI Result
     * @param openCDXCountryRepository Country Repository
     */
    public OpenCDXIAMProviderModel(OpenCDXDtoNpiResult result, OpenCDXCountryRepository openCDXCountryRepository) {
        this.id = new ObjectId();
        this.created_epoch = result.getCreatedEpoch();
        this.enumeration_type = result.getEnumerationType();
        this.last_updated_epoch = result.getLastUpdatedEpoch();
        this.number = result.getNumber();

        this.addresses = result.getAddresses().stream()
                .map(address -> {
                    Address.Builder builder = Address.newBuilder();
                    Optional<OpenCDXCountryModel> byName =
                            openCDXCountryRepository.findByName(address.getCountryName());
                    byName.ifPresent(openCDXCountryModel ->
                            builder.setCountryId(openCDXCountryModel.getId().toHexString()));
                    builder.setAddressPurpose(AddressPurpose.valueOf(address.getAddressPurpose()));
                    builder.setAddress1(address.getAddress1());
                    builder.setCity(address.getCity());
                    builder.setState(address.getState());
                    builder.setPostalCode(address.getPostalCode());
                    return builder.build();
                })
                .toList();

        this.practiceLocations = result.getPracticeLocations();

        BasicInfo.Builder basicBuilder = BasicInfo.newBuilder();
        this.basic = basicBuilder
                .setFirstName(result.getBasic().getFirstName())
                .setLastName(result.getBasic().getLastName())
                .setCredential(result.getBasic().getCredential())
                .setSoleProprietor(result.getBasic().getSoleProprietor())
                .setGender(result.getBasic().getGender())
                .setEnumerationDate(result.getBasic().getEnumerationDate())
                .setStatus(ProviderStatus.VALIDATED)
                .setNamePrefix(result.getBasic().getNamePrefix())
                .setNameSuffix(result.getBasic().getNameSuffix())
                .build();
        this.taxonomies = result.getTaxonomies().stream()
                .map(taxonomy -> {
                    Taxonomy.Builder builder = Taxonomy.newBuilder();
                    builder.setCode(builder.getCode());
                    builder.setTaxonomyGroup(builder.getTaxonomyGroup());
                    builder.setDesc(builder.getDesc());
                    builder.setState(builder.getState());
                    builder.setLicense(builder.getLicense());
                    builder.setPrimary(builder.getPrimary());
                    return builder.build();
                })
                .toList();
        this.identifiers = result.getIdentifiers().stream()
                .map(identifiers -> {
                    Identifier.Builder builder = Identifier.newBuilder();
                    builder.setCode(identifiers.getCode());
                    builder.setDesc(identifiers.getDesc());
                    if (null != identifiers.getIssuer()) {
                        builder.setIssuer(identifiers.getIssuer());
                    }
                    builder.setIdentifier(identifiers.getIdentifier());
                    builder.setState(identifiers.getState());
                    return builder.build();
                })
                .toList();

        this.endpoints = result.getEndpoints().stream().map(Object::toString).toList();
        this.otherNames = result.getOtherNames().stream().map(Object::toString).toList();
        this.status = ProviderStatus.VALIDATED;
    }

    /**
     * Method to get the protobuf provider object
     * @return protobuf provider object
     */
    public Provider getProtobufMessage() {
        Provider.Builder builder = Provider.newBuilder();
        builder.setId(this.id.toHexString());
        if (this.userId != null) {
            builder.setUserId(this.userId);
        }
        if (this.created_epoch != null) {
            builder.setCreatedEpoch(this.created_epoch);
        }
        if (this.enumeration_type != null) {
            builder.setEnumerationType(this.enumeration_type);
        }
        if (this.last_updated_epoch != null) {
            builder.setLastUpdatedEpoch(this.last_updated_epoch);
        }
        if (this.number != null) {
            builder.setNumber(this.number);
        }
        if (this.addresses != null) {
            builder.addAllAddresses(this.addresses);
        }
        if (this.practiceLocations != null) {
            builder.addAllPracticeLocations(this.practiceLocations);
        }
        if (this.basic != null) {
            builder.setBasic(this.basic);
        }
        if (this.taxonomies != null) {
            builder.addAllTaxonomies(this.taxonomies);
        }
        if (this.identifiers != null) {
            builder.addAllIdentifiers(this.identifiers);
        }
        if (this.endpoints != null) {
            builder.addAllEndpoints(this.endpoints);
        }
        if (this.otherNames != null) {
            builder.addAllOtherNames(this.otherNames);
        }
        if (this.created != null) {
            builder.setCreated(Timestamp.newBuilder()
                    .setSeconds(this.created.getSeconds())
                    .setNanos(this.created.getNanos())
                    .build());
        }
        if (this.modified != null) {
            builder.setModified(Timestamp.newBuilder()
                    .setSeconds(this.modified.getSeconds())
                    .setNanos(this.modified.getNanos())
                    .build());
        }
        if (this.creator != null) {
            builder.setCreator(this.creator);
        }
        if (this.modifier != null) {
            builder.setModifier(this.modifier);
        }
        return builder.build();
    }
}
