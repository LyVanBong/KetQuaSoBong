_lazzyLoadCnzz = true;
var top_ShowFilter = true;
var _isLoaded = false;
var arrColor = ["#006666", "#518ed2", "#e8811a", "#949720", "#8f6dd6", "#53ac98", "#ff9966", "#457d1b", "#8d8abd", "#996733", "#8c8a64", "#999012", "#ff6633", "#ca00ca", "#1ba570", "#990099"];
var SclassStoreKey = "SCORE_HIDDEN_IDS";
var CountryStoreKey = "SOUNRTY_HIDDEN_IDS";
var FilterLevelKey = "FilterLevel"; //0.all;1.simplify;2.live
var FilterTypeKey = "FilterType";
var OddsFilterKey = "OddsFilterKey";
var OddsGoalFilterKeyHdp = "OddsGoalFilterKeyHdp";
var OddsGoalFilterKeyOu = "OddsGoalFilterKeyOu";
var ScollerKey = "scrollTop";
var FrontMatchTimeKey = "FrontMatchTimeKey";
var FavLeaKey = "s_LeaIds";
var FavMatchKey = "s_topIds";
var matchListByLea = new Array();
var FilterByFavKey = "FilterByFav"; // 0:no, 1:fav matches, 2:fav lea
var OrderByKey = "orderBy";
var Msg_NoMatch = _locModel.T.T_MSG_NoMatchToday || "No Matches Today";
var Msg_NoLiveMatch = _locModel.T.T_NoLiveMatch || "No Matches ";

var myScroll;

var Config = {
    getTopIds: function() {
        return unescape(findCookie(FavMatchKey));
    },
    saveTopId: function(mIds) {
        writeCookie(FavMatchKey, mIds, new Date((new Date()).getTime() + 30 * 24 * 3600000));
    },
    getHiddenLeagueIds: function() {
        var hiddenIds = Storage.getLocal(SclassStoreKey);
        if (hiddenIds == "undefined" || hiddenIds == null) return "";
        return unescape(hiddenIds);
    },
    setHiddenLeagueIds: function(ids) {
        Storage.setLocal(SclassStoreKey, ids);
    },

    getGoalOddsHdp: function() {
        var selectGoal = Storage.getLocal(OddsGoalFilterKeyHdp);
        if (selectGoal == "undefined" || selectGoal == null) return "";
        return unescape(selectGoal);
    },
    setGoalOddsHdp: function(ids) {
        Storage.setLocal(OddsGoalFilterKeyHdp, ids);
    },

    getGoalOddsOu: function() {
        var selectGoal = Storage.getLocal(OddsGoalFilterKeyOu);
        if (selectGoal == "undefined" || selectGoal == null) return "";
        return unescape(selectGoal);
    },
    setGoalOddsOu: function(ids) {
        Storage.setLocal(OddsGoalFilterKeyOu, ids);
    },
    getHiddenCountryIds: function() {
        var hiddenIds = Storage.getLocal(CountryStoreKey);
        if (hiddenIds == "undefined" || hiddenIds == null) return "";
        return unescape(hiddenIds);
    },
    setHiddenCountryIds: function(ids) {
        Storage.setLocal(CountryStoreKey, ids);
    },
    getFavLeagueIds: function() {
        var favIds = Storage.getLocal(FavLeaKey);
        if (!favIds) return defConfig.hotLeagueIds;
        return unescape(favIds);
    },
    setFavLeagueIds: function(ids) {
        if (!ids || ids.length == 0)
            ids = ",";
        Storage.setLocal(FavLeaKey, ids);
    },
    ShowRedCard: true,
    ShowYellowCard: true,
    ShowRank: true,
    ScoreSound: true,
    RedSound: true,
    UpdateChangeDuretion: 4000,
    UpdateOddsChangeDuretion: 4000,
    UpdateDuration: 3000,
    UpdateAll: 1000 * 60 * 10,
    PopWin: false,
    PopRedCard: false,
    Level: 1,
    OrderByMatch: false,
    NotifyBy: 0,
    HomeAlert: 1,
    AwayAlert: 1,
    FilterOdds: 0,
    Company: 8,
    /* odds company*/
    OddsShow: 2,
    /* 1:HDP 2: 1x2 8: OU*/
    HideCount: 0,
    FilterType: 0,
    /* 0.none 1.league 2.country */
    FavFilterType: 0,
    /*0:none, 1.fav, 2.fav lea */
    TempFilterType: 0,
    /* 0.none 1.league 2.country */
    FrontMatchTime: 0,
    MarkTopFav: 1,
    OddsFormat: 1,
    ZoneOffset: -(new Date()).getTimezoneOffset(),
    Init: function() {
        this.ShowRank = parseInt(findCookie("isRankShow") || defConfig.isRankShow);
        this.ShowYellowCard = parseInt(findCookie("isYellowShow") || defConfig.isYellowShow);
        this.RedSound = findCookie("isRedSound") ? (findCookie("isRedSound") == "1") : true;
        this.PopWin = findCookie("isScoreTan") ? (findCookie("isScoreTan") == "1") : true;
        this.PopRedCard = findCookie("isRedTan") ? (findCookie("isRedTan") == "1") : true;
        this.ScoreSound = findCookie("isScoreSound") ? (findCookie("isScoreSound") == "1") : true;
        this.Level = findCookie(FilterLevelKey) ? (parseInt(findCookie(FilterLevelKey))) : defConfig.level;
        this.FavFilterType = findCookie(FilterByFavKey) ? (parseInt(findCookie(FilterByFavKey))) : 0;
        this.OrderByMatch = parseInt(findCookie(OrderByKey) || defConfig.orderByMatch);
        this.NotifyBy = findCookie("notifyBy") ? (parseInt(findCookie("notifyBy"))) : 0;
        this.HomeAlert = findCookie("hAlert") ? (parseInt(findCookie("hAlert"))) : defConfig.homeAlert;
        this.AwayAlert = findCookie("aAlert") ? (parseInt(findCookie("aAlert"))) : defConfig.guestAlert;
        this.Company = parseInt(findCookie("oddsC") || defConfig.companyID);
        this.OddsShow = findCookie("oddsShow") ? (parseInt(findCookie("oddsShow"))) : defConfig.OddsShow;
        this.FilterOdds = findCookie(OddsFilterKey) ? (parseInt(findCookie(OddsFilterKey))) : 0;
        this.FilterType = findCookie(FilterTypeKey) ? (parseInt(findCookie(FilterTypeKey))) : 0;
        this.FrontMatchTime = findCookie(FrontMatchTimeKey) ? parseInt(findCookie(FrontMatchTimeKey)) : 0;
        this.MarkTopFav = findCookie("markTopFav") ? (parseInt(findCookie("markTopFav"))) : defConfig.favTop;
        this.OddsFormat = parseInt(findCookie("oFormat") || defConfig.oFormat);

        this.ZoneOffset = bomHelper.timezoneHours;

        // clear the filter criteria when odds type is hide
        if ((this.OddsShow & 1) != 1) this.setGoalOddsHdp("");
        if ((this.OddsShow & 8) != 8) this.setGoalOddsOu("");
    }
};
Config.Init();

var FilterModel = {
    TempFilterType: 1,
    TempFilterOdds: 0,
    HasChanged: false,
    init: function() {
        this.TempFilterType = Config.FilterType == 0 ? 1 : Config.FilterType;
        this.TempFilterOdds = Config.FilterOdds;
        this.HasChanged = false;
    }
};

var MatchSrc = {
    LiveA: new Array(),
    LiveB: new Array(),
    LiveC: new Array(),
    liveFileCount: 0,
    init: function() {
        this.LiveA = new Array();
        this.LiveB = new Array();
        this.LiveC = new Array();
    }
}

_glModel.SplitColumn = "^";
_glModel.SplitDomain = "$$";
_glModel.SplitRecord = "!";

_glModel.List = function() {
    this.items = new Array();
    this.keys = new Array();

    this.Add = function(rkey, value) {
        if (typeof(rkey) != "undefined") {
            var vv = typeof(value) == "undefined" ? null : value;
            var key = rkey;
            if (parseInt(rkey) > 999999)
                key = parseInt(rkey) - 999999;

            var idx = this.keys[key];
            if (idx == null) {
                idx = this.items.length;
                this.keys[key] = idx;
            }
            this.items[idx] = vv;
        }
    }

    this.Get = function(rkey) {
        var key = rkey;
        if (parseInt(rkey) > 999999)
            key = parseInt(rkey) - 999999;

        var idx = this.keys[key];
        if (idx != null)
            return this.items[idx];
        return null;
    }
}

_glModel.Country = function(infoArr) {
    this.cId = infoArr[0];
    this.name = infoArr[1];
    this.cOrder = 0;
    this.lIds = new Array();
    this.matchNum = 0;
    this.oddsNum = 0;
}

