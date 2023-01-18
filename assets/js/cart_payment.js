function changePaymentMode() {
	var productForm = $("#frmBuyProduct");
	var gateway = $("#selected_payment_mode").val();
	$("#paymentMode").val(gateway);
	var param = (gateway.toLowerCase()).replace(/-/g, '');
	productForm.attr("action", BASE_URL + "order/" + param);
	productForm.submit();
}

function triggerConfirm() {
	$("#label_amount").html($(".val_total").html());
	$("#paymentConfirmation").attr('style', 'display: block;');
}

function cancelPayment() {
	$("#selected_payment_mode").val("");
	$("#paymentConfirmation").attr('style', 'display: none;');
}

function updateCart(qty, product_id) {
	$.ajax({
		type: "POST",
		url: API_URL + "/cart/update_cart",
		data: {
			access_token: TOKEN,
			product_id: product_id,
			quantity: qty,
			language: LANGUAGE,
		},
		success: function (data) {
			show_notification(JSON.parse(data).data);
			if(qty == 0){
				$(".cart__" + product_id).remove();
			}
			calculateCart();
		}
	});
}

function calculateCart(){
	var total_amount = 0;
	$('.val_qty').each(function(i, obj) {
		var row_qty = $(".val_qty").eq(i).val();
		var row_price = $(".val_price").eq(i).val();
		var item_total = parseFloat(row_price)*parseFloat(row_qty);
		total_amount += item_total;
		$(".val_qtotal").eq(i).html("$ " + number_format(item_total, "2", ".", ","));
	});
	$(".val_subtotal").html("$ " + number_format(total_amount, "2", ".", ","));
	$(".val_total").html("$ " + number_format(total_amount, "2", ".", ","));
	if(total_amount > 0){
		$("#cart_form").removeClass("d-none");
		$("#empty_card").addClass("d-none");
	} else {
		$("#cart_form").addClass("d-none");
		$("#empty_card").removeClass("d-none");
	}
}
