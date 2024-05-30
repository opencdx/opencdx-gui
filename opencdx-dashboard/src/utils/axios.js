/**
 * axios setup to use mock service
 */

import axios from 'axios';
const axiosServices = axios.create({
    baseURL: 'https://ec2-3-13-148-183.us-east-2.compute.amazonaws.com:8080'
});
// const axiosServices = axios.create({
//     baseURL: 'https://localhost:8080'
// });

// const axiosServices = axios.create({
//   baseURL:  process.env.REACT_APP_API_HOST + process.env.REACT_APP_API_PORT });

axiosServices.interceptors.request.use(
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
// interceptor for http
axiosServices.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Wrong Services')
);

export default axiosServices;
