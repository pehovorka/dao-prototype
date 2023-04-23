/* eslint-disable @typescript-eslint/no-var-requires */
const { version: webVersion } = require("./package.json");
const { version: contractsVersion } = require("contracts/package.json");

/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ["cs", "en"],
    defaultLocale: "cs",
  },
  publicRuntimeConfig: {
    webVersion,
    contractsVersion,
  },
};

module.exports = nextConfig;
