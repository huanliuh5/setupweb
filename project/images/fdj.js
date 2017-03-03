function showPic(obj){		
		var m=$(obj).attr("path");
		$("#pi").attr("src",m);	
		var g=$(document).scrollTop();		 
		var w=$("#preview").width();
		var h=$("#preview").height();
		var l=($(window).width()-w)/2;
		var t=($(window).height()-h)/2+g;		
		$("#preview").css("top",t).css("left",l).fadeIn("fast")
}
function closeShow(obj){
		$("#preview").hide();
}