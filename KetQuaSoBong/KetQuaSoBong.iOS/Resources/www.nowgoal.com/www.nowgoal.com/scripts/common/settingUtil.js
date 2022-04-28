;
(function(w, $) {
    var settingPop = {
        loaded: 0,
        ctnId: "settingPopCtn",
        popSelId: "setting_popSel",
        fbUrl: "/setting/football/",
        bskUrl: "/setting/basketball/",
        simpUrl: "/setting/simple/",
        bqUrl: "/setting/baseball/",
        settings: {
            changeLevel: 0,
            hasChanged: 0
        },
        registerList: [],
        reg: function(idx, level, initFunc, viewSync, changeFunc, saveFunc, popSel) { //取/Script/Setting/*.js 对应的配置
            this.registerList[idx] = {
                init: initFunc,
                vms: viewSync,
                ch: changeFunc,
                save: saveFunc,
                level: level,
                popSel: popSel
            };
            return this;
        },
        init: function() {
            this.settings.changeLevel = 0;
            this.settings.hasChanged = 0;
            for (var i = 0; i < this.registerList.length; i++) {
                var cvm = this.registerList[i];
                if (cvm) {
                    cvm.init(this.settings);
                }
            }
        },
        onRender: function() {
            for (var i = 0; i < this.registerList.length; i++) {
                var cvm = this.registerList[i];
                if (cvm) {
                    cvm.vms(this.settings);
                }
            }
        },
        change: function(idx, tag) {
            var cvm = settingPop.registerList[idx];
            if (cvm) {
                this.settings.hasChanged = 1;
                if (cvm.level && cvm.level > this.settings.changeLevel) {
                    this.settings.changeLevel = cvm.level;
                }
                cvm.ch(this.settings, tag);
                cvm.vms(this.settings);
            }
        },
        popSelect: function(idx) {
            var cvm = settingPop.registerList[idx];
            if (cvm && cvm.popSel) {
                var tag = cvm.popSel(this.settings);
                settingPop.showPopSel(tag);
            }
        },
        showPopSel: function(tag) {
            this.hidePopSel();
            var testStl = ""; //style='position:fixed;top:0px;z-index:20000;'
            var $ctn = $("<div id=" + this.popSelId + "></div>");
            $ctn.append("<div class='popMask2' onclick='settingPop.hidePopSel()'></div>");
            var $p_body = $("<div class='fadeInBottom selectPop settingPop2' id='setting_popSel' " + testStl + " ></div>");
            $ctn.append($p_body);
            $("body").append($ctn);
            $p_body.empty().append(tag);


        },
        hidePopSel: function() {
            var $lay = $("#" + this.popSelId);
            if ($lay.length) {
                $lay.remove();
            }
        },
        getVm: function() {
            return "";
        },

        show: function(tag) {
            if (!this.loaded)
                this.hide();

            this.init();

            tag = tag || buildTags(_$("settingTpl").innerHTML, this.getVm());

            var $p_body = $("#settingPop");
            if (!this.$ctn) {
                var $ctn = $("<div id='" + this.ctnId + "'></div>");
                $ctn.append("<div id='popMask' onclick='settingPop.hide()'></div>");
                $p_body = $("<div class='fadeInBottom' id='settingPop'></div>");
                $ctn.append($p_body);
                $("body").append($ctn);
                this.$ctn = $ctn;
            }

            $p_body.empty().append(tag);
            document.body.parentNode.style.overflow = "hidden";
            //safari
            document.body.style.overflow = "hidden";
            this.onRender();
        },

        getView: function(opt, s) {
            if (!opt) return;
            if (!settingPop.loaded) {
                var url = ["", settingPop.fbUrl, settingPop.bskUrl, settingPop.simpUrl, settingPop.bqUrl][opt];
                $.get(url + "?s=" + (s || 0), function(v) {
                    settingPop.loaded = 1;
                    $("body").append($(v));
                    settingPop.show();
                });
            } else {
                settingPop.show();
            }
        },
        confirm: function() {
            var me = settingPop;
            if (me.settings.hasChanged) {
                for (var i = 0; i < this.registerList.length; i++) {
                    var cvm = this.registerList[i];
                    if (cvm) {
                        cvm.save(this.settings);
                    }
                }
            }

            if (me.settings.hasChanged && me.actionChanged) {
                if (!isNaN(parseFloat(me.settings.ZoneOffset)))
                    bomHelper.timezoneHours = parseFloat(me.settings.ZoneOffset);
                else
                    bomHelper.timezoneHours = (-(new Date().getTimezoneOffset() / 60));

                if (typeof(me.settings.HdpFormat) != "undefined")
                    bomHelper.HdpFormat = me.settings.HdpFormat;

                me.actionChanged(me.settings);
            }
        },
        hide: function() {
            var me = settingPop;
            if (me.$ctn) {
                me.$ctn.remove();
                me.$ctn = null;
            }
            me.hidePopSel();

            //confirm when closed
            me.confirm();

            document.body.parentNode.style.overflow = "visible";
            //safari
            document.body.style.overflow = "visible";
        }
    };

    w.settingPop = settingPop;

})(window, jQuery)