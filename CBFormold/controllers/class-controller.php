<?php

class Controller {
	public static function index() {
		Controller::loadView('header');
		Controller::loadView('footer');
	}
	
	public static function loadView($view, $data = array()) {
		require('views/' . $view . '.php');
	}
}