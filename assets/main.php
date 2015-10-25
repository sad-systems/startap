<?php
/*==============================================================================
 *  Title      : Assets for main page
 *  Author     : Digger (c) SAD-Systems <http://sad-systems.ru>
 *  Created on : 01.09.2015
 *==============================================================================
 */

return [
    'meta'        => [
        'description' => 'The SAD-Systems company',
        'keywords'    => 'sad-systems',
    ],
    'css' => defined('PRODUCTION_MODE') ? 
        [ //--- Production:
            'css/public.min.css', //<--- see `/gulpfile.js` configuration to build 
        ] : 
        [ //--- Develop:
        //    'css/bootstrap.css', 
            'css/main.css',
        ],
    'js'  => defined('PRODUCTION_MODE') ? 
        [ //--- Production:
            'js/vendor.min.js', //<--- Vendor scriptis (jquery + underscore + backbone + ...) see `/gulpfile.js` configuration to build
            'js/public.min.js', //<--- Application scripts (own) see `/gulpfile.js` configuration to build
        ] :
        [ //--- Develop:
            'js/jquery.min.js',
            'js/underscore-min.js',
            'js/backbone-min.js',
        //    'js/bootstrap.min.js',
            
            'js/typewriter.js',
            'js/main.js',
        ],  
];