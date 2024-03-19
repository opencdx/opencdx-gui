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
package cdx.opencdx.client.service;

import cdx.opencdx.client.dto.OpenCDXCallCredentials;
import cdx.opencdx.client.exceptions.OpenCDXClientException;

/**
 * Interface for communicating with the Helloworld microservice.
 */
public interface OpenCDXHelloworldClient {
    /**
     * Method to gRPC Call Hello World Service sayHello() api.
     * @param name Name to pass
     * @param openCDXCallCredentials Call Credentials to use for send.
     * @return Message response.
     */
    String sayHello(String name, OpenCDXCallCredentials openCDXCallCredentials) throws OpenCDXClientException;
}
