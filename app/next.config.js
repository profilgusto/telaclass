const withMDX = require('@next/mdx')({
    extension: /\.mdx?$/
  });
  
  module.exports = withMDX({
    pageExtensions: ['js', 'jsx', 'md', 'mdx'],
    webpack: (config, { isServer }) => {
      // Additional custom Webpack configuration if needed
      return config;
    }
  });