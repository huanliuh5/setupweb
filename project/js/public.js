/**
 * Created by huan on 2016/10/8.
 */
//�������Ʒ�ƣ������صĲ���ʾ
function my(id) {
    return document.getElementById(id);
}

my("roseonly_map").onmouseover=function(){
    my("roseonly_map_list").style.display="block";
    my("roseonly_map").style.backgroundColor="rgb(217,217,217)";
    my("roseonly_map").style.width="171px";

};
my("roseonly_map").onmouseout=function(){
    my("roseonly_map_list").style.display="none";
    my("roseonly_map").style.backgroundColor="rgb(242,242,242)";
    my("roseonly_map").style.width="170px";
};



