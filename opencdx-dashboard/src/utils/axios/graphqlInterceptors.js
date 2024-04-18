import axios from 'axios';

const GRAPHQL_PORT = '8632'
const graphqlUrl = 'http://localhost:' + GRAPHQL_PORT;
const axiosServices = axios.create({ baseURL: graphqlUrl });

axiosServices.interceptors.request.use((config) =>  {
    return ({
        ...config,
    })
},
error => Promise.reject(error),
);

axiosServices.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject((error.response && error.response.data) || 'Wrong Services')
);

const { post } = axiosServices;
export { post };

export default axiosServices;