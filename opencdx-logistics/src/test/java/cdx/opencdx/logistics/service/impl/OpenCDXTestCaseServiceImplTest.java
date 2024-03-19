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
package cdx.opencdx.logistics.service.impl;

import cdx.opencdx.commons.exceptions.OpenCDXNotAcceptable;
import cdx.opencdx.commons.exceptions.OpenCDXNotFound;
import cdx.opencdx.commons.model.OpenCDXIAMUserModel;
import cdx.opencdx.commons.repository.OpenCDXCountryRepository;
import cdx.opencdx.commons.service.OpenCDXAuditService;
import cdx.opencdx.commons.service.OpenCDXCurrentUser;
import cdx.opencdx.commons.service.OpenCDXDocumentValidator;
import cdx.opencdx.grpc.inventory.TestCase;
import cdx.opencdx.grpc.inventory.TestCaseIdRequest;
import cdx.opencdx.logistics.controller.OpenCDXGrpcTestCaseController;
import cdx.opencdx.logistics.model.OpenCDXTestCaseModel;
import cdx.opencdx.logistics.repository.OpenCDXDeviceRepository;
import cdx.opencdx.logistics.repository.OpenCDXManufacturerRepository;
import cdx.opencdx.logistics.repository.OpenCDXTestCaseRepository;
import cdx.opencdx.logistics.repository.OpenCDXVendorRepository;
import cdx.opencdx.logistics.service.OpenCDXTestCaseService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.Optional;
import lombok.extern.slf4j.Slf4j;
import org.bson.types.ObjectId;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.AdditionalAnswers;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit.jupiter.SpringExtension;

@Slf4j
@ActiveProfiles({"test", "managed"})
@ExtendWith(SpringExtension.class)
@SpringBootTest(properties = {"spring.cloud.config.enabled=false", "mongock.enabled=false"})
class OpenCDXTestCaseServiceImplTest {

    @Autowired
    OpenCDXAuditService openCDXAuditService;

    @Autowired
    ObjectMapper objectMapper;

    @Autowired
    OpenCDXDocumentValidator openCDXDocumentValidator;

    @Mock
    OpenCDXCountryRepository openCDXCountryRepository;

    @Mock
    OpenCDXVendorRepository openCDXVendorRepository;

    @Mock
    OpenCDXTestCaseRepository openCDXTestCaseRepository;

    @Mock
    OpenCDXManufacturerRepository openCDXManufacturerRepository;

    @Mock
    OpenCDXDeviceRepository openCDXDeviceRepository;

    OpenCDXTestCaseService openCDXTestCaseService;

    OpenCDXGrpcTestCaseController openCDXGrpcTestCaseController;

    @Mock
    OpenCDXCurrentUser openCDXCurrentUser;

    @BeforeEach
    void setUp() {
        Mockito.when(this.openCDXCurrentUser.getCurrentUser())
                .thenReturn(OpenCDXIAMUserModel.builder().id(ObjectId.get()).build());
        Mockito.when(this.openCDXCurrentUser.getCurrentUser(Mockito.any(OpenCDXIAMUserModel.class)))
                .thenReturn(OpenCDXIAMUserModel.builder().id(ObjectId.get()).build());

        this.openCDXTestCaseService = new OpenCDXTestCaseServiceImpl(
                this.openCDXTestCaseRepository,
                openCDXCurrentUser,
                objectMapper,
                this.openCDXAuditService,
                this.openCDXDocumentValidator);
    }

    @AfterEach
    void tearDown() {}

    @Test
    void getTestCaseById() {
        Mockito.when(this.openCDXTestCaseRepository.save(Mockito.any(OpenCDXTestCaseModel.class)))
                .then(AdditionalAnswers.returnsFirstArg());
        Mockito.when(this.openCDXTestCaseRepository.findById(Mockito.any(ObjectId.class)))
                .thenReturn(Optional.empty());
        TestCaseIdRequest testCaseIdRequest = TestCaseIdRequest.newBuilder()
                .setTestCaseId(ObjectId.get().toHexString())
                .build();
        Assertions.assertThrows(
                OpenCDXNotFound.class, () -> this.openCDXTestCaseService.getTestCaseById(testCaseIdRequest));
    }

    @Test
    void addTestCase() throws JsonProcessingException {
        OpenCDXTestCaseModel openCDXTestCaseModel =
                OpenCDXTestCaseModel.builder().id(ObjectId.get()).build();
        Mockito.when(this.openCDXTestCaseRepository.save(Mockito.any(OpenCDXTestCaseModel.class)))
                .then(AdditionalAnswers.returnsFirstArg());
        Mockito.when(this.openCDXTestCaseRepository.findById(Mockito.any(ObjectId.class)))
                .thenReturn(Optional.of(openCDXTestCaseModel));
        TestCase testCase = TestCase.newBuilder()
                .setId(ObjectId.get().toHexString())
                .setManufacturerId(ObjectId.get().toHexString())
                .setVendorId(ObjectId.get().toHexString())
                .build();

        ObjectMapper mapper = Mockito.mock(ObjectMapper.class);
        Mockito.when(mapper.writeValueAsString(Mockito.any(OpenCDXTestCaseModel.class)))
                .thenThrow(JsonProcessingException.class);

        OpenCDXTestCaseServiceImpl openCDXTestCaseService1 = new OpenCDXTestCaseServiceImpl(
                this.openCDXTestCaseRepository,
                openCDXCurrentUser,
                mapper,
                this.openCDXAuditService,
                this.openCDXDocumentValidator);
        Assertions.assertThrows(OpenCDXNotAcceptable.class, () -> openCDXTestCaseService1.addTestCase(testCase));
    }

