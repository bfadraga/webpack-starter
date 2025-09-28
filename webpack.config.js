
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: 'development', // para que se vean mis comentarios en modo desarrollo
    module: {
        rules: [
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
                    minimize: false
                },
            },
            {
                 test: /\.(png|jpg|jpeg|gif|svg)$/i,
                type: 'assets/resource', // ← Reemplaza a file-loader
                generator: {
                    filename: 'assets/[hash][ext]' // ← Donde guardar las imágenes
                } 
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: './src/index.html', // Tu plantilla base
            filename: './index.html',   // Donde guardar el resultado
            inject: 'body',  // ← ESTA LÍNEA FALTA
            minify: false
        }),

        new MiniCssExtractPlugin({
            filename: '[name].css',
            ignoreOrder: false
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: "src/assets",
                    to: "assets"  // ← Ahora va dentro de patterns
                }
            ]
        })
    ],
    optimization: {
    // Minimizadores
        minimizer: [
            new CssMinimizerWebpackPlugin() // ← Minimiza CSS
        
    ],
    }
};
