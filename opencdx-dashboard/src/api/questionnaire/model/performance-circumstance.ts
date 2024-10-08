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
// May contain unused imports in some cases
// @ts-ignore
import type { Participant } from './participant';

/**
 * 
 * @export
 * @interface PerformanceCircumstance
 */
export interface PerformanceCircumstance {
    /**
     * 
     * @type {Measure}
     * @memberof PerformanceCircumstance
     */
    'timing'?: Measure;
    /**
     * 
     * @type {Array<LogicalExpression>}
     * @memberof PerformanceCircumstance
     */
    'purpose'?: Array<LogicalExpression>;
    /**
     * 
     * @type {LogicalExpression}
     * @memberof PerformanceCircumstance
     */
    'status'?: LogicalExpression;
    /**
     * 
     * @type {Measure}
     * @memberof PerformanceCircumstance
     */
    'result'?: Measure;
    /**
     * 
     * @type {LogicalExpression}
     * @memberof PerformanceCircumstance
     */
    'healthRisk'?: LogicalExpression;
    /**
     * 
     * @type {Measure}
     * @memberof PerformanceCircumstance
     */
    'normalRange'?: Measure;
    /**
     * 
     * @type {Array<Participant>}
     * @memberof PerformanceCircumstance
     */
    'participant'?: Array<Participant>;
    /**
     * 
     * @type {Array<string>}
     * @memberof PerformanceCircumstance
     */
    'deviceid'?: Array<string>;
}

