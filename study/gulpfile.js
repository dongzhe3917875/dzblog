var gulp = require("gulp");
var less = require("gulp-less");
var flatten = require("gulp-flatten");
var handlebars = require('gulp-handlebars');
var wrap = require('gulp-wrap');
var declare = require('gulp-declare');
var concat = require('gulp-concat');
var rf=require("fs");

gulp.task("less", function() {
  return gulp.src("develop/**/*.less")
    .pipe(less())
    .pipe(flatten())
    .pipe(gulp.dest("public/stylesheets"))
})
gulp.task("js", function() {
  return gulp.src("develop/**/*.js")
    .pipe(flatten())
    .pipe(gulp.dest("public/javascripts"))
})
gulp.task("jade", function() {
  return gulp.src("develop/**/*.jade")
    .pipe(flatten())
    .pipe(gulp.dest("views"))
})
gulp.task("image", function() {
  return gulp.src("develop/**/*.png")
    .pipe(flatten())
    .pipe(gulp.dest("public/images"))
})
gulp.task("vue", function() {
  return gulp.src("develop/**/*.vue")
    .pipe(flatten())
    .pipe(gulp.dest("public/components"))
})
gulp.task('templates', function() {
  gulp.src('develop/**/*.hbs')
    .pipe(handlebars())
    .pipe(wrap('Handlebars.template(<%= contents %>)'))
    .pipe(declare({
      namespace: 'dzhappy.templates',
      noRedeclare: true, // Avoid duplicate declarations
    }))
    .pipe(concat('templates.js'))
    .pipe(gulp.dest('public/javascripts/'));
});
// gulp.task("templates", function() {
//   return gulp.src("develop/**/*.hbs")
//     .pipe(handlebars())
//     .pipe(wrap('Handlebars.template(<%= contents %>)'))
//     .pipe(declare({
//       namespace: 'dzhappy.templates',
//       noRedeclare: true // Avoid duplicate declarations
//     }))
//     .pipe(concat("templates.js"))
//     .pipe(gulp.dest("public/javascripts"))
// })
gulp.task("start", function() {
  gulp.watch("develop/**/*.less", ['less']).on("change", function(e) {
    console.log(e);
    console.log("sssssssssss")
    setTimeout(function() {
      var data=rf.readFileSync(e.path,"utf-8");
      console.log(data);
      gulp.start('less');
    }, 1000)
    console.log("eeeeeeeeeeee")

  });
  gulp.watch("develop/**/*.js", ['js']);
  gulp.watch("develop/**/*.jade", ['jade']);
  gulp.watch("develop/**/*.hbs", ['templates']);
  gulp.watch("develop/**/*.png", ['image']);
  gulp.watch("develop/**/*.vue", ['vue']);
})

gulp.task("default", ['less', 'js', 'jade', 'templates', 'image', 'vue'], function() {
  gulp.start('start');
})
