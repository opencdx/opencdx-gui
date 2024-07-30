import axios from "axios";
const apiInterceptors = axios.create({
    baseURL: 'https://localhost:8080'
});
// const apiInterceptors = axios.create({
//     baseURL: 'https://localhost:8080'
// });
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
