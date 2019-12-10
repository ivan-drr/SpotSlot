<?php
header("access-control-allow-origin: http://localhost:3000");

define('PATH', realpath('/home/snowtray/test/'));

$allFiles = array();
$allKeys = array();

function manageElement(&$element) {
    $element .= is_dir($element)?'/':'';
}

function elementIsContainedIn($array, $element) {
    foreach ($array as $arrayElement) {
        if (strstr($element, $arrayElement) != false) {
            return true;
        }
    }
    return false;
}

// PROBLEMA: $char NO CONTIENE $str (DICE)

$arr = ["/home/snowtray/test/3.txt", "/home/snowtray/test/folder1", "folder2"];
$files = ["/home/snowtray/test/3.txt", "/home/snowtray/test/folder1/folder1.2/folder1.2.3"];

$str = "/home/snowtray/test/folder1";
$char = "/home/snowtray/test/folder1/folder1.2/folder1.2.3";

$str = str_replace("/home/snowtray/", "", $str);
$str = str_replace("/", " ", $str);

//$str = substr($str, strpos(" ", $str));
echo $str;
//echo $str;

echo strpos('/', $str);

//echo strpos($str, $char)?'true':'false';

//foreach ($arr as $elm) {
    //echo elementIsContainedIn($files, $elm)?'si':'no';
//}



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

//recursivo($allFiles, PATH);

foreach ($allFiles as &$file) {
    $file .= is_dir($file)?'/':'';

    $key = str_replace(PATH, "", $file);
    $key = substr($key, 1);
    
    array_push($allKeys, $key);
}

var_dump($allKeys);
