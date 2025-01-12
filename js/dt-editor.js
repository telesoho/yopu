!function() {
    "use strict";
    function t(t) {
        return e() ? console.log.bind(console, `[${t}]`) : () => {}
    }
    function n(t) {
        return e() ? console.error.bind(console, `[${t}]`) : t => {
            t instanceof Error && self.captureException && self.captureException(t)
        }
    }
    function e() {
        return self.location && ("localhost" === self.location.hostname || 0 === self.location.hostname.indexOf("192.168.") || "dev.yopu.co" === self.location.hostname || "18080" === self.location.port || self.location.search.indexOf("log=8") > 0)
    }
    const i = "user-data-user-info"
      , r = "user-data-user-portfolio"
      , o = "user-data-portfolio-stale"
      , s = "mine-settings:selected-instrument"
      , u = "mine-settings:selected-color-mode"
      , a = t("Storage")
      , {localStorage: c} = window;
    class l {
        static setItem(t, n) {
            if (a("setItem", t),
            c)
                try {
                    c.setItem(t, n)
                } catch (t) {
                    self.captureException && self.captureException(t)
                }
        }
        static getItem(t) {
            return c ? c.getItem(t) : null
        }
        static removeItem(t) {
            c && c.removeItem(t)
        }
        static setInteger(t, n) {
            if (!Number.isInteger(n))
                throw new Error("Value is not integer: key=" + t + ", value=" + n);
            this.setItem(t, n)
        }
        static getInteger(t) {
            const n = this.getItem(t)
              , e = parseInt(n, 10);
            return isNaN(e) ? null : e
        }
        static setBoolean(t, n) {
            if ("boolean" != typeof n)
                throw new Error("Value is not boolean: key=" + t + ", value=" + n);
            this.setItem(t, n ? "1" : "0")
        }
        static getBoolean(t) {
            const n = this.getItem(t);
            return "1" === n || "0" !== n && null
        }
        static getJson(t) {
            const n = this.getItem(t);
            if (!n)
                return null;
            try {
                return JSON.parse(n)
            } catch (t) {
                return null
            }
        }
        static setJson(t, n) {
            if (null != n) {
                if (!(n instanceof Object))
                    throw new Error("Value is not JSON: key=" + t + ", value=" + n);
                this.setItem(t, JSON.stringify(n))
            } else
                this.removeItem(t)
        }
        static clear() {
            c.clear()
        }
    }
    function f(t) {
        const n = [];
        for (const e in t)
            t.hasOwnProperty(e) && void 0 !== t[e] && n.push(`${e}=${encodeURIComponent(t[e])}`);
        return n.join("&")
    }
    function d(t, n, e) {
        let i = t;
        const r = f(n);
        r && (i += "?" + r);
        const o = f(e);
        return o && (i += "#" + o),
        i
    }
    function h(t=location.search) {
        const n = {}
          , e = t.substr(1).split("&");
        for (const t in e)
            if (e.hasOwnProperty(t)) {
                const i = e[t]
                  , r = i.indexOf("=");
                n[i.substr(0, r)] = decodeURIComponent(i.substr(r + 1))
            }
        return n
    }
    function v() {
        const t = self.location.hash.substr(1).split("&")
          , n = {};
        return t.forEach((t => {
            const e = t.split("=");
            if (2 === e.length) {
                let t = decodeURIComponent(e[1]);
                "true" === t ? t = !0 : "false" === t ? t = !1 : String(parseInt(t, 10)) === t && (t = parseInt(t, 10)),
                n[e[0]] = t
            }
        }
        )),
        n
    }
    function p(t) {
        0 === document.referrer.indexOf(location.origin) ? t ? location = document.referrer : history.back() : location = "/main"
    }
    const m = Object.assign({}, {
        GUITAR: "guitar",
        UKULELE: "ukulele",
        PIANO: "piano"
    }, {
        JIAN: "jian"
    });
    m.GUITAR,
    m.UKULELE,
    m.PIANO,
    m.JIAN;
    const y = "xhe"
      , g = "regular"
      , b = "inline"
      , w = "number"
      , x = [{
        title: "降半调调弦",
        value: -1
    }, {
        title: "不夹",
        value: 0
    }, {
        title: "1品",
        value: 1
    }, {
        title: "2品",
        value: 2
    }, {
        title: "3品",
        value: 3
    }, {
        title: "4品",
        value: 4
    }, {
        title: "5品",
        value: 5
    }, {
        title: "6品",
        value: 6
    }];
    function k(t, n=!1) {
        return n ? x.slice(0) : t === m.GUITAR ? x.slice(0, 7) : t === m.UKULELE ? x.slice(0, 4) : []
    }
    function E() {
        let t = h().instrument || v().instrument;
        return X(t) || (t = l.getItem(s)),
        X(t) ? t : null
    }
    function X(t) {
        return [m.GUITAR, m.UKULELE, m.JIAN, m.PIANO].includes(t)
    }
    const S = "account"
      , T = "api"
      , C = "apple"
      , j = "chat"
      , O = "finance"
      , A = "i"
      , D = "media"
      , M = "payment"
      , _ = "product"
      , $ = "public"
      , B = "ranking"
      , F = "recommendation"
      , I = "search"
      , R = "sheet"
      , N = "sheet-list"
      , G = "sheets"
      , z = "tip-off"
      , P = "user"
      , q = "users"
      , L = "wx";
    K([T, S, "cap-sessions"]),
    K([T, S, "request-cell-code"]),
    K([T, S, "request-verification-code"]),
    K([T, S, "login-name-exists"]),
    K([T, S, "sessions"]),
    K([T, j, "broadcast"]),
    K([T, j, "image"]),
    K([T, j, "message"]),
    K([T, j, "messages"]),
    K([T, j, "systemmessages"]),
    K([T, j, "contacts"]);
    const H = K([T, R])
      , U = K([T, "draft"]);
    K([T, "drafts"]);
    const J = K([T, R, "content"]);
    K([T, "unlink-draft-dory"]);
    const W = K([T, "submit-draft"]);
    K([T, R, "favorite"]),
    K([T, R, "rating"]),
    K([T, R, "settings"]),
    K([T, R, F]),
    K([T, R, "editor-choice"]),
    K([T, R, $]),
    K([T, D]),
    K([T, D, "play"]),
    K([T, R, z]),
    K([T, R, "screenshot"]),
    K([T, R, "view"]),
    K([T, "song", G]),
    K([T, P, "purchases"]),
    K([T, P, G]),
    K([T, P, "award"]),
    K([T, P, "info"]),
    K([T, P, "portfolio"]);
    const V = K([T, P, "public-info"]);
    function K(t) {
        return "/" + t.join("/")
    }
    K([T, P, "mute"]),
    K([T, P, "unmute"]),
    K([T, P, "report"]),
    K([T, P, z]),
    K([T, M, C, "transaction"]),
    K([T, M, C, "auto-restore"]),
    K([T, M, "history"]),
    K([T, M, "purchase"]),
    K([T, M, "user-balance"]),
    K([T, M, "purchase-details"]),
    K([T, M, L, "check-refund"]),
    K([T, M, L, "refund-order"]),
    K([T, _, "coins-payable"]),
    K([T, _, "membership-plans"]),
    K([T, P, "real-id"]),
    K([T, P]),
    K([T, "dory"]),
    K([T, "dories"]),
    K([T, "lock-dory"]),
    K([T, N]),
    K([T, N, $]),
    K([T, G, "new"]),
    K([T, G, "category"]),
    K([T, "artists"]),
    K([T, "posts", F]),
    K([T, I, "click"]),
    K([T, I, G]),
    K([T, I, "filled-queries"]),
    K([T, M, "claim-coupon"]),
    K([T, M, L, "check-order"]),
    K([T, M, L, "place-order"]),
    K([q, B, "playerscore"]),
    K([q, B, "totalscore"]),
    K([q, B]),
    K([T, O, "vat-records"]),
    K([T, O, "fapiao"]),
    K([A, "bustcache"]),
    K([A, "bustcache-search"]),
    K([A, "chat-bot-vocab"]),
    K([A, "chat-bot-vocabs"]),
    K([A, "line-item"]),
    K([A, "line-items"]),
    K([A, "cdn"]),
    K([A, z]),
    K([A, "model", z]);
    var Y = function(t, n) {
        return (Y = Object.setPrototypeOf || {
            __proto__: []
        }instanceof Array && function(t, n) {
            t.__proto__ = n
        }
        || function(t, n) {
            for (var e in n)
                n.hasOwnProperty(e) && (t[e] = n[e])
        }
        )(t, n)
    };
    function Z(t, n) {
        function e() {
            this.constructor = t
        }
        Y(t, n),
        t.prototype = null === n ? Object.create(n) : (e.prototype = n.prototype,
        new e)
    }
    var Q, tt, nt, et, it, rt, ot = function() {
        return (ot = Object.assign || function(t) {
            for (var n, e = 1, i = arguments.length; e < i; e++)
                for (var r in n = arguments[e])
                    Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r]);
            return t
        }
        ).apply(this, arguments)
    };
    function st(t, n) {
        var e = {};
        for (var i in t)
            Object.prototype.hasOwnProperty.call(t, i) && n.indexOf(i) < 0 && (e[i] = t[i]);
        if (null != t && "function" == typeof Object.getOwnPropertySymbols) {
            var r = 0;
            for (i = Object.getOwnPropertySymbols(t); r < i.length; r++)
                n.indexOf(i[r]) < 0 && Object.prototype.propertyIsEnumerable.call(t, i[r]) && (e[i[r]] = t[i[r]])
        }
        return e
    }
    function ut(t) {
        var n = "function" == typeof Symbol && t[Symbol.iterator]
          , e = 0;
        return n ? n.call(t) : {
            next: function() {
                return t && e >= t.length && (t = void 0),
                {
                    value: t && t[e++],
                    done: !t
                }
            }
        }
    }
    function at(t, n) {
        var e = "function" == typeof Symbol && t[Symbol.iterator];
        if (!e)
            return t;
        var i, r, o = e.call(t), s = [];
        try {
            for (; (void 0 === n || n-- > 0) && !(i = o.next()).done; )
                s.push(i.value)
        } catch (t) {
            r = {
                error: t
            }
        } finally {
            try {
                i && !i.done && (e = o.return) && e.call(o)
            } finally {
                if (r)
                    throw r.error
            }
        }
        return s
    }
    function ct() {
        for (var t = [], n = 0; n < arguments.length; n++)
            t = t.concat(at(arguments[n]));
        return t
    }
    function lt() {
        return "[object process]" === Object.prototype.toString.call("undefined" != typeof process ? process : 0)
    }
    function ft(t, n) {
        return t.require(n)
    }
    function dt(t) {
        var n;
        try {
            n = ft(module, t)
        } catch (t) {}
        try {
            var e = ft(module, "process").cwd;
            n = ft(module, e() + "/node_modules/" + t)
        } catch (t) {}
        return n
    }
    !function(t) {
        t.Ok = "ok",
        t.Exited = "exited",
        t.Crashed = "crashed",
        t.Abnormal = "abnormal"
    }(Q || (Q = {})),
    function(t) {
        t.Ok = "ok",
        t.Errored = "errored",
        t.Crashed = "crashed"
    }(tt || (tt = {})),
    function(t) {
        t.Fatal = "fatal",
        t.Error = "error",
        t.Warning = "warning",
        t.Log = "log",
        t.Info = "info",
        t.Debug = "debug",
        t.Critical = "critical"
    }(nt || (nt = {})),
    function(t) {
        t.fromString = function(n) {
            switch (n) {
            case "debug":
                return t.Debug;
            case "info":
                return t.Info;
            case "warn":
            case "warning":
                return t.Warning;
            case "error":
                return t.Error;
            case "fatal":
                return t.Fatal;
            case "critical":
                return t.Critical;
            case "log":
            default:
                return t.Log
            }
        }
    }(nt || (nt = {})),
    function(t) {
        t.Unknown = "unknown",
        t.Skipped = "skipped",
        t.Success = "success",
        t.RateLimit = "rate_limit",
        t.Invalid = "invalid",
        t.Failed = "failed"
    }(et || (et = {})),
    function(t) {
        t.fromHttpCode = function(n) {
            return n >= 200 && n < 300 ? t.Success : 429 === n ? t.RateLimit : n >= 400 && n < 500 ? t.Invalid : n >= 500 ? t.Failed : t.Unknown
        }
    }(et || (et = {})),
    function(t) {
        t.Explicit = "explicitly_set",
        t.Sampler = "client_sampler",
        t.Rate = "client_rate",
        t.Inheritance = "inheritance"
    }(it || (it = {})),
    function(t) {
        t.BeforeSend = "before_send",
        t.EventProcessor = "event_processor",
        t.NetworkError = "network_error",
        t.QueueOverflow = "queue_overflow",
        t.RateLimitBackoff = "ratelimit_backoff",
        t.SampleRate = "sample_rate"
    }(rt || (rt = {}));
    var ht = {};
    function vt() {
        return lt() ? global : "undefined" != typeof window ? window : "undefined" != typeof self ? self : ht
    }
    function pt(t) {
        switch (Object.prototype.toString.call(t)) {
        case "[object Error]":
        case "[object Exception]":
        case "[object DOMException]":
            return !0;
        default:
            return Xt(t, Error)
        }
    }
    function mt(t) {
        return "[object ErrorEvent]" === Object.prototype.toString.call(t)
    }
    function yt(t) {
        return "[object DOMError]" === Object.prototype.toString.call(t)
    }
    function gt(t) {
        return "[object String]" === Object.prototype.toString.call(t)
    }
    function bt(t) {
        return null === t || "object" != typeof t && "function" != typeof t
    }
    function wt(t) {
        return "[object Object]" === Object.prototype.toString.call(t)
    }
    function xt(t) {
        return "undefined" != typeof Event && Xt(t, Event)
    }
    function kt(t) {
        return "undefined" != typeof Element && Xt(t, Element)
    }
    function Et(t) {
        return Boolean(t && t.then && "function" == typeof t.then)
    }
    function Xt(t, n) {
        try {
            return t instanceof n
        } catch (t) {
            return !1
        }
    }
    function St(t, n) {
        try {
            for (var e = t, i = [], r = 0, o = 0, s = " > ".length, u = void 0; e && r++ < 5 && !("html" === (u = Tt(e, n)) || r > 1 && o + i.length * s + u.length >= 80); )
                i.push(u),
                o += u.length,
                e = e.parentNode;
            return i.reverse().join(" > ")
        } catch (t) {
            return "<unknown>"
        }
    }
    function Tt(t, n) {
        var e, i, r, o, s, u, a, c = t, l = [];
        if (!c || !c.tagName)
            return "";
        l.push(c.tagName.toLowerCase());
        var f = (null === (e = n) || void 0 === e ? void 0 : e.length) ? n.filter((function(t) {
            return c.getAttribute(t)
        }
        )).map((function(t) {
            return [t, c.getAttribute(t)]
        }
        )) : null;
        if (null === (i = f) || void 0 === i ? void 0 : i.length)
            f.forEach((function(t) {
                l.push("[" + t[0] + '="' + t[1] + '"]')
            }
            ));
        else if (c.id && l.push("#" + c.id),
        (r = c.className) && gt(r))
            for (o = r.split(/\s+/),
            a = 0; a < o.length; a++)
                l.push("." + o[a]);
        var d = ["type", "name", "title", "alt"];
        for (a = 0; a < d.length; a++)
            s = d[a],
            (u = c.getAttribute(s)) && l.push("[" + s + '="' + u + '"]');
        return l.join("")
    }
    var Ct = Object.setPrototypeOf || ({
        __proto__: []
    }instanceof Array ? function(t, n) {
        return t.__proto__ = n,
        t
    }
    : function(t, n) {
        for (var e in n)
            Object.prototype.hasOwnProperty.call(t, e) || (t[e] = n[e]);
        return t
    }
    );
    var jt = function(t) {
        function n(n) {
            var e = this.constructor
              , i = t.call(this, n) || this;
            return i.message = n,
            i.name = e.prototype.constructor.name,
            Ct(i, e.prototype),
            i
        }
        return Z(n, t),
        n
    }(Error)
      , Ot = /^(?:(\w+):)\/\/(?:(\w+)(?::(\w+))?@)([\w.-]+)(?::(\d+))?\/(.+)/
      , At = "Invalid Dsn"
      , Dt = function() {
        function t(t) {
            "string" == typeof t ? this._fromString(t) : this._fromComponents(t),
            this._validate()
        }
        return t.prototype.toString = function(t) {
            void 0 === t && (t = !1);
            var n = this
              , e = n.host
              , i = n.path
              , r = n.pass
              , o = n.port
              , s = n.projectId;
            return n.protocol + "://" + n.publicKey + (t && r ? ":" + r : "") + "@" + e + (o ? ":" + o : "") + "/" + (i ? i + "/" : i) + s
        }
        ,
        t.prototype._fromString = function(t) {
            var n = Ot.exec(t);
            if (!n)
                throw new jt(At);
            var e = at(n.slice(1), 6)
              , i = e[0]
              , r = e[1]
              , o = e[2]
              , s = void 0 === o ? "" : o
              , u = e[3]
              , a = e[4]
              , c = void 0 === a ? "" : a
              , l = ""
              , f = e[5]
              , d = f.split("/");
            if (d.length > 1 && (l = d.slice(0, -1).join("/"),
            f = d.pop()),
            f) {
                var h = f.match(/^\d+/);
                h && (f = h[0])
            }
            this._fromComponents({
                host: u,
                pass: s,
                path: l,
                projectId: f,
                port: c,
                protocol: i,
                publicKey: r
            })
        }
        ,
        t.prototype._fromComponents = function(t) {
            "user"in t && !("publicKey"in t) && (t.publicKey = t.user),
            this.user = t.publicKey || "",
            this.protocol = t.protocol,
            this.publicKey = t.publicKey || "",
            this.pass = t.pass || "",
            this.host = t.host,
            this.port = t.port || "",
            this.path = t.path || "",
            this.projectId = t.projectId
        }
        ,
        t.prototype._validate = function() {
            var t = this;
            if (["protocol", "publicKey", "host", "projectId"].forEach((function(n) {
                if (!t[n])
                    throw new jt("Invalid Dsn: " + n + " missing")
            }
            )),
            !this.projectId.match(/^\d+$/))
                throw new jt("Invalid Dsn: Invalid projectId " + this.projectId);
            if ("http" !== this.protocol && "https" !== this.protocol)
                throw new jt("Invalid Dsn: Invalid protocol " + this.protocol);
            if (this.port && isNaN(parseInt(this.port, 10)))
                throw new jt("Invalid Dsn: Invalid port " + this.port)
        }
        ,
        t
    }()
      , Mt = vt()
      , _t = "Sentry Logger ";
    function $t(t) {
        var n = vt();
        if (!("console"in n))
            return t();
        var e = n.console
          , i = {};
        ["debug", "info", "warn", "error", "log", "assert"].forEach((function(t) {
            t in n.console && e[t].u && (i[t] = e[t],
            e[t] = e[t].u)
        }
        ));
        var r = t();
        return Object.keys(i).forEach((function(t) {
            e[t] = i[t]
        }
        )),
        r
    }
    var Bt = function() {
        function t() {
            this._enabled = !1
        }
        return t.prototype.disable = function() {
            this._enabled = !1
        }
        ,
        t.prototype.enable = function() {
            this._enabled = !0
        }
        ,
        t.prototype.log = function() {
            for (var t = [], n = 0; n < arguments.length; n++)
                t[n] = arguments[n];
            this._enabled && $t((function() {
                Mt.console.log(_t + "[Log]: " + t.join(" "))
            }
            ))
        }
        ,
        t.prototype.warn = function() {
            for (var t = [], n = 0; n < arguments.length; n++)
                t[n] = arguments[n];
            this._enabled && $t((function() {
                Mt.console.warn(_t + "[Warn]: " + t.join(" "))
            }
            ))
        }
        ,
        t.prototype.error = function() {
            for (var t = [], n = 0; n < arguments.length; n++)
                t[n] = arguments[n];
            this._enabled && $t((function() {
                Mt.console.error(_t + "[Error]: " + t.join(" "))
            }
            ))
        }
        ,
        t
    }();
    Mt.g = Mt.g || {};
    var Ft = Mt.g.logger || (Mt.g.logger = new Bt)
      , It = function() {
        function t() {
            this._hasWeakSet = "function" == typeof WeakSet,
            this._inner = this._hasWeakSet ? new WeakSet : []
        }
        return t.prototype.memoize = function(t) {
            if (this._hasWeakSet)
                return !!this._inner.has(t) || (this._inner.add(t),
                !1);
            for (var n = 0; n < this._inner.length; n++) {
                if (this._inner[n] === t)
                    return !0
            }
            return this._inner.push(t),
            !1
        }
        ,
        t.prototype.unmemoize = function(t) {
            if (this._hasWeakSet)
                this._inner.delete(t);
            else
                for (var n = 0; n < this._inner.length; n++)
                    if (this._inner[n] === t) {
                        this._inner.splice(n, 1);
                        break
                    }
        }
        ,
        t
    }()
      , Rt = "<anonymous>";
    function Nt(t) {
        try {
            return t && "function" == typeof t && t.name || Rt
        } catch (t) {
            return Rt
        }
    }
    function Gt(t, n) {
        return void 0 === n && (n = 0),
        "string" != typeof t || 0 === n || t.length <= n ? t : t.substr(0, n) + "..."
    }
    function zt(t, n) {
        if (!Array.isArray(t))
            return "";
        for (var e = [], i = 0; i < t.length; i++) {
            var r = t[i];
            try {
                e.push(String(r))
            } catch (t) {
                e.push("[value cannot be serialized]")
            }
        }
        return e.join(n)
    }
    function Pt(t, n) {
        return !!gt(t) && (e = n,
        "[object RegExp]" === Object.prototype.toString.call(e) ? n.test(t) : "string" == typeof n && -1 !== t.indexOf(n));
        var e
    }
    function qt(t, n, e) {
        if (n in t) {
            var i = t[n]
              , r = e(i);
            if ("function" == typeof r)
                try {
                    r.prototype = r.prototype || {},
                    Object.defineProperties(r, {
                        u: {
                            enumerable: !1,
                            value: i
                        }
                    })
                } catch (t) {}
            t[n] = r
        }
    }
    function Lt(t) {
        if (pt(t)) {
            var n = t
              , e = {
                message: n.message,
                name: n.name,
                stack: n.stack
            };
            for (var i in n)
                Object.prototype.hasOwnProperty.call(n, i) && (e[i] = n[i]);
            return e
        }
        if (xt(t)) {
            var r = t
              , o = {};
            o.type = r.type;
            try {
                o.target = kt(r.target) ? St(r.target) : Object.prototype.toString.call(r.target)
            } catch (t) {
                o.target = "<unknown>"
            }
            try {
                o.currentTarget = kt(r.currentTarget) ? St(r.currentTarget) : Object.prototype.toString.call(r.currentTarget)
            } catch (t) {
                o.currentTarget = "<unknown>"
            }
            for (var s in "undefined" != typeof CustomEvent && Xt(t, CustomEvent) && (o.detail = r.detail),
            r)
                Object.prototype.hasOwnProperty.call(r, s) && (o[s] = r[s]);
            return o
        }
        return t
    }
    function Ht(t) {
        return function(t) {
            return ~-encodeURI(t).split(/%..|./).length
        }(JSON.stringify(t))
    }
    function Ut(t, n, e) {
        void 0 === n && (n = 3),
        void 0 === e && (e = 102400);
        var i = Vt(t, n);
        return Ht(i) > e ? Ut(t, n - 1, e) : i
    }
    function Jt(t, n) {
        return "domain" === n && t && "object" == typeof t && t._events ? "[Domain]" : "domainEmitter" === n ? "[DomainEmitter]" : "undefined" != typeof global && t === global ? "[Global]" : "undefined" != typeof window && t === window ? "[Window]" : "undefined" != typeof document && t === document ? "[Document]" : wt(e = t) && "nativeEvent"in e && "preventDefault"in e && "stopPropagation"in e ? "[SyntheticEvent]" : "number" == typeof t && t != t ? "[NaN]" : void 0 === t ? "[undefined]" : "function" == typeof t ? "[Function: " + Nt(t) + "]" : "symbol" == typeof t ? "[" + String(t) + "]" : "bigint" == typeof t ? "[BigInt: " + String(t) + "]" : t;
        var e
    }
    function Wt(t, n, e, i) {
        if (void 0 === e && (e = 1 / 0),
        void 0 === i && (i = new It),
        0 === e)
            return function(t) {
                var n = Object.prototype.toString.call(t);
                if ("string" == typeof t)
                    return t;
                if ("[object Object]" === n)
                    return "[Object]";
                if ("[object Array]" === n)
                    return "[Array]";
                var e = Jt(t);
                return bt(e) ? e : n
            }(n);
        if (null != n && "function" == typeof n.toJSON)
            return n.toJSON();
        var r = Jt(n, t);
        if (bt(r))
            return r;
        var o = Lt(n)
          , s = Array.isArray(n) ? [] : {};
        if (i.memoize(n))
            return "[Circular ~]";
        for (var u in o)
            Object.prototype.hasOwnProperty.call(o, u) && (s[u] = Wt(u, o[u], e - 1, i));
        return i.unmemoize(n),
        s
    }
    function Vt(t, n) {
        try {
            return JSON.parse(JSON.stringify(t, (function(t, e) {
                return Wt(t, e, n)
            }
            )))
        } catch (t) {
            return "**non-serializable**"
        }
    }
    function Kt(t, n) {
        void 0 === n && (n = 40);
        var e = Object.keys(Lt(t));
        if (e.sort(),
        !e.length)
            return "[object has no keys]";
        if (e[0].length >= n)
            return Gt(e[0], n);
        for (var i = e.length; i > 0; i--) {
            var r = e.slice(0, i).join(", ");
            if (!(r.length > n))
                return i === e.length ? r : Gt(r, n)
        }
        return ""
    }
    function Yt(t) {
        var n, e;
        if (wt(t)) {
            var i = t
              , r = {};
            try {
                for (var o = ut(Object.keys(i)), s = o.next(); !s.done; s = o.next()) {
                    var u = s.value;
                    void 0 !== i[u] && (r[u] = Yt(i[u]))
                }
            } catch (t) {
                n = {
                    error: t
                }
            } finally {
                try {
                    s && !s.done && (e = o.return) && e.call(o)
                } finally {
                    if (n)
                        throw n.error
                }
            }
            return r
        }
        return Array.isArray(t) ? t.map(Yt) : t
    }
    function Zt() {
        if (!("fetch"in vt()))
            return !1;
        try {
            return new Headers,
            new Request(""),
            new Response,
            !0
        } catch (t) {
            return !1
        }
    }
    function Qt(t) {
        return t && /^function fetch\(\)\s+\{\s+\[native code\]\s+\}$/.test(t.toString())
    }
    function tn() {
        if (!Zt())
            return !1;
        try {
            return new Request("_",{
                referrerPolicy: "origin"
            }),
            !0
        } catch (t) {
            return !1
        }
    }
    var nn, en = vt(), rn = {}, on = {};
    function sn(t) {
        if (!on[t])
            switch (on[t] = !0,
            t) {
            case "console":
                !function() {
                    if (!("console"in en))
                        return;
                    ["debug", "info", "warn", "error", "log", "assert"].forEach((function(t) {
                        t in en.console && qt(en.console, t, (function(n) {
                            return function() {
                                for (var e = [], i = 0; i < arguments.length; i++)
                                    e[i] = arguments[i];
                                an("console", {
                                    args: e,
                                    level: t
                                }),
                                n && Function.prototype.apply.call(n, en.console, e)
                            }
                        }
                        ))
                    }
                    ))
                }();
                break;
            case "dom":
                !function() {
                    if (!("document"in en))
                        return;
                    var t = an.bind(null, "dom")
                      , n = hn(t, !0);
                    en.document.addEventListener("click", n, !1),
                    en.document.addEventListener("keypress", n, !1),
                    ["EventTarget", "Node"].forEach((function(n) {
                        var e = en[n] && en[n].prototype;
                        e && e.hasOwnProperty && e.hasOwnProperty("addEventListener") && (qt(e, "addEventListener", (function(n) {
                            return function(e, i, r) {
                                if ("click" === e || "keypress" == e)
                                    try {
                                        var o = this
                                          , s = o.k = o.k || {}
                                          , u = s[e] = s[e] || {
                                            refCount: 0
                                        };
                                        if (!u.handler) {
                                            var a = hn(t);
                                            u.handler = a,
                                            n.call(this, e, a, r)
                                        }
                                        u.refCount += 1
                                    } catch (t) {}
                                return n.call(this, e, i, r)
                            }
                        }
                        )),
                        qt(e, "removeEventListener", (function(t) {
                            return function(n, e, i) {
                                if ("click" === n || "keypress" == n)
                                    try {
                                        var r = this
                                          , o = r.k || {}
                                          , s = o[n];
                                        s && (s.refCount -= 1,
                                        s.refCount <= 0 && (t.call(this, n, s.handler, i),
                                        s.handler = void 0,
                                        delete o[n]),
                                        0 === Object.keys(o).length && delete r.k)
                                    } catch (t) {}
                                return t.call(this, n, e, i)
                            }
                        }
                        )))
                    }
                    ))
                }();
                break;
            case "xhr":
                !function() {
                    if (!("XMLHttpRequest"in en))
                        return;
                    var t = []
                      , n = []
                      , e = XMLHttpRequest.prototype;
                    qt(e, "open", (function(e) {
                        return function() {
                            for (var i = [], r = 0; r < arguments.length; r++)
                                i[r] = arguments[r];
                            var o = this
                              , s = i[1];
                            o.X = {
                                method: gt(i[0]) ? i[0].toUpperCase() : i[0],
                                url: i[1]
                            },
                            gt(s) && "POST" === o.X.method && s.match(/sentry_key/) && (o.j = !0);
                            var u = function() {
                                if (4 === o.readyState) {
                                    try {
                                        o.X && (o.X.status_code = o.status)
                                    } catch (t) {}
                                    try {
                                        var e = t.indexOf(o);
                                        if (-1 !== e) {
                                            t.splice(e);
                                            var r = n.splice(e)[0];
                                            o.X && void 0 !== r[0] && (o.X.body = r[0])
                                        }
                                    } catch (t) {}
                                    an("xhr", {
                                        args: i,
                                        endTimestamp: Date.now(),
                                        startTimestamp: Date.now(),
                                        xhr: o
                                    })
                                }
                            };
                            return "onreadystatechange"in o && "function" == typeof o.onreadystatechange ? qt(o, "onreadystatechange", (function(t) {
                                return function() {
                                    for (var n = [], e = 0; e < arguments.length; e++)
                                        n[e] = arguments[e];
                                    return u(),
                                    t.apply(o, n)
                                }
                            }
                            )) : o.addEventListener("readystatechange", u),
                            e.apply(o, i)
                        }
                    }
                    )),
                    qt(e, "send", (function(e) {
                        return function() {
                            for (var i = [], r = 0; r < arguments.length; r++)
                                i[r] = arguments[r];
                            return t.push(this),
                            n.push(i),
                            an("xhr", {
                                args: i,
                                startTimestamp: Date.now(),
                                xhr: this
                            }),
                            e.apply(this, i)
                        }
                    }
                    ))
                }();
                break;
            case "fetch":
                !function() {
                    if (!function() {
                        if (!Zt())
                            return !1;
                        var t = vt();
                        if (Qt(t.fetch))
                            return !0;
                        var n = !1
                          , e = t.document;
                        if (e && "function" == typeof e.createElement)
                            try {
                                var i = e.createElement("iframe");
                                i.hidden = !0,
                                e.head.appendChild(i),
                                i.contentWindow && i.contentWindow.fetch && (n = Qt(i.contentWindow.fetch)),
                                e.head.removeChild(i)
                            } catch (t) {
                                Ft.warn("Could not create sandbox iframe for pure fetch check, bailing to window.fetch: ", t)
                            }
                        return n
                    }())
                        return;
                    qt(en, "fetch", (function(t) {
                        return function() {
                            for (var n = [], e = 0; e < arguments.length; e++)
                                n[e] = arguments[e];
                            var i = {
                                args: n,
                                fetchData: {
                                    method: cn(n),
                                    url: ln(n)
                                },
                                startTimestamp: Date.now()
                            };
                            return an("fetch", ot({}, i)),
                            t.apply(en, n).then((function(t) {
                                return an("fetch", ot(ot({}, i), {
                                    endTimestamp: Date.now(),
                                    response: t
                                })),
                                t
                            }
                            ), (function(t) {
                                throw an("fetch", ot(ot({}, i), {
                                    endTimestamp: Date.now(),
                                    error: t
                                })),
                                t
                            }
                            ))
                        }
                    }
                    ))
                }();
                break;
            case "history":
                !function() {
                    if (!function() {
                        var t = vt()
                          , n = t.chrome
                          , e = n && n.app && n.app.runtime
                          , i = "history"in t && !!t.history.pushState && !!t.history.replaceState;
                        return !e && i
                    }())
                        return;
                    var t = en.onpopstate;
                    function n(t) {
                        return function() {
                            for (var n = [], e = 0; e < arguments.length; e++)
                                n[e] = arguments[e];
                            var i = n.length > 2 ? n[2] : void 0;
                            if (i) {
                                var r = nn
                                  , o = String(i);
                                nn = o,
                                an("history", {
                                    from: r,
                                    to: o
                                })
                            }
                            return t.apply(this, n)
                        }
                    }
                    en.onpopstate = function() {
                        for (var n = [], e = 0; e < arguments.length; e++)
                            n[e] = arguments[e];
                        var i = en.location.href
                          , r = nn;
                        if (nn = i,
                        an("history", {
                            from: r,
                            to: i
                        }),
                        t)
                            try {
                                return t.apply(this, n)
                            } catch (t) {}
                    }
                    ,
                    qt(en.history, "pushState", n),
                    qt(en.history, "replaceState", n)
                }();
                break;
            case "error":
                vn = en.onerror,
                en.onerror = function(t, n, e, i, r) {
                    return an("error", {
                        column: i,
                        error: r,
                        line: e,
                        msg: t,
                        url: n
                    }),
                    !!vn && vn.apply(this, arguments)
                }
                ;
                break;
            case "unhandledrejection":
                pn = en.onunhandledrejection,
                en.onunhandledrejection = function(t) {
                    return an("unhandledrejection", t),
                    !pn || pn.apply(this, arguments)
                }
                ;
                break;
            default:
                Ft.warn("unknown instrumentation type:", t)
            }
    }
    function un(t) {
        t && "string" == typeof t.type && "function" == typeof t.callback && (rn[t.type] = rn[t.type] || [],
        rn[t.type].push(t.callback),
        sn(t.type))
    }
    function an(t, n) {
        var e, i;
        if (t && rn[t])
            try {
                for (var r = ut(rn[t] || []), o = r.next(); !o.done; o = r.next()) {
                    var s = o.value;
                    try {
                        s(n)
                    } catch (n) {
                        Ft.error("Error while triggering instrumentation handler.\nType: " + t + "\nName: " + Nt(s) + "\nError: " + n)
                    }
                }
            } catch (t) {
                e = {
                    error: t
                }
            } finally {
                try {
                    o && !o.done && (i = r.return) && i.call(r)
                } finally {
                    if (e)
                        throw e.error
                }
            }
    }
    function cn(t) {
        return void 0 === t && (t = []),
        "Request"in en && Xt(t[0], Request) && t[0].method ? String(t[0].method).toUpperCase() : t[1] && t[1].method ? String(t[1].method).toUpperCase() : "GET"
    }
    function ln(t) {
        return void 0 === t && (t = []),
        "string" == typeof t[0] ? t[0] : "Request"in en && Xt(t[0], Request) ? t[0].url : String(t[0])
    }
    var fn, dn;
    function hn(t, n) {
        return void 0 === n && (n = !1),
        function(e) {
            if (e && dn !== e && !function(t) {
                if ("keypress" !== t.type)
                    return !1;
                try {
                    var n = t.target;
                    if (!n || !n.tagName)
                        return !0;
                    if ("INPUT" === n.tagName || "TEXTAREA" === n.tagName || n.isContentEditable)
                        return !1
                } catch (t) {}
                return !0
            }(e)) {
                var i = "keypress" === e.type ? "input" : e.type;
                (void 0 === fn || function(t, n) {
                    if (!t)
                        return !0;
                    if (t.type !== n.type)
                        return !0;
                    try {
                        if (t.target !== n.target)
                            return !0
                    } catch (t) {}
                    return !1
                }(dn, e)) && (t({
                    event: e,
                    name: i,
                    global: n
                }),
                dn = e),
                clearTimeout(fn),
                fn = en.setTimeout((function() {
                    fn = void 0
                }
                ), 1e3)
            }
        }
    }
    var vn = null;
    var pn = null;
    function mn() {
        var t = vt()
          , n = t.crypto || t.msCrypto;
        if (void 0 !== n && n.getRandomValues) {
            var e = new Uint16Array(8);
            n.getRandomValues(e),
            e[3] = 4095 & e[3] | 16384,
            e[4] = 16383 & e[4] | 32768;
            var i = function(t) {
                for (var n = t.toString(16); n.length < 4; )
                    n = "0" + n;
                return n
            };
            return i(e[0]) + i(e[1]) + i(e[2]) + i(e[3]) + i(e[4]) + i(e[5]) + i(e[6]) + i(e[7])
        }
        return "xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(/[xy]/g, (function(t) {
            var n = 16 * Math.random() | 0;
            return ("x" === t ? n : 3 & n | 8).toString(16)
        }
        ))
    }
    function yn(t) {
        if (!t)
            return {};
        var n = t.match(/^(([^:/?#]+):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?$/);
        if (!n)
            return {};
        var e = n[6] || ""
          , i = n[8] || "";
        return {
            host: n[4],
            path: n[5],
            protocol: n[2],
            relative: n[5] + e + i
        }
    }
    function gn(t) {
        if (t.message)
            return t.message;
        if (t.exception && t.exception.values && t.exception.values[0]) {
            var n = t.exception.values[0];
            return n.type && n.value ? n.type + ": " + n.value : n.type || n.value || t.event_id || "<unknown>"
        }
        return t.event_id || "<unknown>"
    }
    function bn(t, n, e) {
        t.exception = t.exception || {},
        t.exception.values = t.exception.values || [],
        t.exception.values[0] = t.exception.values[0] || {},
        t.exception.values[0].value = t.exception.values[0].value || n || "",
        t.exception.values[0].type = t.exception.values[0].type || e || "Error"
    }
    function wn(t, n) {
        var e;
        if (t.exception && t.exception.values) {
            var i = t.exception.values[0]
              , r = i.mechanism;
            if (i.mechanism = ot(ot(ot({}, {
                type: "generic",
                handled: !0
            }), r), n),
            n && "data"in n) {
                var o = ot(ot({}, null === (e = r) || void 0 === e ? void 0 : e.data), n.data);
                i.mechanism.data = o
            }
        }
    }
    var xn;
    function kn(t) {
        var n;
        if (null === (n = t) || void 0 === n ? void 0 : n.O)
            return !0;
        try {
            Object.defineProperty(t, "O", {
                value: !0
            })
        } catch (t) {}
        return !1
    }
    !function(t) {
        t.PENDING = "PENDING",
        t.RESOLVED = "RESOLVED",
        t.REJECTED = "REJECTED"
    }(xn || (xn = {}));
    var En = function() {
        function t(t) {
            var n = this;
            this._state = xn.PENDING,
            this._handlers = [],
            this._resolve = function(t) {
                n._setResult(xn.RESOLVED, t)
            }
            ,
            this._reject = function(t) {
                n._setResult(xn.REJECTED, t)
            }
            ,
            this._setResult = function(t, e) {
                n._state === xn.PENDING && (Et(e) ? e.then(n._resolve, n._reject) : (n._state = t,
                n._value = e,
                n._executeHandlers()))
            }
            ,
            this._attachHandler = function(t) {
                n._handlers = n._handlers.concat(t),
                n._executeHandlers()
            }
            ,
            this._executeHandlers = function() {
                if (n._state !== xn.PENDING) {
                    var t = n._handlers.slice();
                    n._handlers = [],
                    t.forEach((function(t) {
                        t.done || (n._state === xn.RESOLVED && t.onfulfilled && t.onfulfilled(n._value),
                        n._state === xn.REJECTED && t.onrejected && t.onrejected(n._value),
                        t.done = !0)
                    }
                    ))
                }
            }
            ;
            try {
                t(this._resolve, this._reject)
            } catch (t) {
                this._reject(t)
            }
        }
        return t.resolve = function(n) {
            return new t((function(t) {
                t(n)
            }
            ))
        }
        ,
        t.reject = function(n) {
            return new t((function(t, e) {
                e(n)
            }
            ))
        }
        ,
        t.all = function(n) {
            return new t((function(e, i) {
                if (Array.isArray(n))
                    if (0 !== n.length) {
                        var r = n.length
                          , o = [];
                        n.forEach((function(n, s) {
                            t.resolve(n).then((function(t) {
                                o[s] = t,
                                0 === (r -= 1) && e(o)
                            }
                            )).then(null, i)
                        }
                        ))
                    } else
                        e([]);
                else
                    i(new TypeError("Promise.all requires an array as input."))
            }
            ))
        }
        ,
        t.prototype.then = function(n, e) {
            var i = this;
            return new t((function(t, r) {
                i._attachHandler({
                    done: !1,
                    onfulfilled: function(e) {
                        if (n)
                            try {
                                return void t(n(e))
                            } catch (t) {
                                return void r(t)
                            }
                        else
                            t(e)
                    },
                    onrejected: function(n) {
                        if (e)
                            try {
                                return void t(e(n))
                            } catch (t) {
                                return void r(t)
                            }
                        else
                            r(n)
                    }
                })
            }
            ))
        }
        ,
        t.prototype.catch = function(t) {
            return this.then((function(t) {
                return t
            }
            ), t)
        }
        ,
        t.prototype.finally = function(n) {
            var e = this;
            return new t((function(t, i) {
                var r, o;
                return e.then((function(t) {
                    o = !1,
                    r = t,
                    n && n()
                }
                ), (function(t) {
                    o = !0,
                    r = t,
                    n && n()
                }
                )).then((function() {
                    o ? i(r) : t(r)
                }
                ))
            }
            ))
        }
        ,
        t.prototype.toString = function() {
            return "[object SyncPromise]"
        }
        ,
        t
    }()
      , Xn = function() {
        function t(t) {
            this._limit = t,
            this._buffer = []
        }
        return t.prototype.isReady = function() {
            return void 0 === this._limit || this.length() < this._limit
        }
        ,
        t.prototype.add = function(t) {
            var n = this;
            if (!this.isReady())
                return En.reject(new jt("Not adding Promise due to buffer limit reached."));
            var e = t();
            return -1 === this._buffer.indexOf(e) && this._buffer.push(e),
            e.then((function() {
                return n.remove(e)
            }
            )).then(null, (function() {
                return n.remove(e).then(null, (function() {}
                ))
            }
            )),
            e
        }
        ,
        t.prototype.remove = function(t) {
            return this._buffer.splice(this._buffer.indexOf(t), 1)[0]
        }
        ,
        t.prototype.length = function() {
            return this._buffer.length
        }
        ,
        t.prototype.drain = function(t) {
            var n = this;
            return new En((function(e) {
                var i = setTimeout((function() {
                    t && t > 0 && e(!1)
                }
                ), t);
                En.all(n._buffer).then((function() {
                    clearTimeout(i),
                    e(!0)
                }
                )).then(null, (function() {
                    e(!0)
                }
                ))
            }
            ))
        }
        ,
        t
    }()
      , Sn = {
        nowSeconds: function() {
            return Date.now() / 1e3
        }
    };
    var Tn = lt() ? function() {
        try {
            return ft(module, "perf_hooks").performance
        } catch (t) {
            return
        }
    }() : function() {
        var t = vt().performance;
        if (t && t.now)
            return {
                now: function() {
                    return t.now()
                },
                timeOrigin: Date.now() - t.now()
            }
    }()
      , Cn = void 0 === Tn ? Sn : {
        nowSeconds: function() {
            return (Tn.timeOrigin + Tn.now()) / 1e3
        }
    }
      , jn = Sn.nowSeconds.bind(Sn)
      , On = Cn.nowSeconds.bind(Cn)
      , An = On
      , Dn = function() {
        var t = vt().performance;
        if (t && t.now) {
            var n = 36e5
              , e = t.now()
              , i = Date.now()
              , r = t.timeOrigin ? Math.abs(t.timeOrigin + e - i) : n
              , o = r < n
              , s = t.timing && t.timing.navigationStart
              , u = "number" == typeof s ? Math.abs(s + e - i) : n;
            return o || u < n ? r <= u ? t.timeOrigin : s : i
        }
    }()
      , Mn = function() {
        function t() {
            this._notifyingListeners = !1,
            this._scopeListeners = [],
            this._eventProcessors = [],
            this._breadcrumbs = [],
            this._user = {},
            this._tags = {},
            this._extra = {},
            this._contexts = {}
        }
        return t.clone = function(n) {
            var e = new t;
            return n && (e._breadcrumbs = ct(n._breadcrumbs),
            e._tags = ot({}, n._tags),
            e._extra = ot({}, n._extra),
            e._contexts = ot({}, n._contexts),
            e._user = n._user,
            e._level = n._level,
            e._span = n._span,
            e._session = n._session,
            e._transactionName = n._transactionName,
            e._fingerprint = n._fingerprint,
            e._eventProcessors = ct(n._eventProcessors),
            e._requestSession = n._requestSession),
            e
        }
        ,
        t.prototype.addScopeListener = function(t) {
            this._scopeListeners.push(t)
        }
        ,
        t.prototype.addEventProcessor = function(t) {
            return this._eventProcessors.push(t),
            this
        }
        ,
        t.prototype.setUser = function(t) {
            return this._user = t || {},
            this._session && this._session.update({
                user: t
            }),
            this._notifyScopeListeners(),
            this
        }
        ,
        t.prototype.getUser = function() {
            return this._user
        }
        ,
        t.prototype.getRequestSession = function() {
            return this._requestSession
        }
        ,
        t.prototype.setRequestSession = function(t) {
            return this._requestSession = t,
            this
        }
        ,
        t.prototype.setTags = function(t) {
            return this._tags = ot(ot({}, this._tags), t),
            this._notifyScopeListeners(),
            this
        }
        ,
        t.prototype.setTag = function(t, n) {
            var e;
            return this._tags = ot(ot({}, this._tags), ((e = {})[t] = n,
            e)),
            this._notifyScopeListeners(),
            this
        }
        ,
        t.prototype.setExtras = function(t) {
            return this._extra = ot(ot({}, this._extra), t),
            this._notifyScopeListeners(),
            this
        }
        ,
        t.prototype.setExtra = function(t, n) {
            var e;
            return this._extra = ot(ot({}, this._extra), ((e = {})[t] = n,
            e)),
            this._notifyScopeListeners(),
            this
        }
        ,
        t.prototype.setFingerprint = function(t) {
            return this._fingerprint = t,
            this._notifyScopeListeners(),
            this
        }
        ,
        t.prototype.setLevel = function(t) {
            return this._level = t,
            this._notifyScopeListeners(),
            this
        }
        ,
        t.prototype.setTransactionName = function(t) {
            return this._transactionName = t,
            this._notifyScopeListeners(),
            this
        }
        ,
        t.prototype.setTransaction = function(t) {
            return this.setTransactionName(t)
        }
        ,
        t.prototype.setContext = function(t, n) {
            var e;
            return null === n ? delete this._contexts[t] : this._contexts = ot(ot({}, this._contexts), ((e = {})[t] = n,
            e)),
            this._notifyScopeListeners(),
            this
        }
        ,
        t.prototype.setSpan = function(t) {
            return this._span = t,
            this._notifyScopeListeners(),
            this
        }
        ,
        t.prototype.getSpan = function() {
            return this._span
        }
        ,
        t.prototype.getTransaction = function() {
            var t, n, e, i, r = this.getSpan();
            return (null === (t = r) || void 0 === t ? void 0 : t.transaction) ? null === (n = r) || void 0 === n ? void 0 : n.transaction : (null === (i = null === (e = r) || void 0 === e ? void 0 : e.spanRecorder) || void 0 === i ? void 0 : i.spans[0]) ? r.spanRecorder.spans[0] : void 0
        }
        ,
        t.prototype.setSession = function(t) {
            return t ? this._session = t : delete this._session,
            this._notifyScopeListeners(),
            this
        }
        ,
        t.prototype.getSession = function() {
            return this._session
        }
        ,
        t.prototype.update = function(n) {
            if (!n)
                return this;
            if ("function" == typeof n) {
                var e = n(this);
                return e instanceof t ? e : this
            }
            return n instanceof t ? (this._tags = ot(ot({}, this._tags), n._tags),
            this._extra = ot(ot({}, this._extra), n._extra),
            this._contexts = ot(ot({}, this._contexts), n._contexts),
            n._user && Object.keys(n._user).length && (this._user = n._user),
            n._level && (this._level = n._level),
            n._fingerprint && (this._fingerprint = n._fingerprint),
            n._requestSession && (this._requestSession = n._requestSession)) : wt(n) && (n = n,
            this._tags = ot(ot({}, this._tags), n.tags),
            this._extra = ot(ot({}, this._extra), n.extra),
            this._contexts = ot(ot({}, this._contexts), n.contexts),
            n.user && (this._user = n.user),
            n.level && (this._level = n.level),
            n.fingerprint && (this._fingerprint = n.fingerprint),
            n.requestSession && (this._requestSession = n.requestSession)),
            this
        }
        ,
        t.prototype.clear = function() {
            return this._breadcrumbs = [],
            this._tags = {},
            this._extra = {},
            this._user = {},
            this._contexts = {},
            this._level = void 0,
            this._transactionName = void 0,
            this._fingerprint = void 0,
            this._requestSession = void 0,
            this._span = void 0,
            this._session = void 0,
            this._notifyScopeListeners(),
            this
        }
        ,
        t.prototype.addBreadcrumb = function(t, n) {
            var e = "number" == typeof n ? Math.min(n, 100) : 100;
            if (e <= 0)
                return this;
            var i = ot({
                timestamp: jn()
            }, t);
            return this._breadcrumbs = ct(this._breadcrumbs, [i]).slice(-e),
            this._notifyScopeListeners(),
            this
        }
        ,
        t.prototype.clearBreadcrumbs = function() {
            return this._breadcrumbs = [],
            this._notifyScopeListeners(),
            this
        }
        ,
        t.prototype.applyToEvent = function(t, n) {
            var e;
            if (this._extra && Object.keys(this._extra).length && (t.extra = ot(ot({}, this._extra), t.extra)),
            this._tags && Object.keys(this._tags).length && (t.tags = ot(ot({}, this._tags), t.tags)),
            this._user && Object.keys(this._user).length && (t.user = ot(ot({}, this._user), t.user)),
            this._contexts && Object.keys(this._contexts).length && (t.contexts = ot(ot({}, this._contexts), t.contexts)),
            this._level && (t.level = this._level),
            this._transactionName && (t.transaction = this._transactionName),
            this._span) {
                t.contexts = ot({
                    trace: this._span.getTraceContext()
                }, t.contexts);
                var i = null === (e = this._span.transaction) || void 0 === e ? void 0 : e.name;
                i && (t.tags = ot({
                    transaction: i
                }, t.tags))
            }
            return this._applyFingerprint(t),
            t.breadcrumbs = ct(t.breadcrumbs || [], this._breadcrumbs),
            t.breadcrumbs = t.breadcrumbs.length > 0 ? t.breadcrumbs : void 0,
            this._notifyEventProcessors(ct(_n(), this._eventProcessors), t, n)
        }
        ,
        t.prototype._notifyEventProcessors = function(t, n, e, i) {
            var r = this;
            return void 0 === i && (i = 0),
            new En((function(o, s) {
                var u = t[i];
                if (null === n || "function" != typeof u)
                    o(n);
                else {
                    var a = u(ot({}, n), e);
                    Et(a) ? a.then((function(n) {
                        return r._notifyEventProcessors(t, n, e, i + 1).then(o)
                    }
                    )).then(null, s) : r._notifyEventProcessors(t, a, e, i + 1).then(o).then(null, s)
                }
            }
            ))
        }
        ,
        t.prototype._notifyScopeListeners = function() {
            var t = this;
            this._notifyingListeners || (this._notifyingListeners = !0,
            this._scopeListeners.forEach((function(n) {
                n(t)
            }
            )),
            this._notifyingListeners = !1)
        }
        ,
        t.prototype._applyFingerprint = function(t) {
            t.fingerprint = t.fingerprint ? Array.isArray(t.fingerprint) ? t.fingerprint : [t.fingerprint] : [],
            this._fingerprint && (t.fingerprint = t.fingerprint.concat(this._fingerprint)),
            t.fingerprint && !t.fingerprint.length && delete t.fingerprint
        }
        ,
        t
    }();
    function _n() {
        var t = vt();
        return t.g = t.g || {},
        t.g.globalEventProcessors = t.g.globalEventProcessors || [],
        t.g.globalEventProcessors
    }
    function $n(t) {
        _n().push(t)
    }
    var Bn = function() {
        function t(t) {
            this.errors = 0,
            this.sid = mn(),
            this.duration = 0,
            this.status = Q.Ok,
            this.init = !0,
            this.ignoreDuration = !1;
            var n = On();
            this.timestamp = n,
            this.started = n,
            t && this.update(t)
        }
        return t.prototype.update = function(t) {
            if (void 0 === t && (t = {}),
            t.user && (!this.ipAddress && t.user.ip_address && (this.ipAddress = t.user.ip_address),
            this.did || t.did || (this.did = t.user.id || t.user.email || t.user.username)),
            this.timestamp = t.timestamp || On(),
            t.ignoreDuration && (this.ignoreDuration = t.ignoreDuration),
            t.sid && (this.sid = 32 === t.sid.length ? t.sid : mn()),
            void 0 !== t.init && (this.init = t.init),
            !this.did && t.did && (this.did = "" + t.did),
            "number" == typeof t.started && (this.started = t.started),
            this.ignoreDuration)
                this.duration = void 0;
            else if ("number" == typeof t.duration)
                this.duration = t.duration;
            else {
                var n = this.timestamp - this.started;
                this.duration = n >= 0 ? n : 0
            }
            t.release && (this.release = t.release),
            t.environment && (this.environment = t.environment),
            !this.ipAddress && t.ipAddress && (this.ipAddress = t.ipAddress),
            !this.userAgent && t.userAgent && (this.userAgent = t.userAgent),
            "number" == typeof t.errors && (this.errors = t.errors),
            t.status && (this.status = t.status)
        }
        ,
        t.prototype.close = function(t) {
            t ? this.update({
                status: t
            }) : this.status === Q.Ok ? this.update({
                status: Q.Exited
            }) : this.update()
        }
        ,
        t.prototype.toJSON = function() {
            return Yt({
                sid: "" + this.sid,
                init: this.init,
                started: new Date(1e3 * this.started).toISOString(),
                timestamp: new Date(1e3 * this.timestamp).toISOString(),
                status: this.status,
                errors: this.errors,
                did: "number" == typeof this.did || "string" == typeof this.did ? "" + this.did : void 0,
                duration: this.duration,
                attrs: Yt({
                    release: this.release,
                    environment: this.environment,
                    ip_address: this.ipAddress,
                    user_agent: this.userAgent
                })
            })
        }
        ,
        t
    }()
      , Fn = function() {
        function t(t, n, e) {
            void 0 === n && (n = new Mn),
            void 0 === e && (e = 4),
            this._version = e,
            this._stack = [{}],
            this.getStackTop().scope = n,
            t && this.bindClient(t)
        }
        return t.prototype.isOlderThan = function(t) {
            return this._version < t
        }
        ,
        t.prototype.bindClient = function(t) {
            this.getStackTop().client = t,
            t && t.setupIntegrations && t.setupIntegrations()
        }
        ,
        t.prototype.pushScope = function() {
            var t = Mn.clone(this.getScope());
            return this.getStack().push({
                client: this.getClient(),
                scope: t
            }),
            t
        }
        ,
        t.prototype.popScope = function() {
            return !(this.getStack().length <= 1) && !!this.getStack().pop()
        }
        ,
        t.prototype.withScope = function(t) {
            var n = this.pushScope();
            try {
                t(n)
            } finally {
                this.popScope()
            }
        }
        ,
        t.prototype.getClient = function() {
            return this.getStackTop().client
        }
        ,
        t.prototype.getScope = function() {
            return this.getStackTop().scope
        }
        ,
        t.prototype.getStack = function() {
            return this._stack
        }
        ,
        t.prototype.getStackTop = function() {
            return this._stack[this._stack.length - 1]
        }
        ,
        t.prototype.captureException = function(t, n) {
            var e = this._lastEventId = mn()
              , i = n;
            if (!n) {
                var r = void 0;
                try {
                    throw new Error("Sentry syntheticException")
                } catch (t) {
                    r = t
                }
                i = {
                    originalException: t,
                    syntheticException: r
                }
            }
            return this._invokeClient("captureException", t, ot(ot({}, i), {
                event_id: e
            })),
            e
        }
        ,
        t.prototype.captureMessage = function(t, n, e) {
            var i = this._lastEventId = mn()
              , r = e;
            if (!e) {
                var o = void 0;
                try {
                    throw new Error(t)
                } catch (t) {
                    o = t
                }
                r = {
                    originalException: t,
                    syntheticException: o
                }
            }
            return this._invokeClient("captureMessage", t, n, ot(ot({}, r), {
                event_id: i
            })),
            i
        }
        ,
        t.prototype.captureEvent = function(t, n) {
            var e = mn();
            return "transaction" !== t.type && (this._lastEventId = e),
            this._invokeClient("captureEvent", t, ot(ot({}, n), {
                event_id: e
            })),
            e
        }
        ,
        t.prototype.lastEventId = function() {
            return this._lastEventId
        }
        ,
        t.prototype.addBreadcrumb = function(t, n) {
            var e = this.getStackTop()
              , i = e.scope
              , r = e.client;
            if (i && r) {
                var o = r.getOptions && r.getOptions() || {}
                  , s = o.beforeBreadcrumb
                  , u = void 0 === s ? null : s
                  , a = o.maxBreadcrumbs
                  , c = void 0 === a ? 100 : a;
                if (!(c <= 0)) {
                    var l = jn()
                      , f = ot({
                        timestamp: l
                    }, t)
                      , d = u ? $t((function() {
                        return u(f, n)
                    }
                    )) : f;
                    null !== d && i.addBreadcrumb(d, c)
                }
            }
        }
        ,
        t.prototype.setUser = function(t) {
            var n = this.getScope();
            n && n.setUser(t)
        }
        ,
        t.prototype.setTags = function(t) {
            var n = this.getScope();
            n && n.setTags(t)
        }
        ,
        t.prototype.setExtras = function(t) {
            var n = this.getScope();
            n && n.setExtras(t)
        }
        ,
        t.prototype.setTag = function(t, n) {
            var e = this.getScope();
            e && e.setTag(t, n)
        }
        ,
        t.prototype.setExtra = function(t, n) {
            var e = this.getScope();
            e && e.setExtra(t, n)
        }
        ,
        t.prototype.setContext = function(t, n) {
            var e = this.getScope();
            e && e.setContext(t, n)
        }
        ,
        t.prototype.configureScope = function(t) {
            var n = this.getStackTop()
              , e = n.scope
              , i = n.client;
            e && i && t(e)
        }
        ,
        t.prototype.run = function(t) {
            var n = Rn(this);
            try {
                t(this)
            } finally {
                Rn(n)
            }
        }
        ,
        t.prototype.getIntegration = function(t) {
            var n = this.getClient();
            if (!n)
                return null;
            try {
                return n.getIntegration(t)
            } catch (n) {
                return Ft.warn("Cannot retrieve integration " + t.id + " from the current Hub"),
                null
            }
        }
        ,
        t.prototype.startSpan = function(t) {
            return this._callExtensionMethod("startSpan", t)
        }
        ,
        t.prototype.startTransaction = function(t, n) {
            return this._callExtensionMethod("startTransaction", t, n)
        }
        ,
        t.prototype.traceHeaders = function() {
            return this._callExtensionMethod("traceHeaders")
        }
        ,
        t.prototype.captureSession = function(t) {
            if (void 0 === t && (t = !1),
            t)
                return this.endSession();
            this._sendSessionUpdate()
        }
        ,
        t.prototype.endSession = function() {
            var t, n, e, i, r;
            null === (e = null === (n = null === (t = this.getStackTop()) || void 0 === t ? void 0 : t.scope) || void 0 === n ? void 0 : n.getSession()) || void 0 === e || e.close(),
            this._sendSessionUpdate(),
            null === (r = null === (i = this.getStackTop()) || void 0 === i ? void 0 : i.scope) || void 0 === r || r.setSession()
        }
        ,
        t.prototype.startSession = function(t) {
            var n = this.getStackTop()
              , e = n.scope
              , i = n.client
              , r = i && i.getOptions() || {}
              , o = r.release
              , s = r.environment
              , u = (vt().navigator || {}).userAgent
              , a = new Bn(ot(ot(ot({
                release: o,
                environment: s
            }, e && {
                user: e.getUser()
            }), u && {
                userAgent: u
            }), t));
            if (e) {
                var c = e.getSession && e.getSession();
                c && c.status === Q.Ok && c.update({
                    status: Q.Exited
                }),
                this.endSession(),
                e.setSession(a)
            }
            return a
        }
        ,
        t.prototype._sendSessionUpdate = function() {
            var t = this.getStackTop()
              , n = t.scope
              , e = t.client;
            if (n) {
                var i = n.getSession && n.getSession();
                i && e && e.captureSession && e.captureSession(i)
            }
        }
        ,
        t.prototype._invokeClient = function(t) {
            for (var n, e = [], i = 1; i < arguments.length; i++)
                e[i - 1] = arguments[i];
            var r = this.getStackTop()
              , o = r.scope
              , s = r.client;
            s && s[t] && (n = s)[t].apply(n, ct(e, [o]))
        }
        ,
        t.prototype._callExtensionMethod = function(t) {
            for (var n = [], e = 1; e < arguments.length; e++)
                n[e - 1] = arguments[e];
            var i = In()
              , r = i.g;
            if (r && r.extensions && "function" == typeof r.extensions[t])
                return r.extensions[t].apply(this, n);
            Ft.warn("Extension method " + t + " couldn't be found, doing nothing.")
        }
        ,
        t
    }();
    function In() {
        var t = vt();
        return t.g = t.g || {
            extensions: {},
            hub: void 0
        },
        t
    }
    function Rn(t) {
        var n = In()
          , e = zn(n);
        return Pn(n, t),
        e
    }
    function Nn() {
        var t = In();
        return Gn(t) && !zn(t).isOlderThan(4) || Pn(t, new Fn),
        lt() ? function(t) {
            var n, e, i;
            try {
                var r = null === (i = null === (e = null === (n = In().g) || void 0 === n ? void 0 : n.extensions) || void 0 === e ? void 0 : e.domain) || void 0 === i ? void 0 : i.active;
                if (!r)
                    return zn(t);
                if (!Gn(r) || zn(r).isOlderThan(4)) {
                    var o = zn(t).getStackTop();
                    Pn(r, new Fn(o.client,Mn.clone(o.scope)))
                }
                return zn(r)
            } catch (n) {
                return zn(t)
            }
        }(t) : zn(t)
    }
    function Gn(t) {
        return !!(t && t.g && t.g.hub)
    }
    function zn(t) {
        return t && t.g && t.g.hub || (t.g = t.g || {},
        t.g.hub = new Fn),
        t.g.hub
    }
    function Pn(t, n) {
        return !!t && (t.g = t.g || {},
        t.g.hub = n,
        !0)
    }
    function qn(t) {
        for (var n = [], e = 1; e < arguments.length; e++)
            n[e - 1] = arguments[e];
        var i = Nn();
        if (i && i[t])
            return i[t].apply(i, ct(n));
        throw new Error("No hub defined or " + t + " was not found on the hub, please open a bug report.")
    }
    function Ln(t, n) {
        var e;
        try {
            throw new Error("Sentry syntheticException")
        } catch (t) {
            e = t
        }
        return qn("captureException", t, {
            captureContext: n,
            originalException: t,
            syntheticException: e
        })
    }
    function Hn(t) {
        qn("withScope", t)
    }
    var Un = function() {
        function t(t, n, e) {
            void 0 === n && (n = {}),
            this.dsn = t,
            this._dsnObject = new Dt(t),
            this.metadata = n,
            this._tunnel = e
        }
        return t.prototype.getDsn = function() {
            return this._dsnObject
        }
        ,
        t.prototype.forceEnvelope = function() {
            return !!this._tunnel
        }
        ,
        t.prototype.getBaseApiEndpoint = function() {
            var t = this.getDsn()
              , n = t.protocol ? t.protocol + ":" : ""
              , e = t.port ? ":" + t.port : "";
            return n + "//" + t.host + e + (t.path ? "/" + t.path : "") + "/api/"
        }
        ,
        t.prototype.getStoreEndpoint = function() {
            return this._getIngestEndpoint("store")
        }
        ,
        t.prototype.getStoreEndpointWithUrlEncodedAuth = function() {
            return this.getStoreEndpoint() + "?" + this._encodedAuth()
        }
        ,
        t.prototype.getEnvelopeEndpointWithUrlEncodedAuth = function() {
            return this.forceEnvelope() ? this._tunnel : this._getEnvelopeEndpoint() + "?" + this._encodedAuth()
        }
        ,
        t.prototype.getStoreEndpointPath = function() {
            var t = this.getDsn();
            return (t.path ? "/" + t.path : "") + "/api/" + t.projectId + "/store/"
        }
        ,
        t.prototype.getRequestHeaders = function(t, n) {
            var e = this.getDsn()
              , i = ["Sentry sentry_version=7"];
            return i.push("sentry_client=" + t + "/" + n),
            i.push("sentry_key=" + e.publicKey),
            e.pass && i.push("sentry_secret=" + e.pass),
            {
                "Content-Type": "application/json",
                "X-Sentry-Auth": i.join(", ")
            }
        }
        ,
        t.prototype.getReportDialogEndpoint = function(t) {
            void 0 === t && (t = {});
            var n = this.getDsn()
              , e = this.getBaseApiEndpoint() + "embed/error-page/"
              , i = [];
            for (var r in i.push("dsn=" + n.toString()),
            t)
                if ("dsn" !== r)
                    if ("user" === r) {
                        if (!t.user)
                            continue;
                        t.user.name && i.push("name=" + encodeURIComponent(t.user.name)),
                        t.user.email && i.push("email=" + encodeURIComponent(t.user.email))
                    } else
                        i.push(encodeURIComponent(r) + "=" + encodeURIComponent(t[r]));
            return i.length ? e + "?" + i.join("&") : e
        }
        ,
        t.prototype._getEnvelopeEndpoint = function() {
            return this._getIngestEndpoint("envelope")
        }
        ,
        t.prototype._getIngestEndpoint = function(t) {
            return this._tunnel ? this._tunnel : "" + this.getBaseApiEndpoint() + this.getDsn().projectId + "/" + t + "/"
        }
        ,
        t.prototype._encodedAuth = function() {
            var t, n = {
                sentry_key: this.getDsn().publicKey,
                sentry_version: "7"
            };
            return t = n,
            Object.keys(t).map((function(n) {
                return encodeURIComponent(n) + "=" + encodeURIComponent(t[n])
            }
            )).join("&")
        }
        ,
        t
    }()
      , Jn = [];
    function Wn(t) {
        return t.reduce((function(t, n) {
            return t.every((function(t) {
                return n.name !== t.name
            }
            )) && t.push(n),
            t
        }
        ), [])
    }
    function Vn(t) {
        var n = {};
        return function(t) {
            var n = t.defaultIntegrations && ct(t.defaultIntegrations) || []
              , e = t.integrations
              , i = ct(Wn(n));
            Array.isArray(e) ? i = ct(i.filter((function(t) {
                return e.every((function(n) {
                    return n.name !== t.name
                }
                ))
            }
            )), Wn(e)) : "function" == typeof e && (i = e(i),
            i = Array.isArray(i) ? i : [i]);
            var r = i.map((function(t) {
                return t.name
            }
            ))
              , o = "Debug";
            return -1 !== r.indexOf(o) && i.push.apply(i, ct(i.splice(r.indexOf(o), 1))),
            i
        }(t).forEach((function(t) {
            n[t.name] = t,
            function(t) {
                -1 === Jn.indexOf(t.name) && (t.setupOnce($n, Nn),
                Jn.push(t.name),
                Ft.log("Integration installed: " + t.name))
            }(t)
        }
        )),
        Object.defineProperty(n, "initialized", {
            value: !0
        }),
        n
    }
    var Kn = "Not capturing exception because it's already been captured."
      , Yn = function() {
        function t(t, n) {
            this._integrations = {},
            this._numProcessing = 0,
            this._backend = new t(n),
            this._options = n,
            n.dsn && (this._dsn = new Dt(n.dsn))
        }
        return t.prototype.captureException = function(t, n, e) {
            var i = this;
            if (!kn(t)) {
                var r = n && n.event_id;
                return this._process(this._getBackend().eventFromException(t, n).then((function(t) {
                    return i._captureEvent(t, n, e)
                }
                )).then((function(t) {
                    r = t
                }
                ))),
                r
            }
            Ft.log(Kn)
        }
        ,
        t.prototype.captureMessage = function(t, n, e, i) {
            var r = this
              , o = e && e.event_id
              , s = bt(t) ? this._getBackend().eventFromMessage(String(t), n, e) : this._getBackend().eventFromException(t, e);
            return this._process(s.then((function(t) {
                return r._captureEvent(t, e, i)
            }
            )).then((function(t) {
                o = t
            }
            ))),
            o
        }
        ,
        t.prototype.captureEvent = function(t, n, e) {
            var i;
            if (!(null === (i = n) || void 0 === i ? void 0 : i.originalException) || !kn(n.originalException)) {
                var r = n && n.event_id;
                return this._process(this._captureEvent(t, n, e).then((function(t) {
                    r = t
                }
                ))),
                r
            }
            Ft.log(Kn)
        }
        ,
        t.prototype.captureSession = function(t) {
            this._isEnabled() ? "string" != typeof t.release ? Ft.warn("Discarded session because of missing or non-string release") : (this._sendSession(t),
            t.update({
                init: !1
            })) : Ft.warn("SDK not enabled, will not capture session.")
        }
        ,
        t.prototype.getDsn = function() {
            return this._dsn
        }
        ,
        t.prototype.getOptions = function() {
            return this._options
        }
        ,
        t.prototype.getTransport = function() {
            return this._getBackend().getTransport()
        }
        ,
        t.prototype.flush = function(t) {
            var n = this;
            return this._isClientDoneProcessing(t).then((function(e) {
                return n.getTransport().close(t).then((function(t) {
                    return e && t
                }
                ))
            }
            ))
        }
        ,
        t.prototype.close = function(t) {
            var n = this;
            return this.flush(t).then((function(t) {
                return n.getOptions().enabled = !1,
                t
            }
            ))
        }
        ,
        t.prototype.setupIntegrations = function() {
            this._isEnabled() && !this._integrations.initialized && (this._integrations = Vn(this._options))
        }
        ,
        t.prototype.getIntegration = function(t) {
            try {
                return this._integrations[t.id] || null
            } catch (n) {
                return Ft.warn("Cannot retrieve integration " + t.id + " from the current Client"),
                null
            }
        }
        ,
        t.prototype._updateSessionFromEvent = function(t, n) {
            var e, i, r = !1, o = !1, s = n.exception && n.exception.values;
            if (s) {
                o = !0;
                try {
                    for (var u = ut(s), a = u.next(); !a.done; a = u.next()) {
                        var c = a.value.mechanism;
                        if (c && !1 === c.handled) {
                            r = !0;
                            break
                        }
                    }
                } catch (t) {
                    e = {
                        error: t
                    }
                } finally {
                    try {
                        a && !a.done && (i = u.return) && i.call(u)
                    } finally {
                        if (e)
                            throw e.error
                    }
                }
            }
            var l = t.status === Q.Ok;
            (l && 0 === t.errors || l && r) && (t.update(ot(ot({}, r && {
                status: Q.Crashed
            }), {
                errors: t.errors || Number(o || r)
            })),
            this.captureSession(t))
        }
        ,
        t.prototype._sendSession = function(t) {
            this._getBackend().sendSession(t)
        }
        ,
        t.prototype._isClientDoneProcessing = function(t) {
            var n = this;
            return new En((function(e) {
                var i = 0
                  , r = setInterval((function() {
                    0 == n._numProcessing ? (clearInterval(r),
                    e(!0)) : (i += 1,
                    t && i >= t && (clearInterval(r),
                    e(!1)))
                }
                ), 1)
            }
            ))
        }
        ,
        t.prototype._getBackend = function() {
            return this._backend
        }
        ,
        t.prototype._isEnabled = function() {
            return !1 !== this.getOptions().enabled && void 0 !== this._dsn
        }
        ,
        t.prototype._prepareEvent = function(t, n, e) {
            var i = this
              , r = this.getOptions().normalizeDepth
              , o = void 0 === r ? 3 : r
              , s = ot(ot({}, t), {
                event_id: t.event_id || (e && e.event_id ? e.event_id : mn()),
                timestamp: t.timestamp || jn()
            });
            this._applyClientOptions(s),
            this._applyIntegrationsMetadata(s);
            var u = n;
            e && e.captureContext && (u = Mn.clone(u).update(e.captureContext));
            var a = En.resolve(s);
            return u && (a = u.applyToEvent(s, e)),
            a.then((function(t) {
                return "number" == typeof o && o > 0 ? i._normalizeEvent(t, o) : t
            }
            ))
        }
        ,
        t.prototype._normalizeEvent = function(t, n) {
            if (!t)
                return null;
            var e = ot(ot(ot(ot(ot({}, t), t.breadcrumbs && {
                breadcrumbs: t.breadcrumbs.map((function(t) {
                    return ot(ot({}, t), t.data && {
                        data: Vt(t.data, n)
                    })
                }
                ))
            }), t.user && {
                user: Vt(t.user, n)
            }), t.contexts && {
                contexts: Vt(t.contexts, n)
            }), t.extra && {
                extra: Vt(t.extra, n)
            });
            t.contexts && t.contexts.trace && (e.contexts.trace = t.contexts.trace);
            var i = this.getOptions()._experiments;
            return (void 0 === i ? {} : i).ensureNoCircularStructures ? Vt(e) : e
        }
        ,
        t.prototype._applyClientOptions = function(t) {
            var n = this.getOptions()
              , e = n.environment
              , i = n.release
              , r = n.dist
              , o = n.maxValueLength
              , s = void 0 === o ? 250 : o;
            "environment"in t || (t.environment = "environment"in n ? e : "production"),
            void 0 === t.release && void 0 !== i && (t.release = i),
            void 0 === t.dist && void 0 !== r && (t.dist = r),
            t.message && (t.message = Gt(t.message, s));
            var u = t.exception && t.exception.values && t.exception.values[0];
            u && u.value && (u.value = Gt(u.value, s));
            var a = t.request;
            a && a.url && (a.url = Gt(a.url, s))
        }
        ,
        t.prototype._applyIntegrationsMetadata = function(t) {
            var n = Object.keys(this._integrations);
            n.length > 0 && (t.sdk = t.sdk || {},
            t.sdk.integrations = ct(t.sdk.integrations || [], n))
        }
        ,
        t.prototype._sendEvent = function(t) {
            this._getBackend().sendEvent(t)
        }
        ,
        t.prototype._captureEvent = function(t, n, e) {
            return this._processEvent(t, n, e).then((function(t) {
                return t.event_id
            }
            ), (function(t) {
                Ft.error(t)
            }
            ))
        }
        ,
        t.prototype._processEvent = function(t, n, e) {
            var i, r, o = this, s = this.getOptions(), u = s.beforeSend, a = s.sampleRate, c = this.getTransport();
            if (!this._isEnabled())
                return En.reject(new jt("SDK not enabled, will not capture event."));
            var l = "transaction" === t.type;
            return !l && "number" == typeof a && Math.random() > a ? (null === (r = (i = c).recordLostEvent) || void 0 === r || r.call(i, rt.SampleRate, "event"),
            En.reject(new jt("Discarding event because it's not included in the random sample (sampling rate = " + a + ")"))) : this._prepareEvent(t, e, n).then((function(e) {
                var i, r;
                if (null === e)
                    throw null === (r = (i = c).recordLostEvent) || void 0 === r || r.call(i, rt.EventProcessor, t.type || "event"),
                    new jt("An event processor returned null, will not send event.");
                if (n && n.data && !0 === n.data._ || l || !u)
                    return e;
                var s = u(e, n);
                return o._ensureBeforeSendRv(s)
            }
            )).then((function(n) {
                var i, r;
                if (null === n)
                    throw null === (r = (i = c).recordLostEvent) || void 0 === r || r.call(i, rt.BeforeSend, t.type || "event"),
                    new jt("`beforeSend` returned `null`, will not send event.");
                var s = e && e.getSession && e.getSession();
                return !l && s && o._updateSessionFromEvent(s, n),
                o._sendEvent(n),
                n
            }
            )).then(null, (function(t) {
                if (t instanceof jt)
                    throw t;
                throw o.captureException(t, {
                    data: {
                        _: !0
                    },
                    originalException: t
                }),
                new jt("Event processing pipeline threw an error, original event will not be sent. Details have been sent as a new event.\nReason: " + t)
            }
            ))
        }
        ,
        t.prototype._process = function(t) {
            var n = this;
            this._numProcessing += 1,
            t.then((function(t) {
                return n._numProcessing -= 1,
                t
            }
            ), (function(t) {
                return n._numProcessing -= 1,
                t
            }
            ))
        }
        ,
        t.prototype._ensureBeforeSendRv = function(t) {
            var n = "`beforeSend` method has to return `null` or a valid event.";
            if (Et(t))
                return t.then((function(t) {
                    if (!wt(t) && null !== t)
                        throw new jt(n);
                    return t
                }
                ), (function(t) {
                    throw new jt("beforeSend rejected with " + t)
                }
                ));
            if (!wt(t) && null !== t)
                throw new jt(n);
            return t
        }
        ,
        t
    }()
      , Zn = function() {
        function t() {}
        return t.prototype.sendEvent = function(t) {
            return En.resolve({
                reason: "NoopTransport: Event has been skipped because no Dsn is configured.",
                status: et.Skipped
            })
        }
        ,
        t.prototype.close = function(t) {
            return En.resolve(!0)
        }
        ,
        t
    }()
      , Qn = function() {
        function t(t) {
            this._options = t,
            this._options.dsn || Ft.warn("No DSN provided, backend will not do anything."),
            this._transport = this._setupTransport()
        }
        return t.prototype.eventFromException = function(t, n) {
            throw new jt("Backend has to implement `eventFromException` method")
        }
        ,
        t.prototype.eventFromMessage = function(t, n, e) {
            throw new jt("Backend has to implement `eventFromMessage` method")
        }
        ,
        t.prototype.sendEvent = function(t) {
            this._transport.sendEvent(t).then(null, (function(t) {
                Ft.error("Error while sending event: " + t)
            }
            ))
        }
        ,
        t.prototype.sendSession = function(t) {
            this._transport.sendSession ? this._transport.sendSession(t).then(null, (function(t) {
                Ft.error("Error while sending session: " + t)
            }
            )) : Ft.warn("Dropping session because custom transport doesn't implement sendSession")
        }
        ,
        t.prototype.getTransport = function() {
            return this._transport
        }
        ,
        t.prototype._setupTransport = function() {
            return new Zn
        }
        ,
        t
    }();
    function te(t) {
        if (t.metadata && t.metadata.sdk) {
            var n = t.metadata.sdk;
            return {
                name: n.name,
                version: n.version
            }
        }
    }
    function ne(t, n) {
        return n ? (t.sdk = t.sdk || {},
        t.sdk.name = t.sdk.name || n.name,
        t.sdk.version = t.sdk.version || n.version,
        t.sdk.integrations = ct(t.sdk.integrations || [], n.integrations || []),
        t.sdk.packages = ct(t.sdk.packages || [], n.packages || []),
        t) : t
    }
    function ee(t, n) {
        var e = te(n)
          , i = "aggregates"in t ? "sessions" : "session";
        return {
            body: JSON.stringify(ot(ot({
                sent_at: (new Date).toISOString()
            }, e && {
                sdk: e
            }), n.forceEnvelope() && {
                dsn: n.getDsn().toString()
            })) + "\n" + JSON.stringify({
                type: i
            }) + "\n" + JSON.stringify(t),
            type: i,
            url: n.getEnvelopeEndpointWithUrlEncodedAuth()
        }
    }
    function ie(t, n) {
        var e = te(n)
          , i = t.type || "event"
          , r = "transaction" === i || n.forceEnvelope()
          , o = t.debug_meta || {}
          , s = o.transactionSampling
          , u = st(o, ["transactionSampling"])
          , a = s || {}
          , c = a.method
          , l = a.rate;
        0 === Object.keys(u).length ? delete t.debug_meta : t.debug_meta = u;
        var f = {
            body: JSON.stringify(e ? ne(t, n.metadata.sdk) : t),
            type: i,
            url: r ? n.getEnvelopeEndpointWithUrlEncodedAuth() : n.getStoreEndpointWithUrlEncodedAuth()
        };
        if (r) {
            var d = JSON.stringify(ot(ot({
                event_id: t.event_id,
                sent_at: (new Date).toISOString()
            }, e && {
                sdk: e
            }), n.forceEnvelope() && {
                dsn: n.getDsn().toString()
            })) + "\n" + JSON.stringify({
                type: i,
                sample_rates: [{
                    id: c,
                    rate: l
                }]
            }) + "\n" + f.body;
            f.body = d
        }
        return f
    }
    var re, oe = "6.14.1", se = function() {
        function t() {
            this.name = t.id
        }
        return t.prototype.setupOnce = function() {
            re = Function.prototype.toString,
            Function.prototype.toString = function() {
                for (var t = [], n = 0; n < arguments.length; n++)
                    t[n] = arguments[n];
                var e = this.u || this;
                return re.apply(e, t)
            }
        }
        ,
        t.id = "FunctionToString",
        t
    }(), ue = [/^Script error\.?$/, /^Javascript error: Script error\.? on line 0$/], ae = function() {
        function t(n) {
            void 0 === n && (n = {}),
            this._options = n,
            this.name = t.id
        }
        return t.prototype.setupOnce = function() {
            $n((function(n) {
                var e = Nn();
                if (!e)
                    return n;
                var i = e.getIntegration(t);
                if (i) {
                    var r = e.getClient()
                      , o = r ? r.getOptions() : {}
                      , s = "function" == typeof i._mergeOptions ? i._mergeOptions(o) : {};
                    return "function" != typeof i._shouldDropEvent ? n : i._shouldDropEvent(n, s) ? null : n
                }
                return n
            }
            ))
        }
        ,
        t.prototype._shouldDropEvent = function(t, n) {
            return this._isSentryError(t, n) ? (Ft.warn("Event dropped due to being internal Sentry Error.\nEvent: " + gn(t)),
            !0) : this._isIgnoredError(t, n) ? (Ft.warn("Event dropped due to being matched by `ignoreErrors` option.\nEvent: " + gn(t)),
            !0) : this._isDeniedUrl(t, n) ? (Ft.warn("Event dropped due to being matched by `denyUrls` option.\nEvent: " + gn(t) + ".\nUrl: " + this._getEventFilterUrl(t)),
            !0) : !this._isAllowedUrl(t, n) && (Ft.warn("Event dropped due to not being matched by `allowUrls` option.\nEvent: " + gn(t) + ".\nUrl: " + this._getEventFilterUrl(t)),
            !0)
        }
        ,
        t.prototype._isSentryError = function(t, n) {
            if (!n.ignoreInternal)
                return !1;
            try {
                return t && t.exception && t.exception.values && t.exception.values[0] && "SentryError" === t.exception.values[0].type || !1
            } catch (t) {
                return !1
            }
        }
        ,
        t.prototype._isIgnoredError = function(t, n) {
            return !(!n.ignoreErrors || !n.ignoreErrors.length) && this._getPossibleEventMessages(t).some((function(t) {
                return n.ignoreErrors.some((function(n) {
                    return Pt(t, n)
                }
                ))
            }
            ))
        }
        ,
        t.prototype._isDeniedUrl = function(t, n) {
            if (!n.denyUrls || !n.denyUrls.length)
                return !1;
            var e = this._getEventFilterUrl(t);
            return !!e && n.denyUrls.some((function(t) {
                return Pt(e, t)
            }
            ))
        }
        ,
        t.prototype._isAllowedUrl = function(t, n) {
            if (!n.allowUrls || !n.allowUrls.length)
                return !0;
            var e = this._getEventFilterUrl(t);
            return !e || n.allowUrls.some((function(t) {
                return Pt(e, t)
            }
            ))
        }
        ,
        t.prototype._mergeOptions = function(t) {
            return void 0 === t && (t = {}),
            {
                allowUrls: ct(this._options.whitelistUrls || [], this._options.allowUrls || [], t.whitelistUrls || [], t.allowUrls || []),
                denyUrls: ct(this._options.blacklistUrls || [], this._options.denyUrls || [], t.blacklistUrls || [], t.denyUrls || []),
                ignoreErrors: ct(this._options.ignoreErrors || [], t.ignoreErrors || [], ue),
                ignoreInternal: void 0 === this._options.ignoreInternal || this._options.ignoreInternal
            }
        }
        ,
        t.prototype._getPossibleEventMessages = function(t) {
            if (t.message)
                return [t.message];
            if (t.exception)
                try {
                    var n = t.exception.values && t.exception.values[0] || {}
                      , e = n.type
                      , i = void 0 === e ? "" : e
                      , r = n.value
                      , o = void 0 === r ? "" : r;
                    return ["" + o, i + ": " + o]
                } catch (n) {
                    return Ft.error("Cannot extract message for event " + gn(t)),
                    []
                }
            return []
        }
        ,
        t.prototype._getLastValidUrl = function(t) {
            var n, e;
            void 0 === t && (t = []);
            for (var i = t.length - 1; i >= 0; i--) {
                var r = t[i];
                if ("<anonymous>" !== (null === (n = r) || void 0 === n ? void 0 : n.filename) && "[native code]" !== (null === (e = r) || void 0 === e ? void 0 : e.filename))
                    return r.filename || null
            }
            return null
        }
        ,
        t.prototype._getEventFilterUrl = function(t) {
            try {
                if (t.stacktrace) {
                    var n = t.stacktrace.frames;
                    return this._getLastValidUrl(n)
                }
                if (t.exception) {
                    var e = t.exception.values && t.exception.values[0].stacktrace && t.exception.values[0].stacktrace.frames;
                    return this._getLastValidUrl(e)
                }
                return null
            } catch (n) {
                return Ft.error("Cannot extract url for event " + gn(t)),
                null
            }
        }
        ,
        t.id = "InboundFilters",
        t
    }(), ce = "?", le = /^\s*at (?:(.*?) ?\()?((?:file|https?|blob|chrome-extension|address|native|eval|webpack|<anonymous>|[-a-z]+:|.*bundle|\/).*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i, fe = /^\s*(.*?)(?:\((.*?)\))?(?:^|@)?((?:file|https?|blob|chrome|webpack|resource|moz-extension|capacitor).*?:\/.*?|\[native code\]|[^@]*(?:bundle|\d+\.js)|\/[\w\-. /=]+)(?::(\d+))?(?::(\d+))?\s*$/i, de = /^\s*at (?:((?:\[object object\])?.+) )?\(?((?:file|ms-appx|https?|webpack|blob):.*?):(\d+)(?::(\d+))?\)?\s*$/i, he = /(\S+) line (\d+)(?: > eval line \d+)* > eval/i, ve = /\((\S*)(?::(\d+))(?::(\d+))\)/, pe = /Minified React error #\d+;/i;
    function me(t) {
        var n = null
          , e = 0;
        t && ("number" == typeof t.framesToPop ? e = t.framesToPop : pe.test(t.message) && (e = 1));
        try {
            if (n = function(t) {
                if (!t || !t.stacktrace)
                    return null;
                for (var n, e = t.stacktrace, i = / line (\d+).*script (?:in )?(\S+)(?:: in function (\S+))?$/i, r = / line (\d+), column (\d+)\s*(?:in (?:<anonymous function: ([^>]+)>|([^)]+))\((.*)\))? in (.*):\s*$/i, o = e.split("\n"), s = [], u = 0; u < o.length; u += 2) {
                    var a = null;
                    (n = i.exec(o[u])) ? a = {
                        url: n[2],
                        func: n[3],
                        args: [],
                        line: +n[1],
                        column: null
                    } : (n = r.exec(o[u])) && (a = {
                        url: n[6],
                        func: n[3] || n[4],
                        args: n[5] ? n[5].split(",") : [],
                        line: +n[1],
                        column: +n[2]
                    }),
                    a && (!a.func && a.line && (a.func = ce),
                    s.push(a))
                }
                if (!s.length)
                    return null;
                return {
                    message: be(t),
                    name: t.name,
                    stack: s
                }
            }(t))
                return ge(n, e)
        } catch (t) {}
        try {
            if (n = function(t) {
                var n, e;
                if (!t || !t.stack)
                    return null;
                for (var i, r, o, s = [], u = t.stack.split("\n"), a = 0; a < u.length; ++a) {
                    if (r = le.exec(u[a])) {
                        var c = r[2] && 0 === r[2].indexOf("native");
                        r[2] && 0 === r[2].indexOf("eval") && (i = ve.exec(r[2])) && (r[2] = i[1],
                        r[3] = i[2],
                        r[4] = i[3]);
                        var l = r[2] && 0 === r[2].indexOf("address at ") ? r[2].substr("address at ".length) : r[2]
                          , f = r[1] || ce;
                        f = (n = at(ye(f, l), 2))[0],
                        o = {
                            url: l = n[1],
                            func: f,
                            args: c ? [r[2]] : [],
                            line: r[3] ? +r[3] : null,
                            column: r[4] ? +r[4] : null
                        }
                    } else if (r = de.exec(u[a]))
                        o = {
                            url: r[2],
                            func: r[1] || ce,
                            args: [],
                            line: +r[3],
                            column: r[4] ? +r[4] : null
                        };
                    else {
                        if (!(r = fe.exec(u[a])))
                            continue;
                        r[3] && r[3].indexOf(" > eval") > -1 && (i = he.exec(r[3])) ? (r[1] = r[1] || "eval",
                        r[3] = i[1],
                        r[4] = i[2],
                        r[5] = "") : 0 !== a || r[5] || void 0 === t.columnNumber || (s[0].column = t.columnNumber + 1);
                        l = r[3],
                        f = r[1] || ce;
                        f = (e = at(ye(f, l), 2))[0],
                        o = {
                            url: l = e[1],
                            func: f,
                            args: r[2] ? r[2].split(",") : [],
                            line: r[4] ? +r[4] : null,
                            column: r[5] ? +r[5] : null
                        }
                    }
                    !o.func && o.line && (o.func = ce),
                    s.push(o)
                }
                if (!s.length)
                    return null;
                return {
                    message: be(t),
                    name: t.name,
                    stack: s
                }
            }(t))
                return ge(n, e)
        } catch (t) {}
        return {
            message: be(t),
            name: t && t.name,
            stack: [],
            failed: !0
        }
    }
    var ye = function(t, n) {
        var e = -1 !== t.indexOf("safari-extension")
          , i = -1 !== t.indexOf("safari-web-extension");
        return e || i ? [-1 !== t.indexOf("@") ? t.split("@")[0] : ce, e ? "safari-extension:" + n : "safari-web-extension:" + n] : [t, n]
    };
    function ge(t, n) {
        try {
            return ot(ot({}, t), {
                stack: t.stack.slice(n)
            })
        } catch (n) {
            return t
        }
    }
    function be(t) {
        var n = t && t.message;
        return n ? n.error && "string" == typeof n.error.message ? n.error.message : n : "No error message"
    }
    function we(t) {
        var n = ke(t.stack)
          , e = {
            type: t.name,
            value: t.message
        };
        return n && n.length && (e.stacktrace = {
            frames: n
        }),
        void 0 === e.type && "" === e.value && (e.value = "Unrecoverable error caught"),
        e
    }
    function xe(t) {
        return {
            exception: {
                values: [we(t)]
            }
        }
    }
    function ke(t) {
        if (!t || !t.length)
            return [];
        var n = t
          , e = n[0].func || ""
          , i = n[n.length - 1].func || "";
        return -1 === e.indexOf("captureMessage") && -1 === e.indexOf("captureException") || (n = n.slice(1)),
        -1 !== i.indexOf("sentryWrapped") && (n = n.slice(0, -1)),
        n.slice(0, 50).map((function(t) {
            return {
                colno: null === t.column ? void 0 : t.column,
                filename: t.url || n[0].url,
                function: t.func || "?",
                in_app: !0,
                lineno: null === t.line ? void 0 : t.line
            }
        }
        )).reverse()
    }
    function Ee(t, n, e) {
        var i, r;
        if (void 0 === e && (e = {}),
        mt(t) && t.error)
            return i = xe(me(t = t.error));
        if (yt(t) || (r = t,
        "[object DOMException]" === Object.prototype.toString.call(r))) {
            var o = t
              , s = o.name || (yt(o) ? "DOMError" : "DOMException")
              , u = o.message ? s + ": " + o.message : s;
            return bn(i = Xe(u, n, e), u),
            "code"in o && (i.tags = ot(ot({}, i.tags), {
                "DOMException.code": "" + o.code
            })),
            i
        }
        return pt(t) ? i = xe(me(t)) : wt(t) || xt(t) ? (wn(i = function(t, n, e) {
            var i = {
                exception: {
                    values: [{
                        type: xt(t) ? t.constructor.name : e ? "UnhandledRejection" : "Error",
                        value: "Non-Error " + (e ? "promise rejection" : "exception") + " captured with keys: " + Kt(t)
                    }]
                },
                extra: {
                    $: Ut(t)
                }
            };
            if (n) {
                var r = ke(me(n).stack);
                i.stacktrace = {
                    frames: r
                }
            }
            return i
        }(t, n, e.rejection), {
            synthetic: !0
        }),
        i) : (bn(i = Xe(t, n, e), "" + t, void 0),
        wn(i, {
            synthetic: !0
        }),
        i)
    }
    function Xe(t, n, e) {
        void 0 === e && (e = {});
        var i = {
            message: t
        };
        if (e.attachStacktrace && n) {
            var r = ke(me(n).stack);
            i.stacktrace = {
                frames: r
            }
        }
        return i
    }
    var Se, Te = vt();
    function Ce() {
        var t, n;
        if (Se)
            return Se;
        if (Qt(Te.fetch))
            return Se = Te.fetch.bind(Te);
        var e = Te.document
          , i = Te.fetch;
        if ("function" == typeof (null === (t = e) || void 0 === t ? void 0 : t.createElement))
            try {
                var r = e.createElement("iframe");
                r.hidden = !0,
                e.head.appendChild(r),
                (null === (n = r.contentWindow) || void 0 === n ? void 0 : n.fetch) && (i = r.contentWindow.fetch),
                e.head.removeChild(r)
            } catch (t) {
                Ft.warn("Could not create sandbox iframe for pure fetch check, bailing to window.fetch: ", t)
            }
        return Se = i.bind(Te)
    }
    function je(t, n) {
        return "[object Navigator]" === Object.prototype.toString.call(Te && Te.navigator) && "function" == typeof Te.navigator.sendBeacon ? Te.navigator.sendBeacon.bind(Te.navigator)(t, n) : Zt() ? function(t) {
            t.then(null, (function(t) {
                console.error(t)
            }
            ))
        }(Ce()(t, {
            body: n,
            method: "POST",
            credentials: "omit",
            keepalive: !0
        })) : void 0
    }
    var Oe = {
        event: "error",
        transaction: "transaction",
        session: "session",
        attachment: "attachment"
    }
      , Ae = vt()
      , De = function() {
        function t(t) {
            var n = this;
            this.options = t,
            this._buffer = new Xn(30),
            this._rateLimits = {},
            this._outcomes = {},
            this._api = new Un(t.dsn,t._metadata,t.tunnel),
            this.url = this._api.getStoreEndpointWithUrlEncodedAuth(),
            this.options.sendClientReports && Ae.document && Ae.document.addEventListener("visibilitychange", (function() {
                "hidden" === Ae.document.visibilityState && n._flushOutcomes()
            }
            ))
        }
        return t.prototype.sendEvent = function(t) {
            throw new jt("Transport Class has to implement `sendEvent` method")
        }
        ,
        t.prototype.close = function(t) {
            return this._buffer.drain(t)
        }
        ,
        t.prototype.recordLostEvent = function(t, n) {
            var e;
            if (this.options.sendClientReports) {
                var i = Oe[n] + ":" + t;
                Ft.log("Adding outcome: " + i),
                this._outcomes[i] = (null != (e = this._outcomes[i]) ? e : 0) + 1
            }
        }
        ,
        t.prototype._flushOutcomes = function() {
            if (this.options.sendClientReports) {
                var t = this._outcomes;
                if (this._outcomes = {},
                Object.keys(t).length) {
                    Ft.log("Flushing outcomes:\n" + JSON.stringify(t, null, 2));
                    var n = this._api.getEnvelopeEndpointWithUrlEncodedAuth()
                      , e = JSON.stringify(ot({}, this.options.tunnel && {
                        dsn: this._api.getDsn().toString()
                    })) + "\n" + JSON.stringify({
                        type: "client_report"
                    }) + "\n" + JSON.stringify({
                        timestamp: jn(),
                        discarded_events: Object.keys(t).map((function(n) {
                            var e = at(n.split(":"), 2)
                              , i = e[0];
                            return {
                                reason: e[1],
                                category: i,
                                quantity: t[n]
                            }
                        }
                        ))
                    });
                    try {
                        je(n, e)
                    } catch (t) {
                        Ft.error(t)
                    }
                } else
                    Ft.log("No outcomes to flush")
            }
        }
        ,
        t.prototype._handleResponse = function(t) {
            var n = t.requestType
              , e = t.response
              , i = t.headers
              , r = t.resolve
              , o = t.reject
              , s = et.fromHttpCode(e.status);
            this._handleRateLimit(i) && Ft.warn("Too many " + n + " requests, backing off until: " + this._disabledUntil(n)),
            s !== et.Success ? o(e) : r({
                status: s
            })
        }
        ,
        t.prototype._disabledUntil = function(t) {
            var n = Oe[t];
            return this._rateLimits[n] || this._rateLimits.all
        }
        ,
        t.prototype._isRateLimited = function(t) {
            return this._disabledUntil(t) > new Date(Date.now())
        }
        ,
        t.prototype._handleRateLimit = function(t) {
            var n, e, i, r, o = Date.now(), s = t["x-sentry-rate-limits"], u = t["retry-after"];
            if (s) {
                try {
                    for (var a = ut(s.trim().split(",")), c = a.next(); !c.done; c = a.next()) {
                        var l = c.value.split(":", 2)
                          , f = parseInt(l[0], 10)
                          , d = 1e3 * (isNaN(f) ? 60 : f);
                        try {
                            for (var h = (i = void 0,
                            ut(l[1].split(";"))), v = h.next(); !v.done; v = h.next()) {
                                var p = v.value;
                                this._rateLimits[p || "all"] = new Date(o + d)
                            }
                        } catch (t) {
                            i = {
                                error: t
                            }
                        } finally {
                            try {
                                v && !v.done && (r = h.return) && r.call(h)
                            } finally {
                                if (i)
                                    throw i.error
                            }
                        }
                    }
                } catch (t) {
                    n = {
                        error: t
                    }
                } finally {
                    try {
                        c && !c.done && (e = a.return) && e.call(a)
                    } finally {
                        if (n)
                            throw n.error
                    }
                }
                return !0
            }
            return !!u && (this._rateLimits.all = new Date(o + function(t, n) {
                if (!n)
                    return 6e4;
                var e = parseInt("" + n, 10);
                if (!isNaN(e))
                    return 1e3 * e;
                var i = Date.parse("" + n);
                return isNaN(i) ? 6e4 : i - t
            }(o, u)),
            !0)
        }
        ,
        t
    }()
      , Me = function(t) {
        function n(n, e) {
            void 0 === e && (e = Ce());
            var i = t.call(this, n) || this;
            return i._fetch = e,
            i
        }
        return Z(n, t),
        n.prototype.sendEvent = function(t) {
            return this._sendRequest(ie(t, this._api), t)
        }
        ,
        n.prototype.sendSession = function(t) {
            return this._sendRequest(ee(t, this._api), t)
        }
        ,
        n.prototype._sendRequest = function(t, n) {
            var e = this;
            if (this._isRateLimited(t.type))
                return this.recordLostEvent(rt.RateLimitBackoff, t.type),
                Promise.reject({
                    event: n,
                    type: t.type,
                    reason: "Transport for " + t.type + " requests locked till " + this._disabledUntil(t.type) + " due to too many requests.",
                    status: 429
                });
            var i = {
                body: t.body,
                method: "POST",
                referrerPolicy: tn() ? "origin" : ""
            };
            return void 0 !== this.options.fetchParameters && Object.assign(i, this.options.fetchParameters),
            void 0 !== this.options.headers && (i.headers = this.options.headers),
            this._buffer.add((function() {
                return new En((function(n, r) {
                    e._fetch(t.url, i).then((function(i) {
                        var o = {
                            "x-sentry-rate-limits": i.headers.get("X-Sentry-Rate-Limits"),
                            "retry-after": i.headers.get("Retry-After")
                        };
                        e._handleResponse({
                            requestType: t.type,
                            response: i,
                            headers: o,
                            resolve: n,
                            reject: r
                        })
                    }
                    )).catch(r)
                }
                ))
            }
            )).then(void 0, (function(n) {
                throw n instanceof jt ? e.recordLostEvent(rt.QueueOverflow, t.type) : e.recordLostEvent(rt.NetworkError, t.type),
                n
            }
            ))
        }
        ,
        n
    }(De)
      , _e = function(t) {
        function n() {
            return null !== t && t.apply(this, arguments) || this
        }
        return Z(n, t),
        n.prototype.sendEvent = function(t) {
            return this._sendRequest(ie(t, this._api), t)
        }
        ,
        n.prototype.sendSession = function(t) {
            return this._sendRequest(ee(t, this._api), t)
        }
        ,
        n.prototype._sendRequest = function(t, n) {
            var e = this;
            return this._isRateLimited(t.type) ? (this.recordLostEvent(rt.RateLimitBackoff, t.type),
            Promise.reject({
                event: n,
                type: t.type,
                reason: "Transport for " + t.type + " requests locked till " + this._disabledUntil(t.type) + " due to too many requests.",
                status: 429
            })) : this._buffer.add((function() {
                return new En((function(n, i) {
                    var r = new XMLHttpRequest;
                    for (var o in r.onreadystatechange = function() {
                        if (4 === r.readyState) {
                            var o = {
                                "x-sentry-rate-limits": r.getResponseHeader("X-Sentry-Rate-Limits"),
                                "retry-after": r.getResponseHeader("Retry-After")
                            };
                            e._handleResponse({
                                requestType: t.type,
                                response: r,
                                headers: o,
                                resolve: n,
                                reject: i
                            })
                        }
                    }
                    ,
                    r.open("POST", t.url),
                    e.options.headers)
                        Object.prototype.hasOwnProperty.call(e.options.headers, o) && r.setRequestHeader(o, e.options.headers[o]);
                    r.send(t.body)
                }
                ))
            }
            )).then(void 0, (function(n) {
                throw n instanceof jt ? e.recordLostEvent(rt.QueueOverflow, t.type) : e.recordLostEvent(rt.NetworkError, t.type),
                n
            }
            ))
        }
        ,
        n
    }(De)
      , $e = function(t) {
        function n() {
            return null !== t && t.apply(this, arguments) || this
        }
        return Z(n, t),
        n.prototype.eventFromException = function(t, n) {
            return function(t, n, e) {
                var i = Ee(n, e && e.syntheticException || void 0, {
                    attachStacktrace: t.attachStacktrace
                });
                return wn(i),
                i.level = nt.Error,
                e && e.event_id && (i.event_id = e.event_id),
                En.resolve(i)
            }(this._options, t, n)
        }
        ,
        n.prototype.eventFromMessage = function(t, n, e) {
            return void 0 === n && (n = nt.Info),
            function(t, n, e, i) {
                void 0 === e && (e = nt.Info);
                var r = Xe(n, i && i.syntheticException || void 0, {
                    attachStacktrace: t.attachStacktrace
                });
                return r.level = e,
                i && i.event_id && (r.event_id = i.event_id),
                En.resolve(r)
            }(this._options, t, n, e)
        }
        ,
        n.prototype._setupTransport = function() {
            if (!this._options.dsn)
                return t.prototype._setupTransport.call(this);
            var n = ot(ot({}, this._options.transportOptions), {
                dsn: this._options.dsn,
                tunnel: this._options.tunnel,
                sendClientReports: this._options.sendClientReports,
                _metadata: this._options._metadata
            });
            return this._options.transport ? new this._options.transport(n) : Zt() ? new Me(n) : new _e(n)
        }
        ,
        n
    }(Qn)
      , Be = vt()
      , Fe = 0;
    function Ie() {
        return Fe > 0
    }
    function Re() {
        Fe += 1,
        setTimeout((function() {
            Fe -= 1
        }
        ))
    }
    function Ne(t, n, e) {
        if (void 0 === n && (n = {}),
        "function" != typeof t)
            return t;
        try {
            if (t._)
                return t;
            if (t.I)
                return t.I
        } catch (n) {
            return t
        }
        var i = function() {
            var i = Array.prototype.slice.call(arguments);
            try {
                e && "function" == typeof e && e.apply(this, arguments);
                var r = i.map((function(t) {
                    return Ne(t, n)
                }
                ));
                return t.handleEvent ? t.handleEvent.apply(this, r) : t.apply(this, r)
            } catch (t) {
                throw Re(),
                Hn((function(e) {
                    e.addEventProcessor((function(t) {
                        var e = ot({}, t);
                        return n.mechanism && (bn(e, void 0, void 0),
                        wn(e, n.mechanism)),
                        e.extra = ot(ot({}, e.extra), {
                            arguments: i
                        }),
                        e
                    }
                    )),
                    Ln(t)
                }
                )),
                t
            }
        };
        try {
            for (var r in t)
                Object.prototype.hasOwnProperty.call(t, r) && (i[r] = t[r])
        } catch (t) {}
        t.prototype = t.prototype || {},
        i.prototype = t.prototype,
        Object.defineProperty(t, "I", {
            enumerable: !1,
            value: i
        }),
        Object.defineProperties(i, {
            _: {
                enumerable: !1,
                value: !0
            },
            u: {
                enumerable: !1,
                value: t
            }
        });
        try {
            Object.getOwnPropertyDescriptor(i, "name").configurable && Object.defineProperty(i, "name", {
                get: function() {
                    return t.name
                }
            })
        } catch (t) {}
        return i
    }
    var Ge, ze = function() {
        function t(n) {
            this.name = t.id,
            this._onErrorHandlerInstalled = !1,
            this._onUnhandledRejectionHandlerInstalled = !1,
            this._options = ot({
                onerror: !0,
                onunhandledrejection: !0
            }, n)
        }
        return t.prototype.setupOnce = function() {
            Error.stackTraceLimit = 50,
            this._options.onerror && (Ft.log("Global Handler attached: onerror"),
            this._installGlobalOnErrorHandler()),
            this._options.onunhandledrejection && (Ft.log("Global Handler attached: onunhandledrejection"),
            this._installGlobalOnUnhandledRejectionHandler())
        }
        ,
        t.prototype._installGlobalOnErrorHandler = function() {
            var n = this;
            this._onErrorHandlerInstalled || (un({
                callback: function(e) {
                    var i = e.error
                      , r = Nn()
                      , o = r.getIntegration(t)
                      , s = i && !0 === i.j;
                    if (o && !Ie() && !s) {
                        var u = r.getClient()
                          , a = void 0 === i && gt(e.msg) ? n._eventFromIncompleteOnError(e.msg, e.url, e.line, e.column) : n._enhanceEventWithInitialFrame(Ee(i || e.msg, void 0, {
                            attachStacktrace: u && u.getOptions().attachStacktrace,
                            rejection: !1
                        }), e.url, e.line, e.column);
                        wn(a, {
                            handled: !1,
                            type: "onerror"
                        }),
                        r.captureEvent(a, {
                            originalException: i
                        })
                    }
                },
                type: "error"
            }),
            this._onErrorHandlerInstalled = !0)
        }
        ,
        t.prototype._installGlobalOnUnhandledRejectionHandler = function() {
            var n = this;
            this._onUnhandledRejectionHandlerInstalled || (un({
                callback: function(e) {
                    var i = e;
                    try {
                        "reason"in e ? i = e.reason : "detail"in e && "reason"in e.detail && (i = e.detail.reason)
                    } catch (t) {}
                    var r = Nn()
                      , o = r.getIntegration(t)
                      , s = i && !0 === i.j;
                    if (!o || Ie() || s)
                        return !0;
                    var u = r.getClient()
                      , a = bt(i) ? n._eventFromRejectionWithPrimitive(i) : Ee(i, void 0, {
                        attachStacktrace: u && u.getOptions().attachStacktrace,
                        rejection: !0
                    });
                    a.level = nt.Error,
                    wn(a, {
                        handled: !1,
                        type: "onunhandledrejection"
                    }),
                    r.captureEvent(a, {
                        originalException: i
                    })
                },
                type: "unhandledrejection"
            }),
            this._onUnhandledRejectionHandlerInstalled = !0)
        }
        ,
        t.prototype._eventFromIncompleteOnError = function(t, n, e, i) {
            var r, o = mt(t) ? t.message : t, s = o.match(/^(?:[Uu]ncaught (?:exception: )?)?(?:((?:Eval|Internal|Range|Reference|Syntax|Type|URI|)Error): )?(.*)$/i);
            s && (r = s[1],
            o = s[2]);
            var u = {
                exception: {
                    values: [{
                        type: r || "Error",
                        value: o
                    }]
                }
            };
            return this._enhanceEventWithInitialFrame(u, n, e, i)
        }
        ,
        t.prototype._eventFromRejectionWithPrimitive = function(t) {
            return {
                exception: {
                    values: [{
                        type: "UnhandledRejection",
                        value: "Non-Error promise rejection captured with value: " + String(t)
                    }]
                }
            }
        }
        ,
        t.prototype._enhanceEventWithInitialFrame = function(t, n, e, i) {
            t.exception = t.exception || {},
            t.exception.values = t.exception.values || [],
            t.exception.values[0] = t.exception.values[0] || {},
            t.exception.values[0].stacktrace = t.exception.values[0].stacktrace || {},
            t.exception.values[0].stacktrace.frames = t.exception.values[0].stacktrace.frames || [];
            var r = isNaN(parseInt(i, 10)) ? void 0 : i
              , o = isNaN(parseInt(e, 10)) ? void 0 : e
              , s = gt(n) && n.length > 0 ? n : function() {
                var t = vt();
                try {
                    return t.document.location.href
                } catch (t) {
                    return ""
                }
            }();
            return 0 === t.exception.values[0].stacktrace.frames.length && t.exception.values[0].stacktrace.frames.push({
                colno: r,
                filename: s,
                function: "?",
                in_app: !0,
                lineno: o
            }),
            t
        }
        ,
        t.id = "GlobalHandlers",
        t
    }(), Pe = ["EventTarget", "Window", "Node", "ApplicationCache", "AudioTrackList", "ChannelMergerNode", "CryptoOperation", "EventSource", "FileReader", "HTMLUnknownElement", "IDBDatabase", "IDBRequest", "IDBTransaction", "KeyOperation", "MediaController", "MessagePort", "ModalWindow", "Notification", "SVGElementInstance", "Screen", "TextTrack", "TextTrackCue", "TextTrackList", "WebSocket", "WebSocketWorker", "Worker", "XMLHttpRequest", "XMLHttpRequestEventTarget", "XMLHttpRequestUpload"], qe = function() {
        function t(n) {
            this.name = t.id,
            this._options = ot({
                XMLHttpRequest: !0,
                eventTarget: !0,
                requestAnimationFrame: !0,
                setInterval: !0,
                setTimeout: !0
            }, n)
        }
        return t.prototype.setupOnce = function() {
            var t = vt();
            (this._options.setTimeout && qt(t, "setTimeout", this._wrapTimeFunction.bind(this)),
            this._options.setInterval && qt(t, "setInterval", this._wrapTimeFunction.bind(this)),
            this._options.requestAnimationFrame && qt(t, "requestAnimationFrame", this._wrapRAF.bind(this)),
            this._options.XMLHttpRequest && "XMLHttpRequest"in t && qt(XMLHttpRequest.prototype, "send", this._wrapXHR.bind(this)),
            this._options.eventTarget) && (Array.isArray(this._options.eventTarget) ? this._options.eventTarget : Pe).forEach(this._wrapEventTarget.bind(this))
        }
        ,
        t.prototype._wrapTimeFunction = function(t) {
            return function() {
                for (var n = [], e = 0; e < arguments.length; e++)
                    n[e] = arguments[e];
                var i = n[0];
                return n[0] = Ne(i, {
                    mechanism: {
                        data: {
                            function: Nt(t)
                        },
                        handled: !0,
                        type: "instrument"
                    }
                }),
                t.apply(this, n)
            }
        }
        ,
        t.prototype._wrapRAF = function(t) {
            return function(n) {
                return t.call(this, Ne(n, {
                    mechanism: {
                        data: {
                            function: "requestAnimationFrame",
                            handler: Nt(t)
                        },
                        handled: !0,
                        type: "instrument"
                    }
                }))
            }
        }
        ,
        t.prototype._wrapEventTarget = function(t) {
            var n = vt()
              , e = n[t] && n[t].prototype;
            e && e.hasOwnProperty && e.hasOwnProperty("addEventListener") && (qt(e, "addEventListener", (function(n) {
                return function(e, i, r) {
                    try {
                        "function" == typeof i.handleEvent && (i.handleEvent = Ne(i.handleEvent.bind(i), {
                            mechanism: {
                                data: {
                                    function: "handleEvent",
                                    handler: Nt(i),
                                    target: t
                                },
                                handled: !0,
                                type: "instrument"
                            }
                        }))
                    } catch (t) {}
                    return n.call(this, e, Ne(i, {
                        mechanism: {
                            data: {
                                function: "addEventListener",
                                handler: Nt(i),
                                target: t
                            },
                            handled: !0,
                            type: "instrument"
                        }
                    }), r)
                }
            }
            )),
            qt(e, "removeEventListener", (function(t) {
                return function(n, e, i) {
                    var r, o = e;
                    try {
                        var s = null === (r = o) || void 0 === r ? void 0 : r.I;
                        s && t.call(this, n, s, i)
                    } catch (t) {}
                    return t.call(this, n, o, i)
                }
            }
            )))
        }
        ,
        t.prototype._wrapXHR = function(t) {
            return function() {
                for (var n = [], e = 0; e < arguments.length; e++)
                    n[e] = arguments[e];
                var i = this
                  , r = ["onload", "onerror", "onprogress", "onreadystatechange"];
                return r.forEach((function(t) {
                    t in i && "function" == typeof i[t] && qt(i, t, (function(n) {
                        var e = {
                            mechanism: {
                                data: {
                                    function: t,
                                    handler: Nt(n)
                                },
                                handled: !0,
                                type: "instrument"
                            }
                        };
                        return n.u && (e.mechanism.data.handler = Nt(n.u)),
                        Ne(n, e)
                    }
                    ))
                }
                )),
                t.apply(this, n)
            }
        }
        ,
        t.id = "TryCatch",
        t
    }(), Le = function() {
        function t(n) {
            this.name = t.id,
            this._options = ot({
                console: !0,
                dom: !0,
                fetch: !0,
                history: !0,
                sentry: !0,
                xhr: !0
            }, n)
        }
        return t.prototype.addSentryBreadcrumb = function(t) {
            this._options.sentry && Nn().addBreadcrumb({
                category: "sentry." + ("transaction" === t.type ? "transaction" : "event"),
                event_id: t.event_id,
                level: t.level,
                message: gn(t)
            }, {
                event: t
            })
        }
        ,
        t.prototype.setupOnce = function() {
            var t = this;
            this._options.console && un({
                callback: function() {
                    for (var n = [], e = 0; e < arguments.length; e++)
                        n[e] = arguments[e];
                    t._consoleBreadcrumb.apply(t, ct(n))
                },
                type: "console"
            }),
            this._options.dom && un({
                callback: function() {
                    for (var n = [], e = 0; e < arguments.length; e++)
                        n[e] = arguments[e];
                    t._domBreadcrumb.apply(t, ct(n))
                },
                type: "dom"
            }),
            this._options.xhr && un({
                callback: function() {
                    for (var n = [], e = 0; e < arguments.length; e++)
                        n[e] = arguments[e];
                    t._xhrBreadcrumb.apply(t, ct(n))
                },
                type: "xhr"
            }),
            this._options.fetch && un({
                callback: function() {
                    for (var n = [], e = 0; e < arguments.length; e++)
                        n[e] = arguments[e];
                    t._fetchBreadcrumb.apply(t, ct(n))
                },
                type: "fetch"
            }),
            this._options.history && un({
                callback: function() {
                    for (var n = [], e = 0; e < arguments.length; e++)
                        n[e] = arguments[e];
                    t._historyBreadcrumb.apply(t, ct(n))
                },
                type: "history"
            })
        }
        ,
        t.prototype._consoleBreadcrumb = function(t) {
            var n = {
                category: "console",
                data: {
                    arguments: t.args,
                    logger: "console"
                },
                level: nt.fromString(t.level),
                message: zt(t.args, " ")
            };
            if ("assert" === t.level) {
                if (!1 !== t.args[0])
                    return;
                n.message = "Assertion failed: " + (zt(t.args.slice(1), " ") || "console.assert"),
                n.data.arguments = t.args.slice(1)
            }
            Nn().addBreadcrumb(n, {
                input: t.args,
                level: t.level
            })
        }
        ,
        t.prototype._domBreadcrumb = function(t) {
            var n, e = "object" == typeof this._options.dom ? this._options.dom.serializeAttribute : void 0;
            "string" == typeof e && (e = [e]);
            try {
                n = t.event.target ? St(t.event.target, e) : St(t.event, e)
            } catch (t) {
                n = "<unknown>"
            }
            0 !== n.length && Nn().addBreadcrumb({
                category: "ui." + t.name,
                message: n
            }, {
                event: t.event,
                name: t.name,
                global: t.global
            })
        }
        ,
        t.prototype._xhrBreadcrumb = function(t) {
            if (t.endTimestamp) {
                if (t.xhr.j)
                    return;
                var n = t.xhr.X || {}
                  , e = n.method
                  , i = n.url
                  , r = n.status_code
                  , o = n.body;
                Nn().addBreadcrumb({
                    category: "xhr",
                    data: {
                        method: e,
                        url: i,
                        status_code: r
                    },
                    type: "http"
                }, {
                    xhr: t.xhr,
                    input: o
                })
            } else
                ;
        }
        ,
        t.prototype._fetchBreadcrumb = function(t) {
            t.endTimestamp && (t.fetchData.url.match(/sentry_key/) && "POST" === t.fetchData.method || (t.error ? Nn().addBreadcrumb({
                category: "fetch",
                data: t.fetchData,
                level: nt.Error,
                type: "http"
            }, {
                data: t.error,
                input: t.args
            }) : Nn().addBreadcrumb({
                category: "fetch",
                data: ot(ot({}, t.fetchData), {
                    status_code: t.response.status
                }),
                type: "http"
            }, {
                input: t.args,
                response: t.response
            })))
        }
        ,
        t.prototype._historyBreadcrumb = function(t) {
            var n = vt()
              , e = t.from
              , i = t.to
              , r = yn(n.location.href)
              , o = yn(e)
              , s = yn(i);
            o.path || (o = r),
            r.protocol === s.protocol && r.host === s.host && (i = s.relative),
            r.protocol === o.protocol && r.host === o.host && (e = o.relative),
            Nn().addBreadcrumb({
                category: "navigation",
                data: {
                    from: e,
                    to: i
                }
            })
        }
        ,
        t.id = "Breadcrumbs",
        t
    }(), He = function() {
        function t(n) {
            void 0 === n && (n = {}),
            this.name = t.id,
            this._key = n.key || "cause",
            this._limit = n.limit || 5
        }
        return t.prototype.setupOnce = function() {
            $n((function(n, e) {
                var i = Nn().getIntegration(t);
                if (i) {
                    var r = i._handler && i._handler.bind(i);
                    return "function" == typeof r ? r(n, e) : n
                }
                return n
            }
            ))
        }
        ,
        t.prototype._handler = function(t, n) {
            if (!(t.exception && t.exception.values && n && Xt(n.originalException, Error)))
                return t;
            var e = this._walkErrorTree(n.originalException, this._key);
            return t.exception.values = ct(e, t.exception.values),
            t
        }
        ,
        t.prototype._walkErrorTree = function(t, n, e) {
            if (void 0 === e && (e = []),
            !Xt(t[n], Error) || e.length + 1 >= this._limit)
                return e;
            var i = we(me(t[n]));
            return this._walkErrorTree(t[n], n, ct([i], e))
        }
        ,
        t.id = "LinkedErrors",
        t
    }(), Ue = vt(), Je = function() {
        function t() {
            this.name = t.id
        }
        return t.prototype.setupOnce = function() {
            $n((function(n) {
                var e, i, r;
                if (Nn().getIntegration(t)) {
                    if (!Ue.navigator && !Ue.location && !Ue.document)
                        return n;
                    var o = (null === (e = n.request) || void 0 === e ? void 0 : e.url) || (null === (i = Ue.location) || void 0 === i ? void 0 : i.href)
                      , s = (Ue.document || {}).referrer
                      , u = (Ue.navigator || {}).userAgent
                      , a = ot(ot(ot({}, null === (r = n.request) || void 0 === r ? void 0 : r.headers), s && {
                        Referer: s
                    }), u && {
                        "User-Agent": u
                    })
                      , c = ot(ot({}, o && {
                        url: o
                    }), {
                        headers: a
                    });
                    return ot(ot({}, n), {
                        request: c
                    })
                }
                return n
            }
            ))
        }
        ,
        t.id = "UserAgent",
        t
    }(), We = function() {
        function t() {
            this.name = t.id
        }
        return t.prototype.setupOnce = function(n, e) {
            n((function(n) {
                var i = e().getIntegration(t);
                if (i) {
                    try {
                        if (i._shouldDropEvent(n, i._previousEvent))
                            return Ft.warn("Event dropped due to being a duplicate of previously captured event."),
                            null
                    } catch (t) {
                        return i._previousEvent = n
                    }
                    return i._previousEvent = n
                }
                return n
            }
            ))
        }
        ,
        t.prototype._shouldDropEvent = function(t, n) {
            return !!n && (!!this._isSameMessageEvent(t, n) || !!this._isSameExceptionEvent(t, n))
        }
        ,
        t.prototype._isSameMessageEvent = function(t, n) {
            var e = t.message
              , i = n.message;
            return !(!e && !i) && (!(e && !i || !e && i) && (e === i && (!!this._isSameFingerprint(t, n) && !!this._isSameStacktrace(t, n))))
        }
        ,
        t.prototype._getFramesFromEvent = function(t) {
            var n = t.exception;
            if (n)
                try {
                    return n.values[0].stacktrace.frames
                } catch (t) {
                    return
                }
            else if (t.stacktrace)
                return t.stacktrace.frames
        }
        ,
        t.prototype._isSameStacktrace = function(t, n) {
            var e = this._getFramesFromEvent(t)
              , i = this._getFramesFromEvent(n);
            if (!e && !i)
                return !0;
            if (e && !i || !e && i)
                return !1;
            if (e = e,
            (i = i).length !== e.length)
                return !1;
            for (var r = 0; r < i.length; r++) {
                var o = i[r]
                  , s = e[r];
                if (o.filename !== s.filename || o.lineno !== s.lineno || o.colno !== s.colno || o.function !== s.function)
                    return !1
            }
            return !0
        }
        ,
        t.prototype._getExceptionFromEvent = function(t) {
            return t.exception && t.exception.values && t.exception.values[0]
        }
        ,
        t.prototype._isSameExceptionEvent = function(t, n) {
            var e = this._getExceptionFromEvent(n)
              , i = this._getExceptionFromEvent(t);
            return !(!e || !i) && (e.type === i.type && e.value === i.value && (!!this._isSameFingerprint(t, n) && !!this._isSameStacktrace(t, n)))
        }
        ,
        t.prototype._isSameFingerprint = function(t, n) {
            var e = t.fingerprint
              , i = n.fingerprint;
            if (!e && !i)
                return !0;
            if (e && !i || !e && i)
                return !1;
            e = e,
            i = i;
            try {
                return !(e.join("") !== i.join(""))
            } catch (t) {
                return !1
            }
        }
        ,
        t.id = "Dedupe",
        t
    }(), Ve = function(t) {
        function n(n) {
            void 0 === n && (n = {});
            return n._metadata = n._metadata || {},
            n._metadata.sdk = n._metadata.sdk || {
                name: "sentry.javascript.browser",
                packages: [{
                    name: "npm:@sentry/browser",
                    version: oe
                }],
                version: oe
            },
            t.call(this, $e, n) || this
        }
        return Z(n, t),
        n.prototype.showReportDialog = function(t) {
            void 0 === t && (t = {}),
            vt().document && (this._isEnabled() ? function(t) {
                if (void 0 === t && (t = {}),
                Be.document)
                    if (t.eventId)
                        if (t.dsn) {
                            var n = Be.document.createElement("script");
                            n.async = !0,
                            n.src = new Un(t.dsn).getReportDialogEndpoint(t),
                            t.onLoad && (n.onload = t.onLoad);
                            var e = Be.document.head || Be.document.body;
                            e && e.appendChild(n)
                        } else
                            Ft.error("Missing dsn option in showReportDialog call");
                    else
                        Ft.error("Missing eventId option in showReportDialog call")
            }(ot(ot({}, t), {
                dsn: t.dsn || this.getDsn()
            })) : Ft.error("Trying to call showReportDialog with Sentry Client disabled"))
        }
        ,
        n.prototype._prepareEvent = function(n, e, i) {
            return n.platform = n.platform || "javascript",
            t.prototype._prepareEvent.call(this, n, e, i)
        }
        ,
        n.prototype._sendEvent = function(n) {
            var e = this.getIntegration(Le);
            e && e.addSentryBreadcrumb(n),
            t.prototype._sendEvent.call(this, n)
        }
        ,
        n
    }(Yn), Ke = [new ae, new se, new qe, new Le, new ze, new He, new We, new Je];
    function Ye(t) {
        if (void 0 === t && (t = {}),
        void 0 === t.defaultIntegrations && (t.defaultIntegrations = Ke),
        void 0 === t.release) {
            var n = vt();
            n.SENTRY_RELEASE && n.SENTRY_RELEASE.id && (t.release = n.SENTRY_RELEASE.id)
        }
        void 0 === t.autoSessionTracking && (t.autoSessionTracking = !0),
        void 0 === t.sendClientReports && (t.sendClientReports = !0),
        function(t, n) {
            var e;
            !0 === n.debug && Ft.enable();
            var i = Nn();
            null === (e = i.getScope()) || void 0 === e || e.update(n.initialScope);
            var r = new t(n);
            i.bindClient(r)
        }(Ve, t),
        t.autoSessionTracking && function() {
            if (void 0 === vt().document)
                return void Ft.warn("Session tracking in non-browser environment with @sentry/browser is not supported.");
            var t = Nn();
            if ("function" != typeof t.startSession || "function" != typeof t.captureSession)
                return;
            t.startSession({
                ignoreDuration: !0
            }),
            t.captureSession(),
            un({
                callback: function(n) {
                    var e = n.from
                      , i = n.to;
                    void 0 !== e && e !== i && (t.startSession({
                        ignoreDuration: !0
                    }),
                    t.captureSession())
                },
                type: "history"
            })
        }()
    }
    !function(t) {
        t.Ok = "ok",
        t.DeadlineExceeded = "deadline_exceeded",
        t.Unauthenticated = "unauthenticated",
        t.PermissionDenied = "permission_denied",
        t.NotFound = "not_found",
        t.ResourceExhausted = "resource_exhausted",
        t.InvalidArgument = "invalid_argument",
        t.Unimplemented = "unimplemented",
        t.Unavailable = "unavailable",
        t.InternalError = "internal_error",
        t.UnknownError = "unknown_error",
        t.Cancelled = "cancelled",
        t.AlreadyExists = "already_exists",
        t.FailedPrecondition = "failed_precondition",
        t.Aborted = "aborted",
        t.OutOfRange = "out_of_range",
        t.DataLoss = "data_loss"
    }(Ge || (Ge = {})),
    function(t) {
        t.fromHttpCode = function(n) {
            if (n < 400)
                return t.Ok;
            if (n >= 400 && n < 500)
                switch (n) {
                case 401:
                    return t.Unauthenticated;
                case 403:
                    return t.PermissionDenied;
                case 404:
                    return t.NotFound;
                case 409:
                    return t.AlreadyExists;
                case 413:
                    return t.FailedPrecondition;
                case 429:
                    return t.ResourceExhausted;
                default:
                    return t.InvalidArgument
                }
            if (n >= 500 && n < 600)
                switch (n) {
                case 501:
                    return t.Unimplemented;
                case 503:
                    return t.Unavailable;
                case 504:
                    return t.DeadlineExceeded;
                default:
                    return t.InternalError
                }
            return t.UnknownError
        }
    }(Ge || (Ge = {}));
    var Ze = new RegExp("^[ \\t]*([0-9a-f]{32})?-?([0-9a-f]{16})?-?([01])?[ \\t]*$");
    function Qe(t) {
        var n;
        return void 0 === t && (t = null === (n = Nn().getClient()) || void 0 === n ? void 0 : n.getOptions()),
        !!t && ("tracesSampleRate"in t || "tracesSampler"in t)
    }
    function ti(t) {
        var n, e;
        return void 0 === t && (t = Nn()),
        null === (e = null === (n = t) || void 0 === n ? void 0 : n.getScope()) || void 0 === e ? void 0 : e.getTransaction()
    }
    function ni(t) {
        return t / 1e3
    }
    function ei() {
        var t = ti();
        t && (Ft.log("[Tracing] Transaction: " + Ge.InternalError + " -> Global error occured"),
        t.setStatus(Ge.InternalError))
    }
    var ii = function() {
        function t(t) {
            void 0 === t && (t = 1e3),
            this.spans = [],
            this._maxlen = t
        }
        return t.prototype.add = function(t) {
            this.spans.length > this._maxlen ? t.spanRecorder = void 0 : this.spans.push(t)
        }
        ,
        t
    }()
      , ri = function(t) {
        function n(n, e) {
            var i = t.call(this, n) || this;
            return i._measurements = {},
            i._hub = Nn(),
            Xt(e, Fn) && (i._hub = e),
            i.name = n.name || "",
            i.metadata = n.metadata || {},
            i._trimEnd = n.trimEnd,
            i.transaction = i,
            i
        }
        return Z(n, t),
        n.prototype.setName = function(t) {
            this.name = t
        }
        ,
        n.prototype.initSpanRecorder = function(t) {
            void 0 === t && (t = 1e3),
            this.spanRecorder || (this.spanRecorder = new ii(t)),
            this.spanRecorder.add(this)
        }
        ,
        n.prototype.setMeasurements = function(t) {
            this._measurements = ot({}, t)
        }
        ,
        n.prototype.setMetadata = function(t) {
            this.metadata = ot(ot({}, this.metadata), t)
        }
        ,
        n.prototype.finish = function(n) {
            var e, i, r, o, s, u = this;
            if (void 0 === this.endTimestamp) {
                if (this.name || (Ft.warn("Transaction has no name, falling back to `<unlabeled transaction>`."),
                this.name = "<unlabeled transaction>"),
                t.prototype.finish.call(this, n),
                !0 !== this.sampled)
                    return Ft.log("[Tracing] Discarding transaction because its trace was not chosen to be sampled."),
                    void (null === (s = null === (r = null === (e = this._hub.getClient()) || void 0 === e ? void 0 : (i = e).getTransport) || void 0 === r ? void 0 : (o = r.call(i)).recordLostEvent) || void 0 === s || s.call(o, rt.SampleRate, "transaction"));
                var a = this.spanRecorder ? this.spanRecorder.spans.filter((function(t) {
                    return t !== u && t.endTimestamp
                }
                )) : [];
                this._trimEnd && a.length > 0 && (this.endTimestamp = a.reduce((function(t, n) {
                    return t.endTimestamp && n.endTimestamp ? t.endTimestamp > n.endTimestamp ? t : n : t
                }
                )).endTimestamp);
                var c = {
                    contexts: {
                        trace: this.getTraceContext()
                    },
                    spans: a,
                    start_timestamp: this.startTimestamp,
                    tags: this.tags,
                    timestamp: this.endTimestamp,
                    transaction: this.name,
                    type: "transaction",
                    debug_meta: this.metadata
                };
                return Object.keys(this._measurements).length > 0 && (Ft.log("[Measurements] Adding measurements to transaction", JSON.stringify(this._measurements, void 0, 2)),
                c.measurements = this._measurements),
                Ft.log("[Tracing] Finishing " + this.op + " transaction: " + this.name + "."),
                this._hub.captureEvent(c)
            }
        }
        ,
        n.prototype.toContext = function() {
            var n = t.prototype.toContext.call(this);
            return Yt(ot(ot({}, n), {
                name: this.name,
                trimEnd: this._trimEnd
            }))
        }
        ,
        n.prototype.updateWithContext = function(n) {
            var e;
            return t.prototype.updateWithContext.call(this, n),
            this.name = null != (e = n.name) ? e : "",
            this._trimEnd = n.trimEnd,
            this
        }
        ,
        n
    }(function() {
        function t(t) {
            if (this.traceId = mn(),
            this.spanId = mn().substring(16),
            this.startTimestamp = An(),
            this.tags = {},
            this.data = {},
            !t)
                return this;
            t.traceId && (this.traceId = t.traceId),
            t.spanId && (this.spanId = t.spanId),
            t.parentSpanId && (this.parentSpanId = t.parentSpanId),
            "sampled"in t && (this.sampled = t.sampled),
            t.op && (this.op = t.op),
            t.description && (this.description = t.description),
            t.data && (this.data = t.data),
            t.tags && (this.tags = t.tags),
            t.status && (this.status = t.status),
            t.startTimestamp && (this.startTimestamp = t.startTimestamp),
            t.endTimestamp && (this.endTimestamp = t.endTimestamp)
        }
        return t.prototype.child = function(t) {
            return this.startChild(t)
        }
        ,
        t.prototype.startChild = function(n) {
            var e = new t(ot(ot({}, n), {
                parentSpanId: this.spanId,
                sampled: this.sampled,
                traceId: this.traceId
            }));
            return e.spanRecorder = this.spanRecorder,
            e.spanRecorder && e.spanRecorder.add(e),
            e.transaction = this.transaction,
            e
        }
        ,
        t.prototype.setTag = function(t, n) {
            var e;
            return this.tags = ot(ot({}, this.tags), ((e = {})[t] = n,
            e)),
            this
        }
        ,
        t.prototype.setData = function(t, n) {
            var e;
            return this.data = ot(ot({}, this.data), ((e = {})[t] = n,
            e)),
            this
        }
        ,
        t.prototype.setStatus = function(t) {
            return this.status = t,
            this
        }
        ,
        t.prototype.setHttpStatus = function(t) {
            this.setTag("http.status_code", String(t));
            var n = Ge.fromHttpCode(t);
            return n !== Ge.UnknownError && this.setStatus(n),
            this
        }
        ,
        t.prototype.isSuccess = function() {
            return this.status === Ge.Ok
        }
        ,
        t.prototype.finish = function(t) {
            this.endTimestamp = "number" == typeof t ? t : An()
        }
        ,
        t.prototype.toTraceparent = function() {
            var t = "";
            return void 0 !== this.sampled && (t = this.sampled ? "-1" : "-0"),
            this.traceId + "-" + this.spanId + t
        }
        ,
        t.prototype.toContext = function() {
            return Yt({
                data: this.data,
                description: this.description,
                endTimestamp: this.endTimestamp,
                op: this.op,
                parentSpanId: this.parentSpanId,
                sampled: this.sampled,
                spanId: this.spanId,
                startTimestamp: this.startTimestamp,
                status: this.status,
                tags: this.tags,
                traceId: this.traceId
            })
        }
        ,
        t.prototype.updateWithContext = function(t) {
            var n, e, i, r, o;
            return this.data = null != (n = t.data) ? n : {},
            this.description = t.description,
            this.endTimestamp = t.endTimestamp,
            this.op = t.op,
            this.parentSpanId = t.parentSpanId,
            this.sampled = t.sampled,
            this.spanId = null != (e = t.spanId) ? e : this.spanId,
            this.startTimestamp = null != (i = t.startTimestamp) ? i : this.startTimestamp,
            this.status = t.status,
            this.tags = null != (r = t.tags) ? r : {},
            this.traceId = null != (o = t.traceId) ? o : this.traceId,
            this
        }
        ,
        t.prototype.getTraceContext = function() {
            return Yt({
                data: Object.keys(this.data).length > 0 ? this.data : void 0,
                description: this.description,
                op: this.op,
                parent_span_id: this.parentSpanId,
                span_id: this.spanId,
                status: this.status,
                tags: Object.keys(this.tags).length > 0 ? this.tags : void 0,
                trace_id: this.traceId
            })
        }
        ,
        t.prototype.toJSON = function() {
            return Yt({
                data: Object.keys(this.data).length > 0 ? this.data : void 0,
                description: this.description,
                op: this.op,
                parent_span_id: this.parentSpanId,
                span_id: this.spanId,
                start_timestamp: this.startTimestamp,
                status: this.status,
                tags: Object.keys(this.tags).length > 0 ? this.tags : void 0,
                timestamp: this.endTimestamp,
                trace_id: this.traceId
            })
        }
        ,
        t
    }())
      , oi = function(t) {
        function n(n, e, i, r) {
            void 0 === i && (i = "");
            var o = t.call(this, r) || this;
            return o._pushActivity = n,
            o._popActivity = e,
            o.transactionSpanId = i,
            o
        }
        return Z(n, t),
        n.prototype.add = function(n) {
            var e = this;
            n.spanId !== this.transactionSpanId && (n.finish = function(t) {
                n.endTimestamp = "number" == typeof t ? t : An(),
                e._popActivity(n.spanId)
            }
            ,
            void 0 === n.endTimestamp && this._pushActivity(n.spanId)),
            t.prototype.add.call(this, n)
        }
        ,
        n
    }(ii)
      , si = function(t) {
        function n(n, e, i, r) {
            void 0 === i && (i = 1e3),
            void 0 === r && (r = !1);
            var o = t.call(this, n, e) || this;
            return o._idleHub = e,
            o._idleTimeout = i,
            o._onScope = r,
            o.activities = {},
            o._heartbeatCounter = 0,
            o._finished = !1,
            o._beforeFinishCallbacks = [],
            e && r && (ui(e),
            Ft.log("Setting idle transaction on scope. Span ID: " + o.spanId),
            e.configureScope((function(t) {
                return t.setSpan(o)
            }
            ))),
            o._initTimeout = setTimeout((function() {
                o._finished || o.finish()
            }
            ), o._idleTimeout),
            o
        }
        return Z(n, t),
        n.prototype.finish = function(n) {
            var e, i, r = this;
            if (void 0 === n && (n = An()),
            this._finished = !0,
            this.activities = {},
            this.spanRecorder) {
                Ft.log("[Tracing] finishing IdleTransaction", new Date(1e3 * n).toISOString(), this.op);
                try {
                    for (var o = ut(this._beforeFinishCallbacks), s = o.next(); !s.done; s = o.next()) {
                        (0,
                        s.value)(this, n)
                    }
                } catch (t) {
                    e = {
                        error: t
                    }
                } finally {
                    try {
                        s && !s.done && (i = o.return) && i.call(o)
                    } finally {
                        if (e)
                            throw e.error
                    }
                }
                this.spanRecorder.spans = this.spanRecorder.spans.filter((function(t) {
                    if (t.spanId === r.spanId)
                        return !0;
                    t.endTimestamp || (t.endTimestamp = n,
                    t.setStatus(Ge.Cancelled),
                    Ft.log("[Tracing] cancelling span since transaction ended early", JSON.stringify(t, void 0, 2)));
                    var e = t.startTimestamp < n;
                    return e || Ft.log("[Tracing] discarding Span since it happened after Transaction was finished", JSON.stringify(t, void 0, 2)),
                    e
                }
                )),
                Ft.log("[Tracing] flushing IdleTransaction")
            } else
                Ft.log("[Tracing] No active IdleTransaction");
            return this._onScope && ui(this._idleHub),
            t.prototype.finish.call(this, n)
        }
        ,
        n.prototype.registerBeforeFinishCallback = function(t) {
            this._beforeFinishCallbacks.push(t)
        }
        ,
        n.prototype.initSpanRecorder = function(t) {
            var n = this;
            if (!this.spanRecorder) {
                this.spanRecorder = new oi((function(t) {
                    n._finished || n._pushActivity(t)
                }
                ),(function(t) {
                    n._finished || n._popActivity(t)
                }
                ),this.spanId,t),
                Ft.log("Starting heartbeat"),
                this._pingHeartbeat()
            }
            this.spanRecorder.add(this)
        }
        ,
        n.prototype._pushActivity = function(t) {
            this._initTimeout && (clearTimeout(this._initTimeout),
            this._initTimeout = void 0),
            Ft.log("[Tracing] pushActivity: " + t),
            this.activities[t] = !0,
            Ft.log("[Tracing] new activities count", Object.keys(this.activities).length)
        }
        ,
        n.prototype._popActivity = function(t) {
            var n = this;
            if (this.activities[t] && (Ft.log("[Tracing] popActivity " + t),
            delete this.activities[t],
            Ft.log("[Tracing] new activities count", Object.keys(this.activities).length)),
            0 === Object.keys(this.activities).length) {
                var e = this._idleTimeout
                  , i = An() + e / 1e3;
                setTimeout((function() {
                    n._finished || n.finish(i)
                }
                ), e)
            }
        }
        ,
        n.prototype._beat = function() {
            if (!this._finished) {
                var t = Object.keys(this.activities).join("");
                t === this._prevHeartbeatString ? this._heartbeatCounter += 1 : this._heartbeatCounter = 1,
                this._prevHeartbeatString = t,
                this._heartbeatCounter >= 3 ? (Ft.log("[Tracing] Transaction finished because of no change for 3 heart beats"),
                this.setStatus(Ge.DeadlineExceeded),
                this.setTag("heartbeat", "failed"),
                this.finish()) : this._pingHeartbeat()
            }
        }
        ,
        n.prototype._pingHeartbeat = function() {
            var t = this;
            Ft.log("pinging Heartbeat -> current counter: " + this._heartbeatCounter),
            setTimeout((function() {
                t._beat()
            }
            ), 5e3)
        }
        ,
        n
    }(ri);
    function ui(t) {
        if (t) {
            var n = t.getScope();
            if (n)
                n.getTransaction() && n.setSpan(void 0)
        }
    }
    function ai() {
        var t = this.getScope();
        if (t) {
            var n = t.getSpan();
            if (n)
                return {
                    "sentry-trace": n.toTraceparent()
                }
        }
        return {}
    }
    function ci(t, n, e) {
        return Qe(n) ? void 0 !== t.sampled ? (t.setMetadata({
            transactionSampling: {
                method: it.Explicit
            }
        }),
        t) : ("function" == typeof n.tracesSampler ? (i = n.tracesSampler(e),
        t.setMetadata({
            transactionSampling: {
                method: it.Sampler,
                rate: Number(i)
            }
        })) : void 0 !== e.parentSampled ? (i = e.parentSampled,
        t.setMetadata({
            transactionSampling: {
                method: it.Inheritance
            }
        })) : (i = n.tracesSampleRate,
        t.setMetadata({
            transactionSampling: {
                method: it.Rate,
                rate: Number(i)
            }
        })),
        function(t) {
            if (isNaN(t) || "number" != typeof t && "boolean" != typeof t)
                return Ft.warn("[Tracing] Given sample rate is invalid. Sample rate must be a boolean or a number between 0 and 1. Got " + JSON.stringify(t) + " of type " + JSON.stringify(typeof t) + "."),
                !1;
            if (t < 0 || t > 1)
                return Ft.warn("[Tracing] Given sample rate is invalid. Sample rate must be between 0 and 1. Got " + t + "."),
                !1;
            return !0
        }(i) ? i ? (t.sampled = Math.random() < i,
        t.sampled ? (Ft.log("[Tracing] starting " + t.op + " transaction - " + t.name),
        t) : (Ft.log("[Tracing] Discarding transaction because it's not included in the random sample (sampling rate = " + Number(i) + ")"),
        t)) : (Ft.log("[Tracing] Discarding transaction because " + ("function" == typeof n.tracesSampler ? "tracesSampler returned 0 or false" : "a negative sampling decision was inherited or tracesSampleRate is set to 0")),
        t.sampled = !1,
        t) : (Ft.warn("[Tracing] Discarding transaction because of invalid sample rate."),
        t.sampled = !1,
        t)) : (t.sampled = !1,
        t);
        var i
    }
    function li(t, n) {
        var e, i, r = (null === (e = this.getClient()) || void 0 === e ? void 0 : e.getOptions()) || {}, o = new ri(t,this);
        return (o = ci(o, r, ot({
            parentSampled: t.parentSampled,
            transactionContext: t
        }, n))).sampled && o.initSpanRecorder(null === (i = r._experiments) || void 0 === i ? void 0 : i.maxSpans),
        o
    }
    var fi = vt();
    var di = function(t, n, e) {
        var i;
        return function(r) {
            n.value >= 0 && (r || e) && (n.delta = n.value - (i || 0),
            (n.delta || void 0 === i) && (i = n.value,
            t(n)))
        }
    }
      , hi = function(t, n) {
        return {
            name: t,
            value: null != n ? n : -1,
            delta: 0,
            entries: [],
            id: "v2-" + Date.now() + "-" + (Math.floor(8999999999999 * Math.random()) + 1e12)
        }
    }
      , vi = function(t, n) {
        try {
            if (PerformanceObserver.supportedEntryTypes.includes(t)) {
                if ("first-input" === t && !("PerformanceEventTiming"in self))
                    return;
                var e = new PerformanceObserver((function(t) {
                    return t.getEntries().map(n)
                }
                ));
                return e.observe({
                    type: t,
                    buffered: !0
                }),
                e
            }
        } catch (t) {}
    }
      , pi = function(t, n) {
        var e = function(i) {
            "pagehide" !== i.type && "hidden" !== vt().document.visibilityState || (t(i),
            n && (removeEventListener("visibilitychange", e, !0),
            removeEventListener("pagehide", e, !0)))
        };
        addEventListener("visibilitychange", e, !0),
        addEventListener("pagehide", e, !0)
    }
      , mi = -1
      , yi = function() {
        return mi < 0 && (mi = "hidden" === vt().document.visibilityState ? 0 : 1 / 0,
        pi((function(t) {
            var n = t.timeStamp;
            mi = n
        }
        ), !0)),
        {
            get firstHiddenTime() {
                return mi
            }
        }
    }
      , gi = {}
      , bi = vt()
      , wi = {
        _reportAllChanges: !1
    }
      , xi = function() {
        function t(t) {
            var n, e;
            this._measurements = {},
            this._performanceCursor = 0,
            !lt() && (null === (n = bi) || void 0 === n ? void 0 : n.performance) && (null === (e = bi) || void 0 === e ? void 0 : e.document) && (bi.performance.mark && bi.performance.mark("sentry-tracing-init"),
            this._trackCLS(),
            this._trackLCP(t._reportAllChanges),
            this._trackFID())
        }
        return t.prototype.addPerformanceEntries = function(t) {
            var n = this;
            if (bi && bi.performance && bi.performance.getEntries && Dn) {
                Ft.log("[Tracing] Adding & adjusting spans using Performance API");
                var e, i, r, o, s, u = ni(Dn);
                if (bi.document && bi.document.scripts)
                    for (var a = 0; a < bi.document.scripts.length; a++)
                        if ("true" === bi.document.scripts[a].dataset.entry) {
                            e = bi.document.scripts[a].src;
                            break
                        }
                if (bi.performance.getEntries().slice(this._performanceCursor).forEach((function(a) {
                    var c = ni(a.startTime)
                      , l = ni(a.duration);
                    if (!("navigation" === t.op && u + c < t.startTimestamp))
                        switch (a.entryType) {
                        case "navigation":
                            !function(t, n, e) {
                                ki({
                                    transaction: t,
                                    entry: n,
                                    event: "unloadEvent",
                                    timeOrigin: e
                                }),
                                ki({
                                    transaction: t,
                                    entry: n,
                                    event: "redirect",
                                    timeOrigin: e
                                }),
                                ki({
                                    transaction: t,
                                    entry: n,
                                    event: "domContentLoadedEvent",
                                    timeOrigin: e
                                }),
                                ki({
                                    transaction: t,
                                    entry: n,
                                    event: "loadEvent",
                                    timeOrigin: e
                                }),
                                ki({
                                    transaction: t,
                                    entry: n,
                                    event: "connect",
                                    timeOrigin: e
                                }),
                                ki({
                                    transaction: t,
                                    entry: n,
                                    event: "secureConnection",
                                    timeOrigin: e,
                                    eventEnd: "connectEnd",
                                    description: "TLS/SSL"
                                }),
                                ki({
                                    transaction: t,
                                    entry: n,
                                    event: "fetch",
                                    timeOrigin: e,
                                    eventEnd: "domainLookupStart",
                                    description: "cache"
                                }),
                                ki({
                                    transaction: t,
                                    entry: n,
                                    event: "domainLookup",
                                    timeOrigin: e,
                                    description: "DNS"
                                }),
                                function(t, n, e) {
                                    Ei(t, {
                                        op: "browser",
                                        description: "request",
                                        startTimestamp: e + ni(n.requestStart),
                                        endTimestamp: e + ni(n.responseEnd)
                                    }),
                                    Ei(t, {
                                        op: "browser",
                                        description: "response",
                                        startTimestamp: e + ni(n.responseStart),
                                        endTimestamp: e + ni(n.responseEnd)
                                    })
                                }(t, n, e)
                            }(t, a, u),
                            o = u + ni(a.responseStart),
                            s = u + ni(a.requestStart);
                            break;
                        case "mark":
                        case "paint":
                        case "measure":
                            var f = function(t, n, e, i, r) {
                                var o = r + e
                                  , s = o + i;
                                return Ei(t, {
                                    description: n.name,
                                    endTimestamp: s,
                                    op: n.entryType,
                                    startTimestamp: o
                                }),
                                o
                            }(t, a, c, l, u);
                            void 0 === r && "sentry-tracing-init" === a.name && (r = f);
                            var d = yi()
                              , h = a.startTime < d.firstHiddenTime;
                            "first-paint" === a.name && h && (Ft.log("[Measurements] Adding FP"),
                            n._measurements.fp = {
                                value: a.startTime
                            },
                            n._measurements["mark.fp"] = {
                                value: f
                            }),
                            "first-contentful-paint" === a.name && h && (Ft.log("[Measurements] Adding FCP"),
                            n._measurements.fcp = {
                                value: a.startTime
                            },
                            n._measurements["mark.fcp"] = {
                                value: f
                            });
                            break;
                        case "resource":
                            var v = a.name.replace(bi.location.origin, "")
                              , p = function(t, n, e, i, r, o) {
                                if ("xmlhttprequest" === n.initiatorType || "fetch" === n.initiatorType)
                                    return;
                                var s = {};
                                "transferSize"in n && (s["Transfer Size"] = n.transferSize);
                                "encodedBodySize"in n && (s["Encoded Body Size"] = n.encodedBodySize);
                                "decodedBodySize"in n && (s["Decoded Body Size"] = n.decodedBodySize);
                                var u = o + i
                                  , a = u + r;
                                return Ei(t, {
                                    description: e,
                                    endTimestamp: a,
                                    op: n.initiatorType ? "resource." + n.initiatorType : "resource",
                                    startTimestamp: u,
                                    data: s
                                }),
                                a
                            }(t, a, v, c, l, u);
                            void 0 === i && (e || "").indexOf(v) > -1 && (i = p)
                        }
                }
                )),
                void 0 !== i && void 0 !== r && Ei(t, {
                    description: "evaluation",
                    endTimestamp: r,
                    op: "script",
                    startTimestamp: i
                }),
                this._performanceCursor = Math.max(performance.getEntries().length - 1, 0),
                this._trackNavigator(t),
                "pageload" === t.op) {
                    var c = ni(Dn);
                    "number" == typeof o && (Ft.log("[Measurements] Adding TTFB"),
                    this._measurements.ttfb = {
                        value: 1e3 * (o - t.startTimestamp)
                    },
                    "number" == typeof s && s <= o && (this._measurements["ttfb.requestTime"] = {
                        value: 1e3 * (o - s)
                    })),
                    ["fcp", "fp", "lcp"].forEach((function(e) {
                        if (n._measurements[e] && !(c >= t.startTimestamp)) {
                            var i = n._measurements[e].value
                              , r = c + ni(i)
                              , o = Math.abs(1e3 * (r - t.startTimestamp))
                              , s = o - i;
                            Ft.log("[Measurements] Normalized " + e + " from " + i + " to " + o + " (" + s + ")"),
                            n._measurements[e].value = o
                        }
                    }
                    )),
                    this._measurements["mark.fid"] && this._measurements.fid && Ei(t, {
                        description: "first input delay",
                        endTimestamp: this._measurements["mark.fid"].value + ni(this._measurements.fid.value),
                        op: "web.vitals",
                        startTimestamp: this._measurements["mark.fid"].value
                    }),
                    "fcp"in this._measurements || delete this._measurements.cls,
                    t.setMeasurements(this._measurements),
                    this._tagMetricInfo(t)
                }
            }
        }
        ,
        t.prototype._tagMetricInfo = function(t) {
            this._lcpEntry && (Ft.log("[Measurements] Adding LCP Data"),
            this._lcpEntry.element && t.setTag("lcp.element", St(this._lcpEntry.element)),
            this._lcpEntry.id && t.setTag("lcp.id", this._lcpEntry.id),
            this._lcpEntry.url && t.setTag("lcp.url", this._lcpEntry.url.trim().slice(0, 200)),
            t.setTag("lcp.size", this._lcpEntry.size)),
            this._clsEntry && this._clsEntry.sources && (Ft.log("[Measurements] Adding CLS Data"),
            this._clsEntry.sources.forEach((function(n, e) {
                return t.setTag("cls.source." + (e + 1), St(n.node))
            }
            )))
        }
        ,
        t.prototype._trackCLS = function() {
            var t = this;
            !function(t, n) {
                var e, i = hi("CLS", 0), r = 0, o = [], s = function(t) {
                    if (t && !t.hadRecentInput) {
                        var n = o[0]
                          , s = o[o.length - 1];
                        r && 0 !== o.length && t.startTime - s.startTime < 1e3 && t.startTime - n.startTime < 5e3 ? (r += t.value,
                        o.push(t)) : (r = t.value,
                        o = [t]),
                        r > i.value && (i.value = r,
                        i.entries = o,
                        e && e())
                    }
                }, u = vi("layout-shift", s);
                u && (e = di(t, i, n),
                pi((function() {
                    u.takeRecords().map(s),
                    e(!0)
                }
                )))
            }((function(n) {
                var e = n.entries.pop();
                e && (Ft.log("[Measurements] Adding CLS"),
                t._measurements.cls = {
                    value: n.value
                },
                t._clsEntry = e)
            }
            ))
        }
        ,
        t.prototype._trackNavigator = function(t) {
            var n = bi.navigator;
            if (n) {
                var e = n.connection;
                e && (e.effectiveType && t.setTag("effectiveConnectionType", e.effectiveType),
                e.type && t.setTag("connectionType", e.type),
                Xi(e.rtt) && (this._measurements["connection.rtt"] = {
                    value: e.rtt
                }),
                Xi(e.downlink) && (this._measurements["connection.downlink"] = {
                    value: e.downlink
                })),
                Xi(n.deviceMemory) && t.setTag("deviceMemory", String(n.deviceMemory)),
                Xi(n.hardwareConcurrency) && t.setTag("hardwareConcurrency", String(n.hardwareConcurrency))
            }
        }
        ,
        t.prototype._trackLCP = function(t) {
            var n = this;
            !function(t, n) {
                var e, i = yi(), r = hi("LCP"), o = function(t) {
                    var n = t.startTime;
                    n < i.firstHiddenTime && (r.value = n,
                    r.entries.push(t)),
                    e && e()
                }, s = vi("largest-contentful-paint", o);
                if (s) {
                    e = di(t, r, n);
                    var u = function() {
                        gi[r.id] || (s.takeRecords().map(o),
                        s.disconnect(),
                        gi[r.id] = !0,
                        e(!0))
                    };
                    ["keydown", "click"].forEach((function(t) {
                        addEventListener(t, u, {
                            once: !0,
                            capture: !0
                        })
                    }
                    )),
                    pi(u, !0)
                }
            }((function(t) {
                var e = t.entries.pop();
                if (e) {
                    var i = ni(Dn)
                      , r = ni(e.startTime);
                    Ft.log("[Measurements] Adding LCP"),
                    n._measurements.lcp = {
                        value: t.value
                    },
                    n._measurements["mark.lcp"] = {
                        value: i + r
                    },
                    n._lcpEntry = e
                }
            }
            ), t)
        }
        ,
        t.prototype._trackFID = function() {
            var t = this;
            !function(t, n) {
                var e, i = yi(), r = hi("FID"), o = function(t) {
                    e && t.startTime < i.firstHiddenTime && (r.value = t.processingStart - t.startTime,
                    r.entries.push(t),
                    e(!0))
                }, s = vi("first-input", o);
                s && (e = di(t, r, n),
                pi((function() {
                    s.takeRecords().map(o),
                    s.disconnect()
                }
                ), !0))
            }((function(n) {
                var e = n.entries.pop();
                if (e) {
                    var i = ni(Dn)
                      , r = ni(e.startTime);
                    Ft.log("[Measurements] Adding FID"),
                    t._measurements.fid = {
                        value: n.value
                    },
                    t._measurements["mark.fid"] = {
                        value: i + r
                    }
                }
            }
            ))
        }
        ,
        t
    }();
    function ki(t) {
        var n = t.transaction
          , e = t.entry
          , i = t.event
          , r = t.timeOrigin
          , o = t.eventEnd
          , s = t.description
          , u = o ? e[o] : e[i + "End"]
          , a = e[i + "Start"];
        a && u && Ei(n, {
            op: "browser",
            description: null != s ? s : i,
            startTimestamp: r + ni(a),
            endTimestamp: r + ni(u)
        })
    }
    function Ei(t, n) {
        var e = n.startTimestamp
          , i = st(n, ["startTimestamp"]);
        return e && t.startTimestamp > e && (t.startTimestamp = e),
        t.startChild(ot({
            startTimestamp: e
        }, i))
    }
    function Xi(t) {
        return "number" == typeof t && isFinite(t)
    }
    var Si = {
        traceFetch: !0,
        traceXHR: !0,
        tracingOrigins: ["localhost", /^\//]
    };
    function Ti(t) {
        var n = ot(ot({}, Si), t)
          , e = n.traceFetch
          , i = n.traceXHR
          , r = n.tracingOrigins
          , o = n.shouldCreateSpanForRequest
          , s = {}
          , u = function(t) {
            if (s[t])
                return s[t];
            var n = r;
            return s[t] = n.some((function(n) {
                return Pt(t, n)
            }
            )) && !Pt(t, "sentry_key"),
            s[t]
        }
          , a = u;
        "function" == typeof o && (a = function(t) {
            return u(t) && o(t)
        }
        );
        var c = {};
        e && un({
            callback: function(t) {
                !function(t, n, e) {
                    if (!Qe() || !t.fetchData || !n(t.fetchData.url))
                        return;
                    if (t.endTimestamp && t.fetchData.__span) {
                        return void ((r = e[t.fetchData.__span]) && (t.response ? r.setHttpStatus(t.response.status) : t.error && r.setStatus(Ge.InternalError),
                        r.finish(),
                        delete e[t.fetchData.__span]))
                    }
                    var i = ti();
                    if (i) {
                        var r = i.startChild({
                            data: ot(ot({}, t.fetchData), {
                                type: "fetch"
                            }),
                            description: t.fetchData.method + " " + t.fetchData.url,
                            op: "http.client"
                        });
                        t.fetchData.__span = r.spanId,
                        e[r.spanId] = r;
                        var o = t.args[0] = t.args[0]
                          , s = t.args[1] = t.args[1] || {}
                          , u = s.headers;
                        Xt(o, Request) && (u = o.headers),
                        u ? "function" == typeof u.append ? u.append("sentry-trace", r.toTraceparent()) : u = Array.isArray(u) ? ct(u, [["sentry-trace", r.toTraceparent()]]) : ot(ot({}, u), {
                            "sentry-trace": r.toTraceparent()
                        }) : u = {
                            "sentry-trace": r.toTraceparent()
                        },
                        s.headers = u
                    }
                }(t, a, c)
            },
            type: "fetch"
        }),
        i && un({
            callback: function(t) {
                !function(t, n, e) {
                    var i, r;
                    if (!Qe() || (null === (i = t.xhr) || void 0 === i ? void 0 : i.j) || !(null === (r = t.xhr) || void 0 === r ? void 0 : r.X) || !n(t.xhr.X.url))
                        return;
                    var o = t.xhr.X;
                    if (t.endTimestamp && t.xhr.R) {
                        return void ((u = e[t.xhr.R]) && (u.setHttpStatus(o.status_code),
                        u.finish(),
                        delete e[t.xhr.R]))
                    }
                    var s = ti();
                    if (s) {
                        var u = s.startChild({
                            data: ot(ot({}, o.data), {
                                type: "xhr",
                                method: o.method,
                                url: o.url
                            }),
                            description: o.method + " " + o.url,
                            op: "http.client"
                        });
                        if (t.xhr.R = u.spanId,
                        e[t.xhr.R] = u,
                        t.xhr.setRequestHeader)
                            try {
                                t.xhr.setRequestHeader("sentry-trace", u.toTraceparent())
                            } catch (t) {}
                    }
                }(t, a, c)
            },
            type: "xhr"
        })
    }
    var Ci = vt();
    var ji = ot({
        idleTimeout: 1e3,
        markBackgroundTransactions: !0,
        maxTransactionDuration: 600,
        routingInstrumentation: function(t, n, e) {
            if (void 0 === n && (n = !0),
            void 0 === e && (e = !0),
            Ci && Ci.location) {
                var i, r = Ci.location.href;
                n && (i = t({
                    name: Ci.location.pathname,
                    op: "pageload"
                })),
                e && un({
                    callback: function(n) {
                        var e = n.to
                          , o = n.from;
                        void 0 === o && r && -1 !== r.indexOf(e) ? r = void 0 : o !== e && (r = void 0,
                        i && (Ft.log("[Tracing] Finishing current transaction with op: " + i.op),
                        i.finish()),
                        i = t({
                            name: Ci.location.pathname,
                            op: "navigation"
                        }))
                    },
                    type: "history"
                })
            } else
                Ft.warn("Could not initialize routing instrumentation due to invalid location")
        },
        startTransactionOnLocationChange: !0,
        startTransactionOnPageLoad: !0
    }, Si)
      , Oi = function() {
        function t(n) {
            this.name = t.id,
            this._emitOptionsWarning = !1;
            var e = Si.tracingOrigins;
            n && n.tracingOrigins && Array.isArray(n.tracingOrigins) && 0 !== n.tracingOrigins.length ? e = n.tracingOrigins : this._emitOptionsWarning = !0,
            this.options = ot(ot(ot({}, ji), n), {
                tracingOrigins: e
            }),
            this._metrics = new xi(ot(ot({}, wi), this.options._metricOptions))
        }
        return t.prototype.setupOnce = function(t, n) {
            var e = this;
            this._getCurrentHub = n,
            this._emitOptionsWarning && (Ft.warn("[Tracing] You need to define `tracingOrigins` in the options. Set an array of urls or patterns to trace."),
            Ft.warn("[Tracing] We added a reasonable default for you: " + Si.tracingOrigins));
            var i = this.options
              , r = i.routingInstrumentation
              , o = i.startTransactionOnLocationChange
              , s = i.startTransactionOnPageLoad
              , u = i.markBackgroundTransactions
              , a = i.traceFetch
              , c = i.traceXHR
              , l = i.tracingOrigins
              , f = i.shouldCreateSpanForRequest;
            r((function(t) {
                return e._createRouteTransaction(t)
            }
            ), s, o),
            u && (fi && fi.document ? fi.document.addEventListener("visibilitychange", (function() {
                var t = ti();
                fi.document.hidden && t && (Ft.log("[Tracing] Transaction: " + Ge.Cancelled + " -> since tab moved to the background, op: " + t.op),
                t.status || t.setStatus(Ge.Cancelled),
                t.setTag("visibilitychange", "document.hidden"),
                t.finish())
            }
            )) : Ft.warn("[Tracing] Could not set up background tab detection due to lack of global document")),
            Ti({
                traceFetch: a,
                traceXHR: c,
                tracingOrigins: l,
                shouldCreateSpanForRequest: f
            })
        }
        ,
        t.prototype._createRouteTransaction = function(t) {
            var n = this;
            if (this._getCurrentHub) {
                var e = this.options
                  , i = e.beforeNavigate
                  , r = e.idleTimeout
                  , o = e.maxTransactionDuration
                  , s = "pageload" === t.op ? function() {
                    var t = (n = "sentry-trace",
                    e = vt().document.querySelector("meta[name=" + n + "]"),
                    e ? e.getAttribute("content") : null);
                    var n, e;
                    if (t)
                        return function(t) {
                            var n = t.match(Ze);
                            if (n) {
                                var e = void 0;
                                return "1" === n[3] ? e = !0 : "0" === n[3] && (e = !1),
                                {
                                    traceId: n[1],
                                    parentSampled: e,
                                    parentSpanId: n[2]
                                }
                            }
                        }(t);
                    return
                }() : void 0
                  , u = ot(ot(ot({}, t), s), {
                    trimEnd: !0
                })
                  , a = "function" == typeof i ? i(u) : u
                  , c = void 0 === a ? ot(ot({}, u), {
                    sampled: !1
                }) : a;
                !1 === c.sampled && Ft.log("[Tracing] Will not send " + c.op + " transaction because of beforeNavigate."),
                Ft.log("[Tracing] Starting " + c.op + " transaction on scope");
                var l = function(t, n, e, i, r) {
                    var o, s, u = (null === (o = t.getClient()) || void 0 === o ? void 0 : o.getOptions()) || {}, a = new si(n,t,e,i);
                    return (a = ci(a, u, ot({
                        parentSampled: n.parentSampled,
                        transactionContext: n
                    }, r))).sampled && a.initSpanRecorder(null === (s = u._experiments) || void 0 === s ? void 0 : s.maxSpans),
                    a
                }(this._getCurrentHub(), c, r, !0, {
                    location: vt().location
                });
                return l.registerBeforeFinishCallback((function(t, e) {
                    n._metrics.addPerformanceEntries(t),
                    function(t, n, e) {
                        var i = e - n.startTimestamp;
                        e && (i > t || i < 0) && (n.setStatus(Ge.DeadlineExceeded),
                        n.setTag("maxTransactionDurationExceeded", "true"))
                    }(1e3 * o, t, e)
                }
                )),
                l
            }
            Ft.warn("[Tracing] Did not create " + t.op + " transaction because _getCurrentHub is invalid.")
        }
        ,
        t.id = "BrowserTracing",
        t
    }();
    var Ai = function() {
        function t(n) {
            void 0 === n && (n = {}),
            this.name = t.id,
            this._router = n.router || n.app,
            this._methods = (Array.isArray(n.methods) ? n.methods : []).concat("use")
        }
        return t.prototype.setupOnce = function() {
            this._router ? function(t, n) {
                void 0 === n && (n = []);
                n.forEach((function(n) {
                    return function(t, n) {
                        var e = t[n];
                        return t[n] = function() {
                            for (var t = [], i = 0; i < arguments.length; i++)
                                t[i] = arguments[i];
                            return e.call.apply(e, ct([this], Mi(t, n)))
                        }
                        ,
                        t
                    }(t, n)
                }
                ))
            }(this._router, this._methods) : Ft.error("ExpressIntegration is missing an Express instance")
        }
        ,
        t.id = "Express",
        t
    }();
    function Di(t, n) {
        var e = t.length;
        switch (e) {
        case 2:
            return function(e, i) {
                var r = i.__sentry_transaction;
                if (r) {
                    var o = r.startChild({
                        description: t.name,
                        op: "middleware." + n
                    });
                    i.once("finish", (function() {
                        o.finish()
                    }
                    ))
                }
                return t.call(this, e, i)
            }
            ;
        case 3:
            return function(e, i, r) {
                var o, s = null === (o = i.__sentry_transaction) || void 0 === o ? void 0 : o.startChild({
                    description: t.name,
                    op: "middleware." + n
                });
                t.call(this, e, i, (function() {
                    for (var t, n = [], e = 0; e < arguments.length; e++)
                        n[e] = arguments[e];
                    null === (t = s) || void 0 === t || t.finish(),
                    r.call.apply(r, ct([this], n))
                }
                ))
            }
            ;
        case 4:
            return function(e, i, r, o) {
                var s, u = null === (s = r.__sentry_transaction) || void 0 === s ? void 0 : s.startChild({
                    description: t.name,
                    op: "middleware." + n
                });
                t.call(this, e, i, r, (function() {
                    for (var t, n = [], e = 0; e < arguments.length; e++)
                        n[e] = arguments[e];
                    null === (t = u) || void 0 === t || t.finish(),
                    o.call.apply(o, ct([this], n))
                }
                ))
            }
            ;
        default:
            throw new Error("Express middleware takes 2-4 arguments. Got: " + e)
        }
    }
    function Mi(t, n) {
        return t.map((function(t) {
            return "function" == typeof t ? Di(t, n) : Array.isArray(t) ? t.map((function(t) {
                return "function" == typeof t ? Di(t, n) : t
            }
            )) : t
        }
        ))
    }
    var _i, $i = function() {
        function t(n) {
            void 0 === n && (n = {}),
            this.name = t.id,
            this._usePgNative = !!n.usePgNative
        }
        return t.prototype.setupOnce = function(t, n) {
            var e, i = dt("pg");
            i ? !this._usePgNative || (null === (e = i.native) || void 0 === e ? void 0 : e.Client) ? qt((this._usePgNative ? i.native : i).Client.prototype, "query", (function(t) {
                return function(e, i, r) {
                    var o, s, u, a = null === (s = null === (o = n().getScope()) || void 0 === o ? void 0 : o.getSpan()) || void 0 === s ? void 0 : s.startChild({
                        description: "string" == typeof e ? e : e.text,
                        op: "db"
                    });
                    if ("function" == typeof r)
                        return t.call(this, e, i, (function(t, n) {
                            var e;
                            null === (e = a) || void 0 === e || e.finish(),
                            r(t, n)
                        }
                        ));
                    if ("function" == typeof i)
                        return t.call(this, e, (function(t, n) {
                            var e;
                            null === (e = a) || void 0 === e || e.finish(),
                            i(t, n)
                        }
                        ));
                    var c = void 0 !== i ? t.call(this, e, i) : t.call(this, e);
                    return Et(c) ? c.then((function(t) {
                        var n;
                        return null === (n = a) || void 0 === n || n.finish(),
                        t
                    }
                    )) : (null === (u = a) || void 0 === u || u.finish(),
                    c)
                }
            }
            )) : Ft.error("Postgres Integration was unable to access 'pg-native' bindings.") : Ft.error("Postgres Integration was unable to require `pg` package.")
        }
        ,
        t.id = "Postgres",
        t
    }(), Bi = function() {
        function t() {
            this.name = t.id
        }
        return t.prototype.setupOnce = function(t, n) {
            var e = dt("mysql/lib/Connection.js");
            e ? qt(e, "createQuery", (function(t) {
                return function(e, i, r) {
                    var o, s, u = null === (s = null === (o = n().getScope()) || void 0 === o ? void 0 : o.getSpan()) || void 0 === s ? void 0 : s.startChild({
                        description: "string" == typeof e ? e : e.sql,
                        op: "db"
                    });
                    return "function" == typeof r ? t.call(this, e, i, (function(t, n, e) {
                        var i;
                        null === (i = u) || void 0 === i || i.finish(),
                        r(t, n, e)
                    }
                    )) : "function" == typeof i ? t.call(this, e, (function(t, n, e) {
                        var r;
                        null === (r = u) || void 0 === r || r.finish(),
                        i(t, n, e)
                    }
                    )) : t.call(this, e, i, r)
                }
            }
            )) : Ft.error("Mysql Integration was unable to require `mysql` package.")
        }
        ,
        t.id = "Mysql",
        t
    }(), Fi = ["aggregate", "bulkWrite", "countDocuments", "createIndex", "createIndexes", "deleteMany", "deleteOne", "distinct", "drop", "dropIndex", "dropIndexes", "estimatedDocumentCount", "find", "findOne", "findOneAndDelete", "findOneAndReplace", "findOneAndUpdate", "indexes", "indexExists", "indexInformation", "initializeOrderedBulkOp", "insertMany", "insertOne", "isCapped", "mapReduce", "options", "parallelCollectionScan", "rename", "replaceOne", "stats", "updateMany", "updateOne"], Ii = {
        bulkWrite: ["operations"],
        countDocuments: ["query"],
        createIndex: ["fieldOrSpec"],
        createIndexes: ["indexSpecs"],
        deleteMany: ["filter"],
        deleteOne: ["filter"],
        distinct: ["key", "query"],
        dropIndex: ["indexName"],
        find: ["query"],
        findOne: ["query"],
        findOneAndDelete: ["filter"],
        findOneAndReplace: ["filter", "replacement"],
        findOneAndUpdate: ["filter", "update"],
        indexExists: ["indexes"],
        insertMany: ["docs"],
        insertOne: ["doc"],
        mapReduce: ["map", "reduce"],
        rename: ["newName"],
        replaceOne: ["filter", "doc"],
        updateMany: ["filter", "update"],
        updateOne: ["filter", "update"]
    }, Ri = function() {
        function t(n) {
            void 0 === n && (n = {}),
            this.name = t.id,
            this._operations = Array.isArray(n.operations) ? n.operations : Fi,
            this._describeOperations = !("describeOperations"in n) || n.describeOperations,
            this._useMongoose = !!n.useMongoose
        }
        return t.prototype.setupOnce = function(t, n) {
            var e = this._useMongoose ? "mongoose" : "mongodb"
              , i = dt(e);
            i ? this._instrumentOperations(i.Collection, this._operations, n) : Ft.error("Mongo Integration was unable to require `" + e + "` package.")
        }
        ,
        t.prototype._instrumentOperations = function(t, n, e) {
            var i = this;
            n.forEach((function(n) {
                return i._patchOperation(t, n, e)
            }
            ))
        }
        ,
        t.prototype._patchOperation = function(t, n, e) {
            if (n in t.prototype) {
                var i = this._getSpanContextFromOperationArguments.bind(this);
                qt(t.prototype, n, (function(t) {
                    return function() {
                        for (var r, o, s, u, a = [], c = 0; c < arguments.length; c++)
                            a[c] = arguments[c];
                        var l = a[a.length - 1]
                          , f = e().getScope()
                          , d = null === (r = f) || void 0 === r ? void 0 : r.getSpan();
                        if ("function" != typeof l || "mapReduce" === n && 2 === a.length) {
                            var h = null === (o = d) || void 0 === o ? void 0 : o.startChild(i(this, n, a))
                              , v = t.call.apply(t, ct([this], a));
                            return Et(v) ? v.then((function(t) {
                                var n;
                                return null === (n = h) || void 0 === n || n.finish(),
                                t
                            }
                            )) : (null === (s = h) || void 0 === s || s.finish(),
                            v)
                        }
                        var p = null === (u = d) || void 0 === u ? void 0 : u.startChild(i(this, n, a.slice(0, -1)));
                        return t.call.apply(t, ct([this], a.slice(0, -1), [function(t, n) {
                            var e;
                            null === (e = p) || void 0 === e || e.finish(),
                            l(t, n)
                        }
                        ]))
                    }
                }
                ))
            }
        }
        ,
        t.prototype._getSpanContextFromOperationArguments = function(t, n, e) {
            var i = {
                collectionName: t.collectionName,
                dbName: t.dbName,
                namespace: t.namespace
            }
              , r = {
                op: "db",
                description: n,
                data: i
            }
              , o = Ii[n]
              , s = Array.isArray(this._describeOperations) ? this._describeOperations.includes(n) : this._describeOperations;
            if (!o || !s)
                return r;
            try {
                if ("mapReduce" === n) {
                    var u = at(e, 2)
                      , a = u[0]
                      , c = u[1];
                    i[o[0]] = "string" == typeof a ? a : a.name || "<anonymous>",
                    i[o[1]] = "string" == typeof c ? c : c.name || "<anonymous>"
                } else
                    for (var l = 0; l < o.length; l++)
                        i[o[l]] = JSON.stringify(e[l])
            } catch (t) {}
            return r
        }
        ,
        t.id = "Mongo",
        t
    }(), Ni = ot(ot({}, Object.freeze({
        __proto__: null,
        Express: Ai,
        Postgres: $i,
        Mysql: Bi,
        Mongo: Ri
    })), {
        BrowserTracing: Oi
    });
    (_i = In()).g && (_i.g.extensions = _i.g.extensions || {},
    _i.g.extensions.startTransaction || (_i.g.extensions.startTransaction = li),
    _i.g.extensions.traceHeaders || (_i.g.extensions.traceHeaders = ai)),
    lt() && function() {
        var t = In();
        if (t.g) {
            var n = {
                mongodb: function() {
                    return new (ft(module, "./integrations/node/mongo").Mongo)
                },
                mongoose: function() {
                    return new (ft(module, "./integrations/node/mongo").Mongo)({
                        mongoose: !0
                    })
                },
                mysql: function() {
                    return new (ft(module, "./integrations/node/mysql").Mysql)
                },
                pg: function() {
                    return new (ft(module, "./integrations/node/postgres").Postgres)
                }
            }
              , e = Object.keys(n).filter((function(t) {
                return !!dt(t)
            }
            )).map((function(t) {
                try {
                    return n[t]()
                } catch (t) {
                    return
                }
            }
            )).filter((function(t) {
                return t
            }
            ));
            e.length > 0 && (t.g.integrations = ct(t.g.integrations || [], e))
        }
    }(),
    un({
        callback: ei,
        type: "error"
    }),
    un({
        callback: ei,
        type: "unhandledrejection"
    });
    const Gi = "yoopu.me"
      , zi = "yopu.co";
    function Pi(t) {
        return function(t) {
            return /^((?!chrome|android).)*safari/i.test(t)
        }(t) || /iphone|ipod|ipad/i.test(t)
    }
    function qi(t) {
        return /(miniProgram|MMWEBSDK)/i.test(t)
    }
    function Li(t) {
        return /ToutiaoMicroApp/i.test(t)
    }
    const Hi = "prod"
      , Ui = "staging"
      , Ji = "dev"
      , Wi = function() {
        if ([zi, Gi].includes(location.hostname))
            return "18080" === location.port ? Ui : Hi;
        return Ji
    }()
      , Vi = t("Analytics");
    function Ki(t) {
        const n = [];
        var e;
        return Wi === Hi && (n.push(function(t, n) {
            function e() {
                window.dataLayer.push(arguments)
            }
            Vi("Initializing Google Analytics: " + t),
            window.dataLayer = window.dataLayer || [],
            e("js", new Date),
            e("set", "allow_google_signals", !1),
            e("set", "allow_ad_personalization_signals", !1),
            e("config", t, {
                send_page_view: !1,
                debug_mode: Wi !== Hi
            });
            const [r,o] = function(t) {
                const n = {}
                  , e = l.getItem(s);
                n.instrument = e || "unselected";
                let r = "web_app";
                t.isAndroid() ? r = t.getSourceAppStore() || "unknown_android_store" : t.isIos() ? r = "apple" : qi(navigator.userAgent) ? r = "wechat_mini_program" : Li(navigator.userAgent) && (r = "douyin_mini_program");
                n.app_store = r;
                const o = l.getJson(i);
                let u = o ? o.userCode : null;
                o && (n.is_member = o.isMember ? "yes" : "no");
                return [u, n]
            }(n);
            r && e("set", {
                user_id: r
            });
            Object.keys(o).length > 0 && e("set", {
                user_properties: o
            });
            return e("event", "page_view"),
            window.gtag = e,
            "https://www.googletagmanager.com/gtag/js?id=" + t
        }("G-8RWGD73K0X", t)),
        !t.hasNative() && (!qi(e = navigator.userAgent) && Li(e))),
        n
    }
    function Yi(t) {
        Ln(t)
    }
    function Zi(t, n={}) {
        if (window.gtag) {
            const e = {}
              , i = h();
            return i.iVersion && (e.iVersion = i.iVersion),
            i.aVersion && (e.aVersion = i.aVersion),
            n.label && (e.event_label = n.label),
            n.category && (e.event_category = n.category),
            n.value && (e.value = n.value),
            window.gtag("event", t, e),
            void Vi(t, e)
        }
        Vi(t, n)
    }
    function Qi(t) {
        return new Promise(( (n, e) => {
            t.oncomplete = t.onsuccess = () => n(t.result),
            t.onabort = t.onerror = () => e(t.error)
        }
        ))
    }
    let tr;
    function nr() {
        return tr || (tr = function(t, n) {
            const e = indexedDB.open(t);
            e.onupgradeneeded = () => e.result.createObjectStore(n);
            const i = Qi(e);
            return (t, e) => i.then((i => e(i.transaction(n, t).objectStore(n))))
        }("keyval-store", "keyval")),
        tr
    }
    let er = !1;
    ar().catch(( () => {}
    ));
    const ir = "sheet-data:"
      , rr = "sheet-settings:id:"
      , or = "sheet-rating:id:";
    async function sr(t, n) {
        if (cr())
            try {
                await ar(),
                null == n ? await function(t, n=nr()) {
                    return n("readwrite", (n => (n.delete(t),
                    Qi(n.transaction))))
                }(t) : await function(t, n, e=nr()) {
                    return e("readwrite", (e => (e.put(n, t),
                    Qi(e.transaction))))
                }(t, n)
            } catch (t) {
                self.captureException && self.captureException(t)
            }
    }
    async function ur(t) {
        if (!cr())
            return null;
        try {
            return await ar(),
            function(t, n=nr()) {
                return n("readonly", (n => Qi(n.get(t))))
            }(t)
        } catch (t) {
            return self.captureException && self.captureException(t),
            null
        }
    }
    async function ar() {
        var t;
        if (!er && cr())
            try {
                await (!navigator.userAgentData && /Safari\//.test(navigator.userAgent) && !/Chrom(e|ium)\//.test(navigator.userAgent) && indexedDB.databases ? new Promise((function(n) {
                    var e = function() {
                        return indexedDB.databases().finally(n)
                    };
                    t = setInterval(e, 100),
                    e()
                }
                )).finally((function() {
                    return clearInterval(t)
                }
                )) : Promise.resolve()),
                er = !0
            } catch (t) {}
    }
    function cr() {
        return !!window.indexedDB
    }
    const lr = document
      , fr = lr.body;
    function dr(t) {
        return lr.querySelector(t)
    }
    function hr(t, n) {
        return t.querySelector(n)
    }
    function vr(t, n) {
        const e = t.querySelectorAll(n);
        return Array.prototype.slice.call(e)
    }
    function pr(t, n, ...e) {
        const i = lr.createElement(t);
        if (n)
            for (const t in n)
                if (n.hasOwnProperty(t)) {
                    const e = n[t];
                    i.setAttribute(t, e)
                }
        return e && e.length > 0 && e.forEach((t => yr(i, t))),
        i
    }
    function mr(t, n) {
        !function(t, n, e) {
            t.classList.toggle(n, e)
        }(fr, t, n)
    }
    function yr(t, n) {
        t.classList.add(n)
    }
    function gr(t, n) {
        t.classList.remove(n)
    }
    function br(t, n) {
        self.customElements.define(t, n)
    }
    const wr = 36e5
      , xr = 24 * wr
      , kr = 30 * xr
      , Er = {
        SECOND: 1e3,
        MINUTE: 6e4,
        HOUR: wr,
        DAY: xr,
        WEEK: 6048e5,
        MONTH: kr,
        QUARTER: 7776e6,
        YEAR: 31536e6
    };
    class Xr {
        constructor() {
            this.P = []
        }
        add(t) {
            return this.P.push(t),
            () => {
                this.remove(t)
            }
        }
        remove(t) {
            const n = this.P.indexOf(t);
            n > -1 && this.P.splice(n, 1)
        }
        removeAll() {
            this.P.length = 0
        }
        fire(...t) {
            return Promise.all(this.P.map((n => Promise.resolve(n(...t)))))
        }
        getHandlerCount() {
            return this.P.length
        }
    }
    class Sr extends Error {
        constructor(t) {
            super(t),
            this.name = "TimeoutError"
        }
    }
    class Tr extends Error {
        constructor(t) {
            super(t),
            this.name = "CancellationError"
        }
    }
    class Cr extends Error {
        constructor(t, n="") {
            super(n),
            this.name = "HttpError " + t,
            this.statusCode = t
        }
    }
    const jr = "TIMEOUT"
      , Or = "CANCELLATION"
      , Ar = new Xr
      , Dr = new Xr
      , Mr = new Xr;
    function _r(t, n, e={}) {
        return Br(t, n, {
            ...e,
            format: null
        })
    }
    function $r(t, n) {
        return _r(t, function(t, n="POST") {
            return {
                method: n,
                body: JSON.stringify(t),
                headers: {
                    "Content-Type": "application/json"
                }
            }
        }(n, "PUT"))
    }
    function Br(t, n, e) {
        const i = function(t, n, e={}) {
            Ar.fire({
                url: t,
                init: n,
                options: e
            });
            const {timeout: i=30 * Er.SECOND, format: r} = e;
            let o;
            function s(t) {
                o && !o.signal.aborted && o.abort(t)
            }
            self.AbortController && (o = new AbortController,
            n = {
                ...n,
                signal: o.signal
            });
            let u = null;
            function a() {
                c = !0,
                u && (clearTimeout(u),
                u = null)
            }
            i && (u = setTimeout(( () => s(jr)), i));
            let c = !1;
            const l = fetch(t, Object.assign({
                credentials: "include"
            }, n)).then((t => (a(),
            t.ok ? !r || t[r]() : t.text().then((n => Promise.reject(new Cr(t.status,n))))))).then((i => (i = "arrayBuffer" === r ? new Uint8Array(i) : i,
            Dr.fire({
                url: t,
                init: n,
                options: e,
                res: i
            }),
            i))).catch((i => {
                if (a(),
                "AbortError" === i.name) {
                    const {reason: n} = o.signal;
                    n === jr ? i = new Sr(t) : n === Or && (i = new Tr(t))
                }
                return Mr.fire({
                    url: t,
                    init: n,
                    options: e,
                    error: i
                }),
                Promise.reject(i)
            }
            ));
            return l.cancel = () => {
                c || s(Or)
            }
            ,
            l
        }(t, n, e)
          , r = i.catch((t => t instanceof Cr || t instanceof Tr || t instanceof Sr ? !!e.format && null : Promise.reject(t)));
        return r.cancel = i.cancel,
        r
    }
    const Fr = t("Event");
    let Ir = null;
    const Rr = "scroll";
    function Nr(t, n, e) {
        return t.addEventListener(n, e, !!function() {
            if (null != Ir)
                return Ir;
            try {
                const t = Object.defineProperty({}, "passive", {
                    get: function() {
                        Ir = !0
                    }
                });
                window.addEventListener("testPassive", null, t),
                window.removeEventListener("testPassive", null, t)
            } catch (t) {}
            Ir || Fr("Passive event not supported.");
            return Ir
        }() && {
            passive: !0
        }),
        () => t.removeEventListener(n, e)
    }
    function Gr(t, n, e) {
        return new Promise(( (i, r) => {
            const o = r => {
                e && !e(r) || (t.removeEventListener(n, o),
                i())
            }
            ;
            t.addEventListener(n, o)
        }
        ))
    }
    function zr(t, n, e) {
        return t.addEventListener(n, e),
        () => t.removeEventListener(n, e)
    }
    async function Pr() {
        "complete" !== document.readyState && await Gr(window, "load")
    }
    async function qr() {
        "loading" === document.readyState && await Gr(document, "DOMContentLoaded")
    }
    const Lr = {}
      , Hr = "hexi"
      , Ur = ["AWSC"];
    async function Jr(t) {
        return Lr[t] || (Lr[t] = new Promise((n => {
            self[t] ? n(Wr(t)) : n(function(t) {
                return Gr(dr(`script[data-name=${t}]`), "load")
            }(t).then(( () => Wr(t))))
        }
        ))),
        Lr[t]
    }
    function Wr(t) {
        const n = self[t];
        return Ur.indexOf(t) < 0 && delete self[t],
        n
    }
    class Vr {
        constructor() {
            let t, n;
            this.promise = new Promise(( (e, i) => {
                t = e,
                n = i
            }
            )),
            this.resolve = t,
            this.reject = n
        }
    }
    function Kr(t, n=2) {
        let e = String(t);
        for (let t = e.length; t < n; ++t)
            e = "0" + e;
        return e
    }
    function Yr(t) {
        return t.replace(/\[(.*)]\((.*)\)/g, '<a href="$2" target="_blank">$1</a>')
    }
    function Zr(t, n) {
        if (!t)
            throw new Error(n)
    }
    function Qr(t) {
        let n = null;
        const e = new Promise((e => {
            n = setTimeout(e, t)
        }
        ));
        return e.cancel = () => {
            n && (clearTimeout(n),
            n = null)
        }
        ,
        e
    }
    const to = t("Toast")
      , no = "center"
      , eo = "bottom"
      , io = "default"
      , ro = "awesome"
      , oo = "warn"
      , so = "error"
      , uo = "yp-toast"
      , ao = 8 * Er.SECOND
      , co = 5 * Er.SECOND
      , lo = function() {
        let t = dr("#yp-toast");
        t || (t = pr("div", {
            id: uo
        }),
        t.innerHTML = '\n<div class="message"></div>\n<div class="right">\n  <button action></button>\n</div>\n    ',
        document.body.appendChild(t));
        return t
    }();
    let fo;
    class ho {
        static error(t, n) {
            return vo(so, eo, t, n)
        }
        static warn(t, n) {
            return vo(oo, eo, t, n)
        }
        static awesome(t, n) {
            return vo(ro, eo, t, n)
        }
        static show(t, n) {
            return vo(io, eo, t, n)
        }
        static center(t) {
            return vo(io, no, t)
        }
    }
    async function vo(t, n, e, i) {
        to(e),
        await Qr(0),
        hr(lo, ".message").innerHTML = Yr(e);
        const r = hr(lo, "button[action]");
        i ? (gr(r, "hide"),
        r.textContent = i) : yr(r, "hide"),
        lo.setAttribute("level", t),
        lo.setAttribute("position", n),
        yr(lo, "show");
        const o = new Vr;
        fo && fo.cancel(),
        fo = Qr(i ? ao : co);
        const s = () => {
            u(!1)
        }
        ;
        function u(t) {
            gr(lo, "show"),
            fo && (fo.cancel(),
            fo = null),
            o.resolve(t),
            document.body.removeEventListener("click", s)
        }
        return document.body.addEventListener("click", s),
        fo.then(( () => u(!1))),
        r.onclick = () => u(!0),
        o.promise
    }
    function po(t) {
        return JSON.stringify({
            itemList: t
        })
    }
    function mo({submissionTime: t, reviewTime: n}={}) {
        return t && (n || 0) < t
    }
    function yo(t) {
        const n = t.length
          , e = new ko(n);
        e.skip(n);
        for (let i = 1; i < n; i++)
            e.prev(),
            bo(t, i, e.value)
    }
    function go(t) {
        const n = decodeURIComponent(function(t) {
            const n = t.split("");
            return yo(n),
            n.join("")
        }(t));
        try {
            return JSON.parse(n)
        } catch (t) {
            return null
        }
    }
    function bo(t, n, e) {
        const i = e * (n + 1) | 0;
        [t[n],t[i]] = [t[i], t[n]]
    }
    const wo = 601
      , xo = 65536;
    class ko {
        constructor(t=1) {
            this.x = Xo(t, xo)
        }
        get value() {
            return this.x / xo
        }
        next() {
            this.x = Xo(wo * this.x + 11, xo)
        }
        prev() {
            this.x = Xo(9705 * (this.x - 11), xo)
        }
        skip(t) {
            const n = (Eo(wo, t, wo * xo - xo) - 1) / 600 * 11
              , e = Eo(wo, t, xo) * this.x;
            this.x = Xo(n + e, xo)
        }
    }
    function Eo(t, n, e) {
        let i = 1
          , r = t = Xo(t, e);
        for (; n > 0; ) {
            const t = Xo(n, 2);
            n = n / 2 | 0,
            1 === t && (i = Xo(i * r, e)),
            r = Xo(r * r, e)
        }
        return i
    }
    function Xo(t, n) {
        const e = t % n;
        return e < 0 ? e + n : e
    }
    async function So(t, n, e, i=!1) {
        let r = 24 === t.length ? d(U, {
            id: t,
            v: n,
            instrument: e || void 0
        }) : d(H, {
            code: t,
            v: n,
            instrument: e || void 0,
            screen: jo()
        });
        const o = h().synd;
        return o && (r += `&synd=${o}`),
        1 === n ? await async function(t) {
            const n = await function(t, n, e={}) {
                return Br(t, n, {
                    ...e,
                    format: "text"
                })
            }(t);
            if (!n)
                return null;
            return go(n)
        }(r) : 2 === n ? await async function(t, n, e) {
            const i = ir + n
              , r = e ? null : await ur(i).catch(( () => null))
              , o = function(t, n, e={}) {
                return Br(t, n, {
                    ...e,
                    format: "arrayBuffer"
                })
            }(t, null, {
                silent: !!r
            });
            o.then((t => {
                t && (cr() ? sr(i, t).then(( () => async function(t) {
                    await sr(rr + t, null),
                    await sr(or + t, null)
                }(n))) : Zi("idb-not-supported"))
            }
            ));
            let s = r;
            s || (s = await o);
            if (!s)
                return null;
            const u = await Co(s);
            r && await async function(t) {
                const n = await async function(t) {
                    const n = await ur(t);
                    try {
                        return null == n ? null : JSON.parse(n)
                    } catch (t) {
                        return null
                    }
                }(rr + t.id);
                null != n && (t.settings = n);
                const e = await ur(or + t.id);
                null != e && (t.userRating = e)
            }(u);
            return u
        }(r, t, i) : void 0
    }
    function To(t, n, e, i) {
        const r = function(t, n) {
            const e = new FormData;
            for (const t in n)
                if (n.hasOwnProperty(t)) {
                    const i = n[t];
                    null != i && e.append(t, i)
                }
            return Br(t, {
                method: "POST",
                body: e
            }, {
                format: "arrayBuffer"
            })
        }(U, {
            updates: JSON.stringify(t),
            file: n,
            token: e,
            fromSheet: i
        })
          , o = r.then((async t => {
            if (!t)
                return null;
            const n = await Co(t);
            return await sr(ir + n.id, t),
            n.sheetCode && await sr(ir + n.sheetCode, null),
            n
        }
        ));
        return o.cancel = r.cancel,
        o
    }
    async function Co(t) {
        const n = function(t) {
            const n = new Uint8Array(t.length);
            return n.set(t),
            n
        }(t);
        yo(n);
        const e = await Jr("ar")
          , i = (new TextDecoder).decode(e(n));
        return JSON.parse(i)
    }
    function jo() {
        const t = screen.width;
        return t <= 600 ? 0 : t <= 1024 ? 1 : 2
    }
    const Oo = 401
      , Ao = "admin"
      , Do = "member"
      , Mo = "top-author"
      , _o = "top-player";
    function $o() {
        var t;
        Bo(null),
        void 0 !== (t = null) && l.setJson(r, t)
    }
    function Bo(t) {
        void 0 !== t && l.setJson(i, t)
    }
    function Fo() {}
    const Io = t => t;
    function Ro(t) {
        return t()
    }
    function No() {
        return Object.create(null)
    }
    function Go(t) {
        t.forEach(Ro)
    }
    function zo(t) {
        return "function" == typeof t
    }
    function Po(t, n) {
        return t != t ? n == n : t !== n || t && "object" == typeof t || "function" == typeof t
    }
    function qo(t, n, e) {
        t.$$.on_destroy.push(function(t, ...n) {
            if (null == t)
                return Fo;
            const e = t.subscribe(...n);
            return e.unsubscribe ? () => e.unsubscribe() : e
        }(n, e))
    }
    function Lo(t, n, e, i) {
        if (t) {
            const r = Ho(t, n, e, i);
            return t[0](r)
        }
    }
    function Ho(t, n, e, i) {
        return t[1] && i ? function(t, n) {
            for (const e in n)
                t[e] = n[e];
            return t
        }(e.ctx.slice(), t[1](i(n))) : e.ctx
    }
    function Uo(t, n, e, i, r, o, s) {
        const u = function(t, n, e, i) {
            if (t[2] && i) {
                const r = t[2](i(e));
                if (void 0 === n.dirty)
                    return r;
                if ("object" == typeof r) {
                    const t = []
                      , e = Math.max(n.dirty.length, r.length);
                    for (let i = 0; i < e; i += 1)
                        t[i] = n.dirty[i] | r[i];
                    return t
                }
                return n.dirty | r
            }
            return n.dirty
        }(n, i, r, o);
        if (u) {
            const r = Ho(n, e, i, s);
            t.p(r, u)
        }
    }
    const Jo = "undefined" != typeof window;
    let Wo = Jo ? () => window.performance.now() : () => Date.now()
      , Vo = Jo ? t => requestAnimationFrame(t) : Fo;
    const Ko = new Set;
    function Yo(t) {
        Ko.forEach((n => {
            n.c(t) || (Ko.delete(n),
            n.f())
        }
        )),
        0 !== Ko.size && Vo(Yo)
    }
    function Zo(t) {
        let n;
        return 0 === Ko.size && Vo(Yo),
        {
            promise: new Promise((e => {
                Ko.add(n = {
                    c: t,
                    f: e
                })
            }
            )),
            abort() {
                Ko.delete(n)
            }
        }
    }
    function Qo(t, n) {
        t.appendChild(n)
    }
    function ts(t, n, e) {
        t.insertBefore(n, e || null)
    }
    function ns(t) {
        t.parentNode.removeChild(t)
    }
    function es(t, n) {
        for (let e = 0; e < t.length; e += 1)
            t[e] && t[e].d(n)
    }
    function is(t) {
        return document.createElement(t)
    }
    function rs(t) {
        return document.createTextNode(t)
    }
    function os() {
        return rs(" ")
    }
    function ss() {
        return rs("")
    }
    function us(t, n, e, i) {
        return t.addEventListener(n, e, i),
        () => t.removeEventListener(n, e, i)
    }
    function as(t, n, e) {
        null == e ? t.removeAttribute(n) : t.getAttribute(n) !== e && t.setAttribute(n, e)
    }
    function cs(t, n, e) {
        n in t ? t[n] = e : as(t, n, e)
    }
    function ls(t) {
        return "" === t ? null : +t
    }
    function fs(t, n) {
        n = "" + n,
        t.wholeText !== n && (t.data = n)
    }
    function ds(t, n) {
        t.value = null == n ? "" : n
    }
    function hs(t, n, e) {
        t.classList[e ? "add" : "remove"](n)
    }
    function vs(t, n) {
        const e = document.createEvent("CustomEvent");
        return e.initCustomEvent(t, !1, !1, n),
        e
    }
    const ps = new Set;
    let ms, ys = 0;
    function gs(t, n, e, i, r, o, s, u=0) {
        const a = 16.666 / i;
        let c = "{\n";
        for (let t = 0; t <= 1; t += a) {
            const i = n + (e - n) * o(t);
            c += 100 * t + `%{${s(i, 1 - i)}}\n`
        }
        const l = c + `100% {${s(e, 1 - e)}}\n}`
          , f = `__svelte_${function(t) {
            letn = 5381
              , e = t.length;
            for (; e--; )
                n = (n << 5) - n ^ t.charCodeAt(e);
            return n >>> 0
        }(l)}_${u}`
          , d = t.ownerDocument;
        ps.add(d);
        const h = d.__svelte_stylesheet || (d.__svelte_stylesheet = d.head.appendChild(is("style")).sheet)
          , v = d.__svelte_rules || (d.__svelte_rules = {});
        v[f] || (v[f] = !0,
        h.insertRule(`@keyframes ${f} ${l}`, h.cssRules.length));
        const p = t.style.animation || "";
        return t.style.animation = `${p ? `${p}, ` : ""}${f} ${i}ms linear ${r}ms 1 both`,
        ys += 1,
        f
    }
    function bs(t, n) {
        const e = (t.style.animation || "").split(", ")
          , i = e.filter(n ? t => t.indexOf(n) < 0 : t => -1 === t.indexOf("__svelte"))
          , r = e.length - i.length;
        r && (t.style.animation = i.join(", "),
        ys -= r,
        ys || Vo(( () => {
            ys || (ps.forEach((t => {
                const n = t.__svelte_stylesheet;
                let e = n.cssRules.length;
                for (; e--; )
                    n.deleteRule(e);
                t.__svelte_rules = {}
            }
            )),
            ps.clear())
        }
        )))
    }
    function ws(t) {
        ms = t
    }
    function xs() {
        if (!ms)
            throw new Error("Function called outside component initialization");
        return ms
    }
    function ks(t) {
        xs().$$.on_mount.push(t)
    }
    function Es() {
        const t = xs();
        return (n, e) => {
            const i = t.$$.callbacks[n];
            if (i) {
                const r = vs(n, e);
                i.slice().forEach((n => {
                    n.call(t, r)
                }
                ))
            }
        }
    }
    function Xs(t, n) {
        const e = t.$$.callbacks[n.type];
        e && e.slice().forEach((t => t(n)))
    }
    const Ss = []
      , Ts = []
      , Cs = []
      , js = []
      , Os = Promise.resolve();
    let As = !1;
    function Ds(t) {
        Cs.push(t)
    }
    function Ms(t) {
        js.push(t)
    }
    let _s = !1;
    const $s = new Set;
    function Bs() {
        if (!_s) {
            _s = !0;
            do {
                for (let t = 0; t < Ss.length; t += 1) {
                    const n = Ss[t];
                    ws(n),
                    Fs(n.$$)
                }
                for (ws(null),
                Ss.length = 0; Ts.length; )
                    Ts.pop()();
                for (let t = 0; t < Cs.length; t += 1) {
                    const n = Cs[t];
                    $s.has(n) || ($s.add(n),
                    n())
                }
                Cs.length = 0
            } while (Ss.length);
            for (; js.length; )
                js.pop()();
            As = !1,
            _s = !1,
            $s.clear()
        }
    }
    function Fs(t) {
        if (null !== t.fragment) {
            t.update(),
            Go(t.before_update);
            const n = t.dirty;
            t.dirty = [-1],
            t.fragment && t.fragment.p(t.ctx, n),
            t.after_update.forEach(Ds)
        }
    }
    let Is;
    function Rs() {
        return Is || (Is = Promise.resolve(),
        Is.then(( () => {
            Is = null
        }
        ))),
        Is
    }
    function Ns(t, n, e) {
        t.dispatchEvent(vs(`${n ? "intro" : "outro"}${e}`))
    }
    const Gs = new Set;
    let zs;
    function Ps() {
        zs = {
            r: 0,
            c: [],
            p: zs
        }
    }
    function qs() {
        zs.r || Go(zs.c),
        zs = zs.p
    }
    function Ls(t, n) {
        t && t.i && (Gs.delete(t),
        t.i(n))
    }
    function Hs(t, n, e, i) {
        if (t && t.o) {
            if (Gs.has(t))
                return;
            Gs.add(t),
            zs.c.push(( () => {
                Gs.delete(t),
                i && (e && t.d(1),
                i())
            }
            )),
            t.o(n)
        }
    }
    const Us = {
        duration: 0
    };
    function Js(t, n, e) {
        let i, r, o = n(t, e), s = !1, u = 0;
        function a() {
            i && bs(t, i)
        }
        function c() {
            const {delay: n=0, duration: e=300, easing: c=Io, tick: l=Fo, css: f} = o || Us;
            f && (i = gs(t, 0, 1, e, n, c, f, u++)),
            l(0, 1);
            const d = Wo() + n
              , h = d + e;
            r && r.abort(),
            s = !0,
            Ds(( () => Ns(t, !0, "start"))),
            r = Zo((n => {
                if (s) {
                    if (n >= h)
                        return l(1, 0),
                        Ns(t, !0, "end"),
                        a(),
                        s = !1;
                    if (n >= d) {
                        const t = c((n - d) / e);
                        l(t, 1 - t)
                    }
                }
                return s
            }
            ))
        }
        let l = !1;
        return {
            start() {
                l || (bs(t),
                zo(o) ? (o = o(),
                Rs().then(c)) : c())
            },
            invalidate() {
                l = !1
            },
            end() {
                s && (a(),
                s = !1)
            }
        }
    }
    function Ws(t, n, e) {
        let i, r = n(t, e), o = !0;
        const s = zs;
        function u() {
            const {delay: n=0, duration: e=300, easing: u=Io, tick: a=Fo, css: c} = r || Us;
            c && (i = gs(t, 1, 0, e, n, u, c));
            const l = Wo() + n
              , f = l + e;
            Ds(( () => Ns(t, !1, "start"))),
            Zo((n => {
                if (o) {
                    if (n >= f)
                        return a(0, 1),
                        Ns(t, !1, "end"),
                        --s.r || Go(s.c),
                        !1;
                    if (n >= l) {
                        const t = u((n - l) / e);
                        a(1 - t, t)
                    }
                }
                return o
            }
            ))
        }
        return s.r += 1,
        zo(r) ? Rs().then(( () => {
            r = r(),
            u()
        }
        )) : u(),
        {
            end(n) {
                n && r.tick && r.tick(1, 0),
                o && (i && bs(t, i),
                o = !1)
            }
        }
    }
    const Vs = "undefined" != typeof window ? window : "undefined" != typeof globalThis ? globalThis : global;
    function Ks(t, n, e) {
        const i = t.$$.props[n];
        void 0 !== i && (t.$$.bound[i] = e,
        e(t.$$.ctx[i]))
    }
    function Ys(t) {
        t && t.c()
    }
    function Zs(t, n, e, i) {
        const {fragment: r, on_mount: o, on_destroy: s, after_update: u} = t.$$;
        r && r.m(n, e),
        i || Ds(( () => {
            const n = o.map(Ro).filter(zo);
            s ? s.push(...n) : Go(n),
            t.$$.on_mount = []
        }
        )),
        u.forEach(Ds)
    }
    function Qs(t, n) {
        const e = t.$$;
        null !== e.fragment && (Go(e.on_destroy),
        e.fragment && e.fragment.d(n),
        e.on_destroy = e.fragment = null,
        e.ctx = [])
    }
    function tu(t, n) {
        -1 === t.$$.dirty[0] && (Ss.push(t),
        As || (As = !0,
        Os.then(Bs)),
        t.$$.dirty.fill(0)),
        t.$$.dirty[n / 31 | 0] |= 1 << n % 31
    }
    function nu(t, n, e, i, r, o, s=[-1]) {
        const u = ms;
        ws(t);
        const a = t.$$ = {
            fragment: null,
            ctx: null,
            props: o,
            update: Fo,
            not_equal: r,
            bound: No(),
            on_mount: [],
            on_destroy: [],
            on_disconnect: [],
            before_update: [],
            after_update: [],
            context: new Map(u ? u.$$.context : n.context || []),
            callbacks: No(),
            dirty: s,
            skip_bound: !1
        };
        let c = !1;
        if (a.ctx = e ? e(t, n.props || {}, ( (n, e, ...i) => {
            const o = i.length ? i[0] : e;
            return a.ctx && r(a.ctx[n], a.ctx[n] = o) && (!a.skip_bound && a.bound[n] && a.bound[n](o),
            c && tu(t, n)),
            e
        }
        )) : [],
        a.update(),
        c = !0,
        Go(a.before_update),
        a.fragment = !!i && i(a.ctx),
        n.target) {
            if (n.hydrate) {
                const t = function(t) {
                    return Array.from(t.childNodes)
                }(n.target);
                a.fragment && a.fragment.l(t),
                t.forEach(ns)
            } else
                a.fragment && a.fragment.c();
            n.intro && Ls(t.$$.fragment),
            Zs(t, n.target, n.anchor, n.customElement),
            Bs()
        }
        ws(u)
    }
    class eu {
        $destroy() {
            Qs(this, 1),
            this.$destroy = Fo
        }
        $on(t, n) {
            const e = this.$$.callbacks[t] || (this.$$.callbacks[t] = []);
            return e.push(n),
            () => {
                const t = e.indexOf(n);
                -1 !== t && e.splice(t, 1)
            }
        }
        $set(t) {
            var n;
            this.$$set && (n = t,
            0 !== Object.keys(n).length) && (this.$$.skip_bound = !0,
            this.$$set(t),
            this.$$.skip_bound = !1)
        }
    }
    const iu = [];
    function ru(t, n) {
        return {
            subscribe: ou(t, n).subscribe
        }
    }
    function ou(t, n=Fo) {
        let e;
        const i = [];
        function r(n) {
            if (Po(t, n) && (t = n,
            e)) {
                const n = !iu.length;
                for (let n = 0; n < i.length; n += 1) {
                    const e = i[n];
                    e[1](),
                    iu.push(e, t)
                }
                if (n) {
                    for (let t = 0; t < iu.length; t += 2)
                        iu[t][0](iu[t + 1]);
                    iu.length = 0
                }
            }
        }
        return {
            set: r,
            update: function(n) {
                r(n(t))
            },
            subscribe: function(o, s=Fo) {
                const u = [o, s];
                return i.push(u),
                1 === i.length && (e = n(r) || Fo),
                o(t),
                () => {
                    const t = i.indexOf(u);
                    -1 !== t && i.splice(t, 1),
                    0 === i.length && (e(),
                    e = null)
                }
            }
        }
    }
    const su = t("Fullscreen");
    const uu = "https://cdn.yopu.co/img/default-avatar.9190c675.svg"
      , au = "https://cdn.yopu.co/img/logo.bd260b19.svg"
      , cu = "//cdn.yopu.co/font/iconfont.b37bd39f.woff2"
      , lu = "//cdn.yopu.co/font/iconfont-deprecated.4439586a.woff"
      , fu = "//cdn.yopu.co/font/iconfont.daa4584d.ttf"
      , du = "#faf9f9"
      , hu = "WebView"
      , vu = t(hu)
      , pu = n(hu)
      , mu = "more"
      , yu = "default"
      , gu = "light"
      , bu = "dark"
      , wu = "portrait"
      , xu = "landscape"
      , ku = screen && screen.orientation && screen.orientation.lock
      , Eu = "已将分享内容复制到了剪贴板";
    class Xu {
        constructor() {
            this.q = new Xr,
            this.U = new Xr,
            this.J = new Xr,
            this.V = 0,
            this.K = {}
        }
        install(t) {
            if (this.Y = t,
            t.webview = {
                trackEvent: Zi,
                pause: () => {
                    this.q.fire()
                }
                ,
                resume: t => {
                    this.U.fire(t)
                }
                ,
                destroy: () => {
                    this.J.fire()
                }
                ,
                onDataResponse: (t, n) => {
                    this.K[t] && this.K[t].resolve(n)
                }
            },
            !this.hasNative()) {
                const n = t.document;
                n.addEventListener("visibilitychange", ( () => {
                    n.hidden ? t.webview.pause() : t.webview.resume()
                }
                ), !1)
            }
            setTimeout(( () => {
                this.nt("start") || this.et("start") || vu("webview based app started")
            }
            ), 1)
        }
        isSupported(t) {
            vu("isSupported", t);
            let n = this.it();
            if (n)
                return n.isSupported ? n.isSupported(t) : !!n[t];
            if (n = this.rt(),
            n) {
                let n = this.Y.iosNativeApi;
                return n || (n = h().api,
                n = n ? n.split(",") : []),
                n = n.concat("exit", "openAppStore"),
                n.indexOf(t) >= 0
            }
            return "lockScreenOrientation" === t ? ku : 0 !== t.indexOf("request") && (!["openWeComKefu", "setColorMode"].includes(t) && !!this[t])
        }
        isSharingSupported(t) {
            vu("isSharingSupported", t);
            let n = this.it();
            if (n)
                return !!n.isSharingSupported && n.isSharingSupported(t);
            if (n = this.rt(),
            n && this.Y.iosNativeData) {
                return (this.Y.iosNativeData.sharingSupported || []).indexOf(t) >= 0
            }
            return !1
        }
        replacePage(t) {
            vu("replacePage", {
                path: t
            }),
            this.isSupported("replacePage") ? this.et("replacePage", {
                path: t
            }) || this.nt("replacePage", t) || (history.replaceState(void 0, void 0, t),
            history.go(0)) : ho.error("请升级到最新版本app")
        }
        keepScreenOn(t) {
            vu("keepScreenOn", t),
            this.nt("keepScreenOn", t) || this.et("keepScreenOn", {
                enable: t
            })
        }
        async lockScreenOrientation(t) {
            vu("lockScreenOrientation", t),
            this.nt("lockScreenOrientation", t) || this.et("lockScreenOrientation", {
                orientation: t
            }) || ku && (t === wu ? await async function() {
                su("exitFullscreen"),
                (document.fullscreenElement || document.webkitFullscreenElement) && (document.exitFullscreen ? await document.exitFullscreen().catch(( () => {}
                )) : document.webkitExitFullscreen && await document.webkitExitFullscreen().catch(( () => {}
                )))
            }() : t === xu && await async function(t=document.documentElement) {
                su("requestFullscreen"),
                t.requestFullscreen ? await t.requestFullscreen().catch(( () => {}
                )) : t.webkitRequestFullscreen && await t.webkitRequestFullscreen().catch(( () => {}
                ))
            }(),
            screen.orientation.lock(t).catch(( () => {}
            )))
        }
        print() {
            vu("print"),
            this.nt("print") || this.et("print") || print()
        }
        getSystemInfo() {
            vu("getSystemInfo");
            const t = this.it();
            return t && t.getSystemInfo ? JSON.parse(t.getSystemInfo()) : this.rt() && this.Y.iosNativeData && this.Y.iosNativeData.systemInfo || []
        }
        getSourceAppStore() {
            vu("getSourceAppStore");
            const t = this.it();
            return t && t.getSourceAppStore ? t.getSourceAppStore() : null
        }
        openAppStore() {
            vu("openAppStore"),
            this.nt("openAppStore", "me.yoopu.app.songbook") || this.et("openAppStore", {
                appId: "973743727"
            })
        }
        openWeComKefu(t) {
            vu("openWeComKefu");
            const n = {
                url: t
            };
            this.nt("openWeComKefu", n) || this.et("openWeComKefu", n)
        }
        shareLink(t) {
            t.imageUrl = t.imageUrl || au,
            t.wxMicroAppPath = t.wxMicroAppPath || "",
            t.sharingMethod = t.sharingMethod || mu,
            vu("shareLink", t);
            const n = this.isSupported("shareLink") ? "shareLink" : "shareObjectTo";
            if (this.isIos())
                return void this.et(n, t);
            if (this.isAndroid())
                return t.sharingMethod === mu && this.isSupported("shareObject") ? void this.nt("shareObject", t) : void this.nt(n, t);
            const {text: e, pageUrl: i} = t;
            Su(e + ` ( ${i} )`)
        }
        copyToClipboard(t) {
            if (vu("copyToClipboard", t),
            this.isAndroid() && this.isSupported("copyToClipboard"))
                return this.nt("copyToClipboard", t),
                void ho.show(Eu);
            Su(t)
        }
        requestAuthToken(t) {
            return vu("requestAuthToken", t),
            this.ot("requestAuthToken", {
                type: t
            })
        }
        requestWxPay(t) {
            vu("requestWxPay", t),
            this.nt("requestWxPay", t)
        }
        requestApplePay(t) {
            vu("requestApplePay", t),
            this.et("requestApplePay", t)
        }
        requestAppleRestore() {
            vu("requestAppleRestore"),
            this.et("requestAppleRestore")
        }
        requestDeviceToken() {
            return vu("requestDeviceToken"),
            this.ot("requestDeviceToken")
        }
        requestMuteStatus() {
            return vu("requestMuteStatus"),
            this.ot("requestMuteStatus")
        }
        showInputKeyboard() {
            vu("showInputKeyboard"),
            this.nt("showInputKeyboard")
        }
        setColorMode(t) {
            const n = "setColorMode";
            vu(n + ": " + t),
            this.nt(n, t) || this.et(n, {
                colorMode: t
            })
        }
        getColorMode() {
            vu("getColorMode");
            let t = this.it();
            return t ? t.getColorMode ? t.getColorMode() : yu : (t = this.rt(),
            t && this.Y.iosNativeData && this.Y.iosNativeData.colorMode || yu)
        }
        setColors(t) {
            const n = "setColors"
              , e = {
                background: du,
                statusBar: du,
                ...t
            };
            vu(n, e),
            this.nt(n, e) || this.et(n, e)
        }
        saveValueIfNotExist(t, n) {
            const e = "saveValueIfNotExist";
            vu(e + ": " + t + "=" + n);
            const i = {
                key: t,
                value: n
            };
            this.nt(e, i) || this.et(e, i)
        }
        saveValue(t, n) {
            const e = "saveValue";
            vu(e + ": " + t + "=" + n);
            const i = {
                key: t,
                value: n
            };
            this.nt(e, i) || this.et(e, i)
        }
        readValue(t) {
            vu("readValue: " + t);
            let n = this.it();
            return n ? n.readValue ? n.readValue(t) : null : (n = this.rt(),
            n && this.Y.iosNativeData && this.Y.iosNativeData.values ? this.Y.iosNativeData.values[t] : null)
        }
        exit(t) {
            vu("exit"),
            this.nt("exit") || this.et("exit") || p(t)
        }
        kill() {
            vu("kill"),
            this.isSupported("kill") ? this.nt("kill") || this.et("kill") || (location.href = "/") : this.exit(!0)
        }
        reload() {
            vu("reload"),
            this.nt("reload") || this.et("reload") || location.reload()
        }
        onPause(t) {
            return this.q.add(t)
        }
        onResume(t) {
            return this.U.add(t)
        }
        onDestroy(t) {
            return this.J.add(t)
        }
        hasNative() {
            return !!this.it() || !!this.rt()
        }
        isAndroid() {
            return !!this.it()
        }
        isIos() {
            return !!this.rt()
        }
        it() {
            return this.Y.native
        }
        rt() {
            return this.Y.webkit && this.Y.webkit.messageHandlers && this.Y.webkit.messageHandlers.native
        }
        ot(t, n={}) {
            const e = this.V++
              , i = new Vr;
            return this.K[e] = i,
            n.messageChannelId = e,
            this.nt(t, n) || this.et(t, n) || vu(t, n),
            i.promise
        }
        nt(t, n) {
            const e = this.it();
            if (!e)
                return !1;
            if (e[t])
                try {
                    void 0 === n ? e[t]() : e[t]("object" == typeof n ? JSON.stringify(n) : n)
                } catch (t) {
                    pu(t)
                }
            return !0
        }
        et(t, n={}) {
            const e = this.rt();
            return !!e && (e.postMessage({
                action: t,
                data: n
            }),
            !0)
        }
    }
    function Su(t) {
        navigator.clipboard && navigator.clipboard.writeText(t).then(( () => {
            ho.show(Eu)
        }
        ), ( () => {
            ho.error("剪贴板获取失败，请尝试升级app")
        }
        ))
    }
    let Tu, Cu;
    function ju(t) {
        const n = t.isSupported("setColorMode");
        Cu = n ? function(t) {
            const n = t.getColorMode() || yu
              , {subscribe: e, set: i} = ou(n);
            return {
                subscribe: e,
                set: n => {
                    t.setColorMode(n),
                    i(n)
                }
            }
        }(t) : function() {
            const {subscribe: t, set: n} = ou(Ou());
            return {
                subscribe: t,
                set: t => {
                    t === yu ? l.removeItem(u) : l.setItem(u, t),
                    n(t)
                }
            }
        }(),
        Tu = n ? function() {
            const [t,n] = Du();
            return ru(t, (t => n ? n(t) : () => {}
            ))
        }() : function(t) {
            let[n,e] = Du()
              , i = Ou();
            return ru(n, (r => {
                Au(i, n, r);
                const o = t.subscribe((t => {
                    i = t,
                    Au(i, n, r)
                }
                ));
                let s;
                return e && (s = e((t => {
                    n = t,
                    Au(i, n, r)
                }
                ))),
                () => {
                    o(),
                    s && s()
                }
            }
            ))
        }(Cu)
    }
    function Ou() {
        return l.getItem(u) || yu
    }
    function Au(t, n, e) {
        t === yu ? e(n) : t === bu ? e(!0) : t === gu && e(!1)
    }
    function Du() {
        const t = window.matchMedia && window.matchMedia("screen and (prefers-color-scheme: dark)");
        return t && t.addEventListener ? [t.matches, n => {
            const e = t => n(t.matches);
            return t.addEventListener("change", e),
            () => {
                t.removeEventListener("change", e)
            }
        }
        ] : [!1, null, null]
    }
    const Mu = t("Fetch")
      , _u = self.document;
    let $u = 0;
    function Bu() {
        !function(t, n, e) {
            const i = Ar.add(t)
              , r = Dr.add(n)
              , o = Mr.add(e)
        }(( ({url: t, init: n, options: e}) => {
            Mu("request: " + t),
            e.silent || ($u++,
            Iu())
        }
        ), ( ({url: t, init: n, options: e, res: i}) => {
            Mu("response: " + t),
            e.silent || Fu()
        }
        ), ( ({url: t, init: n, options: e, error: i}) => {
            Mu("rejection: " + t, i);
            const {silent: r, allowNonLogin: o} = e;
            if (!r) {
                let t;
                i instanceof Tr || (i instanceof Sr ? t = "网络超时" : i instanceof Cr ? o && i.statusCode === Oo || (t = i.message) : t = "无网络连接"),
                t && ho.error(t),
                Fu()
            }
        }
        ))
    }
    function Fu() {
        $u--,
        Qr(300).then(( () => Iu()))
    }
    function Iu() {
        $u > 0 ? yr(_u.body, "loading") : gr(_u.body, "loading")
    }
    const Ru = {};
    const Nu = "check-client-staled"
      , Gu = "client-staled"
      , zu = t("SW")
      , Pu = n("SW")
      , qu = location.origin + "/"
      , Lu = "serviceWorker"in navigator ? navigator.serviceWorker : null
      , Hu = function() {
        if ("https:" !== location.protocol)
            return !1;
        if (location.search.indexOf("sw=1") > 0)
            return !0;
        return !Wu() && Vu() && !(0 === location.pathname.indexOf("/i/") || "/i" === location.pathname)
    }();
    let Uu;
    async function Ju() {
        if (!Lu)
            return !1;
        if (zu("SW enabled = " + Hu),
        "function" == typeof Lu.getRegistrations)
            try {
                const t = await Lu.getRegistrations();
                for (let n = 0; n < t.length; ++n)
                    Hu && t[n].scope === qu || (zu("Unregistering SW", {
                        scope: t[n].scope
                    }),
                    await t[n].unregister())
            } catch (t) {
                Pu("Failed to unregister existing service worker.", t)
            }
        return !!Hu && (await Pr(),
        zu("Registering SW...", {
            scope: qu
        }),
        await Lu.register("/sw.js"),
        zu("Registered SW", {
            scope: qu
        }),
        !Wu() && Vu() && function() {
            let t;
            const n = document.querySelector("#addToHomeScreen");
            if (!n)
                return;
            zu("initializeAddToHomePrompt"),
            window.addEventListener("beforeinstallprompt", (function(e) {
                zu("beforeinstallprompt event"),
                e.preventDefault(),
                t = e,
                n.classList.remove("hide")
            }
            )),
            window.addEventListener("appinstalled", (function() {
                zu("appinstalled event"),
                n.classList.add("hide")
            }
            )),
            self.addToHomeScreen = () => {
                zu("addToHomeScreen event"),
                t && t.prompt()
            }
        }(),
        !0)
    }
    function Wu() {
        return 0 === location.pathname.indexOf("/e/")
    }
    function Vu() {
        const t = [/Android/i, /iPhone/i, /iPad/i, /Windows Phone/i];
        for (let n = 0; n < t.length; ++n)
            if (navigator.userAgent.match(t[n]))
                return !0;
        return !1
    }
    const Ku = function() {
        const {subscribe: t, set: n} = ou(void 0)
          , e = E();
        e && n(e);
        return {
            subscribe: t,
            set: t => {
                (function(t) {
                    return X(t) ? (l.setItem(s, t),
                    t) : null
                }
                )(t) && n(t)
            }
        }
    }();
    const Yu = t("Application")
      , Zu = h()["no-tracking"];
    class Qu extends HTMLElement {
        connectedCallback() {
            const {chord: t, chordStyle: n, instrument: e, scale: i=1, dark: r} = this.dataset
              , o = this.textContent;
            let s;
            s = n === b && Object.values(m).includes(e) ? `<hexi-chord contenteditable='false' size='small' name='${t}' instrument='${e}' scale='${i}' ${r ? "dark" : ""}></hexi-chord>` : `<div class='chord' contenteditable='false'>${t[0]}<span class='chord-type'>${t.substring(1).replace(/@.*$/, "")}</span></div>`,
            this.innerHTML = s + `<div class="text" text-value>${o}</div>`
        }
    }
    class ta extends HTMLElement {
        connectedCallback() {
            const t = this.textContent;
            this.innerHTML = `<div text-value>${t}</div>`
        }
    }
    class na extends HTMLElement {
        connectedCallback() {
            const {noLineBreak: t} = this.dataset;
            this.innerHTML = t ? "" : "<br>"
        }
    }
    const ea = "i"
      , ia = "u"
      , ra = "d"
      , oa = {
        HEADLINE: "HEADLINE",
        TEXT: "TEXT",
        CHORD_ANCHOR: "CHORD_ANCHOR",
        LINE_BREAK: "LINE_BREAK",
        RHYTHM: "RHYTHM",
        TAB: "TAB"
    }
      , sa = ""
      , ua = " "
      , aa = "​"
      , ca = /\r\n|[\n\r\v\f\x85\u2028\u2029]/;
    function la(t) {
        return t = (t = t.replace(new RegExp(aa,"g"), sa)).replace(/\s/g, ua)
    }
    function fa(t, n, e) {
        t.push(...n.map((t => ({
            operation: ea,
            id: e,
            item: t
        }))))
    }
    function da(t) {
        return JSON.parse(JSON.stringify(t))
    }
    function ha(t) {
        return da(t).map((t => (delete t.id,
        t)))
    }
    function va(t, n) {
        return pa(t, n) === n
    }
    function pa(t, n) {
        for (let e = n; e >= 0; --e) {
            const n = t[e - 1];
            if (!n || n.type === oa.LINE_BREAK || ga(n))
                return e
        }
        return 0
    }
    function ma() {
        return {
            type: oa.LINE_BREAK
        }
    }
    function ya(t) {
        return {
            type: oa.TEXT,
            value: t
        }
    }
    function ga(t) {
        return t && [oa.HEADLINE, oa.RHYTHM, oa.TAB].includes(t.type)
    }
    function ba(t) {
        return t && [oa.CHORD_ANCHOR, oa.TEXT].includes(t.type)
    }
    function wa(t) {
        return t && [oa.CHORD_ANCHOR, oa.TEXT, oa.HEADLINE].includes(t.type)
    }
    function xa(t) {
        return t && t.type === oa.TEXT && !t.value
    }
    function ka(t) {
        return t && [oa.TAB, oa.RHYTHM].includes(t.type)
    }
    function Ea(t) {
        return ka(t) ? 1 : wa(t) ? t.value.length : 0
    }
    function Xa() {
        return [ya(sa), ma()]
    }
    const Sa = {
        [m.GUITAR]: 6,
        [m.UKULELE]: 4
    }
      , Ta = "<span text-value>​</span>";
    class Ca extends HTMLElement {
        static get observedAttributes() {
            return ["data-dark"]
        }
        attributeChangedCallback(t, n, e, i) {
            this.isConnected && this.st()
        }
        connectedCallback() {
            this.st()
        }
        st() {
            const {scale: t=1, instrument: n, rhythm: e, chordStyle: i, dark: r, forEditor: o} = this.dataset;
            let s = `<hexi-rhythm contenteditable='false' string-num="${i === w ? 0 : Sa[n] || 0}" scale="${t}" ${r ? "dark" : ""}>${e}</hexi-rhythm>`;
            o && (s = Ta + s + Ta),
            this.innerHTML = s
        }
    }
    const ja = "<span text-value>​</span>";
    class Oa extends HTMLElement {
        connectedCallback() {
            const {tab: t, scale: n, forEditor: e, dark: i} = this.dataset;
            let r = `<hexi-tab contenteditable='false' scale='${n}' inline-chords ${i ? "dark" : ""}>${t}</hexi-tab>`;
            e && (r = ja + r + ja),
            this.innerHTML = r
        }
    }
    const Aa = "text-value"
      , Da = "xhe-root";
    class Ma extends HTMLElement {
        connectedCallback() {
            this.setAttribute(Aa, "")
        }
    }
    const _a = n("XheRenderer")
      , $a = {
        [oa.TEXT]: "xhe-text",
        [oa.CHORD_ANCHOR]: "xhe-chord-anchor",
        [oa.LINE_BREAK]: "xhe-line-break",
        [oa.HEADLINE]: "xhe-headline",
        [oa.RHYTHM]: "xhe-rhythm",
        [oa.TAB]: "xhe-tab"
    };
    class Ba {
        constructor(t, n=!1, e=!1) {
            this.ut = t,
            this.ct = n,
            this.lt = e;
            const i = Math.random().toString(16).substring(2);
            this.ft = "xhe-" + i + "-",
            this.dt = [],
            this.ht = 1,
            this.vt = {},
            this.ut.setAttribute(Da, ""),
            Ia(this.ut, {
                forMobile: this.ct,
                forEditor: this.lt
            }),
            this.updateOptions({
                chordStyle: g
            })
        }
        getItemList() {
            return this.dt
        }
        cloneItemList() {
            return da(this.dt)
        }
        updateItemList(t) {
            t = da(t),
            this.yt(t);
            let n = !1;
            for (let e = 0; e < t.length; ++e) {
                const i = t[e]
                  , r = t[e + 1]
                  , {type: o} = i;
                o === oa.LINE_BREAK ? (n = !n,
                i.even = n) : [oa.TEXT, oa.CHORD_ANCHOR].includes(o) ? i.even = n : o === oa.HEADLINE ? r && [oa.TEXT, oa.CHORD_ANCHOR].includes(r.type) && (i.even = n) : [oa.TAB, oa.RHYTHM].includes(o) && (n = !1)
            }
            this.st(function(t, n) {
                const e = t.reduce(( (t, n) => Math.max(t, n.id)), 0);
                let i = [];
                const r = [];
                let o = 0
                  , s = 0;
                for (; ; ) {
                    const u = n[o]
                      , a = t[s];
                    if (!u && !a)
                        break;
                    if (u && u.id > e)
                        i.push(u),
                        o++;
                    else if (i.length && (fa(r, i, u ? u.id : null),
                    i = []),
                    u && a && u.id === a.id)
                        JSON.stringify(u.value) === JSON.stringify(a.value) && JSON.stringify(u.attributes) === JSON.stringify(a.attributes) || r.push({
                            operation: ia,
                            id: a.id,
                            item: u
                        }),
                        o++,
                        s++;
                    else {
                        if (!a)
                            throw new Error("ItemList diff in a bad state." + JSON.stringify({
                                newList: n,
                                oldList: t,
                                newItem: u
                            }));
                        r.push({
                            operation: ra,
                            id: a.id
                        }),
                        s++
                    }
                }
                return i.length && fa(r, i, null),
                r
            }(this.dt, t)),
            this.dt = t
        }
        updateOptions(t) {
            Object.assign(this.vt, t),
            this.vt.horizontal && (this.vt.noLineBreak = !0),
            this.ut.style["font-size"] = (this.vt.scale || 1) + "em"
        }
        getChordsInUse() {
            const t = [];
            return this.dt.forEach((n => {
                if (n.type === oa.CHORD_ANCHOR) {
                    const {chord: e} = n.attributes;
                    e && t.indexOf(e) < 0 && t.push(e)
                }
            }
            )),
            t
        }
        getElementByIndex(t) {
            const n = this.dt[t];
            return this.ut.querySelector("#" + this.ft + n.id)
        }
        yt(t) {
            for (const n of t)
                n.id || (n.id = this.ht,
                this.ht++)
        }
        st(t) {
            !function(t) {
                const n = t.childNodes
                  , e = [];
                for (let t = 0; t < n.length; ++t) {
                    const i = n[t];
                    i.id || e.push(i)
                }
                e.forEach((t => t.remove()))
            }(this.ut),
            Ia(this.ut, {
                horizontal: !!this.vt.horizontal
            }),
            t.forEach(( ({operation: t, id: n, item: e}) => {
                switch (t) {
                case ra:
                    this.gt(n);
                    break;
                case ea:
                    null === n ? this.bt(e) : this.wt(n, e);
                    break;
                case ia:
                    this.xt(n, e)
                }
            }
            )),
            this.kt()
        }
        bt(t) {
            const n = this.Et(t.id, t);
            this.ut.appendChild(n)
        }
        Xt(t) {
            return this.ut.querySelector("#" + this.ft + t)
        }
        wt(t, n) {
            const e = this.Xt(t)
              , i = this.Et(n.id, n);
            e ? e.parentElement.insertBefore(i, e) : _a("Insert element failed", {
                id: t,
                item: n
            })
        }
        gt(t) {
            const n = this.Xt(t);
            n ? n.remove() : _a("Remove element failed", {
                id: t
            })
        }
        xt(t, n) {
            const e = this.Xt(t);
            e && (this.wt(t, n),
            e.remove())
        }
        Et(t, n) {
            const {type: e, value: i, attributes: r} = n
              , o = $a[e];
            if (!o)
                throw new Error("Unknown type:" + e);
            const s = pr(o, {
                id: this.ft + t
            });
            return Ia(s, {
                ...r,
                ...this.vt,
                forMobile: this.ct,
                forEditor: this.lt,
                valueLength: Ea(n),
                even: n.even || !1,
                debug: JSON.stringify(n)
            }),
            null != i && (s.textContent = i === sa ? aa : function(t, n, e) {
                return t.replace(new RegExp(n,"g"), e)
            }(i, " ", " ")),
            s
        }
        kt() {
            const t = vr(this.ut, $a[oa.CHORD_ANCHOR])
              , n = [];
            for (const e of t) {
                const t = e.querySelector(this.vt.chordStyle === b ? "hexi-chord" : ".chord")
                  , {x: i, y: r, width: o} = t.getBoundingClientRect();
                n.push({
                    element: e,
                    x: i,
                    y: r,
                    width: this.vt.chordStyle === b ? Fa(this.vt) : o
                })
            }
            let e;
            for (const t of n) {
                if (!e || e.y !== t.y) {
                    e = t;
                    continue
                }
                const n = e.x + e.width - t.x + 6 + (parseFloat(window.getComputedStyle(t.element)["margin-left"]) || 0);
                n > 0 ? t.element.style["margin-left"] = n + "px" : delete t.element.style["margin-left"],
                e = t
            }
        }
    }
    function Fa(t) {
        const {instrument: n, scale: e=1} = t;
        let i = 0;
        return n === m.GUITAR ? i = 42 : n === m.UKULELE && (i = 30),
        i * e
    }
    function Ia(t, n) {
        for (const e in n)
            if (n.hasOwnProperty(e)) {
                const i = n[e]
                  , r = typeof i;
                if ("string" === r || "number" === r)
                    t.dataset[e] = String(i);
                else if (i)
                    t.dataset[e] = String(i);
                else if (t.dataset[e])
                    try {
                        delete t.dataset[e]
                    } catch (t) {
                        _a("Failed to delete dataset", {
                            key: e
                        })
                    }
            }
    }
    function Ra(t) {
        return Object.entries(t).map(( ([t,n]) => `${t}:${n}`)).join(";")
    }
    const Na = n("Xhe")
      , Ga = "Range";
    function za(t) {
        return !(t.anchorIndex === t.focusIndex && t.anchorOffset === t.focusOffset)
    }
    function Pa(t, n) {
        return Za(n, 0)
    }
    function qa(t, n) {
        const e = t[n];
        return e ? Za(n, Ea(e)) : Za(0, 0)
    }
    function La(t) {
        const n = {
            index: t.anchorIndex,
            offset: t.anchorOffset
        }
          , e = {
            index: t.focusIndex,
            offset: t.focusOffset
        };
        let i = n
          , r = e;
        return i.index === e.index ? i.offset > e.offset && (i = e,
        r = n) : i.index > e.index && (i = e,
        r = n),
        {
            startCaret: i,
            endCaret: r
        }
    }
    function Ha(t, {anchorNode: n, anchorOffset: e, focusNode: i, focusOffset: r}) {
        let o = tc(t, {
            node: n,
            offset: e
        })
          , s = o;
        return n === i && e === r || (s = tc(t, {
            node: i,
            offset: r
        })),
        o || (o = {
            index: 0,
            offset: 0
        }),
        s || (s = {
            index: t.length - 1,
            offset: Ea(t[t.length - 1])
        }),
        Va(t, {
            index: s.index,
            offset: s.offset,
            anchorIndex: o.index,
            anchorOffset: o.offset,
            focusIndex: s.index,
            focusOffset: s.offset
        })
    }
    function Ua(t, n, e) {
        const i = Wa(t, n, {
            index: e.anchorIndex,
            offset: e.anchorOffset
        })
          , r = Wa(t, n, {
            index: e.focusIndex,
            offset: e.focusOffset
        });
        i && r && function(t, n) {
            const e = document.getSelection();
            if (e.anchorOffset === t.offset && e.anchorNode === t.textNode && e.focusOffset === n.offset && e.focusNode === n.textNode)
                return;
            const i = document.createRange();
            i.setStart(t.textNode, t.offset),
            i.setEnd(n.textNode, n.offset),
            e.removeAllRanges(),
            e.addRange(i)
        }(i, r)
    }
    function Ja(t) {
        const n = vr(t, "[text-value]")
          , e = n[0].childNodes[0]
          , i = n[n.length - 1].childNodes[0]
          , r = document.createRange();
        r.setStart(e, 0),
        r.setEnd(i, i.nodeValue.length);
        const o = document.getSelection();
        o.removeAllRanges(),
        o.addRange(r)
    }
    function Wa(t, n, {index: e, offset: i}) {
        const r = t.children[e];
        if (!r)
            return Na(`element not found, index = ${e}`),
            null;
        const o = r.hasAttribute(Aa) ? [r] : vr(r, "[text-value]");
        if (!o || 0 === o.length)
            return Na(`element with text-value not found, index = ${e}`),
            null;
        let s, u = i;
        for (let t = 0; t < o.length; ++t) {
            if (s = o[t].childNodes[0],
            !s)
                return Na(`text node not found, index = ${e}`),
                null;
            const n = nc(s.nodeValue).length;
            if (n >= u)
                break;
            u -= n + 1
        }
        return {
            textNode: s,
            offset: u
        }
    }
    function Va(t, n) {
        const e = Ka(t, {
            index: n.anchorIndex,
            offset: n.anchorOffset
        })
          , i = Ka(t, {
            index: n.focusIndex,
            offset: n.focusOffset
        });
        return {
            index: i.index,
            offset: i.offset,
            anchorIndex: e.index,
            anchorOffset: e.offset,
            focusIndex: i.index,
            focusOffset: i.offset
        }
    }
    function Ka(t, {index: n, offset: e}) {
        for (; n > 0 && t[n].type === oa.LINE_BREAK; )
            e = Ea(t[--n]);
        return function(t, n) {
            const e = t[n];
            return e && e.type === oa.CHORD_ANCHOR && !e.value
        }(t, n) ? Pa(0, n) : 0 !== e || Ya(t, n) ? Za(n, e) : qa(t, n - 1)
    }
    function Ya(t, n) {
        const e = t[n]
          , i = t[n - 1];
        return ga(e) || !i || i.type === oa.LINE_BREAK || ga(i)
    }
    function Za(t, n) {
        return Qa(t, n, t, n)
    }
    function Qa(t, n, e, i) {
        return {
            index: e,
            offset: i,
            anchorIndex: t,
            anchorOffset: n,
            focusIndex: e,
            focusOffset: i
        }
    }
    function tc(t, {node: n, offset: e}) {
        const i = function(t) {
            let n = t;
            for (; n; ) {
                if (n.hasAttribute && n.hasAttribute(Da))
                    throw new Error("whole editor selected!");
                const t = n.id;
                if (t && 0 === t.indexOf("xhe-"))
                    return n;
                n = n.parentElement
            }
            throw Na(t),
            new Error("No item ID for text node")
        }(n);
        if (!i)
            return null;
        const r = i.hasAttribute(Aa) ? [i] : vr(i, "[text-value]");
        let o = 0;
        for (let t = 0; t < r.length; ++t) {
            const i = r[t]
              , s = i.childNodes[0];
            if (s.nodeType !== Node.TEXT_NODE) {
                Na("First child of [text-value] is not a text node!", s);
                break
            }
            const u = nc(s.nodeValue).length;
            if (s === n || i === n) {
                o += Math.min(u, e);
                break
            }
            o += u + 1
        }
        const s = i.id
          , u = parseInt(s.substring(s.lastIndexOf("-") + 1))
          , a = t.findIndex((t => t.id === u));
        if (a < 0)
            throw new Error("Failed to find item with ID=" + u);
        return Za(a, o)
    }
    function nc(t) {
        return 0 === t.indexOf(aa) ? t.substring(1) : t
    }
    function ec(t, n) {
        const {startCaret: e, endCaret: i} = La(n);
        let {index: r, offset: o} = e
          , {index: s, offset: u} = i;
        if (r < 0 && (r = 0),
        s < 0 && (s = t.length - 1),
        r === s)
            return ic(t, r, o, u),
            Za(r, o);
        for (let n = s; n >= r; n--)
            n === s ? ic(t, n, 0, u) : n === r ? ic(t, n, o, Ea(t[n])) : t.splice(n, 1);
        return Za(r, o)
    }
    function ic(t, n, e, i) {
        const r = t[n]
          , {value: o} = r;
        r.value && (r.value = o.substring(0, e),
        r.value += o.substring(i)),
        ka(r) && e < i && t.splice(n, 1)
    }
    function rc(t, n) {
        const {index: e} = n
          , i = pa(t, e)
          , r = function(t) {
            return {
                type: oa.HEADLINE,
                value: t
            }
        }("");
        return t.splice(i, 0, r),
        qa(t, i)
    }
    function oc(t, n, e) {
        const {index: i} = n
          , r = pa(t, i);
        return t.splice(r, 0, function(t) {
            return {
                type: oa.RHYTHM,
                attributes: {
                    rhythm: t
                }
            }
        }(e)),
        Qa(r, 0, r, 1)
    }
    function sc(t, n, e) {
        const {index: i} = n
          , r = pa(t, i);
        return t.splice(r, 0, function(t) {
            return {
                type: oa.TAB,
                attributes: {
                    tab: t
                }
            }
        }(e)),
        Qa(r, 0, r, 1)
    }
    function uc(t, n, e) {
        const {index: i, offset: r} = n
          , o = t[i];
        if (o.type === oa.CHORD_ANCHOR)
            return o.attributes = {
                chord: e
            },
            qa(t, i);
        if (o.type === oa.TEXT) {
            const n = {
                type: oa.TEXT,
                value: o.value.substring(0, r - 1)
            }
              , s = function(t, n) {
                return {
                    type: oa.CHORD_ANCHOR,
                    value: t,
                    attributes: {
                        chord: n
                    }
                }
            }(o.value.substring(r - 1, r), e)
              , u = [n, s, {
                type: oa.TEXT,
                value: o.value.substring(r, o.value.length)
            }].filter((t => t.value));
            return s.value = s.value === ua ? sa : s.value,
            t.splice(i, 1, ...u),
            Za(i + u.findIndex((t => t.type === oa.CHORD_ANCHOR)), 1)
        }
        return n
    }
    function ac(t, n) {
        const {index: e} = n
          , i = t[e];
        return i && i.type === oa.CHORD_ANCHOR ? (t[e] = ya(i.value === sa ? ua : i.value),
        Za(e, 1)) : Za(e, 1)
    }
    function cc(t, n) {
        return fc(t, n, !0)
    }
    function lc(t, n) {
        return fc(t, n, !1)
    }
    function fc(t, n, e=!1) {
        const {index: i} = n
          , r = t[i]
          , o = t[e ? i - 1 : i + 1];
        if (!r || r.type !== oa.CHORD_ANCHOR || !o || o.type !== oa.TEXT)
            return n;
        const s = r.attributes.chord;
        ac(t, n);
        return uc(t, e ? qa(t, i - 1) : Za(i + 1, 1), s)
    }
    function dc(t, n, e) {
        const i = t[n.index];
        if (i.type !== oa.RHYTHM)
            throw new Error("updating a non-rhythm item");
        return i.attributes = {
            rhythm: e
        },
        qa(t, n.index)
    }
    function hc(t, n, e) {
        const i = t[n.index];
        if (i.type !== oa.TAB)
            throw new Error("updating a non-tab item");
        return i.attributes = {
            tab: e
        },
        n
    }
    const vc = "selected";
    class pc {
        constructor(t, n, e, i) {
            this.ut = t,
            this.St = n,
            this.Tt = e,
            this.ct = i,
            this.Ct = new Xr,
            this.jt = !1,
            this.Ot = {
                index: 0,
                offset: 0
            },
            zr(document, "selectionchange", this.At.bind(this)),
            zr(t, "keydown", this.Dt.bind(this)),
            zr(t, "click", this.Mt.bind(this)),
            this.Tt.onContentChange((t => {
                t || this.At()
            }
            ))
        }
        getCaret() {
            return this.Ot
        }
        onCaretMove(t) {
            return this.Ct.add(t)
        }
        updateItemSelection(t) {
            for (let t = 0; t < this.ut.childElementCount; ++t)
                this.ut.children[t].removeAttribute(vc);
            if (!t)
                return;
            const n = this.St.getItemList()
              , {startCaret: e, endCaret: i} = La(t);
            for (let t = e.index; t <= i.index; ++t)
                t === e.index && 0 !== e.offset || t === i.index && i.offset < Ea(n[i.index]) || this.ut.children[t].setAttribute(vc, "")
        }
        isCaretInLyrics() {
            return ba(this.St.getItemList()[this.Ot.index])
        }
        isCaretAtLineHead() {
            const {index: t, offset: n} = this.Ot;
            return 0 === n && va(this.St.getItemList(), t)
        }
        At() {
            this.Tt.isComposing() || this.jt || (this.jt = !0,
            requestAnimationFrame(( () => {
                this.jt = !1;
                const t = document.getSelection();
                if (!this.ut.contains(t.focusNode) || !this.ut.contains(t.anchorNode))
                    return void this.Ct.fire(null);
                const n = this.St.getItemList();
                this.Ot = Ha(n, t),
                this.updateItemSelection(this.Ot),
                this.Ct.fire(this.Ot)
            }
            )))
        }
        Dt(t) {
            if (t.isComposing)
                return;
            const n = this.St.getItemList();
            let e;
            switch (t.key) {
            case "ArrowLeft":
                e = mc;
                break;
            case "ArrowRight":
                e = yc;
                break;
            case "ArrowUp":
                e = bc;
                break;
            case "ArrowDown":
                e = gc
            }
            if (e) {
                t.preventDefault();
                let i = e(n, this.Ot, t.shiftKey);
                i = Va(n, i),
                t.shiftKey ? function(t, n, e) {
                    const {textNode: i, offset: r} = Wa(t, 0, e);
                    document.getSelection().extend(i, r)
                }(this.ut, 0, i) : Ua(this.ut, n, i)
            }
        }
        Mt(t) {
            let n = t.target;
            for (; n; ) {
                if ([$a[oa.RHYTHM], $a[oa.TAB]].includes(n.tagName.toLowerCase()) && !n.hasAttribute(vc)) {
                    Ja(n),
                    this.ct && !Pi(navigator.userAgent) && document.activeElement === this.ut && this.ut.blur();
                    break
                }
                n = n.parentElement
            }
        }
    }
    function mc(t, n, e) {
        const {index: i, offset: r} = n;
        if (0 === r) {
            const n = t[i - 1];
            return n ? Za(i - 1, Ea(n)) : Za(0, 0)
        }
        return Za(i, r - 1)
    }
    function yc(t, n, e) {
        let {index: i, offset: r} = n;
        if (r + 1 <= Ea(t[i]))
            return Za(i, r + 1);
        let o = t[i + 1];
        if (!o)
            return Za(i, r);
        if (Ya(t, i + 1))
            return Pa(0, i + 1);
        for (; xa(o); )
            i++,
            o = t[i + 1];
        return o ? Za(Math.min(o.type === oa.LINE_BREAK ? i + 2 : i + 1, t.length - 1), Math.min(Ea(o), 1)) : Za(i, 0)
    }
    function gc(t, n, e) {
        const {index: i, offset: r} = n
          , o = wc(t, i, r)
          , s = function(t, n) {
            if (ga(t[n]))
                return n + 1 < t.length ? n + 1 : null;
            let e = n + 1;
            for (; e < t.length; ) {
                if (t[e].type === oa.LINE_BREAK)
                    return e + 1 < t.length ? e + 1 : null;
                ++e
            }
            return null
        }(t, i);
        if (!s)
            return n;
        const {index: u, offset: a} = kc(t, s, o);
        return Za(u, a)
    }
    function bc(t, n, e) {
        const {index: i, offset: r} = n
          , o = wc(t, i, r)
          , s = function(t, n) {
            const e = xc(t, n) - 1;
            return e >= 0 ? xc(t, e) : e
        }(t, i);
        if (s < 0)
            return n;
        const {index: u, offset: a} = kc(t, s, o);
        return Za(u, a)
    }
    function wc(t, n, e) {
        if (ga(t[n]))
            return e;
        let i = n - 1
          , r = t[i]
          , o = e;
        for (; r && (r.type === oa.TEXT || r.type === oa.CHORD_ANCHOR); )
            o += Ea(r),
            i--,
            r = t[i];
        return o
    }
    function xc(t, n) {
        let e = n - 1;
        for (; e >= 0; ) {
            const n = t[e];
            if (ga(n) || n.type === oa.LINE_BREAK)
                break;
            --e
        }
        return e + 1
    }
    function kc(t, n, e) {
        let i = 0
          , r = n
          , o = t[r];
        if (ga(o))
            return Za(r, Math.min(Ea(o), e));
        for (; o; ) {
            if (i += Ea(o),
            ga(o) || o.type === oa.LINE_BREAK)
                return Za(r - 1, Ea(t[r - 1]));
            if (i >= e)
                return Za(r, e - (i - Ea(t[r])));
            r++,
            o = t[r]
        }
        return Za(r - 1, Ea(t[r - 1]))
    }
    class Ec {
        constructor(t, n, e=0) {
            this._t = [t],
            this.$t = 1,
            this.Bt = !1,
            this.Ft = null,
            this.It = e,
            this.Rt = n
        }
        getAvailableUndos() {
            return this.$t - 1
        }
        getAvailableRedos() {
            return this._t.length - this.$t
        }
        getCurrentStep() {
            return this._t[this.$t - 1]
        }
        pushStep(t, n) {
            let e = this.$t
              , i = this._t.length - this.$t;
            this.Bt ? (e--,
            i++) : this.Rt && !n && this.Rt.pushStep(),
            this._t.splice(e, i, t),
            this.$t = this._t.length,
            this.It && this.Nt()
        }
        undo() {
            return this.Rt && this.Rt.undo(),
            this.Gt(),
            this.getAvailableUndos() <= 0 ? null : (this.$t = Math.max(1, this.$t - 1),
            this._t[this.$t - 1])
        }
        redo() {
            return this.Rt && this.Rt.redo(),
            this.Gt(),
            this.getAvailableRedos() <= 0 ? null : (this.$t = Math.min(this._t.length, this.$t + 1),
            this._t[this.$t - 1])
        }
        Nt() {
            this.Bt = !0,
            this.Ft && clearTimeout(this.Ft),
            this.Ft = setTimeout(( () => {
                this.Bt = !1,
                this.Ft = null
            }
            ), 1e3)
        }
        Gt() {
            this.Bt = !1,
            this.Ft && (clearTimeout(this.Ft),
            this.Ft = null)
        }
    }
    class Xc {
        constructor() {
            const t = document.createElement("input");
            t.setAttribute("type", "text"),
            t.setAttribute("style", "position:fixed; bottom:-100vh;"),
            document.body.insertBefore(t, null),
            this.zt = t
        }
        pushStep() {
            const t = document.getSelection()
              , n = t.getRangeAt(0);
            this.zt.select(),
            document.execCommand("insertText", !1, "FakeNativeHistoryApi"),
            t.removeAllRanges(),
            t.addRange(n)
        }
        undo() {
            document.execCommand("undo")
        }
        redo() {
            document.execCommand("redo")
        }
        Pt(t) {
            const n = window.getSelection()
              , e = n.rangeCount > 0 ? n.getRangeAt(0) : null;
            return n.removeAllRanges(),
            n.addRange(t),
            e
        }
    }
    function Sc(t, n) {
        const {index: e, offset: i} = n
          , r = t[e];
        return ga(r) ? 0 === i ? Tc(t, e) : (t.splice(e + 1, 0, jc(), Cc()),
        Pa(0, e + 2)) : i === Ea(r) ? function(t, n) {
            return t.splice(n + 1, 0, Cc(), jc()),
            Pa(0, n + 3)
        }(t, e) : 0 === i ? Tc(t, e) : function(t, n, e) {
            const i = t[n]
              , {type: r, value: o} = i
              , s = {
                type: r,
                value: o.substring(0, e)
            }
              , u = {
                type: r,
                value: o.substring(e)
            };
            return t.splice(n, 1, s, Cc(), u),
            Pa(0, n + 2)
        }(t, e, i)
    }
    function Tc(t, n) {
        return t.splice(n, 0, jc(), Cc()),
        Pa(0, n + 2)
    }
    function Cc() {
        return {
            type: oa.LINE_BREAK
        }
    }
    function jc() {
        return {
            type: oa.TEXT,
            value: sa
        }
    }
    const Oc = n("deleteBackwardAt");
    function Ac(t, n) {
        const {index: e, offset: i} = n
          , r = t[e]
          , o = t[e - 1];
        if (i > 0)
            return ka(r) ? (t.splice(e, 1, ya(sa), ma()),
            Za(e, 0)) : (r.value = r.value.substring(0, i - 1) + r.value.substring(i) || sa,
            Za(e, i - 1));
        if (r.value === sa && [oa.CHORD_ANCHOR, oa.HEADLINE].includes(r.type))
            return o ? (t.splice(e, 1),
            Za(e - 1, Ea(o))) : (t.splice(e, 1, ya(sa)),
            Za(e, 0));
        if (!o)
            return n;
        if (o.type === oa.LINE_BREAK) {
            const n = t[e - 2];
            return n.type === oa.TEXT && 0 === Ea(n) ? (t.splice(e - 2, 2),
            Za(e - 2, 0)) : (t.splice(e - 1, 1),
            Za(e - 2, Ea(n)))
        }
        if (ga(o)) {
            const n = t[e + 1];
            return r.value === sa && n && n.type === oa.LINE_BREAK && t.splice(e + 1, 1),
            Za(e - 1, Ea(o))
        }
        if (ba(o))
            return o.value = o.value.substring(0, o.value.length - 1),
            Za(e - 1, Ea(o));
        throw Oc("DeleteAt", {
            prevItem: o
        }),
        Error("what?")
    }
    const Dc = n("deleteForwardAt");
    function Mc(t, n) {
        const {index: e, offset: i} = n
          , r = t[e]
          , o = t[e + 1];
        if (i < Ea(r))
            return ka(r) ? (t.splice(e, 1, ya(sa), ma()),
            Za(e, 0)) : (r.value = r.value.substring(0, i) + r.value.substring(i + 1) || sa,
            Za(e, i));
        if (r.value === sa && r.type === oa.CHORD_ANCHOR)
            return o ? (t.splice(e, 1),
            Za(e, 0)) : (t.splice(e, 1, ya(sa)),
            Za(e, 0));
        if (ga(r))
            return n;
        if (!o)
            return n;
        if (o.type === oa.LINE_BREAK) {
            return ga(t[e + 2]) || t.splice(e + 1, 1),
            n
        }
        if (ga(o))
            return n;
        if (ba(o))
            return o.value = o.value.substring(1),
            Za(e + 1, 0);
        throw Dc("DeleteForwardAt", {
            nextItem: o
        }),
        Error("what?")
    }
    function _c(t, n, e) {
        const {index: i, offset: r} = n
          , o = t[i]
          , {type: s} = o;
        return s === oa.TEXT && t.splice(i, 1, {
            type: oa.TEXT,
            value: o.value.substring(0, r)
        }, {
            type: oa.TEXT,
            value: o.value.substring(r)
        }),
        t.splice(i + 1, 0, ...e),
        Za(i + e.length, Ea(e[e.length - 1]))
    }
    function $c(t, n, e) {
        let {index: i, offset: r} = n;
        const o = t[i]
          , {type: s} = o
          , u = e.split(ca).map((t => la(t)))
          , a = u[0];
        switch (s) {
        case oa.CHORD_ANCHOR:
            0 === r && (t.splice(i + 1, 0, ya(o.value)),
            o.value = a,
            u.splice(0, 1));
            break;
        case oa.TEXT:
            t.splice(i, 1, ya(o.value.substring(0, r)), ya(o.value.substring(r)));
            break;
        case oa.HEADLINE:
            o.value = o.value.substring(0, r) + a + o.value.substring(r),
            u.length = 0;
            break;
        case oa.RHYTHM:
        case oa.TAB:
            delete o.id,
            0 === r && i--;
            break;
        case oa.LINE_BREAK:
            i--;
            break;
        default:
            throw new Error("Unhandled type: " + s)
        }
        const c = [];
        for (let t = 0; t < u.length; ++t)
            0 !== t && c.push(ma()),
            c.push(ya(u[t]));
        return t.splice(i + 1, 0, ...c),
        Za(i + c.length, u.length > 0 ? u[u.length - 1].length : r + a.length)
    }
    function Bc(t, n) {
        return n = function(t, n) {
            let {anchorIndex: e, anchorOffset: i, focusIndex: r, focusOffset: o} = n;
            for (let n = t.length - 1; n >= 0; --n) {
                const i = t[n - 1];
                t[n].type !== oa.LINE_BREAK || ba(i) || (e >= n && (e = Math.max(0, e - 1)),
                r >= n && (r = Math.max(0, r - 1)),
                t.splice(n, 1))
            }
            let s = 0;
            for (; s < t.length; ) {
                if (ba(t[s])) {
                    const n = t[s + 1];
                    n && (ba(n) || n.type === oa.LINE_BREAK) || (t.splice(s + 1, 0, ma()),
                    e >= s + 1 && e++,
                    r >= s + 1 && r++)
                }
                ++s
            }
            return Qa(e, i, r, o)
        }(t, n),
        n = function(t, n) {
            let {anchorIndex: e, anchorOffset: i, focusIndex: r, focusOffset: o} = n;
            for (let n = t.length - 1; n >= 0; --n) {
                const s = t[n];
                if (s.type === oa.CHORD_ANCHOR && (s.value.length > 1 || s.value[0] === ua)) {
                    const u = s.value[0] === ua ? s.value : s.value.substring(1);
                    s.value = s.value[0] === ua ? sa : s.value[0],
                    t.splice(n + 1, 0, ya(u)),
                    e === n && (i = u.length),
                    r === n && (o = u.length),
                    e >= n && e++,
                    r >= n && r++
                }
            }
            return Qa(e, i, r, o)
        }(t, n = function(t, n) {
            for (const n of t)
                (ba(n) || n.type === oa.HEADLINE) && (n.value = la(n.value));
            return n
        }(t, n)),
        n = function(t, n) {
            let {anchorIndex: e, anchorOffset: i, focusIndex: r, focusOffset: o} = n;
            for (let n = t.length - 1; n >= 0; --n) {
                const i = t[n];
                [oa.CHORD_ANCHOR, oa.LINE_BREAK].includes(i.type) && (t.splice(n, 0, ya(sa)),
                e >= n && e++,
                r >= n && r++)
            }
            return Qa(e, i, r, o)
        }(t, n),
        n = function(t, n) {
            let {anchorIndex: e, anchorOffset: i, focusIndex: r, focusOffset: o} = n
              , s = 0;
            for (; s + 1 < t.length; ) {
                const n = t[s]
                  , u = t[s + 1];
                n.type === oa.TEXT && u.type === oa.TEXT ? (e > s + 1 ? e-- : e === s + 1 && (e = s,
                i += n.value.length),
                r > s + 1 ? r-- : r === s + 1 && (r = s,
                o += n.value.length),
                n.value += u.value,
                t.splice(s + 1, 1)) : s++
            }
            return Qa(e, i, r, o)
        }(t, n),
        n = function(t, n) {
            let {anchorIndex: e, anchorOffset: i, focusIndex: r, focusOffset: o} = n;
            return t.forEach(( (t, n) => {
                if (t.type === oa.TEXT || t.type === oa.HEADLINE) {
                    let s = ""
                      , u = !1;
                    for (let a = 0; a < t.value.length; ++a) {
                        const c = t.value[a];
                        c === ua ? (u ? (e === n && i > a && i--,
                        r === n && o > a && o--) : s += c,
                        u = !0) : (s += c,
                        u = !1)
                    }
                    t.value = s
                }
            }
            )),
            Qa(e, i, r, o)
        }(t, n),
        n = function(t, n) {
            let {anchorIndex: e, anchorOffset: i, focusIndex: r, focusOffset: o} = n;
            for (let n = t.length - 1; n >= 0; --n) {
                const s = t[n]
                  , u = t[n + 1];
                xa(s) && !va(t, n) && u && u.type !== oa.LINE_BREAK && (t.splice(n, 1),
                e === n && (i = Ea(t[n - 1])),
                r === n && (o = Ea(t[n - 1])),
                e >= n && (e = Math.max(0, e - 1)),
                r >= n && (r = Math.max(0, r - 1)))
            }
            return Qa(e, i, r, o)
        }(t, n),
        n = function(t, n) {
            if (0 === t.length)
                return t.push(ya(sa), ma()),
                Za(0, 0);
            return n
        }(t, n),
        n = Va(t, n)
    }
    let Fc = () => {}
    ;
    const Ic = t("Xhe/InputManager")
      , Rc = "_XHE_COPY_PASTE_SENTINEL_"
      , Nc = "_XHE_PRIVATE_COPY_PASTE_SENTINEL_"
      , Gc = Pi(navigator.userAgent);
    class zc {
        constructor(t, n, e) {
            this.ut = t,
            this.St = n,
            zr(t, "beforeinput", this.qt.bind(this)),
            zr(t, "copy", this.Lt.bind(this, !1)),
            zr(t, "cut", this.Lt.bind(this, !0)),
            this.Ht = new Pc(t,n,( () => {
                if (!Gc) {
                    const t = n.cloneItemList();
                    let e = Ha(t, document.getSelection());
                    e = function(t, n) {
                        za(n) && (n = ec(t, n),
                        t.forEach((t => delete t.id)));
                        const {text: e, offset: i} = function() {
                            const t = document.getSelection();
                            let n = t.focusNode.textContent
                              , e = t.focusOffset
                              , i = 0;
                            for (let t = 0; t < e; ++t)
                                n[t] === aa && i++;
                            return e -= i,
                            n = la(n),
                            {
                                text: n,
                                offset: e
                            }
                        }()
                          , r = t[n.index];
                        wa(r) && (r.value = "",
                        delete r.id);
                        return n = $c(t, Za(n.index, 0), e.substring(0, i)),
                        t.splice(n.index + 1, 0, ya(e.substring(i))),
                        n
                    }(t, e),
                    this.applyInput(void 0, t, e, void 0)
                }
            }
            )),
            this.Ut = new Xr,
            e && (this.Jt = Nc + e + "_")
        }
        applyInput(t, n, e, i, r=!1) {
            t && (Ic(t.name, {
                caret: e,
                inputText: i,
                fromExternal: r,
                itemList: n
            }),
            e = t(n, e, i)),
            e = Bc(n, e),
            this.St.updateItemList(n),
            r || Ua(this.ut, n, e),
            this.Ut.fire(r)
        }
        isComposing() {
            return this.Ht.isComposing()
        }
        onContentChange(t) {
            return this.Ut.add(t)
        }
        qt(t) {
            if (Ic("beforeinput", t),
            !Gc && this.Ht.isComposing())
                return;
            t.preventDefault();
            const {data: n, dataTransfer: e, inputType: i} = t
              , r = document.getSelection();
            let o, s;
            switch (i) {
            case "historyUndo":
            case "historyRedo":
            case "insertCompositionText":
            case "deleteCompositionText":
                return;
            case "deleteContentBackward":
                r.type !== Ga && (o = Ac);
                break;
            case "deleteContentForward":
                r.type !== Ga && (o = Mc);
                break;
            case "insertParagraph":
                o = Sc;
                break;
            case "insertFromPaste":
            case "insertReplacementText":
                ({actionFunc: o, inputValue: s} = this.Wt(e.getData("text/plain")));
                try {
                    if (Pi(navigator.userAgent) && o === $c && s && s.indexOf("\n") < 0) {
                        const t = e.getData("text/html")
                          , n = [...(new DOMParser).parseFromString(t, "text/html").body.childNodes].map((t => t.textContent));
                        n.length > 1 && (s = n.join("\n"))
                    }
                } catch (t) {}
                break;
            case "insertText":
            case "insertFromComposition":
                ({actionFunc: o, inputValue: s} = this.Wt(n));
                break;
            default:
                return void Ic("Unhandled input", t)
            }
            const u = this.St.cloneItemList();
            let a = Ha(u, r);
            za(a) && (a = ec(u, a),
            a = Bc(u, a)),
            this.applyInput(o, u, a, s)
        }
        Lt(t, n) {
            const e = this.St.cloneItemList()
              , i = document.getSelection();
            let r = Ha(e, i);
            const {startCaret: o, endCaret: s} = La(r)
              , u = ha(e.slice(o.index, s.index + 1));
            o.index === s.index ? void 0 !== u[0].value && (u[0].value = e[o.index].value.substring(o.offset, s.offset)) : (void 0 !== u[0].value && (u[0].value = e[o.index].value.substring(o.offset)),
            void 0 !== u[u.length - 1].value && (u[u.length - 1].value = e[s.index].value.substring(0, s.offset))),
            n.preventDefault(),
            n.clipboardData.setData("text/plain", function(t, n, e) {
                return t + e + JSON.stringify(n)
            }(i.toString(), u, this.Jt || Rc)),
            t && za(r) && (r = ec(e, r),
            this.applyInput(null, e, r))
        }
        Wt(t) {
            let n = function(t, n) {
                for (const e of [Rc, n]) {
                    if (!e)
                        continue;
                    const n = t.indexOf(e);
                    if (!(n < 0))
                        return JSON.parse(t.substring(n + e.length))
                }
                return null
            }(t, this.Jt);
            return !n && t.indexOf(Nc) >= 0 && (!function(t) {
                Fc(t)
            }("为保护作者权益，禁止从他人的曲谱复制内容"),
            n = []),
            n ? {
                actionFunc: _c,
                inputValue: n
            } : {
                actionFunc: $c,
                inputValue: t
            }
        }
    }
    class Pc {
        constructor(t, n, e) {
            zr(t, "compositionstart", (t => {
                Ic("compositionstart", t),
                this.Vt = !0
            }
            )),
            zr(t, "compositionupdate", (t => {
                Ic("compositionupdate", t)
            }
            )),
            zr(t, "compositionend", (t => {
                Ic("compositionend", t),
                e(),
                this.Vt = !1
            }
            ))
        }
        isComposing() {
            return this.Vt
        }
    }
    class qc {
        constructor(t, n, e, i=!1) {
            t.setAttribute("contenteditable", "true"),
            t.setAttribute("spellcheck", "false"),
            e = ha(e),
            this.ut = t,
            this.St = new Ba(t,i,!0),
            this.St.updateOptions(n),
            this.Tt = new zc(t,this.St,n.privateCopyKey),
            this.Kt = new pc(t,this.St,this.Tt,i),
            this.Tt.applyInput(void 0, e, Za(0, 0), void 0),
            this.Yt = new Ec(this.Zt(),new Xc,Er.SECOND),
            this.Tt.onContentChange((t => {
                this.Yt.pushStep(this.Zt(), t)
            }
            )),
            this.Kt.onCaretMove(( () => {
                this.Yt.getCurrentStep().caret = this.getCaret()
            }
            )),
            this.Qt = new Xr,
            this.setSelectionHighlightColor(n.dark)
        }
        setSelectionHighlightColor(t) {
            this.ut.setAttribute("style", Ra({
                "--selection-highlight-color": t ? "#758ea6" : "#b2d8ff"
            }))
        }
        getElement() {
            return this.ut
        }
        getRenderer() {
            return this.St
        }
        getUndoRedoCounts() {
            return {
                undos: this.Yt.getAvailableUndos(),
                redos: this.Yt.getAvailableRedos()
            }
        }
        getCaret() {
            return this.Kt.getCaret()
        }
        getCaretElement() {
            const {index: t} = this.getCaret();
            return this.St.getElementByIndex(t)
        }
        isComposing() {
            return this.Tt.isComposing()
        }
        isCaretAtChordAnchorAllowedPosition() {
            return this.Kt.isCaretInLyrics() && !this.Kt.isCaretAtLineHead()
        }
        isObjectSelected() {
            const t = this.getCaret()
              , n = this.St.getItemList();
            return t.anchorIndex === t.focusIndex && t.anchorOffset !== t.focusOffset && ka(n[t.index])
        }
        clearItemSelection() {
            this.Kt.updateItemSelection(null)
        }
        onContentChange(t) {
            this.Tt.onContentChange(t),
            this.Qt.add(t)
        }
        onCaretMove(t) {
            return this.Kt.onCaretMove(t)
        }
        undoOrRedo(t=!1) {
            const n = t ? this.Yt.redo() : this.Yt.undo();
            n && (this.getRenderer().updateItemList(n.itemList),
            Ua(this.ut, n.itemList, n.caret),
            this.Qt.fire())
        }
        deleteSelectedItems() {
            this.tn(ec, this.getCaret())
        }
        setChordAnchor(t) {
            this.tn(uc, this.getCaret(), t)
        }
        unsetChordAnchor() {
            this.tn(ac, this.getCaret())
        }
        moveChordAnchorLeft() {
            this.tn(cc, this.getCaret())
        }
        moveChordAnchorRight() {
            this.tn(lc, this.getCaret())
        }
        insertHeadline() {
            this.tn(rc, this.getCaret())
        }
        insertRhythm(t) {
            this.tn(oc, this.getCaret(), t)
        }
        updateRhythm(t) {
            this.tn(dc, this.getCaret(), t, !0)
        }
        insertTab(t) {
            this.tn(sc, this.getCaret(), t)
        }
        updateTab(t) {
            this.tn(hc, this.getCaret(), t, !0)
        }
        tn(t, n, e=null, i=!1) {
            const r = this.St.cloneItemList();
            this.Tt.applyInput(t, r, n, e, i),
            i && this.Kt.updateItemSelection(n)
        }
        Zt() {
            return {
                itemList: ha(this.getRenderer().getItemList()),
                caret: this.getCaret()
            }
        }
    }
    function Lc(t) {
        const n = t - 1;
        return n * n * n + 1
    }
    function Hc(t, {delay: n=0, duration: e=400, easing: i=Io}={}) {
        const r = +getComputedStyle(t).opacity;
        return {
            delay: n,
            duration: e,
            easing: i,
            css: t => "opacity: " + t * r
        }
    }
    function Uc(t, {delay: n=0, duration: e=400, easing: i=Lc, x: r=0, y: o=0, opacity: s=0}={}) {
        const u = getComputedStyle(t)
          , a = +u.opacity
          , c = "none" === u.transform ? "" : u.transform
          , l = a * (1 - s);
        return {
            delay: n,
            duration: e,
            easing: i,
            css: (t, n) => `\n\t\t\ttransform: ${c} translate(${(1 - t) * r}px, ${(1 - t) * o}px);\n\t\t\topacity: ${a - l * n}`
        }
    }
    function Jc(t) {
        let n, e;
        return {
            c() {
                n = is("span"),
                e = rs(t[1]),
                as(n, "class", "icon yoopu3-icon svelte-1h0ig63")
            },
            m(t, i) {
                ts(t, n, i),
                Qo(n, e)
            },
            p(t, n) {
                2 & n && fs(e, t[1])
            },
            d(t) {
                t && ns(n)
            }
        }
    }
    function Wc(t) {
        let n, e;
        return {
            c() {
                n = is("img"),
                as(n, "class", "icon svelte-1h0ig63"),
                as(n, "alt", "icon"),
                n.src !== (e = t[8]) && as(n, "src", e),
                as(n, "width", "100%")
            },
            m(t, e) {
                ts(t, n, e)
            },
            p(t, i) {
                256 & i && n.src !== (e = t[8]) && as(n, "src", e)
            },
            d(t) {
                t && ns(n)
            }
        }
    }
    function Vc(t) {
        let n, e, i, r, o, s;
        function u(t, n) {
            return t[8] ? Wc : Jc
        }
        let a = u(t)
          , c = a(t);
        return {
            c() {
                n = is("button"),
                c.c(),
                e = os(),
                i = is("span"),
                r = rs(t[2]),
                as(i, "class", "label svelte-1h0ig63"),
                hs(i, "hide", !t[2]),
                as(n, "name", t[7]),
                as(n, "style", t[10]),
                as(n, "theme", t[4]),
                as(n, "size", t[3]),
                n.disabled = t[0],
                as(n, "class", "svelte-1h0ig63"),
                hs(n, "reverse", t[5]),
                hs(n, "horizontal", t[6]),
                hs(n, "dot", t[9])
            },
            m(u, a) {
                ts(u, n, a),
                c.m(n, null),
                Qo(n, e),
                Qo(n, i),
                Qo(i, r),
                o || (s = us(n, "click", t[11]),
                o = !0)
            },
            p(t, [o]) {
                a === (a = u(t)) && c ? c.p(t, o) : (c.d(1),
                c = a(t),
                c && (c.c(),
                c.m(n, e))),
                4 & o && fs(r, t[2]),
                4 & o && hs(i, "hide", !t[2]),
                128 & o && as(n, "name", t[7]),
                1024 & o && as(n, "style", t[10]),
                16 & o && as(n, "theme", t[4]),
                8 & o && as(n, "size", t[3]),
                1 & o && (n.disabled = t[0]),
                32 & o && hs(n, "reverse", t[5]),
                64 & o && hs(n, "horizontal", t[6]),
                512 & o && hs(n, "dot", t[9])
            },
            i: Fo,
            o: Fo,
            d(t) {
                t && ns(n),
                c.d(),
                o = !1,
                s()
            }
        }
    }
    function Kc(t, n, e) {
        let i, {icon: r} = n, {label: o=""} = n, {size: s="regular"} = n, {theme: u} = n, {color: a} = n, {colorReversed: c=!1} = n, {horizontal: l=!1} = n, {disabled: f=!1} = n, {action: d} = n, {name: h} = n, {src: v} = n, {dot: p} = n;
        const m = Es();
        return t.$$set = t => {
            "icon"in t && e(1, r = t.icon),
            "label"in t && e(2, o = t.label),
            "size"in t && e(3, s = t.size),
            "theme"in t && e(4, u = t.theme),
            "color"in t && e(12, a = t.color),
            "colorReversed"in t && e(5, c = t.colorReversed),
            "horizontal"in t && e(6, l = t.horizontal),
            "disabled"in t && e(0, f = t.disabled),
            "action"in t && e(13, d = t.action),
            "name"in t && e(7, h = t.name),
            "src"in t && e(8, v = t.src),
            "dot"in t && e(9, p = t.dot)
        }
        ,
        t.$$.update = () => {
            4096 & t.$$.dirty && e(10, i = Ra({
                "--color": a || "var(--color-font-main)"
            }))
        }
        ,
        [f, r, o, s, u, c, l, h, v, p, i, async function() {
            m("click"),
            d && (e(0, f = !0),
            await d(),
            e(0, f = !1))
        }
        , a, d]
    }
    class Yc extends eu {
        constructor(t) {
            super(),
            nu(this, t, Kc, Vc, Po, {
                icon: 1,
                label: 2,
                size: 3,
                theme: 4,
                color: 12,
                colorReversed: 5,
                horizontal: 6,
                disabled: 0,
                action: 13,
                name: 7,
                src: 8,
                dot: 9
            })
        }
    }
    function Zc(t) {
        let n, e, i, r;
        const o = t[4].default
          , s = Lo(o, t, t[3], null)
          , u = s || function(t) {
            let n;
            return {
                c() {
                    n = is("span")
                },
                m(t, e) {
                    ts(t, n, e)
                },
                d(t) {
                    t && ns(n)
                }
            }
        }();
        return {
            c() {
                n = is("button"),
                u && u.c(),
                n.disabled = t[0],
                as(n, "size", t[1]),
                as(n, "theme", t[2]),
                as(n, "type", "button"),
                as(n, "class", "svelte-1kcxt4g")
            },
            m(o, s) {
                ts(o, n, s),
                u && u.m(n, null),
                e = !0,
                i || (r = us(n, "click", t[5]),
                i = !0)
            },
            p(t, [i]) {
                s && s.p && 8 & i && Uo(s, o, t, t[3], i, null, null),
                (!e || 1 & i) && (n.disabled = t[0]),
                (!e || 2 & i) && as(n, "size", t[1]),
                (!e || 4 & i) && as(n, "theme", t[2])
            },
            i(t) {
                e || (Ls(u, t),
                e = !0)
            },
            o(t) {
                Hs(u, t),
                e = !1
            },
            d(t) {
                t && ns(n),
                u && u.d(t),
                i = !1,
                r()
            }
        }
    }
    function Qc(t, n, e) {
        let {$$slots: i={}, $$scope: r} = n
          , {disabled: o=!1} = n
          , {size: s} = n
          , {theme: u} = n;
        return t.$$set = t => {
            "disabled"in t && e(0, o = t.disabled),
            "size"in t && e(1, s = t.size),
            "theme"in t && e(2, u = t.theme),
            "$$scope"in t && e(3, r = t.$$scope)
        }
        ,
        [o, s, u, r, i, function(n) {
            Xs(t, n)
        }
        ]
    }
    class tl extends eu {
        constructor(t) {
            super(),
            nu(this, t, Qc, Zc, Po, {
                disabled: 0,
                size: 1,
                theme: 2
            })
        }
    }
    function nl(t) {
        let n, e, i, r, o, s, u, a, c;
        const l = t[15].default
          , f = Lo(l, t, t[18], null);
        let d = !t[1] && (t[7] || t[9]) && el(t);
        return {
            c() {
                n = is("dialog"),
                e = is("div"),
                i = os(),
                r = is("div"),
                o = is("div"),
                f && f.c(),
                s = os(),
                d && d.c(),
                as(e, "glass", ""),
                as(e, "class", "svelte-4llsvh"),
                as(o, "content", ""),
                as(o, "class", "svelte-4llsvh"),
                as(r, "wrapper", ""),
                as(r, "class", "svelte-4llsvh"),
                as(n, "position", t[2]),
                n.open = !0,
                as(n, "class", "svelte-4llsvh"),
                hs(n, "wide", t[5]),
                hs(n, "horizontal-buttons", t[4])
            },
            m(l, h) {
                ts(l, n, h),
                Qo(n, e),
                Qo(n, i),
                Qo(n, r),
                Qo(r, o),
                f && f.m(o, null),
                Qo(r, s),
                d && d.m(r, null),
                u = !0,
                a || (c = us(e, "click", t[11]),
                a = !0)
            },
            p(t, e) {
                f && f.p && 262144 & e && Uo(f, l, t, t[18], e, null, null),
                t[1] || !t[7] && !t[9] ? d && (Ps(),
                Hs(d, 1, 1, ( () => {
                    d = null
                }
                )),
                qs()) : d ? (d.p(t, e),
                642 & e && Ls(d, 1)) : (d = el(t),
                d.c(),
                Ls(d, 1),
                d.m(r, null)),
                (!u || 4 & e) && as(n, "position", t[2]),
                32 & e && hs(n, "wide", t[5]),
                16 & e && hs(n, "horizontal-buttons", t[4])
            },
            i(t) {
                u || (Ls(f, t),
                Ls(d),
                u = !0)
            },
            o(t) {
                Hs(f, t),
                Hs(d),
                u = !1
            },
            d(t) {
                t && ns(n),
                f && f.d(t),
                d && d.d(),
                a = !1,
                c()
            }
        }
    }
    function el(t) {
        let n, e, i, r;
        e = new tl({
            props: {
                size: t[7] ? "big" : "medium",
                disabled: t[6] || t[3],
                theme: t[7] ? "primary" : void 0,
                $$slots: {
                    default: [il]
                },
                $$scope: {
                    ctx: t
                }
            }
        }),
        e.$on("click", t[16]);
        let o = t[9] && rl(t);
        return {
            c() {
                n = is("div"),
                Ys(e.$$.fragment),
                i = os(),
                o && o.c(),
                as(n, "class", "buttons svelte-4llsvh")
            },
            m(t, s) {
                ts(t, n, s),
                Zs(e, n, null),
                Qo(n, i),
                o && o.m(n, null),
                r = !0
            },
            p(t, i) {
                const r = {};
                128 & i && (r.size = t[7] ? "big" : "medium"),
                72 & i && (r.disabled = t[6] || t[3]),
                128 & i && (r.theme = t[7] ? "primary" : void 0),
                262400 & i && (r.$$scope = {
                    dirty: i,
                    ctx: t
                }),
                e.$set(r),
                t[9] ? o ? (o.p(t, i),
                512 & i && Ls(o, 1)) : (o = rl(t),
                o.c(),
                Ls(o, 1),
                o.m(n, null)) : o && (Ps(),
                Hs(o, 1, 1, ( () => {
                    o = null
                }
                )),
                qs())
            },
            i(t) {
                r || (Ls(e.$$.fragment, t),
                Ls(o),
                r = !0)
            },
            o(t) {
                Hs(e.$$.fragment, t),
                Hs(o),
                r = !1
            },
            d(t) {
                t && ns(n),
                Qs(e),
                o && o.d()
            }
        }
    }
    function il(t) {
        let n;
        return {
            c() {
                n = rs(t[8])
            },
            m(t, e) {
                ts(t, n, e)
            },
            p(t, e) {
                256 & e && fs(n, t[8])
            },
            d(t) {
                t && ns(n)
            }
        }
    }
    function rl(t) {
        let n, e;
        return n = new tl({
            props: {
                size: t[7] ? "big" : "medium",
                disabled: t[6],
                theme: t[7] ? "secondary" : void 0,
                $$slots: {
                    default: [ol]
                },
                $$scope: {
                    ctx: t
                }
            }
        }),
        n.$on("click", t[17]),
        {
            c() {
                Ys(n.$$.fragment)
            },
            m(t, i) {
                Zs(n, t, i),
                e = !0
            },
            p(t, e) {
                const i = {};
                128 & e && (i.size = t[7] ? "big" : "medium"),
                64 & e && (i.disabled = t[6]),
                128 & e && (i.theme = t[7] ? "secondary" : void 0),
                262656 & e && (i.$$scope = {
                    dirty: e,
                    ctx: t
                }),
                n.$set(i)
            },
            i(t) {
                e || (Ls(n.$$.fragment, t),
                e = !0)
            },
            o(t) {
                Hs(n.$$.fragment, t),
                e = !1
            },
            d(t) {
                Qs(n, t)
            }
        }
    }
    function ol(t) {
        let n;
        return {
            c() {
                n = rs(t[9])
            },
            m(t, e) {
                ts(t, n, e)
            },
            p(t, e) {
                512 & e && fs(n, t[9])
            },
            d(t) {
                t && ns(n)
            }
        }
    }
    function sl(t) {
        let n, e, i = t[0] && nl(t);
        return {
            c() {
                i && i.c(),
                n = ss()
            },
            m(t, r) {
                i && i.m(t, r),
                ts(t, n, r),
                e = !0
            },
            p(t, [e]) {
                t[0] ? i ? (i.p(t, e),
                1 & e && Ls(i, 1)) : (i = nl(t),
                i.c(),
                Ls(i, 1),
                i.m(n.parentNode, n)) : i && (Ps(),
                Hs(i, 1, 1, ( () => {
                    i = null
                }
                )),
                qs())
            },
            i(t) {
                e || (Ls(i),
                e = !0)
            },
            o(t) {
                Hs(i),
                e = !1
            },
            d(t) {
                i && i.d(t),
                t && ns(n)
            }
        }
    }
    function ul(t, n, e) {
        let {$$slots: i={}, $$scope: r} = n;
        const o = {
            CENTER: "center",
            BOTTOM: "bottom"
        };
        let s, u, a, {open: c=!1} = n, {noButtons: l=!1} = n, {position: f=o.CENTER} = n, {action: d=(async () => !0)} = n, {okButtonText: h="确认"} = n, {cancelButtonText: v="取消"} = n, {okButtonDisabled: p=!1} = n, {horizontalButtons: m=!1} = n, {wide: y=!1} = n, g = !1;
        async function b(t) {
            t ? e(8, u = "请稍后...") : e(9, a = "请稍后..."),
            e(6, g = !0);
            const n = await d(t);
            e(6, g = !1),
            t ? e(8, u = h) : e(9, a = v),
            n && e(0, c = !1)
        }
        return t.$$set = t => {
            "open"in t && e(0, c = t.open),
            "noButtons"in t && e(1, l = t.noButtons),
            "position"in t && e(2, f = t.position),
            "action"in t && e(12, d = t.action),
            "okButtonText"in t && e(13, h = t.okButtonText),
            "cancelButtonText"in t && e(14, v = t.cancelButtonText),
            "okButtonDisabled"in t && e(3, p = t.okButtonDisabled),
            "horizontalButtons"in t && e(4, m = t.horizontalButtons),
            "wide"in t && e(5, y = t.wide),
            "$$scope"in t && e(18, r = t.$$scope)
        }
        ,
        t.$$.update = () => {
            4 & t.$$.dirty && e(7, s = f === o.CENTER),
            8192 & t.$$.dirty && e(8, u = h),
            16384 & t.$$.dirty && e(9, a = v),
            1 & t.$$.dirty && mr("lock", c)
        }
        ,
        [c, l, f, p, m, y, g, s, u, a, b, function() {
            v || b(!0)
        }
        , d, h, v, i, () => b(!0), () => b(!1), r]
    }
    class al extends eu {
        constructor(t) {
            super(),
            nu(this, t, ul, sl, Po, {
                open: 0,
                noButtons: 1,
                position: 2,
                action: 12,
                okButtonText: 13,
                cancelButtonText: 14,
                okButtonDisabled: 3,
                horizontalButtons: 4,
                wide: 5
            })
        }
    }
    function cl(t) {
        let n, e, i, r, o;
        return {
            c() {
                n = is("div"),
                e = rs(t[3]),
                i = os(),
                r = is("div"),
                o = rs(t[4]),
                as(n, "title", ""),
                as(r, "description", "")
            },
            m(t, s) {
                ts(t, n, s),
                Qo(n, e),
                ts(t, i, s),
                ts(t, r, s),
                Qo(r, o)
            },
            p(t, n) {
                8 & n && fs(e, t[3]),
                16 & n && fs(o, t[4])
            },
            d(t) {
                t && ns(n),
                t && ns(i),
                t && ns(r)
            }
        }
    }
    function ll(t) {
        let n, e, i, r, o;
        function s(n) {
            t[5](n)
        }
        function u(n) {
            t[6](n)
        }
        function a(n) {
            t[7](n)
        }
        let c = {
            action: gl,
            $$slots: {
                default: [cl]
            },
            $$scope: {
                ctx: t
            }
        };
        return void 0 !== t[0] && (c.open = t[0]),
        void 0 !== t[1] && (c.okButtonText = t[1]),
        void 0 !== t[2] && (c.cancelButtonText = t[2]),
        n = new al({
            props: c
        }),
        Ts.push(( () => Ks(n, "open", s))),
        Ts.push(( () => Ks(n, "okButtonText", u))),
        Ts.push(( () => Ks(n, "cancelButtonText", a))),
        {
            c() {
                Ys(n.$$.fragment)
            },
            m(t, e) {
                Zs(n, t, e),
                o = !0
            },
            p(t, [o]) {
                const s = {};
                280 & o && (s.$$scope = {
                    dirty: o,
                    ctx: t
                }),
                !e && 1 & o && (e = !0,
                s.open = t[0],
                Ms(( () => e = !1))),
                !i && 2 & o && (i = !0,
                s.okButtonText = t[1],
                Ms(( () => i = !1))),
                !r && 4 & o && (r = !0,
                s.cancelButtonText = t[2],
                Ms(( () => r = !1))),
                n.$set(s)
            },
            i(t) {
                o || (Ls(n.$$.fragment, t),
                o = !0)
            },
            o(t) {
                Hs(n.$$.fragment, t),
                o = !1
            },
            d(t) {
                Qs(n, t)
            }
        }
    }
    const fl = ou("")
      , dl = ou("")
      , hl = ou("确认")
      , vl = ou("取消")
      , pl = ou(!1);
    let ml = () => {}
    ;
    function yl(t, n, e={}) {
        fl.set(t),
        dl.set(n);
        const {okButtonText: i="确认", cancelButtonText: r="取消"} = e;
        return hl.set(i),
        vl.set(r),
        pl.set(!0),
        new Promise((t => ml = t))
    }
    async function gl(t) {
        return ml(t),
        !0
    }
    function bl(t, n, e) {
        let i, r, o, s, u;
        return qo(t, pl, (t => e(0, i = t))),
        qo(t, hl, (t => e(1, r = t))),
        qo(t, vl, (t => e(2, o = t))),
        qo(t, fl, (t => e(3, s = t))),
        qo(t, dl, (t => e(4, u = t))),
        [i, r, o, s, u, function(t) {
            i = t,
            pl.set(i)
        }
        , function(t) {
            r = t,
            hl.set(r)
        }
        , function(t) {
            o = t,
            vl.set(o)
        }
        ]
    }
    class wl extends eu {
        constructor(t) {
            super(),
            nu(this, t, bl, ll, Po, {})
        }
    }
    function xl(t, n, e) {
        const i = t.slice();
        return i[2] = n[e],
        i
    }
    function kl(t) {
        let n, e, i = t[2] + "";
        return {
            c() {
                n = is("span"),
                e = rs(i),
                as(n, "class", "tag svelte-cvo9df")
            },
            m(t, i) {
                ts(t, n, i),
                Qo(n, e)
            },
            p(t, n) {
                1 & n && i !== (i = t[2] + "") && fs(e, i)
            },
            d(t) {
                t && ns(n)
            }
        }
    }
    function El(t) {
        let n, e = t[0], i = [];
        for (let n = 0; n < e.length; n += 1)
            i[n] = kl(xl(t, e, n));
        return {
            c() {
                n = is("div");
                for (let t = 0; t < i.length; t += 1)
                    i[t].c();
                as(n, "class", "sheet-tags svelte-cvo9df"),
                hs(n, "inverseColor", t[1])
            },
            m(t, e) {
                ts(t, n, e);
                for (let t = 0; t < i.length; t += 1)
                    i[t].m(n, null)
            },
            p(t, [r]) {
                if (1 & r) {
                    let o;
                    for (e = t[0],
                    o = 0; o < e.length; o += 1) {
                        const s = xl(t, e, o);
                        i[o] ? i[o].p(s, r) : (i[o] = kl(s),
                        i[o].c(),
                        i[o].m(n, null))
                    }
                    for (; o < i.length; o += 1)
                        i[o].d(1);
                    i.length = e.length
                }
                2 & r && hs(n, "inverseColor", t[1])
            },
            i: Fo,
            o: Fo,
            d(t) {
                t && ns(n),
                es(i, t)
            }
        }
    }
    function Xl(t, n, e) {
        let {tags: i=[]} = n
          , {inverseColor: r=!1} = n;
        return t.$$set = t => {
            "tags"in t && e(0, i = t.tags),
            "inverseColor"in t && e(1, r = t.inverseColor)
        }
        ,
        [i, r]
    }
    class Sl extends eu {
        constructor(t) {
            super(),
            nu(this, t, Xl, El, Po, {
                tags: 0,
                inverseColor: 1
            })
        }
    }
    function Tl(t, n, e) {
        const i = t.slice();
        return i[6] = n[e],
        i
    }
    function Cl(t, n, e) {
        const i = t.slice();
        return i[9] = n[e],
        i
    }
    function jl(t) {
        let n;
        return {
            c() {
                n = rs("(必填)")
            },
            m(t, e) {
                ts(t, n, e)
            },
            d(t) {
                t && ns(n)
            }
        }
    }
    function Ol(t) {
        let n;
        return {
            c() {
                n = rs("(选填)")
            },
            m(t, e) {
                ts(t, n, e)
            },
            d(t) {
                t && ns(n)
            }
        }
    }
    function Al(t) {
        let n, e, i, r, o, s, u, a, c, l = t[9] + "";
        return {
            c() {
                n = is("div"),
                e = is("input"),
                r = os(),
                o = is("label"),
                s = rs(l),
                u = os(),
                as(e, "id", "id" + t[6].name + t[9]),
                as(e, "type", "radio"),
                as(e, "name", "radio-" + t[6].name),
                e.checked = i = t[0].includes(t[9]),
                as(e, "data-tag", t[9]),
                as(e, "class", "svelte-2jj741"),
                as(o, "for", "id" + t[6].name + t[9]),
                as(o, "class", "svelte-2jj741"),
                as(n, "class", "option svelte-2jj741")
            },
            m(i, l) {
                ts(i, n, l),
                Qo(n, e),
                Qo(n, r),
                Qo(n, o),
                Qo(o, s),
                Qo(n, u),
                a || (c = us(e, "change", t[4]),
                a = !0)
            },
            p(t, n) {
                1 & n && i !== (i = t[0].includes(t[9])) && (e.checked = i)
            },
            d(t) {
                t && ns(n),
                a = !1,
                c()
            }
        }
    }
    function Dl(t) {
        let n, e, i, r, o, s, u, a, c, l, f, d, h, v, p, m, y, g = t[6].name + "";
        let b = function(t, n) {
            return t[6].optional ? Ol : jl
        }(t)(t)
          , w = t[6].options
          , x = [];
        for (let n = 0; n < w.length; n += 1)
            x[n] = Al(Cl(t, w, n));
        return {
            c() {
                n = is("div"),
                e = is("div"),
                i = is("span"),
                r = rs(g),
                o = os(),
                s = is("sub"),
                b.c(),
                u = os(),
                a = is("div"),
                c = is("div"),
                l = is("input"),
                f = os(),
                d = is("label"),
                h = rs("未选择"),
                v = os();
                for (let t = 0; t < x.length; t += 1)
                    x[t].c();
                p = os(),
                as(s, "class", "svelte-2jj741"),
                as(e, "class", "category svelte-2jj741"),
                as(l, "id", "id" + t[6].name + "cancel"),
                as(l, "type", "radio"),
                as(l, "name", "radio-" + t[6].name),
                l.checked = !0,
                as(l, "class", "svelte-2jj741"),
                as(d, "for", "id" + t[6].name + "cancel"),
                as(d, "class", "svelte-2jj741"),
                as(c, "class", "option none svelte-2jj741"),
                as(a, "class", "options svelte-2jj741"),
                as(n, "class", "line svelte-2jj741")
            },
            m(g, w) {
                ts(g, n, w),
                Qo(n, e),
                Qo(e, i),
                Qo(i, r),
                Qo(e, o),
                Qo(e, s),
                b.m(s, null),
                Qo(n, u),
                Qo(n, a),
                Qo(a, c),
                Qo(c, l),
                Qo(c, f),
                Qo(c, d),
                Qo(d, h),
                Qo(a, v);
                for (let t = 0; t < x.length; t += 1)
                    x[t].m(a, null);
                Qo(n, p),
                m || (y = us(l, "change", t[4]),
                m = !0)
            },
            p(t, n) {
                if (25 & n) {
                    let e;
                    for (w = t[6].options,
                    e = 0; e < w.length; e += 1) {
                        const i = Cl(t, w, e);
                        x[e] ? x[e].p(i, n) : (x[e] = Al(i),
                        x[e].c(),
                        x[e].m(a, null))
                    }
                    for (; e < x.length; e += 1)
                        x[e].d(1);
                    x.length = w.length
                }
            },
            d(t) {
                t && ns(n),
                b.d(),
                es(x, t),
                m = !1,
                y()
            }
        }
    }
    function Ml(t) {
        let n, e = t[3], i = [];
        for (let n = 0; n < e.length; n += 1)
            i[n] = Dl(Tl(t, e, n));
        return {
            c() {
                n = is("div");
                for (let t = 0; t < i.length; t += 1)
                    i[t].c();
                as(n, "class", "sheet-tags svelte-2jj741"),
                hs(n, "mobile", t[1])
            },
            m(e, r) {
                ts(e, n, r);
                for (let t = 0; t < i.length; t += 1)
                    i[t].m(n, null);
                t[5](n)
            },
            p(t, [r]) {
                if (25 & r) {
                    let o;
                    for (e = t[3],
                    o = 0; o < e.length; o += 1) {
                        const s = Tl(t, e, o);
                        i[o] ? i[o].p(s, r) : (i[o] = Dl(s),
                        i[o].c(),
                        i[o].m(n, null))
                    }
                    for (; o < i.length; o += 1)
                        i[o].d(1);
                    i.length = e.length
                }
                2 & r && hs(n, "mobile", t[1])
            },
            i: Fo,
            o: Fo,
            d(e) {
                e && ns(n),
                es(i, e),
                t[5](null)
            }
        }
    }
    function _l(t, n, e) {
        let {tags: i=[]} = n
          , {mobile: r=!1} = n;
        let o;
        return t.$$set = t => {
            "tags"in t && e(0, i = t.tags),
            "mobile"in t && e(1, r = t.mobile)
        }
        ,
        [i, r, o, [{
            name: "语言",
            options: ["纯音乐", "国语", "粤语", "闽南语", "英语", "法语", "日语", "韩语", "泰语", "其他语言"]
        }, {
            name: "风格",
            options: ["流行", "古典", "爵士", "摇滚", "民谣", "古风", "电子", "民族", "红歌", "儿歌"]
        }, {
            name: "编配",
            options: ["高还原", "简化", "改编", "串烧", "原创"]
        }, {
            name: "其他标签",
            optional: !0,
            options: ["轻音乐", "动漫音乐", "游戏音乐", "影视歌曲", "考级"]
        }], async function() {
            const t = vr(o, "input[type=radio]:checked")
              , n = [];
            for (const e of t) {
                const t = e.dataset.tag;
                t && n.push(t)
            }
            e(0, i = n)
        }
        , function(t) {
            Ts[t ? "unshift" : "push"](( () => {
                o = t,
                e(2, o)
            }
            ))
        }
        ]
    }
    class $l extends eu {
        constructor(t) {
            super(),
            nu(this, t, _l, Ml, Po, {
                tags: 0,
                mobile: 1
            })
        }
    }
    class Bl {
        constructor(t, n) {
            this.nn = t,
            this.en = n,
            this.rn = JSON.stringify(n()),
            this.sn = v().id,
            this.un = new Xr,
            this.an = new Xr,
            this.cn = !1,
            this.ln = function(t) {
                let n, e;
                return async (...i) => {
                    n && (n.cancel(),
                    e.cancelled = !0),
                    n = t(...i),
                    Zr(n instanceof Promise, "cancelPendingTask: Task is not async!"),
                    Zr("function" == typeof n.cancel, "cancelPendingTask: Task not cancellable!"),
                    e = {
                        cancelled: !1
                    };
                    const r = e;
                    try {
                        return await n
                    } finally {
                        r.cancelled || (n = null)
                    }
                }
            }(To),
            this.fn = t => (t.preventDefault(),
            t.returnValue = "确认退出么？尚有未保存修改")
        }
        contentChange() {
            this.dn && clearTimeout(this.dn),
            this.dn = setTimeout(( () => {
                this.save()
            }
            ), this.nn),
            this.cn || (this.cn = !0,
            this.hn())
        }
        onSaveStart(t) {
            return this.un.add(t)
        }
        onSaveEnd(t) {
            return this.an.add(t)
        }
        async save(t, n) {
            const e = this.en();
            this.vn();
            const i = JSON.stringify(e);
            if (t || this.rn !== i) {
                let r;
                await this.un.fire();
                try {
                    r = await this.ln({
                        id: this.sn,
                        ...e
                    }, t, n),
                    !this.sn && r && (this.sn = r.id,
                    history.replaceState(void 0, void 0, "#id=" + this.sn)),
                    this.rn = i
                } finally {
                    await this.an.fire(r)
                }
            }
        }
        hn() {
            self.addEventListener("beforeunload", this.fn, {
                capture: !0
            })
        }
        vn() {
            self.removeEventListener("beforeunload", this.fn, {
                capture: !0
            })
        }
    }
    const Fl = {
        [m.GUITAR]: [{
            timeSignature: "2/4",
            title: "节奏型一",
            value: "(6 3) (2 3)"
        }, {
            timeSignature: "2/4",
            title: "节奏型二",
            value: "(6 (3 2)) (1 (3 2)"
        }, {
            timeSignature: "2/4",
            title: "节奏型三",
            value: "(6 (3 2)) ((1 3 2 1))"
        }, {
            timeSignature: "2/4",
            title: "节奏型四",
            value: "(6 3 2) (6 3 2)"
        }, {
            timeSignature: "2/4",
            title: "节奏型五",
            value: "d (d u)"
        }, {
            timeSignature: "2/4",
            title: "节奏型六",
            value: "d (d (d u))"
        }, {
            timeSignature: "2/4",
            title: "节奏型七",
            value: "d ((d u) d)"
        }, {
            timeSignature: "2/4",
            title: "节奏型八",
            value: "d ((d u d u))"
        }, {
            timeSignature: "3/4",
            title: "节奏型一",
            value: "d u d"
        }, {
            timeSignature: "3/4",
            title: "节奏型二",
            value: "d u (d u)"
        }, {
            timeSignature: "3/4",
            title: "节奏型三",
            value: "d (d u) (d u)"
        }, {
            timeSignature: "3/4",
            title: "节奏型四",
            value: "(d u) (d u) (d u)"
        }, {
            timeSignature: "4/4",
            title: "节奏型一",
            value: "(6 3) (2 3) (1 3) (2 3)"
        }, {
            timeSignature: "4/4",
            title: "节奏型二",
            value: "(6 (3 2)) (1 (2 3)) (6 (2 3)) (1 (2 3))"
        }, {
            timeSignature: "4/4",
            title: "节奏型三",
            value: "(6 (3 2)) ((1 3 2 1)) (6 (3 2)) ((1 3 2 1))"
        }, {
            timeSignature: "4/4",
            title: "节奏型四",
            value: "(6 3 2) (4 3 2) (6 3 2) (4 3 2)"
        }, {
            timeSignature: "4/4",
            title: "节奏型五",
            value: "d (d u) d (d u)"
        }, {
            timeSignature: "4/4",
            title: "节奏型六",
            value: "d (d (d u)) d(d (d u))"
        }, {
            timeSignature: "4/4",
            title: "节奏型七",
            value: "d (d (d u)) ((d u)) d) (d (d u))"
        }, {
            timeSignature: "4/4",
            title: "节奏型八",
            value: "d (d (d u)) ((d u d u)) (d (d u))"
        }, {
            timeSignature: "6/8",
            title: "节奏型一",
            value: "(6 3 2) (1 2 3)"
        }, {
            timeSignature: "6/8",
            title: "节奏型二",
            value: "(6 3 (2 1)) (6 3 2)"
        }, {
            timeSignature: "6/8",
            title: "节奏型三",
            value: "(6 3 (2 1)) (6 (3 2 3 1))"
        }, {
            timeSignature: "6/8",
            title: "节奏型四",
            value: "(6 3 (2 1)) ((6 3 2 3 1 2))"
        }],
        [m.UKULELE]: [{
            timeSignature: "2/4",
            title: "节奏型一",
            value: "(124 3)(12 3)"
        }, {
            timeSignature: "2/4",
            title: "节奏型二",
            value: "(124 (3 2))(1 (3 2))"
        }, {
            timeSignature: "2/4",
            title: "节奏型三",
            value: "(124 (3 2))((1 3 2 1))"
        }, {
            timeSignature: "2/4",
            title: "节奏型四",
            value: "(124 3 2)(124 3 2)"
        }, {
            timeSignature: "2/4",
            title: "节奏型五",
            value: "d (d u)"
        }, {
            timeSignature: "2/4",
            title: "节奏型六",
            value: "d (d (d u))"
        }, {
            timeSignature: "2/4",
            title: "节奏型七",
            value: "d ((d u) d)"
        }, {
            timeSignature: "2/4",
            title: "节奏型八",
            value: "d ((d u d u))"
        }, {
            timeSignature: "3/4",
            title: "节奏型一",
            value: "d u d"
        }, {
            timeSignature: "3/4",
            title: "节奏型二",
            value: "d u (d u)"
        }, {
            timeSignature: "3/4",
            title: "节奏型三",
            value: "d (d u) (d u)"
        }, {
            timeSignature: "3/4",
            title: "节奏型四",
            value: "(d u) (d u) (d u)"
        }, {
            timeSignature: "4/4",
            title: "节奏型一",
            value: "(6 3) (2 3) (1 3) (2 3)"
        }, {
            timeSignature: "4/4",
            title: "节奏型二",
            value: "(6 (3 2)) (1 (2 3)) (6 (2 3)) (1 (2 3))"
        }, {
            timeSignature: "4/4",
            title: "节奏型三",
            value: "(6 (3 2)) ((1 3 2 1)) (6 (3 2)) ((1 3 2 1))"
        }, {
            timeSignature: "4/4",
            title: "节奏型四",
            value: "(124 3) (2 3) (1 3) (2 3)"
        }, {
            timeSignature: "4/4",
            title: "节奏型五",
            value: "(124 (3 2)) (1 (2 3)) (6 (3 2)) (1 (2 3))"
        }, {
            timeSignature: "4/4",
            title: "节奏型六",
            value: "(124 (3 2)) ((1 3 2 1)) (6 (3 2)) ((1 3 2 1))"
        }, {
            timeSignature: "4/4",
            title: "节奏型七",
            value: "d (d (d u)) ((d u)) d) (d (d u))"
        }, {
            timeSignature: "4/4",
            title: "节奏型八",
            value: "(124 3 2) (1 3 2) (124 3 2) (1 3 2)"
        }, {
            timeSignature: "6/8",
            title: "节奏型一",
            value: "(124 3 2) (1 2 3)"
        }, {
            timeSignature: "6/8",
            title: "节奏型二",
            value: "(124 3 (2 1)) (124 3 2)"
        }, {
            timeSignature: "6/8",
            title: "节奏型三",
            value: "(124 3 (2 1)) (124 (3 2 3 1))"
        }, {
            timeSignature: "6/8",
            title: "节奏型四",
            value: "(124 3 (2 1)) ((124 3 2 3 1 2))"
        }]
    };
    function Il(t, n) {
        return Fl[n].filter((n => n.timeSignature === t))
    }
    const Rl = {
        C: ["C", "Dm", "Em", "F", "G", "Am", "G7"],
        "C#": ["C#", "D#m", "Fm", "F#", "G#", "A#", "G#7"],
        Db: ["Db", "Ebm", "Fm", "Gb", "Ab", "Bbm", "Ab7"],
        D: ["D", "Em", "F#m", "G", "A", "Bm", "A7"],
        "D#": ["D#", "Fm", "Gm", "G#", "A#", "Cm", "A#7"],
        Eb: ["Eb", "Fm", "Gm", "Ab", "Bb", "Cm", "Bb7"],
        E: ["E", "F#m", "G#m", "A", "B", "C#m", "B7"],
        F: ["F", "Gm", "Am", "Bb", "C", "Dm", "C7"],
        "F#": ["F#", "G#m", "A#", "B", "C#", "D#m", "C#7"],
        Gb: ["Gb", "Abm", "Bbm", "B", "Db", "Ebm", "Eb7"],
        G: ["G", "Am", "Bm", "C", "D", "Em", "D7"],
        "G#": ["G#", "A#", "Cm", "C#", "D#", "Fm", "D#7"],
        Ab: ["Ab", "Bbm", "Cm", "Db", "Eb", "Fm", "Eb7"],
        A: ["A", "Bm", "C#m", "D", "E", "F#m", "E7"],
        "A#": ["A#", "Cm", "Dm", "D#", "F", "Gm", "F7"],
        Bb: ["Bb", "Cm", "Dm", "Eb", "F", "Gm", "F7"],
        B: ["B", "C#m", "D#m", "E", "F#", "G#m", "F#7"]
    }
      , Nl = [{
        title: "4/4",
        value: "4/4"
    }, {
        title: "2/4",
        value: "2/4"
    }, {
        title: "3/4",
        value: "3/4"
    }, {
        title: "6/8",
        value: "6/8"
    }]
      , Gl = Object.keys(Rl).map((t => ({
        title: t,
        value: t
    })));
    function zl(t) {
        let n, e, i, r;
        return {
            c() {
                n = is("button"),
                e = rs(""),
                n.disabled = t[2],
                as(n, "type", "button"),
                as(n, "class", "cancel yoopu3-icon svelte-4q4jwj")
            },
            m(o, s) {
                ts(o, n, s),
                Qo(n, e),
                i || (r = us(n, "click", t[6]),
                i = !0)
            },
            p(t, e) {
                4 & e && (n.disabled = t[2])
            },
            d(t) {
                t && ns(n),
                i = !1,
                r()
            }
        }
    }
    function Pl(t) {
        let n, e, i, r, o, s, u, a = t[0] && zl(t);
        return {
            c() {
                n = is("form"),
                e = is("i"),
                e.textContent = "",
                i = os(),
                r = is("input"),
                o = os(),
                a && a.c(),
                as(e, "class", "icon yoopu3-icon svelte-4q4jwj"),
                as(r, "class", "search-input svelte-4q4jwj"),
                as(r, "type", "text"),
                r.disabled = t[2],
                as(r, "placeholder", t[1]),
                as(r, "autocomplete", "off"),
                as(n, "class", "search-wrapper svelte-4q4jwj"),
                hs(n, "white", t[3])
            },
            m(c, l) {
                ts(c, n, l),
                Qo(n, e),
                Qo(n, i),
                Qo(n, r),
                t[11](r),
                ds(r, t[0]),
                Qo(n, o),
                a && a.m(n, null),
                s || (u = [us(r, "input", t[12]), us(r, "focus", t[8]), us(r, "blur", t[9]), us(r, "input", t[10]), us(n, "submit", t[5])],
                s = !0)
            },
            p(t, [e]) {
                4 & e && (r.disabled = t[2]),
                2 & e && as(r, "placeholder", t[1]),
                1 & e && r.value !== t[0] && ds(r, t[0]),
                t[0] ? a ? a.p(t, e) : (a = zl(t),
                a.c(),
                a.m(n, null)) : a && (a.d(1),
                a = null),
                8 & e && hs(n, "white", t[3])
            },
            i: Fo,
            o: Fo,
            d(e) {
                e && ns(n),
                t[11](null),
                a && a.d(),
                s = !1,
                Go(u)
            }
        }
    }
    function ql(t, n, e) {
        let {query: i=""} = n
          , {placeholder: r=""} = n
          , {disabled: o=!1} = n
          , {white: s=!1} = n;
        const u = Es();
        let a;
        return t.$$set = t => {
            "query"in t && e(0, i = t.query),
            "placeholder"in t && e(1, r = t.placeholder),
            "disabled"in t && e(2, o = t.disabled),
            "white"in t && e(3, s = t.white)
        }
        ,
        [i, r, o, s, a, function(t) {
            o || (t.preventDefault(),
            a && a.blur(),
            i && i.trim().length > 0 && u("search", {
                query: i
            }))
        }
        , function() {
            a && a.focus(),
            e(0, i = ""),
            u("clear")
        }
        , function() {
            a && a.focus()
        }
        , function(n) {
            Xs(t, n)
        }
        , function(n) {
            Xs(t, n)
        }
        , function(n) {
            Xs(t, n)
        }
        , function(t) {
            Ts[t ? "unshift" : "push"](( () => {
                a = t,
                e(4, a)
            }
            ))
        }
        , function() {
            i = this.value,
            e(0, i)
        }
        ]
    }
    class Ll extends eu {
        constructor(t) {
            super(),
            nu(this, t, ql, Pl, Po, {
                query: 0,
                placeholder: 1,
                disabled: 2,
                white: 3,
                focus: 7
            })
        }
        get focus() {
            return this.$$.ctx[7]
        }
    }
    const Hl = ["A=1;X,0,2(1),2(2),2(3),0", "Am=1;X,0,2(2),2(3),1(1),0", "Adim=1;X,0,1(2),2(3),1(1),X", "Aaug=1;X,0,3(4),2(2),2(3),1(1)", "Amaj7=1;X,0,2(2),1(1),2(3),0", "Am7=1;X,0,2(2),0,1(1),0", "A7=1;X,0,2(2),0,2(3),0", "Adim7=1;X,0,1(1),2(3),1(2),2(4)", "AmM7=1;X,0,2(3),1(1),1(2),0", "Aaug7=0;X,0,3(4),0,2(3),1(2)", "Am7b5=1;X,0,1(1),2(3),1(2),3(4)", "Asus2=1;X,0,2(1),2(2),0,0", "Asus4=1;X,0,0,2(1),3(2),0", "A7sus2=1;X,0,2(1),0,0,0", "A7sus4=1;X,0,2(2),0,3(3),0", "A6=1;X,0,4(4),2(1),2(2),0", "Am6=1;X,0,2(2),2(3),1(1),2(4)", "Amaj9=1;X,0,X,4(2),2(1),4(3)", "Am9=1;X,0,2(2),4(4),1(1),3(3)", "A9=1;X,0,2(1),4(4),2(2),3(3)", "Aadd9=1;X,0,2(1),4(4),2(2),0", "Amadd9=1;X,0,2(2),4(4),1(1),0", "Aadd11=1;X,0,0,2(2),2(3),0", "A5=1;X,0,2(1),2(2),X,X", "A/C#=1;X,4(3),2(1),2(1),2(1),0", "A/E=1;0,0,2(1),2(1),2(1),0", "Bb=1;X,1(1),3(2),3(3),3(4),1(1)", "Bbm=1;X,1(1),3(3),3(4),2(2),1(1)", "Bbdim=1;X,1(1),2(2),3(4),2(3),0", "Bbaug=1;X,1(1),0,3(3),3(4),2(2)", "Bbmaj7=1;X,1(1),3(3),2(2),3(4),1(1)", "Bbm7=1;X,1(1),3(3),1(1),2(2),1(1)", "Bb7=1;X,1(1),3(3),1(1),3(4),1(1)", "Bbdim7=1;X,1(1),2(2),0,2(3),0", "BbmM7=1;X,1(1),3(4),2(2),2(3),1(1)", "Bbaug7=0;X,1(1),0,1(2),3(4),2(3)", "Bbm7b5=1;X,1(1),2(3),1(2),2(4),0", "Bbsus2=1;X,1(1),3(2),3(3),1(1),1(1)", "Bbsus4=1;X,1(1),1(1),3(2),4(3),1(1)", "Bb7sus2=1;X,1(1),3(3),1(1),1(1),1(1)", "Bb7sus4=1;X,1(1),1(1),1(1),4(4),1(1)", "Bb6=1;X,1(1),0,0,3(4),1(2)", "Bbm6=1;X,1(1),3(4),0,2(3),1(2)", "Bbmaj9=1;X,1(1),0,2(4),1(2),1(3)", "Bbm9=5;2(1),4(2),2(1),2(1),2(1),4(3)", "Bb9=1;X,1(1),0,1(2),1(3),1(4)", "Bbadd9=1;X,1(T),0,X,1(1),1(2)", "Bbmadd9=3;4(T),1(1),X,4(3),4(4),X", "Bbadd11=1;X,1(1),1(1),3(3),3(4),1(1)", "Bb5=1;X,1(1),3(3),3(4),X,X", "B=1;X,2(1),4(2),4(3),4(4),2(1)", "Bm=1;X,2(1),4(4),4(3),3(2),2(1)", "Bdim=1;X,2(2),0,4(4),3(3),1(1)", "Baug=1;X,2(2),1(1),0,0,3(3)", "Bmaj7=1;X,2(1),4(3),3(2),4(4),2(1)", "Bm7=1;X,2(1),4(4),2(1),3(2),2(1)", "B7=1;X,2(2),1(1),2(3),0,2(4)", "Bdim7=1;X,2(2),3(3),1(1),3(4),X", "BmM7=1;X,2(1),0,3(3),0,2(2)", "Baug7=0;X,2(2),1(1),2(3),0,3(4)", "Bm7b5=1;X,2(1),3(3),2(2),3(4),X", "Bsus2=1;X,2(1),4(2),4(3),2(1),2(1)", "Bsus4=2;X,1(1),1(1),3(2),4(3),1(1)", "B7sus2=1;X,2(1),4(2),2(1),2(1),2(1)", "B7sus4=1;X,2(1),4(3),2(1),5(4),2(1)", "B6=1;X,2(3),1(1),1(2),0,2(4)", "Bm6=1;X,2(2),0,1(1),0,2(3)", "Bmaj9=1;X,2(2),1(1),3(4),2(3),X", "Bm9=1;X,2(1),0,2(2),2(3),2(4)", "B9=1;X,2(2),1(1),2(3),2(4),X", "Badd9=0;X,2(2),1(1),X,2(3),2(4)", "Bmadd9=1;X,2(T),0,4(3),2(1),2(1)", "Badd11=1;X,2(1),2(1),4(3),4(4),2(1)", "B5=1;X,2(1),4(3),4(4),X,X", "C=1;X,3(3),2(2),0,1(1),0", "Cm=3;X,1(1),3(3),3(4),2(2),1(1)", "Cdim=3;X,1(1),2(2),3(4),2(3),X", "Caug=1;X,3(4),2(3),1(1),1(2),0", "Cmaj7=1;X,3(2),2(1),0,0,0", "Cm7=3;X,1(1),3(3),1(1),2(2),1(1)", "C7=1;X,3(3),2(2),3(4),1(1),0", "Cdim7=1;X,3(2),4(3),2(1),4(4),X", "CmM7=1;X,3(2),1(1),0,0,3(3)", "Caug7=1;X,3(2),2(1),3(3),X,4(4)", "Cm7b5=3;X,1(1),2(3),1(2),2(4),X", "Csus2=1;X,3(T),0,0,3(2),3(3)", "Csus4=1;X,3(3),3(4),0,1(1),1(1)", "C7sus2=1;X,3(2),0,3(3),1(1),3(4)", "C7sus4=2;X,2(1),4(3),2(1),5(4),2(1)", "C6=1;X,3(T),2(2),2(3),1(1),3(4)", "Cm6=1;X,3(T),1(1),2(3),1(2),X", "Cmaj9=1;X,3(2),2(1),4(4),3(3),0", "Cm9=1;X,3(1),0,3(2),4(4),3(3)", "C9=1;X,3(2),2(1),3(3),3(3),3(3)", "Cadd9=1;X,3(2),2(1),0,3(3),0", "Cmadd9=1;X,3(1),0,0,4(3),3(2)", "Cadd11=1;X,3(3),2(2),0,1(1),1(1)", "C5=2;X,2(1),4(3),4(4),X,X", "C/E=1;0,3(3),2(2),0,1(1),0", "C/G=1;3(3),3(4),2(2),0,1(1),0", "C#=1;X,4(3),3(2),X,2(1),4(4)", "C#m=4;X,1(1),3(3),3(4),2(2),1(1)", "C#dim=1;X,4(4),2(1),0,2(2),0", "C#aug=2;X,3(4),2(3),1(1),1(2),X", "C#maj7=4;X,1(1),3(3),2(2),3(4),1(1)", "C#m7=4;X,1(1),3(3),1(1),2(2),1(1)", "C#7=2;X,3(3),2(2),3(4),1(1),X", "C#dim7=1;X,4(2),5(3),3(1),5(4),X", "C#mM7=1;X,4(4),2(2),1(1),1(1),0", "C#aug7=2;X,3(2),2(1),3(3),0,4(4)", "C#m7b5=4;X,1(1),2(3),1(2),2(4),0", "C#sus2=1;X,4(T),1(1),1(1),2(2),4(4)", "C#sus4=4;X,1(1),1(1),3(2),4(3),1(1)", "C#7sus2=4;X,1(T),3(3),1(1),1(1),1(1)", "C#7sus4=4;X,1(1),1(1),1(1),4(4),1(1)", "C#6=1;X,4(3),3(1),3(2),X,4(4)", "C#m6=2;X,3(T),1(1),2(3),1(2),0", "C#maj9=1;X,4(2),3(1),5(4),4(3),X", "C#m9=1;X,4(4),1(1),1(1),0,0", "C#9=2;X,3(2),2(1),3(3),3(3),X", "C#add9=1;X,4(3),3(2),1(1),4(4),X", "C#madd9=1;X,4(4),1(1),1(1),2(2),0", "C#add11=1;X,4(T),3(2),X,2(1),2(1)", "C#5=3;X,2(1),4(3),4(4),X,X", "D=1;X,X,0,2(1),3(3),2(2)", "Dm=1;X,X,0,2(2),3(3),1(1)", "Ddim=1;X,X,0,1(1),3(4),1(2)", "Daug=1;X,X,0,3(2),3(3),2(1)", "Dmaj7=1;X,X,0,2(1),2(2),2(3)", "Dm7=1;X,X,0,2(3),1(1),1(2)", "D7=1;X,X,0,2(2),1(1),2(3)", "Ddim7=1;X,X,0,1(1),0,1(2)", "DmM7=1;X,X,0,2(2),2(3),1(1)", "Daug7=1;X,X,0,3(3),1(1),2(2)", "Dm7b5=1;X,X,0,1(1),1(2),1(3)", "Dsus2=1;X,X,0,2(1),3(2),0", "Dsus4=1;X,X,0,2(1),3(2),3(3)", "D7sus2=1;X,X,0,2(2),1(1),0", "D7sus4=1;X,X,0,2(2),1(1),3(3)", "D6=1;X,X,0,2(1),0,2(2)", "Dm6=1;X,X,0,2(2),0,1(1)", "Dmaj9=1;X,5(2),4(1),6(4),5(3),0", "Dm9=3;X,3(2),1(1),3(3),3(3),3(3)", "D9=3;X,3(2),2(1),3(3),3(3),3(3)", "Dadd9=2;X,4(3),3(2),1(1),4(4),0", "Dmadd9=2;X,4(T),2(1),X,4(3),4(4)", "Dadd11=2;X,4(3),3(2),0,2(1),X", "D5=1;X,X,0,2(1),3(2),X", "D/F#=1;2(T),0,0,2(1),3(3),2(2)", "D/A=1;X,0,0,2(1),3(3),2(2)", "Eb=1;X,X,1(1),3(2),4(4),3(3)", "Ebm=1;X,X,1(1),3(3),4(4),2(2)", "Ebdim=1;X,X,1(1),2(2),X,2(3)", "Ebaug=1;X,X,1(1),4(3),4(4),3(2)", "Ebmaj7=1;X,X,1(1),3(2),3(3),3(4)", "Ebm7=1;X,X,1(1),3(4),2(2),2(3)", "Eb7=1;X,X,1(1),3(3),2(2),3(4)", "Ebdim7=1;X,X,1(1),2(3),1(2),2(4)", "EbmM7=1;X,X,1(1),3(3),3(4),2(2)", "Ebaug7=1;X,X,1(1),4(4),2(2),3(3)", "Ebm7b5=1;X,X,1(1),2(2),2(3),2(4)", "Ebsus2=1;X,X,1(1),3(2),4(3),1(1)", "Ebsus4=1;X,X,1(1),3(2),4(3),4(4)", "Eb7sus2=1;X,X,1(1),3(3),2(2),1(1)", "Eb7sus4=1;X,X,1(1),3(3),2(2),4(4)", "Eb6=1;X,X,1(1),3(2),1(1),3(3)", "Ebm6=1;X,X,1(1),3(3),1(1),2(2)", "Ebmaj9=1;X,X,1(1),0,3(4),1(2)", "Ebm9=4;X,3(T),1(1),3(3),3(3),3(3)", "Eb9=1;X,X,1(1),0,2(3),1(2)", "Ebadd9=3;X,4(3),3(2),1(1),4(4),4(4)", "Ebmadd9=3;X,4(2),2(1),X,4(3),4(4)", "Ebadd11=4;X,3(T),2(2),X,1(1),1(1)", "Eb5=1;X,X,1(1),3(3),4(4),X", "E=1;0,2(2),2(3),1(1),0,0", "Em=1;0,2(2),2(3),0,0,0", "Edim=1;0,1(1),2(2),0,X,0", "Eaug=1;0,3(4),2(3),1(1),1(2),0", "Emaj7=1;0,2(3),1(1),1(2),0,0", "Em7=1;0,2(1),2(2),0,3(3),0", "E7=1;0,2(2),0,1(1),0,0", "Edim7=0;0,1(1),2(2),0,2(3),0", "EmM7=1;0,2(2),1(1),0,0,0", "Eaug7=1;0,3(3),2(2),1(1),3(4),0", "Em7b5=1;0,1(1),2(2),0,3(3),0", "Esus2=1;0,2(1),4(3),4(4),0,0", "Esus4=1;0,0,2(1),2(2),0,0", "E7sus2=1;0,2(1),4(3),4(4),3(2),0", "E7sus4=1;0,0,0,2(1),0,0", "E6=1;0,4(4),2(2),1(1),0,0", "Em6=1;0,4(2),2(1),0,0,0", "Emaj9=1;0,2(T),1(1),1(2),0,2(4)", "Em9=1;0,2(1),4(3),0,3(2),0", "E9=1;0,2(2),4(4),1(1),3(3),0", "Eadd9=1;0,2(2),4(4),1(1),0,0", "Emadd9=1;0,2(1),4(2),0,0,0", "Eadd11=1;0,0,2(2),1(1),0,0", "E5=0;0,2(1),2(2),X,X,X", "E/G#=2;3(2),1(1),X,3(3),4(4),0", "E/B=0;X,2(2),2(3),1(1),0,0", "F=1;1(1),3(3),3(4),2(2),1(1),1(1)", "Fm=1;1(1),3(2),3(3),1(1),1(1),1(1)", "Fdim=1;1(T),X,3(4),1(1),0,1(2)", "Faug=1;X,X,3(4),2(2),2(3),1(1)", "Fmaj7=1;1(T),0,3(3),2(2),1(1),0", "Fm7=1;1(T),X,1(1),1(2),1(3),X", "F7=1;1(1),3(3),1(1),2(2),1(1),1(1)", "Fdim7=0;1(1),X,0,1(2),0,1(3)", "FmM7=1;1(1),3(3),2(2),1(1),1(1),1(1)", "Faug7=0;1(T),0,1(1),2(3),2(4),1(2)", "Fm7b5=1;1(T),X,1(2),1(3),0,X", "Fsus2=1;1(T),X,3(3),0,1(1),3(4)", "Fsus4=1;1(1),1(1),3(2),3(3),1(1),1(1)", "F7sus2=2;X,X,2(1),4(3),3(2),2(1)", "F7sus4=1;1(1),1(1),1(1),3(2),1(1),1(1)", "F6=1;1(1),0,0,2(4),1(2),1(3)", "Fm6=1;1(1),3(2),3(3),1(1),3(4),1(1)", "Fmaj9=1;1(T),0,2(4),0,1(2),1(3)", "Fm9=1;1(1),3(2),1(1),1(1),1(1),3(3)", "F9=1;1(1),0,1(2),0,1(3),1(4)", "Fadd9=1;1(T),0,3(3),2(2),1(1),3(4)", "Fmadd9=1;X,X,3(2),0,1(1),4(3)", "Fadd11=1;1(1),1(1),3(3),2(2),1(1),1(1)", "F5=1;1(1),3(3),3(4),X,X,X", "F#=1;2(1),4(3),4(4),3(2),2(1),2(1)", "F#m=1;2(1),4(2),4(3),2(1),2(1),2(1)", "F#dim=1;2(T),0,4(4),2(2),1(1),X", "F#aug=1;X,X,4(4),3(2),3(3),2(1)", "F#maj7=1;2(1),4(4),3(2),3(3),2(1),2(1)", "F#m7=1;2(T),X,2(1),2(2),2(3),0", "F#7=1;2(1),4(3),2(1),3(2),2(1),2(1)", "F#dim7=1;2(T),0,1(1),2(3),1(2),X", "F#mM7=1;2(1),4(3),3(2),2(1),2(1),2(1)", "F#aug7=0;2(T),X,2(1),3(3),3(4),2(2)", "F#m7b5=1;2(T),0,2(2),2(3),1(1),0", "F#sus2=1;X,X,4(T),1(1),2(2),2(3)", "F#sus4=1;2(1),2(1),4(2),4(3),2(1),2(1)", "F#7sus2=1;X,X,4(T),1(1),2(2),0", "F#7sus4=1;2(1),2(1),2(1),4(2),2(1),2(1)", "F#6=0;2(T),X,1(1),3(3),2(2),X", "F#m6=1;2(1),4(2),4(3),2(1),4(4),2(1)", "F#maj9=1;2(T),1(1),X,1(2),2(3),1(2)", "F#m9=1;2(T),0,X,1(2),2(3),0", "F#9=1;2(1),4(3),2(1),3(2),2(1),4(4)", "F#add9=1;X,X,4(3),3(2),2(1),4(4)", "F#madd9=1;X,X,4(2),2(1),2(1),4(3)", "F#add11=2;1(1),1(1),3(3),2(2),1(1),1(1)", "F#5=1;2(1),4(3),4(4),X,X,X", "G=1;3(2),2(1),0,0,0,3(3)", "Gm=3;1(1),3(3),3(4),1(1),1(1),1(1)", "Gdim=3;1(T),2(2),3(3),1(1),X,X", "Gaug=1;3(3),2(2),1(1),0,0,3(4)", "Gmaj7=1;3(3),2(1),0,0,0,2(2)", "Gm7=2;2(1),4(3),2(1),2(1),2(1),2(1)", "G7=1;3(3),2(2),0,0,0,1(1)", "Gdim7=1;3(T),X,2(1),3(3),2(2),0", "GmM7=1;3(T),X,0,3(2),3(3),2(1)", "Gaug7=1;3(T),2(3),1(2),0,0,1(1)", "Gm7b5=0;3(T),X,3(3),3(2),2(1),X", "Gsus2=1;3(3),0,0,2(1),3(2),3(4)", "Gsus4=1;3(2),3(3),0,0,1(1),3(4)", "G7sus2=1;3(1),0,3(2),0,3(3),3(4)", "G7sus4=1;3(3),X,3(4),0,1(1),X", "G6=1;3(2),2(1),0,0,0,0", "Gm6=1;3(2),1(1),0,0,3(3),0", "Gmaj9=1;3(2),0,0,0,0,2(1)", "Gm9=1;3(2),0,0,3(3),3(4),1(1)", "G9=1;3(2),0,0,0,0,1(1)", "Gadd9=1;3(3),0,0,2(2),0,3(4)", "Gmadd9=1;3(1),0,0,3(2),3(3),3(4)", "Gadd11=1;3(3),2(2),0,0,1(1),3(4)", "G5=0;X,X,X,0,3(3),3(3)", "G/B=1;X,2(1),0,0,3(3),3(4)", "G/D=1;X,X,0,0,0,3(3)", "G#=1;4(3),3(2),1(1),1(1),1(1),4(4)", "G#m=3;2(1),4(2),4(3),2(1),2(1),2(1)", "G#dim=1;4(4),2(2),0,1(1),0,X", "G#aug=3;X,X,4(4),3(2),3(3),2(1)", "G#maj7=4;1(T),X,2(2),2(3),1(1),X", "G#m7=0;4(1),X,4(2),4(3),4(4),X", "G#7=1;4(4),3(3),1(1),1(1),1(1),2(2)", "G#dim7=1;4(T),X,3(1),4(3),3(2),X", "G#mM7=1;4(T),X,X,4(2),4(3),3(1)", "G#aug7=4;1(T),X,1(1),2(2),2(3),X", "G#m7b5=1;4(T),X,4(3),4(2),3(1),X", "G#sus2=1;4(T),1(1),X,X,4(4),4(4)", "G#sus4=3;2(1),2(1),4(2),4(3),2(1),2(1)", "G#7sus2=1;4(T),1(1),X,X,4(4),2(2)", "G#7sus4=3;2(1),2(1),2(1),4(2),2(1),2(1)", "G#6=1;4(3),3(2),1(1),1(1),1(1),1(1)", "G#m6=1;4(T),X,3(1),4(2),4(3),X", "G#maj9=1;4(T),1(1),1(2),0,1(3),X", "G#m9=3;2(1),4(2),2(1),2(1),2(1),4(3)", "G#9=1;4(T),1(1),1(1),1(1),1(1),2(2)", "G#add9=1;4(T),3(1),X,3(2),4(3),X", "G#madd9=1;4(T),2(1),X,3(2),4(3),X", "G#add11=2;3(3),2(2),X,X,1(1),3(4)", "G#5=3;2(1),4(3),4(4),X,X,X"]
      , Ul = ["A=1;2(2),1(1),0,0", "Am=1;2(2),0,0,0", "A7=1;0,1(1),0,0", "Am7=1;0,0,0,0", "Amaj7=1;1(1),1(2),0,0", "Adim=2;1(1),2(2),4(4),2(3)", "Asus2=2;1(1),3(3),4(4),1(1)", "Asus4=1;2(1),2(2),0,0", "Bb=1;3(3),2(2),1(1),1(1)", "Bbm=1;3(3),1(1),1(1),1(1)", "Bb7=1;1(1),2(2),1(1),1(1)", "Bbm7=1;1(1),1(1),1(1),1(1)", "Bbmaj7=1;3(3),2(2),1(1),0", "Bbdim=1;3(4),1(1),0,1(2)", "Bbsus2=1;3(3),0,1(1),1(1)", "Bbsus4=1;3(3),3(4),1(1),1(1)", "B=1;4(3),3(2),2(1),2(1)", "Bm=1;4(3),2(1),2(1),2(1)", "B7=1;2(1),3(2),2(1),2(1)", "Bm7=1;2(1),2(1),2(1),2(1)", "Bmaj7=1;3(2),3(2),2(1),2(1)", "Bdim=1;4(4),2(2),1(1),2(3)", "Bsus2=1;4(4),1(1),2(2),2(3)", "Bsus4=1;4(2),4(4),2(1),2(1)", "C=1;0,0,0,3(3)", "Cm=1;0,3(1),3(2),3(3)", "C7=1;0,0,0,1(1)", "Cm7=1;3(1),3(1),3(1),3(1)", "Cmaj7=1;0,0,0,2(1)", "Cdim=1;0,3(3),2(2),3(4)", "Csus2=1;0,2(1),3(2),3(3)", "Csus4=1;0,0,1(1),3(3)", "C#=1;1(1),1(1),1(1),4(4)", "C#m=1;1(1),4(3),4(3),4(3)", "C#7=1;1(1),1(1),1(1),2(2)", "C#m7=1;4(1),4(1),4(1),4(1)", "C#maj7=1;1(1),1(1),1(1),3(3)", "C#dim=1;0,1(1),0,4(4)", "C#sus2=1;1(1),3(2),4(3),4(3)", "C#sus4=1;1(1),1(1),2(2),4(4)", "D=1;2(1),2(2),2(3),0", "Dm=1;2(2),2(3),1(1),0", "D7=1;2(1),0,2(2),0", "Dm7=1;2(2),2(3),1(1),3(4)", "Dmaj7=1;2(1),2(1),2(1),4(2)", "Ddim=1;1(1),2(3),1(2),0", "Dsus2=1;2(1),2(2),0,0", "Dsus4=1;0,2(1),3(2),0", "Eb=1;0,3(2),3(2),1(1)", "Ebm=1;3(3),3(4),2(2),1(1)", "Eb7=1;3(1),3(1),3(1),4(2)", "Ebm7=1;3(2),3(3),2(1),4(4)", "Ebmaj7=2;2(1),2(1),2(1),4(2)", "Ebdim=1;2(1),3(3),2(2),0", "Ebsus2=1;3(2),3(3),1(1),1(1)", "Ebsus4=1;1(1),3(3),4(4),1(1)", "E=1;4(2),4(3),4(4),2(1)", "Em=1;0,4(3),3(2),2(1)", "E7=1;1(1),2(2),0,2(3)", "Em7=1;0,2(1),0,2(2)", "Emaj7=1;1(1),3(3),0,2(2)", "Edim=1;0,4(3),0,1(1)", "Esus2=1;4(3),4(4),2(1),2(1)", "Esus4=1;2(2),4(4),0,2(1)", "F=1;2(2),0,1(1),0", "Fm=1;1(1),0,1(2),3(4)", "F7=1;2(2),3(3),1(1),0", "Fm7=1;1(1),3(3),1(2),3(4)", "Fmaj7=1;2(2),4(4),1(1),3(3)", "Fdim=1;1(1),X,1(2),2(3)", "Fsus2=1;0,0,1(1),3(3)", "Fsus4=1;3(3),0,1(1),1(2)", "F#=1;3(3),1(1),2(2),1(1)", "F#m=1;2(2),1(1),2(3),0", "F#7=1;3(2),4(3),2(1),4(4)", "F#m7=1;2(1),4(3),2(2),4(4)", "F#maj7=2;2(2),4(4),1(1),3(3)", "F#dim=1;2(2),0,2(3),0", "F#sus2=1;1(1),1(1),2(2),4(4)", "F#sus4=1;4(4),1(1),2(2),2(3)", "G=1;0,2(1),3(3),2(2)", "Gm=1;0,2(2),3(3),1(1)", "G7=1;0,2(2),1(1),2(3)", "Gm7=1;0,2(2),1(1),1(1)", "Gmaj7=1;0,2(1),2(2),2(3)", "Gdim=1;0,1(1),3(4),1(2)", "Gsus2=1;0,2(1),3(3),0", "Gsus4=1;0,2(1),3(3),3(4)", "G#=2;4(3),2(1),3(2),2(1)", "G#m=1;4(3),3(2),4(4),2(1)", "G#7=1;1(1),3(3),2(2),3(4)", "G#m7=1;1(1),3(4),2(2),2(3)", "G#maj7=1;1(1),3(3),3(3),3(3)", "G#dim=1;1(1),2(2),X,2(3)", "G#sus2=1;1(1),3(3),4(4),1(1)", "G#sus4=1;1(1),3(2),4(3),4(3)", "A7sus4=1;0,2(2),0,0", "AmM7=1;1(1),0,0,0", "Adim7=1;2(1),3(3),2(2),3(4)", "A6=1;2(1),4(3),2(2),4(4)", "Aaug=1;2(2),1(1),1(1),4(4)", "Am6=1;2(1),4(3),2(1),3(2)", "A9=1;0,1(1),0,2(2)", "Aadd9=1;2(2),1(1),0,2(3)", "Bb7sus4=1;1(1),3(3),1(1),1(1)", "BbmM7=1;2(2),1(1),1(1),1(1)", "Bbdim7=1;0,1(1),0,1(2)", "Bb6=1;0,2(2),1(1),1(1)", "Bbm6=1;0,1(1),1(1),1(1)", "Bbaug=2;2(2),1(1),1(1),4(4)", "Bb9=1;1(2),2(1),1(4),3(3)", "Bbadd9=1;3(3),2(2),1(1),3(4)", "Bbm7-5=1;1(1),1(2),0,1(3)", "Bm6=1;1(1),2(2),2(3),2(4)", "B7sus4=1;2(1),4(3),2(1),2(1)", "BmM7=1;3(2),2(1),2(1),2(1)", "Bdim7=1;1(1),2(3),1(2),2(4)", "B6=1;1(1),3(4),2(2),2(3)", "Baug=1;4(4),3(2),3(3),2(1)", "B9=1;2(1),3(3),2(2),4(4)", "Badd9=1;4(3),3(2),2(1),4(4)", "C7sus4=1;0,0,1(1),1(1)", "CmM7=1;4(2),3(1),3(1),3(1)", "Cdim7=1;2(1),3(3),2(2),3(4)", "C6=1;0,0,0,0", "Cm6=1;2(1),3(3),3(3),3(3)", "Caug=1;1(1),0,0,3(4)", "C9=1;0,2(2),0,1(1)", "Cadd9=1;0,2(1),0,3(3)", "C#7sus4=1;1(1),1(1),2(2),2(3)", "C#mM7=1;1(1),0,0,4(4)", "C#dim7=1;0,1(1),0,1(2)", "C#6=1;1(1),1(1),1(1),1(1)", "C#m6=1;1(1),1(2),0,1(3)", "C#aug=1;2(2),1(1),1(1),4(4)", "C#9=1;1(1),3(4),1(2),2(3)", "C#add9=1;1(1),3(3),1(1),4(4)", "Dm6=1;0,2(2),1(1),2(3)", "D7sus4=1;2(1),2(2),3(3),3(4)", "DmM7=1;2(2),2(3),1(1),4(4)", "Ddim7=1;1(1),2(3),1(2),2(4)", "D6=1;2(2),2(2),2(2),2(2)", "Daug=2;2(2),1(1),1(1),4(4)", "D9=1;2(1),4(4),2(2),3(3)", "Dadd9=2;1(1),3(3),1(1),4(4)", "Eb7sus4=1;3(1),3(1),4(2),4(3)", "EbmM7=2;2(2),2(3),1(1),4(4)", "Ebdim7=1;2(1),3(3),2(2),3(4)", "Eb6=1;3(1),3(1),3(1),3(1)", "Ebm6=1;3(2),3(3),2(1),3(4)", "Ebaug=1;0,3(2),3(2),2(1)", "Eb9=1;0,1(1),1(2),1(3)", "Ebadd9=1;0,3(3),1(1),1(1)", "E7sus4=1;2(2),2(3),0,2(4)", "Em6=1;4(2),4(3),3(1),4(4)", "EmM7=1;0,3(2),0,2(1)", "Edim7=1;0,1(1),0,1(2)", "E6=1;4(1),4(1),4(1),4(1)", "Eaug=1;1(1),0,0,3(4)", "E9=1;1(1),2(2),2(3),2(4)", "Eadd9=1;1(1),4(4),2(2),2(3)", "F7sus4=1;3(2),3(3),1(1),3(4)", "Fm6=1;1(1),2(2),1(1),3(3)", "FmM7=1;1(1),4(4),1(1),3(3)", "Fdim7=1;1(1),2(3),1(2),2(4)", "F6=1;2(2),2(3),1(1),3(4)", "F6sus2=1;0,0,1(1),3(3)", "F6sus4=1;3(3),0,1(1),1(1)", "F6aug=1;2(2),1(1),1(1),4(4)", "F9=1;2(1),3(2),3(3),3(4)", "Faug=1;2(3),1(1),1(2),0", "Fadd9=1;0,0,1(1),0", "F#7sus4=1;4(2),4(3),2(1),4(4)", "F#mM7=2;1(1),4(4),1(1),3(3)", "F#dim7=1;2(1),3(3),2(2),3(4)", "F#m6=1;2(2),1(1),2(3),4(4)", "F#6=1;3(2),3(3),2(1),4(4)", "F#aug=2;2(2),1(1),1(1),4(4)", "F#9=1;1(1),1(2),0,1(3)", "F#add9=1;1(1),1(1),2(2),1(1)", "Gm6=1;0,2(2),0,1(1)", "G7sus4=1;0,2(2),1(1),3(4)", "GmM7=1;0,2(2),2(3),1(1)", "Gdim7=1;0,1(1),0,1(2)", "G6=1;0,2(1),0,2(2)", "Gaug=1;0,3(2),3(3),2(1)", "G9=1;2(2),2(3),1(1),2(4)", "Gadd9=1;2(1),2(1),3(2),2(1)", "G#7sus4=1;1(1),3(3),2(2),4(4)", "G#mM7=1;0,3(2),4(3),2(1)", "G#dim7=1;1(1),2(3),1(2),2(4)", "G#6=1;1(1),3(3),1(2),3(4)", "G#m6=1;1(1),3(3),1(1),2(2)", "G#aug=1;1(1),0,0,3(4)", "G#9=1;1(1),0,2(3),1(2)", "G#add9=1;3(1),3(1),4(2),3(1)", "C-F=1;2(2),0,1(1),3(3)", "D/A=1;2(1),2(2),2(3),0", "Dm/C=1;2(2),2(3),1(1),3(4)", "Fm7/C=1;1(1),3(3),1(2),3(4)", "G/B=1;0,2(1),3(3),2(2)", "G/F#=1;0,2(1),2(2),2(3)", "G/F=1;0,2(2),1(1),2(3)", "G7/B=1;0,2(2),1(1),2(3)"];
    function Jl(t) {
        return t ? t === m.GUITAR ? Hl : t === m.UKULELE ? Ul : [] : Hl.concat(Ul)
    }
    function Wl(t, n, e) {
        const i = t.slice();
        return i[19] = n[e],
        i
    }
    function Vl(t) {
        let n, e, i;
        return {
            c() {
                n = is("div"),
                n.innerHTML = '和弦管理\n      <i class="yoopu3-icon"></i>',
                as(n, "class", "custom svelte-enolmu")
            },
            m(r, o) {
                ts(r, n, o),
                e || (i = us(n, "click", t[15]),
                e = !0)
            },
            p: Fo,
            d(t) {
                t && ns(n),
                e = !1,
                i()
            }
        }
    }
    function Kl(t) {
        let n, e, i, r, o = t[19] + "";
        function s() {
            return t[16](t[19])
        }
        return {
            c() {
                n = is("span"),
                e = rs(o),
                as(n, "class", "chord svelte-enolmu")
            },
            m(t, o) {
                ts(t, n, o),
                Qo(n, e),
                i || (r = us(n, "click", s),
                i = !0)
            },
            p(n, i) {
                t = n,
                32 & i && o !== (o = t[19] + "") && fs(e, o)
            },
            d(t) {
                t && ns(n),
                i = !1,
                r()
            }
        }
    }
    function Yl(t) {
        let n, e, i, r, o, s, u, a, c, l, f, d, h, v;
        function p(n) {
            t[14](n)
        }
        e = new Yc({
            props: {
                icon: "",
                size: "small",
                disabled: !t[6]
            }
        }),
        e.$on("click", t[11]),
        r = new Yc({
            props: {
                icon: "",
                size: "small",
                disabled: !t[6]
            }
        }),
        r.$on("click", t[12]),
        s = new Yc({
            props: {
                icon: "",
                size: "small",
                disabled: !t[6]
            }
        }),
        s.$on("click", t[13]);
        let m = {
            placeholder: "搜索和弦",
            white: t[3]
        };
        void 0 !== t[4] && (m.query = t[4]),
        c = new Ll({
            props: m
        }),
        Ts.push(( () => Ks(c, "query", p)));
        let y = t[2] && Vl(t)
          , g = t[5]
          , b = [];
        for (let n = 0; n < g.length; n += 1)
            b[n] = Kl(Wl(t, g, n));
        return {
            c() {
                n = is("div"),
                Ys(e.$$.fragment),
                i = os(),
                Ys(r.$$.fragment),
                o = os(),
                Ys(s.$$.fragment),
                u = os(),
                a = is("div"),
                Ys(c.$$.fragment),
                f = os(),
                y && y.c(),
                d = os(),
                h = is("div");
                for (let t = 0; t < b.length; t += 1)
                    b[t].c();
                as(a, "class", "search svelte-enolmu"),
                as(n, "class", "top svelte-enolmu"),
                as(h, "class", "chord-list svelte-enolmu")
            },
            m(t, l) {
                ts(t, n, l),
                Zs(e, n, null),
                Qo(n, i),
                Zs(r, n, null),
                Qo(n, o),
                Zs(s, n, null),
                Qo(n, u),
                Qo(n, a),
                Zs(c, a, null),
                Qo(n, f),
                y && y.m(n, null),
                ts(t, d, l),
                ts(t, h, l);
                for (let t = 0; t < b.length; t += 1)
                    b[t].m(h, null);
                v = !0
            },
            p(t, [i]) {
                const o = {};
                64 & i && (o.disabled = !t[6]),
                e.$set(o);
                const u = {};
                64 & i && (u.disabled = !t[6]),
                r.$set(u);
                const a = {};
                64 & i && (a.disabled = !t[6]),
                s.$set(a);
                const f = {};
                if (8 & i && (f.white = t[3]),
                !l && 16 & i && (l = !0,
                f.query = t[4],
                Ms(( () => l = !1))),
                c.$set(f),
                t[2] ? y ? y.p(t, i) : (y = Vl(t),
                y.c(),
                y.m(n, null)) : y && (y.d(1),
                y = null),
                34 & i) {
                    let n;
                    for (g = t[5],
                    n = 0; n < g.length; n += 1) {
                        const e = Wl(t, g, n);
                        b[n] ? b[n].p(e, i) : (b[n] = Kl(e),
                        b[n].c(),
                        b[n].m(h, null))
                    }
                    for (; n < b.length; n += 1)
                        b[n].d(1);
                    b.length = g.length
                }
            },
            i(t) {
                v || (Ls(e.$$.fragment, t),
                Ls(r.$$.fragment, t),
                Ls(s.$$.fragment, t),
                Ls(c.$$.fragment, t),
                v = !0)
            },
            o(t) {
                Hs(e.$$.fragment, t),
                Hs(r.$$.fragment, t),
                Hs(s.$$.fragment, t),
                Hs(c.$$.fragment, t),
                v = !1
            },
            d(t) {
                t && ns(n),
                Qs(e),
                Qs(r),
                Qs(s),
                Qs(c),
                y && y.d(),
                t && ns(d),
                t && ns(h),
                es(b, t)
            }
        }
    }
    function Zl(t, n) {
        const e = [...n];
        for (const i in t)
            if (t.hasOwnProperty(i)) {
                const r = t[i];
                e.push(...n.filter((t => 0 === t.indexOf(r))).map((t => i + t.substring(r.length))))
            }
        return e
    }
    function Ql(t, n, e) {
        let i, r, {keyUse: o} = n, {xheEditor: s} = n, {caret: u} = n, {instrument: a} = n, {definitions: c=[]} = n, {customChordEnabled: l=!0} = n, {customChordPanelVisible: f} = n, {isMobile: d=!1} = n, h = [];
        function v(t) {
            const n = [];
            return t.forEach((t => {
                if (t.type === oa.CHORD_ANCHOR) {
                    const {chord: e} = t.attributes;
                    n.indexOf(e) < 0 && n.push(e)
                }
            }
            )),
            n
        }
        return t.$$set = t => {
            "keyUse"in t && e(7, o = t.keyUse),
            "xheEditor"in t && e(1, s = t.xheEditor),
            "caret"in t && e(8, u = t.caret),
            "instrument"in t && e(9, a = t.instrument),
            "definitions"in t && e(10, c = t.definitions),
            "customChordEnabled"in t && e(2, l = t.customChordEnabled),
            "customChordPanelVisible"in t && e(0, f = t.customChordPanelVisible),
            "isMobile"in t && e(3, d = t.isMobile)
        }
        ,
        t.$$.update = () => {
            258 & t.$$.dirty && e(6, i = u && s && s.getRenderer().getItemList()[u.index].type === oa.CHORD_ANCHOR),
            16 & t.$$.dirty && async function() {
                if (!s)
                    return;
                const {HexiChord: t} = await Jr(Hr);
                let n = [...c.map((n => t.getByDefinition(n).getName())), ...v(s.getRenderer().getItemList()), ...Rl[o], ...Zl(t.getKeyAliases(), Jl(a).map((n => t.getByDefinition(n).getName())))]
                  , i = r ? r.trim() : null;
                i && (n = n.filter((t => "#" === i || "b" === i ? 1 === t.indexOf(i) : ("#" !== i[0] && "b" !== i[0] || (i = i.substring(1, 2) + i[0] + i.substring(2)),
                0 === t.indexOf(i)))).sort(( (t, n) => t.length - n.length))),
                e(5, h = [...new Set(n)].slice(0, 12))
            }()
        }
        ,
        [f, s, l, d, r, h, i, o, u, a, c, () => {
            s.unsetChordAnchor()
        }
        , () => {
            s.moveChordAnchorLeft()
        }
        , () => {
            s.moveChordAnchorRight()
        }
        , function(t) {
            r = t,
            e(4, r)
        }
        , () => e(0, f = !0), t => {
            s.setChordAnchor(t)
        }
        ]
    }
    class tf extends eu {
        constructor(t) {
            super(),
            nu(this, t, Ql, Yl, Po, {
                keyUse: 7,
                xheEditor: 1,
                caret: 8,
                instrument: 9,
                definitions: 10,
                customChordEnabled: 2,
                customChordPanelVisible: 0,
                isMobile: 3
            })
        }
    }
    function nf(t) {
        let n, e, i, r, o, s, u = t[1] && ef(t);
        return {
            c() {
                n = is("div"),
                e = is("div"),
                e.innerHTML = '<span class="icon yoopu3-icon svelte-1pxgjq5"></span>',
                i = os(),
                u && u.c(),
                as(e, "class", "operation-icon svelte-1pxgjq5"),
                as(n, "class", "anchor-operation svelte-1pxgjq5"),
                hs(n, "hover", t[1])
            },
            m(a, c) {
                ts(a, n, c),
                Qo(n, e),
                Qo(n, i),
                u && u.m(n, null),
                r = !0,
                o || (s = [us(n, "mouseenter", t[10]), us(n, "mouseleave", t[11])],
                o = !0)
            },
            p(t, e) {
                t[1] ? u ? (u.p(t, e),
                2 & e && Ls(u, 1)) : (u = ef(t),
                u.c(),
                Ls(u, 1),
                u.m(n, null)) : u && (Ps(),
                Hs(u, 1, 1, ( () => {
                    u = null
                }
                )),
                qs()),
                2 & e && hs(n, "hover", t[1])
            },
            i(t) {
                r || (Ls(u),
                r = !0)
            },
            o(t) {
                Hs(u),
                r = !1
            },
            d(t) {
                t && ns(n),
                u && u.d(),
                o = !1,
                Go(s)
            }
        }
    }
    function ef(t) {
        let n, e, i, r, o, s;
        function u(n) {
            t[9](n)
        }
        let a = {
            xheEditor: t[4],
            keyUse: t[3],
            caret: t[5],
            instrument: t[6],
            definitions: t[7]
        };
        return void 0 !== t[2] && (a.customChordPanelVisible = t[2]),
        e = new tf({
            props: a
        }),
        Ts.push(( () => Ks(e, "customChordPanelVisible", u))),
        e.$on("operate", t[8]),
        {
            c() {
                n = is("div"),
                Ys(e.$$.fragment),
                as(n, "class", "operation-panel svelte-1pxgjq5")
            },
            m(t, i) {
                ts(t, n, i),
                Zs(e, n, null),
                s = !0
            },
            p(t, n) {
                const r = {};
                16 & n && (r.xheEditor = t[4]),
                8 & n && (r.keyUse = t[3]),
                32 & n && (r.caret = t[5]),
                64 & n && (r.instrument = t[6]),
                128 & n && (r.definitions = t[7]),
                !i && 4 & n && (i = !0,
                r.customChordPanelVisible = t[2],
                Ms(( () => i = !1))),
                e.$set(r)
            },
            i(t) {
                s || (Ls(e.$$.fragment, t),
                Ds(( () => {
                    o && o.end(1),
                    r || (r = Js(n, Hc, {
                        duration: 100
                    })),
                    r.start()
                }
                )),
                s = !0)
            },
            o(t) {
                Hs(e.$$.fragment, t),
                r && r.invalidate(),
                o = Ws(n, Hc, {
                    delay: 200,
                    duration: 200
                }),
                s = !1
            },
            d(t) {
                t && ns(n),
                Qs(e),
                t && o && o.end()
            }
        }
    }
    function rf(t) {
        let n, e, i = t[0] && nf(t);
        return {
            c() {
                i && i.c(),
                n = ss()
            },
            m(t, r) {
                i && i.m(t, r),
                ts(t, n, r),
                e = !0
            },
            p(t, [e]) {
                t[0] ? i ? (i.p(t, e),
                1 & e && Ls(i, 1)) : (i = nf(t),
                i.c(),
                Ls(i, 1),
                i.m(n.parentNode, n)) : i && (Ps(),
                Hs(i, 1, 1, ( () => {
                    i = null
                }
                )),
                qs())
            },
            i(t) {
                e || (Ls(i),
                e = !0)
            },
            o(t) {
                Hs(i),
                e = !1
            },
            d(t) {
                i && i.d(t),
                t && ns(n)
            }
        }
    }
    function of(t, n, e) {
        let {visible: i=!1} = n
          , {isHover: r=!1} = n
          , {keyUse: o} = n
          , {xheEditor: s} = n
          , {caret: u} = n
          , {instrument: a} = n
          , {definitions: c} = n
          , {customChordPanelVisible: l} = n;
        const f = Es();
        return t.$$set = t => {
            "visible"in t && e(0, i = t.visible),
            "isHover"in t && e(1, r = t.isHover),
            "keyUse"in t && e(3, o = t.keyUse),
            "xheEditor"in t && e(4, s = t.xheEditor),
            "caret"in t && e(5, u = t.caret),
            "instrument"in t && e(6, a = t.instrument),
            "definitions"in t && e(7, c = t.definitions),
            "customChordPanelVisible"in t && e(2, l = t.customChordPanelVisible)
        }
        ,
        [i, r, l, o, s, u, a, c, function(t) {
            e(0, i = !1),
            f("operate", t.detail)
        }
        , function(t) {
            l = t,
            e(2, l)
        }
        , t => {
            t.buttons || e(1, r = !0)
        }
        , () => e(1, r = !1)]
    }
    class sf extends eu {
        constructor(t) {
            super(),
            nu(this, t, of, rf, Po, {
                visible: 0,
                isHover: 1,
                keyUse: 3,
                xheEditor: 4,
                caret: 5,
                instrument: 6,
                definitions: 7,
                customChordPanelVisible: 2
            })
        }
    }
    function uf(t, n, e) {
        const i = t.slice();
        return i[6] = n[e],
        i
    }
    function af(t) {
        let n, e, i;
        return {
            c() {
                n = is("hexi-chord"),
                cs(n, "define", e = t[6]),
                cs(n, "dark", i = t[2] ? "" : null)
            },
            m(t, e) {
                ts(t, n, e)
            },
            p(t, r) {
                2 & r && e !== (e = t[6]) && cs(n, "define", e),
                4 & r && i !== (i = t[2] ? "" : null) && cs(n, "dark", i)
            },
            d(t) {
                t && ns(n)
            }
        }
    }
    function cf(t) {
        let n, e, i, r, o, s, u, a;
        function c(n) {
            t[4](n)
        }
        let l = {
            placeholder: "搜索和弦名"
        };
        void 0 !== t[0] && (l.query = t[0]),
        r = new Ll({
            props: l
        }),
        Ts.push(( () => Ks(r, "query", c)));
        let f = t[1]
          , d = [];
        for (let n = 0; n < f.length; n += 1)
            d[n] = af(uf(t, f, n));
        return {
            c() {
                n = is("div"),
                e = is("section"),
                i = is("div"),
                Ys(r.$$.fragment),
                s = os(),
                u = is("section");
                for (let t = 0; t < d.length; t += 1)
                    d[t].c();
                as(i, "class", "row svelte-1ksljmc"),
                as(e, "class", "top svelte-1ksljmc"),
                as(u, "class", "chords svelte-1ksljmc"),
                as(n, "class", "chord-dict svelte-1ksljmc")
            },
            m(t, o) {
                ts(t, n, o),
                Qo(n, e),
                Qo(e, i),
                Zs(r, i, null),
                Qo(n, s),
                Qo(n, u);
                for (let t = 0; t < d.length; t += 1)
                    d[t].m(u, null);
                a = !0
            },
            p(t, [n]) {
                const e = {};
                if (!o && 1 & n && (o = !0,
                e.query = t[0],
                Ms(( () => o = !1))),
                r.$set(e),
                6 & n) {
                    let e;
                    for (f = t[1],
                    e = 0; e < f.length; e += 1) {
                        const i = uf(t, f, e);
                        d[e] ? d[e].p(i, n) : (d[e] = af(i),
                        d[e].c(),
                        d[e].m(u, null))
                    }
                    for (; e < d.length; e += 1)
                        d[e].d(1);
                    d.length = f.length
                }
            },
            i(t) {
                a || (Ls(r.$$.fragment, t),
                a = !0)
            },
            o(t) {
                Hs(r.$$.fragment, t),
                a = !1
            },
            d(t) {
                t && ns(n),
                Qs(r),
                es(d, t)
            }
        }
    }
    function lf(t, n, e) {
        let i;
        qo(t, Tu, (t => e(2, i = t)));
        let {instrument: r} = n
          , o = []
          , s = "";
        return t.$$set = t => {
            "instrument"in t && e(3, r = t.instrument)
        }
        ,
        t.$$.update = () => {
            9 & t.$$.dirty && async function() {
                e(1, o = Jl(r).filter((t => {
                    const [n] = t.split("=");
                    return n.indexOf(s.trim()) >= 0
                }
                )))
            }()
        }
        ,
        [s, o, i, r, function(t) {
            s = t,
            e(0, s)
        }
        ]
    }
    class ff extends eu {
        constructor(t) {
            super(),
            nu(this, t, lf, cf, Po, {
                instrument: 3
            })
        }
    }
    function df(t, n, e) {
        const i = t.slice();
        return i[4] = n[e],
        i
    }
    function hf(t) {
        let n, e, i = t[4].icon + "";
        return {
            c() {
                n = is("span"),
                e = rs(i),
                as(n, "class", "icon yoopu3-icon svelte-1l9tlvb")
            },
            m(t, i) {
                ts(t, n, i),
                Qo(n, e)
            },
            p(t, n) {
                2 & n && i !== (i = t[4].icon + "") && fs(e, i)
            },
            d(t) {
                t && ns(n)
            }
        }
    }
    function vf(t) {
        let n, e, i = t[4].title + "";
        return {
            c() {
                n = is("span"),
                e = rs(i),
                as(n, "class", "title svelte-1l9tlvb")
            },
            m(t, i) {
                ts(t, n, i),
                Qo(n, e)
            },
            p(t, n) {
                2 & n && i !== (i = t[4].title + "") && fs(e, i)
            },
            d(t) {
                t && ns(n)
            }
        }
    }
    function pf(t) {
        let n, e, i, r, o, s = t[4].icon && hf(t), u = t[4].title && vf(t);
        function a() {
            return t[3](t[4])
        }
        return {
            c() {
                n = is("div"),
                s && s.c(),
                e = os(),
                u && u.c(),
                i = os(),
                as(n, "class", "option svelte-1l9tlvb"),
                hs(n, "selected", t[4].value === t[0]),
                hs(n, "dot", t[4].dot)
            },
            m(t, c) {
                ts(t, n, c),
                s && s.m(n, null),
                Qo(n, e),
                u && u.m(n, null),
                Qo(n, i),
                r || (o = us(n, "click", a),
                r = !0)
            },
            p(r, o) {
                (t = r)[4].icon ? s ? s.p(t, o) : (s = hf(t),
                s.c(),
                s.m(n, e)) : s && (s.d(1),
                s = null),
                t[4].title ? u ? u.p(t, o) : (u = vf(t),
                u.c(),
                u.m(n, i)) : u && (u.d(1),
                u = null),
                3 & o && hs(n, "selected", t[4].value === t[0]),
                2 & o && hs(n, "dot", t[4].dot)
            },
            d(t) {
                t && ns(n),
                s && s.d(),
                u && u.d(),
                r = !1,
                o()
            }
        }
    }
    function mf(t) {
        let n, e = t[1], i = [];
        for (let n = 0; n < e.length; n += 1)
            i[n] = pf(df(t, e, n));
        return {
            c() {
                n = is("div");
                for (let t = 0; t < i.length; t += 1)
                    i[t].c();
                as(n, "class", "tabs svelte-1l9tlvb"),
                hs(n, "secondary", t[2])
            },
            m(t, e) {
                ts(t, n, e);
                for (let t = 0; t < i.length; t += 1)
                    i[t].m(n, null)
            },
            p(t, [r]) {
                if (3 & r) {
                    let o;
                    for (e = t[1],
                    o = 0; o < e.length; o += 1) {
                        const s = df(t, e, o);
                        i[o] ? i[o].p(s, r) : (i[o] = pf(s),
                        i[o].c(),
                        i[o].m(n, null))
                    }
                    for (; o < i.length; o += 1)
                        i[o].d(1);
                    i.length = e.length
                }
                4 & r && hs(n, "secondary", t[2])
            },
            i: Fo,
            o: Fo,
            d(t) {
                t && ns(n),
                es(i, t)
            }
        }
    }
    function yf(t, n, e) {
        let {options: i=[]} = n
          , {selected: r} = n
          , {secondary: o=!1} = n;
        return t.$$set = t => {
            "options"in t && e(1, i = t.options),
            "selected"in t && e(0, r = t.selected),
            "secondary"in t && e(2, o = t.secondary)
        }
        ,
        [r, i, o, t => e(0, r = t.value)]
    }
    class gf extends eu {
        constructor(t) {
            super(),
            nu(this, t, yf, mf, Po, {
                options: 1,
                selected: 0,
                secondary: 2
            })
        }
    }
    function bf(t, n, e) {
        const i = t.slice();
        return i[36] = n[e],
        i[38] = e,
        i
    }
    function wf(t, n, e) {
        const i = t.slice();
        return i[39] = n[e],
        i
    }
    function xf(t, n, e) {
        const i = t.slice();
        return i[42] = n[e],
        i[38] = e,
        i
    }
    function kf(t) {
        let n, e, i;
        return e = new ff({
            props: {
                instrument: t[1]
            }
        }),
        {
            c() {
                n = is("div"),
                Ys(e.$$.fragment),
                as(n, "class", "chord-dict svelte-197nmai")
            },
            m(t, r) {
                ts(t, n, r),
                Zs(e, n, null),
                i = !0
            },
            p(t, n) {
                const i = {};
                2 & n[0] && (i.instrument = t[1]),
                e.$set(i)
            },
            i(t) {
                i || (Ls(e.$$.fragment, t),
                i = !0)
            },
            o(t) {
                Hs(e.$$.fragment, t),
                i = !1
            },
            d(t) {
                t && ns(n),
                Qs(e)
            }
        }
    }
    function Ef(t) {
        let n, e, i, r, o, s, u, a, c, l, f, d, h, v, p, m, y, g, b, w, x, k, E, X, S, T = t[3], C = [];
        for (let n = 0; n < T.length; n += 1)
            C[n] = Xf(xf(t, T, n));
        let j = t[9] && Sf(t)
          , O = t[0]
          , A = [];
        for (let n = 0; n < O.length; n += 1)
            A[n] = Of(bf(t, O, n));
        return {
            c() {
                n = is("div"),
                e = is("div"),
                i = is("input"),
                o = os(),
                s = is("div");
                for (let t = 0; t < C.length; t += 1)
                    C[t].c();
                u = os(),
                a = is("div"),
                c = is("hexi-chord"),
                d = os(),
                j && j.c(),
                h = os(),
                v = is("div"),
                p = is("button"),
                y = os(),
                g = is("button"),
                w = os(),
                x = is("div"),
                k = is("div"),
                k.innerHTML = '<i class="yoopu3-icon svelte-197nmai"></i>',
                E = os();
                for (let t = 0; t < A.length; t += 1)
                    A[t].c();
                as(i, "type", "text"),
                as(i, "class", "chord-name svelte-197nmai"),
                i.disabled = r = !t[6],
                as(s, "class", "mute-toggles svelte-197nmai"),
                cs(c, "define", l = t[6] || t[15]),
                cs(c, "size", "builder"),
                cs(c, "dark", f = t[11] ? "" : null),
                as(a, "class", "canvas svelte-197nmai"),
                hs(a, "disabled", !t[6]),
                as(e, "class", "chord svelte-197nmai"),
                p.disabled = m = !t[6],
                as(p, "class", "upButton svelte-197nmai"),
                g.disabled = b = !t[6],
                as(g, "class", "downButton svelte-197nmai"),
                as(v, "class", "stepper svelte-197nmai"),
                as(n, "class", "chord-canvas svelte-197nmai"),
                as(k, "class", "list-item add svelte-197nmai"),
                as(x, "class", "chord-list svelte-197nmai")
            },
            m(r, l) {
                ts(r, n, l),
                Qo(n, e),
                Qo(e, i),
                ds(i, t[10]),
                Qo(e, o),
                Qo(e, s);
                for (let t = 0; t < C.length; t += 1)
                    C[t].m(s, null);
                Qo(e, u),
                Qo(e, a),
                Qo(a, c),
                t[27](c),
                Qo(a, d),
                j && j.m(a, null),
                Qo(n, h),
                Qo(n, v),
                Qo(v, p),
                Qo(v, y),
                Qo(v, g),
                ts(r, w, l),
                ts(r, x, l),
                Qo(x, k),
                Qo(x, E);
                for (let t = 0; t < A.length; t += 1)
                    A[t].m(x, null);
                X || (S = [us(i, "input", t[25]), us(i, "input", t[17]), us(c, "click", t[18]), us(p, "click", t[29]), us(g, "click", t[30]), us(k, "click", t[20])],
                X = !0)
            },
            p(t, n) {
                if (64 & n[0] && r !== (r = !t[6]) && (i.disabled = r),
                1024 & n[0] && i.value !== t[10] && ds(i, t[10]),
                4194312 & n[0]) {
                    let e;
                    for (T = t[3],
                    e = 0; e < T.length; e += 1) {
                        const i = xf(t, T, e);
                        C[e] ? C[e].p(i, n) : (C[e] = Xf(i),
                        C[e].c(),
                        C[e].m(s, null))
                    }
                    for (; e < C.length; e += 1)
                        C[e].d(1);
                    C.length = T.length
                }
                if (64 & n[0] && l !== (l = t[6] || t[15]) && cs(c, "define", l),
                2048 & n[0] && f !== (f = t[11] ? "" : null) && cs(c, "dark", f),
                t[9] ? j ? j.p(t, n) : (j = Sf(t),
                j.c(),
                j.m(a, null)) : j && (j.d(1),
                j = null),
                64 & n[0] && hs(a, "disabled", !t[6]),
                64 & n[0] && m !== (m = !t[6]) && (p.disabled = m),
                64 & n[0] && b !== (b = !t[6]) && (g.disabled = b),
                2099205 & n[0]) {
                    let e;
                    for (O = t[0],
                    e = 0; e < O.length; e += 1) {
                        const i = bf(t, O, e);
                        A[e] ? A[e].p(i, n) : (A[e] = Of(i),
                        A[e].c(),
                        A[e].m(x, null))
                    }
                    for (; e < A.length; e += 1)
                        A[e].d(1);
                    A.length = O.length
                }
            },
            i: Fo,
            o: Fo,
            d(e) {
                e && ns(n),
                es(C, e),
                t[27](null),
                j && j.d(),
                e && ns(w),
                e && ns(x),
                es(A, e),
                X = !1,
                Go(S)
            }
        }
    }
    function Xf(t) {
        let n, e, i, r, o, s = t[42] ? "⨯" : "￮";
        function u() {
            return t[26](t[38], t[42])
        }
        return {
            c() {
                n = is("div"),
                e = rs(s),
                i = os(),
                as(n, "class", "toggle svelte-197nmai")
            },
            m(t, s) {
                ts(t, n, s),
                Qo(n, e),
                Qo(n, i),
                r || (o = us(n, "click", u),
                r = !0)
            },
            p(n, i) {
                t = n,
                8 & i[0] && s !== (s = t[42] ? "⨯" : "￮") && fs(e, s)
            },
            d(t) {
                t && ns(n),
                r = !1,
                o()
            }
        }
    }
    function Sf(t) {
        let n, e, i = t[16], r = [];
        for (let n = 0; n < i.length; n += 1)
            r[n] = jf(wf(t, i, n));
        return {
            c() {
                n = is("div");
                for (let t = 0; t < r.length; t += 1)
                    r[t].c();
                as(n, "class", "hand svelte-197nmai"),
                as(n, "style", e = `top: ${t[8]}px; left: ${t[7]}px`)
            },
            m(t, e) {
                ts(t, n, e);
                for (let t = 0; t < r.length; t += 1)
                    r[t].m(n, null)
            },
            p(t, o) {
                if (66048 & o[0]) {
                    let e;
                    for (i = t[16],
                    e = 0; e < i.length; e += 1) {
                        const s = wf(t, i, e);
                        r[e] ? r[e].p(s, o) : (r[e] = jf(s),
                        r[e].c(),
                        r[e].m(n, null))
                    }
                    for (; e < r.length; e += 1)
                        r[e].d(1);
                    r.length = i.length
                }
                384 & o[0] && e !== (e = `top: ${t[8]}px; left: ${t[7]}px`) && as(n, "style", e)
            },
            d(t) {
                t && ns(n),
                es(r, t)
            }
        }
    }
    function Tf(t) {
        let n;
        return {
            c() {
                n = is("div"),
                n.textContent = "",
                as(n, "class", "yoopu3-icon svelte-197nmai")
            },
            m(t, e) {
                ts(t, n, e)
            },
            p: Fo,
            d(t) {
                t && ns(n)
            }
        }
    }
    function Cf(t) {
        let n, e, i = t[39].value + "";
        return {
            c() {
                n = is("div"),
                e = rs(i),
                as(n, "class", "icon svelte-197nmai")
            },
            m(t, i) {
                ts(t, n, i),
                Qo(n, e)
            },
            p: Fo,
            d(t) {
                t && ns(n)
            }
        }
    }
    function jf(t) {
        let n, e, i, r, o, s, u, a = t[39].label + "";
        let c = function(t, n) {
            return t[39].value ? Cf : Tf
        }(t)(t);
        function l() {
            return t[28](t[39])
        }
        return {
            c() {
                n = is("div"),
                c.c(),
                e = os(),
                i = is("div"),
                r = rs(a),
                o = os(),
                as(i, "class", "label svelte-197nmai"),
                as(n, "class", "finger svelte-197nmai")
            },
            m(t, a) {
                ts(t, n, a),
                c.m(n, null),
                Qo(n, e),
                Qo(n, i),
                Qo(i, r),
                Qo(n, o),
                s || (u = us(n, "click", l),
                s = !0)
            },
            p(n, e) {
                t = n,
                c.p(t, e)
            },
            d(t) {
                t && ns(n),
                c.d(),
                s = !1,
                u()
            }
        }
    }
    function Of(t) {
        let n, e, i, r, o, s, u, a, c;
        function l() {
            return t[31](t[38])
        }
        function f() {
            return t[32](t[38])
        }
        return {
            c() {
                n = is("div"),
                e = is("hexi-chord"),
                o = os(),
                s = is("button"),
                s.textContent = "",
                u = os(),
                cs(e, "define", i = t[36]),
                cs(e, "dark", r = t[11] ? "" : null),
                as(s, "class", "delete-button yoopu3-icon svelte-197nmai"),
                as(n, "class", "list-item svelte-197nmai"),
                hs(n, "selected", t[2] === t[38])
            },
            m(t, i) {
                ts(t, n, i),
                Qo(n, e),
                Qo(n, o),
                Qo(n, s),
                Qo(n, u),
                a || (c = [us(e, "click", l), us(s, "click", f)],
                a = !0)
            },
            p(o, s) {
                t = o,
                1 & s[0] && i !== (i = t[36]) && cs(e, "define", i),
                2048 & s[0] && r !== (r = t[11] ? "" : null) && cs(e, "dark", r),
                4 & s[0] && hs(n, "selected", t[2] === t[38])
            },
            d(t) {
                t && ns(n),
                a = !1,
                Go(c)
            }
        }
    }
    function Af(t) {
        let n, e, i, r, o, s, u, a, c, l, f;
        function d(n) {
            t[23](n)
        }
        let h = {
            primary: !0,
            options: t[14]
        };
        void 0 !== t[4] && (h.selected = t[4]),
        i = new gf({
            props: h
        }),
        Ts.push(( () => Ks(i, "selected", d))),
        u = new Yc({
            props: {
                icon: "",
                size: "small"
            }
        }),
        u.$on("click", t[24]);
        const v = [Ef, kf]
          , p = [];
        function m(t, n) {
            return t[4] === t[13].CUSTOM_CHORD ? 0 : t[4] === t[13].SYSTEM_CHORD ? 1 : -1
        }
        return ~(c = m(t)) && (l = p[c] = v[c](t)),
        {
            c() {
                n = is("div"),
                e = is("div"),
                Ys(i.$$.fragment),
                o = os(),
                s = is("div"),
                Ys(u.$$.fragment),
                a = os(),
                l && l.c(),
                as(s, "class", "close-button svelte-197nmai"),
                as(e, "class", "top-bar svelte-197nmai"),
                as(n, "class", "custom-chord-panel svelte-197nmai")
            },
            m(t, r) {
                ts(t, n, r),
                Qo(n, e),
                Zs(i, e, null),
                Qo(e, o),
                Qo(e, s),
                Zs(u, s, null),
                Qo(n, a),
                ~c && p[c].m(n, null),
                f = !0
            },
            p(t, e) {
                const o = {};
                !r && 16 & e[0] && (r = !0,
                o.selected = t[4],
                Ms(( () => r = !1))),
                i.$set(o);
                let s = c;
                c = m(t),
                c === s ? ~c && p[c].p(t, e) : (l && (Ps(),
                Hs(p[s], 1, 1, ( () => {
                    p[s] = null
                }
                )),
                qs()),
                ~c ? (l = p[c],
                l ? l.p(t, e) : (l = p[c] = v[c](t),
                l.c()),
                Ls(l, 1),
                l.m(n, null)) : l = null)
            },
            i(t) {
                f || (Ls(i.$$.fragment, t),
                Ls(u.$$.fragment, t),
                Ls(l),
                f = !0)
            },
            o(t) {
                Hs(i.$$.fragment, t),
                Hs(u.$$.fragment, t),
                Hs(l),
                f = !1
            },
            d(t) {
                t && ns(n),
                Qs(i),
                Qs(u),
                ~c && p[c].d()
            }
        }
    }
    const Df = /^[a-zA-Z0-9#/@\-_()]+$/;
    function Mf(t, n, e) {
        let i;
        qo(t, Tu, (t => e(11, i = t)));
        let {instrument: r} = n
          , {definitions: o} = n;
        const s = Es()
          , u = {
            CUSTOM_CHORD: "CUSTOM_CHORD",
            SYSTEM_CHORD: "SYSTEM_CHORD"
        }
          , a = [{
            title: "自定义和弦",
            value: u.CUSTOM_CHORD
        }, {
            title: "系统和弦库",
            value: u.SYSTEM_CHORD
        }]
          , c = r === m.GUITAR ? "NAME=1;0,0,0,0,0,0" : "NAME=1;0,0,0,0";
        let l, f, d, h, v, p, y = [], g = u.CUSTOM_CHORD, b = o.length > 0 ? 0 : -1, w = null;
        function x(t) {
            d && (d.shiftFret(t),
            k())
        }
        async function k() {
            const {HexiChord: t} = await Jr(Hr)
              , n = d.toDefinition();
            try {
                t.getByDefinition(n),
                e(6, f = n),
                e(0, o[b] = f, o)
            } catch (t) {}
        }
        async function E() {
            if (b < 0)
                return e(6, f = null),
                d = null,
                void e(10, p = null);
            const {HexiChord: t} = await Jr(Hr);
            e(6, f = o[b]),
            d = t.getByDefinition(f),
            e(10, p = d.getName()),
            e(3, y = d.getStrings().map(( ({fret: t}) => t < 0)))
        }
        function X(t) {
            o.splice(t, 1),
            e(0, o = [...o]),
            t <= b && e(2, b--, b),
            b < 0 && o.length > 0 && e(2, b = 0)
        }
        function S(t, n) {
            d.updateFingering({
                string: t,
                fret: n ? 0 : -1,
                finger: null
            }),
            k()
        }
        return t.$$set = t => {
            "instrument"in t && e(1, r = t.instrument),
            "definitions"in t && e(0, o = t.definitions)
        }
        ,
        t.$$.update = () => {
            5 & t.$$.dirty[0] && E()
        }
        ,
        [o, r, b, y, g, l, f, h, v, w, p, i, s, u, a, c, [{
            label: "不按",
            value: null
        }, {
            label: "食指",
            value: "1"
        }, {
            label: "中指",
            value: "2"
        }, {
            label: "无名指",
            value: "3"
        }, {
            label: "小指",
            value: "4"
        }, {
            label: "拇指",
            value: "T"
        }], function() {
            p.trim() && (Df.test(p.trim()) ? (d.setName(p.trim()),
            k()) : ho.error("无效和弦名"))
        }
        , async function(t) {
            if (!f)
                return;
            if (w)
                return void e(9, w = null);
            const n = l.getBoundingClientRect();
            e(7, h = t.clientX - n.left),
            e(8, v = t.clientY - n.top);
            const {string: i, fret: r} = l.locateDot(h, v);
            if (r <= 4 && i < d.getNumStrings()) {
                e(9, w = new Vr);
                const t = await w.promise;
                e(9, w = null),
                d.updateFingering({
                    string: i,
                    fret: t ? r : 0,
                    finger: t
                }),
                k()
            }
        }
        , x, function() {
            const t = "C@" + ((o || []).length + 1);
            e(0, o = [c.replace("NAME", t), ...o]),
            e(2, b = 0),
            E()
        }
        , X, S, function(t) {
            g = t,
            e(4, g)
        }
        , () => s("close"), function() {
            p = this.value,
            e(10, p)
        }
        , (t, n) => S(t, n), function(t) {
            Ts[t ? "unshift" : "push"](( () => {
                l = t,
                e(5, l)
            }
            ))
        }
        , t => w.resolve(t.value), () => x(-1), () => x(1), t => e(2, b = t), t => X(t)]
    }
    class _f extends eu {
        constructor(t) {
            super(),
            nu(this, t, Mf, Af, Po, {
                instrument: 1,
                definitions: 0
            }, [-1, -1])
        }
    }
    function $f(t) {
        var n = {
            exports: {}
        };
        return t(n, n.exports),
        n.exports
    }
    var Bf = $f((function(t, n) {
        !function() {
            var n, e = {
                polyfill: function() {
                    if (!("KeyboardEvent"in window) || "key"in KeyboardEvent.prototype)
                        return !1;
                    var t = {
                        get: function(t) {
                            var n = e.keys[this.which || this.keyCode];
                            return Array.isArray(n) && (n = n[+this.shiftKey]),
                            n
                        }
                    };
                    return Object.defineProperty(KeyboardEvent.prototype, "key", t),
                    t
                },
                keys: {
                    3: "Cancel",
                    6: "Help",
                    8: "Backspace",
                    9: "Tab",
                    12: "Clear",
                    13: "Enter",
                    16: "Shift",
                    17: "Control",
                    18: "Alt",
                    19: "Pause",
                    20: "CapsLock",
                    27: "Escape",
                    28: "Convert",
                    29: "NonConvert",
                    30: "Accept",
                    31: "ModeChange",
                    32: " ",
                    33: "PageUp",
                    34: "PageDown",
                    35: "End",
                    36: "Home",
                    37: "ArrowLeft",
                    38: "ArrowUp",
                    39: "ArrowRight",
                    40: "ArrowDown",
                    41: "Select",
                    42: "Print",
                    43: "Execute",
                    44: "PrintScreen",
                    45: "Insert",
                    46: "Delete",
                    48: ["0", ")"],
                    49: ["1", "!"],
                    50: ["2", "@"],
                    51: ["3", "#"],
                    52: ["4", "$"],
                    53: ["5", "%"],
                    54: ["6", "^"],
                    55: ["7", "&"],
                    56: ["8", "*"],
                    57: ["9", "("],
                    91: "OS",
                    93: "ContextMenu",
                    144: "NumLock",
                    145: "ScrollLock",
                    181: "VolumeMute",
                    182: "VolumeDown",
                    183: "VolumeUp",
                    186: [";", ":"],
                    187: ["=", "+"],
                    188: [",", "<"],
                    189: ["-", "_"],
                    190: [".", ">"],
                    191: ["/", "?"],
                    192: ["`", "~"],
                    219: ["[", "{"],
                    220: ["\\", "|"],
                    221: ["]", "}"],
                    222: ["'", '"'],
                    224: "Meta",
                    225: "AltGraph",
                    246: "Attn",
                    247: "CrSel",
                    248: "ExSel",
                    249: "EraseEof",
                    250: "Play",
                    251: "ZoomOut"
                }
            };
            for (n = 1; n < 25; n++)
                e.keys[111 + n] = "F" + n;
            var i = "";
            for (n = 65; n < 91; n++)
                i = String.fromCharCode(n),
                e.keys[n] = [i.toLowerCase(), i.toUpperCase()];
            t.exports = e
        }()
    }
    ));
    class Ff {
        constructor(t) {
            this.pn = t,
            this.mn = null
        }
        runIfNotScheduled(t) {
            this.mn || (this.mn = setTimeout(( () => {
                this.pn(),
                this.mn = null
            }
            ), t))
        }
    }
    class If {
        static getCursorPosition(t) {
            const n = (t.value.substr(0, t.selectionStart).match(/\n/g) || []).length
              , e = t.value.substr(0, t.selectionStart).lastIndexOf("\n");
            return {
                line: n,
                column: t.selectionStart - e - 1
            }
        }
        static installCursorMove(t) {
            let n = t.selectionStart;
            const e = new Ff(( () => {
                n !== t.selectionStart && (n = t.selectionStart,
                t.dispatchEvent(new Event("cursormove")))
            }
            ))
              , i = e.runIfNotScheduled.bind(e, 1);
            t.addEventListener("mousedown", i, !1),
            t.addEventListener("keydown", i, !1),
            t.addEventListener("change", i, !1)
        }
    }
    const Rf = "{start_of_tab}"
      , Nf = "{end_of_tab}";
    function Gf(t) {
        const n = "|" + new Array(18).join("-")
          , e = new Array(3).join(n) + "|\n";
        return "@\n" + new Array(t + 1).join(e) + "%\n"
    }
    Bf.polyfill();
    class zf {
        constructor(t, n, e, i, r) {
            this.yn = t,
            this.gn = n,
            this.bn = e,
            this.wn = i,
            this.xn = r;
            const o = getComputedStyle(t);
            this.kn = Lf("-", o["font-size"] + " " + o["font-family"]),
            this.yn.addEventListener("keydown", this.Dt.bind(this), !1),
            this.yn.addEventListener("cursormove", this.En.bind(this), !1),
            Nr(this.yn, Rr, this.Xn.bind(this));
            const s = new Ff(( () => {
                this.yn !== document.activeElement && (delete this.bn.offsetX,
                delete this.bn.offsetY,
                this.Xn())
            }
            ));
            this.yn.addEventListener("blur", s.runIfNotScheduled.bind(s, 100), !1),
            zr(hr(this.wn, ".addColumn"), "click", this.Sn.bind(this, "-", !1)),
            zr(hr(this.wn, ".deleteColumn"), "click", this.Sn.bind(this, "Backspace", !0)),
            zr(hr(this.wn, ".del"), "click", this.Sn.bind(this, "Delete", !1))
        }
        Dt(t) {
            const n = t.key;
            if ((t.ctrlKey || t.altKey || t.metaKey) && "Backspace" !== n)
                return;
            const e = this.yn.value.toLowerCase().split("\n")
              , i = If.getCursorPosition(this.yn);
            if (!this.xn && !Pf(e, i.line))
                return;
            if (!e[i.line] || "|" !== e[i.line][0]) {
                if (!e[i.line] && "|" === n) {
                    const n = this.yn.selectionStart;
                    this.yn.value = this.yn.value.substr(0, n) + Gf(this.gn) + this.yn.value.substr(n),
                    this.Tn(n + 3),
                    t.preventDefault()
                }
                return
            }
            this.Cn(i.line, i.column, n, t.shiftKey) && t.preventDefault()
        }
        En() {
            const t = this.yn.value.toLowerCase().split("\n")
              , n = If.getCursorPosition(this.yn);
            if ((this.xn || Pf(t, n.line)) && ["|", "%", "@"].indexOf(t[n.line][0]) >= 0) {
                const {startLine: e, endLine: i} = qf(t, n.line)
                  , r = i - e + 1;
                this.bn.style.height = 18 * r + 2 + "px",
                this.bn.offsetX = n.column * this.kn + 20,
                this.bn.offsetY = 18 * e + 10
            } else
                delete this.bn.offsetX,
                delete this.bn.offsetY;
            this.Xn()
        }
        Cn(t, n, e, i) {
            if ("|" === e || "-" === e)
                return this.jn(t, n, e),
                !0;
            if ("R" === e || "r" === e || "=" === e || "*" === e)
                return this.jn(t, n, e, "-"),
                !0;
            if (1 === e.length)
                return " " === e && (e = "-"),
                this.On(t, n, e),
                !0;
            if ("Backspace" === e || "Delete" === e)
                return i ? this.jn(t, n, e) : this.On(t, n, e),
                !0;
            if ("Enter" === e && "\n" !== this.An() && ("|" !== this.An() || "\n" !== this.An(-1))) {
                const t = this.yn.value.indexOf("\n", this.yn.selectionStart);
                if (t >= 0) {
                    let e = t + n + 1;
                    const i = this.yn.value.indexOf("\n", t + 1);
                    i >= 0 && (e = Math.min(e, i)),
                    this.Tn(e)
                }
                return !0
            }
            return !1
        }
        Tn(t) {
            this.yn.selectionStart = t,
            this.yn.selectionEnd = t
        }
        An(t=0) {
            return this.yn.value[this.yn.selectionStart + t]
        }
        jn(t, n, e, i) {
            i = i || e;
            const r = this.yn.value.split("\n")
              , {startLine: o, endLine: s} = qf(r, t);
            let u = this.yn.selectionStart;
            for (let a = o; a <= s; ++a)
                if (!(r[a].length < n))
                    if ("Backspace" === e)
                        a <= t && u--,
                        r[a] = r[a].substr(0, n - 1) + r[a].substr(n);
                    else if ("Delete" === e)
                        a <= t && u--,
                        r[a] = r[a].substr(0, n) + r[a].substr(n + 1);
                    else {
                        let o = " ";
                        "|" === r[a][0] ? o = a === t ? e : i : "%" === r[a][0] && "-" === r[a][n] && "-" === r[a][n - 1] && (o = "-"),
                        r[a] = r[a].substr(0, n) + o + r[a].substr(n),
                        a <= t && u++
                    }
            this.yn.value = r.join("\n"),
            "-" === e && u--,
            this.Tn(u)
        }
        On(t, n, e) {
            const i = this.yn.selectionStart
              , r = "Backspace" === e
              , o = "Delete" === e;
            o && (e = "-");
            const s = this.yn.value[r ? i - 1 : i];
            if ("|" !== s && "\n" !== s) {
                const i = this.yn.value.split("\n");
                i[t] = r ? i[t].substr(0, n - 1) + "-" + i[t].substr(n) : i[t].substr(0, n) + e + i[t].substr(n + 1),
                this.yn.value = i.join("\n")
            }
            o ? this.Tn(i) : this.Tn(r ? i - 1 : i + 1)
        }
        Xn() {
            void 0 === this.bn.offsetX && (this.bn.style.transform = "",
            this.wn.style.transform = "");
            const t = this.bn.offsetY - this.yn.scrollTop
              , n = this.bn.offsetX;
            this.bn.style.transform = `translate(${n}px, ${t}px)`,
            this.wn.style.transform = `translate(${n}px, ${t + 15}px)`
        }
        Sn(t, n) {
            const e = new Event("keydown");
            e.key = t,
            e.shiftKey = n,
            this.yn.dispatchEvent(e),
            this.yn.focus();
            const i = new Event("keyup");
            i.key = t,
            e.shiftKey = n,
            this.yn.dispatchEvent(i)
        }
    }
    function Pf(t, n) {
        if (t[n] === Rf || t[n] === Nf)
            return !1;
        let e = n
          , i = !1
          , r = !1;
        for (; e-- >= 0; ) {
            if (t[e] === Rf) {
                i = !0;
                break
            }
            if (t[e] === Nf)
                break
        }
        for (e = n; e++ < t.length && t[e] !== Rf; )
            if (t[e] === Nf) {
                r = !0;
                break
            }
        return i && r
    }
    function qf(t, n) {
        const e = t => ["|", "@", "%"].indexOf(t[0]) >= 0;
        let i = n;
        for (; e(t[i - 1] || ""); )
            i--;
        let r = n;
        for (; e(t[r + 1] || ""); )
            r++;
        return {
            startLine: i,
            endLine: r
        }
    }
    function Lf(t, n) {
        const e = (Lf.canvas || (Lf.canvas = document.createElement("canvas"))).getContext("2d");
        e.font = n;
        return e.measureText(t).width
    }
    function Hf(t) {
        let n, e, i, r, o, s, u, a, c, l, f, d, h, v, p, m;
        return {
            c() {
                n = is("div"),
                e = is("div"),
                i = is("button"),
                i.innerHTML = '<span class="icon yoopu3-icon green svelte-eyz0di"></span> \n          <span>插入段落名</span>',
                r = os(),
                o = is("button"),
                o.innerHTML = '<span class="icon yoopu3-icon blue svelte-eyz0di"></span> \n          <span>插入节奏型</span>',
                s = os(),
                u = is("button"),
                u.innerHTML = '<span class="icon yoopu3-icon blue svelte-eyz0di"></span> \n          <span>插入独奏</span>',
                l = os(),
                f = is("div"),
                as(i, "class", "svelte-eyz0di"),
                as(o, "class", "svelte-eyz0di"),
                as(u, "class", "svelte-eyz0di"),
                as(e, "class", "operation-panel svelte-eyz0di"),
                as(n, "class", "operation-panel-wrapper svelte-eyz0di"),
                as(f, "class", "highlight svelte-eyz0di")
            },
            m(a, c) {
                ts(a, n, c),
                Qo(n, e),
                Qo(e, i),
                Qo(e, r),
                Qo(e, o),
                Qo(e, s),
                Qo(e, u),
                ts(a, l, c),
                ts(a, f, c),
                v = !0,
                p || (m = [us(i, "click", t[7]), us(o, "click", t[8]), us(u, "click", t[9])],
                p = !0)
            },
            p: Fo,
            i(t) {
                v || (Ds(( () => {
                    c && c.end(1),
                    a || (a = Js(n, Hc, {
                        duration: 100
                    })),
                    a.start()
                }
                )),
                Ds(( () => {
                    h && h.end(1),
                    d || (d = Js(f, Hc, {
                        duration: 100
                    })),
                    d.start()
                }
                )),
                v = !0)
            },
            o(t) {
                a && a.invalidate(),
                c = Ws(n, Hc, {
                    delay: 200,
                    duration: 200
                }),
                d && d.invalidate(),
                h = Ws(f, Hc, {
                    delay: 200,
                    duration: 200
                }),
                v = !1
            },
            d(t) {
                t && ns(n),
                t && c && c.end(),
                t && ns(l),
                t && ns(f),
                t && h && h.end(),
                p = !1,
                Go(m)
            }
        }
    }
    function Uf(t) {
        let n, e, i, r, o, s, u = t[0] && Hf(t);
        return {
            c() {
                n = is("div"),
                e = is("div"),
                e.innerHTML = '<div class="operation-icon svelte-eyz0di"><span class="icon yoopu3-icon svelte-eyz0di"></span></div>',
                i = os(),
                u && u.c(),
                as(e, "class", "operation-icon-wrapper svelte-eyz0di"),
                as(n, "class", "line-operation svelte-eyz0di"),
                hs(n, "visible", t[6]),
                hs(n, "hover", t[0])
            },
            m(a, c) {
                ts(a, n, c),
                Qo(n, e),
                Qo(n, i),
                u && u.m(n, null),
                r = !0,
                o || (s = [us(n, "mouseenter", t[10]), us(n, "mouseleave", t[11])],
                o = !0)
            },
            p(t, [e]) {
                t[0] ? u ? (u.p(t, e),
                1 & e && Ls(u, 1)) : (u = Hf(t),
                u.c(),
                Ls(u, 1),
                u.m(n, null)) : u && (Ps(),
                Hs(u, 1, 1, ( () => {
                    u = null
                }
                )),
                qs()),
                64 & e && hs(n, "visible", t[6]),
                1 & e && hs(n, "hover", t[0])
            },
            i(t) {
                r || (Ls(u),
                r = !0)
            },
            o(t) {
                Hs(u),
                r = !1
            },
            d(t) {
                t && ns(n),
                u && u.d(),
                o = !1,
                Go(s)
            }
        }
    }
    function Jf(t, n, e) {
        let {xheEditor: i} = n
          , {timeSignature: r} = n
          , {instrument: o} = n
          , {visible: s=!1} = n
          , {isHover: u=!1} = n
          , {selectedRhythm: a} = n
          , {selectedTab: c} = n;
        return t.$$set = t => {
            "xheEditor"in t && e(3, i = t.xheEditor),
            "timeSignature"in t && e(4, r = t.timeSignature),
            "instrument"in t && e(5, o = t.instrument),
            "visible"in t && e(6, s = t.visible),
            "isHover"in t && e(0, u = t.isHover),
            "selectedRhythm"in t && e(1, a = t.selectedRhythm),
            "selectedTab"in t && e(2, c = t.selectedTab)
        }
        ,
        [u, a, c, i, r, o, s, () => {
            i.insertHeadline()
        }
        , () => {
            const t = Il(r, o)[0].value;
            i.insertRhythm(t),
            e(1, a = t)
        }
        , () => {
            const t = Gf(o === m.GUITAR ? 6 : 4);
            i.insertTab(t),
            e(2, c = t)
        }
        , () => e(0, u = !0), () => e(0, u = !1)]
    }
    class Wf extends eu {
        constructor(t) {
            super(),
            nu(this, t, Jf, Uf, Po, {
                xheEditor: 3,
                timeSignature: 4,
                instrument: 5,
                visible: 6,
                isHover: 0,
                selectedRhythm: 1,
                selectedTab: 2
            })
        }
    }
    const {window: Vf} = Vs;
    function Kf(t, n, e) {
        const i = t.slice();
        return i[22] = n[e],
        i
    }
    function Yf(t) {
        let n, e;
        return {
            c() {
                n = is("span"),
                e = rs(t[2]),
                as(n, "class", "placeholder svelte-1xhuk2y")
            },
            m(t, i) {
                ts(t, n, i),
                Qo(n, e)
            },
            p(t, n) {
                4 & n && fs(e, t[2])
            },
            d(t) {
                t && ns(n)
            }
        }
    }
    function Zf(t) {
        let n, e;
        return {
            c() {
                n = is("span"),
                e = rs(t[7]),
                as(n, "class", "svelte-1xhuk2y")
            },
            m(t, i) {
                ts(t, n, i),
                Qo(n, e)
            },
            p(t, n) {
                128 & n && fs(e, t[7])
            },
            d(t) {
                t && ns(n)
            }
        }
    }
    function Qf(t) {
        let n, e, i, r, o, s = t[22].title + "";
        function u() {
            return t[15](t[22])
        }
        return {
            c() {
                n = is("div"),
                e = rs(s),
                i = os(),
                as(n, "class", "option svelte-1xhuk2y"),
                hs(n, "selected", t[22].value === t[0]),
                hs(n, "disabled", t[22].disabled)
            },
            m(t, s) {
                ts(t, n, s),
                Qo(n, e),
                Qo(n, i),
                r || (o = us(n, "click", u),
                r = !0)
            },
            p(i, r) {
                t = i,
                2 & r && s !== (s = t[22].title + "") && fs(e, s),
                3 & r && hs(n, "selected", t[22].value === t[0]),
                2 & r && hs(n, "disabled", t[22].disabled)
            },
            d(t) {
                t && ns(n),
                r = !1,
                o()
            }
        }
    }
    function td(t) {
        let n, e, i, r, o, s, u, a, c, l;
        function f(t, n) {
            return t[7] ? Zf : t[2] ? Yf : void 0
        }
        let d = f(t)
          , h = d && d(t)
          , v = t[1]
          , p = [];
        for (let n = 0; n < v.length; n += 1)
            p[n] = Qf(Kf(t, v, n));
        return {
            c() {
                n = is("div"),
                e = is("div"),
                h && h.c(),
                i = os(),
                r = is("i"),
                r.textContent = "",
                o = os(),
                s = is("div");
                for (let t = 0; t < p.length; t += 1)
                    p[t].c();
                as(r, "class", "icon yoopu3-icon svelte-1xhuk2y"),
                as(e, "class", "current svelte-1xhuk2y"),
                as(s, "class", "options svelte-1xhuk2y"),
                as(s, "style", u = t[8] || ""),
                hs(s, "top", t[10]),
                hs(s, "show", t[5]),
                as(n, "class", "dropdown-selector svelte-1xhuk2y"),
                as(n, "style", a = t[8] || ""),
                hs(n, "gray", t[4]),
                hs(n, "small", "small" === t[3])
            },
            m(u, a) {
                ts(u, n, a),
                Qo(n, e),
                h && h.m(e, null),
                Qo(e, i),
                Qo(e, r),
                Qo(n, o),
                Qo(n, s);
                for (let t = 0; t < p.length; t += 1)
                    p[t].m(s, null);
                var f;
                t[16](s),
                t[17](n),
                c || (l = [us(Vf, "click", t[13]), us(e, "click", (f = t[12],
                function(t) {
                    return t.stopPropagation(),
                    f.call(this, t)
                }
                ))],
                c = !0)
            },
            p(t, [r]) {
                if (d === (d = f(t)) && h ? h.p(t, r) : (h && h.d(1),
                h = d && d(t),
                h && (h.c(),
                h.m(e, i))),
                2051 & r) {
                    let n;
                    for (v = t[1],
                    n = 0; n < v.length; n += 1) {
                        const e = Kf(t, v, n);
                        p[n] ? p[n].p(e, r) : (p[n] = Qf(e),
                        p[n].c(),
                        p[n].m(s, null))
                    }
                    for (; n < p.length; n += 1)
                        p[n].d(1);
                    p.length = v.length
                }
                256 & r && u !== (u = t[8] || "") && as(s, "style", u),
                1024 & r && hs(s, "top", t[10]),
                32 & r && hs(s, "show", t[5]),
                256 & r && a !== (a = t[8] || "") && as(n, "style", a),
                16 & r && hs(n, "gray", t[4]),
                8 & r && hs(n, "small", "small" === t[3])
            },
            i: Fo,
            o: Fo,
            d(e) {
                e && ns(n),
                h && h.d(),
                es(p, e),
                t[16](null),
                t[17](null),
                c = !1,
                Go(l)
            }
        }
    }
    let nd;
    function ed(t, n, e) {
        let i, r, o, s, {options: u=[]} = n, {placeholder: a} = n, {selected: c} = n, {width: l} = n, {size: f=""} = n, {gray: d=!1} = n, h = !1, v = !1;
        function p() {
            !function() {
                if (!i)
                    return;
                const t = i.getBoundingClientRect();
                e(10, v = t.y + t.height > window.innerHeight)
            }()
        }
        function m(t) {
            e(5, h = !1),
            t.disabled || e(0, c = t.value)
        }
        ks(( () => {
            !function() {
                if ("string" == typeof l)
                    return void e(8, o = `width: ${l}`);
                if (l > 0)
                    return void e(8, o = `width: ${l}px;`);
                const t = i.getBoundingClientRect()
                  , n = s.getBoundingClientRect()
                  , r = Math.max(n.width, t.width + 30);
                e(8, o = `width: ${r}px;`)
            }()
        }
        ));
        return t.$$set = t => {
            "options"in t && e(1, u = t.options),
            "placeholder"in t && e(2, a = t.placeholder),
            "selected"in t && e(0, c = t.selected),
            "width"in t && e(14, l = t.width),
            "size"in t && e(3, f = t.size),
            "gray"in t && e(4, d = t.gray)
        }
        ,
        t.$$.update = () => {
            3 & t.$$.dirty && function() {
                const t = u.find((t => t.value === c));
                e(7, r = t && !t.disabled ? t.title : "")
            }(),
            32 & t.$$.dirty && p()
        }
        ,
        [c, u, a, f, d, h, i, r, o, s, v, m, function() {
            nd && nd !== s && nd.hideOptions && nd.hideOptions(),
            e(5, h = !h),
            nd = s,
            nd.hideOptions = () => {
                e(5, h = !1)
            }
        }
        , function() {
            e(5, h = !1)
        }
        , l, t => {
            m(t)
        }
        , function(t) {
            Ts[t ? "unshift" : "push"](( () => {
                i = t,
                e(6, i)
            }
            ))
        }
        , function(t) {
            Ts[t ? "unshift" : "push"](( () => {
                s = t,
                e(9, s)
            }
            ))
        }
        ]
    }
    class id extends eu {
        constructor(t) {
            super(),
            nu(this, t, ed, td, Po, {
                options: 1,
                placeholder: 2,
                selected: 0,
                width: 14,
                size: 3,
                gray: 4
            })
        }
    }
    function rd(t) {
        let n, e, i;
        return {
            c() {
                n = is("input"),
                as(n, "type", "number"),
                as(n, "autocomplete", t[1]),
                n.autofocus = t[2],
                as(n, "min", t[3]),
                as(n, "max", t[4]),
                as(n, "placeholder", t[5]),
                as(n, "size", t[6]),
                as(n, "align", t[7]),
                as(n, "class", "svelte-86356a")
            },
            m(r, o) {
                ts(r, n, o),
                ds(n, t[0]),
                e || (i = us(n, "input", t[8]),
                e = !0)
            },
            p(t, [e]) {
                2 & e && as(n, "autocomplete", t[1]),
                4 & e && (n.autofocus = t[2]),
                8 & e && as(n, "min", t[3]),
                16 & e && as(n, "max", t[4]),
                32 & e && as(n, "placeholder", t[5]),
                64 & e && as(n, "size", t[6]),
                128 & e && as(n, "align", t[7]),
                1 & e && ls(n.value) !== t[0] && ds(n, t[0])
            },
            i: Fo,
            o: Fo,
            d(t) {
                t && ns(n),
                e = !1,
                i()
            }
        }
    }
    function od(t, n, e) {
        let {autocomplete: i} = n
          , {autofocus: r} = n
          , {min: o=-1 / 0} = n
          , {max: s=1 / 0} = n
          , {placeholder: u} = n
          , {size: a=""} = n
          , {value: c} = n
          , {align: l="left"} = n;
        return t.$$set = t => {
            "autocomplete"in t && e(1, i = t.autocomplete),
            "autofocus"in t && e(2, r = t.autofocus),
            "min"in t && e(3, o = t.min),
            "max"in t && e(4, s = t.max),
            "placeholder"in t && e(5, u = t.placeholder),
            "size"in t && e(6, a = t.size),
            "value"in t && e(0, c = t.value),
            "align"in t && e(7, l = t.align)
        }
        ,
        [c, i, r, o, s, u, a, l, function() {
            c = ls(this.value),
            e(0, c)
        }
        ]
    }
    class sd extends eu {
        constructor(t) {
            super(),
            nu(this, t, od, rd, Po, {
                autocomplete: 1,
                autofocus: 2,
                min: 3,
                max: 4,
                placeholder: 5,
                size: 6,
                value: 0,
                align: 7
            })
        }
    }
    const ud = t => ({})
      , ad = t => ({});
    function cd(t) {
        let n, e;
        return {
            c() {
                n = is("div"),
                e = rs(t[2]),
                as(n, "class", "title svelte-ezjm8c")
            },
            m(t, i) {
                ts(t, n, i),
                Qo(n, e)
            },
            p(t, n) {
                4 & n && fs(e, t[2])
            },
            d(t) {
                t && ns(n)
            }
        }
    }
    function ld(t) {
        let n, e;
        return {
            c() {
                n = is("div"),
                as(n, "class", "arrow svelte-ezjm8c"),
                as(n, "style", e = t[10].arrow),
                as(n, "position", t[8])
            },
            m(t, e) {
                ts(t, n, e)
            },
            p(t, i) {
                1024 & i && e !== (e = t[10].arrow) && as(n, "style", e),
                256 & i && as(n, "position", t[8])
            },
            d(t) {
                t && ns(n)
            }
        }
    }
    function fd(t) {
        let n, e, i, r, o, s, u, a, c, l, f;
        const d = t[15].default
          , h = Lo(d, t, t[14], null);
        let v = t[2] && cd(t);
        const p = t[15].content
          , m = Lo(p, t, t[14], ad);
        let y = t[1] && ld(t);
        return {
            c() {
                n = is("div"),
                e = is("div"),
                h && h.c(),
                i = os(),
                r = is("div"),
                o = is("div"),
                v && v.c(),
                s = os(),
                m && m.c(),
                u = os(),
                y && y.c(),
                as(e, "class", "anchor"),
                as(o, "class", "content svelte-ezjm8c"),
                hs(o, "no-padding", !t[4]),
                as(r, "class", "wrapper svelte-ezjm8c"),
                as(r, "style", a = t[10].wrapper),
                hs(r, "theme", t[3]),
                hs(r, "show", t[0]),
                as(n, "class", "popover svelte-ezjm8c")
            },
            m(a, d) {
                ts(a, n, d),
                Qo(n, e),
                h && h.m(e, null),
                t[16](e),
                Qo(n, i),
                Qo(n, r),
                Qo(r, o),
                v && v.m(o, null),
                Qo(o, s),
                m && m.m(o, null),
                Qo(o, u),
                y && y.m(o, null),
                t[17](r),
                c = !0,
                l || (f = [us(e, "mouseenter", t[13]), us(r, "mouseenter", t[18]), us(r, "click", t[19]), us(r, "mouseleave", t[20]), us(n, "mouseenter", t[11]), us(n, "mouseleave", t[12])],
                l = !0)
            },
            p(t, [n]) {
                h && h.p && 16384 & n && Uo(h, d, t, t[14], n, null, null),
                t[2] ? v ? v.p(t, n) : (v = cd(t),
                v.c(),
                v.m(o, s)) : v && (v.d(1),
                v = null),
                m && m.p && 16384 & n && Uo(m, p, t, t[14], n, ud, ad),
                t[1] ? y ? y.p(t, n) : (y = ld(t),
                y.c(),
                y.m(o, null)) : y && (y.d(1),
                y = null),
                16 & n && hs(o, "no-padding", !t[4]),
                (!c || 1024 & n && a !== (a = t[10].wrapper)) && as(r, "style", a),
                8 & n && hs(r, "theme", t[3]),
                1 & n && hs(r, "show", t[0])
            },
            i(t) {
                c || (Ls(h, t),
                Ls(m, t),
                c = !0)
            },
            o(t) {
                Hs(h, t),
                Hs(m, t),
                c = !1
            },
            d(e) {
                e && ns(n),
                h && h.d(e),
                t[16](null),
                v && v.d(),
                m && m.d(e),
                y && y.d(),
                t[17](null),
                l = !1,
                Go(f)
            }
        }
    }
    const dd = 10;
    function hd(t, n, e) {
        let {$$slots: i={}, $$scope: r} = n
          , {arrow: o=!0} = n
          , {show: s=!1} = n
          , {title: u} = n
          , {theme: a=!1} = n
          , {padding: c=!0} = n
          , {closeOnClick: l=!1} = n;
        const f = "top"
          , d = "bottom";
        let h, v, p, m, y, g = !1, b = {};
        var w;
        function x() {
            y = setTimeout(( () => {
                g || e(0, s = !1)
            }
            ), 100)
        }
        w = () => {
            m && m.parentNode.removeChild(m)
        }
        ,
        xs().$$.on_destroy.push(w);
        return t.$$set = t => {
            "arrow"in t && e(1, o = t.arrow),
            "show"in t && e(0, s = t.show),
            "title"in t && e(2, u = t.title),
            "theme"in t && e(3, a = t.theme),
            "padding"in t && e(4, c = t.padding),
            "closeOnClick"in t && e(5, l = t.closeOnClick),
            "$$scope"in t && e(14, r = t.$$scope)
        }
        ,
        [s, o, u, a, c, l, g, h, v, p, b, function() {
            y && clearTimeout(y),
            e(0, s = !0)
        }
        , x, function() {
            m || (m = function() {
                const t = document.createElement("div");
                return t.style.position = "absolute",
                t.style.top = 0,
                t.style.left = 0,
                t.style.width = "100%",
                t
            }(),
            m.appendChild(p),
            document.body.appendChild(m)),
            function() {
                const t = h ? h.getBoundingClientRect() : {
                    x: 100,
                    y: 100,
                    width: 100,
                    height: 100
                }
                  , n = function() {
                    const t = document.body
                      , n = window.getComputedStyle(t)
                      , e = parseInt(n["margin-left"].replace("px", ""))
                      , i = parseInt(n["margin-right"].replace("px", ""));
                    return t.getBoundingClientRect().width + e + i
                }()
                  , i = p ? {
                    width: p.offsetWidth,
                    height: p.offsetHeight
                } : null;
                let r = 0
                  , o = ""
                  , s = "";
                t.centerX = t.x + window.scrollX + t.width / 2,
                t.centerY = t.y + window.scrollY + t.height / 2,
                t.centerX < i.width / 2 ? r = i.width / 2 - t.centerX + 10 : n - t.centerX < i.width / 2 && (r = n - t.centerX - i.width / 2 - 10);
                t.centerY - window.scrollY >= window.innerHeight / 3 ? (e(8, v = f),
                o = `\n      left: ${t.centerX + r}px;\n      top: ${t.centerY - dd}px;\n      transform: translate(-50%, -${i.height + t.height / 2}px)`,
                s = `left:${i.width / 2 - r}px;\n      bottom: -10px; transform: translate(-50%, 25%);`) : (e(8, v = d),
                o = `\n      left: ${t.centerX + r}px;\n      top: ${t.centerY + dd}px;\n      transform: translate(-50%, ${t.height / 2}px);`,
                s = `left:${i.width / 2 - r}px;\n      top: -10px; transform: translate(-50%, -25%);`);
                e(10, b = {
                    wrapper: o,
                    arrow: s
                })
            }()
        }
        , r, i, function(t) {
            Ts[t ? "unshift" : "push"](( () => {
                h = t,
                e(7, h)
            }
            ))
        }
        , function(t) {
            Ts[t ? "unshift" : "push"](( () => {
                p = t,
                e(9, p)
            }
            ))
        }
        , () => {
            e(6, g = !0)
        }
        , () => {
            l && e(0, s = !1)
        }
        , () => {
            e(6, g = !1),
            x()
        }
        ]
    }
    class vd extends eu {
        constructor(t) {
            super(),
            nu(this, t, hd, fd, Po, {
                arrow: 1,
                show: 0,
                title: 2,
                theme: 3,
                padding: 4,
                closeOnClick: 5
            })
        }
    }
    function pd(t, n, e) {
        return Math.min(e, Math.max(n, t))
    }
    function md(t) {
        let n, e, i, r, o, s, u, a, c, l;
        return {
            c() {
                n = is("div"),
                e = is("div"),
                i = is("div"),
                r = os(),
                o = is("div"),
                s = os(),
                u = is("div"),
                a = is("div"),
                as(i, "class", "barBg svelte-1kv0zx8"),
                as(o, "class", "barFg svelte-1kv0zx8"),
                as(o, "style", t[3]),
                as(e, "class", "container svelte-1kv0zx8"),
                as(a, "class", "thumb svelte-1kv0zx8"),
                as(u, "class", "thumb-wrapper svelte-1kv0zx8"),
                as(u, "style", t[4]),
                as(n, "style", t[2]),
                as(n, "class", "slider svelte-1kv0zx8"),
                hs(n, "disabled", t[0])
            },
            m(f, d) {
                ts(f, n, d),
                Qo(n, e),
                Qo(e, i),
                Qo(e, r),
                Qo(e, o),
                t[14](e),
                Qo(n, s),
                Qo(n, u),
                Qo(u, a),
                c || (l = [us(e, "click", t[8]), us(u, "mousedown", t[5]), us(u, "mouseup", t[6]), us(u, "mouseleave", t[6]), us(u, "mousemove", t[7]), us(u, "touchstart", t[5]), us(u, "touchend", t[6]), us(u, "touchmove", t[7])],
                c = !0)
            },
            p(t, [e]) {
                8 & e && as(o, "style", t[3]),
                16 & e && as(u, "style", t[4]),
                4 & e && as(n, "style", t[2]),
                1 & e && hs(n, "disabled", t[0])
            },
            i: Fo,
            o: Fo,
            d(e) {
                e && ns(n),
                t[14](null),
                c = !1,
                Go(l)
            }
        }
    }
    function yd(t, n, e) {
        let {min: i=0} = n
          , {max: r=1} = n
          , {grain: o=0} = n
          , {disabled: s=!1} = n
          , {color: u} = n
          , {value: a=m(.5)} = n;
        const c = Es();
        let l, f, d, h, v;
        function p() {
            const t = 100 * pd((a - i) / (r - i), 0, 1);
            e(3, h = Ra({
                width: t + "%"
            })),
            e(4, v = Ra({
                left: `calc(${t}% - 15px)`
            }))
        }
        function m(t) {
            let n = t * (r - i) + i;
            return o && (n = Math.round(n / o) * o),
            n
        }
        return t.$$set = t => {
            "min"in t && e(10, i = t.min),
            "max"in t && e(11, r = t.max),
            "grain"in t && e(12, o = t.grain),
            "disabled"in t && e(0, s = t.disabled),
            "color"in t && e(13, u = t.color),
            "value"in t && e(9, a = t.value)
        }
        ,
        t.$$.update = () => {
            8192 & t.$$.dirty && e(2, d = Ra({
                "--color": u || "var(--color-strength-1)"
            })),
            512 & t.$$.dirty && (f || p())
        }
        ,
        [s, l, d, h, v, function(t) {
            t.stopPropagation(),
            s || (f = l.getBoundingClientRect())
        }
        , function(t) {
            t.stopPropagation(),
            f = null
        }
        , function(t) {
            if (t.stopPropagation(),
            f) {
                const n = f.left + window.pageXOffset
                  , i = pd((t.changedTouches ? t.changedTouches[0].pageX : t.pageX) - n, 0, f.width) / f.width;
                e(9, a = m(i)),
                p(),
                c("change", {
                    value: a
                })
            }
        }
        , function(t) {
            if (!s) {
                const n = t.offsetX / l.getBoundingClientRect().width;
                e(9, a = m(n)),
                c("change", {
                    value: a
                })
            }
        }
        , a, i, r, o, u, function(t) {
            Ts[t ? "unshift" : "push"](( () => {
                l = t,
                e(1, l)
            }
            ))
        }
        ]
    }
    class gd extends eu {
        constructor(t) {
            super(),
            nu(this, t, yd, md, Po, {
                min: 10,
                max: 11,
                grain: 12,
                disabled: 0,
                color: 13,
                value: 9
            })
        }
    }
    function bd(t) {
        let n, e, i, r;
        function o(n) {
            t[8](n)
        }
        let s = {
            size: "small",
            min: 40,
            max: 160
        };
        return void 0 !== t[4] && (s.value = t[4]),
        e = new sd({
            props: s
        }),
        Ts.push(( () => Ks(e, "value", o))),
        {
            c() {
                n = is("div"),
                Ys(e.$$.fragment),
                as(n, "class", "bpm-container")
            },
            m(t, i) {
                ts(t, n, i),
                Zs(e, n, null),
                r = !0
            },
            p(t, n) {
                const r = {};
                !i && 16 & n && (i = !0,
                r.value = t[4],
                Ms(( () => i = !1))),
                e.$set(r)
            },
            i(t) {
                r || (Ls(e.$$.fragment, t),
                r = !0)
            },
            o(t) {
                Hs(e.$$.fragment, t),
                r = !1
            },
            d(t) {
                t && ns(n),
                Qs(e)
            }
        }
    }
    function wd(t) {
        let n, e, i, r;
        function o(n) {
            t[7](n)
        }
        let s = {
            color: "var(--color-accent)",
            min: 40,
            max: 160,
            grain: "1"
        };
        return void 0 !== t[4] && (s.value = t[4]),
        e = new gd({
            props: s
        }),
        Ts.push(( () => Ks(e, "value", o))),
        {
            c() {
                n = is("div"),
                Ys(e.$$.fragment),
                as(n, "class", "popover svelte-ydp9rg"),
                as(n, "slot", "content")
            },
            m(t, i) {
                ts(t, n, i),
                Zs(e, n, null),
                r = !0
            },
            p(t, n) {
                const r = {};
                !i && 16 & n && (i = !0,
                r.value = t[4],
                Ms(( () => i = !1))),
                e.$set(r)
            },
            i(t) {
                r || (Ls(e.$$.fragment, t),
                r = !0)
            },
            o(t) {
                Hs(e.$$.fragment, t),
                r = !1
            },
            d(t) {
                t && ns(n),
                Qs(e)
            }
        }
    }
    function xd(t) {
        let n, e, i, r, o, s, u, a, c, l, f, d, h, v, p, m, y, g, b, w, x, E, X, S, T, C, j;
        function O(n) {
            t[6](n)
        }
        let A = {
            placeholder: "请选择",
            size: "small",
            width: 60,
            options: Nl
        };
        function D(n) {
            t[9](n)
        }
        void 0 !== t[0] && (A.selected = t[0]),
        o = new id({
            props: A
        }),
        Ts.push(( () => Ks(o, "selected", O))),
        d = new vd({
            props: {
                $$slots: {
                    content: [wd],
                    default: [bd]
                },
                $$scope: {
                    ctx: t
                }
            }
        });
        let M = {
            placeholder: "请选择",
            size: "small",
            width: 60,
            options: Gl
        };
        function _(n) {
            t[10](n)
        }
        void 0 !== t[1] && (M.selected = t[1]),
        g = new id({
            props: M
        }),
        Ts.push(( () => Ks(g, "selected", D)));
        let $ = {
            placeholder: "请选择",
            size: "small",
            width: 70,
            options: k(t[3])
        };
        return void 0 !== t[2] && ($.selected = t[2]),
        T = new id({
            props: $
        }),
        Ts.push(( () => Ks(T, "selected", _))),
        {
            c() {
                n = is("div"),
                e = is("span"),
                e.textContent = "拍号",
                i = os(),
                r = is("span"),
                Ys(o.$$.fragment),
                u = os(),
                a = is("div"),
                c = is("span"),
                c.textContent = "拍速",
                l = os(),
                f = is("span"),
                Ys(d.$$.fragment),
                h = os(),
                v = is("div"),
                p = is("span"),
                p.textContent = "原唱调",
                m = os(),
                y = is("span"),
                Ys(g.$$.fragment),
                w = os(),
                x = is("div"),
                E = is("span"),
                E.textContent = "Capo",
                X = os(),
                S = is("span"),
                Ys(T.$$.fragment),
                as(e, "class", "label svelte-ydp9rg"),
                as(r, "class", "value svelte-ydp9rg"),
                as(n, "class", "col svelte-ydp9rg"),
                as(c, "class", "label svelte-ydp9rg"),
                as(f, "class", "value svelte-ydp9rg"),
                as(a, "class", "col svelte-ydp9rg"),
                as(p, "class", "label svelte-ydp9rg"),
                as(y, "class", "value svelte-ydp9rg"),
                as(v, "class", "col bottom svelte-ydp9rg"),
                as(E, "class", "label svelte-ydp9rg"),
                as(S, "class", "value svelte-ydp9rg"),
                as(x, "class", "col bottom svelte-ydp9rg")
            },
            m(t, s) {
                ts(t, n, s),
                Qo(n, e),
                Qo(n, i),
                Qo(n, r),
                Zs(o, r, null),
                ts(t, u, s),
                ts(t, a, s),
                Qo(a, c),
                Qo(a, l),
                Qo(a, f),
                Zs(d, f, null),
                ts(t, h, s),
                ts(t, v, s),
                Qo(v, p),
                Qo(v, m),
                Qo(v, y),
                Zs(g, y, null),
                ts(t, w, s),
                ts(t, x, s),
                Qo(x, E),
                Qo(x, X),
                Qo(x, S),
                Zs(T, S, null),
                j = !0
            },
            p(t, [n]) {
                const e = {};
                !s && 1 & n && (s = !0,
                e.selected = t[0],
                Ms(( () => s = !1))),
                o.$set(e);
                const i = {};
                4112 & n && (i.$$scope = {
                    dirty: n,
                    ctx: t
                }),
                d.$set(i);
                const r = {};
                !b && 2 & n && (b = !0,
                r.selected = t[1],
                Ms(( () => b = !1))),
                g.$set(r);
                const u = {};
                8 & n && (u.options = k(t[3])),
                !C && 4 & n && (C = !0,
                u.selected = t[2],
                Ms(( () => C = !1))),
                T.$set(u)
            },
            i(t) {
                j || (Ls(o.$$.fragment, t),
                Ls(d.$$.fragment, t),
                Ls(g.$$.fragment, t),
                Ls(T.$$.fragment, t),
                j = !0)
            },
            o(t) {
                Hs(o.$$.fragment, t),
                Hs(d.$$.fragment, t),
                Hs(g.$$.fragment, t),
                Hs(T.$$.fragment, t),
                j = !1
            },
            d(t) {
                t && ns(n),
                Qs(o),
                t && ns(u),
                t && ns(a),
                Qs(d),
                t && ns(h),
                t && ns(v),
                Qs(g),
                t && ns(w),
                t && ns(x),
                Qs(T)
            }
        }
    }
    function kd(t, n, e) {
        let {timeSignature: i} = n
          , {bpm: r} = n
          , {key: o} = n
          , {capo: s} = n
          , {instrument: u} = n
          , a = r;
        return t.$$set = t => {
            "timeSignature"in t && e(0, i = t.timeSignature),
            "bpm"in t && e(5, r = t.bpm),
            "key"in t && e(1, o = t.key),
            "capo"in t && e(2, s = t.capo),
            "instrument"in t && e(3, u = t.instrument)
        }
        ,
        t.$$.update = () => {
            16 & t.$$.dirty && e(5, r = Math.floor(a))
        }
        ,
        [i, o, s, u, a, r, function(t) {
            i = t,
            e(0, i)
        }
        , function(t) {
            a = t,
            e(4, a)
        }
        , function(t) {
            a = t,
            e(4, a)
        }
        , function(t) {
            o = t,
            e(1, o)
        }
        , function(t) {
            s = t,
            e(2, s)
        }
        ]
    }
    class Ed extends eu {
        constructor(t) {
            super(),
            nu(this, t, kd, xd, Po, {
                timeSignature: 0,
                bpm: 5,
                key: 1,
                capo: 2,
                instrument: 3
            })
        }
    }
    function Xd(t) {
        let n, e, i;
        return {
            c() {
                n = is("input"),
                as(n, "placeholder", t[1]),
                as(n, "autocomplete", t[2]),
                n.autofocus = t[3],
                as(n, "maxlength", t[4]),
                n.disabled = t[6],
                as(n, "class", "svelte-1bm78md"),
                hs(n, "gray", t[5])
            },
            m(r, o) {
                var s;
                ts(r, n, o),
                ds(n, t[0]),
                e || (i = [(s = t[7].call(null, n),
                s && zo(s.destroy) ? s.destroy : Fo), us(n, "input", t[10]), us(n, "input", t[9])],
                e = !0)
            },
            p(t, [e]) {
                2 & e && as(n, "placeholder", t[1]),
                4 & e && as(n, "autocomplete", t[2]),
                8 & e && (n.autofocus = t[3]),
                16 & e && as(n, "maxlength", t[4]),
                64 & e && (n.disabled = t[6]),
                1 & e && n.value !== t[0] && ds(n, t[0]),
                32 & e && hs(n, "gray", t[5])
            },
            i: Fo,
            o: Fo,
            d(t) {
                t && ns(n),
                e = !1,
                Go(i)
            }
        }
    }
    function Sd(t, n, e) {
        let {placeholder: i} = n
          , {type: r="text"} = n
          , {value: o} = n
          , {autocomplete: s} = n
          , {autofocus: u} = n
          , {maxlength: a} = n
          , {gray: c=!1} = n
          , {disabled: l} = n;
        return t.$$set = t => {
            "placeholder"in t && e(1, i = t.placeholder),
            "type"in t && e(8, r = t.type),
            "value"in t && e(0, o = t.value),
            "autocomplete"in t && e(2, s = t.autocomplete),
            "autofocus"in t && e(3, u = t.autofocus),
            "maxlength"in t && e(4, a = t.maxlength),
            "gray"in t && e(5, c = t.gray),
            "disabled"in t && e(6, l = t.disabled)
        }
        ,
        [o, i, s, u, a, c, l, function(t) {
            t.type = r
        }
        , r, function(n) {
            Xs(t, n)
        }
        , function() {
            o = this.value,
            e(0, o)
        }
        ]
    }
    class Td extends eu {
        constructor(t) {
            super(),
            nu(this, t, Sd, Xd, Po, {
                placeholder: 1,
                type: 8,
                value: 0,
                autocomplete: 2,
                autofocus: 3,
                maxlength: 4,
                gray: 5,
                disabled: 6
            })
        }
    }
    function Cd(t, n, e) {
        const i = t.slice();
        return i[11] = n[e],
        i[13] = e,
        i
    }
    function jd(t) {
        let n, e, i, r, o, s, u, a, c, l, f = t[13] + 1 + "";
        function d() {
            return t[7](t[11])
        }
        return {
            c() {
                n = is("div"),
                e = is("div"),
                i = rs(f),
                r = os(),
                o = is("xhe-rhythm"),
                a = os(),
                as(e, "class", "name svelte-g9q7o6"),
                cs(o, "data-rhythm", s = t[11].value),
                cs(o, "data-instrument", t[1]),
                cs(o, "data-scale", "0.85"),
                cs(o, "data-dark", u = t[4] || null),
                cs(o, "class", "svelte-g9q7o6"),
                as(n, "class", "option svelte-g9q7o6"),
                hs(n, "selected", t[0] === t[11].value)
            },
            m(t, s) {
                ts(t, n, s),
                Qo(n, e),
                Qo(e, i),
                Qo(n, r),
                Qo(n, o),
                Qo(n, a),
                c || (l = us(n, "click", d),
                c = !0)
            },
            p(e, i) {
                t = e,
                4 & i && s !== (s = t[11].value) && cs(o, "data-rhythm", s),
                2 & i && cs(o, "data-instrument", t[1]),
                16 & i && u !== (u = t[4] || null) && cs(o, "data-dark", u),
                5 & i && hs(n, "selected", t[0] === t[11].value)
            },
            d(t) {
                t && ns(n),
                c = !1,
                l()
            }
        }
    }
    function Od(t) {
        let n, e = t[2], i = [];
        for (let n = 0; n < e.length; n += 1)
            i[n] = jd(Cd(t, e, n));
        return {
            c() {
                n = is("div");
                for (let t = 0; t < i.length; t += 1)
                    i[t].c();
                as(n, "class", "rhythm-select svelte-g9q7o6")
            },
            m(e, r) {
                ts(e, n, r);
                for (let t = 0; t < i.length; t += 1)
                    i[t].m(n, null);
                t[8](n)
            },
            p(t, [r]) {
                if (55 & r) {
                    let o;
                    for (e = t[2],
                    o = 0; o < e.length; o += 1) {
                        const s = Cd(t, e, o);
                        i[o] ? i[o].p(s, r) : (i[o] = jd(s),
                        i[o].c(),
                        i[o].m(n, null))
                    }
                    for (; o < i.length; o += 1)
                        i[o].d(1);
                    i.length = e.length
                }
            },
            i: Fo,
            o: Fo,
            d(e) {
                e && ns(n),
                es(i, e),
                t[8](null)
            }
        }
    }
    function Ad(t, n, e) {
        let i;
        qo(t, Tu, (t => e(4, i = t)));
        let {timeSignature: r} = n
          , {instrument: o} = n
          , {value: s} = n;
        const u = Es();
        let a, c;
        function l(t) {
            e(0, s = t),
            u("change")
        }
        ks(( () => {
            const t = c.querySelector(".selected.option");
            t && t.scrollIntoView()
        }
        ));
        return t.$$set = t => {
            "timeSignature"in t && e(6, r = t.timeSignature),
            "instrument"in t && e(1, o = t.instrument),
            "value"in t && e(0, s = t.value)
        }
        ,
        t.$$.update = () => {
            64 & t.$$.dirty && e(2, a = Il(r, o))
        }
        ,
        [s, o, a, c, i, l, r, t => {
            l(t.value)
        }
        , function(t) {
            Ts[t ? "unshift" : "push"](( () => {
                c = t,
                e(3, c)
            }
            ))
        }
        ]
    }
    class Dd extends eu {
        constructor(t) {
            super(),
            nu(this, t, Ad, Od, Po, {
                timeSignature: 6,
                instrument: 1,
                value: 0
            })
        }
    }
    function Md(t) {
        let n, e, i, r, o;
        function s(n) {
            t[12](n)
        }
        let u = {
            gray: !0
        };
        return void 0 !== t[0] && (u.value = t[0]),
        i = new Td({
            props: u
        }),
        Ts.push(( () => Ks(i, "value", s))),
        i.$on("input", t[6]),
        {
            c() {
                n = is("div"),
                n.innerHTML = '<i class="yoopu3-icon svelte-1un0o6z"></i> \n        <a href="/help#rhythm" class="svelte-1un0o6z">如何编写节奏型</a>',
                e = os(),
                Ys(i.$$.fragment),
                as(n, "class", "tip svelte-1un0o6z")
            },
            m(t, r) {
                ts(t, n, r),
                ts(t, e, r),
                Zs(i, t, r),
                o = !0
            },
            p(t, n) {
                const e = {};
                !r && 1 & n && (r = !0,
                e.value = t[0],
                Ms(( () => r = !1))),
                i.$set(e)
            },
            i(t) {
                o || (Ls(i.$$.fragment, t),
                o = !0)
            },
            o(t) {
                Hs(i.$$.fragment, t),
                o = !1
            },
            d(t) {
                t && ns(n),
                t && ns(e),
                Qs(i, t)
            }
        }
    }
    function _d(t) {
        let n, e, i;
        function r(n) {
            t[10](n)
        }
        let o = {
            timeSignature: t[1],
            instrument: t[2]
        };
        return void 0 !== t[0] && (o.value = t[0]),
        n = new Dd({
            props: o
        }),
        Ts.push(( () => Ks(n, "value", r))),
        n.$on("change", t[11]),
        {
            c() {
                Ys(n.$$.fragment)
            },
            m(t, e) {
                Zs(n, t, e),
                i = !0
            },
            p(t, i) {
                const r = {};
                2 & i && (r.timeSignature = t[1]),
                4 & i && (r.instrument = t[2]),
                !e && 1 & i && (e = !0,
                r.value = t[0],
                Ms(( () => e = !1))),
                n.$set(r)
            },
            i(t) {
                i || (Ls(n.$$.fragment, t),
                i = !0)
            },
            o(t) {
                Hs(n.$$.fragment, t),
                i = !1
            },
            d(t) {
                Qs(n, t)
            }
        }
    }
    function $d(t) {
        let n, e, i, r, o, s, u, a, c;
        function l(n) {
            t[9](n)
        }
        let f = {
            primary: !0,
            options: t[5]
        };
        void 0 !== t[3] && (f.selected = t[3]),
        i = new gf({
            props: f
        }),
        Ts.push(( () => Ks(i, "selected", l)));
        const d = [_d, Md]
          , h = [];
        function v(t, n) {
            return t[3] === t[4].SYSTEM_RHYTHM ? 0 : 1
        }
        return u = v(t),
        a = h[u] = d[u](t),
        {
            c() {
                n = is("div"),
                e = is("div"),
                Ys(i.$$.fragment),
                o = os(),
                s = is("div"),
                a.c(),
                as(e, "class", "top-bar svelte-1un0o6z"),
                as(s, "class", "panel svelte-1un0o6z"),
                as(n, "class", "rhythm-panel svelte-1un0o6z")
            },
            m(t, r) {
                ts(t, n, r),
                Qo(n, e),
                Zs(i, e, null),
                Qo(n, o),
                Qo(n, s),
                h[u].m(s, null),
                c = !0
            },
            p(t, [n]) {
                const e = {};
                !r && 8 & n && (r = !0,
                e.selected = t[3],
                Ms(( () => r = !1))),
                i.$set(e);
                let o = u;
                u = v(t),
                u === o ? h[u].p(t, n) : (Ps(),
                Hs(h[o], 1, 1, ( () => {
                    h[o] = null
                }
                )),
                qs(),
                a = h[u],
                a ? a.p(t, n) : (a = h[u] = d[u](t),
                a.c()),
                Ls(a, 1),
                a.m(s, null))
            },
            i(t) {
                c || (Ls(i.$$.fragment, t),
                Ls(a),
                c = !0)
            },
            o(t) {
                Hs(i.$$.fragment, t),
                Hs(a),
                c = !1
            },
            d(t) {
                t && ns(n),
                Qs(i),
                h[u].d()
            }
        }
    }
    function Bd(t, n, e) {
        let {xheEditor: i} = n
          , {timeSignature: r} = n
          , {instrument: o} = n
          , {value: s} = n;
        const u = {
            SYSTEM_RHYTHM: "SYSTEM_RHYTHM",
            CUSTOM_RHYTHM: "CUSTOM_RHYTHM"
        }
          , a = [{
            title: "系统节奏型",
            value: u.SYSTEM_RHYTHM
        }, {
            title: "自定义节奏型",
            value: u.CUSTOM_RHYTHM
        }];
        let c = u.SYSTEM_RHYTHM;
        function l() {
            i.updateRhythm(s)
        }
        function f() {
            i.clearItemSelection(),
            e(0, s = null)
        }
        return t.$$set = t => {
            "xheEditor"in t && e(8, i = t.xheEditor),
            "timeSignature"in t && e(1, r = t.timeSignature),
            "instrument"in t && e(2, o = t.instrument),
            "value"in t && e(0, s = t.value)
        }
        ,
        [s, r, o, c, u, a, l, f, i, function(t) {
            c = t,
            e(3, c)
        }
        , function(t) {
            s = t,
            e(0, s)
        }
        , () => {
            l(),
            f()
        }
        , function(t) {
            s = t,
            e(0, s)
        }
        ]
    }
    class Fd extends eu {
        constructor(t) {
            super(),
            nu(this, t, Bd, $d, Po, {
                xheEditor: 8,
                timeSignature: 1,
                instrument: 2,
                value: 0
            })
        }
    }
    function Id(t) {
        let n;
        return {
            c() {
                n = is("div"),
                n.innerHTML = '<div class="mover svelte-bmkbx9"></div>',
                as(n, "class", "loader svelte-bmkbx9"),
                hs(n, "above", t[0])
            },
            m(t, e) {
                ts(t, n, e)
            },
            p(t, [e]) {
                1 & e && hs(n, "above", t[0])
            },
            i: Fo,
            o: Fo,
            d(t) {
                t && ns(n)
            }
        }
    }
    function Rd(t, n, e) {
        let {above: i=!1} = n;
        return t.$$set = t => {
            "above"in t && e(0, i = t.above)
        }
        ,
        [i]
    }
    class Nd extends eu {
        constructor(t) {
            super(),
            nu(this, t, Rd, Id, Po, {
                above: 0
            })
        }
    }
    var Gd = $f((function(t, n) {
        !function(n) {
            var e, i, r, o = (e = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZWN]|"[^"]*"|'[^']*'/g,
            i = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
            r = /[^-+\dA-Z]/g,
            function(t, n, l, f) {
                if (1 !== arguments.length || "string" !== c(t) || /\d/.test(t) || (n = t,
                t = void 0),
                (t = t || new Date)instanceof Date || (t = new Date(t)),
                isNaN(t))
                    throw TypeError("Invalid date");
                var d = (n = String(o.masks[n] || n || o.masks.default)).slice(0, 4);
                "UTC:" !== d && "GMT:" !== d || (n = n.slice(4),
                l = !0,
                "GMT:" === d && (f = !0));
                var h = l ? "getUTC" : "get"
                  , v = t[h + "Date"]()
                  , p = t[h + "Day"]()
                  , m = t[h + "Month"]()
                  , y = t[h + "FullYear"]()
                  , g = t[h + "Hours"]()
                  , b = t[h + "Minutes"]()
                  , w = t[h + "Seconds"]()
                  , x = t[h + "Milliseconds"]()
                  , k = l ? 0 : t.getTimezoneOffset()
                  , E = u(t)
                  , X = a(t)
                  , S = {
                    d: v,
                    dd: s(v),
                    ddd: o.i18n.dayNames[p],
                    dddd: o.i18n.dayNames[p + 7],
                    m: m + 1,
                    mm: s(m + 1),
                    mmm: o.i18n.monthNames[m],
                    mmmm: o.i18n.monthNames[m + 12],
                    yy: String(y).slice(2),
                    yyyy: y,
                    h: g % 12 || 12,
                    hh: s(g % 12 || 12),
                    H: g,
                    HH: s(g),
                    M: b,
                    MM: s(b),
                    s: w,
                    ss: s(w),
                    l: s(x, 3),
                    L: s(Math.round(x / 10)),
                    t: g < 12 ? o.i18n.timeNames[0] : o.i18n.timeNames[1],
                    tt: g < 12 ? o.i18n.timeNames[2] : o.i18n.timeNames[3],
                    T: g < 12 ? o.i18n.timeNames[4] : o.i18n.timeNames[5],
                    TT: g < 12 ? o.i18n.timeNames[6] : o.i18n.timeNames[7],
                    Z: f ? "GMT" : l ? "UTC" : (String(t).match(i) || [""]).pop().replace(r, ""),
                    o: (k > 0 ? "-" : "+") + s(100 * Math.floor(Math.abs(k) / 60) + Math.abs(k) % 60, 4),
                    S: ["th", "st", "nd", "rd"][v % 10 > 3 ? 0 : (v % 100 - v % 10 != 10) * v % 10],
                    W: E,
                    N: X
                };
                return n.replace(e, (function(t) {
                    return t in S ? S[t] : t.slice(1, t.length - 1)
                }
                ))
            }
            );
            function s(t, n) {
                for (t = String(t),
                n = n || 2; t.length < n; )
                    t = "0" + t;
                return t
            }
            function u(t) {
                var n = new Date(t.getFullYear(),t.getMonth(),t.getDate());
                n.setDate(n.getDate() - (n.getDay() + 6) % 7 + 3);
                var e = new Date(n.getFullYear(),0,4);
                e.setDate(e.getDate() - (e.getDay() + 6) % 7 + 3);
                var i = n.getTimezoneOffset() - e.getTimezoneOffset();
                n.setHours(n.getHours() - i);
                var r = (n - e) / 6048e5;
                return 1 + Math.floor(r)
            }
            function a(t) {
                var n = t.getDay();
                return 0 === n && (n = 7),
                n
            }
            function c(t) {
                return null === t ? "null" : void 0 === t ? "undefined" : "object" != typeof t ? typeof t : Array.isArray(t) ? "array" : {}.toString.call(t).slice(8, -1).toLowerCase()
            }
            o.masks = {
                default: "ddd mmm dd yyyy HH:MM:ss",
                shortDate: "m/d/yy",
                mediumDate: "mmm d, yyyy",
                longDate: "mmmm d, yyyy",
                fullDate: "dddd, mmmm d, yyyy",
                shortTime: "h:MM TT",
                mediumTime: "h:MM:ss TT",
                longTime: "h:MM:ss TT Z",
                isoDate: "yyyy-mm-dd",
                isoTime: "HH:MM:ss",
                isoDateTime: "yyyy-mm-dd'T'HH:MM:sso",
                isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'",
                expiresHeaderFormat: "ddd, dd mmm yyyy HH:MM:ss Z"
            },
            o.i18n = {
                dayNames: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                monthNames: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                timeNames: ["a", "p", "am", "pm", "A", "P", "AM", "PM"]
            },
            t.exports = o
        }()
    }
    ));
    function zd(t) {
        let n, e, i;
        return {
            c() {
                n = is("span"),
                n.innerHTML = '<span class="switch svelte-1y6q73r"></span>',
                as(n, "class", "container svelte-1y6q73r"),
                hs(n, "on", t[0]),
                hs(n, "disabled", t[1])
            },
            m(r, o) {
                ts(r, n, o),
                e || (i = us(n, "click", t[2]),
                e = !0)
            },
            p(t, [e]) {
                1 & e && hs(n, "on", t[0]),
                2 & e && hs(n, "disabled", t[1])
            },
            i: Fo,
            o: Fo,
            d(t) {
                t && ns(n),
                e = !1,
                i()
            }
        }
    }
    function Pd(t, n, e) {
        let {disabled: i=!1} = n
          , {on: r=!1} = n;
        return t.$$set = t => {
            "disabled"in t && e(1, i = t.disabled),
            "on"in t && e(0, r = t.on)
        }
        ,
        [r, i, () => {
            i || e(0, r = !r)
        }
        ]
    }
    class qd extends eu {
        constructor(t) {
            super(),
            nu(this, t, Pd, zd, Po, {
                disabled: 1,
                on: 0
            })
        }
    }
    function Ld(t) {
        let n, e, i, r;
        return {
            c() {
                n = is("span"),
                n.textContent = "/",
                e = os(),
                i = is("span"),
                r = rs(t[2])
            },
            m(t, o) {
                ts(t, n, o),
                ts(t, e, o),
                ts(t, i, o),
                Qo(i, r)
            },
            p(t, n) {
                4 & n && fs(r, t[2])
            },
            d(t) {
                t && ns(n),
                t && ns(e),
                t && ns(i)
            }
        }
    }
    function Hd(t) {
        let n, e, i, r, o, s, u, a, c, l = t[2] !== 1 / 0 && Ld(t);
        return {
            c() {
                n = is("div"),
                e = is("textarea"),
                i = os(),
                r = is("div"),
                o = is("span"),
                s = rs(t[7]),
                u = os(),
                l && l.c(),
                as(e, "placeholder", t[3]),
                as(e, "rows", t[4]),
                as(e, "class", "svelte-nz7dk6"),
                as(r, "class", "count svelte-nz7dk6"),
                hs(r, "warn", t[1]),
                as(n, "class", "text-input svelte-nz7dk6"),
                as(n, "resize", t[6]),
                hs(n, "gray", t[5])
            },
            m(f, d) {
                ts(f, n, d),
                Qo(n, e),
                ds(e, t[0]),
                Qo(n, i),
                Qo(n, r),
                Qo(r, o),
                Qo(o, s),
                Qo(r, u),
                l && l.m(r, null),
                a || (c = us(e, "input", t[9]),
                a = !0)
            },
            p(t, [i]) {
                8 & i && as(e, "placeholder", t[3]),
                16 & i && as(e, "rows", t[4]),
                1 & i && ds(e, t[0]),
                128 & i && fs(s, t[7]),
                t[2] !== 1 / 0 ? l ? l.p(t, i) : (l = Ld(t),
                l.c(),
                l.m(r, null)) : l && (l.d(1),
                l = null),
                2 & i && hs(r, "warn", t[1]),
                64 & i && as(n, "resize", t[6]),
                32 & i && hs(n, "gray", t[5])
            },
            i: Fo,
            o: Fo,
            d(t) {
                t && ns(n),
                l && l.d(),
                a = !1,
                c()
            }
        }
    }
    function Ud(t, n, e) {
        let i, {error: r} = n, {maxLength: o=1 / 0} = n, {minLength: s=0} = n, {placeholder: u} = n, {rows: a=1} = n, {value: c} = n, {gray: l=!1} = n, {resize: f} = n;
        return t.$$set = t => {
            "error"in t && e(1, r = t.error),
            "maxLength"in t && e(2, o = t.maxLength),
            "minLength"in t && e(8, s = t.minLength),
            "placeholder"in t && e(3, u = t.placeholder),
            "rows"in t && e(4, a = t.rows),
            "value"in t && e(0, c = t.value),
            "gray"in t && e(5, l = t.gray),
            "resize"in t && e(6, f = t.resize)
        }
        ,
        t.$$.update = () => {
            389 & t.$$.dirty && (e(7, i = c ? c.length : 0),
            e(1, r = null),
            i < s && e(1, r = `内容字符长度小于${s}`),
            i > o && e(1, r = `内容字符长度大于${o}`))
        }
        ,
        [c, r, o, u, a, l, f, i, s, function() {
            c = this.value,
            e(0, c)
        }
        ]
    }
    class Jd extends eu {
        constructor(t) {
            super(),
            nu(this, t, Ud, Hd, Po, {
                error: 1,
                maxLength: 2,
                minLength: 8,
                placeholder: 3,
                rows: 4,
                value: 0,
                gray: 5,
                resize: 6
            })
        }
    }
    function Wd(t) {
        let n, e;
        return {
            c() {
                n = is("img"),
                as(n, "class", "hat svelte-1a9wei7"),
                n.src !== (e = t[4]) && as(n, "src", e),
                as(n, "alt", "hat")
            },
            m(t, e) {
                ts(t, n, e)
            },
            p(t, i) {
                16 & i && n.src !== (e = t[4]) && as(n, "src", e)
            },
            d(t) {
                t && ns(n)
            }
        }
    }
    function Vd(t) {
        let n, e;
        return {
            c() {
                n = is("img"),
                as(n, "class", "badge svelte-1a9wei7"),
                n.src !== (e = t[5]) && as(n, "src", e),
                as(n, "alt", "badge")
            },
            m(t, e) {
                ts(t, n, e)
            },
            p(t, i) {
                32 & i && n.src !== (e = t[5]) && as(n, "src", e)
            },
            d(t) {
                t && ns(n)
            }
        }
    }
    function Kd(t) {
        let n, e, i, r, o, s, u, a, c, l = t[4] && Wd(t), f = t[5] && Vd(t);
        return {
            c() {
                n = is("div"),
                e = is("img"),
                r = os(),
                l && l.c(),
                o = os(),
                f && f.c(),
                as(e, "class", "avatar svelte-1a9wei7"),
                e.src !== (i = t[3]) && as(e, "src", i),
                as(e, "alt", "avatar"),
                as(n, "class", "container svelte-1a9wei7"),
                as(n, "size", t[1]),
                as(n, "gender", s = t[0].gender),
                as(n, "ladder", u = t[0].ladder),
                hs(n, "link", t[2])
            },
            m(i, s) {
                ts(i, n, s),
                Qo(n, e),
                Qo(n, r),
                l && l.m(n, null),
                Qo(n, o),
                f && f.m(n, null),
                a || (c = [us(e, "error", t[7]), us(n, "click", t[6])],
                a = !0)
            },
            p(t, [r]) {
                8 & r && e.src !== (i = t[3]) && as(e, "src", i),
                t[4] ? l ? l.p(t, r) : (l = Wd(t),
                l.c(),
                l.m(n, o)) : l && (l.d(1),
                l = null),
                t[5] ? f ? f.p(t, r) : (f = Vd(t),
                f.c(),
                f.m(n, null)) : f && (f.d(1),
                f = null),
                2 & r && as(n, "size", t[1]),
                1 & r && s !== (s = t[0].gender) && as(n, "gender", s),
                1 & r && u !== (u = t[0].ladder) && as(n, "ladder", u),
                4 & r && hs(n, "link", t[2])
            },
            i: Fo,
            o: Fo,
            d(t) {
                t && ns(n),
                l && l.d(),
                f && f.d(),
                a = !1,
                Go(c)
            }
        }
    }
    function Yd(t, n, e) {
        let {user: i={}} = n
          , {size: r="large"} = n
          , {link: o=!1} = n;
        const s = {
            [Ao]: "https://cdn.yopu.co/img/logo.bd260b19.svg",
            [Do]: "https://cdn.yopu.co/img/badge-member.6b6bd93c.png",
            [Mo]: "https://cdn.yopu.co/img/badge-rank-author.d98848c1.png",
            [_o]: "https://cdn.yopu.co/img/badge-rank-player.d64bedb9.png"
        };
        let u, a, c;
        return t.$$set = t => {
            "user"in t && e(0, i = t.user),
            "size"in t && e(1, r = t.size),
            "link"in t && e(2, o = t.link)
        }
        ,
        t.$$.update = () => {
            3 & t.$$.dirty && e(3, u = ("xlarge" === r || "large" === r) && i.havatar || i.avatar || uu),
            3 & t.$$.dirty && e(4, a = "large" === r && ("m" === i.gender ? "https://cdn.yopu.co/img/male-frame.7ea6de80.png" : "https://cdn.yopu.co/img/female-frame.4c1ecefa.png")),
            1 & t.$$.dirty && e(5, c = i.ladder && s[i.ladder])
        }
        ,
        [i, r, o, u, a, c, function() {
            o && i.userCode && (location.href = "/user#code=" + i.userCode)
        }
        , function() {
            u !== uu && e(3, u = uu)
        }
        ]
    }
    class Zd extends eu {
        constructor(t) {
            super(),
            nu(this, t, Yd, Kd, Po, {
                user: 0,
                size: 1,
                link: 2
            })
        }
    }
    function Qd(t) {
        let n, e, i, r, o, s, u, a, c, l, f, d, h, v, p, m, y, g, b, w, x, k, E, X, S;
        return {
            c() {
                n = is("div"),
                e = is("div"),
                i = is("span"),
                i.textContent = "人声轨总音符",
                r = os(),
                o = is("span"),
                o.textContent = `${t[3]}个`,
                s = os(),
                u = is("div"),
                a = is("span"),
                a.textContent = "音域",
                c = os(),
                l = is("span"),
                l.textContent = `${t[0](t[2])} - ${t[0](t[1])} (${t[2]}\n      - ${t[1]})`,
                f = os(),
                d = is("div"),
                h = is("span"),
                h.textContent = "跨度",
                v = os(),
                p = is("span"),
                p.textContent = `${t[5]}个半音`,
                m = os(),
                y = is("div"),
                g = is("span"),
                g.textContent = "中位",
                b = os(),
                w = is("span"),
                w.textContent = `${t[0](t[4])}(${t[4]})`,
                x = os(),
                k = is("div"),
                E = is("span"),
                E.textContent = "平均",
                X = os(),
                S = is("span"),
                S.textContent = `${t[0](t[6])}(${t[6]})`,
                as(i, "class", "label"),
                as(e, "class", "item"),
                as(a, "class", "label"),
                as(u, "class", "item"),
                as(h, "class", "label"),
                as(d, "class", "item svelte-9zqwtb"),
                hs(d, "warning", t[7]),
                as(g, "class", "label"),
                as(y, "class", "item"),
                as(E, "class", "label"),
                as(S, "class", "label"),
                as(k, "class", "item"),
                as(n, "class", "vocal-range svelte-9zqwtb")
            },
            m(t, T) {
                ts(t, n, T),
                Qo(n, e),
                Qo(e, i),
                Qo(e, r),
                Qo(e, o),
                Qo(n, s),
                Qo(n, u),
                Qo(u, a),
                Qo(u, c),
                Qo(u, l),
                Qo(n, f),
                Qo(n, d),
                Qo(d, h),
                Qo(d, v),
                Qo(d, p),
                Qo(n, m),
                Qo(n, y),
                Qo(y, g),
                Qo(y, b),
                Qo(y, w),
                Qo(n, x),
                Qo(n, k),
                Qo(k, E),
                Qo(k, X),
                Qo(k, S)
            },
            p: Fo,
            i: Fo,
            o: Fo,
            d(t) {
                t && ns(n)
            }
        }
    }
    function th(t, n, e) {
        let {vocalRange: i} = n;
        const r = ["C", "C#", "D", "Eb", "E", "F", "F#", "G", "G#", "A", "Bb", "B"]
          , {high: o, low: s, total: u, num: a, median: c} = i
          , l = o - s
          , f = Math.round(u / a)
          , d = l > 24;
        return t.$$set = t => {
            "vocalRange"in t && e(8, i = t.vocalRange)
        }
        ,
        [function(t) {
            const n = Math.floor(t / 12) - 1;
            return r[t % 12] + String(n)
        }
        , o, s, a, c, l, f, d, i]
    }
    class nh extends eu {
        constructor(t) {
            super(),
            nu(this, t, th, Qd, Po, {
                vocalRange: 8,
                getPitchName: 0
            })
        }
        get getPitchName() {
            return this.$$.ctx[0]
        }
    }
    function eh(t, n, e) {
        const i = t.slice();
        return i[16] = n[e].field,
        i[17] = n[e].oldValue,
        i
    }
    function ih(t) {
        let n, e, i, r, o, s, u, a, c, l, f = t[5].displayName + "", d = t[5].realName + "";
        return e = new Zd({
            props: {
                user: t[5],
                size: "small"
            }
        }),
        {
            c() {
                n = is("a"),
                Ys(e.$$.fragment),
                i = os(),
                r = is("span"),
                o = rs(f),
                s = rs(" ("),
                u = rs(d),
                a = rs(")"),
                as(r, "class", "name"),
                as(n, "class", "end"),
                as(n, "href", c = "/user?#code=" + t[5].userCode)
            },
            m(t, c) {
                ts(t, n, c),
                Zs(e, n, null),
                Qo(n, i),
                Qo(n, r),
                Qo(r, o),
                Qo(r, s),
                Qo(r, u),
                Qo(r, a),
                l = !0
            },
            p(t, i) {
                const r = {};
                32 & i && (r.user = t[5]),
                e.$set(r),
                (!l || 32 & i) && f !== (f = t[5].displayName + "") && fs(o, f),
                (!l || 32 & i) && d !== (d = t[5].realName + "") && fs(u, d),
                (!l || 32 & i && c !== (c = "/user?#code=" + t[5].userCode)) && as(n, "href", c)
            },
            i(t) {
                l || (Ls(e.$$.fragment, t),
                l = !0)
            },
            o(t) {
                Hs(e.$$.fragment, t),
                l = !1
            },
            d(t) {
                t && ns(n),
                Qs(e)
            }
        }
    }
    function rh(t) {
        let n, e;
        return n = new nh({
            props: {
                vocalRange: t[1]
            }
        }),
        {
            c() {
                Ys(n.$$.fragment)
            },
            m(t, i) {
                Zs(n, t, i),
                e = !0
            },
            p(t, e) {
                const i = {};
                2 & e && (i.vocalRange = t[1]),
                n.$set(i)
            },
            i(t) {
                e || (Ls(n.$$.fragment, t),
                e = !0)
            },
            o(t) {
                Hs(n.$$.fragment, t),
                e = !1
            },
            d(t) {
                Qs(n, t)
            }
        }
    }
    function oh(t) {
        let n, e, i, r, o, s, u, a, c, l, f, d, h, v, p, m, y, g, b, w, x, k, E, X, S, T, C, j, O = t[2].length + "", A = t[3].length + "", D = t[8], M = [];
        for (let n = 0; n < D.length; n += 1)
            M[n] = sh(eh(t, D, n));
        return {
            c() {
                n = is("hr"),
                e = os(),
                i = is("div"),
                r = rs("本曲谱修改自"),
                o = is("a"),
                s = rs("线上版本"),
                a = os(),
                c = is("span"),
                c.textContent = "(鼠标悬停查看原值)",
                l = os(),
                f = is("div"),
                d = is("div"),
                h = is("span"),
                h.textContent = "修改字段",
                v = os();
                for (let t = 0; t < M.length; t += 1)
                    M[t].c();
                p = os(),
                m = is("div"),
                y = is("span"),
                y.textContent = "新增小节数",
                g = os(),
                b = is("span"),
                w = rs(O),
                k = os(),
                E = is("div"),
                X = is("span"),
                X.textContent = "删除小节数",
                S = os(),
                T = is("span"),
                C = rs(A),
                as(n, "class", "svelte-jss9bd"),
                as(o, "target", "_blank"),
                as(o, "href", u = "/view/" + t[0].sheetCode),
                as(c, "class", "tip svelte-jss9bd"),
                as(i, "class", "label svelte-jss9bd"),
                as(h, "class", "field-name svelte-jss9bd"),
                as(d, "class", "changed-field svelte-jss9bd"),
                as(y, "class", "field-name svelte-jss9bd"),
                as(b, "class", "orig-value svelte-jss9bd"),
                as(m, "class", "changed-field svelte-jss9bd"),
                as(m, "title", x = t[2].join(",")),
                hs(m, "warning", t[2].length !== t[3].length),
                as(X, "class", "field-name svelte-jss9bd"),
                as(T, "class", "orig-value svelte-jss9bd"),
                as(E, "class", "changed-field svelte-jss9bd"),
                as(E, "title", j = t[3].join(","))
            },
            m(t, u) {
                ts(t, n, u),
                ts(t, e, u),
                ts(t, i, u),
                Qo(i, r),
                Qo(i, o),
                Qo(o, s),
                Qo(i, a),
                Qo(i, c),
                ts(t, l, u),
                ts(t, f, u),
                Qo(f, d),
                Qo(d, h),
                Qo(d, v);
                for (let t = 0; t < M.length; t += 1)
                    M[t].m(d, null);
                Qo(f, p),
                Qo(f, m),
                Qo(m, y),
                Qo(m, g),
                Qo(m, b),
                Qo(b, w),
                Qo(f, k),
                Qo(f, E),
                Qo(E, X),
                Qo(E, S),
                Qo(E, T),
                Qo(T, C)
            },
            p(t, n) {
                if (1 & n && u !== (u = "/view/" + t[0].sheetCode) && as(o, "href", u),
                384 & n) {
                    let e;
                    for (D = t[8],
                    e = 0; e < D.length; e += 1) {
                        const i = eh(t, D, e);
                        M[e] ? M[e].p(i, n) : (M[e] = sh(i),
                        M[e].c(),
                        M[e].m(d, null))
                    }
                    for (; e < M.length; e += 1)
                        M[e].d(1);
                    M.length = D.length
                }
                4 & n && O !== (O = t[2].length + "") && fs(w, O),
                4 & n && x !== (x = t[2].join(",")) && as(m, "title", x),
                12 & n && hs(m, "warning", t[2].length !== t[3].length),
                8 & n && A !== (A = t[3].length + "") && fs(C, A),
                8 & n && j !== (j = t[3].join(",")) && as(E, "title", j)
            },
            d(t) {
                t && ns(n),
                t && ns(e),
                t && ns(i),
                t && ns(l),
                t && ns(f),
                es(M, t)
            }
        }
    }
    function sh(t) {
        let n, e, i = (t[7][t[16]] || t[16]) + "";
        return {
            c() {
                n = is("span"),
                e = rs(i),
                as(n, "class", "orig-value svelte-jss9bd"),
                as(n, "title", t[17]),
                hs(n, "warning", !!t[7][t[16]])
            },
            m(t, i) {
                ts(t, n, i),
                Qo(n, e)
            },
            p: Fo,
            d(t) {
                t && ns(n)
            }
        }
    }
    function uh(t) {
        let n, e, i;
        return {
            c() {
                n = is("hr"),
                e = os(),
                i = is("div"),
                i.textContent = "尚未提交",
                as(n, "class", "svelte-jss9bd"),
                as(i, "class", "line svelte-jss9bd")
            },
            m(t, r) {
                ts(t, n, r),
                ts(t, e, r),
                ts(t, i, r)
            },
            p: Fo,
            i: Fo,
            o: Fo,
            d(t) {
                t && ns(n),
                t && ns(e),
                t && ns(i)
            }
        }
    }
    function ah(t) {
        let n, e, i, r, o, s, u, a, c, l, f, d, h, v, p, m, y, g, b, w, x, k, E, X, S = Gd(new Date(t[0].submissionTime), "yyyy-mm-dd HH:MM:ss") + "";
        function T(n) {
            t[12](n)
        }
        let C = {
            placeholder: "修改意见",
            rows: "8",
            resize: "vertical"
        };
        void 0 !== t[6] && (C.value = t[6]),
        c = new Jd({
            props: C
        }),
        Ts.push(( () => Ks(c, "value", T)));
        let j = t[0].reviewComment && ch(t);
        function O(n) {
            t[13](n)
        }
        let A = {};
        return void 0 !== t[4] && (A.on = t[4]),
        p = new qd({
            props: A
        }),
        Ts.push(( () => Ks(p, "on", O))),
        x = new tl({
            props: {
                theme: "primary",
                disabled: !t[6],
                $$slots: {
                    default: [lh]
                },
                $$scope: {
                    ctx: t
                }
            }
        }),
        x.$on("click", t[10]),
        E = new tl({
            props: {
                disabled: t[6],
                $$slots: {
                    default: [fh]
                },
                $$scope: {
                    ctx: t
                }
            }
        }),
        E.$on("click", t[9]),
        {
            c() {
                n = is("hr"),
                e = os(),
                i = is("div"),
                r = is("span"),
                r.textContent = "提交时间",
                o = os(),
                s = is("span"),
                u = rs(S),
                a = os(),
                Ys(c.$$.fragment),
                f = os(),
                j && j.c(),
                d = os(),
                h = is("div"),
                v = is("div"),
                Ys(p.$$.fragment),
                y = os(),
                g = is("span"),
                g.textContent = "如果是首次打回允许继续锁定悬赏12小时",
                b = os(),
                w = is("div"),
                Ys(x.$$.fragment),
                k = os(),
                Ys(E.$$.fragment),
                as(n, "class", "svelte-jss9bd"),
                as(i, "class", "line svelte-jss9bd"),
                as(v, "class", "lock-control svelte-jss9bd"),
                as(w, "class", "group-buttons svelte-jss9bd"),
                as(h, "class", "buttons svelte-jss9bd")
            },
            m(t, l) {
                ts(t, n, l),
                ts(t, e, l),
                ts(t, i, l),
                Qo(i, r),
                Qo(i, o),
                Qo(i, s),
                Qo(s, u),
                ts(t, a, l),
                Zs(c, t, l),
                ts(t, f, l),
                j && j.m(t, l),
                ts(t, d, l),
                ts(t, h, l),
                Qo(h, v),
                Zs(p, v, null),
                Qo(v, y),
                Qo(v, g),
                Qo(h, b),
                Qo(h, w),
                Zs(x, w, null),
                Qo(w, k),
                Zs(E, w, null),
                X = !0
            },
            p(t, n) {
                (!X || 1 & n) && S !== (S = Gd(new Date(t[0].submissionTime), "yyyy-mm-dd HH:MM:ss") + "") && fs(u, S);
                const e = {};
                !l && 64 & n && (l = !0,
                e.value = t[6],
                Ms(( () => l = !1))),
                c.$set(e),
                t[0].reviewComment ? j ? j.p(t, n) : (j = ch(t),
                j.c(),
                j.m(d.parentNode, d)) : j && (j.d(1),
                j = null);
                const i = {};
                !m && 16 & n && (m = !0,
                i.on = t[4],
                Ms(( () => m = !1))),
                p.$set(i);
                const r = {};
                64 & n && (r.disabled = !t[6]),
                1048576 & n && (r.$$scope = {
                    dirty: n,
                    ctx: t
                }),
                x.$set(r);
                const o = {};
                64 & n && (o.disabled = t[6]),
                1048576 & n && (o.$$scope = {
                    dirty: n,
                    ctx: t
                }),
                E.$set(o)
            },
            i(t) {
                X || (Ls(c.$$.fragment, t),
                Ls(p.$$.fragment, t),
                Ls(x.$$.fragment, t),
                Ls(E.$$.fragment, t),
                X = !0)
            },
            o(t) {
                Hs(c.$$.fragment, t),
                Hs(p.$$.fragment, t),
                Hs(x.$$.fragment, t),
                Hs(E.$$.fragment, t),
                X = !1
            },
            d(t) {
                t && ns(n),
                t && ns(e),
                t && ns(i),
                t && ns(a),
                Qs(c, t),
                t && ns(f),
                j && j.d(t),
                t && ns(d),
                t && ns(h),
                Qs(p),
                Qs(x),
                Qs(E)
            }
        }
    }
    function ch(t) {
        let n, e, i, r, o, s, u, a, c, l, f = t[0].reviewer + "", d = t[0].reviewComment + "";
        return {
            c() {
                n = is("div"),
                e = is("span"),
                e.textContent = "审核历史",
                i = os(),
                r = is("a"),
                o = rs(f),
                u = os(),
                a = is("div"),
                c = is("pre"),
                l = rs(d),
                as(r, "href", s = "/user#code=" + t[0].reviewer),
                as(n, "class", "line svelte-jss9bd"),
                as(c, "class", "svelte-jss9bd"),
                as(a, "class", "review-history svelte-jss9bd")
            },
            m(t, s) {
                ts(t, n, s),
                Qo(n, e),
                Qo(n, i),
                Qo(n, r),
                Qo(r, o),
                ts(t, u, s),
                ts(t, a, s),
                Qo(a, c),
                Qo(c, l)
            },
            p(t, n) {
                1 & n && f !== (f = t[0].reviewer + "") && fs(o, f),
                1 & n && s !== (s = "/user#code=" + t[0].reviewer) && as(r, "href", s),
                1 & n && d !== (d = t[0].reviewComment + "") && fs(l, d)
            },
            d(t) {
                t && ns(n),
                t && ns(u),
                t && ns(a)
            }
        }
    }
    function lh(t) {
        let n;
        return {
            c() {
                n = rs("建议修改")
            },
            m(t, e) {
                ts(t, n, e)
            },
            d(t) {
                t && ns(n)
            }
        }
    }
    function fh(t) {
        let n;
        return {
            c() {
                n = rs("通过")
            },
            m(t, e) {
                ts(t, n, e)
            },
            d(t) {
                t && ns(n)
            }
        }
    }
    function dh(t) {
        let n, e, i, r, o, s, u, a, c, l, f, h, v, p, m, y, g, b, w, x, k, E = t[0].format + "", X = t[5] && ih(t), S = t[1] && rh(t), T = t[0].sheetCode && oh(t);
        const C = [ah, uh]
          , j = [];
        function O(t, n) {
            return t[0].submissionTime ? 0 : 1
        }
        return w = O(t),
        x = j[w] = C[w](t),
        {
            c() {
                n = is("div"),
                X && X.c(),
                e = os(),
                i = is("div"),
                r = is("a"),
                o = is("span"),
                o.textContent = "曲谱格式",
                s = os(),
                u = is("span"),
                a = rs("."),
                c = rs(E),
                f = os(),
                S && S.c(),
                h = os(),
                v = is("div"),
                p = is("a"),
                m = rs("搜索同名曲谱"),
                g = os(),
                T && T.c(),
                b = os(),
                x.c(),
                as(r, "href", l = d(J, {
                    code: t[0].id
                })),
                as(i, "class", "line svelte-jss9bd"),
                as(p, "target", "_blank"),
                as(p, "href", y = "/explore#q=" + encodeURIComponent(t[0].title + "六线谱")),
                as(v, "class", "label svelte-jss9bd"),
                as(n, "class", "review svelte-jss9bd")
            },
            m(t, l) {
                ts(t, n, l),
                X && X.m(n, null),
                Qo(n, e),
                Qo(n, i),
                Qo(i, r),
                Qo(r, o),
                Qo(r, s),
                Qo(r, u),
                Qo(u, a),
                Qo(u, c),
                Qo(n, f),
                S && S.m(n, null),
                Qo(n, h),
                Qo(n, v),
                Qo(v, p),
                Qo(p, m),
                Qo(n, g),
                T && T.m(n, null),
                Qo(n, b),
                j[w].m(n, null),
                k = !0
            },
            p(t, [i]) {
                t[5] ? X ? (X.p(t, i),
                32 & i && Ls(X, 1)) : (X = ih(t),
                X.c(),
                Ls(X, 1),
                X.m(n, e)) : X && (Ps(),
                Hs(X, 1, 1, ( () => {
                    X = null
                }
                )),
                qs()),
                (!k || 1 & i) && E !== (E = t[0].format + "") && fs(c, E),
                (!k || 1 & i && l !== (l = d(J, {
                    code: t[0].id
                }))) && as(r, "href", l),
                t[1] ? S ? (S.p(t, i),
                2 & i && Ls(S, 1)) : (S = rh(t),
                S.c(),
                Ls(S, 1),
                S.m(n, h)) : S && (Ps(),
                Hs(S, 1, 1, ( () => {
                    S = null
                }
                )),
                qs()),
                (!k || 1 & i && y !== (y = "/explore#q=" + encodeURIComponent(t[0].title + "六线谱"))) && as(p, "href", y),
                t[0].sheetCode ? T ? T.p(t, i) : (T = oh(t),
                T.c(),
                T.m(n, b)) : T && (T.d(1),
                T = null);
                let o = w;
                w = O(t),
                w === o ? j[w].p(t, i) : (Ps(),
                Hs(j[o], 1, 1, ( () => {
                    j[o] = null
                }
                )),
                qs(),
                x = j[w],
                x ? x.p(t, i) : (x = j[w] = C[w](t),
                x.c()),
                Ls(x, 1),
                x.m(n, null))
            },
            i(t) {
                k || (Ls(X),
                Ls(S),
                Ls(x),
                k = !0)
            },
            o(t) {
                Hs(X),
                Hs(S),
                Hs(x),
                k = !1
            },
            d(t) {
                t && ns(n),
                X && X.d(),
                S && S.d(),
                T && T.d(),
                j[w].d()
            }
        }
    }
    function hh() {
        location.href = "/internal#view=nier"
    }
    function vh(t, n, e) {
        let {draft: i} = n
          , {vocalRange: r} = n
          , {changesToReview: o} = n;
        const s = [];
        let u, a = [], c = [], l = !0, f = "";
        return function() {
            for (const t in o)
                "changedBars" === t ? (e(2, a = o.changedBars.added),
                e(3, c = o.changedBars.removed)) : s.push({
                    field: t,
                    oldValue: o[t]
                })
        }(),
        async function() {
            e(5, u = await function(t, n, e={}) {
                return Br(t, n, {
                    ...e,
                    format: "json"
                })
            }(d(V, {
                code: i.userCode
            })))
        }(),
        t.$$set = t => {
            "draft"in t && e(0, i = t.draft),
            "vocalRange"in t && e(1, r = t.vocalRange),
            "changesToReview"in t && e(11, o = t.changesToReview)
        }
        ,
        [i, r, a, c, l, u, f, {
            title: "歌曲名",
            artist: "艺人",
            capo: "变调夹",
            key: "基调",
            keyUse: "指法调",
            timeSignature: "拍号",
            bpm: "拍速",
            format: "文件格式",
            autoSustainPedal: "踏板"
        }, s, async function() {
            if (!await yl("审核通过", "确定通过审核么？通过后曲谱将公开可见，作者将收到站内信息。"))
                return;
            await $r("/api/review-draft?id=" + i.id, {
                approved: !0,
                override: {
                    title: i.title,
                    subtitle: i.subtitle,
                    artist: i.artist,
                    music: i.music,
                    words: i.words,
                    author: i.author,
                    difficulty: i.difficulty,
                    bpm: i.bpm,
                    key: i.key,
                    capo: i.capo,
                    tags: i.tags
                }
            }) && (ho.show("已通过"),
            hh())
        }
        , async function() {
            if (!await yl("审核不通过", "确定审核不通过么？作者将收到修改建议：" + f))
                return;
            await $r("/api/review-draft?id=" + i.id, {
                approved: !1,
                reviewComment: f,
                lockDory: l
            }) && (ho.show("已驳回"),
            hh())
        }
        , o, function(t) {
            f = t,
            e(6, f)
        }
        , function(t) {
            l = t,
            e(4, l)
        }
        ]
    }
    class ph extends eu {
        constructor(t) {
            super(),
            nu(this, t, vh, dh, Po, {
                draft: 0,
                vocalRange: 1,
                changesToReview: 11
            })
        }
    }
    function mh(t) {
        let n, e, i, r;
        const o = [gh, yh]
          , s = [];
        function u(t, n) {
            return t[1] ? 0 : 1
        }
        return e = u(t),
        i = s[e] = o[e](t),
        {
            c() {
                n = is("div"),
                i.c(),
                as(n, "class", "last-modified-time svelte-2vujby")
            },
            m(t, i) {
                ts(t, n, i),
                s[e].m(n, null),
                r = !0
            },
            p(t, r) {
                let a = e;
                e = u(t),
                e === a ? s[e].p(t, r) : (Ps(),
                Hs(s[a], 1, 1, ( () => {
                    s[a] = null
                }
                )),
                qs(),
                i = s[e],
                i ? i.p(t, r) : (i = s[e] = o[e](t),
                i.c()),
                Ls(i, 1),
                i.m(n, null))
            },
            i(t) {
                r || (Ls(i),
                r = !0)
            },
            o(t) {
                Hs(i),
                r = !1
            },
            d(t) {
                t && ns(n),
                s[e].d()
            }
        }
    }
    function yh(t) {
        let n, e, i, r, o = t[2](t[0].lastModifiedTime) + "";
        return {
            c() {
                n = is("span"),
                e = rs("已自动保存: "),
                i = rs(o),
                as(n, "class", "svelte-2vujby")
            },
            m(t, r) {
                ts(t, n, r),
                Qo(n, e),
                Qo(n, i)
            },
            p(t, n) {
                1 & n && o !== (o = t[2](t[0].lastModifiedTime) + "") && fs(i, o)
            },
            i(t) {
                r || Ds(( () => {
                    r = Js(n, Hc, {
                        delay: 500,
                        duration: 200
                    }),
                    r.start()
                }
                ))
            },
            o: Fo,
            d(t) {
                t && ns(n)
            }
        }
    }
    function gh(t) {
        let n, e, i;
        return {
            c() {
                n = is("span"),
                n.textContent = "自动保存中...",
                as(n, "class", "svelte-2vujby")
            },
            m(t, e) {
                ts(t, n, e),
                i = !0
            },
            p: Fo,
            i(t) {
                i || (e && e.end(1),
                i = !0)
            },
            o(t) {
                e = Ws(n, Hc, {
                    delay: 500,
                    duration: 200
                }),
                i = !1
            },
            d(t) {
                t && ns(n),
                t && e && e.end()
            }
        }
    }
    function bh(t) {
        let n, e, i = t[0] && t[0].lastModifiedTime && mh(t);
        return {
            c() {
                i && i.c(),
                n = ss()
            },
            m(t, r) {
                i && i.m(t, r),
                ts(t, n, r),
                e = !0
            },
            p(t, [e]) {
                t[0] && t[0].lastModifiedTime ? i ? (i.p(t, e),
                1 & e && Ls(i, 1)) : (i = mh(t),
                i.c(),
                Ls(i, 1),
                i.m(n.parentNode, n)) : i && (Ps(),
                Hs(i, 1, 1, ( () => {
                    i = null
                }
                )),
                qs())
            },
            i(t) {
                e || (Ls(i),
                e = !0)
            },
            o(t) {
                Hs(i),
                e = !1
            },
            d(t) {
                i && i.d(t),
                t && ns(n)
            }
        }
    }
    function wh(t, n, e) {
        let {draft: i} = n
          , {saveManager: r} = n
          , o = !1;
        return r.onSaveStart(( () => {
            e(1, o = !0)
        }
        )),
        r.onSaveEnd(( () => {
            e(1, o = !1)
        }
        )),
        t.$$set = t => {
            "draft"in t && e(0, i = t.draft),
            "saveManager"in t && e(3, r = t.saveManager)
        }
        ,
        [i, o, function(t) {
            const n = (t = new Date(t)).getMonth() + 1
              , e = t.getDate()
              , i = t.getHours()
              , r = t.getMinutes()
              , o = t.getSeconds();
            return `${n}月${e}日 ${Kr(i)}:${Kr(r)}:${Kr(o)}`
        }
        , r]
    }
    class xh extends eu {
        constructor(t) {
            super(),
            nu(this, t, wh, bh, Po, {
                draft: 0,
                saveManager: 3
            })
        }
    }
    function kh(t) {
        let n, e, i, r, o, s, u, a, c, l, f, d, h, v, p = t[1].title + "";
        return {
            c() {
                n = is("div"),
                n.textContent = "发表曲谱",
                e = os(),
                i = is("div"),
                r = rs("有谱君对曲谱很挑剔。请先在平台内搜索"),
                o = is("a"),
                s = rs(p),
                a = rs("，查看是否已有相近的曲谱存在。\n    "),
                c = is("p"),
                l = rs("\n    公开发表的曲谱需要通过平台的人工审核，请务必阅读"),
                f = is("a"),
                f.textContent = "曲谱发布规范",
                d = rs("，并在提交前完成自查。\n    "),
                h = is("p"),
                v = rs("\n    如您对您的作品很有信心，请点击红色按钮继续。之后需要1-2个工作日的审核期。 请耐心等候。"),
                as(n, "title", ""),
                as(o, "target", "_blank"),
                as(o, "href", u = "/explore#q=" + encodeURIComponent(String(t[1].title))),
                as(f, "target", "_blank"),
                as(f, "href", "/help#nier"),
                as(i, "description", "")
            },
            m(t, u) {
                ts(t, n, u),
                ts(t, e, u),
                ts(t, i, u),
                Qo(i, r),
                Qo(i, o),
                Qo(o, s),
                Qo(i, a),
                Qo(i, c),
                Qo(i, l),
                Qo(i, f),
                Qo(i, d),
                Qo(i, h),
                Qo(i, v)
            },
            p(t, n) {
                2 & n && p !== (p = t[1].title + "") && fs(s, p),
                2 & n && u !== (u = "/explore#q=" + encodeURIComponent(String(t[1].title))) && as(o, "href", u)
            },
            d(t) {
                t && ns(n),
                t && ns(e),
                t && ns(i)
            }
        }
    }
    function Eh(t) {
        let n, e, i;
        function r(n) {
            t[4](n)
        }
        let o = {
            action: t[2],
            okButtonText: "提交审核",
            $$slots: {
                default: [kh]
            },
            $$scope: {
                ctx: t
            }
        };
        return void 0 !== t[0] && (o.open = t[0]),
        n = new al({
            props: o
        }),
        Ts.push(( () => Ks(n, "open", r))),
        {
            c() {
                Ys(n.$$.fragment)
            },
            m(t, e) {
                Zs(n, t, e),
                i = !0
            },
            p(t, [i]) {
                const r = {};
                130 & i && (r.$$scope = {
                    dirty: i,
                    ctx: t
                }),
                !e && 1 & i && (e = !0,
                r.open = t[0],
                Ms(( () => e = !1))),
                n.$set(r)
            },
            i(t) {
                i || (Ls(n.$$.fragment, t),
                i = !0)
            },
            o(t) {
                Hs(n.$$.fragment, t),
                i = !1
            },
            d(t) {
                Qs(n, t)
            }
        }
    }
    function Xh(t, n, e) {
        let {open: i} = n
          , {draft: r} = n
          , {saveManager: o} = n;
        const s = Es();
        let u;
        return t.$$set = t => {
            "open"in t && e(0, i = t.open),
            "draft"in t && e(1, r = t.draft),
            "saveManager"in t && e(3, o = t.saveManager)
        }
        ,
        t.$$.update = () => {
            9 & t.$$.dirty && i && (u = o.save())
        }
        ,
        [i, r, async function(t) {
            if (!t)
                return !0;
            u && await u;
            const n = d(W, {
                id: r.id
            });
            return await _r(n, {
                method: "PUT"
            }) && (s("submitted"),
            ho.show("已进入审核队列")),
            !0
        }
        , o, function(t) {
            i = t,
            e(0, i)
        }
        ]
    }
    class Sh extends eu {
        constructor(t) {
            super(),
            nu(this, t, Xh, Eh, Po, {
                open: 0,
                draft: 1,
                saveManager: 3
            })
        }
    }
    function Th(t, n=!1) {
        Number.isInteger(t) && (t = new Date(t));
        const e = t.getHours()
          , i = t.getMinutes()
          , r = t.getSeconds();
        return function(t) {
            Number.isInteger(t) && (t = new Date(t));
            const n = t.getFullYear()
              , e = t.getMonth() + 1
              , i = t.getDate();
            return `${n}-${Kr(e)}-${Kr(i)}`
        }(t) + ` ${Kr(e)}:${Kr(i)}` + (n ? `:${Kr(r)}` : "")
    }
    function Ch(t) {
        let n, e, i, r, o, s, u, a, c, l, f, d, h, v, p, m, y, g;
        r = new Yc({
            props: {
                icon: "",
                color: "#64ae7c",
                label: "退出",
                size: "small"
            }
        }),
        r.$on("click", t[8]);
        const b = t[11].default
          , w = Lo(b, t, t[10], null);
        let x = !t[1].sheetUserCode && Oh(t);
        l = new Yc({
            props: {
                icon: t[1].sheetCode ? "" : "",
                label: t[1].sheetCode ? "放弃修改" : "删除",
                size: "small",
                disabled: !t[1] || !t[1].id
            }
        }),
        l.$on("click", t[7]);
        let k = t[0] && Gh(t);
        function E(n) {
            t[12](n)
        }
        let X = {
            draft: t[1],
            saveManager: t[0]
        };
        return void 0 !== t[5] && (X.open = t[5]),
        m = new Sh({
            props: X
        }),
        Ts.push(( () => Ks(m, "open", E))),
        m.$on("submitted", t[13]),
        {
            c() {
                n = is("div"),
                e = is("div"),
                i = is("div"),
                Ys(r.$$.fragment),
                o = os(),
                w && w.c(),
                s = os(),
                u = is("div"),
                x && x.c(),
                a = os(),
                c = is("div"),
                Ys(l.$$.fragment),
                f = os(),
                d = is("div"),
                d.innerHTML = '<a href="/" class="logo"><span class="yoopu3-icon svelte-1l8p987"></span></a>',
                h = os(),
                k && k.c(),
                p = os(),
                Ys(m.$$.fragment),
                as(i, "class", "item svelte-1l8p987"),
                as(e, "class", "group svelte-1l8p987"),
                as(c, "class", "item svelte-1l8p987"),
                as(u, "class", "group bottom svelte-1l8p987"),
                as(d, "class", "logo-container svelte-1l8p987"),
                as(n, "class", "side-bar svelte-1l8p987"),
                as(n, "review-status", v = t[1].submissionTime ? mo(t[1]) ? "review-pending" : "review-result" : t[1].sheetCode ? "review-required" : void 0)
            },
            m(t, v) {
                ts(t, n, v),
                Qo(n, e),
                Qo(e, i),
                Zs(r, i, null),
                Qo(e, o),
                w && w.m(e, null),
                Qo(n, s),
                Qo(n, u),
                x && x.m(u, null),
                Qo(u, a),
                Qo(u, c),
                Zs(l, c, null),
                Qo(n, f),
                Qo(n, d),
                Qo(n, h),
                k && k.m(n, null),
                ts(t, p, v),
                Zs(m, t, v),
                g = !0
            },
            p(t, e) {
                w && w.p && 1024 & e && Uo(w, b, t, t[10], e, null, null),
                t[1].sheetUserCode ? x && (Ps(),
                Hs(x, 1, 1, ( () => {
                    x = null
                }
                )),
                qs()) : x ? (x.p(t, e),
                2 & e && Ls(x, 1)) : (x = Oh(t),
                x.c(),
                Ls(x, 1),
                x.m(u, a));
                const i = {};
                2 & e && (i.icon = t[1].sheetCode ? "" : ""),
                2 & e && (i.label = t[1].sheetCode ? "放弃修改" : "删除"),
                2 & e && (i.disabled = !t[1] || !t[1].id),
                l.$set(i),
                t[0] ? k ? (k.p(t, e),
                1 & e && Ls(k, 1)) : (k = Gh(t),
                k.c(),
                Ls(k, 1),
                k.m(n, null)) : k && (Ps(),
                Hs(k, 1, 1, ( () => {
                    k = null
                }
                )),
                qs()),
                (!g || 2 & e && v !== (v = t[1].submissionTime ? mo(t[1]) ? "review-pending" : "review-result" : t[1].sheetCode ? "review-required" : void 0)) && as(n, "review-status", v);
                const r = {};
                2 & e && (r.draft = t[1]),
                1 & e && (r.saveManager = t[0]),
                !y && 32 & e && (y = !0,
                r.open = t[5],
                Ms(( () => y = !1))),
                m.$set(r)
            },
            i(t) {
                g || (Ls(r.$$.fragment, t),
                Ls(w, t),
                Ls(x),
                Ls(l.$$.fragment, t),
                Ls(k),
                Ls(m.$$.fragment, t),
                g = !0)
            },
            o(t) {
                Hs(r.$$.fragment, t),
                Hs(w, t),
                Hs(x),
                Hs(l.$$.fragment, t),
                Hs(k),
                Hs(m.$$.fragment, t),
                g = !1
            },
            d(t) {
                t && ns(n),
                Qs(r),
                w && w.d(t),
                x && x.d(),
                Qs(l),
                k && k.d(),
                t && ns(p),
                Qs(m, t)
            }
        }
    }
    function jh(t) {
        let n, e, i, r;
        return i = new ph({
            props: {
                draft: t[1],
                vocalRange: t[3],
                changesToReview: t[4]
            }
        }),
        {
            c() {
                n = is("div"),
                n.textContent = "曲谱审核",
                e = os(),
                Ys(i.$$.fragment),
                as(n, "class", "title")
            },
            m(t, o) {
                ts(t, n, o),
                ts(t, e, o),
                Zs(i, t, o),
                r = !0
            },
            p(t, n) {
                const e = {};
                2 & n && (e.draft = t[1]),
                8 & n && (e.vocalRange = t[3]),
                16 & n && (e.changesToReview = t[4]),
                i.$set(e)
            },
            i(t) {
                r || (Ls(i.$$.fragment, t),
                r = !0)
            },
            o(t) {
                Hs(i.$$.fragment, t),
                r = !1
            },
            d(t) {
                t && ns(n),
                t && ns(e),
                Qs(i, t)
            }
        }
    }
    function Oh(t) {
        let n, e, i, r;
        function o(t, n) {
            return t[1].submissionTime ? Dh : t[1].sheetCode ? Ah : void 0
        }
        e = new Yc({
            props: {
                icon: "",
                label: t[6] ? t[1] && t[1].sheetCode ? "已发表" : "已投稿" : "投稿",
                size: "small",
                disabled: t[6]
            }
        }),
        e.$on("click", t[9]);
        let s = o(t)
          , u = s && s(t);
        return {
            c() {
                n = is("div"),
                Ys(e.$$.fragment),
                i = os(),
                u && u.c(),
                as(n, "class", "item submit svelte-1l8p987")
            },
            m(t, o) {
                ts(t, n, o),
                Zs(e, n, null),
                Qo(n, i),
                u && u.m(n, null),
                r = !0
            },
            p(t, i) {
                const r = {};
                66 & i && (r.label = t[6] ? t[1] && t[1].sheetCode ? "已发表" : "已投稿" : "投稿"),
                64 & i && (r.disabled = t[6]),
                e.$set(r),
                s === (s = o(t)) && u ? u.p(t, i) : (u && u.d(1),
                u = s && s(t),
                u && (u.c(),
                u.m(n, null)))
            },
            i(t) {
                r || (Ls(e.$$.fragment, t),
                r = !0)
            },
            o(t) {
                Hs(e.$$.fragment, t),
                r = !1
            },
            d(t) {
                t && ns(n),
                Qs(e),
                u && u.d()
            }
        }
    }
    function Ah(t) {
        let n;
        return {
            c() {
                n = is("div"),
                n.innerHTML = '<div class="title svelte-1l8p987"><span class="yoopu3-icon svelte-1l8p987"></span>\n                修改已发表曲谱</div> \n              <div>所有的新增修改都需要通过审核才能更新到已发表的曲谱。</div>',
                as(n, "class", "review-panel svelte-1l8p987")
            },
            m(t, e) {
                ts(t, n, e)
            },
            p: Fo,
            d(t) {
                t && ns(n)
            }
        }
    }
    function Dh(t) {
        let n, e;
        function i(t, e) {
            return (null == n || 2 & e) && (n = !!mo(t[1])),
            n ? _h : Mh
        }
        let r = i(t, -1)
          , o = r(t);
        return {
            c() {
                o.c(),
                e = ss()
            },
            m(t, n) {
                o.m(t, n),
                ts(t, e, n)
            },
            p(t, n) {
                r === (r = i(t, n)) && o ? o.p(t, n) : (o.d(1),
                o = r(t),
                o && (o.c(),
                o.m(e.parentNode, e)))
            },
            d(t) {
                o.d(t),
                t && ns(e)
            }
        }
    }
    function Mh(t) {
        let n, e, i, r, o, s, u = Yr(t[1].reviewComment) + "";
        function a(t, n) {
            return t[1].sheetCode ? Bh : $h
        }
        let c = a(t)
          , l = c(t);
        return {
            c() {
                n = is("div"),
                e = is("div"),
                i = is("span"),
                i.textContent = "",
                r = os(),
                l.c(),
                o = os(),
                s = is("pre"),
                as(i, "class", "yoopu3-icon svelte-1l8p987"),
                as(e, "class", "title svelte-1l8p987"),
                as(s, "class", "svelte-1l8p987"),
                as(n, "class", "review-panel svelte-1l8p987")
            },
            m(t, a) {
                ts(t, n, a),
                Qo(n, e),
                Qo(e, i),
                Qo(e, r),
                l.m(e, null),
                Qo(n, o),
                Qo(n, s),
                s.innerHTML = u
            },
            p(t, n) {
                c !== (c = a(t)) && (l.d(1),
                l = c(t),
                l && (l.c(),
                l.m(e, null))),
                2 & n && u !== (u = Yr(t[1].reviewComment) + "") && (s.innerHTML = u)
            },
            d(t) {
                t && ns(n),
                l.d()
            }
        }
    }
    function _h(t) {
        let n, e, i, r, o, s, u, a, c, l, f = Th(t[1].submissionTime) + "";
        function d(t, n) {
            return t[1].sheetCode ? Ih : Fh
        }
        let h = d(t)
          , v = h(t);
        function p(t, n) {
            return t[1].sheetCode ? Nh : Rh
        }
        let m = p(t)
          , y = m(t);
        return {
            c() {
                n = is("div"),
                e = is("div"),
                i = is("span"),
                i.textContent = "",
                r = os(),
                v.c(),
                o = os(),
                s = is("div"),
                u = rs("提交时间："),
                a = rs(f),
                c = os(),
                l = is("div"),
                y.c(),
                as(i, "class", "yoopu3-icon svelte-1l8p987"),
                as(e, "class", "title svelte-1l8p987"),
                as(s, "class", "subtitle svelte-1l8p987"),
                as(n, "class", "review-panel svelte-1l8p987")
            },
            m(t, f) {
                ts(t, n, f),
                Qo(n, e),
                Qo(e, i),
                Qo(e, r),
                v.m(e, null),
                Qo(n, o),
                Qo(n, s),
                Qo(s, u),
                Qo(s, a),
                Qo(n, c),
                Qo(n, l),
                y.m(l, null)
            },
            p(t, n) {
                h !== (h = d(t)) && (v.d(1),
                v = h(t),
                v && (v.c(),
                v.m(e, null))),
                2 & n && f !== (f = Th(t[1].submissionTime) + "") && fs(a, f),
                m !== (m = p(t)) && (y.d(1),
                y = m(t),
                y && (y.c(),
                y.m(l, null)))
            },
            d(t) {
                t && ns(n),
                v.d(),
                y.d()
            }
        }
    }
    function $h(t) {
        let n;
        return {
            c() {
                n = rs("公开发表的审核未通过")
            },
            m(t, e) {
                ts(t, n, e)
            },
            d(t) {
                t && ns(n)
            }
        }
    }
    function Bh(t) {
        let n;
        return {
            c() {
                n = rs("新增修改的审核未通过")
            },
            m(t, e) {
                ts(t, n, e)
            },
            d(t) {
                t && ns(n)
            }
        }
    }
    function Fh(t) {
        let n;
        return {
            c() {
                n = rs("公开发表等待审核中")
            },
            m(t, e) {
                ts(t, n, e)
            },
            d(t) {
                t && ns(n)
            }
        }
    }
    function Ih(t) {
        let n;
        return {
            c() {
                n = rs("新增修改等待审核中")
            },
            m(t, e) {
                ts(t, n, e)
            },
            d(t) {
                t && ns(n)
            }
        }
    }
    function Rh(t) {
        let n;
        return {
            c() {
                n = rs("曲谱需要通过审核在能公开发表。在审核前您依旧可以做出修改。")
            },
            m(t, e) {
                ts(t, n, e)
            },
            d(t) {
                t && ns(n)
            }
        }
    }
    function Nh(t) {
        let n;
        return {
            c() {
                n = rs("新增的修改需要通过审核在更新到已发表的曲谱。目前新的修改仅自己可见。")
            },
            m(t, e) {
                ts(t, n, e)
            },
            d(t) {
                t && ns(n)
            }
        }
    }
    function Gh(t) {
        let n, e, i;
        return e = new xh({
            props: {
                draft: t[1],
                saveManager: t[0]
            }
        }),
        {
            c() {
                n = is("div"),
                Ys(e.$$.fragment),
                as(n, "class", "last-saving-time svelte-1l8p987")
            },
            m(t, r) {
                ts(t, n, r),
                Zs(e, n, null),
                i = !0
            },
            p(t, n) {
                const i = {};
                2 & n && (i.draft = t[1]),
                1 & n && (i.saveManager = t[0]),
                e.$set(i)
            },
            i(t) {
                i || (Ls(e.$$.fragment, t),
                i = !0)
            },
            o(t) {
                Hs(e.$$.fragment, t),
                i = !1
            },
            d(t) {
                t && ns(n),
                Qs(e)
            }
        }
    }
    function zh(t) {
        let n, e, i, r, o;
        const s = [jh, Ch]
          , u = [];
        function a(t, n) {
            return t[2] ? 0 : 1
        }
        return n = a(t),
        e = u[n] = s[n](t),
        r = new Nd({}),
        {
            c() {
                e.c(),
                i = os(),
                Ys(r.$$.fragment)
            },
            m(t, e) {
                u[n].m(t, e),
                ts(t, i, e),
                Zs(r, t, e),
                o = !0
            },
            p(t, [r]) {
                let o = n;
                n = a(t),
                n === o ? u[n].p(t, r) : (Ps(),
                Hs(u[o], 1, 1, ( () => {
                    u[o] = null
                }
                )),
                qs(),
                e = u[n],
                e ? e.p(t, r) : (e = u[n] = s[n](t),
                e.c()),
                Ls(e, 1),
                e.m(i.parentNode, i))
            },
            i(t) {
                o || (Ls(e),
                Ls(r.$$.fragment, t),
                o = !0)
            },
            o(t) {
                Hs(e),
                Hs(r.$$.fragment, t),
                o = !1
            },
            d(t) {
                u[n].d(t),
                t && ns(i),
                Qs(r, t)
            }
        }
    }
    function Ph(t, n, e) {
        let i, {$$slots: r={}, $$scope: s} = n, {saveManager: u} = n, {draft: a} = n, {isReview: c} = n, {vocalRange: f} = n, {changesToReview: h} = n, v = !1;
        return t.$$set = t => {
            "saveManager"in t && e(0, u = t.saveManager),
            "draft"in t && e(1, a = t.draft),
            "isReview"in t && e(2, c = t.isReview),
            "vocalRange"in t && e(3, f = t.vocalRange),
            "changesToReview"in t && e(4, h = t.changesToReview),
            "$$scope"in t && e(10, s = t.$$scope)
        }
        ,
        t.$$.update = () => {
            2 & t.$$.dirty && e(6, i = !a || !a.id || a.sheetCode || a.submissionTime > (a.reviewTime || 0) || a.lastModifiedTime < (a.reviewTime || 0))
        }
        ,
        [u, a, c, f, h, v, i, async function() {
            if (!await yl(a.sheetCode ? "放弃修改" : "删除曲谱", a.sheetCode ? "是要放弃修改么？曲谱将回退到之前已发表版本。此操作不可逆转。" : "是要删除曲谱么？此操作不可逆转。"))
                return;
            await async function(t, n) {
                const e = await _r(d(U, {
                    id: t
                }), {
                    method: "DELETE"
                });
                return n && await sr(ir + n, null),
                e && l.setBoolean(o, !0),
                e
            }(a.id) && (ho.show("操作成功"),
            await Qr(Er.SECOND),
            a.sheetCode ? location = "/view/" + a.sheetCode : location = "/home#tab=sheets")
        }
        , async function() {
            await u.save(),
            a.id ? location = "/view/" + (a.sheetCode || a.id) : p()
        }
        , async function() {
            e(5, v = !0)
        }
        , s, r, function(t) {
            v = t,
            e(5, v)
        }
        , function(n) {
            Xs(t, n)
        }
        ]
    }
    class qh extends eu {
        constructor(t) {
            super(),
            nu(this, t, Ph, zh, Po, {
                saveManager: 0,
                draft: 1,
                isReview: 2,
                vocalRange: 3,
                changesToReview: 4
            })
        }
    }
    function Lh(t) {
        let n, e, i, r, o, s, u, a, c, l, f;
        return {
            c() {
                n = is("div"),
                e = is("div"),
                e.innerHTML = '<i class="yoopu3-icon svelte-8nttaa"></i> \n    <a class="blue svelte-8nttaa" href="/help#tab">如何编写独奏</a>',
                i = os(),
                r = is("div"),
                o = is("div"),
                s = os(),
                u = is("textarea"),
                a = os(),
                c = is("div"),
                c.innerHTML = '<a href="javascript:" class="deleteColumn svelte-8nttaa" title="删除列&lt;Shift+Delete&gt;">⌫</a> \n      <a href="javascript:" class="addColumn svelte-8nttaa" title="添加列&lt;-&gt;">＋</a> \n      <a href="javascript:" class="del svelte-8nttaa" title="清空目&lt;DEL&gt;">␡</a> \n      <a href="/help#tab" target="_blank" title="帮助" class="svelte-8nttaa">？</a>',
                as(e, "class", "tip svelte-8nttaa"),
                as(o, "class", "tabHighlighter svelte-8nttaa"),
                as(u, "name", "content"),
                as(u, "spellcheck", "false"),
                as(u, "class", "svelte-8nttaa"),
                as(c, "class", "quickPanel svelte-8nttaa"),
                as(r, "class", "textAreaContainer svelte-8nttaa"),
                as(n, "class", "tab-builder svelte-8nttaa")
            },
            m(d, h) {
                ts(d, n, h),
                Qo(n, e),
                Qo(n, i),
                Qo(n, r),
                Qo(r, o),
                t[6](o),
                Qo(r, s),
                Qo(r, u),
                t[7](u),
                ds(u, t[0]),
                Qo(r, a),
                Qo(r, c),
                t[9](c),
                l || (f = us(u, "input", t[8]),
                l = !0)
            },
            p(t, [n]) {
                1 & n && ds(u, t[0])
            },
            i: Fo,
            o: Fo,
            d(e) {
                e && ns(n),
                t[6](null),
                t[7](null),
                t[9](null),
                l = !1,
                f()
            }
        }
    }
    function Hh(t, n, e) {
        let i, r, o, {xheEditor: s} = n, {instrument: u} = n, {value: a} = n;
        return ks(( () => {
            var t, n;
            If.installCursorMove(i),
            t = i,
            n = u === m.GUITAR ? 6 : 4,
            new zf(t,n,r,o,!0),
            zr(i, "keyup", ( () => {
                e(0, a = i.value),
                s.updateTab(a)
            }
            ))
        }
        )),
        t.$$set = t => {
            "xheEditor"in t && e(4, s = t.xheEditor),
            "instrument"in t && e(5, u = t.instrument),
            "value"in t && e(0, a = t.value)
        }
        ,
        [a, i, r, o, s, u, function(t) {
            Ts[t ? "unshift" : "push"](( () => {
                r = t,
                e(2, r)
            }
            ))
        }
        , function(t) {
            Ts[t ? "unshift" : "push"](( () => {
                i = t,
                e(1, i)
            }
            ))
        }
        , function() {
            a = this.value,
            e(0, a)
        }
        , function(t) {
            Ts[t ? "unshift" : "push"](( () => {
                o = t,
                e(3, o)
            }
            ))
        }
        ]
    }
    class Uh extends eu {
        constructor(t) {
            super(),
            nu(this, t, Hh, Lh, Po, {
                xheEditor: 4,
                instrument: 5,
                value: 0
            })
        }
    }
    function Jh(t) {
        let n, e, i, r, o, s, u, a, c, l, f;
        return e = new Yc({
            props: {
                icon: "",
                label: "撤销",
                size: "small",
                disabled: 0 === t[15]
            }
        }),
        e.$on("click", t[35]),
        o = new Yc({
            props: {
                icon: "",
                label: "重做",
                size: "small",
                disabled: 0 === t[14]
            }
        }),
        o.$on("click", t[36]),
        l = new Yc({
            props: {
                icon: t[11] ? "" : "",
                label: "和弦图",
                size: "small"
            }
        }),
        l.$on("click", t[37]),
        {
            c() {
                n = is("div"),
                Ys(e.$$.fragment),
                i = os(),
                r = is("div"),
                Ys(o.$$.fragment),
                s = os(),
                u = is("div"),
                a = os(),
                c = is("div"),
                Ys(l.$$.fragment),
                as(n, "class", "item svelte-908t3m"),
                as(r, "class", "item svelte-908t3m"),
                as(u, "class", "separator svelte-908t3m"),
                as(c, "class", "item svelte-908t3m")
            },
            m(t, d) {
                ts(t, n, d),
                Zs(e, n, null),
                ts(t, i, d),
                ts(t, r, d),
                Zs(o, r, null),
                ts(t, s, d),
                ts(t, u, d),
                ts(t, a, d),
                ts(t, c, d),
                Zs(l, c, null),
                f = !0
            },
            p(t, n) {
                const i = {};
                32768 & n[0] && (i.disabled = 0 === t[15]),
                e.$set(i);
                const r = {};
                16384 & n[0] && (r.disabled = 0 === t[14]),
                o.$set(r);
                const s = {};
                2048 & n[0] && (s.icon = t[11] ? "" : ""),
                l.$set(s)
            },
            i(t) {
                f || (Ls(e.$$.fragment, t),
                Ls(o.$$.fragment, t),
                Ls(l.$$.fragment, t),
                f = !0)
            },
            o(t) {
                Hs(e.$$.fragment, t),
                Hs(o.$$.fragment, t),
                Hs(l.$$.fragment, t),
                f = !1
            },
            d(t) {
                t && ns(n),
                Qs(e),
                t && ns(i),
                t && ns(r),
                Qs(o),
                t && ns(s),
                t && ns(u),
                t && ns(a),
                t && ns(c),
                Qs(l)
            }
        }
    }
    function Wh(t) {
        let n;
        return {
            c() {
                n = is("div"),
                as(n, "class", "right-panel-closed svelte-908t3m")
            },
            m(t, e) {
                ts(t, n, e)
            },
            p: Fo,
            i: Fo,
            o: Fo,
            d(t) {
                t && ns(n)
            }
        }
    }
    function Vh(t) {
        let n, e, i, r, o, s, u;
        const a = [Zh, Yh, Kh]
          , c = [];
        function l(t, n) {
            return t[23] ? 0 : t[24] ? 1 : t[25] ? 2 : -1
        }
        return ~(e = l(t)) && (i = c[e] = a[e](t)),
        {
            c() {
                n = is("div"),
                i && i.c(),
                o = os(),
                s = is("div"),
                as(n, "class", "right-panel svelte-908t3m"),
                as(s, "class", "right-panel-placeholder svelte-908t3m")
            },
            m(t, i) {
                ts(t, n, i),
                ~e && c[e].m(n, null),
                ts(t, o, i),
                ts(t, s, i),
                u = !0
            },
            p(t, r) {
                let o = e;
                e = l(t),
                e === o ? ~e && c[e].p(t, r) : (i && (Ps(),
                Hs(c[o], 1, 1, ( () => {
                    c[o] = null
                }
                )),
                qs()),
                ~e ? (i = c[e],
                i ? i.p(t, r) : (i = c[e] = a[e](t),
                i.c()),
                Ls(i, 1),
                i.m(n, null)) : i = null)
            },
            i(t) {
                u || (Ls(i),
                r || Ds(( () => {
                    r = Js(n, Uc, {
                        x: 50,
                        duration: 50,
                        opacity: .5
                    }),
                    r.start()
                }
                )),
                u = !0)
            },
            o(t) {
                Hs(i),
                u = !1
            },
            d(t) {
                t && ns(n),
                ~e && c[e].d(),
                t && ns(o),
                t && ns(s)
            }
        }
    }
    function Kh(t) {
        let n, e, i, r;
        function o(n) {
            t[57](n)
        }
        let s = {
            instrument: t[32]
        };
        return void 0 !== t[9] && (s.definitions = t[9]),
        e = new _f({
            props: s
        }),
        Ts.push(( () => Ks(e, "definitions", o))),
        e.$on("close", t[58]),
        {
            c() {
                n = is("div"),
                Ys(e.$$.fragment),
                as(n, "class", "panel svelte-908t3m")
            },
            m(t, i) {
                ts(t, n, i),
                Zs(e, n, null),
                r = !0
            },
            p(t, n) {
                const r = {};
                !i && 512 & n[0] && (i = !0,
                r.definitions = t[9],
                Ms(( () => i = !1))),
                e.$set(r)
            },
            i(t) {
                r || (Ls(e.$$.fragment, t),
                r = !0)
            },
            o(t) {
                Hs(e.$$.fragment, t),
                r = !1
            },
            d(t) {
                t && ns(n),
                Qs(e)
            }
        }
    }
    function Yh(t) {
        let n, e, i, r;
        function o(n) {
            t[56](n)
        }
        let s = {
            xheEditor: t[12],
            instrument: t[32]
        };
        return void 0 !== t[24] && (s.value = t[24]),
        e = new Uh({
            props: s
        }),
        Ts.push(( () => Ks(e, "value", o))),
        {
            c() {
                n = is("div"),
                Ys(e.$$.fragment),
                as(n, "class", "panel svelte-908t3m")
            },
            m(t, i) {
                ts(t, n, i),
                Zs(e, n, null),
                r = !0
            },
            p(t, n) {
                const r = {};
                4096 & n[0] && (r.xheEditor = t[12]),
                !i && 16777216 & n[0] && (i = !0,
                r.value = t[24],
                Ms(( () => i = !1))),
                e.$set(r)
            },
            i(t) {
                r || (Ls(e.$$.fragment, t),
                r = !0)
            },
            o(t) {
                Hs(e.$$.fragment, t),
                r = !1
            },
            d(t) {
                t && ns(n),
                Qs(e)
            }
        }
    }
    function Zh(t) {
        let n, e, i, r;
        function o(n) {
            t[55](n)
        }
        let s = {
            xheEditor: t[12],
            timeSignature: t[5],
            instrument: t[32]
        };
        return void 0 !== t[23] && (s.value = t[23]),
        e = new Fd({
            props: s
        }),
        Ts.push(( () => Ks(e, "value", o))),
        {
            c() {
                n = is("div"),
                Ys(e.$$.fragment),
                as(n, "class", "panel svelte-908t3m")
            },
            m(t, i) {
                ts(t, n, i),
                Zs(e, n, null),
                r = !0
            },
            p(t, n) {
                const r = {};
                4096 & n[0] && (r.xheEditor = t[12]),
                32 & n[0] && (r.timeSignature = t[5]),
                !i && 8388608 & n[0] && (i = !0,
                r.value = t[23],
                Ms(( () => i = !1))),
                e.$set(r)
            },
            i(t) {
                r || (Ls(e.$$.fragment, t),
                r = !0)
            },
            o(t) {
                Hs(e.$$.fragment, t),
                r = !1
            },
            d(t) {
                t && ns(n),
                Qs(e)
            }
        }
    }
    function Qh(t) {
        let n, e, i, r, o;
        function s(n) {
            t[59](n)
        }
        let u = {};
        return void 0 !== t[10] && (u.tags = t[10]),
        i = new $l({
            props: u
        }),
        Ts.push(( () => Ks(i, "tags", s))),
        {
            c() {
                n = is("div"),
                n.textContent = "曲谱分类",
                e = os(),
                Ys(i.$$.fragment),
                as(n, "title", "")
            },
            m(t, r) {
                ts(t, n, r),
                ts(t, e, r),
                Zs(i, t, r),
                o = !0
            },
            p(t, n) {
                const e = {};
                !r && 1024 & n[0] && (r = !0,
                e.tags = t[10],
                Ms(( () => r = !1))),
                i.$set(e)
            },
            i(t) {
                o || (Ls(i.$$.fragment, t),
                o = !0)
            },
            o(t) {
                Hs(i.$$.fragment, t),
                o = !1
            },
            d(t) {
                t && ns(n),
                t && ns(e),
                Qs(i, t)
            }
        }
    }
    function tv(t) {
        let n, e, i, r, o, s, u, a, c, l, f, d, h, v, p, m, y, g, b, w, x, k, E, X, S, T, C, j, O, A, D, M, _, $, B, F, I, R, N, G, z, P, q, L, H, U, J, W, V, K, Y, Z, Q, tt, nt, et, it, rt, ot, st, ut, at, ct, lt;
        function ft(n) {
            t[44](n)
        }
        function dt(n) {
            t[45](n)
        }
        function ht(n) {
            t[46](n)
        }
        function vt(n) {
            t[47](n)
        }
        i = new qh({
            props: {
                saveManager: t[13],
                draft: t[0],
                isReview: t[31],
                $$slots: {
                    default: [Jh]
                },
                $$scope: {
                    ctx: t
                }
            }
        }),
        i.$on("submitted", t[38]),
        j = new Sl({
            props: {
                tags: t[0].tags
            }
        });
        let pt = {
            instrument: t[32]
        };
        function mt(n) {
            t[49](n)
        }
        function yt(n) {
            t[50](n)
        }
        void 0 !== t[5] && (pt.timeSignature = t[5]),
        void 0 !== t[7] && (pt.bpm = t[7]),
        void 0 !== t[8] && (pt.key = t[8]),
        void 0 !== t[6] && (pt.capo = t[6]),
        D = new Ed({
            props: pt
        }),
        Ts.push(( () => Ks(D, "timeSignature", ft))),
        Ts.push(( () => Ks(D, "bpm", dt))),
        Ts.push(( () => Ks(D, "key", ht))),
        Ts.push(( () => Ks(D, "capo", vt)));
        let gt = {
            top: t[20],
            left: t[19],
            visible: t[27] && !za(t[26]) && !t[21] && t[12] && !t[12].isComposing() && t[12].isCaretAtChordAnchorAllowedPosition(),
            keyUse: t[28],
            xheEditor: t[12],
            caret: t[26],
            instrument: t[32],
            definitions: t[9]
        };
        function bt(n) {
            t[51](n)
        }
        function wt(n) {
            t[52](n)
        }
        function xt(n) {
            t[53](n)
        }
        void 0 !== t[18] && (gt.isHover = t[18]),
        void 0 !== t[25] && (gt.customChordPanelVisible = t[25]),
        q = new sf({
            props: gt
        }),
        Ts.push(( () => Ks(q, "isHover", mt))),
        Ts.push(( () => Ks(q, "customChordPanelVisible", yt)));
        let kt = {
            xheEditor: t[12],
            instrument: t[32],
            timeSignature: t[5],
            visible: t[27] && !za(t[26]) && t[12] && !t[12].isComposing() && !t[18] && !t[23]
        };
        void 0 !== t[21] && (kt.isHover = t[21]),
        void 0 !== t[23] && (kt.selectedRhythm = t[23]),
        void 0 !== t[24] && (kt.selectedTab = t[24]),
        V = new Wf({
            props: kt
        }),
        Ts.push(( () => Ks(V, "isHover", bt))),
        Ts.push(( () => Ks(V, "selectedRhythm", wt))),
        Ts.push(( () => Ks(V, "selectedTab", xt)));
        const Et = [Vh, Wh]
          , Xt = [];
        function St(t, n) {
            return t[23] || t[24] || t[25] ? 0 : 1
        }
        function Tt(n) {
            t[60](n)
        }
        nt = St(t),
        et = Xt[nt] = Et[nt](t);
        let Ct = {
            action: t[33],
            $$slots: {
                default: [Qh]
            },
            $$scope: {
                ctx: t
            }
        };
        return void 0 !== t[30] && (Ct.open = t[30]),
        rt = new al({
            props: Ct
        }),
        Ts.push(( () => Ks(rt, "open", Tt))),
        ut = new wl({}),
        {
            c() {
                n = is("main"),
                e = is("div"),
                Ys(i.$$.fragment),
                r = os(),
                o = is("div"),
                s = is("div"),
                u = is("div"),
                a = is("div"),
                c = is("input"),
                l = os(),
                f = is("div"),
                d = is("input"),
                h = os(),
                v = is("div"),
                p = is("div"),
                m = is("span"),
                m.textContent = "唱:",
                y = os(),
                g = is("input"),
                b = os(),
                w = is("div"),
                x = is("span"),
                x.textContent = "编:",
                k = os(),
                E = is("input"),
                X = os(),
                S = is("div"),
                T = is("span"),
                T.innerHTML = '分类<i class="yoopu3-icon svelte-908t3m"></i>',
                C = os(),
                Ys(j.$$.fragment),
                O = os(),
                A = is("div"),
                Ys(D.$$.fragment),
                F = os(),
                I = is("div"),
                R = is("div"),
                R.textContent = "请输入歌词...",
                N = os(),
                G = is("div"),
                z = os(),
                P = is("div"),
                Ys(q.$$.fragment),
                J = os(),
                W = is("div"),
                Ys(V.$$.fragment),
                tt = os(),
                et.c(),
                it = os(),
                Ys(rt.$$.fragment),
                st = os(),
                Ys(ut.$$.fragment),
                as(e, "class", "side-bar-container svelte-908t3m"),
                as(c, "type", "text"),
                as(c, "placeholder", "歌曲名"),
                as(c, "class", "svelte-908t3m"),
                as(a, "class", "xhe-title svelte-908t3m"),
                as(d, "type", "text"),
                as(d, "placeholder", "副标题(选填)"),
                as(d, "class", "svelte-908t3m"),
                as(f, "class", "xhe-subtitle svelte-908t3m"),
                as(m, "class", "label svelte-908t3m"),
                as(g, "type", "text"),
                as(g, "placeholder", "歌手/艺人"),
                as(g, "class", "svelte-908t3m"),
                as(p, "class", "item svelte-908t3m"),
                as(x, "class", "label svelte-908t3m"),
                as(E, "type", "text"),
                as(E, "placeholder", "制谱人(选填)"),
                as(E, "class", "svelte-908t3m"),
                as(w, "class", "item svelte-908t3m"),
                as(v, "class", "xhe-info svelte-908t3m"),
                as(T, "class", "label svelte-908t3m"),
                as(S, "class", "xhe-tags svelte-908t3m"),
                as(A, "class", "xhe-meta svelte-908t3m"),
                as(u, "class", "xhe-header svelte-908t3m"),
                as(R, "class", "placeholder svelte-908t3m"),
                hs(R, "hide", t[29]),
                as(G, "class", "editor svelte-908t3m"),
                as(P, "class", "anchor-operation-container svelte-908t3m"),
                as(P, "style", U = `left: ${t[19]}px;top: ${t[20]}px;`),
                as(W, "class", "line-operation-container svelte-908t3m"),
                as(W, "style", Q = `top: ${t[22]}px;`),
                as(I, "class", "editor-container svelte-908t3m"),
                as(s, "class", "sheet svelte-908t3m"),
                as(o, "class", "scroll-view svelte-908t3m"),
                as(n, "class", "svelte-908t3m")
            },
            m(M, _) {
                ts(M, n, _),
                Qo(n, e),
                Zs(i, e, null),
                Qo(n, r),
                Qo(n, o),
                Qo(o, s),
                Qo(s, u),
                Qo(u, a),
                Qo(a, c),
                ds(c, t[1]),
                Qo(u, l),
                Qo(u, f),
                Qo(f, d),
                ds(d, t[2]),
                Qo(u, h),
                Qo(u, v),
                Qo(v, p),
                Qo(p, m),
                Qo(p, y),
                Qo(p, g),
                ds(g, t[3]),
                Qo(v, b),
                Qo(v, w),
                Qo(w, x),
                Qo(w, k),
                Qo(w, E),
                ds(E, t[4]),
                Qo(u, X),
                Qo(u, S),
                Qo(S, T),
                Qo(S, C),
                Zs(j, S, null),
                Qo(u, O),
                Qo(u, A),
                Zs(D, A, null),
                Qo(s, F),
                Qo(s, I),
                Qo(I, R),
                Qo(I, N),
                Qo(I, G),
                t[48](G),
                Qo(I, z),
                Qo(I, P),
                Zs(q, P, null),
                Qo(I, J),
                Qo(I, W),
                Zs(V, W, null),
                t[54](I),
                Qo(n, tt),
                Xt[nt].m(n, null),
                Qo(n, it),
                Zs(rt, n, null),
                Qo(n, st),
                Zs(ut, n, null),
                at = !0,
                ct || (lt = [us(c, "input", t[39]), us(d, "input", t[40]), us(g, "input", t[41]), us(E, "input", t[42]), us(S, "click", t[43])],
                ct = !0)
            },
            p(t, e) {
                const r = {};
                8192 & e[0] && (r.saveManager = t[13]),
                1 & e[0] && (r.draft = t[0]),
                55296 & e[0] | 1024 & e[2] && (r.$$scope = {
                    dirty: e,
                    ctx: t
                }),
                i.$set(r),
                2 & e[0] && c.value !== t[1] && ds(c, t[1]),
                4 & e[0] && d.value !== t[2] && ds(d, t[2]),
                8 & e[0] && g.value !== t[3] && ds(g, t[3]),
                16 & e[0] && E.value !== t[4] && ds(E, t[4]);
                const o = {};
                1 & e[0] && (o.tags = t[0].tags),
                j.$set(o);
                const s = {};
                !M && 32 & e[0] && (M = !0,
                s.timeSignature = t[5],
                Ms(( () => M = !1))),
                !_ && 128 & e[0] && (_ = !0,
                s.bpm = t[7],
                Ms(( () => _ = !1))),
                !$ && 256 & e[0] && ($ = !0,
                s.key = t[8],
                Ms(( () => $ = !1))),
                !B && 64 & e[0] && (B = !0,
                s.capo = t[6],
                Ms(( () => B = !1))),
                D.$set(s),
                536870912 & e[0] && hs(R, "hide", t[29]);
                const u = {};
                1048576 & e[0] && (u.top = t[20]),
                524288 & e[0] && (u.left = t[19]),
                203427840 & e[0] && (u.visible = t[27] && !za(t[26]) && !t[21] && t[12] && !t[12].isComposing() && t[12].isCaretAtChordAnchorAllowedPosition()),
                268435456 & e[0] && (u.keyUse = t[28]),
                4096 & e[0] && (u.xheEditor = t[12]),
                67108864 & e[0] && (u.caret = t[26]),
                512 & e[0] && (u.definitions = t[9]),
                !L && 262144 & e[0] && (L = !0,
                u.isHover = t[18],
                Ms(( () => L = !1))),
                !H && 33554432 & e[0] && (H = !0,
                u.customChordPanelVisible = t[25],
                Ms(( () => H = !1))),
                q.$set(u),
                (!at || 1572864 & e[0] && U !== (U = `left: ${t[19]}px;top: ${t[20]}px;`)) && as(P, "style", U);
                const a = {};
                4096 & e[0] && (a.xheEditor = t[12]),
                32 & e[0] && (a.timeSignature = t[5]),
                209981440 & e[0] && (a.visible = t[27] && !za(t[26]) && t[12] && !t[12].isComposing() && !t[18] && !t[23]),
                !K && 2097152 & e[0] && (K = !0,
                a.isHover = t[21],
                Ms(( () => K = !1))),
                !Y && 8388608 & e[0] && (Y = !0,
                a.selectedRhythm = t[23],
                Ms(( () => Y = !1))),
                !Z && 16777216 & e[0] && (Z = !0,
                a.selectedTab = t[24],
                Ms(( () => Z = !1))),
                V.$set(a),
                (!at || 4194304 & e[0] && Q !== (Q = `top: ${t[22]}px;`)) && as(W, "style", Q);
                let l = nt;
                nt = St(t),
                nt === l ? Xt[nt].p(t, e) : (Ps(),
                Hs(Xt[l], 1, 1, ( () => {
                    Xt[l] = null
                }
                )),
                qs(),
                et = Xt[nt],
                et ? et.p(t, e) : (et = Xt[nt] = Et[nt](t),
                et.c()),
                Ls(et, 1),
                et.m(n, it));
                const f = {};
                1024 & e[0] | 1024 & e[2] && (f.$$scope = {
                    dirty: e,
                    ctx: t
                }),
                !ot && 1073741824 & e[0] && (ot = !0,
                f.open = t[30],
                Ms(( () => ot = !1))),
                rt.$set(f)
            },
            i(t) {
                at || (Ls(i.$$.fragment, t),
                Ls(j.$$.fragment, t),
                Ls(D.$$.fragment, t),
                Ls(q.$$.fragment, t),
                Ls(V.$$.fragment, t),
                Ls(et),
                Ls(rt.$$.fragment, t),
                Ls(ut.$$.fragment, t),
                at = !0)
            },
            o(t) {
                Hs(i.$$.fragment, t),
                Hs(j.$$.fragment, t),
                Hs(D.$$.fragment, t),
                Hs(q.$$.fragment, t),
                Hs(V.$$.fragment, t),
                Hs(et),
                Hs(rt.$$.fragment, t),
                Hs(ut.$$.fragment, t),
                at = !1
            },
            d(e) {
                e && ns(n),
                Qs(i),
                Qs(j),
                Qs(D),
                t[48](null),
                Qs(q),
                Qs(V),
                t[54](null),
                Xt[nt].d(),
                Qs(rt),
                Qs(ut),
                ct = !1,
                Go(lt)
            }
        }
    }
    function nv(t, e, i) {
        let r;
        qo(t, Tu, (t => i(34, r = t)));
        let {draft: o} = e;
        const s = n("Editor")
          , u = h().review;
        let a, c, l, f, d, v, {type: p, title: m="", subtitle: w="", artist: x="", author: k="", timeSignature: E="4/4", capo: X=0, bpm: S=70, key: T="C", content: C=po(Xa()), definitions: j=[], tags: O=[]} = o, A = 0, D = 0, M = !1, _ = 0, $ = 0, B = !1, F = 0, I = null, R = null, N = !1, G = !1, z = "C", P = !0, q = !1;
        function L() {
            var t;
            i(29, (t = a.getRenderer().getItemList(),
            v = !(2 === t.length && t[0].type === oa.TEXT && 0 === Ea(t[0]) && t[1].type === oa.LINE_BREAK)))
        }
        async function H() {
            const {findKey: t} = await Jr(Hr);
            i(28, z = t(a.getRenderer().getItemList().filter((t => t.type === oa.CHORD_ANCHOR)).map((t => t.attributes.chord))) || "C")
        }
        function U() {
            a && c.contentChange()
        }
        function J() {
            const t = {
                title: m,
                subtitle: w,
                artist: x,
                author: k,
                timeSignature: E,
                bpm: S,
                key: T,
                keyUse: z,
                capo: X,
                content: po(ha(a.getRenderer().getItemList())),
                chords: a.getRenderer().getChordsInUse(),
                definitions: j,
                format: y,
                type: p,
                tags: O
            };
            return function(t) {
                for (const n in t)
                    if (t.hasOwnProperty(n)) {
                        const e = t[n];
                        "string" == typeof e && (t[n] = e.replace("•", "·").trim())
                    }
            }(t),
            t
        }
        ks((async () => {
            Fc = t => ho.show(t);
            const {install: t} = await Jr(Hr);
            t(self, Jl(p).concat(j));
            const n = function(t) {
                const {itemList: n} = JSON.parse(t);
                return n
            }(C);
            i(12, a = new qc(f,{
                instrument: p,
                chordStyle: P ? b : g,
                privateCopyKey: o.sheetUserCode ? o.sheetCode : null,
                dark: r
            },n)),
            a.onContentChange(( () => {
                c.contentChange(),
                i(14, ({redos: A, undos: D} = a.getUndoRedoCounts()), A, i(15, D)),
                H(),
                L(),
                i(21, B = !1)
            }
            )),
            a.onCaretMove((t => {
                i(27, G = l.contains(document.getSelection().focusNode)),
                G || I || R || a.clearItemSelection(),
                t && (i(26, d = t),
                function() {
                    const t = a.getRenderer().getItemList();
                    if (i(23, I = null),
                    i(24, R = null),
                    a.isObjectSelected()) {
                        const n = t[d.index];
                        n.type === oa.RHYTHM ? i(23, I = n.attributes.rhythm) : n.type === oa.TAB && i(24, R = n.attributes.tab)
                    }
                }(),
                function() {
                    const t = document.getSelection().getRangeAt(0)
                      , n = function(t) {
                        const n = 50;
                        let e = t.getClientRects()[0];
                        if (!e)
                            return void s("range.getClientRects is empty!");
                        e.top < n ? (window.scrollBy(0, e.top - n),
                        e = t.getClientRects()[0]) : e.bottom + n > window.innerHeight && (window.scrollBy(0, e.bottom + n - window.innerHeight),
                        e = t.getClientRects()[0]);
                        return e
                    }(t)
                      , e = l.getBoundingClientRect()
                      , r = n.top - e.top;
                    if (i(20, $ = r + 18),
                    i(22, F = r - 5),
                    !za(d)) {
                        let r = n.left;
                        if (t.startOffset > 0) {
                            const n = document.createRange();
                            n.setStart(t.startContainer, t.startOffset - 1),
                            n.collapse(!0),
                            r = n.getClientRects()[0].left
                        }
                        i(19, _ = (r + n.left) / 2 - e.left - 1)
                    }
                }())
            }
            )),
            i(13, c = new Bl(2 * Er.SECOND,J)),
            c.onSaveEnd((t => {
                t && i(0, o = t)
            }
            )),
            zr(document, "beforeinput", (t => {
                switch (t.inputType) {
                case "historyUndo":
                    t.preventDefault(),
                    a.undoOrRedo(!1);
                    break;
                case "historyRedo":
                    t.preventDefault(),
                    a.undoOrRedo(!0)
                }
            }
            )),
            L(),
            H()
        }
        ));
        return t.$$set = t => {
            "draft"in t && i(0, o = t.draft)
        }
        ,
        t.$$.update = () => {
            2046 & t.$$.dirty[0] && U(),
            512 & t.$$.dirty[0] && async function() {
                if (G || !N)
                    return;
                const {installChordDefinitions: t} = await Jr(Hr);
                await t(Jl(p).concat(j));
                const n = a.getRenderer();
                n.updateItemList(ha(n.getItemList()))
            }(),
            2048 & t.$$.dirty[0] | 8 & t.$$.dirty[1] && function() {
                if (!a)
                    return;
                i(27, G = !1);
                const t = a.getRenderer();
                t.updateOptions({
                    instrument: p,
                    chordStyle: P ? b : g,
                    dark: r
                }),
                t.updateItemList(ha(t.getItemList())),
                a.setSelectionHighlightColor(r)
            }()
        }
        ,
        [o, m, w, x, k, E, X, S, T, j, O, P, a, c, A, D, l, f, M, _, $, B, F, I, R, N, d, G, z, v, q, u, p, function(t) {
            return t ? O.length < 3 ? (ho.error("请正确勾选所有的必选分类"),
            !1) : (O.length > 0 ? i(0, o.tags = O, o) : delete o.tags,
            U(),
            !0) : (i(10, O = o.tags || []),
            !0)
        }
        , r, () => {
            a.undoOrRedo(!1)
        }
        , () => {
            a.undoOrRedo(!0)
        }
        , () => i(11, P = !P), () => i(0, o.submissionTime = Date.now(), o), function() {
            m = this.value,
            i(1, m)
        }
        , function() {
            w = this.value,
            i(2, w)
        }
        , function() {
            x = this.value,
            i(3, x)
        }
        , function() {
            k = this.value,
            i(4, k)
        }
        , () => i(30, q = !0), function(t) {
            E = t,
            i(5, E)
        }
        , function(t) {
            S = t,
            i(7, S)
        }
        , function(t) {
            T = t,
            i(8, T)
        }
        , function(t) {
            X = t,
            i(6, X)
        }
        , function(t) {
            Ts[t ? "unshift" : "push"](( () => {
                f = t,
                i(17, f)
            }
            ))
        }
        , function(t) {
            M = t,
            i(18, M)
        }
        , function(t) {
            N = t,
            i(25, N)
        }
        , function(t) {
            B = t,
            i(21, B)
        }
        , function(t) {
            I = t,
            i(23, I)
        }
        , function(t) {
            R = t,
            i(24, R)
        }
        , function(t) {
            Ts[t ? "unshift" : "push"](( () => {
                l = t,
                i(16, l)
            }
            ))
        }
        , function(t) {
            I = t,
            i(23, I)
        }
        , function(t) {
            R = t,
            i(24, R)
        }
        , function(t) {
            j = t,
            i(9, j)
        }
        , () => i(25, N = !1), function(t) {
            O = t,
            i(10, O)
        }
        , function(t) {
            q = t,
            i(30, q)
        }
        ]
    }
    class ev extends eu {
        constructor(t) {
            super(),
            nu(this, t, nv, tv, Po, {
                draft: 0
            }, [-1, -1, -1])
        }
    }
    !function(t, {errorReporting: n=!0, allowHorizontalScreen: e=!1}={}) {
        if ((i = navigator.userAgent) && i.indexOf("Trident/7") > 0)
            return Yu("Excuse me? IE11?"),
            void (document.body.innerHTML = '\n<h1 style="text-align: center; color: indianred">有谱么网站不支持IE11，请更新浏览器。</h1>\n<br>\n<h2 style="text-align: center">如果是QQ或360之类的双核浏览器，请切换至"极速模式"</h2>\n    ');
        var i;
        qr().then(( () => Yu("DOMContentLoaded"))),
        Pr().then(( () => Yu("DocumentComplete"))),
        n && !Zu ? Wi !== Ji && (Ye({
            sampleRate: Wi === Hi ? .1 : 1,
            environment: Wi,
            dsn: "https://152d93ecd1114ccb88aed01c65129fa4@o162748.ingest.sentry.io/1230705",
            beforeSend(t, n) {
                const e = n.originalException;
                return e && e.message && e.message.match(/\$ is not defined/) || "Timeout" === n.originalException ? null : t
            },
            integrations: [new Ni.BrowserTracing],
            tracesSampleRate: Wi === Hi ? .01 : 1
        }),
        self.captureException = Yi,
        1) ? Yu("Error reporting enabled") : Yu("Error reporting disabled") : Yu("Error reporting disabled.", {
            errorReporting: n,
            noTracking: Zu
        }),
        Ju().then((t => {
            Yu(t ? "Service worker installed." : "Service worker NOT installed.")
        }
        )),
        setTimeout(( () => {
            const n = new Xu;
            n.install(self),
            (Lu && Hu ? (Uu || (Uu = Gr(Lu, "message", (t => t.data.type === Gu)),
            Lu.ready && Lu.ready.then(( () => {
                Lu.controller && (zu("Checking client staled..."),
                Lu.controller.postMessage({
                    type: Nu
                }))
            }
            ))),
            Uu) : new Promise(( () => {}
            ))).then(( () => {
                Yu("Client staled, try to reload."),
                n.reload()
            }
            )),
            !e && Math.min(screen.height, screen.width) <= 500 && n.lockScreenOrientation(wu);
            let i = [];
            Zu || (i = Ki(n)),
            qr().then(( () => {
                i.forEach((t => {
                    Yu("Loading analytics script", t),
                    function(t) {
                        if (!Ru[t]) {
                            const n = pr("script", {
                                async: "",
                                src: t
                            });
                            Ru[t] = new Promise(( (e, i) => {
                                n.onload = e,
                                n.onerror = () => i(new Error("Failed to load script: " + t))
                            }
                            )),
                            document.head.appendChild(n)
                        }
                        return Ru[t]
                    }(t).then(( () => Yu("Analytics script loaded", t))).catch(( () => {}
                    ))
                }
                )),
                Yu("Installing icon font..."),
                function(t) {
                    const n = pr("style", {
                        type: "text/css"
                    });
                    n.innerHTML = t,
                    document.head.appendChild(n)
                }(`@font-face {\n  font-family: 'iconfont';\n  src: url('${cu}') format('woff2'),\n  url('${lu}') format('woff'),\n  url('${fu}') format('truetype');\n}`)
            }
            )),
            window.navigator.standalone && window.addEventListener("click", (function(t) {
                const n = t.target.closest("a");
                if (n && n.href && 0 === n.href.indexOf(window.location.origin))
                    return window.location = n.href,
                    t.preventDefault(),
                    !1
            }
            ), !1),
            Bu(),
            ju(n),
            Tu.subscribe((t => {
                mr("dark", t)
            }
            )),
            Ku.subscribe((t => {
                !function(t, n="") {
                    null == n ? fr.removeAttribute(t) : fr.setAttribute(t, n)
                }("instrument", t)
            }
            ));
            const r = dr("#c")
              , o = function(t) {
                if (!t)
                    return {};
                const n = go(t.innerHTML);
                return t.innerHTML = "",
                t.style.display = "",
                n
            }(r);
            o && void 0 !== o.user && (null === o.user ? $o() : Bo(o.user)),
            Yu("Initializing app..."),
            t(n, r, o),
            Yu("App ready!")
        }
        ), 1)
    }((async function(t, n, e) {
        i = self,
        i._xheInstalled || (br($a[oa.TEXT], Ma),
        br($a[oa.CHORD_ANCHOR], Qu),
        br($a[oa.HEADLINE], ta),
        br($a[oa.LINE_BREAK], na),
        br($a[oa.RHYTHM], Ca),
        br($a[oa.TAB], Oa),
        i._xheInstalled = !0);
        var i;
        let r = await async function() {
            const t = !!dr("script[data-name=ar]")
              , {fromSheet: n, id: e} = v();
            let i;
            if (n)
                i = await To(null, null, null, n),
                i && (history.replaceState(void 0, void 0, "#id=" + i.id),
                l.setBoolean(o, !0),
                i.sheetUserCode && ho.show("提示: 改编他人的曲谱仅自己可见"));
            else if (e) {
                if (!(r = e) || 24 !== r.length)
                    throw new Error("Not a draft ID: " + e);
                i = await So(e, t ? 2 : 1, null, !0)
            }
            var r;
            return i
        }();
        if (!r) {
            const t = h().instrument || E();
            if (!function(t) {
                return [m.GUITAR, m.UKULELE, m.PIANO].includes(t)
            }(t))
                return void ho.error("请先返回主界面选择乐器");
            r = {
                type: t
            }
        }
        new ev({
            target: n,
            props: {
                webViewInterface: t,
                ...e,
                draft: r
            }
        })
    }
    ))
}();
//# sourceMappingURL=https://yopu.co/jsmap/dt-editor.es.f59d1725.js.map
