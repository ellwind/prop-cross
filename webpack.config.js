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
            },
            {
                test: /\.scss$/,
                loader: 'style!css!sass'
            },
            { test: /\.css$/, loader: "style-loader!css-loader?importLoaders=1" },
            { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&minetype=application/font-woff" },
            { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" }
        ]
    }
};