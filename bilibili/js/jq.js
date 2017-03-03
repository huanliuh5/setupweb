/**
 * Created by WK on 2016/10/8.
 */
$(function(){
    $(".ulmenu").children("li").mouseenter(function(){
        $(this).children(".youxi").stop().slideDown(500);
    });
    $(".ulmenu").children("li").mouseleave(function(){
        $(".youxi").stop().slideUp(500);
    });



    /*投稿*/
    $(".tougao").mouseenter(function(){
        $(".tougaoceng").stop().fadeIn();
    });
    $(".tougao").mouseleave(function(){
        $(".tougaoceng").stop().fadeOut();
    });

    /*手机 微信 新浪*/
    $(".phone").mouseenter(function(){
        $(this).children(".ewm").show();
        this.firstElementChild.style.backgroundPosition="-1025px -195px";
    });
    $(".phone").mouseleave(function(){
        $(this).children(".ewm").hide();
        this.firstElementChild.style.backgroundPosition="-1091px -195px";
    });
    $(".wechat").mouseenter(function(){
        $(this).children(".ewm").show();
        this.firstElementChild.style.backgroundPosition="-1025px -67px";
    });
    $(".wechat").mouseleave(function(){
        $(this).children(".ewm").hide();
        this.firstElementChild.style.backgroundPosition="-1091px -67px";
    });
    $(".xinlang").mouseenter(function(){
        $(this).children(".ewm").show();
        this.firstElementChild.style.backgroundPosition="-1025px -323px";
    });
    $(".xinlang").mouseleave(function(){
        $(this).children(".ewm").hide();
        this.firstElementChild.style.backgroundPosition="-1091px -323px";
    });


    /*左下角*/
    $(".block1").mouseenter(function(){
        $(".ftlo").stop().animate({"top":-33},500);
    });
    $(".block1").mouseleave(function(){
        $(".ftlo").stop().animate({"top":0},500);
    });
    /*漫画*/
    $("#danceP").children("li").mouseenter(function(){
        $(this).children(".pic-div").stop().animate({"top":90},600);
        $(this).children(".pic-div").children("span").stop().animate({"width":$(this).children(".pic-div")[0].offsetWidth},1000);
    });
    $("#danceP").children("li").mouseleave(function(){
        $(this).children(".pic-div").stop().animate({"top":150},800);
        $(this).children(".pic-div").children("span").stop().animate({"width":0},800);
    });


    /*logo*/
    $("h1").mouseenter(function(){
        var aa=$(this).children("a").children("img");
        aa.stop().animate({"width":110,"height":50},500,function(){
            aa.animate({"width":220,"height":105},500,function(){
                aa.animate({"width":110,"height":50},1000,function(){
                    aa.animate({"width":220,"height":105},1000);
                });
            });
        });
    });
    /*katong*/
    $(".all").children("a").mouseenter(function(){
        $(".img-r").show().children("img").siblings("img").hide();
        var ind=$(this).index();
        $(".img-r").children("img").eq(ind).show();
    });
    $(".all").children("a").mouseleave(function(){
        $(".img-r").hide();
    });


    $(".paihang1").children("li").mouseenter(function(){
        $(this).stop().animate({"height":95}).siblings("li").stop().animate({"height":25});
    });
    $(".paihang1").mouseleave(function(){
        $(this).children("li").stop().animate({"height":30});
    });


    /*search*/
    $(".btn").mouseenter(function(){
          $(this).removeClass("btn1").addClass("btn2");
    });
    $(".btn").mouseleave(function(){
        $(this).removeClass("btn2").addClass("btn1");
    });



/*xuanzhuan*/
    var config = [
        {
            width: 400,
            top: 120,
            left: 265,
            opacity: 1,
            zIndex: 4
        },//2
        {
            width: 300,
            top: 70,
            left: 640,
            opacity: 0.8,
            zIndex: 3
        },//3
        {
            width: 200,
            top: 20,
            left: 700,
            opacity: 0.2,
            zIndex: 2
        },//4
        {
            width: 200,
            top: 20,
            left: 50,
            opacity: 0.2,
            zIndex: 2
        },//0
        {
            width: 300,
            top: 70,
            left: 0,
            opacity: 0.8,
            zIndex: 3
        }//1
    ];
    var liss=document.getElementsByClassName("slide")[0].children;
    for(var i=0;i<liss.length;i++){
        $(liss[i]).animate(config[i]);
    }
    $(".slide").children("li").click(function(){
        console.log($(this).index());
        //for(var i=0;i<$(this).index();i++){
            config.push(config.shift());
        //config.pop(config.unshift());
        //}

        //$(this).animate(config[$(this).index()]);
        $(this).stop().animate(config[$(this).index()]);
        $(this).siblings("li").eq(0).stop().animate(config[$(this).siblings("li").eq(0).index()]);
        $(this).siblings("li").eq(1).stop().animate(config[$(this).siblings("li").eq(1).index()]);
        $(this).siblings("li").eq(2).stop().animate(config[$(this).siblings("li").eq(2).index()]);
        $(this).siblings("li").eq(3).stop().animate(config[$(this).siblings("li").eq(3).index()]);
        $(this).siblings("li").eq(4).stop().animate(config[$(this).siblings("li").eq(4).index()]);
        $(this).siblings("li").eq(5).stop().animate(config[$(this).siblings("li").eq(5).index()]);

    });

/*shouhui*/
    $(".shouhui ul li").mouseenter(function(){
        console.log(this.offsetTop);
        $(".aixin").css("top",this.offsetTop+this.offsetHeight/2-20);
        $(".aixin").css("left",this.offsetLeft+this.offsetWidth/2-20);
    });
    //$(".shouhui ul li").mouseleave(function(){
    //    $(".aixin").hide();
    //});
    $(".shouhui li").mouseenter(function(){
        $(this).children("div").show().end().siblings("li").children("div").hide();
    });
    $(".shouhui").mouseleave(function(){
        $(this).children("ul").children("li").children("div").hide();
    });
    $(".shouhui ul li div").click(function(){

        var i=$(this).children("span").text();
        i++;
        $(this).children("span").text(i);

    });
    $(".shouhui ul li").click(function(){
        $(".aixin").show();
        $(".aixin").css("opacity",1);
        $(".aixin").css("top",this.offsetTop+this.offsetHeight/2-20);
        $(".aixin").css("left",this.offsetLeft+this.offsetWidth/2-20);
        $(".aixin").stop().animate({"top":0,"opacity":0},1000);
        //$(".aixin").animate({},1000);
        //$(".aixin").css("left",this.offsetLeft+this.offsetWidth/2);
    });

});