module.exports = {
  async redirects() {
    return [
      // Basic redirect
      {
        source: "/",
        destination: "/",
        permanent: true
      }
    ];
  }
};
