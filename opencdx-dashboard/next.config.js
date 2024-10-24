/** @type {import('next').NextConfig} */
const withNextIntl = require('next-intl/plugin')();

const nextConfig = {
    reactStrictMode: false,
    env: {

    },
    basePath: '/dashboard',
}

module.exports = withNextIntl(nextConfig);
