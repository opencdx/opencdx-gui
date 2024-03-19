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
package cdx.opencdx.helloworld.service;

import cdx.opencdx.grpc.helloworld.HelloRequest;

/**
 * Interface for the HelloWorldService
 */
public interface OpenCDXHelloWorldService {
    /**
     * Process the HelloRequest
     * @param request request the process
     * @return Message generated for this request.
     */
    String sayHello(HelloRequest request);
}
