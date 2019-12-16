
<?php
header("access-control-allow-origin: http://localhost:3000");
header('Content-Type: application/json');
require_once('./path.php');

if (isset($_POST['newKey']) && isset($_POST['oldKey'])) {
    $oldElement = PATH.'/'.$_POST['oldKey'];
    $newElement = PATH.'/'.$_POST['newKey'];

    $cmd = 'mv ' . $oldElement . ' ' . $newElement;
    exec($cmd, $output, $return_val);
} else {
    echo 'false';
}
