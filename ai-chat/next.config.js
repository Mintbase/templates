/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    // eslint-disable-next-line no-param-reassign
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false, // https://stackoverflow.com/a/67478653/470749
    };

    return config;
  },
};

module.exports = nextConfig;
