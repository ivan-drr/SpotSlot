<?php
header("access-control-allow-origin: http://localhost:3000");
header('Content-Type: application/json');

$absolutePath = '/home/snowtray/test/';
mkdir($absolutePath.'/'.$_POST['folderName'].'/')?'true':'false';
