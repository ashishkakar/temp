function go() {
	if(!login_check()) {
		generate_error("You&apos;re not using https! Anyone listening to the network can sniff your password. To add security, click <a href=\"https://" + window.location.host + "/" + window.location.pathname +"\">here</a>.");
	}
}

function login_check() {
	var path = window.location.pathname;
	var len = strlen(path);
	var proto = window.location.protocol;
	return len>=10 && path.substr(len-10)=="login.html" && proto=="https";
}

function login_outcome(data, status) {
	if(status!=200) {
		generate_error("Login failed due to an internal server error. Please try again.");
	} else if(data.message!="success") {
		generate_error("Couldn&apos;t login. Please check your login credentials and try again.");
	} else {
		generate_success("Login success!");
	}
}

function login_submit() {
	var host = window.location.host;
	var path = window.location.pathname;
	var loc = path.lastIndexOf("/");
	var login_path = path.substring(0, loc+1)+"login.php";
	var url = host + "/" + login_path;
	var username = $("#login_name").val();
	var password = $("#password").val();
	$.post(url, {username: username, password: password}, login_outcome);
}

// escaping avoided since this function is used only internally
function generate_error(message) {
	var error = `<div class="error">
					<a href="javascript:$(this).css('display', 'none');" class="close"> X </a>
					<img src="https://img.icons8.com/pastel-glyph/64/000000/error--v1.png"/>
					<p class="message">` + message + `</p>
				</div>`;
	$("header").append(error);
}

function generate_warning(message) {
	var warning = `<div class="warning">
					<a href="javascript:$(this).css('display', 'none');" class="close"> X </a>
					<img src="https://img.icons8.com/pastel-glyph/64/000000/error--v1.png"/>
					<p class="message">` + message + `</p>
				</div>`;
	$("header").append(warning);
}

function generate_success(message) {
	var success = `<div class="success">
					<a href="javascript:$(this).css('display', 'none');" class="close"> X </a>
					<img src="https://img.icons8.com/pastel-glyph/64/000000/error--v1.png"/>
					<p class="message">` + message + `</p>
				</div>`;
	$("header").append(success);
}