<?php
if (isset($_POST['PATH'])) {
  define('PATH', realpath($_POST['PATH']));
}

echo PATH;
