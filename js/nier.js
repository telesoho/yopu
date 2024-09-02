!function(e, t) {
    "object" == typeof exports && "undefined" != typeof module ? t(exports) : "function" == typeof define && define.amd ? define(["exports"], t) : t((e = "undefined" != typeof globalThis ? globalThis : e || self).nier = {})
}(this, (function(e) {
    "use strict";
    var t, s, i, n, r, a, o, h, l, c, d, u, p, g, f, m, y, b, S, w, _, B, T, N, v, x, k, P, F, C, L, E, M, D, R, O, I, A, G, H, V, W, z, U, X, Y, J, q, Q, $;
    !function(e) {
        e[e.PerNotePitchBend = 96] = "PerNotePitchBend",
        e[e.NoteOff = 128] = "NoteOff",
        e[e.NoteOn = 144] = "NoteOn",
        e[e.NoteAftertouch = 160] = "NoteAftertouch",
        e[e.Controller = 176] = "Controller",
        e[e.ProgramChange = 192] = "ProgramChange",
        e[e.ChannelAftertouch = 208] = "ChannelAftertouch",
        e[e.PitchBend = 224] = "PitchBend",
        e[e.SystemExclusive = 240] = "SystemExclusive",
        e[e.SystemExclusive2 = 247] = "SystemExclusive2",
        e[e.Meta = 255] = "Meta"
    }(t || (t = {}));
    class K {
        constructor(e, t, s, i, n) {
            this.track = e,
            this.tick = t,
            this.message = s | i << 8 | n << 16
        }
        get channel() {
            return 15 & this.message
        }
        get command() {
            return 240 & this.message
        }
        get data1() {
            return (65280 & this.message) >> 8
        }
        set data1(e) {
            this.message &= -65281,
            this.message |= e << 8
        }
        get data2() {
            return (16711680 & this.message) >> 16
        }
        set data2(e) {
            this.message &= -16711681,
            this.message |= e << 16
        }
        writeTo(e) {
            let t = new Uint8Array([this.message >> 24 & 255, this.message >> 16 & 255, this.message >> 8 & 255, 255 & this.message]);
            e.write(t, 0, t.length)
        }
    }
    !function(e) {
        e[e.SequenceNumber = 0] = "SequenceNumber",
        e[e.TextEvent = 1] = "TextEvent",
        e[e.CopyrightNotice = 2] = "CopyrightNotice",
        e[e.SequenceOrTrackName = 3] = "SequenceOrTrackName",
        e[e.InstrumentName = 4] = "InstrumentName",
        e[e.LyricText = 5] = "LyricText",
        e[e.MarkerText = 6] = "MarkerText",
        e[e.CuePoint = 7] = "CuePoint",
        e[e.PatchName = 8] = "PatchName",
        e[e.PortName = 9] = "PortName",
        e[e.MidiChannel = 32] = "MidiChannel",
        e[e.MidiPort = 33] = "MidiPort",
        e[e.EndOfTrack = 47] = "EndOfTrack",
        e[e.Tempo = 81] = "Tempo",
        e[e.SmpteOffset = 84] = "SmpteOffset",
        e[e.TimeSignature = 88] = "TimeSignature",
        e[e.KeySignature = 89] = "KeySignature",
        e[e.SequencerSpecific = 127] = "SequencerSpecific"
    }(s || (s = {}));
    class j extends K {
        get channel() {
            return -1
        }
        get command() {
            return 255 & this.message
        }
        get metaStatus() {
            return this.data1
        }
        constructor(e, t, s, i, n) {
            super(e, t, s, i, n)
        }
    }
    class Z {
        static ticksToMillis(e, t) {
            return e * (6e4 / (t * Z.QuarterTime)) | 0
        }
        static millisToTicks(e, t) {
            return e / (6e4 / (t * Z.QuarterTime)) | 0
        }
        static toTicks(e) {
            return Z.valueToTicks(e)
        }
        static valueToTicks(e) {
            let t = e;
            return t < 0 && (t = 1 / -t),
            Z.QuarterTime * (4 / t) | 0
        }
        static applyDot(e, t) {
            return t ? e + 3 * (e / 4 | 0) : e + (e / 2 | 0)
        }
        static applyTuplet(e, t, s) {
            return e * s / t | 0
        }
        static removeTuplet(e, t, s) {
            return e * t / s | 0
        }
        static dynamicToVelocity(e) {
            return Z.MinVelocity + e * Z.VelocityIncrement
        }
    }
    Z.QuarterTime = 960,
    Z.MinVelocity = 57,
    Z.VelocityIncrement = 10;
    class ee {
        static uint16ToInt16(e) {
            return ee._dataView.setUint16(0, e, !0),
            ee._dataView.getInt16(0, !0)
        }
        static int16ToUint32(e) {
            return ee._dataView.setInt16(0, e, !0),
            ee._dataView.getUint32(0, !0)
        }
        static int32ToUint16(e) {
            return ee._dataView.setInt32(0, e, !0),
            ee._dataView.getUint16(0, !0)
        }
        static int32ToInt16(e) {
            return ee._dataView.setInt32(0, e, !0),
            ee._dataView.getInt16(0, !0)
        }
        static int32ToUint32(e) {
            return ee._dataView.setInt32(0, e, !0),
            ee._dataView.getUint32(0, !0)
        }
        static uint8ToInt8(e) {
            return ee._dataView.setUint8(0, e),
            ee._dataView.getInt8(0)
        }
    }
    ee._conversionBuffer = new ArrayBuffer(8),
    ee._dataView = new DataView(ee._conversionBuffer);
    class te {
        static readInt32BE(e) {
            return e.readByte() << 24 | e.readByte() << 16 | e.readByte() << 8 | e.readByte()
        }
        static readInt32LE(e) {
            let t = e.readByte()
              , s = e.readByte()
              , i = e.readByte();
            return e.readByte() << 24 | i << 16 | s << 8 | t
        }
        static readUInt32LE(e) {
            let t = e.readByte()
              , s = e.readByte()
              , i = e.readByte();
            return e.readByte() << 24 | i << 16 | s << 8 | t
        }
        static decodeUInt32LE(e, t) {
            let s = e[t]
              , i = e[t + 1]
              , n = e[t + 2];
            return e[t + 3] << 24 | n << 16 | i << 8 | s
        }
        static readUInt16LE(e) {
            let t = e.readByte()
              , s = e.readByte();
            return ee.int32ToUint16(s << 8 | t)
        }
        static readInt16LE(e) {
            let t = e.readByte()
              , s = e.readByte();
            return ee.int32ToInt16(s << 8 | t)
        }
        static readUInt32BE(e) {
            let t = e.readByte()
              , s = e.readByte()
              , i = e.readByte()
              , n = e.readByte();
            return ee.int32ToUint32(t << 24 | s << 16 | i << 8 | n)
        }
        static readUInt16BE(e) {
            let t = e.readByte()
              , s = e.readByte();
            return ee.int32ToInt16(t << 8 | s)
        }
        static readInt16BE(e) {
            let t = e.readByte()
              , s = e.readByte();
            return ee.int32ToInt16(t << 8 | s)
        }
        static readByteArray(e, t) {
            let s = new Uint8Array(t);
            return e.read(s, 0, t),
            s
        }
        static read8BitChars(e, t) {
            let s = new Uint8Array(t);
            return e.read(s, 0, s.length),
            te.toString(s, "utf-8")
        }
        static read8BitString(e) {
            let t = ""
              , s = e.readByte();
            for (; 0 !== s; )
                t += String.fromCharCode(s),
                s = e.readByte();
            return t
        }
        static read8BitStringLength(e, t) {
            let s = ""
              , i = -1;
            for (let n = 0; n < t; n++) {
                let t = e.readByte();
                0 === t && -1 === i && (i = n),
                s += String.fromCharCode(t)
            }
            let n = s;
            return i >= 0 ? n.substr(0, i) : n
        }
        static readSInt8(e) {
            let t = e.readByte();
            return -256 * ((255 & t) >> 7) + (255 & t)
        }
        static readInt24(e, t) {
            let s = e[t] | e[t + 1] << 8 | e[t + 2] << 16;
            return 8388608 == (8388608 & s) && (s |= 255 << 24),
            s
        }
        static readInt16(e, t) {
            return ee.int32ToInt16(e[t] | e[t + 1] << 8)
        }
        static toString(e, t) {
            let s = te.detectEncoding(e);
            return s && (t = s),
            t || (t = "utf-8"),
            new TextDecoder(t).decode(e.buffer)
        }
        static detectEncoding(e) {
            return e.length > 2 && 254 === e[0] && 255 === e[1] ? "utf-16be" : e.length > 2 && 255 === e[0] && 254 === e[1] ? "utf-16le" : e.length > 4 && 0 === e[0] && 0 === e[1] && 254 === e[2] && 255 === e[3] ? "utf-32be" : e.length > 4 && 255 === e[0] && 254 === e[1] && 0 === e[2] && 0 === e[3] ? "utf-32le" : null
        }
        static stringToBytes(e) {
            return (new TextEncoder).encode(e)
        }
        static writeInt32BE(e, t) {
            e.writeByte(t >> 24 & 255),
            e.writeByte(t >> 16 & 255),
            e.writeByte(t >> 8 & 255),
            e.writeByte(t >> 0 & 255)
        }
        static writeInt32LE(e, t) {
            e.writeByte(t >> 0 & 255),
            e.writeByte(t >> 8 & 255),
            e.writeByte(t >> 16 & 255),
            e.writeByte(t >> 24 & 255)
        }
        static writeUInt16LE(e, t) {
            e.writeByte(t >> 0 & 255),
            e.writeByte(t >> 8 & 255)
        }
        static writeInt16LE(e, t) {
            e.writeByte(t >> 0 & 255),
            e.writeByte(t >> 8 & 255)
        }
    }
    class se {
        constructor() {
            this._capacity = 0,
            this.length = 0,
            this.position = 0
        }
        get bytesWritten() {
            return this.position
        }
        getBuffer() {
            return this._buffer
        }
        static empty() {
            return se.withCapacity(0)
        }
        static withCapacity(e) {
            let t = new se;
            return t._buffer = new Uint8Array(e),
            t._capacity = e,
            t
        }
        static fromBuffer(e) {
            let t = new se;
            return t._buffer = e,
            t.length = e.length,
            t._capacity = t.length,
            t
        }
        static fromString(e) {
            let t = te.stringToBytes(e);
            return se.fromBuffer(t)
        }
        reset() {
            this.position = 0
        }
        skip(e) {
            this.position += e
        }
        setCapacity(e) {
            if (e !== this._capacity) {
                if (e > 0) {
                    let t = new Uint8Array(e);
                    this.length > 0 && t.set(this._buffer.subarray(0, 0 + this.length), 0),
                    this._buffer = t
                }
                this._capacity = e
            }
        }
        readByte() {
            return this.length - this.position <= 0 ? -1 : this._buffer[this.position++]
        }
        read(e, t, s) {
            let i = this.length - this.position;
            if (i > s && (i = s),
            i <= 0)
                return 0;
            if (i <= 8) {
                let s = i;
                for (; --s >= 0; )
                    e[t + s] = this._buffer[this.position + s]
            } else
                e.set(this._buffer.subarray(this.position, this.position + i), t);
            return this.position += i,
            i
        }
        writeByte(e) {
            let t = new Uint8Array(1);
            t[0] = e,
            this.write(t, 0, 1)
        }
        write(e, t, s) {
            let i = this.position + s;
            if (i > this.length && (i > this._capacity && this.ensureCapacity(i),
            this.length = i),
            s <= 8 && e !== this._buffer) {
                let i = s;
                for (; --i >= 0; )
                    this._buffer[this.position + i] = e[t + i]
            } else {
                let i = Math.min(s, e.length - t);
                this._buffer.set(e.subarray(t, t + i), this.position)
            }
            this.position = i
        }
        ensureCapacity(e) {
            if (e > this._capacity) {
                let t = e;
                t < 256 && (t = 256),
                t < 2 * this._capacity && (t = 2 * this._capacity),
                this.setCapacity(t)
            }
        }
        readAll() {
            return this.toArray()
        }
        toArray() {
            let e = new Uint8Array(this.length);
            return e.set(this._buffer.subarray(0, 0 + this.length), 0),
            e
        }
    }
    class ie {
        constructor() {
            this.division = Z.QuarterTime,
            this.events = []
        }
        addEvent(e) {
            if (0 === this.events.length)
                this.events.push(e);
            else {
                let t = this.events.length;
                for (; t > 0; ) {
                    if (!(this.events[t - 1].tick > e.tick))
                        break;
                    t--
                }
                this.events.splice(t, 0, e)
            }
        }
        toBinary() {
            let e = se.empty();
            return this.writeTo(e),
            e.toArray()
        }
        writeTo(e) {
            let t = new Uint8Array([77, 84, 104, 100]);
            e.write(t, 0, t.length),
            t = new Uint8Array([0, 0, 0, 6]),
            e.write(t, 0, t.length),
            t = new Uint8Array([0, 0]),
            e.write(t, 0, t.length);
            let s = 1;
            t = new Uint8Array([s >> 8 & 255, 255 & s]),
            e.write(t, 0, t.length),
            s = this.division,
            t = new Uint8Array([s >> 8 & 255, 255 & s]),
            e.write(t, 0, t.length);
            let i = se.empty()
              , n = 0;
            for (let e of this.events) {
                let t = e.tick - n;
                ie.writeVariableInt(i, t),
                e.writeTo(i),
                n = e.tick
            }
            t = new Uint8Array([77, 84, 114, 107]),
            e.write(t, 0, t.length);
            let r = i.toArray()
              , a = r.length;
            t = new Uint8Array([a >> 24 & 255, a >> 16 & 255, a >> 8 & 255, 255 & a]),
            e.write(t, 0, t.length),
            e.write(r, 0, r.length)
        }
        static writeVariableInt(e, t) {
            let s = new Uint8Array(4)
              , i = 0;
            do {
                s[i++] = 127 & t,
                t >>= 7
            } while (t > 0);
            for (; i > 0; )
                i--,
                i > 0 ? e.writeByte(128 | s[i]) : e.writeByte(s[i])
        }
    }
    class ne extends j {
        constructor(e, t, s, i, n) {
            super(e, t, s, i, 0),
            this.data = n
        }
        writeTo(e) {
            e.writeByte(255),
            e.writeByte(this.metaStatus);
            let t = this.data.length;
            ie.writeVariableInt(e, t),
            e.write(this.data, 0, this.data.length)
        }
    }
    class re extends j {
        constructor(e, t, s, i, n) {
            super(e, t, s, i, 0),
            this.value = n
        }
        writeTo(e) {
            e.writeByte(255),
            e.writeByte(this.metaStatus),
            ie.writeVariableInt(e, 3);
            let t = new Uint8Array([this.value >> 16 & 255, this.value >> 8 & 255, 255 & this.value]);
            e.write(t, 0, t.length)
        }
    }
    !function(e) {
        e[e.SystemExclusive = 240] = "SystemExclusive",
        e[e.MtcQuarterFrame = 241] = "MtcQuarterFrame",
        e[e.SongPosition = 242] = "SongPosition",
        e[e.SongSelect = 243] = "SongSelect",
        e[e.TuneRequest = 246] = "TuneRequest",
        e[e.SystemExclusive2 = 247] = "SystemExclusive2"
    }(i || (i = {}));
    class ae extends K {
        get channel() {
            return -1
        }
        get command() {
            return 255 & this.message
        }
        constructor(e, t, s, i, n) {
            super(e, t, s, i, n)
        }
    }
    !function(e) {
        e[e.MetronomeTick = 0] = "MetronomeTick",
        e[e.Rest = 1] = "Rest"
    }(n || (n = {}));
    class oe extends ae {
        constructor(e, t, s, i, n) {
            super(e, t, s, 255 & i, i >> 8 & 255),
            this.data = n
        }
        get isMetronome() {
            return this.manufacturerId == oe.AlphaTabManufacturerId && this.data[0] == n.MetronomeTick
        }
        get metronomeNumerator() {
            return this.isMetronome ? this.data[1] : -1
        }
        get metronomeDurationInTicks() {
            return this.isMetronome ? te.decodeUInt32LE(this.data, 2) : -1
        }
        get metronomeDurationInMilliseconds() {
            return this.isMetronome ? te.decodeUInt32LE(this.data, 6) : -1
        }
        get isRest() {
            return this.manufacturerId == oe.AlphaTabManufacturerId && this.data[0] == n.Rest
        }
        get manufacturerId() {
            return this.message >> 8
        }
        writeTo(e) {
            e.writeByte(240);
            let t = this.data.length + 2;
            e.writeByte(this.manufacturerId);
            let s = new Uint8Array([t >> 24 & 255, t >> 16 & 255, t >> 8 & 255, 255 & t]);
            e.write(s, 0, s.length),
            e.writeByte(247)
        }
        static encodeMetronome(e, t, s) {
            const i = se.withCapacity(10);
            return i.writeByte(n.MetronomeTick),
            i.writeByte(e),
            te.writeInt32LE(i, t),
            te.writeInt32LE(i, s),
            i.toArray()
        }
    }
    oe.AlphaTabManufacturerId = 125;
    class he {
    }
    he.DefaultChannelCount = 17,
    he.MetronomeChannel = he.DefaultChannelCount - 1,
    he.AudioChannels = 2,
    he.MinVolume = 0,
    he.MinProgram = 0,
    he.MaxProgram = 127,
    he.MinPlaybackSpeed = .125,
    he.MaxPlaybackSpeed = 8,
    he.MaxPitchWheel = 16384,
    he.MaxPitchWheel20 = 4294967296,
    he.DefaultPitchWheel = he.MaxPitchWheel / 2,
    he.MicroBufferCount = 32,
    he.MicroBufferSize = 64;
    class le extends K {
        constructor(e, t, s, i, n) {
            super(e, t, s, 0, 0),
            this.noteKey = i,
            this.pitch = n
        }
        writeTo(e) {
            let t = new Uint8Array([64, 255 & this.message, 255 & this.noteKey, 0, this.pitch >> 24 & 255, this.pitch >> 16 & 255, this.pitch >> 8 & 255, 255 & this.pitch]);
            e.write(t, 0, t.length)
        }
    }
    class ce {
        constructor(e) {
            this._midiFile = e
        }
        addTimeSignature(e, t, i) {
            let n = 0;
            for (; (i >>= 1) > 0; )
                n++;
            const r = new ne(0,e,255,s.TimeSignature,new Uint8Array([255 & t, 255 & n, 48, 8]));
            this._midiFile.addEvent(r)
        }
        addRest(e, t, s) {
            const r = new oe(e,t,i.SystemExclusive,oe.AlphaTabManufacturerId,new Uint8Array([n.Rest]));
            this._midiFile.addEvent(r)
        }
        addNote(e, s, i, n, r, a, o) {
            const h = Z.dynamicToVelocity(r)
              , l = new K(e,s,this.makeCommand(t.NoteOn, a),ce.fixValue(n),ce.fixValue(h));
            this._midiFile.addEvent(l);
            const c = new K(e,s + i,this.makeCommand(t.NoteOff, a),ce.fixValue(n),o ? 1 : 0);
            this._midiFile.addEvent(c)
        }
        makeCommand(e, t) {
            return 240 & e | 15 & t
        }
        static fixValue(e) {
            return e > 127 ? 127 : e < 0 ? 0 : e
        }
        addControlChange(e, s, i, n, r) {
            const a = new K(e,s,this.makeCommand(t.Controller, i),ce.fixValue(n),ce.fixValue(r));
            this._midiFile.addEvent(a)
        }
        addProgramChange(e, s, i, n) {
            const r = new K(e,s,this.makeCommand(t.ProgramChange, i),ce.fixValue(n),0);
            this._midiFile.addEvent(r)
        }
        addTempo(e, t) {
            const i = 6e7 / t | 0
              , n = new re(0,e,255,s.Tempo,i);
            this._midiFile.addEvent(n)
        }
        addBend(e, s, i, n) {
            n = n >= he.MaxPitchWheel ? he.MaxPitchWheel : Math.floor(n);
            const r = new K(e,s,this.makeCommand(t.PitchBend, i),127 & n,n >> 7 & 127);
            this._midiFile.addEvent(r)
        }
        addNoteBend(e, s, i, n, r) {
            r = (r = r >= he.MaxPitchWheel ? he.MaxPitchWheel : Math.floor(r)) * he.MaxPitchWheel20 / he.MaxPitchWheel;
            const a = new le(e,s,this.makeCommand(t.PerNotePitchBend, i),n,r);
            this._midiFile.addEvent(a)
        }
        finishTrack(e, t) {
            const i = new ne(e,t,255,s.EndOfTrack,new Uint8Array(0));
            this._midiFile.addEvent(i)
        }
    }
    class de {
        constructor() {
            this._highlightedBeats = new Map,
            this.start = 0,
            this.end = 0,
            this.isEmptyBar = !1,
            this.beatsToHighlight = []
        }
        highlightBeat(e) {
            this._highlightedBeats.has(e.id) || (this._highlightedBeats.set(e.id, !0),
            this.beatsToHighlight.push(e))
        }
    }
    !function(e) {
        e[e.BankSelectCoarse = 0] = "BankSelectCoarse",
        e[e.ModulationCoarse = 1] = "ModulationCoarse",
        e[e.DataEntryCoarse = 6] = "DataEntryCoarse",
        e[e.VolumeCoarse = 7] = "VolumeCoarse",
        e[e.PanCoarse = 10] = "PanCoarse",
        e[e.ExpressionControllerCoarse = 11] = "ExpressionControllerCoarse",
        e[e.ModulationFine = 33] = "ModulationFine",
        e[e.DataEntryFine = 38] = "DataEntryFine",
        e[e.VolumeFine = 39] = "VolumeFine",
        e[e.PanFine = 42] = "PanFine",
        e[e.ExpressionControllerFine = 43] = "ExpressionControllerFine",
        e[e.HoldPedal = 64] = "HoldPedal",
        e[e.LegatoPedal = 68] = "LegatoPedal",
        e[e.NonRegisteredParameterFine = 98] = "NonRegisteredParameterFine",
        e[e.NonRegisteredParameterCourse = 99] = "NonRegisteredParameterCourse",
        e[e.RegisteredParameterFine = 100] = "RegisteredParameterFine",
        e[e.RegisteredParameterCourse = 101] = "RegisteredParameterCourse",
        e[e.ResetControllers = 121] = "ResetControllers",
        e[e.AllNotesOff = 123] = "AllNotesOff"
    }(r || (r = {}));
    class ue {
        constructor(e) {
            this._repeatStartIndex = 0,
            this._repeatNumber = 0,
            this._repeatOpen = !1,
            this.shouldPlay = !0,
            this.index = 0,
            this.currentTick = 0,
            this._score = e
        }
        get finished() {
            return this.index >= this._score.masterBars.length
        }
        processCurrent() {
            const e = this._score.masterBars[this.index]
              , t = e.alternateEndings;
            e.repeatGroup.isClosed || e.repeatGroup.openings[e.repeatGroup.openings.length - 1] !== e || (this._repeatNumber = 0,
            this._repeatOpen = !1),
            !e.isRepeatStart && 0 !== e.index || 0 !== this._repeatNumber ? e.isRepeatStart && (this.shouldPlay = !0) : (this._repeatStartIndex = this.index,
            this._repeatOpen = !0),
            this._repeatOpen && t > 0 && (0 == (t & 1 << this._repeatNumber) ? this.shouldPlay = !1 : this.shouldPlay = !0),
            this.shouldPlay && (this.currentTick += e.calculateDuration())
        }
        moveNext() {
            const e = this._score.masterBars[this.index].repeatCount - 1;
            this._repeatOpen && e > 0 ? this._repeatNumber < e ? (this.index = this._repeatStartIndex,
            this._repeatNumber++) : (this._repeatNumber = 0,
            this._repeatOpen = !1,
            this.shouldPlay = !0,
            this.index++) : this.index++
        }
    }
    class pe {
        constructor() {
            this.start = 0,
            this.end = 0,
            this.tempo = 0,
            this.startMs = 0,
            this.durationMs = 0,
            this.beats = [],
            this.nextMasterBar = null
        }
        finish() {
            this.beats.sort(( (e, t) => e.start - t.start)),
            this.durationMs = Z.ticksToMillis(this.end - this.start, this.tempo)
        }
        addBeat(e) {
            this.beats.push(e)
        }
    }
    class ge {
        constructor() {
            this.nextBeat = null,
            this.duration = 0
        }
    }
    class fe {
        constructor() {
            this._currentMasterBar = null,
            this.masterBarLookup = new Map,
            this.masterBars = []
        }
        finish() {
            let e = null
              , t = []
              , s = 0;
            for (let i of this.masterBars) {
                i.finish(),
                i.startMs = s,
                s += i.durationMs,
                e && (e.nextMasterBar = i);
                for (const e of i.beats) {
                    const s = [];
                    for (let i of t)
                        i.end > e.start && (s.push(i),
                        e.highlightBeat(i.beat),
                        e.start <= i.start && i.highlightBeat(e.beat));
                    s.push(e),
                    t = s
                }
                e = i
            }
        }
        findBeat(e, t) {
            const s = this.findMasterBar(t);
            if (!s)
                return null;
            const i = new Map;
            for (const t of e)
                i.set(t.index, !0);
            let n = null
              , r = 0
              , a = s.beats;
            for (let e = 0; e < a.length; e++) {
                let s = a[e];
                if (i.has(s.beat.voice.bar.staff.track.index))
                    if (s.start <= t && t < s.end)
                        (!n || n.start < s.start) && (n = a[e],
                        r = e);
                    else if (s.end > t)
                        break
            }
            if (!n)
                return null;
            let o = null;
            for (let e = r + 1; e < a.length; e++) {
                const t = a[e];
                if (t.start > n.start && i.has(t.beat.voice.bar.staff.track.index)) {
                    o = t;
                    break
                }
            }
            if (!o && s.nextMasterBar) {
                a = s.nextMasterBar.beats;
                for (let e = 0; e < a.length; e++) {
                    const t = a[e];
                    if (i.has(t.beat.voice.bar.staff.track.index)) {
                        o = t;
                        break
                    }
                }
            }
            const h = new ge;
            return h.currentBeat = n.beat,
            h.nextBeat = o ? o.beat : null,
            h.duration = o ? Z.ticksToMillis(o.start - n.start, s.tempo) : Z.ticksToMillis(n.end - n.start, s.tempo),
            h.beatsToHighlight = n.beatsToHighlight,
            h
        }
        findMasterBar(e) {
            const t = this.masterBars;
            let s = 0
              , i = t.length - 1;
            for (; s <= i; ) {
                const n = (i + s) / 2 | 0
                  , r = t[n];
                if (e >= r.start && e < r.end)
                    return r;
                e < r.start ? i = n - 1 : s = n + 1
            }
            return null
        }
        getMasterBar(e) {
            if (!this.masterBarLookup.has(e.index)) {
                const t = new pe;
                return t.masterBar = e,
                t
            }
            return this.masterBarLookup.get(e.index)
        }
        getMasterBarStart(e) {
            return this.masterBarLookup.has(e.index) ? this.masterBarLookup.get(e.index).start : 0
        }
        addMasterBar(e) {
            this.masterBars.push(e),
            this._currentMasterBar = e,
            this.masterBarLookup.has(e.masterBar.index) || this.masterBarLookup.set(e.masterBar.index, e)
        }
        addBeat(e) {
            var t;
            null === (t = this._currentMasterBar) || void 0 === t || t.addBeat(e)
        }
    }
    !function(e) {
        e[e.None = 0] = "None",
        e[e.Normal = 1] = "Normal",
        e[e.Heavy = 2] = "Heavy"
    }(a || (a = {})),
    function(e) {
        e[e.Tempo = 0] = "Tempo",
        e[e.Volume = 1] = "Volume",
        e[e.Instrument = 2] = "Instrument",
        e[e.Balance = 3] = "Balance"
    }(o || (o = {}));
    class me {
        constructor() {
            this.isLinear = !1,
            this.type = o.Tempo,
            this.value = 0,
            this.ratioPosition = 0,
            this.text = ""
        }
        static buildTempoAutomation(e, t, s, i) {
            (i < 1 || i > 5) && (i = 2);
            let n = new Float32Array([1, .5, 1, 1.5, 2, 3])
              , r = new me;
            return r.type = o.Tempo,
            r.isLinear = e,
            r.ratioPosition = t,
            r.value = s * n[i],
            r
        }
        static buildInstrumentAutomation(e, t, s) {
            let i = new me;
            return i.type = o.Instrument,
            i.isLinear = e,
            i.ratioPosition = t,
            i.value = s,
            i
        }
    }
    class ye {
        constructor(e=0, t=0) {
            this.offset = e,
            this.value = t
        }
    }
    ye.MaxPosition = 60,
    ye.MaxValue = 12,
    function(e) {
        e[e.Default = 0] = "Default",
        e[e.Gradual = 1] = "Gradual",
        e[e.Fast = 2] = "Fast"
    }(h || (h = {})),
    function(e) {
        e[e.None = 0] = "None",
        e[e.Custom = 1] = "Custom",
        e[e.Bend = 2] = "Bend",
        e[e.Release = 3] = "Release",
        e[e.BendRelease = 4] = "BendRelease",
        e[e.Hold = 5] = "Hold",
        e[e.Prebend = 6] = "Prebend",
        e[e.PrebendBend = 7] = "PrebendBend",
        e[e.PrebendRelease = 8] = "PrebendRelease"
    }(l || (l = {})),
    function(e) {
        e[e.None = 0] = "None",
        e[e.BrushUp = 1] = "BrushUp",
        e[e.BrushDown = 2] = "BrushDown",
        e[e.ArpeggioUp = 3] = "ArpeggioUp",
        e[e.ArpeggioDown = 4] = "ArpeggioDown",
        e[e.Arpeggio = 5] = "Arpeggio"
    }(c || (c = {})),
    function(e) {
        e[e.QuadrupleWhole = -4] = "QuadrupleWhole",
        e[e.DoubleWhole = -2] = "DoubleWhole",
        e[e.Whole = 1] = "Whole",
        e[e.Half = 2] = "Half",
        e[e.Quarter = 4] = "Quarter",
        e[e.Eighth = 8] = "Eighth",
        e[e.Sixteenth = 16] = "Sixteenth",
        e[e.ThirtySecond = 32] = "ThirtySecond",
        e[e.SixtyFourth = 64] = "SixtyFourth",
        e[e.OneHundredTwentyEighth = 128] = "OneHundredTwentyEighth",
        e[e.TwoHundredFiftySixth = 256] = "TwoHundredFiftySixth"
    }(d || (d = {})),
    function(e) {
        e[e.PPP = 0] = "PPP",
        e[e.PP = 1] = "PP",
        e[e.P = 2] = "P",
        e[e.MP = 3] = "MP",
        e[e.MF = 4] = "MF",
        e[e.F = 5] = "F",
        e[e.FF = 6] = "FF",
        e[e.FFF = 7] = "FFF"
    }(u || (u = {})),
    function(e) {
        e[e.None = 0] = "None",
        e[e.OnBeat = 1] = "OnBeat",
        e[e.BeforeBeat = 2] = "BeforeBeat",
        e[e.BendGrace = 3] = "BendGrace"
    }(p || (p = {})),
    function(e) {
        e[e.None = 0] = "None",
        e[e.Simple = 1] = "Simple",
        e[e.FirstOfDouble = 2] = "FirstOfDouble",
        e[e.SecondOfDouble = 3] = "SecondOfDouble"
    }(g || (g = {})),
    function(e) {
        e[e.None = 0] = "None",
        e[e.IntoFromBelow = 1] = "IntoFromBelow",
        e[e.IntoFromAbove = 2] = "IntoFromAbove"
    }(f || (f = {})),
    function(e) {
        e[e.None = 0] = "None",
        e[e.Shift = 1] = "Shift",
        e[e.Legato = 2] = "Legato",
        e[e.OutUp = 3] = "OutUp",
        e[e.OutDown = 4] = "OutDown",
        e[e.PickSlideDown = 5] = "PickSlideDown",
        e[e.PickSlideUp = 6] = "PickSlideUp"
    }(m || (m = {})),
    function(e) {
        e[e.NoTripletFeel = 0] = "NoTripletFeel",
        e[e.Triplet16th = 1] = "Triplet16th",
        e[e.Triplet8th = 2] = "Triplet8th",
        e[e.Dotted16th = 3] = "Dotted16th",
        e[e.Dotted8th = 4] = "Dotted8th",
        e[e.Scottish16th = 5] = "Scottish16th",
        e[e.Scottish8th = 6] = "Scottish8th"
    }(y || (y = {})),
    function(e) {
        e[e.None = 0] = "None",
        e[e.Slight = 1] = "Slight",
        e[e.Wide = 2] = "Wide"
    }(b || (b = {})),
    function(e) {
        e[e.None = 0] = "None",
        e[e.Custom = 1] = "Custom",
        e[e.Dive = 2] = "Dive",
        e[e.Dip = 3] = "Dip",
        e[e.Hold = 4] = "Hold",
        e[e.Predive = 5] = "Predive",
        e[e.PrediveDive = 6] = "PrediveDive"
    }(S || (S = {})),
    function(e) {
        e[e.Hidden = 0] = "Hidden",
        e[e.ShowWithBeams = 1] = "ShowWithBeams",
        e[e.ShowWithBars = 2] = "ShowWithBars"
    }(w || (w = {})),
    function(e) {
        e[e.ScoreDefault = 0] = "ScoreDefault",
        e[e.ScoreForcePiano = 1] = "ScoreForcePiano",
        e[e.SingleNoteEffectBand = 2] = "SingleNoteEffectBand",
        e[e.SingleNoteEffectBandForcePiano = 3] = "SingleNoteEffectBandForcePiano"
    }(_ || (_ = {})),
    function(e) {
        e[e.GuitarPro = 0] = "GuitarPro",
        e[e.SongBook = 1] = "SongBook"
    }(B || (B = {})),
    e.InlineChordMode = void 0,
    (T = e.InlineChordMode || (e.InlineChordMode = {}))[T.Name = 0] = "Name",
    T[T.Diagram = 1] = "Diagram",
    T[T.Number = 2] = "Number",
    e.NotationElement = void 0,
    (N = e.NotationElement || (e.NotationElement = {}))[N.ScoreTitle = 0] = "ScoreTitle",
    N[N.ScoreSubTitle = 1] = "ScoreSubTitle",
    N[N.ScoreArtist = 2] = "ScoreArtist",
    N[N.ScoreAlbum = 3] = "ScoreAlbum",
    N[N.ScoreWords = 4] = "ScoreWords",
    N[N.ScoreMusic = 5] = "ScoreMusic",
    N[N.ScoreWordsAndMusic = 6] = "ScoreWordsAndMusic",
    N[N.ScoreTab = 7] = "ScoreTab",
    N[N.ScoreMeter = 8] = "ScoreMeter",
    N[N.ScoreTempo = 9] = "ScoreTempo",
    N[N.ScoreCapo = 10] = "ScoreCapo",
    N[N.ScoreCopyright = 11] = "ScoreCopyright",
    N[N.GuitarTuning = 12] = "GuitarTuning",
    N[N.TrackNames = 13] = "TrackNames",
    N[N.TimeSignature = 14] = "TimeSignature",
    N[N.ChordDiagrams = 15] = "ChordDiagrams",
    N[N.ParenthesisOnTiedBends = 16] = "ParenthesisOnTiedBends",
    N[N.TabNotesOnTiedBends = 17] = "TabNotesOnTiedBends",
    N[N.ZerosOnDiveWhammys = 18] = "ZerosOnDiveWhammys",
    N[N.EffectAlternateEndings = 19] = "EffectAlternateEndings",
    N[N.EffectCapo = 20] = "EffectCapo",
    N[N.EffectNumberTonic = 21] = "EffectNumberTonic",
    N[N.EffectChordNames = 22] = "EffectChordNames",
    N[N.EffectChordDiagram = 23] = "EffectChordDiagram",
    N[N.EffectCrescendo = 24] = "EffectCrescendo",
    N[N.EffectDynamics = 25] = "EffectDynamics",
    N[N.EffectFadeIn = 26] = "EffectFadeIn",
    N[N.EffectFermata = 27] = "EffectFermata",
    N[N.EffectFingering = 28] = "EffectFingering",
    N[N.EffectHarmonics = 29] = "EffectHarmonics",
    N[N.EffectLetRing = 30] = "EffectLetRing",
    N[N.EffectLyrics = 31] = "EffectLyrics",
    N[N.EffectMarker = 32] = "EffectMarker",
    N[N.EffectOttavia = 33] = "EffectOttavia",
    N[N.EffectPalmMute = 34] = "EffectPalmMute",
    N[N.EffectPickSlide = 35] = "EffectPickSlide",
    N[N.EffectPickStroke = 36] = "EffectPickStroke",
    N[N.EffectSlightBeatVibrato = 37] = "EffectSlightBeatVibrato",
    N[N.EffectSlightNoteVibrato = 38] = "EffectSlightNoteVibrato",
    N[N.EffectTap = 39] = "EffectTap",
    N[N.EffectTempo = 40] = "EffectTempo",
    N[N.EffectText = 41] = "EffectText",
    N[N.EffectTrill = 42] = "EffectTrill",
    N[N.EffectTripletFeel = 43] = "EffectTripletFeel",
    N[N.EffectWhammyBar = 44] = "EffectWhammyBar",
    N[N.EffectWideBeatVibrato = 45] = "EffectWideBeatVibrato",
    N[N.EffectWideNoteVibrato = 46] = "EffectWideNoteVibrato",
    N[N.EffectLeftHandTap = 47] = "EffectLeftHandTap",
    N[N.EffectSustainPedal = 48] = "EffectSustainPedal";
    class be {
        constructor() {
            this.notationMode = B.GuitarPro,
            this.fingeringMode = _.ScoreDefault,
            this.elements = new Map,
            this.rhythmMode = w.Hidden,
            this.rhythmHeight = 15,
            this.transpositionPitches = [],
            this.displayTranspositionPitches = [],
            this.smallGraceTabNotes = !0,
            this.extendBendArrowsOnTiedNotes = !0,
            this.extendLineEffectsToBeatEnd = !1,
            this.slurHeight = 5,
            this.displayTiedNotes = !1,
            this.avoidInChordFretNumber = !1,
            this.inlineChordMode = e.InlineChordMode.Name,
            this.onlyShowBarNumberAtLineStart = !1
        }
        isNotationElementVisible(e) {
            return this.elements.has(e) ? this.elements.get(e) : !be.defaultElements.has(e) || be.defaultElements.get(e)
        }
    }
    be.defaultElements = new Map([[e.NotationElement.ZerosOnDiveWhammys, !1]]);
    class Se {
        constructor(e, t) {
            this.time = 0,
            this.eventIndex = e,
            this.event = t,
            this.isMetronome = this.event instanceof oe && this.event.isMetronome
        }
        static newMetronomeEvent(e, s, i, n, r) {
            const a = new oe(0,s,t.SystemExclusive2,oe.AlphaTabManufacturerId,oe.encodeMetronome(i, n, r));
            return new Se(e,a)
        }
    }
    !function(e) {
        e[e.None = 0] = "None",
        e[e.Debug = 1] = "Debug",
        e[e.Info = 2] = "Info",
        e[e.Warning = 3] = "Warning",
        e[e.Error = 4] = "Error"
    }(v || (v = {}));
    class we {
        static format(e, t) {
            return `[Nier][${e}] ${t}`
        }
        debug(e, t, ...s) {
            console.log(we.format(e, t), ...s)
        }
        warning(e, t, ...s) {
            console.warn(we.format(e, t), ...s)
        }
        info(e, t, ...s) {
            console.info(we.format(e, t), ...s)
        }
        error(e, t, ...s) {
            console.error(we.format(e, t), ...s)
        }
    }
    we.logLevel = v.Info;
    class _e {
        static shouldLog(e) {
            return _e.logLevel !== v.None && e >= _e.logLevel
        }
        static debug(e, t, ...s) {
            _e.shouldLog(v.Debug) && _e.log.debug(e, t, ...s)
        }
        static warning(e, t, ...s) {
            _e.shouldLog(v.Warning) && _e.log.warning(e, t, ...s)
        }
        static info(e, t, ...s) {
            _e.shouldLog(v.Info) && _e.log.info(e, t, ...s)
        }
        static error(e, t, ...s) {
            _e.shouldLog(v.Error) && _e.log.error(e, t, ...s)
        }
    }
    _e.logLevel = v.Info,
    _e.log = new we;
    class Be {
        constructor(e, t, s) {
            this.bpm = e,
            this.ticks = t,
            this.time = s
        }
    }
    class Te {
        constructor() {
            this.tempoChanges = [],
            this.firstProgramEventPerChannel = new Map,
            this.firstTimeSignatureNumerator = 0,
            this.firstTimeSignatureDenominator = 0,
            this.synthData = [],
            this.division = 0,
            this.eventIndex = 0,
            this.currentTime = 0,
            this.playbackRange = null,
            this.playbackRangeStartTime = 0,
            this.playbackRangeEndTime = 0,
            this.endTick = 0,
            this.endTime = 0
        }
    }
    class Ne {
        constructor(e) {
            this._oneTimeState = null,
            this._countInState = null,
            this.isLooping = !1,
            this.playbackSpeed = 1,
            this._synthesizer = e,
            this._mainState = new Te,
            this._currentState = this._mainState
        }
        get isPlayingOneTimeMidi() {
            return this._currentState == this._oneTimeState
        }
        get isPlayingCountIn() {
            return this._currentState == this._countInState
        }
        get playbackRange() {
            return this._currentState.playbackRange
        }
        set playbackRange(e) {
            this._currentState.playbackRange = e,
            e && (this._currentState.playbackRangeStartTime = this.tickPositionToTimePositionWithSpeed(e.startTick, 1),
            this._currentState.playbackRangeEndTime = this.tickPositionToTimePositionWithSpeed(e.endTick, 1))
        }
        get currentTime() {
            return this._currentState.currentTime
        }
        get endTick() {
            return this._currentState.endTick
        }
        get endTime() {
            return this._currentState.endTime / this.playbackSpeed
        }
        seek(e) {
            if (e *= this.playbackSpeed,
            this.playbackRange && (e < this._currentState.playbackRangeStartTime ? e = this._currentState.playbackRangeStartTime : e > this._currentState.playbackRangeEndTime && (e = this._currentState.playbackRangeEndTime)),
            e > this._currentState.currentTime)
                this.silentProcess(e - this._currentState.currentTime);
            else if (e < this._currentState.currentTime) {
                this._currentState.currentTime = 0,
                this._currentState.eventIndex = 0;
                let t = this._synthesizer.metronomeVolume;
                this._synthesizer.noteOffAll(!0),
                this._synthesizer.resetSoft(),
                this._synthesizer.setupMetronomeChannel(t),
                this.silentProcess(e)
            }
        }
        silentProcess(e) {
            if (e <= 0)
                return;
            let t = Date.now()
              , s = this._currentState.currentTime + e;
            for (; this._currentState.currentTime < s; )
                this.fillMidiEventQueueLimited(s - this._currentState.currentTime) && this._synthesizer.synthesizeSilent(he.MicroBufferSize);
            this._currentState.currentTime = s;
            let i = Date.now() - t;
            _e.debug("Sequencer", "Silent seek finished in " + i + "ms")
        }
        loadOneTimeMidi(e) {
            this._oneTimeState = this.createStateFromFile(e),
            this._currentState = this._oneTimeState
        }
        loadMidi(e) {
            this._mainState = this.createStateFromFile(e),
            this._currentState = this._mainState
        }
        createStateFromFile(e) {
            const i = new Te;
            i.tempoChanges = [],
            i.division = e.division,
            i.eventIndex = 0,
            i.currentTime = 0,
            i.synthData = [];
            let n = 120
              , r = 0
              , a = 0
              , o = 0
              , h = 0
              , l = 0
              , c = 0
              , d = 0
              , u = 0;
            for (let p of e.events) {
                let g = new Se(i.synthData.length,p);
                i.synthData.push(g);
                let f = p.tick - u;
                if (r += f,
                a += f * (6e4 / (n * e.division)),
                g.time = a,
                u = p.tick,
                h > 0)
                    for (; c < r; ) {
                        let e = Se.newMetronomeEvent(i.synthData.length, c, Math.floor(c / h) % o, h, l);
                        i.synthData.push(e),
                        e.time = d,
                        c += h,
                        d += l
                    }
                if (p.command === t.Meta && p.data1 === s.Tempo) {
                    n = 6e7 / p.value,
                    i.tempoChanges.push(new Be(n,r,a)),
                    l = h * (6e4 / (n * e.division))
                } else if (p.command === t.Meta && p.data1 === s.TimeSignature) {
                    let t = p
                      , s = Math.pow(2, t.data[1]);
                    o = t.data[0],
                    h = i.division * (4 / s) | 0,
                    l = h * (6e4 / (n * e.division)),
                    0 === i.firstTimeSignatureDenominator && (i.firstTimeSignatureNumerator = t.data[0],
                    i.firstTimeSignatureDenominator = s)
                } else if (p.command === t.ProgramChange) {
                    let e = p.channel;
                    i.firstProgramEventPerChannel.has(e) || i.firstProgramEventPerChannel.set(e, g)
                }
            }
            return i.synthData.sort(( (e, t) => e.time > t.time ? 1 : e.time < t.time ? -1 : e.eventIndex - t.eventIndex)),
            i.endTime = a,
            i.endTick = r,
            i
        }
        fillMidiEventQueue() {
            return this.fillMidiEventQueueLimited(-1)
        }
        fillMidiEventQueueLimited(e) {
            let t = he.MicroBufferSize / this._synthesizer.outSampleRate * 1e3 * this.playbackSpeed
              , s = this.internalEndTime;
            e > 0 && (e < t && (t = e),
            s = Math.min(this.internalEndTime, this._currentState.currentTime + e));
            let i = !1;
            for (this._currentState.currentTime += t; this._currentState.eventIndex < this._currentState.synthData.length && this._currentState.synthData[this._currentState.eventIndex].time < this._currentState.currentTime && this._currentState.currentTime < s; )
                this._synthesizer.dispatchEvent(this._currentState.synthData[this._currentState.eventIndex]),
                this._currentState.eventIndex++,
                i = !0;
            return i
        }
        tickPositionToTimePosition(e) {
            return this.tickPositionToTimePositionWithSpeed(e, this.playbackSpeed)
        }
        timePositionToTickPosition(e) {
            return this.timePositionToTickPositionWithSpeed(e, this.playbackSpeed)
        }
        tickPositionToTimePositionWithSpeed(e, t) {
            let s = 0
              , i = 120
              , n = 0;
            for (const t of this._currentState.tempoChanges) {
                if (e < t.ticks)
                    break;
                s = t.time,
                i = t.bpm,
                n = t.ticks
            }
            return s += (e -= n) * (6e4 / (i * this._currentState.division)),
            s / t
        }
        timePositionToTickPositionWithSpeed(e, t) {
            e *= t;
            let s = 0
              , i = 120
              , n = 0;
            for (const t of this._currentState.tempoChanges) {
                if (e < t.time)
                    break;
                s = t.ticks,
                i = t.bpm,
                n = t.time
            }
            return s += (e -= n) / (6e4 / (i * this._currentState.division)) | 0,
            s + 1
        }
        get internalEndTime() {
            return this.playbackRange ? this._currentState.playbackRangeEndTime : this._currentState.endTime
        }
        get isFinished() {
            return this._currentState.currentTime >= this.internalEndTime
        }
        stop() {
            this.playbackRange ? this.playbackRange && (this._currentState.currentTime = this.playbackRange.startTick,
            this._currentState.eventIndex = 0) : (this._currentState.currentTime = 0,
            this._currentState.eventIndex = 0)
        }
        resetOneTimeMidi() {
            this._oneTimeState = null,
            this._currentState = this._mainState
        }
        resetCountIn() {
            this._countInState = null,
            this._currentState = this._mainState
        }
        startCountIn() {
            this.generateCountInMidi(),
            this._currentState = this._countInState,
            this.stop(),
            this._synthesizer.noteOffAll(!0)
        }
        generateCountInMidi() {
            const e = new Te;
            e.division = this._mainState.division;
            let t = 120
              , s = 4
              , i = 4;
            0 === this._mainState.eventIndex ? (t = this._mainState.tempoChanges[0].bpm,
            s = this._mainState.firstTimeSignatureNumerator,
            i = this._mainState.firstTimeSignatureDenominator) : (t = this._synthesizer.currentTempo,
            s = this._synthesizer.timeSignatureNumerator,
            i = this._synthesizer.timeSignatureDenominator),
            e.tempoChanges.push(new Be(t,0,0));
            let n = e.division * (4 / i) | 0
              , r = n * (6e4 / (t * this._mainState.division))
              , a = 0
              , o = 0;
            for (let t = 0; t < s; t++) {
                let s = Se.newMetronomeEvent(e.synthData.length, a, t, n, r);
                e.synthData.push(s),
                s.time = o,
                a += n,
                o += r
            }
            e.synthData.sort(( (e, t) => e.time > t.time ? 1 : e.time < t.time ? -1 : e.eventIndex - t.eventIndex)),
            e.endTime = o,
            e.endTick = a,
            this._countInState = e
        }
    }
    !function(e) {
        e[e.Paused = 0] = "Paused",
        e[e.Playing = 1] = "Playing"
    }(x || (x = {}));
    class ve {
        constructor(e, t) {
            this.state = e,
            this.stopped = t
        }
    }
    class xe {
        constructor(e, t, s, i, n) {
            this.currentTime = e,
            this.endTime = t,
            this.currentTick = s,
            this.endTick = i,
            this.isSeek = n
        }
    }
    class ke {
        constructor() {
            this.id = "",
            this.size = 0
        }
        static load(e, t, s) {
            if (e && ke.HeaderSize > e.size)
                return !1;
            if (s.position + ke.HeaderSize >= s.length)
                return !1;
            if (t.id = te.read8BitStringLength(s, 4),
            t.id.charCodeAt(0) <= 32 || t.id.charCodeAt(0) >= 122)
                return !1;
            if (t.size = te.readUInt32LE(s),
            e && ke.HeaderSize + t.size > e.size)
                return !1;
            e && (e.size -= ke.HeaderSize + t.size);
            let i = "RIFF" === t.id
              , n = "LIST" === t.id;
            return (!i || !e) && (!i && !n || (t.id = te.read8BitStringLength(s, 4),
            !(t.id.charCodeAt(0) <= 32 || t.id.charCodeAt(0) >= 122) && (t.size -= 4,
            !0)))
        }
    }
    ke.HeaderSize = 8,
    function(e) {
        e[e.General = 0] = "General",
        e[e.Format = 1] = "Format",
        e[e.AlphaTex = 2] = "AlphaTex"
    }(k || (k = {}));
    class Pe extends Error {
        constructor(e, t="", s) {
            super(t),
            this.type = e,
            this.inner = null != s ? s : null,
            Object.setPrototypeOf(this, Pe.prototype)
        }
    }
    class Fe extends Pe {
        constructor(e) {
            super(k.Format, e),
            Object.setPrototypeOf(this, Fe.prototype)
        }
    }
    class Ce {
        constructor(e) {
            this.phdrs = [],
            this.pbags = [],
            this.pmods = [],
            this.pgens = [],
            this.insts = [],
            this.ibags = [],
            this.imods = [],
            this.igens = [],
            this.sHdrs = [],
            this.fontSamples = new Float32Array(0),
            this._sampleRate = e
        }
        load(e, t) {
            const s = new ke
              , i = new ke;
            if (!ke.load(null, s, e) || "sfbk" !== s.id)
                throw new Fe("Soundfont is not a valid Soundfont2 file");
            let n, r;
            for (; ke.load(s, i, e); ) {
                let s = new ke;
                if ("pdta" === i.id)
                    for (; ke.load(i, s, e); )
                        switch (s.id) {
                        case "phdr":
                            for (let t = 0, i = s.size / Ie.SizeInFile | 0; t < i; t++)
                                this.phdrs.push(new Ie(e));
                            break;
                        case "pbag":
                            for (let t = 0, i = s.size / Re.SizeInFile | 0; t < i; t++)
                                this.pbags.push(new Re(e));
                            break;
                        case "pmod":
                            for (let t = 0, i = s.size / Ae.SizeInFile | 0; t < i; t++)
                                this.pmods.push(new Ae(e));
                            break;
                        case "pgen":
                            for (let t = 0, i = s.size / Oe.SizeInFile | 0; t < i; t++)
                                this.pgens.push(new Oe(e));
                            break;
                        case "inst":
                            for (let t = 0, i = s.size / De.SizeInFile | 0; t < i; t++)
                                this.insts.push(new De(e));
                            break;
                        case "ibag":
                            for (let t = 0, i = s.size / Le.SizeInFile | 0; t < i; t++)
                                this.ibags.push(new Le(e));
                            break;
                        case "imod":
                            for (let t = 0, i = s.size / Ee.SizeInFile | 0; t < i; t++)
                                this.imods.push(new Ee(e));
                            break;
                        case "igen":
                            for (let t = 0, i = s.size / Me.SizeInFile | 0; t < i; t++)
                                this.igens.push(new Me(e));
                            break;
                        case "shdr":
                            for (let t = 0, i = s.size / Ge.SizeInFile | 0; t < i; t++)
                                this.sHdrs.push(new Ge(e));
                            break;
                        default:
                            e.position += s.size
                        }
                else if ("sdta" === i.id)
                    for (; ke.load(i, s, e); )
                        switch (s.id) {
                        case "smpl":
                            t ? n = Ce.readChunkData(s, e) : this.fontSamples = Ce.loadSamples(s, e);
                            break;
                        default:
                            e.position += s.size
                        }
                else
                    e.position += i.size
            }
            const a = new Promise((e => {
                r = e
            }
            ));
            return t ? this.loadCompressedSamples(n, t).then((e => {
                this.fontSamples = e,
                r()
            }
            )) : r(),
            a
        }
        static loadSamples(e, t) {
            let s = e.size / 2 | 0;
            const i = new Float32Array(s);
            let n = 0;
            const r = new Uint8Array(2048)
              , a = new Int16Array(r.length / 2 | 0);
            for (; s > 0; ) {
                let e = Math.min(s, r.length / 2 | 0);
                t.read(r, 0, 2 * e);
                for (let t = 0; t < e; t++)
                    a[t] = r[2 * t + 1] << 8 | r[2 * t],
                    i[n + t] = a[t] / 32767;
                s -= e,
                n += e
            }
            return i
        }
        static readChunkData(e, t) {
            const s = new Uint8Array(e.size);
            return t.read(s, 0, e.size),
            s
        }
        loadCompressedSamples(e, t) {
            const s = []
              , i = [];
            for (const n of this.sHdrs) {
                const r = n.end - n.start;
                if (r > 0) {
                    const a = new Uint8Array(r);
                    for (let t = n.start; t < n.end; ++t)
                        a[t - n.start] = e[t];
                    const o = t(a.buffer).then((e => {
                        s.push({
                            shdr: n,
                            buffer: e
                        })
                    }
                    ));
                    i.push(o)
                } else
                    s.push({
                        shdr: n,
                        buffer: new Float32Array(0)
                    })
            }
            return Promise.all(i).then(( () => {
                let e = 0;
                for (const t of s)
                    e += t.buffer.length;
                const t = new Float32Array(e);
                let i = 0;
                for (const e of s) {
                    const {shdr: s, buffer: n} = e;
                    s.start = i;
                    for (let e = 0; e < n.length; e++,
                    i++)
                        t[i] = n[e];
                    s.end = i,
                    s.startLoop += s.start,
                    s.endLoop += s.start,
                    s.sampleRate = this._sampleRate
                }
                return t
            }
            ))
        }
    }
    class Le {
        constructor(e) {
            this.instGenNdx = te.readUInt16LE(e),
            this.instModNdx = te.readUInt16LE(e)
        }
    }
    Le.SizeInFile = 4;
    class Ee {
        constructor(e) {
            this.modSrcOper = te.readUInt16LE(e),
            this.modDestOper = te.readUInt16LE(e),
            this.modAmount = te.readInt16LE(e),
            this.modAmtSrcOper = te.readUInt16LE(e),
            this.modTransOper = te.readUInt16LE(e)
        }
    }
    Ee.SizeInFile = 10;
    class Me {
        constructor(e) {
            this.genOper = te.readUInt16LE(e),
            this.genAmount = new He(e)
        }
    }
    Me.SizeInFile = 4;
    class De {
        constructor(e) {
            this.instName = te.read8BitStringLength(e, 20),
            this.instBagNdx = te.readUInt16LE(e)
        }
    }
    De.SizeInFile = 22;
    class Re {
        constructor(e) {
            this.genNdx = te.readUInt16LE(e),
            this.modNdx = te.readUInt16LE(e)
        }
    }
    Re.SizeInFile = 4;
    class Oe {
        constructor(e) {
            this.genOper = te.readUInt16LE(e),
            this.genAmount = new He(e)
        }
    }
    Oe.SizeInFile = 4,
    Oe.GenInstrument = 41,
    Oe.GenKeyRange = 43,
    Oe.GenVelRange = 44,
    Oe.GenSampleId = 53;
    class Ie {
        constructor(e) {
            this.presetName = te.read8BitStringLength(e, 20),
            this.preset = te.readUInt16LE(e),
            this.bank = te.readUInt16LE(e),
            this.presetBagNdx = te.readUInt16LE(e),
            this.library = te.readUInt32LE(e),
            this.genre = te.readUInt32LE(e),
            this.morphology = te.readUInt32LE(e)
        }
    }
    Ie.SizeInFile = 38;
    class Ae {
        constructor(e) {
            this.modSrcOper = te.readUInt16LE(e),
            this.modDestOper = te.readUInt16LE(e),
            this.modAmount = te.readUInt16LE(e),
            this.modAmtSrcOper = te.readUInt16LE(e),
            this.modTransOper = te.readUInt16LE(e)
        }
    }
    Ae.SizeInFile = 10;
    class Ge {
        constructor(e) {
            this.sampleName = te.read8BitStringLength(e, 20),
            this.start = te.readUInt32LE(e),
            this.end = te.readUInt32LE(e),
            this.startLoop = te.readUInt32LE(e),
            this.endLoop = te.readUInt32LE(e),
            this.sampleRate = te.readUInt32LE(e),
            this.originalPitch = e.readByte(),
            this.pitchCorrection = te.readSInt8(e),
            this.sampleLink = te.readUInt16LE(e),
            this.sampleType = te.readUInt16LE(e)
        }
    }
    Ge.SizeInFile = 46;
    class He {
        constructor(e) {
            this.wordAmount = te.readUInt16LE(e)
        }
        get shortAmount() {
            return ee.uint16ToInt16(this.wordAmount)
        }
        get lowByteAmount() {
            return 255 & this.wordAmount
        }
        get highByteAmount() {
            return (65280 & this.wordAmount) >> 8 & 255
        }
    }
    class Ve {
        constructor() {
            this.presetIndex = 0,
            this.bank = 0,
            this.pitchWheel = 0,
            this.perNotePitchWheel = new Map,
            this.midiPan = 0,
            this.midiVolume = 0,
            this.midiExpression = 0,
            this.midiRpn = 0,
            this.midiData = 0,
            this.panOffset = 0,
            this.gainDb = 0,
            this.pitchRange = 0,
            this.tuning = 0,
            this.mixVolume = 0,
            this.mute = !1,
            this.solo = !1
        }
    }
    class We {
        constructor() {
            this.activeChannel = 0,
            this.channelList = []
        }
        setupVoice(e, t) {
            const s = this.channelList[this.activeChannel]
              , i = t.region.pan + s.panOffset;
            t.playingChannel = this.activeChannel,
            t.mixVolume = s.mixVolume,
            t.noteGainDb += s.gainDb,
            t.updatePitchRatio(s, e.outSampleRate),
            i <= -.5 ? (t.panFactorLeft = 1,
            t.panFactorRight = 0) : i >= .5 ? (t.panFactorLeft = 0,
            t.panFactorRight = 1) : (t.panFactorLeft = Math.sqrt(.5 - i),
            t.panFactorRight = Math.sqrt(.5 + i))
        }
    }
    !function(e) {
        e[e.None = 0] = "None",
        e[e.Continuous = 1] = "Continuous",
        e[e.Sustain = 2] = "Sustain"
    }(P || (P = {})),
    function(e) {
        e[e.StereoInterleaved = 0] = "StereoInterleaved",
        e[e.StereoUnweaved = 1] = "StereoUnweaved",
        e[e.Mono = 2] = "Mono"
    }(F || (F = {}));
    class ze {
        constructor() {
            this.name = "",
            this.presetNumber = 0,
            this.bank = 0,
            this.regions = null,
            this.fontSamples = null
        }
    }
    class Ue {
        static timecents2Secs(e) {
            return Math.pow(2, e / 1200)
        }
        static decibelsToGain(e) {
            return e > -100 ? Math.pow(10, .05 * e) : 0
        }
        static gainToDecibels(e) {
            return e <= 1e-5 ? -100 : 20 * Math.log10(e)
        }
        static cents2Hertz(e) {
            return 8.176 * Math.pow(2, e / 1200)
        }
        static clamp(e, t, s) {
            return e <= t ? t : e >= s ? s : e
        }
    }
    class Xe {
        constructor(e) {
            this.delay = 0,
            this.attack = 0,
            this.hold = 0,
            this.decay = 0,
            this.sustain = 0,
            this.release = 0,
            this.keynumToHold = 0,
            this.keynumToDecay = 0,
            e && (this.delay = e.delay,
            this.attack = e.attack,
            this.hold = e.hold,
            this.decay = e.decay,
            this.sustain = e.sustain,
            this.release = e.release,
            this.keynumToHold = e.keynumToHold,
            this.keynumToDecay = e.keynumToDecay)
        }
        clear() {
            this.delay = 0,
            this.attack = 0,
            this.hold = 0,
            this.decay = 0,
            this.sustain = 0,
            this.release = 0,
            this.keynumToHold = 0,
            this.keynumToDecay = 0
        }
        envToSecs(e) {
            this.delay = this.delay < -11950 ? 0 : Ue.timecents2Secs(this.delay),
            this.attack = this.attack < -11950 ? 0 : Ue.timecents2Secs(this.attack),
            this.release = this.release < -11950 ? 0 : Ue.timecents2Secs(this.release),
            0 === this.keynumToHold && (this.hold = this.hold < -11950 ? 0 : Ue.timecents2Secs(this.hold)),
            0 === this.keynumToDecay && (this.decay = this.decay < -11950 ? 0 : Ue.timecents2Secs(this.decay)),
            this.sustain < 0 ? this.sustain = 0 : this.sustain = e ? Ue.decibelsToGain(-this.sustain / 10) : 1 - this.sustain / 1e3
        }
    }
    !function(e) {
        e[e.StartAddrsOffset = 0] = "StartAddrsOffset",
        e[e.EndAddrsOffset = 1] = "EndAddrsOffset",
        e[e.StartloopAddrsOffset = 2] = "StartloopAddrsOffset",
        e[e.EndloopAddrsOffset = 3] = "EndloopAddrsOffset",
        e[e.StartAddrsCoarseOffset = 4] = "StartAddrsCoarseOffset",
        e[e.ModLfoToPitch = 5] = "ModLfoToPitch",
        e[e.VibLfoToPitch = 6] = "VibLfoToPitch",
        e[e.ModEnvToPitch = 7] = "ModEnvToPitch",
        e[e.InitialFilterFc = 8] = "InitialFilterFc",
        e[e.InitialFilterQ = 9] = "InitialFilterQ",
        e[e.ModLfoToFilterFc = 10] = "ModLfoToFilterFc",
        e[e.ModEnvToFilterFc = 11] = "ModEnvToFilterFc",
        e[e.EndAddrsCoarseOffset = 12] = "EndAddrsCoarseOffset",
        e[e.ModLfoToVolume = 13] = "ModLfoToVolume",
        e[e.Unused1 = 14] = "Unused1",
        e[e.ChorusEffectsSend = 15] = "ChorusEffectsSend",
        e[e.ReverbEffectsSend = 16] = "ReverbEffectsSend",
        e[e.Pan = 17] = "Pan",
        e[e.Unused2 = 18] = "Unused2",
        e[e.Unused3 = 19] = "Unused3",
        e[e.Unused4 = 20] = "Unused4",
        e[e.DelayModLFO = 21] = "DelayModLFO",
        e[e.FreqModLFO = 22] = "FreqModLFO",
        e[e.DelayVibLFO = 23] = "DelayVibLFO",
        e[e.FreqVibLFO = 24] = "FreqVibLFO",
        e[e.DelayModEnv = 25] = "DelayModEnv",
        e[e.AttackModEnv = 26] = "AttackModEnv",
        e[e.HoldModEnv = 27] = "HoldModEnv",
        e[e.DecayModEnv = 28] = "DecayModEnv",
        e[e.SustainModEnv = 29] = "SustainModEnv",
        e[e.ReleaseModEnv = 30] = "ReleaseModEnv",
        e[e.KeynumToModEnvHold = 31] = "KeynumToModEnvHold",
        e[e.KeynumToModEnvDecay = 32] = "KeynumToModEnvDecay",
        e[e.DelayVolEnv = 33] = "DelayVolEnv",
        e[e.AttackVolEnv = 34] = "AttackVolEnv",
        e[e.HoldVolEnv = 35] = "HoldVolEnv",
        e[e.DecayVolEnv = 36] = "DecayVolEnv",
        e[e.SustainVolEnv = 37] = "SustainVolEnv",
        e[e.ReleaseVolEnv = 38] = "ReleaseVolEnv",
        e[e.KeynumToVolEnvHold = 39] = "KeynumToVolEnvHold",
        e[e.KeynumToVolEnvDecay = 40] = "KeynumToVolEnvDecay",
        e[e.Instrument = 41] = "Instrument",
        e[e.Reserved1 = 42] = "Reserved1",
        e[e.KeyRange = 43] = "KeyRange",
        e[e.VelRange = 44] = "VelRange",
        e[e.StartloopAddrsCoarseOffset = 45] = "StartloopAddrsCoarseOffset",
        e[e.Keynum = 46] = "Keynum",
        e[e.Velocity = 47] = "Velocity",
        e[e.InitialAttenuation = 48] = "InitialAttenuation",
        e[e.Reserved2 = 49] = "Reserved2",
        e[e.EndloopAddrsCoarseOffset = 50] = "EndloopAddrsCoarseOffset",
        e[e.CoarseTune = 51] = "CoarseTune",
        e[e.FineTune = 52] = "FineTune",
        e[e.SampleID = 53] = "SampleID",
        e[e.SampleModes = 54] = "SampleModes",
        e[e.Reserved3 = 55] = "Reserved3",
        e[e.ScaleTuning = 56] = "ScaleTuning",
        e[e.ExclusiveClass = 57] = "ExclusiveClass",
        e[e.OverridingRootKey = 58] = "OverridingRootKey",
        e[e.Unused5 = 59] = "Unused5",
        e[e.EndOper = 60] = "EndOper"
    }(C || (C = {}));
    class Ye {
        constructor(e) {
            this.loopMode = P.None,
            this.sampleRate = 0,
            this.loKey = 0,
            this.hiKey = 0,
            this.loVel = 0,
            this.hiVel = 0,
            this.group = 0,
            this.offset = 0,
            this.end = 0,
            this.loopStart = 0,
            this.loopEnd = 0,
            this.transpose = 0,
            this.tune = 0,
            this.pitchKeyCenter = 0,
            this.pitchKeyTrack = 0,
            this.attenuation = 0,
            this.pan = 0,
            this.ampEnv = new Xe,
            this.modEnv = new Xe,
            this.initialFilterQ = 0,
            this.initialFilterFc = 0,
            this.modEnvToPitch = 0,
            this.modEnvToFilterFc = 0,
            this.modLfoToFilterFc = 0,
            this.modLfoToVolume = 0,
            this.delayModLFO = 0,
            this.freqModLFO = 0,
            this.modLfoToPitch = 0,
            this.delayVibLFO = 0,
            this.freqVibLFO = 0,
            this.vibLfoToPitch = 0,
            e && (this.loopMode = e.loopMode,
            this.sampleRate = e.sampleRate,
            this.loKey = e.loKey,
            this.hiKey = e.hiKey,
            this.loVel = e.loVel,
            this.hiVel = e.hiVel,
            this.group = e.group,
            this.offset = e.offset,
            this.end = e.end,
            this.loopStart = e.loopStart,
            this.loopEnd = e.loopEnd,
            this.transpose = e.transpose,
            this.tune = e.tune,
            this.pitchKeyCenter = e.pitchKeyCenter,
            this.pitchKeyTrack = e.pitchKeyTrack,
            this.attenuation = e.attenuation,
            this.pan = e.pan,
            this.ampEnv = new Xe(e.ampEnv),
            this.modEnv = new Xe(e.modEnv),
            this.initialFilterQ = e.initialFilterQ,
            this.initialFilterFc = e.initialFilterFc,
            this.modEnvToPitch = e.modEnvToPitch,
            this.modEnvToFilterFc = e.modEnvToFilterFc,
            this.modLfoToFilterFc = e.modLfoToFilterFc,
            this.modLfoToVolume = e.modLfoToVolume,
            this.delayModLFO = e.delayModLFO,
            this.freqModLFO = e.freqModLFO,
            this.modLfoToPitch = e.modLfoToPitch,
            this.delayVibLFO = e.delayVibLFO,
            this.freqVibLFO = e.freqVibLFO,
            this.vibLfoToPitch = e.vibLfoToPitch)
        }
        clear(e) {
            this.loopMode = P.None,
            this.sampleRate = 0,
            this.loKey = 0,
            this.hiKey = 0,
            this.loVel = 0,
            this.hiVel = 0,
            this.group = 0,
            this.offset = 0,
            this.end = 0,
            this.loopStart = 0,
            this.loopEnd = 0,
            this.transpose = 0,
            this.tune = 0,
            this.pitchKeyCenter = 0,
            this.pitchKeyTrack = 0,
            this.attenuation = 0,
            this.pan = 0,
            this.ampEnv.clear(),
            this.modEnv.clear(),
            this.initialFilterQ = 0,
            this.initialFilterFc = 0,
            this.modEnvToPitch = 0,
            this.modEnvToFilterFc = 0,
            this.modLfoToFilterFc = 0,
            this.modLfoToVolume = 0,
            this.delayModLFO = 0,
            this.freqModLFO = 0,
            this.modLfoToPitch = 0,
            this.delayVibLFO = 0,
            this.freqVibLFO = 0,
            this.vibLfoToPitch = 0,
            this.hiKey = 127,
            this.hiVel = 127,
            this.pitchKeyCenter = 60,
            e || (this.pitchKeyTrack = 100,
            this.pitchKeyCenter = -1,
            this.ampEnv.delay = -12e3,
            this.ampEnv.attack = -12e3,
            this.ampEnv.hold = -12e3,
            this.ampEnv.decay = -12e3,
            this.ampEnv.release = -12e3,
            this.modEnv.delay = -12e3,
            this.modEnv.attack = -12e3,
            this.modEnv.hold = -12e3,
            this.modEnv.decay = -12e3,
            this.modEnv.release = -12e3,
            this.initialFilterFc = 13500,
            this.delayModLFO = -12e3,
            this.delayVibLFO = -12e3)
        }
        operator(e, t) {
            switch (e) {
            case C.StartAddrsOffset:
                this.offset += ee.int16ToUint32(t.shortAmount);
                break;
            case C.EndAddrsOffset:
                this.end += ee.int16ToUint32(t.shortAmount);
                break;
            case C.StartloopAddrsOffset:
                this.loopStart += ee.int16ToUint32(t.shortAmount);
                break;
            case C.EndloopAddrsOffset:
                this.loopEnd += ee.int16ToUint32(t.shortAmount);
                break;
            case C.StartAddrsCoarseOffset:
                this.offset += 32768 * ee.int16ToUint32(t.shortAmount);
                break;
            case C.ModLfoToPitch:
                this.modLfoToPitch = t.shortAmount;
                break;
            case C.VibLfoToPitch:
                this.vibLfoToPitch = t.shortAmount;
                break;
            case C.ModEnvToPitch:
                this.modEnvToPitch = t.shortAmount;
                break;
            case C.InitialFilterFc:
                this.initialFilterFc = t.shortAmount;
                break;
            case C.InitialFilterQ:
                this.initialFilterQ = t.shortAmount;
                break;
            case C.ModLfoToFilterFc:
                this.modLfoToFilterFc = t.shortAmount;
                break;
            case C.ModEnvToFilterFc:
                this.modEnvToFilterFc = t.shortAmount;
                break;
            case C.EndAddrsCoarseOffset:
                this.end += 32768 * ee.int16ToUint32(t.shortAmount);
                break;
            case C.ModLfoToVolume:
                this.modLfoToVolume = t.shortAmount;
                break;
            case C.Pan:
                this.pan = t.shortAmount / 1e3;
                break;
            case C.DelayModLFO:
                this.delayModLFO = t.shortAmount;
                break;
            case C.FreqModLFO:
                this.freqModLFO = t.shortAmount;
                break;
            case C.DelayVibLFO:
                this.delayVibLFO = t.shortAmount;
                break;
            case C.FreqVibLFO:
                this.freqVibLFO = t.shortAmount;
                break;
            case C.DelayModEnv:
                this.modEnv.delay = t.shortAmount;
                break;
            case C.AttackModEnv:
                this.modEnv.attack = t.shortAmount;
                break;
            case C.HoldModEnv:
                this.modEnv.hold = t.shortAmount;
                break;
            case C.DecayModEnv:
                this.modEnv.decay = t.shortAmount;
                break;
            case C.SustainModEnv:
                this.modEnv.sustain = t.shortAmount;
                break;
            case C.ReleaseModEnv:
                this.modEnv.release = t.shortAmount;
                break;
            case C.KeynumToModEnvHold:
                this.modEnv.keynumToHold = t.shortAmount;
                break;
            case C.KeynumToModEnvDecay:
                this.modEnv.keynumToDecay = t.shortAmount;
                break;
            case C.DelayVolEnv:
                this.ampEnv.delay = t.shortAmount;
                break;
            case C.AttackVolEnv:
                this.ampEnv.attack = t.shortAmount;
                break;
            case C.HoldVolEnv:
                this.ampEnv.hold = t.shortAmount;
                break;
            case C.DecayVolEnv:
                this.ampEnv.decay = t.shortAmount;
                break;
            case C.SustainVolEnv:
                this.ampEnv.sustain = t.shortAmount;
                break;
            case C.ReleaseVolEnv:
                this.ampEnv.release = t.shortAmount;
                break;
            case C.KeynumToVolEnvHold:
                this.ampEnv.keynumToHold = t.shortAmount;
                break;
            case C.KeynumToVolEnvDecay:
                this.ampEnv.keynumToDecay = t.shortAmount;
                break;
            case C.KeyRange:
                this.loKey = t.lowByteAmount,
                this.hiKey = t.highByteAmount;
                break;
            case C.VelRange:
                this.loVel = t.lowByteAmount,
                this.hiVel = t.highByteAmount;
                break;
            case C.StartloopAddrsCoarseOffset:
                this.loopStart += 32768 * ee.int16ToUint32(t.shortAmount);
                break;
            case C.InitialAttenuation:
                this.attenuation += .1 * t.shortAmount;
                break;
            case C.EndloopAddrsCoarseOffset:
                this.loopEnd += 32768 * ee.int16ToUint32(t.shortAmount);
                break;
            case C.CoarseTune:
                this.transpose += t.shortAmount;
                break;
            case C.FineTune:
                this.tune += t.shortAmount;
                break;
            case C.SampleModes:
                this.loopMode = 3 == (3 & t.wordAmount) ? P.Sustain : 1 == (3 & t.wordAmount) ? P.Continuous : P.None;
                break;
            case C.ScaleTuning:
                this.pitchKeyTrack = t.shortAmount;
                break;
            case C.ExclusiveClass:
                this.group = t.wordAmount;
                break;
            case C.OverridingRootKey:
                this.pitchKeyCenter = t.shortAmount
            }
        }
    }
    !function(e) {
        e[e.None = 0] = "None",
        e[e.Delay = 1] = "Delay",
        e[e.Attack = 2] = "Attack",
        e[e.Hold = 3] = "Hold",
        e[e.Decay = 4] = "Decay",
        e[e.Sustain = 5] = "Sustain",
        e[e.Release = 6] = "Release",
        e[e.Done = 7] = "Done"
    }(L || (L = {}));
    class Je {
        constructor() {
            this.level = 0,
            this.slope = 0,
            this.samplesUntilNextSegment = 0,
            this.segment = L.None,
            this.midiVelocity = 0,
            this.parameters = null,
            this.segmentIsExponential = !1,
            this.isAmpEnv = !1
        }
        nextSegment(e, t) {
            if (this.parameters)
                for (; ; )
                    switch (e) {
                    case L.None:
                        if (this.samplesUntilNextSegment = this.parameters.delay * t | 0,
                        this.samplesUntilNextSegment > 0)
                            return this.segment = L.Delay,
                            this.segmentIsExponential = !1,
                            this.level = 0,
                            void (this.slope = 0);
                        e = L.Delay;
                        break;
                    case L.Delay:
                        if (this.samplesUntilNextSegment = this.parameters.attack * t | 0,
                        this.samplesUntilNextSegment > 0)
                            return this.isAmpEnv || (this.samplesUntilNextSegment = this.parameters.attack * ((145 - this.midiVelocity) / 144) * t | 0),
                            this.segment = L.Attack,
                            this.segmentIsExponential = !1,
                            this.level = 0,
                            void (this.slope = 1 / this.samplesUntilNextSegment);
                        e = L.Attack;
                        break;
                    case L.Attack:
                        if (this.samplesUntilNextSegment = this.parameters.hold * t | 0,
                        this.samplesUntilNextSegment > 0)
                            return this.segment = L.Hold,
                            this.segmentIsExponential = !1,
                            this.level = 1,
                            void (this.slope = 0);
                        e = L.Hold;
                        break;
                    case L.Hold:
                        if (this.samplesUntilNextSegment = this.parameters.decay * t | 0,
                        this.samplesUntilNextSegment > 0) {
                            if (this.segment = L.Decay,
                            this.level = 1,
                            this.isAmpEnv) {
                                let e = -9.226 / this.samplesUntilNextSegment;
                                this.slope = Math.exp(e),
                                this.segmentIsExponential = !0,
                                this.parameters.sustain > 0 && (this.samplesUntilNextSegment = Math.log(this.parameters.sustain) / e | 0)
                            } else
                                this.slope = -1 / this.samplesUntilNextSegment,
                                this.samplesUntilNextSegment = this.parameters.decay * (1 - this.parameters.sustain) * t | 0,
                                this.segmentIsExponential = !1;
                            return
                        }
                        e = L.Decay;
                        break;
                    case L.Decay:
                        return this.segment = L.Sustain,
                        this.level = this.parameters.sustain,
                        this.slope = 0,
                        this.samplesUntilNextSegment = 2147483647,
                        void (this.segmentIsExponential = !1);
                    case L.Sustain:
                        if (this.segment = L.Release,
                        this.samplesUntilNextSegment = (this.parameters.release <= 0 ? Je.FastReleaseTime : this.parameters.release) * t | 0,
                        this.isAmpEnv) {
                            let e = -9.226 / this.samplesUntilNextSegment;
                            this.slope = Math.exp(e),
                            this.segmentIsExponential = !0
                        } else
                            this.slope = -this.level / this.samplesUntilNextSegment,
                            this.segmentIsExponential = !1;
                        return;
                    default:
                        return this.segment = L.Done,
                        this.segmentIsExponential = !1,
                        this.level = 0,
                        this.slope = 0,
                        void (this.samplesUntilNextSegment = 134217727)
                    }
        }
        setup(e, t, s, i, n) {
            this.parameters = new Xe(e),
            this.parameters.keynumToHold > 0 && (this.parameters.hold += this.parameters.keynumToHold * (60 - t),
            this.parameters.hold = this.parameters.hold < -1e4 ? 0 : Ue.timecents2Secs(this.parameters.hold)),
            this.parameters.keynumToDecay > 0 && (this.parameters.decay += this.parameters.keynumToDecay * (60 - t),
            this.parameters.decay = this.parameters.decay < -1e4 ? 0 : Ue.timecents2Secs(this.parameters.decay)),
            this.midiVelocity = 0 | s,
            this.isAmpEnv = i,
            this.nextSegment(L.None, n)
        }
        process(e, t) {
            this.slope > 0 && (this.segmentIsExponential ? this.level *= Math.pow(this.slope, e) : this.level += this.slope * e),
            this.samplesUntilNextSegment -= e,
            this.samplesUntilNextSegment <= 0 && this.nextSegment(this.segment, t)
        }
    }
    Je.FastReleaseTime = .01;
    class qe {
        constructor() {
            this.samplesUntil = 0,
            this.level = 0,
            this.delta = 0
        }
        setup(e, t, s) {
            this.samplesUntil = e * s | 0,
            this.delta = 4 * Ue.cents2Hertz(t) / s,
            this.level = 0
        }
        process(e) {
            this.samplesUntil > e ? this.samplesUntil -= e : (this.level += this.delta * e,
            this.level > 1 ? (this.delta = -this.delta,
            this.level = 2 - this.level) : this.level < -1 && (this.delta = -this.delta,
            this.level = -2 - this.level))
        }
    }
    class Qe {
        constructor(e) {
            this.qInv = 0,
            this.a0 = 0,
            this.a1 = 0,
            this.b1 = 0,
            this.b2 = 0,
            this.z1 = 0,
            this.z2 = 0,
            this.active = !1,
            e && (this.qInv = e.qInv,
            this.a0 = e.a0,
            this.a1 = e.a1,
            this.b1 = e.b1,
            this.b2 = e.b2,
            this.z1 = e.z1,
            this.z2 = e.z2,
            this.active = e.active)
        }
        setup(e) {
            let t = Math.tan(Math.PI * e)
              , s = t * t
              , i = 1 / (1 + t * this.qInv + s);
            this.a0 = s * i,
            this.a1 = 2 * this.a0,
            this.b1 = 2 * (s - 1) * i,
            this.b2 = (1 - t * this.qInv + s) * i
        }
        process(e) {
            let t = e * this.a0 + this.z1;
            return this.z1 = e * this.a1 + this.z2 - this.b1 * t,
            this.z2 = e * this.a0 - this.b2 * t,
            t
        }
    }
    class $e {
        constructor() {
            this.playingPreset = 0,
            this.playingKey = 0,
            this.playingChannel = 0,
            this.region = null,
            this.pitchInputTimecents = 0,
            this.pitchOutputFactor = 0,
            this.sourceSamplePosition = 0,
            this.noteGainDb = 0,
            this.panFactorLeft = 0,
            this.panFactorRight = 0,
            this.playIndex = 0,
            this.loopStart = 0,
            this.loopEnd = 0,
            this.ampEnv = new Je,
            this.modEnv = new Je,
            this.lowPass = new Qe,
            this.modLfo = new qe,
            this.vibLfo = new qe,
            this.mixVolume = 0,
            this.mute = !1
        }
        updatePitchRatio(e, t) {
            let s = e.pitchWheel;
            e.perNotePitchWheel.has(this.playingKey) && (s += e.perNotePitchWheel.get(this.playingKey) - 8192);
            const i = 8192 === s ? e.tuning : s / 16383 * e.pitchRange * 2 - e.pitchRange + e.tuning;
            this.calcPitchRatio(i, t)
        }
        calcPitchRatio(e, t) {
            if (!this.region)
                return;
            const s = this.playingKey + this.region.transpose + this.region.tune / 100;
            let i = this.region.pitchKeyCenter + (s - this.region.pitchKeyCenter) * (this.region.pitchKeyTrack / 100);
            0 !== e && (i += e),
            this.pitchInputTimecents = 100 * i,
            this.pitchOutputFactor = this.region.sampleRate / (Ue.timecents2Secs(100 * this.region.pitchKeyCenter) * t)
        }
        end(e) {
            this.region && (this.ampEnv.nextSegment(L.Sustain, e),
            this.modEnv.nextSegment(L.Sustain, e),
            this.region.loopMode === P.Sustain && (this.loopEnd = this.loopStart))
        }
        endQuick(e) {
            this.ampEnv.parameters.release = 0,
            this.ampEnv.nextSegment(L.Sustain, e),
            this.modEnv.parameters.release = 0,
            this.modEnv.nextSegment(L.Sustain, e)
        }
        render(e, t, s, i, n) {
            if (!this.region)
                return;
            let r = this.region;
            let a = e.presets[this.playingPreset].fontSamples
              , o = 0
              , h = e.outputMode === F.StereoUnweaved ? i : -1
              , l = 0 !== r.modEnvToPitch || 0 !== r.modEnvToFilterFc
              , c = this.modLfo.delta > 0 && (0 !== r.modLfoToPitch || 0 !== r.modLfoToFilterFc || 0 !== r.modLfoToVolume)
              , d = this.vibLfo.delta > 0 && 0 !== r.vibLfoToPitch
              , u = this.loopStart < this.loopEnd
              , p = this.loopStart
              , g = this.loopEnd
              , f = r.end
              , m = g + 1
              , y = this.sourceSamplePosition
              , b = new Qe(this.lowPass)
              , S = 0 !== r.modLfoToFilterFc || 0 !== r.modEnvToFilterFc
              , w = 0
              , _ = 0
              , B = 0
              , T = 0
              , N = 0 !== r.modLfoToPitch || 0 !== r.modEnvToPitch || 0 !== r.vibLfoToPitch
              , v = 0
              , x = 0
              , k = 0
              , P = 0
              , C = 0 !== r.modLfoToVolume
              , E = 0
              , M = 0;
            for (S ? (w = e.outSampleRate,
            _ = r.initialFilterFc,
            B = r.modLfoToFilterFc,
            T = r.modEnvToFilterFc) : (w = 0,
            _ = 0,
            B = 0,
            T = 0),
            N ? (v = 0,
            x = r.modLfoToPitch,
            k = r.vibLfoToPitch,
            P = r.modEnvToPitch) : (v = Ue.timecents2Secs(this.pitchInputTimecents) * this.pitchOutputFactor,
            x = 0,
            k = 0,
            P = 0),
            C ? M = .1 * r.modLfoToVolume : (E = Ue.decibelsToGain(this.noteGainDb),
            M = 0); i > 0; ) {
                let r, D, R = 0, O = i > $e.RenderEffectSampleBlock ? $e.RenderEffectSampleBlock : i;
                if (i -= O,
                S) {
                    let e = _ + this.modLfo.level * B + this.modEnv.level * T;
                    b.active = e <= 13500,
                    b.active && b.setup(Ue.cents2Hertz(e) / w)
                }
                switch (N && (v = Ue.timecents2Secs(this.pitchInputTimecents + (this.modLfo.level * x + this.vibLfo.level * k + this.modEnv.level * P)) * this.pitchOutputFactor),
                C && (E = Ue.decibelsToGain(this.noteGainDb + this.modLfo.level * M)),
                r = E * this.ampEnv.level,
                n ? r = 0 : r *= this.mixVolume,
                this.ampEnv.process(O, e.outSampleRate),
                l && this.modEnv.process(O, e.outSampleRate),
                c && this.modLfo.process(O),
                d && this.vibLfo.process(O),
                e.outputMode) {
                case F.StereoInterleaved:
                    for (D = r * this.panFactorLeft,
                    R = r * this.panFactorRight; O-- > 0 && y < f; ) {
                        let e = 0 | y
                          , i = e >= g && u ? p : e + 1
                          , n = y - e
                          , r = a[e] * (1 - n) + a[i] * n;
                        b.active && (r = b.process(r)),
                        t[s + o] += r * D,
                        o++,
                        t[s + o] += r * R,
                        o++,
                        y += v,
                        y >= m && u && (y -= g - p + 1)
                    }
                    break;
                case F.StereoUnweaved:
                    for (D = r * this.panFactorLeft,
                    R = r * this.panFactorRight; O-- > 0 && y < f; ) {
                        let e = 0 | y
                          , i = e >= g && u ? p : e + 1
                          , n = y - e
                          , r = a[e] * (1 - n) + a[i] * n;
                        b.active && (r = b.process(r)),
                        t[s + o] += r * D,
                        o++,
                        t[s + h] += r * R,
                        h++,
                        y += v,
                        y >= m && u && (y -= g - p + 1)
                    }
                    break;
                case F.Mono:
                    for (; O-- > 0 && y < f; ) {
                        let e = 0 | y
                          , i = e >= g && u ? p : e + 1
                          , n = y - e
                          , h = a[e] * (1 - n) + a[i] * n;
                        b.active && (h = b.process(h)),
                        t[s + o] = h * r,
                        o++,
                        y += v,
                        y >= m && u && (y -= g - p + 1)
                    }
                }
                if (y >= f || this.ampEnv.segment === L.Done)
                    return void this.kill()
            }
            this.sourceSamplePosition = y,
            (b.active || S) && (this.lowPass = b)
        }
        kill() {
            this.playingPreset = -1
        }
    }
    $e.RenderEffectSampleBlock = he.MicroBufferSize;
    class Ke {
        constructor() {
            this._items = [],
            this._position = 0,
            this.isEmpty = !0
        }
        clear() {
            this._items = [],
            this._position = 0,
            this.isEmpty = !0
        }
        enqueue(e) {
            this.isEmpty = !1,
            this._items.push(e)
        }
        peek() {
            return this._items[this._position]
        }
        dequeue() {
            const e = this._items[this._position];
            return this._position++,
            this._position >= this._items.length / 2 && (this._items = this._items.slice(this._position),
            this._position = 0),
            this.isEmpty = 0 == this._items.length,
            e
        }
        toArray() {
            const e = this._items.slice(this._position);
            return e.reverse(),
            e
        }
    }
    class je {
        constructor(e) {
            this._midiEventQueue = new Ke,
            this._mutedChannels = new Map,
            this._soloChannels = new Map,
            this._isAnySolo = !1,
            this.currentTempo = 0,
            this.timeSignatureNumerator = 0,
            this.timeSignatureDenominator = 0,
            this.presets = null,
            this._voices = [],
            this._channels = null,
            this._voicePlayIndex = 0,
            this.outputMode = F.StereoInterleaved,
            this.outSampleRate = 0,
            this.globalGainDb = 0,
            this.outSampleRate = e
        }
        synthesize(e, t, s) {
            return this.fillWorkingBuffer(e, t, s)
        }
        synthesizeSilent(e) {
            this.fillWorkingBuffer(null, 0, e)
        }
        channelGetMixVolume(e) {
            return this._channels && e < this._channels.channelList.length ? this._channels.channelList[e].mixVolume : 1
        }
        channelSetMixVolume(e, t) {
            let s = this.channelInit(e);
            for (let s of this._voices)
                s.playingChannel === e && -1 !== s.playingPreset && (s.mixVolume = t);
            s.mixVolume = t
        }
        channelSetMute(e, t) {
            t ? this._mutedChannels.set(e, !0) : this._mutedChannels.delete(e)
        }
        channelSetSolo(e, t) {
            t ? this._soloChannels.set(e, !0) : this._soloChannels.delete(e),
            this._isAnySolo = this._soloChannels.size > 0
        }
        resetChannelStates() {
            this._mutedChannels = new Map,
            this._soloChannels = new Map,
            this._isAnySolo = !1
        }
        dispatchEvent(e) {
            this._midiEventQueue.enqueue(e)
        }
        fillWorkingBuffer(e, t, s) {
            const i = this._isAnySolo
              , n = [];
            for (; !this._midiEventQueue.isEmpty; ) {
                let e = this._midiEventQueue.dequeue();
                e.isMetronome && this.metronomeVolume > 0 ? (this.channelNoteOff(he.MetronomeChannel, 33),
                this.channelNoteOn(he.MetronomeChannel, 33, 95 / 127)) : e.event && this.processMidiMessage(e.event),
                n.push(e)
            }
            for (const n of this._voices)
                if (-1 !== n.playingPreset) {
                    const r = n.playingChannel
                      , a = this._mutedChannels.has(r) || i && r != he.MetronomeChannel && !this._soloChannels.has(r);
                    e ? n.render(this, e, t, s, a) : n.kill()
                }
            return n
        }
        processMidiMessage(e) {
            _e.debug("Midi", "Processing midi " + e.command);
            const i = e.command
              , n = e.channel
              , r = e.data1
              , a = e.data2;
            switch (i) {
            case t.NoteOff:
                this.channelNoteOff(n, r, !!a);
                break;
            case t.NoteOn:
                this.channelNoteOn(n, r, a / 127);
                break;
            case t.NoteAftertouch:
                break;
            case t.Controller:
                this.channelMidiControl(n, r, a);
                break;
            case t.ProgramChange:
                this.channelSetPresetNumber(n, r, 9 === n);
                break;
            case t.ChannelAftertouch:
                break;
            case t.PitchBend:
                this.channelSetPitchWheel(n, r | a << 7);
                break;
            case t.PerNotePitchBend:
                const i = e;
                let o = i.pitch;
                o = o * he.MaxPitchWheel / he.MaxPitchWheel20,
                this.channelSetPerNotePitchWheel(n, i.noteKey, o);
                break;
            case t.Meta:
                switch (e.data1) {
                case s.Tempo:
                    this.currentTempo = 6e7 / e.value;
                    break;
                case s.TimeSignature:
                    this.timeSignatureNumerator = e.data[0],
                    this.timeSignatureDenominator = Math.pow(2, e.data[1])
                }
            }
        }
        get metronomeVolume() {
            return this.channelGetMixVolume(he.MetronomeChannel)
        }
        set metronomeVolume(e) {
            this.setupMetronomeChannel(e)
        }
        setupMetronomeChannel(e) {
            this.channelSetMixVolume(he.MetronomeChannel, e),
            e > 0 && (this.channelSetVolume(he.MetronomeChannel, 1),
            this.channelSetPresetNumber(he.MetronomeChannel, 0, !0))
        }
        get masterVolume() {
            return Ue.decibelsToGain(this.globalGainDb)
        }
        set masterVolume(e) {
            var t = Ue.gainToDecibels(e);
            const s = t - this.globalGainDb;
            if (0 !== s) {
                for (const e of this._voices)
                    -1 !== e.playingPreset && (e.noteGainDb += s);
                this.globalGainDb = t
            }
        }
        resetSoft() {
            for (const e of this._voices)
                -1 !== e.playingPreset && (e.ampEnv.segment < L.Release || 0 !== e.ampEnv.parameters.release) && e.endQuick(this.outSampleRate);
            if (this._channels)
                for (const e of this._channels.channelList)
                    e.presetIndex = 0,
                    e.bank = 0,
                    e.pitchWheel = 8192,
                    e.midiPan = 8192,
                    e.perNotePitchWheel.clear(),
                    e.midiVolume = 16383,
                    e.midiExpression = 16383,
                    e.midiRpn = 65535,
                    e.midiData = 0,
                    e.panOffset = 0,
                    e.gainDb = 0,
                    e.pitchRange = 2,
                    e.tuning = 0
        }
        get presetCount() {
            var e, t;
            return null !== (t = null === (e = this.presets) || void 0 === e ? void 0 : e.length) && void 0 !== t ? t : 0
        }
        reset() {
            for (let e of this._voices)
                -1 !== e.playingPreset && (e.ampEnv.segment < L.Release || 0 !== e.ampEnv.parameters.release) && e.endQuick(this.outSampleRate);
            this._channels = null
        }
        setOutput(e, t, s) {
            this.outputMode = e,
            this.outSampleRate = t >= 1 ? t : 44100,
            this.globalGainDb = s
        }
        noteOn(e, t, s) {
            if (!this.presets)
                return;
            const i = 127 * s | 0;
            if (e < 0 || e >= this.presets.length)
                return;
            if (s <= 0)
                return void this.noteOff(e, t);
            const n = this._voicePlayIndex++;
            for (const r of this.presets[e].regions) {
                if (t < r.loKey || t > r.hiKey || i < r.loVel || i > r.hiVel)
                    continue;
                let a = null;
                if (0 !== r.group)
                    for (const t of this._voices)
                        t.playingPreset === e && t.region.group === r.group ? t.endQuick(this.outSampleRate) : -1 !== t.playingPreset || a || (a = t);
                else
                    for (let e of this._voices)
                        -1 === e.playingPreset && (a = e);
                if (!a) {
                    for (let e = 0; e < 4; e++) {
                        const e = new $e;
                        e.playingPreset = -1,
                        this._voices.push(e)
                    }
                    a = this._voices[this._voices.length - 4]
                }
                a.region = r,
                a.playingPreset = e,
                a.playingKey = t,
                a.playIndex = n,
                a.noteGainDb = this.globalGainDb - r.attenuation - Ue.gainToDecibels(1 / s),
                this._channels ? this._channels.setupVoice(this, a) : (a.calcPitchRatio(0, this.outSampleRate),
                a.panFactorLeft = Math.sqrt(.5 - r.pan),
                a.panFactorRight = Math.sqrt(.5 + r.pan)),
                a.sourceSamplePosition = r.offset;
                const o = r.loopMode !== P.None && r.loopStart < r.loopEnd;
                a.loopStart = o ? r.loopStart : 0,
                a.loopEnd = o ? r.loopEnd : 0,
                a.ampEnv.setup(r.ampEnv, t, i, !0, this.outSampleRate),
                a.modEnv.setup(r.modEnv, t, i, !1, this.outSampleRate);
                const h = r.initialFilterQ / 10;
                a.lowPass.qInv = 1 / Math.pow(10, h / 20),
                a.lowPass.z1 = 0,
                a.lowPass.z2 = 0,
                a.lowPass.active = r.initialFilterFc <= 13500,
                a.lowPass.active && a.lowPass.setup(Ue.cents2Hertz(r.initialFilterFc) / this.outSampleRate),
                a.modLfo.setup(r.delayModLFO, r.freqModLFO, this.outSampleRate),
                a.vibLfo.setup(r.delayVibLFO, r.freqVibLFO, this.outSampleRate)
            }
        }
        bankNoteOn(e, t, s, i) {
            let n = this.getPresetIndex(e, t);
            return -1 !== n && (this.noteOn(n, s, i),
            !0)
        }
        noteOff(e, t) {
            let s = null
              , i = null
              , n = [];
            for (let r of this._voices)
                r.playingPreset !== e || r.playingKey !== t || r.ampEnv.segment >= L.Release || (!s || r.playIndex < s.playIndex ? (s = r,
                i = r,
                n.push(r)) : r.playIndex === s.playIndex && (i = r,
                n.push(r)));
            if (s)
                for (const r of n)
                    r !== s && r !== i && (r.playIndex !== s.playIndex || r.playingPreset !== e || r.playingKey !== t || r.ampEnv.segment >= L.Release) || r.end(this.outSampleRate)
        }
        bankNoteOff(e, t, s) {
            const i = this.getPresetIndex(e, t);
            return -1 !== i && (this.noteOff(i, s),
            !0)
        }
        noteOffAll(e) {
            for (const t of this._voices)
                -1 !== t.playingPreset && t.ampEnv.segment < L.Release && (e ? t.endQuick(this.outSampleRate) : t.end(this.outSampleRate))
        }
        get activeVoiceCount() {
            let e = 0;
            for (const t of this._voices)
                -1 !== t.playingPreset && e++;
            return e
        }
        channelInit(e) {
            if (this._channels && e < this._channels.channelList.length)
                return this._channels.channelList[e];
            this._channels || (this._channels = new We);
            for (let t = this._channels.channelList.length; t <= e; t++) {
                let e = new Ve;
                e.presetIndex = 0,
                e.bank = 0,
                e.pitchWheel = 8192,
                e.midiPan = 8192,
                e.midiVolume = 16383,
                e.midiExpression = 16383,
                e.midiRpn = 65535,
                e.midiData = 0,
                e.panOffset = 0,
                e.gainDb = 0,
                e.pitchRange = 2,
                e.tuning = 0,
                e.mixVolume = 1,
                this._channels.channelList.push(e)
            }
            return this._channels.channelList[e]
        }
        getPresetIndex(e, t) {
            if (!this.presets)
                return -1;
            for (let s = this.presets.length - 1; s >= 0; s--) {
                let i = this.presets[s];
                if (i.presetNumber === t && i.bank === e)
                    return s
            }
            return -1
        }
        getPresetName(e) {
            return this.presets ? e < 0 || e >= this.presets.length ? null : this.presets[e].name : null
        }
        bankGetPresetName(e, t) {
            return this.getPresetName(this.getPresetIndex(e, t))
        }
        channelNoteOn(e, t, s) {
            !this._channels || e > this._channels.channelList.length || (this._channels.activeChannel = e,
            this.noteOn(this._channels.channelList[e].presetIndex, t, s))
        }
        channelNoteOff(e, t, s=!1) {
            const i = [];
            let n = null
              , r = null;
            for (const s of this._voices)
                -1 === s.playingPreset || s.playingChannel !== e || s.playingKey !== t || s.ampEnv.segment >= L.Release || (!n || s.playIndex < n.playIndex ? (n = s,
                r = s,
                i.push(s)) : s.playIndex === n.playIndex && (r = s,
                i.push(s)));
            if (this.channelInit(e).perNotePitchWheel.delete(t),
            n)
                for (const a of i)
                    a !== n && a !== r && (a.playIndex !== n.playIndex || -1 === a.playingPreset || a.playingChannel !== e || a.playingKey !== t || a.ampEnv.segment >= L.Release) || (s ? a.endQuick(this.outSampleRate) : a.end(this.outSampleRate))
        }
        channelNoteOffAll(e) {
            this.channelInit(e).perNotePitchWheel.clear();
            for (const t of this._voices)
                -1 !== t.playingPreset && t.playingChannel === e && t.ampEnv.segment < L.Release && t.end(this.outSampleRate)
        }
        channelSoundsOffAll(e) {
            this.channelInit(e).perNotePitchWheel.clear();
            for (let t of this._voices)
                -1 !== t.playingPreset && t.playingChannel === e && (t.ampEnv.segment < L.Release || 0 === t.ampEnv.parameters.release) && t.endQuick(this.outSampleRate)
        }
        channelSetPresetIndex(e, t) {
            this.channelInit(e).presetIndex = ee.int32ToUint16(t)
        }
        channelSetPresetNumber(e, t, s=!1) {
            const i = this.channelInit(e);
            let n = 0;
            return s ? (n = this.getPresetIndex(128 | 32767 & i.bank, t),
            -1 === n && (n = this.getPresetIndex(128, t)),
            -1 === n && (n = this.getPresetIndex(128, 0)),
            -1 === n && (n = this.getPresetIndex(2047 & i.bank, t))) : n = this.getPresetIndex(2047 & i.bank, t),
            i.presetIndex = n,
            -1 !== n
        }
        channelSetBank(e, t) {
            this.channelInit(e).bank = ee.int32ToUint16(t)
        }
        channelSetBankPreset(e, t, s) {
            const i = this.channelInit(e)
              , n = this.getPresetIndex(t, s);
            return -1 !== n && (i.presetIndex = ee.int32ToUint16(n),
            i.bank = ee.int32ToUint16(t),
            !0)
        }
        channelSetPan(e, t) {
            for (const s of this._voices)
                if (s.playingChannel === e && -1 !== s.playingPreset) {
                    let e = s.region.pan + t - .5;
                    e <= -.5 ? (s.panFactorLeft = 1,
                    s.panFactorRight = 0) : e >= .5 ? (s.panFactorLeft = 0,
                    s.panFactorRight = 1) : (s.panFactorLeft = Math.sqrt(.5 - e),
                    s.panFactorRight = Math.sqrt(.5 + e))
                }
            this.channelInit(e).panOffset = t - .5
        }
        channelSetVolume(e, t) {
            const s = this.channelInit(e)
              , i = Ue.gainToDecibels(t)
              , n = i - s.gainDb;
            if (0 !== n) {
                for (const t of this._voices)
                    t.playingChannel === e && -1 !== t.playingPreset && (t.noteGainDb += n);
                s.gainDb = i
            }
        }
        channelSetPitchWheel(e, t) {
            const s = this.channelInit(e);
            s.pitchWheel !== t && (s.pitchWheel = ee.int32ToUint16(t),
            this.channelApplyPitch(e, s))
        }
        channelSetPerNotePitchWheel(e, t, s) {
            const i = this.channelInit(e);
            i.perNotePitchWheel.has(t) && i.perNotePitchWheel.get(t) === s || (i.perNotePitchWheel.set(t, s),
            this.channelApplyPitch(e, i, t))
        }
        channelApplyPitch(e, t, s=-1) {
            for (const i of this._voices)
                i.playingChannel !== e || -1 === i.playingPreset || -1 != s && i.playingKey !== s || i.updatePitchRatio(t, this.outSampleRate)
        }
        channelSetPitchRange(e, t) {
            const s = this.channelInit(e);
            s.pitchRange !== t && (s.pitchRange = t,
            8192 !== s.pitchWheel && this.channelApplyPitch(e, s))
        }
        channelSetTuning(e, t) {
            const s = this.channelInit(e);
            s.tuning !== t && (s.tuning = t,
            this.channelApplyPitch(e, s))
        }
        channelMidiControl(e, t, s) {
            let i = this.channelInit(e);
            switch (t) {
            case 5:
            case 96:
            case 97:
            case 64:
            case 65:
            case 66:
            case 122:
            case 124:
            case 125:
            case 126:
            case 127:
                return;
            case 38:
                return i.midiData = ee.int32ToUint16(16256 & i.midiData | s),
                void (0 === i.midiRpn ? this.channelSetPitchRange(e, (i.midiData >> 7) + .01 * (127 & i.midiData)) : 1 === i.midiRpn ? this.channelSetTuning(e, (0 | i.tuning) + (i.midiData - 8192) / 8192) : 2 === i.midiRpn && this.channelSetTuning(e, s - 64 + (i.tuning - (0 | i.tuning))));
            case 7:
                return i.midiVolume = ee.int32ToUint16(127 & i.midiVolume | s << 7),
                void this.channelSetVolume(e, Math.pow(i.midiVolume / 16383 * (i.midiExpression / 16383), 3));
            case 39:
                return i.midiVolume = ee.int32ToUint16(16256 & i.midiVolume | s),
                void this.channelSetVolume(e, Math.pow(i.midiVolume / 16383 * (i.midiExpression / 16383), 3));
            case 11:
                return i.midiExpression = ee.int32ToUint16(127 & i.midiExpression | s << 7),
                void this.channelSetVolume(e, Math.pow(i.midiVolume / 16383 * (i.midiExpression / 16383), 3));
            case 43:
                return i.midiExpression = ee.int32ToUint16(16256 & i.midiExpression | s),
                void this.channelSetVolume(e, Math.pow(i.midiVolume / 16383 * (i.midiExpression / 16383), 3));
            case 10:
                return i.midiPan = ee.int32ToUint16(127 & i.midiPan | s << 7),
                void this.channelSetPan(e, i.midiPan / 16383);
            case 42:
                return i.midiPan = ee.int32ToUint16(16256 & i.midiPan | s),
                void this.channelSetPan(e, i.midiPan / 16383);
            case 6:
                return i.midiData = ee.int32ToUint16(127 & i.midiData | s << 7),
                void (0 === i.midiRpn ? this.channelSetPitchRange(e, (i.midiData >> 7) + .01 * (127 & i.midiData)) : 1 === i.midiRpn ? this.channelSetTuning(e, (0 | i.tuning) + (i.midiData - 8192) / 8192) : 2 === i.midiRpn && 6 === t && this.channelSetTuning(e, s - 64 + (i.tuning - (0 | i.tuning))));
            case 0:
                return void (i.bank = ee.int32ToUint16(32768 | s));
            case 32:
                return void (i.bank = ee.int32ToUint16((0 != (32768 & i.bank) ? (127 & i.bank) << 7 : 0) | s));
            case 101:
                return void (i.midiRpn = ee.int32ToUint16(127 & (65535 === i.midiRpn ? 0 : i.midiRpn) | s << 7));
            case 100:
                return void (i.midiRpn = ee.int32ToUint16(16256 & (65535 === i.midiRpn ? 0 : i.midiRpn) | s));
            case 98:
            case 99:
                return void (i.midiRpn = 65535);
            case 120:
                return void this.channelSoundsOffAll(e);
            case 123:
                return void this.channelNoteOffAll(e);
            case 121:
                return i.midiVolume = 16383,
                i.midiExpression = 16383,
                i.midiPan = 8192,
                i.bank = 0,
                this.channelSetVolume(e, 1),
                this.channelSetPan(e, .5),
                void this.channelSetPitchRange(e, 2)
            }
        }
        channelGetPresetIndex(e) {
            return this._channels && e < this._channels.channelList.length ? this._channels.channelList[e].presetIndex : 0
        }
        channelGetPresetBank(e) {
            return this._channels && e < this._channels.channelList.length ? 32767 & this._channels.channelList[e].bank : 0
        }
        channelGetPan(e) {
            return this._channels && e < this._channels.channelList.length ? this._channels.channelList[e].panOffset - .5 : .5
        }
        channelGetVolume(e) {
            return this._channels && e < this._channels.channelList.length ? Ue.decibelsToGain(this._channels.channelList[e].gainDb) : 1
        }
        channelGetPitchWheel(e) {
            return this._channels && e < this._channels.channelList.length ? this._channels.channelList[e].pitchWheel : 8192
        }
        channelGetPitchRange(e) {
            return this._channels && e < this._channels.channelList.length ? this._channels.channelList[e].pitchRange : 2
        }
        channelGetTuning(e) {
            return this._channels && e < this._channels.channelList.length ? this._channels.channelList[e].tuning : 0
        }
        resetPresets() {
            this.presets = []
        }
        loadPresets(e, t) {
            const s = [];
            for (let t = 0; t < e.phdrs.length - 1; t++) {
                const i = e.phdrs[t];
                let n = 0;
                const r = new ze;
                s.push(r),
                r.name = i.presetName,
                r.bank = i.bank,
                r.presetNumber = i.preset,
                r.fontSamples = e.fontSamples;
                let a = 0;
                for (let s = i.presetBagNdx; s < e.phdrs[t + 1].presetBagNdx; s++) {
                    let t = 0
                      , i = 127
                      , n = 0
                      , r = 127;
                    for (let o = e.pbags[s].genNdx; o < e.pbags[s + 1].genNdx; o++) {
                        let s = e.pgens[o];
                        if (s.genOper !== Oe.GenKeyRange)
                            if (s.genOper !== Oe.GenVelRange) {
                                if (s.genOper === Oe.GenInstrument && !(s.genAmount.wordAmount >= e.insts.length))
                                    for (let o = e.insts[s.genAmount.wordAmount].instBagNdx; o < e.insts[s.genAmount.wordAmount + 1].instBagNdx; o++) {
                                        let s = 0
                                          , h = 127
                                          , l = 0
                                          , c = 127;
                                        for (let d = e.ibags[o].instGenNdx; d < e.ibags[o + 1].instGenNdx; d++) {
                                            let o = e.igens[d];
                                            o.genOper !== Oe.GenKeyRange ? o.genOper !== Oe.GenVelRange ? 53 === o.genOper && h >= t && s <= i && c >= n && l <= r && a++ : (l = o.genAmount.lowByteAmount,
                                            c = o.genAmount.highByteAmount) : (s = o.genAmount.lowByteAmount,
                                            h = o.genAmount.highByteAmount)
                                        }
                                    }
                            } else
                                n = s.genAmount.lowByteAmount,
                                r = s.genAmount.highByteAmount;
                        else
                            t = s.genAmount.lowByteAmount,
                            i = s.genAmount.highByteAmount
                    }
                }
                r.regions = new Array(a);
                let o = new Ye;
                o.clear(!0);
                for (let s = i.presetBagNdx; s < e.phdrs[t + 1].presetBagNdx; s++) {
                    const t = e.pbags[s]
                      , a = new Ye(o);
                    let h = !1;
                    for (let i = t.genNdx; i < e.pbags[s + 1].genNdx; i++) {
                        const t = e.pgens[i];
                        if (t.genOper === Oe.GenInstrument) {
                            let s = t.genAmount.wordAmount;
                            if (s >= e.insts.length)
                                continue;
                            let i = new Ye;
                            i.clear(!1);
                            let o = e.insts[s];
                            for (let t = o.instBagNdx; t < e.insts[s + 1].instBagNdx; t++) {
                                let s = e.ibags[t]
                                  , h = new Ye(i)
                                  , l = !1;
                                for (let i = s.instGenNdx; i < e.ibags[t + 1].instGenNdx; i++) {
                                    let t = e.igens[i];
                                    if (t.genOper === Oe.GenSampleId) {
                                        if (h.hiKey < a.loKey || h.loKey > a.hiKey)
                                            continue;
                                        if (h.hiVel < a.loVel || h.loVel > a.hiVel)
                                            continue;
                                        a.loKey > h.loKey && (h.loKey = a.loKey),
                                        a.hiKey < h.hiKey && (h.hiKey = a.hiKey),
                                        a.loVel > h.loVel && (h.loVel = a.loVel),
                                        a.hiVel < h.hiVel && (h.hiVel = a.hiVel),
                                        h.offset += a.offset,
                                        h.end += a.end,
                                        h.loopStart += a.loopStart,
                                        h.loopEnd += a.loopEnd,
                                        h.transpose += a.transpose,
                                        h.tune += a.tune,
                                        h.pitchKeyTrack += a.pitchKeyTrack,
                                        h.attenuation += a.attenuation,
                                        h.pan += a.pan,
                                        h.ampEnv.delay += a.ampEnv.delay,
                                        h.ampEnv.attack += a.ampEnv.attack,
                                        h.ampEnv.hold += a.ampEnv.hold,
                                        h.ampEnv.decay += a.ampEnv.decay,
                                        h.ampEnv.sustain += a.ampEnv.sustain,
                                        h.ampEnv.release += a.ampEnv.release,
                                        h.modEnv.delay += a.modEnv.delay,
                                        h.modEnv.attack += a.modEnv.attack,
                                        h.modEnv.hold += a.modEnv.hold,
                                        h.modEnv.decay += a.modEnv.decay,
                                        h.modEnv.sustain += a.modEnv.sustain,
                                        h.modEnv.release += a.modEnv.release,
                                        h.initialFilterQ += a.initialFilterQ,
                                        h.initialFilterFc += a.initialFilterFc,
                                        h.modEnvToPitch += a.modEnvToPitch,
                                        h.modEnvToFilterFc += a.modEnvToFilterFc,
                                        h.delayModLFO += a.delayModLFO,
                                        h.freqModLFO += a.freqModLFO,
                                        h.modLfoToPitch += a.modLfoToPitch,
                                        h.modLfoToFilterFc += a.modLfoToFilterFc,
                                        h.modLfoToVolume += a.modLfoToVolume,
                                        h.delayVibLFO += a.delayVibLFO,
                                        h.freqVibLFO += a.freqVibLFO,
                                        h.vibLfoToPitch += a.vibLfoToPitch,
                                        h.ampEnv.envToSecs(!0),
                                        h.modEnv.envToSecs(!1),
                                        h.delayModLFO = h.delayModLFO < -11950 ? 0 : Ue.timecents2Secs(h.delayModLFO),
                                        h.delayVibLFO = h.delayVibLFO < -11950 ? 0 : Ue.timecents2Secs(h.delayVibLFO),
                                        h.pan < -.5 ? h.pan = -.5 : h.pan > .5 && (h.pan = .5),
                                        (h.initialFilterQ < 1500 || h.initialFilterQ > 13500) && (h.initialFilterQ = 0);
                                        let s = e.sHdrs[t.genAmount.wordAmount];
                                        h.offset += s.start,
                                        h.end += s.end,
                                        h.loopStart += s.startLoop,
                                        h.loopEnd += s.endLoop,
                                        s.endLoop > 0 && (h.loopEnd -= 1),
                                        -1 === h.pitchKeyCenter && (h.pitchKeyCenter = s.originalPitch),
                                        h.tune += s.pitchCorrection,
                                        h.sampleRate = s.sampleRate,
                                        0 !== h.end && h.end < r.fontSamples.length ? h.end++ : h.end = r.fontSamples.length,
                                        r.regions[n] = new Ye(h),
                                        n++,
                                        l = !0
                                    } else
                                        h.operator(t.genOper, t.genAmount)
                                }
                                s !== e.ibags[o.instBagNdx] || l || (i = new Ye(h))
                            }
                            h = !0
                        } else
                            a.operator(t.genOper, t.genAmount)
                    }
                    t !== e.pbags[i.presetBagNdx] || h || (o = a)
                }
            }
            if (t && this.presets)
                for (const e of s)
                    this.presets.push(e);
            else
                this.presets = s
        }
    }
    class Ze {
        constructor() {
            this._listeners = []
        }
        on(e) {
            this._listeners.push(e)
        }
        off(e) {
            this._listeners = this._listeners.filter((t => t !== e))
        }
        trigger() {
            for (const e of this._listeners)
                e()
        }
    }
    class et {
        constructor() {
            this._listeners = []
        }
        on(e) {
            this._listeners.push(e)
        }
        off(e) {
            this._listeners = this._listeners.filter((t => t !== e))
        }
        trigger(e) {
            for (const t of this._listeners)
                t(e)
        }
    }
    class tt {
        constructor(e) {
            this.events = e
        }
    }
    class st {
        constructor(e) {
            this._isSoundFontLoaded = !1,
            this._isMidiLoaded = !1,
            this._tickPosition = 0,
            this._timePosition = 0,
            this._metronomeVolume = 0,
            this._countInVolume = 0,
            this._playedEventsQueue = new Ke,
            this._midiEventsPlayedFilter = new Set,
            this.isReady = !1,
            this.state = x.Paused,
            this.ready = new Ze,
            this.readyForPlayback = new Ze,
            this.finished = new Ze,
            this.soundFontLoaded = new Ze,
            this.soundFontLoadFailed = new et,
            this.midiLoaded = new et,
            this.midiLoadFailed = new et,
            this.stateChanged = new et,
            this.positionChanged = new et,
            this.midiEventsPlayed = new et,
            _e.debug("AlphaSynth", "Initializing player"),
            this.state = x.Paused,
            _e.debug("AlphaSynth", "Creating output"),
            this.output = e,
            _e.debug("AlphaSynth", "Creating synthesizer"),
            this._synthesizer = new je(this.output.sampleRate),
            this._sequencer = new Ne(this._synthesizer),
            _e.debug("AlphaSynth", "Opening output"),
            this.output.ready.on(( () => {
                this.isReady = !0,
                this.ready.trigger(),
                this.checkReadyForPlayback()
            }
            )),
            this.output.sampleRequest.on(( () => {
                let e = new Float32Array(he.MicroBufferSize * he.MicroBufferCount * he.AudioChannels)
                  , t = 0;
                for (let s = 0; s < he.MicroBufferCount; s++) {
                    this._sequencer.fillMidiEventQueue();
                    const s = this._synthesizer.synthesize(e, t, he.MicroBufferSize);
                    t += he.MicroBufferSize * he.AudioChannels;
                    for (const e of s)
                        this._midiEventsPlayedFilter.has(e.event.command) && this._playedEventsQueue.enqueue(e);
                    if (this._sequencer.isFinished)
                        break
                }
                t < e.length && (e = e.subarray(0, t)),
                this.output.addSamples(e)
            }
            )),
            this.output.samplesPlayed.on(this.onSamplesPlayed.bind(this)),
            this.output.open()
        }
        get isReadyForPlayback() {
            return this.isReady && this._isSoundFontLoaded && this._isMidiLoaded
        }
        get logLevel() {
            return _e.logLevel
        }
        set logLevel(e) {
            _e.logLevel = e
        }
        get masterVolume() {
            return this._synthesizer.masterVolume
        }
        set masterVolume(e) {
            e = Math.max(e, he.MinVolume),
            this._synthesizer.masterVolume = e
        }
        get metronomeVolume() {
            return this._metronomeVolume
        }
        set metronomeVolume(e) {
            e = Math.max(e, he.MinVolume),
            this._metronomeVolume = e,
            this._synthesizer.metronomeVolume = e
        }
        get countInVolume() {
            return this._countInVolume
        }
        set countInVolume(e) {
            e = Math.max(e, he.MinVolume),
            this._countInVolume = e
        }
        get midiEventsPlayedFilter() {
            return Array.from(this._midiEventsPlayedFilter)
        }
        set midiEventsPlayedFilter(e) {
            this._midiEventsPlayedFilter = new Set(e)
        }
        get playbackSpeed() {
            return this._sequencer.playbackSpeed
        }
        set playbackSpeed(e) {
            e = Ue.clamp(e, he.MinPlaybackSpeed, he.MaxPlaybackSpeed);
            let t = this._sequencer.playbackSpeed;
            this._sequencer.playbackSpeed = e,
            this.updateTimePosition(this._timePosition * (t / e), !0)
        }
        get tickPosition() {
            return this._tickPosition
        }
        set tickPosition(e) {
            this.timePosition = this._sequencer.tickPositionToTimePosition(e)
        }
        get timePosition() {
            return this._timePosition
        }
        set timePosition(e) {
            _e.debug("AlphaSynth", `Seeking to position ${e}ms`),
            this._sequencer.seek(e),
            this.updateTimePosition(e, !0),
            this.output.resetSamples()
        }
        get playbackRange() {
            return this._sequencer.playbackRange
        }
        set playbackRange(e) {
            this._sequencer.playbackRange = e,
            e && (this.tickPosition = e.startTick)
        }
        get isLooping() {
            return this._sequencer.isLooping
        }
        set isLooping(e) {
            this._sequencer.isLooping = e
        }
        destroy() {
            _e.debug("AlphaSynth", "Destroying player"),
            this.stop(),
            this.output.destroy()
        }
        play() {
            return !(this.state !== x.Paused || !this._isMidiLoaded) && (this.output.activate(),
            this.playInternal(),
            this._countInVolume > 0 && (_e.debug("AlphaSynth", "Starting countin"),
            this._sequencer.startCountIn(),
            this._synthesizer.setupMetronomeChannel(this._countInVolume),
            this.tickPosition = 0),
            this.output.play(),
            !0)
        }
        playInternal() {
            _e.debug("AlphaSynth", "Starting playback"),
            this._synthesizer.setupMetronomeChannel(this.metronomeVolume),
            this.state = x.Playing,
            this.stateChanged.trigger(new ve(this.state,!1))
        }
        pause() {
            this.state !== x.Paused && this._isMidiLoaded && (_e.debug("AlphaSynth", "Pausing playback"),
            this.state = x.Paused,
            this.stateChanged.trigger(new ve(this.state,!1)),
            this.output.pause(),
            this._synthesizer.noteOffAll(!1),
            this._sequencer.seek(this._timePosition))
        }
        playPause() {
            this.state === x.Paused && this._isMidiLoaded ? this.play() : this.pause()
        }
        stop() {
            this._isMidiLoaded && (_e.debug("AlphaSynth", "Stopping playback"),
            this.state = x.Paused,
            this.output.pause(),
            this._sequencer.stop(),
            this._synthesizer.noteOffAll(!0),
            this.stateChanged.trigger(new ve(this.state,!0)))
        }
        playOneTimeMidiFile(e) {
            this.pause(),
            this._sequencer.loadOneTimeMidi(e),
            this._sequencer.stop(),
            this._synthesizer.noteOffAll(!0),
            this.tickPosition = 0,
            this.output.play()
        }
        resetSoundFonts() {
            this.stop(),
            this._synthesizer.resetPresets(),
            this._isSoundFontLoaded = !1,
            this.soundFontLoaded.trigger()
        }
        loadSoundFont(e, t, s) {
            this.pause();
            let i = se.fromBuffer(e);
            _e.debug("AlphaSynth", "Loading soundfont from bytes");
            let n = new Ce(this.output.oggSampleRate);
            n.load(i, s ? this.decodeAudioData.bind(this) : void 0).then(( () => {
                this._synthesizer.loadPresets(n, t),
                this._isSoundFontLoaded = !0,
                this.soundFontLoaded.trigger(),
                _e.debug("AlphaSynth", "soundFont successfully loaded"),
                this.checkReadyForPlayback()
            }
            )).catch((e => {
                _e.error("AlphaSynth", "Could not load soundfont from bytes " + e),
                this.soundFontLoadFailed.trigger(e)
            }
            ))
        }
        decodeAudioData(e) {
            return this.output.decodeAudioData(e)
        }
        checkReadyForPlayback() {
            this.isReadyForPlayback && (this._synthesizer.setupMetronomeChannel(this.metronomeVolume),
            this.readyForPlayback.trigger())
        }
        loadMidiFile(e) {
            this.stop();
            try {
                _e.debug("AlphaSynth", "Loading midi from model"),
                this._sequencer.loadMidi(e),
                this._isMidiLoaded = !0,
                this.midiLoaded.trigger(new xe(0,this._sequencer.endTime,0,this._sequencer.endTick,!1)),
                _e.debug("AlphaSynth", "Midi successfully loaded"),
                this.checkReadyForPlayback(),
                this.tickPosition = 0
            } catch (e) {
                _e.error("AlphaSynth", "Could not load midi from model " + e),
                this.midiLoadFailed.trigger(e)
            }
        }
        setChannelMute(e, t) {
            this._synthesizer.channelSetMute(e, t)
        }
        resetChannelStates() {
            this._synthesizer.resetChannelStates()
        }
        setChannelSolo(e, t) {
            this._synthesizer.channelSetSolo(e, t)
        }
        setChannelVolume(e, t) {
            t = Math.max(t, he.MinVolume),
            this._synthesizer.channelSetMixVolume(e, t)
        }
        onSamplesPlayed(e) {
            let t = e / this._synthesizer.outSampleRate * 1e3;
            this.updateTimePosition(this._timePosition + t, !1),
            this.checkForFinish()
        }
        checkForFinish() {
            let e = 0
              , t = 0;
            this.playbackRange ? (e = this.playbackRange.startTick,
            t = this.playbackRange.endTick) : t = this._sequencer.endTick,
            this._tickPosition >= t && (_e.debug("AlphaSynth", "Finished playback"),
            this._sequencer.isPlayingCountIn ? (this._sequencer.resetCountIn(),
            this.timePosition = this._sequencer.currentTime,
            this.playInternal()) : this._sequencer.isPlayingOneTimeMidi ? (this._sequencer.resetOneTimeMidi(),
            this.state = x.Paused,
            this.output.pause(),
            this._synthesizer.noteOffAll(!1)) : (this.finished.trigger(),
            this.isLooping ? this.tickPosition = e : this.stop()))
        }
        updateTimePosition(e, t) {
            const s = e;
            this._timePosition = s;
            const i = this._sequencer.timePositionToTickPosition(s);
            this._tickPosition = i;
            const n = this._sequencer.endTime
              , r = this._sequencer.endTick;
            if (this._sequencer.isPlayingOneTimeMidi || this._sequencer.isPlayingCountIn || (_e.debug("AlphaSynth", `Position changed: (time: ${s}/${n}, tick: ${i}/${r}, Active Voices: ${this._synthesizer.activeVoiceCount}`),
            this.positionChanged.trigger(new xe(s,n,i,r,t))),
            t)
                this._playedEventsQueue.clear();
            else {
                const e = new Ke;
                for (; !this._playedEventsQueue.isEmpty && this._playedEventsQueue.peek().time < s; ) {
                    const t = this._playedEventsQueue.dequeue();
                    e.enqueue(t.event)
                }
                e.isEmpty || this.midiEventsPlayed.trigger(new tt(e.toArray()))
            }
        }
    }
    class it {
        constructor() {
            this.hideDynamics = !1
        }
    }
    class nt {
        constructor() {
            this.masterBars = [],
            this.openings = [],
            this.closings = [],
            this.isOpened = !1,
            this.isClosed = !1
        }
        addMasterBar(e) {
            0 === this.openings.length && this.openings.push(e),
            this.masterBars.push(e),
            e.repeatGroup = this,
            e.isRepeatEnd ? (this.closings.push(e),
            this.isClosed = !0,
            this.isOpened || (this.masterBars[0].isRepeatStart = !0,
            this.isOpened = !0)) : this.isClosed && (this.isClosed = !1,
            this.openings.push(e))
        }
    }
    !function(e) {
        e[e.Unknown = -2] = "Unknown",
        e[e.NoOrDead = -1] = "NoOrDead",
        e[e.Thumb = 0] = "Thumb",
        e[e.IndexFinger = 1] = "IndexFinger",
        e[e.MiddleFinger = 2] = "MiddleFinger",
        e[e.AnnularFinger = 3] = "AnnularFinger",
        e[e.LittleFinger = 4] = "LittleFinger"
    }(E || (E = {})),
    function(e) {
        e[e.None = 0] = "None",
        e[e.Natural = 1] = "Natural",
        e[e.Artificial = 2] = "Artificial",
        e[e.Pinch = 3] = "Pinch",
        e[e.Tap = 4] = "Tap",
        e[e.Semi = 5] = "Semi",
        e[e.Feedback = 6] = "Feedback"
    }(M || (M = {})),
    function(e) {
        e[e.Default = 0] = "Default",
        e[e.ForceNone = 1] = "ForceNone",
        e[e.ForceNatural = 2] = "ForceNatural",
        e[e.ForceSharp = 3] = "ForceSharp",
        e[e.ForceDoubleSharp = 4] = "ForceDoubleSharp",
        e[e.ForceFlat = 5] = "ForceFlat",
        e[e.ForceDoubleFlat = 6] = "ForceDoubleFlat"
    }(D || (D = {})),
    function(e) {
        e[e._15ma = 0] = "_15ma",
        e[e._8va = 1] = "_8va",
        e[e.Regular = 2] = "Regular",
        e[e._8vb = 3] = "_8vb",
        e[e._15mb = 4] = "_15mb"
    }(R || (R = {}));
    class rt {
        constructor(e) {
            this._value = void 0,
            this._factory = e
        }
        get value() {
            return void 0 === this._value && (this._value = this._factory()),
            this._value
        }
    }
    class at {
        static getValue(e) {
            return at._values || (at._values = new Map),
            e = e.toLowerCase().split(" ").join(""),
            at._values.has(e) ? at._values.get(e) : 0
        }
        static isPiano(e) {
            return e <= 7 || e >= 16 && e <= 23
        }
        static isGuitar(e) {
            return e >= 24 && e <= 39 || 105 === e || 43 === e
        }
    }
    at._values = new Map([["acousticgrandpiano", 0], ["brightacousticpiano", 1], ["electricgrandpiano", 2], ["honkytonkpiano", 3], ["electricpiano1", 4], ["electricpiano2", 5], ["harpsichord", 6], ["clavinet", 7], ["celesta", 8], ["glockenspiel", 9], ["musicbox", 10], ["vibraphone", 11], ["marimba", 12], ["xylophone", 13], ["tubularbells", 14], ["dulcimer", 15], ["drawbarorgan", 16], ["percussiveorgan", 17], ["rockorgan", 18], ["churchorgan", 19], ["reedorgan", 20], ["accordion", 21], ["harmonica", 22], ["tangoaccordion", 23], ["acousticguitarnylon", 24], ["acousticguitarsteel", 25], ["electricguitarjazz", 26], ["electricguitarclean", 27], ["electricguitarmuted", 28], ["overdrivenguitar", 29], ["distortionguitar", 30], ["guitarharmonics", 31], ["acousticbass", 32], ["electricbassfinger", 33], ["electricbasspick", 34], ["fretlessbass", 35], ["slapbass1", 36], ["slapbass2", 37], ["synthbass1", 38], ["synthbass2", 39], ["violin", 40], ["viola", 41], ["cello", 42], ["contrabass", 43], ["tremolostrings", 44], ["pizzicatostrings", 45], ["orchestralharp", 46], ["timpani", 47], ["stringensemble1", 48], ["stringensemble2", 49], ["synthstrings1", 50], ["synthstrings2", 51], ["choiraahs", 52], ["voiceoohs", 53], ["synthvoice", 54], ["orchestrahit", 55], ["trumpet", 56], ["trombone", 57], ["tuba", 58], ["mutedtrumpet", 59], ["frenchhorn", 60], ["brasssection", 61], ["synthbrass1", 62], ["synthbrass2", 63], ["sopranosax", 64], ["altosax", 65], ["tenorsax", 66], ["baritonesax", 67], ["oboe", 68], ["englishhorn", 69], ["bassoon", 70], ["clarinet", 71], ["piccolo", 72], ["flute", 73], ["recorder", 74], ["panflute", 75], ["blownbottle", 76], ["shakuhachi", 77], ["whistle", 78], ["ocarina", 79], ["lead1square", 80], ["lead2sawtooth", 81], ["lead3calliope", 82], ["lead4chiff", 83], ["lead5charang", 84], ["lead6voice", 85], ["lead7fifths", 86], ["lead8bassandlead", 87], ["pad1newage", 88], ["pad2warm", 89], ["pad3polysynth", 90], ["pad4choir", 91], ["pad5bowed", 92], ["pad6metallic", 93], ["pad7halo", 94], ["pad8sweep", 95], ["fx1rain", 96], ["fx2soundtrack", 97], ["fx3crystal", 98], ["fx4atmosphere", 99], ["fx5brightness", 100], ["fx6goblins", 101], ["fx7echoes", 102], ["fx8scifi", 103], ["sitar", 104], ["banjo", 105], ["shamisen", 106], ["koto", 107], ["kalimba", 108], ["bagpipe", 109], ["fiddle", 110], ["shanai", 111], ["tinklebell", 112], ["agogo", 113], ["steeldrums", 114], ["woodblock", 115], ["taikodrum", 116], ["melodictom", 117], ["synthdrum", 118], ["reversecymbal", 119], ["guitarfretnoise", 120], ["breathnoise", 121], ["seashore", 122], ["birdtweet", 123], ["telephonering", 124], ["helicopter", 125], ["applause", 126], ["gunshot", 127]]);
    class ot {
        constructor() {
            this.note = null,
            this.noteValue = 0,
            this.octave = 0
        }
        get realValue() {
            return 12 * this.octave + this.noteValue
        }
    }
    class ht {
        static getIndex(e) {
            return e < 0 ? 0 : 0 | Math.log2(e)
        }
        static keySignatureIsFlat(e) {
            return e < 0
        }
        static keySignatureIsNatural(e) {
            return 0 === e
        }
        static keySignatureIsSharp(e) {
            return e > 0
        }
        static applyPitchOffsets(e, t) {
            for (let s = 0; s < t.tracks.length; s++) {
                if (s < e.notation.displayTranspositionPitches.length)
                    for (let i of t.tracks[s].staves)
                        i.displayTranspositionPitch = -e.notation.displayTranspositionPitches[s];
                if (s < e.notation.transpositionPitches.length)
                    for (let i of t.tracks[s].staves)
                        i.transpositionPitch = -e.notation.transpositionPitches[s]
            }
        }
        static fingerToString(e, t, s, i) {
            if (e.notation.fingeringMode === _.ScoreForcePiano || e.notation.fingeringMode === _.SingleNoteEffectBandForcePiano || at.isPiano(t.voice.bar.staff.track.playbackInfo.program))
                switch (s) {
                case E.Unknown:
                case E.NoOrDead:
                    return null;
                case E.Thumb:
                    return "1";
                case E.IndexFinger:
                    return "2";
                case E.MiddleFinger:
                    return "3";
                case E.AnnularFinger:
                    return "4";
                case E.LittleFinger:
                    return "5";
                default:
                    return null
                }
            if (i)
                switch (s) {
                case E.Unknown:
                case E.NoOrDead:
                    return "0";
                case E.Thumb:
                    return "T";
                case E.IndexFinger:
                    return "1";
                case E.MiddleFinger:
                    return "2";
                case E.AnnularFinger:
                    return "3";
                case E.LittleFinger:
                    return "4";
                default:
                    return null
                }
            switch (s) {
            case E.Unknown:
            case E.NoOrDead:
                return null;
            case E.Thumb:
                return "p";
            case E.IndexFinger:
                return "i";
            case E.MiddleFinger:
                return "m";
            case E.AnnularFinger:
                return "a";
            case E.LittleFinger:
                return "c";
            default:
                return null
            }
        }
        static isTuning(e) {
            return !!ht.parseTuning(e)
        }
        static parseTuning(e) {
            let t = ""
              , s = "";
            for (let i = 0; i < e.length; i++) {
                let n = e.charCodeAt(i);
                if (n >= 48 && n <= 57) {
                    if (!t)
                        return null;
                    s += String.fromCharCode(n)
                } else {
                    if (!(n >= 65 && n <= 90 || n >= 97 && n <= 122 || 35 === n))
                        return null;
                    t += String.fromCharCode(n)
                }
            }
            if (!s || !t)
                return null;
            let i = new ot;
            return i.octave = parseInt(s) + 1,
            i.note = t.toLowerCase(),
            i.noteValue = ht.getToneForText(i.note),
            i
        }
        static getTuningForText(e) {
            let t = ht.parseTuning(e);
            return t ? t.realValue : -1
        }
        static getToneForText(e) {
            let t = 0;
            switch (e.toLowerCase()) {
            case "c":
                t = 0;
                break;
            case "c#":
            case "db":
                t = 1;
                break;
            case "d":
                t = 2;
                break;
            case "d#":
            case "eb":
                t = 3;
                break;
            case "e":
                t = 4;
                break;
            case "f":
                t = 5;
                break;
            case "f#":
            case "gb":
                t = 6;
                break;
            case "g":
                t = 7;
                break;
            case "g#":
            case "ab":
                t = 8;
                break;
            case "a":
                t = 9;
                break;
            case "a#":
            case "bb":
                t = 10;
                break;
            case "b":
                t = 11;
                break;
            default:
                return 0
            }
            return t
        }
        static newGuid() {
            return Math.floor(65536 * (1 + Math.random())).toString(16).substring(1) + Math.floor(65536 * (1 + Math.random())).toString(16).substring(1) + "-" + Math.floor(65536 * (1 + Math.random())).toString(16).substring(1) + "-" + Math.floor(65536 * (1 + Math.random())).toString(16).substring(1) + "-" + Math.floor(65536 * (1 + Math.random())).toString(16).substring(1) + "-" + Math.floor(65536 * (1 + Math.random())).toString(16).substring(1) + Math.floor(65536 * (1 + Math.random())).toString(16).substring(1) + Math.floor(65536 * (1 + Math.random())).toString(16).substring(1)
        }
        static isAlmostEqualTo(e, t) {
            return Math.abs(e - t) < 1e-5
        }
        static toHexString(e, t=0) {
            let s = "";
            do {
                s = String.fromCharCode("0123456789ABCDEF".charCodeAt(15 & e)) + s,
                e >>= 4
            } while (e > 0);
            for (; s.length < t; )
                s = "0" + s;
            return s
        }
    }
    !function(e) {
        e[e.None = 0] = "None",
        e[e.Up = 1] = "Up",
        e[e.Down = 2] = "Down"
    }(O || (O = {})),
    function(e) {
        e[e.None = -1] = "None",
        e[e.GClef = 57424] = "GClef",
        e[e.CClef = 57436] = "CClef",
        e[e.FClef = 57442] = "FClef",
        e[e.UnpitchedPercussionClef1 = 57449] = "UnpitchedPercussionClef1",
        e[e.SixStringTabClef = 57453] = "SixStringTabClef",
        e[e.FourStringTabClef = 57454] = "FourStringTabClef",
        e[e.TimeSig0 = 57472] = "TimeSig0",
        e[e.TimeSig1 = 57473] = "TimeSig1",
        e[e.TimeSig2 = 57474] = "TimeSig2",
        e[e.TimeSig3 = 57475] = "TimeSig3",
        e[e.TimeSig4 = 57476] = "TimeSig4",
        e[e.TimeSig5 = 57477] = "TimeSig5",
        e[e.TimeSig6 = 57478] = "TimeSig6",
        e[e.TimeSig7 = 57479] = "TimeSig7",
        e[e.TimeSig8 = 57480] = "TimeSig8",
        e[e.TimeSig9 = 57481] = "TimeSig9",
        e[e.TimeSigCommon = 57482] = "TimeSigCommon",
        e[e.TimeSigCutCommon = 57483] = "TimeSigCutCommon",
        e[e.NoteheadDoubleWholeSquare = 57505] = "NoteheadDoubleWholeSquare",
        e[e.NoteheadDoubleWhole = 57504] = "NoteheadDoubleWhole",
        e[e.NoteheadWhole = 57506] = "NoteheadWhole",
        e[e.NoteheadHalf = 57507] = "NoteheadHalf",
        e[e.NoteheadBlack = 57508] = "NoteheadBlack",
        e[e.NoteheadNull = 57509] = "NoteheadNull",
        e[e.NoteheadXOrnate = 57514] = "NoteheadXOrnate",
        e[e.NoteheadTriangleUpWhole = 57531] = "NoteheadTriangleUpWhole",
        e[e.NoteheadTriangleUpHalf = 57532] = "NoteheadTriangleUpHalf",
        e[e.NoteheadTriangleUpBlack = 57534] = "NoteheadTriangleUpBlack",
        e[e.NoteheadDiamondBlackWide = 57564] = "NoteheadDiamondBlackWide",
        e[e.NoteheadDiamondWhite = 57565] = "NoteheadDiamondWhite",
        e[e.NoteheadDiamondWhiteWide = 57566] = "NoteheadDiamondWhiteWide",
        e[e.NoteheadCircleX = 57523] = "NoteheadCircleX",
        e[e.NoteheadXWhole = 57511] = "NoteheadXWhole",
        e[e.NoteheadXHalf = 57512] = "NoteheadXHalf",
        e[e.NoteheadXBlack = 57513] = "NoteheadXBlack",
        e[e.NoteheadParenthesis = 57550] = "NoteheadParenthesis",
        e[e.NoteheadSlashedBlack2 = 57552] = "NoteheadSlashedBlack2",
        e[e.NoteheadCircleSlash = 57591] = "NoteheadCircleSlash",
        e[e.NoteheadHeavyX = 57592] = "NoteheadHeavyX",
        e[e.NoteheadHeavyXHat = 57593] = "NoteheadHeavyXHat",
        e[e.NoteQuarterUp = 57813] = "NoteQuarterUp",
        e[e.NoteEighthUp = 57815] = "NoteEighthUp",
        e[e.Tremolo3 = 57890] = "Tremolo3",
        e[e.Tremolo2 = 57889] = "Tremolo2",
        e[e.Tremolo1 = 57888] = "Tremolo1",
        e[e.FlagEighthUp = 57920] = "FlagEighthUp",
        e[e.FlagEighthDown = 57921] = "FlagEighthDown",
        e[e.FlagSixteenthUp = 57922] = "FlagSixteenthUp",
        e[e.FlagSixteenthDown = 57923] = "FlagSixteenthDown",
        e[e.FlagThirtySecondUp = 57924] = "FlagThirtySecondUp",
        e[e.FlagThirtySecondDown = 57925] = "FlagThirtySecondDown",
        e[e.FlagSixtyFourthUp = 57926] = "FlagSixtyFourthUp",
        e[e.FlagSixtyFourthDown = 57927] = "FlagSixtyFourthDown",
        e[e.FlagOneHundredTwentyEighthUp = 57928] = "FlagOneHundredTwentyEighthUp",
        e[e.FlagOneHundredTwentyEighthDown = 57929] = "FlagOneHundredTwentyEighthDown",
        e[e.FlagTwoHundredFiftySixthUp = 57930] = "FlagTwoHundredFiftySixthUp",
        e[e.FlagTwoHundredFiftySixthDown = 57931] = "FlagTwoHundredFiftySixthDown",
        e[e.AccidentalFlat = 57952] = "AccidentalFlat",
        e[e.AccidentalNatural = 57953] = "AccidentalNatural",
        e[e.AccidentalSharp = 57954] = "AccidentalSharp",
        e[e.AccidentalDoubleSharp = 57955] = "AccidentalDoubleSharp",
        e[e.AccidentalDoubleFlat = 57956] = "AccidentalDoubleFlat",
        e[e.AccidentalQuarterToneFlatArrowUp = 57968] = "AccidentalQuarterToneFlatArrowUp",
        e[e.AccidentalQuarterToneSharpArrowUp = 57972] = "AccidentalQuarterToneSharpArrowUp",
        e[e.AccidentalQuarterToneNaturalArrowUp = 57970] = "AccidentalQuarterToneNaturalArrowUp",
        e[e.ArticAccentAbove = 58528] = "ArticAccentAbove",
        e[e.ArticStaccatoAbove = 58530] = "ArticStaccatoAbove",
        e[e.ArticMarcatoAbove = 58540] = "ArticMarcatoAbove",
        e[e.FermataAbove = 58560] = "FermataAbove",
        e[e.FermataShortAbove = 58564] = "FermataShortAbove",
        e[e.FermataLongAbove = 58566] = "FermataLongAbove",
        e[e.RestLonga = 58593] = "RestLonga",
        e[e.RestDoubleWhole = 58594] = "RestDoubleWhole",
        e[e.RestWhole = 58595] = "RestWhole",
        e[e.RestHalf = 58596] = "RestHalf",
        e[e.RestQuarter = 58597] = "RestQuarter",
        e[e.RestEighth = 58598] = "RestEighth",
        e[e.RestSixteenth = 58599] = "RestSixteenth",
        e[e.RestThirtySecond = 58600] = "RestThirtySecond",
        e[e.RestSixtyFourth = 58601] = "RestSixtyFourth",
        e[e.RestOneHundredTwentyEighth = 58602] = "RestOneHundredTwentyEighth",
        e[e.RestTwoHundredFiftySixth = 58603] = "RestTwoHundredFiftySixth",
        e[e.Repeat1Bar = 58624] = "Repeat1Bar",
        e[e.Repeat2Bars = 58625] = "Repeat2Bars",
        e[e.Ottava = 58640] = "Ottava",
        e[e.OttavaAlta = 58641] = "OttavaAlta",
        e[e.OttavaBassaVb = 58652] = "OttavaBassaVb",
        e[e.Quindicesima = 58644] = "Quindicesima",
        e[e.QuindicesimaAlta = 58645] = "QuindicesimaAlta",
        e[e.DynamicPPP = 58666] = "DynamicPPP",
        e[e.DynamicPP = 58667] = "DynamicPP",
        e[e.DynamicPiano = 58656] = "DynamicPiano",
        e[e.DynamicMP = 58668] = "DynamicMP",
        e[e.DynamicMF = 58669] = "DynamicMF",
        e[e.DynamicForte = 58658] = "DynamicForte",
        e[e.DynamicFF = 58671] = "DynamicFF",
        e[e.DynamicFFF = 58672] = "DynamicFFF",
        e[e.OrnamentTrill = 58726] = "OrnamentTrill",
        e[e.StringsDownBow = 58896] = "StringsDownBow",
        e[e.StringsUpBow = 58898] = "StringsUpBow",
        e[e.PictEdgeOfCymbal = 59177] = "PictEdgeOfCymbal",
        e[e.GuitarString0 = 59443] = "GuitarString0",
        e[e.GuitarString1 = 59444] = "GuitarString1",
        e[e.GuitarString2 = 59445] = "GuitarString2",
        e[e.GuitarString3 = 59446] = "GuitarString3",
        e[e.GuitarString4 = 59447] = "GuitarString4",
        e[e.GuitarString5 = 59448] = "GuitarString5",
        e[e.GuitarString6 = 59449] = "GuitarString6",
        e[e.GuitarString7 = 59450] = "GuitarString7",
        e[e.GuitarString8 = 59451] = "GuitarString8",
        e[e.GuitarString9 = 59452] = "GuitarString9",
        e[e.GuitarGolpe = 59458] = "GuitarGolpe",
        e[e.FretboardX = 59481] = "FretboardX",
        e[e.FretboardO = 59482] = "FretboardO",
        e[e.WiggleTrill = 60068] = "WiggleTrill",
        e[e.WiggleVibratoMediumFast = 60126] = "WiggleVibratoMediumFast",
        e[e.OctaveBaselineM = 60565] = "OctaveBaselineM",
        e[e.OctaveBaselineB = 60563] = "OctaveBaselineB"
    }(I || (I = {})),
    function(e) {
        e[e.Left = 0] = "Left",
        e[e.Center = 1] = "Center",
        e[e.Right = 2] = "Right"
    }(A || (A = {})),
    function(e) {
        e[e.Top = 0] = "Top",
        e[e.Middle = 1] = "Middle",
        e[e.Bottom = 2] = "Bottom"
    }(G || (G = {}));
    class lt {
        constructor(e="", t=0, s=0, i=I.None, n=I.None, r=I.None, a=I.None, o=G.Middle) {
            this.elementType = e,
            this.outputMidiNumber = s,
            this.staffLine = t,
            this.noteHeadDefault = i,
            this.noteHeadHalf = n !== I.None ? n : i,
            this.noteHeadWhole = r !== I.None ? r : i,
            this.techniqueSymbol = a,
            this.techniqueSymbolPlacement = o
        }
        getSymbol(e) {
            switch (e) {
            case d.Whole:
                return this.noteHeadWhole;
            case d.Half:
                return this.noteHeadHalf;
            default:
                return this.noteHeadDefault
            }
        }
    }
    class ct {
        static articulationFromElementVariation(e, t) {
            return e < ct.gp6ElementAndVariationToArticulation.length ? (t >= ct.gp6ElementAndVariationToArticulation.length && (t = 0),
            ct.gp6ElementAndVariationToArticulation[e][t]) : 38
        }
        static getArticulation(e) {
            const t = e.percussionArticulation
              , s = e.beat.voice.bar.staff.track.percussionArticulations;
            return t < s.length ? s[t] : ct.getArticulationByValue(t)
        }
        static getElementAndVariation(e) {
            const t = ct.getArticulation(e);
            if (!t)
                return [-1, -1];
            for (let e = 0; e < ct.gp6ElementAndVariationToArticulation.length; e++) {
                const s = ct.gp6ElementAndVariationToArticulation[e];
                for (let i = 0; i < s.length; i++) {
                    const n = ct.getArticulationByValue(s[i]);
                    if ((null == n ? void 0 : n.outputMidiNumber) === t.outputMidiNumber)
                        return [e, i]
                }
            }
            return [-1, -1]
        }
        static getArticulationByValue(e) {
            return ct.instrumentArticulations.has(e) ? ct.instrumentArticulations.get(e) : null
        }
    }
    ct.gp6ElementAndVariationToArticulation = [[35, 35, 35], [38, 91, 37], [99, 100, 99], [56, 100, 56], [102, 103, 102], [43, 43, 43], [45, 45, 45], [47, 47, 47], [48, 48, 48], [50, 50, 50], [42, 92, 46], [44, 44, 44], [57, 98, 57], [49, 97, 49], [55, 95, 55], [51, 93, 127], [52, 96, 52]],
    ct.instrumentArticulations = new Map([[38, new lt("snare",3,38,I.NoteheadBlack,I.NoteheadHalf,I.NoteheadWhole)], [37, new lt("snare",3,37,I.NoteheadXBlack,I.NoteheadXBlack,I.NoteheadXBlack)], [91, new lt("snare",3,38,I.NoteheadDiamondWhite,I.NoteheadDiamondWhite,I.NoteheadDiamondWhite)], [42, new lt("hiHat",-1,42,I.NoteheadXBlack,I.NoteheadXBlack,I.NoteheadXBlack)], [92, new lt("hiHat",-1,46,I.NoteheadCircleSlash,I.NoteheadCircleSlash,I.NoteheadCircleSlash)], [46, new lt("hiHat",-1,46,I.NoteheadCircleX,I.NoteheadCircleX,I.NoteheadCircleX)], [44, new lt("hiHat",9,44,I.NoteheadXBlack,I.NoteheadXBlack,I.NoteheadXBlack)], [35, new lt("kickDrum",8,35,I.NoteheadBlack,I.NoteheadHalf,I.NoteheadWhole)], [36, new lt("kickDrum",7,36,I.NoteheadBlack,I.NoteheadHalf,I.NoteheadWhole)], [50, new lt("tom",1,50,I.NoteheadBlack,I.NoteheadHalf,I.NoteheadWhole)], [48, new lt("tom",2,48,I.NoteheadBlack,I.NoteheadHalf,I.NoteheadWhole)], [47, new lt("tom",4,47,I.NoteheadBlack,I.NoteheadHalf,I.NoteheadWhole)], [45, new lt("tom",5,45,I.NoteheadBlack,I.NoteheadHalf,I.NoteheadWhole)], [43, new lt("tom",6,43,I.NoteheadBlack,I.NoteheadHalf,I.NoteheadWhole)], [93, new lt("ride",0,51,I.NoteheadXBlack,I.NoteheadXBlack,I.NoteheadXBlack,I.PictEdgeOfCymbal,G.Bottom)], [51, new lt("ride",0,51,I.NoteheadXBlack,I.NoteheadXBlack,I.NoteheadXBlack)], [53, new lt("ride",0,53,I.NoteheadDiamondWhite,I.NoteheadDiamondWhite,I.NoteheadDiamondWhite)], [94, new lt("ride",0,51,I.NoteheadXBlack,I.NoteheadXBlack,I.NoteheadXBlack,I.ArticStaccatoAbove,G.Top)], [55, new lt("splash",-2,55,I.NoteheadXBlack,I.NoteheadXBlack,I.NoteheadXBlack)], [95, new lt("splash",-2,55,I.NoteheadXBlack,I.NoteheadXBlack,I.NoteheadXBlack,I.ArticStaccatoAbove,G.Bottom)], [52, new lt("china",-3,52,I.NoteheadHeavyXHat,I.NoteheadHeavyXHat,I.NoteheadHeavyXHat)], [96, new lt("china",-3,52,I.NoteheadHeavyXHat,I.NoteheadHeavyXHat,I.NoteheadHeavyXHat)], [49, new lt("crash",-2,49,I.NoteheadHeavyX,I.NoteheadHeavyX,I.NoteheadHeavyX)], [97, new lt("crash",-2,49,I.NoteheadHeavyX,I.NoteheadHeavyX,I.NoteheadHeavyX,I.ArticStaccatoAbove,G.Bottom)], [57, new lt("crash",-1,57,I.NoteheadHeavyX,I.NoteheadHeavyX,I.NoteheadHeavyX)], [98, new lt("crash",-1,57,I.NoteheadHeavyX,I.NoteheadHeavyX,I.NoteheadHeavyX,I.ArticStaccatoAbove,G.Bottom)], [99, new lt("cowbell",1,56,I.NoteheadTriangleUpBlack,I.NoteheadTriangleUpHalf,I.NoteheadTriangleUpWhole)], [100, new lt("cowbell",1,56,I.NoteheadXBlack,I.NoteheadXHalf,I.NoteheadXWhole)], [56, new lt("cowbell",0,56,I.NoteheadTriangleUpBlack,I.NoteheadTriangleUpHalf,I.NoteheadTriangleUpWhole)], [101, new lt("cowbell",0,56,I.NoteheadXBlack,I.NoteheadXHalf,I.NoteheadXWhole)], [102, new lt("cowbell",-1,56,I.NoteheadTriangleUpBlack,I.NoteheadTriangleUpHalf,I.NoteheadTriangleUpWhole)], [103, new lt("cowbell",-1,56,I.NoteheadXBlack,I.NoteheadXHalf,I.NoteheadXWhole)], [77, new lt("woodblock",-9,77,I.NoteheadTriangleUpBlack,I.NoteheadTriangleUpBlack,I.NoteheadTriangleUpBlack)], [76, new lt("woodblock",-10,76,I.NoteheadTriangleUpBlack,I.NoteheadTriangleUpBlack,I.NoteheadTriangleUpBlack)], [60, new lt("bongo",-4,60,I.NoteheadBlack,I.NoteheadHalf,I.NoteheadWhole)], [104, new lt("bongo",-5,60,I.NoteheadBlack,I.NoteheadHalf,I.NoteheadWhole,I.NoteheadParenthesis,G.Middle)], [105, new lt("bongo",-6,60,I.NoteheadXBlack,I.NoteheadXBlack,I.NoteheadXBlack)], [61, new lt("bongo",-7,61,I.NoteheadBlack,I.NoteheadHalf,I.NoteheadWhole)], [106, new lt("bongo",-8,61,I.NoteheadBlack,I.NoteheadHalf,I.NoteheadWhole,I.NoteheadParenthesis,G.Middle)], [107, new lt("bongo",-16,61,I.NoteheadXBlack,I.NoteheadXBlack,I.NoteheadXBlack)], [66, new lt("timbale",10,66,I.NoteheadBlack,I.NoteheadHalf,I.NoteheadWhole)], [65, new lt("timbale",9,65,I.NoteheadBlack,I.NoteheadHalf,I.NoteheadWhole)], [68, new lt("agogo",12,68,I.NoteheadBlack,I.NoteheadHalf,I.NoteheadWhole)], [67, new lt("agogo",11,67,I.NoteheadBlack,I.NoteheadHalf,I.NoteheadWhole)], [64, new lt("conga",17,64,I.NoteheadBlack,I.NoteheadHalf,I.NoteheadWhole)], [108, new lt("conga",16,64,I.NoteheadXBlack,I.NoteheadXBlack,I.NoteheadXBlack)], [109, new lt("conga",15,64,I.NoteheadBlack,I.NoteheadHalf,I.NoteheadWhole,I.NoteheadParenthesis,G.Middle)], [63, new lt("conga",14,63,I.NoteheadBlack,I.NoteheadHalf,I.NoteheadWhole)], [110, new lt("conga",13,63,I.NoteheadXBlack,I.NoteheadXBlack,I.NoteheadXBlack)], [62, new lt("conga",19,62,I.NoteheadBlack,I.NoteheadHalf,I.NoteheadWhole,I.NoteheadParenthesis,G.Middle)], [72, new lt("whistle",-11,72,I.NoteheadBlack,I.NoteheadHalf,I.NoteheadWhole)], [71, new lt("whistle",-17,71,I.NoteheadBlack,I.NoteheadHalf,I.NoteheadWhole)], [73, new lt("guiro",38,73,I.NoteheadBlack,I.NoteheadHalf,I.NoteheadWhole)], [74, new lt("guiro",37,74,I.NoteheadBlack,I.NoteheadHalf,I.NoteheadWhole)], [86, new lt("surdo",36,86,I.NoteheadBlack,I.NoteheadHalf,I.NoteheadWhole)], [87, new lt("surdo",35,87,I.NoteheadXBlack,I.NoteheadXBlack,I.NoteheadXBlack,I.NoteheadParenthesis,G.Middle)], [54, new lt("tambourine",3,54,I.NoteheadTriangleUpBlack,I.NoteheadTriangleUpBlack,I.NoteheadTriangleUpBlack)], [111, new lt("tambourine",2,54,I.NoteheadTriangleUpBlack,I.NoteheadTriangleUpBlack,I.NoteheadTriangleUpBlack,I.StringsUpBow,G.Bottom)], [112, new lt("tambourine",1,54,I.NoteheadTriangleUpBlack,I.NoteheadTriangleUpBlack,I.NoteheadTriangleUpBlack,I.StringsDownBow,G.Bottom)], [113, new lt("tambourine",-7,54,I.NoteheadXBlack,I.NoteheadXBlack,I.NoteheadXBlack)], [79, new lt("cuica",30,79,I.NoteheadBlack,I.NoteheadHalf,I.NoteheadWhole)], [78, new lt("cuica",29,78,I.NoteheadXBlack,I.NoteheadXBlack,I.NoteheadXBlack)], [58, new lt("vibraslap",28,58,I.NoteheadBlack,I.NoteheadHalf,I.NoteheadWhole)], [81, new lt("triangle",27,81,I.NoteheadBlack,I.NoteheadHalf,I.NoteheadWhole)], [80, new lt("triangle",26,80,I.NoteheadXBlack,I.NoteheadXBlack,I.NoteheadXBlack,I.NoteheadParenthesis,G.Middle)], [114, new lt("grancassa",25,43,I.NoteheadBlack,I.NoteheadHalf,I.NoteheadWhole)], [115, new lt("piatti",18,49,I.NoteheadBlack,I.NoteheadHalf,I.NoteheadWhole)], [116, new lt("piatti",24,49,I.NoteheadXBlack,I.NoteheadXBlack,I.NoteheadXBlack)], [69, new lt("cabasa",23,69,I.NoteheadBlack,I.NoteheadHalf,I.NoteheadWhole)], [117, new lt("cabasa",22,69,I.NoteheadBlack,I.NoteheadHalf,I.NoteheadWhole,I.StringsUpBow,G.Bottom)], [85, new lt("castanets",21,85,I.NoteheadBlack,I.NoteheadHalf,I.NoteheadWhole)], [75, new lt("claves",20,75,I.NoteheadBlack,I.NoteheadHalf,I.NoteheadWhole)], [70, new lt("maraca",-12,70,I.NoteheadBlack,I.NoteheadHalf,I.NoteheadWhole)], [118, new lt("maraca",-13,70,I.NoteheadBlack,I.NoteheadHalf,I.NoteheadWhole,I.StringsUpBow,G.Bottom)], [119, new lt("maraca",-14,70,I.NoteheadBlack,I.NoteheadHalf,I.NoteheadWhole)], [120, new lt("maraca",-15,70,I.NoteheadBlack,I.NoteheadHalf,I.NoteheadWhole,I.StringsUpBow,G.Bottom)], [82, new lt("shaker",-23,54,I.NoteheadBlack,I.NoteheadHalf,I.NoteheadWhole)], [122, new lt("shaker",-24,54,I.NoteheadBlack,I.NoteheadHalf,I.NoteheadWhole,I.StringsUpBow,G.Bottom)], [84, new lt("bellTree",-18,53,I.NoteheadBlack,I.NoteheadHalf,I.NoteheadWhole)], [123, new lt("bellTree",-19,53,I.NoteheadBlack,I.NoteheadHalf,I.NoteheadWhole,I.StringsUpBow,G.Bottom)], [83, new lt("jingleBell",-20,53,I.NoteheadBlack,I.NoteheadHalf,I.NoteheadWhole)], [124, new lt("unpitched",-21,62,I.NoteheadNull,I.NoteheadNull,I.NoteheadNull,I.GuitarGolpe,G.Top)], [125, new lt("unpitched",-22,62,I.NoteheadNull,I.NoteheadNull,I.NoteheadNull,I.GuitarGolpe,G.Bottom)], [39, new lt("handClap",3,39,I.NoteheadBlack,I.NoteheadHalf,I.NoteheadWhole)], [40, new lt("snare",3,40,I.NoteheadBlack,I.NoteheadHalf,I.NoteheadWhole)], [31, new lt("snare",3,40,I.NoteheadSlashedBlack2,I.NoteheadSlashedBlack2,I.NoteheadSlashedBlack2)], [41, new lt("tom",5,41,I.NoteheadBlack,I.NoteheadHalf,I.NoteheadWhole)], [59, new lt("ride",2,59,I.NoteheadXBlack,I.NoteheadXBlack,I.NoteheadXBlack,I.PictEdgeOfCymbal,G.Bottom)], [126, new lt("ride",2,59,I.NoteheadXBlack,I.NoteheadXBlack,I.NoteheadXBlack)], [127, new lt("ride",2,59,I.NoteheadDiamondWhite,I.NoteheadDiamondWhite,I.NoteheadDiamondWhite)], [29, new lt("ride",2,59,I.NoteheadXBlack,I.NoteheadXBlack,I.NoteheadXBlack,I.ArticStaccatoAbove,G.Top)], [30, new lt("crash",-3,49,I.NoteheadXBlack,I.NoteheadXBlack,I.NoteheadXBlack)], [33, new lt("snare",3,37,I.NoteheadXBlack,I.NoteheadXBlack,I.NoteheadXBlack)], [34, new lt("snare",3,38,I.NoteheadBlack,I.NoteheadBlack,I.NoteheadBlack)]]);
    class dt {
        constructor() {
            this.id = ++dt.GlobalNoteId,
            this.index = 0,
            this.accentuated = a.None,
            this.bendType = l.None,
            this.bendStyle = h.Default,
            this.bendOrigin = null,
            this.isContinuedBend = !1,
            this.bendPoints = [],
            this.maxBendPoint = null,
            this.fret = -1,
            this.string = -1,
            this.octave = -1,
            this.tone = -1,
            this.percussionArticulation = -1,
            this.isVisible = !0,
            this.isLeftHandTapped = !1,
            this.isHammerPullOrigin = !1,
            this.hammerPullOriginNoteId = -1,
            this.hammerPullDestinationNoteId = -1,
            this.isSlurDestination = !1,
            this.slurOriginNoteId = -1,
            this.slurDestinationNoteId = -1,
            this.harmonicType = M.None,
            this.harmonicValue = 0,
            this.isGhost = !1,
            this.isLetRing = !1,
            this.letRingDestination = null,
            this.isPalmMute = !1,
            this.palmMuteDestination = null,
            this.isDead = !1,
            this.isStaccato = !1,
            this.slideInType = f.None,
            this.slideOutType = m.None,
            this.slideTarget = null,
            this.slideOrigin = null,
            this.vibrato = b.None,
            this.tieOriginNoteId = -1,
            this.tieDestinationNoteId = -1,
            this.isTieDestination = !1,
            this.leftHandFinger = E.Unknown,
            this.rightHandFinger = E.Unknown,
            this.isFingering = !1,
            this.trillValue = -1,
            this.trillSpeed = d.ThirtySecond,
            this.durationPercent = 1,
            this.accidentalMode = D.Default,
            this.dynamics = u.F,
            this.isEffectSlurOrigin = !1,
            this.hasEffectSlur = !1,
            this.effectSlurOrigin = null,
            this.effectSlurDestination = null,
            this.glyphTags = []
        }
        get hasBend() {
            return this.bendType !== l.None
        }
        get isStringed() {
            return this.string >= 0
        }
        get isPiano() {
            return !this.isStringed && this.octave >= 0 && this.tone >= 0
        }
        get isPercussion() {
            return !this.isStringed && this.percussionArticulation >= 0
        }
        get element() {
            return this.isPercussion ? ct.getElementAndVariation(this)[0] : -1
        }
        get variation() {
            return this.isPercussion ? ct.getElementAndVariation(this)[1] : -1
        }
        get isHammerPullDestination() {
            return !!this.hammerPullOrigin
        }
        get hammerPullOrigin() {
            return -1 === this.hammerPullOriginNoteId ? null : this.beat.voice.bar.staff.track.score.getNoteById(this.hammerPullOriginNoteId)
        }
        get hammerPullDestination() {
            return -1 === this.hammerPullDestinationNoteId ? null : this.beat.voice.bar.staff.track.score.getNoteById(this.hammerPullDestinationNoteId)
        }
        get isSlurOrigin() {
            return !!this.slurDestination
        }
        get slurOrigin() {
            return -1 === this.slurOriginNoteId ? null : this.beat.voice.bar.staff.track.score.getNoteById(this.slurOriginNoteId)
        }
        get slurDestination() {
            return -1 === this.slurDestinationNoteId ? null : this.beat.voice.bar.staff.track.score.getNoteById(this.slurDestinationNoteId)
        }
        get isHarmonic() {
            return this.harmonicType !== M.None
        }
        get tieOrigin() {
            return -1 === this.tieOriginNoteId ? null : this.beat.voice.bar.staff.track.score.getNoteById(this.tieOriginNoteId)
        }
        get tieDestination() {
            return -1 === this.tieDestinationNoteId ? null : this.beat.voice.bar.staff.track.score.getNoteById(this.tieDestinationNoteId)
        }
        get isTieOrigin() {
            return -1 !== this.tieDestinationNoteId
        }
        get trillFret() {
            return this.trillValue - this.stringTuning
        }
        get isTrill() {
            return this.trillValue >= 0
        }
        get isEffectSlurDestination() {
            return !!this.effectSlurOrigin
        }
        get stringTuning() {
            return this.beat.voice.bar.staff.capo + dt.getStringTuning(this.beat.voice.bar.staff, this.string)
        }
        static getStringTuning(e, t) {
            return e.tuning.length > 0 ? e.tuning[e.tuning.length - (t - 1) - 1] : 0
        }
        get realValue() {
            let e = this.realValueWithoutHarmonic;
            return this.isStringed && (this.harmonicType === M.Natural ? e = this.harmonicPitch + this.stringTuning - this.beat.voice.bar.staff.transpositionPitch : e += this.harmonicPitch),
            e
        }
        get realValueWithoutHarmonic() {
            return this.isPercussion ? this.percussionArticulation : this.isStringed ? this.fret + this.stringTuning - this.beat.voice.bar.staff.transpositionPitch : this.isPiano ? 12 * this.octave + this.tone - this.beat.voice.bar.staff.transpositionPitch : 0
        }
        get harmonicPitch() {
            if (this.harmonicType === M.None || !this.isStringed)
                return 0;
            let e = this.harmonicValue;
            return ht.isAlmostEqualTo(e, 2.4) ? 36 : ht.isAlmostEqualTo(e, 2.7) ? 34 : e < 3 ? 0 : e <= 3.5 ? 31 : e <= 4 ? 28 : e <= 5 ? 24 : e <= 6 ? 34 : e <= 7 ? 19 : e <= 8.5 ? 36 : e <= 9 ? 28 : e <= 10 ? 34 : e <= 11 ? 0 : e <= 12 ? 12 : e < 14 ? 0 : e <= 15 ? 34 : e <= 16 ? 28 : e <= 17 ? 36 : e <= 18 ? 0 : e <= 19 ? 19 : e <= 21 ? 0 : e <= 22 ? 36 : e <= 24 ? 24 : 0
        }
        get initialBendValue() {
            return this.hasBend ? Math.floor(this.bendPoints[0].value / 2) : this.bendOrigin ? Math.floor(this.bendOrigin.bendPoints[this.bendOrigin.bendPoints.length - 1].value / 2) : this.isTieDestination && this.tieOrigin.bendOrigin ? Math.floor(this.tieOrigin.bendOrigin.bendPoints[this.tieOrigin.bendOrigin.bendPoints.length - 1].value / 2) : this.beat.hasWhammyBar ? Math.floor(this.beat.whammyBarPoints[0].value / 2) : this.beat.isContinuedWhammy ? Math.floor(this.beat.previousBeat.whammyBarPoints[this.beat.previousBeat.whammyBarPoints.length - 1].value / 2) : 0
        }
        get displayValue() {
            return this.displayValueWithoutBend + this.initialBendValue
        }
        get displayValueWithoutBend() {
            let e = this.realValue;
            switch (this.harmonicType !== M.Natural && this.harmonicType !== M.None && (e -= this.harmonicPitch),
            this.beat.ottava) {
            case R._15ma:
                e -= 24;
                break;
            case R._8va:
                e -= 12;
                break;
            case R.Regular:
                break;
            case R._8vb:
                e += 12;
                break;
            case R._15mb:
                e += 24
            }
            switch (this.beat.voice.bar.clefOttava) {
            case R._15ma:
                e -= 24;
                break;
            case R._8va:
                e -= 12;
                break;
            case R.Regular:
                break;
            case R._8vb:
                e += 12;
                break;
            case R._15mb:
                e += 24
            }
            return e - this.beat.voice.bar.staff.displayTranspositionPitch
        }
        get hasQuarterToneOffset() {
            return this.hasBend ? this.bendPoints[0].value % 2 != 0 : this.bendOrigin ? this.bendOrigin.bendPoints[this.bendOrigin.bendPoints.length - 1].value % 2 != 0 : this.beat.hasWhammyBar ? this.beat.whammyBarPoints[0].value % 2 != 0 : !!this.beat.isContinuedWhammy && this.beat.previousBeat.whammyBarPoints[this.beat.previousBeat.whammyBarPoints.length - 1].value % 2 != 0
        }
        addBendPoint(e) {
            this.bendPoints.push(e),
            (!this.maxBendPoint || e.value > this.maxBendPoint.value) && (this.maxBendPoint = e),
            this.bendType === l.None && (this.bendType = l.Custom)
        }
        finish(e) {
            let t = new rt(( () => dt.nextNoteOnSameLine(this)))
              , s = e && e.notation.notationMode === B.SongBook;
            if (this.isTieDestination && (this.chain(),
            s && this.tieOrigin && this.tieOrigin.isLetRing && (this.isLetRing = !0)),
            this.isLetRing && (t.value && t.value.isLetRing ? this.letRingDestination = t.value : this.letRingDestination = this,
            s && this.isTieDestination && !this.tieOrigin.hasBend && (this.isVisible = !1)),
            this.isPalmMute && (t.value && t.value.isPalmMute ? this.palmMuteDestination = t.value : this.palmMuteDestination = this),
            this.isHammerPullOrigin) {
                let e = dt.findHammerPullDestination(this);
                e ? (this.hammerPullDestinationNoteId = e.id,
                e.hammerPullOriginNoteId = this.id) : this.isHammerPullOrigin = !1
            }
            switch (this.slideOutType) {
            case m.Shift:
            case m.Legato:
                this.slideTarget = t.value,
                this.slideTarget ? this.slideTarget.slideOrigin = this : this.slideOutType = m.None
            }
            let i = null;
            if (this.isHammerPullOrigin && this.hammerPullDestination ? i = this.hammerPullDestination : this.slideOutType === m.Legato && this.slideTarget && (i = this.slideTarget),
            i && (this.hasEffectSlur = !0,
            this.effectSlurOrigin && this.beat.pickStroke === O.None ? (this.effectSlurOrigin.effectSlurDestination = i,
            this.effectSlurOrigin.effectSlurDestination.effectSlurOrigin = this.effectSlurOrigin,
            this.effectSlurOrigin = null) : (this.isEffectSlurOrigin = !0,
            this.effectSlurDestination = i,
            this.effectSlurDestination.effectSlurOrigin = this)),
            this.bendPoints.length > 0 && this.bendType === l.Custom) {
                let e = this.isTieDestination && this.tieOrigin.hasBend;
                if (this.isContinuedBend = e,
                4 === this.bendPoints.length) {
                    let t = this.bendPoints[0]
                      , s = this.bendPoints[1]
                      , i = this.bendPoints[2]
                      , n = this.bendPoints[3];
                    s.value === i.value ? n.value > t.value ? s.value > n.value ? this.bendType = l.BendRelease : !e && t.value > 0 ? (this.bendType = l.PrebendBend,
                    this.bendPoints.splice(2, 1),
                    this.bendPoints.splice(1, 1)) : (this.bendType = l.Bend,
                    this.bendPoints.splice(2, 1),
                    this.bendPoints.splice(1, 1)) : n.value < t.value ? e ? (this.bendType = l.Release,
                    this.bendPoints.splice(2, 1),
                    this.bendPoints.splice(1, 1)) : (this.bendType = l.PrebendRelease,
                    this.bendPoints.splice(2, 1),
                    this.bendPoints.splice(1, 1)) : s.value > t.value ? this.bendType = l.BendRelease : t.value > 0 && !e ? (this.bendType = l.Prebend,
                    this.bendPoints.splice(2, 1),
                    this.bendPoints.splice(1, 1)) : (this.bendType = l.Hold,
                    this.bendPoints.splice(2, 1),
                    this.bendPoints.splice(1, 1)) : _e.warning("Model", "Unsupported bend type detected, fallback to custom", null)
                } else if (2 === this.bendPoints.length) {
                    let t = this.bendPoints[0]
                      , s = this.bendPoints[1];
                    s.value > t.value ? !e && t.value > 0 ? this.bendType = l.PrebendBend : this.bendType = l.Bend : s.value < t.value ? this.bendType = e ? l.Release : l.PrebendRelease : this.bendType = l.Hold
                }
            } else
                0 === this.bendPoints.length && (this.bendType = l.None);
            this.initialBendValue > 0 && (this.accidentalMode = D.Default)
        }
        static nextNoteOnSameLine(e) {
            let t = e.beat.nextBeat;
            for (; t && t.voice.bar.index <= e.beat.voice.bar.index + dt.MaxOffsetForSameLineSearch; ) {
                let s = t.getNoteOnString(e.string);
                if (s)
                    return s;
                t = t.nextBeat
            }
            return null
        }
        static findHammerPullDestination(e) {
            let t = e.beat.nextBeat;
            for (; t && t.voice.bar.index <= e.beat.voice.bar.index + dt.MaxOffsetForSameLineSearch; ) {
                let s = t.getNoteOnString(e.string);
                if (s)
                    return s;
                for (let i = e.string; i > 0; i--)
                    if (s = t.getNoteOnString(i),
                    s) {
                        if (s.isLeftHandTapped)
                            return s;
                        break
                    }
                for (let i = e.string; i <= e.beat.voice.bar.staff.tuning.length; i++)
                    if (s = t.getNoteOnString(i),
                    s) {
                        if (s.isLeftHandTapped)
                            return s;
                        break
                    }
                t = t.nextBeat
            }
            return null
        }
        static findTieOrigin(e) {
            let t = e.beat.previousBeat;
            for (; t && t.voice.bar.index >= e.beat.voice.bar.index - dt.MaxOffsetForSameLineSearch; ) {
                if (e.isStringed) {
                    let s = t.getNoteOnString(e.string);
                    if (s)
                        return s
                } else if (-1 === e.octave && -1 === e.tone) {
                    if (e.index < t.notes.length)
                        return t.notes[e.index]
                } else {
                    let s = t.getNoteWithRealValue(e.realValue);
                    if (s)
                        return s
                }
                t = t.previousBeat
            }
            return null
        }
        chain() {
            if (this.beat.voice.bar.staff.track.score.registerNote(this),
            !this.isTieDestination)
                return;
            let e;
            -1 === this.tieOriginNoteId ? (e = dt.findTieOrigin(this),
            this.tieOriginNoteId = e ? e.id : -1) : e = this.tieOrigin,
            e ? (e.tieDestinationNoteId = this.id,
            this.fret = e.fret,
            this.octave = e.octave,
            this.tone = e.tone,
            e.hasBend && (this.bendOrigin = this.tieOrigin)) : this.isTieDestination = !1
        }
    }
    dt.GlobalNoteId = 0,
    dt.MaxOffsetForSameLineSearch = 3,
    function(e) {
        e[e.Neutral = 0] = "Neutral",
        e[e.C3 = 1] = "C3",
        e[e.C4 = 2] = "C4",
        e[e.F4 = 3] = "F4",
        e[e.G2 = 4] = "G2"
    }(H || (H = {}));
    class ut {
        constructor() {
            this.id = ++ut.GlobalBarId,
            this.index = 0,
            this.nextBar = null,
            this.previousBar = null,
            this.clef = H.G2,
            this.clefOttava = R.Regular,
            this.voices = [],
            this.simileMark = g.None,
            this.isMultiVoice = !1
        }
        get masterBar() {
            return this.staff.track.score.masterBars[this.index]
        }
        get isEmpty() {
            for (let e = 0, t = this.voices.length; e < t; e++)
                if (!this.voices[e].isEmpty)
                    return !1;
            return !0
        }
        addVoice(e) {
            e.bar = this,
            e.index = this.voices.length,
            this.voices.push(e)
        }
        finish(e) {
            this.isMultiVoice = !1;
            for (let t = 0, s = this.voices.length; t < s; t++) {
                let s = this.voices[t];
                s.finish(e),
                t > 0 && !s.isEmpty && (this.isMultiVoice = !0)
            }
        }
        calculateDuration() {
            let e = 0;
            for (let t of this.voices) {
                let s = t.calculateDuration();
                s > e && (e = s)
            }
            return e
        }
    }
    ut.GlobalBarId = 0;
    class pt {
        constructor() {
            this.beats = [],
            this.id = "empty",
            this.isComplete = !1
        }
        addBeat(e) {
            0 === this.beats.length && (this.id = e.absoluteDisplayStart + "_" + e.voice.index),
            e.graceIndex = this.beats.length,
            e.graceGroup = this,
            this.beats.push(e)
        }
    }
    !function(e) {
        e[e.None = 0] = "None",
        e[e.Crescendo = 1] = "Crescendo",
        e[e.Decrescendo = 2] = "Decrescendo"
    }(V || (V = {}));
    class gt {
        constructor(e) {
            this._isEqualLengthTuplet = !0,
            this.totalDuration = 0,
            this.beats = [],
            this.isFull = !1,
            this.voice = e
        }
        check(e) {
            if (0 === this.beats.length)
                return this.beats.push(e),
                this.totalDuration += e.playbackDuration,
                !0;
            if (e.graceType !== p.None)
                return !0;
            if (e.voice !== this.voice || this.isFull || e.tupletNumerator !== this.beats[0].tupletNumerator || e.tupletDenominator !== this.beats[0].tupletDenominator)
                return !1;
            if (e.playbackDuration !== this.beats[0].playbackDuration && (this._isEqualLengthTuplet = !1),
            this.beats.push(e),
            this.totalDuration += e.playbackDuration,
            this._isEqualLengthTuplet)
                this.beats.length === this.beats[0].tupletNumerator && (this.isFull = !0);
            else {
                let e = this.beats[0].tupletNumerator / this.beats[0].tupletDenominator | 0;
                for (let t of gt.AllTicks)
                    if (this.totalDuration === t * e) {
                        this.isFull = !0;
                        break
                    }
            }
            return !0
        }
    }
    gt.HalfTicks = 1920,
    gt.QuarterTicks = 960,
    gt.EighthTicks = 480,
    gt.SixteenthTicks = 240,
    gt.ThirtySecondTicks = 120,
    gt.SixtyFourthTicks = 60,
    gt.OneHundredTwentyEighthTicks = 30,
    gt.TwoHundredFiftySixthTicks = 15,
    gt.AllTicks = [gt.HalfTicks, gt.QuarterTicks, gt.EighthTicks, gt.SixteenthTicks, gt.ThirtySecondTicks, gt.SixtyFourthTicks, gt.OneHundredTwentyEighthTicks, gt.TwoHundredFiftySixthTicks],
    function(e) {
        e[e.Off = 0] = "Off",
        e[e.Press = 1] = "Press",
        e[e.Release = 2] = "Release",
        e[e.ReleaseThenPress = 3] = "ReleaseThenPress",
        e[e.Hold = 4] = "Hold"
    }(W || (W = {})),
    function(e) {
        e[e.Auto = 0] = "Auto",
        e[e.ForceSplitToNext = 1] = "ForceSplitToNext",
        e[e.ForceMergeWithNext = 2] = "ForceMergeWithNext"
    }(z || (z = {}));
    class ft {
        constructor() {
            this.id = ++ft.GlobalBeatId,
            this.index = 0,
            this.previousBeat = null,
            this.nextBeat = null,
            this.notes = [],
            this.noteStringLookup = new Map,
            this.noteValueLookup = new Map,
            this.isEmpty = !1,
            this.isDumb = !1,
            this.whammyStyle = h.Default,
            this.ottava = R.Regular,
            this.fermata = null,
            this.isLegatoOrigin = !1,
            this.minNote = null,
            this.maxNote = null,
            this.maxStringNote = null,
            this.minStringNote = null,
            this.duration = d.Quarter,
            this.isLetRing = !1,
            this.isPalmMute = !1,
            this.automations = [],
            this.dots = 0,
            this.fadeIn = !1,
            this.lyrics = null,
            this.hasRasgueado = !1,
            this.pop = !1,
            this.slap = !1,
            this.tap = !1,
            this.text = null,
            this.brushType = c.None,
            this.brushDuration = 0,
            this.tupletDenominator = -1,
            this.tupletNumerator = -1,
            this.tupletGroup = null,
            this.isContinuedWhammy = !1,
            this.whammyBarType = S.None,
            this.whammyBarPoints = [],
            this.maxWhammyPoint = null,
            this.minWhammyPoint = null,
            this.vibrato = b.None,
            this.chordId = null,
            this.sustainPedal = W.Off,
            this.graceType = p.None,
            this.graceGroup = null,
            this.graceIndex = -1,
            this.pickStroke = O.None,
            this.tremoloSpeed = null,
            this.crescendo = V.None,
            this.displayStart = 0,
            this.playbackStart = 0,
            this.displayDuration = 0,
            this.playbackDuration = 0,
            this.dynamics = u.F,
            this.invertBeamDirection = !1,
            this.preferredBeamDirection = null,
            this.isEffectSlurOrigin = !1,
            this.effectSlurOrigin = null,
            this.effectSlurDestination = null,
            this.beamingMode = z.Auto
        }
        get isLastOfVoice() {
            return this.index === this.voice.beats.length - 1
        }
        get isLegatoDestination() {
            return !!this.previousBeat && this.previousBeat.isLegatoOrigin
        }
        get isRest() {
            return this.isEmpty || 0 === this.notes.length
        }
        get isFullBarRest() {
            return this.isRest && 1 === this.voice.beats.length && this.duration === d.Whole
        }
        get hasTuplet() {
            return !(-1 === this.tupletDenominator && -1 === this.tupletNumerator || 1 === this.tupletDenominator && 1 === this.tupletNumerator)
        }
        get hasWhammyBar() {
            return this.whammyBarType !== S.None
        }
        get hasChord() {
            return !!this.chordId
        }
        get chord() {
            return this.chordId ? this.voice.bar.staff.chords.get(this.chordId) : null
        }
        get isSustainOn() {
            return [W.Hold, W.Press, W.ReleaseThenPress].includes(this.sustainPedal)
        }
        get isTremolo() {
            return !!this.tremoloSpeed
        }
        get absoluteDisplayStart() {
            return this.voice.bar.masterBar.start + this.displayStart
        }
        get absolutePlaybackStart() {
            return this.voice.bar.masterBar.start + this.playbackStart
        }
        get isEffectSlurDestination() {
            return !!this.effectSlurOrigin
        }
        addWhammyBarPoint(e) {
            this.whammyBarPoints.push(e),
            (!this.maxWhammyPoint || e.value > this.maxWhammyPoint.value) && (this.maxWhammyPoint = e),
            (!this.minWhammyPoint || e.value < this.minWhammyPoint.value) && (this.minWhammyPoint = e),
            this.whammyBarType === S.None && (this.whammyBarType = S.Custom)
        }
        removeWhammyBarPoint(e) {
            if (e < 0 || e >= this.whammyBarPoints.length)
                return;
            this.whammyBarPoints.splice(e, 1);
            let t = this.whammyBarPoints[e];
            if (t === this.maxWhammyPoint) {
                this.maxWhammyPoint = null;
                for (let e of this.whammyBarPoints)
                    (!this.maxWhammyPoint || e.value > this.maxWhammyPoint.value) && (this.maxWhammyPoint = e)
            }
            if (t === this.minWhammyPoint) {
                this.minWhammyPoint = null;
                for (let e of this.whammyBarPoints)
                    (!this.minWhammyPoint || e.value < this.minWhammyPoint.value) && (this.minWhammyPoint = e)
            }
        }
        addNote(e) {
            e.beat = this,
            e.index = this.notes.length,
            this.notes.push(e),
            e.isStringed && this.noteStringLookup.set(e.string, e)
        }
        removeNote(e) {
            let t = this.notes.indexOf(e);
            t >= 0 && this.notes.splice(t, 1)
        }
        getAutomation(e) {
            for (let t = 0, s = this.automations.length; t < s; t++) {
                let s = this.automations[t];
                if (s.type === e)
                    return s
            }
            return null
        }
        getNoteOnString(e) {
            return this.noteStringLookup.has(e) ? this.noteStringLookup.get(e) : null
        }
        calculateDuration() {
            if (this.isFullBarRest)
                return this.voice.bar.masterBar.calculateDuration();
            let e = Z.toTicks(this.duration);
            return 2 === this.dots ? e = Z.applyDot(e, !0) : 1 === this.dots && (e = Z.applyDot(e, !1)),
            this.tupletDenominator > 0 && this.tupletNumerator >= 0 && (e = Z.applyTuplet(e, this.tupletNumerator, this.tupletDenominator)),
            e
        }
        updateDurations() {
            let e = this.calculateDuration();
            switch (this.playbackDuration = e,
            this.graceType) {
            case p.BeforeBeat:
            case p.OnBeat:
                switch (this.duration) {
                case d.Sixteenth:
                    this.playbackDuration = Z.toTicks(d.SixtyFourth);
                    break;
                case d.ThirtySecond:
                    this.playbackDuration = Z.toTicks(d.OneHundredTwentyEighth);
                    break;
                default:
                    this.playbackDuration = Z.toTicks(d.ThirtySecond)
                }
                this.displayDuration = 0;
                break;
            case p.BendGrace:
                this.playbackDuration /= 2,
                this.displayDuration = 0;
                break;
            default:
                this.displayDuration = e;
                let t = this.previousBeat;
                t && t.graceType === p.BendGrace && (this.playbackDuration = t.playbackDuration)
            }
        }
        finishTuplet() {
            let e = this.previousBeat
              , t = e ? e.tupletGroup : null;
            (this.hasTuplet || this.graceType !== p.None && t) && (e && t && t.check(this) || (t = new gt(this.voice),
            t.check(this)),
            this.tupletGroup = t)
        }
        finish(e) {
            switch (null === this.getAutomation(o.Instrument) && 0 === this.index && 0 === this.voice.index && 0 === this.voice.bar.index && this.voice.bar.staff.index,
            this.graceType) {
            case p.OnBeat:
            case p.BeforeBeat:
                let e = this.graceGroup.beats.length;
                this.duration = 1 === e ? d.Eighth : 2 === e ? d.Sixteenth : d.ThirtySecond
            }
            this.sustainPedal === W.Off && this.previousBeat && this.previousBeat.isSustainOn && (this.sustainPedal = W.Hold);
            let t = e ? e.notation.notationMode : B.GuitarPro
              , s = "grad" === this.text || "grad." === this.text;
            s && t === B.SongBook && (this.text = "");
            let i = !1;
            this.minNote = null,
            this.maxNote = null,
            this.minStringNote = null,
            this.maxStringNote = null;
            let n = 0
              , r = !1;
            for (let a = 0, o = this.notes.length; a < o; a++) {
                let o = this.notes[a];
                if (o.dynamics = this.dynamics,
                o.finish(e),
                o.isLetRing && (this.isLetRing = !0),
                o.isPalmMute && (this.isPalmMute = !0),
                t === B.SongBook && o.hasBend && this.graceType !== p.BendGrace) {
                    if (!o.isTieOrigin)
                        switch (o.bendType) {
                        case l.Bend:
                        case l.PrebendRelease:
                        case l.PrebendBend:
                            i = !0
                        }
                    s || o.bendStyle === h.Gradual ? (s = !0,
                    o.bendStyle = h.Gradual,
                    i = !1) : o.bendStyle = h.Fast
                }
                o.isVisible && (n++,
                (!this.minNote || o.realValue < this.minNote.realValue) && (this.minNote = o),
                (!this.maxNote || o.realValue > this.maxNote.realValue) && (this.maxNote = o),
                (!this.minStringNote || o.string < this.minStringNote.string) && (this.minStringNote = o),
                (!this.maxStringNote || o.string > this.maxStringNote.string) && (this.maxStringNote = o),
                o.hasEffectSlur && (r = !0))
            }
            if (r && (this.effectSlurOrigin ? (this.effectSlurOrigin.effectSlurDestination = this.nextBeat,
            this.effectSlurOrigin.effectSlurDestination && (this.effectSlurOrigin.effectSlurDestination.effectSlurOrigin = this.effectSlurOrigin),
            this.effectSlurOrigin = null) : (this.isEffectSlurOrigin = !0,
            this.effectSlurDestination = this.nextBeat,
            this.effectSlurDestination && (this.effectSlurDestination.effectSlurOrigin = this))),
            this.notes.length > 0 && 0 === n && (this.isEmpty = !0),
            this.isRest || this.isLetRing && this.isPalmMute)
                this.isRest && this.previousBeat && e && e.notation.notationMode === B.GuitarPro && (this.previousBeat.isLetRing && (this.isLetRing = !0),
                this.previousBeat.isPalmMute && (this.isPalmMute = !0));
            else {
                let e = this.previousBeat;
                for (; e && e.isRest; )
                    this.isLetRing || (e.isLetRing = !1),
                    this.isPalmMute || (e.isPalmMute = !1),
                    e = e.previousBeat
            }
            if (this.whammyBarPoints.length > 0 && this.whammyBarType === S.Custom) {
                t === B.SongBook && (this.whammyStyle = s ? h.Gradual : h.Fast);
                let e = !!this.previousBeat && this.previousBeat.hasWhammyBar;
                if (this.isContinuedWhammy = e,
                4 === this.whammyBarPoints.length) {
                    let s = this.whammyBarPoints[0]
                      , i = this.whammyBarPoints[1]
                      , n = this.whammyBarPoints[2]
                      , r = this.whammyBarPoints[3];
                    i.value === n.value ? s.value < i.value && i.value < r.value || s.value > i.value && i.value > r.value ? (0 === s.value || e ? this.whammyBarType = S.Dive : this.whammyBarType = S.PrediveDive,
                    this.whammyBarPoints.splice(2, 1),
                    this.whammyBarPoints.splice(1, 1)) : s.value > i.value && i.value < r.value || s.value < i.value && i.value > r.value ? (this.whammyBarType = S.Dip,
                    i.offset !== n.offset && t !== B.SongBook || this.whammyBarPoints.splice(2, 1)) : s.value === i.value && i.value === r.value ? (0 === s.value || e ? this.whammyBarType = S.Hold : this.whammyBarType = S.Predive,
                    this.whammyBarPoints.splice(2, 1),
                    this.whammyBarPoints.splice(1, 1)) : _e.warning("Model", "Unsupported whammy type detected, fallback to custom", null) : _e.warning("Model", "Unsupported whammy type detected, fallback to custom", null)
                }
            }
            if (this.updateDurations(),
            i) {
                let e = St.clone(this);
                e.id = ++ft.GlobalBeatId,
                e.pickStroke = O.None;
                for (let t = 0, s = e.notes.length; t < s; t++) {
                    let s = e.notes[t]
                      , i = this.notes[t];
                    if (s.bendType = l.None,
                    s.maxBendPoint = null,
                    s.bendPoints = [],
                    s.bendStyle = h.Default,
                    s.id = ++dt.GlobalNoteId,
                    i.isTieOrigin && (s.tieDestinationNoteId = i.tieDestination.id,
                    i.tieDestination.tieOriginNoteId = s.id),
                    i.isTieDestination && (s.tieOriginNoteId = i.tieOrigin ? i.tieOrigin.id : -1,
                    i.tieOrigin.tieDestinationNoteId = s.id),
                    i.hasBend && i.isTieOrigin) {
                        let e = dt.findTieOrigin(i);
                        if (e && e.hasBend) {
                            s.bendType = l.Hold;
                            let e = i.bendPoints[i.bendPoints.length - 1];
                            s.addBendPoint(new ye(0,e.value)),
                            s.addBendPoint(new ye(ye.MaxPosition,e.value))
                        }
                    }
                    s.isTieDestination = !0
                }
                this.graceType = p.BendGrace,
                this.graceGroup = new pt,
                this.graceGroup.addBeat(this),
                this.graceGroup.isComplete = !0,
                this.updateDurations(),
                this.voice.insertBeat(this, e)
            }
        }
        isBefore(e) {
            return this.voice.bar.index < e.voice.bar.index || e.voice.bar.index === this.voice.bar.index && this.index < e.index
        }
        isAfter(e) {
            return this.voice.bar.index > e.voice.bar.index || e.voice.bar.index === this.voice.bar.index && this.index > e.index
        }
        hasNoteOnString(e) {
            return this.noteStringLookup.has(e)
        }
        getNoteWithRealValue(e) {
            return this.noteValueLookup.has(e) ? this.noteValueLookup.get(e) : null
        }
        chain() {
            for (const e of this.notes)
                this.noteValueLookup.set(e.realValue, e),
                e.chain()
        }
    }
    ft.GlobalBeatId = 0;
    class mt {
        static clone(e) {
            const t = new ye;
            return t.offset = e.offset,
            t.value = e.value,
            t
        }
    }
    class yt {
        static clone(e) {
            const t = new dt;
            t.index = e.index,
            t.accentuated = e.accentuated,
            t.bendType = e.bendType,
            t.bendStyle = e.bendStyle,
            t.isContinuedBend = e.isContinuedBend,
            t.bendPoints = [];
            for (const s of e.bendPoints)
                t.addBendPoint(mt.clone(s));
            return t.fret = e.fret,
            t.string = e.string,
            t.octave = e.octave,
            t.tone = e.tone,
            t.percussionArticulation = e.percussionArticulation,
            t.isVisible = e.isVisible,
            t.isLeftHandTapped = e.isLeftHandTapped,
            t.isHammerPullOrigin = e.isHammerPullOrigin,
            t.hammerPullOriginNoteId = e.hammerPullOriginNoteId,
            t.hammerPullDestinationNoteId = e.hammerPullDestinationNoteId,
            t.isSlurDestination = e.isSlurDestination,
            t.slurOriginNoteId = e.slurOriginNoteId,
            t.slurDestinationNoteId = e.slurDestinationNoteId,
            t.harmonicType = e.harmonicType,
            t.harmonicValue = e.harmonicValue,
            t.isGhost = e.isGhost,
            t.isLetRing = e.isLetRing,
            t.isPalmMute = e.isPalmMute,
            t.isDead = e.isDead,
            t.isStaccato = e.isStaccato,
            t.slideInType = e.slideInType,
            t.slideOutType = e.slideOutType,
            t.vibrato = e.vibrato,
            t.tieOriginNoteId = e.tieOriginNoteId,
            t.tieDestinationNoteId = e.tieDestinationNoteId,
            t.isTieDestination = e.isTieDestination,
            t.leftHandFinger = e.leftHandFinger,
            t.rightHandFinger = e.rightHandFinger,
            t.isFingering = e.isFingering,
            t.trillValue = e.trillValue,
            t.trillSpeed = e.trillSpeed,
            t.durationPercent = e.durationPercent,
            t.accidentalMode = e.accidentalMode,
            t.glyphTags = e.glyphTags.slice(),
            t
        }
    }
    class bt {
        static clone(e) {
            const t = new me;
            return t.isLinear = e.isLinear,
            t.type = e.type,
            t.value = e.value,
            t.ratioPosition = e.ratioPosition,
            t.text = e.text,
            t
        }
    }
    class St {
        static clone(e) {
            const t = new ft;
            t.index = e.index,
            t.notes = [];
            for (const s of e.notes)
                t.addNote(yt.clone(s));
            t.isEmpty = e.isEmpty,
            t.isDumb = e.isDumb,
            t.whammyStyle = e.whammyStyle,
            t.ottava = e.ottava,
            t.isLegatoOrigin = e.isLegatoOrigin,
            t.duration = e.duration,
            t.isLetRing = e.isLetRing,
            t.isPalmMute = e.isPalmMute,
            t.automations = [];
            for (const s of e.automations)
                t.automations.push(bt.clone(s));
            t.dots = e.dots,
            t.fadeIn = e.fadeIn,
            t.lyrics = e.lyrics ? e.lyrics.slice() : null,
            t.hasRasgueado = e.hasRasgueado,
            t.pop = e.pop,
            t.slap = e.slap,
            t.tap = e.tap,
            t.text = e.text,
            t.brushType = e.brushType,
            t.brushDuration = e.brushDuration,
            t.tupletDenominator = e.tupletDenominator,
            t.tupletNumerator = e.tupletNumerator,
            t.isContinuedWhammy = e.isContinuedWhammy,
            t.whammyBarType = e.whammyBarType,
            t.whammyBarPoints = [];
            for (const s of e.whammyBarPoints)
                t.addWhammyBarPoint(mt.clone(s));
            return t.vibrato = e.vibrato,
            t.chordId = e.chordId,
            t.sustainPedal = e.sustainPedal,
            t.graceType = e.graceType,
            t.pickStroke = e.pickStroke,
            t.tremoloSpeed = e.tremoloSpeed,
            t.crescendo = e.crescendo,
            t.dynamics = e.dynamics,
            t.invertBeamDirection = e.invertBeamDirection,
            t.preferredBeamDirection = e.preferredBeamDirection,
            t.isEffectSlurOrigin = e.isEffectSlurOrigin,
            t.beamingMode = e.beamingMode,
            t
        }
    }
    e.StaveProfile = void 0,
    (U = e.StaveProfile || (e.StaveProfile = {}))[U.Default = 0] = "Default",
    U[U.ScoreTab = 1] = "ScoreTab",
    U[U.Score = 2] = "Score",
    U[U.Tab = 3] = "Tab",
    U[U.TabMixed = 4] = "TabMixed",
    U[U.Numbered = 5] = "Numbered",
    U[U.Lead = 6] = "Lead",
    U[U.NLead = 7] = "NLead";
    class wt {
        constructor() {
            this.id = ++wt.GlobalVoiceId,
            this.index = 0,
            this.beats = [],
            this.isEmpty = !0
        }
        insertBeat(e, t) {
            t.nextBeat = e.nextBeat,
            t.nextBeat && (t.nextBeat.previousBeat = t),
            t.previousBeat = e,
            t.voice = this,
            e.nextBeat = t,
            this.beats.splice(e.index + 1, 0, t)
        }
        addBeat(e) {
            e.voice = this,
            e.index = this.beats.length,
            this.beats.push(e),
            e.isEmpty || (this.isEmpty = !1)
        }
        chain(e) {
            if (this.bar) {
                if (e.index < this.beats.length - 1)
                    e.nextBeat = this.beats[e.index + 1],
                    e.nextBeat.previousBeat = e;
                else if (e.isLastOfVoice && e.voice.bar.nextBar) {
                    let t = this.bar.nextBar.voices[this.index];
                    t.beats.length > 0 ? (e.nextBeat = t.beats[0],
                    e.nextBeat.previousBeat = e) : e.nextBeat.previousBeat = e
                }
                e.chain()
            }
        }
        addGraceBeat(e) {
            if (0 === this.beats.length)
                return void this.addBeat(e);
            let t = this.beats[this.beats.length - 1];
            this.beats.splice(this.beats.length - 1, 1),
            this.addBeat(e),
            this.addBeat(t),
            this.isEmpty = !1
        }
        getBeatAtPlaybackStart(e) {
            return this._beatLookup.has(e) ? this._beatLookup.get(e) : null
        }
        finish(t) {
            t.importer.fixNumberedNotationWholeNotes && (this.bar.staff.showNumberedNotation || t.display.staveProfile === e.StaveProfile.Numbered) && this.fixNumberedNotationWholeNotes(),
            this._beatLookup = new Map;
            let s = null;
            for (let e = 0; e < this.beats.length; e++) {
                let t = this.beats[e];
                t.index = e,
                this.chain(t),
                t.graceType === p.None ? (t.graceGroup = s,
                s && (s.isComplete = !0),
                s = null) : (s || (s = new pt),
                s.addBeat(t))
            }
            let i = 0
              , n = 0;
            for (let e = 0; e < this.beats.length; e++) {
                let s = this.beats[e];
                if (s.index = e,
                s.finish(t),
                s.graceType === p.None) {
                    if (s.graceGroup) {
                        const e = s.graceGroup.beats[0]
                          , t = s.graceGroup.beats[s.graceGroup.beats.length - 1];
                        if (e.graceType !== p.BendGrace) {
                            let i = t.playbackStart + t.playbackDuration - e.playbackStart;
                            if (e.graceType === p.BeforeBeat && e.previousBeat) {
                                e.previousBeat.playbackDuration -= i,
                                n = e.previousBeat.voice == this ? e.previousBeat.playbackStart + e.previousBeat.playbackDuration : -i;
                                for (const e of s.graceGroup.beats)
                                    this._beatLookup.delete(e.playbackStart),
                                    e.playbackStart = n,
                                    this._beatLookup.set(e.playbackStart, s),
                                    n += e.playbackDuration
                            } else
                                (e.graceType === p.OnBeat || e.graceType === p.BeforeBeat && !e.previousBeat) && (s.playbackDuration -= i,
                                n = t.voice === this ? t.playbackStart + t.playbackDuration : -i)
                        }
                    }
                    this._beatLookup.set(s.playbackStart, s)
                }
                s.displayStart = i,
                s.playbackStart = n,
                s.finishTuplet(),
                i += s.displayDuration,
                n += s.playbackDuration,
                s.fermata ? this.bar.masterBar.addFermata(s.playbackStart, s.fermata) : s.fermata = this.bar.masterBar.getFermata(s)
            }
        }
        calculateDuration() {
            if (this.isEmpty || 0 === this.beats.length)
                return 0;
            let e = this.beats[this.beats.length - 1]
              , t = this.beats[0];
            return e.playbackStart + e.playbackDuration - t.playbackStart
        }
        fixNumberedNotationWholeNotes() {
            for (let e = this.beats.length - 1; e >= 0; --e) {
                const t = this.beats[e];
                if (t.duration < d.Quarter) {
                    let s = d.Quarter * Math.max(-t.duration, 1) / Math.max(1, t.duration);
                    t.duration = d.Quarter,
                    t.dots && (s *= 1.5,
                    t.dots = 0);
                    for (let i = 1; i < s; ++i) {
                        const s = St.clone(t);
                        s.isEmpty = !0,
                        s.lyrics = null,
                        s.chordId = null;
                        for (const e of s.notes)
                            e.isTieDestination = !0,
                            e.isVisible = !1,
                            e.tieOriginNoteId = -1;
                        s.voice = this,
                        this.beats.splice(e + 1, 0, s)
                    }
                }
            }
            for (let e = 0; e < this.beats.length; ++e)
                this.beats[e].index = e
        }
    }
    wt.GlobalVoiceId = 0;
    class _t {
        constructor() {
            this._noteByIdLookup = null,
            this.album = "",
            this.artist = "",
            this.copyright = "",
            this.instructions = "",
            this.music = "",
            this.notices = "",
            this.subTitle = "",
            this.title = "",
            this.words = "",
            this.tab = "",
            this.tempo = 120,
            this.tempoLabel = "",
            this.masterBars = [],
            this.tracks = [],
            this.stylesheet = new it
        }
        static resetIds(e) {
            let t = -1
              , s = -1
              , i = -1
              , n = -1;
            if (e)
                for (const r of e.tracks)
                    for (const e of r.staves)
                        for (const r of e.bars) {
                            t = Math.max(t, r.id);
                            for (const e of r.voices) {
                                s = Math.max(s, e.id);
                                for (const t of e.beats) {
                                    i = Math.max(i, t.id);
                                    for (const e of t.notes)
                                        n = Math.max(n, e.id)
                                }
                            }
                        }
            ut.GlobalBarId = t + 1,
            wt.GlobalVoiceId = s + 1,
            ft.GlobalBeatId = i + 1,
            dt.GlobalNoteId = n + 1
        }
        rebuildRepeatGroups() {
            let e = new nt;
            for (let t of this.masterBars)
                (t.isRepeatStart || e.isClosed && t.alternateEndings <= 0) && (e = new nt),
                e.addMasterBar(t)
        }
        addMasterBar(e) {
            e.score = this,
            e.index = this.masterBars.length,
            0 !== this.masterBars.length && (e.previousMasterBar = this.masterBars[this.masterBars.length - 1],
            e.previousMasterBar.nextMasterBar = e,
            e.start = e.previousMasterBar.start + e.previousMasterBar.calculateDuration()),
            this.masterBars.push(e)
        }
        addTrack(e) {
            e.score = this,
            e.index = this.tracks.length,
            this.tracks.push(e)
        }
        finish(e) {
            if (this._noteByIdLookup)
                _e.error("Score finish", "finish called twice! Gracefully ignored.");
            else {
                this._noteByIdLookup = new Map;
                for (let t = 0, s = this.tracks.length; t < s; t++)
                    this.tracks[t].finish(e);
                this.rebuildRepeatGroups()
            }
        }
        registerNote(e) {
            const t = this._noteByIdLookup.get(e.id);
            t && t !== e ? _e.error("Score finish", "Note id conflict! Gracefully ignored.") : this._noteByIdLookup.set(e.id, e)
        }
        getNoteById(e) {
            var t;
            return this._noteByIdLookup ? null !== (t = this._noteByIdLookup.get(e)) && void 0 !== t ? t : null : (_e.error("Score finish", "getNoteById called before score.finish()! Gracefully ignored."),
            null)
        }
    }
    class Bt {
        constructor(e, t, s, i=255) {
            this.raw = 0,
            this.raw = (255 & i) << 24 | (255 & e) << 16 | (255 & t) << 8 | 255 & s,
            this.updateRgba()
        }
        updateRgba() {
            255 === this.a ? this.rgba = "#" + ht.toHexString(this.r, 2) + ht.toHexString(this.g, 2) + ht.toHexString(this.b, 2) : this.rgba = `rgba(${this.r},${this.g},${this.b},${this.a / 255})`
        }
        get a() {
            return this.raw >> 24 & 255
        }
        get r() {
            return this.raw >> 16 & 255
        }
        get g() {
            return this.raw >> 8 & 255
        }
        get b() {
            return 255 & this.raw
        }
        static random(e=100) {
            return new Bt(255 * Math.random() | 0,255 * Math.random() | 0,255 * Math.random() | 0,e)
        }
        static fromJson(e) {
            switch (typeof e) {
            case "number":
                {
                    const t = new Bt(0,0,0,0);
                    return t.raw = e,
                    t.updateRgba(),
                    t
                }
            case "string":
                {
                    const t = e;
                    if (t.startsWith("#")) {
                        if (4 === t.length)
                            return new Bt(17 * parseInt(t.substring(1, 1), 16),17 * parseInt(t.substring(2, 1), 16),17 * parseInt(t.substring(3, 1), 16));
                        if (5 === t.length)
                            return new Bt(17 * parseInt(t.substring(1, 1), 16),17 * parseInt(t.substring(2, 1), 16),17 * parseInt(t.substring(3, 1), 16),17 * parseInt(t.substring(4, 1), 16));
                        if (7 === t.length)
                            return new Bt(parseInt(t.substring(1, 2), 16),parseInt(t.substring(3, 2), 16),parseInt(t.substring(5, 2), 16));
                        if (9 === t.length)
                            return new Bt(parseInt(t.substring(1, 2), 16),parseInt(t.substring(3, 2), 16),parseInt(t.substring(5, 2), 16),parseInt(t.substring(7, 2), 16))
                    } else if (t.startsWith("rgba") || t.startsWith("rgb")) {
                        const e = t.indexOf("(")
                          , s = t.lastIndexOf(")");
                        if (-1 === e || -1 === s)
                            throw new Fe("No values specified for rgb/rgba function");
                        const i = t.substring(e + 1, s).split(",");
                        if (3 === i.length)
                            return new Bt(parseInt(i[0]),parseInt(i[1]),parseInt(i[2]));
                        if (4 === i.length)
                            return new Bt(parseInt(i[0]),parseInt(i[1]),parseInt(i[2]),255 * parseFloat(i[3]))
                    }
                    return null
                }
            }
            throw new Fe("Unsupported format for color")
        }
        static toJson(e) {
            return e.raw
        }
    }
    Bt.BlackRgb = "#000000";
    class Tt {
        constructor(e, t, s) {
            this.text = e,
            this.startPos = t,
            this.endPos = s
        }
    }
    class Nt {
        constructor(e) {
            this.style = "normal",
            this.variant = "normal",
            this.weight = "normal",
            this.stretch = "normal",
            this.lineHeight = "normal",
            this.size = "1rem",
            this.families = [],
            this._currentTokenIndex = -1,
            this._input = "",
            this._currentToken = null,
            this._input = e,
            this._tokens = this.splitToTokens(e)
        }
        splitToTokens(e) {
            const t = [];
            let s = 0;
            for (; s < e.length; ) {
                let i = s;
                for (; i < e.length && " " !== e.charAt(i); )
                    i++;
                i > s && t.push(new Tt(e.substring(s, i),s,i)),
                s = i + 1
            }
            return t
        }
        parse() {
            var e;
            if (this.reset(),
            1 === this._tokens.length)
                switch (null === (e = this._currentToken) || void 0 === e ? void 0 : e.text) {
                case "caption":
                case "icon":
                case "menu":
                case "message-box":
                case "small-caption":
                case "status-bar":
                case "inherit":
                    return
                }
            this.fontStyleVariantWeight(),
            this.fontSizeLineHeight(),
            this.fontFamily()
        }
        fontFamily() {
            if (!this._currentToken)
                throw new Error("Missing font list");
            const e = this._input.substr(this._currentToken.startPos).trim();
            let t = 0;
            for (; t < e.length; ) {
                let s = e.charAt(t);
                if (" " === s || "," == s)
                    t++;
                else if ('"' === s || "'" === s) {
                    const i = this.findEndOfQuote(e, t + 1, s);
                    this.families.push(e.substring(t + 1, i).split("\\" + s).join(s)),
                    t = i + 1
                } else {
                    const s = this.findEndOfQuote(e, t + 1, ",");
                    this.families.push(e.substring(t, s).trim()),
                    t = s + 1
                }
            }
        }
        findEndOfQuote(e, t, s) {
            let i = !1;
            for (; t < e.length; ) {
                const n = e.charAt(t);
                if (!i && n === s)
                    return t;
                i = !i && "\\" === n,
                t += 1
            }
            return e.length
        }
        fontSizeLineHeight() {
            if (!this._currentToken)
                throw new Error("Missing font size");
            const e = this._currentToken.text.split("/");
            if (e.length >= 3)
                throw new Error(`Invalid font size '${this._currentToken}' specified`);
            if (this.nextToken(),
            e.length >= 2)
                if ("/" === e[1]) {
                    if (!this._currentToken)
                        throw new Error("Missing line-height after font size");
                    this.lineHeight = this._currentToken.text,
                    this.nextToken()
                } else
                    this.size = e[0],
                    this.lineHeight = e[1];
            else {
                if (!(e.length >= 1))
                    throw new Error("Missing font size");
                if (this.size = e[0],
                this._currentToken && 0 === this._currentToken.text.indexOf("/"))
                    if ("/" === this._currentToken.text) {
                        if (this.nextToken(),
                        !this._currentToken)
                            throw new Error("Missing line-height after font size");
                        this.lineHeight = this._currentToken.text,
                        this.nextToken()
                    } else
                        this.lineHeight = this._currentToken.text.substr(1),
                        this.nextToken()
            }
        }
        nextToken() {
            this._currentTokenIndex++,
            this._currentTokenIndex < this._tokens.length ? this._currentToken = this._tokens[this._currentTokenIndex] : this._currentToken = null
        }
        fontStyleVariantWeight() {
            let e = !1
              , t = !1
              , s = !1
              , i = 3
              , n = [];
            for (; ; ) {
                if (!this._currentToken)
                    return;
                let r = this._currentToken.text;
                switch (r) {
                case "normal":
                case "inherit":
                    n.push(r),
                    i--,
                    this.nextToken();
                    break;
                case "italic":
                case "oblique":
                    this.style = r,
                    e = !0,
                    i--,
                    this.nextToken();
                    break;
                case "small-caps":
                    this.variant = r,
                    t = !0,
                    i--,
                    this.nextToken();
                    break;
                case "bold":
                case "bolder":
                case "lighter":
                case "100":
                case "200":
                case "300":
                case "400":
                case "500":
                case "600":
                case "700":
                case "800":
                case "900":
                    this.weight = r,
                    s = !0,
                    i--,
                    this.nextToken();
                    break;
                default:
                    return
                }
                if (0 === i)
                    break
            }
            for (; n.length > 0; ) {
                const i = n.pop();
                s ? t ? e || (this.style = i) : this.variant = i : this.weight = i
            }
        }
        reset() {
            this._currentTokenIndex = -1,
            this.nextToken()
        }
    }
    e.FontStyle = void 0,
    (X = e.FontStyle || (e.FontStyle = {}))[X.Plain = 0] = "Plain",
    X[X.Italic = 1] = "Italic",
    e.FontWeight = void 0,
    (Y = e.FontWeight || (e.FontWeight = {}))[Y.Regular = 0] = "Regular",
    Y[Y.Bold = 1] = "Bold";
    class vt {
        constructor(t, s, i=e.FontStyle.Plain, n=e.FontWeight.Regular) {
            this._cssScale = 0,
            this._family = t,
            this._size = s,
            this._style = i,
            this._weight = n,
            this._css = this.toCssString()
        }
        reset() {
            this._cssScale = 0,
            this._css = this.toCssString()
        }
        get family() {
            return this._family
        }
        set family(e) {
            this._family = e,
            this.reset()
        }
        get size() {
            return this._size
        }
        set size(e) {
            this._size = e,
            this.reset()
        }
        get style() {
            return this._style
        }
        set style(e) {
            this._style = e,
            this.reset()
        }
        get weight() {
            return this._weight
        }
        set weight(e) {
            this._weight = e,
            this.reset()
        }
        get isBold() {
            return this.weight === e.FontWeight.Bold
        }
        get isItalic() {
            return this.style === e.FontStyle.Italic
        }
        toCssString(e=1) {
            if (!(this._css && Math.abs(e - this._cssScale) < .01)) {
                let t = "";
                this.isBold && (t += "bold "),
                this.isItalic && (t += "italic "),
                t += this.size * e,
                t += "px ",
                t += "'",
                t += this.family,
                t += "'",
                this._css = t,
                this._cssScale = e
            }
            return this._css
        }
        static fromJson(t) {
            switch (typeof t) {
            case "undefined":
                return null;
            case "object":
                {
                    const s = t;
                    let i = s.get("family")
                      , n = s.get("size")
                      , r = Ss.parseEnum(s.get("style"), e.FontStyle)
                      , a = Ss.parseEnum(s.get("weight"), e.FontWeight);
                    return new vt(i,n,r,a)
                }
            case "string":
                {
                    const s = new Nt(t);
                    s.parse();
                    let i = s.families[0];
                    (i.startsWith("'") && i.endsWith("'") || i.startsWith('"') && i.endsWith('"')) && (i = i.substr(1, i.length - 2));
                    let n = s.size.toLowerCase()
                      , r = 0;
                    switch (n) {
                    case "xx-small":
                        r = 7;
                        break;
                    case "x-small":
                        r = 10;
                        break;
                    case "small":
                    case "smaller":
                        r = 13;
                        break;
                    case "medium":
                        r = 16;
                        break;
                    case "large":
                    case "larger":
                        r = 18;
                        break;
                    case "x-large":
                        r = 24;
                        break;
                    case "xx-large":
                        r = 32;
                        break;
                    default:
                        try {
                            r = n.endsWith("em") ? 16 * parseFloat(n.substr(0, n.length - 2)) : n.endsWith("pt") ? 16 * parseFloat(n.substr(0, n.length - 2)) / 12 : n.endsWith("px") ? parseFloat(n.substr(0, n.length - 2)) : 12
                        } catch (e) {
                            r = 12
                        }
                    }
                    let a = e.FontStyle.Plain;
                    "italic" === s.style && (a = e.FontStyle.Italic);
                    let o = e.FontWeight.Regular;
                    switch (s.weight.toLowerCase()) {
                    case "normal":
                    case "lighter":
                        break;
                    default:
                        o = e.FontWeight.Bold
                    }
                    return new vt(i,r,a,o)
                }
            default:
                return null
            }
        }
        static toJson(e) {
            const t = new Map;
            return t.set("family", e.family),
            t.set("size", e.size),
            t.set("style", e.style),
            t.set("weight", e.weight),
            t
        }
    }
    class xt {
        constructor() {
            this.copyrightFont = new vt(xt.sansFont,12,e.FontStyle.Plain,e.FontWeight.Bold),
            this.titleFont = new vt(xt.serifFont,32,e.FontStyle.Plain),
            this.subTitleFont = new vt(xt.serifFont,20,e.FontStyle.Plain),
            this.wordsFont = new vt(xt.serifFont,15,e.FontStyle.Plain),
            this.effectFont = new vt(xt.sansFont,12,e.FontStyle.Italic),
            this.fretboardNumberFont = new vt(xt.sansFont,11,e.FontStyle.Plain),
            this.tablatureFont = new vt(xt.sansFont,13,e.FontStyle.Plain),
            this.graceFont = new vt(xt.sansFont,11,e.FontStyle.Plain),
            this.staffLineColor = new Bt(165,165,165,255),
            this.barSeparatorColor = new Bt(34,34,17,255),
            this.barNumberFont = new vt(xt.sansFont,11,e.FontStyle.Plain),
            this.barNumberColor = new Bt(200,0,0,255),
            this.fingeringFont = new vt(xt.serifFont,14,e.FontStyle.Plain),
            this.chordFingeringFont = new vt(xt.sansFont,9,e.FontStyle.Plain),
            this.markerFont = new vt(xt.serifFont,14,e.FontStyle.Plain,e.FontWeight.Bold),
            this.mainGlyphColor = new Bt(0,0,0,255),
            this.secondaryGlyphColor = new Bt(0,0,0,255),
            this.scoreInfoColor = new Bt(0,0,0,255),
            this.blackKeyNoteColor = new Bt(122,73,136,255),
            this.tieDestinationColor = new Bt(165,165,165,255),
            this.numberedNoteNumberFont = new vt(xt.sansFont,16,e.FontStyle.Plain),
            this.numberedNoteDumbNumberFont = new vt(xt.sansFont,14,e.FontStyle.Plain),
            this.chordTextColor = new Bt(0,0,0,255),
            this.inverseTextColor = new Bt(255,255,255,255),
            this.lyricsFont = new vt(xt.sansFont,14,e.FontStyle.Plain)
        }
    }
    xt.sansFont = "Arial",
    xt.serifFont = "Georgia",
    e.LayoutMode = void 0,
    (J = e.LayoutMode || (e.LayoutMode = {}))[J.Page = 0] = "Page",
    J[J.Horizontal = 1] = "Horizontal";
    class kt {
        constructor() {
            this.scale = 1,
            this.stretchForce = 1,
            this.layoutMode = e.LayoutMode.Page,
            this.staveProfile = e.StaveProfile.Default,
            this.barsPerRow = -1,
            this.startBar = 1,
            this.barCount = -1,
            this.rowCount = -1,
            this.barCountPerPartial = 10,
            this.resources = new xt,
            this.padding = null,
            this.staveGroupVerticalPadding = 10,
            this.avoidAccolade = !1,
            this.hideTabHead = !1,
            this.slim = !1
        }
    }
    class Pt {
        constructor() {
            this.encoding = "utf-8",
            this.mergePartGroupsInMusicXml = !1,
            this.beatTextAsLyrics = !1,
            this.fixNumberedNotationWholeNotes = !1
        }
    }
    e.ScrollMode = void 0,
    (q = e.ScrollMode || (e.ScrollMode = {}))[q.Off = 0] = "Off",
    q[q.Continuous = 1] = "Continuous",
    q[q.OffScreen = 2] = "OffScreen";
    class Ft {
        constructor() {
            this.noteWideLength = 480,
            this.noteWideAmplitude = 2,
            this.noteSlightLength = 480,
            this.noteSlightAmplitude = 2,
            this.beatWideLength = 240,
            this.beatWideAmplitude = 3,
            this.beatSlightLength = 240,
            this.beatSlightAmplitude = 3
        }
    }
    class Ct {
        constructor() {
            this.simpleSlidePitchOffset = 6,
            this.simpleSlideDurationRatio = .25,
            this.shiftSlideDurationRatio = .5
        }
    }
    class Lt {
        constructor() {
            this.soundFont = null,
            this.scrollElement = "html,body",
            this.enablePlayer = !1,
            this.enableCursor = !0,
            this.enableUserInteraction = !0,
            this.enableDumbBeatSound = !1,
            this.scrollOffsetX = 0,
            this.scrollOffsetY = 0,
            this.scrollMode = e.ScrollMode.Continuous,
            this.scrollSpeed = 300,
            this.songBookBendDuration = 75,
            this.songBookDipDuration = 150,
            this.vibrato = new Ft,
            this.slide = new Ct,
            this.playTripletFeel = !0,
            this.autoSustainPedal = !1
        }
    }
    class Et {
        constructor(e, t) {
            this.loaded = e,
            this.total = t
        }
    }
    class Mt {
        constructor() {
            this.oldWidth = 0,
            this.newWidth = 0,
            this.settings = null
        }
        core() {
            return this.settings && this.causeIssue() ? this.settings.core : new ja
        }
        causeIssue() {
            return this.settings = null,
            !0
        }
    }
    class Dt extends Pe {
        constructor(e, t) {
            super(k.General, e),
            this.xhr = t,
            Object.setPrototypeOf(this, Dt.prototype)
        }
    }
    class Rt {
        init(e, t) {
            this.data = e,
            this.settings = t,
            _e.logLevel = t.core.logLevel,
            _t.resetIds()
        }
        cleanup(e) {
            for (const t of e.tracks)
                for (const e of t.staves) {
                    this.deleteEmptyVoices(e);
                    for (const t of e.bars)
                        for (const e of t.voices)
                            for (const t of e.beats)
                                t.automations = []
                }
        }
        deleteEmptyVoices(e) {
            const t = [];
            for (const s of e.bars)
                for (let e = 0; e < s.voices.length; ++e)
                    t.length <= e && t.push(!0),
                    s.voices[e].isEmpty || (t[e] = !1);
            for (let s = t.length - 1; s >= 0; s--)
                if (t[s])
                    for (const t of e.bars)
                        t.voices.splice(s, 1)
        }
    }
    class Ot extends Pe {
        constructor(e="Unsupported format", t=null) {
            super(k.Format, e),
            this.inner = t,
            Object.setPrototypeOf(this, Ot.prototype)
        }
    }
    class It {
        static loadScoreAsync(e, t, s, i) {
            let n = new XMLHttpRequest;
            n.open("GET", e, !0, null, null),
            n.responseType = "arraybuffer",
            n.onreadystatechange = () => {
                if (n.readyState === XMLHttpRequest.DONE) {
                    let e = n.response;
                    if (200 === n.status || 0 === n.status && e)
                        try {
                            let e = n.response
                              , s = new Uint8Array(e)
                              , r = It.loadScoreFromBytes(s, i);
                            t(r)
                        } catch (e) {
                            s(e)
                        }
                    else
                        0 === n.status ? s(new Dt("You are offline!!\n Please Check Your Network.",n)) : 404 === n.status ? s(new Dt("Requested URL not found.",n)) : 500 === n.status ? s(new Dt("Internel Server Error.",n)) : "parsererror" === n.statusText ? s(new Dt("Error.\nParsing JSON Request failed.",n)) : "timeout" === n.statusText ? s(new Dt("Request Time out.",n)) : s(new Dt("Unknow Error: " + n.responseText,n))
                }
            }
            ,
            n.send()
        }
        static loadScoreFromBytes(e, t) {
            t || (t = new Za);
            let s = Ka.buildImporters();
            _e.debug("ScoreLoader", "Loading score from " + e.length + " bytes using " + s.length + " importers", null);
            let i = null
              , n = se.fromBuffer(e);
            for (let e of s) {
                n.reset();
                try {
                    _e.debug("ScoreLoader", "Importing using importer " + e.name),
                    e.init(n, t),
                    i = e.readScore(),
                    _e.debug("ScoreLoader", "Score imported using " + e.name);
                    break
                } catch (t) {
                    if (!(t instanceof Ot))
                        throw _e.error("ScoreLoader", "Score import failed due to unexpected error: ", t),
                        t;
                    _e.debug("ScoreLoader", e.name + " does not support the file")
                }
            }
            if (i)
                return i;
            throw _e.error("ScoreLoader", "No compatible importer found for file"),
            new Ot("No compatible importer found for file")
        }
    }
    class At {
        constructor() {
            this.name = "",
            this.firstFret = 1,
            this.strings = [],
            this.barreFrets = [],
            this.showName = !0,
            this.showDiagram = !0,
            this.showFingering = !0
        }
    }
    !function(e) {
        e[e.IgnoreSpaces = 0] = "IgnoreSpaces",
        e[e.Begin = 1] = "Begin",
        e[e.Text = 2] = "Text",
        e[e.Comment = 3] = "Comment",
        e[e.Dash = 4] = "Dash"
    }(Q || (Q = {}));
    class Gt {
        constructor() {
            this.startBar = 0,
            this.text = ""
        }
        finish(e=!1) {
            this.chunks = [],
            this.parse(this.text, 0, this.chunks, e)
        }
        parse(e, t, s, i) {
            if (!e)
                return;
            let n = Q.Begin
              , r = Q.Begin
              , a = !1
              , o = 0;
            for (; t < e.length; ) {
                let s = e.charCodeAt(t);
                switch (n) {
                case Q.IgnoreSpaces:
                    switch (s) {
                    case Gt.CharCodeLF:
                    case Gt.CharCodeCR:
                    case Gt.CharCodeTab:
                        break;
                    case Gt.CharCodeSpace:
                        if (!a) {
                            n = r;
                            continue
                        }
                        break;
                    default:
                        a = !1,
                        n = r;
                        continue
                    }
                    break;
                case Q.Begin:
                    switch (s) {
                    case Gt.CharCodeBrackedOpen:
                        n = Q.Comment;
                        break;
                    default:
                        o = t,
                        n = Q.Text;
                        continue
                    }
                    break;
                case Q.Comment:
                    switch (s) {
                    case Gt.CharCodeBrackedClose:
                        n = Q.Begin
                    }
                    break;
                case Q.Text:
                    switch (s) {
                    case Gt.CharCodeDash:
                        n = Q.Dash;
                        break;
                    case Gt.CharCodeCR:
                    case Gt.CharCodeLF:
                    case Gt.CharCodeSpace:
                        let s = e.substr(o, t - o);
                        this.addChunk(s, i),
                        n = Q.IgnoreSpaces,
                        r = Q.Begin
                    }
                    break;
                case Q.Dash:
                    switch (s) {
                    case Gt.CharCodeDash:
                        break;
                    default:
                        let s = e.substr(o, t - o);
                        this.addChunk(s, i),
                        a = !0,
                        n = Q.IgnoreSpaces,
                        r = Q.Begin;
                        continue
                    }
                }
                t += 1
            }
            n === Q.Text && t !== o && this.addChunk(e.substr(o, t - o), i)
        }
        addChunk(e, t) {
            e = this.prepareChunk(e),
            (!t || e.length > 0 && "-" !== e) && this.chunks.push(e)
        }
        prepareChunk(e) {
            let t = e.split("+").join(" ")
              , s = t.length;
            for (; s > 0 && "_" === t.charAt(s - 1); )
                s--;
            return s !== t.length ? t.substr(0, s) : t
        }
    }
    Gt.CharCodeLF = 10,
    Gt.CharCodeTab = 9,
    Gt.CharCodeCR = 13,
    Gt.CharCodeSpace = 32,
    Gt.CharCodeBrackedClose = 93,
    Gt.CharCodeBrackedOpen = 91,
    Gt.CharCodeDash = 45,
    function(e) {
        e[e.Cb = -7] = "Cb",
        e[e.Gb = -6] = "Gb",
        e[e.Db = -5] = "Db",
        e[e.Ab = -4] = "Ab",
        e[e.Eb = -3] = "Eb",
        e[e.Bb = -2] = "Bb",
        e[e.F = -1] = "F",
        e[e.C = 0] = "C",
        e[e.G = 1] = "G",
        e[e.D = 2] = "D",
        e[e.A = 3] = "A",
        e[e.E = 4] = "E",
        e[e.B = 5] = "B",
        e[e.FSharp = 6] = "FSharp",
        e[e.CSharp = 7] = "CSharp"
    }($ || ($ = {}));
    const Ht = new Map([[$.C, 0], [$.CSharp, -1], [$.Db, -1], [$.D, -2], [$.Eb, -3], [$.E, -4], [$.F, -5], [$.FSharp, -6], [$.Gb, -6], [$.G, -7], [$.Ab, -8], [$.A, -9], [$.Bb, -10], [$.B, -11], [$.Cb, -11]]);
    var Vt, Wt, zt, Ut, Xt, Yt, Jt, qt;
    !function(e) {
        e[e.Major = 0] = "Major",
        e[e.Minor = 1] = "Minor"
    }(Vt || (Vt = {}));
    class Qt {
        constructor() {
            this.alternateEndings = 0,
            this.nextMasterBar = null,
            this.previousMasterBar = null,
            this.index = 0,
            this.keySignature = $.C,
            this.keySignatureType = Vt.Major,
            this.isDoubleBar = !1,
            this.isRepeatStart = !1,
            this.repeatCount = 0,
            this.timeSignatureNumerator = 4,
            this.timeSignatureDenominator = 4,
            this.timeSignatureCommon = !1,
            this.tripletFeel = y.NoTripletFeel,
            this.section = null,
            this.tempoAutomation = null,
            this.fermata = new Map,
            this.start = 0,
            this.isAnacrusis = !1
        }
        get isRepeatEnd() {
            return this.repeatCount > 0
        }
        get isSectionStart() {
            return !!this.section
        }
        calculateDuration(e=!0) {
            if (this.isAnacrusis && e) {
                let e = 0;
                for (let t of this.score.tracks)
                    for (let s of t.staves) {
                        let t = this.index < s.bars.length ? s.bars[this.index].calculateDuration() : 0;
                        t > e && (e = t)
                    }
                return e
            }
            return this.timeSignatureNumerator * Z.valueToTicks(this.timeSignatureDenominator)
        }
        addFermata(e, t) {
            this.fermata.set(e, t)
        }
        getFermata(e) {
            return this.fermata.has(e.playbackStart) ? this.fermata.get(e.playbackStart) : null
        }
    }
    Qt.MaxAlternateEndings = 8;
    class $t {
        constructor() {
            this.volume = 15,
            this.balance = 8,
            this.port = 1,
            this.program = 0,
            this.primaryChannel = 0,
            this.secondaryChannel = 0,
            this.isMute = !1,
            this.isSolo = !1
        }
    }
    class Kt {
        constructor() {
            this.marker = "",
            this.text = ""
        }
    }
    class jt {
        constructor(e="", t=null, s=!1) {
            this.isStandard = s,
            this.name = e,
            this.tunings = null != t ? t : []
        }
        static getTextForTuning(e, t) {
            let s = jt.getTextPartsForTuning(e);
            return t ? s.join("") : s[0]
        }
        static getTextPartsForTuning(e, t=-1) {
            return [["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"][e % 12], ((e / 12 | 0) + t).toString()]
        }
        static getDefaultTuningFor(e) {
            return jt._defaultTunings.has(e) ? jt._defaultTunings.get(e) : null
        }
        static getPresetsFor(e) {
            switch (e) {
            case 7:
                return jt._sevenStrings;
            case 6:
                return jt._sixStrings;
            case 5:
                return jt._fiveStrings;
            case 4:
                return jt._fourStrings
            }
            return []
        }
        static initialize() {
            jt._defaultTunings.set(7, new jt("Guitar 7 strings",[64, 59, 55, 50, 45, 40, 35],!0)),
            jt._sevenStrings.push(jt._defaultTunings.get(7)),
            jt._defaultTunings.set(6, new jt("Guitar Standard Tuning",[64, 59, 55, 50, 45, 40],!0)),
            jt._sixStrings.push(jt._defaultTunings.get(6)),
            jt._sixStrings.push(new jt("Guitar Tune down ½ step",[63, 58, 54, 49, 44, 39],!1)),
            jt._sixStrings.push(new jt("Guitar Tune down 1 step",[62, 57, 53, 48, 43, 38],!1)),
            jt._sixStrings.push(new jt("Guitar Tune down 2 step",[60, 55, 51, 46, 41, 36],!1)),
            jt._sixStrings.push(new jt("Guitar Dropped D Tuning",[64, 59, 55, 50, 45, 38],!1)),
            jt._sixStrings.push(new jt("Guitar Dropped D Tuning variant",[64, 57, 55, 50, 45, 38],!1)),
            jt._sixStrings.push(new jt("Guitar Double Dropped D Tuning",[62, 59, 55, 50, 45, 38],!1)),
            jt._sixStrings.push(new jt("Guitar Dropped E Tuning",[66, 61, 57, 52, 47, 40],!1)),
            jt._sixStrings.push(new jt("Guitar Dropped C Tuning",[62, 57, 53, 48, 43, 36],!1)),
            jt._sixStrings.push(new jt("Guitar Open C Tuning",[64, 60, 55, 48, 43, 36],!1)),
            jt._sixStrings.push(new jt("Guitar Open Cm Tuning",[63, 60, 55, 48, 43, 36],!1)),
            jt._sixStrings.push(new jt("Guitar Open C6 Tuning",[64, 57, 55, 48, 43, 36],!1)),
            jt._sixStrings.push(new jt("Guitar Open Cmaj7 Tuning",[64, 59, 55, 52, 43, 36],!1)),
            jt._sixStrings.push(new jt("Guitar Open D Tuning",[62, 57, 54, 50, 45, 38],!1)),
            jt._sixStrings.push(new jt("Guitar Open Dm Tuning",[62, 57, 53, 50, 45, 38],!1)),
            jt._sixStrings.push(new jt("Guitar Open D5 Tuning",[62, 57, 50, 50, 45, 38],!1)),
            jt._sixStrings.push(new jt("Guitar Open D6 Tuning",[62, 59, 54, 50, 45, 38],!1)),
            jt._sixStrings.push(new jt("Guitar Open Dsus4 Tuning",[62, 57, 55, 50, 45, 38],!1)),
            jt._sixStrings.push(new jt("Guitar Open E Tuning",[64, 59, 56, 52, 47, 40],!1)),
            jt._sixStrings.push(new jt("Guitar Open Em Tuning",[64, 59, 55, 52, 47, 40],!1)),
            jt._sixStrings.push(new jt("Guitar Open Esus11 Tuning",[64, 59, 55, 52, 45, 40],!1)),
            jt._sixStrings.push(new jt("Guitar Open F Tuning",[65, 60, 53, 48, 45, 41],!1)),
            jt._sixStrings.push(new jt("Guitar Open G Tuning",[62, 59, 55, 50, 43, 38],!1)),
            jt._sixStrings.push(new jt("Guitar Open Gm Tuning",[62, 58, 55, 50, 43, 38],!1)),
            jt._sixStrings.push(new jt("Guitar Open G6 Tuning",[64, 59, 55, 50, 43, 38],!1)),
            jt._sixStrings.push(new jt("Guitar Open Gsus4 Tuning",[62, 60, 55, 50, 43, 38],!1)),
            jt._sixStrings.push(new jt("Guitar Open A Tuning",[64, 61, 57, 52, 45, 40],!1)),
            jt._sixStrings.push(new jt("Guitar Open Am Tuning",[64, 60, 57, 52, 45, 40],!1)),
            jt._sixStrings.push(new jt("Guitar Nashville Tuning",[64, 59, 67, 62, 57, 52],!1)),
            jt._sixStrings.push(new jt("Bass 6 Strings Tuning",[48, 43, 38, 33, 28, 23],!1)),
            jt._sixStrings.push(new jt("Lute or Vihuela Tuning",[64, 59, 54, 50, 45, 40],!1)),
            jt._defaultTunings.set(5, new jt("Bass 5 Strings Tuning",[43, 38, 33, 28, 23],!0)),
            jt._fiveStrings.push(jt._defaultTunings.get(5)),
            jt._fiveStrings.push(new jt("Banjo Dropped C Tuning",[62, 59, 55, 48, 67],!1)),
            jt._fiveStrings.push(new jt("Banjo Open D Tuning",[62, 57, 54, 50, 69],!1)),
            jt._fiveStrings.push(new jt("Banjo Open G Tuning",[62, 59, 55, 50, 67],!1)),
            jt._fiveStrings.push(new jt("Banjo G Minor Tuning",[62, 58, 55, 50, 67],!1)),
            jt._fiveStrings.push(new jt("Banjo G Modal Tuning",[62, 57, 55, 50, 67],!1)),
            jt._defaultTunings.set(4, new jt("Bass Standard Tuning",[43, 38, 33, 28],!0)),
            jt._fourStrings.push(jt._defaultTunings.get(4)),
            jt._fourStrings.push(new jt("Bass Tune down ½ step",[42, 37, 32, 27],!1)),
            jt._fourStrings.push(new jt("Bass Tune down 1 step",[41, 36, 31, 26],!1)),
            jt._fourStrings.push(new jt("Bass Tune down 2 step",[39, 34, 29, 24],!1)),
            jt._fourStrings.push(new jt("Bass Dropped D Tuning",[43, 38, 33, 26],!1)),
            jt._fourStrings.push(new jt("Ukulele Standard C Tuning",[69, 64, 60, 67],!0)),
            jt._fourStrings.push(new jt("Ukulele C Tuning",[45, 40, 36, 43],!1)),
            jt._fourStrings.push(new jt("Ukulele G Tuning",[52, 47, 43, 38],!1)),
            jt._fourStrings.push(new jt("Mandolin Standard Tuning",[64, 57, 50, 43],!1)),
            jt._fourStrings.push(new jt("Mandolin or Violin Tuning",[76, 69, 62, 55],!1)),
            jt._fourStrings.push(new jt("Viola Tuning",[69, 62, 55, 48],!1)),
            jt._fourStrings.push(new jt("Cello Tuning",[57, 50, 43, 36],!1))
        }
        static findTuning(e) {
            let t = jt.getPresetsFor(e.length);
            for (let s = 0, i = t.length; s < i; s++) {
                let i = t[s]
                  , n = !0;
                for (let t = 0, s = e.length; t < s; t++)
                    if (e[t] !== i.tunings[t]) {
                        n = !1;
                        break
                    }
                if (n)
                    return i
            }
            return null
        }
        finish() {
            const e = jt.findTuning(this.tunings);
            e && (this.name = e.name,
            this.isStandard = e.isStandard),
            this.name = this.name.trim()
        }
    }
    jt._sevenStrings = [],
    jt._sixStrings = [],
    jt._fiveStrings = [],
    jt._fourStrings = [],
    jt._defaultTunings = new Map,
    jt.defaultAccidentals = ["", "#", "", "#", "", "", "#", "", "#", "", "#", ""],
    jt.defaultSteps = ["C", "C", "D", "D", "E", "F", "F", "G", "G", "A", "A", "B"],
    jt.initialize();
    class Zt {
        constructor() {
            this.index = 0,
            this.bars = [],
            this.chords = new Map,
            this.capo = 0,
            this.transpositionPitch = 0,
            this.displayTranspositionPitch = 0,
            this.stringTuning = new jt("",[],!1),
            this.showTablature = !0,
            this.showStandardNotation = !0,
            this.showNumberedNotation = !1,
            this.isPercussion = !1,
            this.standardNotationLineCount = 5,
            this.avoidInChordFretNumber = !1
        }
        get tuning() {
            return this.stringTuning.tunings
        }
        get tuningName() {
            return this.stringTuning.name
        }
        get isStringed() {
            return this.stringTuning.tunings.length > 0
        }
        finish(e) {
            this.stringTuning.finish();
            for (let t = 0, s = this.bars.length; t < s; t++)
                this.bars[t].finish(e)
        }
        addChord(e, t) {
            t.staff = this,
            this.chords.set(e, t)
        }
        addBar(e) {
            let t = this.bars;
            e.staff = this,
            e.index = t.length,
            t.length > 0 && (e.previousBar = t[t.length - 1],
            e.previousBar.nextBar = e),
            t.push(e)
        }
    }
    class es {
        constructor() {
            this.index = 0,
            this.staves = [],
            this.playbackInfo = new $t,
            this.color = new Bt(200,0,0,255),
            this.name = "",
            this.shortName = "",
            this.percussionArticulations = [],
            this.sustainTimetable = [],
            this.dynamicsTimetable = []
        }
        ensureStaveCount(e) {
            for (; this.staves.length < e; )
                this.addStaff(new Zt)
        }
        addStaff(e) {
            e.index = this.staves.length,
            e.track = this,
            this.staves.push(e)
        }
        finish(e) {
            this.shortName || (this.shortName = this.name,
            this.shortName.length > es.ShortNameMaxLength && (this.shortName = this.shortName.substr(0, es.ShortNameMaxLength)));
            for (let t = 0, s = this.staves.length; t < s; t++)
                this.staves[t].finish(e)
        }
        applyLyrics(e) {
            var t;
            for (let t of e)
                t.finish();
            let s = this.staves[0];
            for (let i = 0; i < e.length; i++) {
                let n = e[i];
                if (n.startBar >= 0 && n.startBar < s.bars.length) {
                    let r = null === (t = s.bars[n.startBar].voices[0]) || void 0 === t ? void 0 : t.beats[0];
                    for (let t = 0; t < n.chunks.length && r; t++) {
                        for (; r && (r.isEmpty || r.isRest); )
                            r = r.nextBeat;
                        r && (r.lyrics || (r.lyrics = new Array(e.length)),
                        r.lyrics[i] = n.chunks[t],
                        r = r.nextBeat)
                    }
                }
            }
        }
    }
    es.ShortNameMaxLength = 10;
    class ts {
        constructor(e=-1, t=E.NoOrDead) {
            this.fret = -1,
            this.finger = E.NoOrDead,
            this.fret = e,
            this.finger = t
        }
    }
    class ss {
        constructor() {
            this.x = 0,
            this.y = 0,
            this.w = 0,
            this.h = 0
        }
    }
    !function(e) {
        e[e.Boolean = 0] = "Boolean",
        e[e.Integer = 1] = "Integer",
        e[e.Float = 2] = "Float",
        e[e.String = 3] = "String",
        e[e.Point = 4] = "Point",
        e[e.Size = 5] = "Size",
        e[e.Rectangle = 6] = "Rectangle",
        e[e.Color = 7] = "Color"
    }(Wt || (Wt = {})),
    function(e) {
        e[e.Short = 0] = "Short",
        e[e.Medium = 1] = "Medium",
        e[e.Long = 2] = "Long"
    }(zt || (zt = {}));
    class is {
        constructor() {
            this.type = zt.Short,
            this.length = 0
        }
    }
    !function(e) {
        e[e.Up = 0] = "Up",
        e[e.Down = 1] = "Down"
    }(Ut || (Ut = {})),
    function(e) {
        e[e.None = 0] = "None",
        e[e.Element = 1] = "Element",
        e[e.Text = 2] = "Text",
        e[e.CDATA = 3] = "CDATA",
        e[e.Document = 4] = "Document",
        e[e.DocumentType = 5] = "DocumentType"
    }(Xt || (Xt = {})),
    function(e) {
        e[e.IgnoreSpaces = 0] = "IgnoreSpaces",
        e[e.Begin = 1] = "Begin",
        e[e.BeginNode = 2] = "BeginNode",
        e[e.TagName = 3] = "TagName",
        e[e.Body = 4] = "Body",
        e[e.AttribName = 5] = "AttribName",
        e[e.Equals = 6] = "Equals",
        e[e.AttvalBegin = 7] = "AttvalBegin",
        e[e.AttribVal = 8] = "AttribVal",
        e[e.Childs = 9] = "Childs",
        e[e.Close = 10] = "Close",
        e[e.WaitEnd = 11] = "WaitEnd",
        e[e.WaitEndRet = 12] = "WaitEndRet",
        e[e.Pcdata = 13] = "Pcdata",
        e[e.Header = 14] = "Header",
        e[e.Comment = 15] = "Comment",
        e[e.Doctype = 16] = "Doctype",
        e[e.Cdata = 17] = "Cdata",
        e[e.Escape = 18] = "Escape"
    }(Yt || (Yt = {})),
    function(e) {
        e[e.SteelGuitar = 1] = "SteelGuitar",
        e[e.AcousticGuitar = 2] = "AcousticGuitar",
        e[e.TwelveStringGuitar = 3] = "TwelveStringGuitar",
        e[e.ElectricGuitar = 4] = "ElectricGuitar",
        e[e.Bass = 5] = "Bass",
        e[e.ClassicalGuitar = 23] = "ClassicalGuitar",
        e[e.UprightBass = 6] = "UprightBass",
        e[e.Ukulele = 7] = "Ukulele",
        e[e.Banjo = 8] = "Banjo",
        e[e.Mandolin = 9] = "Mandolin",
        e[e.Piano = 10] = "Piano",
        e[e.Synth = 12] = "Synth",
        e[e.Strings = 11] = "Strings",
        e[e.Brass = 13] = "Brass",
        e[e.Reed = 14] = "Reed",
        e[e.Woodwind = 15] = "Woodwind",
        e[e.Vocal = 16] = "Vocal",
        e[e.PitchedIdiophone = 17] = "PitchedIdiophone",
        e[e.Fx = 21] = "Fx",
        e[e.PercussionKit = 18] = "PercussionKit",
        e[e.Idiophone = 19] = "Idiophone",
        e[e.Membraphone = 20] = "Membraphone"
    }(Jt || (Jt = {}));
    class ns {
        constructor(e, t, s=null) {
            if (this.icon = Jt.Piano,
            this.icon = e,
            this.instrumentSetName = t,
            s)
                this.instrumentSetType = s;
            else {
                const e = t.split(" ");
                e[0] = e[0].substr(0, 1).toLowerCase() + e[0].substr(1),
                this.instrumentSetType = e.join("")
            }
        }
    }
    new Map([[0, new ns(Jt.Piano,"Acoustic Piano")], [1, new ns(Jt.Piano,"Acoustic Piano")], [2, new ns(Jt.Piano,"Electric Piano")], [3, new ns(Jt.Piano,"Acoustic Piano")], [4, new ns(Jt.Piano,"Electric Piano")], [5, new ns(Jt.Piano,"Electric Piano")], [6, new ns(Jt.Piano,"Harpsichord")], [7, new ns(Jt.Piano,"Harpsichord")], [8, new ns(Jt.PitchedIdiophone,"Celesta")], [9, new ns(Jt.PitchedIdiophone,"Vibraphone")], [10, new ns(Jt.PitchedIdiophone,"Vibraphone")], [11, new ns(Jt.PitchedIdiophone,"Vibraphone")], [12, new ns(Jt.PitchedIdiophone,"Xylophone")], [13, new ns(Jt.PitchedIdiophone,"Xylophone")], [14, new ns(Jt.PitchedIdiophone,"Vibraphone")], [15, new ns(Jt.Banjo,"Banjo")], [16, new ns(Jt.Piano,"Electric Organ")], [17, new ns(Jt.Piano,"Electric Organ")], [18, new ns(Jt.Piano,"Electric Organ")], [19, new ns(Jt.Piano,"Electric Organ")], [20, new ns(Jt.Piano,"Electric Organ")], [21, new ns(Jt.Piano,"Electric Organ")], [22, new ns(Jt.Woodwind,"Recorder")], [23, new ns(Jt.Piano,"Electric Organ")], [24, new ns(Jt.ClassicalGuitar,"Nylon Guitar")], [25, new ns(Jt.SteelGuitar,"Steel Guitar")], [26, new ns(Jt.SteelGuitar,"Electric Guitar")], [27, new ns(Jt.ElectricGuitar,"Electric Guitar")], [28, new ns(Jt.ElectricGuitar,"Electric Guitar")], [29, new ns(Jt.ElectricGuitar,"Electric Guitar")], [30, new ns(Jt.SteelGuitar,"Electric Guitar")], [31, new ns(Jt.SteelGuitar,"Electric Guitar")], [32, new ns(Jt.Bass,"Acoustic Bass")], [33, new ns(Jt.Bass,"Electric Bass")], [34, new ns(Jt.Bass,"Electric Bass")], [35, new ns(Jt.Bass,"Acoustic Bass")], [36, new ns(Jt.Bass,"Electric Bass")], [37, new ns(Jt.Bass,"Electric Bass")], [38, new ns(Jt.Synth,"Synth Bass")], [39, new ns(Jt.Synth,"Synth Bass")], [40, new ns(Jt.Strings,"Violin")], [41, new ns(Jt.Strings,"Viola")], [42, new ns(Jt.Strings,"Cello")], [43, new ns(Jt.Strings,"Contrabass")], [44, new ns(Jt.Strings,"Violin")], [45, new ns(Jt.Strings,"Violin")], [46, new ns(Jt.Piano,"Harp")], [47, new ns(Jt.Membraphone,"Timpani")], [48, new ns(Jt.Strings,"Violin")], [49, new ns(Jt.Strings,"Violin")], [50, new ns(Jt.Strings,"Violin")], [51, new ns(Jt.Strings,"Violin")], [52, new ns(Jt.Vocal,"Voice")], [53, new ns(Jt.Vocal,"Voice")], [54, new ns(Jt.Vocal,"Voice")], [55, new ns(Jt.Synth,"Pad Synthesizer")], [56, new ns(Jt.Brass,"Trumpet")], [57, new ns(Jt.Brass,"Trombone")], [58, new ns(Jt.Brass,"Tuba")], [59, new ns(Jt.Brass,"Trumpet")], [60, new ns(Jt.Brass,"French Horn")], [61, new ns(Jt.Brass,"Trumpet")], [62, new ns(Jt.Brass,"Trumpet")], [63, new ns(Jt.Brass,"Trumpet")], [64, new ns(Jt.Reed,"Saxophone")], [65, new ns(Jt.Reed,"Saxophone")], [66, new ns(Jt.Reed,"Saxophone")], [67, new ns(Jt.Reed,"Saxophone")], [68, new ns(Jt.Reed,"Oboe")], [69, new ns(Jt.Reed,"English Horn")], [70, new ns(Jt.Reed,"Bassoon")], [71, new ns(Jt.Reed,"Clarinet")], [72, new ns(Jt.Reed,"Piccolo")], [73, new ns(Jt.Woodwind,"Flute")], [74, new ns(Jt.Woodwind,"Recorder")], [75, new ns(Jt.Woodwind,"Flute")], [76, new ns(Jt.Woodwind,"Recorder")], [77, new ns(Jt.Woodwind,"Flute")], [78, new ns(Jt.Woodwind,"Recorder")], [79, new ns(Jt.Woodwind,"Flute")], [80, new ns(Jt.Synth,"Lead Synthesizer")], [81, new ns(Jt.Synth,"Lead Synthesizer")], [82, new ns(Jt.Synth,"Lead Synthesizer")], [83, new ns(Jt.Synth,"Lead Synthesizer")], [84, new ns(Jt.Synth,"Lead Synthesizer")], [85, new ns(Jt.Synth,"Lead Synthesizer")], [86, new ns(Jt.Synth,"Lead Synthesizer")], [87, new ns(Jt.Synth,"Lead Synthesizer")], [88, new ns(Jt.Synth,"Pad Synthesizer")], [89, new ns(Jt.Synth,"Pad Synthesizer")], [90, new ns(Jt.Synth,"Pad Synthesizer")], [91, new ns(Jt.Synth,"Pad Synthesizer")], [92, new ns(Jt.Synth,"Pad Synthesizer")], [93, new ns(Jt.Synth,"Pad Synthesizer")], [94, new ns(Jt.Synth,"Pad Synthesizer")], [95, new ns(Jt.Synth,"Pad Synthesizer")], [96, new ns(Jt.Fx,"Pad Synthesizer")], [97, new ns(Jt.Fx,"Pad Synthesizer")], [98, new ns(Jt.Fx,"Pad Synthesizer")], [99, new ns(Jt.Fx,"Pad Synthesizer")], [100, new ns(Jt.Fx,"Lead Synthesizer")], [101, new ns(Jt.Fx,"Lead Synthesizer")], [102, new ns(Jt.Fx,"Lead Synthesizer")], [103, new ns(Jt.Fx,"Trumpet")], [104, new ns(Jt.ElectricGuitar,"Banjo")], [105, new ns(Jt.Banjo,"Banjo")], [106, new ns(Jt.Ukulele,"Ukulele")], [107, new ns(Jt.Banjo,"Banjo")], [108, new ns(Jt.PitchedIdiophone,"Xylophone")], [109, new ns(Jt.Reed,"Bassoon")], [110, new ns(Jt.Strings,"Violin")], [111, new ns(Jt.Woodwind,"Flute")], [112, new ns(Jt.PitchedIdiophone,"Xylophone")], [113, new ns(Jt.Idiophone,"Celesta")], [114, new ns(Jt.PitchedIdiophone,"Vibraphone")], [115, new ns(Jt.Idiophone,"Xylophone")], [116, new ns(Jt.Membraphone,"Xylophone")], [117, new ns(Jt.Membraphone,"Xylophone")], [118, new ns(Jt.Membraphone,"Xylophone")], [119, new ns(Jt.Idiophone,"Celesta")], [120, new ns(Jt.Fx,"Steel Guitar")], [121, new ns(Jt.Fx,"Recorder")], [122, new ns(Jt.Fx,"Recorder")], [123, new ns(Jt.Fx,"Recorder")], [124, new ns(Jt.Fx,"Recorder")], [125, new ns(Jt.Fx,"Recorder")], [126, new ns(Jt.Fx,"Recorder")], [127, new ns(Jt.Fx,"Timpani")]]),
    new ns(Jt.PercussionKit,"Drums","drumKit");
    class rs {
        constructor() {
            this._checkValue = rs.CrcInit,
            this.reset()
        }
        static buildCrc32Lookup() {
            const e = new Uint32Array(256);
            for (let t = 0; t < e.length; t++) {
                let s = t;
                for (let e = 0; e < 8; e++)
                    s = 1 == (1 & s) ? s >>> 1 ^ 3988292384 : s >>> 1;
                e[t] = s
            }
            return e
        }
        get value() {
            return ~this._checkValue
        }
        update(e, t, s) {
            for (let i = 0; i < s; i++)
                this._checkValue = rs.Crc32Lookup[255 & (this._checkValue ^ e[t + i])] ^ this._checkValue >>> 8
        }
        reset() {
            this._checkValue = rs.CrcInit
        }
    }
    rs.Crc32Lookup = rs.buildCrc32Lookup(),
    rs.CrcInit = 4294967295;
    class as {
    }
    as.MAX_WBITS = 15,
    as.WSIZE = 1 << as.MAX_WBITS,
    as.WMASK = as.WSIZE - 1,
    as.MIN_MATCH = 3,
    as.MAX_MATCH = 258,
    as.DEFAULT_MEM_LEVEL = 8,
    as.PENDING_BUF_SIZE = 1 << as.DEFAULT_MEM_LEVEL + 8,
    as.HASH_BITS = as.DEFAULT_MEM_LEVEL + 7,
    as.HASH_SIZE = 1 << as.HASH_BITS,
    as.HASH_SHIFT = (as.HASH_BITS + as.MIN_MATCH - 1) / as.MIN_MATCH,
    as.HASH_MASK = as.HASH_SIZE - 1,
    as.MIN_LOOKAHEAD = as.MAX_MATCH + as.MIN_MATCH + 1,
    as.MAX_DIST = as.WSIZE - as.MIN_LOOKAHEAD;
    class os {
        constructor(e, t, s, i) {
            this.length = null,
            this.numCodes = 0,
            this.codes = null,
            this.huffman = e,
            this.minNumCodes = s,
            this.maxLength = i,
            this.freqs = new Int16Array(t),
            this.bitLengthCounts = new Int32Array(i)
        }
        reset() {
            for (let e = 0; e < this.freqs.length; e++)
                this.freqs[e] = 0;
            this.codes = null,
            this.length = null
        }
        buildTree() {
            let e = this.freqs.length
              , t = new Int32Array(e)
              , s = 0
              , i = 0;
            for (let n = 0; n < e; n++) {
                let e = this.freqs[n];
                if (0 !== e) {
                    let r = s++;
                    for (; r > 0; ) {
                        let s = Math.floor((r - 1) / 2);
                        if (!(this.freqs[t[s]] > e))
                            break;
                        t[r] = t[s],
                        r = s
                    }
                    t[r] = n,
                    i = n
                }
            }
            for (; s < 2; ) {
                let e = i < 2 ? ++i : 0;
                t[s++] = e
            }
            this.numCodes = Math.max(i + 1, this.minNumCodes);
            let n = s
              , r = new Int32Array(4 * s - 2)
              , a = new Int32Array(2 * s - 1)
              , o = n;
            for (let e = 0; e < s; e++) {
                let s = t[e];
                r[2 * e] = s,
                r[2 * e + 1] = -1,
                a[e] = this.freqs[s] << 8,
                t[e] = e
            }
            do {
                let e = t[0]
                  , i = t[--s]
                  , n = 0
                  , h = 1;
                for (; h < s; )
                    h + 1 < s && a[t[h]] > a[t[h + 1]] && h++,
                    t[n] = t[h],
                    n = h,
                    h = 2 * h + 1;
                let l = a[i];
                for (; h = n,
                n > 0 && (n = Math.floor((h - 1) / 2),
                a[t[n]] > l); )
                    t[h] = t[n];
                t[h] = i;
                let c = t[0];
                i = o++,
                r[2 * i] = e,
                r[2 * i + 1] = c;
                let d = Math.min(255 & a[e], 255 & a[c]);
                for (l = a[e] + a[c] - d + 1,
                a[i] = l,
                n = 0,
                h = 1; h < s; )
                    h + 1 < s && a[t[h]] > a[t[h + 1]] && h++,
                    t[n] = t[h],
                    n = h,
                    h = 2 * n + 1;
                for (; h = n,
                h > 0 && (n = Math.floor((h - 1) / 2),
                a[t[n]] > l); )
                    t[h] = t[n];
                t[h] = i
            } while (s > 1);
            this.buildLength(r)
        }
        buildLength(e) {
            this.length = new Uint8Array(this.freqs.length);
            let t = Math.floor(e.length / 2)
              , s = Math.floor((t + 1) / 2)
              , i = 0;
            for (let e = 0; e < this.maxLength; e++)
                this.bitLengthCounts[e] = 0;
            let n = new Int32Array(t);
            n[t - 1] = 0;
            for (let s = t - 1; s >= 0; s--)
                if (-1 != e[2 * s + 1]) {
                    let t = n[s] + 1;
                    t > this.maxLength && (t = this.maxLength,
                    i++),
                    n[e[2 * s]] = t,
                    n[e[2 * s + 1]] = t
                } else {
                    let t = n[s];
                    this.bitLengthCounts[t - 1]++,
                    this.length[e[2 * s]] = n[s]
                }
            if (0 == i)
                return;
            let r = this.maxLength - 1;
            do {
                for (; 0 == this.bitLengthCounts[--r]; )
                    ;
                do {
                    this.bitLengthCounts[r]--,
                    this.bitLengthCounts[++r]++,
                    i -= 1 << this.maxLength - 1 - r
                } while (i > 0 && r < this.maxLength - 1)
            } while (i > 0);
            this.bitLengthCounts[this.maxLength - 1] += i,
            this.bitLengthCounts[this.maxLength - 2] -= i;
            let a = 2 * s;
            for (let t = this.maxLength; 0 != t; t--) {
                let s = this.bitLengthCounts[t - 1];
                for (; s > 0; ) {
                    let i = 2 * e[a++];
                    -1 == e[i + 1] && (this.length[e[i]] = t,
                    s--)
                }
            }
        }
        getEncodedLength() {
            let e = 0;
            for (let t = 0; t < this.freqs.length; t++)
                e += this.freqs[t] * this.length[t];
            return e
        }
        calcBLFreq(e) {
            let t, s, i, n = -1, r = 0;
            for (; r < this.numCodes; ) {
                i = 1;
                let a = this.length[r];
                for (0 == a ? (t = 138,
                s = 3) : (t = 6,
                s = 3,
                n != a && (e.freqs[a]++,
                i = 0)),
                n = a,
                r++; r < this.numCodes && n == this.length[r] && (r++,
                !(++i >= t)); )
                    ;
                i < s ? e.freqs[n] += i : 0 != n ? e.freqs[os.Repeat3To6]++ : i <= 10 ? e.freqs[os.Repeat3To10]++ : e.freqs[os.Repeat11To138]++
            }
        }
        setStaticCodes(e, t) {
            this.codes = e,
            this.length = t
        }
        buildCodes() {
            let e = new Int32Array(this.maxLength)
              , t = 0;
            this.codes = new Int16Array(this.freqs.length);
            for (let s = 0; s < this.maxLength; s++)
                e[s] = t,
                t += this.bitLengthCounts[s] << 15 - s;
            for (let t = 0; t < this.numCodes; t++) {
                let s = this.length[t];
                s > 0 && (this.codes[t] = hs.bitReverse(e[s - 1]),
                e[s - 1] += 1 << 16 - s)
            }
        }
        writeTree(e) {
            let t, s, i, n = -1, r = 0;
            for (; r < this.numCodes; ) {
                i = 1;
                let a = this.length[r];
                for (0 == a ? (t = 138,
                s = 3) : (t = 6,
                s = 3,
                n != a && (e.writeSymbol(a),
                i = 0)),
                n = a,
                r++; r < this.numCodes && n == this.length[r] && (r++,
                !(++i >= t)); )
                    ;
                if (i < s)
                    for (; i-- > 0; )
                        e.writeSymbol(n);
                else
                    0 != n ? (e.writeSymbol(os.Repeat3To6),
                    this.huffman.pending.writeBits(i - 3, 2)) : i <= 10 ? (e.writeSymbol(os.Repeat3To10),
                    this.huffman.pending.writeBits(i - 3, 3)) : (e.writeSymbol(os.Repeat11To138),
                    this.huffman.pending.writeBits(i - 11, 7))
            }
        }
        writeSymbol(e) {
            this.huffman.pending.writeBits(65535 & this.codes[e], this.length[e])
        }
    }
    os.Repeat3To6 = 16,
    os.Repeat3To10 = 17,
    os.Repeat11To138 = 18;
    class hs {
        constructor(e) {
            this.last_lit = 0,
            this.extra_bits = 0,
            this.pending = e,
            this.literalTree = new os(this,hs.LITERAL_NUM,257,15),
            this.distTree = new os(this,hs.DIST_NUM,1,15),
            this.blTree = new os(this,hs.BITLEN_NUM,4,7),
            this.d_buf = new Int16Array(hs.BUFSIZE),
            this.l_buf = new Uint8Array(hs.BUFSIZE)
        }
        static staticInit() {
            let e = 0;
            for (; e < 144; )
                hs.staticLCodes[e] = hs.bitReverse(48 + e << 8),
                hs.staticLLength[e++] = 8;
            for (; e < 256; )
                hs.staticLCodes[e] = hs.bitReverse(256 + e << 7),
                hs.staticLLength[e++] = 9;
            for (; e < 280; )
                hs.staticLCodes[e] = hs.bitReverse(-256 + e << 9),
                hs.staticLLength[e++] = 7;
            for (; e < hs.LITERAL_NUM; )
                hs.staticLCodes[e] = hs.bitReverse(-88 + e << 8),
                hs.staticLLength[e++] = 8;
            for (e = 0; e < hs.DIST_NUM; e++)
                hs.staticDCodes[e] = hs.bitReverse(e << 11),
                hs.staticDLength[e] = 5
        }
        static bitReverse(e) {
            return hs.bit4Reverse[15 & e] << 12 | hs.bit4Reverse[e >> 4 & 15] << 8 | hs.bit4Reverse[e >> 8 & 15] << 4 | hs.bit4Reverse[e >> 12]
        }
        isFull() {
            return this.last_lit >= hs.BUFSIZE
        }
        reset() {
            this.last_lit = 0,
            this.extra_bits = 0,
            this.literalTree.reset(),
            this.distTree.reset(),
            this.blTree.reset()
        }
        flushStoredBlock(e, t, s, i) {
            this.pending.writeBits((hs.STORED_BLOCK << 1) + (i ? 1 : 0), 3),
            this.pending.alignToByte(),
            this.pending.writeShort(s),
            this.pending.writeShort(~s),
            this.pending.writeBlock(e, t, s),
            this.reset()
        }
        flushBlock(e, t, s, i) {
            this.literalTree.freqs[hs.EOF_SYMBOL]++,
            this.literalTree.buildTree(),
            this.distTree.buildTree(),
            this.literalTree.calcBLFreq(this.blTree),
            this.distTree.calcBLFreq(this.blTree),
            this.blTree.buildTree();
            let n = 4;
            for (let e = 18; e > n; e--)
                this.blTree.length[hs.BL_ORDER[e]] > 0 && (n = e + 1);
            let r = 14 + 3 * n + this.blTree.getEncodedLength() + this.literalTree.getEncodedLength() + this.distTree.getEncodedLength() + this.extra_bits
              , a = this.extra_bits;
            for (let e = 0; e < hs.LITERAL_NUM; e++)
                a += this.literalTree.freqs[e] * hs.staticLLength[e];
            for (let e = 0; e < hs.DIST_NUM; e++)
                a += this.distTree.freqs[e] * hs.staticDLength[e];
            r >= a && (r = a),
            t >= 0 && s + 4 < r >> 3 ? this.flushStoredBlock(e, t, s, i) : r == a ? (this.pending.writeBits((hs.STATIC_TREES << 1) + (i ? 1 : 0), 3),
            this.literalTree.setStaticCodes(hs.staticLCodes, hs.staticLLength),
            this.distTree.setStaticCodes(hs.staticDCodes, hs.staticDLength),
            this.compressBlock(),
            this.reset()) : (this.pending.writeBits((hs.DYN_TREES << 1) + (i ? 1 : 0), 3),
            this.sendAllTrees(n),
            this.compressBlock(),
            this.reset())
        }
        sendAllTrees(e) {
            this.blTree.buildCodes(),
            this.literalTree.buildCodes(),
            this.distTree.buildCodes(),
            this.pending.writeBits(this.literalTree.numCodes - 257, 5),
            this.pending.writeBits(this.distTree.numCodes - 1, 5),
            this.pending.writeBits(e - 4, 4);
            for (let t = 0; t < e; t++)
                this.pending.writeBits(this.blTree.length[hs.BL_ORDER[t]], 3);
            this.literalTree.writeTree(this.blTree),
            this.distTree.writeTree(this.blTree)
        }
        compressBlock() {
            for (let e = 0; e < this.last_lit; e++) {
                let t = 255 & this.l_buf[e]
                  , s = this.d_buf[e];
                if (0 != s--) {
                    let e = hs.Lcode(t);
                    this.literalTree.writeSymbol(e);
                    let i = Math.floor((e - 261) / 4);
                    i > 0 && i <= 5 && this.pending.writeBits(t & (1 << i) - 1, i);
                    let n = hs.Dcode(s);
                    this.distTree.writeSymbol(n),
                    i = Math.floor(n / 2) - 1,
                    i > 0 && this.pending.writeBits(s & (1 << i) - 1, i)
                } else
                    this.literalTree.writeSymbol(t)
            }
            this.literalTree.writeSymbol(hs.EOF_SYMBOL)
        }
        tallyDist(e, t) {
            this.d_buf[this.last_lit] = e,
            this.l_buf[this.last_lit++] = t - 3;
            let s = hs.Lcode(t - 3);
            this.literalTree.freqs[s]++,
            s >= 265 && s < 285 && (this.extra_bits += Math.floor((s - 261) / 4));
            let i = hs.Dcode(e - 1);
            return this.distTree.freqs[i]++,
            i >= 4 && (this.extra_bits += Math.floor(i / 2) - 1),
            this.isFull()
        }
        tallyLit(e) {
            return this.d_buf[this.last_lit] = 0,
            this.l_buf[this.last_lit++] = e,
            this.literalTree.freqs[e]++,
            this.isFull()
        }
        static Lcode(e) {
            if (255 == e)
                return 285;
            let t = 257;
            for (; e >= 8; )
                t += 4,
                e >>= 1;
            return t + e
        }
        static Dcode(e) {
            let t = 0;
            for (; e >= 4; )
                t += 2,
                e >>= 1;
            return t + e
        }
    }
    hs.BUFSIZE = 1 << as.DEFAULT_MEM_LEVEL + 6,
    hs.LITERAL_NUM = 286,
    hs.STORED_BLOCK = 0,
    hs.STATIC_TREES = 1,
    hs.DYN_TREES = 2,
    hs.DIST_NUM = 30,
    hs.staticLCodes = new Int16Array(hs.LITERAL_NUM),
    hs.staticLLength = new Uint8Array(hs.LITERAL_NUM),
    hs.staticDCodes = new Int16Array(hs.DIST_NUM),
    hs.staticDLength = new Uint8Array(hs.DIST_NUM),
    hs.BL_ORDER = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15],
    hs.bit4Reverse = new Uint8Array([0, 8, 4, 12, 2, 10, 6, 14, 1, 9, 5, 13, 3, 11, 7, 15]),
    hs.BITLEN_NUM = 19,
    hs.EOF_SYMBOL = 256,
    hs.staticInit(),
    function(e) {
        e[e.None = 0] = "None",
        e[e.Natural = 1] = "Natural",
        e[e.Sharp = 2] = "Sharp",
        e[e.Flat = 3] = "Flat",
        e[e.NaturalQuarterNoteUp = 4] = "NaturalQuarterNoteUp",
        e[e.SharpQuarterNoteUp = 5] = "SharpQuarterNoteUp",
        e[e.FlatQuarterNoteUp = 6] = "FlatQuarterNoteUp",
        e[e.DoubleSharp = 7] = "DoubleSharp",
        e[e.DoubleFlat = 8] = "DoubleFlat"
    }(qt || (qt = {}));
    class ls {
        constructor() {
            this.width = 0,
            this.height = 0,
            this.totalWidth = 0,
            this.totalHeight = 0,
            this.firstMasterBarIndex = 0,
            this.lastMasterBarIndex = 0,
            this.renderResult = null
        }
    }
    class cs {
        constructor() {
            this.beats = []
        }
        addBeat(e) {
            e.barBounds = this,
            this.beats.push(e),
            this.masterBarBounds.addBeat(e)
        }
        findBeatAtPos(e) {
            let t = null;
            for (let s of this.beats)
                if (!t || s.realBounds.x < e)
                    t = s;
                else if (s.realBounds.x > e)
                    break;
            return t
        }
    }
    class ds {
        constructor() {
            this.notes = null
        }
        addNote(e) {
            this.notes || (this.notes = []),
            e.beatBounds = this,
            this.notes.push(e)
        }
        findNoteAtPos(e, t) {
            const s = this.notes;
            if (!s)
                return null;
            for (let i of s) {
                let s = i.noteHeadBounds.y + i.noteHeadBounds.h
                  , n = i.noteHeadBounds.x + i.noteHeadBounds.w;
                if (i.noteHeadBounds.x >= e && i.noteHeadBounds.y >= t && e <= n && t <= s)
                    return i.note
            }
            return null
        }
    }
    class us {
        constructor() {
            this.index = 0,
            this.isFirstOfLine = !1,
            this.bars = [],
            this.staveGroupBounds = null
        }
        addBar(e) {
            e.masterBarBounds = this,
            this.bars.push(e)
        }
        findBeatAtPos(e, t) {
            let s = null;
            for (let t of this.bars) {
                let i = t.findBeatAtPos(e);
                i && (!s || s.realBounds.x < i.realBounds.x) && (s = i)
            }
            return s ? s.beat : null
        }
        finish() {
            this.bars.sort(( (e, t) => e.realBounds.y < t.realBounds.y ? -1 : e.realBounds.y > t.realBounds.y ? 1 : e.realBounds.x < t.realBounds.x ? -1 : e.realBounds.x > t.realBounds.x ? 1 : 0))
        }
        addBeat(e) {
            this.staveGroupBounds.boundsLookup.addBeat(e)
        }
    }
    class ps {
    }
    class gs {
        constructor() {
            this.index = 0,
            this.bars = []
        }
        finish() {
            for (let e of this.bars)
                e.finish()
        }
        addBar(e) {
            this.boundsLookup.addMasterBar(e),
            e.staveGroupBounds = this,
            this.bars.push(e)
        }
        findBarAtPos(e) {
            let t = null;
            for (let s of this.bars)
                if (!t || s.realBounds.x < e)
                    t = s;
                else if (e > s.realBounds.x + s.realBounds.w)
                    break;
            return t
        }
    }
    class fs {
        constructor() {
            this._beatLookup = new Map,
            this._masterBarLookup = new Map,
            this._currentStaveGroup = null,
            this.staveGroups = [],
            this.isFinished = !1
        }
        toJson() {
            let e = {}
              , t = [];
            e.staveGroups = t;
            for (let e of this.staveGroups) {
                let s = {};
                s.visualBounds = this.boundsToJson(e.visualBounds),
                s.realBounds = this.boundsToJson(e.realBounds),
                s.bars = [];
                for (let t of e.bars) {
                    let e = {};
                    e.lineAlignedBounds = this.boundsToJson(t.lineAlignedBounds),
                    e.visualBounds = this.boundsToJson(t.visualBounds),
                    e.realBounds = this.boundsToJson(t.realBounds),
                    e.index = t.index,
                    e.bars = [];
                    for (let s of t.bars) {
                        let t = {};
                        t.visualBounds = this.boundsToJson(s.visualBounds),
                        t.realBounds = this.boundsToJson(s.realBounds),
                        t.beats = [];
                        for (let e of s.beats) {
                            let s = {};
                            s.visualBounds = this.boundsToJson(e.visualBounds),
                            s.realBounds = this.boundsToJson(e.realBounds);
                            let i = s;
                            if (i.beatIndex = e.beat.index,
                            i.voiceIndex = e.beat.voice.index,
                            i.barIndex = e.beat.voice.bar.index,
                            i.staffIndex = e.beat.voice.bar.staff.index,
                            i.trackIndex = e.beat.voice.bar.staff.track.index,
                            e.notes) {
                                let t = s.notes = [];
                                for (let s of e.notes) {
                                    let e = {};
                                    e.index = s.note.index,
                                    e.noteHeadBounds = this.boundsToJson(s.noteHeadBounds),
                                    t.push(e)
                                }
                            }
                            t.beats.push(s)
                        }
                        e.bars.push(t)
                    }
                    s.bars.push(e)
                }
                t.push(s)
            }
            return e
        }
        static fromJson(e, t) {
            let s = new fs
              , i = e.staveGroups;
            for (let e of i) {
                let i = new gs;
                i.visualBounds = e.visualBounds,
                i.realBounds = e.realBounds,
                s.addStaveGroup(i);
                for (let s of e.bars) {
                    let e = new us;
                    e.index = s.index,
                    e.isFirstOfLine = s.isFirstOfLine,
                    e.lineAlignedBounds = s.lineAlignedBounds,
                    e.visualBounds = s.visualBounds,
                    e.realBounds = s.realBounds,
                    i.addBar(e);
                    for (let i of s.bars) {
                        let s = new cs;
                        s.visualBounds = i.visualBounds,
                        s.realBounds = i.realBounds,
                        e.addBar(s);
                        for (let e of i.beats) {
                            let i = new ds;
                            i.visualBounds = e.visualBounds,
                            i.realBounds = e.realBounds;
                            let n = e;
                            if (i.beat = t.tracks[n.trackIndex].staves[n.staffIndex].bars[n.barIndex].voices[n.voiceIndex].beats[n.beatIndex],
                            e.notes) {
                                i.notes = [];
                                for (let t of e.notes) {
                                    let e = new ps
                                      , s = t;
                                    e.note = i.beat.notes[s.index],
                                    e.noteHeadBounds = t.noteHeadBounds,
                                    i.addNote(e)
                                }
                            }
                            s.addBeat(i)
                        }
                    }
                }
            }
            return s
        }
        boundsToJson(e) {
            let t = {};
            return t.x = e.x,
            t.y = e.y,
            t.w = e.w,
            t.h = e.h,
            t
        }
        finish() {
            for (let e of this.staveGroups)
                e.finish();
            this.isFinished = !0
        }
        addNote(e) {
            this.findBeat(e.note.beat).addNote(e)
        }
        addStaveGroup(e) {
            e.index = this.staveGroups.length,
            e.boundsLookup = this,
            this.staveGroups.push(e),
            this._currentStaveGroup = e
        }
        addMasterBar(e) {
            e.staveGroupBounds ? this._masterBarLookup.set(e.index, e) : (e.staveGroupBounds = this._currentStaveGroup,
            this._masterBarLookup.set(e.index, e),
            this._currentStaveGroup.addBar(e))
        }
        addBeat(e) {
            this._beatLookup.set(e.beat.id, e)
        }
        findMasterBarByIndex(e) {
            return this._masterBarLookup.has(e) ? this._masterBarLookup.get(e) : null
        }
        findMasterBar(e) {
            let t = e.index;
            return this._masterBarLookup.has(t) ? this._masterBarLookup.get(t) : null
        }
        findBeat(e) {
            let t = e.id;
            return this._beatLookup.has(t) ? this._beatLookup.get(t) : null
        }
        getBeatAtPos(e, t) {
            let s = 0
              , i = this.staveGroups.length - 1
              , n = -1;
            for (; s <= i; ) {
                let e = (i + s) / 2 | 0
                  , r = this.staveGroups[e];
                if (t >= r.realBounds.y && t <= r.realBounds.y + r.realBounds.h) {
                    n = e;
                    break
                }
                t < r.realBounds.y ? i = e - 1 : s = e + 1
            }
            if (-1 === n)
                return null;
            let r = this.staveGroups[n].findBarAtPos(e);
            return r ? r.findBeatAtPos(e, t) : null
        }
        getNoteAtPos(e, t, s) {
            let i = this.findBeat(e);
            return i ? i.findNoteAtPos(t, s) : null
        }
    }
    class ms {
        constructor(t) {
            this._currentLayoutMode = e.LayoutMode.Page,
            this._currentRenderEngine = null,
            this._renderedTracks = null,
            this.canvas = null,
            this.score = null,
            this.tracks = null,
            this.layout = null,
            this.boundsLookup = null,
            this.width = 0,
            this.preRender = new et,
            this.renderFinished = new et,
            this.partialRenderFinished = new et,
            this.postRenderFinished = new Ze,
            this.error = new et,
            this.settings = t,
            this.recreateCanvas(),
            this.recreateLayout()
        }
        destroy() {
            this.score = null,
            this.canvas = null,
            this.layout = null,
            this.boundsLookup = null,
            this.tracks = null
        }
        recreateCanvas() {
            return this._currentRenderEngine !== this.settings.core.engine && (this.canvas = Ka.getRenderEngineFactory(this.settings).createCanvas(),
            this._currentRenderEngine = this.settings.core.engine,
            !0)
        }
        recreateLayout() {
            return (!this.layout || this._currentLayoutMode !== this.settings.display.layoutMode) && (this.layout = Ka.getLayoutEngineFactory(this.settings).createLayout(this),
            this._currentLayoutMode = this.settings.display.layoutMode,
            !0)
        }
        renderScore(e, t) {
            try {
                let s;
                if (this.score = e,
                t) {
                    s = [];
                    for (let i of t)
                        i >= 0 && i < e.tracks.length && s.push(e.tracks[i])
                } else
                    s = e.tracks.slice(0);
                0 === s.length && e.tracks.length > 0 && s.push(e.tracks[0]),
                this.tracks = s,
                this.render()
            } catch (e) {
                this.error.trigger(e)
            }
        }
        renderTracks(e) {
            0 === e.length ? this.score = null : this.score = e[0].score,
            this.tracks = e,
            this.render()
        }
        updateSettings(e) {
            this.settings = e
        }
        render() {
            if (0 !== this.width) {
                if (this.boundsLookup = new fs,
                this.tracks && 0 !== this.tracks.length) {
                    this.recreateCanvas(),
                    this.canvas.lineWidth = this.settings.display.scale,
                    this.canvas.settings = this.settings,
                    _e.debug("Rendering", "Rendering " + this.tracks.length + " tracks");
                    for (let e = 0; e < this.tracks.length; e++) {
                        let t = this.tracks[e];
                        _e.debug("Rendering", "Track " + e + ": " + t.name)
                    }
                    this.preRender.trigger(!1),
                    this.recreateLayout(),
                    this.layoutAndRender(),
                    this._renderedTracks = this.tracks,
                    _e.debug("Rendering", "Rendering finished")
                }
            } else
                _e.warning("Rendering", "AlphaTab skipped rendering because of width=0 (element invisible)", null)
        }
        resizeRender() {
            this.recreateLayout() || this.recreateCanvas() || this._renderedTracks !== this.tracks || !this.tracks ? (_e.debug("Rendering", "Starting full rerendering due to layout or canvas change", null),
            this.render()) : this.layout.supportsResize ? (_e.debug("Rendering", "Starting optimized rerendering for resize"),
            this.boundsLookup = new fs,
            this.preRender.trigger(!0),
            this.canvas.settings = this.settings,
            this.layout.resize(),
            this.layout.renderAnnotation(),
            this.onRenderFinished(),
            this.postRenderFinished.trigger()) : _e.warning("Rendering", "Current layout does not support dynamic resizing, nothing was done", null),
            _e.debug("Rendering", "Resize finished")
        }
        layoutAndRender() {
            _e.debug("Rendering", "Rendering at scale " + this.settings.display.scale + " with layout " + this.layout.name, null),
            this.layout.layoutAndRender(),
            this.layout.renderAnnotation(),
            this.onRenderFinished(),
            this.postRenderFinished.trigger()
        }
        onRenderFinished() {
            const e = new ls;
            e.totalHeight = this.layout.height,
            e.totalWidth = this.layout.width,
            e.renderResult = this.canvas.onRenderFinished(),
            this.renderFinished.trigger(e)
        }
    }
    class ys {
        constructor() {
            this.startTick = 0,
            this.endTick = 0
        }
    }
    class bs {
        constructor(e, t, s) {
            this._workerIsReadyForPlayback = !1,
            this._workerIsReady = !1,
            this._outputIsReady = !1,
            this._state = x.Paused,
            this._masterVolume = 0,
            this._metronomeVolume = 0,
            this._countInVolume = 0,
            this._playbackSpeed = 0,
            this._tickPosition = 0,
            this._timePosition = 0,
            this._isLooping = !1,
            this._playbackRange = null,
            this._midiEventsPlayedFilter = [],
            this.ready = new Ze,
            this.readyForPlayback = new Ze,
            this.finished = new Ze,
            this.soundFontLoaded = new Ze,
            this.soundFontLoadFailed = new et,
            this.midiLoaded = new et,
            this.midiLoadFailed = new et,
            this.stateChanged = new et,
            this.positionChanged = new et,
            this.midiEventsPlayed = new et,
            this._workerIsReadyForPlayback = !1,
            this._workerIsReady = !1,
            this._outputIsReady = !1,
            this._state = x.Paused,
            this._masterVolume = 0,
            this._metronomeVolume = 0,
            this._playbackSpeed = 0,
            this._tickPosition = 0,
            this._timePosition = 0,
            this._isLooping = !1,
            this._playbackRange = null,
            this._output = e,
            this._output.ready.on(this.onOutputReady.bind(this)),
            this._output.samplesPlayed.on(this.onOutputSamplesPlayed.bind(this)),
            this._output.sampleRequest.on(this.onOutputSampleRequest.bind(this)),
            this._output.open();
            try {
                let e = new Blob(["importScripts('" + t + "')"]);
                this._synth = new Worker(URL.createObjectURL(e))
            } catch (e) {
                try {
                    this._synth = new Worker(t)
                } catch (e) {
                    return void _e.error("AlphaSynth", "Failed to create WebWorker: " + e)
                }
            }
            this._synth.addEventListener("message", this.handleWorkerMessage.bind(this), !1),
            this._synth.postMessage({
                cmd: "alphaSynth.initialize",
                sampleRate: this._output.sampleRate,
                oggSampleRate: this._output.oggSampleRate,
                logLevel: s
            }),
            this.masterVolume = 1,
            this.playbackSpeed = 1,
            this.metronomeVolume = 0
        }
        get isReady() {
            return this._workerIsReady && this._outputIsReady
        }
        get isReadyForPlayback() {
            return this._workerIsReadyForPlayback
        }
        get state() {
            return this._state
        }
        get logLevel() {
            return _e.logLevel
        }
        set logLevel(e) {
            _e.logLevel = e,
            this._synth.postMessage({
                cmd: "alphaSynth.setLogLevel",
                value: e
            })
        }
        get masterVolume() {
            return this._masterVolume
        }
        set masterVolume(e) {
            e = Math.max(e, he.MinVolume),
            this._masterVolume = e,
            this._synth.postMessage({
                cmd: "alphaSynth.setMasterVolume",
                value: e
            })
        }
        get metronomeVolume() {
            return this._metronomeVolume
        }
        set metronomeVolume(e) {
            e = Math.max(e, he.MinVolume),
            this._metronomeVolume = e,
            this._synth.postMessage({
                cmd: "alphaSynth.setMetronomeVolume",
                value: e
            })
        }
        get countInVolume() {
            return this._countInVolume
        }
        set countInVolume(e) {
            e = Math.max(e, he.MinVolume),
            this._countInVolume = e,
            this._synth.postMessage({
                cmd: "alphaSynth.setCountInVolume",
                value: e
            })
        }
        get midiEventsPlayedFilter() {
            return this._midiEventsPlayedFilter
        }
        set midiEventsPlayedFilter(e) {
            this._midiEventsPlayedFilter = e,
            this._synth.postMessage({
                cmd: "alphaSynth.setMidiEventsPlayedFilter",
                value: e
            })
        }
        get playbackSpeed() {
            return this._playbackSpeed
        }
        set playbackSpeed(e) {
            e = Ue.clamp(e, he.MinPlaybackSpeed, he.MaxPlaybackSpeed),
            this._playbackSpeed = e,
            this._synth.postMessage({
                cmd: "alphaSynth.setPlaybackSpeed",
                value: e
            })
        }
        get tickPosition() {
            return this._tickPosition
        }
        set tickPosition(e) {
            e < 0 && (e = 0),
            this._tickPosition = e,
            this._synth.postMessage({
                cmd: "alphaSynth.setTickPosition",
                value: e
            })
        }
        get timePosition() {
            return this._timePosition
        }
        set timePosition(e) {
            e < 0 && (e = 0),
            this._timePosition = e,
            this._synth.postMessage({
                cmd: "alphaSynth.setTimePosition",
                value: e
            })
        }
        get isLooping() {
            return this._isLooping
        }
        set isLooping(e) {
            this._isLooping = e,
            this._synth.postMessage({
                cmd: "alphaSynth.setIsLooping",
                value: e
            })
        }
        get playbackRange() {
            return this._playbackRange
        }
        set playbackRange(e) {
            e && (e.startTick < 0 && (e.startTick = 0),
            e.endTick < 0 && (e.endTick = 0)),
            this._playbackRange = e,
            this._synth.postMessage({
                cmd: "alphaSynth.setPlaybackRange",
                value: e
            })
        }
        destroy() {
            this._synth.postMessage({
                cmd: "alphaSynth.destroy"
            })
        }
        play() {
            return this._output.activate(),
            this._synth.postMessage({
                cmd: "alphaSynth.play"
            }),
            !0
        }
        pause() {
            this._synth.postMessage({
                cmd: "alphaSynth.pause"
            })
        }
        playPause() {
            this._output.activate(),
            this._synth.postMessage({
                cmd: "alphaSynth.playPause"
            })
        }
        stop() {
            this._synth.postMessage({
                cmd: "alphaSynth.stop"
            })
        }
        playOneTimeMidiFile(e) {
            this._synth.postMessage({
                cmd: "alphaSynth.playOneTimeMidiFile",
                midi: Js.midiFileToJsObject(e)
            })
        }
        loadSoundFont(e, t, s) {
            this._synth.postMessage({
                cmd: "alphaSynth.loadSoundFontBytes",
                data: e,
                append: t,
                compressed: s
            })
        }
        loadSoundFontFromUrl(e, t, s) {
            _e.debug("AlphaSynth", "Start loading Soundfont from url " + e);
            const i = e.endsWith(".ypz");
            let n = new XMLHttpRequest;
            n.open("GET", e, !0, null, null),
            n.responseType = "arraybuffer",
            n.onload = e => {
                let s = new Uint8Array(n.response);
                this.loadSoundFont(s, t, i)
            }
            ,
            n.onerror = e => {
                _e.error("AlphaSynth", "Loading failed: " + e.message),
                this.soundFontLoadFailed.trigger(new Dt(e.message,n))
            }
            ,
            n.onprogress = e => {
                _e.debug("AlphaSynth", `Soundfont downloading: ${e.loaded}/${e.total} bytes`),
                s(new Et(e.loaded,e.total))
            }
            ,
            n.send()
        }
        resetSoundFonts() {
            this._synth.postMessage({
                cmd: "alphaSynth.resetSoundFonts"
            })
        }
        loadMidiFile(e) {
            this._synth.postMessage({
                cmd: "alphaSynth.loadMidi",
                midi: Js.midiFileToJsObject(e)
            })
        }
        setChannelMute(e, t) {
            this._synth.postMessage({
                cmd: "alphaSynth.setChannelMute",
                channel: e,
                mute: t
            })
        }
        resetChannelStates() {
            this._synth.postMessage({
                cmd: "alphaSynth.resetChannelStates"
            })
        }
        setChannelSolo(e, t) {
            this._synth.postMessage({
                cmd: "alphaSynth.setChannelSolo",
                channel: e,
                solo: t
            })
        }
        setChannelVolume(e, t) {
            t = Math.max(t, he.MinVolume),
            this._synth.postMessage({
                cmd: "alphaSynth.setChannelVolume",
                channel: e,
                volume: t
            })
        }
        handleWorkerMessage(e) {
            let t = e.data;
            switch (t.cmd) {
            case "alphaSynth.ready":
                this._workerIsReady = !0,
                this.checkReady();
                break;
            case "alphaSynth.destroyed":
                this._synth.terminate();
                break;
            case "alphaSynth.readyForPlayback":
                this._workerIsReadyForPlayback = !0,
                this.checkReadyForPlayback();
                break;
            case "alphaSynth.positionChanged":
                this._timePosition = t.currentTime,
                this._tickPosition = t.currentTick,
                this.positionChanged.trigger(new xe(t.currentTime,t.endTime,t.currentTick,t.endTick,t.isSeek));
                break;
            case "alphaSynth.midiEventsPlayed":
                this.midiEventsPlayed.trigger(new tt(t.events.map(Js.jsObjectToMidiEvent)));
                break;
            case "alphaSynth.playerStateChanged":
                this._state = t.state,
                this.stateChanged.trigger(new ve(t.state,t.stopped));
                break;
            case "alphaSynth.finished":
                this.finished.trigger();
                break;
            case "alphaSynth.soundFontLoaded":
                this.soundFontLoaded.trigger();
                break;
            case "alphaSynth.soundFontLoadFailed":
                this.soundFontLoadFailed.trigger(t.error);
                break;
            case "alphaSynth.midiLoaded":
                this.checkReadyForPlayback(),
                this.midiLoaded.trigger(new xe(t.currentTime,t.endTime,t.currentTick,t.endTick,t.isSeek));
                break;
            case "alphaSynth.midiLoadFailed":
                this.checkReadyForPlayback(),
                this.midiLoadFailed.trigger(t.error);
                break;
            case "alphaSynth.output.addSamples":
                this._output.addSamples(t.samples);
                break;
            case "alphaSynth.output.play":
                this._output.play();
                break;
            case "alphaSynth.output.pause":
                this._output.pause();
                break;
            case "alphaSynth.output.destroy":
                this._output.destroy();
                break;
            case "alphaSynth.output.resetSamples":
                this._output.resetSamples();
                break;
            case "alphaSynth.output.decodeAudioData":
                this._output.decodeAudioData(t.data).then((e => {
                    this._synth.postMessage({
                        cmd: "alphaSynth.output.decodeAudioData",
                        jobId: t.jobId,
                        decodedData: e
                    })
                }
                )).catch((e => {
                    this._synth.postMessage({
                        cmd: "alphaSynth.output.decodeAudioData",
                        jobId: t.jobId,
                        decodedData: new Float32Array(0)
                    })
                }
                ))
            }
        }
        checkReady() {
            this.isReady && this.ready.trigger()
        }
        checkReadyForPlayback() {
            this.isReadyForPlayback && this.readyForPlayback.trigger()
        }
        onOutputSampleRequest() {
            this._synth.postMessage({
                cmd: "alphaSynth.output.sampleRequest"
            })
        }
        onOutputSamplesPlayed(e) {
            this._synth.postMessage({
                cmd: "alphaSynth.output.samplesPlayed",
                samples: e
            })
        }
        onOutputReady() {
            this._outputIsReady = !0,
            this.checkReady()
        }
    }
    class Ss {
        static parseEnum(e, t) {
            switch (typeof e) {
            case "string":
                const s = parseInt(e);
                return isNaN(s) ? t[Object.keys(t).find((t => t.toLowerCase() === e.toLowerCase()))] : s;
            case "number":
                return e;
            case "undefined":
            case "object":
                return null
            }
            throw new Pe(k.Format,`Could not parse enum value '${e}'`)
        }
        static forEach(e, t) {
            if (e instanceof Map)
                e.forEach(t);
            else if ("object" == typeof e)
                for (const s in e)
                    t(e[s], s)
        }
    }
    class ws {
        static fromJson(e, t) {
            t && Ss.forEach(t, ( (t, s) => this.setProperty(e, s.toLowerCase(), t)))
        }
        static toJson(e) {
            if (!e)
                return null;
            const t = new Map
              , s = new Kt;
            return s.marker !== e.marker && t.set("marker", e.marker),
            s.text !== e.text && t.set("text", e.text),
            t
        }
        static setProperty(e, t, s) {
            switch (t) {
            case "marker":
                return e.marker = s,
                !0;
            case "text":
                return e.text = s,
                !0
            }
            return !1
        }
    }
    class _s {
        static fromJson(e, t) {
            t && Ss.forEach(t, ( (t, s) => this.setProperty(e, s.toLowerCase(), t)))
        }
        static toJson(e) {
            if (!e)
                return null;
            const t = new Map
              , s = new me;
            return s.isLinear !== e.isLinear && t.set("isLinear", e.isLinear),
            s.type !== e.type && t.set("type", e.type),
            s.value !== e.value && t.set("value", e.value),
            s.ratioPosition !== e.ratioPosition && t.set("ratioPosition", e.ratioPosition),
            s.text !== e.text && t.set("text", e.text),
            t
        }
        static setProperty(e, t, s) {
            switch (t) {
            case "islinear":
                return e.isLinear = s,
                !0;
            case "type":
                return e.type = Ss.parseEnum(s, o),
                !0;
            case "value":
                return e.value = s,
                !0;
            case "ratioposition":
                return e.ratioPosition = s,
                !0;
            case "text":
                return e.text = s,
                !0
            }
            return !1
        }
    }
    class Bs {
        static fromJson(e, t) {
            t && Ss.forEach(t, ( (t, s) => this.setProperty(e, s.toLowerCase(), t)))
        }
        static toJson(e) {
            if (!e)
                return null;
            const t = new Map
              , s = new is;
            return s.type !== e.type && t.set("type", e.type),
            s.length !== e.length && t.set("length", e.length),
            t
        }
        static setProperty(e, t, s) {
            switch (t) {
            case "type":
                return e.type = Ss.parseEnum(s, zt),
                !0;
            case "length":
                return e.length = s,
                !0
            }
            return !1
        }
    }
    class Ts {
        static fromJson(e, t) {
            t && Ss.forEach(t, ( (t, s) => this.setProperty(e, s.toLowerCase(), t)))
        }
        static toJson(e) {
            if (!e)
                return null;
            const t = new Map
              , s = new Qt;
            if (s.alternateEndings !== e.alternateEndings && t.set("alternateEndings", e.alternateEndings),
            s.keySignature !== e.keySignature && t.set("keySignature", e.keySignature),
            s.keySignatureType !== e.keySignatureType && t.set("keySignatureType", e.keySignatureType),
            s.isDoubleBar !== e.isDoubleBar && t.set("isDoubleBar", e.isDoubleBar),
            s.isRepeatStart !== e.isRepeatStart && t.set("isRepeatStart", e.isRepeatStart),
            s.repeatCount !== e.repeatCount && t.set("repeatCount", e.repeatCount),
            s.timeSignatureNumerator !== e.timeSignatureNumerator && t.set("timeSignatureNumerator", e.timeSignatureNumerator),
            s.timeSignatureDenominator !== e.timeSignatureDenominator && t.set("timeSignatureDenominator", e.timeSignatureDenominator),
            s.timeSignatureCommon !== e.timeSignatureCommon && t.set("timeSignatureCommon", e.timeSignatureCommon),
            s.tripletFeel !== e.tripletFeel && t.set("tripletFeel", e.tripletFeel),
            s.section !== e.section && t.set("section", ws.toJson(e.section)),
            s.tempoAutomation !== e.tempoAutomation && t.set("tempoAutomation", _s.toJson(e.tempoAutomation)),
            s.fermata !== e.fermata) {
                const s = new Map;
                for (const [t,i] of e.fermata)
                    s.set(t.toString(), Bs.toJson(i));
                s.size > 0 && t.set("fermata", s)
            }
            return s.isAnacrusis !== e.isAnacrusis && t.set("isAnacrusis", e.isAnacrusis),
            t
        }
        static setProperty(e, t, s) {
            switch (t) {
            case "alternateendings":
                return e.alternateEndings = s,
                !0;
            case "keysignature":
                return e.keySignature = Ss.parseEnum(s, $),
                !0;
            case "keysignaturetype":
                return e.keySignatureType = Ss.parseEnum(s, Vt),
                !0;
            case "isdoublebar":
                return e.isDoubleBar = s,
                !0;
            case "isrepeatstart":
                return e.isRepeatStart = s,
                !0;
            case "repeatcount":
                return e.repeatCount = s,
                !0;
            case "timesignaturenumerator":
                return e.timeSignatureNumerator = s,
                !0;
            case "timesignaturedenominator":
                return e.timeSignatureDenominator = s,
                !0;
            case "timesignaturecommon":
                return e.timeSignatureCommon = s,
                !0;
            case "tripletfeel":
                return e.tripletFeel = Ss.parseEnum(s, y),
                !0;
            case "fermata":
                return e.fermata = new Map,
                Ss.forEach(s, ( (t, s) => {
                    const i = new is;
                    Bs.fromJson(i, t),
                    e.fermata.set(parseInt(s), i)
                }
                )),
                !0;
            case "isanacrusis":
                return e.isAnacrusis = s,
                !0
            }
            return ["section"].indexOf(t) >= 0 ? (s ? (e.section = new Kt,
            ws.fromJson(e.section, s)) : e.section = null,
            !0) : ["tempoautomation"].indexOf(t) >= 0 && (s ? (e.tempoAutomation = new me,
            _s.fromJson(e.tempoAutomation, s)) : e.tempoAutomation = null,
            !0)
        }
    }
    class Ns {
        static fromJson(e, t) {
            t && Ss.forEach(t, ( (t, s) => this.setProperty(e, s.toLowerCase(), t)))
        }
        static toJson(e) {
            if (!e)
                return null;
            const t = new Map
              , s = new ye;
            return s.offset !== e.offset && t.set("offset", e.offset),
            s.value !== e.value && t.set("value", e.value),
            t
        }
        static setProperty(e, t, s) {
            switch (t) {
            case "offset":
                return e.offset = s,
                !0;
            case "value":
                return e.value = s,
                !0
            }
            return !1
        }
    }
    class vs {
        static fromJson(e, t) {
            t && Ss.forEach(t, ( (t, s) => this.setProperty(e, s.toLowerCase(), t)))
        }
        static toJson(e) {
            if (!e)
                return null;
            const t = new Map
              , s = new dt;
            return t.set("id", e.id),
            s.accentuated !== e.accentuated && t.set("accentuated", e.accentuated),
            s.bendType !== e.bendType && t.set("bendType", e.bendType),
            s.bendStyle !== e.bendStyle && t.set("bendStyle", e.bendStyle),
            s.isContinuedBend !== e.isContinuedBend && t.set("isContinuedBend", e.isContinuedBend),
            e.bendPoints.length > 0 && t.set("bendPoints", e.bendPoints.map((e => Ns.toJson(e)))),
            s.fret !== e.fret && t.set("fret", e.fret),
            s.string !== e.string && t.set("string", e.string),
            s.octave !== e.octave && t.set("octave", e.octave),
            s.tone !== e.tone && t.set("tone", e.tone),
            s.percussionArticulation !== e.percussionArticulation && t.set("percussionArticulation", e.percussionArticulation),
            s.isVisible !== e.isVisible && t.set("isVisible", e.isVisible),
            s.isLeftHandTapped !== e.isLeftHandTapped && t.set("isLeftHandTapped", e.isLeftHandTapped),
            s.isHammerPullOrigin !== e.isHammerPullOrigin && t.set("isHammerPullOrigin", e.isHammerPullOrigin),
            s.hammerPullOriginNoteId !== e.hammerPullOriginNoteId && t.set("hammerPullOriginNoteId", e.hammerPullOriginNoteId),
            s.hammerPullDestinationNoteId !== e.hammerPullDestinationNoteId && t.set("hammerPullDestinationNoteId", e.hammerPullDestinationNoteId),
            s.isSlurDestination !== e.isSlurDestination && t.set("isSlurDestination", e.isSlurDestination),
            s.slurOriginNoteId !== e.slurOriginNoteId && t.set("slurOriginNoteId", e.slurOriginNoteId),
            s.slurDestinationNoteId !== e.slurDestinationNoteId && t.set("slurDestinationNoteId", e.slurDestinationNoteId),
            s.harmonicType !== e.harmonicType && t.set("harmonicType", e.harmonicType),
            s.harmonicValue !== e.harmonicValue && t.set("harmonicValue", e.harmonicValue),
            s.isGhost !== e.isGhost && t.set("isGhost", e.isGhost),
            s.isLetRing !== e.isLetRing && t.set("isLetRing", e.isLetRing),
            s.isPalmMute !== e.isPalmMute && t.set("isPalmMute", e.isPalmMute),
            s.isDead !== e.isDead && t.set("isDead", e.isDead),
            s.isStaccato !== e.isStaccato && t.set("isStaccato", e.isStaccato),
            s.slideInType !== e.slideInType && t.set("slideInType", e.slideInType),
            s.slideOutType !== e.slideOutType && t.set("slideOutType", e.slideOutType),
            s.vibrato !== e.vibrato && t.set("vibrato", e.vibrato),
            s.tieOriginNoteId !== e.tieOriginNoteId && t.set("tieOriginNoteId", e.tieOriginNoteId),
            s.tieDestinationNoteId !== e.tieDestinationNoteId && t.set("tieDestinationNoteId", e.tieDestinationNoteId),
            s.isTieDestination !== e.isTieDestination && t.set("isTieDestination", e.isTieDestination),
            s.leftHandFinger !== e.leftHandFinger && t.set("leftHandFinger", e.leftHandFinger),
            s.rightHandFinger !== e.rightHandFinger && t.set("rightHandFinger", e.rightHandFinger),
            s.isFingering !== e.isFingering && t.set("isFingering", e.isFingering),
            s.trillValue !== e.trillValue && t.set("trillValue", e.trillValue),
            s.trillSpeed !== e.trillSpeed && t.set("trillSpeed", e.trillSpeed),
            s.durationPercent !== e.durationPercent && t.set("durationPercent", e.durationPercent),
            s.accidentalMode !== e.accidentalMode && t.set("accidentalMode", e.accidentalMode),
            s.glyphTags !== e.glyphTags && t.set("glyphTags", e.glyphTags),
            t
        }
        static setProperty(e, t, s) {
            switch (t) {
            case "id":
                return e.id = s,
                !0;
            case "accentuated":
                return e.accentuated = Ss.parseEnum(s, a),
                !0;
            case "bendtype":
                return e.bendType = Ss.parseEnum(s, l),
                !0;
            case "bendstyle":
                return e.bendStyle = Ss.parseEnum(s, h),
                !0;
            case "iscontinuedbend":
                return e.isContinuedBend = s,
                !0;
            case "bendpoints":
                e.bendPoints = [];
                for (const t of s) {
                    const s = new ye;
                    Ns.fromJson(s, t),
                    e.addBendPoint(s)
                }
                return !0;
            case "fret":
                return e.fret = s,
                !0;
            case "string":
                return e.string = s,
                !0;
            case "octave":
                return e.octave = s,
                !0;
            case "tone":
                return e.tone = s,
                !0;
            case "percussionarticulation":
                return e.percussionArticulation = s,
                !0;
            case "isvisible":
                return e.isVisible = s,
                !0;
            case "islefthandtapped":
                return e.isLeftHandTapped = s,
                !0;
            case "ishammerpullorigin":
                return e.isHammerPullOrigin = s,
                !0;
            case "hammerpulloriginnoteid":
                return e.hammerPullOriginNoteId = s,
                !0;
            case "hammerpulldestinationnoteid":
                return e.hammerPullDestinationNoteId = s,
                !0;
            case "isslurdestination":
                return e.isSlurDestination = s,
                !0;
            case "sluroriginnoteid":
                return e.slurOriginNoteId = s,
                !0;
            case "slurdestinationnoteid":
                return e.slurDestinationNoteId = s,
                !0;
            case "harmonictype":
                return e.harmonicType = Ss.parseEnum(s, M),
                !0;
            case "harmonicvalue":
                return e.harmonicValue = s,
                !0;
            case "isghost":
                return e.isGhost = s,
                !0;
            case "isletring":
                return e.isLetRing = s,
                !0;
            case "ispalmmute":
                return e.isPalmMute = s,
                !0;
            case "isdead":
                return e.isDead = s,
                !0;
            case "isstaccato":
                return e.isStaccato = s,
                !0;
            case "slideintype":
                return e.slideInType = Ss.parseEnum(s, f),
                !0;
            case "slideouttype":
                return e.slideOutType = Ss.parseEnum(s, m),
                !0;
            case "vibrato":
                return e.vibrato = Ss.parseEnum(s, b),
                !0;
            case "tieoriginnoteid":
                return e.tieOriginNoteId = s,
                !0;
            case "tiedestinationnoteid":
                return e.tieDestinationNoteId = s,
                !0;
            case "istiedestination":
                return e.isTieDestination = s,
                !0;
            case "lefthandfinger":
                return e.leftHandFinger = Ss.parseEnum(s, E),
                !0;
            case "righthandfinger":
                return e.rightHandFinger = Ss.parseEnum(s, E),
                !0;
            case "isfingering":
                return e.isFingering = s,
                !0;
            case "trillvalue":
                return e.trillValue = s,
                !0;
            case "trillspeed":
                return e.trillSpeed = Ss.parseEnum(s, d),
                !0;
            case "durationpercent":
                return e.durationPercent = s,
                !0;
            case "accidentalmode":
                return e.accidentalMode = Ss.parseEnum(s, D),
                !0;
            case "glyphtags":
                return e.glyphTags = s,
                !0
            }
            return !1
        }
    }
    class xs {
        static fromJson(e, t) {
            t && Ss.forEach(t, ( (t, s) => this.setProperty(e, s.toLowerCase(), t)))
        }
        static toJson(e) {
            if (!e)
                return null;
            const t = new Map
              , s = new ft;
            return t.set("id", e.id),
            e.notes.length > 0 && t.set("notes", e.notes.map((e => vs.toJson(e)))),
            s.isEmpty !== e.isEmpty && t.set("isEmpty", e.isEmpty),
            s.isDumb !== e.isDumb && t.set("isDumb", e.isDumb),
            s.whammyStyle !== e.whammyStyle && t.set("whammyStyle", e.whammyStyle),
            s.ottava !== e.ottava && t.set("ottava", e.ottava),
            s.isLegatoOrigin !== e.isLegatoOrigin && t.set("isLegatoOrigin", e.isLegatoOrigin),
            s.duration !== e.duration && t.set("duration", e.duration),
            e.automations.length > 0 && t.set("automations", e.automations.map((e => _s.toJson(e)))),
            s.dots !== e.dots && t.set("dots", e.dots),
            s.fadeIn !== e.fadeIn && t.set("fadeIn", e.fadeIn),
            s.lyrics !== e.lyrics && t.set("lyrics", e.lyrics),
            s.hasRasgueado !== e.hasRasgueado && t.set("hasRasgueado", e.hasRasgueado),
            s.pop !== e.pop && t.set("pop", e.pop),
            s.slap !== e.slap && t.set("slap", e.slap),
            s.tap !== e.tap && t.set("tap", e.tap),
            s.text !== e.text && t.set("text", e.text),
            s.brushType !== e.brushType && t.set("brushType", e.brushType),
            s.brushDuration !== e.brushDuration && t.set("brushDuration", e.brushDuration),
            s.tupletDenominator !== e.tupletDenominator && t.set("tupletDenominator", e.tupletDenominator),
            s.tupletNumerator !== e.tupletNumerator && t.set("tupletNumerator", e.tupletNumerator),
            s.isContinuedWhammy !== e.isContinuedWhammy && t.set("isContinuedWhammy", e.isContinuedWhammy),
            s.whammyBarType !== e.whammyBarType && t.set("whammyBarType", e.whammyBarType),
            e.whammyBarPoints.length > 0 && t.set("whammyBarPoints", e.whammyBarPoints.map((e => Ns.toJson(e)))),
            s.vibrato !== e.vibrato && t.set("vibrato", e.vibrato),
            s.chordId !== e.chordId && t.set("chordId", e.chordId),
            s.sustainPedal !== e.sustainPedal && t.set("sustainPedal", e.sustainPedal),
            s.graceType !== e.graceType && t.set("graceType", e.graceType),
            s.pickStroke !== e.pickStroke && t.set("pickStroke", e.pickStroke),
            s.tremoloSpeed !== e.tremoloSpeed && t.set("tremoloSpeed", e.tremoloSpeed),
            s.crescendo !== e.crescendo && t.set("crescendo", e.crescendo),
            s.dynamics !== e.dynamics && t.set("dynamics", e.dynamics),
            s.invertBeamDirection !== e.invertBeamDirection && t.set("invertBeamDirection", e.invertBeamDirection),
            s.preferredBeamDirection !== e.preferredBeamDirection && t.set("preferredBeamDirection", e.preferredBeamDirection),
            s.beamingMode !== e.beamingMode && t.set("beamingMode", e.beamingMode),
            t
        }
        static setProperty(e, t, s) {
            switch (t) {
            case "id":
                return e.id = s,
                !0;
            case "notes":
                e.notes = [];
                for (const t of s) {
                    const s = new dt;
                    vs.fromJson(s, t),
                    e.addNote(s)
                }
                return !0;
            case "isempty":
                return e.isEmpty = s,
                !0;
            case "isdumb":
                return e.isDumb = s,
                !0;
            case "whammystyle":
                return e.whammyStyle = Ss.parseEnum(s, h),
                !0;
            case "ottava":
                return e.ottava = Ss.parseEnum(s, R),
                !0;
            case "islegatoorigin":
                return e.isLegatoOrigin = s,
                !0;
            case "duration":
                return e.duration = Ss.parseEnum(s, d),
                !0;
            case "automations":
                e.automations = [];
                for (const t of s) {
                    const s = new me;
                    _s.fromJson(s, t),
                    e.automations.push(s)
                }
                return !0;
            case "dots":
                return e.dots = s,
                !0;
            case "fadein":
                return e.fadeIn = s,
                !0;
            case "lyrics":
                return e.lyrics = s,
                !0;
            case "hasrasgueado":
                return e.hasRasgueado = s,
                !0;
            case "pop":
                return e.pop = s,
                !0;
            case "slap":
                return e.slap = s,
                !0;
            case "tap":
                return e.tap = s,
                !0;
            case "text":
                return e.text = s,
                !0;
            case "brushtype":
                return e.brushType = Ss.parseEnum(s, c),
                !0;
            case "brushduration":
                return e.brushDuration = s,
                !0;
            case "tupletdenominator":
                return e.tupletDenominator = s,
                !0;
            case "tupletnumerator":
                return e.tupletNumerator = s,
                !0;
            case "iscontinuedwhammy":
                return e.isContinuedWhammy = s,
                !0;
            case "whammybartype":
                return e.whammyBarType = Ss.parseEnum(s, S),
                !0;
            case "whammybarpoints":
                e.whammyBarPoints = [];
                for (const t of s) {
                    const s = new ye;
                    Ns.fromJson(s, t),
                    e.addWhammyBarPoint(s)
                }
                return !0;
            case "vibrato":
                return e.vibrato = Ss.parseEnum(s, b),
                !0;
            case "chordid":
                return e.chordId = s,
                !0;
            case "sustainpedal":
                return e.sustainPedal = Ss.parseEnum(s, W),
                !0;
            case "gracetype":
                return e.graceType = Ss.parseEnum(s, p),
                !0;
            case "pickstroke":
                return e.pickStroke = Ss.parseEnum(s, O),
                !0;
            case "tremolospeed":
                return e.tremoloSpeed = Ss.parseEnum(s, d),
                !0;
            case "crescendo":
                return e.crescendo = Ss.parseEnum(s, V),
                !0;
            case "dynamics":
                return e.dynamics = Ss.parseEnum(s, u),
                !0;
            case "invertbeamdirection":
                return e.invertBeamDirection = s,
                !0;
            case "preferredbeamdirection":
                return e.preferredBeamDirection = Ss.parseEnum(s, Ut),
                !0;
            case "beamingmode":
                return e.beamingMode = Ss.parseEnum(s, z),
                !0
            }
            return !1
        }
    }
    class ks {
        static fromJson(e, t) {
            t && Ss.forEach(t, ( (t, s) => this.setProperty(e, s.toLowerCase(), t)))
        }
        static toJson(e) {
            if (!e)
                return null;
            const t = new Map
              , s = new wt;
            return t.set("id", e.id),
            e.beats.length > 0 && t.set("beats", e.beats.map((e => xs.toJson(e)))),
            s.isEmpty !== e.isEmpty && t.set("isEmpty", e.isEmpty),
            t
        }
        static setProperty(e, t, s) {
            switch (t) {
            case "id":
                return e.id = s,
                !0;
            case "beats":
                e.beats = [];
                for (const t of s) {
                    const s = new ft;
                    xs.fromJson(s, t),
                    e.addBeat(s)
                }
                return !0;
            case "isempty":
                return e.isEmpty = s,
                !0
            }
            return !1
        }
    }
    class Ps {
        static fromJson(e, t) {
            t && Ss.forEach(t, ( (t, s) => this.setProperty(e, s.toLowerCase(), t)))
        }
        static toJson(e) {
            if (!e)
                return null;
            const t = new Map
              , s = new ut;
            return t.set("id", e.id),
            s.clef !== e.clef && t.set("clef", e.clef),
            s.clefOttava !== e.clefOttava && t.set("clefOttava", e.clefOttava),
            e.voices.length > 0 && t.set("voices", e.voices.map((e => ks.toJson(e)))),
            s.simileMark !== e.simileMark && t.set("simileMark", e.simileMark),
            t
        }
        static setProperty(e, t, s) {
            switch (t) {
            case "id":
                return e.id = s,
                !0;
            case "clef":
                return e.clef = Ss.parseEnum(s, H),
                !0;
            case "clefottava":
                return e.clefOttava = Ss.parseEnum(s, R),
                !0;
            case "voices":
                e.voices = [];
                for (const t of s) {
                    const s = new wt;
                    ks.fromJson(s, t),
                    e.addVoice(s)
                }
                return !0;
            case "similemark":
                return e.simileMark = Ss.parseEnum(s, g),
                !0
            }
            return !1
        }
    }
    class Fs {
        static fromJson(e, t) {
            t && Ss.forEach(t, ( (t, s) => this.setProperty(e, s.toLowerCase(), t)))
        }
        static toJson(e) {
            if (!e)
                return null;
            const t = new Map
              , s = new ts;
            return s.fret !== e.fret && t.set("fret", e.fret),
            s.finger !== e.finger && t.set("finger", e.finger),
            t
        }
        static setProperty(e, t, s) {
            switch (t) {
            case "fret":
                return e.fret = s,
                !0;
            case "finger":
                return e.finger = Ss.parseEnum(s, E),
                !0
            }
            return !1
        }
    }
    class Cs {
        static fromJson(e, t) {
            t && Ss.forEach(t, ( (t, s) => this.setProperty(e, s.toLowerCase(), t)))
        }
        static toJson(e) {
            if (!e)
                return null;
            const t = new Map
              , s = new At;
            return s.name !== e.name && t.set("name", e.name),
            s.firstFret !== e.firstFret && t.set("firstFret", e.firstFret),
            e.strings.length > 0 && t.set("strings", e.strings.map((e => Fs.toJson(e)))),
            s.barreFrets !== e.barreFrets && t.set("barreFrets", e.barreFrets),
            s.showName !== e.showName && t.set("showName", e.showName),
            s.showDiagram !== e.showDiagram && t.set("showDiagram", e.showDiagram),
            s.showFingering !== e.showFingering && t.set("showFingering", e.showFingering),
            t
        }
        static setProperty(e, t, s) {
            switch (t) {
            case "name":
                return e.name = s,
                !0;
            case "firstfret":
                return e.firstFret = s,
                !0;
            case "strings":
                e.strings = [];
                for (const t of s) {
                    const s = new ts;
                    Fs.fromJson(s, t),
                    e.strings.push(s)
                }
                return !0;
            case "barrefrets":
                return e.barreFrets = s,
                !0;
            case "showname":
                return e.showName = s,
                !0;
            case "showdiagram":
                return e.showDiagram = s,
                !0;
            case "showfingering":
                return e.showFingering = s,
                !0
            }
            return !1
        }
    }
    class Ls {
        static fromJson(e, t) {
            t && Ss.forEach(t, ( (t, s) => this.setProperty(e, s.toLowerCase(), t)))
        }
        static toJson(e) {
            if (!e)
                return null;
            const t = new Map
              , s = new jt;
            return s.isStandard !== e.isStandard && t.set("isStandard", e.isStandard),
            s.name !== e.name && t.set("name", e.name),
            s.tunings !== e.tunings && t.set("tunings", e.tunings),
            t
        }
        static setProperty(e, t, s) {
            switch (t) {
            case "isstandard":
                return e.isStandard = s,
                !0;
            case "name":
                return e.name = s,
                !0;
            case "tunings":
                return e.tunings = s,
                !0
            }
            return !1
        }
    }
    class Es {
        static fromJson(e, t) {
            t && Ss.forEach(t, ( (t, s) => this.setProperty(e, s.toLowerCase(), t)))
        }
        static toJson(e) {
            if (!e)
                return null;
            const t = new Map
              , s = new Zt;
            if (e.bars.length > 0 && t.set("bars", e.bars.map((e => Ps.toJson(e)))),
            s.chords !== e.chords) {
                const s = new Map;
                for (const [t,i] of e.chords)
                    s.set(t.toString(), Cs.toJson(i));
                s.size > 0 && t.set("chords", s)
            }
            return s.capo !== e.capo && t.set("capo", e.capo),
            s.transpositionPitch !== e.transpositionPitch && t.set("transpositionPitch", e.transpositionPitch),
            s.displayTranspositionPitch !== e.displayTranspositionPitch && t.set("displayTranspositionPitch", e.displayTranspositionPitch),
            s.stringTuning !== e.stringTuning && t.set("stringTuning", Ls.toJson(e.stringTuning)),
            s.showTablature !== e.showTablature && t.set("showTablature", e.showTablature),
            s.showStandardNotation !== e.showStandardNotation && t.set("showStandardNotation", e.showStandardNotation),
            s.showNumberedNotation !== e.showNumberedNotation && t.set("showNumberedNotation", e.showNumberedNotation),
            s.isPercussion !== e.isPercussion && t.set("isPercussion", e.isPercussion),
            s.standardNotationLineCount !== e.standardNotationLineCount && t.set("standardNotationLineCount", e.standardNotationLineCount),
            s.avoidInChordFretNumber !== e.avoidInChordFretNumber && t.set("avoidInChordFretNumber", e.avoidInChordFretNumber),
            t
        }
        static setProperty(e, t, s) {
            switch (t) {
            case "bars":
                e.bars = [];
                for (const t of s) {
                    const s = new ut;
                    Ps.fromJson(s, t),
                    e.addBar(s)
                }
                return !0;
            case "chords":
                return e.chords = new Map,
                Ss.forEach(s, ( (t, s) => {
                    const i = new At;
                    Cs.fromJson(i, t),
                    e.addChord(s, i)
                }
                )),
                !0;
            case "capo":
                return e.capo = s,
                !0;
            case "transpositionpitch":
                return e.transpositionPitch = s,
                !0;
            case "displaytranspositionpitch":
                return e.displayTranspositionPitch = s,
                !0;
            case "showtablature":
                return e.showTablature = s,
                !0;
            case "showstandardnotation":
                return e.showStandardNotation = s,
                !0;
            case "shownumberednotation":
                return e.showNumberedNotation = s,
                !0;
            case "ispercussion":
                return e.isPercussion = s,
                !0;
            case "standardnotationlinecount":
                return e.standardNotationLineCount = s,
                !0;
            case "avoidinchordfretnumber":
                return e.avoidInChordFretNumber = s,
                !0
            }
            return ["stringtuning"].indexOf(t) >= 0 && (Ls.fromJson(e.stringTuning, s),
            !0)
        }
    }
    class Ms {
        static fromJson(e, t) {
            t && Ss.forEach(t, ( (t, s) => this.setProperty(e, s.toLowerCase(), t)))
        }
        static toJson(e) {
            if (!e)
                return null;
            const t = new Map
              , s = new $t;
            return s.volume !== e.volume && t.set("volume", e.volume),
            s.balance !== e.balance && t.set("balance", e.balance),
            s.port !== e.port && t.set("port", e.port),
            s.program !== e.program && t.set("program", e.program),
            s.primaryChannel !== e.primaryChannel && t.set("primaryChannel", e.primaryChannel),
            s.secondaryChannel !== e.secondaryChannel && t.set("secondaryChannel", e.secondaryChannel),
            s.isMute !== e.isMute && t.set("isMute", e.isMute),
            s.isSolo !== e.isSolo && t.set("isSolo", e.isSolo),
            t
        }
        static setProperty(e, t, s) {
            switch (t) {
            case "volume":
                return e.volume = s,
                !0;
            case "balance":
                return e.balance = s,
                !0;
            case "port":
                return e.port = s,
                !0;
            case "program":
                return e.program = s,
                !0;
            case "primarychannel":
                return e.primaryChannel = s,
                !0;
            case "secondarychannel":
                return e.secondaryChannel = s,
                !0;
            case "ismute":
                return e.isMute = s,
                !0;
            case "issolo":
                return e.isSolo = s,
                !0
            }
            return !1
        }
    }
    class Ds {
        static fromJson(e, t) {
            t && Ss.forEach(t, ( (t, s) => this.setProperty(e, s.toLowerCase(), t)))
        }
        static toJson(e) {
            if (!e)
                return null;
            const t = new Map
              , s = new lt;
            return s.elementType !== e.elementType && t.set("elementType", e.elementType),
            s.staffLine !== e.staffLine && t.set("staffLine", e.staffLine),
            s.noteHeadDefault !== e.noteHeadDefault && t.set("noteHeadDefault", e.noteHeadDefault),
            s.noteHeadHalf !== e.noteHeadHalf && t.set("noteHeadHalf", e.noteHeadHalf),
            s.noteHeadWhole !== e.noteHeadWhole && t.set("noteHeadWhole", e.noteHeadWhole),
            s.techniqueSymbol !== e.techniqueSymbol && t.set("techniqueSymbol", e.techniqueSymbol),
            s.techniqueSymbolPlacement !== e.techniqueSymbolPlacement && t.set("techniqueSymbolPlacement", e.techniqueSymbolPlacement),
            s.outputMidiNumber !== e.outputMidiNumber && t.set("outputMidiNumber", e.outputMidiNumber),
            t
        }
        static setProperty(e, t, s) {
            switch (t) {
            case "elementtype":
                return e.elementType = s,
                !0;
            case "staffline":
                return e.staffLine = s,
                !0;
            case "noteheaddefault":
                return e.noteHeadDefault = Ss.parseEnum(s, I),
                !0;
            case "noteheadhalf":
                return e.noteHeadHalf = Ss.parseEnum(s, I),
                !0;
            case "noteheadwhole":
                return e.noteHeadWhole = Ss.parseEnum(s, I),
                !0;
            case "techniquesymbol":
                return e.techniqueSymbol = Ss.parseEnum(s, I),
                !0;
            case "techniquesymbolplacement":
                return e.techniqueSymbolPlacement = Ss.parseEnum(s, G),
                !0;
            case "outputmidinumber":
                return e.outputMidiNumber = s,
                !0
            }
            return !1
        }
    }
    class Rs {
        static fromJson(e, t) {
            t && Ss.forEach(t, ( (t, s) => this.setProperty(e, s.toLowerCase(), t)))
        }
        static toJson(e) {
            if (!e)
                return null;
            const t = new Map
              , s = new es;
            return e.staves.length > 0 && t.set("staves", e.staves.map((e => Es.toJson(e)))),
            s.playbackInfo !== e.playbackInfo && t.set("playbackInfo", Ms.toJson(e.playbackInfo)),
            s.color !== e.color && t.set("color", Bt.toJson(e.color)),
            s.name !== e.name && t.set("name", e.name),
            s.shortName !== e.shortName && t.set("shortName", e.shortName),
            e.percussionArticulations.length > 0 && t.set("percussionArticulations", e.percussionArticulations.map((e => Ds.toJson(e)))),
            t
        }
        static setProperty(e, t, s) {
            switch (t) {
            case "staves":
                e.staves = [];
                for (const t of s) {
                    const s = new Zt;
                    Es.fromJson(s, t),
                    e.addStaff(s)
                }
                return !0;
            case "color":
                return e.color = Bt.fromJson(s),
                !0;
            case "name":
                return e.name = s,
                !0;
            case "shortname":
                return e.shortName = s,
                !0;
            case "percussionarticulations":
                e.percussionArticulations = [];
                for (const t of s) {
                    const s = new lt;
                    Ds.fromJson(s, t),
                    e.percussionArticulations.push(s)
                }
                return !0
            }
            return ["playbackinfo"].indexOf(t) >= 0 && (Ms.fromJson(e.playbackInfo, s),
            !0)
        }
    }
    class Os {
        static fromJson(e, t) {
            t && Ss.forEach(t, ( (t, s) => this.setProperty(e, s.toLowerCase(), t)))
        }
        static toJson(e) {
            if (!e)
                return null;
            const t = new Map;
            return (new it).hideDynamics !== e.hideDynamics && t.set("hideDynamics", e.hideDynamics),
            t
        }
        static setProperty(e, t, s) {
            switch (t) {
            case "hidedynamics":
                return e.hideDynamics = s,
                !0
            }
            return !1
        }
    }
    class Is {
        static fromJson(e, t) {
            t && Ss.forEach(t, ( (t, s) => this.setProperty(e, s.toLowerCase(), t)))
        }
        static toJson(e) {
            if (!e)
                return null;
            const t = new Map
              , s = new _t;
            return s.album !== e.album && t.set("album", e.album),
            s.artist !== e.artist && t.set("artist", e.artist),
            s.copyright !== e.copyright && t.set("copyright", e.copyright),
            s.instructions !== e.instructions && t.set("instructions", e.instructions),
            s.music !== e.music && t.set("music", e.music),
            s.notices !== e.notices && t.set("notices", e.notices),
            s.subTitle !== e.subTitle && t.set("subTitle", e.subTitle),
            s.title !== e.title && t.set("title", e.title),
            s.words !== e.words && t.set("words", e.words),
            s.tab !== e.tab && t.set("tab", e.tab),
            s.tempo !== e.tempo && t.set("tempo", e.tempo),
            s.tempoLabel !== e.tempoLabel && t.set("tempoLabel", e.tempoLabel),
            e.masterBars.length > 0 && t.set("masterBars", e.masterBars.map((e => Ts.toJson(e)))),
            e.tracks.length > 0 && t.set("tracks", e.tracks.map((e => Rs.toJson(e)))),
            s.stylesheet !== e.stylesheet && t.set("stylesheet", Os.toJson(e.stylesheet)),
            t
        }
        static setProperty(e, t, s) {
            switch (t) {
            case "album":
                return e.album = s,
                !0;
            case "artist":
                return e.artist = s,
                !0;
            case "copyright":
                return e.copyright = s,
                !0;
            case "instructions":
                return e.instructions = s,
                !0;
            case "music":
                return e.music = s,
                !0;
            case "notices":
                return e.notices = s,
                !0;
            case "subtitle":
                return e.subTitle = s,
                !0;
            case "title":
                return e.title = s,
                !0;
            case "words":
                return e.words = s,
                !0;
            case "tab":
                return e.tab = s,
                !0;
            case "tempo":
                return e.tempo = s,
                !0;
            case "tempolabel":
                return e.tempoLabel = s,
                !0;
            case "masterbars":
                e.masterBars = [];
                for (const t of s) {
                    const s = new Qt;
                    Ts.fromJson(s, t),
                    e.addMasterBar(s)
                }
                return !0;
            case "tracks":
                e.tracks = [];
                for (const t of s) {
                    const s = new es;
                    Rs.fromJson(s, t),
                    e.addTrack(s)
                }
                return !0
            }
            return ["stylesheet"].indexOf(t) >= 0 && (Os.fromJson(e.stylesheet, s),
            !0)
        }
    }
    class As {
        static fromJson(e, t) {
            t && Ss.forEach(t, ( (t, s) => this.setProperty(e, s.toLowerCase(), t)))
        }
        static toJson(e) {
            if (!e)
                return null;
            const t = new Map
              , s = new ja;
            return s.scriptFile !== e.scriptFile && t.set("scriptFile", e.scriptFile),
            s.fontDirectory !== e.fontDirectory && t.set("fontDirectory", e.fontDirectory),
            s.file !== e.file && t.set("file", e.file),
            s.tex !== e.tex && t.set("tex", e.tex),
            s.tracks !== e.tracks && t.set("tracks", e.tracks),
            s.enableLazyLoading !== e.enableLazyLoading && t.set("enableLazyLoading", e.enableLazyLoading),
            s.engine !== e.engine && t.set("engine", e.engine),
            s.logLevel !== e.logLevel && t.set("logLevel", e.logLevel),
            s.useWorkers !== e.useWorkers && t.set("useWorkers", e.useWorkers),
            s.includeNoteBounds !== e.includeNoteBounds && t.set("includeNoteBounds", e.includeNoteBounds),
            t
        }
        static setProperty(e, t, s) {
            switch (t) {
            case "scriptfile":
                return e.scriptFile = s,
                !0;
            case "fontdirectory":
                return e.fontDirectory = s,
                !0;
            case "file":
                return e.file = s,
                !0;
            case "tex":
                return e.tex = s,
                !0;
            case "tracks":
                return e.tracks = s,
                !0;
            case "enablelazyloading":
                return e.enableLazyLoading = s,
                !0;
            case "engine":
                return e.engine = s,
                !0;
            case "loglevel":
                return e.logLevel = Ss.parseEnum(s, v),
                !0;
            case "useworkers":
                return e.useWorkers = s,
                !0;
            case "includenotebounds":
                return e.includeNoteBounds = s,
                !0
            }
            return !1
        }
    }
    class Gs {
        static fromJson(e, t) {
            t && Ss.forEach(t, ( (t, s) => this.setProperty(e, s.toLowerCase(), t)))
        }
        static toJson(e) {
            if (!e)
                return null;
            const t = new Map
              , s = new xt;
            return s.copyrightFont !== e.copyrightFont && t.set("copyrightFont", vt.toJson(e.copyrightFont)),
            s.titleFont !== e.titleFont && t.set("titleFont", vt.toJson(e.titleFont)),
            s.subTitleFont !== e.subTitleFont && t.set("subTitleFont", vt.toJson(e.subTitleFont)),
            s.wordsFont !== e.wordsFont && t.set("wordsFont", vt.toJson(e.wordsFont)),
            s.effectFont !== e.effectFont && t.set("effectFont", vt.toJson(e.effectFont)),
            s.fretboardNumberFont !== e.fretboardNumberFont && t.set("fretboardNumberFont", vt.toJson(e.fretboardNumberFont)),
            s.tablatureFont !== e.tablatureFont && t.set("tablatureFont", vt.toJson(e.tablatureFont)),
            s.graceFont !== e.graceFont && t.set("graceFont", vt.toJson(e.graceFont)),
            s.staffLineColor !== e.staffLineColor && t.set("staffLineColor", Bt.toJson(e.staffLineColor)),
            s.barSeparatorColor !== e.barSeparatorColor && t.set("barSeparatorColor", Bt.toJson(e.barSeparatorColor)),
            s.barNumberFont !== e.barNumberFont && t.set("barNumberFont", vt.toJson(e.barNumberFont)),
            s.barNumberColor !== e.barNumberColor && t.set("barNumberColor", Bt.toJson(e.barNumberColor)),
            s.fingeringFont !== e.fingeringFont && t.set("fingeringFont", vt.toJson(e.fingeringFont)),
            s.chordFingeringFont !== e.chordFingeringFont && t.set("chordFingeringFont", vt.toJson(e.chordFingeringFont)),
            s.markerFont !== e.markerFont && t.set("markerFont", vt.toJson(e.markerFont)),
            s.mainGlyphColor !== e.mainGlyphColor && t.set("mainGlyphColor", Bt.toJson(e.mainGlyphColor)),
            s.secondaryGlyphColor !== e.secondaryGlyphColor && t.set("secondaryGlyphColor", Bt.toJson(e.secondaryGlyphColor)),
            s.scoreInfoColor !== e.scoreInfoColor && t.set("scoreInfoColor", Bt.toJson(e.scoreInfoColor)),
            s.blackKeyNoteColor !== e.blackKeyNoteColor && t.set("blackKeyNoteColor", Bt.toJson(e.blackKeyNoteColor)),
            s.tieDestinationColor !== e.tieDestinationColor && t.set("tieDestinationColor", Bt.toJson(e.tieDestinationColor)),
            s.numberedNoteNumberFont !== e.numberedNoteNumberFont && t.set("numberedNoteNumberFont", vt.toJson(e.numberedNoteNumberFont)),
            s.numberedNoteDumbNumberFont !== e.numberedNoteDumbNumberFont && t.set("numberedNoteDumbNumberFont", vt.toJson(e.numberedNoteDumbNumberFont)),
            s.chordTextColor !== e.chordTextColor && t.set("chordTextColor", Bt.toJson(e.chordTextColor)),
            s.inverseTextColor !== e.inverseTextColor && t.set("inverseTextColor", Bt.toJson(e.inverseTextColor)),
            s.lyricsFont !== e.lyricsFont && t.set("lyricsFont", vt.toJson(e.lyricsFont)),
            t
        }
        static setProperty(e, t, s) {
            switch (t) {
            case "copyrightfont":
                return e.copyrightFont = vt.fromJson(s),
                !0;
            case "titlefont":
                return e.titleFont = vt.fromJson(s),
                !0;
            case "subtitlefont":
                return e.subTitleFont = vt.fromJson(s),
                !0;
            case "wordsfont":
                return e.wordsFont = vt.fromJson(s),
                !0;
            case "effectfont":
                return e.effectFont = vt.fromJson(s),
                !0;
            case "fretboardnumberfont":
                return e.fretboardNumberFont = vt.fromJson(s),
                !0;
            case "tablaturefont":
                return e.tablatureFont = vt.fromJson(s),
                !0;
            case "gracefont":
                return e.graceFont = vt.fromJson(s),
                !0;
            case "stafflinecolor":
                return e.staffLineColor = Bt.fromJson(s),
                !0;
            case "barseparatorcolor":
                return e.barSeparatorColor = Bt.fromJson(s),
                !0;
            case "barnumberfont":
                return e.barNumberFont = vt.fromJson(s),
                !0;
            case "barnumbercolor":
                return e.barNumberColor = Bt.fromJson(s),
                !0;
            case "fingeringfont":
                return e.fingeringFont = vt.fromJson(s),
                !0;
            case "chordfingeringfont":
                return e.chordFingeringFont = vt.fromJson(s),
                !0;
            case "markerfont":
                return e.markerFont = vt.fromJson(s),
                !0;
            case "mainglyphcolor":
                return e.mainGlyphColor = Bt.fromJson(s),
                !0;
            case "secondaryglyphcolor":
                return e.secondaryGlyphColor = Bt.fromJson(s),
                !0;
            case "scoreinfocolor":
                return e.scoreInfoColor = Bt.fromJson(s),
                !0;
            case "blackkeynotecolor":
                return e.blackKeyNoteColor = Bt.fromJson(s),
                !0;
            case "tiedestinationcolor":
                return e.tieDestinationColor = Bt.fromJson(s),
                !0;
            case "numberednotenumberfont":
                return e.numberedNoteNumberFont = vt.fromJson(s),
                !0;
            case "numberednotedumbnumberfont":
                return e.numberedNoteDumbNumberFont = vt.fromJson(s),
                !0;
            case "chordtextcolor":
                return e.chordTextColor = Bt.fromJson(s),
                !0;
            case "inversetextcolor":
                return e.inverseTextColor = Bt.fromJson(s),
                !0;
            case "lyricsfont":
                return e.lyricsFont = vt.fromJson(s),
                !0
            }
            return !1
        }
    }
    class Hs {
        static fromJson(e, t) {
            t && Ss.forEach(t, ( (t, s) => this.setProperty(e, s.toLowerCase(), t)))
        }
        static toJson(e) {
            if (!e)
                return null;
            const t = new Map
              , s = new kt;
            return s.scale !== e.scale && t.set("scale", e.scale),
            s.stretchForce !== e.stretchForce && t.set("stretchForce", e.stretchForce),
            s.layoutMode !== e.layoutMode && t.set("layoutMode", e.layoutMode),
            s.staveProfile !== e.staveProfile && t.set("staveProfile", e.staveProfile),
            s.barsPerRow !== e.barsPerRow && t.set("barsPerRow", e.barsPerRow),
            s.startBar !== e.startBar && t.set("startBar", e.startBar),
            s.barCount !== e.barCount && t.set("barCount", e.barCount),
            s.rowCount !== e.rowCount && t.set("rowCount", e.rowCount),
            s.barCountPerPartial !== e.barCountPerPartial && t.set("barCountPerPartial", e.barCountPerPartial),
            s.resources !== e.resources && t.set("resources", Gs.toJson(e.resources)),
            s.padding !== e.padding && t.set("padding", e.padding),
            s.staveGroupVerticalPadding !== e.staveGroupVerticalPadding && t.set("staveGroupVerticalPadding", e.staveGroupVerticalPadding),
            s.avoidAccolade !== e.avoidAccolade && t.set("avoidAccolade", e.avoidAccolade),
            s.hideTabHead !== e.hideTabHead && t.set("hideTabHead", e.hideTabHead),
            s.slim !== e.slim && t.set("slim", e.slim),
            t
        }
        static setProperty(t, s, i) {
            switch (s) {
            case "scale":
                return t.scale = i,
                !0;
            case "stretchforce":
                return t.stretchForce = i,
                !0;
            case "layoutmode":
                return t.layoutMode = Ss.parseEnum(i, e.LayoutMode),
                !0;
            case "staveprofile":
                return t.staveProfile = Ss.parseEnum(i, e.StaveProfile),
                !0;
            case "barsperrow":
                return t.barsPerRow = i,
                !0;
            case "startbar":
                return t.startBar = i,
                !0;
            case "barcount":
                return t.barCount = i,
                !0;
            case "rowcount":
                return t.rowCount = i,
                !0;
            case "barcountperpartial":
                return t.barCountPerPartial = i,
                !0;
            case "padding":
                return t.padding = i,
                !0;
            case "stavegroupverticalpadding":
                return t.staveGroupVerticalPadding = i,
                !0;
            case "avoidaccolade":
                return t.avoidAccolade = i,
                !0;
            case "hidetabhead":
                return t.hideTabHead = i,
                !0;
            case "slim":
                return t.slim = i,
                !0
            }
            if (["resources"].indexOf(s) >= 0)
                return Gs.fromJson(t.resources, i),
                !0;
            for (const e of ["resources"])
                if (0 === s.indexOf(e) && Gs.setProperty(t.resources, s.substring(e.length), i))
                    return !0;
            return !1
        }
    }
    class Vs {
        static fromJson(e, t) {
            t && Ss.forEach(t, ( (t, s) => this.setProperty(e, s.toLowerCase(), t)))
        }
        static toJson(e) {
            if (!e)
                return null;
            const t = new Map
              , s = new be;
            if (s.notationMode !== e.notationMode && t.set("notationMode", e.notationMode),
            s.fingeringMode !== e.fingeringMode && t.set("fingeringMode", e.fingeringMode),
            s.elements !== e.elements) {
                const s = new Map;
                for (const [t,i] of e.elements)
                    s.set(t.toString(), i);
                s.size > 0 && t.set("elements", s)
            }
            return s.rhythmMode !== e.rhythmMode && t.set("rhythmMode", e.rhythmMode),
            s.rhythmHeight !== e.rhythmHeight && t.set("rhythmHeight", e.rhythmHeight),
            s.transpositionPitches !== e.transpositionPitches && t.set("transpositionPitches", e.transpositionPitches),
            s.displayTranspositionPitches !== e.displayTranspositionPitches && t.set("displayTranspositionPitches", e.displayTranspositionPitches),
            s.smallGraceTabNotes !== e.smallGraceTabNotes && t.set("smallGraceTabNotes", e.smallGraceTabNotes),
            s.extendBendArrowsOnTiedNotes !== e.extendBendArrowsOnTiedNotes && t.set("extendBendArrowsOnTiedNotes", e.extendBendArrowsOnTiedNotes),
            s.extendLineEffectsToBeatEnd !== e.extendLineEffectsToBeatEnd && t.set("extendLineEffectsToBeatEnd", e.extendLineEffectsToBeatEnd),
            s.slurHeight !== e.slurHeight && t.set("slurHeight", e.slurHeight),
            s.displayTiedNotes !== e.displayTiedNotes && t.set("displayTiedNotes", e.displayTiedNotes),
            s.avoidInChordFretNumber !== e.avoidInChordFretNumber && t.set("avoidInChordFretNumber", e.avoidInChordFretNumber),
            s.inlineChordMode !== e.inlineChordMode && t.set("inlineChordMode", e.inlineChordMode),
            s.onlyShowBarNumberAtLineStart !== e.onlyShowBarNumberAtLineStart && t.set("onlyShowBarNumberAtLineStart", e.onlyShowBarNumberAtLineStart),
            t
        }
        static setProperty(t, s, i) {
            switch (s) {
            case "notationmode":
                return t.notationMode = Ss.parseEnum(i, B),
                !0;
            case "fingeringmode":
                return t.fingeringMode = Ss.parseEnum(i, _),
                !0;
            case "elements":
                return t.elements = new Map,
                Ss.forEach(i, ( (s, i) => {
                    t.elements.set(Ss.parseEnum(i, e.NotationElement), s)
                }
                )),
                !0;
            case "rhythmmode":
                return t.rhythmMode = Ss.parseEnum(i, w),
                !0;
            case "rhythmheight":
                return t.rhythmHeight = i,
                !0;
            case "transpositionpitches":
                return t.transpositionPitches = i,
                !0;
            case "displaytranspositionpitches":
                return t.displayTranspositionPitches = i,
                !0;
            case "smallgracetabnotes":
                return t.smallGraceTabNotes = i,
                !0;
            case "extendbendarrowsontiednotes":
                return t.extendBendArrowsOnTiedNotes = i,
                !0;
            case "extendlineeffectstobeatend":
                return t.extendLineEffectsToBeatEnd = i,
                !0;
            case "slurheight":
                return t.slurHeight = i,
                !0;
            case "displaytiednotes":
                return t.displayTiedNotes = i,
                !0;
            case "avoidinchordfretnumber":
                return t.avoidInChordFretNumber = i,
                !0;
            case "inlinechordmode":
                return t.inlineChordMode = Ss.parseEnum(i, e.InlineChordMode),
                !0;
            case "onlyshowbarnumberatlinestart":
                return t.onlyShowBarNumberAtLineStart = i,
                !0
            }
            return !1
        }
    }
    class Ws {
        static fromJson(e, t) {
            t && Ss.forEach(t, ( (t, s) => this.setProperty(e, s.toLowerCase(), t)))
        }
        static toJson(e) {
            if (!e)
                return null;
            const t = new Map
              , s = new Pt;
            return s.encoding !== e.encoding && t.set("encoding", e.encoding),
            s.mergePartGroupsInMusicXml !== e.mergePartGroupsInMusicXml && t.set("mergePartGroupsInMusicXml", e.mergePartGroupsInMusicXml),
            s.beatTextAsLyrics !== e.beatTextAsLyrics && t.set("beatTextAsLyrics", e.beatTextAsLyrics),
            s.fixNumberedNotationWholeNotes !== e.fixNumberedNotationWholeNotes && t.set("fixNumberedNotationWholeNotes", e.fixNumberedNotationWholeNotes),
            t
        }
        static setProperty(e, t, s) {
            switch (t) {
            case "encoding":
                return e.encoding = s,
                !0;
            case "mergepartgroupsinmusicxml":
                return e.mergePartGroupsInMusicXml = s,
                !0;
            case "beattextaslyrics":
                return e.beatTextAsLyrics = s,
                !0;
            case "fixnumberednotationwholenotes":
                return e.fixNumberedNotationWholeNotes = s,
                !0
            }
            return !1
        }
    }
    class zs {
        static fromJson(e, t) {
            t && Ss.forEach(t, ( (t, s) => this.setProperty(e, s.toLowerCase(), t)))
        }
        static toJson(e) {
            if (!e)
                return null;
            const t = new Map
              , s = new Ft;
            return s.noteWideLength !== e.noteWideLength && t.set("noteWideLength", e.noteWideLength),
            s.noteWideAmplitude !== e.noteWideAmplitude && t.set("noteWideAmplitude", e.noteWideAmplitude),
            s.noteSlightLength !== e.noteSlightLength && t.set("noteSlightLength", e.noteSlightLength),
            s.noteSlightAmplitude !== e.noteSlightAmplitude && t.set("noteSlightAmplitude", e.noteSlightAmplitude),
            s.beatWideLength !== e.beatWideLength && t.set("beatWideLength", e.beatWideLength),
            s.beatWideAmplitude !== e.beatWideAmplitude && t.set("beatWideAmplitude", e.beatWideAmplitude),
            s.beatSlightLength !== e.beatSlightLength && t.set("beatSlightLength", e.beatSlightLength),
            s.beatSlightAmplitude !== e.beatSlightAmplitude && t.set("beatSlightAmplitude", e.beatSlightAmplitude),
            t
        }
        static setProperty(e, t, s) {
            switch (t) {
            case "notewidelength":
                return e.noteWideLength = s,
                !0;
            case "notewideamplitude":
                return e.noteWideAmplitude = s,
                !0;
            case "noteslightlength":
                return e.noteSlightLength = s,
                !0;
            case "noteslightamplitude":
                return e.noteSlightAmplitude = s,
                !0;
            case "beatwidelength":
                return e.beatWideLength = s,
                !0;
            case "beatwideamplitude":
                return e.beatWideAmplitude = s,
                !0;
            case "beatslightlength":
                return e.beatSlightLength = s,
                !0;
            case "beatslightamplitude":
                return e.beatSlightAmplitude = s,
                !0
            }
            return !1
        }
    }
    class Us {
        static fromJson(e, t) {
            t && Ss.forEach(t, ( (t, s) => this.setProperty(e, s.toLowerCase(), t)))
        }
        static toJson(e) {
            if (!e)
                return null;
            const t = new Map
              , s = new Ct;
            return s.simpleSlidePitchOffset !== e.simpleSlidePitchOffset && t.set("simpleSlidePitchOffset", e.simpleSlidePitchOffset),
            s.simpleSlideDurationRatio !== e.simpleSlideDurationRatio && t.set("simpleSlideDurationRatio", e.simpleSlideDurationRatio),
            s.shiftSlideDurationRatio !== e.shiftSlideDurationRatio && t.set("shiftSlideDurationRatio", e.shiftSlideDurationRatio),
            t
        }
        static setProperty(e, t, s) {
            switch (t) {
            case "simpleslidepitchoffset":
                return e.simpleSlidePitchOffset = s,
                !0;
            case "simpleslidedurationratio":
                return e.simpleSlideDurationRatio = s,
                !0;
            case "shiftslidedurationratio":
                return e.shiftSlideDurationRatio = s,
                !0
            }
            return !1
        }
    }
    class Xs {
        static fromJson(e, t) {
            t && Ss.forEach(t, ( (t, s) => this.setProperty(e, s.toLowerCase(), t)))
        }
        static toJson(e) {
            if (!e)
                return null;
            const t = new Map
              , s = new Lt;
            return s.soundFont !== e.soundFont && t.set("soundFont", e.soundFont),
            s.scrollElement !== e.scrollElement && t.set("scrollElement", e.scrollElement),
            s.enablePlayer !== e.enablePlayer && t.set("enablePlayer", e.enablePlayer),
            s.enableCursor !== e.enableCursor && t.set("enableCursor", e.enableCursor),
            s.enableUserInteraction !== e.enableUserInteraction && t.set("enableUserInteraction", e.enableUserInteraction),
            s.enableDumbBeatSound !== e.enableDumbBeatSound && t.set("enableDumbBeatSound", e.enableDumbBeatSound),
            s.scrollOffsetX !== e.scrollOffsetX && t.set("scrollOffsetX", e.scrollOffsetX),
            s.scrollOffsetY !== e.scrollOffsetY && t.set("scrollOffsetY", e.scrollOffsetY),
            s.scrollMode !== e.scrollMode && t.set("scrollMode", e.scrollMode),
            s.scrollSpeed !== e.scrollSpeed && t.set("scrollSpeed", e.scrollSpeed),
            s.songBookBendDuration !== e.songBookBendDuration && t.set("songBookBendDuration", e.songBookBendDuration),
            s.songBookDipDuration !== e.songBookDipDuration && t.set("songBookDipDuration", e.songBookDipDuration),
            s.vibrato !== e.vibrato && t.set("vibrato", zs.toJson(e.vibrato)),
            s.slide !== e.slide && t.set("slide", Us.toJson(e.slide)),
            s.playTripletFeel !== e.playTripletFeel && t.set("playTripletFeel", e.playTripletFeel),
            s.autoSustainPedal !== e.autoSustainPedal && t.set("autoSustainPedal", e.autoSustainPedal),
            t
        }
        static setProperty(t, s, i) {
            switch (s) {
            case "soundfont":
                return t.soundFont = i,
                !0;
            case "scrollelement":
                return t.scrollElement = i,
                !0;
            case "enableplayer":
                return t.enablePlayer = i,
                !0;
            case "enablecursor":
                return t.enableCursor = i,
                !0;
            case "enableuserinteraction":
                return t.enableUserInteraction = i,
                !0;
            case "enabledumbbeatsound":
                return t.enableDumbBeatSound = i,
                !0;
            case "scrolloffsetx":
                return t.scrollOffsetX = i,
                !0;
            case "scrolloffsety":
                return t.scrollOffsetY = i,
                !0;
            case "scrollmode":
                return t.scrollMode = Ss.parseEnum(i, e.ScrollMode),
                !0;
            case "scrollspeed":
                return t.scrollSpeed = i,
                !0;
            case "songbookbendduration":
                return t.songBookBendDuration = i,
                !0;
            case "songbookdipduration":
                return t.songBookDipDuration = i,
                !0;
            case "playtripletfeel":
                return t.playTripletFeel = i,
                !0;
            case "autosustainpedal":
                return t.autoSustainPedal = i,
                !0
            }
            if (["vibrato"].indexOf(s) >= 0)
                return zs.fromJson(t.vibrato, i),
                !0;
            for (const e of ["vibrato"])
                if (0 === s.indexOf(e) && zs.setProperty(t.vibrato, s.substring(e.length), i))
                    return !0;
            if (["slide"].indexOf(s) >= 0)
                return Us.fromJson(t.slide, i),
                !0;
            for (const e of ["slide"])
                if (0 === s.indexOf(e) && Us.setProperty(t.slide, s.substring(e.length), i))
                    return !0;
            return !1
        }
    }
    class Ys {
        static fromJson(e, t) {
            t && Ss.forEach(t, ( (t, s) => this.setProperty(e, s.toLowerCase(), t)))
        }
        static toJson(e) {
            if (!e)
                return null;
            const t = new Map
              , s = new Za;
            return s.core !== e.core && t.set("core", As.toJson(e.core)),
            s.display !== e.display && t.set("display", Hs.toJson(e.display)),
            s.notation !== e.notation && t.set("notation", Vs.toJson(e.notation)),
            s.importer !== e.importer && t.set("importer", Ws.toJson(e.importer)),
            s.player !== e.player && t.set("player", Xs.toJson(e.player)),
            t
        }
        static setProperty(e, t, s) {
            if (["core", ""].indexOf(t) >= 0)
                return As.fromJson(e.core, s),
                !0;
            for (const i of ["core", ""])
                if (0 === t.indexOf(i) && As.setProperty(e.core, t.substring(i.length), s))
                    return !0;
            if (["display", ""].indexOf(t) >= 0)
                return Hs.fromJson(e.display, s),
                !0;
            for (const i of ["display", ""])
                if (0 === t.indexOf(i) && Hs.setProperty(e.display, t.substring(i.length), s))
                    return !0;
            if (["notation"].indexOf(t) >= 0)
                return Vs.fromJson(e.notation, s),
                !0;
            for (const i of ["notation"])
                if (0 === t.indexOf(i) && Vs.setProperty(e.notation, t.substring(i.length), s))
                    return !0;
            if (["importer"].indexOf(t) >= 0)
                return Ws.fromJson(e.importer, s),
                !0;
            for (const i of ["importer"])
                if (0 === t.indexOf(i) && Ws.setProperty(e.importer, t.substring(i.length), s))
                    return !0;
            if (["player"].indexOf(t) >= 0)
                return Xs.fromJson(e.player, s),
                !0;
            for (const i of ["player"])
                if (0 === t.indexOf(i) && Xs.setProperty(e.player, t.substring(i.length), s))
                    return !0;
            return !1
        }
    }
    class Js {
        static jsonReplacer(e, t) {
            if (t instanceof Map) {
                if ("fromEntries"in Object)
                    return Object.fromEntries(t);
                {
                    const e = {};
                    for (const [s,i] of t)
                        e[s] = i;
                    return e
                }
            }
            return ArrayBuffer.isView(t) ? Array.apply([], [t]) : t
        }
        static scoreToJson(e) {
            let t = Js.scoreToJsObject(e);
            return JSON.stringify(t, Js.jsonReplacer)
        }
        static jsonToScore(e, t) {
            return Js.jsObjectToScore(JSON.parse(e), t)
        }
        static scoreToJsObject(e) {
            return Is.toJson(e)
        }
        static jsObjectToScore(e, t) {
            const s = new _t;
            return Is.fromJson(s, e),
            _t.resetIds(s),
            s.finish(null != t ? t : new Za),
            s
        }
        static settingsToJson(e) {
            let t = Js.settingsToJsObject(e);
            return JSON.stringify(t, Js.jsonReplacer)
        }
        static jsonToSettings(e) {
            return Js.jsObjectToSettings(JSON.parse(e))
        }
        static settingsToJsObject(e) {
            return Ys.toJson(e)
        }
        static jsObjectToSettings(e) {
            let t = new Za;
            return Ys.fromJson(t, e),
            t
        }
        static jsObjectToMidiFile(e) {
            let t = new ie;
            t.division = e.division;
            let s = e.events;
            for (let e of s) {
                let s = Js.jsObjectToMidiEvent(e);
                t.events.push(s)
            }
            return t
        }
        static jsObjectToMidiEvent(e) {
            let t, s = e.track, i = e.tick, n = e.message;
            switch (e.type) {
            case "SystemExclusiveEvent":
                t = new oe(s,i,0,0,e.data),
                t.message = n;
                break;
            case "MetaDataEvent":
                t = new ne(s,i,0,0,e.data),
                t.message = n;
                break;
            case "MetaNumberEvent":
                t = new re(s,i,0,0,e.value),
                t.message = n;
                break;
            case "Midi20PerNotePitchBendEvent":
                t = new le(s,i,0,e.noteKey,e.pitch),
                t.message = n;
                break;
            default:
                t = new K(s,i,0,0,0),
                t.message = n
            }
            return t
        }
        static midiFileToJsObject(e) {
            let t = {};
            t.division = e.division;
            let s = [];
            t.events = s;
            for (let t of e.events)
                s.push(Js.midiEventToJsObject(t));
            return t
        }
        static midiEventToJsObject(e) {
            let t = {};
            return t.track = e.track,
            t.tick = e.tick,
            t.message = e.message,
            e instanceof oe ? (t.type = "SystemExclusiveEvent",
            t.data = e.data) : e instanceof ne ? (t.type = "MetaDataEvent",
            t.data = e.data) : e instanceof re ? (t.type = "MetaNumberEvent",
            t.value = e.value) : e instanceof le && (t.type = "Midi20PerNotePitchBendEvent",
            t.noteKey = e.noteKey,
            t.pitch = e.pitch),
            t
        }
    }
    class qs {
        constructor(e, t) {
            this._decodeAudioDataResultPromiseMap = new Map,
            this.ready = new Ze,
            this.samplesPlayed = new et,
            this.sampleRequest = new Ze,
            this._sampleRate = e,
            this._oggSampleRate = t
        }
        get sampleRate() {
            return this._sampleRate
        }
        get oggSampleRate() {
            return this._oggSampleRate
        }
        open() {
            _e.debug("AlphaSynth", "Initializing webworker worker"),
            this._worker = Ka.globalThis,
            this._worker.addEventListener("message", this.handleMessage.bind(this)),
            this.ready.trigger()
        }
        destroy() {
            this._worker.postMessage({
                cmd: "alphaSynth.output.destroy"
            })
        }
        handleMessage(e) {
            let t = e.data;
            switch (t.cmd) {
            case qs.CmdOutputSampleRequest:
                this.sampleRequest.trigger();
                break;
            case qs.CmdOutputSamplesPlayed:
                this.samplesPlayed.trigger(t.samples);
                break;
            case qs.CmdOutputDecodeAudioData:
                const {jobId: e, decodedData: s} = t
                  , i = this._decodeAudioDataResultPromiseMap.get(e);
                i && i(s)
            }
        }
        addSamples(e) {
            this._worker.postMessage({
                cmd: "alphaSynth.output.addSamples",
                samples: e
            })
        }
        play() {
            this._worker.postMessage({
                cmd: "alphaSynth.output.play"
            })
        }
        pause() {
            this._worker.postMessage({
                cmd: "alphaSynth.output.pause"
            })
        }
        resetSamples() {
            this._worker.postMessage({
                cmd: "alphaSynth.output.resetSamples"
            })
        }
        activate() {}
        decodeAudioData(e) {
            const t = qs._decodeAudioDataJobId++;
            let s;
            const i = new Promise((e => {
                s = e
            }
            ));
            return this._decodeAudioDataResultPromiseMap.set(t, s),
            this._worker.postMessage({
                cmd: "alphaSynth.output.decodeAudioData",
                jobId: t,
                data: e
            }),
            i
        }
    }
    qs.CmdOutputPrefix = "alphaSynth.output.",
    qs.CmdOutputAddSamples = qs.CmdOutputPrefix + "addSamples",
    qs.CmdOutputPlay = qs.CmdOutputPrefix + "play",
    qs.CmdOutputPause = qs.CmdOutputPrefix + "pause",
    qs.CmdOutputResetSamples = qs.CmdOutputPrefix + "resetSamples",
    qs.CmdOutputSampleRequest = qs.CmdOutputPrefix + "sampleRequest",
    qs.CmdOutputSamplesPlayed = qs.CmdOutputPrefix + "samplesPlayed",
    qs.CmdOutputDecodeAudioData = qs.CmdOutputPrefix + "decodeAudioData",
    qs._decodeAudioDataJobId = 0;
    class Qs {
        constructor(e, t, s) {
            this._main = e,
            this._main.addEventListener("message", this.handleMessage.bind(this)),
            this._player = new st(new qs(t,s)),
            this._player.positionChanged.on(this.onPositionChanged.bind(this)),
            this._player.stateChanged.on(this.onPlayerStateChanged.bind(this)),
            this._player.finished.on(this.onFinished.bind(this)),
            this._player.soundFontLoaded.on(this.onSoundFontLoaded.bind(this)),
            this._player.soundFontLoadFailed.on(this.onSoundFontLoadFailed.bind(this)),
            this._player.soundFontLoadFailed.on(this.onSoundFontLoadFailed.bind(this)),
            this._player.midiLoaded.on(this.onMidiLoaded.bind(this)),
            this._player.midiLoadFailed.on(this.onMidiLoadFailed.bind(this)),
            this._player.readyForPlayback.on(this.onReadyForPlayback.bind(this)),
            this._player.midiEventsPlayed.on(this.onMidiEventsPlayed.bind(this)),
            this._main.postMessage({
                cmd: "alphaSynth.ready"
            })
        }
        static init() {
            let e = Ka.globalThis;
            e.addEventListener("message", (t => {
                let s = t.data;
                switch (s.cmd) {
                case "alphaSynth.initialize":
                    _e.logLevel = s.logLevel,
                    Ka.globalThis.alphaSynthWebWorker = new Qs(e,s.sampleRate,s.oggSampleRate)
                }
            }
            ))
        }
        handleMessage(e) {
            let t = e.data;
            switch (t.cmd) {
            case "alphaSynth.setLogLevel":
                _e.logLevel = t.value;
                break;
            case "alphaSynth.setMasterVolume":
                this._player.masterVolume = t.value;
                break;
            case "alphaSynth.setMetronomeVolume":
                this._player.metronomeVolume = t.value;
                break;
            case "alphaSynth.setPlaybackSpeed":
                this._player.playbackSpeed = t.value;
                break;
            case "alphaSynth.setTickPosition":
                this._player.tickPosition = t.value;
                break;
            case "alphaSynth.setTimePosition":
                this._player.timePosition = t.value;
                break;
            case "alphaSynth.setPlaybackRange":
                this._player.playbackRange = t.value;
                break;
            case "alphaSynth.setIsLooping":
                this._player.isLooping = t.value;
                break;
            case "alphaSynth.setCountInVolume":
                this._player.countInVolume = t.value;
                break;
            case "alphaSynth.setMidiEventsPlayedFilter":
                this._player.midiEventsPlayedFilter = t.value;
                break;
            case "alphaSynth.play":
                this._player.play();
                break;
            case "alphaSynth.pause":
                this._player.pause();
                break;
            case "alphaSynth.playPause":
                this._player.playPause();
                break;
            case "alphaSynth.stop":
                this._player.stop();
                break;
            case "alphaSynth.playOneTimeMidiFile":
                this._player.playOneTimeMidiFile(Js.jsObjectToMidiFile(t.midi));
                break;
            case "alphaSynth.loadSoundFontBytes":
                this._player.loadSoundFont(t.data, t.append, t.compressed);
                break;
            case "alphaSynth.resetSoundFonts":
                this._player.resetSoundFonts();
                break;
            case "alphaSynth.loadMidi":
                this._player.loadMidiFile(Js.jsObjectToMidiFile(t.midi));
                break;
            case "alphaSynth.setChannelMute":
                this._player.setChannelMute(t.channel, t.mute);
                break;
            case "alphaSynth.setChannelSolo":
                this._player.setChannelSolo(t.channel, t.solo);
                break;
            case "alphaSynth.setChannelVolume":
                this._player.setChannelVolume(t.channel, t.volume);
                break;
            case "alphaSynth.resetChannelStates":
                this._player.resetChannelStates();
                break;
            case "alphaSynth.destroy":
                this._player.destroy(),
                this._main.postMessage({
                    cmd: "alphaSynth.destroyed"
                })
            }
        }
        onPositionChanged(e) {
            this._main.postMessage({
                cmd: "alphaSynth.positionChanged",
                currentTime: e.currentTime,
                endTime: e.endTime,
                currentTick: e.currentTick,
                endTick: e.endTick,
                isSeek: e.isSeek
            })
        }
        onPlayerStateChanged(e) {
            this._main.postMessage({
                cmd: "alphaSynth.playerStateChanged",
                state: e.state,
                stopped: e.stopped
            })
        }
        onFinished() {
            this._main.postMessage({
                cmd: "alphaSynth.finished"
            })
        }
        onSoundFontLoaded() {
            this._main.postMessage({
                cmd: "alphaSynth.soundFontLoaded"
            })
        }
        onSoundFontLoadFailed(e) {
            this._main.postMessage({
                cmd: "alphaSynth.soundFontLoadFailed",
                error: this.serializeException(e)
            })
        }
        serializeException(e) {
            let t = JSON.parse(JSON.stringify(e));
            return e.message && (t.message = e.message),
            e.stack && (t.stack = e.stack),
            e.constructor && e.constructor.name && (t.type = e.constructor.name),
            t
        }
        onMidiLoaded(e) {
            this._main.postMessage({
                cmd: "alphaSynth.midiLoaded",
                currentTime: e.currentTime,
                endTime: e.endTime,
                currentTick: e.currentTick,
                endTick: e.endTick,
                isSeek: e.isSeek
            })
        }
        onMidiLoadFailed(e) {
            this._main.postMessage({
                cmd: "alphaSynth.midiLoaded",
                error: this.serializeException(e)
            })
        }
        onReadyForPlayback() {
            this._main.postMessage({
                cmd: "alphaSynth.readyForPlayback"
            })
        }
        onMidiEventsPlayed(e) {
            this._main.postMessage({
                cmd: "alphaSynth.midiEventsPlayed",
                events: e.events.map(Js.midiEventToJsObject)
            })
        }
    }
    new Map([["1/2", d.Half], ["1/4", d.Quarter], ["1/8", d.Eighth], ["1/16", d.Sixteenth], ["1/32", d.ThirtySecond], ["1/64", d.SixtyFourth]]);
    const $s = [$.C, $.Db, $.D, $.Eb, $.E, $.F, $.Gb, $.G, $.Ab, $.A, $.Bb, $.B]
      , Ks = new Map([["C", $.C], ["C#", $.CSharp], ["Db", $.Db], ["D", $.D], ["D#", $.Eb], ["Eb", $.Eb], ["E", $.E], ["F", $.F], ["F#", $.FSharp], ["Gb", $.Gb], ["G", $.G], ["G#", $.Ab], ["Ab", $.Ab], ["A", $.A], ["A#", $.Bb], ["Bb", $.Bb], ["B", $.B], ["Cb", $.Cb]]);
    function js(e) {
        return Ht.get(e) || 0
    }
    function Zs(e, t) {
        if (0 === t)
            return e;
        const s = -js(e) - t;
        return $s[(12 + s % 12) % 12]
    }
    function ei(e) {
        return Zs(e.masterBar.keySignature, e.staff.transpositionPitch)
    }
    function ti(e) {
        const t = e.charCodeAt(0);
        return 19968 <= t && t <= 40959 || 13312 <= t && t <= 19903 || 131072 <= t && t <= 173791 || 12352 <= t && t <= 12447 || 12448 <= t && t <= 12543
    }
    class si {
        static generateFontLookup(e) {
            if (!si.FontSizeLookupTables.has(e))
                if (Ka.isRunningInWorker)
                    si.FontSizeLookupTables.set(e, new Uint8Array([8]));
                else {
                    let t = document.createElement("canvas").getContext("2d");
                    t.font = "11px " + e;
                    let s = [];
                    for (let e = 32; e < 255; e++) {
                        let i = String.fromCharCode(e);
                        s.push(t.measureText(i).width)
                    }
                    let i = new Uint8Array(s);
                    si.FontSizeLookupTables.set(e, i)
                }
        }
        static measureString(t, s, i, n, r) {
            let a;
            si.FontSizeLookupTables.has(s) || si.generateFontLookup(s),
            a = si.FontSizeLookupTables.get(s);
            let o = 1;
            n === e.FontStyle.Italic && (o *= 1.2),
            r === e.FontWeight.Bold && (o *= 1.2);
            let h = 0;
            for (let e = 0; e < t.length; e++) {
                if (ti(t[e])) {
                    h += 9.9 * i / 11;
                    continue
                }
                let s = Math.min(a.length - 1, t.charCodeAt(e) - 32);
                s >= 0 && (h += a[s] * i / 11)
            }
            return h * o
        }
    }
    si.Georgia = new Uint8Array([3, 4, 5, 7, 7, 9, 8, 2, 4, 4, 5, 7, 3, 4, 3, 5, 7, 5, 6, 6, 6, 6, 6, 6, 7, 6, 3, 3, 7, 7, 7, 5, 10, 7, 7, 7, 8, 7, 7, 8, 9, 4, 6, 8, 7, 10, 8, 8, 7, 8, 8, 6, 7, 8, 7, 11, 8, 7, 7, 4, 5, 4, 7, 7, 6, 6, 6, 5, 6, 5, 4, 6, 6, 3, 3, 6, 3, 10, 6, 6, 6, 6, 5, 5, 4, 6, 5, 8, 6, 5, 5, 5, 4, 5, 7, 6, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 3, 4, 6, 7, 6, 7, 4, 6, 6, 10, 6, 6, 7, 0, 10, 7, 5, 7, 6, 6, 6, 6, 6, 3, 6, 6, 6, 6, 12, 12, 12, 5, 7, 7, 7, 7, 7, 7, 11, 7, 7, 7, 7, 7, 4, 4, 4, 4, 8, 8, 8, 8, 8, 8, 8, 7, 8, 8, 8, 8, 8, 7, 7, 6, 6, 6, 6, 6, 6, 6, 8, 5, 5, 5, 5, 5, 3, 3, 3, 3, 6, 6, 6, 6, 6, 6, 6, 7, 6, 6, 6, 6, 6, 5, 6]),
    si.Arial = new Uint8Array([3, 3, 4, 6, 6, 10, 7, 2, 4, 4, 4, 6, 3, 4, 3, 3, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 3, 3, 6, 6, 6, 6, 11, 7, 7, 8, 8, 7, 7, 9, 8, 3, 6, 7, 6, 9, 8, 9, 7, 9, 8, 7, 7, 8, 7, 10, 7, 7, 7, 3, 3, 3, 5, 6, 4, 6, 6, 6, 6, 6, 3, 6, 6, 2, 2, 6, 2, 9, 6, 6, 6, 6, 4, 6, 3, 6, 6, 8, 6, 6, 6, 4, 3, 4, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 4, 6, 6, 6, 6, 3, 6, 4, 8, 4, 6, 6, 0, 8, 6, 4, 6, 4, 4, 4, 6, 6, 4, 4, 4, 4, 6, 9, 9, 9, 7, 7, 7, 7, 7, 7, 7, 11, 8, 7, 7, 7, 7, 3, 3, 3, 3, 8, 8, 9, 9, 9, 9, 9, 6, 9, 8, 8, 8, 8, 7, 7, 7, 6, 6, 6, 6, 6, 6, 10, 6, 6, 6, 6, 6, 3, 3, 3, 3, 6, 6, 6, 6, 6, 6, 6, 6, 7, 6, 6, 6, 6, 6, 6]),
    si.FontSizeLookupTables = new Map([["Arial", si.Arial], ["'Arial'", si.Arial], ['"Arial"', si.Arial], ["Georgia", si.Georgia], ["'Georgia'", si.Georgia], ['"Georgia"', si.Georgia]]),
    si.ControlChars = 32;
    class ii {
        constructor(e) {
            this._main = e,
            this._main.addEventListener("message", this.handleMessage.bind(this), !1)
        }
        static init() {
            Ka.globalThis.alphaTabWebWorker = new ii(Ka.globalThis)
        }
        handleMessage(e) {
            let t = e.data;
            switch (t ? t.cmd : "") {
            case "alphaTab.initialize":
                let e = Js.jsObjectToSettings(t.settings);
                _e.logLevel = e.core.logLevel,
                this._renderer = new ms(e),
                this._renderer.partialRenderFinished.on((e => {
                    this._main.postMessage({
                        cmd: "alphaTab.partialRenderFinished",
                        result: e
                    })
                }
                )),
                this._renderer.renderFinished.on((e => {
                    this._main.postMessage({
                        cmd: "alphaTab.renderFinished",
                        result: e
                    })
                }
                )),
                this._renderer.postRenderFinished.on(( () => {
                    var e, t;
                    this._main.postMessage({
                        cmd: "alphaTab.postRenderFinished",
                        boundsLookup: null !== (t = null === (e = this._renderer.boundsLookup) || void 0 === e ? void 0 : e.toJson()) && void 0 !== t ? t : null
                    })
                }
                )),
                this._renderer.preRender.on((e => {
                    this._main.postMessage({
                        cmd: "alphaTab.preRender",
                        resize: e
                    })
                }
                )),
                this._renderer.error.on(this.error.bind(this));
                break;
            case "alphaTab.invalidate":
                this._renderer.render();
                break;
            case "alphaTab.resizeRender":
                this._renderer.resizeRender();
                break;
            case "alphaTab.setWidth":
                this._renderer.width = t.width;
                break;
            case "alphaTab.renderScore":
                this.updateFontSizes(t.fontSizes);
                let s = Js.jsObjectToScore(t.score, this._renderer.settings);
                this.renderMultiple(s, t.trackIndexes);
                break;
            case "alphaTab.updateSettings":
                this.updateSettings(t.settings)
            }
        }
        updateFontSizes(e) {
            if (e) {
                si.FontSizeLookupTables || (si.FontSizeLookupTables = new Map);
                for (let t in e)
                    si.FontSizeLookupTables.set(t, e[t])
            }
        }
        updateSettings(e) {
            const t = new Za;
            Ys.fromJson(t, e),
            this._renderer.settings = t
        }
        renderMultiple(e, t) {
            try {
                this._renderer.renderScore(e, t)
            } catch (e) {
                this.error(e)
            }
        }
        error(e) {
            _e.error("Worker", "An unexpected error occurred in worker", e),
            this._main.postMessage({
                cmd: "alphaTab.error",
                error: e
            })
        }
    }
    class ni {
        constructor() {
            this._initListeners = []
        }
        exec(e, t, s) {
            if ("string" != typeof t && (s = [t],
            t = "init"),
            95 === t.charCodeAt(0) || "exec" === t)
                return null;
            let i = new jQuery(e)
              , n = i.data("alphaTab");
            if ("destroy" === t && !n)
                return null;
            if ("init" !== t && !n)
                throw new Error("alphaTab not initialized");
            let r = this[t];
            if (r) {
                let e = [i, n].concat(s);
                return r.apply(this, e)
            }
            return _e.error("Api", "Method '" + t + "' does not exist on jQuery.alphaTab"),
            null
        }
        init(e, t, s) {
            if (!t) {
                t = new fo(e[0],s),
                e.data("alphaTab", t);
                for (let i of this._initListeners)
                    i(e, t, s)
            }
        }
        destroy(e, t) {
            e.removeData("alphaTab"),
            t.destroy()
        }
        print(e, t, s, i) {
            t.print(s, i)
        }
        load(e, t, s, i) {
            return t.load(s, i)
        }
        render(e, t) {
            t.render()
        }
        renderScore(e, t, s, i) {
            t.renderScore(s, i)
        }
        renderTracks(e, t, s) {
            t.renderTracks(s)
        }
        invalidate(e, t) {
            t.render()
        }
        tex(e, t, s, i) {
            t.tex(s, i)
        }
        muteTrack(e, t, s, i) {
            t.changeTrackMute(s, i)
        }
        soloTrack(e, t, s, i) {
            t.changeTrackSolo(s, i)
        }
        trackVolume(e, t, s, i) {
            t.changeTrackVolume(s, i)
        }
        loadSoundFont(e, t, s, i) {
            t.loadSoundFont(s, i)
        }
        resetSoundFonts(e, t) {
            t.resetSoundFonts()
        }
        pause(e, t) {
            t.pause()
        }
        play(e, t) {
            return t.play()
        }
        playPause(e, t) {
            t.playPause()
        }
        stop(e, t) {
            t.stop()
        }
        api(e, t) {
            return t
        }
        player(e, t) {
            return t.player
        }
        isReadyForPlayback(e, t) {
            return t.isReadyForPlayback
        }
        playerState(e, t) {
            return t.playerState
        }
        masterVolume(e, t, s) {
            return "number" == typeof s && (t.masterVolume = s),
            t.masterVolume
        }
        metronomeVolume(e, t, s) {
            return "number" == typeof s && (t.metronomeVolume = s),
            t.metronomeVolume
        }
        countInVolume(e, t, s) {
            return "number" == typeof s && (t.countInVolume = s),
            t.countInVolume
        }
        midiEventsPlayedFilter(e, t, s) {
            return Array.isArray(s) && (t.midiEventsPlayedFilter = s),
            t.midiEventsPlayedFilter
        }
        playbackSpeed(e, t, s) {
            return "number" == typeof s && (t.playbackSpeed = s),
            t.playbackSpeed
        }
        tickPosition(e, t, s) {
            return "number" == typeof s && (t.tickPosition = s),
            t.tickPosition
        }
        timePosition(e, t, s) {
            return "number" == typeof s && (t.timePosition = s),
            t.timePosition
        }
        loop(e, t, s) {
            return "boolean" == typeof s && (t.isLooping = s),
            t.isLooping
        }
        renderer(e, t) {
            return t.renderer
        }
        score(e, t) {
            return t.score
        }
        settings(e, t) {
            return t.settings
        }
        tracks(e, t) {
            return t.tracks
        }
        _oninit(e) {
            this._initListeners.push(e)
        }
        static restore(e) {
            new jQuery(e).empty().removeData("alphaTab")
        }
    }
    class ri {
        constructor() {
            this.buffer = "",
            this._currentPath = "",
            this._currentPathIsEmpty = !0,
            this.color = new Bt(255,255,255,255),
            this.lineWidth = 1,
            this.font = new vt("Arial",10,e.FontStyle.Plain),
            this.textAlign = A.Left,
            this.textBaseline = G.Middle
        }
        beginRender(e, t) {
            this.buffer = `<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="${e}px" height="${t}px" class="at-surface-svg">\n`,
            this._currentPath = "",
            this._currentPathIsEmpty = !0,
            this.textBaseline = G.Middle
        }
        beginGroup(e) {
            this.buffer += `<g class="${e}">`
        }
        endGroup() {
            this.buffer += "</g>"
        }
        endRender() {
            return this.buffer += "</svg>",
            this.buffer
        }
        fillRect(e, t, s, i) {
            s > 0 && (this.buffer += `<rect x="${e}" y="${t}" width="${s}" height="${i}" fill="${this.color.rgba}" />\n`)
        }
        strokeRect(e, t, s, i) {
            this.buffer += `<rect x="${e}" y="${t}" width="${s}" height="${i}" stroke="${this.color.rgba}"`,
            1 !== this.lineWidth && (this.buffer += ` stroke-width="${this.lineWidth}"`),
            this.buffer += ' fill="transparent" />\n'
        }
        beginPath() {}
        closePath() {
            this._currentPath += " z"
        }
        moveTo(e, t) {
            this._currentPath += ` M${e},${t}`
        }
        lineTo(e, t) {
            this._currentPathIsEmpty = !1,
            this._currentPath += ` L${e},${t}`
        }
        quadraticCurveTo(e, t, s, i) {
            this._currentPathIsEmpty = !1,
            this._currentPath += ` Q${e},${t},${s},${i}`
        }
        bezierCurveTo(e, t, s, i, n, r) {
            this._currentPathIsEmpty = !1,
            this._currentPath += ` C${e},${t},${s},${i},${n},${r}`
        }
        fillCircle(e, t, s) {
            this._currentPathIsEmpty = !1,
            this._currentPath += ` M${e - s},${t} A1,1 0 0,0 ${e + s},${t} A1,1 0 0,0 ${e - s},${t} z`,
            this.fill()
        }
        strokeCircle(e, t, s) {
            this._currentPathIsEmpty = !1,
            this._currentPath += ` M${e - s},${t} A1,1 0 0,0 ${e + s},${t} A1,1 0 0,0 ${e - s},${t} z`,
            this.stroke()
        }
        fill() {
            this._currentPathIsEmpty || (this.buffer += `<path d="${this._currentPath}"`,
            "#000000" !== this.color.rgba && (this.buffer += ` fill="${this.color.rgba}"`),
            this.buffer += ' style="stroke: none"/>'),
            this._currentPath = "",
            this._currentPathIsEmpty = !0
        }
        stroke() {
            if (!this._currentPathIsEmpty) {
                let e = `<path d="${this._currentPath}" stroke="${this.color.rgba}"`;
                1 !== this.lineWidth && (e += ` stroke-width="${this.lineWidth}"`),
                e += ' style="fill: none" />',
                this.buffer += e
            }
            this._currentPath = "",
            this._currentPathIsEmpty = !0
        }
        fillText(e, t, s) {
            if ("" === e)
                return;
            let i = `<text x="${t}" y="${s}" style="stroke: none; font:${this.font.toCssString(this.settings.display.scale)}; ${this.getSvgBaseLine()};"`;
            "#000000" !== this.color.rgba && (i += ` fill="${this.color.rgba}"`),
            this.textAlign !== A.Left && (i += ` text-anchor="${this.getSvgTextAlignment(this.textAlign)}"`),
            i += `>${ri.escapeText(e)}</text>`,
            this.buffer += i
        }
        static escapeText(e) {
            return e.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&#39;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
        }
        getSvgTextAlignment(e) {
            switch (e) {
            case A.Left:
                return "start";
            case A.Center:
                return "middle";
            case A.Right:
                return "end"
            }
            return ""
        }
        getSvgBaseLine() {
            switch (this.textBaseline) {
            case G.Top:
                return "dominant-baseline: hanging";
            case G.Bottom:
                return "dominant-baseline: bottom";
            case G.Middle:
                return "dominant-baseline: central";
            default:
                return ""
            }
        }
        measureText(e) {
            return e ? si.measureString(e, this.font.family, this.font.size, this.font.style, this.font.weight) : 0
        }
        onRenderFinished() {
            return null
        }
        beginRotate(e, t, s) {
            this.buffer += '<g transform="translate(' + e + " ," + t + ") rotate( " + s + ')">'
        }
        endRotate() {
            this.buffer += "</g>"
        }
    }
    class ai extends ri {
        constructor() {
            super()
        }
        fillMusicFontSymbol(e, t, s, i, n, r) {
            i !== I.None && this.fillMusicFontSymbolText(e, t, s, `&#${i};`, n, r)
        }
        fillMusicFontSymbols(e, t, s, i, n) {
            let r = "";
            for (let e of i)
                e !== I.None && (r += `&#${e};`);
            this.fillMusicFontSymbolText(e, t, s, r, n)
        }
        fillMusicFontSymbolText(e, t, s, i, n, r) {
            this.buffer += `<g transform="translate(${e} ${t})" class="${["at"].concat(r || []).join(" ")}" ><text`,
            this.buffer += 1 !== s ? ` style="font-size: ${100 * s}%; stroke:none"` : ' style="stroke:none"',
            "#000000" !== this.color.rgba && (this.buffer += ` fill="${this.color.rgba}"`),
            n && (this.buffer += ' text-anchor="' + this.getSvgTextAlignment(A.Center) + '"'),
            this.buffer += `>${i}</text></g>`
        }
    }
    class oi {
        constructor() {
            this.isInAccolade = !0,
            this.isRelevantForBoundsLookup = !0,
            this.hideOnMultiTrack = !1,
            this.hideOnPercussionTrack = !1
        }
        canCreate(e, t) {
            return !this.hideOnPercussionTrack || !t.isPercussion
        }
    }
    var hi, li, ci, di;
    !function(e) {
        e[e.PreNotes = 0] = "PreNotes",
        e[e.OnNotes = 1] = "OnNotes",
        e[e.MiddleNotes = 2] = "MiddleNotes",
        e[e.Stem = 3] = "Stem",
        e[e.PostNotes = 4] = "PostNotes",
        e[e.EndBeat = 5] = "EndBeat"
    }(hi || (hi = {}));
    class ui {
        constructor(e, t) {
            this.width = 0,
            this.height = 0,
            this.x = e,
            this.y = t
        }
        get scale() {
            return this.renderer.scale
        }
        doLayout() {}
        paint(e, t, s) {}
    }
    class pi extends ui {
        constructor(e, t) {
            super(e, t),
            this.glyphs = null
        }
        get isEmpty() {
            return !this.glyphs || 0 === this.glyphs.length
        }
        doLayout() {
            if (!this.glyphs || 0 === this.glyphs.length)
                return void (this.width = 0);
            let e = 0;
            for (let t = 0, s = this.glyphs.length; t < s; t++) {
                let s = this.glyphs[t];
                s.renderer = this.renderer,
                s.doLayout(),
                e = Math.max(e, s.width)
            }
            this.width = e
        }
        addGlyph(e) {
            this.glyphs || (this.glyphs = []),
            this.renderer && (e.renderer = this.renderer),
            this.glyphs.push(e)
        }
        paint(e, t, s) {
            let i = this.glyphs;
            if (i && 0 !== i.length)
                for (let n of i)
                    n.paint(e + this.x, t + this.y, s)
        }
    }
    class gi extends pi {
        constructor() {
            super(0, 0),
            this.glyphs = []
        }
        addGlyph(e) {
            e.x += 0 === this.glyphs.length ? 0 : this.glyphs[this.glyphs.length - 1].x + this.glyphs[this.glyphs.length - 1].width,
            e.renderer = this.renderer,
            e.doLayout(),
            this.width = e.x + e.width,
            super.addGlyph(e)
        }
    }
    class fi extends pi {
        constructor(e, t, s) {
            super(e, t),
            this.voice = s,
            this.beatGlyphs = [],
            this.tupletGroups = []
        }
        scaleToWidth(e) {
            const t = this.renderer.scale;
            let s = this.renderer.layoutingInfo.spaceToForce(e / t);
            this.scaleToForce(s)
        }
        scaleToForce(e) {
            const t = this.renderer.scale;
            this.width = this.renderer.layoutingInfo.calculateVoiceWidth(e) * t;
            let s = this.renderer.layoutingInfo.buildOnTimePositions(e)
              , i = this.beatGlyphs;
            for (let e = 0, n = i.length; e < n; e++) {
                let r = i[e];
                switch (r.beat.graceType) {
                case p.None:
                    r.x = s.get(r.beat.absoluteDisplayStart) * t - r.onTimeX;
                    break;
                default:
                    const n = r.beat.graceGroup.beats[0].absoluteDisplayStart
                      , a = r.beat.graceGroup.id;
                    if (r.beat.graceGroup.isComplete && s.has(n)) {
                        r.x = s.get(n) * t - r.onTimeX;
                        let e = this.renderer.layoutingInfo.allGraceRods.get(a)
                          , i = this.renderer.layoutingInfo.springs.get(n).preBeatWidth;
                        r.x -= i,
                        r.x -= e[r.beat.graceIndex].postSpringWidth / 2,
                        r.x += e[r.beat.graceIndex].graceBeatWidth;
                        const o = e[r.beat.graceGroup.beats.length - 1];
                        r.x -= o.graceBeatWidth
                    } else {
                        let t = this.renderer.layoutingInfo.incompleteGraceRods.get(a);
                        const s = t[r.beat.graceIndex].postSpringWidth - t[r.beat.graceIndex].preSpringWidth;
                        e > 0 ? 0 === r.beat.graceIndex ? r.x = i[e - 1].x + i[e - 1].width : r.x = i[e - 1].x + t[r.beat.graceIndex - 1].postSpringWidth - t[r.beat.graceIndex - 1].preSpringWidth - s : r.x = -s
                    }
                }
                if (e > 0) {
                    let t = r.x - i[e - 1].x;
                    i[e - 1].scaleToWidth(t)
                }
                if (e === n - 1) {
                    let e = this.width - i[i.length - 1].x;
                    r.scaleToWidth(e)
                }
            }
        }
        registerLayoutingInfo(e) {
            e.updateVoiceSize(this.width);
            let t = this.beatGlyphs;
            for (let s of t)
                s.registerLayoutingInfo(e)
        }
        applyLayoutingInfo(e) {
            let t = this.beatGlyphs;
            for (let s of t)
                s.applyLayoutingInfo(e);
            this.scaleToForce(Math.max(this.renderer.settings.display.stretchForce, e.minStretchForce))
        }
        addGlyph(e) {
            let t = e;
            e.x = 0 === this.beatGlyphs.length ? 0 : this.beatGlyphs[this.beatGlyphs.length - 1].x + this.beatGlyphs[this.beatGlyphs.length - 1].width,
            e.renderer = this.renderer,
            e.doLayout(),
            this.beatGlyphs.push(t),
            this.width = e.x + e.width,
            t.beat.hasTuplet && t.beat.tupletGroup.beats[0].id === t.beat.id && this.tupletGroups.push(t.beat.tupletGroup)
        }
        doLayout() {}
        paint(e, t, s) {
            s.color = 0 === this.voice.index ? this.renderer.resources.mainGlyphColor : this.renderer.resources.secondaryGlyphColor;
            for (let i = 0, n = this.beatGlyphs.length; i < n; i++)
                this.beatGlyphs[i].paint(e + this.x, t + this.y, s)
        }
    }
    function mi(e) {
        if (!e)
            throw new Error("Assertion failed")
    }
    fi.KeySizeBeat = "Beat";
    class yi {
        constructor() {
            this.maxLine = -1e3,
            this.minLine = -1e3
        }
    }
    class bi {
        constructor(e, t=null) {
            this._scoreBarRenderer = null,
            this._alteredAccidentalByLine = new Map,
            this._linesByNoteValue = new Map,
            this._lineByNoteId = new Map,
            this._accidentalByNoteId = new Map,
            this._beatLines = new Map,
            this.maxLineBeat = null,
            this.minLineBeat = null,
            this.maxLine = -1e3,
            this.minLine = -1e3,
            this._bar = e,
            this._scoreBarRenderer = t
        }
        static getPercussionLine(e, t) {
            var s, i;
            return t < e.staff.track.percussionArticulations.length ? e.staff.track.percussionArticulations[t].staffLine : null !== (i = null === (s = ct.getArticulationByValue(t)) || void 0 === s ? void 0 : s.staffLine) && void 0 !== i ? i : 0
        }
        static getNoteValueWithoutForcedAccidental(e) {
            let t = e.displayValue;
            switch (e.accidentalMode) {
            case D.ForceDoubleFlat:
                t += 2;
                break;
            case D.ForceDoubleSharp:
                t -= 2;
                break;
            case D.ForceFlat:
                t += 1;
                break;
            case D.ForceSharp:
                t -= 1
            }
            return t
        }
        static isNoteValueOnScale(e, t) {
            const s = Ht.get(t) || 0;
            return bi.StepValues.includes(((e + s) % 12 + 12) % 12)
        }
        init() {
            const e = -this._bar.staff.transpositionPitch
              , t = this._bar.masterBar.keySignature
              , s = ei(this._bar);
            let i = e / 12 | 0;
            const n = e % 12
              , r = -js(s);
            n > 0 && r < n ? i += 1 : n < 0 && 12 - r <= -n && (i -= 1);
            const a = bi.KeySignatureTonicSteps.get(s) - bi.KeySignatureTonicSteps.get(t)
              , o = i * bi.StepsPerOctave + a;
            for (const e of this._bar.voices)
                for (const t of e.beats)
                    for (const e of t.notes)
                        this.applyAccidental(e, o)
        }
        getNoteLine(e) {
            return this._lineByNoteId.get(e.id)
        }
        getNoteAccidental(e) {
            return this._accidentalByNoteId.get(e.id)
        }
        getMaxLine(e) {
            return this._beatLines.has(e.id) ? this._beatLines.get(e.id).maxLine : 0
        }
        getMinLine(e) {
            return this._beatLines.has(e.id) ? this._beatLines.get(e.id).minLine : 0
        }
        applyAccidental(e, t) {
            var s, i;
            let n, r;
            if (this._bar.staff.isPercussion)
                n = bi.getPercussionLine(this._bar, e.percussionArticulation),
                r = qt.None;
            else if (0 === e.beat.index && (null === (s = e.tieOrigin) || void 0 === s ? void 0 : s.realValue) === e.realValue && (null === (i = this._scoreBarRenderer) || void 0 === i ? void 0 : i.previousRenderer) && this._scoreBarRenderer.previousRenderer.getNoteLine(e.tieOrigin))
                r = qt.None,
                n = this._scoreBarRenderer.previousRenderer.getNoteLine(e.tieOrigin);
            else {
                if (this._linesByNoteValue.has(e.displayValue))
                    n = this._linesByNoteValue.get(e.displayValue);
                else {
                    const s = !0;
                    if (e.accidentalMode !== D.Default && s) {
                        const s = bi.getNoteValueWithoutForcedAccidental(e) + e.beat.voice.bar.staff.transpositionPitch + e.beat.voice.bar.staff.displayTranspositionPitch;
                        n = this.noteValueToLine(s, this._bar.masterBar.keySignature) - t
                    } else {
                        const t = e.beat.voice.bar.staff.transpositionPitch ? e.displayValue : bi.getNoteValueWithoutForcedAccidental(e);
                        n = this.noteValueToLine(t, ei(this._bar))
                    }
                    for (const [e,t] of this._linesByNoteValue.entries())
                        t === n && this._linesByNoteValue.delete(e);
                    this._linesByNoteValue.set(e.displayValue, n)
                }
                r = this.computeAndRegisterAccidental(n, e.displayValue)
            }
            this.registerLine(n, e),
            this._lineByNoteId.set(e.id, n),
            this._accidentalByNoteId.set(e.id, r)
        }
        registerLine(e, t) {
            const s = t.beat;
            let i;
            (-1e3 === this.minLine || this.minLine < e) && (this.minLine = e,
            this.minLineBeat = s),
            (-1e3 === this.maxLine || this.maxLine > e) && (this.maxLine = e,
            this.maxLineBeat = s),
            this._beatLines.has(s.id) ? i = this._beatLines.get(s.id) : (i = new yi,
            this._beatLines.set(s.id, i)),
            (-1e3 === i.minLine || e < i.minLine) && (i.minLine = e),
            (-1e3 === i.minLine || e > i.maxLine) && (i.maxLine = e)
        }
        computeAndRegisterAccidental(e, t) {
            const s = this.lineToNoteValue(e);
            let i = [qt.DoubleFlat, qt.Flat, qt.None, qt.Sharp, qt.DoubleSharp][t - s + 2];
            void 0 === i && (_e.error("Accidental", "impossible for note on line " + e + " to reach value of " + t + " with any accidentals, gaps = " + (t - s)),
            i = qt.None);
            let n = i;
            return i === this.getAccidentalOnLine(e) ? n = qt.None : (this._alteredAccidentalByLine.set(e, i),
            i === qt.None && (n = qt.Natural)),
            n
        }
        getAccidentalOnLine(e) {
            if (this._alteredAccidentalByLine.has(e))
                return this._alteredAccidentalByLine.get(e);
            const t = ei(this._bar)
              , s = this.lineToNoteValue(e) % 12;
            return bi.KeySignatureLookup[t + 7][s] ? ht.keySignatureIsFlat(t) ? qt.Flat : qt.Sharp : qt.None
        }
        lineToNoteValue(e) {
            const t = this._bar.clef
              , s = bi.OctaveSteps[t] - e;
            mi(s >= 0);
            const i = Math.floor(s / bi.StepsPerOctave)
              , n = s % bi.StepsPerOctave;
            return 12 * i + bi.StepValues[n]
        }
        noteValueToLine(e, t) {
            mi(e >= 0);
            const s = ht.keySignatureIsFlat(t) ? bi.FlatNoteSteps : bi.SharpNoteSteps
              , i = this._bar.clef
              , n = e % 12
              , r = Math.floor(e / 12) * bi.StepsPerOctave + s[n];
            let a = 0;
            return t === $.FSharp ? 5 === n && (a = -1) : t === $.CSharp ? 0 !== n && 5 !== n || (a = -1) : t === $.Gb ? 11 === n && (a = 1) : t === $.Cb && (4 !== n && 11 !== n || (a = 1)),
            bi.OctaveSteps[i] - r - a
        }
    }
    bi.KeySignatureLookup = [[!0, !0, !0, !0, !0, !0, !0, !0, !0, !0, !0, !0], [!0, !0, !0, !0, !0, !1, !0, !0, !0, !0, !0, !0], [!1, !0, !0, !0, !0, !1, !0, !0, !0, !0, !0, !0], [!1, !0, !0, !0, !0, !1, !1, !1, !0, !0, !0, !0], [!1, !1, !1, !0, !0, !1, !1, !1, !0, !0, !0, !0], [!1, !1, !1, !0, !0, !1, !1, !1, !1, !1, !0, !0], [!1, !1, !1, !1, !1, !1, !1, !1, !1, !1, !0, !0], [!1, !1, !1, !1, !1, !1, !1, !1, !1, !1, !1, !1], [!1, !1, !1, !1, !1, !0, !0, !1, !1, !1, !1, !1], [!0, !0, !1, !1, !1, !0, !0, !1, !1, !1, !1, !1], [!0, !0, !1, !1, !1, !0, !0, !0, !0, !1, !1, !1], [!0, !0, !0, !0, !1, !0, !0, !0, !0, !1, !1, !1], [!0, !0, !0, !0, !1, !0, !0, !0, !0, !0, !0, !1], [!0, !0, !0, !0, !0, !0, !0, !0, !0, !0, !0, !1], [!0, !0, !0, !0, !0, !0, !0, !0, !0, !0, !0, !0]],
    bi.StepValues = [0, 2, 4, 5, 7, 9, 11],
    bi.StepsPerOctave = bi.StepValues.length,
    bi.OctaveSteps = [45, 39, 37, 33, 45],
    bi.SharpNoteSteps = [0, 0, 1, 1, 2, 3, 3, 4, 4, 5, 5, 6],
    bi.FlatNoteSteps = [0, 1, 1, 2, 2, 3, 4, 4, 5, 5, 6, 6],
    bi.KeySignatureTonicSteps = new Map([[$.C, 0], [$.CSharp, 0], [$.Cb, 0], [$.Db, 1], [$.D, 1], [$.E, 2], [$.Eb, 2], [$.F, 3], [$.FSharp, 3], [$.G, 4], [$.Gb, 4], [$.A, 5], [$.Ab, 5], [$.B, 6], [$.Bb, 6]]);
    class Si {
        constructor() {
            this.staffId = "",
            this.up = 0,
            this.down = 0
        }
    }
    class wi {
        constructor() {
            this.startBeat = null,
            this.startX = 0,
            this.startY = 0,
            this.endBeat = null,
            this.endX = 0,
            this.endY = 0
        }
        calcY(e) {
            return this.startX === this.endX ? this.startY : (this.endY - this.startY) / (this.endX - this.startX) * (e - this.startX) + this.startY
        }
    }
    class _i {
        constructor(e, t) {
            this._beatLineXPositions = new Map,
            this._firstNonRestBeat = null,
            this._lastNonRestBeat = null,
            this.voice = null,
            this.beats = [],
            this.shortestDuration = d.QuadrupleWhole,
            this.fingeringCount = 0,
            this.hasTuplet = !1,
            this._firstBeatLowestNoteCompareValue = -1,
            this._firstBeatHighestNoteCompareValue = -1,
            this._lastBeatLowestNoteCompareValue = -1,
            this._lastBeatHighestNoteCompareValue = -1,
            this.lowestNoteInHelper = null,
            this._lowestNoteCompareValueInHelper = -1,
            this.highestNoteInHelper = null,
            this._highestNoteCompareValueInHelper = -1,
            this.invertBeamDirection = !1,
            this.preferredBeamDirection = null,
            this.isGrace = !1,
            this.minRestLine = null,
            this.beatOfMinRestLine = null,
            this.maxRestLine = null,
            this.beatOfMaxRestLine = null,
            this.direction = Ut.Up,
            this.drawingInfos = new Map,
            this._staff = e,
            this._renderer = t,
            this.beats = []
        }
        get isRestBeamHelper() {
            return 1 === this.beats.length && this.beats[0].isRest
        }
        get hasLine() {
            return 1 === this.beats.length && this.beats[0].duration > d.Whole
        }
        get hasFlag() {
            return 1 === this.beats.length && !this.beats[0].isRest && (this.beats[0].duration > d.Quarter || this.beats[0].graceType !== p.None)
        }
        getBeatLineX(e) {
            return this.hasBeatLineX(e) ? this.direction === Ut.Up ? this._beatLineXPositions.get(e.index).up : this._beatLineXPositions.get(e.index).down : 0
        }
        hasBeatLineX(e) {
            return this._beatLineXPositions.has(e.index)
        }
        registerBeatLineX(e, t, s, i) {
            let n = this.getOrCreateBeatPositions(t);
            n.staffId = e,
            n.up = s,
            n.down = i;
            for (const e of this.drawingInfos.values())
                e.startBeat == t ? e.startX = this.getBeatLineX(t) : e.endBeat == t && (e.endX = this.getBeatLineX(t))
        }
        getOrCreateBeatPositions(e) {
            return this._beatLineXPositions.has(e.index) || this._beatLineXPositions.set(e.index, new Si),
            this._beatLineXPositions.get(e.index)
        }
        finish() {
            this.direction = this.calculateDirection()
        }
        calculateDirection() {
            let e = null;
            if (this.voice ? null !== this.preferredBeamDirection ? e = this.preferredBeamDirection : this.voice.index > 0 ? e = this.invert(Ut.Down) : (this.voice.bar.isMultiVoice || this.beats[0].graceType !== p.None) && (e = this.invert(Ut.Up)) : e = Ut.Up,
            this.highestNoteInHelper && this.lowestNoteInHelper) {
                let t = this._renderer.getNoteY(this.highestNoteInHelper, li.Center)
                  , s = this._renderer.getNoteY(this.lowestNoteInHelper, li.Center);
                if (null === e) {
                    const i = (t + s) / 2;
                    e = this.invert(this._renderer.middleYPosition < i ? Ut.Up : Ut.Down)
                }
                this._renderer.completeBeamingHelper(this)
            } else
                e = this.invert(Ut.Up),
                this._renderer.completeBeamingHelper(this);
            return e
        }
        static computeLineHeightsForRest(e) {
            switch (e) {
            case d.QuadrupleWhole:
            case d.DoubleWhole:
                return [2, 2];
            case d.Whole:
                return [0, 1];
            case d.Half:
                return [1, 0];
            case d.Quarter:
                return [3, 3];
            case d.Eighth:
                return [2, 2];
            case d.Sixteenth:
                return [2, 4];
            case d.ThirtySecond:
                return [4, 4];
            case d.SixtyFourth:
                return [4, 6];
            case d.OneHundredTwentyEighth:
                return [6, 6];
            case d.TwoHundredFiftySixth:
                return [6, 8]
            }
            return [0, 0]
        }
        applyRest(e, t) {
            if (this._lastNonRestBeat && e.index >= this._lastNonRestBeat.index || this._firstNonRestBeat && e.index <= this._firstNonRestBeat.index)
                return;
            let s = t
              , i = t;
            const n = _i.computeLineHeightsForRest(e.duration);
            s -= n[0],
            i += n[1];
            const r = this.minRestLine
              , a = this.maxRestLine;
            (null === r || r > s) && (this.minRestLine = s,
            this.beatOfMinRestLine = e),
            (null === a || a < i) && (this.maxRestLine = i,
            this.beatOfMaxRestLine = e)
        }
        invert(e) {
            if (!this.invertBeamDirection)
                return e;
            switch (e) {
            case Ut.Down:
                return Ut.Up;
            default:
                return Ut.Down
            }
        }
        checkBeat(e) {
            e.invertBeamDirection && (this.invertBeamDirection = !0),
            this.voice || (this.voice = e.voice);
            let t = !1;
            if (0 === this.beats.length)
                t = !0;
            else
                switch (this.beats[this.beats.length - 1].beamingMode) {
                case z.Auto:
                    t = _i.canJoin(this.beats[this.beats.length - 1], e);
                    break;
                case z.ForceSplitToNext:
                    t = !1;
                    break;
                case z.ForceMergeWithNext:
                    t = !0
                }
            if (t) {
                if (null !== e.preferredBeamDirection && (this.preferredBeamDirection = e.preferredBeamDirection),
                !e.isRest || this._staff.showNumberedNotation) {
                    this.isRestBeamHelper && !this._staff.showNumberedNotation && (this.beats = []),
                    this.beats.push(e),
                    e.graceType !== p.None && (this.isGrace = !0),
                    e.hasTuplet && (this.hasTuplet = !0);
                    let t = 0;
                    for (let s = 0; s < e.notes.length; s++) {
                        let i = e.notes[s];
                        i.leftHandFinger === E.Unknown && i.rightHandFinger === E.Unknown || t++
                    }
                    t > this.fingeringCount && (this.fingeringCount = t),
                    this.checkNote(e.minNote),
                    this.checkNote(e.maxNote),
                    this.shortestDuration < e.duration && (this.shortestDuration = e.duration),
                    this._firstNonRestBeat || (this._firstNonRestBeat = e),
                    this._lastNonRestBeat = e
                } else
                    0 === this.beats.length && this.beats.push(e);
                e.hasTuplet && (this.hasTuplet = !0)
            }
            return t
        }
        checkNote(e) {
            if (!e)
                return;
            let t, s;
            this.voice && e.isPercussion ? (t = -bi.getPercussionLine(this.voice.bar, e.percussionArticulation),
            s = t) : (t = bi.getNoteValueWithoutForcedAccidental(e),
            s = t,
            e.harmonicType !== M.None && e.harmonicType !== M.Natural && (s = e.realValue - this._staff.displayTranspositionPitch)),
            1 === this.beats.length && this.beats[0] === e.beat && ((-1 === this._firstBeatLowestNoteCompareValue || t < this._firstBeatLowestNoteCompareValue) && (this._firstBeatLowestNoteCompareValue = t),
            (-1 === this._firstBeatHighestNoteCompareValue || s > this._firstBeatHighestNoteCompareValue) && (this._firstBeatHighestNoteCompareValue = s)),
            (-1 === this._lastBeatLowestNoteCompareValue || t < this._lastBeatLowestNoteCompareValue) && (this._lastBeatLowestNoteCompareValue = t),
            (-1 === this._lastBeatHighestNoteCompareValue || s > this._lastBeatHighestNoteCompareValue) && (this._lastBeatHighestNoteCompareValue = s),
            (!this.lowestNoteInHelper || t < this._lowestNoteCompareValueInHelper) && (this.lowestNoteInHelper = e,
            this._lowestNoteCompareValueInHelper = t),
            (!this.highestNoteInHelper || s > this._highestNoteCompareValueInHelper) && (this.highestNoteInHelper = e,
            this._highestNoteCompareValueInHelper = s)
        }
        static canJoin(e, t) {
            if (!e || !t || e.graceType !== t.graceType || e.graceType === p.BendGrace || t.graceType === p.BendGrace)
                return !1;
            if (e.graceType !== p.None && t.graceType !== p.None)
                return !0;
            let s = e.voice.bar;
            if (s !== t.voice.bar)
                return !1;
            let i = e.playbackStart
              , n = t.playbackStart;
            if (!_i.canJoinDuration(e.duration) || !_i.canJoinDuration(t.duration))
                return i === n;
            if (e.tupletGroup !== t.tupletGroup)
                return !1;
            if (e.hasTuplet && t.hasTuplet && e.tupletGroup === t.tupletGroup && e.tupletGroup.isFull)
                return !0;
            let r = Z.QuarterTime;
            switch (s.masterBar.timeSignatureDenominator) {
            case 8:
                s.masterBar.timeSignatureNumerator % 3 == 0 && (r += Z.QuarterTime / 2 | 0)
            }
            return (0 | (r + i) / r) === (0 | (r + n) / r)
        }
        static canJoinDuration(e) {
            switch (e) {
            case d.Whole:
            case d.Half:
            case d.Quarter:
                return !1;
            default:
                return !0
            }
        }
        static isFullBarJoin(e, t, s) {
            return ht.getIndex(e.duration) - 2 - s > 0 && ht.getIndex(t.duration) - 2 - s > 0
        }
        get beatOfLowestNote() {
            return this.lowestNoteInHelper.beat
        }
        get beatOfHighestNote() {
            return this.highestNoteInHelper.beat
        }
        isPositionFrom(e, t) {
            return !this._beatLineXPositions.has(t.index) || (this._beatLineXPositions.get(t.index).staffId === e || !this._beatLineXPositions.get(t.index).staffId)
        }
    }
    class Bi {
        constructor(e, t) {
            this.topY = 0,
            this.bottomY = 0,
            this.topY = e,
            this.bottomY = t
        }
    }
    class Ti {
        constructor(e) {
            this.topY = -1e3,
            this.bottomY = -1e3,
            this.slots = [],
            this.beat = e
        }
        addSlot(e, t) {
            if (this.slots.push(new Bi(e,t)),
            -1e3 === this.topY)
                this.topY = e,
                this.bottomY = t;
            else {
                const s = Math.min(e, t)
                  , i = Math.max(e, t);
                s < this.topY && (this.topY = s),
                i > this.bottomY && (this.bottomY = i)
            }
        }
    }
    class Ni {
        constructor() {
            this.reservedLayoutAreasByDisplayTime = new Map,
            this.restDurationsByDisplayTime = new Map
        }
        getBeatMinMaxY() {
            let e = -1e3
              , t = -1e3;
            for (const s of this.reservedLayoutAreasByDisplayTime.values())
                -1e3 === e ? (e = s.topY,
                t = s.bottomY) : (e > s.topY && (e = s.topY),
                t < s.bottomY && (t = s.bottomY));
            return -1e3 === e ? [0, 0] : [e, t]
        }
        reserveBeatSlot(e, t, s) {
            t != s && (this.reservedLayoutAreasByDisplayTime.has(e.displayStart) || this.reservedLayoutAreasByDisplayTime.set(e.displayStart, new Ti(e)),
            this.reservedLayoutAreasByDisplayTime.get(e.displayStart).addSlot(t, s),
            e.isRest && this.registerRest(e))
        }
        registerRest(e) {
            this.restDurationsByDisplayTime.has(e.displayStart) || this.restDurationsByDisplayTime.set(e.displayStart, new Map),
            this.restDurationsByDisplayTime.get(e.displayStart).has(e.playbackDuration) || this.restDurationsByDisplayTime.get(e.displayStart).set(e.playbackDuration, e.id)
        }
        applyRestCollisionOffset(e, t, s) {
            if (e.voice.index > 0 && this.reservedLayoutAreasByDisplayTime.has(e.playbackStart)) {
                const i = _i.computeLineHeightsForRest(e.duration).map((e => e * s));
                let n = t - i[0]
                  , r = t + i[1]
                  , a = n;
                const o = this.reservedLayoutAreasByDisplayTime.get(e.playbackStart);
                let h = !1;
                for (const e of o.slots)
                    if (n >= e.topY && n <= e.bottomY || r >= e.topY && r <= e.bottomY) {
                        h = !0;
                        break
                    }
                if (h) {
                    a = 1 == e.voice.index ? o.topY - i[1] - i[0] : o.bottomY;
                    let t = a + i[0] + i[1];
                    const r = 2 * s;
                    let h = Math.ceil(Math.abs(a - n) / r);
                    return o.addSlot(a, t),
                    a < n ? h * -r : h * r
                }
            }
            return 0
        }
    }
    class vi {
        constructor(e) {
            this.beamHelpers = [],
            this.beamHelperLookup = [],
            this._renderer = e,
            this.collisionHelper = new Ni
        }
        initialize() {
            var e = this._renderer
              , t = this._renderer.bar;
            let s = null
              , i = null;
            for (let n = 0, r = t.voices.length; n < r; n++) {
                let r = t.voices[n];
                this.beamHelpers.push([]),
                this.beamHelperLookup.push(new Map);
                for (let n = 0, a = r.beats.length; n < a; n++) {
                    let a, o = r.beats[n];
                    o.graceType !== p.None ? a = i : (a = s,
                    i = null),
                    a && a.checkBeat(o) || (a && a.finish(),
                    a = new _i(t.staff,e),
                    a.checkBeat(o),
                    o.graceType !== p.None ? i = a : s = a,
                    this.beamHelpers[r.index].push(a)),
                    this.beamHelperLookup[r.index].set(o.index, a)
                }
                s && s.finish(),
                i && i.finish(),
                s = null,
                i = null
            }
        }
        getBeamingHelperForBeat(e) {
            return this.beamHelperLookup[e.voice.index].get(e.index)
        }
    }
    !function(e) {
        e[e.TopWithStem = 0] = "TopWithStem",
        e[e.Top = 1] = "Top",
        e[e.Center = 2] = "Center",
        e[e.Bottom = 3] = "Bottom",
        e[e.BottomWithStem = 4] = "BottomWithStem"
    }(li || (li = {})),
    function(e) {
        e[e.Left = 0] = "Left",
        e[e.Center = 1] = "Center",
        e[e.Right = 2] = "Right"
    }(ci || (ci = {}));
    class xi {
        constructor(e, t) {
            this._preBeatGlyphs = new gi,
            this._voiceContainers = new Map,
            this._postBeatGlyphs = new gi,
            this.x = 0,
            this.y = 0,
            this.width = 0,
            this.height = 0,
            this.index = 0,
            this.topOverflow = 0,
            this.bottomOverflow = 0,
            this.isLinkedToPrevious = !1,
            this.canWrap = !0,
            this._wasFirstOfLine = !1,
            this._appliedLayoutingInfo = 0,
            this.isFinalized = !1,
            this.topPadding = 0,
            this.bottomPadding = 0,
            this.scoreRenderer = e,
            this.bar = t,
            t && (this.helpers = new vi(this))
        }
        get nextRenderer() {
            return this.bar && this.bar.nextBar ? this.scoreRenderer.layout.getRendererForBar(this.staffRenderer.staveId, this.bar.nextBar) : null
        }
        get previousRenderer() {
            return this.bar && this.bar.previousBar ? this.scoreRenderer.layout.getRendererForBar(this.staffRenderer.staveId, this.bar.previousBar) : null
        }
        get middleYPosition() {
            return 0
        }
        registerOverflowTop(e) {
            e > this.topOverflow && (this.topOverflow = e)
        }
        registerOverflowBottom(e) {
            e > this.bottomOverflow && (this.bottomOverflow = e)
        }
        scaleToWidth(e) {
            let t = e - this._preBeatGlyphs.width - this._postBeatGlyphs.width;
            for (const e of this._voiceContainers.values())
                e.scaleToWidth(t);
            this._postBeatGlyphs.x = this._preBeatGlyphs.x + this._preBeatGlyphs.width + t,
            this.width = e
        }
        get resources() {
            return this.settings.display.resources
        }
        get settings() {
            return this.scoreRenderer.settings
        }
        get scale() {
            return this.settings.display.scale
        }
        get isFirstOfLine() {
            return 0 === this.index
        }
        get isLast() {
            return !this.bar || this.bar.index === this.scoreRenderer.layout.lastBarIndex
        }
        registerLayoutingInfo() {
            let e = this.layoutingInfo
              , t = this._preBeatGlyphs.width;
            e.preBeatSize < t && (e.preBeatSize = t);
            for (const t of this._voiceContainers.values())
                t.registerLayoutingInfo(e);
            let s = this._postBeatGlyphs.width;
            e.postBeatSize < s && (e.postBeatSize = s)
        }
        applyLayoutingInfo() {
            if (this._appliedLayoutingInfo >= this.layoutingInfo.version)
                return !1;
            this._appliedLayoutingInfo = this.layoutingInfo.version,
            this._preBeatGlyphs.width = this.layoutingInfo.preBeatSize;
            let e = this._preBeatGlyphs.x + this._preBeatGlyphs.width;
            for (const t of this._voiceContainers.values()) {
                t.x = this._preBeatGlyphs.x + this._preBeatGlyphs.width,
                t.applyLayoutingInfo(this.layoutingInfo);
                let s = t.x + t.width;
                e < s && (e = s)
            }
            return this._postBeatGlyphs.x = Math.floor(e),
            this._postBeatGlyphs.width = this.layoutingInfo.postBeatSize,
            this.width = Math.ceil(this._postBeatGlyphs.x + this._postBeatGlyphs.width),
            !0
        }
        finalizeRenderer() {
            this.isFinalized = !0
        }
        doLayout() {
            if (this.bar) {
                this.helpers.initialize(),
                this._preBeatGlyphs = new gi,
                this._preBeatGlyphs.renderer = this,
                this._voiceContainers.clear(),
                this._postBeatGlyphs = new gi,
                this._postBeatGlyphs.renderer = this;
                for (let e = 0; e < this.bar.voices.length; e++) {
                    let t = this.bar.voices[e];
                    if (this.hasVoiceContainer(t)) {
                        let s = new fi(0,0,t);
                        s.renderer = this,
                        this._voiceContainers.set(this.bar.voices[e].index, s)
                    }
                }
                this.bar.simileMark === g.SecondOfDouble && (this.canWrap = !1),
                this.createPreBeatGlyphs(),
                this.createBeatGlyphs(),
                this.createPostBeatGlyphs(),
                this.updateSizes();
                for (const e of this.helpers.beamHelpers)
                    for (const t of e)
                        t.finish()
            }
        }
        hasVoiceContainer(e) {
            return !e.isEmpty || 0 === e.index
        }
        updateSizes() {
            this.staffRenderer.registerStaffTop(this.topPadding),
            this.staffRenderer.registerStaffBottom(this.height - this.bottomPadding);
            let e = this._voiceContainers
              , t = this.beatGlyphsStart
              , s = t;
            for (const i of e.values()) {
                i.x = t,
                i.doLayout();
                let e = i.x + i.width;
                s < e && (s = e)
            }
            this._postBeatGlyphs.x = Math.floor(s),
            this.width = Math.ceil(this._postBeatGlyphs.x + this._postBeatGlyphs.width)
        }
        addPreBeatGlyph(e) {
            e.renderer = this,
            this._preBeatGlyphs.addGlyph(e)
        }
        addBeatGlyph(e) {
            e.renderer = this,
            e.preNotes.renderer = this,
            e.onNotes.renderer = this,
            e.onNotes.beamingHelper = this.helpers.beamHelperLookup[e.beat.voice.index].get(e.beat.index),
            this.getVoiceContainer(e.beat.voice).addGlyph(e)
        }
        getVoiceContainer(e) {
            return this._voiceContainers.get(e.index)
        }
        getBarNumber() {
            let t;
            const s = this.bar.index + (this.bar.masterBar.score.masterBars[0].isAnacrusis ? 0 : 1);
            return t = !this.bar.masterBar.isAnacrusis && (!this.settings.notation.onlyShowBarNumberAtLineStart || (this.settings.display.layoutMode === e.LayoutMode.Horizontal ? s % 4 == 0 : this.isFirstOfLine)),
            t ? s : 0
        }
        getBeatContainer(e) {
            var t, s;
            return null === (s = null === (t = this.getVoiceContainer(e.voice)) || void 0 === t ? void 0 : t.beatGlyphs) || void 0 === s ? void 0 : s[e.index]
        }
        getPreNotesGlyphForBeat(e) {
            var t;
            return null === (t = this.getBeatContainer(e)) || void 0 === t ? void 0 : t.preNotes
        }
        getOnNotesGlyphForBeat(e) {
            var t;
            return null === (t = this.getBeatContainer(e)) || void 0 === t ? void 0 : t.onNotes
        }
        paint(e, t, s) {
            this.paintBackground(e, t, s),
            s.color = this.resources.mainGlyphColor,
            this._preBeatGlyphs.paint(e + this.x, t + this.y, s);
            for (const i of this._voiceContainers.values())
                s.color = 0 === i.voice.index ? this.resources.mainGlyphColor : this.resources.secondaryGlyphColor,
                i.paint(e + this.x, t + this.y, s);
            s.color = this.resources.mainGlyphColor,
            this._postBeatGlyphs.paint(e + this.x, t + this.y, s)
        }
        paintBackground(e, t, s) {}
        buildBoundingsLookup(e, t, s) {
            let i = new cs;
            i.bar = this.bar,
            i.visualBounds = new ss,
            i.visualBounds.x = t + this.x,
            i.visualBounds.y = s + this.y + this.topPadding,
            i.visualBounds.w = this.width,
            i.visualBounds.h = this.height - this.topPadding - this.bottomPadding,
            i.realBounds = new ss,
            i.realBounds.x = t + this.x,
            i.realBounds.y = s + this.y,
            i.realBounds.w = this.width,
            i.realBounds.h = this.height,
            e.addBar(i);
            for (const [e,n] of this._voiceContainers) {
                let r = this.bar.isEmpty && 0 === e;
                if (!n.voice.isEmpty || r)
                    for (let e = 0, a = n.beatGlyphs.length; e < a; e++) {
                        n.beatGlyphs[e].buildBoundingsLookup(i, t + this.x + n.x, s + this.y + n.y, r)
                    }
            }
        }
        addPostBeatGlyph(e) {
            this._postBeatGlyphs.addGlyph(e)
        }
        createPreBeatGlyphs() {
            this._wasFirstOfLine = this.isFirstOfLine
        }
        createBeatGlyphs() {
            for (let e = 0; e < this.bar.voices.length; e++) {
                let t = this.bar.voices[e];
                this.hasVoiceContainer(t) && this.createVoiceGlyphs(this.bar.voices[e])
            }
        }
        createVoiceGlyphs(e) {}
        createPostBeatGlyphs() {}
        get beatGlyphsStart() {
            return this._preBeatGlyphs.x + this._preBeatGlyphs.width
        }
        get postBeatGlyphsStart() {
            return this._postBeatGlyphs.x
        }
        getBeatX(e, t=hi.PreNotes) {
            let s = this.getBeatContainer(e);
            if (s)
                switch (t) {
                case hi.PreNotes:
                    return s.voiceContainer.x + s.x;
                case hi.OnNotes:
                    return s.voiceContainer.x + s.x + s.onNotes.x;
                case hi.MiddleNotes:
                    return s.voiceContainer.x + s.x + s.onTimeX;
                case hi.Stem:
                    const t = s.onNotes.beamingHelper ? s.onNotes.beamingHelper.getBeatLineX(e) : s.onNotes.x + s.onNotes.width / 2;
                    return s.voiceContainer.x + t;
                case hi.PostNotes:
                    return s.voiceContainer.x + s.x + s.onNotes.x + s.onNotes.width;
                case hi.EndBeat:
                    return s.voiceContainer.x + s.x + s.width
                }
            return 0
        }
        getNoteX(e, t) {
            let s = this.getBeatContainer(e.beat);
            return s ? s.voiceContainer.x + s.x + s.onNotes.x + s.onNotes.getNoteX(e, t) : 0
        }
        getNoteY(e, t) {
            let s = this.getOnNotesGlyphForBeat(e.beat);
            return s ? s.getNoteY(e, t) : NaN
        }
        reLayout() {
            (this._wasFirstOfLine && !this.isFirstOfLine || !this._wasFirstOfLine && this.isFirstOfLine) && (this._preBeatGlyphs = new gi,
            this._preBeatGlyphs.renderer = this,
            this.createPreBeatGlyphs()),
            this.updateSizes(),
            this.registerLayoutingInfo()
        }
        paintSimileMark(e, t, s) {
            switch (this.bar.simileMark) {
            case g.Simple:
                s.fillMusicFontSymbol(e + this.x + (this.width - 20 * this.scale) / 2, t + this.y + this.height / 2, 1, I.Repeat1Bar, !1);
                break;
            case g.SecondOfDouble:
                s.fillMusicFontSymbol(e + this.x - 28 * this.scale / 2, t + this.y + this.height / 2, 1, I.Repeat2Bars, !1)
            }
        }
        completeBeamingHelper(e) {}
    }
    xi.LineSpacing = 8,
    xi.StemWidth = .12 * xi.LineSpacing,
    xi.StaffLineThickness = .13 * xi.LineSpacing,
    xi.BeamThickness = .35 * xi.LineSpacing,
    xi.BeamSpacing = .25 * xi.LineSpacing,
    function(e) {
        e[e.SinglePreBeat = 0] = "SinglePreBeat",
        e[e.SingleOnBeat = 1] = "SingleOnBeat",
        e[e.SingleOnBeatToEnd = 2] = "SingleOnBeatToEnd",
        e[e.GroupedOnBeat = 3] = "GroupedOnBeat",
        e[e.GroupedOnBeatToEnd = 4] = "GroupedOnBeatToEnd",
        e[e.FullBar = 5] = "FullBar"
    }(di || (di = {}));
    class ki extends ui {
        constructor(e, t) {
            super(0, 0),
            this._uniqueEffectGlyphs = [],
            this._effectGlyphs = [],
            this.isEmpty = !0,
            this.isLinkedToPrevious = !1,
            this.firstBeat = null,
            this.lastBeat = null,
            this.height = 0,
            this.voice = e,
            this.info = t
        }
        doLayout() {
            super.doLayout();
            for (let e = 0; e < this.renderer.bar.voices.length; e++)
                this._effectGlyphs.push(new Map),
                this._uniqueEffectGlyphs.push([])
        }
        createGlyph(e) {
            if (e.voice === this.voice && this.info.shouldCreateGlyph(this.renderer.settings, e) && (!this.info.hideOnMultiTrack || 0 === this.renderer.staffRenderer.trackIndex)) {
                if (this.isEmpty = !1,
                this.firstBeat && !e.isBefore(this.firstBeat) || (this.firstBeat = e),
                !this.lastBeat || e.isAfter(this.lastBeat))
                    switch (this.lastBeat = e,
                    this.info.sizingMode) {
                    case di.SingleOnBeatToEnd:
                    case di.GroupedOnBeatToEnd:
                        this.lastBeat.nextBeat && (this.lastBeat = this.lastBeat.nextBeat)
                    }
                let t = this.createOrResizeGlyph(this.info.sizingMode, e);
                t.height > this.height && (this.height = t.height)
            }
        }
        createOrResizeGlyph(e, t) {
            let s;
            switch (e) {
            case di.FullBar:
                return s = this.info.createNewGlyph(this.renderer, t),
                s.renderer = this.renderer,
                s.beat = t,
                s.doLayout(),
                this._effectGlyphs[t.voice.index].set(t.index, s),
                this._uniqueEffectGlyphs[t.voice.index].push(s),
                s;
            case di.SinglePreBeat:
            case di.SingleOnBeat:
            case di.SingleOnBeatToEnd:
                return s = this.info.createNewGlyph(this.renderer, t),
                s.renderer = this.renderer,
                s.beat = t,
                s.doLayout(),
                this._effectGlyphs[t.voice.index].set(t.index, s),
                this._uniqueEffectGlyphs[t.voice.index].push(s),
                s;
            case di.GroupedOnBeat:
            case di.GroupedOnBeatToEnd:
                let i = e === di.GroupedOnBeat ? di.SingleOnBeat : di.SingleOnBeatToEnd;
                if (t.index > 0 || this.renderer.index > 0) {
                    let e = t.previousBeat;
                    if (this.info.shouldCreateGlyph(this.renderer.settings, e)) {
                        let s = null;
                        if (t.index > 0 && this._effectGlyphs[t.voice.index].has(e.index))
                            s = this._effectGlyphs[t.voice.index].get(e.index);
                        else if (this.renderer.index > 0) {
                            let i = this.renderer.previousRenderer.getBand(this.voice, this.info.effectId)._effectGlyphs[t.voice.index];
                            i.has(e.index) && (s = i.get(e.index))
                        }
                        let n = this.createOrResizeGlyph(i, t);
                        return s && this.info.canExpand(e, t) && (s.nextGlyph = n,
                        n.previousGlyph = s,
                        this.isLinkedToPrevious = !0),
                        n
                    }
                    return this.createOrResizeGlyph(i, t)
                }
                return this.createOrResizeGlyph(i, t);
            default:
                return this.createOrResizeGlyph(di.SingleOnBeat, t)
            }
        }
        paint(e, t, s) {
            super.paint(e, t, s);
            for (let i = 0, n = this._uniqueEffectGlyphs.length; i < n; i++) {
                let n = this._uniqueEffectGlyphs[i];
                for (let i = 0, r = n.length; i < r; i++) {
                    n[i].paint(e + this.x, t + this.y, s)
                }
            }
        }
        alignGlyphs() {
            for (let e = 0; e < this._effectGlyphs.length; e++)
                for (const t of this._effectGlyphs[e].keys())
                    this.alignGlyph(this.info.sizingMode, this.renderer.bar.voices[e].beats[t])
        }
        alignGlyph(e, t) {
            let s, i = this._effectGlyphs[t.voice.index].get(t.index), n = this.renderer.getBeatContainer(t);
            switch (e) {
            case di.SinglePreBeat:
                s = n.preNotes,
                i.x = this.renderer.beatGlyphsStart + s.x + n.x,
                i.width = s.width;
                break;
            case di.SingleOnBeat:
            case di.GroupedOnBeat:
                s = n.onNotes,
                i.x = this.renderer.beatGlyphsStart + s.x + n.x,
                i.width = s.width;
                break;
            case di.SingleOnBeatToEnd:
            case di.GroupedOnBeatToEnd:
                s = n.onNotes,
                i.x = this.renderer.beatGlyphsStart + s.x + n.x,
                n.beat.isLastOfVoice ? i.width = this.renderer.width - i.x : i.width = n.width - n.preNotes.width - n.preNotes.x;
                break;
            case di.FullBar:
                i.width = this.renderer.width
            }
        }
    }
    class Pi {
        constructor() {
            this.uniqueEffectId = null,
            this.y = 0,
            this.height = 0,
            this.firstBeat = null,
            this.lastBeat = null
        }
    }
    class Fi {
        constructor() {
            this.bands = [],
            this.shared = new Pi
        }
        update(e) {
            e.info.canShareBand || (this.shared.uniqueEffectId = e.info.effectId),
            this.bands.push(e),
            e.height > this.shared.height && (this.shared.height = e.height),
            this.shared.firstBeat && !e.firstBeat.isBefore(this.shared.firstBeat) || (this.shared.firstBeat = e.firstBeat),
            this.shared.lastBeat && !e.lastBeat.isAfter(this.shared.lastBeat) || (this.shared.lastBeat = e.lastBeat)
        }
        canBeUsed(e) {
            return (!this.shared.uniqueEffectId && e.info.canShareBand || e.info.effectId === this.shared.uniqueEffectId) && (!this.shared.firstBeat || this.shared.lastBeat.isBefore(e.firstBeat) || this.shared.lastBeat.isBefore(this.shared.firstBeat))
        }
    }
    class Ci {
        constructor() {
            this.slots = [],
            this._effectSlot = new Map
        }
        getOrCreateSlot(e) {
            if (this._effectSlot.has(e.info.effectId)) {
                let t = this._effectSlot.get(e.info.effectId);
                if (t.canBeUsed(e))
                    return t
            }
            for (let t of this.slots)
                if (t.canBeUsed(e))
                    return t;
            let t = new Fi;
            return this.slots.push(t),
            t
        }
        register(e) {
            let t = this.getOrCreateSlot(e);
            t.update(e),
            this._effectSlot.set(e.info.effectId, t)
        }
    }
    class Li extends ui {
        constructor(e=0, t=0) {
            super(e, t),
            this.beat = null,
            this.nextGlyph = null,
            this.previousGlyph = null
        }
    }
    class Ei extends Li {
        constructor(e, t, s, i) {
            super(e, t),
            this.glyphScale = 0,
            this.glyphScale = s,
            this.symbol = i
        }
        paint(e, t, s) {
            s.fillMusicFontSymbol(e + this.x, t + this.y, this.glyphScale * this.scale, this.symbol, !1)
        }
    }
    class Mi extends Ei {
        constructor(e, t, s, i, n) {
            super(e, t, i.beat.graceType !== p.None ? Mi.GraceScale : 1, Mi.getSymbol(s)),
            this._tags = [],
            this._note = i,
            this._isGrace = i.beat.graceType !== p.None,
            this._duration = s,
            this._tags = n
        }
        paint(e, t, s) {
            const i = [1, 3, 6, 8, 10].includes(this._note.displayValue % 12);
            let n = this._isGrace ? this.scale : 0;
            const r = s.color;
            this._note.isTieDestination && this._note.isVisible ? s.color = this.renderer.resources.tieDestinationColor : i && (s.color = this.renderer.resources.blackKeyNoteColor),
            s.fillMusicFontSymbol(e + this.x, t + this.y + n, this.glyphScale * this.scale, this.symbol, !1, this._tags),
            s.color = r
        }
        doLayout() {
            let e = (this._isGrace ? Mi.GraceScale : 1) * this.scale;
            switch (this._duration) {
            case d.QuadrupleWhole:
                this.width = 14 * e;
                break;
            case d.DoubleWhole:
            case d.Whole:
                this.width = 14 * (this._isGrace ? Mi.GraceScale : 1) * this.scale;
                break;
            default:
                this.width = Mi.QuarterNoteHeadWidth * (this._isGrace ? Mi.GraceScale : 1) * this.scale
            }
            this.height = Mi.NoteHeadHeight * e
        }
        static getSymbol(e) {
            switch (e) {
            case d.QuadrupleWhole:
                return I.NoteheadDoubleWholeSquare;
            case d.DoubleWhole:
                return I.NoteheadDoubleWhole;
            case d.Whole:
                return I.NoteheadWhole;
            case d.Half:
                return I.NoteheadHalf;
            default:
                return I.NoteheadBlack
            }
        }
    }
    Mi.GraceScale = .75,
    Mi.NoteHeadHeight = 8,
    Mi.QuarterNoteHeadWidth = 9;
    class Di extends Ei {
        constructor(e, t, s, i, n) {
            super(e, t, n ? Mi.GraceScale : 1, Di.getSymbol(s, i, n))
        }
        doLayout() {
            this.width = 0
        }
        static getSymbol(e, t, s) {
            if (s && (e = d.Eighth),
            t === Ut.Up)
                switch (e) {
                case d.Eighth:
                    return I.FlagEighthUp;
                case d.Sixteenth:
                    return I.FlagSixteenthUp;
                case d.ThirtySecond:
                    return I.FlagThirtySecondUp;
                case d.SixtyFourth:
                    return I.FlagSixtyFourthUp;
                case d.OneHundredTwentyEighth:
                    return I.FlagOneHundredTwentyEighthUp;
                case d.TwoHundredFiftySixth:
                    return I.FlagTwoHundredFiftySixthUp;
                default:
                    return I.FlagEighthUp
                }
            switch (e) {
            case d.Eighth:
                return I.FlagEighthDown;
            case d.Sixteenth:
                return I.FlagSixteenthDown;
            case d.ThirtySecond:
                return I.FlagThirtySecondDown;
            case d.SixtyFourth:
                return I.FlagSixtyFourthDown;
            case d.OneHundredTwentyEighth:
            case d.TwoHundredFiftySixth:
                return I.FlagOneHundredTwentyEighthDown;
            default:
                return I.FlagEighthDown
            }
        }
    }
    Di.FlagWidth = 11;
    class Ri extends ui {
        constructor(e, t) {
            super(0, 0),
            this.ties = [],
            this.minWidth = 0,
            this.beat = e,
            this.ties = [],
            this.voiceContainer = t
        }
        get onTimeX() {
            return this.onNotes.x + this.onNotes.centerX
        }
        registerLayoutingInfo(e) {
            let t = this.onTimeX;
            this.beat.graceGroup && !this.beat.graceGroup.isComplete && (t += Ri.GraceBeatPadding * this.renderer.scale);
            let s = this.onNotes.width - this.onNotes.centerX;
            const i = this.renderer.helpers.getBeamingHelperForBeat(this.beat);
            (i && i.hasFlag || this.beat.graceType !== p.None) && (s += Di.FlagWidth * this.scale * (this.beat.graceType !== p.None ? Mi.GraceScale : 1));
            for (const e of this.ties)
                s += e.width;
            this.beat.graceType !== p.None && (s += Ri.GraceBeatPadding * this.renderer.scale),
            e.addBeatSpring(this.beat, t, s),
            e.setPreBeatSize(this.beat, this.preNotes.width),
            e.setOnBeatSize(this.beat, this.onNotes.width),
            e.setBeatCenterX(this.beat, this.onNotes.centerX)
        }
        applyLayoutingInfo(e) {
            let t = e.getBeatCenterX(this.beat) - this.onNotes.centerX;
            this.beat.graceGroup && !this.beat.graceGroup.isComplete && (t += Ri.GraceBeatPadding * this.renderer.scale),
            this.preNotes.x = t,
            this.preNotes.width = e.getPreBeatSize(this.beat),
            this.onNotes.width = e.getOnBeatSize(this.beat),
            this.onNotes.x = this.preNotes.x + this.preNotes.width,
            this.onNotes.updateBeamingHelper(),
            this.updateWidth()
        }
        doLayout() {
            this.preNotes.x = 0,
            this.preNotes.renderer = this.renderer,
            this.preNotes.container = this,
            this.preNotes.doLayout(),
            this.onNotes.x = this.preNotes.x + this.preNotes.width,
            this.onNotes.renderer = this.renderer,
            this.onNotes.container = this,
            this.onNotes.doLayout();
            let e = this.beat.notes.length - 1;
            for (; e >= 0; )
                this.createTies(this.beat.notes[e--]);
            this.updateWidth()
        }
        updateWidth() {
            if (this.minWidth = this.preNotes.width + this.onNotes.width,
            !this.beat.isRest)
                if (1 === this.onNotes.beamingHelper.beats.length)
                    this.beat.duration >= d.Eighth && (this.minWidth += 20 * this.scale);
                else
                    switch (this.beat.duration) {
                    case d.OneHundredTwentyEighth:
                    case d.TwoHundredFiftySixth:
                        this.minWidth += 10 * this.scale
                    }
            let e = 0;
            for (let t of this.ties)
                t.width > e && (e = t.width);
            this.minWidth += e,
            this.width = this.minWidth
        }
        scaleToWidth(e) {
            for (let e of this.ties)
                e.doLayout();
            this.onNotes.updateBeamingHelper(),
            this.width = e
        }
        createTies(e) {}
        static getGroupId(e) {
            return "b" + e.id
        }
        paint(e, t, s) {
            if (this.beat.voice.isEmpty)
                return;
            if (this.preNotes.isEmpty && this.onNotes.isEmpty && 0 === this.ties.length)
                return;
            s.beginGroup(Ri.getGroupId(this.beat)),
            this.preNotes.paint(e + this.x, t + this.y, s),
            this.onNotes.paint(e + this.x, t + this.y, s);
            let i = e - this.voiceContainer.x - this.renderer.x
              , n = t - this.voiceContainer.y - this.renderer.y;
            for (let e = 0, t = this.ties.length; e < t; e++) {
                let t = this.ties[e];
                t.renderer = this.renderer,
                t.paint(i, n, s)
            }
            s.endGroup()
        }
        buildBoundingsLookup(e, t, s, i) {
            let n = new ds;
            n.beat = this.beat,
            n.visualBounds = new ss,
            n.visualBounds.x = t + this.x + this.onNotes.x,
            n.visualBounds.y = e.visualBounds.y,
            n.visualBounds.w = this.onNotes.width,
            n.visualBounds.h = e.visualBounds.h,
            n.realBounds = new ss,
            n.realBounds.x = t + this.x,
            n.realBounds.y = e.realBounds.y,
            n.realBounds.w = this.width,
            n.realBounds.h = e.realBounds.h,
            i && (n.visualBounds.x = t + this.x,
            n.realBounds.x = n.visualBounds.x),
            e.addBeat(n),
            this.renderer.settings.core.includeNoteBounds && this.onNotes.buildBoundingsLookup(n, t + this.x, s + this.y)
        }
    }
    Ri.GraceBeatPadding = 3;
    class Oi extends pi {
        constructor() {
            super(0, 0)
        }
        doLayout() {
            let e = 0;
            if (this.glyphs)
                for (let t = 0, s = this.glyphs.length; t < s; t++) {
                    let s = this.glyphs[t];
                    s.x = e,
                    s.renderer = this.renderer,
                    s.doLayout(),
                    e += s.width
                }
            this.width = e
        }
        noteLoop(e) {
            for (let t = this.container.beat.notes.length - 1; t >= 0; t--)
                e(this.container.beat.notes[t])
        }
    }
    class Ii extends Oi {
        constructor() {
            super(...arguments),
            this.centerX = 0
        }
        updateBeamingHelper() {}
        buildBoundingsLookup(e, t, s) {}
        getNoteX(e, t) {
            return 0
        }
        getNoteY(e, t) {
            return 0
        }
    }
    class Ai extends xi {
        constructor(e, t, s) {
            super(e, t),
            this._bands = [],
            this._bandLookup = new Map,
            this.sizingInfo = null,
            this._infos = s
        }
        updateSizes() {
            this.topOverflow = 0,
            this.bottomOverflow = 0,
            this.topPadding = 0,
            this.bottomPadding = 0,
            this.updateHeight(),
            super.updateSizes()
        }
        finalizeRenderer() {
            super.finalizeRenderer(),
            this.updateHeight()
        }
        updateHeight() {
            if (!this.sizingInfo)
                return;
            let e = 0;
            for (let t of this.sizingInfo.slots) {
                t.shared.y = e;
                for (let s of t.bands)
                    s.y = e,
                    s.height = t.shared.height;
                e += t.shared.height
            }
            this.height = e
        }
        applyLayoutingInfo() {
            if (!super.applyLayoutingInfo())
                return !1;
            if (this.index > 0) {
                let e = this.previousRenderer;
                this.sizingInfo = e.sizingInfo
            } else
                this.sizingInfo = new Ci;
            for (let e of this._bands)
                e.alignGlyphs(),
                e.isEmpty || this.sizingInfo.register(e);
            return this.updateHeight(),
            !0
        }
        scaleToWidth(e) {
            super.scaleToWidth(e);
            for (let e of this._bands)
                e.alignGlyphs()
        }
        createBeatGlyphs() {
            this._bands = [],
            this._bandLookup = new Map;
            for (let e of this.bar.voices)
                if (this.hasVoiceContainer(e))
                    for (let t of this._infos) {
                        let s = new ki(e,t);
                        s.renderer = this,
                        s.doLayout(),
                        this._bands.push(s),
                        this._bandLookup.set(e.index + "." + t.effectId, s)
                    }
            for (let e of this.bar.voices)
                this.hasVoiceContainer(e) && this.createVoiceGlyphs(e);
            for (let e of this._bands)
                e.isLinkedToPrevious && (this.isLinkedToPrevious = !0)
        }
        createVoiceGlyphs(e) {
            for (let t of e.beats) {
                let s = new Ri(t,this.getVoiceContainer(e));
                s.preNotes = new Oi,
                s.onNotes = new Ii,
                this.addBeatGlyph(s);
                for (let e of this._bands)
                    e.createGlyph(t)
            }
        }
        paint(e, t, s) {
            this.paintBackground(e, t, s);
            for (let i of this._bands)
                s.color = 0 === i.voice.index ? this.resources.mainGlyphColor : this.resources.secondaryGlyphColor,
                i.isEmpty || i.paint(e + this.x, t + this.y, s)
        }
        getBand(e, t) {
            let s = e.index + "." + t;
            return this._bandLookup.has(s) ? this._bandLookup.get(s) : null
        }
    }
    class Gi extends oi {
        constructor(e, t) {
            super(),
            this._infos = t,
            this._staffId = e,
            this.isInAccolade = !1,
            this.isRelevantForBoundsLookup = !1
        }
        get staffId() {
            return this._staffId
        }
        create(e, t) {
            return new Ai(e,t,this._infos.filter((t => e.settings.notation.isNotationElementVisible(t.notationElement))))
        }
    }
    class Hi extends Li {
        constructor(e, t, s) {
            super(e, t),
            this._endingsString = "",
            this._endings = [];
            for (let e = 0; e < Qt.MaxAlternateEndings; e++)
                0 != (s & 1 << e) && this._endings.push(e)
        }
        doLayout() {
            super.doLayout(),
            this.height = 5 * this.scale;
            let e = "";
            for (let t = 0, s = this._endings.length; t < s; t++)
                e += this._endings[t] + 1,
                e += ". ";
            this._endingsString = e
        }
        paint(e, t, s) {
            super.paint(e, t, s);
            let i = s.textBaseline;
            if (s.textBaseline = G.Top,
            this._endings.length > 0) {
                let i = this.renderer.resources;
                s.font = i.barNumberFont,
                s.moveTo(e + this.x, t + this.y + this.renderer.resources.barNumberFont.size),
                s.lineTo(e + this.x, t + this.y),
                s.lineTo(e + this.x + this.width, t + this.y),
                s.stroke(),
                s.fillText(this._endingsString, e + this.x + Hi.Padding * this.scale, t + (this.y + s.font.size / 2) * this.scale)
            }
            s.textBaseline = i
        }
    }
    Hi.Padding = 2;
    class Vi {
        get effectId() {
            return this.notationElement.toString()
        }
    }
    class Wi extends Vi {
        get notationElement() {
            return e.NotationElement.EffectAlternateEndings
        }
        get hideOnMultiTrack() {
            return !0
        }
        get canShareBand() {
            return !1
        }
        get sizingMode() {
            return di.FullBar
        }
        shouldCreateGlyph(e, t) {
            return 0 === t.voice.index && 0 === t.index && 0 !== t.voice.bar.masterBar.alternateEndings
        }
        createNewGlyph(e, t) {
            return new Hi(0,0,t.voice.bar.masterBar.alternateEndings)
        }
        canExpand(e, t) {
            return !0
        }
    }
    class zi extends Li {
        constructor(e, t, s, i, n=A.Left, r=null) {
            super(e, t),
            this.color = null,
            this.paddingTop = 0,
            this.paddingBottom = 0,
            this._lines = s.split("\n"),
            this.font = i,
            this.textAlign = n,
            this.color = r
        }
        doLayout() {
            super.doLayout(),
            this.height = this.font.size * this._lines.length + this.paddingTop + this.paddingBottom
        }
        paint(e, t, s) {
            let i = s.color;
            const n = s.textBaseline;
            s.textBaseline = G.Top,
            this.color && (s.color = this.color),
            s.font = this.font;
            let r = s.textAlign;
            s.textAlign = this.textAlign;
            let a = t + this.y;
            for (let t of this._lines)
                s.fillText(t, e + this.x, a),
                a += this.font.size;
            s.color = i,
            s.textAlign = r,
            s.textBaseline = n
        }
    }
    const Ui = ["1", "1#", "2", "3b", "3", "4", "5b", "5", "5#", "6", "7b", "7"]
      , Xi = ["C", "C#", "D", "Eb", "E", "F", "Gb", "G", "G#", "A", "Bb", "B"];
    function Yi(e) {
        return (e % 12 + 12) % 12
    }
    const Ji = new Map([["B#", 0], ["C", 0], ["C#", 1], ["Db", 1], ["D", 2], ["D#", 3], ["Eb", 3], ["E", 4], ["Fb", 4], ["E#", 5], ["F", 5], ["F#", 6], ["Gb", 6], ["G", 7], ["G#", 8], ["Ab", 8], ["A", 9], ["A#", 10], ["Bb", 10], ["B", 11], ["Cb", 11]]);
    function qi(e) {
        return e.split("/").map((e => e.replace(/^([b#])([A-G])(.*$)/, "$2$1$3"))).join("/")
    }
    function Qi(e, t) {
        let s = t && !!e.brushType;
        if (s)
            for (const t of e.notes)
                if (!$i(t)) {
                    s = !1;
                    break
                }
        return s
    }
    function $i(e) {
        const {fret: t, string: s} = e
          , i = e.beat.voice.bar.staff.tuning.length - s
          , n = sn(e.beat);
        return !!n && n.strings[i].fret === t
    }
    function Ki(e, t) {
        const s = Math.max(...e.strings.map(( ({fret: e}) => e)));
        return Math.max(0, s - t) + 1
    }
    function ji(e) {
        const t = new Map;
        for (let s = 0; s < e.strings.length; ++s) {
            const {fret: i, finger: n} = e.strings[s];
            if (i <= 0)
                continue;
            const r = JSON.stringify({
                finger: n,
                fret: i
            });
            t.has(r) ? t.get(r).push(s) : t.set(r, [s])
        }
        const s = [];
        return t.forEach(( (t, i) => {
            const {fret: n, finger: r} = JSON.parse(i)
              , a = t
              , o = [];
            for (const t of a) {
                const s = o[o.length - 1];
                if (s) {
                    if (e.strings.slice(s.max, t).every(( ({fret: e}) => e >= n || e < 0))) {
                        s.max = t;
                        continue
                    }
                }
                o.push({
                    min: t,
                    max: t
                })
            }
            s.push({
                fret: n,
                finger: r,
                barres: o
            })
        }
        )),
        s
    }
    function Zi(e, t) {
        return Xi[((Ji.get(e) + t) % 12 + 12) % 12]
    }
    function en(e, t, s) {
        var i;
        return (js(e) + t - js((i = s,
        Ks.get(i) || $.C)) + 12) % 12
    }
    function tn(e) {
        const [t,s] = e.split("/", 2)
          , i = t.match(/^([A-G][b#]?)(.*)$/);
        return i ? {
            tonic: i[1],
            chordType: i[2],
            bass: s
        } : null
    }
    function sn(e) {
        return e.chord ? e.chord : e.previousBeat && e.previousBeat.voice.bar.index === e.voice.bar.index ? sn(e.previousBeat) : null
    }
    class nn extends Vi {
        get notationElement() {
            return e.NotationElement.EffectChordNames
        }
        get hideOnMultiTrack() {
            return !1
        }
        get canShareBand() {
            return !0
        }
        get sizingMode() {
            return di.SingleOnBeat
        }
        shouldCreateGlyph(t, s) {
            const {inlineChordMode: i} = t.notation;
            return (i === e.InlineChordMode.Name || i === e.InlineChordMode.Number) && !!s.chord
        }
        createNewGlyph(t, s) {
            const {inlineChordMode: i} = t.settings.notation;
            let n = s.chord.name.replace(/@.*$/, "");
            const r = s.voice.bar.staff
              , a = r.showNumberedNotation ? function(e) {
                for (const t of e.tracks)
                    for (const e of t.staves)
                        if (e.showTablature && !e.showNumberedNotation && e.capo)
                            return e.capo;
                return 0
            }(r.track.score) : r.capo;
            if (i === e.InlineChordMode.Number || t.settings.display.staveProfile === e.StaveProfile.Numbered)
                n = function(e, t, s) {
                    const i = tn(e);
                    if (!i)
                        return e;
                    let n = Ui[en(t, s, i.tonic)] + i.chordType;
                    return i.bass && (n += "/" + Ui[en(t, s, i.bass)]),
                    n
                }(n, s.voice.bar.masterBar.keySignature, a);
            else if (i === e.InlineChordMode.Name && [e.StaveProfile.Lead, e.StaveProfile.Score].includes(t.settings.display.staveProfile)) {
                const e = a - s.voice.bar.staff.transpositionPitch;
                e && (n = function(e, t) {
                    const s = tn(e);
                    if (!s)
                        return e;
                    let i = Zi(s.tonic, t) + s.chordType;
                    return Ji.has(s.bass) && (i += "/" + Zi(s.bass, t)),
                    i
                }(n, e))
            }
            return new zi(0,0,n,t.resources.effectFont,A.Center,t.resources.chordTextColor)
        }
        canExpand(e, t) {
            return !1
        }
    }
    class rn extends Li {
        constructor(e, t, s) {
            super(e, t),
            this._textRow = 0,
            this._firstFret = 1,
            this._firstFretSpacing = 0,
            this._chord = s,
            this._firstFret = Ki(s, rn.Frets)
        }
        doLayout() {
            super.doLayout();
            const e = this.scale;
            let t = this.renderer.resources;
            this._textRow = (t.effectFont.size + 2) * e,
            this._firstFret > 1 ? this._firstFretSpacing = rn.FretSpacing * e : this._firstFretSpacing = 0,
            this.height = this._textRow + rn.Frets * rn.FretSpacing * e + rn.BottomPadding * e,
            this.width = this._firstFretSpacing + (this._chord.strings.length - 1) * rn.StringSpacing * e
        }
        paint(e, t, s) {
            e += this.x - 10 * this.scale;
            let i = rn.StringSpacing * this.scale
              , n = rn.FretSpacing * this.scale
              , r = this.renderer.resources
              , a = rn.CircleRadius * this.scale;
            const o = rn.BarreHeight * this.scale
              , h = i * (this._chord.strings.length - 1) + rn.Stroke;
            e += i / 2;
            let l = s.textAlign
              , c = s.textBaseline
              , d = s.color;
            if (s.font = r.effectFont,
            s.textAlign = A.Center,
            s.textBaseline = G.Top,
            s.color = r.chordTextColor,
            this._chord.showName) {
                const i = this._chord.name.replace(/@.*$/, "");
                s.fillText(i, e + h / 2, t),
                t += this._textRow
            }
            s.color = d,
            s.font = r.fretboardNumberFont;
            for (let n = 0; n < this._chord.strings.length; n++) {
                let r = e + n * i
                  , a = t + 2 * this.scale;
                this._chord.strings[this._chord.strings.length - n - 1].fret < 0 && s.fillMusicFontSymbol(r, a, this.scale, I.FretboardX, !0)
            }
            for (let r = 0; r < this._chord.strings.length; r++) {
                let a = e + r * i;
                s.fillRect(a, t, rn.Stroke * this.scale, n * rn.Frets)
            }
            for (let i = 0; i <= rn.Frets; i++) {
                let r = t + i * n;
                s.fillRect(e, r, h, rn.Stroke * this.scale)
            }
            this._firstFret > 1 && (s.textAlign = A.Left,
            s.fillText(this._firstFret.toString(), e - this._firstFretSpacing, t + n / 2),
            s.textAlign = A.Center);
            const u = ji(this._chord);
            for (const {fret: r, barres: h} of u)
                for (const l of h) {
                    const h = t + (r - this._firstFret + .5) * n
                      , c = e + (this._chord.strings.length - (l.min + l.max) / 2 - 1) * i;
                    if (l.max !== l.min) {
                        let t = e + (this._chord.strings.length - l.max - 1) * i
                          , n = e + (this._chord.strings.length - l.min - 1) * i;
                        s.fillCircle(t, h, o / 2),
                        s.fillCircle(n, h, o / 2),
                        s.fillRect(t, h - o / 2, n - t, o)
                    } else
                        s.fillCircle(c, h, a)
                }
            s.textAlign = l,
            s.textBaseline = c
        }
    }
    rn.BottomPadding = 5,
    rn.Frets = 4,
    rn.CircleRadius = 2.5,
    rn.BarreHeight = 3,
    rn.StringSpacing = 6,
    rn.FretSpacing = 7,
    rn.Stroke = .5;
    class an extends Vi {
        get notationElement() {
            return e.NotationElement.EffectChordDiagram
        }
        get hideOnMultiTrack() {
            return !1
        }
        get canShareBand() {
            return !1
        }
        get sizingMode() {
            return di.SingleOnBeat
        }
        shouldCreateGlyph(t, s) {
            return t.notation.inlineChordMode === e.InlineChordMode.Diagram && s.hasChord
        }
        createNewGlyph(e, t) {
            return t.chord ? new rn(0,0,t.chord) : new zi(0,0,t.chordId.replace(/@.*$/, ""),e.resources.effectFont,A.Center,e.resources.chordTextColor)
        }
        canExpand(e, t) {
            return !1
        }
    }
    const on = new Map([[",", "，"], [".", "。"], [":", "："], [";", "；"], ["?", "？"], ["!", "！"]])
      , hn = new Map([["，", ","], ["。", "."], ["：", ":"], ["；", ";"], ["？", "?"], ["！", "!"]]);
    class ln extends Li {
        constructor(e, t, s, i, n=A.Center, r=!1) {
            super(e, t),
            this._lines = s,
            this.font = i,
            this.textAlign = n,
            this._showChordMark = r
        }
        doLayout() {
            super.doLayout(),
            this.height = this.font.size * this._lines.length
        }
        paint(e, t, s) {
            s.font = this.font;
            let i = s.textAlign;
            s.textAlign = this.textAlign;
            for (let i = 0; i < this._lines.length; i++)
                if (this._lines[i]) {
                    const n = this._lines[i]
                      , r = n.match(/(^[^、，：；。！？,:;.!?]*)([、，：；。！？,:;.!?]*$)/);
                    if (s.fillText(r ? r[1] : n, e + this.x, t + this.y + i * this.font.size),
                    r) {
                        const n = r[1].charAt(r[1].length - 1);
                        let a = r[2];
                        a = ti(n) ? cn(a) : dn(a);
                        const o = s.textAlign;
                        s.textAlign = A.Left,
                        s.fillText(a, e + this.x + s.measureText(r[1]) / 2, t + this.y + i * this.font.size),
                        s.textAlign = o
                    }
                }
            s.textAlign = i,
            this._showChordMark && (s.beginPath(),
            s.moveTo(e + this.x - this.font.size / 2 * this.scale, t + this.height - 5 * this.scale),
            s.lineTo(e + this.x + this.font.size / 2 * this.scale, t + this.height - 5 * this.scale),
            s.stroke())
        }
    }
    function cn(e) {
        let t = "";
        for (let s = 0; s < e.length; ++s)
            t += on.get(e[s]) || e[s];
        return t
    }
    function dn(e) {
        let t = "";
        for (let s = 0; s < e.length; ++s)
            t += hn.get(e[s]) || e[s];
        return t
    }
    class un extends Vi {
        constructor(e=!1) {
            super(),
            this._chordMarkEnabled = !1,
            this._chordMarkEnabled = e
        }
        get notationElement() {
            return e.NotationElement.EffectLyrics
        }
        get hideOnMultiTrack() {
            return !1
        }
        get canShareBand() {
            return !1
        }
        get sizingMode() {
            return di.SingleOnBeat
        }
        shouldCreateGlyph(e, t) {
            return !!t.lyrics
        }
        createNewGlyph(e, t) {
            return new ln(0,0,t.lyrics || [""],e.resources.lyricsFont,A.Center,this._chordMarkEnabled && t.hasChord)
        }
        canExpand(e, t) {
            return !0
        }
    }
    class pn extends Vi {
        get notationElement() {
            return e.NotationElement.EffectText
        }
        get hideOnMultiTrack() {
            return !1
        }
        get canShareBand() {
            return !1
        }
        get sizingMode() {
            return di.SingleOnBeat
        }
        shouldCreateGlyph(e, t) {
            return !!t.text
        }
        createNewGlyph(e, t) {
            const s = e.resources.effectFont
              , i = e.scale
              , n = new zi(0,i,t.text,s,A.Left);
            return n.paddingTop = i,
            n.paddingBottom = i,
            n
        }
        canExpand(e, t) {
            return !0
        }
    }
    class gn extends Li {
        constructor(e, t, s) {
            super(e, t),
            this._textRow = 0,
            this._fretRow = 0,
            this._firstFret = 1,
            this._firstFretSpacing = 0,
            this._chord = s,
            this._firstFret = Ki(s, gn.Frets)
        }
        doLayout() {
            super.doLayout();
            const e = this.scale;
            let t = this.renderer.resources;
            this._textRow = 1.5 * t.effectFont.size * e,
            this._fretRow = 1.5 * t.effectFont.size * e,
            this._firstFret > 1 ? this._firstFretSpacing = gn.FretSpacing * e : this._firstFretSpacing = 0,
            this.height = this._textRow + this._fretRow + (gn.Frets - 1) * gn.FretSpacing * e + 2 * gn.Padding * e,
            this.width = this._firstFretSpacing + (this._chord.strings.length - 1) * gn.StringSpacing * e + 2 * gn.Padding * e
        }
        paint(e, t, s) {
            e += this.x + gn.Padding * this.scale + this._firstFretSpacing,
            t += this.y;
            let i = this.width - 2 * gn.Padding * this.scale + this.scale - this._firstFretSpacing
              , n = gn.StringSpacing * this.scale
              , r = gn.FretSpacing * this.scale
              , a = this.renderer.resources
              , o = gn.CircleRadius * this.scale;
            const h = gn.BarreHeight * this.scale;
            let l = s.textAlign
              , c = s.textBaseline;
            if (s.font = a.effectFont,
            s.textAlign = A.Center,
            s.textBaseline = G.Top,
            this._chord.showName) {
                const i = this._chord.name.replace(/@.*$/, "");
                s.fillText(i, e + this.width / 2, t + a.effectFont.size / 2)
            }
            t += this._textRow,
            e += n / 2,
            s.font = a.fretboardNumberFont,
            s.textBaseline = G.Middle;
            for (let i = 0; i < this._chord.strings.length; i++) {
                let r = e + i * n
                  , a = t
                  , {fret: o} = this._chord.strings[this._chord.strings.length - i - 1];
                o < 0 && s.fillMusicFontSymbol(r, a, this.scale, I.FretboardX, !0)
            }
            let d = s.color;
            s.color = this.renderer.resources.mainGlyphColor;
            for (let i = 0; i < this._chord.strings.length; i++) {
                let a = e + i * n;
                s.fillRect(a, t, gn.StringStroke, r * gn.Frets + this.scale)
            }
            for (let n = 0; n <= gn.Frets; n++) {
                let a = t + n * r;
                s.fillRect(e, a, i, gn.StringStroke)
            }
            s.color = d,
            this._firstFret > 1 && (s.textAlign = A.Left,
            s.fillText(this._firstFret.toString(), e - this._firstFretSpacing, t + r / 2),
            s.textAlign = A.Center);
            const u = ji(this._chord);
            for (const {fret: i, finger: l, barres: c} of u)
                for (const u of c) {
                    const c = t + (i - this._firstFret + .5) * r
                      , p = e + (this._chord.strings.length - (u.min + u.max) / 2 - 1) * n;
                    if (d = s.color,
                    s.color = a.mainGlyphColor,
                    u.max !== u.min) {
                        let t = e + (this._chord.strings.length - u.max - 1) * n
                          , i = e + (this._chord.strings.length - u.min - 1) * n;
                        s.fillCircle(t, c, h / 2),
                        s.fillCircle(i, c, h / 2),
                        s.fillRect(t, c - h / 2, i - t, h)
                    }
                    if (s.fillCircle(p, c, o),
                    s.color = a.inverseTextColor,
                    l >= E.Thumb) {
                        const e = s.font
                          , t = l === E.Thumb ? "T" : String(l);
                        s.font = a.chordFingeringFont,
                        s.fillText(t, p, c),
                        s.font = e
                    }
                    s.color = d
                }
            s.textAlign = l,
            s.textBaseline = c
        }
    }
    gn.Padding = 5,
    gn.Frets = 4,
    gn.CircleRadius = 5,
    gn.BarreHeight = 6,
    gn.StringSpacing = 10,
    gn.FretSpacing = 12,
    gn.StringStroke = .5;
    class fn extends pi {
        constructor(e, t, s=A.Center) {
            super(e, t),
            this._glyphWidth = 0,
            this.glyphs = [],
            this._align = s
        }
        doLayout() {
            let e = 0;
            switch (this._align) {
            case A.Left:
                e = 0;
                break;
            case A.Center:
                e = (this.width - this._glyphWidth) / 2;
                break;
            case A.Right:
                e = this.width - this._glyphWidth
            }
            for (let t of this.glyphs)
                t.x = e,
                e += t.width
        }
        addGlyphToRow(e) {
            this.glyphs.push(e),
            this._glyphWidth += e.width,
            e.height > this.height && (this.height = e.height)
        }
    }
    class mn extends pi {
        constructor(e, t, s=A.Center) {
            super(e, t),
            this._rows = [],
            this.height = 0,
            this.glyphs = [],
            this._align = s
        }
        doLayout() {
            let e = 0
              , t = 0
              , s = 2 * mn.Padding * this.scale;
            this._rows = [];
            let i = new fn(e,t,this._align);
            i.width = this.width;
            for (let n of this.glyphs)
                e + n.width < this.width ? (i.addGlyphToRow(n),
                e += n.width) : (i.isEmpty || (i.doLayout(),
                this._rows.push(i),
                t += i.height + s),
                e = 0,
                i = new fn(e,t,this._align),
                i.width = this.width,
                i.addGlyphToRow(n),
                e += n.width);
            i.isEmpty || (i.doLayout(),
            this._rows.push(i),
            t += i.height + s),
            this.height = t + s
        }
        paint(e, t, s) {
            for (let i of this._rows)
                i.paint(e + this.x, t + this.y + mn.Padding * this.scale, s)
        }
    }
    mn.Padding = 3;
    class yn extends mn {
        constructor(e, t, s=!1) {
            super(e, t, s ? A.Left : A.Center)
        }
        addChord(e) {
            if (e.strings.length > 0) {
                let t = new gn(0,0,e);
                t.renderer = this.renderer,
                t.doLayout(),
                this.glyphs.push(t)
            }
        }
    }
    class bn {
        constructor(e, t, s) {
            this._sharedLayoutData = new Map,
            this.barRenderers = [],
            this.x = 0,
            this.y = 0,
            this.height = 0,
            this.index = 0,
            this.trackIndex = 0,
            this.staveTop = 0,
            this.topSpacing = 0,
            this.bottomSpacing = 0,
            this.staveBottom = 0,
            this.isFirstInAccolade = !1,
            this.isLastInAccolade = !1,
            this._factory = s,
            this.trackIndex = e,
            this.modelStaff = t
        }
        get staveId() {
            return this._factory.staffId
        }
        getSharedLayoutData(e, t) {
            return this._sharedLayoutData.has(e) ? this._sharedLayoutData.get(e) : t
        }
        setSharedLayoutData(e, t) {
            this._sharedLayoutData.set(e, t)
        }
        get isInAccolade() {
            return this._factory.isInAccolade
        }
        get isRelevantForBoundsLookup() {
            return this._factory.isRelevantForBoundsLookup
        }
        registerStaffTop(e) {
            this.staveTop = e
        }
        registerStaffBottom(e) {
            this.staveBottom = e
        }
        addBarRenderer(e) {
            e.staffRenderer = this,
            e.index = this.barRenderers.length,
            e.reLayout(),
            this.barRenderers.push(e),
            this.staveGroup.layout.registerBarRenderer(this.staveId, e)
        }
        addBar(e, t) {
            let s;
            return s = e ? this._factory.create(this.staveGroup.layout.renderer, e) : new xi(this.staveGroup.layout.renderer,e),
            s.staffRenderer = this,
            s.index = this.barRenderers.length,
            s.layoutingInfo = t,
            s.doLayout(),
            s.registerLayoutingInfo(),
            this.barRenderers.push(s),
            e && this.staveGroup.layout.registerBarRenderer(this.staveId, s),
            s
        }
        revertLastBar() {
            let e = this.barRenderers[this.barRenderers.length - 1];
            return this.barRenderers.splice(this.barRenderers.length - 1, 1),
            this.staveGroup.layout.unregisterBarRenderer(this.staveId, e),
            e
        }
        scaleToWidth(e) {
            this._sharedLayoutData = new Map;
            let t = (e - this.staveGroup.width) / this.barRenderers.length;
            for (let e = 0, s = this.barRenderers.length; e < s; e++)
                this.barRenderers[e].scaleToWidth(this.barRenderers[e].width + t)
        }
        get topOverflow() {
            let e = 0;
            for (let t = 0, s = this.barRenderers.length; t < s; t++) {
                let s = this.barRenderers[t];
                s.topOverflow > e && (e = s.topOverflow)
            }
            return e
        }
        get bottomOverflow() {
            let e = 0;
            for (let t = 0, s = this.barRenderers.length; t < s; t++) {
                let s = this.barRenderers[t];
                s.bottomOverflow > e && (e = s.bottomOverflow)
            }
            return e
        }
        finalizeStaff() {
            let e = 0;
            this.height = 0;
            let t = this.topOverflow
              , s = this.bottomOverflow;
            for (let s = 0; s < this.barRenderers.length; s++)
                this.barRenderers[s].x = e,
                this.barRenderers[s].y = this.topSpacing + t,
                this.height = Math.max(this.height, this.barRenderers[s].height),
                this.barRenderers[s].finalizeRenderer(),
                e += this.barRenderers[s].width;
            this.height > 0 && (this.height += this.topSpacing + t + s + this.bottomSpacing)
        }
        paint(e, t, s, i, n) {
            if (0 !== this.height && 0 !== n)
                for (let r = i, a = Math.min(i + n, this.barRenderers.length); r < a; r++)
                    this.barRenderers[r].paint(e + this.x, t + this.y, s)
        }
    }
    class Sn {
        constructor() {
            this.timePosition = 0,
            this.longestDuration = 0,
            this.smallestDuration = 0,
            this.force = 0,
            this.springConstant = 0,
            this.preBeatWidth = 0,
            this.graceBeatWidth = 0,
            this.postSpringWidth = 0,
            this.allDurations = new Set
        }
        get springWidth() {
            return this.preSpringWidth + this.postSpringWidth
        }
        get preSpringWidth() {
            return this.preBeatWidth + this.graceBeatWidth
        }
    }
    class wn {
        constructor() {
            this._timeSortedSprings = [],
            this._xMin = 0,
            this._minTime = -1,
            this._onTimePositionsForce = 0,
            this._onTimePositions = new Map,
            this._incompleteGraceRodsWidth = 0,
            this.version = 0,
            this.preBeatSizes = new Map,
            this.onBeatSizes = new Map,
            this.onBeatCenterX = new Map,
            this.preBeatSize = 0,
            this.postBeatSize = 0,
            this.voiceSize = 0,
            this.minStretchForce = 0,
            this.totalSpringConstant = 0,
            this.incompleteGraceRods = new Map,
            this.allGraceRods = new Map,
            this.springs = new Map
        }
        updateVoiceSize(e) {
            e > this.voiceSize && (this.voiceSize = e,
            this.version++)
        }
        setPreBeatSize(e, t) {
            (!this.preBeatSizes.has(e.index) || this.preBeatSizes.get(e.index) < t) && (this.preBeatSizes.set(e.index, t),
            this.version++)
        }
        getPreBeatSize(e) {
            return this.preBeatSizes.has(e.index) ? this.preBeatSizes.get(e.index) : 0
        }
        setOnBeatSize(e, t) {
            (!this.onBeatSizes.has(e.index) || this.onBeatSizes.get(e.index) < t) && (this.onBeatSizes.set(e.index, t),
            this.version++)
        }
        getOnBeatSize(e) {
            return this.onBeatSizes.has(e.index) ? this.onBeatSizes.get(e.index) : 0
        }
        getBeatCenterX(e) {
            return this.onBeatCenterX.has(e.index) ? this.onBeatCenterX.get(e.index) : 0
        }
        setBeatCenterX(e, t) {
            (!this.onBeatCenterX.has(e.index) || this.onBeatCenterX.get(e.index) < t) && (this.onBeatCenterX.set(e.index, t),
            this.version++)
        }
        updateMinStretchForce(e) {
            this.minStretchForce < e && (this.minStretchForce = e)
        }
        addSpring(e, t, s, i, n) {
            let r;
            if (this.version++,
            this.springs.has(e))
                r = this.springs.get(e),
                r.postSpringWidth < n && (r.postSpringWidth = n),
                r.graceBeatWidth < s && (r.graceBeatWidth = s),
                r.preBeatWidth < i && (r.preBeatWidth = i),
                t < r.smallestDuration && (r.smallestDuration = t),
                t > r.longestDuration && (r.longestDuration = t),
                r.allDurations.add(t);
            else {
                if (r = new Sn,
                r.timePosition = e,
                r.allDurations.add(t),
                this._timeSortedSprings.length > 0) {
                    let e = this._timeSortedSprings[this._timeSortedSprings.length - 1];
                    for (const t of e.allDurations)
                        e.timePosition
                }
                r.longestDuration = t,
                r.postSpringWidth = n,
                r.graceBeatWidth = s,
                r.preBeatWidth = i,
                this.springs.set(e, r);
                let a = this._timeSortedSprings
                  , o = a.length - 1;
                for (; o > 0 && a[o].timePosition > e; )
                    o--;
                this._timeSortedSprings.splice(o + 1, 0, r)
            }
            return (-1 === this._minTime || this._minTime > e) && (this._minTime = e),
            r
        }
        addBeatSpring(e, t, s) {
            let i = e.absoluteDisplayStart;
            if (e.graceType !== p.None) {
                const n = e.graceGroup.id;
                this.allGraceRods.has(n) || this.allGraceRods.set(n, new Array(e.graceGroup.beats.length)),
                e.graceGroup.isComplete || this.incompleteGraceRods.has(n) || this.incompleteGraceRods.set(n, new Array(e.graceGroup.beats.length));
                let r = this.allGraceRods.get(n)[e.graceIndex];
                if (r)
                    r.postSpringWidth < s && (r.postSpringWidth = s),
                    r.preBeatWidth < t && (r.preBeatWidth = t);
                else {
                    const r = new Sn;
                    r.timePosition = i,
                    r.postSpringWidth = s,
                    r.preBeatWidth = t,
                    e.graceGroup.isComplete || (this.incompleteGraceRods.get(n)[e.graceIndex] = r),
                    this.allGraceRods.get(n)[e.graceIndex] = r
                }
            } else {
                let n = 0;
                if (e.graceGroup && this.allGraceRods.has(e.graceGroup.id))
                    for (const t of this.allGraceRods.get(e.graceGroup.id))
                        n += t.springWidth;
                this.addSpring(i, e.displayDuration, n, t, s)
            }
        }
        finish() {
            for (const [e,t] of this.allGraceRods) {
                let s = 0;
                if (this.incompleteGraceRods.has(e))
                    for (const e of t)
                        s += e.preBeatWidth,
                        e.graceBeatWidth = s,
                        s += e.postSpringWidth;
                else
                    for (let e = t.length - 1; e >= 0; e--)
                        t[e].graceBeatWidth = s,
                        s -= t[e].preBeatWidth + t[e].postSpringWidth
            }
            this._incompleteGraceRodsWidth = 0;
            for (const e of this.incompleteGraceRods.values())
                for (const t of e)
                    this._incompleteGraceRodsWidth += t.preBeatWidth + t.postSpringWidth;
            this.calculateSpringConstants(),
            this.version++
        }
        calculateSpringConstants() {
            this._xMin = 0;
            let e = this.springs;
            for (const t of e.values())
                t.springWidth < this._xMin && (this._xMin = t.springWidth);
            let t = 0
              , s = this._timeSortedSprings;
            if (0 === s.length)
                return this.totalSpringConstant = -1,
                void (this.minStretchForce = -1);
            for (let e = 0; e < s.length; e++) {
                let i = s[e]
                  , n = 0;
                if (e === s.length - 1)
                    n = i.longestDuration;
                else {
                    let t = s[e + 1];
                    n = Math.abs(t.timePosition - i.timePosition)
                }
                i.springConstant = this.calculateSpringConstant(i, n),
                t += 1 / i.springConstant
            }
            this.totalSpringConstant = 1 / t,
            this.minStretchForce = 0;
            for (let e = 0; e < s.length; e++) {
                let t = s[e]
                  , i = 0;
                if (e === s.length - 1)
                    i = t.postSpringWidth;
                else {
                    let n = s[e + 1];
                    i = t.postSpringWidth + n.preSpringWidth
                }
                0 === e && (i += t.preSpringWidth);
                let n = i * t.springConstant;
                this.updateMinStretchForce(n)
            }
        }
        calculateSpringConstant(e, t) {
            return t <= 0 && (t = Z.toTicks(d.SixtyFourth)),
            0 === e.smallestDuration && (e.smallestDuration = t),
            e.smallestDuration / t * (1 / ((1 + .85 * Math.log2(t / wn.MinDuration)) * wn.MinDurationWidth))
        }
        spaceToForce(e) {
            return -1 !== this.totalSpringConstant ? (this._timeSortedSprings.length > 0 && (e -= this._timeSortedSprings[0].preSpringWidth),
            e -= this._incompleteGraceRodsWidth,
            Math.max(e, 0) * this.totalSpringConstant) : -1
        }
        calculateVoiceWidth(e) {
            let t = 0;
            return -1 !== this.totalSpringConstant && (t = this.calculateWidth(e, this.totalSpringConstant)),
            this._timeSortedSprings.length > 0 && (t += this._timeSortedSprings[0].preSpringWidth),
            t += this._incompleteGraceRodsWidth,
            t
        }
        calculateWidth(e, t) {
            return e / t
        }
        buildOnTimePositions(e) {
            if (-1 === this.totalSpringConstant)
                return new Map;
            if (ht.isAlmostEqualTo(this._onTimePositionsForce, e) && this._onTimePositions)
                return this._onTimePositions;
            this._onTimePositionsForce = e;
            let t = new Map;
            this._onTimePositions = t;
            let s = this._timeSortedSprings;
            if (0 === s.length)
                return t;
            let i = s[0].preSpringWidth;
            for (let n = 0; n < s.length; n++)
                t.set(s[n].timePosition, i),
                i += this.calculateWidth(e, s[n].springConstant);
            return t
        }
    }
    wn.MinDuration = 30,
    wn.MinDurationWidth = 7;
    class _n {
        constructor(e) {
            this.width = 0,
            this.isLinkedToPrevious = !1,
            this.canWrap = !0,
            this.barRenderers = [],
            this.masterBar = e,
            this.layoutingInfo = new wn
        }
        addBarRenderer(e) {
            this.barRenderers.push(e),
            e.isLinkedToPrevious && (this.isLinkedToPrevious = !0),
            e.canWrap || (this.canWrap = !1)
        }
    }
    class Bn {
        constructor(e) {
            this.staffRenderers = [],
            this.stavesRelevantForBoundsLookup = [],
            this.firstStaffInAccolade = null,
            this.lastStaffInAccolade = null,
            this.track = e
        }
        addStaff(e) {
            this.staffRenderers.push(e),
            e.isRelevantForBoundsLookup && this.stavesRelevantForBoundsLookup.push(e),
            e.isInAccolade && (this.firstStaffInAccolade || (this.firstStaffInAccolade = e),
            this.lastStaffInAccolade = e)
        }
    }
    class Tn {
        constructor() {
            this._trackGroups = [],
            this._staffRenderers = [],
            this._firstStaffInAccolade = null,
            this._lastStaffInAccolade = null,
            this._accoladeSpacingCalculated = !1,
            this.x = 0,
            this.y = 0,
            this.index = 0,
            this.accoladeSpacing = 0,
            this.isFull = !1,
            this.width = 0,
            this.isLast = !1,
            this.masterBarRenderers = []
        }
        get firstBarIndex() {
            return this.masterBarRenderers[0].masterBar.index
        }
        get lastBarIndex() {
            return this.masterBarRenderers[this.masterBarRenderers.length - 1].masterBar.index
        }
        addMasterBarRenderer(e, t) {
            if (0 === e.length)
                return;
            this.masterBarRenderers.push(t),
            this.calculateAccoladeSpacing(e),
            t.layoutingInfo.preBeatSize = 0;
            let s = 0;
            const i = t.barRenderers;
            for (const e of this._trackGroups)
                for (const t of e.staffRenderers)
                    t.addBarRenderer(i[s++]);
            this.updateWidth()
        }
        addMasterBar(e, t) {
            if (0 === e.length)
                return null;
            const s = new _n(e[0].score.masterBars[t]);
            this.masterBarRenderers.push(s),
            this.calculateAccoladeSpacing(e);
            for (const e of this._trackGroups)
                for (const i of e.staffRenderers) {
                    const n = e.track.staves[i.modelStaff.index].bars[t]
                      , r = i.addBar(n, s.layoutingInfo);
                    s.addBarRenderer(r)
                }
            return s.layoutingInfo.finish(),
            s.width = this.updateWidth(),
            s
        }
        revertLastBar() {
            if (this.masterBarRenderers.length > 1) {
                let e = this.masterBarRenderers[this.masterBarRenderers.length - 1];
                this.masterBarRenderers.splice(this.masterBarRenderers.length - 1, 1);
                let t = 0;
                for (const e of this._staffRenderers) {
                    const s = e.revertLastBar();
                    t = Math.max(t, s.width)
                }
                return this.width -= t,
                e
            }
            return null
        }
        updateWidth() {
            let e = 0;
            for (const t of this._staffRenderers) {
                const s = t.barRenderers[t.barRenderers.length - 1];
                s.applyLayoutingInfo(),
                e = Math.max(e, s.width)
            }
            return this.width += e,
            e
        }
        calculateAccoladeSpacing(t) {
            if (!this._accoladeSpacingCalculated && 0 === this.index)
                if (this._accoladeSpacingCalculated = !0,
                this.layout.renderer.settings.notation.isNotationElementVisible(e.NotationElement.TrackNames)) {
                    let e = this.layout.renderer.canvas
                      , s = this.layout.renderer.settings.display.resources.effectFont;
                    e.font = s;
                    for (let s of t)
                        this.accoladeSpacing = Math.ceil(Math.max(this.accoladeSpacing, e.measureText(s.shortName)));
                    this.accoladeSpacing *= this.layout.scale,
                    this.accoladeSpacing += 2 * Tn.AccoladeLabelSpacing * this.layout.scale,
                    this.width += this.accoladeSpacing
                } else
                    this.accoladeSpacing = 0
        }
        getStaveTrackGroup(e) {
            for (let t = 0, s = this._trackGroups.length; t < s; t++) {
                let s = this._trackGroups[t];
                if (s.track === e)
                    return s
            }
            return null
        }
        addStaff(e, t) {
            let s = this.getStaveTrackGroup(e);
            s || (s = new Bn(e),
            this._trackGroups.push(s)),
            t.staveTrackGroup = s,
            t.staveGroup = this,
            t.index = this._staffRenderers.length,
            this._staffRenderers.push(t),
            s.addStaff(t),
            t.isInAccolade && (this._firstStaffInAccolade || (this._firstStaffInAccolade = t,
            t.isFirstInAccolade = !0),
            this._lastStaffInAccolade && (this._lastStaffInAccolade.isLastInAccolade = !1),
            this._lastStaffInAccolade = t,
            t.isLastInAccolade = !0)
        }
        get height() {
            const e = this._staffRenderers[this._staffRenderers.length - 1];
            return e.y + e.height + this.layout.renderer.settings.display.staveGroupVerticalPadding * this.layout.scale * 2
        }
        scaleToWidth(e) {
            for (let t = 0, s = this._staffRenderers.length; t < s; t++)
                this._staffRenderers[t].scaleToWidth(e);
            this.width = e
        }
        paint(e, t, s) {
            this.paintPartial(e + this.x, t + this.y, s, 0, this.masterBarRenderers.length)
        }
        paintPartial(t, s, i, n, r) {
            this.buildBoundingsLookup(t, s);
            const a = s + this.layout.renderer.settings.display.staveGroupVerticalPadding * this.layout.scale;
            for (const e of this._staffRenderers)
                e.paint(t, a, i, n, r);
            let o = this.layout.renderer.settings.display.resources;
            if (this._trackGroups.length > 0 && 0 === n) {
                if (i.color = o.barSeparatorColor,
                this._firstStaffInAccolade && this._lastStaffInAccolade) {
                    let e = a + this._firstStaffInAccolade.y + this._firstStaffInAccolade.staveTop + this._firstStaffInAccolade.topSpacing + this._firstStaffInAccolade.topOverflow
                      , s = a + this._lastStaffInAccolade.y + this._lastStaffInAccolade.topSpacing + this._lastStaffInAccolade.topOverflow + this._lastStaffInAccolade.staveBottom
                      , n = t + this._firstStaffInAccolade.x;
                    i.beginPath(),
                    i.moveTo(n, e),
                    i.lineTo(n, s),
                    i.stroke()
                }
                i.font = o.effectFont;
                for (let s = 0, n = this._trackGroups.length; s < n; s++) {
                    let n = this._trackGroups[s];
                    if (!(this.layout.renderer.settings.display.avoidAccolade || n.track.staves.length <= 1) && (n.firstStaffInAccolade && n.lastStaffInAccolade)) {
                        let s = a + n.firstStaffInAccolade.y + n.firstStaffInAccolade.staveTop + n.firstStaffInAccolade.topSpacing + n.firstStaffInAccolade.topOverflow
                          , r = a + n.lastStaffInAccolade.y + n.lastStaffInAccolade.topSpacing + n.lastStaffInAccolade.topOverflow + n.lastStaffInAccolade.staveBottom
                          , o = t + n.firstStaffInAccolade.x
                          , h = 3 * this.layout.renderer.settings.display.scale
                          , l = h
                          , c = s - 4 * h
                          , d = r + 4 * h;
                        0 === this.index && this.layout.renderer.settings.notation.isNotationElementVisible(e.NotationElement.TrackNames) && i.fillText(n.track.shortName, t + Tn.AccoladeLabelSpacing * this.layout.scale, s),
                        i.fillRect(o - l - h, c, h, d - c);
                        let u = o - l - h
                          , p = o + 2 * h;
                        i.beginPath(),
                        i.moveTo(u, c),
                        i.bezierCurveTo(u, c, u, c, p, c - h),
                        i.bezierCurveTo(o, c + h, u, c + h, u, c + h),
                        i.closePath(),
                        i.fill(),
                        i.beginPath(),
                        i.moveTo(u, d),
                        i.bezierCurveTo(u, d, o, d, p, d + h),
                        i.bezierCurveTo(o, d - h, u, d - h, u, d - h),
                        i.closePath(),
                        i.fill()
                    }
                }
            }
        }
        finalizeGroup() {
            let e = 0;
            for (let t of this._staffRenderers)
                t.x = this.accoladeSpacing,
                t.y = e,
                t.finalizeStaff(),
                e += t.height
        }
        buildBoundingsLookup(e, t) {
            if (this.layout.renderer.boundsLookup.isFinished)
                return;
            if (!this._firstStaffInAccolade || !this._lastStaffInAccolade)
                return;
            const s = this.layout.renderer.settings.display.staveGroupVerticalPadding * this.layout.scale;
            let i = this._staffRenderers[this._staffRenderers.length - 1]
              , n = t + this.y + this._firstStaffInAccolade.y
              , r = t + this.y + this._lastStaffInAccolade.y + this._lastStaffInAccolade.height + s
              , a = t + this.y + this._staffRenderers[0].y
              , o = t + this.y + i.y + i.height + 2 * s
              , h = t + this.y + this._firstStaffInAccolade.y + this._firstStaffInAccolade.topSpacing + this._firstStaffInAccolade.topOverflow + (this._firstStaffInAccolade.barRenderers.length > 0 ? this._firstStaffInAccolade.barRenderers[0].topPadding : 0)
              , l = r - n
              , c = t + this.y + i.y + i.height - i.bottomSpacing - i.bottomOverflow - (i.barRenderers.length > 0 ? i.barRenderers[0].bottomPadding : 0) - h
              , d = o - a
              , u = this.x + this._firstStaffInAccolade.x
              , p = new gs;
            p.visualBounds = new ss,
            p.visualBounds.x = e,
            p.visualBounds.y = t + this.y,
            p.visualBounds.w = this.width,
            p.visualBounds.h = this.height,
            p.realBounds = new ss,
            p.realBounds.x = e,
            p.realBounds.y = t + this.y,
            p.realBounds.w = this.width,
            p.realBounds.h = this.height,
            this.layout.renderer.boundsLookup.addStaveGroup(p);
            let g = new Map;
            for (let e = 0; e < this._trackGroups.length; e++)
                for (let s of this._trackGroups[e].stavesRelevantForBoundsLookup)
                    for (let e of s.barRenderers) {
                        let i;
                        g.has(e.bar.masterBar.index) ? i = g.get(e.bar.masterBar.index) : (i = new us,
                        i.index = e.bar.masterBar.index,
                        i.isFirstOfLine = e.isFirstOfLine,
                        i.realBounds = new ss,
                        i.realBounds.x = u + e.x,
                        i.realBounds.y = a,
                        i.realBounds.w = e.width,
                        i.realBounds.h = d,
                        i.visualBounds = new ss,
                        i.visualBounds.x = u + e.x,
                        i.visualBounds.y = n,
                        i.visualBounds.w = e.width,
                        i.visualBounds.h = l,
                        i.lineAlignedBounds = new ss,
                        i.lineAlignedBounds.x = u + e.x,
                        i.lineAlignedBounds.y = h,
                        i.lineAlignedBounds.w = e.width,
                        i.lineAlignedBounds.h = c,
                        this.layout.renderer.boundsLookup.addMasterBar(i),
                        g.set(i.index, i)),
                        e.buildBoundingsLookup(i, u, t + this.y + s.y)
                    }
        }
        getBarX(e) {
            if (!this._firstStaffInAccolade || 0 === this.layout.renderer.tracks.length)
                return 0;
            let t = this.layout.renderer.tracks[0].staves[0].bars[e];
            return this.layout.getRendererForBar(this._firstStaffInAccolade.staveId, t).x
        }
    }
    Tn.AccoladeLabelSpacing = 10;
    class Nn extends pi {
        constructor(e, t, s, i) {
            super(e, t),
            this._tuning = s,
            this._trackLabel = i,
            this.glyphs = []
        }
        doLayout() {
            if (!(this.glyphs.length > 0)) {
                this.createGlyphs(this._tuning);
                for (const e of this.glyphs)
                    e.renderer = this.renderer,
                    e.doLayout()
            }
        }
        createGlyphs(e) {
            const t = this.renderer.scale
              , s = this.renderer.resources;
            this.height = 0;
            const i = 15 * t;
            this._trackLabel.length > 0 && (this.addGlyph(new zi(0,this.height,this._trackLabel,s.effectFont,A.Left)),
            this.height += i),
            this.addGlyph(new zi(0,this.height,e.name,s.effectFont,A.Left));
            const n = 64 * t;
            if (this.renderer.scoreRenderer.canvas.font = s.effectFont,
            this.width = Math.max(this.renderer.scoreRenderer.canvas.measureText(this._trackLabel) * t, Math.max(this.renderer.scoreRenderer.canvas.measureText(e.name) * t, 2 * n)),
            this.height += i,
            !e.isStandard) {
                const r = .7
                  , a = Nn.CircleNumberHeight * r * t;
                let o = 0 | Math.ceil(e.tunings.length / 2)
                  , h = 0
                  , l = this.height;
                for (let c = 0, d = e.tunings.length; c < d; c++) {
                    const d = I.GuitarString0 + (c + 1);
                    this.addGlyph(new Ei(h,l + a / 1.2,r,d));
                    const u = "= " + jt.getTextForTuning(e.tunings[c], !1);
                    this.addGlyph(new zi(h + a + 1 * t,l,u,s.effectFont,A.Left)),
                    l += i,
                    c === o - 1 && (l = this.height,
                    h += n)
                }
                this.height += o * i
            }
            this.width += 15 * t
        }
    }
    Nn.CircleNumberHeight = 20;
    class vn extends mn {
        constructor(e, t) {
            super(e, t, A.Left)
        }
        addTuning(e, t) {
            if (e.tunings.length > 0) {
                let s = new Nn(0,0,e,t);
                s.renderer = this.renderer,
                s.doLayout(),
                this.glyphs.push(s)
            }
        }
    }
    class xn {
        constructor(e) {
            this._barRendererLookup = new Map,
            this.width = 0,
            this.height = 0,
            this.scoreInfoGlyphs = new Map,
            this.chordDiagrams = null,
            this.tuningGlyph = null,
            this.firstBarIndex = 0,
            this.lastBarIndex = 0,
            this.renderer = e
        }
        layoutAndRender() {
            let e = this.renderer.score
              , t = this.renderer.settings.display.startBar;
            t--,
            t = Math.min(e.masterBars.length - 1, Math.max(0, t)),
            this.firstBarIndex = t;
            let s = this.renderer.settings.display.barCount;
            s < 0 && (s = e.masterBars.length),
            s = t + s - 1,
            s = Math.min(e.masterBars.length - 1, Math.max(0, s)),
            this.lastBarIndex = s,
            this.createScoreInfoGlyphs(),
            this.doLayoutAndRender()
        }
        createScoreInfoGlyphs() {
            var t, s;
            _e.debug("ScoreLayout", "Creating score info glyphs");
            let i = this.renderer.settings.notation
              , n = this.renderer.score
              , r = this.renderer.settings.display.resources;
            this.scoreInfoGlyphs = new Map,
            n.title && i.isNotationElementVisible(e.NotationElement.ScoreTitle) && this.scoreInfoGlyphs.set(e.NotationElement.ScoreTitle, new zi(0,0,n.title,r.titleFont,A.Center)),
            n.subTitle && i.isNotationElementVisible(e.NotationElement.ScoreSubTitle) && this.scoreInfoGlyphs.set(e.NotationElement.ScoreSubTitle, new zi(0,0,n.subTitle,r.subTitleFont,A.Center)),
            n.artist && i.isNotationElementVisible(e.NotationElement.ScoreArtist) && this.scoreInfoGlyphs.set(e.NotationElement.ScoreArtist, new zi(0,0,n.artist,r.subTitleFont,A.Center)),
            n.album && i.isNotationElementVisible(e.NotationElement.ScoreAlbum) && this.scoreInfoGlyphs.set(e.NotationElement.ScoreAlbum, new zi(0,0,n.album,r.subTitleFont,A.Center)),
            n.music && n.music === n.words && i.isNotationElementVisible(e.NotationElement.ScoreWordsAndMusic) ? this.scoreInfoGlyphs.set(e.NotationElement.ScoreWordsAndMusic, new zi(0,0,n.words + " 词曲",r.wordsFont,A.Right)) : (n.music && i.isNotationElementVisible(e.NotationElement.ScoreMusic) && this.scoreInfoGlyphs.set(e.NotationElement.ScoreMusic, new zi(0,0,n.music + " 作曲",r.wordsFont,A.Right)),
            n.words && i.isNotationElementVisible(e.NotationElement.ScoreWords) && this.scoreInfoGlyphs.set(e.NotationElement.ScoreWords, new zi(0,0,n.words + " 作词",r.wordsFont,A.Right))),
            n.tab && i.isNotationElementVisible(e.NotationElement.ScoreTab) && this.scoreInfoGlyphs.set(e.NotationElement.ScoreTab, new zi(0,0,n.tab + " 编谱",r.wordsFont,A.Right));
            const a = new xi(this.renderer,this.renderer.tracks[0].staves[0].bars[0]);
            if (i.isNotationElementVisible(e.NotationElement.GuitarTuning)) {
                let e = [];
                for (let t of this.renderer.tracks)
                    for (let s of t.staves)
                        if (!s.isPercussion && s.isStringed && s.tuning.length > 0 && s.showTablature) {
                            e.push(s);
                            break
                        }
                if (e.length > 0) {
                    this.tuningGlyph = new vn(0,0),
                    this.tuningGlyph.renderer = a;
                    for (const t of e)
                        this.tuningGlyph.addTuning(t.stringTuning, e.length > 1 ? t.track.name : "")
                }
            }
            if (i.isNotationElementVisible(e.NotationElement.ScoreMeter)) {
                const i = this.renderer.score.masterBars[0]
                  , n = null === (s = null === (t = this.renderer.score.tracks[0]) || void 0 === t ? void 0 : t.staves[0]) || void 0 === s ? void 0 : s.transpositionPitch
                  , a = Zs(i.keySignature, n || 0)
                  , o = "1 = " + $[a].replace("Sharp", "♯").replace("b", "♭") + " " + i.timeSignatureNumerator + "/" + i.timeSignatureDenominator;
                this.scoreInfoGlyphs.set(e.NotationElement.ScoreMeter, new zi(0,0,o,r.numberedNoteNumberFont))
            }
            if (i.isNotationElementVisible(e.NotationElement.ScoreTempo)) {
                let t = this.renderer.score.tempo;
                this.scoreInfoGlyphs.set(e.NotationElement.ScoreTempo, new zi(0,0,"♩= " + t,r.numberedNoteNumberFont))
            }
            if (i.isNotationElementVisible(e.NotationElement.ScoreCapo)) {
                let t = 0;
                for (let e of this.renderer.tracks)
                    for (let s of e.staves)
                        if (s.isStringed && s.showTablature && !s.showNumberedNotation) {
                            t = s.capo - s.transpositionPitch;
                            break
                        }
                if (t) {
                    const s = -1 === t ? "降半调调弦" : "Capo = " + t;
                    this.scoreInfoGlyphs.set(e.NotationElement.ScoreCapo, new zi(0,0,s,r.numberedNoteNumberFont))
                }
            }
            if (i.isNotationElementVisible(e.NotationElement.ChordDiagrams)) {
                this.chordDiagrams = new yn(0,0,this.renderer.settings.display.hideTabHead),
                this.chordDiagrams.renderer = a;
                let e = new Map;
                for (let t of this.renderer.tracks)
                    for (let s of t.staves)
                        for (const [t,i] of s.chords)
                            e.has(t) || i.showDiagram && (e.set(t, i),
                            this.chordDiagrams.addChord(i))
            }
        }
        get scale() {
            return this.renderer.settings.display.scale
        }
        createEmptyStaveGroup() {
            let t = new Tn;
            t.layout = this;
            for (let s = 0; s < this.renderer.tracks.length; s++) {
                let i = this.renderer.tracks[s]
                  , n = !1;
                for (let e of i.staves)
                    if (e.showStandardNotation) {
                        n = !0;
                        break
                    }
                for (let r = 0; r < i.staves.length; r++) {
                    let a, o = i.staves[r];
                    if (o.isPercussion)
                        a = e.StaveProfile.Score;
                    else if ([e.StaveProfile.NLead, e.StaveProfile.Lead].includes(this.renderer.settings.display.staveProfile)) {
                        if (!o.showNumberedNotation)
                            continue;
                        a = this.renderer.settings.display.staveProfile
                    } else if (o.showNumberedNotation)
                        a = e.StaveProfile.Numbered;
                    else if (this.renderer.settings.display.staveProfile !== e.StaveProfile.Default)
                        a = this.renderer.settings.display.staveProfile;
                    else if (o.showTablature && o.showStandardNotation)
                        a = e.StaveProfile.ScoreTab;
                    else if (o.showTablature)
                        a = n ? e.StaveProfile.TabMixed : e.StaveProfile.Tab;
                    else {
                        if (!o.showStandardNotation)
                            continue;
                        a = e.StaveProfile.Score
                    }
                    let h = Ka.staveProfiles.get(a);
                    for (let e of h)
                        e.canCreate(i, o) && t.addStaff(i, new bn(s,o,e))
                }
            }
            return t
        }
        registerBarRenderer(e, t) {
            let s = this._barRendererLookup.get(e);
            s || (s = new Map,
            this._barRendererLookup.set(e, s)),
            s.set(t.bar.id, t)
        }
        unregisterBarRenderer(e, t) {
            if (this._barRendererLookup.has(e)) {
                this._barRendererLookup.get(e).delete(t.bar.id)
            }
        }
        getRendererForBar(e, t) {
            let s = t.id;
            return this._barRendererLookup.has(e) && this._barRendererLookup.get(e).has(s) ? this._barRendererLookup.get(e).get(s) : null
        }
        renderAnnotation() {
            let t = this.renderer.canvas
              , s = this.renderer.settings.display.resources
              , i = 12 * this.renderer.settings.display.scale;
            this.height += 0;
            let n = this.width / 2;
            t.beginRender(this.width, 0),
            t.color = s.mainGlyphColor,
            t.font = new vt(s.copyrightFont.family,i,e.FontStyle.Plain,e.FontWeight.Bold),
            t.textAlign = A.Center,
            t.fillText("", n, i);
            let r = t.endRender()
              , a = new ls;
            a.width = this.width,
            a.height = 0,
            a.renderResult = r,
            a.totalWidth = this.width,
            a.totalHeight = this.height,
            a.firstMasterBarIndex = -1,
            a.lastMasterBarIndex = -1,
            this.renderer.partialRenderFinished.trigger(a)
        }
    }
    class kn {
        constructor() {
            this.width = 0,
            this.masterBars = []
        }
    }
    class Pn extends xn {
        constructor(e) {
            super(e),
            this._group = null,
            this._pagePadding = null
        }
        get name() {
            return "HorizontalScreen"
        }
        get supportsResize() {
            return !1
        }
        resize() {}
        doLayoutAndRender() {
            this._pagePadding = this.renderer.settings.display.padding,
            this._pagePadding || (this._pagePadding = Pn.PagePadding),
            1 === this._pagePadding.length ? this._pagePadding = [this._pagePadding[0], this._pagePadding[0], this._pagePadding[0], this._pagePadding[0]] : 2 === this._pagePadding.length && (this._pagePadding = [this._pagePadding[0], this._pagePadding[1], this._pagePadding[0], this._pagePadding[1]]);
            let e = this.renderer.score
              , t = this.renderer.canvas
              , s = this.renderer.settings.display.startBar;
            s--,
            s = Math.min(e.masterBars.length - 1, Math.max(0, s));
            let i = s
              , n = this.renderer.settings.display.barCount;
            n <= 0 && (n = e.masterBars.length),
            n = s + n - 1,
            n = Math.min(e.masterBars.length - 1, Math.max(0, n)),
            this._group = this.createEmptyStaveGroup(),
            this._group.isLast = !0,
            this._group.x = this._pagePadding[0],
            this._group.y = this._pagePadding[1];
            let r = this.renderer.settings.display.barCountPerPartial
              , a = []
              , o = new kn;
            for (; i <= n; ) {
                let t = this._group.addMasterBar(this.renderer.tracks, i);
                if (t)
                    if (0 === o.masterBars.length && t.isLinkedToPrevious && a.length > 0) {
                        let s = a[a.length - 1];
                        s.masterBars.push(e.masterBars[i]),
                        s.width += t.width
                    } else
                        o.masterBars.push(e.masterBars[i]),
                        o.width += t.width,
                        o.masterBars.length >= r && (0 === a.length && (o.width += this._group.x + this._group.accoladeSpacing),
                        a.push(o),
                        _e.debug(this.name, "Finished partial from bar " + o.masterBars[0].index + " to " + o.masterBars[o.masterBars.length - 1].index, null),
                        o = new kn);
                i++
            }
            o.masterBars.length > 0 && (0 === a.length && (o.width += this._group.x + this._group.accoladeSpacing),
            a.push(o),
            _e.debug(this.name, "Finished partial from bar " + o.masterBars[0].index + " to " + o.masterBars[o.masterBars.length - 1].index, null)),
            this._group.finalizeGroup(),
            this.height = this._group.y + this._group.height + this._pagePadding[3],
            this.width = this._group.x + this._group.width + this._pagePadding[2],
            i = 0;
            for (let e = 0; e < a.length; e++) {
                let s = a[e];
                t.beginRender(s.width, this.height),
                t.color = this.renderer.settings.display.resources.mainGlyphColor,
                t.textAlign = A.Left;
                let n = this._group.getBarX(s.masterBars[0].index) + this._group.accoladeSpacing;
                0 === e && (n -= this._group.x + this._group.accoladeSpacing),
                _e.debug(this.name, "Rendering partial from bar " + s.masterBars[0].index + " to " + s.masterBars[s.masterBars.length - 1].index, null),
                this._group.paintPartial(-n, this._group.y, this.renderer.canvas, i, s.masterBars.length);
                let r = t.endRender()
                  , o = new ls;
                o.totalWidth = this.width,
                o.totalHeight = this.height,
                o.width = s.width,
                o.height = this.height,
                o.renderResult = r,
                o.firstMasterBarIndex = s.masterBars[0].index,
                o.lastMasterBarIndex = s.masterBars[s.masterBars.length - 1].index,
                this.renderer.partialRenderFinished.trigger(o),
                i += s.masterBars.length
            }
        }
    }
    Pn.PagePadding = [20, 20, 20, 20],
    Pn.GroupSpacing = 20;
    class Fn extends xn {
        constructor(e) {
            super(e),
            this._groups = [],
            this._allMasterBarRenderers = [],
            this._barsFromPreviousGroup = [],
            this._pagePadding = null
        }
        get name() {
            return "PageView"
        }
        doLayoutAndRender() {
            this._pagePadding = this.renderer.settings.display.padding,
            this._pagePadding || (this._pagePadding = Fn.PagePadding),
            1 === this._pagePadding.length ? this._pagePadding = [this._pagePadding[0], this._pagePadding[0], this._pagePadding[0], this._pagePadding[0]] : 2 === this._pagePadding.length && (this._pagePadding = [this._pagePadding[0], this._pagePadding[1], this._pagePadding[0], this._pagePadding[1]]);
            let e = this._pagePadding[0]
              , t = this._pagePadding[1];
            this.width = this.renderer.width,
            this._allMasterBarRenderers = [],
            t = this.layoutAndRenderScoreInfo(e, t, -1),
            t = this.layoutAndRenderTunings(t, -1),
            t = this.layoutAndRenderChordDiagrams(t, -1),
            t = this.layoutAndRenderScore(e, t),
            this.height = t + this._pagePadding[3]
        }
        get supportsResize() {
            return !0
        }
        resize() {
            let e = this._pagePadding[0]
              , t = this._pagePadding[1];
            this.width = this.renderer.width;
            let s = this.height;
            t = this.layoutAndRenderScoreInfo(e, t, s),
            t = this.layoutAndRenderTunings(t, s),
            t = this.layoutAndRenderChordDiagrams(t, s),
            t = this.resizeAndRenderScore(e, t, s),
            this.height = t + this._pagePadding[3]
        }
        layoutAndRenderTunings(e, t=-1) {
            if (!this.tuningGlyph)
                return e;
            let s = this.renderer.settings.display.resources;
            this.tuningGlyph.width = this.width,
            this.tuningGlyph.doLayout();
            let i = this.tuningGlyph.height + 11 * this.scale;
            e += i;
            let n = this.renderer.canvas;
            n.beginRender(this.width, i),
            n.color = s.scoreInfoColor,
            n.textAlign = A.Center,
            this.tuningGlyph.paint(this._pagePadding[0], 0, n);
            let r = n.endRender()
              , a = new ls;
            return a.width = this.width,
            a.height = i,
            a.renderResult = r,
            a.totalWidth = this.width,
            a.totalHeight = t < 0 ? e : t,
            a.firstMasterBarIndex = -1,
            a.lastMasterBarIndex = -1,
            this.renderer.partialRenderFinished.trigger(a),
            e
        }
        layoutAndRenderChordDiagrams(e, t=-1) {
            if (!this.chordDiagrams)
                return e;
            let s = this.renderer.settings.display.resources;
            this.chordDiagrams.width = this.width,
            this.chordDiagrams.doLayout();
            let i = this.renderer.canvas;
            i.beginRender(this.width, this.chordDiagrams.height),
            i.color = s.scoreInfoColor,
            i.textAlign = A.Center,
            this.chordDiagrams.paint(0, 0, i);
            let n = i.endRender();
            e += this.chordDiagrams.height;
            let r = new ls;
            return r.width = this.width,
            r.height = this.chordDiagrams.height,
            r.renderResult = n,
            r.totalWidth = this.width,
            r.totalHeight = t < 0 ? e : t,
            r.firstMasterBarIndex = -1,
            r.lastMasterBarIndex = -1,
            this.renderer.partialRenderFinished.trigger(r),
            e
        }
        layoutAndRenderScoreInfo(t, s, i=-1) {
            _e.debug(this.name, "Layouting score info");
            const n = s;
            let r = this.scale
              , a = this.renderer.settings.display.resources
              , o = [e.NotationElement.ScoreTitle, e.NotationElement.ScoreSubTitle, e.NotationElement.ScoreArtist, e.NotationElement.ScoreAlbum, e.NotationElement.ScoreWordsAndMusic];
            for (let e = 0; e < o.length; e++)
                if (this.scoreInfoGlyphs.has(o[e])) {
                    let t = this.scoreInfoGlyphs.get(o[e]);
                    t.x = this.width / 2,
                    t.y = s,
                    t.textAlign = A.Center,
                    s += t.font.size * r
                }
            const h = s;
            let l = [e.NotationElement.ScoreMeter, e.NotationElement.ScoreTempo, e.NotationElement.ScoreCapo];
            for (let e = 0; e < l.length; e++)
                if (this.scoreInfoGlyphs.has(l[e])) {
                    let t = this.scoreInfoGlyphs.get(l[e]);
                    t.x = this._pagePadding[2],
                    t.y = s,
                    t.textAlign = A.Left,
                    s += t.font.size * r
                }
            const c = s;
            s = h;
            let d = [e.NotationElement.ScoreWordsAndMusic, e.NotationElement.ScoreMusic, e.NotationElement.ScoreWords, e.NotationElement.ScoreTab];
            for (let e = 0; e < d.length; e++)
                if (this.scoreInfoGlyphs.has(d[e])) {
                    let t = this.scoreInfoGlyphs.get(d[e]);
                    t.x = this.width - this._pagePadding[2],
                    t.y = s,
                    t.textAlign = A.Right,
                    s += t.font.size * r
                }
            s < c && (s = c),
            s > n && (s += 17 * this.scale);
            let u = this.renderer.canvas;
            u.beginRender(this.width, s),
            u.color = a.scoreInfoColor,
            u.textAlign = A.Center;
            for (const e of this.scoreInfoGlyphs.values())
                e.paint(0, 0, u);
            let p = u.endRender()
              , g = new ls;
            return g.width = this.width,
            g.height = s,
            g.renderResult = p,
            g.totalWidth = this.width,
            g.totalHeight = i < 0 ? s : i,
            g.firstMasterBarIndex = -1,
            g.lastMasterBarIndex = -1,
            this.renderer.partialRenderFinished.trigger(g),
            s
        }
        resizeAndRenderScore(e, t, s) {
            let i = this.renderer.canvas;
            if (-1 !== this.renderer.settings.display.barsPerRow)
                for (let e = 0; e < this._groups.length; e++) {
                    let n = this._groups[e];
                    this.fitGroup(n),
                    n.finalizeGroup(),
                    t += this.paintGroup(n, s, i)
                }
            else
                t = this.layoutAndRenderScore(e, t);
            return t
        }
        layoutAndRenderScore(e, t) {
            let s = this.renderer.canvas
              , i = this.firstBarIndex
              , n = this.lastBarIndex;
            for (this._groups = []; i <= n; ) {
                const r = this.renderer.settings.display.rowCount;
                if (r > 0 && this._groups.length >= r) {
                    this._barsFromPreviousGroup = [];
                    break
                }
                let a = this.createStaveGroup(i, n);
                this._groups.push(a),
                a.x = e,
                a.y = t,
                i = a.lastBarIndex + 1,
                this.fitGroup(a),
                a.finalizeGroup(),
                _e.debug(this.name, "Rendering partial from bar " + a.firstBarIndex + " to " + a.lastBarIndex, null),
                t += this.paintGroup(a, t, s)
            }
            return t
        }
        paintGroup(e, t, s) {
            let i = e.height + Fn.GroupSpacing * this.scale;
            s.beginRender(this.width, i),
            this.renderer.canvas.color = this.renderer.settings.display.resources.mainGlyphColor,
            this.renderer.canvas.textAlign = A.Left,
            e.paint(0, -e.y, s),
            t += i;
            let n = s.endRender()
              , r = new ls;
            return r.totalWidth = this.width,
            r.totalHeight = t,
            r.width = this.width,
            r.height = i,
            r.renderResult = n,
            r.firstMasterBarIndex = e.firstBarIndex,
            r.lastMasterBarIndex = e.lastBarIndex,
            this.renderer.partialRenderFinished.trigger(r),
            i
        }
        fitGroup(e) {
            (e.isFull || e.width > this.maxWidth) && e.scaleToWidth(this.maxWidth),
            this.width = Math.max(this.width, e.width)
        }
        createStaveGroup(e, t) {
            let s = this.createEmptyStaveGroup();
            s.index = this._groups.length;
            let i = this.renderer.settings.display.barsPerRow
              , n = this.maxWidth
              , r = t + 1
              , a = e;
            for (; a < r; ) {
                if (this._barsFromPreviousGroup.length > 0)
                    for (let e of this._barsFromPreviousGroup)
                        s.addMasterBarRenderer(this.renderer.tracks, e),
                        a = e.masterBar.index;
                else {
                    let e = s.addMasterBar(this.renderer.tracks, a);
                    e && this._allMasterBarRenderers.push(e)
                }
                this._barsFromPreviousGroup = [];
                let e = !1;
                if ((-1 === i && s.width >= n && 0 !== s.masterBarRenderers.length || s.masterBarRenderers.length === i + 1) && (e = !0),
                e) {
                    let e = s.revertLastBar();
                    if (e)
                        for (this._barsFromPreviousGroup.push(e); e && !e.canWrap && s.masterBarRenderers.length > 1; )
                            e = s.revertLastBar(),
                            e && this._barsFromPreviousGroup.push(e);
                    return s.isFull = !0,
                    s.isLast = !1,
                    this._barsFromPreviousGroup.reverse(),
                    s
                }
                s.x = 0,
                a++
            }
            return s.isLast = t === s.lastBarIndex,
            s
        }
        get maxWidth() {
            return this.renderer.width - this._pagePadding[0] - this._pagePadding[2]
        }
    }
    Fn.PagePadding = [40, 40, 40, 40],
    Fn.GroupSpacing = 0;
    class Cn extends ui {
        constructor(e, t, s, i) {
            super(e, t),
            this._number = 0,
            this._fixedWidth = void 0,
            this._number = s,
            this._fixedWidth = i
        }
        doLayout() {
            this.renderer.scoreRenderer.canvas.font = this.renderer.resources.barNumberFont,
            this.width = null == this._fixedWidth ? this.renderer.scoreRenderer.canvas.measureText(this._number.toString()) + 5 * this.scale : this._fixedWidth
        }
        paint(e, t, s) {
            if (!this.renderer.staffRenderer.isFirstInAccolade)
                return;
            let i = this.renderer.resources
              , n = s.color;
            const r = s.font;
            s.color = i.barNumberColor,
            s.font = i.barNumberFont,
            s.fillText(this._number.toString(), e + this.x, t + this.y),
            s.color = n,
            s.font = r
        }
    }
    class Ln extends ui {
        constructor(e, t) {
            super(e, t)
        }
        doLayout() {
            this.renderer.isLast ? this.width = 15 * this.scale : this.renderer.nextRenderer && this.renderer.nextRenderer.staffRenderer === this.renderer.staffRenderer && this.renderer.nextRenderer.bar.masterBar.isRepeatStart ? this.width = 2 * this.scale : (this.width = 2 * this.scale,
            this.renderer.bar.masterBar.isDoubleBar && (this.width += 2 * this.scale))
        }
        paint(e, t, s) {
            let i = (this.renderer.settings.display.slim ? 2 : 4) * this.scale
              , n = t + this.y + this.renderer.topPadding
              , r = t + this.y + this.renderer.height - this.renderer.bottomPadding
              , a = e + this.x
              , o = r - n;
            this.renderer.isLast ? (s.fillRect(a + this.width - i - i, n, this.scale, o),
            s.fillRect(a + this.width - i, n, i, o)) : this.renderer.nextRenderer && this.renderer.nextRenderer.staffRenderer === this.renderer.staffRenderer && this.renderer.nextRenderer.bar.masterBar.isRepeatStart || (s.fillRect(a + this.width - this.scale, n, this.scale, o),
            this.renderer.bar.masterBar.isDoubleBar && s.fillRect(a + this.width - 5 * this.scale, n, this.scale, o))
        }
    }
    class En extends ui {
        constructor(e, t, s, i=!1) {
            super(e, t),
            this.duration = i ? d.Eighth : s
        }
        doLayout() {
            this.width = 9 * this.scale
        }
        paint(e, t, s) {
            const i = 6 * this.scale;
            if (this.duration > d.Quarter)
                for (let n = 0, r = Math.log2(this.duration) - 2; n < r; n++)
                    this.paintFlag(e, t - i * n, s)
        }
        paintFlag(e, t, s) {
            const i = e + this.width - 3 * this.scale
              , n = t - 15 * this.scale
              , r = e + 3 * this.scale
              , a = t - 6 * this.scale
              , o = e + this.width
              , h = n + 6 * this.scale;
            s.moveTo(e, t),
            s.bezierCurveTo(r, a, o, h, i, n),
            s.stroke()
        }
    }
    class Mn extends ui {
        constructor(e, t) {
            super(e, t)
        }
        doLayout() {
            this.width = 11 * this.scale
        }
        paint(e, t, s) {
            let i = (this.renderer.settings.display.slim ? 2 : 4) * this.scale
              , n = t + this.y + this.renderer.topPadding
              , r = t + this.y + this.renderer.height - this.renderer.bottomPadding
              , a = e + this.x
              , o = r - n
              , h = 1.5 * this.scale
              , l = (n + r) / 2;
            s.fillCircle(a, l - 3 * h, h),
            s.fillCircle(a, l + 3 * h, h),
            a += 4 * this.scale,
            s.beginPath(),
            s.moveTo(a, n),
            s.lineTo(a, r),
            s.stroke(),
            a += 3 * this.scale + .5,
            s.fillRect(a, n, i, o)
        }
    }
    class Dn extends ui {
        constructor(e, t, s) {
            super(e, t),
            this._count = 0,
            this._count = 0,
            this._count = s
        }
        doLayout() {
            this.width = 0
        }
        paint(e, t, s) {
            let i = this.renderer.resources
              , n = s.textAlign;
            s.font = i.barNumberFont,
            s.textAlign = A.Right;
            let r = "x" + this._count
              , a = s.measureText(r) / 1.5;
            s.fillText(r, e + this.x - a, t + this.y),
            s.textAlign = n
        }
    }
    class Rn extends ui {
        constructor(e, t, s, i) {
            super(e, t),
            this._dotOffset = 0,
            this._circleSize = 0,
            this._dotOffset = 0,
            this._circleSize = 0,
            this._dotOffset = i,
            this._circleSize = s
        }
        doLayout() {
            this.width = 13 * this.scale
        }
        paint(e, t, s) {
            let i = (this.renderer.settings.display.slim ? 2 : 4) * this.scale
              , n = t + this.y + this.renderer.topPadding
              , r = t + this.y + this.renderer.height - this.renderer.bottomPadding
              , a = e + this.x + .5
              , o = r - n;
            s.fillRect(a, n, i, o),
            a += 2 * i - .5,
            s.beginPath(),
            s.moveTo(a, n),
            s.lineTo(a, r),
            s.stroke(),
            a += 3 * this.scale;
            let h = this._circleSize * this.scale
              , l = (n + r) / 2;
            s.fillCircle(a, l - h * this._dotOffset, h),
            s.fillCircle(a, l + h * this._dotOffset, h)
        }
    }
    class On extends ui {
        constructor(e, t, s) {
            super(e, t),
            this.width = s
        }
    }
    class In extends ye {
        constructor(e=0, t=0) {
            super(e, t),
            this.lineValue = 0,
            this.lineValue = t
        }
    }
    class An extends ui {
        constructor() {
            super(0, 0),
            this._notes = [],
            this._renderPoints = new Map,
            this._preBendMinValue = -1,
            this._bendMiddleMinValue = -1,
            this._bendEndMinValue = -1,
            this._bendEndContinuedMinValue = -1,
            this._releaseMinValue = -1,
            this._releaseContinuedMinValue = -1,
            this._maxBendValue = -1
        }
        addBends(e) {
            this._notes.push(e);
            let t = this.createRenderingPoints(e);
            this._renderPoints.set(e.id, t),
            (-1 === this._maxBendValue || this._maxBendValue < e.maxBendPoint.value) && (this._maxBendValue = e.maxBendPoint.value);
            let s = 0;
            switch (e.bendType) {
            case l.Bend:
                s = t[1].value,
                e.isTieOrigin ? (-1 === this._bendEndContinuedMinValue || s < this._bendEndContinuedMinValue) && (this._bendEndContinuedMinValue = s) : (-1 === this._bendEndMinValue || s < this._bendEndMinValue) && (this._bendEndMinValue = s);
                break;
            case l.Release:
                s = t[1].value,
                e.isTieOrigin ? (-1 === this._releaseContinuedMinValue || s < this._releaseContinuedMinValue) && (this._releaseContinuedMinValue = s) : s > 0 && (-1 === this._releaseMinValue || s < this._releaseMinValue) && (this._releaseMinValue = s);
                break;
            case l.BendRelease:
                s = t[1].value,
                (-1 === this._bendMiddleMinValue || s < this._bendMiddleMinValue) && (this._bendMiddleMinValue = s),
                s = t[2].value,
                e.isTieOrigin ? (-1 === this._releaseContinuedMinValue || s < this._releaseContinuedMinValue) && (this._releaseContinuedMinValue = s) : s > 0 && (-1 === this._releaseMinValue || s < this._releaseMinValue) && (this._releaseMinValue = s);
                break;
            case l.Prebend:
                s = t[0].value,
                (-1 === this._preBendMinValue || s < this._preBendMinValue) && (this._preBendMinValue = s);
                break;
            case l.PrebendBend:
                s = t[0].value,
                (-1 === this._preBendMinValue || s < this._preBendMinValue) && (this._preBendMinValue = s),
                s = t[1].value,
                e.isTieOrigin ? (-1 === this._bendEndContinuedMinValue || s < this._bendEndContinuedMinValue) && (this._bendEndContinuedMinValue = s) : (-1 === this._bendEndMinValue || s < this._bendEndMinValue) && (this._bendEndMinValue = s);
                break;
            case l.PrebendRelease:
                s = t[0].value,
                (-1 === this._preBendMinValue || s < this._preBendMinValue) && (this._preBendMinValue = s),
                s = t[1].value,
                e.isTieOrigin ? (-1 === this._releaseContinuedMinValue || s < this._releaseContinuedMinValue) && (this._releaseContinuedMinValue = s) : s > 0 && (-1 === this._releaseMinValue || s < this._releaseMinValue) && (this._releaseMinValue = s)
            }
        }
        doLayout() {
            super.doLayout();
            let e = this._maxBendValue * An.BendValueHeight * this.scale;
            this.renderer.registerOverflowTop(e);
            let t = 0;
            for (let e of this._notes) {
                let s = this._renderPoints.get(e.id);
                switch (e.bendType) {
                case l.Bend:
                    s[1].lineValue = e.isTieOrigin ? this._bendEndContinuedMinValue : this._bendEndMinValue;
                    break;
                case l.Release:
                    t = e.isTieOrigin ? this._releaseContinuedMinValue : this._releaseMinValue,
                    t >= 0 && (s[1].lineValue = t);
                    break;
                case l.BendRelease:
                    s[1].lineValue = this._bendMiddleMinValue,
                    t = e.isTieOrigin ? this._releaseContinuedMinValue : this._releaseMinValue,
                    t >= 0 && (s[2].lineValue = t);
                    break;
                case l.Prebend:
                    s[0].lineValue = this._preBendMinValue;
                    break;
                case l.PrebendBend:
                    s[0].lineValue = this._preBendMinValue,
                    s[1].lineValue = e.isTieOrigin ? this._bendEndContinuedMinValue : this._bendEndMinValue;
                    break;
                case l.PrebendRelease:
                    s[0].lineValue = this._preBendMinValue,
                    t = e.isTieOrigin ? this._releaseContinuedMinValue : this._releaseMinValue,
                    t >= 0 && (s[1].lineValue = t)
                }
            }
            this.width = 0,
            this._notes.sort(( (e, t) => e.isStringed ? e.string - t.string : e.realValue - t.realValue))
        }
        createRenderingPoints(e) {
            let t = [];
            switch (e.bendType) {
            case l.Custom:
                for (let s of e.bendPoints)
                    t.push(new In(s.offset,s.value));
                break;
            case l.BendRelease:
                t.push(new In(0,e.bendPoints[0].value)),
                t.push(new In(ye.MaxPosition / 2 | 0,e.bendPoints[1].value)),
                t.push(new In(ye.MaxPosition,e.bendPoints[3].value));
                break;
            case l.Bend:
            case l.Hold:
            case l.Prebend:
            case l.PrebendBend:
            case l.PrebendRelease:
            case l.Release:
                t.push(new In(0,e.bendPoints[0].value)),
                t.push(new In(ye.MaxPosition,e.bendPoints[1].value))
            }
            return t
        }
        paint(e, t, s) {
            let i = s.color;
            this._notes.length > 1 && (s.color = this.renderer.resources.secondaryGlyphColor);
            for (let n of this._notes) {
                let r = this._renderPoints.get(n.id)
                  , a = this.renderer
                  , o = n
                  , c = !1
                  , d = null
                  , u = !1
                  , p = n.bendStyle === h.Gradual ? "grad." : ""
                  , g = null;
                for (; o.isTieOrigin; ) {
                    let e = o.tieDestination;
                    if (d = this.renderer.scoreRenderer.layout.getRendererForBar(this.renderer.staffRenderer.staveId, e.beat.voice.bar),
                    !d || a.staffRenderer !== d.staffRenderer)
                        break;
                    if (o = e,
                    c = !0,
                    o.hasBend || !this.renderer.settings.notation.extendBendArrowsOnTiedNotes) {
                        u = !0;
                        break
                    }
                }
                g = o.beat,
                d = this.renderer.scoreRenderer.layout.getRendererForBar(this.renderer.staffRenderer.staveId, g.voice.bar),
                g.isLastOfVoice && !o.hasBend && this.renderer.settings.notation.extendBendArrowsOnTiedNotes && (g = null);
                let f = 0
                  , m = 0
                  , y = t + a.y;
                f = e + a.x,
                r[0].value > 0 || n.isContinuedBend ? f += a.getBeatX(n.beat, hi.MiddleNotes) : f += a.getNoteX(n, ci.Right),
                m = !g || g.isLastOfVoice && !u ? e + d.x + d.postBeatGlyphsStart : u || !g.nextBeat ? e + d.x + d.getBeatX(g, hi.MiddleNotes) : n.bendType === l.Hold ? e + d.x + d.getBeatX(g.nextBeat, hi.OnNotes) : e + d.x + d.getBeatX(g.nextBeat, hi.PreNotes),
                c || (m -= An.ArrowSize * this.scale);
                let b = (m - f) / ye.MaxPosition;
                s.beginPath();
                for (let e = 0, t = r.length - 1; e < t; e++) {
                    let t = r[e]
                      , i = r[e + 1];
                    0 !== e || 0 === t.value || n.isTieDestination || this.paintBend(n, new In(0,0), t, f, y, b, p, s),
                    n.bendType !== l.Prebend ? (0 === e && (f += 2 * this.scale),
                    this.paintBend(n, t, i, f, y, b, p, s)) : n.isTieOrigin && n.tieDestination.hasBend && (i = new In(ye.MaxPosition,t.value),
                    i.lineValue = t.lineValue,
                    this.paintBend(n, t, i, f, y, b, p, s))
                }
                s.color = i
            }
        }
        paintBend(e, t, s, i, n, r, a, o) {
            let h = this.renderer
              , l = this.renderer.resources
              , c = h.lineOffset / 2
              , d = i + r * t.offset
              , u = An.BendValueHeight * this.scale
              , p = n - u * t.lineValue;
            0 === t.value ? s.offset === t.offset ? p += h.getNoteY(e.beat.maxStringNote, li.Top) : p += h.getNoteY(e, li.Center) : p += c;
            let g = i + r * s.offset
              , f = n - u * s.lineValue;
            0 === s.lineValue ? f += h.getNoteY(e, li.Center) : f += c;
            let m = 0
              , y = An.ArrowSize * this.scale;
            if (s.value > t.value ? (f + y > p && (f = p - y),
            o.beginPath(),
            o.moveTo(g, f),
            o.lineTo(g - .5 * y, f + y),
            o.lineTo(g + .5 * y, f + y),
            o.closePath(),
            o.fill(),
            m = y) : s.value !== t.value && (f < p && (f = p + y),
            o.beginPath(),
            o.moveTo(g, f),
            o.lineTo(g - .5 * y, f - y),
            o.lineTo(g + .5 * y, f - y),
            o.closePath(),
            o.fill(),
            m = -y),
            o.stroke(),
            t.value === s.value) {
                if (t.lineValue > 0) {
                    let e = g
                      , t = An.DashSize * this.scale
                      , s = d + t;
                    if ((e - d) / (2 * t) < 1)
                        o.moveTo(e, p),
                        o.lineTo(d, p);
                    else
                        for (; e > s; )
                            o.moveTo(e, p),
                            o.lineTo(e - t, p),
                            e -= 2 * t;
                    o.stroke()
                }
            } else
                g > d ? (o.moveTo(d, p),
                o.bezierCurveTo((d + g) / 2, p, g, p, g, f + m),
                o.stroke()) : (o.moveTo(d, p),
                o.lineTo(g, f),
                o.stroke());
            if (a && t.offset < s.offset) {
                o.font = l.graceFont;
                let e = o.measureText(a)
                  , t = 0
                  , s = 0;
                if (p > f) {
                    let i = Math.abs(p - f);
                    t = i > 1.3 * o.font.size ? p - i / 2 : p,
                    s = (d + g - e) / 2
                } else
                    t = p,
                    s = g - e;
                o.fillText(a, s, t)
            }
            if (0 !== s.value && t.value !== s.value) {
                let e = s.value
                  , i = s.value > t.value;
                e = Math.abs(e);
                let r = "";
                if (4 === e)
                    r = "full",
                    e -= 4;
                else if (e >= 4 || e <= -4) {
                    let t = e / 4 | 0;
                    r += t,
                    e -= 4 * t
                }
                if (e > 0 && (r += An.getFractionSign(e)),
                "" !== r) {
                    f = n - u * s.value;
                    let e = f;
                    i || (e = p + 1 * Math.abs(f - p) / 3),
                    o.font = l.tablatureFont;
                    let t = o.measureText(r)
                      , a = e - .5 * l.tablatureFont.size - 2 * this.scale
                      , h = g - t / 2;
                    o.fillText(r, h, a)
                }
            }
        }
        static getFractionSign(e) {
            switch (e) {
            case 1:
                return "¼";
            case 2:
                return "½";
            case 3:
                return "¾";
            default:
                return e + "/ 4"
            }
        }
    }
    An.ArrowSize = 6,
    An.DashSize = 3,
    An.BendValueHeight = 6;
    class Gn extends Li {
        constructor(e) {
            super(),
            this.forceGroupedRendering = !1,
            this.endOnBarLine = !1,
            this.endPosition = e
        }
        get isLinkedWithPrevious() {
            return !!this.previousGlyph && this.previousGlyph.renderer.staffRenderer.staveGroup === this.renderer.staffRenderer.staveGroup
        }
        get isLinkedWithNext() {
            return !!this.nextGlyph && this.nextGlyph.renderer.isFinalized && this.nextGlyph.renderer.staffRenderer.staveGroup === this.renderer.staffRenderer.staveGroup
        }
        paint(e, t, s) {
            if (this.isLinkedWithPrevious)
                return;
            if (!this.isLinkedWithNext && !this.forceGroupedRendering)
                return void this.paintNonGrouped(e, t, s);
            let i;
            if (!this.isLinkedWithNext && this.forceGroupedRendering)
                i = this;
            else
                for (i = this.nextGlyph; i.isLinkedWithNext; )
                    i = i.nextGlyph;
            let n = i.renderer
              , r = i.beat
              , a = this.endPosition
              , o = e - this.renderer.x
              , h = this.calculateEndX(n, r, o, a);
            this.paintGrouped(e, t, h, s, r)
        }
        calculateEndX(e, t, s, i) {
            return t ? s + e.x + e.getBeatX(t, i) : s + e.x + this.x + this.width
        }
        paintNonGrouped(e, t, s) {
            let i = e - this.renderer.x
              , n = this.calculateEndX(this.renderer, this.beat, i, this.endPosition);
            this.paintGrouped(e, t, n, s, this.beat)
        }
    }
    class Hn extends Gn {
        constructor(e, t, s, i=1.2, n=!1) {
            super(hi.EndBeat),
            this._scale = 0,
            this._symbol = I.None,
            this._symbolSize = 0,
            this._type = s,
            this._scale = i,
            this.x = e,
            this.y = t,
            this._partialWaves = n
        }
        doLayout() {
            super.doLayout();
            let e = 0;
            switch (this._type) {
            case b.Slight:
                this._symbol = I.WiggleTrill,
                this._symbolSize = 9 * this._scale,
                e = 6 * this._scale;
                break;
            case b.Wide:
                this._symbol = I.WiggleVibratoMediumFast,
                this._symbolSize = 10 * this._scale,
                e = 10 * this._scale
            }
            this.height = e * this.scale
        }
        paintGrouped(e, t, s, i) {
            let n = s - (e + this.x)
              , r = this._symbolSize * this.scale
              , a = n / r;
            this._partialWaves || (a = Math.floor(a)),
            a < 1 && (a = 1);
            let o = 0;
            for (let s = 0; s < a; s++)
                i.fillMusicFontSymbol(e + this.x + o, t + this.y + 2 * this.height, this._scale * this.scale, this._symbol, !1),
                o += r
        }
    }
    class Vn extends ui {
        constructor(e, t, s, i) {
            super(0, 0),
            this._inType = e,
            this._outType = t,
            this._startNote = s,
            this._parent = i
        }
        doLayout() {
            this.width = 0
        }
        paint(e, t, s) {
            this.paintSlideIn(e, t, s),
            this.paintSlideOut(e, t, s)
        }
        paintSlideIn(e, t, s) {
            let i = this.renderer
              , n = 12 * this.scale
              , r = 3 * this.scale
              , a = 0
              , o = 0
              , h = 0
              , l = 0;
            switch (this._inType) {
            case f.IntoFromBelow:
                h = e + i.x + i.getNoteX(this._startNote, ci.Left),
                l = t + i.y + i.getNoteY(this._startNote, li.Center),
                a = h - n,
                o = t + i.y + i.getNoteY(this._startNote, li.Center) + r;
                break;
            case f.IntoFromAbove:
                h = e + i.x + i.getNoteX(this._startNote, ci.Left),
                l = t + i.y + i.getNoteY(this._startNote, li.Center),
                a = h - n,
                o = t + i.y + i.getNoteY(this._startNote, li.Center) - r;
                break;
            default:
                return
            }
            this.paintSlideLine(s, !1, a, h, o, l)
        }
        paintSlideOut(e, t, s) {
            let i = this.renderer
              , n = 12 * this.scale
              , r = 3 * this.scale
              , a = 0
              , o = 0
              , h = 0
              , l = 0
              , c = !1;
            const d = 2 * this.scale;
            switch (this._outType) {
            case m.Shift:
            case m.Legato:
                if (a = e + i.x + i.getBeatX(this._startNote.beat, hi.PostNotes),
                o = t + i.y + i.getNoteY(this._startNote, li.Center),
                this._startNote.slideTarget) {
                    let s = this.renderer.scoreRenderer.layout.getRendererForBar(this.renderer.staffRenderer.staveId, this._startNote.slideTarget.beat.voice.bar);
                    s && s.staffRenderer === i.staffRenderer ? (h = e + s.x + s.getBeatX(this._startNote.slideTarget.beat, hi.OnNotes) - d,
                    l = t + s.y + s.getNoteY(this._startNote.slideTarget, li.Center)) : (h = e + i.x + this._parent.x,
                    l = o),
                    this._startNote.slideTarget.fret > this._startNote.fret ? (o += r,
                    l -= r) : (o -= r,
                    l += r)
                } else
                    h = e + i.x + this._parent.x,
                    l = o;
                break;
            case m.OutUp:
                a = e + i.x + i.getNoteX(this._startNote, ci.Right),
                o = t + i.y + i.getNoteY(this._startNote, li.Center),
                h = a + n - d,
                l = t + i.y + i.getNoteY(this._startNote, li.Center) - r;
                break;
            case m.OutDown:
                a = e + i.x + i.getNoteX(this._startNote, ci.Right),
                o = t + i.y + i.getNoteY(this._startNote, li.Center),
                h = a + n - d,
                l = t + i.y + i.getNoteY(this._startNote, li.Center) + r;
                break;
            case m.PickSlideDown:
                a = e + i.x + i.getNoteX(this._startNote, ci.Right),
                o = t + i.y + i.getNoteY(this._startNote, li.Center),
                h = e + i.x + i.getBeatX(this._startNote.beat, hi.EndBeat),
                l = o + 3 * r,
                c = !0;
                break;
            case m.PickSlideUp:
                a = e + i.x + i.getNoteX(this._startNote, ci.Right),
                o = t + i.y + i.getNoteY(this._startNote, li.Center),
                h = e + i.x + i.getBeatX(this._startNote.beat, hi.EndBeat),
                l = o - 3 * r,
                c = !0;
                break;
            default:
                return
            }
            this.paintSlideLine(s, c, a, h, o, l)
        }
        paintSlideLine(e, t, s, i, n, r) {
            if (t) {
                let t = new Hn(0,0,b.Slight,1.2);
                t.renderer = this.renderer,
                t.doLayout(),
                n -= t.height / 2;
                let a = i - s
                  , o = (r -= t.height / 2) - n
                  , h = Math.sqrt(Math.pow(o, 2) + Math.pow(a, 2));
                t.width = a;
                let l = Math.asin(o / h) * (180 / Math.PI);
                e.beginRotate(s, n, l),
                t.paint(0, 0, e),
                e.endRotate()
            } else
                e.beginPath(),
                e.moveTo(s, n),
                e.lineTo(i, r),
                e.stroke()
        }
    }
    class Wn extends ui {
        constructor(e, t, s) {
            super(0, 0),
            this.yOffset = 0,
            this.startNoteRenderer = null,
            this.endNoteRenderer = null,
            this.tieDirection = Ut.Up,
            this.startBeat = e,
            this.endBeat = t,
            this.forEnd = s
        }
        doLayout() {
            this.width = 0
        }
        paint(e, t, s) {
            if (!this.endBeat)
                return;
            let i = this.renderer.scoreRenderer.layout.getRendererForBar(this.renderer.staffRenderer.staveId, this.startBeat.voice.bar);
            this.startNoteRenderer = i;
            let n = this.renderer.scoreRenderer.layout.getRendererForBar(this.renderer.staffRenderer.staveId, this.endBeat.voice.bar);
            this.endNoteRenderer = n;
            let r = 0
              , a = 0
              , o = 0
              , h = 0
              , l = !1;
            this.tieDirection = i ? this.getBeamDirection(this.startBeat, i) : this.getBeamDirection(this.endBeat, n),
            !this.forEnd && i ? (i !== n ? (r = e + i.x + this.getStartX(),
            o = t + i.y + this.getStartY() + this.yOffset,
            n && i.staffRenderer === n.staffRenderer ? (a = e + n.x + this.getEndX(),
            h = t + n.y + this.getEndY() + this.yOffset) : (a = e + i.x + i.width,
            h = o)) : (r = e + i.x + this.getStartX(),
            a = e + n.x + this.getEndX(),
            o = t + i.y + this.getStartY() + this.yOffset,
            h = t + n.y + this.getEndY() + this.yOffset),
            l = !0) : i && i.staffRenderer === n.staffRenderer || (r = e + n.x,
            a = e + n.x + this.getEndX(),
            o = t + n.y + this.getEndY() + this.yOffset,
            h = o,
            l = !0),
            l && (this.shouldDrawBendSlur() ? Wn.drawBendSlur(s, r, o, a, h, this.tieDirection === Ut.Down, this.scale) : Wn.paintTie(s, this.scale, r, o, a, h, this.tieDirection === Ut.Down, this.getTieHeight(r, o, a, h), this.renderer.settings.display.slim ? 2 : 4))
        }
        shouldDrawBendSlur() {
            return !1
        }
        getTieHeight(e, t, s, i) {
            return 10
        }
        getBeamDirection(e, t) {
            return Ut.Down
        }
        getStartY() {
            return 0
        }
        getEndY() {
            return 0
        }
        getStartX() {
            return 0
        }
        getEndX() {
            return 0
        }
        static paintTie(e, t, s, i, n, r, a=!1, o=22, h=4) {
            if (s === n && i === r)
                return;
            if (n < s) {
                let e = s;
                s = n,
                n = e,
                e = i,
                i = r,
                r = e
            }
            o *= t,
            h *= t;
            let l = r - i
              , c = n - s
              , d = Math.sqrt(l * l + c * c);
            a ? l *= -1 : c *= -1,
            l /= d,
            c /= d;
            let u = (n + s) / 2
              , p = (r + i) / 2
              , g = u + o * l
              , f = p + o * c
              , m = u + (o - h) * l
              , y = p + (o - h) * c;
            e.beginPath(),
            e.moveTo(s, i),
            e.quadraticCurveTo(g, f, n, r),
            e.quadraticCurveTo(m, y, s, i),
            e.closePath(),
            e.fill()
        }
        static drawBendSlur(e, t, s, i, n, r, a, o) {
            let h = n - s
              , l = i - t
              , c = Math.sqrt(h * h + l * l);
            r ? h *= -1 : l *= -1,
            h /= c,
            l /= c;
            let d = (i + t) / 2
              , u = (n + s) / 2
              , p = Wn.BendSlurHeight * a;
            i - t < 20 && (p /= 2);
            let g = d + p * h
              , f = u + p * l;
            if (e.beginPath(),
            e.moveTo(t, s),
            e.lineTo(g, f),
            e.lineTo(i, n),
            e.stroke(),
            o) {
                let t = e.measureText(o)
                  , s = r ? 0 : -e.font.size;
                e.fillText(o, g - t / 2, f + s)
            }
        }
    }
    Wn.BendSlurHeight = 11;
    class zn extends Wn {
        constructor(e, t, s=!1) {
            super(e.beat, t.beat, s),
            this.startNote = e,
            this.endNote = t
        }
        getTieHeight(e, t, s, i) {
            return this.startNote === this.endNote ? 15 : super.getTieHeight(e, t, s, i)
        }
        getBeamDirection(e, t) {
            return this.startNote === this.endNote ? Ut.Up : zn.getBeamDirectionForNote(this.startNote)
        }
        static getBeamDirectionForNote(e) {
            return Ut.Up
        }
        getStartY() {
            return this.startNote === this.endNote ? this.startNoteRenderer.getNoteY(this.startNote, li.Center) : this.tieDirection === Ut.Up ? this.startNoteRenderer.getNoteY(this.startNote, li.Top) + 2 * this.scale : this.startNoteRenderer.getNoteY(this.startNote, li.Bottom)
        }
        getEndY() {
            return this.getStartY()
        }
        getStartX() {
            return this.startNote === this.endNote ? this.getEndX() - 20 * this.scale : this.startNoteRenderer.getNoteX(this.startNote, ci.Center)
        }
        getEndX() {
            return this.startNote === this.endNote ? this.endNoteRenderer.getNoteX(this.endNote, ci.Left) : this.endNoteRenderer.getNoteX(this.endNote, ci.Center)
        }
    }
    class Un extends zn {
        constructor(e, t, s, i=!1) {
            super(e, t, i),
            this._direction = zn.getBeamDirectionForNote(e),
            this._forSlide = s
        }
        getTieHeight(e, t, s, i) {
            return Math.log(s - e + 1) * this.renderer.settings.notation.slurHeight
        }
        tryExpand(e, t, s, i) {
            if (this._forSlide !== s)
                return !1;
            if (this.forEnd !== i)
                return !1;
            if (this.startNote.beat.id !== e.beat.id)
                return !1;
            if (this.endNote.beat.id !== t.beat.id)
                return !1;
            if (this._direction !== zn.getBeamDirectionForNote(e))
                return !1;
            switch (this._direction) {
            case Ut.Up:
                e.realValue > this.startNote.realValue && (this.startNote = e,
                this.startBeat = e.beat),
                t.realValue > this.endNote.realValue && (this.endNote = t,
                this.endBeat = t.beat);
                break;
            case Ut.Down:
                e.realValue < this.startNote.realValue && (this.startNote = e,
                this.startBeat = e.beat),
                t.realValue < this.endNote.realValue && (this.endNote = t,
                this.endBeat = t.beat)
            }
            return !0
        }
        paint(e, t, s) {
            let i = this.renderer.scoreRenderer.layout.getRendererForBar(this.renderer.staffRenderer.staveId, this.startBeat.voice.bar)
              , n = this.getBeamDirection(this.startBeat, i)
              , r = "tab.slur." + this.startNote.beat.id + "." + this.endNote.beat.id + "." + n
              , a = this.renderer;
            a.staffRenderer.getSharedLayoutData(r, !1) || (a.staffRenderer.setSharedLayoutData(r, !0),
            super.paint(e, t, s))
        }
    }
    class Xn extends Ri {
        constructor(e, t) {
            super(e, t),
            this._bend = null,
            this._effectSlurs = []
        }
        doLayout() {
            this._effectSlurs = [],
            super.doLayout(),
            this._bend && (this._bend.renderer = this.renderer,
            this._bend.doLayout(),
            this.updateWidth())
        }
        createTies(e) {
            if (!e.isVisible)
                return;
            if (e.beat.brushType !== c.None && e !== e.beat.maxStringNote)
                return;
            let t = this.renderer;
            if (e.isTieOrigin && t.showTiedNotes && e.tieDestination && e.tieDestination.isVisible) {
                let t = new zn(e,e.tieDestination,!1);
                this.ties.push(t)
            }
            if (e.isTieDestination && t.showTiedNotes) {
                let t = new zn(e.tieOrigin,e,!0);
                this.ties.push(t)
            }
            if (e.isLeftHandTapped && !e.isHammerPullDestination) {
                let t = new zn(e,e,!1);
                this.ties.push(t)
            }
            if (e.isEffectSlurOrigin && e.effectSlurDestination) {
                let t = !1;
                for (let s of this._effectSlurs)
                    if (s.tryExpand(e, e.effectSlurDestination, !1, !1)) {
                        t = !0;
                        break
                    }
                if (!t) {
                    let t = new Un(e,e.effectSlurDestination,!1,!1);
                    this._effectSlurs.push(t),
                    this.ties.push(t)
                }
            }
            if (e.isEffectSlurDestination && e.effectSlurOrigin) {
                let t = !1;
                for (let s of this._effectSlurs)
                    if (s.tryExpand(e.effectSlurOrigin, e, !1, !0)) {
                        t = !0;
                        break
                    }
                if (!t) {
                    let t = new Un(e.effectSlurOrigin,e,!1,!0);
                    this._effectSlurs.push(t),
                    this.ties.push(t)
                }
            }
            if (e.slideInType !== f.None || e.slideOutType !== m.None) {
                let t = new Vn(e.slideInType,e.slideOutType,e,this);
                this.ties.push(t)
            }
            if (e.hasBend) {
                if (!this._bend) {
                    const e = new An;
                    this._bend = e,
                    e.renderer = this.renderer,
                    this.ties.push(e)
                }
                this._bend.addBends(e)
            }
        }
    }
    class Yn extends ui {
        constructor(e, t, s) {
            super(e, t),
            this._size = 0,
            this._size = s
        }
        doLayout() {
            this.width = this._size + 3 * this.scale
        }
        paint(e, t, s) {
            s.fillCircle(e + this.x, t + this.y, this._size)
        }
    }
    class Jn extends ui {
        constructor(e, t, s) {
            super(e, t),
            this._noteString = null,
            this._trillNoteString = null,
            this._trillNoteStringWidth = 0,
            this.isEmpty = !1,
            this.noteStringWidth = 0,
            this._note = s
        }
        doLayout() {
            let t = this._note
              , s = t.fret - t.beat.voice.bar.staff.transpositionPitch;
            if (t.harmonicType === M.Natural && 0 !== t.harmonicValue && (s = t.harmonicValue - t.beat.voice.bar.staff.transpositionPitch),
            this.renderer.settings.notation.displayTiedNotes || !t.isTieDestination) {
                if (this._noteString = t.isDead ? "x" : (i = t,
                this.renderer.settings.notation.avoidInChordFretNumber && $i(i) ? "x" : i.fret.toString()),
                t.isGhost)
                    this._noteString = "(" + this._noteString + ")";
                else if (t.harmonicType === M.Natural) {
                    let e = this._noteString.indexOf(String.fromCharCode(46));
                    e >= 0 && (this._noteString = this._noteString.substr(0, e + 2)),
                    this._noteString = "<" + this._noteString + ">"
                }
            } else
                0 === t.beat.index && this.renderer.settings.notation.notationMode == B.GuitarPro || (t.bendType === l.Bend || t.bendType === l.BendRelease) && this.renderer.settings.notation.isNotationElementVisible(e.NotationElement.TabNotesOnTiedBends) ? this._noteString = "(" + (t.tieOrigin.fret - t.beat.voice.bar.staff.transpositionPitch).toString() + ")" : this._noteString = "";
            var i;
            if (t.isTrill)
                this._trillNoteString = "(" + (t.trillFret - t.beat.voice.bar.staff.transpositionPitch).toString() + ")";
            else if (ht.isAlmostEqualTo(t.harmonicValue, 0))
                this._trillNoteString = "";
            else
                switch (t.harmonicType) {
                case M.Artificial:
                case M.Pinch:
                case M.Tap:
                case M.Semi:
                case M.Feedback:
                    let e = (s + t.harmonicValue).toString()
                      , i = e.indexOf(String.fromCharCode(46));
                    i >= 0 && (e = e.substr(0, i + 2)),
                    this._trillNoteString = "<" + e + ">";
                    break;
                default:
                    this._trillNoteString = ""
                }
            if (this.isEmpty = !this._noteString,
            !this.isEmpty) {
                this.renderer.scoreRenderer.canvas.font = this.renderer.resources.tablatureFont,
                this.noteStringWidth = this.renderer.scoreRenderer.canvas.measureText(this._noteString) * this.scale,
                this.width = this.noteStringWidth,
                this.height = this.renderer.scoreRenderer.canvas.font.size,
                !!this._trillNoteString && (this.renderer.scoreRenderer.canvas.font = this.renderer.resources.graceFont,
                this._trillNoteStringWidth = 3 * this.scale + this.renderer.scoreRenderer.canvas.measureText(this._trillNoteString),
                this.width += this._trillNoteStringWidth)
            }
        }
        paint(e, t, s) {
            if (this.isEmpty)
                return;
            let i = this.noteStringWidth + this._trillNoteStringWidth
              , n = e + this.x + (this.width - i) / 2
              , r = this.renderer.scoreRenderer.canvas.font;
            const a = s.color;
            this._note.isTieDestination && this._note.isVisible && (s.color = this.renderer.resources.tieDestinationColor),
            this.renderer.scoreRenderer.canvas.font = this.renderer.resources.graceFont,
            s.fillText(this._trillNoteString, n + this.noteStringWidth + 3 * this.scale, t + this.y),
            this.renderer.scoreRenderer.canvas.font = r,
            "x" === this._noteString ? this.panitX(n, t + this.y - i / 2, i, s) : s.fillText(this._noteString, n, t + this.y),
            s.color = a
        }
        buildBoundingsLookup(e, t, s) {
            let i = new ps;
            i.note = this._note,
            i.noteHeadBounds = new ss,
            i.noteHeadBounds.x = t + this.x,
            i.noteHeadBounds.y = s + this.y - this.height / 2,
            i.noteHeadBounds.w = this.width,
            i.noteHeadBounds.h = this.height,
            this.renderer.scoreRenderer.boundsLookup.addNote(i)
        }
        panitX(e, t, s, i) {
            i.moveTo(e, t),
            i.lineTo(e + s, t + s),
            i.moveTo(e + s, t),
            i.lineTo(e, t + s),
            i.stroke()
        }
    }
    class qn extends ui {
        constructor(e, t, s) {
            super(e, t),
            this._notes = [],
            this.minStringNote = null,
            this.beatEffects = new Map,
            this.notesPerString = new Map,
            this.noteStringWidth = 0,
            this._isGrace = s
        }
        buildBoundingsLookup(e, t, s) {
            for (const i of this._notes)
                i.buildBoundingsLookup(e, t + this.x, s + this.y)
        }
        getNoteX(e, t) {
            if (this.notesPerString.has(e.string)) {
                let s = this.notesPerString.get(e.string)
                  , i = this.x + s.x;
                switch (t) {
                case ci.Left:
                    break;
                case ci.Center:
                    Qi(e.beat, this.renderer.settings.notation.avoidInChordFretNumber) || (i += s.noteStringWidth / 2);
                    break;
                case ci.Right:
                    i += s.width
                }
                return i
            }
            return 0
        }
        getNoteY(e, t) {
            if (this.notesPerString.has(e.string)) {
                const s = this.notesPerString.get(e.string);
                let i = this.y + s.y;
                switch (t) {
                case li.Top:
                case li.TopWithStem:
                    i -= s.height / 2;
                    break;
                case li.Center:
                    break;
                case li.Bottom:
                case li.BottomWithStem:
                    i += s.height / 2
                }
                return i
            }
            return 0
        }
        doLayout() {
            let e = 0
              , t = 0;
            for (let s = 0, i = this._notes.length; s < i; s++) {
                let i = this._notes[s];
                i.renderer = this.renderer,
                i.doLayout(),
                i.width > e && (e = i.width),
                i.noteStringWidth > t && (t = i.noteStringWidth)
            }
            this.noteStringWidth = t;
            let s = this.renderer.resources.tablatureFont.size
              , i = this.getNoteY(this.minStringNote, li.Center) + s / 2
              , n = 7 * this.scale;
            for (const e of this.beatEffects.values())
                e.y += i,
                e.x += this.width / 2,
                e.renderer = this.renderer,
                i += n,
                e.doLayout();
            this.width = e
        }
        addNoteGlyph(e, t) {
            const s = Qi(t.beat, e.renderer.settings.notation.avoidInChordFretNumber);
            t.beat.brushType && s || this._notes.push(e),
            this.notesPerString.set(t.string, e),
            (!this.minStringNote || t.string < this.minStringNote.string) && (this.minStringNote = t)
        }
        paint(e, t, s) {
            e += this.x,
            t += this.y;
            let i = this.renderer.resources
              , n = s.textBaseline;
            s.textBaseline = G.Middle,
            s.font = this._isGrace ? i.graceFont : i.tablatureFont;
            let r = this._notes
              , a = Math.max(this.width, 4);
            for (let i of r)
                i.renderer = this.renderer,
                i.width = a,
                i.paint(e, t, s);
            s.textBaseline = n;
            for (const i of this.beatEffects.values())
                i.paint(e, t, s);
            let o = !1;
            for (const e of this.beat.notes)
                e.accentuated && (o = !0);
            if (o && (s.beginPath(),
            s.moveTo(e - a * this.scale, t - 7 * this.scale),
            s.lineTo(e + a * this.scale, t - 4 * this.scale),
            s.lineTo(e - a * this.scale, t - 1 * this.scale),
            s.stroke()),
            this.beat.brushType)
                return;
            let h = !1;
            for (const e of this.beat.notes)
                e.isDead && e.fret >= 0 && (h = !0);
            if (h) {
                const i = this.renderer
                  , n = i.getNoteY(this.beat.maxStringNote, li.Bottom) - i.getNoteY(this.beat.maxStringNote, li.Top)
                  , r = t + this.y + i.getNoteY(this.beat.maxStringNote, li.Top) + n / 4
                  , o = t + this.y + i.getNoteY(this.beat.minStringNote, li.Bottom)
                  , h = 2 * this.scale;
                s.strokeRect(e - h, r - h, a + 2 * h, o - r + h)
            }
        }
        updateBeamingHelper(e) {
            this.beamingHelper && this.beamingHelper.isPositionFrom("tab", this.beat) && this.beamingHelper.registerBeatLineX("tab", this.beat, e + this.x + this.width / 2, e + this.x + this.width / 2)
        }
    }
    class Qn extends Ei {
        constructor(e, t, s) {
            super(e, t, 1, Qn.getSymbol(s)),
            this._duration = s
        }
        static getSymbol(e) {
            switch (e) {
            case d.QuadrupleWhole:
                return I.RestLonga;
            case d.DoubleWhole:
                return I.RestDoubleWhole;
            case d.Whole:
                return I.RestWhole;
            case d.Half:
                return I.RestHalf;
            case d.Quarter:
                return I.RestQuarter;
            case d.Eighth:
                return I.RestEighth;
            case d.Sixteenth:
                return I.RestSixteenth;
            case d.ThirtySecond:
                return I.RestThirtySecond;
            case d.SixtyFourth:
                return I.RestSixtyFourth;
            case d.OneHundredTwentyEighth:
                return I.RestOneHundredTwentyEighth;
            case d.TwoHundredFiftySixth:
                return I.RestTwoHundredFiftySixth;
            default:
                return I.None
            }
        }
        static getSize(e) {
            switch (e) {
            case d.QuadrupleWhole:
            case d.DoubleWhole:
            case d.Whole:
            case d.Half:
            case d.Quarter:
            case d.Eighth:
            case d.Sixteenth:
                return 9;
            case d.ThirtySecond:
                return 12;
            case d.SixtyFourth:
                return 14;
            case d.OneHundredTwentyEighth:
            case d.TwoHundredFiftySixth:
                return 20
            }
            return 10
        }
        doLayout() {
            this.width = Qn.getSize(this._duration) * this.scale
        }
        updateBeamingHelper(e) {
            this.beamingHelper && this.beamingHelper.registerBeatLineX("score", this.beat, e + this.x + this.width / 2, e + this.x + this.width / 2)
        }
    }
    class $n extends Ei {
        constructor(e, t, s, i) {
            super(e, t, 1, Qn.getSymbol(i)),
            this._isVisibleRest = s,
            this._duration = i
        }
        doLayout() {
            this._isVisibleRest ? this.width = Qn.getSize(this._duration) * this.scale : this.width = 10 * this.scale
        }
        updateBeamingHelper(e) {
            this.beamingHelper && this.beamingHelper.isPositionFrom("tab", this.beat) && this.beamingHelper.registerBeatLineX("tab", this.beat, e + this.x + this.width / 2, e + this.x + this.width / 2)
        }
        paint(e, t, s) {
            this._isVisibleRest && super.paint(e, t, s)
        }
    }
    class Kn extends ui {
        constructor(e) {
            super(0, 0),
            this._isSimpleDip = !1,
            this._beat = e,
            this._renderPoints = this.createRenderingPoints(e)
        }
        createRenderingPoints(e) {
            if (e.whammyBarType === S.Custom)
                return e.whammyBarPoints;
            let t = [];
            switch (e.whammyBarType) {
            case S.Dive:
            case S.Hold:
            case S.PrediveDive:
            case S.Predive:
                t.push(new ye(0,e.whammyBarPoints[0].value)),
                t.push(new ye(ye.MaxPosition,e.whammyBarPoints[1].value));
                break;
            case S.Dip:
                t.push(new ye(0,e.whammyBarPoints[0].value)),
                t.push(new ye(ye.MaxPosition / 2 | 0,e.whammyBarPoints[1].value)),
                t.push(new ye(ye.MaxPosition,e.whammyBarPoints[e.whammyBarPoints.length - 1].value))
            }
            return t
        }
        doLayout() {
            super.doLayout(),
            this._isSimpleDip = this.renderer.settings.notation.notationMode === B.SongBook && this._beat.whammyBarType === S.Dip;
            let t = null
              , s = null
              , i = this._beat;
            for (; i && i.hasWhammyBar; )
                (!t || t.value > i.minWhammyPoint.value) && (t = i.minWhammyPoint),
                (!s || s.value < i.maxWhammyPoint.value) && (s = i.maxWhammyPoint),
                i = i.nextBeat;
            let n = s.value > 0 ? Math.abs(this.getOffset(s.value)) : 0;
            (n > 0 || 0 !== this._beat.whammyBarPoints[0].value || this.renderer.settings.notation.isNotationElementVisible(e.NotationElement.ZerosOnDiveWhammys)) && (n += 2 * this.renderer.resources.tablatureFont.size);
            let r = t.value < 0 ? Math.abs(this.getOffset(t.value)) : 0;
            this.renderer.registerOverflowTop(n + r),
            n > this.renderer.staffRenderer.getSharedLayoutData(Kn.TopOffsetSharedDataKey, -1) && this.renderer.staffRenderer.setSharedLayoutData(Kn.TopOffsetSharedDataKey, n)
        }
        getOffset(e) {
            if (0 === e)
                return 0;
            let t = Kn.PerHalfSize * this.scale + Math.log2(Math.abs(e) / 2) * Kn.PerHalfSize * this.scale;
            return e < 0 && (t = -t),
            t
        }
        paint(e, t, s) {
            let i = this.renderer
              , n = this._beat.nextBeat
              , r = null
              , a = hi.PreNotes;
            n && (r = this.renderer.scoreRenderer.layout.getRendererForBar(this.renderer.staffRenderer.staveId, n.voice.bar),
            r && r.staffRenderer === i.staffRenderer && (r === i || n.hasWhammyBar) ? a = !n.hasWhammyBar || i.settings.notation.notationMode === B.SongBook && n.whammyBarType === S.Dip ? hi.PreNotes : hi.MiddleNotes : (n = null,
            r = null));
            let o = 0
              , l = 0;
            this._isSimpleDip ? (o = e + i.x + i.getBeatX(this._beat, hi.OnNotes) - 2 * this.scale,
            l = e + i.x + i.getBeatX(this._beat, hi.PostNotes) + 2 * this.scale) : (o = e + i.x + i.getBeatX(this._beat, hi.MiddleNotes),
            l = r ? e + r.x + r.getBeatX(n, a) : e + i.x + i.width - 2 * this.scale);
            let c = s.textAlign;
            if (s.textAlign = A.Center,
            this._renderPoints.length >= 2) {
                let e = (l - o) / ye.MaxPosition;
                s.beginPath();
                let i = t + this.renderer.staffRenderer.getSharedLayoutData(Kn.TopOffsetSharedDataKey, 0)
                  , n = this._beat.whammyStyle === h.Gradual ? "grad." : "";
                for (let t = 0, r = this._renderPoints.length - 1; t < r; t++) {
                    let a = this._renderPoints[t]
                      , h = this._renderPoints[t + 1]
                      , l = t < r - 2 ? this._renderPoints[t + 2] : null
                      , c = 0 === t;
                    0 !== t || 0 === a.value || this._beat.isContinuedWhammy || (this.paintWhammy(!1, new ye(0,0), a, h, o, i, e, s),
                    c = !1),
                    this.paintWhammy(c, a, h, l, o, i, e, s, n),
                    n = ""
                }
                s.stroke()
            }
            s.textAlign = c
        }
        paintWhammy(t, s, i, n, r, a, o, h, l) {
            let c = r + o * s.offset
              , d = r + o * i.offset
              , u = a - this.getOffset(s.value)
              , p = a - this.getOffset(i.value);
            if (s.offset === i.offset) {
                let e = Kn.DashSize * this.scale;
                if (Math.abs(p - u) / (2 * e) < 1)
                    h.moveTo(c, u),
                    h.lineTo(d, p);
                else {
                    let t = Math.max(u, p)
                      , s = Math.min(u, p);
                    for (; t > s; )
                        h.moveTo(c, s),
                        h.lineTo(c, s + e),
                        s += 2 * e
                }
                h.stroke()
            } else if (s.value === i.value) {
                let e = Kn.DashSize * this.scale;
                if (Math.abs(d - c) / (2 * e) < 1)
                    h.moveTo(c, u),
                    h.lineTo(d, p);
                else {
                    let t = Math.max(c, d)
                      , s = Math.min(c, d);
                    for (; t > s; )
                        h.moveTo(t, u),
                        h.lineTo(t - e, u),
                        t -= 2 * e
                }
                h.stroke()
            } else
                h.moveTo(c, u),
                h.lineTo(d, p);
            let g = this.renderer.resources;
            if (t && !this._beat.isContinuedWhammy && !this._isSimpleDip) {
                let t = u;
                t -= g.tablatureFont.size + 2 * this.scale,
                this.renderer.settings.notation.isNotationElementVisible(e.NotationElement.ZerosOnDiveWhammys) && h.fillText("0", c, t),
                l && (t -= g.tablatureFont.size + 2 * this.scale,
                h.fillText(l, c, t))
            }
            let f = Math.abs(i.value);
            if ((0 !== f || this.renderer.settings.notation.isNotationElementVisible(e.NotationElement.ZerosOnDiveWhammys) && !this._isSimpleDip) && s.value !== i.value) {
                let e = "";
                if (i.value < 0 && (e += "-"),
                f >= 4) {
                    let t = f / 4 | 0;
                    e += t,
                    f -= 4 * t
                } else
                    0 === f && (e += "0");
                f > 0 && (e += An.getFractionSign(f));
                let t = 0;
                this._isSimpleDip ? t = Math.min(u, p) - g.tablatureFont.size - 2 * this.scale : (t = s.offset === i.offset ? Math.min(u, p) : p,
                t -= g.tablatureFont.size + 2 * this.scale,
                n && n.value > i.value && (t -= 2 * this.scale));
                let r = d;
                h.fillText(e, r, t)
            }
        }
    }
    Kn.TopOffsetSharedDataKey = "tab.whammy.topoffset",
    Kn.PerHalfSize = 6,
    Kn.DashSize = 3;
    class jn extends Ei {
        constructor(e, t, s) {
            super(e, t, 1, jn.getSymbol(s))
        }
        doLayout() {
            this.width = 12 * this.scale
        }
        static getSymbol(e) {
            switch (e) {
            case d.ThirtySecond:
                return I.Tremolo3;
            case d.Sixteenth:
                return I.Tremolo2;
            case d.Eighth:
                return I.Tremolo1;
            default:
                return I.None
            }
        }
    }
    class Zn extends Ii {
        constructor() {
            super(...arguments),
            this.noteNumbers = null,
            this.restGlyph = null
        }
        getNoteX(e, t) {
            return this.noteNumbers ? this.noteNumbers.getNoteX(e, t) : 0
        }
        getNoteY(e, t) {
            return this.noteNumbers ? this.noteNumbers.getNoteY(e, t) : 0
        }
        buildBoundingsLookup(e, t, s) {
            this.noteNumbers && this.noteNumbers.buildBoundingsLookup(e, t + this.x, s + this.y)
        }
        doLayout() {
            let e = this.renderer;
            if (this.container.beat.isRest) {
                let t = Math.floor((this.renderer.bar.staff.tuning.length - 1) / 2)
                  , s = e.getTabY(t);
                const i = new $n(0,s,e.showRests,this.container.beat.duration);
                if (this.restGlyph = i,
                i.beat = this.container.beat,
                i.beamingHelper = this.beamingHelper,
                this.addGlyph(i),
                this.container.beat.dots > 0 && e.showRests) {
                    this.addGlyph(new On(0,0,3 * this.scale));
                    for (let e = 0; e < this.container.beat.dots; e++)
                        this.addGlyph(new Yn(0,s,1.5 * this.scale))
                }
            } else {
                let t = this.renderer.settings.notation.smallGraceTabNotes && this.container.beat.graceType !== p.None;
                const s = new qn(0,0,t);
                this.noteNumbers = s,
                s.beat = this.container.beat,
                s.beamingHelper = this.beamingHelper;
                for (let e of this.container.beat.notes)
                    e.isVisible && this.createNoteGlyph(e);
                if (this.addGlyph(s),
                this.container.beat.hasWhammyBar) {
                    let e = new Kn(this.container.beat);
                    e.renderer = this.renderer,
                    e.doLayout(),
                    this.container.ties.push(e)
                }
                if (this.container.beat.isTremolo && !this.noteNumbers.beatEffects.has("tremolo")) {
                    let e = 0
                      , t = this.container.beat.tremoloSpeed;
                    switch (t) {
                    case d.ThirtySecond:
                        e = 10;
                        break;
                    case d.Sixteenth:
                        e = 5;
                        break;
                    case d.Eighth:
                        e = 0
                    }
                    this.noteNumbers.beatEffects.set("tremolo", new jn(5 * this.scale,e * this.scale,t))
                }
                if (this.container.beat.dots > 0 && e.settings.notation.rhythmMode !== w.Hidden) {
                    this.addGlyph(new On(0,0,3 * this.scale));
                    for (let t = 0; t < this.container.beat.dots; t++)
                        this.addGlyph(new Yn(0,e.lineOffset * e.bar.staff.tuning.length + e.settings.notation.rhythmHeight * e.scale,1.5 * this.scale))
                }
            }
            if (!this.glyphs)
                return;
            let t = 0;
            for (let e = 0, s = this.glyphs.length; e < s; e++) {
                let s = this.glyphs[e];
                s.x = t,
                s.renderer = this.renderer,
                s.doLayout(),
                t += s.width
            }
            this.width = t,
            this.container.beat.isEmpty ? this.centerX = this.width / 2 : this.container.beat.isRest ? this.centerX = this.restGlyph.x + this.restGlyph.width / 2 : this.centerX = this.noteNumbers.x + this.noteNumbers.noteStringWidth / 2;
            let s = !1;
            for (const e of this.container.beat.notes)
                e.isStaccato && (s = !0);
            if (s) {
                const t = this.x + this.width / 2;
                this.addGlyph(new Yn(t,e.getTabY(0) - 5 * this.scale,1.5 * this.scale))
            }
        }
        updateBeamingHelper() {
            this.container.beat.isRest ? this.restGlyph.updateBeamingHelper(this.container.x + this.x) : this.noteNumbers.updateBeamingHelper(this.container.x + this.x)
        }
        createNoteGlyph(e) {
            let t = this.renderer
              , s = new Jn(0,0,e)
              , i = e.beat.voice.bar.staff.tuning.length - e.string;
            s.y = t.getTabY(i),
            s.renderer = this.renderer,
            s.doLayout(),
            this.noteNumbers.addNoteGlyph(s, e);
            let n = s.y - s.height / 2
              , r = n + s.height;
            this.renderer.helpers.collisionHelper.reserveBeatSlot(this.container.beat, n, r)
        }
    }
    class er extends ui {
        constructor(e, t, s, i, n) {
            super(e, t),
            this._arrowSize = 0,
            this.height = s - i,
            this._arrowSize = i,
            this._brushType = n
        }
        doLayout() {
            this.width = 10 * this.scale
        }
        paint(e, t, s) {
            if (this._brushType === c.ArpeggioUp) {
                s.moveTo(e, t),
                s.lineTo(e, t - this._arrowSize);
                const i = hr.TabLineSpacing / 4 * this.scale
                  , n = Math.round(this.height / (2 * i));
                for (let r = 0; r < n; r++) {
                    const n = r % 2 ? 1 : -1;
                    this.paintArc(e, t - (this._arrowSize + 2 * i * (r + 1)), i, n, s)
                }
            } else {
                s.moveTo(e, t),
                s.lineTo(e, t + this._arrowSize);
                const i = hr.TabLineSpacing / 4 * this.scale
                  , n = Math.round(this.height / (2 * i));
                for (let r = 0; r < n; r++) {
                    const n = r % 2 ? 1 : -1;
                    this.paintArc(e, t + this._arrowSize + 2 * i * r, i, n, s)
                }
            }
        }
        paintArc(e, t, s, i, n) {
            const r = e + i * s * .75
              , a = t + .75 * s
              , o = e + i * s * .75
              , h = t + 1.25 * s
              , l = t + 2 * s;
            n.beginPath(),
            n.moveTo(e, t),
            n.bezierCurveTo(r, a, o, h, e, l),
            n.stroke()
        }
    }
    class tr extends ui {
        constructor(e) {
            super(0, 0),
            this._beat = e
        }
        doLayout() {
            this.width = 10 * this.scale
        }
        paint(e, t, s) {
            let i = this.renderer;
            const n = i.getNoteY(this._beat.maxStringNote, li.Bottom) - i.getNoteY(this._beat.maxStringNote, li.Top);
            let r = t + this.y + i.getNoteY(this._beat.maxStringNote, li.Top) + n / 4
              , a = t + this.y + i.getNoteY(this._beat.minStringNote, li.Bottom) - n / 4
              , o = e + this.x + this.width / 2
              , h = 8 * this.scale;
            if (this._beat.brushType !== c.None) {
                if (this._beat.brushType === c.BrushUp || this._beat.brushType === c.BrushDown)
                    s.beginPath(),
                    s.moveTo(o, r),
                    s.lineTo(o, a),
                    s.stroke();
                else if (this._beat.brushType === c.ArpeggioUp)
                    if (this.renderer.settings.display.slim)
                        this.paintSlimNoteVibratoGlyph(o, a, Math.abs(a - r), h, this._beat.brushType, s);
                    else {
                        let t = new Hn(0,0,b.Slight,1.2,!0);
                        t.renderer = this.renderer,
                        t.doLayout();
                        let i = r
                          , n = a - h;
                        t.width = Math.abs(n - i),
                        s.beginRotate(e + this.x, n, -90),
                        t.paint(0, -t.height / 2, s),
                        s.endRotate()
                    }
                else if (this._beat.brushType === c.ArpeggioDown)
                    if (this.renderer.settings.display.slim)
                        this.paintSlimNoteVibratoGlyph(o, r, Math.abs(a - r), h, this._beat.brushType, s);
                    else {
                        let t = new Hn(0,0,b.Slight,1.2,!0);
                        t.renderer = this.renderer,
                        t.doLayout();
                        let i = r + h
                          , n = a;
                        t.width = Math.abs(n - i),
                        s.beginRotate(e + this.x, i, 90),
                        t.paint(0, -t.height / 2, s),
                        s.endRotate()
                    }
                this.renderer.settings.display.slim ? this._beat.brushType === c.BrushUp || this._beat.brushType === c.ArpeggioUp ? (s.moveTo(o - h / 2, a - h),
                s.lineTo(o, a),
                s.lineTo(o + h / 2, a - h),
                s.stroke()) : (s.moveTo(o - h / 2, r + h),
                s.lineTo(o, r),
                s.lineTo(o + h / 2, r + h),
                s.stroke()) : this._beat.brushType === c.BrushUp || this._beat.brushType === c.ArpeggioUp ? (s.beginPath(),
                s.moveTo(o, a),
                s.lineTo(o + h / 2, a - h),
                s.lineTo(o - h / 2, a - h),
                s.closePath(),
                s.fill()) : (s.beginPath(),
                s.moveTo(o, r),
                s.lineTo(o + h / 2, r + h),
                s.lineTo(o - h / 2, r + h),
                s.closePath(),
                s.fill())
            }
        }
        paintSlimNoteVibratoGlyph(e, t, s, i, n, r) {
            let a = new er(0,0,s,i,n);
            a.renderer = this.renderer,
            a.doLayout(),
            a.paint(e, t, r)
        }
    }
    class sr extends Oi {
        doLayout() {
            const e = this.container.beat;
            if (e.brushType === c.None && e.notes.length > 0) {
                const t = e.notes[0].tieOrigin;
                t && t.beat.brushType !== c.None && (e.brushType = t.beat.brushType)
            }
            e.brushType === c.None || e.isRest || (this.addGlyph(new tr(e)),
            this.addGlyph(new On(0,0,4 * this.scale))),
            Qi(e, this.renderer.settings.notation.avoidInChordFretNumber) || super.doLayout()
        }
        constructor() {
            super()
        }
    }
    class ir extends ui {
        constructor(e, t) {
            super(e, t)
        }
        doLayout() {
            this.width = 28 * this.scale
        }
        paint(e, t, s) {
            let i = this.renderer.bar.staff.tuning.length
              , n = i <= 4 ? I.FourStringTabClef : I.SixStringTabClef
              , r = i <= 4 ? i / 4.5 : i / 6.5;
            s.fillMusicFontSymbol(e + this.x + 5 * this.scale, t + this.y, r * this.scale, n, !1)
        }
    }
    class nr extends Ei {
        constructor(e, t, s, i) {
            super(e, t, i, nr.getSymbol(s)),
            this._digit = 0,
            this._scale = 0,
            this._digit = s,
            this._scale = i
        }
        doLayout() {
            this.width = this.getDigitWidth(this._digit) * this.scale * this._scale
        }
        getDigitWidth(e) {
            switch (e) {
            case 0:
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
            case 7:
            case 8:
            case 9:
                return 14;
            case 1:
                return 10;
            default:
                return 0
            }
        }
        static getSymbol(e) {
            switch (e) {
            case 0:
                return I.TimeSig0;
            case 1:
                return I.TimeSig1;
            case 2:
                return I.TimeSig2;
            case 3:
                return I.TimeSig3;
            case 4:
                return I.TimeSig4;
            case 5:
                return I.TimeSig5;
            case 6:
                return I.TimeSig6;
            case 7:
                return I.TimeSig7;
            case 8:
                return I.TimeSig8;
            case 9:
                return I.TimeSig9;
            default:
                return I.None
            }
        }
    }
    class rr extends pi {
        constructor(e, t, s, i=1) {
            super(e, t),
            this._number = 0,
            this._scale = 0,
            this._number = s,
            this._scale = i
        }
        doLayout() {
            let e = this._number;
            for (; e > 0; ) {
                let t = new nr(0,0,e % 10,this._scale);
                this.addGlyph(t),
                e = e / 10 | 0
            }
            if (this.glyphs) {
                this.glyphs.reverse();
                let e = 0;
                for (let t = 0, s = this.glyphs.length; t < s; t++) {
                    let s = this.glyphs[t];
                    s.x = e,
                    s.y = 0,
                    s.renderer = this.renderer,
                    s.doLayout(),
                    e += s.width
                }
                this.width = e
            }
        }
    }
    rr.numberHeight = 18;
    class ar extends pi {
        constructor(e, t, s, i, n) {
            super(e, t),
            this._numerator = 0,
            this._denominator = 0,
            this._numerator = s,
            this._denominator = i,
            this._isCommon = n
        }
        doLayout() {
            if (this._isCommon && 2 === this._numerator && 2 === this._denominator) {
                let e = new Ei(0,0,this.commonScale,I.TimeSigCutCommon);
                e.width = 14 * this.scale,
                this.addGlyph(e),
                super.doLayout()
            } else if (this._isCommon && 4 === this._numerator && 4 === this._denominator) {
                let e = new Ei(0,0,this.commonScale,I.TimeSigCommon);
                e.width = 14 * this.scale,
                this.addGlyph(e),
                super.doLayout()
            } else {
                const e = rr.numberHeight * this.scale * this.numberScale;
                let t = new rr(0,-e / 2,this._numerator,this.numberScale)
                  , s = new rr(0,e / 2,this._denominator,this.numberScale);
                this.addGlyph(t),
                this.addGlyph(s),
                super.doLayout();
                for (let e = 0, t = this.glyphs.length; e < t; e++) {
                    let t = this.glyphs[e];
                    t.x = (this.width - t.width) / 2
                }
            }
        }
    }
    class or extends ar {
        get commonScale() {
            return 1
        }
        get numberScale() {
            return this.renderer.bar.staff.tuning.length <= 4 ? Mi.GraceScale : 1
        }
        paint(e, t, s) {
            const i = s.color;
            s.color = this.renderer.resources.staffLineColor,
            super.paint(e, t, s),
            s.color = i
        }
    }
    class hr extends xi {
        constructor(e, t) {
            super(e, t),
            this._firstLineY = 0,
            this._tupletSize = 0,
            this.showTimeSignature = !1,
            this.showRests = !1,
            this.showTiedNotes = !1
        }
        get lineOffset() {
            return (hr.TabLineSpacing + 1) * this.scale
        }
        updateSizes() {
            this.updateFirstLineY(),
            this.bottomPadding = 0,
            this.settings.notation.rhythmMode !== w.Hidden && (this.bottomPadding += (this.settings.notation.rhythmHeight + 5) * this.scale),
            this.height = this.lineOffset * (this.bar.staff.tuning.length - 1) + this.scale + this.topPadding + this.bottomPadding,
            super.updateSizes()
        }
        updateFirstLineY() {
            this.topPadding = hr.PaddingTop * this.scale,
            this._firstLineY = this.topPadding
        }
        doLayout() {
            if (this.updateFirstLineY(),
            super.doLayout(),
            this.settings.notation.rhythmMode !== w.Hidden) {
                let e = !1;
                for (let t of this.bar.voices)
                    if (this.hasVoiceContainer(t)) {
                        if (this.getVoiceContainer(t).tupletGroups.length > 0) {
                            e = !0;
                            break
                        }
                    }
                e && (this._tupletSize = 5 * this.scale,
                this.registerOverflowBottom(this._tupletSize))
            }
            this.registerOverflowBottom(hr.PaddingBottom * this.scale)
        }
        createPreBeatGlyphs() {
            if (super.createPreBeatGlyphs(),
            this.bar.masterBar.isRepeatStart && this.addPreBeatGlyph(new Rn(0,0,1.5,3)),
            this.isFirstOfLine)
                if (this.settings.display.hideTabHead)
                    this.settings.display.rowCount > 0 && this.addPreBeatGlyph(new On(0,0,10 * this.scale));
                else {
                    let e = (this.bar.staff.tuning.length - 1) / 2;
                    this.addPreBeatGlyph(new ir(5 * this.scale,this.getTabY(e)))
                }
            const t = this.getBarNumber();
            t ? this.addPreBeatGlyph(new Cn(4 * this.scale,this.getTabHeight(1) + 5 * this.scale,t)) : this.addPreBeatGlyph(new On(0,0,10 * this.scale)),
            this.showTimeSignature && this.settings.notation.isNotationElementVisible(e.NotationElement.TimeSignature) && (!this.bar.previousBar || this.bar.previousBar && this.bar.masterBar.timeSignatureNumerator !== this.bar.previousBar.masterBar.timeSignatureNumerator || this.bar.previousBar && this.bar.masterBar.timeSignatureDenominator !== this.bar.previousBar.masterBar.timeSignatureDenominator) && (this.createTimeSignatureGlyphs(),
            this.addPreBeatGlyph(new On(0,0,10 * this.scale)))
        }
        createTimeSignatureGlyphs() {
            const e = (this.bar.staff.tuning.length + 1) / 2 - 1;
            this.addPreBeatGlyph(new or(-4 * this.scale,this.getTabY(e),this.bar.masterBar.timeSignatureNumerator,this.bar.masterBar.timeSignatureDenominator,this.bar.masterBar.timeSignatureCommon))
        }
        createVoiceGlyphs(e) {
            for (let t = 0, s = e.beats.length; t < s; t++) {
                let s = e.beats[t]
                  , i = new Xn(s,this.getVoiceContainer(e));
                i.preNotes = new sr,
                i.onNotes = new Zn,
                this.addBeatGlyph(i)
            }
        }
        createPostBeatGlyphs() {
            super.createPostBeatGlyphs(),
            this.bar.masterBar.isRepeatEnd ? (this.addPostBeatGlyph(new Mn(this.x,0)),
            this.bar.masterBar.repeatCount > 2 && this.addPostBeatGlyph(new Dn(0,this.getTabY(-1),this.bar.masterBar.repeatCount))) : this.addPostBeatGlyph(new Ln(0,0))
        }
        getTabY(e) {
            return this._firstLineY + this.getTabHeight(e)
        }
        getTabHeight(e) {
            return this.lineOffset * e
        }
        get middleYPosition() {
            return this.getTabY(this.bar.staff.tuning.length - 1)
        }
        paintBackground(e, t, s) {
            super.paintBackground(e, t, s);
            let i = this.resources;
            s.color = i.staffLineColor;
            let n = this.scale
              , r = [];
            for (let e = 0, t = this.bar.staff.tuning.length; e < t; e++)
                r.push([]);
            for (let e of this.bar.voices)
                if (this.hasVoiceContainer(e)) {
                    let t = this.getVoiceContainer(e);
                    for (let e of t.beatGlyphs) {
                        let s = e.onNotes
                          , i = s.noteNumbers;
                        if (i)
                            for (const [a,o] of i.notesPerString)
                                o.isEmpty || r[this.bar.staff.tuning.length - a].push(new Float32Array([t.x + e.x + s.x + i.x, i.width + n]))
                    }
                }
            for (let e of r)
                e.sort(( (e, t) => e[0] > t[0] ? 1 : e[0] < t[0] ? -1 : 0));
            for (let i = 0, n = this.bar.staff.tuning.length; i < n; i++) {
                const n = this.getTabY(i);
                let a = 0;
                for (let o of r[i])
                    s.fillRect(e + this.x + a, t + this.y + n, o[0] - a, this.scale * xi.StaffLineThickness),
                    a = o[0] + o[1];
                s.fillRect(e + this.x + a, t + this.y + n, this.width - a, this.scale * xi.StaffLineThickness)
            }
            s.color = i.mainGlyphColor,
            this.paintSimileMark(e, t, s)
        }
        paint(e, t, s) {
            super.paint(e, t, s),
            this.settings.notation.rhythmMode !== w.Hidden && (this.paintBeams(e, t, s),
            this.paintTuplets(e, t, s))
        }
        paintBeams(e, t, s) {
            for (let i = 0, n = this.helpers.beamHelpers.length; i < n; i++) {
                let n = this.helpers.beamHelpers[i];
                for (let i = 0, r = n.length; i < r; i++) {
                    let r = n[i];
                    this.paintBeamHelper(e + this.beatGlyphsStart, t, s, r)
                }
            }
        }
        paintTuplets(e, t, s) {
            for (let i of this.bar.voices)
                if (this.hasVoiceContainer(i)) {
                    let n = this.getVoiceContainer(i);
                    for (let i of n.tupletGroups)
                        this.paintTupletHelper(e + this.beatGlyphsStart, t, s, i)
                }
        }
        paintBeamHelper(e, t, s, i) {
            s.color = 0 === i.voice.index ? this.resources.mainGlyphColor : this.resources.secondaryGlyphColor,
            i.isRestBeamHelper || (1 === i.beats.length || this.settings.notation.rhythmMode === w.ShowWithBeams ? this.paintFooter(e, t, s, i) : this.paintBar(e, t, s, i))
        }
        paintBar(e, t, s, i) {
            for (let n = 0, r = i.beats.length; n < r; n++) {
                let r = i.beats[n];
                if (i.hasBeatLineX(r)) {
                    let a = i.getBeatLineX(r)
                      , o = t + this.y
                      , h = t + this.y + this.height - this._tupletSize
                      , l = this.getOnNotesGlyphForBeat(r);
                    l.noteNumbers && r.duration !== d.Half ? o += l.noteNumbers.getNoteY(l.noteNumbers.minStringNote, li.Bottom) : o += this.height - this.settings.notation.rhythmHeight / 2 * this.settings.display.scale - this._tupletSize,
                    this.paintBeamingStem(r, t + this.y, e + this.x + a, o, h, s);
                    let c = 6 * this.scale
                      , u = (this.settings.display.slim ? -3 : -6) * this.scale
                      , p = (this.settings.display.slim ? 1 : 3) * this.scale
                      , g = ht.getIndex(r.duration) - 2
                      , f = h;
                    for (let t = 0; t < g; t++) {
                        let o = 0
                          , h = 0
                          , l = 0
                          , d = 0
                          , g = f + t * u;
                        if (1 === i.beats.length)
                            o = a,
                            h = a + c,
                            l = g,
                            d = g,
                            hr.paintSingleBar(s, e + this.x + o, l, e + this.x + h, d, p);
                        else if (n < i.beats.length - 1) {
                            if (_i.isFullBarJoin(r, i.beats[n + 1], t))
                                o = a,
                                h = i.getBeatLineX(i.beats[n + 1]);
                            else {
                                if (0 !== n && _i.isFullBarJoin(i.beats[n - 1], r, t))
                                    continue;
                                o = a,
                                h = o + c
                            }
                            l = g,
                            d = g,
                            hr.paintSingleBar(s, e + this.x + o, l, e + this.x + h, d, p)
                        } else
                            n > 0 && !_i.isFullBarJoin(r, i.beats[n - 1], t) && (o = a - c,
                            h = a,
                            l = g,
                            d = g,
                            hr.paintSingleBar(s, e + this.x + o, l, e + this.x + h, d, p))
                    }
                }
            }
        }
        paintTupletHelper(e, t, s, i) {
            let n, r = this.resources, a = s.textAlign, o = s.textBaseline;
            s.color = 0 === i.voice.index ? this.resources.mainGlyphColor : this.resources.secondaryGlyphColor,
            s.textAlign = A.Center,
            s.textBaseline = G.Middle;
            let h = i.beats[0].tupletNumerator
              , l = i.beats[0].tupletDenominator;
            if (n = 2 === h && 3 === l ? "2" : 3 === h && 2 === l ? "3" : 4 === h && 6 === l ? "4" : 5 === h && 4 === l ? "5" : 6 === h && 4 === l ? "6" : 7 === h && 4 === l ? "7" : 9 === h && 8 === l ? "9" : 10 === h && 8 === l ? "10" : 11 === h && 8 === l ? "11" : 12 === h && 8 === l ? "12" : 13 === h && 8 === l ? "13" : h + ":" + l,
            1 !== i.beats.length && i.isFull) {
                let a = i.beats[0]
                  , o = i.beats[i.beats.length - 1]
                  , h = this.helpers.beamHelperLookup[i.voice.index].get(a.index)
                  , l = this.helpers.beamHelperLookup[i.voice.index].get(o.index);
                if (h && l) {
                    let i = h.getBeatLineX(a)
                      , c = l.getBeatLineX(o);
                    s.font = r.effectFont;
                    let d = s.measureText(n)
                      , u = 3 * this.scale
                      , p = (i + c) / 2
                      , g = p - d / 2 - u
                      , f = p + d / 2 + u
                      , m = t + this.y + this.height - this._tupletSize + .5 * r.effectFont.size
                      , y = 0
                      , b = -5 * this.scale;
                    s.beginPath(),
                    s.moveTo(e + this.x + i, m - y),
                    s.lineTo(e + this.x + i, m - y - b),
                    s.lineTo(e + this.x + g, m - y - b),
                    s.stroke(),
                    s.beginPath(),
                    s.moveTo(e + this.x + f, m - y - b),
                    s.lineTo(e + this.x + c, m - y - b),
                    s.lineTo(e + this.x + c, m - y),
                    s.stroke(),
                    s.fillText(n, e + this.x + p, m - y - b)
                }
            } else
                for (let a = 0, o = i.beats.length; a < o; a++) {
                    let o = i.beats[a]
                      , h = this.helpers.beamHelperLookup[i.voice.index].get(o.index);
                    if (!h)
                        continue;
                    let l = h.getBeatLineX(o)
                      , c = t + this.y + this.height - this._tupletSize + .5 * r.effectFont.size;
                    s.font = r.effectFont,
                    s.fillText(n, e + this.x + l, c)
                }
            s.textAlign = a,
            s.textBaseline = o
        }
        static paintSingleBar(e, t, s, i, n, r) {
            e.beginPath(),
            e.moveTo(t, s),
            e.lineTo(i, n),
            e.lineTo(i, n - r),
            e.lineTo(t, s - r),
            e.closePath(),
            e.fill()
        }
        paintBeamingStem(e, t, s, i, n, r) {
            r.beginPath();
            let a = [];
            this.helpers.collisionHelper.reservedLayoutAreasByDisplayTime.has(e.displayStart) && (a = this.helpers.collisionHelper.reservedLayoutAreasByDisplayTime.get(e.displayStart).slots.slice(),
            a.sort(( (e, t) => e.topY - t.topY)));
            let o = n;
            for (; o > i; ) {
                r.moveTo(s, o);
                let e = i;
                if (!(a.length > 0 && a[a.length - 1].bottomY > e)) {
                    r.lineTo(s, e);
                    break
                }
                {
                    const i = a.pop();
                    e = t + i.bottomY,
                    r.lineTo(s, e),
                    o = t + i.topY
                }
            }
            r.stroke()
        }
        paintFooter(e, t, s, i) {
            for (let n of i.beats) {
                if (n.graceType !== p.None || n.duration === d.Whole || n.duration === d.DoubleWhole || n.duration === d.QuadrupleWhole)
                    return;
                let r = i.getBeatLineX(n)
                  , a = t + this.y
                  , o = t + this.y + this.height - this._tupletSize
                  , h = this.getOnNotesGlyphForBeat(n);
                if (h.noteNumbers && n.duration !== d.Half ? a += h.noteNumbers.getNoteY(h.noteNumbers.minStringNote, li.Bottom) : a += this.height - this.settings.notation.rhythmHeight / 2 * this.settings.display.scale - this._tupletSize,
                this.paintBeamingStem(n, t + this.y, e + this.x + r, a, o, s),
                n.duration > d.Quarter)
                    if (this.settings.display.slim) {
                        let t = new En(0,0,n.duration,!1);
                        t.renderer = this,
                        t.doLayout(),
                        t.paint(e + this.x + r, o, s)
                    } else {
                        let t = new Di(0,0,n.duration,Ut.Down,!1);
                        t.renderer = this,
                        t.doLayout(),
                        t.paint(e + this.x + r, o, s)
                    }
            }
        }
    }
    hr.StaffId = "tab",
    hr.TabLineSpacing = 10,
    hr.PaddingTop = 10,
    hr.PaddingBottom = 10;
    class lr extends oi {
        constructor(e, t, s) {
            super(),
            this._showTimeSignature = e,
            this._showRests = t,
            this._showTiedNotes = s,
            this.hideOnPercussionTrack = !0
        }
        get staffId() {
            return hr.StaffId
        }
        canCreate(e, t) {
            return t.tuning.length > 0 && super.canCreate(e, t)
        }
        create(e, t) {
            let s = new hr(e,t);
            return s.showRests = this._showRests,
            s.showTimeSignature = this._showTimeSignature,
            s.showTiedNotes = this._showTiedNotes,
            s
        }
    }
    class cr {
        constructor(e) {
            this._isStarted = !1,
            this.isFontLoaded = !1,
            this.fontLoaded = new et,
            this._family = e
        }
        checkForFontAvailability() {
            if (Ka.isRunningInWorker)
                return void (this.isFontLoaded = !1);
            if (this._isStarted)
                return;
            this._isStarted = !0;
            let e = 0
              , t = window.setInterval(( () => {
                e++,
                _e.warning("Rendering", `Could not load font '${this._family}' within ${5 * e} seconds`, null)
            }
            ), 5e3);
            _e.debug("Font", "Start checking for font availablility: " + this._family),
            _e.debug("Font", `[${this._family}] Font API available`);
            let s = () => {
                document.fonts.load("1em " + this._family).then(( () => (_e.debug("Font", `[${this._family}] Font API signaled loaded`),
                document.fonts.check("1em " + this._family) ? (_e.debug("Rendering", `[${this._family}] Font API signaled available`),
                this.isFontLoaded = !0,
                window.clearInterval(t),
                this.fontLoaded.trigger(this._family)) : (_e.debug("Font", `[${this._family}] Font API loaded reported, but font not available, checking later again`, null),
                window.setTimeout(( () => {
                    s()
                }
                ), 250)),
                !0)))
            }
            ;
            s()
        }
    }
    class dr {
        constructor(e) {
            this._targets = new Set,
            this._callback = e,
            window.addEventListener("resize", this.onWindowResize.bind(this), !1)
        }
        observe(e) {
            this._targets.add(e)
        }
        unobserve(e) {
            this._targets.delete(e)
        }
        disconnect() {
            this._targets.clear()
        }
        onWindowResize() {
            const e = [];
            for (const t of this._targets)
                e.push({
                    target: t,
                    contentRect: void 0,
                    borderBoxSize: void 0,
                    contentBoxSize: []
                });
            this._callback(e, this)
        }
    }
    var ur;
    !function(e) {
        e[e.Browser = 0] = "Browser",
        e[e.NodeJs = 1] = "NodeJs"
    }(ur || (ur = {}));
    class pr {
        constructor(e) {
            this._elements = [];
            let t = null;
            const s = this._check.bind(this);
            this._check = () => {
                t || (t = setTimeout(( () => {
                    s(),
                    t = null
                }
                ), 100))
            }
            ,
            this._callback = e,
            window.addEventListener("resize", this._check, !0),
            document.addEventListener("scroll", this._check, !0)
        }
        observe(e) {
            this._elements.indexOf(e) >= 0 || (this._elements.push(e),
            this._check())
        }
        unobserve(e) {
            this._elements = this._elements.filter((t => t != e))
        }
        _check() {
            const e = [];
            this._elements.forEach((t => {
                const s = t.getBoundingClientRect();
                s.top + s.height >= 0 && s.top <= window.innerHeight && s.left + s.width >= 0 && s.left <= window.innerWidth && e.push({
                    target: t,
                    isIntersecting: !0
                })
            }
            )),
            e.length && this._callback(e, this)
        }
    }
    class gr extends Wn {
        constructor(e, t, s=!1) {
            super(e.beat, t.beat, s),
            this.startNote = e,
            this.endNote = t
        }
        getTieHeight(e, t, s, i) {
            return 10
        }
        getBeamDirection(e, t) {
            return Ut.Up
        }
        static getBeamDirectionForNote(e) {
            return Ut.Up
        }
        getStartY() {
            const e = this.startNoteRenderer.getNoteY(this.startNote, li.Top);
            if (this.endNoteRenderer) {
                const t = this.endNoteRenderer.getNoteY(this.endNote, li.Top);
                return Math.min(e, t)
            }
            return e
        }
        getEndY() {
            return this.getStartY()
        }
        getStartX() {
            return this.startNote === this.endNote ? this.getEndX() - 20 * this.scale : this.startNoteRenderer.getNoteX(this.startNote, ci.Center)
        }
        getEndX() {
            return this.startNote === this.endNote ? this.endNoteRenderer.getNoteX(this.endNote, ci.Left) : this.endNoteRenderer.getNoteX(this.endNote, ci.Center)
        }
    }
    class fr extends gr {
        constructor(e, t, s, i=!1) {
            super(e, t, i),
            this._direction = Ut.Up,
            this._forSlide = s
        }
        getTieHeight(e, t, s, i) {
            return Math.log(s - e + 1) * this.renderer.settings.notation.slurHeight
        }
        tryExpand(e, t, s, i) {
            return this._forSlide === s && (this.forEnd === i && (this.startNote.beat.id === e.beat.id && (this.endNote.beat.id === t.beat.id && (this._direction === gr.getBeamDirectionForNote(e) && (e.realValue > this.startNote.realValue && (this.startNote = e,
            this.startBeat = e.beat),
            t.realValue > this.endNote.realValue && (this.endNote = t,
            this.endBeat = t.beat),
            !0)))))
        }
        paint(e, t, s) {
            const i = "numbered.slur." + this.startNote.beat.id + "." + this.endNote.beat.id + "." + Ut.Up
              , n = this.renderer;
            n.staffRenderer.getSharedLayoutData(i, !1) || (n.staffRenderer.setSharedLayoutData(i, !0),
            super.paint(e, t, s))
        }
    }
    class mr extends Wn {
        getTieHeight(e, t, s, i) {
            return 10
        }
        getBeamDirection(e, t) {
            return Ut.Up
        }
        getStartY() {
            return this.startNoteRenderer.getNoteY(this.startBeat.notes[0], li.Top) - 9 * this.scale
        }
        getEndY() {
            return this.getStartY()
        }
        getStartX() {
            return this.startNoteRenderer.getBeatX(this.startBeat, hi.MiddleNotes)
        }
        getEndX() {
            return this.endNoteRenderer.getBeatX(this.endBeat, hi.MiddleNotes)
        }
    }
    class yr extends Ri {
        constructor(e, t) {
            super(e, t),
            this._effectSlurs = [],
            this._existingTieIds = new Map
        }
        doLayout() {
            if (super.doLayout(),
            this.beat.isLegatoOrigin) {
                if (!this.beat.previousBeat || !this.beat.previousBeat.isLegatoOrigin) {
                    let e = this.beat.nextBeat;
                    for (; e.nextBeat && e.nextBeat.isLegatoDestination; )
                        e = e.nextBeat;
                    this.ties.push(new mr(this.beat,e,!1))
                }
            } else if (this.beat.isLegatoDestination && !this.beat.isLegatoOrigin) {
                let e = this.beat.previousBeat;
                for (; e.previousBeat && e.previousBeat.isLegatoOrigin; )
                    e = e.previousBeat;
                this.ties.push(new mr(e,this.beat,!0))
            }
        }
        createTies(e) {
            if (e.isTieOrigin && e.beat.graceType !== p.BendGrace && e.tieDestination && e.tieDestination.isVisible && this.addTie(e, e.tieDestination, !1),
            !e.isTieDestination || e.tieOrigin.hasBend || e.beat.hasWhammyBar || this.addTie(e.tieOrigin, e, !0),
            e.isSlurOrigin && e.slurDestination && e.slurDestination.isVisible && this.addTie(e, e.slurDestination, !1),
            e.isSlurDestination && e.slurOrigin && this.addTie(e.slurOrigin, e, !0),
            e.isEffectSlurOrigin && e.effectSlurDestination) {
                let t = !1;
                for (let s of this._effectSlurs)
                    if (s.tryExpand(e, e.effectSlurDestination, !1, !1)) {
                        t = !0;
                        break
                    }
                if (!t) {
                    const t = new fr(e,e.effectSlurDestination,!1,!1);
                    this._effectSlurs.push(t),
                    this.ties.push(t)
                }
            }
            if (e.isEffectSlurDestination && e.effectSlurOrigin) {
                let t = !1;
                for (let s of this._effectSlurs)
                    if (s.tryExpand(e.effectSlurOrigin, e, !1, !0)) {
                        t = !0;
                        break
                    }
                if (!t) {
                    let t = new fr(e.effectSlurOrigin,e,!1,!0);
                    this._effectSlurs.push(t),
                    this.ties.push(t)
                }
            }
        }
        addTie(e, t, s) {
            const i = null == e ? void 0 : e.beat.maxNote
              , n = null == t ? void 0 : t.beat.maxNote;
            if (i && n) {
                const e = i.id + "-" + n.id;
                if (!this._existingTieIds.has(e)) {
                    let t = new gr(i,n,s);
                    this.ties.push(t),
                    this._existingTieIds.set(e, !0)
                }
            }
        }
    }
    class br extends ui {
        constructor(e, t, s) {
            super(e, t),
            this.width = 10 * s,
            this.height = 2 * s
        }
        paint(e, t, s) {
            s.fillRect(e + this.x - this.width / 2, t + this.y - this.height / 2, this.width, this.height)
        }
    }
    const Sr = .4;
    class wr extends Ei {
        constructor(e, t, s, i=!1) {
            super(e, t, i ? Sr * Mi.GraceScale : Sr, wr.getMusicSymbol(s)),
            this._isGrace = i,
            this._accidentalMode = s
        }
        static getMusicSymbol(e) {
            switch (e) {
            case D.ForceNatural:
                return I.AccidentalNatural;
            case D.ForceSharp:
                return I.AccidentalSharp;
            case D.ForceFlat:
                return I.AccidentalFlat;
            case D.ForceDoubleSharp:
                return I.AccidentalDoubleSharp;
            case D.ForceDoubleFlat:
                return I.AccidentalDoubleFlat;
            default:
                return I.None
            }
        }
        doLayout() {
            switch (this._accidentalMode) {
            case D.ForceDoubleFlat:
                this.width = 7.2;
                break;
            default:
                this.width = 3.2
            }
            this.width = this.width * (this._isGrace ? Mi.GraceScale : 1) * this.scale
        }
    }
    const _r = [{
        note: "1",
        sharp: !1
    }, {
        note: "1",
        sharp: !0
    }, {
        note: "2",
        sharp: !1
    }, {
        note: "2",
        sharp: !0
    }, {
        note: "3",
        sharp: !1
    }, {
        note: "4",
        sharp: !1
    }, {
        note: "4",
        sharp: !0
    }, {
        note: "5",
        sharp: !1
    }, {
        note: "5",
        sharp: !0
    }, {
        note: "6",
        sharp: !1
    }, {
        note: "6",
        sharp: !0
    }, {
        note: "7",
        sharp: !1
    }];
    class Br extends ui {
        constructor(e, t, s) {
            super(e, t),
            this._noteText = null,
            this._octaveDots = 0,
            this._sharp = !1,
            this._font = null,
            this._note = s,
            this._graceType = s.beat.graceType,
            this._isBottom = s === s.beat.minNote;
            let i = js(ei(s.beat.voice.bar));
            i < -6 && (i += 12);
            const n = Math.max(s.displayValue + i, 0)
              , r = Math.floor(n / 12)
              , a = _r[n % 12];
            this._noteText = a.note,
            s.isGhost && (this._noteText = "(" + this._noteText + ")"),
            this._sharp = a.sharp,
            this._octaveDots = r - 5
        }
        doLayout() {
            this._font = this._graceType !== p.None || this._note.beat.notes.length > 1 ? this.renderer.resources.graceFont : this._note.beat.isDumb ? this.renderer.resources.numberedNoteDumbNumberFont : this.renderer.resources.numberedNoteNumberFont,
            this.renderer.scoreRenderer.canvas.font = this._font,
            this.width = this.renderer.scoreRenderer.canvas.measureText(this._noteText) * this.scale,
            this.height = this._font.size * this.scale + this.scale,
            this._octaveDots > 0 && (this.height += this._octaveDots * Br.DotRadius * 2 * this.scale),
            this._octaveDots < 0 && !this._isBottom && (this.height += -this._octaveDots * Br.DotRadius * 2 * this.scale)
        }
        getNoteX(e) {
            switch (e) {
            case ci.Center:
                return this.x;
            case ci.Left:
                return this.x - this.width / 2;
            case ci.Right:
                return this.x + this.width / 2;
            default:
                return this.x
            }
        }
        getNoteY(e) {
            switch (e) {
            case li.Center:
                return this.y + this.height / 2;
            case li.Top:
                return this.y - this.height;
            case li.Bottom:
            default:
                return this.y
            }
        }
        paint(e, t, s) {
            const i = s.textBaseline;
            s.textBaseline = G.Bottom;
            const n = s.textAlign;
            s.textAlign = A.Center;
            const r = s.font;
            s.font = this._font;
            const a = s.color
              , o = [1, 3, 6, 8, 10].includes(this._note.displayValue % 12);
            if (this._note.isTieDestination && this._note.isVisible ? s.color = this.renderer.resources.tieDestinationColor : o && (s.color = this.renderer.resources.blackKeyNoteColor),
            this._graceType === p.None)
                this.paintNote(e + this.x, t + this.y, s);
            else if (this._graceType === p.OnBeat || this._graceType === p.BeforeBeat) {
                const i = e + this.x
                  , n = t + this.y - this._font.size - 3 * this.scale * Br.UnderlineSpacing;
                this.paintNote(i, n, s)
            }
            s.textBaseline = i,
            s.textAlign = n,
            s.font = r,
            s.color = a
        }
        paintNote(e, t, s) {
            const i = Br.DotRadius * this.scale
              , n = 2 * i + .5 * this.scale;
            if (this._octaveDots < 0)
                if (this._isBottom) {
                    const r = this._note.beat.duration;
                    let a = t
                      , o = 0;
                    this._note.beat.graceType !== p.None ? o = 1 : r >= d.Eighth && (o = Math.log2(r / d.Quarter)),
                    a += o * Br.UnderlineSpacing * this.scale;
                    for (let t = this._octaveDots; t < 0; t++)
                        a += n,
                        s.fillCircle(e, a, i)
                } else
                    for (let r = this._octaveDots; r < 0; r++)
                        s.fillCircle(e, t, i),
                        t -= n;
            if (s.fillText(this._noteText, e, t),
            t -= this._font.size * this.scale - this.scale,
            this._sharp && this.paintAccidental(e + this.width / 2 - this.scale, t + this.scale, D.ForceSharp, s),
            this._octaveDots > 0)
                for (let r = this._octaveDots; r > 0; r--)
                    s.fillCircle(e, t, i),
                    t -= n
        }
        buildBoundingsLookup(e, t, s) {
            let i = new ps;
            i.note = this._note,
            i.noteHeadBounds = new ss,
            i.noteHeadBounds.x = t + this.x,
            i.noteHeadBounds.y = s + this.y - this.height / 2,
            i.noteHeadBounds.w = this.width,
            i.noteHeadBounds.h = this.height,
            this.renderer.scoreRenderer.boundsLookup.addNote(i)
        }
        paintAccidental(e, t, s, i) {
            const n = new wr(0,0,s,!1);
            n.renderer = this.renderer,
            n.paint(e, t, i)
        }
    }
    Br.UnderlineSpacing = 2.5,
    Br.DotRadius = 1.5;
    class Tr extends ui {
        constructor(e, t, s) {
            super(e, t),
            this._noteText = "0",
            this._beat = s
        }
        doLayout() {
            const e = this.renderer.scoreRenderer.canvas.font;
            this.renderer.scoreRenderer.canvas.font = this._beat.isDumb ? this.renderer.resources.numberedNoteDumbNumberFont : this.renderer.resources.numberedNoteNumberFont,
            this.width = this.renderer.scoreRenderer.canvas.measureText(this._noteText) * this.scale,
            this.height = this.renderer.scoreRenderer.canvas.font.size,
            this.renderer.scoreRenderer.canvas.font = e
        }
        getNoteX(e) {
            switch (e) {
            case ci.Center:
                return this.x;
            case ci.Left:
                return this.x - this.width / 2;
            case ci.Right:
                return this.x + this.width / 2;
            default:
                return this.x
            }
        }
        getNoteY(e) {
            switch (e) {
            case li.Center:
                return this.y + this.height / 2;
            case li.Top:
                return this.y;
            case li.Bottom:
                return this.y + this.height;
            default:
                return this.y
            }
        }
        paint(e, t, s) {
            const i = this.renderer.resources
              , n = e + this.x
              , r = t + this.y
              , a = s.font
              , o = s.textAlign
              , h = s.textBaseline;
            s.textBaseline = G.Bottom,
            s.textAlign = A.Center,
            s.font = this._beat.isDumb ? i.numberedNoteDumbNumberFont : i.numberedNoteNumberFont,
            s.fillText(this._noteText, n, r),
            s.font = a,
            s.textAlign = o,
            s.textBaseline = h
        }
    }
    class Nr extends ui {
        constructor(e, t, s) {
            super(e, t),
            this.isLeft = s
        }
        paint(e, t, s) {
            const i = this.renderer.resources
              , n = s.font;
            s.font = i.numberedNoteDumbNumberFont;
            const r = s.textAlign;
            this.isLeft ? (s.textAlign = A.Right,
            s.fillText("(", e + this.x - 5 * this.scale, t + this.y)) : (s.textAlign = A.Left,
            s.fillText(")", e + this.x - 2 * this.scale, t + this.y)),
            s.font = n,
            s.textAlign = r
        }
    }
    class vr extends Ii {
        constructor(e) {
            super(),
            this.notesGlyphs = new Map,
            this.centerY = e
        }
        getNoteX(e, t) {
            const s = this.notesGlyphs.get(e.id);
            return s ? s.getNoteX(t) : 0
        }
        getNoteY(e, t) {
            const s = this.notesGlyphs.get(e.id);
            return s ? s.getNoteY(t) : 0
        }
        buildBoundingsLookup(e, t, s) {
            for (const i of this.notesGlyphs.values())
                i.buildBoundingsLookup(e, t + this.x, s + this.y)
        }
        doLayout() {
            var e, t;
            const s = this.container.beat;
            this.width = s.graceType === p.None ? (s.isDumb ? 7.01 : 8.02) * this.scale : 5 * this.scale,
            this.centerX = 0,
            s.isDumb && !(null === (e = s.previousBeat) || void 0 === e ? void 0 : e.isDumb) && this.addGlyph(new Nr(0,this.centerY,!0));
            const i = this.centerY + this.renderer.resources.numberedNoteNumberFont.size / 2 * this.scale - 2 * this.scale;
            if (0 === s.notes.length)
                this.createRestGlyph(i);
            else {
                const e = s.notes.sort(( (e, t) => e.displayValue - t.displayValue));
                let t = i;
                for (let i = 0; i < e.length; ++i) {
                    const n = e[i];
                    n.isVisible ? t -= this.createNoteGlyph(n, t) : 0 === i && this.createExtentGlyph(this.centerY, s.isDumb)
                }
                this.renderer.registerOverflowTop(i - t - 25 * this.scale)
            }
            if (s.isDumb && !(null === (t = s.nextBeat) || void 0 === t ? void 0 : t.isDumb) && this.addGlyph(new Nr(this.width,this.centerY,!1)),
            s.duration >= d.Quarter && s.dots > 0)
                for (let e = 0; e < s.dots; e++)
                    this.addGlyph(new Yn(this.width / 2 + (3 + 3 * e) * this.scale,this.centerY + this.scale,1.5 * this.scale))
        }
        updateBeamingHelper() {
            const e = this.container.beat;
            this.beamingHelper && this.beamingHelper.isPositionFrom(Fr.StaffId, e) && this.beamingHelper.registerBeatLineX(Fr.StaffId, e, this.container.x + this.x, this.container.x + this.x)
        }
        createNoteGlyph(e, t) {
            let s = new Br(0,t,e);
            return this.notesGlyphs.set(e.id, s),
            s.beamingHelper = this.beamingHelper,
            s.renderer = this.renderer,
            s.doLayout(),
            this.addGlyph(s),
            s.height
        }
        createRestGlyph(e) {
            let t = new Tr(0,e,this.container.beat);
            t.renderer = this.renderer,
            t.doLayout(),
            this.addGlyph(t)
        }
        createExtentGlyph(e, t) {
            this.addGlyph(new br(0,e,t ? .8 * this.scale : this.scale))
        }
    }
    class xr extends ui {
        constructor(e, t, s, i) {
            super(e, t),
            this._lineSize = 0,
            this._beat = s,
            this._lineSize = i
        }
        doLayout() {
            this.width = 10 * this.scale
        }
        paint(e, t, s) {
            let i = this.renderer
              , n = t + this.y + (i.getNoteY(this._beat.maxNote, li.Bottom) - this._lineSize)
              , r = t + this.y + i.getNoteY(this._beat.minNote, li.Top) + this._lineSize
              , a = e + this.x + this.width / 2
              , o = 8 * this.scale;
            if (this._beat.brushType !== c.None) {
                let t = new Hn(0,0,b.Slight,1.2,!0);
                t.renderer = this.renderer,
                t.doLayout();
                let i = -t.height / 2;
                if (this._beat.brushType === c.ArpeggioUp) {
                    let h = n + o
                      , l = r - o;
                    t.width = Math.abs(l - h),
                    s.beginRotate(e + this.x + 5 * this.scale, l, -90),
                    t.paint(0, i, s),
                    s.endRotate(),
                    s.beginPath(),
                    s.moveTo(a, r),
                    s.lineTo(a + o / 2, r - o),
                    s.lineTo(a - o / 2, r - o),
                    s.closePath(),
                    s.fill()
                } else if (this._beat.brushType === c.ArpeggioDown) {
                    let h = n + o
                      , l = r;
                    t.width = Math.abs(l - h),
                    s.beginRotate(e + this.x + 5 * this.scale, h, 90),
                    t.paint(0, i, s),
                    s.endRotate(),
                    s.beginPath(),
                    s.moveTo(a, n),
                    s.lineTo(a + o / 2, n + o),
                    s.lineTo(a - o / 2, n + o),
                    s.closePath(),
                    s.fill()
                } else if (this._beat.brushType === c.Arpeggio) {
                    let a = n
                      , o = r;
                    t.width = Math.abs(o - a),
                    s.beginRotate(e + this.x + 5 * this.scale, a, 90),
                    t.paint(0, i, s),
                    s.endRotate()
                }
            }
        }
    }
    class kr extends Oi {
        doLayout() {
            this.container.beat.notes.filter((e => e.isVisible)).length > 1 && this.container.beat.brushType !== c.None && (this.addGlyph(new xr(0,0,this.container.beat,10 * this.scale)),
            this.addGlyph(new On(0,0,2 * this.scale))),
            super.doLayout()
        }
    }
    class Pr extends ui {
        constructor(e, t, s, i) {
            super(e, t),
            this._numerator = 0,
            this._denominator = 0,
            this._numerator = s,
            this._denominator = i
        }
        doLayout() {
            this.width = 16 * this.scale
        }
        paint(t, s, i) {
            const n = this.x + t
              , r = this.y + s
              , a = i.font
              , o = i.textAlign
              , h = i.textBaseline
              , l = i.color;
            i.color = this.renderer.resources.staffLineColor,
            i.font = new vt("Arial",18,e.FontStyle.Plain,e.FontWeight.Bold),
            i.textAlign = A.Center,
            i.textBaseline = G.Bottom,
            i.beginPath(),
            i.moveTo(n, r + .5 * this.scale),
            i.lineTo(n + this.width, r + .5 * this.scale),
            i.stroke(),
            i.fillText(String(this._numerator), n + this.width / 2, r - 2 * this.scale),
            i.textBaseline = G.Top,
            i.fillText(String(this._denominator), n + this.width / 2, r + 2 * this.scale),
            i.font = a,
            i.textAlign = o,
            i.textBaseline = h,
            i.color = l
        }
    }
    class Fr extends xi {
        constructor(e, t) {
            super(e, t),
            this._noteCenterY = 0,
            this._noteBottomY = 0,
            this._tupletSize = 0,
            this.topPadding = 12 * this.scale,
            this.bottomPadding = 8 * this.scale,
            this.height = 30 * this.scale + this.topPadding + this.bottomPadding,
            this._noteCenterY = this.topPadding + this.resources.numberedNoteNumberFont.size / 2 * this.scale + 2 * this.scale,
            this._noteBottomY = this.topPadding + this.resources.numberedNoteNumberFont.size * this.scale + 2 * this.scale
        }
        get middleYPosition() {
            return this.topPadding + 15 * this.scale
        }
        doLayout() {
            if (this.updateSizes(),
            super.doLayout(),
            this.settings.notation.rhythmMode !== w.Hidden) {
                let e = !1;
                for (const t of this.bar.voices)
                    if (this.hasVoiceContainer(t)) {
                        if (this.getVoiceContainer(t).tupletGroups.length > 0) {
                            e = !0;
                            break
                        }
                    }
                e && (this._tupletSize = .8 * this.resources.effectFont.size,
                this.registerOverflowBottom(this._tupletSize))
            }
        }
        createPreBeatGlyphs() {
            super.createPreBeatGlyphs(),
            this.bar.masterBar.isRepeatStart && this.addPreBeatGlyph(new Rn(0,0,1.5,3));
            const t = this.getBarNumber();
            t ? this.addPreBeatGlyph(new Cn(2 * this.scale,this.y + 16 * this.scale,t)) : this.addPreBeatGlyph(new On(0,0,10 * this.scale));
            let s = 5;
            !this.settings.notation.isNotationElementVisible(e.NotationElement.TimeSignature) || this.bar.staff.showNumberedNotation && this.settings.display.staveProfile !== e.StaveProfile.NLead || !(!this.bar.previousBar || this.bar.previousBar && this.bar.masterBar.timeSignatureNumerator !== this.bar.previousBar.masterBar.timeSignatureNumerator || this.bar.previousBar && this.bar.masterBar.timeSignatureDenominator !== this.bar.previousBar.masterBar.timeSignatureDenominator) || (this.createTimeSignatureGlyphs(),
            s = 15),
            this.addPreBeatGlyph(new On(0,0,s * this.scale))
        }
        createVoiceGlyphs(e) {
            for (const t of e.beats) {
                const s = new yr(t,this.getVoiceContainer(e));
                s.preNotes = new kr,
                s.onNotes = new vr(this._noteCenterY),
                this.addBeatGlyph(s)
            }
        }
        createPostBeatGlyphs() {
            super.createPostBeatGlyphs(),
            this.bar.masterBar.isRepeatEnd ? (this.addPostBeatGlyph(new Mn(this.x,0)),
            this.bar.masterBar.repeatCount > 2 && this.addPostBeatGlyph(new Dn(0,this.y,this.bar.masterBar.repeatCount))) : this.addPostBeatGlyph(new Ln(0,0))
        }
        paintBackground(e, t, s) {
            super.paintBackground(e, t, s),
            s.color = this.resources.mainGlyphColor,
            this.paintSimileMark(e, t, s)
        }
        paint(e, t, s) {
            super.paint(e, t, s),
            this.paintBeams(e, t, s),
            this.paintTuplets(e, t, s)
        }
        paintBeams(e, t, s) {
            for (let i = 0, n = this.helpers.beamHelpers.length; i < n; i++) {
                const n = this.helpers.beamHelpers[i];
                for (let i = 0, r = n.length; i < r; i++) {
                    const r = n[i];
                    this.paintBeamHelper(e + this.beatGlyphsStart, t, s, r)
                }
            }
        }
        paintTuplets(e, t, s) {
            for (const i of this.bar.voices)
                if (this.hasVoiceContainer(i)) {
                    const n = this.getVoiceContainer(i);
                    for (const i of n.tupletGroups)
                        this.paintTupletHelper(e + this.beatGlyphsStart, t, s, i)
                }
        }
        paintBeamHelper(e, t, s, i) {
            s.color = 0 === i.voice.index ? this.resources.mainGlyphColor : this.resources.secondaryGlyphColor,
            this.paintUnderline(e, t, s, i)
        }
        paintUnderline(e, t, s, i) {
            var n;
            for (let r = 0, a = i.beats.length; r < a; r++) {
                let a = i.beats[r];
                const o = a.graceType !== p.None;
                if (i.hasBeatLineX(a)) {
                    const h = i.getBeatLineX(a)
                      , l = 5 * this.scale
                      , c = Br.UnderlineSpacing * this.scale
                      , d = .5 * this.scale
                      , u = o ? 2 : ht.getIndex(a.duration) - 2
                      , g = o ? t + this.y + this.topPadding - 2 * this.scale : t + this.y + this._noteBottomY;
                    for (let t = 0; t < u; t++) {
                        let n = 0
                          , o = 0;
                        const u = g + t * c;
                        1 === i.beats.length ? (n = h - l,
                        o = h + l,
                        this.paintSingleUnderline(s, e + this.x + n, u, e + this.x + o, u, d)) : r < i.beats.length - 1 ? (n = h,
                        o = i.getBeatLineX(i.beats[r + 1]),
                        (0 === r || r > 0 && !_i.isFullBarJoin(i.beats[r - 1], a, t)) && (n -= l),
                        _i.isFullBarJoin(a, i.beats[r + 1], t) || (o = h + l),
                        this.paintSingleUnderline(s, e + this.x + n, u, e + this.x + o, u, d)) : r === i.beats.length - 1 && (n = h,
                        o = h + l,
                        _i.isFullBarJoin(i.beats[r - 1], a, t) || (n -= l),
                        this.paintSingleUnderline(s, e + this.x + n, u, e + this.x + o, u, d))
                    }
                    if (o && (null === (n = a.nextBeat) || void 0 === n ? void 0 : n.graceType) === p.None) {
                        const t = 5 * this.scale
                          , i = 4 * this.scale;
                        this.paintGraceLine(e + this.x + h, g + Br.UnderlineSpacing, t, i, s)
                    }
                }
            }
        }
        paintTupletHelper(e, t, s, i) {
            const n = this.resources
              , r = s.textAlign
              , a = s.textBaseline;
            let o;
            s.color = 0 === i.voice.index ? this.resources.mainGlyphColor : this.resources.secondaryGlyphColor,
            s.textAlign = A.Center,
            s.textBaseline = G.Middle;
            const h = i.beats[0].tupletNumerator
              , l = i.beats[0].tupletDenominator;
            if (o = 2 === h && 3 === l ? "2" : 3 === h && 2 === l ? "3" : 4 === h && 6 === l ? "4" : 5 === h && 4 === l ? "5" : 6 === h && 4 === l ? "6" : 7 === h && 4 === l ? "7" : 9 === h && 8 === l ? "9" : 10 === h && 8 === l ? "10" : 11 === h && 8 === l ? "11" : 12 === h && 8 === l ? "12" : 13 === h && 8 === l ? "13" : h + ":" + l,
            1 !== i.beats.length && i.isFull) {
                let r = d.Quarter
                  , a = 0;
                for (const e of i.beats) {
                    e.duration > r && (r = e.duration);
                    const t = e.minNote;
                    if (t) {
                        let s = js(ei(e.voice.bar));
                        s < -6 && (s += 12);
                        const i = Math.max(t.displayValue + s, 0)
                          , n = Math.floor(i / 12)
                          , r = Math.max(0, 5 - n);
                        r > a && (a = r)
                    }
                }
                const h = (3 * (Math.log2(r) - 2) + 4 * a - 6) * this.scale;
                let l = i.beats[0]
                  , c = i.beats[i.beats.length - 1]
                  , u = this.helpers.beamHelperLookup[i.voice.index].get(l.index)
                  , p = this.helpers.beamHelperLookup[i.voice.index].get(c.index);
                if (u && p) {
                    let i = u.getBeatLineX(l)
                      , r = p.getBeatLineX(c);
                    s.font = n.effectFont;
                    let a = s.measureText(o)
                      , d = 3 * this.scale
                      , g = (i + r) / 2
                      , f = g - a / 2 - d
                      , m = g + a / 2 + d
                      , y = t + this.y + this.height - this._tupletSize + h
                      , b = .25 * -n.effectFont.size
                      , S = -5 * this.scale;
                    s.beginPath(),
                    s.moveTo(e + this.x + i, y - b | 0),
                    s.lineTo(e + this.x + i, y - b - S | 0),
                    s.lineTo(e + this.x + f, y - b - S | 0),
                    s.stroke(),
                    s.beginPath(),
                    s.moveTo(e + this.x + m, y - b - S | 0),
                    s.lineTo(e + this.x + r, y - b - S | 0),
                    s.lineTo(e + this.x + r, y - b | 0),
                    s.stroke(),
                    s.fillText(o, e + this.x + g, y - b - S)
                }
            }
            s.textAlign = r,
            s.textBaseline = a
        }
        paintSingleUnderline(e, t, s, i, n, r) {
            const a = e.lineWidth;
            e.moveTo(t, s),
            e.lineTo(i, n),
            e.lineWidth = r,
            e.stroke(),
            e.lineWidth = a
        }
        paintGraceLine(e, t, s, i, n) {
            n.moveTo(e, t),
            n.bezierCurveTo(e, t, e, t + i, e + s, t + i),
            n.stroke()
        }
        createTimeSignatureGlyphs() {
            this.addPreBeatGlyph(new Pr(0,this._noteCenterY,this.bar.masterBar.timeSignatureNumerator,this.bar.masterBar.timeSignatureDenominator))
        }
    }
    Fr.StaffId = "numbered";
    class Cr extends oi {
        get staffId() {
            return Fr.StaffId
        }
        constructor() {
            super()
        }
        create(e, t) {
            return new Fr(e,t)
        }
    }
    class Lr extends Ei {
        constructor(e, t, s) {
            super(e, t, 1, Lr.getSymbol(s))
        }
        static getSymbol(e) {
            switch (e) {
            case zt.Short:
                return I.FermataShortAbove;
            case zt.Medium:
                return I.FermataAbove;
            case zt.Long:
                return I.FermataLongAbove;
            default:
                return I.None
            }
        }
        doLayout() {
            this.width = 23 * this.scale,
            this.height = 12 * this.scale
        }
        paint(e, t, s) {
            super.paint(e - this.width / 2, t + this.height, s)
        }
    }
    class Er extends Vi {
        get notationElement() {
            return e.NotationElement.EffectFermata
        }
        get hideOnMultiTrack() {
            return !1
        }
        get canShareBand() {
            return !1
        }
        get sizingMode() {
            return di.SingleOnBeat
        }
        shouldCreateGlyph(e, t) {
            return 0 === t.voice.bar.staff.index && 0 === t.voice.index && !!t.fermata
        }
        createNewGlyph(e, t) {
            return new Lr(0,0,t.fermata.type)
        }
        canExpand(e, t) {
            return !0
        }
    }
    class Mr extends Vi {
        constructor() {
            super(...arguments),
            this.lastCreateInfo = null
        }
        shouldCreateGlyph(e, t) {
            this.lastCreateInfo = [];
            for (let e = 0, s = t.notes.length; e < s; e++) {
                let s = t.notes[e];
                this.shouldCreateGlyphForNote(s) && this.lastCreateInfo.push(s)
            }
            return this.lastCreateInfo.length > 0
        }
        get hideOnMultiTrack() {
            return !1
        }
        get canShareBand() {
            return !0
        }
        canExpand(e, t) {
            return !0
        }
    }
    class Dr extends Li {
        constructor(e, t) {
            super(e, t)
        }
        doLayout() {
            super.doLayout(),
            this.height = 20 * this.scale
        }
        paint(e, t, s) {
            let i = this.renderer.resources;
            s.font = i.markerFont;
            let n = s.measureText("tr");
            s.fillText("tr", e + this.x, t + this.y + s.font.size / 2);
            let r = n + 3 * this.scale
              , a = this.width - r
              , o = 11 * this.scale * 1.2
              , h = Math.max(1, (a - r) / o)
              , l = r
              , c = t + this.y + this.height;
            for (let t = 0; t < h; t++)
                s.fillMusicFontSymbol(e + this.x + l, c, 1.2, I.WiggleTrill, !1),
                l += o
        }
    }
    class Rr extends Mr {
        get notationElement() {
            return e.NotationElement.EffectTrill
        }
        shouldCreateGlyphForNote(e) {
            return e.isTrill
        }
        get sizingMode() {
            return di.SingleOnBeat
        }
        createNewGlyph(e, t) {
            return new Dr(0,0)
        }
    }
    class Or extends Vi {
        get notationElement() {
            return e.NotationElement.EffectMarker
        }
        get hideOnMultiTrack() {
            return !0
        }
        get canShareBand() {
            return !0
        }
        get sizingMode() {
            return di.SinglePreBeat
        }
        shouldCreateGlyph(e, t) {
            return 0 === t.voice.bar.staff.index && 0 === t.voice.index && 0 === t.index && t.voice.bar.masterBar.isSectionStart
        }
        createNewGlyph(e, t) {
            return new zi(0,0,t.voice.bar.masterBar.section.marker ? "[" + t.voice.bar.masterBar.section.marker + "] " + t.voice.bar.masterBar.section.text : t.voice.bar.masterBar.section.text,e.resources.markerFont,A.Left)
        }
        canExpand(e, t) {
            return !0
        }
    }
    class Ir extends Li {
        constructor(e, t, s, i=!1) {
            super(e, t),
            this._tempo = 0,
            this._tempo = s,
            this._numberedNotation = i
        }
        doLayout() {
            super.doLayout(),
            this.height = 25 * this.scale
        }
        paint(e, t, s) {
            let i = this.renderer.resources;
            s.font = i.markerFont,
            this._numberedNotation ? s.fillText((this._numberedNotation ? "拍速=" : "= ") + this._tempo.toString(), e + this.x, t + this.y + s.font.size / 2) : (s.fillMusicFontSymbol(e + this.x, t + this.y + .8 * this.height, this.scale * Mi.GraceScale, I.NoteQuarterUp, !1),
            s.fillText("= " + this._tempo.toString(), e + this.x + this.height / 2, t + this.y + s.font.size / 2))
        }
    }
    class Ar extends Vi {
        get notationElement() {
            return e.NotationElement.EffectTempo
        }
        get hideOnMultiTrack() {
            return !0
        }
        get canShareBand() {
            return !1
        }
        get sizingMode() {
            return di.SinglePreBeat
        }
        shouldCreateGlyph(e, t) {
            return 0 === t.voice.bar.staff.index && 0 === t.voice.index && 0 === t.index && !!t.voice.bar.masterBar.tempoAutomation && 0 !== t.voice.bar.index
        }
        createNewGlyph(t, s) {
            let i = 0;
            i = s.voice.bar.masterBar.tempoAutomation ? s.voice.bar.masterBar.tempoAutomation.value : s.voice.bar.staff.track.score.tempo;
            const n = t.settings.display.staveProfile === e.StaveProfile.Numbered || s.voice.bar.staff.showNumberedNotation;
            return new Ir(0,0,i,n)
        }
        canExpand(e, t) {
            return !0
        }
    }
    var Gr, Hr, Vr;
    !function(e) {
        e[e.Full = 0] = "Full",
        e[e.PartialLeft = 1] = "PartialLeft",
        e[e.PartialRight = 2] = "PartialRight"
    }(Gr || (Gr = {}));
    class Wr extends Li {
        constructor(e) {
            super(0, 0),
            this._tripletFeel = e
        }
        doLayout() {
            super.doLayout(),
            this.height = 25 * this.scale
        }
        paint(e, t, s) {
            e += this.x;
            let i = (t += this.y) + this.height * Mi.GraceScale;
            s.font = this.renderer.resources.effectFont,
            s.fillText("(", e, t + .3 * this.height);
            let n = e + 10 * this.scale
              , r = e + 40 * this.scale;
            switch (this._tripletFeel) {
            case y.NoTripletFeel:
                this.renderBarNote(n, i, Wr.NoteScale, s, [Gr.Full]),
                this.renderBarNote(r, i, Wr.NoteScale, s, [Gr.Full]);
                break;
            case y.Triplet8th:
                this.renderBarNote(n, i, Wr.NoteScale, s, [Gr.Full]),
                s.fillMusicFontSymbol(r, i, Wr.NoteScale, I.NoteQuarterUp, !1),
                s.fillMusicFontSymbol(r + Wr.NoteSeparation * this.scale, i, Wr.NoteScale, I.NoteEighthUp, !1),
                this.renderTriplet(r, t, s);
                break;
            case y.Triplet16th:
                this.renderBarNote(n, i, Wr.NoteScale, s, [Gr.Full, Gr.Full]),
                this.renderBarNote(r, i, Wr.NoteScale, s, [Gr.Full, Gr.PartialRight]),
                this.renderTriplet(r, t, s);
                break;
            case y.Dotted8th:
                this.renderBarNote(n, i, Wr.NoteScale, s, [Gr.Full]),
                this.renderBarNote(r, i, Wr.NoteScale, s, [Gr.Full, Gr.PartialRight]),
                s.fillCircle(r + 9 * this.scale, i, this.scale);
                break;
            case y.Dotted16th:
                this.renderBarNote(n, i, Wr.NoteScale, s, [Gr.Full, Gr.Full]),
                this.renderBarNote(r, i, Wr.NoteScale, s, [Gr.Full, Gr.Full, Gr.PartialRight]),
                s.fillCircle(r + 9 * this.scale, i, this.scale);
                break;
            case y.Scottish8th:
                this.renderBarNote(n, i, Wr.NoteScale, s, [Gr.Full]),
                this.renderBarNote(r, i, Wr.NoteScale, s, [Gr.Full, Gr.PartialLeft]),
                s.fillCircle(r + Wr.NoteSeparation * this.scale + 8 * this.scale, i, this.scale);
                break;
            case y.Scottish16th:
                this.renderBarNote(n, i, Wr.NoteScale, s, [Gr.Full, Gr.Full]),
                this.renderBarNote(r, i, Wr.NoteScale, s, [Gr.Full, Gr.Full, Gr.PartialLeft]),
                s.fillCircle(r + Wr.NoteSeparation * this.scale + 8 * this.scale, i, this.scale)
            }
            s.fillText("=", e + 30 * this.scale, t + 5 * this.scale),
            s.fillText(")", e + 65 * this.scale, t + .3 * this.height)
        }
        renderBarNote(e, t, s, i, n) {
            i.fillMusicFontSymbol(e, t, s, I.NoteQuarterUp, !1);
            let r = Wr.NoteSeparation / 2 * this.scale;
            for (let s = 0; s < n.length; s++)
                switch (n[s]) {
                case Gr.Full:
                    i.fillRect(e + 4 * this.scale, t - Wr.NoteHeight * this.scale + Wr.BarSeparation * this.scale * s, Wr.NoteSeparation * this.scale, Wr.BarHeight * this.scale);
                    break;
                case Gr.PartialLeft:
                    i.fillRect(e + 4 * this.scale, t - Wr.NoteHeight * this.scale + Wr.BarSeparation * this.scale * s, r, Wr.BarHeight * this.scale);
                    break;
                case Gr.PartialRight:
                    i.fillRect(e + 4 * this.scale + r, t - Wr.NoteHeight * this.scale + Wr.BarSeparation * this.scale * s, r, Wr.BarHeight * this.scale)
                }
            i.fillMusicFontSymbol(e + Wr.NoteSeparation * this.scale, t, s, I.NoteQuarterUp, !1)
        }
        renderTriplet(e, t, s) {
            t += 2 * this.scale;
            let i = this.renderer.resources.effectFont;
            s.font = new vt(i.family,.8 * i.size,i.style);
            let n = e + Wr.NoteSeparation * this.scale + 3 * this.scale;
            s.beginPath(),
            s.moveTo(e, t + 3 * this.scale),
            s.lineTo(e, t),
            s.lineTo(e + 5 * this.scale, t),
            s.moveTo(n + 5 * this.scale, t + 3 * this.scale),
            s.lineTo(n + 5 * this.scale, t),
            s.lineTo(n, t),
            s.stroke(),
            s.fillText("3", e + 7 * this.scale, t - 10 * this.scale),
            s.font = i
        }
    }
    Wr.NoteScale = .4,
    Wr.NoteHeight = 12,
    Wr.NoteSeparation = 12,
    Wr.BarHeight = 2,
    Wr.BarSeparation = 3;
    class zr extends Vi {
        get notationElement() {
            return e.NotationElement.EffectTripletFeel
        }
        get hideOnMultiTrack() {
            return !0
        }
        get canShareBand() {
            return !1
        }
        get sizingMode() {
            return di.SinglePreBeat
        }
        shouldCreateGlyph(e, t) {
            return 0 === t.index && (0 === t.voice.bar.masterBar.index && t.voice.bar.masterBar.tripletFeel !== y.NoTripletFeel || t.voice.bar.masterBar.index > 0 && t.voice.bar.masterBar.tripletFeel !== t.voice.bar.masterBar.previousMasterBar.tripletFeel)
        }
        createNewGlyph(e, t) {
            return new Wr(t.voice.bar.masterBar.tripletFeel)
        }
        canExpand(e, t) {
            return !0
        }
    }
    class Ur extends Gn {
        constructor(e) {
            super(hi.EndBeat),
            this._stepSize = 0,
            this._type = e
        }
        doLayout() {
            switch (super.doLayout(),
            this._type) {
            case b.Slight:
                this._stepSize = 12 * this.scale;
                break;
            case b.Wide:
                this._stepSize = 23 * this.scale
            }
            this.height = 18 * this.scale
        }
        paintGrouped(e, t, s, i) {
            let n = e + this.x
              , r = s - n
              , a = Math.max(1, r / this._stepSize);
            i.beginPath(),
            i.moveTo(n, t + this.y);
            for (let e = 0; e < a; e++)
                i.lineTo(n + this._stepSize / 2, t + this.y + this.height),
                i.lineTo(n + this._stepSize, t + this.y),
                n += this._stepSize;
            i.stroke()
        }
    }
    class Xr extends Vi {
        get notationElement() {
            return e.NotationElement.EffectWideBeatVibrato
        }
        get hideOnMultiTrack() {
            return !1
        }
        get canShareBand() {
            return !0
        }
        get sizingMode() {
            return di.GroupedOnBeatToEnd
        }
        shouldCreateGlyph(e, t) {
            return t.vibrato === b.Wide
        }
        createNewGlyph(e, t) {
            return new Ur(b.Wide)
        }
        canExpand(e, t) {
            return !0
        }
    }
    class Yr extends Vi {
        get notationElement() {
            return e.NotationElement.EffectSlightBeatVibrato
        }
        get hideOnMultiTrack() {
            return !1
        }
        get canShareBand() {
            return !0
        }
        get sizingMode() {
            return di.GroupedOnBeatToEnd
        }
        shouldCreateGlyph(e, t) {
            return t.vibrato === b.Slight
        }
        createNewGlyph(e, t) {
            return new Ur(b.Slight)
        }
        canExpand(e, t) {
            return !0
        }
    }
    class Jr extends Mr {
        get notationElement() {
            return e.NotationElement.EffectWideNoteVibrato
        }
        shouldCreateGlyphForNote(e) {
            return e.vibrato === b.Wide || e.isTieDestination && e.tieOrigin.vibrato === b.Wide
        }
        get sizingMode() {
            return di.GroupedOnBeatToEnd
        }
        createNewGlyph(e, t) {
            return new Hn(0,0,b.Wide,1.2)
        }
    }
    class qr extends Mr {
        get notationElement() {
            return e.NotationElement.EffectSlightNoteVibrato
        }
        shouldCreateGlyphForNote(e) {
            return e.vibrato === b.Slight || e.isTieDestination && e.tieOrigin.vibrato === b.Slight
        }
        get sizingMode() {
            return di.GroupedOnBeatToEnd
        }
        createNewGlyph(e, t) {
            return new Hn(0,0,b.Slight,1.2)
        }
        constructor() {
            super()
        }
    }
    class Qr extends Vi {
        get notationElement() {
            return e.NotationElement.EffectTap
        }
        get hideOnMultiTrack() {
            return !1
        }
        get canShareBand() {
            return !0
        }
        get sizingMode() {
            return di.SingleOnBeat
        }
        shouldCreateGlyph(e, t) {
            return t.slap || t.pop || t.tap
        }
        createNewGlyph(e, t) {
            let s = e.resources;
            return t.slap ? new zi(0,0,"S",s.effectFont,A.Left) : t.pop ? new zi(0,0,"P",s.effectFont,A.Left) : new zi(0,0,"T",s.effectFont,A.Left)
        }
        canExpand(e, t) {
            return !0
        }
    }
    class $r extends Li {
        doLayout() {
            super.doLayout(),
            this.height = 17 * this.scale
        }
        paint(e, t, s) {
            let i = 6 * this.scale
              , n = Math.max(this.width, 14 * this.scale)
              , r = this.height / 2;
            s.beginPath(),
            s.moveTo(e + this.x, t + this.y + r),
            s.quadraticCurveTo(e + this.x + n / 2, t + this.y + r, e + this.x + n, t + this.y + r - i),
            s.moveTo(e + this.x, t + this.y + r),
            s.quadraticCurveTo(e + this.x + n / 2, t + this.y + r, e + this.x + n, t + this.y + r + i),
            s.stroke()
        }
    }
    class Kr extends Vi {
        get notationElement() {
            return e.NotationElement.EffectFadeIn
        }
        get hideOnMultiTrack() {
            return !1
        }
        get canShareBand() {
            return !0
        }
        get sizingMode() {
            return di.SingleOnBeat
        }
        shouldCreateGlyph(e, t) {
            return t.fadeIn
        }
        createNewGlyph(e, t) {
            return new $r
        }
        canExpand(e, t) {
            return !0
        }
    }
    class jr extends Gn {
        constructor(e) {
            super(hi.OnNotes),
            this._label = e
        }
        doLayout() {
            this.renderer.settings.notation.extendLineEffectsToBeatEnd && (this.endPosition = hi.EndBeat,
            this.forceGroupedRendering = !0),
            super.doLayout(),
            this.height = this.renderer.resources.effectFont.size
        }
        paintNonGrouped(e, t, s) {
            let i = this.renderer.resources;
            s.font = i.effectFont;
            let n = s.textAlign;
            s.textAlign = A.Center,
            s.fillText(this._label, e + this.x, t + this.y),
            s.textAlign = n
        }
        paintGrouped(e, t, s, i) {
            this.paintNonGrouped(e, t, i);
            let n = 3 * this.scale
              , r = i.measureText(this._label)
              , a = e + this.x + r / 2 + n
              , o = t + this.y + 4 * this.scale
              , h = 8 * this.scale;
            if (s > a) {
                let e = a;
                for (; e < s; )
                    i.beginPath(),
                    i.moveTo(e, 0 | o),
                    i.lineTo(Math.min(e + h, s), 0 | o),
                    e += h + n,
                    i.stroke();
                i.beginPath(),
                i.moveTo(s, o - 5 * this.scale | 0),
                i.lineTo(s, o + 5 * this.scale | 0),
                i.stroke()
            }
        }
    }
    jr.LineSpacing = 3,
    jr.LineTopPadding = 4,
    jr.LineTopOffset = 5,
    jr.LineSize = 8;
    class Zr extends Mr {
        constructor(e) {
            switch (super(),
            this._beat = null,
            this._harmonicType = e,
            e) {
            case M.None:
                this._effectId = "harmonics-none";
                break;
            case M.Natural:
                this._effectId = "harmonics-natural";
                break;
            case M.Artificial:
                this._effectId = "harmonics-artificial";
                break;
            case M.Pinch:
                this._effectId = "harmonics-pinch";
                break;
            case M.Tap:
                this._effectId = "harmonics-tap";
                break;
            case M.Semi:
                this._effectId = "harmonics-semi";
                break;
            case M.Feedback:
                this._effectId = "harmonics-feedback";
                break;
            default:
                this._effectId = ""
            }
        }
        get effectId() {
            return this._effectId
        }
        get notationElement() {
            return e.NotationElement.EffectHarmonics
        }
        shouldCreateGlyphForNote(e) {
            return !(!e.isHarmonic || e.harmonicType !== this._harmonicType) && (e.beat !== this._beat && (this._beat = e.beat),
            !0)
        }
        get sizingMode() {
            return di.GroupedOnBeat
        }
        createNewGlyph(e, t) {
            return new jr(Zr.harmonicToString(this._harmonicType))
        }
        static harmonicToString(e) {
            switch (e) {
            case M.Natural:
                return "N.H.";
            case M.Artificial:
                return "A.H.";
            case M.Pinch:
                return "P.H.";
            case M.Tap:
                return "T.H.";
            case M.Semi:
                return "S.H.";
            case M.Feedback:
                return "Fdbk."
            }
            return ""
        }
    }
    class ea extends Vi {
        get notationElement() {
            return e.NotationElement.EffectLetRing
        }
        get canShareBand() {
            return !1
        }
        get hideOnMultiTrack() {
            return !1
        }
        shouldCreateGlyph(e, t) {
            return t.isLetRing
        }
        get sizingMode() {
            return di.GroupedOnBeat
        }
        createNewGlyph(e, t) {
            return new jr("LetRing")
        }
        canExpand(e, t) {
            return !0
        }
    }
    class ta extends Vi {
        get notationElement() {
            return e.NotationElement.EffectCapo
        }
        get hideOnMultiTrack() {
            return !1
        }
        get canShareBand() {
            return !1
        }
        get sizingMode() {
            return di.SingleOnBeat
        }
        shouldCreateGlyph(e, t) {
            return 0 === t.index && 0 === t.voice.bar.index && 0 !== t.voice.bar.staff.capo
        }
        createNewGlyph(e, t) {
            return new zi(0,0,"Capo. fret " + t.voice.bar.staff.capo,e.resources.effectFont,A.Left)
        }
        canExpand(e, t) {
            return !1
        }
    }
    class sa extends Vi {
        get notationElement() {
            return e.NotationElement.EffectFingering
        }
        get hideOnMultiTrack() {
            return !1
        }
        get canShareBand() {
            return !0
        }
        get sizingMode() {
            return di.SingleOnBeat
        }
        shouldCreateGlyph(e, t) {
            return !(0 !== t.voice.index || t.isRest || e.notation.fingeringMode !== _.SingleNoteEffectBand && e.notation.fingeringMode !== _.SingleNoteEffectBandForcePiano) && (1 === t.notes.length && t.notes[0].isFingering)
        }
        createNewGlyph(e, t) {
            var s;
            let i = E.Unknown
              , n = !1
              , r = t.notes[0];
            r.leftHandFinger !== E.Unknown ? (i = r.leftHandFinger,
            n = !0) : r.rightHandFinger !== E.Unknown && (i = r.rightHandFinger);
            let a = null !== (s = ht.fingerToString(e.settings, t, i, n)) && void 0 !== s ? s : "";
            return new zi(0,0,a,e.resources.fingeringFont,A.Left)
        }
        canExpand(e, t) {
            return !0
        }
    }
    class ia extends Mr {
        get notationElement() {
            return e.NotationElement.EffectPalmMute
        }
        shouldCreateGlyphForNote(e) {
            return e.isPalmMute
        }
        get sizingMode() {
            return di.GroupedOnBeat
        }
        createNewGlyph(e, t) {
            return new jr("P.M.")
        }
        constructor() {
            super()
        }
    }
    class na extends Ei {
        constructor(e, t, s) {
            super(e, t, Mi.GraceScale, na.getSymbol(s))
        }
        doLayout() {
            this.width = 9 * this.scale,
            this.height = 13 * this.scale
        }
        paint(e, t, s) {
            super.paint(e, t + this.height, s)
        }
        static getSymbol(e) {
            switch (e) {
            case O.Up:
                return I.StringsUpBow;
            case O.Down:
                return I.StringsDownBow;
            default:
                return I.None
            }
        }
    }
    class ra extends Vi {
        get notationElement() {
            return e.NotationElement.EffectPickStroke
        }
        get hideOnMultiTrack() {
            return !1
        }
        get canShareBand() {
            return !0
        }
        get sizingMode() {
            return di.SingleOnBeat
        }
        shouldCreateGlyph(e, t) {
            return t.pickStroke !== O.None
        }
        createNewGlyph(e, t) {
            return new na(0,0,t.pickStroke)
        }
        canExpand(e, t) {
            return !0
        }
    }
    class aa extends Mr {
        get notationElement() {
            return e.NotationElement.EffectPickSlide
        }
        shouldCreateGlyphForNote(e) {
            return e.slideOutType === m.PickSlideDown || e.slideOutType === m.PickSlideUp
        }
        get sizingMode() {
            return di.GroupedOnBeat
        }
        createNewGlyph(e, t) {
            return new jr("P.S.")
        }
        constructor() {
            super()
        }
    }
    class oa extends Li {
        constructor() {
            super(0, 0)
        }
        doLayout() {
            super.doLayout();
            const e = this.renderer.resources.effectFont;
            this.height = e.size + oa.Padding * this.scale
        }
        paint(e, t, s) {
            let i = this.renderer.resources;
            s.font = i.effectFont;
            let n = s.textAlign;
            s.textAlign = A.Center,
            s.fillText("T", e + this.x, t + this.y + s.font.size / 2),
            s.textAlign = n,
            s.strokeCircle(e + this.x, t + this.y + s.font.size / 2 + (oa.Padding - 1) * this.scale, s.font.size / 1.6)
        }
    }
    oa.Padding = 4;
    class ha extends Mr {
        get notationElement() {
            return e.NotationElement.EffectTap
        }
        get sizingMode() {
            return di.SingleOnBeat
        }
        shouldCreateGlyphForNote(e) {
            return e.isLeftHandTapped
        }
        createNewGlyph(e, t) {
            return new oa
        }
    }
    class la extends Vi {
        get notationElement() {
            return e.NotationElement.EffectNumberTonic
        }
        get hideOnMultiTrack() {
            return !1
        }
        get canShareBand() {
            return !1
        }
        get sizingMode() {
            return di.FullBar
        }
        shouldCreateGlyph(e, t) {
            const {bar: s} = t.voice;
            return 0 === t.index && (!s.previousBar || ei(s) !== ei(s.previousBar))
        }
        createNewGlyph(e, t) {
            const s = ei(t.voice.bar);
            return new zi(10 * e.scale,0,"1=" + $[s].replace("Sharp", "♯").replace("b", "♭"),e.resources.effectFont,A.Left)
        }
        canExpand(e, t) {
            return !1
        }
    }
    class ca extends Gn {
        constructor(e, t) {
            super(hi.PostNotes),
            this._ottava = e,
            this._aboveStaff = t
        }
        doLayout() {
            super.doLayout(),
            this.height = 8 * this.scale
        }
        paintNonGrouped(e, t, s) {
            this.paintOttava(e, t, s)
        }
        paintOttava(e, t, s) {
            let i = 0
              , n = null;
            switch (this._ottava) {
            case R._15ma:
                i = 37,
                n = [I.QuindicesimaAlta];
                break;
            case R._8va:
                i = 26,
                n = [I.OttavaAlta];
                break;
            case R._8vb:
                i = 23,
                n = [I.OttavaBassaVb];
                break;
            case R._15mb:
                i = 36,
                n = [I.Quindicesima, I.OctaveBaselineM, I.OctaveBaselineB]
            }
            return n && s.fillMusicFontSymbols(e + this.x - i * this.scale / 2, t + this.y + 10 * this.scale, .7 * this.scale, n, !1),
            i * this.scale / 2
        }
        paintGrouped(e, t, s, i) {
            let n = this.paintOttava(e, t, i)
              , r = 3 * this.scale
              , a = e + this.x + n + r
              , o = t + this.y;
            o += this._aboveStaff ? 2 * this.scale : this.height - 2 * this.scale;
            let h = 8 * this.scale;
            if (s > a) {
                let e = a;
                for (; e < s; )
                    i.beginPath(),
                    i.moveTo(e, 0 | o),
                    i.lineTo(Math.min(e + h, s), 0 | o),
                    e += h + r,
                    i.stroke();
                i.beginPath(),
                this._aboveStaff ? (i.moveTo(s, o),
                i.lineTo(s, t + this.y + this.height)) : (i.moveTo(s, o),
                i.lineTo(s, t + this.y)),
                i.stroke()
            }
        }
    }
    class da extends Vi {
        constructor(e) {
            super(),
            this._aboveStaff = e
        }
        get effectId() {
            return "ottavia-" + (this._aboveStaff ? "above" : "below")
        }
        get notationElement() {
            return e.NotationElement.EffectOttavia
        }
        get hideOnMultiTrack() {
            return !1
        }
        get canShareBand() {
            return !0
        }
        get sizingMode() {
            return di.GroupedOnBeat
        }
        shouldCreateGlyph(e, t) {
            switch (t.ottava) {
            case R._15ma:
            case R._8va:
                return this._aboveStaff;
            case R._8vb:
            case R._15mb:
                return !this._aboveStaff
            }
            return !1
        }
        createNewGlyph(e, t) {
            return new ca(t.ottava,this._aboveStaff)
        }
        canExpand(e, t) {
            return e.ottava === t.ottava
        }
    }
    class ua extends Gn {
        constructor(e, t, s) {
            super(hi.EndBeat),
            this._crescendo = V.None,
            this._crescendo = s,
            this.x = e,
            this.y = t
        }
        doLayout() {
            super.doLayout(),
            this.height = 17 * this.scale
        }
        paintGrouped(e, t, s, i) {
            let n = e + this.x
              , r = this.height * this.scale;
            i.beginPath(),
            this._crescendo === V.Crescendo ? (s -= ua.Padding * this.scale,
            i.moveTo(s, t + this.y),
            i.lineTo(n, t + this.y + r / 2),
            i.lineTo(s, t + this.y + r)) : (s -= ua.Padding * this.scale,
            i.moveTo(n, t + this.y),
            i.lineTo(s, t + this.y + r / 2),
            i.lineTo(n, t + this.y + r)),
            i.stroke()
        }
    }
    ua.Padding = Mi.QuarterNoteHeadWidth / 2 | 0;
    class pa extends Vi {
        get notationElement() {
            return e.NotationElement.EffectCrescendo
        }
        get hideOnMultiTrack() {
            return !1
        }
        get canShareBand() {
            return !0
        }
        get sizingMode() {
            return di.GroupedOnBeatToEnd
        }
        shouldCreateGlyph(e, t) {
            return t.crescendo !== V.None
        }
        createNewGlyph(e, t) {
            return new ua(0,0,t.crescendo)
        }
        canExpand(e, t) {
            return e.crescendo === t.crescendo
        }
    }
    class ga extends Ei {
        constructor(e, t, s, i=!1) {
            super(e, t, i ? Mi.GraceScale : 1, ga.getMusicSymbol(s)),
            this._isGrace = i,
            this._accidentalType = s
        }
        static getMusicSymbol(e) {
            switch (e) {
            case qt.Natural:
                return I.AccidentalNatural;
            case qt.Sharp:
                return I.AccidentalSharp;
            case qt.Flat:
                return I.AccidentalFlat;
            case qt.NaturalQuarterNoteUp:
                return I.AccidentalQuarterToneNaturalArrowUp;
            case qt.SharpQuarterNoteUp:
                return I.AccidentalQuarterToneSharpArrowUp;
            case qt.FlatQuarterNoteUp:
                return I.AccidentalQuarterToneFlatArrowUp;
            case qt.DoubleSharp:
                return I.AccidentalDoubleSharp;
            case qt.DoubleFlat:
                return I.AccidentalDoubleFlat
            }
            return I.None
        }
        doLayout() {
            switch (this._accidentalType) {
            case qt.DoubleFlat:
                this.width = 18;
                break;
            default:
                this.width = 8
            }
            this.width = this.width * (this._isGrace ? Mi.GraceScale : 1) * this.scale
        }
    }
    class fa extends Ei {
        constructor(e, t, s, i) {
            super(e, t, 1, fa.getSymbol(s)),
            this._clef = s,
            this._clefOttava = i
        }
        doLayout() {
            switch (this._clef) {
            case H.Neutral:
                this.width = 15 * this.scale;
                break;
            case H.C3:
            case H.C4:
            case H.F4:
            case H.G2:
                this.width = 28 * this.scale
            }
        }
        static getSymbol(e) {
            switch (e) {
            case H.Neutral:
                return I.UnpitchedPercussionClef1;
            case H.C3:
            case H.C4:
                return I.CClef;
            case H.F4:
                return I.FClef;
            case H.G2:
                return I.GClef;
            default:
                return I.None
            }
        }
        paint(e, t, s) {
            let i;
            super.paint(e, t, s);
            let n = !1;
            switch (this._clefOttava) {
            case R._15ma:
                i = new Ei(-4 * this.scale,0,.5,I.Quindicesima),
                n = !0;
                break;
            case R._8va:
                i = new Ei(-2 * this.scale,0,.5,I.Ottava),
                n = !0;
                break;
            case R._8vb:
                i = new Ei(-6 * this.scale,0,.5,I.Ottava);
                break;
            case R._15mb:
                i = new Ei(-8 * this.scale,0,.5,I.Quindicesima);
                break;
            default:
                return
            }
            let r = 0
              , a = 0;
            switch (this._clef) {
            case H.Neutral:
                r = n ? -12 : 15,
                a = 0;
                break;
            case H.C3:
            case H.C4:
                r = n ? -19 : 27,
                a = 0;
                break;
            case H.F4:
                r = n ? -9 : 27,
                a = -4;
                break;
            case H.G2:
                r = n ? -37 : 30,
                a = 0;
                break;
            default:
                return
            }
            i.renderer = this.renderer,
            i.doLayout();
            let o = this.width / 2;
            i.paint(e + this.x + o + a * this.scale, t + this.y + r * this.scale, s)
        }
    }
    class ma extends Ei {
        constructor(e, t, s) {
            super(e, t, 1, ma.getSymbol(s))
        }
        static getSymbol(e) {
            switch (e) {
            case a.None:
                return I.None;
            case a.Normal:
                return I.ArticAccentAbove;
            case a.Heavy:
                return I.ArticMarcatoAbove;
            default:
                return I.None
            }
        }
        doLayout() {
            this.width = 9 * this.scale,
            this.height = 9 * this.scale
        }
        paint(e, t, s) {
            super.paint(e - 2 * this.scale, t + this.height, s)
        }
    }
    class ya extends Ei {
        constructor(e, t, s) {
            super(e, t, s ? Mi.GraceScale : 1, I.NoteheadXOrnate),
            this._isGrace = s
        }
        doLayout() {
            this.width = 9 * (this._isGrace ? Mi.GraceScale : 1) * this.scale,
            this.height = Mi.NoteHeadHeight * this.scale
        }
    }
    class ba extends Ei {
        constructor(e, t, s, i) {
            super(e, t, i ? Mi.GraceScale : 1, ba.getSymbol(s)),
            this._isGrace = i
        }
        static getSymbol(e) {
            switch (e) {
            case d.QuadrupleWhole:
            case d.DoubleWhole:
            case d.Whole:
            case d.Half:
                return I.NoteheadDiamondWhiteWide;
            default:
                return I.NoteheadDiamondBlackWide
            }
        }
        doLayout() {
            this.width = 9 * (this._isGrace ? Mi.GraceScale : 1) * this.scale,
            this.height = Mi.NoteHeadHeight * this.scale
        }
    }
    class Sa extends ui {
        constructor(e) {
            super(0, 0),
            this._isOpen = e
        }
        doLayout() {
            super.doLayout(),
            this.width = Sa.Size * this.scale
        }
        paint(e, t, s) {
            this._isOpen ? Wn.paintTie(s, this.scale, e + this.x + this.width, t + this.y + this.height, e + this.x + this.width, t + this.y, !1, 6, 3) : Wn.paintTie(s, this.scale, e + this.x, t + this.y, e + this.x, t + this.y + this.height, !1, 6, 3)
        }
    }
    Sa.Size = 6;
    class wa {
        constructor(e, t) {
            this.line = 0,
            this.line = e,
            this.isGhost = t
        }
    }
    class _a extends ui {
        constructor(e) {
            super(0, 0),
            this._infos = [],
            this._glyphs = [],
            this.isEmpty = !0,
            this._isOpen = e
        }
        addParenthesis(t) {
            let s = this.renderer
              , i = s.getNoteLine(t)
              , n = t.isGhost || this.isTiedBend(t) && s.settings.notation.isNotationElementVisible(e.NotationElement.ParenthesisOnTiedBends);
            this.addParenthesisOnLine(i, n)
        }
        addParenthesisOnLine(e, t) {
            let s = new wa(e,t);
            this._infos.push(s),
            t && (this.isEmpty = !1)
        }
        isTiedBend(e) {
            return !!e.isTieDestination && (!!e.tieOrigin.hasBend || this.isTiedBend(e.tieOrigin))
        }
        doLayout() {
            let e = this.renderer;
            this._infos.sort(( (e, t) => e.line - t.line));
            let t = null
              , s = e.getScoreHeight(1);
            for (let i = 0, n = this._infos.length; i < n; i++) {
                let n;
                if (this._infos[i].isGhost)
                    if (t) {
                        let n = e.getScoreY(this._infos[i].line) + s;
                        t.height = n - t.y
                    } else
                        n = new Sa(this._isOpen),
                        n.renderer = this.renderer,
                        n.y = e.getScoreY(this._infos[i].line) - s,
                        n.height = 2 * s,
                        n.doLayout(),
                        this._glyphs.push(n),
                        t = n;
                else
                    t = null
            }
            this.width = this._glyphs.length > 0 ? this._glyphs[0].width : 0
        }
        paint(e, t, s) {
            super.paint(e, t, s);
            for (let i of this._glyphs)
                i.paint(e + this.x, t + this.y, s)
        }
    }
    class Ba {
        constructor(e, t) {
            this.line = 0,
            this.glyph = e,
            this.line = t
        }
    }
    class Ta extends ui {
        constructor() {
            super(0, 0),
            this._infos = [],
            this._noteHeadPadding = 0,
            this.minNote = null,
            this.maxNote = null,
            this.spacingChanged = new Ze,
            this.upLineX = 0,
            this.downLineX = 0,
            this.displacedX = 0,
            this.noteStartX = 0
        }
        add(e, t) {
            let s = new Ba(e,t);
            this._infos.push(s),
            (!this.minNote || this.minNote.line > s.line) && (this.minNote = s),
            (!this.maxNote || this.maxNote.line < s.line) && (this.maxNote = s)
        }
        get hasTopOverflow() {
            return !!this.minNote && this.minNote.line <= 0
        }
        get hasBottomOverflow() {
            return !!this.maxNote && this.maxNote.line > 8
        }
        doLayout() {
            this._infos.sort(( (e, t) => t.line - e.line));
            let e = 0
              , t = !1
              , s = 0
              , i = !1
              , n = this.direction
              , r = 0;
            for (let a = 0, o = this._infos.length; a < o; a++) {
                let o = this._infos[a].glyph;
                o.renderer = this.renderer,
                o.doLayout();
                let h = !1;
                0 === a ? e = o.width : Math.abs(s - this._infos[a].line) <= 1 ? t ? t = !1 : (h = !0,
                o.x = e,
                i = !0,
                t = !0) : t = !1,
                n === Ut.Down ? o.x = h ? 0 : e : o.x = h ? e : 0,
                o.x += this.noteStartX,
                s = this._infos[a].line,
                r = Math.max(r, o.x + o.width)
            }
            i ? (this._noteHeadPadding = 0,
            this.upLineX = e,
            this.downLineX = e) : (this._noteHeadPadding = n === Ut.Down ? -e : 0,
            r += this._noteHeadPadding,
            this.upLineX = r,
            this.downLineX = 0),
            this.displacedX = e,
            this.width = r
        }
        paint(e, t, s) {
            e += this.x,
            t += this.y;
            let i = this.renderer
              , n = 3 * this.scale
              , r = this.width - this.noteStartX + 2 * n;
            if (this.hasTopOverflow) {
                let a = s.color;
                s.color = i.resources.staffLineColor;
                let o = -2;
                for (; o >= this.minNote.line; ) {
                    let a = t + i.getScoreY(o);
                    s.fillRect(e - n + this.noteStartX, a, r, this.scale),
                    o -= 2
                }
                s.color = a
            }
            if (this.hasBottomOverflow) {
                let a = s.color;
                s.color = i.resources.staffLineColor;
                let o = 10;
                for (; o <= this.maxNote.line; ) {
                    let a = t + i.getScoreY(o);
                    s.fillRect(e - n + this.noteStartX, a, r, this.scale),
                    o += 2
                }
                s.color = a
            }
            let a = this._infos
              , o = e + this._noteHeadPadding;
            for (let e of a)
                e.glyph.renderer = this.renderer,
                e.glyph.paint(o, t, s)
        }
    }
    class Na extends Ta {
        constructor() {
            super(),
            this._noteGlyphLookup = new Map,
            this._notes = [],
            this._tremoloPicking = null,
            this.aboveBeatEffects = new Map,
            this.belowBeatEffects = new Map
        }
        get direction() {
            return this.beamingHelper.direction
        }
        getNoteX(e, t) {
            if (this._noteGlyphLookup.has(e.id)) {
                let s = this._noteGlyphLookup.get(e.id)
                  , i = this.x + s.x + this._noteHeadPadding;
                switch (t) {
                case ci.Left:
                    break;
                case ci.Center:
                    i += s.width / 2;
                    break;
                case ci.Right:
                    i += s.width
                }
                return i
            }
            return 0
        }
        getNoteY(e, t) {
            if (this._noteGlyphLookup.has(e.id)) {
                const s = this._noteGlyphLookup.get(e.id);
                let i = this.y + s.y;
                switch (t) {
                case li.TopWithStem:
                    i -= this.renderer.getStemSize(this.beamingHelper);
                    break;
                case li.Top:
                    i -= s.height / 2;
                    break;
                case li.Center:
                    break;
                case li.Bottom:
                    i += s.height / 2;
                    break;
                case li.BottomWithStem:
                    i += this.renderer.getStemSize(this.beamingHelper)
                }
                return i
            }
            return 0
        }
        addNoteGlyph(e, t, s) {
            super.add(e, s),
            this._noteGlyphLookup.set(t.id, e),
            this._notes.push(t)
        }
        updateBeamingHelper(e) {
            this.beamingHelper && this.beamingHelper.registerBeatLineX("score", this.beat, e + this.x + this.upLineX, e + this.x + this.downLineX)
        }
        doLayout() {
            super.doLayout();
            let e = this.direction;
            for (const e of this.aboveBeatEffects.values())
                e.renderer = this.renderer,
                e.doLayout();
            for (const e of this.belowBeatEffects.values())
                e.renderer = this.renderer,
                e.doLayout();
            if (this.beat.isTremolo) {
                let t = 0
                  , s = e === Ut.Up ? this.minNote : this.maxNote
                  , i = e === Ut.Up ? this.displacedX : 0
                  , n = this.beat.tremoloSpeed;
                switch (n) {
                case d.ThirtySecond:
                    t = e === Ut.Up ? -15 : 15;
                    break;
                case d.Sixteenth:
                    t = e === Ut.Up ? -12 : 15;
                    break;
                case d.Eighth:
                    t = e === Ut.Up ? -10 : 10;
                    break;
                default:
                    t = e === Ut.Up ? -10 : 15
                }
                this._tremoloPicking = new jn(i,s.glyph.y + t * this.scale,n),
                this._tremoloPicking.renderer = this.renderer,
                this._tremoloPicking.doLayout()
            }
        }
        buildBoundingsLookup(e, t, s) {
            for (let i of this._notes)
                if (this._noteGlyphLookup.has(i.id)) {
                    let n = this._noteGlyphLookup.get(i.id)
                      , r = new ps;
                    r.note = i,
                    r.noteHeadBounds = new ss,
                    r.noteHeadBounds.x = t + this.x + this._noteHeadPadding + n.x,
                    r.noteHeadBounds.y = s + this.y + n.y - n.height / 2,
                    r.noteHeadBounds.w = n.width,
                    r.noteHeadBounds.h = n.height,
                    e.addNote(r)
                }
        }
        paint(e, t, s) {
            let i = this.renderer
              , n = 0
              , r = 0
              , a = 1
              , o = -a;
            this.beamingHelper.direction === Ut.Up ? (r = i.getScoreY(this.maxNote.line - .5),
            n = i.getScoreY(this.minNote.line - 2)) : (r = i.getScoreY(this.minNote.line - 1.5),
            n = i.getScoreY(this.maxNote.line + 1),
            o *= -1,
            a *= -1);
            for (const i of this.aboveBeatEffects.values())
                n += o * i.height,
                i.paint(e + this.x + 2 * this.scale, t + this.y + n, s);
            for (const i of this.belowBeatEffects.values())
                r += a * i.height,
                i.paint(e + this.x + 2 * this.scale, t + this.y + r, s);
            super.paint(e, t, s),
            this._tremoloPicking && this._tremoloPicking.paint(e, t, s)
        }
    }
    class va {
        constructor() {
            this.x = 0,
            this.y = -3e3,
            this.width = 0
        }
    }
    class xa extends pi {
        constructor() {
            super(0, 0)
        }
        doLayout() {
            if (!this.glyphs || 0 === this.glyphs.length)
                return void (this.width = 0);
            this.glyphs.sort(( (e, t) => e.y < t.y ? -1 : e.y > t.y ? 1 : 0));
            let e = [];
            e.push(new va);
            let t = 21 * this.scale;
            for (let s = 0, i = this.glyphs.length; s < i; s++) {
                let i = this.glyphs[s];
                i.renderer = this.renderer,
                i.doLayout();
                let n = 0;
                for (; e[n].y > i.y; )
                    n++,
                    n === e.length && e.push(new va);
                i.x = n,
                e[n].y = i.y + t,
                e[n].width < i.width && (e[n].width = i.width)
            }
            this.width = 0;
            for (const t of e)
                this.width += t.width,
                t.x = this.width;
            for (let t = 0, s = this.glyphs.length; t < s; t++) {
                let s = this.glyphs[t];
                const i = e[s.x];
                s.x = this.width - i.x
            }
        }
    }
    class ka extends Ta {
        constructor(e, t=!1) {
            super(),
            this._showParenthesis = !1,
            this._noteValueLookup = new Map,
            this._accidentals = new xa,
            this._preNoteParenthesis = null,
            this._postNoteParenthesis = null,
            this.isEmpty = !0,
            this.noteHeadOffset = 0,
            this._showParenthesis = t,
            t && (this._preNoteParenthesis = new _a(!0),
            this._postNoteParenthesis = new _a(!1))
        }
        get direction() {
            return Ut.Up
        }
        containsNoteValue(e) {
            return this._noteValueLookup.has(e)
        }
        getNoteValueY(e) {
            return this._noteValueLookup.has(e) ? this.y + this._noteValueLookup.get(e).y : 0
        }
        addGlyph(e, t=!1) {}
        doLayout() {
            let e = 0;
            this._showParenthesis && (this._preNoteParenthesis.x = e,
            this._preNoteParenthesis.renderer = this.renderer,
            this._preNoteParenthesis.doLayout(),
            e += this._preNoteParenthesis.width + ka.ElementPadding * this.scale),
            this._accidentals.isEmpty || (e += this._accidentals.width + ka.ElementPadding * this.scale,
            this._accidentals.x = e,
            this._accidentals.renderer = this.renderer,
            this._accidentals.doLayout(),
            e += this._accidentals.width + ka.ElementPadding * this.scale),
            this.noteStartX = e,
            super.doLayout(),
            this.noteHeadOffset = this.noteStartX + (this.width - this.noteStartX) / 2,
            this._showParenthesis && (this._postNoteParenthesis.x = this.width + ka.ElementPadding * this.scale,
            this._postNoteParenthesis.renderer = this.renderer,
            this._postNoteParenthesis.doLayout(),
            this.width += this._postNoteParenthesis.width + ka.ElementPadding * this.scale)
        }
        paint(e, t, s) {
            this._accidentals.isEmpty || this._accidentals.paint(e + this.x, t + this.y, s),
            this._showParenthesis && (this._preNoteParenthesis.paint(e + this.x, t + this.y, s),
            this._postNoteParenthesis.paint(e + this.x, t + this.y, s)),
            super.paint(e, t, s)
        }
    }
    ka.ElementPadding = 2;
    class Pa extends ui {
        constructor() {
            super(...arguments),
            this.BendNoteHeads = []
        }
        drawBendSlur(e, t, s, i, n, r, a, o) {
            Wn.drawBendSlur(e, t, s, i, n, r, a, o)
        }
        doLayout() {
            super.doLayout(),
            this.width = 0;
            for (let e of this.BendNoteHeads)
                e.doLayout(),
                this.width += e.width + 10 * this.scale
        }
        getTieDirection(e, t) {
            switch (t.getBeatDirection(e)) {
            case Ut.Up:
                return Ut.Down;
            default:
                return Ut.Up
            }
        }
    }
    Pa.EndPadding = 8;
    class Fa extends Pa {
        constructor(e) {
            super(0, 0),
            this._beat = e
        }
        doLayout() {
            let e = this.renderer.settings.notation.notationMode;
            switch (this._beat.whammyBarType) {
            case S.None:
            case S.Custom:
            case S.Hold:
                return;
            case S.Dive:
            case S.PrediveDive:
                {
                    let e = new ka(this._beat,!1);
                    e.renderer = this.renderer;
                    let t = this._beat.whammyBarPoints[this._beat.whammyBarPoints.length - 1];
                    for (let s of this._beat.notes)
                        s.isTieOrigin || e.addGlyph(this.getBendNoteValue(s, t), t.value % 2 != 0);
                    e.doLayout(),
                    this.BendNoteHeads.push(e)
                }
                break;
            case S.Dip:
                if (e === B.SongBook) {
                    let e = this.renderer.resources;
                    this.renderer.simpleWhammyOverflow = 1.5 * e.tablatureFont.size + Fa.SimpleDipHeight * this.scale + Fa.SimpleDipPadding * this.scale
                } else {
                    let e = new ka(this._beat,!1);
                    if (e.renderer = this.renderer,
                    this.renderer.settings.notation.notationMode === B.GuitarPro) {
                        let t = this._beat.whammyBarPoints[1];
                        for (let s of this._beat.notes)
                            e.addGlyph(this.getBendNoteValue(s, this._beat.whammyBarPoints[1]), t.value % 2 != 0)
                    }
                    e.doLayout(),
                    this.BendNoteHeads.push(e);
                    let t = new ka(this._beat,!1);
                    if (t.renderer = this.renderer,
                    this.renderer.settings.notation.notationMode === B.GuitarPro) {
                        let e = this._beat.whammyBarPoints[this._beat.whammyBarPoints.length - 1];
                        for (let s of this._beat.notes)
                            t.addGlyph(this.getBendNoteValue(s, e), e.value % 2 != 0)
                    }
                    t.doLayout(),
                    this.BendNoteHeads.push(t)
                }
                break;
            case S.Predive:
            }
            super.doLayout()
        }
        paint(e, t, s) {
            let i = this._beat;
            switch (i.whammyBarType) {
            case S.None:
            case S.Custom:
                return
            }
            let n = this.renderer.settings.notation.notationMode
              , r = this.renderer.scoreRenderer.layout.getRendererForBar(this.renderer.staffRenderer.staveId, i.voice.bar)
              , a = e + r.x + r.getBeatX(i, hi.MiddleNotes)
              , o = this.getTieDirection(i, r)
              , l = 1 === this._beat.notes.length ? o : Ut.Up
              , c = s.textAlign;
            for (let c = 0; c < i.notes.length; c++) {
                let d = i.notes[c]
                  , u = t + r.y;
                c > 0 && c >= (this._beat.notes.length / 2 | 0) && (l = Ut.Down),
                l === Ut.Down ? u += r.getNoteY(d, li.Bottom) : u += r.getNoteY(d, li.Top);
                let p = e + r.x;
                i.isLastOfVoice ? p += r.width : p += r.getBeatX(i, hi.EndBeat),
                p -= 8 * this.scale;
                let g = i.whammyStyle === h.Gradual && 0 === c ? "grad." : ""
                  , f = null;
                d.isTieOrigin && (f = this.renderer.scoreRenderer.layout.getRendererForBar(this.renderer.staffRenderer.staveId, d.tieDestination.beat.voice.bar),
                f && f.staffRenderer === r.staffRenderer ? p = e + f.x + f.getBeatX(d.tieDestination.beat, hi.MiddleNotes) : f = null);
                let m = Mi.NoteHeadHeight * this.scale * Mi.GraceScale * .5;
                l === Ut.Up && (m = -m);
                let y = i.whammyBarPoints.length > 0 ? this.getBendNoteValue(d, i.whammyBarPoints[i.whammyBarPoints.length - 1]) : 0
                  , b = 0
                  , w = !1;
                switch (this.BendNoteHeads.length > 0 && this.BendNoteHeads[0].containsNoteValue(y) ? (b = this.BendNoteHeads[0].getNoteValueY(y) + m,
                w = !0) : f && (d.isTieOrigin && d.tieDestination.beat.hasWhammyBar || d.beat.isContinuedWhammy) ? (b = t + f.y + f.getNoteY(d.tieDestination, li.Top),
                w = !0,
                l === Ut.Down && (b += Mi.NoteHeadHeight * this.scale)) : d.isTieOrigin && (b = f ? t + f.y + f.getNoteY(d.tieDestination, li.Top) : u,
                l === Ut.Down && (b += Mi.NoteHeadHeight * this.scale)),
                i.whammyBarType) {
                case S.Hold:
                    d.isTieOrigin && Wn.paintTie(s, this.scale, a, u, p, b, o === Ut.Down, 22, 4);
                    break;
                case S.Dive:
                    0 === c && (this.BendNoteHeads[0].x = p - this.BendNoteHeads[0].noteHeadOffset,
                    this.BendNoteHeads[0].y = t + r.y,
                    this.BendNoteHeads[0].paint(0, 0, s),
                    this.BendNoteHeads[0].containsNoteValue(y) && (b += this.BendNoteHeads[0].y)),
                    w ? this.drawBendSlur(s, a, u, p, b, l === Ut.Down, this.scale, g) : d.isTieOrigin && Wn.paintTie(s, this.scale, a, u, p, b, o === Ut.Down, 22, 4);
                    break;
                case S.Dip:
                    if (n === B.SongBook) {
                        if (0 === c) {
                            let i = e + r.x + r.getBeatX(this._beat, hi.OnNotes) - 2 * this.scale
                              , n = e + r.x + r.getBeatX(this._beat, hi.PostNotes) + 2 * this.scale
                              , a = (i + n) / 2
                              , o = ((this._beat.whammyBarPoints[1].value - this._beat.whammyBarPoints[0].value) / 4 | 0).toString();
                            s.font = this.renderer.resources.tablatureFont,
                            s.fillText(o, a, t + this.y);
                            let h = t + this.y + s.font.size + 2 * this.scale
                              , l = h + Fa.SimpleDipHeight * this.scale;
                            this._beat.whammyBarPoints[1].value > this._beat.whammyBarPoints[0].value ? (s.moveTo(i, l),
                            s.lineTo(a, h),
                            s.lineTo(n, l)) : (s.moveTo(i, h),
                            s.lineTo(a, l),
                            s.lineTo(n, h)),
                            s.stroke()
                        }
                        d.isTieOrigin && Wn.paintTie(s, this.scale, a, u, p, b, o === Ut.Down, 22, 4)
                    } else {
                        let e = (a + p) / 2;
                        this.BendNoteHeads[0].x = e - this.BendNoteHeads[0].noteHeadOffset,
                        this.BendNoteHeads[0].y = t + r.y,
                        this.BendNoteHeads[0].paint(0, 0, s);
                        let n = this.getBendNoteValue(d, i.whammyBarPoints[1])
                          , o = this.BendNoteHeads[0].getNoteValueY(n) + m;
                        this.drawBendSlur(s, a, u, e, o, l === Ut.Down, this.scale, g),
                        this.BendNoteHeads[1].x = p - this.BendNoteHeads[1].noteHeadOffset,
                        this.BendNoteHeads[1].y = t + r.y,
                        this.BendNoteHeads[1].paint(0, 0, s),
                        b = this.BendNoteHeads[1].getNoteValueY(y) + m,
                        this.drawBendSlur(s, e, o, p, b, l === Ut.Down, this.scale, g)
                    }
                    break;
                case S.PrediveDive:
                case S.Predive:
                    let h = e + r.x + r.getBeatX(d.beat, hi.PreNotes);
                    h += r.getPreNotesGlyphForBeat(d.beat).prebendNoteHeadOffset;
                    let f = t + r.y + m;
                    this.drawBendSlur(s, h, f, a, u, l === Ut.Down, this.scale, g),
                    this.BendNoteHeads.length > 0 && (this.BendNoteHeads[0].x = p - this.BendNoteHeads[0].noteHeadOffset,
                    this.BendNoteHeads[0].y = t + r.y,
                    this.BendNoteHeads[0].paint(0, 0, s),
                    this.drawBendSlur(s, a, u, p, b, l === Ut.Down, this.scale, g))
                }
            }
            s.textAlign = c
        }
        getBendNoteValue(e, t) {
            return e.displayValueWithoutBend + (t.value / 2 | 0)
        }
    }
    Fa.SimpleDipHeight = 2 * Kn.PerHalfSize,
    Fa.SimpleDipPadding = 2;
    class Ca extends Ei {
        constructor(e, t, s, i, n) {
            super(e, t, n ? Mi.GraceScale : 1, s.getSymbol(i)),
            this._isGrace = n,
            this._articulation = s
        }
        paint(e, t, s) {
            let i = this._isGrace ? this.scale : 0;
            s.fillMusicFontSymbol(e + this.x, t + this.y + i, this.glyphScale * this.scale, this.symbol, !1),
            this._articulation.techniqueSymbol !== I.None && this._articulation.techniqueSymbolPlacement === G.Middle && s.fillMusicFontSymbol(e + this.x, t + this.y + i, this.glyphScale * this.scale, this._articulation.techniqueSymbol, !1)
        }
        doLayout() {
            let e = (this._isGrace ? Mi.GraceScale : 1) * this.scale;
            switch (this.symbol) {
            case I.NoteheadWhole:
                this.width = 14;
                break;
            case I.NoteheadCircleX:
            case I.NoteheadDiamondWhite:
                this.width = 9;
                break;
            case I.NoteheadHeavyXHat:
            case I.NoteheadHeavyX:
                this.width = 13;
                break;
            default:
                this.width = 10
            }
            this.width = this.width * (this._isGrace ? Mi.GraceScale : 1) * this.scale,
            this.height = Mi.NoteHeadHeight * e
        }
    }
    class La extends Ei {
        constructor(e, t) {
            super(e, t, Mi.GraceScale, I.ArticStaccatoAbove)
        }
        doLayout() {
            this.width = Mi.QuarterNoteHeadWidth * this.scale,
            this.height = 7 * this.scale
        }
        paint(e, t, s) {
            super.paint(e + 3 * this.scale, t + 5 * this.scale, s)
        }
    }
    class Ea extends Ei {
        constructor(e, t) {
            super(e, t, .5, I.PictEdgeOfCymbal)
        }
        doLayout() {
            this.width = 22 * this.scale,
            this.height = 15 * this.scale
        }
        paint(e, t, s) {
            super.paint(e - 3 * this.scale, t + this.height, s)
        }
    }
    class Ma extends Ei {
        constructor(e, t) {
            super(e, t, Mi.GraceScale, I.GuitarGolpe)
        }
        doLayout() {
            this.width = 9 * this.scale,
            this.height = 10 * this.scale
        }
        paint(e, t, s) {
            super.paint(e, t + this.height, s)
        }
    }
    class Da extends Ii {
        constructor() {
            super(...arguments),
            this._collisionOffset = -1e3,
            this._skipPaint = !1,
            this.noteHeads = null,
            this.restGlyph = null
        }
        getNoteX(e, t) {
            return this.noteHeads ? this.noteHeads.getNoteX(e, t) : 0
        }
        buildBoundingsLookup(e, t, s) {
            this.noteHeads && this.noteHeads.buildBoundingsLookup(e, t + this.x, s + this.y)
        }
        getNoteY(e, t) {
            return this.noteHeads ? this.noteHeads.getNoteY(e, t) : 0
        }
        updateBeamingHelper() {
            if (this.noteHeads)
                this.noteHeads.updateBeamingHelper(this.container.x + this.x);
            else if (this.restGlyph && (this.restGlyph.updateBeamingHelper(this.container.x + this.x),
            this.renderer.bar.isMultiVoice && -1e3 === this._collisionOffset)) {
                this._collisionOffset = this.renderer.helpers.collisionHelper.applyRestCollisionOffset(this.container.beat, this.restGlyph.y, this.renderer.getScoreHeight(1)),
                this.y += this._collisionOffset;
                const e = this.renderer.helpers.collisionHelper.restDurationsByDisplayTime;
                e.has(this.container.beat.playbackStart) && e.get(this.container.beat.playbackStart).has(this.container.beat.playbackDuration) && e.get(this.container.beat.playbackStart).get(this.container.beat.playbackDuration) !== this.container.beat.id && (this._skipPaint = !0)
            }
        }
        paint(e, t, s) {
            this._skipPaint || super.paint(e, t, s)
        }
        doLayout() {
            let e = this.renderer;
            if (!this.container.beat.isEmpty)
                if (this.container.beat.isRest) {
                    let t = 2 * Math.ceil((this.renderer.bar.staff.standardNotationLineCount - 1) / 2);
                    this.container.beat.duration === d.Whole && 1 !== this.renderer.bar.staff.standardNotationLineCount && 3 !== this.renderer.bar.staff.standardNotationLineCount && (t -= 2);
                    const s = new Qn(0,e.getScoreY(t),this.container.beat.duration);
                    if (this.restGlyph = s,
                    s.beat = this.container.beat,
                    s.beamingHelper = this.beamingHelper,
                    this.addGlyph(s),
                    this.renderer.bar.isMultiVoice)
                        if (0 === this.container.beat.voice.index) {
                            const t = _i.computeLineHeightsForRest(this.container.beat.duration);
                            let i = s.y - e.getScoreHeight(t[0])
                              , n = s.y + e.getScoreHeight(t[1]);
                            this.renderer.helpers.collisionHelper.reserveBeatSlot(this.container.beat, i, n)
                        } else
                            this.renderer.helpers.collisionHelper.registerRest(this.container.beat);
                    if (this.beamingHelper && this.beamingHelper.applyRest(this.container.beat, t),
                    this.container.beat.dots > 0) {
                        this.addGlyph(new On(0,0,5 * this.scale));
                        for (let e = 0; e < this.container.beat.dots; e++) {
                            let e = new pi(0,0);
                            e.renderer = this.renderer,
                            this.createBeatDot(t, e),
                            this.addGlyph(e)
                        }
                    }
                } else {
                    const t = new Na;
                    this.noteHeads = t,
                    t.beat = this.container.beat,
                    t.beamingHelper = this.beamingHelper;
                    let s = new _a(!1);
                    s.renderer = this.renderer;
                    for (let e of this.container.beat.notes)
                        e.isVisible && (this.createNoteGlyph(e),
                        s.addParenthesis(e));
                    if (this.addGlyph(t),
                    s.isEmpty || (this.addGlyph(new On(0,0,4 * (this.container.beat.graceType !== p.None ? Mi.GraceScale : 1) * this.scale)),
                    this.addGlyph(s)),
                    this.container.beat.hasWhammyBar) {
                        let e = new Fa(this.container.beat);
                        e.renderer = this.renderer,
                        e.doLayout(),
                        this.container.ties.push(e)
                    }
                    if (this.container.beat.dots > 0) {
                        this.addGlyph(new On(0,0,5 * this.scale));
                        for (let t = 0; t < this.container.beat.dots; t++) {
                            let t = new pi(0,0);
                            t.renderer = this.renderer;
                            for (let s of this.container.beat.notes)
                                this.createBeatDot(e.getNoteLine(s), t);
                            this.addGlyph(t)
                        }
                    }
                }
            super.doLayout(),
            this.container.beat.isEmpty ? this.centerX = this.width / 2 : this.container.beat.isRest ? this.centerX = this.restGlyph.x + this.restGlyph.width / 2 : this.centerX = this.noteHeads.x + this.noteHeads.width / 2
        }
        createBeatDot(e, t) {
            let s = this.renderer;
            t.addGlyph(new Yn(0,s.getScoreY(e),1.5 * this.scale))
        }
        createNoteHeadGlyph(e) {
            let t = this.container.beat.graceType !== p.None;
            if (e.beat.voice.bar.staff.isPercussion) {
                const s = ct.getArticulation(e);
                if (s)
                    return new Ca(0,0,s,e.beat.duration,t);
                _e.warning("Rendering", "No articulation found for percussion instrument " + e.percussionArticulation)
            }
            return e.isDead ? new ya(0,0,t) : e.beat.graceType === p.BendGrace ? new Mi(0,0,d.Quarter,e) : e.harmonicType === M.Natural ? new ba(0,0,e.beat.duration,t) : new Mi(0,0,e.beat.duration,e,e.glyphTags)
        }
        createNoteGlyph(e) {
            if (e.beat.graceType === p.BendGrace && !e.hasBend)
                return;
            let t = this.renderer
              , s = this.createNoteHeadGlyph(e)
              , i = t.getNoteLine(e);
            if (s.y = t.getScoreY(i),
            this.noteHeads.addNoteGlyph(s, e, i),
            e.harmonicType !== M.None && e.harmonicType !== M.Natural && (s = new ba(0,0,e.beat.duration,this.container.beat.graceType !== p.None),
            s.y = t.getScoreY(i),
            this.noteHeads.addNoteGlyph(s, e, i)),
            e.isStaccato && !this.noteHeads.aboveBeatEffects.has("Staccato") && this.noteHeads.belowBeatEffects.set("Staccato", new La(0,0)),
            e.accentuated !== a.Normal || this.noteHeads.aboveBeatEffects.has("Accent") || this.noteHeads.belowBeatEffects.set("Accent", new ma(0,0,a.Normal)),
            e.accentuated !== a.Heavy || this.noteHeads.aboveBeatEffects.has("HAccent") || this.noteHeads.belowBeatEffects.set("HAccent", new ma(0,0,a.Heavy)),
            e.isPercussion) {
                const t = ct.getArticulation(e);
                if (t && t.techniqueSymbolPlacement !== G.Middle) {
                    const e = t.techniqueSymbolPlacement === G.Top ? this.noteHeads.aboveBeatEffects : this.noteHeads.belowBeatEffects;
                    switch (t.techniqueSymbol) {
                    case I.PictEdgeOfCymbal:
                        e.set("PictEdgeOfCymbal", new Ea(0,0));
                        break;
                    case I.ArticStaccatoAbove:
                        e.set("ArticStaccatoAbove", new La(0,0));
                        break;
                    case I.StringsUpBow:
                        e.set("StringsUpBow", new na(0,0,O.Up));
                        break;
                    case I.StringsDownBow:
                        e.set("StringsDownBow", new na(0,0,O.Down));
                        break;
                    case I.GuitarGolpe:
                        e.set("GuitarGolpe", new Ma(0,0))
                    }
                }
            }
        }
    }
    class Ra extends Oi {
        constructor() {
            super(),
            this._prebends = null,
            this.accidentals = null
        }
        get prebendNoteHeadOffset() {
            return this._prebends ? this._prebends.x + this._prebends.noteHeadOffset : 0
        }
        doLayout() {
            if (!this.container.beat.isRest) {
                let e = new xa;
                e.renderer = this.renderer;
                let t = new _a(!0);
                t.renderer = this.renderer;
                const s = new ka(this.container.beat,!0);
                this._prebends = s,
                s.renderer = this.renderer;
                for (let i of this.container.beat.notes)
                    if (i.isVisible) {
                        if (i.hasBend)
                            switch (i.bendType) {
                            case l.PrebendBend:
                            case l.Prebend:
                            case l.PrebendRelease:
                                s.addGlyph(i.displayValue - (i.bendPoints[0].value / 2 | 0), !1)
                            }
                        else if (i.beat.hasWhammyBar)
                            switch (i.beat.whammyBarType) {
                            case S.PrediveDive:
                            case S.Predive:
                                this._prebends.addGlyph(i.displayValue - (i.beat.whammyBarPoints[0].value / 2 | 0), !1)
                            }
                        this.createAccidentalGlyph(i, e),
                        t.addParenthesis(i)
                    }
                s.isEmpty || (this.addGlyph(s),
                this.addGlyph(new On(0,0,4 * (this.container.beat.graceType !== p.None ? Mi.GraceScale : 1) * this.scale))),
                this.container.beat.brushType !== c.None && (this.addGlyph(new xr(0,0,this.container.beat,this.renderer.lineOffset)),
                this.addGlyph(new On(0,0,4 * this.scale))),
                t.isEmpty || (this.addGlyph(t),
                this.addGlyph(new On(0,0,4 * (this.container.beat.graceType !== p.None ? Mi.GraceScale : 1) * this.scale))),
                e.isEmpty || (this.accidentals = e,
                this.addGlyph(new On(0,0,2 * (this.container.beat.graceType !== p.None ? Mi.GraceScale : 1) * this.scale)),
                this.addGlyph(e),
                this.addGlyph(new On(0,0,2 * (this.container.beat.graceType !== p.None ? Mi.GraceScale : 1) * this.scale)))
            }
            super.doLayout()
        }
        createAccidentalGlyph(e, t) {
            let s = this.renderer
              , i = s.accidentalHelper.getNoteAccidental(e)
              , n = s.getNoteLine(e)
              , r = this.container.beat.graceType !== p.None;
            if (i !== qt.None) {
                let e = new ga(0,s.getScoreY(n),i,r);
                e.renderer = this.renderer,
                t.addGlyph(e)
            }
            if (e.harmonicType !== M.None && e.harmonicType !== M.Natural) {
                let e = new ga(0,s.getScoreY(n),i,r);
                e.renderer = this.renderer,
                t.addGlyph(e)
            }
        }
    }
    class Oa extends ar {
        get commonScale() {
            return 1
        }
        get numberScale() {
            return 1
        }
    }
    class Ia extends Pa {
        constructor(e) {
            super(0, 0),
            this._notes = [],
            this._endNoteGlyph = null,
            this._middleNoteGlyph = null,
            this._beat = e
        }
        addBends(e) {
            if (this._notes.push(e),
            !e.isTieOrigin)
                switch (e.bendType) {
                case l.Bend:
                case l.PrebendRelease:
                case l.PrebendBend:
                    {
                        let t = this._endNoteGlyph;
                        t || (t = new ka(e.beat,!1),
                        t.renderer = this.renderer,
                        this._endNoteGlyph = t,
                        this.BendNoteHeads.push(t));
                        let s = e.bendPoints[e.bendPoints.length - 1];
                        t.addGlyph(this.getBendNoteValue(e, s), s.value % 2 != 0)
                    }
                    break;
                case l.Release:
                    if (!e.isTieOrigin) {
                        let t = this._endNoteGlyph;
                        t || (t = new ka(e.beat,!1),
                        t.renderer = this.renderer,
                        this._endNoteGlyph = t,
                        this.BendNoteHeads.push(t));
                        let s = e.bendPoints[e.bendPoints.length - 1];
                        t.addGlyph(this.getBendNoteValue(e, s), s.value % 2 != 0)
                    }
                    break;
                case l.BendRelease:
                    {
                        let t = this._middleNoteGlyph;
                        t || (t = new ka(e.beat,!1),
                        this._middleNoteGlyph = t,
                        t.renderer = this.renderer,
                        this.BendNoteHeads.push(t));
                        let s = e.bendPoints[1];
                        t.addGlyph(this.getBendNoteValue(e, e.bendPoints[1]), s.value % 2 != 0);
                        let i = this._endNoteGlyph;
                        i || (i = new ka(e.beat,!1),
                        i.renderer = this.renderer,
                        this._endNoteGlyph = i,
                        this.BendNoteHeads.push(i));
                        let n = e.bendPoints[e.bendPoints.length - 1];
                        i.addGlyph(this.getBendNoteValue(e, n), n.value % 2 != 0)
                    }
                }
        }
        paint(e, t, s) {
            let i = this.renderer.scoreRenderer.layout.getRendererForBar(this.renderer.staffRenderer.staveId, this._beat.voice.bar)
              , n = e + i.x + i.getBeatX(this._beat, hi.MiddleNotes)
              , r = e + i.x;
            this._beat.isLastOfVoice ? r += i.postBeatGlyphsStart : r += i.getBeatX(this._beat.nextBeat, hi.PreNotes),
            r -= 8 * this.scale;
            let a = (n + r) / 2;
            this._middleNoteGlyph && (this._middleNoteGlyph.x = a - this._middleNoteGlyph.noteHeadOffset,
            this._middleNoteGlyph.y = t + i.y,
            this._middleNoteGlyph.paint(0, 0, s)),
            this._endNoteGlyph && (this._endNoteGlyph.x = r - this._endNoteGlyph.noteHeadOffset,
            this._endNoteGlyph.y = t + i.y,
            this._endNoteGlyph.paint(0, 0, s)),
            this._notes.sort(( (e, t) => t.displayValue - e.displayValue));
            let o = this._beat.graceType === p.BendGrace ? this._beat.nextBeat : this._beat
              , c = 1 === this._notes.length ? this.getTieDirection(o, i) : Ut.Up;
            for (let o = 0; o < this._notes.length; o++) {
                let d = this._notes[o];
                o > 0 && o >= (this._notes.length / 2 | 0) && (c = Ut.Down);
                let u = t + i.y + i.getNoteY(d, li.Top)
                  , p = Mi.NoteHeadHeight * this.scale * Mi.GraceScale * .5;
                c === Ut.Down && (u += Mi.NoteHeadHeight * this.scale);
                let g = d.bendStyle === h.Gradual ? "grad." : "";
                if (d.isTieOrigin) {
                    let r = d.tieDestination
                      , a = r ? this.renderer.scoreRenderer.layout.getRendererForBar(this.renderer.staffRenderer.staveId, r.beat.voice.bar) : null;
                    if (a && a.staffRenderer === i.staffRenderer) {
                        let i = e + a.x + a.getBeatX(r.beat, hi.MiddleNotes)
                          , o = t + a.y + a.getNoteY(r, li.Top);
                        c === Ut.Down && (o += Mi.NoteHeadHeight * this.scale),
                        d.bendType === l.Hold || d.bendType === l.Prebend ? Wn.paintTie(s, this.scale, n, u, i, o, c === Ut.Down, 22, 4) : this.drawBendSlur(s, n, u, i, o, c === Ut.Down, this.scale, g)
                    } else {
                        let r = e + i.x + i.width
                          , a = t + i.y;
                        d.bendType === l.Hold || d.bendType === l.Prebend ? Wn.paintTie(s, this.scale, n, u, r, a, c === Ut.Down, 22, 4) : this.drawBendSlur(s, n, u, r, a, c === Ut.Down, this.scale, g)
                    }
                    switch (d.bendType) {
                    case l.Prebend:
                    case l.PrebendBend:
                    case l.PrebendRelease:
                        let r = e + i.x + i.getBeatX(d.beat, hi.PreNotes);
                        r += i.getPreNotesGlyphForBeat(d.beat).prebendNoteHeadOffset;
                        let a = t + i.y + p;
                        this.drawBendSlur(s, r, a, n, u, c === Ut.Down, this.scale)
                    }
                } else {
                    c === Ut.Up && (p = -p);
                    let o = 0
                      , h = 0;
                    switch (d.bendType) {
                    case l.Bend:
                        o = this.getBendNoteValue(d, d.bendPoints[d.bendPoints.length - 1]),
                        h = this._endNoteGlyph.getNoteValueY(o) + p,
                        this.drawBendSlur(s, n, u, r, h, c === Ut.Down, this.scale, g);
                        break;
                    case l.BendRelease:
                        let f = this.getBendNoteValue(d, d.bendPoints[1])
                          , m = this._middleNoteGlyph.getNoteValueY(f) + p;
                        this.drawBendSlur(s, n, u, a, m, c === Ut.Down, this.scale, g),
                        o = this.getBendNoteValue(d, d.bendPoints[d.bendPoints.length - 1]),
                        h = this._endNoteGlyph.getNoteValueY(o) + p,
                        this.drawBendSlur(s, a, m, r, h, c === Ut.Down, this.scale, g);
                        break;
                    case l.Release:
                        this.BendNoteHeads.length > 0 && (o = this.getBendNoteValue(d, d.bendPoints[d.bendPoints.length - 1]),
                        h = this.BendNoteHeads[0].getNoteValueY(o) + p,
                        this.drawBendSlur(s, n, u, r, h, c === Ut.Down, this.scale, g));
                        break;
                    case l.Prebend:
                    case l.PrebendBend:
                    case l.PrebendRelease:
                        let y = e + i.x + i.getBeatX(d.beat, hi.PreNotes);
                        y += i.getPreNotesGlyphForBeat(d.beat).prebendNoteHeadOffset;
                        let b = t + i.y + p;
                        this.drawBendSlur(s, y, b, n, u, c === Ut.Down, this.scale),
                        this.BendNoteHeads.length > 0 && (o = this.getBendNoteValue(d, d.bendPoints[d.bendPoints.length - 1]),
                        h = this.BendNoteHeads[0].getNoteValueY(o) + p,
                        this.drawBendSlur(s, n, u, r, h, c === Ut.Down, this.scale, g))
                    }
                }
            }
        }
        getBendNoteValue(e, t) {
            return e.displayValueWithoutBend + (t.value / 2 | 0)
        }
    }
    class Aa extends Wn {
        constructor(e, t, s=!1) {
            super(e, t, s)
        }
        doLayout() {
            super.doLayout()
        }
        getBeamDirection(e, t) {
            if (e.isRest)
                return Ut.Up;
            switch (t.getBeatDirection(e)) {
            case Ut.Up:
                return Ut.Down;
            default:
                return Ut.Up
            }
        }
        getStartY() {
            if (this.startBeat.isRest)
                return this.startNoteRenderer.getScoreY(9);
            switch (this.tieDirection) {
            case Ut.Up:
                return this.startNoteRenderer.getNoteY(this.startBeat.maxNote, li.Top);
            default:
                return this.startNoteRenderer.getNoteY(this.startBeat.minNote, li.Bottom)
            }
        }
        getEndY() {
            const e = this.endNoteRenderer;
            if (this.endBeat.isRest)
                switch (this.tieDirection) {
                case Ut.Up:
                    return e.getScoreY(9);
                default:
                    return e.getScoreY(0)
                }
            const t = this.startNoteRenderer.getBeatDirection(this.startBeat)
              , s = e.getBeatDirection(this.endBeat);
            if (t !== s && this.startBeat.graceType === p.None)
                if (s === this.tieDirection)
                    switch (this.tieDirection) {
                    case Ut.Up:
                        return e.getNoteY(this.endBeat.maxNote, li.TopWithStem);
                    default:
                        return e.getNoteY(this.endBeat.minNote, li.BottomWithStem)
                    }
                else
                    switch (this.tieDirection) {
                    case Ut.Up:
                        return e.getNoteY(this.endBeat.maxNote, li.BottomWithStem);
                    default:
                        return e.getNoteY(this.endBeat.minNote, li.TopWithStem)
                    }
            switch (this.tieDirection) {
            case Ut.Up:
                return e.getNoteY(this.endBeat.maxNote, li.Top);
            default:
                return e.getNoteY(this.endBeat.minNote, li.Bottom)
            }
        }
        getStartX() {
            return this.startNoteRenderer.getBeatX(this.startBeat, hi.MiddleNotes)
        }
        getEndX() {
            const e = this.endNoteRenderer.getBeatDirection(this.endBeat);
            return this.endNoteRenderer.getBeatX(this.endBeat, this.endBeat.duration > d.Whole && e === this.tieDirection ? hi.Stem : hi.MiddleNotes)
        }
    }
    class Ga extends ui {
        constructor(e, t, s, i) {
            super(0, 0),
            this._outType = t,
            this._inType = e,
            this._startNote = s,
            this._parent = i
        }
        doLayout() {
            this.width = 0
        }
        paint(e, t, s) {
            this.paintSlideIn(e, t, s),
            this.drawSlideOut(e, t, s)
        }
        paintSlideIn(e, t, s) {
            let i = this.renderer
              , n = 12 * this.scale
              , r = e + i.x + i.getNoteX(this._startNote, ci.Left) - 2 * this.scale
              , a = t + i.y + i.getNoteY(this._startNote, li.Center)
              , o = r - n
              , h = t + i.y;
            switch (this._inType) {
            case f.IntoFromBelow:
                h += i.getNoteY(this._startNote, li.Bottom);
                break;
            case f.IntoFromAbove:
                h += i.getNoteY(this._startNote, li.Top);
                break;
            default:
                return
            }
            let l = this.getAccidentalsWidth(i, this._startNote.beat);
            o -= l,
            r -= l,
            this.paintSlideLine(s, !1, o, r, h, a)
        }
        getAccidentalsWidth(e, t) {
            let s = e.getPreNotesGlyphForBeat(t);
            return s && s.accidentals ? s.accidentals.width : 0
        }
        drawSlideOut(e, t, s) {
            let i = this.renderer
              , n = 12 * this.scale
              , r = 3 * this.scale
              , a = 1 * this.scale
              , o = 2 * this.scale
              , h = 0
              , l = 0
              , c = 0
              , d = 0
              , u = !1;
            switch (this._outType) {
            case m.Shift:
            case m.Legato:
                if (h = e + i.x + i.getBeatX(this._startNote.beat, hi.PostNotes) + r,
                l = t + i.y + i.getNoteY(this._startNote, li.Center),
                this._startNote.slideTarget) {
                    let s = this.renderer.scoreRenderer.layout.getRendererForBar(this.renderer.staffRenderer.staveId, this._startNote.slideTarget.beat.voice.bar);
                    s && s.staffRenderer === i.staffRenderer ? (c = e + s.x + s.getBeatX(this._startNote.slideTarget.beat, hi.PreNotes) - a,
                    d = t + s.y + s.getNoteY(this._startNote.slideTarget, li.Center)) : (c = e + i.x + this._parent.x,
                    d = l),
                    this._startNote.slideTarget.realValue > this._startNote.realValue ? (l += o,
                    d -= o) : (l -= o,
                    d += o)
                } else
                    c = e + i.x + this._parent.x,
                    d = l;
                break;
            case m.OutUp:
                h = e + i.x + i.getNoteX(this._startNote, ci.Right),
                l = t + i.y + i.getNoteY(this._startNote, li.Center),
                c = h + n,
                d = t + i.y + i.getNoteY(this._startNote, li.Top);
                break;
            case m.OutDown:
                h = e + i.x + i.getNoteX(this._startNote, ci.Right),
                l = t + i.y + i.getNoteY(this._startNote, li.Center),
                c = h + n,
                d = t + i.y + i.getNoteY(this._startNote, li.Bottom);
                break;
            case m.PickSlideUp:
                h = e + i.x + i.getNoteX(this._startNote, ci.Right) + r,
                l = t + i.y + i.getNoteY(this._startNote, li.Center),
                d = t + i.y + i.getNoteY(this._startNote, li.Top),
                c = e + i.x + i.width,
                this._startNote.beat.nextBeat && this._startNote.beat.nextBeat.voice === this._startNote.beat.voice && (c = e + i.x + i.getBeatX(this._startNote.beat.nextBeat, hi.PreNotes)),
                u = !0;
                break;
            case m.PickSlideDown:
                h = e + i.x + i.getNoteX(this._startNote, ci.Right) + r,
                l = t + i.y + i.getNoteY(this._startNote, li.Center),
                d = t + i.y + i.getNoteY(this._startNote, li.Bottom),
                c = e + i.x + i.width,
                this._startNote.beat.nextBeat && this._startNote.beat.nextBeat.voice === this._startNote.beat.voice && (c = e + i.x + i.getBeatX(this._startNote.beat.nextBeat, hi.PreNotes)),
                u = !0;
                break;
            default:
                return
            }
            this.paintSlideLine(s, u, h, c, l, d)
        }
        paintSlideLine(e, t, s, i, n, r) {
            if (t) {
                let t = new Hn(0,0,b.Slight,1.2);
                t.renderer = this.renderer,
                t.doLayout(),
                n -= t.height / 2;
                let a = i - s
                  , o = (r -= t.height / 2) - n
                  , h = Math.sqrt(Math.pow(o, 2) + Math.pow(a, 2));
                t.width = a;
                let l = Math.asin(o / h) * (180 / Math.PI);
                e.beginRotate(s, n, l),
                t.paint(0, 0, e),
                e.endRotate()
            } else
                e.beginPath(),
                e.moveTo(s, n),
                e.lineTo(i, r),
                e.stroke()
        }
    }
    class Ha extends Aa {
        constructor(e, t, s=!1) {
            super(e.beat, t.beat, s),
            this._startNote = e,
            this._endNote = t
        }
        getTieHeight(e, t, s, i) {
            return Math.log2(s - e + 1) * this.renderer.settings.notation.slurHeight
        }
        getStartY() {
            if (this.isStartCentered())
                switch (this.tieDirection) {
                case Ut.Up:
                    return this.startNoteRenderer.getNoteY(this._startNote, li.Top);
                default:
                    return this.startNoteRenderer.getNoteY(this._startNote, li.Bottom)
                }
            return this.startNoteRenderer.getNoteY(this._startNote, li.Center)
        }
        getEndY() {
            if (!this.isEndCentered())
                return this.endNoteRenderer.getNoteY(this._endNote, li.Center);
            if (this.isEndOnStem())
                switch (this.tieDirection) {
                case Ut.Up:
                    return this.endNoteRenderer.getNoteY(this._endNote, li.TopWithStem);
                default:
                    return this.endNoteRenderer.getNoteY(this._endNote, li.BottomWithStem)
                }
            else
                switch (this.tieDirection) {
                case Ut.Up:
                    return this.endNoteRenderer.getNoteY(this._endNote, li.Top);
                default:
                    return this.endNoteRenderer.getNoteY(this._endNote, li.Bottom)
                }
        }
        isStartCentered() {
            return this._startNote === this._startNote.beat.maxNote && this.tieDirection === Ut.Up || this._startNote === this._startNote.beat.minNote && this.tieDirection === Ut.Down
        }
        isEndCentered() {
            return this._startNote.beat.graceType === p.None && (this._endNote === this._endNote.beat.maxNote && this.tieDirection === Ut.Up || this._endNote === this._endNote.beat.minNote && this.tieDirection === Ut.Down)
        }
        isEndOnStem() {
            const e = this.endNoteRenderer;
            return this.startNoteRenderer.getBeatDirection(this.startBeat) !== e.getBeatDirection(this.endBeat) && this.startBeat.graceType === p.None
        }
        getStartX() {
            return this.isStartCentered() ? this.startNoteRenderer.getBeatX(this._startNote.beat, hi.MiddleNotes) : this.startNoteRenderer.getNoteX(this._startNote, ci.Right)
        }
        getEndX() {
            return this.isEndCentered() ? this.isEndOnStem() ? this.endNoteRenderer.getBeatX(this._endNote.beat, hi.Stem) : this.endNoteRenderer.getNoteX(this._endNote, ci.Center) : this.endNoteRenderer.getBeatX(this._endNote.beat, hi.PreNotes)
        }
    }
    class Va extends Wn {
        constructor(e, t, s=!1) {
            super(e ? e.beat : null, t ? t.beat : null, s),
            this.startNote = e,
            this.endNote = t
        }
        shouldDrawBendSlur() {
            return this.renderer.settings.notation.extendBendArrowsOnTiedNotes && !!this.startNote.bendOrigin && this.startNote.isTieOrigin
        }
        doLayout() {
            super.doLayout()
        }
        getBeamDirection(e, t) {
            switch (t.getBeatDirection(e)) {
            case Ut.Up:
                return Ut.Down;
            default:
                return Ut.Up
            }
        }
        getStartY() {
            if (this.startBeat.isRest)
                return this.startNoteRenderer.getScoreY(9);
            switch (this.tieDirection) {
            case Ut.Up:
                return this.startNoteRenderer.getNoteY(this.startNote, li.Top);
            default:
                return this.startNoteRenderer.getNoteY(this.startNote, li.Bottom)
            }
        }
        getEndY() {
            const e = this.endNoteRenderer;
            if (this.endBeat.isRest)
                switch (this.tieDirection) {
                case Ut.Up:
                    return e.getScoreY(9);
                default:
                    return e.getScoreY(0)
                }
            switch (this.tieDirection) {
            case Ut.Up:
                return e.getNoteY(this.endNote, li.Top);
            default:
                return e.getNoteY(this.endNote, li.Bottom)
            }
        }
        getStartX() {
            return this.startNoteRenderer.getBeatX(this.startNote.beat, hi.PostNotes)
        }
        getEndX() {
            return this.endNoteRenderer.getBeatX(this.endNote.beat, hi.PreNotes)
        }
    }
    class Wa extends Ri {
        constructor(e, t) {
            super(e, t),
            this._bend = null,
            this._effectSlur = null,
            this._effectEndSlur = null
        }
        doLayout() {
            if (this._effectSlur = null,
            this._effectEndSlur = null,
            super.doLayout(),
            this.beat.isLegatoOrigin) {
                if (!this.beat.previousBeat || !this.beat.previousBeat.isLegatoOrigin) {
                    let e = this.beat.nextBeat;
                    for (; e.nextBeat && e.nextBeat.isLegatoDestination; )
                        e = e.nextBeat;
                    this.ties.push(new Aa(this.beat,e,!1))
                }
            } else if (this.beat.isLegatoDestination && !this.beat.isLegatoOrigin) {
                let e = this.beat.previousBeat;
                for (; e.previousBeat && e.previousBeat.isLegatoOrigin; )
                    e = e.previousBeat;
                this.ties.push(new Aa(e,this.beat,!0))
            }
            this._bend && (this._bend.renderer = this.renderer,
            this._bend.doLayout(),
            this.updateWidth())
        }
        createTies(e) {
            if (e.isVisible) {
                if (e.isTieOrigin && !e.hasBend && !e.beat.hasWhammyBar && e.beat.graceType !== p.BendGrace && e.tieDestination && e.tieDestination.isVisible) {
                    let t = new Va(e,e.tieDestination,!1);
                    this.ties.push(t)
                }
                if (e.isTieDestination && !e.tieOrigin.hasBend && !e.beat.hasWhammyBar) {
                    let t = new Va(e.tieOrigin,e,!0);
                    this.ties.push(t)
                }
                if (e.slideInType !== f.None || e.slideOutType !== m.None) {
                    let t = new Ga(e.slideInType,e.slideOutType,e,this);
                    this.ties.push(t)
                }
                if (e.isSlurOrigin && e.slurDestination && e.slurDestination.isVisible) {
                    let t = new Ha(e,e.slurDestination,!1);
                    this.ties.push(t)
                }
                if (e.isSlurDestination && e.slurOrigin) {
                    let t = new Ha(e.slurOrigin,e,!0);
                    this.ties.push(t)
                }
                if (!this._effectSlur && e.isEffectSlurOrigin && e.effectSlurDestination) {
                    const t = new Ha(e,e.effectSlurDestination,!1);
                    this._effectSlur = t,
                    this.ties.push(t)
                }
                if (!this._effectEndSlur && e.beat.isEffectSlurDestination && e.beat.effectSlurOrigin) {
                    let t = this.onNotes.beamingHelper.direction
                      , s = t === Ut.Up ? e.beat.effectSlurOrigin.minNote : e.beat.effectSlurOrigin.maxNote
                      , i = t === Ut.Up ? e.beat.minNote : e.beat.maxNote;
                    const n = new Ha(s,i,!0);
                    this._effectEndSlur = n,
                    this.ties.push(n)
                }
                if (e.hasBend) {
                    if (!this._bend) {
                        const t = new Ia(e.beat);
                        this._bend = t,
                        t.renderer = this.renderer,
                        this.ties.push(t)
                    }
                    this._bend.addBends(e)
                }
            }
        }
    }
    class za extends xi {
        constructor(e, t) {
            super(e, t),
            this.simpleWhammyOverflow = 0,
            this._firstLineY = 0,
            this.accidentalHelper = new bi(t,this)
        }
        getBeatDirection(e) {
            return this.helpers.getBeamingHelperForBeat(e).direction
        }
        get lineOffset() {
            return (xi.LineSpacing + 1) * this.scale
        }
        updateSizes() {
            let e = this.resources
              , t = e.tablatureFont.size / 2 + .2 * e.tablatureFont.size;
            this.topPadding = t * this.scale,
            this.bottomPadding = t * this.scale,
            this.height = 4 * this.lineOffset + this.topPadding + this.bottomPadding,
            this.updateFirstLineY(),
            super.updateSizes()
        }
        updateFirstLineY() {
            let e = 4 * this.lineOffset
              , t = (this.bar.staff.standardNotationLineCount - 1) * this.lineOffset;
            this._firstLineY = (e - t) / 2
        }
        doLayout() {
            if (this.updateFirstLineY(),
            this.accidentalHelper.init(),
            super.doLayout(),
            !this.bar.isEmpty && this.accidentalHelper.maxLineBeat) {
                let e = this.getScoreY(-2)
                  , t = this.getScoreY(6)
                  , s = this.simpleWhammyOverflow;
                this.registerOverflowTop(s);
                let i = this.getScoreY(this.accidentalHelper.maxLine)
                  , n = this.helpers.getBeamingHelperForBeat(this.accidentalHelper.maxLineBeat);
                n.direction === Ut.Up && (i -= this.getStemSize(n),
                i -= n.fingeringCount * this.resources.graceFont.size,
                n.hasTuplet && (i -= 2 * this.resources.effectFont.size)),
                n.hasTuplet && (i -= 1.5 * this.resources.effectFont.size),
                i < e && this.registerOverflowTop(e - i + s);
                let r = this.getScoreY(this.accidentalHelper.minLine)
                  , a = this.helpers.getBeamingHelperForBeat(this.accidentalHelper.minLineBeat);
                a.direction === Ut.Down && (r += this.getStemSize(a),
                r += a.fingeringCount * this.resources.graceFont.size),
                r > t && this.registerOverflowBottom(r - t)
            }
        }
        paint(e, t, s) {
            super.paint(e, t, s),
            this.paintBeams(e, t, s),
            this.paintTuplets(e, t, s)
        }
        paintTuplets(e, t, s) {
            for (let i of this.bar.voices)
                if (this.hasVoiceContainer(i)) {
                    let n = this.getVoiceContainer(i);
                    for (let i of n.tupletGroups)
                        this.paintTupletHelper(e + this.beatGlyphsStart, t, s, i)
                }
        }
        paintBeams(e, t, s) {
            for (let i = 0, n = this.helpers.beamHelpers.length; i < n; i++) {
                let n = this.helpers.beamHelpers[i];
                for (let i = 0, r = n.length; i < r; i++) {
                    let r = n[i];
                    this.paintBeamHelper(e + this.beatGlyphsStart, t, s, r)
                }
            }
        }
        paintBeamHelper(e, t, s, i) {
            s.color = 0 === i.voice.index ? this.resources.mainGlyphColor : this.resources.secondaryGlyphColor,
            i.isRestBeamHelper || (1 === i.beats.length ? this.paintFlag(e, t, s, i) : this.paintBar(e, t, s, i))
        }
        paintTupletHelper(e, t, s, i) {
            let n, r = this.resources, a = s.textAlign, o = s.textBaseline;
            s.color = 0 === i.voice.index ? this.resources.mainGlyphColor : this.resources.secondaryGlyphColor,
            s.textAlign = A.Center,
            s.textBaseline = G.Middle;
            let h = i.beats[0].tupletNumerator
              , l = i.beats[0].tupletDenominator;
            n = 2 === h && 3 === l ? "2" : 3 === h && 2 === l ? "3" : 4 === h && 6 === l ? "4" : 5 === h && 4 === l ? "5" : 6 === h && 4 === l ? "6" : 7 === h && 4 === l ? "7" : 9 === h && 8 === l ? "9" : 10 === h && 8 === l ? "10" : 11 === h && 8 === l ? "11" : 12 === h && 8 === l ? "12" : 13 === h && 8 === l ? "13" : h + ":" + l;
            let c = 10 * this.scale
              , d = 5 * this.scale;
            if (1 !== i.beats.length && i.isFull) {
                let a = i.beats[0]
                  , o = i.beats[i.beats.length - 1]
                  , h = null
                  , l = null;
                for (let e = 0; e < i.beats.length; e++)
                    if (!i.beats[e].isRest) {
                        h = i.beats[e];
                        break
                    }
                for (let e = i.beats.length - 1; e >= 0; e--)
                    if (!i.beats[e].isRest) {
                        l = i.beats[e];
                        break
                    }
                let u = !1;
                h || (h = a,
                u = !0),
                l || (l = o);
                let p = this.helpers.beamHelperLookup[i.voice.index].get(a.index)
                  , g = this.helpers.beamHelperLookup[i.voice.index].get(o.index)
                  , f = p.getBeatLineX(a)
                  , m = g.getBeatLineX(o)
                  , y = this.helpers.beamHelperLookup[i.voice.index].get(h.index)
                  , b = this.helpers.beamHelperLookup[i.voice.index].get(l.index)
                  , S = p.direction
                  , w = this.calculateBeamYWithDirection(y, f, S)
                  , _ = this.calculateBeamYWithDirection(b, m, S);
                u && (w = Math.max(w, _),
                _ = w),
                s.font = r.effectFont;
                let B = s.measureText(n)
                  , T = 3 * this.scale
                  , N = (f + m) / 2
                  , v = N - B / 2 - T
                  , x = N + B / 2 + T
                  , k = (_ - w) / (m - f)
                  , P = w - k * f
                  , F = k * v + P
                  , C = k * N + P
                  , L = k * x + P;
                S === Ut.Down && (c *= -1,
                d *= -1),
                s.beginPath(),
                s.moveTo(e + this.x + f, t + this.y + w - c | 0),
                s.lineTo(e + this.x + f, t + this.y + w - c - d | 0),
                s.lineTo(e + this.x + v, t + this.y + F - c - d | 0),
                s.stroke(),
                s.beginPath(),
                s.moveTo(e + this.x + x, t + this.y + L - c - d | 0),
                s.lineTo(e + this.x + m, t + this.y + _ - c - d | 0),
                s.lineTo(e + this.x + m, t + this.y + _ - c | 0),
                s.stroke(),
                s.fillText(n, e + this.x + N, t + this.y + C - c - d)
            } else
                for (let a = 0, o = i.beats.length; a < o; a++) {
                    let o = i.beats[a]
                      , h = this.helpers.beamHelperLookup[i.voice.index].get(o.index);
                    if (!h)
                        continue;
                    let l = h.direction
                      , u = h.getBeatLineX(o)
                      , p = this.calculateBeamYWithDirection(h, u, l);
                    l === Ut.Down && (c *= -1,
                    d *= -1),
                    s.font = r.effectFont,
                    s.fillText(n, e + this.x + u, t + this.y + p - c - d)
                }
            s.textAlign = a,
            s.textBaseline = o
        }
        getStemSize(e) {
            let t = 1 === e.beats.length ? this.getFlagStemSize(e.shortestDuration) : this.getBarStemSize(e.shortestDuration);
            return e.isGrace && (t *= Mi.GraceScale),
            t
        }
        getBarStemSize(e) {
            let t = 0;
            switch (e) {
            case d.QuadrupleWhole:
            case d.Half:
            case d.Quarter:
            case d.Eighth:
            case d.Sixteenth:
                t = 6;
                break;
            case d.ThirtySecond:
                t = 8;
                break;
            case d.SixtyFourth:
            case d.OneHundredTwentyEighth:
                t = 9;
                break;
            case d.TwoHundredFiftySixth:
                t = 10;
                break;
            default:
                t = 0
            }
            return this.getScoreHeight(t)
        }
        getFlagStemSize(e) {
            let t = 0;
            switch (e) {
            case d.QuadrupleWhole:
            case d.Half:
            case d.Quarter:
            case d.Eighth:
            case d.Sixteenth:
            case d.ThirtySecond:
            case d.SixtyFourth:
            case d.OneHundredTwentyEighth:
            case d.TwoHundredFiftySixth:
                t = 6;
                break;
            default:
                t = 0
            }
            return this.getScoreHeight(t)
        }
        get middleYPosition() {
            return this.getScoreY(this.bar.staff.standardNotationLineCount - 1)
        }
        getNoteY(e, t) {
            let s = super.getNoteY(e, t);
            if (isNaN(s)) {
                const t = this.accidentalHelper.getNoteLine(e);
                s = this.getScoreY(t)
            }
            return s
        }
        calculateBeamY(e, t) {
            return this.calculateBeamYWithDirection(e, t, e.direction)
        }
        applyLayoutingInfo() {
            const e = super.applyLayoutingInfo();
            if (e && this.bar.isMultiVoice) {
                let e = this.getScoreY(-2)
                  , t = this.getScoreY(6)
                  , s = this.helpers.collisionHelper.getBeatMinMaxY();
                s[0] < e && this.registerOverflowTop(Math.abs(s[0])),
                s[1] > t && this.registerOverflowBottom(Math.abs(s[1]) - t)
            }
            return e
        }
        calculateBeamYWithDirection(e, t, s) {
            let i = this.getStemSize(e);
            if (!e.drawingInfos.has(s)) {
                let t = new wi;
                e.drawingInfos.set(s, t);
                const n = e.beats[0]
                  , r = e.beats[e.beats.length - 1];
                let a = e.isRestBeamHelper;
                t.startBeat = n,
                t.startX = e.getBeatLineX(n),
                t.startY = a ? s === Ut.Up ? this.getScoreY(e.minRestLine) : this.getScoreY(e.maxRestLine) : s === Ut.Up ? this.getScoreY(this.accidentalHelper.getMinLine(n)) - i : this.getScoreY(this.accidentalHelper.getMaxLine(n)) + i,
                t.endBeat = r,
                t.endX = e.getBeatLineX(r),
                t.endY = a ? s === Ut.Up ? this.getScoreY(e.minRestLine) : this.getScoreY(e.maxRestLine) : s === Ut.Up ? this.getScoreY(this.accidentalHelper.getMinLine(r)) - i : this.getScoreY(this.accidentalHelper.getMaxLine(r)) + i;
                let o = 10 * this.scale;
                if (s === Ut.Down && t.startY > t.endY && t.startY - t.endY > o && (t.endY = t.startY - o),
                s === Ut.Down && t.endY > t.startY && t.endY - t.startY > o && (t.startY = t.endY - o),
                s === Ut.Up && t.startY < t.endY && t.endY - t.startY > o && (t.endY = t.startY + o),
                s === Ut.Up && t.endY < t.startY && t.startY - t.endY > o && (t.startY = t.endY + o),
                e.beats.length > 1) {
                    if (s === Ut.Up) {
                        let s = this.getScoreY(this.accidentalHelper.getMinLine(e.beatOfHighestNote)) - i;
                        const n = t.calcY(e.getBeatLineX(e.beatOfHighestNote)) - s;
                        n > 0 && (t.startY -= n,
                        t.endY -= n)
                    } else {
                        const s = this.getScoreY(this.accidentalHelper.getMaxLine(e.beatOfLowestNote)) + i - t.calcY(e.getBeatLineX(e.beatOfLowestNote));
                        s > 0 && (t.startY += s,
                        t.endY += s)
                    }
                    if (null !== e.minRestLine || null !== e.maxRestLine) {
                        const i = ht.getIndex(e.shortestDuration) - 2;
                        let n = e.isGrace ? Mi.GraceScale : 1
                          , r = i * (xi.BeamSpacing + xi.BeamThickness) * this.scale * n;
                        if (r += xi.BeamSpacing,
                        s === Ut.Up && null !== e.minRestLine) {
                            let s = this.getScoreY(e.minRestLine) - r;
                            const i = t.calcY(e.getBeatLineX(e.beatOfMinRestLine)) - s;
                            i > 0 && (t.startY -= i,
                            t.endY -= i)
                        } else if (s === Ut.Down && null !== e.maxRestLine) {
                            const s = this.getScoreY(e.maxRestLine) + r - t.calcY(e.getBeatLineX(e.beatOfMaxRestLine));
                            s > 0 && (t.startY += s,
                            t.endY += s)
                        }
                    }
                }
            }
            return e.drawingInfos.get(s).calcY(t)
        }
        paintBar(e, t, s, i) {
            for (let n = 0, r = i.beats.length; n < r; n++) {
                let r = i.beats[n]
                  , a = r.graceType !== p.None ? Mi.GraceScale : 1
                  , o = i.getBeatLineX(r)
                  , h = i.direction
                  , l = t + this.y;
                l += h === Ut.Up ? this.getScoreY(this.accidentalHelper.getMaxLine(r)) : this.getScoreY(this.accidentalHelper.getMinLine(r));
                let c = t + this.y;
                c += this.calculateBeamY(i, o),
                s.lineWidth = xi.StemWidth * this.scale,
                s.beginPath(),
                s.moveTo(e + this.x + o, l),
                s.lineTo(e + this.x + o, c),
                s.stroke(),
                s.lineWidth = this.scale;
                let d = c;
                h === Ut.Down ? d += 2 * s.font.size : 0 !== n && (d -= 1.5 * s.font.size),
                this.paintFingering(s, r, e + this.x + o, h, d);
                let u = 6 * this.scale * a
                  , g = (xi.BeamSpacing + xi.BeamThickness) * this.scale * a
                  , f = xi.BeamThickness * this.scale * a
                  , m = ht.getIndex(r.duration) - 2
                  , y = t + this.y;
                h === Ut.Down && (g = -g,
                f = -f);
                for (let t = 0; t < m; t++) {
                    let a = 0
                      , h = 0
                      , l = 0
                      , c = 0
                      , d = y + t * g;
                    if (n < i.beats.length - 1) {
                        if (_i.isFullBarJoin(r, i.beats[n + 1], t))
                            a = o,
                            h = i.getBeatLineX(i.beats[n + 1]);
                        else {
                            if (0 !== n && _i.isFullBarJoin(i.beats[n - 1], r, t))
                                continue;
                            a = o,
                            h = a + u
                        }
                        l = d + this.calculateBeamY(i, a),
                        c = d + this.calculateBeamY(i, h),
                        za.paintSingleBar(s, e + this.x + a, l, e + this.x + h, c, f)
                    } else
                        n > 0 && !_i.isFullBarJoin(r, i.beats[n - 1], t) && (a = o - u,
                        h = o,
                        l = d + this.calculateBeamY(i, a),
                        c = d + this.calculateBeamY(i, h),
                        za.paintSingleBar(s, e + this.x + a, l, e + this.x + h, c, f))
                }
            }
        }
        static paintSingleBar(e, t, s, i, n, r) {
            e.beginPath(),
            e.moveTo(t, s),
            e.lineTo(i, n),
            e.lineTo(i, n + r),
            e.lineTo(t, s + r),
            e.closePath(),
            e.fill()
        }
        paintFlag(e, t, s, i) {
            let n = i.beats[0];
            if (n.graceType === p.BendGrace || n.graceType !== p.None && this.settings.notation.notationMode === B.SongBook)
                return;
            let r = n.graceType !== p.None
              , a = r ? Mi.GraceScale : 1
              , o = this.getFlagStemSize(i.shortestDuration)
              , h = i.getBeatLineX(n)
              , l = i.direction
              , c = this.getScoreY(this.accidentalHelper.getMinLine(n))
              , d = this.getScoreY(this.accidentalHelper.getMaxLine(n))
              , u = 0
              , g = 0;
            if (l === Ut.Down ? (d += o * a,
            u = d,
            g = t + this.y + d) : (c -= o * a,
            u = c,
            g = t + this.y + c),
            this.paintFingering(s, n, e + this.x + h, l, g),
            i.hasLine) {
                if (s.lineWidth = xi.StemWidth * this.scale,
                s.beginPath(),
                s.moveTo(e + this.x + h, t + this.y + c),
                s.lineTo(e + this.x + h, t + this.y + d),
                s.stroke(),
                s.lineWidth = this.scale,
                n.graceType === p.BeforeBeat) {
                    let i = 15 * this.scale
                      , n = 12 * this.scale;
                    s.beginPath(),
                    l === Ut.Down ? (s.moveTo(e + this.x + h - n / 2, t + this.y + d - i),
                    s.lineTo(e + this.x + h + n / 2, t + this.y + d)) : (s.moveTo(e + this.x + h - n / 2, t + this.y + c + i),
                    s.lineTo(e + this.x + h + n / 2, t + this.y + c)),
                    s.stroke()
                }
                if (i.hasFlag) {
                    let i = new Di(h - this.scale / 2,u,n.duration,l,r);
                    i.renderer = this,
                    i.doLayout(),
                    i.paint(e + this.x, t + this.y, s)
                }
            }
        }
        paintFingering(e, t, s, i, n) {
            let r = this.settings;
            if (r.notation.fingeringMode !== _.ScoreDefault && r.notation.fingeringMode !== _.ScoreForcePiano)
                return;
            i === Ut.Up ? s -= 10 * this.scale : s += 3 * this.scale;
            let a = t.notes.slice(0);
            a.sort(( (e, t) => e.realValue - t.realValue));
            for (let i = 0; i < a.length; i++) {
                let o = a[i]
                  , h = null;
                o.leftHandFinger !== E.Unknown ? h = ht.fingerToString(r, t, o.leftHandFinger, !0) : o.rightHandFinger !== E.Unknown && (h = ht.fingerToString(r, t, o.rightHandFinger, !1)),
                h && (e.fillText(h, s, n),
                n -= 0 | e.font.size)
            }
        }
        createPreBeatGlyphs() {
            var e, t;
            super.createPreBeatGlyphs(),
            this.bar.masterBar.isRepeatStart && this.addPreBeatGlyph(new Rn(0,0,1.5,3));
            let s = !1;
            const i = this.bar.clef !== (null === (e = this.bar.previousBar) || void 0 === e ? void 0 : e.clef) || this.bar.clefOttava !== (null === (t = this.bar.previousBar) || void 0 === t ? void 0 : t.clefOttava)
              , n = !this.bar.previousBar || ei(this.bar.previousBar) !== ei(this.bar)
              , r = this.isFirstOfLine && !this.settings.display.hideTabHead || i || n
              , a = this.getBarNumber();
            if (a ? this.addPreBeatGlyph(new Cn(this.scale,this.getScoreHeight(.5),a,r ? 6 * this.scale : void 0)) : this.addPreBeatGlyph(new On(0,0,10 * this.scale)),
            r) {
                let e = 0;
                switch (this.bar.clef) {
                case H.Neutral:
                    e = this.bar.staff.standardNotationLineCount - 1;
                    break;
                case H.F4:
                    e = 2;
                    break;
                case H.C3:
                    e = 4;
                    break;
                case H.C4:
                    e = 2;
                    break;
                case H.G2:
                    e = 6
                }
                const t = this.settings.display.rowCount > 0 ? 11 / this.scale : 0;
                this.addPreBeatGlyph(new fa(t,this.getScoreY(e) + .5 * xi.StaffLineThickness,this.bar.clef,this.bar.clefOttava)),
                ei(this.bar) !== $.C && this.createKeySignatureGlyphs(),
                s = !0
            }
            (!this.bar.previousBar || this.bar.previousBar && this.bar.masterBar.timeSignatureNumerator !== this.bar.previousBar.masterBar.timeSignatureNumerator || this.bar.previousBar && this.bar.masterBar.timeSignatureDenominator !== this.bar.previousBar.masterBar.timeSignatureDenominator) && (this.createTimeSignatureGlyphs(),
            s = !0),
            s && this.addPreBeatGlyph(new On(0,0,10 * this.scale))
        }
        createBeatGlyphs() {
            for (let e = 0; e < this.bar.voices.length; e++) {
                let t = this.bar.voices[e];
                this.hasVoiceContainer(t) && this.createVoiceGlyphs(t)
            }
        }
        createPostBeatGlyphs() {
            super.createPostBeatGlyphs(),
            this.bar.masterBar.isRepeatEnd ? (this.addPostBeatGlyph(new Mn(this.x,0)),
            this.bar.masterBar.repeatCount > 2 && this.addPostBeatGlyph(new Dn(0,this.getScoreHeight(-.5),this.bar.masterBar.repeatCount))) : this.addPostBeatGlyph(new Ln(0,0))
        }
        createKeySignatureGlyphs() {
            let e = 0
              , t = ei(this.bar);
            switch (this.bar.clef) {
            case H.Neutral:
                e = 0;
                break;
            case H.G2:
                e = 1;
                break;
            case H.F4:
                e = 3;
                break;
            case H.C3:
                e = 2;
                break;
            case H.C4:
                e = 0
            }
            let s = new Map
              , i = [];
            if (ht.keySignatureIsSharp(t))
                for (let n = 0; n < Math.abs(t); n++) {
                    let t = za.SharpKsSteps[n] + e;
                    i.push(new ga(0,this.getScoreY(t),qt.Sharp,!1)),
                    s.set(t, !0)
                }
            else
                for (let n = 0; n < Math.abs(t); n++) {
                    let t = za.FlatKsSteps[n] + e;
                    i.push(new ga(0,this.getScoreY(t),qt.Flat,!1)),
                    s.set(t, !0)
                }
            for (let e of i)
                this.addPreBeatGlyph(e)
        }
        createTimeSignatureGlyphs() {
            if (!this.settings.notation.isNotationElementVisible(e.NotationElement.TimeSignature))
                return;
            this.addPreBeatGlyph(new On(0,0,2 * this.scale));
            const t = this.bar.staff.standardNotationLineCount - 1;
            this.addPreBeatGlyph(new Oa(0,this.getScoreY(t),this.bar.masterBar.timeSignatureNumerator,this.bar.masterBar.timeSignatureDenominator,this.bar.masterBar.timeSignatureCommon))
        }
        createVoiceGlyphs(e) {
            for (let t = 0, s = e.beats.length; t < s; t++) {
                let s = e.beats[t]
                  , i = new Wa(s,this.getVoiceContainer(e));
                i.preNotes = new Ra,
                i.onNotes = new Da,
                this.addBeatGlyph(i)
            }
        }
        getNoteLine(e) {
            return this.accidentalHelper.getNoteLine(e)
        }
        getScoreY(e) {
            return this._firstLineY + this.lineOffset + this.getScoreHeight(e)
        }
        getScoreHeight(e) {
            return this.lineOffset / 2 * e
        }
        paintBackground(e, t, s) {
            super.paintBackground(e, t, s);
            let i = this.resources;
            s.color = i.staffLineColor;
            for (let i = 0; i < this.bar.staff.standardNotationLineCount; i++) {
                const n = t + this.y + this.getScoreY(2 * i);
                s.fillRect(e + this.x, 0 | n, this.width, this.scale * xi.StaffLineThickness)
            }
            s.color = i.mainGlyphColor,
            this.paintSimileMark(e, t, s)
        }
        completeBeamingHelper(e) {
            if (this.bar.isMultiVoice && e.highestNoteInHelper && e.lowestNoteInHelper) {
                let t = this.getNoteY(e.highestNoteInHelper, li.Center)
                  , s = this.getNoteY(e.lowestNoteInHelper, li.Center)
                  , i = this.getStemSize(e);
                e.hasTuplet && (i += 2 * this.resources.effectFont.size),
                e.direction === Ut.Up ? t -= i : s += i;
                for (const i of e.beats)
                    this.helpers.collisionHelper.reserveBeatSlot(i, t, s)
            }
        }
    }
    za.StaffId = "score",
    za.SharpKsSteps = [-1, 2, -2, 1, 4, 0, 3],
    za.FlatKsSteps = [3, 0, 4, 1, 5, 2, 6];
    class Ua extends oi {
        get staffId() {
            return za.StaffId
        }
        create(e, t) {
            return new za(e,t)
        }
        constructor() {
            super()
        }
    }
    class Xa extends Ei {
        constructor(e, t, s) {
            super(e, t, .8, Xa.getSymbol(s))
        }
        doLayout() {
            super.doLayout(),
            this.height = 17 * this.scale,
            this.y += this.height / 2
        }
        static getSymbol(e) {
            switch (e) {
            case u.PPP:
                return I.DynamicPPP;
            case u.PP:
                return I.DynamicPP;
            case u.P:
                return I.DynamicPiano;
            case u.MP:
                return I.DynamicMP;
            case u.MF:
                return I.DynamicMF;
            case u.F:
                return I.DynamicForte;
            case u.FF:
                return I.DynamicFF;
            case u.FFF:
                return I.DynamicFFF;
            default:
                return I.None
            }
        }
    }
    class Ya extends Vi {
        get notationElement() {
            return e.NotationElement.EffectDynamics
        }
        get hideOnMultiTrack() {
            return !1
        }
        get canShareBand() {
            return !1
        }
        get sizingMode() {
            return di.SingleOnBeat
        }
        shouldCreateGlyph(e, t) {
            return this.internalShouldCreateGlyph(t)
        }
        internalShouldCreateGlyph(e) {
            if (e.voice.bar.staff.track.score.stylesheet.hideDynamics || e.isEmpty || e.voice.isEmpty || e.isRest || e.graceType !== p.None)
                return !1;
            let t = this.getPreviousDynamicsBeat(e)
              , s = e.dynamics !== ((null == t ? void 0 : t.dynamics) || u.F);
            if (s && e.voice.index > 0)
                for (let t of e.voice.bar.voices)
                    if (t.index < e.voice.index) {
                        let i = t.getBeatAtPlaybackStart(e.playbackStart);
                        i && e.dynamics === i.dynamics && this.internalShouldCreateGlyph(i) && (s = !1)
                    }
            return s
        }
        getPreviousDynamicsBeat(e) {
            let t = e.previousBeat;
            for (; null != t; ) {
                if (!t.isRest && t.graceType === p.None)
                    return t;
                t = t.previousBeat
            }
            return null
        }
        createNewGlyph(e, t) {
            return new Xa(0,0,t.dynamics)
        }
        canExpand(e, t) {
            return !0
        }
    }
    class Ja extends Gn {
        constructor(e) {
            super(hi.EndBeat),
            this._sustainPedal = e
        }
        doLayout() {
            super.doLayout(),
            this.height = 13 * this.scale
        }
        paintNonGrouped(e, t, s) {
            this.paintPedal(e, t, e + this.x + 10 * this.scale, s, this.beat)
        }
        paintGrouped(e, t, s, i, n) {
            this.paintPedal(e, t, s, i, n)
        }
        paintPedal(e, t, s, i, n) {
            const r = e + this.x
              , a = t + this.y
              , o = a + (this.height - 2 * this.scale);
            switch (this._sustainPedal) {
            case W.Press:
            case W.ReleaseThenPress:
                i.beginPath(),
                i.moveTo(r, a),
                i.lineTo(r, o),
                i.stroke()
            }
            s > r && (i.beginPath(),
            i.moveTo(r, o),
            i.lineTo(s, o),
            i.stroke()),
            n.nextBeat && n.nextBeat.sustainPedal === W.Hold || (i.beginPath(),
            i.moveTo(s, a),
            i.lineTo(s, o),
            i.stroke())
        }
    }
    class qa extends Vi {
        get effectId() {
            return "sustain-pedal"
        }
        get notationElement() {
            return e.NotationElement.EffectSustainPedal
        }
        get hideOnMultiTrack() {
            return !1
        }
        get canShareBand() {
            return !0
        }
        get sizingMode() {
            return di.GroupedOnBeat
        }
        constructor() {
            super()
        }
        shouldCreateGlyph(e, t) {
            return !e.player.autoSustainPedal && [W.Press, W.ReleaseThenPress, W.Hold].includes(t.sustainPedal)
        }
        createNewGlyph(e, t) {
            return new Ja(t.sustainPedal)
        }
        canExpand(e, t) {
            return t.sustainPedal === W.Hold
        }
    }
    class Qa {
        constructor(e, t) {
            this.vertical = e,
            this.createLayout = t
        }
    }
    class $a {
        constructor(e, t) {
            this.supportsWorkers = e,
            this.createCanvas = t
        }
    }
    class Ka {
        static createStyleElement(e, t) {
            let s = e.getElementById("alphaTabStyle");
            if (!s) {
                if (!t)
                    return void _e.error("AlphaTab", "Font directory could not be detected, cannot create style element");
                s = e.createElement("style"),
                s.id = "alphaTabStyle";
                let i = `\n            @font-face {\n                font-family: 'alphaTab';\n                 src: url('${t}Bravura.eot');\n                 src: url('${t}Bravura.eot?#iefix') format('embedded-opentype')\n                      , url('${t}Bravura.woff') format('woff')\n                      , url('${t}Bravura.otf') format('opentype')\n                      , url('${t}Bravura.svg#Bravura') format('svg');\n                 font-weight: normal;\n                 font-style: normal;\n            }\n            .at-surface * {\n                cursor: default;\n                vertical-align: top;\n                overflow: visible;\n            }          \n            .at {\n                 font-family: 'alphaTab';\n                 speak: none;\n                 font-style: normal;\n                 font-weight: normal;\n                 font-variant: normal;\n                 text-transform: none;\n                 line-height: 1;\n                 line-height: 1;\n                 -webkit-font-smoothing: antialiased;\n                 -moz-osx-font-smoothing: grayscale;\n                 font-size: ${Ka.MusicFontSize}px;\n                 overflow: visible !important;\n            }`;
                s.innerHTML = i,
                e.getElementsByTagName("head").item(0).appendChild(s),
                Ka.bravuraFontChecker.checkForFontAvailability()
            }
        }
        static get globalThis() {
            if (void 0 === Ka._globalThis) {
                try {
                    Ka._globalThis = globalThis
                } catch (e) {}
                void 0 === Ka._globalThis && (Ka._globalThis = self),
                void 0 === Ka._globalThis && (Ka._globalThis = global),
                void 0 === Ka._globalThis && (Ka._globalThis = window),
                void 0 === Ka._globalThis && (Ka._globalThis = Function("return this")())
            }
            return this._globalThis
        }
        static get isRunningInWorker() {
            return "WorkerGlobalScope"in Ka.globalThis
        }
        static throttle(e, t) {
            let s = 0;
            return () => {
                Ka.globalThis.clearTimeout(s),
                s = Ka.globalThis.setTimeout(e, t)
            }
        }
        static detectScriptFile() {
            return Ka.isRunningInWorker || Ka.webPlatform !== ur.Browser ? null : document.currentScript.src
        }
        static registerJQueryPlugin() {
            if (!Ka.isRunningInWorker && Ka.globalThis && "jQuery"in Ka.globalThis) {
                let e = Ka.globalThis.jQuery
                  , t = new ni;
                e.fn.alphaTab = function(e) {
                    const s = Array.prototype.slice.call(arguments, 1);
                    return 1 === this.length ? t.exec(this[0], e, s) : this.each(( (i, n) => {
                        t.exec(n, e, s)
                    }
                    ))
                }
                ,
                e.alphaTab = {
                    restore: ni.restore
                },
                e.fn.alphaTab.fn = t
            }
        }
        static createScoreRenderer(e) {
            return new ms(e)
        }
        static getRenderEngineFactory(e) {
            return e.core.engine && Ka.renderEngines.has(e.core.engine) ? Ka.renderEngines.get(e.core.engine) : Ka.renderEngines.get("default")
        }
        static getLayoutEngineFactory(t) {
            return t.display.layoutMode && Ka.layoutEngines.has(t.display.layoutMode) ? Ka.layoutEngines.get(t.display.layoutMode) : Ka.layoutEngines.get(e.LayoutMode.Page)
        }
        static buildImporters() {
            return []
        }
        static createDefaultRenderEngines() {
            const e = new Map;
            return e.set("svg", new $a(!0,( () => new ai))),
            e.set("default", e.get("svg")),
            e
        }
        static createDefaultStaveProfiles() {
            const t = new Map;
            t.set(e.StaveProfile.Score, [new Gi("score-effects",[new Ar, new zr, new Or, new pn, new nn, new Er, new Rr, new Xr, new Yr, new Jr, new qr, new Kr, new Wi, new da(!0)]), new Ua, new Gi("score-bottom-effects",[new da(!1), new pa, new Ya, new qa, new un])]);
            let s = [new an, new Or, new Ar, new zr, new nn, new Er, new Rr, new Xr, new Yr, new Jr, new qr, new Qr, new Kr, new Zr(M.Artificial), new Zr(M.Pinch), new Zr(M.Tap), new Zr(M.Semi), new Zr(M.Feedback), new ea, new ta, new sa, new ia, new ra, new aa, new ha, new Wi];
            return t.set(e.StaveProfile.Tab, [new Gi("tab-effects",s), new lr(!0,!0,!0), new Gi("tab-bottom-effects",[new pn])]),
            t.set(e.StaveProfile.TabMixed, [new Gi("tab-effects",s), new lr(!1,!1,!1), new Gi("tab-bottom-effects",[new un])]),
            t.set(e.StaveProfile.Numbered, [new Gi("numbered-effects",[new Ar, new zr, new Or, new pn, new nn, new Er, new Rr, new Xr, new Yr, new Jr, new qr, new Kr, new Wi, new la]), new Cr, new Gi("numbered-bottom-effects",[new pa, new Ya, new un])]),
            t.set(e.StaveProfile.NLead, [new Gi("lead-effects",[new Or, new nn, new an, new Wi, new la]), new Cr, new Gi("lead-bottom-effects",[new un(!0)])]),
            t.set(e.StaveProfile.Lead, [new Gi("score-lead-effects",[new Or, new nn, new Wi]), new Ua, new Gi("score-lead-bottom-effects",[new un(!0)])]),
            t
        }
        static createDefaultLayoutEngines() {
            const t = new Map;
            return t.set(e.LayoutMode.Page, new Qa(!0,(e => new Fn(e)))),
            t.set(e.LayoutMode.Horizontal, new Qa(!1,(e => new Pn(e)))),
            t
        }
        static platformInit() {
            Ka.isRunningInWorker ? (ii.init(),
            Qs.init()) : Ka.webPlatform === ur.Browser && (Ka.registerJQueryPlugin(),
            Ka.HighDpiFactor = window.devicePixelRatio,
            "ResizeObserver"in Ka.globalThis || (Ka.globalThis.ResizeObserver = dr),
            "IntersectionObserver"in Ka.globalThis && "IntersectionObserverEntry"in Ka.globalThis && "isIntersecting"in Ka.globalThis.IntersectionObserverEntry.prototype || (Ka.globalThis.IntersectionObserver = pr))
        }
        static detectWebPlatform() {
            try {
                if ("[object process]" === Object.prototype.toString.call("undefined" != typeof process ? process : 0))
                    return ur.NodeJs
            } catch (e) {}
            return ur.Browser
        }
    }
    Ka.MusicFontSize = 34,
    Ka.HighDpiFactor = 1,
    Ka._globalThis = void 0,
    Ka.webPlatform = Ka.detectWebPlatform(),
    Ka.scriptFile = Ka.detectScriptFile(),
    Ka.bravuraFontChecker = new cr("alphaTab"),
    Ka.renderEngines = Ka.createDefaultRenderEngines(),
    Ka.layoutEngines = Ka.createDefaultLayoutEngines(),
    Ka.staveProfiles = Ka.createDefaultStaveProfiles(),
    Ka.platformInit();
    class ja {
        constructor() {
            if (this.scriptFile = null,
            this.fontDirectory = null,
            this.file = null,
            this.tex = !1,
            this.tracks = null,
            this.enableLazyLoading = !0,
            this.engine = "default",
            this.logLevel = v.Info,
            this.useWorkers = !0,
            this.includeNoteBounds = !1,
            !Ka.isRunningInWorker && Ka.globalThis.ALPHATAB_ROOT ? (this.scriptFile = Ka.globalThis.ALPHATAB_ROOT,
            this.scriptFile = ja.ensureFullUrl(this.scriptFile),
            this.scriptFile = ja.appendScriptName(this.scriptFile)) : this.scriptFile = Ka.scriptFile,
            !Ka.isRunningInWorker && Ka.globalThis.ALPHATAB_FONT)
                this.fontDirectory = Ka.globalThis.ALPHATAB_FONT,
                this.fontDirectory = ja.ensureFullUrl(this.fontDirectory);
            else if (this.fontDirectory = this.scriptFile,
            this.fontDirectory) {
                let e = this.fontDirectory.lastIndexOf(String.fromCharCode(47));
                e >= 0 && (this.fontDirectory = this.fontDirectory.substr(0, e) + "/font/")
            }
        }
        static ensureFullUrl(e) {
            var t, s, i;
            if (!e)
                return "";
            if (!e.startsWith("http") && !e.startsWith("https") && !e.startsWith("file")) {
                let n = ""
                  , r = Ka.globalThis.location;
                if (n += null === (t = r.protocol) || void 0 === t ? void 0 : t.toString(),
                n += "//".toString(),
                r.hostname && (n += null === (s = r.hostname) || void 0 === s ? void 0 : s.toString()),
                r.port && (n += ":".toString(),
                n += null === (i = r.port) || void 0 === i ? void 0 : i.toString()),
                !e.startsWith("/")) {
                    let e = r.pathname.split("/").slice(0, -1).join("/");
                    e.length > 0 && (e.startsWith("/") || (n += "/".toString()),
                    n += null == e ? void 0 : e.toString())
                }
                return e.startsWith("/") || (n += "/".toString()),
                n += null == e ? void 0 : e.toString(),
                n
            }
            return e
        }
        static appendScriptName(e) {
            return e && !e.endsWith(".js") && (e.endsWith("/") || (e += "/"),
            e += "alphaTab.js"),
            e
        }
    }
    class Za {
        constructor() {
            this.core = new ja,
            this.display = new kt,
            this.notation = new be,
            this.importer = new Pt,
            this.player = new Lt
        }
        setSongBookModeSettings() {
            this.notation.notationMode = B.SongBook,
            this.notation.smallGraceTabNotes = !1,
            this.notation.fingeringMode = _.SingleNoteEffectBand,
            this.notation.extendBendArrowsOnTiedNotes = !1,
            this.notation.elements.set(e.NotationElement.ParenthesisOnTiedBends, !1),
            this.notation.elements.set(e.NotationElement.TabNotesOnTiedBends, !1),
            this.notation.elements.set(e.NotationElement.ZerosOnDiveWhammys, !0)
        }
        static get songBook() {
            let e = new Za;
            return e.setSongBookModeSettings(),
            e
        }
    }
    class eo {
        constructor() {
            this.noteOnly = 0,
            this.untilTieOrSlideEnd = 0,
            this.letRingEnd = 0,
            this.quickRelease = !1
        }
    }
    class to {
        constructor() {
            this.firstBeatDuration = 0,
            this.secondBeatStartOffset = 0,
            this.secondBeatDuration = 0
        }
    }
    class so {
        constructor(e, t, s) {
            this._currentTempo = 0,
            this._currentBarRepeatLookup = null,
            this._programsPerChannel = new Map,
            this.tickLookup = new fe,
            this._currentTripletFeel = null,
            this._score = e,
            this._settings = t || new Za,
            this._currentTempo = this._score.tempo,
            this._handler = s
        }
        generate() {
            for (const e of this._score.tracks)
                this.generateTrack(e);
            _e.debug("Midi", "Begin midi generation");
            const e = new ue(this._score);
            let t = null;
            for (; !e.finished; ) {
                const s = e.index
                  , i = this._score.masterBars[s]
                  , n = e.currentTick;
                if (e.processCurrent(),
                e.shouldPlay) {
                    this.generateMasterBar(i, t, n);
                    for (const e of this._score.tracks)
                        for (const t of e.staves)
                            s < t.bars.length && this.generateBar(t.bars[s], n)
                }
                e.moveNext(),
                t = i
            }
            for (const t of this._score.tracks)
                this._handler.finishTrack(t.index, e.currentTick);
            this.tickLookup.finish(),
            _e.debug("Midi", "Midi generation done")
        }
        generateTrack(e) {
            e.sustainTimetable = this.generateSustainTimetable(e.staves[e.staves.length - 1]),
            e.dynamicsTimetable = this.generateDynamicsTimetable(e.staves[0]),
            this.generateChannel(e, e.playbackInfo.primaryChannel, e.playbackInfo),
            e.playbackInfo.primaryChannel !== e.playbackInfo.secondaryChannel && this.generateChannel(e, e.playbackInfo.secondaryChannel, e.playbackInfo)
        }
        addProgramChange(e, t, s, i) {
            this._programsPerChannel.has(s) && this._programsPerChannel.get(s) === i || (this._handler.addProgramChange(e.index, t, s, i),
            this._programsPerChannel.set(s, i))
        }
        generateSustainTimetable(e) {
            const t = [];
            for (const s of e.bars)
                for (const e of s.voices)
                    for (const s of e.beats)
                        if (this._settings.player.autoSustainPedal)
                            if (s.hasChord)
                                t.push({
                                    start: s.absolutePlaybackStart,
                                    end: s.absolutePlaybackStart + s.playbackDuration
                                });
                            else {
                                const e = t[t.length - 1];
                                e && (e.end = s.absolutePlaybackStart + s.playbackDuration)
                            }
                        else
                            switch (s.sustainPedal) {
                            case W.Press:
                            case W.ReleaseThenPress:
                                t.push({
                                    start: s.absolutePlaybackStart,
                                    end: s.absolutePlaybackStart + s.playbackDuration
                                });
                                break;
                            case W.Hold:
                                const e = t[t.length - 1];
                                e && (e.end = s.absolutePlaybackStart + s.playbackDuration);
                                break;
                            case W.Off:
                            case W.Release:
                            }
            return t
        }
        generateDynamicsTimetable(e) {
            const t = [];
            for (const s of e.bars)
                for (const e of s.voices)
                    for (const s of e.beats) {
                        const e = t[t.length - 1];
                        e && e.dynamics === s.dynamics ? e.end = s.absolutePlaybackStart + s.playbackDuration : t.push({
                            start: s.absolutePlaybackStart,
                            end: s.absolutePlaybackStart + s.playbackDuration,
                            dynamics: s.dynamics
                        })
                    }
            return t
        }
        generateChannel(e, t, s) {
            let i = so.toChannelShort(s.volume)
              , n = so.toChannelShort(s.balance);
            this._handler.addControlChange(e.index, 0, t, r.VolumeCoarse, i),
            this._handler.addControlChange(e.index, 0, t, r.PanCoarse, n),
            this._handler.addControlChange(e.index, 0, t, r.ExpressionControllerCoarse, 127),
            this._handler.addControlChange(e.index, 0, t, r.RegisteredParameterFine, 0),
            this._handler.addControlChange(e.index, 0, t, r.RegisteredParameterCourse, 0),
            this._handler.addControlChange(e.index, 0, t, r.DataEntryFine, 0),
            this._handler.addControlChange(e.index, 0, t, r.DataEntryCoarse, so.PitchBendRangeInSemitones),
            this.addProgramChange(e, 0, t, s.program)
        }
        static toChannelShort(e) {
            const t = Math.max(-32768, Math.min(32767, 8 * e - 1));
            return Math.max(t, -1) + 1
        }
        generateMasterBar(e, t, s) {
            t && t.timeSignatureDenominator === e.timeSignatureDenominator && t.timeSignatureNumerator === e.timeSignatureNumerator || this._handler.addTimeSignature(s, e.timeSignatureNumerator, e.timeSignatureDenominator),
            t ? e.tempoAutomation && (this._handler.addTempo(s, e.tempoAutomation.value),
            this._currentTempo = e.tempoAutomation.value) : (this._handler.addTempo(s, e.score.tempo),
            this._currentTempo = e.score.tempo);
            const i = new pe;
            i.masterBar = e,
            i.start = s,
            i.tempo = this._currentTempo,
            i.end = i.start + e.calculateDuration(),
            this.tickLookup.addMasterBar(i)
        }
        generateBar(e, t) {
            let s = this.getPlaybackBar(e);
            this._currentBarRepeatLookup = null;
            for (const i of s.voices)
                this.generateVoice(i, t, e)
        }
        getPlaybackBar(e) {
            switch (e.simileMark) {
            case g.Simple:
                e.previousBar && (e = this.getPlaybackBar(e.previousBar));
                break;
            case g.FirstOfDouble:
            case g.SecondOfDouble:
                e.previousBar && e.previousBar.previousBar && (e = this.getPlaybackBar(e.previousBar.previousBar))
            }
            return e
        }
        generateVoice(e, t, s) {
            if (!e.isEmpty || e.bar.isEmpty && 0 === e.index)
                for (const i of e.beats)
                    this.generateBeat(i, t, s)
        }
        generateBeat(e, t, s) {
            let i = e.playbackStart
              , n = e.playbackDuration;
            e.voice.bar.isEmpty ? n = e.voice.bar.masterBar.calculateDuration() : e.voice.bar.masterBar.tripletFeel !== y.NoTripletFeel && this._settings.player.playTripletFeel && (this._currentTripletFeel ? (i -= this._currentTripletFeel.secondBeatStartOffset,
            n = this._currentTripletFeel.secondBeatDuration,
            this._currentTripletFeel = null) : (this._currentTripletFeel = so.calculateTripletFeelInfo(i, n, e),
            this._currentTripletFeel && (n = this._currentTripletFeel.firstBeatDuration)));
            const r = new de;
            r.start = t + i;
            const a = e.nextBeat ? e.nextBeat.absolutePlaybackStart - e.absolutePlaybackStart : n;
            r.end = t + i,
            r.highlightBeat(e),
            r.end += a > n ? a : n,
            s === e.voice.bar ? (r.beat = e,
            this.tickLookup.addBeat(r)) : (r.isEmptyBar = !0,
            r.beat = s.voices[0].beats[0],
            this._currentBarRepeatLookup ? this._currentBarRepeatLookup.end = r.end : (this._currentBarRepeatLookup = r,
            this.tickLookup.addBeat(this._currentBarRepeatLookup)));
            const o = e.voice.bar.staff.track;
            for (const s of e.automations)
                this.generateAutomation(e, s, t);
            if (e.isRest || e.isDumb && !this._settings.player.enableDumbBeatSound)
                this._handler.addRest(o.index, t + i, o.playbackInfo.primaryChannel);
            else {
                let s = this.getBrushInfo(e);
                for (const r of e.notes)
                    this.generateNote(r, t + i, n, s)
            }
            if (e.vibrato !== b.None) {
                let s = 240
                  , n = 3;
                switch (e.vibrato) {
                case b.Slight:
                    s = this._settings.player.vibrato.beatSlightLength,
                    n = this._settings.player.vibrato.beatSlightAmplitude;
                    break;
                case b.Wide:
                    s = this._settings.player.vibrato.beatWideLength,
                    n = this._settings.player.vibrato.beatWideAmplitude
                }
                this.generateVibratorWithParams(t + i, e.playbackDuration, s, n, ( (t, s) => {
                    this._handler.addBend(e.voice.bar.staff.track.index, t, o.playbackInfo.secondaryChannel, s)
                }
                ))
            }
        }
        static calculateTripletFeelInfo(e, t, s) {
            let i;
            switch (s.voice.bar.masterBar.tripletFeel) {
            case y.Triplet8th:
            case y.Dotted8th:
            case y.Scottish8th:
                i = d.Eighth;
                break;
            case y.Triplet16th:
            case y.Dotted16th:
            case y.Scottish16th:
                i = d.Sixteenth;
                break;
            default:
                return null
            }
            const n = Z.toTicks(i);
            if (t !== n)
                return null;
            if (e % n != 0)
                return null;
            if (!s.nextBeat || s.nextBeat.voice !== s.voice || s.playbackDuration !== n)
                return null;
            const r = new to;
            switch (s.voice.bar.masterBar.tripletFeel) {
            case y.Triplet8th:
                r.firstBeatDuration = Z.applyTuplet(Z.toTicks(d.Quarter), 3, 2),
                r.secondBeatDuration = Z.applyTuplet(Z.toTicks(d.Eighth), 3, 2);
                break;
            case y.Dotted8th:
                r.firstBeatDuration = Z.applyDot(Z.toTicks(d.Eighth), !1),
                r.secondBeatDuration = Z.toTicks(d.Sixteenth);
                break;
            case y.Scottish8th:
                r.firstBeatDuration = Z.toTicks(d.Sixteenth),
                r.secondBeatDuration = Z.applyDot(Z.toTicks(d.Eighth), !1);
                break;
            case y.Triplet16th:
                r.firstBeatDuration = Z.applyTuplet(Z.toTicks(d.Eighth), 3, 2),
                r.secondBeatDuration = Z.applyTuplet(Z.toTicks(d.Sixteenth), 3, 2);
                break;
            case y.Dotted16th:
                r.firstBeatDuration = Z.applyDot(Z.toTicks(d.Sixteenth), !1),
                r.secondBeatDuration = Z.toTicks(d.ThirtySecond);
                break;
            case y.Scottish16th:
                r.firstBeatDuration = Z.toTicks(d.ThirtySecond),
                r.secondBeatDuration = Z.applyDot(Z.toTicks(d.Sixteenth), !1)
            }
            return r.secondBeatStartOffset = t - r.firstBeatDuration,
            r
        }
        generateNote(e, t, s, i) {
            const n = e.beat.voice.bar.staff.track
              , r = e.beat.voice.bar.staff;
            let a = e.realValue;
            if (e.isPercussion) {
                const t = ct.getArticulation(e);
                t && (a = t.outputMidiNumber)
            }
            const o = i && i[e.index] || 0
              , h = t + o
              , l = this.getNoteDuration(e, s);
            l.untilTieOrSlideEnd -= o,
            l.noteOnly -= o,
            l.letRingEnd -= o;
            const c = so.getDynamicValue(e)
              , d = 0 === e.beat.voice.bar.staff.index ? n.playbackInfo.primaryChannel : n.playbackInfo.secondaryChannel;
            let u = 0;
            if (u = e.hasBend ? so.getPitchWheel(e.bendPoints[0].value) : e.beat.hasWhammyBar ? so.getPitchWheel(e.beat.whammyBarPoints[0].value) : e.isTieDestination || e.slideOrigin && e.slideOrigin.slideOutType === m.Legato ? -1 : so.getPitchWheel(0),
            u >= 0 && this._handler.addNoteBend(n.index, h, d, a, u),
            e.beat.fadeIn && this.generateFadeIn(e, h, l),
            !e.isTrill || r.isPercussion) {
                if (e.beat.isTremolo)
                    this.generateTremoloPicking(e, h, l, a, c, d);
                else if (e.hasBend ? this.generateBend(e, h, l, a, d) : e.beat.hasWhammyBar && 0 === e.index ? this.generateWhammy(e.beat, h, l, d) : e.slideInType !== f.None || e.slideOutType !== m.None ? this.generateSlide(e, h, l, a, c, d) : e.vibrato !== b.None && this.generateVibrato(e, h, l, a, d),
                !(e.isTieDestination || e.slideOrigin && e.slideOrigin.slideOutType === m.Legato)) {
                    let e = Math.max(l.untilTieOrSlideEnd, l.letRingEnd);
                    this._handler.addNote(n.index, h, e, a, c, d, l.quickRelease)
                }
            } else
                this.generateTrill(e, h, l, a, c, d)
        }
        getNoteDuration(e, t) {
            const s = new eo;
            if (s.noteOnly = t,
            s.untilTieOrSlideEnd = t,
            s.letRingEnd = t,
            e.isDead)
                return s.noteOnly = this.applyStaticDuration(so.DefaultDurationDead, t),
                s.untilTieOrSlideEnd = s.noteOnly,
                s.letRingEnd = s.noteOnly,
                s.quickRelease = !0,
                s;
            if (e.isPalmMute)
                return s.noteOnly = this.applyStaticDuration(so.DefaultDurationPalmMute, t),
                s.untilTieOrSlideEnd = s.noteOnly,
                s.letRingEnd = s.noteOnly,
                s.quickRelease = !0,
                s;
            if (e.isStaccato)
                return s.noteOnly = t / 2 | 0,
                s.untilTieOrSlideEnd = s.noteOnly,
                s.letRingEnd = s.noteOnly,
                s.quickRelease = !0,
                s;
            if (e.isTieOrigin) {
                const i = e.tieDestination;
                if (i)
                    if (e.isTieDestination) {
                        const e = this.getNoteDuration(i, i.beat.playbackDuration);
                        s.untilTieOrSlideEnd = t + e.untilTieOrSlideEnd
                    } else {
                        const t = e.beat.absolutePlaybackStart
                          , n = this.getNoteDuration(i, i.beat.playbackDuration)
                          , r = i.beat.absolutePlaybackStart + n.untilTieOrSlideEnd;
                        s.untilTieOrSlideEnd = r - t
                    }
            } else if (e.slideOutType === m.Legato) {
                const t = e.slideTarget;
                if (t) {
                    const i = e.beat.absolutePlaybackStart
                      , n = this.getNoteDuration(t, t.beat.playbackDuration)
                      , r = t.beat.absolutePlaybackStart + n.untilTieOrSlideEnd;
                    s.untilTieOrSlideEnd = r - i
                }
            }
            if (e.isLetRing && this._settings.notation.notationMode === B.GuitarPro) {
                let i = e.beat
                  , n = 0;
                const r = e.beat.voice.bar.masterBar.calculateDuration();
                for (; i.nextBeat; ) {
                    let t = i.nextBeat;
                    if (t.isRest)
                        break;
                    if (e.isStringed && t.hasNoteOnString(e.string))
                        break;
                    if (i = i.nextBeat,
                    n = i.absolutePlaybackStart - e.beat.absolutePlaybackStart + i.playbackDuration,
                    n > r) {
                        n = r;
                        break
                    }
                }
                i === e.beat ? s.letRingEnd = t : s.letRingEnd = n
            } else
                s.letRingEnd = so.getBeatSustainEnd(e);
            return s
        }
        applyStaticDuration(e, t) {
            const s = this._currentTempo * e / ye.MaxPosition | 0;
            return Math.min(s, t)
        }
        static getDynamicValue(e) {
            const t = io(e.beat.absolutePlaybackStart, e.beat.voice.bar.staff.track.dynamicsTimetable);
            let s = t ? t.dynamics : e.dynamics;
            switch (!e.beat.voice.bar.staff.isPercussion && e.hammerPullOrigin && s--,
            e.isGhost && s--,
            e.accentuated) {
            case a.Normal:
                s++;
                break;
            case a.Heavy:
                s += 2
            }
            return s < 0 && (s = 0),
            s > u.FFF && (s = u.FFF),
            s
        }
        static getBeatSustainEnd(e) {
            const t = e.beat.voice.bar.staff.track.sustainTimetable
              , s = io(e.beat.absolutePlaybackStart, t);
            return s ? Math.max(e.beat.playbackDuration, s.end - e.beat.absolutePlaybackStart) : e.beat.playbackDuration
        }
        generateFadeIn(e, t, s) {
            const i = e.beat.voice.bar.staff.track
              , n = so.toChannelShort(i.playbackInfo.volume) / s.noteOnly
              , a = s.noteOnly / 120 | 0
              , o = t + s.noteOnly;
            for (let e = a - 1; e >= 0; e--) {
                const s = o - 120 * e
                  , h = (s - t) * n;
                e === a - 1 && (this._handler.addControlChange(i.index, t, i.playbackInfo.primaryChannel, r.VolumeCoarse, h),
                this._handler.addControlChange(i.index, t, i.playbackInfo.secondaryChannel, r.VolumeCoarse, h)),
                this._handler.addControlChange(i.index, s, i.playbackInfo.primaryChannel, r.VolumeCoarse, h),
                this._handler.addControlChange(i.index, s, i.playbackInfo.secondaryChannel, r.VolumeCoarse, h)
            }
        }
        generateVibrato(e, t, s, i, n) {
            let r = 0
              , a = 0;
            switch (e.vibrato) {
            case b.Slight:
                r = this._settings.player.vibrato.noteSlightLength,
                a = this._settings.player.vibrato.noteSlightAmplitude;
                break;
            case b.Wide:
                r = this._settings.player.vibrato.noteWideLength,
                a = this._settings.player.vibrato.noteWideAmplitude;
                break;
            default:
                return
            }
            const o = e.beat.voice.bar.staff.track;
            this.generateVibratorWithParams(t, s.noteOnly, r, a, ( (e, t) => {
                this._handler.addNoteBend(o.index, e, n, i, t)
            }
            ))
        }
        generateVibratorWithParams(e, t, s, i, n) {
            const r = s / 2 | 0
              , a = (e += s) + t;
            for (; e < a; ) {
                let t = 0;
                const o = e + s < a ? s : a - e;
                for (; t < o; ) {
                    let s = i * Math.sin(t * Math.PI / r);
                    n(e + t | 0, so.getPitchWheel(s)),
                    t += 16
                }
                e += s
            }
        }
        static getPitchWheel(e) {
            return he.DefaultPitchWheel + e / 2 * so.PitchValuePerSemitone
        }
        generateSlide(e, t, s, i, n, r) {
            let a = e.slideOutType === m.Legato ? s.noteOnly : s.untilTieOrSlideEnd
              , o = []
              , h = e.beat.voice.bar.staff.track;
            const l = this._settings.player.slide.simpleSlidePitchOffset
              , c = Math.floor(ye.MaxPosition * this._settings.player.slide.simpleSlideDurationRatio)
              , d = Math.floor(ye.MaxPosition * this._settings.player.slide.shiftSlideDurationRatio);
            switch (e.slideInType) {
            case f.IntoFromAbove:
                o.push(new ye(0,l)),
                o.push(new ye(c,0));
                break;
            case f.IntoFromBelow:
                o.push(new ye(0,-l)),
                o.push(new ye(c,0))
            }
            switch (e.slideOutType) {
            case m.Legato:
            case m.Shift:
                o.push(new ye(d,0));
                const t = 2 * (e.slideTarget.realValue - e.realValue);
                o.push(new ye(ye.MaxPosition,t));
                break;
            case m.OutDown:
                o.push(new ye(ye.MaxPosition - c,0)),
                o.push(new ye(ye.MaxPosition,-l));
                break;
            case m.OutUp:
                o.push(new ye(ye.MaxPosition - c,0)),
                o.push(new ye(ye.MaxPosition,l))
            }
            this.generateWhammyOrBend(t, a, o, ( (e, t) => {
                this._handler.addNoteBend(h.index, e, r, i, t)
            }
            ))
        }
        generateBend(e, t, s, i, n) {
            let r = e.bendPoints
              , a = e.beat.voice.bar.staff.track;
            const o = (e, t) => {
                this._handler.addNoteBend(a.index, e, n, i, t)
            }
            ;
            let c, d = null;
            if (e.isTieOrigin && this._settings.notation.extendBendArrowsOnTiedNotes) {
                let t = e;
                for (; t.isTieOrigin && !t.tieDestination.hasBend; )
                    t = t.tieDestination;
                c = t.beat.absolutePlaybackStart - e.beat.absolutePlaybackStart + this.getNoteDuration(t, t.beat.playbackDuration).noteOnly
            } else if (e.isTieOrigin && e.beat.graceType !== p.None) {
                switch (e.tieDestination.bendType) {
                case l.Bend:
                case l.BendRelease:
                case l.PrebendBend:
                    d = e.tieDestination.bendPoints[1].value;
                    break;
                case l.Prebend:
                case l.PrebendRelease:
                    d = e.tieDestination.bendPoints[0].value
                }
                c = Math.max(s.noteOnly, Z.millisToTicks(this._settings.player.songBookBendDuration, this._currentTempo))
            } else
                c = s.noteOnly;
            r[0].value > 0 && !e.isContinuedBend && t > 0 && t--;
            const u = Math.min(c, Z.millisToTicks(this._settings.player.songBookBendDuration, this._currentTempo));
            let g = [];
            switch (e.bendType) {
            case l.Custom:
                g = r;
                break;
            case l.Bend:
            case l.Release:
                switch (e.bendStyle) {
                case h.Default:
                    g = r;
                    break;
                case h.Gradual:
                    g.push(new ye(0,e.bendPoints[0].value)),
                    (!d || d < e.bendPoints[1].value) && (d = e.bendPoints[1].value),
                    g.push(new ye(ye.MaxPosition,d));
                    break;
                case h.Fast:
                    return (!d || d < e.bendPoints[1].value) && (d = e.bendPoints[1].value),
                    void (e.beat.graceType === p.BendGrace ? this.generateSongBookWhammyOrBend(t, c, !0, [e.bendPoints[0].value, d], u, o) : this.generateSongBookWhammyOrBend(t, c, !1, [e.bendPoints[0].value, d], u, o))
                }
                break;
            case l.BendRelease:
                switch (e.bendStyle) {
                case h.Default:
                    g = r;
                    break;
                case h.Gradual:
                    g.push(new ye(0,e.bendPoints[0].value)),
                    g.push(new ye(ye.MaxPosition / 2 | 0,e.bendPoints[1].value)),
                    g.push(new ye(ye.MaxPosition,e.bendPoints[2].value));
                    break;
                case h.Fast:
                    return void this.generateSongBookWhammyOrBend(t, c, !1, [e.bendPoints[0].value, e.bendPoints[1].value, e.bendPoints[2].value], u, o)
                }
                break;
            case l.Hold:
            case l.Prebend:
                g = r;
                break;
            case l.PrebendBend:
                switch (e.bendStyle) {
                case h.Default:
                    g = r;
                    break;
                case h.Gradual:
                    g.push(new ye(0,e.bendPoints[0].value)),
                    g.push(new ye(ye.MaxPosition,e.bendPoints[1].value));
                    break;
                case h.Fast:
                    return o(t, 0 | so.getPitchWheel(e.bendPoints[0].value)),
                    (!d || d < e.bendPoints[1].value) && (d = e.bendPoints[1].value),
                    void this.generateSongBookWhammyOrBend(t, c, !1, [e.bendPoints[0].value, d], u, o)
                }
                break;
            case l.PrebendRelease:
                switch (e.bendStyle) {
                case h.Default:
                    g = r;
                    break;
                case h.Gradual:
                    g.push(new ye(0,e.bendPoints[0].value)),
                    g.push(new ye(ye.MaxPosition,e.bendPoints[1].value));
                    break;
                case h.Fast:
                    return o(t, 0 | so.getPitchWheel(e.bendPoints[0].value)),
                    void this.generateSongBookWhammyOrBend(t, c, !1, [e.bendPoints[0].value, e.bendPoints[1].value], u, o)
                }
            }
            this.generateWhammyOrBend(t, c, g, o)
        }
        generateSongBookWhammyOrBend(e, t, s, i, n, r) {
            const a = s ? e : e + t - n
              , o = n / (i.length - 1);
            for (let e = 0; e < i.length - 1; e++) {
                const t = so.getPitchWheel(i[e])
                  , s = so.getPitchWheel(i[e + 1])
                  , n = a + o * e;
                this.generateBendValues(n, o, t, s, r)
            }
        }
        generateWhammy(e, t, s, i) {
            const n = e.whammyBarPoints
              , r = e.voice.bar.staff.track
              , a = s.noteOnly;
            n[0].value > 0 && !e.isContinuedWhammy && t--;
            const o = (e, t) => {
                this._handler.addBend(r.index, e, i, t)
            }
            ;
            let l = [];
            switch (e.whammyBarType) {
            case S.Custom:
                l = n;
                break;
            case S.Dive:
                switch (e.whammyStyle) {
                case h.Default:
                    l = n;
                    break;
                case h.Gradual:
                    l.push(new ye(0,n[0].value)),
                    l.push(new ye(ye.MaxPosition,n[1].value));
                    break;
                case h.Fast:
                    const e = Math.min(a, Z.millisToTicks(this._settings.player.songBookBendDuration, this._currentTempo));
                    return void this.generateSongBookWhammyOrBend(t, a, !1, [n[0].value, n[1].value], e, o)
                }
                break;
            case S.Dip:
                switch (e.whammyStyle) {
                case h.Default:
                    l = n;
                    break;
                case h.Gradual:
                    l.push(new ye(0,n[0].value)),
                    l.push(new ye(ye.MaxPosition / 2 | 0,n[1].value)),
                    l.push(new ye(ye.MaxPosition,n[2].value));
                    break;
                case h.Fast:
                    const e = Math.min(a, Z.millisToTicks(this._settings.player.songBookDipDuration, this._currentTempo));
                    return void this.generateSongBookWhammyOrBend(t, a, !0, [n[0].value, n[1].value, n[2].value], e, o)
                }
                break;
            case S.Hold:
            case S.Predive:
                l = n;
                break;
            case S.PrediveDive:
                switch (e.whammyStyle) {
                case h.Default:
                    l = n;
                    break;
                case h.Gradual:
                    l.push(new ye(0,n[0].value)),
                    l.push(new ye(ye.MaxPosition / 2 | 0,n[0].value)),
                    l.push(new ye(ye.MaxPosition,n[1].value));
                    break;
                case h.Fast:
                    const e = so.getPitchWheel(n[0].value);
                    this._handler.addBend(r.index, t, i, 0 | e);
                    const s = Math.min(a, Z.millisToTicks(this._settings.player.songBookBendDuration, this._currentTempo));
                    return void this.generateSongBookWhammyOrBend(t, a, !1, [n[0].value, n[1].value], s, o)
                }
            }
            this.generateWhammyOrBend(t, a, l, o)
        }
        generateWhammyOrBend(e, t, s, i) {
            const n = t / ye.MaxPosition;
            for (let t = 0; t < s.length - 1; t++) {
                const r = s[t]
                  , a = s[t + 1]
                  , o = so.getPitchWheel(r.value)
                  , h = so.getPitchWheel(a.value)
                  , l = n * (a.offset - r.offset)
                  , c = e + n * r.offset;
                this.generateBendValues(c, l, o, h, i)
            }
        }
        generateBendValues(e, t, s, i, n) {
            const r = Z.ticksToMillis(t, this._currentTempo)
              , a = Math.abs(i - s) / so.PitchValuePerSemitone
              , o = Math.max(so.MinBreakpointsPerSemitone * a, r / so.MillisecondsPerBreakpoint)
              , h = t / o
              , l = (i - s) / o;
            for (let t = 0; t < o; t++)
                n(0 | e, Math.round(s)),
                s += l,
                e += h;
            s < i && n(0 | e, i)
        }
        generateTrill(e, t, s, i, n, r) {
            const a = e.beat.voice.bar.staff.track
              , o = e.trillValue;
            let h = Z.toTicks(e.trillSpeed)
              , l = !0
              , c = t
              , d = t + s.untilTieOrSlideEnd;
            for (; c + 10 < d; )
                c + h >= d && (h = d - c),
                this._handler.addNote(a.index, c, h, l ? o : i, n, r, !1),
                l = !l,
                c += h
        }
        generateTremoloPicking(e, t, s, i, n, r) {
            const a = e.beat.voice.bar.staff.track;
            let o = Z.toTicks(e.beat.tremoloSpeed)
              , h = t;
            const l = t + s.untilTieOrSlideEnd;
            for (; h + 10 < l; )
                h + o >= l && (o = l - h),
                this._handler.addNote(a.index, h, o, i, n, r, !1),
                h += o
        }
        getBrushInfo(e) {
            const t = new Int32Array(e.notes.length);
            if (e.brushType === c.None)
                return t;
            const s = [...e.notes].sort(( (e, t) => e.realValue - t.realValue))
              , i = [c.ArpeggioUp, c.BrushUp].includes(e.brushType)
              , n = [c.BrushUp, c.BrushDown].includes(e.brushType) ? 10 : 50;
            for (let e = 0; e < s.length; ++e) {
                t[s[e].index] = n * (i ? s.length - 1 - e : e)
            }
            return t
        }
        generateAutomation(e, t, s) {
            switch (t.type) {
            case o.Instrument:
                this.addProgramChange(e.voice.bar.staff.track, e.playbackStart + s, e.voice.bar.staff.track.playbackInfo.primaryChannel, 255 & (0 | t.value)),
                this.addProgramChange(e.voice.bar.staff.track, e.playbackStart + s, e.voice.bar.staff.track.playbackInfo.secondaryChannel, 255 & (0 | t.value));
                break;
            case o.Balance:
                let i = so.toChannelShort(t.value);
                this._handler.addControlChange(e.voice.bar.staff.track.index, e.playbackStart + s, e.voice.bar.staff.track.playbackInfo.primaryChannel, r.PanCoarse, i),
                this._handler.addControlChange(e.voice.bar.staff.track.index, e.playbackStart + s, e.voice.bar.staff.track.playbackInfo.secondaryChannel, r.PanCoarse, i);
                break;
            case o.Volume:
                let n = so.toChannelShort(t.value);
                this._handler.addControlChange(e.voice.bar.staff.track.index, e.playbackStart + s, e.voice.bar.staff.track.playbackInfo.primaryChannel, r.VolumeCoarse, n),
                this._handler.addControlChange(e.voice.bar.staff.track.index, e.playbackStart + s, e.voice.bar.staff.track.playbackInfo.secondaryChannel, r.VolumeCoarse, n)
            }
        }
        prepareSingleBeat(e) {
            let t = -1
              , s = -1
              , i = e;
            for (; i && (-1 === t || -1 === s); ) {
                for (const i of e.automations)
                    switch (i.type) {
                    case o.Instrument:
                        s = i.value;
                        break;
                    case o.Tempo:
                        t = i.value
                    }
                i = i.previousBeat
            }
            const n = e.voice.bar.staff.track
              , a = e.voice.bar.masterBar;
            -1 === t && (t = a.score.tempo),
            -1 === s && (s = n.playbackInfo.program);
            const h = n.playbackInfo.volume;
            this.generateTrack(n),
            this._handler.addTimeSignature(0, a.timeSignatureNumerator, a.timeSignatureDenominator),
            this._handler.addTempo(0, t);
            let l = so.toChannelShort(h);
            this._handler.addControlChange(0, 0, n.playbackInfo.primaryChannel, r.VolumeCoarse, l),
            this._handler.addControlChange(0, 0, n.playbackInfo.secondaryChannel, r.VolumeCoarse, l)
        }
        generateSingleBeat(e) {
            this.prepareSingleBeat(e),
            this.generateBeat(e, -e.playbackStart, e.voice.bar)
        }
        generateSingleNote(e) {
            this.prepareSingleBeat(e.beat),
            this.generateNote(e, -e.beat.playbackStart, e.beat.playbackDuration)
        }
    }
    function io(e, t, s=0, i=-1) {
        if (i < 0 && (i = t.length),
        s >= i)
            return null;
        const n = Math.floor((s + i) / 2)
          , r = t[n];
        return e < r.start ? io(e, t, s, n) : e >= r.end ? io(e, t, n + 1, i) : r
    }
    so.DefaultDurationDead = 30,
    so.DefaultDurationPalmMute = 80,
    so.PitchBendRangeInSemitones = 16,
    so.PitchValuePerSemitone = he.DefaultPitchWheel / so.PitchBendRangeInSemitones,
    so.MinBreakpointsPerSemitone = 6,
    so.MillisecondsPerBreakpoint = 150,
    function(e) {
        e[e.No = 0] = "No",
        e[e.Eof = 1] = "Eof",
        e[e.Number = 2] = "Number",
        e[e.DoubleDot = 3] = "DoubleDot",
        e[e.Dot = 4] = "Dot",
        e[e.String = 5] = "String",
        e[e.Tuning = 6] = "Tuning",
        e[e.LParensis = 7] = "LParensis",
        e[e.RParensis = 8] = "RParensis",
        e[e.LBrace = 9] = "LBrace",
        e[e.RBrace = 10] = "RBrace",
        e[e.Pipe = 11] = "Pipe",
        e[e.MetaCommand = 12] = "MetaCommand",
        e[e.Multiply = 13] = "Multiply",
        e[e.LowerThan = 14] = "LowerThan",
        e[e.Property = 15] = "Property"
    }(Hr || (Hr = {}));
    class no extends Pe {
        constructor(e) {
            super(k.AlphaTex, e),
            this.position = 0,
            this.nonTerm = "",
            this.expected = Hr.No,
            this.symbol = Hr.No,
            this.symbolData = null,
            Object.setPrototypeOf(this, no.prototype)
        }
        static symbolError(e, t, s, i, n=null) {
            let r;
            r = n ? `MalFormed AlphaTex: @${e}: Error on block ${t}, invalid value: ${n}` : `MalFormed AlphaTex: @${e}: Error on block ${t}, expected a ${Hr[s]} found a ${Hr[i]}: '${n}'`;
            let a = new no(r);
            return a.position = e,
            a.nonTerm = t,
            a.expected = s,
            a.symbol = i,
            a.symbolData = n,
            a
        }
        static errorMessage(e, t) {
            let s = new no(t = "MalFormed AlphaTex: @" + e + ": " + t);
            return s.position = e,
            s
        }
    }
    class ro extends Rt {
        constructor() {
            super(),
            this._trackChannel = 0,
            this._input = "",
            this._ch = 0,
            this._curChPos = 0,
            this._sy = Hr.No,
            this._syData = "",
            this._allowNegatives = !1,
            this._allowTuning = !1,
            this._currentDuration = d.QuadrupleWhole,
            this._currentDynamics = u.PPP,
            this._currentTuplet = 0,
            this._staffHasExplicitTuning = !1,
            this._staffTuningApplied = !1
        }
        get name() {
            return "AlphaTex"
        }
        initFromString(e, t) {
            this.data = se.empty(),
            this._input = e,
            this.settings = t
        }
        readScore() {
            try {
                if (this.data.length > 0 && (this._input = te.toString(this.data.readAll(), this.settings.importer.encoding)),
                this._allowTuning = !0,
                this._lyrics = new Map,
                this.createDefaultScore(),
                this._curChPos = 0,
                this._currentDuration = d.Quarter,
                this._currentDynamics = u.F,
                this._currentTuplet = 1,
                this._ch = this.nextChar(),
                this._sy = this.newSy(),
                this._sy === Hr.LowerThan)
                    throw new Ot("Unknown start sign <");
                this.score(),
                this.consolidate(),
                this._score.finish(this.settings);
                for (const [e,t] of this._lyrics)
                    this._score.tracks[e].applyLyrics(t);
                return this._score
            } catch (e) {
                throw e instanceof no ? new Ot(e.message) : e
            }
        }
        consolidate() {
            for (let e of this._score.tracks)
                for (let t of e.staves)
                    for (; t.bars.length < this._score.masterBars.length; ) {
                        let e = this.newBar(t)
                          , s = new ft;
                        s.isEmpty = !0,
                        e.voices[0].addBeat(s)
                    }
        }
        error(e, t, s=!0) {
            let i;
            throw i = s ? no.symbolError(this._curChPos, e, t, this._sy, null) : no.symbolError(this._curChPos, e, t, t, this._syData),
            _e.error(this.name, i.message),
            i
        }
        errorMessage(e) {
            let t = no.errorMessage(this._curChPos, e);
            throw _e.error(this.name, t.message),
            t
        }
        createDefaultScore() {
            this._score = new _t,
            this._score.tempo = 120,
            this._score.tempoLabel = "",
            this.newTrack()
        }
        newTrack() {
            this._currentTrack = new es,
            this._currentTrack.ensureStaveCount(1),
            this._currentTrack.playbackInfo.program = 25,
            this._currentTrack.playbackInfo.primaryChannel = this._trackChannel++,
            this._currentTrack.playbackInfo.secondaryChannel = this._trackChannel++,
            this._currentStaff = this._currentTrack.staves[0],
            this._currentStaff.displayTranspositionPitch = -12,
            this._currentStaff.stringTuning.tunings = jt.getDefaultTuningFor(6).tunings,
            this._score.addTrack(this._currentTrack),
            this._lyrics.set(this._currentTrack.index, []),
            this._currentDynamics = u.F
        }
        parseClefFromString(e) {
            switch (e.toLowerCase()) {
            case "g2":
            case "treble":
                return H.G2;
            case "f4":
            case "bass":
                return H.F4;
            case "c3":
            case "tenor":
                return H.C3;
            case "c4":
            case "alto":
                return H.C4;
            case "n":
            case "neutral":
                return H.Neutral;
            default:
                return H.G2
            }
        }
        parseClefFromInt(e) {
            switch (e) {
            case 43:
                return H.G2;
            case 65:
                return H.F4;
            case 48:
                return H.C3;
            case 60:
                return H.C4;
            default:
                return H.G2
            }
        }
        parseTripletFeelFromString(e) {
            switch (e.toLowerCase()) {
            case "no":
            case "none":
                return y.NoTripletFeel;
            case "t16":
            case "triplet-16th":
                return y.Triplet16th;
            case "t8":
            case "triplet-8th":
                return y.Triplet8th;
            case "d16":
            case "dotted-16th":
                return y.Dotted16th;
            case "d8":
            case "dotted-8th":
                return y.Dotted8th;
            case "s16":
            case "scottish-16th":
                return y.Scottish16th;
            case "s8":
            case "scottish-8th":
                return y.Scottish8th;
            default:
                return y.NoTripletFeel
            }
        }
        parseTripletFeelFromInt(e) {
            switch (e) {
            case 0:
                return y.NoTripletFeel;
            case 1:
                return y.Triplet16th;
            case 2:
                return y.Triplet8th;
            case 3:
                return y.Dotted16th;
            case 4:
                return y.Dotted8th;
            case 5:
                return y.Scottish16th;
            case 6:
                return y.Scottish8th;
            default:
                return y.NoTripletFeel
            }
        }
        parseKeySignature(e) {
            switch (e.toLowerCase()) {
            case "cb":
                return -7;
            case "gb":
                return -6;
            case "db":
                return -5;
            case "ab":
                return -4;
            case "eb":
                return -3;
            case "bb":
                return -2;
            case "f":
                return -1;
            case "c":
                return 0;
            case "g":
                return 1;
            case "d":
                return 2;
            case "a":
                return 3;
            case "e":
                return 4;
            case "b":
                return 5;
            case "f#":
                return 6;
            case "c#":
                return 7;
            default:
                return 0
            }
        }
        nextChar() {
            return this._curChPos < this._input.length ? this._ch = this._input.charCodeAt(this._curChPos++) : this._ch = 0,
            this._ch
        }
        newSy() {
            this._sy = Hr.No;
            do {
                if (this._ch === ro.Eof)
                    this._sy = Hr.Eof;
                else if (32 === this._ch || 11 === this._ch || 13 === this._ch || 10 === this._ch || 9 === this._ch)
                    this._ch = this.nextChar();
                else if (47 === this._ch)
                    if (this._ch = this.nextChar(),
                    47 === this._ch)
                        for (; 13 !== this._ch && 10 !== this._ch && this._ch !== ro.Eof; )
                            this._ch = this.nextChar();
                    else if (42 === this._ch)
                        for (; 0 !== this._ch; )
                            if (42 === this._ch) {
                                if (this._ch = this.nextChar(),
                                47 === this._ch) {
                                    this._ch = this.nextChar();
                                    break
                                }
                            } else
                                this._ch = this.nextChar();
                    else
                        this.error("symbol", Hr.String, !1);
                else if (34 === this._ch || 39 === this._ch) {
                    let e = this._ch;
                    this._ch = this.nextChar();
                    let t = "";
                    for (this._sy = Hr.String; this._ch !== e && this._ch !== ro.Eof; )
                        t += String.fromCharCode(this._ch),
                        this._ch = this.nextChar();
                    this._syData = t,
                    this._ch = this.nextChar()
                } else if (45 === this._ch)
                    if (this._allowNegatives && this.isDigit(this._ch)) {
                        let e = this.readNumber();
                        this._sy = Hr.Number,
                        this._syData = e
                    } else
                        this._sy = Hr.String,
                        this._syData = this.readName();
                else if (46 === this._ch)
                    this._sy = Hr.Dot,
                    this._ch = this.nextChar();
                else if (58 === this._ch)
                    this._sy = Hr.DoubleDot,
                    this._ch = this.nextChar();
                else if (40 === this._ch)
                    this._sy = Hr.LParensis,
                    this._ch = this.nextChar();
                else if (92 === this._ch) {
                    this._ch = this.nextChar();
                    let e = this.readName();
                    this._sy = Hr.MetaCommand,
                    this._syData = e
                } else if (41 === this._ch)
                    this._sy = Hr.RParensis,
                    this._ch = this.nextChar();
                else if (123 === this._ch)
                    this._sy = Hr.LBrace,
                    this._ch = this.nextChar();
                else if (125 === this._ch)
                    this._sy = Hr.RBrace,
                    this._ch = this.nextChar();
                else if (124 === this._ch)
                    this._sy = Hr.Pipe,
                    this._ch = this.nextChar();
                else if (42 === this._ch)
                    this._sy = Hr.Multiply,
                    this._ch = this.nextChar();
                else if (60 === this._ch)
                    this._sy = Hr.LowerThan,
                    this._ch = this.nextChar();
                else if (this.isDigit(this._ch)) {
                    let e = this.readNumber();
                    this._sy = Hr.Number,
                    this._syData = e
                } else if (ro.isLetter(this._ch)) {
                    let e = this.readName()
                      , t = this._allowTuning ? ht.parseTuning(e) : null;
                    t ? (this._sy = Hr.Tuning,
                    this._syData = t) : (this._sy = Hr.String,
                    this._syData = e)
                } else
                    this.error("symbol", Hr.String, !1)
            } while (this._sy === Hr.No);
            return this._sy
        }
        static isLetter(e) {
            return !ro.isTerminal(e) && (e >= 33 && e <= 47 || e >= 58 && e <= 126 || e > 128)
        }
        static isTerminal(e) {
            return 46 === e || 123 === e || 125 === e || 91 === e || 93 === e || 40 === e || 41 === e || 124 === e || 39 === e || 34 === e || 92 === e
        }
        isDigit(e) {
            return e >= 48 && e <= 57 || 45 === e && this._allowNegatives
        }
        readName() {
            let e = "";
            do {
                e += String.fromCharCode(this._ch),
                this._ch = this.nextChar()
            } while (ro.isLetter(this._ch) || this.isDigit(this._ch) || 35 === this._ch);
            return e
        }
        readNumber() {
            let e = "";
            do {
                e += String.fromCharCode(this._ch),
                this._ch = this.nextChar()
            } while (this.isDigit(this._ch));
            return parseInt(e)
        }
        score() {
            if (this._sy === Hr.Eof)
                throw new Ot("Unexpected end of file");
            const e = this.metaData()
              , t = this.bars();
            if (!e && !t)
                throw new Ot("No alphaTex data found")
        }
        metaData() {
            let e = !1
              , t = !0;
            for (; this._sy === Hr.MetaCommand && t; ) {
                switch (this._syData.toLowerCase()) {
                case "title":
                    this._sy = this.newSy(),
                    this._sy === Hr.String ? this._score.title = this._syData : this.error("title", Hr.String, !0),
                    this._sy = this.newSy(),
                    e = !0;
                    break;
                case "subtitle":
                    this._sy = this.newSy(),
                    this._sy === Hr.String ? this._score.subTitle = this._syData : this.error("subtitle", Hr.String, !0),
                    this._sy = this.newSy(),
                    e = !0;
                    break;
                case "artist":
                    this._sy = this.newSy(),
                    this._sy === Hr.String ? this._score.artist = this._syData : this.error("artist", Hr.String, !0),
                    this._sy = this.newSy(),
                    e = !0;
                    break;
                case "album":
                    this._sy = this.newSy(),
                    this._sy === Hr.String ? this._score.album = this._syData : this.error("album", Hr.String, !0),
                    this._sy = this.newSy(),
                    e = !0;
                    break;
                case "words":
                    this._sy = this.newSy(),
                    this._sy === Hr.String ? this._score.words = this._syData : this.error("words", Hr.String, !0),
                    this._sy = this.newSy(),
                    e = !0;
                    break;
                case "music":
                    this._sy = this.newSy(),
                    this._sy === Hr.String ? this._score.music = this._syData : this.error("music", Hr.String, !0),
                    this._sy = this.newSy(),
                    e = !0;
                    break;
                case "copyright":
                    this._sy = this.newSy(),
                    this._sy === Hr.String ? this._score.copyright = this._syData : this.error("copyright", Hr.String, !0),
                    this._sy = this.newSy(),
                    e = !0;
                    break;
                case "tempo":
                    this._sy = this.newSy(),
                    this._sy === Hr.Number ? this._score.tempo = this._syData : this.error("tempo", Hr.Number, !0),
                    this._sy = this.newSy(),
                    e = !0;
                    break;
                default:
                    this.handleStaffMeta() ? e = !0 : e ? this.error("metaDataTags", Hr.String, !1) : t = !1
                }
            }
            return e ? (this._sy !== Hr.Dot && this.error("song", Hr.Dot, !0),
            this._sy = this.newSy()) : this._sy === Hr.Dot && (this._sy = this.newSy()),
            e
        }
        handleStaffMeta() {
            switch (this._syData.toLowerCase()) {
            case "capo":
                return this._sy = this.newSy(),
                this._sy === Hr.Number ? this._currentStaff.capo = this._syData : this.error("capo", Hr.Number, !0),
                this._sy = this.newSy(),
                !0;
            case "tuning":
                this._sy = this.newSy();
                let e = this._currentStaff.tuning.length;
                switch (this._staffHasExplicitTuning = !0,
                this._staffTuningApplied = !1,
                this._sy) {
                case Hr.String:
                    let e = this._syData.toLowerCase();
                    "piano" === e || "none" === e || "voice" === e ? (this._currentStaff.stringTuning.tunings = [],
                    this._currentStaff.displayTranspositionPitch = 0) : this.error("tuning", Hr.Tuning, !0),
                    this._sy = this.newSy();
                    break;
                case Hr.Tuning:
                    let t = [];
                    do {
                        let e = this._syData;
                        t.push(e.realValue),
                        this._sy = this.newSy()
                    } while (this._sy === Hr.Tuning);
                    this._currentStaff.stringTuning.tunings = t;
                    break;
                default:
                    this.error("tuning", Hr.Tuning, !0)
                }
                return e !== this._currentStaff.tuning.length && this._currentStaff.chords.size > 0 && this.errorMessage("Tuning must be defined before any chord"),
                !0;
            case "instrument":
                if (this._sy = this.newSy(),
                this._staffTuningApplied = !1,
                this._sy === Hr.Number) {
                    let e = this._syData;
                    e >= 0 && e <= 128 ? this._currentTrack.playbackInfo.program = this._syData : this.error("instrument", Hr.Number, !1)
                } else if (this._sy === Hr.String) {
                    let e = this._syData.toLowerCase();
                    this._currentTrack.playbackInfo.program = at.getValue(e)
                } else
                    this.error("instrument", Hr.Number, !0);
                return this._sy = this.newSy(),
                !0;
            case "lyrics":
                this._sy = this.newSy();
                let t = new Gt;
                return t.startBar = 0,
                t.text = "",
                this._sy === Hr.Number && (t.startBar = this._syData,
                this._sy = this.newSy()),
                this._sy === Hr.String ? (t.text = this._syData,
                this._sy = this.newSy()) : this.error("lyrics", Hr.String, !0),
                this._lyrics.get(this._currentTrack.index).push(t),
                !0;
            case "chord":
                this._sy = this.newSy();
                let s = new At;
                this.chordProperties(s),
                this._sy === Hr.String ? (s.name = this._syData,
                this._sy = this.newSy()) : this.error("chord-name", Hr.Number, !0);
                for (let e = 0; e < this._currentStaff.tuning.length; e++)
                    this._sy === Hr.Number ? s.strings.push(new ts(this._syData,E.Unknown)) : this._sy === Hr.String && "x" === this._syData.toLowerCase() && s.strings.push(new ts),
                    this._sy = this.newSy();
                return this._currentStaff.addChord(this.getChordId(this._currentStaff, s.name), s),
                !0;
            default:
                return !1
            }
        }
        chordProperties(e) {
            if (this._sy === Hr.LBrace) {
                for (this._sy = this.newSy(); this._sy === Hr.String; )
                    switch (this._syData.toLowerCase()) {
                    case "firstfret":
                        switch (this._sy = this.newSy(),
                        this._sy) {
                        case Hr.Number:
                            e.firstFret = this._syData;
                            break;
                        default:
                            this.error("chord-firstfret", Hr.Number, !0)
                        }
                        this._sy = this.newSy();
                        break;
                    case "showdiagram":
                        switch (this._sy = this.newSy(),
                        this._sy) {
                        case Hr.String:
                            e.showDiagram = "false" !== this._syData.toLowerCase();
                            break;
                        case Hr.Number:
                            e.showDiagram = 0 !== this._syData;
                            break;
                        default:
                            this.error("chord-showdiagram", Hr.String, !0)
                        }
                        this._sy = this.newSy();
                        break;
                    case "showfingering":
                        switch (this._sy = this.newSy(),
                        this._sy) {
                        case Hr.String:
                            e.showDiagram = "false" !== this._syData.toLowerCase();
                            break;
                        case Hr.Number:
                            e.showFingering = 0 !== this._syData;
                            break;
                        default:
                            this.error("chord-showfingering", Hr.String, !0)
                        }
                        this._sy = this.newSy();
                        break;
                    case "showname":
                        switch (this._sy = this.newSy(),
                        this._sy) {
                        case Hr.String:
                            e.showName = "false" !== this._syData.toLowerCase();
                            break;
                        case Hr.Number:
                            e.showName = 0 !== this._syData;
                            break;
                        default:
                            this.error("chord-showname", Hr.String, !0)
                        }
                        this._sy = this.newSy();
                        break;
                    case "barre":
                        for (this._sy = this.newSy(); this._sy === Hr.Number; )
                            e.barreFrets.push(this._syData),
                            this._sy = this.newSy();
                        break;
                    default:
                        this.error("chord-properties", Hr.String, !1)
                    }
                this._sy !== Hr.RBrace && this.error("chord-properties", Hr.RBrace, !0),
                this._sy = this.newSy()
            }
        }
        bars() {
            let e = this.bar();
            for (; this._sy !== Hr.Eof; )
                if (this._sy === Hr.Pipe)
                    this._sy = this.newSy(),
                    this.bar();
                else {
                    if (this._sy !== Hr.MetaCommand)
                        break;
                    this.bar()
                }
            return e
        }
        trackStaffMeta() {
            let e = !1;
            if (this._sy === Hr.MetaCommand) {
                e = !0;
                let t = this._syData.toLowerCase();
                "track" === t && (this._staffHasExplicitTuning = !1,
                this._staffTuningApplied = !1,
                this._sy = this.newSy(),
                this._score.masterBars.length > 0 && this.newTrack(),
                this._sy === Hr.String && (this._currentTrack.name = this._syData,
                this._sy = this.newSy()),
                this._sy === Hr.String && (this._currentTrack.shortName = this._syData,
                this._sy = this.newSy())),
                this._sy === Hr.MetaCommand && (t = this._syData.toLowerCase(),
                "staff" === t && (this._staffHasExplicitTuning = !1,
                this._staffTuningApplied = !1,
                this._sy = this.newSy(),
                this._currentTrack.staves[0].bars.length > 0 && (this._currentTrack.ensureStaveCount(this._currentTrack.staves.length + 1),
                this._currentStaff = this._currentTrack.staves[this._currentTrack.staves.length - 1],
                this._currentDynamics = u.F),
                this.staffProperties()))
            }
            return e
        }
        staffProperties() {
            if (this._sy !== Hr.LBrace)
                return;
            this._sy = this.newSy();
            let e = !1
              , t = !1;
            for (; this._sy === Hr.String; )
                switch (this._syData.toLowerCase()) {
                case "score":
                    e = !0,
                    this._sy = this.newSy();
                    break;
                case "tabs":
                    t = !0,
                    this._sy = this.newSy();
                    break;
                default:
                    this.error("staff-properties", Hr.String, !1)
                }
            (e || t) && (this._currentStaff.showStandardNotation = e,
            this._currentStaff.showTablature = t),
            this._sy !== Hr.RBrace && this.error("staff-properties", Hr.RBrace, !0),
            this._sy = this.newSy()
        }
        bar() {
            const e = this.trackStaffMeta();
            let t = this.newBar(this._currentStaff);
            if (this._currentStaff.bars.length > this._score.masterBars.length) {
                let e = new Qt;
                this._score.addMasterBar(e),
                e.index > 0 && (e.keySignature = e.previousMasterBar.keySignature,
                e.keySignatureType = e.previousMasterBar.keySignatureType,
                e.timeSignatureDenominator = e.previousMasterBar.timeSignatureDenominator,
                e.timeSignatureNumerator = e.previousMasterBar.timeSignatureNumerator,
                e.tripletFeel = e.previousMasterBar.tripletFeel)
            }
            const s = this.barMeta(t);
            if (!this._staffTuningApplied && !this._staffHasExplicitTuning) {
                const e = this._currentTrack.playbackInfo.program;
                this._currentStaff.displayTranspositionPitch = 0,
                this._currentStaff.stringTuning.tunings = [],
                15 == e || e >= 24 && e <= 31 ? (this._currentStaff.displayTranspositionPitch = -12,
                this._currentStaff.stringTuning.tunings = jt.getDefaultTuningFor(6).tunings) : e >= 32 && e <= 39 ? (this._currentStaff.displayTranspositionPitch = -12,
                this._currentStaff.stringTuning.tunings = [43, 38, 33, 28]) : 40 == e || 44 == e || 45 == e || 48 == e || 49 == e || 50 == e || 51 == e ? this._currentStaff.stringTuning.tunings = [52, 57, 50, 43] : 41 == e ? this._currentStaff.stringTuning.tunings = [57, 50, 43, 36] : 42 == e ? this._currentStaff.stringTuning.tunings = [45, 38, 31, 24] : 43 == e ? (this._currentStaff.displayTranspositionPitch = -12,
                this._currentStaff.stringTuning.tunings = [43, 38, 33, 28]) : 105 == e ? this._currentStaff.stringTuning.tunings = [50, 47, 43, 38, 55] : 106 == e ? this._currentStaff.stringTuning.tunings = [57, 52, 45] : 107 == e ? this._currentStaff.stringTuning.tunings = [52, 45, 38, 31] : 110 == e && (this._currentStaff.stringTuning.tunings = [64, 57, 50, 43]),
                this._staffTuningApplied = !0
            }
            let i = !1
              , n = t.voices[0];
            for (; this._sy !== Hr.Pipe && this._sy !== Hr.Eof && this.beat(n); )
                i = !0;
            if (0 === n.beats.length) {
                let e = new ft;
                e.isEmpty = !0,
                n.addBeat(e)
            }
            return e || s || i
        }
        newBar(e) {
            let t = new ut;
            e.addBar(t),
            t.index > 0 && (t.clef = t.previousBar.clef);
            let s = new wt;
            return t.addVoice(s),
            t
        }
        beat(e) {
            this.beatDuration();
            let t = new ft;
            if (e.addBeat(t),
            this._sy === Hr.LParensis) {
                for (this._sy = this.newSy(),
                this.note(t); this._sy !== Hr.RParensis && this._sy !== Hr.Eof && this.note(t); )
                    ;
                this._sy !== Hr.RParensis && this.error("note-list", Hr.RParensis, !0),
                this._sy = this.newSy()
            } else if (this._sy === Hr.String && "r" === this._syData.toLowerCase())
                this._sy = this.newSy();
            else if (!this.note(t))
                return e.beats.splice(e.beats.length - 1, 1),
                !1;
            this._sy === Hr.Dot && (this._allowNegatives = !0,
            this._sy = this.newSy(),
            this._allowNegatives = !1,
            this._sy !== Hr.Number && this.error("duration", Hr.Number, !0),
            this._currentDuration = this.parseDuration(this._syData),
            this._sy = this.newSy()),
            t.duration = this._currentDuration,
            t.dynamics = this._currentDynamics,
            1 === this._currentTuplet || t.hasTuplet || this.applyTuplet(t, this._currentTuplet);
            let s = 1;
            this._sy === Hr.Multiply && (this._sy = this.newSy(),
            this._sy !== Hr.Number ? this.error("multiplier", Hr.Number, !0) : s = this._syData,
            this._sy = this.newSy()),
            this.beatEffects(t);
            for (let i = 0; i < s - 1; i++)
                e.addBeat(St.clone(t));
            return !0
        }
        beatDuration() {
            if (this._sy === Hr.DoubleDot && (this._allowNegatives = !0,
            this._sy = this.newSy(),
            this._allowNegatives = !1,
            this._sy !== Hr.Number && this.error("duration", Hr.Number, !0),
            this._currentDuration = this.parseDuration(this._syData),
            this._currentTuplet = 1,
            this._sy = this.newSy(),
            this._sy === Hr.LBrace)) {
                for (this._sy = this.newSy(); this._sy === Hr.String; ) {
                    switch (this._syData.toLowerCase()) {
                    case "tu":
                        this._sy = this.newSy(),
                        this._sy !== Hr.Number && this.error("duration-tuplet", Hr.Number, !0),
                        this._currentTuplet = this._syData,
                        this._sy = this.newSy();
                        break;
                    default:
                        this.error("beat-duration", Hr.String, !1)
                    }
                }
                this._sy !== Hr.RBrace && this.error("beat-duration", Hr.RBrace, !0),
                this._sy = this.newSy()
            }
        }
        beatEffects(e) {
            if (this._sy === Hr.LBrace) {
                for (this._sy = this.newSy(); this._sy === Hr.String; )
                    this._syData = this._syData.toLowerCase(),
                    this.applyBeatEffect(e) || this.error("beat-effects", Hr.String, !1);
                this._sy !== Hr.RBrace && this.error("beat-effects", Hr.RBrace, !0),
                this._sy = this.newSy()
            }
        }
        applyBeatEffect(e) {
            let t = this._syData.toLowerCase();
            if ("f" === t)
                return e.fadeIn = !0,
                this._sy = this.newSy(),
                !0;
            if ("v" === t)
                return e.vibrato = b.Slight,
                this._sy = this.newSy(),
                !0;
            if ("s" === t)
                return e.slap = !0,
                this._sy = this.newSy(),
                !0;
            if ("p" === t)
                return e.pop = !0,
                this._sy = this.newSy(),
                !0;
            if ("tt" === t)
                return e.tap = !0,
                this._sy = this.newSy(),
                !0;
            if ("dd" === t)
                return e.dots = 2,
                this._sy = this.newSy(),
                !0;
            if ("d" === t)
                return e.dots = 1,
                this._sy = this.newSy(),
                !0;
            if ("su" === t)
                return e.pickStroke = O.Up,
                this._sy = this.newSy(),
                !0;
            if ("sd" === t)
                return e.pickStroke = O.Down,
                this._sy = this.newSy(),
                !0;
            if ("tu" === t)
                return this._sy = this.newSy(),
                this._sy !== Hr.Number ? (this.error("tuplet", Hr.Number, !0),
                !1) : (this.applyTuplet(e, this._syData),
                this._sy = this.newSy(),
                !0);
            if ("tb" === t || "tbe" === t) {
                let s = "tbe" === t;
                if (this._sy = this.newSy(),
                this._sy !== Hr.LParensis)
                    return this.error("tremolobar-effect", Hr.LParensis, !0),
                    !1;
                for (this._allowNegatives = !0,
                this._sy = this.newSy(); this._sy !== Hr.RParensis && this._sy !== Hr.Eof; ) {
                    let t = 0
                      , i = 0;
                    if (s) {
                        if (this._sy !== Hr.Number)
                            return this.error("tremolobar-effect", Hr.Number, !0),
                            !1;
                        if (t = this._syData,
                        this._sy = this.newSy(),
                        this._sy !== Hr.Number)
                            return this.error("tremolobar-effect", Hr.Number, !0),
                            !1;
                        i = this._syData
                    } else {
                        if (this._sy !== Hr.Number)
                            return this.error("tremolobar-effect", Hr.Number, !0),
                            !1;
                        t = 0,
                        i = this._syData
                    }
                    e.addWhammyBarPoint(new ye(t,i)),
                    this._sy = this.newSy()
                }
                for (; e.whammyBarPoints.length > 60; )
                    e.removeWhammyBarPoint(e.whammyBarPoints.length - 1);
                if (s)
                    e.whammyBarPoints.sort(( (e, t) => e.offset - t.offset));
                else {
                    let t = e.whammyBarPoints.length
                      , s = 60 / t | 0
                      , i = 0;
                    for (; i < t; )
                        e.whammyBarPoints[i].offset = Math.min(60, i * s),
                        i++
                }
                return this._allowNegatives = !1,
                this._sy !== Hr.RParensis ? (this.error("tremolobar-effect", Hr.RParensis, !0),
                !1) : (this._sy = this.newSy(),
                !0)
            }
            if ("ch" === t) {
                this._sy = this.newSy();
                let t = this._syData
                  , s = this.getChordId(this._currentStaff, t);
                if (!this._currentStaff.chords.has(s)) {
                    let e = new At;
                    e.showDiagram = !1,
                    e.name = t,
                    this._currentStaff.addChord(s, e)
                }
                return e.chordId = s,
                this._sy = this.newSy(),
                !0
            }
            if ("gr" === t)
                return this._sy = this.newSy(),
                "ob" === this._syData.toLowerCase() ? (e.graceType = p.OnBeat,
                this._sy = this.newSy()) : "b" === this._syData.toLowerCase() ? (e.graceType = p.BendGrace,
                this._sy = this.newSy()) : e.graceType = p.BeforeBeat,
                !0;
            if ("dy" === t) {
                switch (this.newSy(),
                this._syData.toLowerCase()) {
                case "ppp":
                    e.dynamics = u.PPP;
                    break;
                case "pp":
                    e.dynamics = u.PP;
                    break;
                case "p":
                    e.dynamics = u.P;
                    break;
                case "mp":
                    e.dynamics = u.MP;
                    break;
                case "mf":
                    e.dynamics = u.MF;
                    break;
                case "f":
                    e.dynamics = u.F;
                    break;
                case "ff":
                    e.dynamics = u.FF;
                    break;
                case "fff":
                    e.dynamics = u.FFF
                }
                return this._currentDynamics = e.dynamics,
                this.newSy(),
                !0
            }
            if ("cre" === t)
                return e.crescendo = V.Crescendo,
                this.newSy(),
                !0;
            if ("dec" === t)
                return e.crescendo = V.Decrescendo,
                this.newSy(),
                !0;
            if ("tp" === t) {
                this._sy = this.newSy();
                let t = d.Eighth;
                if (this._sy === Hr.Number) {
                    switch (this._syData) {
                    case 8:
                        t = d.Eighth;
                        break;
                    case 16:
                        t = d.Sixteenth;
                        break;
                    case 32:
                        t = d.ThirtySecond;
                        break;
                    default:
                        t = d.Eighth
                    }
                    this._sy = this.newSy()
                }
                return e.tremoloSpeed = t,
                !0
            }
            return !1
        }
        getChordId(e, t) {
            return t.toLowerCase() + e.index + e.track.index
        }
        applyTuplet(e, t) {
            switch (t) {
            case 3:
                e.tupletNumerator = 3,
                e.tupletDenominator = 2;
                break;
            case 5:
                e.tupletNumerator = 5,
                e.tupletDenominator = 4;
                break;
            case 6:
                e.tupletNumerator = 6,
                e.tupletDenominator = 4;
                break;
            case 7:
                e.tupletNumerator = 7,
                e.tupletDenominator = 4;
                break;
            case 9:
                e.tupletNumerator = 9,
                e.tupletDenominator = 8;
                break;
            case 10:
                e.tupletNumerator = 10,
                e.tupletDenominator = 8;
                break;
            case 11:
                e.tupletNumerator = 11,
                e.tupletDenominator = 8;
                break;
            case 12:
                e.tupletNumerator = 12,
                e.tupletDenominator = 8;
                break;
            default:
                e.tupletNumerator = 1,
                e.tupletDenominator = 1
            }
        }
        note(e) {
            let t = !1
              , s = !1
              , i = -1
              , n = -1
              , r = -1;
            switch (this._sy) {
            case Hr.Number:
                i = this._syData;
                break;
            case Hr.String:
                t = "x" === this._syData,
                s = "-" === this._syData,
                s || t ? i = 0 : this.error("note-fret", Hr.Number, !0);
                break;
            case Hr.Tuning:
                let e = this._syData;
                n = e.octave,
                r = e.noteValue;
                break;
            default:
                return !1
            }
            this._sy = this.newSy();
            let a = -1 === n && this._currentStaff.tuning.length > 0
              , o = -1;
            a && (this._sy !== Hr.Dot && this.error("note", Hr.Dot, !0),
            this._sy = this.newSy(),
            this._sy !== Hr.Number && this.error("note-string", Hr.Number, !0),
            o = this._syData,
            (o < 1 || o > this._currentStaff.tuning.length) && this.error("note-string", Hr.Number, !1),
            this._sy = this.newSy());
            let h = new dt;
            return a ? (h.string = this._currentStaff.tuning.length - (o - 1),
            h.isDead = t,
            h.isTieDestination = s,
            s || (h.fret = i)) : (h.octave = n,
            h.tone = r,
            h.isTieDestination = s),
            e.addNote(h),
            this.noteEffects(h),
            !0
        }
        noteEffects(e) {
            if (this._sy === Hr.LBrace) {
                for (this._sy = this.newSy(); this._sy === Hr.String; ) {
                    let t = this._syData.toLowerCase();
                    if (this._syData = t,
                    "b" === t || "be" === t) {
                        let t = "be" === this._syData;
                        for (this._sy = this.newSy(),
                        this._sy !== Hr.LParensis && this.error("bend-effect", Hr.LParensis, !0),
                        this._sy = this.newSy(); this._sy !== Hr.RParensis && this._sy !== Hr.Eof; ) {
                            let s = 0
                              , i = 0;
                            t ? (this._sy !== Hr.Number && this.error("bend-effect-value", Hr.Number, !0),
                            s = this._syData,
                            this._sy = this.newSy(),
                            this._sy !== Hr.Number && this.error("bend-effect-value", Hr.Number, !0),
                            i = this._syData) : (this._sy !== Hr.Number && this.error("bend-effect-value", Hr.Number, !0),
                            i = this._syData),
                            e.addBendPoint(new ye(s,i)),
                            this._sy = this.newSy()
                        }
                        for (; e.bendPoints.length > 60; )
                            e.bendPoints.splice(e.bendPoints.length - 1, 1);
                        if (t)
                            e.bendPoints.sort(( (e, t) => e.offset - t.offset));
                        else {
                            let t = e.bendPoints.length
                              , s = 60 / (t - 1) | 0
                              , i = 0;
                            for (; i < t; )
                                e.bendPoints[i].offset = Math.min(60, i * s),
                                i++
                        }
                        this._sy !== Hr.RParensis && this.error("bend-effect", Hr.RParensis, !0),
                        this._sy = this.newSy()
                    } else if ("nh" === t)
                        e.harmonicType = M.Natural,
                        this._sy = this.newSy();
                    else if ("ah" === t)
                        e.harmonicType = M.Artificial,
                        this._sy = this.newSy();
                    else if ("th" === t)
                        e.harmonicType = M.Tap,
                        this._sy = this.newSy();
                    else if ("ph" === t)
                        e.harmonicType = M.Pinch,
                        this._sy = this.newSy();
                    else if ("sh" === t)
                        e.harmonicType = M.Semi,
                        this._sy = this.newSy();
                    else if ("tr" === t) {
                        this._sy = this.newSy(),
                        this._sy !== Hr.Number && this.error("trill-effect", Hr.Number, !0);
                        let t = this._syData;
                        this._sy = this.newSy();
                        let s = d.Sixteenth;
                        if (this._sy === Hr.Number) {
                            switch (this._syData) {
                            case 16:
                                s = d.Sixteenth;
                                break;
                            case 32:
                                s = d.ThirtySecond;
                                break;
                            case 64:
                                s = d.SixtyFourth;
                                break;
                            default:
                                s = d.Sixteenth
                            }
                            this._sy = this.newSy()
                        }
                        e.trillValue = t + e.stringTuning,
                        e.trillSpeed = s
                    } else if ("v" === t)
                        this._sy = this.newSy(),
                        e.vibrato = b.Slight;
                    else if ("sl" === t)
                        this._sy = this.newSy(),
                        e.slideOutType = m.Legato;
                    else if ("ss" === t)
                        this._sy = this.newSy(),
                        e.slideOutType = m.Shift;
                    else if ("sib" === t)
                        this._sy = this.newSy(),
                        e.slideInType = f.IntoFromBelow;
                    else if ("sia" === t)
                        this._sy = this.newSy(),
                        e.slideInType = f.IntoFromAbove;
                    else if ("sou" === t)
                        this._sy = this.newSy(),
                        e.slideOutType = m.OutUp;
                    else if ("sod" === t)
                        this._sy = this.newSy(),
                        e.slideOutType = m.OutDown;
                    else if ("psd" === t)
                        this._sy = this.newSy(),
                        e.slideOutType = m.PickSlideDown;
                    else if ("psu" === t)
                        this._sy = this.newSy(),
                        e.slideOutType = m.PickSlideUp;
                    else if ("h" === t)
                        this._sy = this.newSy(),
                        e.isHammerPullOrigin = !0;
                    else if ("lht" === t)
                        this._sy = this.newSy(),
                        e.isLeftHandTapped = !0;
                    else if ("g" === t)
                        this._sy = this.newSy(),
                        e.isGhost = !0;
                    else if ("ac" === t)
                        this._sy = this.newSy(),
                        e.accentuated = a.Normal;
                    else if ("hac" === t)
                        this._sy = this.newSy(),
                        e.accentuated = a.Heavy;
                    else if ("pm" === t)
                        this._sy = this.newSy(),
                        e.isPalmMute = !0;
                    else if ("st" === t)
                        this._sy = this.newSy(),
                        e.isStaccato = !0;
                    else if ("lr" === t)
                        this._sy = this.newSy(),
                        e.isLetRing = !0;
                    else if ("x" === t)
                        this._sy = this.newSy(),
                        e.fret = 0,
                        e.isDead = !0;
                    else if ("-" === t || "t" === t)
                        this._sy = this.newSy(),
                        e.isTieDestination = !0;
                    else if ("lf" === t) {
                        this._sy = this.newSy();
                        let t = E.Thumb;
                        this._sy === Hr.Number && (t = this.toFinger(this._syData),
                        this._sy = this.newSy()),
                        e.leftHandFinger = t
                    } else if ("rf" === t) {
                        this._sy = this.newSy();
                        let t = E.Thumb;
                        this._sy === Hr.Number && (t = this.toFinger(this._syData),
                        this._sy = this.newSy()),
                        e.rightHandFinger = t
                    } else
                        this.applyBeatEffect(e.beat) || this.error(t, Hr.String, !1)
                }
                this._sy !== Hr.RBrace && this.error("note-effect", Hr.RBrace, !1),
                this._sy = this.newSy()
            }
        }
        toFinger(e) {
            switch (e) {
            case 1:
                return E.Thumb;
            case 2:
                return E.IndexFinger;
            case 3:
                return E.MiddleFinger;
            case 4:
                return E.AnnularFinger;
            case 5:
                return E.LittleFinger
            }
            return E.Thumb
        }
        parseDuration(e) {
            switch (e) {
            case -4:
                return d.QuadrupleWhole;
            case -2:
                return d.DoubleWhole;
            case 1:
                return d.Whole;
            case 2:
                return d.Half;
            case 4:
                return d.Quarter;
            case 8:
                return d.Eighth;
            case 16:
                return d.Sixteenth;
            case 32:
                return d.ThirtySecond;
            case 64:
                return d.SixtyFourth;
            case 128:
                return d.OneHundredTwentyEighth;
            default:
                return d.Quarter
            }
        }
        barMeta(e) {
            let t = !1
              , s = e.masterBar;
            for (; this._sy === Hr.MetaCommand; ) {
                t = !0;
                let i = this._syData.toLowerCase();
                if ("ts" === i)
                    this._sy = this.newSy(),
                    this._sy !== Hr.Number && this.error("timesignature-numerator", Hr.Number, !0),
                    s.timeSignatureNumerator = this._syData,
                    this._sy = this.newSy(),
                    this._sy !== Hr.Number && this.error("timesignature-denominator", Hr.Number, !0),
                    s.timeSignatureDenominator = this._syData,
                    this._sy = this.newSy();
                else if ("ro" === i)
                    s.isRepeatStart = !0,
                    this._sy = this.newSy();
                else if ("rc" === i)
                    this._sy = this.newSy(),
                    this._sy !== Hr.Number && this.error("repeatclose", Hr.Number, !0),
                    s.repeatCount = this._syData,
                    this._sy = this.newSy();
                else if ("ks" === i)
                    this._sy = this.newSy(),
                    this._sy !== Hr.String && this.error("keysignature", Hr.String, !0),
                    s.keySignature = this.parseKeySignature(this._syData.toLowerCase()),
                    this._sy = this.newSy();
                else if ("clef" === i) {
                    switch (this._sy = this.newSy(),
                    this._sy) {
                    case Hr.String:
                        e.clef = this.parseClefFromString(this._syData.toLowerCase());
                        break;
                    case Hr.Number:
                        e.clef = this.parseClefFromInt(this._syData);
                        break;
                    case Hr.Tuning:
                        let t = this._syData;
                        e.clef = this.parseClefFromInt(t.realValue);
                        break;
                    default:
                        this.error("clef", Hr.String, !0)
                    }
                    this._sy = this.newSy()
                } else if ("tempo" === i) {
                    this._sy = this.newSy(),
                    this._sy !== Hr.Number && this.error("tempo", Hr.Number, !0);
                    let e = new me;
                    e.isLinear = !1,
                    e.type = o.Tempo,
                    e.value = this._syData,
                    s.tempoAutomation = e,
                    this._sy = this.newSy()
                } else if ("section" === i) {
                    this._sy = this.newSy(),
                    this._sy !== Hr.String && this.error("section", Hr.String, !0);
                    let e = this._syData;
                    this._sy = this.newSy();
                    let t = "";
                    this._sy === Hr.String && (t = e,
                    e = this._syData,
                    this._sy = this.newSy());
                    let i = new Kt;
                    i.marker = t,
                    i.text = e,
                    s.section = i
                } else if ("tf" === i) {
                    switch (this._allowTuning = !1,
                    this._sy = this.newSy(),
                    this._allowTuning = !0,
                    this._sy) {
                    case Hr.String:
                        s.tripletFeel = this.parseTripletFeelFromString(this._syData.toLowerCase());
                        break;
                    case Hr.Number:
                        s.tripletFeel = this.parseTripletFeelFromInt(this._syData);
                        break;
                    default:
                        this.error("triplet-feel", Hr.String, !0)
                    }
                    this._sy = this.newSy()
                } else
                    "ac" === i ? (s.isAnacrusis = !0,
                    this._sy = this.newSy()) : 0 === e.index && this.handleStaffMeta() || this.error("measure-effects", Hr.String, !1)
            }
            if (0 === s.index && !s.tempoAutomation) {
                let e = new me;
                e.isLinear = !1,
                e.type = o.Tempo,
                e.value = this._score.tempo,
                s.tempoAutomation = e
            }
            return t
        }
    }
    ro.Eof = 0;
    class ao {
        constructor(e) {
            this._writePosition = 0,
            this._readPosition = 0,
            this.count = 0,
            this._buffer = new Float32Array(e)
        }
        clear() {
            this._readPosition = 0,
            this._writePosition = 0,
            this.count = 0,
            this._buffer = new Float32Array(this._buffer.length)
        }
        write(e, t, s) {
            let i = 0;
            s > this._buffer.length - this.count && (_e.error("CircularSampleBuffer", "circular buffer overflow"),
            s = this._buffer.length - this.count);
            const n = Math.min(this._buffer.length - this._writePosition, s);
            return this._buffer.set(e.subarray(t, t + n), this._writePosition),
            this._readPosition > this._writePosition && this._readPosition < this._writePosition + n && _e.error("CircularSampleBuffer", "override unread data"),
            this._writePosition += n,
            this._writePosition %= this._buffer.length,
            i += n,
            i < s && (this._buffer.set(e.subarray(t + i, t + i + s - i), this._writePosition),
            this._readPosition > this._writePosition && this._readPosition < this._writePosition + s - i && _e.error("CircularSampleBuffer", "override unread data"),
            this._writePosition += s - i,
            i = s),
            this.count += i,
            i
        }
        read(e, t, s) {
            s > this.count && (s = this.count);
            let i = 0;
            const n = Math.min(this._buffer.length - this._readPosition, s);
            return e.set(this._buffer.subarray(this._readPosition, this._readPosition + n), t),
            i += n,
            this._readPosition += n,
            this._readPosition %= this._buffer.length,
            i < s && (e.set(this._buffer.subarray(this._readPosition, this._readPosition + s - i), t + i),
            this._readPosition += s - i,
            i = s),
            this.count -= i,
            i
        }
    }
    class oo {
        constructor() {
            this._buffer = null,
            this._sampleBuffer = new Float32Array(2 * oo.BufferSize),
            this._source = null,
            this._audioNode = null,
            this._requestedBufferCount = 0,
            this._resetSamplesPending = !1,
            this.ready = new Ze,
            this.samplesPlayed = new et,
            this.sampleRequest = new Ze,
            this.patchIosSampleRate(),
            this._context = this.createAudioContext(),
            this._deviceSampleRate = this._context.sampleRate,
            this._deviceSampleRate < 3e4 && (this._context = this.createAudioContext({
                sampleRate: oo.PreferredSampleRate
            }))
        }
        get sampleRate() {
            return this._context.sampleRate
        }
        get oggSampleRate() {
            return window.decodeOggData ? this._deviceSampleRate : this.sampleRate
        }
        open() {
            this._circularBuffer = new ao(oo.BufferSize * oo.BufferCount);
            let e = this._context;
            if ("suspended" === e.state) {
                let t = () => {
                    e.resume(),
                    Ka.globalThis.setTimeout(( () => {
                        "running" === e.state && (document.body.removeEventListener("touchend", t, !1),
                        document.body.removeEventListener("click", t, !1))
                    }
                    ), 0)
                }
                ;
                document.body.addEventListener("touchend", t, !1),
                document.body.addEventListener("click", t, !1)
            }
            this.ready.trigger()
        }
        activate() {
            this._context.resume()
        }
        decodeAudioData(e) {
            return window.decodeOggData ? window.decodeOggData(e).then((e => e.getChannelData(0))) : new Promise(( (t, s) => {
                this._context.decodeAudioData(e, (e => {
                    t(e.getChannelData(0))
                }
                ), s)
            }
            ))
        }
        patchIosSampleRate() {
            let e = navigator.userAgent;
            if (e.indexOf("iPhone") >= 0 || e.indexOf("iPad") >= 0) {
                let e = this.createAudioContext()
                  , t = e.createBuffer(1, 1, oo.PreferredSampleRate)
                  , s = e.createBufferSource();
                s.buffer = t,
                s.connect(e.destination),
                s.start(0),
                s.disconnect(0),
                e.close && e.close()
            }
        }
        createAudioContext(e) {
            if ("AudioContext"in Ka.globalThis)
                return e ? new AudioContext(e) : new AudioContext;
            if ("webkitAudioContext"in Ka.globalThis)
                return e ? new webkitAudioContext(e) : new webkitAudioContext;
            throw new Pe(k.General,"AudioContext not found")
        }
        play() {
            let e = this._context;
            e && ("suspended" !== e.state && "interrupted" !== e.state || e.resume(),
            this._buffer = e.createBuffer(2, 4096, e.sampleRate),
            this._audioNode = e.createScriptProcessor(4096, 0, 2),
            this._audioNode.onaudioprocess = this.generateSound.bind(this),
            this._circularBuffer.clear(),
            this.requestBuffers(),
            this._source = e.createBufferSource(),
            this._source.buffer = this._buffer,
            this._source.loop = !0,
            this._source.connect(this._audioNode, 0, 0),
            this._source.start(0),
            this._audioNode.connect(e.destination, 0, 0))
        }
        pause() {
            this._source && (this._source.stop(0),
            this._source.disconnect(0)),
            this._source = null,
            this._audioNode && this._audioNode.disconnect(0),
            this._audioNode = null
        }
        destroy() {
            var e;
            this.pause(),
            null === (e = this._context) || void 0 === e || e.close()
        }
        addSamples(e) {
            this._resetSamplesPending && (this._circularBuffer.clear(),
            this._resetSamplesPending = !1),
            this._circularBuffer.write(e, 0, e.length),
            this._requestedBufferCount--
        }
        resetSamples() {
            this._resetSamplesPending = !0
        }
        requestBuffers() {
            const e = oo.BufferCount / 2 | 0;
            let t = e * oo.BufferSize;
            if ((this._resetSamplesPending ? 0 : this._circularBuffer.count) + this._requestedBufferCount * oo.BufferSize < t) {
                for (let t = 0; t < e; t++)
                    this.sampleRequest.trigger();
                this._requestedBufferCount += e
            }
        }
        generateSound(e) {
            let t = e.outputBuffer.getChannelData(0)
              , s = e.outputBuffer.getChannelData(1)
              , i = t.length + s.length;
            this._sampleBuffer.length !== i && (this._sampleBuffer = new Float32Array(i));
            let n = this._sampleBuffer.length;
            this._sampleBuffer.length > this._circularBuffer.count && (_e.error("CircularSampleBuffer", "buffered not enough"),
            n = this._circularBuffer.count),
            this._circularBuffer.read(this._sampleBuffer, 0, n);
            for (let e = 0; e < t.length; e++)
                t[e] = this._sampleBuffer[2 * e],
                s[e] = this._sampleBuffer[2 * e + 1];
            this.samplesPlayed.trigger(t.length),
            this.requestBuffers()
        }
    }
    oo.BufferSize = 4096,
    oo.BufferCount = 50,
    oo.PreferredSampleRate = 44100;
    class ho {
        constructor(e) {
            this.bounds = null,
            this.beat = e
        }
    }
    class lo {
        constructor(e) {
            this.mouseEvent = e
        }
        get isLeftMouseButton() {
            return 0 === this.mouseEvent.button
        }
        getX(e) {
            let t = e.element
              , s = t.getBoundingClientRect().left + t.ownerDocument.defaultView.pageXOffset;
            return this.mouseEvent.pageX - s
        }
        getY(e) {
            let t = e.element
              , s = t.getBoundingClientRect().top + t.ownerDocument.defaultView.pageYOffset;
            return this.mouseEvent.pageY - s
        }
        preventDefault() {
            this.mouseEvent.preventDefault()
        }
    }
    class co {
        constructor(e) {
            this._resizeListeners = 0,
            this.element = e,
            this.mouseDown = {
                on: e => {
                    this.element.addEventListener("mousedown", (t => {
                        e(new lo(t))
                    }
                    ), !0)
                }
                ,
                off: e => {}
            },
            this.mouseUp = {
                on: e => {
                    this.element.addEventListener("mouseup", (t => {
                        e(new lo(t))
                    }
                    ), !0)
                }
                ,
                off: e => {}
            },
            this.mouseMove = {
                on: e => {
                    this.element.addEventListener("mousemove", (t => {
                        e(new lo(t))
                    }
                    ), !0)
                }
                ,
                off: e => {}
            },
            this.resize = {
                on: e => {
                    0 === this._resizeListeners && co.resizeObserver.value.observe(this.element),
                    this.element.addEventListener("resize", e, !0),
                    this._resizeListeners++
                }
                ,
                off: e => {
                    this.element.removeEventListener("resize", e, !0),
                    this._resizeListeners--,
                    this._resizeListeners <= 0 && (this._resizeListeners = 0,
                    co.resizeObserver.value.unobserve(this.element))
                }
            }
        }
        get top() {
            return parseFloat(this.element.style.top)
        }
        set top(e) {
            this.element.style.top = e + "px"
        }
        get left() {
            return parseFloat(this.element.style.top)
        }
        set left(e) {
            this.element.style.left = e + "px"
        }
        get width() {
            return this.element.offsetWidth
        }
        set width(e) {
            this.element.style.width = e + "px"
        }
        get scrollLeft() {
            return this.element.scrollLeft
        }
        set scrollLeft(e) {
            this.element.scrollTop = e
        }
        get scrollTop() {
            return this.element.scrollLeft
        }
        set scrollTop(e) {
            this.element.scrollTop = e
        }
        get height() {
            return this.element.offsetHeight
        }
        set height(e) {
            this.element.style.height = e >= 0 ? e + "px" : "100%"
        }
        get isVisible() {
            return !!this.element.offsetWidth || !!this.element.offsetHeight || !!this.element.getClientRects().length
        }
        stopAnimation() {
            this.element.style.transition = "none"
        }
        transitionToX(e, t) {
            this.element.style.transition = "all 0s linear",
            this.element.style.transitionDuration = e + "ms",
            this.element.style.left = t + "px"
        }
        appendChild(e) {
            this.element.appendChild(e.element)
        }
        clear() {
            this.element.innerHTML = ""
        }
    }
    co.resizeObserver = new rt(( () => new ResizeObserver((e => {
        for (const t of e) {
            let e = new CustomEvent("resize",{
                detail: t
            });
            t.target.dispatchEvent(e)
        }
    }
    ))));
    class uo {
        constructor(e, t) {
            if (this._width = 0,
            this.boundsLookup = null,
            this.preRender = new et,
            this.partialRenderFinished = new et,
            this.renderFinished = new et,
            this.postRenderFinished = new Ze,
            this.error = new et,
            this._api = e,
            t.core.scriptFile) {
                try {
                    let e = `importScripts('${t.core.scriptFile}')`
                      , s = new Blob([e]);
                    this._worker = new Worker(URL.createObjectURL(s))
                } catch (e) {
                    try {
                        this._worker = new Worker(t.core.scriptFile)
                    } catch (t) {
                        return void _e.error("Rendering", "Failed to create WebWorker: " + e)
                    }
                }
                this._worker.postMessage({
                    cmd: "alphaTab.initialize",
                    settings: this.serializeSettingsForWorker(t)
                }),
                this._worker.addEventListener("message", this.handleWorkerMessage.bind(this))
            } else
                _e.error("Rendering", "Could not detect alphaTab script file, cannot initialize renderer")
        }
        destroy() {
            this._worker.terminate()
        }
        updateSettings(e) {
            this._worker.postMessage({
                cmd: "alphaTab.updateSettings",
                settings: this.serializeSettingsForWorker(e)
            })
        }
        serializeSettingsForWorker(e) {
            return Js.settingsToJsObject(e)
        }
        render() {
            this._worker.postMessage({
                cmd: "alphaTab.render"
            })
        }
        resizeRender() {
            this._worker.postMessage({
                cmd: "alphaTab.resizeRender"
            })
        }
        get width() {
            return this._width
        }
        set width(e) {
            this._width = e,
            this._worker.postMessage({
                cmd: "alphaTab.setWidth",
                width: e
            })
        }
        handleWorkerMessage(e) {
            let t = e.data;
            switch (t.cmd) {
            case "alphaTab.preRender":
                this.preRender.trigger(t.resize);
                break;
            case "alphaTab.partialRenderFinished":
                this.partialRenderFinished.trigger(t.result);
                break;
            case "alphaTab.renderFinished":
                this.renderFinished.trigger(t.result);
                break;
            case "alphaTab.postRenderFinished":
                this.boundsLookup = fs.fromJson(t.boundsLookup, this._api.score),
                this.postRenderFinished.trigger();
                break;
            case "alphaTab.error":
                this.error.trigger(t.error)
            }
        }
        renderScore(e, t) {
            let s = Js.scoreToJsObject(e);
            this._worker.postMessage({
                cmd: "alphaTab.renderScore",
                score: s,
                trackIndexes: t,
                fontSizes: si.FontSizeLookupTables
            })
        }
    }
    class po {
        constructor(e, t, s, i) {
            this.cursorWrapper = e,
            this.barCursor = t,
            this.beatCursor = s,
            this.selectionWrapper = i
        }
    }
    class go {
        constructor(e) {
            if (this._fontCheckers = new Map,
            this._contents = null,
            this._file = null,
            this._totalResultCount = 0,
            this._initialTrackIndexes = null,
            this.rootContainerBecameVisible = new Ze,
            this.canRenderChanged = new Ze,
            Ka.webPlatform !== ur.Browser)
                throw new Pe(k.General,"Usage of AlphaTabApi is only possible in browser environments. For usage in node use the Low Level APIs");
            e.classList.add("alphaTab"),
            this.rootContainer = new co(e),
            this.areWorkersSupported = "Worker"in window,
            Ka.bravuraFontChecker.fontLoaded.on(this.onFontLoaded.bind(this)),
            this._intersectionObserver = new IntersectionObserver(this.onElementVisibilityChanged.bind(this),{
                threshold: [0, .01, 1]
            }),
            this._intersectionObserver.observe(e)
        }
        get resizeThrottle() {
            return 100
        }
        get canRender() {
            return this.areAllFontsLoaded()
        }
        areAllFontsLoaded() {
            if (Ka.bravuraFontChecker.checkForFontAvailability(),
            !Ka.bravuraFontChecker.isFontLoaded)
                return !1;
            let e = !1;
            for (const t of this._fontCheckers.values())
                t.isFontLoaded || (e = !0);
            return !e && (_e.debug("Font", "All fonts loaded: " + this._fontCheckers.size),
            !0)
        }
        onFontLoaded(e) {
            si.generateFontLookup(e),
            this.areAllFontsLoaded() && this.canRenderChanged.trigger()
        }
        onElementVisibilityChanged(e) {
            for (const t of e)
                if (t.isIntersecting) {
                    const e = t.target;
                    e === this.rootContainer.element ? (this.rootContainerBecameVisible.trigger(),
                    this._intersectionObserver.unobserve(this.rootContainer.element)) : "svg"in e.dataset && (this.replacePlaceholder(e, e.dataset.svg),
                    this._intersectionObserver.unobserve(e))
                }
        }
        createWorkerRenderer() {
            return new uo(this._api,this._api.settings)
        }
        initialize(e, t) {
            let s;
            this._api = e,
            s = t instanceof Za ? t : Js.jsObjectToSettings(t);
            let i = this.getDataAttributes();
            Ys.fromJson(s, i),
            s.notation.notationMode === B.SongBook && s.setSongBookModeSettings(),
            e.settings = s,
            this.setupFontCheckers(s),
            this._initialTrackIndexes = this.parseTracks(s.core.tracks),
            this._contents = "";
            let n = e.container;
            s.core.tex && (this._contents = n.element.innerHTML,
            n.element.innerHTML = ""),
            this.createStyleElement(s),
            this._file = s.core.file
        }
        setupFontCheckers(e) {
            this.registerFontChecker(e.display.resources.copyrightFont),
            this.registerFontChecker(e.display.resources.effectFont),
            this.registerFontChecker(e.display.resources.fingeringFont),
            this.registerFontChecker(e.display.resources.graceFont),
            this.registerFontChecker(e.display.resources.markerFont),
            this.registerFontChecker(e.display.resources.tablatureFont),
            this.registerFontChecker(e.display.resources.titleFont),
            this.registerFontChecker(e.display.resources.wordsFont),
            this.registerFontChecker(e.display.resources.barNumberFont),
            this.registerFontChecker(e.display.resources.fretboardNumberFont),
            this.registerFontChecker(e.display.resources.subTitleFont)
        }
        registerFontChecker(e) {
            if (!this._fontCheckers.has(e.family)) {
                let t = new cr(e.family);
                this._fontCheckers.set(e.family, t),
                t.fontLoaded.on(this.onFontLoaded.bind(this)),
                t.checkForFontAvailability()
            }
        }
        destroy() {
            this.rootContainer.element.innerHTML = ""
        }
        createCanvasElement() {
            let e = document.createElement("div");
            return e.className = "at-surface",
            e.style.fontSize = "0",
            e.style.overflow = "hidden",
            e.style.lineHeight = "0",
            new co(e)
        }
        triggerEvent(e, t, s=null, i) {
            let n = e.element;
            t = "alphaTab." + t;
            let r = document.createEvent("CustomEvent")
              , a = i ? i.mouseEvent : null;
            if (r.initCustomEvent(t, !1, !1, s),
            a && (r.originalEvent = a),
            n.dispatchEvent(r),
            window && "jQuery"in window) {
                let e = window.jQuery
                  , i = [];
                i.push(s),
                a && i.push(a),
                e(n).trigger(t, i)
            }
        }
        load(e, t, s) {
            if (e instanceof _t)
                return t(e),
                !0;
            if (e instanceof ArrayBuffer) {
                let s = new Uint8Array(e);
                return t(It.loadScoreFromBytes(s, this._api.settings)),
                !0
            }
            return e instanceof Uint8Array ? (t(It.loadScoreFromBytes(e, this._api.settings)),
            !0) : "string" == typeof e && (It.loadScoreAsync(e, t, s, this._api.settings),
            !0)
        }
        loadSoundFont(e, t, s=!1) {
            return !!this._api.player && (e instanceof ArrayBuffer ? (this._api.player.loadSoundFont(new Uint8Array(e), t, s),
            !0) : e instanceof Uint8Array ? (this._api.player.loadSoundFont(e, t, s),
            !0) : "string" == typeof e && (this._api.loadSoundFontFromUrl(e, t),
            !0))
        }
        initialRender() {
            this._api.renderer.preRender.on((e => {
                this._totalResultCount = 0
            }
            ));
            const e = () => {
                var e;
                this._api.renderer.updateSettings(this._api.settings),
                this._contents ? (this._api.renderer.width = 0 | this.rootContainer.width,
                this._api.tex(this._contents, null !== (e = this._initialTrackIndexes) && void 0 !== e ? e : void 0),
                this._initialTrackIndexes = null) : this._file && (this._api.renderer.width = 0 | this.rootContainer.width,
                It.loadScoreAsync(this._file, (e => {
                    var t;
                    this._api.renderScore(e, null !== (t = this._initialTrackIndexes) && void 0 !== t ? t : void 0),
                    this._initialTrackIndexes = null
                }
                ), (e => {
                    this._api.onError(e)
                }
                ), this._api.settings))
            }
            ;
            this.rootContainer.isVisible ? e() : this.rootContainerBecameVisible.on(e)
        }
        createStyleElement(e) {
            let t = this._api.container.element.ownerDocument;
            Ka.createStyleElement(t, e.core.fontDirectory)
        }
        parseTracks(e) {
            if (!e)
                return [];
            let t = [];
            if ("string" == typeof e)
                try {
                    if ("all" === e)
                        return [-1];
                    e = JSON.parse(e)
                } catch (t) {
                    e = [0]
                }
            if ("number" == typeof e)
                t.push(e);
            else if ("length"in e) {
                let s = e.length
                  , i = e;
                for (let e = 0; e < s; e++) {
                    let s = i[e]
                      , n = 0;
                    n = "number" == typeof s ? s : "index"in s ? s.index : parseInt(s.toString()),
                    (n >= 0 || -1 === n) && t.push(n)
                }
            } else
                "index"in e && t.push(e.index);
            return t
        }
        getDataAttributes() {
            let e = new Map
              , t = this._api.container.element;
            if (t.dataset)
                for (let s of Object.keys(t.dataset)) {
                    let i = t.dataset[s];
                    try {
                        let e = i;
                        i = JSON.parse(e)
                    } catch (e) {
                        "" === i && (i = null)
                    }
                    e.set(s, i)
                }
            else
                for (let s = 0; s < t.attributes.length; s++) {
                    let i = t.attributes.item(s)
                      , n = i.nodeName;
                    if (n.startsWith("data-")) {
                        let t = n.substr(5).split("-")
                          , s = t[0];
                        for (let e = 1; e < t.length; e++)
                            s += t[e].substr(0, 1).toUpperCase() + t[e].substr(1);
                        let r = i.nodeValue;
                        try {
                            r = JSON.parse(r)
                        } catch (e) {
                            "" === r && (r = null)
                        }
                        e.set(s, r)
                    }
                }
            return e
        }
        beginAppendRenderResults(e) {
            let t = this._api.canvasElement.element;
            if (e) {
                let s = e.renderResult;
                if ("string" == typeof s) {
                    let i;
                    this._totalResultCount < t.childElementCount ? i = t.childNodes.item(this._totalResultCount) : (i = document.createElement("div"),
                    t.appendChild(i)),
                    i.style.width = e.width + "px",
                    i.style.height = e.height + "px",
                    i.style.display = "inline-block",
                    this._api.settings.core.enableLazyLoading ? (i.dataset.svg = s,
                    this._intersectionObserver.observe(i)) : this.replacePlaceholder(i, s)
                } else
                    this._totalResultCount < t.childElementCount ? t.replaceChild(e.renderResult, t.childNodes.item(this._totalResultCount)) : t.appendChild(e.renderResult);
                this._totalResultCount++
            } else
                for (; t.childElementCount > this._totalResultCount; )
                    t.removeChild(t.lastChild)
        }
        replacePlaceholder(e, t) {
            var s;
            if ("string" == typeof e.outerHTML)
                e.outerHTML = t;
            else {
                const i = document.createElement("div");
                i.innerHTML = t,
                null === (s = e.parentNode) || void 0 === s || s.replaceChild(i.firstChild, e)
            }
        }
        createWorkerPlayer() {
            let e = "ScriptProcessorNode"in window
              , t = Ka.scriptFile;
            if (!t)
                return _e.error("Player", "alphaTab script file could not be detected, player cannot initialize"),
                null;
            let s = null;
            return e && (_e.debug("Player", "Will use webworkers for synthesizing and web audio api for playback"),
            s = new bs(new oo,t,this._api.settings.core.logLevel)),
            s ? s.ready.on(( () => {
                this._api.settings.player.soundFont && this._api.loadSoundFontFromUrl(this._api.settings.player.soundFont, !1)
            }
            )) : _e.error("Player", "Player requires webworkers and web audio api, browser unsupported", null),
            s
        }
        beginInvoke(e) {
            window.requestAnimationFrame(( () => {
                e()
            }
            ))
        }
        highlightElements(e, t="at-highlight") {
            let s = this._api.container.element.getElementsByClassName(e);
            for (let e = 0; e < s.length; e++)
                s.item(e).classList.add(t)
        }
        removeHighlights(e="at-highlight") {
            let t = this._api.container.element.getElementsByClassName(e);
            for (; t.length > 0; )
                t.item(0).classList.remove(e)
        }
        destroyCursors() {
            let e = this._api.container.element
              , t = e.querySelector(".at-cursors");
            e.removeChild(t)
        }
        createCursors() {
            let e = this._api.container.element
              , t = document.createElement("div");
            t.classList.add("at-cursors");
            let s = document.createElement("div");
            s.classList.add("at-selection");
            let i = document.createElement("div");
            i.classList.add("at-cursor-bar");
            let n = document.createElement("div");
            return n.classList.add("at-cursor-beat"),
            e.style.position = "relative",
            e.style.textAlign = "left",
            t.style.position = "absolute",
            t.style.zIndex = "1000",
            t.style.display = "inline",
            t.style.pointerEvents = "none",
            s.style.position = "absolute",
            i.style.position = "absolute",
            n.style.position = "absolute",
            n.style.transition = "all 0s linear",
            e.insertBefore(t, e.firstChild),
            t.appendChild(s),
            t.appendChild(i),
            t.appendChild(n),
            new po(new co(t),new co(i),new co(n),new co(s))
        }
        getOffset(e, t) {
            let s = t.element
              , i = s.getBoundingClientRect()
              , n = i.top + s.ownerDocument.defaultView.pageYOffset
              , r = i.left + s.ownerDocument.defaultView.pageXOffset;
            if (e) {
                let t = e.element
                  , s = t.nodeName.toLowerCase();
                if ("html" !== s && "body" !== s) {
                    let s = this.getOffset(null, e);
                    n = n + t.scrollTop - s.y,
                    r = r + t.scrollLeft - s.x
                }
            }
            let a = new ss;
            return a.x = r,
            a.y = n,
            a.w = i.width,
            a.h = i.height,
            a
        }
        getScrollContainer() {
            let e = "string" == typeof this._api.settings.player.scrollElement ? document.querySelector(this._api.settings.player.scrollElement) : this._api.settings.player.scrollElement
              , t = e.nodeName.toLowerCase();
            if ("html" === t || "body" === t)
                if ("scrollingElement"in document)
                    e = document.scrollingElement;
                else {
                    e = -1 !== navigator.userAgent.indexOf("WebKit") ? document.body : document.documentElement
                }
            return new co(e)
        }
        createSelectionElement() {
            let e = document.createElement("div");
            return e.style.position = "absolute",
            new co(e)
        }
        scrollToY(e, t, s) {
            e.element.scrollTo({
                top: t,
                behavior: "smooth"
            })
        }
        scrollToX(e, t, s) {
            e.element.scrollTo({
                left: t,
                behavior: "smooth"
            })
        }
    }
    class fo extends class {
        constructor(e, t) {
            this._startTime = 0,
            this._trackIndexes = null,
            this._isDestroyed = !1,
            this.score = null,
            this.tracks = [],
            this._tickCache = null,
            this.player = null,
            this._cursorWrapper = null,
            this._barCursor = null,
            this._beatCursor = null,
            this._selectionWrapper = null,
            this._previousTick = 0,
            this._playerState = x.Paused,
            this._currentBeat = null,
            this._previousStateForCursor = x.Paused,
            this._previousCursorCache = null,
            this._lastScroll = 0,
            this.playedBeatChanged = new et,
            this._beatMouseDown = !1,
            this._selectionStart = null,
            this._selectionEnd = null,
            this.beatMouseDown = new et,
            this.beatMouseMove = new et,
            this.beatMouseUp = new et,
            this.scoreLoaded = new et,
            this.resize = new et,
            this.renderStarted = new et,
            this.renderFinished = new et,
            this.postRenderFinished = new Ze,
            this.error = new et,
            this.playerReady = new Ze,
            this.playerFinished = new Ze,
            this.soundFontLoaded = new Ze,
            this.midiLoad = new et,
            this.midiLoaded = new et,
            this.playerStateChanged = new et,
            this.playerPositionChanged = new et,
            this.midiEventsPlayed = new et,
            this.uiFacade = e,
            this.container = e.rootContainer,
            e.initialize(this, t),
            _e.logLevel = this.settings.core.logLevel,
            this.canvasElement = e.createCanvasElement(),
            this.container.appendChild(this.canvasElement),
            this.settings.core.useWorkers && this.uiFacade.areWorkersSupported && Ka.getRenderEngineFactory(this.settings).supportsWorkers ? this.renderer = this.uiFacade.createWorkerRenderer() : this.renderer = new ms(this.settings),
            this.container.resize.on(Ka.throttle(( () => {
                this._isDestroyed || this.container.width !== this.renderer.width && this.triggerResize()
            }
            ), e.resizeThrottle));
            let s = new Mt;
            s.oldWidth = this.renderer.width,
            s.newWidth = 0 | this.container.width,
            s.settings = this.settings,
            this.onResize(s),
            this.renderer.preRender.on(this.onRenderStarted.bind(this)),
            this.renderer.renderFinished.on((e => {
                this.onRenderFinished(e)
            }
            )),
            this.renderer.postRenderFinished.on(( () => {
                let e = Date.now() - this._startTime;
                _e.debug("rendering", "Rendering completed in " + e + "ms"),
                this.onPostRenderFinished()
            }
            )),
            this.renderer.preRender.on((e => {
                this._startTime = Date.now()
            }
            )),
            this.renderer.partialRenderFinished.on(this.appendRenderResult.bind(this)),
            this.renderer.renderFinished.on((e => {
                this.appendRenderResult(e),
                this.appendRenderResult(null)
            }
            )),
            this.renderer.error.on(this.onError.bind(this)),
            this.settings.player.enablePlayer && this.setupPlayer(),
            this.setupClickHandling(),
            this.uiFacade.beginInvoke(( () => {
                this.uiFacade.initialRender()
            }
            ))
        }
        destroy() {
            this._isDestroyed = !0,
            this.player && this.player.destroy(),
            this.uiFacade.destroy(),
            this.renderer.destroy()
        }
        updateSettings() {
            this.renderer.updateSettings(this.settings),
            this.settings.player.enablePlayer ? this.setupPlayer() : this.destroyPlayer()
        }
        load(e, t) {
            try {
                return this.uiFacade.load(e, (e => {
                    this.renderScore(e, t)
                }
                ), (e => {
                    this.onError(e)
                }
                ))
            } catch (e) {
                return this.onError(e),
                !1
            }
        }
        renderScore(e, t) {
            let s = [];
            if (t)
                if (0 === t.length)
                    e.tracks.length > 0 && s.push(e.tracks[0]);
                else if (1 === t.length && -1 === t[0])
                    for (let t of e.tracks)
                        s.push(t);
                else
                    for (let i of t)
                        i >= 0 && i <= e.tracks.length && s.push(e.tracks[i]);
            else
                e.tracks.length > 0 && s.push(e.tracks[0]);
            this.internalRenderTracks(e, s)
        }
        renderTracks(e) {
            if (e.length > 0) {
                let t = e[0].score;
                for (let s of e)
                    if (s.score !== t)
                        return void this.onError(new Pe(k.General,"All rendered tracks must belong to the same score."));
                this.internalRenderTracks(t, e)
            }
        }
        internalRenderTracks(e, t) {
            if (ht.applyPitchOffsets(this.settings, e),
            e !== this.score) {
                this.score = e,
                this.tracks = t,
                this._trackIndexes = [];
                for (let e of t)
                    this._trackIndexes.push(e.index);
                this.onScoreLoaded(e),
                this.loadMidiForScore(),
                this.render()
            } else {
                this.tracks = t,
                this._trackIndexes = [];
                for (let e of t)
                    this._trackIndexes.push(e.index);
                this.loadMidiForScore(),
                this.render()
            }
        }
        triggerResize() {
            if (this.container.isVisible) {
                let e = new Mt;
                e.oldWidth = this.renderer.width,
                e.newWidth = this.container.width,
                e.settings = this.settings,
                this.onResize(e),
                this.renderer.updateSettings(this.settings),
                this.renderer.width = this.container.width,
                this.renderer.resizeRender()
            } else
                _e.warning("Rendering", "AlphaTab container was invisible while autosizing, waiting for element to become visible", null),
                this.uiFacade.rootContainerBecameVisible.on(( () => {
                    _e.debug("Rendering", "AlphaTab container became visible, doing autosizing", null),
                    this.triggerResize()
                }
                ))
        }
        appendRenderResult(e) {
            e && (this.canvasElement.width = e.totalWidth,
            this.canvasElement.height = e.totalHeight,
            this._cursorWrapper && (this._cursorWrapper.width = e.totalWidth,
            this._cursorWrapper.height = e.totalHeight)),
            e && !e.renderResult || this.uiFacade.beginAppendRenderResults(e)
        }
        tex(e, t) {
            try {
                let s = new ro;
                s.initFromString(e, this.settings);
                let i = s.readScore();
                this.renderScore(i, t)
            } catch (e) {
                this.onError(e)
            }
        }
        loadSoundFont(e, t=!1, s=!1) {
            return !!this.player && this.uiFacade.loadSoundFont(e, t, s)
        }
        resetSoundFonts() {
            this.player && this.player.resetSoundFonts()
        }
        render() {
            this.renderer && (this.uiFacade.canRender ? (this.renderer.width = this.container.width,
            this.renderer.renderScore(this.score, this._trackIndexes)) : this.uiFacade.canRenderChanged.on(( () => this.render())))
        }
        getCurrentBeat() {
            return this._currentBeat
        }
        getMidiTickLookup() {
            return this._tickCache
        }
        get isReadyForPlayback() {
            return !!this.player && this.player.isReadyForPlayback
        }
        get playerState() {
            return this.player ? this.player.state : x.Paused
        }
        get masterVolume() {
            return this.player ? this.player.masterVolume : 0
        }
        set masterVolume(e) {
            this.player && (this.player.masterVolume = e)
        }
        get metronomeVolume() {
            return this.player ? this.player.metronomeVolume : 0
        }
        set metronomeVolume(e) {
            this.player && (this.player.metronomeVolume = e)
        }
        get countInVolume() {
            return this.player ? this.player.countInVolume : 0
        }
        set countInVolume(e) {
            this.player && (this.player.countInVolume = e)
        }
        get midiEventsPlayedFilter() {
            return this.player ? this.player.midiEventsPlayedFilter : []
        }
        set midiEventsPlayedFilter(e) {
            this.player && (this.player.midiEventsPlayedFilter = e)
        }
        get tickPosition() {
            return this.player ? this.player.tickPosition : 0
        }
        set tickPosition(e) {
            this.player && (this.player.tickPosition = e)
        }
        get timePosition() {
            return this.player ? this.player.timePosition : 0
        }
        set timePosition(e) {
            this.player && (this.player.timePosition = e)
        }
        get playbackRange() {
            return this.player ? this.player.playbackRange : null
        }
        set playbackRange(e) {
            this.player && (this.player.playbackRange = e,
            this.settings.player.enableCursor && this.updateSelectionCursor(e))
        }
        get playbackSpeed() {
            return this.player ? this.player.playbackSpeed : 0
        }
        set playbackSpeed(e) {
            this.player && (this.player.playbackSpeed = e)
        }
        get isLooping() {
            return !!this.player && this.player.isLooping
        }
        set isLooping(e) {
            this.player && (this.player.isLooping = e)
        }
        destroyPlayer() {
            this.player && (this.player.destroy(),
            this.player = null,
            this.destroyCursors())
        }
        setupPlayer() {
            this.player || (this.settings.core.useWorkers && this.uiFacade.areWorkersSupported && Ka.getRenderEngineFactory(this.settings).supportsWorkers ? this.player = this.uiFacade.createWorkerPlayer() : this.player = new st(new oo),
            this.player && (this.player.ready.on(( () => {
                this.loadMidiForScore()
            }
            )),
            this.player.readyForPlayback.on(( () => {
                if (this.onPlayerReady(),
                this.tracks)
                    for (let e of this.tracks) {
                        let t = e.playbackInfo.volume / 16;
                        this.player.setChannelVolume(e.playbackInfo.primaryChannel, t),
                        this.player.setChannelVolume(e.playbackInfo.secondaryChannel, t)
                    }
            }
            )),
            this.player.soundFontLoaded.on(this.onSoundFontLoaded.bind(this)),
            this.player.soundFontLoadFailed.on((e => {
                this.onError(e)
            }
            )),
            this.player.midiLoaded.on(this.onMidiLoaded.bind(this)),
            this.player.midiLoadFailed.on((e => {
                this.onError(e)
            }
            )),
            this.player.stateChanged.on(this.onPlayerStateChanged.bind(this)),
            this.player.positionChanged.on(this.onPlayerPositionChanged.bind(this)),
            this.player.midiEventsPlayed.on(this.onMidiEventsPlayed.bind(this)),
            this.player.finished.on(this.onPlayerFinished.bind(this)),
            this.settings.player.enableCursor ? this.setupCursors() : this.destroyCursors()))
        }
        loadMidiForScore() {
            if (!this.player || !this.score || !this.player.isReady)
                return;
            _e.debug("AlphaTab", "Generating Midi");
            let e = new ie
              , t = new ce(e)
              , s = new so(this.score,this.settings,t);
            s.generate(),
            this._tickCache = s.tickLookup,
            this.onMidiLoad(e),
            this.player.loadMidiFile(e)
        }
        changeTrackVolume(e, t, s) {
            if (this.player)
                for (let i of e)
                    s ? 1 === s ? this.player.setChannelVolume(i.playbackInfo.primaryChannel, t) : 2 === s && this.player.setChannelVolume(i.playbackInfo.secondaryChannel, t) : (this.player.setChannelVolume(i.playbackInfo.primaryChannel, t),
                    this.player.setChannelVolume(i.playbackInfo.secondaryChannel, t))
        }
        changeTrackSolo(e, t, s) {
            if (this.player)
                for (let i of e)
                    s ? 1 === s ? this.player.setChannelSolo(i.playbackInfo.primaryChannel, t) : 2 === s && this.player.setChannelSolo(i.playbackInfo.secondaryChannel, t) : (this.player.setChannelSolo(i.playbackInfo.primaryChannel, t),
                    this.player.setChannelSolo(i.playbackInfo.secondaryChannel, t))
        }
        changeTrackMute(e, t, s) {
            if (this.player)
                for (let i of e)
                    s ? 1 === s ? this.player.setChannelMute(i.playbackInfo.primaryChannel, t) : 2 === s && this.player.setChannelMute(i.playbackInfo.secondaryChannel, t) : (this.player.setChannelMute(i.playbackInfo.primaryChannel, t),
                    this.player.setChannelMute(i.playbackInfo.secondaryChannel, t))
        }
        play() {
            return !!this.player && this.player.play()
        }
        pause() {
            this.player && this.player.pause()
        }
        playPause() {
            this.player && this.player.playPause()
        }
        stop() {
            this.player && this.player.stop()
        }
        playBeat(e) {
            if (!this.player)
                return;
            let t = new ie
              , s = new ce(t);
            new so(e.voice.bar.staff.track.score,this.settings,s).generateSingleBeat(e),
            this.player.playOneTimeMidiFile(t)
        }
        playNote(e) {
            if (!this.player)
                return;
            let t = new ie
              , s = new ce(t);
            new so(e.beat.voice.bar.staff.track.score,this.settings,s).generateSingleNote(e),
            this.player.playOneTimeMidiFile(t)
        }
        destroyCursors() {
            this._cursorWrapper && (this.uiFacade.destroyCursors(),
            this._cursorWrapper = null,
            this._barCursor = null,
            this._beatCursor = null,
            this._selectionWrapper = null,
            this._previousTick = 0,
            this._playerState = x.Paused)
        }
        setupCursors() {
            let e = this.uiFacade.createCursors();
            e && (this._cursorWrapper = e.cursorWrapper,
            this._barCursor = e.barCursor,
            this._beatCursor = e.beatCursor,
            this._selectionWrapper = e.selectionWrapper,
            this._previousTick = 0,
            this._playerState = x.Paused,
            this.renderer.postRenderFinished.on(( () => {
                this.cursorUpdateTick(this._previousTick, !0)
            }
            )),
            this.player && (this.player.positionChanged.on((e => {
                this._previousTick = e.currentTick,
                this.uiFacade.beginInvoke(( () => {
                    this.cursorUpdateTick(e.currentTick, !1, e.isSeek)
                }
                ))
            }
            )),
            this.player.stateChanged.on((e => {
                this._playerState = e.state,
                e.stopped || e.state !== x.Paused || (this._currentBeat,
                this._tickCache)
            }
            ))))
        }
        cursorUpdateTick(e, t=!1, s=!1) {
            this.uiFacade.beginInvoke(( () => {
                let i = this._tickCache;
                if (i) {
                    let n = this.tracks;
                    if (n.length > 0) {
                        let r = i.findBeat(n, e);
                        r && this.cursorUpdateBeat(r.currentBeat, r.nextBeat, r.duration, t, r.beatsToHighlight, s)
                    }
                }
            }
            ))
        }
        cursorUpdateBeat(t, s, i, n, r=null, a=!1) {
            if (!t)
                return;
            let o = this.renderer.boundsLookup;
            if (!o)
                return;
            let h = this._currentBeat
              , l = this._previousCursorCache
              , c = this._previousStateForCursor;
            if (this._currentBeat = t,
            this._previousCursorCache = o,
            this._previousStateForCursor = this._playerState,
            t === h && o === l && c === this._playerState)
                return;
            let d = this._barCursor
              , u = this._beatCursor
              , p = o.findBeat(t);
            if (!p)
                return;
            let g = p.barBounds.masterBarBounds
              , f = g.realBounds;
            d && (d.top = f.y,
            d.left = f.x,
            d.width = f.w,
            d.height = f.h),
            u && (u.stopAnimation(),
            u.top = f.y,
            u.left = p.visualBounds.x,
            u.height = f.h),
            this.uiFacade.removeHighlights();
            const m = this._playerState === x.Playing;
            if (i /= this.playbackSpeed,
            r)
                for (let e of r) {
                    let t = Ri.getGroupId(e);
                    this.uiFacade.highlightElements(t)
                }
            let y = g.visualBounds.x + g.visualBounds.w;
            if (s && (s.voice.bar.index === t.voice.bar.index || s.voice.bar.index === t.voice.bar.index + 1)) {
                let e = o.findBeat(s);
                e && e.barBounds.masterBarBounds.staveGroupBounds === g.staveGroupBounds && (y = e.visualBounds.x)
            }
            if (m && u && this.uiFacade.beginInvoke(( () => {
                u.transitionToX(i, y)
            }
            )),
            !n && !this._beatMouseDown && this.settings.player.scrollMode !== e.ScrollMode.Off) {
                let s = this.uiFacade.getScrollContainer()
                  , i = Ka.getLayoutEngineFactory(this.settings).vertical
                  , n = this.settings.player.scrollMode
                  , r = this.uiFacade.getOffset(s, this.container);
                if (i)
                    switch (n) {
                    case e.ScrollMode.Continuous:
                        if (a || 0 === t.index) {
                            let e = r.y + g.realBounds.y + this.settings.player.scrollOffsetY;
                            this.uiFacade.scrollToY(s, e, this.settings.player.scrollSpeed)
                        }
                        break;
                    case e.ScrollMode.OffScreen:
                        let i = s.scrollTop + this.uiFacade.getOffset(null, s).h;
                        if (g.visualBounds.y + g.visualBounds.h >= i || g.visualBounds.y < s.scrollTop) {
                            let e = g.realBounds.y + this.settings.player.scrollOffsetY;
                            this._lastScroll = g.visualBounds.x,
                            this.uiFacade.scrollToY(s, e, this.settings.player.scrollSpeed)
                        }
                    }
                else
                    switch (n) {
                    case e.ScrollMode.Continuous:
                        if (g.visualBounds.x !== this._lastScroll) {
                            let e = g.realBounds.x + this.settings.player.scrollOffsetX;
                            this._lastScroll = g.visualBounds.x,
                            this.uiFacade.scrollToX(s, e, this.settings.player.scrollSpeed)
                        }
                        break;
                    case e.ScrollMode.OffScreen:
                        let t = s.scrollLeft + this.uiFacade.getOffset(null, s).w + this.settings.player.scrollOffsetX;
                        if (g.visualBounds.x + g.visualBounds.w >= t || g.visualBounds.x < s.scrollLeft) {
                            let e = g.realBounds.x + this.settings.player.scrollOffsetX;
                            this._lastScroll = g.visualBounds.x,
                            this.uiFacade.scrollToX(s, e, this.settings.player.scrollSpeed)
                        }
                    }
                m && this.onPlayedBeatChanged(t)
            }
        }
        onPlayedBeatChanged(e) {
            this._isDestroyed || (this.playedBeatChanged.trigger(e),
            this.uiFacade.triggerEvent(this.container, "playedBeatChanged", e))
        }
        onBeatMouseDown(e, t) {
            this._isDestroyed || (this.settings.player.enablePlayer && this.settings.player.enableCursor && this.settings.player.enableUserInteraction && (this._selectionStart = new ho(t),
            this._selectionEnd = null),
            this._beatMouseDown = !0,
            this.beatMouseDown.trigger(t),
            this.uiFacade.triggerEvent(this.container, "beatMouseDown", t, e))
        }
        onBeatMouseMove(e, t) {
            this._isDestroyed || (this.settings.player.enableUserInteraction && (this._selectionEnd && this._selectionEnd.beat === t || (this._selectionEnd = new ho(t),
            this.cursorSelectRange(this._selectionStart, this._selectionEnd))),
            this.beatMouseMove.trigger(t),
            this.uiFacade.triggerEvent(this.container, "beatMouseMove", t, e))
        }
        onBeatMouseUp(e, t) {
            this._isDestroyed || (this.settings.player.enableUserInteraction && this.updateSelection(),
            this.beatMouseUp.trigger(t),
            this.uiFacade.triggerEvent(this.container, "beatMouseUp", t, e),
            this._beatMouseDown = !1)
        }
        selectRange(e, t) {
            this._selectionStart = new ho(e),
            this._selectionEnd = new ho(t),
            this.updateSelection()
        }
        updateSelection() {
            if (this._selectionEnd) {
                let e = this._selectionStart.beat.absolutePlaybackStart;
                if (this._selectionEnd.beat.absolutePlaybackStart < e) {
                    let e = this._selectionStart;
                    this._selectionStart = this._selectionEnd,
                    this._selectionEnd = e
                }
            }
            if (this._selectionStart && this._tickCache) {
                let e = this._tickCache
                  , t = e.getMasterBarStart(this._selectionStart.beat.voice.bar.masterBar);
                if (this.tickPosition = t + this._selectionStart.beat.playbackStart,
                this._selectionEnd && this._selectionStart.beat !== this._selectionEnd.beat) {
                    let s = e.getMasterBarStart(this._selectionEnd.beat.voice.bar.masterBar)
                      , i = new ys;
                    i.startTick = t + this._selectionStart.beat.playbackStart,
                    i.endTick = s + this._selectionEnd.beat.playbackStart + this._selectionEnd.beat.playbackDuration - 50,
                    this.playbackRange = i
                } else
                    this._selectionStart = null,
                    this.playbackRange = null,
                    this.cursorSelectRange(this._selectionStart, this._selectionEnd)
            }
        }
        updateSelectionCursor(e) {
            if (this._tickCache)
                if (e) {
                    const t = this._tickCache.findBeat(this.tracks, e.startTick)
                      , s = this._tickCache.findBeat(this.tracks, e.endTick);
                    if (t && s) {
                        const e = new ho(t.currentBeat)
                          , i = new ho(s.currentBeat);
                        this.cursorSelectRange(e, i)
                    }
                } else
                    this.cursorSelectRange(null, null)
        }
        setupClickHandling() {
            this.canvasElement.mouseDown.on((e => {
                var t, s;
                if (!e.isLeftMouseButton)
                    return;
                this.settings.player.enableUserInteraction && e.preventDefault();
                let i = e.getX(this.canvasElement)
                  , n = e.getY(this.canvasElement)
                  , r = null !== (s = null === (t = this.renderer.boundsLookup) || void 0 === t ? void 0 : t.getBeatAtPos(i, n)) && void 0 !== s ? s : null;
                r && this.onBeatMouseDown(e, r)
            }
            )),
            this.canvasElement.mouseMove.on((e => {
                var t, s;
                if (!this._beatMouseDown)
                    return;
                let i = e.getX(this.canvasElement)
                  , n = e.getY(this.canvasElement)
                  , r = null !== (s = null === (t = this.renderer.boundsLookup) || void 0 === t ? void 0 : t.getBeatAtPos(i, n)) && void 0 !== s ? s : null;
                r && this.onBeatMouseMove(e, r)
            }
            )),
            this.canvasElement.mouseUp.on((e => {
                var t, s;
                if (!this._beatMouseDown)
                    return;
                this.settings.player.enableUserInteraction && e.preventDefault();
                let i = e.getX(this.canvasElement)
                  , n = e.getY(this.canvasElement)
                  , r = null !== (s = null === (t = this.renderer.boundsLookup) || void 0 === t ? void 0 : t.getBeatAtPos(i, n)) && void 0 !== s ? s : null;
                this.onBeatMouseUp(e, r)
            }
            )),
            this.renderer.postRenderFinished.on(( () => {
                this._selectionStart && this.settings.player.enablePlayer && this.settings.player.enableCursor && this.settings.player.enableUserInteraction && this.cursorSelectRange(this._selectionStart, this._selectionEnd)
            }
            ))
        }
        cursorSelectRange(e, t) {
            let s = this.renderer.boundsLookup;
            if (!s)
                return;
            let i = this._selectionWrapper;
            if (!i)
                return;
            if (i.clear(),
            !e || !t || e.beat === t.beat)
                return;
            e.bounds || (e.bounds = s.findBeat(e.beat)),
            t.bounds || (t.bounds = s.findBeat(t.beat));
            let n = e.beat.absolutePlaybackStart;
            if (t.beat.absolutePlaybackStart < n) {
                let s = e;
                e = t,
                t = s
            }
            let r = e.bounds.realBounds.x
              , a = t.bounds.realBounds.x + t.bounds.realBounds.w;
            if (t.beat.index === t.beat.voice.beats.length - 1 && (a = t.bounds.barBounds.masterBarBounds.realBounds.x + t.bounds.barBounds.masterBarBounds.realBounds.w),
            e.bounds.barBounds.masterBarBounds.staveGroupBounds !== t.bounds.barBounds.masterBarBounds.staveGroupBounds) {
                let n = e.bounds.barBounds.masterBarBounds.staveGroupBounds.visualBounds.x
                  , o = e.bounds.barBounds.masterBarBounds.staveGroupBounds.visualBounds.x + e.bounds.barBounds.masterBarBounds.staveGroupBounds.visualBounds.w
                  , h = this.uiFacade.createSelectionElement();
                h.top = e.bounds.barBounds.masterBarBounds.realBounds.y,
                h.left = r,
                h.width = o - r,
                h.height = e.bounds.barBounds.masterBarBounds.realBounds.h,
                i.appendChild(h);
                let l = e.bounds.barBounds.masterBarBounds.staveGroupBounds.index + 1
                  , c = t.bounds.barBounds.masterBarBounds.staveGroupBounds.index;
                for (let e = l; e < c; e++) {
                    let t = s.staveGroups[e]
                      , r = this.uiFacade.createSelectionElement();
                    r.top = t.visualBounds.y,
                    r.left = n,
                    r.width = o - n,
                    r.height = t.visualBounds.h,
                    i.appendChild(r)
                }
                let d = this.uiFacade.createSelectionElement();
                d.top = t.bounds.barBounds.masterBarBounds.realBounds.y,
                d.left = n,
                d.width = a - n,
                d.height = t.bounds.barBounds.masterBarBounds.realBounds.h,
                i.appendChild(d)
            } else {
                let t = this.uiFacade.createSelectionElement();
                t.top = e.bounds.barBounds.masterBarBounds.realBounds.y,
                t.left = r,
                t.width = a - r,
                t.height = e.bounds.barBounds.masterBarBounds.realBounds.h,
                i.appendChild(t)
            }
        }
        onScoreLoaded(e) {
            this._isDestroyed || (this.scoreLoaded.trigger(e),
            this.uiFacade.triggerEvent(this.container, "scoreLoaded", e))
        }
        onResize(e) {
            this._isDestroyed || (this.resize.trigger(e),
            this.uiFacade.triggerEvent(this.container, "resize", e))
        }
        onRenderStarted(e) {
            this._isDestroyed || (this.renderStarted.trigger(e),
            this.uiFacade.triggerEvent(this.container, "renderStarted", e))
        }
        onRenderFinished(e) {
            this._isDestroyed || (this.renderFinished.trigger(e),
            this.uiFacade.triggerEvent(this.container, "renderFinished", e))
        }
        onPostRenderFinished() {
            this._isDestroyed || (this.postRenderFinished.trigger(),
            this.uiFacade.triggerEvent(this.container, "postRenderFinished", null))
        }
        onError(e) {
            this._isDestroyed || (_e.error("API", "An unexpected error occurred", e),
            this.error.trigger(e),
            this.uiFacade.triggerEvent(this.container, "error", e))
        }
        onPlayerReady() {
            this._isDestroyed || (this.playerReady.trigger(),
            this.uiFacade.triggerEvent(this.container, "playerReady", null))
        }
        onPlayerFinished() {
            this._isDestroyed || (this.playerFinished.trigger(),
            this.uiFacade.triggerEvent(this.container, "playerFinished", null))
        }
        onSoundFontLoaded() {
            this._isDestroyed || (this.soundFontLoaded.trigger(),
            this.uiFacade.triggerEvent(this.container, "soundFontLoaded", null))
        }
        onMidiLoad(e) {
            this._isDestroyed || (this.midiLoad.trigger(e),
            this.uiFacade.triggerEvent(this.container, "midiLoad", e))
        }
        onMidiLoaded(e) {
            this._isDestroyed || (this.midiLoaded.trigger(e),
            this.uiFacade.triggerEvent(this.container, "midiFileLoaded", e))
        }
        onPlayerStateChanged(e) {
            this._isDestroyed || (this.playerStateChanged.trigger(e),
            this.uiFacade.triggerEvent(this.container, "playerStateChanged", e))
        }
        onPlayerPositionChanged(e) {
            this._isDestroyed || (this.playerPositionChanged.trigger(e),
            this.uiFacade.triggerEvent(this.container, "playerPositionChanged", e))
        }
        onMidiEventsPlayed(e) {
            this._isDestroyed || (this.midiEventsPlayed.trigger(e),
            this.uiFacade.triggerEvent(this.container, "midiEventsPlayed", e))
        }
    }
    {
        constructor(e, t) {
            super(new go(e), t),
            this.soundFontLoad = new et
        }
        tex(e, t) {
            let s = this.uiFacade;
            super.tex(e, s.parseTracks(t))
        }
        print(t, s=null) {
            let i = window.open("", "", "width=0,height=0")
              , n = i.document.createElement("div");
            t ? n.style.width = t : this.settings.display.layoutMode === e.LayoutMode.Horizontal ? n.style.width = "297mm" : n.style.width = "210mm",
            i.document.write("<!DOCTYPE html><html></head><body></body></html>"),
            i.document.body.appendChild(n);
            let r = void 0 !== window.screenLeft ? window.screenLeft : window.left
              , a = void 0 !== window.screenTop ? window.screenTop : window.top
              , o = "innerWidth"in window ? window.innerWidth : "clientWidth"in document.documentElement ? document.documentElement.clientWidth : window.screen.width
              , h = "innerHeight"in window ? window.innerHeight : "clientHeight"in document.documentElement ? document.documentElement.clientHeight : window.screen.height
              , l = n.offsetWidth + 50
              , c = window.innerHeight
              , d = (o / 2 | 0) - (l / 2 | 0) + r
              , u = (h / 2 | 0) - (c / 2 | 0) + a;
            i.resizeTo(l, c),
            i.moveTo(d, u),
            i.focus();
            let p = Js.jsObjectToSettings(Js.settingsToJsObject(this.settings));
            p.core.enableLazyLoading = !1,
            p.core.useWorkers = !1,
            p.display.scale = .8,
            p.display.stretchForce = .8,
            Ys.fromJson(p, s);
            let g = new fo(n,p);
            g.renderer.postRenderFinished.on(( () => {
                g.canvasElement.height = -1,
                i.print()
            }
            )),
            g.renderTracks(this.tracks)
        }
        downloadMidi() {
            if (!this.score)
                return;
            let e = new ie
              , t = new ce(e);
            new so(this.score,this.settings,t).generate();
            let s = e.toBinary()
              , i = this.score.title ? this.score.title + ".mid" : "File.mid"
              , n = document.createElement("a");
            n.download = i;
            let r = new Blob([s],{
                type: "audio/midi"
            })
              , a = URL.createObjectURL(r);
            n.href = a,
            n.style.display = "none",
            document.body.appendChild(n),
            n.click(),
            document.body.removeChild(n)
        }
        changeTrackMute(e, t, s) {
            let i = this.trackIndexesToTracks(this.uiFacade.parseTracks(e));
            super.changeTrackMute(i, t, s)
        }
        changeTrackSolo(e, t, s) {
            let i = this.trackIndexesToTracks(this.uiFacade.parseTracks(e));
            super.changeTrackSolo(i, t, s)
        }
        changeTrackVolume(e, t, s) {
            let i = this.trackIndexesToTracks(this.uiFacade.parseTracks(e));
            super.changeTrackVolume(i, t, s)
        }
        trackIndexesToTracks(e) {
            if (!this.score)
                return [];
            let t = [];
            if (1 === e.length && -1 === e[0])
                for (let e of this.score.tracks)
                    t.push(e);
            else
                for (let s of e)
                    s >= 0 && s < this.score.tracks.length && t.push(this.score.tracks[s]);
            return t
        }
        loadSoundFontFromUrl(e, t) {
            this.player && this.player.loadSoundFontFromUrl(e, t, (e => {
                this.soundFontLoad.trigger(e),
                this.uiFacade.triggerEvent(this.container, "soundFontLoad", e)
            }
            ))
        }
    }
    !function(e) {
        e.OutChord = "at-out-chord-note",
        e.WrongBass = "at-wrong-bass-note",
        e.MultiVoice = "at-multi-voice-note",
        e.TooManyLedgerLines = "at-too-many-ledger-lines-note",
        e.SingleBeatTooManyNotesNote = "at-single-beat-too-many-notes-note",
        e.SingleBeatOverOctaveNote = "at-single-beat-over-octave-note"
    }(Vr || (Vr = {}));
    const mo = ["1", "#1", "2", "b3", "3", "4", "b5", "5", "#5", "6", "b7", "7"]
      , yo = new Map([["1", ["1", "3", "5"]], ["1m", ["1", "b3", "5"]], ["1dim", ["1", "b3", "b5"]], ["1aug", ["1", "3", "#5"]], ["1maj7", ["1", "3", "(5)", "7"]], ["1m7", ["1", "b3", "(5)", "b7"]], ["17", ["1", "3", "(5)", "b7"]], ["1dim7", ["1", "b3", "b5", "6"]], ["1mM7", ["1", "b3", "(5)", "7"]], ["1aug7", ["1", "3", "#5", "b7"]], ["1m7b5", ["1", "b3", "b5", "b7"]], ["1sus2", ["1", "2", "5"]], ["1sus4", ["1", "4", "5"]], ["17sus2", ["1", "2", "(5)", "b7"]], ["17sus4", ["1", "4", "(5)", "b7"]], ["16", ["1", "3", "(5)", "6"]], ["1m6", ["1", "b3", "(5)", "6"]], ["1maj9", ["1", "3", "(5)", "7", "2"]], ["1m9", ["1", "b3", "(5)", "b7", "2"]], ["19", ["1", "3", "(5)", "b7", "2"]], ["1add9", ["1", "3", "(5)", "2"]], ["1madd9", ["1", "b3", "(5)", "2"]], ["15", ["1", "5"]]]);
    class bo {
        constructor(e) {
            this.chordType = "",
            this.bass = "C",
            this.chordIntervals = [],
            this._tonicValue = 0,
            this._allowedChordIntervals = new Set,
            this._mandatoryChordIntervals = new Set,
            this.name = e;
            const t = tn(qi(e).replace(/@.*$/, ""));
            if (!t)
                return;
            const {tonic: s, chordType: i, bass: n} = t;
            if (this.chordType = i,
            this.bass = n || s,
            this.chordIntervals = yo.get("1" + i) || [],
            this._allowedChordIntervals = new Set(this.chordIntervals.map((e => e.startsWith("(") ? e.substring(1, e.length - 1) : e))),
            this._mandatoryChordIntervals = new Set(this.chordIntervals.filter((e => !e.startsWith("(")))),
            this._tonicValue = Ji.get(s),
            Ji.has(n)) {
                const e = this.toRelativeInterval(Ji.get(n));
                this._allowedChordIntervals.add(e)
            }
        }
        static get(e) {
            if (bo.instances.has(e))
                return bo.instances.get(e);
            const t = new bo(e);
            return bo.instances.set(e, t),
            t
        }
        isUnknown() {
            return 0 === this.chordIntervals.length
        }
        isValueInChord(e) {
            return !this.findOutChordValues([e]).length
        }
        findOutChordValues(e) {
            return e.filter((e => !this._allowedChordIntervals.has(this.toRelativeInterval(e))))
        }
        isValueInChordLoose(e) {
            return !this.findOutChordValuesLoose([e]).length
        }
        findOutChordValuesLoose(e) {
            return e.filter((e => {
                const t = this.toRelativeInterval(e);
                return !(!["", "m"].includes(this.chordType) && ["2", "4", "6"].includes(t)) && !this._allowedChordIntervals.has(t)
            }
            ))
        }
        isChordFulfilled(e) {
            const t = new Set(this.toIntervals(e));
            return [...this._mandatoryChordIntervals.values()].every((e => t.has(e)))
        }
        toUniqIntervals(e) {
            return [...new Set(e.map((e => this.toRelativeInterval(e)))).values()].sort(( (e, t) => So(e).localeCompare(So(t))))
        }
        toRelativeInterval(e) {
            return mo[Yi(e - this._tonicValue)]
        }
        toIntervals(e) {
            return e.map((e => this.toRelativeInterval(e))).sort(( (e, t) => So(e).localeCompare(So(t))))
        }
    }
    function So(e) {
        return e.replace(/([b#])([1-7])/, "$2$1")
    }
    bo.instances = new Map;
    class wo {
        constructor(e, t=null, s=!1, i) {
            this.ids = new Map,
            this.masterBars = [],
            this.message = e,
            this.docUrl = t,
            this.isWarning = s,
            this.errorNoteIdentifier = i
        }
        addBar(e, t) {
            this.addMasterBar(e.masterBar, t)
        }
        addMasterBar(e, t) {
            this.ids.has(e.index) || (this.ids.set(e.index, t || ""),
            this.masterBars.push(e))
        }
        getMasterBars() {
            return this.masterBars.map((e => ({
                masterBar: e,
                message: this.ids.get(e.index)
            })))
        }
        hasMasterBars() {
            return this.masterBars.length > 0
        }
    }
    jt.getDefaultTuningFor(6).tunings;
    const _o = /^[A-G][#b]?(m|aug|dim|7|maj7|m7|mM7|aug7|dim7|m7b5|5|6|m6|69|m69|m9|maj9|9|m11|11|13)?(sus2|sus4|add9|add11|add13)*(\((no3|no5|no7|no9|#3|#5|#7|#9|#11|#13|b3|b5|b7|b9|b11|b13)\))*(\/[A-G][b#]?)?(@.*)?$/;
    function Bo(e, t) {
        const s = t.tunings;
        if (s.length !== e.strings.length)
            return e.name + "和弦定义与乐器不匹配";
        let i = qi(e.name);
        if (!_o.test(i))
            return e.name + "和弦名不规范";
        if (i = i.replace(/@.*$/, ""),
        s.length < 6)
            return null;
        const n = [];
        for (let t = 0; t < e.strings.length; ++t) {
            const {fret: i} = e.strings[t];
            i >= 0 && n.push(s[t] + i)
        }
        const r = function(e, t) {
            const s = bo.get(e);
            if (!s || s.isUnknown())
                return null;
            const i = s.findOutChordValues(t).map((e => Xi[Yi(e)]));
            if (i.length > 0)
                return `${e}有和弦外音${i.join(",")}`;
            return null
        }(i, n);
        if (r)
            return r;
        const a = function(e, t) {
            const s = bo.get(e);
            if (!s || s.isUnknown())
                return null;
            if (!s.isChordFulfilled(t))
                return `${e} 所需音${s.chordIntervals.join(",")} 实际音${s.toUniqIntervals(t).join(",")}`;
            return null
        }(i, n);
        if (a)
            return a;
        const o = function(e, t) {
            const s = bo.get(e);
            if (!s || s.isUnknown())
                return null;
            const i = Yi(Math.min(...t));
            if (Ji.get(s.bass) !== i)
                return `${e}和弦低音应为${s.bass},实为${Xi[i] || "空"}`;
            return null
        }(i, n);
        if (o)
            return o;
        const h = function(e) {
            const t = Math.max(...e.strings.map(( ({fret: e}) => e)))
              , s = Math.min(...e.strings.map(( ({fret: e}) => e)).filter((e => e > 0)));
            if (t - s > 3)
                return e.name + "指法跨度不得超过4品" + JSON.stringify(e.strings) + e.firstFret;
            const i = new Map;
            for (let t = 0; t < e.strings.length; ++t) {
                const {fret: s, finger: n} = e.strings[t];
                if (s > 0) {
                    if (n === E.Unknown || n === E.NoOrDead)
                        return `${e.name} ${t + 1}弦${s}品未编配指法`;
                    const r = i.get(n);
                    if (void 0 === r)
                        i.set(n, s);
                    else if (r !== s)
                        return `${e.name} ${n}指无法同时按${s},${r}品`
                } else if (n !== E.NoOrDead)
                    return `${e.name}空弦不该分配手指 ${n}`
            }
            const n = i.get(E.IndexFinger)
              , r = i.get(E.MiddleFinger)
              , a = i.get(E.AnnularFinger)
              , o = i.get(E.LittleFinger);
            if (n && r) {
                const t = r - n;
                if (t < 0 || t > 2)
                    return `${e.name} 1指按${n}品的同时2指无法按${r}品`
            }
            if (n && a) {
                const t = a - n;
                if (t < 0 || t > 3)
                    return `${e.name} 1指按${n}品的同时3指无法按${a}品`
            }
            if (n && o) {
                const t = o - n;
                if (t < 0 || t > 4)
                    return `${e.name} 1指按${n}品的同时4指无法按${o}品`
            }
            if (r && a) {
                const t = a - r;
                if (t < 0 || t > 1)
                    return `${e.name} 2指按${r}品的同时3指无法按${a}品`
            }
            if (r && o) {
                const t = o - r;
                if (t < 0 || t > 2)
                    return `${e.name} 2指按${r}品的同时4指无法按${o}品`
            }
            if (a && o) {
                const t = o - a;
                if (t < 0 || t > 1)
                    return `${e.name} 3指按${a}品的同时4指无法按${o}品`
            }
            for (const t of e.barreFrets) {
                const s = new Map;
                for (let i = 0; i < e.strings.length; ++i) {
                    const {fret: n, finger: r} = e.strings[i];
                    if (n === t) {
                        let e = s.get(r);
                        e || (e = {
                            min: 20,
                            max: -1
                        },
                        s.set(r, e)),
                        i > e.max && (e.max = i),
                        i < e.min && (e.min = i)
                    }
                }
                for (const {min: i, max: n} of s.values())
                    for (let s = i + 1; s < n; ++s) {
                        const {fret: i} = e.strings[s];
                        if (i >= 0 && i < t)
                            return `${e.name} ${t}品横按覆盖了${s + 1}弦指法`
                    }
            }
            return null
        }(e);
        return h || null
    }
    class To {
        constructor(e) {
            this.score = e
        }
        validate() {
            const e = [];
            e.push(this.findIncompleteBars()),
            e.push(this.findBarsNeedsAnacrusis()),
            e.push(this.findBarsWithWrongChordDefinition()),
            e.push(this.findOutChordNoteBars()),
            e.push(this.findBarsWithMultipleVoices()),
            e.push(this.findNumberedNotationBarsWithManySharps()),
            e.push(this.findNumberedNotationBarsWithOnlyRests()),
            e.push(this.findNumberedNotationBarsOfDumbBeatsWithLyrics()),
            e.push(this.findNumberedNotationBarsLyricsOnGraceNote()),
            e.push(this.findNumberedNotationBarsOfDumbBeatsWithNonDumbRests()),
            e.push(this.findNumberedNotationBarsWithMisalignedLyrics()),
            e.push(this.findNumberedNotationBarsWithWrongGraceNote()),
            e.push(this.findNumberedNotationBarsWithUnsupportedEffects()),
            e.push(this.findNumberedNotationBarsWithLegatoOnSamePitch()),
            e.push(this.findNumberedNotationBarsWithMultiNotesPerBeat());
            const t = function(e) {
                for (const t of e.tracks)
                    for (const e of t.staves)
                        if (e.showStandardNotation && !e.showNumberedNotation && !e.showTablature)
                            return !0;
                return !1
            }(this.score);
            return (t || 1 === this.score.tracks.length) && e.push(this.findBarsWithRepeatStart()),
            t && (e.push(...this.findPianoBarsWithTaggedNotes()),
            e.push(this.findPianoBarsWithNoChords()),
            e.push(...this.findPianoBarsWithOutChordNotes()),
            e.push(this.findPianoBarsWithWrongBassNote()),
            e.push(this.findPianoBarsWithTooLongContinuousOttavia())),
            e
        }
        findIncompleteBars() {
            const e = new wo("拍数错误","https://youpu.feishu.cn/docx/HQaQdCPpYoi0AfxqKtwc7csmn0w#CvE2dQxUlo2LlgxZ0Fqcn1u5nTf");
            for (const t of this.score.tracks)
                for (const s of t.staves)
                    for (const t of s.bars) {
                        if (0 === t.calculateDuration())
                            continue;
                        let s = 0
                          , i = 0;
                        if (t.index > 0)
                            for (const e of t.voices) {
                                if (0 === e.beats.length)
                                    continue;
                                let t = 0;
                                for (let s = 0; e.beats[s] && e.beats[s].graceType === p.BeforeBeat; ++s)
                                    t += e.beats[s].playbackDuration;
                                s = Math.max(s, t)
                            }
                        for (const e of t.nextBar ? t.nextBar.voices : []) {
                            if (0 === e.beats.length)
                                continue;
                            let t = 0;
                            for (let s = 0; e.beats[s] && e.beats[s].graceType === p.BeforeBeat; ++s)
                                t += e.beats[s].playbackDuration;
                            e.beats[0].graceType === p.BeforeBeat && (i = Math.max(i, t))
                        }
                        const n = t.calculateDuration() - s + i - t.masterBar.calculateDuration();
                        let r = 0;
                        if (vo(t) && (r = 10),
                        n > r)
                            e.addBar(t);
                        else if (n < -r) {
                            const s = t.masterBar;
                            s.isAnacrusis || !s.nextMasterBar || s.isRepeatEnd || e.addBar(t)
                        }
                    }
            return e
        }
        findBarsWithWrongChordDefinition() {
            const e = new wo("和弦定义有误","https://youpu.feishu.cn/docx/HQaQdCPpYoi0AfxqKtwc7csmn0w#YWaYdYNXRoZMFixQYCTc409Anxc");
            for (const t of this.score.tracks)
                for (const s of t.staves)
                    for (const t of s.bars)
                        for (const i of t.voices)
                            for (const n of i.beats) {
                                if (!n.chordId)
                                    continue;
                                const i = s.chords.get(n.chordId);
                                if (!i) {
                                    e.addBar(t, "缺少和弦定义" + n.chordId);
                                    continue
                                }
                                const r = Bo(i, i.staff.stringTuning);
                                r && e.addBar(t, r)
                            }
            return e
        }
        findOutChordNoteBars() {
            const e = new wo("有和弦外音","https://youpu.feishu.cn/docx/HQaQdCPpYoi0AfxqKtwc7csmn0w#OWJEdeIIzo03T8x2wIjcNeMAn3f");
            for (const t of this.score.tracks)
                for (const s of t.staves)
                    if (s.showTablature && !s.showNumberedNotation)
                        for (const t of s.bars)
                            for (const s of t.voices)
                                for (const i of s.beats)
                                    for (const s of i.notes)
                                        s.fret < 0 && e.addBar(t);
            return e
        }
        findBarsWithMultipleVoices() {
            const e = new wo("存在多声部","https://youpu.feishu.cn/docx/HQaQdCPpYoi0AfxqKtwc7csmn0w#QGnRdfV0BoG6H1xMyuqc4XHSn2d",!0,Vr.MultiVoice);
            for (const t of this.score.tracks)
                for (const s of t.staves)
                    for (const t of s.bars)
                        for (const s of t.voices)
                            for (const i of s.beats)
                                for (const s of i.notes)
                                    s.glyphTags.includes(Vr.MultiVoice) && e.addBar(t);
            return e
        }
        findNumberedNotationBarsWithMultiNotesPerBeat() {
            const e = new wo("简谱禁止一拍多音","https://youpu.feishu.cn/docx/HQaQdCPpYoi0AfxqKtwc7csmn0w#PziwdCXYtoVckyx7NpKcuKFCnzU");
            for (const t of this.score.tracks)
                for (const s of t.staves)
                    if (s.showNumberedNotation)
                        for (const t of s.bars)
                            for (const s of t.voices)
                                for (const i of s.beats)
                                    i.notes.length > 1 && e.addBar(t);
            return e
        }
        findNumberedNotationBarsWithManySharps() {
            const e = new wo("请正确选择调号以减少升降号","https://youpu.feishu.cn/docx/HQaQdCPpYoi0AfxqKtwc7csmn0w#Jf2idBvLHooEwixRssPchG25nRh");
            for (const t of this.score.tracks)
                for (const s of t.staves)
                    if (s.showNumberedNotation)
                        for (const t of s.bars) {
                            const s = new Set;
                            for (const e of t.voices)
                                for (const t of e.beats)
                                    for (const e of t.notes) {
                                        const t = js(e.beat.voice.bar.masterBar.keySignature) + e.beat.voice.bar.staff.transpositionPitch + e.beat.voice.bar.staff.displayTranspositionPitch
                                          , i = Math.max(e.realValueWithoutHarmonic + t, 0) % 12;
                                        s.add(i)
                                    }
                            const i = [...s.values()].filter((e => [1, 3, 6, 8, 10].includes(e))).length;
                            2 * i > s.size && i > 2 && e.addBar(t)
                        }
            return e
        }
        findNumberedNotationBarsWithOnlyRests() {
            const e = new wo("简谱无歌词部分需要编配独奏","https://youpu.feishu.cn/docx/HQaQdCPpYoi0AfxqKtwc7csmn0w#H9egdPQ0zogbEKxMUiFcoRDynkb")
              , t = new Map;
            let s = !1;
            function i(e) {
                const s = e.masterBar.index;
                let i = t.get(s);
                return i || (i = {
                    tabBarHasSoundNotes: !1,
                    numberedBarHasSoundNotes: !1,
                    masterBar: e.masterBar
                },
                t.set(s, i)),
                i
            }
            for (const e of this.score.tracks)
                for (const t of e.staves)
                    for (const e of t.bars) {
                        const n = i(e);
                        let r = !1;
                        for (const t of e.voices)
                            for (const e of t.beats) {
                                let t = !0;
                                for (const s of e.notes)
                                    t = t && s.isDead;
                                const s = !e.isRest && !t;
                                r = r || s
                            }
                        t.showNumberedNotation ? (s = !0,
                        n.numberedBarHasSoundNotes = n.numberedBarHasSoundNotes || r) : n.tabBarHasSoundNotes = n.tabBarHasSoundNotes || r
                    }
            return s && t.forEach(( ({tabBarHasSoundNotes: t, numberedBarHasSoundNotes: s, masterBar: i}, n) => {
                t && !s && e.addMasterBar(i)
            }
            )),
            e
        }
        findNumberedNotationBarsOfDumbBeatsWithLyrics() {
            const e = new wo("简谱独奏部分不可有歌词","https://youpu.feishu.cn/docx/HQaQdCPpYoi0AfxqKtwc7csmn0w#Qh37dv7KGonfhexxpGQc6EM9n1b");
            for (const t of this.score.tracks)
                for (const s of t.staves)
                    if (s.showNumberedNotation)
                        for (const t of s.bars) {
                            let s = !1;
                            for (const e of t.voices)
                                for (const t of e.beats) {
                                    const e = t.lyrics ? t.lyrics.join("") : "";
                                    t.isDumb && e && (s = !0)
                                }
                            s && e.addBar(t)
                        }
            return e
        }
        findNumberedNotationBarsLyricsOnGraceNote() {
            const e = new wo("装饰音上有歌词","https://youpu.feishu.cn/docx/HQaQdCPpYoi0AfxqKtwc7csmn0w#part-AQFrdB9u9o3Ablx3YT5cOrHqnyh",!0);
            for (const t of this.score.tracks)
                for (const s of t.staves)
                    if (s.showNumberedNotation)
                        for (const t of s.bars)
                            for (const s of t.voices)
                                for (const i of s.beats) {
                                    (i.lyrics ? i.lyrics.join("") : "") && i.graceType !== p.None && e.addBar(t)
                                }
            return e
        }
        findNumberedNotationBarsOfDumbBeatsWithNonDumbRests() {
            const e = new wo("简谱独奏休止符格式错误","https://youpu.feishu.cn/docx/HQaQdCPpYoi0AfxqKtwc7csmn0w#HRP5dlf5PoZyqlxgqtEcosrDnqc");
            for (const t of this.score.tracks)
                for (const s of t.staves)
                    if (s.showNumberedNotation)
                        for (const t of s.bars) {
                            let s = !0
                              , i = !1;
                            for (const e of t.voices)
                                if (!e.isEmpty)
                                    for (const t of e.beats)
                                        t.isDumb || t.isRest || (s = !1),
                                        !t.isDumb && t.isRest && (i = !0);
                            s && i && e.addBar(t)
                        }
            return e
        }
        findNumberedNotationBarsWithMisalignedLyrics() {
            const e = new wo("简谱要一音一字","https://youpu.feishu.cn/docx/HQaQdCPpYoi0AfxqKtwc7csmn0w#part-GhoMdUsxXolenDxEeC1cFeYUnfd");
            for (const t of this.score.tracks)
                for (const s of t.staves)
                    if (s.showNumberedNotation)
                        for (const t of s.bars)
                            for (const s of t.voices)
                                for (const i of s.beats) {
                                    let s = !1
                                      , n = !1;
                                    i.isRest || i.isDumb || No(i) || i.graceType || (n = !0);
                                    (i.lyrics ? i.lyrics.join("") : "") && (s = !0),
                                    !s && n && e.addBar(t)
                                }
            return e
        }
        findNumberedNotationBarsWithWrongGraceNote() {
            const e = new wo("请正确区分前/后装饰音","https://youpu.feishu.cn/docx/HQaQdCPpYoi0AfxqKtwc7csmn0w#OlvTd0nimoigR3x8zmJcwW4Gncx");
            for (const t of this.score.tracks)
                for (const s of t.staves)
                    if (s.showNumberedNotation)
                        for (const t of s.bars)
                            for (const s of t.voices)
                                for (const i of s.beats) {
                                    if (i.isRest || i.graceType === p.None)
                                        continue;
                                    let n = null;
                                    i.graceType === p.BeforeBeat ? i.index > 0 && (n = s.beats[i.index - 1]) : i.isLastOfVoice || (n = s.beats[i.index + 1]),
                                    n && !n.isRest && i.notes[0].realValue !== n.notes[0].realValue || e.addBar(t)
                                }
            return e
        }
        findNumberedNotationBarsWithUnsupportedEffects() {
            const e = new wo("简谱里不可使用吉他技法","https://youpu.feishu.cn/docx/HQaQdCPpYoi0AfxqKtwc7csmn0w#DVMqdKE1ZokNMPxqNkscCHZCnJg");
            for (const t of this.score.tracks)
                for (const s of t.staves)
                    if (s.showNumberedNotation)
                        for (const t of s.bars) {
                            let s = !1;
                            for (const e of t.voices)
                                for (const t of e.beats) {
                                    (t.isPalmMute || t.vibrato || t.isTremolo || t.crescendo || t.hasWhammyBar || t.hasRasgueado || t.pop || t.tap || t.slap || t.brushType || t.pickStroke) && (s = !0);
                                    for (const e of t.notes)
                                        (e.hasEffectSlur || e.isHarmonic || e.isDead || e.isStaccato || e.isPalmMute || e.isTrill || e.vibrato || e.hasBend || e.isLeftHandTapped) && (s = !0)
                                }
                            s && e.addBar(t)
                        }
            return e
        }
        findNumberedNotationBarsWithLegatoOnSamePitch() {
            const e = new wo("简谱里圆滑线不可连接同音高的音","https://youpu.feishu.cn/docx/HQaQdCPpYoi0AfxqKtwc7csmn0w#B1ivdPZ0yoiFdWx68nfcQfXXnne");
            for (const t of this.score.tracks)
                for (const s of t.staves)
                    if (s.showNumberedNotation)
                        for (const t of s.bars)
                            for (const s of t.voices)
                                for (const i of s.beats) {
                                    const {previousBeat: s} = i;
                                    i.notes.length && s && s.notes.length && i.isLegatoDestination && (i.notes[0].realValue === s.notes[0].realValue && e.addBar(t))
                                }
            return e
        }
        findBarsWithRepeatStart() {
            const e = new wo("存在反复记号","https://youpu.feishu.cn/docx/HQaQdCPpYoi0AfxqKtwc7csmn0w#part-WMI6dhqZcouorvxy7sZccYv2nje");
            for (const t of this.score.masterBars)
                (t.isRepeatStart || t.isRepeatEnd) && e.addMasterBar(t);
            return e
        }
        findPianoBarsWithTooLongContinuousOttavia() {
            const e = new wo("连续八度记号过长","https://youpu.feishu.cn/docx/HQaQdCPpYoi0AfxqKtwc7csmn0w#WmJfdYG53oeQejxMo3Xcr87cnWb",!0);
            for (const t of this.score.tracks)
                for (const s of t.staves) {
                    if (!s.showStandardNotation || s.showNumberedNotation)
                        continue;
                    let t = R.Regular
                      , i = 0;
                    for (const n of s.bars)
                        for (const r of n.voices)
                            for (const a of r.beats) {
                                if (t !== R.Regular && a.ottava !== t && n.index - i > 6)
                                    for (let t = i; t < n.index; ++t)
                                        e.addBar(s.bars[t]);
                                a.ottava !== t && (i = n.index),
                                t = a.ottava
                            }
                }
            return e
        }
        findBarsNeedsAnacrusis() {
            var e, t;
            const s = new wo("弱起小节","https://youpu.feishu.cn/docx/HQaQdCPpYoi0AfxqKtwc7csmn0w#part-D5e5d76ZHoiCWvxiqHucVkcin48");
            let i, n = !0;
            for (const s of this.score.tracks)
                for (const r of s.staves) {
                    const s = null === (t = null === (e = r.bars[0]) || void 0 === e ? void 0 : e.voices[0]) || void 0 === t ? void 0 : t.beats[0];
                    n && (n = !s || s.isRest),
                    s && (i = r.bars[0])
                }
            return n && i && !i.masterBar.isAnacrusis && s.addBar(i),
            s
        }
        findPianoBarsWithTaggedNotes() {
            const e = [new wo("手指跨度超过八度","https://youpu.feishu.cn/docx/HQaQdCPpYoi0AfxqKtwc7csmn0w#XI2UdUWh0oj7ePxmCTJcTWXhn2b",!0,Vr.SingleBeatOverOctaveNote), new wo("单手超过4个键","https://youpu.feishu.cn/docx/HQaQdCPpYoi0AfxqKtwc7csmn0w#YWWPdCM4eoxnaAx6DOscDfsGnHe",!0,Vr.SingleBeatTooManyNotesNote)];
            for (const t of this.score.tracks)
                for (const s of t.staves)
                    if (s.showStandardNotation && !s.showNumberedNotation)
                        for (const t of s.bars)
                            for (const s of t.voices)
                                for (const i of s.beats)
                                    for (const s of i.notes)
                                        for (const i of e)
                                            s.glyphTags.includes(i.errorNoteIdentifier) && i.addBar(t);
            return e
        }
        findPianoBarsWithNoChords() {
            const e = new wo("未标注和弦","https://youpu.feishu.cn/docx/HQaQdCPpYoi0AfxqKtwc7csmn0w#Wuybd1Vx8oXZuCxXVC9cuSjRneh",!0);
            for (const t of this.score.tracks)
                for (const s of t.staves)
                    if (s.showStandardNotation && !s.showNumberedNotation && 0 !== s.index)
                        for (const t of s.bars) {
                            let s = !1
                              , i = !1;
                            for (const e of t.voices)
                                for (const t of e.beats)
                                    if (s || (s = t.hasChord),
                                    i || (i = !t.isRest),
                                    s)
                                        break;
                            !s && i && e.addBar(t)
                        }
            return e
        }
        findPianoBarsWithOutChordNotes() {
            const e = new wo("有和弦外音","https://youpu.feishu.cn/docx/HQaQdCPpYoi0AfxqKtwc7csmn0w#OWJEdeIIzo03T8x2wIjcNeMAn3f",!0,Vr.OutChord)
              , t = new wo("非常用和弦","https://youpu.feishu.cn/docx/HQaQdCPpYoi0AfxqKtwc7csmn0w#ADZad1l37oZLhGxetcHcGp3gn3c",!0);
            for (const s of this.score.tracks)
                for (const i of s.staves)
                    if (i.showStandardNotation && !i.showNumberedNotation)
                        for (const s of i.bars) {
                            const i = [];
                            for (const e of s.voices)
                                for (const n of e.beats) {
                                    const e = sn(n);
                                    let r;
                                    e && e.name && (r = bo.get(e.name)),
                                    (null == r ? void 0 : r.isUnknown()) ? t.addBar(s, "非常用和弦：" + (null == r ? void 0 : r.name)) : i.push(...n.notes.filter((e => e.glyphTags.includes(Vr.OutChord))).map((e => Xi[Yi(e.realValue)] + (r ? `(${r.toRelativeInterval(e.realValue)})` : ""))))
                                }
                            i.length > 0 && e.addBar(s, "高亮音符为和弦外音" + i.join(","))
                        }
            return [e, t]
        }
        findPianoBarsWithWrongBassNote() {
            const e = new wo("和弦低音有误","https://youpu.feishu.cn/docx/HQaQdCPpYoi0AfxqKtwc7csmn0w#WkmkdWCHnoHS68xqOohc5fIMnwg",!0,Vr.WrongBass);
            for (const t of this.score.tracks)
                for (const s of t.staves)
                    if (s.showStandardNotation && !s.showNumberedNotation)
                        for (const t of s.bars)
                            for (const s of t.voices)
                                for (const i of s.beats)
                                    for (const s of i.notes)
                                        if (s.glyphTags.includes(Vr.WrongBass)) {
                                            const n = `和弦低音应为${bo.get(i.chord.name).bass},实为${Xi[s.tone] || "空"}`;
                                            e.addBar(t, n)
                                        }
            return e
        }
        findPianoBarsWithTooManyLedgerLinesNotes() {
            const e = new wo("音符加线太多","https://youpu.feishu.cn/docx/HQaQdCPpYoi0AfxqKtwc7csmn0w#TJBud0vIHoQ9q0xXuo1cLTFunEc",!0,Vr.TooManyLedgerLines);
            for (const t of this.score.tracks)
                for (const s of t.staves)
                    if (s.showStandardNotation && !s.showNumberedNotation)
                        for (const t of s.bars)
                            for (const s of t.voices)
                                for (const i of s.beats)
                                    for (const s of i.notes)
                                        if (s.glyphTags.includes(Vr.TooManyLedgerLines)) {
                                            const s = "可考虑使用升降8度记号或换谱号";
                                            e.addBar(t, s)
                                        }
            return e
        }
    }
    function No(e) {
        for (const t of e.notes)
            if (t.beat.isLegatoDestination || t.isTieDestination || t.isSlurDestination || t.isEffectSlurDestination)
                return !0;
        return !1
    }
    function vo(e) {
        for (const t of e.voices)
            for (const e of t.beats)
                if (e.hasTuplet)
                    return !0;
        return !1
    }
    e.BinaryImporter = class extends Rt {
        get name() {
            return "Binary"
        }
        read(e, t) {
            return t || (t = new Za),
            this.init(se.fromBuffer(e), t),
            this.readScore()
        }
        readScore() {
            let e = te.toString(this.data.getBuffer(), this.settings.importer.encoding);
            if (!e)
                throw new Ot("No data file found in zip");
            return Js.jsonToScore(e, this.settings)
        }
    }
    ,
    e.Color = Bt,
    e.ErrorHighlighter = class {
        constructor(e) {
            this.suggestionInDisplay = null,
            this.api = e,
            this.boxesContainer = document.createElement("div"),
            this.boxesContainer.classList.add("at-errors"),
            this.suggestionList = document.createElement("div"),
            this.suggestionList.classList.add("at-suggestions");
            const t = this.api.container.element;
            t.style.position = "relative",
            t.style.textAlign = "left",
            t.insertBefore(this.boxesContainer, t.firstChild),
            t.insertBefore(this.suggestionList, t.firstChild)
        }
        highlightErrorBars() {
            this.suggestionList.innerHTML = "",
            this.boxesContainer.innerHTML = "";
            const e = new To(this.api.score).validate();
            for (const t of e) {
                if (!t.hasMasterBars())
                    continue;
                const e = document.createElement("div");
                e.classList.add("at-suggestion"),
                e.classList.add(t.isWarning ? "at-warning" : "at-error");
                const s = Math.random().toString()
                  , i = document.createElement("input");
                i.id = s,
                i.setAttribute("type", "radio"),
                i.setAttribute("name", "suggestion");
                const n = document.createElement("label");
                n.textContent = (t.isWarning ? "提醒: " : "错误: ") + t.message,
                n.setAttribute("for", s),
                n.onclick = () => {
                    this.boxesContainer.innerHTML = "",
                    this.api.uiFacade.removeHighlights("at-highlight-error"),
                    this.suggestionInDisplay === t ? this.suggestionInDisplay = null : (this.suggestionInDisplay = t,
                    this.displayChangeSuggestion(t),
                    t.errorNoteIdentifier && this.api.uiFacade.highlightElements(t.errorNoteIdentifier, "at-highlight-error"))
                }
                ,
                e.appendChild(i),
                e.appendChild(n),
                this.suggestionList.appendChild(e)
            }
        }
        displayChangeSuggestion(e) {
            const t = this.api.renderer.boundsLookup;
            for (const {masterBar: s, message: i} of e.getMasterBars()) {
                const n = t.findMasterBar(s);
                this.addHighlightBox(n.visualBounds, i, e.isWarning)
            }
        }
        addHighlightBox(e, t, s) {
            let i = document.createElement("div");
            i.classList.add(s ? "at-warning-bar" : "at-error-bar"),
            i.style.position = "absolute",
            i.textContent = t;
            const n = new co(i);
            n.top = e.y,
            n.left = e.x,
            n.width = e.w,
            n.height = e.h + 20,
            this.boxesContainer.appendChild(i)
        }
    }
    ,
    e.Font = vt,
    e.JsonConverter = Js,
    e.NierApi = class extends fo {
    }
    ,
    e.ScoreAdapter = class {
        constructor(e) {
            this.score = e
        }
        get key() {
            const e = this.score.masterBars[0];
            if (!e)
                return "";
            const t = Zs(e.keySignature, 0);
            return $[t].replace("Sharp", "#")
        }
        set key(e) {}
        get capo() {
            for (const e of this.score.tracks)
                for (const t of e.staves)
                    if (t.showTablature && !t.showNumberedNotation && t.capo)
                        return t.capo;
            return 0
        }
        set capo(e) {
            for (const t of this.score.tracks)
                for (const s of t.staves)
                    if (s.showTablature && !s.showNumberedNotation)
                        return void (s.capo = e)
        }
        get timeSignature() {
            const e = this.score.masterBars[0];
            return e ? e.timeSignatureNumerator + "/" + e.timeSignatureDenominator : ""
        }
        set timeSignature(e) {}
        copyTabChords() {
            const e = function(e) {
                for (const t of e.tracks)
                    for (const e of t.staves)
                        if (e.chords.size > 0)
                            return e;
                return null
            }(this.score)
              , t = function(e) {
                for (const t of e.tracks)
                    for (const e of t.staves)
                        if (e.showNumberedNotation)
                            return e;
                return null
            }(this.score);
            return e && t ? (function(e, t) {
                t.chords = e.chords;
                for (let s = 0; s < e.bars.length; ++s) {
                    const i = e.bars[s]
                      , n = t.bars[s];
                    if (!i || !n)
                        break;
                    let r = i.voices[0].beats[0]
                      , a = n.voices[0].beats[0]
                      , o = 0
                      , h = 0;
                    for (; r; ) {
                        if (r.hasChord) {
                            let e = !1;
                            for (; a; )
                                if (h += a.playbackDuration,
                                a.graceType !== p.OnBeat) {
                                    if (h > o && (a.chordId = r.chordId,
                                    e = !0),
                                    a = a.nextBeat,
                                    e)
                                        break
                                } else
                                    a = a.nextBeat
                        }
                        o += r.playbackDuration,
                        r = r.nextBeat
                    }
                }
            }(e, t),
            t.track.index) : -1
        }
        getChordNames() {
            for (const e of this.score.tracks)
                for (const t of e.staves)
                    if ((t.showTablature || t.showStandardNotation) && !t.showNumberedNotation)
                        return Array.from(t.chords.values()).map((e => qi(e.name)));
            return []
        }
        getChordFingeringsForVocal() {
            let e = null
              , t = null;
            for (const s of this.score.tracks)
                for (const i of s.staves)
                    i.showTablature && !i.showNumberedNotation ? e = i : i.showNumberedNotation && (t = i);
            if (!e || !t)
                return [];
            const s = new Set;
            for (let i = 0; i < t.bars.length; ++i) {
                const n = e.bars[i];
                if (n)
                    for (const e of t.bars[i].voices) {
                        const t = n.voices[0];
                        if (t)
                            for (const i of e.beats) {
                                const e = t.beats[i.index];
                                if (!e || !e.chordId)
                                    continue;
                                let n = !1;
                                for (const e of i.notes)
                                    if (e.realValue) {
                                        n = !0;
                                        break
                                    }
                                n && s.add(e.chordId)
                            }
                    }
            }
            return Array.from(s.values()).map((t => e.chords.get(t))).filter((e => !!e)).map((e => function(e) {
                const t = qi(e.name)
                  , s = Ki(e, 4);
                return t + "=" + s + ";" + e.strings.map(( ({fret: e, finger: t}) => {
                    let i = e >= 0 ? e - s + 1 : "X";
                    return t >= E.Thumb && (i += `(${t === E.Thumb ? "T" : String(t)})`),
                    i
                }
                )).reverse().join(",")
            }(e)))
        }
        getSections() {
            return this.score.masterBars.filter((e => !!e.section)).map((e => ({
                start: Z.ticksToMillis(e.start, this.score.tempo),
                name: e.section.text
            })))
        }
        hasTranspositionPitch() {
            for (const e of this.score.tracks)
                for (const t of e.staves)
                    if (t.transpositionPitch)
                        return !0;
            return !1
        }
        hasDisplayTranspositionPitch() {
            for (const e of this.score.tracks)
                for (const t of e.staves)
                    if (t.displayTranspositionPitch)
                        return !0;
            return !1
        }
        hasLyrics() {
            for (const e of this.score.tracks)
                for (const t of e.staves)
                    for (const e of t.bars)
                        for (const t of e.voices)
                            for (const e of t.beats)
                                if (e.lyrics && e.lyrics.length > 0)
                                    return !0;
            return !1
        }
        getLyrics() {
            const e = [];
            for (const t of this.score.tracks)
                for (const s of t.staves)
                    for (const t of s.bars)
                        for (const s of t.voices)
                            for (const t of s.beats)
                                if (t.lyrics && t.lyrics.length > 0)
                                    for (let s = 0; s < t.lyrics.length; ++s) {
                                        const i = t.lyrics[s];
                                        i && (e[s] ? e[s].push(i) : e[s] = [i])
                                    }
            return e
        }
        hasOverlappingLyrics() {
            var e, t;
            for (const s of this.score.tracks)
                for (const i of s.staves) {
                    let s, n = null === (t = null === (e = i.bars[0]) || void 0 === e ? void 0 : e.voices[0]) || void 0 === t ? void 0 : t.beats[0];
                    for (; n; ) {
                        if ((n.lyrics && n.lyrics[0] || "").length > 4) {
                            if (s)
                                return !0;
                            s = !0
                        } else
                            s = !1;
                        n = n.nextBeat
                    }
                }
            return !1
        }
        hasNonStandardTuning(e) {
            for (const t of this.score.tracks)
                for (const s of t.staves)
                    if (s.isStringed && s.showTablature && !s.showNumberedNotation && (s.tuning.length !== e || !s.stringTuning.isStandard))
                        return !0;
            return !1
        }
        getVocalPitchRange() {
            for (const e of this.score.tracks)
                for (const t of e.staves)
                    if (t.showNumberedNotation)
                        return this.getStaffPitchRange(t);
            return null
        }
        getTotalDurationInMs() {
            let e = 0
              , t = this.score.tempo;
            for (const s of this.score.masterBars)
                s.tempoAutomation && (t = s.tempoAutomation.value),
                e += Z.ticksToMillis(s.calculateDuration(), t);
            return e
        }
        getNoteNumPerStaff() {
            const e = [];
            for (const t of this.score.tracks)
                for (const s of t.staves) {
                    let t = 0;
                    for (const e of s.bars)
                        for (const s of e.voices)
                            for (const e of s.beats)
                                t += e.notes.length;
                    e.push(t)
                }
            return e
        }
        getNoteValueNumPerStaff() {
            const e = [];
            for (const t of this.score.tracks)
                for (const s of t.staves) {
                    const t = new Set;
                    for (const e of s.bars)
                        for (const s of e.voices)
                            for (const e of s.beats)
                                for (const s of e.notes)
                                    t.add(s.realValue);
                    e.push(t.size)
                }
            return e
        }
        getOctaveValueNumPerStaff() {
            const e = [];
            for (const t of this.score.tracks)
                for (const s of t.staves) {
                    const t = new Set;
                    for (const e of s.bars)
                        for (const s of e.voices)
                            for (const e of s.beats)
                                for (const s of e.notes)
                                    t.add(s.realValue % 12);
                    e.push(t.size)
                }
            return e
        }
        getOffScaleNoteNumPerStaff() {
            const e = [];
            for (const t of this.score.tracks)
                for (const s of t.staves) {
                    let t = 0;
                    for (const e of s.bars)
                        for (const s of e.voices)
                            for (const i of s.beats)
                                for (const s of i.notes)
                                    bi.isNoteValueOnScale(s.realValue, e.masterBar.keySignature) || t++;
                    e.push(t)
                }
            return e
        }
        getStaffPitchRange(e) {
            let t = 1 / 0
              , s = -1 / 0
              , i = 0
              , n = 0;
            const r = [];
            for (const a of e.bars)
                for (const o of a.voices)
                    for (const a of o.beats)
                        if (!a.isRest)
                            for (const o of a.notes) {
                                const a = o.realValueWithoutHarmonic + e.transpositionPitch;
                                s = Math.max(a, s),
                                t = Math.min(a, t),
                                i++,
                                n += a,
                                r.push(a)
                            }
            return {
                low: t,
                high: s,
                total: n,
                num: i,
                median: function(e) {
                    let t = Math.floor(e.length / 2);
                    return (e = [...e].sort(( (e, t) => e - t))).length % 2 != 0 ? e[t] : (e[t - 1] + e[t]) / 2
                }(r)
            }
        }
        getTranspositionsForBestVocal(e=0, t=78) {
            const s = []
              , i = [];
            for (const n of this.score.tracks) {
                let r = 0
                  , a = 0;
                for (const s of n.staves) {
                    if (!s.showNumberedNotation)
                        continue;
                    const {median: i} = this.getStaffPitchRange(s);
                    r = Math.floor((t - i - e) / 12),
                    a = -1;
                    break
                }
                s.push(12 * r + e),
                i.push(12 * a)
            }
            return {
                transpositionPitches: s,
                displayTranspositionPitches: i
            }
        }
        removeAccidentalMode() {
            for (const e of this.score.tracks)
                for (const t of e.staves)
                    for (const e of t.bars)
                        for (const t of e.voices)
                            for (const e of t.beats)
                                for (const t of e.notes)
                                    t.accidentalMode = D.Default
        }
        tagNotes() {
            for (const e of this.score.tracks)
                for (const t of e.staves)
                    if (t.showStandardNotation && !t.showNumberedNotation)
                        for (const e of t.bars) {
                            const t = new bi(e);
                            t.init();
                            for (const s of e.voices)
                                for (const e of s.beats)
                                    this.tagMultiVoiceNotes(e),
                                    e.duration >= d.Quarter && e.index === s.beats.length - 1 || this.tagNotesForChord(e),
                                    this.tagTooManyLedgerNotes(e, t),
                                    this.tagSingleBeatTooManyNotesNotes(e),
                                    this.tagSingleBeatOverOctaveNotes(e)
                        }
        }
        tagSingleBeatTooManyNotesNotes(e) {
            if (e.notes.length > 4)
                for (const t of e.notes)
                    t.glyphTags.push(Vr.SingleBeatTooManyNotesNote)
        }
        tagSingleBeatOverOctaveNotes(e) {
            if (e.brushType === c.None && e.maxNote && e.minNote && e.maxNote.realValue - e.minNote.realValue > 12)
                for (const t of e.notes)
                    t.glyphTags.push(Vr.SingleBeatOverOctaveNote)
        }
        tagMultiVoiceNotes(e) {
            if (0 !== e.voice.index)
                for (const t of e.notes)
                    t.glyphTags.push(Vr.MultiVoice)
        }
        tagNotesForChord(e) {
            const t = sn(e)
              , s = e.graceType !== p.None;
            if (t && !s) {
                const s = bo.get(t.name);
                if (s) {
                    if (!s.isUnknown())
                        for (const t of e.notes) {
                            !s.isValueInChordLoose(t.realValue + e.voice.bar.staff.transpositionPitch) && t.glyphTags.push(Vr.OutChord)
                        }
                    if (e.hasChord && e.minNote) {
                        Ji.get(s.bass) !== e.minNote.tone && e.minNote.glyphTags.push(Vr.WrongBass)
                    }
                }
            }
        }
        tagTooManyLedgerNotes(e, t) {
            const s = e.minNote;
            let i = !1;
            if (s) {
                t.getNoteLine(s) < -7 && (i = !0)
            }
            const n = e.maxNote;
            if (n) {
                t.getNoteLine(n) > 15 && (i = !0)
            }
            if (i)
                for (const t of e.notes)
                    t.glyphTags.push(Vr.TooManyLedgerLines)
        }
    }
    ,
    e.ScoreValidator = To,
    Object.defineProperty(e, "__esModule", {
        value: !0
    })
}
));
