import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    reactStrictMode: false,
    turbopack: {
		rules: {
			'*.svg': {
				loaders: ['@svgr/webpack'],
				as: '*.js',
			},
		}
	},
    webpack(config) {
        config.cache = false;
        config.module.rules.push({
            test: /\.svg$/i,
            issuer: /\.[jt]sx?$/,
            use: ["@svgr/webpack"],
        });

        return config;
    },
};

export default nextConfig;
