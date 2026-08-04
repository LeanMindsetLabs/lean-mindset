import type { NextConfig } from "next";
import { LEAN_MINDSET } from "./config/project-credentials";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: LEAN_MINDSET.domain.apex }],
        destination: `${LEAN_MINDSET.domain.productionUrl}/:path*`,
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
