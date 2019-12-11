<?php
header("access-control-allow-origin: http://localhost:3000");
header('Content-Type: application/json');

define('PATH', realpath('/home/snowtray/Proyects/'));
$allKeys = array();

function listFolderFiles(&$array, $dir) {
    $files = scandir($dir);

    unset($files[array_search('.', $files, true)]);
    unset($files[array_search('..', $files, true)]);

    // Prevent empty ordered elements
    if (count($files) < 1)
      return;

    foreach($files as $element) {
      $elementAbsolute = $dir.'/'.$element;
      if(is_dir($elementAbsolute) && sizeof(scandir($elementAbsolute))>2) {
        listFolderFiles($array, $elementAbsolute);
      } else {
        if (is_dir($elementAbsolute)) $elementAbsolute .= '/';
        $element = str_replace(PATH, "", $elementAbsolute);
        array_push($array, $element);
      }
    }
}

function buildJSON($folderFiles) {
  foreach ($folderFiles as &$key) {
    $key = [
      "key" => $key
      "modified" => filectime(PATH.$key)
      "size" => filesize(PATH.$key)
    ]
  }
}

listFolderFiles($allKeys, PATH);
buildJSON($allKeys);
echo json_encode($allKeys);
