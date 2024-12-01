import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["images.igdb.com"],
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/inicio",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
