<?php

class Router {
	public static function route($r) {
		$parts = explode('/', $r);
		$controller = $parts[0] ?? '';
		$method = $parts[1] ?? '';
		switch ($controller) {
			case '':
				require_once('controllers/class-controller.php');
				Controller::index();
				break;
			case 'user':
				require_once('controllers/class-user-controller.php');
				switch ($method) {
					case '': UserController::index(); break;
					default: break; //throw 404
				}
				break;
			case 'admin':
				require_once('controllers/class-admin-controller.php');
				switch ($method) {
					case '': AdminController::index(); break;
					default: break; //throw 404
				}
				break;
			case 'login':
				require_once('controllers/class-auth-controller.php');
				switch($method) {
					case '': AuthController::index(); break;
					default: break; //throw 404
				}
				break;
			default: break; //throw 404
		}
	}
}