const path = require("path");
const { VueLoaderPlugin } = require("vue-loader");
const ESLintPlugin = require("eslint-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const { HotModuleReplacementPlugin } = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
    mode: "development",
    entry: "./src/main.ts",
    output: {
        filename: "index.js",
        path: path.resolve(__dirname, "dist")
    },
    devServer: {
        hot: true,
        port: 8080,
        open: true,
        overlay: true,
        compress: true,
        contentBase: false
    },
    watchOptions: {
        ignored: /node_modules/
    },
    module: {
        rules: [
            {
                test: /\.(svg|png|jpg|jpeg|gif)$/,
                use: {
                    loader: "file-loader",
                    options: {
                        name: "[name].[hash].[ext]",
                        outputPath: "imgs"
                    }
                }
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader"
                ],
            },
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "ts-loader",
                        options: {
                            configFile: path.resolve(__dirname, "./tsconfig.json"),
                            appendTsSuffixTo: [/\.vue$/]
                        }
                    }
                ]
            },
            {
                test: /\.vue$/,
                loader: "vue-loader",
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: path.resolve(__dirname, "index.html")
        }),
        new CleanWebpackPlugin(),
        new HotModuleReplacementPlugin(),
        new VueLoaderPlugin(),
        new ESLintPlugin({
            extensions: ["ts", "vue"]
        })
    ],
    resolve: {
        extensions: [".js", ".ts"],
        alias: {
            "SCSS": path.resolve(__dirname, "./src/SCSS/"),
            "Enums": path.resolve(__dirname, "./src/Enums/"),
            "Pages": path.resolve(__dirname, "./src/Pages/"),
            "Models": path.resolve(__dirname, "./src/Models/"),
            "Services": path.resolve(__dirname, "./src/Services/"),
            "Components": path.resolve(__dirname, "./src/Components/"),
            "TestDependencies": path.resolve(__dirname, "./src/TestDependencies/")
        }
    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                extractComments: false,
                terserOptions: {
                    output: {
                        comments: false
                    }
                }
            })
        ]
    }
}