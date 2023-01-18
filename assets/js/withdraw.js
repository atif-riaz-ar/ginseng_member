$(document).ready(function () {
	calculateWithdrawal();
	$("#currency").trigger("change");
});

$("#txtAmountDeducted").keyup(function () {
	calculateWithdrawal();
});

$("#selPaymentMode").change(function () {
	if ($("#selPaymentMode :selected").val() == "BANK") {
		$("#div-bank").show();
	} else {
		$("#div-bank").hide();
	}
});

$("#currency").change(function () {
	var balance = $('#currency').find(':selected').data('bal');
	var disname = $('#currency').find(':selected').data('name');
	if (disname === undefined) {
		$('.displaybalance').html('');
		$('.add-on').html('');
	} else {
		$('.displaybalance').html(balance);
		$('.add-on').html(disname);
	}
});

function calculateWithdrawal() {
	var amt = parseFloat($('#txtAmountDeducted').val());
	var adminfee = parseFloat(WITHDRAWAL_FEE/100 * amt);
	var amttotal = amt - adminfee;
	$('#txtAdminFee').val(adminfee.toFixed(2));
	$('#txtAmtToWithdraw').val(amttotal.toFixed(2));
}

function change_payment(dis) {
	if ($(dis).val() == "BANK") {
		$("#div-paynow").addClass("d-none");
		$("#div-bank").removeClass("d-none");
	} else {
		$("#div-bank").addClass("d-none");
		$("#div-paynow").removeClass("d-none");
	}
}
