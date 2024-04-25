import axios from "axios";
const API_URL = 'https://localhost:8080'; // <- ENV variable;
const apiInterceptors = axios.create({
    baseURL: API_URL, // <- ENV variable
});
apiInterceptors.interceptors.request.use((config) => {
    return ({
        ...config,
        headers: {
            ...config.headers,
            Authorization: `Bearer ${localStorage.getItem('serviceToken')}` || '',
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
