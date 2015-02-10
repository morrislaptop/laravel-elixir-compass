var elixir = require('laravel-elixir');
var compile = require('./ingredients/commands/CompileCSS');
var _ = require('underscore');

elixir.extend('compass', function (src, output, options) {

	options = _.extend({
		config_file: './config.rb',
		sass: './resources/assets/compass',
		css: './public/css',
		sourcemaps: elixir.config.sourcemaps
	}, options);

	return compile({
		compiler: 'Compass',
		pluginName: 'compass',
		pluginOptions: options,
		src: src,
		output: output,
		search: '**/*.+(sass|scss)'
	});

});