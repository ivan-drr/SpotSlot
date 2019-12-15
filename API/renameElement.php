
<?php
header("access-control-allow-origin: http://localhost:3000");
header('Content-Type: application/json');
require_once('./path.php');

if (isset($_POST['newKey']) && isset($_POST['oldKey'])) {
    $oldElement = PATH.'/'.$_POST['oldKey'];
    $newElement = PATH.'/'.$_POST['newKey'] . is_dir(PATH.'/'.$_POST['oldKey'])?'/':'';

    echo (rename($oldElement, $newElement)?'true':'false');
} else {
    echo 'false';
}