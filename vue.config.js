module.exports = {
    devServer: {
        host: 'localhost',
        port: '8080',
        https: false,
        proxy: {
            '/smart-campus': {
                target: 'http://localhost:10086',
                //发送请求头host会被设置target
                changeOrigin: true,
                pathRewrite: {
                    '^/smart-campus': '/smart-campus'
                }
            }
        }
    }
}