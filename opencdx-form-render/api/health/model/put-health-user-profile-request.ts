/* tslint:disable */
/* eslint-disable */
/**
 * OpenAPI definition
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: v0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


// May contain unused imports in some cases
// @ts-ignore
import type { UpdatedProfile } from './updated-profile';

/**
 * 
 * @export
 * @interface PutHealthUserProfileRequest
 */
export interface PutHealthUserProfileRequest {
    /**
     * 
     * @type {string}
     * @memberof PutHealthUserProfileRequest
     */
    'userId': string;
    /**
     * 
     * @type {string}
     * @memberof PutHealthUserProfileRequest
     */
    'id'?: string;
    /**
     * 
     * @type {string}
     * @memberof PutHealthUserProfileRequest
     */
    'nationalHealthId'?: string;
    /**
     * 
     * @type {UpdatedProfile}
     * @memberof PutHealthUserProfileRequest
     */
    'updatedProfile': UpdatedProfile;
}

