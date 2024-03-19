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
package cdx.opencdx.health.controller;

import cdx.opencdx.commons.exceptions.OpenCDXNotAcceptable;
import cdx.opencdx.commons.exceptions.OpenCDXNotFound;
import cdx.opencdx.commons.model.OpenCDXIAMUserModel;
import cdx.opencdx.commons.model.OpenCDXProfileModel;
import cdx.opencdx.commons.repository.OpenCDXProfileRepository;
import cdx.opencdx.commons.service.*;
import cdx.opencdx.commons.service.impl.OpenCDXClassificationMessageServiceImpl;
import cdx.opencdx.grpc.common.*;
import cdx.opencdx.grpc.connected.*;
import cdx.opencdx.health.model.OpenCDXConnectedTestModel;
import cdx.opencdx.health.repository.OpenCDXConnectedTestRepository;
import cdx.opencdx.health.service.OpenCDXConnectedTestService;
import cdx.opencdx.health.service.impl.OpenCDXConnectedTestServiceImpl;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.grpc.stub.StreamObserver;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.bson.types.ObjectId;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.AdditionalAnswers;
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

@ActiveProfiles({"test", "managed"})
@ExtendWith(SpringExtension.class)
@SpringBootTest(properties = {"spring.cloud.config.enabled=false", "mongock.enabled=false"})
class OpenCDXGrpcConnectedTestControllerTest {

    @Autowired
    OpenCDXAuditService openCDXAuditService;

    @Autowired
    ObjectMapper objectMapper;

    @Autowired
    OpenCDXDocumentValidator openCDXDocumentValidator;

    @Mock
    OpenCDXConnectedTestRepository openCDXConnectedTestRepository;

    OpenCDXConnectedTestService openCDXConnectedTestService;

    OpenCDXGrpcConnectedTestController openCDXGrpcConnectedTestController;

    @Mock
    OpenCDXProfileRepository openCDXProfileRepository;

    @Autowired
    OpenCDXCommunicationService openCDXCommunicationService;

    @Mock
    OpenCDXCurrentUser openCDXCurrentUser;

    @Autowired
    OpenCDXMessageService openCDXMessageService;

    OpenCDXClassificationMessageService openCDXClassificationMessageService;

    @BeforeEach
    void setUp() {
        Mockito.when(this.openCDXCurrentUser.getCurrentUser())
                .thenReturn(OpenCDXIAMUserModel.builder().id(ObjectId.get()).build());
        Mockito.when(this.openCDXCurrentUser.getCurrentUser(Mockito.any(OpenCDXIAMUserModel.class)))
                .thenReturn(OpenCDXIAMUserModel.builder().id(ObjectId.get()).build());

        Mockito.when(this.openCDXProfileRepository.findById(Mockito.any(ObjectId.class)))
                .thenAnswer(new Answer<Optional<OpenCDXProfileModel>>() {
                    @Override
                    public Optional<OpenCDXProfileModel> answer(InvocationOnMock invocation) throws Throwable {
                        ObjectId argument = invocation.getArgument(0);
                        return Optional.of(OpenCDXProfileModel.builder()
                                .id(argument)
                                .nationalHealthId(UUID.randomUUID().toString())
                                .fullName(FullName.newBuilder()
                                        .setFirstName("bob")
                                        .setLastName("bob")
                                        .build())
                                .gender(Gender.GENDER_FEMALE)
                                .primaryContactInfo(ContactInfo.newBuilder()
                                        .addAllEmails(List.of(EmailAddress.newBuilder()
                                                .setType(EmailType.EMAIL_TYPE_WORK)
                                                .setEmail("ab@safehealth.me")
                                                .build()))
                                        .addAllPhoneNumbers(List.of(PhoneNumber.newBuilder()
                                                .setType(PhoneType.PHONE_TYPE_MOBILE)
                                                .setNumber("1234567890")
                                                .build()))
                                        .build())
                                .build());
                    }
                });

        this.openCDXClassificationMessageService = new OpenCDXClassificationMessageServiceImpl(
                this.openCDXMessageService,
                this.openCDXDocumentValidator,
                this.openCDXProfileRepository,
                openCDXCurrentUser);

        this.openCDXConnectedTestService = new OpenCDXConnectedTestServiceImpl(
                this.openCDXAuditService,
                this.openCDXConnectedTestRepository,
                openCDXCurrentUser,
                objectMapper,
                openCDXCommunicationService,
                openCDXProfileRepository,
                openCDXDocumentValidator,
                openCDXClassificationMessageService);
        this.openCDXGrpcConnectedTestController =
                new OpenCDXGrpcConnectedTestController(this.openCDXConnectedTestService);
    }

    @AfterEach
    void tearDown() {}

