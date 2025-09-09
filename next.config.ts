import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL("https://ecommerce.routemisr.com/**/**")],
  },
};

export default nextConfig;
