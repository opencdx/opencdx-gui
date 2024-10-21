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
 * @interface Message
 */
export interface Message {
    /**
     * 
     * @type {string}
     * @memberof Message
     */
    'id'?: string;
    /**
     * 
     * @type {string}
     * @memberof Message
     */
    'patientId'?: string;
    /**
     * 
     * @type {string}
     * @memberof Message
     */
    'title'?: string;
    /**
     * 
     * @type {string}
     * @memberof Message
     */
    'message'?: string;
    /**
     * 
     * @type {string}
     * @memberof Message
     */
    'type'?: Type;
    /**
     * 
     * @type {string}
     * @memberof Message
     */
    'status'?: Status;
    /**
     * 
     * @type {Timestamp}
     * @memberof Message
     */
    'created'?: Timestamp;
    /**
     * 
     * @type {Timestamp}
     * @memberof Message
     */
    'modified'?: Timestamp;
    /**
     * 
     * @type {string}
     * @memberof Message
     */
    'creator'?: string;
    /**
     * 
     * @type {string}
     * @memberof Message
     */
    'modifier'?: string;
}

export const Type = {
    UnspecifiedMessageType: 'UNSPECIFIED_MESSAGE_TYPE',
    Info: 'INFO',
    Warning: 'WARNING',
    Error: 'ERROR',
    Unrecognized: 'UNRECOGNIZED'
} as const;

export type Type = typeof Type[keyof typeof Type];
export const Status = {
    UnspecifiedMessageStatus: 'UNSPECIFIED_MESSAGE_STATUS',
    Read: 'READ',
    Unread: 'UNREAD',
    Unrecognized: 'UNRECOGNIZED'
} as const;

export type Status = typeof Status[keyof typeof Status];

