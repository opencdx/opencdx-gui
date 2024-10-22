import { Configuration as IAMConfig, OpenCdxiamUserRestControllerApi } from "./iam";
import { Configuration as QuestionnaireConfig, OpenCdxRestQuestionnaireControllerApi } from "./questionnaire";
import { Configuration as ClassificationConfig, OpenCdxRestClassificationControllerApi } from "./classification";


const classification = new ClassificationConfig({
    basePath: (process.env.NEXT_PUBLIC_API_HOST ?? 'https://localhost') + (process.env.NEXT_PUBLIC_API_PORT ?? ':8080' ) + "/classification"
});
classification.accessToken = async () => {
    return localStorage.getItem('serviceToken') || '';
}
const iam = new IAMConfig({
    basePath: (process.env.NEXT_PUBLIC_API_HOST ?? 'https://localhost') + (process.env.NEXT_PUBLIC_API_PORT ?? ':8080' ) + "/iam"
});
iam.accessToken = async () => {
    return localStorage.getItem('serviceToken') || '';
}



const questionnaire = new QuestionnaireConfig({
    basePath: (process.env.NEXT_PUBLIC_API_HOST ?? 'https://localhost') + (process.env.NEXT_PUBLIC_API_PORT ?? ':8080' ) + "/questionnaire"
});
questionnaire.accessToken = async () => {
    return localStorage.getItem('serviceToken') || '';
}
export const classificationApi = new OpenCdxRestClassificationControllerApi(classification);
export const iamApi = new OpenCdxiamUserRestControllerApi(iam);
export const questionnaireApi = new OpenCdxRestQuestionnaireControllerApi(questionnaire);