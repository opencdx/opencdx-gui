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
package cdx.opencdx.communications.service;

import cdx.opencdx.grpc.communication.Attachment;
import java.util.List;

/**
 * Interface for sending emails using OpenCDXEmailService.
 * @implSpec Implement this interface using your Email system.
 * @implNote Current implementation does not send the email, just outputs the email to logging
 * for verification it was called, for demonstration purposes only.
 */
public interface OpenCDXEmailService {
    /**
     * Call to send en email to the specified users.
     * @param subject A string containing the subject of the email.
     * @param content A string containing the content of the email for the body.
     * @param toEmails List of email addresses to be used for the email to field.
     * @param ccEmails List of email addresses to be used for the carbon copy email field.
     * @param bccEmails list of email addresses to be used for the blind carbon copy.
     * @param attachments List of attachments to add on the email.
     * @return boolean indicating if successful.
     */
    boolean sendEmail(
            String subject,
            String content,
            List<String> toEmails,
            List<String> ccEmails,
            List<String> bccEmails,
            List<Attachment> attachments);
}