    @Test
    void submitTest() {
        StreamObserver<TestSubmissionResponse> responseObserver = Mockito.mock(StreamObserver.class);
        ConnectedTest connectedTest = ConnectedTest.newBuilder(ConnectedTest.getDefaultInstance())
                .setBasicInfo(BasicInfo.newBuilder(BasicInfo.getDefaultInstance())
                        .setId(ObjectId.get().toHexString())
                        .setNationalHealthId(UUID.randomUUID().toString())
                        .setOrganizationId(ObjectId.get().toHexString())
                        .setWorkspaceId(ObjectId.get().toHexString())
                        .setPatientId(ObjectId.get().toHexString())
                        .build())
                .setTestDetails(TestDetails.newBuilder()
                        .setDeviceIdentifier(ObjectId.get().toHexString())
                        .setMediaId(ObjectId.get().toHexString())
                        .build())
                .build();
        Mockito.when(this.openCDXConnectedTestRepository.save(Mockito.any(OpenCDXConnectedTestModel.class)))
                .then(AdditionalAnswers.returnsFirstArg());
        this.openCDXGrpcConnectedTestController.submitTest(connectedTest, responseObserver);

        Mockito.verify(responseObserver, Mockito.times(1))
                .onNext(TestSubmissionResponse.newBuilder()
                        .setSubmissionId(connectedTest.getBasicInfo().getId())
                        .build());
        Mockito.verify(responseObserver, Mockito.times(1)).onCompleted();
    }

    @Test
    void getTestDetailsById() {
        StreamObserver<ConnectedTest> responseObserver = Mockito.mock(StreamObserver.class);
        Mockito.when(this.openCDXConnectedTestRepository.save(Mockito.any(OpenCDXConnectedTestModel.class)))
                .then(AdditionalAnswers.returnsFirstArg());

        OpenCDXConnectedTestModel openCDXConnectedTestModel =
                new OpenCDXConnectedTestModel(ConnectedTest.newBuilder(ConnectedTest.getDefaultInstance())
                        .setBasicInfo(BasicInfo.newBuilder()
                                .setId(ObjectId.get().toHexString())
                                .setNationalHealthId(UUID.randomUUID().toString())
                                .setPatientId(ObjectId.get().toHexString())
                                .build())
                        .build());

        Mockito.when(this.openCDXConnectedTestRepository.findById(Mockito.any(ObjectId.class)))
                .thenReturn(Optional.of(openCDXConnectedTestModel));
        TestIdRequest testIdRequest = TestIdRequest.newBuilder()
                .setTestId(ObjectId.get().toHexString())
                .build();
        this.openCDXGrpcConnectedTestController.getTestDetailsById(testIdRequest, responseObserver);

        Mockito.verify(responseObserver, Mockito.times(1)).onNext(openCDXConnectedTestModel.getProtobufMessage());
        Mockito.verify(responseObserver, Mockito.times(1)).onCompleted();
    }

    @Test
    void getTestDetailsByIdFail() {
        StreamObserver<ConnectedTest> responseObserver = Mockito.mock(StreamObserver.class);
        Mockito.when(this.openCDXConnectedTestRepository.save(Mockito.any(OpenCDXConnectedTestModel.class)))
                .then(AdditionalAnswers.returnsFirstArg());

        Mockito.when(this.openCDXConnectedTestRepository.findById(Mockito.any(ObjectId.class)))
                .thenReturn(Optional.empty());
        TestIdRequest testIdRequest = TestIdRequest.newBuilder()
                .setTestId(ObjectId.get().toHexString())
                .build();

        Assertions.assertThrows(
                OpenCDXNotFound.class,
                () -> this.openCDXGrpcConnectedTestController.getTestDetailsById(testIdRequest, responseObserver));
    }

    @Test
    void testListConnectedTests() {

        Mockito.when(this.openCDXConnectedTestRepository.findAllByPatientId(
                        Mockito.any(ObjectId.class), Mockito.any(Pageable.class)))
                .thenReturn(new PageImpl<>(Collections.EMPTY_LIST, PageRequest.of(1, 10), 1));

        StreamObserver<ConnectedTestListResponse> responseObserver = Mockito.mock(StreamObserver.class);
        ConnectedTestListRequest request = ConnectedTestListRequest.newBuilder()
                .setPagination(Pagination.newBuilder()
                        .setPageNumber(1)
                        .setPageSize(10)
                        .setSortAscending(true)
                        .build())
                .setPatientId(new ObjectId().toHexString())
                .build();
        this.openCDXGrpcConnectedTestController.listConnectedTests(request, responseObserver);

        Mockito.verify(responseObserver, Mockito.times(1)).onNext(Mockito.any());
        Mockito.verify(responseObserver, Mockito.times(1)).onCompleted();
    }