    @Test
    void addTestCase_2() throws JsonProcessingException {
        OpenCDXTestCaseModel openCDXTestCaseModel =
                OpenCDXTestCaseModel.builder().id(ObjectId.get()).build();
        Mockito.when(this.openCDXTestCaseRepository.save(Mockito.any(OpenCDXTestCaseModel.class)))
                .then(AdditionalAnswers.returnsFirstArg());
        Mockito.when(this.openCDXTestCaseRepository.findById(Mockito.any(ObjectId.class)))
                .thenReturn(Optional.of(openCDXTestCaseModel));
        TestCase testCase =
                TestCase.newBuilder().setId(ObjectId.get().toHexString()).build();

        ObjectMapper mapper = Mockito.mock(ObjectMapper.class);
        Mockito.when(mapper.writeValueAsString(Mockito.any(OpenCDXTestCaseModel.class)))
                .thenThrow(JsonProcessingException.class);

        OpenCDXTestCaseServiceImpl openCDXTestCaseService1 = new OpenCDXTestCaseServiceImpl(
                this.openCDXTestCaseRepository,
                openCDXCurrentUser,
                mapper,
                this.openCDXAuditService,
                this.openCDXDocumentValidator);
        Assertions.assertThrows(OpenCDXNotAcceptable.class, () -> openCDXTestCaseService1.addTestCase(testCase));
    }

    @Test
    void updateTestCase() throws JsonProcessingException {
        OpenCDXTestCaseModel openCDXTestCaseModel =
                OpenCDXTestCaseModel.builder().id(ObjectId.get()).build();
        Mockito.when(this.openCDXTestCaseRepository.save(Mockito.any(OpenCDXTestCaseModel.class)))
                .then(AdditionalAnswers.returnsFirstArg());
        Mockito.when(this.openCDXTestCaseRepository.findById(Mockito.any(ObjectId.class)))
                .thenReturn(Optional.of(openCDXTestCaseModel));
        TestCase testCase = TestCase.newBuilder()
                .setId(ObjectId.get().toHexString())
                .setManufacturerId(ObjectId.get().toHexString())
                .setVendorId(ObjectId.get().toHexString())
                .build();

        ObjectMapper mapper = Mockito.mock(ObjectMapper.class);
        Mockito.when(mapper.writeValueAsString(Mockito.any(OpenCDXTestCaseModel.class)))
                .thenThrow(JsonProcessingException.class);

        OpenCDXTestCaseServiceImpl openCDXTestCaseService1 = new OpenCDXTestCaseServiceImpl(
                this.openCDXTestCaseRepository,
                openCDXCurrentUser,
                mapper,
                this.openCDXAuditService,
                this.openCDXDocumentValidator);
        Assertions.assertThrows(OpenCDXNotAcceptable.class, () -> openCDXTestCaseService1.updateTestCase(testCase));
    }

    @Test
    void deleteTestCase() throws JsonProcessingException {
        OpenCDXTestCaseModel openCDXTestCaseModel =
                OpenCDXTestCaseModel.builder().id(ObjectId.get()).build();
        Mockito.when(this.openCDXTestCaseRepository.save(Mockito.any(OpenCDXTestCaseModel.class)))
                .then(AdditionalAnswers.returnsFirstArg());
        Mockito.when(this.openCDXTestCaseRepository.findById(Mockito.any(ObjectId.class)))
                .thenReturn(Optional.of(openCDXTestCaseModel));
        TestCaseIdRequest testCase = TestCaseIdRequest.newBuilder()
                .setTestCaseId(ObjectId.get().toHexString())
                .build();

        ObjectMapper mapper = Mockito.mock(ObjectMapper.class);
        Mockito.when(mapper.writeValueAsString(Mockito.any(OpenCDXTestCaseModel.class)))
                .thenThrow(JsonProcessingException.class);

        OpenCDXTestCaseServiceImpl openCDXTestCaseService1 = new OpenCDXTestCaseServiceImpl(
                this.openCDXTestCaseRepository,
                openCDXCurrentUser,
                mapper,
                this.openCDXAuditService,
                this.openCDXDocumentValidator);
        Assertions.assertThrows(OpenCDXNotAcceptable.class, () -> openCDXTestCaseService1.deleteTestCase(testCase));
    }

    @Test
    void deleteTestCaseOpenCDXNotFound() {
        Mockito.when(this.openCDXTestCaseRepository.findById(Mockito.any(ObjectId.class)))
                .thenReturn(Optional.empty());
        TestCaseIdRequest testCase = TestCaseIdRequest.newBuilder()
                .setTestCaseId(ObjectId.get().toHexString())
                .build();

        ObjectMapper mapper = Mockito.mock(ObjectMapper.class);

        OpenCDXTestCaseServiceImpl openCDXTestCaseService1 = new OpenCDXTestCaseServiceImpl(
                this.openCDXTestCaseRepository,
                openCDXCurrentUser,
                mapper,
                this.openCDXAuditService,
                this.openCDXDocumentValidator);
        Assertions.assertThrows(OpenCDXNotFound.class, () -> openCDXTestCaseService1.deleteTestCase(testCase));
    }
}
