 var 	gulp =				require('gulp'),
		browserSync = 		require("browser-sync"),
		gutil = 			require("gulp-util"),
		concat = 			require('gulp-concat'),
		concatCss = 		require('gulp-concat-css'),
		cleanCSS = 			require('gulp-clean-css'),
		autoprefixer = 		require("gulp-autoprefixer"),
		jsmin = 			require('gulp-jsmin'),
		rename = 			require('gulp-rename'),
		sass = 				require('gulp-sass'),
		htmlmin =           require('gulp-htmlmin'),
		svgmin = 			require('gulp-svgmin'),
		imagemin = 			require('gulp-imagemin'),
		spritesmith = 		require('gulp.spritesmith'),
		gutil =  			require('gulp-util'),
		svgSprite = 		require('gulp-svg-sprite'),
		size= 				require('gulp-size'),
		cheerio =           require("gulp-cheerio"),
		replace = 			require("gulp-replace"),
		gcmq = 				require('gulp-group-css-media-queries'),
		sassGlob = 			require('gulp-sass-glob'),
		tinypng = 			require('gulp-tinypng-compress');
 

		
		
var config = {
	app: './source',
	build: './build',
	css: '/css',
	sass: '/sass',
	js: '/js',
	fonts: '/fonts',
	libs: '/libs',
	json: '/json',
	img: '/img',
	spritepng: "/sprite-png",
	svg: {
		src: '/svg',
		sprite: '/icon'
	}
};

gulp.task('server', function() {
    browserSync.init({
      port: 8080,
      notify: true,
      browser: 'chrome',
    	server : {
    		baseDir: config.build
    	}
    });
});

// HTML

