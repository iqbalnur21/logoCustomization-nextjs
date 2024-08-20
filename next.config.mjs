
/** @type {import('next').NextConfig} */
const nextConfig = {};

// module.exports = {
//   reactStrictMode: true,
//   webpack5: true,
//   webpack: (config) => {
//     config.resolve.fallback = {
//       fs: false,
//     };
//     return config;
//   },
// };

export default nextConfig;

// module.exports = {
//     reactStrictMode: true,
//     images: {
//       formats: ['image/avif', 'image/webp'],
//       dangerouslyAllowSVG: true,
//       contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
//     },
//     webpack(config) {
//       config.module.rules.push({
//         test: /\.svg$/,
//         use: ['@svgr/webpack'],
//       });

//       return config;
//     },
//   };
