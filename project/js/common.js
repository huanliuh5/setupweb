//掌握的内容===这个内容会陪伴着你一直到你的职业生涯结束
//2016年-09月-13日 16:55:23
/*
 * getDate:功能是获取指定日期的时间
 * 参数:dt是一个时间对象
 * 返回值:字符串类型的指定格式的时间
 *
 *
 * */

function getDate(dt) {//dt是一个时间对象
    var year=dt.getFullYear();//获取年
    var month=dt.getMonth()+1;//获取月
    var day=dt.getDate();//获取日
    var hours=dt.getHours();//获取小时
    var minutes=dt.getMinutes();//获取分
    var seconds=dt.getSeconds();//获取秒
    //做小于10的处理
    month=month<10?"0"+month:month;
    day=day<10?"0"+day:day;
    hours=hours<10?"0"+hours:hours;
    minutes=minutes<10?"0"+minutes:minutes;
    seconds=seconds<10?"0"+seconds:seconds;
    return year+"年-"+month+"月-"+day+"日 "+hours+":"+minutes+":"+seconds;
}
//解决兼容性问题获取文本
//获取innerText或者是获取textContent
function getInnerText(element) {
    return element.innerText?element.innerText:element.textContent;
}
//设置innerText或者是设置textContent
function setInnerText(element,value) {
    if(element.innerText){
        element.innerText=value;
    }else{
        element.textContent=value;
    }
}
//解决兼容问题========获取伏击元素的第一个子元素、最后一个字元素、当前元素的前一个兄弟节点、后一个兄弟节点
//获取的是当前父级元素的第一个子元素
function getFirstElement(element) {
    if (element.firstElementChild) {
        return element.firstElementChild;
    } else {//浏览器不支持firstElementChild
        var node=element.firstChild;
        while(node&&nodeType!=1){//不是标签
            node=node.nextSibling;//当前子节点的下一个节点
        }
        return node;
    }
}
//获取的是当前父级元素的最后一个子元素
function getLastElement(element) {
    if (element.lastElementChild) {//浏览器支持这个属性则直接返回
        return element.lastElementChild;
    } else {
        var node = element.lastChild;
        while (node && node.nodeType != 1) {//这个j节点不是标签
            node = node.previousSibling;
        }
        return node;
    }
}
//获取当前元素的后一个兄弟节点
function getNextElement(element) {
    if (element.nextElementSibling) {//浏览器支持nextElementSibling
        return element.nextElementSibling;
    } else {
        var node = element.nextSibling;//不支持则返回nextSibling
        while (node && node.nodeType != 1) {
            node = node.nextSibling;
        }
        return node;
    }
}
//获取当前元素的前一个兄弟节点
function getPreviousElement(element) {
    if (element.previousElementSibling) {//浏览器支持previousElementSibling则直接返回
        return element.previousElementSibling;
    } else {
        var node = element.previousSibling;//不支持则返回previousSibling
        while (node && node.nodeType != 1) {
            node = node.previousSibling;
        }
        return node;
    }
}
//获取当前元素的兄弟节点
function getSiblingElement(element) {
    var elements = [];//保存当前元素的前面所有元素和后面所有元素
    var node = element.previousSibling;//当前元素的前一个兄弟节点
    while (node) {
        if (node.nodeType == 1) {//为元素节点则保存到elements中
            elements.push(node);
        }
        node =node.previousSibling;
    }
    node = element.nextSibling;
    while (node) {
        if (node.nodeType == 1) {//为元素节点则保存到elements中
            elements.push(node);
        }
        node = node.nextSibling;
    }
    return elements;
}





//封装匀速动画函数
function animate(element,target) {
    clearInterval(timeId);//清除计时器
    var timeId=setInterval(function () {
        var step=9;//每次移动的距离
        var current=element.offsetLeft;//元素的当前位置
        step=current<target?step:-step;//判断元素相对目标位置是在前还是在后
        current+=step;
        if(Math.abs(current-target)<Math.abs(step)){
            //清除计时器
            clearInterval(timeId);
            //设置元素的位置为目标位置
            element.style.left=target+"px";
        }else{
            element.style.left=current+"px";
        }

    },20)
}


//封装滚动条
function getScroll() {
    return {left: window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0,
        top:window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0
    };
}



//任意的元素可以获取任意的属性值
function getStyle(element,attr) {
    return element.currentStyle?element.currentStyle[attr]:
    window.getComputedStyle(element,null)[attr]||0;
}

//匀速动画
function animate(element, json, fn) {
    clearInterval(element.setId);
    element.setId = setInterval(function () {
        var flag = true;//假设当前位置和目标位置一致了
        for (var attr in json) {
            //判断层级和透明度
            if (attr == "opacity") {//透明度
                var current = getStyle(element, attr)*100||0;
                var target = json[attr]*100;
                var step = (target - current) / 10;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                current += step;
                element.style[attr] = current/100;
            } else if (attr == "zIndex") {//层级判断
                element.style[attr] = json[attr];
            } else {
                var current = parseInt(getStyle(element, attr))||0;
                var target = json[attr];
                var step = (target - current) / 10;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                current += step;
                element.style[attr] = current + "px";
            }
            if (current != target) {
                flag = false;
            }
            console.log("current" + current + ",target:" + target + ",step:" + step +
                ",attr:" + attr + "属性的值：" + json[attr]);
        }
        if (flag) {
            clearInterval(element.setId);
            if (fn) {//证明用户传入了一个函数
                fn();
            }
        }
    }, 20)
}


//封装可是区域和滚动区域坐标
var eventTools = {
    getEvt: function (e) {
        return e || window.event;
    },
    getClientX: function (e) {
        return this.getEvt(e).clientX;
    },
    getClientY: function (e) {
        return this.getEvt(e).clientY;
    },
    getPageX: function (e) {
        return this.getClientX(e) + (window.pageXOffset ||
            document.documentElement.scrollLeft ||
            document.body.scrollLeft || 0);
    },
    getPageY: function (e) {
        return this.getClientY(e) + (window.pageYOffset ||
            document.documentElement.scrollTop ||
            document.body.scrollTop || 0);
    }
};
//为同一个元素注册多个相同的事件的兼容代码
function addEventListener(element,eventName,fn) {
    if(element.addEventListener){//判断是否支持element.addEventListener
        element.addEventListener(eventName,fn,false);
    }else if(element.attachEvent){//判断是否支持element.attachEvent
        element.attachEvent("on"+eventName,fn);
    }else{//上面两种都不支持
        element["on"+eventName]=fn;
    }
}
//为同一个元素删除多个相同的事件的兼容代码
function removeEventListener(element, eventName, fn) {
    if (element.removeEventListener) {//判断是否支持element.removeEventListener
        element.removeEventListener(eventName, fn, false);
    } else if (element.detachEvent) {//判断是否支持element.detachEvent
        element.detachEvent("on" + eventName, fn);
    } else {//上面两种都不支持
        element["on" + eventName] = null;
    }
}/**
 * Created by huan on 2016/10/7.
 */
