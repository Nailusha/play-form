const path = require('path');

module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/<название-вашего-репозитория>/'
    : '/',
  transpileDependencies: true,
  chainWebpack: config => {
    // Добавляем правила для обработки аудиофайлов
    config.module
      .rule('audio')
      .test(/\.(ogg|mp3|wav|mpe?g)$/i)
      .use('file-loader')
      .loader('file-loader')
      .options({
        name: 'assets/sounds/[name].[ext]'
      });
  }
};

