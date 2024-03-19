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
package cdx.opencdx.commons.dto;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

class RequestActorAttributesTest {

    @Test
    void testRequestActorAttributes() {
        RequestActorAttributes attr = new RequestActorAttributes("actor", "patient");
        Assertions.assertEquals("actor", attr.getActor());
        Assertions.assertEquals("patient", attr.getPatient());
    }

    @Test
    void testRequestActorAttributesDefaultConstructor() {
        RequestActorAttributes attributes = new RequestActorAttributes();
        attributes.setActor("bob");
        attributes.setPatient("jim");

        Assertions.assertEquals("bob", attributes.getActor());
        Assertions.assertEquals("jim", attributes.getPatient());
    }
}
