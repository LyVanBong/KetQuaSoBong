var popUtil = {
    confirmCallback: null,
    cancelCallback: null,
    shadeClose: 1,
    timeout: 0,

    option: function(title, body, btnOption, callback, disableShadeClose, timeout, cancelCallback, loaded, position, containerClass) {
        var opt = {
            title: title,
            body: body,
            btnOpt: btnOption,
            func: callback,
            shadeClose: !disableShadeClose,
            timeout: timeout,
            cancelCallback: cancelCallback,
            loaded: loaded,
            position: position,
            containerClass: containerClass,
        };

        opt.extend = function(s, b) {
            if (s) {
                for (var k in s) {
                    if (!b || !this.hasOwnProperty(k)) {
                        this[k] = s[k];
                    }
                }
            }

            return this;
        };

        return opt;
    },
    open: function(option) {
        this.timeout = option.timeout;
        this.confirmCallback = option.func;
        this.blankOut = option.blankOut;

        var tplPop = _$("tplPop");
        var tplPop_btn = _$("tplPop_btn");
        var viewData = new Object();

        if (option.title) {
            viewData.title = option.title;
        } else {
            viewData.showTitle = "style='display:none;'";
        }

        if (option.body) viewData.body = option.body;
        viewData.footer = "";

        if (option.btnOpt) {
            if (option.btnOpt != 4) {
                viewData.footer += buildTags(tplPop_btn.innerHTML, {
                    btnCss: (option.btnOpt != 3 ? "button--mini--success" : "button--mini"),
                    title: _locModel.T.T_OK,
                    func: "popUtil.confirm()"
                })
            }

            if (option.btnOpt != 1) {
                viewData.footer += buildTags(tplPop_btn.innerHTML, {
                    btnCss: ((option.btnOpt == 3) ? "button--mini--success" : "button--mini"),
                    title: _locModel.T.T_Cancel,
                    func: "popUtil.cancel()"
                })
            }
        } else {
            viewData.showFoot = "style='display:none;'";
        }

        viewData.bodyStyle = "";

        var html = buildTags(tplPop.innerHTML, viewData);

        var position = "";

        //0 to center, 1 to top, 2 to bottom
        if (option.position) {
            position = ["", "popup-top", "popup-bottom"][parseInt(option.position)];
        }

        var container = _$("popContainer");
        if (container) {
            var containerCls = "popupBox-container ";
            if (position) containerCls += position;
            if (option.title) containerCls += " popup--title--offset";
            if (option.btnOpt == 1 || option.btnOpt == 4) {
                containerCls += " popup--btn--single";
            }
            if (option.containerClass) {
                containerCls += (" " + option.containerClass);
            }

            container.setAttribute("class", containerCls);
            container.innerHTML = html;

            if (option.loaded) {
                option.loaded(container);
            }
        }

        if (this.timeout) {
            //setTimeout("displayOpacity('\popContainer\',100,1)", this.timeout);
            setTimeout("popUtil.confirm()", this.timeout + 1000);
        }
    },
    confirm: function() {
        if (popUtil.confirmCallback && typeof(popUtil.confirmCallback) == "function") {
            popUtil.confirmCallback();
        }

        popUtil.closePopup();
    },
    cancel: function() {
        if (popUtil.cancelCallback && typeof(popUtil.cancelCallback) == "function") {
            popUtil.cancelCallback();
        }

        popUtil.closePopup();
    },
    closePopup: function(fromblank) {
        if (fromblank && !popUtil.shadeClose) {
            return;
        }

        var container = _$("popContainer");
        removeClass(container, "popupBox-container");
        container.innerHTML = "";
        return true;
    },
    bubble: function(text, time = 2500) {
        Swal.fire({
            toast: true,
            position: 'top',
            title: text,
            showConfirmButton: false,
            timer: time
        })
    },
    box: function(opt) {
        Swal.fire({
            title: opt.title || "",
            text: opt.text || "",
            showCancelButton: opt.showCancelButton || false,
            confirmButtonText: opt.confirmButtonText || "Confirm",
            cancelButtonText: opt.cancelButtonText || "Cancel",
        }).then((isConfirm) => {
            try {
                if (isConfirm.value) {
                    if (opt.confirm) opt.confirm();
                } else {
                    if (opt.cancel) opt.cancel();
                }
            } catch (e) {
                console.log(e);
            }
        });
    },
    newBubble: function(text, fun = null) {
        layer.alert(text, {
            shadeClose: true,
            offset: '350px',
            closeBtn: 0,
            title: false,
            btn: [_locModel.T.T_Box_Comfirm],
            yes: function() {
                layer.close(layer.index);
                if (fun != null) {
                    fun();
                }
            }
        })
    }
};