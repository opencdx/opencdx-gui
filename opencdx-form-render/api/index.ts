import { Configuration as IAMConfig, OpenCdxiamUserRestControllerApi } from "./iam";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';
import axios from 'axios';

// Resolve API host/port with precedence: app.json extra -> EXPO_PUBLIC_* -> localhost defaults
const extra = Constants?.expoConfig?.extra as { apiHost?: string; apiPort?: string } | undefined;
const REACT_APP_API_HOST = (extra?.apiHost) || process.env.EXPO_PUBLIC_API_HOST || 'https://localhost';
const REACT_APP_API_PORT = (extra?.apiPort) || process.env.EXPO_PUBLIC_API_PORT || ':8080';
export const API_BASE = (REACT_APP_API_HOST ?? '') + REACT_APP_API_PORT;
console.info('[api][base]', API_BASE);

// Lightweight redaction to avoid leaking secrets in logs
const SENSITIVE_KEYS = [
    'authorization',
    'cookie',
    'set-cookie',
    'password',
    'token',
    'accesstoken',
    'idtoken',
    'refreshtoken'
];

function redactValue(key: string, value: unknown): unknown {
    return SENSITIVE_KEYS.includes(key.toLowerCase()) ? '[REDACTED]' : value;
}

function redactObject(input: unknown): unknown {
    if (!input || typeof input !== 'object') return input;
    if (Array.isArray(input)) return input.map((v) => (typeof v === 'object' ? redactObject(v) : v));
    const result: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(input as Record<string, unknown>)) {
        if (v && typeof v === 'object') {
            result[k] = redactObject(v);
        } else {
            result[k] = redactValue(k, v);
        }
    }
    return result;
}

// Global Axios interceptors for request/response debug logging
axios.interceptors.request.use(
    (config) => {
        // mark start time
        (config as any).metadata = { start: Date.now() };
        const method = (config.method || 'get').toUpperCase();
        const url = `${config.baseURL ?? ''}${config.url ?? ''}`;
        let body: unknown = config.data;
        if (typeof body === 'string') {
            try { body = JSON.parse(body); } catch { /* keep as-is */ }
        }
        const headers = redactObject(config.headers || {});
        const data = redactObject(body);
        console.debug(`[api][request] ${method} ${url}`, { headers, data });
        return config;
    },
    (error) => {
        console.warn('[api][request][error]', { message: error?.message });
        return Promise.reject(error);
    }
);

axios.interceptors.response.use(
    (response) => {
        const start = (response.config as any)?.metadata?.start as number | undefined;
        const duration = start ? (Date.now() - start) : undefined;
        const url = `${response.config.baseURL ?? ''}${response.config.url ?? ''}`;
        console.debug(`[api][response] ${response.status} ${url}${duration !== undefined ? ` (${duration}ms)` : ''}`);
        return response;
    },
    (error) => {
        const cfg = error?.config || {};
        const start = (cfg as any)?.metadata?.start as number | undefined;
        const duration = start ? (Date.now() - start) : undefined;
        const status = error?.response?.status;
        const url = `${cfg.baseURL ?? ''}${cfg.url ?? ''}`;
        let resp = error?.response?.data;
        if (typeof resp === 'string') {
            try { resp = JSON.parse(resp); } catch { /* keep as-is */ }
        }
        const data = redactObject(resp);
        console.warn(`[api][response][error] ${status ?? ''} ${url}${duration !== undefined ? ` (${duration}ms)` : ''}`, { data });
        return Promise.reject(error);
    }
);

const iam = new IAMConfig({
    basePath: API_BASE + "/iam"
});
iam.accessToken = async () => {
    return await AsyncStorage.getItem('serviceToken') || '';
}

export const iamApi = new OpenCdxiamUserRestControllerApi(iam);



import { Configuration as QuestionnaireConfig, OpenCdxRestQuestionnaireControllerApi } from "./questionnaire";




const questionnaire = new QuestionnaireConfig({
    basePath: API_BASE + "/questionnaire"
});
questionnaire.accessToken = async () => {
    return await AsyncStorage.getItem('serviceToken') || '';
}
export const questionnaireApi = new OpenCdxRestQuestionnaireControllerApi(questionnaire);


import { Configuration as HealthConfiguration, OpenCdxhealthUserRestControllerApi } from "./health";
const health = new HealthConfiguration({
    basePath: API_BASE + "/health"
});
health.accessToken = async () => {
    return await AsyncStorage.getItem('serviceToken') || '';
}

export const healthApi = new OpenCdxhealthUserRestControllerApi(health);