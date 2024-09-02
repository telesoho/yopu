(function() {
    "use strict";
    const t = "//cdn.yopu.co/img/default-avatar.9190c675.svg"
      , e = "//cdn.yopu.co/img/ypj_vip.20e9634c.svg"
      , i = "//cdn.yopu.co/img/ypj_vip_dark.f1b46d8f.svg"
      , r = "//cdn.yopu.co/img/logo.bd260b19.svg"
      , o = "//cdn.yopu.co/img/logo_text.5c518d95.svg"
      , s = "//cdn.yopu.co/img/male-frame.7ea6de80.png"
      , u = "//cdn.yopu.co/img/female-frame.4c1ecefa.png"
      , c = "//cdn.yopu.co/img/badge-member.6b6bd93c.png"
      , a = "//cdn.yopu.co/img/badge-rank-author.d98848c1.png"
      , l = "//cdn.yopu.co/img/badge-rank-player.d64bedb9.png"
      , f = r
      , h = "//cdn.yopu.co/img/selection-piano.1beed644.svg"
      , d = "//cdn.yopu.co/img/selection-guitar.39468ba1.svg"
      , v = "//cdn.yopu.co/img/selection-ukulele.4025607e.svg"
      , p = "//cdn.yopu.co/img/selection-jian.8213afc4.svg"
      , m = "//cdn.yopu.co/font/iconfont.dfeb8317.woff2"
      , y = "//cdn.yopu.co/font/iconfont-deprecated.88c86d8f.woff"
      , g = "//cdn.yopu.co/font/iconfont.04cf6e63.ttf"
      , b = /OS ([0-9_]+) like Mac OS X/
      , w = /Linux; Android ([0-9.]+);/;
    function x(t) {
        if (!t)
            return null;
        let n = X(t);
        return n || (n = A(t)),
        n
    }
    function k(t) {
        return /^((?!chrome|android).)*safari/i.test(t)
    }
    function S(t) {
        return k(t) || /iphone|ipod|ipad/i.test(t)
    }
    function E(t) {
        return t && t.indexOf("Trident/7") > 0
    }
    function T(t) {
        return O(t) || C(t)
    }
    function O(t) {
        return /(miniProgram|MMWEBSDK)/i.test(t)
    }
    function C(t) {
        return /ToutiaoMicroApp/i.test(t)
    }
    function A(t) {
        const n = t.match(b);
        return n ? {
            family: "iOS",
            ...I(n[1], "_")
        } : null
    }
    function X(t) {
        const n = t.match(w);
        return n ? {
            family: "Android",
            ...I(n[1], ".")
        } : null
    }
    function I(t, n) {
        const e = t.split(n);
        return {
            major: parseInt(e[0]) || 0,
            minor: parseInt(e[1]) || 0,
            patch: parseInt(e[2]) || 0
        }
    }
    function _(t) {
        const n = t.length
          , e = new $(n);
        e.skip(n);
        for (let i = 1; i < n; i++)
            e.prev(),
            D(t, i, e.value)
    }
    function M(t) {
        const n = t.replaceAll('\n', '').split("");
        return _(n),
        n.join("")
    }
    function R(t) {
        const n = decodeURIComponent(M(t));
        try {
            return JSON.parse(n)
        } catch (t) {
            return null
        }
    }
    function D(t, n, e) {
        const i = e * (n + 1) | 0;
        [t[n],t[i]] = [t[i], t[n]]
    }
    const j = 601
      , B = 11
      , P = 65536
      , q = 9705;
    class $ {
        constructor(t=1) {
            this.x = N(t, P)
        }
        get value() {
            return this.x / P
        }
        next() {
            this.x = N(j * this.x + B, P)
        }
        prev() {
            this.x = N(q * (this.x - B), P)
        }
        skip(t) {
            const n = (F(j, t, j * P - P) - 1) / (j - 1) * B
              , e = F(j, t, P) * this.x;
            this.x = N(n + e, P)
        }
    }
    function F(t, n, e) {
        let i = 1
          , r = t = N(t, e);
        for (; n > 0; ) {
            const t = N(n, 2);
            n = n / 2 | 0,
            1 === t && (i = N(i * r, e)),
            r = N(r * r, e)
        }
        return i
    }
    function N(t, n) {
        const e = t % n;
        return e < 0 ? e + n : e
    }
    const z = 1e3
      , L = 60 * z
      , G = 60 * L
      , U = 24 * G
      , H = 7 * U
      , V = 30 * U
      , W = 3 * V
      , J = 365 * U
      , K = {
        SECOND: z,
        MINUTE: L,
        HOUR: G,
        DAY: U,
        WEEK: H,
        MONTH: V,
        QUARTER: W,
        YEAR: J
    }
      , Y = {
        BAD_REQUEST: 400,
        INVALID_CREDENTIAL: 401,
        NO_PERMISSION: 403,
        NOT_FOUND: 404,
        CORS_FAILURE: 418,
        CAPTCHA_FAILURE: 491
    }
      , Q = {
        GUITAR: "guitar",
        UKULELE: "ukulele",
        PIANO: "piano"
    }
      , Z = Object.assign({}, Q, {
        JIAN: "jian"
    })
      , tt = {
        [Z.GUITAR]: "吉他",
        [Z.UKULELE]: "尤克里里",
        [Z.PIANO]: "钢琴",
        [Z.JIAN]: "民乐/简谱"
    }
      , nt = {
        XHE: "xhe",
        JCX: "jcx",
        GP: "gp",
        MXL: "mxl"
    }
      , et = {
        UNKNOWN: "",
        SOLO: "a",
        VOCAL_MALE: "b",
        VOCAL_FEMALE: "c",
        VOCAL_GENERAL: "d",
        VOCAL_CHORUS: "e"
    }
      , it = {
        CHORD: "chord",
        TAB: "full-tab"
    }
      , rt = {
        REGULAR: "regular",
        INLINE: "inline",
        NUMBER: "number"
    }
      , ot = {
        STAFF: "staff",
        NUMBER: "number"
    }
      , st = {
        SCORE: "Score",
        TAB: "Tab",
        LEAD: "Lead",
        NLEAD: "NLead",
        NUMBERED: "Numbered"
    }
      , ut = [{
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
    function ct(t, n=!1) {
        return n ? ut.slice(0) : t === Z.GUITAR ? ut.slice(0, 7) : t === Z.UKULELE ? ut.slice(0, 4) : []
    }
    const at = [nt.JCX, nt.GP, nt.MXL]
      , lt = {
        METRONOME: "metronome",
        BASIC_4: "basic-4",
        BASIC_3: "basic-3"
    }
      , ft = {
        ADMIN: "admin",
        MEMBER: "member",
        TOP_AUTHOR: "top-author",
        TOP_PLAYER: "top-player"
    }
      , ht = {
        USER: "USER",
        TESTER: "TESTER",
        EDITOR: "EDITOR",
        ADMIN: "ADMIN"
    }
      , dt = "地球"
      , vt = 10;
    function pt(t, n) {
        if (!t)
            throw new Error(n)
    }
    function mt(t, n) {
        let e = 0
          , i = 0
          , r = null;
        function o() {
            e = 0;
            const s = n - (Date.now() - i);
            var u;
            s > 0 ? e = setTimeout(o, s) : (u = r,
            r = null,
            t(...u))
        }
        return function(...t) {
            i = Date.now(),
            r = t,
            e || (e = setTimeout(o, n))
        }
    }
    function yt(t) {
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
    function gt(t) {
        let n;
        return async (...e) => {
            n || (n = t(...e),
            pt(n instanceof Promise, "reusePendingTask: Task is not async!"));
            try {
                return await n
            } finally {
                n = null
            }
        }
    }
    function bt(t) {
        const n = [];
        for (const e in t)
            t.hasOwnProperty(e) && void 0 !== t[e] && n.push(`${e}=${encodeURIComponent(t[e])}`);
        return n.join("&")
    }
    function wt(t, n, e) {
        let i = t;
        const r = bt(n);
        r && (i += "?" + r);
        const o = bt(e);
        return o && (i += "#" + o),
        i
    }
    const xt = {
        [ht.USER]: 1,
        [ht.TESTER]: 2,
        [ht.EDITOR]: 3,
        [ht.ADMIN]: 4
    };
    function kt(t, n) {
        return (xt[t] || 1) >= (xt[n] || 4)
    }
    class St {
        constructor() {
            this.g = []
        }
        add(t) {
            return this.g.push(t),
            () => {
                this.remove(t)
            }
        }
        remove(t) {
            const n = this.g.indexOf(t);
            n > -1 && this.g.splice(n, 1)
        }
        removeAll() {
            this.g.length = 0
        }
        fire(...t) {
            return Promise.all(this.g.map((n => Promise.resolve(n(...t)))))
        }
        getHandlerCount() {
            return this.g.length
        }
    }
    class Et extends Error {
        constructor(t) {
            super(t),
            this.name = "TimeoutError"
        }
    }
    class Tt extends Error {
        constructor(t) {
            super(t),
            this.name = "CancellationError"
        }
    }
    class Ot extends Error {
        constructor(t, n="") {
            super(n),
            this.name = "HttpError " + t,
            this.statusCode = t
        }
    }
    const Ct = {
        TIMEOUT: "TIMEOUT",
        CANCELLATION: "CANCELLATION"
    }
      , At = new St
      , Xt = new St
      , It = new St;
    function _t(t, n, e) {
        const i = At.add(t)
          , r = Xt.add(n)
          , o = It.add(e);
        return () => {
            i(),
            r(),
            o()
        }
    }
    function Mt(t, n, e={}) {
        At.fire({
            url: t,
            init: n,
            options: e
        });
        const {timeout: i=30 * K.SECOND} = e;
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
        i && (s = setTimeout(( () => o(Ct.TIMEOUT)), i));
        let c = !1;
        const a = fetch(t, Object.assign({
            credentials: "include"
        }, n)).then((i => (u(),
        i.ok ? (Xt.fire({
            url: t,
            init: n,
            options: e,
            res: i
        }),
        i) : i.text().then((t => Promise.reject(new Ot(i.status,t))))))).catch((i => {
            if (u(),
            "AbortError" === i.name) {
                const {reason: n} = r.signal;
                n === Ct.TIMEOUT ? i = new Et(t) : n === Ct.CANCELLATION && (i = new Tt(t))
            }
            return It.fire({
                url: t,
                init: n,
                options: e,
                error: i
            }),
            Promise.reject(i)
        }
        ));
        return a.cancel = () => {
            c || o(Ct.CANCELLATION)
        }
        ,
        a
    }
    function Rt(t, n, e={}) {
        return Ft(t, n, e, "arrayBuffer")
    }
    function Dt(t, n, e={}) {
        return Ft(t, n, e, "json")
    }
    function jt(t, n, e={}) {
        return Ft(t, n, e, null)
    }
    function Bt(t, n, e={}) {
        return jt(t, Nt(n), e)
    }
    function Pt(t, n, e={}) {
        return Dt(t, Nt(n), e)
    }
    function qt(t, n) {
        return jt(t, Nt(n, "PUT"))
    }
    function $t(t, n, e) {
        return Dt(t, Nt(n, "PUT"), e)
    }
    function Ft(t, n, e, i) {
        const r = Mt(t, n, e)
          , o = r.then((t => !i || ("arrayBuffer" === i ? t[i]().then((t => new Uint8Array(t))) : t[i]()))).catch((t => t instanceof Ot || t instanceof Tt || t instanceof Et ? !!i && null : Promise.reject(t)));
        return o.cancel = r.cancel,
        o
    }
    function Nt(t, n="POST") {
        return {
            method: n,
            body: JSON.stringify(t),
            headers: {
                "Content-Type": "application/json"
            }
        }
    }
    function zt(t) {
        return Gt() ? console.log.bind(console, `[${t}]`) : () => {}
    }
    function Lt(t) {
        return Gt() ? console.error.bind(console, `[${t}]`) : t => {
            t instanceof Error && self.captureException && self.captureException(t)
        }
    }
    function Gt() {
        return self.location && ("localhost" === self.location.hostname || 0 === self.location.hostname.indexOf("192.168.") || "dev.yopu.co" === self.location.hostname || "18080" === self.location.port || self.location.search.indexOf("log=8") > 0)
    }
    "undefined" == typeof self && "object" == typeof global && (global.self = global);
    const Ut = {
        GLOBAL_SHEET_SETTINGS: "global-sheet-settings",
        USER_DATA_USER_INFO: "user-data-user-info",
        USER_DATA_USER_PORTFOLIO: "user-data-user-portfolio",
        USER_DATA_HISTORY_QUERIES: "user-data-history-queries",
        USER_DATA_SHEETS_OPEN_TIME: "user-data-sheet-open-time",
        USER_DATA_REPORT_STALE: "user-data-report-stale",
        USER_DATA_PORTFOLIO_STALE: "user-data-portfolio-stale",
        USER_DATA_MEMBERSHIP_LAST_VISIT_TIME: "user-data-membership-last-visit-time",
        USER_DATA_LAST_RECOMMENDATION: "user-data-last-recommendation",
        MINE_SORTING_ORDER: "mine-settings:sorting-order",
        MINE_SELECTED_TAB: "mine-settings:selected-tab",
        MINE_SELECTED_INSTRUMENT: "mine-settings:selected-instrument",
        MINE_SELECTED_COLOR_MODE: "mine-settings:selected-color-mode",
        VISITOR_SORTING_ORDER: "visitor-settings:sorting-order",
        DASHBOARD_GOAL: "dashboard-settings:goal",
        NOTIFICATION_RATE_US: "notification:rate-us",
        FEATURE_PROMOTED: "feature-promoted",
        IOS_DEVICE_TOKEN: "ios-device-token",
        LAST_AUTH_INFO: "last-auth-info"
    }
      , Ht = zt("Storage")
      , {localStorage: Vt} = window;
    class Wt {
        static setItem(t, n) {
            if (Ht("setItem", t),
            Vt)
                try {
                    Vt.setItem(t, n)
                } catch (t) {
                    self.captureException && self.captureException(t)
                }
        }
        static getItem(t) {
            return Vt ? Vt.getItem(t) : null
        }
        static removeItem(t) {
            Vt && Vt.removeItem(t)
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
            Vt.clear()
        }
    }
    class Jt {
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
    function Kt(t) {
        return Yt(t).toLowerCase().split(/[\\'!"#$%&()*+,\-./:;<=>?@[\]^_`{|}~ 　～•·！＠＃￥％…＆×－—＝＋、，。｜？《》；：｛｝（）“”‘’【】■]/).map((t => t.trim())).filter((t => t.length > 0))
    }
    function Yt(t) {
        let n = "";
        for (let e = 0; e < t.length; ++e)
            Qt(t, e) ? n += " " + t[e] + " " : n += t[e];
        return n
    }
    function Qt(t, n) {
        const e = t.charCodeAt(n);
        return Zt(t, n) || 12352 <= e && e <= 12447 || 12448 <= e && e <= 12543
    }
    function Zt(t, n) {
        const e = t.charCodeAt(n);
        return 19968 <= e && e <= 40959 || 13312 <= e && e <= 19903 || 131072 <= e && e <= 173791
    }
    function tn(t) {
        const n = Math.floor(t / K.HOUR);
        t -= n * K.HOUR;
        const e = Math.floor(t / K.MINUTE);
        t -= e * K.MINUTE;
        const i = Math.floor(t / K.SECOND);
        return (n ? `${n}:` : "") + `${nn(e)}:${nn(i)}`
    }
    function nn(t, n=2) {
        let e = String(t);
        for (let t = e.length; t < n; ++t)
            e = "0" + e;
        return e
    }
    function en(t) {
        return (t || "").toUpperCase()
    }
    function rn(t, n, e) {
        return t.replace(new RegExp(n,"g"), e)
    }
    function on(t) {
        return t.replace(/\[(.*)]\((.*)\)/g, '<a href="$2" target="_blank">$1</a>')
    }
    const sn = document
      , un = sn.body;
    function cn(t) {
        return sn.querySelector(t)
    }
    function an(t, n) {
        return t.querySelector(n)
    }
    function ln(t, n) {
        const e = t.querySelectorAll(n);
        return Array.prototype.slice.call(e)
    }
    function fn(t, n, ...e) {
        const i = sn.createElement(t);
        if (n)
            for (const t in n)
                if (n.hasOwnProperty(t)) {
                    const e = n[t];
                    i.setAttribute(t, e)
                }
        return e && e.length > 0 && e.forEach((t => mn(i, t))),
        i
    }
    function hn(t, n) {
        pn(t, "hide", !n)
    }
    function dn(t, n="") {
        null == n ? un.removeAttribute(t) : un.setAttribute(t, n)
    }
    function vn(t, n) {
        pn(un, t, n)
    }
    function pn(t, n, e) {
        t.classList.toggle(n, e)
    }
    function mn(t, n) {
        t.classList.add(n)
    }
    function yn(t, n) {
        t.classList.remove(n)
    }
    function gn(t, n) {
        self.customElements.define(t, n)
    }
    const bn = zt("Toast")
      , wn = {
        CENTER: "center",
        BOTTOM: "bottom"
    }
      , xn = {
        DEFAULT: "default",
        AWESOME: "awesome",
        WARN: "warn",
        ERROR: "error"
    }
      , kn = "yp-toast"
      , Sn = 8 * K.SECOND
      , En = 5 * K.SECOND
      , Tn = Xn();
    let On;
    class Cn {
        static error(t, n) {
            return An(xn.ERROR, wn.BOTTOM, t, n)
        }
        static warn(t, n) {
            return An(xn.WARN, wn.BOTTOM, t, n)
        }
        static awesome(t, n) {
            return An(xn.AWESOME, wn.BOTTOM, t, n)
        }
        static show(t, n) {
            return An(xn.DEFAULT, wn.BOTTOM, t, n)
        }
        static center(t) {
            return An(xn.DEFAULT, wn.CENTER, t)
        }
    }
    async function An(t, n, e, i) {
        bn(e),
        await yt(0),
        an(Tn, ".message").innerHTML = on(e);
        const r = an(Tn, "button[action]");
        i ? (yn(r, "hide"),
        r.textContent = i) : mn(r, "hide"),
        Tn.setAttribute("level", t),
        Tn.setAttribute("position", n),
        mn(Tn, "show");
        const o = new Jt;
        On && On.cancel(),
        On = yt(i ? Sn : En);
        const s = () => {
            u(!1)
        }
        ;
        function u(t) {
            yn(Tn, "show"),
            On && (On.cancel(),
            On = null),
            o.resolve(t),
            document.body.removeEventListener("click", s)
        }
        return document.body.addEventListener("click", s),
        On.then(( () => u(!1))),
        r.onclick = () => u(!0),
        o.promise
    }
    function Xn() {
        let t = cn("#" + kn);
        return t || (t = fn("div", {
            id: kn
        }),
        t.innerHTML = '\n<div class="message"></div>\n<div class="right">\n  <button action></button>\n</div>\n    ',
        document.body.appendChild(t)),
        t
    }
    const In = "account"
      , _n = "api"
      , Mn = "apple"
      , Rn = "artists"
      , Dn = "auto-restore"
      , jn = "award"
      , Bn = "broadcast"
      , Pn = "bustcache"
      , qn = "cap-sessions"
      , $n = "category"
      , Fn = "cdn"
      , Nn = "chat"
      , zn = "chat-bot-vocab"
      , Ln = "chat-bot-vocabs"
      , Gn = "check-order"
      , Un = "check-refund"
      , Hn = "claim-coupon"
      , Vn = "click"
      , Wn = "coins-payable"
      , Jn = "contacts"
      , Kn = "content"
      , Yn = "dories"
      , Qn = "dory"
      , Zn = "draft"
      , te = "drafts"
      , ne = "editor-choice"
      , ee = "favorite"
      , ie = "filled-queries"
      , re = "finance"
      , oe = "history"
      , se = "i"
      , ue = "image"
      , ce = "info"
      , ae = "line-item"
      , le = "line-items"
      , fe = "lock-dory"
      , he = "login-name-exists"
      , de = "media"
      , ve = "membership-plans"
      , pe = "message"
      , me = "messages"
      , ye = "model"
      , ge = "mute"
      , be = "new"
      , we = "payment"
      , xe = "place-order"
      , ke = "play"
      , Se = "playerscore"
      , Ee = "portfolio"
      , Te = "posts"
      , Oe = "product"
      , Ce = "public"
      , Ae = "public-info"
      , Xe = "purchase"
      , Ie = "purchase-details"
      , _e = "purchases"
      , Me = "ranking"
      , Re = "rating"
      , De = "real-id"
      , je = "recommendation"
      , Be = "refund-order"
      , Pe = "report"
      , qe = "request-cell-code"
      , $e = "request-verification-code"
      , Fe = "screenshot"
      , Ne = "search"
      , ze = "sessions"
      , Le = "settings"
      , Ge = "sheet"
      , Ue = "sheet-list"
      , He = "sheets"
      , Ve = "song"
      , We = "submit-draft"
      , Je = "systemmessages"
      , Ke = "tip-off"
      , Ye = "totalscore"
      , Qe = "transaction"
      , Ze = "unlink-draft-dory"
      , ti = "unmute"
      , ni = "user"
      , ei = "user-balance"
      , ii = "users"
      , ri = "vat-records"
      , oi = "view"
      , si = "wx"
      , ui = gi([_n, In, qn])
      , ci = gi([_n, In, qe])
      , ai = gi([_n, In, $e]);
    gi([_n, In, he]),
    gi([_n, In, ze]),
    gi([_n, Nn, Bn]),
    gi([_n, Nn, ue]),
    gi([_n, Nn, pe]),
    gi([_n, Nn, me]),
    gi([_n, Nn, Je]),
    gi([_n, Nn, Jn]);
    const li = gi([_n, Ge])
      , fi = gi([_n, Zn]);
    gi([_n, te]);
    const hi = gi([_n, Ge, Kn]);
    gi([_n, Ze]),
    gi([_n, We]);
    const di = gi([_n, Ge, ee]);
    gi([_n, Ge, Re]);
    const vi = gi([_n, Ge, Le]);
    gi([_n, Ge, je]),
    gi([_n, Ge, ne]),
    gi([_n, Ge, Ce]),
    gi([_n, de]),
    gi([_n, de, ke]),
    gi([_n, Ge, Ke]),
    gi([_n, Ge, Fe]);
    const pi = gi([_n, Ge, oi]);
    gi([_n, Ve, He]),
    gi([_n, ni, _e]),
    gi([_n, ni, He]),
    gi([_n, ni, jn]),
    gi([_n, ni, ce]),
    gi([_n, ni, Ee]),
    gi([_n, ni, Ae]),
    gi([_n, ni, ge]),
    gi([_n, ni, ti]),
    gi([_n, ni, Pe]),
    gi([_n, ni, Ke]),
    gi([_n, we, Mn, Qe]),
    gi([_n, we, Mn, Dn]),
    gi([_n, we, oe]),
    gi([_n, we, Xe]),
    gi([_n, we, ei]),
    gi([_n, we, Ie]),
    gi([_n, we, si, Un]),
    gi([_n, we, si, Be]),
    gi([_n, Oe, Wn]),
    gi([_n, Oe, ve]),
    gi([_n, ni, De]),
    gi([_n, ni]),
    gi([_n, Qn]),
    gi([_n, Yn]),
    gi([_n, fe]),
    gi([_n, Ue]),
    gi([_n, Ue, Ce]),
    gi([_n, He, be]),
    gi([_n, He, $n]),
    gi([_n, Rn]),
    gi([_n, Te, je]),
    gi([_n, Ne, Vn]),
    gi([_n, Ne, He]);
    const mi = gi([_n, Ne, ie]);
    gi([_n, we, Hn]),
    gi([_n, we, si, Gn]),
    gi([_n, we, si, xe]),
    gi([ii, Me, Se]),
    gi([ii, Me, Ye]),
    gi([ii, Me]),
    gi([re, ri]),
    gi([se, Pn]),
    gi([se, zn]),
    gi([se, Ln]),
    gi([se, ae]),
    gi([se, le]),
    gi([se, Fn]),
    gi([se, Ke]),
    gi([se, ye, Ke]);
    const yi = "/start?mode=bind-cell";
    function gi(t) {
        return "/" + t.join("/")
    }
    function bi(t=location.search) {
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
    function wi() {
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
    function xi(t) {
        0 === document.referrer.indexOf(location.origin) ? t ? location = document.referrer : history.back() : location = "/main"
    }
    function ki(t) {
        return Ei(t) ? (Wt.setItem(Ut.MINE_SELECTED_INSTRUMENT, t),
        t) : null
    }
    function Si() {
        let t = bi().instrument || wi().instrument;
        return Ei(t) || (t = Wt.getItem(Ut.MINE_SELECTED_INSTRUMENT)),
        Ei(t) ? t : null
    }
    function Ei(t) {
        return [Z.GUITAR, Z.UKULELE, Z.JIAN, Z.PIANO].includes(t)
    }
    function Ti(t) {
        return t && 24 === t.length
    }
    function Oi({submissionTime: t, reviewTime: n}={}) {
        return t && (n || 0) < t
    }
    function Ci(t, n, e, i=it.TAB, r=ot.STAFF) {
        switch (t) {
        case Z.PIANO:
            return n === Z.PIANO ? r === ot.NUMBER ? st.NUMBERED : st.SCORE : r === ot.NUMBER ? st.NLEAD : st.LEAD;
        case Z.GUITAR:
        case Z.UKULELE:
            return n === Z.PIANO ? st.SCORE : e === et.SOLO || i === it.TAB ? st.TAB : st.NLEAD;
        case Z.JIAN:
            return st.NLEAD;
        default:
            switch (n) {
            case Z.PIANO:
                return st.SCORE;
            case Z.GUITAR:
            case Z.UKULELE:
                return st.TAB;
            default:
                throw new Error("getStaveProfile: Unsupported instrument: " + n)
            }
        }
    }
    function Ai(t) {
        return [st.LEAD, st.NLEAD].includes(t)
    }
    var Xi = function(t, n) {
        return (Xi = Object.setPrototypeOf || {
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
    function Ii(t, n) {
        function e() {
            this.constructor = t
        }
        Xi(t, n),
        t.prototype = null === n ? Object.create(n) : (e.prototype = n.prototype,
        new e)
    }
    var _i = function() {
        return (_i = Object.assign || function(t) {
            for (var n, e = 1, i = arguments.length; e < i; e++)
                for (var r in n = arguments[e])
                    Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r]);
            return t
        }
        ).apply(this, arguments)
    }, Mi, Ri, Di, ji, Bi, Pi;
    function qi(t, n) {
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
    function $i(t) {
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
    function Fi(t, n) {
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
    function Ni() {
        for (var t = [], n = 0; n < arguments.length; n++)
            t = t.concat(Fi(arguments[n]));
        return t
    }
    function zi(t) {
        t.then(null, (function(t) {
            console.error(t)
        }
        ))
    }
    function Li() {
        return "[object process]" === Object.prototype.toString.call("undefined" != typeof process ? process : 0)
    }
    function Gi(t, n) {
        return t.require(n)
    }
    function Ui(t) {
        var n;
        try {
            n = Gi(module, t)
        } catch (t) {}
        try {
            var e = Gi(module, "process").cwd;
            n = Gi(module, e() + "/node_modules/" + t)
        } catch (t) {}
        return n
    }
    !function(t) {
        t.Ok = "ok",
        t.Exited = "exited",
        t.Crashed = "crashed",
        t.Abnormal = "abnormal"
    }(Mi || (Mi = {})),
    function(t) {
        t.Ok = "ok",
        t.Errored = "errored",
        t.Crashed = "crashed"
    }(Ri || (Ri = {})),
    function(t) {
        t.Fatal = "fatal",
        t.Error = "error",
        t.Warning = "warning",
        t.Log = "log",
        t.Info = "info",
        t.Debug = "debug",
        t.Critical = "critical"
    }(Di || (Di = {})),
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
    }(Di || (Di = {})),
    function(t) {
        t.Unknown = "unknown",
        t.Skipped = "skipped",
        t.Success = "success",
        t.RateLimit = "rate_limit",
        t.Invalid = "invalid",
        t.Failed = "failed"
    }(ji || (ji = {})),
    function(t) {
        t.fromHttpCode = function(n) {
            return n >= 200 && n < 300 ? t.Success : 429 === n ? t.RateLimit : n >= 400 && n < 500 ? t.Invalid : n >= 500 ? t.Failed : t.Unknown
        }
    }(ji || (ji = {})),
    function(t) {
        t.Explicit = "explicitly_set",
        t.Sampler = "client_sampler",
        t.Rate = "client_rate",
        t.Inheritance = "inheritance"
    }(Bi || (Bi = {})),
    function(t) {
        t.BeforeSend = "before_send",
        t.EventProcessor = "event_processor",
        t.NetworkError = "network_error",
        t.QueueOverflow = "queue_overflow",
        t.RateLimitBackoff = "ratelimit_backoff",
        t.SampleRate = "sample_rate"
    }(Pi || (Pi = {}));
    var Hi = {};
    function Vi() {
        return Li() ? global : "undefined" != typeof window ? window : "undefined" != typeof self ? self : Hi
    }
    function Wi(t) {
        switch (Object.prototype.toString.call(t)) {
        case "[object Error]":
        case "[object Exception]":
        case "[object DOMException]":
            return !0;
        default:
            return sr(t, Error)
        }
    }
    function Ji(t) {
        return "[object ErrorEvent]" === Object.prototype.toString.call(t)
    }
    function Ki(t) {
        return "[object DOMError]" === Object.prototype.toString.call(t)
    }
    function Yi(t) {
        return "[object DOMException]" === Object.prototype.toString.call(t)
    }
    function Qi(t) {
        return "[object String]" === Object.prototype.toString.call(t)
    }
    function Zi(t) {
        return null === t || "object" != typeof t && "function" != typeof t
    }
    function tr(t) {
        return "[object Object]" === Object.prototype.toString.call(t)
    }
    function nr(t) {
        return "undefined" != typeof Event && sr(t, Event)
    }
    function er(t) {
        return "undefined" != typeof Element && sr(t, Element)
    }
    function ir(t) {
        return "[object RegExp]" === Object.prototype.toString.call(t)
    }
    function rr(t) {
        return Boolean(t && t.then && "function" == typeof t.then)
    }
    function or(t) {
        return tr(t) && "nativeEvent"in t && "preventDefault"in t && "stopPropagation"in t
    }
    function sr(t, n) {
        try {
            return t instanceof n
        } catch (t) {
            return !1
        }
    }
    function ur(t, n) {
        try {
            for (var e = t, i = [], r = 0, o = 0, s = " > ".length, u = void 0; e && r++ < 5 && !("html" === (u = cr(e, n)) || r > 1 && o + i.length * s + u.length >= 80); )
                i.push(u),
                o += u.length,
                e = e.parentNode;
            return i.reverse().join(" > ")
        } catch (t) {
            return "<unknown>"
        }
    }
    function cr(t, n) {
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
        (r = a.className) && Qi(r))
            for (o = r.split(/\s+/),
            c = 0; c < o.length; c++)
                l.push("." + o[c]);
        var h = ["type", "name", "title", "alt"];
        for (c = 0; c < h.length; c++)
            s = h[c],
            (u = a.getAttribute(s)) && l.push("[" + s + '="' + u + '"]');
        return l.join("")
    }
    function ar() {
        var t = Vi();
        try {
            return t.document.location.href
        } catch (t) {
            return ""
        }
    }
    var lr = Object.setPrototypeOf || ({
        __proto__: []
    }instanceof Array ? fr : hr);
    function fr(t, n) {
        return t.__proto__ = n,
        t
    }
    function hr(t, n) {
        for (var e in n)
            Object.prototype.hasOwnProperty.call(t, e) || (t[e] = n[e]);
        return t
    }
    var dr = function(t) {
        function n(n) {
            var e = this.constructor
              , i = t.call(this, n) || this;
            return i.message = n,
            i.name = e.prototype.constructor.name,
            lr(i, e.prototype),
            i
        }
        return Ii(n, t),
        n
    }(Error)
      , vr = /^(?:(\w+):)\/\/(?:(\w+)(?::(\w+))?@)([\w.-]+)(?::(\d+))?\/(.+)/
      , pr = "Invalid Dsn"
      , mr = function() {
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
            var n = vr.exec(t);
            if (!n)
                throw new dr(pr);
            var e = Fi(n.slice(1), 6)
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
                    throw new dr(pr + ": " + n + " missing")
            }
            )),
            !this.projectId.match(/^\d+$/))
                throw new dr(pr + ": Invalid projectId " + this.projectId);
            if ("http" !== this.protocol && "https" !== this.protocol)
                throw new dr(pr + ": Invalid protocol " + this.protocol);
            if (this.port && isNaN(parseInt(this.port, 10)))
                throw new dr(pr + ": Invalid port " + this.port)
        }
        ,
        t
    }()
      , yr = Vi()
      , gr = "Sentry Logger ";
    function br(t) {
        var n = Vi();
        if (!("console"in n))
            return t();
        var e = n.console
          , i = {};
        ["debug", "info", "warn", "error", "log", "assert"].forEach((function(t) {
            t in n.console && e[t].k && (i[t] = e[t],
            e[t] = e[t].k)
        }
        ));
        var r = t();
        return Object.keys(i).forEach((function(t) {
            e[t] = i[t]
        }
        )),
        r
    }
    var wr = function() {
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
            this._enabled && br((function() {
                yr.console.log(gr + "[Log]: " + t.join(" "))
            }
            ))
        }
        ,
        t.prototype.warn = function() {
            for (var t = [], n = 0; n < arguments.length; n++)
                t[n] = arguments[n];
            this._enabled && br((function() {
                yr.console.warn(gr + "[Warn]: " + t.join(" "))
            }
            ))
        }
        ,
        t.prototype.error = function() {
            for (var t = [], n = 0; n < arguments.length; n++)
                t[n] = arguments[n];
            this._enabled && br((function() {
                yr.console.error(gr + "[Error]: " + t.join(" "))
            }
            ))
        }
        ,
        t
    }();
    yr.T = yr.T || {};
    var xr = yr.T.logger || (yr.T.logger = new wr)
      , kr = function() {
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
      , Sr = "<anonymous>";
    function Er(t) {
        try {
            return t && "function" == typeof t && t.name || Sr
        } catch (t) {
            return Sr
        }
    }
    function Tr(t, n) {
        return void 0 === n && (n = 0),
        "string" != typeof t || 0 === n || t.length <= n ? t : t.substr(0, n) + "..."
    }
    function Or(t, n) {
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
    function Cr(t, n) {
        return !!Qi(t) && (ir(n) ? n.test(t) : "string" == typeof n && -1 !== t.indexOf(n))
    }
    function Ar(t, n, e) {
        if (n in t) {
            var i = t[n]
              , r = e(i);
            if ("function" == typeof r)
                try {
                    r.prototype = r.prototype || {},
                    Object.defineProperties(r, {
                        k: {
                            enumerable: !1,
                            value: i
                        }
                    })
                } catch (t) {}
            t[n] = r
        }
    }
    function Xr(t) {
        return Object.keys(t).map((function(n) {
            return encodeURIComponent(n) + "=" + encodeURIComponent(t[n])
        }
        )).join("&")
    }
    function Ir(t) {
        if (Wi(t)) {
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
        if (nr(t)) {
            var r = t
              , o = {};
            o.type = r.type;
            try {
                o.target = er(r.target) ? ur(r.target) : Object.prototype.toString.call(r.target)
            } catch (t) {
                o.target = "<unknown>"
            }
            try {
                o.currentTarget = er(r.currentTarget) ? ur(r.currentTarget) : Object.prototype.toString.call(r.currentTarget)
            } catch (t) {
                o.currentTarget = "<unknown>"
            }
            for (var s in "undefined" != typeof CustomEvent && sr(t, CustomEvent) && (o.detail = r.detail),
            r)
                Object.prototype.hasOwnProperty.call(r, s) && (o[s] = r[s]);
            return o
        }
        return t
    }
    function _r(t) {
        return ~-encodeURI(t).split(/%..|./).length
    }
    function Mr(t) {
        return _r(JSON.stringify(t))
    }
    function Rr(t, n, e) {
        void 0 === n && (n = 3),
        void 0 === e && (e = 102400);
        var i = Pr(t, n);
        return Mr(i) > e ? Rr(t, n - 1, e) : i
    }
    function Dr(t) {
        var n = Object.prototype.toString.call(t);
        if ("string" == typeof t)
            return t;
        if ("[object Object]" === n)
            return "[Object]";
        if ("[object Array]" === n)
            return "[Array]";
        var e = jr(t);
        return Zi(e) ? e : n
    }
    function jr(t, n) {
        return "domain" === n && t && "object" == typeof t && t._events ? "[Domain]" : "domainEmitter" === n ? "[DomainEmitter]" : "undefined" != typeof global && t === global ? "[Global]" : "undefined" != typeof window && t === window ? "[Window]" : "undefined" != typeof document && t === document ? "[Document]" : or(t) ? "[SyntheticEvent]" : "number" == typeof t && t != t ? "[NaN]" : void 0 === t ? "[undefined]" : "function" == typeof t ? "[Function: " + Er(t) + "]" : "symbol" == typeof t ? "[" + String(t) + "]" : "bigint" == typeof t ? "[BigInt: " + String(t) + "]" : t
    }
    function Br(t, n, e, i) {
        if (void 0 === e && (e = 1 / 0),
        void 0 === i && (i = new kr),
        0 === e)
            return Dr(n);
        if (null != n && "function" == typeof n.toJSON)
            return n.toJSON();
        var r = jr(n, t);
        if (Zi(r))
            return r;
        var o = Ir(n)
          , s = Array.isArray(n) ? [] : {};
        if (i.memoize(n))
            return "[Circular ~]";
        for (var u in o)
            Object.prototype.hasOwnProperty.call(o, u) && (s[u] = Br(u, o[u], e - 1, i));
        return i.unmemoize(n),
        s
    }
    function Pr(t, n) {
        try {
            return JSON.parse(JSON.stringify(t, (function(t, e) {
                return Br(t, e, n)
            }
            )))
        } catch (t) {
            return "**non-serializable**"
        }
    }
    function qr(t, n) {
        void 0 === n && (n = 40);
        var e = Object.keys(Ir(t));
        if (e.sort(),
        !e.length)
            return "[object has no keys]";
        if (e[0].length >= n)
            return Tr(e[0], n);
        for (var i = e.length; i > 0; i--) {
            var r = e.slice(0, i).join(", ");
            if (!(r.length > n))
                return i === e.length ? r : Tr(r, n)
        }
        return ""
    }
    function $r(t) {
        var n, e;
        if (tr(t)) {
            var i = t
              , r = {};
            try {
                for (var o = $i(Object.keys(i)), s = o.next(); !s.done; s = o.next()) {
                    var u = s.value;
                    void 0 !== i[u] && (r[u] = $r(i[u]))
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
        return Array.isArray(t) ? t.map($r) : t
    }
    function Fr() {
        if (!("fetch"in Vi()))
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
    function Nr(t) {
        return t && /^function fetch\(\)\s+\{\s+\[native code\]\s+\}$/.test(t.toString())
    }
    function zr() {
        if (!Fr())
            return !1;
        var t = Vi();
        if (Nr(t.fetch))
            return !0;
        var n = !1
          , e = t.document;
        if (e && "function" == typeof e.createElement)
            try {
                var i = e.createElement("iframe");
                i.hidden = !0,
                e.head.appendChild(i),
                i.contentWindow && i.contentWindow.fetch && (n = Nr(i.contentWindow.fetch)),
                e.head.removeChild(i)
            } catch (t) {
                xr.warn("Could not create sandbox iframe for pure fetch check, bailing to window.fetch: ", t)
            }
        return n
    }
    function Lr() {
        if (!Fr())
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
    function Gr() {
        var t = Vi()
          , n = t.chrome
          , e = n && n.app && n.app.runtime
          , i = "history"in t && !!t.history.pushState && !!t.history.replaceState;
        return !e && i
    }
    var Ur = Vi(), Hr = {}, Vr = {}, Wr;
    function Jr(t) {
        if (!Vr[t])
            switch (Vr[t] = !0,
            t) {
            case "console":
                Qr();
                break;
            case "dom":
                lo();
                break;
            case "xhr":
                eo();
                break;
            case "fetch":
                Zr();
                break;
            case "history":
                io();
                break;
            case "error":
                ho();
                break;
            case "unhandledrejection":
                po();
                break;
            default:
                xr.warn("unknown instrumentation type:", t)
            }
    }
    function Kr(t) {
        t && "string" == typeof t.type && "function" == typeof t.callback && (Hr[t.type] = Hr[t.type] || [],
        Hr[t.type].push(t.callback),
        Jr(t.type))
    }
    function Yr(t, n) {
        var e, i;
        if (t && Hr[t])
            try {
                for (var r = $i(Hr[t] || []), o = r.next(); !o.done; o = r.next()) {
                    var s = o.value;
                    try {
                        s(n)
                    } catch (n) {
                        xr.error("Error while triggering instrumentation handler.\nType: " + t + "\nName: " + Er(s) + "\nError: " + n)
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
    function Qr() {
        "console"in Ur && ["debug", "info", "warn", "error", "log", "assert"].forEach((function(t) {
            t in Ur.console && Ar(Ur.console, t, (function(n) {
                return function() {
                    for (var e = [], i = 0; i < arguments.length; i++)
                        e[i] = arguments[i];
                    Yr("console", {
                        args: e,
                        level: t
                    }),
                    n && Function.prototype.apply.call(n, Ur.console, e)
                }
            }
            ))
        }
        ))
    }
    function Zr() {
        zr() && Ar(Ur, "fetch", (function(t) {
            return function() {
                for (var n = [], e = 0; e < arguments.length; e++)
                    n[e] = arguments[e];
                var i = {
                    args: n,
                    fetchData: {
                        method: to(n),
                        url: no(n)
                    },
                    startTimestamp: Date.now()
                };
                return Yr("fetch", _i({}, i)),
                t.apply(Ur, n).then((function(t) {
                    return Yr("fetch", _i(_i({}, i), {
                        endTimestamp: Date.now(),
                        response: t
                    })),
                    t
                }
                ), (function(t) {
                    throw Yr("fetch", _i(_i({}, i), {
                        endTimestamp: Date.now(),
                        error: t
                    })),
                    t
                }
                ))
            }
        }
        ))
    }
    function to(t) {
        return void 0 === t && (t = []),
        "Request"in Ur && sr(t[0], Request) && t[0].method ? String(t[0].method).toUpperCase() : t[1] && t[1].method ? String(t[1].method).toUpperCase() : "GET"
    }
    function no(t) {
        return void 0 === t && (t = []),
        "string" == typeof t[0] ? t[0] : "Request"in Ur && sr(t[0], Request) ? t[0].url : String(t[0])
    }
    function eo() {
        if ("XMLHttpRequest"in Ur) {
            var t = []
              , n = []
              , e = XMLHttpRequest.prototype;
            Ar(e, "open", (function(e) {
                return function() {
                    for (var i = [], r = 0; r < arguments.length; r++)
                        i[r] = arguments[r];
                    var o = this
                      , s = i[1];
                    o.O = {
                        method: Qi(i[0]) ? i[0].toUpperCase() : i[0],
                        url: i[1]
                    },
                    Qi(s) && "POST" === o.O.method && s.match(/sentry_key/) && (o.C = !0);
                    var u = function() {
                        if (4 === o.readyState) {
                            try {
                                o.O && (o.O.status_code = o.status)
                            } catch (t) {}
                            try {
                                var e = t.indexOf(o);
                                if (-1 !== e) {
                                    t.splice(e);
                                    var r = n.splice(e)[0];
                                    o.O && void 0 !== r[0] && (o.O.body = r[0])
                                }
                            } catch (t) {}
                            Yr("xhr", {
                                args: i,
                                endTimestamp: Date.now(),
                                startTimestamp: Date.now(),
                                xhr: o
                            })
                        }
                    };
                    return "onreadystatechange"in o && "function" == typeof o.onreadystatechange ? Ar(o, "onreadystatechange", (function(t) {
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
            Ar(e, "send", (function(e) {
                return function() {
                    for (var i = [], r = 0; r < arguments.length; r++)
                        i[r] = arguments[r];
                    return t.push(this),
                    n.push(i),
                    Yr("xhr", {
                        args: i,
                        startTimestamp: Date.now(),
                        xhr: this
                    }),
                    e.apply(this, i)
                }
            }
            ))
        }
    }
    function io() {
        if (Gr()) {
            var t = Ur.onpopstate;
            Ur.onpopstate = function() {
                for (var n = [], e = 0; e < arguments.length; e++)
                    n[e] = arguments[e];
                var i = Ur.location.href
                  , r = Wr;
                if (Wr = i,
                Yr("history", {
                    from: r,
                    to: i
                }),
                t)
                    try {
                        return t.apply(this, n)
                    } catch (t) {}
            }
            ,
            Ar(Ur.history, "pushState", n),
            Ar(Ur.history, "replaceState", n)
        }
        function n(t) {
            return function() {
                for (var n = [], e = 0; e < arguments.length; e++)
                    n[e] = arguments[e];
                var i = n.length > 2 ? n[2] : void 0;
                if (i) {
                    var r = Wr
                      , o = String(i);
                    Wr = o,
                    Yr("history", {
                        from: r,
                        to: o
                    })
                }
                return t.apply(this, n)
            }
        }
    }
    var ro = 1e3, oo, so;
    function uo(t, n) {
        if (!t)
            return !0;
        if (t.type !== n.type)
            return !0;
        try {
            if (t.target !== n.target)
                return !0
        } catch (t) {}
        return !1
    }
    function co(t) {
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
    }
    function ao(t, n) {
        return void 0 === n && (n = !1),
        function(e) {
            if (e && so !== e && !co(e)) {
                var i = "keypress" === e.type ? "input" : e.type;
                (void 0 === oo || uo(so, e)) && (t({
                    event: e,
                    name: i,
                    global: n
                }),
                so = e),
                clearTimeout(oo),
                oo = Ur.setTimeout((function() {
                    oo = void 0
                }
                ), ro)
            }
        }
    }
    function lo() {
        if ("document"in Ur) {
            var t = Yr.bind(null, "dom")
              , n = ao(t, !0);
            Ur.document.addEventListener("click", n, !1),
            Ur.document.addEventListener("keypress", n, !1),
            ["EventTarget", "Node"].forEach((function(n) {
                var e = Ur[n] && Ur[n].prototype;
                e && e.hasOwnProperty && e.hasOwnProperty("addEventListener") && (Ar(e, "addEventListener", (function(n) {
                    return function(e, i, r) {
                        if ("click" === e || "keypress" == e)
                            try {
                                var o = this.A = this.A || {}
                                  , s = o[e] = o[e] || {
                                    refCount: 0
                                };
                                if (!s.handler) {
                                    var u = ao(t);
                                    s.handler = u,
                                    n.call(this, e, u, r)
                                }
                                s.refCount += 1
                            } catch (t) {}
                        return n.call(this, e, i, r)
                    }
                }
                )),
                Ar(e, "removeEventListener", (function(t) {
                    return function(n, e, i) {
                        if ("click" === n || "keypress" == n)
                            try {
                                var r = this.A || {}
                                  , o = r[n];
                                o && (o.refCount -= 1,
                                o.refCount <= 0 && (t.call(this, n, o.handler, i),
                                o.handler = void 0,
                                delete r[n]),
                                0 === Object.keys(r).length && delete this.A)
                            } catch (t) {}
                        return t.call(this, n, e, i)
                    }
                }
                )))
            }
            ))
        }
    }
    var fo = null;
    function ho() {
        fo = Ur.onerror,
        Ur.onerror = function(t, n, e, i, r) {
            return Yr("error", {
                column: i,
                error: r,
                line: e,
                msg: t,
                url: n
            }),
            !!fo && fo.apply(this, arguments)
        }
    }
    var vo = null;
    function po() {
        vo = Ur.onunhandledrejection,
        Ur.onunhandledrejection = function(t) {
            return Yr("unhandledrejection", t),
            !vo || vo.apply(this, arguments)
        }
    }
    function mo() {
        var t = Vi()
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
    function yo(t) {
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
    function go(t) {
        if (t.message)
            return t.message;
        if (t.exception && t.exception.values && t.exception.values[0]) {
            var n = t.exception.values[0];
            return n.type && n.value ? n.type + ": " + n.value : n.type || n.value || t.event_id || "<unknown>"
        }
        return t.event_id || "<unknown>"
    }
    function bo(t, n, e) {
        t.exception = t.exception || {},
        t.exception.values = t.exception.values || [],
        t.exception.values[0] = t.exception.values[0] || {},
        t.exception.values[0].value = t.exception.values[0].value || n || "",
        t.exception.values[0].type = t.exception.values[0].type || e || "Error"
    }
    function wo(t, n) {
        var e;
        if (t.exception && t.exception.values) {
            var i = t.exception.values[0]
              , r = i.mechanism;
            if (i.mechanism = _i(_i(_i({}, {
                type: "generic",
                handled: !0
            }), r), n),
            n && "data"in n) {
                var o = _i(_i({}, null === (e = r) || void 0 === e ? void 0 : e.data), n.data);
                i.mechanism.data = o
            }
        }
    }
    var xo = 6e4, ko;
    function So(t, n) {
        if (!n)
            return xo;
        var e = parseInt("" + n, 10);
        if (!isNaN(e))
            return 1e3 * e;
        var i = Date.parse("" + n);
        return isNaN(i) ? xo : i - t
    }
    function Eo(t) {
        var n;
        if (null === (n = t) || void 0 === n ? void 0 : n.X)
            return !0;
        try {
            Object.defineProperty(t, "X", {
                value: !0
            })
        } catch (t) {}
        return !1
    }
    !function(t) {
        t.PENDING = "PENDING",
        t.RESOLVED = "RESOLVED",
        t.REJECTED = "REJECTED"
    }(ko || (ko = {}));
    var To = function() {
        function t(t) {
            var n = this;
            this._state = ko.PENDING,
            this._handlers = [],
            this._resolve = function(t) {
                n._setResult(ko.RESOLVED, t)
            }
            ,
            this._reject = function(t) {
                n._setResult(ko.REJECTED, t)
            }
            ,
            this._setResult = function(t, e) {
                n._state === ko.PENDING && (rr(e) ? e.then(n._resolve, n._reject) : (n._state = t,
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
                if (n._state !== ko.PENDING) {
                    var t = n._handlers.slice();
                    n._handlers = [],
                    t.forEach((function(t) {
                        t.done || (n._state === ko.RESOLVED && t.onfulfilled && t.onfulfilled(n._value),
                        n._state === ko.REJECTED && t.onrejected && t.onrejected(n._value),
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
      , Oo = function() {
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
                return To.reject(new dr("Not adding Promise due to buffer limit reached."));
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
            return new To((function(e) {
                var i = setTimeout((function() {
                    t && t > 0 && e(!1)
                }
                ), t);
                To.all(n._buffer).then((function() {
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
      , Co = {
        nowSeconds: function() {
            return Date.now() / 1e3
        }
    };
    function Ao() {
        var t = Vi().performance;
        if (t && t.now)
            return {
                now: function() {
                    return t.now()
                },
                timeOrigin: Date.now() - t.now()
            }
    }
    function Xo() {
        try {
            return Gi(module, "perf_hooks").performance
        } catch (t) {
            return
        }
    }
    var Io = Li() ? Xo() : Ao()
      , _o = void 0 === Io ? Co : {
        nowSeconds: function() {
            return (Io.timeOrigin + Io.now()) / 1e3
        }
    }
      , Mo = Co.nowSeconds.bind(Co)
      , Ro = _o.nowSeconds.bind(_o)
      , Do = Ro
      , jo = function() {
        var t = Vi().performance;
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
      , Bo = 100
      , Po = function() {
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
            return n && (e._breadcrumbs = Ni(n._breadcrumbs),
            e._tags = _i({}, n._tags),
            e._extra = _i({}, n._extra),
            e._contexts = _i({}, n._contexts),
            e._user = n._user,
            e._level = n._level,
            e._span = n._span,
            e._session = n._session,
            e._transactionName = n._transactionName,
            e._fingerprint = n._fingerprint,
            e._eventProcessors = Ni(n._eventProcessors),
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
            return this._tags = _i(_i({}, this._tags), t),
            this._notifyScopeListeners(),
            this
        }
        ,
        t.prototype.setTag = function(t, n) {
            var e;
            return this._tags = _i(_i({}, this._tags), ((e = {})[t] = n,
            e)),
            this._notifyScopeListeners(),
            this
        }
        ,
        t.prototype.setExtras = function(t) {
            return this._extra = _i(_i({}, this._extra), t),
            this._notifyScopeListeners(),
            this
        }
        ,
        t.prototype.setExtra = function(t, n) {
            var e;
            return this._extra = _i(_i({}, this._extra), ((e = {})[t] = n,
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
            return null === n ? delete this._contexts[t] : this._contexts = _i(_i({}, this._contexts), ((e = {})[t] = n,
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
            return n instanceof t ? (this._tags = _i(_i({}, this._tags), n._tags),
            this._extra = _i(_i({}, this._extra), n._extra),
            this._contexts = _i(_i({}, this._contexts), n._contexts),
            n._user && Object.keys(n._user).length && (this._user = n._user),
            n._level && (this._level = n._level),
            n._fingerprint && (this._fingerprint = n._fingerprint),
            n._requestSession && (this._requestSession = n._requestSession)) : tr(n) && (n = n,
            this._tags = _i(_i({}, this._tags), n.tags),
            this._extra = _i(_i({}, this._extra), n.extra),
            this._contexts = _i(_i({}, this._contexts), n.contexts),
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
            var e = "number" == typeof n ? Math.min(n, Bo) : Bo;
            if (e <= 0)
                return this;
            var i = _i({
                timestamp: Mo()
            }, t);
            return this._breadcrumbs = Ni(this._breadcrumbs, [i]).slice(-e),
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
            if (this._extra && Object.keys(this._extra).length && (t.extra = _i(_i({}, this._extra), t.extra)),
            this._tags && Object.keys(this._tags).length && (t.tags = _i(_i({}, this._tags), t.tags)),
            this._user && Object.keys(this._user).length && (t.user = _i(_i({}, this._user), t.user)),
            this._contexts && Object.keys(this._contexts).length && (t.contexts = _i(_i({}, this._contexts), t.contexts)),
            this._level && (t.level = this._level),
            this._transactionName && (t.transaction = this._transactionName),
            this._span) {
                t.contexts = _i({
                    trace: this._span.getTraceContext()
                }, t.contexts);
                var i = null === (e = this._span.transaction) || void 0 === e ? void 0 : e.name;
                i && (t.tags = _i({
                    transaction: i
                }, t.tags))
            }
            return this._applyFingerprint(t),
            t.breadcrumbs = Ni(t.breadcrumbs || [], this._breadcrumbs),
            t.breadcrumbs = t.breadcrumbs.length > 0 ? t.breadcrumbs : void 0,
            this._notifyEventProcessors(Ni(qo(), this._eventProcessors), t, n)
        }
        ,
        t.prototype._notifyEventProcessors = function(t, n, e, i) {
            var r = this;
            return void 0 === i && (i = 0),
            new To((function(o, s) {
                var u = t[i];
                if (null === n || "function" != typeof u)
                    o(n);
                else {
                    var c = u(_i({}, n), e);
                    rr(c) ? c.then((function(n) {
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
    function qo() {
        var t = Vi();
        return t.T = t.T || {},
        t.T.globalEventProcessors = t.T.globalEventProcessors || [],
        t.T.globalEventProcessors
    }
    function $o(t) {
        qo().push(t)
    }
    var Fo = function() {
        function t(t) {
            this.errors = 0,
            this.sid = mo(),
            this.duration = 0,
            this.status = Mi.Ok,
            this.init = !0,
            this.ignoreDuration = !1;
            var n = Ro();
            this.timestamp = n,
            this.started = n,
            t && this.update(t)
        }
        return t.prototype.update = function(t) {
            if (void 0 === t && (t = {}),
            t.user && (!this.ipAddress && t.user.ip_address && (this.ipAddress = t.user.ip_address),
            this.did || t.did || (this.did = t.user.id || t.user.email || t.user.username)),
            this.timestamp = t.timestamp || Ro(),
            t.ignoreDuration && (this.ignoreDuration = t.ignoreDuration),
            t.sid && (this.sid = 32 === t.sid.length ? t.sid : mo()),
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
            }) : this.status === Mi.Ok ? this.update({
                status: Mi.Exited
            }) : this.update()
        }
        ,
        t.prototype.toJSON = function() {
            return $r({
                sid: "" + this.sid,
                init: this.init,
                started: new Date(1e3 * this.started).toISOString(),
                timestamp: new Date(1e3 * this.timestamp).toISOString(),
                status: this.status,
                errors: this.errors,
                did: "number" == typeof this.did || "string" == typeof this.did ? "" + this.did : void 0,
                duration: this.duration,
                attrs: $r({
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
      , No = 4
      , zo = 100
      , Lo = function() {
        function t(t, n, e) {
            void 0 === n && (n = new Po),
            void 0 === e && (e = No),
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
            var t = Po.clone(this.getScope());
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
            var e = this._lastEventId = mo()
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
            return this._invokeClient("captureException", t, _i(_i({}, i), {
                event_id: e
            })),
            e
        }
        ,
        t.prototype.captureMessage = function(t, n, e) {
            var i = this._lastEventId = mo()
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
            return this._invokeClient("captureMessage", t, n, _i(_i({}, r), {
                event_id: i
            })),
            i
        }
        ,
        t.prototype.captureEvent = function(t, n) {
            var e = mo();
            return "transaction" !== t.type && (this._lastEventId = e),
            this._invokeClient("captureEvent", t, _i(_i({}, n), {
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
                  , a = void 0 === c ? zo : c;
                if (!(a <= 0)) {
                    var l = Mo()
                      , f = _i({
                        timestamp: l
                    }, t)
                      , h = u ? br((function() {
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
            var n = Uo(this);
            try {
                t(this)
            } finally {
                Uo(n)
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
                return xr.warn("Cannot retrieve integration " + t.id + " from the current Hub"),
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
              , u = (Vi().navigator || {}).userAgent
              , c = new Fo(_i(_i(_i({
                release: o,
                environment: s
            }, e && {
                user: e.getUser()
            }), u && {
                userAgent: u
            }), t));
            if (e) {
                var a = e.getSession && e.getSession();
                a && a.status === Mi.Ok && a.update({
                    status: Mi.Exited
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
            s && s[t] && (n = s)[t].apply(n, Ni(e, [o]))
        }
        ,
        t.prototype._callExtensionMethod = function(t) {
            for (var n = [], e = 1; e < arguments.length; e++)
                n[e - 1] = arguments[e];
            var i = Go()
              , r = i.T;
            if (r && r.extensions && "function" == typeof r.extensions[t])
                return r.extensions[t].apply(this, n);
            xr.warn("Extension method " + t + " couldn't be found, doing nothing.")
        }
        ,
        t
    }();
    function Go() {
        var t = Vi();
        return t.T = t.T || {
            extensions: {},
            hub: void 0
        },
        t
    }
    function Uo(t) {
        var n = Go()
          , e = Jo(n);
        return Ko(n, t),
        e
    }
    function Ho() {
        var t = Go();
        return Wo(t) && !Jo(t).isOlderThan(No) || Ko(t, new Lo),
        Li() ? Vo(t) : Jo(t)
    }
    function Vo(t) {
        var n, e, i;
        try {
            var r = null === (i = null === (e = null === (n = Go().T) || void 0 === n ? void 0 : n.extensions) || void 0 === e ? void 0 : e.domain) || void 0 === i ? void 0 : i.active;
            if (!r)
                return Jo(t);
            if (!Wo(r) || Jo(r).isOlderThan(No)) {
                var o = Jo(t).getStackTop();
                Ko(r, new Lo(o.client,Po.clone(o.scope)))
            }
            return Jo(r)
        } catch (n) {
            return Jo(t)
        }
    }
    function Wo(t) {
        return !!(t && t.T && t.T.hub)
    }
    function Jo(t) {
        return t && t.T && t.T.hub || (t.T = t.T || {},
        t.T.hub = new Lo),
        t.T.hub
    }
    function Ko(t, n) {
        return !!t && (t.T = t.T || {},
        t.T.hub = n,
        !0)
    }
    function Yo(t) {
        for (var n = [], e = 1; e < arguments.length; e++)
            n[e - 1] = arguments[e];
        var i = Ho();
        if (i && i[t])
            return i[t].apply(i, Ni(n));
        throw new Error("No hub defined or " + t + " was not found on the hub, please open a bug report.")
    }
    function Qo(t, n) {
        var e;
        try {
            throw new Error("Sentry syntheticException")
        } catch (t) {
            e = t
        }
        return Yo("captureException", t, {
            captureContext: n,
            originalException: t,
            syntheticException: e
        })
    }
    function Zo(t) {
        Yo("withScope", t)
    }
    var ts = "7"
      , ns = function() {
        function t(t, n, e) {
            void 0 === n && (n = {}),
            this.dsn = t,
            this._dsnObject = new mr(t),
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
              , i = ["Sentry sentry_version=" + ts];
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
            return Xr({
                sentry_key: this.getDsn().publicKey,
                sentry_version: ts
            })
        }
        ,
        t
    }()
      , es = [];
    function is(t) {
        return t.reduce((function(t, n) {
            return t.every((function(t) {
                return n.name !== t.name
            }
            )) && t.push(n),
            t
        }
        ), [])
    }
    function rs(t) {
        var n = t.defaultIntegrations && Ni(t.defaultIntegrations) || []
          , e = t.integrations
          , i = Ni(is(n));
        Array.isArray(e) ? i = Ni(i.filter((function(t) {
            return e.every((function(n) {
                return n.name !== t.name
            }
            ))
        }
        )), is(e)) : "function" == typeof e && (i = e(i),
        i = Array.isArray(i) ? i : [i]);
        var r = i.map((function(t) {
            return t.name
        }
        ))
          , o = "Debug";
        return -1 !== r.indexOf(o) && i.push.apply(i, Ni(i.splice(r.indexOf(o), 1))),
        i
    }
    function os(t) {
        -1 === es.indexOf(t.name) && (t.setupOnce($o, Ho),
        es.push(t.name),
        xr.log("Integration installed: " + t.name))
    }
    function ss(t) {
        var n = {};
        return rs(t).forEach((function(t) {
            n[t.name] = t,
            os(t)
        }
        )),
        Object.defineProperty(n, "initialized", {
            value: !0
        }),
        n
    }
    var us = "Not capturing exception because it's already been captured."
      , cs = function() {
        function t(t, n) {
            this._integrations = {},
            this._numProcessing = 0,
            this._backend = new t(n),
            this._options = n,
            n.dsn && (this._dsn = new mr(n.dsn))
        }
        return t.prototype.captureException = function(t, n, e) {
            var i = this;
            if (!Eo(t)) {
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
            xr.log(us)
        }
        ,
        t.prototype.captureMessage = function(t, n, e, i) {
            var r = this
              , o = e && e.event_id
              , s = Zi(t) ? this._getBackend().eventFromMessage(String(t), n, e) : this._getBackend().eventFromException(t, e);
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
            if (!(null === (i = n) || void 0 === i ? void 0 : i.originalException) || !Eo(n.originalException)) {
                var r = n && n.event_id;
                return this._process(this._captureEvent(t, n, e).then((function(t) {
                    r = t
                }
                ))),
                r
            }
            xr.log(us)
        }
        ,
        t.prototype.captureSession = function(t) {
            this._isEnabled() ? "string" != typeof t.release ? xr.warn("Discarded session because of missing or non-string release") : (this._sendSession(t),
            t.update({
                init: !1
            })) : xr.warn("SDK not enabled, will not capture session.")
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
            this._isEnabled() && !this._integrations.initialized && (this._integrations = ss(this._options))
        }
        ,
        t.prototype.getIntegration = function(t) {
            try {
                return this._integrations[t.id] || null
            } catch (n) {
                return xr.warn("Cannot retrieve integration " + t.id + " from the current Client"),
                null
            }
        }
        ,
        t.prototype._updateSessionFromEvent = function(t, n) {
            var e, i, r = !1, o = !1, s = n.exception && n.exception.values;
            if (s) {
                o = !0;
                try {
                    for (var u = $i(s), c = u.next(); !c.done; c = u.next()) {
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
            var l = t.status === Mi.Ok;
            (l && 0 === t.errors || l && r) && (t.update(_i(_i({}, r && {
                status: Mi.Crashed
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
            return new To((function(e) {
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
              , s = _i(_i({}, t), {
                event_id: t.event_id || (e && e.event_id ? e.event_id : mo()),
                timestamp: t.timestamp || Mo()
            });
            this._applyClientOptions(s),
            this._applyIntegrationsMetadata(s);
            var u = n;
            e && e.captureContext && (u = Po.clone(u).update(e.captureContext));
            var c = To.resolve(s);
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
            var e = _i(_i(_i(_i(_i({}, t), t.breadcrumbs && {
                breadcrumbs: t.breadcrumbs.map((function(t) {
                    return _i(_i({}, t), t.data && {
                        data: Pr(t.data, n)
                    })
                }
                ))
            }), t.user && {
                user: Pr(t.user, n)
            }), t.contexts && {
                contexts: Pr(t.contexts, n)
            }), t.extra && {
                extra: Pr(t.extra, n)
            });
            t.contexts && t.contexts.trace && (e.contexts.trace = t.contexts.trace);
            var i = this.getOptions()._experiments;
            return (void 0 === i ? {} : i).ensureNoCircularStructures ? Pr(e) : e
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
            t.message && (t.message = Tr(t.message, s));
            var u = t.exception && t.exception.values && t.exception.values[0];
            u && u.value && (u.value = Tr(u.value, s));
            var c = t.request;
            c && c.url && (c.url = Tr(c.url, s))
        }
        ,
        t.prototype._applyIntegrationsMetadata = function(t) {
            var n = Object.keys(this._integrations);
            n.length > 0 && (t.sdk = t.sdk || {},
            t.sdk.integrations = Ni(t.sdk.integrations || [], n))
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
                xr.error(t)
            }
            ))
        }
        ,
        t.prototype._processEvent = function(t, n, e) {
            var i, r, o = this, s = this.getOptions(), u = s.beforeSend, c = s.sampleRate, a = this.getTransport();
            if (!this._isEnabled())
                return To.reject(new dr("SDK not enabled, will not capture event."));
            var l = "transaction" === t.type;
            return !l && "number" == typeof c && Math.random() > c ? (null === (r = (i = a).recordLostEvent) || void 0 === r || r.call(i, Pi.SampleRate, "event"),
            To.reject(new dr("Discarding event because it's not included in the random sample (sampling rate = " + c + ")"))) : this._prepareEvent(t, e, n).then((function(e) {
                var i, r;
                if (null === e)
                    throw null === (r = (i = a).recordLostEvent) || void 0 === r || r.call(i, Pi.EventProcessor, t.type || "event"),
                    new dr("An event processor returned null, will not send event.");
                if (n && n.data && !0 === n.data.I || l || !u)
                    return e;
                var s = u(e, n);
                return o._ensureBeforeSendRv(s)
            }
            )).then((function(n) {
                var i, r;
                if (null === n)
                    throw null === (r = (i = a).recordLostEvent) || void 0 === r || r.call(i, Pi.BeforeSend, t.type || "event"),
                    new dr("`beforeSend` returned `null`, will not send event.");
                var s = e && e.getSession && e.getSession();
                return !l && s && o._updateSessionFromEvent(s, n),
                o._sendEvent(n),
                n
            }
            )).then(null, (function(t) {
                if (t instanceof dr)
                    throw t;
                throw o.captureException(t, {
                    data: {
                        I: !0
                    },
                    originalException: t
                }),
                new dr("Event processing pipeline threw an error, original event will not be sent. Details have been sent as a new event.\nReason: " + t)
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
            if (rr(t))
                return t.then((function(t) {
                    if (!tr(t) && null !== t)
                        throw new dr(n);
                    return t
                }
                ), (function(t) {
                    throw new dr("beforeSend rejected with " + t)
                }
                ));
            if (!tr(t) && null !== t)
                throw new dr(n);
            return t
        }
        ,
        t
    }()
      , as = function() {
        function t() {}
        return t.prototype.sendEvent = function(t) {
            return To.resolve({
                reason: "NoopTransport: Event has been skipped because no Dsn is configured.",
                status: ji.Skipped
            })
        }
        ,
        t.prototype.close = function(t) {
            return To.resolve(!0)
        }
        ,
        t
    }()
      , ls = function() {
        function t(t) {
            this._options = t,
            this._options.dsn || xr.warn("No DSN provided, backend will not do anything."),
            this._transport = this._setupTransport()
        }
        return t.prototype.eventFromException = function(t, n) {
            throw new dr("Backend has to implement `eventFromException` method")
        }
        ,
        t.prototype.eventFromMessage = function(t, n, e) {
            throw new dr("Backend has to implement `eventFromMessage` method")
        }
        ,
        t.prototype.sendEvent = function(t) {
            this._transport.sendEvent(t).then(null, (function(t) {
                xr.error("Error while sending event: " + t)
            }
            ))
        }
        ,
        t.prototype.sendSession = function(t) {
            this._transport.sendSession ? this._transport.sendSession(t).then(null, (function(t) {
                xr.error("Error while sending session: " + t)
            }
            )) : xr.warn("Dropping session because custom transport doesn't implement sendSession")
        }
        ,
        t.prototype.getTransport = function() {
            return this._transport
        }
        ,
        t.prototype._setupTransport = function() {
            return new as
        }
        ,
        t
    }();
    function fs(t) {
        if (t.metadata && t.metadata.sdk) {
            var n = t.metadata.sdk;
            return {
                name: n.name,
                version: n.version
            }
        }
    }
    function hs(t, n) {
        return n ? (t.sdk = t.sdk || {},
        t.sdk.name = t.sdk.name || n.name,
        t.sdk.version = t.sdk.version || n.version,
        t.sdk.integrations = Ni(t.sdk.integrations || [], n.integrations || []),
        t.sdk.packages = Ni(t.sdk.packages || [], n.packages || []),
        t) : t
    }
    function ds(t, n) {
        var e = fs(n)
          , i = "aggregates"in t ? "sessions" : "session";
        return {
            body: JSON.stringify(_i(_i({
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
    function vs(t, n) {
        var e = fs(n)
          , i = t.type || "event"
          , r = "transaction" === i || n.forceEnvelope()
          , o = t.debug_meta || {}
          , s = o.transactionSampling
          , u = qi(o, ["transactionSampling"])
          , c = s || {}
          , a = c.method
          , l = c.rate;
        0 === Object.keys(u).length ? delete t.debug_meta : t.debug_meta = u;
        var f = {
            body: JSON.stringify(e ? hs(t, n.metadata.sdk) : t),
            type: i,
            url: r ? n.getEnvelopeEndpointWithUrlEncodedAuth() : n.getStoreEndpointWithUrlEncodedAuth()
        };
        if (r) {
            var h = JSON.stringify(_i(_i({
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
    function ps(t, n) {
        var e;
        !0 === n.debug && xr.enable();
        var i = Ho();
        null === (e = i.getScope()) || void 0 === e || e.update(n.initialScope);
        var r = new t(n);
        i.bindClient(r)
    }
    var ms = "6.14.1", ys, gs = function() {
        function t() {
            this.name = t.id
        }
        return t.prototype.setupOnce = function() {
            ys = Function.prototype.toString,
            Function.prototype.toString = function() {
                for (var t = [], n = 0; n < arguments.length; n++)
                    t[n] = arguments[n];
                var e = this.k || this;
                return ys.apply(e, t)
            }
        }
        ,
        t.id = "FunctionToString",
        t
    }(), bs = [/^Script error\.?$/, /^Javascript error: Script error\.? on line 0$/], ws = function() {
        function t(n) {
            void 0 === n && (n = {}),
            this._options = n,
            this.name = t.id
        }
        return t.prototype.setupOnce = function() {
            $o((function(n) {
                var e = Ho();
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
            return this._isSentryError(t, n) ? (xr.warn("Event dropped due to being internal Sentry Error.\nEvent: " + go(t)),
            !0) : this._isIgnoredError(t, n) ? (xr.warn("Event dropped due to being matched by `ignoreErrors` option.\nEvent: " + go(t)),
            !0) : this._isDeniedUrl(t, n) ? (xr.warn("Event dropped due to being matched by `denyUrls` option.\nEvent: " + go(t) + ".\nUrl: " + this._getEventFilterUrl(t)),
            !0) : !this._isAllowedUrl(t, n) && (xr.warn("Event dropped due to not being matched by `allowUrls` option.\nEvent: " + go(t) + ".\nUrl: " + this._getEventFilterUrl(t)),
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
                    return Cr(t, n)
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
                return Cr(e, t)
            }
            ))
        }
        ,
        t.prototype._isAllowedUrl = function(t, n) {
            if (!n.allowUrls || !n.allowUrls.length)
                return !0;
            var e = this._getEventFilterUrl(t);
            return !e || n.allowUrls.some((function(t) {
                return Cr(e, t)
            }
            ))
        }
        ,
        t.prototype._mergeOptions = function(t) {
            return void 0 === t && (t = {}),
            {
                allowUrls: Ni(this._options.whitelistUrls || [], this._options.allowUrls || [], t.whitelistUrls || [], t.allowUrls || []),
                denyUrls: Ni(this._options.blacklistUrls || [], this._options.denyUrls || [], t.blacklistUrls || [], t.denyUrls || []),
                ignoreErrors: Ni(this._options.ignoreErrors || [], t.ignoreErrors || [], bs),
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
                    return xr.error("Cannot extract message for event " + go(t)),
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
                return xr.error("Cannot extract url for event " + go(t)),
                null
            }
        }
        ,
        t.id = "InboundFilters",
        t
    }(), xs = "?", ks = /^\s*at (?:(.*?) ?\()?((?:file|https?|blob|chrome-extension|address|native|eval|webpack|<anonymous>|[-a-z]+:|.*bundle|\/).*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i, Ss = /^\s*(.*?)(?:\((.*?)\))?(?:^|@)?((?:file|https?|blob|chrome|webpack|resource|moz-extension|capacitor).*?:\/.*?|\[native code\]|[^@]*(?:bundle|\d+\.js)|\/[\w\-. /=]+)(?::(\d+))?(?::(\d+))?\s*$/i, Es = /^\s*at (?:((?:\[object object\])?.+) )?\(?((?:file|ms-appx|https?|webpack|blob):.*?):(\d+)(?::(\d+))?\)?\s*$/i, Ts = /(\S+) line (\d+)(?: > eval line \d+)* > eval/i, Os = /\((\S*)(?::(\d+))(?::(\d+))\)/, Cs = /Minified React error #\d+;/i;
    function As(t) {
        var n = null
          , e = 0;
        t && ("number" == typeof t.framesToPop ? e = t.framesToPop : Cs.test(t.message) && (e = 1));
        try {
            if (n = Is(t))
                return Ms(n, e)
        } catch (t) {}
        try {
            if (n = Xs(t))
                return Ms(n, e)
        } catch (t) {}
        return {
            message: Rs(t),
            name: t && t.name,
            stack: [],
            failed: !0
        }
    }
    function Xs(t) {
        var n, e;
        if (!t || !t.stack)
            return null;
        for (var i, r, o, s = [], u = t.stack.split("\n"), c = 0; c < u.length; ++c) {
            if (r = ks.exec(u[c])) {
                var a = r[2] && 0 === r[2].indexOf("native");
                r[2] && 0 === r[2].indexOf("eval") && (i = Os.exec(r[2])) && (r[2] = i[1],
                r[3] = i[2],
                r[4] = i[3]);
                var l = r[2] && 0 === r[2].indexOf("address at ") ? r[2].substr("address at ".length) : r[2]
                  , f = r[1] || xs;
                f = (n = Fi(_s(f, l), 2))[0],
                o = {
                    url: l = n[1],
                    func: f,
                    args: a ? [r[2]] : [],
                    line: r[3] ? +r[3] : null,
                    column: r[4] ? +r[4] : null
                }
            } else if (r = Es.exec(u[c]))
                o = {
                    url: r[2],
                    func: r[1] || xs,
                    args: [],
                    line: +r[3],
                    column: r[4] ? +r[4] : null
                };
            else {
                if (!(r = Ss.exec(u[c])))
                    continue;
                r[3] && r[3].indexOf(" > eval") > -1 && (i = Ts.exec(r[3])) ? (r[1] = r[1] || "eval",
                r[3] = i[1],
                r[4] = i[2],
                r[5] = "") : 0 !== c || r[5] || void 0 === t.columnNumber || (s[0].column = t.columnNumber + 1);
                l = r[3],
                f = r[1] || xs;
                f = (e = Fi(_s(f, l), 2))[0],
                o = {
                    url: l = e[1],
                    func: f,
                    args: r[2] ? r[2].split(",") : [],
                    line: r[4] ? +r[4] : null,
                    column: r[5] ? +r[5] : null
                }
            }
            !o.func && o.line && (o.func = xs),
            s.push(o)
        }
        return s.length ? {
            message: Rs(t),
            name: t.name,
            stack: s
        } : null
    }
    function Is(t) {
        if (!t || !t.stacktrace)
            return null;
        for (var n, e = / line (\d+).*script (?:in )?(\S+)(?:: in function (\S+))?$/i, i = / line (\d+), column (\d+)\s*(?:in (?:<anonymous function: ([^>]+)>|([^)]+))\((.*)\))? in (.*):\s*$/i, r = t.stacktrace.split("\n"), o = [], s = 0; s < r.length; s += 2) {
            var u = null;
            (n = e.exec(r[s])) ? u = {
                url: n[2],
                func: n[3],
                args: [],
                line: +n[1],
                column: null
            } : (n = i.exec(r[s])) && (u = {
                url: n[6],
                func: n[3] || n[4],
                args: n[5] ? n[5].split(",") : [],
                line: +n[1],
                column: +n[2]
            }),
            u && (!u.func && u.line && (u.func = xs),
            o.push(u))
        }
        return o.length ? {
            message: Rs(t),
            name: t.name,
            stack: o
        } : null
    }
    var _s = function(t, n) {
        var e = -1 !== t.indexOf("safari-extension")
          , i = -1 !== t.indexOf("safari-web-extension");
        return e || i ? [-1 !== t.indexOf("@") ? t.split("@")[0] : xs, e ? "safari-extension:" + n : "safari-web-extension:" + n] : [t, n]
    };
    function Ms(t, n) {
        try {
            return _i(_i({}, t), {
                stack: t.stack.slice(n)
            })
        } catch (n) {
            return t
        }
    }
    function Rs(t) {
        var n = t && t.message;
        return n ? n.error && "string" == typeof n.error.message ? n.error.message : n : "No error message"
    }
    var Ds = 50;
    function js(t) {
        var n = qs(t.stack)
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
    function Bs(t, n, e) {
        var i = {
            exception: {
                values: [{
                    type: nr(t) ? t.constructor.name : e ? "UnhandledRejection" : "Error",
                    value: "Non-Error " + (e ? "promise rejection" : "exception") + " captured with keys: " + qr(t)
                }]
            },
            extra: {
                _: Rr(t)
            }
        };
        if (n) {
            var r = qs(As(n).stack);
            i.stacktrace = {
                frames: r
            }
        }
        return i
    }
    function Ps(t) {
        return {
            exception: {
                values: [js(t)]
            }
        }
    }
    function qs(t) {
        if (!t || !t.length)
            return [];
        var n = t
          , e = n[0].func || ""
          , i = n[n.length - 1].func || "";
        return -1 === e.indexOf("captureMessage") && -1 === e.indexOf("captureException") || (n = n.slice(1)),
        -1 !== i.indexOf("sentryWrapped") && (n = n.slice(0, -1)),
        n.slice(0, Ds).map((function(t) {
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
    function $s(t, n, e) {
        var i = Ns(n, e && e.syntheticException || void 0, {
            attachStacktrace: t.attachStacktrace
        });
        return wo(i),
        i.level = Di.Error,
        e && e.event_id && (i.event_id = e.event_id),
        To.resolve(i)
    }
    function Fs(t, n, e, i) {
        void 0 === e && (e = Di.Info);
        var r = zs(n, i && i.syntheticException || void 0, {
            attachStacktrace: t.attachStacktrace
        });
        return r.level = e,
        i && i.event_id && (r.event_id = i.event_id),
        To.resolve(r)
    }
    function Ns(t, n, e) {
        var i;
        if (void 0 === e && (e = {}),
        Ji(t) && t.error)
            return i = Ps(As(t = t.error));
        if (Ki(t) || Yi(t)) {
            var r = t
              , o = r.name || (Ki(r) ? "DOMError" : "DOMException")
              , s = r.message ? o + ": " + r.message : o;
            return bo(i = zs(s, n, e), s),
            "code"in r && (i.tags = _i(_i({}, i.tags), {
                "DOMException.code": "" + r.code
            })),
            i
        }
        return Wi(t) ? i = Ps(As(t)) : tr(t) || nr(t) ? (wo(i = Bs(t, n, e.rejection), {
            synthetic: !0
        }),
        i) : (bo(i = zs(t, n, e), "" + t, void 0),
        wo(i, {
            synthetic: !0
        }),
        i)
    }
    function zs(t, n, e) {
        void 0 === e && (e = {});
        var i = {
            message: t
        };
        if (e.attachStacktrace && n) {
            var r = qs(As(n).stack);
            i.stacktrace = {
                frames: r
            }
        }
        return i
    }
    var Ls = Vi(), Gs;
    function Us() {
        var t, n;
        if (Gs)
            return Gs;
        if (Nr(Ls.fetch))
            return Gs = Ls.fetch.bind(Ls);
        var e = Ls.document
          , i = Ls.fetch;
        if ("function" == typeof (null === (t = e) || void 0 === t ? void 0 : t.createElement))
            try {
                var r = e.createElement("iframe");
                r.hidden = !0,
                e.head.appendChild(r),
                (null === (n = r.contentWindow) || void 0 === n ? void 0 : n.fetch) && (i = r.contentWindow.fetch),
                e.head.removeChild(r)
            } catch (t) {
                xr.warn("Could not create sandbox iframe for pure fetch check, bailing to window.fetch: ", t)
            }
        return Gs = i.bind(Ls)
    }
    function Hs(t, n) {
        return "[object Navigator]" === Object.prototype.toString.call(Ls && Ls.navigator) && "function" == typeof Ls.navigator.sendBeacon ? Ls.navigator.sendBeacon.bind(Ls.navigator)(t, n) : Fr() ? zi(Us()(t, {
            body: n,
            method: "POST",
            credentials: "omit",
            keepalive: !0
        })) : void 0
    }
    var Vs = {
        event: "error",
        transaction: "transaction",
        session: "session",
        attachment: "attachment"
    }
      , Ws = Vi()
      , Js = function() {
        function t(t) {
            var n = this;
            this.options = t,
            this._buffer = new Oo(30),
            this._rateLimits = {},
            this._outcomes = {},
            this._api = new ns(t.dsn,t._metadata,t.tunnel),
            this.url = this._api.getStoreEndpointWithUrlEncodedAuth(),
            this.options.sendClientReports && Ws.document && Ws.document.addEventListener("visibilitychange", (function() {
                "hidden" === Ws.document.visibilityState && n._flushOutcomes()
            }
            ))
        }
        return t.prototype.sendEvent = function(t) {
            throw new dr("Transport Class has to implement `sendEvent` method")
        }
        ,
        t.prototype.close = function(t) {
            return this._buffer.drain(t)
        }
        ,
        t.prototype.recordLostEvent = function(t, n) {
            var e;
            if (this.options.sendClientReports) {
                var i = Vs[n] + ":" + t;
                xr.log("Adding outcome: " + i),
                this._outcomes[i] = (null != (e = this._outcomes[i]) ? e : 0) + 1
            }
        }
        ,
        t.prototype._flushOutcomes = function() {
            if (this.options.sendClientReports) {
                var t = this._outcomes;
                if (this._outcomes = {},
                Object.keys(t).length) {
                    xr.log("Flushing outcomes:\n" + JSON.stringify(t, null, 2));
                    var n = this._api.getEnvelopeEndpointWithUrlEncodedAuth()
                      , e = JSON.stringify(_i({}, this.options.tunnel && {
                        dsn: this._api.getDsn().toString()
                    })) + "\n" + JSON.stringify({
                        type: "client_report"
                    }) + "\n" + JSON.stringify({
                        timestamp: Mo(),
                        discarded_events: Object.keys(t).map((function(n) {
                            var e = Fi(n.split(":"), 2)
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
                        Hs(n, e)
                    } catch (t) {
                        xr.error(t)
                    }
                } else
                    xr.log("No outcomes to flush")
            }
        }
        ,
        t.prototype._handleResponse = function(t) {
            var n = t.requestType
              , e = t.response
              , i = t.headers
              , r = t.resolve
              , o = t.reject
              , s = ji.fromHttpCode(e.status);
            this._handleRateLimit(i) && xr.warn("Too many " + n + " requests, backing off until: " + this._disabledUntil(n)),
            s !== ji.Success ? o(e) : r({
                status: s
            })
        }
        ,
        t.prototype._disabledUntil = function(t) {
            var n = Vs[t];
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
                    for (var c = $i(s.trim().split(",")), a = c.next(); !a.done; a = c.next()) {
                        var l = a.value.split(":", 2)
                          , f = parseInt(l[0], 10)
                          , h = 1e3 * (isNaN(f) ? 60 : f);
                        try {
                            for (var d = (i = void 0,
                            $i(l[1].split(";"))), v = d.next(); !v.done; v = d.next()) {
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
            return !!u && (this._rateLimits.all = new Date(o + So(o, u)),
            !0)
        }
        ,
        t
    }()
      , Ks = function(t) {
        function n(n, e) {
            void 0 === e && (e = Us());
            var i = t.call(this, n) || this;
            return i._fetch = e,
            i
        }
        return Ii(n, t),
        n.prototype.sendEvent = function(t) {
            return this._sendRequest(vs(t, this._api), t)
        }
        ,
        n.prototype.sendSession = function(t) {
            return this._sendRequest(ds(t, this._api), t)
        }
        ,
        n.prototype._sendRequest = function(t, n) {
            var e = this;
            if (this._isRateLimited(t.type))
                return this.recordLostEvent(Pi.RateLimitBackoff, t.type),
                Promise.reject({
                    event: n,
                    type: t.type,
                    reason: "Transport for " + t.type + " requests locked till " + this._disabledUntil(t.type) + " due to too many requests.",
                    status: 429
                });
            var i = {
                body: t.body,
                method: "POST",
                referrerPolicy: Lr() ? "origin" : ""
            };
            return void 0 !== this.options.fetchParameters && Object.assign(i, this.options.fetchParameters),
            void 0 !== this.options.headers && (i.headers = this.options.headers),
            this._buffer.add((function() {
                return new To((function(n, r) {
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
                throw n instanceof dr ? e.recordLostEvent(Pi.QueueOverflow, t.type) : e.recordLostEvent(Pi.NetworkError, t.type),
                n
            }
            ))
        }
        ,
        n
    }(Js)
      , Ys = function(t) {
        function n() {
            return null !== t && t.apply(this, arguments) || this
        }
        return Ii(n, t),
        n.prototype.sendEvent = function(t) {
            return this._sendRequest(vs(t, this._api), t)
        }
        ,
        n.prototype.sendSession = function(t) {
            return this._sendRequest(ds(t, this._api), t)
        }
        ,
        n.prototype._sendRequest = function(t, n) {
            var e = this;
            return this._isRateLimited(t.type) ? (this.recordLostEvent(Pi.RateLimitBackoff, t.type),
            Promise.reject({
                event: n,
                type: t.type,
                reason: "Transport for " + t.type + " requests locked till " + this._disabledUntil(t.type) + " due to too many requests.",
                status: 429
            })) : this._buffer.add((function() {
                return new To((function(n, i) {
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
                throw n instanceof dr ? e.recordLostEvent(Pi.QueueOverflow, t.type) : e.recordLostEvent(Pi.NetworkError, t.type),
                n
            }
            ))
        }
        ,
        n
    }(Js)
      , Qs = function(t) {
        function n() {
            return null !== t && t.apply(this, arguments) || this
        }
        return Ii(n, t),
        n.prototype.eventFromException = function(t, n) {
            return $s(this._options, t, n)
        }
        ,
        n.prototype.eventFromMessage = function(t, n, e) {
            return void 0 === n && (n = Di.Info),
            Fs(this._options, t, n, e)
        }
        ,
        n.prototype._setupTransport = function() {
            if (!this._options.dsn)
                return t.prototype._setupTransport.call(this);
            var n = _i(_i({}, this._options.transportOptions), {
                dsn: this._options.dsn,
                tunnel: this._options.tunnel,
                sendClientReports: this._options.sendClientReports,
                _metadata: this._options._metadata
            });
            return this._options.transport ? new this._options.transport(n) : Fr() ? new Ks(n) : new Ys(n)
        }
        ,
        n
    }(ls)
      , Zs = Vi()
      , tu = 0;
    function nu() {
        return tu > 0
    }
    function eu() {
        tu += 1,
        setTimeout((function() {
            tu -= 1
        }
        ))
    }
    function iu(t, n, e) {
        if (void 0 === n && (n = {}),
        "function" != typeof t)
            return t;
        try {
            if (t.I)
                return t;
            if (t.M)
                return t.M
        } catch (n) {
            return t
        }
        var i = function() {
            var i = Array.prototype.slice.call(arguments);
            try {
                e && "function" == typeof e && e.apply(this, arguments);
                var r = i.map((function(t) {
                    return iu(t, n)
                }
                ));
                return t.handleEvent ? t.handleEvent.apply(this, r) : t.apply(this, r)
            } catch (t) {
                throw eu(),
                Zo((function(e) {
                    e.addEventProcessor((function(t) {
                        var e = _i({}, t);
                        return n.mechanism && (bo(e, void 0, void 0),
                        wo(e, n.mechanism)),
                        e.extra = _i(_i({}, e.extra), {
                            arguments: i
                        }),
                        e
                    }
                    )),
                    Qo(t)
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
        Object.defineProperty(t, "M", {
            enumerable: !1,
            value: i
        }),
        Object.defineProperties(i, {
            I: {
                enumerable: !1,
                value: !0
            },
            k: {
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
    function ru(t) {
        if (void 0 === t && (t = {}),
        Zs.document)
            if (t.eventId)
                if (t.dsn) {
                    var n = Zs.document.createElement("script");
                    n.async = !0,
                    n.src = new ns(t.dsn).getReportDialogEndpoint(t),
                    t.onLoad && (n.onload = t.onLoad);
                    var e = Zs.document.head || Zs.document.body;
                    e && e.appendChild(n)
                } else
                    xr.error("Missing dsn option in showReportDialog call");
            else
                xr.error("Missing eventId option in showReportDialog call")
    }
    var ou = function() {
        function t(n) {
            this.name = t.id,
            this._onErrorHandlerInstalled = !1,
            this._onUnhandledRejectionHandlerInstalled = !1,
            this._options = _i({
                onerror: !0,
                onunhandledrejection: !0
            }, n)
        }
        return t.prototype.setupOnce = function() {
            Error.stackTraceLimit = 50,
            this._options.onerror && (xr.log("Global Handler attached: onerror"),
            this._installGlobalOnErrorHandler()),
            this._options.onunhandledrejection && (xr.log("Global Handler attached: onunhandledrejection"),
            this._installGlobalOnUnhandledRejectionHandler())
        }
        ,
        t.prototype._installGlobalOnErrorHandler = function() {
            var n = this;
            this._onErrorHandlerInstalled || (Kr({
                callback: function(e) {
                    var i = e.error
                      , r = Ho()
                      , o = r.getIntegration(t)
                      , s = i && !0 === i.C;
                    if (o && !nu() && !s) {
                        var u = r.getClient()
                          , c = void 0 === i && Qi(e.msg) ? n._eventFromIncompleteOnError(e.msg, e.url, e.line, e.column) : n._enhanceEventWithInitialFrame(Ns(i || e.msg, void 0, {
                            attachStacktrace: u && u.getOptions().attachStacktrace,
                            rejection: !1
                        }), e.url, e.line, e.column);
                        wo(c, {
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
            this._onUnhandledRejectionHandlerInstalled || (Kr({
                callback: function(e) {
                    var i = e;
                    try {
                        "reason"in e ? i = e.reason : "detail"in e && "reason"in e.detail && (i = e.detail.reason)
                    } catch (t) {}
                    var r = Ho()
                      , o = r.getIntegration(t)
                      , s = i && !0 === i.C;
                    if (!o || nu() || s)
                        return !0;
                    var u = r.getClient()
                      , c = Zi(i) ? n._eventFromRejectionWithPrimitive(i) : Ns(i, void 0, {
                        attachStacktrace: u && u.getOptions().attachStacktrace,
                        rejection: !0
                    });
                    c.level = Di.Error,
                    wo(c, {
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
            var r, o = Ji(t) ? t.message : t, s = o.match(/^(?:[Uu]ncaught (?:exception: )?)?(?:((?:Eval|Internal|Range|Reference|Syntax|Type|URI|)Error): )?(.*)$/i);
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
              , s = Qi(n) && n.length > 0 ? n : ar();
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
      , su = ["EventTarget", "Window", "Node", "ApplicationCache", "AudioTrackList", "ChannelMergerNode", "CryptoOperation", "EventSource", "FileReader", "HTMLUnknownElement", "IDBDatabase", "IDBRequest", "IDBTransaction", "KeyOperation", "MediaController", "MessagePort", "ModalWindow", "Notification", "SVGElementInstance", "Screen", "TextTrack", "TextTrackCue", "TextTrackList", "WebSocket", "WebSocketWorker", "Worker", "XMLHttpRequest", "XMLHttpRequestEventTarget", "XMLHttpRequestUpload"]
      , uu = function() {
        function t(n) {
            this.name = t.id,
            this._options = _i({
                XMLHttpRequest: !0,
                eventTarget: !0,
                requestAnimationFrame: !0,
                setInterval: !0,
                setTimeout: !0
            }, n)
        }
        return t.prototype.setupOnce = function() {
            var t = Vi();
            (this._options.setTimeout && Ar(t, "setTimeout", this._wrapTimeFunction.bind(this)),
            this._options.setInterval && Ar(t, "setInterval", this._wrapTimeFunction.bind(this)),
            this._options.requestAnimationFrame && Ar(t, "requestAnimationFrame", this._wrapRAF.bind(this)),
            this._options.XMLHttpRequest && "XMLHttpRequest"in t && Ar(XMLHttpRequest.prototype, "send", this._wrapXHR.bind(this)),
            this._options.eventTarget) && (Array.isArray(this._options.eventTarget) ? this._options.eventTarget : su).forEach(this._wrapEventTarget.bind(this))
        }
        ,
        t.prototype._wrapTimeFunction = function(t) {
            return function() {
                for (var n = [], e = 0; e < arguments.length; e++)
                    n[e] = arguments[e];
                var i = n[0];
                return n[0] = iu(i, {
                    mechanism: {
                        data: {
                            function: Er(t)
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
                return t.call(this, iu(n, {
                    mechanism: {
                        data: {
                            function: "requestAnimationFrame",
                            handler: Er(t)
                        },
                        handled: !0,
                        type: "instrument"
                    }
                }))
            }
        }
        ,
        t.prototype._wrapEventTarget = function(t) {
            var n = Vi()
              , e = n[t] && n[t].prototype;
            e && e.hasOwnProperty && e.hasOwnProperty("addEventListener") && (Ar(e, "addEventListener", (function(n) {
                return function(e, i, r) {
                    try {
                        "function" == typeof i.handleEvent && (i.handleEvent = iu(i.handleEvent.bind(i), {
                            mechanism: {
                                data: {
                                    function: "handleEvent",
                                    handler: Er(i),
                                    target: t
                                },
                                handled: !0,
                                type: "instrument"
                            }
                        }))
                    } catch (t) {}
                    return n.call(this, e, iu(i, {
                        mechanism: {
                            data: {
                                function: "addEventListener",
                                handler: Er(i),
                                target: t
                            },
                            handled: !0,
                            type: "instrument"
                        }
                    }), r)
                }
            }
            )),
            Ar(e, "removeEventListener", (function(t) {
                return function(n, e, i) {
                    var r, o = e;
                    try {
                        var s = null === (r = o) || void 0 === r ? void 0 : r.M;
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
                    t in i && "function" == typeof i[t] && Ar(i, t, (function(n) {
                        var e = {
                            mechanism: {
                                data: {
                                    function: t,
                                    handler: Er(n)
                                },
                                handled: !0,
                                type: "instrument"
                            }
                        };
                        return n.k && (e.mechanism.data.handler = Er(n.k)),
                        iu(n, e)
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
      , cu = function() {
        function t(n) {
            this.name = t.id,
            this._options = _i({
                console: !0,
                dom: !0,
                fetch: !0,
                history: !0,
                sentry: !0,
                xhr: !0
            }, n)
        }
        return t.prototype.addSentryBreadcrumb = function(t) {
            this._options.sentry && Ho().addBreadcrumb({
                category: "sentry." + ("transaction" === t.type ? "transaction" : "event"),
                event_id: t.event_id,
                level: t.level,
                message: go(t)
            }, {
                event: t
            })
        }
        ,
        t.prototype.setupOnce = function() {
            var t = this;
            this._options.console && Kr({
                callback: function() {
                    for (var n = [], e = 0; e < arguments.length; e++)
                        n[e] = arguments[e];
                    t._consoleBreadcrumb.apply(t, Ni(n))
                },
                type: "console"
            }),
            this._options.dom && Kr({
                callback: function() {
                    for (var n = [], e = 0; e < arguments.length; e++)
                        n[e] = arguments[e];
                    t._domBreadcrumb.apply(t, Ni(n))
                },
                type: "dom"
            }),
            this._options.xhr && Kr({
                callback: function() {
                    for (var n = [], e = 0; e < arguments.length; e++)
                        n[e] = arguments[e];
                    t._xhrBreadcrumb.apply(t, Ni(n))
                },
                type: "xhr"
            }),
            this._options.fetch && Kr({
                callback: function() {
                    for (var n = [], e = 0; e < arguments.length; e++)
                        n[e] = arguments[e];
                    t._fetchBreadcrumb.apply(t, Ni(n))
                },
                type: "fetch"
            }),
            this._options.history && Kr({
                callback: function() {
                    for (var n = [], e = 0; e < arguments.length; e++)
                        n[e] = arguments[e];
                    t._historyBreadcrumb.apply(t, Ni(n))
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
                level: Di.fromString(t.level),
                message: Or(t.args, " ")
            };
            if ("assert" === t.level) {
                if (!1 !== t.args[0])
                    return;
                n.message = "Assertion failed: " + (Or(t.args.slice(1), " ") || "console.assert"),
                n.data.arguments = t.args.slice(1)
            }
            Ho().addBreadcrumb(n, {
                input: t.args,
                level: t.level
            })
        }
        ,
        t.prototype._domBreadcrumb = function(t) {
            var n, e = "object" == typeof this._options.dom ? this._options.dom.serializeAttribute : void 0;
            "string" == typeof e && (e = [e]);
            try {
                n = t.event.target ? ur(t.event.target, e) : ur(t.event, e)
            } catch (t) {
                n = "<unknown>"
            }
            0 !== n.length && Ho().addBreadcrumb({
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
                if (t.xhr.C)
                    return;
                var n = t.xhr.O || {}
                  , e = n.method
                  , i = n.url
                  , r = n.status_code
                  , o = n.body;
                Ho().addBreadcrumb({
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
            t.endTimestamp && (t.fetchData.url.match(/sentry_key/) && "POST" === t.fetchData.method || (t.error ? Ho().addBreadcrumb({
                category: "fetch",
                data: t.fetchData,
                level: Di.Error,
                type: "http"
            }, {
                data: t.error,
                input: t.args
            }) : Ho().addBreadcrumb({
                category: "fetch",
                data: _i(_i({}, t.fetchData), {
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
            var n = Vi()
              , e = t.from
              , i = t.to
              , r = yo(n.location.href)
              , o = yo(e)
              , s = yo(i);
            o.path || (o = r),
            r.protocol === s.protocol && r.host === s.host && (i = s.relative),
            r.protocol === o.protocol && r.host === o.host && (e = o.relative),
            Ho().addBreadcrumb({
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
      , au = "cause"
      , lu = 5
      , fu = function() {
        function t(n) {
            void 0 === n && (n = {}),
            this.name = t.id,
            this._key = n.key || au,
            this._limit = n.limit || lu
        }
        return t.prototype.setupOnce = function() {
            $o((function(n, e) {
                var i = Ho().getIntegration(t);
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
            if (!(t.exception && t.exception.values && n && sr(n.originalException, Error)))
                return t;
            var e = this._walkErrorTree(n.originalException, this._key);
            return t.exception.values = Ni(e, t.exception.values),
            t
        }
        ,
        t.prototype._walkErrorTree = function(t, n, e) {
            if (void 0 === e && (e = []),
            !sr(t[n], Error) || e.length + 1 >= this._limit)
                return e;
            var i = js(As(t[n]));
            return this._walkErrorTree(t[n], n, Ni([i], e))
        }
        ,
        t.id = "LinkedErrors",
        t
    }()
      , hu = Vi()
      , du = function() {
        function t() {
            this.name = t.id
        }
        return t.prototype.setupOnce = function() {
            $o((function(n) {
                var e, i, r;
                if (Ho().getIntegration(t)) {
                    if (!hu.navigator && !hu.location && !hu.document)
                        return n;
                    var o = (null === (e = n.request) || void 0 === e ? void 0 : e.url) || (null === (i = hu.location) || void 0 === i ? void 0 : i.href)
                      , s = (hu.document || {}).referrer
                      , u = (hu.navigator || {}).userAgent
                      , c = _i(_i(_i({}, null === (r = n.request) || void 0 === r ? void 0 : r.headers), s && {
                        Referer: s
                    }), u && {
                        "User-Agent": u
                    })
                      , a = _i(_i({}, o && {
                        url: o
                    }), {
                        headers: c
                    });
                    return _i(_i({}, n), {
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
      , vu = function() {
        function t() {
            this.name = t.id
        }
        return t.prototype.setupOnce = function(n, e) {
            n((function(n) {
                var i = e().getIntegration(t);
                if (i) {
                    try {
                        if (i._shouldDropEvent(n, i._previousEvent))
                            return xr.warn("Event dropped due to being a duplicate of previously captured event."),
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
      , pu = function(t) {
        function n(n) {
            void 0 === n && (n = {});
            return n._metadata = n._metadata || {},
            n._metadata.sdk = n._metadata.sdk || {
                name: "sentry.javascript.browser",
                packages: [{
                    name: "npm:@sentry/browser",
                    version: ms
                }],
                version: ms
            },
            t.call(this, Qs, n) || this
        }
        return Ii(n, t),
        n.prototype.showReportDialog = function(t) {
            void 0 === t && (t = {}),
            Vi().document && (this._isEnabled() ? ru(_i(_i({}, t), {
                dsn: t.dsn || this.getDsn()
            })) : xr.error("Trying to call showReportDialog with Sentry Client disabled"))
        }
        ,
        n.prototype._prepareEvent = function(n, e, i) {
            return n.platform = n.platform || "javascript",
            t.prototype._prepareEvent.call(this, n, e, i)
        }
        ,
        n.prototype._sendEvent = function(n) {
            var e = this.getIntegration(cu);
            e && e.addSentryBreadcrumb(n),
            t.prototype._sendEvent.call(this, n)
        }
        ,
        n
    }(cs)
      , mu = [new ws, new gs, new uu, new cu, new ou, new fu, new vu, new du];
    function yu(t) {
        if (void 0 === t && (t = {}),
        void 0 === t.defaultIntegrations && (t.defaultIntegrations = mu),
        void 0 === t.release) {
            var n = Vi();
            n.SENTRY_RELEASE && n.SENTRY_RELEASE.id && (t.release = n.SENTRY_RELEASE.id)
        }
        void 0 === t.autoSessionTracking && (t.autoSessionTracking = !0),
        void 0 === t.sendClientReports && (t.sendClientReports = !0),
        ps(pu, t),
        t.autoSessionTracking && gu()
    }
    function gu() {
        if (void 0 !== Vi().document) {
            var t = Ho();
            "function" == typeof t.startSession && "function" == typeof t.captureSession && (t.startSession({
                ignoreDuration: !0
            }),
            t.captureSession(),
            Kr({
                callback: function(n) {
                    var e = n.from
                      , i = n.to;
                    void 0 !== e && e !== i && (t.startSession({
                        ignoreDuration: !0
                    }),
                    t.captureSession())
                },
                type: "history"
            }))
        } else
            xr.warn("Session tracking in non-browser environment with @sentry/browser is not supported.")
    }
    const bu = "me.yoopu.app.songbook"
      , wu = "973743727"
      , xu = "cdn.yopu.co"
      , ku = "https://" + xu
      , Su = "yoopu.me"
      , Eu = "yopu.co"
      , Tu = "https://" + Eu;
    var Ou;
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
    }(Ou || (Ou = {})),
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
    }(Ou || (Ou = {}));
    var Cu = new RegExp("^[ \\t]*([0-9a-f]{32})?-?([0-9a-f]{16})?-?([01])?[ \\t]*$");
    function Au(t) {
        var n;
        return void 0 === t && (t = null === (n = Ho().getClient()) || void 0 === n ? void 0 : n.getOptions()),
        !!t && ("tracesSampleRate"in t || "tracesSampler"in t)
    }
    function Xu(t) {
        var n = t.match(Cu);
        if (n) {
            var e = void 0;
            return "1" === n[3] ? e = !0 : "0" === n[3] && (e = !1),
            {
                traceId: n[1],
                parentSampled: e,
                parentSpanId: n[2]
            }
        }
    }
    function Iu(t) {
        var n, e;
        return void 0 === t && (t = Ho()),
        null === (e = null === (n = t) || void 0 === n ? void 0 : n.getScope()) || void 0 === e ? void 0 : e.getTransaction()
    }
    function _u(t) {
        return t / 1e3
    }
    function Mu(t) {
        return 1e3 * t
    }
    function Ru() {
        Kr({
            callback: Du,
            type: "error"
        }),
        Kr({
            callback: Du,
            type: "unhandledrejection"
        })
    }
    function Du() {
        var t = Iu();
        t && (xr.log("[Tracing] Transaction: " + Ou.InternalError + " -> Global error occured"),
        t.setStatus(Ou.InternalError))
    }
    var ju = function() {
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
      , Bu = function() {
        function t(t) {
            if (this.traceId = mo(),
            this.spanId = mo().substring(16),
            this.startTimestamp = Do(),
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
            var e = new t(_i(_i({}, n), {
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
            return this.tags = _i(_i({}, this.tags), ((e = {})[t] = n,
            e)),
            this
        }
        ,
        t.prototype.setData = function(t, n) {
            var e;
            return this.data = _i(_i({}, this.data), ((e = {})[t] = n,
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
            var n = Ou.fromHttpCode(t);
            return n !== Ou.UnknownError && this.setStatus(n),
            this
        }
        ,
        t.prototype.isSuccess = function() {
            return this.status === Ou.Ok
        }
        ,
        t.prototype.finish = function(t) {
            this.endTimestamp = "number" == typeof t ? t : Do()
        }
        ,
        t.prototype.toTraceparent = function() {
            var t = "";
            return void 0 !== this.sampled && (t = this.sampled ? "-1" : "-0"),
            this.traceId + "-" + this.spanId + t
        }
        ,
        t.prototype.toContext = function() {
            return $r({
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
            return $r({
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
            return $r({
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
    }()
      , Pu = function(t) {
        function n(n, e) {
            var i = t.call(this, n) || this;
            return i._measurements = {},
            i._hub = Ho(),
            sr(e, Lo) && (i._hub = e),
            i.name = n.name || "",
            i.metadata = n.metadata || {},
            i._trimEnd = n.trimEnd,
            i.transaction = i,
            i
        }
        return Ii(n, t),
        n.prototype.setName = function(t) {
            this.name = t
        }
        ,
        n.prototype.initSpanRecorder = function(t) {
            void 0 === t && (t = 1e3),
            this.spanRecorder || (this.spanRecorder = new ju(t)),
            this.spanRecorder.add(this)
        }
        ,
        n.prototype.setMeasurements = function(t) {
            this._measurements = _i({}, t)
        }
        ,
        n.prototype.setMetadata = function(t) {
            this.metadata = _i(_i({}, this.metadata), t)
        }
        ,
        n.prototype.finish = function(n) {
            var e, i, r, o, s, u = this;
            if (void 0 === this.endTimestamp) {
                if (this.name || (xr.warn("Transaction has no name, falling back to `<unlabeled transaction>`."),
                this.name = "<unlabeled transaction>"),
                t.prototype.finish.call(this, n),
                !0 !== this.sampled)
                    return xr.log("[Tracing] Discarding transaction because its trace was not chosen to be sampled."),
                    void (null === (s = null === (r = null === (e = this._hub.getClient()) || void 0 === e ? void 0 : (i = e).getTransport) || void 0 === r ? void 0 : (o = r.call(i)).recordLostEvent) || void 0 === s || s.call(o, Pi.SampleRate, "transaction"));
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
                return Object.keys(this._measurements).length > 0 && (xr.log("[Measurements] Adding measurements to transaction", JSON.stringify(this._measurements, void 0, 2)),
                a.measurements = this._measurements),
                xr.log("[Tracing] Finishing " + this.op + " transaction: " + this.name + "."),
                this._hub.captureEvent(a)
            }
        }
        ,
        n.prototype.toContext = function() {
            var n = t.prototype.toContext.call(this);
            return $r(_i(_i({}, n), {
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
    }(Bu)
      , qu = 1e3
      , $u = 5e3
      , Fu = function(t) {
        function n(n, e, i, r) {
            void 0 === i && (i = "");
            var o = t.call(this, r) || this;
            return o._pushActivity = n,
            o._popActivity = e,
            o.transactionSpanId = i,
            o
        }
        return Ii(n, t),
        n.prototype.add = function(n) {
            var e = this;
            n.spanId !== this.transactionSpanId && (n.finish = function(t) {
                n.endTimestamp = "number" == typeof t ? t : Do(),
                e._popActivity(n.spanId)
            }
            ,
            void 0 === n.endTimestamp && this._pushActivity(n.spanId)),
            t.prototype.add.call(this, n)
        }
        ,
        n
    }(ju)
      , Nu = function(t) {
        function n(n, e, i, r) {
            void 0 === i && (i = qu),
            void 0 === r && (r = !1);
            var o = t.call(this, n, e) || this;
            return o._idleHub = e,
            o._idleTimeout = i,
            o._onScope = r,
            o.activities = {},
            o._heartbeatCounter = 0,
            o._finished = !1,
            o._beforeFinishCallbacks = [],
            e && r && (zu(e),
            xr.log("Setting idle transaction on scope. Span ID: " + o.spanId),
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
        return Ii(n, t),
        n.prototype.finish = function(n) {
            var e, i, r = this;
            if (void 0 === n && (n = Do()),
            this._finished = !0,
            this.activities = {},
            this.spanRecorder) {
                xr.log("[Tracing] finishing IdleTransaction", new Date(1e3 * n).toISOString(), this.op);
                try {
                    for (var o = $i(this._beforeFinishCallbacks), s = o.next(); !s.done; s = o.next()) {
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
                    t.setStatus(Ou.Cancelled),
                    xr.log("[Tracing] cancelling span since transaction ended early", JSON.stringify(t, void 0, 2)));
                    var e = t.startTimestamp < n;
                    return e || xr.log("[Tracing] discarding Span since it happened after Transaction was finished", JSON.stringify(t, void 0, 2)),
                    e
                }
                )),
                xr.log("[Tracing] flushing IdleTransaction")
            } else
                xr.log("[Tracing] No active IdleTransaction");
            return this._onScope && zu(this._idleHub),
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
                this.spanRecorder = new Fu((function(t) {
                    n._finished || n._pushActivity(t)
                }
                ),(function(t) {
                    n._finished || n._popActivity(t)
                }
                ),this.spanId,t),
                xr.log("Starting heartbeat"),
                this._pingHeartbeat()
            }
            this.spanRecorder.add(this)
        }
        ,
        n.prototype._pushActivity = function(t) {
            this._initTimeout && (clearTimeout(this._initTimeout),
            this._initTimeout = void 0),
            xr.log("[Tracing] pushActivity: " + t),
            this.activities[t] = !0,
            xr.log("[Tracing] new activities count", Object.keys(this.activities).length)
        }
        ,
        n.prototype._popActivity = function(t) {
            var n = this;
            if (this.activities[t] && (xr.log("[Tracing] popActivity " + t),
            delete this.activities[t],
            xr.log("[Tracing] new activities count", Object.keys(this.activities).length)),
            0 === Object.keys(this.activities).length) {
                var e = this._idleTimeout
                  , i = Do() + e / 1e3;
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
                this._heartbeatCounter >= 3 ? (xr.log("[Tracing] Transaction finished because of no change for 3 heart beats"),
                this.setStatus(Ou.DeadlineExceeded),
                this.setTag("heartbeat", "failed"),
                this.finish()) : this._pingHeartbeat()
            }
        }
        ,
        n.prototype._pingHeartbeat = function() {
            var t = this;
            xr.log("pinging Heartbeat -> current counter: " + this._heartbeatCounter),
            setTimeout((function() {
                t._beat()
            }
            ), $u)
        }
        ,
        n
    }(Pu);
    function zu(t) {
        if (t) {
            var n = t.getScope();
            if (n)
                n.getTransaction() && n.setSpan(void 0)
        }
    }
    function Lu() {
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
    function Gu(t, n, e) {
        return Au(n) ? void 0 !== t.sampled ? (t.setMetadata({
            transactionSampling: {
                method: Bi.Explicit
            }
        }),
        t) : ("function" == typeof n.tracesSampler ? (i = n.tracesSampler(e),
        t.setMetadata({
            transactionSampling: {
                method: Bi.Sampler,
                rate: Number(i)
            }
        })) : void 0 !== e.parentSampled ? (i = e.parentSampled,
        t.setMetadata({
            transactionSampling: {
                method: Bi.Inheritance
            }
        })) : (i = n.tracesSampleRate,
        t.setMetadata({
            transactionSampling: {
                method: Bi.Rate,
                rate: Number(i)
            }
        })),
        Uu(i) ? i ? (t.sampled = Math.random() < i,
        t.sampled ? (xr.log("[Tracing] starting " + t.op + " transaction - " + t.name),
        t) : (xr.log("[Tracing] Discarding transaction because it's not included in the random sample (sampling rate = " + Number(i) + ")"),
        t)) : (xr.log("[Tracing] Discarding transaction because " + ("function" == typeof n.tracesSampler ? "tracesSampler returned 0 or false" : "a negative sampling decision was inherited or tracesSampleRate is set to 0")),
        t.sampled = !1,
        t) : (xr.warn("[Tracing] Discarding transaction because of invalid sample rate."),
        t.sampled = !1,
        t)) : (t.sampled = !1,
        t);
        var i
    }
    function Uu(t) {
        return isNaN(t) || "number" != typeof t && "boolean" != typeof t ? (xr.warn("[Tracing] Given sample rate is invalid. Sample rate must be a boolean or a number between 0 and 1. Got " + JSON.stringify(t) + " of type " + JSON.stringify(typeof t) + "."),
        !1) : !(t < 0 || t > 1) || (xr.warn("[Tracing] Given sample rate is invalid. Sample rate must be between 0 and 1. Got " + t + "."),
        !1)
    }
    function Hu(t, n) {
        var e, i, r = (null === (e = this.getClient()) || void 0 === e ? void 0 : e.getOptions()) || {}, o = new Pu(t,this);
        return (o = Gu(o, r, _i({
            parentSampled: t.parentSampled,
            transactionContext: t
        }, n))).sampled && o.initSpanRecorder(null === (i = r._experiments) || void 0 === i ? void 0 : i.maxSpans),
        o
    }
    function Vu(t, n, e, i, r) {
        var o, s, u = (null === (o = t.getClient()) || void 0 === o ? void 0 : o.getOptions()) || {}, c = new Nu(n,t,e,i);
        return (c = Gu(c, u, _i({
            parentSampled: n.parentSampled,
            transactionContext: n
        }, r))).sampled && c.initSpanRecorder(null === (s = u._experiments) || void 0 === s ? void 0 : s.maxSpans),
        c
    }
    function Wu() {
        var t = Go();
        t.T && (t.T.extensions = t.T.extensions || {},
        t.T.extensions.startTransaction || (t.T.extensions.startTransaction = Hu),
        t.T.extensions.traceHeaders || (t.T.extensions.traceHeaders = Lu))
    }
    function Ju() {
        var t = Go();
        if (t.T) {
            var n = {
                mongodb: function() {
                    return new (Gi(module, "./integrations/node/mongo").Mongo)
                },
                mongoose: function() {
                    return new (Gi(module, "./integrations/node/mongo").Mongo)({
                        mongoose: !0
                    })
                },
                mysql: function() {
                    return new (Gi(module, "./integrations/node/mysql").Mysql)
                },
                pg: function() {
                    return new (Gi(module, "./integrations/node/postgres").Postgres)
                }
            }
              , e = Object.keys(n).filter((function(t) {
                return !!Ui(t)
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
            e.length > 0 && (t.T.integrations = Ni(t.T.integrations || [], e))
        }
    }
    function Ku() {
        Wu(),
        Li() && Ju(),
        Ru()
    }
    var Yu = Vi();
    function Qu() {
        Yu && Yu.document ? Yu.document.addEventListener("visibilitychange", (function() {
            var t = Iu();
            Yu.document.hidden && t && (xr.log("[Tracing] Transaction: " + Ou.Cancelled + " -> since tab moved to the background, op: " + t.op),
            t.status || t.setStatus(Ou.Cancelled),
            t.setTag("visibilitychange", "document.hidden"),
            t.finish())
        }
        )) : xr.warn("[Tracing] Could not set up background tab detection due to lack of global document")
    }
    var Zu = function(t, n, e) {
        var i;
        return function(r) {
            n.value >= 0 && (r || e) && (n.delta = n.value - (i || 0),
            (n.delta || void 0 === i) && (i = n.value,
            t(n)))
        }
    }
      , tc = function() {
        return "v2-" + Date.now() + "-" + (Math.floor(8999999999999 * Math.random()) + 1e12)
    }
      , nc = function(t, n) {
        return {
            name: t,
            value: null != n ? n : -1,
            delta: 0,
            entries: [],
            id: tc()
        }
    }
      , ec = function(t, n) {
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
      , ic = function(t, n) {
        var e = function(i) {
            "pagehide" !== i.type && "hidden" !== Vi().document.visibilityState || (t(i),
            n && (removeEventListener("visibilitychange", e, !0),
            removeEventListener("pagehide", e, !0)))
        };
        addEventListener("visibilitychange", e, !0),
        addEventListener("pagehide", e, !0)
    }
      , rc = function(t, n) {
        var e, i = nc("CLS", 0), r = 0, o = [], s = function(t) {
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
        }, u = ec("layout-shift", s);
        u && (e = Zu(t, i, n),
        ic((function() {
            u.takeRecords().map(s),
            e(!0)
        }
        )))
    }
      , oc = -1
      , sc = function() {
        return "hidden" === Vi().document.visibilityState ? 0 : 1 / 0
    }
      , uc = function() {
        ic((function(t) {
            var n = t.timeStamp;
            oc = n
        }
        ), !0)
    }
      , cc = function() {
        return oc < 0 && (oc = sc(),
        uc()),
        {
            get firstHiddenTime() {
                return oc
            }
        }
    }
      , ac = function(t, n) {
        var e, i = cc(), r = nc("FID"), o = function(t) {
            e && t.startTime < i.firstHiddenTime && (r.value = t.processingStart - t.startTime,
            r.entries.push(t),
            e(!0))
        }, s = ec("first-input", o);
        s && (e = Zu(t, r, n),
        ic((function() {
            s.takeRecords().map(o),
            s.disconnect()
        }
        ), !0))
    }
      , lc = {}
      , fc = function(t, n) {
        var e, i = cc(), r = nc("LCP"), o = function(t) {
            var n = t.startTime;
            n < i.firstHiddenTime && (r.value = n,
            r.entries.push(t)),
            e && e()
        }, s = ec("largest-contentful-paint", o);
        if (s) {
            e = Zu(t, r, n);
            var u = function() {
                lc[r.id] || (s.takeRecords().map(o),
                s.disconnect(),
                lc[r.id] = !0,
                e(!0))
            };
            ["keydown", "click"].forEach((function(t) {
                addEventListener(t, u, {
                    once: !0,
                    capture: !0
                })
            }
            )),
            ic(u, !0)
        }
    }
      , hc = Vi()
      , dc = {
        _reportAllChanges: !1
    }
      , vc = function() {
        function t(t) {
            var n, e;
            this._measurements = {},
            this._performanceCursor = 0,
            !Li() && (null === (n = hc) || void 0 === n ? void 0 : n.performance) && (null === (e = hc) || void 0 === e ? void 0 : e.document) && (hc.performance.mark && hc.performance.mark("sentry-tracing-init"),
            this._trackCLS(),
            this._trackLCP(t._reportAllChanges),
            this._trackFID())
        }
        return t.prototype.addPerformanceEntries = function(t) {
            var n = this;
            if (hc && hc.performance && hc.performance.getEntries && jo) {
                xr.log("[Tracing] Adding & adjusting spans using Performance API");
                var e, i, r, o, s, u = _u(jo);
                if (hc.document && hc.document.scripts)
                    for (var c = 0; c < hc.document.scripts.length; c++)
                        if ("true" === hc.document.scripts[c].dataset.entry) {
                            e = hc.document.scripts[c].src;
                            break
                        }
                if (hc.performance.getEntries().slice(this._performanceCursor).forEach((function(c) {
                    var a = _u(c.startTime)
                      , l = _u(c.duration);
                    if (!("navigation" === t.op && u + a < t.startTimestamp))
                        switch (c.entryType) {
                        case "navigation":
                            pc(t, c, u),
                            o = u + _u(c.responseStart),
                            s = u + _u(c.requestStart);
                            break;
                        case "mark":
                        case "paint":
                        case "measure":
                            var f = mc(t, c, a, l, u);
                            void 0 === r && "sentry-tracing-init" === c.name && (r = f);
                            var h = cc()
                              , d = c.startTime < h.firstHiddenTime;
                            "first-paint" === c.name && d && (xr.log("[Measurements] Adding FP"),
                            n._measurements.fp = {
                                value: c.startTime
                            },
                            n._measurements["mark.fp"] = {
                                value: f
                            }),
                            "first-contentful-paint" === c.name && d && (xr.log("[Measurements] Adding FCP"),
                            n._measurements.fcp = {
                                value: c.startTime
                            },
                            n._measurements["mark.fcp"] = {
                                value: f
                            });
                            break;
                        case "resource":
                            var v = c.name.replace(hc.location.origin, "")
                              , p = yc(t, c, v, a, l, u);
                            void 0 === i && (e || "").indexOf(v) > -1 && (i = p)
                        }
                }
                )),
                void 0 !== i && void 0 !== r && wc(t, {
                    description: "evaluation",
                    endTimestamp: r,
                    op: "script",
                    startTimestamp: i
                }),
                this._performanceCursor = Math.max(performance.getEntries().length - 1, 0),
                this._trackNavigator(t),
                "pageload" === t.op) {
                    var a = _u(jo);
                    "number" == typeof o && (xr.log("[Measurements] Adding TTFB"),
                    this._measurements.ttfb = {
                        value: 1e3 * (o - t.startTimestamp)
                    },
                    "number" == typeof s && s <= o && (this._measurements["ttfb.requestTime"] = {
                        value: 1e3 * (o - s)
                    })),
                    ["fcp", "fp", "lcp"].forEach((function(e) {
                        if (n._measurements[e] && !(a >= t.startTimestamp)) {
                            var i = n._measurements[e].value
                              , r = a + _u(i)
                              , o = Math.abs(1e3 * (r - t.startTimestamp))
                              , s = o - i;
                            xr.log("[Measurements] Normalized " + e + " from " + i + " to " + o + " (" + s + ")"),
                            n._measurements[e].value = o
                        }
                    }
                    )),
                    this._measurements["mark.fid"] && this._measurements.fid && wc(t, {
                        description: "first input delay",
                        endTimestamp: this._measurements["mark.fid"].value + _u(this._measurements.fid.value),
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
            this._lcpEntry && (xr.log("[Measurements] Adding LCP Data"),
            this._lcpEntry.element && t.setTag("lcp.element", ur(this._lcpEntry.element)),
            this._lcpEntry.id && t.setTag("lcp.id", this._lcpEntry.id),
            this._lcpEntry.url && t.setTag("lcp.url", this._lcpEntry.url.trim().slice(0, 200)),
            t.setTag("lcp.size", this._lcpEntry.size)),
            this._clsEntry && this._clsEntry.sources && (xr.log("[Measurements] Adding CLS Data"),
            this._clsEntry.sources.forEach((function(n, e) {
                return t.setTag("cls.source." + (e + 1), ur(n.node))
            }
            )))
        }
        ,
        t.prototype._trackCLS = function() {
            var t = this;
            rc((function(n) {
                var e = n.entries.pop();
                e && (xr.log("[Measurements] Adding CLS"),
                t._measurements.cls = {
                    value: n.value
                },
                t._clsEntry = e)
            }
            ))
        }
        ,
        t.prototype._trackNavigator = function(t) {
            var n = hc.navigator;
            if (n) {
                var e = n.connection;
                e && (e.effectiveType && t.setTag("effectiveConnectionType", e.effectiveType),
                e.type && t.setTag("connectionType", e.type),
                xc(e.rtt) && (this._measurements["connection.rtt"] = {
                    value: e.rtt
                }),
                xc(e.downlink) && (this._measurements["connection.downlink"] = {
                    value: e.downlink
                })),
                xc(n.deviceMemory) && t.setTag("deviceMemory", String(n.deviceMemory)),
                xc(n.hardwareConcurrency) && t.setTag("hardwareConcurrency", String(n.hardwareConcurrency))
            }
        }
        ,
        t.prototype._trackLCP = function(t) {
            var n = this;
            fc((function(t) {
                var e = t.entries.pop();
                if (e) {
                    var i = _u(jo)
                      , r = _u(e.startTime);
                    xr.log("[Measurements] Adding LCP"),
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
            ac((function(n) {
                var e = n.entries.pop();
                if (e) {
                    var i = _u(jo)
                      , r = _u(e.startTime);
                    xr.log("[Measurements] Adding FID"),
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
    function pc(t, n, e) {
        gc({
            transaction: t,
            entry: n,
            event: "unloadEvent",
            timeOrigin: e
        }),
        gc({
            transaction: t,
            entry: n,
            event: "redirect",
            timeOrigin: e
        }),
        gc({
            transaction: t,
            entry: n,
            event: "domContentLoadedEvent",
            timeOrigin: e
        }),
        gc({
            transaction: t,
            entry: n,
            event: "loadEvent",
            timeOrigin: e
        }),
        gc({
            transaction: t,
            entry: n,
            event: "connect",
            timeOrigin: e
        }),
        gc({
            transaction: t,
            entry: n,
            event: "secureConnection",
            timeOrigin: e,
            eventEnd: "connectEnd",
            description: "TLS/SSL"
        }),
        gc({
            transaction: t,
            entry: n,
            event: "fetch",
            timeOrigin: e,
            eventEnd: "domainLookupStart",
            description: "cache"
        }),
        gc({
            transaction: t,
            entry: n,
            event: "domainLookup",
            timeOrigin: e,
            description: "DNS"
        }),
        bc(t, n, e)
    }
    function mc(t, n, e, i, r) {
        var o = r + e
          , s = o + i;
        return wc(t, {
            description: n.name,
            endTimestamp: s,
            op: n.entryType,
            startTimestamp: o
        }),
        o
    }
    function yc(t, n, e, i, r, o) {
        if ("xmlhttprequest" !== n.initiatorType && "fetch" !== n.initiatorType) {
            var s = {};
            "transferSize"in n && (s["Transfer Size"] = n.transferSize),
            "encodedBodySize"in n && (s["Encoded Body Size"] = n.encodedBodySize),
            "decodedBodySize"in n && (s["Decoded Body Size"] = n.decodedBodySize);
            var u = o + i
              , c = u + r;
            return wc(t, {
                description: e,
                endTimestamp: c,
                op: n.initiatorType ? "resource." + n.initiatorType : "resource",
                startTimestamp: u,
                data: s
            }),
            c
        }
    }
    function gc(t) {
        var n = t.transaction
          , e = t.entry
          , i = t.event
          , r = t.timeOrigin
          , o = t.eventEnd
          , s = t.description
          , u = o ? e[o] : e[i + "End"]
          , c = e[i + "Start"];
        c && u && wc(n, {
            op: "browser",
            description: null != s ? s : i,
            startTimestamp: r + _u(c),
            endTimestamp: r + _u(u)
        })
    }
    function bc(t, n, e) {
        wc(t, {
            op: "browser",
            description: "request",
            startTimestamp: e + _u(n.requestStart),
            endTimestamp: e + _u(n.responseEnd)
        }),
        wc(t, {
            op: "browser",
            description: "response",
            startTimestamp: e + _u(n.responseStart),
            endTimestamp: e + _u(n.responseEnd)
        })
    }
    function wc(t, n) {
        var e = n.startTimestamp
          , i = qi(n, ["startTimestamp"]);
        return e && t.startTimestamp > e && (t.startTimestamp = e),
        t.startChild(_i({
            startTimestamp: e
        }, i))
    }
    function xc(t) {
        return "number" == typeof t && isFinite(t)
    }
    var kc = ["localhost", /^\//]
      , Sc = {
        traceFetch: !0,
        traceXHR: !0,
        tracingOrigins: kc
    };
    function Ec(t) {
        var n = _i(_i({}, Sc), t)
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
                return Cr(t, n)
            }
            )) && !Cr(t, "sentry_key"),
            s[t]
        }
          , c = u;
        "function" == typeof o && (c = function(t) {
            return u(t) && o(t)
        }
        );
        var a = {};
        e && Kr({
            callback: function(t) {
                Tc(t, c, a)
            },
            type: "fetch"
        }),
        i && Kr({
            callback: function(t) {
                Oc(t, c, a)
            },
            type: "xhr"
        })
    }
    function Tc(t, n, e) {
        if (Au() && t.fetchData && n(t.fetchData.url))
            if (t.endTimestamp && t.fetchData.__span) {
                (r = e[t.fetchData.__span]) && (t.response ? r.setHttpStatus(t.response.status) : t.error && r.setStatus(Ou.InternalError),
                r.finish(),
                delete e[t.fetchData.__span])
            } else {
                var i = Iu();
                if (i) {
                    var r = i.startChild({
                        data: _i(_i({}, t.fetchData), {
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
                    sr(o, Request) && (u = o.headers),
                    u ? "function" == typeof u.append ? u.append("sentry-trace", r.toTraceparent()) : u = Array.isArray(u) ? Ni(u, [["sentry-trace", r.toTraceparent()]]) : _i(_i({}, u), {
                        "sentry-trace": r.toTraceparent()
                    }) : u = {
                        "sentry-trace": r.toTraceparent()
                    },
                    s.headers = u
                }
            }
    }
    function Oc(t, n, e) {
        var i, r;
        if (Au() && !(null === (i = t.xhr) || void 0 === i ? void 0 : i.C) && (null === (r = t.xhr) || void 0 === r ? void 0 : r.O) && n(t.xhr.O.url)) {
            var o = t.xhr.O;
            if (t.endTimestamp && t.xhr.D) {
                (u = e[t.xhr.D]) && (u.setHttpStatus(o.status_code),
                u.finish(),
                delete e[t.xhr.D])
            } else {
                var s = Iu();
                if (s) {
                    var u = s.startChild({
                        data: _i(_i({}, o.data), {
                            type: "xhr",
                            method: o.method,
                            url: o.url
                        }),
                        description: o.method + " " + o.url,
                        op: "http.client"
                    });
                    if (t.xhr.D = u.spanId,
                    e[t.xhr.D] = u,
                    t.xhr.setRequestHeader)
                        try {
                            t.xhr.setRequestHeader("sentry-trace", u.toTraceparent())
                        } catch (t) {}
                }
            }
        }
    }
    var Cc = Vi();
    function Ac(t, n, e) {
        if (void 0 === n && (n = !0),
        void 0 === e && (e = !0),
        Cc && Cc.location) {
            var i, r = Cc.location.href;
            n && (i = t({
                name: Cc.location.pathname,
                op: "pageload"
            })),
            e && Kr({
                callback: function(n) {
                    var e = n.to
                      , o = n.from;
                    void 0 === o && r && -1 !== r.indexOf(e) ? r = void 0 : o !== e && (r = void 0,
                    i && (xr.log("[Tracing] Finishing current transaction with op: " + i.op),
                    i.finish()),
                    i = t({
                        name: Cc.location.pathname,
                        op: "navigation"
                    }))
                },
                type: "history"
            })
        } else
            xr.warn("Could not initialize routing instrumentation due to invalid location")
    }
    var Xc = 600
      , Ic = _i({
        idleTimeout: qu,
        markBackgroundTransactions: !0,
        maxTransactionDuration: Xc,
        routingInstrumentation: Ac,
        startTransactionOnLocationChange: !0,
        startTransactionOnPageLoad: !0
    }, Sc)
      , _c = function() {
        function t(n) {
            this.name = t.id,
            this._emitOptionsWarning = !1;
            var e = Sc.tracingOrigins;
            n && n.tracingOrigins && Array.isArray(n.tracingOrigins) && 0 !== n.tracingOrigins.length ? e = n.tracingOrigins : this._emitOptionsWarning = !0,
            this.options = _i(_i(_i({}, Ic), n), {
                tracingOrigins: e
            }),
            this._metrics = new vc(_i(_i({}, dc), this.options._metricOptions))
        }
        return t.prototype.setupOnce = function(t, n) {
            var e = this;
            this._getCurrentHub = n,
            this._emitOptionsWarning && (xr.warn("[Tracing] You need to define `tracingOrigins` in the options. Set an array of urls or patterns to trace."),
            xr.warn("[Tracing] We added a reasonable default for you: " + Sc.tracingOrigins));
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
            u && Qu(),
            Ec({
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
                  , s = "pageload" === t.op ? Mc() : void 0
                  , u = _i(_i(_i({}, t), s), {
                    trimEnd: !0
                })
                  , c = "function" == typeof i ? i(u) : u
                  , a = void 0 === c ? _i(_i({}, u), {
                    sampled: !1
                }) : c;
                !1 === a.sampled && xr.log("[Tracing] Will not send " + a.op + " transaction because of beforeNavigate."),
                xr.log("[Tracing] Starting " + a.op + " transaction on scope");
                var l = Vu(this._getCurrentHub(), a, r, !0, {
                    location: Vi().location
                });
                return l.registerBeforeFinishCallback((function(t, e) {
                    n._metrics.addPerformanceEntries(t),
                    Dc(Mu(o), t, e)
                }
                )),
                l
            }
            xr.warn("[Tracing] Did not create " + t.op + " transaction because _getCurrentHub is invalid.")
        }
        ,
        t.id = "BrowserTracing",
        t
    }();
    function Mc() {
        var t = Rc("sentry-trace");
        if (t)
            return Xu(t)
    }
    function Rc(t) {
        var n = Vi().document.querySelector("meta[name=" + t + "]");
        return n ? n.getAttribute("content") : null
    }
    function Dc(t, n, e) {
        var i = e - n.startTimestamp;
        e && (i > t || i < 0) && (n.setStatus(Ou.DeadlineExceeded),
        n.setTag("maxTransactionDurationExceeded", "true"))
    }
    var jc = function() {
        function t(n) {
            void 0 === n && (n = {}),
            this.name = t.id,
            this._router = n.router || n.app,
            this._methods = (Array.isArray(n.methods) ? n.methods : []).concat("use")
        }
        return t.prototype.setupOnce = function() {
            this._router ? $c(this._router, this._methods) : xr.error("ExpressIntegration is missing an Express instance")
        }
        ,
        t.id = "Express",
        t
    }();
    function Bc(t, n) {
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
                    r.call.apply(r, Ni([this], n))
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
                    o.call.apply(o, Ni([this], n))
                }
                ))
            }
            ;
        default:
            throw new Error("Express middleware takes 2-4 arguments. Got: " + e)
        }
    }
    function Pc(t, n) {
        return t.map((function(t) {
            return "function" == typeof t ? Bc(t, n) : Array.isArray(t) ? t.map((function(t) {
                return "function" == typeof t ? Bc(t, n) : t
            }
            )) : t
        }
        ))
    }
    function qc(t, n) {
        var e = t[n];
        return t[n] = function() {
            for (var t = [], i = 0; i < arguments.length; i++)
                t[i] = arguments[i];
            return e.call.apply(e, Ni([this], Pc(t, n)))
        }
        ,
        t
    }
    function $c(t, n) {
        void 0 === n && (n = []),
        n.forEach((function(n) {
            return qc(t, n)
        }
        ))
    }
    var Fc = function() {
        function t(n) {
            void 0 === n && (n = {}),
            this.name = t.id,
            this._usePgNative = !!n.usePgNative
        }
        return t.prototype.setupOnce = function(t, n) {
            var e, i = Ui("pg");
            i ? !this._usePgNative || (null === (e = i.native) || void 0 === e ? void 0 : e.Client) ? Ar((this._usePgNative ? i.native : i).Client.prototype, "query", (function(t) {
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
                    return rr(a) ? a.then((function(t) {
                        var n;
                        return null === (n = c) || void 0 === n || n.finish(),
                        t
                    }
                    )) : (null === (u = c) || void 0 === u || u.finish(),
                    a)
                }
            }
            )) : xr.error("Postgres Integration was unable to access 'pg-native' bindings.") : xr.error("Postgres Integration was unable to require `pg` package.")
        }
        ,
        t.id = "Postgres",
        t
    }()
      , Nc = function() {
        function t() {
            this.name = t.id
        }
        return t.prototype.setupOnce = function(t, n) {
            var e = Ui("mysql/lib/Connection.js");
            e ? Ar(e, "createQuery", (function(t) {
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
            )) : xr.error("Mysql Integration was unable to require `mysql` package.")
        }
        ,
        t.id = "Mysql",
        t
    }()
      , zc = ["aggregate", "bulkWrite", "countDocuments", "createIndex", "createIndexes", "deleteMany", "deleteOne", "distinct", "drop", "dropIndex", "dropIndexes", "estimatedDocumentCount", "find", "findOne", "findOneAndDelete", "findOneAndReplace", "findOneAndUpdate", "indexes", "indexExists", "indexInformation", "initializeOrderedBulkOp", "insertMany", "insertOne", "isCapped", "mapReduce", "options", "parallelCollectionScan", "rename", "replaceOne", "stats", "updateMany", "updateOne"]
      , Lc = {
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
    }
      , Gc = function() {
        function t(n) {
            void 0 === n && (n = {}),
            this.name = t.id,
            this._operations = Array.isArray(n.operations) ? n.operations : zc,
            this._describeOperations = !("describeOperations"in n) || n.describeOperations,
            this._useMongoose = !!n.useMongoose
        }
        return t.prototype.setupOnce = function(t, n) {
            var e = this._useMongoose ? "mongoose" : "mongodb"
              , i = Ui(e);
            i ? this._instrumentOperations(i.Collection, this._operations, n) : xr.error("Mongo Integration was unable to require `" + e + "` package.")
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
                Ar(t.prototype, n, (function(t) {
                    return function() {
                        for (var r, o, s, u, c = [], a = 0; a < arguments.length; a++)
                            c[a] = arguments[a];
                        var l = c[c.length - 1]
                          , f = e().getScope()
                          , h = null === (r = f) || void 0 === r ? void 0 : r.getSpan();
                        if ("function" != typeof l || "mapReduce" === n && 2 === c.length) {
                            var d = null === (o = h) || void 0 === o ? void 0 : o.startChild(i(this, n, c))
                              , v = t.call.apply(t, Ni([this], c));
                            return rr(v) ? v.then((function(t) {
                                var n;
                                return null === (n = d) || void 0 === n || n.finish(),
                                t
                            }
                            )) : (null === (s = d) || void 0 === s || s.finish(),
                            v)
                        }
                        var p = null === (u = h) || void 0 === u ? void 0 : u.startChild(i(this, n, c.slice(0, -1)));
                        return t.call.apply(t, Ni([this], c.slice(0, -1), [function(t, n) {
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
              , o = Lc[n]
              , s = Array.isArray(this._describeOperations) ? this._describeOperations.includes(n) : this._describeOperations;
            if (!o || !s)
                return r;
            try {
                if ("mapReduce" === n) {
                    var u = Fi(e, 2)
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
    }()
      , Uc = Object.freeze({
        __proto__: null,
        Express: jc,
        Postgres: Fc,
        Mysql: Nc,
        Mongo: Gc
    })
      , Hc = _i(_i({}, Uc), {
        BrowserTracing: _c
    });
    Ku();
    const Vc = {
        PROD: "prod",
        STAGING: "staging",
        DEV: "dev"
    }
      , Wc = ra()
      , Jc = zt("Analytics")
      , Kc = "G-8RWGD73K0X"
      , Yc = "https://152d93ecd1114ccb88aed01c65129fa4@o162748.ingest.sentry.io/1230705";
    function Qc() {
        const t = Yc;
        return Wc !== Vc.DEV && (yu({
            sampleRate: Wc === Vc.PROD ? .1 : 1,
            environment: Wc,
            dsn: t,
            beforeSend(t, n) {
                const e = n.originalException;
                return e && e.message && e.message.match(/\$ is not defined/) || "Timeout" === n.originalException ? null : t
            },
            integrations: [new Hc.BrowserTracing],
            tracesSampleRate: Wc === Vc.PROD ? .01 : 1
        }),
        self.captureException = ta,
        Jc("Error reporting enabled"),
        !0)
    }
    function Zc(t) {
        const n = [];
        return Wc === Vc.PROD && (n.push(ea(Kc, t)),
        !t.hasNative() && T(navigator.userAgent)),
        n
    }
    function ta(t) {
        Qo(t)
    }
    function na(t, n={}) {
        if (window.gtag) {
            const e = {}
              , i = bi();
            return i.iVersion && (e.iVersion = i.iVersion),
            i.aVersion && (e.aVersion = i.aVersion),
            n.label && (e.event_label = n.label),
            n.category && (e.event_category = n.category),
            n.value && (e.value = n.value),
            window.gtag("event", t, e),
            void Jc(t, e)
        }
        Jc(t, n)
    }
    function ea(t, n) {
        function e() {
            dataLayer.push(arguments)
        }
        Jc("Initializing Google Analytics: " + t),
        window.dataLayer = window.dataLayer || [],
        e("js", new Date),
        e("set", "allow_google_signals", !1),
        e("set", "allow_ad_personalization_signals", !1),
        e("config", t, {
            send_page_view: !1,
            debug_mode: Wc !== Vc.PROD
        });
        const [i,r] = ia(n);
        return i && e("set", {
            user_id: i
        }),
        Object.keys(r).length > 0 && e("set", {
            user_properties: r
        }),
        e("event", "page_view"),
        window.gtag = e,
        "https://www.googletagmanager.com/gtag/js?id=" + t
    }
    function ia(t) {
        const n = {}
          , e = Wt.getItem(Ut.MINE_SELECTED_INSTRUMENT);
        n.instrument = e || "unselected";
        let i = "web_app";
        t.isAndroid() ? i = t.getSourceAppStore() || "unknown_android_store" : t.isIos() ? i = "apple" : O(navigator.userAgent) ? i = "wechat_mini_program" : C(navigator.userAgent) && (i = "douyin_mini_program"),
        n.app_store = i;
        const r = Wt.getJson(Ut.USER_DATA_USER_INFO);
        let o = r ? r.userCode : null;
        return r && (n.is_member = r.isMember ? "yes" : "no"),
        [o, n]
    }
    function ra() {
        return [Eu, Su].includes(location.hostname) ? "18080" === location.port ? Vc.STAGING : Vc.PROD : Vc.DEV
    }
    function oa(t) {
        return new Promise(( (n, e) => {
            t.oncomplete = t.onsuccess = () => n(t.result),
            t.onabort = t.onerror = () => e(t.error)
        }
        ))
    }
    function sa(t, n) {
        const e = indexedDB.open(t);
        e.onupgradeneeded = () => e.result.createObjectStore(n);
        const i = oa(e);
        return (t, e) => i.then((i => e(i.transaction(n, t).objectStore(n))))
    }
    let ua;
    function ca() {
        return ua || (ua = sa("keyval-store", "keyval")),
        ua
    }
    function aa(t, n=ca()) {
        return n("readonly", (n => oa(n.get(t))))
    }
    function la(t, n, e=ca()) {
        return e("readwrite", (e => (e.put(n, t),
        oa(e.transaction))))
    }
    function fa(t, n=ca()) {
        return n("readwrite", (n => (n.delete(t),
        oa(n.transaction))))
    }
    function ha() {
        var t;
        return !navigator.userAgentData && /Safari\//.test(navigator.userAgent) && !/Chrom(e|ium)\//.test(navigator.userAgent) && indexedDB.databases ? new Promise((function(n) {
            var e = function() {
                return indexedDB.databases().finally(n)
            };
            t = setInterval(e, 100),
            e()
        }
        )).finally((function() {
            return clearInterval(t)
        }
        )) : Promise.resolve()
    }
    let da = !1;
    ba().catch(( () => {}
    ));
    const va = {
        LRU_STORAGE_INDEX_PREFIX: "LRU:INDEX:",
        LRU_STORAGE_DATA_PREFIX: "LRU:DATA:",
        SHEET_DATA: "sheet-data:",
        SETTING_FOR_SHEET: "sheet-settings:id:",
        SHEET_RATING: "sheet-rating:id:",
        SHEET_CUSTOM_META: "sheet-custom-meta:",
        HOT_QUERIES_FOR_INSTRUMENT: "hot-queries:instrument:",
        YPZ_PREFIX: "ypz:"
    };
    async function pa(t, n) {
        if (wa())
            try {
                await ba(),
                null == n ? await fa(t) : await la(t, n)
            } catch (t) {
                self.captureException && self.captureException(t)
            }
    }
    async function ma(t) {
        if (!wa())
            return null;
        try {
            return await ba(),
            aa(t)
        } catch (t) {
            return self.captureException && self.captureException(t),
            null
        }
    }
    async function ya(t, n) {
        if (n && !(n instanceof Object))
            throw new Error("Value is not JSON: key=" + t + ", value=" + n);
        return await pa(t, n ? JSON.stringify(n) : null)
    }
    async function ga(t) {
        const n = await ma(t);
        try {
            return null == n ? null : JSON.parse(n)
        } catch (t) {
            return null
        }
    }
    async function ba() {
        if (!da && wa())
            try {
                await ha(),
                da = !0
            } catch (t) {}
    }
    function wa() {
        return !!window.indexedDB
    }
    const xa = zt("Event");
    let ka = null;
    const Sa = {
        SCROLL: "scroll",
        TOUCH_START: "touchstart",
        TOUCH_MOVE: "touchmove",
        TOUCH_END: "touchend"
    };
    function Ea(t, n, e) {
        return t.addEventListener(n, e, !!Ta() && {
            passive: !0
        }),
        () => t.removeEventListener(n, e)
    }
    function Ta() {
        if (null != ka)
            return ka;
        try {
            const t = Object.defineProperty({}, "passive", {
                get: function() {
                    ka = !0
                }
            });
            window.addEventListener("testPassive", null, t),
            window.removeEventListener("testPassive", null, t)
        } catch (t) {}
        return ka || xa("Passive event not supported."),
        ka
    }
    function Oa(t, n) {
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
    const Ca = {}
      , Aa = "qrcode"
      , Xa = "ar"
      , Ia = "nier"
      , _a = "hexi"
      , Ma = "AWSC"
      , Ra = [Ma];
    async function Da(t) {
        return Ca[t] || (Ca[t] = new Promise((n => {
            self[t] ? n(Ba(t)) : n(ja(t).then(( () => Ba(t))))
        }
        ))),
        Ca[t]
    }
    function ja(t) {
        return Oa(cn(`script[data-name=${t}]`), "load")
    }
    function Ba(t) {
        const n = self[t];
        return Ra.indexOf(t) < 0 && delete self[t],
        n
    }
    function Pa({id: t, format: n, draftId: e}) {
        return t ? Ti(t) ? wt("/draft", {
            format: n
        }, {
            id: t
        }) : wt("/draft", {
            format: n
        }, e ? {
            id: e
        } : {
            fromSheet: t
        }) : wt("/draft", {
            format: n
        })
    }
    async function qa(t) {
        return await qt(wt(di, {
            code: t,
            instrument: Si()
        }))
    }
    async function $a(t) {
        const n = wt(di, {
            code: t,
            instrument: Si()
        });
        return await jt(n, {
            method: "DELETE"
        })
    }
    async function Fa(t, n) {
        if (await ya(va.SETTING_FOR_SHEET + t, n),
        Ti(t))
            return !0;
        const e = wt(vi, {
            code: t,
            screen: La()
        });
        return await $t(e, n || {}, {
            silent: !0
        })
    }
    async function Na(t) {
        return jt(wt(li, {
            code: t
        }), {
            method: "DELETE"
        })
    }
    async function za(t, n) {
        const e = await jt(wt(fi, {
            id: t
        }), {
            method: "DELETE"
        });
        return n && await pa(va.SHEET_DATA + n, null),
        e
    }
    function La() {
        const t = screen.width;
        return t <= 600 ? 0 : t <= 1024 ? 1 : 2
    }
    const Ga = gt(Za);
    function Ua() {
        return Ka(Ut.USER_DATA_USER_INFO)
    }
    async function Ha(t=!1) {
        if (!t && !Wt.getBoolean(Ut.USER_DATA_PORTFOLIO_STALE)) {
            const t = Va();
            if (t)
                return t
        }
        const n = await Ga("/api/user/portfolio");
        return Qa(n),
        Wt.setBoolean(Ut.USER_DATA_PORTFOLIO_STALE, !1),
        n
    }
    function Va() {
        return Ka(Ut.USER_DATA_USER_PORTFOLIO)
    }
    function Wa(t) {
        return jt(`/api/media/audio?code=${t}`, {
            method: "DELETE"
        }).then((n => {
            if (n) {
                const n = Va();
                n && n.audios && (n.audios = n.audios.filter((n => n.audioCode !== t)),
                Qa(n))
            }
            return n
        }
        ))
    }
    function Ja() {
        Ya(null),
        Qa(null)
    }
    function Ka(t) {
        const n = Wt.getJson(t);
        return n && 0 !== Object.keys(n).length ? n : null
    }
    function Ya(t) {
        void 0 !== t && Wt.setJson(Ut.USER_DATA_USER_INFO, t)
    }
    function Qa(t) {
        void 0 !== t && Wt.setJson(Ut.USER_DATA_USER_PORTFOLIO, t)
    }
    async function Za(t, n=!1) {
        try {
            const e = await Mt(t, null, {
                allowNonLogin: !0,
                silent: n
            });
            return await e.json()
        } catch (t) {
            if (t instanceof Ot && t.statusCode === Y.INVALID_CREDENTIAL)
                return Ja(),
                null;
            throw t
        }
    }
    function tl(t) {
        return !!t && (Si() === Z.PIANO && t.isPianoMember || t.isMember)
    }
    async function nl() {
        const {success: t} = await Dt("/auth/logout");
        return t && Ja(),
        t
    }
    function el() {}
    const il = t => t;
    function rl(t, n) {
        for (const e in n)
            t[e] = n[e];
        return t
    }
    function ol(t) {
        return t()
    }
    function sl() {
        return Object.create(null)
    }
    function ul(t) {
        t.forEach(ol)
    }
    function cl(t) {
        return "function" == typeof t
    }
    function al(t, n) {
        return t != t ? n == n : t !== n || t && "object" == typeof t || "function" == typeof t
    }
    function ll(t) {
        return 0 === Object.keys(t).length
    }
    function fl(t, ...n) {
        if (null == t)
            return el;
        const e = t.subscribe(...n);
        return e.unsubscribe ? () => e.unsubscribe() : e
    }
    function hl(t, n, e) {
        t.$$.on_destroy.push(fl(n, e))
    }
    function dl(t, n, e, i) {
        if (t) {
            const r = vl(t, n, e, i);
            return t[0](r)
        }
    }
    function vl(t, n, e, i) {
        return t[1] && i ? rl(e.ctx.slice(), t[1](i(n))) : e.ctx
    }
    function pl(t, n, e, i) {
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
    }
    function ml(t, n, e, i, r, o, s) {
        const u = pl(n, i, r, o);
        if (u) {
            const r = vl(n, e, i, s);
            t.p(r, u)
        }
    }
    function yl(t) {
        return null == t ? "" : t
    }
    function gl(t) {
        return t && cl(t.destroy) ? t.destroy : el
    }
    const bl = "undefined" != typeof window;
    let wl = bl ? () => window.performance.now() : () => Date.now()
      , xl = bl ? t => requestAnimationFrame(t) : el;
    const kl = new Set;
    function Sl(t) {
        kl.forEach((n => {
            n.c(t) || (kl.delete(n),
            n.f())
        }
        )),
        0 !== kl.size && xl(Sl)
    }
    function El(t) {
        let n;
        return 0 === kl.size && xl(Sl),
        {
            promise: new Promise((e => {
                kl.add(n = {
                    c: t,
                    f: e
                })
            }
            )),
            abort() {
                kl.delete(n)
            }
        }
    }
    function Tl(t, n) {
        t.appendChild(n)
    }
    function Ol(t, n, e) {
        t.insertBefore(n, e || null)
    }
    function Cl(t) {
        t.parentNode.removeChild(t)
    }
    function Al(t, n) {
        for (let e = 0; e < t.length; e += 1)
            t[e] && t[e].d(n)
    }
    function Xl(t) {
        return document.createElement(t)
    }
    function Il(t) {
        return document.createTextNode(t)
    }
    function _l() {
        return Il(" ")
    }
    function Ml() {
        return Il("")
    }
    function Rl(t, n, e, i) {
        return t.addEventListener(n, e, i),
        () => t.removeEventListener(n, e, i)
    }
    function Dl(t, n, e) {
        null == e ? t.removeAttribute(n) : t.getAttribute(n) !== e && t.setAttribute(n, e)
    }
    function jl(t, n, e) {
        n in t ? t[n] = e : Dl(t, n, e)
    }
    function Bl(t) {
        const n = [];
        for (let e = 0; e < t.length; e += 1)
            n.push({
                start: t.start(e),
                end: t.end(e)
            });
        return n
    }
    function Pl(t) {
        return Array.from(t.childNodes)
    }
    function ql(t, n) {
        n = "" + n,
        t.wholeText !== n && (t.data = n)
    }
    function $l(t, n) {
        t.value = null == n ? "" : n
    }
    function Fl(t, n, e, i) {
        t.style.setProperty(n, e, i ? "important" : "")
    }
    function Nl(t, n) {
        for (let e = 0; e < t.options.length; e += 1) {
            const i = t.options[e];
            if (i.__value === n)
                return void (i.selected = !0)
        }
    }
    function zl(t) {
        const n = t.querySelector(":checked") || t.options[0];
        return n && n.__value
    }
    function Ll(t, n, e) {
        t.classList[e ? "add" : "remove"](n)
    }
    function Gl(t, n) {
        const e = document.createEvent("CustomEvent");
        return e.initCustomEvent(t, !1, !1, n),
        e
    }
    class Ul {
        constructor(t=null) {
            this.a = t,
            this.e = this.n = null
        }
        m(t, n, e=null) {
            this.e || (this.e = Xl(n.nodeName),
            this.t = n,
            this.h(t)),
            this.i(e)
        }
        h(t) {
            this.e.innerHTML = t,
            this.n = Array.from(this.e.childNodes)
        }
        i(t) {
            for (let n = 0; n < this.n.length; n += 1)
                Ol(this.t, this.n[n], t)
        }
        p(t) {
            this.d(),
            this.h(t),
            this.i(this.a)
        }
        d() {
            this.n.forEach(Cl)
        }
    }
    const Hl = new Set;
    let Vl = 0, Wl;
    function Jl(t) {
        let n = 5381
          , e = t.length;
        for (; e--; )
            n = (n << 5) - n ^ t.charCodeAt(e);
        return n >>> 0
    }
    function Kl(t, n, e, i, r, o, s, u=0) {
        const c = 16.666 / i;
        let a = "{\n";
        for (let t = 0; t <= 1; t += c) {
            const i = n + (e - n) * o(t);
            a += 100 * t + `%{${s(i, 1 - i)}}\n`
        }
        const l = a + `100% {${s(e, 1 - e)}}\n}`
          , f = `__svelte_${Jl(l)}_${u}`
          , h = t.ownerDocument;
        Hl.add(h);
        const d = h.__svelte_stylesheet || (h.__svelte_stylesheet = h.head.appendChild(Xl("style")).sheet)
          , v = h.__svelte_rules || (h.__svelte_rules = {});
        v[f] || (v[f] = !0,
        d.insertRule(`@keyframes ${f} ${l}`, d.cssRules.length));
        const p = t.style.animation || "";
        return t.style.animation = `${p ? `${p}, ` : ""}${f} ${i}ms linear ${r}ms 1 both`,
        Vl += 1,
        f
    }
    function Yl(t, n) {
        const e = (t.style.animation || "").split(", ")
          , i = e.filter(n ? t => t.indexOf(n) < 0 : t => -1 === t.indexOf("__svelte"))
          , r = e.length - i.length;
        r && (t.style.animation = i.join(", "),
        Vl -= r,
        Vl || Ql())
    }
    function Ql() {
        xl(( () => {
            Vl || (Hl.forEach((t => {
                const n = t.__svelte_stylesheet;
                let e = n.cssRules.length;
                for (; e--; )
                    n.deleteRule(e);
                t.__svelte_rules = {}
            }
            )),
            Hl.clear())
        }
        ))
    }
    function Zl(t) {
        Wl = t
    }
    function tf() {
        if (!Wl)
            throw new Error("Function called outside component initialization");
        return Wl
    }
    function nf(t) {
        tf().$$.on_mount.push(t)
    }
    function ef(t) {
        tf().$$.on_destroy.push(t)
    }
    function rf() {
        const t = tf();
        return (n, e) => {
            const i = t.$$.callbacks[n];
            if (i) {
                const r = Gl(n, e);
                i.slice().forEach((n => {
                    n.call(t, r)
                }
                ))
            }
        }
    }
    function of(t, n) {
        tf().$$.context.set(t, n)
    }
    function sf(t) {
        return tf().$$.context.get(t)
    }
    function uf(t, n) {
        const e = t.$$.callbacks[n.type];
        e && e.slice().forEach((t => t(n)))
    }
    const cf = []
      , af = []
      , lf = []
      , ff = []
      , hf = Promise.resolve();
    let df = !1;
    function vf() {
        df || (df = !0,
        hf.then(bf))
    }
    function pf(t) {
        lf.push(t)
    }
    function mf(t) {
        ff.push(t)
    }
    let yf = !1;
    const gf = new Set;
    function bf() {
        if (!yf) {
            yf = !0;
            do {
                for (let t = 0; t < cf.length; t += 1) {
                    const n = cf[t];
                    Zl(n),
                    wf(n.$$)
                }
                for (Zl(null),
                cf.length = 0; af.length; )
                    af.pop()();
                for (let t = 0; t < lf.length; t += 1) {
                    const n = lf[t];
                    gf.has(n) || (gf.add(n),
                    n())
                }
                lf.length = 0
            } while (cf.length);
            for (; ff.length; )
                ff.pop()();
            df = !1,
            yf = !1,
            gf.clear()
        }
    }
    function wf(t) {
        if (null !== t.fragment) {
            t.update(),
            ul(t.before_update);
            const n = t.dirty;
            t.dirty = [-1],
            t.fragment && t.fragment.p(t.ctx, n),
            t.after_update.forEach(pf)
        }
    }
    let xf;
    function kf() {
        return xf || (xf = Promise.resolve(),
        xf.then(( () => {
            xf = null
        }
        ))),
        xf
    }
    function Sf(t, n, e) {
        t.dispatchEvent(Gl(`${n ? "intro" : "outro"}${e}`))
    }
    const Ef = new Set;
    let Tf;
    function Of() {
        Tf = {
            r: 0,
            c: [],
            p: Tf
        }
    }
    function Cf() {
        Tf.r || ul(Tf.c),
        Tf = Tf.p
    }
    function Af(t, n) {
        t && t.i && (Ef.delete(t),
        t.i(n))
    }
    function Xf(t, n, e, i) {
        if (t && t.o) {
            if (Ef.has(t))
                return;
            Ef.add(t),
            Tf.c.push(( () => {
                Ef.delete(t),
                i && (e && t.d(1),
                i())
            }
            )),
            t.o(n)
        }
    }
    const If = {
        duration: 0
    };
    function _f(t, n, e) {
        let i, r, o = n(t, e), s = !1, u = 0;
        function c() {
            i && Yl(t, i)
        }
        function a() {
            const {delay: n=0, duration: e=300, easing: a=il, tick: l=el, css: f} = o || If;
            f && (i = Kl(t, 0, 1, e, n, a, f, u++)),
            l(0, 1);
            const h = wl() + n
              , d = h + e;
            r && r.abort(),
            s = !0,
            pf(( () => Sf(t, !0, "start"))),
            r = El((n => {
                if (s) {
                    if (n >= d)
                        return l(1, 0),
                        Sf(t, !0, "end"),
                        c(),
                        s = !1;
                    if (n >= h) {
                        const t = a((n - h) / e);
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
                l || (Yl(t),
                cl(o) ? (o = o(),
                kf().then(a)) : a())
            },
            invalidate() {
                l = !1
            },
            end() {
                s && (c(),
                s = !1)
            }
        }
    }
    function Mf(t, n) {
        const e = {}
          , i = {}
          , r = {
            $$scope: 1
        };
        let o = t.length;
        for (; o--; ) {
            const s = t[o]
              , u = n[o];
            if (u) {
                for (const t in s)
                    t in u || (i[t] = 1);
                for (const t in u)
                    r[t] || (e[t] = u[t],
                    r[t] = 1);
                t[o] = u
            } else
                for (const t in s)
                    r[t] = 1
        }
        for (const t in i)
            t in e || (e[t] = void 0);
        return e
    }
    function Rf(t) {
        return "object" == typeof t && null !== t ? t : {}
    }
    function Df(t, n, e) {
        const i = t.$$.props[n];
        void 0 !== i && (t.$$.bound[i] = e,
        e(t.$$.ctx[i]))
    }
    function jf(t) {
        t && t.c()
    }
    function Bf(t, n, e, i) {
        const {fragment: r, on_mount: o, on_destroy: s, after_update: u} = t.$$;
        r && r.m(n, e),
        i || pf(( () => {
            const n = o.map(ol).filter(cl);
            s ? s.push(...n) : ul(n),
            t.$$.on_mount = []
        }
        )),
        u.forEach(pf)
    }
    function Pf(t, n) {
        const e = t.$$;
        null !== e.fragment && (ul(e.on_destroy),
        e.fragment && e.fragment.d(n),
        e.on_destroy = e.fragment = null,
        e.ctx = [])
    }
    function qf(t, n) {
        -1 === t.$$.dirty[0] && (cf.push(t),
        vf(),
        t.$$.dirty.fill(0)),
        t.$$.dirty[n / 31 | 0] |= 1 << n % 31
    }
    function $f(t, n, e, i, r, o, s=[-1]) {
        const u = Wl;
        Zl(t);
        const c = t.$$ = {
            fragment: null,
            ctx: null,
            props: o,
            update: el,
            not_equal: r,
            bound: sl(),
            on_mount: [],
            on_destroy: [],
            on_disconnect: [],
            before_update: [],
            after_update: [],
            context: new Map(u ? u.$$.context : n.context || []),
            callbacks: sl(),
            dirty: s,
            skip_bound: !1
        };
        let a = !1;
        if (c.ctx = e ? e(t, n.props || {}, ( (n, e, ...i) => {
            const o = i.length ? i[0] : e;
            return c.ctx && r(c.ctx[n], c.ctx[n] = o) && (!c.skip_bound && c.bound[n] && c.bound[n](o),
            a && qf(t, n)),
            e
        }
        )) : [],
        c.update(),
        a = !0,
        ul(c.before_update),
        c.fragment = !!i && i(c.ctx),
        n.target) {
            if (n.hydrate) {
                const t = Pl(n.target);
                c.fragment && c.fragment.l(t),
                t.forEach(Cl)
            } else
                c.fragment && c.fragment.c();
            n.intro && Af(t.$$.fragment),
            Bf(t, n.target, n.anchor, n.customElement),
            bf()
        }
        Zl(u)
    }
    class Ff {
        $destroy() {
            Pf(this, 1),
            this.$destroy = el
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
            this.$$set && !ll(t) && (this.$$.skip_bound = !0,
            this.$$set(t),
            this.$$.skip_bound = !1)
        }
    }
    const Nf = [];
    function zf(t, n) {
        return {
            subscribe: Lf(t, n).subscribe
        }
    }
    function Lf(t, n=el) {
        let e;
        const i = [];
        function r(n) {
            if (al(t, n) && (t = n,
            e)) {
                const n = !Nf.length;
                for (let n = 0; n < i.length; n += 1) {
                    const e = i[n];
                    e[1](),
                    Nf.push(e, t)
                }
                if (n) {
                    for (let t = 0; t < Nf.length; t += 2)
                        Nf[t][0](Nf[t + 1]);
                    Nf.length = 0
                }
            }
        }
        return {
            set: r,
            update: function(n) {
                r(n(t))
            },
            subscribe: function(o, s=el) {
                const u = [o, s];
                return i.push(u),
                1 === i.length && (e = n(r) || el),
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
    const Gf = Uf();
    function Uf() {
        const {subscribe: t, set: n} = Lf(void 0)
          , e = Si();
        return e && n(e),
        {
            subscribe: t,
            set: t => {
                ki(t) && n(t)
            }
        }
    }
    const Hf = "#faf9f9"
      , Vf = zt("Fullscreen");
    function Wf() {
        const t = document.body;
        return t.requestFullscreen || t.webkitRequestFullscreen
    }
    async function Jf(t=document.documentElement) {
        Vf("requestFullscreen"),
        t.requestFullscreen ? await t.requestFullscreen().catch(( () => {}
        )) : t.webkitRequestFullscreen && await t.webkitRequestFullscreen().catch(( () => {}
        ))
    }
    async function Kf() {
        Vf("exitFullscreen"),
        (document.fullscreenElement || document.webkitFullscreenElement) && (document.exitFullscreen ? await document.exitFullscreen().catch(( () => {}
        )) : document.webkitExitFullscreen && await document.webkitExitFullscreen().catch(( () => {}
        )))
    }
    function Yf(t, n, e) {
        const i = () => {
            document.fullscreenElement || document.webkitFullscreenElement ? (Vf("entered"),
            n()) : (Vf("exited"),
            e(),
            t.removeEventListener("fullscreenchange", i),
            t.removeEventListener("webkitfullscreenchange", i))
        }
        ;
        t.addEventListener("fullscreenchange", i),
        t.addEventListener("webkitfullscreenchange", i)
    }
    const Qf = "WebView"
      , Zf = zt(Qf)
      , th = Lt(Qf)
      , nh = {
        DEFAULT: "default",
        LIGHT: "light",
        DARK: "dark"
    }
      , eh = {
        PORTRAIT: "portrait",
        LANDSCAPE: "landscape"
    }
      , ih = screen && screen.orientation && screen.orientation.lock
      , rh = "已将分享内容复制到了剪贴板"
      , oh = "剪贴板获取失败，请尝试升级app";
    class sh {
        constructor() {
            this.j = new St,
            this.$ = new St,
            this.N = new St,
            this.L = 0,
            this.H = {}
        }
        install(t) {
            if (this.V = t,
            t.webview = {
                trackEvent: na,
                pause: () => {
                    this.j.fire()
                }
                ,
                resume: t => {
                    this.$.fire(t)
                }
                ,
                destroy: () => {
                    this.N.fire()
                }
                ,
                onDataResponse: (t, n) => {
                    this.H[t] && this.H[t].resolve(n)
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
                this.J("start") || this.K("start") || Zf("webview based app started")
            }
            ), 1)
        }
        isSupported(t) {
            Zf("isSupported", t);
            let n = this.Y();
            if (n)
                return n.isSupported ? n.isSupported(t) : !!n[t];
            if (n = this.Z(),
            n) {
                let n = this.V.iosNativeApi;
                return n || (n = bi().api,
                n = n ? n.split(",") : []),
                n = n.concat("exit", "openAppStore", "shareApp", "shareText"),
                n.indexOf(t) >= 0
            }
            return "lockScreenOrientation" === t ? ih : 0 !== t.indexOf("request") && (!["openWeComKefu", "setColorMode"].includes(t) && !!this[t])
        }
        isSharingSupported(t) {
            Zf("isSharingSupported", t);
            let n = this.Y();
            if (n)
                return !!n.isSharingSupported && n.isSharingSupported(t);
            if (n = this.Z(),
            n && this.V.iosNativeData) {
                return (this.V.iosNativeData.sharingSupported || []).indexOf(t) >= 0
            }
            return !1
        }
        replacePage(t) {
            Zf("replacePage", {
                path: t
            }),
            this.isSupported("replacePage") ? this.K("replacePage", {
                path: t
            }) || this.J("replacePage", t) || (history.replaceState(void 0, void 0, t),
            history.go(0)) : Cn.error("请升级到最新版本app")
        }
        keepScreenOn(t) {
            Zf("keepScreenOn", t),
            this.J("keepScreenOn", t) || this.K("keepScreenOn", {
                enable: t
            })
        }
        async lockScreenOrientation(t) {
            Zf("lockScreenOrientation", t),
            this.J("lockScreenOrientation", t) || this.K("lockScreenOrientation", {
                orientation: t
            }) || ih && (t === eh.PORTRAIT ? await Kf() : t === eh.LANDSCAPE && await Jf(),
            screen.orientation.lock(t).catch(( () => {}
            )))
        }
        print() {
            Zf("print"),
            this.J("print") || this.K("print") || print()
        }
        getSystemInfo() {
            Zf("getSystemInfo");
            const t = this.Y();
            return t && t.getSystemInfo ? JSON.parse(t.getSystemInfo()) : this.Z() && this.V.iosNativeData && this.V.iosNativeData.systemInfo || []
        }
        getSourceAppStore() {
            Zf("getSourceAppStore");
            const t = this.Y();
            return t && t.getSourceAppStore ? t.getSourceAppStore() : null
        }
        openAppStore() {
            Zf("openAppStore"),
            this.J("openAppStore", bu) || this.K("openAppStore", {
                appId: wu
            })
        }
        openWeComKefu(t) {
            Zf("openWeComKefu");
            const n = {
                url: t
            };
            this.J("openWeComKefu", n) || this.K("openWeComKefu", n)
        }
        shareApp() {
            Zf("shareApp"),
            this.J("shareApp") || this.K("shareApp") || uh("推荐你琴谱app《有谱么》:" + new URL("/",location.href).href)
        }
        shareObject(t) {
            if (Zf("shareObject", t),
            this.J("shareObject", t))
                return;
            if (this.K("shareObject", t))
                return;
            const {text: n, pageUrl: e} = t;
            uh(n + ` ( ${e} )`)
        }
        shareObjectTo(t) {
            if (Zf("shareObjectTo", t),
            this.J("shareObjectTo", t))
                return;
            if (this.K("shareObjectTo", t))
                return;
            const {text: n, pageUrl: e} = t;
            uh(n + ` ( ${e} )`)
        }
        shareText({subject: t, text: n, url: e, imageSrc: i}) {
            Zf("shareText");
            const r = {
                subject: t,
                text: n,
                url: e,
                imageSrc: i || f
            }
              , o = {
                subject: t,
                text: n + ` ( ${e} )`
            };
            this.J("shareText", o) || this.K("shareText", r) || uh(n + ` ( ${e} )`)
        }
        copyToClipboard(t) {
            if (Zf("copyToClipboard", t),
            this.isAndroid() && this.isSupported("copyToClipboard"))
                return this.J("copyToClipboard", t),
                void Cn.show(rh);
            uh(t)
        }
        requestAuthToken(t) {
            return Zf("requestAuthToken", t),
            this.tt("requestAuthToken", {
                type: t
            })
        }
        requestWxPay(t) {
            Zf("requestWxPay", t),
            this.J("requestWxPay", t)
        }
        requestApplePay(t) {
            Zf("requestApplePay", t),
            this.K("requestApplePay", t)
        }
        requestAppleRestore() {
            Zf("requestAppleRestore"),
            this.K("requestAppleRestore")
        }
        requestDeviceToken() {
            return Zf("requestDeviceToken"),
            this.tt("requestDeviceToken")
        }
        requestMuteStatus() {
            return Zf("requestMuteStatus"),
            this.tt("requestMuteStatus")
        }
        showInputKeyboard() {
            Zf("showInputKeyboard"),
            this.J("showInputKeyboard")
        }
        setColorMode(t) {
            const n = "setColorMode";
            Zf(n + ": " + t),
            this.J(n, t) || this.K(n, {
                colorMode: t
            })
        }
        getColorMode() {
            Zf("getColorMode");
            let t = this.Y();
            return t ? t.getColorMode ? t.getColorMode() : nh.DEFAULT : (t = this.Z(),
            t && this.V.iosNativeData && this.V.iosNativeData.colorMode || nh.DEFAULT)
        }
        setColors(t) {
            const n = "setColors"
              , e = {
                background: Hf,
                statusBar: Hf,
                ...t
            };
            Zf(n, e),
            this.J(n, e) || this.K(n, e)
        }
        saveValueIfNotExist(t, n) {
            const e = "saveValueIfNotExist";
            Zf(e + ": " + t + "=" + n);
            const i = {
                key: t,
                value: n
            };
            this.J(e, i) || this.K(e, i)
        }
        saveValue(t, n) {
            const e = "saveValue";
            Zf(e + ": " + t + "=" + n);
            const i = {
                key: t,
                value: n
            };
            this.J(e, i) || this.K(e, i)
        }
        readValue(t) {
            Zf("readValue: " + t);
            let n = this.Y();
            return n ? n.readValue ? n.readValue(t) : null : (n = this.Z(),
            n && this.V.iosNativeData && this.V.iosNativeData.values ? this.V.iosNativeData.values[t] : null)
        }
        exit(t) {
            Zf("exit"),
            this.J("exit") || this.K("exit") || xi(t)
        }
        kill() {
            Zf("kill"),
            this.isSupported("kill") ? this.J("kill") || this.K("kill") || (location.href = "/") : this.exit(!0)
        }
        onPause(t) {
            return this.j.add(t)
        }
        onResume(t) {
            return this.$.add(t)
        }
        onDestroy(t) {
            return this.N.add(t)
        }
        hasNative() {
            return !!this.Y() || !!this.Z()
        }
        isAndroid() {
            return !!this.Y()
        }
        isIos() {
            return !!this.Z()
        }
        Y() {
            return this.V.native
        }
        Z() {
            return this.V.webkit && this.V.webkit.messageHandlers && this.V.webkit.messageHandlers.native
        }
        tt(t, n={}) {
            const e = this.L++
              , i = new Jt;
            return this.H[e] = i,
            n.messageChannelId = e,
            this.J(t, n) || this.K(t, n) || Zf(t, n),
            i.promise
        }
        J(t, n) {
            const e = this.Y();
            if (!e)
                return !1;
            if (e[t])
                try {
                    void 0 === n ? e[t]() : e[t]("object" == typeof n ? JSON.stringify(n) : n)
                } catch (t) {
                    th(t)
                }
            return !0
        }
        K(t, n={}) {
            const e = this.Z();
            return !!e && (e.postMessage({
                action: t,
                data: n
            }),
            !0)
        }
    }
    function uh(t) {
        navigator.clipboard && navigator.clipboard.writeText(t).then(( () => {
            Cn.show(rh)
        }
        ), ( () => {
            Cn.error(oh)
        }
        ))
    }
    let ch, ah;
    function lh(t) {
        const n = t.isSupported("setColorMode");
        ah = n ? fh(t) : hh(),
        ch = n ? dh() : vh(ah)
    }
    function fh(t) {
        const n = t.getColorMode() || nh.DEFAULT
          , {subscribe: e, set: i} = Lf(n);
        return {
            subscribe: e,
            set: n => {
                t.setColorMode(n),
                i(n)
            }
        }
    }
    function hh() {
        const {subscribe: t, set: n} = Lf(ph());
        return {
            subscribe: t,
            set: t => {
                t === nh.DEFAULT ? Wt.removeItem(Ut.MINE_SELECTED_COLOR_MODE) : Wt.setItem(Ut.MINE_SELECTED_COLOR_MODE, t),
                n(t)
            }
        }
    }
    function dh() {
        const [t,n] = yh();
        return zf(t, (t => n ? n(t) : () => {}
        ))
    }
    function vh(t) {
        let[n,e] = yh()
          , i = ph();
        return zf(n, (r => {
            mh(i, n, r);
            const o = t.subscribe((t => {
                i = t,
                mh(i, n, r)
            }
            ));
            let s;
            return e && (s = e((t => {
                n = t,
                mh(i, n, r)
            }
            ))),
            () => {
                o(),
                s && s()
            }
        }
        ))
    }
    function ph() {
        return Wt.getItem(Ut.MINE_SELECTED_COLOR_MODE) || nh.DEFAULT
    }
    function mh(t, n, e) {
        t === nh.DEFAULT ? e(n) : t === nh.DARK ? e(!0) : t === nh.LIGHT && e(!1)
    }
    function yh() {
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
    const gh = "Fetch"
      , bh = zt(gh)
      , wh = self.document;
    let xh = 0;
    function kh() {
        _t(( ({url: t, init: n, options: e}) => {
            bh("request: " + t),
            e.silent || Sh()
        }
        ), ( ({url: t, init: n, options: e, res: i}) => {
            bh("response: " + t),
            e.silent || Eh()
        }
        ), ( ({url: t, init: n, options: e, error: i}) => {
            bh("rejection: " + t, i);
            const {silent: r, allowNonLogin: o} = e;
            if (!r) {
                let t;
                i instanceof Tt || (i instanceof Et ? t = "网络超时" : i instanceof Ot ? o && i.statusCode === Y.INVALID_CREDENTIAL || (t = i.message) : t = "无网络连接"),
                t && Cn.error(t),
                Eh()
            }
        }
        ))
    }
    function Sh() {
        xh++,
        Th()
    }
    function Eh() {
        xh--,
        yt(300).then(( () => Th()))
    }
    function Th() {
        xh > 0 ? mn(wh.body, "loading") : yn(wh.body, "loading")
    }
    const Oh = "ontouchstart"in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
    function Ch() {
        return Math.min(screen.height, screen.width) <= 500
    }
    const Ah = {};
    function Xh(t) {
        if (!Ah[t]) {
            const n = fn("script", {
                async: "",
                src: t
            });
            Ah[t] = new Promise(( (e, i) => {
                n.onload = e,
                n.onerror = () => i(new Error("Failed to load script: " + t))
            }
            )),
            document.head.appendChild(n)
        }
        return Ah[t]
    }
    function Ih(t) {
        const n = fn("style", {
            type: "text/css"
        });
        n.innerHTML = t,
        document.head.appendChild(n)
    }
    const _h = "SW"
      , Mh = zt(_h)
      , Rh = Lt(_h)
      , Dh = location.origin + "/";
    function jh() {
        if ("https:" === location.protocol && "serviceWorker"in navigator) {
            const t = Ph();
            Mh("SW enabled = " + t),
            "function" == typeof navigator.serviceWorker.getRegistrations && navigator.serviceWorker.getRegistrations().then((function(n) {
                for (let e = 0; e < n.length; ++e)
                    t && n[e].scope === Dh || (Mh("Unregistering SW", {
                        scope: n[e].scope
                    }),
                    n[e].unregister().catch((t => {
                        Rh(t, "Failed to unregister service worker.")
                    }
                    )))
            }
            )).catch((t => {
                Rh(t, "Failed to get service worker registration.")
            }
            )),
            t && (window.addEventListener("load", (function() {
                Mh("Registering SW", {
                    scope: Dh
                }),
                navigator.serviceWorker.register("/sw.js").catch((t => {
                    Rh(t, "Failed to register service worker.")
                }
                ))
            }
            )),
            !$h() && Nh() && Bh())
        }
    }
    function Bh() {
        let t;
        const n = document.querySelector("#addToHomeScreen");
        n && (Mh("initializeAddToHomePrompt"),
        window.addEventListener("beforeinstallprompt", (function(e) {
            Mh("beforeinstallprompt event"),
            e.preventDefault(),
            t = e,
            n.classList.remove("hide")
        }
        )),
        window.addEventListener("appinstalled", (function() {
            Mh("appinstalled event"),
            n.classList.add("hide")
        }
        )),
        self.addToHomeScreen = () => {
            Mh("addToHomeScreen event"),
            t && t.prompt()
        }
        )
    }
    function Ph() {
        return !!qh() || !$h() && Nh() && !Fh()
    }
    function qh() {
        return location.search.indexOf("sw=1") > 0
    }
    function $h() {
        return 0 === location.pathname.indexOf("/e/")
    }
    function Fh() {
        return 0 === location.pathname.indexOf("/i/") || "/i" === location.pathname
    }
    function Nh() {
        const t = [/Android/i, /iPhone/i, /iPad/i, /Windows Phone/i];
        for (let n = 0; n < t.length; ++n)
            if (navigator.userAgent.match(t[n]))
                return !0;
        return !1
    }
    const zh = zt("Application")
      , Lh = bi()["no-tracking"];
    function Gh(t, {errorReporting: n=!0, allowHorizontalScreen: e=!1}={}) {
        if (E(navigator.userAgent))
            return zh("Execuse me? IE11?"),
            void Hh();
        n && !Lh && Qc(),
        jh(),
        setTimeout(( () => {
            const n = new sh;
            n.install(self),
            !e && Ch() && n.lockScreenOrientation(eh.PORTRAIT);
            let i = [];
            Lh || (i = Zc(n)),
            Wh().then(( () => {
                i.forEach((t => {
                    Xh(t).catch(( () => {}
                    ))
                }
                )),
                Jh()
            }
            )),
            Vh(),
            kh(),
            lh(n),
            ch.subscribe((t => {
                vn("dark", t)
            }
            )),
            Gf.subscribe((t => {
                dn("instrument", t)
            }
            ));
            const r = cn("#c")
              , o = Uh(r);
            o && void 0 !== o.user && (null === o.user ? Ja() : Ya(o.user)),
            t(n, r, o),
            zh("Ready!")
        }
        ), 1)
    }
    function Uh(t) {
        if (!t)
            return {};
        const n = R(t.innerHTML);
        return t.innerHTML = "",
        t.style.display = "",
        n
    }
    function Hh() {
        document.body.innerHTML = '\n<h1 style="text-align: center; color: indianred">有谱么网站不支持IE11，请更新浏览器。</h1>\n<br>\n<h2 style="text-align: center">如果是QQ或360之类的双核浏览器，请切换至"极速模式"</h2>\n    '
    }
    function Vh() {
        window.navigator.standalone && window.addEventListener("click", (function(t) {
            const n = t.target.closest("a");
            if (n && n.href && 0 === n.href.indexOf(window.location.origin))
                return window.location = n.href,
                t.preventDefault(),
                !1
        }
        ), !1)
    }
    async function Wh() {
        if ("loading" === document.readyState)
            return Oa(document, "DOMContentLoaded")
    }
    function Jh() {
        Ih(`@font-face {\n  font-family: 'iconfont';\n  src: url('${m}') format('woff2'),\n  url('${y}') format('woff'),\n  url('${g}') format('truetype');\n}`)
    }
    class Kh extends HTMLElement {
        connectedCallback() {
            const {chord: t, chordStyle: n, instrument: e, scale: i=1, dark: r} = this.dataset
              , o = this.textContent;
            let s;
            s = n === rt.INLINE && Object.values(Z).includes(e) ? `<hexi-chord contenteditable='false' size='small' name='${t}' instrument='${e}' scale='${i}' ${r ? "dark" : ""}></hexi-chord>` : `<div class='chord' contenteditable='false'>${t[0]}<span class='chord-type'>${t.substring(1).replace(/@.*$/, "")}</span></div>`,
            this.innerHTML = s + `<div class="text" text-value>${o}</div>`
        }
    }
    class Yh extends HTMLElement {
        connectedCallback() {
            const t = this.textContent;
            this.innerHTML = `<div text-value>${t}</div>`
        }
    }
    class Qh extends HTMLElement {
        connectedCallback() {
            const {noLineBreak: t} = this.dataset;
            this.innerHTML = t ? "" : "<br>"
        }
    }
    const Zh = {
        INSERT: "i",
        UPDATE: "u",
        DELETE: "d"
    }
      , td = {
        HEADLINE: "HEADLINE",
        TEXT: "TEXT",
        CHORD_ANCHOR: "CHORD_ANCHOR",
        LINE_BREAK: "LINE_BREAK",
        RHYTHM: "RHYTHM",
        TAB: "TAB"
    }
      , nd = ""
      , ed = "​"
      , id = " ";
    function rd(t, n) {
        const e = t.reduce(( (t, n) => Math.max(t, n.id)), 0);
        let i = [];
        const r = [];
        let o = 0
          , s = 0;
        for (; ; ) {
            const u = n[o]
              , c = t[s];
            if (!u && !c)
                break;
            if (u && u.id > e)
                i.push(u),
                o++;
            else if (i.length && (od(r, i, u ? u.id : null),
            i = []),
            u && c && u.id === c.id)
                JSON.stringify(u.value) === JSON.stringify(c.value) && JSON.stringify(u.attributes) === JSON.stringify(c.attributes) || r.push({
                    operation: Zh.UPDATE,
                    id: c.id,
                    item: u
                }),
                o++,
                s++;
            else {
                if (!c)
                    throw new Error("ItemList diff in a bad state." + JSON.stringify({
                        newList: n,
                        oldList: t,
                        newItem: u
                    }));
                r.push({
                    operation: Zh.DELETE,
                    id: c.id
                }),
                s++
            }
        }
        return i.length && od(r, i, null),
        r
    }
    function od(t, n, e) {
        t.push(...n.map((t => ({
            operation: Zh.INSERT,
            id: e,
            item: t
        }))))
    }
    function sd(t) {
        return JSON.parse(JSON.stringify(t))
    }
    function ud(t) {
        return t && [td.CHORD_ANCHOR, td.TEXT, td.HEADLINE].includes(t.type)
    }
    function cd(t) {
        return t && [td.TAB, td.RHYTHM].includes(t.type)
    }
    function ad(t) {
        return cd(t) ? 1 : ud(t) ? t.value.length : 0
    }
    const ld = {
        [Z.GUITAR]: 6,
        [Z.UKULELE]: 4
    }
      , fd = `<span text-value>${ed}</span>`;
    class hd extends HTMLElement {
        static get observedAttributes() {
            return ["data-dark"]
        }
        attributeChangedCallback(t, n, e, i) {
            this.isConnected && this.nt()
        }
        connectedCallback() {
            this.nt()
        }
        nt() {
            const {scale: t=1, instrument: n, rhythm: e, chordStyle: i, dark: r, forEditor: o} = this.dataset;
            let s = `<hexi-rhythm contenteditable='false' string-num="${i === rt.NUMBER ? 0 : ld[n] || 0}" scale="${t}" ${r ? "dark" : ""}>${e}</hexi-rhythm>`;
            o && (s = fd + s + fd),
            this.innerHTML = s
        }
    }
    const dd = `<span text-value>${ed}</span>`;
    class vd extends HTMLElement {
        connectedCallback() {
            const {tab: t, scale: n, forEditor: e, dark: i} = this.dataset;
            let r = `<hexi-tab contenteditable='false' scale='${n}' inline-chords ${i ? "dark" : ""}>${t}</hexi-tab>`;
            e && (r = dd + r + dd),
            this.innerHTML = r
        }
    }
    const pd = {
        TEXT_VALUE: "text-value",
        ROOT: "xhe-root"
    };
    class md extends HTMLElement {
        connectedCallback() {
            this.setAttribute(pd.TEXT_VALUE, "")
        }
    }
    const yd = Lt("XheRenderer")
      , gd = 42
      , bd = 30
      , wd = {
        [td.TEXT]: "xhe-text",
        [td.CHORD_ANCHOR]: "xhe-chord-anchor",
        [td.LINE_BREAK]: "xhe-line-break",
        [td.HEADLINE]: "xhe-headline",
        [td.RHYTHM]: "xhe-rhythm",
        [td.TAB]: "xhe-tab"
    };
    class xd {
        constructor(t, n=!1, e=!1) {
            this.et = t,
            this.it = n,
            this.rt = e;
            const i = Math.random().toString(16).substring(2);
            this.ot = "xhe-" + i + "-",
            this.st = [],
            this.ut = 1,
            this.ct = {},
            this.et.setAttribute(pd.ROOT, ""),
            Ed(this.et, {
                forMobile: this.it,
                forEditor: this.rt
            }),
            this.updateOptions({
                chordStyle: rt.REGULAR
            })
        }
        getItemList() {
            return this.st
        }
        cloneItemList() {
            return sd(this.st)
        }
        updateItemList(t) {
            t = sd(t),
            this.lt(t);
            let n = !1;
            for (let e = 0; e < t.length; ++e) {
                const i = t[e]
                  , r = t[e + 1]
                  , {type: o} = i;
                o === td.LINE_BREAK ? (n = !n,
                i.even = n) : [td.TEXT, td.CHORD_ANCHOR].includes(o) ? i.even = n : o === td.HEADLINE ? r && [td.TEXT, td.CHORD_ANCHOR].includes(r.type) && (i.even = n) : [td.TAB, td.RHYTHM].includes(o) && (n = !1)
            }
            this.nt(rd(this.st, t)),
            this.st = t
        }
        updateOptions(t) {
            Object.assign(this.ct, t),
            this.ct.horizontal && (this.ct.noLineBreak = !0),
            this.et.style["font-size"] = (this.ct.scale || 1) + "em"
        }
        getChordsInUse() {
            const t = [];
            return this.st.forEach((n => {
                if (n.type === td.CHORD_ANCHOR) {
                    const {chord: e} = n.attributes;
                    e && t.indexOf(e) < 0 && t.push(e)
                }
            }
            )),
            t
        }
        getElementByIndex(t) {
            const n = this.st[t];
            return this.et.querySelector("#" + this.ot + n.id)
        }
        lt(t) {
            for (const n of t)
                n.id || (n.id = this.ut,
                this.ut++)
        }
        nt(t) {
            Sd(this.et),
            Ed(this.et, {
                horizontal: !!this.ct.horizontal
            }),
            t.forEach(( ({operation: t, id: n, item: e}) => {
                switch (t) {
                case Zh.DELETE:
                    this.ft(n);
                    break;
                case Zh.INSERT:
                    null === n ? this.ht(e) : this.dt(n, e);
                    break;
                case Zh.UPDATE:
                    this.vt(n, e)
                }
            }
            )),
            this.yt()
        }
        ht(t) {
            const n = this.gt(t.id, t);
            this.et.appendChild(n)
        }
        bt(t) {
            return this.et.querySelector("#" + this.ot + t)
        }
        dt(t, n) {
            const e = this.bt(t)
              , i = this.gt(n.id, n);
            e ? e.parentElement.insertBefore(i, e) : yd("Insert element failed", {
                id: t,
                item: n
            })
        }
        ft(t) {
            const n = this.bt(t);
            n ? n.remove() : yd("Remove element failed", {
                id: t
            })
        }
        vt(t, n) {
            const e = this.bt(t);
            e && (this.dt(t, n),
            e.remove())
        }
        gt(t, n) {
            const {type: e, value: i, attributes: r} = n
              , o = wd[e];
            if (!o)
                throw new Error("Unknown type:" + e);
            const s = fn(o, {
                id: this.ot + t
            });
            return Ed(s, {
                ...r,
                ...this.ct,
                forMobile: this.it,
                forEditor: this.rt,
                valueLength: ad(n),
                even: n.even || !1,
                debug: JSON.stringify(n)
            }),
            null != i && (s.textContent = i === nd ? ed : rn(i, " ", id)),
            s
        }
        yt() {
            const t = ln(this.et, wd[td.CHORD_ANCHOR])
              , n = [];
            for (const e of t) {
                const t = e.querySelector(this.ct.chordStyle === rt.INLINE ? "hexi-chord" : ".chord")
                  , {x: i, y: r, width: o} = t.getBoundingClientRect();
                n.push({
                    element: e,
                    x: i,
                    y: r,
                    width: this.ct.chordStyle === rt.INLINE ? kd(this.ct) : o
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
    function kd(t) {
        const {instrument: n, scale: e=1} = t;
        let i = 0;
        return n === Z.GUITAR ? i = gd : n === Z.UKULELE && (i = bd),
        i * e
    }
    function Sd(t) {
        const n = t.childNodes
          , e = [];
        for (let t = 0; t < n.length; ++t) {
            const i = n[t];
            i.id || e.push(i)
        }
        e.forEach((t => t.remove()))
    }
    function Ed(t, n) {
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
                        yd("Failed to delete dataset", {
                            key: e
                        })
                    }
            }
    }
    function Td(t) {
        return Object.entries(t).map(( ([t,n]) => `${t}:${n}`)).join(";")
    }
    const Od = {};
    function Cd(t) {
        Od[t] ? t() : Od[t] = 1
    }
    function Ad(t) {
        t._xheInstalled || (gn(wd[td.TEXT], md),
        gn(wd[td.CHORD_ANCHOR], Kh),
        gn(wd[td.HEADLINE], Yh),
        gn(wd[td.LINE_BREAK], Qh),
        gn(wd[td.RHYTHM], hd),
        gn(wd[td.TAB], vd),
        t._xheInstalled = !0)
    }
    Lt("Xhe"),
    Lt("deleteBackwardAt"),
    Lt("deleteForwardAt"),
    zt("Xhe/InputManager"),
    S(navigator.userAgent);
    var Xd = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {};
    function Id(t) {
        var n = {
            exports: {}
        };
        return t(n, n.exports),
        n.exports
    }
    var _d = Id((function(t, n) {
        t.exports = {
            polyfill: function() {
                var t = window
                  , n = document;
                if (!("scrollBehavior"in n.documentElement.style) || !0 === t.wt) {
                    var e, i = t.HTMLElement || t.Element, r = {
                        scroll: t.scroll || t.scrollTo,
                        scrollBy: t.scrollBy,
                        elementScroll: i.prototype.scroll || u,
                        scrollIntoView: i.prototype.scrollIntoView
                    }, o = t.performance && t.performance.now ? t.performance.now.bind(t.performance) : Date.now, s = (e = t.navigator.userAgent,
                    new RegExp(["MSIE ", "Trident/", "Edge/"].join("|")).test(e) ? 1 : 0);
                    t.scroll = t.scrollTo = function() {
                        void 0 !== arguments[0] && (!0 !== c(arguments[0]) ? v.call(t, n.body, void 0 !== arguments[0].left ? ~~arguments[0].left : t.scrollX || t.pageXOffset, void 0 !== arguments[0].top ? ~~arguments[0].top : t.scrollY || t.pageYOffset) : r.scroll.call(t, void 0 !== arguments[0].left ? arguments[0].left : "object" != typeof arguments[0] ? arguments[0] : t.scrollX || t.pageXOffset, void 0 !== arguments[0].top ? arguments[0].top : void 0 !== arguments[1] ? arguments[1] : t.scrollY || t.pageYOffset))
                    }
                    ,
                    t.scrollBy = function() {
                        void 0 !== arguments[0] && (c(arguments[0]) ? r.scrollBy.call(t, void 0 !== arguments[0].left ? arguments[0].left : "object" != typeof arguments[0] ? arguments[0] : 0, void 0 !== arguments[0].top ? arguments[0].top : void 0 !== arguments[1] ? arguments[1] : 0) : v.call(t, n.body, ~~arguments[0].left + (t.scrollX || t.pageXOffset), ~~arguments[0].top + (t.scrollY || t.pageYOffset)))
                    }
                    ,
                    i.prototype.scroll = i.prototype.scrollTo = function() {
                        if (void 0 !== arguments[0])
                            if (!0 !== c(arguments[0])) {
                                var t = arguments[0].left
                                  , n = arguments[0].top;
                                v.call(this, this, void 0 === t ? this.scrollLeft : ~~t, void 0 === n ? this.scrollTop : ~~n)
                            } else {
                                if ("number" == typeof arguments[0] && void 0 === arguments[1])
                                    throw new SyntaxError("Value could not be converted");
                                r.elementScroll.call(this, void 0 !== arguments[0].left ? ~~arguments[0].left : "object" != typeof arguments[0] ? ~~arguments[0] : this.scrollLeft, void 0 !== arguments[0].top ? ~~arguments[0].top : void 0 !== arguments[1] ? ~~arguments[1] : this.scrollTop)
                            }
                    }
                    ,
                    i.prototype.scrollBy = function() {
                        void 0 !== arguments[0] && (!0 !== c(arguments[0]) ? this.scroll({
                            left: ~~arguments[0].left + this.scrollLeft,
                            top: ~~arguments[0].top + this.scrollTop,
                            behavior: arguments[0].behavior
                        }) : r.elementScroll.call(this, void 0 !== arguments[0].left ? ~~arguments[0].left + this.scrollLeft : ~~arguments[0] + this.scrollLeft, void 0 !== arguments[0].top ? ~~arguments[0].top + this.scrollTop : ~~arguments[1] + this.scrollTop))
                    }
                    ,
                    i.prototype.scrollIntoView = function() {
                        if (!0 !== c(arguments[0])) {
                            var e = h(this)
                              , i = e.getBoundingClientRect()
                              , o = this.getBoundingClientRect();
                            e !== n.body ? (v.call(this, e, e.scrollLeft + o.left - i.left, e.scrollTop + o.top - i.top),
                            "fixed" !== t.getComputedStyle(e).position && t.scrollBy({
                                left: i.left,
                                top: i.top,
                                behavior: "smooth"
                            })) : t.scrollBy({
                                left: o.left,
                                top: o.top,
                                behavior: "smooth"
                            })
                        } else
                            r.scrollIntoView.call(this, void 0 === arguments[0] || arguments[0])
                    }
                }
                function u(t, n) {
                    this.scrollLeft = t,
                    this.scrollTop = n
                }
                function c(t) {
                    if (null === t || "object" != typeof t || void 0 === t.behavior || "auto" === t.behavior || "instant" === t.behavior)
                        return !0;
                    if ("object" == typeof t && "smooth" === t.behavior)
                        return !1;
                    throw new TypeError("behavior member of ScrollOptions " + t.behavior + " is not a valid value for enumeration ScrollBehavior.")
                }
                function a(t, n) {
                    return "Y" === n ? t.clientHeight + s < t.scrollHeight : "X" === n ? t.clientWidth + s < t.scrollWidth : void 0
                }
                function l(n, e) {
                    var i = t.getComputedStyle(n, null)["overflow" + e];
                    return "auto" === i || "scroll" === i
                }
                function f(t) {
                    var n = a(t, "Y") && l(t, "Y")
                      , e = a(t, "X") && l(t, "X");
                    return n || e
                }
                function h(t) {
                    for (; t !== n.body && !1 === f(t); )
                        t = t.parentNode || t.host;
                    return t
                }
                function d(n) {
                    var e, i, r, s, u = (o() - n.startTime) / 468;
                    s = u = u > 1 ? 1 : u,
                    e = .5 * (1 - Math.cos(Math.PI * s)),
                    i = n.startX + (n.x - n.startX) * e,
                    r = n.startY + (n.y - n.startY) * e,
                    n.method.call(n.scrollable, i, r),
                    i === n.x && r === n.y || t.requestAnimationFrame(d.bind(t, n))
                }
                function v(e, i, s) {
                    var c, a, l, f, h = o();
                    e === n.body ? (c = t,
                    a = t.scrollX || t.pageXOffset,
                    l = t.scrollY || t.pageYOffset,
                    f = r.scroll) : (c = e,
                    a = e.scrollLeft,
                    l = e.scrollTop,
                    f = u),
                    d({
                        scrollable: c,
                        method: f,
                        startTime: h,
                        startX: a,
                        startY: l,
                        x: i,
                        y: s
                    })
                }
            }
        }
    }
    ));
    function Md() {
        self._smoothScrollPolyfilled || (self._smoothScrollPolyfilled = !0,
        _d.polyfill())
    }
    const Rd = {
        dy: {
            name: "抖音小程序",
            apiKey: "faec7cc2rh"
        },
        wx: {
            name: "微信小程序",
            apiKey: "6da9b425pq"
        },
        bd: {
            name: "百度小程序",
            apiKey: "be02b2dc12"
        },
        bda: {
            name: "百度阿拉丁",
            apiKey: "b6bc7759f9"
        }
    };
    function Dd(t) {
        const n = {};
        for (const e in t)
            if (t.hasOwnProperty(e)) {
                n[t[e].apiKey] = e
            }
        return n
    }
    function jd(t) {
        let n;
        return {
            c() {
                n = Xl("span")
            },
            m(t, e) {
                Ol(t, n, e)
            },
            d(t) {
                t && Cl(n)
            }
        }
    }
    function Bd(t) {
        let n, e, i, r;
        const o = t[4].default
          , s = dl(o, t, t[3], null)
          , u = s || jd();
        return {
            c() {
                n = Xl("button"),
                u && u.c(),
                n.disabled = t[0],
                Dl(n, "size", t[1]),
                Dl(n, "theme", t[2]),
                Dl(n, "type", "button"),
                Dl(n, "class", "svelte-1kcxt4g")
            },
            m(o, s) {
                Ol(o, n, s),
                u && u.m(n, null),
                e = !0,
                i || (r = Rl(n, "click", t[5]),
                i = !0)
            },
            p(t, [i]) {
                s && s.p && 8 & i && ml(s, o, t, t[3], i, null, null),
                (!e || 1 & i) && (n.disabled = t[0]),
                (!e || 2 & i) && Dl(n, "size", t[1]),
                (!e || 4 & i) && Dl(n, "theme", t[2])
            },
            i(t) {
                e || (Af(u, t),
                e = !0)
            },
            o(t) {
                Xf(u, t),
                e = !1
            },
            d(t) {
                t && Cl(n),
                u && u.d(t),
                i = !1,
                r()
            }
        }
    }
    function Pd(t, n, e) {
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
            uf(t, n)
        }
        ]
    }
    Dd(Rd);
    class qd extends Ff {
        constructor(t) {
            super(),
            $f(this, t, Pd, Bd, al, {
                disabled: 0,
                size: 1,
                theme: 2
            })
        }
    }
    function $d(t) {
        let n, e, i, r, o, s, u, c, a;
        const l = t[15].default
          , f = dl(l, t, t[18], null);
        let h = !t[1] && (t[7] || t[9]) && Fd(t);
        return {
            c() {
                n = Xl("dialog"),
                e = Xl("div"),
                i = _l(),
                r = Xl("div"),
                o = Xl("div"),
                f && f.c(),
                s = _l(),
                h && h.c(),
                Dl(e, "glass", ""),
                Dl(e, "class", "svelte-4llsvh"),
                Dl(o, "content", ""),
                Dl(o, "class", "svelte-4llsvh"),
                Dl(r, "wrapper", ""),
                Dl(r, "class", "svelte-4llsvh"),
                Dl(n, "position", t[2]),
                n.open = !0,
                Dl(n, "class", "svelte-4llsvh"),
                Ll(n, "wide", t[5]),
                Ll(n, "horizontal-buttons", t[4])
            },
            m(l, d) {
                Ol(l, n, d),
                Tl(n, e),
                Tl(n, i),
                Tl(n, r),
                Tl(r, o),
                f && f.m(o, null),
                Tl(r, s),
                h && h.m(r, null),
                u = !0,
                c || (a = Rl(e, "click", t[11]),
                c = !0)
            },
            p(t, e) {
                f && f.p && 262144 & e && ml(f, l, t, t[18], e, null, null),
                t[1] || !t[7] && !t[9] ? h && (Of(),
                Xf(h, 1, 1, ( () => {
                    h = null
                }
                )),
                Cf()) : h ? (h.p(t, e),
                642 & e && Af(h, 1)) : (h = Fd(t),
                h.c(),
                Af(h, 1),
                h.m(r, null)),
                (!u || 4 & e) && Dl(n, "position", t[2]),
                32 & e && Ll(n, "wide", t[5]),
                16 & e && Ll(n, "horizontal-buttons", t[4])
            },
            i(t) {
                u || (Af(f, t),
                Af(h),
                u = !0)
            },
            o(t) {
                Xf(f, t),
                Xf(h),
                u = !1
            },
            d(t) {
                t && Cl(n),
                f && f.d(t),
                h && h.d(),
                c = !1,
                a()
            }
        }
    }
    function Fd(t) {
        let n, e, i, r;
        e = new qd({
            props: {
                size: t[7] ? "big" : "medium",
                disabled: t[6] || t[3],
                theme: t[7] ? "primary" : void 0,
                $$slots: {
                    default: [Nd]
                },
                $$scope: {
                    ctx: t
                }
            }
        }),
        e.$on("click", t[16]);
        let o = t[9] && zd(t);
        return {
            c() {
                n = Xl("div"),
                jf(e.$$.fragment),
                i = _l(),
                o && o.c(),
                Dl(n, "class", "buttons svelte-4llsvh")
            },
            m(t, s) {
                Ol(t, n, s),
                Bf(e, n, null),
                Tl(n, i),
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
                512 & i && Af(o, 1)) : (o = zd(t),
                o.c(),
                Af(o, 1),
                o.m(n, null)) : o && (Of(),
                Xf(o, 1, 1, ( () => {
                    o = null
                }
                )),
                Cf())
            },
            i(t) {
                r || (Af(e.$$.fragment, t),
                Af(o),
                r = !0)
            },
            o(t) {
                Xf(e.$$.fragment, t),
                Xf(o),
                r = !1
            },
            d(t) {
                t && Cl(n),
                Pf(e),
                o && o.d()
            }
        }
    }
    function Nd(t) {
        let n;
        return {
            c() {
                n = Il(t[8])
            },
            m(t, e) {
                Ol(t, n, e)
            },
            p(t, e) {
                256 & e && ql(n, t[8])
            },
            d(t) {
                t && Cl(n)
            }
        }
    }
    function zd(t) {
        let n, e;
        return n = new qd({
            props: {
                size: t[7] ? "big" : "medium",
                disabled: t[6],
                theme: t[7] ? "secondary" : void 0,
                $$slots: {
                    default: [Ld]
                },
                $$scope: {
                    ctx: t
                }
            }
        }),
        n.$on("click", t[17]),
        {
            c() {
                jf(n.$$.fragment)
            },
            m(t, i) {
                Bf(n, t, i),
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
                e || (Af(n.$$.fragment, t),
                e = !0)
            },
            o(t) {
                Xf(n.$$.fragment, t),
                e = !1
            },
            d(t) {
                Pf(n, t)
            }
        }
    }
    function Ld(t) {
        let n;
        return {
            c() {
                n = Il(t[9])
            },
            m(t, e) {
                Ol(t, n, e)
            },
            p(t, e) {
                512 & e && ql(n, t[9])
            },
            d(t) {
                t && Cl(n)
            }
        }
    }
    function Gd(t) {
        let n, e, i = t[0] && $d(t);
        return {
            c() {
                i && i.c(),
                n = Ml()
            },
            m(t, r) {
                i && i.m(t, r),
                Ol(t, n, r),
                e = !0
            },
            p(t, [e]) {
                t[0] ? i ? (i.p(t, e),
                1 & e && Af(i, 1)) : (i = $d(t),
                i.c(),
                Af(i, 1),
                i.m(n.parentNode, n)) : i && (Of(),
                Xf(i, 1, 1, ( () => {
                    i = null
                }
                )),
                Cf())
            },
            i(t) {
                e || (Af(i),
                e = !0)
            },
            o(t) {
                Xf(i),
                e = !1
            },
            d(t) {
                i && i.d(t),
                t && Cl(n)
            }
        }
    }
    function Ud(t, n, e) {
        let {$$slots: i={}, $$scope: r} = n;
        const o = {
            CENTER: "center",
            BOTTOM: "bottom"
        };
        let s, u, c, {open: a=!1} = n, {noButtons: l=!1} = n, {position: f=o.CENTER} = n, {action: h=(async () => !0)} = n, {okButtonText: d="确认"} = n, {cancelButtonText: v="取消"} = n, {okButtonDisabled: p=!1} = n, {horizontalButtons: m=!1} = n, {wide: y=!1} = n, g = !1;
        async function b(t) {
            t ? e(8, u = "请稍后...") : e(9, c = "请稍后..."),
            e(6, g = !0);
            const n = await h(t);
            e(6, g = !1),
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
            "wide"in t && e(5, y = t.wide),
            "$$scope"in t && e(18, r = t.$$scope)
        }
        ,
        t.$$.update = () => {
            4 & t.$$.dirty && e(7, s = f === o.CENTER),
            8192 & t.$$.dirty && e(8, u = d),
            16384 & t.$$.dirty && e(9, c = v),
            1 & t.$$.dirty && vn("lock", a)
        }
        ,
        [a, l, f, p, m, y, g, s, u, c, b, function() {
            v || b(!0)
        }
        , h, d, v, i, () => b(!0), () => b(!1), r]
    }
    class Hd extends Ff {
        constructor(t) {
            super(),
            $f(this, t, Ud, Gd, al, {
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
    function Vd(t) {
        let n, e, i, r, o;
        return {
            c() {
                n = Xl("div"),
                e = Il(t[3]),
                i = _l(),
                r = Xl("div"),
                o = Il(t[4]),
                Dl(n, "title", ""),
                Dl(r, "description", "")
            },
            m(t, s) {
                Ol(t, n, s),
                Tl(n, e),
                Ol(t, i, s),
                Ol(t, r, s),
                Tl(r, o)
            },
            p(t, n) {
                8 & n && ql(e, t[3]),
                16 & n && ql(o, t[4])
            },
            d(t) {
                t && Cl(n),
                t && Cl(i),
                t && Cl(r)
            }
        }
    }
    function Wd(t) {
        let n, e, i, r, o;
        function s(n) {
            t[5](n)
        }
        function u(n) {
            t[6](n)
        }
        function c(n) {
            t[7](n)
        }
        let a = {
            action: iv,
            $$slots: {
                default: [Vd]
            },
            $$scope: {
                ctx: t
            }
        };
        return void 0 !== t[0] && (a.open = t[0]),
        void 0 !== t[1] && (a.okButtonText = t[1]),
        void 0 !== t[2] && (a.cancelButtonText = t[2]),
        n = new Hd({
            props: a
        }),
        af.push(( () => Df(n, "open", s))),
        af.push(( () => Df(n, "okButtonText", u))),
        af.push(( () => Df(n, "cancelButtonText", c))),
        {
            c() {
                jf(n.$$.fragment)
            },
            m(t, e) {
                Bf(n, t, e),
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
                mf(( () => e = !1))),
                !i && 2 & o && (i = !0,
                s.okButtonText = t[1],
                mf(( () => i = !1))),
                !r && 4 & o && (r = !0,
                s.cancelButtonText = t[2],
                mf(( () => r = !1))),
                n.$set(s)
            },
            i(t) {
                o || (Af(n.$$.fragment, t),
                o = !0)
            },
            o(t) {
                Xf(n.$$.fragment, t),
                o = !1
            },
            d(t) {
                Pf(n, t)
            }
        }
    }
    const Jd = Lf("")
      , Kd = Lf("")
      , Yd = Lf("确认")
      , Qd = Lf("取消")
      , Zd = Lf(!1);
    let tv = () => {}
    ;
    function nv(t, n, e={}) {
        Jd.set(t),
        Kd.set(n);
        const {okButtonText: i="确认", cancelButtonText: r="取消"} = e;
        return Yd.set(i),
        Qd.set(r),
        Zd.set(!0),
        new Promise((t => tv = t))
    }
    function ev(t, n, e={}) {
        return nv(t, n, Object.assign({
            cancelButtonText: ""
        }, e))
    }
    async function iv(t) {
        return tv(t),
        !0
    }
    function rv(t, n, e) {
        let i, r, o, s, u;
        return hl(t, Zd, (t => e(0, i = t))),
        hl(t, Yd, (t => e(1, r = t))),
        hl(t, Qd, (t => e(2, o = t))),
        hl(t, Jd, (t => e(3, s = t))),
        hl(t, Kd, (t => e(4, u = t))),
        [i, r, o, s, u, function(t) {
            i = t,
            Zd.set(i)
        }
        , function(t) {
            r = t,
            Yd.set(r)
        }
        , function(t) {
            o = t,
            Qd.set(o)
        }
        ]
    }
    class ov extends Ff {
        constructor(t) {
            super(),
            $f(this, t, rv, Wd, al, {})
        }
    }
    function sv(t) {
        let n, e, i;
        return {
            c() {
                n = Xl("div"),
                n.textContent = "账号被暂停使用",
                e = _l(),
                i = Xl("div"),
                i.innerHTML = '<p>该账号违反<a class="blue" href="/help#terms">用户协议</a>、<a class="blue" href="/help#membership">会员服务协议</a>或国家相关法规，目前已被暂停使用。</p> \n    <p>最近有谱君发现一些不法商家冒充有谱么官方在淘宝等电商平台销售所谓<b>“有谱么共享会员账号”</b>， 还请用户擦亮眼睛，切勿上当受骗。\n      您如购买了此类“账号”，请及时联系卖家退款，必要时可向电商平台发起投诉以维护您自身的权益。</p> \n    <p>感谢使用有谱么！请明白，只有维护一个公平有序的环境，有谱君才能持续为大家提供更好的服务。</p>',
                Dl(n, "title", ""),
                Dl(i, "description", "")
            },
            m(t, r) {
                Ol(t, n, r),
                Ol(t, e, r),
                Ol(t, i, r)
            },
            d(t) {
                t && Cl(n),
                t && Cl(e),
                t && Cl(i)
            }
        }
    }
    function uv(t) {
        let n, e, i;
        function r(n) {
            t[2](n)
        }
        let o = {
            okButtonText: "退出登录",
            cancelButtonText: "切换账号",
            action: t[1],
            $$slots: {
                default: [sv]
            },
            $$scope: {
                ctx: t
            }
        };
        return void 0 !== t[0] && (o.open = t[0]),
        n = new Hd({
            props: o
        }),
        af.push(( () => Df(n, "open", r))),
        {
            c() {
                jf(n.$$.fragment)
            },
            m(t, e) {
                Bf(n, t, e),
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
                mf(( () => e = !1))),
                n.$set(r)
            },
            i(t) {
                i || (Af(n.$$.fragment, t),
                i = !0)
            },
            o(t) {
                Xf(n.$$.fragment, t),
                i = !1
            },
            d(t) {
                Pf(n, t)
            }
        }
    }
    function cv(t, n, e) {
        let {open: i} = n;
        return t.$$set = t => {
            "open"in t && e(0, i = t.open)
        }
        ,
        [i, async function() {
            return await nl(),
            !0
        }
        , function(t) {
            i = t,
            e(0, i)
        }
        ]
    }
    class av extends Ff {
        constructor(t) {
            super(),
            $f(this, t, cv, uv, al, {
                open: 0
            })
        }
    }
    var lv = void 0 !== lv ? lv : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}
      , fv = []
      , hv = []
      , dv = "undefined" != typeof Uint8Array ? Uint8Array : Array
      , vv = !1;
    function pv() {
        vv = !0;
        for (var t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", n = 0, e = t.length; n < e; ++n)
            fv[n] = t[n],
            hv[t.charCodeAt(n)] = n;
        hv["-".charCodeAt(0)] = 62,
        hv["_".charCodeAt(0)] = 63
    }
    function mv(t) {
        var n, e, i, r, o, s;
        vv || pv();
        var u = t.length;
        if (u % 4 > 0)
            throw new Error("Invalid string. Length must be a multiple of 4");
        o = "=" === t[u - 2] ? 2 : "=" === t[u - 1] ? 1 : 0,
        s = new dv(3 * u / 4 - o),
        i = o > 0 ? u - 4 : u;
        var c = 0;
        for (n = 0,
        e = 0; n < i; n += 4,
        e += 3)
            r = hv[t.charCodeAt(n)] << 18 | hv[t.charCodeAt(n + 1)] << 12 | hv[t.charCodeAt(n + 2)] << 6 | hv[t.charCodeAt(n + 3)],
            s[c++] = r >> 16 & 255,
            s[c++] = r >> 8 & 255,
            s[c++] = 255 & r;
        return 2 === o ? (r = hv[t.charCodeAt(n)] << 2 | hv[t.charCodeAt(n + 1)] >> 4,
        s[c++] = 255 & r) : 1 === o && (r = hv[t.charCodeAt(n)] << 10 | hv[t.charCodeAt(n + 1)] << 4 | hv[t.charCodeAt(n + 2)] >> 2,
        s[c++] = r >> 8 & 255,
        s[c++] = 255 & r),
        s
    }
    function yv(t) {
        return fv[t >> 18 & 63] + fv[t >> 12 & 63] + fv[t >> 6 & 63] + fv[63 & t]
    }
    function gv(t, n, e) {
        for (var i, r = [], o = n; o < e; o += 3)
            i = (t[o] << 16) + (t[o + 1] << 8) + t[o + 2],
            r.push(yv(i));
        return r.join("")
    }
    function bv(t) {
        var n;
        vv || pv();
        for (var e = t.length, i = e % 3, r = "", o = [], s = 16383, u = 0, c = e - i; u < c; u += s)
            o.push(gv(t, u, u + s > c ? c : u + s));
        return 1 === i ? (n = t[e - 1],
        r += fv[n >> 2],
        r += fv[n << 4 & 63],
        r += "==") : 2 === i && (n = (t[e - 2] << 8) + t[e - 1],
        r += fv[n >> 10],
        r += fv[n >> 4 & 63],
        r += fv[n << 2 & 63],
        r += "="),
        o.push(r),
        o.join("")
    }
    function wv(t, n, e, i, r) {
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
    function xv(t, n, e, i, r, o) {
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
    var kv = {}.toString
      , Sv = Array.isArray || function(t) {
        return "[object Array]" == kv.call(t)
    }
      , Ev = 50;
    function Tv() {
        return Cv.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823
    }
    function Ov(t, n) {
        if (Tv() < n)
            throw new RangeError("Invalid typed array length");
        return Cv.TYPED_ARRAY_SUPPORT ? (t = new Uint8Array(n)).__proto__ = Cv.prototype : (null === t && (t = new Cv(n)),
        t.length = n),
        t
    }
    function Cv(t, n, e) {
        if (!(Cv.TYPED_ARRAY_SUPPORT || this instanceof Cv))
            return new Cv(t,n,e);
        if ("number" == typeof t) {
            if ("string" == typeof n)
                throw new Error("If encoding is specified then the first argument must be a string");
            return _v(this, t)
        }
        return Av(this, t, n, e)
    }
    function Av(t, n, e, i) {
        if ("number" == typeof n)
            throw new TypeError('"value" argument must not be a number');
        return "undefined" != typeof ArrayBuffer && n instanceof ArrayBuffer ? Dv(t, n, e, i) : "string" == typeof n ? Mv(t, n, e) : jv(t, n)
    }
    function Xv(t) {
        if ("number" != typeof t)
            throw new TypeError('"size" argument must be a number');
        if (t < 0)
            throw new RangeError('"size" argument must not be negative')
    }
    function Iv(t, n, e, i) {
        return Xv(n),
        n <= 0 ? Ov(t, n) : void 0 !== e ? "string" == typeof i ? Ov(t, n).fill(e, i) : Ov(t, n).fill(e) : Ov(t, n)
    }
    function _v(t, n) {
        if (Xv(n),
        t = Ov(t, n < 0 ? 0 : 0 | Bv(n)),
        !Cv.TYPED_ARRAY_SUPPORT)
            for (var e = 0; e < n; ++e)
                t[e] = 0;
        return t
    }
    function Mv(t, n, e) {
        if ("string" == typeof e && "" !== e || (e = "utf8"),
        !Cv.isEncoding(e))
            throw new TypeError('"encoding" must be a valid string encoding');
        var i = 0 | qv(n, e)
          , r = (t = Ov(t, i)).write(n, e);
        return r !== i && (t = t.slice(0, r)),
        t
    }
    function Rv(t, n) {
        var e = n.length < 0 ? 0 : 0 | Bv(n.length);
        t = Ov(t, e);
        for (var i = 0; i < e; i += 1)
            t[i] = 255 & n[i];
        return t
    }
    function Dv(t, n, e, i) {
        if (n.byteLength,
        e < 0 || n.byteLength < e)
            throw new RangeError("'offset' is out of bounds");
        if (n.byteLength < e + (i || 0))
            throw new RangeError("'length' is out of bounds");
        return n = void 0 === e && void 0 === i ? new Uint8Array(n) : void 0 === i ? new Uint8Array(n,e) : new Uint8Array(n,e,i),
        Cv.TYPED_ARRAY_SUPPORT ? (t = n).__proto__ = Cv.prototype : t = Rv(t, n),
        t
    }
    function jv(t, n) {
        if (Pv(n)) {
            var e = 0 | Bv(n.length);
            return 0 === (t = Ov(t, e)).length || n.copy(t, 0, 0, e),
            t
        }
        if (n) {
            if ("undefined" != typeof ArrayBuffer && n.buffer instanceof ArrayBuffer || "length"in n)
                return "number" != typeof n.length || bp(n.length) ? Ov(t, 0) : Rv(t, n);
            if ("Buffer" === n.type && Sv(n.data))
                return Rv(t, n.data)
        }
        throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.")
    }
    function Bv(t) {
        if (t >= Tv())
            throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + Tv().toString(16) + " bytes");
        return 0 | t
    }
    function Pv(t) {
        return !(null == t || !t._isBuffer)
    }
    function qv(t, n) {
        if (Pv(t))
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
                return vp(t).length;
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
                return 2 * e;
            case "hex":
                return e >>> 1;
            case "base64":
                return yp(t).length;
            default:
                if (i)
                    return vp(t).length;
                n = ("" + n).toLowerCase(),
                i = !0
            }
    }
    function $v(t, n, e) {
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
                return np(this, n, e);
            case "utf8":
            case "utf-8":
                return Kv(this, n, e);
            case "ascii":
                return Zv(this, n, e);
            case "latin1":
            case "binary":
                return tp(this, n, e);
            case "base64":
                return Jv(this, n, e);
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
                return ep(this, n, e);
            default:
                if (i)
                    throw new TypeError("Unknown encoding: " + t);
                t = (t + "").toLowerCase(),
                i = !0
            }
    }
    function Fv(t, n, e) {
        var i = t[n];
        t[n] = t[e],
        t[e] = i
    }
    function Nv(t, n, e, i, r) {
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
        if ("string" == typeof n && (n = Cv.from(n, i)),
        Pv(n))
            return 0 === n.length ? -1 : zv(t, n, e, i, r);
        if ("number" == typeof n)
            return n &= 255,
            Cv.TYPED_ARRAY_SUPPORT && "function" == typeof Uint8Array.prototype.indexOf ? r ? Uint8Array.prototype.indexOf.call(t, n, e) : Uint8Array.prototype.lastIndexOf.call(t, n, e) : zv(t, [n], e, i, r);
        throw new TypeError("val must be string, number or Buffer")
    }
    function zv(t, n, e, i, r) {
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
    function Lv(t, n, e, i) {
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
    function Gv(t, n, e, i) {
        return gp(vp(n, t.length - e), t, e, i)
    }
    function Uv(t, n, e, i) {
        return gp(pp(n), t, e, i)
    }
    function Hv(t, n, e, i) {
        return Uv(t, n, e, i)
    }
    function Vv(t, n, e, i) {
        return gp(yp(n), t, e, i)
    }
    function Wv(t, n, e, i) {
        return gp(mp(n, t.length - e), t, e, i)
    }
    function Jv(t, n, e) {
        return 0 === n && e === t.length ? bv(t) : bv(t.slice(n, e))
    }
    function Kv(t, n, e) {
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
        return Qv(i)
    }
    Cv.TYPED_ARRAY_SUPPORT = void 0 === lv.TYPED_ARRAY_SUPPORT || lv.TYPED_ARRAY_SUPPORT,
    Cv.poolSize = 8192,
    Cv._augment = function(t) {
        return t.__proto__ = Cv.prototype,
        t
    }
    ,
    Cv.from = function(t, n, e) {
        return Av(null, t, n, e)
    }
    ,
    Cv.TYPED_ARRAY_SUPPORT && (Cv.prototype.__proto__ = Uint8Array.prototype,
    Cv.__proto__ = Uint8Array),
    Cv.alloc = function(t, n, e) {
        return Iv(null, t, n, e)
    }
    ,
    Cv.allocUnsafe = function(t) {
        return _v(null, t)
    }
    ,
    Cv.allocUnsafeSlow = function(t) {
        return _v(null, t)
    }
    ,
    Cv.isBuffer = wp,
    Cv.compare = function(t, n) {
        if (!Pv(t) || !Pv(n))
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
    Cv.isEncoding = function(t) {
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
    Cv.concat = function(t, n) {
        if (!Sv(t))
            throw new TypeError('"list" argument must be an Array of Buffers');
        if (0 === t.length)
            return Cv.alloc(0);
        var e;
        if (void 0 === n)
            for (n = 0,
            e = 0; e < t.length; ++e)
                n += t[e].length;
        var i = Cv.allocUnsafe(n)
          , r = 0;
        for (e = 0; e < t.length; ++e) {
            var o = t[e];
            if (!Pv(o))
                throw new TypeError('"list" argument must be an Array of Buffers');
            o.copy(i, r),
            r += o.length
        }
        return i
    }
    ,
    Cv.byteLength = qv,
    Cv.prototype._isBuffer = !0,
    Cv.prototype.swap16 = function() {
        var t = this.length;
        if (t % 2 != 0)
            throw new RangeError("Buffer size must be a multiple of 16-bits");
        for (var n = 0; n < t; n += 2)
            Fv(this, n, n + 1);
        return this
    }
    ,
    Cv.prototype.swap32 = function() {
        var t = this.length;
        if (t % 4 != 0)
            throw new RangeError("Buffer size must be a multiple of 32-bits");
        for (var n = 0; n < t; n += 4)
            Fv(this, n, n + 3),
            Fv(this, n + 1, n + 2);
        return this
    }
    ,
    Cv.prototype.swap64 = function() {
        var t = this.length;
        if (t % 8 != 0)
            throw new RangeError("Buffer size must be a multiple of 64-bits");
        for (var n = 0; n < t; n += 8)
            Fv(this, n, n + 7),
            Fv(this, n + 1, n + 6),
            Fv(this, n + 2, n + 5),
            Fv(this, n + 3, n + 4);
        return this
    }
    ,
    Cv.prototype.toString = function() {
        var t = 0 | this.length;
        return 0 === t ? "" : 0 === arguments.length ? Kv(this, 0, t) : $v.apply(this, arguments)
    }
    ,
    Cv.prototype.equals = function(t) {
        if (!Pv(t))
            throw new TypeError("Argument must be a Buffer");
        return this === t || 0 === Cv.compare(this, t)
    }
    ,
    Cv.prototype.inspect = function() {
        var t = ""
          , n = Ev;
        return this.length > 0 && (t = this.toString("hex", 0, n).match(/.{2}/g).join(" "),
        this.length > n && (t += " ... ")),
        "<Buffer " + t + ">"
    }
    ,
    Cv.prototype.compare = function(t, n, e, i, r) {
        if (!Pv(t))
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
    Cv.prototype.includes = function(t, n, e) {
        return -1 !== this.indexOf(t, n, e)
    }
    ,
    Cv.prototype.indexOf = function(t, n, e) {
        return Nv(this, t, n, e, !0)
    }
    ,
    Cv.prototype.lastIndexOf = function(t, n, e) {
        return Nv(this, t, n, e, !1)
    }
    ,
    Cv.prototype.write = function(t, n, e, i) {
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
                return Lv(this, t, n, e);
            case "utf8":
            case "utf-8":
                return Gv(this, t, n, e);
            case "ascii":
                return Uv(this, t, n, e);
            case "latin1":
            case "binary":
                return Hv(this, t, n, e);
            case "base64":
                return Vv(this, t, n, e);
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
                return Wv(this, t, n, e);
            default:
                if (o)
                    throw new TypeError("Unknown encoding: " + i);
                i = ("" + i).toLowerCase(),
                o = !0
            }
    }
    ,
    Cv.prototype.toJSON = function() {
        return {
            type: "Buffer",
            data: Array.prototype.slice.call(this._arr || this, 0)
        }
    }
    ;
    var Yv = 4096;
    function Qv(t) {
        var n = t.length;
        if (n <= Yv)
            return String.fromCharCode.apply(String, t);
        for (var e = "", i = 0; i < n; )
            e += String.fromCharCode.apply(String, t.slice(i, i += Yv));
        return e
    }
    function Zv(t, n, e) {
        var i = "";
        e = Math.min(t.length, e);
        for (var r = n; r < e; ++r)
            i += String.fromCharCode(127 & t[r]);
        return i
    }
    function tp(t, n, e) {
        var i = "";
        e = Math.min(t.length, e);
        for (var r = n; r < e; ++r)
            i += String.fromCharCode(t[r]);
        return i
    }
    function np(t, n, e) {
        var i = t.length;
        (!n || n < 0) && (n = 0),
        (!e || e < 0 || e > i) && (e = i);
        for (var r = "", o = n; o < e; ++o)
            r += dp(t[o]);
        return r
    }
    function ep(t, n, e) {
        for (var i = t.slice(n, e), r = "", o = 0; o < i.length; o += 2)
            r += String.fromCharCode(i[o] + 256 * i[o + 1]);
        return r
    }
    function ip(t, n, e) {
        if (t % 1 != 0 || t < 0)
            throw new RangeError("offset is not uint");
        if (t + n > e)
            throw new RangeError("Trying to access beyond buffer length")
    }
    function rp(t, n, e, i, r, o) {
        if (!Pv(t))
            throw new TypeError('"buffer" argument must be a Buffer instance');
        if (n > r || n < o)
            throw new RangeError('"value" argument is out of bounds');
        if (e + i > t.length)
            throw new RangeError("Index out of range")
    }
    function op(t, n, e, i) {
        n < 0 && (n = 65535 + n + 1);
        for (var r = 0, o = Math.min(t.length - e, 2); r < o; ++r)
            t[e + r] = (n & 255 << 8 * (i ? r : 1 - r)) >>> 8 * (i ? r : 1 - r)
    }
    function sp(t, n, e, i) {
        n < 0 && (n = 4294967295 + n + 1);
        for (var r = 0, o = Math.min(t.length - e, 4); r < o; ++r)
            t[e + r] = n >>> 8 * (i ? r : 3 - r) & 255
    }
    function up(t, n, e, i, r, o) {
        if (e + i > t.length)
            throw new RangeError("Index out of range");
        if (e < 0)
            throw new RangeError("Index out of range")
    }
    function cp(t, n, e, i, r) {
        return r || up(t, n, e, 4),
        xv(t, n, e, i, 23, 4),
        e + 4
    }
    function ap(t, n, e, i, r) {
        return r || up(t, n, e, 8),
        xv(t, n, e, i, 52, 8),
        e + 8
    }
    Cv.prototype.slice = function(t, n) {
        var e, i = this.length;
        if ((t = ~~t) < 0 ? (t += i) < 0 && (t = 0) : t > i && (t = i),
        (n = void 0 === n ? i : ~~n) < 0 ? (n += i) < 0 && (n = 0) : n > i && (n = i),
        n < t && (n = t),
        Cv.TYPED_ARRAY_SUPPORT)
            (e = this.subarray(t, n)).__proto__ = Cv.prototype;
        else {
            var r = n - t;
            e = new Cv(r,void 0);
            for (var o = 0; o < r; ++o)
                e[o] = this[o + t]
        }
        return e
    }
    ,
    Cv.prototype.readUIntLE = function(t, n, e) {
        t |= 0,
        n |= 0,
        e || ip(t, n, this.length);
        for (var i = this[t], r = 1, o = 0; ++o < n && (r *= 256); )
            i += this[t + o] * r;
        return i
    }
    ,
    Cv.prototype.readUIntBE = function(t, n, e) {
        t |= 0,
        n |= 0,
        e || ip(t, n, this.length);
        for (var i = this[t + --n], r = 1; n > 0 && (r *= 256); )
            i += this[t + --n] * r;
        return i
    }
    ,
    Cv.prototype.readUInt8 = function(t, n) {
        return n || ip(t, 1, this.length),
        this[t]
    }
    ,
    Cv.prototype.readUInt16LE = function(t, n) {
        return n || ip(t, 2, this.length),
        this[t] | this[t + 1] << 8
    }
    ,
    Cv.prototype.readUInt16BE = function(t, n) {
        return n || ip(t, 2, this.length),
        this[t] << 8 | this[t + 1]
    }
    ,
    Cv.prototype.readUInt32LE = function(t, n) {
        return n || ip(t, 4, this.length),
        (this[t] | this[t + 1] << 8 | this[t + 2] << 16) + 16777216 * this[t + 3]
    }
    ,
    Cv.prototype.readUInt32BE = function(t, n) {
        return n || ip(t, 4, this.length),
        16777216 * this[t] + (this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3])
    }
    ,
    Cv.prototype.readIntLE = function(t, n, e) {
        t |= 0,
        n |= 0,
        e || ip(t, n, this.length);
        for (var i = this[t], r = 1, o = 0; ++o < n && (r *= 256); )
            i += this[t + o] * r;
        return i >= (r *= 128) && (i -= Math.pow(2, 8 * n)),
        i
    }
    ,
    Cv.prototype.readIntBE = function(t, n, e) {
        t |= 0,
        n |= 0,
        e || ip(t, n, this.length);
        for (var i = n, r = 1, o = this[t + --i]; i > 0 && (r *= 256); )
            o += this[t + --i] * r;
        return o >= (r *= 128) && (o -= Math.pow(2, 8 * n)),
        o
    }
    ,
    Cv.prototype.readInt8 = function(t, n) {
        return n || ip(t, 1, this.length),
        128 & this[t] ? -1 * (255 - this[t] + 1) : this[t]
    }
    ,
    Cv.prototype.readInt16LE = function(t, n) {
        n || ip(t, 2, this.length);
        var e = this[t] | this[t + 1] << 8;
        return 32768 & e ? 4294901760 | e : e
    }
    ,
    Cv.prototype.readInt16BE = function(t, n) {
        n || ip(t, 2, this.length);
        var e = this[t + 1] | this[t] << 8;
        return 32768 & e ? 4294901760 | e : e
    }
    ,
    Cv.prototype.readInt32LE = function(t, n) {
        return n || ip(t, 4, this.length),
        this[t] | this[t + 1] << 8 | this[t + 2] << 16 | this[t + 3] << 24
    }
    ,
    Cv.prototype.readInt32BE = function(t, n) {
        return n || ip(t, 4, this.length),
        this[t] << 24 | this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3]
    }
    ,
    Cv.prototype.readFloatLE = function(t, n) {
        return n || ip(t, 4, this.length),
        wv(this, t, !0, 23, 4)
    }
    ,
    Cv.prototype.readFloatBE = function(t, n) {
        return n || ip(t, 4, this.length),
        wv(this, t, !1, 23, 4)
    }
    ,
    Cv.prototype.readDoubleLE = function(t, n) {
        return n || ip(t, 8, this.length),
        wv(this, t, !0, 52, 8)
    }
    ,
    Cv.prototype.readDoubleBE = function(t, n) {
        return n || ip(t, 8, this.length),
        wv(this, t, !1, 52, 8)
    }
    ,
    Cv.prototype.writeUIntLE = function(t, n, e, i) {
        (t = +t,
        n |= 0,
        e |= 0,
        i) || rp(this, t, n, e, Math.pow(2, 8 * e) - 1, 0);
        var r = 1
          , o = 0;
        for (this[n] = 255 & t; ++o < e && (r *= 256); )
            this[n + o] = t / r & 255;
        return n + e
    }
    ,
    Cv.prototype.writeUIntBE = function(t, n, e, i) {
        (t = +t,
        n |= 0,
        e |= 0,
        i) || rp(this, t, n, e, Math.pow(2, 8 * e) - 1, 0);
        var r = e - 1
          , o = 1;
        for (this[n + r] = 255 & t; --r >= 0 && (o *= 256); )
            this[n + r] = t / o & 255;
        return n + e
    }
    ,
    Cv.prototype.writeUInt8 = function(t, n, e) {
        return t = +t,
        n |= 0,
        e || rp(this, t, n, 1, 255, 0),
        Cv.TYPED_ARRAY_SUPPORT || (t = Math.floor(t)),
        this[n] = 255 & t,
        n + 1
    }
    ,
    Cv.prototype.writeUInt16LE = function(t, n, e) {
        return t = +t,
        n |= 0,
        e || rp(this, t, n, 2, 65535, 0),
        Cv.TYPED_ARRAY_SUPPORT ? (this[n] = 255 & t,
        this[n + 1] = t >>> 8) : op(this, t, n, !0),
        n + 2
    }
    ,
    Cv.prototype.writeUInt16BE = function(t, n, e) {
        return t = +t,
        n |= 0,
        e || rp(this, t, n, 2, 65535, 0),
        Cv.TYPED_ARRAY_SUPPORT ? (this[n] = t >>> 8,
        this[n + 1] = 255 & t) : op(this, t, n, !1),
        n + 2
    }
    ,
    Cv.prototype.writeUInt32LE = function(t, n, e) {
        return t = +t,
        n |= 0,
        e || rp(this, t, n, 4, 4294967295, 0),
        Cv.TYPED_ARRAY_SUPPORT ? (this[n + 3] = t >>> 24,
        this[n + 2] = t >>> 16,
        this[n + 1] = t >>> 8,
        this[n] = 255 & t) : sp(this, t, n, !0),
        n + 4
    }
    ,
    Cv.prototype.writeUInt32BE = function(t, n, e) {
        return t = +t,
        n |= 0,
        e || rp(this, t, n, 4, 4294967295, 0),
        Cv.TYPED_ARRAY_SUPPORT ? (this[n] = t >>> 24,
        this[n + 1] = t >>> 16,
        this[n + 2] = t >>> 8,
        this[n + 3] = 255 & t) : sp(this, t, n, !1),
        n + 4
    }
    ,
    Cv.prototype.writeIntLE = function(t, n, e, i) {
        if (t = +t,
        n |= 0,
        !i) {
            var r = Math.pow(2, 8 * e - 1);
            rp(this, t, n, e, r - 1, -r)
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
    Cv.prototype.writeIntBE = function(t, n, e, i) {
        if (t = +t,
        n |= 0,
        !i) {
            var r = Math.pow(2, 8 * e - 1);
            rp(this, t, n, e, r - 1, -r)
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
    Cv.prototype.writeInt8 = function(t, n, e) {
        return t = +t,
        n |= 0,
        e || rp(this, t, n, 1, 127, -128),
        Cv.TYPED_ARRAY_SUPPORT || (t = Math.floor(t)),
        t < 0 && (t = 255 + t + 1),
        this[n] = 255 & t,
        n + 1
    }
    ,
    Cv.prototype.writeInt16LE = function(t, n, e) {
        return t = +t,
        n |= 0,
        e || rp(this, t, n, 2, 32767, -32768),
        Cv.TYPED_ARRAY_SUPPORT ? (this[n] = 255 & t,
        this[n + 1] = t >>> 8) : op(this, t, n, !0),
        n + 2
    }
    ,
    Cv.prototype.writeInt16BE = function(t, n, e) {
        return t = +t,
        n |= 0,
        e || rp(this, t, n, 2, 32767, -32768),
        Cv.TYPED_ARRAY_SUPPORT ? (this[n] = t >>> 8,
        this[n + 1] = 255 & t) : op(this, t, n, !1),
        n + 2
    }
    ,
    Cv.prototype.writeInt32LE = function(t, n, e) {
        return t = +t,
        n |= 0,
        e || rp(this, t, n, 4, 2147483647, -2147483648),
        Cv.TYPED_ARRAY_SUPPORT ? (this[n] = 255 & t,
        this[n + 1] = t >>> 8,
        this[n + 2] = t >>> 16,
        this[n + 3] = t >>> 24) : sp(this, t, n, !0),
        n + 4
    }
    ,
    Cv.prototype.writeInt32BE = function(t, n, e) {
        return t = +t,
        n |= 0,
        e || rp(this, t, n, 4, 2147483647, -2147483648),
        t < 0 && (t = 4294967295 + t + 1),
        Cv.TYPED_ARRAY_SUPPORT ? (this[n] = t >>> 24,
        this[n + 1] = t >>> 16,
        this[n + 2] = t >>> 8,
        this[n + 3] = 255 & t) : sp(this, t, n, !1),
        n + 4
    }
    ,
    Cv.prototype.writeFloatLE = function(t, n, e) {
        return cp(this, t, n, !0, e)
    }
    ,
    Cv.prototype.writeFloatBE = function(t, n, e) {
        return cp(this, t, n, !1, e)
    }
    ,
    Cv.prototype.writeDoubleLE = function(t, n, e) {
        return ap(this, t, n, !0, e)
    }
    ,
    Cv.prototype.writeDoubleBE = function(t, n, e) {
        return ap(this, t, n, !1, e)
    }
    ,
    Cv.prototype.copy = function(t, n, e, i) {
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
        else if (o < 1e3 || !Cv.TYPED_ARRAY_SUPPORT)
            for (r = 0; r < o; ++r)
                t[r + n] = this[r + e];
        else
            Uint8Array.prototype.set.call(t, this.subarray(e, e + o), n);
        return o
    }
    ,
    Cv.prototype.fill = function(t, n, e, i) {
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
            if ("string" == typeof i && !Cv.isEncoding(i))
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
            var s = Pv(t) ? t : vp(new Cv(t,i).toString())
              , u = s.length;
            for (o = 0; o < e - n; ++o)
                this[o + n] = s[o % u]
        }
        return this
    }
    ;
    var lp = /[^+\/0-9A-Za-z-_]/g;
    function fp(t) {
        if ((t = hp(t).replace(lp, "")).length < 2)
            return "";
        for (; t.length % 4 != 0; )
            t += "=";
        return t
    }
    function hp(t) {
        return t.trim ? t.trim() : t.replace(/^\s+|\s+$/g, "")
    }
    function dp(t) {
        return t < 16 ? "0" + t.toString(16) : t.toString(16)
    }
    function vp(t, n) {
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
    function pp(t) {
        for (var n = [], e = 0; e < t.length; ++e)
            n.push(255 & t.charCodeAt(e));
        return n
    }
    function mp(t, n) {
        for (var e, i, r, o = [], s = 0; s < t.length && !((n -= 2) < 0); ++s)
            i = (e = t.charCodeAt(s)) >> 8,
            r = e % 256,
            o.push(r),
            o.push(i);
        return o
    }
    function yp(t) {
        return mv(fp(t))
    }
    function gp(t, n, e, i) {
        for (var r = 0; r < i && !(r + e >= n.length || r >= t.length); ++r)
            n[r + e] = t[r];
        return r
    }
    function bp(t) {
        return t != t
    }
    function wp(t) {
        return null != t && (!!t._isBuffer || xp(t) || kp(t))
    }
    function xp(t) {
        return !!t.constructor && "function" == typeof t.constructor.isBuffer && t.constructor.isBuffer(t)
    }
    function kp(t) {
        return "function" == typeof t.readFloatLE && "function" == typeof t.slice && xp(t.slice(0, 0))
    }
    class Sp {
        constructor(t, n, e) {
            let i, r, o, s, u, c;
            if (!(this instanceof Sp))
                return new Sp(t,n,e);
            for (this.xt = 16,
            this.kt = 3.5,
            this.St = 12,
            this.Et = "Error 001",
            this.Tt = "Error 002",
            this.Ot = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890",
            this.Ct = "cfhistuCFHISTU",
            this.At = parseInt(n, 10) > 0 ? n : 0,
            this.Xt = "string" == typeof t ? t : "",
            "string" == typeof e && (this.Ot = e),
            i = "",
            r = 0,
            s = this.Ot.length; r !== s; r++)
                -1 === i.indexOf(this.Ot[r]) && (i += this.Ot[r]);
            if (this.Ot = i,
            this.Ot.length < this.xt)
                throw this.Et.replace("X", this.xt);
            if (-1 !== this.Ot.search(" "))
                throw this.Tt;
            for (r = 0,
            s = this.Ct.length; r !== s; r++)
                o = this.Ot.indexOf(this.Ct[r]),
                -1 === o ? this.Ct = this.Ct.substr(0, r) + " " + this.Ct.substr(r + 1) : this.Ot = this.Ot.substr(0, o) + " " + this.Ot.substr(o + 1);
            this.Ot = this.Ot.replace(/ /g, ""),
            this.Ct = this.Ct.replace(/ /g, ""),
            this.Ct = Ep(this.Ct, this.Xt),
            (!this.Ct.length || this.Ot.length / this.Ct.length > this.kt) && (u = Math.ceil(this.Ot.length / this.kt),
            1 === u && u++,
            u > this.Ct.length ? (c = u - this.Ct.length,
            this.Ct += this.Ot.substr(0, c),
            this.Ot = this.Ot.substr(c)) : this.Ct = this.Ct.substr(0, u)),
            this.Ot = Ep(this.Ot, this.Xt);
            const a = Math.ceil(this.Ot.length / this.St);
            this.Ot.length < 3 ? (this.It = this.Ct.substr(0, a),
            this.Ct = this.Ct.substr(a)) : (this.It = this.Ot.substr(0, a),
            this.Ot = this.Ot.substr(a))
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
            return this.Mt(e)
        }
        o(t) {
            const n = [];
            return t.length && "string" == typeof t ? this.Rt(t, this.Ot) : n
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
            const n = Cv.from(t).toString("hex");
            return this.h(n)
        }
        q(t) {
            return Cv.from(this.x(t), "hex").toString("utf8")
        }
        Mt(t) {
            let n, e, i, r, o, s, u, c, a, l, f = this.Ot;
            const h = t.length;
            let d = 0;
            for (e = 0,
            i = t.length; e !== i; e++)
                d += t[e] % (e + 100);
            const v = n = f[d % f.length];
            for (e = 0,
            i = t.length; e !== i; e++)
                r = t[e],
                o = v + this.Xt + f,
                f = Ep(f, o.substr(0, f.length)),
                s = Tp(r, f),
                n += s,
                e + 1 < h && (r %= s.charCodeAt(0) + e,
                u = r % this.Ct.length,
                n += this.Ct[u]);
            n.length < this.At && (c = (d + n[0].charCodeAt(0)) % this.It.length,
            a = this.It[c],
            n = a + n,
            n.length < this.At && (c = (d + n[2].charCodeAt(0)) % this.It.length,
            a = this.It[c],
            n += a));
            const p = parseInt(f.length / 2, 10);
            for (; n.length < this.At; )
                f = Ep(f, f),
                n = f.substr(p) + n + f.substr(0, p),
                l = n.length - this.At,
                l > 0 && (n = n.substr(l / 2, this.At));
            return n
        }
        Rt(t, n) {
            let e, i, r, o, s = [], u = 0, c = new RegExp("[" + this.It + "]","g"), a = t.replace(c, " "), l = a.split(" ");
            if (3 !== l.length && 2 !== l.length || (u = 1),
            a = l[u],
            void 0 !== a[0]) {
                for (e = a[0],
                a = a.substr(1),
                c = new RegExp("[" + this.Ct + "]","g"),
                a = a.replace(c, " "),
                l = a.split(" "),
                u = 0,
                i = l.length; u !== i; u++)
                    r = l[u],
                    o = e + this.Xt + n,
                    n = Ep(n, o.substr(0, n.length)),
                    s.push(Op(r, n));
                this.Mt(s) !== t && (s = [])
            }
            return s
        }
    }
    function Ep(t, n) {
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
    function Tp(t, n) {
        let e = "";
        const i = n.length;
        do {
            e = n[t % i] + e,
            t = parseInt(t / i, 10)
        } while (t);
        return e
    }
    function Op(t, n) {
        let e, i, r = 0;
        for (i = 0; i < t.length; i++)
            e = n.indexOf(t[i]),
            r += e * Math.pow(n.length, t.length - i - 1);
        return r
    }
    function Cp(t) {
        let n, e, i;
        return {
            c() {
                n = Xl("input"),
                Dl(n, "placeholder", t[1]),
                Dl(n, "autocomplete", t[2]),
                n.autofocus = t[3],
                Dl(n, "maxlength", t[4]),
                n.disabled = t[6],
                Dl(n, "class", "svelte-1bm78md"),
                Ll(n, "gray", t[5])
            },
            m(r, o) {
                Ol(r, n, o),
                $l(n, t[0]),
                e || (i = [gl(t[7].call(null, n)), Rl(n, "input", t[10]), Rl(n, "input", t[9])],
                e = !0)
            },
            p(t, [e]) {
                2 & e && Dl(n, "placeholder", t[1]),
                4 & e && Dl(n, "autocomplete", t[2]),
                8 & e && (n.autofocus = t[3]),
                16 & e && Dl(n, "maxlength", t[4]),
                64 & e && (n.disabled = t[6]),
                1 & e && n.value !== t[0] && $l(n, t[0]),
                32 & e && Ll(n, "gray", t[5])
            },
            i: el,
            o: el,
            d(t) {
                t && Cl(n),
                e = !1,
                ul(i)
            }
        }
    }
    function Ap(t, n, e) {
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
            uf(t, n)
        }
        , function() {
            o = this.value,
            e(0, o)
        }
        ]
    }
    class Xp extends Ff {
        constructor(t) {
            super(),
            $f(this, t, Ap, Cp, al, {
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
    function Ip(t) {
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
        e = new Xp({
            props: h
        }),
        af.push(( () => Df(e, "value", f))),
        {
            c() {
                n = Xl("div"),
                jf(e.$$.fragment),
                r = _l(),
                o = Xl("div"),
                s = Xl("button"),
                u = Il(t[1]),
                s.disabled = t[2],
                Dl(s, "class", "svelte-1ci3qls"),
                Dl(o, "class", "code-input-button svelte-1ci3qls"),
                Dl(n, "class", "code-input svelte-1ci3qls")
            },
            m(i, f) {
                Ol(i, n, f),
                Bf(e, n, null),
                Tl(n, r),
                Tl(n, o),
                Tl(o, s),
                Tl(s, u),
                c = !0,
                a || (l = Rl(s, "click", t[3]),
                a = !0)
            },
            p(t, [n]) {
                const r = {};
                !i && 1 & n && (i = !0,
                r.value = t[0],
                mf(( () => i = !1))),
                e.$set(r),
                (!c || 2 & n) && ql(u, t[1]),
                (!c || 4 & n) && (s.disabled = t[2])
            },
            i(t) {
                c || (Af(e.$$.fragment, t),
                c = !0)
            },
            o(t) {
                Xf(e.$$.fragment, t),
                c = !1
            },
            d(t) {
                t && Cl(n),
                Pf(e),
                a = !1,
                l()
            }
        }
    }
    const _p = "viewVerifyCode";
    function Mp(t, n, e) {
        let {cell: i} = n
          , {code: r=""} = n;
        const o = Lt(_p);
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
        return ef(( () => {
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
                        return Bt(ci, {});
                    return Bt(ai, {
                        loginName: t,
                        token: new Sp(t).p(t)
                    })
                }(i) ? (c = 60,
                e(1, s = "已发送 (" + c + "s)"),
                a = setInterval(( () => {
                    c--,
                    c <= 0 ? l() : e(1, s = "已发送 (" + c + "s)")
                }
                ), K.SECOND)) : e(2, u = !1)
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
    class Rp extends Ff {
        constructor(t) {
            super(),
            $f(this, t, Mp, Ip, al, {
                cell: 4,
                code: 0
            })
        }
    }
    function Dp(t) {
        let n;
        return {
            c() {
                n = Xl("p"),
                n.textContent = "本账号在过多设备上登录，未防止盗号，请绑定手机。"
            },
            m(t, e) {
                Ol(t, n, e)
            },
            p: el,
            i: el,
            o: el,
            d(t) {
                t && Cl(n)
            }
        }
    }
    function jp(t) {
        let n, e, i, r, o, s, u, c, a, l;
        function f(n) {
            t[4](n)
        }
        let h = {};
        return void 0 !== t[2] && (h.code = t[2]),
        c = new Rp({
            props: h
        }),
        af.push(( () => Df(c, "code", f))),
        {
            c() {
                n = Xl("p"),
                n.textContent = "本账号在过多设备上登录，需二次验证身份。",
                e = _l(),
                i = Xl("div"),
                r = Il("我们将向"),
                o = Il(t[1]),
                s = Il("的手机号发送验证码。"),
                u = _l(),
                jf(c.$$.fragment),
                Dl(i, "class", "tip svelte-15ra0dz")
            },
            m(t, a) {
                Ol(t, n, a),
                Ol(t, e, a),
                Ol(t, i, a),
                Tl(i, r),
                Tl(i, o),
                Tl(i, s),
                Ol(t, u, a),
                Bf(c, t, a),
                l = !0
            },
            p(t, n) {
                (!l || 2 & n) && ql(o, t[1]);
                const e = {};
                !a && 4 & n && (a = !0,
                e.code = t[2],
                mf(( () => a = !1))),
                c.$set(e)
            },
            i(t) {
                l || (Af(c.$$.fragment, t),
                l = !0)
            },
            o(t) {
                Xf(c.$$.fragment, t),
                l = !1
            },
            d(t) {
                t && Cl(n),
                t && Cl(e),
                t && Cl(i),
                t && Cl(u),
                Pf(c, t)
            }
        }
    }
    function Bp(t) {
        let n, e, i, r, o, s;
        const u = [jp, Dp]
          , c = [];
        function a(t, n) {
            return t[1] ? 0 : 1
        }
        return r = a(t),
        o = c[r] = u[r](t),
        {
            c() {
                n = Xl("div"),
                n.textContent = "二次验证",
                e = _l(),
                i = Xl("div"),
                o.c(),
                Dl(n, "title", ""),
                Dl(i, "description", ""),
                Dl(i, "class", "svelte-15ra0dz")
            },
            m(t, o) {
                Ol(t, n, o),
                Ol(t, e, o),
                Ol(t, i, o),
                c[r].m(i, null),
                s = !0
            },
            p(t, n) {
                let e = r;
                r = a(t),
                r === e ? c[r].p(t, n) : (Of(),
                Xf(c[e], 1, 1, ( () => {
                    c[e] = null
                }
                )),
                Cf(),
                o = c[r],
                o ? o.p(t, n) : (o = c[r] = u[r](t),
                o.c()),
                Af(o, 1),
                o.m(i, null))
            },
            i(t) {
                s || (Af(o),
                s = !0)
            },
            o(t) {
                Xf(o),
                s = !1
            },
            d(t) {
                t && Cl(n),
                t && Cl(e),
                t && Cl(i),
                c[r].d()
            }
        }
    }
    function Pp(t) {
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
                default: [Bp]
            },
            $$scope: {
                ctx: t
            }
        };
        return void 0 !== t[0] && (o.open = t[0]),
        n = new Hd({
            props: o
        }),
        af.push(( () => Df(n, "open", r))),
        {
            c() {
                jf(n.$$.fragment)
            },
            m(t, e) {
                Bf(n, t, e),
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
                mf(( () => e = !1))),
                n.$set(r)
            },
            i(t) {
                i || (Af(n.$$.fragment, t),
                i = !0)
            },
            o(t) {
                Xf(n.$$.fragment, t),
                i = !1
            },
            d(t) {
                Pf(n, t)
            }
        }
    }
    function qp(t, n, e) {
        let i, {open: r} = n, {cell: o} = n;
        return t.$$set = t => {
            "open"in t && e(0, r = t.open),
            "cell"in t && e(1, o = t.cell)
        }
        ,
        [r, o, i, async function(t) {
            if (!t)
                return await nl(),
                !0;
            if (!o)
                return location.href = yi,
                !0;
            if (i) {
                const t = await $t(ui, {
                    code: i
                });
                if (t) {
                    const {closedSessionCount: n} = t;
                    return Cn.show("验证成功，登出" + n + "个其他设备"),
                    !0
                }
            }
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
    class $p extends Ff {
        constructor(t) {
            super(),
            $f(this, t, qp, Pp, al, {
                open: 0,
                cell: 1
            })
        }
    }
    function Fp(t, n, e) {
        const i = t.slice();
        return i[8] = n[e],
        i
    }
    function Np(t) {
        let n, e, i, r = t[8].icon + "";
        return {
            c() {
                n = Xl("span"),
                e = Il(r),
                Dl(n, "class", "icon yoopu3-icon svelte-av5z1h"),
                Dl(n, "style", i = t[8].iconColor ? `color: ${t[8].iconColor}` : "")
            },
            m(t, i) {
                Ol(t, n, i),
                Tl(n, e)
            },
            p(t, o) {
                2 & o && r !== (r = t[8].icon + "") && ql(e, r),
                2 & o && i !== (i = t[8].iconColor ? `color: ${t[8].iconColor}` : "") && Dl(n, "style", i)
            },
            d(t) {
                t && Cl(n)
            }
        }
    }
    function zp(t) {
        let n, e, i, r, o, s, u, c, a, l, f = t[8].title + "", h = t[8].icon && Np(t);
        function d() {
            return t[5](t[8])
        }
        return {
            c() {
                n = Xl("div"),
                e = Xl("span"),
                e.innerHTML = '<span class="checkmark-checked svelte-av5z1h"></span>',
                i = _l(),
                r = Xl("div"),
                h && h.c(),
                o = _l(),
                s = Xl("span"),
                u = Il(f),
                c = _l(),
                Dl(e, "class", "checkmark svelte-av5z1h"),
                Dl(s, "class", "title svelte-av5z1h"),
                Dl(r, "class", "content svelte-av5z1h"),
                Dl(n, "class", "option svelte-av5z1h"),
                Ll(n, "bottom-line", t[3]),
                Ll(n, "reverse", t[4]),
                Ll(n, "selected", t[8].value == t[0]),
                Ll(n, "disabled", t[8].disabled)
            },
            m(t, f) {
                Ol(t, n, f),
                Tl(n, e),
                Tl(n, i),
                Tl(n, r),
                h && h.m(r, null),
                Tl(r, o),
                Tl(r, s),
                Tl(s, u),
                Tl(n, c),
                a || (l = Rl(n, "click", d),
                a = !0)
            },
            p(e, i) {
                (t = e)[8].icon ? h ? h.p(t, i) : (h = Np(t),
                h.c(),
                h.m(r, o)) : h && (h.d(1),
                h = null),
                2 & i && f !== (f = t[8].title + "") && ql(u, f),
                8 & i && Ll(n, "bottom-line", t[3]),
                16 & i && Ll(n, "reverse", t[4]),
                3 & i && Ll(n, "selected", t[8].value == t[0]),
                2 & i && Ll(n, "disabled", t[8].disabled)
            },
            d(t) {
                t && Cl(n),
                h && h.d(),
                a = !1,
                l()
            }
        }
    }
    function Lp(t) {
        let n, e = t[1], i = [];
        for (let n = 0; n < e.length; n += 1)
            i[n] = zp(Fp(t, e, n));
        return {
            c() {
                n = Xl("div");
                for (let t = 0; t < i.length; t += 1)
                    i[t].c();
                Dl(n, "class", "container svelte-av5z1h"),
                Ll(n, "check-style", t[2])
            },
            m(t, e) {
                Ol(t, n, e);
                for (let t = 0; t < i.length; t += 1)
                    i[t].m(n, null)
            },
            p(t, [r]) {
                if (27 & r) {
                    let o;
                    for (e = t[1],
                    o = 0; o < e.length; o += 1) {
                        const s = Fp(t, e, o);
                        i[o] ? i[o].p(s, r) : (i[o] = zp(s),
                        i[o].c(),
                        i[o].m(n, null))
                    }
                    for (; o < i.length; o += 1)
                        i[o].d(1);
                    i.length = e.length
                }
                4 & r && Ll(n, "check-style", t[2])
            },
            i: el,
            o: el,
            d(t) {
                t && Cl(n),
                Al(i, t)
            }
        }
    }
    function Gp(t, n, e) {
        let {options: i=[]} = n
          , {selected: r} = n
          , {checkStyle: o=!1} = n
          , {bottomLine: s=!1} = n
          , {reverse: u=!1} = n;
        const c = rf();
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
    class Up extends Ff {
        constructor(t) {
            super(),
            $f(this, t, Gp, Lp, al, {
                options: 1,
                selected: 0,
                checkStyle: 2,
                bottomLine: 3,
                reverse: 4
            })
        }
    }
    function Hp(t) {
        let n, e, i, r, o;
        function s(n) {
            t[4](n)
        }
        let u = {
            options: t[2]
        };
        return void 0 !== t[1] && (u.selected = t[1]),
        i = new Up({
            props: u
        }),
        af.push(( () => Df(i, "selected", s))),
        i.$on("change", t[3]),
        {
            c() {
                n = Xl("div"),
                n.textContent = "黑夜模式设置",
                e = _l(),
                jf(i.$$.fragment),
                Dl(n, "title", "")
            },
            m(t, r) {
                Ol(t, n, r),
                Ol(t, e, r),
                Bf(i, t, r),
                o = !0
            },
            p(t, n) {
                const e = {};
                !r && 2 & n && (r = !0,
                e.selected = t[1],
                mf(( () => r = !1))),
                i.$set(e)
            },
            i(t) {
                o || (Af(i.$$.fragment, t),
                o = !0)
            },
            o(t) {
                Xf(i.$$.fragment, t),
                o = !1
            },
            d(t) {
                t && Cl(n),
                t && Cl(e),
                Pf(i, t)
            }
        }
    }
    function Vp(t) {
        let n, e, i;
        function r(n) {
            t[5](n)
        }
        let o = {
            cancelButtonText: "",
            noButtons: !0,
            $$slots: {
                default: [Hp]
            },
            $$scope: {
                ctx: t
            }
        };
        return void 0 !== t[0] && (o.open = t[0]),
        n = new Hd({
            props: o
        }),
        af.push(( () => Df(n, "open", r))),
        {
            c() {
                jf(n.$$.fragment)
            },
            m(t, e) {
                Bf(n, t, e),
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
                mf(( () => e = !1))),
                n.$set(r)
            },
            i(t) {
                i || (Af(n.$$.fragment, t),
                i = !0)
            },
            o(t) {
                Xf(n.$$.fragment, t),
                i = !1
            },
            d(t) {
                Pf(n, t)
            }
        }
    }
    function Wp(t, n, e) {
        let i;
        hl(t, ah, (t => e(6, i = t)));
        let {open: r} = n
          , o = i;
        const s = [{
            title: "自动 (追随系统)",
            value: nh.DEFAULT
        }, {
            title: "强制开启",
            value: nh.DARK
        }, {
            title: "强制关闭",
            value: nh.LIGHT
        }];
        return t.$$set = t => {
            "open"in t && e(0, r = t.open)
        }
        ,
        [r, o, s, function() {
            ah.set(o),
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
    class Jp extends Ff {
        constructor(t) {
            super(),
            $f(this, t, Wp, Vp, al, {
                open: 0
            })
        }
    }
    function Kp(t) {
        let n, e, i, r, o, s, u, c;
        return {
            c() {
                n = Xl("label"),
                e = Xl("div"),
                i = Xl("img"),
                o = _l(),
                s = Xl("div"),
                s.innerHTML = '<div class="minor svelte-1kspwqr">五线谱+功能谱</div> \n          <div class="main svelte-1kspwqr">钢琴</div> \n          <div class="promotion svelte-1kspwqr">新！免费会员发放中</div>',
                i.src !== (r = h) && Dl(i, "src", r),
                Dl(i, "class", "svelte-1kspwqr"),
                Dl(s, "class", "label svelte-1kspwqr"),
                Dl(e, "class", "checkbox svelte-1kspwqr"),
                Dl(n, "class", "option svelte-1kspwqr"),
                Ll(n, "checked", t[0] === Z.PIANO)
            },
            m(r, a) {
                Ol(r, n, a),
                Tl(n, e),
                Tl(e, i),
                Tl(e, o),
                Tl(e, s),
                u || (c = Rl(n, "click", t[4]),
                u = !0)
            },
            p(t, e) {
                1 & e && Ll(n, "checked", t[0] === Z.PIANO)
            },
            d(t) {
                t && Cl(n),
                u = !1,
                c()
            }
        }
    }
    function Yp(t) {
        let n, e, i, r, o, s, u, c, a, l, f, h, m, y, g, b, w, x, k, S, E, T, O, C, A = t[1] && Kp(t);
        return {
            c() {
                n = Xl("div"),
                A && A.c(),
                e = _l(),
                i = Xl("label"),
                r = Xl("div"),
                o = Xl("img"),
                u = _l(),
                c = Xl("div"),
                c.innerHTML = '<div class="minor svelte-1kspwqr">六线谱+和弦谱</div> \n        <div class="main svelte-1kspwqr">吉他</div>',
                a = _l(),
                l = Xl("label"),
                f = Xl("div"),
                h = Xl("img"),
                y = _l(),
                g = Xl("div"),
                g.innerHTML = '<div class="minor svelte-1kspwqr">四线谱+和弦谱</div> \n        <div class="main svelte-1kspwqr">尤克里里</div>',
                b = _l(),
                w = Xl("label"),
                x = Xl("div"),
                k = Xl("img"),
                E = _l(),
                T = Xl("div"),
                T.innerHTML = '<div class="minor svelte-1kspwqr">简谱</div> \n        <div class="main svelte-1kspwqr">民乐</div>',
                o.src !== (s = d) && Dl(o, "src", s),
                Dl(o, "class", "svelte-1kspwqr"),
                Dl(c, "class", "label svelte-1kspwqr"),
                Dl(r, "class", "checkbox svelte-1kspwqr"),
                Dl(i, "class", "option svelte-1kspwqr"),
                Ll(i, "checked", t[0] === Z.GUITAR),
                h.src !== (m = v) && Dl(h, "src", m),
                Dl(h, "class", "svelte-1kspwqr"),
                Dl(g, "class", "label svelte-1kspwqr"),
                Dl(f, "class", "checkbox svelte-1kspwqr"),
                Dl(l, "class", "option svelte-1kspwqr"),
                Ll(l, "checked", t[0] === Z.UKULELE),
                k.src !== (S = p) && Dl(k, "src", S),
                Dl(k, "class", "svelte-1kspwqr"),
                Dl(T, "class", "label svelte-1kspwqr"),
                Dl(x, "class", "checkbox svelte-1kspwqr"),
                Dl(w, "class", "option svelte-1kspwqr"),
                Ll(w, "checked", t[0] === Z.JIAN),
                Dl(n, "class", "options svelte-1kspwqr")
            },
            m(s, d) {
                Ol(s, n, d),
                A && A.m(n, null),
                Tl(n, e),
                Tl(n, i),
                Tl(i, r),
                Tl(r, o),
                Tl(r, u),
                Tl(r, c),
                Tl(n, a),
                Tl(n, l),
                Tl(l, f),
                Tl(f, h),
                Tl(f, y),
                Tl(f, g),
                Tl(n, b),
                Tl(n, w),
                Tl(w, x),
                Tl(x, k),
                Tl(x, E),
                Tl(x, T),
                O || (C = [Rl(i, "click", t[5]), Rl(l, "click", t[6]), Rl(w, "click", t[7])],
                O = !0)
            },
            p(t, [n]) {
                t[1] && A.p(t, n),
                1 & n && Ll(i, "checked", t[0] === Z.GUITAR),
                1 & n && Ll(l, "checked", t[0] === Z.UKULELE),
                1 & n && Ll(w, "checked", t[0] === Z.JIAN)
            },
            i: el,
            o: el,
            d(t) {
                t && Cl(n),
                A && A.d(),
                O = !1,
                ul(C)
            }
        }
    }
    function Qp(t, n, e) {
        let {instrument: i} = n
          , {user: r=Ua()} = n;
        r && kt(r.role, ht.EDITOR);
        const o = rf();
        function s(t) {
            e(0, i = t),
            o("change")
        }
        return t.$$set = t => {
            "instrument"in t && e(0, i = t.instrument),
            "user"in t && e(3, r = t.user)
        }
        ,
        [i, !0, s, r, () => s(Z.PIANO), () => s(Z.GUITAR), () => s(Z.UKULELE), () => s(Z.JIAN)]
    }
    class Zp extends Ff {
        constructor(t) {
            super(),
            $f(this, t, Qp, Yp, al, {
                instrument: 0,
                user: 3
            })
        }
    }
    function tm(t) {
        const n = Kt(t)
          , e = nm.bind(null, n);
        return Ha().then((t => {
            if (!t)
                return [];
            let n = [];
            return t.sheets && (n = n.concat(t.sheets)),
            t.favorites && (n = n.concat(t.favorites)),
            n.filter(e)
        }
        ))
    }
    function nm(t, n) {
        for (let e = 0; e < t.length; ++e)
            if (n.artist.toLowerCase().indexOf(t[e]) < 0 && n.title.toLowerCase().indexOf(t[e]) < 0)
                return !1;
        return !0
    }
    const em = ["初级", "进阶", "指弹", "弹唱", "吉他", "尤克里里"];
    class im {
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
    const rm = 50
      , om = 16
      , sm = 5;
    let um;
    function cm() {
        return um || (um = new am),
        um
    }
    class am {
        constructor() {
            this.Dt = {},
            this.jt = null
        }
        getHotQueries(t) {
            return t = t || Z.GUITAR,
            this.Bt(t).then((t => t.slice(0, rm))).then((t => im.shuffle(t))).then((t => t.slice(0, om)))
        }
        getHistoryQueries() {
            return null == this.jt && (this.jt = Wt.getJson(Ut.USER_DATA_HISTORY_QUERIES) || []),
            this.jt
        }
        addHistoryQuery(t) {
            if (0 === t.trim().length)
                return;
            if (em.indexOf(t) >= 0)
                return;
            this.getHistoryQueries();
            const n = this.jt.indexOf(t);
            n >= 0 && this.jt.splice(n, 1),
            this.jt.unshift(t),
            this.jt.length > sm && this.jt.pop(),
            Wt.setJson(Ut.USER_DATA_HISTORY_QUERIES, this.jt)
        }
        clearHistoryQuery() {
            this.jt = [],
            Wt.setJson(Ut.USER_DATA_HISTORY_QUERIES, this.jt)
        }
        getAutoCompletion(t, n) {
            return t = t || Z.GUITAR,
            this.Bt(t).then((t => {
                const e = [];
                for (let i = 0; i < t.length && e.length < 5; ++i)
                    0 === t[i].indexOf(n.toLowerCase()) && e.push(t[i]);
                return e
            }
            ))
        }
        Bt(t) {
            return this.Dt[t] || (this.Dt[t] = this.Pt(t)),
            this.Dt[t].then((t => t || []))
        }
        async Pt(t) {
            const n = va.HOT_QUERIES_FOR_INSTRUMENT + t
              , e = await ga(n);
            if (e && e.timestamp > Date.now() - K.DAY)
                return e.queries;
            const i = await Dt(wt(mi, {
                instrument: t
            }));
            return i && await ya(n, {
                timestamp: Date.now(),
                queries: i
            }),
            i || []
        }
    }
    function lm(t, n, e) {
        const i = t.slice();
        return i[10] = n[e],
        i
    }
    function fm(t, n, e) {
        const i = t.slice();
        return i[13] = n[e],
        i
    }
    function hm(t) {
        let n, e, i, r, o, s, u, c, a = t[13] + "";
        function l() {
            return t[4](t[13])
        }
        return {
            c() {
                n = Xl("div"),
                e = Xl("i"),
                e.textContent = "",
                i = _l(),
                r = Xl("span"),
                o = Il(a),
                s = _l(),
                Dl(e, "class", "yoopu3-icon svelte-vbhppz"),
                Dl(n, "class", "row svelte-vbhppz")
            },
            m(t, a) {
                Ol(t, n, a),
                Tl(n, e),
                Tl(n, i),
                Tl(n, r),
                Tl(r, o),
                Tl(n, s),
                u || (c = Rl(n, "click", l),
                u = !0)
            },
            p(n, e) {
                t = n,
                1 & e && a !== (a = t[13] + "") && ql(o, a)
            },
            d(t) {
                t && Cl(n),
                u = !1,
                c()
            }
        }
    }
    function dm(t) {
        let n, e, i, r = t[1], o = [];
        for (let n = 0; n < r.length; n += 1)
            o[n] = vm(lm(t, r, n));
        return {
            c() {
                n = Xl("h5"),
                n.textContent = "我的原创和收藏",
                e = _l(),
                i = Xl("div");
                for (let t = 0; t < o.length; t += 1)
                    o[t].c();
                Dl(n, "class", "svelte-vbhppz"),
                Dl(i, "class", "list svelte-vbhppz")
            },
            m(t, r) {
                Ol(t, n, r),
                Ol(t, e, r),
                Ol(t, i, r);
                for (let t = 0; t < o.length; t += 1)
                    o[t].m(i, null)
            },
            p(t, n) {
                if (2 & n) {
                    let e;
                    for (r = t[1],
                    e = 0; e < r.length; e += 1) {
                        const s = lm(t, r, e);
                        o[e] ? o[e].p(s, n) : (o[e] = vm(s),
                        o[e].c(),
                        o[e].m(i, null))
                    }
                    for (; e < o.length; e += 1)
                        o[e].d(1);
                    o.length = r.length
                }
            },
            d(t) {
                t && Cl(n),
                t && Cl(e),
                t && Cl(i),
                Al(o, t)
            }
        }
    }
    function vm(t) {
        let n, e, i, r, o, s, u, c, a, l = t[10].artist + "", f = t[10].title + "";
        return {
            c() {
                n = Xl("a"),
                e = Xl("i"),
                e.textContent = "",
                i = _l(),
                r = Xl("span"),
                o = Il(l),
                s = Il(" - "),
                u = Il(f),
                c = _l(),
                Dl(e, "class", "yoopu3-icon svelte-vbhppz"),
                Dl(n, "class", "row svelte-vbhppz"),
                Dl(n, "href", a = "/view/" + t[10].id)
            },
            m(t, a) {
                Ol(t, n, a),
                Tl(n, e),
                Tl(n, i),
                Tl(n, r),
                Tl(r, o),
                Tl(r, s),
                Tl(r, u),
                Tl(n, c)
            },
            p(t, e) {
                2 & e && l !== (l = t[10].artist + "") && ql(o, l),
                2 & e && f !== (f = t[10].title + "") && ql(u, f),
                2 & e && a !== (a = "/view/" + t[10].id) && Dl(n, "href", a)
            },
            d(t) {
                t && Cl(n)
            }
        }
    }
    function pm(t) {
        let n, e, i, r = t[0], o = [];
        for (let n = 0; n < r.length; n += 1)
            o[n] = hm(fm(t, r, n));
        let s = t[1].length && dm(t);
        return {
            c() {
                n = Xl("section"),
                e = Xl("div");
                for (let t = 0; t < o.length; t += 1)
                    o[t].c();
                i = _l(),
                s && s.c(),
                Dl(e, "class", "list svelte-vbhppz"),
                Dl(n, "class", "searchAutoComplete svelte-vbhppz")
            },
            m(t, r) {
                Ol(t, n, r),
                Tl(n, e);
                for (let t = 0; t < o.length; t += 1)
                    o[t].m(e, null);
                Tl(n, i),
                s && s.m(n, null)
            },
            p(t, [i]) {
                if (5 & i) {
                    let n;
                    for (r = t[0],
                    n = 0; n < r.length; n += 1) {
                        const s = fm(t, r, n);
                        o[n] ? o[n].p(s, i) : (o[n] = hm(s),
                        o[n].c(),
                        o[n].m(e, null))
                    }
                    for (; n < o.length; n += 1)
                        o[n].d(1);
                    o.length = r.length
                }
                t[1].length ? s ? s.p(t, i) : (s = dm(t),
                s.c(),
                s.m(n, null)) : s && (s.d(1),
                s = null)
            },
            i: el,
            o: el,
            d(t) {
                t && Cl(n),
                Al(o, t),
                s && s.d()
            }
        }
    }
    function mm(t, n, e) {
        let i;
        hl(t, Gf, (t => e(5, i = t)));
        let {query: r} = n;
        const o = cm()
          , s = rf();
        let u = []
          , c = [];
        function a(t) {
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
            8 & t.$$.dirty && async function(t) {
                e(1, c = Ua() ? await tm(t) : [])
            }(r)
        }
        ,
        [u, c, a, r, t => a(t)]
    }
    class ym extends Ff {
        constructor(t) {
            super(),
            $f(this, t, mm, pm, al, {
                query: 3
            })
        }
    }
    function gm(t, n, e) {
        const i = t.slice();
        return i[10] = n[e],
        i
    }
    function bm(t, n, e) {
        const i = t.slice();
        return i[10] = n[e],
        i
    }
    function wm(t) {
        let n, e, i, r, o, s, u, c, a, l = t[0], f = [];
        for (let n = 0; n < l.length; n += 1)
            f[n] = xm(bm(t, l, n));
        return {
            c() {
                n = Xl("section"),
                e = Xl("div"),
                i = Xl("span"),
                i.textContent = "搜索历史",
                r = _l(),
                o = Xl("span"),
                o.textContent = "清除记录",
                s = _l(),
                u = Xl("div");
                for (let t = 0; t < f.length; t += 1)
                    f[t].c();
                Dl(o, "class", "right button svelte-1pln1xx"),
                Dl(e, "class", "title svelte-1pln1xx"),
                Dl(u, "class", "queries svelte-1pln1xx"),
                Dl(n, "class", "svelte-1pln1xx")
            },
            m(l, h) {
                Ol(l, n, h),
                Tl(n, e),
                Tl(e, i),
                Tl(e, r),
                Tl(e, o),
                Tl(n, s),
                Tl(n, u);
                for (let t = 0; t < f.length; t += 1)
                    f[t].m(u, null);
                c || (a = Rl(o, "click", t[3]),
                c = !0)
            },
            p(t, n) {
                if (5 & n) {
                    let e;
                    for (l = t[0],
                    e = 0; e < l.length; e += 1) {
                        const i = bm(t, l, e);
                        f[e] ? f[e].p(i, n) : (f[e] = xm(i),
                        f[e].c(),
                        f[e].m(u, null))
                    }
                    for (; e < f.length; e += 1)
                        f[e].d(1);
                    f.length = l.length
                }
            },
            d(t) {
                t && Cl(n),
                Al(f, t),
                c = !1,
                a()
            }
        }
    }
    function xm(t) {
        let n, e, i, r, o = t[10] + "";
        function s() {
            return t[5](t[10])
        }
        return {
            c() {
                n = Xl("span"),
                e = Il(o),
                Dl(n, "class", "query svelte-1pln1xx")
            },
            m(t, o) {
                Ol(t, n, o),
                Tl(n, e),
                i || (r = Rl(n, "click", s),
                i = !0)
            },
            p(n, i) {
                t = n,
                1 & i && o !== (o = t[10] + "") && ql(e, o)
            },
            d(t) {
                t && Cl(n),
                i = !1,
                r()
            }
        }
    }
    function km(t) {
        let n, e, i, r, o = t[1], s = [];
        for (let n = 0; n < o.length; n += 1)
            s[n] = Sm(gm(t, o, n));
        return {
            c() {
                n = Xl("section"),
                e = Xl("div"),
                e.textContent = "热门搜索",
                i = _l(),
                r = Xl("div");
                for (let t = 0; t < s.length; t += 1)
                    s[t].c();
                Dl(e, "class", "title svelte-1pln1xx"),
                Dl(r, "class", "queries svelte-1pln1xx"),
                Dl(n, "class", "svelte-1pln1xx")
            },
            m(t, o) {
                Ol(t, n, o),
                Tl(n, e),
                Tl(n, i),
                Tl(n, r);
                for (let t = 0; t < s.length; t += 1)
                    s[t].m(r, null)
            },
            p(t, n) {
                if (6 & n) {
                    let e;
                    for (o = t[1],
                    e = 0; e < o.length; e += 1) {
                        const i = gm(t, o, e);
                        s[e] ? s[e].p(i, n) : (s[e] = Sm(i),
                        s[e].c(),
                        s[e].m(r, null))
                    }
                    for (; e < s.length; e += 1)
                        s[e].d(1);
                    s.length = o.length
                }
            },
            d(t) {
                t && Cl(n),
                Al(s, t)
            }
        }
    }
    function Sm(t) {
        let n, e, i, r, o = t[10] + "";
        function s() {
            return t[6](t[10])
        }
        return {
            c() {
                n = Xl("span"),
                e = Il(o),
                Dl(n, "class", "query svelte-1pln1xx")
            },
            m(t, o) {
                Ol(t, n, o),
                Tl(n, e),
                i || (r = Rl(n, "click", s),
                i = !0)
            },
            p(n, i) {
                t = n,
                2 & i && o !== (o = t[10] + "") && ql(e, o)
            },
            d(t) {
                t && Cl(n),
                i = !1,
                r()
            }
        }
    }
    function Em(t) {
        let n, e, i = t[0].length && wm(t), r = t[1].length && km(t);
        return {
            c() {
                i && i.c(),
                n = _l(),
                r && r.c(),
                e = Ml()
            },
            m(t, o) {
                i && i.m(t, o),
                Ol(t, n, o),
                r && r.m(t, o),
                Ol(t, e, o)
            },
            p(t, [o]) {
                t[0].length ? i ? i.p(t, o) : (i = wm(t),
                i.c(),
                i.m(n.parentNode, n)) : i && (i.d(1),
                i = null),
                t[1].length ? r ? r.p(t, o) : (r = km(t),
                r.c(),
                r.m(e.parentNode, e)) : r && (r.d(1),
                r = null)
            },
            i: el,
            o: el,
            d(t) {
                i && i.d(t),
                t && Cl(n),
                r && r.d(t),
                t && Cl(e)
            }
        }
    }
    function Tm(t, n, e) {
        let i;
        hl(t, Gf, (t => e(4, i = t)));
        const r = cm()
          , o = rf();
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
    class Om extends Ff {
        constructor(t) {
            super(),
            $f(this, t, Tm, Em, al, {})
        }
    }
    function Cm(t) {
        let n, e, i;
        return e = new Om({}),
        e.$on("search", t[2]),
        {
            c() {
                n = Xl("div"),
                jf(e.$$.fragment),
                Dl(n, "class", "query-container svelte-k55a1y")
            },
            m(t, r) {
                Ol(t, n, r),
                Bf(e, n, null),
                i = !0
            },
            p: el,
            i(t) {
                i || (Af(e.$$.fragment, t),
                i = !0)
            },
            o(t) {
                Xf(e.$$.fragment, t),
                i = !1
            },
            d(t) {
                t && Cl(n),
                Pf(e)
            }
        }
    }
    function Am(t) {
        let n, e;
        return n = new ym({
            props: {
                query: t[0]
            }
        }),
        n.$on("search", t[1]),
        {
            c() {
                jf(n.$$.fragment)
            },
            m(t, i) {
                Bf(n, t, i),
                e = !0
            },
            p(t, e) {
                const i = {};
                1 & e && (i.query = t[0]),
                n.$set(i)
            },
            i(t) {
                e || (Af(n.$$.fragment, t),
                e = !0)
            },
            o(t) {
                Xf(n.$$.fragment, t),
                e = !1
            },
            d(t) {
                Pf(n, t)
            }
        }
    }
    function Xm(t) {
        let n, e, i, r;
        const o = [Am, Cm]
          , s = [];
        function u(t, n) {
            return t[0] ? 0 : 1
        }
        return n = u(t),
        e = s[n] = o[n](t),
        {
            c() {
                e.c(),
                i = Ml()
            },
            m(t, e) {
                s[n].m(t, e),
                Ol(t, i, e),
                r = !0
            },
            p(t, [r]) {
                let c = n;
                n = u(t),
                n === c ? s[n].p(t, r) : (Of(),
                Xf(s[c], 1, 1, ( () => {
                    s[c] = null
                }
                )),
                Cf(),
                e = s[n],
                e ? e.p(t, r) : (e = s[n] = o[n](t),
                e.c()),
                Af(e, 1),
                e.m(i.parentNode, i))
            },
            i(t) {
                r || (Af(e),
                r = !0)
            },
            o(t) {
                Xf(e),
                r = !1
            },
            d(t) {
                s[n].d(t),
                t && Cl(i)
            }
        }
    }
    function Im(t, n, e) {
        let {query: i} = n;
        return t.$$set = t => {
            "query"in t && e(0, i = t.query)
        }
        ,
        [i, function(n) {
            uf(t, n)
        }
        , function(n) {
            uf(t, n)
        }
        ]
    }
    class _m extends Ff {
        constructor(t) {
            super(),
            $f(this, t, Im, Xm, al, {
                query: 0
            })
        }
    }
    function Mm(t) {
        let n, e, i, r;
        return {
            c() {
                n = Xl("button"),
                e = Il(""),
                n.disabled = t[2],
                Dl(n, "type", "button"),
                Dl(n, "class", "cancel yoopu3-icon svelte-4q4jwj")
            },
            m(o, s) {
                Ol(o, n, s),
                Tl(n, e),
                i || (r = Rl(n, "click", t[6]),
                i = !0)
            },
            p(t, e) {
                4 & e && (n.disabled = t[2])
            },
            d(t) {
                t && Cl(n),
                i = !1,
                r()
            }
        }
    }
    function Rm(t) {
        let n, e, i, r, o, s, u, c = t[0] && Mm(t);
        return {
            c() {
                n = Xl("form"),
                e = Xl("i"),
                e.textContent = "",
                i = _l(),
                r = Xl("input"),
                o = _l(),
                c && c.c(),
                Dl(e, "class", "icon yoopu3-icon svelte-4q4jwj"),
                Dl(r, "class", "search-input svelte-4q4jwj"),
                Dl(r, "type", "text"),
                r.disabled = t[2],
                Dl(r, "placeholder", t[1]),
                Dl(r, "autocomplete", "off"),
                Dl(n, "class", "search-wrapper svelte-4q4jwj"),
                Ll(n, "white", t[3])
            },
            m(a, l) {
                Ol(a, n, l),
                Tl(n, e),
                Tl(n, i),
                Tl(n, r),
                t[11](r),
                $l(r, t[0]),
                Tl(n, o),
                c && c.m(n, null),
                s || (u = [Rl(r, "input", t[12]), Rl(r, "focus", t[8]), Rl(r, "blur", t[9]), Rl(r, "input", t[10]), Rl(n, "submit", t[5])],
                s = !0)
            },
            p(t, [e]) {
                4 & e && (r.disabled = t[2]),
                2 & e && Dl(r, "placeholder", t[1]),
                1 & e && r.value !== t[0] && $l(r, t[0]),
                t[0] ? c ? c.p(t, e) : (c = Mm(t),
                c.c(),
                c.m(n, null)) : c && (c.d(1),
                c = null),
                8 & e && Ll(n, "white", t[3])
            },
            i: el,
            o: el,
            d(e) {
                e && Cl(n),
                t[11](null),
                c && c.d(),
                s = !1,
                ul(u)
            }
        }
    }
    function Dm(t, n, e) {
        let {query: i=""} = n
          , {placeholder: r=""} = n
          , {disabled: o=!1} = n
          , {white: s=!1} = n;
        const u = rf();
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
            uf(t, n)
        }
        , function(n) {
            uf(t, n)
        }
        , function(n) {
            uf(t, n)
        }
        , function(t) {
            af[t ? "unshift" : "push"](( () => {
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
    class jm extends Ff {
        constructor(t) {
            super(),
            $f(this, t, Dm, Rm, al, {
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
    function Bm(t) {
        let n, e, i, r, o, s, u;
        function c(n) {
            t[6](n)
        }
        let a = {
            placeholder: "搜索歌曲或艺人"
        };
        return void 0 !== t[0] && (a.query = t[0]),
        e = new jm({
            props: a
        }),
        af.push(( () => Df(e, "query", c))),
        e.$on("focus", t[4]),
        e.$on("blur", t[5]),
        e.$on("search", t[7]),
        s = new _m({
            props: {
                query: t[0]
            }
        }),
        s.$on("search", t[8]),
        {
            c() {
                n = Xl("div"),
                jf(e.$$.fragment),
                r = _l(),
                o = Xl("div"),
                jf(s.$$.fragment),
                Dl(o, "class", "panel svelte-y4hgxl"),
                Ll(o, "show", t[1]),
                Ll(o, "unclickable", t[2]),
                Dl(n, "class", "container svelte-y4hgxl")
            },
            m(t, i) {
                Ol(t, n, i),
                Bf(e, n, null),
                Tl(n, r),
                Tl(n, o),
                Bf(s, o, null),
                u = !0
            },
            p(t, [n]) {
                const r = {};
                !i && 1 & n && (i = !0,
                r.query = t[0],
                mf(( () => i = !1))),
                e.$set(r);
                const u = {};
                1 & n && (u.query = t[0]),
                s.$set(u),
                2 & n && Ll(o, "show", t[1]),
                4 & n && Ll(o, "unclickable", t[2])
            },
            i(t) {
                u || (Af(e.$$.fragment, t),
                Af(s.$$.fragment, t),
                u = !0)
            },
            o(t) {
                Xf(e.$$.fragment, t),
                Xf(s.$$.fragment, t),
                u = !1
            },
            d(t) {
                t && Cl(n),
                Pf(e),
                Pf(s)
            }
        }
    }
    function Pm(t, n, e) {
        let i = String(wi().q || "")
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
            await yt(200),
            e(2, o = !r)
        }
        , function(t) {
            i = t,
            e(0, i)
        }
        , () => s(i), t => s(t.detail.query)]
    }
    class qm extends Ff {
        constructor(t) {
            super(),
            $f(this, t, Pm, Bm, al, {})
        }
    }
    function $m(t) {
        let n;
        return {
            c() {
                n = Xl("div"),
                Dl(n, "class", "svg-container svelte-jr7qzq")
            },
            m(e, i) {
                Ol(e, n, i),
                t[4](n)
            },
            p: el,
            i: el,
            o: el,
            d(e) {
                e && Cl(n),
                t[4](null)
            }
        }
    }
    const Fm = {};
    function Nm(t, n, e) {
        let {src: i} = n;
        const r = Lt("Svg");
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
                let t = Fm[i];
                return t || (t = fetch(i).then((t => t.text())),
                Fm[i] = t),
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
            af[t ? "unshift" : "push"](( () => {
                o = t,
                e(0, o)
            }
            ))
        }
        ]
    }
    class zm extends Ff {
        constructor(t) {
            super(),
            $f(this, t, Nm, $m, al, {
                src: 1
            })
        }
    }
    function Lm(t) {
        let n, e, i, r, s, u, c, a, l;
        return u = new zm({
            props: {
                src: o
            }
        }),
        {
            c() {
                n = Xl("div"),
                e = Xl("a"),
                i = Xl("span"),
                i.textContent = "",
                r = _l(),
                s = Xl("div"),
                jf(u.$$.fragment),
                c = _l(),
                a = Xl("span"),
                a.textContent = "随身的曲谱书",
                Dl(i, "class", "yoopu3-icon svelte-dhvbeg"),
                Dl(s, "class", "name svelte-dhvbeg"),
                Dl(e, "href", "/"),
                Dl(e, "class", "logo svelte-dhvbeg"),
                Dl(a, "class", "slogan-text svelte-dhvbeg"),
                Dl(n, "class", "logo-container svelte-dhvbeg")
            },
            m(t, o) {
                Ol(t, n, o),
                Tl(n, e),
                Tl(e, i),
                Tl(e, r),
                Tl(e, s),
                Bf(u, s, null),
                Tl(n, c),
                Tl(n, a),
                l = !0
            },
            p: el,
            i(t) {
                l || (Af(u.$$.fragment, t),
                l = !0)
            },
            o(t) {
                Xf(u.$$.fragment, t),
                l = !1
            },
            d(t) {
                t && Cl(n),
                Pf(u)
            }
        }
    }
    class Gm extends Ff {
        constructor(t) {
            super(),
            $f(this, t, null, Lm, al, {})
        }
    }
    function Um(t) {
        let n;
        return {
            c() {
                n = Xl("div"),
                n.innerHTML = '<div class="mover svelte-bmkbx9"></div>',
                Dl(n, "class", "loader svelte-bmkbx9"),
                Ll(n, "above", t[0])
            },
            m(t, e) {
                Ol(t, n, e)
            },
            p(t, [e]) {
                1 & e && Ll(n, "above", t[0])
            },
            i: el,
            o: el,
            d(t) {
                t && Cl(n)
            }
        }
    }
    function Hm(t, n, e) {
        let {above: i=!1} = n;
        return t.$$set = t => {
            "above"in t && e(0, i = t.above)
        }
        ,
        [i]
    }
    class Vm extends Ff {
        constructor(t) {
            super(),
            $f(this, t, Hm, Um, al, {
                above: 0
            })
        }
    }
    const Wm = t => ({})
      , Jm = t => ({});
    function Km(t) {
        let n, e;
        return {
            c() {
                n = Xl("div"),
                e = Il(t[2]),
                Dl(n, "class", "title svelte-ezjm8c")
            },
            m(t, i) {
                Ol(t, n, i),
                Tl(n, e)
            },
            p(t, n) {
                4 & n && ql(e, t[2])
            },
            d(t) {
                t && Cl(n)
            }
        }
    }
    function Ym(t) {
        let n, e;
        return {
            c() {
                n = Xl("div"),
                Dl(n, "class", "arrow svelte-ezjm8c"),
                Dl(n, "style", e = t[10].arrow),
                Dl(n, "position", t[8])
            },
            m(t, e) {
                Ol(t, n, e)
            },
            p(t, i) {
                1024 & i && e !== (e = t[10].arrow) && Dl(n, "style", e),
                256 & i && Dl(n, "position", t[8])
            },
            d(t) {
                t && Cl(n)
            }
        }
    }
    function Qm(t) {
        let n, e, i, r, o, s, u, c, a, l, f;
        const h = t[15].default
          , d = dl(h, t, t[14], null);
        let v = t[2] && Km(t);
        const p = t[15].content
          , m = dl(p, t, t[14], Jm);
        let y = t[1] && Ym(t);
        return {
            c() {
                n = Xl("div"),
                e = Xl("div"),
                d && d.c(),
                i = _l(),
                r = Xl("div"),
                o = Xl("div"),
                v && v.c(),
                s = _l(),
                m && m.c(),
                u = _l(),
                y && y.c(),
                Dl(e, "class", "anchor"),
                Dl(o, "class", "content svelte-ezjm8c"),
                Ll(o, "no-padding", !t[4]),
                Dl(r, "class", "wrapper svelte-ezjm8c"),
                Dl(r, "style", c = t[10].wrapper),
                Ll(r, "theme", t[3]),
                Ll(r, "show", t[0]),
                Dl(n, "class", "popover svelte-ezjm8c")
            },
            m(c, h) {
                Ol(c, n, h),
                Tl(n, e),
                d && d.m(e, null),
                t[16](e),
                Tl(n, i),
                Tl(n, r),
                Tl(r, o),
                v && v.m(o, null),
                Tl(o, s),
                m && m.m(o, null),
                Tl(o, u),
                y && y.m(o, null),
                t[17](r),
                a = !0,
                l || (f = [Rl(e, "mouseenter", t[13]), Rl(r, "mouseenter", t[18]), Rl(r, "click", t[19]), Rl(r, "mouseleave", t[20]), Rl(n, "mouseenter", t[11]), Rl(n, "mouseleave", t[12])],
                l = !0)
            },
            p(t, [n]) {
                d && d.p && 16384 & n && ml(d, h, t, t[14], n, null, null),
                t[2] ? v ? v.p(t, n) : (v = Km(t),
                v.c(),
                v.m(o, s)) : v && (v.d(1),
                v = null),
                m && m.p && 16384 & n && ml(m, p, t, t[14], n, Wm, Jm),
                t[1] ? y ? y.p(t, n) : (y = Ym(t),
                y.c(),
                y.m(o, null)) : y && (y.d(1),
                y = null),
                16 & n && Ll(o, "no-padding", !t[4]),
                (!a || 1024 & n && c !== (c = t[10].wrapper)) && Dl(r, "style", c),
                8 & n && Ll(r, "theme", t[3]),
                1 & n && Ll(r, "show", t[0])
            },
            i(t) {
                a || (Af(d, t),
                Af(m, t),
                a = !0)
            },
            o(t) {
                Xf(d, t),
                Xf(m, t),
                a = !1
            },
            d(e) {
                e && Cl(n),
                d && d.d(e),
                t[16](null),
                v && v.d(),
                m && m.d(e),
                y && y.d(),
                t[17](null),
                l = !1,
                ul(f)
            }
        }
    }
    const Zm = 100
      , ty = 10
      , ny = 10;
    function ey() {
        const t = document.body
          , n = window.getComputedStyle(t)
          , e = parseInt(n["margin-left"].replace("px", ""))
          , i = parseInt(n["margin-right"].replace("px", ""));
        return t.getBoundingClientRect().width + e + i
    }
    function iy() {
        const t = document.createElement("div");
        return t.style.position = "absolute",
        t.style.top = 0,
        t.style.left = 0,
        t.style.width = "100%",
        t
    }
    function ry(t, n, e) {
        let {$$slots: i={}, $$scope: r} = n
          , {arrow: o=!0} = n
          , {show: s=!1} = n
          , {title: u} = n
          , {theme: c=!1} = n
          , {padding: a=!0} = n
          , {closeOnClick: l=!1} = n;
        const f = "top"
          , h = "bottom";
        let d, v, p, m, y, g = !1, b = {};
        function w() {
            y = setTimeout(( () => {
                g || e(0, s = !1)
            }
            ), Zm)
        }
        ef(( () => {
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
        [s, o, u, c, a, l, g, d, v, p, b, function() {
            y && clearTimeout(y),
            e(0, s = !0)
        }
        , w, function() {
            m || (m = iy(),
            m.appendChild(p),
            document.body.appendChild(m)),
            function() {
                const t = d ? d.getBoundingClientRect() : {
                    x: 100,
                    y: 100,
                    width: 100,
                    height: 100
                }
                  , n = ey()
                  , i = p ? {
                    width: p.offsetWidth,
                    height: p.offsetHeight
                } : null;
                let r = 0
                  , o = ""
                  , s = "";
                t.centerX = t.x + window.scrollX + t.width / 2,
                t.centerY = t.y + window.scrollY + t.height / 2,
                t.centerX < i.width / 2 ? r = i.width / 2 - t.centerX + ny : n - t.centerX < i.width / 2 && (r = n - t.centerX - i.width / 2 - ny);
                t.centerY - window.scrollY >= window.innerHeight / 3 ? (e(8, v = f),
                o = `\n      left: ${t.centerX + r}px;\n      top: ${t.centerY - ty}px;\n      transform: translate(-50%, -${i.height + t.height / 2}px)`,
                s = `left:${i.width / 2 - r}px;\n      bottom: ${-ty}px; transform: translate(-50%, 25%);`) : (e(8, v = h),
                o = `\n      left: ${t.centerX + r}px;\n      top: ${t.centerY + ty}px;\n      transform: translate(-50%, ${t.height / 2}px);`,
                s = `left:${i.width / 2 - r}px;\n      top: ${-ty}px; transform: translate(-50%, -25%);`);
                e(10, b = {
                    wrapper: o,
                    arrow: s
                })
            }()
        }
        , r, i, function(t) {
            af[t ? "unshift" : "push"](( () => {
                d = t,
                e(7, d)
            }
            ))
        }
        , function(t) {
            af[t ? "unshift" : "push"](( () => {
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
            w()
        }
        ]
    }
    class oy extends Ff {
        constructor(t) {
            super(),
            $f(this, t, ry, Qm, al, {
                arrow: 1,
                show: 0,
                title: 2,
                theme: 3,
                padding: 4,
                closeOnClick: 5
            })
        }
    }
    function sy(t) {
        let n, e;
        return {
            c() {
                n = Xl("img"),
                Dl(n, "class", "hat svelte-1a9wei7"),
                n.src !== (e = t[4]) && Dl(n, "src", e),
                Dl(n, "alt", "hat")
            },
            m(t, e) {
                Ol(t, n, e)
            },
            p(t, i) {
                16 & i && n.src !== (e = t[4]) && Dl(n, "src", e)
            },
            d(t) {
                t && Cl(n)
            }
        }
    }
    function uy(t) {
        let n, e;
        return {
            c() {
                n = Xl("img"),
                Dl(n, "class", "badge svelte-1a9wei7"),
                n.src !== (e = t[5]) && Dl(n, "src", e),
                Dl(n, "alt", "badge")
            },
            m(t, e) {
                Ol(t, n, e)
            },
            p(t, i) {
                32 & i && n.src !== (e = t[5]) && Dl(n, "src", e)
            },
            d(t) {
                t && Cl(n)
            }
        }
    }
    function cy(t) {
        let n, e, i, r, o, s, u, c, a, l = t[4] && sy(t), f = t[5] && uy(t);
        return {
            c() {
                n = Xl("div"),
                e = Xl("img"),
                r = _l(),
                l && l.c(),
                o = _l(),
                f && f.c(),
                Dl(e, "class", "avatar svelte-1a9wei7"),
                e.src !== (i = t[3]) && Dl(e, "src", i),
                Dl(e, "alt", "avatar"),
                Dl(n, "class", "container svelte-1a9wei7"),
                Dl(n, "size", t[1]),
                Dl(n, "gender", s = t[0].gender),
                Dl(n, "ladder", u = t[0].ladder),
                Ll(n, "link", t[2])
            },
            m(i, s) {
                Ol(i, n, s),
                Tl(n, e),
                Tl(n, r),
                l && l.m(n, null),
                Tl(n, o),
                f && f.m(n, null),
                c || (a = [Rl(e, "error", t[7]), Rl(n, "click", t[6])],
                c = !0)
            },
            p(t, [r]) {
                8 & r && e.src !== (i = t[3]) && Dl(e, "src", i),
                t[4] ? l ? l.p(t, r) : (l = sy(t),
                l.c(),
                l.m(n, o)) : l && (l.d(1),
                l = null),
                t[5] ? f ? f.p(t, r) : (f = uy(t),
                f.c(),
                f.m(n, null)) : f && (f.d(1),
                f = null),
                2 & r && Dl(n, "size", t[1]),
                1 & r && s !== (s = t[0].gender) && Dl(n, "gender", s),
                1 & r && u !== (u = t[0].ladder) && Dl(n, "ladder", u),
                4 & r && Ll(n, "link", t[2])
            },
            i: el,
            o: el,
            d(t) {
                t && Cl(n),
                l && l.d(),
                f && f.d(),
                c = !1,
                ul(a)
            }
        }
    }
    function ay(n, e, i) {
        let {user: r={}} = e
          , {size: o="large"} = e
          , {link: h=!1} = e;
        const d = {
            [ft.ADMIN]: f,
            [ft.MEMBER]: c,
            [ft.TOP_AUTHOR]: a,
            [ft.TOP_PLAYER]: l
        };
        let v, p, m;
        return n.$$set = t => {
            "user"in t && i(0, r = t.user),
            "size"in t && i(1, o = t.size),
            "link"in t && i(2, h = t.link)
        }
        ,
        n.$$.update = () => {
            3 & n.$$.dirty && i(3, v = ("xlarge" === o || "large" === o) && r.havatar || r.avatar || t),
            3 & n.$$.dirty && i(4, p = "large" === o && ("m" === r.gender ? s : u)),
            1 & n.$$.dirty && i(5, m = r.ladder && d[r.ladder])
        }
        ,
        [r, o, h, v, p, m, function() {
            h && r.userCode && (location.href = "/user#code=" + r.userCode)
        }
        , function() {
            v !== t && i(3, v = t)
        }
        ]
    }
    class ly extends Ff {
        constructor(t) {
            super(),
            $f(this, t, ay, cy, al, {
                user: 0,
                size: 1,
                link: 2
            })
        }
    }
    function fy(t) {
        let n, e, i, r, o, s, u, c = tt[t[5]] + "";
        return {
            c() {
                n = Xl("div"),
                e = Xl("i"),
                e.textContent = "",
                i = _l(),
                r = Xl("span"),
                o = Il(c),
                Dl(e, "class", "yoopu3-icon svelte-tg1f35"),
                Dl(r, "class", "label svelte-tg1f35"),
                Dl(n, "class", "instrument-selection svelte-tg1f35")
            },
            m(c, a) {
                Ol(c, n, a),
                Tl(n, e),
                Tl(n, i),
                Tl(n, r),
                Tl(r, o),
                s || (u = Rl(n, "click", t[9]),
                s = !0)
            },
            p(t, n) {
                32 & n && c !== (c = tt[t[5]] + "") && ql(o, c)
            },
            d(t) {
                t && Cl(n),
                s = !1,
                u()
            }
        }
    }
    function hy(t) {
        let n;
        return {
            c() {
                n = Xl("a"),
                n.textContent = "登录",
                Dl(n, "class", "login-button svelte-tg1f35"),
                Dl(n, "href", "/start")
            },
            m(t, e) {
                Ol(t, n, e)
            },
            p: el,
            i: el,
            o: el,
            d(t) {
                t && Cl(n)
            }
        }
    }
    function dy(t) {
        let n, e;
        return n = new oy({
            props: {
                $$slots: {
                    content: [my],
                    default: [vy]
                },
                $$scope: {
                    ctx: t
                }
            }
        }),
        {
            c() {
                jf(n.$$.fragment)
            },
            m(t, i) {
                Bf(n, t, i),
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
                e || (Af(n.$$.fragment, t),
                e = !0)
            },
            o(t) {
                Xf(n.$$.fragment, t),
                e = !1
            },
            d(t) {
                Pf(n, t)
            }
        }
    }
    function vy(t) {
        let n, e, i, r, o;
        return r = new ly({
            props: {
                size: "medium",
                user: t[6]
            }
        }),
        {
            c() {
                n = Xl("div"),
                e = Xl("div"),
                e.textContent = `${t[6].displayName}`,
                i = _l(),
                jf(r.$$.fragment),
                Dl(e, "class", "display-name svelte-tg1f35"),
                Dl(n, "class", "user-info svelte-tg1f35")
            },
            m(t, s) {
                Ol(t, n, s),
                Tl(n, e),
                Tl(n, i),
                Bf(r, n, null),
                o = !0
            },
            p: el,
            i(t) {
                o || (Af(r.$$.fragment, t),
                o = !0)
            },
            o(t) {
                Xf(r.$$.fragment, t),
                o = !1
            },
            d(t) {
                t && Cl(n),
                Pf(r)
            }
        }
    }
    function py(t) {
        let n;
        return {
            c() {
                n = Xl("a"),
                n.innerHTML = '<span class="icon yoopu3-icon svelte-tg1f35"></span> \n                <span>管理员工具</span>',
                Dl(n, "class", "action clickable svelte-tg1f35"),
                Dl(n, "href", "/internal")
            },
            m(t, e) {
                Ol(t, n, e)
            },
            d(t) {
                t && Cl(n)
            }
        }
    }
    function my(t) {
        let n, e, i, r, o, s, u, c, a, l, f, h, d = t[7] && py();
        return {
            c() {
                n = Xl("div"),
                e = Xl("a"),
                e.innerHTML = '<span class="icon yoopu3-icon svelte-tg1f35"></span> \n              <span>用户中心</span>',
                i = _l(),
                r = Xl("a"),
                o = Xl("span"),
                o.textContent = "",
                s = _l(),
                u = Xl("span"),
                u.textContent = "我的个人页",
                c = _l(),
                a = Xl("div"),
                a.innerHTML = '<span class="icon yoopu3-icon svelte-tg1f35"></span> \n              <span>黑夜模式</span>',
                l = _l(),
                d && d.c(),
                Dl(e, "class", "action clickable svelte-tg1f35"),
                Dl(e, "href", "/setting"),
                Dl(o, "class", "icon yoopu3-icon svelte-tg1f35"),
                Dl(r, "class", "action clickable svelte-tg1f35"),
                Dl(r, "href", "/user#code=" + t[6].userCode),
                Dl(a, "class", "action clickable svelte-tg1f35"),
                Dl(n, "slot", "content"),
                Dl(n, "class", "user-panel svelte-tg1f35")
            },
            m(v, p) {
                Ol(v, n, p),
                Tl(n, e),
                Tl(n, i),
                Tl(n, r),
                Tl(r, o),
                Tl(r, s),
                Tl(r, u),
                Tl(n, c),
                Tl(n, a),
                Tl(n, l),
                d && d.m(n, null),
                f || (h = Rl(a, "click", t[10]),
                f = !0)
            },
            p: el,
            d(t) {
                t && Cl(n),
                d && d.d(),
                f = !1,
                h()
            }
        }
    }
    function yy(t) {
        let n, e, i;
        function r(n) {
            t[11](n)
        }
        let o = {
            user: t[6]
        };
        return void 0 !== t[5] && (o.instrument = t[5]),
        n = new Zp({
            props: o
        }),
        af.push(( () => Df(n, "instrument", r))),
        n.$on("change", t[12]),
        {
            c() {
                jf(n.$$.fragment)
            },
            m(t, e) {
                Bf(n, t, e),
                i = !0
            },
            p(t, i) {
                const r = {};
                !e && 32 & i && (e = !0,
                r.instrument = t[5],
                mf(( () => e = !1))),
                n.$set(r)
            },
            i(t) {
                i || (Af(n.$$.fragment, t),
                i = !0)
            },
            o(t) {
                Xf(n.$$.fragment, t),
                i = !1
            },
            d(t) {
                Pf(n, t)
            }
        }
    }
    function gy(t) {
        let n, e, i, r, o, s, u, c, a, l, f, h, d, v, p, m, y, g, b, w, x, k, S, E, T, O;
        i = new Gm({}),
        s = new qm({});
        let C = t[5] && !t[1] && fy(t);
        const A = [dy, hy]
          , X = [];
        function I(t, n) {
            return t[6] ? 0 : t[0] ? 1 : -1
        }
        function _(n) {
            t[13](n)
        }
        ~(l = I(t)) && (f = X[l] = A[l](t)),
        d = new Vm({});
        let M = {
            noButtons: !0,
            cancelButtonText: t[5] ? "" : void 0,
            $$slots: {
                default: [yy]
            },
            $$scope: {
                ctx: t
            }
        };
        function R(n) {
            t[14](n)
        }
        void 0 !== t[2] && (M.open = t[2]),
        p = new Hd({
            props: M
        }),
        af.push(( () => Df(p, "open", _)));
        let D = {};
        return void 0 !== t[3] && (D.open = t[3]),
        g = new Jp({
            props: D
        }),
        af.push(( () => Df(g, "open", R))),
        x = new av({
            props: {
                open: t[6] && t[6].isBanned
            }
        }),
        S = new $p({
            props: {
                open: !location.href.includes(yi) && t[6] && !t[6].isBanned && t[6].userSessionCount > vt,
                cell: t[4]
            }
        }),
        {
            c() {
                n = Xl("header"),
                e = Xl("div"),
                jf(i.$$.fragment),
                r = _l(),
                o = Xl("div"),
                jf(s.$$.fragment),
                u = _l(),
                C && C.c(),
                c = _l(),
                a = Xl("div"),
                f && f.c(),
                h = _l(),
                jf(d.$$.fragment),
                v = _l(),
                jf(p.$$.fragment),
                y = _l(),
                jf(g.$$.fragment),
                w = _l(),
                jf(x.$$.fragment),
                k = _l(),
                jf(S.$$.fragment),
                Dl(o, "class", "search-container svelte-tg1f35"),
                Dl(a, "class", "user-container svelte-tg1f35"),
                Dl(e, "class", "dt-top-navigation svelte-tg1f35"),
                Dl(n, "class", "svelte-tg1f35")
            },
            m(f, m) {
                Ol(f, n, m),
                Tl(n, e),
                Bf(i, e, null),
                Tl(e, r),
                Tl(e, o),
                Bf(s, o, null),
                Tl(e, u),
                C && C.m(e, null),
                Tl(e, c),
                Tl(e, a),
                ~l && X[l].m(a, null),
                Tl(n, h),
                Bf(d, n, null),
                Ol(f, v, m),
                Bf(p, f, m),
                Ol(f, y, m),
                Bf(g, f, m),
                Ol(f, w, m),
                Bf(x, f, m),
                Ol(f, k, m),
                Bf(S, f, m),
                E = !0,
                T || (O = Rl(o, "focus", t[8], !0),
                T = !0)
            },
            p(t, [n]) {
                t[5] && !t[1] ? C ? C.p(t, n) : (C = fy(t),
                C.c(),
                C.m(e, c)) : C && (C.d(1),
                C = null);
                let i = l;
                l = I(t),
                l === i ? ~l && X[l].p(t, n) : (f && (Of(),
                Xf(X[i], 1, 1, ( () => {
                    X[i] = null
                }
                )),
                Cf()),
                ~l ? (f = X[l],
                f ? f.p(t, n) : (f = X[l] = A[l](t),
                f.c()),
                Af(f, 1),
                f.m(a, null)) : f = null);
                const r = {};
                32 & n && (r.cancelButtonText = t[5] ? "" : void 0),
                131108 & n && (r.$$scope = {
                    dirty: n,
                    ctx: t
                }),
                !m && 4 & n && (m = !0,
                r.open = t[2],
                mf(( () => m = !1))),
                p.$set(r);
                const o = {};
                !b && 8 & n && (b = !0,
                o.open = t[3],
                mf(( () => b = !1))),
                g.$set(o);
                const s = {};
                16 & n && (s.cell = t[4]),
                S.$set(s)
            },
            i(t) {
                E || (Af(i.$$.fragment, t),
                Af(s.$$.fragment, t),
                Af(f),
                Af(d.$$.fragment, t),
                Af(p.$$.fragment, t),
                Af(g.$$.fragment, t),
                Af(x.$$.fragment, t),
                Af(S.$$.fragment, t),
                E = !0)
            },
            o(t) {
                Xf(i.$$.fragment, t),
                Xf(s.$$.fragment, t),
                Xf(f),
                Xf(d.$$.fragment, t),
                Xf(p.$$.fragment, t),
                Xf(g.$$.fragment, t),
                Xf(x.$$.fragment, t),
                Xf(S.$$.fragment, t),
                E = !1
            },
            d(t) {
                t && Cl(n),
                Pf(i),
                Pf(s),
                C && C.d(),
                ~l && X[l].d(),
                Pf(d),
                t && Cl(v),
                Pf(p, t),
                t && Cl(y),
                Pf(g, t),
                t && Cl(w),
                Pf(x, t),
                t && Cl(k),
                Pf(S, t),
                T = !1,
                O()
            }
        }
    }
    function by(t, n, e) {
        let i;
        hl(t, Gf, (t => e(5, i = t)));
        let {allowLogin: r} = n
          , {hideInstrumentSelection: o} = n;
        const s = Ua()
          , u = s && kt(s.role, ht.EDITOR);
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
            Gf.set(i)
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
    class wy extends Ff {
        constructor(t) {
            super(),
            $f(this, t, by, gy, al, {
                allowLogin: 0,
                hideInstrumentSelection: 1
            })
        }
    }
    function xy(t, n, e) {
        const i = t.slice();
        return i[1] = n[e],
        i
    }
    function ky(t) {
        let n, e, i = t[1] + "";
        return {
            c() {
                n = Xl("span"),
                e = Il(i),
                Dl(n, "class", "tag svelte-hq7tw6")
            },
            m(t, i) {
                Ol(t, n, i),
                Tl(n, e)
            },
            p(t, n) {
                1 & n && i !== (i = t[1] + "") && ql(e, i)
            },
            d(t) {
                t && Cl(n)
            }
        }
    }
    function Sy(t) {
        let n, e = t[0], i = [];
        for (let n = 0; n < e.length; n += 1)
            i[n] = ky(xy(t, e, n));
        return {
            c() {
                n = Xl("div");
                for (let t = 0; t < i.length; t += 1)
                    i[t].c();
                Dl(n, "class", "sheet-tags svelte-hq7tw6")
            },
            m(t, e) {
                Ol(t, n, e);
                for (let t = 0; t < i.length; t += 1)
                    i[t].m(n, null)
            },
            p(t, [r]) {
                if (1 & r) {
                    let o;
                    for (e = t[0],
                    o = 0; o < e.length; o += 1) {
                        const s = xy(t, e, o);
                        i[o] ? i[o].p(s, r) : (i[o] = ky(s),
                        i[o].c(),
                        i[o].m(n, null))
                    }
                    for (; o < i.length; o += 1)
                        i[o].d(1);
                    i.length = e.length
                }
            },
            i: el,
            o: el,
            d(t) {
                t && Cl(n),
                Al(i, t)
            }
        }
    }
    function Ey(t, n, e) {
        let {tags: i=[]} = n;
        return t.$$set = t => {
            "tags"in t && e(0, i = t.tags)
        }
        ,
        [i]
    }
    class Ty extends Ff {
        constructor(t) {
            super(),
            $f(this, t, Ey, Sy, al, {
                tags: 0
            })
        }
    }
    function Oy(t) {
        let n, r, o, s, u, c, a, l, f, h, d, v;
        return o = new zm({
            props: {
                src: t[2] ? i : e
            }
        }),
        {
            c() {
                n = Xl("div"),
                r = Xl("div"),
                jf(o.$$.fragment),
                s = _l(),
                u = Xl("div"),
                c = Il(t[0]),
                a = Il("是会员特权"),
                l = _l(),
                f = Xl("div"),
                h = Il(t[0]),
                d = Il("是会员特权哦。会员还有其他高级功能，去看看吧"),
                Dl(r, "class", "hero-image svelte-12f0qbi"),
                Dl(n, "class", "hero-wrapper svelte-12f0qbi"),
                Dl(u, "title", ""),
                Dl(f, "description", "")
            },
            m(t, e) {
                Ol(t, n, e),
                Tl(n, r),
                Bf(o, r, null),
                Ol(t, s, e),
                Ol(t, u, e),
                Tl(u, c),
                Tl(u, a),
                Ol(t, l, e),
                Ol(t, f, e),
                Tl(f, h),
                Tl(f, d),
                v = !0
            },
            p(t, n) {
                const r = {};
                4 & n && (r.src = t[2] ? i : e),
                o.$set(r),
                (!v || 1 & n) && ql(c, t[0]),
                (!v || 1 & n) && ql(h, t[0])
            },
            i(t) {
                v || (Af(o.$$.fragment, t),
                v = !0)
            },
            o(t) {
                Xf(o.$$.fragment, t),
                v = !1
            },
            d(t) {
                t && Cl(n),
                Pf(o),
                t && Cl(s),
                t && Cl(u),
                t && Cl(l),
                t && Cl(f)
            }
        }
    }
    function Cy(t) {
        let n, e, i;
        function r(n) {
            t[5](n)
        }
        let o = {
            action: t[3],
            okButtonText: Si() === Z.PIANO ? "开通会员(目前免费)" : "开通会员",
            cancelButtonText: "先不了",
            $$slots: {
                default: [Oy]
            },
            $$scope: {
                ctx: t
            }
        };
        return void 0 !== t[1] && (o.open = t[1]),
        n = new Hd({
            props: o
        }),
        af.push(( () => Df(n, "open", r))),
        {
            c() {
                jf(n.$$.fragment)
            },
            m(t, e) {
                Bf(n, t, e),
                i = !0
            },
            p(t, [i]) {
                const r = {};
                69 & i && (r.$$scope = {
                    dirty: i,
                    ctx: t
                }),
                !e && 2 & i && (e = !0,
                r.open = t[1],
                mf(( () => e = !1))),
                n.$set(r)
            },
            i(t) {
                i || (Af(n.$$.fragment, t),
                i = !0)
            },
            o(t) {
                Xf(n.$$.fragment, t),
                i = !1
            },
            d(t) {
                Pf(n, t)
            }
        }
    }
    const Ay = Lf(!1)
      , Xy = Lf("");
    let Iy = () => {}
    ;
    async function _y(t, n, e) {
        if (n === Rd.bda.name)
            return !0;
        if (!Ua()) {
            if (n)
                await ev(`${e}功能`, `使用${e}功能请前往应用商店下载《有谱么》APP`, {
                    okButtonText: "知道了"
                });
            else {
                await nv("请先登录", "请先登录才可以使用完整功能", {
                    okButtonText: "登录/创建账号",
                    cancelButtonText: "先不了"
                }) && (na("go-to-login", {
                    label: e
                }),
                location.href = "/start")
            }
            return !1
        }
        return !!tl(Ua()) || (n ? await ev(`${e}功能`, `使用${e}功能请前往应用商店下载《有谱么》APP`, {
            okButtonText: "知道了"
        }) : await My(e),
        !1)
    }
    function My(t) {
        return Xy.set(t),
        Ay.set(!0),
        new Promise((t => Iy = t))
    }
    function Ry(t) {
        return wt("/membership", null, {
            referrer: t
        })
    }
    function Dy(t, n, e) {
        let i, r, o;
        hl(t, Xy, (t => e(0, i = t))),
        hl(t, Ay, (t => e(1, r = t))),
        hl(t, ch, (t => e(2, o = t)));
        let {desktop: s=!1} = n;
        return t.$$set = t => {
            "desktop"in t && e(4, s = t.desktop)
        }
        ,
        [i, r, o, async function(t) {
            return t && (location.href = s ? "/setting#v=membership" : Ry(i)),
            Iy(t),
            !0
        }
        , s, function(t) {
            r = t,
            Ay.set(r)
        }
        ]
    }
    class jy extends Ff {
        constructor(t) {
            super(),
            $f(this, t, Dy, Cy, al, {
                desktop: 4
            })
        }
    }
    function By(t, n, e) {
        const i = t.slice();
        return i[18] = n[e],
        i
    }
    function Py(t, n, e) {
        const i = t.slice();
        return i[18] = n[e],
        i
    }
    function qy(t) {
        let n;
        return {
            c() {
                n = Xl("div"),
                n.textContent = "",
                Dl(n, "class", "yoopu3-icon svelte-1aown71")
            },
            m(t, e) {
                Ol(t, n, e)
            },
            d(t) {
                t && Cl(n)
            }
        }
    }
    function $y(t) {
        let n, e = [0, 0, 0, 0, 0, 0], i = [];
        for (let n = 0; n < 6; n += 1)
            i[n] = Fy(By(t, e, n));
        return {
            c() {
                n = Xl("div");
                for (let t = 0; t < 6; t += 1)
                    i[t].c();
                Dl(n, "class", "fg svelte-1aown71"),
                Dl(n, "style", t[6])
            },
            m(t, e) {
                Ol(t, n, e);
                for (let t = 0; t < 6; t += 1)
                    i[t].m(n, null)
            },
            p(t, e) {
                64 & e && Dl(n, "style", t[6])
            },
            d(t) {
                t && Cl(n),
                Al(i, t)
            }
        }
    }
    function Fy(t) {
        let n;
        return {
            c() {
                n = Xl("div"),
                n.textContent = "",
                Dl(n, "class", "yoopu3-icon svelte-1aown71")
            },
            m(t, e) {
                Ol(t, n, e)
            },
            d(t) {
                t && Cl(n)
            }
        }
    }
    function Ny(t) {
        let n, e, i, r, o, s, u, c, a, l, f, h, d, v, p, m, y, g = !1, b = !0, w = t[4] ? "" : "";
        function x() {
            cancelAnimationFrame(r),
            e.paused || (r = xl(x),
            g = !0),
            t[10].call(e)
        }
        let k = [0, 0, 0, 0, 0, 0]
          , S = [];
        for (let n = 0; n < 6; n += 1)
            S[n] = qy(Py(t, k, n));
        let E = t[1] && $y(t);
        return {
            c() {
                n = Xl("div"),
                e = Xl("audio"),
                o = _l(),
                s = Xl("button"),
                u = Il(w),
                a = _l(),
                l = Xl("div"),
                f = Xl("div");
                for (let t = 0; t < 6; t += 1)
                    S[t].c();
                h = _l(),
                E && E.c(),
                d = _l(),
                v = Xl("div"),
                p = Il(t[3]),
                e.src !== (i = t[0]) && Dl(e, "src", i),
                void 0 === t[1] && pf(( () => t[9].call(e))),
                void 0 === t[5] && pf(( () => t[12].call(e))),
                void 0 === t[5] && pf(( () => t[13].call(e))),
                s.disabled = c = !t[1],
                Dl(s, "class", "play-button yoopu3-icon svelte-1aown71"),
                Dl(f, "class", "bg svelte-1aown71"),
                Dl(l, "class", "progress-bar svelte-1aown71"),
                Dl(v, "class", "time-display svelte-1aown71"),
                Dl(n, "class", "audio-player svelte-1aown71")
            },
            m(i, r) {
                Ol(i, n, r),
                Tl(n, e),
                Tl(n, o),
                Tl(n, s),
                Tl(s, u),
                Tl(n, a),
                Tl(n, l),
                Tl(l, f);
                for (let t = 0; t < 6; t += 1)
                    S[t].m(f, null);
                Tl(l, h),
                E && E.m(l, null),
                t[15](l),
                Tl(n, d),
                Tl(n, v),
                Tl(v, p),
                m || (y = [Rl(e, "durationchange", t[9]), Rl(e, "timeupdate", x), Rl(e, "play", t[11]), Rl(e, "pause", t[11]), Rl(e, "progress", t[12]), Rl(e, "loadedmetadata", t[13]), Rl(s, "click", t[14]), Rl(l, "click", t[8])],
                m = !0)
            },
            p(t, [n]) {
                1 & n && e.src !== (i = t[0]) && Dl(e, "src", i),
                !g && 4 & n && !isNaN(t[2]) && (e.currentTime = t[2]),
                g = !1,
                16 & n && b !== (b = t[4]) && e[b ? "pause" : "play"](),
                16 & n && w !== (w = t[4] ? "" : "") && ql(u, w),
                2 & n && c !== (c = !t[1]) && (s.disabled = c),
                t[1] ? E ? E.p(t, n) : (E = $y(t),
                E.c(),
                E.m(l, null)) : E && (E.d(1),
                E = null),
                8 & n && ql(p, t[3])
            },
            i: el,
            o: el,
            d(e) {
                e && Cl(n),
                Al(S, e),
                E && E.d(),
                t[15](null),
                m = !1,
                ul(y)
            }
        }
    }
    function zy(t, n, e) {
        let i, r, o, {src: s} = n, u = 0, c = 0, a = !0, l = [];
        return t.$$set = t => {
            "src"in t && e(0, s = t.src)
        }
        ,
        t.$$.update = () => {
            1 & t.$$.dirty && (s || (e(1, u = 0),
            e(2, c = 0),
            e(4, a = !0))),
            6 & t.$$.dirty && e(3, o = u ? tn(1e3 * (u - c)) : "--:--"),
            8 & t.$$.dirty && e(6, i = Td({
                width: c / u * 100 + "%"
            }))
        }
        ,
        [s, u, c, o, a, l, i, r, function(t) {
            e(2, c = t.offsetX / r.getBoundingClientRect().width * u)
        }
        , function() {
            u = this.duration,
            e(1, u),
            e(0, s)
        }
        , function() {
            c = this.currentTime,
            e(2, c),
            e(0, s)
        }
        , function() {
            a = this.paused,
            e(4, a),
            e(0, s)
        }
        , function() {
            l = Bl(this.buffered),
            e(5, l)
        }
        , function() {
            l = Bl(this.buffered),
            e(5, l)
        }
        , () => e(4, a = !a), function(t) {
            af[t ? "unshift" : "push"](( () => {
                r = t,
                e(7, r)
            }
            ))
        }
        ]
    }
    class Ly extends Ff {
        constructor(t) {
            super(),
            $f(this, t, zy, Ny, al, {
                src: 0
            })
        }
    }
    const Gy = 1048576
      , Uy = {
        IMAGE_AVATAR: "IMAGE_AVATAR",
        AUDIO_FREE: "AUDIO_FREE",
        IMAGE_CHAT: "CHAT_IMAGE",
        AD_IMAGE: "AD_IMAGE",
        PDF_FAPIAO: "PDF_FAPIAO"
    }
      , Hy = {
        REAL_ID_IMAGE: "REAL_ID_IMAGE"
    }
      , Vy = {
        [Uy.IMAGE_AVATAR]: .5 * Gy,
        [Uy.AUDIO_FREE]: 10 * Gy,
        [Uy.IMAGE_CHAT]: .5 * Gy,
        [Uy.PDF_FAPIAO]: 2 * Gy,
        [Hy.REAL_ID_IMAGE]: 2 * Gy
    };
    var Wy = Id((function(t, e) {
        "undefined" != typeof self && self,
        t.exports = function(t) {
            function n(i) {
                if (e[i])
                    return e[i].exports;
                var r = e[i] = {
                    i: i,
                    l: !1,
                    exports: {}
                };
                return t[i].call(r.exports, r, r.exports, n),
                r.l = !0,
                r.exports
            }
            var e = {};
            return n.m = t,
            n.c = e,
            n.d = function(t, e, i) {
                n.o(t, e) || Object.defineProperty(t, e, {
                    configurable: !1,
                    enumerable: !0,
                    get: i
                })
            }
            ,
            n.n = function(t) {
                var e = t && t.__esModule ? function() {
                    return t.default
                }
                : function() {
                    return t
                }
                ;
                return n.d(e, "a", e),
                e
            }
            ,
            n.o = function(t, n) {
                return Object.prototype.hasOwnProperty.call(t, n)
            }
            ,
            n.p = "/dist/",
            n(n.s = 58)
        }([function(t, n) {
            var e = t.exports = "undefined" != typeof window && window.Math == Math ? window : "undefined" != typeof self && self.Math == Math ? self : Function("return this")();
            "number" == typeof __g && (__g = e)
        }
        , function(t, n) {
            var e = t.exports = {
                version: "2.6.9"
            };
            "number" == typeof __e && (__e = e)
        }
        , function(t, n, e) {
            var i = e(31)("wks")
              , r = e(22)
              , o = e(0).Symbol
              , s = "function" == typeof o;
            (t.exports = function(t) {
                return i[t] || (i[t] = s && o[t] || (s ? o : r)("Symbol." + t))
            }
            ).store = i
        }
        , function(t, n, e) {
            var i = e(8);
            t.exports = function(t) {
                if (!i(t))
                    throw TypeError(t + " is not an object!");
                return t
            }
        }
        , function(t, n, e) {
            t.exports = !e(10)((function() {
                return 7 != Object.defineProperty({}, "a", {
                    get: function() {
                        return 7
                    }
                }).a
            }
            ))
        }
        , function(t, n, e) {
            var i = e(0)
              , r = e(1)
              , o = e(19)
              , s = e(6)
              , u = e(9)
              , c = function(t, n, e) {
                var a, l, f, h = t & c.F, d = t & c.G, v = t & c.S, p = t & c.P, m = t & c.B, y = t & c.W, g = d ? r : r[n] || (r[n] = {}), b = g.prototype, w = d ? i : v ? i[n] : (i[n] || {}).prototype;
                for (a in d && (e = n),
                e)
                    (l = !h && w && void 0 !== w[a]) && u(g, a) || (f = l ? w[a] : e[a],
                    g[a] = d && "function" != typeof w[a] ? e[a] : m && l ? o(f, i) : y && w[a] == f ? function(t) {
                        var n = function(n, e, i) {
                            if (this instanceof t) {
                                switch (arguments.length) {
                                case 0:
                                    return new t;
                                case 1:
                                    return new t(n);
                                case 2:
                                    return new t(n,e)
                                }
                                return new t(n,e,i)
                            }
                            return t.apply(this, arguments)
                        };
                        return n.prototype = t.prototype,
                        n
                    }(f) : p && "function" == typeof f ? o(Function.call, f) : f,
                    p && ((g.virtual || (g.virtual = {}))[a] = f,
                    t & c.R && b && !b[a] && s(b, a, f)))
            };
            c.F = 1,
            c.G = 2,
            c.S = 4,
            c.P = 8,
            c.B = 16,
            c.W = 32,
            c.U = 64,
            c.R = 128,
            t.exports = c
        }
        , function(t, n, e) {
            var i = e(7)
              , r = e(21);
            t.exports = e(4) ? function(t, n, e) {
                return i.f(t, n, r(1, e))
            }
            : function(t, n, e) {
                return t[n] = e,
                t
            }
        }
        , function(t, n, e) {
            var i = e(3)
              , r = e(43)
              , o = e(29)
              , s = Object.defineProperty;
            n.f = e(4) ? Object.defineProperty : function(t, n, e) {
                if (i(t),
                n = o(n, !0),
                i(e),
                r)
                    try {
                        return s(t, n, e)
                    } catch (t) {}
                if ("get"in e || "set"in e)
                    throw TypeError("Accessors not supported!");
                return "value"in e && (t[n] = e.value),
                t
            }
        }
        , function(t, n) {
            t.exports = function(t) {
                return "object" == typeof t ? null !== t : "function" == typeof t
            }
        }
        , function(t, n) {
            var e = {}.hasOwnProperty;
            t.exports = function(t, n) {
                return e.call(t, n)
            }
        }
        , function(t, n) {
            t.exports = function(t) {
                try {
                    return !!t()
                } catch (t) {
                    return !0
                }
            }
        }
        , function(t, n, e) {
            var i = e(47)
              , r = e(27);
            t.exports = function(t) {
                return i(r(t))
            }
        }
        , function(t, n, e) {
            function i(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }
            function r(t) {
                var n = t + 864e5;
                return (new Date).getTime() > n
            }
            function o(t) {
                return (0,
                m.default)(t).filter((function(t) {
                    return t.startsWith("x:")
                }
                )).map((function(n) {
                    return [n, t[n].toString()]
                }
                ))
            }
            function s(t) {
                return "qiniu_js_sdk_upload_file_" + t.name + "_size_" + t.size
            }
            function u(t) {
                try {
                    return JSON.parse(localStorage.getItem(s(t))) || []
                } catch (t) {
                    return window.console && window.console.warn && console.warn("getLocalFileInfo failed"),
                    []
                }
            }
            function c(t) {
                return {
                    Authorization: "UpToken " + t
                }
            }
            function a() {
                return window.XMLHttpRequest ? new XMLHttpRequest : new window.ActiveXObject("Microsoft.XMLHTTP")
            }
            function l(t) {
                return new d.default((function(n, e) {
                    var i = new FileReader;
                    i.readAsArrayBuffer(t),
                    i.onload = function(t) {
                        var e = t.target.result;
                        n(e)
                    }
                    ,
                    i.onerror = function() {
                        e(new Error("fileReader 读取错误"))
                    }
                }
                ))
            }
            function f(t, n) {
                return new d.default((function(e, i) {
                    var r = a();
                    r.open(n.method, t),
                    n.onCreate && n.onCreate(r),
                    n.headers && (0,
                    m.default)(n.headers).forEach((function(t) {
                        return r.setRequestHeader(t, n.headers[t])
                    }
                    )),
                    r.upload.addEventListener("progress", (function(t) {
                        t.lengthComputable && n.onProgress && n.onProgress({
                            loaded: t.loaded,
                            total: t.total
                        })
                    }
                    )),
                    r.onreadystatechange = function() {
                        var t = r.responseText;
                        if (4 === r.readyState) {
                            var n = r.getResponseHeader("x-reqId") || "";
                            if (200 !== r.status) {
                                var o = "xhr request failed, code: " + r.status + ";";
                                return t && (o = o + " response: " + t),
                                void i({
                                    code: r.status,
                                    message: o,
                                    reqId: n,
                                    isRequestError: !0
                                })
                            }
                            try {
                                e({
                                    data: JSON.parse(t),
                                    reqId: n
                                })
                            } catch (t) {
                                i(t)
                            }
                        }
                    }
                    ,
                    r.send(n.body)
                }
                ))
            }
            function h() {
                return "http:" === window.location.protocol ? "http:" : "https:"
            }
            n.__esModule = !0;
            var d = i(e(18))
              , v = i(e(34))
              , p = i(e(86))
              , m = i(e(36));
            n.isChunkExpired = r,
            n.getChunks = function(t, n) {
                for (var e = [], i = Math.ceil(t.size / n), r = 0; r < i; r++) {
                    var o = t.slice(n * r, r === i - 1 ? t.size : n * (r + 1));
                    e.push(o)
                }
                return e
            }
            ,
            n.filterParams = o,
            n.sum = function(t) {
                return t.reduce((function(t, n) {
                    return t + n
                }
                ), 0)
            }
            ,
            n.setLocalFileInfo = function(t, n) {
                try {
                    localStorage.setItem(s(t), (0,
                    p.default)(n))
                } catch (t) {
                    window.console && window.console.warn && console.warn("setLocalFileInfo failed")
                }
            }
            ,
            n.removeLocalFileInfo = function(t) {
                try {
                    localStorage.removeItem(s(t))
                } catch (t) {
                    window.console && window.console.warn && console.warn("removeLocalFileInfo failed")
                }
            }
            ,
            n.getLocalFileInfo = u,
            n.getResumeUploadedSize = function(t) {
                return u(t).filter((function(t) {
                    return t && !r(t.time)
                }
                )).reduce((function(t, n) {
                    return t + n.size
                }
                ), 0)
            }
            ,
            n.createMkFileUrl = function(t, n, e, i) {
                var r = t + "/mkfile/" + n.size;
                null != e && (r += "/key/" + (0,
                y.urlSafeBase64Encode)(e)),
                i.mimeType && (r += "/mimeType/" + (0,
                y.urlSafeBase64Encode)(n.type));
                var s = i.fname;
                return s && (r += "/fname/" + (0,
                y.urlSafeBase64Encode)(s)),
                i.params && o(i.params).forEach((function(t) {
                    return r += "/" + encodeURIComponent(t[0]) + "/" + (0,
                    y.urlSafeBase64Encode)(t[1])
                }
                )),
                r
            }
            ,
            n.getHeadersForChunkUpload = function(t) {
                var n = c(t);
                return (0,
                v.default)({
                    "content-type": "application/octet-stream"
                }, n)
            }
            ,
            n.getHeadersForMkFile = function(t) {
                var n = c(t);
                return (0,
                v.default)({
                    "content-type": "text/plain"
                }, n)
            }
            ,
            n.createXHR = a,
            n.computeMd5 = function(t) {
                return l(t).then((function(t) {
                    var n = new b.default.ArrayBuffer;
                    return n.append(t),
                    n.end()
                }
                ))
            }
            ,
            n.readAsArrayBuffer = l,
            n.request = f,
            n.getPortFromUrl = function(t) {
                if (t && t.match) {
                    var n = t.match(/(^https?)/);
                    if (!n)
                        return "";
                    var e = n[1];
                    return (n = t.match(/^https?:\/\/([^:^\/]*):(\d*)/)) ? n[2] : "http" === e ? "80" : "443"
                }
                return ""
            }
            ,
            n.getDomainFromUrl = function(t) {
                if (t && t.match) {
                    var n = t.match(/^https?:\/\/([^:^\/]*)/);
                    return n ? n[1] : ""
                }
                return ""
            }
            ,
            n.getUploadUrl = function(t, n) {
                var e = h();
                if (null != t.uphost)
                    return d.default.resolve(e + "//" + t.uphost);
                if (null != t.region) {
                    var i = g.regionUphostMap[t.region]
                      , r = t.useCdnDomain ? i.cdnUphost : i.srcUphost;
                    return d.default.resolve(e + "//" + r)
                }
                return function(t) {
                    try {
                        var n = function(t) {
                            var n = t.split(":")
                              , e = n[0]
                              , i = JSON.parse((0,
                            y.urlSafeBase64Decode)(n[2]));
                            return i.ak = e,
                            i.bucket = i.scope.split(":")[0],
                            i
                        }(t);
                        return f(h() + "//api.qiniu.com/v2/query?ak=" + n.ak + "&bucket=" + n.bucket, {
                            method: "GET"
                        })
                    } catch (t) {
                        return d.default.reject(t)
                    }
                }(n).then((function(t) {
                    var n = t.data.up.acc.main;
                    return e + "//" + n[0]
                }
                ))
            }
            ,
            n.isContainFileMimeType = function(t, n) {
                return n.indexOf(t) > -1
            }
            ,
            n.createObjectURL = function(t) {
                return (window.URL || window.webkitURL || window.mozURL).createObjectURL(t)
            }
            ,
            n.getTransform = function(t, n) {
                var e = t.width
                  , i = t.height;
                switch (n) {
                case 1:
                    return {
                        width: e,
                        height: i,
                        matrix: [1, 0, 0, 1, 0, 0]
                    };
                case 2:
                    return {
                        width: e,
                        height: i,
                        matrix: [-1, 0, 0, 1, e, 0]
                    };
                case 3:
                    return {
                        width: e,
                        height: i,
                        matrix: [-1, 0, 0, -1, e, i]
                    };
                case 4:
                    return {
                        width: e,
                        height: i,
                        matrix: [1, 0, 0, -1, 0, i]
                    };
                case 5:
                    return {
                        width: i,
                        height: e,
                        matrix: [0, 1, 1, 0, 0, 0]
                    };
                case 6:
                    return {
                        width: i,
                        height: e,
                        matrix: [0, 1, -1, 0, i, 0]
                    };
                case 7:
                    return {
                        width: i,
                        height: e,
                        matrix: [0, -1, -1, 0, i, e]
                    };
                case 8:
                    return {
                        width: i,
                        height: e,
                        matrix: [0, -1, 1, 0, 0, e]
                    }
                }
            }
            ;
            var y = e(56)
              , g = e(39)
              , b = i(e(91))
        }
        , function(t, n) {
            t.exports = !0
        }
        , function(t, n) {
            t.exports = {}
        }
        , function(t, n, e) {
            var i = e(46)
              , r = e(32);
            t.exports = Object.keys || function(t) {
                return i(t, r)
            }
        }
        , function(t, n) {
            var e = {}.toString;
            t.exports = function(t) {
                return e.call(t).slice(8, -1)
            }
        }
        , function(t, n, e) {
            n.__esModule = !0,
            n.default = function(t, n) {
                if (!(t instanceof n))
                    throw new TypeError("Cannot call a class as a function")
            }
        }
        , function(t, n, e) {
            t.exports = {
                default: e(59),
                __esModule: !0
            }
        }
        , function(t, n, e) {
            var i = e(20);
            t.exports = function(t, n, e) {
                if (i(t),
                void 0 === n)
                    return t;
                switch (e) {
                case 1:
                    return function(e) {
                        return t.call(n, e)
                    }
                    ;
                case 2:
                    return function(e, i) {
                        return t.call(n, e, i)
                    }
                    ;
                case 3:
                    return function(e, i, r) {
                        return t.call(n, e, i, r)
                    }
                }
                return function() {
                    return t.apply(n, arguments)
                }
            }
        }
        , function(t, n) {
            t.exports = function(t) {
                if ("function" != typeof t)
                    throw TypeError(t + " is not a function!");
                return t
            }
        }
        , function(t, n) {
            t.exports = function(t, n) {
                return {
                    enumerable: !(1 & t),
                    configurable: !(2 & t),
                    writable: !(4 & t),
                    value: n
                }
            }
        }
        , function(t, n) {
            var e = 0
              , i = Math.random();
            t.exports = function(t) {
                return "Symbol(".concat(void 0 === t ? "" : t, ")_", (++e + i).toString(36))
            }
        }
        , function(t, n, e) {
            var i = e(7).f
              , r = e(9)
              , o = e(2)("toStringTag");
            t.exports = function(t, n, e) {
                t && !r(t = e ? t : t.prototype, o) && i(t, o, {
                    configurable: !0,
                    value: n
                })
            }
        }
        , function(t, n, e) {
            var i = e(27);
            t.exports = function(t) {
                return Object(i(t))
            }
        }
        , function(t, n) {
            n.f = {}.propertyIsEnumerable
        }
        , function(t, n) {
            var e = Math.ceil
              , i = Math.floor;
            t.exports = function(t) {
                return isNaN(t = +t) ? 0 : (t > 0 ? i : e)(t)
            }
        }
        , function(t, n) {
            t.exports = function(t) {
                if (null == t)
                    throw TypeError("Can't call method on  " + t);
                return t
            }
        }
        , function(t, n, e) {
            var i = e(8)
              , r = e(0).document
              , o = i(r) && i(r.createElement);
            t.exports = function(t) {
                return o ? r.createElement(t) : {}
            }
        }
        , function(t, n, e) {
            var i = e(8);
            t.exports = function(t, n) {
                if (!i(t))
                    return t;
                var e, r;
                if (n && "function" == typeof (e = t.toString) && !i(r = e.call(t)))
                    return r;
                if ("function" == typeof (e = t.valueOf) && !i(r = e.call(t)))
                    return r;
                if (!n && "function" == typeof (e = t.toString) && !i(r = e.call(t)))
                    return r;
                throw TypeError("Can't convert object to primitive value")
            }
        }
        , function(t, n, e) {
            var i = e(31)("keys")
              , r = e(22);
            t.exports = function(t) {
                return i[t] || (i[t] = r(t))
            }
        }
        , function(t, n, e) {
            var i = e(1)
              , r = e(0)
              , o = r["qt"] || (r["qt"] = {});
            (t.exports = function(t, n) {
                return o[t] || (o[t] = void 0 !== n ? n : {})
            }
            )("versions", []).push({
                version: i.version,
                mode: e(13) ? "pure" : "global",
                copyright: "© 2019 Denis Pushkarev (zloirock.ru)"
            })
        }
        , function(t, n) {
            t.exports = "constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")
        }
        , function(t, n, e) {
            var i = e(20);
            t.exports.f = function(t) {
                return new function(t) {
                    var n, e;
                    this.promise = new t((function(t, i) {
                        if (void 0 !== n || void 0 !== e)
                            throw TypeError("Bad Promise constructor");
                        n = t,
                        e = i
                    }
                    )),
                    this.resolve = i(n),
                    this.reject = i(e)
                }
                (t)
            }
        }
        , function(t, n, e) {
            t.exports = {
                default: e(83),
                __esModule: !0
            }
        }
        , function(t, n) {
            n.f = Object.getOwnPropertySymbols
        }
        , function(t, n, e) {
            t.exports = {
                default: e(88),
                __esModule: !0
            }
        }
        , function(t, n, e) {
            n.f = e(2)
        }
        , function(t, n, e) {
            var i = e(0)
              , r = e(1)
              , o = e(13)
              , s = e(37)
              , u = e(7).f;
            t.exports = function(t) {
                var n = r.Symbol || (r.Symbol = o ? {} : i.Symbol || {});
                "_" == t.charAt(0) || t in n || u(n, t, {
                    value: s.f(t)
                })
            }
        }
        , function(t, n, e) {
            n.__esModule = !0,
            n.regionUphostMap = {
                z0: {
                    srcUphost: "up.qiniup.com",
                    cdnUphost: "upload.qiniup.com"
                },
                z1: {
                    srcUphost: "up-z1.qiniup.com",
                    cdnUphost: "upload-z1.qiniup.com"
                },
                z2: {
                    srcUphost: "up-z2.qiniup.com",
                    cdnUphost: "upload-z2.qiniup.com"
                },
                na0: {
                    srcUphost: "up-na0.qiniup.com",
                    cdnUphost: "upload-na0.qiniup.com"
                },
                as0: {
                    srcUphost: "up-as0.qiniup.com",
                    cdnUphost: "upload-as0.qiniup.com"
                }
            },
            n.region = {
                z0: "z0",
                z1: "z1",
                z2: "z2",
                na0: "na0",
                as0: "as0"
            }
        }
        , function(t, n) {}
        , function(t, n, e) {
            var i = e(60)(!0);
            e(42)(String, "String", (function(t) {
                this._t = String(t),
                this._i = 0
            }
            ), (function() {
                var t, n = this._t, e = this._i;
                return e >= n.length ? {
                    value: void 0,
                    done: !0
                } : (t = i(n, e),
                this._i += t.length,
                {
                    value: t,
                    done: !1
                })
            }
            ))
        }
        , function(t, n, e) {
            var i = e(13)
              , r = e(5)
              , o = e(44)
              , s = e(6)
              , u = e(14)
              , c = e(61)
              , a = e(23)
              , l = e(65)
              , f = e(2)("iterator")
              , h = !([].keys && "next"in [].keys())
              , d = function() {
                return this
            };
            t.exports = function(t, n, e, v, p, m, y) {
                c(e, n, v);
                var g, b, w, x = function(t) {
                    if (!h && t in T)
                        return T[t];
                    switch (t) {
                    case "keys":
                    case "values":
                        return function() {
                            return new e(this,t)
                        }
                    }
                    return function() {
                        return new e(this,t)
                    }
                }, k = n + " Iterator", S = "values" == p, E = !1, T = t.prototype, O = T[f] || T["@@iterator"] || p && T[p], C = O || x(p), A = p ? S ? x("entries") : C : void 0, X = "Array" == n && T.entries || O;
                if (X && (w = l(X.call(new t))) !== Object.prototype && w.next && (a(w, k, !0),
                i || "function" == typeof w[f] || s(w, f, d)),
                S && O && "values" !== O.name && (E = !0,
                C = function() {
                    return O.call(this)
                }
                ),
                i && !y || !h && !E && T[f] || s(T, f, C),
                u[n] = C,
                u[k] = d,
                p)
                    if (g = {
                        values: S ? C : x("values"),
                        keys: m ? C : x("keys"),
                        entries: A
                    },
                    y)
                        for (b in g)
                            b in T || o(T, b, g[b]);
                    else
                        r(r.P + r.F * (h || E), n, g);
                return g
            }
        }
        , function(t, n, e) {
            t.exports = !e(4) && !e(10)((function() {
                return 7 != Object.defineProperty(e(28)("div"), "a", {
                    get: function() {
                        return 7
                    }
                }).a
            }
            ))
        }
        , function(t, n, e) {
            t.exports = e(6)
        }
        , function(t, n, e) {
            var i = e(3)
              , r = e(62)
              , o = e(32)
              , s = e(30)("IE_PROTO")
              , u = function() {}
              , c = function() {
                var t, n = e(28)("iframe"), i = o.length;
                for (n.style.display = "none",
                e(49).appendChild(n),
                n.src = "javascript:",
                (t = n.contentWindow.document).open(),
                t.write("<script>document.F=Object<\/script>"),
                t.close(),
                c = t.F; i--; )
                    delete c.prototype[o[i]];
                return c()
            };
            t.exports = Object.create || function(t, n) {
                var e;
                return null !== t ? (u.prototype = i(t),
                e = new u,
                u.prototype = null,
                e[s] = t) : e = c(),
                void 0 === n ? e : r(e, n)
            }
        }
        , function(t, n, e) {
            var i = e(9)
              , r = e(11)
              , o = e(63)(!1)
              , s = e(30)("IE_PROTO");
            t.exports = function(t, n) {
                var e, u = r(t), c = 0, a = [];
                for (e in u)
                    e != s && i(u, e) && a.push(e);
                for (; n.length > c; )
                    i(u, e = n[c++]) && (~o(a, e) || a.push(e));
                return a
            }
        }
        , function(t, n, e) {
            var i = e(16);
            t.exports = Object("z").propertyIsEnumerable(0) ? Object : function(t) {
                return "String" == i(t) ? t.split("") : Object(t)
            }
        }
        , function(t, n, e) {
            var i = e(26)
              , r = Math.min;
            t.exports = function(t) {
                return t > 0 ? r(i(t), 9007199254740991) : 0
            }
        }
        , function(t, n, e) {
            var i = e(0).document;
            t.exports = i && i.documentElement
        }
        , function(t, n, e) {
            e(66);
            for (var i = e(0), r = e(6), o = e(14), s = e(2)("toStringTag"), u = "CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,TextTrackList,TouchList".split(","), c = 0; c < u.length; c++) {
                var a = u[c]
                  , l = i[a]
                  , f = l && l.prototype;
                f && !f[s] && r(f, s, a),
                o[a] = o.Array
            }
        }
        , function(t, n, e) {
            var i = e(16)
              , r = e(2)("toStringTag")
              , o = "Arguments" == i(function() {
                return arguments
            }());
            t.exports = function(t) {
                var n, e, s;
                return void 0 === t ? "Undefined" : null === t ? "Null" : "string" == typeof (e = function(t, n) {
                    try {
                        return t[n]
                    } catch (t) {}
                }(n = Object(t), r)) ? e : o ? i(n) : "Object" == (s = i(n)) && "function" == typeof n.callee ? "Arguments" : s
            }
        }
        , function(t, n, e) {
            var i = e(3)
              , r = e(20)
              , o = e(2)("species");
            t.exports = function(t, n) {
                var e, s = i(t).constructor;
                return void 0 === s || null == (e = i(s)[o]) ? n : r(e)
            }
        }
        , function(t, n, e) {
            var i, r, o, s = e(19), u = e(75), c = e(49), a = e(28), l = e(0), f = l.process, h = l.setImmediate, d = l.clearImmediate, v = l.MessageChannel, p = l.Dispatch, m = 0, y = {}, g = function() {
                var t = +this;
                if (y.hasOwnProperty(t)) {
                    var n = y[t];
                    delete y[t],
                    n()
                }
            }, b = function(t) {
                g.call(t.data)
            };
            h && d || (h = function(t) {
                for (var n = [], e = 1; arguments.length > e; )
                    n.push(arguments[e++]);
                return y[++m] = function() {
                    u("function" == typeof t ? t : Function(t), n)
                }
                ,
                i(m),
                m
            }
            ,
            d = function(t) {
                delete y[t]
            }
            ,
            "process" == e(16)(f) ? i = function(t) {
                f.nextTick(s(g, t, 1))
            }
            : p && p.now ? i = function(t) {
                p.now(s(g, t, 1))
            }
            : v ? (o = (r = new v).port2,
            r.port1.onmessage = b,
            i = s(o.postMessage, o, 1)) : l.addEventListener && "function" == typeof postMessage && !l.importScripts ? (i = function(t) {
                l.postMessage(t + "", "*")
            }
            ,
            l.addEventListener("message", b, !1)) : i = "onreadystatechange"in a("script") ? function(t) {
                c.appendChild(a("script")).onreadystatechange = function() {
                    c.removeChild(this),
                    g.call(t)
                }
            }
            : function(t) {
                setTimeout(s(g, t, 1), 0)
            }
            ),
            t.exports = {
                set: h,
                clear: d
            }
        }
        , function(t, n) {
            t.exports = function(t) {
                try {
                    return {
                        e: !1,
                        v: t()
                    }
                } catch (t) {
                    return {
                        e: !0,
                        v: t
                    }
                }
            }
        }
        , function(t, n, e) {
            var i = e(3)
              , r = e(8)
              , o = e(33);
            t.exports = function(t, n) {
                if (i(t),
                r(n) && n.constructor === t)
                    return n;
                var e = o.f(t);
                return (0,
                e.resolve)(n),
                e.promise
            }
        }
        , function(t, n, e) {
            n.__esModule = !0,
            n.urlSafeBase64Encode = function(t) {
                return (t = function(t) {
                    var n = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
                      , e = void 0
                      , i = void 0
                      , r = void 0
                      , o = void 0
                      , s = void 0
                      , u = 0
                      , c = 0
                      , a = ""
                      , l = [];
                    if (!t)
                        return t;
                    t = function(t) {
                        if (null == t)
                            return "";
                        var n = t + ""
                          , e = ""
                          , i = void 0
                          , r = void 0
                          , o = 0;
                        i = r = 0,
                        o = n.length;
                        for (var s = 0; s < o; s++) {
                            var u = n.charCodeAt(s)
                              , c = null;
                            if (u < 128)
                                r++;
                            else if (u > 127 && u < 2048)
                                c = String.fromCharCode(u >> 6 | 192, 63 & u | 128);
                            else if (63488 & u ^ !0)
                                c = String.fromCharCode(u >> 12 | 224, u >> 6 & 63 | 128, 63 & u | 128);
                            else {
                                if (64512 & u ^ !0)
                                    throw new RangeError("Unmatched trail surrogate at " + s);
                                var a = n.charCodeAt(++s);
                                if (64512 & a ^ !0)
                                    throw new RangeError("Unmatched lead surrogate at " + (s - 1));
                                u = ((1023 & u) << 10) + (1023 & a) + 65536,
                                c = String.fromCharCode(u >> 18 | 240, u >> 12 & 63 | 128, u >> 6 & 63 | 128, 63 & u | 128)
                            }
                            null !== c && (r > i && (e += n.slice(i, r)),
                            e += c,
                            i = r = s + 1)
                        }
                        return r > i && (e += n.slice(i, o)),
                        e
                    }(t + "");
                    do {
                        e = (s = t.charCodeAt(u++) << 16 | t.charCodeAt(u++) << 8 | t.charCodeAt(u++)) >> 18 & 63,
                        i = s >> 12 & 63,
                        r = s >> 6 & 63,
                        o = 63 & s,
                        l[c++] = n.charAt(e) + n.charAt(i) + n.charAt(r) + n.charAt(o)
                    } while (u < t.length);
                    switch (a = l.join(""),
                    t.length % 3) {
                    case 1:
                        a = a.slice(0, -2) + "==";
                        break;
                    case 2:
                        a = a.slice(0, -1) + "="
                    }
                    return a
                }(t)).replace(/\//g, "_").replace(/\+/g, "-")
            }
            ,
            n.urlSafeBase64Decode = function(t) {
                return function(t) {
                    var n = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
                      , e = void 0
                      , i = void 0
                      , r = void 0
                      , o = void 0
                      , s = void 0
                      , u = void 0
                      , c = 0
                      , a = 0
                      , l = [];
                    if (!t)
                        return t;
                    t += "";
                    do {
                        e = (u = n.indexOf(t.charAt(c++)) << 18 | n.indexOf(t.charAt(c++)) << 12 | (o = n.indexOf(t.charAt(c++))) << 6 | (s = n.indexOf(t.charAt(c++)))) >> 16 & 255,
                        i = u >> 8 & 255,
                        r = 255 & u,
                        l[a++] = 64 === o ? String.fromCharCode(e) : 64 === s ? String.fromCharCode(e, i) : String.fromCharCode(e, i, r)
                    } while (c < t.length);
                    return l.join("")
                }(t = t.replace(/_/g, "/").replace(/-/g, "+"))
            }
        }
        , function(t, n, e) {
            var i = e(46)
              , r = e(32).concat("length", "prototype");
            n.f = Object.getOwnPropertyNames || function(t) {
                return i(t, r)
            }
        }
        , function(t, n, e) {
            n.__esModule = !0,
            n.pipeline = n.compressImage = n.exif = n.imageInfo = n.watermark = n.imageMogr2 = n.getUploadUrl = n.filterParams = n.getHeadersForMkFile = n.getResumeUploadedSize = n.getHeadersForChunkUpload = n.createMkFileUrl = n.region = n.upload = void 0;
            var i = e(39)
              , r = e(12)
              , o = e(92)
              , s = e(94)
              , u = e(95)
              , c = e(109)
              , a = function(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }(e(110))
              , l = new c.StatisticsLogger;
            n.upload = function(t, n, e, i, r) {
                var s = {
                    file: t,
                    key: n,
                    token: e,
                    putExtra: i,
                    config: r
                };
                return new u.Observable((function(t) {
                    var n = new o.UploadManager(s,{
                        onData: function(n) {
                            return t.next(n)
                        },
                        onError: function(n) {
                            return t.error(n)
                        },
                        onComplete: function(n) {
                            return t.complete(n)
                        }
                    },l);
                    return n.putFile(),
                    n.stop.bind(n)
                }
                ))
            }
            ,
            n.region = i.region,
            n.createMkFileUrl = r.createMkFileUrl,
            n.getHeadersForChunkUpload = r.getHeadersForChunkUpload,
            n.getResumeUploadedSize = r.getResumeUploadedSize,
            n.getHeadersForMkFile = r.getHeadersForMkFile,
            n.filterParams = r.filterParams,
            n.getUploadUrl = r.getUploadUrl,
            n.imageMogr2 = s.imageMogr2,
            n.watermark = s.watermark,
            n.imageInfo = s.imageInfo,
            n.exif = s.exif,
            n.compressImage = a.default,
            n.pipeline = s.pipeline
        }
        , function(t, n, e) {
            e(40),
            e(41),
            e(50),
            e(69),
            e(81),
            e(82),
            t.exports = e(1).Promise
        }
        , function(t, n, e) {
            var i = e(26)
              , r = e(27);
            t.exports = function(t) {
                return function(n, e) {
                    var o, s, u = String(r(n)), c = i(e), a = u.length;
                    return c < 0 || c >= a ? t ? "" : void 0 : (o = u.charCodeAt(c)) < 55296 || o > 56319 || c + 1 === a || (s = u.charCodeAt(c + 1)) < 56320 || s > 57343 ? t ? u.charAt(c) : o : t ? u.slice(c, c + 2) : s - 56320 + (o - 55296 << 10) + 65536
                }
            }
        }
        , function(t, n, e) {
            var i = e(45)
              , r = e(21)
              , o = e(23)
              , s = {};
            e(6)(s, e(2)("iterator"), (function() {
                return this
            }
            )),
            t.exports = function(t, n, e) {
                t.prototype = i(s, {
                    next: r(1, e)
                }),
                o(t, n + " Iterator")
            }
        }
        , function(t, n, e) {
            var i = e(7)
              , r = e(3)
              , o = e(15);
            t.exports = e(4) ? Object.defineProperties : function(t, n) {
                r(t);
                for (var e, s = o(n), u = s.length, c = 0; u > c; )
                    i.f(t, e = s[c++], n[e]);
                return t
            }
        }
        , function(t, n, e) {
            var i = e(11)
              , r = e(48)
              , o = e(64);
            t.exports = function(t) {
                return function(n, e, s) {
                    var u, c = i(n), a = r(c.length), l = o(s, a);
                    if (t && e != e) {
                        for (; a > l; )
                            if ((u = c[l++]) != u)
                                return !0
                    } else
                        for (; a > l; l++)
                            if ((t || l in c) && c[l] === e)
                                return t || l || 0;
                    return !t && -1
                }
            }
        }
        , function(t, n, e) {
            var i = e(26)
              , r = Math.max
              , o = Math.min;
            t.exports = function(t, n) {
                return (t = i(t)) < 0 ? r(t + n, 0) : o(t, n)
            }
        }
        , function(t, n, e) {
            var i = e(9)
              , r = e(24)
              , o = e(30)("IE_PROTO")
              , s = Object.prototype;
            t.exports = Object.getPrototypeOf || function(t) {
                return t = r(t),
                i(t, o) ? t[o] : "function" == typeof t.constructor && t instanceof t.constructor ? t.constructor.prototype : t instanceof Object ? s : null
            }
        }
        , function(t, n, e) {
            var i = e(67)
              , r = e(68)
              , o = e(14)
              , s = e(11);
            t.exports = e(42)(Array, "Array", (function(t, n) {
                this._t = s(t),
                this._i = 0,
                this._k = n
            }
            ), (function() {
                var t = this._t
                  , n = this._k
                  , e = this._i++;
                return !t || e >= t.length ? (this._t = void 0,
                r(1)) : r(0, "keys" == n ? e : "values" == n ? t[e] : [e, t[e]])
            }
            ), "values"),
            o.Arguments = o.Array,
            i("keys"),
            i("values"),
            i("entries")
        }
        , function(t, n) {
            t.exports = function() {}
        }
        , function(t, n) {
            t.exports = function(t, n) {
                return {
                    value: n,
                    done: !!t
                }
            }
        }
        , function(t, n, e) {
            var i, r, o, s, u = e(13), c = e(0), a = e(19), l = e(51), f = e(5), h = e(8), d = e(20), v = e(70), p = e(71), m = e(52), y = e(53).set, g = e(76)(), b = e(33), w = e(54), x = e(77), k = e(55), S = c.TypeError, E = c.process, T = E && E.versions, O = T && T.v8 || "", C = c.Promise, A = "process" == l(E), X = function() {}, I = r = b.f, _ = !!function() {
                try {
                    var t = C.resolve(1)
                      , n = (t.constructor = {})[e(2)("species")] = function(t) {
                        t(X, X)
                    }
                    ;
                    return (A || "function" == typeof PromiseRejectionEvent) && t.then(X)instanceof n && 0 !== O.indexOf("6.6") && -1 === x.indexOf("Chrome/66")
                } catch (t) {}
            }(), M = function(t) {
                var n;
                return !(!h(t) || "function" != typeof (n = t.then)) && n
            }, R = function(t, n) {
                if (!t._n) {
                    t._n = !0;
                    var e = t._c;
                    g((function() {
                        for (var i = t._v, r = 1 == t._s, o = 0; e.length > o; )
                            !function(n) {
                                var e, o, s, u = r ? n.ok : n.fail, c = n.resolve, a = n.reject, l = n.domain;
                                try {
                                    u ? (r || (2 == t._h && B(t),
                                    t._h = 1),
                                    !0 === u ? e = i : (l && l.enter(),
                                    e = u(i),
                                    l && (l.exit(),
                                    s = !0)),
                                    e === n.promise ? a(S("Promise-chain cycle")) : (o = M(e)) ? o.call(e, c, a) : c(e)) : a(i)
                                } catch (t) {
                                    l && !s && l.exit(),
                                    a(t)
                                }
                            }(e[o++]);
                        t._c = [],
                        t._n = !1,
                        n && !t._h && D(t)
                    }
                    ))
                }
            }, D = function(t) {
                y.call(c, (function() {
                    var n, e, i, r = t._v, o = j(t);
                    if (o && (n = w((function() {
                        A ? E.emit("unhandledRejection", r, t) : (e = c.onunhandledrejection) ? e({
                            promise: t,
                            reason: r
                        }) : (i = c.console) && i.error && i.error("Unhandled promise rejection", r)
                    }
                    )),
                    t._h = A || j(t) ? 2 : 1),
                    t._a = void 0,
                    o && n.e)
                        throw n.v
                }
                ))
            }, j = function(t) {
                return 1 !== t._h && 0 === (t._a || t._c).length
            }, B = function(t) {
                y.call(c, (function() {
                    var n;
                    A ? E.emit("rejectionHandled", t) : (n = c.onrejectionhandled) && n({
                        promise: t,
                        reason: t._v
                    })
                }
                ))
            }, P = function(t) {
                var n = this;
                n._d || (n._d = !0,
                (n = n._w || n)._v = t,
                n._s = 2,
                n._a || (n._a = n._c.slice()),
                R(n, !0))
            }, q = function(t) {
                var n, e = this;
                if (!e._d) {
                    e._d = !0,
                    e = e._w || e;
                    try {
                        if (e === t)
                            throw S("Promise can't be resolved itself");
                        (n = M(t)) ? g((function() {
                            var i = {
                                _w: e,
                                _d: !1
                            };
                            try {
                                n.call(t, a(q, i, 1), a(P, i, 1))
                            } catch (t) {
                                P.call(i, t)
                            }
                        }
                        )) : (e._v = t,
                        e._s = 1,
                        R(e, !1))
                    } catch (t) {
                        P.call({
                            _w: e,
                            _d: !1
                        }, t)
                    }
                }
            };
            _ || (C = function(t) {
                v(this, C, "Promise", "_h"),
                d(t),
                i.call(this);
                try {
                    t(a(q, this, 1), a(P, this, 1))
                } catch (t) {
                    P.call(this, t)
                }
            }
            ,
            (i = function(t) {
                this._c = [],
                this._a = void 0,
                this._s = 0,
                this._d = !1,
                this._v = void 0,
                this._h = 0,
                this._n = !1
            }
            ).prototype = e(78)(C.prototype, {
                then: function(t, n) {
                    var e = I(m(this, C));
                    return e.ok = "function" != typeof t || t,
                    e.fail = "function" == typeof n && n,
                    e.domain = A ? E.domain : void 0,
                    this._c.push(e),
                    this._a && this._a.push(e),
                    this._s && R(this, !1),
                    e.promise
                },
                catch: function(t) {
                    return this.then(void 0, t)
                }
            }),
            o = function() {
                var t = new i;
                this.promise = t,
                this.resolve = a(q, t, 1),
                this.reject = a(P, t, 1)
            }
            ,
            b.f = I = function(t) {
                return t === C || t === s ? new o(t) : r(t)
            }
            ),
            f(f.G + f.W + f.F * !_, {
                Promise: C
            }),
            e(23)(C, "Promise"),
            e(79)("Promise"),
            s = e(1).Promise,
            f(f.S + f.F * !_, "Promise", {
                reject: function(t) {
                    var n = I(this);
                    return (0,
                    n.reject)(t),
                    n.promise
                }
            }),
            f(f.S + f.F * (u || !_), "Promise", {
                resolve: function(t) {
                    return k(u && this === s ? C : this, t)
                }
            }),
            f(f.S + f.F * !(_ && e(80)((function(t) {
                C.all(t).catch(X)
            }
            ))), "Promise", {
                all: function(t) {
                    var n = this
                      , e = I(n)
                      , i = e.resolve
                      , r = e.reject
                      , o = w((function() {
                        var e = []
                          , o = 0
                          , s = 1;
                        p(t, !1, (function(t) {
                            var u = o++
                              , c = !1;
                            e.push(void 0),
                            s++,
                            n.resolve(t).then((function(t) {
                                c || (c = !0,
                                e[u] = t,
                                --s || i(e))
                            }
                            ), r)
                        }
                        )),
                        --s || i(e)
                    }
                    ));
                    return o.e && r(o.v),
                    e.promise
                },
                race: function(t) {
                    var n = this
                      , e = I(n)
                      , i = e.reject
                      , r = w((function() {
                        p(t, !1, (function(t) {
                            n.resolve(t).then(e.resolve, i)
                        }
                        ))
                    }
                    ));
                    return r.e && i(r.v),
                    e.promise
                }
            })
        }
        , function(t, n) {
            t.exports = function(t, n, e, i) {
                if (!(t instanceof n) || void 0 !== i && i in t)
                    throw TypeError(e + ": incorrect invocation!");
                return t
            }
        }
        , function(t, n, e) {
            var i = e(19)
              , r = e(72)
              , o = e(73)
              , s = e(3)
              , u = e(48)
              , c = e(74)
              , a = {}
              , l = {};
            (n = t.exports = function(t, n, e, f, h) {
                var d, v, p, m, y = h ? function() {
                    return t
                }
                : c(t), g = i(e, f, n ? 2 : 1), b = 0;
                if ("function" != typeof y)
                    throw TypeError(t + " is not iterable!");
                if (o(y)) {
                    for (d = u(t.length); d > b; b++)
                        if ((m = n ? g(s(v = t[b])[0], v[1]) : g(t[b])) === a || m === l)
                            return m
                } else
                    for (p = y.call(t); !(v = p.next()).done; )
                        if ((m = r(p, g, v.value, n)) === a || m === l)
                            return m
            }
            ).BREAK = a,
            n.RETURN = l
        }
        , function(t, n, e) {
            var i = e(3);
            t.exports = function(t, n, e, r) {
                try {
                    return r ? n(i(e)[0], e[1]) : n(e)
                } catch (n) {
                    var o = t.return;
                    throw void 0 !== o && i(o.call(t)),
                    n
                }
            }
        }
        , function(t, n, e) {
            var i = e(14)
              , r = e(2)("iterator")
              , o = Array.prototype;
            t.exports = function(t) {
                return void 0 !== t && (i.Array === t || o[r] === t)
            }
        }
        , function(t, n, e) {
            var i = e(51)
              , r = e(2)("iterator")
              , o = e(14);
            t.exports = e(1).getIteratorMethod = function(t) {
                if (null != t)
                    return t[r] || t["@@iterator"] || o[i(t)]
            }
        }
        , function(t, n) {
            t.exports = function(t, n, e) {
                var i = void 0 === e;
                switch (n.length) {
                case 0:
                    return i ? t() : t.call(e);
                case 1:
                    return i ? t(n[0]) : t.call(e, n[0]);
                case 2:
                    return i ? t(n[0], n[1]) : t.call(e, n[0], n[1]);
                case 3:
                    return i ? t(n[0], n[1], n[2]) : t.call(e, n[0], n[1], n[2]);
                case 4:
                    return i ? t(n[0], n[1], n[2], n[3]) : t.call(e, n[0], n[1], n[2], n[3])
                }
                return t.apply(e, n)
            }
        }
        , function(t, n, e) {
            var i = e(0)
              , r = e(53).set
              , o = i.MutationObserver || i.WebKitMutationObserver
              , s = i.process
              , u = i.Promise
              , c = "process" == e(16)(s);
            t.exports = function() {
                var t, n, e, a = function() {
                    var i, r;
                    for (c && (i = s.domain) && i.exit(); t; ) {
                        r = t.fn,
                        t = t.next;
                        try {
                            r()
                        } catch (i) {
                            throw t ? e() : n = void 0,
                            i
                        }
                    }
                    n = void 0,
                    i && i.enter()
                };
                if (c)
                    e = function() {
                        s.nextTick(a)
                    }
                    ;
                else if (!o || i.navigator && i.navigator.standalone)
                    if (u && u.resolve) {
                        var l = u.resolve(void 0);
                        e = function() {
                            l.then(a)
                        }
                    } else
                        e = function() {
                            r.call(i, a)
                        }
                        ;
                else {
                    var f = !0
                      , h = document.createTextNode("");
                    new o(a).observe(h, {
                        characterData: !0
                    }),
                    e = function() {
                        h.data = f = !f
                    }
                }
                return function(i) {
                    var r = {
                        fn: i,
                        next: void 0
                    };
                    n && (n.next = r),
                    t || (t = r,
                    e()),
                    n = r
                }
            }
        }
        , function(t, n, e) {
            var i = e(0).navigator;
            t.exports = i && i.userAgent || ""
        }
        , function(t, n, e) {
            var i = e(6);
            t.exports = function(t, n, e) {
                for (var r in n)
                    e && t[r] ? t[r] = n[r] : i(t, r, n[r]);
                return t
            }
        }
        , function(t, n, e) {
            var i = e(0)
              , r = e(1)
              , o = e(7)
              , s = e(4)
              , u = e(2)("species");
            t.exports = function(t) {
                var n = "function" == typeof r[t] ? r[t] : i[t];
                s && n && !n[u] && o.f(n, u, {
                    configurable: !0,
                    get: function() {
                        return this
                    }
                })
            }
        }
        , function(t, n, e) {
            var i = e(2)("iterator")
              , r = !1;
            try {
                var o = [7][i]();
                o.return = function() {
                    r = !0
                }
                ,
                Array.from(o, (function() {
                    throw 2
                }
                ))
            } catch (t) {}
            t.exports = function(t, n) {
                if (!n && !r)
                    return !1;
                var e = !1;
                try {
                    var o = [7]
                      , s = o[i]();
                    s.next = function() {
                        return {
                            done: e = !0
                        }
                    }
                    ,
                    o[i] = function() {
                        return s
                    }
                    ,
                    t(o)
                } catch (t) {}
                return e
            }
        }
        , function(t, n, e) {
            var i = e(5)
              , r = e(1)
              , o = e(0)
              , s = e(52)
              , u = e(55);
            i(i.P + i.R, "Promise", {
                finally: function(t) {
                    var n = s(this, r.Promise || o.Promise)
                      , e = "function" == typeof t;
                    return this.then(e ? function(e) {
                        return u(n, t()).then((function() {
                            return e
                        }
                        ))
                    }
                    : t, e ? function(e) {
                        return u(n, t()).then((function() {
                            throw e
                        }
                        ))
                    }
                    : t)
                }
            })
        }
        , function(t, n, e) {
            var i = e(5)
              , r = e(33)
              , o = e(54);
            i(i.S, "Promise", {
                try: function(t) {
                    var n = r.f(this)
                      , e = o(t);
                    return (e.e ? n.reject : n.resolve)(e.v),
                    n.promise
                }
            })
        }
        , function(t, n, e) {
            e(84),
            t.exports = e(1).Object.assign
        }
        , function(t, n, e) {
            var i = e(5);
            i(i.S + i.F, "Object", {
                assign: e(85)
            })
        }
        , function(t, n, e) {
            var i = e(4)
              , r = e(15)
              , o = e(35)
              , s = e(25)
              , u = e(24)
              , c = e(47)
              , a = Object.assign;
            t.exports = !a || e(10)((function() {
                var t = {}
                  , n = {}
                  , e = Symbol()
                  , i = "abcdefghijklmnopqrst";
                return t[e] = 7,
                i.split("").forEach((function(t) {
                    n[t] = t
                }
                )),
                7 != a({}, t)[e] || Object.keys(a({}, n)).join("") != i
            }
            )) ? function(t, n) {
                for (var e = u(t), a = arguments.length, l = 1, f = o.f, h = s.f; a > l; )
                    for (var d, v = c(arguments[l++]), p = f ? r(v).concat(f(v)) : r(v), m = p.length, y = 0; m > y; )
                        d = p[y++],
                        i && !h.call(v, d) || (e[d] = v[d]);
                return e
            }
            : a
        }
        , function(t, n, e) {
            t.exports = {
                default: e(87),
                __esModule: !0
            }
        }
        , function(t, n, e) {
            var i = e(1)
              , r = i.JSON || (i.JSON = {
                stringify: JSON.stringify
            });
            t.exports = function(t) {
                return r.stringify.apply(r, arguments)
            }
        }
        , function(t, n, e) {
            e(89),
            t.exports = e(1).Object.keys
        }
        , function(t, n, e) {
            var i = e(24)
              , r = e(15);
            e(90)("keys", (function() {
                return function(t) {
                    return r(i(t))
                }
            }
            ))
        }
        , function(t, n, e) {
            var i = e(5)
              , r = e(1)
              , o = e(10);
            t.exports = function(t, n) {
                var e = (r.Object || {})[t] || Object[t]
                  , s = {};
                s[t] = n(e),
                i(i.S + i.F * o((function() {
                    e(1)
                }
                )), "Object", s)
            }
        }
        , function(t, n, e) {
            t.exports = function(t) {
                function n(t, n) {
                    var e = t[0]
                      , i = t[1]
                      , r = t[2]
                      , o = t[3];
                    i = ((i += ((r = ((r += ((o = ((o += ((e = ((e += (i & r | ~i & o) + n[0] - 680876936 | 0) << 7 | e >>> 25) + i | 0) & i | ~e & r) + n[1] - 389564586 | 0) << 12 | o >>> 20) + e | 0) & e | ~o & i) + n[2] + 606105819 | 0) << 17 | r >>> 15) + o | 0) & o | ~r & e) + n[3] - 1044525330 | 0) << 22 | i >>> 10) + r | 0,
                    i = ((i += ((r = ((r += ((o = ((o += ((e = ((e += (i & r | ~i & o) + n[4] - 176418897 | 0) << 7 | e >>> 25) + i | 0) & i | ~e & r) + n[5] + 1200080426 | 0) << 12 | o >>> 20) + e | 0) & e | ~o & i) + n[6] - 1473231341 | 0) << 17 | r >>> 15) + o | 0) & o | ~r & e) + n[7] - 45705983 | 0) << 22 | i >>> 10) + r | 0,
                    i = ((i += ((r = ((r += ((o = ((o += ((e = ((e += (i & r | ~i & o) + n[8] + 1770035416 | 0) << 7 | e >>> 25) + i | 0) & i | ~e & r) + n[9] - 1958414417 | 0) << 12 | o >>> 20) + e | 0) & e | ~o & i) + n[10] - 42063 | 0) << 17 | r >>> 15) + o | 0) & o | ~r & e) + n[11] - 1990404162 | 0) << 22 | i >>> 10) + r | 0,
                    i = ((i += ((r = ((r += ((o = ((o += ((e = ((e += (i & r | ~i & o) + n[12] + 1804603682 | 0) << 7 | e >>> 25) + i | 0) & i | ~e & r) + n[13] - 40341101 | 0) << 12 | o >>> 20) + e | 0) & e | ~o & i) + n[14] - 1502002290 | 0) << 17 | r >>> 15) + o | 0) & o | ~r & e) + n[15] + 1236535329 | 0) << 22 | i >>> 10) + r | 0,
                    i = ((i += ((r = ((r += ((o = ((o += ((e = ((e += (i & o | r & ~o) + n[1] - 165796510 | 0) << 5 | e >>> 27) + i | 0) & r | i & ~r) + n[6] - 1069501632 | 0) << 9 | o >>> 23) + e | 0) & i | e & ~i) + n[11] + 643717713 | 0) << 14 | r >>> 18) + o | 0) & e | o & ~e) + n[0] - 373897302 | 0) << 20 | i >>> 12) + r | 0,
                    i = ((i += ((r = ((r += ((o = ((o += ((e = ((e += (i & o | r & ~o) + n[5] - 701558691 | 0) << 5 | e >>> 27) + i | 0) & r | i & ~r) + n[10] + 38016083 | 0) << 9 | o >>> 23) + e | 0) & i | e & ~i) + n[15] - 660478335 | 0) << 14 | r >>> 18) + o | 0) & e | o & ~e) + n[4] - 405537848 | 0) << 20 | i >>> 12) + r | 0,
                    i = ((i += ((r = ((r += ((o = ((o += ((e = ((e += (i & o | r & ~o) + n[9] + 568446438 | 0) << 5 | e >>> 27) + i | 0) & r | i & ~r) + n[14] - 1019803690 | 0) << 9 | o >>> 23) + e | 0) & i | e & ~i) + n[3] - 187363961 | 0) << 14 | r >>> 18) + o | 0) & e | o & ~e) + n[8] + 1163531501 | 0) << 20 | i >>> 12) + r | 0,
                    i = ((i += ((r = ((r += ((o = ((o += ((e = ((e += (i & o | r & ~o) + n[13] - 1444681467 | 0) << 5 | e >>> 27) + i | 0) & r | i & ~r) + n[2] - 51403784 | 0) << 9 | o >>> 23) + e | 0) & i | e & ~i) + n[7] + 1735328473 | 0) << 14 | r >>> 18) + o | 0) & e | o & ~e) + n[12] - 1926607734 | 0) << 20 | i >>> 12) + r | 0,
                    i = ((i += ((r = ((r += ((o = ((o += ((e = ((e += (i ^ r ^ o) + n[5] - 378558 | 0) << 4 | e >>> 28) + i | 0) ^ i ^ r) + n[8] - 2022574463 | 0) << 11 | o >>> 21) + e | 0) ^ e ^ i) + n[11] + 1839030562 | 0) << 16 | r >>> 16) + o | 0) ^ o ^ e) + n[14] - 35309556 | 0) << 23 | i >>> 9) + r | 0,
                    i = ((i += ((r = ((r += ((o = ((o += ((e = ((e += (i ^ r ^ o) + n[1] - 1530992060 | 0) << 4 | e >>> 28) + i | 0) ^ i ^ r) + n[4] + 1272893353 | 0) << 11 | o >>> 21) + e | 0) ^ e ^ i) + n[7] - 155497632 | 0) << 16 | r >>> 16) + o | 0) ^ o ^ e) + n[10] - 1094730640 | 0) << 23 | i >>> 9) + r | 0,
                    i = ((i += ((r = ((r += ((o = ((o += ((e = ((e += (i ^ r ^ o) + n[13] + 681279174 | 0) << 4 | e >>> 28) + i | 0) ^ i ^ r) + n[0] - 358537222 | 0) << 11 | o >>> 21) + e | 0) ^ e ^ i) + n[3] - 722521979 | 0) << 16 | r >>> 16) + o | 0) ^ o ^ e) + n[6] + 76029189 | 0) << 23 | i >>> 9) + r | 0,
                    i = ((i += ((r = ((r += ((o = ((o += ((e = ((e += (i ^ r ^ o) + n[9] - 640364487 | 0) << 4 | e >>> 28) + i | 0) ^ i ^ r) + n[12] - 421815835 | 0) << 11 | o >>> 21) + e | 0) ^ e ^ i) + n[15] + 530742520 | 0) << 16 | r >>> 16) + o | 0) ^ o ^ e) + n[2] - 995338651 | 0) << 23 | i >>> 9) + r | 0,
                    i = ((i += ((o = ((o += (i ^ ((e = ((e += (r ^ (i | ~o)) + n[0] - 198630844 | 0) << 6 | e >>> 26) + i | 0) | ~r)) + n[7] + 1126891415 | 0) << 10 | o >>> 22) + e | 0) ^ ((r = ((r += (e ^ (o | ~i)) + n[14] - 1416354905 | 0) << 15 | r >>> 17) + o | 0) | ~e)) + n[5] - 57434055 | 0) << 21 | i >>> 11) + r | 0,
                    i = ((i += ((o = ((o += (i ^ ((e = ((e += (r ^ (i | ~o)) + n[12] + 1700485571 | 0) << 6 | e >>> 26) + i | 0) | ~r)) + n[3] - 1894986606 | 0) << 10 | o >>> 22) + e | 0) ^ ((r = ((r += (e ^ (o | ~i)) + n[10] - 1051523 | 0) << 15 | r >>> 17) + o | 0) | ~e)) + n[1] - 2054922799 | 0) << 21 | i >>> 11) + r | 0,
                    i = ((i += ((o = ((o += (i ^ ((e = ((e += (r ^ (i | ~o)) + n[8] + 1873313359 | 0) << 6 | e >>> 26) + i | 0) | ~r)) + n[15] - 30611744 | 0) << 10 | o >>> 22) + e | 0) ^ ((r = ((r += (e ^ (o | ~i)) + n[6] - 1560198380 | 0) << 15 | r >>> 17) + o | 0) | ~e)) + n[13] + 1309151649 | 0) << 21 | i >>> 11) + r | 0,
                    i = ((i += ((o = ((o += (i ^ ((e = ((e += (r ^ (i | ~o)) + n[4] - 145523070 | 0) << 6 | e >>> 26) + i | 0) | ~r)) + n[11] - 1120210379 | 0) << 10 | o >>> 22) + e | 0) ^ ((r = ((r += (e ^ (o | ~i)) + n[2] + 718787259 | 0) << 15 | r >>> 17) + o | 0) | ~e)) + n[9] - 343485551 | 0) << 21 | i >>> 11) + r | 0,
                    t[0] = e + t[0] | 0,
                    t[1] = i + t[1] | 0,
                    t[2] = r + t[2] | 0,
                    t[3] = o + t[3] | 0
                }
                function e(t) {
                    var n, e = [];
                    for (n = 0; n < 64; n += 4)
                        e[n >> 2] = t.charCodeAt(n) + (t.charCodeAt(n + 1) << 8) + (t.charCodeAt(n + 2) << 16) + (t.charCodeAt(n + 3) << 24);
                    return e
                }
                function i(t) {
                    var n, e = [];
                    for (n = 0; n < 64; n += 4)
                        e[n >> 2] = t[n] + (t[n + 1] << 8) + (t[n + 2] << 16) + (t[n + 3] << 24);
                    return e
                }
                function r(t) {
                    var i, r, o, s, u, c, a = t.length, l = [1732584193, -271733879, -1732584194, 271733878];
                    for (i = 64; i <= a; i += 64)
                        n(l, e(t.substring(i - 64, i)));
                    for (r = (t = t.substring(i - 64)).length,
                    o = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    i = 0; i < r; i += 1)
                        o[i >> 2] |= t.charCodeAt(i) << (i % 4 << 3);
                    if (o[i >> 2] |= 128 << (i % 4 << 3),
                    i > 55)
                        for (n(l, o),
                        i = 0; i < 16; i += 1)
                            o[i] = 0;
                    return s = (s = 8 * a).toString(16).match(/(.*?)(.{0,8})$/),
                    u = parseInt(s[2], 16),
                    c = parseInt(s[1], 16) || 0,
                    o[14] = u,
                    o[15] = c,
                    n(l, o),
                    l
                }
                function o(t) {
                    var n, e = "";
                    for (n = 0; n < 4; n += 1)
                        e += l[t >> 8 * n + 4 & 15] + l[t >> 8 * n & 15];
                    return e
                }
                function s(t) {
                    var n;
                    for (n = 0; n < t.length; n += 1)
                        t[n] = o(t[n]);
                    return t.join("")
                }
                function u(t) {
                    return /[\u0080-\uFFFF]/.test(t) && (t = unescape(encodeURIComponent(t))),
                    t
                }
                function c(t) {
                    var n, e = [], i = t.length;
                    for (n = 0; n < i - 1; n += 2)
                        e.push(parseInt(t.substr(n, 2), 16));
                    return String.fromCharCode.apply(String, e)
                }
                function a() {
                    this.reset()
                }
                var l = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];
                return s(r("hello")),
                "undefined" == typeof ArrayBuffer || ArrayBuffer.prototype.slice || function() {
                    function n(t, n) {
                        return (t = 0 | t || 0) < 0 ? Math.max(t + n, 0) : Math.min(t, n)
                    }
                    ArrayBuffer.prototype.slice = function(e, i) {
                        var r, o, s, u, c = this.byteLength, a = n(e, c), l = c;
                        return i !== t && (l = n(i, c)),
                        a > l ? new ArrayBuffer(0) : (r = l - a,
                        o = new ArrayBuffer(r),
                        s = new Uint8Array(o),
                        u = new Uint8Array(this,a,r),
                        s.set(u),
                        o)
                    }
                }(),
                a.prototype.append = function(t) {
                    return this.appendBinary(u(t)),
                    this
                }
                ,
                a.prototype.appendBinary = function(t) {
                    this._buff += t,
                    this._length += t.length;
                    var i, r = this._buff.length;
                    for (i = 64; i <= r; i += 64)
                        n(this._hash, e(this._buff.substring(i - 64, i)));
                    return this._buff = this._buff.substring(i - 64),
                    this
                }
                ,
                a.prototype.end = function(t) {
                    var n, e, i = this._buff, r = i.length, o = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                    for (n = 0; n < r; n += 1)
                        o[n >> 2] |= i.charCodeAt(n) << (n % 4 << 3);
                    return this._finish(o, r),
                    e = s(this._hash),
                    t && (e = c(e)),
                    this.reset(),
                    e
                }
                ,
                a.prototype.reset = function() {
                    return this._buff = "",
                    this._length = 0,
                    this._hash = [1732584193, -271733879, -1732584194, 271733878],
                    this
                }
                ,
                a.prototype.getState = function() {
                    return {
                        buff: this._buff,
                        length: this._length,
                        hash: this._hash
                    }
                }
                ,
                a.prototype.setState = function(t) {
                    return this._buff = t.buff,
                    this._length = t.length,
                    this._hash = t.hash,
                    this
                }
                ,
                a.prototype.destroy = function() {
                    delete this._hash,
                    delete this._buff,
                    delete this._length
                }
                ,
                a.prototype._finish = function(t, e) {
                    var i, r, o, s = e;
                    if (t[s >> 2] |= 128 << (s % 4 << 3),
                    s > 55)
                        for (n(this._hash, t),
                        s = 0; s < 16; s += 1)
                            t[s] = 0;
                    i = (i = 8 * this._length).toString(16).match(/(.*?)(.{0,8})$/),
                    r = parseInt(i[2], 16),
                    o = parseInt(i[1], 16) || 0,
                    t[14] = r,
                    t[15] = o,
                    n(this._hash, t)
                }
                ,
                a.hash = function(t, n) {
                    return a.hashBinary(u(t), n)
                }
                ,
                a.hashBinary = function(t, n) {
                    var e = s(r(t));
                    return n ? c(e) : e
                }
                ,
                a.ArrayBuffer = function() {
                    this.reset()
                }
                ,
                a.ArrayBuffer.prototype.append = function(t) {
                    var e, r = function(t, n, e) {
                        var i = new Uint8Array(t.byteLength + n.byteLength);
                        return i.set(new Uint8Array(t)),
                        i.set(new Uint8Array(n), t.byteLength),
                        i
                    }(this._buff.buffer, t), o = r.length;
                    for (this._length += t.byteLength,
                    e = 64; e <= o; e += 64)
                        n(this._hash, i(r.subarray(e - 64, e)));
                    return this._buff = e - 64 < o ? new Uint8Array(r.buffer.slice(e - 64)) : new Uint8Array(0),
                    this
                }
                ,
                a.ArrayBuffer.prototype.end = function(t) {
                    var n, e, i = this._buff, r = i.length, o = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                    for (n = 0; n < r; n += 1)
                        o[n >> 2] |= i[n] << (n % 4 << 3);
                    return this._finish(o, r),
                    e = s(this._hash),
                    t && (e = c(e)),
                    this.reset(),
                    e
                }
                ,
                a.ArrayBuffer.prototype.reset = function() {
                    return this._buff = new Uint8Array(0),
                    this._length = 0,
                    this._hash = [1732584193, -271733879, -1732584194, 271733878],
                    this
                }
                ,
                a.ArrayBuffer.prototype.getState = function() {
                    var t = a.prototype.getState.call(this);
                    return t.buff = function(t) {
                        return String.fromCharCode.apply(null, new Uint8Array(t))
                    }(t.buff),
                    t
                }
                ,
                a.ArrayBuffer.prototype.setState = function(t) {
                    return t.buff = function(t, n) {
                        var e, i = t.length, r = new ArrayBuffer(i), o = new Uint8Array(r);
                        for (e = 0; e < i; e += 1)
                            o[e] = t.charCodeAt(e);
                        return o
                    }(t.buff),
                    a.prototype.setState.call(this, t)
                }
                ,
                a.ArrayBuffer.prototype.destroy = a.prototype.destroy,
                a.ArrayBuffer.prototype._finish = a.prototype._finish,
                a.ArrayBuffer.hash = function(t, e) {
                    var r = s(function(t) {
                        var e, r, o, s, u, c, a = t.length, l = [1732584193, -271733879, -1732584194, 271733878];
                        for (e = 64; e <= a; e += 64)
                            n(l, i(t.subarray(e - 64, e)));
                        for (r = (t = e - 64 < a ? t.subarray(e - 64) : new Uint8Array(0)).length,
                        o = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        e = 0; e < r; e += 1)
                            o[e >> 2] |= t[e] << (e % 4 << 3);
                        if (o[e >> 2] |= 128 << (e % 4 << 3),
                        e > 55)
                            for (n(l, o),
                            e = 0; e < 16; e += 1)
                                o[e] = 0;
                        return s = (s = 8 * a).toString(16).match(/(.*?)(.{0,8})$/),
                        u = parseInt(s[2], 16),
                        c = parseInt(s[1], 16) || 0,
                        o[14] = u,
                        o[15] = c,
                        n(l, o),
                        l
                    }(new Uint8Array(t)));
                    return e ? c(r) : r
                }
                ,
                a
            }()
        }
        , function(t, n, e) {
            function i(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }
            n.__esModule = !0,
            n.UploadManager = void 0;
            var r = i(e(18))
              , o = i(e(34))
              , s = i(e(17))
              , u = e(12)
              , c = e(93);
            n.UploadManager = function() {
                function t(n, e, i) {
                    var r = this;
                    (0,
                    s.default)(this, t),
                    this.config = (0,
                    o.default)({
                        useCdnDomain: !0,
                        disableStatisticsReport: !1,
                        retryCount: 3,
                        checkByMD5: !1,
                        uphost: null,
                        forceDirect: !1,
                        concurrentRequestLimit: 3,
                        region: null
                    }, n.config),
                    this.putExtra = (0,
                    o.default)({
                        fname: "",
                        params: {},
                        mimeType: null
                    }, n.putExtra),
                    this.statisticsLogger = i,
                    this.progress = null,
                    this.xhrList = [],
                    this.xhrHandler = function(t) {
                        return r.xhrList.push(t)
                    }
                    ,
                    this.aborted = !1,
                    this.file = n.file,
                    this.key = n.key,
                    this.token = n.token,
                    this.onData = function() {}
                    ,
                    this.onError = function() {}
                    ,
                    this.onComplete = function() {}
                    ,
                    this.retryCount = 0,
                    (0,
                    o.default)(this, e)
                }
                return t.prototype.putFile = function() {
                    var t = this;
                    if (this.aborted = !1,
                    this.putExtra.fname || (this.putExtra.fname = this.file.name),
                    !this.putExtra.mimeType || !this.putExtra.mimeType.length || (0,
                    u.isContainFileMimeType)(this.file.type, this.putExtra.mimeType)) {
                        var n = (0,
                        u.getUploadUrl)(this.config, this.token).then((function(n) {
                            return t.uploadUrl = n,
                            t.uploadAt = (new Date).getTime(),
                            t.config.forceDirect ? t.directUpload() : t.file.size > 4194304 ? t.resumeUpload() : t.directUpload()
                        }
                        ));
                        return n.then((function(n) {
                            t.onComplete(n.data),
                            t.config.disableStatisticsReport || t.sendLog(n.reqId, 200)
                        }
                        ), (function(n) {
                            if (t.clear(),
                            n.isRequestError && !t.config.disableStatisticsReport) {
                                var e = t.aborted ? "" : n.reqId
                                  , i = t.aborted ? -2 : n.code;
                                t.sendLog(e, i)
                            }
                            var r = n.isRequestError && 0 === n.code && !t.aborted
                              , o = ++t.retryCount <= t.config.retryCount;
                            r && o ? t.putFile() : t.onError(n)
                        }
                        )),
                        n
                    }
                    var e = new Error("file type doesn't match with what you specify");
                    this.onError(e)
                }
                ,
                t.prototype.clear = function() {
                    this.xhrList.forEach((function(t) {
                        return t.abort()
                    }
                    )),
                    this.xhrList = []
                }
                ,
                t.prototype.stop = function() {
                    this.clear(),
                    this.aborted = !0
                }
                ,
                t.prototype.sendLog = function(t, n) {
                    this.statisticsLogger.log({
                        code: n,
                        reqId: t,
                        host: (0,
                        u.getDomainFromUrl)(this.uploadUrl),
                        remoteIp: "",
                        port: (0,
                        u.getPortFromUrl)(this.uploadUrl),
                        duration: ((new Date).getTime() - this.uploadAt) / 1e3,
                        time: Math.floor(this.uploadAt / 1e3),
                        bytesSent: this.progress ? this.progress.total.loaded : 0,
                        upType: "jssdk-h5",
                        size: this.file.size
                    }, this.token)
                }
                ,
                t.prototype.directUpload = function() {
                    var t = this
                      , n = new FormData;
                    return n.append("file", this.file),
                    n.append("token", this.token),
                    null != this.key && n.append("key", this.key),
                    n.append("fname", this.putExtra.fname),
                    (0,
                    u.filterParams)(this.putExtra.params).forEach((function(t) {
                        return n.append(t[0], t[1])
                    }
                    )),
                    (0,
                    u.request)(this.uploadUrl, {
                        method: "POST",
                        body: n,
                        onProgress: function(n) {
                            t.updateDirectProgress(n.loaded, n.total)
                        },
                        onCreate: this.xhrHandler
                    }).then((function(n) {
                        return t.finishDirectProgress(),
                        n
                    }
                    ))
                }
                ,
                t.prototype.resumeUpload = function() {
                    var t = this;
                    this.loaded = {
                        mkFileProgress: 0,
                        chunks: null
                    },
                    this.ctxList = [],
                    this.localInfo = (0,
                    u.getLocalFileInfo)(this.file),
                    this.chunks = (0,
                    u.getChunks)(this.file, 4194304),
                    this.initChunksProgress();
                    var n = new c.Pool((function(n) {
                        return t.uploadChunk(n)
                    }
                    ),this.config.concurrentRequestLimit)
                      , e = this.chunks.map((function(t, e) {
                        return n.enqueue({
                            chunk: t,
                            index: e
                        })
                    }
                    ))
                      , i = r.default.all(e).then((function() {
                        return t.mkFileReq()
                    }
                    ));
                    return i.then((function(n) {
                        (0,
                        u.removeLocalFileInfo)(t.file)
                    }
                    ), (function(n) {
                        701 !== n.code || (0,
                        u.removeLocalFileInfo)(t.file)
                    }
                    )),
                    i
                }
                ,
                t.prototype.uploadChunk = function(t) {
                    var n = this
                      , e = t.index
                      , i = t.chunk
                      , o = this.localInfo[e]
                      , s = this.uploadUrl + "/mkblk/" + i.size
                      , c = o && !(0,
                    u.isChunkExpired)(o.time)
                      , a = this.config.checkByMD5
                      , l = function() {
                        return n.updateChunkProgress(i.size, e),
                        n.ctxList[e] = {
                            ctx: o.ctx,
                            size: o.size,
                            time: o.time,
                            md5: o.md5
                        },
                        r.default.resolve(null)
                    };
                    return c && !a ? l() : (0,
                    u.computeMd5)(i).then((function(t) {
                        if (c && t === o.md5)
                            return l();
                        var r = (0,
                        u.getHeadersForChunkUpload)(n.token)
                          , a = function(t) {
                            n.updateChunkProgress(t.loaded, e)
                        }
                          , f = n.xhrHandler;
                        return (0,
                        u.request)(s, {
                            method: "POST",
                            headers: r,
                            body: i,
                            onProgress: a,
                            onCreate: f
                        }).then((function(r) {
                            a({
                                loaded: i.size
                            }),
                            n.ctxList[e] = {
                                time: (new Date).getTime(),
                                ctx: r.data.ctx,
                                size: i.size,
                                md5: t
                            },
                            (0,
                            u.setLocalFileInfo)(n.file, n.ctxList)
                        }
                        ))
                    }
                    ))
                }
                ,
                t.prototype.mkFileReq = function() {
                    var t = this
                      , n = (0,
                    o.default)({
                        mimeType: "application/octet-stream"
                    }, this.putExtra)
                      , e = (0,
                    u.createMkFileUrl)(this.uploadUrl, this.file, this.key, n)
                      , i = this.ctxList.map((function(t) {
                        return t.ctx
                    }
                    )).join(",")
                      , s = (0,
                    u.getHeadersForMkFile)(this.token)
                      , c = this.xhrHandler;
                    return (0,
                    u.request)(e, {
                        method: "POST",
                        body: i,
                        headers: s,
                        onCreate: c
                    }).then((function(n) {
                        return t.updateMkFileProgress(1),
                        r.default.resolve(n)
                    }
                    ))
                }
                ,
                t.prototype.updateDirectProgress = function(t, n) {
                    this.progress = {
                        total: this.getProgressInfoItem(t, n + 1)
                    },
                    this.onData(this.progress)
                }
                ,
                t.prototype.finishDirectProgress = function() {
                    if (!this.progress)
                        return this.progress = {
                            total: this.getProgressInfoItem(this.file.size, this.file.size)
                        },
                        void this.onData(this.progress);
                    var t = this.progress.total;
                    this.progress = {
                        total: this.getProgressInfoItem(t.loaded + 1, t.size)
                    },
                    this.onData(this.progress)
                }
                ,
                t.prototype.initChunksProgress = function() {
                    this.loaded.chunks = this.chunks.map((function(t) {
                        return 0
                    }
                    )),
                    this.notifyResumeProgress()
                }
                ,
                t.prototype.updateChunkProgress = function(t, n) {
                    this.loaded.chunks[n] = t,
                    this.notifyResumeProgress()
                }
                ,
                t.prototype.updateMkFileProgress = function(t) {
                    this.loaded.mkFileProgress = t,
                    this.notifyResumeProgress()
                }
                ,
                t.prototype.notifyResumeProgress = function() {
                    var t = this;
                    this.progress = {
                        total: this.getProgressInfoItem((0,
                        u.sum)(this.loaded.chunks) + this.loaded.mkFileProgress, this.file.size + 1),
                        chunks: this.chunks.map((function(n, e) {
                            return t.getProgressInfoItem(t.loaded.chunks[e], n.size)
                        }
                        ))
                    },
                    this.onData(this.progress)
                }
                ,
                t.prototype.getProgressInfoItem = function(t, n) {
                    return {
                        loaded: t,
                        size: n,
                        percent: t / n * 100
                    }
                }
                ,
                t
            }()
        }
        , function(t, n, e) {
            function i(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }
            n.__esModule = !0,
            n.Pool = void 0;
            var r = i(e(18))
              , o = i(e(17));
            n.Pool = function() {
                function t(n, e) {
                    (0,
                    o.default)(this, t),
                    this.runTask = n,
                    this.queue = [],
                    this.processing = [],
                    this.limit = e
                }
                return t.prototype.enqueue = function(t) {
                    var n = this;
                    return new r.default((function(e, i) {
                        n.queue.push({
                            task: t,
                            resolve: e,
                            reject: i
                        }),
                        n.check()
                    }
                    ))
                }
                ,
                t.prototype.run = function(t) {
                    var n = this;
                    this.queue = this.queue.filter((function(n) {
                        return n !== t
                    }
                    )),
                    this.processing.push(t),
                    this.runTask(t.task).then((function() {
                        n.processing = n.processing.filter((function(n) {
                            return n !== t
                        }
                        )),
                        t.resolve(),
                        n.check()
                    }
                    ), (function(n) {
                        return t.reject(n)
                    }
                    ))
                }
                ,
                t.prototype.check = function() {
                    var t = this
                      , n = this.processing.length
                      , e = this.limit - n;
                    this.queue.slice(0, e).forEach((function(n, e) {
                        t.run(n)
                    }
                    ))
                }
                ,
                t
            }()
        }
        , function(t, n, e) {
            function i(t, n) {
                return t = encodeURIComponent(t),
                "/" !== n.slice(n.length - 1) && (n += "/"),
                n + t
            }
            function r(t, n, e) {
                if (!/^\d$/.test(t.mode))
                    throw "mode should be number in imageView2";
                var r = t.mode
                  , o = t.w
                  , s = t.h
                  , u = t.q
                  , c = t.format;
                if (!o && !s)
                    throw "param w and h is empty in imageView2";
                var a = "imageView2/" + encodeURIComponent(r);
                return a += o ? "/w/" + encodeURIComponent(o) : "",
                a += s ? "/h/" + encodeURIComponent(s) : "",
                a += u ? "/q/" + encodeURIComponent(u) : "",
                a += c ? "/format/" + encodeURIComponent(c) : "",
                n && (a = i(n, e) + "?" + a),
                a
            }
            function o(t, n, e) {
                var r = t["auto-orient"]
                  , o = t.thumbnail
                  , s = t.strip
                  , u = t.gravity
                  , c = t.crop
                  , a = t.quality
                  , l = t.rotate
                  , f = t.format
                  , h = t.blur
                  , d = "imageMogr2";
                return d += r ? "/auto-orient" : "",
                d += o ? "/thumbnail/" + encodeURIComponent(o) : "",
                d += s ? "/strip" : "",
                d += u ? "/gravity/" + encodeURIComponent(u) : "",
                d += a ? "/quality/" + encodeURIComponent(a) : "",
                d += c ? "/crop/" + encodeURIComponent(c) : "",
                d += l ? "/rotate/" + encodeURIComponent(l) : "",
                d += f ? "/format/" + encodeURIComponent(f) : "",
                d += h ? "/blur/" + encodeURIComponent(h) : "",
                n && (d = i(n, e) + "?" + d),
                d
            }
            function s(t, n, e) {
                var r = t.mode;
                if (!r)
                    throw "mode can't be empty in watermark";
                var o = "watermark/" + r;
                if (1 !== r && 2 !== r)
                    throw "mode is wrong";
                if (1 === r) {
                    var s = t.image;
                    if (!s)
                        throw "image can't be empty in watermark";
                    o += s ? "/image/" + (0,
                    c.urlSafeBase64Encode)(s) : ""
                }
                if (2 === r) {
                    var u = t.text
                      , a = t.font
                      , l = t.fontsize
                      , f = t.fill;
                    if (!u)
                        throw "text can't be empty in watermark";
                    o += u ? "/text/" + (0,
                    c.urlSafeBase64Encode)(u) : "",
                    o += a ? "/font/" + (0,
                    c.urlSafeBase64Encode)(a) : "",
                    o += l ? "/fontsize/" + l : "",
                    o += f ? "/fill/" + (0,
                    c.urlSafeBase64Encode)(f) : ""
                }
                var h = t.dissolve
                  , d = t.gravity
                  , v = t.dx
                  , p = t.dy;
                return o += h ? "/dissolve/" + encodeURIComponent(h) : "",
                o += d ? "/gravity/" + encodeURIComponent(d) : "",
                o += v ? "/dx/" + encodeURIComponent(v) : "",
                o += p ? "/dy/" + encodeURIComponent(p) : "",
                n && (o = i(n, e) + "?" + o),
                o
            }
            n.__esModule = !0,
            n.imageView2 = r,
            n.imageMogr2 = o,
            n.watermark = s,
            n.imageInfo = function(t, n) {
                var e = i(t, n) + "?imageInfo";
                return (0,
                u.request)(e, {
                    method: "GET"
                })
            }
            ,
            n.exif = function(t, n) {
                var e = i(t, n) + "?exif";
                return (0,
                u.request)(e, {
                    method: "GET"
                })
            }
            ,
            n.pipeline = function(t, n, e) {
                var u = void 0
                  , c = void 0
                  , a = "";
                if ("[object Array]" === Object.prototype.toString.call(t)) {
                    for (var l = 0, f = t.length; l < f; l++) {
                        if (!(u = t[l]).fop)
                            throw "fop can't be empty in pipeline";
                        switch (u.fop) {
                        case "watermark":
                            a += s(u) + "|";
                            break;
                        case "imageView2":
                            a += r(u) + "|";
                            break;
                        case "imageMogr2":
                            a += o(u) + "|";
                            break;
                        default:
                            c = !0
                        }
                        if (c)
                            throw "fop is wrong in pipeline"
                    }
                    if (n) {
                        var h = (a = i(n, e) + "?" + a).length;
                        "|" === a.slice(h - 1) && (a = a.slice(0, h - 1))
                    }
                    return a
                }
                throw "pipeline's first param should be array"
            }
            ;
            var u = e(12)
              , c = e(56)
        }
        , function(t, n, e) {
            function i(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }
            n.__esModule = !0,
            n.Observable = void 0;
            var r = i(e(96))
              , o = i(e(17));
            n.Observable = function() {
                function t(n) {
                    (0,
                    o.default)(this, t),
                    this.subscribeAction = n
                }
                return t.prototype.subscribe = function(t, n, e) {
                    var i = new s(t,n,e)
                      , r = this.subscribeAction(i);
                    return new u(i,r)
                }
                ,
                t
            }();
            var s = function() {
                function t(n, e, i) {
                    (0,
                    o.default)(this, t),
                    this.isStopped = !1,
                    "object" === (void 0 === n ? "undefined" : (0,
                    r.default)(n)) ? (this._onNext = n.next,
                    this._onError = n.error,
                    this._onCompleted = n.complete) : (this._onNext = n,
                    this._onError = e,
                    this._onCompleted = i)
                }
                return t.prototype.next = function(t) {
                    !this.isStopped && this._onNext && this._onNext(t)
                }
                ,
                t.prototype.error = function(t) {
                    !this.isStopped && this._onError && (this.isStopped = !0,
                    this._onError(t))
                }
                ,
                t.prototype.complete = function(t) {
                    !this.isStopped && this._onCompleted && (this.isStopped = !0,
                    this._onCompleted(t))
                }
                ,
                t
            }()
              , u = function() {
                function t(n, e) {
                    (0,
                    o.default)(this, t),
                    this.observer = n,
                    this.result = e
                }
                return t.prototype.unsubscribe = function() {
                    this.observer.isStopped = !0,
                    this.result()
                }
                ,
                t
            }()
        }
        , function(t, n, e) {
            function i(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }
            n.__esModule = !0;
            var r = i(e(97))
              , o = i(e(99))
              , s = "function" == typeof o.default && "symbol" == typeof r.default ? function(t) {
                return typeof t
            }
            : function(t) {
                return t && "function" == typeof o.default && t.constructor === o.default && t !== o.default.prototype ? "symbol" : typeof t
            }
            ;
            n.default = "function" == typeof o.default && "symbol" === s(r.default) ? function(t) {
                return void 0 === t ? "undefined" : s(t)
            }
            : function(t) {
                return t && "function" == typeof o.default && t.constructor === o.default && t !== o.default.prototype ? "symbol" : void 0 === t ? "undefined" : s(t)
            }
        }
        , function(t, n, e) {
            t.exports = {
                default: e(98),
                __esModule: !0
            }
        }
        , function(t, n, e) {
            e(41),
            e(50),
            t.exports = e(37).f("iterator")
        }
        , function(t, n, e) {
            t.exports = {
                default: e(100),
                __esModule: !0
            }
        }
        , function(t, n, e) {
            e(101),
            e(40),
            e(107),
            e(108),
            t.exports = e(1).Symbol
        }
        , function(t, n, e) {
            var i = e(0)
              , r = e(9)
              , o = e(4)
              , s = e(5)
              , u = e(44)
              , c = e(102).KEY
              , a = e(10)
              , l = e(31)
              , f = e(23)
              , h = e(22)
              , d = e(2)
              , v = e(37)
              , p = e(38)
              , m = e(103)
              , y = e(104)
              , g = e(3)
              , b = e(8)
              , w = e(24)
              , x = e(11)
              , k = e(29)
              , S = e(21)
              , E = e(45)
              , T = e(105)
              , O = e(106)
              , C = e(35)
              , A = e(7)
              , X = e(15)
              , I = O.f
              , _ = A.f
              , M = T.f
              , R = i.Symbol
              , D = i.JSON
              , j = D && D.stringify
              , B = d("_hidden")
              , P = d("toPrimitive")
              , q = {}.propertyIsEnumerable
              , $ = l("symbol-registry")
              , F = l("symbols")
              , N = l("op-symbols")
              , z = Object.prototype
              , L = "function" == typeof R && !!C.f
              , G = i.QObject
              , U = !G || !G.prototype || !G.prototype.findChild
              , H = o && a((function() {
                return 7 != E(_({}, "a", {
                    get: function() {
                        return _(this, "a", {
                            value: 7
                        }).a
                    }
                })).a
            }
            )) ? function(t, n, e) {
                var i = I(z, n);
                i && delete z[n],
                _(t, n, e),
                i && t !== z && _(z, n, i)
            }
            : _
              , V = function(t) {
                var n = F[t] = E(R.prototype);
                return n._k = t,
                n
            }
              , W = L && "symbol" == typeof R.iterator ? function(t) {
                return "symbol" == typeof t
            }
            : function(t) {
                return t instanceof R
            }
              , J = function(t, n, e) {
                return t === z && J(N, n, e),
                g(t),
                n = k(n, !0),
                g(e),
                r(F, n) ? (e.enumerable ? (r(t, B) && t[B][n] && (t[B][n] = !1),
                e = E(e, {
                    enumerable: S(0, !1)
                })) : (r(t, B) || _(t, B, S(1, {})),
                t[B][n] = !0),
                H(t, n, e)) : _(t, n, e)
            }
              , K = function(t, n) {
                g(t);
                for (var e, i = m(n = x(n)), r = 0, o = i.length; o > r; )
                    J(t, e = i[r++], n[e]);
                return t
            }
              , Y = function(t) {
                var n = q.call(this, t = k(t, !0));
                return !(this === z && r(F, t) && !r(N, t)) && (!(n || !r(this, t) || !r(F, t) || r(this, B) && this[B][t]) || n)
            }
              , Q = function(t, n) {
                if (t = x(t),
                n = k(n, !0),
                t !== z || !r(F, n) || r(N, n)) {
                    var e = I(t, n);
                    return !e || !r(F, n) || r(t, B) && t[B][n] || (e.enumerable = !0),
                    e
                }
            }
              , Z = function(t) {
                for (var n, e = M(x(t)), i = [], o = 0; e.length > o; )
                    r(F, n = e[o++]) || n == B || n == c || i.push(n);
                return i
            }
              , tt = function(t) {
                for (var n, e = t === z, i = M(e ? N : x(t)), o = [], s = 0; i.length > s; )
                    !r(F, n = i[s++]) || e && !r(z, n) || o.push(F[n]);
                return o
            };
            L || (u((R = function() {
                if (this instanceof R)
                    throw TypeError("Symbol is not a constructor!");
                var t = h(arguments.length > 0 ? arguments[0] : void 0)
                  , n = function(e) {
                    this === z && n.call(N, e),
                    r(this, B) && r(this[B], t) && (this[B][t] = !1),
                    H(this, t, S(1, e))
                };
                return o && U && H(z, t, {
                    configurable: !0,
                    set: n
                }),
                V(t)
            }
            ).prototype, "toString", (function() {
                return this._k
            }
            )),
            O.f = Q,
            A.f = J,
            e(57).f = T.f = Z,
            e(25).f = Y,
            C.f = tt,
            o && !e(13) && u(z, "propertyIsEnumerable", Y, !0),
            v.f = function(t) {
                return V(d(t))
            }
            ),
            s(s.G + s.W + s.F * !L, {
                Symbol: R
            });
            for (var nt = "hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(","), et = 0; nt.length > et; )
                d(nt[et++]);
            for (var it = X(d.store), rt = 0; it.length > rt; )
                p(it[rt++]);
            s(s.S + s.F * !L, "Symbol", {
                for: function(t) {
                    return r($, t += "") ? $[t] : $[t] = R(t)
                },
                keyFor: function(t) {
                    if (!W(t))
                        throw TypeError(t + " is not a symbol!");
                    for (var n in $)
                        if ($[n] === t)
                            return n
                },
                useSetter: function() {
                    U = !0
                },
                useSimple: function() {
                    U = !1
                }
            }),
            s(s.S + s.F * !L, "Object", {
                create: function(t, n) {
                    return void 0 === n ? E(t) : K(E(t), n)
                },
                defineProperty: J,
                defineProperties: K,
                getOwnPropertyDescriptor: Q,
                getOwnPropertyNames: Z,
                getOwnPropertySymbols: tt
            });
            var ot = a((function() {
                C.f(1)
            }
            ));
            s(s.S + s.F * ot, "Object", {
                getOwnPropertySymbols: function(t) {
                    return C.f(w(t))
                }
            }),
            D && s(s.S + s.F * (!L || a((function() {
                var t = R();
                return "[null]" != j([t]) || "{}" != j({
                    a: t
                }) || "{}" != j(Object(t))
            }
            ))), "JSON", {
                stringify: function(t) {
                    for (var n, e, i = [t], r = 1; arguments.length > r; )
                        i.push(arguments[r++]);
                    if (e = n = i[1],
                    (b(n) || void 0 !== t) && !W(t))
                        return y(n) || (n = function(t, n) {
                            if ("function" == typeof e && (n = e.call(this, t, n)),
                            !W(n))
                                return n
                        }
                        ),
                        i[1] = n,
                        j.apply(D, i)
                }
            }),
            R.prototype[P] || e(6)(R.prototype, P, R.prototype.valueOf),
            f(R, "Symbol"),
            f(Math, "Math", !0),
            f(i.JSON, "JSON", !0)
        }
        , function(t, n, e) {
            var i = e(22)("meta")
              , r = e(8)
              , o = e(9)
              , s = e(7).f
              , u = 0
              , c = Object.isExtensible || function() {
                return !0
            }
              , a = !e(10)((function() {
                return c(Object.preventExtensions({}))
            }
            ))
              , l = function(t) {
                s(t, i, {
                    value: {
                        i: "O" + ++u,
                        w: {}
                    }
                })
            }
              , f = t.exports = {
                KEY: i,
                NEED: !1,
                fastKey: function(t, n) {
                    if (!r(t))
                        return "symbol" == typeof t ? t : ("string" == typeof t ? "S" : "P") + t;
                    if (!o(t, i)) {
                        if (!c(t))
                            return "F";
                        if (!n)
                            return "E";
                        l(t)
                    }
                    return t[i].i
                },
                getWeak: function(t, n) {
                    if (!o(t, i)) {
                        if (!c(t))
                            return !0;
                        if (!n)
                            return !1;
                        l(t)
                    }
                    return t[i].w
                },
                onFreeze: function(t) {
                    return a && f.NEED && c(t) && !o(t, i) && l(t),
                    t
                }
            }
        }
        , function(t, n, e) {
            var i = e(15)
              , r = e(35)
              , o = e(25);
            t.exports = function(t) {
                var n = i(t)
                  , e = r.f;
                if (e)
                    for (var s, u = e(t), c = o.f, a = 0; u.length > a; )
                        c.call(t, s = u[a++]) && n.push(s);
                return n
            }
        }
        , function(t, n, e) {
            var i = e(16);
            t.exports = Array.isArray || function(t) {
                return "Array" == i(t)
            }
        }
        , function(t, n, e) {
            var i = e(11)
              , r = e(57).f
              , o = {}.toString
              , s = "object" == typeof window && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [];
            t.exports.f = function(t) {
                return s && "[object Window]" == o.call(t) ? function(t) {
                    try {
                        return r(t)
                    } catch (t) {
                        return s.slice()
                    }
                }(t) : r(i(t))
            }
        }
        , function(t, n, e) {
            var i = e(25)
              , r = e(21)
              , o = e(11)
              , s = e(29)
              , u = e(9)
              , c = e(43)
              , a = Object.getOwnPropertyDescriptor;
            n.f = e(4) ? a : function(t, n) {
                if (t = o(t),
                n = s(n, !0),
                c)
                    try {
                        return a(t, n)
                    } catch (t) {}
                if (u(t, n))
                    return r(!i.f.call(t, n), t[n])
            }
        }
        , function(t, n, e) {
            e(38)("asyncIterator")
        }
        , function(t, n, e) {
            e(38)("observable")
        }
        , function(t, n, e) {
            function i(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }
            n.__esModule = !0,
            n.StatisticsLogger = void 0;
            var r = i(e(36))
              , o = i(e(17))
              , s = e(12);
            n.StatisticsLogger = function() {
                function t() {
                    (0,
                    o.default)(this, t)
                }
                return t.prototype.log = function(t, n) {
                    var e = "";
                    (0,
                    r.default)(t).forEach((function(n) {
                        return e += t[n] + ","
                    }
                    )),
                    this.send(e, n, 0)
                }
                ,
                t.prototype.send = function(t, n, e) {
                    var i = (0,
                    s.createXHR)()
                      , r = this;
                    i.open("POST", "https://uplog.qbox.me/log/3"),
                    i.setRequestHeader("Content-type", "application/x-www-form-urlencoded"),
                    i.setRequestHeader("Authorization", "UpToken " + n),
                    i.onreadystatechange = function() {
                        4 === i.readyState && 200 !== i.status && ++e <= 3 && r.send(t, n, e)
                    }
                    ,
                    i.send(t)
                }
                ,
                t
            }()
        }
        , function(t, n, e) {
            function i(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }
            n.__esModule = !0;
            var r = i(e(18))
              , o = i(e(34))
              , s = i(e(17))
              , u = i(e(36))
              , c = e(111)
              , a = e(12)
              , l = {
                PNG: "image/png",
                JPEG: "image/jpeg",
                WEBP: "image/webp",
                BMP: "image/bmp"
            }
              , f = Math.log(2)
              , h = (0,
            u.default)(l).map((function(t) {
                return l[t]
            }
            ))
              , d = l.JPEG
              , v = function() {
                function t(n, e) {
                    (0,
                    s.default)(this, t),
                    this.config = (0,
                    o.default)({
                        quality: .92,
                        noCompressIfLarger: !1
                    }, e),
                    this.file = n
                }
                return t.prototype.process = function() {
                    var t = this;
                    this.outputType = this.file.type;
                    var n = {};
                    return function(t) {
                        return h.includes(t)
                    }(this.file.type) ? this.getOriginImage().then((function(n) {
                        return t.getCanvas(n)
                    }
                    )).then((function(e) {
                        var i = 1;
                        return t.config.maxWidth && (i = Math.min(1, t.config.maxWidth / e.width)),
                        t.config.maxHeight && (i = Math.min(1, i, t.config.maxHeight / e.height)),
                        n.width = e.width,
                        n.height = e.height,
                        t.doScale(e, i)
                    }
                    )).then((function(e) {
                        var i = t.toBlob(e);
                        return i.size > t.file.size && t.config.noCompressIfLarger ? {
                            dist: t.file,
                            width: n.width,
                            height: n.height
                        } : {
                            dist: i,
                            width: e.width,
                            height: e.height
                        }
                    }
                    )) : r.default.reject(new Error("unsupported file type: " + this.file.type))
                }
                ,
                t.prototype.clear = function(t, n, e) {
                    this.outputType === d ? (t.fillStyle = "#fff",
                    t.fillRect(0, 0, n, e)) : t.clearRect(0, 0, n, e)
                }
                ,
                t.prototype.getOriginImage = function() {
                    var t = this;
                    return new r.default((function(n, e) {
                        var i = (0,
                        a.createObjectURL)(t.file)
                          , r = new Image;
                        r.onload = function() {
                            n(r)
                        }
                        ,
                        r.onerror = function() {
                            e("image load error")
                        }
                        ,
                        r.src = i
                    }
                    ))
                }
                ,
                t.prototype.getCanvas = function(t) {
                    var n = this;
                    return new r.default((function(e, i) {
                        c.EXIF.getData(t, (function() {
                            var i = c.EXIF.getTag(t, "Orientation") || 1
                              , r = (0,
                            a.getTransform)(t, i)
                              , o = r.width
                              , s = r.height
                              , u = r.matrix
                              , l = document.createElement("canvas")
                              , f = l.getContext("2d");
                            l.width = o,
                            l.height = s,
                            n.clear(f, o, s),
                            f.transform.apply(f, u),
                            f.drawImage(t, 0, 0),
                            e(l)
                        }
                        ))
                    }
                    ))
                }
                ,
                t.prototype.doScale = function(t, n) {
                    if (1 === n)
                        return r.default.resolve(t);
                    var e = t.getContext("2d")
                      , i = Math.min(4, Math.ceil(1 / n / f))
                      , o = Math.pow(n, 1 / i)
                      , s = document.createElement("canvas")
                      , u = s.getContext("2d")
                      , c = t.width
                      , a = t.height
                      , l = c
                      , h = a;
                    s.width = c,
                    s.height = a;
                    for (var d = void 0, v = void 0, p = 0; p < i; p++) {
                        var m = c * o | 0
                          , y = a * o | 0;
                        p === i - 1 && (m = l * n,
                        y = h * n),
                        p % 2 == 0 ? (d = t,
                        v = u) : (d = s,
                        v = e),
                        this.clear(v, c, a),
                        v.drawImage(d, 0, 0, c, a, 0, 0, m, y),
                        c = m,
                        a = y
                    }
                    var g = d === t ? s : t
                      , b = v.getImageData(0, 0, c, a);
                    return g.width = c,
                    g.height = a,
                    v.putImageData(b, 0, 0),
                    r.default.resolve(g)
                }
                ,
                t.prototype.toBlob = function(t) {
                    var n = t.toDataURL(this.outputType, this.config.quality)
                      , e = atob(n.split(",")[1]).split("").map((function(t) {
                        return t.charCodeAt(0)
                    }
                    ));
                    return new Blob([new Uint8Array(e)],{
                        type: this.outputType
                    })
                }
                ,
                t
            }();
            n.default = function(t, n) {
                return new v(t,n).process()
            }
        }
        , function(t, e, i) {
            var r;
            (function() {
                function i(t) {
                    return !!t.exifdata
                }
                function o(t, n) {
                    function e(e) {
                        var i = s(e);
                        t.exifdata = i || {};
                        var r = function(t) {
                            var n = new DataView(t);
                            if (255 != n.getUint8(0) || 216 != n.getUint8(1))
                                return !1;
                            for (var e = 2, i = t.byteLength; e < i; ) {
                                if (function(t, n) {
                                    return 56 === t.getUint8(n) && 66 === t.getUint8(n + 1) && 73 === t.getUint8(n + 2) && 77 === t.getUint8(n + 3) && 4 === t.getUint8(n + 4) && 4 === t.getUint8(n + 5)
                                }(n, e)) {
                                    var r = n.getUint8(e + 7);
                                    return r % 2 != 0 && (r += 1),
                                    0 === r && (r = 4),
                                    u(t, e + 8 + r, n.getUint16(e + 6 + r))
                                }
                                e++
                            }
                        }(e);
                        if (t.iptcdata = r || {},
                        p.isXmpEnabled) {
                            var o = function(t) {
                                if ("DOMParser"in self) {
                                    var n = new DataView(t);
                                    if (255 != n.getUint8(0) || 216 != n.getUint8(1))
                                        return !1;
                                    for (var e = 2, i = t.byteLength, r = new DOMParser; e < i - 4; ) {
                                        if ("http" == l(n, e, 4)) {
                                            var o = e - 1
                                              , s = n.getUint16(e - 2) - 1
                                              , u = l(n, o, s)
                                              , c = u.indexOf("xmpmeta>") + 8
                                              , a = (u = u.substring(u.indexOf("<x:xmpmeta"), c)).indexOf("x:xmpmeta") + 10;
                                            return u = u.slice(0, a) + 'xmlns:Iptc4xmpCore="http://iptc.org/std/Iptc4xmpCore/1.0/xmlns/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:tiff="http://ns.adobe.com/tiff/1.0/" xmlns:plus="http://schemas.android.com/apk/lib/com.google.android.gms.plus" xmlns:ext="http://www.gettyimages.com/xsltExtension/1.0" xmlns:exif="http://ns.adobe.com/exif/1.0/" xmlns:stEvt="http://ns.adobe.com/xap/1.0/sType/ResourceEvent#" xmlns:stRef="http://ns.adobe.com/xap/1.0/sType/ResourceRef#" xmlns:crs="http://ns.adobe.com/camera-raw-settings/1.0/" xmlns:xapGImg="http://ns.adobe.com/xap/1.0/g/img/" xmlns:Iptc4xmpExt="http://iptc.org/std/Iptc4xmpExt/2008-02-29/" ' + u.slice(a),
                                            d(r.parseFromString(u, "text/xml"))
                                        }
                                        e++
                                    }
                                }
                            }(e);
                            t.xmpdata = o || {}
                        }
                        n && n.call(t)
                    }
                    if (t.src)
                        if (/^data\:/i.test(t.src))
                            e(function(t, n) {
                                n = n || t.match(/^data\:([^\;]+)\;base64,/im)[1] || "",
                                t = t.replace(/^data\:([^\;]+)\;base64,/gim, "");
                                for (var e = atob(t), i = e.length, r = new ArrayBuffer(i), o = new Uint8Array(r), s = 0; s < i; s++)
                                    o[s] = e.charCodeAt(s);
                                return r
                            }(t.src));
                        else if (/^blob\:/i.test(t.src))
                            (r = new FileReader).onload = function(t) {
                                e(t.target.result)
                            }
                            ,
                            function(t, n) {
                                var e = new XMLHttpRequest;
                                e.open("GET", t, !0),
                                e.responseType = "blob",
                                e.onload = function(t) {
                                    200 != this.status && 0 !== this.status || n(this.response)
                                }
                                ,
                                e.send()
                            }(t.src, (function(t) {
                                r.readAsArrayBuffer(t)
                            }
                            ));
                        else {
                            var i = new XMLHttpRequest;
                            i.onload = function() {
                                if (200 != this.status && 0 !== this.status)
                                    throw "Could not load image";
                                e(i.response),
                                i = null
                            }
                            ,
                            i.open("GET", t.src, !0),
                            i.responseType = "arraybuffer",
                            i.send(null)
                        }
                    else if (self.FileReader && (t instanceof self.Blob || t instanceof self.File)) {
                        var r;
                        (r = new FileReader).onload = function(t) {
                            e(t.target.result)
                        }
                        ,
                        r.readAsArrayBuffer(t)
                    }
                }
                function s(t) {
                    var n = new DataView(t);
                    if (255 != n.getUint8(0) || 216 != n.getUint8(1))
                        return !1;
                    for (var e = 2, i = t.byteLength; e < i; ) {
                        if (255 != n.getUint8(e))
                            return !1;
                        if (225 == n.getUint8(e + 1))
                            return f(n, e + 4, n.getUint16(e + 2));
                        e += 2 + n.getUint16(e + 2)
                    }
                }
                function u(t, n, e) {
                    for (var i, r, o, s, u = new DataView(t), c = {}, a = n; a < n + e; )
                        28 === u.getUint8(a) && 2 === u.getUint8(a + 1) && (s = u.getUint8(a + 2))in x && (o = u.getInt16(a + 3),
                        r = x[s],
                        i = l(u, a + 5, o),
                        c.hasOwnProperty(r) ? c[r]instanceof Array ? c[r].push(i) : c[r] = [c[r], i] : c[r] = i),
                        a++;
                    return c
                }
                function c(t, n, e, i, r) {
                    var o, s, u, c = t.getUint16(e, !r), l = {};
                    for (u = 0; u < c; u++)
                        o = e + 12 * u + 2,
                        !(s = i[t.getUint16(o, !r)]) && v && console.log("Unknown tag: " + t.getUint16(o, !r)),
                        l[s] = a(t, o, n, e, r);
                    return l
                }
                function a(t, n, e, i, r) {
                    var o, s, u, c, a, f, h = t.getUint16(n + 2, !r), d = t.getUint32(n + 4, !r), v = t.getUint32(n + 8, !r) + e;
                    switch (h) {
                    case 1:
                    case 7:
                        if (1 == d)
                            return t.getUint8(n + 8, !r);
                        for (o = d > 4 ? v : n + 8,
                        s = [],
                        c = 0; c < d; c++)
                            s[c] = t.getUint8(o + c);
                        return s;
                    case 2:
                        return l(t, o = d > 4 ? v : n + 8, d - 1);
                    case 3:
                        if (1 == d)
                            return t.getUint16(n + 8, !r);
                        for (o = d > 2 ? v : n + 8,
                        s = [],
                        c = 0; c < d; c++)
                            s[c] = t.getUint16(o + 2 * c, !r);
                        return s;
                    case 4:
                        if (1 == d)
                            return t.getUint32(n + 8, !r);
                        for (s = [],
                        c = 0; c < d; c++)
                            s[c] = t.getUint32(v + 4 * c, !r);
                        return s;
                    case 5:
                        if (1 == d)
                            return a = t.getUint32(v, !r),
                            f = t.getUint32(v + 4, !r),
                            (u = new Number(a / f)).numerator = a,
                            u.denominator = f,
                            u;
                        for (s = [],
                        c = 0; c < d; c++)
                            a = t.getUint32(v + 8 * c, !r),
                            f = t.getUint32(v + 4 + 8 * c, !r),
                            s[c] = new Number(a / f),
                            s[c].numerator = a,
                            s[c].denominator = f;
                        return s;
                    case 9:
                        if (1 == d)
                            return t.getInt32(n + 8, !r);
                        for (s = [],
                        c = 0; c < d; c++)
                            s[c] = t.getInt32(v + 4 * c, !r);
                        return s;
                    case 10:
                        if (1 == d)
                            return t.getInt32(v, !r) / t.getInt32(v + 4, !r);
                        for (s = [],
                        c = 0; c < d; c++)
                            s[c] = t.getInt32(v + 8 * c, !r) / t.getInt32(v + 4 + 8 * c, !r);
                        return s
                    }
                }
                function l(t, e, i) {
                    var r = "";
                    for (n = e; n < e + i; n++)
                        r += String.fromCharCode(t.getUint8(n));
                    return r
                }
                function f(t, n) {
                    if ("Exif" != l(t, n, 4))
                        return !1;
                    var e, i, r, o, s, u = n + 6;
                    if (18761 == t.getUint16(u))
                        e = !1;
                    else {
                        if (19789 != t.getUint16(u))
                            return !1;
                        e = !0
                    }
                    if (42 != t.getUint16(u + 2, !e))
                        return !1;
                    var a = t.getUint32(u + 4, !e);
                    if (a < 8)
                        return !1;
                    if ((i = c(t, u, u + a, y, e)).ExifIFDPointer)
                        for (r in o = c(t, u, u + i.ExifIFDPointer, m, e)) {
                            switch (r) {
                            case "LightSource":
                            case "Flash":
                            case "MeteringMode":
                            case "ExposureProgram":
                            case "SensingMethod":
                            case "SceneCaptureType":
                            case "SceneType":
                            case "CustomRendered":
                            case "WhiteBalance":
                            case "GainControl":
                            case "Contrast":
                            case "Saturation":
                            case "Sharpness":
                            case "SubjectDistanceRange":
                            case "FileSource":
                                o[r] = w[r][o[r]];
                                break;
                            case "ExifVersion":
                            case "FlashpixVersion":
                                o[r] = String.fromCharCode(o[r][0], o[r][1], o[r][2], o[r][3]);
                                break;
                            case "ComponentsConfiguration":
                                o[r] = w.Components[o[r][0]] + w.Components[o[r][1]] + w.Components[o[r][2]] + w.Components[o[r][3]]
                            }
                            i[r] = o[r]
                        }
                    if (i.GPSInfoIFDPointer)
                        for (r in s = c(t, u, u + i.GPSInfoIFDPointer, g, e)) {
                            switch (r) {
                            case "GPSVersionID":
                                s[r] = s[r][0] + "." + s[r][1] + "." + s[r][2] + "." + s[r][3]
                            }
                            i[r] = s[r]
                        }
                    return i.thumbnail = function(t, n, e, i) {
                        var r = function(t, n, e) {
                            var i = t.getUint16(n, !e);
                            return t.getUint32(n + 2 + 12 * i, !e)
                        }(t, n + e, i);
                        if (!r)
                            return {};
                        if (r > t.byteLength)
                            return {};
                        var o = c(t, n, n + r, b, i);
                        if (o.Compression)
                            switch (o.Compression) {
                            case 6:
                                if (o.JpegIFOffset && o.JpegIFByteCount) {
                                    var s = n + o.JpegIFOffset
                                      , u = o.JpegIFByteCount;
                                    o.blob = new Blob([new Uint8Array(t.buffer,s,u)],{
                                        type: "image/jpeg"
                                    })
                                }
                                break;
                            case 1:
                                console.log("Thumbnail image format is TIFF, which is not implemented.");
                                break;
                            default:
                                console.log("Unknown thumbnail image format '%s'", o.Compression)
                            }
                        else
                            2 == o.PhotometricInterpretation && console.log("Thumbnail image format is RGB, which is not implemented.");
                        return o
                    }(t, u, a, e),
                    i
                }
                function h(t) {
                    var n = {};
                    if (1 == t.nodeType) {
                        if (t.attributes.length > 0) {
                            n["@attributes"] = {};
                            for (var e = 0; e < t.attributes.length; e++) {
                                var i = t.attributes.item(e);
                                n["@attributes"][i.nodeName] = i.nodeValue
                            }
                        }
                    } else if (3 == t.nodeType)
                        return t.nodeValue;
                    if (t.hasChildNodes())
                        for (var r = 0; r < t.childNodes.length; r++) {
                            var o = t.childNodes.item(r)
                              , s = o.nodeName;
                            if (null == n[s])
                                n[s] = h(o);
                            else {
                                if (null == n[s].push) {
                                    var u = n[s];
                                    n[s] = [],
                                    n[s].push(u)
                                }
                                n[s].push(h(o))
                            }
                        }
                    return n
                }
                function d(t) {
                    try {
                        var n = {};
                        if (t.children.length > 0)
                            for (var e = 0; e < t.children.length; e++) {
                                var i = t.children.item(e)
                                  , r = i.attributes;
                                for (var o in r) {
                                    var s = r[o]
                                      , u = s.nodeName
                                      , c = s.nodeValue;
                                    void 0 !== u && (n[u] = c)
                                }
                                var a = i.nodeName;
                                if (void 0 === n[a])
                                    n[a] = h(i);
                                else {
                                    if (void 0 === n[a].push) {
                                        var l = n[a];
                                        n[a] = [],
                                        n[a].push(l)
                                    }
                                    n[a].push(h(i))
                                }
                            }
                        else
                            n = t.textContent;
                        return n
                    } catch (t) {
                        console.log(t.message)
                    }
                }
                var v = !1
                  , p = function(t) {
                    return t instanceof p ? t : this instanceof p ? void (this.EXIFwrapped = t) : new p(t)
                };
                void 0 !== t && t.exports && (e = t.exports = p),
                e.EXIF = p;
                var m = p.Tags = {
                    36864: "ExifVersion",
                    40960: "FlashpixVersion",
                    40961: "ColorSpace",
                    40962: "PixelXDimension",
                    40963: "PixelYDimension",
                    37121: "ComponentsConfiguration",
                    37122: "CompressedBitsPerPixel",
                    37500: "MakerNote",
                    37510: "UserComment",
                    40964: "RelatedSoundFile",
                    36867: "DateTimeOriginal",
                    36868: "DateTimeDigitized",
                    37520: "SubsecTime",
                    37521: "SubsecTimeOriginal",
                    37522: "SubsecTimeDigitized",
                    33434: "ExposureTime",
                    33437: "FNumber",
                    34850: "ExposureProgram",
                    34852: "SpectralSensitivity",
                    34855: "ISOSpeedRatings",
                    34856: "OECF",
                    37377: "ShutterSpeedValue",
                    37378: "ApertureValue",
                    37379: "BrightnessValue",
                    37380: "ExposureBias",
                    37381: "MaxApertureValue",
                    37382: "SubjectDistance",
                    37383: "MeteringMode",
                    37384: "LightSource",
                    37385: "Flash",
                    37396: "SubjectArea",
                    37386: "FocalLength",
                    41483: "FlashEnergy",
                    41484: "SpatialFrequencyResponse",
                    41486: "FocalPlaneXResolution",
                    41487: "FocalPlaneYResolution",
                    41488: "FocalPlaneResolutionUnit",
                    41492: "SubjectLocation",
                    41493: "ExposureIndex",
                    41495: "SensingMethod",
                    41728: "FileSource",
                    41729: "SceneType",
                    41730: "CFAPattern",
                    41985: "CustomRendered",
                    41986: "ExposureMode",
                    41987: "WhiteBalance",
                    41988: "DigitalZoomRation",
                    41989: "FocalLengthIn35mmFilm",
                    41990: "SceneCaptureType",
                    41991: "GainControl",
                    41992: "Contrast",
                    41993: "Saturation",
                    41994: "Sharpness",
                    41995: "DeviceSettingDescription",
                    41996: "SubjectDistanceRange",
                    40965: "InteroperabilityIFDPointer",
                    42016: "ImageUniqueID"
                }
                  , y = p.TiffTags = {
                    256: "ImageWidth",
                    257: "ImageHeight",
                    34665: "ExifIFDPointer",
                    34853: "GPSInfoIFDPointer",
                    40965: "InteroperabilityIFDPointer",
                    258: "BitsPerSample",
                    259: "Compression",
                    262: "PhotometricInterpretation",
                    274: "Orientation",
                    277: "SamplesPerPixel",
                    284: "PlanarConfiguration",
                    530: "YCbCrSubSampling",
                    531: "YCbCrPositioning",
                    282: "XResolution",
                    283: "YResolution",
                    296: "ResolutionUnit",
                    273: "StripOffsets",
                    278: "RowsPerStrip",
                    279: "StripByteCounts",
                    513: "JPEGInterchangeFormat",
                    514: "JPEGInterchangeFormatLength",
                    301: "TransferFunction",
                    318: "WhitePoint",
                    319: "PrimaryChromaticities",
                    529: "YCbCrCoefficients",
                    532: "ReferenceBlackWhite",
                    306: "DateTime",
                    270: "ImageDescription",
                    271: "Make",
                    272: "Model",
                    305: "Software",
                    315: "Artist",
                    33432: "Copyright"
                }
                  , g = p.GPSTags = {
                    0: "GPSVersionID",
                    1: "GPSLatitudeRef",
                    2: "GPSLatitude",
                    3: "GPSLongitudeRef",
                    4: "GPSLongitude",
                    5: "GPSAltitudeRef",
                    6: "GPSAltitude",
                    7: "GPSTimeStamp",
                    8: "GPSSatellites",
                    9: "GPSStatus",
                    10: "GPSMeasureMode",
                    11: "GPSDOP",
                    12: "GPSSpeedRef",
                    13: "GPSSpeed",
                    14: "GPSTrackRef",
                    15: "GPSTrack",
                    16: "GPSImgDirectionRef",
                    17: "GPSImgDirection",
                    18: "GPSMapDatum",
                    19: "GPSDestLatitudeRef",
                    20: "GPSDestLatitude",
                    21: "GPSDestLongitudeRef",
                    22: "GPSDestLongitude",
                    23: "GPSDestBearingRef",
                    24: "GPSDestBearing",
                    25: "GPSDestDistanceRef",
                    26: "GPSDestDistance",
                    27: "GPSProcessingMethod",
                    28: "GPSAreaInformation",
                    29: "GPSDateStamp",
                    30: "GPSDifferential"
                }
                  , b = p.IFD1Tags = {
                    256: "ImageWidth",
                    257: "ImageHeight",
                    258: "BitsPerSample",
                    259: "Compression",
                    262: "PhotometricInterpretation",
                    273: "StripOffsets",
                    274: "Orientation",
                    277: "SamplesPerPixel",
                    278: "RowsPerStrip",
                    279: "StripByteCounts",
                    282: "XResolution",
                    283: "YResolution",
                    284: "PlanarConfiguration",
                    296: "ResolutionUnit",
                    513: "JpegIFOffset",
                    514: "JpegIFByteCount",
                    529: "YCbCrCoefficients",
                    530: "YCbCrSubSampling",
                    531: "YCbCrPositioning",
                    532: "ReferenceBlackWhite"
                }
                  , w = p.StringValues = {
                    ExposureProgram: {
                        0: "Not defined",
                        1: "Manual",
                        2: "Normal program",
                        3: "Aperture priority",
                        4: "Shutter priority",
                        5: "Creative program",
                        6: "Action program",
                        7: "Portrait mode",
                        8: "Landscape mode"
                    },
                    MeteringMode: {
                        0: "Unknown",
                        1: "Average",
                        2: "CenterWeightedAverage",
                        3: "Spot",
                        4: "MultiSpot",
                        5: "Pattern",
                        6: "Partial",
                        255: "Other"
                    },
                    LightSource: {
                        0: "Unknown",
                        1: "Daylight",
                        2: "Fluorescent",
                        3: "Tungsten (incandescent light)",
                        4: "Flash",
                        9: "Fine weather",
                        10: "Cloudy weather",
                        11: "Shade",
                        12: "Daylight fluorescent (D 5700 - 7100K)",
                        13: "Day white fluorescent (N 4600 - 5400K)",
                        14: "Cool white fluorescent (W 3900 - 4500K)",
                        15: "White fluorescent (WW 3200 - 3700K)",
                        17: "Standard light A",
                        18: "Standard light B",
                        19: "Standard light C",
                        20: "D55",
                        21: "D65",
                        22: "D75",
                        23: "D50",
                        24: "ISO studio tungsten",
                        255: "Other"
                    },
                    Flash: {
                        0: "Flash did not fire",
                        1: "Flash fired",
                        5: "Strobe return light not detected",
                        7: "Strobe return light detected",
                        9: "Flash fired, compulsory flash mode",
                        13: "Flash fired, compulsory flash mode, return light not detected",
                        15: "Flash fired, compulsory flash mode, return light detected",
                        16: "Flash did not fire, compulsory flash mode",
                        24: "Flash did not fire, auto mode",
                        25: "Flash fired, auto mode",
                        29: "Flash fired, auto mode, return light not detected",
                        31: "Flash fired, auto mode, return light detected",
                        32: "No flash function",
                        65: "Flash fired, red-eye reduction mode",
                        69: "Flash fired, red-eye reduction mode, return light not detected",
                        71: "Flash fired, red-eye reduction mode, return light detected",
                        73: "Flash fired, compulsory flash mode, red-eye reduction mode",
                        77: "Flash fired, compulsory flash mode, red-eye reduction mode, return light not detected",
                        79: "Flash fired, compulsory flash mode, red-eye reduction mode, return light detected",
                        89: "Flash fired, auto mode, red-eye reduction mode",
                        93: "Flash fired, auto mode, return light not detected, red-eye reduction mode",
                        95: "Flash fired, auto mode, return light detected, red-eye reduction mode"
                    },
                    SensingMethod: {
                        1: "Not defined",
                        2: "One-chip color area sensor",
                        3: "Two-chip color area sensor",
                        4: "Three-chip color area sensor",
                        5: "Color sequential area sensor",
                        7: "Trilinear sensor",
                        8: "Color sequential linear sensor"
                    },
                    SceneCaptureType: {
                        0: "Standard",
                        1: "Landscape",
                        2: "Portrait",
                        3: "Night scene"
                    },
                    SceneType: {
                        1: "Directly photographed"
                    },
                    CustomRendered: {
                        0: "Normal process",
                        1: "Custom process"
                    },
                    WhiteBalance: {
                        0: "Auto white balance",
                        1: "Manual white balance"
                    },
                    GainControl: {
                        0: "None",
                        1: "Low gain up",
                        2: "High gain up",
                        3: "Low gain down",
                        4: "High gain down"
                    },
                    Contrast: {
                        0: "Normal",
                        1: "Soft",
                        2: "Hard"
                    },
                    Saturation: {
                        0: "Normal",
                        1: "Low saturation",
                        2: "High saturation"
                    },
                    Sharpness: {
                        0: "Normal",
                        1: "Soft",
                        2: "Hard"
                    },
                    SubjectDistanceRange: {
                        0: "Unknown",
                        1: "Macro",
                        2: "Close view",
                        3: "Distant view"
                    },
                    FileSource: {
                        3: "DSC"
                    },
                    Components: {
                        0: "",
                        1: "Y",
                        2: "Cb",
                        3: "Cr",
                        4: "R",
                        5: "G",
                        6: "B"
                    }
                }
                  , x = {
                    120: "caption",
                    110: "credit",
                    25: "keywords",
                    55: "dateCreated",
                    80: "byline",
                    85: "bylineTitle",
                    122: "captionWriter",
                    105: "headline",
                    116: "copyright",
                    15: "category"
                };
                p.enableXmp = function() {
                    p.isXmpEnabled = !0
                }
                ,
                p.disableXmp = function() {
                    p.isXmpEnabled = !1
                }
                ,
                p.getData = function(t, n) {
                    return !((self.Image && t instanceof self.Image || self.HTMLImageElement && t instanceof self.HTMLImageElement) && !t.complete || (i(t) ? n && n.call(t) : o(t, n),
                    0))
                }
                ,
                p.getTag = function(t, n) {
                    if (i(t))
                        return t.exifdata[n]
                }
                ,
                p.getIptcTag = function(t, n) {
                    if (i(t))
                        return t.iptcdata[n]
                }
                ,
                p.getAllTags = function(t) {
                    if (!i(t))
                        return {};
                    var n, e = t.exifdata, r = {};
                    for (n in e)
                        e.hasOwnProperty(n) && (r[n] = e[n]);
                    return r
                }
                ,
                p.getAllIptcTags = function(t) {
                    if (!i(t))
                        return {};
                    var n, e = t.iptcdata, r = {};
                    for (n in e)
                        e.hasOwnProperty(n) && (r[n] = e[n]);
                    return r
                }
                ,
                p.pretty = function(t) {
                    if (!i(t))
                        return "";
                    var n, e = t.exifdata, r = "";
                    for (n in e)
                        e.hasOwnProperty(n) && ("object" == typeof e[n] ? e[n]instanceof Number ? r += n + " : " + e[n] + " [" + e[n].numerator + "/" + e[n].denominator + "]\r\n" : r += n + " : [" + e[n].length + " values]\r\n" : r += n + " : " + e[n] + "\r\n");
                    return r
                }
                ,
                p.readFromBinaryFile = function(t) {
                    return s(t)
                }
                ,
                void 0 === (r = function() {
                    return p
                }
                .apply(e, [])) || (t.exports = r)
            }
            ).call(this)
        }
        ])
    }
    ));
    const Jy = zt("CdnUploader")
      , Ky = {
        useCdnDomain: !0,
        region: Wy.region.z0
    };
    function Yy(t, n, e, i) {
        return Pt("/api/media/audio", t, {
            silent: !0
        }).then((t => Qy(t, n, e, i).then((n => ({
            cdnKey: n,
            audioCode: t.audioCode
        })))))
    }
    function Qy(t, n, e, i=( () => {}
    )) {
        if (!t)
            return Promise.reject(new Error("上传失败 (代码100）"));
        const {key: r, token: o} = t
          , s = {
            fname: e
        }
          , u = Wy.upload(n, r, o, s, Ky);
        return new Promise(( (t, n) => {
            u.subscribe({
                next(t) {
                    const n = t.total.percent;
                    Jy(`Uploading ${n.toFixed(1)}% ...`),
                    i(n)
                },
                error(e) {
                    if (204 === e.code)
                        return Jy("Upload complete (204) ..."),
                        void t(r);
                    Jy("Upload error ...", e),
                    n(e)
                },
                complete(n) {
                    Jy("Upload complete ..."),
                    t(r)
                }
            })
        }
        ))
    }
    function Zy(t) {
        let n, e;
        return {
            c() {
                n = Xl("span"),
                e = Il(t[2])
            },
            m(t, i) {
                Ol(t, n, i),
                Tl(n, e)
            },
            p(t, n) {
                4 & n && ql(e, t[2])
            },
            d(t) {
                t && Cl(n)
            }
        }
    }
    function tg(t) {
        let n, e, i, r, o, s;
        const u = t[10].default
          , c = dl(u, t, t[9], null)
          , a = c || Zy(t);
        return {
            c() {
                n = Xl("label"),
                e = Xl("input"),
                i = _l(),
                a && a.c(),
                Dl(e, "accept", t[0]),
                Dl(e, "capture", t[1]),
                Dl(e, "id", t[4]),
                Fl(e, "display", "none"),
                Dl(e, "type", "file"),
                Dl(n, "for", t[4]),
                Dl(n, "class", "svelte-10x1v2p")
            },
            m(u, c) {
                Ol(u, n, c),
                Tl(n, e),
                Tl(n, i),
                a && a.m(n, null),
                r = !0,
                o || (s = Rl(e, "change", t[11]),
                o = !0)
            },
            p(t, [n]) {
                (!r || 1 & n) && Dl(e, "accept", t[0]),
                (!r || 2 & n) && Dl(e, "capture", t[1]),
                c ? c.p && 512 & n && ml(c, u, t, t[9], n, null, null) : a && a.p && 4 & n && a.p(t, n)
            },
            i(t) {
                r || (Af(a, t),
                r = !0)
            },
            o(t) {
                Xf(a, t),
                r = !1
            },
            d(t) {
                t && Cl(n),
                a && a.d(t),
                o = !1,
                s()
            }
        }
    }
    function ng(t, n, e) {
        let {$$slots: i={}, $$scope: r} = n
          , {accept: o} = n
          , {capture: s} = n
          , {maxSize: u=1 / 0} = n
          , {required: c=!1} = n
          , {text: a="请选择文件"} = n
          , {error: l} = n
          , {file: f} = n;
        const h = "-file-input-" + Math.random().toString().substr(2, 6);
        let d;
        return t.$$set = t => {
            "accept"in t && e(0, o = t.accept),
            "capture"in t && e(1, s = t.capture),
            "maxSize"in t && e(7, u = t.maxSize),
            "required"in t && e(8, c = t.required),
            "text"in t && e(2, a = t.text),
            "error"in t && e(6, l = t.error),
            "file"in t && e(5, f = t.file),
            "$$scope"in t && e(9, r = t.$$scope)
        }
        ,
        t.$$.update = () => {
            424 & t.$$.dirty && (e(5, f = d ? d[0] : null),
            e(6, l = null),
            c && !f && e(6, l = "请选择文件"),
            f && f.size > 1024 * u && e(6, l = `文件大小超过了${u}KB`))
        }
        ,
        [o, s, a, d, h, f, l, u, c, r, i, function() {
            d = this.files,
            e(3, d)
        }
        ]
    }
    class eg extends Ff {
        constructor(t) {
            super(),
            $f(this, t, ng, tg, al, {
                accept: 0,
                capture: 1,
                maxSize: 7,
                required: 8,
                text: 2,
                error: 6,
                file: 5
            })
        }
    }
    function ig(t) {
        let n, e, i, r, o;
        return {
            c() {
                n = Xl("span"),
                e = Il(t[2]),
                i = _l(),
                r = Xl("div"),
                Dl(n, "class", "text svelte-1p894og"),
                Dl(r, "class", "progress svelte-1p894og"),
                Dl(r, "style", o = `width: ${t[1] + "%"};`)
            },
            m(t, o) {
                Ol(t, n, o),
                Tl(n, e),
                Ol(t, i, o),
                Ol(t, r, o)
            },
            p(t, n) {
                4 & n && ql(e, t[2]),
                2 & n && o !== (o = `width: ${t[1] + "%"};`) && Dl(r, "style", o)
            },
            d(t) {
                t && Cl(n),
                t && Cl(i),
                t && Cl(r)
            }
        }
    }
    function rg(t) {
        let n, e;
        return n = new qd({
            props: {
                disabled: t[0] || t[1],
                size: "big",
                theme: "primary",
                $$slots: {
                    default: [ig]
                },
                $$scope: {
                    ctx: t
                }
            }
        }),
        n.$on("click", t[3]),
        {
            c() {
                jf(n.$$.fragment)
            },
            m(t, i) {
                Bf(n, t, i),
                e = !0
            },
            p(t, [e]) {
                const i = {};
                3 & e && (i.disabled = t[0] || t[1]),
                22 & e && (i.$$scope = {
                    dirty: e,
                    ctx: t
                }),
                n.$set(i)
            },
            i(t) {
                e || (Af(n.$$.fragment, t),
                e = !0)
            },
            o(t) {
                Xf(n.$$.fragment, t),
                e = !1
            },
            d(t) {
                Pf(n, t)
            }
        }
    }
    function og(t, n, e) {
        let {disabled: i=!1} = n
          , {progress: r=0} = n
          , {text: o="立即上传"} = n;
        return t.$$set = t => {
            "disabled"in t && e(0, i = t.disabled),
            "progress"in t && e(1, r = t.progress),
            "text"in t && e(2, o = t.text)
        }
        ,
        [i, r, o, function(n) {
            uf(t, n)
        }
        ]
    }
    class sg extends Ff {
        constructor(t) {
            super(),
            $f(this, t, og, rg, al, {
                disabled: 0,
                progress: 1,
                text: 2
            })
        }
    }
    function ug(t) {
        let n, e, i, r;
        return {
            c() {
                n = Xl("span"),
                n.textContent = "/",
                e = _l(),
                i = Xl("span"),
                r = Il(t[2])
            },
            m(t, o) {
                Ol(t, n, o),
                Ol(t, e, o),
                Ol(t, i, o),
                Tl(i, r)
            },
            p(t, n) {
                4 & n && ql(r, t[2])
            },
            d(t) {
                t && Cl(n),
                t && Cl(e),
                t && Cl(i)
            }
        }
    }
    function cg(t) {
        let n, e, i, r, o, s, u, c, a, l = t[2] !== 1 / 0 && ug(t);
        return {
            c() {
                n = Xl("div"),
                e = Xl("textarea"),
                i = _l(),
                r = Xl("div"),
                o = Xl("span"),
                s = Il(t[7]),
                u = _l(),
                l && l.c(),
                Dl(e, "placeholder", t[3]),
                Dl(e, "rows", t[4]),
                Dl(e, "class", "svelte-nz7dk6"),
                Dl(r, "class", "count svelte-nz7dk6"),
                Ll(r, "warn", t[1]),
                Dl(n, "class", "text-input svelte-nz7dk6"),
                Dl(n, "resize", t[6]),
                Ll(n, "gray", t[5])
            },
            m(f, h) {
                Ol(f, n, h),
                Tl(n, e),
                $l(e, t[0]),
                Tl(n, i),
                Tl(n, r),
                Tl(r, o),
                Tl(o, s),
                Tl(r, u),
                l && l.m(r, null),
                c || (a = Rl(e, "input", t[9]),
                c = !0)
            },
            p(t, [i]) {
                8 & i && Dl(e, "placeholder", t[3]),
                16 & i && Dl(e, "rows", t[4]),
                1 & i && $l(e, t[0]),
                128 & i && ql(s, t[7]),
                t[2] !== 1 / 0 ? l ? l.p(t, i) : (l = ug(t),
                l.c(),
                l.m(r, null)) : l && (l.d(1),
                l = null),
                2 & i && Ll(r, "warn", t[1]),
                64 & i && Dl(n, "resize", t[6]),
                32 & i && Ll(n, "gray", t[5])
            },
            i: el,
            o: el,
            d(t) {
                t && Cl(n),
                l && l.d(),
                c = !1,
                a()
            }
        }
    }
    function ag(t, n, e) {
        let i, {error: r} = n, {maxLength: o=1 / 0} = n, {minLength: s=0} = n, {placeholder: u} = n, {rows: c=1} = n, {value: a} = n, {gray: l=!1} = n, {resize: f} = n;
        return t.$$set = t => {
            "error"in t && e(1, r = t.error),
            "maxLength"in t && e(2, o = t.maxLength),
            "minLength"in t && e(8, s = t.minLength),
            "placeholder"in t && e(3, u = t.placeholder),
            "rows"in t && e(4, c = t.rows),
            "value"in t && e(0, a = t.value),
            "gray"in t && e(5, l = t.gray),
            "resize"in t && e(6, f = t.resize)
        }
        ,
        t.$$.update = () => {
            389 & t.$$.dirty && (e(7, i = a ? a.length : 0),
            e(1, r = null),
            i < s && e(1, r = `内容字符长度小于${s}`),
            i > o && e(1, r = `内容字符长度大于${o}`))
        }
        ,
        [a, r, o, u, c, l, f, i, s, function() {
            a = this.value,
            e(0, a)
        }
        ]
    }
    class lg extends Ff {
        constructor(t) {
            super(),
            $f(this, t, ag, cg, al, {
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
    function fg(t) {
        let n, e;
        return {
            c() {
                n = Xl("div"),
                e = Xl("div"),
                e.innerHTML = '<div class="select-file-button svelte-1smze6b"><i class="yoopu3-icon svelte-1smze6b"></i> \n              <span class="svelte-1smze6b">上传示范音频</span></div>',
                Dl(e, "class", "content svelte-1smze6b"),
                Ll(e, "error", t[2]),
                Dl(n, "class", "cell no-border svelte-1smze6b")
            },
            m(t, i) {
                Ol(t, n, i),
                Tl(n, e)
            },
            p(t, n) {
                4 & n && Ll(e, "error", t[2])
            },
            d(t) {
                t && Cl(n)
            }
        }
    }
    function hg(t) {
        let n;
        return {
            c() {
                n = Xl("div"),
                n.innerHTML = '<div class="title svelte-1smze6b"><span class="svelte-1smze6b">选择录音\n              <small class="svelte-1smze6b">支持常用音频格式，如mp3, wav, m4a, aac</small></span></div> \n          <div class="content svelte-1smze6b"><span class="re-select-file-button svelte-1smze6b">重新选择</span></div>',
                Dl(n, "class", "cell no-border arrow svelte-1smze6b")
            },
            m(t, e) {
                Ol(t, n, e)
            },
            p: el,
            d(t) {
                t && Cl(n)
            }
        }
    }
    function dg(t) {
        let n;
        function e(t, n) {
            return t[4] ? hg : fg
        }
        let i = e(t)
          , r = i(t);
        return {
            c() {
                r.c(),
                n = Ml()
            },
            m(t, e) {
                r.m(t, e),
                Ol(t, n, e)
            },
            p(t, o) {
                i === (i = e(t)) && r ? r.p(t, o) : (r.d(1),
                r = i(t),
                r && (r.c(),
                r.m(n.parentNode, n)))
            },
            d(t) {
                r.d(t),
                t && Cl(n)
            }
        }
    }
    function vg(t) {
        let n;
        return {
            c() {
                n = Xl("div"),
                Dl(n, "class", "glass svelte-1smze6b")
            },
            m(t, e) {
                Ol(t, n, e)
            },
            d(t) {
                t && Cl(n)
            }
        }
    }
    function pg(t) {
        let n, e, i, r, o, s, u, c, a, l, f, h, d, v, p, m, y, g, b, w, x, k, S, E, T, O, C, A, X;
        function I(n) {
            t[15](n)
        }
        function _(n) {
            t[16](n)
        }
        let M = {
            accept: "audio/*",
            required: !0,
            maxSize: t[10],
            $$slots: {
                default: [dg]
            },
            $$scope: {
                ctx: t
            }
        };
        function R(n) {
            t[17](n)
        }
        function D(n) {
            t[18](n)
        }
        void 0 !== t[1] && (M.file = t[1]),
        void 0 !== t[2] && (M.error = t[2]),
        i = new eg({
            props: M
        }),
        af.push(( () => Df(i, "file", I))),
        af.push(( () => Df(i, "error", _))),
        a = new Ly({
            props: {
                src: t[4]
            }
        });
        let j = {
            isBlock: !0,
            maxLength: mg,
            placeholder: "请添加录音标题",
            rows: 2
        };
        void 0 !== t[8] && (j.value = t[8]),
        void 0 !== t[3] && (j.error = t[3]),
        d = new lg({
            props: j
        }),
        af.push(( () => Df(d, "value", R))),
        af.push(( () => Df(d, "error", D))),
        C = new sg({
            props: {
                disabled: !t[6],
                progress: t[7],
                text: t[9]
            }
        }),
        C.$on("click", t[11]);
        let B = t[5] && vg();
        return {
            c() {
                n = Xl("main"),
                e = Xl("section"),
                jf(i.$$.fragment),
                s = _l(),
                u = Xl("div"),
                c = Xl("div"),
                jf(a.$$.fragment),
                l = _l(),
                f = Xl("div"),
                h = Xl("div"),
                jf(d.$$.fragment),
                m = _l(),
                y = Xl("div"),
                g = Xl("div"),
                g.innerHTML = '<i class="yoopu3-icon svelte-1smze6b"></i> \n        <span class="svelte-1smze6b">所属曲谱：</span>',
                b = _l(),
                w = Xl("div"),
                x = Il(t[0]),
                k = _l(),
                S = Xl("section"),
                S.innerHTML = '<h3 class="svelte-1smze6b">上传音频注意事项：</h3> \n    <ol class="svelte-1smze6b"><li class="svelte-1smze6b">所有录音需人工审核后方可上线。</li> \n      <li class="svelte-1smze6b">录音是对该曲谱的示范，需严格遵照曲谱演奏。</li> \n      <li class="svelte-1smze6b">禁止内嵌任何与示范无关的内容，包括但不限于广告、自我介绍、教学。</li> \n      <li class="svelte-1smze6b">音频开始不可有超过3秒以上的空白，音频音量和环境噪音需控制在合理范围。</li> \n      <li class="svelte-1smze6b">禁止上传侵权内容，如歌曲的原音。</li></ol>',
                E = _l(),
                T = Xl("div"),
                O = Xl("div"),
                jf(C.$$.fragment),
                A = _l(),
                B && B.c(),
                Dl(c, "class", "content svelte-1smze6b"),
                Dl(u, "class", "cell no-border svelte-1smze6b"),
                Ll(u, "hide", !t[4]),
                Dl(h, "class", "content title-input-wrap svelte-1smze6b"),
                Ll(h, "error", t[3]),
                Dl(f, "class", "cell no-border svelte-1smze6b"),
                Dl(g, "class", "title svelte-1smze6b"),
                Dl(w, "class", "content svelte-1smze6b"),
                Dl(y, "class", "cell sheet-title svelte-1smze6b"),
                Dl(e, "class", "svelte-1smze6b"),
                Dl(S, "class", "rule svelte-1smze6b"),
                Dl(O, "class", "blank-wings svelte-1smze6b"),
                Dl(T, "class", "fixed-bottom svelte-1smze6b"),
                Ll(T, "uploading", t[5]),
                Dl(n, "class", "page-audio-upload")
            },
            m(t, r) {
                Ol(t, n, r),
                Tl(n, e),
                Bf(i, e, null),
                Tl(e, s),
                Tl(e, u),
                Tl(u, c),
                Bf(a, c, null),
                Tl(e, l),
                Tl(e, f),
                Tl(f, h),
                Bf(d, h, null),
                Tl(e, m),
                Tl(e, y),
                Tl(y, g),
                Tl(y, b),
                Tl(y, w),
                Tl(w, x),
                Tl(n, k),
                Tl(n, S),
                Tl(n, E),
                Tl(n, T),
                Tl(T, O),
                Bf(C, O, null),
                Tl(n, A),
                B && B.m(n, null),
                X = !0
            },
            p(t, [e]) {
                const s = {};
                4194324 & e && (s.$$scope = {
                    dirty: e,
                    ctx: t
                }),
                !r && 2 & e && (r = !0,
                s.file = t[1],
                mf(( () => r = !1))),
                !o && 4 & e && (o = !0,
                s.error = t[2],
                mf(( () => o = !1))),
                i.$set(s);
                const c = {};
                16 & e && (c.src = t[4]),
                a.$set(c),
                16 & e && Ll(u, "hide", !t[4]);
                const l = {};
                !v && 256 & e && (v = !0,
                l.value = t[8],
                mf(( () => v = !1))),
                !p && 8 & e && (p = !0,
                l.error = t[3],
                mf(( () => p = !1))),
                d.$set(l),
                8 & e && Ll(h, "error", t[3]),
                (!X || 1 & e) && ql(x, t[0]);
                const f = {};
                64 & e && (f.disabled = !t[6]),
                128 & e && (f.progress = t[7]),
                512 & e && (f.text = t[9]),
                C.$set(f),
                32 & e && Ll(T, "uploading", t[5]),
                t[5] ? B || (B = vg(),
                B.c(),
                B.m(n, null)) : B && (B.d(1),
                B = null)
            },
            i(t) {
                X || (Af(i.$$.fragment, t),
                Af(a.$$.fragment, t),
                Af(d.$$.fragment, t),
                Af(C.$$.fragment, t),
                X = !0)
            },
            o(t) {
                Xf(i.$$.fragment, t),
                Xf(a.$$.fragment, t),
                Xf(d.$$.fragment, t),
                Xf(C.$$.fragment, t),
                X = !1
            },
            d(t) {
                t && Cl(n),
                Pf(i),
                Pf(a),
                Pf(d),
                Pf(C),
                B && B.d()
            }
        }
    }
    const mg = 40;
    function yg(t, n, e) {
        let {sheetCode: i} = n
          , {sheetTitle: r} = n
          , {sheetArtist: o} = n
          , {onUploadComplete: s=( () => {}
        )} = n;
        const u = zt("AudioUploader")
          , c = Vy[Uy.AUDIO_FREE]
          , a = (r || "") + " - " + (o || "");
        let l, f, h, d, v, p = !1, m = !1, y = 0, g = "立即上传";
        return t.$$set = t => {
            "sheetCode"in t && e(12, i = t.sheetCode),
            "sheetTitle"in t && e(0, r = t.sheetTitle),
            "sheetArtist"in t && e(13, o = t.sheetArtist),
            "onUploadComplete"in t && e(14, s = t.onUploadComplete)
        }
        ,
        t.$$.update = () => {
            12 & t.$$.dirty && e(6, m = !h && !v),
            2 & t.$$.dirty && e(4, l = f ? window.URL.createObjectURL(f) : null)
        }
        ,
        [r, f, h, v, l, p, m, y, d, g, c, function() {
            m && async function(t, n) {
                try {
                    e(5, p = !0);
                    const i = await Yy(n, t, t.name, (t => {
                        e(7, y = t);
                        const n = t.toFixed(1) + "%";
                        e(9, g = `上传中(${n})`),
                        "100.0%" === n && e(9, g = "扫描文件中...")
                    }
                    ));
                    u("upload success", i);
                    const {cdnKey: r, audioCode: o} = i;
                    s({
                        audioCode: o,
                        sheetCode: n.sheetCode,
                        title: n.title,
                        src: `${ku}/${r}`,
                        cdnKey: r
                    }),
                    e(9, g = "文件上传成功")
                } catch (t) {
                    u("upload fail", t),
                    e(9, g = "文件上传失败")
                }
                e(5, p = !1),
                e(7, y = 0)
            }(f, {
                sheetCode: i,
                title: d || a
            })
        }
        , i, o, s, function(t) {
            f = t,
            e(1, f)
        }
        , function(t) {
            h = t,
            e(2, h)
        }
        , function(t) {
            d = t,
            e(8, d)
        }
        , function(t) {
            v = t,
            e(3, v)
        }
        ]
    }
    class gg extends Ff {
        constructor(t) {
            super(),
            $f(this, t, yg, pg, al, {
                sheetCode: 12,
                sheetTitle: 0,
                sheetArtist: 13,
                onUploadComplete: 14
            })
        }
    }
    function bg(t) {
        let n, e, i, r, o, s, u, c, a, l, f, h, d = (t[1] && t[1].playedTimesDisplay || 0) + "";
        o = new Ly({
            props: {
                src: t[1] && t[1].src
            }
        });
        let v = t[3] && wg(t);
        return {
            c() {
                n = Xl("section"),
                e = Xl("div"),
                e.textContent = "示范音频",
                i = _l(),
                r = Xl("div"),
                jf(o.$$.fragment),
                s = _l(),
                u = Xl("div"),
                c = Xl("span"),
                a = Il(d),
                l = Il("次播放"),
                f = _l(),
                v && v.c(),
                Dl(e, "class", "title svelte-1c6yezu"),
                Dl(r, "class", "audio-wrapper svelte-1c6yezu"),
                Dl(c, "class", "stats svelte-1c6yezu"),
                Dl(u, "class", "info svelte-1c6yezu"),
                Dl(n, "class", "audio svelte-1c6yezu")
            },
            m(t, d) {
                Ol(t, n, d),
                Tl(n, e),
                Tl(n, i),
                Tl(n, r),
                Bf(o, r, null),
                Tl(n, s),
                Tl(n, u),
                Tl(u, c),
                Tl(c, a),
                Tl(c, l),
                Tl(n, f),
                v && v.m(n, null),
                h = !0
            },
            p(t, n) {
                const e = {};
                2 & n && (e.src = t[1] && t[1].src),
                o.$set(e),
                (!h || 2 & n) && d !== (d = (t[1] && t[1].playedTimesDisplay || 0) + "") && ql(a, d),
                t[3] && v.p(t, n)
            },
            i(t) {
                h || (Af(o.$$.fragment, t),
                h = !0)
            },
            o(t) {
                Xf(o.$$.fragment, t),
                h = !1
            },
            d(t) {
                t && Cl(n),
                Pf(o),
                v && v.d()
            }
        }
    }
    function wg(t) {
        let n;
        function e(t, n) {
            return t[1] ? kg : xg
        }
        let i = e(t)
          , r = i(t);
        return {
            c() {
                n = Xl("div"),
                r.c(),
                Dl(n, "class", "button-panel svelte-1c6yezu")
            },
            m(t, e) {
                Ol(t, n, e),
                r.m(n, null)
            },
            p(t, o) {
                i === (i = e(t)) && r ? r.p(t, o) : (r.d(1),
                r = i(t),
                r && (r.c(),
                r.m(n, null)))
            },
            d(t) {
                t && Cl(n),
                r.d()
            }
        }
    }
    function xg(t) {
        let n, e, i;
        return {
            c() {
                n = Xl("button"),
                n.textContent = "上传示范音频",
                Dl(n, "class", "preferred svelte-1c6yezu")
            },
            m(r, o) {
                Ol(r, n, o),
                e || (i = Rl(n, "click", t[7]),
                e = !0)
            },
            p: el,
            d(t) {
                t && Cl(n),
                e = !1,
                i()
            }
        }
    }
    function kg(t) {
        let n, e, i, r, o;
        return {
            c() {
                n = Xl("button"),
                n.textContent = "重新上传",
                e = _l(),
                i = Xl("button"),
                i.textContent = "删除",
                Dl(n, "class", "preferred svelte-1c6yezu"),
                Dl(i, "class", "svelte-1c6yezu")
            },
            m(s, u) {
                Ol(s, n, u),
                Ol(s, e, u),
                Ol(s, i, u),
                r || (o = [Rl(n, "click", t[6]), Rl(i, "click", t[5])],
                r = !0)
            },
            p: el,
            d(t) {
                t && Cl(n),
                t && Cl(e),
                t && Cl(i),
                r = !1,
                ul(o)
            }
        }
    }
    function Sg(t) {
        let n, e;
        return n = new gg({
            props: {
                sheetCode: t[0].id,
                sheetTitle: t[0].title,
                sheetArtist: t[0].artist,
                onUploadComplete: t[4]
            }
        }),
        {
            c() {
                jf(n.$$.fragment)
            },
            m(t, i) {
                Bf(n, t, i),
                e = !0
            },
            p(t, e) {
                const i = {};
                1 & e && (i.sheetCode = t[0].id),
                1 & e && (i.sheetTitle = t[0].title),
                1 & e && (i.sheetArtist = t[0].artist),
                n.$set(i)
            },
            i(t) {
                e || (Af(n.$$.fragment, t),
                e = !0)
            },
            o(t) {
                Xf(n.$$.fragment, t),
                e = !1
            },
            d(t) {
                Pf(n, t)
            }
        }
    }
    function Eg(t) {
        let n, e, i, r, o = (t[1] || t[3]) && bg(t);
        function s(n) {
            t[8](n)
        }
        let u = {
            noButtons: !0,
            cancelButtonText: "",
            $$slots: {
                default: [Sg]
            },
            $$scope: {
                ctx: t
            }
        };
        return void 0 !== t[2] && (u.open = t[2]),
        e = new Hd({
            props: u
        }),
        af.push(( () => Df(e, "open", s))),
        {
            c() {
                o && o.c(),
                n = _l(),
                jf(e.$$.fragment)
            },
            m(t, i) {
                o && o.m(t, i),
                Ol(t, n, i),
                Bf(e, t, i),
                r = !0
            },
            p(t, [r]) {
                t[1] || t[3] ? o ? (o.p(t, r),
                2 & r && Af(o, 1)) : (o = bg(t),
                o.c(),
                Af(o, 1),
                o.m(n.parentNode, n)) : o && (Of(),
                Xf(o, 1, 1, ( () => {
                    o = null
                }
                )),
                Cf());
                const s = {};
                513 & r && (s.$$scope = {
                    dirty: r,
                    ctx: t
                }),
                !i && 4 & r && (i = !0,
                s.open = t[2],
                mf(( () => i = !1))),
                e.$set(s)
            },
            i(t) {
                r || (Af(o),
                Af(e.$$.fragment, t),
                r = !0)
            },
            o(t) {
                Xf(o),
                Xf(e.$$.fragment, t),
                r = !1
            },
            d(t) {
                o && o.d(t),
                t && Cl(n),
                Pf(e, t)
            }
        }
    }
    function Tg(t, n, e) {
        let {sheet: i} = n
          , r = i.audio;
        const o = i.isOwned;
        let s = !1;
        return t.$$set = t => {
            "sheet"in t && e(0, i = t.sheet)
        }
        ,
        [i, r, s, o, function(t) {
            e(1, r = {
                src: t.src,
                playedTimesDisplay: 0,
                audioCode: t.audioCode
            }),
            e(2, s = !1),
            Cn.show("上传成功")
        }
        , async function() {
            await nv("删除示范音频", "是要删除示范音频么？此操作不可逆转！") && (await Wa(r.audioCode),
            e(1, r = null),
            Cn.show("删除成功"))
        }
        , () => e(2, s = !0), () => e(2, s = !0), function(t) {
            s = t,
            e(2, s)
        }
        ]
    }
    class Og extends Ff {
        constructor(t) {
            super(),
            $f(this, t, Tg, Eg, al, {
                sheet: 0
            })
        }
    }
    function Cg(t) {
        let n;
        return {
            c() {
                n = Xl("span")
            },
            m(t, e) {
                Ol(t, n, e)
            },
            d(t) {
                t && Cl(n)
            }
        }
    }
    function Ag(t) {
        let n, e, i, r;
        const o = t[5].default
          , s = dl(o, t, t[4], null)
          , u = s || Cg();
        return {
            c() {
                n = Xl("button"),
                u && u.c(),
                n.disabled = t[1],
                Dl(n, "size", t[2]),
                Dl(n, "theme", t[3]),
                Dl(n, "type", "button"),
                Dl(n, "class", "svelte-14csrjh"),
                Ll(n, "block", t[0])
            },
            m(o, s) {
                Ol(o, n, s),
                u && u.m(n, null),
                e = !0,
                i || (r = Rl(n, "click", t[6]),
                i = !0)
            },
            p(t, [i]) {
                s && s.p && 16 & i && ml(s, o, t, t[4], i, null, null),
                (!e || 2 & i) && (n.disabled = t[1]),
                (!e || 4 & i) && Dl(n, "size", t[2]),
                (!e || 8 & i) && Dl(n, "theme", t[3]),
                1 & i && Ll(n, "block", t[0])
            },
            i(t) {
                e || (Af(u, t),
                e = !0)
            },
            o(t) {
                Xf(u, t),
                e = !1
            },
            d(t) {
                t && Cl(n),
                u && u.d(t),
                i = !1,
                r()
            }
        }
    }
    function Xg(t, n, e) {
        let {$$slots: i={}, $$scope: r} = n
          , {block: o=!1} = n
          , {disabled: s=!1} = n
          , {size: u} = n
          , {theme: c} = n;
        return t.$$set = t => {
            "block"in t && e(0, o = t.block),
            "disabled"in t && e(1, s = t.disabled),
            "size"in t && e(2, u = t.size),
            "theme"in t && e(3, c = t.theme),
            "$$scope"in t && e(4, r = t.$$scope)
        }
        ,
        [o, s, u, c, r, i, function(n) {
            uf(t, n)
        }
        ]
    }
    class Ig extends Ff {
        constructor(t) {
            super(),
            $f(this, t, Xg, Ag, al, {
                block: 0,
                disabled: 1,
                size: 2,
                theme: 3
            })
        }
    }
    function _g(t) {
        let n, e, i, r;
        const o = [Rg, Mg]
          , s = [];
        function u(t, n) {
            return t[1] ? 0 : 1
        }
        return e = u(t),
        i = s[e] = o[e](t),
        {
            c() {
                n = Xl("div"),
                i.c(),
                Dl(n, "class", "button-container svelte-8xk2fn")
            },
            m(t, i) {
                Ol(t, n, i),
                s[e].m(n, null),
                r = !0
            },
            p(t, r) {
                let c = e;
                e = u(t),
                e === c ? s[e].p(t, r) : (Of(),
                Xf(s[c], 1, 1, ( () => {
                    s[c] = null
                }
                )),
                Cf(),
                i = s[e],
                i ? i.p(t, r) : (i = s[e] = o[e](t),
                i.c()),
                Af(i, 1),
                i.m(n, null))
            },
            i(t) {
                r || (Af(i),
                r = !0)
            },
            o(t) {
                Xf(i),
                r = !1
            },
            d(t) {
                t && Cl(n),
                s[e].d()
            }
        }
    }
    function Mg(t) {
        let n, e;
        return n = new Ig({
            props: {
                block: !0,
                size: "big",
                theme: "primary",
                $$slots: {
                    default: [Dg]
                },
                $$scope: {
                    ctx: t
                }
            }
        }),
        n.$on("click", t[8]),
        {
            c() {
                jf(n.$$.fragment)
            },
            m(t, i) {
                Bf(n, t, i),
                e = !0
            },
            p(t, e) {
                const i = {};
                4100 & e && (i.$$scope = {
                    dirty: e,
                    ctx: t
                }),
                n.$set(i)
            },
            i(t) {
                e || (Af(n.$$.fragment, t),
                e = !0)
            },
            o(t) {
                Xf(n.$$.fragment, t),
                e = !1
            },
            d(t) {
                Pf(n, t)
            }
        }
    }
    function Rg(t) {
        let n, e;
        return n = new Ig({
            props: {
                block: !0,
                size: "big",
                theme: "outline",
                $$slots: {
                    default: [jg]
                },
                $$scope: {
                    ctx: t
                }
            }
        }),
        n.$on("click", t[9]),
        {
            c() {
                jf(n.$$.fragment)
            },
            m(t, i) {
                Bf(n, t, i),
                e = !0
            },
            p(t, e) {
                const i = {};
                4100 & e && (i.$$scope = {
                    dirty: e,
                    ctx: t
                }),
                n.$set(i)
            },
            i(t) {
                e || (Af(n.$$.fragment, t),
                e = !0)
            },
            o(t) {
                Xf(n.$$.fragment, t),
                e = !1
            },
            d(t) {
                Pf(n, t)
            }
        }
    }
    function Dg(t) {
        let n, e, i, r = null == t[2] ? "" : "(" + t[2] + ")";
        return {
            c() {
                n = Xl("i"),
                n.textContent = "",
                e = Il("\n          收藏曲谱"),
                i = Il(r),
                Dl(n, "class", "yoopu3-icon button-icon pure svelte-8xk2fn")
            },
            m(t, r) {
                Ol(t, n, r),
                Ol(t, e, r),
                Ol(t, i, r)
            },
            p(t, n) {
                4 & n && r !== (r = null == t[2] ? "" : "(" + t[2] + ")") && ql(i, r)
            },
            d(t) {
                t && Cl(n),
                t && Cl(e),
                t && Cl(i)
            }
        }
    }
    function jg(t) {
        let n, e, i, r = null == t[2] ? "" : "(" + t[2] + ")";
        return {
            c() {
                n = Xl("i"),
                n.textContent = "",
                e = Il("\n          取消收藏"),
                i = Il(r),
                Dl(n, "class", "yoopu3-icon button-icon svelte-8xk2fn")
            },
            m(t, r) {
                Ol(t, n, r),
                Ol(t, e, r),
                Ol(t, i, r)
            },
            p(t, n) {
                4 & n && r !== (r = null == t[2] ? "" : "(" + t[2] + ")") && ql(i, r)
            },
            d(t) {
                t && Cl(n),
                t && Cl(e),
                t && Cl(i)
            }
        }
    }
    function Bg(t) {
        let n, e;
        return {
            c() {
                n = Xl("i"),
                n.textContent = "",
                e = Il("\n      打印曲谱"),
                Dl(n, "class", "yoopu3-icon button-icon svelte-8xk2fn")
            },
            m(t, i) {
                Ol(t, n, i),
                Ol(t, e, i)
            },
            d(t) {
                t && Cl(n),
                t && Cl(e)
            }
        }
    }
    function Pg(t) {
        let n, e, i, r, o, s, u;
        i = new Ig({
            props: {
                block: !0,
                size: "big",
                theme: "white",
                $$slots: {
                    default: [qg]
                },
                $$scope: {
                    ctx: t
                }
            }
        }),
        i.$on("click", t[7]);
        const c = [Fg, $g]
          , a = [];
        function l(t, n) {
            return t[0].sheetCode || t[0].draftId ? 0 : t[3] ? 1 : -1
        }
        return ~(o = l(t)) && (s = a[o] = c[o](t)),
        {
            c() {
                n = Xl("div"),
                e = Xl("div"),
                jf(i.$$.fragment),
                r = _l(),
                s && s.c(),
                Dl(e, "class", "button-container svelte-8xk2fn"),
                Dl(n, "class", "button-group svelte-8xk2fn")
            },
            m(t, s) {
                Ol(t, n, s),
                Tl(n, e),
                Bf(i, e, null),
                Tl(n, r),
                ~o && a[o].m(n, null),
                u = !0
            },
            p(t, e) {
                const r = {};
                4096 & e && (r.$$scope = {
                    dirty: e,
                    ctx: t
                }),
                i.$set(r);
                let u = o;
                o = l(t),
                o === u ? ~o && a[o].p(t, e) : (s && (Of(),
                Xf(a[u], 1, 1, ( () => {
                    a[u] = null
                }
                )),
                Cf()),
                ~o ? (s = a[o],
                s ? s.p(t, e) : (s = a[o] = c[o](t),
                s.c()),
                Af(s, 1),
                s.m(n, null)) : s = null)
            },
            i(t) {
                u || (Af(i.$$.fragment, t),
                Af(s),
                u = !0)
            },
            o(t) {
                Xf(i.$$.fragment, t),
                Xf(s),
                u = !1
            },
            d(t) {
                t && Cl(n),
                Pf(i),
                ~o && a[o].d()
            }
        }
    }
    function qg(t) {
        let n, e;
        return {
            c() {
                n = Xl("i"),
                n.textContent = "",
                e = Il("\n          编辑曲谱"),
                Dl(n, "class", "yoopu3-icon button-icon svelte-8xk2fn")
            },
            m(t, i) {
                Ol(t, n, i),
                Ol(t, e, i)
            },
            d(t) {
                t && Cl(n),
                t && Cl(e)
            }
        }
    }
    function $g(t) {
        let n, e, i;
        return e = new Ig({
            props: {
                block: !0,
                size: "big",
                theme: "white",
                $$slots: {
                    default: [Ng]
                },
                $$scope: {
                    ctx: t
                }
            }
        }),
        e.$on("click", t[5]),
        {
            c() {
                n = Xl("div"),
                jf(e.$$.fragment),
                Dl(n, "class", "button-container svelte-8xk2fn")
            },
            m(t, r) {
                Ol(t, n, r),
                Bf(e, n, null),
                i = !0
            },
            p(t, n) {
                const i = {};
                4096 & n && (i.$$scope = {
                    dirty: n,
                    ctx: t
                }),
                e.$set(i)
            },
            i(t) {
                i || (Af(e.$$.fragment, t),
                i = !0)
            },
            o(t) {
                Xf(e.$$.fragment, t),
                i = !1
            },
            d(t) {
                t && Cl(n),
                Pf(e)
            }
        }
    }
    function Fg(t) {
        let n, e, i;
        return e = new Ig({
            props: {
                block: !0,
                size: "big",
                theme: "white",
                $$slots: {
                    default: [zg]
                },
                $$scope: {
                    ctx: t
                }
            }
        }),
        e.$on("click", t[6]),
        {
            c() {
                n = Xl("div"),
                jf(e.$$.fragment),
                Dl(n, "class", "button-container svelte-8xk2fn")
            },
            m(t, r) {
                Ol(t, n, r),
                Bf(e, n, null),
                i = !0
            },
            p(t, n) {
                const i = {};
                4096 & n && (i.$$scope = {
                    dirty: n,
                    ctx: t
                }),
                e.$set(i)
            },
            i(t) {
                i || (Af(e.$$.fragment, t),
                i = !0)
            },
            o(t) {
                Xf(e.$$.fragment, t),
                i = !1
            },
            d(t) {
                t && Cl(n),
                Pf(e)
            }
        }
    }
    function Ng(t) {
        let n, e;
        return {
            c() {
                n = Xl("i"),
                n.textContent = "",
                e = Il("\n            删除曲谱"),
                Dl(n, "class", "yoopu3-icon button-icon svelte-8xk2fn")
            },
            m(t, i) {
                Ol(t, n, i),
                Ol(t, e, i)
            },
            d(t) {
                t && Cl(n),
                t && Cl(e)
            }
        }
    }
    function zg(t) {
        let n, e;
        return {
            c() {
                n = Xl("i"),
                n.textContent = "",
                e = Il("\n            放弃修改"),
                Dl(n, "class", "yoopu3-icon button-icon svelte-8xk2fn")
            },
            m(t, i) {
                Ol(t, n, i),
                Ol(t, e, i)
            },
            d(t) {
                t && Cl(n),
                t && Cl(e)
            }
        }
    }
    function Lg(t) {
        let n, e, i, r, o, s, u = !t[3] && !t[0].draftId && _g(t);
        r = new Ig({
            props: {
                block: !0,
                size: "big",
                theme: "white",
                $$slots: {
                    default: [Bg]
                },
                $$scope: {
                    ctx: t
                }
            }
        }),
        r.$on("click", t[11]);
        let c = (t[3] || t[0].format === nt.XHE) && Pg(t);
        return {
            c() {
                n = Xl("section"),
                u && u.c(),
                e = _l(),
                i = Xl("div"),
                jf(r.$$.fragment),
                o = _l(),
                c && c.c(),
                Dl(i, "class", "button-container svelte-8xk2fn"),
                Dl(n, "class", "control svelte-8xk2fn")
            },
            m(t, a) {
                Ol(t, n, a),
                u && u.m(n, null),
                Tl(n, e),
                Tl(n, i),
                Bf(r, i, null),
                Tl(n, o),
                c && c.m(n, null),
                s = !0
            },
            p(t, [i]) {
                t[3] || t[0].draftId ? u && (Of(),
                Xf(u, 1, 1, ( () => {
                    u = null
                }
                )),
                Cf()) : u ? (u.p(t, i),
                1 & i && Af(u, 1)) : (u = _g(t),
                u.c(),
                Af(u, 1),
                u.m(n, e));
                const o = {};
                4096 & i && (o.$$scope = {
                    dirty: i,
                    ctx: t
                }),
                r.$set(o),
                t[3] || t[0].format === nt.XHE ? c ? (c.p(t, i),
                1 & i && Af(c, 1)) : (c = Pg(t),
                c.c(),
                Af(c, 1),
                c.m(n, null)) : c && (Of(),
                Xf(c, 1, 1, ( () => {
                    c = null
                }
                )),
                Cf())
            },
            i(t) {
                s || (Af(u),
                Af(r.$$.fragment, t),
                Af(c),
                s = !0)
            },
            o(t) {
                Xf(u),
                Xf(r.$$.fragment, t),
                Xf(c),
                s = !1
            },
            d(t) {
                t && Cl(n),
                u && u.d(),
                Pf(r),
                c && c.d()
            }
        }
    }
    function Gg(t, n, e) {
        let {sheet: i} = n
          , {user: r} = n
          , {isOwned: o, isFavorite: s, favoritesDisplay: u} = i;
        const c = rf();
        return t.$$set = t => {
            "sheet"in t && e(0, i = t.sheet),
            "user"in t && e(10, r = t.user)
        }
        ,
        [i, s, u, o, c, async function() {
            if (!await nv("删除曲谱", "是要删除曲谱么？此操作不可逆转。"))
                return;
            (Ti(i.id) ? await za(i.id) : await Na(i.id)) && (location.href = "/home#tab=sheets")
        }
        , async function() {
            if (!await nv("放弃修改", "是要放弃修改么？曲谱将回退到之前已发表版本。此操作不可逆转。"))
                return;
            const t = i.draftId ? i.draftId : i.id;
            if (!Ti(t))
                throw new Error("Revoke edit wrong ID: " + t);
            await za(t) && (i.draftId ? location.href = "/view/" + i.id : i.sheetCode ? location.href = "/view/" + i.sheetCode : location.href = "/home#tab=sheets")
        }
        , async function() {
            r ? o || r.isMember ? location.href = Pa(i) : Cn.show("改编他人曲谱是会员特权，请前往手机App开通会员") : Cn.error("请登录")
        }
        , async function() {
            const t = await qa(i.id);
            t ? (Cn.awesome("已收藏曲谱"),
            e(1, s = !0),
            e(2, u = t.favoritesDisplay)) : Cn.error("收藏曲谱失败")
        }
        , async function() {
            await $a(i.id) ? (Cn.awesome("已取消收藏"),
            e(1, s = !1),
            e(2, u = i.favoritesDisplay)) : Cn.error("取消收藏失败")
        }
        , r, () => c("print")]
    }
    class Ug extends Ff {
        constructor(t) {
            super(),
            $f(this, t, Gg, Lg, al, {
                sheet: 0,
                user: 10
            })
        }
    }
    function Hg(t) {
        if (!t)
            return "0:00";
        let n = Math.floor(t / 60);
        n = n < 10 ? `${n}` : n;
        let e = Math.floor(t % 60);
        return e = e < 10 ? `0${e}` : e,
        `${n}:${e}`
    }
    function Vg(t, n, e) {
        return Math.min(e, Math.max(n, t))
    }
    function Wg(t) {
        let n, e, i, r, o, s, u, c, a, l;
        return {
            c() {
                n = Xl("div"),
                e = Xl("div"),
                i = Xl("div"),
                r = _l(),
                o = Xl("div"),
                s = _l(),
                u = Xl("div"),
                c = Xl("div"),
                Dl(i, "class", "barBg svelte-1kv0zx8"),
                Dl(o, "class", "barFg svelte-1kv0zx8"),
                Dl(o, "style", t[3]),
                Dl(e, "class", "container svelte-1kv0zx8"),
                Dl(c, "class", "thumb svelte-1kv0zx8"),
                Dl(u, "class", "thumb-wrapper svelte-1kv0zx8"),
                Dl(u, "style", t[4]),
                Dl(n, "style", t[2]),
                Dl(n, "class", "slider svelte-1kv0zx8"),
                Ll(n, "disabled", t[0])
            },
            m(f, h) {
                Ol(f, n, h),
                Tl(n, e),
                Tl(e, i),
                Tl(e, r),
                Tl(e, o),
                t[14](e),
                Tl(n, s),
                Tl(n, u),
                Tl(u, c),
                a || (l = [Rl(e, "click", t[8]), Rl(u, "mousedown", t[5]), Rl(u, "mouseup", t[6]), Rl(u, "mouseleave", t[6]), Rl(u, "mousemove", t[7]), Rl(u, "touchstart", t[5]), Rl(u, "touchend", t[6]), Rl(u, "touchmove", t[7])],
                a = !0)
            },
            p(t, [e]) {
                8 & e && Dl(o, "style", t[3]),
                16 & e && Dl(u, "style", t[4]),
                4 & e && Dl(n, "style", t[2]),
                1 & e && Ll(n, "disabled", t[0])
            },
            i: el,
            o: el,
            d(e) {
                e && Cl(n),
                t[14](null),
                a = !1,
                ul(l)
            }
        }
    }
    function Jg(t, n, e) {
        let {min: i=0} = n
          , {max: r=1} = n
          , {grain: o=0} = n
          , {disabled: s=!1} = n
          , {color: u} = n
          , {value: c=m(.5)} = n;
        const a = rf();
        let l, f, h, d, v;
        function p() {
            const t = 100 * Vg((c - i) / (r - i), 0, 1);
            e(3, d = Td({
                width: t + "%"
            })),
            e(4, v = Td({
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
            "value"in t && e(9, c = t.value)
        }
        ,
        t.$$.update = () => {
            8192 & t.$$.dirty && e(2, h = Td({
                "--color": u || "var(--color-strength-1)"
            })),
            512 & t.$$.dirty && (f || p())
        }
        ,
        [s, l, h, d, v, function(t) {
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
                  , i = Vg((t.changedTouches ? t.changedTouches[0].pageX : t.pageX) - n, 0, f.width) / f.width;
                e(9, c = m(i)),
                p(),
                a("change", {
                    value: c
                })
            }
        }
        , function(t) {
            if (!s) {
                const n = t.offsetX / l.getBoundingClientRect().width;
                e(9, c = m(n)),
                a("change", {
                    value: c
                })
            }
        }
        , c, i, r, o, u, function(t) {
            af[t ? "unshift" : "push"](( () => {
                l = t,
                e(1, l)
            }
            ))
        }
        ]
    }
    class Kg extends Ff {
        constructor(t) {
            super(),
            $f(this, t, Jg, Wg, al, {
                min: 10,
                max: 11,
                grain: 12,
                disabled: 0,
                color: 13,
                value: 9
            })
        }
    }
    function Yg(t) {
        let n, e;
        return {
            c() {
                n = Xl("span"),
                e = Il(t[2]),
                Dl(n, "class", "icon text-icon svelte-1nic1eu")
            },
            m(t, i) {
                Ol(t, n, i),
                Tl(n, e)
            },
            p(t, n) {
                4 & n && ql(e, t[2])
            },
            d(t) {
                t && Cl(n)
            }
        }
    }
    function Qg(t) {
        let n, e;
        return {
            c() {
                n = Xl("span"),
                e = Il(t[1]),
                Dl(n, "class", "icon yoopu3-icon svelte-1nic1eu")
            },
            m(t, i) {
                Ol(t, n, i),
                Tl(n, e)
            },
            p(t, n) {
                2 & n && ql(e, t[1])
            },
            d(t) {
                t && Cl(n)
            }
        }
    }
    function Zg(t) {
        let n, e;
        return {
            c() {
                n = Xl("span"),
                e = Il(t[3]),
                Dl(n, "class", "text svelte-1nic1eu")
            },
            m(t, i) {
                Ol(t, n, i),
                Tl(n, e)
            },
            p(t, n) {
                8 & n && ql(e, t[3])
            },
            d(t) {
                t && Cl(n)
            }
        }
    }
    function tb(t) {
        let n, e, i, r;
        function o(t, n) {
            return t[1] ? Qg : Yg
        }
        let s = o(t)
          , u = s(t)
          , c = t[3] && Zg(t);
        return {
            c() {
                n = Xl("button"),
                u.c(),
                e = _l(),
                c && c.c(),
                n.disabled = t[0],
                Dl(n, "class", "svelte-1nic1eu"),
                Ll(n, "primary", t[4]),
                Ll(n, "accent", t[5])
            },
            m(o, s) {
                Ol(o, n, s),
                u.m(n, null),
                Tl(n, e),
                c && c.m(n, null),
                i || (r = Rl(n, "click", t[6]),
                i = !0)
            },
            p(t, [i]) {
                s === (s = o(t)) && u ? u.p(t, i) : (u.d(1),
                u = s(t),
                u && (u.c(),
                u.m(n, e))),
                t[3] ? c ? c.p(t, i) : (c = Zg(t),
                c.c(),
                c.m(n, null)) : c && (c.d(1),
                c = null),
                1 & i && (n.disabled = t[0]),
                16 & i && Ll(n, "primary", t[4]),
                32 & i && Ll(n, "accent", t[5])
            },
            i: el,
            o: el,
            d(t) {
                t && Cl(n),
                u.d(),
                c && c.d(),
                i = !1,
                r()
            }
        }
    }
    function nb(t, n, e) {
        let {disabled: i=!1} = n
          , {icon: r} = n
          , {text: o} = n
          , {label: s} = n
          , {primary: u} = n
          , {accent: c} = n;
        return t.$$set = t => {
            "disabled"in t && e(0, i = t.disabled),
            "icon"in t && e(1, r = t.icon),
            "text"in t && e(2, o = t.text),
            "label"in t && e(3, s = t.label),
            "primary"in t && e(4, u = t.primary),
            "accent"in t && e(5, c = t.accent)
        }
        ,
        [i, r, o, s, u, c, function(n) {
            uf(t, n)
        }
        ]
    }
    class eb extends Ff {
        constructor(t) {
            super(),
            $f(this, t, nb, tb, al, {
                disabled: 0,
                icon: 1,
                text: 2,
                label: 3,
                primary: 4,
                accent: 5
            })
        }
    }
    let ib = null;
    function rb() {
        if (null != ib)
            return ib;
        const t = document.createElement("audio");
        return ib = !(!t.canPlayType || !t.canPlayType('audio/ogg; codecs="vorbis"').replace(/no/, "")),
        ib
    }
    const ob = {
        OFF: "off",
        TO_SET_START: "toSetStart",
        TO_SET_END: "toSetEnd",
        LOOPING: "looping"
    };
    function sb(t, n, e) {
        let {player: i} = n
          , {playing: r=!1} = n
          , {currentTime: o=0} = n
          , {totalTime: s=0} = n
          , {drumOn: u=!1} = n
          , {drumVolume: c=1} = n
          , {countIn: a=!1} = n
          , {countingIn: l=!1} = n
          , {trackSettings: f=[]} = n
          , {loopOn: h=!1} = n
          , {loopState: d=ob.OFF} = n
          , {loopCount: v=0} = n;
        const p = ku + "/font/ypz/yp-v1.ypz"
          , m = ku + "/js/oggdec.js"
          , y = i
          , g = rf()
          , b = async function(t) {
            const n = va.YPZ_PREFIX + t;
            let e = await ma(n);
            e || (e = await Rt(t, {
                credentials: "omit"
            }),
            e && await pa(n, e));
            return e
        }(p)
          , w = rb() ? null : Xh(m);
        let x, k, S = o, E = !1, T = 0;
        function O() {
            e(4, l = !1),
            y.playerPositionChanged.off(O)
        }
        function C({currentTick: t}) {
            T > t && e(5, v++, v),
            T = t
        }
        function A() {
            f.forEach(( ({trackIndex: t, channel: n, volume: e, muted: i}) => {
                y.changeTrackVolume([t], e, n),
                y.changeTrackMute([t], i, n)
            }
            ))
        }
        function X() {
            y && y.playerState && (y.metronomeVolume = u ? c : 0)
        }
        function I(t) {
            e(0, r = !!t.state)
        }
        function _(t) {
            const n = t.currentTime / 1e3 | 0;
            n === x && s === t.endTime || (x = n,
            e(1, o = t.currentTime),
            S = o,
            e(3, s = t.endTime))
        }
        function M() {
            y.isLooping || g("playcomplete")
        }
        function R(t) {
            switch (d) {
            case ob.OFF:
                y.selectRange(t, t);
                break;
            case ob.TO_SET_START:
                e(0, r = !1),
                y.selectRange(t, t),
                y.playerPositionChanged.off(C),
                T = 0,
                e(5, v = 0),
                k = t,
                e(2, d = ob.TO_SET_END);
                break;
            case ob.TO_SET_END:
                y.selectRange(k, t),
                y.playerPositionChanged.on(C),
                k = null,
                e(0, r = !0),
                e(2, d = ob.LOOPING);
                break;
            case ob.LOOPING:
                e(0, r = !1),
                k = null,
                e(2, d = ob.TO_SET_START)
            }
            y.isLooping = !!y.playbackRange
        }
        return nf(( () => {
            !async function(t) {
                w && await w;
                const n = await b;
                if (!n)
                    return void Cn.show("音效加载失败");
                const e = () => {
                    t.loadSoundFont(n, !1, !0),
                    t.player.ready.off(e)
                }
                ;
                t.player.isReady ? e() : t.player.ready.on(e)
            }(y),
            y.playerStateChanged.on(I),
            y.midiLoaded.on(_),
            y.playerPositionChanged.on(_),
            y.playerFinished.on(M),
            Oh && y.beatMouseUp.on(R)
        }
        )),
        ef(( () => {
            y.playerState && y.pause(),
            y.playerStateChanged.off(I),
            y.midiLoaded.off(_),
            y.playerPositionChanged.off(_),
            y.playerFinished.off(M),
            Oh && y.beatMouseUp.off(R)
        }
        )),
        t.$$set = t => {
            "player"in t && e(6, i = t.player),
            "playing"in t && e(0, r = t.playing),
            "currentTime"in t && e(1, o = t.currentTime),
            "totalTime"in t && e(3, s = t.totalTime),
            "drumOn"in t && e(7, u = t.drumOn),
            "drumVolume"in t && e(8, c = t.drumVolume),
            "countIn"in t && e(9, a = t.countIn),
            "countingIn"in t && e(4, l = t.countingIn),
            "trackSettings"in t && e(10, f = t.trackSettings),
            "loopOn"in t && e(11, h = t.loopOn),
            "loopState"in t && e(2, d = t.loopState),
            "loopCount"in t && e(5, v = t.loopCount)
        }
        ,
        t.$$.update = () => {
            1 & t.$$.dirty[0] && y && (r ? y.playerState || (y.isLooping = !!y.playbackRange,
            y.countInVolume = a ? 1 : 0,
            y.metronomeVolume = u ? c : 0,
            y.play(),
            A(),
            X(),
            a && (e(4, l = !0),
            setTimeout(( () => {
                y.playerPositionChanged.on(O)
            }
            )))) : y.playerState && (y.pause(),
            e(4, l = !1))),
            2 & t.$$.dirty[0] && s && S !== o && (y.timePosition = o),
            384 & t.$$.dirty[0] && X(),
            1024 & t.$$.dirty[0] && A(),
            2048 & t.$$.dirty[0] && function() {
                if (k = null,
                h)
                    e(2, d = ob.TO_SET_START),
                    y.pause(),
                    e(4, l = !1),
                    E = !0;
                else {
                    e(2, d = ob.OFF);
                    const t = y.getCurrentBeat();
                    t && (y.selectRange(t, t),
                    E && y.play()),
                    E = !1
                }
            }(),
            4 & t.$$.dirty[0] && dn("loopState", d)
        }
        ,
        [r, o, d, s, l, v, i, u, c, a, f, h]
    }
    class ub extends Ff {
        constructor(t) {
            super(),
            $f(this, t, sb, null, al, {
                player: 6,
                playing: 0,
                currentTime: 1,
                totalTime: 3,
                drumOn: 7,
                drumVolume: 8,
                countIn: 9,
                countingIn: 4,
                trackSettings: 10,
                loopOn: 11,
                loopState: 2,
                loopCount: 5
            }, [-1, -1])
        }
    }
    function cb(t, n, e) {
        const i = t.slice();
        return i[5] = n[e],
        i[14] = e,
        i
    }
    function ab(t, n, e) {
        const i = t.slice();
        return i[15] = n[e].name,
        i[16] = n[e].start,
        i[17] = n[e].duration,
        i[18] = n[e].id,
        i
    }
    function lb(t) {
        let n, e, i;
        return {
            c() {
                n = Xl("div"),
                e = Xl("div"),
                Dl(e, "class", "bgColor svelte-jql7sv"),
                Dl(n, "class", "barFg rangeStart svelte-jql7sv"),
                Dl(n, "style", i = Td({
                    width: t[7](t[14], t[2])
                }))
            },
            m(t, i) {
                Ol(t, n, i),
                Tl(n, e)
            },
            p(t, e) {
                4 & e && i !== (i = Td({
                    width: t[7](t[14], t[2])
                })) && Dl(n, "style", i)
            },
            d(t) {
                t && Cl(n)
            }
        }
    }
    function fb(t) {
        let n, e, i, r, o, s, u = t[15] + "";
        function c() {
            return t[10](t[16], t[18])
        }
        return {
            c() {
                n = Xl("div"),
                e = Il(u),
                i = _l(),
                Dl(n, "class", "section svelte-jql7sv"),
                Dl(n, "style", r = `width:${t[17] / (1 / t[6].length) * 100}%`)
            },
            m(t, r) {
                Ol(t, n, r),
                Tl(n, e),
                Tl(n, i),
                o || (s = Rl(n, "click", c),
                o = !0)
            },
            p(i, o) {
                t = i,
                64 & o && u !== (u = t[15] + "") && ql(e, u),
                64 & o && r !== (r = `width:${t[17] / (1 / t[6].length) * 100}%`) && Dl(n, "style", r)
            },
            d(t) {
                t && Cl(n),
                o = !1,
                s()
            }
        }
    }
    function hb(t) {
        let n, e, i, r, o, s, u, c, a, l, f, h, d = t[3] && lb(t), v = t[5], p = [];
        for (let n = 0; n < v.length; n += 1)
            p[n] = fb(ab(t, v, n));
        return {
            c() {
                n = Xl("div"),
                e = Xl("div"),
                i = _l(),
                r = Xl("div"),
                o = Xl("div"),
                s = _l(),
                u = Xl("div"),
                a = _l(),
                d && d.c(),
                l = _l(),
                f = Xl("div");
                for (let t = 0; t < p.length; t += 1)
                    p[t].c();
                h = _l(),
                Dl(e, "class", "barBg svelte-jql7sv"),
                Dl(o, "class", "bgColor svelte-jql7sv"),
                Dl(u, "class", "accentColor svelte-jql7sv"),
                Dl(r, "class", "barFg svelte-jql7sv"),
                Dl(r, "style", c = Td({
                    width: t[7](t[14], t[1])
                })),
                Dl(f, "class", "sections svelte-jql7sv"),
                Dl(n, "class", "container svelte-jql7sv"),
                Ll(n, "disabled", t[0]),
                Ll(n, "desktop", t[4])
            },
            m(t, c) {
                Ol(t, n, c),
                Tl(n, e),
                Tl(n, i),
                Tl(n, r),
                Tl(r, o),
                Tl(r, s),
                Tl(r, u),
                Tl(n, a),
                d && d.m(n, null),
                Tl(n, l),
                Tl(n, f);
                for (let t = 0; t < p.length; t += 1)
                    p[t].m(f, null);
                Tl(n, h)
            },
            p(t, e) {
                if (2 & e && c !== (c = Td({
                    width: t[7](t[14], t[1])
                })) && Dl(r, "style", c),
                t[3] ? d ? d.p(t, e) : (d = lb(t),
                d.c(),
                d.m(n, l)) : d && (d.d(1),
                d = null),
                320 & e) {
                    let n;
                    for (v = t[5],
                    n = 0; n < v.length; n += 1) {
                        const i = ab(t, v, n);
                        p[n] ? p[n].p(i, e) : (p[n] = fb(i),
                        p[n].c(),
                        p[n].m(f, null))
                    }
                    for (; n < p.length; n += 1)
                        p[n].d(1);
                    p.length = v.length
                }
                1 & e && Ll(n, "disabled", t[0]),
                16 & e && Ll(n, "desktop", t[4])
            },
            d(t) {
                t && Cl(n),
                d && d.d(),
                Al(p, t)
            }
        }
    }
    function db(t) {
        let n, e = t[6], i = [];
        for (let n = 0; n < e.length; n += 1)
            i[n] = hb(cb(t, e, n));
        return {
            c() {
                for (let t = 0; t < i.length; t += 1)
                    i[t].c();
                n = Ml()
            },
            m(t, e) {
                for (let n = 0; n < i.length; n += 1)
                    i[n].m(t, e);
                Ol(t, n, e)
            },
            p(t, [r]) {
                if (479 & r) {
                    let o;
                    for (e = t[6],
                    o = 0; o < e.length; o += 1) {
                        const s = cb(t, e, o);
                        i[o] ? i[o].p(s, r) : (i[o] = hb(s),
                        i[o].c(),
                        i[o].m(n.parentNode, n))
                    }
                    for (; o < i.length; o += 1)
                        i[o].d(1);
                    i.length = e.length
                }
            },
            i: el,
            o: el,
            d(t) {
                Al(i, t),
                t && Cl(n)
            }
        }
    }
    function vb(t) {
        t[0] && 0 === t[0].start || t.unshift({
            name: "",
            start: 0
        });
        for (let n = 0; n < t.length; ++n) {
            const e = t[n]
              , i = t[n + 1];
            e.duration = i ? i.start - e.start : 1 - e.start
        }
    }
    function pb(t, n, e) {
        let {disabled: i=!1} = n
          , {sections: r} = n
          , {progress: o=0} = n
          , {progressStart: s=0} = n
          , {rangeMode: u=!1} = n
          , {desktop: c=!1} = n
          , {horizontal: a=!1} = n;
        const l = rf();
        let f;
        function h(t, n) {
            i || l("change", {
                value: t,
                id: n
            })
        }
        return t.$$set = t => {
            "disabled"in t && e(0, i = t.disabled),
            "sections"in t && e(5, r = t.sections),
            "progress"in t && e(1, o = t.progress),
            "progressStart"in t && e(2, s = t.progressStart),
            "rangeMode"in t && e(3, u = t.rangeMode),
            "desktop"in t && e(4, c = t.desktop),
            "horizontal"in t && e(9, a = t.horizontal)
        }
        ,
        t.$$.update = () => {
            32 & t.$$.dirty && e(6, f = function(t) {
                if (!t)
                    return [];
                const n = document.documentElement.clientWidth >= 768
                  , e = !a && (n || t.length < 5) ? 1 : 2;
                vb(t);
                const i = [];
                let r = 1 / e
                  , o = []
                  , s = 0;
                for (const n of t)
                    s += n.duration,
                    s > r ? (n.duration -= s - r,
                    o.push(n),
                    i.push(o),
                    o = [{
                        name: "",
                        start: r,
                        duration: s - r,
                        id: n.id
                    }],
                    r += 1 / e) : o.push(n);
                return i.length < e && i.push(o),
                i
            }(r))
        }
        ,
        [i, o, s, u, c, r, f, function(t, n) {
            const e = 1 / f.length;
            return `calc(${(n - e * t) / e * 100}%${u ? "" : " + 5px"})`
        }
        , h, a, (t, n) => h(t, n)]
    }
    class mb extends Ff {
        constructor(t) {
            super(),
            $f(this, t, pb, db, al, {
                disabled: 0,
                sections: 5,
                progress: 1,
                progressStart: 2,
                rangeMode: 3,
                desktop: 4,
                horizontal: 9
            })
        }
    }
    function yb(t) {
        let n, e;
        return n = new mb({
            props: {
                desktop: t[2],
                progress: t[0] / t[1],
                sections: t[4],
                horizontal: t[3]
            }
        }),
        n.$on("change", t[5]),
        {
            c() {
                jf(n.$$.fragment)
            },
            m(t, i) {
                Bf(n, t, i),
                e = !0
            },
            p(t, [e]) {
                const i = {};
                4 & e && (i.desktop = t[2]),
                3 & e && (i.progress = t[0] / t[1]),
                16 & e && (i.sections = t[4]),
                8 & e && (i.horizontal = t[3]),
                n.$set(i)
            },
            i(t) {
                e || (Af(n.$$.fragment, t),
                e = !0)
            },
            o(t) {
                Xf(n.$$.fragment, t),
                e = !1
            },
            d(t) {
                Pf(n, t)
            }
        }
    }
    function gb(t, n, e) {
        let i, {currentTime: r=0} = n, {totalTime: o=0} = n, {player: s} = n, {desktop: u=!1} = n, {horizontal: c=!1} = n;
        const a = rf()
          , l = mt(( () => {
            const t = s.playbackSpeed
              , n = o * t;
            if (e(4, i = s.getMidiTickLookup().masterBars.filter(( ({masterBar: t}) => !!t.section)).map(( ({startMs: t, masterBar: e}) => ({
                name: e.section.text,
                start: t / n
            })))),
            0 === i.length) {
                const e = s.getMidiTickLookup().masterBars
                  , r = Math.ceil(e.length / 8);
                i.push(...e.filter(( ({masterBar: t}) => t.index % r == 0)).map(( ({startMs: e}) => ({
                    name: Hg(e / t / 1e3),
                    start: e / n
                }))))
            }
        }
        ), 1);
        return t.$$set = t => {
            "currentTime"in t && e(0, r = t.currentTime),
            "totalTime"in t && e(1, o = t.totalTime),
            "player"in t && e(6, s = t.player),
            "desktop"in t && e(2, u = t.desktop),
            "horizontal"in t && e(3, c = t.horizontal)
        }
        ,
        t.$$.update = () => {
            64 & t.$$.dirty && s && (s.player.isReadyForPlayback && l(),
            s.player.readyForPlayback.on(( () => {
                l()
            }
            )))
        }
        ,
        [r, o, u, c, i, function(t) {
            a("change", {
                value: t.detail.value * o
            })
        }
        , s]
    }
    class bb extends Ff {
        constructor(t) {
            super(),
            $f(this, t, gb, yb, al, {
                currentTime: 0,
                totalTime: 1,
                player: 6,
                desktop: 2,
                horizontal: 3
            })
        }
    }
    const wb = K.MINUTE;
    class xb {
        constructor(t, n, e) {
            this.$t = t,
            this.Ft = n,
            this.Nt = null,
            this.zt = !1,
            this.Lt = null,
            this.start(),
            this.Gt = !1,
            this.Ut = e,
            this.Ht = new St
        }
        start() {
            this.Vt(),
            this.zt || (this.Wt = setTimeout(( () => {
                this.Jt().then((t => {
                    t && this.start()
                }
                ))
            }
            ), wb))
        }
        end() {
            this.Vt(),
            this.Nt && !this.zt && this.Jt()
        }
        onChange(t) {
            this.Ht.add(t)
        }
        Vt() {
            this.Wt && (clearTimeout(this.Wt),
            this.Wt = null)
        }
        Jt() {
            if (this.Lt)
                return this.Lt;
            const t = this.$t
              , n = this.Ft
              , e = {
                code: t
            };
            return this.Nt && (e.t = M(this.Nt)),
            this.Lt = Dt(wt(pi, e), null, {
                silent: !0
            }).then((t => (t && (this.zt = !!t.v,
            this.Nt = JSON.stringify(t),
            this.Ht.fire(t.u),
            kb(n, t.u)),
            this.Lt = null,
            t))).catch(( () => {
                this.Lt = null
            }
            )),
            this.Gt ? na("keep-session") : (na("view-sheet", this.Ut),
            this.Gt = !0),
            this.Lt
        }
    }
    function kb(t, n) {
        const e = `练琴 ${Math.round(n / 60)} 分钟`;
        if (t) {
            const n = cn(t);
            n && (hn(n, !0),
            n.textContent = e)
        }
        Wt.setBoolean(Ut.USER_DATA_REPORT_STALE, !0)
    }
    const Sb = (t, n, e) => zf(null, (function(i) {
        if (e) {
            const e = new xb(t.id,null,{
                label: t.format + "/" + n,
                value: t.audio ? 1 : 0
            });
            i(0),
            e.onChange((t => {
                i(Math.round(t / 60))
            }
            ));
            const r = sf("webViewInterface");
            r.onPause(( () => e.end())),
            r.onResume(( () => e.start()))
        }
        return function() {}
    }
    ));
    function Eb(t) {
        let n;
        return {
            c() {
                n = Il("")
            },
            m(t, e) {
                Ol(t, n, e)
            },
            d(t) {
                t && Cl(n)
            }
        }
    }
    function Tb(t) {
        let n;
        return {
            c() {
                n = Il("")
            },
            m(t, e) {
                Ol(t, n, e)
            },
            d(t) {
                t && Cl(n)
            }
        }
    }
    function Ob(t) {
        let n, e, i, r, o, s, u, c, a, l, f, h, d, v;
        function p(n) {
            t[4](n)
        }
        let m = {
            color: "var(--color-accent)",
            disabled: t[0]
        };
        function y(t, n) {
            return t[0] ? Tb : Eb
        }
        void 0 !== t[1] && (m.value = t[1]),
        s = new Kg({
            props: m
        }),
        af.push(( () => Df(s, "value", p)));
        let g = y(t)
          , b = g(t);
        return {
            c() {
                n = Xl("div"),
                e = Xl("div"),
                i = Il(t[2]),
                r = _l(),
                o = Xl("div"),
                jf(s.$$.fragment),
                c = _l(),
                a = Xl("div"),
                l = Xl("span"),
                b.c(),
                Dl(e, "class", "name svelte-a29d7k"),
                Dl(o, "class", "content svelte-a29d7k"),
                Dl(l, "class", "icon yoopu3-icon svelte-a29d7k"),
                Dl(a, "class", "extend svelte-a29d7k"),
                Dl(n, "class", f = yl(t[3] ? "track-inline" : "track") + " svelte-a29d7k")
            },
            m(u, f) {
                Ol(u, n, f),
                Tl(n, e),
                Tl(e, i),
                Tl(n, r),
                Tl(n, o),
                Bf(s, o, null),
                Tl(n, c),
                Tl(n, a),
                Tl(a, l),
                b.m(l, null),
                h = !0,
                d || (v = Rl(l, "click", t[5]),
                d = !0)
            },
            p(t, [e]) {
                (!h || 4 & e) && ql(i, t[2]);
                const r = {};
                1 & e && (r.disabled = t[0]),
                !u && 2 & e && (u = !0,
                r.value = t[1],
                mf(( () => u = !1))),
                s.$set(r),
                g !== (g = y(t)) && (b.d(1),
                b = g(t),
                b && (b.c(),
                b.m(l, null))),
                (!h || 8 & e && f !== (f = yl(t[3] ? "track-inline" : "track") + " svelte-a29d7k")) && Dl(n, "class", f)
            },
            i(t) {
                h || (Af(s.$$.fragment, t),
                h = !0)
            },
            o(t) {
                Xf(s.$$.fragment, t),
                h = !1
            },
            d(t) {
                t && Cl(n),
                Pf(s),
                b.d(),
                d = !1,
                v()
            }
        }
    }
    function Cb(t, n, e) {
        let {name: i} = n
          , {muted: r} = n
          , {volume: o} = n
          , {inline: s=!0} = n;
        return t.$$set = t => {
            "name"in t && e(2, i = t.name),
            "muted"in t && e(0, r = t.muted),
            "volume"in t && e(1, o = t.volume),
            "inline"in t && e(3, s = t.inline)
        }
        ,
        [r, o, i, s, function(t) {
            o = t,
            e(1, o)
        }
        , () => e(0, r = !r)]
    }
    class Ab extends Ff {
        constructor(t) {
            super(),
            $f(this, t, Cb, Ob, al, {
                name: 2,
                muted: 0,
                volume: 1,
                inline: 3
            })
        }
    }
    function Xb(t, n, e) {
        const i = t.slice();
        return i[49] = n[e],
        i[50] = n,
        i[51] = e,
        i
    }
    function Ib(t) {
        let n, e, i, r, o, s;
        function u(n) {
            t[24](n)
        }
        function c(n) {
            t[25](n)
        }
        function a(n) {
            t[26](n)
        }
        function l(n) {
            t[27](n)
        }
        let f = {
            player: t[4],
            countIn: t[13],
            drumOn: t[15],
            drumVolume: t[16],
            trackSettings: t[1]
        };
        return void 0 !== t[7] && (f.playing = t[7]),
        void 0 !== t[14] && (f.countingIn = t[14]),
        void 0 !== t[10] && (f.currentTime = t[10]),
        void 0 !== t[11] && (f.totalTime = t[11]),
        n = new ub({
            props: f
        }),
        af.push(( () => Df(n, "playing", u))),
        af.push(( () => Df(n, "countingIn", c))),
        af.push(( () => Df(n, "currentTime", a))),
        af.push(( () => Df(n, "totalTime", l))),
        {
            c() {
                jf(n.$$.fragment)
            },
            m(t, e) {
                Bf(n, t, e),
                s = !0
            },
            p(t, s) {
                const u = {};
                16 & s[0] && (u.player = t[4]),
                8192 & s[0] && (u.countIn = t[13]),
                32768 & s[0] && (u.drumOn = t[15]),
                65536 & s[0] && (u.drumVolume = t[16]),
                2 & s[0] && (u.trackSettings = t[1]),
                !e && 128 & s[0] && (e = !0,
                u.playing = t[7],
                mf(( () => e = !1))),
                !i && 16384 & s[0] && (i = !0,
                u.countingIn = t[14],
                mf(( () => i = !1))),
                !r && 1024 & s[0] && (r = !0,
                u.currentTime = t[10],
                mf(( () => r = !1))),
                !o && 2048 & s[0] && (o = !0,
                u.totalTime = t[11],
                mf(( () => o = !1))),
                n.$set(u)
            },
            i(t) {
                s || (Af(n.$$.fragment, t),
                s = !0)
            },
            o(t) {
                Xf(n.$$.fragment, t),
                s = !1
            },
            d(t) {
                Pf(n, t)
            }
        }
    }
    function _b(t) {
        let n, e, i, r, o, s, u, c, a, l, f, h, d, v, p;
        return e = new eb({
            props: {
                icon: "",
                label: "音轨"
            }
        }),
        e.$on("click", t[28]),
        o = new eb({
            props: {
                label: "拍速",
                text: t[0]
            }
        }),
        o.$on("click", t[29]),
        c = new eb({
            props: {
                accent: t[13],
                icon: t[13] ? "" : "",
                label: "准备音"
            }
        }),
        c.$on("click", t[21]),
        f = new eb({
            props: {
                icon: "",
                label: "反复",
                size: "small"
            }
        }),
        f.$on("click", t[30]),
        v = new eb({
            props: {
                icon: "",
                label: "从头开始",
                size: "small"
            }
        }),
        v.$on("click", t[31]),
        {
            c() {
                n = Xl("div"),
                jf(e.$$.fragment),
                i = _l(),
                r = Xl("div"),
                jf(o.$$.fragment),
                s = _l(),
                u = Xl("div"),
                jf(c.$$.fragment),
                a = _l(),
                l = Xl("div"),
                jf(f.$$.fragment),
                h = _l(),
                d = Xl("div"),
                jf(v.$$.fragment),
                Dl(n, "class", "button-item svelte-uqhx9v"),
                Dl(r, "class", "button-item svelte-uqhx9v"),
                Dl(u, "class", "button-item svelte-uqhx9v"),
                Dl(l, "class", "button-item svelte-uqhx9v"),
                Dl(d, "class", "button-item svelte-uqhx9v")
            },
            m(t, m) {
                Ol(t, n, m),
                Bf(e, n, null),
                Ol(t, i, m),
                Ol(t, r, m),
                Bf(o, r, null),
                Ol(t, s, m),
                Ol(t, u, m),
                Bf(c, u, null),
                Ol(t, a, m),
                Ol(t, l, m),
                Bf(f, l, null),
                Ol(t, h, m),
                Ol(t, d, m),
                Bf(v, d, null),
                p = !0
            },
            p(t, n) {
                const e = {};
                1 & n[0] && (e.text = t[0]),
                o.$set(e);
                const i = {};
                8192 & n[0] && (i.accent = t[13]),
                8192 & n[0] && (i.icon = t[13] ? "" : ""),
                c.$set(i)
            },
            i(t) {
                p || (Af(e.$$.fragment, t),
                Af(o.$$.fragment, t),
                Af(c.$$.fragment, t),
                Af(f.$$.fragment, t),
                Af(v.$$.fragment, t),
                p = !0)
            },
            o(t) {
                Xf(e.$$.fragment, t),
                Xf(o.$$.fragment, t),
                Xf(c.$$.fragment, t),
                Xf(f.$$.fragment, t),
                Xf(v.$$.fragment, t),
                p = !1
            },
            d(t) {
                t && Cl(n),
                Pf(e),
                t && Cl(i),
                t && Cl(r),
                Pf(o),
                t && Cl(s),
                t && Cl(u),
                Pf(c),
                t && Cl(a),
                t && Cl(l),
                Pf(f),
                t && Cl(h),
                t && Cl(d),
                Pf(v)
            }
        }
    }
    function Mb(t) {
        let n, e, i, r, o;
        return {
            c() {
                n = Xl("span"),
                e = Il("已练习 "),
                i = Xl("strong"),
                r = Il(t[19]),
                o = Il(" 分钟"),
                Dl(i, "class", "svelte-uqhx9v"),
                Dl(n, "class", "time-display svelte-uqhx9v")
            },
            m(t, s) {
                Ol(t, n, s),
                Tl(n, e),
                Tl(n, i),
                Tl(i, r),
                Tl(n, o)
            },
            p(t, n) {
                524288 & n[0] && ql(r, t[19])
            },
            d(t) {
                t && Cl(n)
            }
        }
    }
    function Rb(t) {
        let n, e, i;
        return e = new qd({
            props: {
                theme: "secondary",
                $$slots: {
                    default: [Bb]
                },
                $$scope: {
                    ctx: t
                }
            }
        }),
        e.$on("click", t[32]),
        {
            c() {
                n = Xl("div"),
                jf(e.$$.fragment),
                Dl(n, "class", "jian-button")
            },
            m(t, r) {
                Ol(t, n, r),
                Bf(e, n, null),
                i = !0
            },
            p(t, n) {
                const i = {};
                4 & n[0] | 2097152 & n[1] && (i.$$scope = {
                    dirty: n,
                    ctx: t
                }),
                e.$set(i)
            },
            i(t) {
                i || (Af(e.$$.fragment, t),
                i = !0)
            },
            o(t) {
                Xf(e.$$.fragment, t),
                i = !1
            },
            d(t) {
                t && Cl(n),
                Pf(e)
            }
        }
    }
    function Db(t) {
        let n;
        return {
            c() {
                n = Il("显示简谱")
            },
            m(t, e) {
                Ol(t, n, e)
            },
            d(t) {
                t && Cl(n)
            }
        }
    }
    function jb(t) {
        let n;
        return {
            c() {
                n = Il("显示全谱")
            },
            m(t, e) {
                Ol(t, n, e)
            },
            d(t) {
                t && Cl(n)
            }
        }
    }
    function Bb(t) {
        let n;
        function e(t, n) {
            return t[2] ? jb : Db
        }
        let i = e(t)
          , r = i(t);
        return {
            c() {
                r.c(),
                n = Ml()
            },
            m(t, e) {
                r.m(t, e),
                Ol(t, n, e)
            },
            p(t, o) {
                i !== (i = e(t)) && (r.d(1),
                r = i(t),
                r && (r.c(),
                r.m(n.parentNode, n)))
            },
            d(t) {
                r.d(t),
                t && Cl(n)
            }
        }
    }
    function Pb(t) {
        let n;
        return {
            c() {
                n = Xl("div"),
                n.innerHTML = '<div class="text svelte-uqhx9v">准 备</div>',
                Dl(n, "class", "counting-in svelte-uqhx9v")
            },
            m(t, e) {
                Ol(t, n, e)
            },
            d(t) {
                t && Cl(n)
            }
        }
    }
    function qb(t) {
        let n, e, i, r, o, s, u, c, a, l, f, h, d, v, p, m, y, g, b, w, x = t[5].bpm + "";
        function k(n) {
            t[34](n)
        }
        let S = {
            color: "var(--color-accent)",
            grain: 1,
            max: 240,
            min: 30
        };
        return void 0 !== t[9] && (S.value = t[9]),
        s = new Kg({
            props: S
        }),
        af.push(( () => Df(s, "value", k))),
        {
            c() {
                n = Xl("div"),
                e = Il("拍速 "),
                i = Il(t[9]),
                r = Xl("sub"),
                r.textContent = "BPM",
                o = _l(),
                jf(s.$$.fragment),
                c = _l(),
                a = Xl("div"),
                l = Xl("span"),
                f = Il("原拍速"),
                h = Il(x),
                d = Il("BPM"),
                v = _l(),
                p = Xl("span"),
                p.textContent = "重置",
                m = _l(),
                y = Xl("br"),
                Dl(r, "class", "svelte-uqhx9v"),
                Dl(n, "title", ""),
                Dl(n, "class", "svelte-uqhx9v"),
                Dl(l, "class", "label svelte-uqhx9v"),
                Dl(p, "class", "clickable-text svelte-uqhx9v"),
                Dl(a, "class", "original-bpm svelte-uqhx9v")
            },
            m(u, x) {
                Ol(u, n, x),
                Tl(n, e),
                Tl(n, i),
                Tl(n, r),
                Ol(u, o, x),
                Bf(s, u, x),
                Ol(u, c, x),
                Ol(u, a, x),
                Tl(a, l),
                Tl(l, f),
                Tl(l, h),
                Tl(l, d),
                Tl(a, v),
                Tl(a, p),
                Ol(u, m, x),
                Ol(u, y, x),
                g = !0,
                b || (w = Rl(p, "click", t[35]),
                b = !0)
            },
            p(t, n) {
                (!g || 512 & n[0]) && ql(i, t[9]);
                const e = {};
                !u && 512 & n[0] && (u = !0,
                e.value = t[9],
                mf(( () => u = !1))),
                s.$set(e),
                (!g || 32 & n[0]) && x !== (x = t[5].bpm + "") && ql(h, x)
            },
            i(t) {
                g || (Af(s.$$.fragment, t),
                g = !0)
            },
            o(t) {
                Xf(s.$$.fragment, t),
                g = !1
            },
            d(t) {
                t && Cl(n),
                t && Cl(o),
                Pf(s, t),
                t && Cl(c),
                t && Cl(a),
                t && Cl(m),
                t && Cl(y),
                b = !1,
                w()
            }
        }
    }
    function $b(t) {
        let n, e, i, r;
        function o(n) {
            t[38](n, t[49])
        }
        function s(n) {
            t[39](n, t[49])
        }
        let u = {
            inline: !1,
            name: t[49].name
        };
        return void 0 !== t[49].muted && (u.muted = t[49].muted),
        void 0 !== t[49].volume && (u.volume = t[49].volume),
        n = new Ab({
            props: u
        }),
        af.push(( () => Df(n, "muted", o))),
        af.push(( () => Df(n, "volume", s))),
        {
            c() {
                jf(n.$$.fragment)
            },
            m(t, e) {
                Bf(n, t, e),
                r = !0
            },
            p(r, o) {
                t = r;
                const s = {};
                2 & o[0] && (s.name = t[49].name),
                !e && 2 & o[0] && (e = !0,
                s.muted = t[49].muted,
                mf(( () => e = !1))),
                !i && 2 & o[0] && (i = !0,
                s.volume = t[49].volume,
                mf(( () => i = !1))),
                n.$set(s)
            },
            i(t) {
                r || (Af(n.$$.fragment, t),
                r = !0)
            },
            o(t) {
                Xf(n.$$.fragment, t),
                r = !1
            },
            d(t) {
                Pf(n, t)
            }
        }
    }
    function Fb(t) {
        let n, e, i, r, o, s, u, c, a, l, f = t[1], h = [];
        for (let n = 0; n < f.length; n += 1)
            h[n] = $b(Xb(t, f, n));
        const d = t => Xf(h[t], 1, 1, ( () => {
            h[t] = null
        }
        ));
        function v(n) {
            t[40](n)
        }
        function p(n) {
            t[41](n)
        }
        let m = {
            inline: !1,
            name: "节拍器"
        };
        return void 0 !== t[8] && (m.muted = t[8]),
        void 0 !== t[16] && (m.volume = t[16]),
        o = new Ab({
            props: m
        }),
        af.push(( () => Df(o, "muted", v))),
        af.push(( () => Df(o, "volume", p))),
        {
            c() {
                n = Xl("div"),
                n.textContent = "音轨",
                e = _l(),
                i = Xl("div");
                for (let t = 0; t < h.length; t += 1)
                    h[t].c();
                r = _l(),
                jf(o.$$.fragment),
                c = _l(),
                a = Xl("br"),
                Dl(n, "title", ""),
                Dl(i, "class", "track-control-panel")
            },
            m(t, s) {
                Ol(t, n, s),
                Ol(t, e, s),
                Ol(t, i, s);
                for (let t = 0; t < h.length; t += 1)
                    h[t].m(i, null);
                Tl(i, r),
                Bf(o, i, null),
                Ol(t, c, s),
                Ol(t, a, s),
                l = !0
            },
            p(t, n) {
                if (2 & n[0]) {
                    let e;
                    for (f = t[1],
                    e = 0; e < f.length; e += 1) {
                        const o = Xb(t, f, e);
                        h[e] ? (h[e].p(o, n),
                        Af(h[e], 1)) : (h[e] = $b(o),
                        h[e].c(),
                        Af(h[e], 1),
                        h[e].m(i, r))
                    }
                    for (Of(),
                    e = f.length; e < h.length; e += 1)
                        d(e);
                    Cf()
                }
                const e = {};
                !s && 256 & n[0] && (s = !0,
                e.muted = t[8],
                mf(( () => s = !1))),
                !u && 65536 & n[0] && (u = !0,
                e.volume = t[16],
                mf(( () => u = !1))),
                o.$set(e)
            },
            i(t) {
                if (!l) {
                    for (let t = 0; t < f.length; t += 1)
                        Af(h[t]);
                    Af(o.$$.fragment, t),
                    l = !0
                }
            },
            o(t) {
                h = h.filter(Boolean);
                for (let t = 0; t < h.length; t += 1)
                    Xf(h[t]);
                Xf(o.$$.fragment, t),
                l = !1
            },
            d(t) {
                t && Cl(n),
                t && Cl(e),
                t && Cl(i),
                Al(h, t),
                Pf(o),
                t && Cl(c),
                t && Cl(a)
            }
        }
    }
    function Nb(t) {
        let n, e, i, r, o, s, u, c, a, l, f, h, d, v, p, m, y, g, b, w, x, k, S, E, T, O, C, A, X, I = Hg(t[10] / 1e3) + "", _ = Hg(t[11] / 1e3) + "", M = t[4] && Ib(t);
        r = new bb({
            props: {
                desktop: !0,
                currentTime: t[10],
                totalTime: t[11],
                player: t[4]
            }
        }),
        r.$on("change", t[22]);
        let R = !t[6] && _b(t)
          , D = t[3] && !t[6] && t[19] && Mb(t)
          , j = t[6] && t[5].use !== et.SOLO && Rb(t);
        x = new eb({
            props: {
                accent: !0,
                disabled: !t[12],
                icon: t[7] ? "" : ""
            }
        }),
        x.$on("click", t[33]);
        let B = t[14] && Pb();
        function P(n) {
            t[37](n)
        }
        let q = {
            action: t[36],
            $$slots: {
                default: [qb]
            },
            $$scope: {
                ctx: t
            }
        };
        function $(n) {
            t[42](n)
        }
        void 0 !== t[17] && (q.open = t[17]),
        E = new Hd({
            props: q
        }),
        af.push(( () => Df(E, "open", P)));
        let F = {
            noButtons: !0,
            cancelButtonText: "",
            $$slots: {
                default: [Fb]
            },
            $$scope: {
                ctx: t
            }
        };
        return void 0 !== t[18] && (F.open = t[18]),
        C = new Hd({
            props: F
        }),
        af.push(( () => Df(C, "open", $))),
        {
            c() {
                M && M.c(),
                n = _l(),
                e = Xl("div"),
                i = Xl("div"),
                jf(r.$$.fragment),
                o = _l(),
                s = Xl("div"),
                u = Xl("div"),
                R && R.c(),
                c = _l(),
                a = Xl("div"),
                D && D.c(),
                l = _l(),
                f = Xl("div"),
                h = Xl("span"),
                d = Il(I),
                v = _l(),
                p = Xl("span"),
                p.textContent = "/",
                m = _l(),
                y = Xl("span"),
                g = Il(_),
                b = _l(),
                j && j.c(),
                w = _l(),
                jf(x.$$.fragment),
                k = _l(),
                B && B.c(),
                S = _l(),
                jf(E.$$.fragment),
                O = _l(),
                jf(C.$$.fragment),
                Dl(i, "class", "slider svelte-uqhx9v"),
                Dl(u, "class", "buttons svelte-uqhx9v"),
                Dl(f, "class", "time svelte-uqhx9v"),
                Dl(a, "class", "right-buttons svelte-uqhx9v"),
                Dl(s, "class", "player-panel svelte-uqhx9v"),
                Dl(e, "class", "panel svelte-uqhx9v")
            },
            m(t, T) {
                M && M.m(t, T),
                Ol(t, n, T),
                Ol(t, e, T),
                Tl(e, i),
                Bf(r, i, null),
                Tl(e, o),
                Tl(e, s),
                Tl(s, u),
                R && R.m(u, null),
                Tl(s, c),
                Tl(s, a),
                D && D.m(a, null),
                Tl(a, l),
                Tl(a, f),
                Tl(f, h),
                Tl(h, d),
                Tl(f, v),
                Tl(f, p),
                Tl(f, m),
                Tl(f, y),
                Tl(y, g),
                Tl(a, b),
                j && j.m(a, null),
                Tl(a, w),
                Bf(x, a, null),
                Tl(e, k),
                B && B.m(e, null),
                Ol(t, S, T),
                Bf(E, t, T),
                Ol(t, O, T),
                Bf(C, t, T),
                X = !0
            },
            p(t, i) {
                t[4] ? M ? (M.p(t, i),
                16 & i[0] && Af(M, 1)) : (M = Ib(t),
                M.c(),
                Af(M, 1),
                M.m(n.parentNode, n)) : M && (Of(),
                Xf(M, 1, 1, ( () => {
                    M = null
                }
                )),
                Cf());
                const o = {};
                1024 & i[0] && (o.currentTime = t[10]),
                2048 & i[0] && (o.totalTime = t[11]),
                16 & i[0] && (o.player = t[4]),
                r.$set(o),
                t[6] ? R && (Of(),
                Xf(R, 1, 1, ( () => {
                    R = null
                }
                )),
                Cf()) : R ? (R.p(t, i),
                64 & i[0] && Af(R, 1)) : (R = _b(t),
                R.c(),
                Af(R, 1),
                R.m(u, null)),
                t[3] && !t[6] && t[19] ? D ? D.p(t, i) : (D = Mb(t),
                D.c(),
                D.m(a, l)) : D && (D.d(1),
                D = null),
                (!X || 1024 & i[0]) && I !== (I = Hg(t[10] / 1e3) + "") && ql(d, I),
                (!X || 2048 & i[0]) && _ !== (_ = Hg(t[11] / 1e3) + "") && ql(g, _),
                t[6] && t[5].use !== et.SOLO ? j ? (j.p(t, i),
                96 & i[0] && Af(j, 1)) : (j = Rb(t),
                j.c(),
                Af(j, 1),
                j.m(a, w)) : j && (Of(),
                Xf(j, 1, 1, ( () => {
                    j = null
                }
                )),
                Cf());
                const s = {};
                4096 & i[0] && (s.disabled = !t[12]),
                128 & i[0] && (s.icon = t[7] ? "" : ""),
                x.$set(s),
                t[14] ? B || (B = Pb(),
                B.c(),
                B.m(e, null)) : B && (B.d(1),
                B = null);
                const c = {};
                513 & i[0] && (c.action = t[36]),
                544 & i[0] | 2097152 & i[1] && (c.$$scope = {
                    dirty: i,
                    ctx: t
                }),
                !T && 131072 & i[0] && (T = !0,
                c.open = t[17],
                mf(( () => T = !1))),
                E.$set(c);
                const f = {};
                65794 & i[0] | 2097152 & i[1] && (f.$$scope = {
                    dirty: i,
                    ctx: t
                }),
                !A && 262144 & i[0] && (A = !0,
                f.open = t[18],
                mf(( () => A = !1))),
                C.$set(f)
            },
            i(t) {
                X || (Af(M),
                Af(r.$$.fragment, t),
                Af(R),
                Af(j),
                Af(x.$$.fragment, t),
                Af(E.$$.fragment, t),
                Af(C.$$.fragment, t),
                X = !0)
            },
            o(t) {
                Xf(M),
                Xf(r.$$.fragment, t),
                Xf(R),
                Xf(j),
                Xf(x.$$.fragment, t),
                Xf(E.$$.fragment, t),
                Xf(C.$$.fragment, t),
                X = !1
            },
            d(t) {
                M && M.d(t),
                t && Cl(n),
                t && Cl(e),
                Pf(r),
                R && R.d(),
                D && D.d(),
                j && j.d(),
                Pf(x),
                B && B.d(),
                t && Cl(S),
                Pf(E, t),
                t && Cl(O),
                Pf(C, t)
            }
        }
    }
    function zb(t, n, e) {
        let i, r;
        hl(t, Gf, (t => e(45, i = t)));
        let {user: o} = n
          , {player: s} = n
          , {tempo: u=0} = n
          , {trackSettings: c=[]} = n
          , {sheet: a} = n
          , {canFullPlay: l=!1} = n
          , {playButtonOnly: f=!1} = n
          , {jianMode: h=!1} = n;
        const d = sf("webviewInterface")
          , v = sf("synd");
        let p, m, y, g, b = u, w = !1, x = !1, k = !1, S = !1, E = !1, T = !E, O = !1, C = !1, A = !1;
        const X = Sb(a, null, !!o);
        hl(t, X, (t => e(19, r = t)));
        return t.$$set = t => {
            "user"in t && e(3, o = t.user),
            "player"in t && e(4, s = t.player),
            "tempo"in t && e(0, u = t.tempo),
            "trackSettings"in t && e(1, c = t.trackSettings),
            "sheet"in t && e(5, a = t.sheet),
            "canFullPlay"in t && e(23, l = t.canFullPlay),
            "playButtonOnly"in t && e(6, f = t.playButtonOnly),
            "jianMode"in t && e(2, h = t.jianMode)
        }
        ,
        t.$$.update = () => {
            256 & t.$$.dirty[0] && e(15, E = !T),
            //     128 & t.$$.dirty[0] && w && !l &&
            //     (g && clearTimeout(g),
            // g = setTimeout(( () => {
            //     e(7, w = !1),
            //     g = null,
            //     i !== Z.PIANO && (O = !0),
            //     _y(d, v, "有声谱播放")
            // }
            // ), O ? 1 : K.SECOND * (i === Z.PIANO ? 60 : 15))),
            16 & t.$$.dirty[0] && s && (e(12, x = s.isReadyForPlayback),
            s.playerReady.on(( () => {
                e(12, x = s.isReadyForPlayback)
            }
            )))
        }
        ,
        [u, c, h, o, s, a, f, w, T, b, p, m, x, k, S, E, y, C, A, r, X, function() {
            e(13, k = !k),
            k && (e(7, w = !1),
            setTimeout(( () => {
                e(7, w = !0)
            }
            ), 500))
        }
        , function(t) {
            e(10, p = 100 + t.detail.value)
        }
        , l, function(t) {
            w = t,
            e(7, w)
        }
        , function(t) {
            S = t,
            e(14, S)
        }
        , function(t) {
            p = t,
            e(10, p)
        }
        , function(t) {
            m = t,
            e(11, m)
        }
        , () => {
            e(18, A = !0)
        }
        , () => {
            e(17, C = !0)
        }
        , () => Cn.show("提示：用鼠标拖拽选择反复段落"), () => {
            w ? (e(7, w = !1),
            e(10, p = 0),
            setTimeout(( () => {
                e(7, w = !0)
            }
            ), 1)) : e(10, p = 0)
        }
        , () => e(2, h = !h), () => e(7, w = !w), function(t) {
            b = t,
            e(9, b)
        }
        , () => {
            e(9, b = a.bpm)
        }
        , t => (t ? e(0, u = b) : e(9, b = u),
        !0), function(t) {
            C = t,
            e(17, C)
        }
        , function(n, i) {
            t.$$.not_equal(i.muted, n) && (i.muted = n,
            e(1, c))
        }
        , function(n, i) {
            t.$$.not_equal(i.volume, n) && (i.volume = n,
            e(1, c))
        }
        , function(t) {
            T = t,
            e(8, T)
        }
        , function(t) {
            y = t,
            e(16, y)
        }
        , function(t) {
            A = t,
            e(18, A)
        }
        ]
    }
    class Lb extends Ff {
        constructor(t) {
            super(),
            $f(this, t, zb, Nb, al, {
                user: 3,
                player: 4,
                tempo: 0,
                trackSettings: 1,
                sheet: 5,
                canFullPlay: 23,
                playButtonOnly: 6,
                jianMode: 2
            }, [-1, -1])
        }
    }
    function Gb(t) {
        let n, e, i;
        return {
            c() {
                n = Xl("span"),
                n.innerHTML = '<span class="switch svelte-1y6q73r"></span>',
                Dl(n, "class", "container svelte-1y6q73r"),
                Ll(n, "on", t[0]),
                Ll(n, "disabled", t[1])
            },
            m(r, o) {
                Ol(r, n, o),
                e || (i = Rl(n, "click", t[2]),
                e = !0)
            },
            p(t, [e]) {
                1 & e && Ll(n, "on", t[0]),
                2 & e && Ll(n, "disabled", t[1])
            },
            i: el,
            o: el,
            d(t) {
                t && Cl(n),
                e = !1,
                i()
            }
        }
    }
    function Ub(t, n, e) {
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
    class Hb extends Ff {
        constructor(t) {
            super(),
            $f(this, t, Ub, Gb, al, {
                disabled: 1,
                on: 0
            })
        }
    }
    function Vb(t, n, e) {
        const i = t.slice();
        return i[7] = n[e],
        i
    }
    function Wb(t) {
        let n, e, i = t[7].icon + "";
        return {
            c() {
                n = Xl("span"),
                e = Il(i),
                Dl(n, "class", "icon yoopu3-icon svelte-xwwv1z")
            },
            m(t, i) {
                Ol(t, n, i),
                Tl(n, e)
            },
            p(t, n) {
                2 & n && i !== (i = t[7].icon + "") && ql(e, i)
            },
            d(t) {
                t && Cl(n)
            }
        }
    }
    function Jb(t) {
        let n, e, i = t[7].title + "";
        return {
            c() {
                n = Xl("span"),
                e = Il(i),
                Dl(n, "class", "title svelte-xwwv1z")
            },
            m(t, i) {
                Ol(t, n, i),
                Tl(n, e)
            },
            p(t, n) {
                2 & n && i !== (i = t[7].title + "") && ql(e, i)
            },
            d(t) {
                t && Cl(n)
            }
        }
    }
    function Kb(t) {
        let n, e, i, r, o, s = t[7].icon && Wb(t), u = t[7].title && Jb(t);
        function c() {
            return t[6](t[7])
        }
        return {
            c() {
                n = Xl("button"),
                s && s.c(),
                e = _l(),
                u && u.c(),
                i = _l(),
                Dl(n, "class", "option svelte-xwwv1z"),
                n.disabled = t[5],
                Ll(n, "selected", t[7].value == t[0])
            },
            m(t, a) {
                Ol(t, n, a),
                s && s.m(n, null),
                Tl(n, e),
                u && u.m(n, null),
                Tl(n, i),
                r || (o = Rl(n, "click", c),
                r = !0)
            },
            p(r, o) {
                (t = r)[7].icon ? s ? s.p(t, o) : (s = Wb(t),
                s.c(),
                s.m(n, e)) : s && (s.d(1),
                s = null),
                t[7].title ? u ? u.p(t, o) : (u = Jb(t),
                u.c(),
                u.m(n, i)) : u && (u.d(1),
                u = null),
                32 & o && (n.disabled = t[5]),
                3 & o && Ll(n, "selected", t[7].value == t[0])
            },
            d(t) {
                t && Cl(n),
                s && s.d(),
                u && u.d(),
                r = !1,
                o()
            }
        }
    }
    function Yb(t) {
        let n, e = t[1], i = [];
        for (let n = 0; n < e.length; n += 1)
            i[n] = Kb(Vb(t, e, n));
        return {
            c() {
                n = Xl("div");
                for (let t = 0; t < i.length; t += 1)
                    i[t].c();
                Dl(n, "class", "toggle-button svelte-xwwv1z"),
                Ll(n, "white", t[2]),
                Ll(n, "gray", t[3]),
                Ll(n, "small", "small" == t[4])
            },
            m(t, e) {
                Ol(t, n, e);
                for (let t = 0; t < i.length; t += 1)
                    i[t].m(n, null)
            },
            p(t, [r]) {
                if (35 & r) {
                    let o;
                    for (e = t[1],
                    o = 0; o < e.length; o += 1) {
                        const s = Vb(t, e, o);
                        i[o] ? i[o].p(s, r) : (i[o] = Kb(s),
                        i[o].c(),
                        i[o].m(n, null))
                    }
                    for (; o < i.length; o += 1)
                        i[o].d(1);
                    i.length = e.length
                }
                4 & r && Ll(n, "white", t[2]),
                8 & r && Ll(n, "gray", t[3]),
                16 & r && Ll(n, "small", "small" == t[4])
            },
            i: el,
            o: el,
            d(t) {
                t && Cl(n),
                Al(i, t)
            }
        }
    }
    function Qb(t, n, e) {
        let {options: i=[]} = n
          , {selected: r} = n
          , {white: o=!1} = n
          , {gray: s=!1} = n
          , {size: u=""} = n
          , {disabled: c=!1} = n;
        return t.$$set = t => {
            "options"in t && e(1, i = t.options),
            "selected"in t && e(0, r = t.selected),
            "white"in t && e(2, o = t.white),
            "gray"in t && e(3, s = t.gray),
            "size"in t && e(4, u = t.size),
            "disabled"in t && e(5, c = t.disabled)
        }
        ,
        [r, i, o, s, u, c, t => e(0, r = t.value)]
    }
    class Zb extends Ff {
        constructor(t) {
            super(),
            $f(this, t, Qb, Yb, al, {
                options: 1,
                selected: 0,
                white: 2,
                gray: 3,
                size: 4,
                disabled: 5
            })
        }
    }
    class tw {
        constructor() {
            this.Kt = null
        }
        start(t, n, e, i) {
            this.pause(),
            this.Yt = t,
            this.Qt = n || 1,
            this.Zt = e,
            this.tn = !!i,
            this.resume()
        }
        stop() {
            this.pause(),
            this.Yt = null
        }
        pause(t=0) {
            this.nn(),
            this.en && (clearInterval(this.en),
            this.en = null),
            t && (this.Kt = setTimeout(( () => {
                this.resume()
            }
            ), t))
        }
        resume() {
            if (this.nn(),
            this.Yt) {
                const t = 1e3 / (2 + this.Yt) / this.Qt;
                this.en = setInterval(( () => {
                    if (this.Zt.scrollBy)
                        this.tn ? this.Zt.scrollBy(1, 0) : this.Zt.scrollBy(0, 1);
                    else if (this.tn) {
                        const t = this.Zt instanceof Window ? this.Zt.scrollX : this.Zt.scrollLeft;
                        this.Zt.scrollTo(t + 1, 0)
                    } else {
                        const t = this.Zt instanceof Window ? this.Zt.scrollY : this.Zt.scrollTop;
                        this.Zt.scrollTo(0, t + 1)
                    }
                }
                ), t)
            }
        }
        nn() {
            this.Kt && (clearTimeout(this.Kt),
            this.Kt = null)
        }
    }
    class nw {
        constructor() {
            this.rn = null
        }
        isPlaying() {
            return !!this.rn
        }
        play(t) {
            this.stop(),
            this.sn(),
            this.rn = setInterval(this.sn.bind(this), K.MINUTE / t)
        }
        stop() {
            this.rn && (clearInterval(this.rn),
            this.rn = null,
            vn("metronome-beat", !1))
        }
        sn() {
            vn("metronome-beat", !0),
            setTimeout(( () => {
                vn("metronome-beat", !1)
            }
            ), 200)
        }
    }
    const ew = zt("DrumManager")
      , iw = {
        STARTED: "started",
        PAUSED: "paused",
        STOPPED: "stopped"
    };
    class rw {
        constructor(t) {
            this.un = t.audioContextProvider,
            this.cn = new t.XiatMetronome,
            this.an = new t.XiatDrum,
            this.sn = new nw,
            this.ln = 80,
            this.hn = iw.STOPPED,
            this.dn = null,
            this.vn = lt.METRONOME,
            this.pn = null
        }
        setDrumType(t) {
            this.vn = t || lt.METRONOME
        }
        play(t, n) {
            if (t && (this.ln = t),
            this.start(),
            n)
                return this.pn = yt(n),
                this.pn.then(( () => {
                    this.pn = null,
                    this.stop()
                }
                ))
        }
        start() {
            this.stop(),
            ew("drum start"),
            this.un.get(),
            this.dn = yt(500);
            this.vn === lt.METRONOME ? this.dn.then(( () => {
                this.cn.play(this.ln),
                this.sn.play(this.ln),
                this.dn = null
            }
            )) : Promise.all([this.dn, this.an.initializeAudio()]).then(( () => {
                switch (this.sn.play(this.ln),
                this.vn) {
                case lt.BASIC_4:
                    this.an.play({
                        tempo: this.ln,
                        rhythms: "BASIC_4"
                    });
                    break;
                case lt.BASIC_3:
                    this.an.play({
                        tempo: this.ln,
                        rhythms: "BASIC_3",
                        beats: 3,
                        notesPerBeat: 2
                    })
                }
                this.dn = null
            }
            ), (t => {
                Cn.error(t.message)
            }
            )),
            this.hn = iw.STARTED
        }
        pause() {
            this.hn === iw.STARTED && (this.stop(),
            this.hn = iw.PAUSED)
        }
        resume() {
            this.hn === iw.PAUSED && this.start()
        }
        stop() {
            this.pn && (this.pn.cancel(),
            this.pn = null),
            this.dn && (this.dn.cancel(),
            this.dn = null),
            this.cn.isPlaying() && (ew("drum stop"),
            this.cn.stop()),
            this.an.isPlaying() && (ew("drum stop"),
            this.an.stop()),
            this.sn.isPlaying() && this.sn.stop(),
            this.hn = iw.STOPPED
        }
    }
    function ow(t) {
        return 0 === Object.keys(t).length
    }
    const sw = 70
      , uw = 8;
    function cw(t) {
        return {
            instrument: Si() || t.type,
            keyShift: 0,
            capo: t.capo || 0,
            scrollSpeed: uw,
            tempo: lw(t)
        }
    }
    async function aw(t, {scrollSpeed: n, tempo: e, capo: i, keyShift: r, customMeta: o}) {
        const s = t.id;
        let u = {
            scrollSpeed: n,
            tempo: e,
            capo: i,
            keyShift: r,
            customMeta: o
        };
        null != n && n !== uw || delete u.scrollSpeed;
        const c = lw(t);
        null != e && e !== c || delete u.tempo;
        const a = t.capo || 0;
        null != i && i !== a || delete u.capo,
        r || delete u.keyShift,
        o && o.trim() || delete u.customMeta,
        u = ow(u) ? null : u;
        await Fa(s, u) && (u ? t.settings = u : delete t.settings)
    }
    function lw(t) {
        return t && t.bpm || sw
    }
    function fw(t) {
        let n, e;
        return n = new mb({
            props: {
                desktop: t[0],
                rangeMode: !0,
                progress: t[4],
                progressStart: t[3],
                sections: t[2],
                horizontal: t[1]
            }
        }),
        n.$on("change", t[5]),
        {
            c() {
                jf(n.$$.fragment)
            },
            m(t, i) {
                Bf(n, t, i),
                e = !0
            },
            p(t, e) {
                const i = {};
                1 & e && (i.desktop = t[0]),
                16 & e && (i.progress = t[4]),
                8 & e && (i.progressStart = t[3]),
                4 & e && (i.sections = t[2]),
                2 & e && (i.horizontal = t[1]),
                n.$set(i)
            },
            i(t) {
                e || (Af(n.$$.fragment, t),
                e = !0)
            },
            o(t) {
                Xf(n.$$.fragment, t),
                e = !1
            },
            d(t) {
                Pf(n, t)
            }
        }
    }
    function hw(t) {
        let n, e, i = t[2].length > 1 && fw(t);
        return {
            c() {
                i && i.c(),
                n = Ml()
            },
            m(t, r) {
                i && i.m(t, r),
                Ol(t, n, r),
                e = !0
            },
            p(t, [e]) {
                t[2].length > 1 ? i ? (i.p(t, e),
                4 & e && Af(i, 1)) : (i = fw(t),
                i.c(),
                Af(i, 1),
                i.m(n.parentNode, n)) : i && (Of(),
                Xf(i, 1, 1, ( () => {
                    i = null
                }
                )),
                Cf())
            },
            i(t) {
                e || (Af(i),
                e = !0)
            },
            o(t) {
                Xf(i),
                e = !1
            },
            d(t) {
                i && i.d(t),
                t && Cl(n)
            }
        }
    }
    function dw(t, n, e) {
        let {element: i} = n
          , {sheetRenderCompleteCount: r} = n
          , {scrollValue: o=0} = n
          , {desktop: s=!1} = n
          , {horizontal: u=!1} = n;
        const c = rf();
        let a, l, f, h, d, v = [], p = {};
        return t.$$set = t => {
            "element"in t && e(6, i = t.element),
            "sheetRenderCompleteCount"in t && e(7, r = t.sheetRenderCompleteCount),
            "scrollValue"in t && e(8, o = t.scrollValue),
            "desktop"in t && e(0, s = t.desktop),
            "horizontal"in t && e(1, u = t.horizontal)
        }
        ,
        t.$$.update = () => {
            130 & t.$$.dirty && function() {
                const {top: t, left: n, width: r, height: s} = i.getBoundingClientRect();
                e(9, a = u ? n + o : t + o),
                e(10, l = u ? r : s),
                e(11, f = u ? document.documentElement.clientWidth : document.documentElement.clientHeight - 100),
                p = {};
                const c = ln(i, "xhe-headline");
                e(2, v = c.map(( (e, i) => {
                    p[i] = e;
                    const r = e.getBoundingClientRect();
                    return {
                        name: e.textContent,
                        start: (u ? r.left - n : r.top - t) / l,
                        id: i
                    }
                }
                )))
            }(),
            3840 & t.$$.dirty && function() {
                const t = o - a
                  , n = t + f;
                e(3, h = Math.max(t / l, 0)),
                e(4, d = Math.min(n / l, 1))
            }()
        }
        ,
        [s, u, v, h, d, function(t) {
            const {id: n, value: e} = t.detail
              , i = u ? 50 : 150
              , r = Math.max(e * l + a - i, 0)
              , o = p[n];
            o && (o.classList.add("highlight"),
            setTimeout(( () => {
                o.classList.remove("highlight")
            }
            ), 2 * K.SECOND)),
            c("change", {
                value: r
            })
        }
        , i, r, o, a, l, f]
    }
    class vw extends Ff {
        constructor(t) {
            super(),
            $f(this, t, dw, hw, al, {
                element: 6,
                sheetRenderCompleteCount: 7,
                scrollValue: 8,
                desktop: 0,
                horizontal: 1
            })
        }
    }
    function pw(t) {
        let n, e;
        return n = new eb({
            props: {
                icon: t[6] ? "" : "",
                label: "滚屏"
            }
        }),
        {
            c() {
                jf(n.$$.fragment)
            },
            m(t, i) {
                Bf(n, t, i),
                e = !0
            },
            p(t, e) {
                const i = {};
                64 & e[0] && (i.icon = t[6] ? "" : ""),
                n.$set(i)
            },
            i(t) {
                e || (Af(n.$$.fragment, t),
                e = !0)
            },
            o(t) {
                Xf(n.$$.fragment, t),
                e = !1
            },
            d(t) {
                Pf(n, t)
            }
        }
    }
    function mw(t) {
        let n, e, i, r, o, s, u, c, a, l, f, h, d, v, p, m, y, g, b, w, x, k, S;
        function E(n) {
            t[20](n)
        }
        let T = {};
        function O(n) {
            t[22](n)
        }
        void 0 !== t[6] && (T.on = t[6]),
        s = new Hb({
            props: T
        }),
        af.push(( () => Df(s, "on", E)));
        let C = {
            color: "var(--color-accent)",
            disabled: !t[6],
            grain: 1,
            max: 20,
            min: 1
        };
        return void 0 !== t[1] && (C.value = t[1]),
        b = new Kg({
            props: C
        }),
        af.push(( () => Df(b, "value", O))),
        {
            c() {
                n = Xl("div"),
                e = Xl("div"),
                i = Xl("div"),
                r = Xl("div"),
                r.textContent = "滚屏",
                o = _l(),
                jf(s.$$.fragment),
                c = _l(),
                a = Xl("div"),
                l = Xl("div"),
                f = Xl("lable"),
                f.textContent = "速度",
                h = _l(),
                d = Xl("span"),
                v = Il(t[1]),
                p = _l(),
                m = Xl("button"),
                m.innerHTML = "<span>重置</span>",
                y = _l(),
                g = Xl("div"),
                jf(b.$$.fragment),
                Dl(r, "class", "title svelte-d7ea7e"),
                Dl(i, "class", "title-line svelte-d7ea7e"),
                Dl(e, "class", "row-title svelte-d7ea7e"),
                Dl(l, "class", "tempo"),
                Dl(m, "class", "button-reset svelte-d7ea7e"),
                Dl(a, "class", "row svelte-d7ea7e"),
                Dl(g, "class", "row-slider svelte-d7ea7e"),
                Dl(n, "class", "tempo-setting svelte-d7ea7e"),
                Dl(n, "slot", "content")
            },
            m(u, w) {
                Ol(u, n, w),
                Tl(n, e),
                Tl(e, i),
                Tl(i, r),
                Tl(i, o),
                Bf(s, i, null),
                Tl(n, c),
                Tl(n, a),
                Tl(a, l),
                Tl(l, f),
                Tl(l, h),
                Tl(l, d),
                Tl(d, v),
                Tl(a, p),
                Tl(a, m),
                Tl(n, y),
                Tl(n, g),
                Bf(b, g, null),
                x = !0,
                k || (S = Rl(m, "click", t[21]),
                k = !0)
            },
            p(t, n) {
                const e = {};
                !u && 64 & n[0] && (u = !0,
                e.on = t[6],
                mf(( () => u = !1))),
                s.$set(e),
                (!x || 2 & n[0]) && ql(v, t[1]);
                const i = {};
                64 & n[0] && (i.disabled = !t[6]),
                !w && 2 & n[0] && (w = !0,
                i.value = t[1],
                mf(( () => w = !1))),
                b.$set(i)
            },
            i(t) {
                x || (Af(s.$$.fragment, t),
                Af(b.$$.fragment, t),
                x = !0)
            },
            o(t) {
                Xf(s.$$.fragment, t),
                Xf(b.$$.fragment, t),
                x = !1
            },
            d(t) {
                t && Cl(n),
                Pf(s),
                Pf(b),
                k = !1,
                S()
            }
        }
    }
    function yw(t) {
        let n, e;
        return n = new eb({
            props: {
                icon: t[7] ? "" : "",
                label: "节奏音"
            }
        }),
        {
            c() {
                jf(n.$$.fragment)
            },
            m(t, i) {
                Bf(n, t, i),
                e = !0
            },
            p(t, e) {
                const i = {};
                128 & e[0] && (i.icon = t[7] ? "" : ""),
                n.$set(i)
            },
            i(t) {
                e || (Af(n.$$.fragment, t),
                e = !0)
            },
            o(t) {
                Xf(n.$$.fragment, t),
                e = !1
            },
            d(t) {
                Pf(n, t)
            }
        }
    }
    function gw(t) {
        let n, e, i, r, o, s, u, c, a, l, f, h, d, v, p, m, y, g, b, w, x, k, S, E, T, O, C, A, X, I, _;
        function M(n) {
            t[23](n)
        }
        let R = {};
        function D(n) {
            t[25](n)
        }
        void 0 !== t[7] && (R.on = t[7]),
        s = new Hb({
            props: R
        }),
        af.push(( () => Df(s, "on", M)));
        let j = {
            class: "slider",
            color: "var(--color-accent)",
            disabled: !t[7],
            grain: 1,
            max: 200,
            min: 60
        };
        function B(n) {
            t[26](n)
        }
        void 0 !== t[0] && (j.value = t[0]),
        x = new Kg({
            props: j
        }),
        af.push(( () => Df(x, "value", D)));
        let P = {
            disabled: !t[7],
            options: t[13]
        };
        return void 0 !== t[8] && (P.selected = t[8]),
        C = new Zb({
            props: P
        }),
        af.push(( () => Df(C, "selected", B))),
        {
            c() {
                n = Xl("div"),
                e = Xl("div"),
                i = Xl("div"),
                r = Xl("div"),
                r.textContent = "节奏音",
                o = _l(),
                jf(s.$$.fragment),
                c = _l(),
                a = Xl("div"),
                l = Xl("div"),
                f = Xl("lable"),
                f.textContent = "拍速",
                h = _l(),
                d = Xl("span"),
                v = Il(t[0]),
                p = _l(),
                m = Xl("sub"),
                m.textContent = "BPM",
                y = _l(),
                g = Xl("button"),
                g.innerHTML = "<span>重置</span>",
                b = _l(),
                w = Xl("div"),
                jf(x.$$.fragment),
                S = _l(),
                E = Xl("div"),
                T = Xl("div"),
                T.textContent = "节奏",
                O = _l(),
                jf(C.$$.fragment),
                Dl(r, "class", "title svelte-d7ea7e"),
                Dl(i, "class", "title-line svelte-d7ea7e"),
                Dl(e, "class", "row-title svelte-d7ea7e"),
                Dl(m, "class", "svelte-d7ea7e"),
                Dl(l, "class", "tempo svelte-d7ea7e"),
                Dl(g, "class", "button-reset svelte-d7ea7e"),
                Dl(a, "class", "row svelte-d7ea7e"),
                Dl(w, "class", "row-slider svelte-d7ea7e"),
                Dl(T, "class", "label svelte-d7ea7e"),
                Dl(E, "class", "row svelte-d7ea7e"),
                Dl(n, "class", "drum-setting svelte-d7ea7e"),
                Dl(n, "slot", "content")
            },
            m(u, k) {
                Ol(u, n, k),
                Tl(n, e),
                Tl(e, i),
                Tl(i, r),
                Tl(i, o),
                Bf(s, i, null),
                Tl(n, c),
                Tl(n, a),
                Tl(a, l),
                Tl(l, f),
                Tl(l, h),
                Tl(l, d),
                Tl(d, v),
                Tl(d, p),
                Tl(d, m),
                Tl(a, y),
                Tl(a, g),
                Tl(n, b),
                Tl(n, w),
                Bf(x, w, null),
                Tl(n, S),
                Tl(n, E),
                Tl(E, T),
                Tl(E, O),
                Bf(C, E, null),
                X = !0,
                I || (_ = Rl(g, "click", t[24]),
                I = !0)
            },
            p(t, n) {
                const e = {};
                !u && 128 & n[0] && (u = !0,
                e.on = t[7],
                mf(( () => u = !1))),
                s.$set(e),
                (!X || 1 & n[0]) && ql(v, t[0]);
                const i = {};
                128 & n[0] && (i.disabled = !t[7]),
                !k && 1 & n[0] && (k = !0,
                i.value = t[0],
                mf(( () => k = !1))),
                x.$set(i);
                const r = {};
                128 & n[0] && (r.disabled = !t[7]),
                !A && 256 & n[0] && (A = !0,
                r.selected = t[8],
                mf(( () => A = !1))),
                C.$set(r)
            },
            i(t) {
                X || (Af(s.$$.fragment, t),
                Af(x.$$.fragment, t),
                Af(C.$$.fragment, t),
                X = !0)
            },
            o(t) {
                Xf(s.$$.fragment, t),
                Xf(x.$$.fragment, t),
                Xf(C.$$.fragment, t),
                X = !1
            },
            d(t) {
                t && Cl(n),
                Pf(s),
                Pf(x),
                Pf(C),
                I = !1,
                _()
            }
        }
    }
    function bw(t) {
        let n, e, i, r, o;
        return {
            c() {
                n = Xl("span"),
                e = Il("已练习 "),
                i = Xl("strong"),
                r = Il(t[10]),
                o = Il(" 分钟"),
                Dl(i, "class", "svelte-d7ea7e"),
                Dl(n, "class", "time-display svelte-d7ea7e")
            },
            m(t, s) {
                Ol(t, n, s),
                Tl(n, e),
                Tl(n, i),
                Tl(i, r),
                Tl(n, o)
            },
            p(t, n) {
                1024 & n[0] && ql(r, t[10])
            },
            d(t) {
                t && Cl(n)
            }
        }
    }
    function ww(t) {
        let n, e, i, r, o, s, u, c, a, l, f, h, d, v, p, m, y, g;
        e = new vw({
            props: {
                desktop: !0,
                element: t[3],
                scrollY: t[9],
                sheetRenderCompleteCount: t[4]
            }
        }),
        e.$on("change", t[15]),
        u = new oy({
            props: {
                $$slots: {
                    content: [mw],
                    default: [pw]
                },
                $$scope: {
                    ctx: t
                }
            }
        }),
        l = new oy({
            props: {
                $$slots: {
                    content: [gw],
                    default: [yw]
                },
                $$scope: {
                    ctx: t
                }
            }
        }),
        d = new eb({
            props: {
                icon: "",
                label: "全屏"
            }
        }),
        d.$on("click", t[27]);
        let b = t[2] && t[10] && bw(t);
        return y = new eb({
            props: {
                disabled: !t[7] && !t[6],
                accent: !0,
                icon: t[5] ? "" : ""
            }
        }),
        y.$on("click", t[28]),
        {
            c() {
                n = Xl("div"),
                jf(e.$$.fragment),
                i = _l(),
                r = Xl("div"),
                o = Xl("div"),
                s = Xl("div"),
                jf(u.$$.fragment),
                c = _l(),
                a = Xl("div"),
                jf(l.$$.fragment),
                f = _l(),
                h = Xl("div"),
                jf(d.$$.fragment),
                v = _l(),
                p = Xl("div"),
                b && b.c(),
                m = _l(),
                jf(y.$$.fragment),
                Dl(n, "class", "progress-bar svelte-d7ea7e"),
                Dl(s, "class", "button-item svelte-d7ea7e"),
                Dl(a, "class", "button-item svelte-d7ea7e"),
                Dl(h, "class", "button-item svelte-d7ea7e"),
                Dl(o, "class", "buttons svelte-d7ea7e"),
                Dl(p, "class", "right-buttons svelte-d7ea7e"),
                Dl(r, "class", "player-panel svelte-d7ea7e")
            },
            m(t, w) {
                Ol(t, n, w),
                Bf(e, n, null),
                Ol(t, i, w),
                Ol(t, r, w),
                Tl(r, o),
                Tl(o, s),
                Bf(u, s, null),
                Tl(o, c),
                Tl(o, a),
                Bf(l, a, null),
                Tl(o, f),
                Tl(o, h),
                Bf(d, h, null),
                Tl(r, v),
                Tl(r, p),
                b && b.m(p, null),
                Tl(p, m),
                Bf(y, p, null),
                g = !0
            },
            p(t, n) {
                const i = {};
                8 & n[0] && (i.element = t[3]),
                512 & n[0] && (i.scrollY = t[9]),
                16 & n[0] && (i.sheetRenderCompleteCount = t[4]),
                e.$set(i);
                const r = {};
                66 & n[0] | 256 & n[1] && (r.$$scope = {
                    dirty: n,
                    ctx: t
                }),
                u.$set(r);
                const o = {};
                385 & n[0] | 256 & n[1] && (o.$$scope = {
                    dirty: n,
                    ctx: t
                }),
                l.$set(o),
                t[2] && t[10] ? b ? b.p(t, n) : (b = bw(t),
                b.c(),
                b.m(p, m)) : b && (b.d(1),
                b = null);
                const s = {};
                192 & n[0] && (s.disabled = !t[7] && !t[6]),
                32 & n[0] && (s.icon = t[5] ? "" : ""),
                y.$set(s)
            },
            i(t) {
                g || (Af(e.$$.fragment, t),
                Af(u.$$.fragment, t),
                Af(l.$$.fragment, t),
                Af(d.$$.fragment, t),
                Af(y.$$.fragment, t),
                g = !0)
            },
            o(t) {
                Xf(e.$$.fragment, t),
                Xf(u.$$.fragment, t),
                Xf(l.$$.fragment, t),
                Xf(d.$$.fragment, t),
                Xf(y.$$.fragment, t),
                g = !1
            },
            d(t) {
                t && Cl(n),
                Pf(e),
                t && Cl(i),
                t && Cl(r),
                Pf(u),
                Pf(l),
                Pf(d),
                b && b.d(),
                Pf(y)
            }
        }
    }
    const xw = 8;
    function kw(t, n, e) {
        let i;
        const r = rf();
        let {scrollElement: o} = n
          , {tempo: s} = n
          , {chordStyle: u} = n
          , {zoom: c} = n
          , {scrollSpeed: a=xw} = n
          , {sheet: l} = n
          , {user: f} = n
          , {xheElement: h} = n
          , {sheetRenderCompleteCount: d} = n;
        const v = sf("webviewInterface")
          , p = sf("synd")
          , m = l.bpm || sw
          , y = [{
            value: lt.METRONOME,
            title: "嘟嘟"
        }, {
            value: lt.BASIC_4,
            title: "动次打次"
        }, {
            value: lt.BASIC_3,
            title: "蹦擦擦"
        }]
          , g = new tw;
        let b, w = !1, x = !1, k = !0, S = !0, E = lt.METRONOME, T = window.scrollY;
        const O = Sb(l, null, !!f);
        function C() {
            g && (w && k ? g.start(a, function({chordStyle: t, zoom: n}) {
                return t === rt.INLINE ? 1.2 + .3 * n : .8 + .2 * n
            }({
                chordStyle: u,
                zoom: c
            }), o) : g.stop())
        }
        function A() {
            w && S ? async function(t, n) {
                const e = await async function() {
                    if (!b) {
                        const t = await Da(_a);
                        b = new rw(t)
                    }
                    return b
                }();
                e.setDrumType(t),
                na("play-drum", {
                    label: t
                });
                const i = f && f.isMember;
                t === lt.METRONOME || i ? e.play(n) : (await e.play(n, x ? 10 * K.SECOND : 30 * K.SECOND),
                x = !0,
                await _y(v, p, "鼓机"))
            }(E, s) : b && b.stop()
        }
        hl(t, O, (t => e(10, i = t))),
        Ea(o, Sa.SCROLL, ( () => {
            e(9, T = o.scrollTop)
        }
        ));
        return t.$$set = t => {
            "scrollElement"in t && e(16, o = t.scrollElement),
            "tempo"in t && e(0, s = t.tempo),
            "chordStyle"in t && e(17, u = t.chordStyle),
            "zoom"in t && e(18, c = t.zoom),
            "scrollSpeed"in t && e(1, a = t.scrollSpeed),
            "sheet"in t && e(19, l = t.sheet),
            "user"in t && e(2, f = t.user),
            "xheElement"in t && e(3, h = t.xheElement),
            "sheetRenderCompleteCount"in t && e(4, d = t.sheetRenderCompleteCount)
        }
        ,
        t.$$.update = () => {
            417 & t.$$.dirty[0] && A(),
            98 & t.$$.dirty[0] && C(),
            65552 & t.$$.dirty[0] && d && e(9, T = o.scrollTop)
        }
        ,
        [s, a, f, h, d, w, k, S, E, T, i, r, m, y, O, function(t) {
            g.pause(1.5 * K.SECOND),
            o.scrollTo({
                top: t.detail.value,
                behavior: "smooth"
            })
        }
        , o, u, c, l, function(t) {
            k = t,
            e(6, k)
        }
        , () => e(1, a = xw), function(t) {
            a = t,
            e(1, a)
        }
        , function(t) {
            S = t,
            e(7, S)
        }
        , () => e(0, s = m), function(t) {
            s = t,
            e(0, s)
        }
        , function(t) {
            E = t,
            e(8, E)
        }
        , () => {
            r("fullScreen")
        }
        , () => e(5, w = !w)]
    }
    class Sw extends Ff {
        constructor(t) {
            super(),
            $f(this, t, kw, ww, al, {
                scrollElement: 16,
                tempo: 0,
                chordStyle: 17,
                zoom: 18,
                scrollSpeed: 1,
                sheet: 19,
                user: 2,
                xheElement: 3,
                sheetRenderCompleteCount: 4
            }, [-1, -1])
        }
    }
    function Ew(t) {
        let n, e, i, r, o, s, u, c, a, l, f;
        return {
            c() {
                n = Xl("div"),
                e = Xl("button"),
                i = Il(""),
                o = _l(),
                s = Xl("button"),
                u = Il(""),
                Dl(e, "class", "decrButton yoopu3-icon svelte-17wzcw"),
                e.disabled = r = t[3] || t[0] == t[1],
                Dl(s, "class", "incrButton yoopu3-icon svelte-17wzcw"),
                s.disabled = c = t[3] || t[0] == t[2],
                Dl(n, "class", "container svelte-17wzcw"),
                Dl(n, "disabled", a = t[3] || void 0)
            },
            m(r, c) {
                Ol(r, n, c),
                Tl(n, e),
                Tl(e, i),
                Tl(n, o),
                Tl(n, s),
                Tl(s, u),
                l || (f = [Rl(e, "click", t[4]), Rl(s, "click", t[5])],
                l = !0)
            },
            p(t, [i]) {
                11 & i && r !== (r = t[3] || t[0] == t[1]) && (e.disabled = r),
                13 & i && c !== (c = t[3] || t[0] == t[2]) && (s.disabled = c),
                8 & i && a !== (a = t[3] || void 0) && Dl(n, "disabled", a)
            },
            i: el,
            o: el,
            d(t) {
                t && Cl(n),
                l = !1,
                ul(f)
            }
        }
    }
    function Tw(t, n, e) {
        let {value: i=0} = n
          , {min: r=-1 / 0} = n
          , {max: o=1 / 0} = n
          , {disabled: s=!1} = n;
        return t.$$set = t => {
            "value"in t && e(0, i = t.value),
            "min"in t && e(1, r = t.min),
            "max"in t && e(2, o = t.max),
            "disabled"in t && e(3, s = t.disabled)
        }
        ,
        [i, r, o, s, function() {
            e(0, i = Math.max(r, i - 1))
        }
        , function() {
            e(0, i = Math.min(o, i + 1))
        }
        ]
    }
    class Ow extends Ff {
        constructor(t) {
            super(),
            $f(this, t, Tw, Ew, al, {
                value: 0,
                min: 1,
                max: 2,
                disabled: 3
            })
        }
    }
    function Cw(t, n, e) {
        const i = t.slice();
        return i[7] = n[e],
        i
    }
    function Aw(t) {
        let n, e;
        return {
            c() {
                n = Xl("span"),
                e = Il(t[2]),
                Dl(n, "class", "label svelte-1ogpr75")
            },
            m(t, i) {
                Ol(t, n, i),
                Tl(n, e)
            },
            p(t, n) {
                4 & n && ql(e, t[2])
            },
            d(t) {
                t && Cl(n)
            }
        }
    }
    function Xw(t) {
        let n, e, i, r = t[7].title + "";
        return {
            c() {
                n = Xl("option"),
                e = Il(r),
                n.__value = i = t[7].value,
                n.value = n.__value
            },
            m(t, i) {
                Ol(t, n, i),
                Tl(n, e)
            },
            p(t, o) {
                2 & o && r !== (r = t[7].title + "") && ql(e, r),
                2 & o && i !== (i = t[7].value) && (n.__value = i,
                n.value = n.__value)
            },
            d(t) {
                t && Cl(n)
            }
        }
    }
    function Iw(t) {
        let n, e, i, r, o, s = t[2] && Aw(t), u = t[1], c = [];
        for (let n = 0; n < u.length; n += 1)
            c[n] = Xw(Cw(t, u, n));
        return {
            c() {
                n = Xl("div"),
                s && s.c(),
                e = _l(),
                i = Xl("select");
                for (let t = 0; t < c.length; t += 1)
                    c[t].c();
                i.disabled = t[4],
                Dl(i, "class", "svelte-1ogpr75"),
                void 0 === t[0] && pf(( () => t[6].call(i))),
                Dl(n, "class", "dropdown-menu svelte-1ogpr75"),
                Ll(n, "required", t[3])
            },
            m(u, a) {
                Ol(u, n, a),
                s && s.m(n, null),
                Tl(n, e),
                Tl(n, i);
                for (let t = 0; t < c.length; t += 1)
                    c[t].m(i, null);
                Nl(i, t[0]),
                r || (o = [Rl(i, "change", t[6]), Rl(i, "change", t[5])],
                r = !0)
            },
            p(t, [r]) {
                if (t[2] ? s ? s.p(t, r) : (s = Aw(t),
                s.c(),
                s.m(n, e)) : s && (s.d(1),
                s = null),
                2 & r) {
                    let n;
                    for (u = t[1],
                    n = 0; n < u.length; n += 1) {
                        const e = Cw(t, u, n);
                        c[n] ? c[n].p(e, r) : (c[n] = Xw(e),
                        c[n].c(),
                        c[n].m(i, null))
                    }
                    for (; n < c.length; n += 1)
                        c[n].d(1);
                    c.length = u.length
                }
                16 & r && (i.disabled = t[4]),
                3 & r && Nl(i, t[0]),
                8 & r && Ll(n, "required", t[3])
            },
            i: el,
            o: el,
            d(t) {
                t && Cl(n),
                s && s.d(),
                Al(c, t),
                r = !1,
                ul(o)
            }
        }
    }
    function _w(t, n, e) {
        let {options: i} = n
          , {selected: r} = n
          , {label: o} = n
          , {required: s} = n
          , {disabled: u} = n;
        return t.$$set = t => {
            "options"in t && e(1, i = t.options),
            "selected"in t && e(0, r = t.selected),
            "label"in t && e(2, o = t.label),
            "required"in t && e(3, s = t.required),
            "disabled"in t && e(4, u = t.disabled)
        }
        ,
        [r, i, o, s, u, function(n) {
            uf(t, n)
        }
        , function() {
            r = zl(this),
            e(0, r),
            e(1, i)
        }
        ]
    }
    class Mw extends Ff {
        constructor(t) {
            super(),
            $f(this, t, _w, Iw, al, {
                options: 1,
                selected: 0,
                label: 2,
                required: 3,
                disabled: 4
            })
        }
    }
    const Rw = {
        [rt.INLINE]: "和弦图",
        [rt.REGULAR]: "和弦名",
        [rt.NUMBER]: "级数"
    }
      , Dw = [{
        icon: "",
        value: rt.INLINE
    }, {
        icon: "",
        value: rt.REGULAR
    }, {
        icon: "",
        value: rt.NUMBER
    }]
      , jw = {
        [it.TAB]: "六线谱",
        [it.CHORD]: "和弦谱"
    }
      , Bw = [{
        icon: "",
        value: it.CHORD
    }, {
        icon: "",
        value: it.TAB
    }]
      , Pw = [{
        icon: "",
        value: ot.NUMBER
    }, {
        icon: "",
        value: ot.STAFF
    }]
      , qw = {
        [ot.STAFF]: "五线谱",
        [ot.NUMBER]: "简谱"
    };
    function $w(t) {
        let n, e, i, r, o, s, u, c, a, l, f, h, d, v, p, m, y = jw[t[0]] + "";
        function g(n) {
            t[17](n)
        }
        let b = {
            disabled: t[9],
            options: Bw,
            size: "small"
        };
        void 0 !== t[0] && (b.selected = t[0]),
        s = new Zb({
            props: b
        }),
        af.push(( () => Df(s, "selected", g)));
        let w = t[0] === it.CHORD && Nw(t);
        function x(n) {
            t[19](n)
        }
        let k = {
            options: ct(t[8], !0)
        };
        return void 0 !== t[3] && (k.selected = t[3]),
        v = new Mw({
            props: k
        }),
        af.push(( () => Df(v, "selected", x))),
        {
            c() {
                n = Xl("div"),
                e = Xl("div"),
                i = Il(y),
                r = _l(),
                o = Xl("div"),
                jf(s.$$.fragment),
                c = _l(),
                w && w.c(),
                a = _l(),
                l = Xl("div"),
                f = Xl("div"),
                f.textContent = "变调夹",
                h = _l(),
                d = Xl("div"),
                jf(v.$$.fragment),
                Dl(e, "class", "label svelte-1oxe6vs"),
                Dl(o, "class", "content svelte-1oxe6vs"),
                Dl(n, "class", "row svelte-1oxe6vs"),
                Dl(f, "class", "label svelte-1oxe6vs"),
                Dl(d, "class", "content svelte-1oxe6vs"),
                Dl(l, "class", "row svelte-1oxe6vs")
            },
            m(t, u) {
                Ol(t, n, u),
                Tl(n, e),
                Tl(e, i),
                Tl(n, r),
                Tl(n, o),
                Bf(s, o, null),
                Ol(t, c, u),
                w && w.m(t, u),
                Ol(t, a, u),
                Ol(t, l, u),
                Tl(l, f),
                Tl(l, h),
                Tl(l, d),
                Bf(v, d, null),
                m = !0
            },
            p(t, n) {
                (!m || 1 & n) && y !== (y = jw[t[0]] + "") && ql(i, y);
                const e = {};
                512 & n && (e.disabled = t[9]),
                !u && 1 & n && (u = !0,
                e.selected = t[0],
                mf(( () => u = !1))),
                s.$set(e),
                t[0] === it.CHORD ? w ? (w.p(t, n),
                1 & n && Af(w, 1)) : (w = Nw(t),
                w.c(),
                Af(w, 1),
                w.m(a.parentNode, a)) : w && (Of(),
                Xf(w, 1, 1, ( () => {
                    w = null
                }
                )),
                Cf());
                const r = {};
                256 & n && (r.options = ct(t[8], !0)),
                !p && 8 & n && (p = !0,
                r.selected = t[3],
                mf(( () => p = !1))),
                v.$set(r)
            },
            i(t) {
                m || (Af(s.$$.fragment, t),
                Af(w),
                Af(v.$$.fragment, t),
                m = !0)
            },
            o(t) {
                Xf(s.$$.fragment, t),
                Xf(w),
                Xf(v.$$.fragment, t),
                m = !1
            },
            d(t) {
                t && Cl(n),
                Pf(s),
                t && Cl(c),
                w && w.d(t),
                t && Cl(a),
                t && Cl(l),
                Pf(v)
            }
        }
    }
    function Fw(t) {
        let n, e, i, r, o, s, u, c, a, l, f, h, d, v, p, m, y, g, b = qw[t[2]] + "";
        function w(n) {
            t[14](n)
        }
        let x = {
            options: Pw,
            size: "small"
        };
        void 0 !== t[2] && (x.selected = t[2]),
        s = new Zb({
            props: x
        }),
        af.push(( () => Df(s, "selected", w)));
        let k = 0 !== t[5] && zw(t);
        function S(n) {
            t[16](n)
        }
        let E = {};
        return void 0 !== t[5] && (E.value = t[5]),
        m = new Ow({
            props: E
        }),
        af.push(( () => Df(m, "value", S))),
        {
            c() {
                n = Xl("div"),
                e = Xl("div"),
                i = Il(b),
                r = _l(),
                o = Xl("div"),
                jf(s.$$.fragment),
                c = _l(),
                a = Xl("div"),
                l = Xl("div"),
                f = Il("移调: "),
                h = Il(t[10]),
                d = _l(),
                k && k.c(),
                v = _l(),
                p = Xl("div"),
                jf(m.$$.fragment),
                Dl(e, "class", "label svelte-1oxe6vs"),
                Dl(o, "class", "content svelte-1oxe6vs"),
                Dl(n, "class", "row svelte-1oxe6vs"),
                Dl(l, "class", "label svelte-1oxe6vs"),
                Dl(p, "class", "content svelte-1oxe6vs"),
                Dl(a, "class", "row svelte-1oxe6vs")
            },
            m(t, u) {
                Ol(t, n, u),
                Tl(n, e),
                Tl(e, i),
                Tl(n, r),
                Tl(n, o),
                Bf(s, o, null),
                Ol(t, c, u),
                Ol(t, a, u),
                Tl(a, l),
                Tl(l, f),
                Tl(l, h),
                Tl(l, d),
                k && k.m(l, null),
                Tl(a, v),
                Tl(a, p),
                Bf(m, p, null),
                g = !0
            },
            p(t, n) {
                (!g || 4 & n) && b !== (b = qw[t[2]] + "") && ql(i, b);
                const e = {};
                !u && 4 & n && (u = !0,
                e.selected = t[2],
                mf(( () => u = !1))),
                s.$set(e),
                (!g || 1024 & n) && ql(h, t[10]),
                0 !== t[5] ? k ? k.p(t, n) : (k = zw(t),
                k.c(),
                k.m(l, null)) : k && (k.d(1),
                k = null);
                const r = {};
                !y && 32 & n && (y = !0,
                r.value = t[5],
                mf(( () => y = !1))),
                m.$set(r)
            },
            i(t) {
                g || (Af(s.$$.fragment, t),
                Af(m.$$.fragment, t),
                g = !0)
            },
            o(t) {
                Xf(s.$$.fragment, t),
                Xf(m.$$.fragment, t),
                g = !1
            },
            d(t) {
                t && Cl(n),
                Pf(s),
                t && Cl(c),
                t && Cl(a),
                k && k.d(),
                Pf(m)
            }
        }
    }
    function Nw(t) {
        let n, e, i, r, o, s, u, c, a = Rw[t[1]] + "";
        function l(n) {
            t[18](n)
        }
        let f = {
            options: Dw,
            size: "small"
        };
        return void 0 !== t[1] && (f.selected = t[1]),
        s = new Zb({
            props: f
        }),
        af.push(( () => Df(s, "selected", l))),
        {
            c() {
                n = Xl("div"),
                e = Xl("div"),
                i = Il(a),
                r = _l(),
                o = Xl("div"),
                jf(s.$$.fragment),
                Dl(e, "class", "label svelte-1oxe6vs"),
                Dl(o, "class", "content svelte-1oxe6vs"),
                Dl(n, "class", "row svelte-1oxe6vs")
            },
            m(t, u) {
                Ol(t, n, u),
                Tl(n, e),
                Tl(e, i),
                Tl(n, r),
                Tl(n, o),
                Bf(s, o, null),
                c = !0
            },
            p(t, n) {
                (!c || 2 & n) && a !== (a = Rw[t[1]] + "") && ql(i, a);
                const e = {};
                !u && 2 & n && (u = !0,
                e.selected = t[1],
                mf(( () => u = !1))),
                s.$set(e)
            },
            i(t) {
                c || (Af(s.$$.fragment, t),
                c = !0)
            },
            o(t) {
                Xf(s.$$.fragment, t),
                c = !1
            },
            d(t) {
                t && Cl(n),
                Pf(s)
            }
        }
    }
    function zw(t) {
        let n, e, i;
        return {
            c() {
                n = Xl("span"),
                n.textContent = "重置",
                Dl(n, "class", "bottom clickable svelte-1oxe6vs")
            },
            m(r, o) {
                Ol(r, n, o),
                e || (i = Rl(n, "click", t[15]),
                e = !0)
            },
            p: el,
            d(t) {
                t && Cl(n),
                e = !1,
                i()
            }
        }
    }
    function Lw(t) {
        let n, e, i, r, o, s, u;
        function c(n) {
            t[21](n)
        }
        let a = {};
        return void 0 !== t[7] && (a.on = t[7]),
        o = new Hb({
            props: a
        }),
        af.push(( () => Df(o, "on", c))),
        {
            c() {
                n = Xl("div"),
                e = Xl("div"),
                e.textContent = "黑键高亮显示",
                i = _l(),
                r = Xl("div"),
                jf(o.$$.fragment),
                Dl(e, "class", "label svelte-1oxe6vs"),
                Dl(r, "class", "content svelte-1oxe6vs"),
                Dl(n, "class", "row svelte-1oxe6vs")
            },
            m(t, s) {
                Ol(t, n, s),
                Tl(n, e),
                Tl(n, i),
                Tl(n, r),
                Bf(o, r, null),
                u = !0
            },
            p(t, n) {
                const e = {};
                !s && 128 & n && (s = !0,
                e.on = t[7],
                mf(( () => s = !1))),
                o.$set(e)
            },
            i(t) {
                u || (Af(o.$$.fragment, t),
                u = !0)
            },
            o(t) {
                Xf(o.$$.fragment, t),
                u = !1
            },
            d(t) {
                t && Cl(n),
                Pf(o)
            }
        }
    }
    function Gw(t) {
        let n, e, i, r, o, s, u, c, a, l, f, h, d, v, p, m, y, g, b, w, x, k, S = t[13][t[4]] + "";
        const E = [Fw, $w]
          , T = [];
        function O(t, n) {
            return t[8] === Z.PIANO ? 0 : (256 & n && (e = !![Z.GUITAR, Z.UKULELE].includes(t[8])),
            e ? 1 : -1)
        }
        function C(n) {
            t[20](n)
        }
        ~(i = O(t, -1)) && (r = T[i] = E[i](t));
        let A = {
            min: 0,
            max: 4
        };
        void 0 !== t[4] && (A.value = t[4]),
        h = new Ow({
            props: A
        }),
        af.push(( () => Df(h, "value", C)));
        let X = t[12] === Z.PIANO && Lw(t);
        function I(n) {
            t[22](n)
        }
        let _ = {};
        return void 0 !== t[6] && (_.on = t[6]),
        w = new Hb({
            props: _
        }),
        af.push(( () => Df(w, "on", I))),
        {
            c() {
                n = Xl("section"),
                r && r.c(),
                o = _l(),
                s = Xl("div"),
                u = Xl("div"),
                c = Il("缩放: "),
                a = Il(S),
                l = _l(),
                f = Xl("div"),
                jf(h.$$.fragment),
                v = _l(),
                X && X.c(),
                p = _l(),
                m = Xl("div"),
                y = Xl("div"),
                y.textContent = "省略部分小节号",
                g = _l(),
                b = Xl("div"),
                jf(w.$$.fragment),
                Dl(u, "class", "label svelte-1oxe6vs"),
                Dl(f, "class", "content svelte-1oxe6vs"),
                Dl(s, "class", "row svelte-1oxe6vs"),
                Dl(y, "class", "label svelte-1oxe6vs"),
                Dl(b, "class", "content svelte-1oxe6vs"),
                Dl(m, "class", "row svelte-1oxe6vs"),
                Dl(n, "class", "svelte-1oxe6vs"),
                Ll(n, "themeColor", t[11])
            },
            m(t, e) {
                Ol(t, n, e),
                ~i && T[i].m(n, null),
                Tl(n, o),
                Tl(n, s),
                Tl(s, u),
                Tl(u, c),
                Tl(u, a),
                Tl(s, l),
                Tl(s, f),
                Bf(h, f, null),
                Tl(n, v),
                X && X.m(n, null),
                Tl(n, p),
                Tl(n, m),
                Tl(m, y),
                Tl(m, g),
                Tl(m, b),
                Bf(w, b, null),
                k = !0
            },
            p(t, [e]) {
                let s = i;
                i = O(t, e),
                i === s ? ~i && T[i].p(t, e) : (r && (Of(),
                Xf(T[s], 1, 1, ( () => {
                    T[s] = null
                }
                )),
                Cf()),
                ~i ? (r = T[i],
                r ? r.p(t, e) : (r = T[i] = E[i](t),
                r.c()),
                Af(r, 1),
                r.m(n, o)) : r = null),
                (!k || 16 & e) && S !== (S = t[13][t[4]] + "") && ql(a, S);
                const u = {};
                !d && 16 & e && (d = !0,
                u.value = t[4],
                mf(( () => d = !1))),
                h.$set(u),
                t[12] === Z.PIANO ? X ? (X.p(t, e),
                4096 & e && Af(X, 1)) : (X = Lw(t),
                X.c(),
                Af(X, 1),
                X.m(n, p)) : X && (Of(),
                Xf(X, 1, 1, ( () => {
                    X = null
                }
                )),
                Cf());
                const c = {};
                !x && 64 & e && (x = !0,
                c.on = t[6],
                mf(( () => x = !1))),
                w.$set(c),
                2048 & e && Ll(n, "themeColor", t[11])
            },
            i(t) {
                k || (Af(r),
                Af(h.$$.fragment, t),
                Af(X),
                Af(w.$$.fragment, t),
                k = !0)
            },
            o(t) {
                Xf(r),
                Xf(h.$$.fragment, t),
                Xf(X),
                Xf(w.$$.fragment, t),
                k = !1
            },
            d(t) {
                t && Cl(n),
                ~i && T[i].d(),
                Pf(h),
                X && X.d(),
                Pf(w)
            }
        }
    }
    function Uw(t, n, e) {
        let i;
        hl(t, Gf, (t => e(12, i = t)));
        let {instrument: r} = n
          , {nierStyle: o} = n
          , {chordStyle: s} = n
          , {scoreStyle: u} = n
          , {nierStyleDisabled: c} = n
          , {capo: a=0} = n
          , {zoom: l} = n
          , {keyShift: f=0} = n
          , {keyPlay: h} = n
          , {themeColor: d=!1} = n
          , {onlyShowBarNumberAtLineStart: v=!0} = n
          , {highlightPianoBlackKeyNotes: p=!0} = n;
        return t.$$set = t => {
            "instrument"in t && e(8, r = t.instrument),
            "nierStyle"in t && e(0, o = t.nierStyle),
            "chordStyle"in t && e(1, s = t.chordStyle),
            "scoreStyle"in t && e(2, u = t.scoreStyle),
            "nierStyleDisabled"in t && e(9, c = t.nierStyleDisabled),
            "capo"in t && e(3, a = t.capo),
            "zoom"in t && e(4, l = t.zoom),
            "keyShift"in t && e(5, f = t.keyShift),
            "keyPlay"in t && e(10, h = t.keyPlay),
            "themeColor"in t && e(11, d = t.themeColor),
            "onlyShowBarNumberAtLineStart"in t && e(6, v = t.onlyShowBarNumberAtLineStart),
            "highlightPianoBlackKeyNotes"in t && e(7, p = t.highlightPianoBlackKeyNotes)
        }
        ,
        [o, s, u, a, l, f, v, p, r, c, h, d, i, ["特小", "小", "中", "大", "特大"], function(t) {
            u = t,
            e(2, u)
        }
        , () => e(5, f = 0), function(t) {
            f = t,
            e(5, f)
        }
        , function(t) {
            o = t,
            e(0, o)
        }
        , function(t) {
            s = t,
            e(1, s)
        }
        , function(t) {
            a = t,
            e(3, a)
        }
        , function(t) {
            l = t,
            e(4, l)
        }
        , function(t) {
            p = t,
            e(7, p)
        }
        , function(t) {
            v = t,
            e(6, v)
        }
        ]
    }
    class Hw extends Ff {
        constructor(t) {
            super(),
            $f(this, t, Uw, Gw, al, {
                instrument: 8,
                nierStyle: 0,
                chordStyle: 1,
                scoreStyle: 2,
                nierStyleDisabled: 9,
                capo: 3,
                zoom: 4,
                keyShift: 5,
                keyPlay: 10,
                themeColor: 11,
                onlyShowBarNumberAtLineStart: 6,
                highlightPianoBlackKeyNotes: 7
            })
        }
    }
    function Vw(t, {delay: n=0, duration: e=400, easing: i=il}={}) {
        const r = +getComputedStyle(t).opacity;
        return {
            delay: n,
            duration: e,
            easing: i,
            css: t => "opacity: " + t * r
        }
    }
    function Ww(t, n, e) {
        const i = t.slice();
        return i[9] = n[e].bounds,
        i[10] = n[e].message,
        i
    }
    function Jw(t, n, e) {
        const i = t.slice();
        return i[13] = n[e],
        i[15] = e,
        i
    }
    function Kw(t) {
        let n, e, i;
        return {
            c() {
                n = Xl("a"),
                e = Il("详情"),
                Dl(n, "target", "_blank"),
                Dl(n, "href", i = t[13].docUrl),
                Dl(n, "class", "svelte-p1ieql")
            },
            m(t, i) {
                Ol(t, n, i),
                Tl(n, e)
            },
            p(t, e) {
                1 & e && i !== (i = t[13].docUrl) && Dl(n, "href", i)
            },
            d(t) {
                t && Cl(n)
            }
        }
    }
    function Yw(t) {
        let n, e, i, r, o, s, u, c, a, l, f = (t[13].isWarning ? "提醒: " : "错误: ") + t[13].message;
        function h() {
            return t[7](t[13])
        }
        let d = t[13].docUrl && Kw(t);
        return {
            c() {
                n = Xl("div"),
                e = Xl("input"),
                r = _l(),
                o = Xl("label"),
                s = Il(f),
                u = _l(),
                d && d.c(),
                c = _l(),
                Dl(e, "type", "checkbox"),
                Dl(e, "name", "suggestion"),
                e.checked = i = t[1] === t[13],
                Dl(e, "class", "svelte-p1ieql"),
                Dl(o, "class", "svelte-p1ieql"),
                Dl(n, "class", "suggestion svelte-p1ieql"),
                Ll(n, "warning", t[13].isWarning),
                Ll(n, "error", !t[13].isWarning)
            },
            m(t, i) {
                Ol(t, n, i),
                Tl(n, e),
                Tl(n, r),
                Tl(n, o),
                Tl(o, s),
                Tl(n, u),
                d && d.m(n, null),
                Tl(n, c),
                a || (l = Rl(o, "click", h),
                a = !0)
            },
            p(r, o) {
                t = r,
                3 & o && i !== (i = t[1] === t[13]) && (e.checked = i),
                1 & o && f !== (f = (t[13].isWarning ? "提醒: " : "错误: ") + t[13].message) && ql(s, f),
                t[13].docUrl ? d ? d.p(t, o) : (d = Kw(t),
                d.c(),
                d.m(n, c)) : d && (d.d(1),
                d = null),
                1 & o && Ll(n, "warning", t[13].isWarning),
                1 & o && Ll(n, "error", !t[13].isWarning)
            },
            d(t) {
                t && Cl(n),
                d && d.d(),
                a = !1,
                l()
            }
        }
    }
    function Qw(t) {
        let n, e = t[2], i = [];
        for (let n = 0; n < e.length; n += 1)
            i[n] = Zw(Ww(t, e, n));
        return {
            c() {
                n = Xl("div");
                for (let t = 0; t < i.length; t += 1)
                    i[t].c();
                Dl(n, "class", "errors")
            },
            m(t, e) {
                Ol(t, n, e);
                for (let t = 0; t < i.length; t += 1)
                    i[t].m(n, null)
            },
            p(t, r) {
                if (6 & r) {
                    let o;
                    for (e = t[2],
                    o = 0; o < e.length; o += 1) {
                        const s = Ww(t, e, o);
                        i[o] ? i[o].p(s, r) : (i[o] = Zw(s),
                        i[o].c(),
                        i[o].m(n, null))
                    }
                    for (; o < i.length; o += 1)
                        i[o].d(1);
                    i.length = e.length
                }
            },
            d(t) {
                t && Cl(n),
                Al(i, t)
            }
        }
    }
    function Zw(t) {
        let n, e, i, r, o, s = t[10] + "";
        return {
            c() {
                n = Xl("div"),
                e = Xl("div"),
                i = Il(s),
                r = _l(),
                Dl(e, "class", "message svelte-p1ieql"),
                Dl(n, "class", "bar svelte-p1ieql"),
                Dl(n, "style", o = `top:${t[9].y}px;left:${t[9].x}px;width:${t[9].w}px;height:${t[9].h + 20}px;`),
                Ll(n, "warning-bar", t[1].isWarning),
                Ll(n, "error-bar", !t[1].isWarning)
            },
            m(t, o) {
                Ol(t, n, o),
                Tl(n, e),
                Tl(e, i),
                Tl(n, r)
            },
            p(t, e) {
                4 & e && s !== (s = t[10] + "") && ql(i, s),
                4 & e && o !== (o = `top:${t[9].y}px;left:${t[9].x}px;width:${t[9].w}px;height:${t[9].h + 20}px;`) && Dl(n, "style", o),
                2 & e && Ll(n, "warning-bar", t[1].isWarning),
                2 & e && Ll(n, "error-bar", !t[1].isWarning)
            },
            d(t) {
                t && Cl(n)
            }
        }
    }
    function tx(t) {
        let n, e, i, r = t[0], o = [];
        for (let n = 0; n < r.length; n += 1)
            o[n] = Yw(Jw(t, r, n));
        let s = t[1] && Qw(t);
        return {
            c() {
                n = Xl("div"),
                e = Xl("div");
                for (let t = 0; t < o.length; t += 1)
                    o[t].c();
                i = _l(),
                s && s.c(),
                Dl(e, "class", "suggestions svelte-p1ieql"),
                Dl(n, "class", "nier-error-highlighter svelte-p1ieql")
            },
            m(t, r) {
                Ol(t, n, r),
                Tl(n, e);
                for (let t = 0; t < o.length; t += 1)
                    o[t].m(e, null);
                Tl(n, i),
                s && s.m(n, null)
            },
            p(t, [i]) {
                if (11 & i) {
                    let n;
                    for (r = t[0],
                    n = 0; n < r.length; n += 1) {
                        const s = Jw(t, r, n);
                        o[n] ? o[n].p(s, i) : (o[n] = Yw(s),
                        o[n].c(),
                        o[n].m(e, null))
                    }
                    for (; n < o.length; n += 1)
                        o[n].d(1);
                    o.length = r.length
                }
                t[1] ? s ? s.p(t, i) : (s = Qw(t),
                s.c(),
                s.m(n, null)) : s && (s.d(1),
                s = null)
            },
            i: el,
            o: el,
            d(t) {
                t && Cl(n),
                Al(o, t),
                s && s.d()
            }
        }
    }
    const nx = "at-highlight-error";
    function ex(t, n, e) {
        let {api: i} = n
          , {showErrorsOnly: r=!1} = n
          , o = i.score
          , s = []
          , u = null
          , c = [];
        function a(t) {
            if (i.uiFacade.removeHighlights(nx),
            u === t)
                e(1, u = null),
                e(2, c = []);
            else {
                e(1, u = t);
                const n = i.renderer.boundsLookup;
                e(2, c = t.getMasterBars().map(( ({masterBar: t, message: e}) => ({
                    message: e,
                    bounds: n.findMasterBar(t).visualBounds
                })))),
                t.errorNoteIdentifier && i.uiFacade.highlightElements(t.errorNoteIdentifier, nx),
                c.length > 0 && setTimeout(( () => {
                    const t = document.body.querySelector(".nier-error-highlighter .errors .bar");
                    t && t.scrollIntoView({
                        behavior: "smooth",
                        block: "center"
                    })
                }
                ), 100)
            }
        }
        i.scoreLoaded.on((t => {
            e(6, o = t)
        }
        ));
        return t.$$set = t => {
            "api"in t && e(4, i = t.api),
            "showErrorsOnly"in t && e(5, r = t.showErrorsOnly)
        }
        ,
        t.$$.update = () => {
            64 & t.$$.dirty && async function() {
                e(0, s = []),
                e(1, u = null),
                e(2, c = []);
                const {ScoreValidator: t} = await Da(Ia);
                o && e(0, s = new t(o).validate().filter((t => (!r || !t.isWarning) && t.hasMasterBars())))
            }()
        }
        ,
        [s, u, c, a, i, r, o, t => a(t)]
    }
    class ix extends Ff {
        constructor(t) {
            super(),
            $f(this, t, ex, tx, al, {
                api: 4,
                showErrorsOnly: 5
            })
        }
    }
    function rx(t) {
        let n, e;
        return {
            c() {
                n = Xl("div"),
                n.textContent = "玩命加载中...",
                Dl(n, "class", "placeholder svelte-l5lp34")
            },
            m(t, e) {
                Ol(t, n, e)
            },
            i(t) {
                e || pf(( () => {
                    e = _f(n, Vw, {
                        delay: 500
                    }),
                    e.start()
                }
                ))
            },
            o: el,
            d(t) {
                t && Cl(n)
            }
        }
    }
    function ox(t) {
        let n, e;
        return {
            c() {
                n = Xl("div"),
                n.textContent = "抱歉，本六线谱不支持您的系统。请尝试其他谱子。安卓用户请升级到安卓7.0以上。",
                Dl(n, "class", "placeholder svelte-l5lp34")
            },
            m(t, e) {
                Ol(t, n, e)
            },
            i(t) {
                e || pf(( () => {
                    e = _f(n, Vw, {
                        delay: 500
                    }),
                    e.start()
                }
                ))
            },
            o: el,
            d(t) {
                t && Cl(n)
            }
        }
    }
    function sx(t) {
        let n, e;
        return n = new ix({
            props: {
                api: t[0],
                showErrorsOnly: t[5]
            }
        }),
        {
            c() {
                jf(n.$$.fragment)
            },
            m(t, i) {
                Bf(n, t, i),
                e = !0
            },
            p(t, e) {
                const i = {};
                1 & e[0] && (i.api = t[0]),
                32 & e[0] && (i.showErrorsOnly = t[5]),
                n.$set(i)
            },
            i(t) {
                e || (Af(n.$$.fragment, t),
                e = !0)
            },
            o(t) {
                Xf(n.$$.fragment, t),
                e = !1
            },
            d(t) {
                Pf(n, t)
            }
        }
    }
    function ux(t) {
        let n, e, i, r, o, s, u, c = t[8] && t[7] && rx(), a = !t[8] && ox(), l = t[4] && t[0] && sx(t);
        return {
            c() {
                n = Xl("div"),
                e = Xl("div"),
                i = _l(),
                c && c.c(),
                r = _l(),
                a && a.c(),
                o = _l(),
                l && l.c(),
                s = Ml(),
                Dl(e, "class", "sheet svelte-l5lp34"),
                Dl(n, "class", "nier-sheet svelte-l5lp34"),
                Ll(n, "horizontal", t[3]),
                Ll(n, "fullSize", t[2] || t[1]),
                Ll(n, "loading", t[7])
            },
            m(f, h) {
                Ol(f, n, h),
                Tl(n, e),
                t[23](e),
                Ol(f, i, h),
                c && c.m(f, h),
                Ol(f, r, h),
                a && a.m(f, h),
                Ol(f, o, h),
                l && l.m(f, h),
                Ol(f, s, h),
                u = !0
            },
            p(t, e) {
                8 & e[0] && Ll(n, "horizontal", t[3]),
                6 & e[0] && Ll(n, "fullSize", t[2] || t[1]),
                128 & e[0] && Ll(n, "loading", t[7]),
                t[8] && t[7] ? c ? 128 & e[0] && Af(c, 1) : (c = rx(),
                c.c(),
                Af(c, 1),
                c.m(r.parentNode, r)) : c && (c.d(1),
                c = null),
                t[4] && t[0] ? l ? (l.p(t, e),
                17 & e[0] && Af(l, 1)) : (l = sx(t),
                l.c(),
                Af(l, 1),
                l.m(s.parentNode, s)) : l && (Of(),
                Xf(l, 1, 1, ( () => {
                    l = null
                }
                )),
                Cf())
            },
            i(t) {
                u || (Af(c),
                Af(a),
                Af(l),
                u = !0)
            },
            o(t) {
                Xf(l),
                u = !1
            },
            d(e) {
                e && Cl(n),
                t[23](null),
                e && Cl(i),
                c && c.d(e),
                e && Cl(r),
                a && a.d(e),
                e && Cl(o),
                l && l.d(e),
                e && Cl(s)
            }
        }
    }
    const cx = "Arial,sans-serif";
    function ax() {
        try {
            return eval('"use strict"; class foo {}'),
            !0
        } catch (t) {
            return !1
        }
    }
    function lx(t, n, e) {
        let i, r;
        hl(t, ch, (t => e(22, i = t))),
        hl(t, Gf, (t => e(26, r = t)));
        const o = zt("NierSheet")
          , s = Lt("NierSheet");
        let {sheet: u} = n
          , {printable: c=!1} = n
          , {fullSize: a=!1} = n
          , {editing: l=!1} = n
          , {player: f} = n
          , {busyRendering: h=!1} = n
          , {tempo: d} = n
          , {capo: v} = n
          , {keyShift: p} = n
          , {zoom: m=1} = n
          , {staveProfile: y=st.TAB} = n
          , {chordStyle: g=rt.INLINE} = n
          , {jianMode: b=!1} = n
          , {highlightPianoBlackKeyNotes: w=!0} = n
          , {onlyShowBarNumberAtLineStart: k=!0} = n
          , {horizontal: S=!1} = n
          , {scrollElementSelector: E="html,body"} = n
          , {showErrors: T=!1} = n
          , {showErrorsOnly: O=!1} = n;
        const C = ax() && !function() {
            const t = x(navigator.userAgent);
            return t && "Android" === t.family && t.major < 7
        }()
          , A = rf();
        let X, I, M = !1, R = u && (u.scoreUrlV4 || u.score);
        function D() {
            !M && I && u && (u.scoreUrlV4 || u.score) && (M = !0,
            requestAnimationFrame(( () => {
                !async function() {
                    if (!C)
                        return void na("nier-not-supported");
                    const {NierApi: t, JsonConverter: n, BinaryImporter: s, ScoreAdapter: f, NotationElement: x, InlineChordMode: T, StaveProfile: O, Color: X, Font: I, LayoutMode: M, ScrollMode: D} = await Da(Ia)
                      , B = j(t, n);
                    B.settings.display.staveProfile = O[y];
                    const P = u.score ? n.jsonToScore(u.score, B.settings) : await async function(t, n, e) {
                        const i = "/" === n[0] ? null : {
                            credentials: "omit"
                        };
                        let r = await Rt(n, i);
                        _(r);
                        const o = await Da(Xa);
                        r = o(r);
                        return (new t).read(r, e)
                    }(s, u.scoreUrlV4, B.settings);
                    P.title = en(u.title),
                    P.subTitle = en(u.subtitle),
                    P.artist = en(u.artist),
                    P.music = en(u.music),
                    P.words = en(u.words),
                    P.tab = u.author || "",
                    P.tempo = u.bpm || 70;
                    const q = new f(P);
                    l && q.tagNotes();
                    u.capo && (q.capo = u.capo);
                    let $ = 0;
                    null != v && ($ = v - (u.capo || 0));
                    null != p && ($ += (p % 12 + 17) % 12 - 5);
                    const {transpositionPitches: F, displayTranspositionPitches: N} = q.getTranspositionsForBestVocal($);
                    function z(t) {
                        return new I(cx,1.1 * t)
                    }
                    switch (B.settings.notation.transpositionPitches = F,
                    B.settings.notation.displayTranspositionPitches = B.settings.display.staveProfile === O.Lead ? new Array(F.length).fill(0) : N,
                    B.settings.notation.onlyShowBarNumberAtLineStart = k && !l,
                    B.settings.display.layoutMode = S ? M.Horizontal : M.Page,
                    B.settings.display.scale = (m + 8) / 11,
                    B.settings.display.resources.titleFont = z(24),
                    B.settings.display.resources.subTitleFont = z(16),
                    B.settings.display.resources.wordsFont = z(14),
                    B.settings.display.resources.effectFont = z(12),
                    B.settings.display.resources.barNumberFont = z(11),
                    B.settings.display.resources.graceFont = z(11),
                    B.settings.display.resources.lyricsFont = z(14),
                    B.settings.display.resources.numberedNoteNumberFont = z(16),
                    B.settings.display.resources.numberedNoteDumbNumberFont = z(14),
                    B.settings.display.resources.markerFont = z(14),
                    B.settings.display.stretchForce = q.hasOverlappingLyrics() ? 1.1 : .5,
                    B.settings.display.avoidAccolade = !(a && y === st.SCORE),
                    B.settings.notation.elements.set(x.ScoreMeter, a),
                    y) {
                    case st.SCORE:
                    case st.LEAD:
                        B.settings.notation.inlineChordMode = T.Name,
                        B.settings.notation.elements.set(x.ScoreMeter, !1);
                        break;
                    case st.TAB:
                        B.settings.notation.inlineChordMode = T.Diagram;
                        break;
                    case st.NLEAD:
                        g === rt.INLINE ? B.settings.notation.inlineChordMode = T.Diagram : g === rt.NUMBER ? B.settings.notation.inlineChordMode = T.Number : B.settings.notation.inlineChordMode = T.Name;
                        break;
                    case st.NUMBERED:
                        B.settings.notation.inlineChordMode = T.Number
                    }
                    B.settings.notation.avoidInChordFretNumber = u.use !== et.SOLO,
                    B.settings.player.scrollElement = E,
                    B.settings.player.scrollMode = S ? D.OffScreen : D.Continuous,
                    B.settings.player.enableDumbBeatSound = b,
                    B.settings.player.autoSustainPedal = !!u.autoSustainPedal,
                    function(t, n) {
                        const e = !c && i
                          , o = n.fromJson(e ? "rgb(255,255,255,1)" : "rgb(32,32,32,1)")
                          , s = n.fromJson(e ? "rgb(255,255,255,0.5)" : "rgb(0,0,0,0.5)")
                          , u = n.fromJson(e ? "rgb(100,100,100,1)" : "rgb(165,165,165,1)");
                        let a = n.fromJson(e ? "rgb(205,115,115,1)" : "rgb(205,92,92,1)");
                        r === Z.PIANO ? a = n.fromJson("rgb(92,205,148)") : r === Z.JIAN ? a = n.fromJson("rgb(92,148,205)") : r === Z.UKULELE && (a = n.fromJson("rgb(225,109,73)"));
                        const l = n.fromJson(e ? "rgb(0,0,0,1)" : "rgb(255,255,255,1)")
                          , f = w && r === Z.PIANO ? n.fromJson(e ? "rgb(178, 144, 192,1)" : "rgb(122,73,136,1)") : o
                          , h = t.display.resources;
                        h.barNumberColor = s,
                        h.chordTextColor = a,
                        h.mainGlyphColor = o,
                        h.secondaryGlyphColor = o,
                        h.scoreInfoColor = o,
                        h.barSeparatorColor = o,
                        h.staffLineColor = s,
                        h.tieDestinationColor = u,
                        h.inverseTextColor = l,
                        h.blackKeyNoteColor = f
                    }(B.settings, X),
                    B.updateSettings(),
                    B.renderFinished.on(( () => {
                        e(9, h = !1);
                        const t = q.getVocalPitchRange();
                        A("rendercomplete", {
                            score: P,
                            vocalRange: t
                        })
                    }
                    )),
                    B.playerReady.on(( () => {
                        B.player.playbackSpeed = (d || P.tempo) / P.tempo;
                        const t = P.tracks.find((t => t.staves.length > 0 && t.staves[0].showNumberedNotation));
                        t && B.changeTrackSolo([t], b)
                    }
                    )),
                    R && e(7, R = !1);
                    (function(t) {
                        let n = 0;
                        t.tracks.forEach((t => {
                            t.playbackInfo.program = 0,
                            t.playbackInfo.primaryChannel = ++n,
                            t.playbackInfo.secondaryChannel = ++n;
                            const e = t.staves[0];
                            e.showNumberedNotation ? t.name = "主旋律" : e.showStandardNotation && u.type === Z.PIANO ? t.name = "钢琴" : e.showTablature && (6 === e.tuning.length ? t.name = "吉他" : 4 === e.tuning.length && (t.name = "尤克里里"),
                            t.playbackInfo.program = 25),
                            "主旋律" !== t.name && u.use !== et.SOLO && (t.name = "伴奏")
                        }
                        ))
                    }
                    )(P),
                    o("render full score"),
                    e(9, h = !0);
                    let L = [-1];
                    Ai(y) && (L = [q.copyTabChords()]);
                    B.renderScore(P, L)
                }(),
                M = !1
            }
            )))
        }
        function j(t, n) {
            if (!X) {
                rb() || window.decodeOggData || (window.decodeOggData = 1);
                const i = function(t) {
                    const n = {
                        core: {
                            logLevel: 2,
                            fontDirectory: ku + "/font/tb-001/",
                            useWorkers: !0,
                            enableLazyLoading: !1
                        },
                        notation: {
                            rhythmMode: "showwithbars",
                            rhythmHeight: 15,
                            displayTiedNotes: !0,
                            inlineChordMode: "Diagram",
                            elements: {
                                ScoreTitle: a,
                                ScoreSubTitle: a,
                                ScoreArtist: a,
                                ScoreWordsAndMusic: a,
                                ScoreMusic: a,
                                ScoreWords: a,
                                ScoreTab: a,
                                ScoreMeter: a,
                                ScoreTempo: a,
                                ScoreCapo: a,
                                TimeSignature: !0,
                                GuitarTuning: !1,
                                TrackNames: !1,
                                EffectTempo: !0,
                                EffectCapo: !1,
                                ChordDiagrams: l
                            }
                        },
                        display: {
                            slim: !0,
                            padding: a ? void 0 : S ? [0, 0, 0, 0] : [0, 10, 0, 10],
                            hideTabHead: !a,
                            staveGroupVerticalPadding: a ? 20 : 15
                        },
                        player: {
                            enablePlayer: !c,
                            enableCursor: !c,
                            enableUserInteraction: !c && !Oh,
                            scrollOffsetY: 150 - window.screen.height / 2,
                            scrollOffsetX: -100
                        },
                        importer: {
                            fixNumberedNotationWholeNotes: !0
                        }
                    };
                    return t.jsObjectToSettings(n)
                }(n);
                X = new t(I,i),
                e(0, f = X),
                X.error.on((t => s(t)))
            }
            return X
        }
        return t.$$set = t => {
            "sheet"in t && e(10, u = t.sheet),
            "printable"in t && e(1, c = t.printable),
            "fullSize"in t && e(2, a = t.fullSize),
            "editing"in t && e(11, l = t.editing),
            "player"in t && e(0, f = t.player),
            "busyRendering"in t && e(9, h = t.busyRendering),
            "tempo"in t && e(12, d = t.tempo),
            "capo"in t && e(13, v = t.capo),
            "keyShift"in t && e(14, p = t.keyShift),
            "zoom"in t && e(15, m = t.zoom),
            "staveProfile"in t && e(16, y = t.staveProfile),
            "chordStyle"in t && e(17, g = t.chordStyle),
            "jianMode"in t && e(18, b = t.jianMode),
            "highlightPianoBlackKeyNotes"in t && e(19, w = t.highlightPianoBlackKeyNotes),
            "onlyShowBarNumberAtLineStart"in t && e(20, k = t.onlyShowBarNumberAtLineStart),
            "horizontal"in t && e(3, S = t.horizontal),
            "scrollElementSelector"in t && e(21, E = t.scrollElementSelector),
            "showErrors"in t && e(4, T = t.showErrors),
            "showErrorsOnly"in t && e(5, O = t.showErrorsOnly)
        }
        ,
        t.$$.update = () => {
            8385608 & t.$$.dirty[0] && D()
        }
        ,
        [f, c, a, S, T, O, I, R, C, h, u, l, d, v, p, m, y, g, b, w, k, E, i, function(t) {
            af[t ? "unshift" : "push"](( () => {
                I = t,
                e(6, I)
            }
            ))
        }
        ]
    }
    class fx extends Ff {
        constructor(t) {
            super(),
            $f(this, t, lx, ux, al, {
                sheet: 10,
                printable: 1,
                fullSize: 2,
                editing: 11,
                player: 0,
                busyRendering: 9,
                tempo: 12,
                capo: 13,
                keyShift: 14,
                zoom: 15,
                staveProfile: 16,
                chordStyle: 17,
                jianMode: 18,
                highlightPianoBlackKeyNotes: 19,
                onlyShowBarNumberAtLineStart: 20,
                horizontal: 3,
                scrollElementSelector: 21,
                showErrors: 4,
                showErrorsOnly: 5
            }, [-1, -1])
        }
    }
    const hx = ["A=1;X,0,2(1),2(2),2(3),0", "Am=1;X,0,2(2),2(3),1(1),0", "Adim=1;X,0,1(2),2(3),1(1),X", "Aaug=1;X,0,3(4),2(2),2(3),1(1)", "Amaj7=1;X,0,2(2),1(1),2(3),0", "Am7=1;X,0,2(2),0,1(1),0", "A7=1;X,0,2(2),0,2(3),0", "Adim7=1;X,0,1(1),2(3),1(2),2(4)", "AmM7=1;X,0,2(3),1(1),1(2),0", "Aaug7=0;X,0,3(4),0,2(3),1(2)", "Am7b5=1;X,0,1(1),2(3),1(2),3(4)", "Asus2=1;X,0,2(1),2(2),0,0", "Asus4=1;X,0,0,2(1),3(2),0", "A7sus2=1;X,0,2(1),0,0,0", "A7sus4=1;X,0,2(2),0,3(3),0", "A6=1;X,0,4(4),2(1),2(2),0", "Am6=1;X,0,2(2),2(3),1(1),2(4)", "Amaj9=1;X,0,X,4(2),2(1),4(3)", "Am9=1;X,0,2(2),4(4),1(1),3(3)", "A9=1;X,0,2(1),4(4),2(2),3(3)", "Aadd9=1;X,0,2(1),4(4),2(2),0", "Amadd9=1;X,0,2(2),4(4),1(1),0", "Aadd11=1;X,0,0,2(2),2(3),0", "A5=1;X,0,2(1),2(2),X,X", "A/C#=1;X,4(3),2(1),2(1),2(1),0", "A/E=1;0,0,2(1),2(1),2(1),0", "Bb=1;X,1(1),3(2),3(3),3(4),1(1)", "Bbm=1;X,1(1),3(3),3(4),2(2),1(1)", "Bbdim=1;X,1(1),2(2),3(4),2(3),0", "Bbaug=1;X,1(1),0,3(3),3(4),2(2)", "Bbmaj7=1;X,1(1),3(3),2(2),3(4),1(1)", "Bbm7=1;X,1(1),3(3),1(1),2(2),1(1)", "Bb7=1;X,1(1),3(3),1(1),3(4),1(1)", "Bbdim7=1;X,1(1),2(2),0,2(3),0", "BbmM7=1;X,1(1),3(4),2(2),2(3),1(1)", "Bbaug7=0;X,1(1),0,1(2),3(4),2(3)", "Bbm7b5=1;X,1(1),2(3),1(2),2(4),0", "Bbsus2=1;X,1(1),3(2),3(3),1(1),1(1)", "Bbsus4=1;X,1(1),1(1),3(2),4(3),1(1)", "Bb7sus2=1;X,1(1),3(3),1(1),1(1),1(1)", "Bb7sus4=1;X,1(1),1(1),1(1),4(4),1(1)", "Bb6=1;X,1(1),0,0,3(4),1(2)", "Bbm6=1;X,1(1),3(4),0,2(3),1(2)", "Bbmaj9=1;X,1(1),0,2(4),1(2),1(3)", "Bbm9=5;2(1),4(2),2(1),2(1),2(1),4(3)", "Bb9=1;X,1(1),0,1(2),1(3),1(4)", "Bbadd9=1;X,1(T),0,X,1(1),1(2)", "Bbmadd9=3;4(T),1(1),X,4(3),4(4),X", "Bbadd11=1;X,1(1),1(1),3(3),3(4),1(1)", "Bb5=1;X,1(1),3(3),3(4),X,X", "B=1;X,2(1),4(2),4(3),4(4),2(1)", "Bm=1;X,2(1),4(4),4(3),3(2),2(1)", "Bdim=1;X,2(2),0,4(4),3(3),1(1)", "Baug=1;X,2(2),1(1),0,0,3(3)", "Bmaj7=1;X,2(1),4(3),3(2),4(4),2(1)", "Bm7=1;X,2(1),4(4),2(1),3(2),2(1)", "B7=1;X,2(2),1(1),2(3),0,2(4)", "Bdim7=1;X,2(2),3(3),1(1),3(4),X", "BmM7=1;X,2(1),0,3(3),0,2(2)", "Baug7=0;X,2(2),1(1),2(3),0,3(4)", "Bm7b5=1;X,2(1),3(3),2(2),3(4),X", "Bsus2=1;X,2(1),4(2),4(3),2(1),2(1)", "Bsus4=2;X,1(1),1(1),3(2),4(3),1(1)", "B7sus2=1;X,2(1),4(2),2(1),2(1),2(1)", "B7sus4=1;X,2(1),4(3),2(1),5(4),2(1)", "B6=1;X,2(3),1(1),1(2),0,2(4)", "Bm6=1;X,2(2),0,1(1),0,2(3)", "Bmaj9=1;X,2(2),1(1),3(4),2(3),X", "Bm9=1;X,2(1),0,2(2),2(3),2(4)", "B9=1;X,2(2),1(1),2(3),2(4),X", "Badd9=0;X,2(2),1(1),X,2(3),2(4)", "Bmadd9=1;X,2(T),0,4(3),2(1),2(1)", "Badd11=1;X,2(1),2(1),4(3),4(4),2(1)", "B5=1;X,2(1),4(3),4(4),X,X", "C=1;X,3(3),2(2),0,1(1),0", "Cm=3;X,1(1),3(3),3(4),2(2),1(1)", "Cdim=3;X,1(1),2(2),3(4),2(3),X", "Caug=1;X,3(4),2(3),1(1),1(2),0", "Cmaj7=1;X,3(2),2(1),0,0,0", "Cm7=3;X,1(1),3(3),1(1),2(2),1(1)", "C7=1;X,3(3),2(2),3(4),1(1),0", "Cdim7=1;X,3(2),4(3),2(1),4(4),X", "CmM7=1;X,3(2),1(1),0,0,3(3)", "Caug7=1;X,3(2),2(1),3(3),X,4(4)", "Cm7b5=3;X,1(1),2(3),1(2),2(4),X", "Csus2=1;X,3(T),0,0,3(2),3(3)", "Csus4=1;X,3(3),3(4),0,1(1),1(1)", "C7sus2=1;X,3(2),0,3(3),1(1),3(4)", "C7sus4=2;X,2(1),4(3),2(1),5(4),2(1)", "C6=1;X,3(T),2(2),2(3),1(1),3(4)", "Cm6=1;X,3(T),1(1),2(3),1(2),X", "Cmaj9=1;X,3(2),2(1),4(4),3(3),0", "Cm9=1;X,3(1),0,3(2),4(4),3(3)", "C9=1;X,3(2),2(1),3(3),3(3),3(3)", "Cadd9=1;X,3(2),2(1),0,3(3),0", "Cmadd9=1;X,3(1),0,0,4(3),3(2)", "Cadd11=1;X,3(3),2(2),0,1(1),1(1)", "C5=2;X,2(1),4(3),4(4),X,X", "C/E=1;0,3(3),2(2),0,1(1),0", "C/G=1;3(3),3(4),2(2),0,1(1),0", "C#=1;X,4(3),3(2),X,2(1),4(4)", "C#m=4;X,1(1),3(3),3(4),2(2),1(1)", "C#dim=1;X,4(4),2(1),0,2(2),0", "C#aug=2;X,3(4),2(3),1(1),1(2),X", "C#maj7=4;X,1(1),3(3),2(2),3(4),1(1)", "C#m7=4;X,1(1),3(3),1(1),2(2),1(1)", "C#7=2;X,3(3),2(2),3(4),1(1),X", "C#dim7=1;X,4(2),5(3),3(1),5(4),X", "C#mM7=1;X,4(4),2(2),1(1),1(1),0", "C#aug7=2;X,3(2),2(1),3(3),0,4(4)", "C#m7b5=4;X,1(1),2(3),1(2),2(4),0", "C#sus2=1;X,4(T),1(1),1(1),2(2),4(4)", "C#sus4=4;X,1(1),1(1),3(2),4(3),1(1)", "C#7sus2=4;X,1(T),3(3),1(1),1(1),1(1)", "C#7sus4=4;X,1(1),1(1),1(1),4(4),1(1)", "C#6=1;X,4(3),3(1),3(2),X,4(4)", "C#m6=2;X,3(T),1(1),2(3),1(2),0", "C#maj9=1;X,4(2),3(1),5(4),4(3),X", "C#m9=1;X,4(4),1(1),1(1),0,0", "C#9=2;X,3(2),2(1),3(3),3(3),X", "C#add9=1;X,4(3),3(2),1(1),4(4),X", "C#madd9=1;X,4(4),1(1),1(1),2(2),0", "C#add11=1;X,4(T),3(2),X,2(1),2(1)", "C#5=3;X,2(1),4(3),4(4),X,X", "D=1;X,X,0,2(1),3(3),2(2)", "Dm=1;X,X,0,2(2),3(3),1(1)", "Ddim=1;X,X,0,1(1),3(4),1(2)", "Daug=1;X,X,0,3(2),3(3),2(1)", "Dmaj7=1;X,X,0,2(1),2(2),2(3)", "Dm7=1;X,X,0,2(3),1(1),1(2)", "D7=1;X,X,0,2(2),1(1),2(3)", "Ddim7=1;X,X,0,1(1),0,1(2)", "DmM7=1;X,X,0,2(2),2(3),1(1)", "Daug7=1;X,X,0,3(3),1(1),2(2)", "Dm7b5=1;X,X,0,1(1),1(2),1(3)", "Dsus2=1;X,X,0,2(1),3(2),0", "Dsus4=1;X,X,0,2(1),3(2),3(3)", "D7sus2=1;X,X,0,2(2),1(1),0", "D7sus4=1;X,X,0,2(2),1(1),3(3)", "D6=1;X,X,0,2(1),0,2(2)", "Dm6=1;X,X,0,2(2),0,1(1)", "Dmaj9=1;X,5(2),4(1),6(4),5(3),0", "Dm9=3;X,3(2),1(1),3(3),3(3),3(3)", "D9=3;X,3(2),2(1),3(3),3(3),3(3)", "Dadd9=2;X,4(3),3(2),1(1),4(4),0", "Dmadd9=2;X,4(T),2(1),X,4(3),4(4)", "Dadd11=2;X,4(3),3(2),0,2(1),X", "D5=1;X,X,0,2(1),3(2),X", "D/F#=1;2(T),0,0,2(1),3(3),2(2)", "D/A=1;X,0,0,2(1),3(3),2(2)", "Eb=1;X,X,1(1),3(2),4(4),3(3)", "Ebm=1;X,X,1(1),3(3),4(4),2(2)", "Ebdim=1;X,X,1(1),2(2),X,2(3)", "Ebaug=1;X,X,1(1),4(3),4(4),3(2)", "Ebmaj7=1;X,X,1(1),3(2),3(3),3(4)", "Ebm7=1;X,X,1(1),3(4),2(2),2(3)", "Eb7=1;X,X,1(1),3(3),2(2),3(4)", "Ebdim7=1;X,X,1(1),2(3),1(2),2(4)", "EbmM7=1;X,X,1(1),3(3),3(4),2(2)", "Ebaug7=1;X,X,1(1),4(4),2(2),3(3)", "Ebm7b5=1;X,X,1(1),2(2),2(3),2(4)", "Ebsus2=1;X,X,1(1),3(2),4(3),1(1)", "Ebsus4=1;X,X,1(1),3(2),4(3),4(4)", "Eb7sus2=1;X,X,1(1),3(3),2(2),1(1)", "Eb7sus4=1;X,X,1(1),3(3),2(2),4(4)", "Eb6=1;X,X,1(1),3(2),1(1),3(3)", "Ebm6=1;X,X,1(1),3(3),1(1),2(2)", "Ebmaj9=1;X,X,1(1),0,3(4),1(2)", "Ebm9=4;X,3(T),1(1),3(3),3(3),3(3)", "Eb9=1;X,X,1(1),0,2(3),1(2)", "Ebadd9=3;X,4(3),3(2),1(1),4(4),4(4)", "Ebmadd9=3;X,4(2),2(1),X,4(3),4(4)", "Ebadd11=4;X,3(T),2(2),X,1(1),1(1)", "Eb5=1;X,X,1(1),3(3),4(4),X", "E=1;0,2(2),2(3),1(1),0,0", "Em=1;0,2(2),2(3),0,0,0", "Edim=1;0,1(1),2(2),0,X,0", "Eaug=1;0,3(4),2(3),1(1),1(2),0", "Emaj7=1;0,2(3),1(1),1(2),0,0", "Em7=1;0,2(1),2(2),0,3(3),0", "E7=1;0,2(2),0,1(1),0,0", "Edim7=0;0,1(1),2(2),0,2(3),0", "EmM7=1;0,2(2),1(1),0,0,0", "Eaug7=1;0,3(3),2(2),1(1),3(4),0", "Em7b5=1;0,1(1),2(2),0,3(3),0", "Esus2=1;0,2(1),4(3),4(4),0,0", "Esus4=1;0,0,2(1),2(2),0,0", "E7sus2=1;0,2(1),4(3),4(4),3(2),0", "E7sus4=1;0,0,0,2(1),0,0", "E6=1;0,4(4),2(2),1(1),0,0", "Em6=1;0,4(2),2(1),0,0,0", "Emaj9=1;0,2(T),1(1),1(2),0,2(4)", "Em9=1;0,2(1),4(3),0,3(2),0", "E9=1;0,2(2),4(4),1(1),3(3),0", "Eadd9=1;0,2(2),4(4),1(1),0,0", "Emadd9=1;0,2(1),4(2),0,0,0", "Eadd11=1;0,0,2(2),1(1),0,0", "E5=0;0,2(1),2(2),X,X,X", "E/G#=2;3(2),1(1),X,3(3),4(4),0", "E/B=0;X,2(2),2(3),1(1),0,0", "F=1;1(1),3(3),3(4),2(2),1(1),1(1)", "Fm=1;1(1),3(2),3(3),1(1),1(1),1(1)", "Fdim=1;1(T),X,3(4),1(1),0,1(2)", "Faug=1;X,X,3(4),2(2),2(3),1(1)", "Fmaj7=1;1(T),0,3(3),2(2),1(1),0", "Fm7=1;1(T),X,1(1),1(2),1(3),X", "F7=1;1(1),3(3),1(1),2(2),1(1),1(1)", "Fdim7=0;1(1),X,0,1(2),0,1(3)", "FmM7=1;1(1),3(3),2(2),1(1),1(1),1(1)", "Faug7=0;1(T),0,1(1),2(3),2(4),1(2)", "Fm7b5=1;1(T),X,1(2),1(3),0,X", "Fsus2=1;1(T),X,3(3),0,1(1),3(4)", "Fsus4=1;1(1),1(1),3(2),3(3),1(1),1(1)", "F7sus2=2;X,X,2(1),4(3),3(2),2(1)", "F7sus4=1;1(1),1(1),1(1),3(2),1(1),1(1)", "F6=1;1(1),0,0,2(4),1(2),1(3)", "Fm6=1;1(1),3(2),3(3),1(1),3(4),1(1)", "Fmaj9=1;1(T),0,2(4),0,1(2),1(3)", "Fm9=1;1(1),3(2),1(1),1(1),1(1),3(3)", "F9=1;1(1),0,1(2),0,1(3),1(4)", "Fadd9=1;1(T),0,3(3),2(2),1(1),3(4)", "Fmadd9=1;X,X,3(2),0,1(1),4(3)", "Fadd11=1;1(1),1(1),3(3),2(2),1(1),1(1)", "F5=1;1(1),3(3),3(4),X,X,X", "F#=1;2(1),4(3),4(4),3(2),2(1),2(1)", "F#m=1;2(1),4(2),4(3),2(1),2(1),2(1)", "F#dim=1;2(T),0,4(4),2(2),1(1),X", "F#aug=1;X,X,4(4),3(2),3(3),2(1)", "F#maj7=1;2(1),4(4),3(2),3(3),2(1),2(1)", "F#m7=1;2(T),X,2(1),2(2),2(3),0", "F#7=1;2(1),4(3),2(1),3(2),2(1),2(1)", "F#dim7=1;2(T),0,1(1),2(3),1(2),X", "F#mM7=1;2(1),4(3),3(2),2(1),2(1),2(1)", "F#aug7=0;2(T),X,2(1),3(3),3(4),2(2)", "F#m7b5=1;2(T),0,2(2),2(3),1(1),0", "F#sus2=1;X,X,4(T),1(1),2(2),2(3)", "F#sus4=1;2(1),2(1),4(2),4(3),2(1),2(1)", "F#7sus2=1;X,X,4(T),1(1),2(2),0", "F#7sus4=1;2(1),2(1),2(1),4(2),2(1),2(1)", "F#6=0;2(T),X,1(1),3(3),2(2),X", "F#m6=1;2(1),4(2),4(3),2(1),4(4),2(1)", "F#maj9=1;2(T),1(1),X,1(2),2(3),1(2)", "F#m9=1;2(T),0,X,1(2),2(3),0", "F#9=1;2(1),4(3),2(1),3(2),2(1),4(4)", "F#add9=1;X,X,4(3),3(2),2(1),4(4)", "F#madd9=1;X,X,4(2),2(1),2(1),4(3)", "F#add11=2;1(1),1(1),3(3),2(2),1(1),1(1)", "F#5=1;2(1),4(3),4(4),X,X,X", "G=1;3(2),2(1),0,0,0,3(3)", "Gm=3;1(1),3(3),3(4),1(1),1(1),1(1)", "Gdim=3;1(T),2(2),3(3),1(1),X,X", "Gaug=1;3(3),2(2),1(1),0,0,3(4)", "Gmaj7=1;3(3),2(1),0,0,0,2(2)", "Gm7=2;2(1),4(3),2(1),2(1),2(1),2(1)", "G7=1;3(3),2(2),0,0,0,1(1)", "Gdim7=1;3(T),X,2(1),3(3),2(2),0", "GmM7=1;3(T),X,0,3(2),3(3),2(1)", "Gaug7=1;3(T),2(3),1(2),0,0,1(1)", "Gm7b5=0;3(T),X,3(3),3(2),2(1),X", "Gsus2=1;3(3),0,0,2(1),3(2),3(4)", "Gsus4=1;3(2),3(3),0,0,1(1),3(4)", "G7sus2=1;3(1),0,3(2),0,3(3),3(4)", "G7sus4=1;3(3),X,3(4),0,1(1),X", "G6=1;3(2),2(1),0,0,0,0", "Gm6=1;3(2),1(1),0,0,3(3),0", "Gmaj9=1;3(2),0,0,0,0,2(1)", "Gm9=1;3(2),0,0,3(3),3(4),1(1)", "G9=1;3(2),0,0,0,0,1(1)", "Gadd9=1;3(3),0,0,2(2),0,3(4)", "Gmadd9=1;3(1),0,0,3(2),3(3),3(4)", "Gadd11=1;3(3),2(2),0,0,1(1),3(4)", "G5=0;X,X,X,0,3(3),3(3)", "G/B=1;X,2(1),0,0,3(3),3(4)", "G/D=1;X,X,0,0,0,3(3)", "G#=1;4(3),3(2),1(1),1(1),1(1),4(4)", "G#m=3;2(1),4(2),4(3),2(1),2(1),2(1)", "G#dim=1;4(4),2(2),0,1(1),0,X", "G#aug=3;X,X,4(4),3(2),3(3),2(1)", "G#maj7=4;1(T),X,2(2),2(3),1(1),X", "G#m7=0;4(1),X,4(2),4(3),4(4),X", "G#7=1;4(4),3(3),1(1),1(1),1(1),2(2)", "G#dim7=1;4(T),X,3(1),4(3),3(2),X", "G#mM7=1;4(T),X,X,4(2),4(3),3(1)", "G#aug7=4;1(T),X,1(1),2(2),2(3),X", "G#m7b5=1;4(T),X,4(3),4(2),3(1),X", "G#sus2=1;4(T),1(1),X,X,4(4),4(4)", "G#sus4=3;2(1),2(1),4(2),4(3),2(1),2(1)", "G#7sus2=1;4(T),1(1),X,X,4(4),2(2)", "G#7sus4=3;2(1),2(1),2(1),4(2),2(1),2(1)", "G#6=1;4(3),3(2),1(1),1(1),1(1),1(1)", "G#m6=1;4(T),X,3(1),4(2),4(3),X", "G#maj9=1;4(T),1(1),1(2),0,1(3),X", "G#m9=3;2(1),4(2),2(1),2(1),2(1),4(3)", "G#9=1;4(T),1(1),1(1),1(1),1(1),2(2)", "G#add9=1;4(T),3(1),X,3(2),4(3),X", "G#madd9=1;4(T),2(1),X,3(2),4(3),X", "G#add11=2;3(3),2(2),X,X,1(1),3(4)", "G#5=3;2(1),4(3),4(4),X,X,X"]
      , dx = ["A=1;2(2),1(1),0,0", "Am=1;2(2),0,0,0", "A7=1;0,1(1),0,0", "Am7=1;0,0,0,0", "Amaj7=1;1(1),1(2),0,0", "Adim=2;1(1),2(2),4(4),2(3)", "Asus2=2;1(1),3(3),4(4),1(1)", "Asus4=1;2(1),2(2),0,0", "Bb=1;3(3),2(2),1(1),1(1)", "Bbm=1;3(3),1(1),1(1),1(1)", "Bb7=1;1(1),2(2),1(1),1(1)", "Bbm7=1;1(1),1(1),1(1),1(1)", "Bbmaj7=1;3(3),2(2),1(1),0", "Bbdim=1;3(4),1(1),0,1(2)", "Bbsus2=1;3(3),0,1(1),1(1)", "Bbsus4=1;3(3),3(4),1(1),1(1)", "B=1;4(3),3(2),2(1),2(1)", "Bm=1;4(3),2(1),2(1),2(1)", "B7=1;2(1),3(2),2(1),2(1)", "Bm7=1;2(1),2(1),2(1),2(1)", "Bmaj7=1;3(2),3(2),2(1),2(1)", "Bdim=1;4(4),2(2),1(1),2(3)", "Bsus2=1;4(4),1(1),2(2),2(3)", "Bsus4=1;4(2),4(4),2(1),2(1)", "C=1;0,0,0,3(3)", "Cm=1;0,3(1),3(2),3(3)", "C7=1;0,0,0,1(1)", "Cm7=1;3(1),3(1),3(1),3(1)", "Cmaj7=1;0,0,0,2(1)", "Cdim=1;0,3(3),2(2),3(4)", "Csus2=1;0,2(1),3(2),3(3)", "Csus4=1;0,0,1(1),3(3)", "C#=1;1(1),1(1),1(1),4(4)", "C#m=1;1(1),4(3),4(3),4(3)", "C#7=1;1(1),1(1),1(1),2(2)", "C#m7=1;4(1),4(1),4(1),4(1)", "C#maj7=1;1(1),1(1),1(1),3(3)", "C#dim=1;0,1(1),0,4(4)", "C#sus2=1;1(1),3(2),4(3),4(3)", "C#sus4=1;1(1),1(1),2(2),4(4)", "D=1;2(1),2(2),2(3),0", "Dm=1;2(2),2(3),1(1),0", "D7=1;2(1),0,2(2),0", "Dm7=1;2(2),2(3),1(1),3(4)", "Dmaj7=1;2(1),2(1),2(1),4(2)", "Ddim=1;1(1),2(3),1(2),0", "Dsus2=1;2(1),2(2),0,0", "Dsus4=1;0,2(1),3(2),0", "Eb=1;0,3(2),3(2),1(1)", "Ebm=1;3(3),3(4),2(2),1(1)", "Eb7=1;3(1),3(1),3(1),4(2)", "Ebm7=1;3(2),3(3),2(1),4(4)", "Ebmaj7=2;2(1),2(1),2(1),4(2)", "Ebdim=1;2(1),3(3),2(2),0", "Ebsus2=1;3(2),3(3),1(1),1(1)", "Ebsus4=1;1(1),3(3),4(4),1(1)", "E=1;4(2),4(3),4(4),2(1)", "Em=1;0,4(3),3(2),2(1)", "E7=1;1(1),2(2),0,2(3)", "Em7=1;0,2(1),0,2(2)", "Emaj7=1;1(1),3(3),0,2(2)", "Edim=1;0,4(3),0,1(1)", "Esus2=1;4(3),4(4),2(1),2(1)", "Esus4=1;2(2),4(4),0,2(1)", "F=1;2(2),0,1(1),0", "Fm=1;1(1),0,1(2),3(4)", "F7=1;2(2),3(3),1(1),0", "Fm7=1;1(1),3(3),1(2),3(4)", "Fmaj7=1;2(2),4(4),1(1),3(3)", "Fdim=1;1(1),X,1(2),2(3)", "Fsus2=1;0,0,1(1),3(3)", "Fsus4=1;3(3),0,1(1),1(2)", "F#=1;3(3),1(1),2(2),1(1)", "F#m=1;2(2),1(1),2(3),0", "F#7=1;3(2),4(3),2(1),4(4)", "F#m7=1;2(1),4(3),2(2),4(4)", "F#maj7=2;2(2),4(4),1(1),3(3)", "F#dim=1;2(2),0,2(3),0", "F#sus2=1;1(1),1(1),2(2),4(4)", "F#sus4=1;4(4),1(1),2(2),2(3)", "G=1;0,2(1),3(3),2(2)", "Gm=1;0,2(2),3(3),1(1)", "G7=1;0,2(2),1(1),2(3)", "Gm7=1;0,2(2),1(1),1(1)", "Gmaj7=1;0,2(1),2(2),2(3)", "Gdim=1;0,1(1),3(4),1(2)", "Gsus2=1;0,2(1),3(3),0", "Gsus4=1;0,2(1),3(3),3(4)", "G#=2;4(3),2(1),3(2),2(1)", "G#m=1;4(3),3(2),4(4),2(1)", "G#7=1;1(1),3(3),2(2),3(4)", "G#m7=1;1(1),3(4),2(2),2(3)", "G#maj7=1;1(1),3(3),3(3),3(3)", "G#dim=1;1(1),2(2),X,2(3)", "G#sus2=1;1(1),3(3),4(4),1(1)", "G#sus4=1;1(1),3(2),4(3),4(3)"]
      , vx = [...dx, "A7sus4=1;0,2(2),0,0", "AmM7=1;1(1),0,0,0", "Adim7=1;2(1),3(3),2(2),3(4)", "A6=1;2(1),4(3),2(2),4(4)", "Aaug=1;2(2),1(1),1(1),4(4)", "Am6=1;2(1),4(3),2(1),3(2)", "A9=1;0,1(1),0,2(2)", "Aadd9=1;2(2),1(1),0,2(3)", "Bb7sus4=1;1(1),3(3),1(1),1(1)", "BbmM7=1;2(2),1(1),1(1),1(1)", "Bbdim7=1;0,1(1),0,1(2)", "Bb6=1;0,2(2),1(1),1(1)", "Bbm6=1;0,1(1),1(1),1(1)", "Bbaug=2;2(2),1(1),1(1),4(4)", "Bb9=1;1(2),2(1),1(4),3(3)", "Bbadd9=1;3(3),2(2),1(1),3(4)", "Bbm7-5=1;1(1),1(2),0,1(3)", "Bm6=1;1(1),2(2),2(3),2(4)", "B7sus4=1;2(1),4(3),2(1),2(1)", "BmM7=1;3(2),2(1),2(1),2(1)", "Bdim7=1;1(1),2(3),1(2),2(4)", "B6=1;1(1),3(4),2(2),2(3)", "Baug=1;4(4),3(2),3(3),2(1)", "B9=1;2(1),3(3),2(2),4(4)", "Badd9=1;4(3),3(2),2(1),4(4)", "C7sus4=1;0,0,1(1),1(1)", "CmM7=1;4(2),3(1),3(1),3(1)", "Cdim7=1;2(1),3(3),2(2),3(4)", "C6=1;0,0,0,0", "Cm6=1;2(1),3(3),3(3),3(3)", "Caug=1;1(1),0,0,3(4)", "C9=1;0,2(2),0,1(1)", "Cadd9=1;0,2(1),0,3(3)", "C#7sus4=1;1(1),1(1),2(2),2(3)", "C#mM7=1;1(1),0,0,4(4)", "C#dim7=1;0,1(1),0,1(2)", "C#6=1;1(1),1(1),1(1),1(1)", "C#m6=1;1(1),1(2),0,1(3)", "C#aug=1;2(2),1(1),1(1),4(4)", "C#9=1;1(1),3(4),1(2),2(3)", "C#add9=1;1(1),3(3),1(1),4(4)", "Dm6=1;0,2(2),1(1),2(3)", "D7sus4=1;2(1),2(2),3(3),3(4)", "DmM7=1;2(2),2(3),1(1),4(4)", "Ddim7=1;1(1),2(3),1(2),2(4)", "D6=1;2(2),2(2),2(2),2(2)", "Daug=2;2(2),1(1),1(1),4(4)", "D9=1;2(1),4(4),2(2),3(3)", "Dadd9=2;1(1),3(3),1(1),4(4)", "Eb7sus4=1;3(1),3(1),4(2),4(3)", "EbmM7=2;2(2),2(3),1(1),4(4)", "Ebdim7=1;2(1),3(3),2(2),3(4)", "Eb6=1;3(1),3(1),3(1),3(1)", "Ebm6=1;3(2),3(3),2(1),3(4)", "Ebaug=1;0,3(2),3(2),2(1)", "Eb9=1;0,1(1),1(2),1(3)", "Ebadd9=1;0,3(3),1(1),1(1)", "E7sus4=1;2(2),2(3),0,2(4)", "Em6=1;4(2),4(3),3(1),4(4)", "EmM7=1;0,3(2),0,2(1)", "Edim7=1;0,1(1),0,1(2)", "E6=1;4(1),4(1),4(1),4(1)", "Eaug=1;1(1),0,0,3(4)", "E9=1;1(1),2(2),2(3),2(4)", "Eadd9=1;1(1),4(4),2(2),2(3)", "F7sus4=1;3(2),3(3),1(1),3(4)", "Fm6=1;1(1),2(2),1(1),3(3)", "FmM7=1;1(1),4(4),1(1),3(3)", "Fdim7=1;1(1),2(3),1(2),2(4)", "F6=1;2(2),2(3),1(1),3(4)", "F6sus2=1;0,0,1(1),3(3)", "F6sus4=1;3(3),0,1(1),1(1)", "F6aug=1;2(2),1(1),1(1),4(4)", "F9=1;2(1),3(2),3(3),3(4)", "Faug=1;2(3),1(1),1(2),0", "Fadd9=1;0,0,1(1),0", "F#7sus4=1;4(2),4(3),2(1),4(4)", "F#mM7=2;1(1),4(4),1(1),3(3)", "F#dim7=1;2(1),3(3),2(2),3(4)", "F#m6=1;2(2),1(1),2(3),4(4)", "F#6=1;3(2),3(3),2(1),4(4)", "F#aug=2;2(2),1(1),1(1),4(4)", "F#9=1;1(1),1(2),0,1(3)", "F#add9=1;1(1),1(1),2(2),1(1)", "Gm6=1;0,2(2),0,1(1)", "G7sus4=1;0,2(2),1(1),3(4)", "GmM7=1;0,2(2),2(3),1(1)", "Gdim7=1;0,1(1),0,1(2)", "G6=1;0,2(1),0,2(2)", "Gaug=1;0,3(2),3(3),2(1)", "G9=1;2(2),2(3),1(1),2(4)", "Gadd9=1;2(1),2(1),3(2),2(1)", "G#7sus4=1;1(1),3(3),2(2),4(4)", "G#mM7=1;0,3(2),4(3),2(1)", "G#dim7=1;1(1),2(3),1(2),2(4)", "G#6=1;1(1),3(3),1(2),3(4)", "G#m6=1;1(1),3(3),1(1),2(2)", "G#aug=1;1(1),0,0,3(4)", "G#9=1;1(1),0,2(3),1(2)", "G#add9=1;3(1),3(1),4(2),3(1)", "C-F=1;2(2),0,1(1),3(3)", "D/A=1;2(1),2(2),2(3),0", "Dm/C=1;2(2),2(3),1(1),3(4)", "Fm7/C=1;1(1),3(3),1(2),3(4)", "G/B=1;0,2(1),3(3),2(2)", "G/F#=1;0,2(1),2(2),2(3)", "G/F=1;0,2(2),1(1),2(3)", "G7/B=1;0,2(2),1(1),2(3)"];
    function px(t) {
        return t ? t === Z.GUITAR ? hx : t === Z.UKULELE ? vx : [] : hx.concat(vx)
    }
    function mx(t, n, e) {
        const i = t.slice();
        return i[28] = n[e],
        i
    }
    function yx(t) {
        let n, e, i, r, o, s, u, c, a, l, f, h, d, v, p, m, y, g, b, w, x, k, S, E, T, O, C, A, X, I, _, M, R, D, j, B, P, q, $, F = (t[2].title || "未命名") + "", N = (t[2].artist || "未知艺人") + "", z = (t[2].author || t[2].owner.displayName) + "", L = (t[2].timeSignature || "未知") + "", G = (t[5] || "未知") + "", U = (t[8] || "未知") + "", H = (t[2].key || "未知") + "";
        return {
            c() {
                n = Xl("div"),
                e = Xl("div"),
                i = Il(F),
                r = _l(),
                o = Xl("div"),
                s = Xl("div"),
                u = Xl("span"),
                u.textContent = "唱:",
                c = Xl("span"),
                a = Il(N),
                l = _l(),
                f = Xl("div"),
                h = Xl("span"),
                h.textContent = "编:",
                d = Xl("span"),
                v = Il(z),
                p = _l(),
                m = Xl("div"),
                y = Xl("div"),
                g = Xl("span"),
                g.textContent = "拍号",
                b = _l(),
                w = Xl("span"),
                x = Il(L),
                k = _l(),
                S = Xl("div"),
                E = Xl("span"),
                E.textContent = "拍速",
                T = _l(),
                O = Xl("span"),
                C = Il(G),
                A = _l(),
                X = Xl("div"),
                I = Xl("span"),
                I.textContent = "选调",
                _ = _l(),
                M = Xl("span"),
                R = Il(U),
                D = _l(),
                j = Xl("div"),
                B = Xl("span"),
                B.textContent = "原唱调",
                P = _l(),
                q = Xl("span"),
                $ = Il(H),
                Dl(e, "class", "xhe-title svelte-k98ekn"),
                Dl(u, "class", "label svelte-k98ekn"),
                Dl(c, "class", "text svelte-k98ekn"),
                Dl(s, "class", "item svelte-k98ekn"),
                Dl(h, "class", "label svelte-k98ekn"),
                Dl(d, "class", "text svelte-k98ekn"),
                Dl(f, "class", "item svelte-k98ekn"),
                Dl(o, "class", "xhe-info svelte-k98ekn"),
                Dl(g, "class", "label svelte-k98ekn"),
                Dl(w, "class", "value svelte-k98ekn"),
                Dl(y, "class", "col svelte-k98ekn"),
                Dl(E, "class", "label svelte-k98ekn"),
                Dl(O, "class", "value svelte-k98ekn"),
                Dl(S, "class", "col svelte-k98ekn"),
                Dl(I, "class", "label svelte-k98ekn"),
                Dl(M, "class", "value svelte-k98ekn"),
                Dl(X, "class", "col bottom svelte-k98ekn"),
                Dl(B, "class", "label svelte-k98ekn"),
                Dl(q, "class", "value svelte-k98ekn"),
                Dl(j, "class", "col bottom svelte-k98ekn"),
                Dl(m, "class", "xhe-meta svelte-k98ekn"),
                Dl(n, "class", "xhe-header svelte-k98ekn")
            },
            m(t, F) {
                Ol(t, n, F),
                Tl(n, e),
                Tl(e, i),
                Tl(n, r),
                Tl(n, o),
                Tl(o, s),
                Tl(s, u),
                Tl(s, c),
                Tl(c, a),
                Tl(o, l),
                Tl(o, f),
                Tl(f, h),
                Tl(f, d),
                Tl(d, v),
                Tl(n, p),
                Tl(n, m),
                Tl(m, y),
                Tl(y, g),
                Tl(y, b),
                Tl(y, w),
                Tl(w, x),
                Tl(m, k),
                Tl(m, S),
                Tl(S, E),
                Tl(S, T),
                Tl(S, O),
                Tl(O, C),
                Tl(m, A),
                Tl(m, X),
                Tl(X, I),
                Tl(X, _),
                Tl(X, M),
                Tl(M, R),
                Tl(m, D),
                Tl(m, j),
                Tl(j, B),
                Tl(j, P),
                Tl(j, q),
                Tl(q, $)
            },
            p(t, n) {
                4 & n && F !== (F = (t[2].title || "未命名") + "") && ql(i, F),
                4 & n && N !== (N = (t[2].artist || "未知艺人") + "") && ql(a, N),
                4 & n && z !== (z = (t[2].author || t[2].owner.displayName) + "") && ql(v, z),
                4 & n && L !== (L = (t[2].timeSignature || "未知") + "") && ql(x, L),
                32 & n && G !== (G = (t[5] || "未知") + "") && ql(C, G),
                256 & n && U !== (U = (t[8] || "未知") + "") && ql(R, U),
                4 & n && H !== (H = (t[2].key || "未知") + "") && ql($, H)
            },
            d(t) {
                t && Cl(n)
            }
        }
    }
    function gx(t) {
        let n, e = t[13], i = [];
        for (let n = 0; n < e.length; n += 1)
            i[n] = bx(mx(t, e, n));
        return {
            c() {
                n = Xl("div");
                for (let t = 0; t < i.length; t += 1)
                    i[t].c()
            },
            m(t, e) {
                Ol(t, n, e);
                for (let t = 0; t < i.length; t += 1)
                    i[t].m(n, null)
            },
            p(t, r) {
                if (14344 & r) {
                    let o;
                    for (e = t[13],
                    o = 0; o < e.length; o += 1) {
                        const s = mx(t, e, o);
                        i[o] ? i[o].p(s, r) : (i[o] = bx(s),
                        i[o].c(),
                        i[o].m(n, null))
                    }
                    for (; o < i.length; o += 1)
                        i[o].d(1);
                    i.length = e.length
                }
            },
            d(t) {
                t && Cl(n),
                Al(i, t)
            }
        }
    }
    function bx(t) {
        let n, e, i;
        return {
            c() {
                n = Xl("hexi-chord"),
                jl(n, "name", e = t[28]),
                jl(n, "size", "normal"),
                jl(n, "instrument", t[3]),
                jl(n, "scale", t[11]),
                jl(n, "dark", i = t[12] ? "" : null)
            },
            m(t, e) {
                Ol(t, n, e)
            },
            p(t, r) {
                8192 & r && e !== (e = t[28]) && jl(n, "name", e),
                8 & r && jl(n, "instrument", t[3]),
                2048 & r && jl(n, "scale", t[11]),
                4096 & r && i !== (i = t[12] ? "" : null) && jl(n, "dark", i)
            },
            d(t) {
                t && Cl(n)
            }
        }
    }
    function wx(t) {
        let n, e, i, r, o, s, u, c, a, l, f, h = (t[2].key || "?") + "", d = t[2].timeSignature + "";
        return {
            c() {
                n = Xl("div"),
                e = Xl("span"),
                e.textContent = "原唱调",
                i = _l(),
                r = Xl("span"),
                o = Il("1="),
                s = Il(h),
                u = _l(),
                c = Xl("span"),
                c.textContent = "拍号",
                a = _l(),
                l = Xl("span"),
                f = Il(d),
                Dl(e, "class", "label svelte-k98ekn"),
                Dl(r, "class", "value svelte-k98ekn"),
                Dl(c, "class", "label svelte-k98ekn"),
                Ll(c, "hide", !t[2].timeSignature),
                Dl(l, "class", "value svelte-k98ekn"),
                Ll(l, "hide", !t[2].timeSignature),
                Dl(n, "class", "xhe-header svelte-k98ekn")
            },
            m(t, h) {
                Ol(t, n, h),
                Tl(n, e),
                Tl(n, i),
                Tl(n, r),
                Tl(r, o),
                Tl(r, s),
                Tl(n, u),
                Tl(n, c),
                Tl(n, a),
                Tl(n, l),
                Tl(l, f)
            },
            p(t, n) {
                4 & n && h !== (h = (t[2].key || "?") + "") && ql(s, h),
                4 & n && Ll(c, "hide", !t[2].timeSignature),
                4 & n && d !== (d = t[2].timeSignature + "") && ql(f, d),
                4 & n && Ll(l, "hide", !t[2].timeSignature)
            },
            d(t) {
                t && Cl(n)
            }
        }
    }
    function xx(t) {
        let n, e, i, r, o, s = !t[6] && yx(t), u = t[4] === rt.REGULAR && !t[10] && !t[7] && gx(t), c = t[6] && !t[7] && wx(t);
        return {
            c() {
                n = Xl("div"),
                s && s.c(),
                e = _l(),
                u && u.c(),
                i = _l(),
                c && c.c(),
                r = _l(),
                o = Xl("div"),
                Dl(o, "class", "xhe-body svelte-k98ekn"),
                Dl(n, "class", "xhe-sheet svelte-k98ekn"),
                Dl(n, "columns", t[9]),
                Ll(n, "mobile", t[6])
            },
            m(a, l) {
                Ol(a, n, l),
                s && s.m(n, null),
                Tl(n, e),
                u && u.m(n, null),
                Tl(n, i),
                c && c.m(n, null),
                Tl(n, r),
                Tl(n, o),
                t[21](o),
                t[22](n)
            },
            p(t, [o]) {
                t[6] ? s && (s.d(1),
                s = null) : s ? s.p(t, o) : (s = yx(t),
                s.c(),
                s.m(n, e)),
                t[4] !== rt.REGULAR || t[10] || t[7] ? u && (u.d(1),
                u = null) : u ? u.p(t, o) : (u = gx(t),
                u.c(),
                u.m(n, i)),
                t[6] && !t[7] ? c ? c.p(t, o) : (c = wx(t),
                c.c(),
                c.m(n, r)) : c && (c.d(1),
                c = null),
                512 & o && Dl(n, "columns", t[9]),
                64 & o && Ll(n, "mobile", t[6])
            },
            i: el,
            o: el,
            d(e) {
                e && Cl(n),
                s && s.d(),
                u && u.d(),
                c && c.d(),
                t[21](null),
                t[22](null)
            }
        }
    }
    function kx(t, n, e) {
        let i;
        hl(t, ch, (t => e(20, i = t)));
        let {sheet: r} = n
          , {instrument: o} = n
          , {chordStyle: s} = n
          , {zoom: u} = n
          , {keyShift: c} = n
          , {tempo: a} = n
          , {simplifyChords: l=!1} = n
          , {noLineBreak: f=!1} = n
          , {forMobile: h} = n
          , {horizontal: d} = n
          , {keyPlay: v} = n
          , {element: p} = n
          , {bodyElement: m} = n
          , {columns: y} = n
          , {printable: g} = n
          , {lyricsOnly: b=!1} = n;
        const w = rf();
        let x, k, S, E = 1, T = [];
        async function O() {
            if (!k)
                return;
            const {shiftKey: t, scaleChord: n, simplifyChord: i} = await Da(_a);
            e(13, T = []);
            let u = sd(x.itemList);
            b && (u = function(t) {
                let n = !1;
                const e = t.filter(( (t, e, i) => {
                    if (r.use === et.SOLO) {
                        if ([td.RHYTHM, td.HEADLINE].includes(t.type))
                            return !1
                    } else if ([td.TAB, td.RHYTHM, td.HEADLINE].includes(t.type))
                        return !1;
                    if (t.type === td.TEXT && !C(i[e - 1]) && !C(i[e + 1]))
                        return !1;
                    const o = [td.TEXT, td.CHORD_ANCHOR].includes(t.type) && !t.value.trim() || t.type === td.LINE_BREAK;
                    if (!n) {
                        if (o)
                            return !1;
                        n = !0
                    }
                    return !0
                }
                ));
                return 0 === e.length ? t : e
            }(u)),
            u = u.map((e => {
                if (e.type === td.CHORD_ANCHOR) {
                    let o = e.attributes.chord;
                    l && (o = i(o)),
                    o = s === rt.NUMBER ? n(o, r.keyUse || "C") : t(o, c),
                    e.attributes.chord = o,
                    T.includes(o) || T.push(o)
                }
                return e
            }
            )),
            k.updateOptions({
                instrument: o,
                chordStyle: s,
                noLineBreak: f,
                scale: E,
                dark: S,
                horizontal: d
            }),
            k.updateItemList(u),
            requestAnimationFrame(( () => {
                w("rendercomplete")
            }
            ))
        }
        function C(t) {
            return t && t.type === td.CHORD_ANCHOR
        }
        return nf((async () => {
            e(19, k = new xd(m,h)),
            x = JSON.parse(r.content);
            const {install: t} = await Da(_a);
            t(self, px(o).concat(r.definitions || []))
        }
        )),
        t.$$set = t => {
            "sheet"in t && e(2, r = t.sheet),
            "instrument"in t && e(3, o = t.instrument),
            "chordStyle"in t && e(4, s = t.chordStyle),
            "zoom"in t && e(14, u = t.zoom),
            "keyShift"in t && e(15, c = t.keyShift),
            "tempo"in t && e(5, a = t.tempo),
            "simplifyChords"in t && e(16, l = t.simplifyChords),
            "noLineBreak"in t && e(17, f = t.noLineBreak),
            "forMobile"in t && e(6, h = t.forMobile),
            "horizontal"in t && e(7, d = t.horizontal),
            "keyPlay"in t && e(8, v = t.keyPlay),
            "element"in t && e(0, p = t.element),
            "bodyElement"in t && e(1, m = t.bodyElement),
            "columns"in t && e(9, y = t.columns),
            "printable"in t && e(18, g = t.printable),
            "lyricsOnly"in t && e(10, b = t.lyricsOnly)
        }
        ,
        t.$$.update = () => {
            1310720 & t.$$.dirty && e(12, S = !g && i),
            16384 & t.$$.dirty && e(11, E = (u + 4) / 5),
            759964 & t.$$.dirty && O()
        }
        ,
        [p, m, r, o, s, a, h, d, v, y, b, E, S, T, u, c, l, f, g, k, i, function(t) {
            af[t ? "unshift" : "push"](( () => {
                m = t,
                e(1, m)
            }
            ))
        }
        , function(t) {
            af[t ? "unshift" : "push"](( () => {
                p = t,
                e(0, p)
            }
            ))
        }
        ]
    }
    class Sx extends Ff {
        constructor(t) {
            super(),
            $f(this, t, kx, xx, al, {
                sheet: 2,
                instrument: 3,
                chordStyle: 4,
                zoom: 14,
                keyShift: 15,
                tempo: 5,
                simplifyChords: 16,
                noLineBreak: 17,
                forMobile: 6,
                horizontal: 7,
                keyPlay: 8,
                element: 0,
                bodyElement: 1,
                columns: 9,
                printable: 18,
                lyricsOnly: 10
            })
        }
    }
    function Ex(t, n, e) {
        const i = t.slice();
        return i[12] = n[e],
        i
    }
    function Tx(t) {
        let n;
        return {
            c() {
                n = Xl("div"),
                n.textContent = "请点击右下方菜单打印曲谱",
                Dl(n, "placeholder", ""),
                Dl(n, "class", "svelte-10d563p")
            },
            m(t, e) {
                Ol(t, n, e)
            },
            p: el,
            i: el,
            o: el,
            d(t) {
                t && Cl(n)
            }
        }
    }
    function Ox(t) {
        let n, e, i, r, o, s, u, c = new Array(100), a = [];
        for (let n = 0; n < c.length; n += 1)
            a[n] = Cx(Ex(t, c, n));
        const l = [Xx, Ax]
          , f = [];
        function h(t, n) {
            return t[1].format === nt.XHE ? 0 : (2 & n && (i = !!at.includes(t[1].format)),
            i ? 1 : -1)
        }
        return ~(r = h(t, -1)) && (o = f[r] = l[r](t)),
        {
            c() {
                n = Xl("div");
                for (let t = 0; t < a.length; t += 1)
                    a[t].c();
                e = _l(),
                o && o.c(),
                s = Ml(),
                Dl(n, "class", "watermark svelte-10d563p")
            },
            m(t, i) {
                Ol(t, n, i);
                for (let t = 0; t < a.length; t += 1)
                    a[t].m(n, null);
                Ol(t, e, i),
                ~r && f[r].m(t, i),
                Ol(t, s, i),
                u = !0
            },
            p(t, e) {
                if (2 & e) {
                    let i;
                    for (c = new Array(100),
                    i = 0; i < c.length; i += 1) {
                        const r = Ex(t, c, i);
                        a[i] ? a[i].p(r, e) : (a[i] = Cx(r),
                        a[i].c(),
                        a[i].m(n, null))
                    }
                    for (; i < a.length; i += 1)
                        a[i].d(1);
                    a.length = c.length
                }
                let i = r;
                r = h(t, e),
                r === i ? ~r && f[r].p(t, e) : (o && (Of(),
                Xf(f[i], 1, 1, ( () => {
                    f[i] = null
                }
                )),
                Cf()),
                ~r ? (o = f[r],
                o ? o.p(t, e) : (o = f[r] = l[r](t),
                o.c()),
                Af(o, 1),
                o.m(s.parentNode, s)) : o = null)
            },
            i(t) {
                u || (Af(o),
                u = !0)
            },
            o(t) {
                Xf(o),
                u = !1
            },
            d(t) {
                t && Cl(n),
                Al(a, t),
                t && Cl(e),
                ~r && f[r].d(t),
                t && Cl(s)
            }
        }
    }
    function Cx(t) {
        let n, e, i, r = (t[1].author || "") + "";
        return {
            c() {
                n = Xl("span"),
                e = Il(r),
                i = Il("@有谱么"),
                Dl(n, "class", "svelte-10d563p")
            },
            m(t, r) {
                Ol(t, n, r),
                Tl(n, e),
                Tl(n, i)
            },
            p(t, n) {
                2 & n && r !== (r = (t[1].author || "") + "") && ql(e, r)
            },
            d(t) {
                t && Cl(n)
            }
        }
    }
    function Ax(t) {
        let n, e, i, r, o, s, u, c;
        const a = [{
            sheet: t[1]
        }, t[2], {
            fullSize: !0
        }, {
            printable: !0
        }];
        let l = {};
        for (let t = 0; t < a.length; t += 1)
            l = rl(l, a[t]);
        return n = new fx({
            props: l
        }),
        n.$on("rendercomplete", t[7]),
        {
            c() {
                jf(n.$$.fragment),
                e = _l(),
                i = Xl("footer"),
                r = Xl("div"),
                o = Xl("div"),
                s = _l(),
                u = Xl("div"),
                u.textContent = "扫码听示范",
                Dl(o, "class", "qrcode svelte-10d563p"),
                Dl(u, "class", "label svelte-10d563p"),
                Dl(r, "class", "qr-box svelte-10d563p"),
                Dl(i, "class", "print-sheet-corner svelte-10d563p")
            },
            m(a, l) {
                Bf(n, a, l),
                Ol(a, e, l),
                Ol(a, i, l),
                Tl(i, r),
                Tl(r, o),
                o.innerHTML = t[3],
                Tl(r, s),
                Tl(r, u),
                c = !0
            },
            p(t, e) {
                const i = 6 & e ? Mf(a, [2 & e && {
                    sheet: t[1]
                }, 4 & e && Rf(t[2]), a[2], a[3]]) : {};
                n.$set(i),
                (!c || 8 & e) && (o.innerHTML = t[3])
            },
            i(t) {
                c || (Af(n.$$.fragment, t),
                c = !0)
            },
            o(t) {
                Xf(n.$$.fragment, t),
                c = !1
            },
            d(t) {
                Pf(n, t),
                t && Cl(e),
                t && Cl(i)
            }
        }
    }
    function Xx(t) {
        let n, e, i;
        const r = [{
            sheet: t[1]
        }, t[2], {
            columns: t[6]
        }, {
            printable: !0
        }];
        function o(n) {
            t[9](n)
        }
        let s = {};
        for (let t = 0; t < r.length; t += 1)
            s = rl(s, r[t]);
        return void 0 !== t[5] && (s.element = t[5]),
        n = new Sx({
            props: s
        }),
        af.push(( () => Df(n, "element", o))),
        n.$on("rendercomplete", t[7]),
        {
            c() {
                jf(n.$$.fragment)
            },
            m(t, e) {
                Bf(n, t, e),
                i = !0
            },
            p(t, i) {
                const o = 70 & i ? Mf(r, [2 & i && {
                    sheet: t[1]
                }, 4 & i && Rf(t[2]), 64 & i && {
                    columns: t[6]
                }, r[3]]) : {};
                !e && 32 & i && (e = !0,
                o.element = t[5],
                mf(( () => e = !1))),
                n.$set(o)
            },
            i(t) {
                i || (Af(n.$$.fragment, t),
                i = !0)
            },
            o(t) {
                Xf(n.$$.fragment, t),
                i = !1
            },
            d(t) {
                Pf(n, t)
            }
        }
    }
    function Ix(t) {
        let n, e, i, r;
        const o = [Ox, Tx]
          , s = [];
        function u(t, n) {
            return t[0] ? 0 : 1
        }
        return e = u(t),
        i = s[e] = o[e](t),
        {
            c() {
                n = Xl("div"),
                i.c(),
                Dl(n, "class", "print-sheet svelte-10d563p"),
                Ll(n, "printing", t[4])
            },
            m(t, i) {
                Ol(t, n, i),
                s[e].m(n, null),
                r = !0
            },
            p(t, [r]) {
                let c = e;
                e = u(t),
                e === c ? s[e].p(t, r) : (Of(),
                Xf(s[c], 1, 1, ( () => {
                    s[c] = null
                }
                )),
                Cf(),
                i = s[e],
                i ? i.p(t, r) : (i = s[e] = o[e](t),
                i.c()),
                Af(i, 1),
                i.m(n, null)),
                16 & r && Ll(n, "printing", t[4])
            },
            i(t) {
                r || (Af(i),
                r = !0)
            },
            o(t) {
                Xf(i),
                r = !1
            },
            d(t) {
                t && Cl(n),
                s[e].d()
            }
        }
    }
    const _x = 1200;
    function Mx(t, n, e) {
        const i = sf("webViewInterface")
          , r = bi().iVersion || k(navigator.userAgent) ? void 0 : 2;
        let o, s, u, c, a, l = !1;
        return [o, s, u, c, l, a, r, async function() {
            if (l) {
                if (!at.includes(s.format)) {
                    if (await new Promise(requestAnimationFrame),
                    !a.querySelector("footer.print-sheet-footer")) {
                        const t = fn("footer", null, ["print-sheet-footer"]);
                        t.innerHTML = `\n        <div>\n          谱由<i>有谱么</i>Pu主 ${s.owner.displayName}\n          提供\n        </div>\n        <div class='qrcode'>${c}</div>\n        <div>扫码打开电子版</div>\n    `,
                        a.appendChild(t)
                    }
                    r > 1 && a.offsetHeight < _x && e(5, a.style.height = _x + "px", a)
                }
                i.print(),
                e(4, l = !1)
            }
        }
        , async function(t, n) {
            if (o || e(0, o = !0),
            e(4, l = !0),
            e(1, s = t),
            e(2, u = n),
            !c) {
                const t = await Da(Aa);
                e(3, c = t(Tu + "/view/" + s.id))
            }
        }
        , function(t) {
            a = t,
            e(5, a)
        }
        ]
    }
    class Rx extends Ff {
        constructor(t) {
            super(),
            $f(this, t, Mx, Ix, al, {
                print: 8
            })
        }
        get print() {
            return this.$$.ctx[8]
        }
    }
    function Dx(t) {
        let n, e, i, r, o, s, u, c, a, l = t[0].displayName + "", f = (t[0].location || dt) + "";
        return n = new ly({
            props: {
                size: "large",
                user: t[0]
            }
        }),
        {
            c() {
                jf(n.$$.fragment),
                e = _l(),
                i = Xl("div"),
                r = Xl("div"),
                o = Il(l),
                s = _l(),
                u = Xl("div"),
                c = Il(f),
                Dl(r, "class", "username svelte-eblaf6"),
                Dl(u, "class", "stats svelte-eblaf6"),
                Dl(i, "class", "info svelte-eblaf6")
            },
            m(t, l) {
                Bf(n, t, l),
                Ol(t, e, l),
                Ol(t, i, l),
                Tl(i, r),
                Tl(r, o),
                Tl(i, s),
                Tl(i, u),
                Tl(u, c),
                a = !0
            },
            p(t, e) {
                const i = {};
                1 & e && (i.user = t[0]),
                n.$set(i),
                (!a || 1 & e) && l !== (l = t[0].displayName + "") && ql(o, l),
                (!a || 1 & e) && f !== (f = (t[0].location || dt) + "") && ql(c, f)
            },
            i(t) {
                a || (Af(n.$$.fragment, t),
                a = !0)
            },
            o(t) {
                Xf(n.$$.fragment, t),
                a = !1
            },
            d(t) {
                Pf(n, t),
                t && Cl(e),
                t && Cl(i)
            }
        }
    }
    function jx(t) {
        let n, e, i, r, o = t[0] && Dx(t);
        return {
            c() {
                n = Xl("section"),
                o && o.c(),
                Dl(n, "class", "profile svelte-eblaf6")
            },
            m(s, u) {
                Ol(s, n, u),
                o && o.m(n, null),
                e = !0,
                i || (r = Rl(n, "click", t[1]),
                i = !0)
            },
            p(t, [e]) {
                t[0] ? o ? (o.p(t, e),
                1 & e && Af(o, 1)) : (o = Dx(t),
                o.c(),
                Af(o, 1),
                o.m(n, null)) : o && (Of(),
                Xf(o, 1, 1, ( () => {
                    o = null
                }
                )),
                Cf())
            },
            i(t) {
                e || (Af(o),
                e = !0)
            },
            o(t) {
                Xf(o),
                e = !1
            },
            d(t) {
                t && Cl(n),
                o && o.d(),
                i = !1,
                r()
            }
        }
    }
    function Bx(t, n, e) {
        let {user: i} = n;
        return t.$$set = t => {
            "user"in t && e(0, i = t.user)
        }
        ,
        [i, () => location.href = "/user#code=" + i.userCode]
    }
    class Px extends Ff {
        constructor(t) {
            super(),
            $f(this, t, Bx, jx, al, {
                user: 0
            })
        }
    }
    function qx(t) {
        let n, e, i, r, o, s, u, c, a, l, f, h, d, v, p, m, y, g, b, w, x, k, S, E, T;
        return {
            c() {
                n = Xl("div"),
                e = Xl("div"),
                i = Xl("span"),
                i.textContent = "人声轨总音符",
                r = _l(),
                o = Xl("span"),
                o.textContent = `${t[3]}个`,
                s = _l(),
                u = Xl("div"),
                c = Xl("span"),
                c.textContent = "音域",
                a = _l(),
                l = Xl("span"),
                l.textContent = `${t[0](t[2])} - ${t[0](t[1])} (${t[2]}\n      - ${t[1]})`,
                f = _l(),
                h = Xl("div"),
                d = Xl("span"),
                d.textContent = "跨度",
                v = _l(),
                p = Xl("span"),
                p.textContent = `${t[5]}个半音`,
                m = _l(),
                y = Xl("div"),
                g = Xl("span"),
                g.textContent = "中位",
                b = _l(),
                w = Xl("span"),
                w.textContent = `${t[0](t[4])}(${t[4]})`,
                x = _l(),
                k = Xl("div"),
                S = Xl("span"),
                S.textContent = "平均",
                E = _l(),
                T = Xl("span"),
                T.textContent = `${t[0](t[6])}(${t[6]})`,
                Dl(i, "class", "label"),
                Dl(e, "class", "item"),
                Dl(c, "class", "label"),
                Dl(u, "class", "item"),
                Dl(d, "class", "label"),
                Dl(h, "class", "item svelte-9zqwtb"),
                Ll(h, "warning", t[7]),
                Dl(g, "class", "label"),
                Dl(y, "class", "item"),
                Dl(S, "class", "label"),
                Dl(T, "class", "label"),
                Dl(k, "class", "item"),
                Dl(n, "class", "vocal-range svelte-9zqwtb")
            },
            m(t, O) {
                Ol(t, n, O),
                Tl(n, e),
                Tl(e, i),
                Tl(e, r),
                Tl(e, o),
                Tl(n, s),
                Tl(n, u),
                Tl(u, c),
                Tl(u, a),
                Tl(u, l),
                Tl(n, f),
                Tl(n, h),
                Tl(h, d),
                Tl(h, v),
                Tl(h, p),
                Tl(n, m),
                Tl(n, y),
                Tl(y, g),
                Tl(y, b),
                Tl(y, w),
                Tl(n, x),
                Tl(n, k),
                Tl(k, S),
                Tl(k, E),
                Tl(k, T)
            },
            p: el,
            i: el,
            o: el,
            d(t) {
                t && Cl(n)
            }
        }
    }
    function $x(t, n, e) {
        let {vocalRange: i} = n;
        const r = ["C", "C#", "D", "Eb", "E", "F", "F#", "G", "G#", "A", "Bb", "B"]
          , {high: o, low: s, total: u, num: c, median: a} = i
          , l = o - s
          , f = Math.round(u / c)
          , h = l > 24;
        return t.$$set = t => {
            "vocalRange"in t && e(8, i = t.vocalRange)
        }
        ,
        [function(t) {
            const n = Math.floor(t / 12) - 1;
            return r[t % 12] + String(n)
        }
        , o, s, c, a, l, f, h, i]
    }
    class Fx extends Ff {
        constructor(t) {
            super(),
            $f(this, t, $x, qx, al, {
                vocalRange: 8,
                getPitchName: 0
            })
        }
        get getPitchName() {
            return this.$$.ctx[0]
        }
    }
    function Nx(t) {
        let n, e, i, r, o, s, u, c, a, l, f, h, d, v, p, m, y, g, b, w, x, k, S, E, T, O, C, A, X, I, _, M, R, D, j, B, P, q, $, F = Rw[t[0]] + "";
        function N(n) {
            t[11](n)
        }
        let z = {
            options: Dw,
            size: "small"
        };
        function L(n) {
            t[12](n)
        }
        void 0 !== t[0] && (z.selected = t[0]),
        s = new Zb({
            props: z
        }),
        af.push(( () => Df(s, "selected", N)));
        let G = {};
        function U(n) {
            t[13](n)
        }
        void 0 !== t[4] && (G.on = t[4]),
        d = new Hb({
            props: G
        }),
        af.push(( () => Df(d, "on", L)));
        let H = {};
        void 0 !== t[5] && (H.on = t[5]),
        w = new Hb({
            props: H
        }),
        af.push(( () => Df(w, "on", U)));
        let V = 0 !== t[1] && zx(t);
        function W(n) {
            t[15](n)
        }
        let J = {};
        function K(n) {
            t[16](n)
        }
        void 0 !== t[1] && (J.value = t[1]),
        I = new Ow({
            props: J
        }),
        af.push(( () => Df(I, "value", W)));
        let Y = {
            options: ct(t[6], !0)
        };
        return void 0 !== t[3] && (Y.selected = t[3]),
        P = new Mw({
            props: Y
        }),
        af.push(( () => Df(P, "selected", K))),
        {
            c() {
                n = Xl("div"),
                e = Xl("div"),
                i = Il(F),
                r = _l(),
                o = Xl("div"),
                jf(s.$$.fragment),
                c = _l(),
                a = Xl("div"),
                l = Xl("div"),
                l.textContent = "简化和弦",
                f = _l(),
                h = Xl("div"),
                jf(d.$$.fragment),
                p = _l(),
                m = Xl("div"),
                y = Xl("div"),
                y.textContent = "并行显示",
                g = _l(),
                b = Xl("div"),
                jf(w.$$.fragment),
                k = _l(),
                S = Xl("div"),
                E = Xl("div"),
                T = Il("移调: "),
                O = Il(t[7]),
                C = _l(),
                V && V.c(),
                A = _l(),
                X = Xl("div"),
                jf(I.$$.fragment),
                M = _l(),
                R = Xl("div"),
                D = Xl("div"),
                D.textContent = "变调夹",
                j = _l(),
                B = Xl("div"),
                jf(P.$$.fragment),
                Dl(e, "class", "label svelte-u9cqo2"),
                Dl(o, "class", "content svelte-u9cqo2"),
                Dl(n, "class", "row svelte-u9cqo2"),
                Dl(l, "class", "label svelte-u9cqo2"),
                Dl(h, "class", "content svelte-u9cqo2"),
                Dl(a, "class", "row svelte-u9cqo2"),
                Dl(y, "class", "label svelte-u9cqo2"),
                Dl(b, "class", "content svelte-u9cqo2"),
                Dl(m, "class", "row svelte-u9cqo2"),
                Dl(E, "class", "label svelte-u9cqo2"),
                Dl(X, "class", "content svelte-u9cqo2"),
                Dl(S, "class", "row svelte-u9cqo2"),
                Dl(D, "class", "label svelte-u9cqo2"),
                Dl(B, "class", "content svelte-u9cqo2"),
                Dl(R, "class", "row svelte-u9cqo2")
            },
            m(t, u) {
                Ol(t, n, u),
                Tl(n, e),
                Tl(e, i),
                Tl(n, r),
                Tl(n, o),
                Bf(s, o, null),
                Ol(t, c, u),
                Ol(t, a, u),
                Tl(a, l),
                Tl(a, f),
                Tl(a, h),
                Bf(d, h, null),
                Ol(t, p, u),
                Ol(t, m, u),
                Tl(m, y),
                Tl(m, g),
                Tl(m, b),
                Bf(w, b, null),
                Ol(t, k, u),
                Ol(t, S, u),
                Tl(S, E),
                Tl(E, T),
                Tl(E, O),
                Tl(E, C),
                V && V.m(E, null),
                Tl(S, A),
                Tl(S, X),
                Bf(I, X, null),
                Ol(t, M, u),
                Ol(t, R, u),
                Tl(R, D),
                Tl(R, j),
                Tl(R, B),
                Bf(P, B, null),
                $ = !0
            },
            p(t, n) {
                (!$ || 1 & n) && F !== (F = Rw[t[0]] + "") && ql(i, F);
                const e = {};
                !u && 1 & n && (u = !0,
                e.selected = t[0],
                mf(( () => u = !1))),
                s.$set(e);
                const r = {};
                !v && 16 & n && (v = !0,
                r.on = t[4],
                mf(( () => v = !1))),
                d.$set(r);
                const o = {};
                !x && 32 & n && (x = !0,
                o.on = t[5],
                mf(( () => x = !1))),
                w.$set(o),
                (!$ || 128 & n) && ql(O, t[7]),
                0 !== t[1] ? V ? V.p(t, n) : (V = zx(t),
                V.c(),
                V.m(E, null)) : V && (V.d(1),
                V = null);
                const c = {};
                !_ && 2 & n && (_ = !0,
                c.value = t[1],
                mf(( () => _ = !1))),
                I.$set(c);
                const a = {};
                64 & n && (a.options = ct(t[6], !0)),
                !q && 8 & n && (q = !0,
                a.selected = t[3],
                mf(( () => q = !1))),
                P.$set(a)
            },
            i(t) {
                $ || (Af(s.$$.fragment, t),
                Af(d.$$.fragment, t),
                Af(w.$$.fragment, t),
                Af(I.$$.fragment, t),
                Af(P.$$.fragment, t),
                $ = !0)
            },
            o(t) {
                Xf(s.$$.fragment, t),
                Xf(d.$$.fragment, t),
                Xf(w.$$.fragment, t),
                Xf(I.$$.fragment, t),
                Xf(P.$$.fragment, t),
                $ = !1
            },
            d(t) {
                t && Cl(n),
                Pf(s),
                t && Cl(c),
                t && Cl(a),
                Pf(d),
                t && Cl(p),
                t && Cl(m),
                Pf(w),
                t && Cl(k),
                t && Cl(S),
                V && V.d(),
                Pf(I),
                t && Cl(M),
                t && Cl(R),
                Pf(P)
            }
        }
    }
    function zx(t) {
        let n, e, i;
        return {
            c() {
                n = Xl("span"),
                n.textContent = "重置",
                Dl(n, "class", "bottom clickable svelte-u9cqo2")
            },
            m(r, o) {
                Ol(r, n, o),
                e || (i = Rl(n, "click", t[14]),
                e = !0)
            },
            p: el,
            d(t) {
                t && Cl(n),
                e = !1,
                i()
            }
        }
    }
    function Lx(t) {
        let n, e, i, r, o, s, u, c, a, l, f, h = t[9][t[2]] + "";
        function d(n) {
            t[10](n)
        }
        let v = {
            min: 0,
            max: 4
        };
        void 0 !== t[2] && (v.value = t[2]),
        c = new Ow({
            props: v
        }),
        af.push(( () => Df(c, "value", d)));
        let p = !t[8] && Nx(t);
        return {
            c() {
                n = Xl("section"),
                e = Xl("div"),
                i = Xl("div"),
                r = Il("字号: "),
                o = Il(h),
                s = _l(),
                u = Xl("div"),
                jf(c.$$.fragment),
                l = _l(),
                p && p.c(),
                Dl(i, "class", "label svelte-u9cqo2"),
                Dl(u, "class", "content svelte-u9cqo2"),
                Dl(e, "class", "row svelte-u9cqo2"),
                Dl(n, "class", "svelte-u9cqo2")
            },
            m(t, a) {
                Ol(t, n, a),
                Tl(n, e),
                Tl(e, i),
                Tl(i, r),
                Tl(i, o),
                Tl(e, s),
                Tl(e, u),
                Bf(c, u, null),
                Tl(n, l),
                p && p.m(n, null),
                f = !0
            },
            p(t, [e]) {
                (!f || 4 & e) && h !== (h = t[9][t[2]] + "") && ql(o, h);
                const i = {};
                !a && 4 & e && (a = !0,
                i.value = t[2],
                mf(( () => a = !1))),
                c.$set(i),
                t[8] ? p && (Of(),
                Xf(p, 1, 1, ( () => {
                    p = null
                }
                )),
                Cf()) : p ? (p.p(t, e),
                256 & e && Af(p, 1)) : (p = Nx(t),
                p.c(),
                Af(p, 1),
                p.m(n, null))
            },
            i(t) {
                f || (Af(c.$$.fragment, t),
                Af(p),
                f = !0)
            },
            o(t) {
                Xf(c.$$.fragment, t),
                Xf(p),
                f = !1
            },
            d(t) {
                t && Cl(n),
                Pf(c),
                p && p.d()
            }
        }
    }
    function Gx(t, n, e) {
        let {chordStyle: i=rt.REGULAR} = n
          , {instrument: r=Z.GUITAR} = n
          , {keyShift: o=0} = n
          , {keyPlay: s} = n
          , {zoom: u} = n
          , {capo: c} = n
          , {simplifyChords: a=!1} = n
          , {noLineBreak: l=!1} = n
          , {chordOptionsDisabled: f=!1} = n;
        return t.$$set = t => {
            "chordStyle"in t && e(0, i = t.chordStyle),
            "instrument"in t && e(6, r = t.instrument),
            "keyShift"in t && e(1, o = t.keyShift),
            "keyPlay"in t && e(7, s = t.keyPlay),
            "zoom"in t && e(2, u = t.zoom),
            "capo"in t && e(3, c = t.capo),
            "simplifyChords"in t && e(4, a = t.simplifyChords),
            "noLineBreak"in t && e(5, l = t.noLineBreak),
            "chordOptionsDisabled"in t && e(8, f = t.chordOptionsDisabled)
        }
        ,
        [i, o, u, c, a, l, r, s, f, ["特小", "小", "中", "大", "特大"], function(t) {
            u = t,
            e(2, u)
        }
        , function(t) {
            i = t,
            e(0, i)
        }
        , function(t) {
            a = t,
            e(4, a)
        }
        , function(t) {
            l = t,
            e(5, l)
        }
        , () => e(1, o = 0), function(t) {
            o = t,
            e(1, o)
        }
        , function(t) {
            c = t,
            e(3, c)
        }
        ]
    }
    class Ux extends Ff {
        constructor(t) {
            super(),
            $f(this, t, Gx, Lx, al, {
                chordStyle: 0,
                instrument: 6,
                keyShift: 1,
                keyPlay: 7,
                zoom: 2,
                capo: 3,
                simplifyChords: 4,
                noLineBreak: 5,
                chordOptionsDisabled: 8
            })
        }
    }
    function Hx(t) {
        let n;
        return {
            c() {
                n = Xl("div"),
                n.innerHTML = '<span class="yoopu3-icon svelte-15g1ex"></span>\n          提示：曲谱编辑尚未完成。请在屏幕右下方操作面板选择&quot;编辑曲谱&quot;或者&quot;放弃修改&quot;继续。',
                Dl(n, "class", "review-panel review-required svelte-15g1ex")
            },
            m(t, e) {
                Ol(t, n, e)
            },
            p: el,
            d(t) {
                t && Cl(n)
            }
        }
    }
    function Vx(t) {
        let n;
        let e = function(t, n) {
            return t[29] ? Jx : Wx
        }(t)(t);
        return {
            c() {
                e.c(),
                n = Ml()
            },
            m(t, i) {
                e.m(t, i),
                Ol(t, n, i)
            },
            p(t, n) {
                e.p(t, n)
            },
            d(t) {
                e.d(t),
                t && Cl(n)
            }
        }
    }
    function Wx(t) {
        let n, e, i, r;
        function o(t, n) {
            return t[0].sheetCode ? Yx : Kx
        }
        let s = o(t)
          , u = s(t);
        return {
            c() {
                n = Xl("div"),
                e = Xl("span"),
                e.textContent = "",
                i = _l(),
                u.c(),
                r = Il("\n            请进入编辑页面查看详情"),
                Dl(e, "class", "yoopu3-icon svelte-15g1ex"),
                Dl(n, "class", "review-panel review-result svelte-15g1ex")
            },
            m(t, o) {
                Ol(t, n, o),
                Tl(n, e),
                Tl(n, i),
                u.m(n, null),
                Tl(n, r)
            },
            p(t, e) {
                s !== (s = o(t)) && (u.d(1),
                u = s(t),
                u && (u.c(),
                u.m(n, r)))
            },
            d(t) {
                t && Cl(n),
                u.d()
            }
        }
    }
    function Jx(t) {
        let n, e, i;
        function r(t, n) {
            return t[0].draftId ? Zx : Qx
        }
        let o = r(t)
          , s = o(t);
        return {
            c() {
                n = Xl("div"),
                e = Xl("span"),
                e.textContent = "",
                i = _l(),
                s.c(),
                Dl(e, "class", "yoopu3-icon svelte-15g1ex"),
                Dl(n, "class", "review-panel review-pending svelte-15g1ex")
            },
            m(t, r) {
                Ol(t, n, r),
                Tl(n, e),
                Tl(n, i),
                s.m(n, null)
            },
            p(t, e) {
                o !== (o = r(t)) && (s.d(1),
                s = o(t),
                s && (s.c(),
                s.m(n, null)))
            },
            d(t) {
                t && Cl(n),
                s.d()
            }
        }
    }
    function Kx(t) {
        let n;
        return {
            c() {
                n = Il("[公开发表的审核未通过]")
            },
            m(t, e) {
                Ol(t, n, e)
            },
            d(t) {
                t && Cl(n)
            }
        }
    }
    function Yx(t) {
        let n;
        return {
            c() {
                n = Il("[新增修改的审核未通过]")
            },
            m(t, e) {
                Ol(t, n, e)
            },
            d(t) {
                t && Cl(n)
            }
        }
    }
    function Qx(t) {
        let n;
        return {
            c() {
                n = Il("提示：曲谱已投稿作公开发表，正在等候审核中，等候期间您依旧可以做出修改。")
            },
            m(t, e) {
                Ol(t, n, e)
            },
            d(t) {
                t && Cl(n)
            }
        }
    }
    function Zx(t) {
        let n;
        return {
            c() {
                n = Il("提示：曲谱有修改在等候审核中，新修改的内容目前仅自己可见。")
            },
            m(t, e) {
                Ol(t, n, e)
            },
            d(t) {
                t && Cl(n)
            }
        }
    }
    function tk(t) {
        let n, e, i, r, o = on(t[0].changeSuggestion) + "";
        return {
            c() {
                n = Xl("div"),
                e = Xl("span"),
                e.textContent = "",
                i = Il("\n          修改建议："),
                Dl(e, "class", "yoopu3-icon svelte-15g1ex"),
                r = new Ul(null),
                Dl(n, "class", "review-panel review-result svelte-15g1ex")
            },
            m(t, s) {
                Ol(t, n, s),
                Tl(n, e),
                Tl(n, i),
                r.m(o, n)
            },
            p(t, n) {
                1 & n[0] && o !== (o = on(t[0].changeSuggestion) + "") && r.p(o)
            },
            d(t) {
                t && Cl(n)
            }
        }
    }
    function nk(t) {
        let n, e, i, r, o = t[0].format === nt.XHE && ik(t), s = t[17] && t[18] && rk(t);
        return {
            c() {
                n = Xl("div"),
                o && o.c(),
                e = _l(),
                s && s.c(),
                i = Ml(),
                Dl(n, "class", "sheet-container svelte-15g1ex")
            },
            m(u, c) {
                Ol(u, n, c),
                o && o.m(n, null),
                t[42](n),
                Ol(u, e, c),
                s && s.m(u, c),
                Ol(u, i, c),
                r = !0
            },
            p(t, e) {
                t[0].format === nt.XHE ? o ? (o.p(t, e),
                1 & e[0] && Af(o, 1)) : (o = ik(t),
                o.c(),
                Af(o, 1),
                o.m(n, null)) : o && (Of(),
                Xf(o, 1, 1, ( () => {
                    o = null
                }
                )),
                Cf()),
                t[17] && t[18] ? s ? (s.p(t, e),
                393216 & e[0] && Af(s, 1)) : (s = rk(t),
                s.c(),
                Af(s, 1),
                s.m(i.parentNode, i)) : s && (Of(),
                Xf(s, 1, 1, ( () => {
                    s = null
                }
                )),
                Cf())
            },
            i(t) {
                r || (Af(o),
                Af(s),
                r = !0)
            },
            o(t) {
                Xf(o),
                Xf(s),
                r = !1
            },
            d(r) {
                r && Cl(n),
                o && o.d(),
                t[42](null),
                r && Cl(e),
                s && s.d(r),
                r && Cl(i)
            }
        }
    }
    function ek(t) {
        let n, e, i, r, o, s, u;
        function c(n) {
            t[38](n)
        }
        let a = {
            fullSize: !0,
            sheet: t[0],
            capo: t[5],
            tempo: t[6],
            zoom: t[9],
            onlyShowBarNumberAtLineStart: t[10],
            highlightPianoBlackKeyNotes: t[11],
            keyShift: t[31] ? t[4] : null,
            staveProfile: Ci(t[8], t[0].type, t[0].use, t[21], t[22]),
            chordStyle: t[13],
            showErrors: t[28] || t[25],
            showErrorsOnly: !0,
            scrollElementSelector: "#nier-scroll-view"
        };
        function l(n) {
            t[39](n)
        }
        void 0 !== t[19] && (a.player = t[19]),
        e = new fx({
            props: a
        }),
        af.push(( () => Df(e, "player", c))),
        e.$on("rendercomplete", t[33]);
        let f = {
            user: t[1],
            canFullPlay: t[32],
            player: t[19],
            sheet: t[0],
            trackSettings: t[20]
        };
        return void 0 !== t[6] && (f.tempo = t[6]),
        o = new Lb({
            props: f
        }),
        af.push(( () => Df(o, "tempo", l))),
        {
            c() {
                n = Xl("div"),
                jf(e.$$.fragment),
                r = _l(),
                jf(o.$$.fragment),
                Dl(n, "class", "sheet-container svelte-15g1ex"),
                Dl(n, "id", "nier-scroll-view")
            },
            m(t, i) {
                Ol(t, n, i),
                Bf(e, n, null),
                Ol(t, r, i),
                Bf(o, t, i),
                u = !0
            },
            p(t, n) {
                const r = {};
                1 & n[0] && (r.sheet = t[0]),
                32 & n[0] && (r.capo = t[5]),
                64 & n[0] && (r.tempo = t[6]),
                512 & n[0] && (r.zoom = t[9]),
                1024 & n[0] && (r.onlyShowBarNumberAtLineStart = t[10]),
                2048 & n[0] && (r.highlightPianoBlackKeyNotes = t[11]),
                16 & n[0] && (r.keyShift = t[31] ? t[4] : null),
                6291713 & n[0] && (r.staveProfile = Ci(t[8], t[0].type, t[0].use, t[21], t[22])),
                8192 & n[0] && (r.chordStyle = t[13]),
                !i && 524288 & n[0] && (i = !0,
                r.player = t[19],
                mf(( () => i = !1))),
                e.$set(r);
                const u = {};
                2 & n[0] && (u.user = t[1]),
                524288 & n[0] && (u.player = t[19]),
                1 & n[0] && (u.sheet = t[0]),
                1048576 & n[0] && (u.trackSettings = t[20]),
                !s && 64 & n[0] && (s = !0,
                u.tempo = t[6],
                mf(( () => s = !1))),
                o.$set(u)
            },
            i(t) {
                u || (Af(e.$$.fragment, t),
                Af(o.$$.fragment, t),
                u = !0)
            },
            o(t) {
                Xf(e.$$.fragment, t),
                Xf(o.$$.fragment, t),
                u = !1
            },
            d(t) {
                t && Cl(n),
                Pf(e),
                t && Cl(r),
                Pf(o, t)
            }
        }
    }
    function ik(t) {
        let n, e, i;
        function r(n) {
            t[40](n)
        }
        let o = {
            sheet: t[0],
            zoom: t[9],
            instrument: t[30],
            chordStyle: t[13],
            simplifyChords: t[15],
            noLineBreak: t[16],
            keyShift: t[4],
            keyPlay: t[14],
            tempo: t[6]
        };
        return void 0 !== t[18] && (o.element = t[18]),
        n = new Sx({
            props: o
        }),
        af.push(( () => Df(n, "element", r))),
        n.$on("rendercomplete", t[41]),
        {
            c() {
                jf(n.$$.fragment)
            },
            m(t, e) {
                Bf(n, t, e),
                i = !0
            },
            p(t, i) {
                const r = {};
                1 & i[0] && (r.sheet = t[0]),
                512 & i[0] && (r.zoom = t[9]),
                8192 & i[0] && (r.chordStyle = t[13]),
                32768 & i[0] && (r.simplifyChords = t[15]),
                65536 & i[0] && (r.noLineBreak = t[16]),
                16 & i[0] && (r.keyShift = t[4]),
                16384 & i[0] && (r.keyPlay = t[14]),
                64 & i[0] && (r.tempo = t[6]),
                !e && 262144 & i[0] && (e = !0,
                r.element = t[18],
                mf(( () => e = !1))),
                n.$set(r)
            },
            i(t) {
                i || (Af(n.$$.fragment, t),
                i = !0)
            },
            o(t) {
                Xf(n.$$.fragment, t),
                i = !1
            },
            d(t) {
                Pf(n, t)
            }
        }
    }
    function rk(t) {
        let n, e, i, r;
        function o(n) {
            t[43](n)
        }
        function s(n) {
            t[44](n)
        }
        let u = {
            sheet: t[0],
            user: t[1],
            scrollElement: t[17],
            chordStyle: t[13],
            zoom: t[9],
            xheElement: t[18],
            sheetRenderCompleteCount: t[12]
        };
        return void 0 !== t[6] && (u.tempo = t[6]),
        void 0 !== t[7] && (u.scrollSpeed = t[7]),
        n = new Sw({
            props: u
        }),
        af.push(( () => Df(n, "tempo", o))),
        af.push(( () => Df(n, "scrollSpeed", s))),
        n.$on("fullScreen", t[34]),
        {
            c() {
                jf(n.$$.fragment)
            },
            m(t, e) {
                Bf(n, t, e),
                r = !0
            },
            p(t, r) {
                const o = {};
                1 & r[0] && (o.sheet = t[0]),
                2 & r[0] && (o.user = t[1]),
                131072 & r[0] && (o.scrollElement = t[17]),
                8192 & r[0] && (o.chordStyle = t[13]),
                512 & r[0] && (o.zoom = t[9]),
                262144 & r[0] && (o.xheElement = t[18]),
                4096 & r[0] && (o.sheetRenderCompleteCount = t[12]),
                !e && 64 & r[0] && (e = !0,
                o.tempo = t[6],
                mf(( () => e = !1))),
                !i && 128 & r[0] && (i = !0,
                o.scrollSpeed = t[7],
                mf(( () => i = !1))),
                n.$set(o)
            },
            i(t) {
                r || (Af(n.$$.fragment, t),
                r = !0)
            },
            o(t) {
                Xf(n.$$.fragment, t),
                r = !1
            },
            d(t) {
                Pf(n, t)
            }
        }
    }
    function ok(t) {
        let n, e;
        return n = new Px({
            props: {
                user: t[0].owner
            }
        }),
        {
            c() {
                jf(n.$$.fragment)
            },
            m(t, i) {
                Bf(n, t, i),
                e = !0
            },
            p(t, e) {
                const i = {};
                1 & e[0] && (i.user = t[0].owner),
                n.$set(i)
            },
            i(t) {
                e || (Af(n.$$.fragment, t),
                e = !0)
            },
            o(t) {
                Xf(n.$$.fragment, t),
                e = !1
            },
            d(t) {
                Pf(n, t)
            }
        }
    }
    function sk(t) {
        let n, e, i, r, o;
        return r = new Ty({
            props: {
                tags: t[0].tags
            }
        }),
        {
            c() {
                n = Xl("div"),
                e = Xl("div"),
                e.textContent = "分类",
                i = _l(),
                jf(r.$$.fragment),
                Dl(e, "class", "section-title svelte-15g1ex"),
                Dl(n, "class", "section svelte-15g1ex")
            },
            m(t, s) {
                Ol(t, n, s),
                Tl(n, e),
                Tl(n, i),
                Bf(r, n, null),
                o = !0
            },
            p(t, n) {
                const e = {};
                1 & n[0] && (e.tags = t[0].tags),
                r.$set(e)
            },
            i(t) {
                o || (Af(r.$$.fragment, t),
                o = !0)
            },
            o(t) {
                Xf(r.$$.fragment, t),
                o = !1
            },
            d(t) {
                t && Cl(n),
                Pf(r)
            }
        }
    }
    function uk(t) {
        let n, e, i, r, o, s, u, c, a, l = !Ti(t[0].id), f = l && ak(t);
        function h(n) {
            t[53](n)
        }
        function d(n) {
            t[54](n)
        }
        function v(n) {
            t[55](n)
        }
        function p(n) {
            t[56](n)
        }
        function m(n) {
            t[57](n)
        }
        function y(n) {
            t[58](n)
        }
        let g = {
            chordOptionsDisabled: t[0].use === et.SOLO,
            instrument: t[30],
            keyPlay: t[14]
        };
        return void 0 !== t[9] && (g.zoom = t[9]),
        void 0 !== t[13] && (g.chordStyle = t[13]),
        void 0 !== t[15] && (g.simplifyChords = t[15]),
        void 0 !== t[16] && (g.noLineBreak = t[16]),
        void 0 !== t[4] && (g.keyShift = t[4]),
        void 0 !== t[5] && (g.capo = t[5]),
        e = new Ux({
            props: g
        }),
        af.push(( () => Df(e, "zoom", h))),
        af.push(( () => Df(e, "chordStyle", d))),
        af.push(( () => Df(e, "simplifyChords", v))),
        af.push(( () => Df(e, "noLineBreak", p))),
        af.push(( () => Df(e, "keyShift", m))),
        af.push(( () => Df(e, "capo", y))),
        {
            c() {
                f && f.c(),
                n = _l(),
                jf(e.$$.fragment)
            },
            m(t, i) {
                f && f.m(t, i),
                Ol(t, n, i),
                Bf(e, t, i),
                a = !0
            },
            p(t, a) {
                1 & a[0] && (l = !Ti(t[0].id)),
                l ? f ? (f.p(t, a),
                1 & a[0] && Af(f, 1)) : (f = ak(t),
                f.c(),
                Af(f, 1),
                f.m(n.parentNode, n)) : f && (Of(),
                Xf(f, 1, 1, ( () => {
                    f = null
                }
                )),
                Cf());
                const h = {};
                1 & a[0] && (h.chordOptionsDisabled = t[0].use === et.SOLO),
                16384 & a[0] && (h.keyPlay = t[14]),
                !i && 512 & a[0] && (i = !0,
                h.zoom = t[9],
                mf(( () => i = !1))),
                !r && 8192 & a[0] && (r = !0,
                h.chordStyle = t[13],
                mf(( () => r = !1))),
                !o && 32768 & a[0] && (o = !0,
                h.simplifyChords = t[15],
                mf(( () => o = !1))),
                !s && 65536 & a[0] && (s = !0,
                h.noLineBreak = t[16],
                mf(( () => s = !1))),
                !u && 16 & a[0] && (u = !0,
                h.keyShift = t[4],
                mf(( () => u = !1))),
                !c && 32 & a[0] && (c = !0,
                h.capo = t[5],
                mf(( () => c = !1))),
                e.$set(h)
            },
            i(t) {
                a || (Af(f),
                Af(e.$$.fragment, t),
                a = !0)
            },
            o(t) {
                Xf(f),
                Xf(e.$$.fragment, t),
                a = !1
            },
            d(t) {
                f && f.d(t),
                t && Cl(n),
                Pf(e, t)
            }
        }
    }
    function ck(t) {
        let n, e, i, r, o, s, u, c, a, l;
        function f(n) {
            t[45](n)
        }
        function h(n) {
            t[46](n)
        }
        function d(n) {
            t[47](n)
        }
        function v(n) {
            t[48](n)
        }
        function p(n) {
            t[49](n)
        }
        function m(n) {
            t[50](n)
        }
        function y(n) {
            t[51](n)
        }
        function g(n) {
            t[52](n)
        }
        let b = {
            instrument: t[8],
            keyPlay: t[14],
            nierStyleDisabled: t[0].use === et.SOLO
        };
        return void 0 !== t[9] && (b.zoom = t[9]),
        void 0 !== t[21] && (b.nierStyle = t[21]),
        void 0 !== t[13] && (b.chordStyle = t[13]),
        void 0 !== t[22] && (b.scoreStyle = t[22]),
        void 0 !== t[4] && (b.keyShift = t[4]),
        void 0 !== t[10] && (b.onlyShowBarNumberAtLineStart = t[10]),
        void 0 !== t[11] && (b.highlightPianoBlackKeyNotes = t[11]),
        void 0 !== t[5] && (b.capo = t[5]),
        n = new Hw({
            props: b
        }),
        af.push(( () => Df(n, "zoom", f))),
        af.push(( () => Df(n, "nierStyle", h))),
        af.push(( () => Df(n, "chordStyle", d))),
        af.push(( () => Df(n, "scoreStyle", v))),
        af.push(( () => Df(n, "keyShift", p))),
        af.push(( () => Df(n, "onlyShowBarNumberAtLineStart", m))),
        af.push(( () => Df(n, "highlightPianoBlackKeyNotes", y))),
        af.push(( () => Df(n, "capo", g))),
        {
            c() {
                jf(n.$$.fragment)
            },
            m(t, e) {
                Bf(n, t, e),
                l = !0
            },
            p(t, l) {
                const f = {};
                256 & l[0] && (f.instrument = t[8]),
                16384 & l[0] && (f.keyPlay = t[14]),
                1 & l[0] && (f.nierStyleDisabled = t[0].use === et.SOLO),
                !e && 512 & l[0] && (e = !0,
                f.zoom = t[9],
                mf(( () => e = !1))),
                !i && 2097152 & l[0] && (i = !0,
                f.nierStyle = t[21],
                mf(( () => i = !1))),
                !r && 8192 & l[0] && (r = !0,
                f.chordStyle = t[13],
                mf(( () => r = !1))),
                !o && 4194304 & l[0] && (o = !0,
                f.scoreStyle = t[22],
                mf(( () => o = !1))),
                !s && 16 & l[0] && (s = !0,
                f.keyShift = t[4],
                mf(( () => s = !1))),
                !u && 1024 & l[0] && (u = !0,
                f.onlyShowBarNumberAtLineStart = t[10],
                mf(( () => u = !1))),
                !c && 2048 & l[0] && (c = !0,
                f.highlightPianoBlackKeyNotes = t[11],
                mf(( () => c = !1))),
                !a && 32 & l[0] && (a = !0,
                f.capo = t[5],
                mf(( () => a = !1))),
                n.$set(f)
            },
            i(t) {
                l || (Af(n.$$.fragment, t),
                l = !0)
            },
            o(t) {
                Xf(n.$$.fragment, t),
                l = !1
            },
            d(t) {
                Pf(n, t)
            }
        }
    }
    function ak(t) {
        let n, e;
        return n = new Og({
            props: {
                sheet: t[0]
            }
        }),
        {
            c() {
                jf(n.$$.fragment)
            },
            m(t, i) {
                Bf(n, t, i),
                e = !0
            },
            p(t, e) {
                const i = {};
                1 & e[0] && (i.sheet = t[0]),
                n.$set(i)
            },
            i(t) {
                e || (Af(n.$$.fragment, t),
                e = !0)
            },
            o(t) {
                Xf(n.$$.fragment, t),
                e = !1
            },
            d(t) {
                Pf(n, t)
            }
        }
    }
    function lk(t) {
        let n, e, i, r = t[23] && fk(t), o = !t[27] && hk(t);
        return {
            c() {
                r && r.c(),
                n = _l(),
                o && o.c(),
                e = Ml()
            },
            m(t, s) {
                r && r.m(t, s),
                Ol(t, n, s),
                o && o.m(t, s),
                Ol(t, e, s),
                i = !0
            },
            p(t, e) {
                t[23] ? r ? (r.p(t, e),
                8388608 & e[0] && Af(r, 1)) : (r = fk(t),
                r.c(),
                Af(r, 1),
                r.m(n.parentNode, n)) : r && (Of(),
                Xf(r, 1, 1, ( () => {
                    r = null
                }
                )),
                Cf()),
                t[27] || o.p(t, e)
            },
            i(t) {
                i || (Af(r),
                i = !0)
            },
            o(t) {
                Xf(r),
                i = !1
            },
            d(t) {
                r && r.d(t),
                t && Cl(n),
                o && o.d(t),
                t && Cl(e)
            }
        }
    }
    function fk(t) {
        let n, e;
        return n = new Fx({
            props: {
                vocalRange: t[23]
            }
        }),
        {
            c() {
                jf(n.$$.fragment)
            },
            m(t, i) {
                Bf(n, t, i),
                e = !0
            },
            p(t, e) {
                const i = {};
                8388608 & e[0] && (i.vocalRange = t[23]),
                n.$set(i)
            },
            i(t) {
                e || (Af(n.$$.fragment, t),
                e = !0)
            },
            o(t) {
                Xf(n.$$.fragment, t),
                e = !1
            },
            d(t) {
                Pf(n, t)
            }
        }
    }
    function hk(t) {
        let n, e, i, r, o;
        return {
            c() {
                n = Xl("pre"),
                e = Il("sheetId="),
                i = Il(t[2]),
                r = Il("\nownerId="),
                o = Il(t[3])
            },
            m(t, s) {
                Ol(t, n, s),
                Tl(n, e),
                Tl(n, i),
                Tl(n, r),
                Tl(n, o)
            },
            p(t, n) {
                4 & n[0] && ql(i, t[2]),
                8 & n[0] && ql(o, t[3])
            },
            d(t) {
                t && Cl(n)
            }
        }
    }
    function dk(t) {
        let n, e, i;
        return {
            c() {
                n = Xl("a"),
                e = Il("下载源文件"),
                Dl(n, "href", i = wt(hi, {
                    code: t[0].id
                }))
            },
            m(t, i) {
                Ol(t, n, i),
                Tl(n, e)
            },
            p(t, e) {
                1 & e[0] && i !== (i = wt(hi, {
                    code: t[0].id
                })) && Dl(n, "href", i)
            },
            d(t) {
                t && Cl(n)
            }
        }
    }
    function vk(t) {
        let n, e, i, r, o, s, u, c, a, l, f, h, d, v, p, m, y, g, b, w, x, k, S, E, T, O;
        function C(t, n) {
            return t[0].submissionTime ? Vx : t[0].sheetCode && !t[0].sheetUserCode ? Hx : void 0
        }
        e = new wy({
            props: {
                hideInstrumentSelection: !0
            }
        });
        let A = C(t)
          , X = A && A(t)
          , I = t[28] && t[0].changeSuggestion && !t[0].draftId && tk(t);
        const _ = [ek, nk]
          , M = [];
        c = function(t, n) {
            return t[26] ? 0 : 1
        }(t),
        a = M[c] = _[c](t);
        let R = !t[28] && ok(t)
          , D = t[0].tags && t[0].tags.length > 0 && sk(t);
        const j = [ck, uk]
          , B = [];
        v = function(t, n) {
            return t[26] ? 0 : 1
        }(t),
        p = B[v] = j[v](t),
        y = new Ug({
            props: {
                sheet: t[0],
                user: t[1]
            }
        }),
        y.$on("print", t[35]);
        let P = t[25] && lk(t)
          , q = t[26] && (t[28] || t[25]) && dk(t);
        return x = new Rx({
            props: {}
        }),
        t[59](x),
        S = new ov({}),
        T = new jy({
            props: {
                desktop: !0
            }
        }),
        {
            c() {
                n = Xl("div"),
                jf(e.$$.fragment),
                i = _l(),
                r = Xl("div"),
                o = Xl("div"),
                X && X.c(),
                s = _l(),
                I && I.c(),
                u = _l(),
                a.c(),
                l = _l(),
                f = Xl("div"),
                R && R.c(),
                h = _l(),
                D && D.c(),
                d = _l(),
                p.c(),
                m = _l(),
                jf(y.$$.fragment),
                g = _l(),
                P && P.c(),
                b = _l(),
                q && q.c(),
                w = _l(),
                jf(x.$$.fragment),
                k = _l(),
                jf(S.$$.fragment),
                E = _l(),
                jf(T.$$.fragment),
                Dl(o, "class", "main svelte-15g1ex"),
                Dl(f, "class", "side svelte-15g1ex"),
                Dl(r, "class", "layout svelte-15g1ex"),
                Ll(r, "nier", t[26]),
                Dl(n, "class", "no-print")
            },
            m(t, a) {
                Ol(t, n, a),
                Bf(e, n, null),
                Tl(n, i),
                Tl(n, r),
                Tl(r, o),
                X && X.m(o, null),
                Tl(o, s),
                I && I.m(o, null),
                Tl(o, u),
                M[c].m(o, null),
                Tl(r, l),
                Tl(r, f),
                R && R.m(f, null),
                Tl(f, h),
                D && D.m(f, null),
                Tl(f, d),
                B[v].m(f, null),
                Tl(f, m),
                Bf(y, f, null),
                Tl(f, g),
                P && P.m(f, null),
                Tl(f, b),
                q && q.m(f, null),
                Ol(t, w, a),
                Bf(x, t, a),
                Ol(t, k, a),
                Bf(S, t, a),
                Ol(t, E, a),
                Bf(T, t, a),
                O = !0
            },
            p(t, n) {
                A === (A = C(t)) && X ? X.p(t, n) : (X && X.d(1),
                X = A && A(t),
                X && (X.c(),
                X.m(o, s))),
                t[28] && t[0].changeSuggestion && !t[0].draftId ? I ? I.p(t, n) : (I = tk(t),
                I.c(),
                I.m(o, u)) : I && (I.d(1),
                I = null),
                a.p(t, n),
                t[28] || R.p(t, n),
                t[0].tags && t[0].tags.length > 0 ? D ? (D.p(t, n),
                1 & n[0] && Af(D, 1)) : (D = sk(t),
                D.c(),
                Af(D, 1),
                D.m(f, d)) : D && (Of(),
                Xf(D, 1, 1, ( () => {
                    D = null
                }
                )),
                Cf()),
                p.p(t, n);
                const e = {};
                1 & n[0] && (e.sheet = t[0]),
                2 & n[0] && (e.user = t[1]),
                y.$set(e),
                t[25] && P.p(t, n),
                t[26] && (t[28] || t[25]) && q.p(t, n);
                x.$set({})
            },
            i(t) {
                O || (Af(e.$$.fragment, t),
                Af(a),
                Af(R),
                Af(D),
                Af(p),
                Af(y.$$.fragment, t),
                Af(P),
                Af(x.$$.fragment, t),
                Af(S.$$.fragment, t),
                Af(T.$$.fragment, t),
                O = !0)
            },
            o(t) {
                Xf(e.$$.fragment, t),
                Xf(a),
                Xf(R),
                Xf(D),
                Xf(p),
                Xf(y.$$.fragment, t),
                Xf(P),
                Xf(x.$$.fragment, t),
                Xf(S.$$.fragment, t),
                Xf(T.$$.fragment, t),
                O = !1
            },
            d(i) {
                i && Cl(n),
                Pf(e),
                X && X.d(),
                I && I.d(),
                M[c].d(),
                R && R.d(),
                D && D.d(),
                B[v].d(),
                Pf(y),
                P && P.d(),
                q && q.d(),
                i && Cl(w),
                t[59](null),
                Pf(x, i),
                i && Cl(k),
                Pf(S, i),
                i && Cl(E),
                Pf(T, i)
            }
        }
    }
    function pk(t, n, e) {
        let i;
        hl(t, Gf, (t => e(8, i = t)));
        let {webViewInterface: r} = n
          , {synd: o} = n
          , {sheet: s} = n
          , {user: u} = n
          , {sheetId: c} = n
          , {ownerId: a} = n;
        of("webViewInterface", r),
        of("synd", o);
        const l = u && kt(u.role, ht.EDITOR)
          , f = at.includes(s.format)
          , h = Ti(s.id) || s.draftId
          , d = s.isOwned
          , v = Oi(s)
          , p = s.type
          , m = [Z.PIANO, Z.JIAN].includes(i)
          , y = !f || m
          , g = (m ? s.key : s.keyUse) || "C";
        let b, w, x, k, S, E = 1, T = !0, O = !0, C = 0, {keyShift: A, capo: X, tempo: I, scrollSpeed: _} = Object.assign(cw(s), s.settings), M = rt.INLINE, R = g;
        const D = o === Rd.bda.name || tl(u) || "kP2Kyyyp" === s.id;
        let j, B, P = [], q = it.TAB, $ = ot.STAFF;
        function F(t) {
            if (!t)
                return;
            e(23, j = t.detail.vocalRange);
            const {tracks: n} = t.detail.score;
            if (n) {
                e(20, P = []);
                for (const t of n)
                    t.staves.length > 1 && s.type === Z.PIANO ? (P.push({
                        name: "右手",
                        trackIndex: t.index,
                        channel: 1,
                        volume: 1,
                        muted: !1
                    }),
                    P.push({
                        name: "左手",
                        trackIndex: t.index,
                        channel: 2,
                        volume: 1,
                        muted: !1
                    })) : P.push({
                        name: t.name,
                        trackIndex: t.index,
                        channel: 0,
                        volume: 1,
                        muted: !1
                    })
            }
            e(12, C++, C)
        }
        of("webViewInterface", r);
        return t.$$set = t => {
            "webViewInterface"in t && e(36, r = t.webViewInterface),
            "synd"in t && e(37, o = t.synd),
            "sheet"in t && e(0, s = t.sheet),
            "user"in t && e(1, u = t.user),
            "sheetId"in t && e(2, c = t.sheetId),
            "ownerId"in t && e(3, a = t.ownerId)
        }
        ,
        t.$$.update = () => {
            17 & t.$$.dirty[0] && async function() {
                if (y) {
                    const {shiftKey: t} = await Da(_a);
                    e(14, R = t(g, A))
                }
            }(s.keyUse),
            256 & t.$$.dirty[0] && e(13, M = [Z.PIANO, Z.JIAN].includes(i) ? rt.NUMBER : rt.INLINE),
            243 & t.$$.dirty[0] && Cd(( () => {
                u && aw(s, {
                    keyShift: A,
                    capo: X,
                    tempo: I,
                    scrollSpeed: _
                })
            }
            ))
        }
        ,
        F(),
        [s, u, c, a, A, X, I, _, i, E, T, O, C, M, R, b, w, x, k, S, P, q, $, j, B, l, f, h, d, v, p, y, D, F, function() {
            if (!Wf())
                return void Cn.error("浏览器不支持全屏模式，推荐Chrome浏览器");
            const t = cn(s.format === nt.XHE ? ".xhe-sheet" : "hexi-sheet");
            Yf(t, ( () => {
                t.setAttribute("columns", "3");
                Oa(t, "rendercomplete").then(( () => {
                    const n = an(t, ".hexi-header").offsetHeight;
                    an(t, ".hexi-body").style.height = screen.availHeight - n - 60 + "px"
                }
                ))
            }
            ), ( () => {
                t.removeAttribute("columns")
            }
            )),
            Jf(t),
            na("play-fullscreen")
        }
        , async function() {
            await _y(r, o, "打印") && B.print(s, {
                zoom: E,
                instrument: p,
                chordStyle: M,
                staveProfile: Ci(i, s.type, s.use, q, $),
                simplifyChords: b,
                noLineBreak: w,
                keyShift: A,
                keyPlay: R,
                onlyShowBarNumberAtLineStart: T,
                highlightPianoBlackKeyNotes: O
            })
        }
        , r, o, function(t) {
            S = t,
            e(19, S)
        }
        , function(t) {
            I = t,
            e(6, I)
        }
        , function(t) {
            k = t,
            e(18, k)
        }
        , () => e(12, C++, C), function(t) {
            af[t ? "unshift" : "push"](( () => {
                x = t,
                e(17, x)
            }
            ))
        }
        , function(t) {
            I = t,
            e(6, I)
        }
        , function(t) {
            _ = t,
            e(7, _)
        }
        , function(t) {
            E = t,
            e(9, E)
        }
        , function(t) {
            q = t,
            e(21, q)
        }
        , function(t) {
            M = t,
            e(13, M),
            e(8, i)
        }
        , function(t) {
            $ = t,
            e(22, $)
        }
        , function(t) {
            A = t,
            e(4, A)
        }
        , function(t) {
            T = t,
            e(10, T)
        }
        , function(t) {
            O = t,
            e(11, O)
        }
        , function(t) {
            X = t,
            e(5, X)
        }
        , function(t) {
            E = t,
            e(9, E)
        }
        , function(t) {
            M = t,
            e(13, M),
            e(8, i)
        }
        , function(t) {
            b = t,
            e(15, b)
        }
        , function(t) {
            w = t,
            e(16, w)
        }
        , function(t) {
            A = t,
            e(4, A)
        }
        , function(t) {
            X = t,
            e(5, X)
        }
        , function(t) {
            af[t ? "unshift" : "push"](( () => {
                B = t,
                e(24, B)
            }
            ))
        }
        ]
    }
    class mk extends Ff {
        constructor(t) {
            super(),
            $f(this, t, pk, vk, al, {
                webViewInterface: 36,
                synd: 37,
                sheet: 0,
                user: 1,
                sheetId: 2,
                ownerId: 3
            }, [-1, -1, -1])
        }
    }
    function yk(t, n, e) {
        Ad(self),
        Md(),
        new mk({
            target: n,
            props: {
                webViewInterface: t,
                ...e
            }
        })
    }
    Gh(yk)
}
)();
