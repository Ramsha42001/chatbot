// webpack.config.js
const path = require('path');

module.exports = {
    entry: './src/Components/Widget/Widget.js', 
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'widget.bundle.js',
        library: 'MyWidget', 
        libraryTarget: 'umd', 
        publicPath: '/dist/', 
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/, 
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-react', '@babel/preset-env'],
                    },
                },
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true, 
                            importLoaders: 1,
                        },
                    },
                ],
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[hash].[ext]',
                            outputPath: 'images',
                        },
                    },
                ],
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    externals: {
        react: 'React',
        'react-dom': 'ReactDOM',
    },
    mode: 'production', 
};
