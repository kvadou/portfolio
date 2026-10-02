import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/projects/ops-command-center", destination: "/projects/opshub", permanent: true },
      { source: "/projects/talent-acquisition-platform", destination: "/projects/hiring", permanent: true },
      { source: "/projects/franchise-management-system", destination: "/projects/franchise", permanent: true },
      { source: "/projects/workforce-training-portal", destination: "/projects/tutors", permanent: true },
      { source: "/projects/creative-studio", destination: "/projects/studio", permanent: true },
    ];
  },
};

export default nextConfig;
