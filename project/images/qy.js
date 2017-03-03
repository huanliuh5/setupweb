/*
说明：
isNotNull：不能为空；
isNumber：是数字；
isFloat:是小数点数
isEnglish：是字母；
isEnglishOrNumber：是字母或数字； 未实现
isBetten：是(位数)区间，如：isBetten#3-6；
isEquals：相等，如：password1=password2；
isEmail：是isEmail；
isSelect：下拉列表是否选择；

isUrl：判断Url；
isZip:判断Zip;
isQQ: 判断QQ;
isChinese:判断汉字;
isIP:判断IP;
isMobile:是否是手机;
isIDCard:是否是有效的身份证(中国);
isPhoneCall:是否是有效的电话号码(中国);

*/

initData();

/*
 * 初始化常量数据
 */
function initData() {
	all_id = "";
	
	//单个显示：true，全部显示：false
	ISOPEN = false;
	
	TYPE_1 = "#";
	TYPE_2 = "-";
	TYPE_3 = "=";
	JS_TEST = "jsTest";
	TYPE_SPAN_ID = "span_";
	TYPE_ERROR_ID = "error_";
	
	ISNOTNULL = '不能为空!';
	ISEMAIL = '格式不正确!';
	ISENGLISH = '只能是字母!';
	ISNUMBERORENGLISH = '只能是字母或数字!';
	ISNUMBER = '只能是数字!';
	ISFLOAT = '只能是小数!';
	ISBETTEN = '只能是区间!';
	ISSELECT = '必须选择!';
	ISEQUALS = '不相等!';
	ISURL = "格式不正确!";
	ISZIP = "格式不正确!";
	ISQQ = "格式不正确!";
	ISCHINESE= "只能是汉字!";
	ISIP = "格式不正确!";
	ISMOBILE = "格式不正确!";
	ISIDCARD= "身份证号码非法!";
	ISPHONECALL= "格式不正确!";
}

/*
 * 函数入口
 */
$(document).ready(function(){ 
	initEvent();
	
	$("#qy_form").submit(function () {
		
		return mySubmit();
	}); 
});

/*
 * 监听jsTest标签事件
 */
function initEvent() {

	all_id = "";
	var obj = $("*[jsTest]");
	for(var i=0; i<obj.length; i++) {
		all_id += $(obj[i]).attr("id") + ",";
	}
	
	var keys = all_id.split(",");
	for(var i=0; i<keys.length; i++) {
		var id = keys[i];
		
		if(id != "") {
			//监听获取焦点事件
			//myFocus(id);
			//监听失去焦点事件
			if(!ISOPEN) {
				myBlur(id);
			}
		}
	}
}

/*
 * 获取焦点事件
 * 自定义该方法
 */
function myFocus(id) {
	$("#"+id).focus(function(){
		
	}); 
}

/*
 * 失去焦点事件
 * 自定义该方法
 */
function myBlur(id) {
	$("#"+id).blur(function(){
		if(check(id)) {
			$("#"+id).removeClass("Center w230 cR");
			$("#"+id).addClass("Center w230 cH");
			
			if($("#span_"+id)) {
				$("#span_"+id).text("");
			}
			
			if(id == 'username') {
				//fun_reg_onblur();
			}
		} 
	}); 
}

/*
 * 提示信息
 * 自定义该方法
 */
function showSpan(id,content) {
	var title = $($("#"+id).parent().parent().get(0)).text();
	var titles = title.split("：");
	if(titles.length == 2) {
		title = titles[0];
		title = title.replace("*","");
	} else {
		title = "";
	}
	
	$("#"+id).removeClass("Center w230 cH");
	$("#"+id).addClass("Center w230 cR");
	if($("#span_"+id)) {
		$("#span_"+id).text(title+content);
	}
}

function mySubmit() {
	return check(all_id);
} 

/*
 * 验证统一接口
 */
