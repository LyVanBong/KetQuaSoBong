(function(w) {
    bomHelper.switchDark();
    bomHelper.switchResponsive();
    bomHelper.switchOpenNew();
    if (w.$)
        $(function() {
            if (!$(".right").is(":hidden")) {
                $(".right img").lazyload();
            }
            try {
                $("#switchPc img").lazyload();
                $("#switchMobile img").lazyload();
            } catch {

            }
        });
    if (w.$)
        $(window).resize(function() {
            bomHelper.switcShow();
            if (typeof(resizeList) == "function") {
                resizeList();
            }
            if (typeof(loadScroller) == "function") {
                loadScroller();
            }
            if (typeof(reSizePlayerList) == "function") {
                reSizePlayerList();
            }
            if (typeof(showMatchList) == "function") {
                showMatchList(10);
            }
            if (typeof(isShowNewsTime) == "function") {
                isShowNewsTime();
            }
            if (typeof(addOrRemoveRemark) == "function") {
                addOrRemoveRemark();
            }
            if (typeof(initGroup) == "function") {
                initGroup();
            }
            if (typeof(showStandingsTable) == "function") {
                showStandingsTable();
            }
            if (typeof(showRight) == "function") {
                showRight();
            }
            if (typeof(showScoreRight) == "function") {
                showScoreRight();
            }
        });
    if (w.$)
        $(function() {
            $("#searchlayer").click(function() {
                cancelBubble();
            });
            $("#btnSearch").click(function() {
                cancelBubble();
            });
            if (window.toggleBallType)
                $("#ballTypeNav").click(function() {
                    if (window.innerWidth >= 710) return;
                    toggleBallType();
                    $("#ballTypeNavBtn").removeClass("close").addClass("icon iconfont icon-font-class");
                    switchLanguages(0);
                    if ($(this).hasClass("on")) {
                        $(document).one("click", function() {
                            $("#ballTypeNavBtn").removeClass("close").addClass("icon iconfont icon-font-class");
                            toggleBallType(1);
                        });
                        $("#ballTypeNavBtn").removeClass("icon iconfont icon-font-class").addClass("close");
                    }
                });

            $("#switchLanguages").click(function() {
                if ($("#languages").is(":hidden")) {
                    switchLanguages(1);
                    if ($("#languages").hasClass("ddl")) {
                        $(document).one("click", function() {
                            switchLanguages(0);
                        });
                    }
                    $("#languages img").lazyload();
                } else {
                    switchLanguages(0);
                }
            });

            addHandler(document.querySelector(".webdesc .showALL"), "click", function() {
                var thisObj = this;
                var wObj = thisObj.parentNode;
                wObj.style["height"] = "auto";
                thisObj.style["display"] = "none";
            });
            (function() {
                if ($("#ballTypeNav").length < 1)
                    return;
                /*var cookie_sport = "sportType";
                var SportType = parseInt(findCookie(cookie_sport) || 0);
                $("#ballTypeNav .btn").on("click", function () {
                    var thisObj = $(this);
                    var liObj = thisObj.parents("li");
                    var ulObj = liObj.parent();
                    var onStr = "on";
                    var tmp = liObj.hasClass("football") ? 0 : thisObj.parents("li").hasClass("basketball") ? 1 : thisObj.parents("li").hasClass("esports") ? 2 : thisObj.parents("li").hasClass("baseball") ? 3 : 4;
                    if (tmp != SportType) {
                        $("#ballTypeNav .btn." + onStr).removeClass(onStr);
                        SportType = tmp;
                        writeCookie(cookie_sport, SportType);
                    }
                    if (!thisObj.hasClass(onStr)) {
                        thisObj.addClass(onStr);
                        var first_li = ulObj.children('li:first');
                        first_li.before(liObj);
                    }
                    return false;
                });
                $("#ballTypeNav ." + (SportType == 0 ? "football" : SportType == 1 ? "basketball" : SportType == 2 ? "esports" : SportType == 3 ? "baseball":"football") + " .btn").trigger("click");*/
                $.ajax({
                    type: "Get",
                    contentType: "text/plain",
                    url: "/gf/data/foreignindexmatchcount.txt?v=" + Math.random(),
                    dataType: "text",
                    success: function(data) {
                        var spArr = data.split('!');
                        for (var i = 0; i < spArr.length; i++) {
                            var arr = spArr[i].split('^');
                            var ball = "";
                            switch (arr[0]) {
                                case "2":
                                    ball = "baseball";
                                    break;
                                case "100":
                                    ball = "football";
                                    break;
                                case "101":
                                    ball = "basketball";
                                    break;
                                default:
                                    ball = "";
                                    break;
                            }
                            if (ball) {
                                var btnObj = $("#ballTypeNav ." + ball + " .btn");
                                if (btnObj.length)
                                    btnObj.before('<span class="count">' + arr[1] + '</span>');
                            }
                        }
                    }
                });
                var esBtnObj = $("#ballTypeNav .esports .btn");
                if (esBtnObj.length)
                    $.get("/Esports/GetMatchsCount", {
                            "path": "/esgame/matchlist.txt",
                            "orderBy": "byTime"
                        },
                        function(result) {
                            if (result != null) {
                                esBtnObj.before('<span class="count">' + result + '</span>')
                            }
                        }, "json");
            })();
        });
})(window);



