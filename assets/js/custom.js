AddtoHome("2000", "once");
$(document).ready(function () {
	$('#my_custom_dt').DataTable();
	$('[data-toggle="tooltip"]').tooltip({
		html: true
	});
	$(document).on("click", '.btn-warning', function () {
		let required = $('.form-horizontal input,textarea,select').filter('[required]:visible');
		let allRequired = false;
		required.each(function () {
			if ($(this).val() === '') {
				allRequired = true;
			}
		});
		if (!allRequired) {
			setTimeout(function () {
				$('.btn-warning').prop('disabled', true)
			}, 0);
		}
	});
	$(document).ready(function () {
		$('.select2').select2({
			minimumInputLength: 4
		});
	});
});

function switch_account(userid) {
	window.location = window.location.origin + "/home/switcher/" + userid;
}

function hide_notification() {
	$(".notify_ajax").removeClass('show');
}

function show_notification(data) {
	var bg_class = $(".notify_bg");
	bg_class.removeClass("bg-success");
	bg_class.removeClass("bg-danger");
	bg_class.removeClass("bg-warning");
	bg_class.addClass(data.notify_bg);
	$(".notify_title").html(data.notify_title);
	$(".notify_time").html(data.notify_time);
	$(".notify_subtitle").html(data.notify_subtitle);
	$(".notify_summary").html(data.notify_summary);
	trigger_notification();
}

function number_format(number, decimals, dec_point, thousands_sep) {
	number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
	var n = !isFinite(+number) ? 0 : +number,
		prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
		sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
		dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
		s = '',
		toFixedFix = function (n, prec) {
			var k = Math.pow(10, prec);
			return '' + Math.round(n * k) / k;
		};
	s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
	if (s[0].length > 3) {
		s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
	}
	if ((s[1] || '').length < prec) {
		s[1] = s[1] || '';
		s[1] += new Array(prec - s[1].length + 1).join('0');
	}
	return s.join(dec);
}
