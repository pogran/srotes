const path = require('path'),
      ExtractTextPlugin = require('extract-text-webpack-plugin'),
      Dotenv = require('dotenv-webpack'),
      webpack = require('webpack');

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
            new ExtractTextPlugin('styles.css'),
            new Dotenv({
                path: `${env.NODE_ENV}.env`
            }),
            new webpack.DefinePlugin({
                'process.env': {
                    'prod': env.NODE_ENV === 'prod',
                }
            }),
        ]
    }
}