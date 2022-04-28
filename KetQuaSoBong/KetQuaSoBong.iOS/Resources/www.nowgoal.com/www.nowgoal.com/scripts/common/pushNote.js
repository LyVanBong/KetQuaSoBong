/*required bomHelper*/
var notePush = {
    loaded: 0,
    push: function() {
        var scoreTxt = "/templatedata/publishnote.txt";
        bomHelper.ajaxGet(scoreTxt, this.check, 1);
    },
    check: function(data) {
        if (!data) return;
        if (!_$("pushMsg")) return;
        var pData = JSON.parse(data);
        if (!pData || !pData.t) return;
        if (findCookie("pn_" + pData.p)) return;
        //var cls = (pData.t == 2 ? "pMsg" : "pMsg");
        var r = pData.r;
        var tpl = (r ? " <a href=\"" + r + "\" target=\"_blank\">" + (_locModel.T.T_ReadMore || "Read More") + "</a>" : "");
        _$("pushMsg").innerHTML = "<div class='pMsg' onclick=\"notePush.close('" + pData.p + "');\"><i class=\"close_b\"></i><span" + (r ? " onclick=\"window.open('" + r + "', '_blank')\"" : "") + ">" + pData.c + "<i style='color:#b6b6b6'>" + (pData.k ? pData.k : "") + "</i>" + tpl + "</span></div>";
        this.loaded = 1;
        if (window.adaptMt)
            adaptMt();
    },
    close: function(p) {
        if (!_$("pushMsg")) return;
        _$("pushMsg").innerHTML = "";
        writeCookie("pn_" + p, "1");
    }
};