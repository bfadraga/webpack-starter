
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizePlugin = require('css-minimizer-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    mode: 'production', 
    output: {
        filename: 'main.[contenthash].js',
        clean: true
    },
    module: {
        rules: [
           {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: 'babel-loader'  // ← Sin options aquí
            },
            {
                test:/\.css$/,
                exclude: /styles\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test:/styles\.css$/,
                use: [
                    MiniCssExtractPlugin.loader, // Toma el CSS procesado y lo guarda en archivo en la carpeta dist
                    'css-loader' // procesa el css:Convierte CSS en algo que JavaScript entienda
                ]
            },
            {
                test: /\.html$/i,
                loader: 'html-loader',
                options: {
                    sources: false,
                    minimize: true
                },
            },
            {
                 test: /\.(png|jpg|jpeg|gif|svg)$/i,
                type: 'assets/resource', // ← Reemplaza a file-loader
                generator: {
                    filename: 'asset/[hash][ext]' // ← Donde guardar las imágenes
                } 
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: './src/index.html', // Tu plantilla base
            filename: './index.html',   // Donde guardar el resultado
            inject: 'body',  // ← ESTA LÍNEA FALTA
            minify: true
        }),

        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
            ignoreOrder: false
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: "src/assets",
                    to: "assets"  // ← Ahora va dentro de patterns
                }
            ]
        }),
        new TerserPlugin({ // ← Minificador de JavaScript (viene con webpack 5)
                terserOptions: {
                    compress: {
                        drop_console: true, // ← Opcional: elimina console.log
                    }
                }
            }),
    ],
    optimization: {
    // Minimizadores
        minimizer: [
            new CssMinimizePlugin() // ← Minimiza CSS
        
    ],
    }
};
