// next.config.js
const withOffline  = require('next-offline');

module.exports = withOffline({
  generateInDevMode: true, // Set to true if you want to enable service workers in development
  skipWaiting: true, // Set to true to skip the waiting phase when a new service worker is activated
  // Other Next.js configuration options
  // ...
});
