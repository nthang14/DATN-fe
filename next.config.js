const withPlugins = require("next-compose-plugins");
const withLess = require("next-with-less");
const ContentSecurityPolicy = `
  script-src 'self' 'unsafe-inline';
  style-src 'self' 'unsafe-inline';
  font-src 'self';
  `;
const env = process.env.NODE_ENV;
module.exports = withPlugins([
  withLess({
    lessLoaderOptions: {
      lessOptions: {
        modifyVars: {
          "@primary-color": "#343943",
          "@link-color": "#262626",
          "@text-color": "#262626",
        },
        javascriptEnabled: true,
      },
    },
  }),

  {
    ssr: false,
    i18n: {
      locales: ["en", "jp"],
      defaultLocale: "en",
    },
    publicRuntimeConfig: {
      baseURL: process.env.REACT_APP_API_BASE_URL,
    },
    poweredByHeader: false,
    async headers() {
      return [
        {
          source: "/:path*",
          headers: [
            {
              key: "X-Frame-Options",
              value: "SAMEORIGIN",
            },
            {
              key: "Strict-Transport-Security",
              value: "max-age=63072000; includeSubDomains; preload",
            },
            {
              key: "X-Content-Type-Options",
              value: "nosniff",
            },
            // {
            //   key: 'Content-Security-Policy',
            //   value: ContentSecurityPolicy.replace(/\s{2,}/g, ' ').trim()
            // }
          ],
        },
      ];
    },
    images: {
      dangerouslyAllowSVG: true,
      remotePatterns: [
        {
          protocol: "https",
          hostname: "**",
        },
      ],
    },
  },
]);
