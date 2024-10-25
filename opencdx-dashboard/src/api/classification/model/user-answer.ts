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
import type { Location } from './location';
// May contain unused imports in some cases
// @ts-ignore
import type { Symptom } from './symptom';

/**
 * 
 * @export
 * @interface UserAnswer
 */
export interface UserAnswer {
    /**
     * 
     * @type {string}
     * @memberof UserAnswer
     */
    'patientId'?: string;
    /**
     * 
     * @type {string}
     * @memberof UserAnswer
     */
    'connectedTestId'?: string;
    /**
     * 
     * @type {string}
     * @memberof UserAnswer
     */
    'userQuestionnaireId'?: string;
    /**
     * 
     * @type {Array<Symptom>}
     * @memberof UserAnswer
     */
    'symptoms'?: Array<Symptom>;
    /**
     * 
     * @type {number}
     * @memberof UserAnswer
     */
    'age'?: number;
    /**
     * 
     * @type {string}
     * @memberof UserAnswer
     */
    'gender'?: Gender;
    /**
     * 
     * @type {string}
     * @memberof UserAnswer
     */
    'medicalConditions'?: string;
    /**
     * 
     * @type {boolean}
     * @memberof UserAnswer
     */
    'pregnancyStatus'?: boolean;
    /**
     * 
     * @type {string}
     * @memberof UserAnswer
     */
    'languagePreference'?: string;
    /**
     * 
     * @type {Location}
     * @memberof UserAnswer
     */
    'userLocation'?: Location;
    /**
     * 
     * @type {string}
     * @memberof UserAnswer
     */
    'submittingUserId'?: string;
    /**
     * 
     * @type {string}
     * @memberof UserAnswer
     */
    'mediaId'?: string;
    /**
     * 
     * @type {string}
     * @memberof UserAnswer
     */
    'textResult'?: string;
}

export const Gender = {
    GenderNotSpecified: 'GENDER_NOT_SPECIFIED',
    GenderMale: 'GENDER_MALE',
    GenderFemale: 'GENDER_FEMALE',
    GenderNonBinary: 'GENDER_NON_BINARY',
    GenderOther: 'GENDER_OTHER',
    Unrecognized: 'UNRECOGNIZED'
} as const;

export type Gender = typeof Gender[keyof typeof Gender];

