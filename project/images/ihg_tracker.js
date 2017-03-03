(function () {

var track = function() {

	if (!window.jQuery) {return;}
	clearInterval(trackInterval);
	var _mvq = window._mvq || [];
	window._mvq	 = _mvq;
	var param = [];

	if (window.trackingJson) {
		var keys = ["brand", "country","siteCountry", "language", "loginType", "siteCountry", "categoryID", "siteCountry", "arrivalDate", "arrivalDateDC", "destination",
		"hotelRank", "searchResults", "searchString", "hotelRank", "hotelCode"]
		
		for (var i = 0, l = keys.length;i < l;i++) {
			if (trackingJson[keys[i]]) {
				param.push(keys[i] + "=" + trackingJson[keys[i]]);
			}
		}
	};	
	

	var cookieStr = document.cookie;
	var start = cookieStr.indexOf("SessionBean");
	cookieStr = cookieStr.substr(start);
	var end = cookieStr.indexOf(";");
	cookieStr = cookieStr.substr(0, end);
	if (cookieStr) {
		eval("var " + decodeURIComponent(cookieStr));
		
		for (var k in SessionBean) {
			if (SessionBean[k] != null) {
				param.push(k + "=" + SessionBean[k]);
			}
		}

		if (window.location.href.indexOf("hotels/paymentinfo") >= 0) {
			param.push("HotelName=" + jQuery(".HotelName").html());
		}
		if (window.location.href.indexOf("hotels/showReservationDetail") >= 0) {
			var query = window.location.href.split("?").pop().split("&")[0];
			param.push(query);
		}
		if (window.location.href.indexOf("showReservationDetail") >= 0) {
			param.push("amount=" + jQuery(".room_rate .amount").eq(1).html());
			if (!jQuery(".ReservationDetailsValue").html())return;
			_mvq.push(["$logOrder", jQuery(".ReservationDetailsValue").html(), jQuery(".room_rate .amount").eq(1).html()]);
		}

		if (SessionBean["hotel"]) {
			_mvq.push(['$setGeneral', 'goodsdetail']);
			_mvq.push(["$addGoods", "", "", "", SessionBean["hotel"]]);
			_mvq.push(['$logData']);	
		}
		if (window.location.href.indexOf("showConfirmation") >= 0) {
			param.push("amount=" + jQuery(".room_rate .amount").eq(1).html());
			if (!jQuery(".ReservationDetailsValue").html())return;
			_mvq.push(["$logOrder", jQuery(".ReservationDetailsValue").html(), jQuery(".room_rate .amount").eq(1).html()]);
		}

		if (window.location.href.indexOf("availability") >= 0) {
			jq(".hotelInfoSec").bind("click", function () {
				id = jq(this).parent().parent().find("a.hotelImageLink img").attr("src").split("/")[6];
				_mvq.push(['$setGeneral', 'goodsdetail']);
				_mvq.push(["$addGoods", "", "", "", id]);
				_mvq.push(['$logData']);
			});
		}
	}
	
	if (param.length == 0) return;
	param = param.join("&")

	_mvq.push(['$logData', param]);	
};



var trackInterval = setInterval(function () {
		// try {track()}catch(e){};
		track();
	}, 1000);


})()