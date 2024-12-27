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
import type { AssociatedStatement } from './associated-statement';
// May contain unused imports in some cases
// @ts-ignore
import type { LogicalExpression } from './logical-expression';
// May contain unused imports in some cases
// @ts-ignore
import type { Measure } from './measure';
// May contain unused imports in some cases
// @ts-ignore
import type { NarrativeCircumstance } from './narrative-circumstance';
// May contain unused imports in some cases
// @ts-ignore
import type { Participant } from './participant';
// May contain unused imports in some cases
// @ts-ignore
import type { PerformanceCircumstance } from './performance-circumstance';
// May contain unused imports in some cases
// @ts-ignore
import type { Practitioner } from './practitioner';
// May contain unused imports in some cases
// @ts-ignore
import type { RequestCircumstance } from './request-circumstance';
// May contain unused imports in some cases
// @ts-ignore
import type { Timestamp } from './timestamp';

/**
 * 
 * @export
 * @interface ANFStatement
 */
export interface ANFStatement {
    /**
     * 
     * @type {string}
     * @memberof ANFStatement
     */
    'id'?: string;
    /**
     * 
     * @type {Measure}
     * @memberof ANFStatement
     */
    'time'?: Measure;
    /**
     * 
     * @type {Participant}
     * @memberof ANFStatement
     */
    'subjectOfRecord'?: Participant;
    /**
     * 
     * @type {Array<Practitioner>}
     * @memberof ANFStatement
     */
    'authors'?: Array<Practitioner>;
    /**
     * 
     * @type {LogicalExpression}
     * @memberof ANFStatement
     */
    'subjectOfInformation'?: LogicalExpression;
    /**
     * 
     * @type {Array<AssociatedStatement>}
     * @memberof ANFStatement
     */
    'associatedStatement'?: Array<AssociatedStatement>;
    /**
     * 
     * @type {LogicalExpression}
     * @memberof ANFStatement
     */
    'topic'?: LogicalExpression;
    /**
     * 
     * @type {LogicalExpression}
     * @memberof ANFStatement
     */
    'type'?: LogicalExpression;
    /**
     * 
     * @type {Timestamp}
     * @memberof ANFStatement
     */
    'created'?: Timestamp;
    /**
     * 
     * @type {Timestamp}
     * @memberof ANFStatement
     */
    'modified'?: Timestamp;
    /**
     * 
     * @type {string}
     * @memberof ANFStatement
     */
    'creator'?: string;
    /**
     * 
     * @type {string}
     * @memberof ANFStatement
     */
    'modifier'?: string;
    /**
     * 
     * @type {string}
     * @memberof ANFStatement
     */
    'status'?: Status;
    /**
     * 
     * @type {LogicalExpression}
     * @memberof ANFStatement
     */
    'method'?: LogicalExpression;
    /**
     * 
     * @type {NarrativeCircumstance}
     * @memberof ANFStatement
     */
    'narrativeCircumstance'?: NarrativeCircumstance;
    /**
     * 
     * @type {RequestCircumstance}
     * @memberof ANFStatement
     */
    'requestCircumstance'?: RequestCircumstance;
    /**
     * 
     * @type {PerformanceCircumstance}
     * @memberof ANFStatement
     */
    'performanceCircumstance'?: PerformanceCircumstance;
}

export const Status = {
    StatusUnspecified: 'STATUS_UNSPECIFIED',
    StatusActive: 'STATUS_ACTIVE',
    StatusDeleted: 'STATUS_DELETED',
    Unrecognized: 'UNRECOGNIZED'
} as const;

export type Status = typeof Status[keyof typeof Status];


