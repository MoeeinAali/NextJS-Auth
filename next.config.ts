import type {NextConfig} from "next";

const nextConfig: NextConfig = {
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
