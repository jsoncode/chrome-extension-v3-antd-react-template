const path = require("path");
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CracoLessPlugin = require('craco-less')
const { theme } = require('antd/lib');
const { convertLegacyToken } = require('@ant-design/compatible/lib');

const { defaultAlgorithm, defaultSeed } = theme;

const mapToken = defaultAlgorithm(defaultSeed);
const v4Token = convertLegacyToken(mapToken);

module.exports = {
    webpack: {
        alias: {
            '@': path.resolve('./src'),
        },
        configure(webpackConfig) {
            let newConfig = {
                ...webpackConfig,
                // 关闭source-map
                devtool: false,
                // 去掉main.js文件名中的hash值
                output: {
                    ...webpackConfig.output,
                    filename: 'static/js/[name].js',
                    chunkFilename: 'static/js/[name].chunk.js',
                    path: path.join(__dirname, 'build'),
                    assetModuleFilename: 'static/media/[name].[ext]',
                    hotUpdateChunkFilename: "static/js/[id].hot-update.js",
                    hotUpdateMainFilename: "static/js/[runtime].hot-update.json"
                },
            }

            const manifestIndex = newConfig.plugins.findIndex(plugin => plugin.options?.name === 'asset-manifest.json')
            newConfig.plugins.splice(manifestIndex, 1)

            // 去掉css文件名中的hash值
            const index = newConfig.plugins.findIndex(plugin => plugin instanceof MiniCssExtractPlugin)
            newConfig.plugins.splice(index, 1,
                new MiniCssExtractPlugin({
                    linkType: 'text/css',
                    filename: 'static/css/[name].css',
                    chunkFilename: 'static/css/[name].chunk.css',
                    runtime: true,
                    ignoreOrder: false
                })
            )
            return newConfig
        }
    },
    devServer: {
        host: '127.0.0.1', // 默认0.0.0.0，但是默认值在插件中访问不到。
        port: 4000,
        proxy: {
            '/api': {
                target: 'https://api.cn',
                changeOrigin: true,
                pathRewrite: {
                    "^/api": ''
                }
            }
        },
        historyApiFallback: {
            disableDotRule: true, //禁用，否则当访问/xxx.html时服务器会自动去掉.html重写url为/xxx
            verbose: true,
        },
        devMiddleware: {
            writeToDisk: true,
        },
    },

    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        modifyVars: v4Token,
                        javascriptEnabled: true,
                    },
                }
            }
        },
    ]
};
