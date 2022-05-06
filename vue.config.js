module.exports = {
    devServer: {
        host: 'localhost',
        port: '8080',
        https: false,
        proxy: {
            '/': {
                target: 'http://localhost:10086',
                //发送请求头host会被设置target
                changeOrigin: true,
                pathRewrite: {
                    '^/': '/'
                }
            }
        }
    }
}