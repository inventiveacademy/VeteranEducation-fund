'use strict';

const gulp = require("gulp")
const watchSass = require("gulp-watch-sass")
var gutil = require("gulp-util");
const sass = require("gulp-sass");
 
gulp.task("sass:watch", () => watchSass([
  "themes/artemis/source/sass/**/*.{scss,css}",
  "!.public/css/**/*"
])
  .pipe(sass())
  .pipe(gulp.dest("./themes/artemis/source/css")))
  .on("end", function() {
  	gutil.log("Compiled Sass to CSS!"); 
  });



