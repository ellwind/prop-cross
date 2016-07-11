module.exports = {
    entry: './app/index.js',
    output: {
        path: './bin',
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.json$/,
                loader: 'json'
            }, {
                test: /.*\.html$/,
                exclude: /index\.html/,
                loader: 'raw'
            }, {
                test: /\.js$/,
                exclude: /(node_modules)/,
                loader: "ng-annotate?add=true!babel?presets[]=es2015&presets[]=stage-3"
            }
        ]
    }
};