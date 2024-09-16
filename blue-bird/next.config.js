/** @type {import('next').NextConfig} */

module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'arweave.net',
        port: '',
      },
      {
        protocol: "https",
        hostname: "replicate.com",
    },
    {
        protocol: "https",
        hostname: "replicate.delivery",
    },
    ],
  },
}
