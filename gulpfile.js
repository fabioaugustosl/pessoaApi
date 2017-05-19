var gulp = require('gulp');
//var jshint = require('gulp-jshint');
var nodemon = require('gulp-nodemon');
//var gulpMocha = require('gulp-mocha');
//var env = require('gulp-env');
//var supertest = require('supertest');

//var jscs = require('gulp-jscs');

var jsFiles = ['*.js','src/**/*.js']; 


gulp.task('default', [], function(){
	var options = {
		script: 'app.js',
		delayTime: 1,
		env: {
			'PORT' : 3001
		},
		ignore: ['./nome_modules/**'],
		watch: jsFiles
	}
	return nodemon(options)
				.on('restart', function(ev){
					console.log('Restarting...');
				});
});