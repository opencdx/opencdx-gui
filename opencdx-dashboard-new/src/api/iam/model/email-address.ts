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
 * @interface EmailAddress
 */
export interface EmailAddress {
    /**
     * 
     * @type {string}
     * @memberof EmailAddress
     */
    'email'?: string;
    /**
     * 
     * @type {string}
     * @memberof EmailAddress
     */
    'type'?: Type;
}

export const Type = {
    EmailTypeNotSpecified: 'EMAIL_TYPE_NOT_SPECIFIED',
    EmailTypePersonal: 'EMAIL_TYPE_PERSONAL',
    EmailTypeWork: 'EMAIL_TYPE_WORK',
    EmailTypeOther: 'EMAIL_TYPE_OTHER',
    Unrecognized: 'UNRECOGNIZED'
} as const;

export type Type = typeof Type[keyof typeof Type];


