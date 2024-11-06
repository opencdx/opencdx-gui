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
import type { Allergy } from './allergy';
// May contain unused imports in some cases
// @ts-ignore
import type { Demographics } from './demographics';
// May contain unused imports in some cases
// @ts-ignore
import type { EmergencyContact } from './emergency-contact';
// May contain unused imports in some cases
// @ts-ignore
import type { EmployeeIdentity } from './employee-identity';
// May contain unused imports in some cases
// @ts-ignore
import type { FullName } from './full-name';
// May contain unused imports in some cases
// @ts-ignore
import type { PharmacyDetails } from './pharmacy-details';
// May contain unused imports in some cases
// @ts-ignore
import type { PrimaryContactInfo } from './primary-contact-info';

/**
 * 
 * @export
 * @interface UserProfile
 */
export interface UserProfile {
    /**
     * 
     * @type {string}
     * @memberof UserProfile
     */
    'id'?: string;
    /**
     * 
     * @type {string}
     * @memberof UserProfile
     */
    'userId'?: string;
    /**
     * 
     * @type {string}
     * @memberof UserProfile
     */
    'nationalHealthId'?: string;
    /**
     * 
     * @type {FullName}
     * @memberof UserProfile
     */
    'fullName'?: FullName;
    /**
     * 
     * @type {Array<object>}
     * @memberof UserProfile
     */
    'contacts'?: Array<object>;
    /**
     * 
     * @type {Array<string>}
     * @memberof UserProfile
     */
    'email'?: Array<string>;
    /**
     * 
     * @type {Array<string>}
     * @memberof UserProfile
     */
    'phone'?: Array<string>;
    /**
     * 
     * @type {string}
     * @memberof UserProfile
     */
    'dateOfBirth'?: string;
    /**
     * 
     * @type {string}
     * @memberof UserProfile
     */
    'photo'?: string;
    /**
     * 
     * @type {Demographics}
     * @memberof UserProfile
     */
    'demographics'?: Demographics;
    /**
     * 
     * @type {EmployeeIdentity}
     * @memberof UserProfile
     */
    'employeeIdentity'?: EmployeeIdentity;
    /**
     * 
     * @type {PrimaryContactInfo}
     * @memberof UserProfile
     */
    'primaryContactInfo'?: PrimaryContactInfo;
    /**
     * 
     * @type {EmergencyContact}
     * @memberof UserProfile
     */
    'emergencyContact'?: EmergencyContact;
    /**
     * 
     * @type {PharmacyDetails}
     * @memberof UserProfile
     */
    'pharmacyDetails'?: PharmacyDetails;
    /**
     * 
     * @type {Array<string>}
     * @memberof UserProfile
     */
    'dependentId'?: Array<string>;
    /**
     * 
     * @type {Array<Allergy>}
     * @memberof UserProfile
     */
    'knownAllergies'?: Array<Allergy>;
    /**
     * 
     * @type {boolean}
     * @memberof UserProfile
     */
    'isActive'?: boolean;
    /**
     * 
     * @type {Array<string>}
     * @memberof UserProfile
     */
    'address'?: Array<string>;
    /**
     * 
     * @type {string}
     * @memberof UserProfile
     */
    'created'?: string;
    /**
     * 
     * @type {string}
     * @memberof UserProfile
     */
    'modified'?: string;
    /**
     * 
     * @type {string}
     * @memberof UserProfile
     */
    'creator'?: string;
    /**
     * 
     * @type {string}
     * @memberof UserProfile
     */
    'modifier'?: string;
    /**
     * 
     * @type {string}
     * @memberof UserProfile
     */
    'bloodtype'?: string;
}

