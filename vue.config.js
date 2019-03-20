console.log(process.env.NODE_ENV)
module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        // target: 'http://10.10.10.100:8080',
        pathRewrite: {'^/api' : ''}
      },
      // Hub is proxy server about elasticsearch
      '/hub': {
        target: 'http://localhost:3000',
        pathRewrite: {'^/hub' : ''}
      },
      '/ws': {
        target: 'http://localhost:8080',
        pathRewrite: {'^/ws' : ''}
      }
    }
  }
}