function check(ids) {
	
	//提交标示
	var submit = true;
	var keys = ids.split(",");
	for(var i=0; i<keys.length; i++) {
		var id = keys[i];
		
		if(id != "") {
			//id对象
			var obj = $("#"+id);
			//span对象
			var objSpan = $("#"+TYPE_SPAN_ID+id);
			var jsTest = obj.attr(JS_TEST); 
			if(!jsTest) return;
			var types = jsTest.split(",");
			data:
			for(var j=0; j<types.length; j++) {
				//js类型
				var type = types[j];
				
				if(type == '') {
					submit = false;
				    break data;
				}
				
				//区间判断
				var start = 0; end = 0;
				if(findChar(type,TYPE_1)) {
					var a = type.split(TYPE_1);
					type = a[0];
					var b = a[1].split(TYPE_2);
					start = b[0];
					end = b[1];
				}
				
				//相等判断
				var id1,id2;
				if(findChar(type,TYPE_3)) {
					var a = type.split(TYPE_3);
					type = "isEquals";
					id1 = a[0];
					id2 = a[1];
				}
				
				if(ISOPEN) {
					$("#"+TYPE_ERROR_ID+id).hide();
				}
				
				switch(type){
			    	case 'isNotNull':
			    		if(!isNotNull(obj.val())) {
			     			showSpan(id,ISNOTNULL);
			     			if(ISOPEN) {
				     			return false;
				     		}
				     		submit = false;
				     		break data;
			     		}
			     		break;
			    	case 'isNumber':
			    		if(!isNumber(obj.val())) {
			     			showSpan(id,ISNUMBER);
			     			if(ISOPEN) {
				     			return false;
				     		}
				     		submit = false;
				     		break data;
			     		}
			     		break;
			     	case 'isFloat':
			    		if(!isFloat(obj.val())) {
			     			showSpan(id,ISFLOAT);
			     			if(ISOPEN) {
				     			return false;
				     		}
				     		submit = false;
				     		break data;
			     		}
			     		break;
			     	case 'isEnglish':
			    		if(!isEnglish(obj.val())) {
			     			showSpan(id,ISENGLISH);
			     			if(ISOPEN) {
				     			return false;
				     		}
				     		submit = false;
				     		break data;
			     		}
			     		break;
			     	case 'isEnglishOrNumber':
			    		if(!isEnglishOrNumber(obj.val())) {
			     			showSpan(id,ISNUMBERORENGLISH);
			     			if(ISOPEN) {
				     			return false;
				     		}
				     		submit = false;
				     		break data;
			     		}
			     		break;
			     	case 'isBetten':
			    		if(!isBetten(obj.val(), start, end)) {
			     			showSpan(id,"必须在"+start+"到"+end+"为之间!");
			     			if(ISOPEN) {
				     			return false;
				     		}
				     		submit = false;
				     		break data;
			     		}
			     		break;
			     	case 'isSelect':
			    		if(!isSelect(obj.val())) {
			     			showSpan(id,ISSELECT);
			     			if(ISOPEN) {
				     			return false;
				     		}
				     		submit = false;
				     		break data;
			     		}
			     		break;
			     	case 'isEmail':
			    		if(!isEmail(obj.val())) {
			     			showSpan(id,ISEMAIL);
			     			if(ISOPEN) {
				     			return false;
				     		}
				     		submit = false;
				     		break data;
			     		}
			     		break;
			     	case 'isEquals':
			    		if(!isEquals(id1,id2)) {
			     			showSpan(id,ISEQUALS);
			     			if(ISOPEN) {
				     			return false;
				     		}
				     		submit = false;
				     		break data;
			     		}
			     		break;
					case 'isPhoneCall':
			    		if(!isPhoneCall(obj.val())) {
			     			showSpan(id,ISPHONECALL);
			     			if(ISOPEN) {
				     			return false;
				     		}
				     		submit = false;
				     		break data;
			     		}
			     		break;	
					case 'isIDCard':
			    		if(!isIDCard(obj.val())) {
			     			showSpan(id,ISIDCARD);
			     			if(ISOPEN) {
				     			return false;
				     		}
				     		submit = false;
				     		break data;
			     		}
			     		break;	
					case 'isMobile':
			    		if(!isMobile(obj.val())) {
			     			showSpan(id,ISMOBILE);
			     			if(ISOPEN) {
				     			return false;
				     		}
				     		submit = false;
				     		break data;
			     		}
			     		break;	
					case 'isIP':
			    		if(!isIP(obj.val())) {
			     			showSpan(id,ISIP);
			     			if(ISOPEN) {
				     			return false;
				     		}
				     		submit = false;
				     		break data;
			     		}
			     		break;	
					case 'isChinese':
			    		if(!isChinese(obj.val())) {
			     			showSpan(id,ISCHINESE);
			     			if(ISOPEN) {
				     			return false;
				     		}
				     		submit = false;
				     		break data;
			     		}
			     		break;	
			     	case 'isQQ':
			    		if(!isQQ(obj.val())) {
			     			showSpan(id,ISQQ);
			     			if(ISOPEN) {
				     			return false;
				     		}
				     		submit = false;
				     		break data;
			     		}
			     		break;	
			     	case 'isUrl':
			    		if(!isUrl(obj.val())) {
			     			showSpan(id,ISURL);
			     			if(ISOPEN) {
				     			return false;
				     		}
				     		submit = false;
				     		break data;
			     		}
			     		break;
			     	case 'isZip':
			    		if(!isZip(obj.val())) {
			     			showSpan(id,ISZIP);
			     			if(ISOPEN) {
				     			return false;
				     		}
				     		submit = false;
				     		break data;
			     		}
			     		break;
			     	case 'expand':
			    		if(!expand()) {
			     			showSpan(id,showExpand());
			     			if(ISOPEN) {
				     			return false;
				     		}
				     		submit = false;
				     		break data;
			     		}
			     		break;
			     	case 'expand1':
			    		if(!expand1()) {
			     			showSpan(id,showExpand1());
			     			if(ISOPEN) {
				     			return false;
				     		}
				     		submit = false;
				     		break data;
			     		}
			     		break;
			    	default:
			     		
			     		break data;
			    }
			}
		}
	}
	return submit;
}

/*
 * 查找字符是否存在
 */
function findChar(value,c) {
	for(var i=0; i<value.length; i++) {
		var a = value.indexOf(c);
		if(a == -1) {
			return false;
		}
	}
	return true;
}





