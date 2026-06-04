import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Domínio antigo -> novo (redirect permanente preservando o caminho)
      {
        source: "/:path*",
        has: [{ type: "host", value: "disc-profile-sigma.vercel.app" }],
        destination: "https://consciencia-autoconhecimento.vercel.app/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
