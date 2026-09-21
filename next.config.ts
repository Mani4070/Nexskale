import type { NextConfig } from "next";

const config: NextConfig = {
  distDir: process.env.NEXT_TEST_DIST_DIR || ".next",
  async redirects() {
    return [
      {
        source: "/work",
        destination: "/services",
        permanent: true,
      },
      {
        source: "/products",
        destination: "/services",
        permanent: true,
      },
      {
        source: "/products/:path*",
        destination: "/services",
        permanent: true,
      },
      {
        source: "/career",
        destination: "/careers",
        permanent: true,
      },
      {
        source: "/blogs",
        destination: "/blog",
        permanent: true,
      },
    ];
  },
};

export default config;
