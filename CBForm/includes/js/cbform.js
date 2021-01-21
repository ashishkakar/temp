var pages = {};
var page = null;

function go() {
	pages.home = ["Cue Blocks Form", $("#homepage"), true, $("#homenav")];
	pages.admin = ["Cue Blocks Form Records", $("#adminpage"), true, $("#adminnav")];
	pages.login = ["Cue Blocks Form Admin Login", $("#loginpage"), false];
	$("main>div").hide();
	navigate(pages.home);
	$.get("api/auth/authenticate", hide_admin);
	$.get("api/guest/getskills", populate_form);
}

function hide_admin(data, status) {
	//if(status!=200)
	var result = JSON.parse(data);
	if(result.status!=1) {
		$("#adminnav").hide();
	}
}

function populate_form(data, status) {
	var txt="";
	//if(status!=200)
	var res=JSON.parse(data).result;
	//if(res.status!=1)
	for(catid in res) {
		txt += `<tr>
					<td><label for="skills` + catid + `">` + res[catid][0] + `</label></td>
					<td><select id="skills` + catid + `" name="skills` + catid + `"><option value="0"></option>`;
		var first=true;
		for(skill of res[catid]) {
			if(first) {
				first = false;
				continue;
			}
			txt += `<option value="` + skill[0] + `">` + skill[1] + `</option>`;
		}
		txt += `</select>
					<td><input type="number" id="scores` + catid + `" name="scores` + catid + `" value="1" min="1" max="5"></td>
				</tr>`;
	}
	$("#skillstbl").html(txt);
}

function login_submit(form) {
	//validate login
	var login = $("#login_name").val();
	$.get("api/auth/getsalt/"+login, auth);
}

function auth(data, status) {
	//if(status!=200)
	var login = $("#login_name").val();
	var pass = $("#password").val();
	var salt = JSON.parse(data).result;
	var saltbits = sjcl.codec.hex.toBits(salt);
	var passbits = sjcl.codec.utf8String.toBits(pass);
	var data = sjcl.bitArray.concat(passbits, saltbits);
	var hash = sjcl.codec.hex.fromBits(sjcl.hash.sha256.hash(data));
	var expiry = new Date();
	expiry.setTime(expiry.getTime() + (72*60*60*1000));
	document.cookie = "token="+login+":"+hash+"; expires="+expiry.toUTCString();
	$.get("api/auth/authenticate", display_login_msg);
}

function display_login_msg(data, status) {
	//if(status!=200)
	var result = JSON.parse(data);
	if(result.status=='success') {
		generate_success('Login Success', 'You&apos;re logged in successfully.');
		$("#adminnav").show();
	} else {
		generate_error('Login Failure', result.msg);
		$("#adminnav").hide();
	}
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