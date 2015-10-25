<?php
/*==============================================================================
 *  Title      : Assets for landing page
 *  Author     : Digger (c) SAD-Systems <http://sad-systems.ru>
 *  Created on : 01.09.2015
 *==============================================================================
 */

return [
    'meta'        => [
        'description' => "",
        'keywords'    => "",
    ],
    'css' => defined('PRODUCTION_MODE') ? 
        [ //--- Production:
        ] : 
        [ //--- Develop:
        ],
    'js'  => defined('PRODUCTION_MODE') ? 
        [ //--- Production:
        ] :
        [ //--- Develop:
        ],  
];