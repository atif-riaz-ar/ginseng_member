$(document).ready(function () {
	downloadImage();
});

function downloadImage() {
	var copy_link_address = $("#link_to_copy").val();
	$('#qr_link_section').attr('href', copy_link_address);
	$('#qr_link_section').html(copy_link_address);
	$('#link_to_copy').val(copy_link_address);
	var qrDiv = $('#qr_image_section');
	var qrcode = new QRCode("qr_image_section", {
		text: copy_link_address,
		width: 256,
		height: 256,
		correctLevel: QRCode.CorrectLevel.H
	});
	document.getElementById('downloadButton').href = qrcode._oDrawing._elCanvas.toDataURL("image/png");
}

function copyRefLink(d, el) {
	var copy_link_address = $("#link_to_copy").val()
	el = (typeof el === 'string') ? document.querySelector("#" + el) : el;

	if (navigator.userAgent.match(/ipad|ipod|iphone/i)) {
		if (navigator.clipboard) {
			navigator.clipboard.writeText(copy_link_address);
		} else {
			var editable = el.contentEditable;
			var readOnly = el.readOnly;
			el.contentEditable = true;
			el.readOnly = true;
			var range = document.createRange();
			range.selectNodeContents(el);
			var selection = window.getSelection();
			selection.removeAllRanges();
			selection.addRange(range);
			el.setSelectionRange(0, 999999);
			el.contentEditable = editable;
			el.readOnly = readOnly;
			document.execCommand('copy');
		}
	} else {
		el.select();
		document.execCommand('copy');
	}
	$(d).html("[[LINK_COPIED]]");
	setTimeout(function () {
		$(d).html("[[LINK_COPY]]");
	}, 1000)
}
