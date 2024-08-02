import { Configuration as IAMConfig, OpenCdxiamUserRestControllerApi } from "./iam";
import { Configuration as QuestionnaireConfig, OpenCdxRestQuestionnaireControllerApi } from "./questionnaire";
import { Configuration as ClassificationConfig, OpenCdxRestClassificationControllerApi } from "./classification";

const iam = new IAMConfig({
    basePath: (process.env.REACT_APP_API_HOST ?? '') + process.env.REACT_APP_API_PORT + "/iam"
});
iam.accessToken = async () => {
    return localStorage.getItem('serviceToken') || '';
}

const questionnaire = new QuestionnaireConfig({
    basePath: (process.env.REACT_APP_API_HOST ?? '') + process.env.REACT_APP_API_PORT + "/questionnaire"
});
questionnaire.accessToken = async () => {
    return localStorage.getItem('serviceToken') || '';
}

const classification = new ClassificationConfig({
    basePath: (process.env.REACT_APP_API_HOST ?? '') + process.env.REACT_APP_API_PORT + "/classification"
});
classification.accessToken = async () => {
    return localStorage.getItem('serviceToken') || '';
}

export const classificationApi = new OpenCdxRestClassificationControllerApi(classification);
export const iamApi = new OpenCdxiamUserRestControllerApi(iam);
export const questionnaireApi = new OpenCdxRestQuestionnaireControllerApi(questionnaire);