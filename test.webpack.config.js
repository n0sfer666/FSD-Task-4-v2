module.exports = {
    resolve: {
        extensions: ['.ts', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                // include: [/\.spec\.ts/],
                exclude: [
                    /node_modules/,
                    /src\\plugin/
                ],
            },
        ]
    }
}