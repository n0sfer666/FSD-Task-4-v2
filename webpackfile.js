module.exports = {
    entry: {
        demo: './src/Demo/index.js',
    },

    output: {
        filename:'[name].js',
        path: __dirname + '/docs',
    },

    devtool: 'eval',
}