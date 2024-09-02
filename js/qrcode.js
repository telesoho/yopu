!function() {
    "use strict";
    var r, t, e = (r = function(r) {
        function t(r) {
            this.mode = i.MODE_8BIT_BYTE,
            this.data = r,
            this.parsedData = [];
            for (var t = 0, e = this.data.length; t < e; t++) {
                var n = []
                  , s = this.data.charCodeAt(t);
                s > 65536 ? (n[0] = 240 | (1835008 & s) >>> 18,
                n[1] = 128 | (258048 & s) >>> 12,
                n[2] = 128 | (4032 & s) >>> 6,
                n[3] = 128 | 63 & s) : s > 2048 ? (n[0] = 224 | (61440 & s) >>> 12,
                n[1] = 128 | (4032 & s) >>> 6,
                n[2] = 128 | 63 & s) : s > 128 ? (n[0] = 192 | (1984 & s) >>> 6,
                n[1] = 128 | 63 & s) : n[0] = s,
                this.parsedData.push(n)
            }
            this.parsedData = Array.prototype.concat.apply([], this.parsedData),
            this.parsedData.length != this.data.length && (this.parsedData.unshift(191),
            this.parsedData.unshift(187),
            this.parsedData.unshift(239))
        }
        function e(r, t) {
            this.typeNumber = r,
            this.errorCorrectLevel = t,
            this.modules = null,
            this.moduleCount = 0,
            this.dataCache = null,
            this.dataList = []
        }
        t.prototype = {
            getLength: function(r) {
                return this.parsedData.length
            },
            write: function(r) {
                for (var t = 0, e = this.parsedData.length; t < e; t++)
                    r.put(this.parsedData[t], 8)
            }
        },
        e.prototype = {
            addData: function(r) {
                var e = new t(r);
                this.dataList.push(e),
                this.dataCache = null
            },
            isDark: function(r, t) {
                if (r < 0 || this.moduleCount <= r || t < 0 || this.moduleCount <= t)
                    throw new Error(r + "," + t);
                return this.modules[r][t]
            },
            getModuleCount: function() {
                return this.moduleCount
            },
            make: function() {
                this.makeImpl(!1, this.getBestMaskPattern())
            },
            makeImpl: function(r, t) {
                this.moduleCount = 4 * this.typeNumber + 17,
                this.modules = new Array(this.moduleCount);
                for (var i = 0; i < this.moduleCount; i++) {
                    this.modules[i] = new Array(this.moduleCount);
                    for (var n = 0; n < this.moduleCount; n++)
                        this.modules[i][n] = null
                }
                this.setupPositionProbePattern(0, 0),
                this.setupPositionProbePattern(this.moduleCount - 7, 0),
                this.setupPositionProbePattern(0, this.moduleCount - 7),
                this.setupPositionAdjustPattern(),
                this.setupTimingPattern(),
                this.setupTypeInfo(r, t),
                this.typeNumber >= 7 && this.setupTypeNumber(r),
                null == this.dataCache && (this.dataCache = e.createData(this.typeNumber, this.errorCorrectLevel, this.dataList)),
                this.mapData(this.dataCache, t)
            },
            setupPositionProbePattern: function(r, t) {
                for (var e = -1; e <= 7; e++)
                    if (!(r + e <= -1 || this.moduleCount <= r + e))
                        for (var i = -1; i <= 7; i++)
                            t + i <= -1 || this.moduleCount <= t + i || (this.modules[r + e][t + i] = 0 <= e && e <= 6 && (0 == i || 6 == i) || 0 <= i && i <= 6 && (0 == e || 6 == e) || 2 <= e && e <= 4 && 2 <= i && i <= 4)
            },
            getBestMaskPattern: function() {
                for (var r = 0, t = 0, e = 0; e < 8; e++) {
                    this.makeImpl(!0, e);
                    var i = d.getLostPoint(this);
                    (0 == e || r > i) && (r = i,
                    t = e)
                }
                return t
            },
            createMovieClip: function(r, t, e) {
                var i = r.createEmptyMovieClip(t, e);
                this.make();
                for (var n = 0; n < this.modules.length; n++)
                    for (var s = 1 * n, o = 0; o < this.modules[n].length; o++) {
                        var h = 1 * o;
                        this.modules[n][o] && (i.beginFill(0, 100),
                        i.moveTo(h, s),
                        i.lineTo(h + 1, s),
                        i.lineTo(h + 1, s + 1),
                        i.lineTo(h, s + 1),
                        i.endFill())
                    }
                return i
            },
            setupTimingPattern: function() {
                for (var r = 8; r < this.moduleCount - 8; r++)
                    null == this.modules[r][6] && (this.modules[r][6] = r % 2 == 0);
                for (var t = 8; t < this.moduleCount - 8; t++)
                    null == this.modules[6][t] && (this.modules[6][t] = t % 2 == 0)
            },
            setupPositionAdjustPattern: function() {
                for (var r = d.getPatternPosition(this.typeNumber), t = 0; t < r.length; t++)
                    for (var e = 0; e < r.length; e++) {
                        var i = r[t]
                          , n = r[e];
                        if (null == this.modules[i][n])
                            for (var s = -2; s <= 2; s++)
                                for (var o = -2; o <= 2; o++)
                                    this.modules[i + s][n + o] = -2 == s || 2 == s || -2 == o || 2 == o || 0 == s && 0 == o
                    }
            },
            setupTypeNumber: function(r) {
                for (var t = d.getBCHTypeNumber(this.typeNumber), e = 0; e < 18; e++) {
                    var i = !r && 1 == (t >> e & 1);
                    this.modules[Math.floor(e / 3)][e % 3 + this.moduleCount - 8 - 3] = i
                }
                for (e = 0; e < 18; e++)
                    i = !r && 1 == (t >> e & 1),
                    this.modules[e % 3 + this.moduleCount - 8 - 3][Math.floor(e / 3)] = i
            },
            setupTypeInfo: function(r, t) {
                for (var e = this.errorCorrectLevel << 3 | t, i = d.getBCHTypeInfo(e), n = 0; n < 15; n++) {
                    var s = !r && 1 == (i >> n & 1);
                    n < 6 ? this.modules[n][8] = s : n < 8 ? this.modules[n + 1][8] = s : this.modules[this.moduleCount - 15 + n][8] = s
                }
                for (n = 0; n < 15; n++)
                    s = !r && 1 == (i >> n & 1),
                    n < 8 ? this.modules[8][this.moduleCount - n - 1] = s : n < 9 ? this.modules[8][15 - n - 1 + 1] = s : this.modules[8][15 - n - 1] = s;
                this.modules[this.moduleCount - 8][8] = !r
            },
            mapData: function(r, t) {
                for (var e = -1, i = this.moduleCount - 1, n = 7, s = 0, o = this.moduleCount - 1; o > 0; o -= 2)
                    for (6 == o && o--; ; ) {
                        for (var h = 0; h < 2; h++)
                            if (null == this.modules[i][o - h]) {
                                var a = !1;
                                s < r.length && (a = 1 == (r[s] >>> n & 1)),
                                d.getMask(t, i, o - h) && (a = !a),
                                this.modules[i][o - h] = a,
                                -1 == --n && (s++,
                                n = 7)
                            }
                        if ((i += e) < 0 || this.moduleCount <= i) {
                            i -= e,
                            e = -e;
                            break
                        }
                    }
            }
        },
        e.PAD0 = 236,
        e.PAD1 = 17,
        e.createData = function(r, t, i) {
            for (var n = b.getRSBlocks(r, t), s = new m, o = 0; o < i.length; o++) {
                var h = i[o];
                s.put(h.mode, 4),
                s.put(h.getLength(), d.getLengthInBits(h.mode, r)),
                h.write(s)
            }
            var a = 0;
            for (o = 0; o < n.length; o++)
                a += n[o].dataCount;
            if (s.getLengthInBits() > 8 * a)
                throw new Error("code length overflow. (" + s.getLengthInBits() + ">" + 8 * a + ")");
            for (s.getLengthInBits() + 4 <= 8 * a && s.put(0, 4); s.getLengthInBits() % 8 != 0; )
                s.putBit(!1);
            for (; !(s.getLengthInBits() >= 8 * a || (s.put(e.PAD0, 8),
            s.getLengthInBits() >= 8 * a)); )
                s.put(e.PAD1, 8);
            return e.createBytes(s, n)
        }
        ,
        e.createBytes = function(r, t) {
            for (var e = 0, i = 0, n = 0, s = new Array(t.length), o = new Array(t.length), h = 0; h < t.length; h++) {
                var a = t[h].dataCount
                  , f = t[h].totalCount - a;
                i = Math.max(i, a),
                n = Math.max(n, f),
                s[h] = new Array(a);
                for (var u = 0; u < s[h].length; u++)
                    s[h][u] = 255 & r.buffer[u + e];
                e += a;
                var c = d.getErrorCorrectPolynomial(f)
                  , v = new y(s[h],c.getLength() - 1).mod(c);
                for (o[h] = new Array(c.getLength() - 1),
                u = 0; u < o[h].length; u++) {
                    var w = u + v.getLength() - o[h].length;
                    o[h][u] = w >= 0 ? v.get(w) : 0
                }
            }
            var l = 0;
            for (u = 0; u < t.length; u++)
                l += t[u].totalCount;
            var g = new Array(l)
              , p = 0;
            for (u = 0; u < i; u++)
                for (h = 0; h < t.length; h++)
                    u < s[h].length && (g[p++] = s[h][u]);
            for (u = 0; u < n; u++)
                for (h = 0; h < t.length; h++)
                    u < o[h].length && (g[p++] = o[h][u]);
            return g
        }
        ;
        for (var i = {
            MODE_NUMBER: 1,
            MODE_ALPHA_NUM: 2,
            MODE_8BIT_BYTE: 4,
            MODE_KANJI: 8
        }, n = 1, s = 0, o = 3, h = 2, a = 0, f = 1, u = 2, c = 3, v = 4, w = 5, l = 6, g = 7, d = {
            PATTERN_POSITION_TABLE: [[], [6, 18], [6, 22], [6, 26], [6, 30], [6, 34], [6, 22, 38], [6, 24, 42], [6, 26, 46], [6, 28, 50], [6, 30, 54], [6, 32, 58], [6, 34, 62], [6, 26, 46, 66], [6, 26, 48, 70], [6, 26, 50, 74], [6, 30, 54, 78], [6, 30, 56, 82], [6, 30, 58, 86], [6, 34, 62, 90], [6, 28, 50, 72, 94], [6, 26, 50, 74, 98], [6, 30, 54, 78, 102], [6, 28, 54, 80, 106], [6, 32, 58, 84, 110], [6, 30, 58, 86, 114], [6, 34, 62, 90, 118], [6, 26, 50, 74, 98, 122], [6, 30, 54, 78, 102, 126], [6, 26, 52, 78, 104, 130], [6, 30, 56, 82, 108, 134], [6, 34, 60, 86, 112, 138], [6, 30, 58, 86, 114, 142], [6, 34, 62, 90, 118, 146], [6, 30, 54, 78, 102, 126, 150], [6, 24, 50, 76, 102, 128, 154], [6, 28, 54, 80, 106, 132, 158], [6, 32, 58, 84, 110, 136, 162], [6, 26, 54, 82, 110, 138, 166], [6, 30, 58, 86, 114, 142, 170]],
            G15: 1335,
            G18: 7973,
            G15_MASK: 21522,
            getBCHTypeInfo: function(r) {
                for (var t = r << 10; d.getBCHDigit(t) - d.getBCHDigit(d.G15) >= 0; )
                    t ^= d.G15 << d.getBCHDigit(t) - d.getBCHDigit(d.G15);
                return (r << 10 | t) ^ d.G15_MASK
            },
            getBCHTypeNumber: function(r) {
                for (var t = r << 12; d.getBCHDigit(t) - d.getBCHDigit(d.G18) >= 0; )
                    t ^= d.G18 << d.getBCHDigit(t) - d.getBCHDigit(d.G18);
                return r << 12 | t
            },
            getBCHDigit: function(r) {
                for (var t = 0; 0 != r; )
                    t++,
                    r >>>= 1;
                return t
            },
            getPatternPosition: function(r) {
                return d.PATTERN_POSITION_TABLE[r - 1]
            },
            getMask: function(r, t, e) {
                switch (r) {
                case a:
                    return (t + e) % 2 == 0;
                case f:
                    return t % 2 == 0;
                case u:
                    return e % 3 == 0;
                case c:
                    return (t + e) % 3 == 0;
                case v:
                    return (Math.floor(t / 2) + Math.floor(e / 3)) % 2 == 0;
                case w:
                    return t * e % 2 + t * e % 3 == 0;
                case l:
                    return (t * e % 2 + t * e % 3) % 2 == 0;
                case g:
                    return (t * e % 3 + (t + e) % 2) % 2 == 0;
                default:
                    throw new Error("bad maskPattern:" + r)
                }
            },
            getErrorCorrectPolynomial: function(r) {
                for (var t = new y([1],0), e = 0; e < r; e++)
                    t = t.multiply(new y([1, p.gexp(e)],0));
                return t
            },
            getLengthInBits: function(r, t) {
                if (1 <= t && t < 10)
                    switch (r) {
                    case i.MODE_NUMBER:
                        return 10;
                    case i.MODE_ALPHA_NUM:
                        return 9;
                    case i.MODE_8BIT_BYTE:
                    case i.MODE_KANJI:
                        return 8;
                    default:
                        throw new Error("mode:" + r)
                    }
                else if (t < 27)
                    switch (r) {
                    case i.MODE_NUMBER:
                        return 12;
                    case i.MODE_ALPHA_NUM:
                        return 11;
                    case i.MODE_8BIT_BYTE:
                        return 16;
                    case i.MODE_KANJI:
                        return 10;
                    default:
                        throw new Error("mode:" + r)
                    }
                else {
                    if (!(t < 41))
                        throw new Error("type:" + t);
                    switch (r) {
                    case i.MODE_NUMBER:
                        return 14;
                    case i.MODE_ALPHA_NUM:
                        return 13;
                    case i.MODE_8BIT_BYTE:
                        return 16;
                    case i.MODE_KANJI:
                        return 12;
                    default:
                        throw new Error("mode:" + r)
                    }
                }
            },
            getLostPoint: function(r) {
                for (var t = r.getModuleCount(), e = 0, i = 0; i < t; i++)
                    for (var n = 0; n < t; n++) {
                        for (var s = 0, o = r.isDark(i, n), h = -1; h <= 1; h++)
                            if (!(i + h < 0 || t <= i + h))
                                for (var a = -1; a <= 1; a++)
                                    n + a < 0 || t <= n + a || 0 == h && 0 == a || o == r.isDark(i + h, n + a) && s++;
                        s > 5 && (e += 3 + s - 5)
                    }
                for (i = 0; i < t - 1; i++)
                    for (n = 0; n < t - 1; n++) {
                        var f = 0;
                        r.isDark(i, n) && f++,
                        r.isDark(i + 1, n) && f++,
                        r.isDark(i, n + 1) && f++,
                        r.isDark(i + 1, n + 1) && f++,
                        0 != f && 4 != f || (e += 3)
                    }
                for (i = 0; i < t; i++)
                    for (n = 0; n < t - 6; n++)
                        r.isDark(i, n) && !r.isDark(i, n + 1) && r.isDark(i, n + 2) && r.isDark(i, n + 3) && r.isDark(i, n + 4) && !r.isDark(i, n + 5) && r.isDark(i, n + 6) && (e += 40);
                for (n = 0; n < t; n++)
                    for (i = 0; i < t - 6; i++)
                        r.isDark(i, n) && !r.isDark(i + 1, n) && r.isDark(i + 2, n) && r.isDark(i + 3, n) && r.isDark(i + 4, n) && !r.isDark(i + 5, n) && r.isDark(i + 6, n) && (e += 40);
                var u = 0;
                for (n = 0; n < t; n++)
                    for (i = 0; i < t; i++)
                        r.isDark(i, n) && u++;
                return e += Math.abs(100 * u / t / t - 50) / 5 * 10
            }
        }, p = {
            glog: function(r) {
                if (r < 1)
                    throw new Error("glog(" + r + ")");
                return p.LOG_TABLE[r]
            },
            gexp: function(r) {
                for (; r < 0; )
                    r += 255;
                for (; r >= 256; )
                    r -= 255;
                return p.EXP_TABLE[r]
            },
            EXP_TABLE: new Array(256),
            LOG_TABLE: new Array(256)
        }, E = 0; E < 8; E++)
            p.EXP_TABLE[E] = 1 << E;
        for (E = 8; E < 256; E++)
            p.EXP_TABLE[E] = p.EXP_TABLE[E - 4] ^ p.EXP_TABLE[E - 5] ^ p.EXP_TABLE[E - 6] ^ p.EXP_TABLE[E - 8];
        for (E = 0; E < 255; E++)
            p.LOG_TABLE[p.EXP_TABLE[E]] = E;
        function y(r, t) {
            if (null == r.length)
                throw new Error(r.length + "/" + t);
            for (var e = 0; e < r.length && 0 == r[e]; )
                e++;
            this.num = new Array(r.length - e + t);
            for (var i = 0; i < r.length - e; i++)
                this.num[i] = r[i + e]
        }
        function b(r, t) {
            this.totalCount = r,
            this.dataCount = t
        }
        function m() {
            this.buffer = [],
            this.length = 0
        }
        y.prototype = {
            get: function(r) {
                return this.num[r]
            },
            getLength: function() {
                return this.num.length
            },
            multiply: function(r) {
                for (var t = new Array(this.getLength() + r.getLength() - 1), e = 0; e < this.getLength(); e++)
                    for (var i = 0; i < r.getLength(); i++)
                        t[e + i] ^= p.gexp(p.glog(this.get(e)) + p.glog(r.get(i)));
                return new y(t,0)
            },
            mod: function(r) {
                if (this.getLength() - r.getLength() < 0)
                    return this;
                for (var t = p.glog(this.get(0)) - p.glog(r.get(0)), e = new Array(this.getLength()), i = 0; i < this.getLength(); i++)
                    e[i] = this.get(i);
                for (i = 0; i < r.getLength(); i++)
                    e[i] ^= p.gexp(p.glog(r.get(i)) + t);
                return new y(e,0).mod(r)
            }
        },
        b.RS_BLOCK_TABLE = [[1, 26, 19], [1, 26, 16], [1, 26, 13], [1, 26, 9], [1, 44, 34], [1, 44, 28], [1, 44, 22], [1, 44, 16], [1, 70, 55], [1, 70, 44], [2, 35, 17], [2, 35, 13], [1, 100, 80], [2, 50, 32], [2, 50, 24], [4, 25, 9], [1, 134, 108], [2, 67, 43], [2, 33, 15, 2, 34, 16], [2, 33, 11, 2, 34, 12], [2, 86, 68], [4, 43, 27], [4, 43, 19], [4, 43, 15], [2, 98, 78], [4, 49, 31], [2, 32, 14, 4, 33, 15], [4, 39, 13, 1, 40, 14], [2, 121, 97], [2, 60, 38, 2, 61, 39], [4, 40, 18, 2, 41, 19], [4, 40, 14, 2, 41, 15], [2, 146, 116], [3, 58, 36, 2, 59, 37], [4, 36, 16, 4, 37, 17], [4, 36, 12, 4, 37, 13], [2, 86, 68, 2, 87, 69], [4, 69, 43, 1, 70, 44], [6, 43, 19, 2, 44, 20], [6, 43, 15, 2, 44, 16], [4, 101, 81], [1, 80, 50, 4, 81, 51], [4, 50, 22, 4, 51, 23], [3, 36, 12, 8, 37, 13], [2, 116, 92, 2, 117, 93], [6, 58, 36, 2, 59, 37], [4, 46, 20, 6, 47, 21], [7, 42, 14, 4, 43, 15], [4, 133, 107], [8, 59, 37, 1, 60, 38], [8, 44, 20, 4, 45, 21], [12, 33, 11, 4, 34, 12], [3, 145, 115, 1, 146, 116], [4, 64, 40, 5, 65, 41], [11, 36, 16, 5, 37, 17], [11, 36, 12, 5, 37, 13], [5, 109, 87, 1, 110, 88], [5, 65, 41, 5, 66, 42], [5, 54, 24, 7, 55, 25], [11, 36, 12], [5, 122, 98, 1, 123, 99], [7, 73, 45, 3, 74, 46], [15, 43, 19, 2, 44, 20], [3, 45, 15, 13, 46, 16], [1, 135, 107, 5, 136, 108], [10, 74, 46, 1, 75, 47], [1, 50, 22, 15, 51, 23], [2, 42, 14, 17, 43, 15], [5, 150, 120, 1, 151, 121], [9, 69, 43, 4, 70, 44], [17, 50, 22, 1, 51, 23], [2, 42, 14, 19, 43, 15], [3, 141, 113, 4, 142, 114], [3, 70, 44, 11, 71, 45], [17, 47, 21, 4, 48, 22], [9, 39, 13, 16, 40, 14], [3, 135, 107, 5, 136, 108], [3, 67, 41, 13, 68, 42], [15, 54, 24, 5, 55, 25], [15, 43, 15, 10, 44, 16], [4, 144, 116, 4, 145, 117], [17, 68, 42], [17, 50, 22, 6, 51, 23], [19, 46, 16, 6, 47, 17], [2, 139, 111, 7, 140, 112], [17, 74, 46], [7, 54, 24, 16, 55, 25], [34, 37, 13], [4, 151, 121, 5, 152, 122], [4, 75, 47, 14, 76, 48], [11, 54, 24, 14, 55, 25], [16, 45, 15, 14, 46, 16], [6, 147, 117, 4, 148, 118], [6, 73, 45, 14, 74, 46], [11, 54, 24, 16, 55, 25], [30, 46, 16, 2, 47, 17], [8, 132, 106, 4, 133, 107], [8, 75, 47, 13, 76, 48], [7, 54, 24, 22, 55, 25], [22, 45, 15, 13, 46, 16], [10, 142, 114, 2, 143, 115], [19, 74, 46, 4, 75, 47], [28, 50, 22, 6, 51, 23], [33, 46, 16, 4, 47, 17], [8, 152, 122, 4, 153, 123], [22, 73, 45, 3, 74, 46], [8, 53, 23, 26, 54, 24], [12, 45, 15, 28, 46, 16], [3, 147, 117, 10, 148, 118], [3, 73, 45, 23, 74, 46], [4, 54, 24, 31, 55, 25], [11, 45, 15, 31, 46, 16], [7, 146, 116, 7, 147, 117], [21, 73, 45, 7, 74, 46], [1, 53, 23, 37, 54, 24], [19, 45, 15, 26, 46, 16], [5, 145, 115, 10, 146, 116], [19, 75, 47, 10, 76, 48], [15, 54, 24, 25, 55, 25], [23, 45, 15, 25, 46, 16], [13, 145, 115, 3, 146, 116], [2, 74, 46, 29, 75, 47], [42, 54, 24, 1, 55, 25], [23, 45, 15, 28, 46, 16], [17, 145, 115], [10, 74, 46, 23, 75, 47], [10, 54, 24, 35, 55, 25], [19, 45, 15, 35, 46, 16], [17, 145, 115, 1, 146, 116], [14, 74, 46, 21, 75, 47], [29, 54, 24, 19, 55, 25], [11, 45, 15, 46, 46, 16], [13, 145, 115, 6, 146, 116], [14, 74, 46, 23, 75, 47], [44, 54, 24, 7, 55, 25], [59, 46, 16, 1, 47, 17], [12, 151, 121, 7, 152, 122], [12, 75, 47, 26, 76, 48], [39, 54, 24, 14, 55, 25], [22, 45, 15, 41, 46, 16], [6, 151, 121, 14, 152, 122], [6, 75, 47, 34, 76, 48], [46, 54, 24, 10, 55, 25], [2, 45, 15, 64, 46, 16], [17, 152, 122, 4, 153, 123], [29, 74, 46, 14, 75, 47], [49, 54, 24, 10, 55, 25], [24, 45, 15, 46, 46, 16], [4, 152, 122, 18, 153, 123], [13, 74, 46, 32, 75, 47], [48, 54, 24, 14, 55, 25], [42, 45, 15, 32, 46, 16], [20, 147, 117, 4, 148, 118], [40, 75, 47, 7, 76, 48], [43, 54, 24, 22, 55, 25], [10, 45, 15, 67, 46, 16], [19, 148, 118, 6, 149, 119], [18, 75, 47, 31, 76, 48], [34, 54, 24, 34, 55, 25], [20, 45, 15, 61, 46, 16]],
        b.getRSBlocks = function(r, t) {
            var e = b.getRsBlockTable(r, t);
            if (null == e)
                throw new Error("bad rs block @ typeNumber:" + r + "/errorCorrectLevel:" + t);
            for (var i = e.length / 3, n = [], s = 0; s < i; s++)
                for (var o = e[3 * s + 0], h = e[3 * s + 1], a = e[3 * s + 2], f = 0; f < o; f++)
                    n.push(new b(h,a));
            return n
        }
        ,
        b.getRsBlockTable = function(r, t) {
            switch (t) {
            case n:
                return b.RS_BLOCK_TABLE[4 * (r - 1) + 0];
            case s:
                return b.RS_BLOCK_TABLE[4 * (r - 1) + 1];
            case o:
                return b.RS_BLOCK_TABLE[4 * (r - 1) + 2];
            case h:
                return b.RS_BLOCK_TABLE[4 * (r - 1) + 3];
            default:
                return
            }
        }
        ,
        m.prototype = {
            get: function(r) {
                var t = Math.floor(r / 8);
                return 1 == (this.buffer[t] >>> 7 - r % 8 & 1)
            },
            put: function(r, t) {
                for (var e = 0; e < t; e++)
                    this.putBit(1 == (r >>> t - e - 1 & 1))
            },
            getLengthInBits: function() {
                return this.length
            },
            putBit: function(r) {
                var t = Math.floor(this.length / 8);
                this.buffer.length <= t && this.buffer.push(0),
                r && (this.buffer[t] |= 128 >>> this.length % 8),
                this.length++
            }
        };
        var M = [[17, 14, 11, 7], [32, 26, 20, 14], [53, 42, 32, 24], [78, 62, 46, 34], [106, 84, 60, 44], [134, 106, 74, 58], [154, 122, 86, 64], [192, 152, 108, 84], [230, 180, 130, 98], [271, 213, 151, 119], [321, 251, 177, 137], [367, 287, 203, 155], [425, 331, 241, 177], [458, 362, 258, 194], [520, 412, 292, 220], [586, 450, 322, 250], [644, 504, 364, 280], [718, 560, 394, 310], [792, 624, 442, 338], [858, 666, 482, 382], [929, 711, 509, 403], [1003, 779, 565, 439], [1091, 857, 611, 461], [1171, 911, 661, 511], [1273, 997, 715, 535], [1367, 1059, 751, 593], [1465, 1125, 805, 625], [1528, 1190, 868, 658], [1628, 1264, 908, 698], [1732, 1370, 982, 742], [1840, 1452, 1030, 790], [1952, 1538, 1112, 842], [2068, 1628, 1168, 898], [2188, 1722, 1228, 958], [2303, 1809, 1283, 983], [2431, 1911, 1351, 1051], [2563, 1989, 1423, 1093], [2699, 2099, 1499, 1139], [2809, 2213, 1579, 1219], [2953, 2331, 1663, 1273]];
        function A(r) {
            if (this.options = {
                padding: 4,
                width: 256,
                height: 256,
                typeNumber: 4,
                color: "#000000",
                background: "#ffffff",
                ecl: "M"
            },
            "string" == typeof r && (r = {
                content: r
            }),
            r)
                for (var t in r)
                    this.options[t] = r[t];
            if ("string" != typeof this.options.content)
                throw new Error("Expected 'content' as string!");
            if (0 === this.options.content.length)
                throw new Error("Expected 'content' to be non-empty!");
            if (!(this.options.padding >= 0))
                throw new Error("Expected 'padding' value to be non-negative!");
            if (!(this.options.width > 0 && this.options.height > 0))
                throw new Error("Expected 'width' or 'height' value to be higher than zero!");
            var i = this.options.content
              , a = function(r, t) {
                for (var e = function(r) {
                    var t = encodeURI(r).toString().replace(/\%[0-9a-fA-F]{2}/g, "a");
                    return t.length + (t.length != r ? 3 : 0)
                }(r), i = 1, n = 0, s = 0, o = M.length; s <= o; s++) {
                    var h = M[s];
                    if (!h)
                        throw new Error("Content too long: expected " + n + " but got " + e);
                    switch (t) {
                    case "L":
                        n = h[0];
                        break;
                    case "M":
                        n = h[1];
                        break;
                    case "Q":
                        n = h[2];
                        break;
                    case "H":
                        n = h[3];
                        break;
                    default:
                        throw new Error("Unknwon error correction level: " + t)
                    }
                    if (e <= n)
                        break;
                    i++
                }
                if (i > M.length)
                    throw new Error("Content too long");
                return i
            }(i, this.options.ecl)
              , f = function(r) {
                switch (r) {
                case "L":
                    return n;
                case "M":
                    return s;
                case "Q":
                    return o;
                case "H":
                    return h;
                default:
                    throw new Error("Unknwon error correction level: " + r)
                }
            }(this.options.ecl);
            this.qrcode = new e(a,f),
            this.qrcode.addData(i),
            this.qrcode.make()
        }
        A.prototype.svg = function(r) {
            var t = this.options || {}
              , e = this.qrcode.modules;
            void 0 === r && (r = {
                container: t.container || "svg"
            });
            for (var i = void 0 === t.pretty || !!t.pretty, n = i ? "  " : "", s = i ? "\r\n" : "", o = t.width, h = t.height, a = e.length, f = o / (a + 2 * t.padding), u = h / (a + 2 * t.padding), c = void 0 !== t.join && !!t.join, v = void 0 !== t.swap && !!t.swap, w = void 0 === t.xmlDeclaration || !!t.xmlDeclaration, l = void 0 !== t.predefined && !!t.predefined, g = l ? n + '<defs><path id="qrmodule" d="M0 0 h' + u + " v" + f + ' H0 z" style="fill:' + t.color + ';shape-rendering:crispEdges;" /></defs>' + s : "", d = n + '<rect x="0" y="0" width="' + o + '" height="' + h + '" style="fill:' + t.background + ';shape-rendering:crispEdges;"/>' + s, p = "", E = "", y = 0; y < a; y++)
                for (var b = 0; b < a; b++)
                    if (e[b][y]) {
                        var m = b * f + t.padding * f
                          , M = y * u + t.padding * u;
                        if (v) {
                            var A = m;
                            m = M,
                            M = A
                        }
                        if (c) {
                            var k = f + m
                              , x = u + M;
                            m = Number.isInteger(m) ? Number(m) : m.toFixed(2),
                            M = Number.isInteger(M) ? Number(M) : M.toFixed(2),
                            k = Number.isInteger(k) ? Number(k) : k.toFixed(2),
                            E += "M" + m + "," + M + " V" + (x = Number.isInteger(x) ? Number(x) : x.toFixed(2)) + " H" + k + " V" + M + " H" + m + " Z "
                        } else
                            p += l ? n + '<use x="' + m.toString() + '" y="' + M.toString() + '" href="#qrmodule" />' + s : n + '<rect x="' + m.toString() + '" y="' + M.toString() + '" width="' + f + '" height="' + u + '" style="fill:' + t.color + ';shape-rendering:crispEdges;"/>' + s
                    }
            c && (p = n + '<path x="0" y="0" style="fill:' + t.color + ';shape-rendering:crispEdges;" d="' + E + '" />');
            var N = "";
            switch (r.container) {
            case "svg":
                w && (N += '<?xml version="1.0" standalone="yes"?>' + s),
                N += '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="' + o + '" height="' + h + '">' + s,
                N += g + d + p,
                N += "</svg>";
                break;
            case "svg-viewbox":
                w && (N += '<?xml version="1.0" standalone="yes"?>' + s),
                N += '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 ' + o + " " + h + '">' + s,
                N += g + d + p,
                N += "</svg>";
                break;
            case "g":
                N += '<g width="' + o + '" height="' + h + '">' + s,
                N += g + d + p,
                N += "</g>";
                break;
            default:
                N += (g + d + p).replace(/^\s+/, "")
            }
            return N
        }
        ,
        r.exports = A
    }
    ,
    r(t = {
        exports: {}
    }, t.exports),
    t.exports);
    self.qrcode = r => new e({
        content: r,
        container: "svg-viewbox"
    }).svg()
}();
