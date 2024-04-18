import { get, post, put, destroy } from 'utils/axios/apiInterceptors';

export const Endpoints = {
    login: (params) =>
        post('/iam/user/login', params),
    signup: (params) =>
        post('/iam/user/signup', params),
    userList: (params) =>
        post('/iam/user/list', params),
    userResponses: (params) =>
        post('/questionnaire/user/questionnaire/list', params),
    rulesetList: (params) =>
        post('/classification/ruleset/list', params),
    submitQuestionnaire: (params) =>
        post('/questionnaire/questionnaire', params),
    getSmsList: (params) =>
        post('/communications/sms/list', params),
    getEmailList: (params) =>
        post('/communications/email/list', params),
}