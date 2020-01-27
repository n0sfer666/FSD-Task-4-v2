const Webpack = require('webpack');

module.exports = {
    entry: {
        demo: './src/Demo/index.js',
    },

    output: {
        filename:'[name].js',
        path: __dirname + '/docs',
    },

    devtool: 'eval',

    plugins: [
        new Webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        }),
    ]
}