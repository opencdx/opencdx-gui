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
 * @interface IamUser
 */
export interface IamUser {
    /**
     * 
     * @type {string}
     * @memberof IamUser
     */
    'id'?: string;
    /**
     * 
     * @type {string}
     * @memberof IamUser
     */
    'systemName'?: string;
    /**
     * 
     * @type {string}
     * @memberof IamUser
     */
    'username'?: string;
    /**
     * 
     * @type {boolean}
     * @memberof IamUser
     */
    'emailVerified'?: boolean;
    /**
     * 
     * @type {string}
     * @memberof IamUser
     */
    'status'?: Status;
    /**
     * 
     * @type {string}
     * @memberof IamUser
     */
    'type'?: LoginType;
    /**
     * 
     * @type {string}
     * @memberof IamUser
     */
    'organizationId'?: string;
    /**
     * 
     * @type {string}
     * @memberof IamUser
     */
    'workspaceId'?: string;
    /**
     * 
     * @type {string}
     * @memberof IamUser
     */
    'created'?: string;
    /**
     * 
     * @type {string}
     * @memberof IamUser
     */
    'modified'?: string;
    /**
     * 
     * @type {string}
     * @memberof IamUser
     */
    'creator'?: string;
    /**
     * 
     * @type {string}
     * @memberof IamUser
     */
    'modifier'?: string;
}

export const Status = {
    IamUserStatusUnspecified: 'IAM_USER_STATUS_UNSPECIFIED',
    IamUserStatusActive: 'IAM_USER_STATUS_ACTIVE',
    IamUserStatusInactive: 'IAM_USER_STATUS_INACTIVE',
    IamUserStatusDeleted: 'IAM_USER_STATUS_DELETED',
    Unrecognized: 'UNRECOGNIZED'
} as const;

export type Status = typeof Status[keyof typeof Status];
export const LoginType = {
    IamUserTypeUnspecified: 'IAM_USER_TYPE_UNSPECIFIED',
    IamUserTypeRegular: 'IAM_USER_TYPE_REGULAR',
    IamUserTypeSystem: 'IAM_USER_TYPE_SYSTEM',
    IamUserTypeTrial: 'IAM_USER_TYPE_TRIAL',
    Unrecognized: 'UNRECOGNIZED'
} as const;

export type LoginType = typeof LoginType[keyof typeof LoginType];


