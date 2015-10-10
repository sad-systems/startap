<?php
/*==============================================================================
 *  Title      : Main layout
 *  Author     : Digger (c) SAD-Systems <http://sad-systems.ru>
 *  Created on : 01.04.2015
 *==============================================================================
 */
?><!DOCTYPE html>
<html lang="<?= $language ?>">
    <head>
        <title><?= $title ?></title>

        <meta http-equiv="X-UA-Compatible" content="IE=Edge">
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <link rel="icon"          type="image/vnd.microsoft.icon" href="<?= $uriRootBack ?>favicon.ico" />
        <link rel="shortcut icon" type="image/vnd.microsoft.icon" href="<?= $uriRootBack ?>favicon.ico" />
        
        <meta name="description" content="<?= $assets['meta']['description'] ?>">
        <meta name="keywords" content="<?= $assets['meta']['keywords'] ?>">

<?php
    //--- Include CSS assets files:
    if (is_array($assets['css'])) {
        foreach ($assets['css'] as $link) {
            if ($link) {
                echo "\t<link href='$link' rel='stylesheet' type='text/css'>\n"; 
            }
        }
    }
?>
    </head>
    <!--[if lt IE 9]> 
        <script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
        <script src="<?= $uriRootBack ?>js/respond.min.js"></script>   
    <![endif]-->     
    <body>
<?php
    //--- Include content page (view):
    if (file_exists($contentFile)) { 
        include $contentFile; 
    } else {
        echo '<h1>' . _('File not found') . '</h1>';
    } 
?>
    </body>
<?php
    //--- Include JavaScript files:
    if (is_array($assets['js'])) {
        foreach ($assets['js'] as $link) {
            if ($link) {
                echo "\t<script src='$link'></script>\n"; 
            }
        }
    }
?>    
</html>
