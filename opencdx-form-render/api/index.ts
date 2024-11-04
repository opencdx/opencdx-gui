import { Configuration as IAMConfig, OpenCdxiamUserRestControllerApi } from "./iam";
import AsyncStorage from '@react-native-async-storage/async-storage';
const REACT_APP_API_HOST = 'https://api.dev-1.opencdx.io';
const REACT_APP_API_PORT = '';

const iam = new IAMConfig({
    basePath: (REACT_APP_API_HOST ?? '') + REACT_APP_API_PORT + "/iam"
});
iam.accessToken = async () => {
    return await AsyncStorage.getItem('serviceToken') || '';
}

export const iamApi = new OpenCdxiamUserRestControllerApi(iam);



import { Configuration as QuestionnaireConfig, OpenCdxRestQuestionnaireControllerApi } from "./questionnaire";




const questionnaire = new QuestionnaireConfig({
    basePath: (REACT_APP_API_HOST ?? '') + REACT_APP_API_PORT + "/questionnaire"
});
questionnaire.accessToken = async () => {
    return await AsyncStorage.getItem('serviceToken') || '';
}
export const questionnaireApi = new OpenCdxRestQuestionnaireControllerApi(questionnaire);


import { Configuration as HealthConfiguration, OpenCdxhealthUserRestControllerApi } from "./health";
const health = new HealthConfiguration({
    basePath: (REACT_APP_API_HOST ?? '') + REACT_APP_API_PORT + "/health"
});
health.accessToken = async () => {
    return await AsyncStorage.getItem('serviceToken') || '';
}

export const healthApi = new OpenCdxhealthUserRestControllerApi(health);