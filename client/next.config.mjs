/** @type {import('next').NextConfig} */

import {
    PHASE_DEVELOPMENT_SERVER,
    PHASE_PRODUCTION_BUILD,
} from "next/constants.js";

const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "**",
                pathname: "**",
            },
        ],
    },
};

const nextConfigFunction = async (phase) => {
    if (phase === PHASE_DEVELOPMENT_SERVER || phase === PHASE_PRODUCTION_BUILD) {
        const withPWA = (await import("@ducanh2912/next-pwa")).default({
            dest: "public",
            disable: process.env.NODE_ENV === 'development',
            register: true,
            skipWaiting: true,
        });
        return withPWA(nextConfig);
    }
    return nextConfig;
};

export default nextConfigFunction;
