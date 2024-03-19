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
package cdx.opencdx.connected.lab.service.impl;

import static org.junit.jupiter.api.Assertions.*;

import cdx.opencdx.commons.exceptions.OpenCDXNotAcceptable;
import cdx.opencdx.commons.exceptions.OpenCDXNotFound;
import cdx.opencdx.commons.model.OpenCDXIAMUserModel;
import cdx.opencdx.commons.service.OpenCDXAuditService;
import cdx.opencdx.commons.service.OpenCDXCurrentUser;
import cdx.opencdx.connected.lab.config.OpenCDXLabConnectionFactoryBean;
import cdx.opencdx.connected.lab.model.OpenCDXConnectedLabModel;
import cdx.opencdx.connected.lab.repository.OpenCDXConnectedLabRepository;
import cdx.opencdx.connected.lab.service.OpenCDXConnectedLabService;
import cdx.opencdx.grpc.common.Pagination;
import cdx.opencdx.grpc.connected.BasicInfo;
import cdx.opencdx.grpc.lab.connected.*;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.protobuf.Timestamp;
import java.time.Instant;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import lombok.extern.slf4j.Slf4j;
import org.bson.types.ObjectId;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.invocation.InvocationOnMock;
import org.mockito.stubbing.Answer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit.jupiter.SpringExtension;

@Slf4j
@ActiveProfiles({"test", "managed"})
@ExtendWith(SpringExtension.class)
@SpringBootTest(properties = {"spring.cloud.config.enabled=false", "mongock.enabled=false"})
class OpenCDXConnectedLabServiceImplTest {
    @Autowired
    ObjectMapper objectMapper;

    @Autowired
    OpenCDXAuditService openCDXAuditService;

    @Autowired
    OpenCDXLabConnectionFactoryBean openCDXLabConnectionFactoryBean;

    @Mock
    OpenCDXCurrentUser openCDXCurrentUser;

    @Mock
    OpenCDXConnectedLabRepository openCDXConnectedLabRepository;

    OpenCDXConnectedLabService openCDXConnectedLabService;

    @BeforeEach
    void setUp() {
        Mockito.when(this.openCDXCurrentUser.getCurrentUser())
                .thenReturn(OpenCDXIAMUserModel.builder().id(ObjectId.get()).build());
        Mockito.when(this.openCDXCurrentUser.getCurrentUser(Mockito.any(OpenCDXIAMUserModel.class)))
                .thenReturn(OpenCDXIAMUserModel.builder().id(ObjectId.get()).build());

        Mockito.when(this.openCDXConnectedLabRepository.save(Mockito.any(OpenCDXConnectedLabModel.class)))
                .thenAnswer(new Answer<OpenCDXConnectedLabModel>() {
                    @Override
                    public OpenCDXConnectedLabModel answer(InvocationOnMock invocation) throws Throwable {
                        OpenCDXConnectedLabModel argument = invocation.getArgument(0);
                        if (argument.getId() == null) {
                            argument.setId(ObjectId.get());
                        }
                        return argument;
                    }
                });

        Mockito.when(this.openCDXConnectedLabRepository.findById(Mockito.any(ObjectId.class)))
                .thenAnswer(new Answer<Optional<OpenCDXConnectedLabModel>>() {
                    @Override
                    public Optional<OpenCDXConnectedLabModel> answer(InvocationOnMock invocation) throws Throwable {
                        ObjectId argument = invocation.getArgument(0);

                        return Optional.of(OpenCDXConnectedLabModel.builder()
                                .id(ObjectId.get())
                                .identifier("default")
                                .created(Instant.now())
                                .modified(Instant.now())
                                .creator(ObjectId.get())
                                .modifier(ObjectId.get())
                                .build());
                    }
                });
        Mockito.when(this.openCDXConnectedLabRepository.existsById(Mockito.any(ObjectId.class)))
                .thenReturn(true);

        Mockito.when(this.openCDXConnectedLabRepository.findAll(Mockito.any(Pageable.class)))
                .thenReturn(new PageImpl<>(
                        List.of(OpenCDXConnectedLabModel.builder()
                                .id(ObjectId.get())
                                .identifier("default")
                                .build()),
                        PageRequest.of(1, 10),
                        1));

        Mockito.when(this.openCDXConnectedLabRepository.findByOrganizationIdAndWorkspaceId(
                        Mockito.any(ObjectId.class), Mockito.any(ObjectId.class)))
                .thenAnswer(new Answer<Optional<OpenCDXConnectedLabModel>>() {
                    @Override
                    public Optional<OpenCDXConnectedLabModel> answer(InvocationOnMock invocation) throws Throwable {
                        ObjectId argument = invocation.getArgument(0);

                        return Optional.of(OpenCDXConnectedLabModel.builder()
                                .id(ObjectId.get())
                                .identifier("default")
                                .created(Instant.now())
                                .modified(Instant.now())
                                .creator(ObjectId.get())
                                .modifier(ObjectId.get())
                                .build());
                    }
                });

        this.openCDXConnectedLabService = new OpenCDXConnectedLabServiceImpl(
                openCDXCurrentUser,
                openCDXAuditService,
                objectMapper,
                openCDXConnectedLabRepository,
                openCDXLabConnectionFactoryBean);
    }

