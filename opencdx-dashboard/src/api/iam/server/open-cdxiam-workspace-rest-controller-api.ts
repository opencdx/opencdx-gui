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
import type { CreateWorkspaceRequest } from '../model';
// @ts-ignore
import type { CreateWorkspaceResponse } from '../model';
// @ts-ignore
import type { GetWorkspaceDetailsByIdResponse } from '../model';
// @ts-ignore
import type { ListWorkspacesRequest } from '../model';
// @ts-ignore
import type { ListWorkspacesResponse } from '../model';
// @ts-ignore
import type { UpdateWorkspaceRequest } from '../model';
// @ts-ignore
import type { UpdateWorkspaceResponse } from '../model';
/**
 * OpenCdxiamWorkspaceRestControllerApi - axios parameter creator
 * @export
 */
export const OpenCdxiamWorkspaceRestControllerApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @param {CreateWorkspaceRequest} createWorkspaceRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createWorkspace: async (createWorkspaceRequest: CreateWorkspaceRequest, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'createWorkspaceRequest' is not null or undefined
            assertParamExists('createWorkspace', 'createWorkspaceRequest', createWorkspaceRequest)
            const localVarPath = `/workspace`;
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
            localVarRequestOptions.data = serializeDataIfNeeded(createWorkspaceRequest, localVarRequestOptions, configuration)

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
        getWorkspaceDetailsById: async (id: string, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('getWorkspaceDetailsById', 'id', id)
            const localVarPath = `/workspace/{id}`
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
         * @param {ListWorkspacesRequest} listWorkspacesRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listWorkspaces: async (listWorkspacesRequest: ListWorkspacesRequest, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'listWorkspacesRequest' is not null or undefined
            assertParamExists('listWorkspaces', 'listWorkspacesRequest', listWorkspacesRequest)
            const localVarPath = `/workspace/list`;
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
            localVarRequestOptions.data = serializeDataIfNeeded(listWorkspacesRequest, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {UpdateWorkspaceRequest} updateWorkspaceRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updateWorkspace: async (updateWorkspaceRequest: UpdateWorkspaceRequest, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'updateWorkspaceRequest' is not null or undefined
            assertParamExists('updateWorkspace', 'updateWorkspaceRequest', updateWorkspaceRequest)
            const localVarPath = `/workspace`;
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
            localVarRequestOptions.data = serializeDataIfNeeded(updateWorkspaceRequest, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * OpenCdxiamWorkspaceRestControllerApi - functional programming interface
 * @export
 */
export const OpenCdxiamWorkspaceRestControllerApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = OpenCdxiamWorkspaceRestControllerApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @param {CreateWorkspaceRequest} createWorkspaceRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async createWorkspace(createWorkspaceRequest: CreateWorkspaceRequest, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<CreateWorkspaceResponse>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.createWorkspace(createWorkspaceRequest, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['OpenCdxiamWorkspaceRestControllerApi.createWorkspace']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
        /**
         * 
         * @param {string} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getWorkspaceDetailsById(id: string, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<GetWorkspaceDetailsByIdResponse>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getWorkspaceDetailsById(id, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['OpenCdxiamWorkspaceRestControllerApi.getWorkspaceDetailsById']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
        /**
         * 
         * @param {ListWorkspacesRequest} listWorkspacesRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async listWorkspaces(listWorkspacesRequest: ListWorkspacesRequest, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ListWorkspacesResponse>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.listWorkspaces(listWorkspacesRequest, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['OpenCdxiamWorkspaceRestControllerApi.listWorkspaces']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
        /**
         * 
         * @param {UpdateWorkspaceRequest} updateWorkspaceRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async updateWorkspace(updateWorkspaceRequest: UpdateWorkspaceRequest, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<UpdateWorkspaceResponse>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.updateWorkspace(updateWorkspaceRequest, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['OpenCdxiamWorkspaceRestControllerApi.updateWorkspace']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
    }
};

/**
 * OpenCdxiamWorkspaceRestControllerApi - factory interface
 * @export
 */
export const OpenCdxiamWorkspaceRestControllerApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = OpenCdxiamWorkspaceRestControllerApiFp(configuration)
    return {
        /**
         * 
         * @param {OpenCdxiamWorkspaceRestControllerApiCreateWorkspaceRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createWorkspace(requestParameters: OpenCdxiamWorkspaceRestControllerApiCreateWorkspaceRequest, options?: RawAxiosRequestConfig): AxiosPromise<CreateWorkspaceResponse> {
            return localVarFp.createWorkspace(requestParameters.createWorkspaceRequest, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {OpenCdxiamWorkspaceRestControllerApiGetWorkspaceDetailsByIdRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getWorkspaceDetailsById(requestParameters: OpenCdxiamWorkspaceRestControllerApiGetWorkspaceDetailsByIdRequest, options?: RawAxiosRequestConfig): AxiosPromise<GetWorkspaceDetailsByIdResponse> {
            return localVarFp.getWorkspaceDetailsById(requestParameters.id, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {OpenCdxiamWorkspaceRestControllerApiListWorkspacesRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listWorkspaces(requestParameters: OpenCdxiamWorkspaceRestControllerApiListWorkspacesRequest, options?: RawAxiosRequestConfig): AxiosPromise<ListWorkspacesResponse> {
            return localVarFp.listWorkspaces(requestParameters.listWorkspacesRequest, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {OpenCdxiamWorkspaceRestControllerApiUpdateWorkspaceRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updateWorkspace(requestParameters: OpenCdxiamWorkspaceRestControllerApiUpdateWorkspaceRequest, options?: RawAxiosRequestConfig): AxiosPromise<UpdateWorkspaceResponse> {
            return localVarFp.updateWorkspace(requestParameters.updateWorkspaceRequest, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * Request parameters for createWorkspace operation in OpenCdxiamWorkspaceRestControllerApi.
 * @export
 * @interface OpenCdxiamWorkspaceRestControllerApiCreateWorkspaceRequest
 */
export interface OpenCdxiamWorkspaceRestControllerApiCreateWorkspaceRequest {
    /**
     * 
     * @type {CreateWorkspaceRequest}
     * @memberof OpenCdxiamWorkspaceRestControllerApiCreateWorkspace
     */
    readonly createWorkspaceRequest: CreateWorkspaceRequest
}

/**
 * Request parameters for getWorkspaceDetailsById operation in OpenCdxiamWorkspaceRestControllerApi.
 * @export
 * @interface OpenCdxiamWorkspaceRestControllerApiGetWorkspaceDetailsByIdRequest
 */
export interface OpenCdxiamWorkspaceRestControllerApiGetWorkspaceDetailsByIdRequest {
    /**
     * 
     * @type {string}
     * @memberof OpenCdxiamWorkspaceRestControllerApiGetWorkspaceDetailsById
     */
    readonly id: string
}

/**
 * Request parameters for listWorkspaces operation in OpenCdxiamWorkspaceRestControllerApi.
 * @export
 * @interface OpenCdxiamWorkspaceRestControllerApiListWorkspacesRequest
 */
export interface OpenCdxiamWorkspaceRestControllerApiListWorkspacesRequest {
    /**
     * 
     * @type {ListWorkspacesRequest}
     * @memberof OpenCdxiamWorkspaceRestControllerApiListWorkspaces
     */
    readonly listWorkspacesRequest: ListWorkspacesRequest
}

/**
 * Request parameters for updateWorkspace operation in OpenCdxiamWorkspaceRestControllerApi.
 * @export
 * @interface OpenCdxiamWorkspaceRestControllerApiUpdateWorkspaceRequest
 */
export interface OpenCdxiamWorkspaceRestControllerApiUpdateWorkspaceRequest {
    /**
     * 
     * @type {UpdateWorkspaceRequest}
     * @memberof OpenCdxiamWorkspaceRestControllerApiUpdateWorkspace
     */
    readonly updateWorkspaceRequest: UpdateWorkspaceRequest
}

/**
 * OpenCdxiamWorkspaceRestControllerApi - object-oriented interface
 * @export
 * @class OpenCdxiamWorkspaceRestControllerApi
 * @extends {BaseAPI}
 */
export class OpenCdxiamWorkspaceRestControllerApi extends BaseAPI {
    /**
     * 
     * @param {OpenCdxiamWorkspaceRestControllerApiCreateWorkspaceRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof OpenCdxiamWorkspaceRestControllerApi
     */
    public createWorkspace(requestParameters: OpenCdxiamWorkspaceRestControllerApiCreateWorkspaceRequest, options?: RawAxiosRequestConfig) {
        return OpenCdxiamWorkspaceRestControllerApiFp(this.configuration).createWorkspace(requestParameters.createWorkspaceRequest, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {OpenCdxiamWorkspaceRestControllerApiGetWorkspaceDetailsByIdRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof OpenCdxiamWorkspaceRestControllerApi
     */
    public getWorkspaceDetailsById(requestParameters: OpenCdxiamWorkspaceRestControllerApiGetWorkspaceDetailsByIdRequest, options?: RawAxiosRequestConfig) {
        return OpenCdxiamWorkspaceRestControllerApiFp(this.configuration).getWorkspaceDetailsById(requestParameters.id, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {OpenCdxiamWorkspaceRestControllerApiListWorkspacesRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof OpenCdxiamWorkspaceRestControllerApi
     */
    public listWorkspaces(requestParameters: OpenCdxiamWorkspaceRestControllerApiListWorkspacesRequest, options?: RawAxiosRequestConfig) {
        return OpenCdxiamWorkspaceRestControllerApiFp(this.configuration).listWorkspaces(requestParameters.listWorkspacesRequest, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {OpenCdxiamWorkspaceRestControllerApiUpdateWorkspaceRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof OpenCdxiamWorkspaceRestControllerApi
     */
    public updateWorkspace(requestParameters: OpenCdxiamWorkspaceRestControllerApiUpdateWorkspaceRequest, options?: RawAxiosRequestConfig) {
        return OpenCdxiamWorkspaceRestControllerApiFp(this.configuration).updateWorkspace(requestParameters.updateWorkspaceRequest, options).then((request) => request(this.axios, this.basePath));
    }
}

