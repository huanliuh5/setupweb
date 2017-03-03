/*
 * 二级联动工具类
 * one_id     一级id
 * two_id     二级id
 * path       获取二级数据url，二级数据格式："[{id:'1', name:'data1'},{id:'2', name:'data2'}]";
 * 以下两个属性在初始值中用到（默认选中的一级二级）
 * one_value  一级初始值
 * two_value  二级初始值
 */
/*
 * 二级联动工具类
 * one_id     一级id
 * two_id     二级id
 * path       获取二级数据url，二级数据格式："[{id:'1', name:'data1'},{id:'2', name:'data2'}]";
 * 以下两个属性在初始值中用到（默认选中的一级二级）
 * one_value  一级初始值
 * two_value  二级初始值
 */
function selectTwo(one_id, two_id, path, one_value, two_value) {
	if(one_value == '') {
		one_value = $("#"+one_id).val();
	}
	//var one_value = $("#"+one_id).val();
	$("#"+two_id).empty();
	if(one_value != '') {
		$.post(path + one_value, null, function(data){
			var result = eval('(' + data + ')');
			
			if(result.length > 0) {
				$("<option></option>").val("").text("--请选择--").appendTo("#"+two_id);
			}
			$.each(result, function(i,item) {
				if(two_value == item["id"]) {
					$("<option></option>").val(item["id"]).text(item["name"]).attr('selected', 'true').appendTo("#"+two_id);
				} else {
					$("<option></option>").val(item["id"]).text(item["name"]).appendTo("#"+two_id);
				}
			});
			if(result.length == 0) {
				$("<option></option>").val("").text("--请选择--").appendTo("#"+two_id);
			}
		});
	} else {
		$("<option></option>").val("").text("--请选择--").appendTo("#"+two_id);
	}
}

/*
 * 判断null
 */
function isNotNull(value) {
	if(Trim(value) == "") {
		return false;
	}
	return true;
}

/*
 * 判断Equals
 */
function isEquals(id1, id2) {
	var value1 = $("#"+id1).val();
	var value2 = $("#"+id2).val();
	if(value1 != value2) {
		return false;
	}
	return true;
}

/*
 * 判断email
 */
function isEmail(value) {
	return !isNotNull(value) ? true : (new RegExp(/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/).test(value));
}

/*
 * 判断小数
 */
 function isFloat(value) {
    return !isNotNull(value) ? true : (new RegExp(/^\d+(\.\d+)?$/).test(value));
 }

/*
 * 判断数字
 */
function isNumber(value) {
	return !isNotNull(value) ? true : (new RegExp(/^\d+$/).test(value));
}

/*
 * 判断English
 */
function isEnglish(value) {
	var exp = /^[A-Za-z]+$/;
	return !isNotNull(value) ? true : (new RegExp(exp).test(value));
}

/*
 * 判断字符和数字
 */
function isEnglishOrNumber(value) {
	alert(!isNumber(value) && !isEnglish(value));
	if(!isNumber(value) && !isEnglish(value)) {
		return false;
	}
	return false;
}

/*
 * 判断字符个数
 */
function isBetten(value, start, end) {
	if(!isNotNull(value)) {
		return true;
	}
	
	var len = value.length;
	if(len < start || len > end) {
		return false;
	}
	return true;
}

/*
 * 判断Select
 */
function isSelect(value) {
	return isNotNull(value);
}

/*
 * 判断Url
 */
