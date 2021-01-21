var pages = {};
var page = null;

function go() {
	if(!login_check()) {
		generate_error("Insecure Protocol", "You&apos;re not using https! Anyone listening to the network can sniff your password. To add security, click <a href=\"https://" + window.location.host + "/" + window.location.pathname +"\">here</a>.");
	}
	pages.home = ["Cue Blocks Form", $("#homepage"), true, $("#homenav")];
	pages.admin = ["Cue Blocks Form Records", $("#adminpage"), true, $("#adminnav")];
	pages.login = ["Cue Blocks Form Admin Login", $("#loginpage"), false];
	$("main>div").hide();
	$("#homepage").show();
}

function login_check() {
	var path = window.location.pathname;
	var proto = window.location.protocol;
	return path.length>=10 && path.substr(path.length-10)=="login.html" && proto=="https";
}

function login_outcome(data, status) {
	if(status!=200) {
		generate_error("Internal Server Error", "Login failed due to an internal server error. Please try again.");
	} else if(data.message!="success") {
		generate_error("Login Failed", "Bad login name or password. Please check your login credentials and try again.");
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

function generate_error(title, msg) {
	$(".cancel").remove();
	var error = `<div class="error">
					<img src="https://img.icons8.com/pastel-glyph/64/000000/error--v1.png"/>
					<p class="msg"><strong class="msgtitle">` + title + `</strong><br>` + msg + `</p>
				</div>`;
	$("header").append(error);
	$("header").append("<p class='cancel'><a href='javascript:$(\".error,.warning,.success,.cancel\").hide();'>Cancel All</a></p>");
}

function generate_warning(title, msg) {
	$(".cancel").remove();
	var warning = `<div class="warning">
					<img src="https://img.icons8.com/pastel-glyph/64/000000/error--v1.png"/>
					<p class="msg"><strong class="msgtitle">` + title + `</strong><br>` + msg + `</p>
				</div>`;
	$("header").append(warning);
	$("header").append("<p class='cancel'><a href='javascript:$(\".error,.warning,.success,.cancel\").hide();'>Cancel All</a></p>");
}

function generate_success(title, msg) {
	$(".cancel").remove();
	var success = `<div class="success">
					<img src="https://img.icons8.com/pastel-glyph/64/000000/error--v1.png"/>
					<p class="msg"><strong class="msgtitle">` + title + `</strong><br>` + msg + `</p>
				</div>`;
	$("header").append(success);
	$("header").append("<p class='cancel'><a href='javascript:$(\".error,.warning,.success,.cancel\").hide();'>Cancel All</a></p>");
}

function navigate(to) {
	if(page!=null) {
		page[1].hide();
		if(page[2]) {
			page[3].removeClass("active");
		}
	}
	page=to;
	$("title").text(page[0]);
	page[1].show();
	if(page[2]) {
		page[3].addClass("active");
	}
}