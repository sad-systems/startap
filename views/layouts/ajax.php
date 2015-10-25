<?php
    //--- Include content page (view):
    if (file_exists($contentFile)) { 
        include $contentFile; 
    } else {
        echo '<h2>' . _('File not found') . '</h2>';
    } 

