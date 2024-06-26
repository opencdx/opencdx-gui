import { post } from '@/axios/graphqlInterceptors';

export const Graphql = {
    post: (params) => post('', params)
};
