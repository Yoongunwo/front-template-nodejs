// // this file is used to proxy the request to the backend server
// // so that we can avoid CORS issue in development
const { createProxyMiddleware } = require('http-proxy-middleware');

// module.exports = function (app) {
//   app.use(
//     '/api',
//     createProxyMiddleware({
//       target: 'http://0.0.0.0:8000',
//       changeOrigin: true,
//     })
//   );
// };

module.exports = function (app) {
  const API_URL = process.env.REACT_APP_API_URL;
  const API_PREFIX = process.env.REACT_APP_API_PREFIX;

  if (!API_URL) {
    console.warn('API_URL is not defined in environment variables');
    return;
  }

  app.use(
    API_PREFIX,
    createProxyMiddleware({
      target: API_URL,
      changeOrigin: true,
      pathRewrite: {
        [`^${API_PREFIX}`]: '',
      },
      onError: (err, req, res) => {
        console.error('Proxy Error:', err);
        res.status(500).json({ error: 'Proxy Error' });
      },
      logLevel: 'debug',
    })
  );
};
