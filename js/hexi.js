!function() {
    "use strict";
    const t = {
        ukulele: {
            name: "ukulele",
            tuning: ["G4", "C4", "E4", "A4"],
            chords: {}
        },
        guitar: {
            name: "guitar",
            tuning: ["E2", "A2", "D3", "G3", "B3", "E4"],
            chords: {}
        }
    };
    function s() {
        return JSON.parse(JSON.stringify(t))
    }
    const i = ["C", "C#", "D", "Eb", "E", "F", "F#", "G", "G#", "A", "Bb", "B"]
      , e = {
        "B#": 0,
        C: 0,
        "C#": 1,
        Db: 1,
        D: 2,
        "D#": 3,
        Eb: 3,
        E: 4,
        Fb: 4,
        "E#": 5,
        F: 5,
        "F#": 6,
        Gb: 6,
        G: 7,
        "G#": 8,
        Ab: 8,
        A: 9,
        "A#": 10,
        Bb: 10,
        B: 11,
        Cb: 11
    }
      , n = {
        "A#": "Bb",
        Db: "C#",
        "D#": "Eb",
        Gb: "F#",
        Ab: "G#"
    }
      , h = ["1", "1#", "2", "2#", "3", "4", "4#", "5", "5#", "6", "6#", "7"]
      , r = ["C", "G", "D", "A", "E", "B", "F#", "C#", "G#", "Eb", "Bb", "F"]
      , o = {
        Am: "C",
        Em: "G",
        Bm: "D",
        "F#m": "A",
        "C#m": "E",
        "G#m": "B",
        "D#m": "F#",
        "A#m": "C#",
        Fm: "G#",
        Cm: "Eb",
        Gm: "Bb",
        Dm: "F"
    }
      , c = /^[A-G][b#]?/
      , a = /^[A-G](b|#)?m?/
      , l = /^([A-G][b#]?)(\d)/;
    function u(t) {
        const s = p(t = t.replace("m7-5", "m7b5"));
        if (!s)
            return t;
        const i = n[s];
        return i ? t.replace(s, i) : t
    }
    function f(t, s) {
        if (!s)
            return t;
        const [i,e] = t.split("/", 2)
          , n = d(i, s);
        if (!e)
            return n;
        return [n, d(e, s)].join("/")
    }
    function d(t, s) {
        const n = p(t);
        if (!n)
            return t;
        return i[((e[n] + s) % 12 + 12) % 12] + t.substring(n.length)
    }
    function C(t) {
        const s = (t = t.replace("maj", "")).match(a);
        return s ? "maj" === s[2] ? s[0][0] : s[0] : t
    }
    function m(t, s) {
        const i = p(t);
        let n = e[i];
        return void 0 === n ? t : (n = (n - e[s] + 12) % 12,
        t.replace(i, h[n]))
    }
    function p(t) {
        const s = t.match(c);
        return s ? s[0] : null
    }
    function g(t) {
        if (0 === t.length)
            return null;
        const s = {};
        function i(t) {
            return s[r[t % 12]] || 0
        }
        let e;
        t.forEach((t => {
            let i = C(t);
            i = u(i),
            i = function(t) {
                if (void 0 !== o[t])
                    return o[t];
                return t
            }(i),
            s[i] = (s[i] || 0) + 1
        }
        ));
        let n = -1
          , h = -1
          , c = -1;
        for (let t = 0; t < r.length; ++t) {
            const s = i(t)
              , o = s + i(t + 1)
              , a = i(t + 11) + o;
            b([a, s, o], [n, h, c]) > 0 && (h = s,
            c = o,
            n = a,
            e = r[t])
        }
        return e
    }
    function b(t, s) {
        for (let i = 0; i < t.length; ++i)
            if (t[i] !== s[i])
                return t[i] - s[i];
        return 0
    }
    let A;
    const x = /{define: ([a-zA-Z0-9#/\-_@()]+) frets ([\d\sxr]+) fingers ([\d\sT]+)(.*)}/;
    class w {
        static getKeyAliases() {
            return n
        }
        static getByDefinition(t) {
            if (!t)
                return null;
            const s = new w;
            return s.parseFromDefinition(t),
            s
        }
        static getByName(t, s) {
            const i = u(s);
            let e = A[t].chords[i];
            return i !== s && e && (e = e.replace(i, s)),
            w.getByDefinition(e)
        }
        static addByDefinition(t) {
            const s = w.getByDefinition(t)
              , i = s.getName();
            if (i) {
                const e = u(i);
                let n;
                for (const t in A)
                    if (A.hasOwnProperty(t)) {
                        const i = A[t];
                        if (i.tuning.length === s.getNumStrings()) {
                            n = i;
                            break
                        }
                    }
                if (!n)
                    throw new Error("No support for " + s.getNumStrings() + " strings chord");
                n.chords[e] = t
            }
        }
        static resetDefinitions() {
            A = s()
        }
        constructor() {
            this.t = null,
            this.i = 1,
            this.h = [],
            this.o = [],
            this.l = []
        }
        getName() {
            return this.t
        }
        setName(t) {
            this.t = t
        }
        getFirstFret() {
            return this.i
        }
        getStrings() {
            return this.h
        }
        getPitches() {
            let t;
            return this.getNumStrings() === A.guitar.tuning.length ? t = A.guitar.tuning : this.getNumStrings() === A.ukulele.tuning.length && (t = A.ukulele.tuning),
            this.l = this.h.map(( ({fret: s}, n) => s < 0 ? null : function(t, s) {
                const n = t.match(l);
                if (!n || 3 !== n.length)
                    throw new Error("Invalid pitch: " + t);
                const h = n[1];
                let r = parseInt(n[2])
                  , o = e[h] + s;
                for (; ; )
                    if (o < 0)
                        o += 12,
                        r -= 1;
                    else {
                        if (!(o >= 12))
                            break;
                        o -= 12,
                        r += 1
                    }
                if (r <= 0)
                    throw new Error("Too low pitch: " + t + s);
                return i[o] + r
            }(t[n], s))),
            this.l
        }
        getRoots() {
            return this.o
        }
        getNumStrings() {
            return this.h.length
        }
        parseFromDefinition(t) {
            if (!t || 0 === t.trim().length)
                return;
            t.indexOf("define") >= 0 ? this.u(t) : this.m(t);
            const s = Math.max(...this.h.map(( ({fret: t}) => t)));
            this.i = Math.max(0, s - 4) + 1
        }
        u(t) {
            const s = t.trim().match(x);
            if (!s || s.length <= 1)
                throw new Error("Invalid chord definition: " + t);
            this.t = s[1],
            this.h = s[2].trim().split(" ").map((t => {
                let s = t.trim();
                return "x" === s ? s = "-1" : 0 === s.indexOf("r") && (s = s.substring(1)),
                {
                    fret: parseInt(s)
                }
            }
            ));
            const i = s[3].trim().split(" ");
            if (this.h.length !== i.length)
                throw new Error("Invalid chord definition: " + t);
            i.forEach(( (t, s) => {
                this.h[s].finger = "0" === t ? null : t
            }
            ))
        }
        m(t) {
            const [s,i] = t.split("=", 2);
            this.t = s;
            const [e,n] = i.split(";", 2)
              , h = parseInt(e) || 1
              , r = n.split(",");
            this.h = r.map((t => {
                let s = parseInt(t);
                (isNaN(s) || s < 0) && (s = -1);
                let i = null;
                if (s > 0) {
                    s += h - 1;
                    const e = t.indexOf("(")
                      , n = t.indexOf(")");
                    n > e + 1 && (i = t.substring(e + 1, n))
                }
                return {
                    fret: s,
                    finger: i
                }
            }
            ))
        }
        updateFingering({string: t, fret: s, finger: i}) {
            const e = this.h[t];
            e.fret = s > 0 ? s + this.i - 1 : s,
            e.finger = i
        }
        shiftFret(t) {
            const s = Math.max(0, this.i + t);
            this.h.forEach((t => {
                t.fret > 0 && (t.fret += s - this.i)
            }
            )),
            this.i = s
        }
        toDefinition() {
            let t = this.getName() + "=" + this.i + ";";
            return t += this.h.map(( ({fret: t, finger: s}) => {
                t > 0 && (t -= this.i - 1);
                let i = t < 0 ? "X" : String(t);
                return s && (i += "(" + s + ")"),
                i
            }
            )).join(","),
            t
        }
    }
    w.resetDefinitions();
    class _ {
        constructor(t, s, i, e={}) {
            this.p = i || 1,
            this.node = this.g("svg", {
                width: t ? t * this.p : "100%",
                height: s ? s * this.p : "100%",
                xmlns: "http://www.w3.org/2000/svg"
            }),
            this._ = e
        }
        line(t, s, i, e, n) {
            const h = this.g("line", this.L({
                x1: t,
                y1: s,
                x2: i,
                y2: e
            })).attr({
                "stroke-width": n ? n * this.p : .5
            });
            return this.node.appendChild(h),
            h
        }
        circle(t, s, i) {
            const e = this.g("circle", this.L({
                cx: t,
                cy: s,
                r: i
            })).attr({
                stroke: "none"
            });
            return this.node.appendChild(e),
            e
        }
        arc(t, s, i, e, n) {
            const h = k(t, s, i, n)
              , r = k(t, s, i, e)
              , o = n - e <= 180 ? "0" : "1"
              , c = ["M", h.x, h.y, "A", i, i, 0, o, 0, r.x, r.y].join(" ")
              , a = this.g("path", {
                d: c,
                fill: "none"
            });
            return this.node.appendChild(a),
            a
        }
        rect(t, s, i, e) {
            const n = this.g("rect", this.L({
                x: t,
                y: s,
                width: i,
                height: e
            }));
            return this.node.appendChild(n),
            n
        }
        cross(t, s, i) {
            const e = i / 2;
            return y([this.line(t - e, s - e, t + e, s + e), this.line(t + e, s - e, t - e, s + e)])
        }
        bigX(t, s, i) {
            const e = .5 * i
              , n = .6 * e;
            return y([this.line(t - n, s - e, t + n, s + e, 1.5), this.line(t + n, s - e, t - n, s + e, 1.5)])
        }
        zero(t, s, i) {
            const e = .3 * i
              , n = i / 2
              , h = this.g("ellipse", this.L({
                cx: t,
                cy: s,
                rx: e,
                ry: n
            })).attr({
                "stroke-width": 1.5 * this.p,
                fill: "none"
            });
            return this.node.appendChild(h),
            h
        }
        path(t, s=0, i=0, e=1) {
            Array.isArray(t) && (t = t.map((t => t.join(","))).join(" ")),
            t = function(t, s, i, e) {
                if (!s && !i && 1 === e)
                    return t;
                return t.split(" ").map((t => {
                    const n = t.match(/([MLCSQ]|^)([-0-9.]+),([-0-9.]+)/);
                    if (!n)
                        return t;
                    const h = parseFloat(n[2]) * e + s
                      , r = parseFloat(n[3]) * e + i;
                    return n[1] + String(h) + "," + String(r)
                }
                )).join(" ")
            }(t, s * this.p, i * this.p, e * this.p);
            const n = this.g("path", {
                d: t,
                "stroke-width": .5
            });
            return this.node.appendChild(n),
            n
        }
        text(t, s, i, e) {
            const n = this.g("text", this.L({
                x: t,
                y: s
            }))
              , h = document.createTextNode(i);
            return n.appendChild(h),
            this.node.appendChild(n),
            n.attr({
                "font-size": (r = e,
                o = this.p,
                Math.sqrt(Math.pow(r, 2) * o)),
                "font-family": "Arial",
                stroke: "none"
            });
            var r, o
        }
        hParallelLines(t, s, i, e, n, h) {
            const r = [];
            for (let o = 0; o < i; ++o) {
                const i = s + o * n;
                r.push(this.line(t, i, t + e, i, h))
            }
            return y(r)
        }
        vParallelLines(t, s, i, e, n, h) {
            const r = [];
            for (let o = 0; o < i; ++o) {
                const i = t + o * n;
                r.push(this.line(i, s, i, s + e, h))
            }
            return y(r)
        }
        g(t, s) {
            const i = document.createElementNS("http://www.w3.org/2000/svg", t);
            return L(i, Object.assign({}, this._, s)),
            i.attr = L.bind(null, i),
            i
        }
        L(t) {
            const s = Object.assign({}, t);
            for (const t in s)
                "number" == typeof s[t] && (s[t] *= this.p);
            return s
        }
    }
    function y(t) {
        return {
            attr: s => {
                t.forEach((t => t.attr(s)))
            }
        }
    }
    function L(t, s) {
        for (const i in s)
            s.hasOwnProperty(i) && t.setAttribute(i, s[i]);
        return t
    }
    function k(t, s, i, e) {
        const n = (e - 90) * Math.PI / 180;
        return {
            x: t + i * Math.cos(n),
            y: s + i * Math.sin(n)
        }
    }
    class E {
        constructor(t={}, s={}) {
            this.k = Object.assign({
                showBarreText: !0,
                fretSpace: 12,
                stringSpace: 10,
                dotRadius: 5,
                margin: {
                    left: 12,
                    top: 20,
                    right: 6,
                    bottom: 6
                },
                fonts: {
                    dot: 8,
                    text: 13,
                    fret: 9,
                    tone: 9
                }
            }, t),
            this.S = 4,
            this.v = {},
            this.M = Object.assign({
                dots: "#555555",
                dotText: "#ffffff",
                default: "#333333"
            }, s)
        }
        setColors(t) {
            Object.assign(this.M, t)
        }
        plot(t, s, i=1) {
            if (!s.getName())
                return;
            const e = this.T(s, i);
            this.v[e] || (this.v[e] = this.N(s, i));
            const n = this.v[e];
            t.appendChild(document.importNode(n.node, !0))
        }
        N(t, s) {
            const i = (t.getNumStrings() - 1) * this.k.stringSpace + this.k.margin.left + this.k.margin.right
              , e = this.S * this.k.fretSpace + (this.k.fonts.tone || 0) + this.k.margin.top + this.k.margin.bottom
              , n = new _(i,e,s,{
                stroke: this.M.default,
                fill: this.M.default
            });
            return this.draw(n, t, {
                x: 0,
                y: 0
            }),
            n
        }
        draw(t, s, i) {
            const e = this.k.fretSpace
              , n = this.k.stringSpace
              , h = this.k.dotRadius
              , r = this.k.fonts.fret;
            let o = this.k.fonts.dot;
            o < 8 && (o = 0);
            const c = {
                x: this.k.margin.left + i.x,
                y: this.k.margin.top + i.y
            }
              , a = c.x
              , l = c.y + e / 2;
            this.$(t, s.getNumStrings(), e, n, c, s.getRoots());
            const u = function(t) {
                const s = {};
                for (let i = 0; i < t.length; ++i) {
                    const {fret: e, finger: n} = t[i];
                    if (e <= 0)
                        continue;
                    const h = JSON.stringify({
                        finger: n,
                        fret: e
                    });
                    s[h] ? s[h].push(i) : s[h] = [i]
                }
                const i = [];
                for (const e in s) {
                    if (!s.hasOwnProperty(e))
                        continue;
                    const {fret: n, finger: h} = JSON.parse(e)
                      , r = s[e]
                      , o = [];
                    for (const s of r) {
                        const i = o[o.length - 1];
                        if (i) {
                            if (t.slice(i.max, s).every(( ({fret: t}) => t >= n || t < 0))) {
                                i.max = s;
                                continue
                            }
                        }
                        o.push({
                            min: s,
                            max: s
                        })
                    }
                    i.push({
                        fret: n,
                        finger: h,
                        barres: o
                    })
                }
                return i
            }(s.getStrings());
            for (const {fret: i, finger: r, barres: c} of u) {
                const u = i - s.getFirstFret() + 1;
                for (const s of c) {
                    const i = {
                        x: a + s.min * n,
                        y: l + (u - 1) * e
                    };
                    if (s.max > s.min) {
                        const e = (s.max - s.min) * n;
                        t.line(i.x, i.y, i.x + e, i.y, h).attr({
                            stroke: this.M.dots
                        }),
                        t.circle(i.x, i.y, h / 2).attr({
                            fill: this.M.dots
                        }),
                        t.circle(i.x + e, i.y, h / 2).attr({
                            fill: this.M.dots
                        }),
                        this.k.showBarreText && this.I(t, i.x + e / 2, i.y, r, o, h)
                    } else
                        this.I(t, i.x, i.y, r, o, h)
                }
            }
            if (1 !== s.getFirstFret()) {
                const i = c.y + (e + r) / 2
                  , n = c.x - Math.floor(h);
                t.text(n, i, s.getFirstFret(), r).attr({
                    "text-anchor": "end"
                })
            }
            const f = {
                "font-family": "Arial Unicode MS, Arial",
                fill: "currentColor",
                "letter-spacing": 0,
                "text-anchor": "middle"
            }
              , d = this.k.fonts.text;
            if (d) {
                const i = S(s.getName())
                  , h = c.x + (s.getNumStrings() - 1) * n / 2
                  , r = c.y - e / 3;
                t.text(h, r, i, d).attr(f)
            }
            this.R(t, s.getStrings(), n, c);
            const C = this.k.fonts.tone;
            C && s.getPitches().forEach(( (s, i) => {
                if (s) {
                    const h = c.x + n * i
                      , r = c.y + e * this.S + C
                      , o = S(s.substring(0, s.length - 1));
                    t.text(h, r, o, C).attr(f)
                }
            }
            ))
        }
        getConfig() {
            return this.k
        }
        $(t, s, i, e, n, h) {
            const r = this.S * i
              , o = (s - 1) * e
              , {x: c, y: a} = n;
            t.hParallelLines(c, a, this.S + 1, o, i),
            t.vParallelLines(c, a, s, r, e),
            h.forEach((s => {
                const i = c + s * e;
                t.line(i, a, i, a + r, 1.5)
            }
            ))
        }
        I(t, s, i, e, n, h) {
            t.circle(s, i, h).attr({
                fill: this.M.dots
            }),
            n > 0 && e && t.text(s, i + n / 2 - 1, e, n).attr({
                fill: this.M.dotText,
                "text-anchor": "middle"
            })
        }
        R(t, s, i, e) {
            s.forEach(( ({fret: s}, n) => {
                s < 0 && t.cross(e.x + n * i, e.y, i / 1.5)
            }
            ))
        }
        T(t, s) {
            return t.toDefinition() + s
        }
    }
    function S(t) {
        return t = t.replace(/@.*$/, ""),
        M() ? t.replace(/b/g, "♭").replace(/#/g, "♯") : t
    }
    let v = null;
    function M() {
        if (null !== v)
            return v;
        const t = document.createElement("canvas").getContext("2d");
        t.font = '12px "Arial Unicode MS", sans-serif';
        const s = t.measureText("♭").width
          , i = t.measureText("口").width;
        return v = i !== s,
        v
    }
    const T = {
        dots: "#eeeeee",
        dotText: "#000000",
        text: "#cccccc",
        default: "#ffffff"
    }
      , B = {
        dots: "#555555",
        dotText: "#ffffff",
        text: "#333333",
        default: "#333333"
    }
      , N = {
        showBarreText: !1,
        fretSpace: 7,
        stringSpace: 6,
        dotRadius: 2.5,
        margin: {
            left: 8,
            top: 12,
            right: 4,
            bottom: 4
        },
        fonts: {
            dot: 0,
            text: 9,
            fret: 8,
            tone: 0
        }
    }
      , $ = {
        fretSpace: 28,
        stringSpace: 24,
        dotRadius: 10,
        showBarreText: !0,
        margin: {
            left: 20,
            top: 10,
            right: 20,
            bottom: 10
        },
        fonts: {
            dot: 13,
            text: 0,
            fret: 13,
            tone: 13
        }
    }
      , D = new E({},B)
      , F = new E({},T)
      , I = new E(N,B)
      , R = new E(N,T)
      , G = new E($,B)
      , P = new E($,T)
      , O = {
        DEFINE: "define",
        NAME: "name",
        INSTRUMENT: "instrument",
        SIZE: "size",
        SCALE: "scale",
        DARK: "dark"
    };
    class K extends HTMLElement {
        static get observedAttributes() {
            return Object.values(O)
        }
        connectedCallback() {
            this.P()
        }
        disconnectedCallback() {
            this.O = null
        }
        attributeChangedCallback() {
            this.P()
        }
        getChord() {
            return this.O
        }
        locateDot(t, s) {
            const {stringSpace: i, fretSpace: e, margin: n} = this.K().getConfig();
            return {
                string: Math.max(0, Math.round((t - n.left) / i)),
                fret: Math.max(0, Math.round((s - n.top - e / 2) / e)) + 1
            }
        }
        P() {
            const t = this.getAttribute(O.DEFINE);
            if (t)
                this.O = w.getByDefinition(t);
            else {
                const t = this.getAttribute(O.NAME)
                  , s = this.getAttribute(O.INSTRUMENT);
                t && s && (this.O = w.getByName(s, t))
            }
            this.j || (this.j = !0,
            requestAnimationFrame(( () => {
                this.H(),
                this.j = !1
            }
            )))
        }
        H() {
            if (this.O) {
                this.innerHTML = "";
                const t = parseFloat(this.getAttribute(O.SCALE)) || 1
                  , s = this.hasAttribute(O.DARK);
                this.K(s).plot(this, this.O, t)
            }
        }
        K(t) {
            const s = this.getAttribute(O.SIZE);
            let i = t ? F : D;
            return "small" === s ? i = t ? R : I : "builder" === s && (i = t ? P : G),
            i
        }
    }
    const j = {
        BAR: "|",
        STRING: "-",
        CHORD_LINE_MARKER: "@",
        TEMPO_LINE_MARKER: "%",
        PICK: "x",
        DASH: "=",
        REST_1: "R2",
        REST_2: "R1",
        REST_4: "R",
        REST_8: "r",
        REST_16: "r1",
        REST_32: "r2",
        REST_64: "r3",
        NULL: "*",
        BEAM: "-",
        DOUBLE_BEAM: "=",
        DOT: ".",
        TIE: "~",
        SLIDE_UP: "/",
        SLIDE_DOWN: "\\",
        STROKE_UP: "u",
        STROKE_DOWN: "d",
        ARPEGGIO_UP: "W",
        ARPEGGIO_DOWN: "w"
    }
      , H = ["M9,9.176 C6.93065632,11.6293456 5.896,13.4959936 5.896,14.776 C5.896,15.9706726 6.87732352,17.7519882 8.84,20.12 L8.2,20.92 C7.64533056,20.6213318 7.18666848,20.4080006 6.824,20.28 C6.37599776,20.1306659 5.98133504,20.056 5.64,20.056 C5.17066432,20.056 4.8293344,20.189332 4.616,20.456 C4.4026656,20.722668 4.296,21.1439971 4.296,21.72 C4.296,22.9360061 4.79732832,24.0879946 5.8,25.176 L5.256,25.976 C2.41865248,23.8853229 1,22.0186749 1,20.376 C1,19.9706646 1.0799992,19.5920018 1.24,19.24 C1.4000008,18.8879982 1.61866528,18.5946678 1.896,18.36 C2.429336,17.8906643 3.1226624,17.656 3.976,17.656 C4.38133536,17.656 4.98932928,17.7839987 5.8,18.04 L1.48,12.28 C3.5066768,10.5093245 4.52,8.88800736 4.52,7.416 C4.52,6.2426608 3.8266736,4.77067552 2.44,3 L4.136,3 L9,9.176 Z", "M9,9.43444862 L5.37246964,22.3899142 L3.97975709,22.3899142 L6.73279352,12.6085377 C5.45883304,13.1915366 4.51957117,13.4830316 3.91497976,13.4830316 C3.15924049,13.4830316 2.47908534,13.2131288 1.87449393,12.673315 C1.29149506,12.241464 1,11.6260855 1,10.8271612 C1,10.2441623 1.21592227,9.70435664 1.64777328,9.20772798 C2.01484664,8.77587697 2.55465231,8.5599547 3.26720648,8.5599547 C3.85020534,8.5599547 4.39001101,8.77587697 4.88663968,9.20772798 C5.31849069,9.63957899 5.53441296,10.1793847 5.53441296,10.8271612 C5.53441296,11.172642 5.44804405,11.5181176 5.27530364,11.8635984 C5.31848874,11.9067835 5.3616732,11.9391719 5.4048583,11.9607644 L5.43724696,11.9607644 C5.86909798,11.9607644 6.40890364,11.636881 7.05668016,10.9891045 C7.57490138,10.4708833 8.00674591,9.95266984 8.35222672,9.43444862 L9,9.43444862 Z", "M8.97503267,7.11932863 L4.02317881,24.8511167 L2.74172185,24.8511167 L5.12582781,16.2087326 C4.01323947,16.7451591 3.16887705,17.0133684 2.59271523,17.0133684 C1.91721517,17.0133684 1.32119464,16.7948275 0.804635762,16.3577392 C0.546356325,16.1391951 0.347682815,15.8858864 0.208609272,15.5978055 C0.0695357285,15.3097245 0,15.0166811 0,14.7186664 C0,14.1623722 0.19867351,13.6855558 0.59602649,13.2882028 C0.99337947,12.8908498 1.45529538,12.6921763 1.98178808,12.6921763 C2.50828078,12.6921763 2.99006404,12.8908498 3.42715232,13.2882028 C3.8245053,13.6458205 4.02317881,14.1226369 4.02317881,14.7186664 C4.02317881,14.9968135 3.9437094,15.2948237 3.78476821,15.6127061 L3.90397351,15.6723088 L3.93377483,15.6723088 C4.37086311,15.6723088 4.94701629,15.2749617 5.66225166,14.4802558 L6.91390728,10.0100571 C5.94039248,10.5067483 5.09603007,10.7550902 4.3807947,10.7550902 C3.70529464,10.7550902 3.10927411,10.5365494 2.59271523,10.0994611 C2.33443579,9.88091694 2.13576228,9.62760822 1.99668874,9.33952731 C1.8576152,9.0514464 1.78807947,8.75840297 1.78807947,8.46038824 C1.78807947,7.90409406 1.98675298,7.42727764 2.38410596,7.02992466 C2.78145894,6.63257168 3.24337485,6.43389817 3.76986755,6.43389817 C4.29636025,6.43389817 4.77814351,6.63257168 5.21523179,7.02992466 C5.61258477,7.46701294 5.81125828,7.94382936 5.81125828,8.46038824 C5.81125828,8.79813827 5.73178887,9.09614853 5.57284768,9.35442797 L5.69205298,9.41403062 L5.7218543,9.41403062 C6.07947199,9.41403062 6.55628841,9.11602035 7.15231788,8.51999088 C7.49006791,8.18224085 7.85761391,7.7153581 8.25496689,7.11932863 L8.97503267,7.11932863 L8.97503267,7.11932863 Z M8.97503267,7.11932863 L9,7.02992466 L9,7.11932863 L8.97503267,7.11932863 L8.97503267,7.11932863 Z", "M10,3.61662198 L3.6997319,26.2707775 L2.54691689,26.2707775 L4.82573727,18.1474531 C3.78909223,18.6479024 2.98034249,18.8981233 2.39946381,18.8981233 C1.81858512,18.8981233 1.26899276,18.6747118 0.750670241,18.227882 C0.250220912,17.852545 0,17.3342303 0,16.6729223 C0,16.2260925 0.178729223,15.7792694 0.536193029,15.3324397 C0.929403217,14.9749759 1.37622627,14.7962466 1.8766756,14.7962466 C2.32350536,14.7962466 2.77032842,14.9749759 3.21715818,15.3324397 C3.57462198,15.6899035 3.75335121,16.1367265 3.75335121,16.6729223 C3.75335121,17.0125129 3.69079598,17.3074161 3.56568365,17.5576408 C3.58355684,17.5755139 3.61036622,17.5933869 3.6461126,17.6112601 L3.6997319,17.6112601 C4.0750689,17.6112601 4.61125657,17.2359287 5.30831099,16.4852547 L6.51474531,12.2493298 C5.96067641,12.4995544 5.51385335,12.6872201 5.17426273,12.8123324 C4.78105255,12.9374448 4.4235941,13 4.10187668,13 C3.4941882,13 2.93119115,12.7765885 2.41286863,12.3297587 C1.93029249,11.9722949 1.68900804,11.4539802 1.68900804,10.7747989 C1.68900804,10.2922228 1.86773727,9.84539973 2.22520107,9.43431635 C2.58266488,9.07685255 3.02948794,8.89812332 3.56568365,8.89812332 C4.0125134,8.89812332 4.45933646,9.07685255 4.90616622,9.43431635 C5.26363003,9.82752654 5.44235925,10.2743496 5.44235925,10.7747989 C5.44235925,11.0786432 5.37086756,11.3735464 5.22788204,11.6595174 L5.33512064,11.7131367 L5.36193029,11.7131367 C5.73726729,11.7131367 6.27345496,11.3378054 6.97050938,10.5871314 L8.1769437,6.35120643 C7.14029866,6.85165576 6.33154893,7.10187668 5.75067024,7.10187668 C5.16979155,7.10187668 4.6201992,6.87846515 4.10187668,6.43163539 C3.60142735,6.05629839 3.35120643,5.53798365 3.35120643,4.8766756 C3.35120643,4.42984584 3.52993566,3.98302279 3.88739946,3.53619303 C4.28060965,3.17872922 4.72743271,3 5.22788204,3 C5.6747118,3 6.12153485,3.17872922 6.56836461,3.53619303 C6.83646247,3.9651496 6.97050938,4.39409973 6.97050938,4.8230563 C6.97050938,5.14477373 6.90795416,5.43074048 6.78284182,5.68096515 C6.80071501,5.71671153 6.8275244,5.74352091 6.86327078,5.7613941 L6.91689008,5.7613941 C7.09562198,5.7613941 7.30116059,5.68543418 7.53351206,5.53351206 C7.76586354,5.38158995 8.00714799,5.16264665 8.25737265,4.8766756 C8.7220756,4.41197265 9.07953405,3.99195898 9.32975871,3.61662198 L10,3.61662198 Z", "M10.9081083,1.63126854 L3.59113201,27.914995 L2.50075908,27.914995 L4.59542286,20.4258546 C3.61982115,20.8658318 2.87378398,21.0858172 2.35728895,21.0858172 C1.87905282,21.0858172 1.35300096,20.8945256 0.779117604,20.5119367 C0.300881471,20.0910889 0.0617669916,19.6128599 0.0617669916,19.0772354 C0.0617669916,18.8094232 0.100025308,18.5846556 0.17654309,18.4029259 C0.253060871,18.2211961 0.38696498,18.0346868 0.578259433,17.8433924 C0.903460003,17.5181918 1.30517233,17.355594 1.78340846,17.355594 C2.2616446,17.355594 2.6729215,17.5181918 3.01725152,17.8433924 C3.18941652,18.0155574 3.31375605,18.1972844 3.39027384,18.3885789 C3.46679162,18.5798733 3.50504993,18.8094232 3.50504993,19.0772354 C3.50504993,19.402436 3.43809788,19.6606797 3.30419176,19.8519741 L3.36157981,19.9380562 L3.44766188,19.9380562 C3.81112135,19.9380562 4.30847946,19.5746022 4.93975116,18.8476832 L6.03012409,14.9739899 C5.15016961,15.4139672 4.40413243,15.6339525 3.79199018,15.6339525 C3.31375405,15.6339525 2.78770219,15.4426609 2.21381883,15.060072 C1.7355827,14.6392242 1.49646822,14.1609953 1.49646822,13.6253708 C1.49646822,13.3575586 1.53472653,13.1327909 1.61124432,12.9510612 C1.6877621,12.7693315 1.82166621,12.5828222 2.01296066,12.3915277 C2.33816123,12.0663272 2.73987356,11.9037293 3.21810969,11.9037293 C3.46679248,11.9037293 3.6867778,11.9419876 3.87807225,12.0185054 C4.06936671,12.0950232 4.255876,12.2193627 4.43760573,12.3915277 C4.61933546,12.5636927 4.74845728,12.7454197 4.82497506,12.9367142 C4.90149284,13.1280087 4.93975116,13.3623408 4.93975116,13.6397178 C4.93975116,13.9170948 4.89192826,14.1705561 4.79628104,14.4001094 C4.85366937,14.4574978 4.90149227,14.4861915 4.93975116,14.4861915 C5.11191617,14.4861915 5.32233691,14.4048926 5.5710197,14.2422923 C5.81970249,14.079692 6.11620444,13.8262307 6.46053446,13.4819007 L7.52221337,9.60820735 C6.62312944,10.0290552 5.89143913,10.2394759 5.32712049,10.2394759 C4.76280185,10.2394759 4.23196771,10.0481843 3.73460213,9.6655954 C3.48591934,9.4551715 3.30419234,9.23518618 3.18941566,9.00563284 C3.07463899,8.7760795 3.01725152,8.51783586 3.01725152,8.23089418 C3.01725152,7.75265804 3.17984936,7.35094572 3.50504993,7.02574515 C3.69634439,6.83445069 3.88285368,6.70054659 4.06458341,6.6240288 C4.24631314,6.54751102 4.47108075,6.50925271 4.73889299,6.50925271 C5.00670522,6.50925271 5.23147283,6.54751102 5.41320256,6.6240288 C5.59493229,6.70054659 5.77187701,6.83445069 5.94404202,7.02574515 C6.28837203,7.35094572 6.46053446,7.75265804 6.46053446,8.23089418 C6.46053446,8.51783586 6.38401782,8.78564407 6.23098226,9.03432686 C6.2883706,9.07258575 6.33619349,9.09171491 6.37445238,9.09171491 C6.73791185,9.09171491 7.24483454,8.73782548 7.89523568,8.03003601 L9.10038471,4.07026062 C8.22043023,4.51023787 7.48395763,4.73022319 6.89094483,4.73022319 C6.3744498,4.73022319 5.84839795,4.5389316 5.31277348,4.1563427 C5.06409069,3.9459188 4.88236368,3.72593348 4.76758701,3.49638013 C4.65281034,3.26682679 4.59542286,3.01814773 4.59542286,2.7503355 C4.59542286,2.48252326 4.63368118,2.25297336 4.71019896,2.06167891 C4.78671674,1.87038445 4.91583856,1.68387516 5.09756829,1.50214543 C5.27929802,1.3204157 5.46580732,1.19129388 5.65710177,1.1147761 C5.84839623,1.03825832 6.06838155,1 6.31706434,1 C6.56574713,1 6.78573245,1.03825832 6.9770269,1.1147761 C7.16832135,1.19129388 7.35483065,1.3204157 7.53656038,1.50214543 C7.71829011,1.68387516 7.84741193,1.86560216 7.92392971,2.04733189 C8.00044749,2.22906163 8.03870581,2.45382924 8.03870581,2.72164147 C8.03870581,2.93206537 7.96218917,3.19030901 7.80915361,3.49638013 C7.86654195,3.55376847 7.91436484,3.58246221 7.95262373,3.58246221 C8.23956541,3.58246221 8.65084232,3.31465399 9.18646679,2.77902952 C9.58818514,2.37731117 9.92294541,1.97559884 10.1907576,1.57388049 L10.9081083,1.57388049 L10.9081083,1.63126854 Z"]
      , Z = {
        showBarreText: !1,
        fretSpace: 7,
        stringSpace: 6,
        dotRadius: 2.5,
        margin: {
            left: 8,
            top: 12,
            right: 4,
            bottom: 4
        },
        fonts: {
            dot: 0,
            text: 9,
            fret: 8
        }
    }
      , z = new E(Z,{
        dots: "#eeeeee",
        dotText: "#000000",
        default: "#ffffff"
    })
      , U = new E(Z,{
        dots: "#555555",
        dotText: "#ffffff",
        default: "#333333"
    });
    class X {
        constructor(t, s, i=!1) {
            this.Z = s,
            this.U = {
                color: i ? "#fff" : "#333",
                fontSize: 9,
                marginLeft: 1,
                marginTop: 12,
                marginBottom: 5,
                stringNum: t,
                stringSpacing: 10,
                noteSpacing: 20,
                symbolSize: 2
            },
            0 === t && (this.U.marginTop = 5,
            this.U.noteSpacing = 25),
            this.X = i ? z : U,
            this.J = i ? "black" : "white",
            this.W = i ? "#cccccc" : "#666666",
            this.Y = i ? "#cccccc" : "#999999"
        }
        createTabCanvas(t, s, i, e) {
            this.q = i,
            this.V = e,
            s && this.U.stringNum > 0 && (this.U.noteSpacing = Math.min(32, s / (t + 1)));
            const n = (t + 1) * this.U.noteSpacing;
            n > s && (s = n);
            const h = this.tt();
            let r = h + this.U.stringSpacing + this.U.marginTop + this.U.marginBottom;
            this.q && (r += 1.5 * this.U.stringSpacing),
            e && (r += 32);
            const o = new _(s,r,this.Z,{
                stroke: this.U.color,
                fill: this.U.color
            })
              , c = this.U.marginLeft;
            return o.hParallelLines(c, this.st(), this.U.stringNum, s - 2, this.U.stringSpacing),
            o.vParallelLines(c, this.st(), 2, h, s - 2, 0 === this.U.stringNum ? 1.5 : void 0),
            o
        }
        barNum(t, s) {
            if (null === s)
                return;
            const i = this.st() - this.U.symbolSize;
            t.text(5, i, s, 7).attr({
                fill: this.Y,
                "text-anchor": "left"
            })
        }
        drawChords(t, s, i) {
            for (const e in s)
                if (s.hasOwnProperty(e)) {
                    const n = this.it(parseInt(e))
                      , h = s[e]
                      , r = this.st();
                    if (i) {
                        const s = 6 === this.U.stringNum ? "guitar" : "ukulele"
                          , i = w.getByName(s, h);
                        i && this.X.draw(t, i, {
                            x: n - 8,
                            y: 0
                        })
                    } else
                        t.text(n, r - 8, h, 9).attr({
                            fill: "currentColor",
                            "text-anchor": "middle"
                        })
                }
        }
        drawFlavors(t, s) {
            s.forEach((s => {
                s.type === j.TIE ? this.tie(t, s.index, s.index + (s.span ? 2 : 1), s.string) : s.type === j.SLIDE_UP ? this.slide(t, s.index, s.string, !0) : s.type === j.SLIDE_DOWN ? this.slide(t, s.index, s.string, !1) : s.type === j.STROKE_DOWN ? this.stroke(t, s.index, !0, s.string.min, s.string.max) : s.type === j.STROKE_UP ? this.stroke(t, s.index, !1, s.string.min, s.string.max) : s.type === j.ARPEGGIO_DOWN ? this.arpeggio(t, s.index, !0, s.string.min, s.string.max) : s.type === j.ARPEGGIO_UP && this.arpeggio(t, s.index, !1, s.string.min, s.string.max)
            }
            ))
        }
        drawTempo(t, s, i, e) {
            if (this.U.stringNum > 0)
                for (let i = 0; i < s.length; ++i)
                    s[i] !== j.BAR && s[i] !== j.DASH && s[i] !== j.REST_1 && s[i] !== j.REST_2 && s[i] !== j.REST_4 && s[i] !== j.REST_8 && s[i] !== j.REST_16 && s[i] !== j.REST_32 && s[i] !== j.REST_64 && this.et(t, i);
            this.nt(t, i, e, 0),
            this.ht(t, e)
        }
        nt(t, s, i, e) {
            for (let n = 0; n < s.length; ++n)
                if (Array.isArray(s[n]) && s[n].length > 0) {
                    const h = Q(s[n])
                      , r = J(s[n]);
                    if (h === r)
                        if (0 === e)
                            this.rt(t, h);
                        else if (0 === this.U.stringNum)
                            this.ot(t, h, r, e);
                        else {
                            const s = void 0 !== i[h - 1];
                            this.ct(t, h, e, s)
                        }
                    else
                        this.ot(t, h, r, e);
                    this.nt(t, s[n], i, e + 1)
                }
        }
        ht(t, s) {
            for (const i in s)
                if (s.hasOwnProperty(i)) {
                    const e = this.it(parseInt(i)) + (0 === this.U.stringNum ? this.U.noteSpacing / 4 : 3)
                      , n = s[i]
                      , h = this.lt() + 1.5 * this.U.stringSpacing - (2 * n + 1);
                    t.circle(e, h, 1.5)
                }
        }
        et(t, s) {
            const i = this.lt() + .5 * this.U.stringSpacing;
            this.vLine(t, this.it(s), i, this.U.stringSpacing)
        }
        ot(t, s, i, e) {
            const n = 0 === this.U.stringNum ? .25 * this.U.noteSpacing : 0
              , h = this.it(s) - n
              , r = this.it(i) + n
              , o = 0 === this.U.stringNum ? .25 * this.U.noteSpacing : 0
              , c = 0 === this.U.stringNum ? .25 * -this.U.stringSpacing : 2
              , a = this.lt() + .5 * this.U.stringSpacing + o + this.U.stringSpacing - e * c;
            this.hLine(t, a, h, r - h)
        }
        rt(t, s) {
            const i = this.it(s)
              , e = this.lt() + 1.5 * this.U.stringSpacing;
            t.path(["M0,0", "C1,-2 1,-2 2,-3", "S3,-6 2,-8"].join(" "), i, e).attr({
                fill: this.J
            })
        }
        ct(t, s, i, e) {
            const n = this.U.noteSpacing / 2;
            let h = this.it(s);
            e && (h -= n);
            const r = this.lt() + 1.5 * this.U.stringSpacing - 2 * i;
            this.hLine(t, r, h, n)
        }
        multiPick(t, s, i) {
            const e = this.it(i)
              , n = Math.min(...s.map((t => t.string)));
            if (this.q && n <= this.U.stringNum) {
                const s = this.ut(n);
                this.vLine(t, e, s, this.lt() - s + this.U.symbolSize)
            }
            for (let e = 0; e < s.length; ++e) {
                const n = s[e].string
                  , h = s[e].fret;
                n >= 0 && n < this.U.stringNum && this.ft(t, i, n, isNaN(h) ? void 0 : h)
            }
        }
        ft(t, s, i, e) {
            const n = this.it(s)
              , h = this.ut(i);
            void 0 === e ? this.cross(t, n, h) : (t.circle(n, h, this.U.stringSpacing / 2).attr({
                fill: this.J
            }),
            t.text(n, h + this.U.fontSize / 3, e, this.U.fontSize).attr({
                fill: this.U.color,
                "text-anchor": "middle"
            }))
        }
        dash(t, s) {
            const i = this.U.stringNum / 2
              , e = this.it(s)
              , n = this.ut(i) - this.U.stringSpacing / 2
              , h = 2 * this.U.symbolSize;
            t.line(e - h, n, e + h, n).attr({
                stroke: this.W,
                "stroke-width": 2
            })
        }
        stroke(t, s, i, e, n) {
            let h = this.it(s);
            void 0 !== e && void 0 !== n ? h -= 3 * this.U.symbolSize : (e = 0,
            n = this.U.stringNum - 1);
            const r = this.ut(e) - this.U.symbolSize
              , o = this.ut(n) + this.U.symbolSize;
            this.vLine(t, h, r, o - r),
            i ? this.upArrow(t, h, r) : this.downArrow(t, h, o)
        }
        mute(t, s, i) {
            this.stroke(t, s, i);
            const e = this.it(s);
            for (let s = 0; s < this.U.stringNum - 1; ++s)
                this.cross(t, e, this.ut(s + .5))
        }
        palmMute(t, s) {
            this.stroke(t, s, !0);
            const i = this.it(s);
            t.circle(i, this.U.marginTop + .5 * this.U.stringSpacing, 1.5)
        }
        accentedStroke(t, s) {
            this.stroke(t, s, !0);
            const i = this.it(s)
              , e = this.U.stringSpacing / 4
              , n = this.U.marginTop + .5 * this.U.stringSpacing
              , h = [`M${-e},${-e}`, `L${e},0`, `L${-e},${e}`];
            t.path(h.join(" "), i, n).attr({
                fill: "none"
            })
        }
        arpeggio(t, s, i, e, n) {
            let h = this.it(s);
            void 0 !== e && void 0 !== n ? h -= 3 * this.U.symbolSize : (e = 0,
            n = this.U.stringNum - 1);
            const r = this.ut(e) - this.U.symbolSize
              , o = this.ut(n) + this.U.symbolSize
              , c = this.U.stringSpacing / 2
              , a = c / 2;
            let l = ["M0,0", "L0," + this.U.stringSpacing / 2];
            for (let t = 0; t < n - e; ++t) {
                const s = 3 + a + 2 * c * t;
                l = l.concat([`Q${-a},${s}, 0,${s + a}`, `Q${a},${s + c} 0,${s + c + a}`])
            }
            t.path(l.join(" "), h, r).attr({
                fill: "none"
            }),
            i ? this.upArrow(t, h, r) : this.downArrow(t, h, o)
        }
        extend(t, s) {
            const i = this.it(s)
              , e = 0 === this.U.stringNum ? this.st() + this.U.noteSpacing / 2 : (this.st() + this.lt()) / 2
              , n = 0 === this.U.stringNum ? this.U.noteSpacing / 6 : this.U.noteSpacing / 4;
            t.line(i - n, e, i + n, e, 2)
        }
        tie(t, s, i, e) {
            let n, h, r = this.it(s), o = this.it(i) - r;
            void 0 === e ? (n = this.U.stringSpacing,
            h = -this.U.stringSpacing) : (r += this.U.symbolSize,
            o -= this.U.symbolSize,
            n = this.ut(e) - 2 * this.U.symbolSize,
            h = -this.U.stringSpacing + this.U.symbolSize);
            const c = ["M0,0", `Q${o / 2},${h} ${o},0`].join(" ");
            t.path(c, r, n).attr({
                fill: "none"
            })
        }
        slide(t, s, i, e) {
            const n = this.it(s) + 5
              , h = this.it(s + 1) - 5;
            let r = this.ut(i)
              , o = r;
            e ? (r += this.U.symbolSize,
            o -= this.U.symbolSize) : (r -= this.U.symbolSize,
            o += this.U.symbolSize),
            t.line(n, r, h, o)
        }
        bar(t, s) {
            const i = this.it(s);
            this.vLine(t, i, this.st(), this.tt(), 0 === this.U.stringNum ? 1.5 : void 0)
        }
        rest(t, s, i) {
            if (0 === this.U.stringNum) {
                const i = .5 * this.U.noteSpacing;
                return void t.zero(this.it(s), this.st() + i, i)
            }
            const e = this.it(s);
            if (i < 2) {
                const s = 5 * this.U.symbolSize
                  , n = this.U.stringSpacing / 2
                  , h = this.ut(this.U.stringNum / 2 - 1) + i * n;
                t.rect(e - s / 2, h, s, n).attr({
                    stroke: "none",
                    fill: this.W
                })
            } else {
                const s = Math.min(i - 2, H.length - 1)
                  , n = this.ut((this.U.stringNum - 3) / 2);
                t.path(H[s], e - 3, n, .75).attr({
                    stroke: "none",
                    fill: this.W
                })
            }
        }
        hLine(t, s, i, e, n) {
            t.line(i, s, i + e, s, n)
        }
        vLine(t, s, i, e, n) {
            t.line(s, i, s, i + e, n)
        }
        cross(t, s, i) {
            t.cross(s, i, this.U.stringSpacing / 2)
        }
        upArrow(t, s, i) {
            const e = this.U.stringSpacing / 2;
            t.line(s, i, s - e / 2, i + e),
            t.line(s, i, s + e / 2, i + e)
        }
        downArrow(t, s, i) {
            const e = this.U.stringSpacing / 2;
            t.line(s, i, s + e / 2, i - e),
            t.line(s, i, s - e / 2, i - e)
        }
        beat(t, s) {
            const i = .5 * this.U.noteSpacing;
            t.bigX(this.it(s), this.st() + i, i)
        }
        it(t) {
            return this.U.marginLeft + this.U.noteSpacing * (t + 1)
        }
        st() {
            return this.ut(0)
        }
        lt() {
            return 0 === this.U.stringNum ? this.st() : this.ut(this.U.stringNum - 1)
        }
        ut(t) {
            return this.U.marginTop + this.U.stringSpacing * (t + 1) + (this.V ? 32 : 0)
        }
        tt() {
            return this.U.stringSpacing * (0 === this.U.stringNum ? 3 : this.U.stringNum - 1)
        }
    }
    function Q(t) {
        return Array.isArray(t) && t.length > 0 ? Q(t[0]) : t
    }
    function J(t) {
        return Array.isArray(t) && t.length > 0 ? J(t[t.length - 1]) : t
    }
    class W {
        constructor(t) {
            this.dt = this.Ct(t)
        }
        createSvg(t, s, i, e=!1) {
            const n = Math.max(...this.dt.noteLengths) > 0;
            return this.X = new X(t,i,e),
            this.gt = this.X.createTabCanvas(this.dt.notes.length, s / i, n),
            this.bt(this.dt.notes, 0 === t),
            n && this.X.drawTempo(this.gt, this.dt.notes, this.dt.tempoTree, this.dt.dots),
            this.gt.node
        }
        Ct(t) {
            let s = "";
            const i = []
              , e = []
              , n = []
              , h = [n]
              , r = {}
              , o = () => {
                s.length > 0 && (h.length > 0 && h[h.length - 1].push(i.length),
                i.push(s),
                e.push(h.length - 1),
                s = "")
            }
            ;
            for (let e = 0; e < t.length; ++e)
                switch (t[e]) {
                case " ":
                    o();
                    break;
                case ".":
                    o(),
                    r[i.length - 1] = h.length - 1;
                    break;
                case "(":
                    o();
                    const n = [];
                    h.length > 0 && h[h.length - 1].push(n),
                    h.push(n);
                    break;
                case ")":
                    o(),
                    h.length > 0 && h.pop();
                    break;
                default:
                    s += t[e]
                }
            return o(),
            {
                notes: i,
                noteLengths: e,
                tempoTree: n,
                dots: r
            }
        }
        bt(t, s) {
            for (let i = 0; i < t.length; ++i)
                if ("~" === t[i]) {
                    for (let s = i - 1; s >= 0; s--)
                        if ("|" !== t[s]) {
                            this.X.tie(this.gt, s, i);
                            break
                        }
                } else
                    this.At(i, t[i], s)
        }
        At(t, s, i) {
            switch (s) {
            case "-":
                return void this.X.extend(this.gt, t);
            case "0":
                const s = this.dt.noteLengths[t];
                return void this.X.rest(this.gt, t, s + 2);
            case "|":
                return void this.X.bar(this.gt, t)
            }
            if (i)
                this.X.beat(this.gt, t);
            else
                switch (s) {
                case "d":
                    this.X.stroke(this.gt, t, !0);
                    break;
                case "u":
                    this.X.stroke(this.gt, t, !1);
                    break;
                case "o":
                    this.X.palmMute(this.gt, t);
                    break;
                case ">":
                    this.X.accentedStroke(this.gt, t);
                    break;
                case "w":
                    this.X.arpeggio(this.gt, t, !0);
                    break;
                case "x":
                case "xd":
                    this.X.mute(this.gt, t, !0);
                    break;
                case "xu":
                    this.X.mute(this.gt, t, !1);
                    break;
                default:
                    const i = s.split(parseInt(s, 10) >= 10 ? "" : ",").map((t => {
                        const s = t.split(":")
                          , i = parseInt(s[1], 10);
                        return {
                            string: parseInt(s[0], 10) - 1,
                            fret: isNaN(i) ? void 0 : i
                        }
                    }
                    )).filter((t => !isNaN(t.string)));
                    this.X.multiPick(this.gt, i, t)
                }
        }
    }
    class Y extends HTMLElement {
        connectedCallback() {
            const t = this.offsetWidth
              , s = parseInt(this.getAttribute("string-num"))
              , i = new W(this.textContent)
              , e = parseFloat(this.getAttribute("scale")) || 1
              , n = this.hasAttribute("dark");
            this.textContent = "",
            this.appendChild(i.createSvg(s, t, e, n))
        }
        disconnectedCallback() {}
    }
    const q = 1
      , V = 2
      , tt = 3
      , st = 4
      , it = 5
      , et = 7
      , nt = 8
      , ht = 9
      , rt = 10
      , ot = 11
      , ct = 12
      , at = 13
      , lt = 14
      , ut = 15
      , ft = 16
      , dt = "regular"
      , Ct = "inline"
      , mt = "number"
      , pt = s()
      , gt = {
        title: ut,
        artist: q,
        author: V,
        meta: ht,
        comment: it,
        rhythm: rt,
        srhythm: ft,
        start_of_chorus: ot,
        end_of_chorus: et
    }
      , bt = /\{([a-zA-Z]+):(.*)\}/
      , At = /\[([a-zA-Z0-9#/\-_]+)\]/;
    class xt {
        constructor() {
            this.xt = [],
            this.wt = [],
            this._t = {},
            this.yt = [],
            this.Lt = [],
            this.kt = null,
            this.Et = null,
            this.St = null,
            this.vt = null,
            this.Mt = []
        }
        parseFromText(t, s=!1) {
            s || (w.resetDefinitions(),
            t = function(t) {
                if ("string" != typeof t)
                    return t;
                return t.replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;")
            }(t)),
            t = t.replace(/\[([b#])([A-G])([^\]]*)\]/g, "[$2$1$3]"),
            this.xt = [];
            const i = t.split("\n");
            for (let t = 0; t < i.length; ++t) {
                const e = i[t].trim();
                if (0 === e.length)
                    continue;
                const n = bt.exec(e);
                if (n) {
                    const i = n[1].toLowerCase()
                      , h = n[2].trim();
                    if ("define" === i)
                        this.Mt.push(e),
                        s || w.addByDefinition(e);
                    else if ("title" === i)
                        this.Et = h;
                    else if ("artist" === i)
                        this.St = h;
                    else if ("author" === i)
                        this.vt = h;
                    else {
                        const s = gt[i];
                        s === ht ? this.wt.push(h) : this.Tt(s, h, t)
                    }
                    continue
                }
                if ("{start_of_chorus}" === e.toLowerCase()) {
                    this.Tt(ot, null, t);
                    continue
                }
                if ("{end_of_chorus}" === e.toLowerCase()) {
                    this.Tt(et, null, t);
                    continue
                }
                if ("{start_of_tab}" === e.toLowerCase()) {
                    const s = [];
                    for (; ++t < i.length; ) {
                        const e = i[t].trim();
                        if ("{end_of_tab}" === e.toLowerCase())
                            break;
                        s.push(e)
                    }
                    this.Tt(ct, s.join("\n"), t - s.length - 1);
                    continue
                }
                const h = this.Bt(i[t]);
                this.Tt(this.Nt(h), h, t)
            }
        }
        Bt(t) {
            const s = [];
            let i, e = 0, n = 0;
            for (; i = At.exec(t.substr(e)); ) {
                const h = e + i.index - n;
                if (h > 0) {
                    const i = t.substr(n, h);
                    i.length > 0 && s.push({
                        type: at,
                        value: i
                    })
                }
                e += i.index + i[0].length;
                const r = i[1]
                  , o = t[e];
                s.push({
                    type: tt,
                    value: r,
                    extra: o
                }),
                this._t[r] || (this._t[r] = !0,
                this.yt.push(r)),
                this.Lt.push(r),
                e++,
                n = e
            }
            if (n < t.length) {
                const i = t.substr(n, t.length - n);
                i.length > 0 && s.push({
                    type: at,
                    value: i
                })
            }
            return s
        }
        toHTML(t) {
            if (null == this.kt)
                throw new Error("Instrument not set!");
            let s = "";
            s += `\n      <div class="hexi-header">\n        <div class="hexi-title">${this.Et || "未命名"}</div>\n        <div class="hexi-subtitle">\n          <span><em>唱: </em>${this.St || "未知歌手"}</span>\n    `,
            this.vt && (s += `<span><em>谱: </em>${this.vt}</span>`),
            s += '<ul class="hexi-meta">';
            if (this.getMeta(t.keyShift).slice(0, 4).forEach((t => {
                s += `<li>${t}</li>`
            }
            )),
            s += "</ul>",
            s += "</div></div>",
            t.chordStyle === dt) {
                s += '<div class="hexi-chords">';
                const i = [];
                this.getChords().forEach((e => {
                    let n = f(e, t.keyShift);
                    t.simplifyChords && (n = C(n)),
                    i.includes(n) || (s += this.$t(n, "normal", t.scale),
                    i.push(n))
                }
                )),
                s += "</div>"
            }
            s += '<div class="hexi-body">';
            for (let e = 0; e < this.xt.length; ++e) {
                const n = this.xt[e];
                switch (n.type) {
                case nt:
                    s += `<pre class="hexi-line" line-num="${n.line}">`;
                    for (let e = 0; e < n.value.length; ++e) {
                        const h = n.value[e];
                        if (h.type === at)
                            s += `<span class="hexi-text">${h.value}</span>`;
                        else if (h.type === tt) {
                            s += '<span class="hexi-chord-anchor">',
                            s += this.Dt(h.value, t);
                            const e = " " === (i = h.extra) || void 0 === i || "\n" === i ? "　" : h.extra;
                            s += `${e}</span>`
                        }
                    }
                    s += "</pre>";
                    break;
                case lt:
                    s += `<pre class="hexi-textline" line-num="${n.line}">`;
                    for (let t = 0; t < n.value.length; ++t) {
                        const i = n.value[t];
                        i.type === at && (s += `<span class="hexi-text">${i.value}</span>`)
                    }
                    s += "</pre>";
                    break;
                case st:
                    s += `<pre class="hexi-chordline" line-num="${n.line}">`;
                    for (let i = 0; i < n.value.length; ++i) {
                        const e = n.value[i];
                        e.type === tt ? s += this.Dt(e.value, t) : e.type === at && (s += `<span class="hexi-text">${e.value}</span>`)
                    }
                    s += "</pre>";
                    break;
                case it:
                    s += `<div class="hexi-comment" line-num="${n.line}">${n.value}</div>`;
                    break;
                case rt:
                    s += `<hexi-rhythm string-num="${this.kt.tuning.length}" line-num="${n.line}" scale="${t.scale}">${n.value}</hexi-rhythm>`;
                    break;
                case ft:
                    s += `<hexi-rhythm string-num="0" line-num="${n.line}" scale="${t.scale}">${n.value}</hexi-rhythm>`;
                    break;
                case ot:
                    s += '<div class="hexi-chorus">';
                    break;
                case et:
                    s += "</div>";
                    break;
                case ct:
                    s += `<hexi-tab inline-chords line-num="${n.line}" scale="${t.scale}">${n.value}</hexi-tab>`
                }
            }
            var i;
            return s += "</div>",
            s
        }
        setInstrument(t) {
            this.kt = pt[t]
        }
        getNodes() {
            return this.xt
        }
        getDefinitions() {
            return this.Mt
        }
        getChords() {
            return this.yt
        }
        getMeta(t) {
            let s = this.getKey();
            if (!s)
                return this.wt;
            t && (s = f(this.getKey(), t));
            const i = this.wt.slice();
            let e = 0;
            i[0] && (i[0].indexOf("♩=") >= 0 || i[0].match(/\d\/\d/)) && (e = 1);
            for (let t = 0; t < i.length; ++t) {
                if (i[t].indexOf("原调 1=") >= 0) {
                    e = t + 1;
                    break
                }
            }
            return i.splice(e, 0, "选调 1=" + s),
            i
        }
        getFirstRhythm() {
            for (let t = 0; t < this.xt.length; ++t) {
                const s = this.xt[t];
                if (s.type === rt || s.type === ft)
                    return s.value
            }
            return null
        }
        getFirstTab() {
            for (let t = 0; t < this.xt.length; ++t) {
                const s = this.xt[t];
                if (s.type === ct)
                    return s.value
            }
            return null
        }
        getKey() {
            return this.Ft || (this.Ft = g(this.Lt)),
            this.Ft
        }
        Tt(t, s, i) {
            this.xt.push({
                type: t,
                value: s,
                line: i
            })
        }
        It(t, s) {
            const i = t.indexOf("[", s + 1)
              , e = t.indexOf("]", s);
            return e < 0 || i >= 0 && i < e ? "" : t.substr(s + 1, e - s - 1)
        }
        Dt(t, s) {
            let i = s.chordStyle === mt ? t : f(t, s.keyShift);
            if (s.simplifyChords && (i = C(i)),
            s.chordStyle === mt && (i = m(i, this.getKey())),
            s.chordStyle === Ct)
                return this.$t(i, "small", s.scale);
            {
                const t = M() ? "arial" : "roboto";
                return `<span class="hexi-chord">${i.replace("b", `<span class="hexi-chord-flat ${t}">♭</span>`).replace("#", `<span class="hexi-chord-sharp ${t}">♯</span>`)}</span>`
            }
        }
        $t(t, s, i) {
            return `<hexi-chord size="${s}" scale="${i}" name="${t}" instrument="${this.kt.name}"></hexi-chord>`
        }
        Nt(t) {
            let s = !1
              , i = !1;
            for (let e = 0; e < t.length; ++e)
                if (t[e].type === at && t[e].value.trim().length > 0 && (s = !0),
                t[e].type === tt && t[e].value.trim().length > 0 && (i = !0),
                s && i)
                    return nt;
            return i ? st : lt
        }
    }
    class wt extends HTMLElement {
        static get observedAttributes() {
            return ["scale", "instrument", "chord-style", "simplify-chords", "key-shift", "columns", "refresh"]
        }
        connectedCallback() {
            this.setContent(this.textContent),
            this.hasAttribute("eager-rendering") ? (this.H(),
            this.setAttribute("ready", "")) : this.P();
            const t = this;
            this.data = {
                get meta() {
                    return t.Rt.getMeta()
                },
                get chords() {
                    return t.Rt.getChords()
                },
                get key() {
                    return t.Rt.getKey()
                },
                get firstTab() {
                    return t.Rt.getFirstTab()
                },
                get firstRhythm() {
                    return t.Rt.getFirstRhythm()
                }
            }
        }
        disconnectedCallback() {
            this.Rt = null,
            this.removeAttribute("ready")
        }
        attributeChangedCallback(t, s, i, e) {
            this.Rt && this.P()
        }
        setContent(t) {
            this.Rt = new xt,
            this.Rt.parseFromText(t),
            this.P()
        }
        P() {
            this.j || (this.j = !0,
            requestAnimationFrame(( () => {
                this.H(),
                this.setAttribute("ready", ""),
                this.j = !1
            }
            )))
        }
        H() {
            if (!this.Rt)
                return;
            console.time("Update sheet");
            const t = this.getAttribute("instrument")
              , s = parseInt(this.getAttribute("key-shift")) || 0
              , i = this.getAttribute("chord-style") || dt
              , e = this.hasAttribute("simplify-chords");
            0 === this.Rt.getChords().length && this.Rt.getFirstTab() && this.setAttribute("finger-style", ""),
            this.Rt.setInstrument(t);
            const n = {
                chordStyle: i,
                keyShift: s,
                scale: this.getAttribute("scale"),
                simplifyChords: e
            };
            this.style["font-size"] = n.scale + "em",
            this.innerHTML = this.Rt.toHTML(n),
            console.timeEnd("Update sheet"),
            this.dispatchEvent(new CustomEvent("rendercomplete"))
        }
    }
    const _t = {
        "-": 1,
        "=": 2
    };
    class yt {
        constructor() {
            this.Gt = [],
            this.Pt = -1,
            this.Ot = 0
        }
        createSvg(t, s, i, e, n=!1) {
            if (0 === this.Gt.length)
                return [];
            this.X = new X(this.Pt,e,n);
            const h = t / 16 / e - 1
              , r = [];
            let o = 1
              , c = this.Gt[0]
              , a = 1;
            for (; o < this.Gt.length; ) {
                if (c.notes.length + this.Gt[o].notes.length + 1 <= h)
                    c = this.Kt(c, this.Gt[o]);
                else {
                    const n = this.jt(c, i ? null : a, t / e, s);
                    if (r.push(n),
                    i)
                        return r;
                    const h = c.flavors[c.flavors.length - 1];
                    h && h.index === c.notes.length - 1 && h.type === j.TIE && h.span && this.Gt[o].flavors.splice(0, 0, Object.assign(h, {
                        index: -2,
                        span: !0
                    })),
                    c = this.Gt[o],
                    a = o + 1
                }
                ++o
            }
            return c.notes.length > 0 && r.push(this.jt(c, i ? null : a, t / e, s)),
            r
        }
        Kt(t, s) {
            const i = t.notes
              , e = t.tempoTree
              , n = t.dots
              , h = t.chords
              , r = t.flavors;
            i.push(j.BAR),
            e.push(i.length),
            this.Ht(s.tempoTree, i.length);
            for (const t in s.dots)
                s.dots.hasOwnProperty(t) && (n[parseInt(t, 10) + i.length] = s.dots[t]);
            for (const t in s.chords)
                s.chords.hasOwnProperty(t) && (h[parseInt(t, 10) + i.length] = s.chords[t]);
            return s.flavors.forEach((t => {
                t.index += i.length,
                r.push(t)
            }
            )),
            {
                notes: i.concat(s.notes),
                tempoTree: e.concat(s.tempoTree),
                dots: n,
                flavors: r,
                chords: h,
                barStartPos: t.barStartPos,
                linePos: t.linePos
            }
        }
        Ht(t, s) {
            for (let i = 0; i < t.length; ++i)
                Array.isArray(t[i]) ? this.Ht(t[i], s) : t[i] += s
        }
        parseFromText(t) {
            const s = t.split("\n").map((t => t.trim())).filter((t => t.length > 0))
              , i = s.filter((t => t[0] === j.BAR))
              , e = s.filter((t => t[0] === j.TEMPO_LINE_MARKER))
              , n = s.filter((t => t[0] === j.CHORD_LINE_MARKER));
            if (4 !== i.length && 6 !== i.length || this.Pt > 0 && i.length !== this.Pt)
                return this.Ot += t.split("\n").length + 1,
                !1;
            this.Pt < 0 && (this.Pt = i.length);
            const h = {
                strings: i,
                tempoLines: e
            };
            return n.length > 0 && (h.chordLine = n[0]),
            this.Zt(h),
            this.Ot += t.split("\n").length + 1,
            !0
        }
        getStringNum() {
            return this.Pt
        }
        Zt(t) {
            const {strings: s, tempoLines: i, chordLine: e} = t;
            let n = []
              , h = [n]
              , r = {}
              , o = []
              , c = {}
              , a = 0
              , l = []
              , u = 0;
            for (; a < s[0].length; ) {
                if (s[0][a] === j.BAR) {
                    a > 0 && (this.Gt.push({
                        notes: l,
                        tempoTree: n,
                        dots: r,
                        flavors: o,
                        chords: c,
                        barStartPos: u,
                        linePos: this.Ot
                    }),
                    l = [],
                    n = [],
                    h = [n],
                    r = {},
                    o = [],
                    c = {},
                    u = a),
                    ++a;
                    continue
                }
                let t;
                const f = this.zt(a, s);
                if (f ? (l.push(f),
                t = f.length > 1) : t = this.Ut(a, s, i, h, l, o, r),
                e) {
                    const t = this.Xt(e, a);
                    t && (c[l.length - 1] = t)
                }
                ++a,
                t && ++a
            }
        }
        zt(t, s) {
            const i = [j.DASH, j.REST_1, j.REST_2, j.REST_16, j.REST_32, j.REST_64, j.REST_4, j.REST_8];
            for (let e = 0; e < s.length; ++e)
                for (let n = 0; n < i.length; ++n)
                    if (0 === s[e].substr(t).indexOf(i[n]))
                        return i[n];
            return null
        }
        Ut(t, s, i, e, n, h, r) {
            let o = !1
              , c = [];
            const a = {
                string: {
                    min: 10,
                    max: -1
                },
                index: n.length
            };
            for (let i = 0; i < s.length; ++i) {
                const e = s[i][t]
                  , r = s[i][t - 1];
                if ([j.SLIDE_UP, j.SLIDE_DOWN, j.TIE].includes(e))
                    h.push({
                        type: e,
                        string: i,
                        index: n.length - 1,
                        span: s[0][t + 1] === j.BAR
                    });
                else if (c !== j.NULL) {
                    if (s[i][t] === j.NULL) {
                        c = j.NULL;
                        continue
                    }
                    const e = this.Qt(s[i], t);
                    null !== e && (c.push({
                        string: i,
                        fret: e
                    }),
                    e > 9 && (o = !0),
                    [j.STROKE_DOWN, j.STROKE_UP, j.ARPEGGIO_DOWN, j.ARPEGGIO_UP].includes(r) && (a.type = r,
                    a.string.min = Math.min(a.string.min, i),
                    a.string.max = Math.max(a.string.max, i)))
                }
            }
            return a.type && h.push(a),
            i.forEach((s => {
                const i = () => {
                    const t = [];
                    e.length > 0 && e[e.length - 1].push(t),
                    e.push(t)
                }
                  , n = (_t[s[t]] || 0) - (_t[s[t - 1]] || 0);
                for (let t = 0; t < n; ++t)
                    i()
            }
            )),
            (c === j.NULL || c.length > 0) && (e.length > 0 && e[e.length - 1].push(n.length),
            n.push(c)),
            i.forEach((s => {
                if (s[t] === j.DOT)
                    return void (r[n.length - 1] = e.length - 1);
                if (0 === e.length)
                    return;
                const i = (_t[s[t]] || 0) - (_t[s[o ? t + 2 : t + 1]] || 0);
                for (let t = 0; t < i; ++t)
                    e.pop()
            }
            )),
            o
        }
        jt(t, s, i, e) {
            const {notes: n, tempoTree: h, dots: r, flavors: o, chords: c} = t
              , a = h.filter((t => Array.isArray(t))).length > 0
              , l = this.X.createTabCanvas(n.length, i, a, Object.keys(c).length > 0 && e)
              , u = [j.REST_1, j.REST_2, j.REST_4, j.REST_8, j.REST_16, j.REST_32, j.REST_64];
            for (let t = 0; t < n.length; ++t) {
                const s = n[t]
                  , i = u.indexOf(s);
                s === j.BAR ? this.X.bar(l, t) : s === j.DASH ? this.X.dash(l, t) : i >= 0 ? this.X.rest(l, t, i) : s === j.NULL || Array.isArray(s) && this.X.multiPick(l, s, t)
            }
            return this.X.drawChords(l, c, e),
            this.X.drawTempo(l, n, h, r),
            this.X.drawFlavors(l, o),
            this.X.barNum(l, s),
            l.node.setAttribute("line-pos", t.linePos),
            l.node.setAttribute("column-num", t.barStartPos),
            l.node
        }
        Xt(t, s) {
            let i = null;
            if (0 !== s && this.Jt(t[s]) && (1 === s || !this.Jt(t[s - 1]))) {
                i = t[s];
                for (let e = s + 1; e < t.length && this.Jt(t[e]); ++e)
                    i += t[e]
            }
            return i
        }
        Jt(t) {
            return /[a-zA-Z0-9#/\-_@]/.test(t)
        }
        Qt(t, s) {
            if (t[s] === j.PICK)
                return;
            let i = parseInt(t[s]);
            if (!isNaN(i)) {
                const e = parseInt(t[s + 1]);
                return isNaN(e) || (i = 10 * i + e),
                i
            }
            return null
        }
    }
    class Lt extends HTMLElement {
        connectedCallback() {
            const t = this.textContent.split(/\n\n/);
            this.textContent = "";
            const s = new yt;
            let i = !1;
            if (t.forEach((t => {
                0 !== t.trim().length && (i |= s.parseFromText(t))
            }
            )),
            i) {
                const t = this.offsetWidth
                  , i = parseFloat(this.getAttribute("scale")) || 1
                  , e = this.hasAttribute("dark")
                  , n = s.createSvg(t, this.hasAttribute("inline-chords"), this.hasAttribute("preview"), i, e)
                  , h = parseInt(this.getAttribute("line-num")) + 1;
                n.forEach((t => {
                    t.setAttribute("line-num", String(parseInt(t.getAttribute("line-pos")) + h)),
                    this.appendChild(t)
                }
                )),
                this.setAttribute("string-num", s.getStringNum())
            }
        }
        disconnectedCallback() {}
    }
    const kt = window.AudioContext || window.webkitAudioContext
      , Et = new Audio;
    Et.src = "data:audio/wav;base64,UklGRjIAAABXQVZFZm10IBIAAAABAAEAQB8AAEAfAAABAAgAAABmYWN0BAAAAAAAAABkYXRhAAAAAA==";
    let St = null
      , vt = !1;
    const Mt = {
        get: () => (St = Nt(),
        vt || (vt = !0,
        "suspended" === St.state ? (document.body.addEventListener("touchstart", $t),
        document.body.addEventListener("touchend", $t),
        $t()) : Dt()),
        St),
        close() {
            St && St.close && (St.close().catch(( () => {}
            )),
            St = null,
            vt = !1)
        }
    };
    function Tt(t) {
        return fetch(t, {
            credentials: "omit"
        }).then((s => s ? s.arrayBuffer() : Promise.reject(new Error("Failed to load: " + t))))
    }
    function Bt(t) {
        return new Promise(( (s, i) => {
            try {
                Nt().decodeAudioData(t, s, i)
            } catch (t) {
                i(t)
            }
        }
        ))
    }
    function Nt() {
        return St || (St = new kt,
        console.log("Creating audio context")),
        St
    }
    function $t() {
        St.resume().then(( () => {
            document.body.removeEventListener("touchstart", $t),
            document.body.removeEventListener("touchend", $t),
            Dt()
        }
        ))
    }
    function Dt() {
        const t = Et.play();
        t && t.catch && t.catch(( () => {}
        ))
    }
    const Ft = {
        tempo: 80,
        beats: 4,
        notesPerBeat: 2,
        rhythms: {}
    }
      , It = "acoustic"
      , Rt = {
        KICK: "kick",
        SNARE: "snare",
        HIHAT: "hihat",
        TOM1: "tom1",
        TOM2: "tom2",
        TOM3: "tom3"
    }
      , Gt = {
        BASIC_4: {
            snare: [0, 0, 1, 0, 0, 0, 1, 0],
            hihat: [.3, .3, .3, .3, .3, .3, .3, .3],
            kick: [1, 0, 0, 0, 1, 0, 0, 0]
        },
        BASIC_3: {
            snare: [0, 0, 0, 1, 0, 0],
            hihat: [.3, .3, .3, .3, .3, .3],
            kick: [1, 0, 0, 0, 0, 0]
        }
    }
      , Pt = {
        [Rt.SNARE]: -1,
        [Rt.HIHAT]: 1
    };
    const Ot = {
        C3: [0, 1875],
        B2: [2150, 2267],
        E2: [4708, 2242],
        F2: [7242, 2258],
        "F#2": [9808, 2225],
        Gb2: [9808, 2225],
        G2: [12350, 2225],
        "G#2": [14900, 2183],
        Ab2: [14900, 2183],
        A2: [17400, 2217],
        "A#2": [19917, 2233],
        Bb2: [19917, 2233],
        "C#3": [22483, 1950],
        Db3: [22483, 1950],
        D3: [24750, 1925],
        "D#3": [27025, 1908],
        Eb3: [27025, 1908],
        E3: [29267, 1933],
        F3: [31533, 1917],
        "F#3": [33783, 1875],
        Gb3: [33783, 1875],
        G3: [36058, 1900],
        "G#3": [38300, 1892],
        Ab3: [38300, 1892],
        A3: [40517, 1950],
        "A#3": [42800, 1875],
        Bb3: [42800, 1875],
        B3: [45058, 1892],
        C4: [47275, 1708],
        "C#4": [49320, 1705],
        Db4: [49320, 1705],
        D4: [51350, 1683],
        "D#4": [53400, 1692],
        Eb4: [53400, 1692],
        E4: [55442, 1691],
        F4: [57475, 1700],
        "F#4": [59517, 1675],
        Gb4: [59517, 1675],
        G4: [61550, 1542],
        "G#4": [63600, 1650],
        Ab4: [63600, 1650],
        A4: [65608, 1650],
        "A#4": [67642, 1633],
        Bb4: [67642, 1633],
        B4: [69625, 1533],
        C5: [71658, 1275],
        "C#5": [73283, 1284],
        Db5: [73283, 1284],
        D5: [74908, 1292],
        "D#5": [76550, 1308],
        Eb5: [76550, 1308],
        E5: [78200, 1283]
    };
    function Kt(t) {
        t && (w.resetDefinitions(),
        t.forEach((t => {
            try {
                w.addByDefinition(t)
            } catch (t) {
                console.error(t)
            }
        }
        )))
    }
    function jt(t, s, i) {
        t.customElements.define(s, i)
    }
    self.hexi = {
        install: function(t, s) {
            t._hexiInstalled || (Kt(s),
            jt(t, "hexi-sheet", wt),
            jt(t, "hexi-chord", K),
            jt(t, "hexi-tab", Lt),
            jt(t, "hexi-rhythm", Y),
            t._hexiInstalled = !0)
        },
        Svg: _,
        shiftKey: f,
        findKey: g,
        scaleChord: m,
        simplifyChord: C,
        audioContextProvider: Mt,
        installChordDefinitions: Kt,
        HexiChord: w,
        XiatMetronome: class {
            constructor() {
                this.Wt = null,
                this.Yt = null
            }
            get qt() {
                return Mt.get()
            }
            play(t) {
                this.stop(),
                this.Wt || (this.Wt = function(t, s) {
                    const i = t.sampleRate
                      , e = t.createBuffer(1, 2 * i, i)
                      , n = e.getChannelData(0);
                    let h = 0
                      , r = 1;
                    const o = i / 50;
                    for (let t = 0; t < o; t++)
                        n[t] = Math.sin(h) * r,
                        h += 2 * Math.PI * s / i,
                        h > 2 * Math.PI && (h -= 2 * Math.PI),
                        r -= 1 / o;
                    return e
                }(this.qt, 880)),
                this.Yt = this.qt.createBufferSource(),
                this.Yt.connect(this.qt.destination),
                this.Yt.buffer = this.Wt,
                this.Yt.loop = !0,
                this.Yt.loopEnd = 60 / t,
                this.Yt.start(0)
            }
            stop() {
                this.Yt && (this.Yt.stop(),
                this.Yt = null)
            }
            isPlaying() {
                return !!this.Yt
            }
        }
        ,
        XiatDrum: class {
            constructor(t=It) {
                this.Vt = null,
                this.ts = null,
                this.ss = null,
                this.es = this.ns(t).catch((t => null)),
                this.hs = null,
                this.rs = -1,
                this.os = 0
            }
            get ctx() {
                return Mt.get()
            }
            initializeAudio() {
                return this.hs || (this.hs = this.es.then((t => t ? this.cs(t) : Promise.reject(new Error("鼓声加载失败")))).then((t => {
                    this.Vt = t,
                    this.ts = this.ls(),
                    this.ss = this.us()
                }
                ))),
                this.hs
            }
            play(t) {
                if (!this.Vt)
                    return;
                this.os++,
                this.rs = this.ctx.currentTime,
                this.fs = 0;
                const s = Object.assign({}, Ft, t);
                this.ds(this.os, s)
            }
            ds(t, s) {
                if (this.os !== t)
                    return;
                const {beats: i, notesPerBeat: e, tempo: n} = s;
                let {rhythms: h} = s;
                if ("string" == typeof h && (h = Gt[h]),
                !h)
                    throw new Error("Empty rhythms");
                const r = this.ctx.currentTime
                  , o = 60 / e / n;
                let c = this.fs * o + this.rs;
                for (; c < r + o; ) {
                    if (this.fs < i * e)
                        this.fs % e == 0 && this.Cs(c, this.Vt.stick, 2);
                    else {
                        const t = (this.fs - i * e) % (e * i);
                        for (const s in h)
                            if (h.hasOwnProperty(s)) {
                                const i = h[s][t];
                                i && this.playNote(s, c, i)
                            }
                    }
                    this.fs++,
                    c = this.fs * o + this.rs
                }
                setTimeout(( () => {
                    this.ds(t, s)
                }
                ), 20)
            }
            playNote(t, s, i) {
                this.Vt && this.Vt[t] && this.Cs(s, this.Vt[t], i, Pt[t])
            }
            stop() {
                this.os++,
                this.rs = -1
            }
            isPlaying() {
                return this.rs >= 0
            }
            Cs(t, s, i, e) {
                const n = this.ctx.createBufferSource();
                n.buffer = s;
                const h = this.ctx.createGain();
                h.gain.value = i || 1,
                n.connect(h);
                let r = h;
                if (e) {
                    const t = this.ctx.createPanner();
                    t.panningModel = "HRTF",
                    t.setPosition(e, 0, 0),
                    h.connect(t),
                    r = t
                }
                r.connect(this.ts),
                r.connect(this.ss),
                n.start(t)
            }
            ls() {
                let t = this.ctx.destination;
                if (this.ctx.createDynamicsCompressor) {
                    const s = this.ctx.createDynamicsCompressor();
                    s.connect(this.ctx.destination),
                    t = s
                }
                const s = this.ctx.createGain();
                return s.gain.value = .7,
                s.connect(t),
                s
            }
            us(t=1) {
                const s = this.ctx.createConvolver()
                  , i = this.ctx.createGain();
                return i.gain.value = t,
                i.connect(this.ts),
                s.connect(i),
                s.buffer = this.Vt.stick,
                s
            }
            ns(t) {
                const s = {}
                  , i = Object.values(Rt).map((i => Tt("https://cdn.yopu.co/sound/drum-samples/" + t + "/" + i + ".mp3").then((t => {
                    s[i] = t
                }
                ))));
                return i.push(Tt("https://cdn.yopu.co/sound/drum-samples/common/stick.mp3").then((t => s.stick = t))),
                i.push(Tt("https://cdn.yopu.co/sound/drum-effect/living-room.mp3").then((t => s.effect = t))),
                i.forEach((t => {
                    t.catch(( () => {}
                    ))
                }
                )),
                Promise.all(i).then(( () => s))
            }
            cs(t) {
                const s = []
                  , i = {};
                for (const e in t)
                    t.hasOwnProperty(e) && s.push(Bt(t[e]).then((t => {
                        i[e] = t
                    }
                    )));
                return Promise.all(s).then(( () => i))
            }
        }
        ,
        XiatSynth: class {
            constructor() {
                this.ps = null,
                this.es = Tt("https://cdn.yopu.co/sound/guitar-sound-1.m4a").catch(( () => null))
            }
            get ctx() {
                return Mt.get()
            }
            initializeAudio() {
                return this.ps ? Promise.resolve() : this.es.then((t => t ? Bt(t).then((t => {
                    this.ps = t
                }
                )) : Promise.reject(new Error("音效加载失败"))))
            }
            strumChord(t, s) {
                this.initializeAudio().then(( () => {
                    let i = this.ctx.currentTime;
                    const e = t.getPitches();
                    s && e.reverse(),
                    e.forEach((t => {
                        t && (i += .01,
                        "C3" === t ? this.playNote(t, i + .1) : this.playNote(t, i))
                    }
                    ))
                }
                ))
            }
            playNote(t, s=0) {
                if (console.log(t),
                !this.ps)
                    return;
                const [i,e] = Ot[t]
                  , n = this.ctx.createBufferSource();
                n.buffer = this.ps,
                n.connect(this.ctx.destination),
                n.start(s, i / 1e3, e / 1e3)
            }
        }
    }
}();

