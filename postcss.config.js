let mode = process.env.NODE_ENV;
let config = {
    plugins: {
        'postcss-import': {},
        'postcss-simple-vars': {},
        'postcss-nested': {},
        'postcss-font-magician': {},
        'autoprefixer': {},
    }
};
if(mode === 'development') {
    config.plugins['postcss-discard-comments'] = {};
}
if(mode === 'production') {
    config.plugins['cssnano'] = {};
}
module.exports = config; 