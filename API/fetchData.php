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
		$allKeys = array();

		listFolderFiles($allKeys, $_POST['PATH']);
		buildJSON($allKeys);
		echo json_encode($allKeys);
	}

} else {
	echo '{"log": "undefined_path_given"}';
}

function listFolderFiles(&$array, $dir) {
	$files = scandir($dir);

	unset($files[array_search('.', $files, true)]);
	unset($files[array_search('..', $files, true)]);

	// Prevent empty ordered elements
	if (count($files) < 1)
		return;

	foreach($files as $element) {
		$elementAbsolute = $dir.'/'.$element;
		if(is_dir($elementAbsolute) && sizeof(scandir($elementAbsolute))>2) {
			listFolderFiles($array, $elementAbsolute);
		} else {
			if (is_dir($elementAbsolute)) $elementAbsolute .= '/';
			$element = str_replace($_POST['PATH'], "", $elementAbsolute);
			array_push($array, $element);
		}
	}
}

function buildJSON(&$folderFiles) {
	$dateTime = new DateTime();
	$dateTimeFile = new DateTime();

	foreach ($folderFiles as &$key) {
		$dateTimeFile->setTimestamp(filemtime($_POST['PATH'].$key));
		$interval = $dateTime->diff($dateTimeFile);

		$days = rtrim(sprintf("%s",$interval->d > 0 ? $interval->d : ""));
		$hours = rtrim(sprintf("%s",$interval->h > 0 ? $interval->h : ""));
		$minutes = rtrim(sprintf("%s",$interval->i > 0 ? $interval->i : ""));
		$seconds = rtrim(sprintf("%s",$interval->s > 0 ? $interval->s : ""));

		$key = [
		"key" => $key,
		"modified" => [
		"days" => $days,
		"hours" => $hours,
		"minutes" => $minutes,
		"seconds" => $seconds
		],
		"size" => filesize($_POST['PATH'].$key)
		];
	}
}
