//足球工具栏
var arrZQTootBottomMaxImages = [];
//足球赛事
var arrZQTootTopMinImages = [];
var arrZQTootBottomMinImages = []; //["http://paripesa.bet/goalooNG^/mn/t2.gif^"];
var arrZQRFMaxImages = []; //["http://paripesa.bet/goalooNG^/mn/rf1.gif^"];
var arrZQMatchImages = [];
var arrZQMatchTxts = ["https://www.nowgoal.com/news/725812^^AD：NowGoal Banners are available with best price, contact us NOW! "];

var _adIndex = 0;
var curAdList = null;
var _showAd = true;

function initAd(adList) {
    /*getAdVisible();*/
    if (_showAd)
        this.curAdList = adList;
    else
        this.curAdList = arrEmpty;
}

function getAdVisible() {
    try {
        bomHelper.ajaxGet("/home/ipsearch/?" + Date.parse(new Date()),
            function(data) {
                _showAd = data == "1";
            },
            false);
    } catch (e) {}
}

function loadAd() {

}

function getAd(objName) {
    if (!_showAd || !objName) return;
    var objs = document.getElementsByName(objName);
    if (objs.length == 0) return;
    for (var i = 0; i < objs.length; i++) {
        objs[i].style.display = "none";
    }
    for (var i = 0; i < objs.length; i++) {
        var obj = objs[i];
        var arr = window[obj.getAttribute("data-arr")];
        if (typeof(arr) == "undefined" || !arr || arr == null || arr.length == 0 || i > arr.length - 1) return;
        if (arr[i] == "") return;
        var ad = arr[i].split("^");
        if (ad[1] != "")
            obj.innerHTML = "<a href='" + ad[0] + "' target='_blank'><img src='" + ad[1] + "' /></a>";
        else
            obj.innerHTML = "<a href='" + ad[0] + "' target='_blank'>" + ad[2] + "</a>";

        obj.style.display = "";
    }
}