    @Test
    void testListConnectedTests_2() throws JsonProcessingException {

        Mockito.when(this.openCDXConnectedTestRepository.findAllByPatientId(
                        Mockito.any(ObjectId.class), Mockito.any(Pageable.class)))
                .thenReturn(new PageImpl<>(
                        List.of(OpenCDXConnectedTestModel.builder()
                                .nationalHealthId(UUID.randomUUID().toString())
                                .patientId(ObjectId.get())
                                .id(ObjectId.get())
                                .basicInfo(BasicInfo.newBuilder()
                                        .setPatientId(ObjectId.get().toHexString())
                                        .setNationalHealthId(UUID.randomUUID().toString())
                                        .build())
                                .build()),
                        PageRequest.of(1, 10),
                        1));
        ObjectMapper mapper = Mockito.mock(ObjectMapper.class);
        Mockito.when(mapper.writeValueAsString(Mockito.any())).thenThrow(JsonProcessingException.class);
        this.openCDXConnectedTestService = new OpenCDXConnectedTestServiceImpl(
                this.openCDXAuditService,
                this.openCDXConnectedTestRepository,
                openCDXCurrentUser,
                mapper,
                openCDXCommunicationService,
                openCDXProfileRepository,
                openCDXDocumentValidator,
                openCDXClassificationMessageService);
        this.openCDXGrpcConnectedTestController =
                new OpenCDXGrpcConnectedTestController(this.openCDXConnectedTestService);

        StreamObserver<ConnectedTestListResponse> responseObserver = Mockito.mock(StreamObserver.class);
        ConnectedTestListRequest request = ConnectedTestListRequest.newBuilder()
                .setPagination(Pagination.newBuilder()
                        .setPageNumber(1)
                        .setPageSize(10)
                        .setSortAscending(true)
                        .build())
                .setPatientId(new ObjectId().toHexString())
                .build();
        Assertions.assertThrows(
                OpenCDXNotAcceptable.class,
                () -> this.openCDXGrpcConnectedTestController.listConnectedTests(request, responseObserver));
    }

    @Test
    void testListConnectedTests_3() {

        Mockito.when(this.openCDXConnectedTestRepository.findAllByPatientId(
                        Mockito.any(ObjectId.class), Mockito.any(Pageable.class)))
                .thenReturn(new PageImpl<>(Collections.EMPTY_LIST, PageRequest.of(1, 10), 1));

        StreamObserver<ConnectedTestListResponse> responseObserver = Mockito.mock(StreamObserver.class);
        ConnectedTestListRequest request = ConnectedTestListRequest.newBuilder()
                .setPagination(Pagination.newBuilder()
                        .setPageNumber(1)
                        .setPageSize(10)
                        .setSortAscending(true)
                        .setSort("nationalHealthId")
                        .build())
                .setPatientId(new ObjectId().toHexString())
                .build();
        this.openCDXGrpcConnectedTestController.listConnectedTests(request, responseObserver);

        Mockito.verify(responseObserver, Mockito.times(1)).onNext(Mockito.any());
        Mockito.verify(responseObserver, Mockito.times(1)).onCompleted();
    }

    @Test
    void testListConnectedTests_4() {

        Mockito.when(this.openCDXConnectedTestRepository.findAllByPatientId(
                        Mockito.any(ObjectId.class), Mockito.any(Pageable.class)))
                .thenReturn(new PageImpl<>(Collections.EMPTY_LIST, PageRequest.of(1, 10), 1));

        StreamObserver<ConnectedTestListResponse> responseObserver = Mockito.mock(StreamObserver.class);
        ConnectedTestListRequest request = ConnectedTestListRequest.newBuilder()
                .setPagination(Pagination.newBuilder()
                        .setPageNumber(1)
                        .setPageSize(10)
                        .setSortAscending(false)
                        .setSort("nationalHealthId")
                        .build())
                .setPatientId(new ObjectId().toHexString())
                .build();
        this.openCDXGrpcConnectedTestController.listConnectedTests(request, responseObserver);

        Mockito.verify(responseObserver, Mockito.times(1)).onNext(Mockito.any());
        Mockito.verify(responseObserver, Mockito.times(1)).onCompleted();
    }

    @Test
    void testListConnectedByNIHTests() {

        Mockito.when(this.openCDXConnectedTestRepository.findAllByNationalHealthId(
                        Mockito.any(String.class), Mockito.any(Pageable.class)))
                .thenReturn(new PageImpl<>(Collections.EMPTY_LIST, PageRequest.of(1, 10), 1));

        StreamObserver<ConnectedTestListByNHIDResponse> responseObserver = Mockito.mock(StreamObserver.class);
        ConnectedTestListByNHIDRequest request = ConnectedTestListByNHIDRequest.newBuilder()
                .setPagination(Pagination.newBuilder()
                        .setPageNumber(1)
                        .setPageSize(10)
                        .setSortAscending(true)
                        .build())
                .setNationalHealthId(UUID.randomUUID().toString())
                .build();
        this.openCDXGrpcConnectedTestController.listConnectedTestsByNHID(request, responseObserver);

        Mockito.verify(responseObserver, Mockito.times(1)).onNext(Mockito.any());
        Mockito.verify(responseObserver, Mockito.times(1)).onCompleted();
    }

