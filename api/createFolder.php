<?php
header("access-control-allow-origin: http://localhost:3000");

$absolutePath = 'C:\Users\Nayxer\Projects\Atom\root';
mkdir($absolutePath.'/'.$_POST['folderName'].'/');
echo $_POST['folderName'];
