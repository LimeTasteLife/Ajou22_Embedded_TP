/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: false,
  env: {
    JSON_RPC_PROVIDER: process.env.JSON_RPC_PROVIDER,
  },
};
