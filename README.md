# A Simple Website
### testing some basic stuff with gulp

This project includes a simple website, which just has a landing page and some elements on it.

This project also uses one or the other NPM modules, which should make the whole thing a bit more complex.

However, the basic essence of the project is the use of the Taskrunners Gulp. 
Beside the included plugins also some basic functions of gulp itself will be tested, such as file watchers.
#### Gulp Plugins in Use
* gulp-concat
* gulp-uglify-es
* gulp-sass | node sass
* gulp-cssmin
* gulp-jshint | jshint
* gulp-todo
* gulp-browsersync

# First Steps - Make it run!
First of all start with the command 

```
    npm install
```
to install all necessary dependencies for both developer and required for the website itself.

### Gulp commands
I have provided and implemented several commands for testing Gulp.
You can either run:

```
    gulp
``` 
which then runs the default task of gulp. The default task, includes all of the tasks which I have 
implemented in this example.

```
    gulp modules
    gulp todo
    gulp styles
    gulp lint
    gulp scripts
    gulp watch
```

You can also perform each task individually.

But at the very first you should definitely run:
```
    gulp modules
```
This task is necessary for running the website without any issues. It just takes all used files of our 
npm dependencies, like bootstrap, icomoon, jquery ui, owl-carousel and typed.js, then it copies them to a 
project located folder (public folder or asstets folder). After executing this task, it should be possible 
that the website is running without any issues - even when you remove the node_modules folder. 
(gulp tasks won't work without the node_modules folder)


All other gulp tasks should work independently.
```   
    gulp todo       -> creates a List of all TODOs of your major files (JS, SCSS, HTML)
    gulp styles     -> compiles your scss and saves the .css + .min.css to your public folder
    gulp lint       -> checks your javascript syntax
    gulp scripts    -> concats and uglifies your javascript, saving up into your public folder
    gulp watch      -> starts file watchers for your scss, js and html files
                    -> also starts a browserSync, which can be used for testing mobile and on desktop
```
