module.exports = {
  baseUrl: process.env.NODE_ENV === 'staging' ? '/explorer/' : '/',
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        // target: 'http://10.10.10.100:8080',
        pathRewrite: {'^/api' : ''}
      },
      '/ws': {
        target: 'http://localhost:8080',
        pathRewrite: {'^/ws' : ''}
      }
    }
  }
}
