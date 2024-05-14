import axios from 'axios';

const axiosServices = axios.create({ baseURL: process.env.REACT_APP_GRAPHQL_HOST + process.env.REACT_APP_GRAPHQL_PORT });

axiosServices.interceptors.request.use(
    (config) => {
        return {
            ...config
        };
    },
    (error) => Promise.reject(error)
);

axiosServices.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject((error.response && error.response.data) || 'Wrong Services')
);

const { post } = axiosServices;
export { post };

export default axiosServices;
