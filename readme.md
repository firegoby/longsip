Longsip
=======

A boilerplate Gulp setup for modern web frontends, including support for [Babel](http://babeljs.io), [Browserify](http://broswerify.org/), [BrowserSync](http://www.browsersync.io/), [Stylus](learnboost.github.io/stylus/), [Autoprefix CSS](https://github.com/ai/autoprefixer) and more!

Version: 1.2.0

Last Updated: 18-Jan-2016

Features
--------

* **[Babel](http://babeljs.io/)** - *use next-gen ES2015+ javascript today, auto transpiles!*
* **[Autoprefixer](https://github.com/ai/autoprefixer)** - *automatically add CSS vendor prefixes*
* **[BrowserSync](http://www.browsersync.io/)** - *live reloading and development file server*
* **[Browserify](http://browserify.org/)** - *bundle/concat Javascript with require() dependency management*
* **Error Notifications** - *Mac OSX*
* **[jQuery](http://jquery.com/)** - *as a CDN loaded external dependency for Browserify*
* **Concats all CSS & Javascript** - *into a single production file for each*
* **[Stylus](http://learnboost.github.io/stylus/)** - *CSS preprocessing*
* **[Watchify](https://github.com/substack/watchify)** - *for fast cached Browserify recompiles*

Requirements
------------

* [**Node.js**](http://nodejs.org/) - Download and run the installer for your platform


Installation
------------

1. Download and unzip archive into project directory
2. Edit `package.json` with the name & description of your own project
3. `npm install`
4. `npm start`
5. Edit `public/index.html`, `styles/main.styl`, and `scripts/main.js` to create something wonderful!

Commands
--------

1. `npm start` - Watch `scripts`, `styles`, and `public` for file changes, recompiling where necessary, and serving on `http://localhost:3000`
2. `npm run build` - Compile and minify `scripts/` and `styles/` into `public/build/` ready for production
3. `npm run clean` - Delete the contents of the `public/build` directory

Production
----------

In production you'll want to change the references in your HTML to the minified versions of both `main.css` and `bundle.js` to `main.min.css` and `bundle.min.js`. The un-minified versions contain source-maps so your browser's developer tools can show you where a certain piece of compiled code actually came from, these sourcemaps however take up a lot extra bytes and should never be served in production. The minified versions also reduce the stylesheet and javascripts assets in a number of other ways - stripping whitespace, removing comments, uglifying js - all saving you valuable bandwidth and your users time. So, *always* use the minified version in production!

FAQs
----

###1. Why Stylus? Why not Sass? It's much more popular!

Because Stylus can do (*nearly*) everything Sass can but it saves adding **yet another** requirement/dependency (Ruby) to the build process. Also Stylus is significantly faster, which once your project grows and Sass is taking a couple of seconds to compile your styles every time you save really starts to make a difference. If you really want/need Sass support it isn't hard to add, there are a million tutorials on getting Sass setup with Gulp, just follow one and add a new `sass` task to  `gulpfile.js` et voila!

###2. Why is `node_modules` over 58Mb?!

Don't ask me, apparently the npm dependency chain for all the little text utilities that make up a modern web frontend build process take up over 58Mb! Yes, it shocked me too.

###3. I already have a server, I want BrowserSync to use that!

Simply change `gulpfile.js` config for `config.BrowserSync.use` to `proxy`. Also make sure the details in `config.browserSync.proxy.proxy` match your local server. All done.

Notes, Tips & Tricks
--------------------

###1. Review the `.gitignore` file

The `node_modules` directory is ignored from git by default since it's created on the fly by running the command: `npm install`. Also, it's *huge* (See FAQ #2) and unnecessarily bloats your git repo. However, depending on your own project's needs you might want to include of the contents of these directories under version control.

###2. Read the [Browserify Handbook](https://github.com/substack/browserify-handbook)

Seriously, read it, otherwise trying to use Browserify without doing so is going to lead to much confusion.

###3. Read the [Babel "Learn ES2015"](https://babeljs.io/docs/learn-es2015/) Guide

Discover all the wonderful next-generation Javascript syntax you can start using right now!

Credits
-------

A lot of the early foundation of this Gulp setup was based on the excellent work done by [Dan Tello (greypants)](http://github.com/greypants) and his [gulp-starter](https://github.com/greypants/gulp-starter) project. Please check it out, it features a number of cool things not included in Longsip that might be useful for your project. Longsip arose out of a need for a default frontend build system that differed from the toolset that gulp-starter focuses on, in no way do I suggest that Longsip is better, simply a mutated cousin who wandered off in a slightly different direction :) Many, many thanks to Dan (and the other gulp-starter contributors) for all their hard work and sharing their efforts.