    @Test
    void submitLabFindings() {
        LabFindings labFindings = LabFindings.newBuilder()
                .setBasicInfo(BasicInfo.newBuilder()
                        .setOrganizationId(ObjectId.get().toHexString())
                        .setWorkspaceId(ObjectId.get().toHexString())
                        .build())
                .build();

        Assertions.assertDoesNotThrow(() -> this.openCDXConnectedLabService.submitLabFindings(labFindings));
    }

    @Test
    void createConnectedLab() {
        CreateConnectedLabRequest createConnectedLabRequest = CreateConnectedLabRequest.newBuilder()
                .setConnectedLab(ConnectedLab.newBuilder()
                        .setIdentifier("default")
                        .setOrganizationId(ObjectId.get().toHexString())
                        .setWorkspaceId(ObjectId.get().toHexString())
                        .setCreated(Timestamp.newBuilder().setSeconds(1000000).build())
                        .setModified(Timestamp.newBuilder().setSeconds(1000000).build())
                        .setCreator(ObjectId.get().toHexString())
                        .setModifier(ObjectId.get().toHexString())
                        .build())
                .build();

        Assertions.assertDoesNotThrow(
                () -> this.openCDXConnectedLabService.createConnectedLab(createConnectedLabRequest));
    }

    @Test
    void getConnectedLab() {
        GetConnectedLabRequest getConnectedLabRequest = GetConnectedLabRequest.newBuilder()
                .setConnectedLabId(ObjectId.get().toHexString())
                .build();

        Assertions.assertDoesNotThrow(() -> this.openCDXConnectedLabService.getConnectedLab(getConnectedLabRequest));
    }

    @Test
    void updateConnectedLab() {
        UpdateConnectedLabRequest createConnectedLabRequest = UpdateConnectedLabRequest.newBuilder()
                .setConnectedLab(ConnectedLab.newBuilder()
                        .setId(ObjectId.get().toHexString())
                        .setIdentifier("default")
                        .setOrganizationId(ObjectId.get().toHexString())
                        .setWorkspaceId(ObjectId.get().toHexString())
                        .setCreated(Timestamp.newBuilder().setSeconds(1000000).build())
                        .setModified(Timestamp.newBuilder().setSeconds(1000000).build())
                        .setCreator(ObjectId.get().toHexString())
                        .setModifier(ObjectId.get().toHexString())
                        .build())
                .build();

        Assertions.assertDoesNotThrow(
                () -> this.openCDXConnectedLabService.updateConnectedLab(createConnectedLabRequest));
    }

