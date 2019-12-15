<?php
header("access-control-allow-origin: http://localhost:3000");
header('Content-Type: application/json');
require_once('./path.php');

if (isset($_POST['folderName'])) echo (mkdir(PATH.$_POST['folderName'].'/')?'true':'false');
else echo 'false';
