/* tslint:disable */
/* eslint-disable */
/**
 * Profile API
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import * as runtime from '../runtime';
import type {
  UpdateProfile200Response,
  UpdateProfileRequest,
  UpdateProfileRequestUpdatedProfile,
} from '../models/index';
import {
    UpdateProfile200ResponseFromJSON,
    UpdateProfile200ResponseToJSON,
    UpdateProfileRequestFromJSON,
    UpdateProfileRequestToJSON,
    UpdateProfileRequestUpdatedProfileFromJSON,
    UpdateProfileRequestUpdatedProfileToJSON,
} from '../models/index';

export interface GetProfileByIdRequest {
    id: string;
}

export interface UpdateProfileOperationRequest {
    updateProfileRequest: UpdateProfileRequest;
}

/**
 * 
 */
export class DefaultApi extends runtime.BaseAPI {

    /**
     * Get user profile by ID
     */
    async getProfileByIdRaw(requestParameters: GetProfileByIdRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<UpdateProfileRequestUpdatedProfile>> {
        if (requestParameters['id'] == null) {
            throw new runtime.RequiredError(
                'id',
                'Required parameter "id" was null or undefined when calling getProfileById().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/health/profile/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters['id']))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => UpdateProfileRequestUpdatedProfileFromJSON(jsonValue));
    }

    /**
     * Get user profile by ID
     */
    async getProfileById(requestParameters: GetProfileByIdRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<UpdateProfileRequestUpdatedProfile> {
        const response = await this.getProfileByIdRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Update user profile
     */
    async updateProfileRaw(requestParameters: UpdateProfileOperationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<UpdateProfile200Response>> {
        if (requestParameters['updateProfileRequest'] == null) {
            throw new runtime.RequiredError(
                'updateProfileRequest',
                'Required parameter "updateProfileRequest" was null or undefined when calling updateProfile().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/health/profile`,
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: UpdateProfileRequestToJSON(requestParameters['updateProfileRequest']),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => UpdateProfile200ResponseFromJSON(jsonValue));
    }

    /**
     * Update user profile
     */
    async updateProfile(requestParameters: UpdateProfileOperationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<UpdateProfile200Response> {
        const response = await this.updateProfileRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
