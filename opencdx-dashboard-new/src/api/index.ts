import { Configuration as IAMConfig, OpenCdxiamUserRestControllerApi } from "./iam";
import { Configuration as QuestionnaireConfig, OpenCdxRestQuestionnaireControllerApi } from "./questionnaire";
import { Configuration as ClassificationConfig, OpenCdxRestClassificationControllerApi } from "./classification";
import { Configuration as LogisticsConfig, OpenCdxRestManufacturerControllerApi } from "./logistics";



const classification = new ClassificationConfig({
    basePath: (process.env.REACT_APP_API_HOST ?? '') + process.env.REACT_APP_API_PORT + "/classification"
});
classification.accessToken = async () => {
    return localStorage.getItem('serviceToken') || '';
}
const iam = new IAMConfig({
    basePath: (process.env.REACT_APP_API_HOST ?? '') + process.env.REACT_APP_API_PORT + "/iam",
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
    basePath: (process.env.REACT_APP_API_HOST ?? '') + process.env.REACT_APP_API_PORT + "/questionnaire"
});
questionnaire.accessToken = async () => {
    return localStorage.getItem('serviceToken') || '';
}

const logistics = new LogisticsConfig({
    basePath: (process.env.REACT_APP_API_HOST ?? '') + process.env.REACT_APP_API_PORT + "/logistics"
});
logistics.accessToken = async () => {
    return localStorage.getItem('serviceToken') || '';
}

export const logisticsApi = new OpenCdxRestManufacturerControllerApi(logistics);
export const classificationApi = new OpenCdxRestClassificationControllerApi(questionnaire);
export const iamApi = new OpenCdxiamUserRestControllerApi(iam);
export const questionnaireApi = new OpenCdxRestQuestionnaireControllerApi(questionnaire);