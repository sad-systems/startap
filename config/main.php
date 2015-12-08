<?php
/*==============================================================================
 *  Title      : Application main config
 *  Author     : Digger (c) SAD-Systems <http://sad-systems.ru>
 *  Created on : 01.09.2015
 *==============================================================================
 */

//--- Uncomment in production:
// define('PRODUCTION_MODE', true);

$basePath = dirname(__DIR__);

return [
    
    //--- Main params:
    'basePath'    => $basePath,
    'language'    => 'ru',
    //--- Text domains:
    'textDomains' => [
        'site' => [
            'source'  => [ './views', './controllers', './models', './lib' ],
            'root'    => $basePath . '/lang',
        //    'codeset' => 'UTF-8', //<-- by default
        ],
    ],    
    //--- Application description:
    'appInfo'     => $basePath . '/config/description.php',
    //--- Application templates:
    'appTemplates'=> $basePath . '/config/templates.php',
    //--- Application tests:
    'appTests'    => $basePath . '/config/tests.php',
    //--- Assets:
    'assetsPath'  => $basePath . '/assets',
    //--- Default Controller:
    'defaultRoute'  => 'site', 
    'controllerMap' => [
        'site'   => 'controllers/DummyController',
        'page'   => 'controllers/BackboneController',
    ],
    //--- Layouts:
    'layoutPath'  => $basePath . '/views/layouts',
    //--- Default layout:
    'layout'      => 'main',
    //--- Views:
    'viewPath'    => $basePath . '/views',
    //--- Class autoloader:
    //'autoLoader'  => $basePath . '/vendor/autoload.php',
    
];

