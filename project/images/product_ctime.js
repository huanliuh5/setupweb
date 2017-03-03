var app=(function($,undefined){
	var util={
	    //验证字符串是否为空
		isEmpty:function(str){
			return (typeof str== 'undefined' || str==null || str =='');
		},

		isNotEmpty:function(v){
			return !util.isEmpty(v);
		},
		
		isNumber:function(v) {
			return new RegExp(/^\d+$/).test(v);
		},
		
		add:function(proid,ctime) {
			var i = 0;
			$.each(pageData.cartData, function(key, val) {
			    var proid_ = val[0];
				var ctime_ = val[1];
				
				if(proid == proid_) {
					i = 1;
					pageData.cartData[key][1] = ctime;
				}
			});
			
			if(i == 0) {
				pageData.cartData.push([proid,ctime]);
			}
			
			util.setCookie();
		},
		
		cookieDate: function() {
			var mydata = [];
			var cart_data = util.getCookieByName();
			var arr_1 = cart_data.split("#");
			for(var i=0; i<arr_1.length; i++) {
				var arr_2 = arr_1[i].split("_");
				if(arr_2.length == 2) {
					mydata.push(arr_2);
				}
			}
			pageData.cartData = mydata;
		},
		
		setCookie:function () {
			var cookieValue = "";
			var as = [];
			$.each(pageData.cartData, function(key, val) {
			    
				as.push(val.join('_'));
			});
			
			cookieValue = as.join("#")+"#";
			util.mycookie(pageData.cookieName, cookieValue, {expires:7, path:'/', domain:pageData.cookieDomain, secure:false, raw:false});
		},
		
		getCookieByName:function() {
			return util.mycookie(pageData.cookieName) || "";
		},
		
		getCookieUserid:function() {
			return util.mycookie(pageData.cookieUser) || "";
		},
		
		mycookie:function(e,t,n){if(typeof t=="undefined"){var a=null;if(document.cookie&&document.cookie!=""){var f=document.cookie.split(";");for(var l=0;l<f.length;l++){var c=jQuery.trim(f[l]);if(c.substring(0,e.length+1)==e+"="){a=c.substring(e.length+1);break}}}return a}n=n||{},t===null&&(t="",n.expires=-1);var r="";if(n.expires&&(typeof n.expires=="number"||n.expires.toUTCString)){var i;typeof n.expires=="number"?(i=new Date,i.setTime(i.getTime()+n.expires*24*60*60*1e3)):i=n.expires,r="; expires="+i.toUTCString()}var s=n.path?"; path="+n.path:"",o=n.domain?"; domain="+n.domain:"",u=n.secure?"; secure":"";document.cookie=[e,"=",t,r,s,o,u].join("")}
	};
	

	var pageData={
		basePath:"index.htm"/*tpa=http://www.roseonly.com.cn/*/,
		orderPath:"http://orders.roseonly.com.cn/",
		cookieName:"product_ctime",
		cookieUser:"index_cookiename",
		cookieDomain:".roseonly.com.cn",
		cartData:[],
		dateRule:[],
		proid:16,
		rule:'1',
		num:1
	}

	var app={
		init:function(proid) {
			pageData.proid = proid;
			fun.init();
		},
		
		add:function(proid,ctime) {
			util.add(proid, ctime);
		},
		
		ctime_change:function() {
			var ctime = $("#ctime").val();
			if(ctime != '') {
				util.add(pageData.proid, ctime);
			}
		},
		
		area_change:function() {
			fun.ctime_init(1);
		},
		
		address_init:function() {
			util.cookieDate();
			
			var cart_ids = $("#cart_ids").text();
			var arr = cart_ids.split(",");
			for(var i=0; i<arr.length; i++) {
				var proid = arr[i];
				
				$.each(pageData.cartData, function(key, val) {
			    	if(proid == val[0]) {
			    		$("#ctime_"+proid).val(val[1]);
			    	}
				});
			}
		},
		
		ctime_show:function() {
			fun.ctime_show();
		}
	};
	
	var fun={
		init:function() {
			util.cookieDate();
			fun.ctime_init(0);
			
			//监听点击日期
			$("#ctime").bind("click",function() {
				fun.ctime_show();
			});
			
			$("#typeid3").bind("change",function() {
				fun.ctime_init(1);
			});
			
			//监听点击日期
			/*$('#ctime').change(function(){
				var ctime = $("#ctime").val();
				if(ctime != '') {
					util.add(proid, ctime);
				}
			});*/
		},
		
		ctime_init:function(type) {
			var proid = pageData.proid;
			var areaid = $("#typeid3").val();
			if(type == 0) {
				areaid = $("#typeid3").attr("data-areaid");
			} 
			
			if(areaid == '') {
				WdatePicker({eCont:'ctime_show',disabledDates:[]});
				return;
			}
			$.getJSON(pageData.orderPath+"/userAddressinfo/isAddressByRosetype/"+proid+"/0?areaid="+areaid+"&callback=?",null,function(datas){
				if(datas.msg == '0') {
					//alert(datas.msgError);
					
					WdatePicker({eCont:'ctime_show',disabledDates:[]});
				} else {
					pageData.num = datas.num;
					pageData.rule = datas.rule;
				
					pageData.dateRule.push(datas.date);
					
					fun.ctime_show();
				}
			}, "json");
		},
		
		ctime_show:function() {
			if(parseInt(pageData.num) < 1) {
				WdatePicker({eCont:'ctime_show',disabledDates:[]});
				return;
			}
					
			var areaid = $("#typeid3").val();
			if(areaid == '') {
				WdatePicker({eCont:'ctime_show',disabledDates:[]});
				//alert("请选择地址！");
				return;
			}
			
			var proid = pageData.proid;
			var day = pageData.rule;
			
			var disabledate = [];
			var datetwo = [];
			$.each(pageData.dateRule, function(key, val) {
			    var proid_ = val.proid;
				
				if(proid_ == proid) {
					disabledate = val.disabledate;
					datetwo =  val.datetwo;
				}
			});
			
			if(day == '0') {
				if(datetwo.length == 2) {
					if(datetwo[0] == '0000-00-00') {
						WdatePicker({eCont:'ctime_show',disabledDates:[]});
						//alert("该产品已经售罄！");
					} else {
						WdatePicker({eCont:'ctime_show',minDate:datetwo[0],maxDate:datetwo[1]});
					}
				} else {
					WdatePicker({eCont:'ctime_show',minDate:'%y-%M-%d'});
				}
			}
			if(day != '0') {
				if(datetwo.length == 2) {
					if(datetwo[0] == '0000-00-00') {
						//WdatePicker({minDate:datetwo[0],maxDate:datetwo[1],disabledDates:[]});
						WdatePicker({eCont:'ctime_show',disabledDates:[]});
						//alert("该产品已经售罄！");
					} else {
						if(disabledate.length > 0) {
							WdatePicker({eCont:'ctime_show',minDate:datetwo[0],maxDate:datetwo[1],disabledDates:disabledate});
						} else {
							WdatePicker({eCont:'ctime_show',minDate:datetwo[0],maxDate:datetwo[1]});
						}
					}
				} else {
					if(disabledate.length > 0) {
						WdatePicker({eCont:'ctime_show',minDate:'%y-%M-#{%d+'+day+'}',disabledDates:disabledate});
					} else {
						WdatePicker({eCont:'ctime_show',minDate:'%y-%M-#{%d+'+day+'}'});
					}
				}
			}
		},
		
		select:function(privince,city,area) {
			$("body").select({
				key:"typeid1|typeid2|typeid3",     //下拉列表联动id
				value:privince+"|"+city+"|"+area,                        //下拉列表联动value
				path:pageData.basePath+"/pages/Select/findByPid.htm?id=|"+pageData.basePath+"/pages/Select/findByPid.htm?id="  //下拉列表联动数据获取
			});
		},
		
		datainit:function() {
			$.post(pageData.basePath+"/pages/Select/findByPid.htm?id=733",null,function(data){
				$("#typeid1").empty();
				$("<option></option>").val("").text("--请选择--").appendTo("#typeid1");
				$.each(data, function(i,item) {
					//if(two_value == item["id"]) {
					//	$("<option></option>").val(item["id"]).text(item["name"]).attr('selected', 'true').appendTo("#typeid1");
					//} else {
					//	$("<option></option>").val(item["id"]).text(item["name"]).appendTo("#typeid1");
					//}
					$("<option></option>").val(item["id"]).text(item["name"]).appendTo("#typeid1");
				});
				
				fun.addressinit();
			}, "json");
		},
		
		addressinit:function() {
			var userid = util.getCookieUserid();
			if(util.isNotEmpty(userid) && util.isNumber(userid)) {
				$.getJSON(pageData.orderPath+"/userAddressinfo/getAddress?callback=?",null,function(data){
					if(data.status == '1') {
						fun.select(data.privince,data.city,data.area);
					} else {
						fun.select("","","");
					}
				},"json");
			} else {
				fun.select("","","");
			}
		}
	}
			
	//dom ready
	$(function(){
		//pageData.basePath = $("#p_c_basePath").text();
		//pageData.orderPath = $("#p_c_orderPath").text();
		
		fun.datainit();
	
	});	

	return app;
			
})(jQuery);


