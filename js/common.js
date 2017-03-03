
function getStyle(element,attr){
    return element.currentStyle?element.currentStyle[attr]:window.getComputedStyle(element,null)[attr];
}
function animateasy(element,json,fn) {
    clearInterval(element.setId);
    element.setId=setInterval(function () {
        var flag=true;//假设当前位置和目标位置一致了
        for(var attr in json){
            if(attr=="opacity"){//透明度
                //opacity:0,0.1,0.2,0.3------1
                var current=getStyle(element,attr)*100||0;
                var target=json[attr]*100;
                var step=(target-current)/10;//如果是目标小于当前,step的值是负数
                step=step>0?Math.ceil(step):Math.floor(step);
                current+=step;
                element.style[attr]=current/100;
            }else if(attr=="zIndex"){//层级判断
                element.style[attr]=json[attr];
            }else{//正常的属性
                var current=parseInt(getStyle(element,attr))||0;
                var target=json[attr];
                var step=(target-current)/10;//如果是目标小于当前,step的值是负数
                step=step>0?Math.ceil(step):Math.floor(step);
                current+=step;
                element.style[attr]=current+"px";
            }
            if(current!=target){
                flag=false;
            }// end if
        }// end for
        if(flag){//如果当前位置和目标位置一致则清理计时器
            clearInterval(element.setId);
            if(fn){//证明用户传入了一个函数
                fn();
            }// end if
        }// end if
        // console.log("current:"+current+",target:"+target+",step:"+step+",attr:"+attr+"属性的值:"+json[attr]);
    },15);
}

function getRandomColor(){   //封装函数
    var str="#";   //定义一个字符串接收 最后返回的16进制数
    var arr=["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"];  //定义一个含有所有会用到的16进制数里面的字符
    for(i=0;i<6;i++){   //for循环6次 添加16进制数#后面的6个随机字符
        var random=arr[parseInt(Math.random()*16)];    //随机产生一个上边数组中的一个字符
        str+=random;   //添加到定义的字符串中去
    }
    return str;   //最后循环结束 返回这个字符串 就是随机生成的16进制字符串
}