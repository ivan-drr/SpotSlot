<?php
header("access-control-allow-origin: http://localhost:3000");

define('PATH', realpath('C:\Users\Nayxer\Projects\Atom\root'));

$allFiles = array();
$allKeys = array();

function manageElement(&$element) {
    $element .= is_dir($element)?'/':'';
}

function elementIsContainedIn($array, $element) {
    foreach ($array as $arrayElement) {
        if (strpos($arrayElement, basename($element)) != false) {
            return true;
        }
    }
    return false;
}

function recursivo(&$array, $path) {
    recursive:
    $rootFiles = scandir($path);
    array_splice($rootFiles, 0, 2);

    foreach ($rootFiles as &$element) {
        $element = $path.'/'.$element;
        if (!elementIsContainedIn($array, $element)) {
            if (is_dir($element) && sizeof(scandir($element))>2) {
                $path = $element;
                goto recursive;
            } else {
                array_push($array, $element);
                $path = PATH;
                goto recursive;
            }
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