    @Test
    void testListConnectedByNIHTests_2() throws JsonProcessingException {

        Mockito.when(this.openCDXConnectedTestRepository.findAllByNationalHealthId(
                        Mockito.any(String.class), Mockito.any(Pageable.class)))
                .thenReturn(new PageImpl<>(
                        List.of(OpenCDXConnectedTestModel.builder()
                                .nationalHealthId(UUID.randomUUID().toString())
                                .patientId(ObjectId.get())
                                .id(ObjectId.get())
                                .basicInfo(BasicInfo.newBuilder()
                                        .setPatientId(ObjectId.get().toHexString())
                                        .setNationalHealthId(UUID.randomUUID().toString())
                                        .build())
                                .build()),
                        PageRequest.of(1, 10),
                        1));
        ObjectMapper mapper = Mockito.mock(ObjectMapper.class);
        Mockito.when(mapper.writeValueAsString(Mockito.any())).thenThrow(JsonProcessingException.class);
        this.openCDXConnectedTestService = new OpenCDXConnectedTestServiceImpl(
                this.openCDXAuditService,
                this.openCDXConnectedTestRepository,
                openCDXCurrentUser,
                mapper,
                openCDXCommunicationService,
                openCDXProfileRepository,
                openCDXDocumentValidator,
                openCDXClassificationMessageService);
        this.openCDXGrpcConnectedTestController =
                new OpenCDXGrpcConnectedTestController(this.openCDXConnectedTestService);

        StreamObserver<ConnectedTestListByNHIDResponse> responseObserver = Mockito.mock(StreamObserver.class);
        ConnectedTestListByNHIDRequest request = ConnectedTestListByNHIDRequest.newBuilder()
                .setPagination(Pagination.newBuilder()
                        .setPageNumber(1)
                        .setPageSize(10)
                        .setSortAscending(true)
                        .build())
                .setNationalHealthId(UUID.randomUUID().toString())
                .build();
        Assertions.assertThrows(
                OpenCDXNotAcceptable.class,
                () -> this.openCDXGrpcConnectedTestController.listConnectedTestsByNHID(request, responseObserver));
    }

    @Test
    void testListConnectedByNIHTests_3() {

        Mockito.when(this.openCDXConnectedTestRepository.findAllByNationalHealthId(
                        Mockito.any(String.class), Mockito.any(Pageable.class)))
                .thenReturn(new PageImpl<>(Collections.EMPTY_LIST, PageRequest.of(1, 10), 1));

        StreamObserver<ConnectedTestListByNHIDResponse> responseObserver = Mockito.mock(StreamObserver.class);
        ConnectedTestListByNHIDRequest request = ConnectedTestListByNHIDRequest.newBuilder()
                .setPagination(Pagination.newBuilder()
                        .setPageNumber(1)
                        .setPageSize(10)
                        .setSortAscending(true)
                        .setSort("nationalHealthId")
                        .build())
                .setNationalHealthId(UUID.randomUUID().toString())
                .build();
        this.openCDXGrpcConnectedTestController.listConnectedTestsByNHID(request, responseObserver);

        Mockito.verify(responseObserver, Mockito.times(1)).onNext(Mockito.any());
        Mockito.verify(responseObserver, Mockito.times(1)).onCompleted();
    }

    @Test
    void testListConnectedByNIHTests_4() {

        Mockito.when(this.openCDXConnectedTestRepository.findAllByNationalHealthId(
                        Mockito.any(String.class), Mockito.any(Pageable.class)))
                .thenReturn(new PageImpl<>(Collections.EMPTY_LIST, PageRequest.of(1, 10), 1));

        StreamObserver<ConnectedTestListByNHIDResponse> responseObserver = Mockito.mock(StreamObserver.class);
        ConnectedTestListByNHIDRequest request = ConnectedTestListByNHIDRequest.newBuilder()
                .setPagination(Pagination.newBuilder()
                        .setPageNumber(1)
                        .setPageSize(10)
                        .setSortAscending(false)
                        .setSort("nationalHealthId")
                        .build())
                .setNationalHealthId(UUID.randomUUID().toString())
                .build();
        this.openCDXGrpcConnectedTestController.listConnectedTestsByNHID(request, responseObserver);

        Mockito.verify(responseObserver, Mockito.times(1)).onNext(Mockito.any());
        Mockito.verify(responseObserver, Mockito.times(1)).onCompleted();
    }
}
