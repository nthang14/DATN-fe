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
    env: {
      firebaseApiKey: process.env.FIREBASE_API_KEY,
      firebaseAuthDomain: process.env.FIREBASE_DOMAIN,
      firebaseProjectId: process.env.FIREBASE_PROJECT_ID,
      firebaseStorageBucket: process.env.FIREBASE_STORAGE,
      firebaseMessagingSenderId: process.env.FIREBASE_MESSAGE_SENDER_ID,
      firebaseAppId: process.env.FIREBASE_APP_ID,
      firebaseMeasurementId: process.env.FIREBASE_MEASUREMENT_ID,
      firebaseVapiKey: process.env.FIREBASE_VAPI_KEY,
    },
    i18n: {
      locales: ["en", "jp"],
      defaultLocale: "en",
    },
    publicRuntimeConfig: {
      baseURL: process.env.REACT_APP_API_BASE_URL,
      rpcURL: process.env.RPC_URL,
      NETWORK: process.env.NETWORK,
      address: process.env.ADDRESS,
      basicAuthorization: process.env.BASIC_AUTHORIZATION,
      keyReCaptcha: process.env.KEY_RE_CAPTCHA,
      autoLogout: process.env.AUTO_LOGOUT,
      firebaseApiKey: process.env.FIREBASE_API_KEY,
      firebaseAuthDomain: process.env.FIREBASE_DOMAIN,
      firebaseProjectId: process.env.FIREBASE_PROJECT_ID,
      firebaseStorageBucket: process.env.FIREBASE_STORAGE,
      firebaseMessagingSenderId: process.env.FIREBASE_MESSAGE_SENDER_ID,
      firebaseAppId: process.env.FIREBASE_APP_ID,
      firebaseMeasurementId: process.env.FIREBASE_MEASUREMENT_ID,
      firebaseVapiKey: process.env.FIREBASE_VAPI_KEY,
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
