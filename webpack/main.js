/**
 * Jazzy-Frontend
 * 
 * Frontend webpack configuration file. It builds whole ./src/*
 * directory and outputs it as ./dist/build/app.js and 
 * ./dist/build/vendor.js files.
 */

var webpack = require( 'webpack' );

module.exports = {

    // enable source mapping support
    devtool: 'sourcemap' ,

    // entry point
    entry: {
        'app': [ './src/index.ts' ] ,
    } ,

    // output files
    output: {
        path: __dirname + '/../dist' ,
        filename: 'build/[name].js' ,
    } ,

    // module resolution
    resolve: {
        modules: [
            'node_modules' ,
            'src' ,
            'resource' ,
        ] ,
        extensions: [ '.js' , '.ts' , '.tsx' ] ,
    } ,

    // webpack loaders configuration
    module: {
        loaders: [
            {
                test: /\.ts$/ ,
                exclude: /(node_modules)/ ,
                loaders: [ 'awesome-typescript-loader?configFileName=./tsconfig.json' ] ,
            } ,
            {
                test: /\.tsx$/ ,
                exclude: /(node_modules)/ ,
                loaders: [ 'awesome-typescript-loader?configFileName=./tsconfig.json' ] ,
            } ,
            {
                test: /\.css$/ ,
                loaders: [ 'style-loader' , 'css-loader?-url' ] ,
            } ,
            {
                test: /\.scss$/ ,
                loaders: [ 'style-loader' , 'css-loader?-url' , 'sass-loader' ] ,
            } ,
        ] ,
    } ,

    // dev server
    devServer: {
        contentBase: __dirname + '/../dist/' , 
        hot: true ,
        inline: true ,
        port: 8080 ,
    } ,

    plugins: [

        // we will move everything from node_modules into 
        // separate build file vendor.js in order to increase
        // performance and reduce build times
        new webpack.optimize.CommonsChunkPlugin( {
            name: 'vendor' ,
            filename: 'build/vendor.js' ,
            minChunks( module , count ) {
                var context = module.context;
                return ( context && context.indexOf( 'node_modules' ) >= 0 );
            } ,
        } ) ,

    ] ,

};
