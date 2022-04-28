var _onSearch = _onSearch || 0;

function searchfocus(obj, hm) {
    if (!obj.value.trim()) {
        if (hm) {
            showNewsHotMatches(obj);
        }
    } else if (!_$("div_search").innerHTML) {
        search(obj, hm);
    }
}

function searchblur(obj, hm) {
    if (!obj.value.trim()) {

        if (hm) {

        }
    }
}

function search(obj, hm) {
    if (obj.value.trim()) {
        document.getElementById("div_search").innerHTML = "";
        var idx = 0;
        var idxArr = new Array();
        var varcount = 0;
        var itemsSource = _matchData.MatchList.items;

        var matchSource = new Array();

        for (var i = 0; i < itemsSource.length; i++) {
            var mItem = itemsSource[i];
            var searchSource = mItem.lname + " " + mItem.lnameS + " " + mItem.hName + " " + mItem.gName;
            if (checkMatchSearch(searchSource, obj.value)) {
                matchSource.push(mItem);
                varcount += 1;
            }
        }

        buildSearchDiv(matchSource, 0);
    } else if (hm) {
        showNewsHotMatches(obj);
    }

    _onSearch = $(".search-container").css("display") == "block";
}

var _nghot = [];

function showNewsHotMatches(obj) {
    if (obj.value == "" && typeof(_nghot) != "undefined") {
        _$("div_search").innerHTML = "";
    }

    var matchSource = new Array();
    for (var i = 0; i < _nghot.length; i++) {
        var mItem = _matchData.MatchList.Get(_nghot[i]);
        if (mItem) matchSource.push(mItem);
    }

    matchSource.sort(function(a, b) {
        return b.Weight() - a.Weight();
    });

    if (matchSource.length > 0) {
        buildSearchDiv(matchSource, 1);
    }
}

function clearSearch() {
    //toggleSearch();
    _$("div_search").innerHTML = "";
    _onSearch = 0;
}

function buildSearchDiv(list, hm) {
    var html = new Array();

    var title = hm ? _locModel.T.T_SearchHot : _locModel.T.T_SearchCount.replace("{0}", Math.min(list.length, 10));

    html.push("<div class='search-container'>");
    html.push("<div class='search-header'><span class='search-title'>" + title + "<i class='close' onclick='clearSearch()'></i></span></div>");

    for (var i = 0; i < Math.min(list.length, 10); i++) {
        var mItem = list[i];
        var viewModel = new _glModel.ViewSearch(mItem);
        viewModel.idx = i + 1;
        html.push(buildTags(_$("tpl_search").innerHTML, viewModel));
    }

    html.push("</div>");

    _$("div_search").innerHTML = html.join("");
}

function checkMatchSearch(mainString, searchKey) {
    searchKey = searchKey.replace(/[\s\W]/g, "");
    if (mainString == undefined || !searchKey) return false;
    var regex = new RegExp(searchKey, "i");

    return (regex.test(mainString.replace(/[\s\W]/g, "")));
}

function toggleSearch(force) {
    btnS = _$('btnSearch');
    if (!btnS) return;

    if (force)
        removeClass(_$('btnSearch'), "on");
    else
        toggleClass(_$('btnSearch'), "on");

    if (_$('btnSearch').getAttribute("class").indexOf(" on") == -1) {
        _$("searchlayer").style.display = "none";
        _$("div_search").innerHTML = "";
        _onSearch = 0;
    } else {
        _$("searchlayer").style.display = "";
        _onSearch = 1;
    }
}

function markTopOnSearch(mId, obj, evt) {
    cancelBubble();
    isTop = MarkTop(mId, obj, evt, 1);
    obj.setAttribute("class", isTop ? "icon iconfont icon-font-collect-on on" : "icon iconfont icon-font-collect-off");
}

function setHiddenCount(num) {
    if (!_$("hiddenCount")) return;
    num = parseInt(num);
    var hBar = _$("hideCountBar");
    if (hBar) {
        hBar.style.display = num ? "" : "none";
    }

    _$("hiddenCount").innerHTML = num ? num : 0;
}


