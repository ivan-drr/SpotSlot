<?php
header("access-control-allow-origin: http://localhost:3000");

define('PATH', realpath('/home/snowtray/Proyects/'));

$allFiles = array();
$allKeys = array();

function manageElement(&$element) {
    $element .= is_dir($element)?'/':'';
}

function recursivo(&$array, $path) {
    $rootFiles = scandir($path);
    array_splice($rootFiles, 0, 2);

    foreach ($rootFiles as &$element) {
        $element = $path.'/'.$element;
        if (is_dir($element) && sizeof(scandir($element))>2) {
            recursivo($array, $element);
        } else {
            array_push($array, $element);
        }
    }
}

recursivo($allFiles, PATH);

foreach ($allFiles as &$file) {
    $file .= is_dir($file)?'/':'';

    $key = str_replace(PATH, "", $file);
    $key = substr($key, 1);
    
    array_push($allKeys, $key);
}

var_dump($allKeys);
