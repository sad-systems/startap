# Startap - Web Start Application

> The boilerplate for creating web applications based on the architecture of MVC.

##Includes:

* Directory structure
* Templates for configuration files [NodeJS](https://nodejs.org/), [Bower](http://bower.io) и [Composer](https://getcomposer.org) (as well as means for their automatic generation and updates)
* Automated documentation of code based on the [Doxygen](http://www.stack.nl/~dimitri/doxygen) and [JsDoc](http://usejsdoc.org)
* Means of automated testing code based on [PhpUnit](https://phpunit.de)
* "Front-end" template, based on the use precompiler Sass and libraries:
    - [bootstrap](http://getbootstrap.com)
    - [jquery](http://jquery.com)
    - [underscore](http://underscorejs.org)
    - [backbone](http://backbonejs.org)
* Micro framework for the first demonstration launch of the boilerplate and support its automation scripts

This boilerplate focuses on the use of [Yii2](http://www.yiiframework.com) as a server (back-end) of the framework, but completely independent of it and can be used with any other.

##Pre requirements

Before you begin, you should install:

* [PHP](http://php.net/downloads.php). Automations in the boilerplate uses PHP 5.4.
* [NodeJS](https://nodejs.org/en/download/). Most of the components in the web development of the Boilerplate is established by means [npm](https://www.npmjs.com).
* [Doxygen](http://www.stack.nl/~dimitri/doxygen/download.html). Standard tool for generating documentation.

The rest of the required components are installed by the Boilerplate. 

##Installation

Just clone the repo: `git clone https://github.com/sad-systems/startap.git`

##Getting started

###Step 1 
Edit the configuration file: [config/description.php](/config/description.php)

Enter all the necessary information about your new application (you will need it to automatically create a configuration of   [npm](https://docs.npmjs.com/files/package.json), [bower](http://bower.io/docs/creating-packages/),  [composer](https://getcomposer.org/doc/01-basic-usage.md) and your application):

~~~php
    'title'       => 'Name of your new application',
    'description' => 'Brief description of your application (if required)',
    'version'     => '1.0.0', 
    'logo'        => '',      // link to image
    'author'      => [
             'name' => 'author`s name',
            'email' => 'author@...',
         'homepage' => 'http://...author`s home page...',
             'role' => 'author`s role',
~~~

###Step 2
Go to the directory `automations` and run from the command line:

~~~sh
$ ./init
~~~

> File `init` should have an execute rights.

After that at the root of your new application will all the necessary configuration files (`package.json`,` bower.json`, `composer.json`) to install the components, and in the directory `config` will be added `doxygen.cfg` and `jsdoc-conf.json` to customize documentation generator. In addition to the default settings, these files will contain the information that you specified in the `config/description.php`.

> `init` creates files only if they do not exist. To re-create the file, first remove the old ones.

###Step 3
Adjust configuration files received from `Step 2.` according to your requirements.

###Step 4
Go to the directory `automations` and run from the command line:

~~~sh
$ ./update all
~~~

> File `update` should have an execute rights.

At this stage package installers ([NodeJS](https://nodejs.org/), [Bower](http://bower.io) и [Composer](https://getcomposer.org)) will download everything in accordance with your requirements.

###Step 5 

<b>Create your own application!</b>

#### Documenting

If you need to create the documentation for your application, simply run command (from the `automations` directory):  

~~~sh
$ ./docs
~~~

> File `docs` should have an execute rights.

All the automatically generated documentation will be placed in the directory `doc`.

#### Testing

If you need to create the test skeletons for your application, simply run command (from the `automations` directory):  

~~~sh
$ ./gentests
~~~

> File `gentests` should have an execute rights.

> `gentests` only creates are non-existent tests, gently adding them to created earlier.

Skeletons of generated tests will be placed in the directory `tests`. To run automatic tests you may use the command (from the `automations` directory): 

~~~sh
$ ./runtests
~~~

To see the report of the implementation of the tests you may open file `tests/index.php` in the browser.

#### Build

To build your application, simply run command (from the `automations` directory):  

~~~sh
$ ./build
~~~

> File `build` should have an execute rights.

or run command (from application root directory):

~~~sh
$ ./gulp
~~~

For detail information about those commands see [Structure description](structure.md#automations).

## Boilerplate structure

[Structure description](structure.md)

## Creators

[Mr Digger](mailto://mrdigger@mail.ru)

## Copyright

Code and documentation copyright 2015 [SAD-Systems](http://sad-systems.ru) 
