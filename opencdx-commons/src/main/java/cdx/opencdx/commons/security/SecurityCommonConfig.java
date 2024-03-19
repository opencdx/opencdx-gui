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
package cdx.opencdx.commons.security;

import cdx.opencdx.commons.annotations.ExcludeFromJacocoGeneratedReport;
import cdx.opencdx.commons.repository.OpenCDXIAMUserRepository;
import cdx.opencdx.commons.service.impl.OpenCDXUserDetailsServiceImpl;
import org.springframework.boot.autoconfigure.AutoConfiguration;
import org.springframework.context.annotation.*;
import org.springframework.security.core.userdetails.UserDetailsService;

/**
 * Application Configuration
 */
@AutoConfiguration
@Configuration
@Profile({"managed", "mongo"})
@ExcludeFromJacocoGeneratedReport
public class SecurityCommonConfig {

    private final JwtTokenFilter jwtTokenFilter;
    private final UserDetailsService userDetailsService;
    private final JwtTokenUtil jwtTokenUtil;

    /**
     * Security Common Configuration
     * @param openCDXIAMUserRepository Repository for accessing users.
     */
    public SecurityCommonConfig(OpenCDXIAMUserRepository openCDXIAMUserRepository) {
        this.userDetailsService = new OpenCDXUserDetailsServiceImpl(openCDXIAMUserRepository);
        this.jwtTokenUtil = new JwtTokenUtil();
        this.jwtTokenFilter = new JwtTokenFilter(jwtTokenUtil, userDetailsService);
    }

    /**
     * Get the GRPC Token Schema
     * @return JwtTokenGrpcSchema to use for users
     */
    @Bean
    @Primary
    public JwtTokenGrpcSchema jwtTokenGrpcSchema() {
        return new JwtTokenGrpcSchema(this.jwtTokenUtil, this.userDetailsService);
    }

    /**
     * UserDetailsService based on the OpenCDX
     * @return the UserDetailsService to use.
     */
    @Bean
    @Primary
    public UserDetailsService userDetailsService() {
        return this.userDetailsService;
    }

    /**
     * Utility bean for JWt tokens
     * @return JwtTokenUtil
     */
    @Primary
    @Bean
    public JwtTokenUtil jwtTokenUtil() {
        return this.jwtTokenUtil;
    }

    /**
     * The Token Filer for JWT
     * @return JwtTokenFilter for OpenCDX
     */
    @Primary
    @Bean
    public JwtTokenFilter jwtTokenFilter() {
        return this.jwtTokenFilter;
    }
}
