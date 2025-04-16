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

//搜索
function showSearch() {
	var lists = document.querySelectorAll(".tab_title span");
	for(var i = 0; i < lists.length; i++) {
		lists[i].index = i;
		lists[i].onclick = function() {
			changeSearch(this.index);
			document.querySelector(".tab_title span.select").classList.add("none");
			document.querySelector(".tab_title span.select").classList.remove("select");
			this.classList.add("select");
			this.classList.remove("none");
		}
	}
}

function changeSearch(index) {
	var slogan = ["必应", "百度一下，你就知道", "Google", "360搜索，SO靠谱", "知乎", "搜狗搜索引擎 - 上网从搜狗开始"];
	var action = ["https://cn.bing.com/search", "http://www.baidu.com/s",  "https://www.google.com/search", "https://www.so.com/s",  "https://www.zhihu.com/search", "https://www.sogou.com/web"];
	var name = ["", "ie", "qs", "ie", "", "ie", "ie"];
	var value = ["n", "utf-8", "n", "utf-8", "", "utf-8", "utf8"]
	var search = ["q", "wd", "query", "q", "q", "q", "query"];

	var lists = document.querySelectorAll(".tab_title span");
	var form = document.querySelector(".search_box");
	var hidden = document.querySelector(".search_hidden");
	var text = document.querySelector(".search_input")
	var title = document.getElementsByTagName("title")[0];

	title.innerHTML = slogan[index]; //设置标题

	text.placeholder = lists [index].innerHTML + "搜索";
	/* 设置表单属性 */
	form.action = action[index];
	hidden.name = name[index];
	hidden.value = value[index];
	text.name = search[index];
}

function inputAction() {
	var baidu_api = "https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=#content#&cb=window_baidu_sug";
	var s_text = document.querySelector(".search_input")
	s_text.oninput = function() {
		var text_value = s_text.value;
		if(text_value.length < 24) {
			var old_script = document.getElementById("baidu_script");
			if(old_script) old_script.parentNode.removeChild(old_script);
			var script_src = baidu_api.replace("#content#", s_text.value);
			var baidu_script = document.createElement("script");
			baidu_script.src = script_src;
			baidu_script.id = "baidu_script";
			document.getElementsByTagName("head")[0].appendChild(baidu_script);
			baidu_script.src = script_src;
		}
	}
}

function window_baidu_sug(result) {
	var arr = result.s; //百度搜索推荐API
	var text_list = new Array();
	var s_text = document.querySelector(".search_input")
	var search_result = document.querySelector(".search_result");
	var result_items = document.querySelectorAll(".result_item");
	for(var i = 0; i < result_items.length; i++) {
		result_items[i].style.background = "none";
	}
	if(arr.length != 0) {
		var str = s_text.value;
		search_result.style.display = "block";
		for(var i = 0; i < result_items.length; i++) {
			if(i < arr.length) {
				var text = "";
				if(arr[i].indexOf(str) >= 0) {
					text = str + "<b>" + arr[i].replace(str, "") + "</b>";
				} else {
					text = arr[i];
				}

				result_items[i].style.display = "block";
				result_items[i].innerHTML = text;
			} else {
				result_items[i].innerHTML = "";
				result_items[i].style.display = "none";
			}
		}
		for(var i = 0; i < result_items.length; i++) {
			if(result_items[i].innerHTML != "") {
				text_list.push(result_items[i].innerText);
			}
		}
		text_list.push(s_text.value);
	} else {
		var search_result = document.querySelector(".search_result");
		search_result.style.display = "none";
		for(var i = 0; i < result_items.length; i++) {
			result_items[i].innerHTML = "";
			result_items[i].style.display = "none";
		}
	}
	item_index = -1;
	item_array = text_list;
}

function take_advice() {
	var s_text = document.querySelector(".search_input")
	var s_submit = document.querySelector(".search_submit");
	var search_result = document.querySelector(".search_result");
	var result_items = document.querySelectorAll(".result_item");
	for(var i = 0; i < result_items.length; i++) {
		result_items[i].index = i;
		result_items[i].onclick = function() {
			s_text.value = this.innerText;
			s_submit.click();
		}
		result_items[i].onmouseover = function() {
			this.style.background = "#EEEEEE";
			item_index = this.index;
		}
		result_items[i].onmouseout = function() {
			clear_item_style();
		}
	}
	document.onclick = function() {
		search_result.style.display = "none";
		for(var i = 0; i < result_items.length; i++) {
			result_items[i].innerHTML = "";
			result_items[i].style.background = "none";
			result_items[i].style.display = "none";
		}
	}
	document.onkeydown = function() {
		if(search_result.style.display == "block") {

			var key_code = event.keyCode;
			if(key_code == 27) {
				clear_item_style();
				search_result.style.display = "none";
				for(var i = 0; i < result_items.length; i++) {
					result_items[i].innerHTML = "";
					result_items[i].style.display = "none";
				}
			}
			if(key_code == 38 || key_code == 40) {
				clear_item_style();

				if(key_code == 38) {
					item_index = (item_array.length + item_index - 1) % item_array.length;
				} else if(key_code == 40) {
					item_index = (item_array.length + item_index + 1) % item_array.length;
				}
				s_text.value = item_array[item_index];
				if(item_index < result_items.length) {
					result_items[item_index].style.background = "#EEEEEE";
				}
				return false;
			}
		}
	}

	function clear_item_style() {
		for(var i = 0; i < result_items.length; i++) {
			result_items[i].style.background = "none";
		}
	}
}