const path = require("path");
const { VueLoaderPlugin } = require("vue-loader");
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
        contentBase: false,
        hot: true,
        port: 8080,
        open: true,
        compress: true,
        overlay: true
    },
    watchOptions: {
        ignored: /node_modules/
    },
    module: {
        rules: [
            // {
            //     test: /\.js$/,
            //     exclude: /node_modules/,
            //     use: [{
            //         loader: "babel-loader",
            //         options: {
            //             presets: ["@babel/preset-env"],
            //             plugins: [
            //                 "@babel/plugin-transform-runtime",
            //                 ["import", {
            //                     "libraryName": "antd",
            //                     "style": true,   // or "css"
            //                 }, "antd"]
            //             ]
            //         }
            //     }],
            // },
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
        new VueLoaderPlugin()
    ],
    resolve: {
        extensions: [".js", ".ts"],
        alias: {
            "Enums": path.resolve(__dirname, "./src/Enums/"),
            "Models": path.resolve(__dirname, "./src/Models/")
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