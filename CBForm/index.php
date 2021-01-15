<?php

declare(strict_types=1);
error_reporting(E_ALL); //if dev env

require_once('class-router.php');
Router::route($_GET['r']);