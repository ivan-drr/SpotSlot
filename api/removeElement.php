<?php
header("access-control-allow-origin: http://localhost:3000");
header('Content-Type: application/json');

$absolutePath = '/home/snowtray/test/';
$dir = $absolutePath.'/'.$_POST['folderName'];

function deleteDirectory($dir) {
    if (!file_exists($dir)) return true;
    if (!is_dir($dir)) return unlink($dir);

    foreach (scandir($dir) as $item) {
        if ($item == '.' || $item == '..') continue;
        if (!deleteDirectory($dir . DIRECTORY_SEPARATOR . $item)) return false;
    }
    return rmdir($dir);
}

deleteDirectory($dir)?'true':'false';
