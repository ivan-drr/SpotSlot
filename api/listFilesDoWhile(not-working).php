<?php
header("access-control-allow-origin: http://localhost:3000");

define('PATH', realpath('/home/snowtray/test/'));

$allFiles = array();
$allKeys = array();

function manageElement(&$element) {
    $element .= is_dir($element)?'/':'';
}

function elementsContains($array, $str) {
    foreach ($array as $element) {
        if (strstr($element, $str) != false) {
            return true;
        }
    }
    return false;
}

function recursivo(&$array, $path) {
    do {
        recursive:
        $rootFiles = scandir($path);
        array_splice($rootFiles, 0, 2);

        foreach ($rootFiles as &$element) {
            $element = $path.'/'.$element;
            if (!elementsContains($array, $element)) {
                if (is_dir($element) && sizeof(scandir($element))>2) {
                    $path = $element;
                    goto recursive;
                } else {
                    array_push($array, $element);
                }
            }
            $path = PATH;
        }
        $end = false;
    } while($end);
    var_dump($array);
}

// [3.txt, folder1/folder1.2/folder1.2.3]
// 3.txt

recursivo($allFiles, PATH);

foreach ($allFiles as &$file) {
    $file .= is_dir($file)?'/':'';

    $key = str_replace(PATH, "", $file);
    $key = substr($key, 1);
    
    array_push($allKeys, $key);
}

var_dump($allKeys);
