;
(function(w, $) {
    var sFilter = {
        ctnId: "bfFilterPop",
        vm: null
    };

    sFilter.nav = function(close) {
        var me = sFilter;
        if (close || (me.$ctn && me.$ctn.length)) {
            me.hide();
            return;
        }

        me.navTpl = me.navTpl || _$("filterNavTpl").innerHTML;
        me.vm = me.VmForPop();
        me.show(buildTags(me.navTpl, me.vm));
    };

    sFilter.show = function(tag, settingClass) {
        var $p_body = $("#settingPop");
        if (!this.$ctn) {
            var $ctn = $("<div id='" + this.ctnId + "'></div>");
            $ctn.append("<div id='popMask' onclick='sFilter.hide()'></div>");
            $p_body = $("<div id='settingPop' class='max'></div>");
            $ctn.append($p_body);
            $("body").append($ctn);
            this.$ctn = $ctn;
        }

        $p_body.empty().append(tag);
        document.body.parentNode.style.overflow = "hidden";
        //safari
        document.body.style.overflow = "hidden";
    };

    sFilter.hide = function() {
        var me = sFilter;
        if (me.$ctn) {
            me.$ctn.remove();
            me.$ctn = null;
        }

        document.body.parentNode.style.overflow = "visible";
        //safari
        document.body.style.overflow = "visible";

        if (me.vm && me.vm.isChanged && me.actionClosed) {
            me.actionClosed(me.vm);
        }
    };

    sFilter.action = function(opt, key, evt) {
        var me = sFilter;
        cancelBubble(evt);

        var ret = 1;
        if (me.executeAction) {
            ret = me.executeAction(opt, key, me.vm);
        }

        if (ret) {
            me.hide();
        }
    };

    sFilter.VmForPop = function() {
        var vm = {};
        return vm;
    };

    sFilter.toView = function(opt) {
        var me = sFilter;
        me.typesTpl = me.typesTpl || _$("filterTypesTpl").innerHTML;
        me.show(sFilter.typesTpl);
        if (me.toViewAction) {
            me.toViewAction(opt, me.vm);
        }
    };

    w.sFilter = sFilter;
})(window, jQuery);