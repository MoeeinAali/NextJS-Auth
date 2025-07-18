import type {NextConfig} from "next";

const nextConfig: NextConfig = {
    experimental: {
        authInterrupts: true
    },
    images: {
        remotePatterns: [
            {
                protocol: "http",
                hostname: 'minio-classbon.darkube.app'
            }
        ]
    }
};

export default nextConfig;
