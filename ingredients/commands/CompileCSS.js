/**
 * Copied from https://github.com/laravel/elixir/blob/master/ingredients/commands/CompileCSS.js
 * 
 * We can not include this file directly, as the plugins from the closure context does not
 * have gulp-compass 
 */ 
var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
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
            .pipe(plugins.if(config.sourcemaps, plugins.sourcemaps.init()))
            .pipe(plugins[options.pluginName](options.pluginOptions)).on('error', onError)
            .pipe(plugins.autoprefixer())
            .pipe(plugins.if(config.production, plugins.minifyCss()))
            .pipe(plugins.if(config.sourcemaps, plugins.sourcemaps.write('.')))
            .pipe(gulp.dest(options.output || config.cssOutput))
            .pipe(new Notification().message(options.compiler + ' Compiled!'));
    });

    config.registerWatcher(
        options.pluginName,
        config.assetsDir + options.pluginName + '/' + options.search
    );

    return config.queueTask(options.pluginName);

};