function isUrl(value) {
	var exp = /^http:\/\/[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/;
	return !isNotNull(value) ? true : (new RegExp(exp).test(value));
}

/*
 * 判断Zip
 */
function isZip(value) {
	var exp = /\d{6}/;
	return !isNotNull(value) ? true : (new RegExp(exp).test(value));
}

/*
 * 判断QQ
 */
function isQQ(value) {
	var exp = /^[1-9]\d{4,8}$/;
	return !isNotNull(value) ? true : (new RegExp(exp).test(value));
}



/*
 * 判断Chinese
 */
function isChinese(value) {
	var exp = /^[\u0391-\uFFE5]+$/;
	return !isNotNull(value) ? true : (new RegExp(exp).test(value));
}

/*
 * 判断IP
 */
function isIP(value){
	if(!isNotNull(value)) {
		return true;
	}
	var reSpaceCheck = /^(\d+)\.(\d+)\.(\d+)\.(\d+)$/;
	if (reSpaceCheck.test(value)) {
		value.match(reSpaceCheck);
		if (RegExp.$1 <= 255 && RegExp.$1 >= 0 && RegExp.$2 <= 255 && RegExp.$2 >= 0 && RegExp.$3 <= 255 && RegExp.$3 >= 0 && RegExp.$4 <= 255 && RegExp.$4 >= 0) {
			return true;     
		} else {
			return false;
		}
	}
	else {
		return false;
	}
}

/*
===========================================
//是否是手机
===========================================
*/
function isMobile(value)
{
return !isNotNull(value) ? true : (new RegExp(/^1[3-9]\d{9}$/).test(value));
}


/*
===========================================
//是否是有效的电话号码(中国)
===========================================
*/
function isPhoneCall(value)
{

return !isNotNull(value) ? true : (new RegExp(/(^[0-9]{3,4}\-[0-9]{3,8}$)|(^[0-9]{3,8}$)|(^\([0-9]{3,4}\)[0-9]{3,8}$)|(^0{0,1}13[0-9]{9}$)/).test(value));
}

/*
===========================================
//是否是有效的身份证(中国)
===========================================
*/
function isIDCard(idcard){ 
	if(!isNotNull(idcard)) {
		return true;
	}
	var Errors=new Array(true, false, false, false, false); 
	//var Errors=new Array( 
	//"验证通过!", 
	//"身份证号码位数不对!", 
	//"身份证号码出生日期超出范围或含有非法字符!", 
	//"身份证号码校验错误!", 
	//"身份证地区非法!" 
	//); 
	var area={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"}  
	var idcard,Y,JYM; 
	var S,M; 
	var idcard_array = new Array(); 
	idcard_array = idcard.split(""); 
	//地区检验 
	if(area[parseInt(idcard.substr(0,2))]==null) return Errors[4]; 
	//身份号码位数及格式检验 
	switch(idcard.length){ 
		case 15: 
			if ( (parseInt(idcard.substr(6,2))+1900) % 4 == 0 || ((parseInt(idcard.substr(6,2))+1900) % 100 == 0 && (parseInt(idcard.substr(6,2))+1900) % 4 == 0 )){ 
				ereg=/^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}$/;//测试出生日期的合法性 
			} else { 
				ereg=/^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}$/;//测试出生日期的合法性 
			} 
			if(ereg.test(idcard)) return Errors[0]; 
			else return Errors[2]; 
			break; 
		case 18: 
			//18位身份号码检测 
			//出生日期的合法性检查  
			//闰年月日:((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9])) 
			//平年月日:((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8])) 
			if ( parseInt(idcard.substr(6,4)) % 4 == 0 || (parseInt(idcard.substr(6,4)) % 100 == 0 && parseInt(idcard.substr(6,4))%4 == 0 )){ 
				ereg=/^[1-9][0-9]{5}19[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}[0-9Xx]$/;//闰年出生日期的合法性正则表达式 
			} else { 
				ereg=/^[1-9][0-9]{5}19[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}[0-9Xx]$/;//平年出生日期的合法性正则表达式 
			} 
			if(ereg.test(idcard)){//测试出生日期的合法性 
				//计算校验位 
				S = (parseInt(idcard_array[0]) + parseInt(idcard_array[10])) * 7 
				+ (parseInt(idcard_array[1]) + parseInt(idcard_array[11])) * 9 
				+ (parseInt(idcard_array[2]) + parseInt(idcard_array[12])) * 10 
				+ (parseInt(idcard_array[3]) + parseInt(idcard_array[13])) * 5 
				+ (parseInt(idcard_array[4]) + parseInt(idcard_array[14])) * 8 
				+ (parseInt(idcard_array[5]) + parseInt(idcard_array[15])) * 4 
				+ (parseInt(idcard_array[6]) + parseInt(idcard_array[16])) * 2 
				+ parseInt(idcard_array[7]) * 1  
				+ parseInt(idcard_array[8]) * 6 
				+ parseInt(idcard_array[9]) * 3 ; 
				Y = S % 11; 
				M = "F"; 
				JYM = "10X98765432"; 
				M = JYM.substr(Y,1);//判断校验位 
				if(M == idcard_array[17]) return true; //检测ID的校验位 
					else return Errors[3]; 
				} 
			else return Errors[2]; 
			break; 
		default: 
			return Errors[1]; 
			break; 
	} 
} 



/*
 * 去掉左边空格
 */
function LTrim(str) {
    var whitespace = new String(" \t\n\r");
    var s = new String(str);
    if (whitespace.indexOf(s.charAt(0)) != -1) {
        var j=0, i = s.length;
        while (j < i && whitespace.indexOf(s.charAt(j)) != -1) {
           j++;
        }
        s = s.substring(j, i);
    }
    return s;
}

/*
 * 去掉右边空格
 */
function RTrim(str) {
    var whitespace = new String(" \t\n\r");
    var s = new String(str);
    if (whitespace.indexOf(s.charAt(s.length-1)) != -1) {
        var i = s.length - 1;
        while (i >= 0 && whitespace.indexOf(s.charAt(i)) != -1) {
            i--;
        }
        s = s.substring(0, i+1);
    }
    return s;
}

/*
 * 去掉两边空格
 */
function Trim(str) {
    return RTrim(LTrim(str));
}






