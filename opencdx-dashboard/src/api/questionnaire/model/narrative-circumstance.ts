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
import type { LogicalExpression } from './logical-expression';
// May contain unused imports in some cases
// @ts-ignore
import type { Measure } from './measure';

/**
 * 
 * @export
 * @interface NarrativeCircumstance
 */
export interface NarrativeCircumstance {
    /**
     * 
     * @type {Measure}
     * @memberof NarrativeCircumstance
     */
    'timing'?: Measure;
    /**
     * 
     * @type {Array<LogicalExpression>}
     * @memberof NarrativeCircumstance
     */
    'purpose'?: Array<LogicalExpression>;
    /**
     * 
     * @type {string}
     * @memberof NarrativeCircumstance
     */
    'text'?: string;
}
