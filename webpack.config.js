var path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = env => {
    console.log('env', env);

    return {
        devtool: 'source-map',
        entry: [
            './client/src/index.js'
        ],
        output: {
            path: path.join(__dirname, 'build'),
            filename: 'bundle.js',
            publicPath: '/build/'
        },
        module: {
            loaders: [
                {
                    test: /\.js/,
                    loaders: ['babel-loader'],
                    include: path.join(__dirname, 'client/src')
                },
                {
                    test: /\.css$/,
                    use: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: 'css-loader'
                    })
                },
                {
                    test: /\.(gif|png|jpe?g|svg)$/i,
                    use: [
                        'file-loader',
                        {
                            loader: 'image-webpack-loader',
                            options: {
                                bypassOnDebug: true,
                            },
                        },
                    ],
                }
            ]
        },
        plugins: [
            new ExtractTextPlugin('styles.css')
        ]
    }
}