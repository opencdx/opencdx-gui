import { Configuration as IAMConfig,OpenCdxiamUserRestControllerApi } from "./iam";
import { Configuration as QuestionnaireConfig , OpenCdxRestQuestionnaireControllerApi } from "./questionnaire";
import { Configuration as ClassificationConfig, OpenCdxRestClassificationControllerApi } from "./classification";
import exp from "constants";

const iam = new IAMConfig();
iam.accessToken = async () => {
    return localStorage.getItem('serviceToken') || '';
}

const questionnaire = new QuestionnaireConfig();
questionnaire.accessToken = async () => {
    return localStorage.getItem('serviceToken') || '';
}

const classification = new ClassificationConfig();
classification.accessToken = async () => {
    return localStorage.getItem('serviceToken') || '';
}

export const classificationApi = new OpenCdxRestClassificationControllerApi(classification);
export const iamApi = new OpenCdxiamUserRestControllerApi(iam);
export const questionnaireApi = new OpenCdxRestQuestionnaireControllerApi(questionnaire);