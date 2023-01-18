
$(document).ready(function () {
	checkOtherBank();
	$('#otherbank').click(function () {
		checkOtherBank();
	})
});

function checkOtherBank() {
	var val = $('#otherbank').is(':checked');
	if (val) {
		$('#bank_name').show();
		$('#bank_id').val("");
		$('#bank_id').prop('disabled', true);
	} else {
		$('#bank_name').hide();
		$('#bank_id').prop('disabled', false);
	}
}
