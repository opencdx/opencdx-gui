import axios from "axios";
const API_URL = 'https://ec2-3-13-148-183.us-east-2.compute.amazonaws.com:8080'; // <- ENV variable;
const apiIntercerptors = axios.create({
    baseURL: API_URL, // <- ENV variable
});
apiIntercerptors.interceptors.request.use((config) => {
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

apiIntercerptors.interceptors.response.use((response) =>
    response,
    async (error) => {
    return Promise.reject(error.response.data);
  },
);
const { get, post, put, destroy } = apiIntercerptors;
export { get, post, put, destroy };

export default apiIntercerptors;
