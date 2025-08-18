import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  devIndicators: false,
  eslint: {
    dirs: ["utils"],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.westelm.co.uk",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "dnn2wvbhzy3u8.cloudfront.net",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "m.media-amazon.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.facebook.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
        net: false,
        dns: false,
        child_process: false,
        tls: false,
      };
    }

    return config;
  },
};

export default nextConfig;
