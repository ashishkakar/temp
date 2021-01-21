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
			case 'getskills':
				require_once('controllers/class-guest-controller.php');
				switch ($method) {
					case '': GuestController::get_skills(); break;
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
			case 'getsalt':
				require_once('controllers/class-auth-controller.php');
				AuthController::getSalt($method);
				/*switch($method) {
					case '': AuthController::index(); break;
					default: break; //throw 404
				}*/
				break;
			case 'authenticate':
				require_once('controllers/class-auth-controller.php');
				AuthController::authenticate($method);
				/*switch($method) {
					case '': AuthController::index(); break;
					default: break; //throw 404
				}*/
				break;
			default: break; //throw 404
		}
	}
}