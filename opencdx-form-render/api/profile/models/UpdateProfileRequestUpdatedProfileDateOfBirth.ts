/* tslint:disable */
/* eslint-disable */
/**
 * Profile API
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface UpdateProfileRequestUpdatedProfileDateOfBirth
 */
export interface UpdateProfileRequestUpdatedProfileDateOfBirth {
    /**
     * 
     * @type {number}
     * @memberof UpdateProfileRequestUpdatedProfileDateOfBirth
     */
    seconds?: number;
    /**
     * 
     * @type {number}
     * @memberof UpdateProfileRequestUpdatedProfileDateOfBirth
     */
    nanos?: number;
}

/**
 * Check if a given object implements the UpdateProfileRequestUpdatedProfileDateOfBirth interface.
 */
export function instanceOfUpdateProfileRequestUpdatedProfileDateOfBirth(value: object): value is UpdateProfileRequestUpdatedProfileDateOfBirth {
    return true;
}

export function UpdateProfileRequestUpdatedProfileDateOfBirthFromJSON(json: any): UpdateProfileRequestUpdatedProfileDateOfBirth {
    return UpdateProfileRequestUpdatedProfileDateOfBirthFromJSONTyped(json, false);
}

export function UpdateProfileRequestUpdatedProfileDateOfBirthFromJSONTyped(json: any, ignoreDiscriminator: boolean): UpdateProfileRequestUpdatedProfileDateOfBirth {
    if (json == null) {
        return json;
    }
    return {
        
        'seconds': json['seconds'] == null ? undefined : json['seconds'],
        'nanos': json['nanos'] == null ? undefined : json['nanos'],
    };
}

export function UpdateProfileRequestUpdatedProfileDateOfBirthToJSON(value?: UpdateProfileRequestUpdatedProfileDateOfBirth | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'seconds': value['seconds'],
        'nanos': value['nanos'],
    };
}

