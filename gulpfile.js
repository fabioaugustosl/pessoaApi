var gulp = require('gulp');
//var jshint = require('gulp-jshint');
var nodemon = require('gulp-nodemon');
//var gulpMocha = require('gulp-mocha');
//var env = require('gulp-env');
//var supertest = require('supertest');

//var jscs = require('gulp-jscs');

var jsFiles = ['*.js','src/**/*.js']; 


/*gulp.task('style', function(){
	return gulp.src(jsFiles)
		.pipe(jshint())
		.pipe(jshint.reporter('jshint-stylish',{
			verbose: true
		}));
		//.pipe(jscs());
});*/

/*gulp.task('inject',function(){
	var wiredep = require('wiredep').stream;
	var inject = require('gulp-inject');

	var injectSrc = gulp.src(['./public/css/*.css',
							  './public/js/*.js'],{read:false});

	var injectOptions = {ignorePath: '/public'}

	var options = {
		bowerJson: require('./bower.json'),
		directory: './public/lib',
		ignorePath: '../../public'
	}

	return gulp.src('./src/views/*.html')
		.pipe(wiredep(options))
		.pipe(inject(injectSrc, injectOptions))
		.pipe(gulp.dest('./src/views'));
});*/

//gulp.task('test', function(){
//	env({vars : {ENV: 'Test', PORT : 3000}});
//	gulp.src('./src/tests/*.js', {read: false})
//		.pipe(gulpMocha({reporter: 'nyan'}));
//});

gulp.task('default', [], function(){
	var options = {
		script: 'app.js',
		delayTime: 1,
		env: {
			'PORT' : 3000
		},
		ignore: ['./nome_modules/**'],
		watch: jsFiles
	}
	return nodemon(options)
				.on('restart', function(ev){
					console.log('Restarting...');
				});
});