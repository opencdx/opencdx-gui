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
package cdx.opencdx.logistics.repository;

import cdx.opencdx.logistics.model.OpenCDXShippingModel;
import io.micrometer.observation.annotation.Observed;
import java.util.Optional;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Repository for OpenCDXShippingModel
 */
@Repository
@Observed(name = "opencdx")
public interface OpenCDXShippingRepository extends MongoRepository<OpenCDXShippingModel, ObjectId> {
    /**
     * Method to find a shipping by tracking number.
     * @param trackingNumber Tracking number for the shipping.
     * @return Optional of OpenCDXShippingModel.
     */
    Optional<OpenCDXShippingModel> findByTrackingNumber(String trackingNumber);
}
