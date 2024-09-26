const { override, addWebpackModuleRule } = require('customize-cra');

module.exports = override(
  addWebpackModuleRule({
    test: /\.mdx$/,
    use: [
      {
        loader: '@mdx-js/loader',
        options: {
          // MDX options if any
        }
      }
    ]
  }),
  addWebpackModuleRule({
    devServer: {
      hot: true, 
    }
  }),
);