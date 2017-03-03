/**
 * Created by Administrator on 2016/10/8 0008.
 */
jQuery(document).ready(function () {//入口函数
    //中间部分
    $(".content_m").find("a").mouseenter(function () {//给每个图片设置鼠标进入事件
        $(this).css("opacity", 1).siblings("a").css("opacity", 0.5);//鼠标进入的图片透明度为1，其他为0.5
        $(".content_m").mouseleave(function () {
            $(this).find("a").css("opacity", 0.5);
        });//鼠标离开让所有图片透明度为0.5
    });
    //下边弹跳广告栏部分
    $("#close_btn").click(function () {//点击关闭按钮隐藏对话框
        // alert("啦啦啦");

        $(this).parent(".lutitle").parent(".luBanner").stop().animate({"height": 30}, 700, function () {
            $("#close_btn").hide();
            $(".lu_msg").hide();
        });
        //$(this).parents(".lutitle").siblings(".lu_msg").fadeOut(500);
    });
    //点击留言栏显示对话框
    $(".lutitle").mouseenter(function () {

        $(".lutitle").parent(".luBanner").stop().animate({"height": 250}, 1000);
        $(this).siblings(".lu_msg").show();
        $("#close_btn").show();
    });

    // 二维码的移动
    setInterval(function () {
        $("#ewm_light").animate({"top": 172},1000, function () {
            $(this).animate({"top": 65}, 1000)
        })
    }, 2000);
});