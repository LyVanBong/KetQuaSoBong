var _ = {};
var _isdebug = 0;
var ShowAd = true;
var _language = 0; //0:ng,1:th,2:vn,3:bola
var _adNoFollow = 0;

function traceError() {
    window.onerror = function(message, url, line, column, error) {
        alert('traceError:' + "msg:" + message + "line:" + line);
    }
}

if (location.href.indexOf('debug') != -1 || _isdebug) {
    _isdebug = 1;
    traceError();
}

function extend(org, ex, b) {
    //b: 0: replace org prop, 1: not replace org prop
    if (org && ex) {
        for (var k in ex) {
            if (!b || !org.hasOwnProperty(k)) {
                org[k] = ex[k];
            }
        }
    }
    return org;
}

//普通字符转换成转意符
function html2Escape(sHtml) {
    return sHtml.replace(/[<>&"]/g, function(c) {
        return {
            '<': '&lt;',
            '>': '&gt;',
            '&': '&amp;',
            '"': '&quot;'
        }[c];
    });
}
//转意符换成普通字符
function escape2Html(str) {
    var arrEntities = {
        'lt': '<',
        'gt': '>',
        'nbsp': ' ',
        'amp': '&',
        'quot': '"'
    };
    return str.replace(/&(lt|gt|nbsp|amp|quot);/ig, function(all, t) {
        return arrEntities[t];
    });
}

function BomHelper() {
    this.ie = "";
    this.firefox = "";
    this.chrome = "";
    this.opera = "";
    this.safari = "";
    this.operaMini = "";
    this.uc = "";
    this.ios = "";
    this.android = {};
    this.pc = "";
    this.kv = function(k, v, i) {
        return {
            key: k,
            value: v,
            opt: i || 1
        };
    };
}

//检测浏览器版本，并保存
BomHelper.prototype.checkBrowerType = function() {
    var ua = navigator.userAgent.toLowerCase(),
        s, rkv;
    var rdic = [
        this.kv('ie', /msie ([\d.]+)/),
        this.kv('qq', /qq\/([\d.]+)/i),
        this.kv('firefox', /firefox\/([\d.]+)/i),
        this.kv('uc', /ucbrowser\/([\d.]+)/i),
        this.kv('operaMini', /opera[\s]mini.([\d.]+)/i),
        this.kv('opera', /opera[\s]mini.([\d.]+)/i),
        this.kv('chrome', /chrome\/([\d.]+)/i), //chrome for android
        this.kv('crios', /crios\/([\d.]+)/i), //chrome for ios
        this.kv('safari', /version\/([\d.]+).*safari/i),
    ];

    for (var i = 0; i < rdic.length; i++) {
        rkv = rdic[i];
        if ((s = ua.match(rkv.value))) {
            this[rkv.key] = s[1];
            break;
        }
    }

    if (/(iphone|ipad|ipod|ios)/i.test(ua)) {
        this.ios = (s = ua.match(/(?:iphone|ipad|itouch).* os (\d+)_[\d]/)) ? s[1] : "1";
    } else if (/android/i.test(ua)) {
        this.android.version = ((s = ua.match(/(?:android) ([\d\.]+);/))) ? s[1] : "1";

        rdic = [
            this.kv('huawei', /(huawei|honorbln)/i),
            this.kv('oppo', /oppo/i),
            this.kv('vivo', /vivo/i),
            this.kv("xiaomi", /(miui|xiaomi)/i),
            this.kv("meizu", /;[\s]+mz-/i),
            this.kv("original", /android/),
        ];

        for (var i = 0; i < rdic.length; i++) {
            rkv = rdic[i];
            if ((s = ua.match(rkv.value))) {
                this.android[rkv.key] = 1;
                break;
            }
        }
    } else this.pc = "pc";
}

//获取ajax对象
BomHelper.prototype.ajaxObj = function() {
    var xmlHttp = null;

    if (this.ie != "") {
        if (typeof ActiveXObject != "undefined") {
            return new XMLHttpRequest();
        } else {
            try {
                xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
            } catch (ex1) {
                try {
                    xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
                } catch (ex2) {
                    try {
                        xmlHttp = new XMLHttpRequest();
                    } catch (ex3) {
                        alert("创建ajax对象失败,本网站只支持ie6以上版本浏览器,请刷新页面重试");
                    }
                }
            }
        }
    } else {
        try {
            xmlHttp = new XMLHttpRequest();
        } catch (ex3) {
            alert("创建ajax对象失败,请刷新页面重试");
        }
    }
    return xmlHttp;
}
//发送ajax的GET请求
BomHelper.prototype.ajaxGet = function(sUrl, fnAjax, isdefer) {
    if (isdefer == undefined) isdefer = true;
    var xmlHttp = this.ajaxObj();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.status == 404) return;

        if (xmlHttp.readyState == 4)
            fnAjax(xmlHttp.responseText);
    }
    if (sUrl.indexOf("?") == -1)
        sUrl = sUrl + "?flesh=" + Math.random();
    else
        sUrl = sUrl + "&flesh=" + Math.random();
    xmlHttp.open("GET", sUrl, isdefer);
    xmlHttp.send(null);
}

//发送ajax的post请求
BomHelper.prototype.ajaxPost = function(sUrl, sPostData, fnAjax) {
    var xmlHttp = this.ajaxObj();

    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4)
            fnAjax(xmlHttp.responseText);
    }
    if (sPostData == "")
        sPostData = sPostData + "flesh=" + Math.random();
    else
        sPostData = sPostData + "&flesh=" + Math.random();
    xmlHttp.open("POST", sUrl, true);
    xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xmlHttp.send(sPostData);
}

//同步获取xml文件
BomHelper.prototype.ajaxXml = function(sUrl, isdefer, fnAjax) {
    var xmlHttp = this.ajaxObj();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.status == 404) return;

        if (xmlHttp.readyState == 4)
            fnAjax(xmlHttp.responseXML, xmlHttp.responseText);
    }
    if (sUrl.indexOf("?") == -1)
        sUrl = sUrl + "?flesh=" + Math.random();
    else
        sUrl = sUrl + "&flesh=" + Math.random();
    xmlHttp.open("GET", sUrl, isdefer);
    xmlHttp.send(null);
}
//若是IE7以上版本，则要求它使用IE7
BomHelper.prototype.useIE7 = function() {
    document.write("<meta content=\"IE=EmulateIE7\" http-equiv=\"X-UA-Compatible\">");
}
BomHelper.prototype.getNowTime = function getNowTime() {
    var val = bomHelper.timezoneHours;
    var d = new Date();
    return new Date(d.getTime() + d.getTimezoneOffset() * 60000 + val * 60 * 60000);
}

//切换暗黑模式
BomHelper.prototype.switchDark = function() {
    var isDark = parseInt(findCookie("darkSetting") || 0);
    var e = document.body;
    if (e) {
        if (isDark)
            addClass(e, "dark");
        else
            removeClass(e, "dark");
    }
}

