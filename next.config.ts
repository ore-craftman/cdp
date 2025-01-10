import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Redirect base route to User management screen
      {
        source: "/",
        destination: "/user-management",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
