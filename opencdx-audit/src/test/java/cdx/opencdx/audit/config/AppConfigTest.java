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
package cdx.opencdx.audit.config;

import cdx.opencdx.audit.repository.OpenCDXAuditEventRepository;
import cdx.opencdx.commons.security.JwtTokenFilter;
import cdx.opencdx.commons.service.OpenCDXMessageService;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.nats.client.Connection;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit.jupiter.SpringExtension;

@ActiveProfiles("test")
@ExtendWith(SpringExtension.class)
@SpringBootTest(properties = {"spring.cloud.config.enabled=false", "mongock.enabled=false"})
class AppConfigTest {

    @MockBean
    Connection connection;

    @Autowired
    AppConfig appConfig;

    @Mock
    ObjectMapper objectMapper;

    @Mock
    OpenCDXMessageService openCDXMessageService;

    @Mock
    OpenCDXAuditEventRepository openCDXAuditEventRepository;

    @MockBean
    JwtTokenFilter jwtTokenFilter;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void openCDXAuditMessageHandlerTest() {
        Assertions.assertNotNull(
                appConfig.openCDXAuditMessageHandler(objectMapper, openCDXMessageService, openCDXAuditEventRepository));
    }
}
