<?php
header("access-control-allow-origin: http://localhost:3000");
header('Content-Type: application/json');
require_once('./path.php');

touch(PATH.'/'.$_POST['fileName'].'/')?'true':'false';
