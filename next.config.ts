module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://oxtronapi.somee.com/:path',
      },
    ];
  },
};
