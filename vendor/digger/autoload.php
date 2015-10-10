<?php
/*==============================================================================
 *  Title      : Simple basic class autoloader (default)
 *  Author     : Digger (c) SAD-Systems <http://sad-systems.ru>
 *  Created on : 07.10.2015
 *==============================================================================
 */

//--- Base dir of Application classes:
$baseDir = dirname(dirname(__DIR__));

//--- Registering autoloader with the base dir:
require_once __DIR__ . '/cradle/common/ClassLoader.php';
\digger\cradle\common\ClassLoader::register($baseDir, ['lib', 'controllers', 'models', 'vendor']);