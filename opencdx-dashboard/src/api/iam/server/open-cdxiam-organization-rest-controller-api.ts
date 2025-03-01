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


import type { Configuration } from '../configuration';
import type { AxiosPromise, AxiosInstance, RawAxiosRequestConfig } from 'axios';
import globalAxios from 'axios';
// Some imports not used depending on template conditions
// @ts-ignore
import { DUMMY_BASE_URL, assertParamExists, setApiKeyToObject, setBasicAuthToObject, setBearerAuthToObject, setOAuthToObject, setSearchParams, serializeDataIfNeeded, toPathString, createRequestFunction } from '../common';
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, type RequestArgs, BaseAPI, RequiredError, operationServerMap } from '../base';
// @ts-ignore
import type { CreateOrganizationRequest } from '../model';
// @ts-ignore
import type { CreateOrganizationResponse } from '../model';
// @ts-ignore
import type { GetOrganizationDetailsByIdResponse } from '../model';
// @ts-ignore
import type { ListOrganizationsRequest } from '../model';
// @ts-ignore
import type { ListOrganizationsResponse } from '../model';
// @ts-ignore
import type { UpdateOrganizationRequest } from '../model';
// @ts-ignore
import type { UpdateOrganizationResponse } from '../model';
/**
 * OpenCdxiamOrganizationRestControllerApi - axios parameter creator
 * @export
 */
export const OpenCdxiamOrganizationRestControllerApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @param {CreateOrganizationRequest} createOrganizationRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createOrganization: async (createOrganizationRequest: CreateOrganizationRequest, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'createOrganizationRequest' is not null or undefined
            assertParamExists('createOrganization', 'createOrganizationRequest', createOrganizationRequest)
            const localVarPath = `/organization`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication bearerAuth required
            // http bearer authentication required
            await setBearerAuthToObject(localVarHeaderParameter, configuration)


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(createOrganizationRequest, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {string} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getOrganizationDetailsById: async (id: string, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('getOrganizationDetailsById', 'id', id)
            const localVarPath = `/organization/{id}`
                .replace(`{${"id"}}`, encodeURIComponent(String(id)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication bearerAuth required
            // http bearer authentication required
            await setBearerAuthToObject(localVarHeaderParameter, configuration)


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {ListOrganizationsRequest} listOrganizationsRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listOrganizations: async (listOrganizationsRequest: ListOrganizationsRequest, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'listOrganizationsRequest' is not null or undefined
            assertParamExists('listOrganizations', 'listOrganizationsRequest', listOrganizationsRequest)
            const localVarPath = `/organization/list`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication bearerAuth required
            // http bearer authentication required
            await setBearerAuthToObject(localVarHeaderParameter, configuration)


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(listOrganizationsRequest, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {UpdateOrganizationRequest} updateOrganizationRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updateOrganization: async (updateOrganizationRequest: UpdateOrganizationRequest, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'updateOrganizationRequest' is not null or undefined
            assertParamExists('updateOrganization', 'updateOrganizationRequest', updateOrganizationRequest)
            const localVarPath = `/organization`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'PUT', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication bearerAuth required
            // http bearer authentication required
            await setBearerAuthToObject(localVarHeaderParameter, configuration)


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(updateOrganizationRequest, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * OpenCdxiamOrganizationRestControllerApi - functional programming interface
 * @export
 */
export const OpenCdxiamOrganizationRestControllerApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = OpenCdxiamOrganizationRestControllerApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @param {CreateOrganizationRequest} createOrganizationRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async createOrganization(createOrganizationRequest: CreateOrganizationRequest, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<CreateOrganizationResponse>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.createOrganization(createOrganizationRequest, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['OpenCdxiamOrganizationRestControllerApi.createOrganization']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
        /**
         * 
         * @param {string} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getOrganizationDetailsById(id: string, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<GetOrganizationDetailsByIdResponse>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getOrganizationDetailsById(id, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['OpenCdxiamOrganizationRestControllerApi.getOrganizationDetailsById']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
        /**
         * 
         * @param {ListOrganizationsRequest} listOrganizationsRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async listOrganizations(listOrganizationsRequest: ListOrganizationsRequest, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ListOrganizationsResponse>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.listOrganizations(listOrganizationsRequest, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['OpenCdxiamOrganizationRestControllerApi.listOrganizations']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
        /**
         * 
         * @param {UpdateOrganizationRequest} updateOrganizationRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async updateOrganization(updateOrganizationRequest: UpdateOrganizationRequest, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<UpdateOrganizationResponse>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.updateOrganization(updateOrganizationRequest, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['OpenCdxiamOrganizationRestControllerApi.updateOrganization']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
    }
};

/**
 * OpenCdxiamOrganizationRestControllerApi - factory interface
 * @export
 */
export const OpenCdxiamOrganizationRestControllerApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = OpenCdxiamOrganizationRestControllerApiFp(configuration)
    return {
        /**
         * 
         * @param {OpenCdxiamOrganizationRestControllerApiCreateOrganizationRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createOrganization(requestParameters: OpenCdxiamOrganizationRestControllerApiCreateOrganizationRequest, options?: RawAxiosRequestConfig): AxiosPromise<CreateOrganizationResponse> {
            return localVarFp.createOrganization(requestParameters.createOrganizationRequest, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {OpenCdxiamOrganizationRestControllerApiGetOrganizationDetailsByIdRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getOrganizationDetailsById(requestParameters: OpenCdxiamOrganizationRestControllerApiGetOrganizationDetailsByIdRequest, options?: RawAxiosRequestConfig): AxiosPromise<GetOrganizationDetailsByIdResponse> {
            return localVarFp.getOrganizationDetailsById(requestParameters.id, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {OpenCdxiamOrganizationRestControllerApiListOrganizationsRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listOrganizations(requestParameters: OpenCdxiamOrganizationRestControllerApiListOrganizationsRequest, options?: RawAxiosRequestConfig): AxiosPromise<ListOrganizationsResponse> {
            return localVarFp.listOrganizations(requestParameters.listOrganizationsRequest, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {OpenCdxiamOrganizationRestControllerApiUpdateOrganizationRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updateOrganization(requestParameters: OpenCdxiamOrganizationRestControllerApiUpdateOrganizationRequest, options?: RawAxiosRequestConfig): AxiosPromise<UpdateOrganizationResponse> {
            return localVarFp.updateOrganization(requestParameters.updateOrganizationRequest, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * Request parameters for createOrganization operation in OpenCdxiamOrganizationRestControllerApi.
 * @export
 * @interface OpenCdxiamOrganizationRestControllerApiCreateOrganizationRequest
 */
export interface OpenCdxiamOrganizationRestControllerApiCreateOrganizationRequest {
    /**
     * 
     * @type {CreateOrganizationRequest}
     * @memberof OpenCdxiamOrganizationRestControllerApiCreateOrganization
     */
    readonly createOrganizationRequest: CreateOrganizationRequest
}

/**
 * Request parameters for getOrganizationDetailsById operation in OpenCdxiamOrganizationRestControllerApi.
 * @export
 * @interface OpenCdxiamOrganizationRestControllerApiGetOrganizationDetailsByIdRequest
 */
export interface OpenCdxiamOrganizationRestControllerApiGetOrganizationDetailsByIdRequest {
    /**
     * 
     * @type {string}
     * @memberof OpenCdxiamOrganizationRestControllerApiGetOrganizationDetailsById
     */
    readonly id: string
}

/**
 * Request parameters for listOrganizations operation in OpenCdxiamOrganizationRestControllerApi.
 * @export
 * @interface OpenCdxiamOrganizationRestControllerApiListOrganizationsRequest
 */
export interface OpenCdxiamOrganizationRestControllerApiListOrganizationsRequest {
    /**
     * 
     * @type {ListOrganizationsRequest}
     * @memberof OpenCdxiamOrganizationRestControllerApiListOrganizations
     */
    readonly listOrganizationsRequest: ListOrganizationsRequest
}

/**
 * Request parameters for updateOrganization operation in OpenCdxiamOrganizationRestControllerApi.
 * @export
 * @interface OpenCdxiamOrganizationRestControllerApiUpdateOrganizationRequest
 */
export interface OpenCdxiamOrganizationRestControllerApiUpdateOrganizationRequest {
    /**
     * 
     * @type {UpdateOrganizationRequest}
     * @memberof OpenCdxiamOrganizationRestControllerApiUpdateOrganization
     */
    readonly updateOrganizationRequest: UpdateOrganizationRequest
}

/**
 * OpenCdxiamOrganizationRestControllerApi - object-oriented interface
 * @export
 * @class OpenCdxiamOrganizationRestControllerApi
 * @extends {BaseAPI}
 */
export class OpenCdxiamOrganizationRestControllerApi extends BaseAPI {
    /**
     * 
     * @param {OpenCdxiamOrganizationRestControllerApiCreateOrganizationRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof OpenCdxiamOrganizationRestControllerApi
     */
    public createOrganization(requestParameters: OpenCdxiamOrganizationRestControllerApiCreateOrganizationRequest, options?: RawAxiosRequestConfig) {
        return OpenCdxiamOrganizationRestControllerApiFp(this.configuration).createOrganization(requestParameters.createOrganizationRequest, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {OpenCdxiamOrganizationRestControllerApiGetOrganizationDetailsByIdRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof OpenCdxiamOrganizationRestControllerApi
     */
    public getOrganizationDetailsById(requestParameters: OpenCdxiamOrganizationRestControllerApiGetOrganizationDetailsByIdRequest, options?: RawAxiosRequestConfig) {
        return OpenCdxiamOrganizationRestControllerApiFp(this.configuration).getOrganizationDetailsById(requestParameters.id, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {OpenCdxiamOrganizationRestControllerApiListOrganizationsRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof OpenCdxiamOrganizationRestControllerApi
     */
    public listOrganizations(requestParameters: OpenCdxiamOrganizationRestControllerApiListOrganizationsRequest, options?: RawAxiosRequestConfig) {
        return OpenCdxiamOrganizationRestControllerApiFp(this.configuration).listOrganizations(requestParameters.listOrganizationsRequest, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {OpenCdxiamOrganizationRestControllerApiUpdateOrganizationRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof OpenCdxiamOrganizationRestControllerApi
     */
    public updateOrganization(requestParameters: OpenCdxiamOrganizationRestControllerApiUpdateOrganizationRequest, options?: RawAxiosRequestConfig) {
        return OpenCdxiamOrganizationRestControllerApiFp(this.configuration).updateOrganization(requestParameters.updateOrganizationRequest, options).then((request) => request(this.axios, this.basePath));
    }
}

