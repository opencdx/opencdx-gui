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
package cdx.opencdx.commons.model;

import cdx.opencdx.grpc.common.Address;
import cdx.opencdx.grpc.common.AddressPurpose;
import org.bson.types.ObjectId;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

class OpenCDXAddressModelTest {

    @Test
    void getProtobufMessage_1() {
        Address address = Address.newBuilder()
                .setAddress1("Address Line 1")
                .setAddress2("Address Line 2")
                .setAddress3("Address Line 3")
                .setCity("City")
                .setPostalCode("Postcode")
                .setState("State")
                .setCountryId(new ObjectId().toHexString())
                .setAddressPurpose(AddressPurpose.MAILING)
                .build();

        OpenCDXAddressModel model = new OpenCDXAddressModel(address);

        Assertions.assertEquals(address.getCity(), model.getProtobufMessage().getCity());
    }

    @Test
    void getProtobufMessage_2() {
        OpenCDXAddressModel model = new OpenCDXAddressModel();
        Assertions.assertDoesNotThrow(() -> model.getProtobufMessage());
    }
}
