module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/virtual-illumination-lamp/'
    : '/',
  devServer: {
    allowedHosts: 'all'
  }
}