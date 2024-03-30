module.exports = {
  async redirects() {
    return [
      // Basic redirect
      {
        source: "/",
        destination: "/dashboard",
        permanent: true
      },
      // Wildcard path matching
      {
        source: "/blog/:slug",
        destination: "/nes/:slug",
        permanent: true
      }
    ];
  }
};
