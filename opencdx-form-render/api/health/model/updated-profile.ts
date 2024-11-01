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
import type { DateOfBirth } from './date-of-birth';
// May contain unused imports in some cases
// @ts-ignore
import type { Email } from './email';
// May contain unused imports in some cases
// @ts-ignore
import type { FullName } from './full-name';
// May contain unused imports in some cases
// @ts-ignore
import type { Phone } from './phone';

/**
 * 
 * @export
 * @interface UpdatedProfile
 */
export interface UpdatedProfile {
    /**
     * 
     * @type {string}
     * @memberof UpdatedProfile
     */
    'userId': string;
    /**
     * 
     * @type {string}
     * @memberof UpdatedProfile
     */
    'id'?: string;
    /**
     * 
     * @type {string}
     * @memberof UpdatedProfile
     */
    'nationalHealthId'?: string;
    /**
     * 
     * @type {FullName}
     * @memberof UpdatedProfile
     */
    'fullName': FullName;
    /**
     * 
     * @type {DateOfBirth}
     * @memberof UpdatedProfile
     */
    'dateOfBirth'?: DateOfBirth;
    /**
     * 
     * @type {boolean}
     * @memberof UpdatedProfile
     */
    'isActive'?: boolean;
    /**
     * 
     * @type {Array<Email>}
     * @memberof UpdatedProfile
     */
    'email': Array<Email>;
    /**
     * 
     * @type {Array<Phone>}
     * @memberof UpdatedProfile
     */
    'phone'?: Array<Phone>;
}
