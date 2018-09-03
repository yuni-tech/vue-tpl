const path = require('path')
const glob = require('glob')
const config = require('./config')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
let entry = {}
glob.sync(__dirname + '/../src/workers/*.js').forEach(file => {
    entry[path.basename(file, '.js')] = file
})
module.exports = {
    context: path.resolve(__dirname, '../'),
    entry,
    target: 'node',
    output: {
        path: config.build.assetsRoot,
        filename: 'workers/[name].js',
    },
    module: {
        rules: [
            // babel处理js可以提前使用es6功能
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: path.join(__dirname, '..', 'src'),
                options: {
                    presets: [['babel-preset-es2015', { modules: false }]],
                    plugins: ['transform-async-to-generator'],
                },
            },
        ],
    },
    plugins: [
        new UglifyJsPlugin({
            uglifyOptions: {
                comments: true, // 去掉注释
                compress: { warnings: false }, // 不显示警告信息
            },
            //  如果配置了Uglify，那这里也要配合devtool设置sourcemap。比如devtool设置了sourcemap类型，但这里设false，那压缩的时候会把生成的map文件删掉
            sourceMap: false,
            parallel: true, // 开启多核并行处理压缩，加快速度
        }),
    ],
}
