/** @type {import('next').NextConfig} */
const withNextIntl = require('next-intl/plugin')();

const nextConfig = {
    reactStrictMode: false,
    env: {      

        },
}

module.exports =withNextIntl( nextConfig);
