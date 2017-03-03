/*
 *  下拉列表几级联动插件
 *	made by owenhong 2013-08-08
 *	作者：qy 2014-07-25
 */
(function($){
	$.fn.select=function(options){
		var defaults={
			key:"privince|city",                                                //下拉列表联动id
			value:"1|1066",                                                     //下拉列表联动value
			path:"http://orders.roseonly.com.cn/sysDictionary/find/",       //下拉列表联动数据获取
			canSelectValue:""												//限定可选值，在这里面的才能选择 dugang add on 2014-12-15
		};
	
		var options=$.extend(defaults,options);
		
		var keys = options.key.split("|");
		var values = options.value.split("|");
		var paths = options.path.split("|");
		var canSelectValues = options.canSelectValue.split("|");
		
		var len = keys.length;
		var len_path = paths.length + 1;
		var len_canSelectValues = canSelectValues.length + 1;
		
		$.each(keys,function(i,item){
			if(i < len-1) {
				var curr_path = paths[0];
				if(len_path == len) {
					curr_path = paths[i];
				}
				var next_canSelectValues = [];
				if(canSelectValues.length>0){
					next_canSelectValues = eval(''+canSelectValues[0]);
					if(len_canSelectValues == len) {
						next_canSelectValues = eval(''+canSelectValues[i]);
					}
				}
				if(values[i] != '') {
					selectTwo(keys[i], keys[i+1], curr_path, values[i], values[i+1],next_canSelectValues);
				}
				$("#"+keys[i]).bind("change",function() {
					var one_id = $(this).attr("id");
					var two_id = getNextKey(one_id);
					var curr_path_ = getCurrPath(one_id);
					var next_canSelectValues_ = getNextSelectValue(one_id);
					
					selectTwo(one_id, two_id, curr_path_, '', '',next_canSelectValues_);
					
					var k = len;
					$.each(keys,function(j,item){
						if(item == two_id) {
							k = j;
						}
						if(j > k) {
							$("#"+keys[j]).empty();
							$("<option></option>").val("").text("--请选择--").appendTo("#"+keys[j]);
						}
					});
				});
			}
		});
		
		function getNextKey(key) {
			var next = "";
			$.each(keys,function(i,item){
				if(item == key) {
					next = keys[i+1]
				}
			});
			return next;
		};
		
		function getCurrPath(key) {
			var next = "";
			if(len_path == len) {
				$.each(keys,function(i,item){
					if(item == key) {
						next = paths[i]
					}
				});
			} else {
				next = paths[0];
			}
			return next;
		};
		function getNextSelectValue(key) {
			var next = [];
			if(canSelectValues.length>0){
				if(len_canSelectValues == len) {
					$.each(keys,function(i,item){
						if(item == key) {
							next = eval(''+canSelectValues[i]);
						}
					});
				} else {
					next = eval(''+canSelectValues[0]);
				}
			}
			return next;
		};
		
		function selectTwo(one_id, two_id, path, one_value, two_value , two_canSelectValue) {
			if(one_value == '') {
				one_value = $("#"+one_id).val();
			} else {
				if(one_id != '') {
					$.each($('#'+one_id+' option'),function(i,item){
						var value = $(item).attr('value');
						if(value == one_value) {
							$(item).attr('selected', 'true');
						}
					});
				}
			}
			$("#"+two_id).empty();
			if(one_value != '') {
				$.post(path + one_value, null, function(data){
					if(two_canSelectValue && two_canSelectValue.length>0){
						var newData = [];
						for(var j=0;j<data.length;j++){
							for(var i=0;i<two_canSelectValue.length;i++){
								if(two_canSelectValue[i]==data[j]["id"]){
									newData[newData.length] = data[j];
									break;
								}
							}
						}
						data = newData;
					}
					if(data.length > 0) {
						$("<option></option>").val("").text("--请选择--").appendTo("#"+two_id);
					}
					$.each(data, function(i,item) {
						if(two_value == item["id"]) {
							$("<option></option>").val(item["id"]).text(item["name"]).attr('selected', 'true').appendTo("#"+two_id);
						} else {
							$("<option></option>").val(item["id"]).text(item["name"]).appendTo("#"+two_id);
						}
					});
					if(data.length == 0) {
						$("<option></option>").val("").text("--请选择--").appendTo("#"+two_id);
					}
				}, "json");
			} else {
				$("<option></option>").val("").text("--请选择--").appendTo("#"+two_id);
			}
		};
	};
})(jQuery);