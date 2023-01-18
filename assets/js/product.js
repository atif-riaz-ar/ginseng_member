$("#add").on("click", function () {
	if ($("#quantity").val() > 0) {
		$("#total_amount").val(parseFloat($("#product_price").val() * $("#quantity").val()).toFixed(2))
		$('#orderModal').modal('show');
		setTimeout(() => {
			$("#paymentBtn1").removeAttr('disabled');
		}, 500);
	} else {
		alert('Min quantity is 1')
	}
})

$("#bkppaymentBtn1").on("click", function () {
	$.ajax({
		type: "POST",
		url: API_URL + "/member/addProductToCart/<?php echo $product['id']; ?>/" + $("#quantity").val(),
		success: function (data) {
			if (data != -1) {
				window.location.href = "<?php echo BASE_URL; ?>member/buy_product/step1"
			}
		}
	});
});

$(".btnClose").click(function () {
	$(".fade").removeClass('show');
	$("#add").removeAttr('disabled');
})

function add_to_cart(product_id, quantity = 1) {
	hide_notification();
	$.ajax({
		type: "POST",
		url: API_URL + "/cart/add_to_cart",
		data: {
			access_token: TOKEN,
			product_id: product_id,
			quantity: quantity,
			language: LANGUAGE,
		},
		success: function (data) {
			show_notification(JSON.parse(data).data);
			$(".btnClose").click();
		}
	});
}
