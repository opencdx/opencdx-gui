import axios from 'axios';

let graphqlUrl;
if (process.env.REACT_APP_API_DEV) graphqlUrl = 'http://ec2-3-13-148-183.us-east-2.compute.amazonaws.com:8632/';
else graphqlUrl = 'https://localhost:8632/';

const axiosServices = axios.create({ baseURL: graphqlUrl });

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
