/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'placehold.co',
            },
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com'
            }
        ]
    },
    reactStrictMode: false,
    rewrites: async () => [
        {
            source: '/api/:path*',
            destination: '/api/:path*',
        },
    ],
};

export default nextConfig;
