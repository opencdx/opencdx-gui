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



/**
 * 
 * @export
 * @interface SignUpRequest
 */
export interface SignUpRequest {
    /**
     * 
     * @type {string}
     * @memberof SignUpRequest
     */
    'type'?: Type;
    /**
     * 
     * @type {string}
     * @memberof SignUpRequest
     */
    'firstName'?: string;
    /**
     * 
     * @type {string}
     * @memberof SignUpRequest
     */
    'lastName'?: string;
    /**
     * 
     * @type {string}
     * @memberof SignUpRequest
     */
    'username'?: string;
    /**
     * 
     * @type {string}
     * @memberof SignUpRequest
     */
    'password'?: string;

}

export const Type = {
    IamUserTypeUnspecified: 'IAM_USER_TYPE_UNSPECIFIED',
    IamUserTypeRegular: 'IAM_USER_TYPE_REGULAR',
    IamUserTypeSystem: 'IAM_USER_TYPE_SYSTEM',
    IamUserTypeTrial: 'IAM_USER_TYPE_TRIAL',
    Unrecognized: 'UNRECOGNIZED'
} as const;

export type Type = typeof Type[keyof typeof Type];


