import { get, post, put, destroy } from '../axios/apiInterceptors';

export const Endpoints = {
    login: (params) =>
        post('/iam/user/login', params),
    userResponses: (params) =>
        post('/questionnaire/user/questionnaire/list', params),
    submitUserQuestionnaire: (params) =>
        post('/questionnaire/user/questionnaire', params),
    questionnaireList: (params) =>
        post('/questionnaire/questionnaire/list', params),
    submitQuestionnaire: (params) =>
        post('/questionnaire/questionnaire', params),
}