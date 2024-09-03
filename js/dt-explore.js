!function() {
    "use strict";
    const t = Object.assign({}, {
        GUITAR: "guitar",
        UKULELE: "ukulele",
        PIANO: "piano"
    }, {
        JIAN: "jian"
    })
      , n = {
        [t.GUITAR]: "吉他",
        [t.UKULELE]: "尤克里里",
        [t.PIANO]: "钢琴",
        [t.JIAN]: "民乐/简谱"
    };
    function e(n, e, o) {
        return o === i.XHE ? "和弦" : n === t.PIANO ? e === r.SOLO ? "独奏" : "功能" : e === r.SOLO ? "指弹" : "弹唱"
    }
    const i = {
        XHE: "xhe",
        JCX: "jcx",
        GP: "gp",
        MXL: "mxl"
    }
      , r = {
        UNKNOWN: "",
        SOLO: "a",
        VOCAL_MALE: "b",
        VOCAL_FEMALE: "c",
        VOCAL_GENERAL: "d",
        VOCAL_CHORUS: "e"
    }
      , o = 1
      , s = 3
      , u = "full-tab"
      , c = "staff"
      , a = "number"
      , l = {
        SCORE: "Score",
        TAB: "Tab",
        LEAD: "Lead",
        NLEAD: "NLead",
        NUMBERED: "Numbered"
    };
    const f = [i.JCX, i.GP, i.MXL];
    function h(t) {
        return v() ? console.log.bind(console, `[${t}]`) : () => {}
    }
    function d(t) {
        return v() ? console.error.bind(console, `[${t}]`) : t => {
            t instanceof Error && self.captureException && self.captureException(t)
        }
    }
    function v() {
        return self.location && ("localhost" === self.location.hostname || 0 === self.location.hostname.indexOf("192.168.") || "dev.yopu.co" === self.location.hostname || "18080" === self.location.port || self.location.search.indexOf("log=8") > 0)
    }
    "undefined" == typeof self && "object" == typeof global && (global.self = global);
    const p = "user-data-user-info"
      , m = "user-data-user-portfolio"
      , g = "user-data-history-queries"
      , y = "user-data-portfolio-stale"
      , b = "user-data-last-recommendation"
      , w = "mine-settings:selected-instrument"
      , X = "mine-settings:selected-color-mode"
      , x = h("Storage")
      , {localStorage: k} = window;
    class E {
        static setItem(t, n) {
            if (x("setItem", t),
            k)
                try {
                    k.setItem(t, n)
                } catch (t) {
                    self.captureException && self.captureException(t)
                }
        }
        static getItem(t) {
            return k ? k.getItem(t) : null
        }
        static removeItem(t) {
            k && k.removeItem(t)
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
            k.clear()
        }
    }
    function T(t) {
        const n = [];
        for (const e in t)
            t.hasOwnProperty(e) && void 0 !== t[e] && n.push(`${e}=${encodeURIComponent(t[e])}`);
        return n.join("&")
    }
    function S(t, n, e) {
        let i = t;
        const r = T(n);
        r && (i += "?" + r);
        const o = T(e);
        return o && (i += "#" + o),
        i
    }
    function j(t=location.search) {
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
    function C() {
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
    function A(t) {
        return O(t) ? (E.setItem(w, t),
        t) : null
    }
    function O(n) {
        return [t.GUITAR, t.UKULELE, t.JIAN, t.PIANO].includes(n)
    }
    const _ = "//cdn.yopu.co/img/default-avatar.9190c675.svg"
      , B = "//cdn.yopu.co/img/no_result.b1eccf4e.svg"
      , D = "//cdn.yopu.co/img/no_result_dark.fbdb8102.svg"
      , q = "//cdn.yopu.co/img/logo.bd260b19.svg"
      , I = "//cdn.yopu.co/img/4xian.a2d3062a.svg"
      , M = "//cdn.yopu.co/img/4xian_dark.f584f8d6.svg"
      , F = "//cdn.yopu.co/font/iconfont.dfeb8317.woff2"
      , N = "//cdn.yopu.co/font/iconfont-deprecated.88c86d8f.woff"
      , $ = "//cdn.yopu.co/font/iconfont.04cf6e63.ttf";
    function R(t) {
        return /(miniProgram|MMWEBSDK)/i.test(t)
    }
    function G(t) {
        return /ToutiaoMicroApp/i.test(t)
    }
    function P(t) {
        const n = t.replaceAll('\n',"").split("");
        return function(t) {
            const n = t.length
              , e = new W(n);
            e.skip(n);
            for (let i = 1; i < n; i++)
                e.prev(),
                U(t, i, e.value)
        }(n),
        n.join("")
    }
    function U(t, n, e) {
        const i = e * (n + 1) | 0;
        [t[n],t[i]] = [t[i], t[n]]
    }
    const L = 601
      , z = 65536;
    class W {
        constructor(t=1) {
            this.x = J(t, z)
        }
        get value() {
            return this.x / z
        }
        next() {
            this.x = J(L * this.x + 11, z)
        }
        prev() {
            this.x = J(9705 * (this.x - 11), z)
        }
        skip(t) {
            const n = (H(L, t, L * z - z) - 1) / 600 * 11
              , e = H(L, t, z) * this.x;
            this.x = J(n + e, z)
        }
    }
    function H(t, n, e) {
        let i = 1
          , r = t = J(t, e);
        for (; n > 0; ) {
            const t = J(n, 2);
            n = n / 2 | 0,
            1 === t && (i = J(i * r, e)),
            r = J(r * r, e)
        }
        return i
    }
    function J(t, n) {
        const e = t % n;
        return e < 0 ? e + n : e
    }
    const V = 36e5
      , K = 24 * V
      , Q = 30 * K
      , Y = {
        SECOND: 1e3,
        MINUTE: 6e4,
        HOUR: V,
        DAY: K,
        WEEK: 6048e5,
        MONTH: Q,
        QUARTER: 7776e6,
        YEAR: 31536e6
    }
      , Z = 401
      , tt = "admin"
      , nt = "member"
      , et = "top-author"
      , it = "top-player"
      , rt = "EDITOR";
    function ot(t, n) {
        if (!t)
            throw new Error(n)
    }
    function st(t) {
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
    const ut = {
        ["USER"]: 1,
        ["TESTER"]: 2,
        [rt]: 3,
        ["ADMIN"]: 4
    };
    function ct(t, n) {
        return (ut[t] || 1) >= (ut[n] || 4)
    }
    class at {
        constructor() {
            this.t = []
        }
        add(t) {
            return this.t.push(t),
            () => {
                this.remove(t)
            }
        }
        remove(t) {
            const n = this.t.indexOf(t);
            n > -1 && this.t.splice(n, 1)
        }
        removeAll() {
            this.t.length = 0
        }
        fire(...t) {
            return Promise.all(this.t.map((n => Promise.resolve(n(...t)))))
        }
        getHandlerCount() {
            return this.t.length
        }
    }
    class lt extends Error {
        constructor(t) {
            super(t),
            this.name = "TimeoutError"
        }
    }
    class ft extends Error {
        constructor(t) {
            super(t),
            this.name = "CancellationError"
        }
    }
    class ht extends Error {
        constructor(t, n="") {
            super(n),
            this.name = "HttpError " + t,
            this.statusCode = t
        }
    }
    const dt = "TIMEOUT"
      , vt = "CANCELLATION"
      , pt = new at
      , mt = new at
      , gt = new at;
    function yt(t, n, e={}) {
        pt.fire({
            url: t,
            init: n,
            options: e
        });
        const {timeout: i=30 * Y.SECOND} = e;
        let r;
        function o(t) {
            r && !r.signal.aborted && r.abort(t)
        }
        self.AbortController && (r = new AbortController,
        n = {
            ...n,
            signal: r.signal
        });
        let s = null;
        function u() {
            c = !0,
            s && (clearTimeout(s),
            s = null)
        }
        i && (s = setTimeout(( () => o(dt)), i));
        let c = !1;
        const a = fetch(t, Object.assign({
            credentials: "include"
        }, n)).then((i => (u(),
        i.ok ? (mt.fire({
            url: t,
            init: n,
            options: e,
            res: i
        }),
        i) : i.text().then((t => Promise.reject(new ht(i.status,t))))))).catch((i => {
            if (u(),
            "AbortError" === i.name) {
                const {reason: n} = r.signal;
                n === dt ? i = new lt(t) : n === vt && (i = new ft(t))
            }
            return gt.fire({
                url: t,
                init: n,
                options: e,
                error: i
            }),
            Promise.reject(i)
        }
        ));
        return a.cancel = () => {
            c || o(vt)
        }
        ,
        a
    }
    function bt(t, n, e={}) {
        return Xt(t, n, e, "json")
    }
    function wt(t, n, e={}) {
        return function(t, n, e={}) {
            return Xt(t, n, e, null)
        }(t, xt(n), e)
    }
    function Xt(t, n, e, i) {
        const r = yt(t, n, e)
          , o = r.then((t => !i || ("arrayBuffer" === i ? t[i]().then((t => new Uint8Array(t))) : t[i]()))).catch((t => t instanceof ht || t instanceof ft || t instanceof lt ? !!i && null : Promise.reject(t)));
        return o.cancel = r.cancel,
        o
    }
    function xt(t, n="POST") {
        return {
            method: n,
            body: JSON.stringify(t),
            headers: {
                "Content-Type": "application/json"
            }
        }
    }
    class kt {
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
    function Et(t) {
        return function(t) {
            let n = "";
            for (let e = 0; e < t.length; ++e)
                Tt(t, e) ? n += " " + t[e] + " " : n += t[e];
            return n
        }(t).toLowerCase().split(/[\\'!"#$%&()*+,\-./:;<=>?@[\]^_`{|}~ 　～•·！＠＃￥％…＆×－—＝＋、，。｜？《》；：｛｝（）“”‘’【】■]/).map((t => t.trim())).filter((t => t.length > 0))
    }
    function Tt(t, n) {
        const e = t.charCodeAt(n);
        return function(t, n) {
            const e = t.charCodeAt(n);
            return 19968 <= e && e <= 40959 || 13312 <= e && e <= 19903 || 131072 <= e && e <= 173791
        }(t, n) || 12352 <= e && e <= 12447 || 12448 <= e && e <= 12543
    }
    function St(t, n=!0) {
        return null == t ? "-" : n ? t > 1e4 ? (t / 1e4).toFixed(0) + "万" : t > 1e3 ? (t / 1e3).toFixed(0) + "千" : t > 100 ? (t / 100).toFixed(0) + "百" : t.toString() : t.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }
    function jt(t, n=2) {
        let e = String(t);
        for (let t = e.length; t < n; ++t)
            e = "0" + e;
        return e
    }
    function Ct(t) {
        return (t || "").toUpperCase()
    }
    const At = document
      , Ot = At.body;
    function _t(t) {
        return At.querySelector(t)
    }
    function Bt(t, n) {
        return t.querySelector(n)
    }
    function Dt(t, n, ...e) {
        const i = At.createElement(t);
        if (n)
            for (const t in n)
                if (n.hasOwnProperty(t)) {
                    const e = n[t];
                    i.setAttribute(t, e)
                }
        return e && e.length > 0 && e.forEach((t => It(i, t))),
        i
    }
    function qt(t, n) {
        !function(t, n, e) {
            t.classList.toggle(n, e)
        }(Ot, t, n)
    }
    function It(t, n) {
        t.classList.add(n)
    }
    function Mt(t, n) {
        t.classList.remove(n)
    }
    const Ft = h("Toast")
      , Nt = "center"
      , $t = "bottom"
      , Rt = "default"
      , Gt = "awesome"
      , Pt = "warn"
      , Ut = "error"
      , Lt = "yp-toast"
      , zt = 8 * Y.SECOND
      , Wt = 5 * Y.SECOND
      , Ht = function() {
        let t = _t("#yp-toast");
        t || (t = Dt("div", {
            id: Lt
        }),
        t.innerHTML = '\n<div class="message"></div>\n<div class="right">\n  <button action></button>\n</div>\n    ',
        document.body.appendChild(t));
        return t
    }();
    let Jt;
    class Vt {
        static error(t, n) {
            return Kt(Ut, $t, t, n)
        }
        static warn(t, n) {
            return Kt(Pt, $t, t, n)
        }
        static awesome(t, n) {
            return Kt(Gt, $t, t, n)
        }
        static show(t, n) {
            return Kt(Rt, $t, t, n)
        }
        static center(t) {
            return Kt(Rt, Nt, t)
        }
    }
    async function Kt(t, n, e, i) {
        Ft(e),
        await st(0),
        Bt(Ht, ".message").innerHTML = function(t) {
            return t.replace(/\[(.*)]\((.*)\)/g, '<a href="$2" target="_blank">$1</a>')
        }(e);
        const r = Bt(Ht, "button[action]");
        i ? (Mt(r, "hide"),
        r.textContent = i) : It(r, "hide"),
        Ht.setAttribute("level", t),
        Ht.setAttribute("position", n),
        It(Ht, "show");
        const o = new kt;
        Jt && Jt.cancel(),
        Jt = st(i ? zt : Wt);
        const s = () => {
            u(!1)
        }
        ;
        function u(t) {
            Mt(Ht, "show"),
            Jt && (Jt.cancel(),
            Jt = null),
            o.resolve(t),
            document.body.removeEventListener("click", s)
        }
        return document.body.addEventListener("click", s),
        Jt.then(( () => u(!1))),
        r.onclick = () => u(!0),
        o.promise
    }
    const Qt = "account"
      , Yt = "api"
      , Zt = "apple"
      , tn = "chat"
      , nn = "i"
      , en = "media"
      , rn = "payment"
      , on = "product"
      , sn = "public"
      , un = "ranking"
      , cn = "recommendation"
      , an = "search"
      , ln = "sheet"
      , fn = "sheet-list"
      , hn = "sheets"
      , dn = "tip-off"
      , vn = "user"
      , pn = "users"
      , mn = "wx"
      , gn = Cn([Yt, Qt, "cap-sessions"])
      , yn = Cn([Yt, Qt, "request-cell-code"])
      , bn = Cn([Yt, Qt, "request-verification-code"]);
    Cn([Yt, Qt, "login-name-exists"]),
    Cn([Yt, Qt, "sessions"]),
    Cn([Yt, tn, "broadcast"]),
    Cn([Yt, tn, "image"]),
    Cn([Yt, tn, "message"]),
    Cn([Yt, tn, "messages"]),
    Cn([Yt, tn, "systemmessages"]),
    Cn([Yt, tn, "contacts"]),
    Cn([Yt, ln]),
    Cn([Yt, "draft"]),
    Cn([Yt, "drafts"]),
    Cn([Yt, ln, "content"]),
    Cn([Yt, "unlink-draft-dory"]),
    Cn([Yt, "submit-draft"]),
    Cn([Yt, ln, "favorite"]),
    Cn([Yt, ln, "rating"]),
    Cn([Yt, ln, "settings"]),
    Cn([Yt, ln, cn]),
    Cn([Yt, ln, "editor-choice"]),
    Cn([Yt, ln, sn]),
    Cn([Yt, en]),
    Cn([Yt, en, "play"]),
    Cn([Yt, ln, dn]),
    Cn([Yt, ln, "screenshot"]),
    Cn([Yt, ln, "view"]),
    Cn([Yt, "song", hn]),
    Cn([Yt, vn, "purchases"]),
    Cn([Yt, vn, hn]),
    Cn([Yt, vn, "award"]),
    Cn([Yt, vn, "info"]),
    Cn([Yt, vn, "portfolio"]),
    Cn([Yt, vn, "public-info"]),
    Cn([Yt, vn, "mute"]),
    Cn([Yt, vn, "unmute"]),
    Cn([Yt, vn, "report"]),
    Cn([Yt, vn, dn]),
    Cn([Yt, rn, Zt, "transaction"]),
    Cn([Yt, rn, Zt, "auto-restore"]),
    Cn([Yt, rn, "history"]),
    Cn([Yt, rn, "purchase"]),
    Cn([Yt, rn, "user-balance"]),
    Cn([Yt, rn, "purchase-details"]),
    Cn([Yt, rn, mn, "check-refund"]),
    Cn([Yt, rn, mn, "refund-order"]),
    Cn([Yt, on, "coins-payable"]),
    Cn([Yt, on, "membership-plans"]),
    Cn([Yt, vn, "real-id"]),
    Cn([Yt, vn]),
    Cn([Yt, "dory"]),
    Cn([Yt, "dories"]),
    Cn([Yt, "lock-dory"]),
    Cn([Yt, fn]),
    Cn([Yt, fn, sn]);
    const wn = Cn([Yt, hn, "new"])
      , Xn = Cn([Yt, hn, "category"])
      , xn = Cn([Yt, "artists"])
      , kn = Cn([Yt, "posts", cn])
      , En = Cn([Yt, an, "click"])
      , Tn = Cn([Yt, an, hn])
      , Sn = Cn([Yt, an, "filled-queries"]);
    Cn([Yt, rn, "claim-coupon"]),
    Cn([Yt, rn, mn, "check-order"]),
    Cn([Yt, rn, mn, "place-order"]),
    Cn([pn, un, "playerscore"]),
    Cn([pn, un, "totalscore"]),
    Cn([pn, un]),
    Cn(["finance", "vat-records"]),
    Cn([nn, "bustcache"]),
    Cn([nn, "chat-bot-vocab"]),
    Cn([nn, "chat-bot-vocabs"]),
    Cn([nn, "line-item"]),
    Cn([nn, "line-items"]),
    Cn([nn, "cdn"]),
    Cn([nn, dn]),
    Cn([nn, "model", dn]);
    const jn = "/start?mode=bind-cell";
    function Cn(t) {
        return "/" + t.join("/")
    }
    function An(n, e, i, o=u, s=c) {
        switch (n) {
        case t.PIANO:
            return e === t.PIANO ? s === a ? l.NUMBERED : l.SCORE : s === a ? l.NLEAD : l.LEAD;
        case t.GUITAR:
        case t.UKULELE:
            return e === t.PIANO ? l.SCORE : i === r.SOLO || o === u ? l.TAB : l.NLEAD;
        case t.JIAN:
            return l.NLEAD;
        default:
            switch (e) {
            case t.PIANO:
                return l.SCORE;
            case t.GUITAR:
            case t.UKULELE:
                return l.TAB;
            default:
                throw new Error("getStaveProfile: Unsupported instrument: " + e)
            }
        }
    }
    var On = function(t, n) {
        return (On = Object.setPrototypeOf || {
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
    function _n(t, n) {
        function e() {
            this.constructor = t
        }
        On(t, n),
        t.prototype = null === n ? Object.create(n) : (e.prototype = n.prototype,
        new e)
    }
    var Bn, Dn, qn, In, Mn, Fn, Nn = function() {
        return (Nn = Object.assign || function(t) {
            for (var n, e = 1, i = arguments.length; e < i; e++)
                for (var r in n = arguments[e])
                    Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r]);
            return t
        }
        ).apply(this, arguments)
    };
    function $n(t, n) {
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
    function Rn(t) {
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
    function Gn(t, n) {
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
    function Pn() {
        for (var t = [], n = 0; n < arguments.length; n++)
            t = t.concat(Gn(arguments[n]));
        return t
    }
    function Un() {
        return "[object process]" === Object.prototype.toString.call("undefined" != typeof process ? process : 0)
    }
    function Ln(t, n) {
        return t.require(n)
    }
    function zn(t) {
        var n;
        try {
            n = Ln(module, t)
        } catch (t) {}
        try {
            var e = Ln(module, "process").cwd;
            n = Ln(module, e() + "/node_modules/" + t)
        } catch (t) {}
        return n
    }
    !function(t) {
        t.Ok = "ok",
        t.Exited = "exited",
        t.Crashed = "crashed",
        t.Abnormal = "abnormal"
    }(Bn || (Bn = {})),
    function(t) {
        t.Ok = "ok",
        t.Errored = "errored",
        t.Crashed = "crashed"
    }(Dn || (Dn = {})),
    function(t) {
        t.Fatal = "fatal",
        t.Error = "error",
        t.Warning = "warning",
        t.Log = "log",
        t.Info = "info",
        t.Debug = "debug",
        t.Critical = "critical"
    }(qn || (qn = {})),
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
    }(qn || (qn = {})),
    function(t) {
        t.Unknown = "unknown",
        t.Skipped = "skipped",
        t.Success = "success",
        t.RateLimit = "rate_limit",
        t.Invalid = "invalid",
        t.Failed = "failed"
    }(In || (In = {})),
    function(t) {
        t.fromHttpCode = function(n) {
            return n >= 200 && n < 300 ? t.Success : 429 === n ? t.RateLimit : n >= 400 && n < 500 ? t.Invalid : n >= 500 ? t.Failed : t.Unknown
        }
    }(In || (In = {})),
    function(t) {
        t.Explicit = "explicitly_set",
        t.Sampler = "client_sampler",
        t.Rate = "client_rate",
        t.Inheritance = "inheritance"
    }(Mn || (Mn = {})),
    function(t) {
        t.BeforeSend = "before_send",
        t.EventProcessor = "event_processor",
        t.NetworkError = "network_error",
        t.QueueOverflow = "queue_overflow",
        t.RateLimitBackoff = "ratelimit_backoff",
        t.SampleRate = "sample_rate"
    }(Fn || (Fn = {}));
    var Wn = {};
    function Hn() {
        return Un() ? global : "undefined" != typeof window ? window : "undefined" != typeof self ? self : Wn
    }
    function Jn(t) {
        switch (Object.prototype.toString.call(t)) {
        case "[object Error]":
        case "[object Exception]":
        case "[object DOMException]":
            return !0;
        default:
            return ie(t, Error)
        }
    }
    function Vn(t) {
        return "[object ErrorEvent]" === Object.prototype.toString.call(t)
    }
    function Kn(t) {
        return "[object DOMError]" === Object.prototype.toString.call(t)
    }
    function Qn(t) {
        return "[object String]" === Object.prototype.toString.call(t)
    }
    function Yn(t) {
        return null === t || "object" != typeof t && "function" != typeof t
    }
    function Zn(t) {
        return "[object Object]" === Object.prototype.toString.call(t)
    }
    function te(t) {
        return "undefined" != typeof Event && ie(t, Event)
    }
    function ne(t) {
        return "undefined" != typeof Element && ie(t, Element)
    }
    function ee(t) {
        return Boolean(t && t.then && "function" == typeof t.then)
    }
    function ie(t, n) {
        try {
            return t instanceof n
        } catch (t) {
            return !1
        }
    }
    function re(t, n) {
        try {
            for (var e = t, i = [], r = 0, o = 0, s = " > ".length, u = void 0; e && r++ < 5 && !("html" === (u = oe(e, n)) || r > 1 && o + i.length * s + u.length >= 80); )
                i.push(u),
                o += u.length,
                e = e.parentNode;
            return i.reverse().join(" > ")
        } catch (t) {
            return "<unknown>"
        }
    }
    function oe(t, n) {
        var e, i, r, o, s, u, c, a = t, l = [];
        if (!a || !a.tagName)
            return "";
        l.push(a.tagName.toLowerCase());
        var f = (null === (e = n) || void 0 === e ? void 0 : e.length) ? n.filter((function(t) {
            return a.getAttribute(t)
        }
        )).map((function(t) {
            return [t, a.getAttribute(t)]
        }
        )) : null;
        if (null === (i = f) || void 0 === i ? void 0 : i.length)
            f.forEach((function(t) {
                l.push("[" + t[0] + '="' + t[1] + '"]')
            }
            ));
        else if (a.id && l.push("#" + a.id),
        (r = a.className) && Qn(r))
            for (o = r.split(/\s+/),
            c = 0; c < o.length; c++)
                l.push("." + o[c]);
        var h = ["type", "name", "title", "alt"];
        for (c = 0; c < h.length; c++)
            s = h[c],
            (u = a.getAttribute(s)) && l.push("[" + s + '="' + u + '"]');
        return l.join("")
    }
    var se = Object.setPrototypeOf || ({
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
    var ue = function(t) {
        function n(n) {
            var e = this.constructor
              , i = t.call(this, n) || this;
            return i.message = n,
            i.name = e.prototype.constructor.name,
            se(i, e.prototype),
            i
        }
        return _n(n, t),
        n
    }(Error)
      , ce = /^(?:(\w+):)\/\/(?:(\w+)(?::(\w+))?@)([\w.-]+)(?::(\d+))?\/(.+)/
      , ae = "Invalid Dsn"
      , le = function() {
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
            var n = ce.exec(t);
            if (!n)
                throw new ue(ae);
            var e = Gn(n.slice(1), 6)
              , i = e[0]
              , r = e[1]
              , o = e[2]
              , s = void 0 === o ? "" : o
              , u = e[3]
              , c = e[4]
              , a = void 0 === c ? "" : c
              , l = ""
              , f = e[5]
              , h = f.split("/");
            if (h.length > 1 && (l = h.slice(0, -1).join("/"),
            f = h.pop()),
            f) {
                var d = f.match(/^\d+/);
                d && (f = d[0])
            }
            this._fromComponents({
                host: u,
                pass: s,
                path: l,
                projectId: f,
                port: a,
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
                    throw new ue("Invalid Dsn: " + n + " missing")
            }
            )),
            !this.projectId.match(/^\d+$/))
                throw new ue("Invalid Dsn: Invalid projectId " + this.projectId);
            if ("http" !== this.protocol && "https" !== this.protocol)
                throw new ue("Invalid Dsn: Invalid protocol " + this.protocol);
            if (this.port && isNaN(parseInt(this.port, 10)))
                throw new ue("Invalid Dsn: Invalid port " + this.port)
        }
        ,
        t
    }()
      , fe = Hn()
      , he = "Sentry Logger ";
    function de(t) {
        var n = Hn();
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
    var ve = function() {
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
            this._enabled && de((function() {
                fe.console.log(he + "[Log]: " + t.join(" "))
            }
            ))
        }
        ,
        t.prototype.warn = function() {
            for (var t = [], n = 0; n < arguments.length; n++)
                t[n] = arguments[n];
            this._enabled && de((function() {
                fe.console.warn(he + "[Warn]: " + t.join(" "))
            }
            ))
        }
        ,
        t.prototype.error = function() {
            for (var t = [], n = 0; n < arguments.length; n++)
                t[n] = arguments[n];
            this._enabled && de((function() {
                fe.console.error(he + "[Error]: " + t.join(" "))
            }
            ))
        }
        ,
        t
    }();
    fe.g = fe.g || {};
    var pe = fe.g.logger || (fe.g.logger = new ve)
      , me = function() {
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
      , ge = "<anonymous>";
    function ye(t) {
        try {
            return t && "function" == typeof t && t.name || ge
        } catch (t) {
            return ge
        }
    }
    function be(t, n) {
        return void 0 === n && (n = 0),
        "string" != typeof t || 0 === n || t.length <= n ? t : t.substr(0, n) + "..."
    }
    function we(t, n) {
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
    function Xe(t, n) {
        return !!Qn(t) && (e = n,
        "[object RegExp]" === Object.prototype.toString.call(e) ? n.test(t) : "string" == typeof n && -1 !== t.indexOf(n));
        var e
    }
    function xe(t, n, e) {
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
    function ke(t) {
        if (Jn(t)) {
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
        if (te(t)) {
            var r = t
              , o = {};
            o.type = r.type;
            try {
                o.target = ne(r.target) ? re(r.target) : Object.prototype.toString.call(r.target)
            } catch (t) {
                o.target = "<unknown>"
            }
            try {
                o.currentTarget = ne(r.currentTarget) ? re(r.currentTarget) : Object.prototype.toString.call(r.currentTarget)
            } catch (t) {
                o.currentTarget = "<unknown>"
            }
            for (var s in "undefined" != typeof CustomEvent && ie(t, CustomEvent) && (o.detail = r.detail),
            r)
                Object.prototype.hasOwnProperty.call(r, s) && (o[s] = r[s]);
            return o
        }
        return t
    }
    function Ee(t) {
        return function(t) {
            return ~-encodeURI(t).split(/%..|./).length
        }(JSON.stringify(t))
    }
    function Te(t, n, e) {
        void 0 === n && (n = 3),
        void 0 === e && (e = 102400);
        var i = Ce(t, n);
        return Ee(i) > e ? Te(t, n - 1, e) : i
    }
    function Se(t, n) {
        return "domain" === n && t && "object" == typeof t && t._events ? "[Domain]" : "domainEmitter" === n ? "[DomainEmitter]" : "undefined" != typeof global && t === global ? "[Global]" : "undefined" != typeof window && t === window ? "[Window]" : "undefined" != typeof document && t === document ? "[Document]" : Zn(e = t) && "nativeEvent"in e && "preventDefault"in e && "stopPropagation"in e ? "[SyntheticEvent]" : "number" == typeof t && t != t ? "[NaN]" : void 0 === t ? "[undefined]" : "function" == typeof t ? "[Function: " + ye(t) + "]" : "symbol" == typeof t ? "[" + String(t) + "]" : "bigint" == typeof t ? "[BigInt: " + String(t) + "]" : t;
        var e
    }
    function je(t, n, e, i) {
        if (void 0 === e && (e = 1 / 0),
        void 0 === i && (i = new me),
        0 === e)
            return function(t) {
                var n = Object.prototype.toString.call(t);
                if ("string" == typeof t)
                    return t;
                if ("[object Object]" === n)
                    return "[Object]";
                if ("[object Array]" === n)
                    return "[Array]";
                var e = Se(t);
                return Yn(e) ? e : n
            }(n);
        if (null != n && "function" == typeof n.toJSON)
            return n.toJSON();
        var r = Se(n, t);
        if (Yn(r))
            return r;
        var o = ke(n)
          , s = Array.isArray(n) ? [] : {};
        if (i.memoize(n))
            return "[Circular ~]";
        for (var u in o)
            Object.prototype.hasOwnProperty.call(o, u) && (s[u] = je(u, o[u], e - 1, i));
        return i.unmemoize(n),
        s
    }
    function Ce(t, n) {
        try {
            return JSON.parse(JSON.stringify(t, (function(t, e) {
                return je(t, e, n)
            }
            )))
        } catch (t) {
            return "**non-serializable**"
        }
    }
    function Ae(t, n) {
        void 0 === n && (n = 40);
        var e = Object.keys(ke(t));
        if (e.sort(),
        !e.length)
            return "[object has no keys]";
        if (e[0].length >= n)
            return be(e[0], n);
        for (var i = e.length; i > 0; i--) {
            var r = e.slice(0, i).join(", ");
            if (!(r.length > n))
                return i === e.length ? r : be(r, n)
        }
        return ""
    }
    function Oe(t) {
        var n, e;
        if (Zn(t)) {
            var i = t
              , r = {};
            try {
                for (var o = Rn(Object.keys(i)), s = o.next(); !s.done; s = o.next()) {
                    var u = s.value;
                    void 0 !== i[u] && (r[u] = Oe(i[u]))
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
        return Array.isArray(t) ? t.map(Oe) : t
    }
    function _e() {
        if (!("fetch"in Hn()))
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
    function Be(t) {
        return t && /^function fetch\(\)\s+\{\s+\[native code\]\s+\}$/.test(t.toString())
    }
    function De() {
        if (!_e())
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
    var qe, Ie = Hn(), Me = {}, Fe = {};
    function Ne(t) {
        if (!Fe[t])
            switch (Fe[t] = !0,
            t) {
            case "console":
                !function() {
                    if (!("console"in Ie))
                        return;
                    ["debug", "info", "warn", "error", "log", "assert"].forEach((function(t) {
                        t in Ie.console && xe(Ie.console, t, (function(n) {
                            return function() {
                                for (var e = [], i = 0; i < arguments.length; i++)
                                    e[i] = arguments[i];
                                Re("console", {
                                    args: e,
                                    level: t
                                }),
                                n && Function.prototype.apply.call(n, Ie.console, e)
                            }
                        }
                        ))
                    }
                    ))
                }();
                break;
            case "dom":
                !function() {
                    if (!("document"in Ie))
                        return;
                    var t = Re.bind(null, "dom")
                      , n = ze(t, !0);
                    Ie.document.addEventListener("click", n, !1),
                    Ie.document.addEventListener("keypress", n, !1),
                    ["EventTarget", "Node"].forEach((function(n) {
                        var e = Ie[n] && Ie[n].prototype;
                        e && e.hasOwnProperty && e.hasOwnProperty("addEventListener") && (xe(e, "addEventListener", (function(n) {
                            return function(e, i, r) {
                                if ("click" === e || "keypress" == e)
                                    try {
                                        var o = this
                                          , s = o.X = o.X || {}
                                          , u = s[e] = s[e] || {
                                            refCount: 0
                                        };
                                        if (!u.handler) {
                                            var c = ze(t);
                                            u.handler = c,
                                            n.call(this, e, c, r)
                                        }
                                        u.refCount += 1
                                    } catch (t) {}
                                return n.call(this, e, i, r)
                            }
                        }
                        )),
                        xe(e, "removeEventListener", (function(t) {
                            return function(n, e, i) {
                                if ("click" === n || "keypress" == n)
                                    try {
                                        var r = this
                                          , o = r.X || {}
                                          , s = o[n];
                                        s && (s.refCount -= 1,
                                        s.refCount <= 0 && (t.call(this, n, s.handler, i),
                                        s.handler = void 0,
                                        delete o[n]),
                                        0 === Object.keys(o).length && delete r.X)
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
                    if (!("XMLHttpRequest"in Ie))
                        return;
                    var t = []
                      , n = []
                      , e = XMLHttpRequest.prototype;
                    xe(e, "open", (function(e) {
                        return function() {
                            for (var i = [], r = 0; r < arguments.length; r++)
                                i[r] = arguments[r];
                            var o = this
                              , s = i[1];
                            o.k = {
                                method: Qn(i[0]) ? i[0].toUpperCase() : i[0],
                                url: i[1]
                            },
                            Qn(s) && "POST" === o.k.method && s.match(/sentry_key/) && (o.T = !0);
                            var u = function() {
                                if (4 === o.readyState) {
                                    try {
                                        o.k && (o.k.status_code = o.status)
                                    } catch (t) {}
                                    try {
                                        var e = t.indexOf(o);
                                        if (-1 !== e) {
                                            t.splice(e);
                                            var r = n.splice(e)[0];
                                            o.k && void 0 !== r[0] && (o.k.body = r[0])
                                        }
                                    } catch (t) {}
                                    Re("xhr", {
                                        args: i,
                                        endTimestamp: Date.now(),
                                        startTimestamp: Date.now(),
                                        xhr: o
                                    })
                                }
                            };
                            return "onreadystatechange"in o && "function" == typeof o.onreadystatechange ? xe(o, "onreadystatechange", (function(t) {
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
                    xe(e, "send", (function(e) {
                        return function() {
                            for (var i = [], r = 0; r < arguments.length; r++)
                                i[r] = arguments[r];
                            return t.push(this),
                            n.push(i),
                            Re("xhr", {
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
                        if (!_e())
                            return !1;
                        var t = Hn();
                        if (Be(t.fetch))
                            return !0;
                        var n = !1
                          , e = t.document;
                        if (e && "function" == typeof e.createElement)
                            try {
                                var i = e.createElement("iframe");
                                i.hidden = !0,
                                e.head.appendChild(i),
                                i.contentWindow && i.contentWindow.fetch && (n = Be(i.contentWindow.fetch)),
                                e.head.removeChild(i)
                            } catch (t) {
                                pe.warn("Could not create sandbox iframe for pure fetch check, bailing to window.fetch: ", t)
                            }
                        return n
                    }())
                        return;
                    xe(Ie, "fetch", (function(t) {
                        return function() {
                            for (var n = [], e = 0; e < arguments.length; e++)
                                n[e] = arguments[e];
                            var i = {
                                args: n,
                                fetchData: {
                                    method: Ge(n),
                                    url: Pe(n)
                                },
                                startTimestamp: Date.now()
                            };
                            return Re("fetch", Nn({}, i)),
                            t.apply(Ie, n).then((function(t) {
                                return Re("fetch", Nn(Nn({}, i), {
                                    endTimestamp: Date.now(),
                                    response: t
                                })),
                                t
                            }
                            ), (function(t) {
                                throw Re("fetch", Nn(Nn({}, i), {
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
                        var t = Hn()
                          , n = t.chrome
                          , e = n && n.app && n.app.runtime
                          , i = "history"in t && !!t.history.pushState && !!t.history.replaceState;
                        return !e && i
                    }())
                        return;
                    var t = Ie.onpopstate;
                    function n(t) {
                        return function() {
                            for (var n = [], e = 0; e < arguments.length; e++)
                                n[e] = arguments[e];
                            var i = n.length > 2 ? n[2] : void 0;
                            if (i) {
                                var r = qe
                                  , o = String(i);
                                qe = o,
                                Re("history", {
                                    from: r,
                                    to: o
                                })
                            }
                            return t.apply(this, n)
                        }
                    }
                    Ie.onpopstate = function() {
                        for (var n = [], e = 0; e < arguments.length; e++)
                            n[e] = arguments[e];
                        var i = Ie.location.href
                          , r = qe;
                        if (qe = i,
                        Re("history", {
                            from: r,
                            to: i
                        }),
                        t)
                            try {
                                return t.apply(this, n)
                            } catch (t) {}
                    }
                    ,
                    xe(Ie.history, "pushState", n),
                    xe(Ie.history, "replaceState", n)
                }();
                break;
            case "error":
                We = Ie.onerror,
                Ie.onerror = function(t, n, e, i, r) {
                    return Re("error", {
                        column: i,
                        error: r,
                        line: e,
                        msg: t,
                        url: n
                    }),
                    !!We && We.apply(this, arguments)
                }
                ;
                break;
            case "unhandledrejection":
                He = Ie.onunhandledrejection,
                Ie.onunhandledrejection = function(t) {
                    return Re("unhandledrejection", t),
                    !He || He.apply(this, arguments)
                }
                ;
                break;
            default:
                pe.warn("unknown instrumentation type:", t)
            }
    }
    function $e(t) {
        t && "string" == typeof t.type && "function" == typeof t.callback && (Me[t.type] = Me[t.type] || [],
        Me[t.type].push(t.callback),
        Ne(t.type))
    }
    function Re(t, n) {
        var e, i;
        if (t && Me[t])
            try {
                for (var r = Rn(Me[t] || []), o = r.next(); !o.done; o = r.next()) {
                    var s = o.value;
                    try {
                        s(n)
                    } catch (n) {
                        pe.error("Error while triggering instrumentation handler.\nType: " + t + "\nName: " + ye(s) + "\nError: " + n)
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
    function Ge(t) {
        return void 0 === t && (t = []),
        "Request"in Ie && ie(t[0], Request) && t[0].method ? String(t[0].method).toUpperCase() : t[1] && t[1].method ? String(t[1].method).toUpperCase() : "GET"
    }
    function Pe(t) {
        return void 0 === t && (t = []),
        "string" == typeof t[0] ? t[0] : "Request"in Ie && ie(t[0], Request) ? t[0].url : String(t[0])
    }
    var Ue, Le;
    function ze(t, n) {
        return void 0 === n && (n = !1),
        function(e) {
            if (e && Le !== e && !function(t) {
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
                (void 0 === Ue || function(t, n) {
                    if (!t)
                        return !0;
                    if (t.type !== n.type)
                        return !0;
                    try {
                        if (t.target !== n.target)
                            return !0
                    } catch (t) {}
                    return !1
                }(Le, e)) && (t({
                    event: e,
                    name: i,
                    global: n
                }),
                Le = e),
                clearTimeout(Ue),
                Ue = Ie.setTimeout((function() {
                    Ue = void 0
                }
                ), 1e3)
            }
        }
    }
    var We = null;
    var He = null;
    function Je() {
        var t = Hn()
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
    function Ve(t) {
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
    function Ke(t) {
        if (t.message)
            return t.message;
        if (t.exception && t.exception.values && t.exception.values[0]) {
            var n = t.exception.values[0];
            return n.type && n.value ? n.type + ": " + n.value : n.type || n.value || t.event_id || "<unknown>"
        }
        return t.event_id || "<unknown>"
    }
    function Qe(t, n, e) {
        t.exception = t.exception || {},
        t.exception.values = t.exception.values || [],
        t.exception.values[0] = t.exception.values[0] || {},
        t.exception.values[0].value = t.exception.values[0].value || n || "",
        t.exception.values[0].type = t.exception.values[0].type || e || "Error"
    }
    function Ye(t, n) {
        var e;
        if (t.exception && t.exception.values) {
            var i = t.exception.values[0]
              , r = i.mechanism;
            if (i.mechanism = Nn(Nn(Nn({}, {
                type: "generic",
                handled: !0
            }), r), n),
            n && "data"in n) {
                var o = Nn(Nn({}, null === (e = r) || void 0 === e ? void 0 : e.data), n.data);
                i.mechanism.data = o
            }
        }
    }
    var Ze;
    function ti(t) {
        var n;
        if (null === (n = t) || void 0 === n ? void 0 : n.S)
            return !0;
        try {
            Object.defineProperty(t, "S", {
                value: !0
            })
        } catch (t) {}
        return !1
    }
    !function(t) {
        t.PENDING = "PENDING",
        t.RESOLVED = "RESOLVED",
        t.REJECTED = "REJECTED"
    }(Ze || (Ze = {}));
    var ni = function() {
        function t(t) {
            var n = this;
            this._state = Ze.PENDING,
            this._handlers = [],
            this._resolve = function(t) {
                n._setResult(Ze.RESOLVED, t)
            }
            ,
            this._reject = function(t) {
                n._setResult(Ze.REJECTED, t)
            }
            ,
            this._setResult = function(t, e) {
                n._state === Ze.PENDING && (ee(e) ? e.then(n._resolve, n._reject) : (n._state = t,
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
                if (n._state !== Ze.PENDING) {
                    var t = n._handlers.slice();
                    n._handlers = [],
                    t.forEach((function(t) {
                        t.done || (n._state === Ze.RESOLVED && t.onfulfilled && t.onfulfilled(n._value),
                        n._state === Ze.REJECTED && t.onrejected && t.onrejected(n._value),
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
      , ei = function() {
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
                return ni.reject(new ue("Not adding Promise due to buffer limit reached."));
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
            return new ni((function(e) {
                var i = setTimeout((function() {
                    t && t > 0 && e(!1)
                }
                ), t);
                ni.all(n._buffer).then((function() {
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
      , ii = {
        nowSeconds: function() {
            return Date.now() / 1e3
        }
    };
    var ri = Un() ? function() {
        try {
            return Ln(module, "perf_hooks").performance
        } catch (t) {
            return
        }
    }() : function() {
        var t = Hn().performance;
        if (t && t.now)
            return {
                now: function() {
                    return t.now()
                },
                timeOrigin: Date.now() - t.now()
            }
    }()
      , oi = void 0 === ri ? ii : {
        nowSeconds: function() {
            return (ri.timeOrigin + ri.now()) / 1e3
        }
    }
      , si = ii.nowSeconds.bind(ii)
      , ui = oi.nowSeconds.bind(oi)
      , ci = ui
      , ai = function() {
        var t = Hn().performance;
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
      , li = function() {
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
            return n && (e._breadcrumbs = Pn(n._breadcrumbs),
            e._tags = Nn({}, n._tags),
            e._extra = Nn({}, n._extra),
            e._contexts = Nn({}, n._contexts),
            e._user = n._user,
            e._level = n._level,
            e._span = n._span,
            e._session = n._session,
            e._transactionName = n._transactionName,
            e._fingerprint = n._fingerprint,
            e._eventProcessors = Pn(n._eventProcessors),
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
            return this._tags = Nn(Nn({}, this._tags), t),
            this._notifyScopeListeners(),
            this
        }
        ,
        t.prototype.setTag = function(t, n) {
            var e;
            return this._tags = Nn(Nn({}, this._tags), ((e = {})[t] = n,
            e)),
            this._notifyScopeListeners(),
            this
        }
        ,
        t.prototype.setExtras = function(t) {
            return this._extra = Nn(Nn({}, this._extra), t),
            this._notifyScopeListeners(),
            this
        }
        ,
        t.prototype.setExtra = function(t, n) {
            var e;
            return this._extra = Nn(Nn({}, this._extra), ((e = {})[t] = n,
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
            return null === n ? delete this._contexts[t] : this._contexts = Nn(Nn({}, this._contexts), ((e = {})[t] = n,
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
            return n instanceof t ? (this._tags = Nn(Nn({}, this._tags), n._tags),
            this._extra = Nn(Nn({}, this._extra), n._extra),
            this._contexts = Nn(Nn({}, this._contexts), n._contexts),
            n._user && Object.keys(n._user).length && (this._user = n._user),
            n._level && (this._level = n._level),
            n._fingerprint && (this._fingerprint = n._fingerprint),
            n._requestSession && (this._requestSession = n._requestSession)) : Zn(n) && (n = n,
            this._tags = Nn(Nn({}, this._tags), n.tags),
            this._extra = Nn(Nn({}, this._extra), n.extra),
            this._contexts = Nn(Nn({}, this._contexts), n.contexts),
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
            var i = Nn({
                timestamp: si()
            }, t);
            return this._breadcrumbs = Pn(this._breadcrumbs, [i]).slice(-e),
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
            if (this._extra && Object.keys(this._extra).length && (t.extra = Nn(Nn({}, this._extra), t.extra)),
            this._tags && Object.keys(this._tags).length && (t.tags = Nn(Nn({}, this._tags), t.tags)),
            this._user && Object.keys(this._user).length && (t.user = Nn(Nn({}, this._user), t.user)),
            this._contexts && Object.keys(this._contexts).length && (t.contexts = Nn(Nn({}, this._contexts), t.contexts)),
            this._level && (t.level = this._level),
            this._transactionName && (t.transaction = this._transactionName),
            this._span) {
                t.contexts = Nn({
                    trace: this._span.getTraceContext()
                }, t.contexts);
                var i = null === (e = this._span.transaction) || void 0 === e ? void 0 : e.name;
                i && (t.tags = Nn({
                    transaction: i
                }, t.tags))
            }
            return this._applyFingerprint(t),
            t.breadcrumbs = Pn(t.breadcrumbs || [], this._breadcrumbs),
            t.breadcrumbs = t.breadcrumbs.length > 0 ? t.breadcrumbs : void 0,
            this._notifyEventProcessors(Pn(fi(), this._eventProcessors), t, n)
        }
        ,
        t.prototype._notifyEventProcessors = function(t, n, e, i) {
            var r = this;
            return void 0 === i && (i = 0),
            new ni((function(o, s) {
                var u = t[i];
                if (null === n || "function" != typeof u)
                    o(n);
                else {
                    var c = u(Nn({}, n), e);
                    ee(c) ? c.then((function(n) {
                        return r._notifyEventProcessors(t, n, e, i + 1).then(o)
                    }
                    )).then(null, s) : r._notifyEventProcessors(t, c, e, i + 1).then(o).then(null, s)
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
    function fi() {
        var t = Hn();
        return t.g = t.g || {},
        t.g.globalEventProcessors = t.g.globalEventProcessors || [],
        t.g.globalEventProcessors
    }
    function hi(t) {
        fi().push(t)
    }
    var di = function() {
        function t(t) {
            this.errors = 0,
            this.sid = Je(),
            this.duration = 0,
            this.status = Bn.Ok,
            this.init = !0,
            this.ignoreDuration = !1;
            var n = ui();
            this.timestamp = n,
            this.started = n,
            t && this.update(t)
        }
        return t.prototype.update = function(t) {
            if (void 0 === t && (t = {}),
            t.user && (!this.ipAddress && t.user.ip_address && (this.ipAddress = t.user.ip_address),
            this.did || t.did || (this.did = t.user.id || t.user.email || t.user.username)),
            this.timestamp = t.timestamp || ui(),
            t.ignoreDuration && (this.ignoreDuration = t.ignoreDuration),
            t.sid && (this.sid = 32 === t.sid.length ? t.sid : Je()),
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
            }) : this.status === Bn.Ok ? this.update({
                status: Bn.Exited
            }) : this.update()
        }
        ,
        t.prototype.toJSON = function() {
            return Oe({
                sid: "" + this.sid,
                init: this.init,
                started: new Date(1e3 * this.started).toISOString(),
                timestamp: new Date(1e3 * this.timestamp).toISOString(),
                status: this.status,
                errors: this.errors,
                did: "number" == typeof this.did || "string" == typeof this.did ? "" + this.did : void 0,
                duration: this.duration,
                attrs: Oe({
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
      , vi = function() {
        function t(t, n, e) {
            void 0 === n && (n = new li),
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
            var t = li.clone(this.getScope());
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
            var e = this._lastEventId = Je()
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
            return this._invokeClient("captureException", t, Nn(Nn({}, i), {
                event_id: e
            })),
            e
        }
        ,
        t.prototype.captureMessage = function(t, n, e) {
            var i = this._lastEventId = Je()
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
            return this._invokeClient("captureMessage", t, n, Nn(Nn({}, r), {
                event_id: i
            })),
            i
        }
        ,
        t.prototype.captureEvent = function(t, n) {
            var e = Je();
            return "transaction" !== t.type && (this._lastEventId = e),
            this._invokeClient("captureEvent", t, Nn(Nn({}, n), {
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
                  , c = o.maxBreadcrumbs
                  , a = void 0 === c ? 100 : c;
                if (!(a <= 0)) {
                    var l = si()
                      , f = Nn({
                        timestamp: l
                    }, t)
                      , h = u ? de((function() {
                        return u(f, n)
                    }
                    )) : f;
                    null !== h && i.addBreadcrumb(h, a)
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
            var n = mi(this);
            try {
                t(this)
            } finally {
                mi(n)
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
                return pe.warn("Cannot retrieve integration " + t.id + " from the current Hub"),
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
              , u = (Hn().navigator || {}).userAgent
              , c = new di(Nn(Nn(Nn({
                release: o,
                environment: s
            }, e && {
                user: e.getUser()
            }), u && {
                userAgent: u
            }), t));
            if (e) {
                var a = e.getSession && e.getSession();
                a && a.status === Bn.Ok && a.update({
                    status: Bn.Exited
                }),
                this.endSession(),
                e.setSession(c)
            }
            return c
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
            s && s[t] && (n = s)[t].apply(n, Pn(e, [o]))
        }
        ,
        t.prototype._callExtensionMethod = function(t) {
            for (var n = [], e = 1; e < arguments.length; e++)
                n[e - 1] = arguments[e];
            var i = pi()
              , r = i.g;
            if (r && r.extensions && "function" == typeof r.extensions[t])
                return r.extensions[t].apply(this, n);
            pe.warn("Extension method " + t + " couldn't be found, doing nothing.")
        }
        ,
        t
    }();
    function pi() {
        var t = Hn();
        return t.g = t.g || {
            extensions: {},
            hub: void 0
        },
        t
    }
    function mi(t) {
        var n = pi()
          , e = bi(n);
        return wi(n, t),
        e
    }
    function gi() {
        var t = pi();
        return yi(t) && !bi(t).isOlderThan(4) || wi(t, new vi),
        Un() ? function(t) {
            var n, e, i;
            try {
                var r = null === (i = null === (e = null === (n = pi().g) || void 0 === n ? void 0 : n.extensions) || void 0 === e ? void 0 : e.domain) || void 0 === i ? void 0 : i.active;
                if (!r)
                    return bi(t);
                if (!yi(r) || bi(r).isOlderThan(4)) {
                    var o = bi(t).getStackTop();
                    wi(r, new vi(o.client,li.clone(o.scope)))
                }
                return bi(r)
            } catch (n) {
                return bi(t)
            }
        }(t) : bi(t)
    }
    function yi(t) {
        return !!(t && t.g && t.g.hub)
    }
    function bi(t) {
        return t && t.g && t.g.hub || (t.g = t.g || {},
        t.g.hub = new vi),
        t.g.hub
    }
    function wi(t, n) {
        return !!t && (t.g = t.g || {},
        t.g.hub = n,
        !0)
    }
    function Xi(t) {
        for (var n = [], e = 1; e < arguments.length; e++)
            n[e - 1] = arguments[e];
        var i = gi();
        if (i && i[t])
            return i[t].apply(i, Pn(n));
        throw new Error("No hub defined or " + t + " was not found on the hub, please open a bug report.")
    }
    function xi(t, n) {
        var e;
        try {
            throw new Error("Sentry syntheticException")
        } catch (t) {
            e = t
        }
        return Xi("captureException", t, {
            captureContext: n,
            originalException: t,
            syntheticException: e
        })
    }
    function ki(t) {
        Xi("withScope", t)
    }
    var Ei = function() {
        function t(t, n, e) {
            void 0 === n && (n = {}),
            this.dsn = t,
            this._dsnObject = new le(t),
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
      , Ti = [];
    function Si(t) {
        return t.reduce((function(t, n) {
            return t.every((function(t) {
                return n.name !== t.name
            }
            )) && t.push(n),
            t
        }
        ), [])
    }
    function ji(t) {
        var n = {};
        return function(t) {
            var n = t.defaultIntegrations && Pn(t.defaultIntegrations) || []
              , e = t.integrations
              , i = Pn(Si(n));
            Array.isArray(e) ? i = Pn(i.filter((function(t) {
                return e.every((function(n) {
                    return n.name !== t.name
                }
                ))
            }
            )), Si(e)) : "function" == typeof e && (i = e(i),
            i = Array.isArray(i) ? i : [i]);
            var r = i.map((function(t) {
                return t.name
            }
            ))
              , o = "Debug";
            return -1 !== r.indexOf(o) && i.push.apply(i, Pn(i.splice(r.indexOf(o), 1))),
            i
        }(t).forEach((function(t) {
            n[t.name] = t,
            function(t) {
                -1 === Ti.indexOf(t.name) && (t.setupOnce(hi, gi),
                Ti.push(t.name),
                pe.log("Integration installed: " + t.name))
            }(t)
        }
        )),
        Object.defineProperty(n, "initialized", {
            value: !0
        }),
        n
    }
    var Ci = "Not capturing exception because it's already been captured."
      , Ai = function() {
        function t(t, n) {
            this._integrations = {},
            this._numProcessing = 0,
            this._backend = new t(n),
            this._options = n,
            n.dsn && (this._dsn = new le(n.dsn))
        }
        return t.prototype.captureException = function(t, n, e) {
            var i = this;
            if (!ti(t)) {
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
            pe.log(Ci)
        }
        ,
        t.prototype.captureMessage = function(t, n, e, i) {
            var r = this
              , o = e && e.event_id
              , s = Yn(t) ? this._getBackend().eventFromMessage(String(t), n, e) : this._getBackend().eventFromException(t, e);
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
            if (!(null === (i = n) || void 0 === i ? void 0 : i.originalException) || !ti(n.originalException)) {
                var r = n && n.event_id;
                return this._process(this._captureEvent(t, n, e).then((function(t) {
                    r = t
                }
                ))),
                r
            }
            pe.log(Ci)
        }
        ,
        t.prototype.captureSession = function(t) {
            this._isEnabled() ? "string" != typeof t.release ? pe.warn("Discarded session because of missing or non-string release") : (this._sendSession(t),
            t.update({
                init: !1
            })) : pe.warn("SDK not enabled, will not capture session.")
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
            this._isEnabled() && !this._integrations.initialized && (this._integrations = ji(this._options))
        }
        ,
        t.prototype.getIntegration = function(t) {
            try {
                return this._integrations[t.id] || null
            } catch (n) {
                return pe.warn("Cannot retrieve integration " + t.id + " from the current Client"),
                null
            }
        }
        ,
        t.prototype._updateSessionFromEvent = function(t, n) {
            var e, i, r = !1, o = !1, s = n.exception && n.exception.values;
            if (s) {
                o = !0;
                try {
                    for (var u = Rn(s), c = u.next(); !c.done; c = u.next()) {
                        var a = c.value.mechanism;
                        if (a && !1 === a.handled) {
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
                        c && !c.done && (i = u.return) && i.call(u)
                    } finally {
                        if (e)
                            throw e.error
                    }
                }
            }
            var l = t.status === Bn.Ok;
            (l && 0 === t.errors || l && r) && (t.update(Nn(Nn({}, r && {
                status: Bn.Crashed
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
            return new ni((function(e) {
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
              , s = Nn(Nn({}, t), {
                event_id: t.event_id || (e && e.event_id ? e.event_id : Je()),
                timestamp: t.timestamp || si()
            });
            this._applyClientOptions(s),
            this._applyIntegrationsMetadata(s);
            var u = n;
            e && e.captureContext && (u = li.clone(u).update(e.captureContext));
            var c = ni.resolve(s);
            return u && (c = u.applyToEvent(s, e)),
            c.then((function(t) {
                return "number" == typeof o && o > 0 ? i._normalizeEvent(t, o) : t
            }
            ))
        }
        ,
        t.prototype._normalizeEvent = function(t, n) {
            if (!t)
                return null;
            var e = Nn(Nn(Nn(Nn(Nn({}, t), t.breadcrumbs && {
                breadcrumbs: t.breadcrumbs.map((function(t) {
                    return Nn(Nn({}, t), t.data && {
                        data: Ce(t.data, n)
                    })
                }
                ))
            }), t.user && {
                user: Ce(t.user, n)
            }), t.contexts && {
                contexts: Ce(t.contexts, n)
            }), t.extra && {
                extra: Ce(t.extra, n)
            });
            t.contexts && t.contexts.trace && (e.contexts.trace = t.contexts.trace);
            var i = this.getOptions()._experiments;
            return (void 0 === i ? {} : i).ensureNoCircularStructures ? Ce(e) : e
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
            t.message && (t.message = be(t.message, s));
            var u = t.exception && t.exception.values && t.exception.values[0];
            u && u.value && (u.value = be(u.value, s));
            var c = t.request;
            c && c.url && (c.url = be(c.url, s))
        }
        ,
        t.prototype._applyIntegrationsMetadata = function(t) {
            var n = Object.keys(this._integrations);
            n.length > 0 && (t.sdk = t.sdk || {},
            t.sdk.integrations = Pn(t.sdk.integrations || [], n))
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
                pe.error(t)
            }
            ))
        }
        ,
        t.prototype._processEvent = function(t, n, e) {
            var i, r, o = this, s = this.getOptions(), u = s.beforeSend, c = s.sampleRate, a = this.getTransport();
            if (!this._isEnabled())
                return ni.reject(new ue("SDK not enabled, will not capture event."));
            var l = "transaction" === t.type;
            return !l && "number" == typeof c && Math.random() > c ? (null === (r = (i = a).recordLostEvent) || void 0 === r || r.call(i, Fn.SampleRate, "event"),
            ni.reject(new ue("Discarding event because it's not included in the random sample (sampling rate = " + c + ")"))) : this._prepareEvent(t, e, n).then((function(e) {
                var i, r;
                if (null === e)
                    throw null === (r = (i = a).recordLostEvent) || void 0 === r || r.call(i, Fn.EventProcessor, t.type || "event"),
                    new ue("An event processor returned null, will not send event.");
                if (n && n.data && !0 === n.data.j || l || !u)
                    return e;
                var s = u(e, n);
                return o._ensureBeforeSendRv(s)
            }
            )).then((function(n) {
                var i, r;
                if (null === n)
                    throw null === (r = (i = a).recordLostEvent) || void 0 === r || r.call(i, Fn.BeforeSend, t.type || "event"),
                    new ue("`beforeSend` returned `null`, will not send event.");
                var s = e && e.getSession && e.getSession();
                return !l && s && o._updateSessionFromEvent(s, n),
                o._sendEvent(n),
                n
            }
            )).then(null, (function(t) {
                if (t instanceof ue)
                    throw t;
                throw o.captureException(t, {
                    data: {
                        j: !0
                    },
                    originalException: t
                }),
                new ue("Event processing pipeline threw an error, original event will not be sent. Details have been sent as a new event.\nReason: " + t)
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
            if (ee(t))
                return t.then((function(t) {
                    if (!Zn(t) && null !== t)
                        throw new ue(n);
                    return t
                }
                ), (function(t) {
                    throw new ue("beforeSend rejected with " + t)
                }
                ));
            if (!Zn(t) && null !== t)
                throw new ue(n);
            return t
        }
        ,
        t
    }()
      , Oi = function() {
        function t() {}
        return t.prototype.sendEvent = function(t) {
            return ni.resolve({
                reason: "NoopTransport: Event has been skipped because no Dsn is configured.",
                status: In.Skipped
            })
        }
        ,
        t.prototype.close = function(t) {
            return ni.resolve(!0)
        }
        ,
        t
    }()
      , _i = function() {
        function t(t) {
            this._options = t,
            this._options.dsn || pe.warn("No DSN provided, backend will not do anything."),
            this._transport = this._setupTransport()
        }
        return t.prototype.eventFromException = function(t, n) {
            throw new ue("Backend has to implement `eventFromException` method")
        }
        ,
        t.prototype.eventFromMessage = function(t, n, e) {
            throw new ue("Backend has to implement `eventFromMessage` method")
        }
        ,
        t.prototype.sendEvent = function(t) {
            this._transport.sendEvent(t).then(null, (function(t) {
                pe.error("Error while sending event: " + t)
            }
            ))
        }
        ,
        t.prototype.sendSession = function(t) {
            this._transport.sendSession ? this._transport.sendSession(t).then(null, (function(t) {
                pe.error("Error while sending session: " + t)
            }
            )) : pe.warn("Dropping session because custom transport doesn't implement sendSession")
        }
        ,
        t.prototype.getTransport = function() {
            return this._transport
        }
        ,
        t.prototype._setupTransport = function() {
            return new Oi
        }
        ,
        t
    }();
    function Bi(t) {
        if (t.metadata && t.metadata.sdk) {
            var n = t.metadata.sdk;
            return {
                name: n.name,
                version: n.version
            }
        }
    }
    function Di(t, n) {
        return n ? (t.sdk = t.sdk || {},
        t.sdk.name = t.sdk.name || n.name,
        t.sdk.version = t.sdk.version || n.version,
        t.sdk.integrations = Pn(t.sdk.integrations || [], n.integrations || []),
        t.sdk.packages = Pn(t.sdk.packages || [], n.packages || []),
        t) : t
    }
    function qi(t, n) {
        var e = Bi(n)
          , i = "aggregates"in t ? "sessions" : "session";
        return {
            body: JSON.stringify(Nn(Nn({
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
    function Ii(t, n) {
        var e = Bi(n)
          , i = t.type || "event"
          , r = "transaction" === i || n.forceEnvelope()
          , o = t.debug_meta || {}
          , s = o.transactionSampling
          , u = $n(o, ["transactionSampling"])
          , c = s || {}
          , a = c.method
          , l = c.rate;
        0 === Object.keys(u).length ? delete t.debug_meta : t.debug_meta = u;
        var f = {
            body: JSON.stringify(e ? Di(t, n.metadata.sdk) : t),
            type: i,
            url: r ? n.getEnvelopeEndpointWithUrlEncodedAuth() : n.getStoreEndpointWithUrlEncodedAuth()
        };
        if (r) {
            var h = JSON.stringify(Nn(Nn({
                event_id: t.event_id,
                sent_at: (new Date).toISOString()
            }, e && {
                sdk: e
            }), n.forceEnvelope() && {
                dsn: n.getDsn().toString()
            })) + "\n" + JSON.stringify({
                type: i,
                sample_rates: [{
                    id: a,
                    rate: l
                }]
            }) + "\n" + f.body;
            f.body = h
        }
        return f
    }
    var Mi, Fi = "6.14.1", Ni = function() {
        function t() {
            this.name = t.id
        }
        return t.prototype.setupOnce = function() {
            Mi = Function.prototype.toString,
            Function.prototype.toString = function() {
                for (var t = [], n = 0; n < arguments.length; n++)
                    t[n] = arguments[n];
                var e = this.u || this;
                return Mi.apply(e, t)
            }
        }
        ,
        t.id = "FunctionToString",
        t
    }(), $i = [/^Script error\.?$/, /^Javascript error: Script error\.? on line 0$/], Ri = function() {
        function t(n) {
            void 0 === n && (n = {}),
            this._options = n,
            this.name = t.id
        }
        return t.prototype.setupOnce = function() {
            hi((function(n) {
                var e = gi();
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
            return this._isSentryError(t, n) ? (pe.warn("Event dropped due to being internal Sentry Error.\nEvent: " + Ke(t)),
            !0) : this._isIgnoredError(t, n) ? (pe.warn("Event dropped due to being matched by `ignoreErrors` option.\nEvent: " + Ke(t)),
            !0) : this._isDeniedUrl(t, n) ? (pe.warn("Event dropped due to being matched by `denyUrls` option.\nEvent: " + Ke(t) + ".\nUrl: " + this._getEventFilterUrl(t)),
            !0) : !this._isAllowedUrl(t, n) && (pe.warn("Event dropped due to not being matched by `allowUrls` option.\nEvent: " + Ke(t) + ".\nUrl: " + this._getEventFilterUrl(t)),
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
                    return Xe(t, n)
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
                return Xe(e, t)
            }
            ))
        }
        ,
        t.prototype._isAllowedUrl = function(t, n) {
            if (!n.allowUrls || !n.allowUrls.length)
                return !0;
            var e = this._getEventFilterUrl(t);
            return !e || n.allowUrls.some((function(t) {
                return Xe(e, t)
            }
            ))
        }
        ,
        t.prototype._mergeOptions = function(t) {
            return void 0 === t && (t = {}),
            {
                allowUrls: Pn(this._options.whitelistUrls || [], this._options.allowUrls || [], t.whitelistUrls || [], t.allowUrls || []),
                denyUrls: Pn(this._options.blacklistUrls || [], this._options.denyUrls || [], t.blacklistUrls || [], t.denyUrls || []),
                ignoreErrors: Pn(this._options.ignoreErrors || [], t.ignoreErrors || [], $i),
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
                    return pe.error("Cannot extract message for event " + Ke(t)),
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
                return pe.error("Cannot extract url for event " + Ke(t)),
                null
            }
        }
        ,
        t.id = "InboundFilters",
        t
    }(), Gi = "?", Pi = /^\s*at (?:(.*?) ?\()?((?:file|https?|blob|chrome-extension|address|native|eval|webpack|<anonymous>|[-a-z]+:|.*bundle|\/).*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i, Ui = /^\s*(.*?)(?:\((.*?)\))?(?:^|@)?((?:file|https?|blob|chrome|webpack|resource|moz-extension|capacitor).*?:\/.*?|\[native code\]|[^@]*(?:bundle|\d+\.js)|\/[\w\-. /=]+)(?::(\d+))?(?::(\d+))?\s*$/i, Li = /^\s*at (?:((?:\[object object\])?.+) )?\(?((?:file|ms-appx|https?|webpack|blob):.*?):(\d+)(?::(\d+))?\)?\s*$/i, zi = /(\S+) line (\d+)(?: > eval line \d+)* > eval/i, Wi = /\((\S*)(?::(\d+))(?::(\d+))\)/, Hi = /Minified React error #\d+;/i;
    function Ji(t) {
        var n = null
          , e = 0;
        t && ("number" == typeof t.framesToPop ? e = t.framesToPop : Hi.test(t.message) && (e = 1));
        try {
            if (n = function(t) {
                if (!t || !t.stacktrace)
                    return null;
                for (var n, e = t.stacktrace, i = / line (\d+).*script (?:in )?(\S+)(?:: in function (\S+))?$/i, r = / line (\d+), column (\d+)\s*(?:in (?:<anonymous function: ([^>]+)>|([^)]+))\((.*)\))? in (.*):\s*$/i, o = e.split("\n"), s = [], u = 0; u < o.length; u += 2) {
                    var c = null;
                    (n = i.exec(o[u])) ? c = {
                        url: n[2],
                        func: n[3],
                        args: [],
                        line: +n[1],
                        column: null
                    } : (n = r.exec(o[u])) && (c = {
                        url: n[6],
                        func: n[3] || n[4],
                        args: n[5] ? n[5].split(",") : [],
                        line: +n[1],
                        column: +n[2]
                    }),
                    c && (!c.func && c.line && (c.func = Gi),
                    s.push(c))
                }
                if (!s.length)
                    return null;
                return {
                    message: Qi(t),
                    name: t.name,
                    stack: s
                }
            }(t))
                return Ki(n, e)
        } catch (t) {}
        try {
            if (n = function(t) {
                var n, e;
                if (!t || !t.stack)
                    return null;
                for (var i, r, o, s = [], u = t.stack.split("\n"), c = 0; c < u.length; ++c) {
                    if (r = Pi.exec(u[c])) {
                        var a = r[2] && 0 === r[2].indexOf("native");
                        r[2] && 0 === r[2].indexOf("eval") && (i = Wi.exec(r[2])) && (r[2] = i[1],
                        r[3] = i[2],
                        r[4] = i[3]);
                        var l = r[2] && 0 === r[2].indexOf("address at ") ? r[2].substr("address at ".length) : r[2]
                          , f = r[1] || Gi;
                        f = (n = Gn(Vi(f, l), 2))[0],
                        o = {
                            url: l = n[1],
                            func: f,
                            args: a ? [r[2]] : [],
                            line: r[3] ? +r[3] : null,
                            column: r[4] ? +r[4] : null
                        }
                    } else if (r = Li.exec(u[c]))
                        o = {
                            url: r[2],
                            func: r[1] || Gi,
                            args: [],
                            line: +r[3],
                            column: r[4] ? +r[4] : null
                        };
                    else {
                        if (!(r = Ui.exec(u[c])))
                            continue;
                        r[3] && r[3].indexOf(" > eval") > -1 && (i = zi.exec(r[3])) ? (r[1] = r[1] || "eval",
                        r[3] = i[1],
                        r[4] = i[2],
                        r[5] = "") : 0 !== c || r[5] || void 0 === t.columnNumber || (s[0].column = t.columnNumber + 1);
                        l = r[3],
                        f = r[1] || Gi;
                        f = (e = Gn(Vi(f, l), 2))[0],
                        o = {
                            url: l = e[1],
                            func: f,
                            args: r[2] ? r[2].split(",") : [],
                            line: r[4] ? +r[4] : null,
                            column: r[5] ? +r[5] : null
                        }
                    }
                    !o.func && o.line && (o.func = Gi),
                    s.push(o)
                }
                if (!s.length)
                    return null;
                return {
                    message: Qi(t),
                    name: t.name,
                    stack: s
                }
            }(t))
                return Ki(n, e)
        } catch (t) {}
        return {
            message: Qi(t),
            name: t && t.name,
            stack: [],
            failed: !0
        }
    }
    var Vi = function(t, n) {
        var e = -1 !== t.indexOf("safari-extension")
          , i = -1 !== t.indexOf("safari-web-extension");
        return e || i ? [-1 !== t.indexOf("@") ? t.split("@")[0] : Gi, e ? "safari-extension:" + n : "safari-web-extension:" + n] : [t, n]
    };
    function Ki(t, n) {
        try {
            return Nn(Nn({}, t), {
                stack: t.stack.slice(n)
            })
        } catch (n) {
            return t
        }
    }
    function Qi(t) {
        var n = t && t.message;
        return n ? n.error && "string" == typeof n.error.message ? n.error.message : n : "No error message"
    }
    function Yi(t) {
        var n = tr(t.stack)
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
    function Zi(t) {
        return {
            exception: {
                values: [Yi(t)]
            }
        }
    }
    function tr(t) {
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
    function nr(t, n, e) {
        var i, r;
        if (void 0 === e && (e = {}),
        Vn(t) && t.error)
            return i = Zi(Ji(t = t.error));
        if (Kn(t) || (r = t,
        "[object DOMException]" === Object.prototype.toString.call(r))) {
            var o = t
              , s = o.name || (Kn(o) ? "DOMError" : "DOMException")
              , u = o.message ? s + ": " + o.message : s;
            return Qe(i = er(u, n, e), u),
            "code"in o && (i.tags = Nn(Nn({}, i.tags), {
                "DOMException.code": "" + o.code
            })),
            i
        }
        return Jn(t) ? i = Zi(Ji(t)) : Zn(t) || te(t) ? (Ye(i = function(t, n, e) {
            var i = {
                exception: {
                    values: [{
                        type: te(t) ? t.constructor.name : e ? "UnhandledRejection" : "Error",
                        value: "Non-Error " + (e ? "promise rejection" : "exception") + " captured with keys: " + Ae(t)
                    }]
                },
                extra: {
                    C: Te(t)
                }
            };
            if (n) {
                var r = tr(Ji(n).stack);
                i.stacktrace = {
                    frames: r
                }
            }
            return i
        }(t, n, e.rejection), {
            synthetic: !0
        }),
        i) : (Qe(i = er(t, n, e), "" + t, void 0),
        Ye(i, {
            synthetic: !0
        }),
        i)
    }
    function er(t, n, e) {
        void 0 === e && (e = {});
        var i = {
            message: t
        };
        if (e.attachStacktrace && n) {
            var r = tr(Ji(n).stack);
            i.stacktrace = {
                frames: r
            }
        }
        return i
    }
    var ir, rr = Hn();
    function or() {
        var t, n;
        if (ir)
            return ir;
        if (Be(rr.fetch))
            return ir = rr.fetch.bind(rr);
        var e = rr.document
          , i = rr.fetch;
        if ("function" == typeof (null === (t = e) || void 0 === t ? void 0 : t.createElement))
            try {
                var r = e.createElement("iframe");
                r.hidden = !0,
                e.head.appendChild(r),
                (null === (n = r.contentWindow) || void 0 === n ? void 0 : n.fetch) && (i = r.contentWindow.fetch),
                e.head.removeChild(r)
            } catch (t) {
                pe.warn("Could not create sandbox iframe for pure fetch check, bailing to window.fetch: ", t)
            }
        return ir = i.bind(rr)
    }
    function sr(t, n) {
        if ("[object Navigator]" === Object.prototype.toString.call(rr && rr.navigator) && "function" == typeof rr.navigator.sendBeacon)
            return rr.navigator.sendBeacon.bind(rr.navigator)(t, n);
        if (_e()) {
            var e = or();
            e(t, {
                body: n,
                method: "POST",
                credentials: "omit",
                keepalive: !0
            }).then(null, (function(t) {
                console.error(t)
            }
            ))
        } else
            ;
    }
    var ur = {
        event: "error",
        transaction: "transaction",
        session: "session",
        attachment: "attachment"
    }
      , cr = Hn()
      , ar = function() {
        function t(t) {
            var n = this;
            this.options = t,
            this._buffer = new ei(30),
            this._rateLimits = {},
            this._outcomes = {},
            this._api = new Ei(t.dsn,t._metadata,t.tunnel),
            this.url = this._api.getStoreEndpointWithUrlEncodedAuth(),
            this.options.sendClientReports && cr.document && cr.document.addEventListener("visibilitychange", (function() {
                "hidden" === cr.document.visibilityState && n._flushOutcomes()
            }
            ))
        }
        return t.prototype.sendEvent = function(t) {
            throw new ue("Transport Class has to implement `sendEvent` method")
        }
        ,
        t.prototype.close = function(t) {
            return this._buffer.drain(t)
        }
        ,
        t.prototype.recordLostEvent = function(t, n) {
            var e;
            if (this.options.sendClientReports) {
                var i = ur[n] + ":" + t;
                pe.log("Adding outcome: " + i),
                this._outcomes[i] = (null != (e = this._outcomes[i]) ? e : 0) + 1
            }
        }
        ,
        t.prototype._flushOutcomes = function() {
            if (this.options.sendClientReports) {
                var t = this._outcomes;
                if (this._outcomes = {},
                Object.keys(t).length) {
                    pe.log("Flushing outcomes:\n" + JSON.stringify(t, null, 2));
                    var n = this._api.getEnvelopeEndpointWithUrlEncodedAuth()
                      , e = JSON.stringify(Nn({}, this.options.tunnel && {
                        dsn: this._api.getDsn().toString()
                    })) + "\n" + JSON.stringify({
                        type: "client_report"
                    }) + "\n" + JSON.stringify({
                        timestamp: si(),
                        discarded_events: Object.keys(t).map((function(n) {
                            var e = Gn(n.split(":"), 2)
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
                        sr(n, e)
                    } catch (t) {
                        pe.error(t)
                    }
                } else
                    pe.log("No outcomes to flush")
            }
        }
        ,
        t.prototype._handleResponse = function(t) {
            var n = t.requestType
              , e = t.response
              , i = t.headers
              , r = t.resolve
              , o = t.reject
              , s = In.fromHttpCode(e.status);
            this._handleRateLimit(i) && pe.warn("Too many " + n + " requests, backing off until: " + this._disabledUntil(n)),
            s !== In.Success ? o(e) : r({
                status: s
            })
        }
        ,
        t.prototype._disabledUntil = function(t) {
            var n = ur[t];
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
                    for (var c = Rn(s.trim().split(",")), a = c.next(); !a.done; a = c.next()) {
                        var l = a.value.split(":", 2)
                          , f = parseInt(l[0], 10)
                          , h = 1e3 * (isNaN(f) ? 60 : f);
                        try {
                            for (var d = (i = void 0,
                            Rn(l[1].split(";"))), v = d.next(); !v.done; v = d.next()) {
                                var p = v.value;
                                this._rateLimits[p || "all"] = new Date(o + h)
                            }
                        } catch (t) {
                            i = {
                                error: t
                            }
                        } finally {
                            try {
                                v && !v.done && (r = d.return) && r.call(d)
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
                        a && !a.done && (e = c.return) && e.call(c)
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
      , lr = function(t) {
        function n(n, e) {
            void 0 === e && (e = or());
            var i = t.call(this, n) || this;
            return i._fetch = e,
            i
        }
        return _n(n, t),
        n.prototype.sendEvent = function(t) {
            return this._sendRequest(Ii(t, this._api), t)
        }
        ,
        n.prototype.sendSession = function(t) {
            return this._sendRequest(qi(t, this._api), t)
        }
        ,
        n.prototype._sendRequest = function(t, n) {
            var e = this;
            if (this._isRateLimited(t.type))
                return this.recordLostEvent(Fn.RateLimitBackoff, t.type),
                Promise.reject({
                    event: n,
                    type: t.type,
                    reason: "Transport for " + t.type + " requests locked till " + this._disabledUntil(t.type) + " due to too many requests.",
                    status: 429
                });
            var i = {
                body: t.body,
                method: "POST",
                referrerPolicy: De() ? "origin" : ""
            };
            return void 0 !== this.options.fetchParameters && Object.assign(i, this.options.fetchParameters),
            void 0 !== this.options.headers && (i.headers = this.options.headers),
            this._buffer.add((function() {
                return new ni((function(n, r) {
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
                throw n instanceof ue ? e.recordLostEvent(Fn.QueueOverflow, t.type) : e.recordLostEvent(Fn.NetworkError, t.type),
                n
            }
            ))
        }
        ,
        n
    }(ar)
      , fr = function(t) {
        function n() {
            return null !== t && t.apply(this, arguments) || this
        }
        return _n(n, t),
        n.prototype.sendEvent = function(t) {
            return this._sendRequest(Ii(t, this._api), t)
        }
        ,
        n.prototype.sendSession = function(t) {
            return this._sendRequest(qi(t, this._api), t)
        }
        ,
        n.prototype._sendRequest = function(t, n) {
            var e = this;
            return this._isRateLimited(t.type) ? (this.recordLostEvent(Fn.RateLimitBackoff, t.type),
            Promise.reject({
                event: n,
                type: t.type,
                reason: "Transport for " + t.type + " requests locked till " + this._disabledUntil(t.type) + " due to too many requests.",
                status: 429
            })) : this._buffer.add((function() {
                return new ni((function(n, i) {
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
                throw n instanceof ue ? e.recordLostEvent(Fn.QueueOverflow, t.type) : e.recordLostEvent(Fn.NetworkError, t.type),
                n
            }
            ))
        }
        ,
        n
    }(ar)
      , hr = function(t) {
        function n() {
            return null !== t && t.apply(this, arguments) || this
        }
        return _n(n, t),
        n.prototype.eventFromException = function(t, n) {
            return function(t, n, e) {
                var i = nr(n, e && e.syntheticException || void 0, {
                    attachStacktrace: t.attachStacktrace
                });
                return Ye(i),
                i.level = qn.Error,
                e && e.event_id && (i.event_id = e.event_id),
                ni.resolve(i)
            }(this._options, t, n)
        }
        ,
        n.prototype.eventFromMessage = function(t, n, e) {
            return void 0 === n && (n = qn.Info),
            function(t, n, e, i) {
                void 0 === e && (e = qn.Info);
                var r = er(n, i && i.syntheticException || void 0, {
                    attachStacktrace: t.attachStacktrace
                });
                return r.level = e,
                i && i.event_id && (r.event_id = i.event_id),
                ni.resolve(r)
            }(this._options, t, n, e)
        }
        ,
        n.prototype._setupTransport = function() {
            if (!this._options.dsn)
                return t.prototype._setupTransport.call(this);
            var n = Nn(Nn({}, this._options.transportOptions), {
                dsn: this._options.dsn,
                tunnel: this._options.tunnel,
                sendClientReports: this._options.sendClientReports,
                _metadata: this._options._metadata
            });
            return this._options.transport ? new this._options.transport(n) : _e() ? new lr(n) : new fr(n)
        }
        ,
        n
    }(_i)
      , dr = Hn()
      , vr = 0;
    function pr() {
        return vr > 0
    }
    function mr() {
        vr += 1,
        setTimeout((function() {
            vr -= 1
        }
        ))
    }
    function gr(t, n, e) {
        if (void 0 === n && (n = {}),
        "function" != typeof t)
            return t;
        try {
            if (t.j)
                return t;
            if (t.A)
                return t.A
        } catch (n) {
            return t
        }
        var i = function() {
            var i = Array.prototype.slice.call(arguments);
            try {
                e && "function" == typeof e && e.apply(this, arguments);
                var r = i.map((function(t) {
                    return gr(t, n)
                }
                ));
                return t.handleEvent ? t.handleEvent.apply(this, r) : t.apply(this, r)
            } catch (t) {
                throw mr(),
                ki((function(e) {
                    e.addEventProcessor((function(t) {
                        var e = Nn({}, t);
                        return n.mechanism && (Qe(e, void 0, void 0),
                        Ye(e, n.mechanism)),
                        e.extra = Nn(Nn({}, e.extra), {
                            arguments: i
                        }),
                        e
                    }
                    )),
                    xi(t)
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
        Object.defineProperty(t, "A", {
            enumerable: !1,
            value: i
        }),
        Object.defineProperties(i, {
            j: {
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
    var yr = function() {
        function t(n) {
            this.name = t.id,
            this._onErrorHandlerInstalled = !1,
            this._onUnhandledRejectionHandlerInstalled = !1,
            this._options = Nn({
                onerror: !0,
                onunhandledrejection: !0
            }, n)
        }
        return t.prototype.setupOnce = function() {
            Error.stackTraceLimit = 50,
            this._options.onerror && (pe.log("Global Handler attached: onerror"),
            this._installGlobalOnErrorHandler()),
            this._options.onunhandledrejection && (pe.log("Global Handler attached: onunhandledrejection"),
            this._installGlobalOnUnhandledRejectionHandler())
        }
        ,
        t.prototype._installGlobalOnErrorHandler = function() {
            var n = this;
            this._onErrorHandlerInstalled || ($e({
                callback: function(e) {
                    var i = e.error
                      , r = gi()
                      , o = r.getIntegration(t)
                      , s = i && !0 === i.T;
                    if (o && !pr() && !s) {
                        var u = r.getClient()
                          , c = void 0 === i && Qn(e.msg) ? n._eventFromIncompleteOnError(e.msg, e.url, e.line, e.column) : n._enhanceEventWithInitialFrame(nr(i || e.msg, void 0, {
                            attachStacktrace: u && u.getOptions().attachStacktrace,
                            rejection: !1
                        }), e.url, e.line, e.column);
                        Ye(c, {
                            handled: !1,
                            type: "onerror"
                        }),
                        r.captureEvent(c, {
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
            this._onUnhandledRejectionHandlerInstalled || ($e({
                callback: function(e) {
                    var i = e;
                    try {
                        "reason"in e ? i = e.reason : "detail"in e && "reason"in e.detail && (i = e.detail.reason)
                    } catch (t) {}
                    var r = gi()
                      , o = r.getIntegration(t)
                      , s = i && !0 === i.T;
                    if (!o || pr() || s)
                        return !0;
                    var u = r.getClient()
                      , c = Yn(i) ? n._eventFromRejectionWithPrimitive(i) : nr(i, void 0, {
                        attachStacktrace: u && u.getOptions().attachStacktrace,
                        rejection: !0
                    });
                    c.level = qn.Error,
                    Ye(c, {
                        handled: !1,
                        type: "onunhandledrejection"
                    }),
                    r.captureEvent(c, {
                        originalException: i
                    })
                },
                type: "unhandledrejection"
            }),
            this._onUnhandledRejectionHandlerInstalled = !0)
        }
        ,
        t.prototype._eventFromIncompleteOnError = function(t, n, e, i) {
            var r, o = Vn(t) ? t.message : t, s = o.match(/^(?:[Uu]ncaught (?:exception: )?)?(?:((?:Eval|Internal|Range|Reference|Syntax|Type|URI|)Error): )?(.*)$/i);
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
              , s = Qn(n) && n.length > 0 ? n : function() {
                var t = Hn();
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
    }()
      , br = ["EventTarget", "Window", "Node", "ApplicationCache", "AudioTrackList", "ChannelMergerNode", "CryptoOperation", "EventSource", "FileReader", "HTMLUnknownElement", "IDBDatabase", "IDBRequest", "IDBTransaction", "KeyOperation", "MediaController", "MessagePort", "ModalWindow", "Notification", "SVGElementInstance", "Screen", "TextTrack", "TextTrackCue", "TextTrackList", "WebSocket", "WebSocketWorker", "Worker", "XMLHttpRequest", "XMLHttpRequestEventTarget", "XMLHttpRequestUpload"]
      , wr = function() {
        function t(n) {
            this.name = t.id,
            this._options = Nn({
                XMLHttpRequest: !0,
                eventTarget: !0,
                requestAnimationFrame: !0,
                setInterval: !0,
                setTimeout: !0
            }, n)
        }
        return t.prototype.setupOnce = function() {
            var t = Hn();
            (this._options.setTimeout && xe(t, "setTimeout", this._wrapTimeFunction.bind(this)),
            this._options.setInterval && xe(t, "setInterval", this._wrapTimeFunction.bind(this)),
            this._options.requestAnimationFrame && xe(t, "requestAnimationFrame", this._wrapRAF.bind(this)),
            this._options.XMLHttpRequest && "XMLHttpRequest"in t && xe(XMLHttpRequest.prototype, "send", this._wrapXHR.bind(this)),
            this._options.eventTarget) && (Array.isArray(this._options.eventTarget) ? this._options.eventTarget : br).forEach(this._wrapEventTarget.bind(this))
        }
        ,
        t.prototype._wrapTimeFunction = function(t) {
            return function() {
                for (var n = [], e = 0; e < arguments.length; e++)
                    n[e] = arguments[e];
                var i = n[0];
                return n[0] = gr(i, {
                    mechanism: {
                        data: {
                            function: ye(t)
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
                return t.call(this, gr(n, {
                    mechanism: {
                        data: {
                            function: "requestAnimationFrame",
                            handler: ye(t)
                        },
                        handled: !0,
                        type: "instrument"
                    }
                }))
            }
        }
        ,
        t.prototype._wrapEventTarget = function(t) {
            var n = Hn()
              , e = n[t] && n[t].prototype;
            e && e.hasOwnProperty && e.hasOwnProperty("addEventListener") && (xe(e, "addEventListener", (function(n) {
                return function(e, i, r) {
                    try {
                        "function" == typeof i.handleEvent && (i.handleEvent = gr(i.handleEvent.bind(i), {
                            mechanism: {
                                data: {
                                    function: "handleEvent",
                                    handler: ye(i),
                                    target: t
                                },
                                handled: !0,
                                type: "instrument"
                            }
                        }))
                    } catch (t) {}
                    return n.call(this, e, gr(i, {
                        mechanism: {
                            data: {
                                function: "addEventListener",
                                handler: ye(i),
                                target: t
                            },
                            handled: !0,
                            type: "instrument"
                        }
                    }), r)
                }
            }
            )),
            xe(e, "removeEventListener", (function(t) {
                return function(n, e, i) {
                    var r, o = e;
                    try {
                        var s = null === (r = o) || void 0 === r ? void 0 : r.A;
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
                    t in i && "function" == typeof i[t] && xe(i, t, (function(n) {
                        var e = {
                            mechanism: {
                                data: {
                                    function: t,
                                    handler: ye(n)
                                },
                                handled: !0,
                                type: "instrument"
                            }
                        };
                        return n.u && (e.mechanism.data.handler = ye(n.u)),
                        gr(n, e)
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
    }()
      , Xr = function() {
        function t(n) {
            this.name = t.id,
            this._options = Nn({
                console: !0,
                dom: !0,
                fetch: !0,
                history: !0,
                sentry: !0,
                xhr: !0
            }, n)
        }
        return t.prototype.addSentryBreadcrumb = function(t) {
            this._options.sentry && gi().addBreadcrumb({
                category: "sentry." + ("transaction" === t.type ? "transaction" : "event"),
                event_id: t.event_id,
                level: t.level,
                message: Ke(t)
            }, {
                event: t
            })
        }
        ,
        t.prototype.setupOnce = function() {
            var t = this;
            this._options.console && $e({
                callback: function() {
                    for (var n = [], e = 0; e < arguments.length; e++)
                        n[e] = arguments[e];
                    t._consoleBreadcrumb.apply(t, Pn(n))
                },
                type: "console"
            }),
            this._options.dom && $e({
                callback: function() {
                    for (var n = [], e = 0; e < arguments.length; e++)
                        n[e] = arguments[e];
                    t._domBreadcrumb.apply(t, Pn(n))
                },
                type: "dom"
            }),
            this._options.xhr && $e({
                callback: function() {
                    for (var n = [], e = 0; e < arguments.length; e++)
                        n[e] = arguments[e];
                    t._xhrBreadcrumb.apply(t, Pn(n))
                },
                type: "xhr"
            }),
            this._options.fetch && $e({
                callback: function() {
                    for (var n = [], e = 0; e < arguments.length; e++)
                        n[e] = arguments[e];
                    t._fetchBreadcrumb.apply(t, Pn(n))
                },
                type: "fetch"
            }),
            this._options.history && $e({
                callback: function() {
                    for (var n = [], e = 0; e < arguments.length; e++)
                        n[e] = arguments[e];
                    t._historyBreadcrumb.apply(t, Pn(n))
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
                level: qn.fromString(t.level),
                message: we(t.args, " ")
            };
            if ("assert" === t.level) {
                if (!1 !== t.args[0])
                    return;
                n.message = "Assertion failed: " + (we(t.args.slice(1), " ") || "console.assert"),
                n.data.arguments = t.args.slice(1)
            }
            gi().addBreadcrumb(n, {
                input: t.args,
                level: t.level
            })
        }
        ,
        t.prototype._domBreadcrumb = function(t) {
            var n, e = "object" == typeof this._options.dom ? this._options.dom.serializeAttribute : void 0;
            "string" == typeof e && (e = [e]);
            try {
                n = t.event.target ? re(t.event.target, e) : re(t.event, e)
            } catch (t) {
                n = "<unknown>"
            }
            0 !== n.length && gi().addBreadcrumb({
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
                if (t.xhr.T)
                    return;
                var n = t.xhr.k || {}
                  , e = n.method
                  , i = n.url
                  , r = n.status_code
                  , o = n.body;
                gi().addBreadcrumb({
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
            t.endTimestamp && (t.fetchData.url.match(/sentry_key/) && "POST" === t.fetchData.method || (t.error ? gi().addBreadcrumb({
                category: "fetch",
                data: t.fetchData,
                level: qn.Error,
                type: "http"
            }, {
                data: t.error,
                input: t.args
            }) : gi().addBreadcrumb({
                category: "fetch",
                data: Nn(Nn({}, t.fetchData), {
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
            var n = Hn()
              , e = t.from
              , i = t.to
              , r = Ve(n.location.href)
              , o = Ve(e)
              , s = Ve(i);
            o.path || (o = r),
            r.protocol === s.protocol && r.host === s.host && (i = s.relative),
            r.protocol === o.protocol && r.host === o.host && (e = o.relative),
            gi().addBreadcrumb({
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
    }()
      , xr = function() {
        function t(n) {
            void 0 === n && (n = {}),
            this.name = t.id,
            this._key = n.key || "cause",
            this._limit = n.limit || 5
        }
        return t.prototype.setupOnce = function() {
            hi((function(n, e) {
                var i = gi().getIntegration(t);
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
            if (!(t.exception && t.exception.values && n && ie(n.originalException, Error)))
                return t;
            var e = this._walkErrorTree(n.originalException, this._key);
            return t.exception.values = Pn(e, t.exception.values),
            t
        }
        ,
        t.prototype._walkErrorTree = function(t, n, e) {
            if (void 0 === e && (e = []),
            !ie(t[n], Error) || e.length + 1 >= this._limit)
                return e;
            var i = Yi(Ji(t[n]));
            return this._walkErrorTree(t[n], n, Pn([i], e))
        }
        ,
        t.id = "LinkedErrors",
        t
    }()
      , kr = Hn()
      , Er = function() {
        function t() {
            this.name = t.id
        }
        return t.prototype.setupOnce = function() {
            hi((function(n) {
                var e, i, r;
                if (gi().getIntegration(t)) {
                    if (!kr.navigator && !kr.location && !kr.document)
                        return n;
                    var o = (null === (e = n.request) || void 0 === e ? void 0 : e.url) || (null === (i = kr.location) || void 0 === i ? void 0 : i.href)
                      , s = (kr.document || {}).referrer
                      , u = (kr.navigator || {}).userAgent
                      , c = Nn(Nn(Nn({}, null === (r = n.request) || void 0 === r ? void 0 : r.headers), s && {
                        Referer: s
                    }), u && {
                        "User-Agent": u
                    })
                      , a = Nn(Nn({}, o && {
                        url: o
                    }), {
                        headers: c
                    });
                    return Nn(Nn({}, n), {
                        request: a
                    })
                }
                return n
            }
            ))
        }
        ,
        t.id = "UserAgent",
        t
    }()
      , Tr = function() {
        function t() {
            this.name = t.id
        }
        return t.prototype.setupOnce = function(n, e) {
            n((function(n) {
                var i = e().getIntegration(t);
                if (i) {
                    try {
                        if (i._shouldDropEvent(n, i._previousEvent))
                            return pe.warn("Event dropped due to being a duplicate of previously captured event."),
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
    }()
      , Sr = function(t) {
        function n(n) {
            void 0 === n && (n = {});
            return n._metadata = n._metadata || {},
            n._metadata.sdk = n._metadata.sdk || {
                name: "sentry.javascript.browser",
                packages: [{
                    name: "npm:@sentry/browser",
                    version: Fi
                }],
                version: Fi
            },
            t.call(this, hr, n) || this
        }
        return _n(n, t),
        n.prototype.showReportDialog = function(t) {
            void 0 === t && (t = {}),
            Hn().document && (this._isEnabled() ? function(t) {
                if (void 0 === t && (t = {}),
                dr.document)
                    if (t.eventId)
                        if (t.dsn) {
                            var n = dr.document.createElement("script");
                            n.async = !0,
                            n.src = new Ei(t.dsn).getReportDialogEndpoint(t),
                            t.onLoad && (n.onload = t.onLoad);
                            var e = dr.document.head || dr.document.body;
                            e && e.appendChild(n)
                        } else
                            pe.error("Missing dsn option in showReportDialog call");
                    else
                        pe.error("Missing eventId option in showReportDialog call")
            }(Nn(Nn({}, t), {
                dsn: t.dsn || this.getDsn()
            })) : pe.error("Trying to call showReportDialog with Sentry Client disabled"))
        }
        ,
        n.prototype._prepareEvent = function(n, e, i) {
            return n.platform = n.platform || "javascript",
            t.prototype._prepareEvent.call(this, n, e, i)
        }
        ,
        n.prototype._sendEvent = function(n) {
            var e = this.getIntegration(Xr);
            e && e.addSentryBreadcrumb(n),
            t.prototype._sendEvent.call(this, n)
        }
        ,
        n
    }(Ai)
      , jr = [new Ri, new Ni, new wr, new Xr, new yr, new xr, new Tr, new Er];
    function Cr(t) {
        if (void 0 === t && (t = {}),
        void 0 === t.defaultIntegrations && (t.defaultIntegrations = jr),
        void 0 === t.release) {
            var n = Hn();
            n.SENTRY_RELEASE && n.SENTRY_RELEASE.id && (t.release = n.SENTRY_RELEASE.id)
        }
        void 0 === t.autoSessionTracking && (t.autoSessionTracking = !0),
        void 0 === t.sendClientReports && (t.sendClientReports = !0),
        function(t, n) {
            var e;
            !0 === n.debug && pe.enable();
            var i = gi();
            null === (e = i.getScope()) || void 0 === e || e.update(n.initialScope);
            var r = new t(n);
            i.bindClient(r)
        }(Sr, t),
        t.autoSessionTracking && function() {
            if (void 0 === Hn().document)
                return void pe.warn("Session tracking in non-browser environment with @sentry/browser is not supported.");
            var t = gi();
            if ("function" != typeof t.startSession || "function" != typeof t.captureSession)
                return;
            t.startSession({
                ignoreDuration: !0
            }),
            t.captureSession(),
            $e({
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
    const Ar = "yoopu.me"
      , Or = "yopu.co";
    var _r;
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
    }(_r || (_r = {})),
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
    }(_r || (_r = {}));
    var Br = new RegExp("^[ \\t]*([0-9a-f]{32})?-?([0-9a-f]{16})?-?([01])?[ \\t]*$");
    function Dr(t) {
        var n;
        return void 0 === t && (t = null === (n = gi().getClient()) || void 0 === n ? void 0 : n.getOptions()),
        !!t && ("tracesSampleRate"in t || "tracesSampler"in t)
    }
    function qr(t) {
        var n, e;
        return void 0 === t && (t = gi()),
        null === (e = null === (n = t) || void 0 === n ? void 0 : n.getScope()) || void 0 === e ? void 0 : e.getTransaction()
    }
    function Ir(t) {
        return t / 1e3
    }
    function Mr() {
        var t = qr();
        t && (pe.log("[Tracing] Transaction: " + _r.InternalError + " -> Global error occured"),
        t.setStatus(_r.InternalError))
    }
    var Fr = function() {
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
      , Nr = function(t) {
        function n(n, e) {
            var i = t.call(this, n) || this;
            return i._measurements = {},
            i._hub = gi(),
            ie(e, vi) && (i._hub = e),
            i.name = n.name || "",
            i.metadata = n.metadata || {},
            i._trimEnd = n.trimEnd,
            i.transaction = i,
            i
        }
        return _n(n, t),
        n.prototype.setName = function(t) {
            this.name = t
        }
        ,
        n.prototype.initSpanRecorder = function(t) {
            void 0 === t && (t = 1e3),
            this.spanRecorder || (this.spanRecorder = new Fr(t)),
            this.spanRecorder.add(this)
        }
        ,
        n.prototype.setMeasurements = function(t) {
            this._measurements = Nn({}, t)
        }
        ,
        n.prototype.setMetadata = function(t) {
            this.metadata = Nn(Nn({}, this.metadata), t)
        }
        ,
        n.prototype.finish = function(n) {
            var e, i, r, o, s, u = this;
            if (void 0 === this.endTimestamp) {
                if (this.name || (pe.warn("Transaction has no name, falling back to `<unlabeled transaction>`."),
                this.name = "<unlabeled transaction>"),
                t.prototype.finish.call(this, n),
                !0 !== this.sampled)
                    return pe.log("[Tracing] Discarding transaction because its trace was not chosen to be sampled."),
                    void (null === (s = null === (r = null === (e = this._hub.getClient()) || void 0 === e ? void 0 : (i = e).getTransport) || void 0 === r ? void 0 : (o = r.call(i)).recordLostEvent) || void 0 === s || s.call(o, Fn.SampleRate, "transaction"));
                var c = this.spanRecorder ? this.spanRecorder.spans.filter((function(t) {
                    return t !== u && t.endTimestamp
                }
                )) : [];
                this._trimEnd && c.length > 0 && (this.endTimestamp = c.reduce((function(t, n) {
                    return t.endTimestamp && n.endTimestamp ? t.endTimestamp > n.endTimestamp ? t : n : t
                }
                )).endTimestamp);
                var a = {
                    contexts: {
                        trace: this.getTraceContext()
                    },
                    spans: c,
                    start_timestamp: this.startTimestamp,
                    tags: this.tags,
                    timestamp: this.endTimestamp,
                    transaction: this.name,
                    type: "transaction",
                    debug_meta: this.metadata
                };
                return Object.keys(this._measurements).length > 0 && (pe.log("[Measurements] Adding measurements to transaction", JSON.stringify(this._measurements, void 0, 2)),
                a.measurements = this._measurements),
                pe.log("[Tracing] Finishing " + this.op + " transaction: " + this.name + "."),
                this._hub.captureEvent(a)
            }
        }
        ,
        n.prototype.toContext = function() {
            var n = t.prototype.toContext.call(this);
            return Oe(Nn(Nn({}, n), {
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
            if (this.traceId = Je(),
            this.spanId = Je().substring(16),
            this.startTimestamp = ci(),
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
            var e = new t(Nn(Nn({}, n), {
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
            return this.tags = Nn(Nn({}, this.tags), ((e = {})[t] = n,
            e)),
            this
        }
        ,
        t.prototype.setData = function(t, n) {
            var e;
            return this.data = Nn(Nn({}, this.data), ((e = {})[t] = n,
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
            var n = _r.fromHttpCode(t);
            return n !== _r.UnknownError && this.setStatus(n),
            this
        }
        ,
        t.prototype.isSuccess = function() {
            return this.status === _r.Ok
        }
        ,
        t.prototype.finish = function(t) {
            this.endTimestamp = "number" == typeof t ? t : ci()
        }
        ,
        t.prototype.toTraceparent = function() {
            var t = "";
            return void 0 !== this.sampled && (t = this.sampled ? "-1" : "-0"),
            this.traceId + "-" + this.spanId + t
        }
        ,
        t.prototype.toContext = function() {
            return Oe({
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
            return Oe({
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
            return Oe({
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
      , $r = function(t) {
        function n(n, e, i, r) {
            void 0 === i && (i = "");
            var o = t.call(this, r) || this;
            return o._pushActivity = n,
            o._popActivity = e,
            o.transactionSpanId = i,
            o
        }
        return _n(n, t),
        n.prototype.add = function(n) {
            var e = this;
            n.spanId !== this.transactionSpanId && (n.finish = function(t) {
                n.endTimestamp = "number" == typeof t ? t : ci(),
                e._popActivity(n.spanId)
            }
            ,
            void 0 === n.endTimestamp && this._pushActivity(n.spanId)),
            t.prototype.add.call(this, n)
        }
        ,
        n
    }(Fr)
      , Rr = function(t) {
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
            e && r && (Gr(e),
            pe.log("Setting idle transaction on scope. Span ID: " + o.spanId),
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
        return _n(n, t),
        n.prototype.finish = function(n) {
            var e, i, r = this;
            if (void 0 === n && (n = ci()),
            this._finished = !0,
            this.activities = {},
            this.spanRecorder) {
                pe.log("[Tracing] finishing IdleTransaction", new Date(1e3 * n).toISOString(), this.op);
                try {
                    for (var o = Rn(this._beforeFinishCallbacks), s = o.next(); !s.done; s = o.next()) {
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
                    t.setStatus(_r.Cancelled),
                    pe.log("[Tracing] cancelling span since transaction ended early", JSON.stringify(t, void 0, 2)));
                    var e = t.startTimestamp < n;
                    return e || pe.log("[Tracing] discarding Span since it happened after Transaction was finished", JSON.stringify(t, void 0, 2)),
                    e
                }
                )),
                pe.log("[Tracing] flushing IdleTransaction")
            } else
                pe.log("[Tracing] No active IdleTransaction");
            return this._onScope && Gr(this._idleHub),
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
                this.spanRecorder = new $r((function(t) {
                    n._finished || n._pushActivity(t)
                }
                ),(function(t) {
                    n._finished || n._popActivity(t)
                }
                ),this.spanId,t),
                pe.log("Starting heartbeat"),
                this._pingHeartbeat()
            }
            this.spanRecorder.add(this)
        }
        ,
        n.prototype._pushActivity = function(t) {
            this._initTimeout && (clearTimeout(this._initTimeout),
            this._initTimeout = void 0),
            pe.log("[Tracing] pushActivity: " + t),
            this.activities[t] = !0,
            pe.log("[Tracing] new activities count", Object.keys(this.activities).length)
        }
        ,
        n.prototype._popActivity = function(t) {
            var n = this;
            if (this.activities[t] && (pe.log("[Tracing] popActivity " + t),
            delete this.activities[t],
            pe.log("[Tracing] new activities count", Object.keys(this.activities).length)),
            0 === Object.keys(this.activities).length) {
                var e = this._idleTimeout
                  , i = ci() + e / 1e3;
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
                this._heartbeatCounter >= 3 ? (pe.log("[Tracing] Transaction finished because of no change for 3 heart beats"),
                this.setStatus(_r.DeadlineExceeded),
                this.setTag("heartbeat", "failed"),
                this.finish()) : this._pingHeartbeat()
            }
        }
        ,
        n.prototype._pingHeartbeat = function() {
            var t = this;
            pe.log("pinging Heartbeat -> current counter: " + this._heartbeatCounter),
            setTimeout((function() {
                t._beat()
            }
            ), 5e3)
        }
        ,
        n
    }(Nr);
    function Gr(t) {
        if (t) {
            var n = t.getScope();
            if (n)
                n.getTransaction() && n.setSpan(void 0)
        }
    }
    function Pr() {
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
    function Ur(t, n, e) {
        return Dr(n) ? void 0 !== t.sampled ? (t.setMetadata({
            transactionSampling: {
                method: Mn.Explicit
            }
        }),
        t) : ("function" == typeof n.tracesSampler ? (i = n.tracesSampler(e),
        t.setMetadata({
            transactionSampling: {
                method: Mn.Sampler,
                rate: Number(i)
            }
        })) : void 0 !== e.parentSampled ? (i = e.parentSampled,
        t.setMetadata({
            transactionSampling: {
                method: Mn.Inheritance
            }
        })) : (i = n.tracesSampleRate,
        t.setMetadata({
            transactionSampling: {
                method: Mn.Rate,
                rate: Number(i)
            }
        })),
        function(t) {
            if (isNaN(t) || "number" != typeof t && "boolean" != typeof t)
                return pe.warn("[Tracing] Given sample rate is invalid. Sample rate must be a boolean or a number between 0 and 1. Got " + JSON.stringify(t) + " of type " + JSON.stringify(typeof t) + "."),
                !1;
            if (t < 0 || t > 1)
                return pe.warn("[Tracing] Given sample rate is invalid. Sample rate must be between 0 and 1. Got " + t + "."),
                !1;
            return !0
        }(i) ? i ? (t.sampled = Math.random() < i,
        t.sampled ? (pe.log("[Tracing] starting " + t.op + " transaction - " + t.name),
        t) : (pe.log("[Tracing] Discarding transaction because it's not included in the random sample (sampling rate = " + Number(i) + ")"),
        t)) : (pe.log("[Tracing] Discarding transaction because " + ("function" == typeof n.tracesSampler ? "tracesSampler returned 0 or false" : "a negative sampling decision was inherited or tracesSampleRate is set to 0")),
        t.sampled = !1,
        t) : (pe.warn("[Tracing] Discarding transaction because of invalid sample rate."),
        t.sampled = !1,
        t)) : (t.sampled = !1,
        t);
        var i
    }
    function Lr(t, n) {
        var e, i, r = (null === (e = this.getClient()) || void 0 === e ? void 0 : e.getOptions()) || {}, o = new Nr(t,this);
        return (o = Ur(o, r, Nn({
            parentSampled: t.parentSampled,
            transactionContext: t
        }, n))).sampled && o.initSpanRecorder(null === (i = r._experiments) || void 0 === i ? void 0 : i.maxSpans),
        o
    }
    var zr = Hn();
    var Wr = function(t, n, e) {
        var i;
        return function(r) {
            n.value >= 0 && (r || e) && (n.delta = n.value - (i || 0),
            (n.delta || void 0 === i) && (i = n.value,
            t(n)))
        }
    }
      , Hr = function(t, n) {
        return {
            name: t,
            value: null != n ? n : -1,
            delta: 0,
            entries: [],
            id: "v2-" + Date.now() + "-" + (Math.floor(8999999999999 * Math.random()) + 1e12)
        }
    }
      , Jr = function(t, n) {
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
      , Vr = function(t, n) {
        var e = function(i) {
            "pagehide" !== i.type && "hidden" !== Hn().document.visibilityState || (t(i),
            n && (removeEventListener("visibilitychange", e, !0),
            removeEventListener("pagehide", e, !0)))
        };
        addEventListener("visibilitychange", e, !0),
        addEventListener("pagehide", e, !0)
    }
      , Kr = -1
      , Qr = function() {
        return Kr < 0 && (Kr = "hidden" === Hn().document.visibilityState ? 0 : 1 / 0,
        Vr((function(t) {
            var n = t.timeStamp;
            Kr = n
        }
        ), !0)),
        {
            get firstHiddenTime() {
                return Kr
            }
        }
    }
      , Yr = {}
      , Zr = Hn()
      , to = {
        _reportAllChanges: !1
    }
      , no = function() {
        function t(t) {
            var n, e;
            this._measurements = {},
            this._performanceCursor = 0,
            !Un() && (null === (n = Zr) || void 0 === n ? void 0 : n.performance) && (null === (e = Zr) || void 0 === e ? void 0 : e.document) && (Zr.performance.mark && Zr.performance.mark("sentry-tracing-init"),
            this._trackCLS(),
            this._trackLCP(t._reportAllChanges),
            this._trackFID())
        }
        return t.prototype.addPerformanceEntries = function(t) {
            var n = this;
            if (Zr && Zr.performance && Zr.performance.getEntries && ai) {
                pe.log("[Tracing] Adding & adjusting spans using Performance API");
                var e, i, r, o, s, u = Ir(ai);
                if (Zr.document && Zr.document.scripts)
                    for (var c = 0; c < Zr.document.scripts.length; c++)
                        if ("true" === Zr.document.scripts[c].dataset.entry) {
                            e = Zr.document.scripts[c].src;
                            break
                        }
                if (Zr.performance.getEntries().slice(this._performanceCursor).forEach((function(c) {
                    var a = Ir(c.startTime)
                      , l = Ir(c.duration);
                    if (!("navigation" === t.op && u + a < t.startTimestamp))
                        switch (c.entryType) {
                        case "navigation":
                            !function(t, n, e) {
                                eo({
                                    transaction: t,
                                    entry: n,
                                    event: "unloadEvent",
                                    timeOrigin: e
                                }),
                                eo({
                                    transaction: t,
                                    entry: n,
                                    event: "redirect",
                                    timeOrigin: e
                                }),
                                eo({
                                    transaction: t,
                                    entry: n,
                                    event: "domContentLoadedEvent",
                                    timeOrigin: e
                                }),
                                eo({
                                    transaction: t,
                                    entry: n,
                                    event: "loadEvent",
                                    timeOrigin: e
                                }),
                                eo({
                                    transaction: t,
                                    entry: n,
                                    event: "connect",
                                    timeOrigin: e
                                }),
                                eo({
                                    transaction: t,
                                    entry: n,
                                    event: "secureConnection",
                                    timeOrigin: e,
                                    eventEnd: "connectEnd",
                                    description: "TLS/SSL"
                                }),
                                eo({
                                    transaction: t,
                                    entry: n,
                                    event: "fetch",
                                    timeOrigin: e,
                                    eventEnd: "domainLookupStart",
                                    description: "cache"
                                }),
                                eo({
                                    transaction: t,
                                    entry: n,
                                    event: "domainLookup",
                                    timeOrigin: e,
                                    description: "DNS"
                                }),
                                function(t, n, e) {
                                    io(t, {
                                        op: "browser",
                                        description: "request",
                                        startTimestamp: e + Ir(n.requestStart),
                                        endTimestamp: e + Ir(n.responseEnd)
                                    }),
                                    io(t, {
                                        op: "browser",
                                        description: "response",
                                        startTimestamp: e + Ir(n.responseStart),
                                        endTimestamp: e + Ir(n.responseEnd)
                                    })
                                }(t, n, e)
                            }(t, c, u),
                            o = u + Ir(c.responseStart),
                            s = u + Ir(c.requestStart);
                            break;
                        case "mark":
                        case "paint":
                        case "measure":
                            var f = function(t, n, e, i, r) {
                                var o = r + e
                                  , s = o + i;
                                return io(t, {
                                    description: n.name,
                                    endTimestamp: s,
                                    op: n.entryType,
                                    startTimestamp: o
                                }),
                                o
                            }(t, c, a, l, u);
                            void 0 === r && "sentry-tracing-init" === c.name && (r = f);
                            var h = Qr()
                              , d = c.startTime < h.firstHiddenTime;
                            "first-paint" === c.name && d && (pe.log("[Measurements] Adding FP"),
                            n._measurements.fp = {
                                value: c.startTime
                            },
                            n._measurements["mark.fp"] = {
                                value: f
                            }),
                            "first-contentful-paint" === c.name && d && (pe.log("[Measurements] Adding FCP"),
                            n._measurements.fcp = {
                                value: c.startTime
                            },
                            n._measurements["mark.fcp"] = {
                                value: f
                            });
                            break;
                        case "resource":
                            var v = c.name.replace(Zr.location.origin, "")
                              , p = function(t, n, e, i, r, o) {
                                if ("xmlhttprequest" === n.initiatorType || "fetch" === n.initiatorType)
                                    return;
                                var s = {};
                                "transferSize"in n && (s["Transfer Size"] = n.transferSize);
                                "encodedBodySize"in n && (s["Encoded Body Size"] = n.encodedBodySize);
                                "decodedBodySize"in n && (s["Decoded Body Size"] = n.decodedBodySize);
                                var u = o + i
                                  , c = u + r;
                                return io(t, {
                                    description: e,
                                    endTimestamp: c,
                                    op: n.initiatorType ? "resource." + n.initiatorType : "resource",
                                    startTimestamp: u,
                                    data: s
                                }),
                                c
                            }(t, c, v, a, l, u);
                            void 0 === i && (e || "").indexOf(v) > -1 && (i = p)
                        }
                }
                )),
                void 0 !== i && void 0 !== r && io(t, {
                    description: "evaluation",
                    endTimestamp: r,
                    op: "script",
                    startTimestamp: i
                }),
                this._performanceCursor = Math.max(performance.getEntries().length - 1, 0),
                this._trackNavigator(t),
                "pageload" === t.op) {
                    var a = Ir(ai);
                    "number" == typeof o && (pe.log("[Measurements] Adding TTFB"),
                    this._measurements.ttfb = {
                        value: 1e3 * (o - t.startTimestamp)
                    },
                    "number" == typeof s && s <= o && (this._measurements["ttfb.requestTime"] = {
                        value: 1e3 * (o - s)
                    })),
                    ["fcp", "fp", "lcp"].forEach((function(e) {
                        if (n._measurements[e] && !(a >= t.startTimestamp)) {
                            var i = n._measurements[e].value
                              , r = a + Ir(i)
                              , o = Math.abs(1e3 * (r - t.startTimestamp))
                              , s = o - i;
                            pe.log("[Measurements] Normalized " + e + " from " + i + " to " + o + " (" + s + ")"),
                            n._measurements[e].value = o
                        }
                    }
                    )),
                    this._measurements["mark.fid"] && this._measurements.fid && io(t, {
                        description: "first input delay",
                        endTimestamp: this._measurements["mark.fid"].value + Ir(this._measurements.fid.value),
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
            this._lcpEntry && (pe.log("[Measurements] Adding LCP Data"),
            this._lcpEntry.element && t.setTag("lcp.element", re(this._lcpEntry.element)),
            this._lcpEntry.id && t.setTag("lcp.id", this._lcpEntry.id),
            this._lcpEntry.url && t.setTag("lcp.url", this._lcpEntry.url.trim().slice(0, 200)),
            t.setTag("lcp.size", this._lcpEntry.size)),
            this._clsEntry && this._clsEntry.sources && (pe.log("[Measurements] Adding CLS Data"),
            this._clsEntry.sources.forEach((function(n, e) {
                return t.setTag("cls.source." + (e + 1), re(n.node))
            }
            )))
        }
        ,
        t.prototype._trackCLS = function() {
            var t = this;
            !function(t, n) {
                var e, i = Hr("CLS", 0), r = 0, o = [], s = function(t) {
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
                }, u = Jr("layout-shift", s);
                u && (e = Wr(t, i, n),
                Vr((function() {
                    u.takeRecords().map(s),
                    e(!0)
                }
                )))
            }((function(n) {
                var e = n.entries.pop();
                e && (pe.log("[Measurements] Adding CLS"),
                t._measurements.cls = {
                    value: n.value
                },
                t._clsEntry = e)
            }
            ))
        }
        ,
        t.prototype._trackNavigator = function(t) {
            var n = Zr.navigator;
            if (n) {
                var e = n.connection;
                e && (e.effectiveType && t.setTag("effectiveConnectionType", e.effectiveType),
                e.type && t.setTag("connectionType", e.type),
                ro(e.rtt) && (this._measurements["connection.rtt"] = {
                    value: e.rtt
                }),
                ro(e.downlink) && (this._measurements["connection.downlink"] = {
                    value: e.downlink
                })),
                ro(n.deviceMemory) && t.setTag("deviceMemory", String(n.deviceMemory)),
                ro(n.hardwareConcurrency) && t.setTag("hardwareConcurrency", String(n.hardwareConcurrency))
            }
        }
        ,
        t.prototype._trackLCP = function(t) {
            var n = this;
            !function(t, n) {
                var e, i = Qr(), r = Hr("LCP"), o = function(t) {
                    var n = t.startTime;
                    n < i.firstHiddenTime && (r.value = n,
                    r.entries.push(t)),
                    e && e()
                }, s = Jr("largest-contentful-paint", o);
                if (s) {
                    e = Wr(t, r, n);
                    var u = function() {
                        Yr[r.id] || (s.takeRecords().map(o),
                        s.disconnect(),
                        Yr[r.id] = !0,
                        e(!0))
                    };
                    ["keydown", "click"].forEach((function(t) {
                        addEventListener(t, u, {
                            once: !0,
                            capture: !0
                        })
                    }
                    )),
                    Vr(u, !0)
                }
            }((function(t) {
                var e = t.entries.pop();
                if (e) {
                    var i = Ir(ai)
                      , r = Ir(e.startTime);
                    pe.log("[Measurements] Adding LCP"),
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
                var e, i = Qr(), r = Hr("FID"), o = function(t) {
                    e && t.startTime < i.firstHiddenTime && (r.value = t.processingStart - t.startTime,
                    r.entries.push(t),
                    e(!0))
                }, s = Jr("first-input", o);
                s && (e = Wr(t, r, n),
                Vr((function() {
                    s.takeRecords().map(o),
                    s.disconnect()
                }
                ), !0))
            }((function(n) {
                var e = n.entries.pop();
                if (e) {
                    var i = Ir(ai)
                      , r = Ir(e.startTime);
                    pe.log("[Measurements] Adding FID"),
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
    function eo(t) {
        var n = t.transaction
          , e = t.entry
          , i = t.event
          , r = t.timeOrigin
          , o = t.eventEnd
          , s = t.description
          , u = o ? e[o] : e[i + "End"]
          , c = e[i + "Start"];
        c && u && io(n, {
            op: "browser",
            description: null != s ? s : i,
            startTimestamp: r + Ir(c),
            endTimestamp: r + Ir(u)
        })
    }
    function io(t, n) {
        var e = n.startTimestamp
          , i = $n(n, ["startTimestamp"]);
        return e && t.startTimestamp > e && (t.startTimestamp = e),
        t.startChild(Nn({
            startTimestamp: e
        }, i))
    }
    function ro(t) {
        return "number" == typeof t && isFinite(t)
    }
    var oo = {
        traceFetch: !0,
        traceXHR: !0,
        tracingOrigins: ["localhost", /^\//]
    };
    function so(t) {
        var n = Nn(Nn({}, oo), t)
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
                return Xe(t, n)
            }
            )) && !Xe(t, "sentry_key"),
            s[t]
        }
          , c = u;
        "function" == typeof o && (c = function(t) {
            return u(t) && o(t)
        }
        );
        var a = {};
        e && $e({
            callback: function(t) {
                !function(t, n, e) {
                    if (!Dr() || !t.fetchData || !n(t.fetchData.url))
                        return;
                    if (t.endTimestamp && t.fetchData.__span) {
                        return void ((r = e[t.fetchData.__span]) && (t.response ? r.setHttpStatus(t.response.status) : t.error && r.setStatus(_r.InternalError),
                        r.finish(),
                        delete e[t.fetchData.__span]))
                    }
                    var i = qr();
                    if (i) {
                        var r = i.startChild({
                            data: Nn(Nn({}, t.fetchData), {
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
                        ie(o, Request) && (u = o.headers),
                        u ? "function" == typeof u.append ? u.append("sentry-trace", r.toTraceparent()) : u = Array.isArray(u) ? Pn(u, [["sentry-trace", r.toTraceparent()]]) : Nn(Nn({}, u), {
                            "sentry-trace": r.toTraceparent()
                        }) : u = {
                            "sentry-trace": r.toTraceparent()
                        },
                        s.headers = u
                    }
                }(t, c, a)
            },
            type: "fetch"
        }),
        i && $e({
            callback: function(t) {
                !function(t, n, e) {
                    var i, r;
                    if (!Dr() || (null === (i = t.xhr) || void 0 === i ? void 0 : i.T) || !(null === (r = t.xhr) || void 0 === r ? void 0 : r.k) || !n(t.xhr.k.url))
                        return;
                    var o = t.xhr.k;
                    if (t.endTimestamp && t.xhr.O) {
                        return void ((u = e[t.xhr.O]) && (u.setHttpStatus(o.status_code),
                        u.finish(),
                        delete e[t.xhr.O]))
                    }
                    var s = qr();
                    if (s) {
                        var u = s.startChild({
                            data: Nn(Nn({}, o.data), {
                                type: "xhr",
                                method: o.method,
                                url: o.url
                            }),
                            description: o.method + " " + o.url,
                            op: "http.client"
                        });
                        if (t.xhr.O = u.spanId,
                        e[t.xhr.O] = u,
                        t.xhr.setRequestHeader)
                            try {
                                t.xhr.setRequestHeader("sentry-trace", u.toTraceparent())
                            } catch (t) {}
                    }
                }(t, c, a)
            },
            type: "xhr"
        })
    }
    var uo = Hn();
    var co = Nn({
        idleTimeout: 1e3,
        markBackgroundTransactions: !0,
        maxTransactionDuration: 600,
        routingInstrumentation: function(t, n, e) {
            if (void 0 === n && (n = !0),
            void 0 === e && (e = !0),
            uo && uo.location) {
                var i, r = uo.location.href;
                n && (i = t({
                    name: uo.location.pathname,
                    op: "pageload"
                })),
                e && $e({
                    callback: function(n) {
                        var e = n.to
                          , o = n.from;
                        void 0 === o && r && -1 !== r.indexOf(e) ? r = void 0 : o !== e && (r = void 0,
                        i && (pe.log("[Tracing] Finishing current transaction with op: " + i.op),
                        i.finish()),
                        i = t({
                            name: uo.location.pathname,
                            op: "navigation"
                        }))
                    },
                    type: "history"
                })
            } else
                pe.warn("Could not initialize routing instrumentation due to invalid location")
        },
        startTransactionOnLocationChange: !0,
        startTransactionOnPageLoad: !0
    }, oo)
      , ao = function() {
        function t(n) {
            this.name = t.id,
            this._emitOptionsWarning = !1;
            var e = oo.tracingOrigins;
            n && n.tracingOrigins && Array.isArray(n.tracingOrigins) && 0 !== n.tracingOrigins.length ? e = n.tracingOrigins : this._emitOptionsWarning = !0,
            this.options = Nn(Nn(Nn({}, co), n), {
                tracingOrigins: e
            }),
            this._metrics = new no(Nn(Nn({}, to), this.options._metricOptions))
        }
        return t.prototype.setupOnce = function(t, n) {
            var e = this;
            this._getCurrentHub = n,
            this._emitOptionsWarning && (pe.warn("[Tracing] You need to define `tracingOrigins` in the options. Set an array of urls or patterns to trace."),
            pe.warn("[Tracing] We added a reasonable default for you: " + oo.tracingOrigins));
            var i = this.options
              , r = i.routingInstrumentation
              , o = i.startTransactionOnLocationChange
              , s = i.startTransactionOnPageLoad
              , u = i.markBackgroundTransactions
              , c = i.traceFetch
              , a = i.traceXHR
              , l = i.tracingOrigins
              , f = i.shouldCreateSpanForRequest;
            r((function(t) {
                return e._createRouteTransaction(t)
            }
            ), s, o),
            u && (zr && zr.document ? zr.document.addEventListener("visibilitychange", (function() {
                var t = qr();
                zr.document.hidden && t && (pe.log("[Tracing] Transaction: " + _r.Cancelled + " -> since tab moved to the background, op: " + t.op),
                t.status || t.setStatus(_r.Cancelled),
                t.setTag("visibilitychange", "document.hidden"),
                t.finish())
            }
            )) : pe.warn("[Tracing] Could not set up background tab detection due to lack of global document")),
            so({
                traceFetch: c,
                traceXHR: a,
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
                    e = Hn().document.querySelector("meta[name=" + n + "]"),
                    e ? e.getAttribute("content") : null);
                    var n, e;
                    if (t)
                        return function(t) {
                            var n = t.match(Br);
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
                  , u = Nn(Nn(Nn({}, t), s), {
                    trimEnd: !0
                })
                  , c = "function" == typeof i ? i(u) : u
                  , a = void 0 === c ? Nn(Nn({}, u), {
                    sampled: !1
                }) : c;
                !1 === a.sampled && pe.log("[Tracing] Will not send " + a.op + " transaction because of beforeNavigate."),
                pe.log("[Tracing] Starting " + a.op + " transaction on scope");
                var l = function(t, n, e, i, r) {
                    var o, s, u = (null === (o = t.getClient()) || void 0 === o ? void 0 : o.getOptions()) || {}, c = new Rr(n,t,e,i);
                    return (c = Ur(c, u, Nn({
                        parentSampled: n.parentSampled,
                        transactionContext: n
                    }, r))).sampled && c.initSpanRecorder(null === (s = u._experiments) || void 0 === s ? void 0 : s.maxSpans),
                    c
                }(this._getCurrentHub(), a, r, !0, {
                    location: Hn().location
                });
                return l.registerBeforeFinishCallback((function(t, e) {
                    n._metrics.addPerformanceEntries(t),
                    function(t, n, e) {
                        var i = e - n.startTimestamp;
                        e && (i > t || i < 0) && (n.setStatus(_r.DeadlineExceeded),
                        n.setTag("maxTransactionDurationExceeded", "true"))
                    }(1e3 * o, t, e)
                }
                )),
                l
            }
            pe.warn("[Tracing] Did not create " + t.op + " transaction because _getCurrentHub is invalid.")
        }
        ,
        t.id = "BrowserTracing",
        t
    }();
    var lo = function() {
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
                            return e.call.apply(e, Pn([this], ho(t, n)))
                        }
                        ,
                        t
                    }(t, n)
                }
                ))
            }(this._router, this._methods) : pe.error("ExpressIntegration is missing an Express instance")
        }
        ,
        t.id = "Express",
        t
    }();
    function fo(t, n) {
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
                    r.call.apply(r, Pn([this], n))
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
                    o.call.apply(o, Pn([this], n))
                }
                ))
            }
            ;
        default:
            throw new Error("Express middleware takes 2-4 arguments. Got: " + e)
        }
    }
    function ho(t, n) {
        return t.map((function(t) {
            return "function" == typeof t ? fo(t, n) : Array.isArray(t) ? t.map((function(t) {
                return "function" == typeof t ? fo(t, n) : t
            }
            )) : t
        }
        ))
    }
    var vo, po = function() {
        function t(n) {
            void 0 === n && (n = {}),
            this.name = t.id,
            this._usePgNative = !!n.usePgNative
        }
        return t.prototype.setupOnce = function(t, n) {
            var e, i = zn("pg");
            i ? !this._usePgNative || (null === (e = i.native) || void 0 === e ? void 0 : e.Client) ? xe((this._usePgNative ? i.native : i).Client.prototype, "query", (function(t) {
                return function(e, i, r) {
                    var o, s, u, c = null === (s = null === (o = n().getScope()) || void 0 === o ? void 0 : o.getSpan()) || void 0 === s ? void 0 : s.startChild({
                        description: "string" == typeof e ? e : e.text,
                        op: "db"
                    });
                    if ("function" == typeof r)
                        return t.call(this, e, i, (function(t, n) {
                            var e;
                            null === (e = c) || void 0 === e || e.finish(),
                            r(t, n)
                        }
                        ));
                    if ("function" == typeof i)
                        return t.call(this, e, (function(t, n) {
                            var e;
                            null === (e = c) || void 0 === e || e.finish(),
                            i(t, n)
                        }
                        ));
                    var a = void 0 !== i ? t.call(this, e, i) : t.call(this, e);
                    return ee(a) ? a.then((function(t) {
                        var n;
                        return null === (n = c) || void 0 === n || n.finish(),
                        t
                    }
                    )) : (null === (u = c) || void 0 === u || u.finish(),
                    a)
                }
            }
            )) : pe.error("Postgres Integration was unable to access 'pg-native' bindings.") : pe.error("Postgres Integration was unable to require `pg` package.")
        }
        ,
        t.id = "Postgres",
        t
    }(), mo = function() {
        function t() {
            this.name = t.id
        }
        return t.prototype.setupOnce = function(t, n) {
            var e = zn("mysql/lib/Connection.js");
            e ? xe(e, "createQuery", (function(t) {
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
            )) : pe.error("Mysql Integration was unable to require `mysql` package.")
        }
        ,
        t.id = "Mysql",
        t
    }(), go = ["aggregate", "bulkWrite", "countDocuments", "createIndex", "createIndexes", "deleteMany", "deleteOne", "distinct", "drop", "dropIndex", "dropIndexes", "estimatedDocumentCount", "find", "findOne", "findOneAndDelete", "findOneAndReplace", "findOneAndUpdate", "indexes", "indexExists", "indexInformation", "initializeOrderedBulkOp", "insertMany", "insertOne", "isCapped", "mapReduce", "options", "parallelCollectionScan", "rename", "replaceOne", "stats", "updateMany", "updateOne"], yo = {
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
    }, bo = function() {
        function t(n) {
            void 0 === n && (n = {}),
            this.name = t.id,
            this._operations = Array.isArray(n.operations) ? n.operations : go,
            this._describeOperations = !("describeOperations"in n) || n.describeOperations,
            this._useMongoose = !!n.useMongoose
        }
        return t.prototype.setupOnce = function(t, n) {
            var e = this._useMongoose ? "mongoose" : "mongodb"
              , i = zn(e);
            i ? this._instrumentOperations(i.Collection, this._operations, n) : pe.error("Mongo Integration was unable to require `" + e + "` package.")
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
                xe(t.prototype, n, (function(t) {
                    return function() {
                        for (var r, o, s, u, c = [], a = 0; a < arguments.length; a++)
                            c[a] = arguments[a];
                        var l = c[c.length - 1]
                          , f = e().getScope()
                          , h = null === (r = f) || void 0 === r ? void 0 : r.getSpan();
                        if ("function" != typeof l || "mapReduce" === n && 2 === c.length) {
                            var d = null === (o = h) || void 0 === o ? void 0 : o.startChild(i(this, n, c))
                              , v = t.call.apply(t, Pn([this], c));
                            return ee(v) ? v.then((function(t) {
                                var n;
                                return null === (n = d) || void 0 === n || n.finish(),
                                t
                            }
                            )) : (null === (s = d) || void 0 === s || s.finish(),
                            v)
                        }
                        var p = null === (u = h) || void 0 === u ? void 0 : u.startChild(i(this, n, c.slice(0, -1)));
                        return t.call.apply(t, Pn([this], c.slice(0, -1), [function(t, n) {
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
              , o = yo[n]
              , s = Array.isArray(this._describeOperations) ? this._describeOperations.includes(n) : this._describeOperations;
            if (!o || !s)
                return r;
            try {
                if ("mapReduce" === n) {
                    var u = Gn(e, 2)
                      , c = u[0]
                      , a = u[1];
                    i[o[0]] = "string" == typeof c ? c : c.name || "<anonymous>",
                    i[o[1]] = "string" == typeof a ? a : a.name || "<anonymous>"
                } else
                    for (var l = 0; l < o.length; l++)
                        i[o[l]] = JSON.stringify(e[l])
            } catch (t) {}
            return r
        }
        ,
        t.id = "Mongo",
        t
    }(), wo = Nn(Nn({}, Object.freeze({
        __proto__: null,
        Express: lo,
        Postgres: po,
        Mysql: mo,
        Mongo: bo
    })), {
        BrowserTracing: ao
    });
    (vo = pi()).g && (vo.g.extensions = vo.g.extensions || {},
    vo.g.extensions.startTransaction || (vo.g.extensions.startTransaction = Lr),
    vo.g.extensions.traceHeaders || (vo.g.extensions.traceHeaders = Pr)),
    Un() && function() {
        var t = pi();
        if (t.g) {
            var n = {
                mongodb: function() {
                    return new (Ln(module, "./integrations/node/mongo").Mongo)
                },
                mongoose: function() {
                    return new (Ln(module, "./integrations/node/mongo").Mongo)({
                        mongoose: !0
                    })
                },
                mysql: function() {
                    return new (Ln(module, "./integrations/node/mysql").Mysql)
                },
                pg: function() {
                    return new (Ln(module, "./integrations/node/postgres").Postgres)
                }
            }
              , e = Object.keys(n).filter((function(t) {
                return !!zn(t)
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
            e.length > 0 && (t.g.integrations = Pn(t.g.integrations || [], e))
        }
    }(),
    $e({
        callback: Mr,
        type: "error"
    }),
    $e({
        callback: Mr,
        type: "unhandledrejection"
    });
    const Xo = "prod"
      , xo = "staging"
      , ko = "dev"
      , Eo = function() {
        if ([Or, Ar].includes(location.hostname))
            return "18080" === location.port ? xo : Xo;
        return ko
    }()
      , To = h("Analytics");
    function So(t) {
        const n = [];
        var e;
        return Eo === Xo && (n.push(function(t, n) {
            function e() {
                dataLayer.push(arguments)
            }
            To("Initializing Google Analytics: " + t),
            window.dataLayer = window.dataLayer || [],
            e("js", new Date),
            e("set", "allow_google_signals", !1),
            e("set", "allow_ad_personalization_signals", !1),
            e("config", t, {
                send_page_view: !1,
                debug_mode: Eo !== Xo
            });
            const [i,r] = function(t) {
                const n = {}
                  , e = E.getItem(w);
                n.instrument = e || "unselected";
                let i = "web_app";
                t.isAndroid() ? i = t.getSourceAppStore() || "unknown_android_store" : t.isIos() ? i = "apple" : R(navigator.userAgent) ? i = "wechat_mini_program" : G(navigator.userAgent) && (i = "douyin_mini_program");
                n.app_store = i;
                const r = E.getJson(p);
                let o = r ? r.userCode : null;
                r && (n.is_member = r.isMember ? "yes" : "no");
                return [o, n]
            }(n);
            i && e("set", {
                user_id: i
            });
            Object.keys(r).length > 0 && e("set", {
                user_properties: r
            });
            return e("event", "page_view"),
            window.gtag = e,
            "https://www.googletagmanager.com/gtag/js?id=" + t
        }("G-8RWGD73K0X", t)),
        !t.hasNative() && (!R(e = navigator.userAgent) && G(e))),
        n
    }
    function jo(t) {
        xi(t)
    }
    function Co(t, n={}) {
        if (window.gtag) {
            const e = {}
              , i = j();
            return i.iVersion && (e.iVersion = i.iVersion),
            i.aVersion && (e.aVersion = i.aVersion),
            n.label && (e.event_label = n.label),
            n.category && (e.event_category = n.category),
            n.value && (e.value = n.value),
            window.gtag("event", t, e),
            void To(t, e)
        }
        To(t, n)
    }
    function Ao(t) {
        return new Promise(( (n, e) => {
            t.oncomplete = t.onsuccess = () => n(t.result),
            t.onabort = t.onerror = () => e(t.error)
        }
        ))
    }
    let Oo;
    function _o() {
        return Oo || (Oo = function(t, n) {
            const e = indexedDB.open(t);
            e.onupgradeneeded = () => e.result.createObjectStore(n);
            const i = Ao(e);
            return (t, e) => i.then((i => e(i.transaction(n, t).objectStore(n))))
        }("keyval-store", "keyval")),
        Oo
    }
    let Bo = !1;
    Mo().catch(( () => {}
    ));
    const Do = "hot-queries:instrument:";
    async function qo(t, n) {
        if (Fo())
            try {
                await Mo(),
                null == n ? await function(t, n=_o()) {
                    return n("readwrite", (n => (n.delete(t),
                    Ao(n.transaction))))
                }(t) : await function(t, n, e=_o()) {
                    return e("readwrite", (e => (e.put(n, t),
                    Ao(e.transaction))))
                }(t, n)
            } catch (t) {
                self.captureException && self.captureException(t)
            }
    }
    async function Io(t) {
        if (!Fo())
            return null;
        try {
            return await Mo(),
            function(t, n=_o()) {
                return n("readonly", (n => Ao(n.get(t))))
            }(t)
        } catch (t) {
            return self.captureException && self.captureException(t),
            null
        }
    }
    async function Mo() {
        var t;
        if (!Bo && Fo())
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
                Bo = !0
            } catch (t) {}
    }
    function Fo() {
        return !!window.indexedDB
    }
    const No = h("Event");
    let $o = null;
    const Ro = "scroll";
    function Go(t, n, e) {
        return t.addEventListener(n, e, !!function() {
            if (null != $o)
                return $o;
            try {
                const t = Object.defineProperty({}, "passive", {
                    get: function() {
                        $o = !0
                    }
                });
                window.addEventListener("testPassive", null, t),
                window.removeEventListener("testPassive", null, t)
            } catch (t) {}
            $o || No("Passive event not supported.");
            return $o
        }() && {
            passive: !0
        }),
        () => t.removeEventListener(n, e)
    }
    function Po(t, n) {
        return new Promise(( (e, i) => {
            const r = () => {
                t.removeEventListener(n, r),
                e()
            }
            ;
            t.addEventListener(n, r)
        }
        ))
    }
    const Uo = {}
      , Lo = ["AWSC"];
    async function zo(t) {
        return Uo[t] || (Uo[t] = new Promise((n => {
            self[t] ? n(Wo(t)) : n(function(t) {
                return Po(_t(`script[data-name=${t}]`), "load")
            }(t).then(( () => Wo(t))))
        }
        ))),
        Uo[t]
    }
    function Wo(t) {
        const n = self[t];
        return Lo.indexOf(t) < 0 && delete self[t],
        n
    }
    const Ho = function(t) {
        let n;
        return async (...e) => {
            n || (n = t(...e),
            ot(n instanceof Promise, "reusePendingTask: Task is not async!"));
            try {
                return await n
            } finally {
                n = null
            }
        }
    }((async function(t, n=!1) {
        try {
            const e = await yt(t, null, {
                allowNonLogin: !0,
                silent: n
            });
            return await e.json()
        } catch (t) {
            if (t instanceof ht && t.statusCode === Z)
                return Ko(),
                null;
            throw t
        }
    }
    ));
    function Jo() {
        return Qo(p)
    }
    async function Vo(t=!1) {
        if (!t && !E.getBoolean(y)) {
            const t = Qo(m);
            if (t)
                return t
        }
        const n = await Ho("/api/user/portfolio");
        return Zo(n),
        E.setBoolean(y, !1),
        n
    }
    function Ko() {
        Yo(null),
        Zo(null)
    }
    function Qo(t) {
        const n = E.getJson(t);
        return n && 0 !== Object.keys(n).length ? n : null
    }
    function Yo(t) {
        void 0 !== t && E.setJson(p, t)
    }
    function Zo(t) {
        void 0 !== t && E.setJson(m, t)
    }
    async function ts() {
        const {success: t} = await bt("/auth/logout");
        return t && Ko(),
        t
    }
    function ns() {}
    function es(t) {
        return t()
    }
    function is() {
        return Object.create(null)
    }
    function rs(t) {
        t.forEach(es)
    }
    function os(t) {
        return "function" == typeof t
    }
    function ss(t, n) {
        return t != t ? n == n : t !== n || t && "object" == typeof t || "function" == typeof t
    }
    function us(t, n, e) {
        t.$$.on_destroy.push(function(t, ...n) {
            if (null == t)
                return ns;
            const e = t.subscribe(...n);
            return e.unsubscribe ? () => e.unsubscribe() : e
        }(n, e))
    }
    function cs(t, n, e, i) {
        if (t) {
            const r = as(t, n, e, i);
            return t[0](r)
        }
    }
    function as(t, n, e, i) {
        return t[1] && i ? function(t, n) {
            for (const e in n)
                t[e] = n[e];
            return t
        }(e.ctx.slice(), t[1](i(n))) : e.ctx
    }
    function ls(t, n, e, i, r, o, s) {
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
            const r = as(n, e, i, s);
            t.p(r, u)
        }
    }
    function fs(t) {
        return t && os(t.destroy) ? t.destroy : ns
    }
    function hs(t, n) {
        t.appendChild(n)
    }
    function ds(t, n, e) {
        t.insertBefore(n, e || null)
    }
    function vs(t) {
        t.parentNode.removeChild(t)
    }
    function ps(t, n) {
        for (let e = 0; e < t.length; e += 1)
            t[e] && t[e].d(n)
    }
    function ms(t) {
        return document.createElement(t)
    }
    function gs(t) {
        return document.createTextNode(t)
    }
    function ys() {
        return gs(" ")
    }
    function bs() {
        return gs("")
    }
    function ws(t, n, e, i) {
        return t.addEventListener(n, e, i),
        () => t.removeEventListener(n, e, i)
    }
    function Xs(t, n, e) {
        null == e ? t.removeAttribute(n) : t.getAttribute(n) !== e && t.setAttribute(n, e)
    }
    function xs(t, n, e) {
        n in t ? t[n] = e : Xs(t, n, e)
    }
    function ks(t, n) {
        n = "" + n,
        t.wholeText !== n && (t.data = n)
    }
    function Es(t, n) {
        t.value = null == n ? "" : n
    }
    function Ts(t, n, e) {
        t.classList[e ? "add" : "remove"](n)
    }
    let Ss;
    function js(t) {
        Ss = t
    }
    function Cs() {
        if (!Ss)
            throw new Error("Function called outside component initialization");
        return Ss
    }
    function As(t) {
        Cs().$$.on_destroy.push(t)
    }
    function Os() {
        const t = Cs();
        return (n, e) => {
            const i = t.$$.callbacks[n];
            if (i) {
                const r = function(t, n) {
                    const e = document.createEvent("CustomEvent");
                    return e.initCustomEvent(t, !1, !1, n),
                    e
                }(n, e);
                i.slice().forEach((n => {
                    n.call(t, r)
                }
                ))
            }
        }
    }
    function _s(t, n) {
        const e = t.$$.callbacks[n.type];
        e && e.slice().forEach((t => t(n)))
    }
    const Bs = []
      , Ds = []
      , qs = []
      , Is = []
      , Ms = Promise.resolve();
    let Fs = !1;
    function Ns() {
        Fs || (Fs = !0,
        Ms.then(Us))
    }
    function $s(t) {
        qs.push(t)
    }
    function Rs(t) {
        Is.push(t)
    }
    let Gs = !1;
    const Ps = new Set;
    function Us() {
        if (!Gs) {
            Gs = !0;
            do {
                for (let t = 0; t < Bs.length; t += 1) {
                    const n = Bs[t];
                    js(n),
                    Ls(n.$$)
                }
                for (js(null),
                Bs.length = 0; Ds.length; )
                    Ds.pop()();
                for (let t = 0; t < qs.length; t += 1) {
                    const n = qs[t];
                    Ps.has(n) || (Ps.add(n),
                    n())
                }
                qs.length = 0
            } while (Bs.length);
            for (; Is.length; )
                Is.pop()();
            Fs = !1,
            Gs = !1,
            Ps.clear()
        }
    }
    function Ls(t) {
        if (null !== t.fragment) {
            t.update(),
            rs(t.before_update);
            const n = t.dirty;
            t.dirty = [-1],
            t.fragment && t.fragment.p(t.ctx, n),
            t.after_update.forEach($s)
        }
    }
    const zs = new Set;
    let Ws;
    function Hs() {
        Ws = {
            r: 0,
            c: [],
            p: Ws
        }
    }
    function Js() {
        Ws.r || rs(Ws.c),
        Ws = Ws.p
    }
    function Vs(t, n) {
        t && t.i && (zs.delete(t),
        t.i(n))
    }
    function Ks(t, n, e, i) {
        if (t && t.o) {
            if (zs.has(t))
                return;
            zs.add(t),
            Ws.c.push(( () => {
                zs.delete(t),
                i && (e && t.d(1),
                i())
            }
            )),
            t.o(n)
        }
    }
    function Qs(t, n, e) {
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
        i || $s(( () => {
            const n = o.map(es).filter(os);
            s ? s.push(...n) : rs(n),
            t.$$.on_mount = []
        }
        )),
        u.forEach($s)
    }
    function tu(t, n) {
        const e = t.$$;
        null !== e.fragment && (rs(e.on_destroy),
        e.fragment && e.fragment.d(n),
        e.on_destroy = e.fragment = null,
        e.ctx = [])
    }
    function nu(t, n, e, i, r, o, s=[-1]) {
        const u = Ss;
        js(t);
        const c = t.$$ = {
            fragment: null,
            ctx: null,
            props: o,
            update: ns,
            not_equal: r,
            bound: is(),
            on_mount: [],
            on_destroy: [],
            on_disconnect: [],
            before_update: [],
            after_update: [],
            context: new Map(u ? u.$$.context : n.context || []),
            callbacks: is(),
            dirty: s,
            skip_bound: !1
        };
        let a = !1;
        if (c.ctx = e ? e(t, n.props || {}, ( (n, e, ...i) => {
            const o = i.length ? i[0] : e;
            return c.ctx && r(c.ctx[n], c.ctx[n] = o) && (!c.skip_bound && c.bound[n] && c.bound[n](o),
            a && function(t, n) {
                -1 === t.$$.dirty[0] && (Bs.push(t),
                Ns(),
                t.$$.dirty.fill(0)),
                t.$$.dirty[n / 31 | 0] |= 1 << n % 31
            }(t, n)),
            e
        }
        )) : [],
        c.update(),
        a = !0,
        rs(c.before_update),
        c.fragment = !!i && i(c.ctx),
        n.target) {
            if (n.hydrate) {
                const t = function(t) {
                    return Array.from(t.childNodes)
                }(n.target);
                c.fragment && c.fragment.l(t),
                t.forEach(vs)
            } else
                c.fragment && c.fragment.c();
            n.intro && Vs(t.$$.fragment),
            Zs(t, n.target, n.anchor, n.customElement),
            Us()
        }
        js(u)
    }
    class eu {
        $destroy() {
            tu(this, 1),
            this.$destroy = ns
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
    function ou(t, n=ns) {
        let e;
        const i = [];
        function r(n) {
            if (ss(t, n) && (t = n,
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
            subscribe: function(o, s=ns) {
                const u = [o, s];
                return i.push(u),
                1 === i.length && (e = n(r) || ns),
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
    const su = function() {
        const {subscribe: t, set: n} = ou(void 0)
          , e = function() {
            let t = j().instrument || C().instrument;
            return O(t) || (t = E.getItem(w)),
            O(t) ? t : null
        }();
        e && n(e);
        return {
            subscribe: t,
            set: t => {
                A(t) && n(t)
            }
        }
    }();
    const uu = "#faf9f9"
      , cu = h("Fullscreen");
    const au = "WebView"
      , lu = h(au)
      , fu = d(au)
      , hu = "default"
      , du = "light"
      , vu = "dark"
      , pu = "portrait"
      , mu = "landscape"
      , gu = screen && screen.orientation && screen.orientation.lock
      , yu = "已将分享内容复制到了剪贴板";
    class bu {
        constructor() {
            this._ = new at,
            this.B = new at,
            this.D = new at,
            this.I = 0,
            this.M = {}
        }
        install(t) {
            if (this.F = t,
            t.webview = {
                trackEvent: Co,
                pause: () => {
                    this._.fire()
                }
                ,
                resume: t => {
                    this.B.fire(t)
                }
                ,
                destroy: () => {
                    this.D.fire()
                }
                ,
                onDataResponse: (t, n) => {
                    this.M[t] && this.M[t].resolve(n)
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
                this.N("start") || this.$("start") || lu("webview based app started")
            }
            ), 1)
        }
        isSupported(t) {
            lu("isSupported", t);
            let n = this.R();
            if (n)
                return n.isSupported ? n.isSupported(t) : !!n[t];
            if (n = this.G(),
            n) {
                let n = this.F.iosNativeApi;
                return n || (n = j().api,
                n = n ? n.split(",") : []),
                n = n.concat("exit", "openAppStore", "shareApp", "shareText"),
                n.indexOf(t) >= 0
            }
            return "lockScreenOrientation" === t ? gu : 0 !== t.indexOf("request") && (!["openWeComKefu", "setColorMode"].includes(t) && !!this[t])
        }
        isSharingSupported(t) {
            lu("isSharingSupported", t);
            let n = this.R();
            if (n)
                return !!n.isSharingSupported && n.isSharingSupported(t);
            if (n = this.G(),
            n && this.F.iosNativeData) {
                return (this.F.iosNativeData.sharingSupported || []).indexOf(t) >= 0
            }
            return !1
        }
        replacePage(t) {
            lu("replacePage", {
                path: t
            }),
            this.isSupported("replacePage") ? this.$("replacePage", {
                path: t
            }) || this.N("replacePage", t) || (history.replaceState(void 0, void 0, t),
            history.go(0)) : Vt.error("请升级到最新版本app")
        }
        keepScreenOn(t) {
            lu("keepScreenOn", t),
            this.N("keepScreenOn", t) || this.$("keepScreenOn", {
                enable: t
            })
        }
        async lockScreenOrientation(t) {
            lu("lockScreenOrientation", t),
            this.N("lockScreenOrientation", t) || this.$("lockScreenOrientation", {
                orientation: t
            }) || gu && (t === pu ? await async function() {
                cu("exitFullscreen"),
                (document.fullscreenElement || document.webkitFullscreenElement) && (document.exitFullscreen ? await document.exitFullscreen().catch(( () => {}
                )) : document.webkitExitFullscreen && await document.webkitExitFullscreen().catch(( () => {}
                )))
            }() : t === mu && await async function(t=document.documentElement) {
                cu("requestFullscreen"),
                t.requestFullscreen ? await t.requestFullscreen().catch(( () => {}
                )) : t.webkitRequestFullscreen && await t.webkitRequestFullscreen().catch(( () => {}
                ))
            }(),
            screen.orientation.lock(t).catch(( () => {}
            )))
        }
        print() {
            lu("print"),
            this.N("print") || this.$("print") || print()
        }
        getSystemInfo() {
            lu("getSystemInfo");
            const t = this.R();
            return t && t.getSystemInfo ? JSON.parse(t.getSystemInfo()) : this.G() && this.F.iosNativeData && this.F.iosNativeData.systemInfo || []
        }
        getSourceAppStore() {
            lu("getSourceAppStore");
            const t = this.R();
            return t && t.getSourceAppStore ? t.getSourceAppStore() : null
        }
        openAppStore() {
            lu("openAppStore"),
            this.N("openAppStore", "me.yoopu.app.songbook") || this.$("openAppStore", {
                appId: "973743727"
            })
        }
        openWeComKefu(t) {
            lu("openWeComKefu");
            const n = {
                url: t
            };
            this.N("openWeComKefu", n) || this.$("openWeComKefu", n)
        }
        shareApp() {
            lu("shareApp"),
            this.N("shareApp") || this.$("shareApp") || wu("推荐你琴谱app《有谱么》:" + new URL("/",location.href).href)
        }
        shareObject(t) {
            if (lu("shareObject", t),
            this.N("shareObject", t))
                return;
            if (this.$("shareObject", t))
                return;
            const {text: n, pageUrl: e} = t;
            wu(n + ` ( ${e} )`)
        }
        shareObjectTo(t) {
            if (lu("shareObjectTo", t),
            this.N("shareObjectTo", t))
                return;
            if (this.$("shareObjectTo", t))
                return;
            const {text: n, pageUrl: e} = t;
            wu(n + ` ( ${e} )`)
        }
        shareText({subject: t, text: n, url: e, imageSrc: i}) {
            lu("shareText");
            const r = {
                subject: t,
                text: n,
                url: e,
                imageSrc: i || q
            }
              , o = {
                subject: t,
                text: n + ` ( ${e} )`
            };
            this.N("shareText", o) || this.$("shareText", r) || wu(n + ` ( ${e} )`)
        }
        copyToClipboard(t) {
            if (lu("copyToClipboard", t),
            this.isAndroid() && this.isSupported("copyToClipboard"))
                return this.N("copyToClipboard", t),
                void Vt.show(yu);
            wu(t)
        }
        requestAuthToken(t) {
            return lu("requestAuthToken", t),
            this.P("requestAuthToken", {
                type: t
            })
        }
        requestWxPay(t) {
            lu("requestWxPay", t),
            this.N("requestWxPay", t)
        }
        requestApplePay(t) {
            lu("requestApplePay", t),
            this.$("requestApplePay", t)
        }
        requestAppleRestore() {
            lu("requestAppleRestore"),
            this.$("requestAppleRestore")
        }
        requestDeviceToken() {
            return lu("requestDeviceToken"),
            this.P("requestDeviceToken")
        }
        requestMuteStatus() {
            return lu("requestMuteStatus"),
            this.P("requestMuteStatus")
        }
        showInputKeyboard() {
            lu("showInputKeyboard"),
            this.N("showInputKeyboard")
        }
        setColorMode(t) {
            const n = "setColorMode";
            lu(n + ": " + t),
            this.N(n, t) || this.$(n, {
                colorMode: t
            })
        }
        getColorMode() {
            lu("getColorMode");
            let t = this.R();
            return t ? t.getColorMode ? t.getColorMode() : hu : (t = this.G(),
            t && this.F.iosNativeData && this.F.iosNativeData.colorMode || hu)
        }
        setColors(t) {
            const n = "setColors"
              , e = {
                background: uu,
                statusBar: uu,
                ...t
            };
            lu(n, e),
            this.N(n, e) || this.$(n, e)
        }
        saveValueIfNotExist(t, n) {
            const e = "saveValueIfNotExist";
            lu(e + ": " + t + "=" + n);
            const i = {
                key: t,
                value: n
            };
            this.N(e, i) || this.$(e, i)
        }
        saveValue(t, n) {
            const e = "saveValue";
            lu(e + ": " + t + "=" + n);
            const i = {
                key: t,
                value: n
            };
            this.N(e, i) || this.$(e, i)
        }
        readValue(t) {
            lu("readValue: " + t);
            let n = this.R();
            return n ? n.readValue ? n.readValue(t) : null : (n = this.G(),
            n && this.F.iosNativeData && this.F.iosNativeData.values ? this.F.iosNativeData.values[t] : null)
        }
        exit(t) {
            var n;
            (lu("exit"),
            this.N("exit")) || (this.$("exit") || (n = t,
            0 === document.referrer.indexOf(location.origin) ? n ? location = document.referrer : history.back() : location = "/main"))
        }
        kill() {
            lu("kill"),
            this.isSupported("kill") ? this.N("kill") || this.$("kill") || (location.href = "/") : this.exit(!0)
        }
        onPause(t) {
            return this._.add(t)
        }
        onResume(t) {
            return this.B.add(t)
        }
        onDestroy(t) {
            return this.D.add(t)
        }
        hasNative() {
            return !!this.R() || !!this.G()
        }
        isAndroid() {
            return !!this.R()
        }
        isIos() {
            return !!this.G()
        }
        R() {
            return this.F.native
        }
        G() {
            return this.F.webkit && this.F.webkit.messageHandlers && this.F.webkit.messageHandlers.native
        }
        P(t, n={}) {
            const e = this.I++
              , i = new kt;
            return this.M[e] = i,
            n.messageChannelId = e,
            this.N(t, n) || this.$(t, n) || lu(t, n),
            i.promise
        }
        N(t, n) {
            const e = this.R();
            if (!e)
                return !1;
            if (e[t])
                try {
                    void 0 === n ? e[t]() : e[t]("object" == typeof n ? JSON.stringify(n) : n)
                } catch (t) {
                    fu(t)
                }
            return !0
        }
        $(t, n={}) {
            const e = this.G();
            return !!e && (e.postMessage({
                action: t,
                data: n
            }),
            !0)
        }
    }
    function wu(t) {
        navigator.clipboard && navigator.clipboard.writeText(t).then(( () => {
            Vt.show(yu)
        }
        ), ( () => {
            Vt.error("剪贴板获取失败，请尝试升级app")
        }
        ))
    }
    let Xu, xu;
    function ku(t) {
        const n = t.isSupported("setColorMode");
        xu = n ? function(t) {
            const n = t.getColorMode() || hu
              , {subscribe: e, set: i} = ou(n);
            return {
                subscribe: e,
                set: n => {
                    t.setColorMode(n),
                    i(n)
                }
            }
        }(t) : function() {
            const {subscribe: t, set: n} = ou(Eu());
            return {
                subscribe: t,
                set: t => {
                    t === hu ? E.removeItem(X) : E.setItem(X, t),
                    n(t)
                }
            }
        }(),
        Xu = n ? function() {
            const [t,n] = Su();
            return ru(t, (t => n ? n(t) : () => {}
            ))
        }() : function(t) {
            let[n,e] = Su()
              , i = Eu();
            return ru(n, (r => {
                Tu(i, n, r);
                const o = t.subscribe((t => {
                    i = t,
                    Tu(i, n, r)
                }
                ));
                let s;
                return e && (s = e((t => {
                    n = t,
                    Tu(i, n, r)
                }
                ))),
                () => {
                    o(),
                    s && s()
                }
            }
            ))
        }(xu)
    }
    function Eu() {
        return E.getItem(X) || hu
    }
    function Tu(t, n, e) {
        t === hu ? e(n) : t === vu ? e(!0) : t === du && e(!1)
    }
    function Su() {
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
    const ju = h("Fetch")
      , Cu = self.document;
    let Au = 0;
    function Ou() {
        !function(t, n, e) {
            const i = pt.add(t)
              , r = mt.add(n)
              , o = gt.add(e)
        }(( ({url: t, init: n, options: e}) => {
            ju("request: " + t),
            e.silent || (Au++,
            Bu())
        }
        ), ( ({url: t, init: n, options: e, res: i}) => {
            ju("response: " + t),
            e.silent || _u()
        }
        ), ( ({url: t, init: n, options: e, error: i}) => {
            ju("rejection: " + t, i);
            const {silent: r, allowNonLogin: o} = e;
            if (!r) {
                let t;
                i instanceof ft || (i instanceof lt ? t = "网络超时" : i instanceof ht ? o && i.statusCode === Z || (t = i.message) : t = "无网络连接"),
                t && Vt.error(t),
                _u()
            }
        }
        ))
    }
    function _u() {
        Au--,
        st(300).then(( () => Bu()))
    }
    function Bu() {
        Au > 0 ? It(Cu.body, "loading") : Mt(Cu.body, "loading")
    }
    const Du = {};
    const qu = h("SW")
      , Iu = d("SW")
      , Mu = location.origin + "/";
    function Fu() {
        if ("https:" === location.protocol && "serviceWorker"in navigator) {
            const t = function() {
                if (location.search.indexOf("sw=1") > 0)
                    return !0;
                return !Nu() && $u() && !(0 === location.pathname.indexOf("/i/") || "/i" === location.pathname)
            }();
            qu("SW enabled = " + t),
            "function" == typeof navigator.serviceWorker.getRegistrations && navigator.serviceWorker.getRegistrations().then((function(n) {
                for (let e = 0; e < n.length; ++e)
                    t && n[e].scope === Mu || (qu("Unregistering SW", {
                        scope: n[e].scope
                    }),
                    n[e].unregister().catch((t => {
                        Iu(t, "Failed to unregister service worker.")
                    }
                    )))
            }
            )).catch((t => {
                Iu(t, "Failed to get service worker registration.")
            }
            )),
            t && (window.addEventListener("load", (function() {
                qu("Registering SW", {
                    scope: Mu
                }),
                navigator.serviceWorker.register("/sw.js").catch((t => {
                    Iu(t, "Failed to register service worker.")
                }
                ))
            }
            )),
            !Nu() && $u() && function() {
                let t;
                const n = document.querySelector("#addToHomeScreen");
                if (!n)
                    return;
                qu("initializeAddToHomePrompt"),
                window.addEventListener("beforeinstallprompt", (function(e) {
                    qu("beforeinstallprompt event"),
                    e.preventDefault(),
                    t = e,
                    n.classList.remove("hide")
                }
                )),
                window.addEventListener("appinstalled", (function() {
                    qu("appinstalled event"),
                    n.classList.add("hide")
                }
                )),
                self.addToHomeScreen = () => {
                    qu("addToHomeScreen event"),
                    t && t.prompt()
                }
            }())
        }
    }
    function Nu() {
        return 0 === location.pathname.indexOf("/e/")
    }
    function $u() {
        const t = [/Android/i, /iPhone/i, /iPad/i, /Windows Phone/i];
        for (let n = 0; n < t.length; ++n)
            if (navigator.userAgent.match(t[n]))
                return !0;
        return !1
    }
    const Ru = h("Application")
      , Gu = j()["no-tracking"];
    const Pu = ["A=1;X,0,2(1),2(2),2(3),0", "Am=1;X,0,2(2),2(3),1(1),0", "Adim=1;X,0,1(2),2(3),1(1),X", "Aaug=1;X,0,3(4),2(2),2(3),1(1)", "Amaj7=1;X,0,2(2),1(1),2(3),0", "Am7=1;X,0,2(2),0,1(1),0", "A7=1;X,0,2(2),0,2(3),0", "Adim7=1;X,0,1(1),2(3),1(2),2(4)", "AmM7=1;X,0,2(3),1(1),1(2),0", "Aaug7=0;X,0,3(4),0,2(3),1(2)", "Am7b5=1;X,0,1(1),2(3),1(2),3(4)", "Asus2=1;X,0,2(1),2(2),0,0", "Asus4=1;X,0,0,2(1),3(2),0", "A7sus2=1;X,0,2(1),0,0,0", "A7sus4=1;X,0,2(2),0,3(3),0", "A6=1;X,0,4(4),2(1),2(2),0", "Am6=1;X,0,2(2),2(3),1(1),2(4)", "Amaj9=1;X,0,X,4(2),2(1),4(3)", "Am9=1;X,0,2(2),4(4),1(1),3(3)", "A9=1;X,0,2(1),4(4),2(2),3(3)", "Aadd9=1;X,0,2(1),4(4),2(2),0", "Amadd9=1;X,0,2(2),4(4),1(1),0", "Aadd11=1;X,0,0,2(2),2(3),0", "A5=1;X,0,2(1),2(2),X,X", "A/C#=1;X,4(3),2(1),2(1),2(1),0", "A/E=1;0,0,2(1),2(1),2(1),0", "Bb=1;X,1(1),3(2),3(3),3(4),1(1)", "Bbm=1;X,1(1),3(3),3(4),2(2),1(1)", "Bbdim=1;X,1(1),2(2),3(4),2(3),0", "Bbaug=1;X,1(1),0,3(3),3(4),2(2)", "Bbmaj7=1;X,1(1),3(3),2(2),3(4),1(1)", "Bbm7=1;X,1(1),3(3),1(1),2(2),1(1)", "Bb7=1;X,1(1),3(3),1(1),3(4),1(1)", "Bbdim7=1;X,1(1),2(2),0,2(3),0", "BbmM7=1;X,1(1),3(4),2(2),2(3),1(1)", "Bbaug7=0;X,1(1),0,1(2),3(4),2(3)", "Bbm7b5=1;X,1(1),2(3),1(2),2(4),0", "Bbsus2=1;X,1(1),3(2),3(3),1(1),1(1)", "Bbsus4=1;X,1(1),1(1),3(2),4(3),1(1)", "Bb7sus2=1;X,1(1),3(3),1(1),1(1),1(1)", "Bb7sus4=1;X,1(1),1(1),1(1),4(4),1(1)", "Bb6=1;X,1(1),0,0,3(4),1(2)", "Bbm6=1;X,1(1),3(4),0,2(3),1(2)", "Bbmaj9=1;X,1(1),0,2(4),1(2),1(3)", "Bbm9=5;2(1),4(2),2(1),2(1),2(1),4(3)", "Bb9=1;X,1(1),0,1(2),1(3),1(4)", "Bbadd9=1;X,1(T),0,X,1(1),1(2)", "Bbmadd9=3;4(T),1(1),X,4(3),4(4),X", "Bbadd11=1;X,1(1),1(1),3(3),3(4),1(1)", "Bb5=1;X,1(1),3(3),3(4),X,X", "B=1;X,2(1),4(2),4(3),4(4),2(1)", "Bm=1;X,2(1),4(4),4(3),3(2),2(1)", "Bdim=1;X,2(2),0,4(4),3(3),1(1)", "Baug=1;X,2(2),1(1),0,0,3(3)", "Bmaj7=1;X,2(1),4(3),3(2),4(4),2(1)", "Bm7=1;X,2(1),4(4),2(1),3(2),2(1)", "B7=1;X,2(2),1(1),2(3),0,2(4)", "Bdim7=1;X,2(2),3(3),1(1),3(4),X", "BmM7=1;X,2(1),0,3(3),0,2(2)", "Baug7=0;X,2(2),1(1),2(3),0,3(4)", "Bm7b5=1;X,2(1),3(3),2(2),3(4),X", "Bsus2=1;X,2(1),4(2),4(3),2(1),2(1)", "Bsus4=2;X,1(1),1(1),3(2),4(3),1(1)", "B7sus2=1;X,2(1),4(2),2(1),2(1),2(1)", "B7sus4=1;X,2(1),4(3),2(1),5(4),2(1)", "B6=1;X,2(3),1(1),1(2),0,2(4)", "Bm6=1;X,2(2),0,1(1),0,2(3)", "Bmaj9=1;X,2(2),1(1),3(4),2(3),X", "Bm9=1;X,2(1),0,2(2),2(3),2(4)", "B9=1;X,2(2),1(1),2(3),2(4),X", "Badd9=0;X,2(2),1(1),X,2(3),2(4)", "Bmadd9=1;X,2(T),0,4(3),2(1),2(1)", "Badd11=1;X,2(1),2(1),4(3),4(4),2(1)", "B5=1;X,2(1),4(3),4(4),X,X", "C=1;X,3(3),2(2),0,1(1),0", "Cm=3;X,1(1),3(3),3(4),2(2),1(1)", "Cdim=3;X,1(1),2(2),3(4),2(3),X", "Caug=1;X,3(4),2(3),1(1),1(2),0", "Cmaj7=1;X,3(2),2(1),0,0,0", "Cm7=3;X,1(1),3(3),1(1),2(2),1(1)", "C7=1;X,3(3),2(2),3(4),1(1),0", "Cdim7=1;X,3(2),4(3),2(1),4(4),X", "CmM7=1;X,3(2),1(1),0,0,3(3)", "Caug7=1;X,3(2),2(1),3(3),X,4(4)", "Cm7b5=3;X,1(1),2(3),1(2),2(4),X", "Csus2=1;X,3(T),0,0,3(2),3(3)", "Csus4=1;X,3(3),3(4),0,1(1),1(1)", "C7sus2=1;X,3(2),0,3(3),1(1),3(4)", "C7sus4=2;X,2(1),4(3),2(1),5(4),2(1)", "C6=1;X,3(T),2(2),2(3),1(1),3(4)", "Cm6=1;X,3(T),1(1),2(3),1(2),X", "Cmaj9=1;X,3(2),2(1),4(4),3(3),0", "Cm9=1;X,3(1),0,3(2),4(4),3(3)", "C9=1;X,3(2),2(1),3(3),3(3),3(3)", "Cadd9=1;X,3(2),2(1),0,3(3),0", "Cmadd9=1;X,3(1),0,0,4(3),3(2)", "Cadd11=1;X,3(3),2(2),0,1(1),1(1)", "C5=2;X,2(1),4(3),4(4),X,X", "C/E=1;0,3(3),2(2),0,1(1),0", "C/G=1;3(3),3(4),2(2),0,1(1),0", "C#=1;X,4(3),3(2),X,2(1),4(4)", "C#m=4;X,1(1),3(3),3(4),2(2),1(1)", "C#dim=1;X,4(4),2(1),0,2(2),0", "C#aug=2;X,3(4),2(3),1(1),1(2),X", "C#maj7=4;X,1(1),3(3),2(2),3(4),1(1)", "C#m7=4;X,1(1),3(3),1(1),2(2),1(1)", "C#7=2;X,3(3),2(2),3(4),1(1),X", "C#dim7=1;X,4(2),5(3),3(1),5(4),X", "C#mM7=1;X,4(4),2(2),1(1),1(1),0", "C#aug7=2;X,3(2),2(1),3(3),0,4(4)", "C#m7b5=4;X,1(1),2(3),1(2),2(4),0", "C#sus2=1;X,4(T),1(1),1(1),2(2),4(4)", "C#sus4=4;X,1(1),1(1),3(2),4(3),1(1)", "C#7sus2=4;X,1(T),3(3),1(1),1(1),1(1)", "C#7sus4=4;X,1(1),1(1),1(1),4(4),1(1)", "C#6=1;X,4(3),3(1),3(2),X,4(4)", "C#m6=2;X,3(T),1(1),2(3),1(2),0", "C#maj9=1;X,4(2),3(1),5(4),4(3),X", "C#m9=1;X,4(4),1(1),1(1),0,0", "C#9=2;X,3(2),2(1),3(3),3(3),X", "C#add9=1;X,4(3),3(2),1(1),4(4),X", "C#madd9=1;X,4(4),1(1),1(1),2(2),0", "C#add11=1;X,4(T),3(2),X,2(1),2(1)", "C#5=3;X,2(1),4(3),4(4),X,X", "D=1;X,X,0,2(1),3(3),2(2)", "Dm=1;X,X,0,2(2),3(3),1(1)", "Ddim=1;X,X,0,1(1),3(4),1(2)", "Daug=1;X,X,0,3(2),3(3),2(1)", "Dmaj7=1;X,X,0,2(1),2(2),2(3)", "Dm7=1;X,X,0,2(3),1(1),1(2)", "D7=1;X,X,0,2(2),1(1),2(3)", "Ddim7=1;X,X,0,1(1),0,1(2)", "DmM7=1;X,X,0,2(2),2(3),1(1)", "Daug7=1;X,X,0,3(3),1(1),2(2)", "Dm7b5=1;X,X,0,1(1),1(2),1(3)", "Dsus2=1;X,X,0,2(1),3(2),0", "Dsus4=1;X,X,0,2(1),3(2),3(3)", "D7sus2=1;X,X,0,2(2),1(1),0", "D7sus4=1;X,X,0,2(2),1(1),3(3)", "D6=1;X,X,0,2(1),0,2(2)", "Dm6=1;X,X,0,2(2),0,1(1)", "Dmaj9=1;X,5(2),4(1),6(4),5(3),0", "Dm9=3;X,3(2),1(1),3(3),3(3),3(3)", "D9=3;X,3(2),2(1),3(3),3(3),3(3)", "Dadd9=2;X,4(3),3(2),1(1),4(4),0", "Dmadd9=2;X,4(T),2(1),X,4(3),4(4)", "Dadd11=2;X,4(3),3(2),0,2(1),X", "D5=1;X,X,0,2(1),3(2),X", "D/F#=1;2(T),0,0,2(1),3(3),2(2)", "D/A=1;X,0,0,2(1),3(3),2(2)", "Eb=1;X,X,1(1),3(2),4(4),3(3)", "Ebm=1;X,X,1(1),3(3),4(4),2(2)", "Ebdim=1;X,X,1(1),2(2),X,2(3)", "Ebaug=1;X,X,1(1),4(3),4(4),3(2)", "Ebmaj7=1;X,X,1(1),3(2),3(3),3(4)", "Ebm7=1;X,X,1(1),3(4),2(2),2(3)", "Eb7=1;X,X,1(1),3(3),2(2),3(4)", "Ebdim7=1;X,X,1(1),2(3),1(2),2(4)", "EbmM7=1;X,X,1(1),3(3),3(4),2(2)", "Ebaug7=1;X,X,1(1),4(4),2(2),3(3)", "Ebm7b5=1;X,X,1(1),2(2),2(3),2(4)", "Ebsus2=1;X,X,1(1),3(2),4(3),1(1)", "Ebsus4=1;X,X,1(1),3(2),4(3),4(4)", "Eb7sus2=1;X,X,1(1),3(3),2(2),1(1)", "Eb7sus4=1;X,X,1(1),3(3),2(2),4(4)", "Eb6=1;X,X,1(1),3(2),1(1),3(3)", "Ebm6=1;X,X,1(1),3(3),1(1),2(2)", "Ebmaj9=1;X,X,1(1),0,3(4),1(2)", "Ebm9=4;X,3(T),1(1),3(3),3(3),3(3)", "Eb9=1;X,X,1(1),0,2(3),1(2)", "Ebadd9=3;X,4(3),3(2),1(1),4(4),4(4)", "Ebmadd9=3;X,4(2),2(1),X,4(3),4(4)", "Ebadd11=4;X,3(T),2(2),X,1(1),1(1)", "Eb5=1;X,X,1(1),3(3),4(4),X", "E=1;0,2(2),2(3),1(1),0,0", "Em=1;0,2(2),2(3),0,0,0", "Edim=1;0,1(1),2(2),0,X,0", "Eaug=1;0,3(4),2(3),1(1),1(2),0", "Emaj7=1;0,2(3),1(1),1(2),0,0", "Em7=1;0,2(1),2(2),0,3(3),0", "E7=1;0,2(2),0,1(1),0,0", "Edim7=0;0,1(1),2(2),0,2(3),0", "EmM7=1;0,2(2),1(1),0,0,0", "Eaug7=1;0,3(3),2(2),1(1),3(4),0", "Em7b5=1;0,1(1),2(2),0,3(3),0", "Esus2=1;0,2(1),4(3),4(4),0,0", "Esus4=1;0,0,2(1),2(2),0,0", "E7sus2=1;0,2(1),4(3),4(4),3(2),0", "E7sus4=1;0,0,0,2(1),0,0", "E6=1;0,4(4),2(2),1(1),0,0", "Em6=1;0,4(2),2(1),0,0,0", "Emaj9=1;0,2(T),1(1),1(2),0,2(4)", "Em9=1;0,2(1),4(3),0,3(2),0", "E9=1;0,2(2),4(4),1(1),3(3),0", "Eadd9=1;0,2(2),4(4),1(1),0,0", "Emadd9=1;0,2(1),4(2),0,0,0", "Eadd11=1;0,0,2(2),1(1),0,0", "E5=0;0,2(1),2(2),X,X,X", "E/G#=2;3(2),1(1),X,3(3),4(4),0", "E/B=0;X,2(2),2(3),1(1),0,0", "F=1;1(1),3(3),3(4),2(2),1(1),1(1)", "Fm=1;1(1),3(2),3(3),1(1),1(1),1(1)", "Fdim=1;1(T),X,3(4),1(1),0,1(2)", "Faug=1;X,X,3(4),2(2),2(3),1(1)", "Fmaj7=1;1(T),0,3(3),2(2),1(1),0", "Fm7=1;1(T),X,1(1),1(2),1(3),X", "F7=1;1(1),3(3),1(1),2(2),1(1),1(1)", "Fdim7=0;1(1),X,0,1(2),0,1(3)", "FmM7=1;1(1),3(3),2(2),1(1),1(1),1(1)", "Faug7=0;1(T),0,1(1),2(3),2(4),1(2)", "Fm7b5=1;1(T),X,1(2),1(3),0,X", "Fsus2=1;1(T),X,3(3),0,1(1),3(4)", "Fsus4=1;1(1),1(1),3(2),3(3),1(1),1(1)", "F7sus2=2;X,X,2(1),4(3),3(2),2(1)", "F7sus4=1;1(1),1(1),1(1),3(2),1(1),1(1)", "F6=1;1(1),0,0,2(4),1(2),1(3)", "Fm6=1;1(1),3(2),3(3),1(1),3(4),1(1)", "Fmaj9=1;1(T),0,2(4),0,1(2),1(3)", "Fm9=1;1(1),3(2),1(1),1(1),1(1),3(3)", "F9=1;1(1),0,1(2),0,1(3),1(4)", "Fadd9=1;1(T),0,3(3),2(2),1(1),3(4)", "Fmadd9=1;X,X,3(2),0,1(1),4(3)", "Fadd11=1;1(1),1(1),3(3),2(2),1(1),1(1)", "F5=1;1(1),3(3),3(4),X,X,X", "F#=1;2(1),4(3),4(4),3(2),2(1),2(1)", "F#m=1;2(1),4(2),4(3),2(1),2(1),2(1)", "F#dim=1;2(T),0,4(4),2(2),1(1),X", "F#aug=1;X,X,4(4),3(2),3(3),2(1)", "F#maj7=1;2(1),4(4),3(2),3(3),2(1),2(1)", "F#m7=1;2(T),X,2(1),2(2),2(3),0", "F#7=1;2(1),4(3),2(1),3(2),2(1),2(1)", "F#dim7=1;2(T),0,1(1),2(3),1(2),X", "F#mM7=1;2(1),4(3),3(2),2(1),2(1),2(1)", "F#aug7=0;2(T),X,2(1),3(3),3(4),2(2)", "F#m7b5=1;2(T),0,2(2),2(3),1(1),0", "F#sus2=1;X,X,4(T),1(1),2(2),2(3)", "F#sus4=1;2(1),2(1),4(2),4(3),2(1),2(1)", "F#7sus2=1;X,X,4(T),1(1),2(2),0", "F#7sus4=1;2(1),2(1),2(1),4(2),2(1),2(1)", "F#6=0;2(T),X,1(1),3(3),2(2),X", "F#m6=1;2(1),4(2),4(3),2(1),4(4),2(1)", "F#maj9=1;2(T),1(1),X,1(2),2(3),1(2)", "F#m9=1;2(T),0,X,1(2),2(3),0", "F#9=1;2(1),4(3),2(1),3(2),2(1),4(4)", "F#add9=1;X,X,4(3),3(2),2(1),4(4)", "F#madd9=1;X,X,4(2),2(1),2(1),4(3)", "F#add11=2;1(1),1(1),3(3),2(2),1(1),1(1)", "F#5=1;2(1),4(3),4(4),X,X,X", "G=1;3(2),2(1),0,0,0,3(3)", "Gm=3;1(1),3(3),3(4),1(1),1(1),1(1)", "Gdim=3;1(T),2(2),3(3),1(1),X,X", "Gaug=1;3(3),2(2),1(1),0,0,3(4)", "Gmaj7=1;3(3),2(1),0,0,0,2(2)", "Gm7=2;2(1),4(3),2(1),2(1),2(1),2(1)", "G7=1;3(3),2(2),0,0,0,1(1)", "Gdim7=1;3(T),X,2(1),3(3),2(2),0", "GmM7=1;3(T),X,0,3(2),3(3),2(1)", "Gaug7=1;3(T),2(3),1(2),0,0,1(1)", "Gm7b5=0;3(T),X,3(3),3(2),2(1),X", "Gsus2=1;3(3),0,0,2(1),3(2),3(4)", "Gsus4=1;3(2),3(3),0,0,1(1),3(4)", "G7sus2=1;3(1),0,3(2),0,3(3),3(4)", "G7sus4=1;3(3),X,3(4),0,1(1),X", "G6=1;3(2),2(1),0,0,0,0", "Gm6=1;3(2),1(1),0,0,3(3),0", "Gmaj9=1;3(2),0,0,0,0,2(1)", "Gm9=1;3(2),0,0,3(3),3(4),1(1)", "G9=1;3(2),0,0,0,0,1(1)", "Gadd9=1;3(3),0,0,2(2),0,3(4)", "Gmadd9=1;3(1),0,0,3(2),3(3),3(4)", "Gadd11=1;3(3),2(2),0,0,1(1),3(4)", "G5=0;X,X,X,0,3(3),3(3)", "G/B=1;X,2(1),0,0,3(3),3(4)", "G/D=1;X,X,0,0,0,3(3)", "G#=1;4(3),3(2),1(1),1(1),1(1),4(4)", "G#m=3;2(1),4(2),4(3),2(1),2(1),2(1)", "G#dim=1;4(4),2(2),0,1(1),0,X", "G#aug=3;X,X,4(4),3(2),3(3),2(1)", "G#maj7=4;1(T),X,2(2),2(3),1(1),X", "G#m7=0;4(1),X,4(2),4(3),4(4),X", "G#7=1;4(4),3(3),1(1),1(1),1(1),2(2)", "G#dim7=1;4(T),X,3(1),4(3),3(2),X", "G#mM7=1;4(T),X,X,4(2),4(3),3(1)", "G#aug7=4;1(T),X,1(1),2(2),2(3),X", "G#m7b5=1;4(T),X,4(3),4(2),3(1),X", "G#sus2=1;4(T),1(1),X,X,4(4),4(4)", "G#sus4=3;2(1),2(1),4(2),4(3),2(1),2(1)", "G#7sus2=1;4(T),1(1),X,X,4(4),2(2)", "G#7sus4=3;2(1),2(1),2(1),4(2),2(1),2(1)", "G#6=1;4(3),3(2),1(1),1(1),1(1),1(1)", "G#m6=1;4(T),X,3(1),4(2),4(3),X", "G#maj9=1;4(T),1(1),1(2),0,1(3),X", "G#m9=3;2(1),4(2),2(1),2(1),2(1),4(3)", "G#9=1;4(T),1(1),1(1),1(1),1(1),2(2)", "G#add9=1;4(T),3(1),X,3(2),4(3),X", "G#madd9=1;4(T),2(1),X,3(2),4(3),X", "G#add11=2;3(3),2(2),X,X,1(1),3(4)", "G#5=3;2(1),4(3),4(4),X,X,X"]
      , Uu = ["A=1;2(2),1(1),0,0", "Am=1;2(2),0,0,0", "A7=1;0,1(1),0,0", "Am7=1;0,0,0,0", "Amaj7=1;1(1),1(2),0,0", "Adim=2;1(1),2(2),4(4),2(3)", "Asus2=2;1(1),3(3),4(4),1(1)", "Asus4=1;2(1),2(2),0,0", "Bb=1;3(3),2(2),1(1),1(1)", "Bbm=1;3(3),1(1),1(1),1(1)", "Bb7=1;1(1),2(2),1(1),1(1)", "Bbm7=1;1(1),1(1),1(1),1(1)", "Bbmaj7=1;3(3),2(2),1(1),0", "Bbdim=1;3(4),1(1),0,1(2)", "Bbsus2=1;3(3),0,1(1),1(1)", "Bbsus4=1;3(3),3(4),1(1),1(1)", "B=1;4(3),3(2),2(1),2(1)", "Bm=1;4(3),2(1),2(1),2(1)", "B7=1;2(1),3(2),2(1),2(1)", "Bm7=1;2(1),2(1),2(1),2(1)", "Bmaj7=1;3(2),3(2),2(1),2(1)", "Bdim=1;4(4),2(2),1(1),2(3)", "Bsus2=1;4(4),1(1),2(2),2(3)", "Bsus4=1;4(2),4(4),2(1),2(1)", "C=1;0,0,0,3(3)", "Cm=1;0,3(1),3(2),3(3)", "C7=1;0,0,0,1(1)", "Cm7=1;3(1),3(1),3(1),3(1)", "Cmaj7=1;0,0,0,2(1)", "Cdim=1;0,3(3),2(2),3(4)", "Csus2=1;0,2(1),3(2),3(3)", "Csus4=1;0,0,1(1),3(3)", "C#=1;1(1),1(1),1(1),4(4)", "C#m=1;1(1),4(3),4(3),4(3)", "C#7=1;1(1),1(1),1(1),2(2)", "C#m7=1;4(1),4(1),4(1),4(1)", "C#maj7=1;1(1),1(1),1(1),3(3)", "C#dim=1;0,1(1),0,4(4)", "C#sus2=1;1(1),3(2),4(3),4(3)", "C#sus4=1;1(1),1(1),2(2),4(4)", "D=1;2(1),2(2),2(3),0", "Dm=1;2(2),2(3),1(1),0", "D7=1;2(1),0,2(2),0", "Dm7=1;2(2),2(3),1(1),3(4)", "Dmaj7=1;2(1),2(1),2(1),4(2)", "Ddim=1;1(1),2(3),1(2),0", "Dsus2=1;2(1),2(2),0,0", "Dsus4=1;0,2(1),3(2),0", "Eb=1;0,3(2),3(2),1(1)", "Ebm=1;3(3),3(4),2(2),1(1)", "Eb7=1;3(1),3(1),3(1),4(2)", "Ebm7=1;3(2),3(3),2(1),4(4)", "Ebmaj7=2;2(1),2(1),2(1),4(2)", "Ebdim=1;2(1),3(3),2(2),0", "Ebsus2=1;3(2),3(3),1(1),1(1)", "Ebsus4=1;1(1),3(3),4(4),1(1)", "E=1;4(2),4(3),4(4),2(1)", "Em=1;0,4(3),3(2),2(1)", "E7=1;1(1),2(2),0,2(3)", "Em7=1;0,2(1),0,2(2)", "Emaj7=1;1(1),3(3),0,2(2)", "Edim=1;0,4(3),0,1(1)", "Esus2=1;4(3),4(4),2(1),2(1)", "Esus4=1;2(2),4(4),0,2(1)", "F=1;2(2),0,1(1),0", "Fm=1;1(1),0,1(2),3(4)", "F7=1;2(2),3(3),1(1),0", "Fm7=1;1(1),3(3),1(2),3(4)", "Fmaj7=1;2(2),4(4),1(1),3(3)", "Fdim=1;1(1),X,1(2),2(3)", "Fsus2=1;0,0,1(1),3(3)", "Fsus4=1;3(3),0,1(1),1(2)", "F#=1;3(3),1(1),2(2),1(1)", "F#m=1;2(2),1(1),2(3),0", "F#7=1;3(2),4(3),2(1),4(4)", "F#m7=1;2(1),4(3),2(2),4(4)", "F#maj7=2;2(2),4(4),1(1),3(3)", "F#dim=1;2(2),0,2(3),0", "F#sus2=1;1(1),1(1),2(2),4(4)", "F#sus4=1;4(4),1(1),2(2),2(3)", "G=1;0,2(1),3(3),2(2)", "Gm=1;0,2(2),3(3),1(1)", "G7=1;0,2(2),1(1),2(3)", "Gm7=1;0,2(2),1(1),1(1)", "Gmaj7=1;0,2(1),2(2),2(3)", "Gdim=1;0,1(1),3(4),1(2)", "Gsus2=1;0,2(1),3(3),0", "Gsus4=1;0,2(1),3(3),3(4)", "G#=2;4(3),2(1),3(2),2(1)", "G#m=1;4(3),3(2),4(4),2(1)", "G#7=1;1(1),3(3),2(2),3(4)", "G#m7=1;1(1),3(4),2(2),2(3)", "G#maj7=1;1(1),3(3),3(3),3(3)", "G#dim=1;1(1),2(2),X,2(3)", "G#sus2=1;1(1),3(3),4(4),1(1)", "G#sus4=1;1(1),3(2),4(3),4(3)", "A7sus4=1;0,2(2),0,0", "AmM7=1;1(1),0,0,0", "Adim7=1;2(1),3(3),2(2),3(4)", "A6=1;2(1),4(3),2(2),4(4)", "Aaug=1;2(2),1(1),1(1),4(4)", "Am6=1;2(1),4(3),2(1),3(2)", "A9=1;0,1(1),0,2(2)", "Aadd9=1;2(2),1(1),0,2(3)", "Bb7sus4=1;1(1),3(3),1(1),1(1)", "BbmM7=1;2(2),1(1),1(1),1(1)", "Bbdim7=1;0,1(1),0,1(2)", "Bb6=1;0,2(2),1(1),1(1)", "Bbm6=1;0,1(1),1(1),1(1)", "Bbaug=2;2(2),1(1),1(1),4(4)", "Bb9=1;1(2),2(1),1(4),3(3)", "Bbadd9=1;3(3),2(2),1(1),3(4)", "Bbm7-5=1;1(1),1(2),0,1(3)", "Bm6=1;1(1),2(2),2(3),2(4)", "B7sus4=1;2(1),4(3),2(1),2(1)", "BmM7=1;3(2),2(1),2(1),2(1)", "Bdim7=1;1(1),2(3),1(2),2(4)", "B6=1;1(1),3(4),2(2),2(3)", "Baug=1;4(4),3(2),3(3),2(1)", "B9=1;2(1),3(3),2(2),4(4)", "Badd9=1;4(3),3(2),2(1),4(4)", "C7sus4=1;0,0,1(1),1(1)", "CmM7=1;4(2),3(1),3(1),3(1)", "Cdim7=1;2(1),3(3),2(2),3(4)", "C6=1;0,0,0,0", "Cm6=1;2(1),3(3),3(3),3(3)", "Caug=1;1(1),0,0,3(4)", "C9=1;0,2(2),0,1(1)", "Cadd9=1;0,2(1),0,3(3)", "C#7sus4=1;1(1),1(1),2(2),2(3)", "C#mM7=1;1(1),0,0,4(4)", "C#dim7=1;0,1(1),0,1(2)", "C#6=1;1(1),1(1),1(1),1(1)", "C#m6=1;1(1),1(2),0,1(3)", "C#aug=1;2(2),1(1),1(1),4(4)", "C#9=1;1(1),3(4),1(2),2(3)", "C#add9=1;1(1),3(3),1(1),4(4)", "Dm6=1;0,2(2),1(1),2(3)", "D7sus4=1;2(1),2(2),3(3),3(4)", "DmM7=1;2(2),2(3),1(1),4(4)", "Ddim7=1;1(1),2(3),1(2),2(4)", "D6=1;2(2),2(2),2(2),2(2)", "Daug=2;2(2),1(1),1(1),4(4)", "D9=1;2(1),4(4),2(2),3(3)", "Dadd9=2;1(1),3(3),1(1),4(4)", "Eb7sus4=1;3(1),3(1),4(2),4(3)", "EbmM7=2;2(2),2(3),1(1),4(4)", "Ebdim7=1;2(1),3(3),2(2),3(4)", "Eb6=1;3(1),3(1),3(1),3(1)", "Ebm6=1;3(2),3(3),2(1),3(4)", "Ebaug=1;0,3(2),3(2),2(1)", "Eb9=1;0,1(1),1(2),1(3)", "Ebadd9=1;0,3(3),1(1),1(1)", "E7sus4=1;2(2),2(3),0,2(4)", "Em6=1;4(2),4(3),3(1),4(4)", "EmM7=1;0,3(2),0,2(1)", "Edim7=1;0,1(1),0,1(2)", "E6=1;4(1),4(1),4(1),4(1)", "Eaug=1;1(1),0,0,3(4)", "E9=1;1(1),2(2),2(3),2(4)", "Eadd9=1;1(1),4(4),2(2),2(3)", "F7sus4=1;3(2),3(3),1(1),3(4)", "Fm6=1;1(1),2(2),1(1),3(3)", "FmM7=1;1(1),4(4),1(1),3(3)", "Fdim7=1;1(1),2(3),1(2),2(4)", "F6=1;2(2),2(3),1(1),3(4)", "F6sus2=1;0,0,1(1),3(3)", "F6sus4=1;3(3),0,1(1),1(1)", "F6aug=1;2(2),1(1),1(1),4(4)", "F9=1;2(1),3(2),3(3),3(4)", "Faug=1;2(3),1(1),1(2),0", "Fadd9=1;0,0,1(1),0", "F#7sus4=1;4(2),4(3),2(1),4(4)", "F#mM7=2;1(1),4(4),1(1),3(3)", "F#dim7=1;2(1),3(3),2(2),3(4)", "F#m6=1;2(2),1(1),2(3),4(4)", "F#6=1;3(2),3(3),2(1),4(4)", "F#aug=2;2(2),1(1),1(1),4(4)", "F#9=1;1(1),1(2),0,1(3)", "F#add9=1;1(1),1(1),2(2),1(1)", "Gm6=1;0,2(2),0,1(1)", "G7sus4=1;0,2(2),1(1),3(4)", "GmM7=1;0,2(2),2(3),1(1)", "Gdim7=1;0,1(1),0,1(2)", "G6=1;0,2(1),0,2(2)", "Gaug=1;0,3(2),3(3),2(1)", "G9=1;2(2),2(3),1(1),2(4)", "Gadd9=1;2(1),2(1),3(2),2(1)", "G#7sus4=1;1(1),3(3),2(2),4(4)", "G#mM7=1;0,3(2),4(3),2(1)", "G#dim7=1;1(1),2(3),1(2),2(4)", "G#6=1;1(1),3(3),1(2),3(4)", "G#m6=1;1(1),3(3),1(1),2(2)", "G#aug=1;1(1),0,0,3(4)", "G#9=1;1(1),0,2(3),1(2)", "G#add9=1;3(1),3(1),4(2),3(1)", "C-F=1;2(2),0,1(1),3(3)", "D/A=1;2(1),2(2),2(3),0", "Dm/C=1;2(2),2(3),1(1),3(4)", "Fm7/C=1;1(1),3(3),1(2),3(4)", "G/B=1;0,2(1),3(3),2(2)", "G/F#=1;0,2(1),2(2),2(3)", "G/F=1;0,2(2),1(1),2(3)", "G7/B=1;0,2(2),1(1),2(3)"];
    const Lu = t => ({})
      , zu = t => ({});
    function Wu(t) {
        let n, e;
        return {
            c() {
                n = ms("div"),
                e = gs(t[2]),
                Xs(n, "class", "title svelte-ezjm8c")
            },
            m(t, i) {
                ds(t, n, i),
                hs(n, e)
            },
            p(t, n) {
                4 & n && ks(e, t[2])
            },
            d(t) {
                t && vs(n)
            }
        }
    }
    function Hu(t) {
        let n, e;
        return {
            c() {
                n = ms("div"),
                Xs(n, "class", "arrow svelte-ezjm8c"),
                Xs(n, "style", e = t[10].arrow),
                Xs(n, "position", t[8])
            },
            m(t, e) {
                ds(t, n, e)
            },
            p(t, i) {
                1024 & i && e !== (e = t[10].arrow) && Xs(n, "style", e),
                256 & i && Xs(n, "position", t[8])
            },
            d(t) {
                t && vs(n)
            }
        }
    }
    function Ju(t) {
        let n, e, i, r, o, s, u, c, a, l, f;
        const h = t[15].default
          , d = cs(h, t, t[14], null);
        let v = t[2] && Wu(t);
        const p = t[15].content
          , m = cs(p, t, t[14], zu);
        let g = t[1] && Hu(t);
        return {
            c() {
                n = ms("div"),
                e = ms("div"),
                d && d.c(),
                i = ys(),
                r = ms("div"),
                o = ms("div"),
                v && v.c(),
                s = ys(),
                m && m.c(),
                u = ys(),
                g && g.c(),
                Xs(e, "class", "anchor"),
                Xs(o, "class", "content svelte-ezjm8c"),
                Ts(o, "no-padding", !t[4]),
                Xs(r, "class", "wrapper svelte-ezjm8c"),
                Xs(r, "style", c = t[10].wrapper),
                Ts(r, "theme", t[3]),
                Ts(r, "show", t[0]),
                Xs(n, "class", "popover svelte-ezjm8c")
            },
            m(c, h) {
                ds(c, n, h),
                hs(n, e),
                d && d.m(e, null),
                t[16](e),
                hs(n, i),
                hs(n, r),
                hs(r, o),
                v && v.m(o, null),
                hs(o, s),
                m && m.m(o, null),
                hs(o, u),
                g && g.m(o, null),
                t[17](r),
                a = !0,
                l || (f = [ws(e, "mouseenter", t[13]), ws(r, "mouseenter", t[18]), ws(r, "click", t[19]), ws(r, "mouseleave", t[20]), ws(n, "mouseenter", t[11]), ws(n, "mouseleave", t[12])],
                l = !0)
            },
            p(t, [n]) {
                d && d.p && 16384 & n && ls(d, h, t, t[14], n, null, null),
                t[2] ? v ? v.p(t, n) : (v = Wu(t),
                v.c(),
                v.m(o, s)) : v && (v.d(1),
                v = null),
                m && m.p && 16384 & n && ls(m, p, t, t[14], n, Lu, zu),
                t[1] ? g ? g.p(t, n) : (g = Hu(t),
                g.c(),
                g.m(o, null)) : g && (g.d(1),
                g = null),
                16 & n && Ts(o, "no-padding", !t[4]),
                (!a || 1024 & n && c !== (c = t[10].wrapper)) && Xs(r, "style", c),
                8 & n && Ts(r, "theme", t[3]),
                1 & n && Ts(r, "show", t[0])
            },
            i(t) {
                a || (Vs(d, t),
                Vs(m, t),
                a = !0)
            },
            o(t) {
                Ks(d, t),
                Ks(m, t),
                a = !1
            },
            d(e) {
                e && vs(n),
                d && d.d(e),
                t[16](null),
                v && v.d(),
                m && m.d(e),
                g && g.d(),
                t[17](null),
                l = !1,
                rs(f)
            }
        }
    }
    const Vu = 10;
    function Ku(t, n, e) {
        let {$$slots: i={}, $$scope: r} = n
          , {arrow: o=!0} = n
          , {show: s=!1} = n
          , {title: u} = n
          , {theme: c=!1} = n
          , {padding: a=!0} = n
          , {closeOnClick: l=!1} = n;
        const f = "top"
          , h = "bottom";
        let d, v, p, m, g, y = !1, b = {};
        function w() {
            g = setTimeout(( () => {
                y || e(0, s = !1)
            }
            ), 100)
        }
        As(( () => {
            m && m.parentNode.removeChild(m)
        }
        ));
        return t.$$set = t => {
            "arrow"in t && e(1, o = t.arrow),
            "show"in t && e(0, s = t.show),
            "title"in t && e(2, u = t.title),
            "theme"in t && e(3, c = t.theme),
            "padding"in t && e(4, a = t.padding),
            "closeOnClick"in t && e(5, l = t.closeOnClick),
            "$$scope"in t && e(14, r = t.$$scope)
        }
        ,
        [s, o, u, c, a, l, y, d, v, p, b, function() {
            g && clearTimeout(g),
            e(0, s = !0)
        }
        , w, function() {
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
                const t = d ? d.getBoundingClientRect() : {
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
                o = `\n      left: ${t.centerX + r}px;\n      top: ${t.centerY - Vu}px;\n      transform: translate(-50%, -${i.height + t.height / 2}px)`,
                s = `left:${i.width / 2 - r}px;\n      bottom: -10px; transform: translate(-50%, 25%);`) : (e(8, v = h),
                o = `\n      left: ${t.centerX + r}px;\n      top: ${t.centerY + Vu}px;\n      transform: translate(-50%, ${t.height / 2}px);`,
                s = `left:${i.width / 2 - r}px;\n      top: -10px; transform: translate(-50%, -25%);`);
                e(10, b = {
                    wrapper: o,
                    arrow: s
                })
            }()
        }
        , r, i, function(t) {
            Ds[t ? "unshift" : "push"](( () => {
                d = t,
                e(7, d)
            }
            ))
        }
        , function(t) {
            Ds[t ? "unshift" : "push"](( () => {
                p = t,
                e(9, p)
            }
            ))
        }
        , () => {
            e(6, y = !0)
        }
        , () => {
            l && e(0, s = !1)
        }
        , () => {
            e(6, y = !1),
            w()
        }
        ]
    }
    class Qu extends eu {
        constructor(t) {
            super(),
            nu(this, t, Ku, Ju, ss, {
                arrow: 1,
                show: 0,
                title: 2,
                theme: 3,
                padding: 4,
                closeOnClick: 5
            })
        }
    }
    const Yu = t => ({})
      , Zu = t => ({});
    function tc(t) {
        let n;
        const e = t[0].anchor
          , i = cs(e, t, t[1], Zu);
        return {
            c() {
                i && i.c()
            },
            m(t, e) {
                i && i.m(t, e),
                n = !0
            },
            p(t, n) {
                i && i.p && 2 & n && ls(i, e, t, t[1], n, Yu, Zu)
            },
            i(t) {
                n || (Vs(i, t),
                n = !0)
            },
            o(t) {
                Ks(i, t),
                n = !1
            },
            d(t) {
                i && i.d(t)
            }
        }
    }
    function nc(t) {
        let n, e, i;
        return {
            c() {
                n = ms("div"),
                e = ms("img"),
                e.src !== (i = "//cdn.yopu.co/img/qrcode_app_download.436360b7.png") && Xs(e, "src", "//cdn.yopu.co/img/qrcode_app_download.436360b7.png"),
                Xs(e, "alt", "qrcode"),
                Xs(e, "class", "svelte-2wjwnn"),
                Xs(n, "class", "download-popover svelte-2wjwnn"),
                Xs(n, "slot", "content")
            },
            m(t, i) {
                ds(t, n, i),
                hs(n, e)
            },
            p: ns,
            d(t) {
                t && vs(n)
            }
        }
    }
    function ec(t) {
        let n, e;
        return n = new Qu({
            props: {
                $$slots: {
                    content: [nc],
                    default: [tc]
                },
                $$scope: {
                    ctx: t
                }
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
            p(t, [e]) {
                const i = {};
                2 & e && (i.$$scope = {
                    dirty: e,
                    ctx: t
                }),
                n.$set(i)
            },
            i(t) {
                e || (Vs(n.$$.fragment, t),
                e = !0)
            },
            o(t) {
                Ks(n.$$.fragment, t),
                e = !1
            },
            d(t) {
                tu(n, t)
            }
        }
    }
    function ic(t, n, e) {
        let {$$slots: i={}, $$scope: r} = n;
        return t.$$set = t => {
            "$$scope"in t && e(1, r = t.$$scope)
        }
        ,
        [i, r]
    }
    class rc extends eu {
        constructor(t) {
            super(),
            nu(this, t, ic, ec, ss, {})
        }
    }
    function oc(t) {
        let n, e, i, r;
        const o = t[4].default
          , s = cs(o, t, t[3], null)
          , u = s || function(t) {
            let n;
            return {
                c() {
                    n = ms("span")
                },
                m(t, e) {
                    ds(t, n, e)
                },
                d(t) {
                    t && vs(n)
                }
            }
        }();
        return {
            c() {
                n = ms("button"),
                u && u.c(),
                n.disabled = t[0],
                Xs(n, "size", t[1]),
                Xs(n, "theme", t[2]),
                Xs(n, "type", "button"),
                Xs(n, "class", "svelte-1kcxt4g")
            },
            m(o, s) {
                ds(o, n, s),
                u && u.m(n, null),
                e = !0,
                i || (r = ws(n, "click", t[5]),
                i = !0)
            },
            p(t, [i]) {
                s && s.p && 8 & i && ls(s, o, t, t[3], i, null, null),
                (!e || 1 & i) && (n.disabled = t[0]),
                (!e || 2 & i) && Xs(n, "size", t[1]),
                (!e || 4 & i) && Xs(n, "theme", t[2])
            },
            i(t) {
                e || (Vs(u, t),
                e = !0)
            },
            o(t) {
                Ks(u, t),
                e = !1
            },
            d(t) {
                t && vs(n),
                u && u.d(t),
                i = !1,
                r()
            }
        }
    }
    function sc(t, n, e) {
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
            _s(t, n)
        }
        ]
    }
    class uc extends eu {
        constructor(t) {
            super(),
            nu(this, t, sc, oc, ss, {
                disabled: 0,
                size: 1,
                theme: 2
            })
        }
    }
    function cc(t) {
        let n, e, i, r, o, s, u, c, a;
        const l = t[15].default
          , f = cs(l, t, t[18], null);
        let h = !t[1] && (t[7] || t[9]) && ac(t);
        return {
            c() {
                n = ms("dialog"),
                e = ms("div"),
                i = ys(),
                r = ms("div"),
                o = ms("div"),
                f && f.c(),
                s = ys(),
                h && h.c(),
                Xs(e, "glass", ""),
                Xs(e, "class", "svelte-4llsvh"),
                Xs(o, "content", ""),
                Xs(o, "class", "svelte-4llsvh"),
                Xs(r, "wrapper", ""),
                Xs(r, "class", "svelte-4llsvh"),
                Xs(n, "position", t[2]),
                n.open = !0,
                Xs(n, "class", "svelte-4llsvh"),
                Ts(n, "wide", t[5]),
                Ts(n, "horizontal-buttons", t[4])
            },
            m(l, d) {
                ds(l, n, d),
                hs(n, e),
                hs(n, i),
                hs(n, r),
                hs(r, o),
                f && f.m(o, null),
                hs(r, s),
                h && h.m(r, null),
                u = !0,
                c || (a = ws(e, "click", t[11]),
                c = !0)
            },
            p(t, e) {
                f && f.p && 262144 & e && ls(f, l, t, t[18], e, null, null),
                t[1] || !t[7] && !t[9] ? h && (Hs(),
                Ks(h, 1, 1, ( () => {
                    h = null
                }
                )),
                Js()) : h ? (h.p(t, e),
                642 & e && Vs(h, 1)) : (h = ac(t),
                h.c(),
                Vs(h, 1),
                h.m(r, null)),
                (!u || 4 & e) && Xs(n, "position", t[2]),
                32 & e && Ts(n, "wide", t[5]),
                16 & e && Ts(n, "horizontal-buttons", t[4])
            },
            i(t) {
                u || (Vs(f, t),
                Vs(h),
                u = !0)
            },
            o(t) {
                Ks(f, t),
                Ks(h),
                u = !1
            },
            d(t) {
                t && vs(n),
                f && f.d(t),
                h && h.d(),
                c = !1,
                a()
            }
        }
    }
    function ac(t) {
        let n, e, i, r;
        e = new uc({
            props: {
                size: t[7] ? "big" : "medium",
                disabled: t[6] || t[3],
                theme: t[7] ? "primary" : void 0,
                $$slots: {
                    default: [lc]
                },
                $$scope: {
                    ctx: t
                }
            }
        }),
        e.$on("click", t[16]);
        let o = t[9] && fc(t);
        return {
            c() {
                n = ms("div"),
                Ys(e.$$.fragment),
                i = ys(),
                o && o.c(),
                Xs(n, "class", "buttons svelte-4llsvh")
            },
            m(t, s) {
                ds(t, n, s),
                Zs(e, n, null),
                hs(n, i),
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
                512 & i && Vs(o, 1)) : (o = fc(t),
                o.c(),
                Vs(o, 1),
                o.m(n, null)) : o && (Hs(),
                Ks(o, 1, 1, ( () => {
                    o = null
                }
                )),
                Js())
            },
            i(t) {
                r || (Vs(e.$$.fragment, t),
                Vs(o),
                r = !0)
            },
            o(t) {
                Ks(e.$$.fragment, t),
                Ks(o),
                r = !1
            },
            d(t) {
                t && vs(n),
                tu(e),
                o && o.d()
            }
        }
    }
    function lc(t) {
        let n;
        return {
            c() {
                n = gs(t[8])
            },
            m(t, e) {
                ds(t, n, e)
            },
            p(t, e) {
                256 & e && ks(n, t[8])
            },
            d(t) {
                t && vs(n)
            }
        }
    }
    function fc(t) {
        let n, e;
        return n = new uc({
            props: {
                size: t[7] ? "big" : "medium",
                disabled: t[6],
                theme: t[7] ? "secondary" : void 0,
                $$slots: {
                    default: [hc]
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
                e || (Vs(n.$$.fragment, t),
                e = !0)
            },
            o(t) {
                Ks(n.$$.fragment, t),
                e = !1
            },
            d(t) {
                tu(n, t)
            }
        }
    }
    function hc(t) {
        let n;
        return {
            c() {
                n = gs(t[9])
            },
            m(t, e) {
                ds(t, n, e)
            },
            p(t, e) {
                512 & e && ks(n, t[9])
            },
            d(t) {
                t && vs(n)
            }
        }
    }
    function dc(t) {
        let n, e, i = t[0] && cc(t);
        return {
            c() {
                i && i.c(),
                n = bs()
            },
            m(t, r) {
                i && i.m(t, r),
                ds(t, n, r),
                e = !0
            },
            p(t, [e]) {
                t[0] ? i ? (i.p(t, e),
                1 & e && Vs(i, 1)) : (i = cc(t),
                i.c(),
                Vs(i, 1),
                i.m(n.parentNode, n)) : i && (Hs(),
                Ks(i, 1, 1, ( () => {
                    i = null
                }
                )),
                Js())
            },
            i(t) {
                e || (Vs(i),
                e = !0)
            },
            o(t) {
                Ks(i),
                e = !1
            },
            d(t) {
                i && i.d(t),
                t && vs(n)
            }
        }
    }
    function vc(t, n, e) {
        let {$$slots: i={}, $$scope: r} = n;
        const o = {
            CENTER: "center",
            BOTTOM: "bottom"
        };
        let s, u, c, {open: a=!1} = n, {noButtons: l=!1} = n, {position: f=o.CENTER} = n, {action: h=(async () => !0)} = n, {okButtonText: d="确认"} = n, {cancelButtonText: v="取消"} = n, {okButtonDisabled: p=!1} = n, {horizontalButtons: m=!1} = n, {wide: g=!1} = n, y = !1;
        async function b(t) {
            t ? e(8, u = "请稍后...") : e(9, c = "请稍后..."),
            e(6, y = !0);
            const n = await h(t);
            e(6, y = !1),
            t ? e(8, u = d) : e(9, c = v),
            n && e(0, a = !1)
        }
        return t.$$set = t => {
            "open"in t && e(0, a = t.open),
            "noButtons"in t && e(1, l = t.noButtons),
            "position"in t && e(2, f = t.position),
            "action"in t && e(12, h = t.action),
            "okButtonText"in t && e(13, d = t.okButtonText),
            "cancelButtonText"in t && e(14, v = t.cancelButtonText),
            "okButtonDisabled"in t && e(3, p = t.okButtonDisabled),
            "horizontalButtons"in t && e(4, m = t.horizontalButtons),
            "wide"in t && e(5, g = t.wide),
            "$$scope"in t && e(18, r = t.$$scope)
        }
        ,
        t.$$.update = () => {
            4 & t.$$.dirty && e(7, s = f === o.CENTER),
            8192 & t.$$.dirty && e(8, u = d),
            16384 & t.$$.dirty && e(9, c = v),
            1 & t.$$.dirty && qt("lock", a)
        }
        ,
        [a, l, f, p, m, g, y, s, u, c, b, function() {
            v || b(!0)
        }
        , h, d, v, i, () => b(!0), () => b(!1), r]
    }
    class pc extends eu {
        constructor(t) {
            super(),
            nu(this, t, vc, dc, ss, {
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
    function mc(t) {
        let n, e, i;
        return {
            c() {
                n = ms("div"),
                n.textContent = "账号被暂停使用",
                e = ys(),
                i = ms("div"),
                i.innerHTML = '<p>该账号违反<a class="blue" href="/help#terms">用户协议</a>、<a class="blue" href="/help#membership">会员服务协议</a>或国家相关法规，目前已被暂停使用。</p> \n    <p>最近有谱君发现一些不法商家冒充有谱么官方在淘宝等电商平台销售所谓<b>“有谱么共享会员账号”</b>， 还请用户擦亮眼睛，切勿上当受骗。\n      您如购买了此类“账号”，请及时联系卖家退款，必要时可向电商平台发起投诉以维护您自身的权益。</p> \n    <p>感谢使用有谱么！请明白，只有维护一个公平有序的环境，有谱君才能持续为大家提供更好的服务。</p>',
                Xs(n, "title", ""),
                Xs(i, "description", "")
            },
            m(t, r) {
                ds(t, n, r),
                ds(t, e, r),
                ds(t, i, r)
            },
            d(t) {
                t && vs(n),
                t && vs(e),
                t && vs(i)
            }
        }
    }
    function gc(t) {
        let n, e, i;
        function r(n) {
            t[2](n)
        }
        let o = {
            okButtonText: "退出登录",
            cancelButtonText: "切换账号",
            action: t[1],
            $$slots: {
                default: [mc]
            },
            $$scope: {
                ctx: t
            }
        };
        return void 0 !== t[0] && (o.open = t[0]),
        n = new pc({
            props: o
        }),
        Ds.push(( () => Qs(n, "open", r))),
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
                8 & i && (r.$$scope = {
                    dirty: i,
                    ctx: t
                }),
                !e && 1 & i && (e = !0,
                r.open = t[0],
                Rs(( () => e = !1))),
                n.$set(r)
            },
            i(t) {
                i || (Vs(n.$$.fragment, t),
                i = !0)
            },
            o(t) {
                Ks(n.$$.fragment, t),
                i = !1
            },
            d(t) {
                tu(n, t)
            }
        }
    }
    function yc(t, n, e) {
        let {open: i} = n;
        return t.$$set = t => {
            "open"in t && e(0, i = t.open)
        }
        ,
        [i, async function() {
            return await ts(),
            !0
        }
        , function(t) {
            i = t,
            e(0, i)
        }
        ]
    }
    class bc extends eu {
        constructor(t) {
            super(),
            nu(this, t, yc, gc, ss, {
                open: 0
            })
        }
    }
    var wc = void 0 !== wc ? wc : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}
      , Xc = []
      , xc = []
      , kc = "undefined" != typeof Uint8Array ? Uint8Array : Array
      , Ec = !1;
    function Tc() {
        Ec = !0;
        for (var t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", n = 0, e = t.length; n < e; ++n)
            Xc[n] = t[n],
            xc[t.charCodeAt(n)] = n;
        xc["-".charCodeAt(0)] = 62,
        xc["_".charCodeAt(0)] = 63
    }
    function Sc(t, n, e) {
        for (var i, r, o = [], s = n; s < e; s += 3)
            i = (t[s] << 16) + (t[s + 1] << 8) + t[s + 2],
            o.push(Xc[(r = i) >> 18 & 63] + Xc[r >> 12 & 63] + Xc[r >> 6 & 63] + Xc[63 & r]);
        return o.join("")
    }
    function jc(t) {
        var n;
        Ec || Tc();
        for (var e = t.length, i = e % 3, r = "", o = [], s = 16383, u = 0, c = e - i; u < c; u += s)
            o.push(Sc(t, u, u + s > c ? c : u + s));
        return 1 === i ? (n = t[e - 1],
        r += Xc[n >> 2],
        r += Xc[n << 4 & 63],
        r += "==") : 2 === i && (n = (t[e - 2] << 8) + t[e - 1],
        r += Xc[n >> 10],
        r += Xc[n >> 4 & 63],
        r += Xc[n << 2 & 63],
        r += "="),
        o.push(r),
        o.join("")
    }
    function Cc(t, n, e, i, r) {
        var o, s, u = 8 * r - i - 1, c = (1 << u) - 1, a = c >> 1, l = -7, f = e ? r - 1 : 0, h = e ? -1 : 1, d = t[n + f];
        for (f += h,
        o = d & (1 << -l) - 1,
        d >>= -l,
        l += u; l > 0; o = 256 * o + t[n + f],
        f += h,
        l -= 8)
            ;
        for (s = o & (1 << -l) - 1,
        o >>= -l,
        l += i; l > 0; s = 256 * s + t[n + f],
        f += h,
        l -= 8)
            ;
        if (0 === o)
            o = 1 - a;
        else {
            if (o === c)
                return s ? NaN : 1 / 0 * (d ? -1 : 1);
            s += Math.pow(2, i),
            o -= a
        }
        return (d ? -1 : 1) * s * Math.pow(2, o - i)
    }
    function Ac(t, n, e, i, r, o) {
        var s, u, c, a = 8 * o - r - 1, l = (1 << a) - 1, f = l >> 1, h = 23 === r ? Math.pow(2, -24) - Math.pow(2, -77) : 0, d = i ? 0 : o - 1, v = i ? 1 : -1, p = n < 0 || 0 === n && 1 / n < 0 ? 1 : 0;
        for (n = Math.abs(n),
        isNaN(n) || n === 1 / 0 ? (u = isNaN(n) ? 1 : 0,
        s = l) : (s = Math.floor(Math.log(n) / Math.LN2),
        n * (c = Math.pow(2, -s)) < 1 && (s--,
        c *= 2),
        (n += s + f >= 1 ? h / c : h * Math.pow(2, 1 - f)) * c >= 2 && (s++,
        c /= 2),
        s + f >= l ? (u = 0,
        s = l) : s + f >= 1 ? (u = (n * c - 1) * Math.pow(2, r),
        s += f) : (u = n * Math.pow(2, f - 1) * Math.pow(2, r),
        s = 0)); r >= 8; t[e + d] = 255 & u,
        d += v,
        u /= 256,
        r -= 8)
            ;
        for (s = s << r | u,
        a += r; a > 0; t[e + d] = 255 & s,
        d += v,
        s /= 256,
        a -= 8)
            ;
        t[e + d - v] |= 128 * p
    }
    var Oc = {}.toString
      , _c = Array.isArray || function(t) {
        return "[object Array]" == Oc.call(t)
    }
    ;
    function Bc() {
        return qc.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823
    }
    function Dc(t, n) {
        if (Bc() < n)
            throw new RangeError("Invalid typed array length");
        return qc.TYPED_ARRAY_SUPPORT ? (t = new Uint8Array(n)).__proto__ = qc.prototype : (null === t && (t = new qc(n)),
        t.length = n),
        t
    }
    function qc(t, n, e) {
        if (!(qc.TYPED_ARRAY_SUPPORT || this instanceof qc))
            return new qc(t,n,e);
        if ("number" == typeof t) {
            if ("string" == typeof n)
                throw new Error("If encoding is specified then the first argument must be a string");
            return Fc(this, t)
        }
        return Ic(this, t, n, e)
    }
    function Ic(t, n, e, i) {
        if ("number" == typeof n)
            throw new TypeError('"value" argument must not be a number');
        return "undefined" != typeof ArrayBuffer && n instanceof ArrayBuffer ? function(t, n, e, i) {
            if (n.byteLength,
            e < 0 || n.byteLength < e)
                throw new RangeError("'offset' is out of bounds");
            if (n.byteLength < e + (i || 0))
                throw new RangeError("'length' is out of bounds");
            n = void 0 === e && void 0 === i ? new Uint8Array(n) : void 0 === i ? new Uint8Array(n,e) : new Uint8Array(n,e,i);
            qc.TYPED_ARRAY_SUPPORT ? (t = n).__proto__ = qc.prototype : t = Nc(t, n);
            return t
        }(t, n, e, i) : "string" == typeof n ? function(t, n, e) {
            "string" == typeof e && "" !== e || (e = "utf8");
            if (!qc.isEncoding(e))
                throw new TypeError('"encoding" must be a valid string encoding');
            var i = 0 | Gc(n, e)
              , r = (t = Dc(t, i)).write(n, e);
            r !== i && (t = t.slice(0, r));
            return t
        }(t, n, e) : function(t, n) {
            if (Rc(n)) {
                var e = 0 | $c(n.length);
                return 0 === (t = Dc(t, e)).length || n.copy(t, 0, 0, e),
                t
            }
            if (n) {
                if ("undefined" != typeof ArrayBuffer && n.buffer instanceof ArrayBuffer || "length"in n)
                    return "number" != typeof n.length || (i = n.length) != i ? Dc(t, 0) : Nc(t, n);
                if ("Buffer" === n.type && _c(n.data))
                    return Nc(t, n.data)
            }
            var i;
            throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.")
        }(t, n)
    }
    function Mc(t) {
        if ("number" != typeof t)
            throw new TypeError('"size" argument must be a number');
        if (t < 0)
            throw new RangeError('"size" argument must not be negative')
    }
    function Fc(t, n) {
        if (Mc(n),
        t = Dc(t, n < 0 ? 0 : 0 | $c(n)),
        !qc.TYPED_ARRAY_SUPPORT)
            for (var e = 0; e < n; ++e)
                t[e] = 0;
        return t
    }
    function Nc(t, n) {
        var e = n.length < 0 ? 0 : 0 | $c(n.length);
        t = Dc(t, e);
        for (var i = 0; i < e; i += 1)
            t[i] = 255 & n[i];
        return t
    }
    function $c(t) {
        if (t >= Bc())
            throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + Bc().toString(16) + " bytes");
        return 0 | t
    }
    function Rc(t) {
        return !(null == t || !t._isBuffer)
    }
    function Gc(t, n) {
        if (Rc(t))
            return t.length;
        if ("undefined" != typeof ArrayBuffer && "function" == typeof ArrayBuffer.isView && (ArrayBuffer.isView(t) || t instanceof ArrayBuffer))
            return t.byteLength;
        "string" != typeof t && (t = "" + t);
        var e = t.length;
        if (0 === e)
            return 0;
        for (var i = !1; ; )
            switch (n) {
            case "ascii":
            case "latin1":
            case "binary":
                return e;
            case "utf8":
            case "utf-8":
            case void 0:
                return va(t).length;
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
                return 2 * e;
            case "hex":
                return e >>> 1;
            case "base64":
                return pa(t).length;
            default:
                if (i)
                    return va(t).length;
                n = ("" + n).toLowerCase(),
                i = !0
            }
    }
    function Pc(t, n, e) {
        var i = !1;
        if ((void 0 === n || n < 0) && (n = 0),
        n > this.length)
            return "";
        if ((void 0 === e || e > this.length) && (e = this.length),
        e <= 0)
            return "";
        if ((e >>>= 0) <= (n >>>= 0))
            return "";
        for (t || (t = "utf8"); ; )
            switch (t) {
            case "hex":
                return ia(this, n, e);
            case "utf8":
            case "utf-8":
                return Zc(this, n, e);
            case "ascii":
                return na(this, n, e);
            case "latin1":
            case "binary":
                return ea(this, n, e);
            case "base64":
                return Yc(this, n, e);
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
                return ra(this, n, e);
            default:
                if (i)
                    throw new TypeError("Unknown encoding: " + t);
                t = (t + "").toLowerCase(),
                i = !0
            }
    }
    function Uc(t, n, e) {
        var i = t[n];
        t[n] = t[e],
        t[e] = i
    }
    function Lc(t, n, e, i, r) {
        if (0 === t.length)
            return -1;
        if ("string" == typeof e ? (i = e,
        e = 0) : e > 2147483647 ? e = 2147483647 : e < -2147483648 && (e = -2147483648),
        e = +e,
        isNaN(e) && (e = r ? 0 : t.length - 1),
        e < 0 && (e = t.length + e),
        e >= t.length) {
            if (r)
                return -1;
            e = t.length - 1
        } else if (e < 0) {
            if (!r)
                return -1;
            e = 0
        }
        if ("string" == typeof n && (n = qc.from(n, i)),
        Rc(n))
            return 0 === n.length ? -1 : zc(t, n, e, i, r);
        if ("number" == typeof n)
            return n &= 255,
            qc.TYPED_ARRAY_SUPPORT && "function" == typeof Uint8Array.prototype.indexOf ? r ? Uint8Array.prototype.indexOf.call(t, n, e) : Uint8Array.prototype.lastIndexOf.call(t, n, e) : zc(t, [n], e, i, r);
        throw new TypeError("val must be string, number or Buffer")
    }
    function zc(t, n, e, i, r) {
        var o, s = 1, u = t.length, c = n.length;
        if (void 0 !== i && ("ucs2" === (i = String(i).toLowerCase()) || "ucs-2" === i || "utf16le" === i || "utf-16le" === i)) {
            if (t.length < 2 || n.length < 2)
                return -1;
            s = 2,
            u /= 2,
            c /= 2,
            e /= 2
        }
        function a(t, n) {
            return 1 === s ? t[n] : t.readUInt16BE(n * s)
        }
        if (r) {
            var l = -1;
            for (o = e; o < u; o++)
                if (a(t, o) === a(n, -1 === l ? 0 : o - l)) {
                    if (-1 === l && (l = o),
                    o - l + 1 === c)
                        return l * s
                } else
                    -1 !== l && (o -= o - l),
                    l = -1
        } else
            for (e + c > u && (e = u - c),
            o = e; o >= 0; o--) {
                for (var f = !0, h = 0; h < c; h++)
                    if (a(t, o + h) !== a(n, h)) {
                        f = !1;
                        break
                    }
                if (f)
                    return o
            }
        return -1
    }
    function Wc(t, n, e, i) {
        e = Number(e) || 0;
        var r = t.length - e;
        i ? (i = Number(i)) > r && (i = r) : i = r;
        var o = n.length;
        if (o % 2 != 0)
            throw new TypeError("Invalid hex string");
        i > o / 2 && (i = o / 2);
        for (var s = 0; s < i; ++s) {
            var u = parseInt(n.substr(2 * s, 2), 16);
            if (isNaN(u))
                return s;
            t[e + s] = u
        }
        return s
    }
    function Hc(t, n, e, i) {
        return ma(va(n, t.length - e), t, e, i)
    }
    function Jc(t, n, e, i) {
        return ma(function(t) {
            for (var n = [], e = 0; e < t.length; ++e)
                n.push(255 & t.charCodeAt(e));
            return n
        }(n), t, e, i)
    }
    function Vc(t, n, e, i) {
        return Jc(t, n, e, i)
    }
    function Kc(t, n, e, i) {
        return ma(pa(n), t, e, i)
    }
    function Qc(t, n, e, i) {
        return ma(function(t, n) {
            for (var e, i, r, o = [], s = 0; s < t.length && !((n -= 2) < 0); ++s)
                i = (e = t.charCodeAt(s)) >> 8,
                r = e % 256,
                o.push(r),
                o.push(i);
            return o
        }(n, t.length - e), t, e, i)
    }
    function Yc(t, n, e) {
        return 0 === n && e === t.length ? jc(t) : jc(t.slice(n, e))
    }
    function Zc(t, n, e) {
        e = Math.min(t.length, e);
        for (var i = [], r = n; r < e; ) {
            var o, s, u, c, a = t[r], l = null, f = a > 239 ? 4 : a > 223 ? 3 : a > 191 ? 2 : 1;
            if (r + f <= e)
                switch (f) {
                case 1:
                    a < 128 && (l = a);
                    break;
                case 2:
                    128 == (192 & (o = t[r + 1])) && (c = (31 & a) << 6 | 63 & o) > 127 && (l = c);
                    break;
                case 3:
                    o = t[r + 1],
                    s = t[r + 2],
                    128 == (192 & o) && 128 == (192 & s) && (c = (15 & a) << 12 | (63 & o) << 6 | 63 & s) > 2047 && (c < 55296 || c > 57343) && (l = c);
                    break;
                case 4:
                    o = t[r + 1],
                    s = t[r + 2],
                    u = t[r + 3],
                    128 == (192 & o) && 128 == (192 & s) && 128 == (192 & u) && (c = (15 & a) << 18 | (63 & o) << 12 | (63 & s) << 6 | 63 & u) > 65535 && c < 1114112 && (l = c)
                }
            null === l ? (l = 65533,
            f = 1) : l > 65535 && (l -= 65536,
            i.push(l >>> 10 & 1023 | 55296),
            l = 56320 | 1023 & l),
            i.push(l),
            r += f
        }
        return function(t) {
            var n = t.length;
            if (n <= ta)
                return String.fromCharCode.apply(String, t);
            var e = ""
              , i = 0;
            for (; i < n; )
                e += String.fromCharCode.apply(String, t.slice(i, i += ta));
            return e
        }(i)
    }
    qc.TYPED_ARRAY_SUPPORT = void 0 === wc.TYPED_ARRAY_SUPPORT || wc.TYPED_ARRAY_SUPPORT,
    qc.poolSize = 8192,
    qc._augment = function(t) {
        return t.__proto__ = qc.prototype,
        t
    }
    ,
    qc.from = function(t, n, e) {
        return Ic(null, t, n, e)
    }
    ,
    qc.TYPED_ARRAY_SUPPORT && (qc.prototype.__proto__ = Uint8Array.prototype,
    qc.__proto__ = Uint8Array),
    qc.alloc = function(t, n, e) {
        return function(t, n, e, i) {
            return Mc(n),
            n <= 0 ? Dc(t, n) : void 0 !== e ? "string" == typeof i ? Dc(t, n).fill(e, i) : Dc(t, n).fill(e) : Dc(t, n)
        }(null, t, n, e)
    }
    ,
    qc.allocUnsafe = function(t) {
        return Fc(null, t)
    }
    ,
    qc.allocUnsafeSlow = function(t) {
        return Fc(null, t)
    }
    ,
    qc.isBuffer = function(t) {
        return null != t && (!!t._isBuffer || ga(t) || function(t) {
            return "function" == typeof t.readFloatLE && "function" == typeof t.slice && ga(t.slice(0, 0))
        }(t))
    }
    ,
    qc.compare = function(t, n) {
        if (!Rc(t) || !Rc(n))
            throw new TypeError("Arguments must be Buffers");
        if (t === n)
            return 0;
        for (var e = t.length, i = n.length, r = 0, o = Math.min(e, i); r < o; ++r)
            if (t[r] !== n[r]) {
                e = t[r],
                i = n[r];
                break
            }
        return e < i ? -1 : i < e ? 1 : 0
    }
    ,
    qc.isEncoding = function(t) {
        switch (String(t).toLowerCase()) {
        case "hex":
        case "utf8":
        case "utf-8":
        case "ascii":
        case "latin1":
        case "binary":
        case "base64":
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
            return !0;
        default:
            return !1
        }
    }
    ,
    qc.concat = function(t, n) {
        if (!_c(t))
            throw new TypeError('"list" argument must be an Array of Buffers');
        if (0 === t.length)
            return qc.alloc(0);
        var e;
        if (void 0 === n)
            for (n = 0,
            e = 0; e < t.length; ++e)
                n += t[e].length;
        var i = qc.allocUnsafe(n)
          , r = 0;
        for (e = 0; e < t.length; ++e) {
            var o = t[e];
            if (!Rc(o))
                throw new TypeError('"list" argument must be an Array of Buffers');
            o.copy(i, r),
            r += o.length
        }
        return i
    }
    ,
    qc.byteLength = Gc,
    qc.prototype._isBuffer = !0,
    qc.prototype.swap16 = function() {
        var t = this.length;
        if (t % 2 != 0)
            throw new RangeError("Buffer size must be a multiple of 16-bits");
        for (var n = 0; n < t; n += 2)
            Uc(this, n, n + 1);
        return this
    }
    ,
    qc.prototype.swap32 = function() {
        var t = this.length;
        if (t % 4 != 0)
            throw new RangeError("Buffer size must be a multiple of 32-bits");
        for (var n = 0; n < t; n += 4)
            Uc(this, n, n + 3),
            Uc(this, n + 1, n + 2);
        return this
    }
    ,
    qc.prototype.swap64 = function() {
        var t = this.length;
        if (t % 8 != 0)
            throw new RangeError("Buffer size must be a multiple of 64-bits");
        for (var n = 0; n < t; n += 8)
            Uc(this, n, n + 7),
            Uc(this, n + 1, n + 6),
            Uc(this, n + 2, n + 5),
            Uc(this, n + 3, n + 4);
        return this
    }
    ,
    qc.prototype.toString = function() {
        var t = 0 | this.length;
        return 0 === t ? "" : 0 === arguments.length ? Zc(this, 0, t) : Pc.apply(this, arguments)
    }
    ,
    qc.prototype.equals = function(t) {
        if (!Rc(t))
            throw new TypeError("Argument must be a Buffer");
        return this === t || 0 === qc.compare(this, t)
    }
    ,
    qc.prototype.inspect = function() {
        var t = "";
        return this.length > 0 && (t = this.toString("hex", 0, 50).match(/.{2}/g).join(" "),
        this.length > 50 && (t += " ... ")),
        "<Buffer " + t + ">"
    }
    ,
    qc.prototype.compare = function(t, n, e, i, r) {
        if (!Rc(t))
            throw new TypeError("Argument must be a Buffer");
        if (void 0 === n && (n = 0),
        void 0 === e && (e = t ? t.length : 0),
        void 0 === i && (i = 0),
        void 0 === r && (r = this.length),
        n < 0 || e > t.length || i < 0 || r > this.length)
            throw new RangeError("out of range index");
        if (i >= r && n >= e)
            return 0;
        if (i >= r)
            return -1;
        if (n >= e)
            return 1;
        if (this === t)
            return 0;
        for (var o = (r >>>= 0) - (i >>>= 0), s = (e >>>= 0) - (n >>>= 0), u = Math.min(o, s), c = this.slice(i, r), a = t.slice(n, e), l = 0; l < u; ++l)
            if (c[l] !== a[l]) {
                o = c[l],
                s = a[l];
                break
            }
        return o < s ? -1 : s < o ? 1 : 0
    }
    ,
    qc.prototype.includes = function(t, n, e) {
        return -1 !== this.indexOf(t, n, e)
    }
    ,
    qc.prototype.indexOf = function(t, n, e) {
        return Lc(this, t, n, e, !0)
    }
    ,
    qc.prototype.lastIndexOf = function(t, n, e) {
        return Lc(this, t, n, e, !1)
    }
    ,
    qc.prototype.write = function(t, n, e, i) {
        if (void 0 === n)
            i = "utf8",
            e = this.length,
            n = 0;
        else if (void 0 === e && "string" == typeof n)
            i = n,
            e = this.length,
            n = 0;
        else {
            if (!isFinite(n))
                throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
            n |= 0,
            isFinite(e) ? (e |= 0,
            void 0 === i && (i = "utf8")) : (i = e,
            e = void 0)
        }
        var r = this.length - n;
        if ((void 0 === e || e > r) && (e = r),
        t.length > 0 && (e < 0 || n < 0) || n > this.length)
            throw new RangeError("Attempt to write outside buffer bounds");
        i || (i = "utf8");
        for (var o = !1; ; )
            switch (i) {
            case "hex":
                return Wc(this, t, n, e);
            case "utf8":
            case "utf-8":
                return Hc(this, t, n, e);
            case "ascii":
                return Jc(this, t, n, e);
            case "latin1":
            case "binary":
                return Vc(this, t, n, e);
            case "base64":
                return Kc(this, t, n, e);
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
                return Qc(this, t, n, e);
            default:
                if (o)
                    throw new TypeError("Unknown encoding: " + i);
                i = ("" + i).toLowerCase(),
                o = !0
            }
    }
    ,
    qc.prototype.toJSON = function() {
        return {
            type: "Buffer",
            data: Array.prototype.slice.call(this._arr || this, 0)
        }
    }
    ;
    var ta = 4096;
    function na(t, n, e) {
        var i = "";
        e = Math.min(t.length, e);
        for (var r = n; r < e; ++r)
            i += String.fromCharCode(127 & t[r]);
        return i
    }
    function ea(t, n, e) {
        var i = "";
        e = Math.min(t.length, e);
        for (var r = n; r < e; ++r)
            i += String.fromCharCode(t[r]);
        return i
    }
    function ia(t, n, e) {
        var i = t.length;
        (!n || n < 0) && (n = 0),
        (!e || e < 0 || e > i) && (e = i);
        for (var r = "", o = n; o < e; ++o)
            r += da(t[o]);
        return r
    }
    function ra(t, n, e) {
        for (var i = t.slice(n, e), r = "", o = 0; o < i.length; o += 2)
            r += String.fromCharCode(i[o] + 256 * i[o + 1]);
        return r
    }
    function oa(t, n, e) {
        if (t % 1 != 0 || t < 0)
            throw new RangeError("offset is not uint");
        if (t + n > e)
            throw new RangeError("Trying to access beyond buffer length")
    }
    function sa(t, n, e, i, r, o) {
        if (!Rc(t))
            throw new TypeError('"buffer" argument must be a Buffer instance');
        if (n > r || n < o)
            throw new RangeError('"value" argument is out of bounds');
        if (e + i > t.length)
            throw new RangeError("Index out of range")
    }
    function ua(t, n, e, i) {
        n < 0 && (n = 65535 + n + 1);
        for (var r = 0, o = Math.min(t.length - e, 2); r < o; ++r)
            t[e + r] = (n & 255 << 8 * (i ? r : 1 - r)) >>> 8 * (i ? r : 1 - r)
    }
    function ca(t, n, e, i) {
        n < 0 && (n = 4294967295 + n + 1);
        for (var r = 0, o = Math.min(t.length - e, 4); r < o; ++r)
            t[e + r] = n >>> 8 * (i ? r : 3 - r) & 255
    }
    function aa(t, n, e, i, r, o) {
        if (e + i > t.length)
            throw new RangeError("Index out of range");
        if (e < 0)
            throw new RangeError("Index out of range")
    }
    function la(t, n, e, i, r) {
        return r || aa(t, 0, e, 4),
        Ac(t, n, e, i, 23, 4),
        e + 4
    }
    function fa(t, n, e, i, r) {
        return r || aa(t, 0, e, 8),
        Ac(t, n, e, i, 52, 8),
        e + 8
    }
    qc.prototype.slice = function(t, n) {
        var e, i = this.length;
        if ((t = ~~t) < 0 ? (t += i) < 0 && (t = 0) : t > i && (t = i),
        (n = void 0 === n ? i : ~~n) < 0 ? (n += i) < 0 && (n = 0) : n > i && (n = i),
        n < t && (n = t),
        qc.TYPED_ARRAY_SUPPORT)
            (e = this.subarray(t, n)).__proto__ = qc.prototype;
        else {
            var r = n - t;
            e = new qc(r,void 0);
            for (var o = 0; o < r; ++o)
                e[o] = this[o + t]
        }
        return e
    }
    ,
    qc.prototype.readUIntLE = function(t, n, e) {
        t |= 0,
        n |= 0,
        e || oa(t, n, this.length);
        for (var i = this[t], r = 1, o = 0; ++o < n && (r *= 256); )
            i += this[t + o] * r;
        return i
    }
    ,
    qc.prototype.readUIntBE = function(t, n, e) {
        t |= 0,
        n |= 0,
        e || oa(t, n, this.length);
        for (var i = this[t + --n], r = 1; n > 0 && (r *= 256); )
            i += this[t + --n] * r;
        return i
    }
    ,
    qc.prototype.readUInt8 = function(t, n) {
        return n || oa(t, 1, this.length),
        this[t]
    }
    ,
    qc.prototype.readUInt16LE = function(t, n) {
        return n || oa(t, 2, this.length),
        this[t] | this[t + 1] << 8
    }
    ,
    qc.prototype.readUInt16BE = function(t, n) {
        return n || oa(t, 2, this.length),
        this[t] << 8 | this[t + 1]
    }
    ,
    qc.prototype.readUInt32LE = function(t, n) {
        return n || oa(t, 4, this.length),
        (this[t] | this[t + 1] << 8 | this[t + 2] << 16) + 16777216 * this[t + 3]
    }
    ,
    qc.prototype.readUInt32BE = function(t, n) {
        return n || oa(t, 4, this.length),
        16777216 * this[t] + (this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3])
    }
    ,
    qc.prototype.readIntLE = function(t, n, e) {
        t |= 0,
        n |= 0,
        e || oa(t, n, this.length);
        for (var i = this[t], r = 1, o = 0; ++o < n && (r *= 256); )
            i += this[t + o] * r;
        return i >= (r *= 128) && (i -= Math.pow(2, 8 * n)),
        i
    }
    ,
    qc.prototype.readIntBE = function(t, n, e) {
        t |= 0,
        n |= 0,
        e || oa(t, n, this.length);
        for (var i = n, r = 1, o = this[t + --i]; i > 0 && (r *= 256); )
            o += this[t + --i] * r;
        return o >= (r *= 128) && (o -= Math.pow(2, 8 * n)),
        o
    }
    ,
    qc.prototype.readInt8 = function(t, n) {
        return n || oa(t, 1, this.length),
        128 & this[t] ? -1 * (255 - this[t] + 1) : this[t]
    }
    ,
    qc.prototype.readInt16LE = function(t, n) {
        n || oa(t, 2, this.length);
        var e = this[t] | this[t + 1] << 8;
        return 32768 & e ? 4294901760 | e : e
    }
    ,
    qc.prototype.readInt16BE = function(t, n) {
        n || oa(t, 2, this.length);
        var e = this[t + 1] | this[t] << 8;
        return 32768 & e ? 4294901760 | e : e
    }
    ,
    qc.prototype.readInt32LE = function(t, n) {
        return n || oa(t, 4, this.length),
        this[t] | this[t + 1] << 8 | this[t + 2] << 16 | this[t + 3] << 24
    }
    ,
    qc.prototype.readInt32BE = function(t, n) {
        return n || oa(t, 4, this.length),
        this[t] << 24 | this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3]
    }
    ,
    qc.prototype.readFloatLE = function(t, n) {
        return n || oa(t, 4, this.length),
        Cc(this, t, !0, 23, 4)
    }
    ,
    qc.prototype.readFloatBE = function(t, n) {
        return n || oa(t, 4, this.length),
        Cc(this, t, !1, 23, 4)
    }
    ,
    qc.prototype.readDoubleLE = function(t, n) {
        return n || oa(t, 8, this.length),
        Cc(this, t, !0, 52, 8)
    }
    ,
    qc.prototype.readDoubleBE = function(t, n) {
        return n || oa(t, 8, this.length),
        Cc(this, t, !1, 52, 8)
    }
    ,
    qc.prototype.writeUIntLE = function(t, n, e, i) {
        (t = +t,
        n |= 0,
        e |= 0,
        i) || sa(this, t, n, e, Math.pow(2, 8 * e) - 1, 0);
        var r = 1
          , o = 0;
        for (this[n] = 255 & t; ++o < e && (r *= 256); )
            this[n + o] = t / r & 255;
        return n + e
    }
    ,
    qc.prototype.writeUIntBE = function(t, n, e, i) {
        (t = +t,
        n |= 0,
        e |= 0,
        i) || sa(this, t, n, e, Math.pow(2, 8 * e) - 1, 0);
        var r = e - 1
          , o = 1;
        for (this[n + r] = 255 & t; --r >= 0 && (o *= 256); )
            this[n + r] = t / o & 255;
        return n + e
    }
    ,
    qc.prototype.writeUInt8 = function(t, n, e) {
        return t = +t,
        n |= 0,
        e || sa(this, t, n, 1, 255, 0),
        qc.TYPED_ARRAY_SUPPORT || (t = Math.floor(t)),
        this[n] = 255 & t,
        n + 1
    }
    ,
    qc.prototype.writeUInt16LE = function(t, n, e) {
        return t = +t,
        n |= 0,
        e || sa(this, t, n, 2, 65535, 0),
        qc.TYPED_ARRAY_SUPPORT ? (this[n] = 255 & t,
        this[n + 1] = t >>> 8) : ua(this, t, n, !0),
        n + 2
    }
    ,
    qc.prototype.writeUInt16BE = function(t, n, e) {
        return t = +t,
        n |= 0,
        e || sa(this, t, n, 2, 65535, 0),
        qc.TYPED_ARRAY_SUPPORT ? (this[n] = t >>> 8,
        this[n + 1] = 255 & t) : ua(this, t, n, !1),
        n + 2
    }
    ,
    qc.prototype.writeUInt32LE = function(t, n, e) {
        return t = +t,
        n |= 0,
        e || sa(this, t, n, 4, 4294967295, 0),
        qc.TYPED_ARRAY_SUPPORT ? (this[n + 3] = t >>> 24,
        this[n + 2] = t >>> 16,
        this[n + 1] = t >>> 8,
        this[n] = 255 & t) : ca(this, t, n, !0),
        n + 4
    }
    ,
    qc.prototype.writeUInt32BE = function(t, n, e) {
        return t = +t,
        n |= 0,
        e || sa(this, t, n, 4, 4294967295, 0),
        qc.TYPED_ARRAY_SUPPORT ? (this[n] = t >>> 24,
        this[n + 1] = t >>> 16,
        this[n + 2] = t >>> 8,
        this[n + 3] = 255 & t) : ca(this, t, n, !1),
        n + 4
    }
    ,
    qc.prototype.writeIntLE = function(t, n, e, i) {
        if (t = +t,
        n |= 0,
        !i) {
            var r = Math.pow(2, 8 * e - 1);
            sa(this, t, n, e, r - 1, -r)
        }
        var o = 0
          , s = 1
          , u = 0;
        for (this[n] = 255 & t; ++o < e && (s *= 256); )
            t < 0 && 0 === u && 0 !== this[n + o - 1] && (u = 1),
            this[n + o] = (t / s >> 0) - u & 255;
        return n + e
    }
    ,
    qc.prototype.writeIntBE = function(t, n, e, i) {
        if (t = +t,
        n |= 0,
        !i) {
            var r = Math.pow(2, 8 * e - 1);
            sa(this, t, n, e, r - 1, -r)
        }
        var o = e - 1
          , s = 1
          , u = 0;
        for (this[n + o] = 255 & t; --o >= 0 && (s *= 256); )
            t < 0 && 0 === u && 0 !== this[n + o + 1] && (u = 1),
            this[n + o] = (t / s >> 0) - u & 255;
        return n + e
    }
    ,
    qc.prototype.writeInt8 = function(t, n, e) {
        return t = +t,
        n |= 0,
        e || sa(this, t, n, 1, 127, -128),
        qc.TYPED_ARRAY_SUPPORT || (t = Math.floor(t)),
        t < 0 && (t = 255 + t + 1),
        this[n] = 255 & t,
        n + 1
    }
    ,
    qc.prototype.writeInt16LE = function(t, n, e) {
        return t = +t,
        n |= 0,
        e || sa(this, t, n, 2, 32767, -32768),
        qc.TYPED_ARRAY_SUPPORT ? (this[n] = 255 & t,
        this[n + 1] = t >>> 8) : ua(this, t, n, !0),
        n + 2
    }
    ,
    qc.prototype.writeInt16BE = function(t, n, e) {
        return t = +t,
        n |= 0,
        e || sa(this, t, n, 2, 32767, -32768),
        qc.TYPED_ARRAY_SUPPORT ? (this[n] = t >>> 8,
        this[n + 1] = 255 & t) : ua(this, t, n, !1),
        n + 2
    }
    ,
    qc.prototype.writeInt32LE = function(t, n, e) {
        return t = +t,
        n |= 0,
        e || sa(this, t, n, 4, 2147483647, -2147483648),
        qc.TYPED_ARRAY_SUPPORT ? (this[n] = 255 & t,
        this[n + 1] = t >>> 8,
        this[n + 2] = t >>> 16,
        this[n + 3] = t >>> 24) : ca(this, t, n, !0),
        n + 4
    }
    ,
    qc.prototype.writeInt32BE = function(t, n, e) {
        return t = +t,
        n |= 0,
        e || sa(this, t, n, 4, 2147483647, -2147483648),
        t < 0 && (t = 4294967295 + t + 1),
        qc.TYPED_ARRAY_SUPPORT ? (this[n] = t >>> 24,
        this[n + 1] = t >>> 16,
        this[n + 2] = t >>> 8,
        this[n + 3] = 255 & t) : ca(this, t, n, !1),
        n + 4
    }
    ,
    qc.prototype.writeFloatLE = function(t, n, e) {
        return la(this, t, n, !0, e)
    }
    ,
    qc.prototype.writeFloatBE = function(t, n, e) {
        return la(this, t, n, !1, e)
    }
    ,
    qc.prototype.writeDoubleLE = function(t, n, e) {
        return fa(this, t, n, !0, e)
    }
    ,
    qc.prototype.writeDoubleBE = function(t, n, e) {
        return fa(this, t, n, !1, e)
    }
    ,
    qc.prototype.copy = function(t, n, e, i) {
        if (e || (e = 0),
        i || 0 === i || (i = this.length),
        n >= t.length && (n = t.length),
        n || (n = 0),
        i > 0 && i < e && (i = e),
        i === e)
            return 0;
        if (0 === t.length || 0 === this.length)
            return 0;
        if (n < 0)
            throw new RangeError("targetStart out of bounds");
        if (e < 0 || e >= this.length)
            throw new RangeError("sourceStart out of bounds");
        if (i < 0)
            throw new RangeError("sourceEnd out of bounds");
        i > this.length && (i = this.length),
        t.length - n < i - e && (i = t.length - n + e);
        var r, o = i - e;
        if (this === t && e < n && n < i)
            for (r = o - 1; r >= 0; --r)
                t[r + n] = this[r + e];
        else if (o < 1e3 || !qc.TYPED_ARRAY_SUPPORT)
            for (r = 0; r < o; ++r)
                t[r + n] = this[r + e];
        else
            Uint8Array.prototype.set.call(t, this.subarray(e, e + o), n);
        return o
    }
    ,
    qc.prototype.fill = function(t, n, e, i) {
        if ("string" == typeof t) {
            if ("string" == typeof n ? (i = n,
            n = 0,
            e = this.length) : "string" == typeof e && (i = e,
            e = this.length),
            1 === t.length) {
                var r = t.charCodeAt(0);
                r < 256 && (t = r)
            }
            if (void 0 !== i && "string" != typeof i)
                throw new TypeError("encoding must be a string");
            if ("string" == typeof i && !qc.isEncoding(i))
                throw new TypeError("Unknown encoding: " + i)
        } else
            "number" == typeof t && (t &= 255);
        if (n < 0 || this.length < n || this.length < e)
            throw new RangeError("Out of range index");
        if (e <= n)
            return this;
        var o;
        if (n >>>= 0,
        e = void 0 === e ? this.length : e >>> 0,
        t || (t = 0),
        "number" == typeof t)
            for (o = n; o < e; ++o)
                this[o] = t;
        else {
            var s = Rc(t) ? t : va(new qc(t,i).toString())
              , u = s.length;
            for (o = 0; o < e - n; ++o)
                this[o + n] = s[o % u]
        }
        return this
    }
    ;
    var ha = /[^+\/0-9A-Za-z-_]/g;
    function da(t) {
        return t < 16 ? "0" + t.toString(16) : t.toString(16)
    }
    function va(t, n) {
        var e;
        n = n || 1 / 0;
        for (var i = t.length, r = null, o = [], s = 0; s < i; ++s) {
            if ((e = t.charCodeAt(s)) > 55295 && e < 57344) {
                if (!r) {
                    if (e > 56319) {
                        (n -= 3) > -1 && o.push(239, 191, 189);
                        continue
                    }
                    if (s + 1 === i) {
                        (n -= 3) > -1 && o.push(239, 191, 189);
                        continue
                    }
                    r = e;
                    continue
                }
                if (e < 56320) {
                    (n -= 3) > -1 && o.push(239, 191, 189),
                    r = e;
                    continue
                }
                e = 65536 + (r - 55296 << 10 | e - 56320)
            } else
                r && (n -= 3) > -1 && o.push(239, 191, 189);
            if (r = null,
            e < 128) {
                if ((n -= 1) < 0)
                    break;
                o.push(e)
            } else if (e < 2048) {
                if ((n -= 2) < 0)
                    break;
                o.push(e >> 6 | 192, 63 & e | 128)
            } else if (e < 65536) {
                if ((n -= 3) < 0)
                    break;
                o.push(e >> 12 | 224, e >> 6 & 63 | 128, 63 & e | 128)
            } else {
                if (!(e < 1114112))
                    throw new Error("Invalid code point");
                if ((n -= 4) < 0)
                    break;
                o.push(e >> 18 | 240, e >> 12 & 63 | 128, e >> 6 & 63 | 128, 63 & e | 128)
            }
        }
        return o
    }
    function pa(t) {
        return function(t) {
            var n, e, i, r, o, s;
            Ec || Tc();
            var u = t.length;
            if (u % 4 > 0)
                throw new Error("Invalid string. Length must be a multiple of 4");
            o = "=" === t[u - 2] ? 2 : "=" === t[u - 1] ? 1 : 0,
            s = new kc(3 * u / 4 - o),
            i = o > 0 ? u - 4 : u;
            var c = 0;
            for (n = 0,
            e = 0; n < i; n += 4,
            e += 3)
                r = xc[t.charCodeAt(n)] << 18 | xc[t.charCodeAt(n + 1)] << 12 | xc[t.charCodeAt(n + 2)] << 6 | xc[t.charCodeAt(n + 3)],
                s[c++] = r >> 16 & 255,
                s[c++] = r >> 8 & 255,
                s[c++] = 255 & r;
            return 2 === o ? (r = xc[t.charCodeAt(n)] << 2 | xc[t.charCodeAt(n + 1)] >> 4,
            s[c++] = 255 & r) : 1 === o && (r = xc[t.charCodeAt(n)] << 10 | xc[t.charCodeAt(n + 1)] << 4 | xc[t.charCodeAt(n + 2)] >> 2,
            s[c++] = r >> 8 & 255,
            s[c++] = 255 & r),
            s
        }(function(t) {
            if ((t = function(t) {
                return t.trim ? t.trim() : t.replace(/^\s+|\s+$/g, "")
            }(t).replace(ha, "")).length < 2)
                return "";
            for (; t.length % 4 != 0; )
                t += "=";
            return t
        }(t))
    }
    function ma(t, n, e, i) {
        for (var r = 0; r < i && !(r + e >= n.length || r >= t.length); ++r)
            n[r + e] = t[r];
        return r
    }
    function ga(t) {
        return !!t.constructor && "function" == typeof t.constructor.isBuffer && t.constructor.isBuffer(t)
    }
    class ya {
        constructor(t, n, e) {
            let i, r, o, s, u, c;
            if (!(this instanceof ya))
                return new ya(t,n,e);
            for (this.U = 16,
            this.L = 3.5,
            this.W = 12,
            this.H = "Error 001",
            this.J = "Error 002",
            this.V = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890",
            this.K = "cfhistuCFHISTU",
            this.Y = parseInt(n, 10) > 0 ? n : 0,
            this.Z = "string" == typeof t ? t : "",
            "string" == typeof e && (this.V = e),
            i = "",
            r = 0,
            s = this.V.length; r !== s; r++)
                -1 === i.indexOf(this.V[r]) && (i += this.V[r]);
            if (this.V = i,
            this.V.length < this.U)
                throw this.H.replace("X", this.U);
            if (-1 !== this.V.search(" "))
                throw this.J;
            for (r = 0,
            s = this.K.length; r !== s; r++)
                o = this.V.indexOf(this.K[r]),
                -1 === o ? this.K = this.K.substr(0, r) + " " + this.K.substr(r + 1) : this.V = this.V.substr(0, o) + " " + this.V.substr(o + 1);
            this.V = this.V.replace(/ /g, ""),
            this.K = this.K.replace(/ /g, ""),
            this.K = ba(this.K, this.Z),
            (!this.K.length || this.V.length / this.K.length > this.L) && (u = Math.ceil(this.V.length / this.L),
            1 === u && u++,
            u > this.K.length ? (c = u - this.K.length,
            this.K += this.V.substr(0, c),
            this.V = this.V.substr(c)) : this.K = this.K.substr(0, u)),
            this.V = ba(this.V, this.Z);
            const a = Math.ceil(this.V.length / this.W);
            this.V.length < 3 ? (this.tt = this.K.substr(0, a),
            this.K = this.K.substr(a)) : (this.tt = this.V.substr(0, a),
            this.V = this.V.substr(a))
        }
        c() {
            let t, n, e = Array.prototype.slice.call(arguments);
            if (!e.length)
                return "";
            for (e[0]instanceof Array && (e = e[0]),
            t = 0,
            n = e.length; t !== n; t++)
                if ("number" != typeof e[t] || e[t] % 1 != 0 || e[t] < 0)
                    return "";
            return this.nt(e)
        }
        o(t) {
            const n = [];
            return t.length && "string" == typeof t ? this.et(t, this.V) : n
        }
        h(t) {
            let n, e;
            if (t = t.toString(),
            !/^[0-9a-fA-F]+$/.test(t))
                return "";
            const i = t.match(/[\w\W]{1,12}/g);
            for (n = 0,
            e = i.length; n !== e; n++)
                i[n] = parseInt("1" + i[n], 16);
            return this.c.apply(this, i)
        }
        x(t) {
            let n, e, i = "";
            const r = this.o(t);
            for (n = 0,
            e = r.length; n !== e; n++)
                i += r[n].toString(16).substr(1);
            return i
        }
        p(t) {
            const n = qc.from(t).toString("hex");
            return this.h(n)
        }
        q(t) {
            return qc.from(this.x(t), "hex").toString("utf8")
        }
        nt(t) {
            let n, e, i, r, o, s, u, c, a, l, f = this.V;
            const h = t.length;
            let d = 0;
            for (e = 0,
            i = t.length; e !== i; e++)
                d += t[e] % (e + 100);
            const v = n = f[d % f.length];
            for (e = 0,
            i = t.length; e !== i; e++)
                r = t[e],
                o = v + this.Z + f,
                f = ba(f, o.substr(0, f.length)),
                s = wa(r, f),
                n += s,
                e + 1 < h && (r %= s.charCodeAt(0) + e,
                u = r % this.K.length,
                n += this.K[u]);
            n.length < this.Y && (c = (d + n[0].charCodeAt(0)) % this.tt.length,
            a = this.tt[c],
            n = a + n,
            n.length < this.Y && (c = (d + n[2].charCodeAt(0)) % this.tt.length,
            a = this.tt[c],
            n += a));
            const p = parseInt(f.length / 2, 10);
            for (; n.length < this.Y; )
                f = ba(f, f),
                n = f.substr(p) + n + f.substr(0, p),
                l = n.length - this.Y,
                l > 0 && (n = n.substr(l / 2, this.Y));
            return n
        }
        et(t, n) {
            let e, i, r, o, s = [], u = 0, c = new RegExp("[" + this.tt + "]","g"), a = t.replace(c, " "), l = a.split(" ");
            if (3 !== l.length && 2 !== l.length || (u = 1),
            a = l[u],
            void 0 !== a[0]) {
                for (e = a[0],
                a = a.substr(1),
                c = new RegExp("[" + this.K + "]","g"),
                a = a.replace(c, " "),
                l = a.split(" "),
                u = 0,
                i = l.length; u !== i; u++)
                    r = l[u],
                    o = e + this.Z + n,
                    n = ba(n, o.substr(0, n.length)),
                    s.push(Xa(r, n));
                this.nt(s) !== t && (s = [])
            }
            return s
        }
    }
    function ba(t, n) {
        let e, i, r, o, s, u;
        if (!n.length)
            return t;
        for (o = t.length - 1,
        s = 0,
        u = 0; o > 0; o--,
        s++)
            s %= n.length,
            u += e = n[s].charCodeAt(0),
            i = (e + s + u) % o,
            r = t[i],
            t = (t = t.substr(0, i) + t[o] + t.substr(i + 1)).substr(0, o) + r + t.substr(o + 1);
        return t
    }
    function wa(t, n) {
        let e = "";
        const i = n.length;
        do {
            e = n[t % i] + e,
            t = parseInt(t / i, 10)
        } while (t);
        return e
    }
    function Xa(t, n) {
        let e, i, r = 0;
        for (i = 0; i < t.length; i++)
            e = n.indexOf(t[i]),
            r += e * Math.pow(n.length, t.length - i - 1);
        return r
    }
    function xa(t) {
        let n, e, i;
        return {
            c() {
                n = ms("input"),
                Xs(n, "placeholder", t[1]),
                Xs(n, "autocomplete", t[2]),
                n.autofocus = t[3],
                Xs(n, "maxlength", t[4]),
                n.disabled = t[6],
                Xs(n, "class", "svelte-1bm78md"),
                Ts(n, "gray", t[5])
            },
            m(r, o) {
                ds(r, n, o),
                Es(n, t[0]),
                e || (i = [fs(t[7].call(null, n)), ws(n, "input", t[10]), ws(n, "input", t[9])],
                e = !0)
            },
            p(t, [e]) {
                2 & e && Xs(n, "placeholder", t[1]),
                4 & e && Xs(n, "autocomplete", t[2]),
                8 & e && (n.autofocus = t[3]),
                16 & e && Xs(n, "maxlength", t[4]),
                64 & e && (n.disabled = t[6]),
                1 & e && n.value !== t[0] && Es(n, t[0]),
                32 & e && Ts(n, "gray", t[5])
            },
            i: ns,
            o: ns,
            d(t) {
                t && vs(n),
                e = !1,
                rs(i)
            }
        }
    }
    function ka(t, n, e) {
        let {placeholder: i} = n
          , {type: r="text"} = n
          , {value: o} = n
          , {autocomplete: s} = n
          , {autofocus: u} = n
          , {maxlength: c} = n
          , {gray: a=!1} = n
          , {disabled: l} = n;
        return t.$$set = t => {
            "placeholder"in t && e(1, i = t.placeholder),
            "type"in t && e(8, r = t.type),
            "value"in t && e(0, o = t.value),
            "autocomplete"in t && e(2, s = t.autocomplete),
            "autofocus"in t && e(3, u = t.autofocus),
            "maxlength"in t && e(4, c = t.maxlength),
            "gray"in t && e(5, a = t.gray),
            "disabled"in t && e(6, l = t.disabled)
        }
        ,
        [o, i, s, u, c, a, l, function(t) {
            t.type = r
        }
        , r, function(n) {
            _s(t, n)
        }
        , function() {
            o = this.value,
            e(0, o)
        }
        ]
    }
    class Ea extends eu {
        constructor(t) {
            super(),
            nu(this, t, ka, xa, ss, {
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
    function Ta(t) {
        let n, e, i, r, o, s, u, c, a, l;
        function f(n) {
            t[5](n)
        }
        let h = {
            maxlength: "6",
            placeholder: "请输入验证码",
            autocomplete: "off"
        };
        return void 0 !== t[0] && (h.value = t[0]),
        e = new Ea({
            props: h
        }),
        Ds.push(( () => Qs(e, "value", f))),
        {
            c() {
                n = ms("div"),
                Ys(e.$$.fragment),
                r = ys(),
                o = ms("div"),
                s = ms("button"),
                u = gs(t[1]),
                s.disabled = t[2],
                Xs(s, "class", "svelte-1ci3qls"),
                Xs(o, "class", "code-input-button svelte-1ci3qls"),
                Xs(n, "class", "code-input svelte-1ci3qls")
            },
            m(i, f) {
                ds(i, n, f),
                Zs(e, n, null),
                hs(n, r),
                hs(n, o),
                hs(o, s),
                hs(s, u),
                c = !0,
                a || (l = ws(s, "click", t[3]),
                a = !0)
            },
            p(t, [n]) {
                const r = {};
                !i && 1 & n && (i = !0,
                r.value = t[0],
                Rs(( () => i = !1))),
                e.$set(r),
                (!c || 2 & n) && ks(u, t[1]),
                (!c || 4 & n) && (s.disabled = t[2])
            },
            i(t) {
                c || (Vs(e.$$.fragment, t),
                c = !0)
            },
            o(t) {
                Ks(e.$$.fragment, t),
                c = !1
            },
            d(t) {
                t && vs(n),
                tu(e),
                a = !1,
                l()
            }
        }
    }
    function Sa(t, n, e) {
        let {cell: i} = n
          , {code: r=""} = n;
        const o = d("viewVerifyCode");
        let s = "发送验证码"
          , u = !1
          , c = 60
          , a = null;
        function l() {
            e(1, s = "重新发送"),
            e(2, u = !1),
            a && (clearInterval(a),
            a = null)
        }
        return As(( () => {
            l()
        }
        )),
        t.$$set = t => {
            "cell"in t && e(4, i = t.cell),
            "code"in t && e(0, r = t.code)
        }
        ,
        [r, s, u, async function() {
            e(2, u = !0);
            try {
                await async function(t) {
                    if (!t)
                        return wt(yn, {});
                    return wt(bn, {
                        loginName: t,
                        token: new ya(t).p(t)
                    })
                }(i) ? (c = 60,
                e(1, s = "已发送 (" + c + "s)"),
                a = setInterval(( () => {
                    c--,
                    c <= 0 ? l() : e(1, s = "已发送 (" + c + "s)")
                }
                ), Y.SECOND)) : e(2, u = !1)
            } catch (t) {
                o(t),
                e(2, u = !1)
            }
        }
        , i, function(t) {
            r = t,
            e(0, r)
        }
        ]
    }
    class ja extends eu {
        constructor(t) {
            super(),
            nu(this, t, Sa, Ta, ss, {
                cell: 4,
                code: 0
            })
        }
    }
    function Ca(t) {
        let n;
        return {
            c() {
                n = ms("p"),
                n.textContent = "本账号在过多设备上登录，未防止盗号，请绑定手机。"
            },
            m(t, e) {
                ds(t, n, e)
            },
            p: ns,
            i: ns,
            o: ns,
            d(t) {
                t && vs(n)
            }
        }
    }
    function Aa(t) {
        let n, e, i, r, o, s, u, c, a, l;
        function f(n) {
            t[4](n)
        }
        let h = {};
        return void 0 !== t[2] && (h.code = t[2]),
        c = new ja({
            props: h
        }),
        Ds.push(( () => Qs(c, "code", f))),
        {
            c() {
                n = ms("p"),
                n.textContent = "本账号在过多设备上登录，需二次验证身份。",
                e = ys(),
                i = ms("div"),
                r = gs("我们将向"),
                o = gs(t[1]),
                s = gs("的手机号发送验证码。"),
                u = ys(),
                Ys(c.$$.fragment),
                Xs(i, "class", "tip svelte-15ra0dz")
            },
            m(t, a) {
                ds(t, n, a),
                ds(t, e, a),
                ds(t, i, a),
                hs(i, r),
                hs(i, o),
                hs(i, s),
                ds(t, u, a),
                Zs(c, t, a),
                l = !0
            },
            p(t, n) {
                (!l || 2 & n) && ks(o, t[1]);
                const e = {};
                !a && 4 & n && (a = !0,
                e.code = t[2],
                Rs(( () => a = !1))),
                c.$set(e)
            },
            i(t) {
                l || (Vs(c.$$.fragment, t),
                l = !0)
            },
            o(t) {
                Ks(c.$$.fragment, t),
                l = !1
            },
            d(t) {
                t && vs(n),
                t && vs(e),
                t && vs(i),
                t && vs(u),
                tu(c, t)
            }
        }
    }
    function Oa(t) {
        let n, e, i, r, o, s;
        const u = [Aa, Ca]
          , c = [];
        function a(t, n) {
            return t[1] ? 0 : 1
        }
        return r = a(t),
        o = c[r] = u[r](t),
        {
            c() {
                n = ms("div"),
                n.textContent = "二次验证",
                e = ys(),
                i = ms("div"),
                o.c(),
                Xs(n, "title", ""),
                Xs(i, "description", ""),
                Xs(i, "class", "svelte-15ra0dz")
            },
            m(t, o) {
                ds(t, n, o),
                ds(t, e, o),
                ds(t, i, o),
                c[r].m(i, null),
                s = !0
            },
            p(t, n) {
                let e = r;
                r = a(t),
                r === e ? c[r].p(t, n) : (Hs(),
                Ks(c[e], 1, 1, ( () => {
                    c[e] = null
                }
                )),
                Js(),
                o = c[r],
                o ? o.p(t, n) : (o = c[r] = u[r](t),
                o.c()),
                Vs(o, 1),
                o.m(i, null))
            },
            i(t) {
                s || (Vs(o),
                s = !0)
            },
            o(t) {
                Ks(o),
                s = !1
            },
            d(t) {
                t && vs(n),
                t && vs(e),
                t && vs(i),
                c[r].d()
            }
        }
    }
    function _a(t) {
        let n, e, i;
        function r(n) {
            t[5](n)
        }
        let o = {
            okButtonText: t[1] ? "身份验证" : "绑定手机",
            cancelButtonText: "退出登录",
            okButtonDisabled: t[1] && !t[2],
            action: t[3],
            $$slots: {
                default: [Oa]
            },
            $$scope: {
                ctx: t
            }
        };
        return void 0 !== t[0] && (o.open = t[0]),
        n = new pc({
            props: o
        }),
        Ds.push(( () => Qs(n, "open", r))),
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
                2 & i && (r.okButtonText = t[1] ? "身份验证" : "绑定手机"),
                6 & i && (r.okButtonDisabled = t[1] && !t[2]),
                70 & i && (r.$$scope = {
                    dirty: i,
                    ctx: t
                }),
                !e && 1 & i && (e = !0,
                r.open = t[0],
                Rs(( () => e = !1))),
                n.$set(r)
            },
            i(t) {
                i || (Vs(n.$$.fragment, t),
                i = !0)
            },
            o(t) {
                Ks(n.$$.fragment, t),
                i = !1
            },
            d(t) {
                tu(n, t)
            }
        }
    }
    function Ba(t, n, e) {
        let i, {open: r} = n, {cell: o} = n;
        return t.$$set = t => {
            "open"in t && e(0, r = t.open),
            "cell"in t && e(1, o = t.cell)
        }
        ,
        [r, o, i, async function(t) {
            if (!t)
                return await ts(),
                !0;
            if (!o)
                return location.href = jn,
                !0;
            if (i) {
                const t = await (n = gn,
                e = {
                    code: i
                },
                bt(n, xt(e, "PUT"), r));
                if (t) {
                    const {closedSessionCount: n} = t;
                    return Vt.show("验证成功，登出" + n + "个其他设备"),
                    !0
                }
            }
            var n, e, r;
            return !1
        }
        , function(t) {
            i = t,
            e(2, i)
        }
        , function(t) {
            r = t,
            e(0, r)
        }
        ]
    }
    class Da extends eu {
        constructor(t) {
            super(),
            nu(this, t, Ba, _a, ss, {
                open: 0,
                cell: 1
            })
        }
    }
    function qa(t, n, e) {
        const i = t.slice();
        return i[8] = n[e],
        i
    }
    function Ia(t) {
        let n, e, i, r = t[8].icon + "";
        return {
            c() {
                n = ms("span"),
                e = gs(r),
                Xs(n, "class", "icon yoopu3-icon svelte-av5z1h"),
                Xs(n, "style", i = t[8].iconColor ? `color: ${t[8].iconColor}` : "")
            },
            m(t, i) {
                ds(t, n, i),
                hs(n, e)
            },
            p(t, o) {
                2 & o && r !== (r = t[8].icon + "") && ks(e, r),
                2 & o && i !== (i = t[8].iconColor ? `color: ${t[8].iconColor}` : "") && Xs(n, "style", i)
            },
            d(t) {
                t && vs(n)
            }
        }
    }
    function Ma(t) {
        let n, e, i, r, o, s, u, c, a, l, f = t[8].title + "", h = t[8].icon && Ia(t);
        function d() {
            return t[5](t[8])
        }
        return {
            c() {
                n = ms("div"),
                e = ms("span"),
                e.innerHTML = '<span class="checkmark-checked svelte-av5z1h"></span>',
                i = ys(),
                r = ms("div"),
                h && h.c(),
                o = ys(),
                s = ms("span"),
                u = gs(f),
                c = ys(),
                Xs(e, "class", "checkmark svelte-av5z1h"),
                Xs(s, "class", "title svelte-av5z1h"),
                Xs(r, "class", "content svelte-av5z1h"),
                Xs(n, "class", "option svelte-av5z1h"),
                Ts(n, "bottom-line", t[3]),
                Ts(n, "reverse", t[4]),
                Ts(n, "selected", t[8].value == t[0]),
                Ts(n, "disabled", t[8].disabled)
            },
            m(t, f) {
                ds(t, n, f),
                hs(n, e),
                hs(n, i),
                hs(n, r),
                h && h.m(r, null),
                hs(r, o),
                hs(r, s),
                hs(s, u),
                hs(n, c),
                a || (l = ws(n, "click", d),
                a = !0)
            },
            p(e, i) {
                (t = e)[8].icon ? h ? h.p(t, i) : (h = Ia(t),
                h.c(),
                h.m(r, o)) : h && (h.d(1),
                h = null),
                2 & i && f !== (f = t[8].title + "") && ks(u, f),
                8 & i && Ts(n, "bottom-line", t[3]),
                16 & i && Ts(n, "reverse", t[4]),
                3 & i && Ts(n, "selected", t[8].value == t[0]),
                2 & i && Ts(n, "disabled", t[8].disabled)
            },
            d(t) {
                t && vs(n),
                h && h.d(),
                a = !1,
                l()
            }
        }
    }
    function Fa(t) {
        let n, e = t[1], i = [];
        for (let n = 0; n < e.length; n += 1)
            i[n] = Ma(qa(t, e, n));
        return {
            c() {
                n = ms("div");
                for (let t = 0; t < i.length; t += 1)
                    i[t].c();
                Xs(n, "class", "container svelte-av5z1h"),
                Ts(n, "check-style", t[2])
            },
            m(t, e) {
                ds(t, n, e);
                for (let t = 0; t < i.length; t += 1)
                    i[t].m(n, null)
            },
            p(t, [r]) {
                if (27 & r) {
                    let o;
                    for (e = t[1],
                    o = 0; o < e.length; o += 1) {
                        const s = qa(t, e, o);
                        i[o] ? i[o].p(s, r) : (i[o] = Ma(s),
                        i[o].c(),
                        i[o].m(n, null))
                    }
                    for (; o < i.length; o += 1)
                        i[o].d(1);
                    i.length = e.length
                }
                4 & r && Ts(n, "check-style", t[2])
            },
            i: ns,
            o: ns,
            d(t) {
                t && vs(n),
                ps(i, t)
            }
        }
    }
    function Na(t, n, e) {
        let {options: i=[]} = n
          , {selected: r} = n
          , {checkStyle: o=!1} = n
          , {bottomLine: s=!1} = n
          , {reverse: u=!1} = n;
        const c = Os();
        return t.$$set = t => {
            "options"in t && e(1, i = t.options),
            "selected"in t && e(0, r = t.selected),
            "checkStyle"in t && e(2, o = t.checkStyle),
            "bottomLine"in t && e(3, s = t.bottomLine),
            "reverse"in t && e(4, u = t.reverse)
        }
        ,
        t.$$.update = () => {
            1 & t.$$.dirty && c("change")
        }
        ,
        [r, i, o, s, u, t => e(0, r = t.value)]
    }
    class $a extends eu {
        constructor(t) {
            super(),
            nu(this, t, Na, Fa, ss, {
                options: 1,
                selected: 0,
                checkStyle: 2,
                bottomLine: 3,
                reverse: 4
            })
        }
    }
    function Ra(t) {
        let n, e, i, r, o;
        function s(n) {
            t[4](n)
        }
        let u = {
            options: t[2]
        };
        return void 0 !== t[1] && (u.selected = t[1]),
        i = new $a({
            props: u
        }),
        Ds.push(( () => Qs(i, "selected", s))),
        i.$on("change", t[3]),
        {
            c() {
                n = ms("div"),
                n.textContent = "黑夜模式设置",
                e = ys(),
                Ys(i.$$.fragment),
                Xs(n, "title", "")
            },
            m(t, r) {
                ds(t, n, r),
                ds(t, e, r),
                Zs(i, t, r),
                o = !0
            },
            p(t, n) {
                const e = {};
                !r && 2 & n && (r = !0,
                e.selected = t[1],
                Rs(( () => r = !1))),
                i.$set(e)
            },
            i(t) {
                o || (Vs(i.$$.fragment, t),
                o = !0)
            },
            o(t) {
                Ks(i.$$.fragment, t),
                o = !1
            },
            d(t) {
                t && vs(n),
                t && vs(e),
                tu(i, t)
            }
        }
    }
    function Ga(t) {
        let n, e, i;
        function r(n) {
            t[5](n)
        }
        let o = {
            cancelButtonText: "",
            noButtons: !0,
            $$slots: {
                default: [Ra]
            },
            $$scope: {
                ctx: t
            }
        };
        return void 0 !== t[0] && (o.open = t[0]),
        n = new pc({
            props: o
        }),
        Ds.push(( () => Qs(n, "open", r))),
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
                Rs(( () => e = !1))),
                n.$set(r)
            },
            i(t) {
                i || (Vs(n.$$.fragment, t),
                i = !0)
            },
            o(t) {
                Ks(n.$$.fragment, t),
                i = !1
            },
            d(t) {
                tu(n, t)
            }
        }
    }
    function Pa(t, n, e) {
        let i;
        us(t, xu, (t => e(6, i = t)));
        let {open: r} = n
          , o = i;
        const s = [{
            title: "自动 (追随系统)",
            value: hu
        }, {
            title: "强制开启",
            value: vu
        }, {
            title: "强制关闭",
            value: du
        }];
        return t.$$set = t => {
            "open"in t && e(0, r = t.open)
        }
        ,
        [r, o, s, function() {
            xu.set(o),
            e(0, r = !1)
        }
        , function(t) {
            o = t,
            e(1, o)
        }
        , function(t) {
            r = t,
            e(0, r)
        }
        ]
    }
    class Ua extends eu {
        constructor(t) {
            super(),
            nu(this, t, Pa, Ga, ss, {
                open: 0
            })
        }
    }
    function La(n) {
        let e, i, r, o, s, u, c, a, l, f, h, d, v, p, m, g, y, b, w, X, x, k, E, T, S = n[1] && function(n) {
            let e, i, r, o, s, u, c, a;
            return {
                c() {
                    e = ms("label"),
                    i = ms("div"),
                    r = ms("img"),
                    s = ys(),
                    u = ms("div"),
                    u.innerHTML = '<div class="minor svelte-1kspwqr">五线谱+功能谱</div> \n          <div class="main svelte-1kspwqr">钢琴</div> \n          <div class="promotion svelte-1kspwqr">新！免费会员发放中</div>',
                    r.src !== (o = "//cdn.yopu.co/img/selection-piano.1beed644.svg") && Xs(r, "src", "//cdn.yopu.co/img/selection-piano.1beed644.svg"),
                    Xs(r, "class", "svelte-1kspwqr"),
                    Xs(u, "class", "label svelte-1kspwqr"),
                    Xs(i, "class", "checkbox svelte-1kspwqr"),
                    Xs(e, "class", "option svelte-1kspwqr"),
                    Ts(e, "checked", n[0] === t.PIANO)
                },
                m(t, o) {
                    ds(t, e, o),
                    hs(e, i),
                    hs(i, r),
                    hs(i, s),
                    hs(i, u),
                    c || (a = ws(e, "click", n[4]),
                    c = !0)
                },
                p(n, i) {
                    1 & i && Ts(e, "checked", n[0] === t.PIANO)
                },
                d(t) {
                    t && vs(e),
                    c = !1,
                    a()
                }
            }
        }(n);
        return {
            c() {
                e = ms("div"),
                S && S.c(),
                i = ys(),
                r = ms("label"),
                o = ms("div"),
                s = ms("img"),
                c = ys(),
                a = ms("div"),
                a.innerHTML = '<div class="minor svelte-1kspwqr">六线谱+和弦谱</div> \n        <div class="main svelte-1kspwqr">吉他</div>',
                l = ys(),
                f = ms("label"),
                h = ms("div"),
                d = ms("img"),
                p = ys(),
                m = ms("div"),
                m.innerHTML = '<div class="minor svelte-1kspwqr">四线谱+和弦谱</div> \n        <div class="main svelte-1kspwqr">尤克里里</div>',
                g = ys(),
                y = ms("label"),
                b = ms("div"),
                w = ms("img"),
                x = ys(),
                k = ms("div"),
                k.innerHTML = '<div class="minor svelte-1kspwqr">简谱</div> \n        <div class="main svelte-1kspwqr">民乐</div>',
                s.src !== (u = "//cdn.yopu.co/img/selection-guitar.39468ba1.svg") && Xs(s, "src", "//cdn.yopu.co/img/selection-guitar.39468ba1.svg"),
                Xs(s, "class", "svelte-1kspwqr"),
                Xs(a, "class", "label svelte-1kspwqr"),
                Xs(o, "class", "checkbox svelte-1kspwqr"),
                Xs(r, "class", "option svelte-1kspwqr"),
                Ts(r, "checked", n[0] === t.GUITAR),
                d.src !== (v = "//cdn.yopu.co/img/selection-ukulele.4025607e.svg") && Xs(d, "src", "//cdn.yopu.co/img/selection-ukulele.4025607e.svg"),
                Xs(d, "class", "svelte-1kspwqr"),
                Xs(m, "class", "label svelte-1kspwqr"),
                Xs(h, "class", "checkbox svelte-1kspwqr"),
                Xs(f, "class", "option svelte-1kspwqr"),
                Ts(f, "checked", n[0] === t.UKULELE),
                w.src !== (X = "//cdn.yopu.co/img/selection-jian.8213afc4.svg") && Xs(w, "src", "//cdn.yopu.co/img/selection-jian.8213afc4.svg"),
                Xs(w, "class", "svelte-1kspwqr"),
                Xs(k, "class", "label svelte-1kspwqr"),
                Xs(b, "class", "checkbox svelte-1kspwqr"),
                Xs(y, "class", "option svelte-1kspwqr"),
                Ts(y, "checked", n[0] === t.JIAN),
                Xs(e, "class", "options svelte-1kspwqr")
            },
            m(t, u) {
                ds(t, e, u),
                S && S.m(e, null),
                hs(e, i),
                hs(e, r),
                hs(r, o),
                hs(o, s),
                hs(o, c),
                hs(o, a),
                hs(e, l),
                hs(e, f),
                hs(f, h),
                hs(h, d),
                hs(h, p),
                hs(h, m),
                hs(e, g),
                hs(e, y),
                hs(y, b),
                hs(b, w),
                hs(b, x),
                hs(b, k),
                E || (T = [ws(r, "click", n[5]), ws(f, "click", n[6]), ws(y, "click", n[7])],
                E = !0)
            },
            p(n, [e]) {
                n[1] && S.p(n, e),
                1 & e && Ts(r, "checked", n[0] === t.GUITAR),
                1 & e && Ts(f, "checked", n[0] === t.UKULELE),
                1 & e && Ts(y, "checked", n[0] === t.JIAN)
            },
            i: ns,
            o: ns,
            d(t) {
                t && vs(e),
                S && S.d(),
                E = !1,
                rs(T)
            }
        }
    }
    function za(n, e, i) {
        let {instrument: r} = e
          , {user: o=Jo()} = e;
        o && ct(o.role, rt);
        const s = Os();
        function u(t) {
            i(0, r = t),
            s("change")
        }
        return n.$$set = t => {
            "instrument"in t && i(0, r = t.instrument),
            "user"in t && i(3, o = t.user)
        }
        ,
        [r, !0, u, o, () => u(t.PIANO), () => u(t.GUITAR), () => u(t.UKULELE), () => u(t.JIAN)]
    }
    class Wa extends eu {
        constructor(t) {
            super(),
            nu(this, t, za, La, ss, {
                instrument: 0,
                user: 3
            })
        }
    }
    function Ha(t, n) {
        for (let e = 0; e < t.length; ++e)
            if (n.artist.toLowerCase().indexOf(t[e]) < 0 && n.title.toLowerCase().indexOf(t[e]) < 0)
                return !1;
        return !0
    }
    const Ja = ["初级", "进阶", "指弹", "弹唱", "吉他", "尤克里里"];
    let Va;
    function Ka() {
        return Va || (Va = new Qa),
        Va
    }
    class Qa {
        constructor() {
            this.it = {},
            this.rt = null
        }
        getHotQueries(n) {
            return n = n || t.GUITAR,
            this.ot(n).then((t => t.slice(0, 50))).then((t => class {
                static chunk(t, n, e, i=0) {
                    return Array.isArray(t) ? new Promise((r => {
                        const o = t.slice(i, i + e);
                        if (0 === o.length)
                            return r(t);
                        o.forEach(n),
                        setTimeout(( () => {
                            this.chunk(t, n, e, i + o.length).then(r)
                        }
                        ), 1)
                    }
                    )) : Promise.resolve()
                }
                static shuffle(t) {
                    let n, e, i = t.length;
                    for (; 0 !== i; )
                        e = Math.floor(Math.random() * i),
                        i -= 1,
                        n = t[i],
                        t[i] = t[e],
                        t[e] = n;
                    return t
                }
            }
            .shuffle(t))).then((t => t.slice(0, 16)))
        }
        getHistoryQueries() {
            return null == this.rt && (this.rt = E.getJson(g) || []),
            this.rt
        }
        addHistoryQuery(t) {
            if (0 === t.trim().length)
                return;
            if (Ja.indexOf(t) >= 0)
                return;
            this.getHistoryQueries();
            const n = this.rt.indexOf(t);
            n >= 0 && this.rt.splice(n, 1),
            this.rt.unshift(t),
            this.rt.length > 5 && this.rt.pop(),
            E.setJson(g, this.rt)
        }
        clearHistoryQuery() {
            this.rt = [],
            E.setJson(g, this.rt)
        }
        getAutoCompletion(n, e) {
            return n = n || t.GUITAR,
            this.ot(n).then((t => {
                const n = [];
                for (let i = 0; i < t.length && n.length < 5; ++i)
                    0 === t[i].indexOf(e.toLowerCase()) && n.push(t[i]);
                return n
            }
            ))
        }
        ot(t) {
            return this.it[t] || (this.it[t] = this.st(t)),
            this.it[t].then((t => t || []))
        }
        async st(t) {
            const n = Do + t
              , e = await async function(t) {
                const n = await Io(t);
                try {
                    return null == n ? null : JSON.parse(n)
                } catch (t) {
                    return null
                }
            }(n);
            if (e && e.timestamp > Date.now() - Y.DAY)
                return e.queries;
            const i = await bt(S(Sn, {
                instrument: t
            }));
            return i && await async function(t, n) {
                if (n && !(n instanceof Object))
                    throw new Error("Value is not JSON: key=" + t + ", value=" + n);
                return await qo(t, n ? JSON.stringify(n) : null)
            }(n, {
                timestamp: Date.now(),
                queries: i
            }),
            i || []
        }
    }
    function Ya(t, n, e) {
        const i = t.slice();
        return i[10] = n[e],
        i
    }
    function Za(t, n, e) {
        const i = t.slice();
        return i[13] = n[e],
        i
    }
    function tl(t) {
        let n, e, i, r, o, s, u, c, a = t[13] + "";
        function l() {
            return t[4](t[13])
        }
        return {
            c() {
                n = ms("div"),
                e = ms("i"),
                e.textContent = "",
                i = ys(),
                r = ms("span"),
                o = gs(a),
                s = ys(),
                Xs(e, "class", "yoopu3-icon svelte-vbhppz"),
                Xs(n, "class", "row svelte-vbhppz")
            },
            m(t, a) {
                ds(t, n, a),
                hs(n, e),
                hs(n, i),
                hs(n, r),
                hs(r, o),
                hs(n, s),
                u || (c = ws(n, "click", l),
                u = !0)
            },
            p(n, e) {
                t = n,
                1 & e && a !== (a = t[13] + "") && ks(o, a)
            },
            d(t) {
                t && vs(n),
                u = !1,
                c()
            }
        }
    }
    function nl(t) {
        let n, e, i, r = t[1], o = [];
        for (let n = 0; n < r.length; n += 1)
            o[n] = el(Ya(t, r, n));
        return {
            c() {
                n = ms("h5"),
                n.textContent = "我的原创和收藏",
                e = ys(),
                i = ms("div");
                for (let t = 0; t < o.length; t += 1)
                    o[t].c();
                Xs(n, "class", "svelte-vbhppz"),
                Xs(i, "class", "list svelte-vbhppz")
            },
            m(t, r) {
                ds(t, n, r),
                ds(t, e, r),
                ds(t, i, r);
                for (let t = 0; t < o.length; t += 1)
                    o[t].m(i, null)
            },
            p(t, n) {
                if (2 & n) {
                    let e;
                    for (r = t[1],
                    e = 0; e < r.length; e += 1) {
                        const s = Ya(t, r, e);
                        o[e] ? o[e].p(s, n) : (o[e] = el(s),
                        o[e].c(),
                        o[e].m(i, null))
                    }
                    for (; e < o.length; e += 1)
                        o[e].d(1);
                    o.length = r.length
                }
            },
            d(t) {
                t && vs(n),
                t && vs(e),
                t && vs(i),
                ps(o, t)
            }
        }
    }
    function el(t) {
        let n, e, i, r, o, s, u, c, a, l = t[10].artist + "", f = t[10].title + "";
        return {
            c() {
                n = ms("a"),
                e = ms("i"),
                e.textContent = "",
                i = ys(),
                r = ms("span"),
                o = gs(l),
                s = gs(" - "),
                u = gs(f),
                c = ys(),
                Xs(e, "class", "yoopu3-icon svelte-vbhppz"),
                Xs(n, "class", "row svelte-vbhppz"),
                Xs(n, "href", a = "/view/" + t[10].id)
            },
            m(t, a) {
                ds(t, n, a),
                hs(n, e),
                hs(n, i),
                hs(n, r),
                hs(r, o),
                hs(r, s),
                hs(r, u),
                hs(n, c)
            },
            p(t, e) {
                2 & e && l !== (l = t[10].artist + "") && ks(o, l),
                2 & e && f !== (f = t[10].title + "") && ks(u, f),
                2 & e && a !== (a = "/view/" + t[10].id) && Xs(n, "href", a)
            },
            d(t) {
                t && vs(n)
            }
        }
    }
    function il(t) {
        let n, e, i, r = t[0], o = [];
        for (let n = 0; n < r.length; n += 1)
            o[n] = tl(Za(t, r, n));
        let s = t[1].length && nl(t);
        return {
            c() {
                n = ms("section"),
                e = ms("div");
                for (let t = 0; t < o.length; t += 1)
                    o[t].c();
                i = ys(),
                s && s.c(),
                Xs(e, "class", "list svelte-vbhppz"),
                Xs(n, "class", "searchAutoComplete svelte-vbhppz")
            },
            m(t, r) {
                ds(t, n, r),
                hs(n, e);
                for (let t = 0; t < o.length; t += 1)
                    o[t].m(e, null);
                hs(n, i),
                s && s.m(n, null)
            },
            p(t, [i]) {
                if (5 & i) {
                    let n;
                    for (r = t[0],
                    n = 0; n < r.length; n += 1) {
                        const s = Za(t, r, n);
                        o[n] ? o[n].p(s, i) : (o[n] = tl(s),
                        o[n].c(),
                        o[n].m(e, null))
                    }
                    for (; n < o.length; n += 1)
                        o[n].d(1);
                    o.length = r.length
                }
                t[1].length ? s ? s.p(t, i) : (s = nl(t),
                s.c(),
                s.m(n, null)) : s && (s.d(1),
                s = null)
            },
            i: ns,
            o: ns,
            d(t) {
                t && vs(n),
                ps(o, t),
                s && s.d()
            }
        }
    }
    function rl(t, n, e) {
        let i;
        us(t, su, (t => e(5, i = t)));
        let {query: r} = n;
        const o = Ka()
          , s = Os();
        let u = []
          , c = [];
        async function a(t) {
            e(1, c = Jo() ? await function(t) {
                const n = Et(t)
                  , e = Ha.bind(null, n);
                return Vo().then((t => {
                    if (!t)
                        return [];
                    let n = [];
                    return t.sheets && (n = n.concat(t.sheets)),
                    t.favorites && (n = n.concat(t.favorites)),
                    n.filter(e)
                }
                ))
            }(t) : [])
        }
        function l(t) {
            s("search", {
                query: t
            })
        }
        return t.$$set = t => {
            "query"in t && e(3, r = t.query)
        }
        ,
        t.$$.update = () => {
            8 & t.$$.dirty && async function() {
                e(0, u = await o.getAutoCompletion(i, r))
            }(),
            8 & t.$$.dirty && a(r)
        }
        ,
        [u, c, l, r, t => l(t)]
    }
    class ol extends eu {
        constructor(t) {
            super(),
            nu(this, t, rl, il, ss, {
                query: 3
            })
        }
    }
    function sl(t, n, e) {
        const i = t.slice();
        return i[10] = n[e],
        i
    }
    function ul(t, n, e) {
        const i = t.slice();
        return i[10] = n[e],
        i
    }
    function cl(t) {
        let n, e, i, r, o, s, u, c, a, l = t[0], f = [];
        for (let n = 0; n < l.length; n += 1)
            f[n] = al(ul(t, l, n));
        return {
            c() {
                n = ms("section"),
                e = ms("div"),
                i = ms("span"),
                i.textContent = "搜索历史",
                r = ys(),
                o = ms("span"),
                o.textContent = "清除记录",
                s = ys(),
                u = ms("div");
                for (let t = 0; t < f.length; t += 1)
                    f[t].c();
                Xs(o, "class", "right button svelte-1pln1xx"),
                Xs(e, "class", "title svelte-1pln1xx"),
                Xs(u, "class", "queries svelte-1pln1xx"),
                Xs(n, "class", "svelte-1pln1xx")
            },
            m(l, h) {
                ds(l, n, h),
                hs(n, e),
                hs(e, i),
                hs(e, r),
                hs(e, o),
                hs(n, s),
                hs(n, u);
                for (let t = 0; t < f.length; t += 1)
                    f[t].m(u, null);
                c || (a = ws(o, "click", t[3]),
                c = !0)
            },
            p(t, n) {
                if (5 & n) {
                    let e;
                    for (l = t[0],
                    e = 0; e < l.length; e += 1) {
                        const i = ul(t, l, e);
                        f[e] ? f[e].p(i, n) : (f[e] = al(i),
                        f[e].c(),
                        f[e].m(u, null))
                    }
                    for (; e < f.length; e += 1)
                        f[e].d(1);
                    f.length = l.length
                }
            },
            d(t) {
                t && vs(n),
                ps(f, t),
                c = !1,
                a()
            }
        }
    }
    function al(t) {
        let n, e, i, r, o = t[10] + "";
        function s() {
            return t[5](t[10])
        }
        return {
            c() {
                n = ms("span"),
                e = gs(o),
                Xs(n, "class", "query svelte-1pln1xx")
            },
            m(t, o) {
                ds(t, n, o),
                hs(n, e),
                i || (r = ws(n, "click", s),
                i = !0)
            },
            p(n, i) {
                t = n,
                1 & i && o !== (o = t[10] + "") && ks(e, o)
            },
            d(t) {
                t && vs(n),
                i = !1,
                r()
            }
        }
    }
    function ll(t) {
        let n, e, i, r, o = t[1], s = [];
        for (let n = 0; n < o.length; n += 1)
            s[n] = fl(sl(t, o, n));
        return {
            c() {
                n = ms("section"),
                e = ms("div"),
                e.textContent = "热门搜索",
                i = ys(),
                r = ms("div");
                for (let t = 0; t < s.length; t += 1)
                    s[t].c();
                Xs(e, "class", "title svelte-1pln1xx"),
                Xs(r, "class", "queries svelte-1pln1xx"),
                Xs(n, "class", "svelte-1pln1xx")
            },
            m(t, o) {
                ds(t, n, o),
                hs(n, e),
                hs(n, i),
                hs(n, r);
                for (let t = 0; t < s.length; t += 1)
                    s[t].m(r, null)
            },
            p(t, n) {
                if (6 & n) {
                    let e;
                    for (o = t[1],
                    e = 0; e < o.length; e += 1) {
                        const i = sl(t, o, e);
                        s[e] ? s[e].p(i, n) : (s[e] = fl(i),
                        s[e].c(),
                        s[e].m(r, null))
                    }
                    for (; e < s.length; e += 1)
                        s[e].d(1);
                    s.length = o.length
                }
            },
            d(t) {
                t && vs(n),
                ps(s, t)
            }
        }
    }
    function fl(t) {
        let n, e, i, r, o = t[10] + "";
        function s() {
            return t[6](t[10])
        }
        return {
            c() {
                n = ms("span"),
                e = gs(o),
                Xs(n, "class", "query svelte-1pln1xx")
            },
            m(t, o) {
                ds(t, n, o),
                hs(n, e),
                i || (r = ws(n, "click", s),
                i = !0)
            },
            p(n, i) {
                t = n,
                2 & i && o !== (o = t[10] + "") && ks(e, o)
            },
            d(t) {
                t && vs(n),
                i = !1,
                r()
            }
        }
    }
    function hl(t) {
        let n, e, i = t[0].length && cl(t), r = t[1].length && ll(t);
        return {
            c() {
                i && i.c(),
                n = ys(),
                r && r.c(),
                e = bs()
            },
            m(t, o) {
                i && i.m(t, o),
                ds(t, n, o),
                r && r.m(t, o),
                ds(t, e, o)
            },
            p(t, [o]) {
                t[0].length ? i ? i.p(t, o) : (i = cl(t),
                i.c(),
                i.m(n.parentNode, n)) : i && (i.d(1),
                i = null),
                t[1].length ? r ? r.p(t, o) : (r = ll(t),
                r.c(),
                r.m(e.parentNode, e)) : r && (r.d(1),
                r = null)
            },
            i: ns,
            o: ns,
            d(t) {
                i && i.d(t),
                t && vs(n),
                r && r.d(t),
                t && vs(e)
            }
        }
    }
    function dl(t, n, e) {
        let i;
        us(t, su, (t => e(4, i = t)));
        const r = Ka()
          , o = Os();
        let s = r.getHistoryQueries()
          , u = [];
        function c(t) {
            o("search", {
                query: t
            })
        }
        return t.$$.update = () => {
            16 & t.$$.dirty && async function() {
                e(1, u = await r.getHotQueries(i))
            }()
        }
        ,
        [s, u, c, function() {
            r.clearHistoryQuery(),
            e(0, s = [])
        }
        , i, t => c(t), t => c(t)]
    }
    class vl extends eu {
        constructor(t) {
            super(),
            nu(this, t, dl, hl, ss, {})
        }
    }
    function pl(t) {
        let n, e, i;
        return e = new vl({}),
        e.$on("search", t[2]),
        {
            c() {
                n = ms("div"),
                Ys(e.$$.fragment),
                Xs(n, "class", "query-container svelte-k55a1y")
            },
            m(t, r) {
                ds(t, n, r),
                Zs(e, n, null),
                i = !0
            },
            p: ns,
            i(t) {
                i || (Vs(e.$$.fragment, t),
                i = !0)
            },
            o(t) {
                Ks(e.$$.fragment, t),
                i = !1
            },
            d(t) {
                t && vs(n),
                tu(e)
            }
        }
    }
    function ml(t) {
        let n, e;
        return n = new ol({
            props: {
                query: t[0]
            }
        }),
        n.$on("search", t[1]),
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
                1 & e && (i.query = t[0]),
                n.$set(i)
            },
            i(t) {
                e || (Vs(n.$$.fragment, t),
                e = !0)
            },
            o(t) {
                Ks(n.$$.fragment, t),
                e = !1
            },
            d(t) {
                tu(n, t)
            }
        }
    }
    function gl(t) {
        let n, e, i, r;
        const o = [ml, pl]
          , s = [];
        function u(t, n) {
            return t[0] ? 0 : 1
        }
        return n = u(t),
        e = s[n] = o[n](t),
        {
            c() {
                e.c(),
                i = bs()
            },
            m(t, e) {
                s[n].m(t, e),
                ds(t, i, e),
                r = !0
            },
            p(t, [r]) {
                let c = n;
                n = u(t),
                n === c ? s[n].p(t, r) : (Hs(),
                Ks(s[c], 1, 1, ( () => {
                    s[c] = null
                }
                )),
                Js(),
                e = s[n],
                e ? e.p(t, r) : (e = s[n] = o[n](t),
                e.c()),
                Vs(e, 1),
                e.m(i.parentNode, i))
            },
            i(t) {
                r || (Vs(e),
                r = !0)
            },
            o(t) {
                Ks(e),
                r = !1
            },
            d(t) {
                s[n].d(t),
                t && vs(i)
            }
        }
    }
    function yl(t, n, e) {
        let {query: i} = n;
        return t.$$set = t => {
            "query"in t && e(0, i = t.query)
        }
        ,
        [i, function(n) {
            _s(t, n)
        }
        , function(n) {
            _s(t, n)
        }
        ]
    }
    class bl extends eu {
        constructor(t) {
            super(),
            nu(this, t, yl, gl, ss, {
                query: 0
            })
        }
    }
    function wl(t) {
        let n, e, i, r;
        return {
            c() {
                n = ms("button"),
                e = gs(""),
                n.disabled = t[2],
                Xs(n, "type", "button"),
                Xs(n, "class", "cancel yoopu3-icon svelte-4q4jwj")
            },
            m(o, s) {
                ds(o, n, s),
                hs(n, e),
                i || (r = ws(n, "click", t[6]),
                i = !0)
            },
            p(t, e) {
                4 & e && (n.disabled = t[2])
            },
            d(t) {
                t && vs(n),
                i = !1,
                r()
            }
        }
    }
    function Xl(t) {
        let n, e, i, r, o, s, u, c = t[0] && wl(t);
        return {
            c() {
                n = ms("form"),
                e = ms("i"),
                e.textContent = "",
                i = ys(),
                r = ms("input"),
                o = ys(),
                c && c.c(),
                Xs(e, "class", "icon yoopu3-icon svelte-4q4jwj"),
                Xs(r, "class", "search-input svelte-4q4jwj"),
                Xs(r, "type", "text"),
                r.disabled = t[2],
                Xs(r, "placeholder", t[1]),
                Xs(r, "autocomplete", "off"),
                Xs(n, "class", "search-wrapper svelte-4q4jwj"),
                Ts(n, "white", t[3])
            },
            m(a, l) {
                ds(a, n, l),
                hs(n, e),
                hs(n, i),
                hs(n, r),
                t[11](r),
                Es(r, t[0]),
                hs(n, o),
                c && c.m(n, null),
                s || (u = [ws(r, "input", t[12]), ws(r, "focus", t[8]), ws(r, "blur", t[9]), ws(r, "input", t[10]), ws(n, "submit", t[5])],
                s = !0)
            },
            p(t, [e]) {
                4 & e && (r.disabled = t[2]),
                2 & e && Xs(r, "placeholder", t[1]),
                1 & e && r.value !== t[0] && Es(r, t[0]),
                t[0] ? c ? c.p(t, e) : (c = wl(t),
                c.c(),
                c.m(n, null)) : c && (c.d(1),
                c = null),
                8 & e && Ts(n, "white", t[3])
            },
            i: ns,
            o: ns,
            d(e) {
                e && vs(n),
                t[11](null),
                c && c.d(),
                s = !1,
                rs(u)
            }
        }
    }
    function xl(t, n, e) {
        let {query: i=""} = n
          , {placeholder: r=""} = n
          , {disabled: o=!1} = n
          , {white: s=!1} = n;
        const u = Os();
        let c;
        return t.$$set = t => {
            "query"in t && e(0, i = t.query),
            "placeholder"in t && e(1, r = t.placeholder),
            "disabled"in t && e(2, o = t.disabled),
            "white"in t && e(3, s = t.white)
        }
        ,
        [i, r, o, s, c, function(t) {
            o || (t.preventDefault(),
            c && c.blur(),
            i && i.trim().length > 0 && u("search", {
                query: i
            }))
        }
        , function() {
            c && c.focus(),
            e(0, i = ""),
            u("clear")
        }
        , function() {
            c && c.focus()
        }
        , function(n) {
            _s(t, n)
        }
        , function(n) {
            _s(t, n)
        }
        , function(n) {
            _s(t, n)
        }
        , function(t) {
            Ds[t ? "unshift" : "push"](( () => {
                c = t,
                e(4, c)
            }
            ))
        }
        , function() {
            i = this.value,
            e(0, i)
        }
        ]
    }
    class kl extends eu {
        constructor(t) {
            super(),
            nu(this, t, xl, Xl, ss, {
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
    function El(t) {
        let n, e, i, r, o, s, u;
        function c(n) {
            t[6](n)
        }
        let a = {
            placeholder: "搜索歌曲或艺人"
        };
        return void 0 !== t[0] && (a.query = t[0]),
        e = new kl({
            props: a
        }),
        Ds.push(( () => Qs(e, "query", c))),
        e.$on("focus", t[4]),
        e.$on("blur", t[5]),
        e.$on("search", t[7]),
        s = new bl({
            props: {
                query: t[0]
            }
        }),
        s.$on("search", t[8]),
        {
            c() {
                n = ms("div"),
                Ys(e.$$.fragment),
                r = ys(),
                o = ms("div"),
                Ys(s.$$.fragment),
                Xs(o, "class", "panel svelte-y4hgxl"),
                Ts(o, "show", t[1]),
                Ts(o, "unclickable", t[2]),
                Xs(n, "class", "container svelte-y4hgxl")
            },
            m(t, i) {
                ds(t, n, i),
                Zs(e, n, null),
                hs(n, r),
                hs(n, o),
                Zs(s, o, null),
                u = !0
            },
            p(t, [n]) {
                const r = {};
                !i && 1 & n && (i = !0,
                r.query = t[0],
                Rs(( () => i = !1))),
                e.$set(r);
                const u = {};
                1 & n && (u.query = t[0]),
                s.$set(u),
                2 & n && Ts(o, "show", t[1]),
                4 & n && Ts(o, "unclickable", t[2])
            },
            i(t) {
                u || (Vs(e.$$.fragment, t),
                Vs(s.$$.fragment, t),
                u = !0)
            },
            o(t) {
                Ks(e.$$.fragment, t),
                Ks(s.$$.fragment, t),
                u = !1
            },
            d(t) {
                t && vs(n),
                tu(e),
                tu(s)
            }
        }
    }
    function Tl(t, n, e) {
        let i = String(C().q || "")
          , r = !1
          , o = !0;
        function s(t) {
            e(0, i = t),
            location.href = "/explore#q=" + encodeURIComponent(t)
        }
        return [i, r, o, s, function() {
            e(1, r = !0),
            e(2, o = !1)
        }
        , async function() {
            e(1, r = !1),
            await st(200),
            e(2, o = !r)
        }
        , function(t) {
            i = t,
            e(0, i)
        }
        , () => s(i), t => s(t.detail.query)]
    }
    class Sl extends eu {
        constructor(t) {
            super(),
            nu(this, t, Tl, El, ss, {})
        }
    }
    function jl(t) {
        let n;
        return {
            c() {
                n = ms("div"),
                Xs(n, "class", "svg-container svelte-jr7qzq")
            },
            m(e, i) {
                ds(e, n, i),
                t[4](n)
            },
            p: ns,
            i: ns,
            o: ns,
            d(e) {
                e && vs(n),
                t[4](null)
            }
        }
    }
    const Cl = {};
    function Al(t, n, e) {
        let {src: i} = n;
        const r = d("Svg");
        let o, s, u;
        return t.$$set = t => {
            "src"in t && e(1, i = t.src)
        }
        ,
        t.$$.update = () => {
            1 & t.$$.dirty && e(3, u = !!o),
            2 & t.$$.dirty && e(2, s = function() {
                if (!i || !i.endsWith(".svg"))
                    return Promise.resolve("");
                let t = Cl[i];
                return t || (t = fetch(i).then((t => t.text())),
                Cl[i] = t),
                t
            }()),
            12 & t.$$.dirty && async function() {
                const t = await s;
                if (!o)
                    return;
                e(0, o.innerHTML = t, o);
                const n = o.querySelector("svg");
                if (!n)
                    return r(t),
                    void e(0, o.innerHTML = "", o);
                const i = n.getAttribute("width")
                  , u = n.getAttribute("height");
                n.setAttribute("viewBox", `0 0 ${i} ${u}`),
                n.setAttribute("width", "100%"),
                n.setAttribute("height", "100%")
            }()
        }
        ,
        [o, i, s, u, function(t) {
            Ds[t ? "unshift" : "push"](( () => {
                o = t,
                e(0, o)
            }
            ))
        }
        ]
    }
    class Ol extends eu {
        constructor(t) {
            super(),
            nu(this, t, Al, jl, ss, {
                src: 1
            })
        }
    }
    function _l(t) {
        let n, e, i, r, o, s, u, c, a;
        return s = new Ol({
            props: {
                src: "//cdn.yopu.co/img/logo_text.5c518d95.svg"
            }
        }),
        {
            c() {
                n = ms("div"),
                e = ms("a"),
                i = ms("span"),
                i.textContent = "",
                r = ys(),
                o = ms("div"),
                Ys(s.$$.fragment),
                u = ys(),
                c = ms("span"),
                c.textContent = "随身的曲谱书",
                Xs(i, "class", "yoopu3-icon svelte-dhvbeg"),
                Xs(o, "class", "name svelte-dhvbeg"),
                Xs(e, "href", "/"),
                Xs(e, "class", "logo svelte-dhvbeg"),
                Xs(c, "class", "slogan-text svelte-dhvbeg"),
                Xs(n, "class", "logo-container svelte-dhvbeg")
            },
            m(t, l) {
                ds(t, n, l),
                hs(n, e),
                hs(e, i),
                hs(e, r),
                hs(e, o),
                Zs(s, o, null),
                hs(n, u),
                hs(n, c),
                a = !0
            },
            p: ns,
            i(t) {
                a || (Vs(s.$$.fragment, t),
                a = !0)
            },
            o(t) {
                Ks(s.$$.fragment, t),
                a = !1
            },
            d(t) {
                t && vs(n),
                tu(s)
            }
        }
    }
    class Bl extends eu {
        constructor(t) {
            super(),
            nu(this, t, null, _l, ss, {})
        }
    }
    function Dl(t) {
        let n;
        return {
            c() {
                n = ms("div"),
                n.innerHTML = '<div class="mover svelte-bmkbx9"></div>',
                Xs(n, "class", "loader svelte-bmkbx9"),
                Ts(n, "above", t[0])
            },
            m(t, e) {
                ds(t, n, e)
            },
            p(t, [e]) {
                1 & e && Ts(n, "above", t[0])
            },
            i: ns,
            o: ns,
            d(t) {
                t && vs(n)
            }
        }
    }
    function ql(t, n, e) {
        let {above: i=!1} = n;
        return t.$$set = t => {
            "above"in t && e(0, i = t.above)
        }
        ,
        [i]
    }
    class Il extends eu {
        constructor(t) {
            super(),
            nu(this, t, ql, Dl, ss, {
                above: 0
            })
        }
    }
    function Ml(t) {
        let n, e;
        return {
            c() {
                n = ms("img"),
                Xs(n, "class", "hat svelte-1a9wei7"),
                n.src !== (e = t[4]) && Xs(n, "src", e),
                Xs(n, "alt", "hat")
            },
            m(t, e) {
                ds(t, n, e)
            },
            p(t, i) {
                16 & i && n.src !== (e = t[4]) && Xs(n, "src", e)
            },
            d(t) {
                t && vs(n)
            }
        }
    }
    function Fl(t) {
        let n, e;
        return {
            c() {
                n = ms("img"),
                Xs(n, "class", "badge svelte-1a9wei7"),
                n.src !== (e = t[5]) && Xs(n, "src", e),
                Xs(n, "alt", "badge")
            },
            m(t, e) {
                ds(t, n, e)
            },
            p(t, i) {
                32 & i && n.src !== (e = t[5]) && Xs(n, "src", e)
            },
            d(t) {
                t && vs(n)
            }
        }
    }
    function Nl(t) {
        let n, e, i, r, o, s, u, c, a, l = t[4] && Ml(t), f = t[5] && Fl(t);
        return {
            c() {
                n = ms("div"),
                e = ms("img"),
                r = ys(),
                l && l.c(),
                o = ys(),
                f && f.c(),
                Xs(e, "class", "avatar svelte-1a9wei7"),
                e.src !== (i = t[3]) && Xs(e, "src", i),
                Xs(e, "alt", "avatar"),
                Xs(n, "class", "container svelte-1a9wei7"),
                Xs(n, "size", t[1]),
                Xs(n, "gender", s = t[0].gender),
                Xs(n, "ladder", u = t[0].ladder),
                Ts(n, "link", t[2])
            },
            m(i, s) {
                ds(i, n, s),
                hs(n, e),
                hs(n, r),
                l && l.m(n, null),
                hs(n, o),
                f && f.m(n, null),
                c || (a = [ws(e, "error", t[7]), ws(n, "click", t[6])],
                c = !0)
            },
            p(t, [r]) {
                8 & r && e.src !== (i = t[3]) && Xs(e, "src", i),
                t[4] ? l ? l.p(t, r) : (l = Ml(t),
                l.c(),
                l.m(n, o)) : l && (l.d(1),
                l = null),
                t[5] ? f ? f.p(t, r) : (f = Fl(t),
                f.c(),
                f.m(n, null)) : f && (f.d(1),
                f = null),
                2 & r && Xs(n, "size", t[1]),
                1 & r && s !== (s = t[0].gender) && Xs(n, "gender", s),
                1 & r && u !== (u = t[0].ladder) && Xs(n, "ladder", u),
                4 & r && Ts(n, "link", t[2])
            },
            i: ns,
            o: ns,
            d(t) {
                t && vs(n),
                l && l.d(),
                f && f.d(),
                c = !1,
                rs(a)
            }
        }
    }
    function $l(t, n, e) {
        let {user: i={}} = n
          , {size: r="large"} = n
          , {link: o=!1} = n;
        const s = {
            [tt]: q,
            [nt]: "//cdn.yopu.co/img/badge-member.6b6bd93c.png",
            [et]: "//cdn.yopu.co/img/badge-rank-author.d98848c1.png",
            [it]: "//cdn.yopu.co/img/badge-rank-player.d64bedb9.png"
        };
        let u, c, a;
        return t.$$set = t => {
            "user"in t && e(0, i = t.user),
            "size"in t && e(1, r = t.size),
            "link"in t && e(2, o = t.link)
        }
        ,
        t.$$.update = () => {
            3 & t.$$.dirty && e(3, u = ("xlarge" === r || "large" === r) && i.havatar || i.avatar || _),
            3 & t.$$.dirty && e(4, c = "large" === r && ("m" === i.gender ? "//cdn.yopu.co/img/male-frame.7ea6de80.png" : "//cdn.yopu.co/img/female-frame.4c1ecefa.png")),
            1 & t.$$.dirty && e(5, a = i.ladder && s[i.ladder])
        }
        ,
        [i, r, o, u, c, a, function() {
            o && i.userCode && (location.href = "/user#code=" + i.userCode)
        }
        , function() {
            u !== _ && e(3, u = _)
        }
        ]
    }
    class Rl extends eu {
        constructor(t) {
            super(),
            nu(this, t, $l, Nl, ss, {
                user: 0,
                size: 1,
                link: 2
            })
        }
    }
    function Gl(t) {
        let e, i, r, o, s, u, c, a = n[t[5]] + "";
        return {
            c() {
                e = ms("div"),
                i = ms("i"),
                i.textContent = "",
                r = ys(),
                o = ms("span"),
                s = gs(a),
                Xs(i, "class", "yoopu3-icon svelte-tg1f35"),
                Xs(o, "class", "label svelte-tg1f35"),
                Xs(e, "class", "instrument-selection svelte-tg1f35")
            },
            m(n, a) {
                ds(n, e, a),
                hs(e, i),
                hs(e, r),
                hs(e, o),
                hs(o, s),
                u || (c = ws(e, "click", t[9]),
                u = !0)
            },
            p(t, e) {
                32 & e && a !== (a = n[t[5]] + "") && ks(s, a)
            },
            d(t) {
                t && vs(e),
                u = !1,
                c()
            }
        }
    }
    function Pl(t) {
        let n;
        return {
            c() {
                n = ms("a"),
                n.textContent = "登录",
                Xs(n, "class", "login-button svelte-tg1f35"),
                Xs(n, "href", "/start")
            },
            m(t, e) {
                ds(t, n, e)
            },
            p: ns,
            i: ns,
            o: ns,
            d(t) {
                t && vs(n)
            }
        }
    }
    function Ul(t) {
        let n, e;
        return n = new Qu({
            props: {
                $$slots: {
                    content: [zl],
                    default: [Ll]
                },
                $$scope: {
                    ctx: t
                }
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
                131080 & e && (i.$$scope = {
                    dirty: e,
                    ctx: t
                }),
                n.$set(i)
            },
            i(t) {
                e || (Vs(n.$$.fragment, t),
                e = !0)
            },
            o(t) {
                Ks(n.$$.fragment, t),
                e = !1
            },
            d(t) {
                tu(n, t)
            }
        }
    }
    function Ll(t) {
        let n, e, i, r, o;
        return r = new Rl({
            props: {
                size: "medium",
                user: t[6]
            }
        }),
        {
            c() {
                n = ms("div"),
                e = ms("div"),
                e.textContent = `${t[6].displayName}`,
                i = ys(),
                Ys(r.$$.fragment),
                Xs(e, "class", "display-name svelte-tg1f35"),
                Xs(n, "class", "user-info svelte-tg1f35")
            },
            m(t, s) {
                ds(t, n, s),
                hs(n, e),
                hs(n, i),
                Zs(r, n, null),
                o = !0
            },
            p: ns,
            i(t) {
                o || (Vs(r.$$.fragment, t),
                o = !0)
            },
            o(t) {
                Ks(r.$$.fragment, t),
                o = !1
            },
            d(t) {
                t && vs(n),
                tu(r)
            }
        }
    }
    function zl(t) {
        let n, e, i, r, o, s, u, c, a, l, f, h, d = t[7] && function(t) {
            let n;
            return {
                c() {
                    n = ms("a"),
                    n.innerHTML = '<span class="icon yoopu3-icon svelte-tg1f35"></span> \n                <span>管理员工具</span>',
                    Xs(n, "class", "action clickable svelte-tg1f35"),
                    Xs(n, "href", "/internal")
                },
                m(t, e) {
                    ds(t, n, e)
                },
                d(t) {
                    t && vs(n)
                }
            }
        }();
        return {
            c() {
                n = ms("div"),
                e = ms("a"),
                e.innerHTML = '<span class="icon yoopu3-icon svelte-tg1f35"></span> \n              <span>用户中心</span>',
                i = ys(),
                r = ms("a"),
                o = ms("span"),
                o.textContent = "",
                s = ys(),
                u = ms("span"),
                u.textContent = "我的个人页",
                c = ys(),
                a = ms("div"),
                a.innerHTML = '<span class="icon yoopu3-icon svelte-tg1f35"></span> \n              <span>黑夜模式</span>',
                l = ys(),
                d && d.c(),
                Xs(e, "class", "action clickable svelte-tg1f35"),
                Xs(e, "href", "/setting"),
                Xs(o, "class", "icon yoopu3-icon svelte-tg1f35"),
                Xs(r, "class", "action clickable svelte-tg1f35"),
                Xs(r, "href", "/user#code=" + t[6].userCode),
                Xs(a, "class", "action clickable svelte-tg1f35"),
                Xs(n, "slot", "content"),
                Xs(n, "class", "user-panel svelte-tg1f35")
            },
            m(v, p) {
                ds(v, n, p),
                hs(n, e),
                hs(n, i),
                hs(n, r),
                hs(r, o),
                hs(r, s),
                hs(r, u),
                hs(n, c),
                hs(n, a),
                hs(n, l),
                d && d.m(n, null),
                f || (h = ws(a, "click", t[10]),
                f = !0)
            },
            p: ns,
            d(t) {
                t && vs(n),
                d && d.d(),
                f = !1,
                h()
            }
        }
    }
    function Wl(t) {
        let n, e, i;
        function r(n) {
            t[11](n)
        }
        let o = {
            user: t[6]
        };
        return void 0 !== t[5] && (o.instrument = t[5]),
        n = new Wa({
            props: o
        }),
        Ds.push(( () => Qs(n, "instrument", r))),
        n.$on("change", t[12]),
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
                !e && 32 & i && (e = !0,
                r.instrument = t[5],
                Rs(( () => e = !1))),
                n.$set(r)
            },
            i(t) {
                i || (Vs(n.$$.fragment, t),
                i = !0)
            },
            o(t) {
                Ks(n.$$.fragment, t),
                i = !1
            },
            d(t) {
                tu(n, t)
            }
        }
    }
    function Hl(t) {
        let n, e, i, r, o, s, u, c, a, l, f, h, d, v, p, m, g, y, b, w, X, x, k, E, T, S;
        i = new Bl({}),
        s = new Sl({});
        let j = t[5] && !t[1] && Gl(t);
        const C = [Ul, Pl]
          , A = [];
        function O(t, n) {
            return t[6] ? 0 : t[0] ? 1 : -1
        }
        function _(n) {
            t[13](n)
        }
        ~(l = O(t)) && (f = A[l] = C[l](t)),
        d = new Il({});
        let B = {
            noButtons: !0,
            cancelButtonText: t[5] ? "" : void 0,
            $$slots: {
                default: [Wl]
            },
            $$scope: {
                ctx: t
            }
        };
        function D(n) {
            t[14](n)
        }
        void 0 !== t[2] && (B.open = t[2]),
        p = new pc({
            props: B
        }),
        Ds.push(( () => Qs(p, "open", _)));
        let q = {};
        return void 0 !== t[3] && (q.open = t[3]),
        y = new Ua({
            props: q
        }),
        Ds.push(( () => Qs(y, "open", D))),
        X = new bc({
            props: {
                open: t[6] && t[6].isBanned
            }
        }),
        k = new Da({
            props: {
                open: !location.href.includes(jn) && t[6] && !t[6].isBanned && t[6].userSessionCount > 10,
                cell: t[4]
            }
        }),
        {
            c() {
                n = ms("header"),
                e = ms("div"),
                Ys(i.$$.fragment),
                r = ys(),
                o = ms("div"),
                Ys(s.$$.fragment),
                u = ys(),
                j && j.c(),
                c = ys(),
                a = ms("div"),
                f && f.c(),
                h = ys(),
                Ys(d.$$.fragment),
                v = ys(),
                Ys(p.$$.fragment),
                g = ys(),
                Ys(y.$$.fragment),
                w = ys(),
                Ys(X.$$.fragment),
                x = ys(),
                Ys(k.$$.fragment),
                Xs(o, "class", "search-container svelte-tg1f35"),
                Xs(a, "class", "user-container svelte-tg1f35"),
                Xs(e, "class", "dt-top-navigation svelte-tg1f35"),
                Xs(n, "class", "svelte-tg1f35")
            },
            m(f, m) {
                ds(f, n, m),
                hs(n, e),
                Zs(i, e, null),
                hs(e, r),
                hs(e, o),
                Zs(s, o, null),
                hs(e, u),
                j && j.m(e, null),
                hs(e, c),
                hs(e, a),
                ~l && A[l].m(a, null),
                hs(n, h),
                Zs(d, n, null),
                ds(f, v, m),
                Zs(p, f, m),
                ds(f, g, m),
                Zs(y, f, m),
                ds(f, w, m),
                Zs(X, f, m),
                ds(f, x, m),
                Zs(k, f, m),
                E = !0,
                T || (S = ws(o, "focus", t[8], !0),
                T = !0)
            },
            p(t, [n]) {
                t[5] && !t[1] ? j ? j.p(t, n) : (j = Gl(t),
                j.c(),
                j.m(e, c)) : j && (j.d(1),
                j = null);
                let i = l;
                l = O(t),
                l === i ? ~l && A[l].p(t, n) : (f && (Hs(),
                Ks(A[i], 1, 1, ( () => {
                    A[i] = null
                }
                )),
                Js()),
                ~l ? (f = A[l],
                f ? f.p(t, n) : (f = A[l] = C[l](t),
                f.c()),
                Vs(f, 1),
                f.m(a, null)) : f = null);
                const r = {};
                32 & n && (r.cancelButtonText = t[5] ? "" : void 0),
                131108 & n && (r.$$scope = {
                    dirty: n,
                    ctx: t
                }),
                !m && 4 & n && (m = !0,
                r.open = t[2],
                Rs(( () => m = !1))),
                p.$set(r);
                const o = {};
                !b && 8 & n && (b = !0,
                o.open = t[3],
                Rs(( () => b = !1))),
                y.$set(o);
                const s = {};
                16 & n && (s.cell = t[4]),
                k.$set(s)
            },
            i(t) {
                E || (Vs(i.$$.fragment, t),
                Vs(s.$$.fragment, t),
                Vs(f),
                Vs(d.$$.fragment, t),
                Vs(p.$$.fragment, t),
                Vs(y.$$.fragment, t),
                Vs(X.$$.fragment, t),
                Vs(k.$$.fragment, t),
                E = !0)
            },
            o(t) {
                Ks(i.$$.fragment, t),
                Ks(s.$$.fragment, t),
                Ks(f),
                Ks(d.$$.fragment, t),
                Ks(p.$$.fragment, t),
                Ks(y.$$.fragment, t),
                Ks(X.$$.fragment, t),
                Ks(k.$$.fragment, t),
                E = !1
            },
            d(t) {
                t && vs(n),
                tu(i),
                tu(s),
                j && j.d(),
                ~l && A[l].d(),
                tu(d),
                t && vs(v),
                tu(p, t),
                t && vs(g),
                tu(y, t),
                t && vs(w),
                tu(X, t),
                t && vs(x),
                tu(k, t),
                T = !1,
                S()
            }
        }
    }
    function Jl(t, n, e) {
        let i;
        us(t, su, (t => e(5, i = t)));
        let {allowLogin: r} = n
          , {hideInstrumentSelection: o} = n;
        const s = Jo()
          , u = s && ct(s.role, rt);
        let c, a, l;
        r && !i && (c = !0);
        return t.$$set = t => {
            "allowLogin"in t && e(0, r = t.allowLogin),
            "hideInstrumentSelection"in t && e(1, o = t.hideInstrumentSelection)
        }
        ,
        e(4, l = s && s.cell),
        s && s.email,
        [r, o, c, a, l, i, s, u, function(t) {
            i || (t.stopPropagation(),
            e(2, c = !0))
        }
        , () => e(2, c = !0), () => e(3, a = !0), function(t) {
            i = t,
            su.set(i)
        }
        , () => e(2, c = !1), function(t) {
            c = t,
            e(2, c)
        }
        , function(t) {
            a = t,
            e(3, a)
        }
        ]
    }
    class Vl extends eu {
        constructor(t) {
            super(),
            nu(this, t, Jl, Hl, ss, {
                allowLogin: 0,
                hideInstrumentSelection: 1
            })
        }
    }
    function Kl(t) {
        let n;
        return {
            c() {
                n = gs("")
            },
            m(t, e) {
                ds(t, n, e)
            },
            d(t) {
                t && vs(n)
            }
        }
    }
    function Ql(t) {
        let n;
        return {
            c() {
                n = gs("")
            },
            m(t, e) {
                ds(t, n, e)
            },
            d(t) {
                t && vs(n)
            }
        }
    }
    function Yl(t) {
        let n;
        return {
            c() {
                n = gs("")
            },
            m(t, e) {
                ds(t, n, e)
            },
            d(t) {
                t && vs(n)
            }
        }
    }
    function Zl(t) {
        let n;
        return {
            c() {
                n = gs("")
            },
            m(t, e) {
                ds(t, n, e)
            },
            d(t) {
                t && vs(n)
            }
        }
    }
    function tf(t) {
        let n;
        return {
            c() {
                n = gs("")
            },
            m(t, e) {
                ds(t, n, e)
            },
            d(t) {
                t && vs(n)
            }
        }
    }
    function nf(t) {
        let n;
        return {
            c() {
                n = gs("")
            },
            m(t, e) {
                ds(t, n, e)
            },
            d(t) {
                t && vs(n)
            }
        }
    }
    function ef(t) {
        let n;
        return {
            c() {
                n = gs("")
            },
            m(t, e) {
                ds(t, n, e)
            },
            d(t) {
                t && vs(n)
            }
        }
    }
    function rf(t) {
        let n;
        return {
            c() {
                n = gs("")
            },
            m(t, e) {
                ds(t, n, e)
            },
            d(t) {
                t && vs(n)
            }
        }
    }
    function of(t) {
        let n;
        return {
            c() {
                n = gs("")
            },
            m(t, e) {
                ds(t, n, e)
            },
            d(t) {
                t && vs(n)
            }
        }
    }
    function sf(t) {
        let n;
        return {
            c() {
                n = gs("")
            },
            m(t, e) {
                ds(t, n, e)
            },
            d(t) {
                t && vs(n)
            }
        }
    }
    function uf(t) {
        let n;
        return {
            c() {
                n = gs("")
            },
            m(t, e) {
                ds(t, n, e)
            },
            d(t) {
                t && vs(n)
            }
        }
    }
    function cf(t) {
        let n;
        return {
            c() {
                n = gs("")
            },
            m(t, e) {
                ds(t, n, e)
            },
            d(t) {
                t && vs(n)
            }
        }
    }
    function af(t) {
        let n, e, i, r, o, s, u, c, a, l, f, h, d, v, p, m, g, y, b, w, X, x, k, E, T, S, j, C, A, O;
        function _(t, n) {
            return "explore" === t[0] ? Ql : Kl
        }
        let B = _(t)
          , D = B(t);
        function q(t, n) {
            return "home" === t[0] ? Zl : Yl
        }
        let I = q(t)
          , M = I(t);
        function F(t, n) {
            return "dory" === t[0] ? nf : tf
        }
        let N = F(t)
          , $ = N(t);
        function R(t, n) {
            return "rank" === t[0] ? rf : ef
        }
        let G = R(t)
          , P = G(t);
        function U(t, n) {
            return "help" === t[0] ? sf : of
        }
        let L = U(t)
          , z = L(t);
        function W(t, n) {
            return "chord" === t[0] ? cf : uf
        }
        let H = W(t)
          , J = H(t);
        return {
            c() {
                n = ms("nav"),
                e = ms("a"),
                i = ms("div"),
                D.c(),
                r = ys(),
                o = ms("div"),
                o.textContent = "发现曲谱",
                s = ys(),
                u = ms("a"),
                c = ms("div"),
                M.c(),
                a = ys(),
                l = ms("div"),
                l.textContent = "我的曲谱",
                f = ys(),
                h = ms("a"),
                d = ms("div"),
                $.c(),
                v = ys(),
                p = ms("div"),
                p.textContent = "求谱墙",
                m = ys(),
                g = ms("a"),
                y = ms("div"),
                P.c(),
                b = ys(),
                w = ms("div"),
                w.textContent = "Pu主排名",
                X = ys(),
                x = ms("a"),
                k = ms("div"),
                z.c(),
                E = ys(),
                T = ms("div"),
                T.textContent = "帮助",
                S = ys(),
                j = ms("a"),
                C = ms("div"),
                J.c(),
                A = ys(),
                O = ms("div"),
                O.textContent = "和弦查询",
                Xs(i, "class", "yoopu3-icon icon svelte-1y5ln63"),
                Xs(o, "class", "label svelte-1y5ln63"),
                Xs(e, "href", "/explore"),
                Xs(e, "class", "svelte-1y5ln63"),
                Ts(e, "selected", "explore" === t[0]),
                Xs(c, "class", "yoopu3-icon icon svelte-1y5ln63"),
                Xs(l, "class", "label svelte-1y5ln63"),
                Xs(u, "href", "/home"),
                Xs(u, "class", "svelte-1y5ln63"),
                Ts(u, "selected", "home" === t[0]),
                Xs(d, "class", "yoopu3-icon icon svelte-1y5ln63"),
                Xs(p, "class", "label svelte-1y5ln63"),
                Xs(h, "href", "/dory"),
                Xs(h, "class", "svelte-1y5ln63"),
                Ts(h, "selected", "dory" === t[0]),
                Xs(y, "class", "yoopu3-icon icon svelte-1y5ln63"),
                Xs(w, "class", "label svelte-1y5ln63"),
                Xs(g, "href", "/rank"),
                Xs(g, "class", "svelte-1y5ln63"),
                Ts(g, "selected", "rank" === t[0]),
                Xs(k, "class", "yoopu3-icon icon svelte-1y5ln63"),
                Xs(T, "class", "label svelte-1y5ln63"),
                Xs(x, "href", "/help"),
                Xs(x, "class", "svelte-1y5ln63"),
                Ts(x, "selected", "help" === t[0]),
                Xs(C, "class", "yoopu3-icon icon svelte-1y5ln63"),
                Xs(O, "class", "label svelte-1y5ln63"),
                Xs(j, "href", "/chord"),
                Xs(j, "class", "svelte-1y5ln63"),
                Ts(j, "selected", "chord" === t[0]),
                Xs(n, "id", "SideNavBar"),
                Xs(n, "class", "no-print svelte-1y5ln63")
            },
            m(t, _) {
                ds(t, n, _),
                hs(n, e),
                hs(e, i),
                D.m(i, null),
                hs(e, r),
                hs(e, o),
                hs(n, s),
                hs(n, u),
                hs(u, c),
                M.m(c, null),
                hs(u, a),
                hs(u, l),
                hs(n, f),
                hs(n, h),
                hs(h, d),
                $.m(d, null),
                hs(h, v),
                hs(h, p),
                hs(n, m),
                hs(n, g),
                hs(g, y),
                P.m(y, null),
                hs(g, b),
                hs(g, w),
                hs(n, X),
                hs(n, x),
                hs(x, k),
                z.m(k, null),
                hs(x, E),
                hs(x, T),
                hs(n, S),
                hs(n, j),
                hs(j, C),
                J.m(C, null),
                hs(j, A),
                hs(j, O)
            },
            p(t, [n]) {
                B !== (B = _(t)) && (D.d(1),
                D = B(t),
                D && (D.c(),
                D.m(i, null))),
                1 & n && Ts(e, "selected", "explore" === t[0]),
                I !== (I = q(t)) && (M.d(1),
                M = I(t),
                M && (M.c(),
                M.m(c, null))),
                1 & n && Ts(u, "selected", "home" === t[0]),
                N !== (N = F(t)) && ($.d(1),
                $ = N(t),
                $ && ($.c(),
                $.m(d, null))),
                1 & n && Ts(h, "selected", "dory" === t[0]),
                G !== (G = R(t)) && (P.d(1),
                P = G(t),
                P && (P.c(),
                P.m(y, null))),
                1 & n && Ts(g, "selected", "rank" === t[0]),
                L !== (L = U(t)) && (z.d(1),
                z = L(t),
                z && (z.c(),
                z.m(k, null))),
                1 & n && Ts(x, "selected", "help" === t[0]),
                H !== (H = W(t)) && (J.d(1),
                J = H(t),
                J && (J.c(),
                J.m(C, null))),
                1 & n && Ts(j, "selected", "chord" === t[0])
            },
            i: ns,
            o: ns,
            d(t) {
                t && vs(n),
                D.d(),
                M.d(),
                $.d(),
                P.d(),
                z.d(),
                J.d()
            }
        }
    }
    function lf(t, n, e) {
        let {selected: i=""} = n;
        return t.$$set = t => {
            "selected"in t && e(0, i = t.selected)
        }
        ,
        [i]
    }
    class ff extends eu {
        constructor(t) {
            super(),
            nu(this, t, lf, af, ss, {
                selected: 0
            })
        }
    }
    function hf(t) {
        let n;
        return {
            c() {
                n = ms("span"),
                n.textContent = "下载App",
                Xs(n, "slot", "anchor")
            },
            m(t, e) {
                ds(t, n, e)
            },
            d(t) {
                t && vs(n)
            }
        }
    }
    function df(t) {
        let n, e, i, r;
        return {
            c() {
                n = ms("a"),
                n.textContent = "浙ICP备20029865号\n        ",
                e = ms("br"),
                i = ys(),
                r = ms("a"),
                r.textContent = "浙公安网备33010502006797",
                Xs(n, "target", "_blank"),
                Xs(n, "href", "https://beian.miit.gov.cn/#/Integrated/index"),
                Xs(n, "class", "svelte-1op6oe"),
                Xs(r, "target", "_blank"),
                Xs(r, "href", "http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=33010502006797"),
                Xs(r, "class", "svelte-1op6oe")
            },
            m(t, o) {
                ds(t, n, o),
                ds(t, e, o),
                ds(t, i, o),
                ds(t, r, o)
            },
            d(t) {
                t && vs(n),
                t && vs(e),
                t && vs(i),
                t && vs(r)
            }
        }
    }
    function vf(t) {
        let n, e, i, r;
        return {
            c() {
                n = ms("a"),
                n.textContent = "蜀ICP备14032187号\n        ",
                e = ms("br"),
                i = ys(),
                r = ms("a"),
                r.textContent = "浙公安网备33010302003166",
                Xs(n, "target", "_blank"),
                Xs(n, "href", "https://beian.miit.gov.cn/#/Integrated/index"),
                Xs(n, "class", "svelte-1op6oe"),
                Xs(r, "target", "_blank"),
                Xs(r, "href", "http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=33010302003166"),
                Xs(r, "class", "svelte-1op6oe")
            },
            m(t, o) {
                ds(t, n, o),
                ds(t, e, o),
                ds(t, i, o),
                ds(t, r, o)
            },
            d(t) {
                t && vs(n),
                t && vs(e),
                t && vs(i),
                t && vs(r)
            }
        }
    }
    function pf(t) {
        let n, e, i, r, o, s, u, c, a, l, f, h, d, v, p, m, g, y, b, w, X, x, k, E, T, S = (new Date).getFullYear() + "";
        n = new Vl({
            props: {
                allowLogin: !0
            }
        }),
        s = new ff({
            props: {
                selected: t[0]
            }
        }),
        m = new rc({
            props: {
                $$slots: {
                    anchor: [hf]
                },
                $$scope: {
                    ctx: t
                }
            }
        });
        let j = function(t, n) {
            return t[1] ? vf : df
        }(t)(t);
        const C = t[2].default
          , A = cs(C, t, t[3], null);
        return {
            c() {
                Ys(n.$$.fragment),
                e = ys(),
                i = ms("div"),
                r = ms("div"),
                o = ms("div"),
                Ys(s.$$.fragment),
                u = ys(),
                c = ms("div"),
                a = ms("a"),
                a.textContent = "使用协议",
                l = ys(),
                f = ms("a"),
                f.textContent = "关于我们",
                h = ys(),
                d = ms("a"),
                d.textContent = "隐私政策",
                v = ys(),
                p = ms("div"),
                Ys(m.$$.fragment),
                g = ys(),
                y = ms("div"),
                b = gs("杭州优璞科技有限公司 © "),
                w = gs(S),
                X = ms("br"),
                x = ys(),
                j.c(),
                k = ys(),
                E = ms("div"),
                A && A.c(),
                Xs(a, "href", "/help#terms"),
                Xs(a, "class", "svelte-1op6oe"),
                Xs(f, "href", "/help#about"),
                Xs(f, "class", "svelte-1op6oe"),
                Xs(d, "href", "/help#privacy"),
                Xs(d, "class", "svelte-1op6oe"),
                Xs(p, "class", "download svelte-1op6oe"),
                Xs(c, "class", "bottom-nav svelte-1op6oe"),
                Xs(o, "class", "nav-container svelte-1op6oe"),
                Xs(y, "class", "copyright svelte-1op6oe"),
                Xs(r, "class", "page-side svelte-1op6oe"),
                Xs(E, "class", "page-main svelte-1op6oe"),
                Xs(i, "class", "page-body svelte-1op6oe")
            },
            m(t, S) {
                Zs(n, t, S),
                ds(t, e, S),
                ds(t, i, S),
                hs(i, r),
                hs(r, o),
                Zs(s, o, null),
                hs(o, u),
                hs(o, c),
                hs(c, a),
                hs(c, l),
                hs(c, f),
                hs(c, h),
                hs(c, d),
                hs(c, v),
                hs(c, p),
                Zs(m, p, null),
                hs(r, g),
                hs(r, y),
                hs(y, b),
                hs(y, w),
                hs(y, X),
                hs(y, x),
                j.m(y, null),
                hs(i, k),
                hs(i, E),
                A && A.m(E, null),
                T = !0
            },
            p(t, [n]) {
                const e = {};
                1 & n && (e.selected = t[0]),
                s.$set(e);
                const i = {};
                8 & n && (i.$$scope = {
                    dirty: n,
                    ctx: t
                }),
                m.$set(i),
                A && A.p && 8 & n && ls(A, C, t, t[3], n, null, null)
            },
            i(t) {
                T || (Vs(n.$$.fragment, t),
                Vs(s.$$.fragment, t),
                Vs(m.$$.fragment, t),
                Vs(A, t),
                T = !0)
            },
            o(t) {
                Ks(n.$$.fragment, t),
                Ks(s.$$.fragment, t),
                Ks(m.$$.fragment, t),
                Ks(A, t),
                T = !1
            },
            d(t) {
                tu(n, t),
                t && vs(e),
                t && vs(i),
                tu(s),
                tu(m),
                j.d(),
                A && A.d(t)
            }
        }
    }
    function mf(t, n, e) {
        let {$$slots: i={}, $$scope: r} = n
          , {selectedNav: o} = n;
        const s = "yoopu.me" === location.hostname;
        return t.$$set = t => {
            "selectedNav"in t && e(0, o = t.selectedNav),
            "$$scope"in t && e(3, r = t.$$scope)
        }
        ,
        [o, s, i, r]
    }
    class gf extends eu {
        constructor(t) {
            super(),
            nu(this, t, mf, pf, ss, {
                selectedNav: 0
            })
        }
    }
    function yf(t) {
        Number.isInteger(t) && (t = new Date(t));
        const n = t.getFullYear()
          , e = t.getMonth() + 1
          , i = t.getDate();
        return `${n}-${jt(e)}-${jt(i)}`
    }
    function bf(t) {
        let n, i, r, o, s, u = e(t[1], t[0].use, t[0].format) + "";
        return {
            c() {
                n = ms("span"),
                i = gs(u),
                r = gs("谱"),
                o = ys(),
                s = ms("span"),
                Xs(n, "class", "item"),
                Xs(s, "class", "dot svelte-1ejpsfe")
            },
            m(t, e) {
                ds(t, n, e),
                hs(n, i),
                hs(n, r),
                ds(t, o, e),
                ds(t, s, e)
            },
            p(t, n) {
                3 & n && u !== (u = e(t[1], t[0].use, t[0].format) + "") && ks(i, u)
            },
            d(t) {
                t && vs(n),
                t && vs(o),
                t && vs(s)
            }
        }
    }
    function wf(t) {
        let n, e, i, r, o = t[0].subtitle + "";
        return {
            c() {
                n = ms("span"),
                e = ys(),
                i = ms("span"),
                r = gs(o),
                Xs(n, "class", "dot svelte-1ejpsfe"),
                Xs(i, "class", "item subtitle svelte-1ejpsfe")
            },
            m(t, o) {
                ds(t, n, o),
                ds(t, e, o),
                ds(t, i, o),
                hs(i, r)
            },
            p(t, n) {
                1 & n && o !== (o = t[0].subtitle + "") && ks(r, o)
            },
            d(t) {
                t && vs(n),
                t && vs(e),
                t && vs(i)
            }
        }
    }
    function Xf(n) {
        let e, i, r, o, s, u, c = (n[2] || "C") + "", a = n[1] !== t.JIAN && bf(n), l = n[0].subtitle && wf(n);
        return {
            c() {
                e = ms("div"),
                a && a.c(),
                i = ys(),
                r = ms("span"),
                o = gs(c),
                s = gs("调"),
                u = ys(),
                l && l.c(),
                Xs(r, "class", "item"),
                Xs(e, "class", "one-line-info svelte-1ejpsfe")
            },
            m(t, n) {
                ds(t, e, n),
                a && a.m(e, null),
                hs(e, i),
                hs(e, r),
                hs(r, o),
                hs(r, s),
                hs(e, u),
                l && l.m(e, null)
            },
            p(n, [r]) {
                n[1] !== t.JIAN ? a ? a.p(n, r) : (a = bf(n),
                a.c(),
                a.m(e, i)) : a && (a.d(1),
                a = null),
                4 & r && c !== (c = (n[2] || "C") + "") && ks(o, c),
                n[0].subtitle ? l ? l.p(n, r) : (l = wf(n),
                l.c(),
                l.m(e, null)) : l && (l.d(1),
                l = null)
            },
            i: ns,
            o: ns,
            d(t) {
                t && vs(e),
                a && a.d(),
                l && l.d()
            }
        }
    }
    function xf(n, e, i) {
        let r;
        us(n, su, (t => i(1, r = t)));
        let o, {sheet: s} = e;
        return n.$$set = t => {
            "sheet"in t && i(0, s = t.sheet)
        }
        ,
        n.$$.update = () => {
            3 & n.$$.dirty && i(2, o = [t.PIANO, t.JIAN].includes(r) ? s.key : s.keyUse)
        }
        ,
        [s, r, o]
    }
    class kf extends eu {
        constructor(t) {
            super(),
            nu(this, t, xf, Xf, ss, {
                sheet: 0
            })
        }
    }
    function Ef(t) {
        let n, e, i, r, o;
        return {
            c() {
                n = ms("div"),
                e = ms("img"),
                r = ys(),
                o = ms("div"),
                o.textContent = "指弹",
                e.src !== (i = t[0] ? M : I) && Xs(e, "src", i),
                Xs(e, "class", "svelte-sneu4p"),
                Xs(o, "class", "label svelte-sneu4p"),
                Xs(n, "class", "finger-style svelte-sneu4p")
            },
            m(t, i) {
                ds(t, n, i),
                hs(n, e),
                hs(n, r),
                hs(n, o)
            },
            p(t, [n]) {
                1 & n && e.src !== (i = t[0] ? M : I) && Xs(e, "src", i)
            },
            i: ns,
            o: ns,
            d(t) {
                t && vs(n)
            }
        }
    }
    function Tf(t, n, e) {
        let i;
        return us(t, Xu, (t => e(0, i = t))),
        [i]
    }
    class Sf extends eu {
        constructor(t) {
            super(),
            nu(this, t, Tf, Ef, ss, {})
        }
    }
    function jf(t) {
        let n, e, i;
        return {
            c() {
                n = ms("div"),
                Xs(n, "class", "sheet svelte-1hwujz8")
            },
            m(r, o) {
                ds(r, n, o),
                e || (i = fs(t[1].call(null, n)),
                e = !0)
            },
            d(t) {
                t && vs(n),
                e = !1,
                i()
            }
        }
    }
    function Cf(t) {
        let n, e = t[0] && jf(t);
        return {
            c() {
                n = ms("div"),
                e && e.c(),
                Xs(n, "class", "nier-sheet svelte-1hwujz8")
            },
            m(t, i) {
                ds(t, n, i),
                e && e.m(n, null)
            },
            p(t, [i]) {
                t[0] ? e || (e = jf(t),
                e.c(),
                e.m(n, null)) : e && (e.d(1),
                e = null)
            },
            i: ns,
            o: ns,
            d(t) {
                t && vs(n),
                e && e.d()
            }
        }
    }
    function Af(t, n, e) {
        let i;
        us(t, Xu, (t => e(6, i = t)));
        let r, o, s, u, c, a, f, {sheet: h} = n, {staveProfile: d} = n, {rows: v=1} = n, {scale: p=.75} = n, m = [-1];
        function g() {
            if (!a || !f)
                return;
            const t = i
              , n = u.fromJson(t ? "rgb(255,255,255,1)" : "rgb(32,32,32,1)")
              , e = u.fromJson(t ? "rgb(255,255,255,0.5)" : "rgb(0,0,0,0.5)")
              , r = u.fromJson(t ? "rgb(0,0,0,1)" : "rgb(255,255,255,1)")
              , o = a.settings.display.resources;
            o.chordTextColor = n,
            o.mainGlyphColor = n,
            o.secondaryGlyphColor = n,
            o.scoreInfoColor = n,
            o.barSeparatorColor = d === l.LEAD ? e : n,
            o.staffLineColor = e,
            o.inverseTextColor = r,
            o.blackKeyNoteColor = n,
            o.tieDestinationColor = n,
            a.updateSettings(),
            a.renderScore(f, m)
        }
        return async function() {
            ({NierApi: r, JsonConverter: o, ScoreAdapter: s, Color: u, InlineChordMode: c} = await zo("nier")),
            e(0, f = o.jsonToScore(h.scoreSnippet));
            const t = new s(f);
            n = d,
            [l.LEAD, l.NLEAD].includes(n) && (m = [t.copyTabChords()]);
            var n
        }(),
        t.$$set = t => {
            "sheet"in t && e(2, h = t.sheet),
            "staveProfile"in t && e(3, d = t.staveProfile),
            "rows"in t && e(4, v = t.rows),
            "scale"in t && e(5, p = t.scale)
        }
        ,
        t.$$.update = () => {
            64 & t.$$.dirty && g()
        }
        ,
        [f, function(t) {
            const n = {
                core: {
                    logLevel: 0,
                    fontDirectory: "https://cdn.yopu.co/font/tb-001/",
                    enableLazyLoading: !1,
                    useWorkers: !1
                },
                notation: {
                    rhythmMode: "showwithbars",
                    rhythmHeight: 15,
                    displayTiedNotes: !0,
                    inlineChordMode: d === l.NLEAD ? c.Number : c.Name,
                    elements: {
                        ScoreTitle: !1,
                        ScoreSubTitle: !1,
                        ScoreArtist: !1,
                        ScoreWordsAndMusic: !1,
                        ScoreMusic: !1,
                        ScoreWords: !1,
                        ScoreTab: !1,
                        ScoreMeter: !1,
                        ScoreTempo: !1,
                        ScoreCapo: !1,
                        TimeSignature: !0,
                        GuitarTuning: !1,
                        TrackNames: !1,
                        EffectTempo: !0,
                        EffectCapo: !1,
                        ChordDiagrams: !1
                    }
                },
                display: {
                    staveProfile: d,
                    slim: !0,
                    padding: d === l.NLEAD ? [15, 10, 15, 0] : [0, 10, 0, 0],
                    avoidAccolade: !0,
                    hideTabHead: !0,
                    rowCount: v,
                    scale: p,
                    resources: {
                        effectFont: "12px Arial",
                        lyricsFont: "14px/1.5 Arial,sans-serif",
                        barNumberColor: "rgb(0,0,0,0)"
                    }
                },
                player: {
                    enablePlayer: !1,
                    enableCursor: !1,
                    enableUserInteraction: !1
                }
            };
            return a = new r(t,o.jsObjectToSettings(n)),
            g(),
            {
                destroy() {
                    a.destroy()
                }
            }
        }
        , h, d, v, p, i]
    }
    class Of extends eu {
        constructor(t) {
            super(),
            nu(this, t, Af, Cf, ss, {
                sheet: 2,
                staveProfile: 3,
                rows: 4,
                scale: 5
            })
        }
    }
    function _f(t, n, e) {
        const i = t.slice();
        return i[3] = n[e],
        i
    }
    function Bf(t) {
        let n, e, i, o, s, u = f.includes(t[0].format), c = u && qf();
        const a = [Mf, If]
          , l = [];
        function h(t, n) {
            return t[0].use === r.SOLO ? 0 : 1
        }
        return e = h(t),
        i = l[e] = a[e](t),
        {
            c() {
                c && c.c(),
                n = ys(),
                i.c(),
                o = bs()
            },
            m(t, i) {
                c && c.m(t, i),
                ds(t, n, i),
                l[e].m(t, i),
                ds(t, o, i),
                s = !0
            },
            p(t, r) {
                1 & r && (u = f.includes(t[0].format)),
                u ? c || (c = qf(),
                c.c(),
                c.m(n.parentNode, n)) : c && (c.d(1),
                c = null);
                let s = e;
                e = h(t),
                e === s ? l[e].p(t, r) : (Hs(),
                Ks(l[s], 1, 1, ( () => {
                    l[s] = null
                }
                )),
                Js(),
                i = l[e],
                i ? i.p(t, r) : (i = l[e] = a[e](t),
                i.c()),
                Vs(i, 1),
                i.m(o.parentNode, o))
            },
            i(t) {
                s || (Vs(i),
                s = !0)
            },
            o(t) {
                Ks(i),
                s = !1
            },
            d(t) {
                c && c.d(t),
                t && vs(n),
                l[e].d(t),
                t && vs(o)
            }
        }
    }
    function Df(t) {
        let n, e, i;
        return e = new Of({
            props: {
                sheet: t[0],
                staveProfile: An(t[2], t[0].type, t[0].use)
            }
        }),
        {
            c() {
                n = ms("div"),
                Ys(e.$$.fragment),
                Xs(n, "class", "nier-snippet svelte-mal8jy"),
                Ts(n, "dark", t[1])
            },
            m(t, r) {
                ds(t, n, r),
                Zs(e, n, null),
                i = !0
            },
            p(t, i) {
                const r = {};
                1 & i && (r.sheet = t[0]),
                5 & i && (r.staveProfile = An(t[2], t[0].type, t[0].use)),
                e.$set(r),
                2 & i && Ts(n, "dark", t[1])
            },
            i(t) {
                i || (Vs(e.$$.fragment, t),
                i = !0)
            },
            o(t) {
                Ks(e.$$.fragment, t),
                i = !1
            },
            d(t) {
                t && vs(n),
                tu(e)
            }
        }
    }
    function qf(t) {
        let n;
        return {
            c() {
                n = ms("div"),
                n.innerHTML = '<span class="yoopu3-icon svelte-mal8jy"></span>',
                Xs(n, "class", "background-symbol svelte-mal8jy")
            },
            m(t, e) {
                ds(t, n, e)
            },
            d(t) {
                t && vs(n)
            }
        }
    }
    function If(t) {
        let n, e = t[0].chords || [], i = [];
        for (let n = 0; n < e.length; n += 1)
            i[n] = $f(_f(t, e, n));
        return {
            c() {
                n = ms("div");
                for (let t = 0; t < i.length; t += 1)
                    i[t].c();
                Xs(n, "class", "chords svelte-mal8jy")
            },
            m(t, e) {
                ds(t, n, e);
                for (let t = 0; t < i.length; t += 1)
                    i[t].m(n, null)
            },
            p(t, r) {
                if (3 & r) {
                    let o;
                    for (e = t[0].chords || [],
                    o = 0; o < e.length; o += 1) {
                        const s = _f(t, e, o);
                        i[o] ? i[o].p(s, r) : (i[o] = $f(s),
                        i[o].c(),
                        i[o].m(n, null))
                    }
                    for (; o < i.length; o += 1)
                        i[o].d(1);
                    i.length = e.length
                }
            },
            i: ns,
            o: ns,
            d(t) {
                t && vs(n),
                ps(i, t)
            }
        }
    }
    function Mf(t) {
        let n, e, i, r;
        return n = new Sf({}),
        {
            c() {
                Ys(n.$$.fragment),
                e = ys(),
                i = ms("div"),
                Xs(i, "class", "spacing svelte-mal8jy")
            },
            m(t, o) {
                Zs(n, t, o),
                ds(t, e, o),
                ds(t, i, o),
                r = !0
            },
            p: ns,
            i(t) {
                r || (Vs(n.$$.fragment, t),
                r = !0)
            },
            o(t) {
                Ks(n.$$.fragment, t),
                r = !1
            },
            d(t) {
                tu(n, t),
                t && vs(e),
                t && vs(i)
            }
        }
    }
    function Ff(t) {
        let n, e, i = t[3] + "";
        return {
            c() {
                n = ms("div"),
                e = gs(i),
                Xs(n, "class", "chord svelte-mal8jy")
            },
            m(t, i) {
                ds(t, n, i),
                hs(n, e)
            },
            p(t, n) {
                1 & n && i !== (i = t[3] + "") && ks(e, i)
            },
            d(t) {
                t && vs(n)
            }
        }
    }
    function Nf(t) {
        let n, e, i, r;
        return {
            c() {
                n = ms("hexi-chord"),
                xs(n, "name", e = t[3]),
                xs(n, "size", "small"),
                xs(n, "instrument", i = t[0].type),
                xs(n, "dark", r = t[1] ? "" : null)
            },
            m(t, e) {
                ds(t, n, e)
            },
            p(t, o) {
                1 & o && e !== (e = t[3]) && xs(n, "name", e),
                1 & o && i !== (i = t[0].type) && xs(n, "instrument", i),
                2 & o && r !== (r = t[1] ? "" : null) && xs(n, "dark", r)
            },
            d(t) {
                t && vs(n)
            }
        }
    }
    function $f(n) {
        let e, i;
        function r(n, i) {
            return (null == e || 1 & i) && (e = !!function(n) {
                return [t.GUITAR, t.UKULELE, t.PIANO].includes(n)
            }(n[0].type)),
            e ? Nf : Ff
        }
        let o = r(n, -1)
          , s = o(n);
        return {
            c() {
                s.c(),
                i = bs()
            },
            m(t, n) {
                s.m(t, n),
                ds(t, i, n)
            },
            p(t, n) {
                o === (o = r(t, n)) && s ? s.p(t, n) : (s.d(1),
                s = o(t),
                s && (s.c(),
                s.m(i.parentNode, i)))
            },
            d(t) {
                s.d(t),
                t && vs(i)
            }
        }
    }
    function Rf(n) {
        let e, i, r, o, s, u;
        const c = [Df, Bf]
          , a = [];
        function l(n, r) {
            return 1 & r && (e = !(!f.includes(n[0].format) || !n[0].scoreSnippet)),
            e ? 0 : (4 & r && (i = !![t.GUITAR, t.UKULELE].includes(n[2])),
            i ? 1 : -1)
        }
        return ~(r = l(n, -1)) && (o = a[r] = c[r](n)),
        {
            c() {
                o && o.c(),
                s = bs()
            },
            m(t, n) {
                ~r && a[r].m(t, n),
                ds(t, s, n),
                u = !0
            },
            p(t, [n]) {
                let e = r;
                r = l(t, n),
                r === e ? ~r && a[r].p(t, n) : (o && (Hs(),
                Ks(a[e], 1, 1, ( () => {
                    a[e] = null
                }
                )),
                Js()),
                ~r ? (o = a[r],
                o ? o.p(t, n) : (o = a[r] = c[r](t),
                o.c()),
                Vs(o, 1),
                o.m(s.parentNode, s)) : o = null)
            },
            i(t) {
                u || (Vs(o),
                u = !0)
            },
            o(t) {
                Ks(o),
                u = !1
            },
            d(t) {
                ~r && a[r].d(t),
                t && vs(s)
            }
        }
    }
    function Gf(t, n, e) {
        let i, r;
        us(t, Xu, (t => e(1, i = t))),
        us(t, su, (t => e(2, r = t)));
        let {sheet: o} = n;
        return t.$$set = t => {
            "sheet"in t && e(0, o = t.sheet)
        }
        ,
        [o, i, r]
    }
    class Pf extends eu {
        constructor(t) {
            super(),
            nu(this, t, Gf, Rf, ss, {
                sheet: 0
            })
        }
    }
    function Uf(t) {
        let n;
        return {
            c() {
                n = ms("i"),
                n.textContent = "",
                Xs(n, "class", "verified yoopu3-icon svelte-q8jtp9")
            },
            m(t, e) {
                ds(t, n, e)
            },
            d(t) {
                t && vs(n)
            }
        }
    }
    function Lf(t) {
        let n, e, i, r, o, s, u, c, a, l, f, h, d, v = Ct(t[0].title || "未命名") + "", p = Ct(t[0].artist || "未知艺人") + "", m = t[0].type === t[1] && t[0].verified && Uf();
        return l = new kf({
            props: {
                sheet: t[0]
            }
        }),
        h = new Pf({
            props: {
                sheet: t[0]
            }
        }),
        {
            c() {
                n = ms("div"),
                m && m.c(),
                e = ys(),
                i = ms("span"),
                r = gs(v),
                o = ys(),
                s = ms("span"),
                u = gs(p),
                c = ys(),
                a = ms("div"),
                Ys(l.$$.fragment),
                f = ys(),
                Ys(h.$$.fragment),
                Xs(i, "class", "title svelte-q8jtp9"),
                Xs(s, "class", "subtitle svelte-q8jtp9"),
                Xs(n, "class", "title-line svelte-q8jtp9"),
                Xs(a, "class", "sub-line svelte-q8jtp9")
            },
            m(t, v) {
                ds(t, n, v),
                m && m.m(n, null),
                hs(n, e),
                hs(n, i),
                hs(i, r),
                hs(n, o),
                hs(n, s),
                hs(s, u),
                ds(t, c, v),
                ds(t, a, v),
                Zs(l, a, null),
                ds(t, f, v),
                Zs(h, t, v),
                d = !0
            },
            p(t, [i]) {
                t[0].type === t[1] && t[0].verified ? m || (m = Uf(),
                m.c(),
                m.m(n, e)) : m && (m.d(1),
                m = null),
                (!d || 1 & i) && v !== (v = Ct(t[0].title || "未命名") + "") && ks(r, v),
                (!d || 1 & i) && p !== (p = Ct(t[0].artist || "未知艺人") + "") && ks(u, p);
                const o = {};
                1 & i && (o.sheet = t[0]),
                l.$set(o);
                const s = {};
                1 & i && (s.sheet = t[0]),
                h.$set(s)
            },
            i(t) {
                d || (Vs(l.$$.fragment, t),
                Vs(h.$$.fragment, t),
                d = !0)
            },
            o(t) {
                Ks(l.$$.fragment, t),
                Ks(h.$$.fragment, t),
                d = !1
            },
            d(t) {
                t && vs(n),
                m && m.d(),
                t && vs(c),
                t && vs(a),
                tu(l),
                t && vs(f),
                tu(h, t)
            }
        }
    }
    function zf(t, n, e) {
        let i;
        us(t, su, (t => e(1, i = t)));
        let {sheet: r} = n;
        return t.$$set = t => {
            "sheet"in t && e(0, r = t.sheet)
        }
        ,
        [r, i]
    }
    class Wf extends eu {
        constructor(t) {
            super(),
            nu(this, t, zf, Lf, ss, {
                sheet: 0
            })
        }
    }
    function Hf(n) {
        let e, i, r, o, s, u, c, a, l, f, h, d, v, p = St(n[0][n[1] ? n[1] + "UniqViews" : "uniqViews"]) + "", m = (n[0].type === n[1] || n[1] === t.JIAN ? n[0].favoritesDisplay : "-") + "";
        return {
            c() {
                e = ms("div"),
                i = ms("span"),
                i.textContent = "",
                r = ys(),
                o = ms("span"),
                s = gs("热度 "),
                u = gs(p),
                c = ys(),
                a = ms("div"),
                l = ms("span"),
                l.textContent = "",
                f = ys(),
                h = ms("span"),
                d = gs("收藏 "),
                v = gs(m),
                Xs(i, "class", "icon yoopu3-icon svelte-s9fgo0"),
                Xs(e, "class", "row svelte-s9fgo0"),
                Xs(l, "class", "icon yoopu3-icon svelte-s9fgo0"),
                Xs(a, "class", "row svelte-s9fgo0")
            },
            m(t, n) {
                ds(t, e, n),
                hs(e, i),
                hs(e, r),
                hs(e, o),
                hs(o, s),
                hs(o, u),
                ds(t, c, n),
                ds(t, a, n),
                hs(a, l),
                hs(a, f),
                hs(a, h),
                hs(h, d),
                hs(h, v)
            },
            p(n, e) {
                3 & e && p !== (p = St(n[0][n[1] ? n[1] + "UniqViews" : "uniqViews"]) + "") && ks(u, p),
                3 & e && m !== (m = (n[0].type === n[1] || n[1] === t.JIAN ? n[0].favoritesDisplay : "-") + "") && ks(v, m)
            },
            d(t) {
                t && vs(e),
                t && vs(c),
                t && vs(a)
            }
        }
    }
    function Jf(t) {
        let n;
        return {
            c() {
                n = ms("div"),
                n.innerHTML = '<span class="copyright-note"><i class="yoopu3-icon"></i> 应版权方要求已下架</span>',
                Xs(n, "class", "row svelte-s9fgo0")
            },
            m(t, e) {
                ds(t, n, e)
            },
            p: ns,
            d(t) {
                t && vs(n)
            }
        }
    }
    function Vf(t) {
        let n;
        return {
            c() {
                n = ms("span"),
                n.textContent = "未发表"
            },
            m(t, e) {
                ds(t, n, e)
            },
            p: ns,
            d(t) {
                t && vs(n)
            }
        }
    }
    function Kf(t) {
        let n, e, i, r = yf(new Date(t[0].publishTime)) + "";
        return {
            c() {
                n = ms("span"),
                e = gs("发表于 "),
                i = gs(r)
            },
            m(t, r) {
                ds(t, n, r),
                hs(n, e),
                hs(n, i)
            },
            p(t, n) {
                1 & n && r !== (r = yf(new Date(t[0].publishTime)) + "") && ks(i, r)
            },
            d(t) {
                t && vs(n)
            }
        }
    }
    function Qf(t) {
        let n, e, i, r, o, s, u, c, a, l, f, h, d, v, p, m, g, y = t[0].owner.displayName + "";
        function b(t, n) {
            return t[0].copyrightDisputedTime ? Jf : Hf
        }
        i = new Wf({
            props: {
                sheet: t[0]
            }
        }),
        c = new Rl({
            props: {
                user: t[0].owner,
                size: "xsmall",
                link: !0
            }
        });
        let w = b(t)
          , X = w(t);
        function x(t, n) {
            return t[0].publishTime ? Kf : Vf
        }
        let k = x(t)
          , E = k(t);
        return {
            c() {
                n = ms("div"),
                e = ms("a"),
                Ys(i.$$.fragment),
                o = ys(),
                s = ms("div"),
                u = ms("div"),
                Ys(c.$$.fragment),
                a = ys(),
                l = ms("span"),
                f = gs(y),
                h = ys(),
                X.c(),
                d = ys(),
                v = ms("div"),
                p = ms("span"),
                p.textContent = "",
                m = ys(),
                E.c(),
                Xs(e, "class", "post-main svelte-s9fgo0"),
                Xs(e, "href", r = "/view/" + t[0].id),
                Ts(e, "copyright", t[0].copyrightDisputedTime),
                Xs(l, "class", "username svelte-s9fgo0"),
                Xs(u, "class", "user-info svelte-s9fgo0"),
                Xs(p, "class", "icon yoopu3-icon svelte-s9fgo0"),
                Xs(v, "class", "row svelte-s9fgo0"),
                Xs(s, "class", "post-info svelte-s9fgo0"),
                Xs(n, "class", "sheet-preview svelte-s9fgo0")
            },
            m(t, r) {
                ds(t, n, r),
                hs(n, e),
                Zs(i, e, null),
                hs(n, o),
                hs(n, s),
                hs(s, u),
                Zs(c, u, null),
                hs(u, a),
                hs(u, l),
                hs(l, f),
                hs(s, h),
                X.m(s, null),
                hs(s, d),
                hs(s, v),
                hs(v, p),
                hs(v, m),
                E.m(v, null),
                g = !0
            },
            p(t, [n]) {
                const o = {};
                1 & n && (o.sheet = t[0]),
                i.$set(o),
                (!g || 1 & n && r !== (r = "/view/" + t[0].id)) && Xs(e, "href", r),
                1 & n && Ts(e, "copyright", t[0].copyrightDisputedTime);
                const u = {};
                1 & n && (u.user = t[0].owner),
                c.$set(u),
                (!g || 1 & n) && y !== (y = t[0].owner.displayName + "") && ks(f, y),
                w === (w = b(t)) && X ? X.p(t, n) : (X.d(1),
                X = w(t),
                X && (X.c(),
                X.m(s, d))),
                k === (k = x(t)) && E ? E.p(t, n) : (E.d(1),
                E = k(t),
                E && (E.c(),
                E.m(v, null)))
            },
            i(t) {
                g || (Vs(i.$$.fragment, t),
                Vs(c.$$.fragment, t),
                g = !0)
            },
            o(t) {
                Ks(i.$$.fragment, t),
                Ks(c.$$.fragment, t),
                g = !1
            },
            d(t) {
                t && vs(n),
                tu(i),
                tu(c),
                X.d(),
                E.d()
            }
        }
    }
    function Yf(t, n, e) {
        let i;
        us(t, su, (t => e(1, i = t)));
        let {sheet: r} = n;
        return t.$$set = t => {
            "sheet"in t && e(0, r = t.sheet)
        }
        ,
        [r, i]
    }
    class Zf extends eu {
        constructor(t) {
            super(),
            nu(this, t, Yf, Qf, ss, {
                sheet: 0
            })
        }
    }
    class th {
        constructor(t) {
            this.ut = t,
            this.ct = !1,
            this.lt = new at,
            this.ft = !0,
            this.ht = () => {
                this.ct || (requestAnimationFrame(( () => {
                    this.dt(),
                    this.ct = !1
                }
                )),
                this.ct = !0)
            }
        }
        onNextPage(t) {
            return this.lt.add(t)
        }
        setEnabled(t) {
            t ? Go(this.ut, Ro, this.ht) : this.ut.removeEventListener(Ro, this.ht)
        }
        dt() {
            const t = this.ut.document && this.ut.document.body ? (n = this.ut).document.body.clientHeight - n.scrollY - n.innerHeight : function(t) {
                return t.scrollHeight - t.clientHeight - t.scrollTop
            }(this.ut);
            var n;
            this.ft ? t >= -200 && t < 100 && (this.lt.fire(),
            this.ft = !1) : t > 300 && (this.ft = !0)
        }
    }
    function nh(t) {
        let n, e, i, r, o;
        return e = new Ol({
            props: {
                src: t[0] ? D : B
            }
        }),
        {
            c() {
                n = ms("div"),
                Ys(e.$$.fragment),
                i = ys(),
                r = ms("div"),
                r.textContent = "哎呀，没有...",
                Xs(n, "class", "no-result svelte-rls1hv"),
                Xs(r, "class", "desc svelte-rls1hv")
            },
            m(t, s) {
                ds(t, n, s),
                Zs(e, n, null),
                ds(t, i, s),
                ds(t, r, s),
                o = !0
            },
            p(t, [n]) {
                const i = {};
                1 & n && (i.src = t[0] ? D : B),
                e.$set(i)
            },
            i(t) {
                o || (Vs(e.$$.fragment, t),
                o = !0)
            },
            o(t) {
                Ks(e.$$.fragment, t),
                o = !1
            },
            d(t) {
                t && vs(n),
                tu(e),
                t && vs(i),
                t && vs(r)
            }
        }
    }
    function eh(t, n, e) {
        let i;
        return us(t, Xu, (t => e(0, i = t))),
        [i]
    }
    class ih extends eu {
        constructor(t) {
            super(),
            nu(this, t, eh, nh, ss, {})
        }
    }
    function rh(t, n, e) {
        const i = t.slice();
        return i[4] = n[e],
        i
    }
    function oh(t) {
        let n, e, i = t[0].title + "";
        return {
            c() {
                n = ms("div"),
                e = gs(i),
                Xs(n, "class", "title svelte-1glblf1")
            },
            m(t, i) {
                ds(t, n, i),
                hs(n, e)
            },
            p(t, n) {
                1 & n && i !== (i = t[0].title + "") && ks(e, i)
            },
            d(t) {
                t && vs(n)
            }
        }
    }
    function sh(t) {
        let n, e, i, r, o, s, u = t[0].sheetNum + "", c = t[1] && uh();
        return {
            c() {
                n = ms("div"),
                e = ms("span"),
                c && c.c(),
                i = ys(),
                r = gs(u),
                o = gs(" 曲谱"),
                s = ms("i"),
                s.textContent = "",
                Xs(s, "class", "yoopu3-icon svelte-1glblf1"),
                Xs(n, "class", "num svelte-1glblf1")
            },
            m(t, u) {
                ds(t, n, u),
                hs(n, e),
                c && c.m(e, null),
                hs(e, i),
                hs(e, r),
                hs(e, o),
                hs(n, s)
            },
            p(t, n) {
                t[1] ? c || (c = uh(),
                c.c(),
                c.m(e, i)) : c && (c.d(1),
                c = null),
                1 & n && u !== (u = t[0].sheetNum + "") && ks(r, u)
            },
            d(t) {
                t && vs(n),
                c && c.d()
            }
        }
    }
    function uh(t) {
        let n;
        return {
            c() {
                n = gs("本歌曲还有")
            },
            m(t, e) {
                ds(t, n, e)
            },
            d(t) {
                t && vs(n)
            }
        }
    }
    function ch(t) {
        let n, e, i, r = t[0].artist + "";
        return {
            c() {
                n = ms("div"),
                e = ms("div"),
                i = gs(r),
                Xs(e, "class", "artist svelte-1glblf1"),
                Xs(n, "class", "neckline")
            },
            m(t, r) {
                ds(t, n, r),
                hs(n, e),
                hs(e, i)
            },
            p(t, n) {
                1 & n && r !== (r = t[0].artist + "") && ks(i, r)
            },
            d(t) {
                t && vs(n)
            }
        }
    }
    function ah(t) {
        let n, e, i = t[0].sheets, r = [];
        for (let n = 0; n < i.length; n += 1)
            r[n] = mh(rh(t, i, n));
        const o = t => Ks(r[t], 1, 1, ( () => {
            r[t] = null
        }
        ));
        return {
            c() {
                n = ms("div");
                for (let t = 0; t < r.length; t += 1)
                    r[t].c();
                Xs(n, "class", "sheets svelte-1glblf1")
            },
            m(t, i) {
                ds(t, n, i);
                for (let t = 0; t < r.length; t += 1)
                    r[t].m(n, null);
                e = !0
            },
            p(t, e) {
                if (5 & e) {
                    let s;
                    for (i = t[0].sheets,
                    s = 0; s < i.length; s += 1) {
                        const o = rh(t, i, s);
                        r[s] ? (r[s].p(o, e),
                        Vs(r[s], 1)) : (r[s] = mh(o),
                        r[s].c(),
                        Vs(r[s], 1),
                        r[s].m(n, null))
                    }
                    for (Hs(),
                    s = i.length; s < r.length; s += 1)
                        o(s);
                    Js()
                }
            },
            i(t) {
                if (!e) {
                    for (let t = 0; t < i.length; t += 1)
                        Vs(r[t]);
                    e = !0
                }
            },
            o(t) {
                r = r.filter(Boolean);
                for (let t = 0; t < r.length; t += 1)
                    Ks(r[t]);
                e = !1
            },
            d(t) {
                t && vs(n),
                ps(r, t)
            }
        }
    }
    function lh(t) {
        let n, e, i, r, o;
        return {
            c() {
                n = ms("div"),
                n.textContent = "应版权方要求曲谱已下架",
                e = ys(),
                i = ms("div"),
                Xs(n, "class", "copyright-note svelte-1glblf1"),
                Xs(i, "class", "copyright svelte-1glblf1")
            },
            m(s, u) {
                ds(s, n, u),
                ds(s, e, u),
                ds(s, i, u),
                r || (o = ws(i, "click", t[3]),
                r = !0)
            },
            p: ns,
            i: ns,
            o: ns,
            d(t) {
                t && vs(n),
                t && vs(e),
                t && vs(i),
                r = !1,
                o()
            }
        }
    }
    function fh(t) {
        let n, e;
        function i(t, e) {
            return (null == n || 1 & e) && (n = !!f.includes(t[4].format)),
            n ? dh : t[4].audio && t[4].audio.rating > 2 ? hh : void 0
        }
        let r = i(t, -1)
          , o = r && r(t);
        return {
            c() {
                o && o.c(),
                e = bs()
            },
            m(t, n) {
                o && o.m(t, n),
                ds(t, e, n)
            },
            p(t, n) {
                r !== (r = i(t, n)) && (o && o.d(1),
                o = r && r(t),
                o && (o.c(),
                o.m(e.parentNode, e)))
            },
            d(t) {
                o && o.d(t),
                t && vs(e)
            }
        }
    }
    function hh(t) {
        let n;
        return {
            c() {
                n = ms("div"),
                n.innerHTML = '<i class="yoopu3-icon svelte-1glblf1"></i>',
                Xs(n, "class", "background-icon svelte-1glblf1")
            },
            m(t, e) {
                ds(t, n, e)
            },
            d(t) {
                t && vs(n)
            }
        }
    }
    function dh(t) {
        let n;
        return {
            c() {
                n = ms("div"),
                n.innerHTML = '<i class="yoopu3-icon svelte-1glblf1"></i>',
                Xs(n, "class", "background-icon svelte-1glblf1")
            },
            m(t, e) {
                ds(t, n, e)
            },
            d(t) {
                t && vs(n)
            }
        }
    }
    function vh(t) {
        let n;
        return {
            c() {
                n = ms("i"),
                n.textContent = "",
                Xs(n, "class", "verified yoopu3-icon svelte-1glblf1")
            },
            m(t, e) {
                ds(t, n, e)
            },
            d(t) {
                t && vs(n)
            }
        }
    }
    function ph(t) {
        let n, e, i, r, o = (t[4].rating || 0).toFixed(1) + "";
        return {
            c() {
                n = ms("i"),
                n.textContent = "",
                e = ms("span"),
                i = gs(o),
                r = ms("span"),
                Xs(n, "class", "yoopu3-icon svelte-1glblf1"),
                Xs(e, "class", "number rating svelte-1glblf1"),
                Xs(r, "class", "dot svelte-1glblf1")
            },
            m(t, o) {
                ds(t, n, o),
                ds(t, e, o),
                hs(e, i),
                ds(t, r, o)
            },
            p(t, n) {
                1 & n && o !== (o = (t[4].rating || 0).toFixed(1) + "") && ks(i, o)
            },
            d(t) {
                t && vs(n),
                t && vs(e),
                t && vs(r)
            }
        }
    }
    function mh(n) {
        let e, i, r, o, s, u, c, a, l, f, h, d, v, p, m, g, y, b, w, X = St(n[4][n[2] ? n[2] + "UniqViews" : "uniqViews"]) + "", x = n[4].owner.displayName + "", k = n[2] !== t.PIANO && fh(n);
        o = new kf({
            props: {
                sheet: n[4]
            }
        });
        let E = n[4].type === n[2] && n[4].verified && vh()
          , T = n[4].ratingCount >= 100 && ph(n);
        return v = new Rl({
            props: {
                user: n[4].owner,
                size: "xsmall"
            }
        }),
        {
            c() {
                e = ms("a"),
                k && k.c(),
                i = ys(),
                r = ms("div"),
                Ys(o.$$.fragment),
                s = ys(),
                u = ms("div"),
                E && E.c(),
                c = ys(),
                T && T.c(),
                a = ms("i"),
                a.textContent = "",
                l = ms("span"),
                f = gs(X),
                h = ys(),
                d = ms("div"),
                Ys(v.$$.fragment),
                p = ys(),
                m = ms("div"),
                g = gs(x),
                y = ys(),
                Xs(r, "class", "title svelte-1glblf1"),
                Xs(a, "class", "yoopu3-icon svelte-1glblf1"),
                Xs(l, "class", "number svelte-1glblf1"),
                Xs(u, "class", "stats svelte-1glblf1"),
                Xs(m, "class", "name svelte-1glblf1"),
                Xs(d, "class", "author svelte-1glblf1"),
                Xs(e, "class", "sheet svelte-1glblf1"),
                Xs(e, "href", b = "/view/" + n[4].id)
            },
            m(t, n) {
                ds(t, e, n),
                k && k.m(e, null),
                hs(e, i),
                hs(e, r),
                Zs(o, r, null),
                hs(e, s),
                hs(e, u),
                E && E.m(u, null),
                hs(u, c),
                T && T.m(u, null),
                hs(u, a),
                hs(u, l),
                hs(l, f),
                hs(e, h),
                hs(e, d),
                Zs(v, d, null),
                hs(d, p),
                hs(d, m),
                hs(m, g),
                hs(e, y),
                w = !0
            },
            p(n, r) {
                n[2] !== t.PIANO ? k ? k.p(n, r) : (k = fh(n),
                k.c(),
                k.m(e, i)) : k && (k.d(1),
                k = null);
                const s = {};
                1 & r && (s.sheet = n[4]),
                o.$set(s),
                n[4].type === n[2] && n[4].verified ? E || (E = vh(),
                E.c(),
                E.m(u, c)) : E && (E.d(1),
                E = null),
                n[4].ratingCount >= 100 ? T ? T.p(n, r) : (T = ph(n),
                T.c(),
                T.m(u, a)) : T && (T.d(1),
                T = null),
                (!w || 5 & r) && X !== (X = St(n[4][n[2] ? n[2] + "UniqViews" : "uniqViews"]) + "") && ks(f, X);
                const l = {};
                1 & r && (l.user = n[4].owner),
                v.$set(l),
                (!w || 1 & r) && x !== (x = n[4].owner.displayName + "") && ks(g, x),
                (!w || 1 & r && b !== (b = "/view/" + n[4].id)) && Xs(e, "href", b)
            },
            i(t) {
                w || (Vs(o.$$.fragment, t),
                Vs(v.$$.fragment, t),
                w = !0)
            },
            o(t) {
                Ks(o.$$.fragment, t),
                Ks(v.$$.fragment, t),
                w = !1
            },
            d(t) {
                t && vs(e),
                k && k.d(),
                tu(o),
                E && E.d(),
                T && T.d(),
                tu(v)
            }
        }
    }
    function gh(t) {
        let n, e, i, r, o, s, u, c, a, l, f = !t[1] && oh(t), h = !t[0].copyrightDisputed && sh(t), d = !t[1] && ch(t);
        const v = [lh, ah]
          , p = [];
        function m(t, n) {
            return t[0].copyrightDisputed ? 0 : 1
        }
        return c = m(t),
        a = p[c] = v[c](t),
        {
            c() {
                n = ms("div"),
                e = ms("a"),
                i = ms("div"),
                f && f.c(),
                r = ys(),
                h && h.c(),
                o = ys(),
                d && d.c(),
                u = ys(),
                a.c(),
                Xs(i, "class", "headline svelte-1glblf1"),
                Xs(e, "class", "info svelte-1glblf1"),
                Xs(e, "href", s = `/song#title=${encodeURIComponent(t[0].title)}&artist=${encodeURIComponent(t[0].artist)}`),
                Xs(n, "class", "song-preview svelte-1glblf1"),
                Ts(n, "dark", t[1])
            },
            m(t, s) {
                ds(t, n, s),
                hs(n, e),
                hs(e, i),
                f && f.m(i, null),
                hs(i, r),
                h && h.m(i, null),
                hs(e, o),
                d && d.m(e, null),
                hs(n, u),
                p[c].m(n, null),
                l = !0
            },
            p(t, [o]) {
                t[1] ? f && (f.d(1),
                f = null) : f ? f.p(t, o) : (f = oh(t),
                f.c(),
                f.m(i, r)),
                t[0].copyrightDisputed ? h && (h.d(1),
                h = null) : h ? h.p(t, o) : (h = sh(t),
                h.c(),
                h.m(i, null)),
                t[1] ? d && (d.d(1),
                d = null) : d ? d.p(t, o) : (d = ch(t),
                d.c(),
                d.m(e, null)),
                (!l || 1 & o && s !== (s = `/song#title=${encodeURIComponent(t[0].title)}&artist=${encodeURIComponent(t[0].artist)}`)) && Xs(e, "href", s);
                let u = c;
                c = m(t),
                c === u ? p[c].p(t, o) : (Hs(),
                Ks(p[u], 1, 1, ( () => {
                    p[u] = null
                }
                )),
                Js(),
                a = p[c],
                a ? a.p(t, o) : (a = p[c] = v[c](t),
                a.c()),
                Vs(a, 1),
                a.m(n, null)),
                2 & o && Ts(n, "dark", t[1])
            },
            i(t) {
                l || (Vs(a),
                l = !0)
            },
            o(t) {
                Ks(a),
                l = !1
            },
            d(t) {
                t && vs(n),
                f && f.d(),
                h && h.d(),
                d && d.d(),
                p[c].d()
            }
        }
    }
    function yh(t, n, e) {
        let i;
        us(t, su, (t => e(2, i = t)));
        let {song: r} = n
          , {hideTitle: o=!1} = n;
        return t.$$set = t => {
            "song"in t && e(0, r = t.song),
            "hideTitle"in t && e(1, o = t.hideTitle)
        }
        ,
        [r, o, i, function(t) {
            t.preventDefault(),
            Vt.error("应版权方要求曲谱已下架")
        }
        ]
    }
    class bh extends eu {
        constructor(t) {
            super(),
            nu(this, t, yh, gh, ss, {
                song: 0,
                hideTitle: 1
            })
        }
    }
    function wh(t, n, e) {
        const i = t.slice();
        return i[4] = n[e],
        i
    }
    function Xh(t) {
        let n, e, i = t[4].icon + "";
        return {
            c() {
                n = ms("span"),
                e = gs(i),
                Xs(n, "class", "icon yoopu3-icon svelte-1l9tlvb")
            },
            m(t, i) {
                ds(t, n, i),
                hs(n, e)
            },
            p(t, n) {
                2 & n && i !== (i = t[4].icon + "") && ks(e, i)
            },
            d(t) {
                t && vs(n)
            }
        }
    }
    function xh(t) {
        let n, e, i = t[4].title + "";
        return {
            c() {
                n = ms("span"),
                e = gs(i),
                Xs(n, "class", "title svelte-1l9tlvb")
            },
            m(t, i) {
                ds(t, n, i),
                hs(n, e)
            },
            p(t, n) {
                2 & n && i !== (i = t[4].title + "") && ks(e, i)
            },
            d(t) {
                t && vs(n)
            }
        }
    }
    function kh(t) {
        let n, e, i, r, o, s = t[4].icon && Xh(t), u = t[4].title && xh(t);
        function c() {
            return t[3](t[4])
        }
        return {
            c() {
                n = ms("div"),
                s && s.c(),
                e = ys(),
                u && u.c(),
                i = ys(),
                Xs(n, "class", "option svelte-1l9tlvb"),
                Ts(n, "selected", t[4].value === t[0]),
                Ts(n, "dot", t[4].dot)
            },
            m(t, a) {
                ds(t, n, a),
                s && s.m(n, null),
                hs(n, e),
                u && u.m(n, null),
                hs(n, i),
                r || (o = ws(n, "click", c),
                r = !0)
            },
            p(r, o) {
                (t = r)[4].icon ? s ? s.p(t, o) : (s = Xh(t),
                s.c(),
                s.m(n, e)) : s && (s.d(1),
                s = null),
                t[4].title ? u ? u.p(t, o) : (u = xh(t),
                u.c(),
                u.m(n, i)) : u && (u.d(1),
                u = null),
                3 & o && Ts(n, "selected", t[4].value === t[0]),
                2 & o && Ts(n, "dot", t[4].dot)
            },
            d(t) {
                t && vs(n),
                s && s.d(),
                u && u.d(),
                r = !1,
                o()
            }
        }
    }
    function Eh(t) {
        let n, e = t[1], i = [];
        for (let n = 0; n < e.length; n += 1)
            i[n] = kh(wh(t, e, n));
        return {
            c() {
                n = ms("div");
                for (let t = 0; t < i.length; t += 1)
                    i[t].c();
                Xs(n, "class", "tabs svelte-1l9tlvb"),
                Ts(n, "secondary", t[2])
            },
            m(t, e) {
                ds(t, n, e);
                for (let t = 0; t < i.length; t += 1)
                    i[t].m(n, null)
            },
            p(t, [r]) {
                if (3 & r) {
                    let o;
                    for (e = t[1],
                    o = 0; o < e.length; o += 1) {
                        const s = wh(t, e, o);
                        i[o] ? i[o].p(s, r) : (i[o] = kh(s),
                        i[o].c(),
                        i[o].m(n, null))
                    }
                    for (; o < i.length; o += 1)
                        i[o].d(1);
                    i.length = e.length
                }
                4 & r && Ts(n, "secondary", t[2])
            },
            i: ns,
            o: ns,
            d(t) {
                t && vs(n),
                ps(i, t)
            }
        }
    }
    function Th(t, n, e) {
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
    class Sh extends eu {
        constructor(t) {
            super(),
            nu(this, t, Th, Eh, ss, {
                options: 1,
                selected: 0,
                secondary: 2
            })
        }
    }
    function jh(t) {
        let n, e, i, r, o, s, u, c, a, l, f, h, d, v, p, m = t[0].name + "", g = t[0].songNum + "", y = t[0].sheetNum + "";
        return {
            c() {
                n = ms("a"),
                e = ms("div"),
                i = gs(m),
                r = ys(),
                o = ms("div"),
                s = ms("span"),
                u = gs(g),
                c = gs("歌曲"),
                a = ys(),
                l = ms("span"),
                f = ys(),
                h = ms("span"),
                d = gs(y),
                v = gs("曲谱"),
                Xs(e, "class", "name svelte-c9vvdw"),
                Xs(l, "class", "dot svelte-c9vvdw"),
                Xs(o, "class", "info svelte-c9vvdw"),
                Xs(n, "class", "artist-preview svelte-c9vvdw"),
                Xs(n, "href", p = "/" + (t[1] ? "explore" : "search") + "#q=" + encodeURIComponent(t[0].name))
            },
            m(t, p) {
                ds(t, n, p),
                hs(n, e),
                hs(e, i),
                hs(n, r),
                hs(n, o),
                hs(o, s),
                hs(s, u),
                hs(s, c),
                hs(o, a),
                hs(o, l),
                hs(o, f),
                hs(o, h),
                hs(h, d),
                hs(h, v)
            },
            p(t, [e]) {
                1 & e && m !== (m = t[0].name + "") && ks(i, m),
                1 & e && g !== (g = t[0].songNum + "") && ks(u, g),
                1 & e && y !== (y = t[0].sheetNum + "") && ks(d, y),
                3 & e && p !== (p = "/" + (t[1] ? "explore" : "search") + "#q=" + encodeURIComponent(t[0].name)) && Xs(n, "href", p)
            },
            i: ns,
            o: ns,
            d(t) {
                t && vs(n)
            }
        }
    }
    function Ch(t, n, e) {
        let {artist: i} = n
          , {desktop: r=!1} = n;
        return t.$$set = t => {
            "artist"in t && e(0, i = t.artist),
            "desktop"in t && e(1, r = t.desktop)
        }
        ,
        [i, r]
    }
    class Ah extends eu {
        constructor(t) {
            super(),
            nu(this, t, Ch, jh, ss, {
                artist: 0,
                desktop: 1
            })
        }
    }
    function Oh(t) {
        let n, e, i, r, o, s, u;
        return {
            c() {
                n = ms("div"),
                e = ms("div"),
                e.innerHTML = '<span class="icon yoopu3-icon svelte-ivnm0d"></span>',
                i = ys(),
                r = ms("div"),
                r.textContent = " ",
                o = ys(),
                s = ms("span"),
                u = gs(t[0]),
                Xs(e, "class", "audio-player svelte-ivnm0d"),
                Xs(r, "class", "spectrum yoopu3-icon svelte-ivnm0d"),
                Xs(s, "class", "duration svelte-ivnm0d"),
                Xs(n, "class", "demo-player svelte-ivnm0d")
            },
            m(t, c) {
                ds(t, n, c),
                hs(n, e),
                hs(n, i),
                hs(n, r),
                hs(n, o),
                hs(n, s),
                hs(s, u)
            },
            p(t, [n]) {
                1 & n && ks(u, t[0])
            },
            i: ns,
            o: ns,
            d(t) {
                t && vs(n)
            }
        }
    }
    function _h(t, n, e) {
        let {durationDisplay: i} = n;
        return t.$$set = t => {
            "durationDisplay"in t && e(0, i = t.durationDisplay)
        }
        ,
        [i]
    }
    class Bh extends eu {
        constructor(t) {
            super(),
            nu(this, t, _h, Oh, ss, {
                durationDisplay: 0
            })
        }
    }
    function Dh(t) {
        let n, e, i, r, o, s = t[0].owner.displayName + "";
        return n = new Rl({
            props: {
                user: t[0].owner,
                size: "xsmall"
            }
        }),
        {
            c() {
                Ys(n.$$.fragment),
                e = ys(),
                i = ms("span"),
                r = gs(s),
                Xs(i, "class", "username")
            },
            m(t, s) {
                Zs(n, t, s),
                ds(t, e, s),
                ds(t, i, s),
                hs(i, r),
                o = !0
            },
            p(t, e) {
                const i = {};
                1 & e && (i.user = t[0].owner),
                n.$set(i),
                (!o || 1 & e) && s !== (s = t[0].owner.displayName + "") && ks(r, s)
            },
            i(t) {
                o || (Vs(n.$$.fragment, t),
                o = !0)
            },
            o(t) {
                Ks(n.$$.fragment, t),
                o = !1
            },
            d(t) {
                tu(n, t),
                t && vs(e),
                t && vs(i)
            }
        }
    }
    function qh(t) {
        let n, e, i, r, o, s, u, c, a, l, f, h, d, v, p, m, g, y, b, w, X, x, k, E, T, S, j, C = t[0].title + "", A = t[0].playedTimesDisplay + "", O = t[0].creationTimeDisplay + "";
        c = new Bh({
            props: {
                durationDisplay: t[0].durationDisplay
            }
        });
        let _ = t[0].owner && Dh(t);
        return {
            c() {
                n = ms("div"),
                e = ms("a"),
                i = ms("div"),
                r = ms("span"),
                o = gs(C),
                s = ys(),
                u = ms("div"),
                Ys(c.$$.fragment),
                l = ys(),
                f = ms("div"),
                h = ms("div"),
                _ && _.c(),
                d = ys(),
                v = ms("div"),
                p = ms("div"),
                m = ms("span"),
                m.textContent = "",
                g = ys(),
                y = ms("span"),
                b = gs(A),
                w = gs("次播放"),
                X = ys(),
                x = ms("div"),
                k = ms("span"),
                k.textContent = "",
                E = ys(),
                T = ms("span"),
                S = gs(O),
                Xs(r, "class", "title svelte-x69xlk"),
                Xs(i, "class", "title-line svelte-x69xlk"),
                Xs(u, "class", "audio svelte-x69xlk"),
                Xs(e, "class", "post-main svelte-x69xlk"),
                Xs(e, "href", a = "/view/" + t[0].sheetCode + "#audio=" + t[0].audioCode),
                Xs(h, "class", "user-info svelte-x69xlk"),
                Xs(m, "class", "icon yoopu3-icon"),
                Xs(p, "class", "svelte-x69xlk"),
                Xs(k, "class", "icon yoopu3-icon"),
                Xs(x, "class", "svelte-x69xlk"),
                Xs(v, "class", "stats svelte-x69xlk"),
                Xs(f, "class", "post-info svelte-x69xlk"),
                Xs(n, "class", "audio-preview")
            },
            m(t, a) {
                ds(t, n, a),
                hs(n, e),
                hs(e, i),
                hs(i, r),
                hs(r, o),
                hs(e, s),
                hs(e, u),
                Zs(c, u, null),
                hs(n, l),
                hs(n, f),
                hs(f, h),
                _ && _.m(h, null),
                hs(f, d),
                hs(f, v),
                hs(v, p),
                hs(p, m),
                hs(p, g),
                hs(p, y),
                hs(y, b),
                hs(p, w),
                hs(v, X),
                hs(v, x),
                hs(x, k),
                hs(x, E),
                hs(x, T),
                hs(T, S),
                j = !0
            },
            p(t, [n]) {
                (!j || 1 & n) && C !== (C = t[0].title + "") && ks(o, C);
                const i = {};
                1 & n && (i.durationDisplay = t[0].durationDisplay),
                c.$set(i),
                (!j || 1 & n && a !== (a = "/view/" + t[0].sheetCode + "#audio=" + t[0].audioCode)) && Xs(e, "href", a),
                t[0].owner ? _ ? (_.p(t, n),
                1 & n && Vs(_, 1)) : (_ = Dh(t),
                _.c(),
                Vs(_, 1),
                _.m(h, null)) : _ && (Hs(),
                Ks(_, 1, 1, ( () => {
                    _ = null
                }
                )),
                Js()),
                (!j || 1 & n) && A !== (A = t[0].playedTimesDisplay + "") && ks(b, A),
                (!j || 1 & n) && O !== (O = t[0].creationTimeDisplay + "") && ks(S, O)
            },
            i(t) {
                j || (Vs(c.$$.fragment, t),
                Vs(_),
                j = !0)
            },
            o(t) {
                Ks(c.$$.fragment, t),
                Ks(_),
                j = !1
            },
            d(t) {
                t && vs(n),
                tu(c),
                _ && _.d()
            }
        }
    }
    function Ih(t, n, e) {
        let {audio: i} = n;
        return t.$$set = t => {
            "audio"in t && e(0, i = t.audio)
        }
        ,
        [i]
    }
    class Mh extends eu {
        constructor(t) {
            super(),
            nu(this, t, Ih, qh, ss, {
                audio: 0
            })
        }
    }
    function Fh(t, n, e) {
        const i = t.slice();
        return i[3] = n[e],
        i
    }
    function Nh(t) {
        let n, e, i;
        return e = new Ol({
            props: {
                src: t[3].iconImage
            }
        }),
        {
            c() {
                n = ms("div"),
                Ys(e.$$.fragment),
                Xs(n, "class", "icon svelte-1fr7tr")
            },
            m(t, r) {
                ds(t, n, r),
                Zs(e, n, null),
                i = !0
            },
            p(t, n) {
                const i = {};
                2 & n && (i.src = t[3].iconImage),
                e.$set(i)
            },
            i(t) {
                i || (Vs(e.$$.fragment, t),
                i = !0)
            },
            o(t) {
                Ks(e.$$.fragment, t),
                i = !1
            },
            d(t) {
                t && vs(n),
                tu(e)
            }
        }
    }
    function $h(t) {
        let n, e, i = t[3].title + "";
        return {
            c() {
                n = ms("span"),
                e = gs(i),
                Xs(n, "class", "title svelte-1fr7tr")
            },
            m(t, i) {
                ds(t, n, i),
                hs(n, e)
            },
            p(t, n) {
                2 & n && i !== (i = t[3].title + "") && ks(e, i)
            },
            d(t) {
                t && vs(n)
            }
        }
    }
    function Rh(t) {
        let n, e, i, r, o, s, u = t[3].iconImage && Nh(t), c = t[3].title && $h(t);
        function a() {
            return t[2](t[3])
        }
        return {
            c() {
                n = ms("div"),
                u && u.c(),
                e = ys(),
                c && c.c(),
                i = ys(),
                Xs(n, "class", "option svelte-1fr7tr"),
                Ts(n, "selected", t[3].value == t[0])
            },
            m(t, l) {
                ds(t, n, l),
                u && u.m(n, null),
                hs(n, e),
                c && c.m(n, null),
                hs(n, i),
                r = !0,
                o || (s = ws(n, "click", a),
                o = !0)
            },
            p(r, o) {
                (t = r)[3].iconImage ? u ? (u.p(t, o),
                2 & o && Vs(u, 1)) : (u = Nh(t),
                u.c(),
                Vs(u, 1),
                u.m(n, e)) : u && (Hs(),
                Ks(u, 1, 1, ( () => {
                    u = null
                }
                )),
                Js()),
                t[3].title ? c ? c.p(t, o) : (c = $h(t),
                c.c(),
                c.m(n, i)) : c && (c.d(1),
                c = null),
                3 & o && Ts(n, "selected", t[3].value == t[0])
            },
            i(t) {
                r || (Vs(u),
                r = !0)
            },
            o(t) {
                Ks(u),
                r = !1
            },
            d(t) {
                t && vs(n),
                u && u.d(),
                c && c.d(),
                o = !1,
                s()
            }
        }
    }
    function Gh(t) {
        let n, e, i = t[1], r = [];
        for (let n = 0; n < i.length; n += 1)
            r[n] = Rh(Fh(t, i, n));
        const o = t => Ks(r[t], 1, 1, ( () => {
            r[t] = null
        }
        ));
        return {
            c() {
                n = ms("div");
                for (let t = 0; t < r.length; t += 1)
                    r[t].c();
                Xs(n, "class", "tabs svelte-1fr7tr")
            },
            m(t, i) {
                ds(t, n, i);
                for (let t = 0; t < r.length; t += 1)
                    r[t].m(n, null);
                e = !0
            },
            p(t, [e]) {
                if (3 & e) {
                    let s;
                    for (i = t[1],
                    s = 0; s < i.length; s += 1) {
                        const o = Fh(t, i, s);
                        r[s] ? (r[s].p(o, e),
                        Vs(r[s], 1)) : (r[s] = Rh(o),
                        r[s].c(),
                        Vs(r[s], 1),
                        r[s].m(n, null))
                    }
                    for (Hs(),
                    s = i.length; s < r.length; s += 1)
                        o(s);
                    Js()
                }
            },
            i(t) {
                if (!e) {
                    for (let t = 0; t < i.length; t += 1)
                        Vs(r[t]);
                    e = !0
                }
            },
            o(t) {
                r = r.filter(Boolean);
                for (let t = 0; t < r.length; t += 1)
                    Ks(r[t]);
                e = !1
            },
            d(t) {
                t && vs(n),
                ps(r, t)
            }
        }
    }
    function Ph(t, n, e) {
        let {options: i=[]} = n
          , {selected: r} = n;
        return t.$$set = t => {
            "options"in t && e(1, i = t.options),
            "selected"in t && e(0, r = t.selected)
        }
        ,
        [r, i, t => e(0, r = t.value)]
    }
    class Uh extends eu {
        constructor(t) {
            super(),
            nu(this, t, Ph, Gh, ss, {
                options: 1,
                selected: 0
            })
        }
    }
    function Lh(t, n, e) {
        const i = t.slice();
        return i[32] = n[e],
        i[34] = e,
        i
    }
    function zh(t) {
        let n, e, i, r;
        function o(n) {
            t[12](n)
        }
        let s = {
            options: t[2]
        };
        return void 0 !== t[0] && (s.selected = t[0]),
        e = new Uh({
            props: s
        }),
        Ds.push(( () => Qs(e, "selected", o))),
        {
            c() {
                n = ms("div"),
                Ys(e.$$.fragment),
                Xs(n, "class", "tabs-container svelte-1fb8ish")
            },
            m(t, i) {
                ds(t, n, i),
                Zs(e, n, null),
                r = !0
            },
            p(t, n) {
                const r = {};
                4 & n[0] && (r.options = t[2]),
                !i && 1 & n[0] && (i = !0,
                r.selected = t[0],
                Rs(( () => i = !1))),
                e.$set(r)
            },
            i(t) {
                r || (Vs(e.$$.fragment, t),
                r = !0)
            },
            o(t) {
                Ks(e.$$.fragment, t),
                r = !1
            },
            d(t) {
                t && vs(n),
                tu(e)
            }
        }
    }
    function Wh(t) {
        let n, e, i, r;
        function o(n) {
            t[13](n)
        }
        let s = {
            secondary: !0,
            options: t[3]
        };
        return void 0 !== t[1] && (s.selected = t[1]),
        e = new Sh({
            props: s
        }),
        Ds.push(( () => Qs(e, "selected", o))),
        {
            c() {
                n = ms("div"),
                Ys(e.$$.fragment),
                Xs(n, "class", "sub-tabs-container svelte-1fb8ish")
            },
            m(t, i) {
                ds(t, n, i),
                Zs(e, n, null),
                r = !0
            },
            p(t, n) {
                const r = {};
                8 & n[0] && (r.options = t[3]),
                !i && 2 & n[0] && (i = !0,
                r.selected = t[1],
                Rs(( () => i = !1))),
                e.$set(r)
            },
            i(t) {
                r || (Vs(e.$$.fragment, t),
                r = !0)
            },
            o(t) {
                Ks(e.$$.fragment, t),
                r = !1
            },
            d(t) {
                t && vs(n),
                tu(e)
            }
        }
    }
    function Hh(t) {
        let n, e = t[6] && Jh(t);
        return {
            c() {
                n = ms("div"),
                e && e.c(),
                Xs(n, "class", "search-result-tip svelte-1fb8ish")
            },
            m(t, i) {
                ds(t, n, i),
                e && e.m(n, null)
            },
            p(t, i) {
                t[6] ? e ? e.p(t, i) : (e = Jh(t),
                e.c(),
                e.m(n, null)) : e && (e.d(1),
                e = null)
            },
            d(t) {
                t && vs(n),
                e && e.d()
            }
        }
    }
    function Jh(t) {
        let n, e, i, r;
        return {
            c() {
                n = gs("找到"),
                e = ms("span"),
                i = gs(t[6]),
                r = gs("个匹配"),
                Xs(e, "class", "svelte-1fb8ish")
            },
            m(t, o) {
                ds(t, n, o),
                ds(t, e, o),
                hs(e, i),
                ds(t, r, o)
            },
            p(t, n) {
                64 & n[0] && ks(i, t[6])
            },
            d(t) {
                t && vs(n),
                t && vs(e),
                t && vs(r)
            }
        }
    }
    function Vh(t) {
        let n, e, i, r;
        const o = [Yh, Qh]
          , s = [];
        function u(t, n) {
            return t[5] ? 0 : 1
        }
        return e = u(t),
        i = s[e] = o[e](t),
        {
            c() {
                n = ms("div"),
                i.c(),
                Xs(n, "class", "placeholder svelte-1fb8ish")
            },
            m(t, i) {
                ds(t, n, i),
                s[e].m(n, null),
                r = !0
            },
            p(t, r) {
                let c = e;
                e = u(t),
                e !== c && (Hs(),
                Ks(s[c], 1, 1, ( () => {
                    s[c] = null
                }
                )),
                Js(),
                i = s[e],
                i || (i = s[e] = o[e](t),
                i.c()),
                Vs(i, 1),
                i.m(n, null))
            },
            i(t) {
                r || (Vs(i),
                r = !0)
            },
            o(t) {
                Ks(i),
                r = !1
            },
            d(t) {
                t && vs(n),
                s[e].d()
            }
        }
    }
    function Kh(t) {
        let n, e, i = t[4], r = [];
        for (let n = 0; n < i.length; n += 1)
            r[n] = id(Lh(t, i, n));
        const o = t => Ks(r[t], 1, 1, ( () => {
            r[t] = null
        }
        ));
        return {
            c() {
                for (let t = 0; t < r.length; t += 1)
                    r[t].c();
                n = bs()
            },
            m(t, i) {
                for (let n = 0; n < r.length; n += 1)
                    r[n].m(t, i);
                ds(t, n, i),
                e = !0
            },
            p(t, e) {
                if (528 & e[0]) {
                    let s;
                    for (i = t[4],
                    s = 0; s < i.length; s += 1) {
                        const o = Lh(t, i, s);
                        r[s] ? (r[s].p(o, e),
                        Vs(r[s], 1)) : (r[s] = id(o),
                        r[s].c(),
                        Vs(r[s], 1),
                        r[s].m(n.parentNode, n))
                    }
                    for (Hs(),
                    s = i.length; s < r.length; s += 1)
                        o(s);
                    Js()
                }
            },
            i(t) {
                if (!e) {
                    for (let t = 0; t < i.length; t += 1)
                        Vs(r[t]);
                    e = !0
                }
            },
            o(t) {
                r = r.filter(Boolean);
                for (let t = 0; t < r.length; t += 1)
                    Ks(r[t]);
                e = !1
            },
            d(t) {
                ps(r, t),
                t && vs(n)
            }
        }
    }
    function Qh(t) {
        let n, e;
        return n = new ih({}),
        {
            c() {
                Ys(n.$$.fragment)
            },
            m(t, i) {
                Zs(n, t, i),
                e = !0
            },
            i(t) {
                e || (Vs(n.$$.fragment, t),
                e = !0)
            },
            o(t) {
                Ks(n.$$.fragment, t),
                e = !1
            },
            d(t) {
                tu(n, t)
            }
        }
    }
    function Yh(t) {
        let n;
        return {
            c() {
                n = gs("加载中...")
            },
            m(t, e) {
                ds(t, n, e)
            },
            i: ns,
            o: ns,
            d(t) {
                t && vs(n)
            }
        }
    }
    function Zh(t) {
        let n, e;
        return n = new Ah({
            props: {
                desktop: !0,
                artist: t[32]
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
                16 & e[0] && (i.artist = t[32]),
                n.$set(i)
            },
            i(t) {
                e || (Vs(n.$$.fragment, t),
                e = !0)
            },
            o(t) {
                Ks(n.$$.fragment, t),
                e = !1
            },
            d(t) {
                tu(n, t)
            }
        }
    }
    function td(t) {
        let n, e;
        return n = new Mh({
            props: {
                audio: t[32]
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
                16 & e[0] && (i.audio = t[32]),
                n.$set(i)
            },
            i(t) {
                e || (Vs(n.$$.fragment, t),
                e = !0)
            },
            o(t) {
                Ks(n.$$.fragment, t),
                e = !1
            },
            d(t) {
                tu(n, t)
            }
        }
    }
    function nd(t) {
        let n, e;
        return n = new bh({
            props: {
                song: t[32]
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
                16 & e[0] && (i.song = t[32]),
                n.$set(i)
            },
            i(t) {
                e || (Vs(n.$$.fragment, t),
                e = !0)
            },
            o(t) {
                Ks(n.$$.fragment, t),
                e = !1
            },
            d(t) {
                tu(n, t)
            }
        }
    }
    function ed(t) {
        let n, e;
        return n = new Zf({
            props: {
                sheet: t[32]
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
                16 & e[0] && (i.sheet = t[32]),
                n.$set(i)
            },
            i(t) {
                e || (Vs(n.$$.fragment, t),
                e = !0)
            },
            o(t) {
                Ks(n.$$.fragment, t),
                e = !1
            },
            d(t) {
                tu(n, t)
            }
        }
    }
    function id(t) {
        let n, e, i, r, o, s, u;
        const c = [ed, nd, td, Zh]
          , a = [];
        function l(t, n) {
            return "sheet" === t[32].entryType ? 0 : "song" === t[32].entryType ? 1 : "audio" === t[32].entryType ? 2 : "artist" === t[32].entryType ? 3 : -1
        }
        function f() {
            return t[14](t[32])
        }
        return ~(e = l(t)) && (i = a[e] = c[e](t)),
        {
            c() {
                n = ms("div"),
                i && i.c(),
                r = ys(),
                Xs(n, "class", "post-item svelte-1fb8ish")
            },
            m(t, i) {
                ds(t, n, i),
                ~e && a[e].m(n, null),
                hs(n, r),
                o = !0,
                s || (u = ws(n, "click", f),
                s = !0)
            },
            p(o, s) {
                let u = e;
                e = l(t = o),
                e === u ? ~e && a[e].p(t, s) : (i && (Hs(),
                Ks(a[u], 1, 1, ( () => {
                    a[u] = null
                }
                )),
                Js()),
                ~e ? (i = a[e],
                i ? i.p(t, s) : (i = a[e] = c[e](t),
                i.c()),
                Vs(i, 1),
                i.m(n, r)) : i = null)
            },
            i(t) {
                o || (Vs(i),
                o = !0)
            },
            o(t) {
                Ks(i),
                o = !1
            },
            d(t) {
                t && vs(n),
                ~e && a[e].d(),
                s = !1,
                u()
            }
        }
    }
    function rd(t) {
        let n, e, i, r, o, s, u, c = t[0] !== t[8].SEARCH && zh(t), a = t[0] === t[8].CATEGORY && Wh(t), l = t[0] === t[8].SEARCH && Hh(t);
        const f = [Kh, Vh]
          , h = [];
        function d(t, n) {
            return t[4].length > 0 ? 0 : 1
        }
        return o = d(t),
        s = h[o] = f[o](t),
        {
            c() {
                c && c.c(),
                n = ys(),
                a && a.c(),
                e = ys(),
                l && l.c(),
                i = ys(),
                r = ms("div"),
                s.c(),
                Xs(r, "class", "list-container svelte-1fb8ish")
            },
            m(s, f) {
                c && c.m(s, f),
                ds(s, n, f),
                a && a.m(s, f),
                ds(s, e, f),
                l && l.m(s, f),
                ds(s, i, f),
                ds(s, r, f),
                h[o].m(r, null),
                t[15](r),
                u = !0
            },
            p(t, u) {
                t[0] !== t[8].SEARCH ? c ? (c.p(t, u),
                1 & u[0] && Vs(c, 1)) : (c = zh(t),
                c.c(),
                Vs(c, 1),
                c.m(n.parentNode, n)) : c && (Hs(),
                Ks(c, 1, 1, ( () => {
                    c = null
                }
                )),
                Js()),
                t[0] === t[8].CATEGORY ? a ? (a.p(t, u),
                1 & u[0] && Vs(a, 1)) : (a = Wh(t),
                a.c(),
                Vs(a, 1),
                a.m(e.parentNode, e)) : a && (Hs(),
                Ks(a, 1, 1, ( () => {
                    a = null
                }
                )),
                Js()),
                t[0] === t[8].SEARCH ? l ? l.p(t, u) : (l = Hh(t),
                l.c(),
                l.m(i.parentNode, i)) : l && (l.d(1),
                l = null);
                let v = o;
                o = d(t),
                o === v ? h[o].p(t, u) : (Hs(),
                Ks(h[v], 1, 1, ( () => {
                    h[v] = null
                }
                )),
                Js(),
                s = h[o],
                s ? s.p(t, u) : (s = h[o] = f[o](t),
                s.c()),
                Vs(s, 1),
                s.m(r, null))
            },
            i(t) {
                u || (Vs(c),
                Vs(a),
                Vs(s),
                u = !0)
            },
            o(t) {
                Ks(c),
                Ks(a),
                Ks(s),
                u = !1
            },
            d(s) {
                c && c.d(s),
                s && vs(n),
                a && a.d(s),
                s && vs(e),
                l && l.d(s),
                s && vs(i),
                s && vs(r),
                h[o].d(),
                t[15](null)
            }
        }
    }
    function od(t) {
        let n, e;
        return n = new gf({
            props: {
                selectedNav: "explore",
                $$slots: {
                    default: [rd]
                },
                $$scope: {
                    ctx: t
                }
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
                255 & e[0] | 16 & e[1] && (i.$$scope = {
                    dirty: e,
                    ctx: t
                }),
                n.$set(i)
            },
            i(t) {
                e || (Vs(n.$$.fragment, t),
                e = !0)
            },
            o(t) {
                Ks(n.$$.fragment, t),
                e = !1
            },
            d(t) {
                tu(n, t)
            }
        }
    }
    function sd(n, e, i) {
        let r;
        us(n, su, (t => i(11, r = t)));
        let {webViewInterface: u} = e;
        var c, a;
        c = "webViewInterface",
        a = u,
        Cs().$$.context.set(c, a);
        const l = Ka()
          , f = C()
          , h = {
            RECOMMENDATION: "a",
            NEW: "n",
            CATEGORY: "h",
            SEARCH: "search"
        }
          , d = "beginner"
          , v = "solo"
          , p = "artist"
          , m = function(t) {
            let n, e;
            return async (...i) => {
                n && (n.cancel(),
                e.cancelled = !0),
                n = t(...i),
                ot(n instanceof Promise, "cancelPendingTask: Task is not async!"),
                ot("function" == typeof n.cancel, "cancelPendingTask: Task not cancellable!"),
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
        }(bt);
        let g, y, w, X, x, k = null != f.q ? String(f.q) : void 0, j = k ? h.SEARCH : f.v || h.RECOMMENDATION, A = j === h.CATEGORY ? f.s || p : void 0, O = [], _ = !1, B = N(), D = B - 1, q = 0;
        function I() {
            if (j === h.SEARCH)
                return;
            const n = r || t.GUITAR;
            i(2, g = [{
                title: "推荐",
                iconImage: "//cdn.yopu.co/img/home_note.cf6ef6e6.svg",
                value: h.RECOMMENDATION
            }, {
                title: "最新",
                iconImage: "//cdn.yopu.co/img/home_editor.f306adef.svg",
                value: h.NEW
            }, {
                title: "分类",
                iconImage: "//cdn.yopu.co/img/home_disk.6125202c.svg",
                value: h.CATEGORY
            }]),
            i(3, y = function(n) {
                return [t.JIAN, t.PIANO].includes(n) ? [{
                    title: "艺人",
                    value: p
                }] : [{
                    title: "艺人",
                    value: p
                }, {
                    title: "新手",
                    value: d
                }, {
                    title: "指弹",
                    value: v
                }]
            }(n)),
            i(0, j = g[0].value),
            i(1, A = y[0].value)
        }
        function M() {
            const t = {};
            j === h.SEARCH ? t.q = k : t.v = j,
            j === h.CATEGORY && i(1, A = A || p),
            j === h.CATEGORY && A && (t.s = A),
            function(t, n) {
                const e = T(t);
                n ? history.pushState(void 0, void 0, "#" + e) : history.replaceState(void 0, void 0, "#" + e)
            }(t),
            F(!1)
        }
        async function F(n) {
            n || (B = N(),
            D = B - 1,
            i(4, O = []),
            i(6, q = 0));
            let e = [];
            try {
                i(5, _ = !0);
                const n = await m(function() {
                    if (j === h.SEARCH)
                        return S(Tn, {
                            q: k,
                            page: B,
                            instrument: r
                        });
                    let n;
                    switch (j) {
                    case h.RECOMMENDATION:
                        n = kn;
                        break;
                    case h.NEW:
                        n = wn;
                        break;
                    case h.CATEGORY:
                        A === d ? n = Xn + "/" + o : A === v ? n = Xn + "/" + s : A === p && (n = xn)
                    }
                    return S(n, {
                        page: B,
                        instrument: r || t.GUITAR
                    })
                }());
                n && (j === h.SEARCH ? (n.queryId && (w = n.queryId),
                i(6, ({results: e, totalResultNum: q} = n), q)) : e = n)
            } finally {
                i(5, _ = !1)
            }
            e.length > 0 && (D = B),
            i(4, O = O.concat(e)),
            j === h.RECOMMENDATION ? E.setJson(b, {
                page: B,
                timestamp: Date.now()
            }) : j !== h.SEARCH || n || l.addHistoryQuery(k)
        }
        function N() {
            if (j === h.RECOMMENDATION) {
                const t = E.getJson(b);
                if (t) {
                    const {page: n, timestamp: e} = t;
                    if (e > Date.now() - 5 * Y.DAY && n + 1 <= 20)
                        return n + 1
                }
            }
            return 0
        }
        async function $({title: t, artist: n, entryType: e}) {
            j === h.SEARCH && function(t, n={}) {
                if (navigator.sendBeacon) {
                    const e = new Blob([JSON.stringify(n)],{
                        type: "application/json; charset=UTF-8"
                    });
                    navigator.sendBeacon(t, e)
                } else
                    wt(t, n, {
                        silent: !0
                    }).catch(( () => {}
                    ))
            }(S(En, {
                id: w
            }), {
                queryId: w,
                title: t,
                artist: n,
                entryType: e
            })
        }
        self.addEventListener("hashchange", ( () => {
            const t = C();
            k = null != t.q ? String(t.q) : void 0,
            k && (j === h.SEARCH ? F(!1) : i(0, j = h.SEARCH))
        }
        )),
        (Ns(),
        Ms).then((async () => {
            X = new th(x),
            X.onNextPage(( () => {
                B !== D + 1 && (B = D + 1,
                F(!0))
            }
            )),
            X.setEnabled(!0);
            const {install: n} = await zo("hexi");
            n(self, function(n) {
                return n ? n === t.GUITAR ? Pu : n === t.UKULELE ? Uu : [] : Pu.concat(Uu)
            }())
        }
        ));
        return n.$$set = t => {
            "webViewInterface"in t && i(10, u = t.webViewInterface)
        }
        ,
        n.$$.update = () => {
            2048 & n.$$.dirty[0] && I(),
            2051 & n.$$.dirty[0] && M()
        }
        ,
        [j, A, g, y, O, _, q, x, h, $, u, r, function(t) {
            j = t,
            i(0, j)
        }
        , function(t) {
            A = t,
            i(1, A)
        }
        , t => $(t), function(t) {
            Ds[t ? "unshift" : "push"](( () => {
                x = t,
                i(7, x)
            }
            ))
        }
        ]
    }
    class ud extends eu {
        constructor(t) {
            super(),
            nu(this, t, sd, od, ss, {
                webViewInterface: 10
            }, [-1, -1])
        }
    }
    !function(t, {errorReporting: n=!0, allowHorizontalScreen: e=!1}={}) {
        if ((i = navigator.userAgent) && i.indexOf("Trident/7") > 0)
            return Ru("Execuse me? IE11?"),
            void (document.body.innerHTML = '\n<h1 style="text-align: center; color: indianred">有谱么网站不支持IE11，请更新浏览器。</h1>\n<br>\n<h2 style="text-align: center">如果是QQ或360之类的双核浏览器，请切换至"极速模式"</h2>\n    ');
        var i;
        n && !Gu && Eo !== ko && (Cr({
            sampleRate: Eo === Xo ? .1 : 1,
            environment: Eo,
            dsn: "https://152d93ecd1114ccb88aed01c65129fa4@o162748.ingest.sentry.io/1230705",
            beforeSend(t, n) {
                const e = n.originalException;
                return e && e.message && e.message.match(/\$ is not defined/) || "Timeout" === n.originalException ? null : t
            },
            integrations: [new wo.BrowserTracing],
            tracesSampleRate: Eo === Xo ? .01 : 1
        }),
        self.captureException = jo,
        To("Error reporting enabled")),
        Fu(),
        setTimeout(( () => {
            const n = new bu;
            n.install(self),
            !e && Math.min(screen.height, screen.width) <= 500 && n.lockScreenOrientation(pu);
            let i = [];
            Gu || (i = So(n)),
            async function() {
                if ("loading" !== document.readyState)
                    return;
                return Po(document, "DOMContentLoaded")
            }().then(( () => {
                i.forEach((t => {
                    (function(t) {
                        if (!Du[t]) {
                            const n = Dt("script", {
                                async: "",
                                src: t
                            });
                            Du[t] = new Promise(( (e, i) => {
                                n.onload = e,
                                n.onerror = () => i(new Error("Failed to load script: " + t))
                            }
                            )),
                            document.head.appendChild(n)
                        }
                        return Du[t]
                    }
                    )(t).catch(( () => {}
                    ))
                }
                )),
                function(t) {
                    const n = Dt("style", {
                        type: "text/css"
                    });
                    n.innerHTML = t,
                    document.head.appendChild(n)
                }(`@font-face {\n  font-family: 'iconfont';\n  src: url('${F}') format('woff2'),\n  url('${N}') format('woff'),\n  url('${$}') format('truetype');\n}`)
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
            Ou(),
            ku(n),
            Xu.subscribe((t => {
                qt("dark", t)
            }
            )),
            su.subscribe((t => {
                !function(t, n="") {
                    null == n ? Ot.removeAttribute(t) : Ot.setAttribute(t, n)
                }("instrument", t)
            }
            ));
            const r = _t("#c")
              , o = function(t) {
                if (!t)
                    return {};
                const n = function(t) {
                    const n = decodeURIComponent(P(t));
                    try {
                        return JSON.parse(n)
                    } catch (t) {
                        return null
                    }
                }(t.innerHTML);
                return t.innerHTML = "",
                t.style.display = "",
                n
            }(r);
            o && void 0 !== o.user && (null === o.user ? Ko() : Yo(o.user)),
            t(n, r, o),
            Ru("Ready!")
        }
        ), 1)
    }((function(t, n, e) {
        A(j().instrument),
        new ud({
            target: n,
            props: {
                webViewInterface: t,
                ...e
            }
        })
    }
    ))
}();
