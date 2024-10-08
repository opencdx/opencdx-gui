import { Configuration as IAMConfig, OpenCdxiamUserRestControllerApi } from "./iam";
import AsyncStorage from '@react-native-async-storage/async-storage';
const REACT_APP_API_HOST = 'https://ec2-3-13-148-183.us-east-2.compute.amazonaws.com:';
const REACT_APP_API_PORT = '8080';

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