var scoreUtil = {
    setName: function(rowItem) {
        var arr = [];

        var oddsOrgSort = defConfig.oddsOrgSort;
        for (var ii = 0; ii < oddsOrgSort.length; ii++) {
            switch (Config.OddsShow & oddsOrgSort[ii]) {
                case 1:
                    arr.push("lOdd");
                    break;
                case 8:
                    arr.push("oOdd");
                    break;
                case 2:
                    arr.push("eOdd");
                    break;
            }
        }
        rowItem.oddsName0 = arr[0] || "";
        rowItem.oddsName1 = arr[1] || "";
        return rowItem;
    }
};

_.filterGroups = function() {
    var arr = [];
    var wHash = {};
    var createItem = function(key) {
        return {
            name: key,
            items: []
        };
    }
    return {
        Init: function() {
            arr = [], wHash = {};
            arr.push(createItem(_locModel.T.T_MyLeagues || "My Leagues"), createItem(_locModel.T.T_HotLeagues || "Hot Leagues"))
            for (var i = 65; i < 91; i++) {
                var key = String.fromCharCode(i);
                var obj = createItem(key);
                arr.push(obj);
                wHash[key] = obj;
            }
            arr.push(createItem("*"));
        },
        Find: function(name) {
            name = name.toString();
            var pixel = name.replace(" ", "").substr(0, 1).toUpperCase();
            if (pixel in wHash)
                return wHash[pixel];
            return arr[arr.length - 1];
        },
        get my() {
            return arr[0];
        },
        get hot() {
            return arr[1];
        },
        get all() {
            return arr;
        }
    }
}

function getRowCss(mi) {
    var state = parseInt(typeof(mi.State) == "undefined" ? mi : mi.State);
    switch (state) {
        case 0:
            return "tob";
        case 2:
            return "h";
        case -1:
            return "f";
        default:
            if (state > 0)
                return "";
            return "abd";
    }
}

function fixedHeight() {
    setTimeout(function() {
        var arr = document.querySelectorAll(".team .homeTeam");
        var lh = 23;
        if (arr.length > 0 && getComputedStyle)
            lh = parseInt(getComputedStyle(arr[0]).lineHeight) + 1;
        for (var i = 0; i < arr.length; i++) {
            var elem = arr[i];
            var mId = parseInt(elem.getAttribute("id").replace("rht_", ""));
            if (mId > 0 && elem.offsetHeight > lh) {
                var telem = _$("tb_" + mId);
                if (telem) telem.setAttribute("class", telem.getAttribute("class") + " fixh" + (elem.offsetHeight > lh * 2 ? "2" : ""));
            }
        }
    }, 0);
}

$(document).ready(function() {
    //$("#searchlayer").click(function () { cancelBubble(); });
    //$("#btnSearch").click(function () { cancelBubble(); });

    addHandler(document.querySelector(".webdesc .showALL"), "click", function() {
        var thisObj = this;
        var wObj = thisObj.parentNode;
        wObj.style["height"] = "auto";
        thisObj.style["display"] = "none";
    });

});

_.ChangeScore = function(sid, ifHome) {
    var nameElem = _$((ifHome ? "ht_" : "gt_") + sid);
    var scoreElem = _$((ifHome ? "hsc_" : "gsc_") + sid);
    var reVal = false;
    if (nameElem) {
        var className = "ballIn";
        addClass(nameElem, className);
        setTimeout(function() {
            removeClass(nameElem, className);
        }, 10000);
        reVal = true;
    }
    if (scoreElem) {
        var className2 = "on";
        addClass(scoreElem, className2);
        setTimeout(function() {
            removeClass(scoreElem, className2);
        }, 10000);
        reVal = true;
    }
    return reVal;
}
window._glModel = window._glModel || {};
var _indexCounter = 1;

