var amount;
$(document).ready(function () {
	goBaby();
	goBaby1();
});

$("#deposit_amount").keyup(function () {
	goBaby();
});

$("#deposit_amount").blur(function () {
	goBaby();
	goBaby1();
});

function goBaby() {
	amount = $("#deposit_amount").val() * $("#currency_rate").val();
	$("#transfer_amount").val(amount.toFixed(2));
}

function goBaby1() {
	deposit = parseFloat($("#deposit_amount").val());
	$("#deposit_amount").val(deposit.toFixed(2));
}

function show_bank(dis) {
	$(".all_banks").attr('style', 'display:none');
	$(".bank_dtl_" + dis.value).removeAttr('style');
}