//切换响应式布局
BomHelper.prototype.switchResponsive = function() {
    var isResponsive = parseInt(findCookie("isResponsive") || 1);
    var e = document.getElementById("viewport");
    var b = document.body;
    if (e) {
        if (isResponsive) { //响应式
            e.content = "width=device-width, initial-scale=1.0, maximum-scale=1.0";
            if (b) addClass(b, "responsive");
        } else { //PC模式
            e.content = "width=1000";
            if (b) removeClass(b, "responsive");
        }
    }
    this.switcShow()
}

//切换响应式布局
BomHelper.prototype.switcShow = function() {
    var isPc = this.pc == "pc";
    var isResponsive = parseInt(findCookie("isResponsive") || 1);
    var sp = document.getElementById("switchPc");
    var sm = document.getElementById("switchMobile");
    var sps = document.getElementById("switchPc_s");
    var sms = document.getElementById("switchMobile_s");
    if (isResponsive) { //响应式
        if (sp) sp.style.display = "";
        if (sm) sm.style.display = "none";
        if (sps) sps.style.display = "";
        if (sms) sms.style.display = "none";
    } else { //PC模式
        if (sp) sp.style.display = "none";
        if (sm) sm.style.display = "";
        if (sps) sps.style.display = "none";
        if (sms) sms.style.display = "";
    }
    if (isPc) { //如果是PC的时候
        if (sp) sp.style.display = "none";
        if (sm) sm.style.display = "none";
        if (sps) sps.style.display = "none";
        if (sms) sms.style.display = "none";
    }
}

//切换是否新窗口打开
BomHelper.prototype.isOpenNew = function() {
    return parseInt(findCookie("openNew") || 0);
}

//切换是否新窗口打开
BomHelper.prototype.switchOpenNew = function() {
    var isOpenNew = parseInt(findCookie("openNew") || 0);
    var e = document.getElementById("openWindow");

    if (e) {
        if (isOpenNew) {
            e.setAttribute("target", "_blank");
        } else {
            e.removeAttribute("target");
        }
    }
}


var bomHelper = new BomHelper();
bomHelper.checkBrowerType();

//设置默认的时区
bomHelper.defaultTimezone = (-(new Date().getTimezoneOffset() / 60));
if (parseFloat(findCookie("def_zoneOffset")) != bomHelper.defaultTimezone) {
    writeCookie("def_zoneOffset", bomHelper.defaultTimezone);
}

bomHelper.timezoneHours = (function() {
    var t1 = parseFloat(findCookie("zoneOffset"));
    return isNaN(t1) ? bomHelper.defaultTimezone : t1;
})();

Object.defineProperties(bomHelper, {
    HdpFormat: {
        get: function() {
            if (typeof this._hdpFormat == "undefined")
                this._hdpFormat = parseInt(findCookie("hdpFormat") || defConfig.hdpFormat);
            return this._hdpFormat;
        },
        set: function(val) {
            this._hdpFormat = val;
        }
    }
});
var currTimeWithTimeZone = function() {
    var d = new Date();
    var ZoneOffset = findCookie("zoneOffset");
    var isEmptyZone = isNaN(parseInt(ZoneOffset));
    var ctimeZ = -1 * d.getTimezoneOffset() / 60;
    var ntimeZ = isEmptyZone ? ctimeZ : parseFloat(ZoneOffset);
    return new Date(d.getTime() + (ntimeZ - ctimeZ) * 60 * 60000);
}
//bomHelper.timezoneHours = findCookie("zoneOffset") ? (parseInt(findCookie("zoneOffset"))) : -(new Date().getTimezoneOffset() / 60);
//bomHelper.HdpFormat = parseInt(findCookie("hdpFormat") || defConfig.hdpFormat);

Object.defineProperties(window, {
    defConfig: {
        get: function() {
            if (typeof _.defConfig === "undefined") bomHelper.ajaxGet("/common/config", function(v) {
                _.defConfig = JSON.parse(v);
            }, false);
            return _.defConfig;
        }
    }
});

//JS去除空格
String.prototype.Trim = function() {
    return this.replace(/(^\s*)|(\s*$)/g, "");
}

Array.prototype.contains = function(obj) {
    var i = this.length;
    while (i--) {
        if (this[i] === obj || this[i] + "" === obj + "") {
            return true;
        }
    }
    return false;
}

String.prototype.format = function() {
    var args = arguments;
    return this.replace(
        /\{([\d]+)\}/g,
        function($1, $2) {
            return args[$2];
        }
    );
};

function checkCookie(cookieName, defaultVal) {
    var cookieValue = typeof defaultVal == "undefined" ? null : defaultVal;
    //获取cookie字符串
    var strCookie = document.cookie;
    //将多cookie切割为多个名/值对
    var arrCookie = strCookie.split("; ");
    //遍历cookie数组，处理每个cookie对
    for (var i = 0; i < arrCookie.length; i++) {
        var arr = arrCookie[i].split("=");
        //找到名称为userId的cookie，并返回它的值
        if (cookieName == arr[0]) {
            cookieValue = arr[1];
            break;
        }
    }
    return cookieValue;
}

function findCookie(cookieName) {
    if (cookieName == "hdpFormat") {
        cookieName = cookieName + "v1";
    }
    return checkCookie(cookieName, "");
}

function writeCookie(name, value, expireVal) {
    if (name == "hdpFormat") {
        name = name + "v1";
    }

    var expire = expireVal;
    var hours = 365 * 24;
    if (expire == undefined)
        expire = new Date((new Date()).getTime() + hours * 3600000);

    expire = ";path=/;expires=" + expire.toGMTString();
    document.cookie = name + "=" + escape(value) + expire;
}

function delCookie(name) {
    var date = new Date();
    date.setTime(date.getTime() - 10000);
    document.cookie = name + "=;path=/;expires=" + date.toGMTString();
}

var Storage = {
    enableStorage: function(st) {
        try {
            st.setItem("_test", '1');
            var ret = (st.getItem("_test") == '1');
            st.removeItem("_test");
            return ret;
        } catch (e) {
            return false;
        }
    },
    enableLocal: function() {
        return (navigator.cookieEnabled && typeof(localStorage) != "undefined" && this.enableStorage(localStorage));
    },
    enableSession: function() {
        return (navigator.cookieEnabled && typeof(sessionStorage) != "undefined" && this.enableStorage(sessionStorage));
    },
    getLocal: function(k) {
        if (this.enableLocal())
            return localStorage.getItem(k);
        else {
            return unescape(findCookie(k));
        }
    },
    setLocal: function(k, v) {
        if (this.enableLocal())
            localStorage.setItem(k, v);
        else {
            writeCookie(k, v);
        }
    },
    getSession: function(k) {
        if (this.enableSession())
            return sessionStorage.getItem(k);
        else return this.getLocal(k);
    },
    setSession: function(k, v) {
        if (this.enableSession())
            sessionStorage.setItem(k, v);
        else this.setLocal(k, v);
    }
};