_glModel.ViewLeague = function(lea, nolazy) {
    this.lId = lea.lId;
    this.cId = lea.cId;
    this.index = lea.index;
    this.expcCss = lea.collapsed ? "collapsed" : "";
    this.explCss = lea.collapsed ? "up" : "";
    this.topCss = lea.isTop ? "icon iconfont icon-font-collect-on on" : "icon iconfont icon-font-collect-off";
    this.fullName = lea.fullName;
    this.mNum = !Config.OrderByMatch ? "" : Config.FilterOdds ? lea.oddsNum : lea.matchNum;
    this.leaNumCss = !lea.collapsed || !this.mNum ? "hi" : "";
    //this.href = lea.ifShow ? "/football/" + seoTitle(lea.fullName) + "/league-" + lea.lId + "/" : "";
    //this.href = lea.ifShow ? getLeaUrl(lea.lId, lea.fullName) : "";
    this.pic = "/images/country/" + lea.cId + "-flag-small.png";
    this.defPic = "/images/com/newsDef.jpg";
    if (nolazy) {
        this.defPic = this.pic;
    }
    this.href = getLeaUrl(lea.lId, lea.fullName);
    this.oddsTitle = getOddsTitle();
    if (_isFree) {
        this.topCss = "hi";
        this.target = "target='_blank'"
    }
}

_glModel.LiveMatch = function(infoArr) {
    this.mId = infoArr[0];
    this.lId = infoArr[1];
    this.hId = parseInt(infoArr[2]);
    this.gId = parseInt(infoArr[3]);
    this.hName = infoArr[4].replace("\\s", "").replace("\\", "");
    this.gName = infoArr[5].replace("\\s", "").replace("\\", "");
    this.strUtcTime = infoArr[6];
    this.strUtcTime2 = infoArr[7];

    if (this.strUtcTime2)
        this.strMatchTime = this.strUtcTime2;
    else
        this.strMatchTime = this.strUtcTime;

    this.MatchTime = getTimeByUtcStr(this.strMatchTime);

    this.State = parseInt(infoArr[8]);
    this.hScore = infoArr[9];
    this.gScore = infoArr[10];
    this.hHalfScore = infoArr[11] == undefined ? "" : infoArr[11];
    this.gHalfScore = infoArr[12] == undefined ? "" : infoArr[12];
    this.hRed = infoArr[13];
    this.gRed = infoArr[14];
    this.hYellow = infoArr[15];
    this.gYellow = infoArr[16];
    this.hOrder = infoArr[17] ? NumofRank(infoArr[17]) : "";
    this.gOrder = infoArr[18] ? NumofRank(infoArr[18]) : "";
    //set null for order when belongs to diff league
    if (infoArr[17] && infoArr[18] && infoArr[17].replace(this.hOrder.replace(/[\]\[]/g, ""), "") != infoArr[18].replace(this.gOrder.replace(/[\]\[]/g, ""), "")) {
        if (!(/^[\d\-]+$/.test(infoArr[17]) && /^[\d\-]+$/.test(infoArr[18]))) {
            this.hOrder = this.gOrder = "";
        }
    }

    this.isLineup = infoArr[19];
    //this.isLive = infoArr[34];

    this.cId = infoArr[23];
    this.hasCorner = !(infoArr[29] === undefined);
    this.hCorner = infoArr[27];
    this.gCorner = infoArr[28];
    this.StartTime = getTimeByUtcStr(this.strUtcTime);
    this.DisplayTime = ToTimeString(this.StartTime);

    this.explain = infoArr[24];
    if (this.explain) {
        this.explain = this.explain.split('|')[this.explain.split('|').length - 1];
        if (/^;+$/.test(this.explain)) this.explain = '';
    }
    this.isTop = false;

    this.hasTv = infoArr[37] == "1";

    //keep the match index in data file
    this.mIndex = _indexCounter++;

    this.changeZone = function() {
        this.MatchTime = getTimeByUtcStr(this.strMatchTime);
        this.StartTime = getTimeByUtcStr(this.strUtcTime);
        this.DisplayTime = ToTimeString(this.StartTime);
    };

    //排序权值 置顶-状态-时间-赛程id
    this._lastWeight = 0;
    this.Weight = function(init) {
        var ss = this.State > 0 ? 1 : this.State;
        if (ss >= 0 || ss == -1) ss = ss + 50;
        else {
            ss = 40; // -10~-14 sort by time
        }

        var topVal = "";
        if (Config.MarkTopFav || Config.OrderByMatch) {
            topVal = (this.isTop ? "2" : "1");
        }

        if (Config.OrderByMatch) {
            ss = "";
        }

        var time = this.StartTime;
        var mTime = time.getFullYear().toString().substr(2) + formatZero(time.getMonth()) + formatZero(time.getDate()) +
            formatZero(time.getHours()) + formatZero(time.getMinutes());

        var month = this.StartTime.getMonth();
        if (month == 0)
            month = 12;

        var mtime = "" + formatZero(month) + formatZero(this.StartTime.getDate()) + formatZero(this.StartTime.getHours()) + formatZero(this.StartTime.getMinutes());

        return parseFloat(topVal + ss + (99999999 - parseInt(mtime)) + "." + (1000 - this.mIndex));
    };

    if (this.hasCorner) {
        if (!this.hCorner) this.hCorner = "0";
        if (!this.gCorner) this.gCorner = "0";
    };
}