    @Test
    void deleteConnectedLab() {
        DeleteConnectedLabRequest deleteConnectedLabRequest = DeleteConnectedLabRequest.newBuilder()
                .setConnectedLabId(ObjectId.get().toHexString())
                .build();

        Assertions.assertDoesNotThrow(
                () -> this.openCDXConnectedLabService.deleteConnectedLab(deleteConnectedLabRequest));
    }

    @Test
    void listConnectedLabs() {
        ListConnectedLabsRequest listConnectedLabsRequest = ListConnectedLabsRequest.newBuilder()
                .setPagination(
                        Pagination.newBuilder().setPageNumber(1).setPageSize(10).build())
                .build();

        Assertions.assertDoesNotThrow(
                () -> this.openCDXConnectedLabService.listConnectedLabs(listConnectedLabsRequest));
    }

    @Test
    void listConnectedLabs_SortAsc() {
        ListConnectedLabsRequest listConnectedLabsRequest = ListConnectedLabsRequest.newBuilder()
                .setPagination(Pagination.newBuilder()
                        .setPageNumber(1)
                        .setPageSize(10)
                        .setSort("id")
                        .setSortAscending(true)
                        .build())
                .build();

        Assertions.assertDoesNotThrow(
                () -> this.openCDXConnectedLabService.listConnectedLabs(listConnectedLabsRequest));
    }

    @Test
    void listConnectedLabs_SortDesc() {
        ListConnectedLabsRequest listConnectedLabsRequest = ListConnectedLabsRequest.newBuilder()
                .setPagination(Pagination.newBuilder()
                        .setPageNumber(1)
                        .setPageSize(10)
                        .setSort("id")
                        .setSortAscending(false)
                        .build())
                .build();

        Assertions.assertDoesNotThrow(
                () -> this.openCDXConnectedLabService.listConnectedLabs(listConnectedLabsRequest));
    }

    @Test
    void listConnectedLabs_None() {
        Mockito.when(this.openCDXConnectedLabRepository.findAll(Mockito.any(Pageable.class)))
                .thenReturn(new PageImpl<>(Collections.emptyList(), PageRequest.of(1, 10), 1));

        this.openCDXConnectedLabService = new OpenCDXConnectedLabServiceImpl(
                openCDXCurrentUser,
                openCDXAuditService,
                objectMapper,
                openCDXConnectedLabRepository,
                openCDXLabConnectionFactoryBean);

        ListConnectedLabsRequest listConnectedLabsRequest = ListConnectedLabsRequest.newBuilder()
                .setPagination(
                        Pagination.newBuilder().setPageNumber(1).setPageSize(10).build())
                .build();

        Assertions.assertDoesNotThrow(
                () -> this.openCDXConnectedLabService.listConnectedLabs(listConnectedLabsRequest));
    }

    @Test
    void submitLabFindings_OnlyOrganization() {
        Mockito.when(this.openCDXConnectedLabRepository.findByOrganizationIdAndWorkspaceId(
                        Mockito.any(ObjectId.class), Mockito.any(ObjectId.class)))
                .thenReturn(Optional.empty());
        Mockito.when(this.openCDXConnectedLabRepository.findByOrganizationId(Mockito.any(ObjectId.class)))
                .thenAnswer(new Answer<Optional<OpenCDXConnectedLabModel>>() {
                    @Override
                    public Optional<OpenCDXConnectedLabModel> answer(InvocationOnMock invocation) throws Throwable {
                        ObjectId argument = invocation.getArgument(0);

                        return Optional.of(OpenCDXConnectedLabModel.builder()
                                .id(ObjectId.get())
                                .identifier("default")
                                .created(Instant.now())
                                .modified(Instant.now())
                                .creator(ObjectId.get())
                                .modifier(ObjectId.get())
                                .build());
                    }
                });
        this.openCDXConnectedLabService = new OpenCDXConnectedLabServiceImpl(
                openCDXCurrentUser,
                openCDXAuditService,
                objectMapper,
                openCDXConnectedLabRepository,
                openCDXLabConnectionFactoryBean);
        LabFindings labFindings = LabFindings.newBuilder()
                .setBasicInfo(BasicInfo.newBuilder()
                        .setOrganizationId(ObjectId.get().toHexString())
                        .setWorkspaceId(ObjectId.get().toHexString())
                        .build())
                .build();

        Assertions.assertDoesNotThrow(() -> this.openCDXConnectedLabService.submitLabFindings(labFindings));
    }

