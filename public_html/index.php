<?php
/*==============================================================================
 *  Title      : Start index page
 *  Author     : Digger (c) SAD-Systems <http://sad-systems.ru>
 *  Created on : 01.04.2015
 *==============================================================================
 */

//--- Application base (root) directory:
$basedir    = dirname(__DIR__);

/*
 * ! Next section is for first time demo use only !
 * 
 */

//--- Configuration file:
$configFile = $basedir . '/config/main.php';
//--- Include Starter class:
require $basedir . '/vendor' . '/digger/cradle/src/application/Starter.php';
//--- Start application:
digger\cradle\application\Starter::startApp($configFile);