//时间&日期
window.onload = function() {
	var item_index = -1;
	var item_array = [];
	setInterval(showTime, 500);
	showSearch();
	inputAction();
	take_advice();
}

function showTime() {
	var date = document.getElementById("show_date");
	var week = document.getElementById("show_week");
	var time = document.getElementById("show_time");
	var now = new Date();
	var year = now.getFullYear();
	var month = now.getMonth() + 1;
	var day = now.getDate();
	var weeks = ["天", "一", "二", "三", "四", "五", "六"];
	var hour = now.getHours();
	var minute = now.getMinutes();
	var second = now.getSeconds();
	hour = (hour >= 10) ? hour : "0" + hour;
	minute = (minute >= 10) ? minute : "0" + minute;
	second = (second >= 10) ? second : "0" + second;

	var date_str = year + "年" + month + "月" + day + "日";
	var week_str = "星期" + weeks[now.getDay()];
	var time_str = hour + ":" + minute + ":" + second;

	date.innerHTML = date_str + week_str;
	time.innerHTML = time_str;
}