const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function setupProxy(app) {
  app.use(
    '/notes',
    createProxyMiddleware({
      target: 'http://localhost:5025',
      changeOrigin: true
    })
  );
};
