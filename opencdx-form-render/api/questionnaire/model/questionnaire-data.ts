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
import type { Timestamp } from './timestamp';

/**
 * 
 * @export
 * @interface QuestionnaireData
 */
export interface QuestionnaireData {
    /**
     * 
     * @type {string}
     * @memberof QuestionnaireData
     */
    'id'?: string;
    /**
     * 
     * @type {string}
     * @memberof QuestionnaireData
     */
    'name'?: string;
    /**
     * 
     * @type {string}
     * @memberof QuestionnaireData
     */
    'status'?: string;
    /**
     * 
     * @type {string}
     * @memberof QuestionnaireData
     */
    'state'?: string;
    /**
     * 
     * @type {string}
     * @memberof QuestionnaireData
     */
    'questionJsonId'?: string;
    /**
     * 
     * @type {string}
     * @memberof QuestionnaireData
     */
    'questionAnfJson'?: string;
    /**
     * 
     * @type {string}
     * @memberof QuestionnaireData
     */
    'rulesEngineConfig'?: string;
    /**
     * 
     * @type {Timestamp}
     * @memberof QuestionnaireData
     */
    'created'?: Timestamp;
    /**
     * 
     * @type {Timestamp}
     * @memberof QuestionnaireData
     */
    'modified'?: Timestamp;
    /**
     * 
     * @type {string}
     * @memberof QuestionnaireData
     */
    'creator'?: string;
    /**
     * 
     * @type {string}
     * @memberof QuestionnaireData
     */
    'modifier'?: string;
}

