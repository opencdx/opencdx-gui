import { get, post, put, remove } from '@/axios/apiInterceptors';

export const Endpoints = {
    login: (params) => post('/iam/user/login', params),
    signup: (params) => post('/iam/user/signup', params),
    userResponses: (params) => post('/questionnaire/questionnaire/list', params),
    getQuestionnaireList: (params) => post('/questionnaire/questionnaire/list', params),
    getQuestionnaireById: (params) => get('/questionnaire/questionnaire/' + params.id, params),
    deleteQuestionnaireById: (params) => remove('/questionnaire/questionnaire/' + params.id, params),
    submitQuestionnaire: (params) => post('/questionnaire/questionnaire', params),
    updateQuestionnaire: (params) => put('/questionnaire/questionnaire', params),
};
