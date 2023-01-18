
function mnc()
{
	let now = new Date();
	let expire = new Date();
	let total_click = 1;
	if (getCookie("reset_sec_pass") != "") {
		total_click = 1 + parseInt(getCookie("reset_sec_pass"));
	}

	expire.setFullYear(now.getFullYear());
	expire.setMonth(now.getMonth());
	expire.setDate(now.getDate()+1);
	expire.setHours(0);
	expire.setMinutes(0);
	expire.setSeconds(0);

	let expires = "expires="+expire.toString();
	document.cookie = "reset_sec_pass=" + total_click + "; " + expires +"; path=/";

	window.location.href = window.location.origin + "/reset/reset_secondary_password";
}

function getCookie(cname) {
	let name = cname + "=";
	let decodedCookie = decodeURIComponent(document.cookie);
	let ca = decodedCookie.split(';');
	for(let i = 0; i <ca.length; i++) {
		let c = ca[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return "";
}
