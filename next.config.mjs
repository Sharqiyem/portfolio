import TerserPlugin from 'terser-webpack-plugin';

/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { dev, isServer }) => {
        // Only run this in client-side production builds
        if (!dev && !isServer) {
            // Disable console.* functions
            config.optimization.minimize = true;
            config.optimization.minimizer.push(new TerserPlugin({
                terserOptions: {
                    compress: {
                        drop_console: true,
                    },
                    output: {
                        comments: false,
                    },
                },
            }));
        }

        return config;
    },
};

export default nextConfig;