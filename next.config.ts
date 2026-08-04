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
      // Production cutover: V2 is the live member app (temporary redirects = easy V1 rollback)
      { source: "/home", destination: "/v2/home", permanent: false },
      { source: "/home/:path*", destination: "/v2/home", permanent: false },
      { source: "/nutrition", destination: "/v2/meals", permanent: false },
      { source: "/nutrition/:path*", destination: "/v2/meals", permanent: false },
      { source: "/check-in", destination: "/v2/check-in", permanent: false },
      { source: "/check-in/:path*", destination: "/v2/check-in", permanent: false },
      { source: "/train", destination: "/v2/train", permanent: false },
      { source: "/train/:path*", destination: "/v2/train", permanent: false },
      { source: "/profile", destination: "/v2/profile", permanent: false },
      { source: "/profile/:path*", destination: "/v2/profile", permanent: false },
      { source: "/program", destination: "/v2/program", permanent: false },
      { source: "/program/:path*", destination: "/v2/program", permanent: false },
    ];
  },
};

export default nextConfig;
