module.exports = {
  module: {
    rules: [
      // ... other rules omitted

      // this will apply to both plain `.scss` files
      // AND `<style lang="scss">` blocks in `.vue` files
      {
        test: /\.less$/,
        use: [
          //'vue-style-loader',
          'css-loader',
          'less-loader'
        ]
      }
    ]
  },
  // plugin omitted
};