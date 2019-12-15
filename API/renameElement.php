<?php
header("access-control-allow-origin: http://localhost:3000");
header('Content-Type: application/json');
require_once('./path.php');

$oldElement = PATH.$_GET['oldKey'];
$newElement = PATH.$_POST['newKey']) . is_dir(PATH.$_GET['oldKey'])?'/':'';

if (isset($_POST['newKey'])) echo (rename($oldElement, $newElement)?'true':'false');
else echo 'false';
