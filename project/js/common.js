//���յ�����===������ݻ��������һֱ�����ְҵ���Ľ���
//2016��-09��-13�� 16:55:23
/*
 * getDate:�����ǻ�ȡָ�����ڵ�ʱ��
 * ����:dt��һ��ʱ�����
 * ����ֵ:�ַ������͵�ָ����ʽ��ʱ��
 *
 *
 * */

function getDate(dt) {//dt��һ��ʱ�����
    var year=dt.getFullYear();//��ȡ��
    var month=dt.getMonth()+1;//��ȡ��
    var day=dt.getDate();//��ȡ��
    var hours=dt.getHours();//��ȡСʱ
    var minutes=dt.getMinutes();//��ȡ��
    var seconds=dt.getSeconds();//��ȡ��
    //��С��10�Ĵ���
    month=month<10?"0"+month:month;
    day=day<10?"0"+day:day;
    hours=hours<10?"0"+hours:hours;
    minutes=minutes<10?"0"+minutes:minutes;
    seconds=seconds<10?"0"+seconds:seconds;
    return year+"��-"+month+"��-"+day+"�� "+hours+":"+minutes+":"+seconds;
}
//��������������ȡ�ı�
//��ȡinnerText�����ǻ�ȡtextContent
function getInnerText(element) {
    return element.innerText?element.innerText:element.textContent;
}
//����innerText����������textContent
function setInnerText(element,value) {
    if(element.innerText){
        element.innerText=value;
    }else{
        element.textContent=value;
    }
}
//�����������========��ȡ����Ԫ�صĵ�һ����Ԫ�ء����һ����Ԫ�ء���ǰԪ�ص�ǰһ���ֵܽڵ㡢��һ���ֵܽڵ�
//��ȡ���ǵ�ǰ����Ԫ�صĵ�һ����Ԫ��
function getFirstElement(element) {
    if (element.firstElementChild) {
        return element.firstElementChild;
    } else {//�������֧��firstElementChild
        var node=element.firstChild;
        while(node&&nodeType!=1){//���Ǳ�ǩ
            node=node.nextSibling;//��ǰ�ӽڵ����һ���ڵ�
        }
        return node;
    }
}
//��ȡ���ǵ�ǰ����Ԫ�ص����һ����Ԫ��
function getLastElement(element) {
    if (element.lastElementChild) {//�����֧�����������ֱ�ӷ���
        return element.lastElementChild;
    } else {
        var node = element.lastChild;
        while (node && node.nodeType != 1) {//���j�ڵ㲻�Ǳ�ǩ
            node = node.previousSibling;
        }
        return node;
    }
}
//��ȡ��ǰԪ�صĺ�һ���ֵܽڵ�
function getNextElement(element) {
    if (element.nextElementSibling) {//�����֧��nextElementSibling
        return element.nextElementSibling;
    } else {
        var node = element.nextSibling;//��֧���򷵻�nextSibling
        while (node && node.nodeType != 1) {
            node = node.nextSibling;
        }
        return node;
    }
}
//��ȡ��ǰԪ�ص�ǰһ���ֵܽڵ�
function getPreviousElement(element) {
    if (element.previousElementSibling) {//�����֧��previousElementSibling��ֱ�ӷ���
        return element.previousElementSibling;
    } else {
        var node = element.previousSibling;//��֧���򷵻�previousSibling
        while (node && node.nodeType != 1) {
            node = node.previousSibling;
        }
        return node;
    }
}
//��ȡ��ǰԪ�ص��ֵܽڵ�
function getSiblingElement(element) {
    var elements = [];//���浱ǰԪ�ص�ǰ������Ԫ�غͺ�������Ԫ��
    var node = element.previousSibling;//��ǰԪ�ص�ǰһ���ֵܽڵ�
    while (node) {
        if (node.nodeType == 1) {//ΪԪ�ؽڵ��򱣴浽elements��
            elements.push(node);
        }
        node =node.previousSibling;
    }
    node = element.nextSibling;
    while (node) {
        if (node.nodeType == 1) {//ΪԪ�ؽڵ��򱣴浽elements��
            elements.push(node);
        }
        node = node.nextSibling;
    }
    return elements;
}





//��װ���ٶ�������
function animate(element,target) {
    clearInterval(timeId);//�����ʱ��
    var timeId=setInterval(function () {
        var step=9;//ÿ���ƶ��ľ���
        var current=element.offsetLeft;//Ԫ�صĵ�ǰλ��
        step=current<target?step:-step;//�ж�Ԫ�����Ŀ��λ������ǰ�����ں�
        current+=step;
        if(Math.abs(current-target)<Math.abs(step)){
            //�����ʱ��
            clearInterval(timeId);
            //����Ԫ�ص�λ��ΪĿ��λ��
            element.style.left=target+"px";
        }else{
            element.style.left=current+"px";
        }

    },20)
}


//��װ������
function getScroll() {
    return {left: window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0,
        top:window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0
    };
}



//�����Ԫ�ؿ��Ի�ȡ���������ֵ
function getStyle(element,attr) {
    return element.currentStyle?element.currentStyle[attr]:
    window.getComputedStyle(element,null)[attr]||0;
}

//���ٶ���
function animate(element, json, fn) {
    clearInterval(element.setId);
    element.setId = setInterval(function () {
        var flag = true;//���赱ǰλ�ú�Ŀ��λ��һ����
        for (var attr in json) {
            //�жϲ㼶��͸����
            if (attr == "opacity") {//͸����
                var current = getStyle(element, attr)*100||0;
                var target = json[attr]*100;
                var step = (target - current) / 10;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                current += step;
                element.style[attr] = current/100;
            } else if (attr == "zIndex") {//�㼶�ж�
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
                ",attr:" + attr + "���Ե�ֵ��" + json[attr]);
        }
        if (flag) {
            clearInterval(element.setId);
            if (fn) {//֤���û�������һ������
                fn();
            }
        }
    }, 20)
}


//��װ��������͹�����������
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
//Ϊͬһ��Ԫ��ע������ͬ���¼��ļ��ݴ���
function addEventListener(element,eventName,fn) {
    if(element.addEventListener){//�ж��Ƿ�֧��element.addEventListener
        element.addEventListener(eventName,fn,false);
    }else if(element.attachEvent){//�ж��Ƿ�֧��element.attachEvent
        element.attachEvent("on"+eventName,fn);
    }else{//�������ֶ���֧��
        element["on"+eventName]=fn;
    }
}
//Ϊͬһ��Ԫ��ɾ�������ͬ���¼��ļ��ݴ���
function removeEventListener(element, eventName, fn) {
    if (element.removeEventListener) {//�ж��Ƿ�֧��element.removeEventListener
        element.removeEventListener(eventName, fn, false);
    } else if (element.detachEvent) {//�ж��Ƿ�֧��element.detachEvent
        element.detachEvent("on" + eventName, fn);
    } else {//�������ֶ���֧��
        element["on" + eventName] = null;
    }
}/**
 * Created by huan on 2016/10/7.
 */