_glModel.League = function(infoArr) {
    this.lId = infoArr[0];
    this.name = infoArr[1];

    this.fullName = infoArr[8] || infoArr[2];
    if (infoArr[8] == infoArr[1])
        this.fullName = infoArr[2];
    /*
    this.fullName = infoArr[2];
    if (_language == 1 || _language == 3 || _language == 7 || _language == 11 || _language == 12) 
        this.fullName = infoArr[8] || infoArr[2];
    if (_language == 3 && infoArr[8] == infoArr[1]) 
       this.fullName = infoArr[2];
    */

    this.type = parseInt(infoArr[4]);
    this.ifShow = infoArr[5] ? 1 : 0;
    this.cId = 0;
    this.color = arrColor[parseInt(this.lId) % 16];
    this.matchNum = 0;
    this.oddsNum = 0;
    this.isTop = 0;
    this.index = 0;
    this.getName = function() {
        var ret = /^[\d\w\s-\.\[\]\(\)’'\\]*$/g.test(this.fullName) ? this.name : this.fullName;
        return ret.length <= 17 ? ret : this.name;
    };
    this.Weight = function() {
        var topVal = (this.isTop ? "2" : "1");
        return parseFloat(topVal + "" + (9999 - this.index));
    }
    this.collapsed = 0;
}

_glModel.ViewSearch = function(mi) {
    this.mId = mi.mId;
    this.mstate = GetMatchState(mi.State, mi.MatchTime);
    this.mtime = mi.DisplayTime;
    this.hname = mi.hName;
    this.gname = mi.gName;
    this.hscore = mi.State == -1 || mi.State > 0 ? mi.hScore : "";
    this.gscore = mi.State == -1 || mi.State > 0 ? mi.gScore : "";
    this.topcss = mi.isTop ? "icon iconfont icon-font-collect-on on" : "icon iconfont icon-font-collect-off";
    if (!this.mstate)
        this.mstate = "-";
}

var _matchIdx = 0;
_glModel.ViewMatch = function(mi, lea, oi, oArr) {
    this.mId = mi.mId;
    this.mtime = mi.DisplayTime;
    this.stime = [mi.StartTime.getFullYear(), mi.StartTime.getMonth(), mi.StartTime.getDate()].join("_");
    this.dtime = ToSimpMonthNameDate(mi.StartTime);
    this.statecss = getStateCss(mi.State);
    this.hname = mi.hName;
    this.gname = mi.gName;
    this.hred = getRedNode(mi.hRed);
    this.gred = getRedNode(mi.gRed);
    this.hyellow = Config.ShowYellowCard ? getRedNode(mi.hYellow) : "";
    this.gyellow = Config.ShowYellowCard ? getRedNode(mi.gYellow) : "";
    this.hrank = Config.ShowRank && mi.hOrder ? mi.hOrder : "";
    this.grank = Config.ShowRank && mi.gOrder ? mi.gOrder : "";
    this.mstate = GetMatchState(mi.State, mi.MatchTime);
    this.hscore = (mi.State > 0 || mi.State == -1) ? mi.hScore : "";
    this.gscore = (mi.State > 0 || mi.State == -1) ? mi.gScore : "";
    this.hhscore = (mi.State > 2 || mi.State == -1) ? mi.hHalfScore : "";
    this.ghscore = (mi.State > 2 || mi.State == -1) ? mi.gHalfScore : "";
    this.isHt = (mi.State > 2 || mi.State == -1) ? (_locModel.T.T_S_HTScore || "HT") : "";
    this.htit = (mi.State > 2 || mi.State == -1 ? _locModel.T.T_S_HTScore : "");
    this.halfscore = (mi.State > 2 || mi.State == -1 ? (_locModel.T.T_S_HTScore || "HT") + " " + this.hhscore + "-" + this.ghscore : "");
    this.lname = lea.getName();
    //this.slname = lea.fullName.toLowerCase().replace(/[\W]+/g, '-');
    //this.href = "/football/" + seoTitle(lea.fullName) + "/league-" + lea.lId + "/";
    this.href = getLeaUrl(lea.lId, lea.fullName);
    this.cId = mi.cId;
    this.lId = mi.lId;
    this.rowcss = getRowCss(mi);
    this.idx = _matchIdx++;
    this.cncss = mi.hasCorner && (mi.State > 0 || mi.State == -1) ? "" : "hide";
    this.corner = mi.hasCorner && (mi.State > 0 || mi.State == -1) ? mi.hCorner + "-" + mi.gCorner : "";
    this.hcorner = mi.hasCorner && (mi.State > 0 || mi.State == -1) ? mi.hCorner : "";
    this.gcorner = mi.hasCorner && (mi.State > 0 || mi.State == -1) ? mi.gCorner : "";
    this.explain = explainList(mi.explain, mi.hName, mi.gName);
    this.showEx = this.explain ? "block" : "none";
    this.topCss = mi.isTop ? "icon iconfont icon-font-collect-on on" : "icon iconfont icon-font-collect-off";
    if (_isFree) this.topCss = "hi";
    this.leaColor = lea.color;
    this.dateCss = "hide";
    this.dateText = "";
    this.tv = getTvNode(mi);
    this.vote = getVoteNode(mi.mId);
    this.hstar = getHdpStar(0, oi ? oi.letgoal : '', oi ? oi.homeOdds : '', oi ? oi.awayOdds : '');
    this.gstar = getHdpStar(1, oi ? oi.letgoal : '', oi ? oi.homeOdds : '', oi ? oi.awayOdds : '');
    this.expCss = lea.collapsed ? "style='display:none;'" : "";
    this.liveClass = checkTv(mi) ? '<div class="icon iconfont icon-font-live video"></div>' : "";
    this.lineupClass = mi.isLineup ? '<div class="icon icon iconfont icon-font-lineup lineup"></div>' : "";

    this.scoreCss = "";
    if (mi.State == -1 && mi.hScore != mi.gScore) {
        this.scoreCss = mi.hScore > mi.gScore ? "hft" : "gft";
    }

    this.o1 = getArrItem(oArr, 0);
    this.o2 = getArrItem(oArr, 1);
    this.o3 = getArrItem(oArr, 2);
    this.o4 = getArrItem(oArr, 3);
    this.o5 = getArrItem(oArr, 4);
    this.o6 = getArrItem(oArr, 5);

    this.o1_show = checkHideOddsVal(this.o1) ? "display:none" : "";
    this.o2_show = checkHideOddsVal(this.o2) ? "display:none" : "";
    this.o3_show = checkHideOddsVal(this.o3) ? "display:none" : "";
    this.o4_show = checkHideOddsVal(this.o4) ? "display:none" : "";
    this.o5_show = checkHideOddsVal(this.o5) ? "display:none" : "";
    this.o6_show = checkHideOddsVal(this.o6) ? "display:none" : "";

}

function checkHideOddsVal(o) {
    if (o == "0" || o == 0) return false;
    if (!o || o == "&nbsp;") return true
    return false;
}

function getArrItem(arr, i) {
    if (arr.length > i)
        return arr[i];

    return "";
}

function getRedNode(mr) {
    return mr && mr != "0" ? "<i>" + mr + "</i>" : "";
}

function getStateCss(ms) {
    switch (ms) {
        case 2:
            return "blue";
        default:
            return "red";
    }
}

_glModel.chMatch = function(infoStr) {
    var infoArr = infoStr.split(_glModel.SplitColumn);
    this.mId = infoArr[0];
    this.State = parseInt(infoArr[1]);
    this.mTime = infoArr[2];
    this.mTime2 = infoArr[3];
    if (infoArr[3] != "")
        this.MatchTime = ToLocalTime(infoArr[3]);
    else
        this.MatchTime = ToLocalTime(infoArr[2]);

    this.StartTime = ToLocalTime(infoArr[2]);
    this.DisplayTime = ToTimeString(this.StartTime);

    this.hRed = infoArr[8];
    this.gRed = infoArr[9];
    this.hYellow = Config.ShowYellowCard ? infoArr[10] : "0";
    this.gYellow = Config.ShowYellowCard ? infoArr[11] : "0";
    this.hScore = infoArr[4];
    this.gScore = infoArr[5];
    this.hHalfScore = infoArr[6];
    this.gHalfScore = infoArr[7];
    this.explain = infoArr[13];

    this.hCorner = infoArr[14];
    this.gCorner = infoArr[15];
    this.hasCorner = infoArr[16] == "1";
    if (this.hasCorner) {
        if (!this.hCorner) this.hCorner = "0";
        if (!this.gCorner) this.gCorner = "0";
    }
}

_glModel.Odds = function(data) {
    var arrTr = data.split(",");
    this.mId = arrTr[0];
    this.letgoal = arrTr[2];
    this.homeOdds = arrTr[3];
    this.awayOdds = arrTr[4];
    this.hOp = arrTr[6];
    this.dOp = arrTr[7];
    this.aOp = arrTr[8];
    this.ou = arrTr[10];
    this.over = arrTr[11];
    this.under = arrTr[12];
    this.valid = function() {
        return ((Config.OddsShow & 1) == 1 && this.letgoal !== "") ||
            ((Config.OddsShow & 8) == 8 && this.ou !== "") ||
            ((Config.OddsShow & 2) == 2 && this.dOp !== "");
    }
}

var _matchData = new Object();
var AllSimplifyNum = 0;
var timeDiff = 0;

function loadData() {
    sound_init();

    //加载时间
    bomHelper.ajaxGet("/txt/timeGmt.shtml", getTimeDiff);
    preLoad();
    loadTvLiveFile();
    //加载比分赛程
    loadLiveFile();

    //通知
    if (typeof(notePush) != "undefined") {
        notePush.push();
    }
    returnTop();
}

function getTimeDiff(data) {
    var t = new Date(data.substr(0, 4), parseInt(data.substr(4, 2)) - 1, data.substr(6, 2), data.substr(8, 2), data.substr(10, 2), data.substr(10, 2));
    timeDiff = parseInt(((new Date()).getTime() + ((new Date()).getTimezoneOffset() * 60000) - t.getTime()) / 1000);
}

function loadLiveFile() {
    var scoreTxt = _scoreTxt;
    if (Config.OrderByMatch) {
        scoreTxt = _scoreTxtForMatch;
    }

    scoreTxt = scoreTxt + ".js?" + Date.parse(new Date());
    replaceScript(_$("bfData"), "/gf/data/" + scoreTxt);
}


function loadTvLiveFile() {
    if (typeof(_tvLiveTxt) != "undefined" && _tvLiveTxt)
        bomHelper.ajaxGet(_tvLiveTxt + "?" + +Date.parse(new Date()), setTvLinkList);
}

function TvLinkObj(data) {
    var arr = data.split('^');
    this.id = arr[0];
    this.links = new Array();
    for (var i = 1; i <= arr.length; i++) {
        if (arr[i] != "" && arr[i] != undefined) {
            this.links.push(arr[i]);
        }
    }
}

var tvLinkList = new _glModel.List();
var tvLinkChangeTime = "";

function setTvLinkList(data) {
    if (data == "") return;
    tvLinkList = new _glModel.List();
    var dataArr = data.split("$");
    tvLinkChangeTime = dataArr[0];
    if (dataArr[1] == "") return;
    var linkArr = dataArr[1].split("!");
    for (var i = 0; i < linkArr.length; i++) {
        var obj = new TvLinkObj(linkArr[i]);
        tvLinkList.Add(obj.id, obj.links);
    }
}

function switchLive(type) {
    _LiveOnly = type;
    $(".filterBar .tabs .tab").removeClass("on");
    $($(".filterBar .tabs .tab")[type]).addClass("on");
    SetLoading();
    ReloadAll();
}

function checkTv(mi) {
    var tvItem = tvLinkList.Get(mi.mId);
    return tvItem != null;
}

function SetLoading() {
    var _tpl = _$("tplLoaddingBox").innerHTML;
    document.getElementById("gameList").innerHTML = buildTags(_tpl);
}

function ReloadAll() {
    //SetLoading();
    _adLine = 0;
    loadTvLiveFile();
    loadLiveFile();
}

function ShowBf() {
    MatchSrc.LiveA = A;
    MatchSrc.LiveB = B;
    MatchSrc.LiveC = C;
    collectLiveItem();
}

function collectLiveItem() {

    var frontMatchTime = "";

    var topIds = Config.getTopIds().split(",");
    var favLeagueIds = Config.getFavLeagueIds().split(",");

    var leagueItem, mItem, couItem;
    _matchData.LeagueList = new _glModel.List();
    _matchData.MatchList = new _glModel.List();
    _matchData.CountryList = new _glModel.List();
    _matchData.MatchIds = new Array();

    for (var i = 0; i < MatchSrc.LiveC.length; i++) {
        if (!MatchSrc.LiveC[i]) continue;
        couItem = new _glModel.Country(MatchSrc.LiveC[i]);
        _matchData.CountryList.Add(couItem.cId, couItem);
    }

    for (var i = 1; i < MatchSrc.LiveB.length; i++) {
        leagueItem = new _glModel.League(MatchSrc.LiveB[i]);
        leagueItem.isTop = favLeagueIds.contains(leagueItem.lId);
        _matchData.LeagueList.Add(leagueItem.lId, leagueItem);
    }

    var leagueIndex = 0;
    for (var i = 1; i < MatchSrc.LiveA.length; i++) {
        MatchSrc.LiveA[i][1] = MatchSrc.LiveB[MatchSrc.LiveA[i][1]][0];
        if (typeof(_LiveOnly) != "undefined" && _LiveOnly == 1 && MatchSrc.LiveA[i][8] <= 0) {
            continue;
        }

        mItem = new _glModel.LiveMatch(MatchSrc.LiveA[i]);

        _matchData.MatchIds.push(mItem.mId);

        mItem.isTop = topIds.contains(mItem.mId);

        _matchData.MatchList.Add(mItem.mId, mItem);

        leagueItem = _matchData.LeagueList.Get(mItem.lId);
        if (leagueItem) {
            mItem.lname = leagueItem.fullName;
            mItem.lnameS = leagueItem.name;

            if (!leagueItem.index) {
                leagueItem.index = ++leagueIndex;
            }

            leagueItem.matchNum++;
        }

        couItem = _matchData.CountryList.Get(mItem.cId);
        if (couItem) {
            couItem.matchNum++;
            if (leagueItem) {
                leagueItem.cId = mItem.cId;
            }
        }

        if (!frontMatchTime || frontMatchTime > mItem.StartTime) {
            frontMatchTime = mItem.StartTime;
        }
    }
    if (frontMatchTime) {
        if (!Config.FrontMatchTime || (frontMatchTime.getTime() - Config.FrontMatchTime > (3600 * 10 * 1000))) {
            ClearAllFilter(1);
            writeCookie(FrontMatchTimeKey, frontMatchTime.getTime());
        }
    }

    _matchData.MatchCount = _matchData.MatchList.items.length;
    loadOdds();
}

function loadOdds() {
    bomHelper.ajaxXml("/gf/data/odds/en/goal" + Config.Company + ".xml", true, RefreshOdds); //update odds
}

function RefreshOdds(oddsData) {
    var oddsItem, mItem, lItem, coItem;
    _matchData.OddsList = new _glModel.List();

    var arrM = oddsData.getElementsByTagName("m");
    for (var i = 0; i < arrM.length; i++) {
        var m = arrM[i];
        var xml;
        if (m.innerHTML)
            xml = m.innerHTML;
        else
            xml = m.textContent;

        oddsItem = new _glModel.Odds(xml);

        mItem = lItem = coItem = null;
        mItem = _matchData.MatchList.Get(oddsItem.mId);

        if (mItem)
            _matchData.OddsList.Add(oddsItem.mId, oddsItem);

        if (oddsItem.valid()) {
            if (mItem) {
                lItem = _matchData.LeagueList.Get(mItem.lId);
                coItem = _matchData.CountryList.Get(mItem.cId);
            }
            if (lItem) {
                lItem.oddsNum++;
            }
            if (coItem) {
                coItem.oddsNum++;
            }
        }
    }

    MakeTable();

    if (!_isLoaded) {
        _isLoaded = true;
        fixedHeight && fixedHeight();
        ScrollToLocate();
        showCountDefer();
        setInterval("UpdateMatchTime()", 30000);
        setInterval("ReloadAll()", Config.UpdateAll);
        window.setTimeout("RefreshChange()", Config.UpdateChangeDuretion);
        window.setTimeout("RefreshOddsChange()", Config.UpdateOddsChangeDuretion);
    }
}


function MakeTable() {
    //console.log(new Date());
    _lastDate = null;
    var html = new Array();
    var topHtml = new Array(); // 场赛程
    var frontHtml = new Array(); //靠前赛程
    var resultsHtml = new Array(); //完场赛事
    var bottomeHtml = new Array(); // 其他赛程
    var curHtml = null;

    var hideCount = 0;
    var hiddenLeaIds = Config.getHiddenLeagueIds().split(",");
    var hiddenConIds = Config.getHiddenCountryIds().split(",");

    var validHdpGoals = Config.getGoalOddsHdp();
    var validOuGoals = Config.getGoalOddsOu();
    validHdpGoals = validHdpGoals ? validHdpGoals.split(",") : [];
    validOuGoals = validOuGoals ? validOuGoals.split(",") : [];
    var hasFilterById = 0;

    var topIds = Config.getTopIds().split(",");
    var favLeagueIds = Config.getFavLeagueIds().split(",");
    AllSimplifyNum = 0;
    _matchData.MatchCount = _matchData.MatchList.items.length;
    _matchData.SclassCount = _matchData.LeagueList.items.length;
    var matchItems = _matchData.MatchList.items;
    var sclassTags = new Array();
    var sclassTagsTop = new Array();
    var byLeaTop_Obj = {};
    var lastLItem = null;
    CheckFilterLevel();
    for (var i = 0; i < matchItems.length; i++) {
        var mItem = matchItems[i];
        var lItem = _matchData.LeagueList.Get(mItem.lId);
        mItem.isShow = true;
        if (lItem == null) mItem.isShow = false;

        if (lItem.type)
            AllSimplifyNum++;

        if (Config.FavFilterType) {
            if (Config.FavFilterType == 1 && favLeagueIds.indexOf(lItem.lId.toString()) == -1) {
                mItem.isShow = false;
            } else if (Config.FavFilterType == 2 && topIds.indexOf(mItem.mId.toString()) == -1) {
                mItem.isShow = false;
            }
        } else if (Config.Level == 1 && lItem.type != 1) {
            mItem.isShow = false;
        } else if (hiddenLeaIds.contains(mItem.lId) || hiddenConIds.contains(mItem.cId)) {
            mItem.isShow = false;
            hasFilterById = 1;
        }

        var oItem = _matchData.OddsList.Get(mItem.mId);

        mItem.hasOdds = oItem ? 1 : 0;

        if (Config.FilterOdds && (!oItem || !oItem.valid())) {
            mItem.isShow = false;
            hasFilterById = 1;
        }

        if (Config.FilterType == 3) {
            var pan = oItem ? oItem.letgoal : "";
            pan = !pan && pan !== "0" ? "null" : pan;
            if (validHdpGoals.length != 0 && !validHdpGoals.contains(pan)) {
                mItem.isShow = false;
                hasFilterById = 1;
            }

            var pan = oItem ? oItem.ou : "";
            pan = !pan && pan !== "0" ? "null" : pan;
            if (validOuGoals.length != 0 && !validOuGoals.contains(pan)) {
                mItem.isShow = false;
                hasFilterById = 1;
            }
        }

        if (!mItem.isShow) {
            hideCount++;
            continue;
        };

        mItem.isTop = topIds.contains(mItem.mId);
        lItem.isTop = favLeagueIds.contains(lItem.lId);

        //if (!lItem.collapsed) {
        //    lItem.collapsed = leaCollapsedDefault(lItem);
        //}
        var isTop = Config.MarkTopFav && mItem.isTop;
        if (Config.OrderByMatch) {
            var sTag = lItem.isTop ? sclassTagsTop : sclassTags;
            //collect for group
            var flag = lItem.index;
            var sclassHtml = sTag[flag];
            var mHtml = GetMatchHtml(mItem, lItem, oItem);
            if (isTop)
                byLeaTop_Obj[flag] = (byLeaTop_Obj[flag] || 0) + 1;
            if (sclassHtml) {
                if (isTop)
                    sclassHtml.splice(byLeaTop_Obj[flag], 0, mHtml);
                else sclassHtml.push(mHtml);
            } else {
                sclassHtml = new Array();
                AddLeagueGroupHeader(lItem, sclassHtml);
                sclassHtml.push(mHtml);
                sTag[flag] = sclassHtml;
            }
        } else {
            if (isTop)
                curHtml = topHtml;
            else if (mItem.State > 0)
                curHtml = frontHtml;
            else if (mItem.State == -1)
                curHtml = resultsHtml;
            else if (mItem.State < -1)
                curHtml = bottomeHtml;
            else curHtml = html;

            if (lastLItem != lItem) {
                curHtml.push(AddLeagueHeader(lItem))
            }

            curHtml.push(GetMatchHtml(mItem, lItem, oItem));
        }
        lastLItem = lItem;
    }
    if (Config.OrderByMatch) {
        for (var i = 0; i < sclassTagsTop.length; i++) {
            var sclassHtml = sclassTagsTop[i];
            if (sclassHtml && sclassHtml.length)
                html.push(sclassHtml.join(""));
        }
        for (var i = 0; i < sclassTags.length; i++) {
            var sclassHtml = sclassTags[i];
            if (sclassHtml && sclassHtml.length)
                html.push(sclassHtml.join(""));
        }
    }

    if (_matchData.MatchCount == 0) {
        var finterMsg = _LiveOnly ? Msg_NoLiveMatch : Msg_NoMatch;
        var _tplMsgBox = _$("tplMsgBox").innerHTML;
        var msg = buildTags(_tplMsgBox, {
            message: finterMsg
        });
        html.push(msg);
    }

    if (_matchData.MatchCount != 0 && hideCount == _matchData.MatchCount) {
        var finterMsg = _locModel.T.T_MSG_FilteringNoMatches || "No record, please change the filter condiction.";
        var _tplMsgBox = _$("tplMsgBox").innerHTML;
        var msg = buildTags(_tplMsgBox, {
            message: finterMsg
        });
        html.push(msg);
    }

    var totalHtml = topHtml.concat(frontHtml).concat(html).concat(resultsHtml).concat(bottomeHtml).concat(BuildAds());

    document.getElementById("gameList").innerHTML = totalHtml.join("");

    if (!hasFilterById) {
        if (Config.Level == 1) {
            addClass(_$("btnFilter"), "active");
        } else {
            removeClass(_$("btnFilter"), "active");
        }

        removeClass(_$("btnFilter"), "on");
    } else {
        addClass(_$("btnFilter"), "on");
        addClass(_$("btnFilter"), "active");
    }

    var filterCount = _$("filterCount");
    if (filterCount) filterCount.innerHTML = hideCount;

    $(".leaRow").click(function() {
        //cancel bubble
        cancelBubble();
        var href = this.getAttribute("href");
        if (href) {
            location.href = href;
            //window.open(href);
        }
        return false;
    });
    refreshDays();
    MoveResultBar();
    onOrderChanged();
    RefreshAds();
    //refreshLea();
    refreshLazyImg();
    setHiddenCount(hideCount);

    if (window.onMatchRender)
        onMatchRender();

    //console.log(new Date());
}

var _tplLeaHead = null;

function AddLeagueGroupHeader(lItem, groupHtml) {
    if (!_tplLeaHead) _tplLeaHead = _$("tplLeaHeader").innerHTML;

    var html = buildTags(_tplLeaHead, new _glModel.ViewLeague(lItem));

    //add header to the first child of groupHtml
    //in order to add ads correctly
    groupHtml[0] = html + (groupHtml[0] || "");
}

var _adLine = 0;

function BuildAds(htmls) {
    var totalArr = new Array();
    var rowIndex = 0;
    _adLine = 0;

    if (typeof(curAdList) != "undefined" && curAdList != null && curAdList.length > _adLine) {
        for (var i = _adLine; i < curAdList.length; i++) {
            totalArr.push(GetAdContent(i));
        }
    }

    return totalArr;
}

function GetScoreAd(rowIndex) {
    var ret = "";
    if (rowIndex == 1) {
        ret = GetAdContent(_adLine);
        _adLine++;
    } else if (_adLine != 0 && rowIndex == (2 * _adLine + 1)) {
        ret = GetAdContent(_adLine);
        _adLine++;
    }
    return ret;
}


function RefreshAds() {
    var adTpl = _$("adTpl") ? _$("adTpl").innerHTML : "";
    var adTxtTpl = _$("adTxtTpl") ? _$("adTxtTpl").innerHTML : "";
    if (!adTpl || !adTxtTpl) return;
    var content = _$("gameList");
    var oldAdList = content.getElementsByClassName("ad");
    for (var i = 0; i < oldAdList.length; i++) {
        oldAdList[0].remove();
    }
    var items = content.getElementsByClassName("item");
    var itemsList = new Array();
    for (var i = 0; i < items.length; i++) {
        if (items[i].style.display != "none") {
            itemsList.push(items[i]);
        }
    }

    for (var i = 0; i < itemsList.length; i++) {
        if (i % 2 != 1 || i == 0) continue;
        itemsList[i].insertAdjacentHTML("afterend", adTxtTpl);
        itemsList[i].insertAdjacentHTML("afterend", adTpl);
    }
    if (typeof(loadAd) != "undefined") loadAd();
}

var _tplRow = null;
var _tplRowByLea = null;

function GetMatchHtml(mItem, lItem, oItem) {

    var mId = mItem.mId;

    var _tplRow = tplRow.replace("{$oddsTpl}", getOddsTpl());

    var exDisplay = "style='display:none;'";
    if (mItem.explain) exDisplay = "";

    var oArr = new Array();
    var arr_oddsType = [];
    if (oItem != null) {
        var oddsOrgSort = defConfig.oddsOrgSort;
        for (var ii = 0; ii < oddsOrgSort.length; ii++) {
            switch (Config.OddsShow & oddsOrgSort[ii]) {
                case 1:
                    oArr = oArr.concat(oTool.getPL(Config.OddsFormat, ToFixed(oItem.homeOdds), Goal2GoalT(oItem.letgoal, 1), ToFixed(oItem.awayOdds)));
                    break;
                case 8:
                    oArr = oArr.concat(oTool.getPL(Config.OddsFormat, ToFixed(oItem.over), Goal2GoalT(oItem.ou), ToFixed(oItem.under)));
                    break;
                case 2:
                    oArr = oArr.concat(oTool.getPL(Config.OddsFormat, ToFixed(oItem.hOp), ToFixed(oItem.dOp), ToFixed(oItem.aOp), true));
                    break;
            }
        }
    } else {
        oArr = ["&nbsp;", "&nbsp;", "&nbsp;", "&nbsp;", "&nbsp;", "&nbsp;"];
    }

    var rowItem = new _glModel.ViewMatch(mItem, lItem, oItem, oArr);

    scoreUtil.setName(rowItem);
    return buildTags(_tplRow, rowItem);
}

var _lastDate = "";

function refreshDays() {

    if (Config.OrderByMatch) {
        $("[data-day]").hide();
        return;
    }

    var dn = new Date();
    _lastDate = "{0}_{1}_{2}".format(dn.getFullYear(), dn.getMonth(), dn.getDate());
    var dayrows = $("[data-day]");

    for (var i = 0; i < dayrows.length; i++) {
        var dItem = dayrows[i];
        var dateText = dItem.getAttribute("data-day");
        if (!dateText) continue;

        if (_lastDate != dateText) {
            var ts = dateText.split("_");
            var t = new Date(ts[0], ts[1], ts[2]);
            dItem.innerHTML = ToDateTimeString(t, 1);
            _lastDate = dateText;
            removeClass(dItem, "hide");
        } else
            addClass(dItem, "hide");
    }
}

function getTvNode(m) {
    return "";
}

function onWeightChanged(mItem, matchId, refreshAd) {
    if (!mItem) {
        mItem = _matchData.MatchList.Get(matchId);
    }

    var mId = mItem.mId;
    var hiddenLeagueIds = Config.getHiddenLeagueIds().split(",");

    var lastWeight = 0;
    var lastmId = mId;

    if (Config.OrderByMatch) {
        for (var i = 0; i < _matchData.MatchList.items.length; i++) {
            var cItem = _matchData.MatchList.items[i];

            //if (!cItem.isTop)
            if (cItem.mId == mId) continue;

            if (cItem.lId != mItem.lId) continue;

            if (cItem.isShow && cItem.Weight() < mItem.Weight() &&
                (cItem.Weight() > lastWeight || lastWeight == 0)) {
                lastWeight = cItem.Weight();
                lastmId = cItem.mId;
            }
        }
    } else {
        for (var i = 0; i < _matchData.MatchList.items.length; i++) {
            var cItem = _matchData.MatchList.items[i];

            if (!cItem.isTop)
                if (cItem.mId == mId || hiddenLeagueIds.contains((cItem.lId + "_" + cItem.type))) continue;

            if (cItem.isShow && cItem.Weight() < mItem.Weight() &&
                (cItem.Weight() > lastWeight || lastWeight == 0)) {
                lastWeight = cItem.Weight();
                lastmId = cItem.mId;
            }
        }
    }

    var contentObj = document.getElementById("gameList");

    var childNode = document.getElementById("tb_" + mId);
    if (childNode == null) return;

    contentObj.removeChild(childNode);

    if (lastmId != mId) {
        var belowsObj = document.getElementById("tb_" + lastmId);
        contentObj.insertBefore(childNode, belowsObj);
    } else if (!mItem.isTop || lastWeight == 0) {

        if (!Config.OrderByMatch) {
            contentObj.appendChild(childNode);
        } else {
            var lastGroupItem = $("#expc_" + mItem.lId);
            var groupItems = $("[data-mlid=" + mItem.lId + "]");
            for (var i = groupItems.length - 1; i >= 0; i--) {
                if (groupItems[i].id.indexOf(mId.toString()) == -1) {
                    lastGroupItem = groupItems[i];
                    break;
                }
            }
            lastGroupItem.after(childNode);
        }
    } else {
        contentObj.insertBefore(childNode, contentObj.childNodes[0]);
    }

    MoveResultBar();

    if (refreshAd) {
        RefreshAds();
    }

    refreshLea();
}

function UpdateMatchTime() {
    for (var i = 0; i < _matchData.MatchList.items.length; i++) {
        var mItem = _matchData.MatchList.items[i];
        //skip other status, be noted to update state text in changed event 
        if (mItem.State == 1 || mItem.State == 3) {
            var matchState = GetMatchState(mItem.State, mItem.MatchTime);
            var elem = document.getElementById("state_" + mItem.mId);
            if (elem) elem.innerHTML = matchState;
            var elem_s = document.getElementById("state_s_" + mItem.mId);
            if (elem_s) elem_s.innerHTML = matchState;
        }
    }
}

function GetMatchState(mState, startTime) {
    var ms = "";
    switch (mState) {
        case 5:
            ms = _locModel.T.T_Stat_S_Pen;
            break; //点球
        case 4:
            ms = _locModel.T.T_Stat_S_OverTime;
            break; //加时
        case 3:
            ms = _locModel.T.T_Stat_S_Part2;
            break; //下半场
        case 2:
            ms = _locModel.T.T_HT;
            break; //中场
        case 1:
            ms = _locModel.T.T_Stat_S_Part1;
            break; //上半场
        case 0:
            ms = _locModel.T.T_Stat_S_ToBeStart || "&nbsp;";
            break; //未开
        case -1:
            ms = _locModel.T.T_Stat_FT;
            break; //完
        case -10:
            ms = _locModel.T.T_Stat_S_Cancel;
            break; //取消
        case -11:
            ms = _locModel.T.T_Stat_S_Pending;
            break; //待定
        case -12:
            ms = _locModel.T.T_Stat_S_Abd;
            break; //腰砍
        case -13:
            ms = _locModel.T.T_Stat_S_Pause;
            break; //中断
        case -14:
            ms = _locModel.T.T_Stat_Postp;
            break; //推迟
    }
    var mIcon = "<i class='mit'><img src='/images/com/in_red.gif' width='3' height='8'></i>";
    var serverTime = bomHelper.getNowTime().getTime() / 1000 - timeDiff;
    if (mState == 1) {
        var df = (serverTime - startTime.getTime() / 1000) / 60;
        df = parseInt(df);
        if (df <= 0) {
            ms = "1" + mIcon;
        } else if (df <= 45) {
            ms = df.toString() + mIcon;
        } else {
            ms = "45+" + mIcon;
        }
    } else if (mState == 3) {
        var df = (serverTime - startTime.getTime() / 1000) / 60 + 46;
        //由于不确定它计算出来的数据一定准确，所以做多几个判断
        df = parseInt(df);
        if (df <= 46) {
            ms = "46" + mIcon;
        } else if (df <= 90) {
            ms = df.toString() + mIcon;
        } else {
            ms = "90+" + mIcon;
        }
    }
    return "<span class='red'>" + ms + "</span>";
}

var oldChXml = "";

function RefreshChange() {
    bomHelper.ajaxGet("/gf/phone/livechange.txt", function(data) {
        if (data == "" || data == "!" || oldChXml == data) {
            return;
        }

        oldChXml = data;

        var arrData = data.split("!");
        var isWinPopup = true;
        var isRedWinPopup = false;

        var goalPopArr = new Array();
        var redPopArr = new Array();
        var soundType = 0;

        for (var i = 0; i < arrData.length; i++) {
            var isStateChanged = false;
            var isHomeScoreChanged = false;
            var isAwayScoreChanged = false;
            var isRedChanged = false;
            var htScoreChanged = false;

            var cItem = new _glModel.chMatch(arrData[i]);

            var mItem = _matchData.MatchList.Get(cItem.mId);
            if (mItem == null) {
                if (_LiveOnly)
                    ReloadAll();
                else
                    continue;
            }

            var cVal = cItem.hYellow != "0" ? "<i>" + cItem.hYellow + "</i>" : "";
            checkChange(cItem, mItem, "hYellow", "hY_", cVal);

            cVal = cItem.gYellow != "0" ? "<i>" + cItem.gYellow + "</i>" : "";
            checkChange(cItem, mItem, "gYellow", "gY_", cVal);

            if (checkChange(cItem, mItem, "hScore", "hsc_", cItem.hScore)) {
                isHomeScoreChanged = _.ChangeScore(mItem.mId, true) && (!Config.NotifyBy || mItem.isTop);
            }

            if (checkChange(cItem, mItem, "gScore", "gsc_", cItem.gScore)) {
                isAwayScoreChanged = _.ChangeScore(mItem.mId, false) && (!Config.NotifyBy || mItem.isTop);
            }

            cVal = cItem.hRed != "0" ? "<i>" + cItem.hRed + "</i>" : "";
            if (checkChange(cItem, mItem, "hRed", "hR_", cVal)) {
                if (!Config.NotifyBy || mItem.isTop) {
                    isRedChanged = true;
                    if (Config.PopRedCard) {
                        redPopArr.push(GetPopRedRow(mItem, true));
                    }
                }
            }

            cVal = cItem.gRed != "0" ? "<i>" + cItem.gRed + "</i>" : "";
            if (checkChange(cItem, mItem, "gRed", "gR_", cVal)) {
                if (!Config.NotifyBy || mItem.isTop) {
                    isRedChanged = true;

                    if (Config.PopRedCard) {
                        redPopArr.push(GetPopRedRow(mItem, false));
                    }
                }
            }

            if (cItem.hasCorner) {
                if (mItem.hCorner != cItem.hCorner || mItem.gCorner != cItem.gCorner) {
                    mItem.hCorner = cItem.hCorner;
                    mItem.gCorner = cItem.gCorner;
                    var elem = _$("cn_" + cItem.mId);
                    if (elem) elem.setAttribute("class", "");
                    elem = _$("corner_" + cItem.mId);
                    if (elem) elem.innerHTML = cItem.hCorner + "-" + cItem.gCorner;

                    if (window._ScoreOnly) {
                        elem = _$("hcn_" + cItem.mId);
                        if (elem) elem.innerHTML = mItem.hCorner;
                        elem = _$("gcn_" + cItem.mId);
                        if (elem) elem.innerHTML = mItem.gCorner;
                    }
                }
            }

            // update ht score property
            if (mItem.hHalfScore != cItem.hHalfScore || mItem.gHalfScore != cItem.gHalfScore) {
                htScoreChanged = true;
                mItem.hHalfScore = cItem.hHalfScore;
                mItem.gHalfScore = cItem.gHalfScore;
            }

            mItem.mTime = cItem.mTime;
            mItem.mTime2 = cItem.mTime2;
            mItem.MatchTime = cItem.MatchTime;
            if (mItem.DisplayTime != cItem.DisplayTime) {
                mItem.DisplayTime = cItem.DisplayTime;
                var em = _$("mt_" + mItem.mId);
                if (em) em.innerHTML = mItem.DisplayTime;
            }

            if (mItem.State != cItem.State) {
                if (mItem.State == 0 && cItem.State > 0) {
                    if (cItem.hScore == 0) {
                        var em = _$("hsc_" + mItem.mId);
                        if (em) em.innerHTML = 0;
                        var em = _$("hhs_" + mItem.mId);
                        if (em) em.innerHTML = 0;
                    }
                    if (cItem.gScore == 0) {
                        var em = _$("gsc_" + mItem.mId);
                        if (em) em.innerHTML = 0;
                        var em = _$("ghs_" + mItem.mId);
                        if (em) em.innerHTML = 0;
                    }

                    if (mItem.hasCorner && (mItem.State > 0 || mItem.State == -1)) {
                        var elem = _$("cn_" + mItem.mId);
                        if (elem) elem.style.display = "";
                    }
                }

                if (cItem.State == -1 && cItem.hScore != cItem.gScore) {
                    var scoreCss = parseInt(cItem.hScore) > parseInt(cItem.gScore) ? "hft" : "gft";
                    $("#tb_" + mItem.mId + " .team").addClass(scoreCss);
                }

                //revert match state to actived
                if (cItem.State >= 0 && mItem.State <= -1) {
                    isStateChanged = true;
                }

                mItem.State = cItem.State;

                // show ht score after ht
                if (mItem.State > 1 || mItem.state == -1) {
                    htScoreChanged = true;
                    //elem = _$("hts_" + cItem.mId); if (elem) elem.innerHTML = "HT " + cItem.hHalfScore + ":" + cItem.gHalfScore;
                }

                var matchState = GetMatchState(mItem.State, mItem.MatchTime);
                var stateObj = document.getElementById("state_" + mItem.mId);
                if (stateObj) stateObj.innerHTML = matchState;
                var stateObj_s = document.getElementById("state_s_" + mItem.mId);
                if (stateObj_s) stateObj_s.innerHTML = matchState;

                var clName = getRowCss(mItem.State);

                var containObj = document.getElementById("tb_" + mItem.mId);
                if (containObj) {
                    var hasfixh = containObj.getAttribute("class").indexOf("fixh") != -1;
                    containObj.setAttribute("class", clName + " item " + (hasfixh ? "fixh" : ""));
                }

                if (!isStateChanged)
                    isStateChanged = (mItem.State <= -1);

                if (cItem.explain) {
                    var explain = explainList(cItem.explain, mItem.hName, mItem.gName);
                    if (explain) {
                        var elemEx = document.getElementById("exList_" + mItem.mId);
                        if (elemEx) {
                            elemEx.innerHTML = explain;
                            elemEx.style.display = "";
                        }
                    }
                }
            }

            if (isHomeScoreChanged || isAwayScoreChanged) {
                if (Config.PopWin && goalPopArr.length < 3)
                    goalPopArr.push(GetPopGoalWinRow(mItem, isHomeScoreChanged, isAwayScoreChanged));
            }

            // show ht score after ht
            if (htScoreChanged) {
                elem = _$("hts_" + cItem.mId);
                if (elem) elem.innerHTML = _locModel.T.T_S_HTScore + " " + cItem.hHalfScore + "-" + cItem.gHalfScore;

                elem = _$("hht_" + cItem.mId);
                if (elem) elem.innerHTML = cItem.hHalfScore;

                elem = _$("ght_" + cItem.mId);
                if (elem) elem.innerHTML = cItem.gHalfScore;

                elem = _$("htit_" + cItem.mId);
                if (elem) elem.innerHTML = (cItem.State > 2 || cItem.State == -1 ? _locModel.T.T_S_HTScore : "");
            }

            if (isHomeScoreChanged) {
                PlaySound(0)
                soundType = 1;
            }
            if (isAwayScoreChanged) {
                PlaySound(1)
            }

            if (isRedChanged) {
                PlaySound(2);
            }

            if (isStateChanged) {
                //完场赛事置底
                setTimeout("onWeightChanged(''," + mItem.mId + ", 1)", 4000);
                //onWeightChanged(mItem);
            }
        }


        if (Config.PopWin && goalPopArr.length != 0) {
            _$("ppDiv").innerHTML = "<div>" + goalPopArr.join("") + "</div>";
            _$("popLayer").style.display = "";
            setTimeout("hidePopup('popLayer')", 10000);
        }

        if (Config.PopRedCard && redPopArr.length != 0) {
            _$("ppRedDiv").innerHTML = "<div>" + redPopArr.join("") + "</div>";
            _$("popLayer").style.display = "";
            setTimeout("hidePopup('popLayer')", 10000);
        }
    });

    window.setTimeout("RefreshChange()", Config.UpdateChangeDuretion);
}


function buildTags(tpl, data) {
    return tpl.replace(/\{\$(\w+)\}/g, function(a, b) {
        return (b in data) ? data[b] : "";
    });
}

var oldChOddsXml = "";

function RefreshOddsChange() {
    var chGoalFile = "/gf/data/odds/en/ch_goal" + Config.Company + ".xml";
    bomHelper.ajaxXml(chGoalFile, true, function(data) {

        if (data == "" || oldChOddsXml == data) {
            return;
        }

        oldChOddsXml = data;

        var arrM = data.getElementsByTagName("m");
        for (var i = 0; i < arrM.length; i++) {
            var m = arrM[i];
            var xml;
            if (m.innerHTML)
                xml = m.innerHTML;
            else
                xml = m.textContent;

            var cItem = new _glModel.Odds(xml);

            var oItem = _matchData.OddsList.Get(cItem.mId);
            if (!oItem) {
                var mItem = _matchData.MatchList.Get(cItem.mId);
                if (mItem) {
                    oItem = new _glModel.Odds(cItem.mId.toString());
                    _matchData.OddsList.Add(cItem.mId, cItem);
                    var lItem = _matchData.LeagueList.Get(mItem.lId);
                    if (lItem) lItem.oddsNum++;
                    var coItem = _matchData.CountryList.Get(mItem.cId);
                    if (coItem) coItem.oddsNum++;
                } else continue;
            }

            var oArr = new Array();
            var pArr = new Array();

            var oddsOrgSort = defConfig.oddsOrgSort;

            for (var ii = 0; ii < oddsOrgSort.length; ii++) {
                switch (Config.OddsShow & oddsOrgSort[ii]) {
                    case 1:
                        oArr = oArr.concat(oTool.getPL(Config.OddsFormat, ToFixed(cItem.homeOdds), Goal2GoalT(cItem.letgoal, 1), ToFixed(cItem.awayOdds)));
                        pArr = pArr.concat(["homeOdds", "letgoal", "awayOdds"]);
                        break;
                    case 8:
                        oArr = oArr.concat(oTool.getPL(Config.OddsFormat, ToFixed(cItem.over), Goal2GoalT(cItem.ou), ToFixed(cItem.under)));
                        pArr = pArr.concat(["over", "ou", "under"]);
                        break;
                    case 2:
                        oArr = oArr.concat(oTool.getPL(Config.OddsFormat, ToFixed(cItem.hOp), ToFixed(cItem.dOp), ToFixed(cItem.aOp), true));
                        pArr = pArr.concat(["hOp", "dOp", "aOp"]);
                        break;
                }
            }
            if (cItem.letgoal != oItem.letgoal || cItem.letgoal == "0" && (cItem.homeOdds != oItem.homeOdds || cItem.awayOdds != oItem.awayOdds)) {
                onHdpChanged(oItem.mId, oItem.letgoal, cItem.letgoal, cItem.homeOdds, cItem.awayOdds);
            }

            for (var j = 0; j < oArr.length; j++) {
                checkOddsChanged(oItem, cItem, pArr[j], "o" + (j + 1) + "_", oArr[j]);
            }
        }
    });

    window.setTimeout("RefreshOddsChange()", Config.UpdateOddsChangeDuretion);
}

function checkOddsChanged(oItem, cItem, prop, plex, cellVal) {
    if (cItem[prop] != oItem[prop]) {
        if (plex != "") {
            elem = _$(plex + oItem.mId);
            if (elem) {
                elem.innerHTML = cellVal;

                var nV = parseFloat(cItem[prop]).toFixed(2);
                var oV = parseFloat(oItem[prop]).toFixed(2);

                elem.setAttribute("class", (parseFloat(nV) > parseFloat(oV) ? "o-up" : "o-down"));
                setTimeout("resetOddsColor('" + plex + oItem.mId + "')", 8000);
            }
        }

        oItem[prop] = cItem[prop];

        return true;
    }
    return false;
}

//重置颜色
function resetColor(sid) {
    var elem = document.getElementById(sid);
    if (elem) elem.setAttribute("class", "name");
}

function resetOddsColor(sid) {
    var oj = document.getElementById(sid);
    if (oj) oj.setAttribute("class", "");
}

function checkChange(cItem, mItem, prop, plex, cellVal) {
    if (!mItem || !cItem) return false;
    if (cItem[prop] != mItem[prop]) {
        mItem[prop] = cItem[prop];
        elem = _$(plex + mItem.mId);
        if (elem) {
            elem.innerHTML = cellVal;
        }
        return true;
    }
    return false;
}

var _urlWithName = 0;

var _filterGroups = _.filterGroups();

function initFGroup() {
    _filterGroups.Init();
}

function getFilterGroup(name) {
    return _filterGroups.Find(name);
}

function CollectLeaguesForFilter() {
    initFGroup();

    var hiddenIds = Config.getHiddenLeagueIds().split(",");
    var hideCount = 0;
    var favIds = Config.getFavLeagueIds().split(",");
    for (var i = 0; i < _matchData.LeagueList.items.length; i++) {
        var lItem = _matchData.LeagueList.items[i];

        var isOn = false;

        if (Config.FilterType == FilterModel.TempFilterType) {
            isOn = !hiddenIds.contains(lItem.lId);

            if (Config.Level == 1 && lItem.type != 1)
                isOn = false;
        } else if (Config.FilterType == 0) {
            //check by Config.Level as default
            if (Config.Level == 1 && lItem.type == 1)
                isOn = 1;
            else if (Config.Level == 0) {
                isOn = 1;
            }
        }

        if (isOn && FilterModel.TempFilterOdds) {
            hideCount += (lItem.matchNum - lItem.oddsNum);
        }

        if (!isOn) {
            hideCount += lItem.matchNum;
        }

        var fGroup = getFilterGroup(lItem.fullName);
        if (favIds.indexOf(lItem.lId.toString()) != -1) {
            //my leagues
            fGroup = _filterGroups.my;
        } else if (lItem.type == 1) {
            fGroup = _filterGroups.hot;
        }

        fGroup.items.push({
            Id: lItem.lId,
            name: lItem.fullName,
            isOn: isOn,
            mNum: lItem.matchNum,
            oNum: lItem.oddsNum
        });
    }
    buildGroupList();

    _$("visibleCount").innerHTML = _matchData.MatchCount - hideCount;
}

var _fplrowTpl = null;

function buildGroupList() {
    var fg_idx = 0;
    var htmlSimp = new Array();
    var htmlOther = new Array();
    var showOdds = FilterModel.TempFilterOdds;
    _fplrowTpl = _fplrowTpl || _$("fplrowTpl").innerHTML;
    var favLeagueIds = Config.getFavLeagueIds().split(",");

    for (var i = 0; i < _filterGroups.all.length; i++) {
        var fGroup = _filterGroups.all[i];
        if (fGroup.items.length == 0) continue;

        fg_idx++;
        htmlSimp.push("<div class='title' id='fG_" + fg_idx + "'>" + fGroup.name + "</div><div name='fgl' id='fgl_" + fg_idx + "'>");

        for (var j = 0; j < fGroup.items.length; j++) {
            var fItem = fGroup.items[j];
            fItem.con = showOdds ? fItem.oNum : fItem.mNum;
            fItem.onCls = (fItem.isOn ? "on" : "");
            fItem.topCls = (favLeagueIds.indexOf(fItem.Id.toString()) != -1 ? "on" : "")
            htmlSimp.push(buildTags(_fplrowTpl, fItem));
        }
        htmlSimp.push("</div>");

        //htmlOther.push("<a id='fO_" + fg_idx + "' onclick='scrollToItem(" + fg_idx + ")'>" + fGroup.name + "</a>");
    }

    _$("leaFilter_list").innerHTML = htmlSimp.join("");
    //_$("filterBoxOther").innerHTML = htmlOther.join("");
}

var _fgHashoffset = 0;

function scrollToItem(idx) {
    //_$("leaguesPop").scrollTo(0, _$("fG_" + idx).offsetTop - _fgHashoffset);
    var $targ = $("#leaguesPop");
    $targ.scrollTo((_$("fG_" + idx).offsetTop - $targ.position().top), 500);
}

function checkFilterItem(id, elem) {
    FilterModel.HasChanged = 1;

    var selected = 0;
    var clsP = FilterModel.TempFilterType == 1 ? "league " : "";

    if (!elem.getAttribute("class") || elem.getAttribute("class").indexOf("on") == -1) {
        selected = 1;
        elem.setAttribute("class", clsP + "on");
    } else {

        elem.setAttribute("class", clsP + "");
    }

    var mNum = elem.getAttribute("data-mnum");
    var oNum = elem.getAttribute("data-onum");
    var num = parseInt(FilterModel.TempFilterOdds ? oNum : mNum);
    var hcElem = _$("visibleCount");
    hcElem.innerHTML = parseInt(hcElem.innerHTML) + (selected ? num : -1 * num);
}

var _FilterHashHdp = new Hashtable();
var _FilterHashOu = new Hashtable();

function CollectGoalOddsForFilter() {
    _FilterHashHdp = new Hashtable();
    _FilterHashOu = new Hashtable();

    var getPan = function(o, k) {
        var p = "null";
        if (o != null && o[k] != "") p = o[k];
        return p;
    }
    for (var i = 0; i < _matchData.MatchList.items.length; i++) {
        var mItem = _matchData.MatchList.items[i];
        var oItem = _matchData.OddsList.Get(mItem.mId);

        var pan = getPan(oItem, "letgoal");
        if (_FilterHashHdp.contains(pan)) {
            var mVal = _FilterHashHdp.items(pan);
            mVal.num++;
            mVal.ids += "," + mItem.mId;
        } else
            _FilterHashHdp.add(pan, {
                num: 1,
                ids: mItem.mId.toString()
            });

        var pan = getPan(oItem, "ou");
        if (_FilterHashOu.contains(pan)) {
            var mVal = _FilterHashOu.items(pan);
            mVal.num++;
            mVal.ids += "," + mItem.mId;
        } else
            _FilterHashOu.add(pan, {
                num: 1,
                ids: mItem.mId.toString()
            });
    }

    var showHdp = (Config.OddsShow & 1) == 1;
    var showOu = (Config.OddsShow & 8) == 8;
    var hdpHtml = "";
    if (showHdp) {
        hdpHtml = BuildGoalOddsUL(1);
    }

    var ouHtml = "";
    if (showOu) {
        ouHtml = BuildGoalOddsUL(0);
    }

    _$("oddsFilter_list").innerHTML = hdpHtml + ouHtml;

    CalcHiddenForGoalOdds();
}

function CalcHiddenForGoalOdds() {
    var idsPoolHdp = new Array();
    var idsPoolOu = new Array();

    var goElems = $("[data-gotype]");
    for (var i = 0; i < goElems.length; i++) {
        var goElem = goElems[i];
        var hashType = goElem.getAttribute("data-gotype");
        var key = goElem.getAttribute("data-gokey");
        if (hasClass(goElem, "on")) {
            if (hashType == "1") {
                idsPoolHdp = idsPoolHdp.concat(_FilterHashHdp.items(key).ids.replace(/^,/, "").replace(/,$/, "").split(","));
            } else {
                idsPoolOu = idsPoolOu.concat(_FilterHashOu.items(key).ids.replace(/^,/, "").replace(/,$/, "").split(","));
            }
        }
    }

    var hideCount = 0;
    var showIds = new Array();
    if (idsPoolHdp.length == 0) showIds = idsPoolOu;
    else if (idsPoolOu.length == 0) showIds = idsPoolHdp;
    else showIds = ArrayIntersect(idsPoolHdp, idsPoolOu);

    if (idsPoolHdp.length == 0 && idsPoolOu.length == 0) hideCount = _matchData.MatchCount;
    else hideCount = _matchData.MatchCount - showIds.length;

    _$("visibleCount").innerHTML = _matchData.MatchCount - hideCount;
}

function BuildGoalOddsUL(isHdp, hashTable, showByKeys) {
    var html = new Array();
    var title = isHdp ? (_locModel.T.T_Handicap_odds || _locModel.T.T_Handicap) : _locModel.T.T_OverUnder;
    var filterHash = isHdp ? _FilterHashHdp : _FilterHashOu;
    var showByKeysVal = isHdp ? Config.getGoalOddsHdp() : Config.getGoalOddsOu();
    var keySorted = filterHash.keys().sort();
    showByKeysVal = "," + showByKeysVal + ",";

    html.push("<h2>" + title + "</h2>");
    html.push("<ul class='countryFilter oddsFilter'>");

    for (var i = 0; i < keySorted.length; i++) {
        var key = keySorted[i];
        var goItem = filterHash.items(key);

        var isOn = false;
        if (Config.FilterType == FilterModel.TempFilterType) {
            isOn = showByKeysVal.indexOf("," + key + ",") != -1;
        }

        var title = Goal2GoalT(key, isHdp);
        var addcls = "";
        if (title && title.indexOf("null") != -1) {
            title = _locModel.T.T_NoOdds;
            addcls = " noodds ";
        }

        var content = "<li onclick='checkGoalOddsItem(this)' class='" + (isOn ? "on" : "") + addcls + "' data-gotype=" + (isHdp ? 1 : 0) + "  data-gokey='" + key + "'><span class='cb'></span>" + title + "<i>(" + goItem.num + ")</i></li>";
        html.push(content);
    }

    html.push("</ul>");

    return html.join("");
}

function checkGoalOddsItem(elem) {
    FilterModel.HasChanged = 1;

    var selected = 0;

    if (!elem.getAttribute("class") || elem.getAttribute("class").indexOf("on") == -1) {
        selected = 1;
        addClass(elem, "on");
    } else {
        removeClass(elem, "on");
    }

    CalcHiddenForGoalOdds();
}

function onMatchRender() {
    var leaList = $(".expIcon.tri");
    var needEx = leaList.length;

    for (var i = 0; i < leaList.length; i++) {
        if (!hasClass(leaList[i], "up")) {
            needEx = 0;
            break;
        }
    }

    if (needEx) {
        expandleague($(".group-title").attr("data-leaId"));
    }
}

function sortConuntryList(clist) {
    var nlist = clist.slice(0, clist.length);
    nlist.sort(function(a, b) {
        var aw = a.name,
            bw = b.name;
        return aw == bw ? 0 : (aw > bw ? 1 : -1);
    });
    return nlist;
}

function CollectCountryForFilter() {
    var hiddenIds = Config.getHiddenCountryIds().split(",");
    var hideCount = 0;
    var html = new Array();
    var showOdds = FilterModel.TempFilterOdds;
    var clist = sortConuntryList(_matchData.CountryList.items);
    for (var i = 0; i < clist.length; i++) {
        var coItem = clist[i];

        var isOn = 0;

        if (Config.FilterType == FilterModel.TempFilterType) {
            isOn = !hiddenIds.contains(coItem.cId);
        }

        if (!isOn) {
            hideCount += coItem.matchNum;
        } else if (FilterModel.TempFilterOdds) {
            hideCount += (coItem.matchNum - coItem.oddsNum);
        }

        var con = showOdds ? coItem.oddsNum : coItem.matchNum;
        var content = "<li id='coBtn_" + coItem.cId + "' onclick='checkFilterItem(" + coItem.cId + ", this)' " + (isOn ? "class='on'" : "") + "  data-id='" + coItem.cId + "' data-mNum='" + coItem.matchNum + "' data-oNum='" + coItem.oddsNum + "'><span class='cb'></span>" + coItem.name + "<i id='fcBtn_num_" + coItem.cId + "'>(" + con + ")</i></li>";

        html.push(content);
    }
    _$("countryFilter_list").innerHTML = html.join("");
    _$("visibleCount").innerHTML = _matchData.MatchCount - hideCount;
}

//all-simply
function FilterByOption(opt) {
    Config.Level = 0;
    Config.FavFilterType = 0;
    if (!opt) {
        Config.Level = 0;
        //clear league/country filter cookie
        ClearAllFilter();
        CzcApi("Football", "Show All", Config.Level == 1 ? "Hot" : "All");
    }
    if (opt == 1) {
        Config.Level = 1;
        //clear league/country filter cookie
        ClearAllFilter();
        CzcApi("Football", "Show All", Config.Level == 1 ? "Hot" : "All");
    } else if (opt == 2 || opt == 3) {
        Config.FavFilterType = opt - 1; // 1 or 2
    }

    writeCookie(FilterByFavKey, Config.FavFilterType);
    writeCookie(FilterLevelKey, Config.Level);

    MakeTable();
}

//opt: 0: all 1:clear, 2: simply
function quickSelect(opt) {
    FilterModel.HasChanged = 1;

    var nodeList = null;
    if (FilterModel.TempFilterType == 1) {
        nodeList = _$("leaFilter_list").getElementsByTagName("li");
    } else if (FilterModel.TempFilterType == 2) {
        nodeList = _$("countryFilter_list").getElementsByTagName("li");
    } else {
        quickSelectGoalOdds(opt);
        return;
    }

    var hElem = _$("visibleCount");
    var noOddsCount = 0;
    var showCount = 0;
    for (var i = 0; i < nodeList.length; i++) {
        var nElem = nodeList[i];
        var lId = nElem.getAttribute("data-id")
        var mNum = nElem.getAttribute("data-mnum");
        if (!mNum) continue;
        var oNum = nElem.getAttribute("data-onum");

        mNum = parseInt(mNum);
        oNum = parseInt(oNum);

        var isOn = !opt;

        if (opt == 2) {
            isOn = _matchData.LeagueList.Get(lId).type == 1;
        }

        var clsP = FilterModel.TempFilterType == 1 ? "league " : "";
        nElem.setAttribute("class", clsP + (isOn ? "on" : ""));

        noOddsCount += (mNum - oNum);

        if (isOn)
            showCount += (FilterModel.TempFilterOdds ? oNum : mNum);
    }

    if (opt == 1) hElem.innerHTML = 0;
    else if (!opt) hElem.innerHTML = _matchData.MatchCount - (FilterModel.TempFilterOdds ? noOddsCount : 0);
    else if (opt == 2) {
        hElem.innerHTML = showCount;
    }
}

function quickSelectGoalOdds(opt) {
    if (opt == 0) {
        //all
        $("[data-gotype]").addClass("on");
        _$("visibleCount").innerHTML = _matchData.MatchCount;
    } else if (opt == 1) {
        //clear
        $("[data-gotype]").removeClass("on");
        _$("visibleCount").innerHTML = "0";
    }
}

function ConfirmFilter() {
    if (!FilterModel.HasChanged) {
        sFilter.hide();
        return;
    }

    var withHide = 0;
    if (FilterModel.TempFilterType == 1 || FilterModel.TempFilterType == 2) {
        withHide = ConfirmFilterIds();
    } else if (FilterModel.TempFilterType == 3) {
        withHide = ConfirmGoalOddsFilterKeys();
    }

    Config.FilterType = FilterModel.TempFilterType;
    Config.FilterOdds = FilterModel.TempFilterOdds ? 1 : 0;
    writeCookie(FilterTypeKey, Config.FilterType);
    writeCookie(OddsFilterKey, Config.FilterOdds);

    Config.Level = 0;

    writeCookie(FilterLevelKey, Config.Level);

    Config.FavFilterType = 0;
    writeCookie(FilterByFavKey, Config.FavFilterType);

    MakeTable();

    sFilter.hide();

    CzcApi("Football", "Confirm Filter", "");
}

function ConfirmFilterIds() {
    var nodeList = null;
    if (FilterModel.TempFilterType == 1) {
        nodeList = _$("leaFilter_list").getElementsByTagName("li");
    } else {
        nodeList = _$("countryFilter_list").getElementsByTagName("li");
    }

    var hiddenArr = new Array();
    for (var i = 0; i < nodeList.length; i++) {
        var nElem = nodeList[i];
        var mNum = nElem.getAttribute("data-mnum");
        if (!mNum) continue;

        var isOn = nElem.getAttribute("class") && nElem.getAttribute("class").indexOf("on") != -1;
        if (!isOn)
            hiddenArr.push(nElem.getAttribute("data-id"));
    }

    var forLea = FilterModel.TempFilterType == 1;
    Config.setHiddenLeagueIds(forLea ? hiddenArr : "");
    var forCon = FilterModel.TempFilterType == 2;
    Config.setHiddenCountryIds(forCon ? hiddenArr : "");

    Config.setGoalOddsHdp("");
    Config.setGoalOddsOu("");

    return hiddenArr.length != 0;
}

function ConfirmGoalOddsFilterKeys() {
    var goElems = $("[data-gotype]");
    var hdpKeys = new Array(),
        ouKeys = new Array();

    for (var i = 0; i < goElems.length; i++) {
        var goElem = goElems[i];
        if (hasClass(goElem, "on")) {
            var type = goElem.getAttribute("data-gotype");
            var key = goElem.getAttribute("data-gokey");
            if (type == "1") hdpKeys.push(key);
            else ouKeys.push(key);
        }
    }

    FilterModel.TempFilterOdds = 0;

    Config.setGoalOddsHdp(hdpKeys);
    Config.setGoalOddsOu(ouKeys);

    Config.setHiddenLeagueIds("");
    Config.setHiddenCountryIds("");

    return hdpKeys.length != 0 || ouKeys.length != 0;
}

//隐藏弹窗
function hidePopup(sid) {
    _$("ppDiv").innerHTML = "";
    _$("ppRedDiv").innerHTML = "";
    document.getElementById(sid).style.display = "none";
}

function ToFixed(val) {
    if (!val) return "&nbsp;";
    else return parseFloat(val).toFixed(2);
}

function ScrollToLocate() {
    var scrollHeight = Storage.getSession(ScollerKey);
    if (scrollHeight != null && scrollHeight != "") //滚动到上一次位置
    {
        setTimeout("window.scroll(0," + scrollHeight + ")", 100);
        Storage.setSession(ScollerKey, 0);
    }
}

function PlaySound(opt) {
    switch (opt) {
        case 2:
            if (Config.RedSound) _$("audio_red").play();
            break;
        case 0:
        case 1:
            if (Config.ScoreSound) _$(opt == 0 ? "audio_home" : "audio_away").play();
            break;
    }
}

function sound_init() {
    _ = window._ || {};
    if (_.loadSound)
        return false;
    _.loadSound = true;
    //主队声音
    var sound_arr = [];
    sound_arr.push('<audio id="audio_home" style="display: none" preload="auto">');
    sound_arr.push('<source src="/sound/sound' + Config.HomeAlert + '.mp3" type="audio/mpeg" />');
    sound_arr.push('<source src="/sound/sound' + Config.HomeAlert + '.ogg" type="audio/ogg" />');
    sound_arr.push('</audio>');
    if (!_$("audio_home")) {
        _$("soundsHome").innerHTML = sound_arr.join("");
    }
    //客队声音
    sound_arr = [];
    sound_arr.push('<audio id="audio_away" style="display: none" preload="auto">');
    sound_arr.push('<source src="/sound/sound' + Config.AwayAlert + '.mp3" type="audio/mpeg" />');
    sound_arr.push('<source src="/sound/sound' + Config.AwayAlert + '.ogg" type="audio/ogg" />');
    sound_arr.push('</audio>');
    if (!_$("audio_away")) {
        _$("soundsAway").innerHTML = sound_arr.join("");
    }

    //红牌声音
    sound_arr = [];
    sound_arr.push('<audio id="audio_red" style="display: none" preload="auto">');
    sound_arr.push('<source src="/sound/red.mp3" type="audio/mpeg" />');
    sound_arr.push('<source src="/sound/red.ogg" type="audio/ogg" />');
    sound_arr.push('</audio>');
    if (!_$("audio_red")) {
        _$("soundsRed").innerHTML = sound_arr.join("");
    }
    var u = navigator.userAgent;
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    var cEvent = isiOS ? "touchstart" : "click";
    var ifEnd = false;
    window.addEventListener(cEvent, function(e) {
        if (ifEnd)
            return;
        _$("audio_home").load();
        _$("audio_away").load();
        _$("audio_red").load();
        if (isiOS)
            ifEnd = true;
        else window.removeEventListener(e.type, arguments.callee, true);
    }, true);
}

function sound_update() {
    if (!_.loadSound)
        return false;
    //主队声音
    var sound_arr = [];
    sound_arr.push('<audio id="audio_home" style="display: none" preload="auto">');
    sound_arr.push('<source src="/sound/sound' + Config.HomeAlert + '.mp3" type="audio/mpeg" />');
    sound_arr.push('<source src="/sound/sound' + Config.HomeAlert + '.ogg" type="audio/ogg" />');
    sound_arr.push('</audio>');
    if (_$("audio_home")) {
        _$("soundsHome").innerHTML = sound_arr.join("");
    }
    //客队声音
    sound_arr = [];
    sound_arr.push('<audio id="audio_away" style="display: none" preload="auto">');
    sound_arr.push('<source src="/sound/sound' + Config.AwayAlert + '.mp3" type="audio/mpeg" />');
    sound_arr.push('<source src="/sound/sound' + Config.AwayAlert + '.ogg" type="audio/ogg" />');
    sound_arr.push('</audio>');
    if (_$("audio_away")) {
        _$("soundsAway").innerHTML = sound_arr.join("");
    }
}


function toggleOddsFilter() {
    FilterModel.HasChanged = 1;

    FilterModel.TempFilterOdds = (FilterModel.TempFilterOdds ^ 1);
    _$("filterByOdds").setAttribute("class", FilterModel.TempFilterOdds ? "toolMsg on" : "toolMsg");

    var nodeList = null;
    if (FilterModel.TempFilterType == 1) {
        nodeList = _$("leaguesPop").getElementsByTagName("div");
    } else {
        nodeList = _$("countryPop").getElementsByTagName("li");
    }

    var hElem = _$("visibleCount");
    var visibleCount = parseInt(hElem.innerHTML);
    for (var i = 0; i < nodeList.length; i++) {
        var nElem = nodeList[i];
        var mNum = nElem.getAttribute("data-mnum");
        if (!mNum) continue;

        var oNum = nElem.getAttribute("data-onum");
        var isOn = nElem.getAttribute("class") && nElem.getAttribute("class").indexOf("on") != -1;

        var addCount = FilterModel.TempFilterOdds ? (oNum - mNum) : (mNum - oNum);

        if (isOn) visibleCount += addCount;

        nElem.getElementsByTagName("i")[0].innerHTML = "(" + (FilterModel.TempFilterOdds ? oNum : mNum) + ")";
    }

    hElem.innerHTML = visibleCount;
}

function toggleFilterPop(opt, init) {
    if (!init) {
        FilterModel.TempFilterType = opt;
        FilterModel.HasChanged = 1;
    };

    var tElems = [_$("btnLeague"), _$("btnCountry"), _$("btnGoalOdds")];
    _$('toolSimp').style.display = "none";

    // 0:matchList, 1:league, 2.country, 3.odds
    if (opt == 1) {
        _$('leaFilter_list').style.display = "";
        _$('countryFilter_list').style.display = "none";
        _$("oddsFilter_list").style.display = "none";
        if (_$('toolSimp'))
            _$('toolSimp').style.display = "";
        CollectLeaguesForFilter();
    } else if (opt == 2) {
        _$('leaFilter_list').style.display = "none";
        _$('countryFilter_list').style.display = "";
        _$("oddsFilter_list").style.display = "none";
        CollectCountryForFilter();
    } else if (opt == 3) {
        _$('leaFilter_list').style.display = "none";
        _$('countryFilter_list').style.display = "none";
        _$("oddsFilter_list").style.display = "";

        CollectGoalOddsForFilter();
    }

    for (var i = 0; i < tElems.length; i++) {
        tElems[i].setAttribute("class", (i == (opt - 1) ? "tab on" : "tab"));
    }
}


function ClearAllFilter(init) {
    Config.FilterType = 0;
    Config.FilterOdds = 0;
    writeCookie(FilterTypeKey, 0);
    writeCookie(OddsFilterKey, Config.FilterOdds);
    Config.setHiddenLeagueIds("");
    Config.setHiddenCountryIds("");
    Config.setGoalOddsHdp("");
    Config.setGoalOddsOu("");
}

function NumofRank(val) {
    val = val.split(/(\d+)$/)[1] || "";
    return val ? "[" + val + "]" : "";
}

function getHdpStar() {
    return "";
}

function getVoteNode() {
    return "";
}

function onHdpChanged(mId, olg, nlg, hodds, godds) {

}

function MoveResultBar() {}

function OrderBy(opt) {
    if (opt === undefined) {
        opt = !Config.OrderByMatch;
    }

    Config.OrderByMatch = opt ? 1 : 0;
    writeCookie(OrderByKey, Config.OrderByMatch);
    onOrderChanged();

    ReloadAll();
}

function onOrderChanged() {
    if (Config.OrderByMatch) {
        addClass(_$("btnOrderBy"), "active");
    } else {
        removeClass(_$("btnOrderBy"), "active");
    }
}

///集合取交集
function ArrayIntersect() {
    var result = new Array();
    var obj = {};
    for (var i = 0; i < arguments.length; i++) {
        for (var j = 0; j < arguments[i].length; j++) {
            var str = arguments[i][j];
            if (!obj[str]) {
                obj[str] = 1;
            } else {
                obj[str]++;
                if (obj[str] == arguments.length) {
                    result.push(str);
                }
            } //end else
        } //end for j
    } //end for i
    return result;
}

function toSetting() {
    settingPop.getView(1, 0);
}

function onSettingChanged(s) {
    var zoneChanged = s.ZoneOffset != Config.ZoneOffset;
    Config.Init();

    if (s.changeLevel == 2) {
        ReloadAll();
    } else if (s.changeLevel == 1) {
        if (zoneChanged) {
            for (var i = 0; i < _matchData.MatchCount; i++) {
                _matchData.MatchList.items[i].changeZone();
            }
        }
        MakeTable();
    } else if (s.changeLevel == 0) {
        sound_update();
    }
}

function initHeader() {}

initHeader();
backTool.reset();

$(document).ready(function() {
    settingPop.actionChanged = onSettingChanged;

    sFilter.actionClosed = function(vm) {
        if (!vm || !vm.isChanged) return;

        var needMt = 0,
            needOb = 0;
        if (Config.FilterType != 3) {
            if ((vm.FilterOdds ? 1 : 0) != (Config.FilterOdds ? 1 : 0)) {
                Config.FilterOdds = vm.FilterOdds;
                writeCookie(OddsFilterKey, (Config.FilterOdds ? 1 : 0));
                needMt = 1;
            }
        } else {
            Config.FilterOdds = 0;
            writeCookie(OddsFilterKey, 0);
        }

        if ((vm.OrderByMatch ? 1 : 0) != (Config.OrderByMatch ? 1 : 0)) {
            Config.OrderByMatch = (vm.OrderByMatch ? 1 : 0);
            needMt = 0;
            OrderBy(vm.OrderByMatch ? 1 : 0);
        }

        if (needMt) {
            MakeTable();
        }
    };

    sFilter.executeAction = function(opt, key, vm) {
        //1,'hotmatch'; 2,'favlea';3,'fav';4,'oOdds';5, 'bytime'; 6, 'bylea'
        if (opt == 1) {
            FilterByOption(1);
        } else if (opt == 2) {
            FilterByOption(2);
        } else if (opt == 3) {
            FilterByOption(3);
        } else if (opt == 4) {
            vm.FilterOdds = !vm.FilterOdds;
            _$("cb_only_odds").checked = vm.FilterOdds;
            vm.isChanged = 1;
            return 0;
        } else if (opt == 5 || opt == 6) {
            vm.OrderByMatch = !vm.OrderByMatch;
            var lis = _$("set_sorting").getElementsByTagName("li");
            toggleClass(lis[0], "on");
            toggleClass(lis[1], "on");
            vm.isChanged = 1;
            return 0;
        }

        return true;
    };

    sFilter.toViewAction = function(opt, vm) {
        FilterModel.init();

        if (vm && vm.isChanged) {
            //odds or orderby was changed
            //sync odds filter to lea/con filter
            FilterModel.TempFilterOdds = vm.FilterOdds;
            FilterModel.HasChanged = 1;
        }

        _$("mTotal").innerHTML = _matchData.MatchCount;
        //1: lea, 2:country 3, odds
        toggleFilterPop(opt, 0);
    }

    sFilter.VmForPop = function() {

        var favLeaCount = 0,
            favCount = 0;
        for (var i = 0; i < _matchData.MatchCount; i++) {
            if (_matchData.MatchList.items[i].isTop) {
                if (!Config.FilterOdds || _matchData.MatchList.items[i].hasOdds)
                    favCount++;
            }
        }
        for (var i = 0; i < _matchData.LeagueList.items.length; i++) {
            if (_matchData.LeagueList.items[i].isTop) {
                if (!Config.FilterOdds || _matchData.MatchList.items[i].hasOdds)
                    favLeaCount += _matchData.LeagueList.items[i].matchNum;
            }
        }

        return {
            hotCount: AllSimplifyNum,
            favLeaCount: favLeaCount,
            favCount: favCount,
            hotshow: (AllSimplifyNum == 0 ? "style='display:none;'" : ""),
            favleashow: (favLeaCount == 0 ? "style='display:none;'" : ""),
            favshow: (favCount == 0 ? "style='display:none;'" : ""),
            ob_timeCls: Config.OrderByMatch ? "" : "on",
            ob_leaCls: Config.OrderByMatch ? "on" : "",
            onlyOddsChecked: Config.FilterOdds ? "checked" : "",

            isChanged: 0,
            FilterOdds: Config.FilterOdds,
            OrderByMatch: Config.OrderByMatch
        }
    };
});