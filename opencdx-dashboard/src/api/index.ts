import { Configuration as IAMConfig, OpenCdxiamUserRestControllerApi } from "./iam";
import { Configuration as QuestionnaireConfig, OpenCdxRestQuestionnaireControllerApi } from "./questionnaire";
import { Configuration as ClassificationConfig, OpenCdxRestClassificationControllerApi } from "./classification";
import { Configuration as LogisticsConfig, OpenCdxRestManufacturerControllerApi } from "./logistics";
import { Configuration as CommunicationsConfig, OpenCdxRestCommunicationsControllerApi } from "./communications";


const classification = new ClassificationConfig({
    basePath: "https://api.dev-1.opencdx.io/classification"
});
classification.accessToken = async () => {
    return localStorage.getItem('serviceToken') || '';
}
const iam = new IAMConfig({
    basePath: "https://api.dev-1.opencdx.io/iam",
    baseOptions: {
        headers: {
            'Content-Type': 'application/json',
        }
    },
    
    
});
iam.accessToken = async () => {
    return localStorage.getItem('serviceToken') || '';
}
iam.baseOptions = {
    headers: {
        'Content-Type': 'application/json',
    }
}



const questionnaire = new QuestionnaireConfig({
    basePath: "https://api.dev-1.opencdx.io/questionnaire"
});
questionnaire.accessToken = async () => {
    return localStorage.getItem('serviceToken') || '';
}

const logistics = new LogisticsConfig({
    basePath: "https://api.dev-1.opencdx.io/logistics"
});
logistics.accessToken = async () => {
    return localStorage.getItem('serviceToken') || '';
}

const communications = new CommunicationsConfig({
    basePath: "https://api.dev-1.opencdx.io/communications"
});
communications.accessToken = async () => {
    return localStorage.getItem('serviceToken') || '';
}

export const logisticsApi = new OpenCdxRestManufacturerControllerApi(logistics);
export const classificationApi = new OpenCdxRestClassificationControllerApi(questionnaire);
export const iamApi = new OpenCdxiamUserRestControllerApi(iam);
export const questionnaireApi = new OpenCdxRestQuestionnaireControllerApi(questionnaire);
export const communicationsApi = new OpenCdxRestCommunicationsControllerApi(communications);