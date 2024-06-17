import axios from 'axios';

const apiInterceptors = axios.create({
    baseURL: 'https://ec2-3-13-148-183.us-east-2.compute.amazonaws.com:8080'
});
// const apiInterceptors = axios.create({
//     baseURL: 'https://localhost:8080'
// });
// const apiInterceptors = axios.create({
//     baseURL: process.env.REACT_APP_API_HOST + process.env.REACT_APP_API_PORT
// });
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
const { get, post, put, delete: remove } = apiInterceptors;
export { get, post, put , remove};

export default apiInterceptors;
