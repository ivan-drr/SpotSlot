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
    if (isset($_POST['KEY'])) {
      if ($_POST['KEY'] !== '') {
        echo (@mkdir($_POST['PATH'].'/'.$_POST['KEY'].'/')?'{"log": "element_created"}':'{"log": "could_not_create_element"}');

      } else echo '{"log": "empty_element_name"}';

    } else echo '{"log": "undefined_element_name"}';
	}

} else echo '{"log": "undefined_path_given"}';
