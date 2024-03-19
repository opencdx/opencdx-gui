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
package cdx.opencdx.config;

import io.netty.handler.ssl.SslContextBuilder;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.actuate.autoconfigure.tracing.zipkin.ZipkinWebClientBuilderCustomizer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.client.reactive.ReactorClientHttpConnector;
import reactor.netty.http.client.HttpClient;

/**
 * Configuration for WebClient
 */
@Configuration
@Slf4j
public class WebClientConfig {

    /**
     * Customizer for WebClient
     */
    public WebClientConfig() {
        // Explicit declaration to prevent this class from inadvertently being made instantiable
    }

    /**
     * Customizer for WebClient
     * @return ZipkinWebClientBuilderCustomizer
     */
    @Bean
    ZipkinWebClientBuilderCustomizer myCustomizer(@Value("${opencdx.client.trustStore}") String trustStore) {
        return webClientBuilder -> {
            final HttpClient httpClient = HttpClient.create().secure(ssl -> {
                try (InputStream certChain = new FileInputStream(trustStore)) {
                    ssl.sslContext(SslContextBuilder.forClient()
                            .trustManager(certChain)
                            .build());
                } catch (IOException e) {
                    log.error("Error creating SSL context", e);
                }
            });
            webClientBuilder
                    .clientConnector(new ReactorClientHttpConnector(httpClient))
                    .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE);
        };
    }
}
