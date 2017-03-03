/**/
var sdelay=0;
function returnTop() {
    window.scrollBy(0,-5);
    if(document.body.scrollTop>0) {
        sdelay= setTimeout('returnTop()',1);
    }
}
/*gouliang*/

document.getElementsByClassName("gouliang")[0].onclick=function(){
    returnTop();
};


/**/
