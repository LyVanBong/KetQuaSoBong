(function() {
    var h = {},
        mt = {},
        c = {
            id: "5e57a19f98fab5a2a034f00fdaf64fb6",
            dm: ["nowgoal.com"],
            js: "tongji.baidu.com/hm-web/js/",
            etrk: [],
            cetrk: [],
            cptrk: [],
            icon: '',
            ctrk: ["%5b%22https%3a%5c%2f%5c%2fnowgoal.com%22%5d"],
            vdur: 1800000,
            age: 31536000000,
            qiao: 0,
            pt: 0,
            spa: 0,
            aet: '',
            hca: '52FFACF27DCC20C4',
            ab: 0,
            v: 1,
            apps: ''
        };
    var s = void 0,
        t = !0,
        u = null,
        v = !1;
    mt.cookie = {};
    mt.cookie.set = function(e, b, a) {
        var f;
        a.D && (f = new Date, f.setTime(f.getTime() + a.D));
        document.cookie = e + "=" + b + (a.domain ? "; domain=" + a.domain : "") + (a.path ? "; path=" + a.path : "") + (f ? "; expires=" + f.toGMTString() : "") + (a.Yb ? "; secure" : "")
    };
    mt.cookie.get = function(e) {
        return (e = RegExp("(^| )" + e + "=([^;]*)(;|$)").exec(document.cookie)) ? e[2] : u
    };
    mt.cookie.rb = function(e, b) {
        try {
            var a = "Hm_ck_" + +new Date;
            mt.cookie.set(a, "42", {
                domain: e,
                path: b,
                D: s
            });
            var f = "42" === mt.cookie.get(a) ? "1" : "0";
            mt.cookie.set(a, "", {
                domain: e,
                path: b,
                D: -1
            });
            return f
        } catch (d) {
            return "0"
        }
    };
    mt.lang = {};
    mt.lang.j = function(e, b) {
        return "[object " + b + "]" === {}.toString.call(e)
    };
    mt.lang.l = function(e) {
        return mt.lang.j(e, "Function")
    };
    mt.lang.K = function(e) {
        return mt.lang.j(e, "Object")
    };
    mt.lang.Ub = function(e) {
        return mt.lang.j(e, "Number") && isFinite(e)
    };
    mt.lang.$ = function(e) {
        return mt.lang.j(e, "String")
    };
    mt.lang.isArray = function(e) {
        return mt.lang.j(e, "Array")
    };
    mt.lang.g = function(e) {
        return e.replace ? e.replace(/'/g, "'0").replace(/\*/g, "'1").replace(/!/g, "'2") : e
    };
    mt.lang.trim = function(e) {
        return e.replace(/^\s+|\s+$/g, "")
    };
    mt.lang.find = function(e, b, a) {
        if (mt.lang.isArray(e) && mt.lang.l(b))
            for (var f = e.length, d = 0; d < f; d++)
                if (d in e && b.call(a || e, e[d], d)) return e[d];
        return u
    };
    mt.lang.Y = function(e, b) {
        return mt.lang.find(e, function(a) {
            return a === b
        }) != u
    };
    mt.lang.filter = function(e, b) {
        var a = -1,
            f = 0,
            d = e == u ? 0 : e.length,
            q = [];
        if (mt.lang.l(b))
            for (; ++a < d;) {
                var k = e[a];
                b(k, a, e) && (q[f++] = k)
            }
        return q
    };
    mt.lang.unique = function(e, b) {
        var a = e.length,
            f = e.slice(0),
            d, q;
        for (mt.lang.l(b) || (b = function(a, f) {
                return a === f
            }); 0 < --a;) {
            q = f[a];
            for (d = a; d--;)
                if (b(q, f[d])) {
                    f.splice(a, 1);
                    break
                }
        }
        return f
    };
    mt.lang.Vb = function(e, b) {
        function a(a) {
            a = (f + f + Number(a).toString(2)).slice(-64);
            return [parseInt(a.slice(0, 32), 2), parseInt(a.slice(-32), 2)]
        }
        var f = "00000000000000000000000000000000",
            d = a(e),
            q = a(b);
        return parseInt((f + ((d[0] | q[0]) >>> 0).toString(2)).slice(-32) + (f + ((d[1] | q[1]) >>> 0).toString(2)).slice(-32), 2)
    };
    mt.url = {};
    mt.url.f = function(e, b) {
        var a = e.match(RegExp("(^|&|\\?|#)(" + b + ")=([^&#]*)(&|$|#)", ""));
        return a ? a[3] : u
    };
    mt.url.Ta = function(e) {
        return (e = e.match(/^(https?:\/\/)?([^\/\?#]*)/)) ? e[2].replace(/.*@/, "") : u
    };
    mt.url.W = function(e) {
        return (e = mt.url.Ta(e)) ? e.replace(/:\d+$/, "") : e
    };
    mt.url.pb = function(e) {
        var b = document.location.href,
            b = b.replace(/^https?:\/\//, "");
        return 0 === b.indexOf(e)
    };
    mt.url.qb = function(e, b) {
        e = "." + e.replace(/:\d+/, "");
        b = "." + b.replace(/:\d+/, "");
        var a = e.indexOf(b);
        return -1 < a && a + b.length === e.length
    };
    (function() {
        var e = mt.lang,
            b = mt.url;
        mt.d = {};
        mt.d.Ma = function(a) {
            return document.getElementById(a)
        };
        mt.d.Tb = function(a) {
            if (!a) return u;
            try {
                a = String(a);
                if (0 === a.indexOf("!HMCQ!")) return a;
                if (0 === a.indexOf("!HMCC!")) return document.querySelector(a.substring(6, a.length));
                for (var f = a.split(">"), d = document.body, b = f.length - 1; 0 <= b; b--)
                    if (-1 < f[b].indexOf("#")) {
                        var e = f[b].split("#")[1];
                        (d = document.getElementById(e)) || (d = document.getElementById(decodeURIComponent(e)));
                        f = f.splice(b + 1, f.length - (b + 1));
                        break
                    }
                for (a =
                    0; d && a < f.length;) {
                    var g = String(f[a]).toLowerCase();
                    if (!("html" === g || "body" === g)) {
                        var b = 0,
                            r = f[a].match(/\[(\d+)\]/i),
                            e = [];
                        if (r) b = r[1] - 1, g = g.split("[")[0];
                        else if (1 !== d.childNodes.length) {
                            for (var n = 0, p = 0, l = d.childNodes.length; p < l; p++) {
                                var m = d.childNodes[p];
                                1 === m.nodeType && m.nodeName.toLowerCase() === g && n++;
                                if (1 < n) return u
                            }
                            if (1 !== n) return u
                        }
                        for (n = 0; n < d.childNodes.length; n++) 1 === d.childNodes[n].nodeType && d.childNodes[n].nodeName.toLowerCase() === g && e.push(d.childNodes[n]);
                        if (!e[b]) return u;
                        d = e[b]
                    }
                    a++
                }
                return d
            } catch (w) {
                return u
            }
        };
        mt.d.ga = function(a, f) {
            var d = [],
                b = [];
            if (!a) return b;
            for (; a.parentNode != u;) {
                for (var e = 0, g = 0, r = a.parentNode.childNodes.length, n = 0; n < r; n++) {
                    var p = a.parentNode.childNodes[n];
                    if (p.nodeName === a.nodeName && (e++, p === a && (g = e), 0 < g && 1 < e)) break
                }
                if ((r = "" !== a.id) && f) {
                    d.unshift("#" + encodeURIComponent(a.id));
                    break
                } else r && (r = "#" + encodeURIComponent(a.id), r = 0 < d.length ? r + ">" + d.join(">") : r, b.push(r)), d.unshift(encodeURIComponent(String(a.nodeName).toLowerCase()) + (1 < e ? "[" + g + "]" : ""));
                a = a.parentNode
            }
            b.push(d.join(">"));
            return b
        };
        mt.d.Ya = function(a) {
            return (a = mt.d.ga(a, t)) && a.length ? String(a[0]) : ""
        };
        mt.d.Xa = function(a) {
            return mt.d.ga(a, v)
        };
        mt.d.Na = function(a) {
            var f;
            for (f = "A";
                (a = a.parentNode) && 1 == a.nodeType;)
                if (a.tagName == f) return a;
            return u
        };
        mt.d.Qa = function(a) {
            return 9 === a.nodeType ? a : a.ownerDocument || a.document
        };
        mt.d.Va = function(a) {
            var f = {
                top: 0,
                left: 0
            };
            if (!a) return f;
            var d = mt.d.Qa(a).documentElement;
            "undefined" !== typeof a.getBoundingClientRect && (f = a.getBoundingClientRect());
            return {
                top: f.top + (window.pageYOffset || d.scrollTop) -
                    (d.clientTop || 0),
                left: f.left + (window.pageXOffset || d.scrollLeft) - (d.clientLeft || 0)
            }
        };
        mt.d.getAttribute = function(a, f) {
            var d = a.getAttribute && a.getAttribute(f) || u;
            if (!d && a.attributes && a.attributes.length)
                for (var b = a.attributes, e = b.length, g = 0; g < e; g++) b[g].nodeName === f && (d = b[g].nodeValue);
            return d
        };
        mt.d.Ra = function(a) {
            var f = "document";
            a.tagName !== s && (f = a.tagName);
            return f.toLowerCase()
        };
        mt.d.$a = function(a) {
            var f = "";
            a.textContent ? f = e.trim(a.textContent) : a.innerText && (f = e.trim(a.innerText));
            f && (f = f.replace(/\s+/g,
                " ").substring(0, 255));
            return f
        };
        mt.d.Sb = function(a, f) {
            var d;
            e.$(a) && 0 === String(a).indexOf("!HMCQ!") ? (d = String(a), d = b.f(document.location.href, d.substring(6, d.length))) : e.$(a) || (d = mt.d.Ra(a), "input" === d && f && ("button" === a.type || "submit" === a.type) ? d = e.trim(a.value) || "" : "input" === d && !f && "password" !== a.type ? d = e.trim(a.value) || "" : "img" === d ? (d = mt.d.getAttribute, d = d(a, "alt") || d(a, "title") || d(a, "src")) : d = "body" === d || "html" === d ? ["(hm-default-content-for-", d, ")"].join("") : mt.d.$a(a));
            return String(d || "").substring(0,
                255)
        };
        (function() {
            (mt.d.Wb = function() {
                function a() {
                    if (!a.L) {
                        a.L = t;
                        for (var f = 0, d = b.length; f < d; f++) b[f]()
                    }
                }

                function f() {
                    try {
                        document.documentElement.doScroll("left")
                    } catch (d) {
                        setTimeout(f, 1);
                        return
                    }
                    a()
                }
                var d = v,
                    b = [],
                    e;
                document.addEventListener ? e = function() {
                    document.removeEventListener("DOMContentLoaded", e, v);
                    a()
                } : document.attachEvent && (e = function() {
                    "complete" === document.readyState && (document.detachEvent("onreadystatechange", e), a())
                });
                (function() {
                    if (!d)
                        if (d = t, "complete" === document.readyState) a.L = t;
                        else if (document.addEventListener) document.addEventListener("DOMContentLoaded",
                        e, v), window.addEventListener("load", a, v);
                    else if (document.attachEvent) {
                        document.attachEvent("onreadystatechange", e);
                        window.attachEvent("onload", a);
                        var b = v;
                        try {
                            b = window.frameElement == u
                        } catch (q) {}
                        document.documentElement.doScroll && b && f()
                    }
                })();
                return function(f) {
                    a.L ? f() : b.push(f)
                }
            }()).L = v
        })();
        return mt.d
    })();
    mt.event = {};
    mt.event.c = function(e, b, a) {
        e.attachEvent ? e.attachEvent("on" + b, function(f) {
            a.call(e, f)
        }) : e.addEventListener && e.addEventListener(b, a, v)
    };
    (function() {
        var e = mt.event;
        mt.e = {};
        mt.e.nb = /msie (\d+\.\d+)/i.test(navigator.userAgent);
        mt.e.cookieEnabled = navigator.cookieEnabled;
        mt.e.javaEnabled = navigator.javaEnabled();
        mt.e.language = navigator.language || navigator.browserLanguage || navigator.systemLanguage || navigator.userLanguage || "";
        mt.e.Ab = (window.screen.width || 0) + "x" + (window.screen.height || 0);
        mt.e.colorDepth = window.screen.colorDepth || 0;
        mt.e.Za = function() {
            var b;
            b = b || document;
            return parseInt(window.pageYOffset || b.documentElement.scrollTop || b.body &&
                b.body.scrollTop || 0, 10)
        };
        mt.e.bb = function() {
            var b = document;
            return parseInt(window.innerHeight || b.documentElement.clientHeight || b.body && b.body.clientHeight || 0, 10)
        };
        mt.e.X = function() {
            return mt.e.Za() + mt.e.bb()
        };
        mt.e.ta = 0;
        mt.e.cb = function() {
            var b = document;
            return parseInt(window.innerWidth || b.documentElement.clientWidth || b.body.offsetWidth || 0, 10)
        };
        mt.e.orientation = 0;
        (function() {
            function b() {
                var a = 0;
                window.orientation !== s && (a = window.orientation);
                screen && (screen.orientation && screen.orientation.angle !==
                    s) && (a = screen.orientation.angle);
                mt.e.orientation = a;
                mt.e.ta = mt.e.cb()
            }
            b();
            e.c(window, "orientationchange", b)
        })();
        return mt.e
    })();
    mt.z = {};
    mt.z.parse = function(e) {
        return (new Function("return (" + e + ")"))()
    };
    mt.z.stringify = function() {
        function e(f) {
            /["\\\x00-\x1f]/.test(f) && (f = f.replace(/["\\\x00-\x1f]/g, function(f) {
                var b = a[f];
                if (b) return b;
                b = f.charCodeAt();
                return "\\u00" + Math.floor(b / 16).toString(16) + (b % 16).toString(16)
            }));
            return '"' + f + '"'
        }

        function b(a) {
            return 10 > a ? "0" + a : a
        }
        var a = {
            "\b": "\\b",
            "\t": "\\t",
            "\n": "\\n",
            "\f": "\\f",
            "\r": "\\r",
            '"': '\\"',
            "\\": "\\\\"
        };
        return function(a) {
            switch (typeof a) {
                case "undefined":
                    return "undefined";
                case "number":
                    return isFinite(a) ? String(a) : "null";
                case "string":
                    return e(a);
                case "boolean":
                    return String(a);
                default:
                    if (a === u) return "null";
                    if (a instanceof Array) {
                        var d = ["["],
                            q = a.length,
                            k, g, r;
                        for (g = 0; g < q; g++) switch (r = a[g], typeof r) {
                            case "undefined":
                            case "function":
                            case "unknown":
                                break;
                            default:
                                k && d.push(","), d.push(mt.z.stringify(r)), k = 1
                        }
                        d.push("]");
                        return d.join("")
                    }
                    if (a instanceof Date) return '"' + a.getFullYear() + "-" + b(a.getMonth() + 1) + "-" + b(a.getDate()) + "T" + b(a.getHours()) + ":" + b(a.getMinutes()) + ":" + b(a.getSeconds()) + '"';
                    k = ["{"];
                    g = mt.z.stringify;
                    for (q in a)
                        if (Object.prototype.hasOwnProperty.call(a, q)) switch (r =
                            a[q], typeof r) {
                            case "undefined":
                            case "unknown":
                            case "function":
                                break;
                            default:
                                d && k.push(","), d = 1, k.push(g(q) + ":" + g(r))
                        }
                    k.push("}");
                    return k.join("")
            }
        }
    }();
    mt.localStorage = {};
    mt.localStorage.R = function() {
        if (!mt.localStorage.h) try {
            mt.localStorage.h = document.createElement("input"), mt.localStorage.h.type = "hidden", mt.localStorage.h.style.display = "none", mt.localStorage.h.addBehavior("#default#userData"), document.getElementsByTagName("head")[0].appendChild(mt.localStorage.h)
        } catch (e) {
            return v
        }
        return t
    };
    mt.localStorage.set = function(e, b, a) {
        var f = new Date;
        f.setTime(f.getTime() + (a || 31536E6));
        try {
            window.localStorage ? (b = f.getTime() + "|" + b, window.localStorage.setItem(e, b)) : mt.localStorage.R() && (mt.localStorage.h.expires = f.toUTCString(), mt.localStorage.h.load(document.location.hostname), mt.localStorage.h.setAttribute(e, b), mt.localStorage.h.save(document.location.hostname))
        } catch (d) {}
    };
    mt.localStorage.get = function(e) {
        if (window.localStorage) {
            if (e = window.localStorage.getItem(e)) {
                var b = e.indexOf("|"),
                    a = e.substring(0, b) - 0;
                if (a && a > (new Date).getTime()) return e.substring(b + 1)
            }
        } else if (mt.localStorage.R()) try {
            return mt.localStorage.h.load(document.location.hostname), mt.localStorage.h.getAttribute(e)
        } catch (f) {}
        return u
    };
    mt.localStorage.remove = function(e) {
        if (window.localStorage) window.localStorage.removeItem(e);
        else if (mt.localStorage.R()) try {
            mt.localStorage.h.load(document.location.hostname), mt.localStorage.h.removeAttribute(e), mt.localStorage.h.save(document.location.hostname)
        } catch (b) {}
    };
    mt.sessionStorage = {};
    mt.sessionStorage.set = function(e, b) {
        try {
            window.sessionStorage && window.sessionStorage.setItem(e, b)
        } catch (a) {}
    };
    mt.sessionStorage.get = function(e) {
        try {
            return window.sessionStorage ? window.sessionStorage.getItem(e) : u
        } catch (b) {
            return u
        }
    };
    mt.sessionStorage.remove = function(e) {
        try {
            window.sessionStorage && window.sessionStorage.removeItem(e)
        } catch (b) {}
    };
    (function() {
        var e = mt.z;
        mt.B = {};
        mt.B.log = function(b, a) {
            var f = new Image,
                d = "mini_tangram_log_" + Math.floor(2147483648 * Math.random()).toString(36);
            window[d] = f;
            f.onload = function() {
                f.onload = u;
                f = window[d] = u;
                a && a(b)
            };
            f.src = b
        };
        mt.B.get = function(b, a) {
            return mt.B.xa({
                url: b,
                method: "GET",
                data: a.data,
                timeout: a.timeout,
                noCache: t,
                success: a.success,
                fail: a.fail
            })
        };
        mt.B.xa = function(b) {
            function a(a) {
                var m = b[a];
                if (m)
                    if (p && clearTimeout(p), "success" !== a) m && m(n);
                    else {
                        var d;
                        try {
                            d = e.parse(n.responseText)
                        } catch (f) {
                            m && m(n);
                            return
                        }
                        m &&
                            m(n, d)
                    }
            }
            b = b || {};
            var f = function(a) {
                    var m = [],
                        b;
                    for (b in a) a.hasOwnProperty(b) && m.push(encodeURIComponent(b) + "=" + encodeURIComponent(a[b]));
                    return m.join("&")
                }(b.data || {}),
                d = b.url,
                q = (b.method || "GET").toUpperCase(),
                k = b.headers || {},
                g = b.timeout || 0,
                r = b.noCache || v,
                n, p;
            try {
                a: if (window.XMLHttpRequest) n = new XMLHttpRequest;
                    else {
                        try {
                            n = new ActiveXObject("Microsoft.XMLHTTP");
                            break a
                        } catch (l) {}
                        n = s
                    }
                "GET" === q && (f && (d += (0 <= d.indexOf("?") ? "&" : "?") + f, f = u), r && (d += (0 <= d.indexOf("?") ? "&" : "?") + "b" + +new Date + "=1"));n.open(q,
                    d, t);n.onreadystatechange = function() {
                    if (4 === n.readyState) {
                        var m = 0;
                        try {
                            m = n.status
                        } catch (b) {
                            a("fail");
                            return
                        }
                        200 <= m && 300 > m || 304 === m || 1223 === m ? a("success") : a("fail")
                    }
                };
                for (var m in k) k.hasOwnProperty(m) && n.setRequestHeader(m, k[m]);g && (p = setTimeout(function() {
                    n.onreadystatechange = function() {};
                    n.abort();
                    a("fail")
                }, g));n.send(f)
            }
            catch (w) {
                a("fail")
            }
            return n
        };
        return mt.B
    })();
    h.s = {
        lb: "http://tongji.baidu.com/hm-web/welcome/ico",
        ba: "hm.baidu.com/hm.gif",
        ya: /^(tongji|hmcdn).baidu.com$/,
        Gb: "tongji.baidu.com",
        ib: "hmmd",
        jb: "hmpl",
        Jb: "utm_medium",
        hb: "hmkw",
        Lb: "utm_term",
        fb: "hmci",
        Ib: "utm_content",
        kb: "hmsr",
        Kb: "utm_source",
        gb: "hmcu",
        Hb: "utm_campaign",
        la: 0,
        C: Math.round(+new Date / 1E3),
        protocol: "https:" === document.location.protocol ? "https:" : "http:",
        M: "https:",
        Da: 6E5,
        Xb: 5E3,
        Ea: 5,
        ea: 1024,
        H: 2147483647,
        sa: "hca cc cf ci ck cl cm cp cu cw ds vl ep et ja ln lo lt rnd si su v cv lv api sn r ww p ct u tt".split(" "),
        ha: t,
        Nb: {
            id: "data-hm-id",
            Rb: "data-hm-class",
            $b: "data-hm-xpath",
            content: "data-hm-content",
            Zb: "data-hm-tag",
            link: "data-hm-link"
        },
        Pb: "data-hm-enabled",
        Ob: "data-hm-disabled",
        xb: "https://hmcdn.baidu.com/static/tongji/plugins/",
        oa: ["UrlChangeTracker"]
    };
    (function() {
        var e = {
            w: {},
            c: function(b, a) {
                this.w[b] = this.w[b] || [];
                this.w[b].push(a)
            },
            k: function(b, a) {
                this.w[b] = this.w[b] || [];
                for (var f = this.w[b].length, d = 0; d < f; d++) this.w[b][d](a)
            }
        };
        return h.t = e
    })();
    (function() {
        var e = mt.lang,
            b = /^https?:\/\//,
            a = {
                Pa: function(a) {
                    var b;
                    try {
                        b = JSON.parse(decodeURIComponent(a[0]))
                    } catch (e) {}
                    return b
                },
                ma: function(b, d) {
                    return a.na(h.b && h.b.a && h.b.a.u, b, d) || a.na(document.location.href, b, d)
                },
                na: function(a, d, e) {
                    if (a === s) return v;
                    b.test(d) || (a = a.replace(b, ""));
                    d = d.replace(/\/$/, "");
                    a = a.replace(/\/$/, "");
                    e && (a = a.replace(/^(https?:\/\/)?www\./, "$1"));
                    return RegExp("^" + d.replace(/[?.+^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*") + "$").test(a)
                },
                I: function(b, d) {
                    var q = a.Pa(b);
                    if (!e.j(q,
                            "Undefined")) {
                        if (e.isArray(q)) {
                            for (var k = 0; k < q.length; k++)
                                if (a.ma(q[k], d)) return t;
                            return v
                        }
                        if (e.K(q)) {
                            var k = [],
                                g;
                            for (g in q) q.hasOwnProperty(g) && a.ma(g, d) && (k = k.concat(q[g]));
                            return k
                        }
                    }
                }
            };
        return h.T = a
    })();
    (function() {
        function e(a, e) {
            var d = document.createElement("script");
            d.charset = "utf-8";
            b.l(e) && (d.readyState ? d.onreadystatechange = function() {
                if ("loaded" === d.readyState || "complete" === d.readyState) d.onreadystatechange = u, e()
            } : d.onload = function() {
                e()
            });
            d.src = a;
            var q = document.getElementsByTagName("script")[0];
            q.parentNode.insertBefore(d, q)
        }
        var b = mt.lang;
        return h.load = e
    })();
    (function() {
        var e = h.s,
            b = {
                F: function() {
                    if ("" !== c.icon) {
                        var a = c.icon.split("|"),
                            b = e.lb + "?s=" + c.id,
                            d = "https://hmcdn.baidu.com/static" + a[0] + ".gif";
                        document.write("swf" === a[1] || "gif" === a[1] ? '<a href="' + b + '" target="_blank"><img border="0" src="' + d + '" width="' + a[2] + '" height="' + a[3] + '"></a>' : '<a href="' + b + '" target="_blank">' + a[0] + "</a>")
                    }
                }
            };
        h.t.c("pv-b", b.F);
        return b
    })();
    (function() {
        var e = mt.url,
            b = mt.cookie,
            a = mt.localStorage,
            f = mt.sessionStorage,
            d = {
                getData: function(d) {
                    try {
                        return b.get(d) || f.get(d) || a.get(d)
                    } catch (e) {}
                },
                setData: function(e, k, g) {
                    try {
                        b.set(e, k, {
                            domain: d.J(),
                            path: d.V(),
                            D: g
                        }), g ? a.set(e, k, g) : f.set(e, k)
                    } catch (r) {}
                },
                removeData: function(e) {
                    try {
                        b.set(e, "", {
                            domain: d.J(),
                            path: d.V(),
                            D: -1
                        }), f.remove(e), a.remove(e)
                    } catch (k) {}
                },
                J: function() {
                    for (var a = document.location.hostname, b = 0, d = c.dm.length; b < d; b++)
                        if (e.qb(a, c.dm[b])) return c.dm[b].replace(/(:\d+)?[/?#].*/, "");
                    return a
                },
                V: function() {
                    for (var a = 0, b = c.dm.length; a < b; a++) {
                        var d = c.dm[a];
                        if (-1 < d.indexOf("/") && e.pb(d)) return d.replace(/^[^/]+(\/.*)/, "$1") + "/"
                    }
                    return "/"
                }
            };
        return h.S = d
    })();
    (function() {
        var e = mt.lang,
            b = mt.d,
            a = h.T,
            f = {
                Ha: function(d, e) {
                    return function(k) {
                        var g = k.target || k.srcElement;
                        if (g) {
                            var r = a.I(e) || [],
                                n = g.getAttribute(d.Q);
                            k = k.clientX + ":" + k.clientY;
                            if (n && n === k) g.removeAttribute(d.Q);
                            else if (0 < r.length && (g = b.Xa(g)) && g.length)
                                if (r = g.length, n = g[g.length - 1], 1E4 > r * n.split(">").length)
                                    for (n = 0; n < r; n++) f.ra(d, g[n]);
                                else f.ra(d, n)
                        }
                    }
                },
                ra: function(a, b) {
                    for (var f = {}, g = String(b).split(">").length, r = 0; r < g; r++) f[b] = "", b = b.substring(0, b.lastIndexOf(">"));
                    a && (e.K(a) && a.da) && a.da(f)
                },
                zb: function(a, b) {
                    return function(e) {
                        (e.target || e.srcElement).setAttribute(a.Q, e.clientX + ":" + e.clientY);
                        a && a.O && (b ? a.O(b) : a.O("#" + encodeURIComponent(this.id), e.type))
                    }
                }
            };
        return h.Ia = f
    })();
    (function() {
        var e = mt.d,
            b = mt.event,
            a = h.T,
            f = h.Ia,
            d = {
                Q: "HM_fix",
                va: function() {
                    b.c(document, "click", f.Ha(d, c.etrk));
                    for (var q = a.I(c.etrk) || [], k = 0; k < q.length; k++) {
                        var g = q[k]; - 1 === g.indexOf(">") && (0 === g.indexOf("#") && (g = g.substring(1)), (g = e.Ma(g)) && b.c(g, "click", f.zb(d)))
                    }
                },
                da: function(b) {
                    for (var e = a.I(c.etrk) || [], f = 0; f < e.length; f++) {
                        var r = e[f];
                        b.hasOwnProperty(r) && d.O(r)
                    }
                },
                O: function(a, b) {
                    h.b.a.et = 1;
                    h.b.a.ep = "{id:" + a + ",eventType:" + (b || "click") + "}";
                    h.b.n()
                }
            };
        h.t.c("pv-b", d.va);
        return d
    })();
    (function() {
        var e = mt.d,
            b = mt.lang,
            a = mt.event,
            f = mt.e,
            d = h.s,
            q = h.T,
            k = [],
            g = {
                ua: function() {
                    c.ctrk && 0 < c.ctrk.length && (a.c(document, "mouseup", g.Ca()), a.c(window, "unload", function() {
                        g.N()
                    }), setInterval(function() {
                        g.N()
                    }, d.Da))
                },
                Ca: function() {
                    return function(a) {
                        if (q.I(c.ctrk, t) && (a = g.Oa(a), "" !== a)) {
                            var b = (d.M + "//" + d.ba + "?" + h.b.qa().replace(/ep=[^&]*/, "ep=" + encodeURIComponent(a))).length;
                            b + (d.H + "").length > d.ea || (b + encodeURIComponent(k.join("!") + (k.length ? "!" : "")).length + (d.H + "").length > d.ea && g.N(), k.push(a),
                                (k.length >= d.Ea || /\*a\*/.test(a)) && g.N())
                        }
                    }
                },
                Oa: function(a) {
                    var d = a.target || a.srcElement,
                        k, l;
                    f.nb ? (l = Math.max(document.documentElement.scrollTop, document.body.scrollTop), k = Math.max(document.documentElement.scrollLeft, document.body.scrollLeft), k = a.clientX + k, l = a.clientY + l) : (k = a.pageX, l = a.pageY);
                    a = g.Ua(a, d, k, l);
                    var m = window.innerWidth || document.documentElement.clientWidth || document.body.offsetWidth;
                    switch (c.align) {
                        case 1:
                            k -= m / 2;
                            break;
                        case 2:
                            k -= m
                    }
                    m = [];
                    m.push(k);
                    m.push(l);
                    m.push(a.ub);
                    m.push(a.vb);
                    m.push(a.yb);
                    m.push(b.g(a.wb));
                    m.push(a.Mb);
                    m.push(a.eb);
                    (d = "a" === (d.tagName || "").toLowerCase() ? d : e.Na(d)) ? (m.push("a"), m.push(b.g(encodeURIComponent(d.href)))) : m.push("b");
                    return m.join("*")
                },
                Ua: function(a, d, g, k) {
                    a = e.Ya(d);
                    var m = 0,
                        w = 0,
                        y = 0,
                        x = 0;
                    if (d && (m = d.offsetWidth || d.clientWidth, w = d.offsetHeight || d.clientHeight, x = e.Va(d), y = x.left, x = x.top, b.l(d.getBBox) && (w = d.getBBox(), m = w.width, w = w.height), "html" === (d.tagName || "").toLowerCase())) m = Math.max(m, d.clientWidth), w = Math.max(w, d.clientHeight);
                    return {
                        ub: Math.round(100 *
                            ((g - y) / m)),
                        vb: Math.round(100 * ((k - x) / w)),
                        yb: f.orientation,
                        wb: a,
                        Mb: m,
                        eb: w
                    }
                },
                N: function() {
                    0 !== k.length && (h.b.a.et = 2, h.b.a.ep = k.join("!"), h.b.n(), k = [])
                }
            };
        h.t.c("pv-b", g.ua);
        return g
    })();
    (function() {
        function e() {
            return function() {
                h.b.a.et = 3;
                h.b.a.ep = h.U.Wa() + "," + h.U.Sa();
                h.b.a.hca = c.hca;
                h.b.n()
            }
        }

        function b() {
            clearTimeout(C);
            var a;
            y && (a = "visible" == document[y]);
            x && (a = !document[x]);
            g = "undefined" == typeof a ? t : a;
            if ((!k || !r) && g && n) w = t, l = +new Date;
            else if (k && r && (!g || !n)) w = v, m += +new Date - l;
            k = g;
            r = n;
            C = setTimeout(b, 100)
        }

        function a(a) {
            var b = document,
                m = "";
            if (a in b) m = a;
            else
                for (var d = ["webkit", "ms", "moz", "o"], e = 0; e < d.length; e++) {
                    var f = d[e] + a.charAt(0).toUpperCase() + a.slice(1);
                    if (f in b) {
                        m = f;
                        break
                    }
                }
            return m
        }

        function f(a) {
            if (!("focus" == a.type || "blur" == a.type) || !(a.target && a.target != window)) n = "focus" == a.type || "focusin" == a.type ? t : v, b()
        }
        var d = mt.event,
            q = h.t,
            k = t,
            g = t,
            r = t,
            n = t,
            p = +new Date,
            l = p,
            m = 0,
            w = t,
            y = a("visibilityState"),
            x = a("hidden"),
            C;
        b();
        (function() {
            var a = y.replace(/[vV]isibilityState/, "visibilitychange");
            d.c(document, a, b);
            d.c(window, "pageshow", b);
            d.c(window, "pagehide", b);
            "object" == typeof document.onfocusin ? (d.c(document, "focusin", f), d.c(document, "focusout", f)) : (d.c(window, "focus", f), d.c(window, "blur",
                f))
        })();
        h.U = {
            Wa: function() {
                return +new Date - p
            },
            Sa: function() {
                return w ? +new Date - l + m : m
            }
        };
        q.c("pv-b", function() {
            d.c(window, "unload", e())
        });
        q.c("duration-send", e());
        q.c("duration-done", function() {
            l = p = +new Date;
            m = 0
        });
        return h.U
    })();
    (function() {
        var e = mt.lang,
            b = h.s,
            a = h.load,
            f = h.S,
            d = {
                mb: function(d) {
                    if ((window._dxt === s || e.j(window._dxt, "Array")) && "undefined" !== typeof h.b) {
                        var k = f.J();
                        a([b.protocol, "//datax.baidu.com/x.js?si=", c.id, "&dm=", encodeURIComponent(k)].join(""), d)
                    }
                },
                Fb: function(a) {
                    if (e.j(a, "String") || e.j(a, "Number")) window._dxt = window._dxt || [], window._dxt.push(["_setUserId", a])
                }
            };
        return h.Fa = d
    })();
    (function() {
        function e(a, b, d, e) {
            if (!(a === s || b === s || e === s)) {
                if ("" === a) return [b, d, e].join("*");
                a = String(a).split("!");
                for (var f, g = v, k = 0; k < a.length; k++)
                    if (f = a[k].split("*"), String(b) === f[0]) {
                        f[1] = d;
                        f[2] = e;
                        a[k] = f.join("*");
                        g = t;
                        break
                    }
                g || a.push([b, d, e].join("*"));
                return a.join("!")
            }
        }

        function b(a) {
            for (var d in a)
                if ({}.hasOwnProperty.call(a, d)) {
                    var e = a[d];
                    f.K(e) || f.isArray(e) ? b(e) : a[d] = String(e)
                }
        }
        var a = mt.url,
            f = mt.lang,
            d = mt.z,
            q = mt.e,
            k = h.s,
            g = h.t,
            r = h.Fa,
            n = h.load,
            p = h.S,
            l = {
                G: [],
                P: 0,
                Z: v,
                o: {
                    ca: "",
                    page: ""
                },
                F: function() {
                    l.i =
                        0;
                    g.c("pv-b", function() {
                        l.Ga();
                        l.Ja()
                    });
                    g.c("pv-d", function() {
                        l.Ka();
                        l.o.page = ""
                    });
                    g.c("stag-b", function() {
                        h.b.a.api = l.i || l.P ? l.i + "_" + l.P : "";
                        h.b.a.ct = [decodeURIComponent(p.getData("Hm_ct_" + c.id) || ""), l.o.ca, l.o.page].join("!")
                    });
                    g.c("stag-d", function() {
                        h.b.a.api = 0;
                        l.i = 0;
                        l.P = 0
                    })
                },
                Ga: function() {
                    var a = window._hmt || [];
                    if (!a || f.j(a, "Array")) window._hmt = {
                        id: c.id,
                        cmd: {},
                        push: function() {
                            for (var a = window._hmt, b = 0; b < arguments.length; b++) {
                                var e = arguments[b];
                                f.j(e, "Array") && (a.cmd[a.id].push(e), "_setAccount" ===
                                    e[0] && (1 < e.length && /^[0-9a-f]{31,32}$/.test(e[1])) && (e = e[1], a.id = e, a.cmd[e] = a.cmd[e] || []))
                            }
                        }
                    }, window._hmt.cmd[c.id] = [], window._hmt.push.apply(window._hmt, a)
                },
                Ja: function() {
                    var a = window._hmt;
                    if (a && a.cmd && a.cmd[c.id])
                        for (var b = a.cmd[c.id], e = /^_track(Event|Order)$/, d = 0, f = b.length; d < f; d++) {
                            var g = b[d];
                            e.test(g[0]) ? l.G.push(g) : l.aa(g)
                        }
                    a.cmd[c.id] = {
                        push: l.aa
                    }
                },
                Ka: function() {
                    if (0 < l.G.length)
                        for (var a = 0, b = l.G.length; a < b; a++) l.aa(l.G[a]);
                    l.G = u
                },
                aa: function(a) {
                    var b = a[0];
                    if (l.hasOwnProperty(b) && f.l(l[b])) l[b](a)
                },
                _setAccount: function(a) {
                    1 < a.length && /^[0-9a-f]{31,32}$/.test(a[1]) && (l.i |= 1)
                },
                _setAutoPageview: function(a) {
                    if (1 < a.length && (a = a[1], v === a || t === a)) l.i |= 2, h.b.ia = a
                },
                _trackPageview: function(a) {
                    1 < a.length && (a[1].charAt && "/" === a[1].charAt(0)) && (l.i |= 4, h.b.a.sn = h.b.fa(), h.b.a.et = 0, h.b.a.ep = "", h.b.a.vl = q.X(), l.Z || (h.b.a.su = h.b.a.u || document.location.href), h.b.a.u = k.protocol + "//" + document.location.host + a[1], h.b.n(), h.b.sb = +new Date)
                },
                _trackEvent: function(a) {
                    2 < a.length && (l.i |= 8, h.b.a.et = 4, h.b.a.ep = f.g(a[1]) +
                        "*" + f.g(a[2]) + (a[3] ? "*" + f.g(a[3]) : "") + (a[4] ? "*" + f.g(a[4]) : ""), h.b.n())
                },
                _setCustomVar: function(a) {
                    if (!(4 > a.length)) {
                        var b = a[1],
                            e = a[4] || 3;
                        if (0 < b && 6 > b && 0 < e && 4 > e) {
                            l.P++;
                            for (var d = (h.b.a.cv || "*").split("!"), g = d.length; g < b - 1; g++) d.push("*");
                            d[b - 1] = e + "*" + f.g(a[2]) + "*" + f.g(a[3]);
                            h.b.a.cv = d.join("!");
                            a = h.b.a.cv.replace(/[^1](\*[^!]*){2}/g, "*").replace(/((^|!)\*)+$/g, "");
                            "" !== a ? p.setData("Hm_cv_" + c.id, encodeURIComponent(a), c.age) : p.removeData("Hm_cv_" + c.id)
                        }
                    }
                },
                _setUserTag: function(a) {
                    if (!(3 > a.length)) {
                        var b =
                            f.g(a[1]);
                        a = f.g(a[2]);
                        if (b !== s && a !== s) {
                            var d = decodeURIComponent(p.getData("Hm_ct_" + c.id) || ""),
                                d = e(d, b, 1, a);
                            p.setData("Hm_ct_" + c.id, encodeURIComponent(d), c.age)
                        }
                    }
                },
                _setVisitTag: function(a) {
                    if (!(3 > a.length)) {
                        var b = f.g(a[1]);
                        a = f.g(a[2]);
                        if (b !== s && a !== s) {
                            var d = l.o.ca,
                                d = e(d, b, 2, a);
                            l.o.ca = d
                        }
                    }
                },
                _setPageTag: function(a) {
                    if (!(3 > a.length)) {
                        var b = f.g(a[1]);
                        a = f.g(a[2]);
                        if (b !== s && a !== s) {
                            var d = l.o.page,
                                d = e(d, b, 3, a);
                            l.o.page = d
                        }
                    }
                },
                _setReferrerOverride: function(a) {
                    1 < a.length && (a = a[1], f.j(a, "String") ? (h.b.a.su = "/" ===
                        a.charAt(0) ? k.protocol + "//" + window.location.host + a : a, l.Z = t) : l.Z = v)
                },
                _trackOrder: function(a) {
                    a = a[1];
                    f.K(a) && (b(a), l.i |= 16, h.b.a.et = 94, h.b.a.ep = d.stringify(a), h.b.n())
                },
                _setDataxId: function(a) {
                    a = a[1];
                    r.mb();
                    r.Fb(a)
                },
                _setAutoTracking: function(a) {
                    if (1 < a.length && (a = a[1], v === a || t === a)) h.b.ka = a
                },
                _trackPageDuration: function(a) {
                    1 < a.length ? (a = a[1], 2 === String(a).split(",").length && (h.b.a.et = 3, h.b.a.ep = a, h.b.n())) : g.k("duration-send");
                    g.k("duration-done")
                },
                _require: function(b) {
                    1 < b.length && (b = b[1], k.ya.test(a.W(b)) &&
                        n(b))
                },
                _providePlugin: function(a) {
                    if (1 < a.length) {
                        var b = window._hmt,
                            d = a[1];
                        a = a[2];
                        if (f.Y(k.oa, d) && f.l(a) && (b.plugins = b.plugins || {}, b.A = b.A || {}, b.plugins[d] = a, b.m = b.m || [], a = b.m.slice(), d && a.length && a[0][1] === d))
                            for (var e = 0, g = a.length; e < g; e++) {
                                var l = a[e][2] || {};
                                if (b.plugins[d] && !b.A[d]) b.A[d] = new b.plugins[d](l), b.m.shift();
                                else break
                            }
                    }
                },
                _requirePlugin: function(a) {
                    if (1 < a.length) {
                        var b = window._hmt,
                            d = a[1],
                            e = a[2] || {};
                        if (f.Y(k.oa, d))
                            if (b.plugins = b.plugins || {}, b.A = b.A || {}, b.plugins[d] && !b.A[d]) b.A[d] = new b.plugins[d](e);
                            else {
                                b.m = b.m || [];
                                for (var e = 0, g = b.m.length; e < g; e++)
                                    if (b.m[e][1] === d) return;
                                b.m.push(a);
                                l._require([u, k.xb + d + ".js"])
                            }
                    }
                }
            };
        l.F();
        h.za = l;
        return h.za
    })();
    (function() {
        var e = h.t;
        c.spa !== s && "1" === String(c.spa) && (window._hmt = window._hmt || [], window._hmt.push(["_requirePlugin", "UrlChangeTracker"]), e.c("pv-b", function() {
            "" !== window.location.hash && (h.b.a.u = window.location.href)
        }))
    })();
    (function() {
        function e() {
            "undefined" === typeof window["_bdhm_loaded_" + c.id] && (window["_bdhm_loaded_" + c.id] = t, this.a = {}, this.ka = this.ia = t, this.ha = p.ha, this.Qb = f.$(c.aet) && 0 < c.aet.length ? c.aet.split(",") : "", this.F())
        }
        var b = mt.url,
            a = mt.B,
            f = mt.lang,
            d = mt.cookie,
            q = mt.e,
            k = mt.sessionStorage,
            g = mt.z,
            r = mt.event,
            n = h.S,
            p = h.s,
            l = h.load,
            m = h.t;
        e.prototype = {
            Db: function() {
                var a, b, e, f;
                p.la = n.getData("Hm_lpvt_" + c.id) || 0;
                if (f = n.getData("Hm_lvt_" + c.id)) {
                    for (b = f.split(","); 2592E3 < p.C - b[0];) b.shift();
                    e = 4 > b.length ? 2 : 3;
                    for (p.C -
                        p.la > c.vdur && b.push(p.C); 4 < b.length;) b.shift();
                    f = b.join(",");
                    b = b[b.length - 1]
                } else f = p.C, b = "", e = 1;
                this.ob() ? (n.setData("Hm_lvt_" + c.id, f, c.age), n.setData("Hm_lpvt_" + c.id, p.C), a = d.rb(n.J(), n.V())) : this.La();
                this.a.cc = a;
                this.a.lt = b;
                this.a.lv = e
            },
            ob: function() {
                var a = b.W(document.location.href);
                return !f.Y("sjh.baidu.com isite.baidu.com ls.wejianzhan.com bs.wejianzhan.com product.weijianzhan.com qianhu.weijianzhan.com aisite.wejianzhan.com".split(" "), a)
            },
            La: function() {
                for (var a = document.cookie.split(";"),
                        b = 0; b < a.length; b++) {
                    var d = a[b].split("=");
                    d.length && /Hm_(up|ct|cv|lp?vt)_[0-9a-f]{31}/.test(String(d[0])) && n.removeData(d[0]);
                    d.length && /Hm_ck_[0-9]{13}/.test(String(d[0])) && n.removeData(d[0])
                }
            },
            qa: function() {
                for (var a = [], b = this.a.et, d = 0, e = p.sa.length; d < e; d++) {
                    var f = p.sa[d],
                        g = this.a[f];
                    "undefined" !== typeof g && "" !== g && ("tt" !== f || "tt" === f && 0 === b) && ("ct" !== f || "ct" === f && 0 === b) && a.push(f + "=" + encodeURIComponent(g))
                }
                return a.join("&")
            },
            Eb: function() {
                this.Db();
                this.a.si = c.id;
                this.a.sn = this.fa();
                this.a.su =
                    document.referrer;
                this.a.ds = q.Ab;
                this.a.cl = q.colorDepth + "-bit";
                this.a.ln = String(q.language).toLowerCase();
                this.a.ja = q.javaEnabled ? 1 : 0;
                this.a.ck = q.cookieEnabled ? 1 : 0;
                this.a.lo = "number" === typeof _bdhm_top ? 1 : 0;
                this.a.v = "1.2.92";
                this.a.cv = decodeURIComponent(n.getData("Hm_cv_" + c.id) || "");
                this.a.tt = document.title || "";
                this.a.vl = q.X();
                var a = document.location.href;
                this.a.cm = b.f(a, p.ib) || "";
                this.a.cp = b.f(a, p.jb) || b.f(a, p.Jb) || "";
                this.a.cw = b.f(a, p.hb) || b.f(a, p.Lb) || "";
                this.a.ci = b.f(a, p.fb) || b.f(a, p.Ib) || "";
                this.a.cf =
                    b.f(a, p.kb) || b.f(a, p.Kb) || "";
                this.a.cu = b.f(a, p.gb) || b.f(a, p.Hb) || "";
                /https?:/.test(document.location.protocol) && (this.a.u = a)
            },
            F: function() {
                try {
                    this.Eb(), this.Cb(), h.b = this, this.Aa(), this.tb(), m.k("pv-b"), this.Bb()
                } catch (b) {
                    var d = [];
                    d.push("si=" + c.id);
                    d.push("n=" + encodeURIComponent(b.name));
                    d.push("m=" + encodeURIComponent(b.message));
                    d.push("r=" + encodeURIComponent(document.referrer));
                    a.log(p.M + "//" + p.ba + "?" + d.join("&"))
                }
            },
            Bb: function() {
                function a() {
                    m.k("pv-d")
                }
                this.ia ? (this.a.et = 0, this.a.ep = "", m.k("setPageviewProp"),
                    this.a.vl = q.X(), this.n(a), this.a.p = "") : a();
                this.sb = +new Date;
                m.k("clearPageviewProp")
            },
            n: function(b) {
                if (this.ka) {
                    var d = this;
                    d.a.rnd = Math.round(Math.random() * p.H);
                    d.a.r = q.orientation;
                    d.a.ww = q.ta;
                    m.k("stag-b");
                    var e = p.M + "//" + p.ba + "?" + d.qa();
                    m.k("stag-d");
                    d.wa(e);
                    a.log(e, function(a) {
                        d.pa(a);
                        f.l(b) && b.call(d)
                    })
                }
            },
            Aa: function() {
                try {
                    if (window.postMessage && window.self !== window.parent) {
                        var a = this;
                        r.c(window, "message", function(d) {
                            if (b.W(d.origin) === p.Gb) {
                                d = d.data || {};
                                var e = d.jn || "",
                                    f = /^customevent$|^heatmap$|^pageclick$|^select$/.test(e);
                                if (RegExp(c.id).test(d.sd || "") && f) a.a.rnd = Math.round(Math.random() * p.H), l(p.protocol + "//" + c.js + e + ".js?" + a.a.rnd)
                            }
                        });
                        window.parent.postMessage({
                            id: c.id,
                            url: document.location.href,
                            status: "__Messenger__hmLoaded"
                        }, "*")
                    }
                } catch (d) {}
            },
            tb: function() {
                try {
                    if (window.self === window.parent) {
                        var a = document.location.href,
                            d = b.f(a, "baidu-analytics-token"),
                            e = b.f(a, "baidu-analytics-jn");
                        /^[a-f0-9]{32}\/?$/.test(d) && /^overlay\/?$/.test(e) && l(p.protocol + "//" + c.js + e + ".js?" + Math.round(Math.random() * p.H))
                    }
                } catch (f) {}
            },
            wa: function(a) {
                var b;
                try {
                    b = g.parse(k.get("Hm_unsent_" + c.id) || "[]")
                } catch (d) {
                    b = []
                }
                var e = this.a.u ? "" : "&u=" + encodeURIComponent(document.location.href);
                b.push(a.replace(/^https?:\/\//, "") + e);
                k.set("Hm_unsent_" + c.id, g.stringify(b))
            },
            pa: function(a) {
                var b;
                try {
                    b = g.parse(k.get("Hm_unsent_" + c.id) || "[]")
                } catch (d) {
                    b = []
                }
                if (b.length) {
                    a = a.replace(/^https?:\/\//, "");
                    for (var e = 0; e < b.length; e++)
                        if (a.replace(/&u=[^&]*/, "") === b[e].replace(/&u=[^&]*/, "")) {
                            b.splice(e, 1);
                            break
                        }
                    b.length ? k.set("Hm_unsent_" + c.id, g.stringify(b)) : this.Ba()
                }
            },
            Ba: function() {
                k.remove("Hm_unsent_" +
                    c.id)
            },
            Cb: function() {
                var b = this,
                    d;
                try {
                    d = g.parse(k.get("Hm_unsent_" + c.id) || "[]")
                } catch (e) {
                    d = []
                }
                if (d.length)
                    for (var f = function(d) {
                            a.log(p.M + "//" + d, function(a) {
                                b.pa(a)
                            })
                        }, l = 0; l < d.length; l++) f(d[l])
            },
            fa: function() {
                return Math.round(+new Date / 1E3) % 65535
            }
        };
        return new e
    })();
    var z = h.s,
        A = h.load;
    if (c.apps) {
        var B = [z.protocol, "//ers.baidu.com/app/s.js?"];
        B.push(c.apps);
        A(B.join(""))
    }
    var D = h.s,
        E = h.load;
    c.pt && E([D.protocol, "//ada.baidu.com/phone-tracker/insert_bdtj?sid=", c.pt].join(""));
    var F = h.load;
    if (c.qiao) {
        for (var G = ["https://goutong.baidu.com/site/"], H = c.id, I = 5381, J = H.length, K = 0; K < J; K++) I = (33 * I + Number(H.charCodeAt(K))) % 4294967296;
        2147483648 < I && (I -= 2147483648);
        G.push(I % 1E3 + "/");
        G.push(c.id + "/b.js");
        G.push("?siteId=" + c.qiao);
        F(G.join(""))
    };
})();