import { Configuration,OpenCdxiamUserRestControllerApi } from "./iam";

const configuration = new Configuration();
configuration.accessToken = async () => {
    return localStorage.getItem('serviceToken') || '';
}

export const iamApi = new OpenCdxiamUserRestControllerApi(configuration);