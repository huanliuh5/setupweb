  //jumpChar==========Begin
    var jumps = document.getElementsByClassName("jumpChar");
    for (var i = 0; i < jumps.length; i++) {
        jumps[i].style.marginLeft = 18 * i + "px"
        jumps[i].index = i;
        jumps[i].onmouseover = function () {
            var that = this.index;
            animateasy(jumps[that], {top: -30}, function () {
                animateasy(jumps[that], {top: 0}, function () {
                    animateasy(jumps[that], {top: -5}, function () {
                        animateasy(jumps[that], {top: 0})
                    })
                })
            })
        }
    }
    //jumpChar==========End
    //humBtn==========begin
    var $humBtn = $(".humBtn")
    $humBtn.hover(function () {
                $(this).next().fadeIn(300);
                document.body.style.overflow = "hidden";
                $(".topHover").fadeIn(300);
            },
            function () {
                $(this).next().fadeOut(300);
                document.body.style.overflowY = "auto";
                $(".topHover").fadeOut(300);
            }
    )
    //element===========begin=======================
    var $topTips = $(".topTips");
    var $ele = $(".ele");
    var $open = $(".open");
    $topTips.hover(function () {
        $ele.hide();//*************************************************
        $open.addClass("current");
    }, function () {
        $(this).add($ele);
        $ele.show();//**************************************************
        $open.removeClass("current");
    })
    //subBlack=========================begin
    var index=0;
    $(".subli").hover(function () {
        index=$(this).index()
        $(this).css("background", "url(images/" + (index + 1) + ".jpg) no-repeat");
        $(".bgc").eq(index).stop().fadeIn(400)
        $(".text").eq(index).find(".date").addClass("fontBig").siblings().addClass("current2");
        animateasy( $(".text")[index],{top:280})
    }, function () {
        $(this).css("backgroundImage", "")
        $(".text").eq(index).find(".date").removeClass("fontBig").siblings().removeClass("current2");
        $(".bgc").eq(index).toggle()
        animateasy( $(".text")[index],{top:150})
    })
    //close ritfdd===============================
   var $closefdd=$(".ritopen");
    var fddlis=document.getElementsByClassName("ritfdd")[0].getElementsByTagName("li");
    var $fddlis=$(fddlis)
    $closefdd.click(function(){
        if($(this).hasClass("close")){
            $(this).removeClass("close").find("s").html("打开");
            $fddlis.hide();
        }else{
            $(this).addClass("close").find("s").html("隐藏");
            $fddlis.show();
        }
    })