var _wait = 0;
var rtDom = document.getElementById("autoHidd");

function timeToHide() {
    if (_wait > 3) {
        rtDom.style.display = "none";
    } else {
        rtDom.style.display = window.scrollY > window.innerHeight / 3 ? "" : "none";;
    }
    _wait++;
}

function clearTime() {
    _wait = 0;
    rtDom.style.display = window.scrollY > window.innerHeight / 3 ? "" : "none";
}
document.addEventListener("DOMContentLoaded", function(e) {
    if (document.querySelector("a.back"))
        (function(selector) {
            if (!selector) return;
            var cbox = document.querySelectorAll(selector);
            for (var i = 0; i < cbox.length; i++) {
                var url = cbox[i].getAttribute("href")
                if (!!url) {
                    cbox[i].addEventListener("click", function(e) {
                        var url = this.getAttribute("href");
                        e.stopPropagation();
                        e.preventDefault();
                        location.replace(url);
                        //return false;
                    }, false);
                }
            }
        }(".peerBox a,a.peer"));

    var topDom = document.querySelector(".icon-font-open-on");
    if (topDom) {
        var cHeight = document.body.clientHeight;
        if (topDom.parentNode.children.length == 1) //Ios Bug
            topDom = topDom.parentNode;
        var func = function(e) {
            topDom.style.display = window.scrollY > window.innerHeight / 3 ? "" : "none";
        };
        func();
        window.addEventListener('scroll', func);
    }

    if (rtDom) {
        setInterval("timeToHide()", 1000);
        document.addEventListener('mousemove', clearTime);
        document.addEventListener('touchstart', clearTime);
    }
}, false);

function switchResponsive(t) {
    writeCookie("isResponsive", t);
    bomHelper.switchResponsive();
}

function toggleBallType(opt) {
    var cookie_sport = "sportType";
    var SportType = parseInt(findCookie(cookie_sport) || 0);
    cancelBubble();
    if (opt) {
        if (hasClass(_$("ballTypeNav"), "on"))
            removeClass(_$("ballTypeNav"), "on");
    } else {
        if (window.innerWidth >= 710) return;
        if (hasClass(_$("ballTypeNav"), "on")) {
            $("#ballTypeNavBtn").removeClass("close").addClass("icon iconfont icon-font-class");
            removeClass(_$("ballTypeNav"), "on");
        } else {
            $("#ballTypeNavBtn").removeClass("icon iconfont icon-font-class").addClass("close");
            addClass(_$("ballTypeNav"), "on");
        }
    }
}

function switchLanguages(opt) {
    if ($("#accountMenu")) {
        $("#userIcon").removeClass("on");
        $("#accountMenu").hide();
    }
    var tar = $("#languages");
    var o = $("#switchLanguages")
    if (opt) {
        tar.show();
        $(o).find("i").addClass("up");
        $(o).addClass("on");
        if (window.toggleBallType) {
            $("#ballTypeNavBtn").removeClass("close").addClass("icon iconfont icon-font-class");
            toggleBallType(1);
        }
    } else {
        tar.hide();
        $(o).find("i").removeClass("up");
        $(o).removeClass("on");
    }
}

function showCountDefer() {

}
//各板块比分类页面
function showScoreRight() {
    if (window.innerWidth < 710) {
        $('#scoreRight').attr("style", "display:none");
    } else {
        $('#scoreRight').attr("style", "display:block");
    }
}