    @Test
    void createConnectedLab_OpenCDXNotAcceptable() throws JsonProcessingException {
        ObjectMapper mapper = Mockito.mock(ObjectMapper.class);
        Mockito.when(mapper.writeValueAsString(Mockito.any(OpenCDXConnectedLabModel.class)))
                .thenThrow(JsonProcessingException.class);

        this.openCDXConnectedLabService = new OpenCDXConnectedLabServiceImpl(
                openCDXCurrentUser,
                openCDXAuditService,
                mapper,
                openCDXConnectedLabRepository,
                openCDXLabConnectionFactoryBean);

        CreateConnectedLabRequest createConnectedLabRequest = CreateConnectedLabRequest.newBuilder()
                .setConnectedLab(ConnectedLab.newBuilder()
                        .setIdentifier("default")
                        .setOrganizationId(ObjectId.get().toHexString())
                        .setWorkspaceId(ObjectId.get().toHexString())
                        .setCreated(Timestamp.newBuilder().setSeconds(1000000).build())
                        .setModified(Timestamp.newBuilder().setSeconds(1000000).build())
                        .setCreator(ObjectId.get().toHexString())
                        .setModifier(ObjectId.get().toHexString())
                        .build())
                .build();

        Assertions.assertThrows(
                OpenCDXNotAcceptable.class,
                () -> this.openCDXConnectedLabService.createConnectedLab(createConnectedLabRequest));
    }

    @Test
    void updateConnectedLab_OpenCDXNotAcceptable() throws JsonProcessingException {
        ObjectMapper mapper = Mockito.mock(ObjectMapper.class);
        Mockito.when(mapper.writeValueAsString(Mockito.any(OpenCDXConnectedLabModel.class)))
                .thenThrow(JsonProcessingException.class);

        this.openCDXConnectedLabService = new OpenCDXConnectedLabServiceImpl(
                openCDXCurrentUser,
                openCDXAuditService,
                mapper,
                openCDXConnectedLabRepository,
                openCDXLabConnectionFactoryBean);

        UpdateConnectedLabRequest createConnectedLabRequest = UpdateConnectedLabRequest.newBuilder()
                .setConnectedLab(ConnectedLab.newBuilder()
                        .setId(ObjectId.get().toHexString())
                        .setIdentifier("default")
                        .setOrganizationId(ObjectId.get().toHexString())
                        .setWorkspaceId(ObjectId.get().toHexString())
                        .setCreated(Timestamp.newBuilder().setSeconds(1000000).build())
                        .setModified(Timestamp.newBuilder().setSeconds(1000000).build())
                        .setCreator(ObjectId.get().toHexString())
                        .setModifier(ObjectId.get().toHexString())
                        .build())
                .build();

        Assertions.assertThrows(
                OpenCDXNotAcceptable.class,
                () -> this.openCDXConnectedLabService.updateConnectedLab(createConnectedLabRequest));
    }

    @Test
    void deleteConnectedLab_OpenCDXNotAcceptable() throws JsonProcessingException {
        ObjectMapper mapper = Mockito.mock(ObjectMapper.class);
        Mockito.when(mapper.writeValueAsString(Mockito.any(OpenCDXConnectedLabModel.class)))
                .thenThrow(JsonProcessingException.class);

        this.openCDXConnectedLabService = new OpenCDXConnectedLabServiceImpl(
                openCDXCurrentUser,
                openCDXAuditService,
                mapper,
                openCDXConnectedLabRepository,
                openCDXLabConnectionFactoryBean);

        DeleteConnectedLabRequest deleteConnectedLabRequest = DeleteConnectedLabRequest.newBuilder()
                .setConnectedLabId(ObjectId.get().toHexString())
                .build();

        Assertions.assertThrows(
                OpenCDXNotAcceptable.class,
                () -> this.openCDXConnectedLabService.deleteConnectedLab(deleteConnectedLabRequest));
    }