//20150101123000 or 2015,01,01,12,30,00
function getTimeByUtcStrNum(t, useActualZone) {
    t = t.trim();
    var t1 = t.split(/^(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})$/);

    var reg2 = /^(\d+),(\d+),(\d+),(\d+),(\d+),(\d+)$/;
    if (t1.length == 1 && reg2.test(t)) {
        return getTimeByUtcStr(t, useActualZone);
    }

    var timeZoneHour = useActualZone ? -((new Date()).getTimezoneOffset() / 60) : bomHelper.timezoneHours;
    var t2 = new Date(t1[1], parseInt(t1[2]) - 1, t1[3], t1[4], t1[5], t1[6]);
    t2 = new Date(Date.UTC(t2.getFullYear(), t2.getMonth(), t2.getDate(), t2.getHours(), t2.getMinutes(), t2.getSeconds()));
    t2 = new Date(t2.getTime() + (timeZoneHour * 60 * 60000));
    return t2;
}

//2015,01,01,12,30,00
function getTimeByUtcStr(val, useActualZone) {
    var t = splitTime(val);
    var timeZoneHour = useActualZone ? -((new Date()).getTimezoneOffset() / 60) : bomHelper.timezoneHours;
    var t2 = new Date(t[0], t[1], t[2], t[3], t[4], t[5]);
    t2 = new Date(t2.getFullYear(), t2.getMonth(), t2.getDate(), t2.getHours(), t2.getMinutes(), t2.getSeconds());
    t2 = new Date(t2.getTime() + (timeZoneHour * 60 * 60000));
    return t2;
}
//1602721800000
function getTimeByUtcLong(val) {
    var timeZoneHour = bomHelper.timezoneHours + new Date().getTimezoneOffset() / 60;
    var t2 = new Date(val + (timeZoneHour * 60 * 60000));
    return t2;
}
//兼容三种日期格式[2019,4,30,07,00,00],[2019,5-1,30,07,00,00],[2019-4-30 07:00:00]
function splitTime(t) {
    var d = 0;
    if (t.indexOf(':') != -1) {
        t = t.replace(/(-|\s|:)/g, ",");
        d = 1;
    }
    var t = t.split(",");
    t[1] = eval(t[1]) - d;
    return t;
}

//2019-5-30 9:04
function getTimeByUtcForamted(val, useActualZone) {
    var timeZoneHour = useActualZone ? -((new Date()).getTimezoneOffset() / 60) : bomHelper.timezoneHours;
    var t = val.split(/([\d]+)\-([\d]+)\-([\d]+)\s([\d]+)\:([\d]+)/);
    var t2 = new Date(t[1], parseInt(t[2] - 1), t[3], t[4], t[5]);
    t2 = new Date(t2.getFullYear(), t2.getMonth(), t2.getDate(), t2.getHours(), t2.getMinutes(), t2.getSeconds());
    t2 = new Date(t2.getTime() + (timeZoneHour * 60 * 60000));
    return t2;
}

var _locModel = _locModel || {
    T: 0
};
var months = new Array(
    _locModel.T.T_January || "January",
    _locModel.T.T_February || "February",
    _locModel.T.T_March || "March",
    _locModel.T.T_April || "April",
    _locModel.T.T_May || "May",
    _locModel.T.T_June || "June",
    _locModel.T.T_July || "July",
    _locModel.T.T_August || "August",
    _locModel.T.T_September || "September",
    _locModel.T.T_October || "October",
    _locModel.T.T_November || "November",
    _locModel.T.T_December || "December");

function formatDateForDou(t, type) {
    var strTime = "";
    var t2 = getTimeByUtcStr(t);

    if (type == 1)
        strTime = ToDateTimeString(t2);

    document.write(strTime);
}

function formatDate(t, type) {
    var strTime = "";
    t = t.trim();
    var t1 = t.split(/^(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})$/);

    var reg2 = /^(\d+),(\d+),(\d+),(\d+),(\d+),(\d+)$/;
    if (t1.length == 1 && reg2.test(t)) {
        formatDateForDou(t, type);
        return;
    }

    var t2 = new Date(t1[1], parseInt(t1[2]) - 1, t1[3], t1[4], t1[5], t1[6]);
    t2 = new Date(Date.UTC(t2.getFullYear(), t2.getMonth(), t2.getDate(), t2.getHours(), t2.getMinutes(), t2.getSeconds()));
    t2 = new Date(t2.getTime() + (bomHelper.timezoneHours * 60 * 60000));

    if (type == 1)
        strTime = t2.getFullYear();
    else if (type == 2)
        strTime = ToDateString(t2);
    else if (type == 3) {
        strTime = ToTimeString(t2);
    } else if (type == 4) {
        strTime = ToMonthNameDate(t2);
    } else if (type == 5) {
        strTime = ToDateTimeString(t2);
    } else strTime = ToFullDate(t2);

    document.write(strTime);
}

function formatZero(val) {
    return (val < 10) ? '0' + val : val;
}

function writeLocalTime(t, type) {
    var strTime = ToLocalTime(t, type);
    document.write(strTime);
}

function getTimeStr1(date) {
    Y = date.getFullYear() + '',
        M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1),
        D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()),
        h = (date.getHours() < 10 ? '0' + (date.getHours()) : date.getHours()),
        m = (date.getMinutes() < 10 ? '0' + (date.getMinutes()) : date.getMinutes()),
        s = (date.getSeconds() < 10 ? '0' + (date.getSeconds()) : date.getSeconds());
    return Y + ',' + M + ',' + D + ',' + h + ',' + m + ',' + s
}

function getTimeStr(date) {
    Y = date.getFullYear() + '',
        M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1),
        D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()),
        h = (date.getHours() < 10 ? '0' + (date.getHours()) : date.getHours()),
        m = (date.getMinutes() < 10 ? '0' + (date.getMinutes()) : date.getMinutes()),
        s = (date.getSeconds() < 10 ? '0' + (date.getSeconds()) : date.getSeconds());
    return Y + M + D + h + m + s
}

function withTimeZone(t) {
    var t1 = new Date(parseInt(t));
    return new Date(t1.getTime() + (bomHelper.timezoneHours * 60 * 60000) - (8 * 3600000));
}

function ToLocalTime(t, type, isUtc) {
    var strTime = "";
    var t1 = new Date(t.substr(0, 4), parseInt(t.substr(4, 2).replace(/0(\d)/, "$1")) - 1, t.substr(6, 2), t.substr(8, 2), t.substr(10, 2));
    var localT = new Date(t1.getTime() + (bomHelper.timezoneHours * 60 * 60000) - (8 * 3600000));
    if (isUtc) {
        localT = new Date(t1.getTime() + (bomHelper.timezoneHours * 60 * 60000));
    }

    if (!type) { //20150101123000
        strTime = localT;
    } else if (type == 1) {
        strTime = ToDateTimeString(localT);
    } else if (type == 2) {
        strTime = ToDateString(localT);
    } else if (type == 3) {
        strTime = ToTimeString(localT);
    } else if (type == 4) {
        strTime = ToDateTimeString(localT);
    } else if (type == 5) {
        strTime = ToFullDate(localT);
    } else if (type == 6) {
        strTime = ToShortDateString(localT);
    }

    if (strTime) {
        return strTime;
    }

    return t;
}

