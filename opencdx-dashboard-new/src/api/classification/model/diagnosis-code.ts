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
import type { ANFStatement } from './anfstatement';

/**
 * 
 * @export
 * @interface DiagnosisCode
 */
export interface DiagnosisCode {
    /**
     * 
     * @type {ANFStatement}
     * @memberof DiagnosisCode
     */
    'anfStatement'?: ANFStatement;
    /**
     * 
     * @type {string}
     * @memberof DiagnosisCode
     */
    'tinkarCode'?: string;
    /**
     * 
     * @type {{ [key: string]: string; }}
     * @memberof DiagnosisCode
     * @deprecated
     */
    'valueMap'?: { [key: string]: string; };
    /**
     * 
     * @type {string}
     * @memberof DiagnosisCode
     */
    'providerId'?: string;
}