    @Test
    void getConnectedLab_OpenCDXNotFound() throws JsonProcessingException {
        this.openCDXConnectedLabRepository = Mockito.mock(OpenCDXConnectedLabRepository.class);
        Mockito.when(this.openCDXConnectedLabRepository.findById(Mockito.any(ObjectId.class)))
                .thenReturn(Optional.empty());

        this.openCDXConnectedLabService = new OpenCDXConnectedLabServiceImpl(
                openCDXCurrentUser,
                openCDXAuditService,
                objectMapper,
                openCDXConnectedLabRepository,
                openCDXLabConnectionFactoryBean);

        GetConnectedLabRequest getConnectedLabRequest = GetConnectedLabRequest.newBuilder()
                .setConnectedLabId(ObjectId.get().toHexString())
                .build();

        Assertions.assertThrows(
                OpenCDXNotFound.class, () -> this.openCDXConnectedLabService.getConnectedLab(getConnectedLabRequest));
    }

    @Test
    void updateConnectedLab_OpenCDXNotFound() throws JsonProcessingException {
        this.openCDXConnectedLabRepository = Mockito.mock(OpenCDXConnectedLabRepository.class);
        Mockito.when(this.openCDXConnectedLabRepository.findById(Mockito.any(ObjectId.class)))
                .thenReturn(Optional.empty());

        this.openCDXConnectedLabService = new OpenCDXConnectedLabServiceImpl(
                openCDXCurrentUser,
                openCDXAuditService,
                objectMapper,
                openCDXConnectedLabRepository,
                openCDXLabConnectionFactoryBean);

        UpdateConnectedLabRequest createConnectedLabRequest = UpdateConnectedLabRequest.newBuilder()
                .setConnectedLab(ConnectedLab.newBuilder()
                        .setId(ObjectId.get().toHexString())
                        .setIdentifier("default")
                        .setOrganizationId(ObjectId.get().toHexString())
                        .setWorkspaceId(ObjectId.get().toHexString())
                        .setCreated(Timestamp.newBuilder().setSeconds(1000000).build())
                        .setModified(Timestamp.newBuilder().setSeconds(1000000).build())
                        .setCreator(ObjectId.get().toHexString())
                        .setModifier(ObjectId.get().toHexString())
                        .build())
                .build();

        Assertions.assertThrows(
                OpenCDXNotFound.class,
                () -> this.openCDXConnectedLabService.updateConnectedLab(createConnectedLabRequest));
    }

    @Test
    void deleteConnectedLab_OpenCDXNotFound() throws JsonProcessingException {
        this.openCDXConnectedLabRepository = Mockito.mock(OpenCDXConnectedLabRepository.class);
        Mockito.when(this.openCDXConnectedLabRepository.findById(Mockito.any(ObjectId.class)))
                .thenReturn(Optional.empty());

        this.openCDXConnectedLabService = new OpenCDXConnectedLabServiceImpl(
                openCDXCurrentUser,
                openCDXAuditService,
                objectMapper,
                openCDXConnectedLabRepository,
                openCDXLabConnectionFactoryBean);

        DeleteConnectedLabRequest deleteConnectedLabRequest = DeleteConnectedLabRequest.newBuilder()
                .setConnectedLabId(ObjectId.get().toHexString())
                .build();

        Assertions.assertThrows(
                OpenCDXNotFound.class,
                () -> this.openCDXConnectedLabService.deleteConnectedLab(deleteConnectedLabRequest));
    }
}
