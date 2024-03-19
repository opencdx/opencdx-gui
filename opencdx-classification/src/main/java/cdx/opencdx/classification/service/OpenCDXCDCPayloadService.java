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
package cdx.opencdx.classification.service;

import cdx.opencdx.classification.model.OpenCDXClassificationModel;

/**
 * Interface for the OpenCDXCDCPayloadService
 */
public interface OpenCDXCDCPayloadService {
    /**
     * Prepares a payload to be sent to CDC for a connected test.
     * @param model OpenCDXClassificationModel for this classification of the test.
     */
    void sendCDCPayloadMessage(OpenCDXClassificationModel model);
}
