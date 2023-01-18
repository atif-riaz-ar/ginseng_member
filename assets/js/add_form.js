$(document).ready(function () {
	showTypeZero();
});
$("#downline_type_0").click(function () {
	showTypeZero();
});
$("#downline_type_1").click(function () {
	showTypeOne();
});


$("#selCountry").change(function () {
	var code = $("#selCountry option:selected").data('code');
	$(".my_cc").text(code);
});

function showTypeOne() {
	$("#txtSponsorId").val($("#sponsor_id").val());
	$("#txtEmail").val($("#myEmail").val());
	$("#txtFirstName").val($("#myFirstName").val());
	$("#txtLastName").val($("#myLastName").val());
	$("#txtCountry").val($("#myCountry").val());
	$("#txtMobileNo").val($("#myMobile").val());
	$(".main_account_area").hide();
}

function showTypeZero() {
	$("#txtSponsorId").val($("#id").val());
	$("#txtEmail").val("");
	$("#txtFirstName").val("");
	$("#txtLastName").val("");
	$("#txtCountry").val("194");
	$("#txtMobileNo").val("");
	$(".main_account_area").show();
}
