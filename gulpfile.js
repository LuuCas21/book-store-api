import gulp from 'gulp';
import ts from 'gulp-typescript';
import copy from 'gulp-copy';
const tsProject = ts.createProject('tsconfig.json');

gulp.task('scripts', () => {
  return tsProject.src()
    .pipe(tsProject())
    .pipe(gulp.dest('dist'));
});

gulp.task('copy-images', () => {
  return gulp.src('src/public/*')
    .pipe(copy('dist/public', { prefix: 2 }));
});

gulp.task('build', gulp.series('scripts', 'copy-images'));