function ToTimeString(t) {
    return timeToText(t, 3);
}

function ToDateString(t) {
    return timeToText(t, 8);
}

function ToShortDateString(t) {
    return timeToText(t, 6);
}

function ToFullDate(t) {
    return timeToText(t, 1);
}

function ToMonthNameDate(t) {
    return timeToText(t, 10);
}

function ToSimpleMonth(t) {
    return timeToText(t, 11);
}

function ToSimpMonthNameDate(t) {
    return timeToText(t, 8);
}

var _months2 = new Array(
    _locModel.T.T_S_January || "Jan",
    _locModel.T.T_S_February || "Feb",
    _locModel.T.T_S_March || "Mar",
    _locModel.T.T_S_April || "Apr",
    _locModel.T.T_S_May || "May",
    _locModel.T.T_S_June || "Jun",
    _locModel.T.T_S_July || "Jul",
    _locModel.T.T_S_August || "Aug",
    _locModel.T.T_S_September || "Sep",
    _locModel.T.T_S_October || "Oct",
    _locModel.T.T_S_November || "Nov",
    _locModel.T.T_S_December || "Dec");

var _months = new Array(
    _locModel.T.T_January || "January",
    _locModel.T.T_February || "February",
    _locModel.T.T_March || "March",
    _locModel.T.T_April || "April",
    _locModel.T.T_May || "May",
    _locModel.T.T_June || "June",
    _locModel.T.T_July || "July",
    _locModel.T.T_August || "August",
    _locModel.T.T_September || "September",
    _locModel.T.T_October || "October",
    _locModel.T.T_November || "November",
    _locModel.T.T_December || "December");

var _weeks = new Array(_locModel.T.T_Sunday || "Sunday",
    _locModel.T.T_Monday || "Monday",
    _locModel.T.T_Tuesday || "Tuesday",
    _locModel.T.T_Wednesday || "Wednesday",
    _locModel.T.T_Thursday || "Thursday",
    _locModel.T.T_Friday || "Friday",
    _locModel.T.T_Saturday || "Saturday");

var _weeks2 = new Array(_locModel.T.T_S_Sunday || "Sun.",
    _locModel.T.T_S_Monday || "Mon.",
    _locModel.T.T_S_Tuesday || "Tue.",
    _locModel.T.T_S_Wednesday || "Wed.",
    _locModel.T.T_S_Thursday || "Thu.",
    _locModel.T.T_S_Friday || "Fri.",
    _locModel.T.T_S_Saturday || "Sat.");

function ToDateTimeString(t, type) {
    if (type)
        return dateFtt("w1 t1 dd", t);
    return timeToText(t, 9);
}

function timeToText(t2, type) {
    type = type || 0;
    var fmts = [
        "yyyy-MM-dd hh:mm:ss", /*0*/
        "yyyy-MM-dd", /*1*/
        "MM/dd", /*2*/
        "hh:mm", /*3*/
        "t2 dd", /*4*/
        "MM-dd hh:mm", /*5*/
        "yy-MM-dd", /*6*/
        "yyyy", /*7*/
        "t2.dd", /*8*/
        "dd-MM,yyyy hh:mm" /*9*/ ,
        "t2.dd,yyyy" /*10*/ ,
        "yyyy-MM-dd(w1)", /*11*/
        "MM-dd", /*12*/
        "t2.dd w1", /*13*/
        "yyyy-MM-dd hh:mm", /*14*/
        "yyyy t2 dd hh:mm w2", /*15*/
        "yyyy MM-dd", /*16*/
    ];

    return dateFtt(fmts[type] || fmts[0], t2);
}

function setTimeByFormat() {
    var elems = document.querySelectorAll("[data-time]");
    for (var i = 0; i < elems.length; i++) {
        var elem = elems[i],
            t2;
        if (!elem.innerHTML.trim() || elem.getAttribute("data-f2t")) {
            var f2t = elem.getAttribute("data-f2t");
            if (f2t == "2") {
                //20190720184500
                t2 = getTimeByUtcStrNum(elem.getAttribute("data-time"));
            } else if (f2t == "3") {
                //1600313125918
                t2 = withTimeZone(elem.getAttribute("data-time"));
            } else {
                t2 = getTimeByUtcStr(elem.getAttribute("data-time"));
            }

            elem.innerHTML = timeToText(t2, elem.getAttribute("data-fmt"));
            elem.setAttribute("data-time-f", elem.getAttribute("data-time"));
            elem.removeAttribute("data-time");
        }
    }
}

function dateFtt(fmt, t) {
    var o = {
        "M+": t.getMonth() + 1, //month
        "d+": t.getDate(), //day
        "h+": t.getHours(), //hours
        "m+": t.getMinutes(), //minutes
        "s+": t.getSeconds(), //second
        "t1": _months[t.getMonth()], //month name
        "t2": _months2[t.getMonth()], //simp month
        "w1": _weeks[t.getDay()], //week
        "w2": _weeks2[t.getDay()], //simp week,
    };

    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (t.getFullYear() + "").substr(4 - RegExp.$1.length));

    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1 || /[tw]/.test(k)) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));

    return fmt;
}

var GoalCn = ["0", "0/0.5", "0.5", "0.5/1", "1", "1/1.5", "1.5", "1.5/2", "2", "2/2.5", "2.5", "2.5/3", "3", "3/3.5", "3.5", "3.5/4", "4", "4/4.5", "4.5", "4.5/5", "5", "5/5.5", "5.5", "5.5/6", "6", "6/6.5", "6.5", "6.5/7", "7", "7/7.5", "7.5", "7.5/8", "8", "8/8.5", "8.5", "8.5/9", "9", "9/9.5", "9.5", "9.5/10", "10", "10/10.5", "10.5", "10.5/11", "11", "11/11.5", "11.5", "11.5/12", "12", "12/12.5", "12.5", "12.5/13", "13", "13/13.5", "13.5", "13.5/14", "14"];
var GoalCn2 = ["0", "0/-0.5", "-0.5", "-0.5/1", "-1", "-1/1.5", "-1.5", "-1.5/2", "-2", "-2/2.5", "-2.5", "-2.5/3", "-3", "-3/3.5", "-3.5", "-3.5/4", "-4", "-4/4.5", "-4.5", "-4.5/5", "-5", "-5/5.5", "-5.5", "-5.5/6", "-6", "-6/6.5", "-6.5", "-6.5/7", "-7", "-7/7.5", "-7.5", "-7.5/8", "-8", "-8/8.5", "-8.5", "-8.5/9", "-9", "-9/9.5", "-9.5", "-9.5/10", "-10"];
var GoalCn3 = ["0", "0/{0}0.5", "{0}0.5", "{0}0.5/{0}1", "{0}1", "{0}1/{0}1.5", "{0}1.5", "{0}1.5/{0}2", "{0}2", "{0}2/{0}2.5", "{0}2.5", "{0}2.5/{0}3", "{0}3", "{0}3/{0}3.5", "{0}3.5", "{0}3.5/{0}4", "{0}4", "{0}4/{0}4.5", "{0}4.5", "{0}4.5/{0}5", "{0}5", "{0}5/{0}5.5", "{0}5.5", "{0}5.5/{0}6", "{0}6", "{0}6/{0}6.5", "{0}6.5", "{0}6.5/{0}7", "{0}7", "{0}7/{0}7.5", "{0}7.5", "{0}7.5/{0}8", "{0}8", "{0}8/{0}8.5", "{0}8.5", "{0}8.5/{0}9", "{0}9", "{0}9/{0}9.5", "{0}9.5", "{0}9.5/{0}10", "{0}10", "{0}10/{0}10.5", "{0}10.5", "{0}10.5/{0}11", "{0}11", "{0}11/{0}11.5", "{0}11.5", "{0}11.5/{0}12", "{0}12", "{0}12/{0}12.5", "{0}12.5", "{0}12.5/{0}13", "{0}13", "{0}13/{0}13.5", "{0}13.5", "{0}13.5/{0}14", "{0}14"];

