/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        domains: ['share-your-visualization-uploads.s3.ap-southeast-1.amazonaws.com'],
    },
}

module.exports = nextConfig
