
<?php
header("access-control-allow-origin: http://localhost:3000");
header('Content-Type: application/json');
require_once('./path.php');
require_once('./removeElement.php');

if (isset($_POST['newKey']) && isset($_POST['oldKey'])) {
    $oldElement = PATH.'/'.$_POST['oldKey'];
    $newElement = PATH.'/'.$_POST['newKey'] . is_dir(PATH.'/'.$_POST['oldKey'])?'/':'';

    echo recurse_copy($oldElement, $newElement)?'true':'false';
    echo deleteDirectory($oldElement)?'true':'false';
} else {
    echo 'false';
    recurse_copy(PATH.'folder1/', PATH.'/f');
}

function recurse_copy($oldElement, $newElement) {
  if (is_dir($oldElement)) {
    $files = scandir($oldElement);

    unset($files[array_search('.', $files, true)]);
    unset($files[array_search('..', $files, true)]);

    if (count($files) < 1)
      return;

    foreach($files as $element) {
      recurse_copy($oldElement . '/' . $element, $newElement . '/' . $element);
    }
  } else {
    copy($oldElement, $newElement);
  }
}
