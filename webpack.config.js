module.exports = (env, options) => {
    return {
        entry: {
            SimpleRangeSlider: './src/Plugin/Plugin.ts',
        },

        resolve: {
            extensions: ['.ts', '.js'],
        },

        output: {
            library: 'SimpleRangeSlider',
            libraryTarget: 'umd',
            libraryExport: 'default',
            filename: options.mode === 'development' ? '[name].js' : '[name].min.js',
            path: __dirname + '/dist',
        },

        mode: options.mode,
        devtool: options.mode === 'development' ? 'inline-source-map' : '',

        module: {
            rules: [
                {
                    test: /\.ts$/,
                    use: 'ts-loader',
                    exclude: [/node_modules/, /src\/Test/],
                },
            ]
        }
    }
}