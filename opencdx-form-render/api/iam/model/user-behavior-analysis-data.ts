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
 * @interface UserBehaviorAnalysisData
 */
export interface UserBehaviorAnalysisData {
    /**
     * 
     * @type {string}
     * @memberof UserBehaviorAnalysisData
     */
    'encounterId'?: string;
    /**
     * 
     * @type {string}
     * @memberof UserBehaviorAnalysisData
     */
    'userId'?: string;
    /**
     * 
     * @type {string}
     * @memberof UserBehaviorAnalysisData
     */
    'behaviorPattern'?: string;
    /**
     * 
     * @type {Array<string>}
     * @memberof UserBehaviorAnalysisData
     */
    'associatedActivities'?: Array<string>;
    /**
     * 
     * @type {string}
     * @memberof UserBehaviorAnalysisData
     */
    'analysisTimeFrame'?: string;
    /**
     * 
     * @type {Array<string>}
     * @memberof UserBehaviorAnalysisData
     */
    'historicalBehaviorData'?: Array<string>;
    /**
     * 
     * @type {string}
     * @memberof UserBehaviorAnalysisData
     */
    'riskAssessment'?: string;
    /**
     * 
     * @type {boolean}
     * @memberof UserBehaviorAnalysisData
     */
    'isBehaviorOutlier'?: boolean;
    /**
     * 
     * @type {string}
     * @memberof UserBehaviorAnalysisData
     */
    'behaviorConsequence'?: string;
}

