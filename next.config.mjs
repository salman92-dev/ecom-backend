/** @type {import('next').NextConfig} */
const nextConfig = {
  matcher: ["/products/:path*", "/login"],
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
