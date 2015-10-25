# Boilerplate structure

##File structure

 * [assets](#assets)/
 * [automations](#automations)/
 * [config](#config)/
 * [controllers](#controllers)/
 * [doc](#doc)/
 * [lib](#lib)/
 * [models](#models)/
 * [publiс_html](#publiс_html)/
 * [styles](#styles)/
 * [templates](#templates)/
 * [tests](#tests)/
 * [vendor](#vendor)/
 * [views](#views)/

## assets

Here can be placed metadata configurations and lists of included files (*.js, *.css).
The format of the content will depend on the chosen framework.

## automations

Here can be placed all automation scripts.

 * `init` - application initialization. It creates all necessary configuration files based on files:
    - `config/description.php` - application description
    - `config/templates.php` - application templates

 * `update` - executes an update of package managers ([NodeJS](https://nodejs.org/), [Bower](http://bower.io) and [Composer](https://getcomposer.org)).
It has several options:

   | Option    | Command            | Description                                                         |
   |-----------|--------------------|---------------------------------------------------------------------|
   | all       | `update all`       | Executes an update of all package managers                          |
   | node      | `update node`      | Executes [NodeJS](https://nodejs.org/) only                         |
   | bower     | `update bower`     | Executes [Bower](http://bower.io) only                              |
   | composer  | `update composer`  | Executes [Composer](https://getcomposer.org) only                   |
   | autoload  | `update autoload`  | Updates autoloader of classes [Composer](https://getcomposer.org)   |
   | templates | `update templates` | Updates the templates directory                                     |

 * `docs` - generates documentation automatically, which is based on the configuration files
    located in the directory [config](#config): 
    - doxygen.cfg - for [Doxygen](http://www.stack.nl/~dimitri/doxygen)
    - jsdoc-conf.json - for [JsDoc](http://usejsdoc.org)

 * `gentests` - creates test skeletons automatically. Generator settings are in the file:
   `config/tests.php`

 * `runtests` - to run automatic tests.

 * `build` - to build application. This script is a "wrapper" for the [gulpjs](http://gulpjs.com). 
    Parameters to build are stored in the file [gulpfile.js](../../../gulpfile.js).
   `build` operates with parameter `PRODUCTION_MODE` (specified in the configuration file: [config/main.php](../../../config/main.php))
   and in accordance with this runs:
    - `gulp build` - to build the `PRODUCTION` version of application (if `PRODUCTION_MODE` is set);
    - `gulp build-dev` - to build the `DEVELOP` version of application (if `PRODUCTION_MODE` is not set);

    It is also possible to run `build` with the next parameters:

    - `build css` - to build css-files only;
    - `build js` - to build javascript-files only.

> You can use `gulp` directly:
> - `gulp build`, `gulp build-css`, `gulp build-js` - to build the `PRODUCTION` version of application
> - `gulp build-dev`, `gulp build-css-dev`, `gulp build-js-dev` - to build the `DEVELOP` version of application


## config

There are all of necessary application settings in this place:

 - `description.php` - information about the name, a brief description and the author of the application.
 - `templates.php`   - information on the location of the application templates.
 - `tests.php`       - information on the location of automatic tests.
 - `main.php`        - information necessary to run the application.

## controllers

Here can be placed all controllers of application.

## doc

The location for docs.

Directory structure:

   - img/      - images used in the documentation design
   - css/      - style files used in the documentation design 
   - demos/    - demo files
   - jsdoc/    - the generated documentation for `javascript` files
   - phpdoc/   - the generated documentation for `php` files
   - md/       - application description files in format [Markdown](https://en.wikipedia.org/wiki/Markdown)
       * en/   - English documentation
       * ru/   - Russian documentation

> The file `doc/index.html` designed to create navigation for documentation.

> The folder `doc/demos` contains a file `index.php` to create navigation for demo files. 
> Just add your demo files in this directory and they will appear in the menu of `index.php`. 
> Note: the demo files are embedded in the "body" of html code of `index.php`.


## lib

Here can be placed all of your libraries.

## models

Here can be placed all models of application.

## publiс_html

This is the only directory designed for public access to your application. 
It contains a standard file structure:

   - css/       - for compiled and compressed style files `css` 
   - fonts/     - for fonts
   - js/        - for `javascript` files
   - index.php  - start file
   - .htaccess  - the config file of [mod_rewrite](http://httpd.apache.org/docs/2.4/mod/mod_rewrite.html) of [Apache](http://httpd.apache.org) server,
configured to operate as a "single-page" web application.

## styles

Here can be placed style files in format [sass](http://sass-lang.com) or [less](http://lesscss.org),
which will be compiled in `css` files.

> There are already sass-files of [Bootstrap](http://getbootstrap.com) framework by default.

## templates

Here are located templates from which will created the application structure
by automation script `automations/init`:

  - app/ - templates of configuration files of the application, package managers and documenters.
  - doxygen/ - design templates of [Doxygen](http://www.stack.nl/~dimitri/doxygen)
  - jsdoс/ - design templates of [JsDoc](http://usejsdoc.org)

> Script `automations/init` only creates non existed files in the application.

## tests

Here can be placed all automatic tests.

> The file `tests/index.php` designed to display tests results after run `automations/runtests`.

## vendor

Here can be placed all third-party libraries.

> Preinstalled library `digger\cradle` needed to run automation scripts
> and primary demo page.

## views

Here can be placed all 'views' and 'layouts' of application.
