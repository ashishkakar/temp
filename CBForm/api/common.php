<?php

function throw_error($msg='unknown') {
	$result = array();
	$result['status'] = 'failure';
	$result['msg'] = $msg;
	die(json_encode($result));
}

function auth() {
	if(!isset($_COOKIE['token'])) {
		return false;
	}
	$pos = strpos($_COOKIE['token'], ':');
	$login = substr($_COOKIE['token'], 0, $pos);
	$hash = substr($_COOKIE['token'], $pos+1);
	require_once('class-sql.php');
	require_once('models/class-admins-model.php');
	$s = new SQL();
	$id = admins_model::getIdFromLogin($login, $s);
	$real_hash = admins_model::getHash($id, $s);
	if($hash==$real_hash) {
		return true;
	}
	return false;
}