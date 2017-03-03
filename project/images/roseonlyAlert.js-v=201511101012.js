
/**
 * Created by roseonly on 2015/11/9.
 */
$(function () {
	/**
     * text:文字描述 ['',''] || ''
     * c_width 设置弹出层宽度
     * left:设置弹出层离左边的距离
     * btn:是否有按钮，如果有填写名称自动显示
     * btn_bg:按钮的颜色，默认为红色
     * bgcolor 背景层颜色
     * bgopacity 背景层透明度
     * alt_color 提示框颜色
     * alt_opacity 提示框透明度
     * alt_top 提示框与上边距高度
     * color 字体颜色默认是白色
     * focus 弹出层结束后元素是否获取焦点
     * fontSize 字体大小默认与页面一致
     * is_not_time: 是否渐变消失
     * a_time：按钮停留时间
     *
     * @param option
     */
	$.fn.roseonlyAlert = function (options,callback) {
		var _this = $(this);
		var settings = {text:"\u8bf7\u8bbe\u7f6e\u63d0\u793a\u6587\u5b57", c_width:"60%", left:"20%", btn:"",btn_bg:"", bgcolor:"", bgopacity:"", alt_color:"#000000", alt_opacity:"0.7", alt_top:_this.offset().top + "px", color:"#FFFFFF", focus:false, fontSize:"", is_not_time:true, a_time:3000, callback:""};
		$.extend(settings, options);
		function init() {
			if ($(".rose_delog").length === 0) {
				creatediv();
			}
			$(".rose_delog").css({"background":settings.bgcolor, "opacity":settings.bgopacity});
			$(".rose_delog_center").css({"background":settings.alt_color, "opacity":settings.alt_opacity, "top":settings.alt_top, "font-size":settings.fontSize, "width":settings.c_width, "left":settings.left});
            //添加内容
			content();
			$(".rose_delog_center > p").css({'color':settings.color,'font-size':settings.fontSize});
			$(".rose_delog").css({"display":"block"});
			if (settings.is_not_time) {
				setTime();
			}
            
            //设置时间或点击消失
			if (settings.focus) {
				_this.focus();
			}
		}
		function content() {
			$(".rose_delog_center").html("");
			if (settings.text instanceof Array) {
				for (var i in settings.text) {
					$(".rose_delog_center").append("<p>" + settings.text[i] + "</p>");
				}
			} else {
				$(".rose_delog_center").append("<p>" + settings.text + "</p>");
			}
			if (settings.btn != "") {
				$(".rose_delog_center").append("<p class='btn_p'><input id='rose_delog_btn' type='button' style='background:"+settings.btn_bg+"' value=" + settings.btn + " /></p>");
				$("#rose_delog_btn").click(function () {
					$(".rose_delog").css({"display":"none"});
				});
			}
		}
		function setTime() {
			var xg = parseFloat(settings.alt_opacity);
			var roseterval = setInterval(function () {
				xg = xg - 0.01;
				$(".rose_delog_center").css({"opacity":xg});
			}, settings.a_time / 50);
			var rosetime = setTimeout(function () {
				clearInterval(roseterval);
				$(".rose_delog").css({"display":"none"});
				if(callback){
					callback();
				}
			}, settings.a_time > 3000 ? settings.a_time : 3000);
			$(".rose_delog").click(function () {
				clearInterval(roseterval);
				clearTimeout(rosetime);
				$(".rose_delog").css({"display":"none"});
				if(callback){
					callback();
				}
			});
		}
		function creatediv() {
			var html = "<div class='rose_delog'><div class='rose_delog_center'></div></div>";
			$("body").append(html);
		}
		init();
	};
});

