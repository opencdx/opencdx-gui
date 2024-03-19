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
package cdx.opencdx.client.config;

import static org.junit.jupiter.api.Assertions.*;

import io.micrometer.core.instrument.binder.grpc.ObservationGrpcClientInterceptor;
import io.micrometer.observation.ObservationRegistry;
import java.io.IOException;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.boot.test.mock.mockito.MockBean;

class ClientConfigTest {

    @MockBean
    ObservationGrpcClientInterceptor observationGrpcClientInterceptor;

    @MockBean
    ObservationRegistry observationRegistry;

    @Test
    void openCDXANFClient() throws IOException, NoSuchFieldException, IllegalAccessException {
        this.observationGrpcClientInterceptor = Mockito.mock(ObservationGrpcClientInterceptor.class);
        ClientConfig clientConfig = new ClientConfig();
        String server = "server";
        Integer port = 9090;
        String trustStore = "../certs/opencdx-clients.pem";
        clientConfig.observationGrpcClientInterceptor(observationRegistry);
        clientConfig.openCDXANFClient(server, port, trustStore, observationGrpcClientInterceptor);
        clientConfig.openCDXAuditClient(server, port, trustStore, observationGrpcClientInterceptor);
        clientConfig.openCDXClassificationClient(server, port, trustStore, observationGrpcClientInterceptor);
        clientConfig.openCDXCommunicationClient(server, port, trustStore, observationGrpcClientInterceptor);
        clientConfig.openCDXHelloworldClient(server, port, trustStore, observationGrpcClientInterceptor);
        clientConfig.openCDXIAMOrganizationClient(server, port, trustStore, observationGrpcClientInterceptor);
        clientConfig.openCDXIAMProfileClient(server, port, trustStore, observationGrpcClientInterceptor);
        clientConfig.openCDXIAMUserClient(server, port, trustStore, observationGrpcClientInterceptor);
        clientConfig.openCDXIAMWorkspaceClient(server, port, trustStore, observationGrpcClientInterceptor);
        clientConfig.openCDXPredictorClient(server, port, trustStore, observationGrpcClientInterceptor);
        clientConfig.openCDXProtectorClient(server, port, trustStore, observationGrpcClientInterceptor);
        clientConfig.openCDXProviderClient(server, port, trustStore, observationGrpcClientInterceptor);
        clientConfig.openCDXRoutineClient(server, port, trustStore, observationGrpcClientInterceptor);
        Assertions.assertNotNull(
                clientConfig.openCDXTinkarClient(server, port, trustStore, observationGrpcClientInterceptor));
    }
}
