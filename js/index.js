/**
 * Created by Administrator on 2016/10/7 0007.
 */

window.onload = function () {
//正则验证姓名和电话
//验证姓名
    var luNameReg = /^[\u4e00-\u9fa5]{2,6}$/;
    var luName = document.getElementById("luName");

    luName.onblur = function () {
        // alert("lalal");
        if ($(this).val().length === 0) {
            this.nextElementSibling.innerHTML = "";
            this.nextElementSibling.removeAttribute("class", "lu_current");
            return;
        }
        if (luNameReg.test(this.value)) {
            this.nextElementSibling.innerHTML = "∨";
            this.nextElementSibling.setAttribute("class", "lu_current");
        } else {
            this.nextElementSibling.innerHTML = "×";
            this.nextElementSibling.setAttribute("class", "lu_current_fal");
        }
    };
    //验证电话号码
    var luPhoneReg = /0?(13|14|15|18)[0-9]{9}/;
    var luPhone = document.getElementById("luPhone");
    luPhone.onblur = function () {
        if ($(this).val().length === 0) {
            this.nextElementSibling.innerHTML = "";
            this.nextElementSibling.removeAttribute("class", "lu_current_phfal");
            return;
        }
        if (luPhoneReg.test(this.value)) {
            this.nextElementSibling.innerHTML = "∨";
            this.nextElementSibling.setAttribute("class", "lu_current_ph");
        } else {
            this.nextElementSibling.innerHTML = "×";
            this.nextElementSibling.setAttribute("class", "lu_current_phfal");
        }

    };
};