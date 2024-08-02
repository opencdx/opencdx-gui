/** @type {import('next').NextConfig} */
const withNextIntl = require('next-intl/plugin')();

const nextConfig = {
    reactStrictMode: false,
    env: {
        //Mock Server local host and port number 
       
        // REACT_APP_API_HOST: 'http://localhost:',
        // REACT_APP_API_PORT:'4001',
        // REACT_APP_GRAPHQL_HOST: 'http://localhost:',
        // REACT_APP_GRAPHQL_PORT:'4000',

        //Production Server host and port number

        REACT_APP_API_HOST: 'https://ec2-3-13-148-183.us-east-2.compute.amazonaws.com:',
        REACT_APP_API_PORT:'8080',
        REACT_APP_GRAPHQL_HOST: 'http://ec2-3-13-148-183.us-east-2.compute.amazonaws.com:',
        REACT_APP_GRAPHQL_PORT:'8632',

        // Local Server host and port number

        // REACT_APP_API_HOST: 'https://localhost:',
        // REACT_APP_API_PORT:'8080',
        // REACT_APP_GRAPHQL_HOST: 'http://localhost:',
        // REACT_APP_GRAPHQL_PORT:'8632',

        },
}

module.exports =withNextIntl( nextConfig);