function GetPopGoalWinRow(mi, isHome, isGuest) {
    var viewPop = {
        mId: mi.mId,
        mstate: GetMatchState(mi.State, mi.MatchTime),
        lname: mi.lnameS,
        hname: mi.hName,
        gname: mi.gName,
        hscore: mi.hScore,
        gscore: mi.gScore,
        hsCss: isHome ? "red" : "",
        gsCss: isGuest ? "red" : ""
    };
    return buildTags(_$("popTpl").innerHTML, viewPop);
}


function CheckFilterLevel() {
    Config.Level = (function() {
        var val = findCookie(FilterLevelKey);
        if (val)
            return parseInt(val);

        var val = defConfig.level;
        if (val > 0) {
            var arr = _matchData.LeagueList.items;
            for (var i = 0; i < arr.length; i++) {
                var lItem = arr[i];
                if (lItem.type == 1)
                    break;
                else if (i == arr.length - 1)
                    val = 0;
            }
        }
        return val;
    })();
}

function GetPopRedRow(mi, isHome) {
    var vData = {
        mId: mi.mId,
        mstate: GetMatchState(mi.State, mi.MatchTime),
        hname: mi.hName,
        gname: mi.gName,
        hscore: mi.hScore,
        gscore: mi.gScore,
        hnClass: isHome ? "red" : "",
        gnClass: !isHome ? "red" : "",
        hsCss: isHome ? "" : "display:none;",
        gsCss: !isHome ? "" : "display:none;",
        hRed: mi.hRed,
        gRed: mi.gRed
    };

    if (isHome)
        return buildTags(_$("popRedTpl").innerHTML, vData);
}

//////
var tplRow = _$("rowTplByLea") ? _$("rowTplByLea").innerHTML : "";
var tplLeaHeader = _$("tplLeaHeader") ? _$("tplLeaHeader").innerHTML : "";
var tplOddsAh = _$("tplOddsAh") ? _$("tplOddsAh").innerHTML : "";
var tplOddsOp = _$("tplOddsOp") ? _$("tplOddsOp").innerHTML : "";
var tplOddsOu = _$("tplOddsOu") ? _$("tplOddsOu").innerHTML : "";

function initTplRow() {
    //if (tplRow) {
    //    tplRow = tplRow.replace("{$oddsTpl}", getOddsTpl());
    //}
}

function getOddsTpl() {
    switch (Config.OddsShow) {
        case 1:
            return tplOddsAh;
        case 2:
            return tplOddsOp;
        case 8:
            return tplOddsOu;
        default:
            return "";
    }
}

function getOddsTitle() {
    switch (Config.OddsShow) {
        case 1:
            return "<i>" + (_locModel.T.T_HDP || "AH") + "</i><i>" + (_locModel.T.T_OTH_S_AH_HomeWin || "1") + "</i><i>" + (_locModel.T.T_OTH_S_AH_AwayWin || "2") + "</i>";
        case 2:
            return "<i>" + (_locModel.T.T_OTH_S_OP_HomeWin || "1") + "</i><i>" + (_locModel.T.T_OTH_S_OP_Draw || "X") + "</i><i>" + (_locModel.T.T_OTH_S_OP_AwayWin || "2") + "</i>";
        case 8:
            return "<i>" + (_locModel.T_Total || "Total") + "</i><i>" + (_locModel.T.T_OTH_S_OU_Over || "Over") + "</i><i>" + (_locModel.T.T_OTH_S_OU_Under || "Under") + "</i>";
        default:
            return "";
    }
}

