import axios from 'axios';

const GRAPHQL_PORT = '8632'
const graphqlUrl = 'http://ec2-3-13-148-183.us-east-2.compute.amazonaws.com:8632/';
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