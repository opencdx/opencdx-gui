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
import type { QuestionnaireItem } from './questionnaire-item';
// May contain unused imports in some cases
// @ts-ignore
import type { Timestamp } from './timestamp';

/**
 * 
 * @export
 * @interface Questionnaire
 */
export interface Questionnaire {
    /**
     * 
     * @type {string}
     * @memberof Questionnaire
     */
    'id'?: string;
    /**
     * 
     * @type {string}
     * @memberof Questionnaire
     */
    'resourceType'?: string;
    /**
     * 
     * @type {string}
     * @memberof Questionnaire
     */
    'title'?: string;
    /**
     * 
     * @type {string}
     * @memberof Questionnaire
     */
    'status'?: QuestionnaireStatus;
    /**
     * 
     * @type {string}
     * @memberof Questionnaire
     */
    'description'?: string;
    /**
     * 
     * @type {string}
     * @memberof Questionnaire
     */
    'purpose'?: string;
    /**
     * 
     * @type {Array<QuestionnaireItem>}
     * @memberof Questionnaire
     */
    'item'?: Array<QuestionnaireItem>;
    /**
     * 
     * @type {string}
     * @memberof Questionnaire
     */
    'ruleId'?: string;
    /**
     * 
     * @type {Array<string>}
     * @memberof Questionnaire
     */
    'ruleQuestionId'?: Array<string>;
    /**
     * 
     * @type {Timestamp}
     * @memberof Questionnaire
     */
    'created'?: Timestamp;
    /**
     * 
     * @type {Timestamp}
     * @memberof Questionnaire
     */
    'modified'?: Timestamp;
    /**
     * 
     * @type {string}
     * @memberof Questionnaire
     */
    'creator'?: string;
    /**
     * 
     * @type {string}
     * @memberof Questionnaire
     */
    'modifier'?: string;
    /**
     * 
     * @type {string}
     * @memberof Questionnaire
     */
    'version'?: string;
}

export const QuestionnaireStatus = {
    Draft: 'draft',
    Active: 'active',
    Retired: 'retired',
    Unknown: 'unknown',
    Unrecognized: 'UNRECOGNIZED'
} as const;

export type QuestionnaireStatus = typeof QuestionnaireStatus[keyof typeof QuestionnaireStatus];