function Goal2GoalT(goal, hdp) { //ou conversion
    if (goal === "") return "&nbsp;";

    var ret = goal;

    //if (goal >= 0)
    //    ret = GoalCn[parseInt(goal * 4)] || goal;
    //else
    //    ret = GoalCn2[Math.abs(parseInt(goal * 4))] || goal;

    if (hdp) {
        ret = GoalCn3[Math.abs(parseInt(goal * 4))] || goal;
        return Goal2Format(ret, goal > 0);
    } else {
        return GoalCn[parseInt(goal * 4)] || goal;
    }
}

function Goal2GoalTLq(goal, hdp) { //ou conversion
    if (goal === "") return "&nbsp;";

    var ret = goal;

    if (hdp) {
        ret = GoalCn3[Math.abs(parseInt(goal * 4))];
        if (typeof(ret) == "undefined" || !ret) {
            ret = "{0}" + Math.abs(goal);
        }
        return Goal2FormatLq(ret, goal > 0);
    } else {
        return GoalCn[parseInt(goal * 4)] || goal;
    }
}

function Goal2Format(val, isP) {
    var hf = bomHelper.HdpFormat;
    if (typeof(val) == "number")
        val = val + "";
    if (val == "0")
        return val;

    var sign = "";

    if (!hf) {
        sign = isP ? "+" : "-"; // +1 -1
    } else if (hf == 1) {
        sign = isP ? "-" : "+"; // -1  +1
    } else if (hf == 2) {
        sign = isP ? "" : "-"; // 1 -1
    } else if (hf == 3) {
        sign = isP ? "" : "*"; // 1 *1
    }
    return val.format(sign);
}

function Goal2FormatLq(val, isP) {
    var hf = bomHelper.HdpFormat;
    if (typeof(val) == "number")
        val = val + "";
    if (val == "0")
        return val;

    var sign = "";

    if (!hf || hf == 2) {
        sign = isP ? "＋" : "－"; // +1 -1
    } else {
        sign = isP ? "－" : "＋"; // -1  +1
    }

    return val.format(sign);
}

function getTopHeight() {
    var adTop = 0;
    if (document.documentElement && document.documentElement.scrollTop)
        adTop = document.documentElement.scrollTop;
    else if (document.body)
        adTop = document.body.scrollTop
    else
        adTop = window.pageYOffset;

    return adTop;
}

var _alwaysShowRt = 1;

function returnTop() {}

var _czc = _czc || [];
var _lazzyLoadCnzz = false;
var _cnzzLoaded = false;

function CzcApi(category, action, label) {
    if (_czc)
        _czc.push(["_trackEvent", category, action, label]);
};

function replaceScript(container, url) {
    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = url;
    container.removeChild(container.firstChild);
    container.appendChild(s, "script");
}

function addScript(container, url) {
    var s = document.createElement("script");
    s.src = url;
    container.appendChild(s, "script");
}

function toggle() {
    for (var i = 0; i < arguments.length; i++) {
        var elem = _$(arguments[i]);
        if (elem) elem.style.display = elem.style.display == "none" ? "" : "none";
    }
}

function _$(id) {
    return document.getElementById(id);
}

