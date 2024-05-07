import { post } from 'utils/axios/graphqlInterceptors';

export const Graphql = {
    post: (params) => post('', params)
};
