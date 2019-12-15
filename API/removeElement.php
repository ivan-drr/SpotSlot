<?php
header("access-control-allow-origin: http://localhost:3000");
header('Content-Type: application/json');
require_once('./path.php');

$dir = PATH.'/'.$_POST['folderName'];

function deleteDirectory($dir) {
    if (!file_exists($dir)) return true;
    if (!is_dir($dir)) return unlink($dir);

    foreach (scandir($dir) as $item) {
        if ($item == '.' || $item == '..') continue;
        if (!deleteDirectory($dir . '/' . $item)) return false;
    }
    return rmdir($dir);
}

deleteDirectory($dir)?'true':'false';
