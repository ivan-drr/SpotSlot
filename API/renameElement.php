<?php
// ALLOW TESTING
header("access-control-allow-origin: http://localhost");

//header("access-control-allow-origin: http://localhost:3000");
header('Content-Type: application/json');

if (isset($_POST['PATH'])) {
	if($_POST['PATH'] === '') {
		echo '{"log": "empty_path_given"}';

	} else if (!is_dir($_POST['PATH'])) {
		echo '{"log": "unavailable_path_to_fetch"}';

	} else {
    if (isset($_POST['NEW_KEY']) && isset($_POST['OLD_KEY'])) {
      if ($_POST['NEW_KEY'] !== '' && $_POST['OLD_KEY'] !== '') {
        $oldElement = $_POST['PATH'].'/'.$_POST['OLD_KEY'];
        $newElement = $_POST['PATH'].'/'.$_POST['NEW_KEY'];

        $cmd = 'mv ' . $oldElement . ' ' . $newElement;

				exec($cmd, $output, $return_var);

				if ($return_var === 0) echo '{"log": "element_renamed"}';
				else echo '{"log": "could_not_rename_element"}';

      } else echo '{"log": "empty_element_name"}';

    } else echo '{"log": "undefined_element_name"}';
  }
} else echo '{"log": "undefined_path_given"}';