function preLoad() {
    //initTplRow();
}

function expandleague(lId, opt) {
    if (lId == undefined) return;
    var obj = _$("expl_" + lId);
    var titleObj = _$("expc_" + lId);
    var numObj = _$("leaNum_" + lId);

    if (!opt) {
        toggleClass(obj, "up");
    } else if (opt == 1) {
        removeClass(obj, "up");
    } else if (opt == -1) {
        addClass(obj, "up");
    }

    var lItem = _matchData.LeagueList.Get(lId);

    if (hasClass(obj, "up")) {
        addClass(titleObj, "collapsed");
        $("[data-mlId=" + lId + "]").hide();
        if (lItem) lItem.collapsed = 1;
    } else {
        removeClass(titleObj, "collapsed");
        $("[data-mlId=" + lId + "]").show();
        if (lItem) lItem.collapsed = 0;
    }

    if (lItem && (lItem.collapsed == 0 || !numObj.innerHTML))
        addClass(numObj, "hi");
    else
        removeClass(numObj, "hi");

    //RefreshAds();
    //refreshLazyImg();
}

function leaCollapsedDefault(lItem) {
    if (lItem.isTop || lItem.collapsed)
        return 0;
    return 1;
}

function toAnalys(mId) {
    var topHeight = getTopHeight();
    Storage.setSession(ScollerKey, topHeight);

    var mItem = _matchData.MatchList.Get(mId);
    if (mItem) {
        Storage.setSession("pTop", window.location.href);
        toMatch((mItem.State == 0 ? 1 : 0), mId, mItem.hName, mItem.gName, bomHelper.isOpenNew() || _isFree);
    }
}

function AddLeagueHeader(lItem, noLazy) {

    if (tplLeaHeader)
        return buildTags(tplLeaHeader, new _glModel.ViewLeague(lItem, noLazy));

    return "";
}

function checkIsOrderByMatch() {
    if (Config.OrderByMatch) return true;
    return false;
}

function refreshLea() {
    //if (checkIsOrderByMatch()) {
    //    return;
    //}
    //console.log("0:" + new Date());
    $(".group-title ").remove();
    var lastLID = "";
    var matchList = $("#gameList .item");
    var html = new Array();
    for (var i = 0; i < matchList.length; i++) {
        var item = $(matchList[i]);
        var itemHtml = item[0].outerHTML;
        //if (!item.is(":visible")) continue;
        var lid = item.attr("data-mlid");
        if (lastLID != lid) {
            var lItem = _matchData.LeagueList.Get(lid);
            if (lItem) {
                //item.before(AddLeagueHeader(lItem));
                itemHtml = AddLeagueHeader(lItem, true) + itemHtml;
            }
        }

        lastLID = lid;
        html.push(itemHtml);
    }
    //console.log("1:" + new Date());
    $("#gameList").html(html.join(""));
    //console.log("11:" + new Date());
    //$(".leaRow").click(function () {
    //    //cancel bubble
    //    cancelBubble();
    //    var href = this.getAttribute("href");
    //    if (href) {
    //        goTo(href, "", false, _isFree);
    //    }
    //    return false;
    //});
    //console.log("12:" + new Date());
    //refreshLazyImg();
    //console.log("13:" + new Date());
    //console.log("2:" + new Date());
}

function MarkTop(mId, evt, refreshAd) {

    //cancel bubble
    var e = (evt) ? evt : window.event;
    if (window.event) {
        e.cancelBubble = true;
    } else {
        e.stopPropagation();
    }

    var mItem = _matchData.MatchList.Get(mId);
    if (mItem == null) return;

    mItem.isTop = !mItem.isTop;

    var topIds = Config.getTopIds().split(",");
    if (mItem.isTop)
        topIds.push(mItem.mId);
    else {
        var idx = topIds.indexOf(mId.toString());
        topIds.splice(idx, 1);
    }
    Config.saveTopId(topIds.join(","));

    var starElem = document.getElementById("tImg_" + mId);
    if (starElem != null) {
        starElem.setAttribute("class", (mItem.isTop ? "icon iconfont icon-font-collect-on on" : "icon iconfont icon-font-collect-off"));
    }

    if (Config.MarkTopFav) {
        onWeightChanged(mItem);
    }

    if (Config.MarkTopFav && refreshAd) {
        RefreshAds();
        //    //refreshDays();
    }

    CzcApi("Football", "Mark Top", mItem.isTop ? "on" : "off");

    return mItem.isTop;
}

