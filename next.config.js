const withOffline = require('next-offline');
const withPWA = require('next-pwa');

module.exports = withOffline(
  withPWA({
    generateInDevMode: true, // Set to true if you want to enable service workers in development
    skipWaiting: true, // Set to true to skip the waiting phase when a new service worker is activated
    pwa: {
      dest: 'public', // The directory where the service worker file will be placed
      register: true, // Enable service worker registration
      sw: 'service-worker.js', // The path to your custom service worker file
    },
    // Other Next.js configuration options
    // ...
  })
);
