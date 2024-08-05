/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
          {
            source: '/',
            destination: '/dashboard/utils',
            permanent: true, // true 表示永久重定向
          },
        ];
      },
};

module.exports = nextConfig;
