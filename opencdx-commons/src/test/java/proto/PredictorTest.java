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
package proto;

import cdx.opencdx.grpc.neural.predictor.PredictorInput;
import cdx.opencdx.grpc.neural.predictor.PredictorRequest;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.hubspot.jackson.datatype.protobuf.ProtobufModule;
import java.util.List;
import lombok.extern.slf4j.Slf4j;
import org.bson.types.ObjectId;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

@Slf4j
class PredictorTest {
    ObjectMapper mapper;

    @BeforeEach
    void setup() {
        this.mapper = new ObjectMapper();
        mapper.registerModule(new ProtobufModule());
        mapper.registerModule(new JavaTimeModule());
    }

    @Test
    void testPredictorRequest() throws JsonProcessingException {
        PredictorRequest item = PredictorRequest.newBuilder()
                .setPredictorInput(PredictorInput.newBuilder()
                        .setEncounterId(ObjectId.get().toHexString())
                        .setTestId(ObjectId.get().toHexString())
                        .addAllTestFeatures(List.of("Feature 1", "Feature 2", "Feature 3"))
                        .build())
                .build();
        log.info("Item: \n{}", this.mapper.writerWithDefaultPrettyPrinter().writeValueAsString(item));
    }
}
