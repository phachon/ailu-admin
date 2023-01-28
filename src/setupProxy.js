const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
    app.use(
        createProxyMiddleware("/admin-api", {
            target: "http://127.0.0.1:8088/",
            changeOrigin: true,
            pathRewrite: {
                "^/admin-api": ""
            }
        })
    );
};