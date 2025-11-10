/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.bing.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "media.geeksforgeeks.org",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "your-project-id.supabase.co",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "i.ytimg.com", 
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
