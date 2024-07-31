import { Configuration as IAMConfig,OpenCdxiamUserRestControllerApi } from "./iam";
import { Configuration as QuestionnaireConfig , OpenCdxRestQuestionnaireControllerApi } from "./questionnaire";
import { Configuration as ClassificationConfig, OpenCdxRestClassificationControllerApi } from "./classification";
import exp from "constants";

const iam = new IAMConfig({
    basePath: "https://ec2-3-13-148-183.us-east-2.compute.amazonaws.com:8080/iam"
});
iam.accessToken = async () => {
    return localStorage.getItem('serviceToken') || '';
}

const questionnaire = new QuestionnaireConfig({
    basePath: "https://ec2-3-13-148-183.us-east-2.compute.amazonaws.com:8080/questionnaire"
});
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