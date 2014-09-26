Pimms
=====

Boilerplate gulp setup for modern web projects, including support for [Browserify](http://broswerify.org/), [Polymer Web Components](http://www.polymer-project.org/), [BrowserSync](http://www.browsersync.io/), [Stylus](learnboost.github.io/stylus/), [Autoprefix CSS](https://github.com/ai/autoprefixer) and more!

Features
--------

* **[Autoprefixer](https://github.com/ai/autoprefixer)** - *automatically add CSS vendor prefixes*
* **[Bower](http://bower.io/)** - *frontend package manager*
* **[BrowserSync](http://www.browsersync.io/)** - *live reloading and development file server*
* **[Browserify](http://browserify.org/)** - *bundle/concat Javascript with require() dependency management*
* **Error Notifications** - *Mac OSX*
* **[jQuery](http://jquery.com/)** - *as CDN loaded external dependency for Browserify*
* **Concats all CSS & Javascript** - *into a single production file for each*
* **[Polymer Web Components](http://www.polymer-project.org/)** - *all ready to use, with auto concatenation*
* **[Stylus](http://learnboost.github.io/stylus/)** - *CSS preprocessing*
* **[Vulcanize](https://github.com/Polymer/vulcanize)** - *concat & minify Polymer Components*
* **[Watchify](https://github.com/substack/watchify)** - *for fast cached Browserify recompiles*

Requirements
------------

* [**Node.js**](http://nodejs.org/) - Download and run the installer for your platform
* [**Gulp**](http://gulpjs.com/) - Install with `npm install -g gulp`
* [**Bower**](http://bower.io/) - Install with `npm install -g bower`

*You may need to run `sudo -E npm install -g` commands depending on your system's particular setup* (e.g. Mac OS X)

Installation
------------

1. Download and unzip archive into project directory
2. Edit `package.json` and `bower.json` with name & description of your own project
3. Run `npm install`
4. Run `bower install`
5. Run `gulp`
6. *Profit!*

*You may need to run `sudo -E npm install` depending on your system's particular setup* (e.g. Mac OS X)

Production
----------

In production you'll want to change the references in your HTML to the minified versions of both `main.css` and `bundle.js` to `main.min.css` and `bundle.min.js`. The un-minified versions contain source-maps so your browser's developer tools can show you where a certain piece of compiled code actually came from, these sourcemaps however take up a lot extra bytes and should never be served in production. The minified versions also reduce the stylesheet and javascripts assets in a number of other ways - stripping whitespace, removing comments, uglifying js - all saving you valuable bandwidth and your users time. So, *always* use the minified version in production!

**Update**: In production you should also change reference to `components.html` to `components.min.html` for a minified version of your Polymer Web Components file too.

FAQs
----

###1. Why not use the **[debowerify](https://www.npmjs.org/package/debowerify)** transform to allow seamless loading of bower components in browserify?

Because as of time of writing debowerify [doesn't provide a way to exclude or include certain bower packages](https://github.com/eugeneware/debowerify/issues/37). The result of this is that when the default Polymer packages are installed via bower (Polymer's recommended installation option) browserify crashes with a `maximum stack size exceeded` error because of the size of the Polymer packages and their dependencies. For the moment, bower packages can be used in `main.js` etc by simply referencing the relative path to the file. So for instance: -

    bower install moment

then in `main.js` (or other `scripts/*.js` file): -

    var moment = require('../bower_components/moment/moment.js')
    console.log(moment().format('dddd'))

###2. Why "Pimms"? WTF?

[Pimm's](http://en.wikipedia.org/wiki/Pimms) is a popular English cocktail, often using a whole range of different ingredients. Since this project is based around a Gulp centre, think of this as an idiosyncratic collection of ingredients in one big tasty gulp! :)

###3. Why Stylus? Why not Sass? It's much more popular!

Because Stylus can do (*nearly*) everything Sass can but it saves adding **yet another** requirement/dependency (Ruby) to the build process. Also Stylus is significantly faster, which once your project grows and Sass is taking a couple of seconds to compile your styles every time you save really starts to make a difference. If you really want/need Sass support it isn't hard to add, there are a million tutorials on getting Sass setup with Gulp, just follow one and add a new `sass` task to  `gulpfile.js` et voila!

###4. Why is `node_modules` over 120Mb?!

Don't ask me, apparently the npm dependency chain for all the little text utilities that make up a modern web frontend build process take up over 120Mb! Yes, it shocked me too.

###5. I already have a server, I want BrowserSync to use that!

Simply change `gulpfile.js` config for `config.BrowserSync.use` to `server`. Also make sure the details in `config.browserSync.serve.server` match your local server. All done. (NB: If you're using your own server you'll need to make sure the `/bower_components` directory is available for the loading of Polymer's components)

###6. Add do I add a new Polymer Web Component?

Simply list the `<import>` in `public/components.html` and run `gulp` (or re-save the file if Gulp is already running). This will concatenate the component with all the other components and load them as a single import in index.html. **NB**: The individual Polymer Web Component needs to be already installed using bower, as per the Polymer documentation, this is usually of the form e.g. `bower install --save Polymer/core-elements`

Notes, Tips & Tricks
--------------------

###1. Review the `.gitignore` file

The `bower_components` and `node_modules` directories are ignored from git by default since each are created on the fly by running the respective commands: `bower install` and `npm install`. Also, they're *huge* (See FAQ #4) and unnecessarily bloat your git repo. However, depending on your own project's needs you might want to include of the contents of these directories under version control.

###2. Read the [Browserify Handbook](https://github.com/substack/browserify-handbook)

Seriously, read it, otherwise trying to use Browserify without doing so is going to lead to much confusion.

Credits
-------

A lot of the early foundation of this Gulp setup was based on the excellent work done by [Dan Tello (greypants)](http://github.com/greypants) and his [gulp-starter](https://github.com/greypants/gulp-starter) project. Please check it out, it features a number of cool things not included in Pimms that might be useful for your project. Pimms arose out of a need for a default frontend build system that differed from the toolset that gulp-starter focuses on, in no way do I suggest that Pimms is better, simply a mutated cousin who wandered off in a slightly different direction :) Many, many thanks to Dan (and the other gulp-starter contributors) for all their hard work and sharing their efforts.
