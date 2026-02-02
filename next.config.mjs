/** @type {import('next').NextConfig} */
const nextConfig = {
   async redirects() {
    return [
      {
        source: "/",
        destination: "/products",
        permanent: true, // true = 308, false = 307
      },
    ];
  },
};

export default nextConfig;
