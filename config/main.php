<?php
/*==============================================================================
 *  Title      : Application main config
 *  Author     : Digger (c) SAD-Systems <http://sad-systems.ru>
 *  Created on : 01.09.2015
 *==============================================================================
 */

$basePath = dirname(__DIR__);

return [
    
    //--- Main params:
    'basePath'    => $basePath,
    'language'    => 'ru',
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

