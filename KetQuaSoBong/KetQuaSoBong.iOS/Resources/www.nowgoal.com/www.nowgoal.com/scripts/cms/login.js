(function(w) {
    w.LOGIN = {
        containerid: "accountBox",
        loginBox: "/account/loginBox",
        signUpBox: "/account/signupBox",
        forgotPwdBox: "/account/forgotPwdBox"
    };

    LOGIN.submit = function() {

    }

    LOGIN.show = function(showType) {
        if (showType == 1) {
            document.onkeydown = function(e) {
                var e = event || window.event;
                if (e && e.keyCode == 13) {
                    login();
                }
            }
        } else {
            document.onkeydown = null;
        }
        if (LOGIN.checkLogin()) return;
        if ("#" + this.containerid) {
            $("#" + this.containerid).remove();
        }

        var temp = "";
        switch (showType) {
            case 1:
                temp = this.loginBox;
                break;
            case 2:
                temp = this.signUpBox;
                break;
            case 3:
                temp = this.forgotPwdBox;
                break;
            default:
                temp = "";
                break;
        }
        if (temp == "") return;

        var id = this.containerid;
        $.get(temp, function(box) {
            var container = $("<div></div>");
            container.attr("id", id);
            var mask = " <div id=\"popMask\" onclick=\"LOGIN.close()\"></div>";
            $("body").append(container.append(mask).append(box));
        })
    }

    LOGIN.close = function() {
        $("#" + this.containerid).remove();
    }

    LOGIN.checkLogin = function() {
        var uid = findCookie("UID");
        if (uid) return true;
        return false;
    }

    LOGIN.refreshIcon = function() {
        var icon = document.getElementById("userIcon");
        if (!LOGIN.checkLogin()) {
            var html = $("<span class=\"icon iconfont icon-font-username\"></span>");
            $(icon).html(html);
        } else {
            var ava = findCookie("ICON");
            var uid = findCookie("UID");
            var html = $("<span class=\"iconfont\" onclick=\"showAccountMenu()\"><img src=\"" + ava + "\"></img></span>");
            $(icon).html(html);
        }
    }

    LOGIN.logout = function() {
        if (findCookie("UID")) {
            delCookie("UID");
        }
        if (findCookie("ICON")) {
            delCookie("ICON");
        }
        if (findCookie("TOKENID")) {
            delCookie("TOKENID");
        }
    }

})(window);

function showPwd(type = 0) {
    if (type == 0) {
        var pwd = $("#pwd");
        var pwdEye = $("#pwdEye");
    } else {
        var pwd = $("#cpwd");
        var pwdEye = $("#cpwdEye");
    }

    if (pwdEye.hasClass('invisible')) {
        pwdEye.removeClass('icon-font-hide').addClass('icon-icon_help');
        pwdEye.removeClass('invisible').addClass('visible');
        pwd.prop('type', 'text');
    } else {
        pwdEye.removeClass('icon-icon_help').addClass('icon-font-hide');
        pwdEye.removeClass('visible').addClass('invisible');
        pwd.prop('type', 'password');
    }
}

function toSelectGame() {
    if (LOGIN.checkLogin()) {
        location.href = "/predictions/selectgame";
    } else {
        LOGIN.show(1);
    }
}

function showAccountMenu() {
    if ($("#languages").css("display") != "none") {
        switchLanguages(0);
    }
    if ($("#accountMenu").css("display") == "none") {
        $("#accountMenu").show();
        $("#userIcon").addClass("on");
        cancelBubble();
        $(document).one("click", function() {
            $("#accountMenu").hide();
            $("#userIcon").removeClass("on");
        })
    } else {
        $("#accountMenu").hide();
        $("#userIcon").removeClass("on");
    }
}

$(document).ready(function() {
    LOGIN.refreshIcon();
})