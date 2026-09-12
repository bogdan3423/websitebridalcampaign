import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  output: "export",
  images: {
    loader: "custom",
    loaderFile: "./image-loader.ts",
    deviceSizes: [480, 768, 1200, 1600],
    imageSizes: [320],
  },
  poweredByHeader: false,
};
export default nextConfig;
