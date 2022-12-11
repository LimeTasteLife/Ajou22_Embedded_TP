/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: false,
  env: {
    JSON_RPC_PROVIDER: process.env.JSON_RPC_PROVIDER,
  },

  // //svg 이미지 파일 가져오기 위해서 웰팩 로더 설치
  // webpack(config) {
  //   config.module.rules.push({
  //     test: /\.svg$/,
  //     issuer: {
  //       test: /\.(js|ts)x?$/,
  //       // for webpack 5 use
  //       // { and: [/\.(js|ts)x?$/] }
  //     },
  //     use: ["@svgr/webpack"],
  //   });

  //   return config;
  // },
  // //npm install --save-dev @svgr/webpack 진행했음
};