//    slider====begin===================================================
    var count;//图片列表长度
    var slitimer = null;
    var pic = 0;
    var dis = 0;
    count = $(".slider li").length;
    $(".slider li:not(:first-child)").hide();
    $(".arrow span").click(function () {
        var i = $(this).text() - 1;
        if (dis == i) {
            return;
        }
        pic = i;
        $(".slider li").filter(":visible").fadeOut(1200).parent().children().eq(i).fadeIn(1500);
        $(this).toggleClass("on");
        $(this).siblings().removeAttr("class");
        dis = i;
    })
    slitimer = setInterval(autoplay, 3000);
    $(".slider").hover(function () {
        clearInterval(slitimer);
    }, function () {
        clearInterval(slitimer);
        slitimer = setInterval(autoplay, 3000);
    })
    function autoplay() {
        pic++;
        pic = pic > (count - 1) ? 0 :pic;
        $(".arrow span").eq(pic).trigger("click");
    }
    $(".prenex .next").click(function(){
        autoplay();
    })
    $(".prenex .pre").click(function(){
        pic--;
        pic = pic < (0) ? count -1 : pic;
        $(".arrow span").eq(pic).trigger("click");
    })
    $(".prenex .next").hover(function(){
        $(this).animate({width:105,right:0},80)
    },function(){
        $(this).animate({width:60,right:45},80)
    })

    $(".prenex .pre").hover(function(){
        $(this).animate({width:105,left:0},80)
    },function(){
        $(this).animate({width:60,left:45},80)
    })
    window.onscroll=function(){
        if(getScroll().top>800&&getScroll().top<1300){
            $(".ritopen").fadeOut(300).next().fadeOut(300);
        }else{
            $(".ritopen").fadeIn(300).next().fadeIn(300);
        }
    }
    function getScroll() {
        return   {
            left: window.pageXOffset||document.documentElement.scrollLeft||document.body.scrollLeft||0,
            top: window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0
        };
    }
    //jumpList=================begin==============================================
    $(".jumpList .textbox").hover(function(){
        $(this).find(".t").stop().animate({left:-25},400)
                .next().stop().animate({bottom:-25},400)
                .next().stop().animate({bottom:25},400)
                .next().stop().animate({left:25},400)
        $(this).find(".ch").stop().animate({marginRight:25},400).next().stop().animate({marginLeft:25},400)
    },function(){
        $(this).find(".t").stop().animate({left:0},400)
                .next().stop().animate({bottom:0},400)
                .next().stop().animate({bottom:0},400)
                .next().stop().animate({left:0},400)
        $(this).find(".ch").stop().animate({marginRight:0},400).next().stop().animate({marginLeft:0},400)
    })
    var navboxs=document.getElementsByClassName("navbox");
    for (var i=0; i<navboxs.length;i++) {
        navboxs[i].style.background="url(images/nav"+(i+1)+".png) no-repeat 0 0"
    }
    $(".buff li").mouseenter(function(){
        var index=$(this).index()
        if(index==0){
            $(this).find(".navbox").css("background","url(images/nav"+(index+1)+".png) no-repeat 0 -121px").stop().animate({top:-15},300)
        }else if(index<3){
            $(this).find(".navbox").css("background","url(images/nav"+(index+1)+".png) no-repeat 0 -120px").stop().animate({top:-15},300)
        }else{
            $(this).find(".navbox").css("background","url(images/nav"+(index+2)+".png) no-repeat 0 0").stop().animate({top:-15},300)
        }
    })
    $(".buff li").mouseleave(function(){
        var index=$(this).index()
        if(index==0){
            $(this).find(".navbox").css("background","url(images/nav"+(index+1)+".png) no-repeat 0 0").stop().animate({top:0},50,function(){
                $(this). animate({top:-7},50,function(){
                    $(this). animate({top:0},50,function(){
                        $(this).animate({top:-5},50,function(){
                            $(this).animate({top:0},50,function(){
                                $(this).animate({top:-3},50,function(){
                                    $(this).animate({top:0},50)
                                })
                            })
                        })
                    })
                })
            })
        }else if(index<3){
            $(this).find(".navbox").css("background","url(images/nav"+(index+1)+".png) no-repeat 0 0").stop().animate({top:0},50,function(){
                $(this). animate({top:-7},50,function(){
                    $(this). animate({top:0},50,function(){
                        $(this).animate({top:-5},50,function(){
                            $(this).animate({top:0},50,function(){
                                $(this).animate({top:-3},50,function(){
                                    $(this).animate({top:0},50)
                                })
                            })
                        })
                    })
                })
            })
        }else{
            $(this).find(".navbox").css("background","url(images/nav"+(index+1)+".png) no-repeat 0 0").stop().animate({top:0},50,function(){
                $(this). animate({top:-7},50,function(){
                    $(this). animate({top:0},50,function(){
                        $(this).animate({top:-5},50,function(){
                            $(this).animate({top:0},50,function(){
                                $(this).animate({top:-3},50,function(){
                                    $(this).animate({top:0},50)
                                })
                            })
                        })
                    })
                })
            })
        }
    })
    var WordDemoHandler={
        DemoOne:function(){
            document.body.style.overflow = "hidden";
            var marginLeft=230;
            for(var i=0;i<$(".demoone").children().length;i++){
                var target=$($(".demoone").children()[i]);
                target.animate({marginLeft:marginLeft+"px",opacity:1},300+i*300);
                marginLeft+=target.width();
            }
        },
        Demotwo:function(){
            var marginLeft=430;
            for(var i=0;i<$(".demotwo").children().length;i++){
//                console.log($(".demotwo").children().length)
                var target=$($(".demotwo").children()[i]);
                target.animate({marginLeft:marginLeft+"px",opacity:1},300+i*300,function(){
                    if(i>17){
//                   alert(1)
                        setTimeout("$('.loading').fadeOut(1000)",4000)
                        setTimeout(function(){
                            document.body.style.overflowY = "auto";
                        },4000)
                    }
                });
                marginLeft+=target.width();

            }
        }
    }
    WordDemoHandler.DemoOne();
    setTimeout("WordDemoHandler.Demotwo()",3000)

