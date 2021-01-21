<?php

declare(strict_types=1);
error_reporting(E_ALL); //if dev env

require_once('class-router.php');
require_once('config.php');
require_once('common.php');

$start = strlen(dirname($_SERVER['PHP_SELF']))+1;
Router::route(substr($_SERVER['REQUEST_URI'], $start));
