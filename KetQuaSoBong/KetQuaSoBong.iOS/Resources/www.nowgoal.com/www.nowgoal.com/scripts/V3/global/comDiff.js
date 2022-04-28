//cnzz event
//_czc.push(["_setAccount", "1279327959"]);

var _language = _language | 12;

function ToDateTimeString(t, type) {
    if (type)
        return dateFtt("t1 dd. w1", t);
    return timeToText(t, 9);
}

function timeToText(t2, type) {
    type = type || 0;
    var fmts = [
        "MM-dd-yyyy hh:mm:ss", /*0*/
        "MM-dd-yyyy", /*1*/
        "MM/dd", /*2*/
        "hh:mm", /*3*/
        "t2 dd", /*4*/
        "MM-dd hh:mm", /*5*/
        "MM/dd/yy", /*6*/
        "yyyy", /*7*/
        "t2.dd", /*8*/
        "MM/dd/yyyy hh:mm", /*9*/
        "t2 dd yyyy, hh:mm", /*10*/
        "hh:mm t2.dd " /*11*/ ,
        "MM-dd", /*12*/
        "t2.dd w1", /*13*/
        "MM-dd-yyyy hh:mm", /*14*/
        "t2 dd yyyy hh:mm w1", /*15*/
        "MM-dd yyyy", /*16*/
    ];

    return dateFtt(fmts[type] || fmts[0], t2);
}

function showCountDefer(opt) {
    if (_cnzzLoaded) return;
    //var allCnzz = document.getElementById("allCnzz");
    //allCnzz.removeChild(allCnzz.firstChild);
    //touch
    //addScript(allCnzz, "https://v1.cnzz.com/z_stat.php?id=1279327959&web_id=1279327959");

    //2021-02-22,不另做统计
    //if (window.location.href.indexOf("cnz=1") != -1) {
    //    addScript(allCnzz, "https://s9.cnzz.com/z_stat.php?id=1279658061&web_id=1279658061");
    //}

    _cnzzLoaded = true;

    //window.dataLayer = window.dataLayer || [];
    //function gtag() { dataLayer.push(arguments); }
    //gtag('js', new Date());
    ////gtag('config', 'G-5HELG1077P');
    //gtag('config', 'UA-180247121-1');
}


function getTeamUrl(id, name) {
    return "/football/team/{0}".format(id);
}

function getLeaUrl(id, name) {
    return "/football/league/{0}".format(id);
}

function toMatch(type, id, hname, gname, newOpen) {
    type = type == 0 ? "" : (["", "analysis", "odds"][type] || "analysis");
    var url = "/football/match/{0}".format(id);
    if (type) url = url + "/" + type;
    goTo(url, "", false, newOpen);
}