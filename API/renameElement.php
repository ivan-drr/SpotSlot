<?php
header("access-control-allow-origin: http://localhost:3000");
header('Content-Type: application/json');
require_once('./path.php');

$oldElement = PATH.$_GET['oldElementName'];
$newElement = PATH.$_POST['newName']) . is_dir(PATH.$_GET['oldElementName'])?'/':'';

if (isset($_POST['elementName'])) echo (rename($oldElement, $newElement)?'true':'false');
else echo 'false';
