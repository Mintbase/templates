
/** @type {import('next').NextConfig} */

const { NormalModuleReplacementPlugin } = require('webpack');


const nextConfig = {
      webpack: (config, { isServer, webpack}) => {
    // if (!isServer) {
    //   config.resolve.fallback = {
    //     formidable: false, //here add the packages names and set them to false
    //   };
    // }
    // config.plugins.push(new webpack.DefinePlugin({ "global.GENTLY": false }));

      config.plugins.push(
        new NormalModuleReplacementPlugin(/^hexoid$/, require.resolve('hexoid/dist/index.js')),
    );

    return config;
  },
}

module.exports = nextConfig
