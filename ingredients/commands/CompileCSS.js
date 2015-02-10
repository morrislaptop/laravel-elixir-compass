/**
 * Copied from https://github.com/laravel/elixir/blob/master/ingredients/commands/CompileCSS.js
 * 
 * We can not include this file directly, as the plugins variable below does not include 
 * the gulp-compass plugin.
 * 
 * Also for some reason gulp-load-plugins can't find gulp-compass so we are loading and
 * using that explicitly. 
 * 
 */ 
var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var compass = require('gulp-compass');
var config = require('laravel-elixir').config;
var utilities = require('laravel-elixir/ingredients/commands/Utilities');
var Notification = require('laravel-elixir/ingredients/commands/Notification');

module.exports = function(options) {

    var src = utilities.buildGulpSrc(
        options.src, config.assetsDir + options.pluginName, options.search
    );

    var onError = function(e) {
        new Notification().error(e, options.compiler + ' Compilation Failed!');

        this.emit('end');
    };

    gulp.task(options.pluginName, function() {
        return gulp.src(src)
            .pipe(compass(options.pluginOptions)).on('error', onError)
            .pipe(plugins.autoprefixer())
            .pipe(plugins.if(config.production, plugins.minifyCss()))
            .pipe(gulp.dest(options.output || config.cssOutput))
            .pipe(new Notification().message(options.compiler + ' Compiled!'));
    });

    config.registerWatcher(
        options.pluginName,
        config.assetsDir + options.pluginName + '/' + options.search
    );

    return config.queueTask(options.pluginName);

};
