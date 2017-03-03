/**
 * Created by roseonly on 2015/11/3.
 */

$(function () {
    $.fn.roseonlyTime = function (options) {
        var _this = $(this);
        var flag = true;
        //补充属性
        var settings = {
            url: '',
            f_class: '',
            a_class: '',
            text: '',
            last_text:'',
            suffix: '秒',
            a_time: 60,
            callback: ''
        }
        $.extend(settings, options);

        function init() {
            //发送请求
            start();
            //var id =_this.attr('id');
            var stime = setInterval(function () {
                //倒计时
                settings.a_time--;
                //显示时间
                _this.text(settings.text + settings.a_time + settings.suffix);
                //时间结束
                if (settings.a_time == 0) {
                    clearInterval(stime);
                    _this.html(settings.last_text);
                    _this.removeClass(settings.a_class).addClass(settings.f_class);
                    settings.callback();
                }
            }, 1000);
        }

        function start() {
            //发送请求
            if (settings.url !== '') {
                $.post(settings.url,function(data){
                });
            }
            //切换样式
            if (settings.a_class !== '') {
                _this.removeClass(settings.f_class).addClass(settings.a_class);
            }
            //显示时间
            _this.text(settings.text + settings.a_time + settings.suffix);
        }

        init();
    }
});