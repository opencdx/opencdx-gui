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
package cdx.opencdx.client.service.impl;

import cdx.opencdx.client.dto.OpenCDXCallCredentials;
import cdx.opencdx.client.exceptions.OpenCDXClientException;
import cdx.opencdx.client.service.OpenCDXTinkarClient;
import cdx.opencdx.grpc.tinkar.TinkarQueryRequest;
import cdx.opencdx.grpc.tinkar.TinkarQueryResponse;
import cdx.opencdx.grpc.tinkar.TinkarQueryServiceGrpc;
import io.grpc.Status;
import io.grpc.StatusRuntimeException;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class OpenCDXTinkarClientImplTest {

    @Mock
    TinkarQueryServiceGrpc.TinkarQueryServiceBlockingStub tinkarQueryServiceBlockingStub;

    OpenCDXTinkarClient openCDXTinkarClient;

    @BeforeEach
    void setUp() {
        this.tinkarQueryServiceBlockingStub = Mockito.mock(TinkarQueryServiceGrpc.TinkarQueryServiceBlockingStub.class);
        this.openCDXTinkarClient = new OpenCDXTinkarClientImpl(this.tinkarQueryServiceBlockingStub);
        Mockito.when(tinkarQueryServiceBlockingStub.withCallCredentials(Mockito.any()))
                .thenReturn(this.tinkarQueryServiceBlockingStub);
    }

    @AfterEach
    void tearDown() {
        Mockito.reset(this.tinkarQueryServiceBlockingStub);
    }

    @Test
    void searchTinkar() {
        Mockito.when(this.tinkarQueryServiceBlockingStub.searchTinkar(Mockito.any(TinkarQueryRequest.class)))
                .thenReturn(TinkarQueryResponse.getDefaultInstance());
        OpenCDXCallCredentials openCDXCallCredentials = new OpenCDXCallCredentials("Bearer");
        Assertions.assertEquals(
                TinkarQueryResponse.getDefaultInstance(),
                this.openCDXTinkarClient.searchTinkar(TinkarQueryRequest.getDefaultInstance(), openCDXCallCredentials));
    }

    @Test
    void searchTinkarException() {
        Mockito.when(this.tinkarQueryServiceBlockingStub.searchTinkar(Mockito.any(TinkarQueryRequest.class)))
                .thenThrow(new StatusRuntimeException(Status.INTERNAL));
        TinkarQueryRequest request = TinkarQueryRequest.getDefaultInstance();
        OpenCDXCallCredentials openCDXCallCredentials = new OpenCDXCallCredentials("Bearer");
        Assertions.assertThrows(
                OpenCDXClientException.class,
                () -> this.openCDXTinkarClient.searchTinkar(request, openCDXCallCredentials));
    }
}
