laravel-elixir-compass
======================

## Installation

Until rynocouse brings his package up to speed, you can install this package directly using..

`npm install laravel-elixir-compass@morrislaptop/laravel-elixir-compass`

## Usage
This is a simple compass wrapper for Laravel Elixir for gulp-compass

Add it to your Elixir-enhanced Gulpfile, like so:

```
var elixir = require('laravel-elixir');

require('laravel-elixir-compass');

elixir(function(mix) {
   mix.compass();
});
```

This will scan your `resources/assets/compass` directory for all files. Instead, if you only want to compile a single file, you may do:

```
mix.compass("bootstrap.scss");
```

Finally, if you'd like to output to a different directory than the default `public/css`, then you may override this as well.

```
mix.compass("bootstrap.scss", "foo/bar/baz");
```

## Options

Compass has a lot of different options and ways you can tweak your output:

```
mix.compass("bootstrap.scss", "foo/bar/baz", {
    import_path: ['public'],
    sourcemap: true
});
```

See [gulp-compass](https://www.npmjs.com/package/gulp-compass#configuration) for all the options.