/** @type {import('next').NextConfig} */
const withNextIntl = require('next-intl/plugin')();

const nextConfig = {
    reactStrictMode: false,
    env: {

    },
    basePath: '/dashboard',
    // Removed root redirect; rely on explicit routes
    eslint: {
        // Warning: This allows production builds to successfully complete even if
        // your project has ESLint errors.
        ignoreDuringBuilds: true,
    },
    webpack: (config, { dev }) => {
        if (dev) {
            // Disable dev source maps to avoid 404s on missing .map files
            config.devtool = false;
        }
        return config;
    },
}

module.exports = withNextIntl(nextConfig);
