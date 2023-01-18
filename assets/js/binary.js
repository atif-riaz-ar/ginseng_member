var cellhtml = '';
var colNum = [];
var upline_id = $("#txtSearch").val();

$(document).ready(function () {
	$('[data-toggle="tooltip"]').tooltip({
		html: true
	});
	var target = $("#txtSearch").val();
	drawGroupTree(target);
});

function goUp() {
	if (upline_id > 0) {
		$("#refreshGTB").load(location.href + " #refreshGTB");
		setTimeout(function () {
			drawGroupTree(upline_id);
		}, 500)
	}
}

function drawGroupTree(member_id) {
	$.ajax({
		url: API_URL + "network/binary",
		type: 'POST',
		data: {
			access_token: TOKEN,
			target: member_id,
			language: LANGUAGE
		},
		success: function (response) {
			try {
				$("#error-msg").html('');
				if (response == "") {
					$("#error-msg").html('<div class="alert alert-danger">' + "Unknown error" + '</div>');
				} else {
					var jsonData = JSON.parse(response).data;
					upline_id = jsonData.top.upline_id;
					cellhtml = createCell(jsonData.top.data);
					$("#cell-1-1").html(cellhtml);
					let upline = 0;
					$.each(jsonData.level2, function (key, item) {
						if (item.type == 'blank') {
							cellhtml = createEmptyCell(item.upline_userid, item.upline_side);
							$("#cell-" + 2 + "-" + item.col).html(cellhtml);
						} else if (item.type == "person") {
							cellhtml = createCell(item.data);
							$("#cell-" + 2 + "-" + item.col).html(cellhtml);
						} else {
							$("#cell-" + 2 + "-" + item.col).html("");
						}
					});
					$.each(jsonData.level3, function (key, item) {
						if (item.type == 'blank') {
							cellhtml = createEmptyCell(item.upline_userid, item.upline_side);
							$("#cell-" + 3 + "-" + item.col).html(cellhtml);
						} else if (item.type == "person") {
							cellhtml = createCell(item.data);
							$("#cell-" + 3 + "-" + item.col).html(cellhtml);
						} else {
							$("#cell-" + 3 + "-" + item.col).html("");
						}
					});
					$.each(jsonData.level4, function (key, item) {
						if (item.type == 'blank') {
							cellhtml = createEmptyCell(item.upline_userid, item.upline_side);
							$("#cell-" + 4 + "-" + item.col).html(cellhtml);
						} else if (item.type == "person") {
							colNum.push(item.col)
							cellhtml = createCell(item.data);
							$("#cell-" + 4 + "-" + item.col).html(cellhtml);
						} else {
							$("#cell-" + 4 + "-" + item.col).html("");
						}
					});
					$.each(jsonData.level5, function (key, item) {
						colNum.map((e) => {
							if (item.type == 'blank') {
								if (item.col == e * 2 - 1 || item.col == e * 2) {
									cellhtml = createEmptyCell(item.upline_userid, item.upline_side);
									$("#cell-" + 5 + "-" + item.col).html(cellhtml);
								}
							} else if (item.type == "person") {
								cellhtml = createCell(item.data);
								$("#cell-" + 5 + "-" + item.col).html(cellhtml);
							} else {
								$("#cell-" + 5 + "-" + item.col).html("");
							}
						})
					});
					colNum = [];
				}
			} catch (err) {
				$("#error-msg").html('<div class="alert alert-danger">' + err + '</div>');
			}
		}
	});
}

function clickDraw(member_id) {
	$("#refreshGTB").load(location.href + " #refreshGTB");
	setTimeout(function () {
		drawGroupTree(member_id);
	}, 500)
}

function createCell(data) {
	var toolTip = createToolTip(data, data.userid);
	return '<div class="grid_class group-row-box">' +
		'   <a href="#" class="att">' + toolTip +
		'      <ion-icon name="person-sharp" class="group-ion rocket" attri="' + data.userid + '" onclick="triggerTip(this, ' + data.userid + ')" onmouseover="triggerTip(this, ' + data.userid + ')"></ion-icon><br>' +
		'      <a style="cursor: pointer" onclick="clickDraw(' + data.member_id + ')">' +
		'          <span>' + data.userid + '</span><br>' +
		'          <span class="group-left-right">L : ' + data.bleft_node + '</span>' +
		'          <span class="group-left-right"> | </span>' +
		'          <span class="group-left-right">R : ' + data.bright_node + '</span>' +
		'      </a>' +
		'   </a>' +
		'</div>';
}

function createEmptyCell(upline_userid, upline_side) {
	return '<div class="grid_class group-row-box"><a href="' + BASE_URL + 'user/add/' + upline_userid + '/' + upline_side + '" class="att"><ion-icon name="add-circle-outline" class="group-ion"></ion-icon></a></div>';
}

function createToolTip(bv, userid) {
	var toolTip = "<p class='custom_tooltip tip_" + userid + " d-none' onmouseleave='hide_tip()'>" + LABEL_ACCUMULATED + "<br>" +
		bv.accu_left_node.padEnd(8, " ") + " | " + bv.accu_right_node.padStart(9, " ") +
		'<br>- - - - - - - - - - - - - -<br>'+LABEL_TODAY_ADDITION+'<br>' + bv.addition_left_node.padEnd(8, " ") +
		" | " + bv.addition_right_node.padStart(9, " ") + '<br>- - - - - - - - - - - - - -<br>'+LABEL_TODAY_MATCHING+'<br>' +
		bv.deduction_left_node.padEnd(8, " ") + " | " + bv.deduction_right_node.padStart(9, " ") + '<br>- - - - - - - - - - - - - -<br>'+LABEL_TODAY_BALANCE+'<br>' +
		bv.bleft_node.padEnd(8, " ") + " | " + bv.bright_node.padStart(9, " ") + '</p>';
	return toolTip;
}

$(".rocket").on('click mousedown touchstart', function () {
	var attr = $(this).attr('attri');
	triggerTip(this, attr);
});

$(document).not("p").click(function () {
	hide_tip();
});

function hide_tip() {
	$('.rocket').removeClass("d-none");
	$(".custom_tooltip").addClass("d-none");
	$(".custom_tooltip").removeClass("zIndex");
}

function triggerTip(dis, userid) {
	hide_tip();
	$(".tip_" + userid).addClass("zIndex");
	$(dis).addClass("d-none");
	$(".tip_" + userid).removeClass("d-none");
}
