<?php

require_once 'common.php';

//--- Copy Icon file:

$iconFile = "favicon.ico";

if (copy($baseDir . "/doc/" . $iconFile, $baseDir . "/doc/phpdoc/" . $iconFile)) {
    echo "file: [$iconFile] copied OK\n";
} else {
    echo "error: can't copy [$iconFile]\n";
}

//--- Replace image link to tag image:

$inpuDir   = $baseDir . "/doc/phpdoc/";
$inputFile = $inpuDir . "index.html";

$fileData = file_get_contents($inputFile);
$fileData = preg_replace('/\!\[([^\]]*)\]\(([^\)]*)\)/imsU', '<img src="../../\2" title="\1" alt="\1"/>', $fileData);
file_put_contents($inputFile, $fileData);

echo "$inputFile: Images changed!\n";