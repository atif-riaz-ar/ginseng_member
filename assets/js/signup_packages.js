$("#package_id").change(function () {
	var target = $(this).val();
	$(".secs").addClass('d-none');
	$(".sec_" + target).removeClass('d-none');
});
