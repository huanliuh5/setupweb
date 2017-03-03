/**
 * Created by huan on 2016/10/8.
 */
    //设置导航栏的特效
function my(id) {
    return document.getElementById(id);
}
my("topmenu_1").onmouseover=function(){
    my("menus2").style.display="block";
};
my("menus1").onmouseout=function(){
    my("menus2").style.display="";
};

my("topmenu_2").onmouseover=function(){
    my("menus2").style.display="block";
};
my("menus2").onmouseout=function(){
    my("menus2").style.display="";
};
my("topmenu_3").onmouseover=function(){
    my("menus3").style.display="block";
};
my("menus3").onmouseout=function(){
    my("menus3").style.display="";
};
my("topmenu_4").onmouseover=function(){
    my("menus4").style.display="block";
};
my("menus4").onmouseout=function(){
    my("menus4").style.display="";
};
my("topmenu_5").onmouseover=function(){
    my("menus5").style.display="block";
};
my("menus5").onmouseout=function(){
    my("menus5").style.display="";
};