function MarkTopLea(lId, evt, refreshAd, noOrder) {
    cancelBubble(evt);

    var topIds = Config.getFavLeagueIds().split(",");
    var isTop = true;
    var lItem = _matchData.LeagueList.Get(lId);
    if (lItem == null) {
        if (!topIds.contains(lId)) {
            topIds.push(lId);
            isTop = true;
        } else {
            var idx = topIds.indexOf(lId.toString());
            topIds.splice(idx, 1);
            isTop = false;
        }
    } else {
        lItem.isTop = !lItem.isTop;
        isTop = lItem.isTop;
        if (lItem.isTop) {
            if (!topIds.contains(lItem.lId))
                topIds.push(lItem.lId);
        } else {
            var idx = topIds.indexOf(lId.toString());
            topIds.splice(idx, 1);
        }

        lItem.collapsed = leaCollapsedDefault(lItem);

        if (Config.OrderByKey) {
            expandleague(lId, lItem.collapsed ? -1 : 1);
        }

        if (!noOrder) {
            onLeagueWeightChanged(lItem);
        }
    }

    Config.setFavLeagueIds(topIds.join(","));

    //var starElem = document.getElementById("sImg_" + lId);
    //if (starElem != null) {
    //    starElem.setAttribute("class", (lItem.isTop ? "icon iconfont icon-font-collect-on on" : "icon iconfont icon-font-collect-off"));
    //}

    var starElem = $("[name=sImg_" + lId + "]");
    if (starElem.length > 0) {
        starElem.removeClass().addClass(isTop ? "icon iconfont icon-font-collect-on on" : "icon iconfont icon-font-collect-off");
    }

    starElem = document.getElementById("fp_sImg_" + lId);
    if (starElem != null) {
        starElem.setAttribute("class", (isTop ? "icon iconfont icon-font-collect-on on" : "icon iconfont icon-font-collect-off"));
    }

    if (refreshAd) {
        RefreshAds();
    }

    CzcApi("Football", "Mark Top League", isTop ? "on" : "off");

    if (_$("leaFilter_list")) {
        //filter mode
        CollectLeaguesForFilter();
        buildGroupList();
    }
}

function onLeagueWeightChanged(lItem, leagueId) {
    if (!Config.OrderByMatch) {
        return;
    }

    if (!lItem) {
        lItem = _matchData.LeagueList.Get(leagueId);
    }

    var lId = lItem.lId;

    var lastWeight = 0;
    var lastlId = lId;
    var hiddenLeaIds = Config.getHiddenLeagueIds().split(",");

    for (var i = 0; i < _matchData.LeagueList.items.length; i++) {
        var cItem = _matchData.LeagueList.items[i];

        if (hiddenLeaIds.contains(cItem.lId.toString())) continue;
        if (cItem.lId == lId) continue;
        if (cItem.index == 0) continue;

        if (cItem.Weight() < lItem.Weight() &&
            (cItem.Weight() > lastWeight || lastWeight == 0)) {
            lastWeight = cItem.Weight();
            lastlId = cItem.lId;
        }
    }

    var contentObj = document.getElementById("gameList");

    var childNode = document.getElementById("expc_" + lId);
    if (childNode == null) return;

    contentObj.removeChild(childNode);

    if (lastlId != lId) {
        var belowsObj = document.getElementById("expc_" + lastlId);
        contentObj.insertBefore(childNode, belowsObj);
    } else if (!lItem.isTop || lastWeight == 0) {
        contentObj.appendChild(childNode);
    } else {
        contentObj.insertBefore(childNode, contentObj.childNodes[0]);
    }

    $(childNode).after($("[data-mlId=" + lId + "]"));
}

function refreshLazyImg() {
    $(".group-title img").lazyload();
}