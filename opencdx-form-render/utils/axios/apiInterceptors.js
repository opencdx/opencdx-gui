import axios from "axios";
const API_URL ='https://ec2-3-13-148-183.us-east-2.compute.amazonaws.com:8080' ;
// const API_URL = 'https://localhost:8080';

const apiInterceptors = axios.create({
    baseURL: API_URL, // <- ENV variable
});
apiInterceptors.interceptors.request.use((config) => {
    return ({
        ...config,
        headers: {
            ...config.headers,
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('jwtToken')}` || '',
        },
    })
},
    error => Promise.reject(error),
);

apiInterceptors.interceptors.response.use((response) =>
    response,
    async (error) => {
    return Promise.reject(error.response.data);
  },
);
const { get, post, put, destroy } = apiInterceptors;
export { get, post, put, destroy };

export default apiInterceptors;