function _$$(q, o) {
    if (typeof(q) !== 'string' || q == '') return [];
    var ss = q.split(' ');
    var attr = '';
    var s = ss[0].split(':')[0];
    if (s != ss[0])
        attr = ss[0].split(':')[1];

    var val = s.split('[')[0];
    if (val != s)
        val = s.split('[')[1].replace(/[",\]]/g, '');
    else
        val = '';
    s = s.split('[')[0];

    var obj = [];
    var sObj = null;

    o = o || document;
    switch (s.charAt(0)) {
        case '#':
            sObj = document.getElementById(s.substr(1));
            if (sObj) obj.push(sObj);
            break;
        case '.':
            var l = o.getElementsByTagName('*');
            var c = s.substr(1);
            for (var i = 0; i < l.length; i++)
                if (l[i].className.search('\\b' + c + '\\b') != -1) obj.push(l[i]);
            break;
        default:
            obj = o.getElementsByTagName(s);
            break;
    }

    if (val) {
        var l = [];
        var a = val.split('=');
        for (var i = 0; i < obj.length; i++) {
            switch (a.length) {
                case 1:
                    if (obj[i].getAttribute(a[0]) != null) l.push(obj[i]);
                    break;
                case 2:
                    if (obj[i].getAttribute(a[0]) == a[1]) l.push(obj[i]);
                    break;
            }
        }
        obj = l;
    }

    if (attr) {
        var l = [];
        for (var i = 0; i < obj.length; i++)
            if (obj[i][attr]) l.push(obj[i]);
        obj = l;
    }

    if (ss.length > 1) {
        var l = [];
        for (var i = 0; i < obj.length; i++) {
            var ll = arguments.callee(q.substr(ss[0].length + 1), obj[i]);
            if (ll.tagName) l.push(ll);
            else
                for (var j = 0; j < ll.length; j++) l.push(ll[j]);
        }
        obj = l;
    }

    if (sObj && ss.length == 1) {
        obj = sObj;
        if (obj) obj.length = 1;
    } else {
        var l = [];
        for (var i = 0; i < obj.length; i++) obj[i].$isAdd = false;
        for (var i = 0; i < obj.length; i++) {
            if (!obj[i].$isAdd) {
                obj[i].$isAdd = true;
                l.push(obj[i]);
            }
        }
        obj = l;
    }

    return obj;
}

function hasClass(elem, cls) {
    if (elem)
        return elem.classList.contains(cls);

    return false;
}

function removeClass(elem, cls) {
    if (elem) {
        elem.classList.remove(cls);
    }
}

function addClass(elem, cls) {
    if (elem) {
        elem.classList.add(cls);
    }
}

function toggleClass(elem, cls) {
    if (typeof(elem) == "string") elem = _$(elem);

    if (elem) {
        elem.classList.toggle(cls);
    }
}

function switchNavigate() {
    if (_$("navPop").style.display == "none") {
        _$("navPop").style.display = "";
        document.body.parentNode.style.overflow = "hidden";
        //safari
        document.body.style.overflow = "hidden";
    } else {
        _$("navPop").style.display = "none";
        document.body.parentNode.style.overflow = "visible";
        //safari
        document.body.style.overflow = "visible";
    }
}

function explainList(exList, homeTeam, awayTeam) {
    if (!exList || exList == "")
        return "";
    var exText = new Array();
    //得分
    var gex4 = exList.split(";");
    var explainTemp = "";
    if (gex4[0] != "")
        exText.push(gex4[0].replace(",", (_locModel.T.T_Ex_Min || "Min") + "[") + "]");
    if (gex4[1] != "")
        exText.push((_locModel.T.T_Ex_TwoRounds || "Two Rounds") + "[" + gex4[1] + "]");
    if (gex4[2] != "")
        exText.push(gex4[2].replace("1,", "120" + (_locModel.T.T_Ex_Min || "Min") + "[").replace("2,", (_locModel.T.T_Ex_Ot || "Ot") + "[").replace("3,", (_locModel.T.T_Ex_Ot || "Ot") + "\'[") + "]");
    if (gex4[3] != "")
        exText.push((_locModel.T.T_Ex_Pen || "Pen") + "[" + gex4[3] + "]");
    if (gex4[4] == "1")
        exText.push(homeTeam + " " + (_locModel.T.T_Ex_Win || "Win"));
    else if (gex4[4] == "2")
        exText.push(awayTeam + " " + (_locModel.T.T_Ex_Win || "Win"));
    return exText.join(", ");
}

function buildTags(tpl, data, ifKeep) {
    if (!ifKeep) tpl = tpl.replace(/>[\s\n\r]+</g, "><");
    return tpl.replace(/\{\$(\w+)\}/g, function(a, b) {
        return (b in data) ? data[b] : "";
    });
}

function backOrClose() {
    return;
}

function addHandler(element, type, handler) { //绑定事件
    if (element == null)
        return;
    if (element.addEventListener) { // IE9以下不兼容
        element.addEventListener(type, handler, false)
    } else if (element.attachEvent) { //IE独有
        element.attachEvent('on' + type, handler)
    } else {
        element['on' + type] = handler; //一个元素只能绑定一个处理程序
    }
}

function removeHandler(element, type, handler) { //移除事件
    if (element == null)
        return;
    if (element.removeEventListener) { //addEventListener
        element.removeEventListener(type, handler, false)
    } else if (element.detachEvent) { //attachEvent
        element.detachEvent('on' + type, handler)
    } else {
        element['on' + type] = null;
    }
}

function cancelBubble(evt) {
    //cancel bubble
    var e = (evt) ? evt : window.event;
    if (!e) return;
    if (window.event) {
        e.cancelBubble = true;
    } else {
        e.stopPropagation();
    }
};

function seoVsTitle(hn, gn) {
    return (hn.toLowerCase().split(/([^<]+)[<]?/)[1] + " vs " + gn.toLowerCase()).replace(/[\W]+/g, '-');
}

function seoTitle(n) {
    return (n.toLowerCase()).replace(/[\[\]\s\(\)\'\.]+/g, '-')
}

function oddsCompare(oval, val) {
    oval = oval ? oval.toString() : "";
    val = val ? val.toString() : "";
    oval = oval.replace("＋", "+");
    oval = oval.replace("－", "-");
    val = val.replace("＋", "+");
    val = val.replace("－", "-");
    //return 1,0,-1 for float odds, string, or 0/0.5
    var n_oval = parseFloat(oval),
        n_val = parseFloat(val);
    if (oval && oval.indexOf("/") != -1)
        n_oval = (oval.indexOf("-") == -1 ? 1 : -1) * (parseFloat(oval.replace("-", "").split("/")[0]) + parseFloat(oval.replace("-").split("/")[1])) / 2;
    if (oval && oval.indexOf("/") != -1)
        n_val = (val.indexOf("-") == -1 ? 1 : -1) * (parseFloat(val.replace("-", "").split("/")[0]) + parseFloat(val.replace("-").split("/")[1])) / 2;

    if (n_val > n_oval) return 1;
    else if (n_val == n_oval) return 0;
    return -1;
}
var FloatHelper = {
    DecimalLength: function(num) { //The length of the decimal
        var eSplit = num.toString().split(/[eE]/);
        var len = (eSplit[0].split('.')[1] || '').length - Number(eSplit[1] || 0);
        return len > 0 ? len : 0;
    },
    Operator: function(arg1, arg2, sign) { //sign:1 is subtraction, 2 is multiplication, 3 is division, others are addition
        var r1 = this.DecimalLength(arg1),
            r2 = this.DecimalLength(arg2);
        var n = Math.max(r1, r2);
        var m = Math.pow(10, n);
        switch (sign) {
            case "*":
            case 2:
                n = r1 + r2, rv = ((arg1 * Math.pow(10, r1)) * (arg2 * Math.pow(10, r2))) / Math.pow(10, n);
                break;
            case "/":
            case 3:
                if (n < 3) n = 3;
                rv = (arg1 * m) / (arg2 * m);
                break;
            case "%":
            case 4:
                rv = ((arg1 * m) % (arg2 * m)) / m;
                break;
            case "-":
            case 1:
                rv = (arg1 * m - arg2 * m) / m;
                break;
            default:
                rv = (arg1 * m + arg2 * m) / m;
                break; //"+"
        }
        return parseFloat(rv.toFixed(n));
    }
}

function numZero(val) {
    // 0.9 to 0.90
    // 1 to 1.00
    if (/[.][\d]$/.test(val.toString()))
        return val + "0";
    else if (/^[-]?[\d]+$/.test(val.toString()))
        return val + ".00";

    return val;
}

var oTool = {
    getPL: function(ot, hVal, pVal, gVal, ifEOdds) {
        ot = parseInt(ot);
        if (isNaN(hVal) && isNaN(pVal) && isNaN(gVal)) return [hVal, pVal, gVal];
        var ifShowE = ifEOdds && (ot == 3 || ot == 6);
        var arr = !ifEOdds || ifShowE ? [, , this.toIN, this.toUS, this.toEU, this.toML, this.toFraction] : [];
        var df = function(a) {
            return a;
        };
        var doFuc = arr[ot] || df;
        if (ot != 3)
            doFuc = (function() {
                var oldFuc = doFuc;
                return function(v) {
                    return numZero(oldFuc(v))
                };
            }());

        if (ifShowE) {
            var sub1 = function(v) {
                if (!isNaN(parseFloat(v))) return FloatHelper.Operator(v, 1, "-");
                return v;
            }
            hVal = sub1(hVal);
            gVal = sub1(gVal);
            pVal = sub1(pVal);
        }
        return [doFuc(hVal), (ifEOdds ? doFuc(pVal) : pVal), doFuc(gVal)];
    },
    singlePL: function(ot, val, isE, toInt) {
        ot = parseInt(ot);
        if (isNaN(val)) return val;
        var ifShowE = isE && (ot == 3 || ot == 6);
        var arr = !isE || ifShowE ? [, , this.toIN, this.toUS, this.toEU, this.toML, this.toFraction] : [];
        var df = function(a) {
            return a;
        };
        var doFuc = arr[ot] || df;
        if (ot != 3)
            doFuc = (function() {
                var oldFuc = doFuc;
                return function(v) {
                    return numZero(oldFuc(v))
                };
            }());

        if (ifShowE) {
            var sub1 = function(v) {
                if (!isNaN(parseFloat(v))) return FloatHelper.Operator(v, 1, "-");
                return v;
            }
            val = sub1(val);
        }

        return doFuc(val, toInt);
    },
    changePL: function(format, o, keyArr, ifE) {
        for (var i = 0; i < keyArr.length; i += 3) {
            var hk = keyArr[i],
                pk = keyArr[i + 1],
                gk = keyArr[i + 2];
            var oArr = oTool.getPL(format, ToFixed(o[hk]), ToFixed(o[pk]), ToFixed(o[gk]), ifE);
            o[hk] = oArr[0];
            o[pk] = oArr[1];
            o[gk] = oArr[2];
        }
    },
    toIN: function(val) {
        if (!val) return "";
        var fVal = parseFloat(val);
        if (isNaN(fVal)) return "";
        return (fVal < 1) ? (0 - 1 / fVal).toFixed(2) : val;
    },
    toML: function(val) {
        if (!val) return "";
        var fVal = parseFloat(val);
        if (isNaN(fVal)) return "";
        return (fVal > 1) ? (0 - 1 / fVal).toFixed(2) : val;
    },
    toEU: function(val) {
        if (!val) return "";
        var fVal = parseFloat(val);
        if (isNaN(fVal)) return "";
        return (fVal + 1).toFixed(2);
    },
    USJson: {
        0.22: -450,
        0.28: -350,
        0.33: -300,
        0.36: -275,
        0.38: -267,
        0.44: -225,
        0.47: -212.5,
        0.53: -187.5,
        0.57: -175,
        0.62: -162.5,
        0.63: -160,
        0.66: -150,
        0.72: -137.5,
        0.83: -120,
        0.88: -114,
        0.91: -110,
        0.95: -105
    },
    toUS: function(val, toInt) {
        var fVal = parseFloat(val);
        if (fVal.toString() == "NaN") return "";
        var oJson = oTool.USJson;
        if (fVal in oJson)
            return toInt ? Math.round(oJson[fVal]) : oJson[fVal];

        if (fVal <= 0)
            return 0;
        else if (fVal < 1)
            return Math.round(0 - 100 * ((1 / fVal).toFixed(2)));
        else
            return Math.round(100 * fVal);
    },
    fractionJson: {
        0.22: "2/9",
        0.28: "2/7",
        0.33: "1/3",
        0.36: "4/11",
        0.38: "3/8",
        0.44: "4/9",
        0.47: "40/85",
        0.53: "8/15",
        0.57: "4/7",
        0.62: "8/13",
        0.63: "5/8",
        0.66: "4/6",
        0.72: "8/11",
        0.83: "5/6",
        0.88: "7/8",
        0.91: "10/11",
        0.95: "20/21"
    },
    toFraction: function(val) { //Fractional conversion
        var fVal = parseFloat(val);
        if (fVal.toString() == "NaN") return "";

        var f = fVal < 0;
        if (f) fVal = Math.abs(fVal);
        var fra = {
            n: 0,
            m: 1
        }; //n/m
        var num = 0;
        if (fVal > 1)
            fVal = FloatHelper.Operator(fVal, num = fVal | 0, "-");

        var oJson = oTool.fractionJson;
        if (fVal in oJson) {
            var arr = oJson[fVal].split("/");
            fra.n = parseInt(arr[0]);
            fra.m = parseInt(arr[1]);
        } else if (fVal > 0) {
            var GCD = function(a, b) {
                return b == 0 ? a : GCD(b, a % b);
            } //Greatest Common Divisor
            var m = Math.pow(10, FloatHelper.DecimalLength(fVal));
            var n = parseInt(fVal * m);
            var d = GCD(m, n);
            fra.n = n / d;
            fra.m = m / d;
        }
        return (f ? "-" : "") + (num * fra.m + fra.n) + "/" + fra.m;
    }
};

var backTool = {
    hisKey: "backToolHistory",
    hisArr: Array(),
    hisArrMaxLength: 5,
    getHisArr: function() {
        var sessionVal = Storage.getSession(this.hisKey);
        this.hisArr = !sessionVal ? new Array() : JSON.parse(sessionVal);
        if (!this.hisArr)
            this.hisArr = new Array();
    },
    setHisArr: function() {
        Storage.setSession(this.hisKey, JSON.stringify(this.hisArr))
    },
    getLastHis: function() {
        if (this.hisArr.length == 0)
            return "";
        return this.hisArr[this.hisArr.length - 1];
    },
    jumpToBack: function() {
        var url = "";
        var footballStr = "football";
        if (location.href.indexOf("soccer") != -1)
            footballStr = "soccer";
        if (document.referrer && defConfig.webDomain.cms && document.referrer.indexOf(defConfig.webDomain.cms) > -1) {
            history.back();
            return;
        }
        if (this.hisArr.length > 0) {
            url = this.hisArr.pop();
            this.setHisArr();
            //提取出来的不是新闻，且二级目录不一致？
            if (url.indexOf("news") == -1 && ((location.href.indexOf(footballStr) > -1 && url.indexOf(footballStr) == -1) || (location.href.indexOf("basketball") > -1 && url.indexOf("basketball") == -1) || (location.href.indexOf("esports") > -1 && url.indexOf("esports") == -1)))
                url = "";
        }
        if (!url) {
            url = "/" + footballStr;
            if (location.href.indexOf("basketball") != -1)
                url = "/basketball/";
            else if (location.href.indexOf("baseball") != -1)
                url = "/baseball/";
            else if (location.href.indexOf("esports") != -1)
                url = "/esports/";
            else if (location.href.indexOf("news") != -1)
                url = "/news";
        }

        goTo(url, "", true);
        return;
    },
    addPageUrlToHis: function() {
        var last = this.getLastHis();
        if (last.indexOf(location.pathname) > -1) return;
        this.hisArr[this.hisArr.length] = location.href;
        //只保留5个
        if (this.hisArr.length > this.hisArrMaxLength)
            this.hisArr.shift();
        this.setHisArr();
    },
    init: function() {
        this.getHisArr();
    },
    reset: function() {
        this.hisArr = new Array();
        this.setHisArr();
    }
};

backTool.init();

function closeBack(opt) {
    backTool.jumpToBack();
}

function toSetting(opt) {
    if (typeof(localStorage) != "undefined") {
        localStorage.setItem("pPSet", window.location.href);
    } else {
        writeCookie("pPSet", window.location.href);
    }

    var param = opt ? 1 : 0;
    if (window._ScoreOnly) {
        param = 2;
    }

    window.location.href = "/about/setting/" + (param ? "?s=" + param : "");
}

function Hashtable() {
    this._hash = new Object();
    this.add = function(key, value) {
        if (typeof(key) != "undefined") {
            this._hash[key] = typeof(value) == "undefined" ? null : value;
            return true;
        } else
            return false;
    }
    this.remove = function(key) {
        delete this._hash[key];
    }
    this.keys = function() {
        var keys = new Array();
        for (var key in this._hash) {
            keys.push(key);
        }
        return keys;
    }
    this.count = function() {
        var i = 0;
        for (var k in this._hash) {
            i++;
        }
        return i;
    }
    this.items = function(key) {
        return this._hash[key];
    }
    this.contains = function(key) {
        return typeof(this._hash[key]) != "undefined";
    }
    this.clear = function() {
        for (var k in this._hash) {
            delete this._hash[k];
        }
    }
}

function toLink(o) {
    cancelBubble();
    goTo(o.getAttribute("data-link"));
}

function goTo(url, id, isBack, newOpen) {

    if (!url) return;

    var newA = document.createElement("a");

    if (!isBack && backTool) {
        backTool.addPageUrlToHis();
    }
    if (isBack) {
        newA.setAttribute("rel", "noreferrer")
    }

    newA.id = id || ("tmp_" + new Date().getTime());
    newA.target = '_self';
    if (newOpen) {
        newA.target = '_blank';
    }
    newA.href = url;
    document.body.appendChild(newA);
    newA.click();
    document.body.removeChild(newA);
}

function getWebTail() {
    return "com";
}

function getTeamUrl(id, name) {
    return "/soccer/team/{0}".format(id);
}

function getLeaUrl(id, name) {
    return "/soccer/league/{0}".format(id);
}

function toMatch(type, id, hname, gname, newOpen) {
    type = type == 0 ? "" : (["", "analysis", "odds"][type] || "analysis");
    var url = "/soccer/match/{0}".format(id);
    if (type) url = url + "/" + type;
    goTo(url, "", false, newOpen);
}

function getLqLeaUrl(id, name) {
    return "/basketball/database/standings/{0}".format(id);
}

function getBqLeaUrl(id, name) {
    return "/baseball/league/{0}".format(id);
}

function toLqMatch(type, id, hname, gname, newOpen) {
    type = type == 0 ? "" : (["", "analysis", "odds", "live"][type] || "analysis");
    var url = "/basketball/match/{0}".format(id);
    if (type) url = url + "/" + type;
    goTo(url, "", false, newOpen);
}

function toBqMatch(type, id, hname, gname, newOpen) {
    type = type == 0 ? "" : (["", "analysis", "odds"][type] || "analysis");
    var url = "/baseball/match/{0}".format(id);
    if (type) url = url + "/" + type;
    goTo(url, "", false, newOpen);
}

function toOddsDetail(type, id) {
    var url = "/home/LiveOddsDetail/{0}/?oddsType={1}".format(id, type);
    goTo(url);
}

function toSpOddsDetail(type, id, oddsId) {
    var url = "/home/SpecialOddsDetail/{0}/?oddsType={1}&oddsId={2}".format(id, type, oddsId);
    goTo(url);
}

function toCornerOddsDetail(type, id) {
    var url = "/home/CornerOddsDetail/{0}/?oddsType={1}".format(id, type);
    goTo(url);
}

function toLqOddsDetail(type, id) {
    var url = "/basketball/LiveOddsDetail/{0}/?oddsType={1}".format(id, type);
    goTo(url);
}

function getLqLeaUrl(id, name) {
    return "/basketball/database/standings/{0}".format(id);
}

function toPlayer(id, newOpen) {
    var url = "/football/player/{0}".format(id);
    goTo(url, "", false, newOpen);
}

function toLqPlayer(id, newOpen) {
    var url = "/basketball/player/{0}".format(id);
    goTo(url, "", false, newOpen);
}

var convertLongToData = function(longD) { //长整形转换时间
    return new Date(new Date(longD).getTime() - (8 * 60 * 60000));
}

//定义一个比较器
function compare(propertyName) {
    return function(object1, object2) {
        var value1 = object1[propertyName];
        var value2 = object2[propertyName];
        if (value2 < value1) {
            return 1;
        } else if (value2 > value1) {
            return -1;
        } else {
            return 0;
        }
    }
}
// matchdata.sort(by('sclassID', by('tSMatchTime')));
var by = function(name, minor) {
    return function(o, p) {
        var a, b;
        if (o && p && typeof o === 'object' && typeof p === 'object') {
            a = o[name];
            b = p[name];
            if (a === b) {
                return typeof minor === 'function' ? minor(o, p) : 0;
            }
            if (typeof a === typeof b) {
                return a < b ? -1 : 1;
            }
            return typeof a > typeof b ? -1 : 1;
        } else {
            thro("error");
        }
    }
}
//来源于比分页处理
function handleBackFromBf(url) {
    location.href = url + "?returnurl=" + location.href;
}

function getFavIcon(opt) {
    if (opt == 1)
        return "icon iconfont icon-font-collect-on on";
    if (opt == 0)
        return "icon iconfont icon-font-collect-off";
    return "";
}

function getAd() {

}

//时间字符串转时间格式 2021-11-26 15:14:55 => 2021 11 26 15 14 55
function timeFromE8(s) {
    var sps = s.split(/[\s-\:](\d+)[\s-\:]?/g);
    var t1 = new Date(parseInt(sps[0]), parseInt(sps[1]) - 1, parseInt(sps[2]), parseInt(sps[3]), parseInt(sps[4]));
    //var localT = new Date(t1.getTime() - ((new Date()).getTimezoneOffset() * 60000) - (8 * 3600000));
    var localT = new Date(t1.getTime() - 8 * 3600000 + bomHelper.timezoneHours * 60 * 60000);
    return localT;
}

function initCookiesExplain() {
    var cookiesExplain = findCookie("cookiesExplain");
    if (cookiesExplain == null || cookiesExplain != "1") {
        showCookiesExplain();
    }
}

function hideCookiesExplain() {
    var dom = document.getElementById("cookiesExplain");
    if (typeof(dom) == "undefined" || !dom) return;
    document.getElementById("cookiesExplain").style.display = "none";
}

function showCookiesExplain() {
    var dom = document.getElementById("cookiesExplain");
    if (typeof(dom) == "undefined" || !dom) return;
    document.getElementById("cookiesExplain").style.display = "";
}


function acceptCookiesExplain() {
    writeCookie("cookiesExplain", "1");
    hideCookiesExplain();
}

function goToUrl(url) {
    goTo(url, '', false, bomHelper.isOpenNew())
}


initCookiesExplain();