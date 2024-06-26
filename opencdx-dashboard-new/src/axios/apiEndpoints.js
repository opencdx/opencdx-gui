import { get, post, put, remove } from '@/axios/apiInterceptors';

export const Endpoints = {
    login: (params) => post('/iam/user/login', params),
    signup: (params) => post('/iam/user/signup', params),
    userList: (params) => post('/iam/user/list', params),
    userResponses: (params) => post('/questionnaire/questionnaire/list', params),
    getQuestionnaireList: (params) => post('/questionnaire/questionnaire/list', params),
    getQuestionnaireById: (params) => get('/questionnaire/questionnaire/' + params.id, params),
    deleteQuestionnaireById: (params) => remove('/questionnaire/questionnaire/' + params.id, params),
    rulesetList: (params) => post('/classification/ruleset/list', params),
    submitQuestionnaire: (params) => post('/questionnaire/questionnaire', params),
    updateQuestionnaire: (params) => put('/questionnaire/questionnaire', params),
    getSmsList: (params) => post('/communications/sms/list', params),
    getEmailList: (params) => post('/communications/email/list', params),
    getUserProfile: (params) => get('/iam/user/profile/5f63a53ddcc67c7a1c3d93e8', params),
    updateProfile: (params) => put('/iam/user/profile/5f63a53ddcc67c7a1c3d93e8', params),
    getCurrentUser: (params) => get('/iam/user/current', params),
    getAuditLog: (params) => post('/audit/list', params)
};