gulp.task('html', function() {
   return gulp.src(config.app + '/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
	.pipe(gulp.dest(config.build + '/'))
	.pipe(browserSync.reload({stream: true}));
 });

 
// SASS ON CSS AND CONCAT 

gulp.task('css', function () {
  return gulp.src(config.app + config.sass + "/**/*.scss")
	.pipe(sassGlob())
    .pipe(sass().on('error', sass.logError))
	.pipe(concatCss("main.css"))
	.pipe(gcmq())
	.pipe(autoprefixer({
		browsers: ['last 5 versions','ie 10'],
		cascade: false
	}))
	.pipe(cleanCSS({compatibility: 'ie10'}))
	.pipe(gulp.dest(config.build + config.css))
	.pipe(browserSync.reload({stream: true}));
});

// JS 
gulp.task('js', function() {
  return gulp.src(config.app + config.js +'/**/*.js')
    .pipe(concat('main.js'))
	.pipe(jsmin())
	.pipe(gulp.dest(config.build + config.js))
	.pipe(browserSync.reload({stream: true}));
});

// SVG MIN

gulp.task('svgmin', function () {
    return gulp.src([config.app + config.img  + '/**/*.svg','!' + config.app + config.img + config.svg.src + config.svg.sprite + '/**/*.svg'])
        .pipe(svgmin())
        .pipe(gulp.dest(config.build + config.img + '/'))
		.pipe(browserSync.reload({stream: true}));
});

// SVG SPRITE

 gulp.task('svg-sprite', function () {
        return gulp.src(config.app + config.img + config.svg.src + config.svg.sprite +  '/**/*.svg')
			.pipe(svgmin())
			.pipe(cheerio({
				run: function ($) {
					$('[fill]').removeAttr('fill');
					$('[style]').removeAttr('style');
				},
				parserOptions: { xmlMode: true }
			}))
            .pipe(replace('&gt;', '>'))
            .pipe(svgSprite({
                mode: {
                    symbol: {
                        sprite: "../sprite.svg"
                    }
                }
            }))
            .pipe(gulp.dest(config.build + config.img + config.svg.src  +'/'))
			.pipe(browserSync.reload({stream: true}));
    });


 // gulp.task('svg-sprite', function () {
	//  return gulp.src(config.app + config.img + config.svg.src + config.svg.sprite +  '/**/*.svg')
	// 	 .pipe(svgmin({
	// 		 js2svg: {
	// 			 pretty: true
	// 		 }
	// 	 }))
	// 	 .pipe(cheerio({
	// 		 run: function ($) {
	// 			 $('[fill]').removeAttr('fill');
	// 			 $('[style]').removeAttr('style');
	// 		 },
	// 		 parserOptions: { xmlMode: true }
	// 	 }))
	// 	 .pipe(replace('&gt;', '>'))
	// 	 .pipe(svgSprite({
	// 		 	mode: "symbols",
	// 		 	preview: false,
	// 		 	svgId: "svg--%f",
	// 		 	svg: {
	// 			 symbols: './sprite.svg'
	// 		 	}
	// 		 }
	// 	 ))
	// 	 .pipe(gulp.dest(config.build + config.img + config.svg.src  +'/'))
	// 	 .pipe(gulp.dest(config.build + config.img + config.svg.src  +'/'))
 // });






// MINIFY IMAGE
	
	
gulp.task('imgmin', async function () {
     return gulp.src([config.app + config.img +'/**/*.*', '!' + config.app + config.img + config.svg.src + '/**/*.svg'])
     	.pipe(tinypng({
            key: 'n6FVtR7dZKf6FrVBxFPzNd01KfgPQhsx',
            log: true
        }))
        .pipe(gulp.dest(config.build + config.img +'/'))
		.pipe(browserSync.reload({stream: true}));
});

// PNG SPRITE

// sprite png
gulp.task('sprite-png', function () {
		  var spriteData = gulp.src(config.app + config.img + config.spritepng+  '/**/*.png').pipe(spritesmith({
			imgName: 'sprite.png',
			cssName: '_sprite.sass',
			imgPath: '../img/sprite/sprite.png',
			
		  }));
		spriteData.css.pipe(gulp.dest(config.app + config.sass + '/'));
		spriteData.img.pipe(gulp.dest(config.build + config.img + '/sprite-png/'));
		spriteData(pipe(browserSync.reload({stream: true})));
});

gulp.task('fonts', function () {
	return 	gulp.src(config.app + config.fonts + '/**/*.*')
			.pipe(gulp.dest(config.build + config.fonts +'/'))
			.pipe(browserSync.reload({stream: true}));
});

gulp.task('libs', function () {
	return 	gulp.src([config.app + config.libs + '/**/*.*','!' + config.app + config.libs + '/**/*.scss'])
			.pipe(gulp.dest(config.build + config.libs + '/'))
			.pipe(browserSync.reload({stream: true}));
});

gulp.task('json', function () {
	return 	gulp.src([config.app + config.json + '/**/*.json'])
			.pipe(gulp.dest(config.build + config.json + '/'))
			.pipe(browserSync.reload({stream: true}));
});


// ПЕРЕНОС НУЖНЫХ ФАЙЛОD

gulp.task('copy', function () {
	return 	gulp.src([config.app + "/.htaccess"])
		.pipe(gulp.dest(config.build + '/'))
		.pipe(browserSync.reload({stream: true}));
});



gulp.task('watch', function(){
	gulp.watch(config.app + config.sass + '/**/*.scss', gulp.series("css"));
	gulp.watch(config.app +  '/**/*.html',gulp.series("html"));
	gulp.watch(config.app + config.js + "/**/*.js",gulp.series("js"));
	gulp.watch(config.app + config.fonts + "/**/*.*", gulp.series("fonts"));
	gulp.watch(config.app + config.libs + "/**/*.*", gulp.series("libs"));
	gulp.watch(config.app + config.json + "/**/*.*", gulp.series("json"));
	gulp.watch([config.app + config.img + "/**/*.*", '!' + config.app + config.img + config.svg.src + '/**/*.svg'], gulp.series("imgmin"));
	gulp.watch([config.app + config.img  + config.svg.src + '/**/*.svg','!' + config.app + config.img + config.svg.src + config.svg.sprite + '/**/*.svg'], gulp.series("svgmin"));
	gulp.watch(config.app + config.img + config.svg.src + config.svg.sprite  + "/**/*.svg", gulp.series("svg-sprite"));
	gulp.watch(config.app + config.img + config.spritepng + "/**/*.png", gulp.series("sprite-png"));
  });


gulp.task("build",gulp.series('html',gulp.parallel('css','copy','js','libs','fonts','svg-sprite','imgmin', 'svgmin','json')));
gulp.task("default",gulp.series("build",gulp.parallel("server","watch")));



//gulp.task("default", ["watch","build"]);

//gulp.task('build',['html','css','imgmin','js','libs','fonts','svg-sprite','copy', 'svgmin']);

