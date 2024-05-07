import axios from 'axios';
console.log(process.env.REACT_APP_API_DEV);
const API_URL =
    process.env.REACT_APP_API_DEV === true ? 'https://ec2-3-13-148-183.us-east-2.compute.amazonaws.com:8080' : 'https://localhost:8080/';

const apiInterceptors = axios.create({
    baseURL: API_URL // <- ENV variable
});
apiInterceptors.interceptors.request.use(
    (config) => {
        return {
            ...config,
            headers: {
                ...config.headers,
                Authorization: `Bearer ${localStorage.getItem('serviceToken')}` || ''
            }
        };
    },
    (error) => Promise.reject(error)
);

apiInterceptors.interceptors.response.use(
    (response) => response,
    async (error) => {
        return Promise.reject(error.response.data);
    }
);
const { get, post, put, destroy } = apiInterceptors;
export { get, post, put, destroy };

export default apiInterceptors;
