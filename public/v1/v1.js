/*!
 * VERSION: 2.1.2
 * DATE: 2019-03-01
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * Includes all of the following: TweenLite, TweenMax, TimelineLite, TimelineMax, EasePack, CSSPlugin, RoundPropsPlugin, BezierPlugin, AttrPlugin, DirectionalRotationPlugin
 *
 * @license Copyright (c) 2008-2019, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 *
 * @author: Jack Doyle, jack@greensock.com
 **/
var _gsScope =
  "undefined" != typeof module && module.exports && "undefined" != typeof global
    ? global
    : this || window;
(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push(function () {
  "use strict";
  _gsScope._gsDefine(
    "TweenMax",
    ["core.Animation", "core.SimpleTimeline", "TweenLite"],
    function (a, b, c) {
      var d = function (a) {
          var b,
            c = [],
            d = a.length;
          for (b = 0; b !== d; c.push(a[b++]));
          return c;
        },
        e = function (a, b, c) {
          var d,
            e,
            f = a.cycle;
          for (d in f)
            (e = f[d]),
              (a[d] = "function" == typeof e ? e(c, b[c], b) : e[c % e.length]);
          delete a.cycle;
        },
        f = function (a) {
          if ("function" == typeof a) return a;
          var b = "object" == typeof a ? a : { each: a },
            c = b.ease,
            d = b.from || 0,
            e = b.base || 0,
            f = {},
            g = isNaN(d),
            h = b.axis,
            i = { center: 0.5, end: 1 }[d] || 0;
          return function (a, j, k) {
            var l,
              m,
              n,
              o,
              p,
              q,
              r,
              s,
              t,
              u = (k || b).length,
              v = f[u];
            if (!v) {
              if (((t = "auto" === b.grid ? 0 : (b.grid || [1 / 0])[0]), !t)) {
                for (
                  r = -(1 / 0);
                  r < (r = k[t++].getBoundingClientRect().left) && u > t;

                );
                t--;
              }
              for (
                v = f[u] = [],
                  l = g ? Math.min(t, u) * i - 0.5 : d % t,
                  m = g ? (u * i) / t - 0.5 : (d / t) | 0,
                  r = 0,
                  s = 1 / 0,
                  q = 0;
                u > q;
                q++
              )
                (n = (q % t) - l),
                  (o = m - ((q / t) | 0)),
                  (v[q] = p =
                    h ? Math.abs("y" === h ? o : n) : Math.sqrt(n * n + o * o)),
                  p > r && (r = p),
                  s > p && (s = p);
              (v.max = r - s),
                (v.min = s),
                (v.v = u =
                  b.amount ||
                  b.each *
                    (t > u
                      ? u
                      : h
                      ? "y" === h
                        ? u / t
                        : t
                      : Math.max(t, u / t)) ||
                  0),
                (v.b = 0 > u ? e - u : e);
            }
            return (
              (u = (v[a] - v.min) / v.max), v.b + (c ? c.getRatio(u) : u) * v.v
            );
          };
        },
        g = function (a, b, d) {
          c.call(this, a, b, d),
            (this._cycle = 0),
            (this._yoyo = this.vars.yoyo === !0 || !!this.vars.yoyoEase),
            (this._repeat = this.vars.repeat || 0),
            (this._repeatDelay = this.vars.repeatDelay || 0),
            this._repeat && this._uncache(!0),
            (this.render = g.prototype.render);
        },
        h = 1e-8,
        i = c._internals,
        j = i.isSelector,
        k = i.isArray,
        l = (g.prototype = c.to({}, 0.1, {})),
        m = [];
      (g.version = "2.1.2"),
        (l.constructor = g),
        (l.kill()._gc = !1),
        (g.killTweensOf = g.killDelayedCallsTo = c.killTweensOf),
        (g.getTweensOf = c.getTweensOf),
        (g.lagSmoothing = c.lagSmoothing),
        (g.ticker = c.ticker),
        (g.render = c.render),
        (g.distribute = f),
        (l.invalidate = function () {
          return (
            (this._yoyo = this.vars.yoyo === !0 || !!this.vars.yoyoEase),
            (this._repeat = this.vars.repeat || 0),
            (this._repeatDelay = this.vars.repeatDelay || 0),
            (this._yoyoEase = null),
            this._uncache(!0),
            c.prototype.invalidate.call(this)
          );
        }),
        (l.updateTo = function (a, b) {
          var d,
            e = this,
            f = e.ratio,
            g = e.vars.immediateRender || a.immediateRender;
          b &&
            e._startTime < e._timeline._time &&
            ((e._startTime = e._timeline._time),
            e._uncache(!1),
            e._gc
              ? e._enabled(!0, !1)
              : e._timeline.insert(e, e._startTime - e._delay));
          for (d in a) e.vars[d] = a[d];
          if (e._initted || g)
            if (b) (e._initted = !1), g && e.render(0, !0, !0);
            else if (
              (e._gc && e._enabled(!0, !1),
              e._notifyPluginsOfEnabled &&
                e._firstPT &&
                c._onPluginEvent("_onDisable", e),
              e._time / e._duration > 0.998)
            ) {
              var h = e._totalTime;
              e.render(0, !0, !1), (e._initted = !1), e.render(h, !0, !1);
            } else if (((e._initted = !1), e._init(), e._time > 0 || g))
              for (var i, j = 1 / (1 - f), k = e._firstPT; k; )
                (i = k.s + k.c), (k.c *= j), (k.s = i - k.c), (k = k._next);
          return e;
        }),
        (l.render = function (a, b, d) {
          this._initted ||
            (0 === this._duration && this.vars.repeat && this.invalidate());
          var e,
            f,
            g,
            j,
            k,
            l,
            m,
            n,
            o,
            p = this,
            q = p._dirty ? p.totalDuration() : p._totalDuration,
            r = p._time,
            s = p._totalTime,
            t = p._cycle,
            u = p._duration,
            v = p._rawPrevTime;
          if (
            (a >= q - h && a >= 0
              ? ((p._totalTime = q),
                (p._cycle = p._repeat),
                p._yoyo && 0 !== (1 & p._cycle)
                  ? ((p._time = 0),
                    (p.ratio = p._ease._calcEnd ? p._ease.getRatio(0) : 0))
                  : ((p._time = u),
                    (p.ratio = p._ease._calcEnd ? p._ease.getRatio(1) : 1)),
                p._reversed ||
                  ((e = !0),
                  (f = "onComplete"),
                  (d = d || p._timeline.autoRemoveChildren)),
                0 === u &&
                  (p._initted || !p.vars.lazy || d) &&
                  (p._startTime === p._timeline._duration && (a = 0),
                  (0 > v ||
                    (0 >= a && a >= -h) ||
                    (v === h && "isPause" !== p.data)) &&
                    v !== a &&
                    ((d = !0), v > h && (f = "onReverseComplete")),
                  (p._rawPrevTime = n = !b || a || v === a ? a : h)))
              : h > a
              ? ((p._totalTime = p._time = p._cycle = 0),
                (p.ratio = p._ease._calcEnd ? p._ease.getRatio(0) : 0),
                (0 !== s || (0 === u && v > 0)) &&
                  ((f = "onReverseComplete"), (e = p._reversed)),
                a > -h
                  ? (a = 0)
                  : 0 > a &&
                    ((p._active = !1),
                    0 === u &&
                      (p._initted || !p.vars.lazy || d) &&
                      (v >= 0 && (d = !0),
                      (p._rawPrevTime = n = !b || a || v === a ? a : h))),
                p._initted || (d = !0))
              : ((p._totalTime = p._time = a),
                0 !== p._repeat &&
                  ((j = u + p._repeatDelay),
                  (p._cycle = (p._totalTime / j) >> 0),
                  0 !== p._cycle &&
                    p._cycle === p._totalTime / j &&
                    a >= s &&
                    p._cycle--,
                  (p._time = p._totalTime - p._cycle * j),
                  p._yoyo &&
                    0 !== (1 & p._cycle) &&
                    ((p._time = u - p._time),
                    (o = p._yoyoEase || p.vars.yoyoEase),
                    o &&
                      (p._yoyoEase ||
                        (o !== !0 || p._initted
                          ? (p._yoyoEase = o =
                              o === !0
                                ? p._ease
                                : o instanceof Ease
                                ? o
                                : Ease.map[o])
                          : ((o = p.vars.ease),
                            (p._yoyoEase = o =
                              o
                                ? o instanceof Ease
                                  ? o
                                  : "function" == typeof o
                                  ? new Ease(o, p.vars.easeParams)
                                  : Ease.map[o] || c.defaultEase
                                : c.defaultEase))),
                      (p.ratio = o ? 1 - o.getRatio((u - p._time) / u) : 0))),
                  p._time > u ? (p._time = u) : p._time < 0 && (p._time = 0)),
                p._easeType && !o
                  ? ((k = p._time / u),
                    (l = p._easeType),
                    (m = p._easePower),
                    (1 === l || (3 === l && k >= 0.5)) && (k = 1 - k),
                    3 === l && (k *= 2),
                    1 === m
                      ? (k *= k)
                      : 2 === m
                      ? (k *= k * k)
                      : 3 === m
                      ? (k *= k * k * k)
                      : 4 === m && (k *= k * k * k * k),
                    (p.ratio =
                      1 === l
                        ? 1 - k
                        : 2 === l
                        ? k
                        : p._time / u < 0.5
                        ? k / 2
                        : 1 - k / 2))
                  : o || (p.ratio = p._ease.getRatio(p._time / u))),
            r === p._time && !d && t === p._cycle)
          )
            return void (
              s !== p._totalTime &&
              p._onUpdate &&
              (b || p._callback("onUpdate"))
            );
          if (!p._initted) {
            if ((p._init(), !p._initted || p._gc)) return;
            if (
              !d &&
              p._firstPT &&
              ((p.vars.lazy !== !1 && p._duration) ||
                (p.vars.lazy && !p._duration))
            )
              return (
                (p._time = r),
                (p._totalTime = s),
                (p._rawPrevTime = v),
                (p._cycle = t),
                i.lazyTweens.push(p),
                void (p._lazy = [a, b])
              );
            !p._time || e || o
              ? e &&
                this._ease._calcEnd &&
                !o &&
                (p.ratio = p._ease.getRatio(0 === p._time ? 0 : 1))
              : (p.ratio = p._ease.getRatio(p._time / u));
          }
          for (
            p._lazy !== !1 && (p._lazy = !1),
              p._active ||
                (!p._paused && p._time !== r && a >= 0 && (p._active = !0)),
              0 === s &&
                (2 === p._initted && a > 0 && p._init(),
                p._startAt &&
                  (a >= 0
                    ? p._startAt.render(a, !0, d)
                    : f || (f = "_dummyGS")),
                p.vars.onStart &&
                  (0 !== p._totalTime || 0 === u) &&
                  (b || p._callback("onStart"))),
              g = p._firstPT;
            g;

          )
            g.f
              ? g.t[g.p](g.c * p.ratio + g.s)
              : (g.t[g.p] = g.c * p.ratio + g.s),
              (g = g._next);
          p._onUpdate &&
            (0 > a && p._startAt && p._startTime && p._startAt.render(a, !0, d),
            b || ((p._totalTime !== s || f) && p._callback("onUpdate"))),
            p._cycle !== t &&
              (b || p._gc || (p.vars.onRepeat && p._callback("onRepeat"))),
            f &&
              (!p._gc || d) &&
              (0 > a &&
                p._startAt &&
                !p._onUpdate &&
                p._startTime &&
                p._startAt.render(a, !0, d),
              e &&
                (p._timeline.autoRemoveChildren && p._enabled(!1, !1),
                (p._active = !1)),
              !b && p.vars[f] && p._callback(f),
              0 === u &&
                p._rawPrevTime === h &&
                n !== h &&
                (p._rawPrevTime = 0));
        }),
        (g.to = function (a, b, c) {
          return new g(a, b, c);
        }),
        (g.from = function (a, b, c) {
          return (
            (c.runBackwards = !0),
            (c.immediateRender = 0 != c.immediateRender),
            new g(a, b, c)
          );
        }),
        (g.fromTo = function (a, b, c, d) {
          return (
            (d.startAt = c),
            (d.immediateRender =
              0 != d.immediateRender && 0 != c.immediateRender),
            new g(a, b, d)
          );
        }),
        (g.staggerTo = g.allTo =
          function (a, b, h, i, l, n, o) {
            var p,
              q,
              r,
              s,
              t = [],
              u = f(h.stagger || i),
              v = h.cycle,
              w = (h.startAt || m).cycle;
            for (
              k(a) ||
                ("string" == typeof a && (a = c.selector(a) || a),
                j(a) && (a = d(a))),
                a = a || [],
                p = a.length - 1,
                r = 0;
              p >= r;
              r++
            ) {
              q = {};
              for (s in h) q[s] = h[s];
              if (
                (v &&
                  (e(q, a, r),
                  null != q.duration && ((b = q.duration), delete q.duration)),
                w)
              ) {
                w = q.startAt = {};
                for (s in h.startAt) w[s] = h.startAt[s];
                e(q.startAt, a, r);
              }
              (q.delay = u(r, a[r], a) + (q.delay || 0)),
                r === p &&
                  l &&
                  (q.onComplete = function () {
                    h.onComplete &&
                      h.onComplete.apply(h.onCompleteScope || this, arguments),
                      l.apply(o || h.callbackScope || this, n || m);
                  }),
                (t[r] = new g(a[r], b, q));
            }
            return t;
          }),
        (g.staggerFrom = g.allFrom =
          function (a, b, c, d, e, f, h) {
            return (
              (c.runBackwards = !0),
              (c.immediateRender = 0 != c.immediateRender),
              g.staggerTo(a, b, c, d, e, f, h)
            );
          }),
        (g.staggerFromTo = g.allFromTo =
          function (a, b, c, d, e, f, h, i) {
            return (
              (d.startAt = c),
              (d.immediateRender =
                0 != d.immediateRender && 0 != c.immediateRender),
              g.staggerTo(a, b, d, e, f, h, i)
            );
          }),
        (g.delayedCall = function (a, b, c, d, e) {
          return new g(b, 0, {
            delay: a,
            onComplete: b,
            onCompleteParams: c,
            callbackScope: d,
            onReverseComplete: b,
            onReverseCompleteParams: c,
            immediateRender: !1,
            useFrames: e,
            overwrite: 0,
          });
        }),
        (g.set = function (a, b) {
          return new g(a, 0, b);
        }),
        (g.isTweening = function (a) {
          return c.getTweensOf(a, !0).length > 0;
        });
      var n = function (a, b) {
          for (var d = [], e = 0, f = a._first; f; )
            f instanceof c
              ? (d[e++] = f)
              : (b && (d[e++] = f), (d = d.concat(n(f, b))), (e = d.length)),
              (f = f._next);
          return d;
        },
        o = (g.getAllTweens = function (b) {
          return n(a._rootTimeline, b).concat(n(a._rootFramesTimeline, b));
        });
      (g.killAll = function (a, c, d, e) {
        null == c && (c = !0), null == d && (d = !0);
        var f,
          g,
          h,
          i = o(0 != e),
          j = i.length,
          k = c && d && e;
        for (h = 0; j > h; h++)
          (g = i[h]),
            (k ||
              g instanceof b ||
              ((f = g.target === g.vars.onComplete) && d) ||
              (c && !f)) &&
              (a
                ? g.totalTime(g._reversed ? 0 : g.totalDuration())
                : g._enabled(!1, !1));
      }),
        (g.killChildTweensOf = function (a, b) {
          if (null != a) {
            var e,
              f,
              h,
              l,
              m,
              n = i.tweenLookup;
            if (
              ("string" == typeof a && (a = c.selector(a) || a),
              j(a) && (a = d(a)),
              k(a))
            )
              for (l = a.length; --l > -1; ) g.killChildTweensOf(a[l], b);
            else {
              e = [];
              for (h in n)
                for (f = n[h].target.parentNode; f; )
                  f === a && (e = e.concat(n[h].tweens)), (f = f.parentNode);
              for (m = e.length, l = 0; m > l; l++)
                b && e[l].totalTime(e[l].totalDuration()),
                  e[l]._enabled(!1, !1);
            }
          }
        });
      var p = function (a, c, d, e) {
        (c = c !== !1), (d = d !== !1), (e = e !== !1);
        for (var f, g, h = o(e), i = c && d && e, j = h.length; --j > -1; )
          (g = h[j]),
            (i ||
              g instanceof b ||
              ((f = g.target === g.vars.onComplete) && d) ||
              (c && !f)) &&
              g.paused(a);
      };
      return (
        (g.pauseAll = function (a, b, c) {
          p(!0, a, b, c);
        }),
        (g.resumeAll = function (a, b, c) {
          p(!1, a, b, c);
        }),
        (g.globalTimeScale = function (b) {
          var d = a._rootTimeline,
            e = c.ticker.time;
          return arguments.length
            ? ((b = b || h),
              (d._startTime = e - ((e - d._startTime) * d._timeScale) / b),
              (d = a._rootFramesTimeline),
              (e = c.ticker.frame),
              (d._startTime = e - ((e - d._startTime) * d._timeScale) / b),
              (d._timeScale = a._rootTimeline._timeScale = b),
              b)
            : d._timeScale;
        }),
        (l.progress = function (a, b) {
          return arguments.length
            ? this.totalTime(
                this.duration() *
                  (this._yoyo && 0 !== (1 & this._cycle) ? 1 - a : a) +
                  this._cycle * (this._duration + this._repeatDelay),
                b
              )
            : this._time / this.duration();
        }),
        (l.totalProgress = function (a, b) {
          return arguments.length
            ? this.totalTime(this.totalDuration() * a, b)
            : this._totalTime / this.totalDuration();
        }),
        (l.time = function (a, b) {
          if (!arguments.length) return this._time;
          this._dirty && this.totalDuration();
          var c = this._duration,
            d = this._cycle,
            e = d * (c + this._repeatDelay);
          return (
            a > c && (a = c),
            this.totalTime(
              this._yoyo && 1 & d ? c - a + e : this._repeat ? a + e : a,
              b
            )
          );
        }),
        (l.duration = function (b) {
          return arguments.length
            ? a.prototype.duration.call(this, b)
            : this._duration;
        }),
        (l.totalDuration = function (a) {
          return arguments.length
            ? -1 === this._repeat
              ? this
              : this.duration(
                  (a - this._repeat * this._repeatDelay) / (this._repeat + 1)
                )
            : (this._dirty &&
                ((this._totalDuration =
                  -1 === this._repeat
                    ? 999999999999
                    : this._duration * (this._repeat + 1) +
                      this._repeatDelay * this._repeat),
                (this._dirty = !1)),
              this._totalDuration);
        }),
        (l.repeat = function (a) {
          return arguments.length
            ? ((this._repeat = a), this._uncache(!0))
            : this._repeat;
        }),
        (l.repeatDelay = function (a) {
          return arguments.length
            ? ((this._repeatDelay = a), this._uncache(!0))
            : this._repeatDelay;
        }),
        (l.yoyo = function (a) {
          return arguments.length ? ((this._yoyo = a), this) : this._yoyo;
        }),
        g
      );
    },
    !0
  ),
    _gsScope._gsDefine(
      "TimelineLite",
      ["core.Animation", "core.SimpleTimeline", "TweenLite"],
      function (a, b, c) {
        var d = function (a) {
            b.call(this, a);
            var c,
              d,
              e = this,
              f = e.vars;
            (e._labels = {}),
              (e.autoRemoveChildren = !!f.autoRemoveChildren),
              (e.smoothChildTiming = !!f.smoothChildTiming),
              (e._sortChildren = !0),
              (e._onUpdate = f.onUpdate);
            for (d in f)
              (c = f[d]),
                i(c) &&
                  -1 !== c.join("").indexOf("{self}") &&
                  (f[d] = e._swapSelfInParams(c));
            i(f.tweens) && e.add(f.tweens, 0, f.align, f.stagger);
          },
          e = 1e-8,
          f = c._internals,
          g = (d._internals = {}),
          h = f.isSelector,
          i = f.isArray,
          j = f.lazyTweens,
          k = f.lazyRender,
          l = _gsScope._gsDefine.globals,
          m = function (a) {
            var b,
              c = {};
            for (b in a) c[b] = a[b];
            return c;
          },
          n = function (a, b, c) {
            var d,
              e,
              f = a.cycle;
            for (d in f)
              (e = f[d]),
                (a[d] =
                  "function" == typeof e ? e(c, b[c], b) : e[c % e.length]);
            delete a.cycle;
          },
          o = (g.pauseCallback = function () {}),
          p = function (a) {
            var b,
              c = [],
              d = a.length;
            for (b = 0; b !== d; c.push(a[b++]));
            return c;
          },
          q = function (a, b, c, d) {
            var e = "immediateRender";
            return e in b || (b[e] = !((c && c[e] === !1) || d)), b;
          },
          r = function (a) {
            if ("function" == typeof a) return a;
            var b = "object" == typeof a ? a : { each: a },
              c = b.ease,
              d = b.from || 0,
              e = b.base || 0,
              f = {},
              g = isNaN(d),
              h = b.axis,
              i = { center: 0.5, end: 1 }[d] || 0;
            return function (a, j, k) {
              var l,
                m,
                n,
                o,
                p,
                q,
                r,
                s,
                t,
                u = (k || b).length,
                v = f[u];
              if (!v) {
                if (
                  ((t = "auto" === b.grid ? 0 : (b.grid || [1 / 0])[0]), !t)
                ) {
                  for (
                    r = -(1 / 0);
                    r < (r = k[t++].getBoundingClientRect().left) && u > t;

                  );
                  t--;
                }
                for (
                  v = f[u] = [],
                    l = g ? Math.min(t, u) * i - 0.5 : d % t,
                    m = g ? (u * i) / t - 0.5 : (d / t) | 0,
                    r = 0,
                    s = 1 / 0,
                    q = 0;
                  u > q;
                  q++
                )
                  (n = (q % t) - l),
                    (o = m - ((q / t) | 0)),
                    (v[q] = p =
                      h
                        ? Math.abs("y" === h ? o : n)
                        : Math.sqrt(n * n + o * o)),
                    p > r && (r = p),
                    s > p && (s = p);
                (v.max = r - s),
                  (v.min = s),
                  (v.v = u =
                    b.amount ||
                    b.each *
                      (t > u
                        ? u
                        : h
                        ? "y" === h
                          ? u / t
                          : t
                        : Math.max(t, u / t)) ||
                    0),
                  (v.b = 0 > u ? e - u : e);
              }
              return (
                (u = (v[a] - v.min) / v.max),
                v.b + (c ? c.getRatio(u) : u) * v.v
              );
            };
          },
          s = (d.prototype = new b());
        return (
          (d.version = "2.1.2"),
          (d.distribute = r),
          (s.constructor = d),
          (s.kill()._gc = s._forcingPlayhead = s._hasPause = !1),
          (s.to = function (a, b, d, e) {
            var f = (d.repeat && l.TweenMax) || c;
            return b ? this.add(new f(a, b, d), e) : this.set(a, d, e);
          }),
          (s.from = function (a, b, d, e) {
            return this.add(
              ((d.repeat && l.TweenMax) || c).from(a, b, q(this, d)),
              e
            );
          }),
          (s.fromTo = function (a, b, d, e, f) {
            var g = (e.repeat && l.TweenMax) || c;
            return (
              (e = q(this, e, d)),
              b ? this.add(g.fromTo(a, b, d, e), f) : this.set(a, e, f)
            );
          }),
          (s.staggerTo = function (a, b, e, f, g, i, j, k) {
            var l,
              o,
              q = new d({
                onComplete: i,
                onCompleteParams: j,
                callbackScope: k,
                smoothChildTiming: this.smoothChildTiming,
              }),
              s = r(e.stagger || f),
              t = e.startAt,
              u = e.cycle;
            for (
              "string" == typeof a && (a = c.selector(a) || a),
                a = a || [],
                h(a) && (a = p(a)),
                o = 0;
              o < a.length;
              o++
            )
              (l = m(e)),
                t && ((l.startAt = m(t)), t.cycle && n(l.startAt, a, o)),
                u &&
                  (n(l, a, o),
                  null != l.duration && ((b = l.duration), delete l.duration)),
                q.to(a[o], b, l, s(o, a[o], a));
            return this.add(q, g);
          }),
          (s.staggerFrom = function (a, b, c, d, e, f, g, h) {
            return (
              (c.runBackwards = !0),
              this.staggerTo(a, b, q(this, c), d, e, f, g, h)
            );
          }),
          (s.staggerFromTo = function (a, b, c, d, e, f, g, h, i) {
            return (
              (d.startAt = c),
              this.staggerTo(a, b, q(this, d, c), e, f, g, h, i)
            );
          }),
          (s.call = function (a, b, d, e) {
            return this.add(c.delayedCall(0, a, b, d), e);
          }),
          (s.set = function (a, b, d) {
            return this.add(new c(a, 0, q(this, b, null, !0)), d);
          }),
          (d.exportRoot = function (a, b) {
            (a = a || {}),
              null == a.smoothChildTiming && (a.smoothChildTiming = !0);
            var e,
              f,
              g,
              h,
              i = new d(a),
              j = i._timeline;
            for (
              null == b && (b = !0),
                j._remove(i, !0),
                i._startTime = 0,
                i._rawPrevTime = i._time = i._totalTime = j._time,
                g = j._first;
              g;

            )
              (h = g._next),
                (b && g instanceof c && g.target === g.vars.onComplete) ||
                  ((f = g._startTime - g._delay),
                  0 > f && (e = 1),
                  i.add(g, f)),
                (g = h);
            return j.add(i, 0), e && i.totalDuration(), i;
          }),
          (s.add = function (e, f, g, h) {
            var j,
              k,
              l,
              m,
              n,
              o,
              p = this;
            if (
              ("number" != typeof f && (f = p._parseTimeOrLabel(f, 0, !0, e)),
              !(e instanceof a))
            ) {
              if (e instanceof Array || (e && e.push && i(e))) {
                for (
                  g = g || "normal", h = h || 0, j = f, k = e.length, l = 0;
                  k > l;
                  l++
                )
                  i((m = e[l])) && (m = new d({ tweens: m })),
                    p.add(m, j),
                    "string" != typeof m &&
                      "function" != typeof m &&
                      ("sequence" === g
                        ? (j = m._startTime + m.totalDuration() / m._timeScale)
                        : "start" === g && (m._startTime -= m.delay())),
                    (j += h);
                return p._uncache(!0);
              }
              if ("string" == typeof e) return p.addLabel(e, f);
              if ("function" != typeof e)
                throw (
                  "Cannot add " +
                  e +
                  " into the timeline; it is not a tween, timeline, function, or string."
                );
              e = c.delayedCall(0, e);
            }
            if (
              (b.prototype.add.call(p, e, f),
              (e._time || (!e._duration && e._initted)) &&
                ((j = (p.rawTime() - e._startTime) * e._timeScale),
                (!e._duration ||
                  Math.abs(Math.max(0, Math.min(e.totalDuration(), j))) -
                    e._totalTime >
                    1e-5) &&
                  e.render(j, !1, !1)),
              (p._gc || p._time === p._duration) &&
                !p._paused &&
                p._duration < p.duration())
            )
              for (n = p, o = n.rawTime() > e._startTime; n._timeline; )
                o && n._timeline.smoothChildTiming
                  ? n.totalTime(n._totalTime, !0)
                  : n._gc && n._enabled(!0, !1),
                  (n = n._timeline);
            return p;
          }),
          (s.remove = function (b) {
            if (b instanceof a) {
              this._remove(b, !1);
              var c = (b._timeline = b.vars.useFrames
                ? a._rootFramesTimeline
                : a._rootTimeline);
              return (
                (b._startTime =
                  (b._paused ? b._pauseTime : c._time) -
                  (b._reversed
                    ? b.totalDuration() - b._totalTime
                    : b._totalTime) /
                    b._timeScale),
                this
              );
            }
            if (b instanceof Array || (b && b.push && i(b))) {
              for (var d = b.length; --d > -1; ) this.remove(b[d]);
              return this;
            }
            return "string" == typeof b
              ? this.removeLabel(b)
              : this.kill(null, b);
          }),
          (s._remove = function (a, c) {
            b.prototype._remove.call(this, a, c);
            var d = this._last;
            return (
              d
                ? this._time > this.duration() &&
                  ((this._time = this._duration),
                  (this._totalTime = this._totalDuration))
                : (this._time =
                    this._totalTime =
                    this._duration =
                    this._totalDuration =
                      0),
              this
            );
          }),
          (s.append = function (a, b) {
            return this.add(a, this._parseTimeOrLabel(null, b, !0, a));
          }),
          (s.insert = s.insertMultiple =
            function (a, b, c, d) {
              return this.add(a, b || 0, c, d);
            }),
          (s.appendMultiple = function (a, b, c, d) {
            return this.add(a, this._parseTimeOrLabel(null, b, !0, a), c, d);
          }),
          (s.addLabel = function (a, b) {
            return (this._labels[a] = this._parseTimeOrLabel(b)), this;
          }),
          (s.addPause = function (a, b, d, e) {
            var f = c.delayedCall(0, o, d, e || this);
            return (
              (f.vars.onComplete = f.vars.onReverseComplete = b),
              (f.data = "isPause"),
              (this._hasPause = !0),
              this.add(f, a)
            );
          }),
          (s.removeLabel = function (a) {
            return delete this._labels[a], this;
          }),
          (s.getLabelTime = function (a) {
            return null != this._labels[a] ? this._labels[a] : -1;
          }),
          (s._parseTimeOrLabel = function (b, c, d, e) {
            var f, g;
            if (e instanceof a && e.timeline === this) this.remove(e);
            else if (e && (e instanceof Array || (e.push && i(e))))
              for (g = e.length; --g > -1; )
                e[g] instanceof a &&
                  e[g].timeline === this &&
                  this.remove(e[g]);
            if (
              ((f =
                "number" != typeof b || c
                  ? this.duration() > 99999999999
                    ? this.recent().endTime(!1)
                    : this._duration
                  : 0),
              "string" == typeof c)
            )
              return this._parseTimeOrLabel(
                c,
                d && "number" == typeof b && null == this._labels[c]
                  ? b - f
                  : 0,
                d
              );
            if (
              ((c = c || 0),
              "string" != typeof b || (!isNaN(b) && null == this._labels[b]))
            )
              null == b && (b = f);
            else {
              if (((g = b.indexOf("=")), -1 === g))
                return null == this._labels[b]
                  ? d
                    ? (this._labels[b] = f + c)
                    : c
                  : this._labels[b] + c;
              (c =
                parseInt(b.charAt(g - 1) + "1", 10) * Number(b.substr(g + 1))),
                (b =
                  g > 1 ? this._parseTimeOrLabel(b.substr(0, g - 1), 0, d) : f);
            }
            return Number(b) + c;
          }),
          (s.seek = function (a, b) {
            return this.totalTime(
              "number" == typeof a ? a : this._parseTimeOrLabel(a),
              b !== !1
            );
          }),
          (s.stop = function () {
            return this.paused(!0);
          }),
          (s.gotoAndPlay = function (a, b) {
            return this.play(a, b);
          }),
          (s.gotoAndStop = function (a, b) {
            return this.pause(a, b);
          }),
          (s.render = function (a, b, c) {
            this._gc && this._enabled(!0, !1);
            var d,
              f,
              g,
              h,
              i,
              l,
              m,
              n,
              o = this,
              p = o._time,
              q = o._dirty ? o.totalDuration() : o._totalDuration,
              r = o._startTime,
              s = o._timeScale,
              t = o._paused;
            if ((p !== o._time && (a += o._time - p), a >= q - e && a >= 0))
              (o._totalTime = o._time = q),
                o._reversed ||
                  o._hasPausedChild() ||
                  ((f = !0),
                  (h = "onComplete"),
                  (i = !!o._timeline.autoRemoveChildren),
                  0 === o._duration &&
                    ((0 >= a && a >= -e) ||
                      o._rawPrevTime < 0 ||
                      o._rawPrevTime === e) &&
                    o._rawPrevTime !== a &&
                    o._first &&
                    ((i = !0),
                    o._rawPrevTime > e && (h = "onReverseComplete"))),
                (o._rawPrevTime =
                  o._duration || !b || a || o._rawPrevTime === a ? a : e),
                (a = q + 1e-4);
            else if (e > a)
              if (
                ((o._totalTime = o._time = 0),
                a > -e && (a = 0),
                (0 !== p ||
                  (0 === o._duration &&
                    o._rawPrevTime !== e &&
                    (o._rawPrevTime > 0 || (0 > a && o._rawPrevTime >= 0)))) &&
                  ((h = "onReverseComplete"), (f = o._reversed)),
                0 > a)
              )
                (o._active = !1),
                  o._timeline.autoRemoveChildren && o._reversed
                    ? ((i = f = !0), (h = "onReverseComplete"))
                    : o._rawPrevTime >= 0 && o._first && (i = !0),
                  (o._rawPrevTime = a);
              else {
                if (
                  ((o._rawPrevTime =
                    o._duration || !b || a || o._rawPrevTime === a ? a : e),
                  0 === a && f)
                )
                  for (d = o._first; d && 0 === d._startTime; )
                    d._duration || (f = !1), (d = d._next);
                (a = 0), o._initted || (i = !0);
              }
            else {
              if (o._hasPause && !o._forcingPlayhead && !b) {
                if (a >= p)
                  for (d = o._first; d && d._startTime <= a && !l; )
                    d._duration ||
                      "isPause" !== d.data ||
                      d.ratio ||
                      (0 === d._startTime && 0 === o._rawPrevTime) ||
                      (l = d),
                      (d = d._next);
                else
                  for (d = o._last; d && d._startTime >= a && !l; )
                    d._duration ||
                      ("isPause" === d.data && d._rawPrevTime > 0 && (l = d)),
                      (d = d._prev);
                l &&
                  ((o._time = o._totalTime = a = l._startTime),
                  (n = o._startTime + a / o._timeScale));
              }
              o._totalTime = o._time = o._rawPrevTime = a;
            }
            if ((o._time !== p && o._first) || c || i || l) {
              if (
                (o._initted || (o._initted = !0),
                o._active ||
                  (!o._paused && o._time !== p && a > 0 && (o._active = !0)),
                0 === p &&
                  o.vars.onStart &&
                  ((0 === o._time && o._duration) ||
                    b ||
                    o._callback("onStart")),
                (m = o._time),
                m >= p)
              )
                for (
                  d = o._first;
                  d && ((g = d._next), m === o._time && (!o._paused || t));

                )
                  (d._active || (d._startTime <= m && !d._paused && !d._gc)) &&
                    (l === d && (o.pause(), (o._pauseTime = n)),
                    d._reversed
                      ? d.render(
                          (d._dirty ? d.totalDuration() : d._totalDuration) -
                            (a - d._startTime) * d._timeScale,
                          b,
                          c
                        )
                      : d.render((a - d._startTime) * d._timeScale, b, c)),
                    (d = g);
              else
                for (
                  d = o._last;
                  d && ((g = d._prev), m === o._time && (!o._paused || t));

                ) {
                  if (
                    d._active ||
                    (d._startTime <= p && !d._paused && !d._gc)
                  ) {
                    if (l === d) {
                      for (l = d._prev; l && l.endTime() > o._time; )
                        l.render(
                          l._reversed
                            ? l.totalDuration() -
                                (a - l._startTime) * l._timeScale
                            : (a - l._startTime) * l._timeScale,
                          b,
                          c
                        ),
                          (l = l._prev);
                      (l = null), o.pause(), (o._pauseTime = n);
                    }
                    d._reversed
                      ? d.render(
                          (d._dirty ? d.totalDuration() : d._totalDuration) -
                            (a - d._startTime) * d._timeScale,
                          b,
                          c
                        )
                      : d.render((a - d._startTime) * d._timeScale, b, c);
                  }
                  d = g;
                }
              o._onUpdate && (b || (j.length && k(), o._callback("onUpdate"))),
                h &&
                  (o._gc ||
                    ((r === o._startTime || s !== o._timeScale) &&
                      (0 === o._time || q >= o.totalDuration()) &&
                      (f &&
                        (j.length && k(),
                        o._timeline.autoRemoveChildren && o._enabled(!1, !1),
                        (o._active = !1)),
                      !b && o.vars[h] && o._callback(h))));
            }
          }),
          (s._hasPausedChild = function () {
            for (var a = this._first; a; ) {
              if (a._paused || (a instanceof d && a._hasPausedChild()))
                return !0;
              a = a._next;
            }
            return !1;
          }),
          (s.getChildren = function (a, b, d, e) {
            e = e || -9999999999;
            for (var f = [], g = this._first, h = 0; g; )
              g._startTime < e ||
                (g instanceof c
                  ? b !== !1 && (f[h++] = g)
                  : (d !== !1 && (f[h++] = g),
                    a !== !1 &&
                      ((f = f.concat(g.getChildren(!0, b, d))),
                      (h = f.length)))),
                (g = g._next);
            return f;
          }),
          (s.getTweensOf = function (a, b) {
            var d,
              e,
              f = this._gc,
              g = [],
              h = 0;
            for (
              f && this._enabled(!0, !0), d = c.getTweensOf(a), e = d.length;
              --e > -1;

            )
              (d[e].timeline === this || (b && this._contains(d[e]))) &&
                (g[h++] = d[e]);
            return f && this._enabled(!1, !0), g;
          }),
          (s.recent = function () {
            return this._recent;
          }),
          (s._contains = function (a) {
            for (var b = a.timeline; b; ) {
              if (b === this) return !0;
              b = b.timeline;
            }
            return !1;
          }),
          (s.shiftChildren = function (a, b, c) {
            c = c || 0;
            for (var d, e = this._first, f = this._labels; e; )
              e._startTime >= c && (e._startTime += a), (e = e._next);
            if (b) for (d in f) f[d] >= c && (f[d] += a);
            return this._uncache(!0);
          }),
          (s._kill = function (a, b) {
            if (!a && !b) return this._enabled(!1, !1);
            for (
              var c = b ? this.getTweensOf(b) : this.getChildren(!0, !0, !1),
                d = c.length,
                e = !1;
              --d > -1;

            )
              c[d]._kill(a, b) && (e = !0);
            return e;
          }),
          (s.clear = function (a) {
            var b = this.getChildren(!1, !0, !0),
              c = b.length;
            for (this._time = this._totalTime = 0; --c > -1; )
              b[c]._enabled(!1, !1);
            return a !== !1 && (this._labels = {}), this._uncache(!0);
          }),
          (s.invalidate = function () {
            for (var b = this._first; b; ) b.invalidate(), (b = b._next);
            return a.prototype.invalidate.call(this);
          }),
          (s._enabled = function (a, c) {
            if (a === this._gc)
              for (var d = this._first; d; ) d._enabled(a, !0), (d = d._next);
            return b.prototype._enabled.call(this, a, c);
          }),
          (s.totalTime = function (b, c, d) {
            this._forcingPlayhead = !0;
            var e = a.prototype.totalTime.apply(this, arguments);
            return (this._forcingPlayhead = !1), e;
          }),
          (s.duration = function (a) {
            return arguments.length
              ? (0 !== this.duration() &&
                  0 !== a &&
                  this.timeScale(this._duration / a),
                this)
              : (this._dirty && this.totalDuration(), this._duration);
          }),
          (s.totalDuration = function (a) {
            if (!arguments.length) {
              if (this._dirty) {
                for (
                  var b, c, d = 0, e = this, f = e._last, g = 999999999999;
                  f;

                )
                  (b = f._prev),
                    f._dirty && f.totalDuration(),
                    f._startTime > g &&
                    e._sortChildren &&
                    !f._paused &&
                    !e._calculatingDuration
                      ? ((e._calculatingDuration = 1),
                        e.add(f, f._startTime - f._delay),
                        (e._calculatingDuration = 0))
                      : (g = f._startTime),
                    f._startTime < 0 &&
                      !f._paused &&
                      ((d -= f._startTime),
                      e._timeline.smoothChildTiming &&
                        ((e._startTime += f._startTime / e._timeScale),
                        (e._time -= f._startTime),
                        (e._totalTime -= f._startTime),
                        (e._rawPrevTime -= f._startTime)),
                      e.shiftChildren(-f._startTime, !1, -9999999999),
                      (g = 0)),
                    (c = f._startTime + f._totalDuration / f._timeScale),
                    c > d && (d = c),
                    (f = b);
                (e._duration = e._totalDuration = d), (e._dirty = !1);
              }
              return this._totalDuration;
            }
            return a && this.totalDuration()
              ? this.timeScale(this._totalDuration / a)
              : this;
          }),
          (s.paused = function (b) {
            if (b === !1 && this._paused)
              for (var c = this._first; c; )
                c._startTime === this._time &&
                  "isPause" === c.data &&
                  (c._rawPrevTime = 0),
                  (c = c._next);
            return a.prototype.paused.apply(this, arguments);
          }),
          (s.usesFrames = function () {
            for (var b = this._timeline; b._timeline; ) b = b._timeline;
            return b === a._rootFramesTimeline;
          }),
          (s.rawTime = function (a) {
            return a &&
              (this._paused ||
                (this._repeat && this.time() > 0 && this.totalProgress() < 1))
              ? this._totalTime % (this._duration + this._repeatDelay)
              : this._paused
              ? this._totalTime
              : (this._timeline.rawTime(a) - this._startTime) * this._timeScale;
          }),
          d
        );
      },
      !0
    ),
    _gsScope._gsDefine(
      "TimelineMax",
      ["TimelineLite", "TweenLite", "easing.Ease"],
      function (a, b, c) {
        var d = function (b) {
            a.call(this, b),
              (this._repeat = this.vars.repeat || 0),
              (this._repeatDelay = this.vars.repeatDelay || 0),
              (this._cycle = 0),
              (this._yoyo = !!this.vars.yoyo),
              (this._dirty = !0);
          },
          e = 1e-8,
          f = b._internals,
          g = f.lazyTweens,
          h = f.lazyRender,
          i = _gsScope._gsDefine.globals,
          j = new c(null, null, 1, 0),
          k = (d.prototype = new a());
        return (
          (k.constructor = d),
          (k.kill()._gc = !1),
          (d.version = "2.1.2"),
          (k.invalidate = function () {
            return (
              (this._yoyo = !!this.vars.yoyo),
              (this._repeat = this.vars.repeat || 0),
              (this._repeatDelay = this.vars.repeatDelay || 0),
              this._uncache(!0),
              a.prototype.invalidate.call(this)
            );
          }),
          (k.addCallback = function (a, c, d, e) {
            return this.add(b.delayedCall(0, a, d, e), c);
          }),
          (k.removeCallback = function (a, b) {
            if (a)
              if (null == b) this._kill(null, a);
              else
                for (
                  var c = this.getTweensOf(a, !1),
                    d = c.length,
                    e = this._parseTimeOrLabel(b);
                  --d > -1;

                )
                  c[d]._startTime === e && c[d]._enabled(!1, !1);
            return this;
          }),
          (k.removePause = function (b) {
            return this.removeCallback(a._internals.pauseCallback, b);
          }),
          (k.tweenTo = function (a, c) {
            c = c || {};
            var d,
              e,
              f,
              g = {
                ease: j,
                useFrames: this.usesFrames(),
                immediateRender: !1,
                lazy: !1,
              },
              h = (c.repeat && i.TweenMax) || b;
            for (e in c) g[e] = c[e];
            return (
              (g.time = this._parseTimeOrLabel(a)),
              (d =
                Math.abs(Number(g.time) - this._time) / this._timeScale ||
                0.001),
              (f = new h(this, d, g)),
              (g.onStart = function () {
                f.target.paused(!0),
                  f.vars.time === f.target.time() ||
                    d !== f.duration() ||
                    f.isFromTo ||
                    f
                      .duration(
                        Math.abs(f.vars.time - f.target.time()) /
                          f.target._timeScale
                      )
                      .render(f.time(), !0, !0),
                  c.onStart &&
                    c.onStart.apply(
                      c.onStartScope || c.callbackScope || f,
                      c.onStartParams || []
                    );
              }),
              f
            );
          }),
          (k.tweenFromTo = function (a, b, c) {
            (c = c || {}),
              (a = this._parseTimeOrLabel(a)),
              (c.startAt = {
                onComplete: this.seek,
                onCompleteParams: [a],
                callbackScope: this,
              }),
              (c.immediateRender = c.immediateRender !== !1);
            var d = this.tweenTo(b, c);
            return (
              (d.isFromTo = 1),
              d.duration(Math.abs(d.vars.time - a) / this._timeScale || 0.001)
            );
          }),
          (k.render = function (a, b, c) {
            this._gc && this._enabled(!0, !1);
            var d,
              f,
              i,
              j,
              k,
              l,
              m,
              n,
              o,
              p = this,
              q = p._time,
              r = p._dirty ? p.totalDuration() : p._totalDuration,
              s = p._duration,
              t = p._totalTime,
              u = p._startTime,
              v = p._timeScale,
              w = p._rawPrevTime,
              x = p._paused,
              y = p._cycle;
            if ((q !== p._time && (a += p._time - q), a >= r - e && a >= 0))
              p._locked || ((p._totalTime = r), (p._cycle = p._repeat)),
                p._reversed ||
                  p._hasPausedChild() ||
                  ((f = !0),
                  (j = "onComplete"),
                  (k = !!p._timeline.autoRemoveChildren),
                  0 === p._duration &&
                    ((0 >= a && a >= -e) || 0 > w || w === e) &&
                    w !== a &&
                    p._first &&
                    ((k = !0), w > e && (j = "onReverseComplete"))),
                (p._rawPrevTime =
                  p._duration || !b || a || p._rawPrevTime === a ? a : e),
                p._yoyo && 1 & p._cycle
                  ? (p._time = a = 0)
                  : ((p._time = s), (a = s + 1e-4));
            else if (e > a)
              if (
                (p._locked || (p._totalTime = p._cycle = 0),
                (p._time = 0),
                a > -e && (a = 0),
                (0 !== q ||
                  (0 === s &&
                    w !== e &&
                    (w > 0 || (0 > a && w >= 0)) &&
                    !p._locked)) &&
                  ((j = "onReverseComplete"), (f = p._reversed)),
                0 > a)
              )
                (p._active = !1),
                  p._timeline.autoRemoveChildren && p._reversed
                    ? ((k = f = !0), (j = "onReverseComplete"))
                    : w >= 0 && p._first && (k = !0),
                  (p._rawPrevTime = a);
              else {
                if (
                  ((p._rawPrevTime =
                    s || !b || a || p._rawPrevTime === a ? a : e),
                  0 === a && f)
                )
                  for (d = p._first; d && 0 === d._startTime; )
                    d._duration || (f = !1), (d = d._next);
                (a = 0), p._initted || (k = !0);
              }
            else if (
              (0 === s && 0 > w && (k = !0),
              (p._time = p._rawPrevTime = a),
              p._locked ||
                ((p._totalTime = a),
                0 !== p._repeat &&
                  ((l = s + p._repeatDelay),
                  (p._cycle = (p._totalTime / l) >> 0),
                  p._cycle &&
                    p._cycle === p._totalTime / l &&
                    a >= t &&
                    p._cycle--,
                  (p._time = p._totalTime - p._cycle * l),
                  p._yoyo && 1 & p._cycle && (p._time = s - p._time),
                  p._time > s
                    ? ((p._time = s), (a = s + 1e-4))
                    : p._time < 0
                    ? (p._time = a = 0)
                    : (a = p._time))),
              p._hasPause && !p._forcingPlayhead && !b)
            ) {
              if (((a = p._time), a >= q || (p._repeat && y !== p._cycle)))
                for (d = p._first; d && d._startTime <= a && !m; )
                  d._duration ||
                    "isPause" !== d.data ||
                    d.ratio ||
                    (0 === d._startTime && 0 === p._rawPrevTime) ||
                    (m = d),
                    (d = d._next);
              else
                for (d = p._last; d && d._startTime >= a && !m; )
                  d._duration ||
                    ("isPause" === d.data && d._rawPrevTime > 0 && (m = d)),
                    (d = d._prev);
              m &&
                ((o = p._startTime + m._startTime / p._timeScale),
                m._startTime < s &&
                  ((p._time = p._rawPrevTime = a = m._startTime),
                  (p._totalTime =
                    a + p._cycle * (p._totalDuration + p._repeatDelay))));
            }
            if (p._cycle !== y && !p._locked) {
              var z = p._yoyo && 0 !== (1 & y),
                A = z === (p._yoyo && 0 !== (1 & p._cycle)),
                B = p._totalTime,
                C = p._cycle,
                D = p._rawPrevTime,
                E = p._time;
              if (
                ((p._totalTime = y * s),
                p._cycle < y ? (z = !z) : (p._totalTime += s),
                (p._time = q),
                (p._rawPrevTime = 0 === s ? w - 1e-4 : w),
                (p._cycle = y),
                (p._locked = !0),
                (q = z ? 0 : s),
                p.render(q, b, 0 === s),
                b ||
                  p._gc ||
                  (p.vars.onRepeat &&
                    ((p._cycle = C),
                    (p._locked = !1),
                    p._callback("onRepeat"))),
                q !== p._time)
              )
                return;
              if (
                (A &&
                  ((p._cycle = y),
                  (p._locked = !0),
                  (q = z ? s + 1e-4 : -1e-4),
                  p.render(q, !0, !1)),
                (p._locked = !1),
                p._paused && !x)
              )
                return;
              (p._time = E),
                (p._totalTime = B),
                (p._cycle = C),
                (p._rawPrevTime = D);
            }
            if (!((p._time !== q && p._first) || c || k || m))
              return void (
                t !== p._totalTime &&
                p._onUpdate &&
                (b || p._callback("onUpdate"))
              );
            if (
              (p._initted || (p._initted = !0),
              p._active ||
                (!p._paused && p._totalTime !== t && a > 0 && (p._active = !0)),
              0 === t &&
                p.vars.onStart &&
                ((0 === p._totalTime && p._totalDuration) ||
                  b ||
                  p._callback("onStart")),
              (n = p._time),
              n >= q)
            )
              for (
                d = p._first;
                d && ((i = d._next), n === p._time && (!p._paused || x));

              )
                (d._active ||
                  (d._startTime <= p._time && !d._paused && !d._gc)) &&
                  (m === d && (p.pause(), (p._pauseTime = o)),
                  d._reversed
                    ? d.render(
                        (d._dirty ? d.totalDuration() : d._totalDuration) -
                          (a - d._startTime) * d._timeScale,
                        b,
                        c
                      )
                    : d.render((a - d._startTime) * d._timeScale, b, c)),
                  (d = i);
            else
              for (
                d = p._last;
                d && ((i = d._prev), n === p._time && (!p._paused || x));

              ) {
                if (d._active || (d._startTime <= q && !d._paused && !d._gc)) {
                  if (m === d) {
                    for (m = d._prev; m && m.endTime() > p._time; )
                      m.render(
                        m._reversed
                          ? m.totalDuration() -
                              (a - m._startTime) * m._timeScale
                          : (a - m._startTime) * m._timeScale,
                        b,
                        c
                      ),
                        (m = m._prev);
                    (m = null), p.pause(), (p._pauseTime = o);
                  }
                  d._reversed
                    ? d.render(
                        (d._dirty ? d.totalDuration() : d._totalDuration) -
                          (a - d._startTime) * d._timeScale,
                        b,
                        c
                      )
                    : d.render((a - d._startTime) * d._timeScale, b, c);
                }
                d = i;
              }
            p._onUpdate && (b || (g.length && h(), p._callback("onUpdate"))),
              j &&
                (p._locked ||
                  p._gc ||
                  ((u === p._startTime || v !== p._timeScale) &&
                    (0 === p._time || r >= p.totalDuration()) &&
                    (f &&
                      (g.length && h(),
                      p._timeline.autoRemoveChildren && p._enabled(!1, !1),
                      (p._active = !1)),
                    !b && p.vars[j] && p._callback(j))));
          }),
          (k.getActive = function (a, b, c) {
            var d,
              e,
              f = [],
              g = this.getChildren(a || null == a, b || null == a, !!c),
              h = 0,
              i = g.length;
            for (d = 0; i > d; d++) (e = g[d]), e.isActive() && (f[h++] = e);
            return f;
          }),
          (k.getLabelAfter = function (a) {
            a || (0 !== a && (a = this._time));
            var b,
              c = this.getLabelsArray(),
              d = c.length;
            for (b = 0; d > b; b++) if (c[b].time > a) return c[b].name;
            return null;
          }),
          (k.getLabelBefore = function (a) {
            null == a && (a = this._time);
            for (var b = this.getLabelsArray(), c = b.length; --c > -1; )
              if (b[c].time < a) return b[c].name;
            return null;
          }),
          (k.getLabelsArray = function () {
            var a,
              b = [],
              c = 0;
            for (a in this._labels) b[c++] = { time: this._labels[a], name: a };
            return (
              b.sort(function (a, b) {
                return a.time - b.time;
              }),
              b
            );
          }),
          (k.invalidate = function () {
            return (this._locked = !1), a.prototype.invalidate.call(this);
          }),
          (k.progress = function (a, b) {
            return arguments.length
              ? this.totalTime(
                  this.duration() *
                    (this._yoyo && 0 !== (1 & this._cycle) ? 1 - a : a) +
                    this._cycle * (this._duration + this._repeatDelay),
                  b
                )
              : this._time / this.duration() || 0;
          }),
          (k.totalProgress = function (a, b) {
            return arguments.length
              ? this.totalTime(this.totalDuration() * a, b)
              : this._totalTime / this.totalDuration() || 0;
          }),
          (k.totalDuration = function (b) {
            return arguments.length
              ? -1 !== this._repeat && b
                ? this.timeScale(this.totalDuration() / b)
                : this
              : (this._dirty &&
                  (a.prototype.totalDuration.call(this),
                  (this._totalDuration =
                    -1 === this._repeat
                      ? 999999999999
                      : this._duration * (this._repeat + 1) +
                        this._repeatDelay * this._repeat)),
                this._totalDuration);
          }),
          (k.time = function (a, b) {
            if (!arguments.length) return this._time;
            this._dirty && this.totalDuration();
            var c = this._duration,
              d = this._cycle,
              e = d * (c + this._repeatDelay);
            return (
              a > c && (a = c),
              this.totalTime(
                this._yoyo && 1 & d ? c - a + e : this._repeat ? a + e : a,
                b
              )
            );
          }),
          (k.repeat = function (a) {
            return arguments.length
              ? ((this._repeat = a), this._uncache(!0))
              : this._repeat;
          }),
          (k.repeatDelay = function (a) {
            return arguments.length
              ? ((this._repeatDelay = a), this._uncache(!0))
              : this._repeatDelay;
          }),
          (k.yoyo = function (a) {
            return arguments.length ? ((this._yoyo = a), this) : this._yoyo;
          }),
          (k.currentLabel = function (a) {
            return arguments.length
              ? this.seek(a, !0)
              : this.getLabelBefore(this._time + e);
          }),
          d
        );
      },
      !0
    ),
    (function () {
      var a = 180 / Math.PI,
        b = [],
        c = [],
        d = [],
        e = {},
        f = _gsScope._gsDefine.globals,
        g = function (a, b, c, d) {
          c === d && (c = d - (d - b) / 1e6),
            a === b && (b = a + (c - a) / 1e6),
            (this.a = a),
            (this.b = b),
            (this.c = c),
            (this.d = d),
            (this.da = d - a),
            (this.ca = c - a),
            (this.ba = b - a);
        },
        h =
          ",x,y,z,left,top,right,bottom,marginTop,marginLeft,marginRight,marginBottom,paddingLeft,paddingTop,paddingRight,paddingBottom,backgroundPosition,backgroundPosition_y,",
        i = function (a, b, c, d) {
          var e = { a: a },
            f = {},
            g = {},
            h = { c: d },
            i = (a + b) / 2,
            j = (b + c) / 2,
            k = (c + d) / 2,
            l = (i + j) / 2,
            m = (j + k) / 2,
            n = (m - l) / 8;
          return (
            (e.b = i + (a - i) / 4),
            (f.b = l + n),
            (e.c = f.a = (e.b + f.b) / 2),
            (f.c = g.a = (l + m) / 2),
            (g.b = m - n),
            (h.b = k + (d - k) / 4),
            (g.c = h.a = (g.b + h.b) / 2),
            [e, f, g, h]
          );
        },
        j = function (a, e, f, g, h) {
          var j,
            k,
            l,
            m,
            n,
            o,
            p,
            q,
            r,
            s,
            t,
            u,
            v,
            w = a.length - 1,
            x = 0,
            y = a[0].a;
          for (j = 0; w > j; j++)
            (n = a[x]),
              (k = n.a),
              (l = n.d),
              (m = a[x + 1].d),
              h
                ? ((t = b[j]),
                  (u = c[j]),
                  (v = ((u + t) * e * 0.25) / (g ? 0.5 : d[j] || 0.5)),
                  (o = l - (l - k) * (g ? 0.5 * e : 0 !== t ? v / t : 0)),
                  (p = l + (m - l) * (g ? 0.5 * e : 0 !== u ? v / u : 0)),
                  (q =
                    l - (o + (((p - o) * ((3 * t) / (t + u) + 0.5)) / 4 || 0))))
                : ((o = l - (l - k) * e * 0.5),
                  (p = l + (m - l) * e * 0.5),
                  (q = l - (o + p) / 2)),
              (o += q),
              (p += q),
              (n.c = r = o),
              0 !== j ? (n.b = y) : (n.b = y = n.a + 0.6 * (n.c - n.a)),
              (n.da = l - k),
              (n.ca = r - k),
              (n.ba = y - k),
              f
                ? ((s = i(k, y, r, l)),
                  a.splice(x, 1, s[0], s[1], s[2], s[3]),
                  (x += 4))
                : x++,
              (y = p);
          (n = a[x]),
            (n.b = y),
            (n.c = y + 0.4 * (n.d - y)),
            (n.da = n.d - n.a),
            (n.ca = n.c - n.a),
            (n.ba = y - n.a),
            f &&
              ((s = i(n.a, y, n.c, n.d)),
              a.splice(x, 1, s[0], s[1], s[2], s[3]));
        },
        k = function (a, d, e, f) {
          var h,
            i,
            j,
            k,
            l,
            m,
            n = [];
          if (f)
            for (a = [f].concat(a), i = a.length; --i > -1; )
              "string" == typeof (m = a[i][d]) &&
                "=" === m.charAt(1) &&
                (a[i][d] = f[d] + Number(m.charAt(0) + m.substr(2)));
          if (((h = a.length - 2), 0 > h))
            return (n[0] = new g(a[0][d], 0, 0, a[0][d])), n;
          for (i = 0; h > i; i++)
            (j = a[i][d]),
              (k = a[i + 1][d]),
              (n[i] = new g(j, 0, 0, k)),
              e &&
                ((l = a[i + 2][d]),
                (b[i] = (b[i] || 0) + (k - j) * (k - j)),
                (c[i] = (c[i] || 0) + (l - k) * (l - k)));
          return (n[i] = new g(a[i][d], 0, 0, a[i + 1][d])), n;
        },
        l = function (a, f, g, i, l, m) {
          var n,
            o,
            p,
            q,
            r,
            s,
            t,
            u,
            v = {},
            w = [],
            x = m || a[0];
          (l = "string" == typeof l ? "," + l + "," : h), null == f && (f = 1);
          for (o in a[0]) w.push(o);
          if (a.length > 1) {
            for (u = a[a.length - 1], t = !0, n = w.length; --n > -1; )
              if (((o = w[n]), Math.abs(x[o] - u[o]) > 0.05)) {
                t = !1;
                break;
              }
            t &&
              ((a = a.concat()),
              m && a.unshift(m),
              a.push(a[1]),
              (m = a[a.length - 3]));
          }
          for (b.length = c.length = d.length = 0, n = w.length; --n > -1; )
            (o = w[n]),
              (e[o] = -1 !== l.indexOf("," + o + ",")),
              (v[o] = k(a, o, e[o], m));
          for (n = b.length; --n > -1; )
            (b[n] = Math.sqrt(b[n])), (c[n] = Math.sqrt(c[n]));
          if (!i) {
            for (n = w.length; --n > -1; )
              if (e[o])
                for (p = v[w[n]], s = p.length - 1, q = 0; s > q; q++)
                  (r = p[q + 1].da / c[q] + p[q].da / b[q] || 0),
                    (d[q] = (d[q] || 0) + r * r);
            for (n = d.length; --n > -1; ) d[n] = Math.sqrt(d[n]);
          }
          for (n = w.length, q = g ? 4 : 1; --n > -1; )
            (o = w[n]),
              (p = v[o]),
              j(p, f, g, i, e[o]),
              t && (p.splice(0, q), p.splice(p.length - q, q));
          return v;
        },
        m = function (a, b, c) {
          b = b || "soft";
          var d,
            e,
            f,
            h,
            i,
            j,
            k,
            l,
            m,
            n,
            o,
            p = {},
            q = "cubic" === b ? 3 : 2,
            r = "soft" === b,
            s = [];
          if ((r && c && (a = [c].concat(a)), null == a || a.length < q + 1))
            throw "invalid Bezier data";
          for (m in a[0]) s.push(m);
          for (j = s.length; --j > -1; ) {
            for (
              m = s[j], p[m] = i = [], n = 0, l = a.length, k = 0;
              l > k;
              k++
            )
              (d =
                null == c
                  ? a[k][m]
                  : "string" == typeof (o = a[k][m]) && "=" === o.charAt(1)
                  ? c[m] + Number(o.charAt(0) + o.substr(2))
                  : Number(o)),
                r && k > 1 && l - 1 > k && (i[n++] = (d + i[n - 2]) / 2),
                (i[n++] = d);
            for (l = n - q + 1, n = 0, k = 0; l > k; k += q)
              (d = i[k]),
                (e = i[k + 1]),
                (f = i[k + 2]),
                (h = 2 === q ? 0 : i[k + 3]),
                (i[n++] = o =
                  3 === q
                    ? new g(d, e, f, h)
                    : new g(d, (2 * e + d) / 3, (2 * e + f) / 3, f));
            i.length = n;
          }
          return p;
        },
        n = function (a, b, c) {
          for (
            var d, e, f, g, h, i, j, k, l, m, n, o = 1 / c, p = a.length;
            --p > -1;

          )
            for (
              m = a[p],
                f = m.a,
                g = m.d - f,
                h = m.c - f,
                i = m.b - f,
                d = e = 0,
                k = 1;
              c >= k;
              k++
            )
              (j = o * k),
                (l = 1 - j),
                (d = e - (e = (j * j * g + 3 * l * (j * h + l * i)) * j)),
                (n = p * c + k - 1),
                (b[n] = (b[n] || 0) + d * d);
        },
        o = function (a, b) {
          b = b >> 0 || 6;
          var c,
            d,
            e,
            f,
            g = [],
            h = [],
            i = 0,
            j = 0,
            k = b - 1,
            l = [],
            m = [];
          for (c in a) n(a[c], g, b);
          for (e = g.length, d = 0; e > d; d++)
            (i += Math.sqrt(g[d])),
              (f = d % b),
              (m[f] = i),
              f === k &&
                ((j += i),
                (f = (d / b) >> 0),
                (l[f] = m),
                (h[f] = j),
                (i = 0),
                (m = []));
          return { length: j, lengths: h, segments: l };
        },
        p = _gsScope._gsDefine.plugin({
          propName: "bezier",
          priority: -1,
          version: "1.3.8",
          API: 2,
          global: !0,
          init: function (a, b, c) {
            (this._target = a),
              b instanceof Array && (b = { values: b }),
              (this._func = {}),
              (this._mod = {}),
              (this._props = []),
              (this._timeRes =
                null == b.timeResolution ? 6 : parseInt(b.timeResolution, 10));
            var d,
              e,
              f,
              g,
              h,
              i = b.values || [],
              j = {},
              k = i[0],
              n = b.autoRotate || c.vars.orientToBezier;
            this._autoRotate = n
              ? n instanceof Array
                ? n
                : [["x", "y", "rotation", n === !0 ? 0 : Number(n) || 0]]
              : null;
            for (d in k) this._props.push(d);
            for (f = this._props.length; --f > -1; )
              (d = this._props[f]),
                this._overwriteProps.push(d),
                (e = this._func[d] = "function" == typeof a[d]),
                (j[d] = e
                  ? a[
                      d.indexOf("set") ||
                      "function" != typeof a["get" + d.substr(3)]
                        ? d
                        : "get" + d.substr(3)
                    ]()
                  : parseFloat(a[d])),
                h || (j[d] !== i[0][d] && (h = j));
            if (
              ((this._beziers =
                "cubic" !== b.type &&
                "quadratic" !== b.type &&
                "soft" !== b.type
                  ? l(
                      i,
                      isNaN(b.curviness) ? 1 : b.curviness,
                      !1,
                      "thruBasic" === b.type,
                      b.correlate,
                      h
                    )
                  : m(i, b.type, j)),
              (this._segCount = this._beziers[d].length),
              this._timeRes)
            ) {
              var p = o(this._beziers, this._timeRes);
              (this._length = p.length),
                (this._lengths = p.lengths),
                (this._segments = p.segments),
                (this._l1 = this._li = this._s1 = this._si = 0),
                (this._l2 = this._lengths[0]),
                (this._curSeg = this._segments[0]),
                (this._s2 = this._curSeg[0]),
                (this._prec = 1 / this._curSeg.length);
            }
            if ((n = this._autoRotate))
              for (
                this._initialRotations = [],
                  n[0] instanceof Array || (this._autoRotate = n = [n]),
                  f = n.length;
                --f > -1;

              ) {
                for (g = 0; 3 > g; g++)
                  (d = n[f][g]),
                    (this._func[d] =
                      "function" == typeof a[d]
                        ? a[
                            d.indexOf("set") ||
                            "function" != typeof a["get" + d.substr(3)]
                              ? d
                              : "get" + d.substr(3)
                          ]
                        : !1);
                (d = n[f][2]),
                  (this._initialRotations[f] =
                    (this._func[d]
                      ? this._func[d].call(this._target)
                      : this._target[d]) || 0),
                  this._overwriteProps.push(d);
              }
            return (this._startRatio = c.vars.runBackwards ? 1 : 0), !0;
          },
          set: function (b) {
            var c,
              d,
              e,
              f,
              g,
              h,
              i,
              j,
              k,
              l,
              m = this._segCount,
              n = this._func,
              o = this._target,
              p = b !== this._startRatio;
            if (this._timeRes) {
              if (
                ((k = this._lengths),
                (l = this._curSeg),
                (b *= this._length),
                (e = this._li),
                b > this._l2 && m - 1 > e)
              ) {
                for (j = m - 1; j > e && (this._l2 = k[++e]) <= b; );
                (this._l1 = k[e - 1]),
                  (this._li = e),
                  (this._curSeg = l = this._segments[e]),
                  (this._s2 = l[(this._s1 = this._si = 0)]);
              } else if (b < this._l1 && e > 0) {
                for (; e > 0 && (this._l1 = k[--e]) >= b; );
                0 === e && b < this._l1 ? (this._l1 = 0) : e++,
                  (this._l2 = k[e]),
                  (this._li = e),
                  (this._curSeg = l = this._segments[e]),
                  (this._s1 = l[(this._si = l.length - 1) - 1] || 0),
                  (this._s2 = l[this._si]);
              }
              if (
                ((c = e),
                (b -= this._l1),
                (e = this._si),
                b > this._s2 && e < l.length - 1)
              ) {
                for (j = l.length - 1; j > e && (this._s2 = l[++e]) <= b; );
                (this._s1 = l[e - 1]), (this._si = e);
              } else if (b < this._s1 && e > 0) {
                for (; e > 0 && (this._s1 = l[--e]) >= b; );
                0 === e && b < this._s1 ? (this._s1 = 0) : e++,
                  (this._s2 = l[e]),
                  (this._si = e);
              }
              h =
                (e + (b - this._s1) / (this._s2 - this._s1)) * this._prec || 0;
            } else
              (c = 0 > b ? 0 : b >= 1 ? m - 1 : (m * b) >> 0),
                (h = (b - c * (1 / m)) * m);
            for (d = 1 - h, e = this._props.length; --e > -1; )
              (f = this._props[e]),
                (g = this._beziers[f][c]),
                (i = (h * h * g.da + 3 * d * (h * g.ca + d * g.ba)) * h + g.a),
                this._mod[f] && (i = this._mod[f](i, o)),
                n[f] ? o[f](i) : (o[f] = i);
            if (this._autoRotate) {
              var q,
                r,
                s,
                t,
                u,
                v,
                w,
                x = this._autoRotate;
              for (e = x.length; --e > -1; )
                (f = x[e][2]),
                  (v = x[e][3] || 0),
                  (w = x[e][4] === !0 ? 1 : a),
                  (g = this._beziers[x[e][0]]),
                  (q = this._beziers[x[e][1]]),
                  g &&
                    q &&
                    ((g = g[c]),
                    (q = q[c]),
                    (r = g.a + (g.b - g.a) * h),
                    (t = g.b + (g.c - g.b) * h),
                    (r += (t - r) * h),
                    (t += (g.c + (g.d - g.c) * h - t) * h),
                    (s = q.a + (q.b - q.a) * h),
                    (u = q.b + (q.c - q.b) * h),
                    (s += (u - s) * h),
                    (u += (q.c + (q.d - q.c) * h - u) * h),
                    (i = p
                      ? Math.atan2(u - s, t - r) * w + v
                      : this._initialRotations[e]),
                    this._mod[f] && (i = this._mod[f](i, o)),
                    n[f] ? o[f](i) : (o[f] = i));
            }
          },
        }),
        q = p.prototype;
      (p.bezierThrough = l),
        (p.cubicToQuadratic = i),
        (p._autoCSS = !0),
        (p.quadraticToCubic = function (a, b, c) {
          return new g(a, (2 * b + a) / 3, (2 * b + c) / 3, c);
        }),
        (p._cssRegister = function () {
          var a = f.CSSPlugin;
          if (a) {
            var b = a._internals,
              c = b._parseToProxy,
              d = b._setPluginRatio,
              e = b.CSSPropTween;
            b._registerComplexSpecialProp("bezier", {
              parser: function (a, b, f, g, h, i) {
                b instanceof Array && (b = { values: b }), (i = new p());
                var j,
                  k,
                  l,
                  m = b.values,
                  n = m.length - 1,
                  o = [],
                  q = {};
                if (0 > n) return h;
                for (j = 0; n >= j; j++)
                  (l = c(a, m[j], g, h, i, n !== j)), (o[j] = l.end);
                for (k in b) q[k] = b[k];
                return (
                  (q.values = o),
                  (h = new e(a, "bezier", 0, 0, l.pt, 2)),
                  (h.data = l),
                  (h.plugin = i),
                  (h.setRatio = d),
                  0 === q.autoRotate && (q.autoRotate = !0),
                  !q.autoRotate ||
                    q.autoRotate instanceof Array ||
                    ((j = q.autoRotate === !0 ? 0 : Number(q.autoRotate)),
                    (q.autoRotate =
                      null != l.end.left
                        ? [["left", "top", "rotation", j, !1]]
                        : null != l.end.x
                        ? [["x", "y", "rotation", j, !1]]
                        : !1)),
                  q.autoRotate &&
                    (g._transform || g._enableTransforms(!1),
                    (l.autoRotate = g._target._gsTransform),
                    (l.proxy.rotation = l.autoRotate.rotation || 0),
                    g._overwriteProps.push("rotation")),
                  i._onInitTween(l.proxy, q, g._tween),
                  h
                );
              },
            });
          }
        }),
        (q._mod = function (a) {
          for (var b, c = this._overwriteProps, d = c.length; --d > -1; )
            (b = a[c[d]]), b && "function" == typeof b && (this._mod[c[d]] = b);
        }),
        (q._kill = function (a) {
          var b,
            c,
            d = this._props;
          for (b in this._beziers)
            if (b in a)
              for (
                delete this._beziers[b], delete this._func[b], c = d.length;
                --c > -1;

              )
                d[c] === b && d.splice(c, 1);
          if ((d = this._autoRotate))
            for (c = d.length; --c > -1; ) a[d[c][2]] && d.splice(c, 1);
          return this._super._kill.call(this, a);
        });
    })(),
    _gsScope._gsDefine(
      "plugins.CSSPlugin",
      ["plugins.TweenPlugin", "TweenLite"],
      function (a, b) {
        var c,
          d,
          e,
          f,
          g = function () {
            a.call(this, "css"),
              (this._overwriteProps.length = 0),
              (this.setRatio = g.prototype.setRatio);
          },
          h = _gsScope._gsDefine.globals,
          i = {},
          j = (g.prototype = new a("css"));
        (j.constructor = g),
          (g.version = "2.1.0"),
          (g.API = 2),
          (g.defaultTransformPerspective = 0),
          (g.defaultSkewType = "compensated"),
          (g.defaultSmoothOrigin = !0),
          (j = "px"),
          (g.suffixMap = {
            top: j,
            right: j,
            bottom: j,
            left: j,
            width: j,
            height: j,
            fontSize: j,
            padding: j,
            margin: j,
            perspective: j,
            lineHeight: "",
          });
        var k,
          l,
          m,
          n,
          o,
          p,
          q,
          r,
          s = /(?:\-|\.|\b)(\d|\.|e\-)+/g,
          t = /(?:\d|\-\d|\.\d|\-\.\d|\+=\d|\-=\d|\+=.\d|\-=\.\d)+/g,
          u = /(?:\+=|\-=|\-|\b)[\d\-\.]+[a-zA-Z0-9]*(?:%|\b)/gi,
          v = /(?![+-]?\d*\.?\d+|[+-]|e[+-]\d+)[^0-9]/g,
          w = /(?:\d|\-|\+|=|#|\.)*/g,
          x = /opacity *= *([^)]*)/i,
          y = /opacity:([^;]*)/i,
          z = /alpha\(opacity *=.+?\)/i,
          A = /^(rgb|hsl)/,
          B = /([A-Z])/g,
          C = /-([a-z])/gi,
          D = /(^(?:url\(\"|url\())|(?:(\"\))$|\)$)/gi,
          E = function (a, b) {
            return b.toUpperCase();
          },
          F = /(?:Left|Right|Width)/i,
          G = /(M11|M12|M21|M22)=[\d\-\.e]+/gi,
          H = /progid\:DXImageTransform\.Microsoft\.Matrix\(.+?\)/i,
          I = /,(?=[^\)]*(?:\(|$))/gi,
          J = /[\s,\(]/i,
          K = Math.PI / 180,
          L = 180 / Math.PI,
          M = {},
          N = { style: {} },
          O = _gsScope.document || {
            createElement: function () {
              return N;
            },
          },
          P = function (a, b) {
            return b && O.createElementNS
              ? O.createElementNS(b, a)
              : O.createElement(a);
          },
          Q = P("div"),
          R = P("img"),
          S = (g._internals = { _specialProps: i }),
          T = (_gsScope.navigator || {}).userAgent || "",
          U = (function () {
            var a = T.indexOf("Android"),
              b = P("a");
            return (
              (m =
                -1 !== T.indexOf("Safari") &&
                -1 === T.indexOf("Chrome") &&
                (-1 === a || parseFloat(T.substr(a + 8, 2)) > 3)),
              (o = m && parseFloat(T.substr(T.indexOf("Version/") + 8, 2)) < 6),
              (n = -1 !== T.indexOf("Firefox")),
              (/MSIE ([0-9]{1,}[\.0-9]{0,})/.exec(T) ||
                /Trident\/.*rv:([0-9]{1,}[\.0-9]{0,})/.exec(T)) &&
                (p = parseFloat(RegExp.$1)),
              b
                ? ((b.style.cssText = "top:1px;opacity:.55;"),
                  /^0.55/.test(b.style.opacity))
                : !1
            );
          })(),
          V = function (a) {
            return x.test(
              "string" == typeof a
                ? a
                : (a.currentStyle ? a.currentStyle.filter : a.style.filter) ||
                    ""
            )
              ? parseFloat(RegExp.$1) / 100
              : 1;
          },
          W = function (a) {
            _gsScope.console && console.log(a);
          },
          X = "",
          Y = "",
          Z = function (a, b) {
            b = b || Q;
            var c,
              d,
              e = b.style;
            if (void 0 !== e[a]) return a;
            for (
              a = a.charAt(0).toUpperCase() + a.substr(1),
                c = ["O", "Moz", "ms", "Ms", "Webkit"],
                d = 5;
              --d > -1 && void 0 === e[c[d] + a];

            );
            return d >= 0
              ? ((Y = 3 === d ? "ms" : c[d]),
                (X = "-" + Y.toLowerCase() + "-"),
                Y + a)
              : null;
          },
          $ =
            "undefined" != typeof window
              ? window
              : O.defaultView || { getComputedStyle: function () {} },
          _ = function (a) {
            return $.getComputedStyle(a);
          },
          aa = (g.getStyle = function (a, b, c, d, e) {
            var f;
            return U || "opacity" !== b
              ? (!d && a.style[b]
                  ? (f = a.style[b])
                  : (c = c || _(a))
                  ? (f =
                      c[b] ||
                      c.getPropertyValue(b) ||
                      c.getPropertyValue(b.replace(B, "-$1").toLowerCase()))
                  : a.currentStyle && (f = a.currentStyle[b]),
                null == e ||
                (f && "none" !== f && "auto" !== f && "auto auto" !== f)
                  ? f
                  : e)
              : V(a);
          }),
          ba = (S.convertToPixels = function (a, c, d, e, f) {
            if ("px" === e || (!e && "lineHeight" !== c)) return d;
            if ("auto" === e || !d) return 0;
            var h,
              i,
              j,
              k = F.test(c),
              l = a,
              m = Q.style,
              n = 0 > d,
              o = 1 === d;
            if ((n && (d = -d), o && (d *= 100), "lineHeight" !== c || e))
              if ("%" === e && -1 !== c.indexOf("border"))
                h = (d / 100) * (k ? a.clientWidth : a.clientHeight);
              else {
                if (
                  ((m.cssText =
                    "border:0 solid red;position:" +
                    aa(a, "position") +
                    ";line-height:0;"),
                  "%" !== e &&
                    l.appendChild &&
                    "v" !== e.charAt(0) &&
                    "rem" !== e)
                )
                  m[k ? "borderLeftWidth" : "borderTopWidth"] = d + e;
                else {
                  if (
                    ((l = a.parentNode || O.body),
                    -1 !== aa(l, "display").indexOf("flex") &&
                      (m.position = "absolute"),
                    (i = l._gsCache),
                    (j = b.ticker.frame),
                    i && k && i.time === j)
                  )
                    return (i.width * d) / 100;
                  m[k ? "width" : "height"] = d + e;
                }
                l.appendChild(Q),
                  (h = parseFloat(Q[k ? "offsetWidth" : "offsetHeight"])),
                  l.removeChild(Q),
                  k &&
                    "%" === e &&
                    g.cacheWidths !== !1 &&
                    ((i = l._gsCache = l._gsCache || {}),
                    (i.time = j),
                    (i.width = (h / d) * 100)),
                  0 !== h || f || (h = ba(a, c, d, e, !0));
              }
            else
              (i = _(a).lineHeight),
                (a.style.lineHeight = d),
                (h = parseFloat(_(a).lineHeight)),
                (a.style.lineHeight = i);
            return o && (h /= 100), n ? -h : h;
          }),
          ca = (S.calculateOffset = function (a, b, c) {
            if ("absolute" !== aa(a, "position", c)) return 0;
            var d = "left" === b ? "Left" : "Top",
              e = aa(a, "margin" + d, c);
            return (
              a["offset" + d] - (ba(a, b, parseFloat(e), e.replace(w, "")) || 0)
            );
          }),
          da = function (a, b) {
            var c,
              d,
              e,
              f = {};
            if ((b = b || _(a, null)))
              if ((c = b.length))
                for (; --c > -1; )
                  (e = b[c]),
                    (-1 === e.indexOf("-transform") || Ea === e) &&
                      (f[e.replace(C, E)] = b.getPropertyValue(e));
              else
                for (c in b)
                  (-1 === c.indexOf("Transform") || Da === c) && (f[c] = b[c]);
            else if ((b = a.currentStyle || a.style))
              for (c in b)
                "string" == typeof c &&
                  void 0 === f[c] &&
                  (f[c.replace(C, E)] = b[c]);
            return (
              U || (f.opacity = V(a)),
              (d = Sa(a, b, !1)),
              (f.rotation = d.rotation),
              (f.skewX = d.skewX),
              (f.scaleX = d.scaleX),
              (f.scaleY = d.scaleY),
              (f.x = d.x),
              (f.y = d.y),
              Ga &&
                ((f.z = d.z),
                (f.rotationX = d.rotationX),
                (f.rotationY = d.rotationY),
                (f.scaleZ = d.scaleZ)),
              f.filters && delete f.filters,
              f
            );
          },
          ea = function (a, b, c, d, e) {
            var f,
              g,
              h,
              i = {},
              j = a.style;
            for (g in c)
              "cssText" !== g &&
                "length" !== g &&
                isNaN(g) &&
                (b[g] !== (f = c[g]) || (e && e[g])) &&
                -1 === g.indexOf("Origin") &&
                ("number" == typeof f || "string" == typeof f) &&
                ((i[g] =
                  "auto" !== f || ("left" !== g && "top" !== g)
                    ? ("" !== f && "auto" !== f && "none" !== f) ||
                      "string" != typeof b[g] ||
                      "" === b[g].replace(v, "")
                      ? f
                      : 0
                    : ca(a, g)),
                void 0 !== j[g] && (h = new ta(j, g, j[g], h)));
            if (d) for (g in d) "className" !== g && (i[g] = d[g]);
            return { difs: i, firstMPT: h };
          },
          fa = { width: ["Left", "Right"], height: ["Top", "Bottom"] },
          ga = ["marginLeft", "marginRight", "marginTop", "marginBottom"],
          ha = function (a, b, c) {
            if ("svg" === (a.nodeName + "").toLowerCase())
              return (c || _(a))[b] || 0;
            if (a.getCTM && Pa(a)) return a.getBBox()[b] || 0;
            var d = parseFloat("width" === b ? a.offsetWidth : a.offsetHeight),
              e = fa[b],
              f = e.length;
            for (c = c || _(a, null); --f > -1; )
              (d -= parseFloat(aa(a, "padding" + e[f], c, !0)) || 0),
                (d -= parseFloat(aa(a, "border" + e[f] + "Width", c, !0)) || 0);
            return d;
          },
          ia = function (a, b) {
            if ("contain" === a || "auto" === a || "auto auto" === a)
              return a + " ";
            (null == a || "" === a) && (a = "0 0");
            var c,
              d = a.split(" "),
              e =
                -1 !== a.indexOf("left")
                  ? "0%"
                  : -1 !== a.indexOf("right")
                  ? "100%"
                  : d[0],
              f =
                -1 !== a.indexOf("top")
                  ? "0%"
                  : -1 !== a.indexOf("bottom")
                  ? "100%"
                  : d[1];
            if (d.length > 3 && !b) {
              for (
                d = a.split(", ").join(",").split(","), a = [], c = 0;
                c < d.length;
                c++
              )
                a.push(ia(d[c]));
              return a.join(",");
            }
            return (
              null == f
                ? (f = "center" === e ? "50%" : "0")
                : "center" === f && (f = "50%"),
              ("center" === e ||
                (isNaN(parseFloat(e)) && -1 === (e + "").indexOf("="))) &&
                (e = "50%"),
              (a = e + " " + f + (d.length > 2 ? " " + d[2] : "")),
              b &&
                ((b.oxp = -1 !== e.indexOf("%")),
                (b.oyp = -1 !== f.indexOf("%")),
                (b.oxr = "=" === e.charAt(1)),
                (b.oyr = "=" === f.charAt(1)),
                (b.ox = parseFloat(e.replace(v, ""))),
                (b.oy = parseFloat(f.replace(v, ""))),
                (b.v = a)),
              b || a
            );
          },
          ja = function (a, b) {
            return (
              "function" == typeof a && (a = a(r, q)),
              "string" == typeof a && "=" === a.charAt(1)
                ? parseInt(a.charAt(0) + "1", 10) * parseFloat(a.substr(2))
                : parseFloat(a) - parseFloat(b) || 0
            );
          },
          ka = function (a, b) {
            "function" == typeof a && (a = a(r, q));
            var c = "string" == typeof a && "=" === a.charAt(1);
            return (
              "string" == typeof a &&
                "v" === a.charAt(a.length - 2) &&
                (a =
                  (c ? a.substr(0, 2) : 0) +
                  window[
                    "inner" + ("vh" === a.substr(-2) ? "Height" : "Width")
                  ] *
                    (parseFloat(c ? a.substr(2) : a) / 100)),
              null == a
                ? b
                : c
                ? parseInt(a.charAt(0) + "1", 10) * parseFloat(a.substr(2)) + b
                : parseFloat(a) || 0
            );
          },
          la = function (a, b, c, d) {
            var e,
              f,
              g,
              h,
              i,
              j = 1e-6;
            return (
              "function" == typeof a && (a = a(r, q)),
              null == a
                ? (h = b)
                : "number" == typeof a
                ? (h = a)
                : ((e = 360),
                  (f = a.split("_")),
                  (i = "=" === a.charAt(1)),
                  (g =
                    (i
                      ? parseInt(a.charAt(0) + "1", 10) *
                        parseFloat(f[0].substr(2))
                      : parseFloat(f[0])) *
                      (-1 === a.indexOf("rad") ? 1 : L) -
                    (i ? 0 : b)),
                  f.length &&
                    (d && (d[c] = b + g),
                    -1 !== a.indexOf("short") &&
                      ((g %= e),
                      g !== g % (e / 2) && (g = 0 > g ? g + e : g - e)),
                    -1 !== a.indexOf("_cw") && 0 > g
                      ? (g = ((g + 9999999999 * e) % e) - ((g / e) | 0) * e)
                      : -1 !== a.indexOf("ccw") &&
                        g > 0 &&
                        (g = ((g - 9999999999 * e) % e) - ((g / e) | 0) * e)),
                  (h = b + g)),
              j > h && h > -j && (h = 0),
              h
            );
          },
          ma = {
            aqua: [0, 255, 255],
            lime: [0, 255, 0],
            silver: [192, 192, 192],
            black: [0, 0, 0],
            maroon: [128, 0, 0],
            teal: [0, 128, 128],
            blue: [0, 0, 255],
            navy: [0, 0, 128],
            white: [255, 255, 255],
            fuchsia: [255, 0, 255],
            olive: [128, 128, 0],
            yellow: [255, 255, 0],
            orange: [255, 165, 0],
            gray: [128, 128, 128],
            purple: [128, 0, 128],
            green: [0, 128, 0],
            red: [255, 0, 0],
            pink: [255, 192, 203],
            cyan: [0, 255, 255],
            transparent: [255, 255, 255, 0],
          },
          na = function (a, b, c) {
            return (
              (a = 0 > a ? a + 1 : a > 1 ? a - 1 : a),
              (255 *
                (1 > 6 * a
                  ? b + (c - b) * a * 6
                  : 0.5 > a
                  ? c
                  : 2 > 3 * a
                  ? b + (c - b) * (2 / 3 - a) * 6
                  : b) +
                0.5) |
                0
            );
          },
          oa = (g.parseColor = function (a, b) {
            var c, d, e, f, g, h, i, j, k, l, m;
            if (a)
              if ("number" == typeof a) c = [a >> 16, (a >> 8) & 255, 255 & a];
              else {
                if (
                  ("," === a.charAt(a.length - 1) &&
                    (a = a.substr(0, a.length - 1)),
                  ma[a])
                )
                  c = ma[a];
                else if ("#" === a.charAt(0))
                  4 === a.length &&
                    ((d = a.charAt(1)),
                    (e = a.charAt(2)),
                    (f = a.charAt(3)),
                    (a = "#" + d + d + e + e + f + f)),
                    (a = parseInt(a.substr(1), 16)),
                    (c = [a >> 16, (a >> 8) & 255, 255 & a]);
                else if ("hsl" === a.substr(0, 3))
                  if (((c = m = a.match(s)), b)) {
                    if (-1 !== a.indexOf("=")) return a.match(t);
                  } else
                    (g = (Number(c[0]) % 360) / 360),
                      (h = Number(c[1]) / 100),
                      (i = Number(c[2]) / 100),
                      (e = 0.5 >= i ? i * (h + 1) : i + h - i * h),
                      (d = 2 * i - e),
                      c.length > 3 && (c[3] = Number(c[3])),
                      (c[0] = na(g + 1 / 3, d, e)),
                      (c[1] = na(g, d, e)),
                      (c[2] = na(g - 1 / 3, d, e));
                else c = a.match(s) || ma.transparent;
                (c[0] = Number(c[0])),
                  (c[1] = Number(c[1])),
                  (c[2] = Number(c[2])),
                  c.length > 3 && (c[3] = Number(c[3]));
              }
            else c = ma.black;
            return (
              b &&
                !m &&
                ((d = c[0] / 255),
                (e = c[1] / 255),
                (f = c[2] / 255),
                (j = Math.max(d, e, f)),
                (k = Math.min(d, e, f)),
                (i = (j + k) / 2),
                j === k
                  ? (g = h = 0)
                  : ((l = j - k),
                    (h = i > 0.5 ? l / (2 - j - k) : l / (j + k)),
                    (g =
                      j === d
                        ? (e - f) / l + (f > e ? 6 : 0)
                        : j === e
                        ? (f - d) / l + 2
                        : (d - e) / l + 4),
                    (g *= 60)),
                (c[0] = (g + 0.5) | 0),
                (c[1] = (100 * h + 0.5) | 0),
                (c[2] = (100 * i + 0.5) | 0)),
              c
            );
          }),
          pa = function (a, b) {
            var c,
              d,
              e,
              f = a.match(qa) || [],
              g = 0,
              h = "";
            if (!f.length) return a;
            for (c = 0; c < f.length; c++)
              (d = f[c]),
                (e = a.substr(g, a.indexOf(d, g) - g)),
                (g += e.length + d.length),
                (d = oa(d, b)),
                3 === d.length && d.push(1),
                (h +=
                  e +
                  (b
                    ? "hsla(" + d[0] + "," + d[1] + "%," + d[2] + "%," + d[3]
                    : "rgba(" + d.join(",")) +
                  ")");
            return h + a.substr(g);
          },
          qa =
            "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3}){1,2}\\b";
        for (j in ma) qa += "|" + j + "\\b";
        (qa = new RegExp(qa + ")", "gi")),
          (g.colorStringFilter = function (a) {
            var b,
              c = a[0] + " " + a[1];
            qa.test(c) &&
              ((b = -1 !== c.indexOf("hsl(") || -1 !== c.indexOf("hsla(")),
              (a[0] = pa(a[0], b)),
              (a[1] = pa(a[1], b))),
              (qa.lastIndex = 0);
          }),
          b.defaultStringFilter ||
            (b.defaultStringFilter = g.colorStringFilter);
        var ra = function (a, b, c, d) {
            if (null == a)
              return function (a) {
                return a;
              };
            var e,
              f = b ? (a.match(qa) || [""])[0] : "",
              g = a.split(f).join("").match(u) || [],
              h = a.substr(0, a.indexOf(g[0])),
              i = ")" === a.charAt(a.length - 1) ? ")" : "",
              j = -1 !== a.indexOf(" ") ? " " : ",",
              k = g.length,
              l = k > 0 ? g[0].replace(s, "") : "";
            return k
              ? (e = b
                  ? function (a) {
                      var b, m, n, o;
                      if ("number" == typeof a) a += l;
                      else if (d && I.test(a)) {
                        for (
                          o = a.replace(I, "|").split("|"), n = 0;
                          n < o.length;
                          n++
                        )
                          o[n] = e(o[n]);
                        return o.join(",");
                      }
                      if (
                        ((b = (a.match(qa) || [f])[0]),
                        (m = a.split(b).join("").match(u) || []),
                        (n = m.length),
                        k > n--)
                      )
                        for (; ++n < k; )
                          m[n] = c ? m[((n - 1) / 2) | 0] : g[n];
                      return (
                        h +
                        m.join(j) +
                        j +
                        b +
                        i +
                        (-1 !== a.indexOf("inset") ? " inset" : "")
                      );
                    }
                  : function (a) {
                      var b, f, m;
                      if ("number" == typeof a) a += l;
                      else if (d && I.test(a)) {
                        for (
                          f = a.replace(I, "|").split("|"), m = 0;
                          m < f.length;
                          m++
                        )
                          f[m] = e(f[m]);
                        return f.join(",");
                      }
                      if (((b = a.match(u) || []), (m = b.length), k > m--))
                        for (; ++m < k; )
                          b[m] = c ? b[((m - 1) / 2) | 0] : g[m];
                      return h + b.join(j) + i;
                    })
              : function (a) {
                  return a;
                };
          },
          sa = function (a) {
            return (
              (a = a.split(",")),
              function (b, c, d, e, f, g, h) {
                var i,
                  j = (c + "").split(" ");
                for (h = {}, i = 0; 4 > i; i++)
                  h[a[i]] = j[i] = j[i] || j[((i - 1) / 2) >> 0];
                return e.parse(b, h, f, g);
              }
            );
          },
          ta =
            ((S._setPluginRatio = function (a) {
              this.plugin.setRatio(a);
              for (
                var b,
                  c,
                  d,
                  e,
                  f,
                  g = this.data,
                  h = g.proxy,
                  i = g.firstMPT,
                  j = 1e-6;
                i;

              )
                (b = h[i.v]),
                  i.r ? (b = i.r(b)) : j > b && b > -j && (b = 0),
                  (i.t[i.p] = b),
                  (i = i._next);
              if (
                (g.autoRotate &&
                  (g.autoRotate.rotation = g.mod
                    ? g.mod.call(this._tween, h.rotation, this.t, this._tween)
                    : h.rotation),
                1 === a || 0 === a)
              )
                for (i = g.firstMPT, f = 1 === a ? "e" : "b"; i; ) {
                  if (((c = i.t), c.type)) {
                    if (1 === c.type) {
                      for (e = c.xs0 + c.s + c.xs1, d = 1; d < c.l; d++)
                        e += c["xn" + d] + c["xs" + (d + 1)];
                      c[f] = e;
                    }
                  } else c[f] = c.s + c.xs0;
                  i = i._next;
                }
            }),
            function (a, b, c, d, e) {
              (this.t = a),
                (this.p = b),
                (this.v = c),
                (this.r = e),
                d && ((d._prev = this), (this._next = d));
            }),
          ua =
            ((S._parseToProxy = function (a, b, c, d, e, f) {
              var g,
                h,
                i,
                j,
                k,
                l = d,
                m = {},
                n = {},
                o = c._transform,
                p = M;
              for (
                c._transform = null,
                  M = b,
                  d = k = c.parse(a, b, d, e),
                  M = p,
                  f &&
                    ((c._transform = o),
                    l && ((l._prev = null), l._prev && (l._prev._next = null)));
                d && d !== l;

              ) {
                if (
                  d.type <= 1 &&
                  ((h = d.p),
                  (n[h] = d.s + d.c),
                  (m[h] = d.s),
                  f || ((j = new ta(d, "s", h, j, d.r)), (d.c = 0)),
                  1 === d.type)
                )
                  for (g = d.l; --g > 0; )
                    (i = "xn" + g),
                      (h = d.p + "_" + i),
                      (n[h] = d.data[i]),
                      (m[h] = d[i]),
                      f || (j = new ta(d, i, h, j, d.rxp[i]));
                d = d._next;
              }
              return { proxy: m, end: n, firstMPT: j, pt: k };
            }),
            (S.CSSPropTween = function (a, b, d, e, g, h, i, j, k, l, m) {
              (this.t = a),
                (this.p = b),
                (this.s = d),
                (this.c = e),
                (this.n = i || b),
                a instanceof ua || f.push(this.n),
                (this.r = j ? ("function" == typeof j ? j : Math.round) : j),
                (this.type = h || 0),
                k && ((this.pr = k), (c = !0)),
                (this.b = void 0 === l ? d : l),
                (this.e = void 0 === m ? d + e : m),
                g && ((this._next = g), (g._prev = this));
            })),
          va = function (a, b, c, d, e, f) {
            var g = new ua(a, b, c, d - c, e, -1, f);
            return (g.b = c), (g.e = g.xs0 = d), g;
          },
          wa = (g.parseComplex = function (a, b, c, d, e, f, h, i, j, l) {
            (c = c || f || ""),
              "function" == typeof d && (d = d(r, q)),
              (h = new ua(a, b, 0, 0, h, l ? 2 : 1, null, !1, i, c, d)),
              (d += ""),
              e &&
                qa.test(d + c) &&
                ((d = [c, d]), g.colorStringFilter(d), (c = d[0]), (d = d[1]));
            var m,
              n,
              o,
              p,
              u,
              v,
              w,
              x,
              y,
              z,
              A,
              B,
              C,
              D = c.split(", ").join(",").split(" "),
              E = d.split(", ").join(",").split(" "),
              F = D.length,
              G = k !== !1;
            for (
              (-1 !== d.indexOf(",") || -1 !== c.indexOf(",")) &&
                (-1 !== (d + c).indexOf("rgb") || -1 !== (d + c).indexOf("hsl")
                  ? ((D = D.join(" ").replace(I, ", ").split(" ")),
                    (E = E.join(" ").replace(I, ", ").split(" ")))
                  : ((D = D.join(" ").split(",").join(", ").split(" ")),
                    (E = E.join(" ").split(",").join(", ").split(" "))),
                (F = D.length)),
                F !== E.length && ((D = (f || "").split(" ")), (F = D.length)),
                h.plugin = j,
                h.setRatio = l,
                qa.lastIndex = 0,
                m = 0;
              F > m;
              m++
            )
              if (
                ((p = D[m]), (u = E[m] + ""), (x = parseFloat(p)), x || 0 === x)
              )
                h.appendXtra(
                  "",
                  x,
                  ja(u, x),
                  u.replace(t, ""),
                  G && -1 !== u.indexOf("px") ? Math.round : !1,
                  !0
                );
              else if (e && qa.test(p))
                (B = u.indexOf(")") + 1),
                  (B = ")" + (B ? u.substr(B) : "")),
                  (C = -1 !== u.indexOf("hsl") && U),
                  (z = u),
                  (p = oa(p, C)),
                  (u = oa(u, C)),
                  (y = p.length + u.length > 6),
                  y && !U && 0 === u[3]
                    ? ((h["xs" + h.l] += h.l ? " transparent" : "transparent"),
                      (h.e = h.e.split(E[m]).join("transparent")))
                    : (U || (y = !1),
                      C
                        ? h
                            .appendXtra(
                              z.substr(0, z.indexOf("hsl")) +
                                (y ? "hsla(" : "hsl("),
                              p[0],
                              ja(u[0], p[0]),
                              ",",
                              !1,
                              !0
                            )
                            .appendXtra("", p[1], ja(u[1], p[1]), "%,", !1)
                            .appendXtra(
                              "",
                              p[2],
                              ja(u[2], p[2]),
                              y ? "%," : "%" + B,
                              !1
                            )
                        : h
                            .appendXtra(
                              z.substr(0, z.indexOf("rgb")) +
                                (y ? "rgba(" : "rgb("),
                              p[0],
                              u[0] - p[0],
                              ",",
                              Math.round,
                              !0
                            )
                            .appendXtra("", p[1], u[1] - p[1], ",", Math.round)
                            .appendXtra(
                              "",
                              p[2],
                              u[2] - p[2],
                              y ? "," : B,
                              Math.round
                            ),
                      y &&
                        ((p = p.length < 4 ? 1 : p[3]),
                        h.appendXtra(
                          "",
                          p,
                          (u.length < 4 ? 1 : u[3]) - p,
                          B,
                          !1
                        ))),
                  (qa.lastIndex = 0);
              else if ((v = p.match(s))) {
                if (((w = u.match(t)), !w || w.length !== v.length)) return h;
                for (o = 0, n = 0; n < v.length; n++)
                  (A = v[n]),
                    (z = p.indexOf(A, o)),
                    h.appendXtra(
                      p.substr(o, z - o),
                      Number(A),
                      ja(w[n], A),
                      "",
                      G && "px" === p.substr(z + A.length, 2) ? Math.round : !1,
                      0 === n
                    ),
                    (o = z + A.length);
                h["xs" + h.l] += p.substr(o);
              } else h["xs" + h.l] += h.l || h["xs" + h.l] ? " " + u : u;
            if (-1 !== d.indexOf("=") && h.data) {
              for (B = h.xs0 + h.data.s, m = 1; m < h.l; m++)
                B += h["xs" + m] + h.data["xn" + m];
              h.e = B + h["xs" + m];
            }
            return h.l || ((h.type = -1), (h.xs0 = h.e)), h.xfirst || h;
          }),
          xa = 9;
        for (j = ua.prototype, j.l = j.pr = 0; --xa > 0; )
          (j["xn" + xa] = 0), (j["xs" + xa] = "");
        (j.xs0 = ""),
          (j._next =
            j._prev =
            j.xfirst =
            j.data =
            j.plugin =
            j.setRatio =
            j.rxp =
              null),
          (j.appendXtra = function (a, b, c, d, e, f) {
            var g = this,
              h = g.l;
            return (
              (g["xs" + h] += f && (h || g["xs" + h]) ? " " + a : a || ""),
              c || 0 === h || g.plugin
                ? (g.l++,
                  (g.type = g.setRatio ? 2 : 1),
                  (g["xs" + g.l] = d || ""),
                  h > 0
                    ? ((g.data["xn" + h] = b + c),
                      (g.rxp["xn" + h] = e),
                      (g["xn" + h] = b),
                      g.plugin ||
                        ((g.xfirst = new ua(
                          g,
                          "xn" + h,
                          b,
                          c,
                          g.xfirst || g,
                          0,
                          g.n,
                          e,
                          g.pr
                        )),
                        (g.xfirst.xs0 = 0)),
                      g)
                    : ((g.data = { s: b + c }),
                      (g.rxp = {}),
                      (g.s = b),
                      (g.c = c),
                      (g.r = e),
                      g))
                : ((g["xs" + h] += b + (d || "")), g)
            );
          });
        var ya = function (a, b) {
            (b = b || {}),
              (this.p = b.prefix ? Z(a) || a : a),
              (i[a] = i[this.p] = this),
              (this.format =
                b.formatter ||
                ra(b.defaultValue, b.color, b.collapsible, b.multi)),
              b.parser && (this.parse = b.parser),
              (this.clrs = b.color),
              (this.multi = b.multi),
              (this.keyword = b.keyword),
              (this.dflt = b.defaultValue),
              (this.allowFunc = b.allowFunc),
              (this.pr = b.priority || 0);
          },
          za = (S._registerComplexSpecialProp = function (a, b, c) {
            "object" != typeof b && (b = { parser: c });
            var d,
              e,
              f = a.split(","),
              g = b.defaultValue;
            for (c = c || [g], d = 0; d < f.length; d++)
              (b.prefix = 0 === d && b.prefix),
                (b.defaultValue = c[d] || g),
                (e = new ya(f[d], b));
          }),
          Aa = (S._registerPluginProp = function (a) {
            if (!i[a]) {
              var b = a.charAt(0).toUpperCase() + a.substr(1) + "Plugin";
              za(a, {
                parser: function (a, c, d, e, f, g, j) {
                  var k = h.com.greensock.plugins[b];
                  return k
                    ? (k._cssRegister(), i[d].parse(a, c, d, e, f, g, j))
                    : (W("Error: " + b + " js file not loaded."), f);
                },
              });
            }
          });
        (j = ya.prototype),
          (j.parseComplex = function (a, b, c, d, e, f) {
            var g,
              h,
              i,
              j,
              k,
              l,
              m = this.keyword;
            if (
              (this.multi &&
                (I.test(c) || I.test(b)
                  ? ((h = b.replace(I, "|").split("|")),
                    (i = c.replace(I, "|").split("|")))
                  : m && ((h = [b]), (i = [c]))),
              i)
            ) {
              for (
                j = i.length > h.length ? i.length : h.length, g = 0;
                j > g;
                g++
              )
                (b = h[g] = h[g] || this.dflt),
                  (c = i[g] = i[g] || this.dflt),
                  m &&
                    ((k = b.indexOf(m)),
                    (l = c.indexOf(m)),
                    k !== l &&
                      (-1 === l
                        ? (h[g] = h[g].split(m).join(""))
                        : -1 === k && (h[g] += " " + m)));
              (b = h.join(", ")), (c = i.join(", "));
            }
            return wa(a, this.p, b, c, this.clrs, this.dflt, d, this.pr, e, f);
          }),
          (j.parse = function (a, b, c, d, f, g, h) {
            return this.parseComplex(
              a.style,
              this.format(aa(a, this.p, e, !1, this.dflt)),
              this.format(b),
              f,
              g
            );
          }),
          (g.registerSpecialProp = function (a, b, c) {
            za(a, {
              parser: function (a, d, e, f, g, h, i) {
                var j = new ua(a, e, 0, 0, g, 2, e, !1, c);
                return (j.plugin = h), (j.setRatio = b(a, d, f._tween, e)), j;
              },
              priority: c,
            });
          }),
          (g.useSVGTransformAttr = !0);
        var Ba,
          Ca =
            "scaleX,scaleY,scaleZ,x,y,z,skewX,skewY,rotation,rotationX,rotationY,perspective,xPercent,yPercent".split(
              ","
            ),
          Da = Z("transform"),
          Ea = X + "transform",
          Fa = Z("transformOrigin"),
          Ga = null !== Z("perspective"),
          Ha = (S.Transform = function () {
            (this.perspective = parseFloat(g.defaultTransformPerspective) || 0),
              (this.force3D =
                g.defaultForce3D !== !1 && Ga
                  ? g.defaultForce3D || "auto"
                  : !1);
          }),
          Ia = _gsScope.SVGElement,
          Ja = function (a, b, c) {
            var d,
              e = O.createElementNS("http://www.w3.org/2000/svg", a),
              f = /([a-z])([A-Z])/g;
            for (d in c)
              e.setAttributeNS(null, d.replace(f, "$1-$2").toLowerCase(), c[d]);
            return b.appendChild(e), e;
          },
          Ka = O.documentElement || {},
          La = (function () {
            var a,
              b,
              c,
              d = p || (/Android/i.test(T) && !_gsScope.chrome);
            return (
              O.createElementNS &&
                !d &&
                ((a = Ja("svg", Ka)),
                (b = Ja("rect", a, { width: 100, height: 50, x: 100 })),
                (c = b.getBoundingClientRect().width),
                (b.style[Fa] = "50% 50%"),
                (b.style[Da] = "scaleX(0.5)"),
                (d = c === b.getBoundingClientRect().width && !(n && Ga)),
                Ka.removeChild(a)),
              d
            );
          })(),
          Ma = function (a, b, c, d, e, f) {
            var h,
              i,
              j,
              k,
              l,
              m,
              n,
              o,
              p,
              q,
              r,
              s,
              t,
              u,
              v = a._gsTransform,
              w = Ra(a, !0);
            v && ((t = v.xOrigin), (u = v.yOrigin)),
              (!d || (h = d.split(" ")).length < 2) &&
                ((n = a.getBBox()),
                0 === n.x &&
                  0 === n.y &&
                  n.width + n.height === 0 &&
                  (n = {
                    x:
                      parseFloat(
                        a.hasAttribute("x")
                          ? a.getAttribute("x")
                          : a.hasAttribute("cx")
                          ? a.getAttribute("cx")
                          : 0
                      ) || 0,
                    y:
                      parseFloat(
                        a.hasAttribute("y")
                          ? a.getAttribute("y")
                          : a.hasAttribute("cy")
                          ? a.getAttribute("cy")
                          : 0
                      ) || 0,
                    width: 0,
                    height: 0,
                  }),
                (b = ia(b).split(" ")),
                (h = [
                  (-1 !== b[0].indexOf("%")
                    ? (parseFloat(b[0]) / 100) * n.width
                    : parseFloat(b[0])) + n.x,
                  (-1 !== b[1].indexOf("%")
                    ? (parseFloat(b[1]) / 100) * n.height
                    : parseFloat(b[1])) + n.y,
                ])),
              (c.xOrigin = k = parseFloat(h[0])),
              (c.yOrigin = l = parseFloat(h[1])),
              d &&
                w !== Qa &&
                ((m = w[0]),
                (n = w[1]),
                (o = w[2]),
                (p = w[3]),
                (q = w[4]),
                (r = w[5]),
                (s = m * p - n * o),
                s &&
                  ((i = k * (p / s) + l * (-o / s) + (o * r - p * q) / s),
                  (j = k * (-n / s) + l * (m / s) - (m * r - n * q) / s),
                  (k = c.xOrigin = h[0] = i),
                  (l = c.yOrigin = h[1] = j))),
              v &&
                (f &&
                  ((c.xOffset = v.xOffset), (c.yOffset = v.yOffset), (v = c)),
                e || (e !== !1 && g.defaultSmoothOrigin !== !1)
                  ? ((i = k - t),
                    (j = l - u),
                    (v.xOffset += i * w[0] + j * w[2] - i),
                    (v.yOffset += i * w[1] + j * w[3] - j))
                  : (v.xOffset = v.yOffset = 0)),
              f || a.setAttribute("data-svg-origin", h.join(" "));
          },
          Na = function (a) {
            var b,
              c = P(
                "svg",
                (this.ownerSVGElement &&
                  this.ownerSVGElement.getAttribute("xmlns")) ||
                  "http://www.w3.org/2000/svg"
              ),
              d = this.parentNode,
              e = this.nextSibling,
              f = this.style.cssText;
            if (
              (Ka.appendChild(c),
              c.appendChild(this),
              (this.style.display = "block"),
              a)
            )
              try {
                (b = this.getBBox()),
                  (this._originalGetBBox = this.getBBox),
                  (this.getBBox = Na);
              } catch (g) {}
            else this._originalGetBBox && (b = this._originalGetBBox());
            return (
              e ? d.insertBefore(this, e) : d.appendChild(this),
              Ka.removeChild(c),
              (this.style.cssText = f),
              b
            );
          },
          Oa = function (a) {
            try {
              return a.getBBox();
            } catch (b) {
              return Na.call(a, !0);
            }
          },
          Pa = function (a) {
            return !(
              !Ia ||
              !a.getCTM ||
              (a.parentNode && !a.ownerSVGElement) ||
              !Oa(a)
            );
          },
          Qa = [1, 0, 0, 1, 0, 0],
          Ra = function (a, b) {
            var c,
              d,
              e,
              f,
              g,
              h,
              i,
              j = a._gsTransform || new Ha(),
              k = 1e5,
              l = a.style;
            if (
              (Da
                ? (d = aa(a, Ea, null, !0))
                : a.currentStyle &&
                  ((d = a.currentStyle.filter.match(G)),
                  (d =
                    d && 4 === d.length
                      ? [
                          d[0].substr(4),
                          Number(d[2].substr(4)),
                          Number(d[1].substr(4)),
                          d[3].substr(4),
                          j.x || 0,
                          j.y || 0,
                        ].join(",")
                      : "")),
              (c = !d || "none" === d || "matrix(1, 0, 0, 1, 0, 0)" === d),
              Da &&
                c &&
                !a.offsetParent &&
                ((f = l.display),
                (l.display = "block"),
                (i = a.parentNode),
                (i && a.offsetParent) ||
                  ((g = 1), (h = a.nextSibling), Ka.appendChild(a)),
                (d = aa(a, Ea, null, !0)),
                (c = !d || "none" === d || "matrix(1, 0, 0, 1, 0, 0)" === d),
                f ? (l.display = f) : Wa(l, "display"),
                g &&
                  (h
                    ? i.insertBefore(a, h)
                    : i
                    ? i.appendChild(a)
                    : Ka.removeChild(a))),
              (j.svg || (a.getCTM && Pa(a))) &&
                (c &&
                  -1 !== (l[Da] + "").indexOf("matrix") &&
                  ((d = l[Da]), (c = 0)),
                (e = a.getAttribute("transform")),
                c &&
                  e &&
                  ((e = a.transform.baseVal.consolidate().matrix),
                  (d =
                    "matrix(" +
                    e.a +
                    "," +
                    e.b +
                    "," +
                    e.c +
                    "," +
                    e.d +
                    "," +
                    e.e +
                    "," +
                    e.f +
                    ")"),
                  (c = 0))),
              c)
            )
              return Qa;
            for (e = (d || "").match(s) || [], xa = e.length; --xa > -1; )
              (f = Number(e[xa])),
                (e[xa] = (g = f - (f |= 0))
                  ? ((g * k + (0 > g ? -0.5 : 0.5)) | 0) / k + f
                  : f);
            return b && e.length > 6
              ? [e[0], e[1], e[4], e[5], e[12], e[13]]
              : e;
          },
          Sa = (S.getTransform = function (a, c, d, e) {
            if (a._gsTransform && d && !e) return a._gsTransform;
            var f,
              h,
              i,
              j,
              k,
              l,
              m = d ? a._gsTransform || new Ha() : new Ha(),
              n = m.scaleX < 0,
              o = 2e-5,
              p = 1e5,
              q = Ga
                ? parseFloat(aa(a, Fa, c, !1, "0 0 0").split(" ")[2]) ||
                  m.zOrigin ||
                  0
                : 0,
              r = parseFloat(g.defaultTransformPerspective) || 0;
            if (
              ((m.svg = !(!a.getCTM || !Pa(a))),
              m.svg &&
                (Ma(
                  a,
                  aa(a, Fa, c, !1, "50% 50%") + "",
                  m,
                  a.getAttribute("data-svg-origin")
                ),
                (Ba = g.useSVGTransformAttr || La)),
              (f = Ra(a)),
              f !== Qa)
            ) {
              if (16 === f.length) {
                var s,
                  t,
                  u,
                  v,
                  w,
                  x = f[0],
                  y = f[1],
                  z = f[2],
                  A = f[3],
                  B = f[4],
                  C = f[5],
                  D = f[6],
                  E = f[7],
                  F = f[8],
                  G = f[9],
                  H = f[10],
                  I = f[12],
                  J = f[13],
                  K = f[14],
                  M = f[11],
                  N = Math.atan2(D, H);
                m.zOrigin &&
                  ((K = -m.zOrigin),
                  (I = F * K - f[12]),
                  (J = G * K - f[13]),
                  (K = H * K + m.zOrigin - f[14])),
                  (m.rotationX = N * L),
                  N &&
                    ((v = Math.cos(-N)),
                    (w = Math.sin(-N)),
                    (s = B * v + F * w),
                    (t = C * v + G * w),
                    (u = D * v + H * w),
                    (F = B * -w + F * v),
                    (G = C * -w + G * v),
                    (H = D * -w + H * v),
                    (M = E * -w + M * v),
                    (B = s),
                    (C = t),
                    (D = u)),
                  (N = Math.atan2(-z, H)),
                  (m.rotationY = N * L),
                  N &&
                    ((v = Math.cos(-N)),
                    (w = Math.sin(-N)),
                    (s = x * v - F * w),
                    (t = y * v - G * w),
                    (u = z * v - H * w),
                    (G = y * w + G * v),
                    (H = z * w + H * v),
                    (M = A * w + M * v),
                    (x = s),
                    (y = t),
                    (z = u)),
                  (N = Math.atan2(y, x)),
                  (m.rotation = N * L),
                  N &&
                    ((v = Math.cos(N)),
                    (w = Math.sin(N)),
                    (s = x * v + y * w),
                    (t = B * v + C * w),
                    (u = F * v + G * w),
                    (y = y * v - x * w),
                    (C = C * v - B * w),
                    (G = G * v - F * w),
                    (x = s),
                    (B = t),
                    (F = u)),
                  m.rotationX &&
                    Math.abs(m.rotationX) + Math.abs(m.rotation) > 359.9 &&
                    ((m.rotationX = m.rotation = 0),
                    (m.rotationY = 180 - m.rotationY)),
                  (N = Math.atan2(B, C)),
                  (m.scaleX =
                    ((Math.sqrt(x * x + y * y + z * z) * p + 0.5) | 0) / p),
                  (m.scaleY = ((Math.sqrt(C * C + D * D) * p + 0.5) | 0) / p),
                  (m.scaleZ =
                    ((Math.sqrt(F * F + G * G + H * H) * p + 0.5) | 0) / p),
                  (x /= m.scaleX),
                  (B /= m.scaleY),
                  (y /= m.scaleX),
                  (C /= m.scaleY),
                  Math.abs(N) > o
                    ? ((m.skewX = N * L),
                      (B = 0),
                      "simple" !== m.skewType && (m.scaleY *= 1 / Math.cos(N)))
                    : (m.skewX = 0),
                  (m.perspective = M ? 1 / (0 > M ? -M : M) : 0),
                  (m.x = I),
                  (m.y = J),
                  (m.z = K),
                  m.svg &&
                    ((m.x -= m.xOrigin - (m.xOrigin * x - m.yOrigin * B)),
                    (m.y -= m.yOrigin - (m.yOrigin * y - m.xOrigin * C)));
              } else if (
                !Ga ||
                e ||
                !f.length ||
                m.x !== f[4] ||
                m.y !== f[5] ||
                (!m.rotationX && !m.rotationY)
              ) {
                var O = f.length >= 6,
                  P = O ? f[0] : 1,
                  Q = f[1] || 0,
                  R = f[2] || 0,
                  S = O ? f[3] : 1;
                (m.x = f[4] || 0),
                  (m.y = f[5] || 0),
                  (i = Math.sqrt(P * P + Q * Q)),
                  (j = Math.sqrt(S * S + R * R)),
                  (k = P || Q ? Math.atan2(Q, P) * L : m.rotation || 0),
                  (l = R || S ? Math.atan2(R, S) * L + k : m.skewX || 0),
                  (m.scaleX = i),
                  (m.scaleY = j),
                  (m.rotation = k),
                  (m.skewX = l),
                  Ga &&
                    ((m.rotationX = m.rotationY = m.z = 0),
                    (m.perspective = r),
                    (m.scaleZ = 1)),
                  m.svg &&
                    ((m.x -= m.xOrigin - (m.xOrigin * P + m.yOrigin * R)),
                    (m.y -= m.yOrigin - (m.xOrigin * Q + m.yOrigin * S)));
              }
              Math.abs(m.skewX) > 90 &&
                Math.abs(m.skewX) < 270 &&
                (n
                  ? ((m.scaleX *= -1),
                    (m.skewX += m.rotation <= 0 ? 180 : -180),
                    (m.rotation += m.rotation <= 0 ? 180 : -180))
                  : ((m.scaleY *= -1), (m.skewX += m.skewX <= 0 ? 180 : -180))),
                (m.zOrigin = q);
              for (h in m) m[h] < o && m[h] > -o && (m[h] = 0);
            }
            return (
              d &&
                ((a._gsTransform = m),
                m.svg &&
                  (Ba && a.style[Da]
                    ? b.delayedCall(0.001, function () {
                        Wa(a.style, Da);
                      })
                    : !Ba &&
                      a.getAttribute("transform") &&
                      b.delayedCall(0.001, function () {
                        a.removeAttribute("transform");
                      }))),
              m
            );
          }),
          Ta = function (a) {
            var b,
              c,
              d = this.data,
              e = -d.rotation * K,
              f = e + d.skewX * K,
              g = 1e5,
              h = ((Math.cos(e) * d.scaleX * g) | 0) / g,
              i = ((Math.sin(e) * d.scaleX * g) | 0) / g,
              j = ((Math.sin(f) * -d.scaleY * g) | 0) / g,
              k = ((Math.cos(f) * d.scaleY * g) | 0) / g,
              l = this.t.style,
              m = this.t.currentStyle;
            if (m) {
              (c = i), (i = -j), (j = -c), (b = m.filter), (l.filter = "");
              var n,
                o,
                q = this.t.offsetWidth,
                r = this.t.offsetHeight,
                s = "absolute" !== m.position,
                t =
                  "progid:DXImageTransform.Microsoft.Matrix(M11=" +
                  h +
                  ", M12=" +
                  i +
                  ", M21=" +
                  j +
                  ", M22=" +
                  k,
                u = d.x + (q * d.xPercent) / 100,
                v = d.y + (r * d.yPercent) / 100;
              if (
                (null != d.ox &&
                  ((n = (d.oxp ? q * d.ox * 0.01 : d.ox) - q / 2),
                  (o = (d.oyp ? r * d.oy * 0.01 : d.oy) - r / 2),
                  (u += n - (n * h + o * i)),
                  (v += o - (n * j + o * k))),
                s
                  ? ((n = q / 2),
                    (o = r / 2),
                    (t +=
                      ", Dx=" +
                      (n - (n * h + o * i) + u) +
                      ", Dy=" +
                      (o - (n * j + o * k) + v) +
                      ")"))
                  : (t += ", sizingMethod='auto expand')"),
                -1 !== b.indexOf("DXImageTransform.Microsoft.Matrix(")
                  ? (l.filter = b.replace(H, t))
                  : (l.filter = t + " " + b),
                (0 === a || 1 === a) &&
                  1 === h &&
                  0 === i &&
                  0 === j &&
                  1 === k &&
                  ((s && -1 === t.indexOf("Dx=0, Dy=0")) ||
                    (x.test(b) && 100 !== parseFloat(RegExp.$1)) ||
                    (-1 === b.indexOf(b.indexOf("Alpha")) &&
                      l.removeAttribute("filter"))),
                !s)
              ) {
                var y,
                  z,
                  A,
                  B = 8 > p ? 1 : -1;
                for (
                  n = d.ieOffsetX || 0,
                    o = d.ieOffsetY || 0,
                    d.ieOffsetX = Math.round(
                      (q - ((0 > h ? -h : h) * q + (0 > i ? -i : i) * r)) / 2 +
                        u
                    ),
                    d.ieOffsetY = Math.round(
                      (r - ((0 > k ? -k : k) * r + (0 > j ? -j : j) * q)) / 2 +
                        v
                    ),
                    xa = 0;
                  4 > xa;
                  xa++
                )
                  (z = ga[xa]),
                    (y = m[z]),
                    (c =
                      -1 !== y.indexOf("px")
                        ? parseFloat(y)
                        : ba(this.t, z, parseFloat(y), y.replace(w, "")) || 0),
                    (A =
                      c !== d[z]
                        ? 2 > xa
                          ? -d.ieOffsetX
                          : -d.ieOffsetY
                        : 2 > xa
                        ? n - d.ieOffsetX
                        : o - d.ieOffsetY),
                    (l[z] =
                      (d[z] = Math.round(
                        c - A * (0 === xa || 2 === xa ? 1 : B)
                      )) + "px");
              }
            }
          },
          Ua =
            (S.set3DTransformRatio =
            S.setTransformRatio =
              function (a) {
                var b,
                  c,
                  d,
                  e,
                  f,
                  g,
                  h,
                  i,
                  j,
                  k,
                  l,
                  m,
                  o,
                  p,
                  q,
                  r,
                  s,
                  t,
                  u,
                  v,
                  w,
                  x,
                  y,
                  z = this.data,
                  A = this.t.style,
                  B = z.rotation,
                  C = z.rotationX,
                  D = z.rotationY,
                  E = z.scaleX,
                  F = z.scaleY,
                  G = z.scaleZ,
                  H = z.x,
                  I = z.y,
                  J = z.z,
                  L = z.svg,
                  M = z.perspective,
                  N = z.force3D,
                  O = z.skewY,
                  P = z.skewX;
                if (
                  (O && ((P += O), (B += O)),
                  ((((1 === a || 0 === a) &&
                    "auto" === N &&
                    (this.tween._totalTime === this.tween._totalDuration ||
                      !this.tween._totalTime)) ||
                    !N) &&
                    !J &&
                    !M &&
                    !D &&
                    !C &&
                    1 === G) ||
                    (Ba && L) ||
                    !Ga)
                )
                  return void (B || P || L
                    ? ((B *= K),
                      (x = P * K),
                      (y = 1e5),
                      (c = Math.cos(B) * E),
                      (f = Math.sin(B) * E),
                      (d = Math.sin(B - x) * -F),
                      (g = Math.cos(B - x) * F),
                      x &&
                        "simple" === z.skewType &&
                        ((b = Math.tan(x - O * K)),
                        (b = Math.sqrt(1 + b * b)),
                        (d *= b),
                        (g *= b),
                        O &&
                          ((b = Math.tan(O * K)),
                          (b = Math.sqrt(1 + b * b)),
                          (c *= b),
                          (f *= b))),
                      L &&
                        ((H +=
                          z.xOrigin -
                          (z.xOrigin * c + z.yOrigin * d) +
                          z.xOffset),
                        (I +=
                          z.yOrigin -
                          (z.xOrigin * f + z.yOrigin * g) +
                          z.yOffset),
                        Ba &&
                          (z.xPercent || z.yPercent) &&
                          ((q = this.t.getBBox()),
                          (H += 0.01 * z.xPercent * q.width),
                          (I += 0.01 * z.yPercent * q.height)),
                        (q = 1e-6),
                        q > H && H > -q && (H = 0),
                        q > I && I > -q && (I = 0)),
                      (u =
                        ((c * y) | 0) / y +
                        "," +
                        ((f * y) | 0) / y +
                        "," +
                        ((d * y) | 0) / y +
                        "," +
                        ((g * y) | 0) / y +
                        "," +
                        H +
                        "," +
                        I +
                        ")"),
                      L && Ba
                        ? this.t.setAttribute("transform", "matrix(" + u)
                        : (A[Da] =
                            (z.xPercent || z.yPercent
                              ? "translate(" +
                                z.xPercent +
                                "%," +
                                z.yPercent +
                                "%) matrix("
                              : "matrix(") + u))
                    : (A[Da] =
                        (z.xPercent || z.yPercent
                          ? "translate(" +
                            z.xPercent +
                            "%," +
                            z.yPercent +
                            "%) matrix("
                          : "matrix(") +
                        E +
                        ",0,0," +
                        F +
                        "," +
                        H +
                        "," +
                        I +
                        ")"));
                if (
                  (n &&
                    ((q = 1e-4),
                    q > E && E > -q && (E = G = 2e-5),
                    q > F && F > -q && (F = G = 2e-5),
                    !M || z.z || z.rotationX || z.rotationY || (M = 0)),
                  B || P)
                )
                  (B *= K),
                    (r = c = Math.cos(B)),
                    (s = f = Math.sin(B)),
                    P &&
                      ((B -= P * K),
                      (r = Math.cos(B)),
                      (s = Math.sin(B)),
                      "simple" === z.skewType &&
                        ((b = Math.tan((P - O) * K)),
                        (b = Math.sqrt(1 + b * b)),
                        (r *= b),
                        (s *= b),
                        z.skewY &&
                          ((b = Math.tan(O * K)),
                          (b = Math.sqrt(1 + b * b)),
                          (c *= b),
                          (f *= b)))),
                    (d = -s),
                    (g = r);
                else {
                  if (!(D || C || 1 !== G || M || L))
                    return void (A[Da] =
                      (z.xPercent || z.yPercent
                        ? "translate(" +
                          z.xPercent +
                          "%," +
                          z.yPercent +
                          "%) translate3d("
                        : "translate3d(") +
                      H +
                      "px," +
                      I +
                      "px," +
                      J +
                      "px)" +
                      (1 !== E || 1 !== F
                        ? " scale(" + E + "," + F + ")"
                        : ""));
                  (c = g = 1), (d = f = 0);
                }
                (k = 1),
                  (e = h = i = j = l = m = 0),
                  (o = M ? -1 / M : 0),
                  (p = z.zOrigin),
                  (q = 1e-6),
                  (v = ","),
                  (w = "0"),
                  (B = D * K),
                  B &&
                    ((r = Math.cos(B)),
                    (s = Math.sin(B)),
                    (i = -s),
                    (l = o * -s),
                    (e = c * s),
                    (h = f * s),
                    (k = r),
                    (o *= r),
                    (c *= r),
                    (f *= r)),
                  (B = C * K),
                  B &&
                    ((r = Math.cos(B)),
                    (s = Math.sin(B)),
                    (b = d * r + e * s),
                    (t = g * r + h * s),
                    (j = k * s),
                    (m = o * s),
                    (e = d * -s + e * r),
                    (h = g * -s + h * r),
                    (k *= r),
                    (o *= r),
                    (d = b),
                    (g = t)),
                  1 !== G && ((e *= G), (h *= G), (k *= G), (o *= G)),
                  1 !== F && ((d *= F), (g *= F), (j *= F), (m *= F)),
                  1 !== E && ((c *= E), (f *= E), (i *= E), (l *= E)),
                  (p || L) &&
                    (p && ((H += e * -p), (I += h * -p), (J += k * -p + p)),
                    L &&
                      ((H +=
                        z.xOrigin -
                        (z.xOrigin * c + z.yOrigin * d) +
                        z.xOffset),
                      (I +=
                        z.yOrigin -
                        (z.xOrigin * f + z.yOrigin * g) +
                        z.yOffset)),
                    q > H && H > -q && (H = w),
                    q > I && I > -q && (I = w),
                    q > J && J > -q && (J = 0)),
                  (u =
                    z.xPercent || z.yPercent
                      ? "translate(" +
                        z.xPercent +
                        "%," +
                        z.yPercent +
                        "%) matrix3d("
                      : "matrix3d("),
                  (u +=
                    (q > c && c > -q ? w : c) +
                    v +
                    (q > f && f > -q ? w : f) +
                    v +
                    (q > i && i > -q ? w : i)),
                  (u +=
                    v +
                    (q > l && l > -q ? w : l) +
                    v +
                    (q > d && d > -q ? w : d) +
                    v +
                    (q > g && g > -q ? w : g)),
                  C || D || 1 !== G
                    ? ((u +=
                        v +
                        (q > j && j > -q ? w : j) +
                        v +
                        (q > m && m > -q ? w : m) +
                        v +
                        (q > e && e > -q ? w : e)),
                      (u +=
                        v +
                        (q > h && h > -q ? w : h) +
                        v +
                        (q > k && k > -q ? w : k) +
                        v +
                        (q > o && o > -q ? w : o) +
                        v))
                    : (u += ",0,0,0,0,1,0,"),
                  (u += H + v + I + v + J + v + (M ? 1 + -J / M : 1) + ")"),
                  (A[Da] = u);
              });
        (j = Ha.prototype),
          (j.x =
            j.y =
            j.z =
            j.skewX =
            j.skewY =
            j.rotation =
            j.rotationX =
            j.rotationY =
            j.zOrigin =
            j.xPercent =
            j.yPercent =
            j.xOffset =
            j.yOffset =
              0),
          (j.scaleX = j.scaleY = j.scaleZ = 1),
          za(
            "transform,scale,scaleX,scaleY,scaleZ,x,y,z,rotation,rotationX,rotationY,rotationZ,skewX,skewY,shortRotation,shortRotationX,shortRotationY,shortRotationZ,transformOrigin,svgOrigin,transformPerspective,directionalRotation,parseTransform,force3D,skewType,xPercent,yPercent,smoothOrigin",
            {
              parser: function (a, b, c, d, f, h, i) {
                if (d._lastParsedTransform === i) return f;
                d._lastParsedTransform = i;
                var j = i.scale && "function" == typeof i.scale ? i.scale : 0;
                j && (i.scale = j(r, a));
                var k,
                  l,
                  m,
                  n,
                  o,
                  p,
                  s,
                  t,
                  u,
                  v = a._gsTransform,
                  w = a.style,
                  x = 1e-6,
                  y = Ca.length,
                  z = i,
                  A = {},
                  B = "transformOrigin",
                  C = Sa(a, e, !0, z.parseTransform),
                  D =
                    z.transform &&
                    ("function" == typeof z.transform
                      ? z.transform(r, q)
                      : z.transform);
                if (
                  ((C.skewType = z.skewType || C.skewType || g.defaultSkewType),
                  (d._transform = C),
                  "rotationZ" in z && (z.rotation = z.rotationZ),
                  D && "string" == typeof D && Da)
                )
                  (l = Q.style),
                    (l[Da] = D),
                    (l.display = "block"),
                    (l.position = "absolute"),
                    -1 !== D.indexOf("%") &&
                      ((l.width = aa(a, "width")),
                      (l.height = aa(a, "height"))),
                    O.body.appendChild(Q),
                    (k = Sa(Q, null, !1)),
                    "simple" === C.skewType &&
                      (k.scaleY *= Math.cos(k.skewX * K)),
                    C.svg &&
                      ((p = C.xOrigin),
                      (s = C.yOrigin),
                      (k.x -= C.xOffset),
                      (k.y -= C.yOffset),
                      (z.transformOrigin || z.svgOrigin) &&
                        ((D = {}),
                        Ma(
                          a,
                          ia(z.transformOrigin),
                          D,
                          z.svgOrigin,
                          z.smoothOrigin,
                          !0
                        ),
                        (p = D.xOrigin),
                        (s = D.yOrigin),
                        (k.x -= D.xOffset - C.xOffset),
                        (k.y -= D.yOffset - C.yOffset)),
                      (p || s) &&
                        ((t = Ra(Q, !0)),
                        (k.x -= p - (p * t[0] + s * t[2])),
                        (k.y -= s - (p * t[1] + s * t[3])))),
                    O.body.removeChild(Q),
                    k.perspective || (k.perspective = C.perspective),
                    null != z.xPercent &&
                      (k.xPercent = ka(z.xPercent, C.xPercent)),
                    null != z.yPercent &&
                      (k.yPercent = ka(z.yPercent, C.yPercent));
                else if ("object" == typeof z) {
                  if (
                    ((k = {
                      scaleX: ka(
                        null != z.scaleX ? z.scaleX : z.scale,
                        C.scaleX
                      ),
                      scaleY: ka(
                        null != z.scaleY ? z.scaleY : z.scale,
                        C.scaleY
                      ),
                      scaleZ: ka(z.scaleZ, C.scaleZ),
                      x: ka(z.x, C.x),
                      y: ka(z.y, C.y),
                      z: ka(z.z, C.z),
                      xPercent: ka(z.xPercent, C.xPercent),
                      yPercent: ka(z.yPercent, C.yPercent),
                      perspective: ka(z.transformPerspective, C.perspective),
                    }),
                    (o = z.directionalRotation),
                    null != o)
                  )
                    if ("object" == typeof o) for (l in o) z[l] = o[l];
                    else z.rotation = o;
                  "string" == typeof z.x &&
                    -1 !== z.x.indexOf("%") &&
                    ((k.x = 0), (k.xPercent = ka(z.x, C.xPercent))),
                    "string" == typeof z.y &&
                      -1 !== z.y.indexOf("%") &&
                      ((k.y = 0), (k.yPercent = ka(z.y, C.yPercent))),
                    (k.rotation = la(
                      "rotation" in z
                        ? z.rotation
                        : "shortRotation" in z
                        ? z.shortRotation + "_short"
                        : C.rotation,
                      C.rotation,
                      "rotation",
                      A
                    )),
                    Ga &&
                      ((k.rotationX = la(
                        "rotationX" in z
                          ? z.rotationX
                          : "shortRotationX" in z
                          ? z.shortRotationX + "_short"
                          : C.rotationX || 0,
                        C.rotationX,
                        "rotationX",
                        A
                      )),
                      (k.rotationY = la(
                        "rotationY" in z
                          ? z.rotationY
                          : "shortRotationY" in z
                          ? z.shortRotationY + "_short"
                          : C.rotationY || 0,
                        C.rotationY,
                        "rotationY",
                        A
                      ))),
                    (k.skewX = la(z.skewX, C.skewX)),
                    (k.skewY = la(z.skewY, C.skewY));
                }
                for (
                  Ga &&
                    null != z.force3D &&
                    ((C.force3D = z.force3D), (n = !0)),
                    m =
                      C.force3D ||
                      C.z ||
                      C.rotationX ||
                      C.rotationY ||
                      k.z ||
                      k.rotationX ||
                      k.rotationY ||
                      k.perspective,
                    m || null == z.scale || (k.scaleZ = 1);
                  --y > -1;

                )
                  (u = Ca[y]),
                    (D = k[u] - C[u]),
                    (D > x || -x > D || null != z[u] || null != M[u]) &&
                      ((n = !0),
                      (f = new ua(C, u, C[u], D, f)),
                      u in A && (f.e = A[u]),
                      (f.xs0 = 0),
                      (f.plugin = h),
                      d._overwriteProps.push(f.n));
                return (
                  (D =
                    "function" == typeof z.transformOrigin
                      ? z.transformOrigin(r, q)
                      : z.transformOrigin),
                  C.svg &&
                    (D || z.svgOrigin) &&
                    ((p = C.xOffset),
                    (s = C.yOffset),
                    Ma(a, ia(D), k, z.svgOrigin, z.smoothOrigin),
                    (f = va(
                      C,
                      "xOrigin",
                      (v ? C : k).xOrigin,
                      k.xOrigin,
                      f,
                      B
                    )),
                    (f = va(
                      C,
                      "yOrigin",
                      (v ? C : k).yOrigin,
                      k.yOrigin,
                      f,
                      B
                    )),
                    (p !== C.xOffset || s !== C.yOffset) &&
                      ((f = va(
                        C,
                        "xOffset",
                        v ? p : C.xOffset,
                        C.xOffset,
                        f,
                        B
                      )),
                      (f = va(
                        C,
                        "yOffset",
                        v ? s : C.yOffset,
                        C.yOffset,
                        f,
                        B
                      ))),
                    (D = "0px 0px")),
                  (D || (Ga && m && C.zOrigin)) &&
                    (Da
                      ? ((n = !0),
                        (u = Fa),
                        D ||
                          ((D = (aa(a, u, e, !1, "50% 50%") + "").split(" ")),
                          (D = D[0] + " " + D[1] + " " + C.zOrigin + "px")),
                        (D += ""),
                        (f = new ua(w, u, 0, 0, f, -1, B)),
                        (f.b = w[u]),
                        (f.plugin = h),
                        Ga
                          ? ((l = C.zOrigin),
                            (D = D.split(" ")),
                            (C.zOrigin =
                              (D.length > 2 ? parseFloat(D[2]) : l) || 0),
                            (f.xs0 = f.e =
                              D[0] + " " + (D[1] || "50%") + " 0px"),
                            (f = new ua(C, "zOrigin", 0, 0, f, -1, f.n)),
                            (f.b = l),
                            (f.xs0 = f.e = C.zOrigin))
                          : (f.xs0 = f.e = D))
                      : ia(D + "", C)),
                  n &&
                    (d._transformType =
                      (C.svg && Ba) || (!m && 3 !== this._transformType)
                        ? 2
                        : 3),
                  j && (i.scale = j),
                  f
                );
              },
              allowFunc: !0,
              prefix: !0,
            }
          ),
          za("boxShadow", {
            defaultValue: "0px 0px 0px 0px #999",
            prefix: !0,
            color: !0,
            multi: !0,
            keyword: "inset",
          }),
          za("clipPath", {
            defaultValue: "inset(0px)",
            prefix: !0,
            multi: !0,
            formatter: ra("inset(0px 0px 0px 0px)", !1, !0),
          }),
          za("borderRadius", {
            defaultValue: "0px",
            parser: function (a, b, c, f, g, h) {
              b = this.format(b);
              var i,
                j,
                k,
                l,
                m,
                n,
                o,
                p,
                q,
                r,
                s,
                t,
                u,
                v,
                w,
                x,
                y = [
                  "borderTopLeftRadius",
                  "borderTopRightRadius",
                  "borderBottomRightRadius",
                  "borderBottomLeftRadius",
                ],
                z = a.style;
              for (
                q = parseFloat(a.offsetWidth),
                  r = parseFloat(a.offsetHeight),
                  i = b.split(" "),
                  j = 0;
                j < y.length;
                j++
              )
                this.p.indexOf("border") && (y[j] = Z(y[j])),
                  (m = l = aa(a, y[j], e, !1, "0px")),
                  -1 !== m.indexOf(" ") &&
                    ((l = m.split(" ")), (m = l[0]), (l = l[1])),
                  (n = k = i[j]),
                  (o = parseFloat(m)),
                  (t = m.substr((o + "").length)),
                  (u = "=" === n.charAt(1)),
                  u
                    ? ((p = parseInt(n.charAt(0) + "1", 10)),
                      (n = n.substr(2)),
                      (p *= parseFloat(n)),
                      (s = n.substr((p + "").length - (0 > p ? 1 : 0)) || ""))
                    : ((p = parseFloat(n)), (s = n.substr((p + "").length))),
                  "" === s && (s = d[c] || t),
                  s !== t &&
                    ((v = ba(a, "borderLeft", o, t)),
                    (w = ba(a, "borderTop", o, t)),
                    "%" === s
                      ? ((m = (v / q) * 100 + "%"), (l = (w / r) * 100 + "%"))
                      : "em" === s
                      ? ((x = ba(a, "borderLeft", 1, "em")),
                        (m = v / x + "em"),
                        (l = w / x + "em"))
                      : ((m = v + "px"), (l = w + "px")),
                    u &&
                      ((n = parseFloat(m) + p + s),
                      (k = parseFloat(l) + p + s))),
                  (g = wa(z, y[j], m + " " + l, n + " " + k, !1, "0px", g));
              return g;
            },
            prefix: !0,
            formatter: ra("0px 0px 0px 0px", !1, !0),
          }),
          za(
            "borderBottomLeftRadius,borderBottomRightRadius,borderTopLeftRadius,borderTopRightRadius",
            {
              defaultValue: "0px",
              parser: function (a, b, c, d, f, g) {
                return wa(
                  a.style,
                  c,
                  this.format(aa(a, c, e, !1, "0px 0px")),
                  this.format(b),
                  !1,
                  "0px",
                  f
                );
              },
              prefix: !0,
              formatter: ra("0px 0px", !1, !0),
            }
          ),
          za("backgroundPosition", {
            defaultValue: "0 0",
            parser: function (a, b, c, d, f, g) {
              var h,
                i,
                j,
                k,
                l,
                m,
                n = "background-position",
                o = e || _(a, null),
                q = this.format(
                  (o
                    ? p
                      ? o.getPropertyValue(n + "-x") +
                        " " +
                        o.getPropertyValue(n + "-y")
                      : o.getPropertyValue(n)
                    : a.currentStyle.backgroundPositionX +
                      " " +
                      a.currentStyle.backgroundPositionY) || "0 0"
                ),
                r = this.format(b);
              if (
                (-1 !== q.indexOf("%")) != (-1 !== r.indexOf("%")) &&
                r.split(",").length < 2 &&
                ((m = aa(a, "backgroundImage").replace(D, "")),
                m && "none" !== m)
              ) {
                for (
                  h = q.split(" "),
                    i = r.split(" "),
                    R.setAttribute("src", m),
                    j = 2;
                  --j > -1;

                )
                  (q = h[j]),
                    (k = -1 !== q.indexOf("%")),
                    k !== (-1 !== i[j].indexOf("%")) &&
                      ((l =
                        0 === j
                          ? a.offsetWidth - R.width
                          : a.offsetHeight - R.height),
                      (h[j] = k
                        ? (parseFloat(q) / 100) * l + "px"
                        : (parseFloat(q) / l) * 100 + "%"));
                q = h.join(" ");
              }
              return this.parseComplex(a.style, q, r, f, g);
            },
            formatter: ia,
          }),
          za("backgroundSize", {
            defaultValue: "0 0",
            formatter: function (a) {
              return (
                (a += ""),
                "co" === a.substr(0, 2)
                  ? a
                  : ia(-1 === a.indexOf(" ") ? a + " " + a : a)
              );
            },
          }),
          za("perspective", { defaultValue: "0px", prefix: !0 }),
          za("perspectiveOrigin", { defaultValue: "50% 50%", prefix: !0 }),
          za("transformStyle", { prefix: !0 }),
          za("backfaceVisibility", { prefix: !0 }),
          za("userSelect", { prefix: !0 }),
          za("margin", {
            parser: sa("marginTop,marginRight,marginBottom,marginLeft"),
          }),
          za("padding", {
            parser: sa("paddingTop,paddingRight,paddingBottom,paddingLeft"),
          }),
          za("clip", {
            defaultValue: "rect(0px,0px,0px,0px)",
            parser: function (a, b, c, d, f, g) {
              var h, i, j;
              return (
                9 > p
                  ? ((i = a.currentStyle),
                    (j = 8 > p ? " " : ","),
                    (h =
                      "rect(" +
                      i.clipTop +
                      j +
                      i.clipRight +
                      j +
                      i.clipBottom +
                      j +
                      i.clipLeft +
                      ")"),
                    (b = this.format(b).split(",").join(j)))
                  : ((h = this.format(aa(a, this.p, e, !1, this.dflt))),
                    (b = this.format(b))),
                this.parseComplex(a.style, h, b, f, g)
              );
            },
          }),
          za("textShadow", {
            defaultValue: "0px 0px 0px #999",
            color: !0,
            multi: !0,
          }),
          za("autoRound,strictUnits", {
            parser: function (a, b, c, d, e) {
              return e;
            },
          }),
          za("border", {
            defaultValue: "0px solid #000",
            parser: function (a, b, c, d, f, g) {
              var h = aa(a, "borderTopWidth", e, !1, "0px"),
                i = this.format(b).split(" "),
                j = i[0].replace(w, "");
              return (
                "px" !== j &&
                  (h = parseFloat(h) / ba(a, "borderTopWidth", 1, j) + j),
                this.parseComplex(
                  a.style,
                  this.format(
                    h +
                      " " +
                      aa(a, "borderTopStyle", e, !1, "solid") +
                      " " +
                      aa(a, "borderTopColor", e, !1, "#000")
                  ),
                  i.join(" "),
                  f,
                  g
                )
              );
            },
            color: !0,
            formatter: function (a) {
              var b = a.split(" ");
              return (
                b[0] +
                " " +
                (b[1] || "solid") +
                " " +
                (a.match(qa) || ["#000"])[0]
              );
            },
          }),
          za("borderWidth", {
            parser: sa(
              "borderTopWidth,borderRightWidth,borderBottomWidth,borderLeftWidth"
            ),
          }),
          za("float,cssFloat,styleFloat", {
            parser: function (a, b, c, d, e, f) {
              var g = a.style,
                h = "cssFloat" in g ? "cssFloat" : "styleFloat";
              return new ua(g, h, 0, 0, e, -1, c, !1, 0, g[h], b);
            },
          });
        var Va = function (a) {
          var b,
            c = this.t,
            d = c.filter || aa(this.data, "filter") || "",
            e = (this.s + this.c * a) | 0;
          100 === e &&
            (-1 === d.indexOf("atrix(") &&
            -1 === d.indexOf("radient(") &&
            -1 === d.indexOf("oader(")
              ? (c.removeAttribute("filter"), (b = !aa(this.data, "filter")))
              : ((c.filter = d.replace(z, "")), (b = !0))),
            b ||
              (this.xn1 && (c.filter = d = d || "alpha(opacity=" + e + ")"),
              -1 === d.indexOf("pacity")
                ? (0 === e && this.xn1) ||
                  (c.filter = d + " alpha(opacity=" + e + ")")
                : (c.filter = d.replace(x, "opacity=" + e)));
        };
        za("opacity,alpha,autoAlpha", {
          defaultValue: "1",
          parser: function (a, b, c, d, f, g) {
            var h = parseFloat(aa(a, "opacity", e, !1, "1")),
              i = a.style,
              j = "autoAlpha" === c;
            return (
              "string" == typeof b &&
                "=" === b.charAt(1) &&
                (b =
                  ("-" === b.charAt(0) ? -1 : 1) * parseFloat(b.substr(2)) + h),
              j &&
                1 === h &&
                "hidden" === aa(a, "visibility", e) &&
                0 !== b &&
                (h = 0),
              U
                ? (f = new ua(i, "opacity", h, b - h, f))
                : ((f = new ua(i, "opacity", 100 * h, 100 * (b - h), f)),
                  (f.xn1 = j ? 1 : 0),
                  (i.zoom = 1),
                  (f.type = 2),
                  (f.b = "alpha(opacity=" + f.s + ")"),
                  (f.e = "alpha(opacity=" + (f.s + f.c) + ")"),
                  (f.data = a),
                  (f.plugin = g),
                  (f.setRatio = Va)),
              j &&
                ((f = new ua(
                  i,
                  "visibility",
                  0,
                  0,
                  f,
                  -1,
                  null,
                  !1,
                  0,
                  0 !== h ? "inherit" : "hidden",
                  0 === b ? "hidden" : "inherit"
                )),
                (f.xs0 = "inherit"),
                d._overwriteProps.push(f.n),
                d._overwriteProps.push(c)),
              f
            );
          },
        });
        var Wa = function (a, b) {
            b &&
              (a.removeProperty
                ? (("ms" === b.substr(0, 2) || "webkit" === b.substr(0, 6)) &&
                    (b = "-" + b),
                  a.removeProperty(b.replace(B, "-$1").toLowerCase()))
                : a.removeAttribute(b));
          },
          Xa = function (a) {
            if (((this.t._gsClassPT = this), 1 === a || 0 === a)) {
              this.t.setAttribute("class", 0 === a ? this.b : this.e);
              for (var b = this.data, c = this.t.style; b; )
                b.v ? (c[b.p] = b.v) : Wa(c, b.p), (b = b._next);
              1 === a &&
                this.t._gsClassPT === this &&
                (this.t._gsClassPT = null);
            } else
              this.t.getAttribute("class") !== this.e &&
                this.t.setAttribute("class", this.e);
          };
        za("className", {
          parser: function (a, b, d, f, g, h, i) {
            var j,
              k,
              l,
              m,
              n,
              o = a.getAttribute("class") || "",
              p = a.style.cssText;
            if (
              ((g = f._classNamePT = new ua(a, d, 0, 0, g, 2)),
              (g.setRatio = Xa),
              (g.pr = -11),
              (c = !0),
              (g.b = o),
              (k = da(a, e)),
              (l = a._gsClassPT))
            ) {
              for (m = {}, n = l.data; n; ) (m[n.p] = 1), (n = n._next);
              l.setRatio(1);
            }
            return (
              (a._gsClassPT = g),
              (g.e =
                "=" !== b.charAt(1)
                  ? b
                  : o.replace(
                      new RegExp("(?:\\s|^)" + b.substr(2) + "(?![\\w-])"),
                      ""
                    ) + ("+" === b.charAt(0) ? " " + b.substr(2) : "")),
              a.setAttribute("class", g.e),
              (j = ea(a, k, da(a), i, m)),
              a.setAttribute("class", o),
              (g.data = j.firstMPT),
              (a.style.cssText = p),
              (g = g.xfirst = f.parse(a, j.difs, g, h))
            );
          },
        });
        var Ya = function (a) {
          if (
            (1 === a || 0 === a) &&
            this.data._totalTime === this.data._totalDuration &&
            "isFromStart" !== this.data.data
          ) {
            var b,
              c,
              d,
              e,
              f,
              g = this.t.style,
              h = i.transform.parse;
            if ("all" === this.e) (g.cssText = ""), (e = !0);
            else
              for (
                b = this.e.split(" ").join("").split(","), d = b.length;
                --d > -1;

              )
                (c = b[d]),
                  i[c] &&
                    (i[c].parse === h
                      ? (e = !0)
                      : (c = "transformOrigin" === c ? Fa : i[c].p)),
                  Wa(g, c);
            e &&
              (Wa(g, Da),
              (f = this.t._gsTransform),
              f &&
                (f.svg &&
                  (this.t.removeAttribute("data-svg-origin"),
                  this.t.removeAttribute("transform")),
                delete this.t._gsTransform));
          }
        };
        for (
          za("clearProps", {
            parser: function (a, b, d, e, f) {
              return (
                (f = new ua(a, d, 0, 0, f, 2)),
                (f.setRatio = Ya),
                (f.e = b),
                (f.pr = -10),
                (f.data = e._tween),
                (c = !0),
                f
              );
            },
          }),
            j = "bezier,throwProps,physicsProps,physics2D".split(","),
            xa = j.length;
          xa--;

        )
          Aa(j[xa]);
        (j = g.prototype),
          (j._firstPT = j._lastParsedTransform = j._transform = null),
          (j._onInitTween = function (a, b, h, j) {
            if (!a.nodeType) return !1;
            (this._target = q = a),
              (this._tween = h),
              (this._vars = b),
              (r = j),
              (k = b.autoRound),
              (c = !1),
              (d = b.suffixMap || g.suffixMap),
              (e = _(a, "")),
              (f = this._overwriteProps);
            var n,
              p,
              s,
              t,
              u,
              v,
              w,
              x,
              z,
              A = a.style;
            if (
              (l &&
                "" === A.zIndex &&
                ((n = aa(a, "zIndex", e)),
                ("auto" === n || "" === n) && this._addLazySet(A, "zIndex", 0)),
              "string" == typeof b &&
                ((t = A.cssText),
                (n = da(a, e)),
                (A.cssText = t + ";" + b),
                (n = ea(a, n, da(a)).difs),
                !U && y.test(b) && (n.opacity = parseFloat(RegExp.$1)),
                (b = n),
                (A.cssText = t)),
              b.className
                ? (this._firstPT = p =
                    i.className.parse(
                      a,
                      b.className,
                      "className",
                      this,
                      null,
                      null,
                      b
                    ))
                : (this._firstPT = p = this.parse(a, b, null)),
              this._transformType)
            ) {
              for (
                z = 3 === this._transformType,
                  Da
                    ? m &&
                      ((l = !0),
                      "" === A.zIndex &&
                        ((w = aa(a, "zIndex", e)),
                        ("auto" === w || "" === w) &&
                          this._addLazySet(A, "zIndex", 0)),
                      o &&
                        this._addLazySet(
                          A,
                          "WebkitBackfaceVisibility",
                          this._vars.WebkitBackfaceVisibility ||
                            (z ? "visible" : "hidden")
                        ))
                    : (A.zoom = 1),
                  s = p;
                s && s._next;

              )
                s = s._next;
              (x = new ua(a, "transform", 0, 0, null, 2)),
                this._linkCSSP(x, null, s),
                (x.setRatio = Da ? Ua : Ta),
                (x.data = this._transform || Sa(a, e, !0)),
                (x.tween = h),
                (x.pr = -1),
                f.pop();
            }
            if (c) {
              for (; p; ) {
                for (v = p._next, s = t; s && s.pr > p.pr; ) s = s._next;
                (p._prev = s ? s._prev : u) ? (p._prev._next = p) : (t = p),
                  (p._next = s) ? (s._prev = p) : (u = p),
                  (p = v);
              }
              this._firstPT = t;
            }
            return !0;
          }),
          (j.parse = function (a, b, c, f) {
            var g,
              h,
              j,
              l,
              m,
              n,
              o,
              p,
              s,
              t,
              u = a.style;
            for (g in b) {
              if (
                ((n = b[g]),
                (h = i[g]),
                "function" != typeof n || (h && h.allowFunc) || (n = n(r, q)),
                h)
              )
                c = h.parse(a, n, g, this, c, f, b);
              else {
                if ("--" === g.substr(0, 2)) {
                  this._tween._propLookup[g] = this._addTween.call(
                    this._tween,
                    a.style,
                    "setProperty",
                    _(a).getPropertyValue(g) + "",
                    n + "",
                    g,
                    !1,
                    g
                  );
                  continue;
                }
                (m = aa(a, g, e) + ""),
                  (s = "string" == typeof n),
                  "color" === g ||
                  "fill" === g ||
                  "stroke" === g ||
                  -1 !== g.indexOf("Color") ||
                  (s && A.test(n))
                    ? (s ||
                        ((n = oa(n)),
                        (n =
                          (n.length > 3 ? "rgba(" : "rgb(") +
                          n.join(",") +
                          ")")),
                      (c = wa(u, g, m, n, !0, "transparent", c, 0, f)))
                    : s && J.test(n)
                    ? (c = wa(u, g, m, n, !0, null, c, 0, f))
                    : ((j = parseFloat(m)),
                      (o = j || 0 === j ? m.substr((j + "").length) : ""),
                      ("" === m || "auto" === m) &&
                        ("width" === g || "height" === g
                          ? ((j = ha(a, g, e)), (o = "px"))
                          : "left" === g || "top" === g
                          ? ((j = ca(a, g, e)), (o = "px"))
                          : ((j = "opacity" !== g ? 0 : 1), (o = ""))),
                      (t = s && "=" === n.charAt(1)),
                      t
                        ? ((l = parseInt(n.charAt(0) + "1", 10)),
                          (n = n.substr(2)),
                          (l *= parseFloat(n)),
                          (p = n.replace(w, "")))
                        : ((l = parseFloat(n)),
                          (p = s ? n.replace(w, "") : "")),
                      "" === p && (p = g in d ? d[g] : o),
                      (n = l || 0 === l ? (t ? l + j : l) + p : b[g]),
                      o !== p &&
                        ("" !== p || "lineHeight" === g) &&
                        (l || 0 === l) &&
                        j &&
                        ((j = ba(a, g, j, o)),
                        "%" === p
                          ? ((j /= ba(a, g, 100, "%") / 100),
                            b.strictUnits !== !0 && (m = j + "%"))
                          : "em" === p ||
                            "rem" === p ||
                            "vw" === p ||
                            "vh" === p
                          ? (j /= ba(a, g, 1, p))
                          : "px" !== p && ((l = ba(a, g, l, p)), (p = "px")),
                        t && (l || 0 === l) && (n = l + j + p)),
                      t && (l += j),
                      (!j && 0 !== j) || (!l && 0 !== l)
                        ? void 0 !== u[g] &&
                          (n || (n + "" != "NaN" && null != n))
                          ? ((c = new ua(
                              u,
                              g,
                              l || j || 0,
                              0,
                              c,
                              -1,
                              g,
                              !1,
                              0,
                              m,
                              n
                            )),
                            (c.xs0 =
                              "none" !== n ||
                              ("display" !== g && -1 === g.indexOf("Style"))
                                ? n
                                : m))
                          : W("invalid " + g + " tween value: " + b[g])
                        : ((c = new ua(
                            u,
                            g,
                            j,
                            l - j,
                            c,
                            0,
                            g,
                            k !== !1 && ("px" === p || "zIndex" === g),
                            0,
                            m,
                            n
                          )),
                          (c.xs0 = p)));
              }
              f && c && !c.plugin && (c.plugin = f);
            }
            return c;
          }),
          (j.setRatio = function (a) {
            var b,
              c,
              d,
              e = this._firstPT,
              f = 1e-6;
            if (
              1 !== a ||
              (this._tween._time !== this._tween._duration &&
                0 !== this._tween._time)
            )
              if (
                a ||
                (this._tween._time !== this._tween._duration &&
                  0 !== this._tween._time) ||
                this._tween._rawPrevTime === -1e-6
              )
                for (; e; ) {
                  if (
                    ((b = e.c * a + e.s),
                    e.r ? (b = e.r(b)) : f > b && b > -f && (b = 0),
                    e.type)
                  )
                    if (1 === e.type)
                      if (((d = e.l), 2 === d))
                        e.t[e.p] = e.xs0 + b + e.xs1 + e.xn1 + e.xs2;
                      else if (3 === d)
                        e.t[e.p] =
                          e.xs0 + b + e.xs1 + e.xn1 + e.xs2 + e.xn2 + e.xs3;
                      else if (4 === d)
                        e.t[e.p] =
                          e.xs0 +
                          b +
                          e.xs1 +
                          e.xn1 +
                          e.xs2 +
                          e.xn2 +
                          e.xs3 +
                          e.xn3 +
                          e.xs4;
                      else if (5 === d)
                        e.t[e.p] =
                          e.xs0 +
                          b +
                          e.xs1 +
                          e.xn1 +
                          e.xs2 +
                          e.xn2 +
                          e.xs3 +
                          e.xn3 +
                          e.xs4 +
                          e.xn4 +
                          e.xs5;
                      else {
                        for (c = e.xs0 + b + e.xs1, d = 1; d < e.l; d++)
                          c += e["xn" + d] + e["xs" + (d + 1)];
                        e.t[e.p] = c;
                      }
                    else
                      -1 === e.type
                        ? (e.t[e.p] = e.xs0)
                        : e.setRatio && e.setRatio(a);
                  else e.t[e.p] = b + e.xs0;
                  e = e._next;
                }
              else
                for (; e; )
                  2 !== e.type ? (e.t[e.p] = e.b) : e.setRatio(a),
                    (e = e._next);
            else
              for (; e; ) {
                if (2 !== e.type)
                  if (e.r && -1 !== e.type)
                    if (((b = e.r(e.s + e.c)), e.type)) {
                      if (1 === e.type) {
                        for (
                          d = e.l, c = e.xs0 + b + e.xs1, d = 1;
                          d < e.l;
                          d++
                        )
                          c += e["xn" + d] + e["xs" + (d + 1)];
                        e.t[e.p] = c;
                      }
                    } else e.t[e.p] = b + e.xs0;
                  else e.t[e.p] = e.e;
                else e.setRatio(a);
                e = e._next;
              }
          }),
          (j._enableTransforms = function (a) {
            (this._transform = this._transform || Sa(this._target, e, !0)),
              (this._transformType =
                (this._transform.svg && Ba) || (!a && 3 !== this._transformType)
                  ? 2
                  : 3);
          });
        var Za = function (a) {
          (this.t[this.p] = this.e),
            this.data._linkCSSP(this, this._next, null, !0);
        };
        (j._addLazySet = function (a, b, c) {
          var d = (this._firstPT = new ua(a, b, 0, 0, this._firstPT, 2));
          (d.e = c), (d.setRatio = Za), (d.data = this);
        }),
          (j._linkCSSP = function (a, b, c, d) {
            return (
              a &&
                (b && (b._prev = a),
                a._next && (a._next._prev = a._prev),
                a._prev
                  ? (a._prev._next = a._next)
                  : this._firstPT === a &&
                    ((this._firstPT = a._next), (d = !0)),
                c
                  ? (c._next = a)
                  : d || null !== this._firstPT || (this._firstPT = a),
                (a._next = b),
                (a._prev = c)),
              a
            );
          }),
          (j._mod = function (a) {
            for (var b = this._firstPT; b; )
              "function" == typeof a[b.p] && (b.r = a[b.p]), (b = b._next);
          }),
          (j._kill = function (b) {
            var c,
              d,
              e,
              f = b;
            if (b.autoAlpha || b.alpha) {
              f = {};
              for (d in b) f[d] = b[d];
              (f.opacity = 1), f.autoAlpha && (f.visibility = 1);
            }
            for (
              b.className &&
                (c = this._classNamePT) &&
                ((e = c.xfirst),
                e && e._prev
                  ? this._linkCSSP(e._prev, c._next, e._prev._prev)
                  : e === this._firstPT && (this._firstPT = c._next),
                c._next && this._linkCSSP(c._next, c._next._next, e._prev),
                (this._classNamePT = null)),
                c = this._firstPT;
              c;

            )
              c.plugin &&
                c.plugin !== d &&
                c.plugin._kill &&
                (c.plugin._kill(b), (d = c.plugin)),
                (c = c._next);
            return a.prototype._kill.call(this, f);
          });
        var $a = function (a, b, c) {
          var d, e, f, g;
          if (a.slice) for (e = a.length; --e > -1; ) $a(a[e], b, c);
          else
            for (d = a.childNodes, e = d.length; --e > -1; )
              (f = d[e]),
                (g = f.type),
                f.style && (b.push(da(f)), c && c.push(f)),
                (1 !== g && 9 !== g && 11 !== g) ||
                  !f.childNodes.length ||
                  $a(f, b, c);
        };
        return (
          (g.cascadeTo = function (a, c, d) {
            var e,
              f,
              g,
              h,
              i = b.to(a, c, d),
              j = [i],
              k = [],
              l = [],
              m = [],
              n = b._internals.reservedProps;
            for (
              a = i._targets || i.target,
                $a(a, k, m),
                i.render(c, !0, !0),
                $a(a, l),
                i.render(0, !0, !0),
                i._enabled(!0),
                e = m.length;
              --e > -1;

            )
              if (((f = ea(m[e], k[e], l[e])), f.firstMPT)) {
                f = f.difs;
                for (g in d) n[g] && (f[g] = d[g]);
                h = {};
                for (g in f) h[g] = k[e][g];
                j.push(b.fromTo(m[e], c, h, f));
              }
            return j;
          }),
          a.activate([g]),
          g
        );
      },
      !0
    ),
    (function () {
      var a = _gsScope._gsDefine.plugin({
          propName: "roundProps",
          version: "1.7.0",
          priority: -1,
          API: 2,
          init: function (a, b, c) {
            return (this._tween = c), !0;
          },
        }),
        b = function (a) {
          var b = 1 > a ? Math.pow(10, (a + "").length - 2) : 1;
          return function (c) {
            return ((Math.round(c / a) * a * b) | 0) / b;
          };
        },
        c = function (a, b) {
          for (; a; ) a.f || a.blob || (a.m = b || Math.round), (a = a._next);
        },
        d = a.prototype;
      (d._onInitAllProps = function () {
        var a,
          d,
          e,
          f,
          g = this._tween,
          h = g.vars.roundProps,
          i = {},
          j = g._propLookup.roundProps;
        if ("object" != typeof h || h.push)
          for (
            "string" == typeof h && (h = h.split(",")), e = h.length;
            --e > -1;

          )
            i[h[e]] = Math.round;
        else for (f in h) i[f] = b(h[f]);
        for (f in i)
          for (a = g._firstPT; a; )
            (d = a._next),
              a.pg
                ? a.t._mod(i)
                : a.n === f &&
                  (2 === a.f && a.t
                    ? c(a.t._firstPT, i[f])
                    : (this._add(a.t, f, a.s, a.c, i[f]),
                      d && (d._prev = a._prev),
                      a._prev
                        ? (a._prev._next = d)
                        : g._firstPT === a && (g._firstPT = d),
                      (a._next = a._prev = null),
                      (g._propLookup[f] = j))),
              (a = d);
        return !1;
      }),
        (d._add = function (a, b, c, d, e) {
          this._addTween(a, b, c, c + d, b, e || Math.round),
            this._overwriteProps.push(b);
        });
    })(),
    (function () {
      _gsScope._gsDefine.plugin({
        propName: "attr",
        API: 2,
        version: "0.6.1",
        init: function (a, b, c, d) {
          var e, f;
          if ("function" != typeof a.setAttribute) return !1;
          for (e in b)
            (f = b[e]),
              "function" == typeof f && (f = f(d, a)),
              this._addTween(
                a,
                "setAttribute",
                a.getAttribute(e) + "",
                f + "",
                e,
                !1,
                e
              ),
              this._overwriteProps.push(e);
          return !0;
        },
      });
    })(),
    (_gsScope._gsDefine.plugin({
      propName: "directionalRotation",
      version: "0.3.1",
      API: 2,
      init: function (a, b, c, d) {
        "object" != typeof b && (b = { rotation: b }), (this.finals = {});
        var e,
          f,
          g,
          h,
          i,
          j,
          k = b.useRadians === !0 ? 2 * Math.PI : 360,
          l = 1e-6;
        for (e in b)
          "useRadians" !== e &&
            ((h = b[e]),
            "function" == typeof h && (h = h(d, a)),
            (j = (h + "").split("_")),
            (f = j[0]),
            (g = parseFloat(
              "function" != typeof a[e]
                ? a[e]
                : a[
                    e.indexOf("set") ||
                    "function" != typeof a["get" + e.substr(3)]
                      ? e
                      : "get" + e.substr(3)
                  ]()
            )),
            (h = this.finals[e] =
              "string" == typeof f && "=" === f.charAt(1)
                ? g + parseInt(f.charAt(0) + "1", 10) * Number(f.substr(2))
                : Number(f) || 0),
            (i = h - g),
            j.length &&
              ((f = j.join("_")),
              -1 !== f.indexOf("short") &&
                ((i %= k), i !== i % (k / 2) && (i = 0 > i ? i + k : i - k)),
              -1 !== f.indexOf("_cw") && 0 > i
                ? (i = ((i + 9999999999 * k) % k) - ((i / k) | 0) * k)
                : -1 !== f.indexOf("ccw") &&
                  i > 0 &&
                  (i = ((i - 9999999999 * k) % k) - ((i / k) | 0) * k)),
            (i > l || -l > i) &&
              (this._addTween(a, e, g, g + i, e),
              this._overwriteProps.push(e)));
        return !0;
      },
      set: function (a) {
        var b;
        if (1 !== a) this._super.setRatio.call(this, a);
        else
          for (b = this._firstPT; b; )
            b.f ? b.t[b.p](this.finals[b.p]) : (b.t[b.p] = this.finals[b.p]),
              (b = b._next);
      },
    })._autoCSS = !0),
    _gsScope._gsDefine(
      "easing.Back",
      ["easing.Ease"],
      function (a) {
        var b,
          c,
          d,
          e,
          f = _gsScope.GreenSockGlobals || _gsScope,
          g = f.com.greensock,
          h = 2 * Math.PI,
          i = Math.PI / 2,
          j = g._class,
          k = function (b, c) {
            var d = j("easing." + b, function () {}, !0),
              e = (d.prototype = new a());
            return (e.constructor = d), (e.getRatio = c), d;
          },
          l = a.register || function () {},
          m = function (a, b, c, d, e) {
            var f = j(
              "easing." + a,
              { easeOut: new b(), easeIn: new c(), easeInOut: new d() },
              !0
            );
            return l(f, a), f;
          },
          n = function (a, b, c) {
            (this.t = a),
              (this.v = b),
              c &&
                ((this.next = c),
                (c.prev = this),
                (this.c = c.v - b),
                (this.gap = c.t - a));
          },
          o = function (b, c) {
            var d = j(
                "easing." + b,
                function (a) {
                  (this._p1 = a || 0 === a ? a : 1.70158),
                    (this._p2 = 1.525 * this._p1);
                },
                !0
              ),
              e = (d.prototype = new a());
            return (
              (e.constructor = d),
              (e.getRatio = c),
              (e.config = function (a) {
                return new d(a);
              }),
              d
            );
          },
          p = m(
            "Back",
            o("BackOut", function (a) {
              return (a -= 1) * a * ((this._p1 + 1) * a + this._p1) + 1;
            }),
            o("BackIn", function (a) {
              return a * a * ((this._p1 + 1) * a - this._p1);
            }),
            o("BackInOut", function (a) {
              return (a *= 2) < 1
                ? 0.5 * a * a * ((this._p2 + 1) * a - this._p2)
                : 0.5 * ((a -= 2) * a * ((this._p2 + 1) * a + this._p2) + 2);
            })
          ),
          q = j(
            "easing.SlowMo",
            function (a, b, c) {
              (b = b || 0 === b ? b : 0.7),
                null == a ? (a = 0.7) : a > 1 && (a = 1),
                (this._p = 1 !== a ? b : 0),
                (this._p1 = (1 - a) / 2),
                (this._p2 = a),
                (this._p3 = this._p1 + this._p2),
                (this._calcEnd = c === !0);
            },
            !0
          ),
          r = (q.prototype = new a());
        return (
          (r.constructor = q),
          (r.getRatio = function (a) {
            var b = a + (0.5 - a) * this._p;
            return a < this._p1
              ? this._calcEnd
                ? 1 - (a = 1 - a / this._p1) * a
                : b - (a = 1 - a / this._p1) * a * a * a * b
              : a > this._p3
              ? this._calcEnd
                ? 1 === a
                  ? 0
                  : 1 - (a = (a - this._p3) / this._p1) * a
                : b + (a - b) * (a = (a - this._p3) / this._p1) * a * a * a
              : this._calcEnd
              ? 1
              : b;
          }),
          (q.ease = new q(0.7, 0.7)),
          (r.config = q.config =
            function (a, b, c) {
              return new q(a, b, c);
            }),
          (b = j(
            "easing.SteppedEase",
            function (a, b) {
              (a = a || 1),
                (this._p1 = 1 / a),
                (this._p2 = a + (b ? 0 : 1)),
                (this._p3 = b ? 1 : 0);
            },
            !0
          )),
          (r = b.prototype = new a()),
          (r.constructor = b),
          (r.getRatio = function (a) {
            return (
              0 > a ? (a = 0) : a >= 1 && (a = 0.999999999),
              (((this._p2 * a) | 0) + this._p3) * this._p1
            );
          }),
          (r.config = b.config =
            function (a, c) {
              return new b(a, c);
            }),
          (c = j(
            "easing.ExpoScaleEase",
            function (a, b, c) {
              (this._p1 = Math.log(b / a)),
                (this._p2 = b - a),
                (this._p3 = a),
                (this._ease = c);
            },
            !0
          )),
          (r = c.prototype = new a()),
          (r.constructor = c),
          (r.getRatio = function (a) {
            return (
              this._ease && (a = this._ease.getRatio(a)),
              (this._p3 * Math.exp(this._p1 * a) - this._p3) / this._p2
            );
          }),
          (r.config = c.config =
            function (a, b, d) {
              return new c(a, b, d);
            }),
          (d = j(
            "easing.RoughEase",
            function (b) {
              b = b || {};
              for (
                var c,
                  d,
                  e,
                  f,
                  g,
                  h,
                  i = b.taper || "none",
                  j = [],
                  k = 0,
                  l = 0 | (b.points || 20),
                  m = l,
                  o = b.randomize !== !1,
                  p = b.clamp === !0,
                  q = b.template instanceof a ? b.template : null,
                  r = "number" == typeof b.strength ? 0.4 * b.strength : 0.4;
                --m > -1;

              )
                (c = o ? Math.random() : (1 / l) * m),
                  (d = q ? q.getRatio(c) : c),
                  "none" === i
                    ? (e = r)
                    : "out" === i
                    ? ((f = 1 - c), (e = f * f * r))
                    : "in" === i
                    ? (e = c * c * r)
                    : 0.5 > c
                    ? ((f = 2 * c), (e = f * f * 0.5 * r))
                    : ((f = 2 * (1 - c)), (e = f * f * 0.5 * r)),
                  o
                    ? (d += Math.random() * e - 0.5 * e)
                    : m % 2
                    ? (d += 0.5 * e)
                    : (d -= 0.5 * e),
                  p && (d > 1 ? (d = 1) : 0 > d && (d = 0)),
                  (j[k++] = { x: c, y: d });
              for (
                j.sort(function (a, b) {
                  return a.x - b.x;
                }),
                  h = new n(1, 1, null),
                  m = l;
                --m > -1;

              )
                (g = j[m]), (h = new n(g.x, g.y, h));
              this._prev = new n(0, 0, 0 !== h.t ? h : h.next);
            },
            !0
          )),
          (r = d.prototype = new a()),
          (r.constructor = d),
          (r.getRatio = function (a) {
            var b = this._prev;
            if (a > b.t) {
              for (; b.next && a >= b.t; ) b = b.next;
              b = b.prev;
            } else for (; b.prev && a <= b.t; ) b = b.prev;
            return (this._prev = b), b.v + ((a - b.t) / b.gap) * b.c;
          }),
          (r.config = function (a) {
            return new d(a);
          }),
          (d.ease = new d()),
          m(
            "Bounce",
            k("BounceOut", function (a) {
              return 1 / 2.75 > a
                ? 7.5625 * a * a
                : 2 / 2.75 > a
                ? 7.5625 * (a -= 1.5 / 2.75) * a + 0.75
                : 2.5 / 2.75 > a
                ? 7.5625 * (a -= 2.25 / 2.75) * a + 0.9375
                : 7.5625 * (a -= 2.625 / 2.75) * a + 0.984375;
            }),
            k("BounceIn", function (a) {
              return (a = 1 - a) < 1 / 2.75
                ? 1 - 7.5625 * a * a
                : 2 / 2.75 > a
                ? 1 - (7.5625 * (a -= 1.5 / 2.75) * a + 0.75)
                : 2.5 / 2.75 > a
                ? 1 - (7.5625 * (a -= 2.25 / 2.75) * a + 0.9375)
                : 1 - (7.5625 * (a -= 2.625 / 2.75) * a + 0.984375);
            }),
            k("BounceInOut", function (a) {
              var b = 0.5 > a;
              return (
                (a = b ? 1 - 2 * a : 2 * a - 1),
                (a =
                  1 / 2.75 > a
                    ? 7.5625 * a * a
                    : 2 / 2.75 > a
                    ? 7.5625 * (a -= 1.5 / 2.75) * a + 0.75
                    : 2.5 / 2.75 > a
                    ? 7.5625 * (a -= 2.25 / 2.75) * a + 0.9375
                    : 7.5625 * (a -= 2.625 / 2.75) * a + 0.984375),
                b ? 0.5 * (1 - a) : 0.5 * a + 0.5
              );
            })
          ),
          m(
            "Circ",
            k("CircOut", function (a) {
              return Math.sqrt(1 - (a -= 1) * a);
            }),
            k("CircIn", function (a) {
              return -(Math.sqrt(1 - a * a) - 1);
            }),
            k("CircInOut", function (a) {
              return (a *= 2) < 1
                ? -0.5 * (Math.sqrt(1 - a * a) - 1)
                : 0.5 * (Math.sqrt(1 - (a -= 2) * a) + 1);
            })
          ),
          (e = function (b, c, d) {
            var e = j(
                "easing." + b,
                function (a, b) {
                  (this._p1 = a >= 1 ? a : 1),
                    (this._p2 = (b || d) / (1 > a ? a : 1)),
                    (this._p3 =
                      (this._p2 / h) * (Math.asin(1 / this._p1) || 0)),
                    (this._p2 = h / this._p2);
                },
                !0
              ),
              f = (e.prototype = new a());
            return (
              (f.constructor = e),
              (f.getRatio = c),
              (f.config = function (a, b) {
                return new e(a, b);
              }),
              e
            );
          }),
          m(
            "Elastic",
            e(
              "ElasticOut",
              function (a) {
                return (
                  this._p1 *
                    Math.pow(2, -10 * a) *
                    Math.sin((a - this._p3) * this._p2) +
                  1
                );
              },
              0.3
            ),
            e(
              "ElasticIn",
              function (a) {
                return -(
                  this._p1 *
                  Math.pow(2, 10 * (a -= 1)) *
                  Math.sin((a - this._p3) * this._p2)
                );
              },
              0.3
            ),
            e(
              "ElasticInOut",
              function (a) {
                return (a *= 2) < 1
                  ? -0.5 *
                      (this._p1 *
                        Math.pow(2, 10 * (a -= 1)) *
                        Math.sin((a - this._p3) * this._p2))
                  : this._p1 *
                      Math.pow(2, -10 * (a -= 1)) *
                      Math.sin((a - this._p3) * this._p2) *
                      0.5 +
                      1;
              },
              0.45
            )
          ),
          m(
            "Expo",
            k("ExpoOut", function (a) {
              return 1 - Math.pow(2, -10 * a);
            }),
            k("ExpoIn", function (a) {
              return Math.pow(2, 10 * (a - 1)) - 0.001;
            }),
            k("ExpoInOut", function (a) {
              return (a *= 2) < 1
                ? 0.5 * Math.pow(2, 10 * (a - 1))
                : 0.5 * (2 - Math.pow(2, -10 * (a - 1)));
            })
          ),
          m(
            "Sine",
            k("SineOut", function (a) {
              return Math.sin(a * i);
            }),
            k("SineIn", function (a) {
              return -Math.cos(a * i) + 1;
            }),
            k("SineInOut", function (a) {
              return -0.5 * (Math.cos(Math.PI * a) - 1);
            })
          ),
          j(
            "easing.EaseLookup",
            {
              find: function (b) {
                return a.map[b];
              },
            },
            !0
          ),
          l(f.SlowMo, "SlowMo", "ease,"),
          l(d, "RoughEase", "ease,"),
          l(b, "SteppedEase", "ease,"),
          p
        );
      },
      !0
    );
}),
  _gsScope._gsDefine && _gsScope._gsQueue.pop()(),
  (function (a, b) {
    "use strict";
    var c = {},
      d = a.document,
      e = (a.GreenSockGlobals = a.GreenSockGlobals || a),
      f = e[b];
    if (f)
      return (
        "undefined" != typeof module && module.exports && (module.exports = f),
        f
      );
    var g,
      h,
      i,
      j,
      k,
      l = function (a) {
        var b,
          c = a.split("."),
          d = e;
        for (b = 0; b < c.length; b++) d[c[b]] = d = d[c[b]] || {};
        return d;
      },
      m = l("com.greensock"),
      n = 1e-8,
      o = function (a) {
        var b,
          c = [],
          d = a.length;
        for (b = 0; b !== d; c.push(a[b++]));
        return c;
      },
      p = function () {},
      q = (function () {
        var a = Object.prototype.toString,
          b = a.call([]);
        return function (c) {
          return (
            null != c &&
            (c instanceof Array ||
              ("object" == typeof c && !!c.push && a.call(c) === b))
          );
        };
      })(),
      r = {},
      s = function (d, f, g, h) {
        (this.sc = r[d] ? r[d].sc : []),
          (r[d] = this),
          (this.gsClass = null),
          (this.func = g);
        var i = [];
        (this.check = function (j) {
          for (var k, m, n, o, p = f.length, q = p; --p > -1; )
            (k = r[f[p]] || new s(f[p], [])).gsClass
              ? ((i[p] = k.gsClass), q--)
              : j && k.sc.push(this);
          if (0 === q && g) {
            if (
              ((m = ("com.greensock." + d).split(".")),
              (n = m.pop()),
              (o = l(m.join("."))[n] = this.gsClass = g.apply(g, i)),
              h)
            )
              if (
                ((e[n] = c[n] = o),
                "undefined" != typeof module && module.exports)
              )
                if (d === b) {
                  module.exports = c[b] = o;
                  for (p in c) o[p] = c[p];
                } else c[b] && (c[b][n] = o);
              else
                "function" == typeof define &&
                  define.amd &&
                  define(
                    (a.GreenSockAMDPath ? a.GreenSockAMDPath + "/" : "") +
                      d.split(".").pop(),
                    [],
                    function () {
                      return o;
                    }
                  );
            for (p = 0; p < this.sc.length; p++) this.sc[p].check();
          }
        }),
          this.check(!0);
      },
      t = (a._gsDefine = function (a, b, c, d) {
        return new s(a, b, c, d);
      }),
      u = (m._class = function (a, b, c) {
        return (
          (b = b || function () {}),
          t(
            a,
            [],
            function () {
              return b;
            },
            c
          ),
          b
        );
      });
    t.globals = e;
    var v = [0, 0, 1, 1],
      w = u(
        "easing.Ease",
        function (a, b, c, d) {
          (this._func = a),
            (this._type = c || 0),
            (this._power = d || 0),
            (this._params = b ? v.concat(b) : v);
        },
        !0
      ),
      x = (w.map = {}),
      y = (w.register = function (a, b, c, d) {
        for (
          var e,
            f,
            g,
            h,
            i = b.split(","),
            j = i.length,
            k = (c || "easeIn,easeOut,easeInOut").split(",");
          --j > -1;

        )
          for (
            f = i[j],
              e = d ? u("easing." + f, null, !0) : m.easing[f] || {},
              g = k.length;
            --g > -1;

          )
            (h = k[g]),
              (x[f + "." + h] =
                x[h + f] =
                e[h] =
                  a.getRatio ? a : a[h] || new a());
      });
    for (
      i = w.prototype,
        i._calcEnd = !1,
        i.getRatio = function (a) {
          if (this._func)
            return (this._params[0] = a), this._func.apply(null, this._params);
          var b = this._type,
            c = this._power,
            d = 1 === b ? 1 - a : 2 === b ? a : 0.5 > a ? 2 * a : 2 * (1 - a);
          return (
            1 === c
              ? (d *= d)
              : 2 === c
              ? (d *= d * d)
              : 3 === c
              ? (d *= d * d * d)
              : 4 === c && (d *= d * d * d * d),
            1 === b ? 1 - d : 2 === b ? d : 0.5 > a ? d / 2 : 1 - d / 2
          );
        },
        g = ["Linear", "Quad", "Cubic", "Quart", "Quint,Strong"],
        h = g.length;
      --h > -1;

    )
      (i = g[h] + ",Power" + h),
        y(new w(null, null, 1, h), i, "easeOut", !0),
        y(new w(null, null, 2, h), i, "easeIn" + (0 === h ? ",easeNone" : "")),
        y(new w(null, null, 3, h), i, "easeInOut");
    (x.linear = m.easing.Linear.easeIn), (x.swing = m.easing.Quad.easeInOut);
    var z = u("events.EventDispatcher", function (a) {
      (this._listeners = {}), (this._eventTarget = a || this);
    });
    (i = z.prototype),
      (i.addEventListener = function (a, b, c, d, e) {
        e = e || 0;
        var f,
          g,
          h = this._listeners[a],
          i = 0;
        for (
          this !== j || k || j.wake(),
            null == h && (this._listeners[a] = h = []),
            g = h.length;
          --g > -1;

        )
          (f = h[g]),
            f.c === b && f.s === c
              ? h.splice(g, 1)
              : 0 === i && f.pr < e && (i = g + 1);
        h.splice(i, 0, { c: b, s: c, up: d, pr: e });
      }),
      (i.removeEventListener = function (a, b) {
        var c,
          d = this._listeners[a];
        if (d)
          for (c = d.length; --c > -1; )
            if (d[c].c === b) return void d.splice(c, 1);
      }),
      (i.dispatchEvent = function (a) {
        var b,
          c,
          d,
          e = this._listeners[a];
        if (e)
          for (
            b = e.length, b > 1 && (e = e.slice(0)), c = this._eventTarget;
            --b > -1;

          )
            (d = e[b]),
              d &&
                (d.up
                  ? d.c.call(d.s || c, { type: a, target: c })
                  : d.c.call(d.s || c));
      });
    var A = a.requestAnimationFrame,
      B = a.cancelAnimationFrame,
      C =
        Date.now ||
        function () {
          return new Date().getTime();
        },
      D = C();
    for (g = ["ms", "moz", "webkit", "o"], h = g.length; --h > -1 && !A; )
      (A = a[g[h] + "RequestAnimationFrame"]),
        (B =
          a[g[h] + "CancelAnimationFrame"] ||
          a[g[h] + "CancelRequestAnimationFrame"]);
    u("Ticker", function (a, b) {
      var c,
        e,
        f,
        g,
        h,
        i = this,
        l = C(),
        m = b !== !1 && A ? "auto" : !1,
        o = 500,
        q = 33,
        r = "tick",
        s = function (a) {
          var b,
            d,
            j = C() - D;
          j > o && (l += j - q),
            (D += j),
            (i.time = (D - l) / 1e3),
            (b = i.time - h),
            (!c || b > 0 || a === !0) &&
              (i.frame++, (h += b + (b >= g ? 0.004 : g - b)), (d = !0)),
            a !== !0 && (f = e(s)),
            d && i.dispatchEvent(r);
        };
      z.call(i),
        (i.time = i.frame = 0),
        (i.tick = function () {
          s(!0);
        }),
        (i.lagSmoothing = function (a, b) {
          return arguments.length
            ? ((o = a || 1 / n), void (q = Math.min(b, o, 0)))
            : 1 / n > o;
        }),
        (i.sleep = function () {
          null != f &&
            (m && B ? B(f) : clearTimeout(f),
            (e = p),
            (f = null),
            i === j && (k = !1));
        }),
        (i.wake = function (a) {
          null !== f
            ? i.sleep()
            : a
            ? (l += -D + (D = C()))
            : i.frame > 10 && (D = C() - o + 5),
            (e =
              0 === c
                ? p
                : m && A
                ? A
                : function (a) {
                    return setTimeout(a, (1e3 * (h - i.time) + 1) | 0);
                  }),
            i === j && (k = !0),
            s(2);
        }),
        (i.fps = function (a) {
          return arguments.length
            ? ((c = a), (g = 1 / (c || 60)), (h = this.time + g), void i.wake())
            : c;
        }),
        (i.useRAF = function (a) {
          return arguments.length ? (i.sleep(), (m = a), void i.fps(c)) : m;
        }),
        i.fps(a),
        setTimeout(function () {
          "auto" === m &&
            i.frame < 5 &&
            "hidden" !== (d || {}).visibilityState &&
            i.useRAF(!1);
        }, 1500);
    }),
      (i = m.Ticker.prototype = new m.events.EventDispatcher()),
      (i.constructor = m.Ticker);
    var E = u("core.Animation", function (a, b) {
      if (
        ((this.vars = b = b || {}),
        (this._duration = this._totalDuration = a || 0),
        (this._delay = Number(b.delay) || 0),
        (this._timeScale = 1),
        (this._active = !!b.immediateRender),
        (this.data = b.data),
        (this._reversed = !!b.reversed),
        Z)
      ) {
        k || j.wake();
        var c = this.vars.useFrames ? Y : Z;
        c.add(this, c._time), this.vars.paused && this.paused(!0);
      }
    });
    (j = E.ticker = new m.Ticker()),
      (i = E.prototype),
      (i._dirty = i._gc = i._initted = i._paused = !1),
      (i._totalTime = i._time = 0),
      (i._rawPrevTime = -1),
      (i._next = i._last = i._onUpdate = i._timeline = i.timeline = null),
      (i._paused = !1);
    var F = function () {
      k &&
        C() - D > 2e3 &&
        ("hidden" !== (d || {}).visibilityState || !j.lagSmoothing()) &&
        j.wake();
      var a = setTimeout(F, 2e3);
      a.unref && a.unref();
    };
    F(),
      (i.play = function (a, b) {
        return null != a && this.seek(a, b), this.reversed(!1).paused(!1);
      }),
      (i.pause = function (a, b) {
        return null != a && this.seek(a, b), this.paused(!0);
      }),
      (i.resume = function (a, b) {
        return null != a && this.seek(a, b), this.paused(!1);
      }),
      (i.seek = function (a, b) {
        return this.totalTime(Number(a), b !== !1);
      }),
      (i.restart = function (a, b) {
        return this.reversed(!1)
          .paused(!1)
          .totalTime(a ? -this._delay : 0, b !== !1, !0);
      }),
      (i.reverse = function (a, b) {
        return (
          null != a && this.seek(a || this.totalDuration(), b),
          this.reversed(!0).paused(!1)
        );
      }),
      (i.render = function (a, b, c) {}),
      (i.invalidate = function () {
        return (
          (this._time = this._totalTime = 0),
          (this._initted = this._gc = !1),
          (this._rawPrevTime = -1),
          (this._gc || !this.timeline) && this._enabled(!0),
          this
        );
      }),
      (i.isActive = function () {
        var a,
          b = this._timeline,
          c = this._startTime;
        return (
          !b ||
          (!this._gc &&
            !this._paused &&
            b.isActive() &&
            (a = b.rawTime(!0)) >= c &&
            a < c + this.totalDuration() / this._timeScale - n)
        );
      }),
      (i._enabled = function (a, b) {
        return (
          k || j.wake(),
          (this._gc = !a),
          (this._active = this.isActive()),
          b !== !0 &&
            (a && !this.timeline
              ? this._timeline.add(this, this._startTime - this._delay)
              : !a && this.timeline && this._timeline._remove(this, !0)),
          !1
        );
      }),
      (i._kill = function (a, b) {
        return this._enabled(!1, !1);
      }),
      (i.kill = function (a, b) {
        return this._kill(a, b), this;
      }),
      (i._uncache = function (a) {
        for (var b = a ? this : this.timeline; b; )
          (b._dirty = !0), (b = b.timeline);
        return this;
      }),
      (i._swapSelfInParams = function (a) {
        for (var b = a.length, c = a.concat(); --b > -1; )
          "{self}" === a[b] && (c[b] = this);
        return c;
      }),
      (i._callback = function (a) {
        var b = this.vars,
          c = b[a],
          d = b[a + "Params"],
          e = b[a + "Scope"] || b.callbackScope || this,
          f = d ? d.length : 0;
        switch (f) {
          case 0:
            c.call(e);
            break;
          case 1:
            c.call(e, d[0]);
            break;
          case 2:
            c.call(e, d[0], d[1]);
            break;
          default:
            c.apply(e, d);
        }
      }),
      (i.eventCallback = function (a, b, c, d) {
        if ("on" === (a || "").substr(0, 2)) {
          var e = this.vars;
          if (1 === arguments.length) return e[a];
          null == b
            ? delete e[a]
            : ((e[a] = b),
              (e[a + "Params"] =
                q(c) && -1 !== c.join("").indexOf("{self}")
                  ? this._swapSelfInParams(c)
                  : c),
              (e[a + "Scope"] = d)),
            "onUpdate" === a && (this._onUpdate = b);
        }
        return this;
      }),
      (i.delay = function (a) {
        return arguments.length
          ? (this._timeline.smoothChildTiming &&
              this.startTime(this._startTime + a - this._delay),
            (this._delay = a),
            this)
          : this._delay;
      }),
      (i.duration = function (a) {
        return arguments.length
          ? ((this._duration = this._totalDuration = a),
            this._uncache(!0),
            this._timeline.smoothChildTiming &&
              this._time > 0 &&
              this._time < this._duration &&
              0 !== a &&
              this.totalTime(this._totalTime * (a / this._duration), !0),
            this)
          : ((this._dirty = !1), this._duration);
      }),
      (i.totalDuration = function (a) {
        return (
          (this._dirty = !1),
          arguments.length ? this.duration(a) : this._totalDuration
        );
      }),
      (i.time = function (a, b) {
        return arguments.length
          ? (this._dirty && this.totalDuration(),
            this.totalTime(a > this._duration ? this._duration : a, b))
          : this._time;
      }),
      (i.totalTime = function (a, b, c) {
        if ((k || j.wake(), !arguments.length)) return this._totalTime;
        if (this._timeline) {
          if (
            (0 > a && !c && (a += this.totalDuration()),
            this._timeline.smoothChildTiming)
          ) {
            this._dirty && this.totalDuration();
            var d = this._totalDuration,
              e = this._timeline;
            if (
              (a > d && !c && (a = d),
              (this._startTime =
                (this._paused ? this._pauseTime : e._time) -
                (this._reversed ? d - a : a) / this._timeScale),
              e._dirty || this._uncache(!1),
              e._timeline)
            )
              for (; e._timeline; )
                e._timeline._time !==
                  (e._startTime + e._totalTime) / e._timeScale &&
                  e.totalTime(e._totalTime, !0),
                  (e = e._timeline);
          }
          this._gc && this._enabled(!0, !1),
            (this._totalTime !== a || 0 === this._duration) &&
              (K.length && _(), this.render(a, b, !1), K.length && _());
        }
        return this;
      }),
      (i.progress = i.totalProgress =
        function (a, b) {
          var c = this.duration();
          return arguments.length
            ? this.totalTime(c * a, b)
            : c
            ? this._time / c
            : this.ratio;
        }),
      (i.startTime = function (a) {
        return arguments.length
          ? (a !== this._startTime &&
              ((this._startTime = a),
              this.timeline &&
                this.timeline._sortChildren &&
                this.timeline.add(this, a - this._delay)),
            this)
          : this._startTime;
      }),
      (i.endTime = function (a) {
        return (
          this._startTime +
          (0 != a ? this.totalDuration() : this.duration()) / this._timeScale
        );
      }),
      (i.timeScale = function (a) {
        if (!arguments.length) return this._timeScale;
        var b, c;
        for (
          a = a || n,
            this._timeline &&
              this._timeline.smoothChildTiming &&
              ((b = this._pauseTime),
              (c = b || 0 === b ? b : this._timeline.totalTime()),
              (this._startTime =
                c - ((c - this._startTime) * this._timeScale) / a)),
            this._timeScale = a,
            c = this.timeline;
          c && c.timeline;

        )
          (c._dirty = !0), c.totalDuration(), (c = c.timeline);
        return this;
      }),
      (i.reversed = function (a) {
        return arguments.length
          ? (a != this._reversed &&
              ((this._reversed = a),
              this.totalTime(
                this._timeline && !this._timeline.smoothChildTiming
                  ? this.totalDuration() - this._totalTime
                  : this._totalTime,
                !0
              )),
            this)
          : this._reversed;
      }),
      (i.paused = function (a) {
        if (!arguments.length) return this._paused;
        var b,
          c,
          d = this._timeline;
        return (
          a != this._paused &&
            d &&
            (k || a || j.wake(),
            (b = d.rawTime()),
            (c = b - this._pauseTime),
            !a &&
              d.smoothChildTiming &&
              ((this._startTime += c), this._uncache(!1)),
            (this._pauseTime = a ? b : null),
            (this._paused = a),
            (this._active = this.isActive()),
            !a &&
              0 !== c &&
              this._initted &&
              this.duration() &&
              ((b = d.smoothChildTiming
                ? this._totalTime
                : (b - this._startTime) / this._timeScale),
              this.render(b, b === this._totalTime, !0))),
          this._gc && !a && this._enabled(!0, !1),
          this
        );
      });
    var G = u("core.SimpleTimeline", function (a) {
      E.call(this, 0, a),
        (this.autoRemoveChildren = this.smoothChildTiming = !0);
    });
    (i = G.prototype = new E()),
      (i.constructor = G),
      (i.kill()._gc = !1),
      (i._first = i._last = i._recent = null),
      (i._sortChildren = !1),
      (i.add = i.insert =
        function (a, b, c, d) {
          var e, f;
          if (
            ((a._startTime = Number(b || 0) + a._delay),
            a._paused &&
              this !== a._timeline &&
              (a._pauseTime =
                this.rawTime() - (a._timeline.rawTime() - a._pauseTime)),
            a.timeline && a.timeline._remove(a, !0),
            (a.timeline = a._timeline = this),
            a._gc && a._enabled(!0, !0),
            (e = this._last),
            this._sortChildren)
          )
            for (f = a._startTime; e && e._startTime > f; ) e = e._prev;
          return (
            e
              ? ((a._next = e._next), (e._next = a))
              : ((a._next = this._first), (this._first = a)),
            a._next ? (a._next._prev = a) : (this._last = a),
            (a._prev = e),
            (this._recent = a),
            this._timeline && this._uncache(!0),
            this
          );
        }),
      (i._remove = function (a, b) {
        return (
          a.timeline === this &&
            (b || a._enabled(!1, !0),
            a._prev
              ? (a._prev._next = a._next)
              : this._first === a && (this._first = a._next),
            a._next
              ? (a._next._prev = a._prev)
              : this._last === a && (this._last = a._prev),
            (a._next = a._prev = a.timeline = null),
            a === this._recent && (this._recent = this._last),
            this._timeline && this._uncache(!0)),
          this
        );
      }),
      (i.render = function (a, b, c) {
        var d,
          e = this._first;
        for (this._totalTime = this._time = this._rawPrevTime = a; e; )
          (d = e._next),
            (e._active || (a >= e._startTime && !e._paused && !e._gc)) &&
              (e._reversed
                ? e.render(
                    (e._dirty ? e.totalDuration() : e._totalDuration) -
                      (a - e._startTime) * e._timeScale,
                    b,
                    c
                  )
                : e.render((a - e._startTime) * e._timeScale, b, c)),
            (e = d);
      }),
      (i.rawTime = function () {
        return k || j.wake(), this._totalTime;
      });
    var H = u(
        "TweenLite",
        function (b, c, d) {
          if (
            (E.call(this, c, d), (this.render = H.prototype.render), null == b)
          )
            throw "Cannot tween a null target.";
          this.target = b = "string" != typeof b ? b : H.selector(b) || b;
          var e,
            f,
            g,
            h =
              b.jquery ||
              (b.length &&
                b !== a &&
                b[0] &&
                (b[0] === a || (b[0].nodeType && b[0].style && !b.nodeType))),
            i = this.vars.overwrite;
          if (
            ((this._overwrite = i =
              null == i
                ? X[H.defaultOverwrite]
                : "number" == typeof i
                ? i >> 0
                : X[i]),
            (h || b instanceof Array || (b.push && q(b))) &&
              "number" != typeof b[0])
          )
            for (
              this._targets = g = o(b),
                this._propLookup = [],
                this._siblings = [],
                e = 0;
              e < g.length;
              e++
            )
              (f = g[e]),
                f
                  ? "string" != typeof f
                    ? f.length &&
                      f !== a &&
                      f[0] &&
                      (f[0] === a ||
                        (f[0].nodeType && f[0].style && !f.nodeType))
                      ? (g.splice(e--, 1), (this._targets = g = g.concat(o(f))))
                      : ((this._siblings[e] = aa(f, this, !1)),
                        1 === i &&
                          this._siblings[e].length > 1 &&
                          ca(f, this, null, 1, this._siblings[e]))
                    : ((f = g[e--] = H.selector(f)),
                      "string" == typeof f && g.splice(e + 1, 1))
                  : g.splice(e--, 1);
          else
            (this._propLookup = {}),
              (this._siblings = aa(b, this, !1)),
              1 === i &&
                this._siblings.length > 1 &&
                ca(b, this, null, 1, this._siblings);
          (this.vars.immediateRender ||
            (0 === c &&
              0 === this._delay &&
              this.vars.immediateRender !== !1)) &&
            ((this._time = -n), this.render(Math.min(0, -this._delay)));
        },
        !0
      ),
      I = function (b) {
        return (
          b &&
          b.length &&
          b !== a &&
          b[0] &&
          (b[0] === a || (b[0].nodeType && b[0].style && !b.nodeType))
        );
      },
      J = function (a, b) {
        var c,
          d = {};
        for (c in a)
          W[c] ||
            (c in b &&
              "transform" !== c &&
              "x" !== c &&
              "y" !== c &&
              "width" !== c &&
              "height" !== c &&
              "className" !== c &&
              "border" !== c) ||
            !(!T[c] || (T[c] && T[c]._autoCSS)) ||
            ((d[c] = a[c]), delete a[c]);
        a.css = d;
      };
    (i = H.prototype = new E()),
      (i.constructor = H),
      (i.kill()._gc = !1),
      (i.ratio = 0),
      (i._firstPT = i._targets = i._overwrittenProps = i._startAt = null),
      (i._notifyPluginsOfEnabled = i._lazy = !1),
      (H.version = "2.1.2"),
      (H.defaultEase = i._ease = new w(null, null, 1, 1)),
      (H.defaultOverwrite = "auto"),
      (H.ticker = j),
      (H.autoSleep = 120),
      (H.lagSmoothing = function (a, b) {
        j.lagSmoothing(a, b);
      }),
      (H.selector =
        a.$ ||
        a.jQuery ||
        function (b) {
          var c = a.$ || a.jQuery;
          return c
            ? ((H.selector = c), c(b))
            : (d || (d = a.document),
              d
                ? d.querySelectorAll
                  ? d.querySelectorAll(b)
                  : d.getElementById("#" === b.charAt(0) ? b.substr(1) : b)
                : b);
        });
    var K = [],
      L = {},
      M = /(?:(-|-=|\+=)?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/gi,
      N = /[\+-]=-?[\.\d]/,
      O = function (a) {
        for (var b, c = this._firstPT, d = 1e-6; c; )
          (b = c.blob
            ? 1 === a && null != this.end
              ? this.end
              : a
              ? this.join("")
              : this.start
            : c.c * a + c.s),
            c.m
              ? (b = c.m.call(this._tween, b, this._target || c.t, this._tween))
              : d > b && b > -d && !c.blob && (b = 0),
            c.f ? (c.fp ? c.t[c.p](c.fp, b) : c.t[c.p](b)) : (c.t[c.p] = b),
            (c = c._next);
      },
      P = function (a) {
        return ((1e3 * a) | 0) / 1e3 + "";
      },
      Q = function (a, b, c, d) {
        var e,
          f,
          g,
          h,
          i,
          j,
          k,
          l = [],
          m = 0,
          n = "",
          o = 0;
        for (
          l.start = a,
            l.end = b,
            a = l[0] = a + "",
            b = l[1] = b + "",
            c && (c(l), (a = l[0]), (b = l[1])),
            l.length = 0,
            e = a.match(M) || [],
            f = b.match(M) || [],
            d &&
              ((d._next = null), (d.blob = 1), (l._firstPT = l._applyPT = d)),
            i = f.length,
            h = 0;
          i > h;
          h++
        )
          (k = f[h]),
            (j = b.substr(m, b.indexOf(k, m) - m)),
            (n += j || !h ? j : ","),
            (m += j.length),
            o ? (o = (o + 1) % 5) : "rgba(" === j.substr(-5) && (o = 1),
            k === e[h] || e.length <= h
              ? (n += k)
              : (n && (l.push(n), (n = "")),
                (g = parseFloat(e[h])),
                l.push(g),
                (l._firstPT = {
                  _next: l._firstPT,
                  t: l,
                  p: l.length - 1,
                  s: g,
                  c:
                    ("=" === k.charAt(1)
                      ? parseInt(k.charAt(0) + "1", 10) *
                        parseFloat(k.substr(2))
                      : parseFloat(k) - g) || 0,
                  f: 0,
                  m: o && 4 > o ? Math.round : P,
                })),
            (m += k.length);
        return (
          (n += b.substr(m)),
          n && l.push(n),
          (l.setRatio = O),
          N.test(b) && (l.end = null),
          l
        );
      },
      R = function (a, b, c, d, e, f, g, h, i) {
        "function" == typeof d && (d = d(i || 0, a));
        var j,
          k = typeof a[b],
          l =
            "function" !== k
              ? ""
              : b.indexOf("set") || "function" != typeof a["get" + b.substr(3)]
              ? b
              : "get" + b.substr(3),
          m = "get" !== c ? c : l ? (g ? a[l](g) : a[l]()) : a[b],
          n = "string" == typeof d && "=" === d.charAt(1),
          o = {
            t: a,
            p: b,
            s: m,
            f: "function" === k,
            pg: 0,
            n: e || b,
            m: f ? ("function" == typeof f ? f : Math.round) : 0,
            pr: 0,
            c: n
              ? parseInt(d.charAt(0) + "1", 10) * parseFloat(d.substr(2))
              : parseFloat(d) - m || 0,
          };
        return (
          ("number" != typeof m || ("number" != typeof d && !n)) &&
            (g ||
            isNaN(m) ||
            (!n && isNaN(d)) ||
            "boolean" == typeof m ||
            "boolean" == typeof d
              ? ((o.fp = g),
                (j = Q(
                  m,
                  n
                    ? parseFloat(o.s) +
                        o.c +
                        (o.s + "").replace(/[0-9\-\.]/g, "")
                    : d,
                  h || H.defaultStringFilter,
                  o
                )),
                (o = {
                  t: j,
                  p: "setRatio",
                  s: 0,
                  c: 1,
                  f: 2,
                  pg: 0,
                  n: e || b,
                  pr: 0,
                  m: 0,
                }))
              : ((o.s = parseFloat(m)), n || (o.c = parseFloat(d) - o.s || 0))),
          o.c
            ? ((o._next = this._firstPT) && (o._next._prev = o),
              (this._firstPT = o),
              o)
            : void 0
        );
      },
      S = (H._internals = {
        isArray: q,
        isSelector: I,
        lazyTweens: K,
        blobDif: Q,
      }),
      T = (H._plugins = {}),
      U = (S.tweenLookup = {}),
      V = 0,
      W = (S.reservedProps = {
        ease: 1,
        delay: 1,
        overwrite: 1,
        onComplete: 1,
        onCompleteParams: 1,
        onCompleteScope: 1,
        useFrames: 1,
        runBackwards: 1,
        startAt: 1,
        onUpdate: 1,
        onUpdateParams: 1,
        onUpdateScope: 1,
        onStart: 1,
        onStartParams: 1,
        onStartScope: 1,
        onReverseComplete: 1,
        onReverseCompleteParams: 1,
        onReverseCompleteScope: 1,
        onRepeat: 1,
        onRepeatParams: 1,
        onRepeatScope: 1,
        easeParams: 1,
        yoyo: 1,
        immediateRender: 1,
        repeat: 1,
        repeatDelay: 1,
        data: 1,
        paused: 1,
        reversed: 1,
        autoCSS: 1,
        lazy: 1,
        onOverwrite: 1,
        callbackScope: 1,
        stringFilter: 1,
        id: 1,
        yoyoEase: 1,
        stagger: 1,
      }),
      X = {
        none: 0,
        all: 1,
        auto: 2,
        concurrent: 3,
        allOnStart: 4,
        preexisting: 5,
        true: 1,
        false: 0,
      },
      Y = (E._rootFramesTimeline = new G()),
      Z = (E._rootTimeline = new G()),
      $ = 30,
      _ = (S.lazyRender = function () {
        var a,
          b,
          c = K.length;
        for (L = {}, a = 0; c > a; a++)
          (b = K[a]),
            b &&
              b._lazy !== !1 &&
              (b.render(b._lazy[0], b._lazy[1], !0), (b._lazy = !1));
        K.length = 0;
      });
    (Z._startTime = j.time),
      (Y._startTime = j.frame),
      (Z._active = Y._active = !0),
      setTimeout(_, 1),
      (E._updateRoot = H.render =
        function () {
          var a, b, c;
          if (
            (K.length && _(),
            Z.render((j.time - Z._startTime) * Z._timeScale, !1, !1),
            Y.render((j.frame - Y._startTime) * Y._timeScale, !1, !1),
            K.length && _(),
            j.frame >= $)
          ) {
            $ = j.frame + (parseInt(H.autoSleep, 10) || 120);
            for (c in U) {
              for (b = U[c].tweens, a = b.length; --a > -1; )
                b[a]._gc && b.splice(a, 1);
              0 === b.length && delete U[c];
            }
            if (
              ((c = Z._first),
              (!c || c._paused) &&
                H.autoSleep &&
                !Y._first &&
                1 === j._listeners.tick.length)
            ) {
              for (; c && c._paused; ) c = c._next;
              c || j.sleep();
            }
          }
        }),
      j.addEventListener("tick", E._updateRoot);
    var aa = function (a, b, c) {
        var d,
          e,
          f = a._gsTweenID;
        if (
          (U[f || (a._gsTweenID = f = "t" + V++)] ||
            (U[f] = { target: a, tweens: [] }),
          b && ((d = U[f].tweens), (d[(e = d.length)] = b), c))
        )
          for (; --e > -1; ) d[e] === b && d.splice(e, 1);
        return U[f].tweens;
      },
      ba = function (a, b, c, d) {
        var e,
          f,
          g = a.vars.onOverwrite;
        return (
          g && (e = g(a, b, c, d)),
          (g = H.onOverwrite),
          g && (f = g(a, b, c, d)),
          e !== !1 && f !== !1
        );
      },
      ca = function (a, b, c, d, e) {
        var f, g, h, i;
        if (1 === d || d >= 4) {
          for (i = e.length, f = 0; i > f; f++)
            if ((h = e[f]) !== b) h._gc || (h._kill(null, a, b) && (g = !0));
            else if (5 === d) break;
          return g;
        }
        var j,
          k = b._startTime + n,
          l = [],
          m = 0,
          o = 0 === b._duration;
        for (f = e.length; --f > -1; )
          (h = e[f]) === b ||
            h._gc ||
            h._paused ||
            (h._timeline !== b._timeline
              ? ((j = j || da(b, 0, o)), 0 === da(h, j, o) && (l[m++] = h))
              : h._startTime <= k &&
                h._startTime + h.totalDuration() / h._timeScale > k &&
                (((o || !h._initted) && k - h._startTime <= 2 * n) ||
                  (l[m++] = h)));
        for (f = m; --f > -1; )
          if (
            ((h = l[f]),
            (i = h._firstPT),
            2 === d && h._kill(c, a, b) && (g = !0),
            2 !== d || (!h._firstPT && h._initted && i))
          ) {
            if (2 !== d && !ba(h, b)) continue;
            h._enabled(!1, !1) && (g = !0);
          }
        return g;
      },
      da = function (a, b, c) {
        for (
          var d = a._timeline, e = d._timeScale, f = a._startTime;
          d._timeline;

        ) {
          if (((f += d._startTime), (e *= d._timeScale), d._paused))
            return -100;
          d = d._timeline;
        }
        return (
          (f /= e),
          f > b
            ? f - b
            : (c && f === b) || (!a._initted && 2 * n > f - b)
            ? n
            : (f += a.totalDuration() / a._timeScale / e) > b + n
            ? 0
            : f - b - n
        );
      };
    (i._init = function () {
      var a,
        b,
        c,
        d,
        e,
        f,
        g = this.vars,
        h = this._overwrittenProps,
        i = this._duration,
        j = !!g.immediateRender,
        k = g.ease,
        l = this._startAt;
      if (g.startAt) {
        l && (l.render(-1, !0), l.kill()), (e = {});
        for (d in g.startAt) e[d] = g.startAt[d];
        if (
          ((e.data = "isStart"),
          (e.overwrite = !1),
          (e.immediateRender = !0),
          (e.lazy = j && g.lazy !== !1),
          (e.startAt = e.delay = null),
          (e.onUpdate = g.onUpdate),
          (e.onUpdateParams = g.onUpdateParams),
          (e.onUpdateScope = g.onUpdateScope || g.callbackScope || this),
          (this._startAt = H.to(this.target || {}, 0, e)),
          j)
        )
          if (this._time > 0) this._startAt = null;
          else if (0 !== i) return;
      } else if (g.runBackwards && 0 !== i)
        if (l) l.render(-1, !0), l.kill(), (this._startAt = null);
        else {
          0 !== this._time && (j = !1), (c = {});
          for (d in g) (W[d] && "autoCSS" !== d) || (c[d] = g[d]);
          if (
            ((c.overwrite = 0),
            (c.data = "isFromStart"),
            (c.lazy = j && g.lazy !== !1),
            (c.immediateRender = j),
            (this._startAt = H.to(this.target, 0, c)),
            j)
          ) {
            if (0 === this._time) return;
          } else
            this._startAt._init(),
              this._startAt._enabled(!1),
              this.vars.immediateRender && (this._startAt = null);
        }
      if (
        ((this._ease = k =
          k
            ? k instanceof w
              ? k
              : "function" == typeof k
              ? new w(k, g.easeParams)
              : x[k] || H.defaultEase
            : H.defaultEase),
        g.easeParams instanceof Array &&
          k.config &&
          (this._ease = k.config.apply(k, g.easeParams)),
        (this._easeType = this._ease._type),
        (this._easePower = this._ease._power),
        (this._firstPT = null),
        this._targets)
      )
        for (f = this._targets.length, a = 0; f > a; a++)
          this._initProps(
            this._targets[a],
            (this._propLookup[a] = {}),
            this._siblings[a],
            h ? h[a] : null,
            a
          ) && (b = !0);
      else
        b = this._initProps(
          this.target,
          this._propLookup,
          this._siblings,
          h,
          0
        );
      if (
        (b && H._onPluginEvent("_onInitAllProps", this),
        h &&
          (this._firstPT ||
            ("function" != typeof this.target && this._enabled(!1, !1))),
        g.runBackwards)
      )
        for (c = this._firstPT; c; ) (c.s += c.c), (c.c = -c.c), (c = c._next);
      (this._onUpdate = g.onUpdate), (this._initted = !0);
    }),
      (i._initProps = function (b, c, d, e, f) {
        var g, h, i, j, k, l;
        if (null == b) return !1;
        L[b._gsTweenID] && _(),
          this.vars.css ||
            (b.style &&
              b !== a &&
              b.nodeType &&
              T.css &&
              this.vars.autoCSS !== !1 &&
              J(this.vars, b));
        for (g in this.vars)
          if (((l = this.vars[g]), W[g]))
            l &&
              (l instanceof Array || (l.push && q(l))) &&
              -1 !== l.join("").indexOf("{self}") &&
              (this.vars[g] = l = this._swapSelfInParams(l, this));
          else if (
            T[g] &&
            (j = new T[g]())._onInitTween(b, this.vars[g], this, f)
          ) {
            for (
              this._firstPT = k =
                {
                  _next: this._firstPT,
                  t: j,
                  p: "setRatio",
                  s: 0,
                  c: 1,
                  f: 1,
                  n: g,
                  pg: 1,
                  pr: j._priority,
                  m: 0,
                },
                h = j._overwriteProps.length;
              --h > -1;

            )
              c[j._overwriteProps[h]] = this._firstPT;
            (j._priority || j._onInitAllProps) && (i = !0),
              (j._onDisable || j._onEnable) &&
                (this._notifyPluginsOfEnabled = !0),
              k._next && (k._next._prev = k);
          } else
            c[g] = R.call(
              this,
              b,
              g,
              "get",
              l,
              g,
              0,
              null,
              this.vars.stringFilter,
              f
            );
        return e && this._kill(e, b)
          ? this._initProps(b, c, d, e, f)
          : this._overwrite > 1 &&
            this._firstPT &&
            d.length > 1 &&
            ca(b, this, c, this._overwrite, d)
          ? (this._kill(c, b), this._initProps(b, c, d, e, f))
          : (this._firstPT &&
              ((this.vars.lazy !== !1 && this._duration) ||
                (this.vars.lazy && !this._duration)) &&
              (L[b._gsTweenID] = !0),
            i);
      }),
      (i.render = function (a, b, c) {
        var d,
          e,
          f,
          g,
          h = this,
          i = h._time,
          j = h._duration,
          k = h._rawPrevTime;
        if (a >= j - n && a >= 0)
          (h._totalTime = h._time = j),
            (h.ratio = h._ease._calcEnd ? h._ease.getRatio(1) : 1),
            h._reversed ||
              ((d = !0),
              (e = "onComplete"),
              (c = c || h._timeline.autoRemoveChildren)),
            0 === j &&
              (h._initted || !h.vars.lazy || c) &&
              (h._startTime === h._timeline._duration && (a = 0),
              (0 > k ||
                (0 >= a && a >= -n) ||
                (k === n && "isPause" !== h.data)) &&
                k !== a &&
                ((c = !0), k > n && (e = "onReverseComplete")),
              (h._rawPrevTime = g = !b || a || k === a ? a : n));
        else if (n > a)
          (h._totalTime = h._time = 0),
            (h.ratio = h._ease._calcEnd ? h._ease.getRatio(0) : 0),
            (0 !== i || (0 === j && k > 0)) &&
              ((e = "onReverseComplete"), (d = h._reversed)),
            a > -n
              ? (a = 0)
              : 0 > a &&
                ((h._active = !1),
                0 === j &&
                  (h._initted || !h.vars.lazy || c) &&
                  (k >= 0 && (k !== n || "isPause" !== h.data) && (c = !0),
                  (h._rawPrevTime = g = !b || a || k === a ? a : n))),
            (!h._initted || (h._startAt && h._startAt.progress())) && (c = !0);
        else if (((h._totalTime = h._time = a), h._easeType)) {
          var l = a / j,
            m = h._easeType,
            o = h._easePower;
          (1 === m || (3 === m && l >= 0.5)) && (l = 1 - l),
            3 === m && (l *= 2),
            1 === o
              ? (l *= l)
              : 2 === o
              ? (l *= l * l)
              : 3 === o
              ? (l *= l * l * l)
              : 4 === o && (l *= l * l * l * l),
            (h.ratio =
              1 === m ? 1 - l : 2 === m ? l : 0.5 > a / j ? l / 2 : 1 - l / 2);
        } else h.ratio = h._ease.getRatio(a / j);
        if (h._time !== i || c) {
          if (!h._initted) {
            if ((h._init(), !h._initted || h._gc)) return;
            if (
              !c &&
              h._firstPT &&
              ((h.vars.lazy !== !1 && h._duration) ||
                (h.vars.lazy && !h._duration))
            )
              return (
                (h._time = h._totalTime = i),
                (h._rawPrevTime = k),
                K.push(h),
                void (h._lazy = [a, b])
              );
            h._time && !d
              ? (h.ratio = h._ease.getRatio(h._time / j))
              : d &&
                h._ease._calcEnd &&
                (h.ratio = h._ease.getRatio(0 === h._time ? 0 : 1));
          }
          for (
            h._lazy !== !1 && (h._lazy = !1),
              h._active ||
                (!h._paused && h._time !== i && a >= 0 && (h._active = !0)),
              0 === i &&
                (h._startAt &&
                  (a >= 0
                    ? h._startAt.render(a, !0, c)
                    : e || (e = "_dummyGS")),
                h.vars.onStart &&
                  (0 !== h._time || 0 === j) &&
                  (b || h._callback("onStart"))),
              f = h._firstPT;
            f;

          )
            f.f
              ? f.t[f.p](f.c * h.ratio + f.s)
              : (f.t[f.p] = f.c * h.ratio + f.s),
              (f = f._next);
          h._onUpdate &&
            (0 > a && h._startAt && a !== -1e-4 && h._startAt.render(a, !0, c),
            b || ((h._time !== i || d || c) && h._callback("onUpdate"))),
            e &&
              (!h._gc || c) &&
              (0 > a &&
                h._startAt &&
                !h._onUpdate &&
                a !== -1e-4 &&
                h._startAt.render(a, !0, c),
              d &&
                (h._timeline.autoRemoveChildren && h._enabled(!1, !1),
                (h._active = !1)),
              !b && h.vars[e] && h._callback(e),
              0 === j &&
                h._rawPrevTime === n &&
                g !== n &&
                (h._rawPrevTime = 0));
        }
      }),
      (i._kill = function (a, b, c) {
        if (
          ("all" === a && (a = null),
          null == a && (null == b || b === this.target))
        )
          return (this._lazy = !1), this._enabled(!1, !1);
        b =
          "string" != typeof b
            ? b || this._targets || this.target
            : H.selector(b) || b;
        var d,
          e,
          f,
          g,
          h,
          i,
          j,
          k,
          l,
          m =
            c &&
            this._time &&
            c._startTime === this._startTime &&
            this._timeline === c._timeline,
          n = this._firstPT;
        if ((q(b) || I(b)) && "number" != typeof b[0])
          for (d = b.length; --d > -1; ) this._kill(a, b[d], c) && (i = !0);
        else {
          if (this._targets) {
            for (d = this._targets.length; --d > -1; )
              if (b === this._targets[d]) {
                (h = this._propLookup[d] || {}),
                  (this._overwrittenProps = this._overwrittenProps || []),
                  (e = this._overwrittenProps[d] =
                    a ? this._overwrittenProps[d] || {} : "all");
                break;
              }
          } else {
            if (b !== this.target) return !1;
            (h = this._propLookup),
              (e = this._overwrittenProps =
                a ? this._overwrittenProps || {} : "all");
          }
          if (h) {
            if (
              ((j = a || h),
              (k =
                a !== e &&
                "all" !== e &&
                a !== h &&
                ("object" != typeof a || !a._tempKill)),
              c && (H.onOverwrite || this.vars.onOverwrite))
            ) {
              for (f in j) h[f] && (l || (l = []), l.push(f));
              if ((l || !a) && !ba(this, c, b, l)) return !1;
            }
            for (f in j)
              (g = h[f]) &&
                (m && (g.f ? g.t[g.p](g.s) : (g.t[g.p] = g.s), (i = !0)),
                g.pg && g.t._kill(j) && (i = !0),
                (g.pg && 0 !== g.t._overwriteProps.length) ||
                  (g._prev
                    ? (g._prev._next = g._next)
                    : g === this._firstPT && (this._firstPT = g._next),
                  g._next && (g._next._prev = g._prev),
                  (g._next = g._prev = null)),
                delete h[f]),
                k && (e[f] = 1);
            !this._firstPT && this._initted && n && this._enabled(!1, !1);
          }
        }
        return i;
      }),
      (i.invalidate = function () {
        this._notifyPluginsOfEnabled && H._onPluginEvent("_onDisable", this);
        var a = this._time;
        return (
          (this._firstPT =
            this._overwrittenProps =
            this._startAt =
            this._onUpdate =
              null),
          (this._notifyPluginsOfEnabled = this._active = this._lazy = !1),
          (this._propLookup = this._targets ? {} : []),
          E.prototype.invalidate.call(this),
          this.vars.immediateRender &&
            ((this._time = -n), this.render(a, !1, this.vars.lazy !== !1)),
          this
        );
      }),
      (i._enabled = function (a, b) {
        if ((k || j.wake(), a && this._gc)) {
          var c,
            d = this._targets;
          if (d)
            for (c = d.length; --c > -1; )
              this._siblings[c] = aa(d[c], this, !0);
          else this._siblings = aa(this.target, this, !0);
        }
        return (
          E.prototype._enabled.call(this, a, b),
          this._notifyPluginsOfEnabled && this._firstPT
            ? H._onPluginEvent(a ? "_onEnable" : "_onDisable", this)
            : !1
        );
      }),
      (H.to = function (a, b, c) {
        return new H(a, b, c);
      }),
      (H.from = function (a, b, c) {
        return (
          (c.runBackwards = !0),
          (c.immediateRender = 0 != c.immediateRender),
          new H(a, b, c)
        );
      }),
      (H.fromTo = function (a, b, c, d) {
        return (
          (d.startAt = c),
          (d.immediateRender =
            0 != d.immediateRender && 0 != c.immediateRender),
          new H(a, b, d)
        );
      }),
      (H.delayedCall = function (a, b, c, d, e) {
        return new H(b, 0, {
          delay: a,
          onComplete: b,
          onCompleteParams: c,
          callbackScope: d,
          onReverseComplete: b,
          onReverseCompleteParams: c,
          immediateRender: !1,
          lazy: !1,
          useFrames: e,
          overwrite: 0,
        });
      }),
      (H.set = function (a, b) {
        return new H(a, 0, b);
      }),
      (H.getTweensOf = function (a, b) {
        if (null == a) return [];
        a = "string" != typeof a ? a : H.selector(a) || a;
        var c, d, e, f;
        if ((q(a) || I(a)) && "number" != typeof a[0]) {
          for (c = a.length, d = []; --c > -1; )
            d = d.concat(H.getTweensOf(a[c], b));
          for (c = d.length; --c > -1; )
            for (f = d[c], e = c; --e > -1; ) f === d[e] && d.splice(c, 1);
        } else if (a._gsTweenID)
          for (d = aa(a).concat(), c = d.length; --c > -1; )
            (d[c]._gc || (b && !d[c].isActive())) && d.splice(c, 1);
        return d || [];
      }),
      (H.killTweensOf = H.killDelayedCallsTo =
        function (a, b, c) {
          "object" == typeof b && ((c = b), (b = !1));
          for (var d = H.getTweensOf(a, b), e = d.length; --e > -1; )
            d[e]._kill(c, a);
        });
    var ea = u(
      "plugins.TweenPlugin",
      function (a, b) {
        (this._overwriteProps = (a || "").split(",")),
          (this._propName = this._overwriteProps[0]),
          (this._priority = b || 0),
          (this._super = ea.prototype);
      },
      !0
    );
    if (
      ((i = ea.prototype),
      (ea.version = "1.19.0"),
      (ea.API = 2),
      (i._firstPT = null),
      (i._addTween = R),
      (i.setRatio = O),
      (i._kill = function (a) {
        var b,
          c = this._overwriteProps,
          d = this._firstPT;
        if (null != a[this._propName]) this._overwriteProps = [];
        else for (b = c.length; --b > -1; ) null != a[c[b]] && c.splice(b, 1);
        for (; d; )
          null != a[d.n] &&
            (d._next && (d._next._prev = d._prev),
            d._prev
              ? ((d._prev._next = d._next), (d._prev = null))
              : this._firstPT === d && (this._firstPT = d._next)),
            (d = d._next);
        return !1;
      }),
      (i._mod = i._roundProps =
        function (a) {
          for (var b, c = this._firstPT; c; )
            (b =
              a[this._propName] ||
              (null != c.n && a[c.n.split(this._propName + "_").join("")])),
              b &&
                "function" == typeof b &&
                (2 === c.f ? (c.t._applyPT.m = b) : (c.m = b)),
              (c = c._next);
        }),
      (H._onPluginEvent = function (a, b) {
        var c,
          d,
          e,
          f,
          g,
          h = b._firstPT;
        if ("_onInitAllProps" === a) {
          for (; h; ) {
            for (g = h._next, d = e; d && d.pr > h.pr; ) d = d._next;
            (h._prev = d ? d._prev : f) ? (h._prev._next = h) : (e = h),
              (h._next = d) ? (d._prev = h) : (f = h),
              (h = g);
          }
          h = b._firstPT = e;
        }
        for (; h; )
          h.pg && "function" == typeof h.t[a] && h.t[a]() && (c = !0),
            (h = h._next);
        return c;
      }),
      (ea.activate = function (a) {
        for (var b = a.length; --b > -1; )
          a[b].API === ea.API && (T[new a[b]()._propName] = a[b]);
        return !0;
      }),
      (t.plugin = function (a) {
        if (!(a && a.propName && a.init && a.API))
          throw "illegal plugin definition.";
        var b,
          c = a.propName,
          d = a.priority || 0,
          e = a.overwriteProps,
          f = {
            init: "_onInitTween",
            set: "setRatio",
            kill: "_kill",
            round: "_mod",
            mod: "_mod",
            initAll: "_onInitAllProps",
          },
          g = u(
            "plugins." + c.charAt(0).toUpperCase() + c.substr(1) + "Plugin",
            function () {
              ea.call(this, c, d), (this._overwriteProps = e || []);
            },
            a.global === !0
          ),
          h = (g.prototype = new ea(c));
        (h.constructor = g), (g.API = a.API);
        for (b in f) "function" == typeof a[b] && (h[f[b]] = a[b]);
        return (g.version = a.version), ea.activate([g]), g;
      }),
      (g = a._gsQueue))
    ) {
      for (h = 0; h < g.length; h++) g[h]();
      for (i in r)
        r[i].func || a.console.log("GSAP encountered missing dependency: " + i);
    }
    k = !1;
  })(
    "undefined" != typeof module &&
      module.exports &&
      "undefined" != typeof global
      ? global
      : this || window,
    "TweenMax"
  );

/*! ScrollMagic v2.0.6 | (c) 2018 Jan Paepke (@janpaepke) | license & info: http://scrollmagic.io */
!(function (e, t) {
  "function" == typeof define && define.amd
    ? define(t)
    : "object" == typeof exports
    ? (module.exports = t())
    : (e.ScrollMagic = t());
})(this, function () {
  "use strict";
  var e = function () {};
  (e.version = "2.0.6"), window.addEventListener("mousewheel", function () {});
  var t = "data-scrollmagic-pin-spacer";
  e.Controller = function (r) {
    var o,
      s,
      a = "ScrollMagic.Controller",
      l = "FORWARD",
      c = "REVERSE",
      f = "PAUSED",
      u = n.defaults,
      d = this,
      h = i.extend({}, u, r),
      g = [],
      p = !1,
      v = 0,
      m = f,
      w = !0,
      y = 0,
      S = !0,
      b = function () {
        for (var e in h) u.hasOwnProperty(e) || delete h[e];
        if (((h.container = i.get.elements(h.container)[0]), !h.container))
          throw a + " init failed.";
        (w =
          h.container === window ||
          h.container === document.body ||
          !document.body.contains(h.container)),
          w && (h.container = window),
          (y = z()),
          h.container.addEventListener("resize", T),
          h.container.addEventListener("scroll", T);
        var t = parseInt(h.refreshInterval, 10);
        (h.refreshInterval = i.type.Number(t) ? t : u.refreshInterval), E();
      },
      E = function () {
        h.refreshInterval > 0 && (s = window.setTimeout(A, h.refreshInterval));
      },
      x = function () {
        return h.vertical
          ? i.get.scrollTop(h.container)
          : i.get.scrollLeft(h.container);
      },
      z = function () {
        return h.vertical
          ? i.get.height(h.container)
          : i.get.width(h.container);
      },
      C = (this._setScrollPos = function (e) {
        h.vertical
          ? w
            ? window.scrollTo(i.get.scrollLeft(), e)
            : (h.container.scrollTop = e)
          : w
          ? window.scrollTo(e, i.get.scrollTop())
          : (h.container.scrollLeft = e);
      }),
      F = function () {
        if (S && p) {
          var e = i.type.Array(p) ? p : g.slice(0);
          p = !1;
          var t = v;
          v = d.scrollPos();
          var n = v - t;
          0 !== n && (m = n > 0 ? l : c),
            m === c && e.reverse(),
            e.forEach(function (e) {
              e.update(!0);
            });
        }
      },
      L = function () {
        o = i.rAF(F);
      },
      T = function (e) {
        "resize" == e.type && ((y = z()), (m = f)), p !== !0 && ((p = !0), L());
      },
      A = function () {
        if (!w && y != z()) {
          var e;
          try {
            e = new Event("resize", { bubbles: !1, cancelable: !1 });
          } catch (t) {
            (e = document.createEvent("Event")), e.initEvent("resize", !1, !1);
          }
          h.container.dispatchEvent(e);
        }
        g.forEach(function (e) {
          e.refresh();
        }),
          E();
      };
    this._options = h;
    var N = function (e) {
      if (e.length <= 1) return e;
      var t = e.slice(0);
      return (
        t.sort(function (e, t) {
          return e.scrollOffset() > t.scrollOffset() ? 1 : -1;
        }),
        t
      );
    };
    return (
      (this.addScene = function (t) {
        if (i.type.Array(t))
          t.forEach(function (e) {
            d.addScene(e);
          });
        else if (t instanceof e.Scene)
          if (t.controller() !== d) t.addTo(d);
          else if (g.indexOf(t) < 0) {
            g.push(t),
              (g = N(g)),
              t.on("shift.controller_sort", function () {
                g = N(g);
              });
            for (var n in h.globalSceneOptions)
              t[n] && t[n].call(t, h.globalSceneOptions[n]);
          }
        return d;
      }),
      (this.removeScene = function (e) {
        if (i.type.Array(e))
          e.forEach(function (e) {
            d.removeScene(e);
          });
        else {
          var t = g.indexOf(e);
          t > -1 &&
            (e.off("shift.controller_sort"), g.splice(t, 1), e.remove());
        }
        return d;
      }),
      (this.updateScene = function (t, n) {
        return (
          i.type.Array(t)
            ? t.forEach(function (e) {
                d.updateScene(e, n);
              })
            : n
            ? t.update(!0)
            : p !== !0 &&
              t instanceof e.Scene &&
              ((p = p || []), -1 == p.indexOf(t) && p.push(t), (p = N(p)), L()),
          d
        );
      }),
      (this.update = function (e) {
        return T({ type: "resize" }), e && F(), d;
      }),
      (this.scrollTo = function (n, r) {
        if (i.type.Number(n)) C.call(h.container, n, r);
        else if (n instanceof e.Scene)
          n.controller() === d && d.scrollTo(n.scrollOffset(), r);
        else if (i.type.Function(n)) C = n;
        else {
          var o = i.get.elements(n)[0];
          if (o) {
            for (; o.parentNode.hasAttribute(t); ) o = o.parentNode;
            var s = h.vertical ? "top" : "left",
              a = i.get.offset(h.container),
              l = i.get.offset(o);
            w || (a[s] -= d.scrollPos()), d.scrollTo(l[s] - a[s], r);
          }
        }
        return d;
      }),
      (this.scrollPos = function (e) {
        return arguments.length
          ? (i.type.Function(e) && (x = e), d)
          : x.call(d);
      }),
      (this.info = function (e) {
        var t = {
          size: y,
          vertical: h.vertical,
          scrollPos: v,
          scrollDirection: m,
          container: h.container,
          isDocument: w,
        };
        return arguments.length ? (void 0 !== t[e] ? t[e] : void 0) : t;
      }),
      (this.loglevel = function () {
        return d;
      }),
      (this.enabled = function (e) {
        return arguments.length
          ? (S != e && ((S = !!e), d.updateScene(g, !0)), d)
          : S;
      }),
      (this.destroy = function (e) {
        window.clearTimeout(s);
        for (var t = g.length; t--; ) g[t].destroy(e);
        return (
          h.container.removeEventListener("resize", T),
          h.container.removeEventListener("scroll", T),
          i.cAF(o),
          null
        );
      }),
      b(),
      d
    );
  };
  var n = {
    defaults: {
      container: window,
      vertical: !0,
      globalSceneOptions: {},
      loglevel: 2,
      refreshInterval: 100,
    },
  };
  (e.Controller.addOption = function (e, t) {
    n.defaults[e] = t;
  }),
    (e.Controller.extend = function (t) {
      var n = this;
      (e.Controller = function () {
        return (
          n.apply(this, arguments),
          (this.$super = i.extend({}, this)),
          t.apply(this, arguments) || this
        );
      }),
        i.extend(e.Controller, n),
        (e.Controller.prototype = n.prototype),
        (e.Controller.prototype.constructor = e.Controller);
    }),
    (e.Scene = function (n) {
      var o,
        s,
        a = "BEFORE",
        l = "DURING",
        c = "AFTER",
        f = r.defaults,
        u = this,
        d = i.extend({}, f, n),
        h = a,
        g = 0,
        p = { start: 0, end: 0 },
        v = 0,
        m = !0,
        w = function () {
          for (var e in d) f.hasOwnProperty(e) || delete d[e];
          for (var t in f) L(t);
          C();
        },
        y = {};
      (this.on = function (e, t) {
        return (
          i.type.Function(t) &&
            ((e = e.trim().split(" ")),
            e.forEach(function (e) {
              var n = e.split("."),
                r = n[0],
                i = n[1];
              "*" != r &&
                (y[r] || (y[r] = []),
                y[r].push({ namespace: i || "", callback: t }));
            })),
          u
        );
      }),
        (this.off = function (e, t) {
          return e
            ? ((e = e.trim().split(" ")),
              e.forEach(function (e) {
                var n = e.split("."),
                  r = n[0],
                  i = n[1] || "",
                  o = "*" === r ? Object.keys(y) : [r];
                o.forEach(function (e) {
                  for (var n = y[e] || [], r = n.length; r--; ) {
                    var o = n[r];
                    !o ||
                      (i !== o.namespace && "*" !== i) ||
                      (t && t != o.callback) ||
                      n.splice(r, 1);
                  }
                  n.length || delete y[e];
                });
              }),
              u)
            : u;
        }),
        (this.trigger = function (t, n) {
          if (t) {
            var r = t.trim().split("."),
              i = r[0],
              o = r[1],
              s = y[i];
            s &&
              s.forEach(function (t) {
                (o && o !== t.namespace) ||
                  t.callback.call(u, new e.Event(i, t.namespace, u, n));
              });
          }
          return u;
        }),
        u
          .on("change.internal", function (e) {
            "loglevel" !== e.what &&
              "tweenChanges" !== e.what &&
              ("triggerElement" === e.what
                ? E()
                : "reverse" === e.what && u.update());
          })
          .on("shift.internal", function () {
            S(), u.update();
          }),
        (this.addTo = function (t) {
          return (
            t instanceof e.Controller &&
              s != t &&
              (s && s.removeScene(u),
              (s = t),
              C(),
              b(!0),
              E(!0),
              S(),
              s.info("container").addEventListener("resize", x),
              t.addScene(u),
              u.trigger("add", { controller: s }),
              u.update()),
            u
          );
        }),
        (this.enabled = function (e) {
          return arguments.length
            ? (m != e && ((m = !!e), u.update(!0)), u)
            : m;
        }),
        (this.remove = function () {
          if (s) {
            s.info("container").removeEventListener("resize", x);
            var e = s;
            (s = void 0), e.removeScene(u), u.trigger("remove");
          }
          return u;
        }),
        (this.destroy = function (e) {
          return (
            u.trigger("destroy", { reset: e }), u.remove(), u.off("*.*"), null
          );
        }),
        (this.update = function (e) {
          if (s)
            if (e)
              if (s.enabled() && m) {
                var t,
                  n = s.info("scrollPos");
                (t =
                  d.duration > 0
                    ? (n - p.start) / (p.end - p.start)
                    : n >= p.start
                    ? 1
                    : 0),
                  u.trigger("update", {
                    startPos: p.start,
                    endPos: p.end,
                    scrollPos: n,
                  }),
                  u.progress(t);
              } else T && h === l && N(!0);
            else s.updateScene(u, !1);
          return u;
        }),
        (this.refresh = function () {
          return b(), E(), u;
        }),
        (this.progress = function (e) {
          if (arguments.length) {
            var t = !1,
              n = h,
              r = s ? s.info("scrollDirection") : "PAUSED",
              i = d.reverse || e >= g;
            if (
              (0 === d.duration
                ? ((t = g != e),
                  (g = 1 > e && i ? 0 : 1),
                  (h = 0 === g ? a : l))
                : 0 > e && h !== a && i
                ? ((g = 0), (h = a), (t = !0))
                : e >= 0 && 1 > e && i
                ? ((g = e), (h = l), (t = !0))
                : e >= 1 && h !== c
                ? ((g = 1), (h = c), (t = !0))
                : h !== l || i || N(),
              t)
            ) {
              var o = { progress: g, state: h, scrollDirection: r },
                f = h != n,
                p = function (e) {
                  u.trigger(e, o);
                };
              f && n !== l && (p("enter"), p(n === a ? "start" : "end")),
                p("progress"),
                f && h !== l && (p(h === a ? "start" : "end"), p("leave"));
            }
            return u;
          }
          return g;
        });
      var S = function () {
          (p = { start: v + d.offset }),
            s &&
              d.triggerElement &&
              (p.start -= s.info("size") * d.triggerHook),
            (p.end = p.start + d.duration);
        },
        b = function (e) {
          if (o) {
            var t = "duration";
            F(t, o.call(u)) &&
              !e &&
              (u.trigger("change", { what: t, newval: d[t] }),
              u.trigger("shift", { reason: t }));
          }
        },
        E = function (e) {
          var n = 0,
            r = d.triggerElement;
          if (s && (r || v > 0)) {
            if (r)
              if (r.parentNode) {
                for (
                  var o = s.info(),
                    a = i.get.offset(o.container),
                    l = o.vertical ? "top" : "left";
                  r.parentNode.hasAttribute(t);

                )
                  r = r.parentNode;
                var c = i.get.offset(r);
                o.isDocument || (a[l] -= s.scrollPos()), (n = c[l] - a[l]);
              } else u.triggerElement(void 0);
            var f = n != v;
            (v = n),
              f &&
                !e &&
                u.trigger("shift", { reason: "triggerElementPosition" });
          }
        },
        x = function () {
          d.triggerHook > 0 &&
            u.trigger("shift", { reason: "containerResize" });
        },
        z = i.extend(r.validate, {
          duration: function (e) {
            if (i.type.String(e) && e.match(/^(\.|\d)*\d+%$/)) {
              var t = parseFloat(e) / 100;
              e = function () {
                return s ? s.info("size") * t : 0;
              };
            }
            if (i.type.Function(e)) {
              o = e;
              try {
                e = parseFloat(o());
              } catch (n) {
                e = -1;
              }
            }
            if (((e = parseFloat(e)), !i.type.Number(e) || 0 > e))
              throw o ? ((o = void 0), 0) : 0;
            return e;
          },
        }),
        C = function (e) {
          (e = arguments.length ? [e] : Object.keys(z)),
            e.forEach(function (e) {
              var t;
              if (z[e])
                try {
                  t = z[e](d[e]);
                } catch (n) {
                  t = f[e];
                } finally {
                  d[e] = t;
                }
            });
        },
        F = function (e, t) {
          var n = !1,
            r = d[e];
          return d[e] != t && ((d[e] = t), C(e), (n = r != d[e])), n;
        },
        L = function (e) {
          u[e] ||
            (u[e] = function (t) {
              return arguments.length
                ? ("duration" === e && (o = void 0),
                  F(e, t) &&
                    (u.trigger("change", { what: e, newval: d[e] }),
                    r.shifts.indexOf(e) > -1 &&
                      u.trigger("shift", { reason: e })),
                  u)
                : d[e];
            });
        };
      (this.controller = function () {
        return s;
      }),
        (this.state = function () {
          return h;
        }),
        (this.scrollOffset = function () {
          return p.start;
        }),
        (this.triggerPosition = function () {
          var e = d.offset;
          return (
            s && (e += d.triggerElement ? v : s.info("size") * u.triggerHook()),
            e
          );
        });
      var T, A;
      u.on("shift.internal", function (e) {
        var t = "duration" === e.reason;
        ((h === c && t) || (h === l && 0 === d.duration)) && N(), t && O();
      })
        .on("progress.internal", function () {
          N();
        })
        .on("add.internal", function () {
          O();
        })
        .on("destroy.internal", function (e) {
          u.removePin(e.reset);
        });
      var N = function (e) {
          if (T && s) {
            var t = s.info(),
              n = A.spacer.firstChild;
            if (e || h !== l) {
              var r = {
                  position: A.inFlow ? "relative" : "absolute",
                  top: 0,
                  left: 0,
                },
                o = i.css(n, "position") != r.position;
              A.pushFollowers
                ? d.duration > 0 &&
                  (h === c && 0 === parseFloat(i.css(A.spacer, "padding-top"))
                    ? (o = !0)
                    : h === a &&
                      0 === parseFloat(i.css(A.spacer, "padding-bottom")) &&
                      (o = !0))
                : (r[t.vertical ? "top" : "left"] = d.duration * g),
                i.css(n, r),
                o && O();
            } else {
              "fixed" != i.css(n, "position") &&
                (i.css(n, { position: "fixed" }), O());
              var f = i.get.offset(A.spacer, !0),
                u =
                  d.reverse || 0 === d.duration
                    ? t.scrollPos - p.start
                    : Math.round(g * d.duration * 10) / 10;
              (f[t.vertical ? "top" : "left"] += u),
                i.css(A.spacer.firstChild, { top: f.top, left: f.left });
            }
          }
        },
        O = function () {
          if (T && s && A.inFlow) {
            var e = h === l,
              t = s.info("vertical"),
              n = A.spacer.firstChild,
              r = i.isMarginCollapseType(i.css(A.spacer, "display")),
              o = {};
            A.relSize.width || A.relSize.autoFullWidth
              ? e
                ? i.css(T, { width: i.get.width(A.spacer) })
                : i.css(T, { width: "100%" })
              : ((o["min-width"] = i.get.width(t ? T : n, !0, !0)),
                (o.width = e ? o["min-width"] : "auto")),
              A.relSize.height
                ? e
                  ? i.css(T, {
                      height:
                        i.get.height(A.spacer) -
                        (A.pushFollowers ? d.duration : 0),
                    })
                  : i.css(T, { height: "100%" })
                : ((o["min-height"] = i.get.height(t ? n : T, !0, !r)),
                  (o.height = e ? o["min-height"] : "auto")),
              A.pushFollowers &&
                ((o["padding" + (t ? "Top" : "Left")] = d.duration * g),
                (o["padding" + (t ? "Bottom" : "Right")] =
                  d.duration * (1 - g))),
              i.css(A.spacer, o);
          }
        },
        _ = function () {
          s && T && h === l && !s.info("isDocument") && N();
        },
        P = function () {
          s &&
            T &&
            h === l &&
            (((A.relSize.width || A.relSize.autoFullWidth) &&
              i.get.width(window) != i.get.width(A.spacer.parentNode)) ||
              (A.relSize.height &&
                i.get.height(window) != i.get.height(A.spacer.parentNode))) &&
            O();
        },
        D = function (e) {
          s &&
            T &&
            h === l &&
            !s.info("isDocument") &&
            (e.preventDefault(),
            s._setScrollPos(
              s.info("scrollPos") -
                ((e.wheelDelta ||
                  e[s.info("vertical") ? "wheelDeltaY" : "wheelDeltaX"]) / 3 ||
                  30 * -e.detail)
            ));
        };
      (this.setPin = function (e, n) {
        var r = { pushFollowers: !0, spacerClass: "scrollmagic-pin-spacer" };
        if (((n = i.extend({}, r, n)), (e = i.get.elements(e)[0]), !e))
          return u;
        if ("fixed" === i.css(e, "position")) return u;
        if (T) {
          if (T === e) return u;
          u.removePin();
        }
        T = e;
        var o = T.parentNode.style.display,
          s = [
            "top",
            "left",
            "bottom",
            "right",
            "margin",
            "marginLeft",
            "marginRight",
            "marginTop",
            "marginBottom",
          ];
        T.parentNode.style.display = "none";
        var a = "absolute" != i.css(T, "position"),
          l = i.css(T, s.concat(["display"])),
          c = i.css(T, ["width", "height"]);
        (T.parentNode.style.display = o),
          !a && n.pushFollowers && (n.pushFollowers = !1);
        var f = T.parentNode.insertBefore(document.createElement("div"), T),
          d = i.extend(l, {
            position: a ? "relative" : "absolute",
            boxSizing: "content-box",
            mozBoxSizing: "content-box",
            webkitBoxSizing: "content-box",
          });
        if (
          (a || i.extend(d, i.css(T, ["width", "height"])),
          i.css(f, d),
          f.setAttribute(t, ""),
          i.addClass(f, n.spacerClass),
          (A = {
            spacer: f,
            relSize: {
              width: "%" === c.width.slice(-1),
              height: "%" === c.height.slice(-1),
              autoFullWidth:
                "auto" === c.width && a && i.isMarginCollapseType(l.display),
            },
            pushFollowers: n.pushFollowers,
            inFlow: a,
          }),
          !T.___origStyle)
        ) {
          T.___origStyle = {};
          var h = T.style,
            g = s.concat([
              "width",
              "height",
              "position",
              "boxSizing",
              "mozBoxSizing",
              "webkitBoxSizing",
            ]);
          g.forEach(function (e) {
            T.___origStyle[e] = h[e] || "";
          });
        }
        return (
          A.relSize.width && i.css(f, { width: c.width }),
          A.relSize.height && i.css(f, { height: c.height }),
          f.appendChild(T),
          i.css(T, {
            position: a ? "relative" : "absolute",
            margin: "auto",
            top: "auto",
            left: "auto",
            bottom: "auto",
            right: "auto",
          }),
          (A.relSize.width || A.relSize.autoFullWidth) &&
            i.css(T, {
              boxSizing: "border-box",
              mozBoxSizing: "border-box",
              webkitBoxSizing: "border-box",
            }),
          window.addEventListener("scroll", _),
          window.addEventListener("resize", _),
          window.addEventListener("resize", P),
          T.addEventListener("mousewheel", D),
          T.addEventListener("DOMMouseScroll", D),
          N(),
          u
        );
      }),
        (this.removePin = function (e) {
          if (T) {
            if ((h === l && N(!0), e || !s)) {
              var n = A.spacer.firstChild;
              if (n.hasAttribute(t)) {
                var r = A.spacer.style,
                  o = [
                    "margin",
                    "marginLeft",
                    "marginRight",
                    "marginTop",
                    "marginBottom",
                  ],
                  a = {};
                o.forEach(function (e) {
                  a[e] = r[e] || "";
                }),
                  i.css(n, a);
              }
              A.spacer.parentNode.insertBefore(n, A.spacer),
                A.spacer.parentNode.removeChild(A.spacer),
                T.parentNode.hasAttribute(t) ||
                  (i.css(T, T.___origStyle), delete T.___origStyle);
            }
            window.removeEventListener("scroll", _),
              window.removeEventListener("resize", _),
              window.removeEventListener("resize", P),
              T.removeEventListener("mousewheel", D),
              T.removeEventListener("DOMMouseScroll", D),
              (T = void 0);
          }
          return u;
        });
      var R,
        k = [];
      return (
        u.on("destroy.internal", function (e) {
          u.removeClassToggle(e.reset);
        }),
        (this.setClassToggle = function (e, t) {
          var n = i.get.elements(e);
          return 0 !== n.length && i.type.String(t)
            ? (k.length > 0 && u.removeClassToggle(),
              (R = t),
              (k = n),
              u.on("enter.internal_class leave.internal_class", function (e) {
                var t = "enter" === e.type ? i.addClass : i.removeClass;
                k.forEach(function (e) {
                  t(e, R);
                });
              }),
              u)
            : u;
        }),
        (this.removeClassToggle = function (e) {
          return (
            e &&
              k.forEach(function (e) {
                i.removeClass(e, R);
              }),
            u.off("start.internal_class end.internal_class"),
            (R = void 0),
            (k = []),
            u
          );
        }),
        w(),
        u
      );
    });
  var r = {
    defaults: {
      duration: 0,
      offset: 0,
      triggerElement: void 0,
      triggerHook: 0.5,
      reverse: !0,
      loglevel: 2,
    },
    validate: {
      offset: function (e) {
        if (((e = parseFloat(e)), !i.type.Number(e))) throw 0;
        return e;
      },
      triggerElement: function (e) {
        if ((e = e || void 0)) {
          var t = i.get.elements(e)[0];
          if (!t || !t.parentNode) throw 0;
          e = t;
        }
        return e;
      },
      triggerHook: function (e) {
        var t = { onCenter: 0.5, onEnter: 1, onLeave: 0 };
        if (i.type.Number(e)) e = Math.max(0, Math.min(parseFloat(e), 1));
        else {
          if (!(e in t)) throw 0;
          e = t[e];
        }
        return e;
      },
      reverse: function (e) {
        return !!e;
      },
    },
    shifts: ["duration", "offset", "triggerHook"],
  };
  (e.Scene.addOption = function (e, t, n, i) {
    e in r.defaults ||
      ((r.defaults[e] = t), (r.validate[e] = n), i && r.shifts.push(e));
  }),
    (e.Scene.extend = function (t) {
      var n = this;
      (e.Scene = function () {
        return (
          n.apply(this, arguments),
          (this.$super = i.extend({}, this)),
          t.apply(this, arguments) || this
        );
      }),
        i.extend(e.Scene, n),
        (e.Scene.prototype = n.prototype),
        (e.Scene.prototype.constructor = e.Scene);
    }),
    (e.Event = function (e, t, n, r) {
      r = r || {};
      for (var i in r) this[i] = r[i];
      return (
        (this.type = e),
        (this.target = this.currentTarget = n),
        (this.namespace = t || ""),
        (this.timeStamp = this.timestamp = Date.now()),
        this
      );
    });
  var i = (e._util = (function (e) {
    var t,
      n = {},
      r = function (e) {
        return parseFloat(e) || 0;
      },
      i = function (t) {
        return t.currentStyle ? t.currentStyle : e.getComputedStyle(t);
      },
      o = function (t, n, o, s) {
        if (((n = n === document ? e : n), n === e)) s = !1;
        else if (!u.DomElement(n)) return 0;
        t = t.charAt(0).toUpperCase() + t.substr(1).toLowerCase();
        var a =
          (o
            ? n["offset" + t] || n["outer" + t]
            : n["client" + t] || n["inner" + t]) || 0;
        if (o && s) {
          var l = i(n);
          a +=
            "Height" === t
              ? r(l.marginTop) + r(l.marginBottom)
              : r(l.marginLeft) + r(l.marginRight);
        }
        return a;
      },
      s = function (e) {
        return e
          .replace(/^[^a-z]+([a-z])/g, "$1")
          .replace(/-([a-z])/g, function (e) {
            return e[1].toUpperCase();
          });
      };
    (n.extend = function (e) {
      for (e = e || {}, t = 1; t < arguments.length; t++)
        if (arguments[t])
          for (var n in arguments[t])
            arguments[t].hasOwnProperty(n) && (e[n] = arguments[t][n]);
      return e;
    }),
      (n.isMarginCollapseType = function (e) {
        return (
          ["block", "flex", "list-item", "table", "-webkit-box"].indexOf(e) > -1
        );
      });
    var a = 0,
      l = ["ms", "moz", "webkit", "o"],
      c = e.requestAnimationFrame,
      f = e.cancelAnimationFrame;
    for (t = 0; !c && t < l.length; ++t)
      (c = e[l[t] + "RequestAnimationFrame"]),
        (f =
          e[l[t] + "CancelAnimationFrame"] ||
          e[l[t] + "CancelRequestAnimationFrame"]);
    c ||
      (c = function (t) {
        var n = new Date().getTime(),
          r = Math.max(0, 16 - (n - a)),
          i = e.setTimeout(function () {
            t(n + r);
          }, r);
        return (a = n + r), i;
      }),
      f ||
        (f = function (t) {
          e.clearTimeout(t);
        }),
      (n.rAF = c.bind(e)),
      (n.cAF = f.bind(e));
    var u = (n.type = function (e) {
      return Object.prototype.toString
        .call(e)
        .replace(/^\[object (.+)\]$/, "$1")
        .toLowerCase();
    });
    (u.String = function (e) {
      return "string" === u(e);
    }),
      (u.Function = function (e) {
        return "function" === u(e);
      }),
      (u.Array = function (e) {
        return Array.isArray(e);
      }),
      (u.Number = function (e) {
        return !u.Array(e) && e - parseFloat(e) + 1 >= 0;
      }),
      (u.DomElement = function (e) {
        return "object" == typeof HTMLElement
          ? e instanceof HTMLElement
          : e &&
              "object" == typeof e &&
              null !== e &&
              1 === e.nodeType &&
              "string" == typeof e.nodeName;
      });
    var d = (n.get = {});
    return (
      (d.elements = function (t) {
        var n = [];
        if (u.String(t))
          try {
            t = document.querySelectorAll(t);
          } catch (r) {
            return n;
          }
        if ("nodelist" === u(t) || u.Array(t))
          for (var i = 0, o = (n.length = t.length); o > i; i++) {
            var s = t[i];
            n[i] = u.DomElement(s) ? s : d.elements(s);
          }
        else (u.DomElement(t) || t === document || t === e) && (n = [t]);
        return n;
      }),
      (d.scrollTop = function (t) {
        return t && "number" == typeof t.scrollTop
          ? t.scrollTop
          : e.pageYOffset || 0;
      }),
      (d.scrollLeft = function (t) {
        return t && "number" == typeof t.scrollLeft
          ? t.scrollLeft
          : e.pageXOffset || 0;
      }),
      (d.width = function (e, t, n) {
        return o("width", e, t, n);
      }),
      (d.height = function (e, t, n) {
        return o("height", e, t, n);
      }),
      (d.offset = function (e, t) {
        var n = { top: 0, left: 0 };
        if (e && e.getBoundingClientRect) {
          var r = e.getBoundingClientRect();
          (n.top = r.top),
            (n.left = r.left),
            t || ((n.top += d.scrollTop()), (n.left += d.scrollLeft()));
        }
        return n;
      }),
      (n.addClass = function (e, t) {
        t && (e.classList ? e.classList.add(t) : (e.className += " " + t));
      }),
      (n.removeClass = function (e, t) {
        t &&
          (e.classList
            ? e.classList.remove(t)
            : (e.className = e.className.replace(
                RegExp("(^|\\b)" + t.split(" ").join("|") + "(\\b|$)", "gi"),
                " "
              )));
      }),
      (n.css = function (e, t) {
        if (u.String(t)) return i(e)[s(t)];
        if (u.Array(t)) {
          var n = {},
            r = i(e);
          return (
            t.forEach(function (e) {
              n[e] = r[s(e)];
            }),
            n
          );
        }
        for (var o in t) {
          var a = t[o];
          a == parseFloat(a) && (a += "px"), (e.style[s(o)] = a);
        }
      }),
      n
    );
  })(window || {}));
  return e;
});

/*! ScrollMagic v2.0.6 | (c) 2018 Jan Paepke (@janpaepke) | license & info: http://scrollmagic.io */
!(function (e, n) {
  "function" == typeof define && define.amd
    ? define(["ScrollMagic", "TweenMax", "TimelineMax"], n)
    : "object" == typeof exports
    ? (require("gsap"), n(require("scrollmagic"), TweenMax, TimelineMax))
    : n(
        e.ScrollMagic || (e.jQuery && e.jQuery.ScrollMagic),
        e.TweenMax || e.TweenLite,
        e.TimelineMax || e.TimelineLite
      );
})(this, function (e, n, r) {
  "use strict";
  e.Scene.addOption("tweenChanges", !1, function (e) {
    return !!e;
  }),
    e.Scene.extend(function () {
      var e,
        t = this;
      t.on("progress.plugin_gsap", function () {
        i();
      }),
        t.on("destroy.plugin_gsap", function (e) {
          t.removeTween(e.reset);
        });
      var i = function () {
        if (e) {
          var n = t.progress(),
            r = t.state();
          e.repeat && -1 === e.repeat()
            ? "DURING" === r && e.paused()
              ? e.play()
              : "DURING" === r || e.paused() || e.pause()
            : n != e.progress() &&
              (0 === t.duration()
                ? n > 0
                  ? e.play()
                  : e.reverse()
                : t.tweenChanges() && e.tweenTo
                ? e.tweenTo(n * e.duration())
                : e.progress(n).pause());
        }
      };
      (t.setTween = function (o, a, s) {
        var u;
        arguments.length > 1 &&
          (arguments.length < 3 && ((s = a), (a = 1)), (o = n.to(o, a, s)));
        try {
          (u = r ? new r({ smoothChildTiming: !0 }).add(o) : o), u.pause();
        } catch (p) {
          return t;
        }
        return (
          e && t.removeTween(),
          (e = u),
          o.repeat && -1 === o.repeat() && (e.repeat(-1), e.yoyo(o.yoyo())),
          i(),
          t
        );
      }),
        (t.removeTween = function (n) {
          return e && (n && e.progress(0).pause(), e.kill(), (e = void 0)), t;
        });
    });
});

/* d3.v3.min.js */
!(function () {
  function n(n) {
    return n && (n.ownerDocument || n.document || n).documentElement;
  }
  function t(n) {
    return (
      n &&
      ((n.ownerDocument && n.ownerDocument.defaultView) ||
        (n.document && n) ||
        n.defaultView)
    );
  }
  function e(n, t) {
    return t > n ? -1 : n > t ? 1 : n >= t ? 0 : NaN;
  }
  function r(n) {
    return null === n ? NaN : +n;
  }
  function i(n) {
    return !isNaN(n);
  }
  function u(n) {
    return {
      left: function (t, e, r, i) {
        for (
          arguments.length < 3 && (r = 0),
            arguments.length < 4 && (i = t.length);
          i > r;

        ) {
          var u = (r + i) >>> 1;
          n(t[u], e) < 0 ? (r = u + 1) : (i = u);
        }
        return r;
      },
      right: function (t, e, r, i) {
        for (
          arguments.length < 3 && (r = 0),
            arguments.length < 4 && (i = t.length);
          i > r;

        ) {
          var u = (r + i) >>> 1;
          n(t[u], e) > 0 ? (i = u) : (r = u + 1);
        }
        return r;
      },
    };
  }
  function o(n) {
    return n.length;
  }
  function a(n) {
    for (var t = 1; (n * t) % 1; ) t *= 10;
    return t;
  }
  function l(n, t) {
    for (var e in t)
      Object.defineProperty(n.prototype, e, { value: t[e], enumerable: !1 });
  }
  function c() {
    this._ = Object.create(null);
  }
  function f(n) {
    return (n += "") === bo || n[0] === _o ? _o + n : n;
  }
  function s(n) {
    return (n += "")[0] === _o ? n.slice(1) : n;
  }
  function h(n) {
    return f(n) in this._;
  }
  function p(n) {
    return (n = f(n)) in this._ && delete this._[n];
  }
  function g() {
    var n = [];
    for (var t in this._) n.push(s(t));
    return n;
  }
  function v() {
    var n = 0;
    for (var t in this._) ++n;
    return n;
  }
  function d() {
    for (var n in this._) return !1;
    return !0;
  }
  function y() {
    this._ = Object.create(null);
  }
  function m(n) {
    return n;
  }
  function M(n, t, e) {
    return function () {
      var r = e.apply(t, arguments);
      return r === t ? n : r;
    };
  }
  function x(n, t) {
    if (t in n) return t;
    t = t.charAt(0).toUpperCase() + t.slice(1);
    for (var e = 0, r = wo.length; r > e; ++e) {
      var i = wo[e] + t;
      if (i in n) return i;
    }
  }
  function b() {}
  function _() {}
  function w(n) {
    function t() {
      for (var t, r = e, i = -1, u = r.length; ++i < u; )
        (t = r[i].on) && t.apply(this, arguments);
      return n;
    }
    var e = [],
      r = new c();
    return (
      (t.on = function (t, i) {
        var u,
          o = r.get(t);
        return arguments.length < 2
          ? o && o.on
          : (o &&
              ((o.on = null),
              (e = e.slice(0, (u = e.indexOf(o))).concat(e.slice(u + 1))),
              r.remove(t)),
            i && e.push(r.set(t, { on: i })),
            n);
      }),
      t
    );
  }
  function S() {
    ao.event.preventDefault();
  }
  function k() {
    for (var n, t = ao.event; (n = t.sourceEvent); ) t = n;
    return t;
  }
  function N(n) {
    for (var t = new _(), e = 0, r = arguments.length; ++e < r; )
      t[arguments[e]] = w(t);
    return (
      (t.of = function (e, r) {
        return function (i) {
          try {
            var u = (i.sourceEvent = ao.event);
            (i.target = n), (ao.event = i), t[i.type].apply(e, r);
          } finally {
            ao.event = u;
          }
        };
      }),
      t
    );
  }
  function E(n) {
    return ko(n, Co), n;
  }
  function A(n) {
    return "function" == typeof n
      ? n
      : function () {
          return No(n, this);
        };
  }
  function C(n) {
    return "function" == typeof n
      ? n
      : function () {
          return Eo(n, this);
        };
  }
  function z(n, t) {
    function e() {
      this.removeAttribute(n);
    }
    function r() {
      this.removeAttributeNS(n.space, n.local);
    }
    function i() {
      this.setAttribute(n, t);
    }
    function u() {
      this.setAttributeNS(n.space, n.local, t);
    }
    function o() {
      var e = t.apply(this, arguments);
      null == e ? this.removeAttribute(n) : this.setAttribute(n, e);
    }
    function a() {
      var e = t.apply(this, arguments);
      null == e
        ? this.removeAttributeNS(n.space, n.local)
        : this.setAttributeNS(n.space, n.local, e);
    }
    return (
      (n = ao.ns.qualify(n)),
      null == t
        ? n.local
          ? r
          : e
        : "function" == typeof t
        ? n.local
          ? a
          : o
        : n.local
        ? u
        : i
    );
  }
  function L(n) {
    return n.trim().replace(/\s+/g, " ");
  }
  function q(n) {
    return new RegExp("(?:^|\\s+)" + ao.requote(n) + "(?:\\s+|$)", "g");
  }
  function T(n) {
    return (n + "").trim().split(/^|\s+/);
  }
  function R(n, t) {
    function e() {
      for (var e = -1; ++e < i; ) n[e](this, t);
    }
    function r() {
      for (var e = -1, r = t.apply(this, arguments); ++e < i; ) n[e](this, r);
    }
    n = T(n).map(D);
    var i = n.length;
    return "function" == typeof t ? r : e;
  }
  function D(n) {
    var t = q(n);
    return function (e, r) {
      if ((i = e.classList)) return r ? i.add(n) : i.remove(n);
      var i = e.getAttribute("class") || "";
      r
        ? ((t.lastIndex = 0),
          t.test(i) || e.setAttribute("class", L(i + " " + n)))
        : e.setAttribute("class", L(i.replace(t, " ")));
    };
  }
  function P(n, t, e) {
    function r() {
      this.style.removeProperty(n);
    }
    function i() {
      this.style.setProperty(n, t, e);
    }
    function u() {
      var r = t.apply(this, arguments);
      null == r
        ? this.style.removeProperty(n)
        : this.style.setProperty(n, r, e);
    }
    return null == t ? r : "function" == typeof t ? u : i;
  }
  function U(n, t) {
    function e() {
      delete this[n];
    }
    function r() {
      this[n] = t;
    }
    function i() {
      var e = t.apply(this, arguments);
      null == e ? delete this[n] : (this[n] = e);
    }
    return null == t ? e : "function" == typeof t ? i : r;
  }
  function j(n) {
    function t() {
      var t = this.ownerDocument,
        e = this.namespaceURI;
      return e === zo && t.documentElement.namespaceURI === zo
        ? t.createElement(n)
        : t.createElementNS(e, n);
    }
    function e() {
      return this.ownerDocument.createElementNS(n.space, n.local);
    }
    return "function" == typeof n ? n : (n = ao.ns.qualify(n)).local ? e : t;
  }
  function F() {
    var n = this.parentNode;
    n && n.removeChild(this);
  }
  function H(n) {
    return { __data__: n };
  }
  function O(n) {
    return function () {
      return Ao(this, n);
    };
  }
  function I(n) {
    return (
      arguments.length || (n = e),
      function (t, e) {
        return t && e ? n(t.__data__, e.__data__) : !t - !e;
      }
    );
  }
  function Y(n, t) {
    for (var e = 0, r = n.length; r > e; e++)
      for (var i, u = n[e], o = 0, a = u.length; a > o; o++)
        (i = u[o]) && t(i, o, e);
    return n;
  }
  function Z(n) {
    return ko(n, qo), n;
  }
  function V(n) {
    var t, e;
    return function (r, i, u) {
      var o,
        a = n[u].update,
        l = a.length;
      for (
        u != e && ((e = u), (t = 0)), i >= t && (t = i + 1);
        !(o = a[t]) && ++t < l;

      );
      return o;
    };
  }
  function X(n, t, e) {
    function r() {
      var t = this[o];
      t && (this.removeEventListener(n, t, t.$), delete this[o]);
    }
    function i() {
      var i = l(t, co(arguments));
      r.call(this),
        this.addEventListener(n, (this[o] = i), (i.$ = e)),
        (i._ = t);
    }
    function u() {
      var t,
        e = new RegExp("^__on([^.]+)" + ao.requote(n) + "$");
      for (var r in this)
        if ((t = r.match(e))) {
          var i = this[r];
          this.removeEventListener(t[1], i, i.$), delete this[r];
        }
    }
    var o = "__on" + n,
      a = n.indexOf("."),
      l = $;
    a > 0 && (n = n.slice(0, a));
    var c = To.get(n);
    return c && ((n = c), (l = B)), a ? (t ? i : r) : t ? b : u;
  }
  function $(n, t) {
    return function (e) {
      var r = ao.event;
      (ao.event = e), (t[0] = this.__data__);
      try {
        n.apply(this, t);
      } finally {
        ao.event = r;
      }
    };
  }
  function B(n, t) {
    var e = $(n, t);
    return function (n) {
      var t = this,
        r = n.relatedTarget;
      (r && (r === t || 8 & r.compareDocumentPosition(t))) || e.call(t, n);
    };
  }
  function W(e) {
    var r = ".dragsuppress-" + ++Do,
      i = "click" + r,
      u = ao
        .select(t(e))
        .on("touchmove" + r, S)
        .on("dragstart" + r, S)
        .on("selectstart" + r, S);
    if (
      (null == Ro &&
        (Ro = "onselectstart" in e ? !1 : x(e.style, "userSelect")),
      Ro)
    ) {
      var o = n(e).style,
        a = o[Ro];
      o[Ro] = "none";
    }
    return function (n) {
      if ((u.on(r, null), Ro && (o[Ro] = a), n)) {
        var t = function () {
          u.on(i, null);
        };
        u.on(
          i,
          function () {
            S(), t();
          },
          !0
        ),
          setTimeout(t, 0);
      }
    };
  }
  function J(n, e) {
    e.changedTouches && (e = e.changedTouches[0]);
    var r = n.ownerSVGElement || n;
    if (r.createSVGPoint) {
      var i = r.createSVGPoint();
      if (0 > Po) {
        var u = t(n);
        if (u.scrollX || u.scrollY) {
          r = ao
            .select("body")
            .append("svg")
            .style(
              {
                position: "absolute",
                top: 0,
                left: 0,
                margin: 0,
                padding: 0,
                border: "none",
              },
              "important"
            );
          var o = r[0][0].getScreenCTM();
          (Po = !(o.f || o.e)), r.remove();
        }
      }
      return (
        Po
          ? ((i.x = e.pageX), (i.y = e.pageY))
          : ((i.x = e.clientX), (i.y = e.clientY)),
        (i = i.matrixTransform(n.getScreenCTM().inverse())),
        [i.x, i.y]
      );
    }
    var a = n.getBoundingClientRect();
    return [e.clientX - a.left - n.clientLeft, e.clientY - a.top - n.clientTop];
  }
  function G() {
    return ao.event.changedTouches[0].identifier;
  }
  function K(n) {
    return n > 0 ? 1 : 0 > n ? -1 : 0;
  }
  function Q(n, t, e) {
    return (t[0] - n[0]) * (e[1] - n[1]) - (t[1] - n[1]) * (e[0] - n[0]);
  }
  function nn(n) {
    return n > 1 ? 0 : -1 > n ? Fo : Math.acos(n);
  }
  function tn(n) {
    return n > 1 ? Io : -1 > n ? -Io : Math.asin(n);
  }
  function en(n) {
    return ((n = Math.exp(n)) - 1 / n) / 2;
  }
  function rn(n) {
    return ((n = Math.exp(n)) + 1 / n) / 2;
  }
  function un(n) {
    return ((n = Math.exp(2 * n)) - 1) / (n + 1);
  }
  function on(n) {
    return (n = Math.sin(n / 2)) * n;
  }
  function an() {}
  function ln(n, t, e) {
    return this instanceof ln
      ? ((this.h = +n), (this.s = +t), void (this.l = +e))
      : arguments.length < 2
      ? n instanceof ln
        ? new ln(n.h, n.s, n.l)
        : _n("" + n, wn, ln)
      : new ln(n, t, e);
  }
  function cn(n, t, e) {
    function r(n) {
      return (
        n > 360 ? (n -= 360) : 0 > n && (n += 360),
        60 > n
          ? u + ((o - u) * n) / 60
          : 180 > n
          ? o
          : 240 > n
          ? u + ((o - u) * (240 - n)) / 60
          : u
      );
    }
    function i(n) {
      return Math.round(255 * r(n));
    }
    var u, o;
    return (
      (n = isNaN(n) ? 0 : (n %= 360) < 0 ? n + 360 : n),
      (t = isNaN(t) ? 0 : 0 > t ? 0 : t > 1 ? 1 : t),
      (e = 0 > e ? 0 : e > 1 ? 1 : e),
      (o = 0.5 >= e ? e * (1 + t) : e + t - e * t),
      (u = 2 * e - o),
      new mn(i(n + 120), i(n), i(n - 120))
    );
  }
  function fn(n, t, e) {
    return this instanceof fn
      ? ((this.h = +n), (this.c = +t), void (this.l = +e))
      : arguments.length < 2
      ? n instanceof fn
        ? new fn(n.h, n.c, n.l)
        : n instanceof hn
        ? gn(n.l, n.a, n.b)
        : gn((n = Sn((n = ao.rgb(n)).r, n.g, n.b)).l, n.a, n.b)
      : new fn(n, t, e);
  }
  function sn(n, t, e) {
    return (
      isNaN(n) && (n = 0),
      isNaN(t) && (t = 0),
      new hn(e, Math.cos((n *= Yo)) * t, Math.sin(n) * t)
    );
  }
  function hn(n, t, e) {
    return this instanceof hn
      ? ((this.l = +n), (this.a = +t), void (this.b = +e))
      : arguments.length < 2
      ? n instanceof hn
        ? new hn(n.l, n.a, n.b)
        : n instanceof fn
        ? sn(n.h, n.c, n.l)
        : Sn((n = mn(n)).r, n.g, n.b)
      : new hn(n, t, e);
  }
  function pn(n, t, e) {
    var r = (n + 16) / 116,
      i = r + t / 500,
      u = r - e / 200;
    return (
      (i = vn(i) * na),
      (r = vn(r) * ta),
      (u = vn(u) * ea),
      new mn(
        yn(3.2404542 * i - 1.5371385 * r - 0.4985314 * u),
        yn(-0.969266 * i + 1.8760108 * r + 0.041556 * u),
        yn(0.0556434 * i - 0.2040259 * r + 1.0572252 * u)
      )
    );
  }
  function gn(n, t, e) {
    return n > 0
      ? new fn(Math.atan2(e, t) * Zo, Math.sqrt(t * t + e * e), n)
      : new fn(NaN, NaN, n);
  }
  function vn(n) {
    return n > 0.206893034 ? n * n * n : (n - 4 / 29) / 7.787037;
  }
  function dn(n) {
    return n > 0.008856 ? Math.pow(n, 1 / 3) : 7.787037 * n + 4 / 29;
  }
  function yn(n) {
    return Math.round(
      255 * (0.00304 >= n ? 12.92 * n : 1.055 * Math.pow(n, 1 / 2.4) - 0.055)
    );
  }
  function mn(n, t, e) {
    return this instanceof mn
      ? ((this.r = ~~n), (this.g = ~~t), void (this.b = ~~e))
      : arguments.length < 2
      ? n instanceof mn
        ? new mn(n.r, n.g, n.b)
        : _n("" + n, mn, cn)
      : new mn(n, t, e);
  }
  function Mn(n) {
    return new mn(n >> 16, (n >> 8) & 255, 255 & n);
  }
  function xn(n) {
    return Mn(n) + "";
  }
  function bn(n) {
    return 16 > n
      ? "0" + Math.max(0, n).toString(16)
      : Math.min(255, n).toString(16);
  }
  function _n(n, t, e) {
    var r,
      i,
      u,
      o = 0,
      a = 0,
      l = 0;
    if ((r = /([a-z]+)\((.*)\)/.exec((n = n.toLowerCase()))))
      switch (((i = r[2].split(",")), r[1])) {
        case "hsl":
          return e(
            parseFloat(i[0]),
            parseFloat(i[1]) / 100,
            parseFloat(i[2]) / 100
          );
        case "rgb":
          return t(Nn(i[0]), Nn(i[1]), Nn(i[2]));
      }
    return (u = ua.get(n))
      ? t(u.r, u.g, u.b)
      : (null == n ||
          "#" !== n.charAt(0) ||
          isNaN((u = parseInt(n.slice(1), 16))) ||
          (4 === n.length
            ? ((o = (3840 & u) >> 4),
              (o = (o >> 4) | o),
              (a = 240 & u),
              (a = (a >> 4) | a),
              (l = 15 & u),
              (l = (l << 4) | l))
            : 7 === n.length &&
              ((o = (16711680 & u) >> 16),
              (a = (65280 & u) >> 8),
              (l = 255 & u))),
        t(o, a, l));
  }
  function wn(n, t, e) {
    var r,
      i,
      u = Math.min((n /= 255), (t /= 255), (e /= 255)),
      o = Math.max(n, t, e),
      a = o - u,
      l = (o + u) / 2;
    return (
      a
        ? ((i = 0.5 > l ? a / (o + u) : a / (2 - o - u)),
          (r =
            n == o
              ? (t - e) / a + (e > t ? 6 : 0)
              : t == o
              ? (e - n) / a + 2
              : (n - t) / a + 4),
          (r *= 60))
        : ((r = NaN), (i = l > 0 && 1 > l ? 0 : r)),
      new ln(r, i, l)
    );
  }
  function Sn(n, t, e) {
    (n = kn(n)), (t = kn(t)), (e = kn(e));
    var r = dn((0.4124564 * n + 0.3575761 * t + 0.1804375 * e) / na),
      i = dn((0.2126729 * n + 0.7151522 * t + 0.072175 * e) / ta),
      u = dn((0.0193339 * n + 0.119192 * t + 0.9503041 * e) / ea);
    return hn(116 * i - 16, 500 * (r - i), 200 * (i - u));
  }
  function kn(n) {
    return (n /= 255) <= 0.04045
      ? n / 12.92
      : Math.pow((n + 0.055) / 1.055, 2.4);
  }
  function Nn(n) {
    var t = parseFloat(n);
    return "%" === n.charAt(n.length - 1) ? Math.round(2.55 * t) : t;
  }
  function En(n) {
    return "function" == typeof n
      ? n
      : function () {
          return n;
        };
  }
  function An(n) {
    return function (t, e, r) {
      return (
        2 === arguments.length &&
          "function" == typeof e &&
          ((r = e), (e = null)),
        Cn(t, e, n, r)
      );
    };
  }
  function Cn(n, t, e, r) {
    function i() {
      var n,
        t = l.status;
      if ((!t && Ln(l)) || (t >= 200 && 300 > t) || 304 === t) {
        try {
          n = e.call(u, l);
        } catch (r) {
          return void o.error.call(u, r);
        }
        o.load.call(u, n);
      } else o.error.call(u, l);
    }
    var u = {},
      o = ao.dispatch("beforesend", "progress", "load", "error"),
      a = {},
      l = new XMLHttpRequest(),
      c = null;
    return (
      !this.XDomainRequest ||
        "withCredentials" in l ||
        !/^(http(s)?:)?\/\//.test(n) ||
        (l = new XDomainRequest()),
      "onload" in l
        ? (l.onload = l.onerror = i)
        : (l.onreadystatechange = function () {
            l.readyState > 3 && i();
          }),
      (l.onprogress = function (n) {
        var t = ao.event;
        ao.event = n;
        try {
          o.progress.call(u, l);
        } finally {
          ao.event = t;
        }
      }),
      (u.header = function (n, t) {
        return (
          (n = (n + "").toLowerCase()),
          arguments.length < 2
            ? a[n]
            : (null == t ? delete a[n] : (a[n] = t + ""), u)
        );
      }),
      (u.mimeType = function (n) {
        return arguments.length ? ((t = null == n ? null : n + ""), u) : t;
      }),
      (u.responseType = function (n) {
        return arguments.length ? ((c = n), u) : c;
      }),
      (u.response = function (n) {
        return (e = n), u;
      }),
      ["get", "post"].forEach(function (n) {
        u[n] = function () {
          return u.send.apply(u, [n].concat(co(arguments)));
        };
      }),
      (u.send = function (e, r, i) {
        if (
          (2 === arguments.length &&
            "function" == typeof r &&
            ((i = r), (r = null)),
          l.open(e, n, !0),
          null == t || "accept" in a || (a.accept = t + ",*/*"),
          l.setRequestHeader)
        )
          for (var f in a) l.setRequestHeader(f, a[f]);
        return (
          null != t && l.overrideMimeType && l.overrideMimeType(t),
          null != c && (l.responseType = c),
          null != i &&
            u.on("error", i).on("load", function (n) {
              i(null, n);
            }),
          o.beforesend.call(u, l),
          l.send(null == r ? null : r),
          u
        );
      }),
      (u.abort = function () {
        return l.abort(), u;
      }),
      ao.rebind(u, o, "on"),
      null == r ? u : u.get(zn(r))
    );
  }
  function zn(n) {
    return 1 === n.length
      ? function (t, e) {
          n(null == t ? e : null);
        }
      : n;
  }
  function Ln(n) {
    var t = n.responseType;
    return t && "text" !== t ? n.response : n.responseText;
  }
  function qn(n, t, e) {
    var r = arguments.length;
    2 > r && (t = 0), 3 > r && (e = Date.now());
    var i = e + t,
      u = { c: n, t: i, n: null };
    return (
      aa ? (aa.n = u) : (oa = u),
      (aa = u),
      la || ((ca = clearTimeout(ca)), (la = 1), fa(Tn)),
      u
    );
  }
  function Tn() {
    var n = Rn(),
      t = Dn() - n;
    t > 24
      ? (isFinite(t) && (clearTimeout(ca), (ca = setTimeout(Tn, t))), (la = 0))
      : ((la = 1), fa(Tn));
  }
  function Rn() {
    for (var n = Date.now(), t = oa; t; )
      n >= t.t && t.c(n - t.t) && (t.c = null), (t = t.n);
    return n;
  }
  function Dn() {
    for (var n, t = oa, e = 1 / 0; t; )
      t.c
        ? (t.t < e && (e = t.t), (t = (n = t).n))
        : (t = n ? (n.n = t.n) : (oa = t.n));
    return (aa = n), e;
  }
  function Pn(n, t) {
    return t - (n ? Math.ceil(Math.log(n) / Math.LN10) : 1);
  }
  function Un(n, t) {
    var e = Math.pow(10, 3 * xo(8 - t));
    return {
      scale:
        t > 8
          ? function (n) {
              return n / e;
            }
          : function (n) {
              return n * e;
            },
      symbol: n,
    };
  }
  function jn(n) {
    var t = n.decimal,
      e = n.thousands,
      r = n.grouping,
      i = n.currency,
      u =
        r && e
          ? function (n, t) {
              for (
                var i = n.length, u = [], o = 0, a = r[0], l = 0;
                i > 0 &&
                a > 0 &&
                (l + a + 1 > t && (a = Math.max(1, t - l)),
                u.push(n.substring((i -= a), i + a)),
                !((l += a + 1) > t));

              )
                a = r[(o = (o + 1) % r.length)];
              return u.reverse().join(e);
            }
          : m;
    return function (n) {
      var e = ha.exec(n),
        r = e[1] || " ",
        o = e[2] || ">",
        a = e[3] || "-",
        l = e[4] || "",
        c = e[5],
        f = +e[6],
        s = e[7],
        h = e[8],
        p = e[9],
        g = 1,
        v = "",
        d = "",
        y = !1,
        m = !0;
      switch (
        (h && (h = +h.substring(1)),
        (c || ("0" === r && "=" === o)) && ((c = r = "0"), (o = "=")),
        p)
      ) {
        case "n":
          (s = !0), (p = "g");
          break;
        case "%":
          (g = 100), (d = "%"), (p = "f");
          break;
        case "p":
          (g = 100), (d = "%"), (p = "r");
          break;
        case "b":
        case "o":
        case "x":
        case "X":
          "#" === l && (v = "0" + p.toLowerCase());
        case "c":
          m = !1;
        case "d":
          (y = !0), (h = 0);
          break;
        case "s":
          (g = -1), (p = "r");
      }
      "$" === l && ((v = i[0]), (d = i[1])),
        "r" != p || h || (p = "g"),
        null != h &&
          ("g" == p
            ? (h = Math.max(1, Math.min(21, h)))
            : ("e" != p && "f" != p) || (h = Math.max(0, Math.min(20, h)))),
        (p = pa.get(p) || Fn);
      var M = c && s;
      return function (n) {
        var e = d;
        if (y && n % 1) return "";
        var i =
          0 > n || (0 === n && 0 > 1 / n)
            ? ((n = -n), "-")
            : "-" === a
            ? ""
            : a;
        if (0 > g) {
          var l = ao.formatPrefix(n, h);
          (n = l.scale(n)), (e = l.symbol + d);
        } else n *= g;
        n = p(n, h);
        var x,
          b,
          _ = n.lastIndexOf(".");
        if (0 > _) {
          var w = m ? n.lastIndexOf("e") : -1;
          0 > w
            ? ((x = n), (b = ""))
            : ((x = n.substring(0, w)), (b = n.substring(w)));
        } else (x = n.substring(0, _)), (b = t + n.substring(_ + 1));
        !c && s && (x = u(x, 1 / 0));
        var S = v.length + x.length + b.length + (M ? 0 : i.length),
          k = f > S ? new Array((S = f - S + 1)).join(r) : "";
        return (
          M && (x = u(k + x, k.length ? f - b.length : 1 / 0)),
          (i += v),
          (n = x + b),
          ("<" === o
            ? i + n + k
            : ">" === o
            ? k + i + n
            : "^" === o
            ? k.substring(0, (S >>= 1)) + i + n + k.substring(S)
            : i + (M ? n : k + n)) + e
        );
      };
    };
  }
  function Fn(n) {
    return n + "";
  }
  function Hn() {
    this._ = new Date(
      arguments.length > 1 ? Date.UTC.apply(this, arguments) : arguments[0]
    );
  }
  function On(n, t, e) {
    function r(t) {
      var e = n(t),
        r = u(e, 1);
      return r - t > t - e ? e : r;
    }
    function i(e) {
      return t((e = n(new va(e - 1))), 1), e;
    }
    function u(n, e) {
      return t((n = new va(+n)), e), n;
    }
    function o(n, r, u) {
      var o = i(n),
        a = [];
      if (u > 1) for (; r > o; ) e(o) % u || a.push(new Date(+o)), t(o, 1);
      else for (; r > o; ) a.push(new Date(+o)), t(o, 1);
      return a;
    }
    function a(n, t, e) {
      try {
        va = Hn;
        var r = new Hn();
        return (r._ = n), o(r, t, e);
      } finally {
        va = Date;
      }
    }
    (n.floor = n), (n.round = r), (n.ceil = i), (n.offset = u), (n.range = o);
    var l = (n.utc = In(n));
    return (
      (l.floor = l),
      (l.round = In(r)),
      (l.ceil = In(i)),
      (l.offset = In(u)),
      (l.range = a),
      n
    );
  }
  function In(n) {
    return function (t, e) {
      try {
        va = Hn;
        var r = new Hn();
        return (r._ = t), n(r, e)._;
      } finally {
        va = Date;
      }
    };
  }
  function Yn(n) {
    function t(n) {
      function t(t) {
        for (var e, i, u, o = [], a = -1, l = 0; ++a < r; )
          37 === n.charCodeAt(a) &&
            (o.push(n.slice(l, a)),
            null != (i = ya[(e = n.charAt(++a))]) && (e = n.charAt(++a)),
            (u = A[e]) && (e = u(t, null == i ? ("e" === e ? " " : "0") : i)),
            o.push(e),
            (l = a + 1));
        return o.push(n.slice(l, a)), o.join("");
      }
      var r = n.length;
      return (
        (t.parse = function (t) {
          var r = { y: 1900, m: 0, d: 1, H: 0, M: 0, S: 0, L: 0, Z: null },
            i = e(r, n, t, 0);
          if (i != t.length) return null;
          "p" in r && (r.H = (r.H % 12) + 12 * r.p);
          var u = null != r.Z && va !== Hn,
            o = new (u ? Hn : va)();
          return (
            "j" in r
              ? o.setFullYear(r.y, 0, r.j)
              : "W" in r || "U" in r
              ? ("w" in r || (r.w = "W" in r ? 1 : 0),
                o.setFullYear(r.y, 0, 1),
                o.setFullYear(
                  r.y,
                  0,
                  "W" in r
                    ? ((r.w + 6) % 7) + 7 * r.W - ((o.getDay() + 5) % 7)
                    : r.w + 7 * r.U - ((o.getDay() + 6) % 7)
                ))
              : o.setFullYear(r.y, r.m, r.d),
            o.setHours(r.H + ((r.Z / 100) | 0), r.M + (r.Z % 100), r.S, r.L),
            u ? o._ : o
          );
        }),
        (t.toString = function () {
          return n;
        }),
        t
      );
    }
    function e(n, t, e, r) {
      for (var i, u, o, a = 0, l = t.length, c = e.length; l > a; ) {
        if (r >= c) return -1;
        if (((i = t.charCodeAt(a++)), 37 === i)) {
          if (
            ((o = t.charAt(a++)),
            (u = C[o in ya ? t.charAt(a++) : o]),
            !u || (r = u(n, e, r)) < 0)
          )
            return -1;
        } else if (i != e.charCodeAt(r++)) return -1;
      }
      return r;
    }
    function r(n, t, e) {
      _.lastIndex = 0;
      var r = _.exec(t.slice(e));
      return r ? ((n.w = w.get(r[0].toLowerCase())), e + r[0].length) : -1;
    }
    function i(n, t, e) {
      x.lastIndex = 0;
      var r = x.exec(t.slice(e));
      return r ? ((n.w = b.get(r[0].toLowerCase())), e + r[0].length) : -1;
    }
    function u(n, t, e) {
      N.lastIndex = 0;
      var r = N.exec(t.slice(e));
      return r ? ((n.m = E.get(r[0].toLowerCase())), e + r[0].length) : -1;
    }
    function o(n, t, e) {
      S.lastIndex = 0;
      var r = S.exec(t.slice(e));
      return r ? ((n.m = k.get(r[0].toLowerCase())), e + r[0].length) : -1;
    }
    function a(n, t, r) {
      return e(n, A.c.toString(), t, r);
    }
    function l(n, t, r) {
      return e(n, A.x.toString(), t, r);
    }
    function c(n, t, r) {
      return e(n, A.X.toString(), t, r);
    }
    function f(n, t, e) {
      var r = M.get(t.slice(e, (e += 2)).toLowerCase());
      return null == r ? -1 : ((n.p = r), e);
    }
    var s = n.dateTime,
      h = n.date,
      p = n.time,
      g = n.periods,
      v = n.days,
      d = n.shortDays,
      y = n.months,
      m = n.shortMonths;
    (t.utc = function (n) {
      function e(n) {
        try {
          va = Hn;
          var t = new va();
          return (t._ = n), r(t);
        } finally {
          va = Date;
        }
      }
      var r = t(n);
      return (
        (e.parse = function (n) {
          try {
            va = Hn;
            var t = r.parse(n);
            return t && t._;
          } finally {
            va = Date;
          }
        }),
        (e.toString = r.toString),
        e
      );
    }),
      (t.multi = t.utc.multi = ct);
    var M = ao.map(),
      x = Vn(v),
      b = Xn(v),
      _ = Vn(d),
      w = Xn(d),
      S = Vn(y),
      k = Xn(y),
      N = Vn(m),
      E = Xn(m);
    g.forEach(function (n, t) {
      M.set(n.toLowerCase(), t);
    });
    var A = {
        a: function (n) {
          return d[n.getDay()];
        },
        A: function (n) {
          return v[n.getDay()];
        },
        b: function (n) {
          return m[n.getMonth()];
        },
        B: function (n) {
          return y[n.getMonth()];
        },
        c: t(s),
        d: function (n, t) {
          return Zn(n.getDate(), t, 2);
        },
        e: function (n, t) {
          return Zn(n.getDate(), t, 2);
        },
        H: function (n, t) {
          return Zn(n.getHours(), t, 2);
        },
        I: function (n, t) {
          return Zn(n.getHours() % 12 || 12, t, 2);
        },
        j: function (n, t) {
          return Zn(1 + ga.dayOfYear(n), t, 3);
        },
        L: function (n, t) {
          return Zn(n.getMilliseconds(), t, 3);
        },
        m: function (n, t) {
          return Zn(n.getMonth() + 1, t, 2);
        },
        M: function (n, t) {
          return Zn(n.getMinutes(), t, 2);
        },
        p: function (n) {
          return g[+(n.getHours() >= 12)];
        },
        S: function (n, t) {
          return Zn(n.getSeconds(), t, 2);
        },
        U: function (n, t) {
          return Zn(ga.sundayOfYear(n), t, 2);
        },
        w: function (n) {
          return n.getDay();
        },
        W: function (n, t) {
          return Zn(ga.mondayOfYear(n), t, 2);
        },
        x: t(h),
        X: t(p),
        y: function (n, t) {
          return Zn(n.getFullYear() % 100, t, 2);
        },
        Y: function (n, t) {
          return Zn(n.getFullYear() % 1e4, t, 4);
        },
        Z: at,
        "%": function () {
          return "%";
        },
      },
      C = {
        a: r,
        A: i,
        b: u,
        B: o,
        c: a,
        d: tt,
        e: tt,
        H: rt,
        I: rt,
        j: et,
        L: ot,
        m: nt,
        M: it,
        p: f,
        S: ut,
        U: Bn,
        w: $n,
        W: Wn,
        x: l,
        X: c,
        y: Gn,
        Y: Jn,
        Z: Kn,
        "%": lt,
      };
    return t;
  }
  function Zn(n, t, e) {
    var r = 0 > n ? "-" : "",
      i = (r ? -n : n) + "",
      u = i.length;
    return r + (e > u ? new Array(e - u + 1).join(t) + i : i);
  }
  function Vn(n) {
    return new RegExp("^(?:" + n.map(ao.requote).join("|") + ")", "i");
  }
  function Xn(n) {
    for (var t = new c(), e = -1, r = n.length; ++e < r; )
      t.set(n[e].toLowerCase(), e);
    return t;
  }
  function $n(n, t, e) {
    ma.lastIndex = 0;
    var r = ma.exec(t.slice(e, e + 1));
    return r ? ((n.w = +r[0]), e + r[0].length) : -1;
  }
  function Bn(n, t, e) {
    ma.lastIndex = 0;
    var r = ma.exec(t.slice(e));
    return r ? ((n.U = +r[0]), e + r[0].length) : -1;
  }
  function Wn(n, t, e) {
    ma.lastIndex = 0;
    var r = ma.exec(t.slice(e));
    return r ? ((n.W = +r[0]), e + r[0].length) : -1;
  }
  function Jn(n, t, e) {
    ma.lastIndex = 0;
    var r = ma.exec(t.slice(e, e + 4));
    return r ? ((n.y = +r[0]), e + r[0].length) : -1;
  }
  function Gn(n, t, e) {
    ma.lastIndex = 0;
    var r = ma.exec(t.slice(e, e + 2));
    return r ? ((n.y = Qn(+r[0])), e + r[0].length) : -1;
  }
  function Kn(n, t, e) {
    return /^[+-]\d{4}$/.test((t = t.slice(e, e + 5)))
      ? ((n.Z = -t), e + 5)
      : -1;
  }
  function Qn(n) {
    return n + (n > 68 ? 1900 : 2e3);
  }
  function nt(n, t, e) {
    ma.lastIndex = 0;
    var r = ma.exec(t.slice(e, e + 2));
    return r ? ((n.m = r[0] - 1), e + r[0].length) : -1;
  }
  function tt(n, t, e) {
    ma.lastIndex = 0;
    var r = ma.exec(t.slice(e, e + 2));
    return r ? ((n.d = +r[0]), e + r[0].length) : -1;
  }
  function et(n, t, e) {
    ma.lastIndex = 0;
    var r = ma.exec(t.slice(e, e + 3));
    return r ? ((n.j = +r[0]), e + r[0].length) : -1;
  }
  function rt(n, t, e) {
    ma.lastIndex = 0;
    var r = ma.exec(t.slice(e, e + 2));
    return r ? ((n.H = +r[0]), e + r[0].length) : -1;
  }
  function it(n, t, e) {
    ma.lastIndex = 0;
    var r = ma.exec(t.slice(e, e + 2));
    return r ? ((n.M = +r[0]), e + r[0].length) : -1;
  }
  function ut(n, t, e) {
    ma.lastIndex = 0;
    var r = ma.exec(t.slice(e, e + 2));
    return r ? ((n.S = +r[0]), e + r[0].length) : -1;
  }
  function ot(n, t, e) {
    ma.lastIndex = 0;
    var r = ma.exec(t.slice(e, e + 3));
    return r ? ((n.L = +r[0]), e + r[0].length) : -1;
  }
  function at(n) {
    var t = n.getTimezoneOffset(),
      e = t > 0 ? "-" : "+",
      r = (xo(t) / 60) | 0,
      i = xo(t) % 60;
    return e + Zn(r, "0", 2) + Zn(i, "0", 2);
  }
  function lt(n, t, e) {
    Ma.lastIndex = 0;
    var r = Ma.exec(t.slice(e, e + 1));
    return r ? e + r[0].length : -1;
  }
  function ct(n) {
    for (var t = n.length, e = -1; ++e < t; ) n[e][0] = this(n[e][0]);
    return function (t) {
      for (var e = 0, r = n[e]; !r[1](t); ) r = n[++e];
      return r[0](t);
    };
  }
  function ft() {}
  function st(n, t, e) {
    var r = (e.s = n + t),
      i = r - n,
      u = r - i;
    e.t = n - u + (t - i);
  }
  function ht(n, t) {
    n && wa.hasOwnProperty(n.type) && wa[n.type](n, t);
  }
  function pt(n, t, e) {
    var r,
      i = -1,
      u = n.length - e;
    for (t.lineStart(); ++i < u; ) (r = n[i]), t.point(r[0], r[1], r[2]);
    t.lineEnd();
  }
  function gt(n, t) {
    var e = -1,
      r = n.length;
    for (t.polygonStart(); ++e < r; ) pt(n[e], t, 1);
    t.polygonEnd();
  }
  function vt() {
    function n(n, t) {
      (n *= Yo), (t = (t * Yo) / 2 + Fo / 4);
      var e = n - r,
        o = e >= 0 ? 1 : -1,
        a = o * e,
        l = Math.cos(t),
        c = Math.sin(t),
        f = u * c,
        s = i * l + f * Math.cos(a),
        h = f * o * Math.sin(a);
      ka.add(Math.atan2(h, s)), (r = n), (i = l), (u = c);
    }
    var t, e, r, i, u;
    (Na.point = function (o, a) {
      (Na.point = n),
        (r = (t = o) * Yo),
        (i = Math.cos((a = ((e = a) * Yo) / 2 + Fo / 4))),
        (u = Math.sin(a));
    }),
      (Na.lineEnd = function () {
        n(t, e);
      });
  }
  function dt(n) {
    var t = n[0],
      e = n[1],
      r = Math.cos(e);
    return [r * Math.cos(t), r * Math.sin(t), Math.sin(e)];
  }
  function yt(n, t) {
    return n[0] * t[0] + n[1] * t[1] + n[2] * t[2];
  }
  function mt(n, t) {
    return [
      n[1] * t[2] - n[2] * t[1],
      n[2] * t[0] - n[0] * t[2],
      n[0] * t[1] - n[1] * t[0],
    ];
  }
  function Mt(n, t) {
    (n[0] += t[0]), (n[1] += t[1]), (n[2] += t[2]);
  }
  function xt(n, t) {
    return [n[0] * t, n[1] * t, n[2] * t];
  }
  function bt(n) {
    var t = Math.sqrt(n[0] * n[0] + n[1] * n[1] + n[2] * n[2]);
    (n[0] /= t), (n[1] /= t), (n[2] /= t);
  }
  function _t(n) {
    return [Math.atan2(n[1], n[0]), tn(n[2])];
  }
  function wt(n, t) {
    return xo(n[0] - t[0]) < Uo && xo(n[1] - t[1]) < Uo;
  }
  function St(n, t) {
    n *= Yo;
    var e = Math.cos((t *= Yo));
    kt(e * Math.cos(n), e * Math.sin(n), Math.sin(t));
  }
  function kt(n, t, e) {
    ++Ea, (Ca += (n - Ca) / Ea), (za += (t - za) / Ea), (La += (e - La) / Ea);
  }
  function Nt() {
    function n(n, i) {
      n *= Yo;
      var u = Math.cos((i *= Yo)),
        o = u * Math.cos(n),
        a = u * Math.sin(n),
        l = Math.sin(i),
        c = Math.atan2(
          Math.sqrt(
            (c = e * l - r * a) * c +
              (c = r * o - t * l) * c +
              (c = t * a - e * o) * c
          ),
          t * o + e * a + r * l
        );
      (Aa += c),
        (qa += c * (t + (t = o))),
        (Ta += c * (e + (e = a))),
        (Ra += c * (r + (r = l))),
        kt(t, e, r);
    }
    var t, e, r;
    ja.point = function (i, u) {
      i *= Yo;
      var o = Math.cos((u *= Yo));
      (t = o * Math.cos(i)),
        (e = o * Math.sin(i)),
        (r = Math.sin(u)),
        (ja.point = n),
        kt(t, e, r);
    };
  }
  function Et() {
    ja.point = St;
  }
  function At() {
    function n(n, t) {
      n *= Yo;
      var e = Math.cos((t *= Yo)),
        o = e * Math.cos(n),
        a = e * Math.sin(n),
        l = Math.sin(t),
        c = i * l - u * a,
        f = u * o - r * l,
        s = r * a - i * o,
        h = Math.sqrt(c * c + f * f + s * s),
        p = r * o + i * a + u * l,
        g = h && -nn(p) / h,
        v = Math.atan2(h, p);
      (Da += g * c),
        (Pa += g * f),
        (Ua += g * s),
        (Aa += v),
        (qa += v * (r + (r = o))),
        (Ta += v * (i + (i = a))),
        (Ra += v * (u + (u = l))),
        kt(r, i, u);
    }
    var t, e, r, i, u;
    (ja.point = function (o, a) {
      (t = o), (e = a), (ja.point = n), (o *= Yo);
      var l = Math.cos((a *= Yo));
      (r = l * Math.cos(o)),
        (i = l * Math.sin(o)),
        (u = Math.sin(a)),
        kt(r, i, u);
    }),
      (ja.lineEnd = function () {
        n(t, e), (ja.lineEnd = Et), (ja.point = St);
      });
  }
  function Ct(n, t) {
    function e(e, r) {
      return (e = n(e, r)), t(e[0], e[1]);
    }
    return (
      n.invert &&
        t.invert &&
        (e.invert = function (e, r) {
          return (e = t.invert(e, r)), e && n.invert(e[0], e[1]);
        }),
      e
    );
  }
  function zt() {
    return !0;
  }
  function Lt(n, t, e, r, i) {
    var u = [],
      o = [];
    if (
      (n.forEach(function (n) {
        if (!((t = n.length - 1) <= 0)) {
          var t,
            e = n[0],
            r = n[t];
          if (wt(e, r)) {
            i.lineStart();
            for (var a = 0; t > a; ++a) i.point((e = n[a])[0], e[1]);
            return void i.lineEnd();
          }
          var l = new Tt(e, n, null, !0),
            c = new Tt(e, null, l, !1);
          (l.o = c),
            u.push(l),
            o.push(c),
            (l = new Tt(r, n, null, !1)),
            (c = new Tt(r, null, l, !0)),
            (l.o = c),
            u.push(l),
            o.push(c);
        }
      }),
      o.sort(t),
      qt(u),
      qt(o),
      u.length)
    ) {
      for (var a = 0, l = e, c = o.length; c > a; ++a) o[a].e = l = !l;
      for (var f, s, h = u[0]; ; ) {
        for (var p = h, g = !0; p.v; ) if ((p = p.n) === h) return;
        (f = p.z), i.lineStart();
        do {
          if (((p.v = p.o.v = !0), p.e)) {
            if (g)
              for (var a = 0, c = f.length; c > a; ++a)
                i.point((s = f[a])[0], s[1]);
            else r(p.x, p.n.x, 1, i);
            p = p.n;
          } else {
            if (g) {
              f = p.p.z;
              for (var a = f.length - 1; a >= 0; --a)
                i.point((s = f[a])[0], s[1]);
            } else r(p.x, p.p.x, -1, i);
            p = p.p;
          }
          (p = p.o), (f = p.z), (g = !g);
        } while (!p.v);
        i.lineEnd();
      }
    }
  }
  function qt(n) {
    if ((t = n.length)) {
      for (var t, e, r = 0, i = n[0]; ++r < t; )
        (i.n = e = n[r]), (e.p = i), (i = e);
      (i.n = e = n[0]), (e.p = i);
    }
  }
  function Tt(n, t, e, r) {
    (this.x = n),
      (this.z = t),
      (this.o = e),
      (this.e = r),
      (this.v = !1),
      (this.n = this.p = null);
  }
  function Rt(n, t, e, r) {
    return function (i, u) {
      function o(t, e) {
        var r = i(t, e);
        n((t = r[0]), (e = r[1])) && u.point(t, e);
      }
      function a(n, t) {
        var e = i(n, t);
        d.point(e[0], e[1]);
      }
      function l() {
        (m.point = a), d.lineStart();
      }
      function c() {
        (m.point = o), d.lineEnd();
      }
      function f(n, t) {
        v.push([n, t]);
        var e = i(n, t);
        x.point(e[0], e[1]);
      }
      function s() {
        x.lineStart(), (v = []);
      }
      function h() {
        f(v[0][0], v[0][1]), x.lineEnd();
        var n,
          t = x.clean(),
          e = M.buffer(),
          r = e.length;
        if ((v.pop(), g.push(v), (v = null), r))
          if (1 & t) {
            n = e[0];
            var i,
              r = n.length - 1,
              o = -1;
            if (r > 0) {
              for (b || (u.polygonStart(), (b = !0)), u.lineStart(); ++o < r; )
                u.point((i = n[o])[0], i[1]);
              u.lineEnd();
            }
          } else
            r > 1 && 2 & t && e.push(e.pop().concat(e.shift())),
              p.push(e.filter(Dt));
      }
      var p,
        g,
        v,
        d = t(u),
        y = i.invert(r[0], r[1]),
        m = {
          point: o,
          lineStart: l,
          lineEnd: c,
          polygonStart: function () {
            (m.point = f),
              (m.lineStart = s),
              (m.lineEnd = h),
              (p = []),
              (g = []);
          },
          polygonEnd: function () {
            (m.point = o),
              (m.lineStart = l),
              (m.lineEnd = c),
              (p = ao.merge(p));
            var n = Ot(y, g);
            p.length
              ? (b || (u.polygonStart(), (b = !0)), Lt(p, Ut, n, e, u))
              : n &&
                (b || (u.polygonStart(), (b = !0)),
                u.lineStart(),
                e(null, null, 1, u),
                u.lineEnd()),
              b && (u.polygonEnd(), (b = !1)),
              (p = g = null);
          },
          sphere: function () {
            u.polygonStart(),
              u.lineStart(),
              e(null, null, 1, u),
              u.lineEnd(),
              u.polygonEnd();
          },
        },
        M = Pt(),
        x = t(M),
        b = !1;
      return m;
    };
  }
  function Dt(n) {
    return n.length > 1;
  }
  function Pt() {
    var n,
      t = [];
    return {
      lineStart: function () {
        t.push((n = []));
      },
      point: function (t, e) {
        n.push([t, e]);
      },
      lineEnd: b,
      buffer: function () {
        var e = t;
        return (t = []), (n = null), e;
      },
      rejoin: function () {
        t.length > 1 && t.push(t.pop().concat(t.shift()));
      },
    };
  }
  function Ut(n, t) {
    return (
      ((n = n.x)[0] < 0 ? n[1] - Io - Uo : Io - n[1]) -
      ((t = t.x)[0] < 0 ? t[1] - Io - Uo : Io - t[1])
    );
  }
  function jt(n) {
    var t,
      e = NaN,
      r = NaN,
      i = NaN;
    return {
      lineStart: function () {
        n.lineStart(), (t = 1);
      },
      point: function (u, o) {
        var a = u > 0 ? Fo : -Fo,
          l = xo(u - e);
        xo(l - Fo) < Uo
          ? (n.point(e, (r = (r + o) / 2 > 0 ? Io : -Io)),
            n.point(i, r),
            n.lineEnd(),
            n.lineStart(),
            n.point(a, r),
            n.point(u, r),
            (t = 0))
          : i !== a &&
            l >= Fo &&
            (xo(e - i) < Uo && (e -= i * Uo),
            xo(u - a) < Uo && (u -= a * Uo),
            (r = Ft(e, r, u, o)),
            n.point(i, r),
            n.lineEnd(),
            n.lineStart(),
            n.point(a, r),
            (t = 0)),
          n.point((e = u), (r = o)),
          (i = a);
      },
      lineEnd: function () {
        n.lineEnd(), (e = r = NaN);
      },
      clean: function () {
        return 2 - t;
      },
    };
  }
  function Ft(n, t, e, r) {
    var i,
      u,
      o = Math.sin(n - e);
    return xo(o) > Uo
      ? Math.atan(
          (Math.sin(t) * (u = Math.cos(r)) * Math.sin(e) -
            Math.sin(r) * (i = Math.cos(t)) * Math.sin(n)) /
            (i * u * o)
        )
      : (t + r) / 2;
  }
  function Ht(n, t, e, r) {
    var i;
    if (null == n)
      (i = e * Io),
        r.point(-Fo, i),
        r.point(0, i),
        r.point(Fo, i),
        r.point(Fo, 0),
        r.point(Fo, -i),
        r.point(0, -i),
        r.point(-Fo, -i),
        r.point(-Fo, 0),
        r.point(-Fo, i);
    else if (xo(n[0] - t[0]) > Uo) {
      var u = n[0] < t[0] ? Fo : -Fo;
      (i = (e * u) / 2), r.point(-u, i), r.point(0, i), r.point(u, i);
    } else r.point(t[0], t[1]);
  }
  function Ot(n, t) {
    var e = n[0],
      r = n[1],
      i = [Math.sin(e), -Math.cos(e), 0],
      u = 0,
      o = 0;
    ka.reset();
    for (var a = 0, l = t.length; l > a; ++a) {
      var c = t[a],
        f = c.length;
      if (f)
        for (
          var s = c[0],
            h = s[0],
            p = s[1] / 2 + Fo / 4,
            g = Math.sin(p),
            v = Math.cos(p),
            d = 1;
          ;

        ) {
          d === f && (d = 0), (n = c[d]);
          var y = n[0],
            m = n[1] / 2 + Fo / 4,
            M = Math.sin(m),
            x = Math.cos(m),
            b = y - h,
            _ = b >= 0 ? 1 : -1,
            w = _ * b,
            S = w > Fo,
            k = g * M;
          if (
            (ka.add(Math.atan2(k * _ * Math.sin(w), v * x + k * Math.cos(w))),
            (u += S ? b + _ * Ho : b),
            S ^ (h >= e) ^ (y >= e))
          ) {
            var N = mt(dt(s), dt(n));
            bt(N);
            var E = mt(i, N);
            bt(E);
            var A = (S ^ (b >= 0) ? -1 : 1) * tn(E[2]);
            (r > A || (r === A && (N[0] || N[1]))) &&
              (o += S ^ (b >= 0) ? 1 : -1);
          }
          if (!d++) break;
          (h = y), (g = M), (v = x), (s = n);
        }
    }
    return (-Uo > u || (Uo > u && -Uo > ka)) ^ (1 & o);
  }
  function It(n) {
    function t(n, t) {
      return Math.cos(n) * Math.cos(t) > u;
    }
    function e(n) {
      var e, u, l, c, f;
      return {
        lineStart: function () {
          (c = l = !1), (f = 1);
        },
        point: function (s, h) {
          var p,
            g = [s, h],
            v = t(s, h),
            d = o ? (v ? 0 : i(s, h)) : v ? i(s + (0 > s ? Fo : -Fo), h) : 0;
          if (
            (!e && (c = l = v) && n.lineStart(),
            v !== l &&
              ((p = r(e, g)),
              (wt(e, p) || wt(g, p)) &&
                ((g[0] += Uo), (g[1] += Uo), (v = t(g[0], g[1])))),
            v !== l)
          )
            (f = 0),
              v
                ? (n.lineStart(), (p = r(g, e)), n.point(p[0], p[1]))
                : ((p = r(e, g)), n.point(p[0], p[1]), n.lineEnd()),
              (e = p);
          else if (a && e && o ^ v) {
            var y;
            d & u ||
              !(y = r(g, e, !0)) ||
              ((f = 0),
              o
                ? (n.lineStart(),
                  n.point(y[0][0], y[0][1]),
                  n.point(y[1][0], y[1][1]),
                  n.lineEnd())
                : (n.point(y[1][0], y[1][1]),
                  n.lineEnd(),
                  n.lineStart(),
                  n.point(y[0][0], y[0][1])));
          }
          !v || (e && wt(e, g)) || n.point(g[0], g[1]),
            (e = g),
            (l = v),
            (u = d);
        },
        lineEnd: function () {
          l && n.lineEnd(), (e = null);
        },
        clean: function () {
          return f | ((c && l) << 1);
        },
      };
    }
    function r(n, t, e) {
      var r = dt(n),
        i = dt(t),
        o = [1, 0, 0],
        a = mt(r, i),
        l = yt(a, a),
        c = a[0],
        f = l - c * c;
      if (!f) return !e && n;
      var s = (u * l) / f,
        h = (-u * c) / f,
        p = mt(o, a),
        g = xt(o, s),
        v = xt(a, h);
      Mt(g, v);
      var d = p,
        y = yt(g, d),
        m = yt(d, d),
        M = y * y - m * (yt(g, g) - 1);
      if (!(0 > M)) {
        var x = Math.sqrt(M),
          b = xt(d, (-y - x) / m);
        if ((Mt(b, g), (b = _t(b)), !e)) return b;
        var _,
          w = n[0],
          S = t[0],
          k = n[1],
          N = t[1];
        w > S && ((_ = w), (w = S), (S = _));
        var E = S - w,
          A = xo(E - Fo) < Uo,
          C = A || Uo > E;
        if (
          (!A && k > N && ((_ = k), (k = N), (N = _)),
          C
            ? A
              ? (k + N > 0) ^ (b[1] < (xo(b[0] - w) < Uo ? k : N))
              : k <= b[1] && b[1] <= N
            : (E > Fo) ^ (w <= b[0] && b[0] <= S))
        ) {
          var z = xt(d, (-y + x) / m);
          return Mt(z, g), [b, _t(z)];
        }
      }
    }
    function i(t, e) {
      var r = o ? n : Fo - n,
        i = 0;
      return (
        -r > t ? (i |= 1) : t > r && (i |= 2),
        -r > e ? (i |= 4) : e > r && (i |= 8),
        i
      );
    }
    var u = Math.cos(n),
      o = u > 0,
      a = xo(u) > Uo,
      l = ve(n, 6 * Yo);
    return Rt(t, e, l, o ? [0, -n] : [-Fo, n - Fo]);
  }
  function Yt(n, t, e, r) {
    return function (i) {
      var u,
        o = i.a,
        a = i.b,
        l = o.x,
        c = o.y,
        f = a.x,
        s = a.y,
        h = 0,
        p = 1,
        g = f - l,
        v = s - c;
      if (((u = n - l), g || !(u > 0))) {
        if (((u /= g), 0 > g)) {
          if (h > u) return;
          p > u && (p = u);
        } else if (g > 0) {
          if (u > p) return;
          u > h && (h = u);
        }
        if (((u = e - l), g || !(0 > u))) {
          if (((u /= g), 0 > g)) {
            if (u > p) return;
            u > h && (h = u);
          } else if (g > 0) {
            if (h > u) return;
            p > u && (p = u);
          }
          if (((u = t - c), v || !(u > 0))) {
            if (((u /= v), 0 > v)) {
              if (h > u) return;
              p > u && (p = u);
            } else if (v > 0) {
              if (u > p) return;
              u > h && (h = u);
            }
            if (((u = r - c), v || !(0 > u))) {
              if (((u /= v), 0 > v)) {
                if (u > p) return;
                u > h && (h = u);
              } else if (v > 0) {
                if (h > u) return;
                p > u && (p = u);
              }
              return (
                h > 0 && (i.a = { x: l + h * g, y: c + h * v }),
                1 > p && (i.b = { x: l + p * g, y: c + p * v }),
                i
              );
            }
          }
        }
      }
    };
  }
  function Zt(n, t, e, r) {
    function i(r, i) {
      return xo(r[0] - n) < Uo
        ? i > 0
          ? 0
          : 3
        : xo(r[0] - e) < Uo
        ? i > 0
          ? 2
          : 1
        : xo(r[1] - t) < Uo
        ? i > 0
          ? 1
          : 0
        : i > 0
        ? 3
        : 2;
    }
    function u(n, t) {
      return o(n.x, t.x);
    }
    function o(n, t) {
      var e = i(n, 1),
        r = i(t, 1);
      return e !== r
        ? e - r
        : 0 === e
        ? t[1] - n[1]
        : 1 === e
        ? n[0] - t[0]
        : 2 === e
        ? n[1] - t[1]
        : t[0] - n[0];
    }
    return function (a) {
      function l(n) {
        for (var t = 0, e = d.length, r = n[1], i = 0; e > i; ++i)
          for (var u, o = 1, a = d[i], l = a.length, c = a[0]; l > o; ++o)
            (u = a[o]),
              c[1] <= r
                ? u[1] > r && Q(c, u, n) > 0 && ++t
                : u[1] <= r && Q(c, u, n) < 0 && --t,
              (c = u);
        return 0 !== t;
      }
      function c(u, a, l, c) {
        var f = 0,
          s = 0;
        if (
          null == u ||
          (f = i(u, l)) !== (s = i(a, l)) ||
          (o(u, a) < 0) ^ (l > 0)
        ) {
          do c.point(0 === f || 3 === f ? n : e, f > 1 ? r : t);
          while ((f = (f + l + 4) % 4) !== s);
        } else c.point(a[0], a[1]);
      }
      function f(i, u) {
        return i >= n && e >= i && u >= t && r >= u;
      }
      function s(n, t) {
        f(n, t) && a.point(n, t);
      }
      function h() {
        (C.point = g), d && d.push((y = [])), (S = !0), (w = !1), (b = _ = NaN);
      }
      function p() {
        v && (g(m, M), x && w && E.rejoin(), v.push(E.buffer())),
          (C.point = s),
          w && a.lineEnd();
      }
      function g(n, t) {
        (n = Math.max(-Ha, Math.min(Ha, n))),
          (t = Math.max(-Ha, Math.min(Ha, t)));
        var e = f(n, t);
        if ((d && y.push([n, t]), S))
          (m = n),
            (M = t),
            (x = e),
            (S = !1),
            e && (a.lineStart(), a.point(n, t));
        else if (e && w) a.point(n, t);
        else {
          var r = { a: { x: b, y: _ }, b: { x: n, y: t } };
          A(r)
            ? (w || (a.lineStart(), a.point(r.a.x, r.a.y)),
              a.point(r.b.x, r.b.y),
              e || a.lineEnd(),
              (k = !1))
            : e && (a.lineStart(), a.point(n, t), (k = !1));
        }
        (b = n), (_ = t), (w = e);
      }
      var v,
        d,
        y,
        m,
        M,
        x,
        b,
        _,
        w,
        S,
        k,
        N = a,
        E = Pt(),
        A = Yt(n, t, e, r),
        C = {
          point: s,
          lineStart: h,
          lineEnd: p,
          polygonStart: function () {
            (a = E), (v = []), (d = []), (k = !0);
          },
          polygonEnd: function () {
            (a = N), (v = ao.merge(v));
            var t = l([n, r]),
              e = k && t,
              i = v.length;
            (e || i) &&
              (a.polygonStart(),
              e && (a.lineStart(), c(null, null, 1, a), a.lineEnd()),
              i && Lt(v, u, t, c, a),
              a.polygonEnd()),
              (v = d = y = null);
          },
        };
      return C;
    };
  }
  function Vt(n) {
    var t = 0,
      e = Fo / 3,
      r = ae(n),
      i = r(t, e);
    return (
      (i.parallels = function (n) {
        return arguments.length
          ? r((t = (n[0] * Fo) / 180), (e = (n[1] * Fo) / 180))
          : [(t / Fo) * 180, (e / Fo) * 180];
      }),
      i
    );
  }
  function Xt(n, t) {
    function e(n, t) {
      var e = Math.sqrt(u - 2 * i * Math.sin(t)) / i;
      return [e * Math.sin((n *= i)), o - e * Math.cos(n)];
    }
    var r = Math.sin(n),
      i = (r + Math.sin(t)) / 2,
      u = 1 + r * (2 * i - r),
      o = Math.sqrt(u) / i;
    return (
      (e.invert = function (n, t) {
        var e = o - t;
        return [
          Math.atan2(n, e) / i,
          tn((u - (n * n + e * e) * i * i) / (2 * i)),
        ];
      }),
      e
    );
  }
  function $t() {
    function n(n, t) {
      (Ia += i * n - r * t), (r = n), (i = t);
    }
    var t, e, r, i;
    ($a.point = function (u, o) {
      ($a.point = n), (t = r = u), (e = i = o);
    }),
      ($a.lineEnd = function () {
        n(t, e);
      });
  }
  function Bt(n, t) {
    Ya > n && (Ya = n),
      n > Va && (Va = n),
      Za > t && (Za = t),
      t > Xa && (Xa = t);
  }
  function Wt() {
    function n(n, t) {
      o.push("M", n, ",", t, u);
    }
    function t(n, t) {
      o.push("M", n, ",", t), (a.point = e);
    }
    function e(n, t) {
      o.push("L", n, ",", t);
    }
    function r() {
      a.point = n;
    }
    function i() {
      o.push("Z");
    }
    var u = Jt(4.5),
      o = [],
      a = {
        point: n,
        lineStart: function () {
          a.point = t;
        },
        lineEnd: r,
        polygonStart: function () {
          a.lineEnd = i;
        },
        polygonEnd: function () {
          (a.lineEnd = r), (a.point = n);
        },
        pointRadius: function (n) {
          return (u = Jt(n)), a;
        },
        result: function () {
          if (o.length) {
            var n = o.join("");
            return (o = []), n;
          }
        },
      };
    return a;
  }
  function Jt(n) {
    return (
      "m0," +
      n +
      "a" +
      n +
      "," +
      n +
      " 0 1,1 0," +
      -2 * n +
      "a" +
      n +
      "," +
      n +
      " 0 1,1 0," +
      2 * n +
      "z"
    );
  }
  function Gt(n, t) {
    (Ca += n), (za += t), ++La;
  }
  function Kt() {
    function n(n, r) {
      var i = n - t,
        u = r - e,
        o = Math.sqrt(i * i + u * u);
      (qa += (o * (t + n)) / 2),
        (Ta += (o * (e + r)) / 2),
        (Ra += o),
        Gt((t = n), (e = r));
    }
    var t, e;
    Wa.point = function (r, i) {
      (Wa.point = n), Gt((t = r), (e = i));
    };
  }
  function Qt() {
    Wa.point = Gt;
  }
  function ne() {
    function n(n, t) {
      var e = n - r,
        u = t - i,
        o = Math.sqrt(e * e + u * u);
      (qa += (o * (r + n)) / 2),
        (Ta += (o * (i + t)) / 2),
        (Ra += o),
        (o = i * n - r * t),
        (Da += o * (r + n)),
        (Pa += o * (i + t)),
        (Ua += 3 * o),
        Gt((r = n), (i = t));
    }
    var t, e, r, i;
    (Wa.point = function (u, o) {
      (Wa.point = n), Gt((t = r = u), (e = i = o));
    }),
      (Wa.lineEnd = function () {
        n(t, e);
      });
  }
  function te(n) {
    function t(t, e) {
      n.moveTo(t + o, e), n.arc(t, e, o, 0, Ho);
    }
    function e(t, e) {
      n.moveTo(t, e), (a.point = r);
    }
    function r(t, e) {
      n.lineTo(t, e);
    }
    function i() {
      a.point = t;
    }
    function u() {
      n.closePath();
    }
    var o = 4.5,
      a = {
        point: t,
        lineStart: function () {
          a.point = e;
        },
        lineEnd: i,
        polygonStart: function () {
          a.lineEnd = u;
        },
        polygonEnd: function () {
          (a.lineEnd = i), (a.point = t);
        },
        pointRadius: function (n) {
          return (o = n), a;
        },
        result: b,
      };
    return a;
  }
  function ee(n) {
    function t(n) {
      return (a ? r : e)(n);
    }
    function e(t) {
      return ue(t, function (e, r) {
        (e = n(e, r)), t.point(e[0], e[1]);
      });
    }
    function r(t) {
      function e(e, r) {
        (e = n(e, r)), t.point(e[0], e[1]);
      }
      function r() {
        (M = NaN), (S.point = u), t.lineStart();
      }
      function u(e, r) {
        var u = dt([e, r]),
          o = n(e, r);
        i(
          M,
          x,
          m,
          b,
          _,
          w,
          (M = o[0]),
          (x = o[1]),
          (m = e),
          (b = u[0]),
          (_ = u[1]),
          (w = u[2]),
          a,
          t
        ),
          t.point(M, x);
      }
      function o() {
        (S.point = e), t.lineEnd();
      }
      function l() {
        r(), (S.point = c), (S.lineEnd = f);
      }
      function c(n, t) {
        u((s = n), (h = t)),
          (p = M),
          (g = x),
          (v = b),
          (d = _),
          (y = w),
          (S.point = u);
      }
      function f() {
        i(M, x, m, b, _, w, p, g, s, v, d, y, a, t), (S.lineEnd = o), o();
      }
      var s,
        h,
        p,
        g,
        v,
        d,
        y,
        m,
        M,
        x,
        b,
        _,
        w,
        S = {
          point: e,
          lineStart: r,
          lineEnd: o,
          polygonStart: function () {
            t.polygonStart(), (S.lineStart = l);
          },
          polygonEnd: function () {
            t.polygonEnd(), (S.lineStart = r);
          },
        };
      return S;
    }
    function i(t, e, r, a, l, c, f, s, h, p, g, v, d, y) {
      var m = f - t,
        M = s - e,
        x = m * m + M * M;
      if (x > 4 * u && d--) {
        var b = a + p,
          _ = l + g,
          w = c + v,
          S = Math.sqrt(b * b + _ * _ + w * w),
          k = Math.asin((w /= S)),
          N =
            xo(xo(w) - 1) < Uo || xo(r - h) < Uo
              ? (r + h) / 2
              : Math.atan2(_, b),
          E = n(N, k),
          A = E[0],
          C = E[1],
          z = A - t,
          L = C - e,
          q = M * z - m * L;
        ((q * q) / x > u ||
          xo((m * z + M * L) / x - 0.5) > 0.3 ||
          o > a * p + l * g + c * v) &&
          (i(t, e, r, a, l, c, A, C, N, (b /= S), (_ /= S), w, d, y),
          y.point(A, C),
          i(A, C, N, b, _, w, f, s, h, p, g, v, d, y));
      }
    }
    var u = 0.5,
      o = Math.cos(30 * Yo),
      a = 16;
    return (
      (t.precision = function (n) {
        return arguments.length
          ? ((a = (u = n * n) > 0 && 16), t)
          : Math.sqrt(u);
      }),
      t
    );
  }
  function re(n) {
    var t = ee(function (t, e) {
      return n([t * Zo, e * Zo]);
    });
    return function (n) {
      return le(t(n));
    };
  }
  function ie(n) {
    this.stream = n;
  }
  function ue(n, t) {
    return {
      point: t,
      sphere: function () {
        n.sphere();
      },
      lineStart: function () {
        n.lineStart();
      },
      lineEnd: function () {
        n.lineEnd();
      },
      polygonStart: function () {
        n.polygonStart();
      },
      polygonEnd: function () {
        n.polygonEnd();
      },
    };
  }
  function oe(n) {
    return ae(function () {
      return n;
    })();
  }
  function ae(n) {
    function t(n) {
      return (n = a(n[0] * Yo, n[1] * Yo)), [n[0] * h + l, c - n[1] * h];
    }
    function e(n) {
      return (
        (n = a.invert((n[0] - l) / h, (c - n[1]) / h)),
        n && [n[0] * Zo, n[1] * Zo]
      );
    }
    function r() {
      a = Ct((o = se(y, M, x)), u);
      var n = u(v, d);
      return (l = p - n[0] * h), (c = g + n[1] * h), i();
    }
    function i() {
      return f && ((f.valid = !1), (f = null)), t;
    }
    var u,
      o,
      a,
      l,
      c,
      f,
      s = ee(function (n, t) {
        return (n = u(n, t)), [n[0] * h + l, c - n[1] * h];
      }),
      h = 150,
      p = 480,
      g = 250,
      v = 0,
      d = 0,
      y = 0,
      M = 0,
      x = 0,
      b = Fa,
      _ = m,
      w = null,
      S = null;
    return (
      (t.stream = function (n) {
        return f && (f.valid = !1), (f = le(b(o, s(_(n))))), (f.valid = !0), f;
      }),
      (t.clipAngle = function (n) {
        return arguments.length
          ? ((b = null == n ? ((w = n), Fa) : It((w = +n) * Yo)), i())
          : w;
      }),
      (t.clipExtent = function (n) {
        return arguments.length
          ? ((S = n), (_ = n ? Zt(n[0][0], n[0][1], n[1][0], n[1][1]) : m), i())
          : S;
      }),
      (t.scale = function (n) {
        return arguments.length ? ((h = +n), r()) : h;
      }),
      (t.translate = function (n) {
        return arguments.length ? ((p = +n[0]), (g = +n[1]), r()) : [p, g];
      }),
      (t.center = function (n) {
        return arguments.length
          ? ((v = (n[0] % 360) * Yo), (d = (n[1] % 360) * Yo), r())
          : [v * Zo, d * Zo];
      }),
      (t.rotate = function (n) {
        return arguments.length
          ? ((y = (n[0] % 360) * Yo),
            (M = (n[1] % 360) * Yo),
            (x = n.length > 2 ? (n[2] % 360) * Yo : 0),
            r())
          : [y * Zo, M * Zo, x * Zo];
      }),
      ao.rebind(t, s, "precision"),
      function () {
        return (u = n.apply(this, arguments)), (t.invert = u.invert && e), r();
      }
    );
  }
  function le(n) {
    return ue(n, function (t, e) {
      n.point(t * Yo, e * Yo);
    });
  }
  function ce(n, t) {
    return [n, t];
  }
  function fe(n, t) {
    return [n > Fo ? n - Ho : -Fo > n ? n + Ho : n, t];
  }
  function se(n, t, e) {
    return n ? (t || e ? Ct(pe(n), ge(t, e)) : pe(n)) : t || e ? ge(t, e) : fe;
  }
  function he(n) {
    return function (t, e) {
      return (t += n), [t > Fo ? t - Ho : -Fo > t ? t + Ho : t, e];
    };
  }
  function pe(n) {
    var t = he(n);
    return (t.invert = he(-n)), t;
  }
  function ge(n, t) {
    function e(n, t) {
      var e = Math.cos(t),
        a = Math.cos(n) * e,
        l = Math.sin(n) * e,
        c = Math.sin(t),
        f = c * r + a * i;
      return [Math.atan2(l * u - f * o, a * r - c * i), tn(f * u + l * o)];
    }
    var r = Math.cos(n),
      i = Math.sin(n),
      u = Math.cos(t),
      o = Math.sin(t);
    return (
      (e.invert = function (n, t) {
        var e = Math.cos(t),
          a = Math.cos(n) * e,
          l = Math.sin(n) * e,
          c = Math.sin(t),
          f = c * u - l * o;
        return [Math.atan2(l * u + c * o, a * r + f * i), tn(f * r - a * i)];
      }),
      e
    );
  }
  function ve(n, t) {
    var e = Math.cos(n),
      r = Math.sin(n);
    return function (i, u, o, a) {
      var l = o * t;
      null != i
        ? ((i = de(e, i)),
          (u = de(e, u)),
          (o > 0 ? u > i : i > u) && (i += o * Ho))
        : ((i = n + o * Ho), (u = n - 0.5 * l));
      for (var c, f = i; o > 0 ? f > u : u > f; f -= l)
        a.point((c = _t([e, -r * Math.cos(f), -r * Math.sin(f)]))[0], c[1]);
    };
  }
  function de(n, t) {
    var e = dt(t);
    (e[0] -= n), bt(e);
    var r = nn(-e[1]);
    return ((-e[2] < 0 ? -r : r) + 2 * Math.PI - Uo) % (2 * Math.PI);
  }
  function ye(n, t, e) {
    var r = ao.range(n, t - Uo, e).concat(t);
    return function (n) {
      return r.map(function (t) {
        return [n, t];
      });
    };
  }
  function me(n, t, e) {
    var r = ao.range(n, t - Uo, e).concat(t);
    return function (n) {
      return r.map(function (t) {
        return [t, n];
      });
    };
  }
  function Me(n) {
    return n.source;
  }
  function xe(n) {
    return n.target;
  }
  function be(n, t, e, r) {
    var i = Math.cos(t),
      u = Math.sin(t),
      o = Math.cos(r),
      a = Math.sin(r),
      l = i * Math.cos(n),
      c = i * Math.sin(n),
      f = o * Math.cos(e),
      s = o * Math.sin(e),
      h = 2 * Math.asin(Math.sqrt(on(r - t) + i * o * on(e - n))),
      p = 1 / Math.sin(h),
      g = h
        ? function (n) {
            var t = Math.sin((n *= h)) * p,
              e = Math.sin(h - n) * p,
              r = e * l + t * f,
              i = e * c + t * s,
              o = e * u + t * a;
            return [
              Math.atan2(i, r) * Zo,
              Math.atan2(o, Math.sqrt(r * r + i * i)) * Zo,
            ];
          }
        : function () {
            return [n * Zo, t * Zo];
          };
    return (g.distance = h), g;
  }
  function _e() {
    function n(n, i) {
      var u = Math.sin((i *= Yo)),
        o = Math.cos(i),
        a = xo((n *= Yo) - t),
        l = Math.cos(a);
      (Ja += Math.atan2(
        Math.sqrt((a = o * Math.sin(a)) * a + (a = r * u - e * o * l) * a),
        e * u + r * o * l
      )),
        (t = n),
        (e = u),
        (r = o);
    }
    var t, e, r;
    (Ga.point = function (i, u) {
      (t = i * Yo),
        (e = Math.sin((u *= Yo))),
        (r = Math.cos(u)),
        (Ga.point = n);
    }),
      (Ga.lineEnd = function () {
        Ga.point = Ga.lineEnd = b;
      });
  }
  function we(n, t) {
    function e(t, e) {
      var r = Math.cos(t),
        i = Math.cos(e),
        u = n(r * i);
      return [u * i * Math.sin(t), u * Math.sin(e)];
    }
    return (
      (e.invert = function (n, e) {
        var r = Math.sqrt(n * n + e * e),
          i = t(r),
          u = Math.sin(i),
          o = Math.cos(i);
        return [Math.atan2(n * u, r * o), Math.asin(r && (e * u) / r)];
      }),
      e
    );
  }
  function Se(n, t) {
    function e(n, t) {
      o > 0 ? -Io + Uo > t && (t = -Io + Uo) : t > Io - Uo && (t = Io - Uo);
      var e = o / Math.pow(i(t), u);
      return [e * Math.sin(u * n), o - e * Math.cos(u * n)];
    }
    var r = Math.cos(n),
      i = function (n) {
        return Math.tan(Fo / 4 + n / 2);
      },
      u =
        n === t
          ? Math.sin(n)
          : Math.log(r / Math.cos(t)) / Math.log(i(t) / i(n)),
      o = (r * Math.pow(i(n), u)) / u;
    return u
      ? ((e.invert = function (n, t) {
          var e = o - t,
            r = K(u) * Math.sqrt(n * n + e * e);
          return [
            Math.atan2(n, e) / u,
            2 * Math.atan(Math.pow(o / r, 1 / u)) - Io,
          ];
        }),
        e)
      : Ne;
  }
  function ke(n, t) {
    function e(n, t) {
      var e = u - t;
      return [e * Math.sin(i * n), u - e * Math.cos(i * n)];
    }
    var r = Math.cos(n),
      i = n === t ? Math.sin(n) : (r - Math.cos(t)) / (t - n),
      u = r / i + n;
    return xo(i) < Uo
      ? ce
      : ((e.invert = function (n, t) {
          var e = u - t;
          return [Math.atan2(n, e) / i, u - K(i) * Math.sqrt(n * n + e * e)];
        }),
        e);
  }
  function Ne(n, t) {
    return [n, Math.log(Math.tan(Fo / 4 + t / 2))];
  }
  function Ee(n) {
    var t,
      e = oe(n),
      r = e.scale,
      i = e.translate,
      u = e.clipExtent;
    return (
      (e.scale = function () {
        var n = r.apply(e, arguments);
        return n === e ? (t ? e.clipExtent(null) : e) : n;
      }),
      (e.translate = function () {
        var n = i.apply(e, arguments);
        return n === e ? (t ? e.clipExtent(null) : e) : n;
      }),
      (e.clipExtent = function (n) {
        var o = u.apply(e, arguments);
        if (o === e) {
          if ((t = null == n)) {
            var a = Fo * r(),
              l = i();
            u([
              [l[0] - a, l[1] - a],
              [l[0] + a, l[1] + a],
            ]);
          }
        } else t && (o = null);
        return o;
      }),
      e.clipExtent(null)
    );
  }
  function Ae(n, t) {
    return [Math.log(Math.tan(Fo / 4 + t / 2)), -n];
  }
  function Ce(n) {
    return n[0];
  }
  function ze(n) {
    return n[1];
  }
  function Le(n) {
    for (var t = n.length, e = [0, 1], r = 2, i = 2; t > i; i++) {
      for (; r > 1 && Q(n[e[r - 2]], n[e[r - 1]], n[i]) <= 0; ) --r;
      e[r++] = i;
    }
    return e.slice(0, r);
  }
  function qe(n, t) {
    return n[0] - t[0] || n[1] - t[1];
  }
  function Te(n, t, e) {
    return (e[0] - t[0]) * (n[1] - t[1]) < (e[1] - t[1]) * (n[0] - t[0]);
  }
  function Re(n, t, e, r) {
    var i = n[0],
      u = e[0],
      o = t[0] - i,
      a = r[0] - u,
      l = n[1],
      c = e[1],
      f = t[1] - l,
      s = r[1] - c,
      h = (a * (l - c) - s * (i - u)) / (s * o - a * f);
    return [i + h * o, l + h * f];
  }
  function De(n) {
    var t = n[0],
      e = n[n.length - 1];
    return !(t[0] - e[0] || t[1] - e[1]);
  }
  function Pe() {
    rr(this), (this.edge = this.site = this.circle = null);
  }
  function Ue(n) {
    var t = cl.pop() || new Pe();
    return (t.site = n), t;
  }
  function je(n) {
    Be(n), ol.remove(n), cl.push(n), rr(n);
  }
  function Fe(n) {
    var t = n.circle,
      e = t.x,
      r = t.cy,
      i = { x: e, y: r },
      u = n.P,
      o = n.N,
      a = [n];
    je(n);
    for (
      var l = u;
      l.circle && xo(e - l.circle.x) < Uo && xo(r - l.circle.cy) < Uo;

    )
      (u = l.P), a.unshift(l), je(l), (l = u);
    a.unshift(l), Be(l);
    for (
      var c = o;
      c.circle && xo(e - c.circle.x) < Uo && xo(r - c.circle.cy) < Uo;

    )
      (o = c.N), a.push(c), je(c), (c = o);
    a.push(c), Be(c);
    var f,
      s = a.length;
    for (f = 1; s > f; ++f)
      (c = a[f]), (l = a[f - 1]), nr(c.edge, l.site, c.site, i);
    (l = a[0]),
      (c = a[s - 1]),
      (c.edge = Ke(l.site, c.site, null, i)),
      $e(l),
      $e(c);
  }
  function He(n) {
    for (var t, e, r, i, u = n.x, o = n.y, a = ol._; a; )
      if (((r = Oe(a, o) - u), r > Uo)) a = a.L;
      else {
        if (((i = u - Ie(a, o)), !(i > Uo))) {
          r > -Uo
            ? ((t = a.P), (e = a))
            : i > -Uo
            ? ((t = a), (e = a.N))
            : (t = e = a);
          break;
        }
        if (!a.R) {
          t = a;
          break;
        }
        a = a.R;
      }
    var l = Ue(n);
    if ((ol.insert(t, l), t || e)) {
      if (t === e)
        return (
          Be(t),
          (e = Ue(t.site)),
          ol.insert(l, e),
          (l.edge = e.edge = Ke(t.site, l.site)),
          $e(t),
          void $e(e)
        );
      if (!e) return void (l.edge = Ke(t.site, l.site));
      Be(t), Be(e);
      var c = t.site,
        f = c.x,
        s = c.y,
        h = n.x - f,
        p = n.y - s,
        g = e.site,
        v = g.x - f,
        d = g.y - s,
        y = 2 * (h * d - p * v),
        m = h * h + p * p,
        M = v * v + d * d,
        x = { x: (d * m - p * M) / y + f, y: (h * M - v * m) / y + s };
      nr(e.edge, c, g, x),
        (l.edge = Ke(c, n, null, x)),
        (e.edge = Ke(n, g, null, x)),
        $e(t),
        $e(e);
    }
  }
  function Oe(n, t) {
    var e = n.site,
      r = e.x,
      i = e.y,
      u = i - t;
    if (!u) return r;
    var o = n.P;
    if (!o) return -(1 / 0);
    e = o.site;
    var a = e.x,
      l = e.y,
      c = l - t;
    if (!c) return a;
    var f = a - r,
      s = 1 / u - 1 / c,
      h = f / c;
    return s
      ? (-h +
          Math.sqrt(
            h * h - 2 * s * ((f * f) / (-2 * c) - l + c / 2 + i - u / 2)
          )) /
          s +
          r
      : (r + a) / 2;
  }
  function Ie(n, t) {
    var e = n.N;
    if (e) return Oe(e, t);
    var r = n.site;
    return r.y === t ? r.x : 1 / 0;
  }
  function Ye(n) {
    (this.site = n), (this.edges = []);
  }
  function Ze(n) {
    for (
      var t,
        e,
        r,
        i,
        u,
        o,
        a,
        l,
        c,
        f,
        s = n[0][0],
        h = n[1][0],
        p = n[0][1],
        g = n[1][1],
        v = ul,
        d = v.length;
      d--;

    )
      if (((u = v[d]), u && u.prepare()))
        for (a = u.edges, l = a.length, o = 0; l > o; )
          (f = a[o].end()),
            (r = f.x),
            (i = f.y),
            (c = a[++o % l].start()),
            (t = c.x),
            (e = c.y),
            (xo(r - t) > Uo || xo(i - e) > Uo) &&
              (a.splice(
                o,
                0,
                new tr(
                  Qe(
                    u.site,
                    f,
                    xo(r - s) < Uo && g - i > Uo
                      ? { x: s, y: xo(t - s) < Uo ? e : g }
                      : xo(i - g) < Uo && h - r > Uo
                      ? { x: xo(e - g) < Uo ? t : h, y: g }
                      : xo(r - h) < Uo && i - p > Uo
                      ? { x: h, y: xo(t - h) < Uo ? e : p }
                      : xo(i - p) < Uo && r - s > Uo
                      ? { x: xo(e - p) < Uo ? t : s, y: p }
                      : null
                  ),
                  u.site,
                  null
                )
              ),
              ++l);
  }
  function Ve(n, t) {
    return t.angle - n.angle;
  }
  function Xe() {
    rr(this), (this.x = this.y = this.arc = this.site = this.cy = null);
  }
  function $e(n) {
    var t = n.P,
      e = n.N;
    if (t && e) {
      var r = t.site,
        i = n.site,
        u = e.site;
      if (r !== u) {
        var o = i.x,
          a = i.y,
          l = r.x - o,
          c = r.y - a,
          f = u.x - o,
          s = u.y - a,
          h = 2 * (l * s - c * f);
        if (!(h >= -jo)) {
          var p = l * l + c * c,
            g = f * f + s * s,
            v = (s * p - c * g) / h,
            d = (l * g - f * p) / h,
            s = d + a,
            y = fl.pop() || new Xe();
          (y.arc = n),
            (y.site = i),
            (y.x = v + o),
            (y.y = s + Math.sqrt(v * v + d * d)),
            (y.cy = s),
            (n.circle = y);
          for (var m = null, M = ll._; M; )
            if (y.y < M.y || (y.y === M.y && y.x <= M.x)) {
              if (!M.L) {
                m = M.P;
                break;
              }
              M = M.L;
            } else {
              if (!M.R) {
                m = M;
                break;
              }
              M = M.R;
            }
          ll.insert(m, y), m || (al = y);
        }
      }
    }
  }
  function Be(n) {
    var t = n.circle;
    t &&
      (t.P || (al = t.N), ll.remove(t), fl.push(t), rr(t), (n.circle = null));
  }
  function We(n) {
    for (
      var t, e = il, r = Yt(n[0][0], n[0][1], n[1][0], n[1][1]), i = e.length;
      i--;

    )
      (t = e[i]),
        (!Je(t, n) ||
          !r(t) ||
          (xo(t.a.x - t.b.x) < Uo && xo(t.a.y - t.b.y) < Uo)) &&
          ((t.a = t.b = null), e.splice(i, 1));
  }
  function Je(n, t) {
    var e = n.b;
    if (e) return !0;
    var r,
      i,
      u = n.a,
      o = t[0][0],
      a = t[1][0],
      l = t[0][1],
      c = t[1][1],
      f = n.l,
      s = n.r,
      h = f.x,
      p = f.y,
      g = s.x,
      v = s.y,
      d = (h + g) / 2,
      y = (p + v) / 2;
    if (v === p) {
      if (o > d || d >= a) return;
      if (h > g) {
        if (u) {
          if (u.y >= c) return;
        } else u = { x: d, y: l };
        e = { x: d, y: c };
      } else {
        if (u) {
          if (u.y < l) return;
        } else u = { x: d, y: c };
        e = { x: d, y: l };
      }
    } else if (((r = (h - g) / (v - p)), (i = y - r * d), -1 > r || r > 1))
      if (h > g) {
        if (u) {
          if (u.y >= c) return;
        } else u = { x: (l - i) / r, y: l };
        e = { x: (c - i) / r, y: c };
      } else {
        if (u) {
          if (u.y < l) return;
        } else u = { x: (c - i) / r, y: c };
        e = { x: (l - i) / r, y: l };
      }
    else if (v > p) {
      if (u) {
        if (u.x >= a) return;
      } else u = { x: o, y: r * o + i };
      e = { x: a, y: r * a + i };
    } else {
      if (u) {
        if (u.x < o) return;
      } else u = { x: a, y: r * a + i };
      e = { x: o, y: r * o + i };
    }
    return (n.a = u), (n.b = e), !0;
  }
  function Ge(n, t) {
    (this.l = n), (this.r = t), (this.a = this.b = null);
  }
  function Ke(n, t, e, r) {
    var i = new Ge(n, t);
    return (
      il.push(i),
      e && nr(i, n, t, e),
      r && nr(i, t, n, r),
      ul[n.i].edges.push(new tr(i, n, t)),
      ul[t.i].edges.push(new tr(i, t, n)),
      i
    );
  }
  function Qe(n, t, e) {
    var r = new Ge(n, null);
    return (r.a = t), (r.b = e), il.push(r), r;
  }
  function nr(n, t, e, r) {
    n.a || n.b
      ? n.l === e
        ? (n.b = r)
        : (n.a = r)
      : ((n.a = r), (n.l = t), (n.r = e));
  }
  function tr(n, t, e) {
    var r = n.a,
      i = n.b;
    (this.edge = n),
      (this.site = t),
      (this.angle = e
        ? Math.atan2(e.y - t.y, e.x - t.x)
        : n.l === t
        ? Math.atan2(i.x - r.x, r.y - i.y)
        : Math.atan2(r.x - i.x, i.y - r.y));
  }
  function er() {
    this._ = null;
  }
  function rr(n) {
    n.U = n.C = n.L = n.R = n.P = n.N = null;
  }
  function ir(n, t) {
    var e = t,
      r = t.R,
      i = e.U;
    i ? (i.L === e ? (i.L = r) : (i.R = r)) : (n._ = r),
      (r.U = i),
      (e.U = r),
      (e.R = r.L),
      e.R && (e.R.U = e),
      (r.L = e);
  }
  function ur(n, t) {
    var e = t,
      r = t.L,
      i = e.U;
    i ? (i.L === e ? (i.L = r) : (i.R = r)) : (n._ = r),
      (r.U = i),
      (e.U = r),
      (e.L = r.R),
      e.L && (e.L.U = e),
      (r.R = e);
  }
  function or(n) {
    for (; n.L; ) n = n.L;
    return n;
  }
  function ar(n, t) {
    var e,
      r,
      i,
      u = n.sort(lr).pop();
    for (il = [], ul = new Array(n.length), ol = new er(), ll = new er(); ; )
      if (((i = al), u && (!i || u.y < i.y || (u.y === i.y && u.x < i.x))))
        (u.x === e && u.y === r) ||
          ((ul[u.i] = new Ye(u)), He(u), (e = u.x), (r = u.y)),
          (u = n.pop());
      else {
        if (!i) break;
        Fe(i.arc);
      }
    t && (We(t), Ze(t));
    var o = { cells: ul, edges: il };
    return (ol = ll = il = ul = null), o;
  }
  function lr(n, t) {
    return t.y - n.y || t.x - n.x;
  }
  function cr(n, t, e) {
    return (n.x - e.x) * (t.y - n.y) - (n.x - t.x) * (e.y - n.y);
  }
  function fr(n) {
    return n.x;
  }
  function sr(n) {
    return n.y;
  }
  function hr() {
    return { leaf: !0, nodes: [], point: null, x: null, y: null };
  }
  function pr(n, t, e, r, i, u) {
    if (!n(t, e, r, i, u)) {
      var o = 0.5 * (e + i),
        a = 0.5 * (r + u),
        l = t.nodes;
      l[0] && pr(n, l[0], e, r, o, a),
        l[1] && pr(n, l[1], o, r, i, a),
        l[2] && pr(n, l[2], e, a, o, u),
        l[3] && pr(n, l[3], o, a, i, u);
    }
  }
  function gr(n, t, e, r, i, u, o) {
    var a,
      l = 1 / 0;
    return (
      (function c(n, f, s, h, p) {
        if (!(f > u || s > o || r > h || i > p)) {
          if ((g = n.point)) {
            var g,
              v = t - n.x,
              d = e - n.y,
              y = v * v + d * d;
            if (l > y) {
              var m = Math.sqrt((l = y));
              (r = t - m), (i = e - m), (u = t + m), (o = e + m), (a = g);
            }
          }
          for (
            var M = n.nodes,
              x = 0.5 * (f + h),
              b = 0.5 * (s + p),
              _ = t >= x,
              w = e >= b,
              S = (w << 1) | _,
              k = S + 4;
            k > S;
            ++S
          )
            if ((n = M[3 & S]))
              switch (3 & S) {
                case 0:
                  c(n, f, s, x, b);
                  break;
                case 1:
                  c(n, x, s, h, b);
                  break;
                case 2:
                  c(n, f, b, x, p);
                  break;
                case 3:
                  c(n, x, b, h, p);
              }
        }
      })(n, r, i, u, o),
      a
    );
  }
  function vr(n, t) {
    (n = ao.rgb(n)), (t = ao.rgb(t));
    var e = n.r,
      r = n.g,
      i = n.b,
      u = t.r - e,
      o = t.g - r,
      a = t.b - i;
    return function (n) {
      return (
        "#" +
        bn(Math.round(e + u * n)) +
        bn(Math.round(r + o * n)) +
        bn(Math.round(i + a * n))
      );
    };
  }
  function dr(n, t) {
    var e,
      r = {},
      i = {};
    for (e in n) e in t ? (r[e] = Mr(n[e], t[e])) : (i[e] = n[e]);
    for (e in t) e in n || (i[e] = t[e]);
    return function (n) {
      for (e in r) i[e] = r[e](n);
      return i;
    };
  }
  function yr(n, t) {
    return (
      (n = +n),
      (t = +t),
      function (e) {
        return n * (1 - e) + t * e;
      }
    );
  }
  function mr(n, t) {
    var e,
      r,
      i,
      u = (hl.lastIndex = pl.lastIndex = 0),
      o = -1,
      a = [],
      l = [];
    for (n += "", t += ""; (e = hl.exec(n)) && (r = pl.exec(t)); )
      (i = r.index) > u &&
        ((i = t.slice(u, i)), a[o] ? (a[o] += i) : (a[++o] = i)),
        (e = e[0]) === (r = r[0])
          ? a[o]
            ? (a[o] += r)
            : (a[++o] = r)
          : ((a[++o] = null), l.push({ i: o, x: yr(e, r) })),
        (u = pl.lastIndex);
    return (
      u < t.length && ((i = t.slice(u)), a[o] ? (a[o] += i) : (a[++o] = i)),
      a.length < 2
        ? l[0]
          ? ((t = l[0].x),
            function (n) {
              return t(n) + "";
            })
          : function () {
              return t;
            }
        : ((t = l.length),
          function (n) {
            for (var e, r = 0; t > r; ++r) a[(e = l[r]).i] = e.x(n);
            return a.join("");
          })
    );
  }
  function Mr(n, t) {
    for (
      var e, r = ao.interpolators.length;
      --r >= 0 && !(e = ao.interpolators[r](n, t));

    );
    return e;
  }
  function xr(n, t) {
    var e,
      r = [],
      i = [],
      u = n.length,
      o = t.length,
      a = Math.min(n.length, t.length);
    for (e = 0; a > e; ++e) r.push(Mr(n[e], t[e]));
    for (; u > e; ++e) i[e] = n[e];
    for (; o > e; ++e) i[e] = t[e];
    return function (n) {
      for (e = 0; a > e; ++e) i[e] = r[e](n);
      return i;
    };
  }
  function br(n) {
    return function (t) {
      return 0 >= t ? 0 : t >= 1 ? 1 : n(t);
    };
  }
  function _r(n) {
    return function (t) {
      return 1 - n(1 - t);
    };
  }
  function wr(n) {
    return function (t) {
      return 0.5 * (0.5 > t ? n(2 * t) : 2 - n(2 - 2 * t));
    };
  }
  function Sr(n) {
    return n * n;
  }
  function kr(n) {
    return n * n * n;
  }
  function Nr(n) {
    if (0 >= n) return 0;
    if (n >= 1) return 1;
    var t = n * n,
      e = t * n;
    return 4 * (0.5 > n ? e : 3 * (n - t) + e - 0.75);
  }
  function Er(n) {
    return function (t) {
      return Math.pow(t, n);
    };
  }
  function Ar(n) {
    return 1 - Math.cos(n * Io);
  }
  function Cr(n) {
    return Math.pow(2, 10 * (n - 1));
  }
  function zr(n) {
    return 1 - Math.sqrt(1 - n * n);
  }
  function Lr(n, t) {
    var e;
    return (
      arguments.length < 2 && (t = 0.45),
      arguments.length
        ? (e = (t / Ho) * Math.asin(1 / n))
        : ((n = 1), (e = t / 4)),
      function (r) {
        return 1 + n * Math.pow(2, -10 * r) * Math.sin(((r - e) * Ho) / t);
      }
    );
  }
  function qr(n) {
    return (
      n || (n = 1.70158),
      function (t) {
        return t * t * ((n + 1) * t - n);
      }
    );
  }
  function Tr(n) {
    return 1 / 2.75 > n
      ? 7.5625 * n * n
      : 2 / 2.75 > n
      ? 7.5625 * (n -= 1.5 / 2.75) * n + 0.75
      : 2.5 / 2.75 > n
      ? 7.5625 * (n -= 2.25 / 2.75) * n + 0.9375
      : 7.5625 * (n -= 2.625 / 2.75) * n + 0.984375;
  }
  function Rr(n, t) {
    (n = ao.hcl(n)), (t = ao.hcl(t));
    var e = n.h,
      r = n.c,
      i = n.l,
      u = t.h - e,
      o = t.c - r,
      a = t.l - i;
    return (
      isNaN(o) && ((o = 0), (r = isNaN(r) ? t.c : r)),
      isNaN(u)
        ? ((u = 0), (e = isNaN(e) ? t.h : e))
        : u > 180
        ? (u -= 360)
        : -180 > u && (u += 360),
      function (n) {
        return sn(e + u * n, r + o * n, i + a * n) + "";
      }
    );
  }
  function Dr(n, t) {
    (n = ao.hsl(n)), (t = ao.hsl(t));
    var e = n.h,
      r = n.s,
      i = n.l,
      u = t.h - e,
      o = t.s - r,
      a = t.l - i;
    return (
      isNaN(o) && ((o = 0), (r = isNaN(r) ? t.s : r)),
      isNaN(u)
        ? ((u = 0), (e = isNaN(e) ? t.h : e))
        : u > 180
        ? (u -= 360)
        : -180 > u && (u += 360),
      function (n) {
        return cn(e + u * n, r + o * n, i + a * n) + "";
      }
    );
  }
  function Pr(n, t) {
    (n = ao.lab(n)), (t = ao.lab(t));
    var e = n.l,
      r = n.a,
      i = n.b,
      u = t.l - e,
      o = t.a - r,
      a = t.b - i;
    return function (n) {
      return pn(e + u * n, r + o * n, i + a * n) + "";
    };
  }
  function Ur(n, t) {
    return (
      (t -= n),
      function (e) {
        return Math.round(n + t * e);
      }
    );
  }
  function jr(n) {
    var t = [n.a, n.b],
      e = [n.c, n.d],
      r = Hr(t),
      i = Fr(t, e),
      u = Hr(Or(e, t, -i)) || 0;
    t[0] * e[1] < e[0] * t[1] &&
      ((t[0] *= -1), (t[1] *= -1), (r *= -1), (i *= -1)),
      (this.rotate =
        (r ? Math.atan2(t[1], t[0]) : Math.atan2(-e[0], e[1])) * Zo),
      (this.translate = [n.e, n.f]),
      (this.scale = [r, u]),
      (this.skew = u ? Math.atan2(i, u) * Zo : 0);
  }
  function Fr(n, t) {
    return n[0] * t[0] + n[1] * t[1];
  }
  function Hr(n) {
    var t = Math.sqrt(Fr(n, n));
    return t && ((n[0] /= t), (n[1] /= t)), t;
  }
  function Or(n, t, e) {
    return (n[0] += e * t[0]), (n[1] += e * t[1]), n;
  }
  function Ir(n) {
    return n.length ? n.pop() + "," : "";
  }
  function Yr(n, t, e, r) {
    if (n[0] !== t[0] || n[1] !== t[1]) {
      var i = e.push("translate(", null, ",", null, ")");
      r.push({ i: i - 4, x: yr(n[0], t[0]) }, { i: i - 2, x: yr(n[1], t[1]) });
    } else (t[0] || t[1]) && e.push("translate(" + t + ")");
  }
  function Zr(n, t, e, r) {
    n !== t
      ? (n - t > 180 ? (t += 360) : t - n > 180 && (n += 360),
        r.push({ i: e.push(Ir(e) + "rotate(", null, ")") - 2, x: yr(n, t) }))
      : t && e.push(Ir(e) + "rotate(" + t + ")");
  }
  function Vr(n, t, e, r) {
    n !== t
      ? r.push({ i: e.push(Ir(e) + "skewX(", null, ")") - 2, x: yr(n, t) })
      : t && e.push(Ir(e) + "skewX(" + t + ")");
  }
  function Xr(n, t, e, r) {
    if (n[0] !== t[0] || n[1] !== t[1]) {
      var i = e.push(Ir(e) + "scale(", null, ",", null, ")");
      r.push({ i: i - 4, x: yr(n[0], t[0]) }, { i: i - 2, x: yr(n[1], t[1]) });
    } else (1 === t[0] && 1 === t[1]) || e.push(Ir(e) + "scale(" + t + ")");
  }
  function $r(n, t) {
    var e = [],
      r = [];
    return (
      (n = ao.transform(n)),
      (t = ao.transform(t)),
      Yr(n.translate, t.translate, e, r),
      Zr(n.rotate, t.rotate, e, r),
      Vr(n.skew, t.skew, e, r),
      Xr(n.scale, t.scale, e, r),
      (n = t = null),
      function (n) {
        for (var t, i = -1, u = r.length; ++i < u; ) e[(t = r[i]).i] = t.x(n);
        return e.join("");
      }
    );
  }
  function Br(n, t) {
    return (
      (t = (t -= n = +n) || 1 / t),
      function (e) {
        return (e - n) / t;
      }
    );
  }
  function Wr(n, t) {
    return (
      (t = (t -= n = +n) || 1 / t),
      function (e) {
        return Math.max(0, Math.min(1, (e - n) / t));
      }
    );
  }
  function Jr(n) {
    for (var t = n.source, e = n.target, r = Kr(t, e), i = [t]; t !== r; )
      (t = t.parent), i.push(t);
    for (var u = i.length; e !== r; ) i.splice(u, 0, e), (e = e.parent);
    return i;
  }
  function Gr(n) {
    for (var t = [], e = n.parent; null != e; )
      t.push(n), (n = e), (e = e.parent);
    return t.push(n), t;
  }
  function Kr(n, t) {
    if (n === t) return n;
    for (
      var e = Gr(n), r = Gr(t), i = e.pop(), u = r.pop(), o = null;
      i === u;

    )
      (o = i), (i = e.pop()), (u = r.pop());
    return o;
  }
  function Qr(n) {
    n.fixed |= 2;
  }
  function ni(n) {
    n.fixed &= -7;
  }
  function ti(n) {
    (n.fixed |= 4), (n.px = n.x), (n.py = n.y);
  }
  function ei(n) {
    n.fixed &= -5;
  }
  function ri(n, t, e) {
    var r = 0,
      i = 0;
    if (((n.charge = 0), !n.leaf))
      for (var u, o = n.nodes, a = o.length, l = -1; ++l < a; )
        (u = o[l]),
          null != u &&
            (ri(u, t, e),
            (n.charge += u.charge),
            (r += u.charge * u.cx),
            (i += u.charge * u.cy));
    if (n.point) {
      n.leaf ||
        ((n.point.x += Math.random() - 0.5),
        (n.point.y += Math.random() - 0.5));
      var c = t * e[n.point.index];
      (n.charge += n.pointCharge = c),
        (r += c * n.point.x),
        (i += c * n.point.y);
    }
    (n.cx = r / n.charge), (n.cy = i / n.charge);
  }
  function ii(n, t) {
    return (
      ao.rebind(n, t, "sort", "children", "value"),
      (n.nodes = n),
      (n.links = fi),
      n
    );
  }
  function ui(n, t) {
    for (var e = [n]; null != (n = e.pop()); )
      if ((t(n), (i = n.children) && (r = i.length)))
        for (var r, i; --r >= 0; ) e.push(i[r]);
  }
  function oi(n, t) {
    for (var e = [n], r = []; null != (n = e.pop()); )
      if ((r.push(n), (u = n.children) && (i = u.length)))
        for (var i, u, o = -1; ++o < i; ) e.push(u[o]);
    for (; null != (n = r.pop()); ) t(n);
  }
  function ai(n) {
    return n.children;
  }
  function li(n) {
    return n.value;
  }
  function ci(n, t) {
    return t.value - n.value;
  }
  function fi(n) {
    return ao.merge(
      n.map(function (n) {
        return (n.children || []).map(function (t) {
          return { source: n, target: t };
        });
      })
    );
  }
  function si(n) {
    return n.x;
  }
  function hi(n) {
    return n.y;
  }
  function pi(n, t, e) {
    (n.y0 = t), (n.y = e);
  }
  function gi(n) {
    return ao.range(n.length);
  }
  function vi(n) {
    for (var t = -1, e = n[0].length, r = []; ++t < e; ) r[t] = 0;
    return r;
  }
  function di(n) {
    for (var t, e = 1, r = 0, i = n[0][1], u = n.length; u > e; ++e)
      (t = n[e][1]) > i && ((r = e), (i = t));
    return r;
  }
  function yi(n) {
    return n.reduce(mi, 0);
  }
  function mi(n, t) {
    return n + t[1];
  }
  function Mi(n, t) {
    return xi(n, Math.ceil(Math.log(t.length) / Math.LN2 + 1));
  }
  function xi(n, t) {
    for (var e = -1, r = +n[0], i = (n[1] - r) / t, u = []; ++e <= t; )
      u[e] = i * e + r;
    return u;
  }
  function bi(n) {
    return [ao.min(n), ao.max(n)];
  }
  function _i(n, t) {
    return n.value - t.value;
  }
  function wi(n, t) {
    var e = n._pack_next;
    (n._pack_next = t),
      (t._pack_prev = n),
      (t._pack_next = e),
      (e._pack_prev = t);
  }
  function Si(n, t) {
    (n._pack_next = t), (t._pack_prev = n);
  }
  function ki(n, t) {
    var e = t.x - n.x,
      r = t.y - n.y,
      i = n.r + t.r;
    return 0.999 * i * i > e * e + r * r;
  }
  function Ni(n) {
    function t(n) {
      (f = Math.min(n.x - n.r, f)),
        (s = Math.max(n.x + n.r, s)),
        (h = Math.min(n.y - n.r, h)),
        (p = Math.max(n.y + n.r, p));
    }
    if ((e = n.children) && (c = e.length)) {
      var e,
        r,
        i,
        u,
        o,
        a,
        l,
        c,
        f = 1 / 0,
        s = -(1 / 0),
        h = 1 / 0,
        p = -(1 / 0);
      if (
        (e.forEach(Ei),
        (r = e[0]),
        (r.x = -r.r),
        (r.y = 0),
        t(r),
        c > 1 && ((i = e[1]), (i.x = i.r), (i.y = 0), t(i), c > 2))
      )
        for (
          u = e[2],
            zi(r, i, u),
            t(u),
            wi(r, u),
            r._pack_prev = u,
            wi(u, i),
            i = r._pack_next,
            o = 3;
          c > o;
          o++
        ) {
          zi(r, i, (u = e[o]));
          var g = 0,
            v = 1,
            d = 1;
          for (a = i._pack_next; a !== i; a = a._pack_next, v++)
            if (ki(a, u)) {
              g = 1;
              break;
            }
          if (1 == g)
            for (
              l = r._pack_prev;
              l !== a._pack_prev && !ki(l, u);
              l = l._pack_prev, d++
            );
          g
            ? (d > v || (v == d && i.r < r.r) ? Si(r, (i = a)) : Si((r = l), i),
              o--)
            : (wi(r, u), (i = u), t(u));
        }
      var y = (f + s) / 2,
        m = (h + p) / 2,
        M = 0;
      for (o = 0; c > o; o++)
        (u = e[o]),
          (u.x -= y),
          (u.y -= m),
          (M = Math.max(M, u.r + Math.sqrt(u.x * u.x + u.y * u.y)));
      (n.r = M), e.forEach(Ai);
    }
  }
  function Ei(n) {
    n._pack_next = n._pack_prev = n;
  }
  function Ai(n) {
    delete n._pack_next, delete n._pack_prev;
  }
  function Ci(n, t, e, r) {
    var i = n.children;
    if (((n.x = t += r * n.x), (n.y = e += r * n.y), (n.r *= r), i))
      for (var u = -1, o = i.length; ++u < o; ) Ci(i[u], t, e, r);
  }
  function zi(n, t, e) {
    var r = n.r + e.r,
      i = t.x - n.x,
      u = t.y - n.y;
    if (r && (i || u)) {
      var o = t.r + e.r,
        a = i * i + u * u;
      (o *= o), (r *= r);
      var l = 0.5 + (r - o) / (2 * a),
        c =
          Math.sqrt(Math.max(0, 2 * o * (r + a) - (r -= a) * r - o * o)) /
          (2 * a);
      (e.x = n.x + l * i + c * u), (e.y = n.y + l * u - c * i);
    } else (e.x = n.x + r), (e.y = n.y);
  }
  function Li(n, t) {
    return n.parent == t.parent ? 1 : 2;
  }
  function qi(n) {
    var t = n.children;
    return t.length ? t[0] : n.t;
  }
  function Ti(n) {
    var t,
      e = n.children;
    return (t = e.length) ? e[t - 1] : n.t;
  }
  function Ri(n, t, e) {
    var r = e / (t.i - n.i);
    (t.c -= r), (t.s += e), (n.c += r), (t.z += e), (t.m += e);
  }
  function Di(n) {
    for (var t, e = 0, r = 0, i = n.children, u = i.length; --u >= 0; )
      (t = i[u]), (t.z += e), (t.m += e), (e += t.s + (r += t.c));
  }
  function Pi(n, t, e) {
    return n.a.parent === t.parent ? n.a : e;
  }
  function Ui(n) {
    return (
      1 +
      ao.max(n, function (n) {
        return n.y;
      })
    );
  }
  function ji(n) {
    return (
      n.reduce(function (n, t) {
        return n + t.x;
      }, 0) / n.length
    );
  }
  function Fi(n) {
    var t = n.children;
    return t && t.length ? Fi(t[0]) : n;
  }
  function Hi(n) {
    var t,
      e = n.children;
    return e && (t = e.length) ? Hi(e[t - 1]) : n;
  }
  function Oi(n) {
    return { x: n.x, y: n.y, dx: n.dx, dy: n.dy };
  }
  function Ii(n, t) {
    var e = n.x + t[3],
      r = n.y + t[0],
      i = n.dx - t[1] - t[3],
      u = n.dy - t[0] - t[2];
    return (
      0 > i && ((e += i / 2), (i = 0)),
      0 > u && ((r += u / 2), (u = 0)),
      { x: e, y: r, dx: i, dy: u }
    );
  }
  function Yi(n) {
    var t = n[0],
      e = n[n.length - 1];
    return e > t ? [t, e] : [e, t];
  }
  function Zi(n) {
    return n.rangeExtent ? n.rangeExtent() : Yi(n.range());
  }
  function Vi(n, t, e, r) {
    var i = e(n[0], n[1]),
      u = r(t[0], t[1]);
    return function (n) {
      return u(i(n));
    };
  }
  function Xi(n, t) {
    var e,
      r = 0,
      i = n.length - 1,
      u = n[r],
      o = n[i];
    return (
      u > o && ((e = r), (r = i), (i = e), (e = u), (u = o), (o = e)),
      (n[r] = t.floor(u)),
      (n[i] = t.ceil(o)),
      n
    );
  }
  function $i(n) {
    return n
      ? {
          floor: function (t) {
            return Math.floor(t / n) * n;
          },
          ceil: function (t) {
            return Math.ceil(t / n) * n;
          },
        }
      : Sl;
  }
  function Bi(n, t, e, r) {
    var i = [],
      u = [],
      o = 0,
      a = Math.min(n.length, t.length) - 1;
    for (
      n[a] < n[0] && ((n = n.slice().reverse()), (t = t.slice().reverse()));
      ++o <= a;

    )
      i.push(e(n[o - 1], n[o])), u.push(r(t[o - 1], t[o]));
    return function (t) {
      var e = ao.bisect(n, t, 1, a) - 1;
      return u[e](i[e](t));
    };
  }
  function Wi(n, t, e, r) {
    function i() {
      var i = Math.min(n.length, t.length) > 2 ? Bi : Vi,
        l = r ? Wr : Br;
      return (o = i(n, t, l, e)), (a = i(t, n, l, Mr)), u;
    }
    function u(n) {
      return o(n);
    }
    var o, a;
    return (
      (u.invert = function (n) {
        return a(n);
      }),
      (u.domain = function (t) {
        return arguments.length ? ((n = t.map(Number)), i()) : n;
      }),
      (u.range = function (n) {
        return arguments.length ? ((t = n), i()) : t;
      }),
      (u.rangeRound = function (n) {
        return u.range(n).interpolate(Ur);
      }),
      (u.clamp = function (n) {
        return arguments.length ? ((r = n), i()) : r;
      }),
      (u.interpolate = function (n) {
        return arguments.length ? ((e = n), i()) : e;
      }),
      (u.ticks = function (t) {
        return Qi(n, t);
      }),
      (u.tickFormat = function (t, e) {
        return nu(n, t, e);
      }),
      (u.nice = function (t) {
        return Gi(n, t), i();
      }),
      (u.copy = function () {
        return Wi(n, t, e, r);
      }),
      i()
    );
  }
  function Ji(n, t) {
    return ao.rebind(n, t, "range", "rangeRound", "interpolate", "clamp");
  }
  function Gi(n, t) {
    return Xi(n, $i(Ki(n, t)[2])), Xi(n, $i(Ki(n, t)[2])), n;
  }
  function Ki(n, t) {
    null == t && (t = 10);
    var e = Yi(n),
      r = e[1] - e[0],
      i = Math.pow(10, Math.floor(Math.log(r / t) / Math.LN10)),
      u = (t / r) * i;
    return (
      0.15 >= u ? (i *= 10) : 0.35 >= u ? (i *= 5) : 0.75 >= u && (i *= 2),
      (e[0] = Math.ceil(e[0] / i) * i),
      (e[1] = Math.floor(e[1] / i) * i + 0.5 * i),
      (e[2] = i),
      e
    );
  }
  function Qi(n, t) {
    return ao.range.apply(ao, Ki(n, t));
  }
  function nu(n, t, e) {
    var r = Ki(n, t);
    if (e) {
      var i = ha.exec(e);
      if ((i.shift(), "s" === i[8])) {
        var u = ao.formatPrefix(Math.max(xo(r[0]), xo(r[1])));
        return (
          i[7] || (i[7] = "." + tu(u.scale(r[2]))),
          (i[8] = "f"),
          (e = ao.format(i.join(""))),
          function (n) {
            return e(u.scale(n)) + u.symbol;
          }
        );
      }
      i[7] || (i[7] = "." + eu(i[8], r)), (e = i.join(""));
    } else e = ",." + tu(r[2]) + "f";
    return ao.format(e);
  }
  function tu(n) {
    return -Math.floor(Math.log(n) / Math.LN10 + 0.01);
  }
  function eu(n, t) {
    var e = tu(t[2]);
    return n in kl
      ? Math.abs(e - tu(Math.max(xo(t[0]), xo(t[1])))) + +("e" !== n)
      : e - 2 * ("%" === n);
  }
  function ru(n, t, e, r) {
    function i(n) {
      return (
        (e ? Math.log(0 > n ? 0 : n) : -Math.log(n > 0 ? 0 : -n)) / Math.log(t)
      );
    }
    function u(n) {
      return e ? Math.pow(t, n) : -Math.pow(t, -n);
    }
    function o(t) {
      return n(i(t));
    }
    return (
      (o.invert = function (t) {
        return u(n.invert(t));
      }),
      (o.domain = function (t) {
        return arguments.length
          ? ((e = t[0] >= 0), n.domain((r = t.map(Number)).map(i)), o)
          : r;
      }),
      (o.base = function (e) {
        return arguments.length ? ((t = +e), n.domain(r.map(i)), o) : t;
      }),
      (o.nice = function () {
        var t = Xi(r.map(i), e ? Math : El);
        return n.domain(t), (r = t.map(u)), o;
      }),
      (o.ticks = function () {
        var n = Yi(r),
          o = [],
          a = n[0],
          l = n[1],
          c = Math.floor(i(a)),
          f = Math.ceil(i(l)),
          s = t % 1 ? 2 : t;
        if (isFinite(f - c)) {
          if (e) {
            for (; f > c; c++) for (var h = 1; s > h; h++) o.push(u(c) * h);
            o.push(u(c));
          } else
            for (o.push(u(c)); c++ < f; )
              for (var h = s - 1; h > 0; h--) o.push(u(c) * h);
          for (c = 0; o[c] < a; c++);
          for (f = o.length; o[f - 1] > l; f--);
          o = o.slice(c, f);
        }
        return o;
      }),
      (o.tickFormat = function (n, e) {
        if (!arguments.length) return Nl;
        arguments.length < 2
          ? (e = Nl)
          : "function" != typeof e && (e = ao.format(e));
        var r = Math.max(1, (t * n) / o.ticks().length);
        return function (n) {
          var o = n / u(Math.round(i(n)));
          return t - 0.5 > o * t && (o *= t), r >= o ? e(n) : "";
        };
      }),
      (o.copy = function () {
        return ru(n.copy(), t, e, r);
      }),
      Ji(o, n)
    );
  }
  function iu(n, t, e) {
    function r(t) {
      return n(i(t));
    }
    var i = uu(t),
      u = uu(1 / t);
    return (
      (r.invert = function (t) {
        return u(n.invert(t));
      }),
      (r.domain = function (t) {
        return arguments.length ? (n.domain((e = t.map(Number)).map(i)), r) : e;
      }),
      (r.ticks = function (n) {
        return Qi(e, n);
      }),
      (r.tickFormat = function (n, t) {
        return nu(e, n, t);
      }),
      (r.nice = function (n) {
        return r.domain(Gi(e, n));
      }),
      (r.exponent = function (o) {
        return arguments.length
          ? ((i = uu((t = o))), (u = uu(1 / t)), n.domain(e.map(i)), r)
          : t;
      }),
      (r.copy = function () {
        return iu(n.copy(), t, e);
      }),
      Ji(r, n)
    );
  }
  function uu(n) {
    return function (t) {
      return 0 > t ? -Math.pow(-t, n) : Math.pow(t, n);
    };
  }
  function ou(n, t) {
    function e(e) {
      return u[
        ((i.get(e) || ("range" === t.t ? i.set(e, n.push(e)) : NaN)) - 1) %
          u.length
      ];
    }
    function r(t, e) {
      return ao.range(n.length).map(function (n) {
        return t + e * n;
      });
    }
    var i, u, o;
    return (
      (e.domain = function (r) {
        if (!arguments.length) return n;
        (n = []), (i = new c());
        for (var u, o = -1, a = r.length; ++o < a; )
          i.has((u = r[o])) || i.set(u, n.push(u));
        return e[t.t].apply(e, t.a);
      }),
      (e.range = function (n) {
        return arguments.length
          ? ((u = n), (o = 0), (t = { t: "range", a: arguments }), e)
          : u;
      }),
      (e.rangePoints = function (i, a) {
        arguments.length < 2 && (a = 0);
        var l = i[0],
          c = i[1],
          f =
            n.length < 2
              ? ((l = (l + c) / 2), 0)
              : (c - l) / (n.length - 1 + a);
        return (
          (u = r(l + (f * a) / 2, f)),
          (o = 0),
          (t = { t: "rangePoints", a: arguments }),
          e
        );
      }),
      (e.rangeRoundPoints = function (i, a) {
        arguments.length < 2 && (a = 0);
        var l = i[0],
          c = i[1],
          f =
            n.length < 2
              ? ((l = c = Math.round((l + c) / 2)), 0)
              : ((c - l) / (n.length - 1 + a)) | 0;
        return (
          (u = r(
            l + Math.round((f * a) / 2 + (c - l - (n.length - 1 + a) * f) / 2),
            f
          )),
          (o = 0),
          (t = { t: "rangeRoundPoints", a: arguments }),
          e
        );
      }),
      (e.rangeBands = function (i, a, l) {
        arguments.length < 2 && (a = 0), arguments.length < 3 && (l = a);
        var c = i[1] < i[0],
          f = i[c - 0],
          s = i[1 - c],
          h = (s - f) / (n.length - a + 2 * l);
        return (
          (u = r(f + h * l, h)),
          c && u.reverse(),
          (o = h * (1 - a)),
          (t = { t: "rangeBands", a: arguments }),
          e
        );
      }),
      (e.rangeRoundBands = function (i, a, l) {
        arguments.length < 2 && (a = 0), arguments.length < 3 && (l = a);
        var c = i[1] < i[0],
          f = i[c - 0],
          s = i[1 - c],
          h = Math.floor((s - f) / (n.length - a + 2 * l));
        return (
          (u = r(f + Math.round((s - f - (n.length - a) * h) / 2), h)),
          c && u.reverse(),
          (o = Math.round(h * (1 - a))),
          (t = { t: "rangeRoundBands", a: arguments }),
          e
        );
      }),
      (e.rangeBand = function () {
        return o;
      }),
      (e.rangeExtent = function () {
        return Yi(t.a[0]);
      }),
      (e.copy = function () {
        return ou(n, t);
      }),
      e.domain(n)
    );
  }
  function au(n, t) {
    function u() {
      var e = 0,
        r = t.length;
      for (a = []; ++e < r; ) a[e - 1] = ao.quantile(n, e / r);
      return o;
    }
    function o(n) {
      return isNaN((n = +n)) ? void 0 : t[ao.bisect(a, n)];
    }
    var a;
    return (
      (o.domain = function (t) {
        return arguments.length ? ((n = t.map(r).filter(i).sort(e)), u()) : n;
      }),
      (o.range = function (n) {
        return arguments.length ? ((t = n), u()) : t;
      }),
      (o.quantiles = function () {
        return a;
      }),
      (o.invertExtent = function (e) {
        return (
          (e = t.indexOf(e)),
          0 > e
            ? [NaN, NaN]
            : [e > 0 ? a[e - 1] : n[0], e < a.length ? a[e] : n[n.length - 1]]
        );
      }),
      (o.copy = function () {
        return au(n, t);
      }),
      u()
    );
  }
  function lu(n, t, e) {
    function r(t) {
      return e[Math.max(0, Math.min(o, Math.floor(u * (t - n))))];
    }
    function i() {
      return (u = e.length / (t - n)), (o = e.length - 1), r;
    }
    var u, o;
    return (
      (r.domain = function (e) {
        return arguments.length
          ? ((n = +e[0]), (t = +e[e.length - 1]), i())
          : [n, t];
      }),
      (r.range = function (n) {
        return arguments.length ? ((e = n), i()) : e;
      }),
      (r.invertExtent = function (t) {
        return (
          (t = e.indexOf(t)), (t = 0 > t ? NaN : t / u + n), [t, t + 1 / u]
        );
      }),
      (r.copy = function () {
        return lu(n, t, e);
      }),
      i()
    );
  }
  function cu(n, t) {
    function e(e) {
      return e >= e ? t[ao.bisect(n, e)] : void 0;
    }
    return (
      (e.domain = function (t) {
        return arguments.length ? ((n = t), e) : n;
      }),
      (e.range = function (n) {
        return arguments.length ? ((t = n), e) : t;
      }),
      (e.invertExtent = function (e) {
        return (e = t.indexOf(e)), [n[e - 1], n[e]];
      }),
      (e.copy = function () {
        return cu(n, t);
      }),
      e
    );
  }
  function fu(n) {
    function t(n) {
      return +n;
    }
    return (
      (t.invert = t),
      (t.domain = t.range =
        function (e) {
          return arguments.length ? ((n = e.map(t)), t) : n;
        }),
      (t.ticks = function (t) {
        return Qi(n, t);
      }),
      (t.tickFormat = function (t, e) {
        return nu(n, t, e);
      }),
      (t.copy = function () {
        return fu(n);
      }),
      t
    );
  }
  function su() {
    return 0;
  }
  function hu(n) {
    return n.innerRadius;
  }
  function pu(n) {
    return n.outerRadius;
  }
  function gu(n) {
    return n.startAngle;
  }
  function vu(n) {
    return n.endAngle;
  }
  function du(n) {
    return n && n.padAngle;
  }
  function yu(n, t, e, r) {
    return (n - e) * t - (t - r) * n > 0 ? 0 : 1;
  }
  function mu(n, t, e, r, i) {
    var u = n[0] - t[0],
      o = n[1] - t[1],
      a = (i ? r : -r) / Math.sqrt(u * u + o * o),
      l = a * o,
      c = -a * u,
      f = n[0] + l,
      s = n[1] + c,
      h = t[0] + l,
      p = t[1] + c,
      g = (f + h) / 2,
      v = (s + p) / 2,
      d = h - f,
      y = p - s,
      m = d * d + y * y,
      M = e - r,
      x = f * p - h * s,
      b = (0 > y ? -1 : 1) * Math.sqrt(Math.max(0, M * M * m - x * x)),
      _ = (x * y - d * b) / m,
      w = (-x * d - y * b) / m,
      S = (x * y + d * b) / m,
      k = (-x * d + y * b) / m,
      N = _ - g,
      E = w - v,
      A = S - g,
      C = k - v;
    return (
      N * N + E * E > A * A + C * C && ((_ = S), (w = k)),
      [
        [_ - l, w - c],
        [(_ * e) / M, (w * e) / M],
      ]
    );
  }
  function Mu(n) {
    function t(t) {
      function o() {
        c.push("M", u(n(f), a));
      }
      for (
        var l, c = [], f = [], s = -1, h = t.length, p = En(e), g = En(r);
        ++s < h;

      )
        i.call(this, (l = t[s]), s)
          ? f.push([+p.call(this, l, s), +g.call(this, l, s)])
          : f.length && (o(), (f = []));
      return f.length && o(), c.length ? c.join("") : null;
    }
    var e = Ce,
      r = ze,
      i = zt,
      u = xu,
      o = u.key,
      a = 0.7;
    return (
      (t.x = function (n) {
        return arguments.length ? ((e = n), t) : e;
      }),
      (t.y = function (n) {
        return arguments.length ? ((r = n), t) : r;
      }),
      (t.defined = function (n) {
        return arguments.length ? ((i = n), t) : i;
      }),
      (t.interpolate = function (n) {
        return arguments.length
          ? ((o = "function" == typeof n ? (u = n) : (u = Tl.get(n) || xu).key),
            t)
          : o;
      }),
      (t.tension = function (n) {
        return arguments.length ? ((a = n), t) : a;
      }),
      t
    );
  }
  function xu(n) {
    return n.length > 1 ? n.join("L") : n + "Z";
  }
  function bu(n) {
    return n.join("L") + "Z";
  }
  function _u(n) {
    for (var t = 0, e = n.length, r = n[0], i = [r[0], ",", r[1]]; ++t < e; )
      i.push("H", (r[0] + (r = n[t])[0]) / 2, "V", r[1]);
    return e > 1 && i.push("H", r[0]), i.join("");
  }
  function wu(n) {
    for (var t = 0, e = n.length, r = n[0], i = [r[0], ",", r[1]]; ++t < e; )
      i.push("V", (r = n[t])[1], "H", r[0]);
    return i.join("");
  }
  function Su(n) {
    for (var t = 0, e = n.length, r = n[0], i = [r[0], ",", r[1]]; ++t < e; )
      i.push("H", (r = n[t])[0], "V", r[1]);
    return i.join("");
  }
  function ku(n, t) {
    return n.length < 4 ? xu(n) : n[1] + Au(n.slice(1, -1), Cu(n, t));
  }
  function Nu(n, t) {
    return n.length < 3
      ? bu(n)
      : n[0] +
          Au((n.push(n[0]), n), Cu([n[n.length - 2]].concat(n, [n[1]]), t));
  }
  function Eu(n, t) {
    return n.length < 3 ? xu(n) : n[0] + Au(n, Cu(n, t));
  }
  function Au(n, t) {
    if (t.length < 1 || (n.length != t.length && n.length != t.length + 2))
      return xu(n);
    var e = n.length != t.length,
      r = "",
      i = n[0],
      u = n[1],
      o = t[0],
      a = o,
      l = 1;
    if (
      (e &&
        ((r +=
          "Q" +
          (u[0] - (2 * o[0]) / 3) +
          "," +
          (u[1] - (2 * o[1]) / 3) +
          "," +
          u[0] +
          "," +
          u[1]),
        (i = n[1]),
        (l = 2)),
      t.length > 1)
    ) {
      (a = t[1]),
        (u = n[l]),
        l++,
        (r +=
          "C" +
          (i[0] + o[0]) +
          "," +
          (i[1] + o[1]) +
          "," +
          (u[0] - a[0]) +
          "," +
          (u[1] - a[1]) +
          "," +
          u[0] +
          "," +
          u[1]);
      for (var c = 2; c < t.length; c++, l++)
        (u = n[l]),
          (a = t[c]),
          (r +=
            "S" +
            (u[0] - a[0]) +
            "," +
            (u[1] - a[1]) +
            "," +
            u[0] +
            "," +
            u[1]);
    }
    if (e) {
      var f = n[l];
      r +=
        "Q" +
        (u[0] + (2 * a[0]) / 3) +
        "," +
        (u[1] + (2 * a[1]) / 3) +
        "," +
        f[0] +
        "," +
        f[1];
    }
    return r;
  }
  function Cu(n, t) {
    for (
      var e, r = [], i = (1 - t) / 2, u = n[0], o = n[1], a = 1, l = n.length;
      ++a < l;

    )
      (e = u),
        (u = o),
        (o = n[a]),
        r.push([i * (o[0] - e[0]), i * (o[1] - e[1])]);
    return r;
  }
  function zu(n) {
    if (n.length < 3) return xu(n);
    var t = 1,
      e = n.length,
      r = n[0],
      i = r[0],
      u = r[1],
      o = [i, i, i, (r = n[1])[0]],
      a = [u, u, u, r[1]],
      l = [i, ",", u, "L", Ru(Pl, o), ",", Ru(Pl, a)];
    for (n.push(n[e - 1]); ++t <= e; )
      (r = n[t]), o.shift(), o.push(r[0]), a.shift(), a.push(r[1]), Du(l, o, a);
    return n.pop(), l.push("L", r), l.join("");
  }
  function Lu(n) {
    if (n.length < 4) return xu(n);
    for (var t, e = [], r = -1, i = n.length, u = [0], o = [0]; ++r < 3; )
      (t = n[r]), u.push(t[0]), o.push(t[1]);
    for (e.push(Ru(Pl, u) + "," + Ru(Pl, o)), --r; ++r < i; )
      (t = n[r]), u.shift(), u.push(t[0]), o.shift(), o.push(t[1]), Du(e, u, o);
    return e.join("");
  }
  function qu(n) {
    for (var t, e, r = -1, i = n.length, u = i + 4, o = [], a = []; ++r < 4; )
      (e = n[r % i]), o.push(e[0]), a.push(e[1]);
    for (t = [Ru(Pl, o), ",", Ru(Pl, a)], --r; ++r < u; )
      (e = n[r % i]),
        o.shift(),
        o.push(e[0]),
        a.shift(),
        a.push(e[1]),
        Du(t, o, a);
    return t.join("");
  }
  function Tu(n, t) {
    var e = n.length - 1;
    if (e)
      for (
        var r,
          i,
          u = n[0][0],
          o = n[0][1],
          a = n[e][0] - u,
          l = n[e][1] - o,
          c = -1;
        ++c <= e;

      )
        (r = n[c]),
          (i = c / e),
          (r[0] = t * r[0] + (1 - t) * (u + i * a)),
          (r[1] = t * r[1] + (1 - t) * (o + i * l));
    return zu(n);
  }
  function Ru(n, t) {
    return n[0] * t[0] + n[1] * t[1] + n[2] * t[2] + n[3] * t[3];
  }
  function Du(n, t, e) {
    n.push(
      "C",
      Ru(Rl, t),
      ",",
      Ru(Rl, e),
      ",",
      Ru(Dl, t),
      ",",
      Ru(Dl, e),
      ",",
      Ru(Pl, t),
      ",",
      Ru(Pl, e)
    );
  }
  function Pu(n, t) {
    return (t[1] - n[1]) / (t[0] - n[0]);
  }
  function Uu(n) {
    for (
      var t = 0,
        e = n.length - 1,
        r = [],
        i = n[0],
        u = n[1],
        o = (r[0] = Pu(i, u));
      ++t < e;

    )
      r[t] = (o + (o = Pu((i = u), (u = n[t + 1])))) / 2;
    return (r[t] = o), r;
  }
  function ju(n) {
    for (var t, e, r, i, u = [], o = Uu(n), a = -1, l = n.length - 1; ++a < l; )
      (t = Pu(n[a], n[a + 1])),
        xo(t) < Uo
          ? (o[a] = o[a + 1] = 0)
          : ((e = o[a] / t),
            (r = o[a + 1] / t),
            (i = e * e + r * r),
            i > 9 &&
              ((i = (3 * t) / Math.sqrt(i)),
              (o[a] = i * e),
              (o[a + 1] = i * r)));
    for (a = -1; ++a <= l; )
      (i =
        (n[Math.min(l, a + 1)][0] - n[Math.max(0, a - 1)][0]) /
        (6 * (1 + o[a] * o[a]))),
        u.push([i || 0, o[a] * i || 0]);
    return u;
  }
  function Fu(n) {
    return n.length < 3 ? xu(n) : n[0] + Au(n, ju(n));
  }
  function Hu(n) {
    for (var t, e, r, i = -1, u = n.length; ++i < u; )
      (t = n[i]),
        (e = t[0]),
        (r = t[1] - Io),
        (t[0] = e * Math.cos(r)),
        (t[1] = e * Math.sin(r));
    return n;
  }
  function Ou(n) {
    function t(t) {
      function l() {
        v.push("M", a(n(y), s), f, c(n(d.reverse()), s), "Z");
      }
      for (
        var h,
          p,
          g,
          v = [],
          d = [],
          y = [],
          m = -1,
          M = t.length,
          x = En(e),
          b = En(i),
          _ =
            e === r
              ? function () {
                  return p;
                }
              : En(r),
          w =
            i === u
              ? function () {
                  return g;
                }
              : En(u);
        ++m < M;

      )
        o.call(this, (h = t[m]), m)
          ? (d.push([(p = +x.call(this, h, m)), (g = +b.call(this, h, m))]),
            y.push([+_.call(this, h, m), +w.call(this, h, m)]))
          : d.length && (l(), (d = []), (y = []));
      return d.length && l(), v.length ? v.join("") : null;
    }
    var e = Ce,
      r = Ce,
      i = 0,
      u = ze,
      o = zt,
      a = xu,
      l = a.key,
      c = a,
      f = "L",
      s = 0.7;
    return (
      (t.x = function (n) {
        return arguments.length ? ((e = r = n), t) : r;
      }),
      (t.x0 = function (n) {
        return arguments.length ? ((e = n), t) : e;
      }),
      (t.x1 = function (n) {
        return arguments.length ? ((r = n), t) : r;
      }),
      (t.y = function (n) {
        return arguments.length ? ((i = u = n), t) : u;
      }),
      (t.y0 = function (n) {
        return arguments.length ? ((i = n), t) : i;
      }),
      (t.y1 = function (n) {
        return arguments.length ? ((u = n), t) : u;
      }),
      (t.defined = function (n) {
        return arguments.length ? ((o = n), t) : o;
      }),
      (t.interpolate = function (n) {
        return arguments.length
          ? ((l = "function" == typeof n ? (a = n) : (a = Tl.get(n) || xu).key),
            (c = a.reverse || a),
            (f = a.closed ? "M" : "L"),
            t)
          : l;
      }),
      (t.tension = function (n) {
        return arguments.length ? ((s = n), t) : s;
      }),
      t
    );
  }
  function Iu(n) {
    return n.radius;
  }
  function Yu(n) {
    return [n.x, n.y];
  }
  function Zu(n) {
    return function () {
      var t = n.apply(this, arguments),
        e = t[0],
        r = t[1] - Io;
      return [e * Math.cos(r), e * Math.sin(r)];
    };
  }
  function Vu() {
    return 64;
  }
  function Xu() {
    return "circle";
  }
  function $u(n) {
    var t = Math.sqrt(n / Fo);
    return (
      "M0," +
      t +
      "A" +
      t +
      "," +
      t +
      " 0 1,1 0," +
      -t +
      "A" +
      t +
      "," +
      t +
      " 0 1,1 0," +
      t +
      "Z"
    );
  }
  function Bu(n) {
    return function () {
      var t, e, r;
      (t = this[n]) &&
        (r = t[(e = t.active)]) &&
        ((r.timer.c = null),
        (r.timer.t = NaN),
        --t.count ? delete t[e] : delete this[n],
        (t.active += 0.5),
        r.event && r.event.interrupt.call(this, this.__data__, r.index));
    };
  }
  function Wu(n, t, e) {
    return ko(n, Yl), (n.namespace = t), (n.id = e), n;
  }
  function Ju(n, t, e, r) {
    var i = n.id,
      u = n.namespace;
    return Y(
      n,
      "function" == typeof e
        ? function (n, o, a) {
            n[u][i].tween.set(t, r(e.call(n, n.__data__, o, a)));
          }
        : ((e = r(e)),
          function (n) {
            n[u][i].tween.set(t, e);
          })
    );
  }
  function Gu(n) {
    return (
      null == n && (n = ""),
      function () {
        this.textContent = n;
      }
    );
  }
  function Ku(n) {
    return null == n ? "__transition__" : "__transition_" + n + "__";
  }
  function Qu(n, t, e, r, i) {
    function u(n) {
      var t = v.delay;
      return (f.t = t + l), n >= t ? o(n - t) : void (f.c = o);
    }
    function o(e) {
      var i = g.active,
        u = g[i];
      u &&
        ((u.timer.c = null),
        (u.timer.t = NaN),
        --g.count,
        delete g[i],
        u.event && u.event.interrupt.call(n, n.__data__, u.index));
      for (var o in g)
        if (r > +o) {
          var c = g[o];
          (c.timer.c = null), (c.timer.t = NaN), --g.count, delete g[o];
        }
      (f.c = a),
        qn(
          function () {
            return f.c && a(e || 1) && ((f.c = null), (f.t = NaN)), 1;
          },
          0,
          l
        ),
        (g.active = r),
        v.event && v.event.start.call(n, n.__data__, t),
        (p = []),
        v.tween.forEach(function (e, r) {
          (r = r.call(n, n.__data__, t)) && p.push(r);
        }),
        (h = v.ease),
        (s = v.duration);
    }
    function a(i) {
      for (var u = i / s, o = h(u), a = p.length; a > 0; ) p[--a].call(n, o);
      return u >= 1
        ? (v.event && v.event.end.call(n, n.__data__, t),
          --g.count ? delete g[r] : delete n[e],
          1)
        : void 0;
    }
    var l,
      f,
      s,
      h,
      p,
      g = n[e] || (n[e] = { active: 0, count: 0 }),
      v = g[r];
    v ||
      ((l = i.time),
      (f = qn(u, 0, l)),
      (v = g[r] =
        {
          tween: new c(),
          time: l,
          timer: f,
          delay: i.delay,
          duration: i.duration,
          ease: i.ease,
          index: t,
        }),
      (i = null),
      ++g.count);
  }
  function no(n, t, e) {
    n.attr("transform", function (n) {
      var r = t(n);
      return "translate(" + (isFinite(r) ? r : e(n)) + ",0)";
    });
  }
  function to(n, t, e) {
    n.attr("transform", function (n) {
      var r = t(n);
      return "translate(0," + (isFinite(r) ? r : e(n)) + ")";
    });
  }
  function eo(n) {
    return n.toISOString();
  }
  function ro(n, t, e) {
    function r(t) {
      return n(t);
    }
    function i(n, e) {
      var r = n[1] - n[0],
        i = r / e,
        u = ao.bisect(Kl, i);
      return u == Kl.length
        ? [
            t.year,
            Ki(
              n.map(function (n) {
                return n / 31536e6;
              }),
              e
            )[2],
          ]
        : u
        ? t[i / Kl[u - 1] < Kl[u] / i ? u - 1 : u]
        : [tc, Ki(n, e)[2]];
    }
    return (
      (r.invert = function (t) {
        return io(n.invert(t));
      }),
      (r.domain = function (t) {
        return arguments.length ? (n.domain(t), r) : n.domain().map(io);
      }),
      (r.nice = function (n, t) {
        function e(e) {
          return !isNaN(e) && !n.range(e, io(+e + 1), t).length;
        }
        var u = r.domain(),
          o = Yi(u),
          a = null == n ? i(o, 10) : "number" == typeof n && i(o, n);
        return (
          a && ((n = a[0]), (t = a[1])),
          r.domain(
            Xi(
              u,
              t > 1
                ? {
                    floor: function (t) {
                      for (; e((t = n.floor(t))); ) t = io(t - 1);
                      return t;
                    },
                    ceil: function (t) {
                      for (; e((t = n.ceil(t))); ) t = io(+t + 1);
                      return t;
                    },
                  }
                : n
            )
          )
        );
      }),
      (r.ticks = function (n, t) {
        var e = Yi(r.domain()),
          u =
            null == n
              ? i(e, 10)
              : "number" == typeof n
              ? i(e, n)
              : !n.range && [{ range: n }, t];
        return (
          u && ((n = u[0]), (t = u[1])),
          n.range(e[0], io(+e[1] + 1), 1 > t ? 1 : t)
        );
      }),
      (r.tickFormat = function () {
        return e;
      }),
      (r.copy = function () {
        return ro(n.copy(), t, e);
      }),
      Ji(r, n)
    );
  }
  function io(n) {
    return new Date(n);
  }
  function uo(n) {
    return JSON.parse(n.responseText);
  }
  function oo(n) {
    var t = fo.createRange();
    return t.selectNode(fo.body), t.createContextualFragment(n.responseText);
  }
  var ao = { version: "3.5.17" },
    lo = [].slice,
    co = function (n) {
      return lo.call(n);
    },
    fo = this.document;
  if (fo)
    try {
      co(fo.documentElement.childNodes)[0].nodeType;
    } catch (so) {
      co = function (n) {
        for (var t = n.length, e = new Array(t); t--; ) e[t] = n[t];
        return e;
      };
    }
  if (
    (Date.now ||
      (Date.now = function () {
        return +new Date();
      }),
    fo)
  )
    try {
      fo.createElement("DIV").style.setProperty("opacity", 0, "");
    } catch (ho) {
      var po = this.Element.prototype,
        go = po.setAttribute,
        vo = po.setAttributeNS,
        yo = this.CSSStyleDeclaration.prototype,
        mo = yo.setProperty;
      (po.setAttribute = function (n, t) {
        go.call(this, n, t + "");
      }),
        (po.setAttributeNS = function (n, t, e) {
          vo.call(this, n, t, e + "");
        }),
        (yo.setProperty = function (n, t, e) {
          mo.call(this, n, t + "", e);
        });
    }
  (ao.ascending = e),
    (ao.descending = function (n, t) {
      return n > t ? -1 : t > n ? 1 : t >= n ? 0 : NaN;
    }),
    (ao.min = function (n, t) {
      var e,
        r,
        i = -1,
        u = n.length;
      if (1 === arguments.length) {
        for (; ++i < u; )
          if (null != (r = n[i]) && r >= r) {
            e = r;
            break;
          }
        for (; ++i < u; ) null != (r = n[i]) && e > r && (e = r);
      } else {
        for (; ++i < u; )
          if (null != (r = t.call(n, n[i], i)) && r >= r) {
            e = r;
            break;
          }
        for (; ++i < u; ) null != (r = t.call(n, n[i], i)) && e > r && (e = r);
      }
      return e;
    }),
    (ao.max = function (n, t) {
      var e,
        r,
        i = -1,
        u = n.length;
      if (1 === arguments.length) {
        for (; ++i < u; )
          if (null != (r = n[i]) && r >= r) {
            e = r;
            break;
          }
        for (; ++i < u; ) null != (r = n[i]) && r > e && (e = r);
      } else {
        for (; ++i < u; )
          if (null != (r = t.call(n, n[i], i)) && r >= r) {
            e = r;
            break;
          }
        for (; ++i < u; ) null != (r = t.call(n, n[i], i)) && r > e && (e = r);
      }
      return e;
    }),
    (ao.extent = function (n, t) {
      var e,
        r,
        i,
        u = -1,
        o = n.length;
      if (1 === arguments.length) {
        for (; ++u < o; )
          if (null != (r = n[u]) && r >= r) {
            e = i = r;
            break;
          }
        for (; ++u < o; )
          null != (r = n[u]) && (e > r && (e = r), r > i && (i = r));
      } else {
        for (; ++u < o; )
          if (null != (r = t.call(n, n[u], u)) && r >= r) {
            e = i = r;
            break;
          }
        for (; ++u < o; )
          null != (r = t.call(n, n[u], u)) &&
            (e > r && (e = r), r > i && (i = r));
      }
      return [e, i];
    }),
    (ao.sum = function (n, t) {
      var e,
        r = 0,
        u = n.length,
        o = -1;
      if (1 === arguments.length) for (; ++o < u; ) i((e = +n[o])) && (r += e);
      else for (; ++o < u; ) i((e = +t.call(n, n[o], o))) && (r += e);
      return r;
    }),
    (ao.mean = function (n, t) {
      var e,
        u = 0,
        o = n.length,
        a = -1,
        l = o;
      if (1 === arguments.length)
        for (; ++a < o; ) i((e = r(n[a]))) ? (u += e) : --l;
      else for (; ++a < o; ) i((e = r(t.call(n, n[a], a)))) ? (u += e) : --l;
      return l ? u / l : void 0;
    }),
    (ao.quantile = function (n, t) {
      var e = (n.length - 1) * t + 1,
        r = Math.floor(e),
        i = +n[r - 1],
        u = e - r;
      return u ? i + u * (n[r] - i) : i;
    }),
    (ao.median = function (n, t) {
      var u,
        o = [],
        a = n.length,
        l = -1;
      if (1 === arguments.length)
        for (; ++l < a; ) i((u = r(n[l]))) && o.push(u);
      else for (; ++l < a; ) i((u = r(t.call(n, n[l], l)))) && o.push(u);
      return o.length ? ao.quantile(o.sort(e), 0.5) : void 0;
    }),
    (ao.variance = function (n, t) {
      var e,
        u,
        o = n.length,
        a = 0,
        l = 0,
        c = -1,
        f = 0;
      if (1 === arguments.length)
        for (; ++c < o; )
          i((e = r(n[c]))) && ((u = e - a), (a += u / ++f), (l += u * (e - a)));
      else
        for (; ++c < o; )
          i((e = r(t.call(n, n[c], c)))) &&
            ((u = e - a), (a += u / ++f), (l += u * (e - a)));
      return f > 1 ? l / (f - 1) : void 0;
    }),
    (ao.deviation = function () {
      var n = ao.variance.apply(this, arguments);
      return n ? Math.sqrt(n) : n;
    });
  var Mo = u(e);
  (ao.bisectLeft = Mo.left),
    (ao.bisect = ao.bisectRight = Mo.right),
    (ao.bisector = function (n) {
      return u(
        1 === n.length
          ? function (t, r) {
              return e(n(t), r);
            }
          : n
      );
    }),
    (ao.shuffle = function (n, t, e) {
      (u = arguments.length) < 3 && ((e = n.length), 2 > u && (t = 0));
      for (var r, i, u = e - t; u; )
        (i = (Math.random() * u--) | 0),
          (r = n[u + t]),
          (n[u + t] = n[i + t]),
          (n[i + t] = r);
      return n;
    }),
    (ao.permute = function (n, t) {
      for (var e = t.length, r = new Array(e); e--; ) r[e] = n[t[e]];
      return r;
    }),
    (ao.pairs = function (n) {
      for (
        var t, e = 0, r = n.length - 1, i = n[0], u = new Array(0 > r ? 0 : r);
        r > e;

      )
        u[e] = [(t = i), (i = n[++e])];
      return u;
    }),
    (ao.transpose = function (n) {
      if (!(i = n.length)) return [];
      for (var t = -1, e = ao.min(n, o), r = new Array(e); ++t < e; )
        for (var i, u = -1, a = (r[t] = new Array(i)); ++u < i; )
          a[u] = n[u][t];
      return r;
    }),
    (ao.zip = function () {
      return ao.transpose(arguments);
    }),
    (ao.keys = function (n) {
      var t = [];
      for (var e in n) t.push(e);
      return t;
    }),
    (ao.values = function (n) {
      var t = [];
      for (var e in n) t.push(n[e]);
      return t;
    }),
    (ao.entries = function (n) {
      var t = [];
      for (var e in n) t.push({ key: e, value: n[e] });
      return t;
    }),
    (ao.merge = function (n) {
      for (var t, e, r, i = n.length, u = -1, o = 0; ++u < i; )
        o += n[u].length;
      for (e = new Array(o); --i >= 0; )
        for (r = n[i], t = r.length; --t >= 0; ) e[--o] = r[t];
      return e;
    });
  var xo = Math.abs;
  (ao.range = function (n, t, e) {
    if (
      (arguments.length < 3 &&
        ((e = 1), arguments.length < 2 && ((t = n), (n = 0))),
      (t - n) / e === 1 / 0)
    )
      throw new Error("infinite range");
    var r,
      i = [],
      u = a(xo(e)),
      o = -1;
    if (((n *= u), (t *= u), (e *= u), 0 > e))
      for (; (r = n + e * ++o) > t; ) i.push(r / u);
    else for (; (r = n + e * ++o) < t; ) i.push(r / u);
    return i;
  }),
    (ao.map = function (n, t) {
      var e = new c();
      if (n instanceof c)
        n.forEach(function (n, t) {
          e.set(n, t);
        });
      else if (Array.isArray(n)) {
        var r,
          i = -1,
          u = n.length;
        if (1 === arguments.length) for (; ++i < u; ) e.set(i, n[i]);
        else for (; ++i < u; ) e.set(t.call(n, (r = n[i]), i), r);
      } else for (var o in n) e.set(o, n[o]);
      return e;
    });
  var bo = "__proto__",
    _o = "\x00";
  l(c, {
    has: h,
    get: function (n) {
      return this._[f(n)];
    },
    set: function (n, t) {
      return (this._[f(n)] = t);
    },
    remove: p,
    keys: g,
    values: function () {
      var n = [];
      for (var t in this._) n.push(this._[t]);
      return n;
    },
    entries: function () {
      var n = [];
      for (var t in this._) n.push({ key: s(t), value: this._[t] });
      return n;
    },
    size: v,
    empty: d,
    forEach: function (n) {
      for (var t in this._) n.call(this, s(t), this._[t]);
    },
  }),
    (ao.nest = function () {
      function n(t, o, a) {
        if (a >= u.length) return r ? r.call(i, o) : e ? o.sort(e) : o;
        for (
          var l, f, s, h, p = -1, g = o.length, v = u[a++], d = new c();
          ++p < g;

        )
          (h = d.get((l = v((f = o[p]))))) ? h.push(f) : d.set(l, [f]);
        return (
          t
            ? ((f = t()),
              (s = function (e, r) {
                f.set(e, n(t, r, a));
              }))
            : ((f = {}),
              (s = function (e, r) {
                f[e] = n(t, r, a);
              })),
          d.forEach(s),
          f
        );
      }
      function t(n, e) {
        if (e >= u.length) return n;
        var r = [],
          i = o[e++];
        return (
          n.forEach(function (n, i) {
            r.push({ key: n, values: t(i, e) });
          }),
          i
            ? r.sort(function (n, t) {
                return i(n.key, t.key);
              })
            : r
        );
      }
      var e,
        r,
        i = {},
        u = [],
        o = [];
      return (
        (i.map = function (t, e) {
          return n(e, t, 0);
        }),
        (i.entries = function (e) {
          return t(n(ao.map, e, 0), 0);
        }),
        (i.key = function (n) {
          return u.push(n), i;
        }),
        (i.sortKeys = function (n) {
          return (o[u.length - 1] = n), i;
        }),
        (i.sortValues = function (n) {
          return (e = n), i;
        }),
        (i.rollup = function (n) {
          return (r = n), i;
        }),
        i
      );
    }),
    (ao.set = function (n) {
      var t = new y();
      if (n) for (var e = 0, r = n.length; r > e; ++e) t.add(n[e]);
      return t;
    }),
    l(y, {
      has: h,
      add: function (n) {
        return (this._[f((n += ""))] = !0), n;
      },
      remove: p,
      values: g,
      size: v,
      empty: d,
      forEach: function (n) {
        for (var t in this._) n.call(this, s(t));
      },
    }),
    (ao.behavior = {}),
    (ao.rebind = function (n, t) {
      for (var e, r = 1, i = arguments.length; ++r < i; )
        n[(e = arguments[r])] = M(n, t, t[e]);
      return n;
    });
  var wo = ["webkit", "ms", "moz", "Moz", "o", "O"];
  (ao.dispatch = function () {
    for (var n = new _(), t = -1, e = arguments.length; ++t < e; )
      n[arguments[t]] = w(n);
    return n;
  }),
    (_.prototype.on = function (n, t) {
      var e = n.indexOf("."),
        r = "";
      if ((e >= 0 && ((r = n.slice(e + 1)), (n = n.slice(0, e))), n))
        return arguments.length < 2 ? this[n].on(r) : this[n].on(r, t);
      if (2 === arguments.length) {
        if (null == t)
          for (n in this) this.hasOwnProperty(n) && this[n].on(r, null);
        return this;
      }
    }),
    (ao.event = null),
    (ao.requote = function (n) {
      return n.replace(So, "\\$&");
    });
  var So = /[\\\^\$\*\+\?\|\[\]\(\)\.\{\}]/g,
    ko = {}.__proto__
      ? function (n, t) {
          n.__proto__ = t;
        }
      : function (n, t) {
          for (var e in t) n[e] = t[e];
        },
    No = function (n, t) {
      return t.querySelector(n);
    },
    Eo = function (n, t) {
      return t.querySelectorAll(n);
    },
    Ao = function (n, t) {
      var e = n.matches || n[x(n, "matchesSelector")];
      return (Ao = function (n, t) {
        return e.call(n, t);
      })(n, t);
    };
  "function" == typeof Sizzle &&
    ((No = function (n, t) {
      return Sizzle(n, t)[0] || null;
    }),
    (Eo = Sizzle),
    (Ao = Sizzle.matchesSelector)),
    (ao.selection = function () {
      return ao.select(fo.documentElement);
    });
  var Co = (ao.selection.prototype = []);
  (Co.select = function (n) {
    var t,
      e,
      r,
      i,
      u = [];
    n = A(n);
    for (var o = -1, a = this.length; ++o < a; ) {
      u.push((t = [])), (t.parentNode = (r = this[o]).parentNode);
      for (var l = -1, c = r.length; ++l < c; )
        (i = r[l])
          ? (t.push((e = n.call(i, i.__data__, l, o))),
            e && "__data__" in i && (e.__data__ = i.__data__))
          : t.push(null);
    }
    return E(u);
  }),
    (Co.selectAll = function (n) {
      var t,
        e,
        r = [];
      n = C(n);
      for (var i = -1, u = this.length; ++i < u; )
        for (var o = this[i], a = -1, l = o.length; ++a < l; )
          (e = o[a]) &&
            (r.push((t = co(n.call(e, e.__data__, a, i)))), (t.parentNode = e));
      return E(r);
    });
  var zo = "http://www.w3.org/1999/xhtml",
    Lo = {
      svg: "http://www.w3.org/2000/svg",
      xhtml: zo,
      xlink: "http://www.w3.org/1999/xlink",
      xml: "http://www.w3.org/XML/1998/namespace",
      xmlns: "http://www.w3.org/2000/xmlns/",
    };
  (ao.ns = {
    prefix: Lo,
    qualify: function (n) {
      var t = n.indexOf(":"),
        e = n;
      return (
        t >= 0 && "xmlns" !== (e = n.slice(0, t)) && (n = n.slice(t + 1)),
        Lo.hasOwnProperty(e) ? { space: Lo[e], local: n } : n
      );
    },
  }),
    (Co.attr = function (n, t) {
      if (arguments.length < 2) {
        if ("string" == typeof n) {
          var e = this.node();
          return (
            (n = ao.ns.qualify(n)),
            n.local ? e.getAttributeNS(n.space, n.local) : e.getAttribute(n)
          );
        }
        for (t in n) this.each(z(t, n[t]));
        return this;
      }
      return this.each(z(n, t));
    }),
    (Co.classed = function (n, t) {
      if (arguments.length < 2) {
        if ("string" == typeof n) {
          var e = this.node(),
            r = (n = T(n)).length,
            i = -1;
          if ((t = e.classList)) {
            for (; ++i < r; ) if (!t.contains(n[i])) return !1;
          } else
            for (t = e.getAttribute("class"); ++i < r; )
              if (!q(n[i]).test(t)) return !1;
          return !0;
        }
        for (t in n) this.each(R(t, n[t]));
        return this;
      }
      return this.each(R(n, t));
    }),
    (Co.style = function (n, e, r) {
      var i = arguments.length;
      if (3 > i) {
        if ("string" != typeof n) {
          2 > i && (e = "");
          for (r in n) this.each(P(r, n[r], e));
          return this;
        }
        if (2 > i) {
          var u = this.node();
          return t(u).getComputedStyle(u, null).getPropertyValue(n);
        }
        r = "";
      }
      return this.each(P(n, e, r));
    }),
    (Co.property = function (n, t) {
      if (arguments.length < 2) {
        if ("string" == typeof n) return this.node()[n];
        for (t in n) this.each(U(t, n[t]));
        return this;
      }
      return this.each(U(n, t));
    }),
    (Co.text = function (n) {
      return arguments.length
        ? this.each(
            "function" == typeof n
              ? function () {
                  var t = n.apply(this, arguments);
                  this.textContent = null == t ? "" : t;
                }
              : null == n
              ? function () {
                  this.textContent = "";
                }
              : function () {
                  this.textContent = n;
                }
          )
        : this.node().textContent;
    }),
    (Co.html = function (n) {
      return arguments.length
        ? this.each(
            "function" == typeof n
              ? function () {
                  var t = n.apply(this, arguments);
                  this.innerHTML = null == t ? "" : t;
                }
              : null == n
              ? function () {
                  this.innerHTML = "";
                }
              : function () {
                  this.innerHTML = n;
                }
          )
        : this.node().innerHTML;
    }),
    (Co.append = function (n) {
      return (
        (n = j(n)),
        this.select(function () {
          return this.appendChild(n.apply(this, arguments));
        })
      );
    }),
    (Co.insert = function (n, t) {
      return (
        (n = j(n)),
        (t = A(t)),
        this.select(function () {
          return this.insertBefore(
            n.apply(this, arguments),
            t.apply(this, arguments) || null
          );
        })
      );
    }),
    (Co.remove = function () {
      return this.each(F);
    }),
    (Co.data = function (n, t) {
      function e(n, e) {
        var r,
          i,
          u,
          o = n.length,
          s = e.length,
          h = Math.min(o, s),
          p = new Array(s),
          g = new Array(s),
          v = new Array(o);
        if (t) {
          var d,
            y = new c(),
            m = new Array(o);
          for (r = -1; ++r < o; )
            (i = n[r]) &&
              (y.has((d = t.call(i, i.__data__, r))) ? (v[r] = i) : y.set(d, i),
              (m[r] = d));
          for (r = -1; ++r < s; )
            (i = y.get((d = t.call(e, (u = e[r]), r))))
              ? i !== !0 && ((p[r] = i), (i.__data__ = u))
              : (g[r] = H(u)),
              y.set(d, !0);
          for (r = -1; ++r < o; ) r in m && y.get(m[r]) !== !0 && (v[r] = n[r]);
        } else {
          for (r = -1; ++r < h; )
            (i = n[r]),
              (u = e[r]),
              i ? ((i.__data__ = u), (p[r] = i)) : (g[r] = H(u));
          for (; s > r; ++r) g[r] = H(e[r]);
          for (; o > r; ++r) v[r] = n[r];
        }
        (g.update = p),
          (g.parentNode = p.parentNode = v.parentNode = n.parentNode),
          a.push(g),
          l.push(p),
          f.push(v);
      }
      var r,
        i,
        u = -1,
        o = this.length;
      if (!arguments.length) {
        for (n = new Array((o = (r = this[0]).length)); ++u < o; )
          (i = r[u]) && (n[u] = i.__data__);
        return n;
      }
      var a = Z([]),
        l = E([]),
        f = E([]);
      if ("function" == typeof n)
        for (; ++u < o; ) e((r = this[u]), n.call(r, r.parentNode.__data__, u));
      else for (; ++u < o; ) e((r = this[u]), n);
      return (
        (l.enter = function () {
          return a;
        }),
        (l.exit = function () {
          return f;
        }),
        l
      );
    }),
    (Co.datum = function (n) {
      return arguments.length
        ? this.property("__data__", n)
        : this.property("__data__");
    }),
    (Co.filter = function (n) {
      var t,
        e,
        r,
        i = [];
      "function" != typeof n && (n = O(n));
      for (var u = 0, o = this.length; o > u; u++) {
        i.push((t = [])), (t.parentNode = (e = this[u]).parentNode);
        for (var a = 0, l = e.length; l > a; a++)
          (r = e[a]) && n.call(r, r.__data__, a, u) && t.push(r);
      }
      return E(i);
    }),
    (Co.order = function () {
      for (var n = -1, t = this.length; ++n < t; )
        for (var e, r = this[n], i = r.length - 1, u = r[i]; --i >= 0; )
          (e = r[i]) &&
            (u && u !== e.nextSibling && u.parentNode.insertBefore(e, u),
            (u = e));
      return this;
    }),
    (Co.sort = function (n) {
      n = I.apply(this, arguments);
      for (var t = -1, e = this.length; ++t < e; ) this[t].sort(n);
      return this.order();
    }),
    (Co.each = function (n) {
      return Y(this, function (t, e, r) {
        n.call(t, t.__data__, e, r);
      });
    }),
    (Co.call = function (n) {
      var t = co(arguments);
      return n.apply((t[0] = this), t), this;
    }),
    (Co.empty = function () {
      return !this.node();
    }),
    (Co.node = function () {
      for (var n = 0, t = this.length; t > n; n++)
        for (var e = this[n], r = 0, i = e.length; i > r; r++) {
          var u = e[r];
          if (u) return u;
        }
      return null;
    }),
    (Co.size = function () {
      var n = 0;
      return (
        Y(this, function () {
          ++n;
        }),
        n
      );
    });
  var qo = [];
  (ao.selection.enter = Z),
    (ao.selection.enter.prototype = qo),
    (qo.append = Co.append),
    (qo.empty = Co.empty),
    (qo.node = Co.node),
    (qo.call = Co.call),
    (qo.size = Co.size),
    (qo.select = function (n) {
      for (var t, e, r, i, u, o = [], a = -1, l = this.length; ++a < l; ) {
        (r = (i = this[a]).update),
          o.push((t = [])),
          (t.parentNode = i.parentNode);
        for (var c = -1, f = i.length; ++c < f; )
          (u = i[c])
            ? (t.push((r[c] = e = n.call(i.parentNode, u.__data__, c, a))),
              (e.__data__ = u.__data__))
            : t.push(null);
      }
      return E(o);
    }),
    (qo.insert = function (n, t) {
      return arguments.length < 2 && (t = V(this)), Co.insert.call(this, n, t);
    }),
    (ao.select = function (t) {
      var e;
      return (
        "string" == typeof t
          ? ((e = [No(t, fo)]), (e.parentNode = fo.documentElement))
          : ((e = [t]), (e.parentNode = n(t))),
        E([e])
      );
    }),
    (ao.selectAll = function (n) {
      var t;
      return (
        "string" == typeof n
          ? ((t = co(Eo(n, fo))), (t.parentNode = fo.documentElement))
          : ((t = co(n)), (t.parentNode = null)),
        E([t])
      );
    }),
    (Co.on = function (n, t, e) {
      var r = arguments.length;
      if (3 > r) {
        if ("string" != typeof n) {
          2 > r && (t = !1);
          for (e in n) this.each(X(e, n[e], t));
          return this;
        }
        if (2 > r) return (r = this.node()["__on" + n]) && r._;
        e = !1;
      }
      return this.each(X(n, t, e));
    });
  var To = ao.map({ mouseenter: "mouseover", mouseleave: "mouseout" });
  fo &&
    To.forEach(function (n) {
      "on" + n in fo && To.remove(n);
    });
  var Ro,
    Do = 0;
  ao.mouse = function (n) {
    return J(n, k());
  };
  var Po = this.navigator && /WebKit/.test(this.navigator.userAgent) ? -1 : 0;
  (ao.touch = function (n, t, e) {
    if ((arguments.length < 3 && ((e = t), (t = k().changedTouches)), t))
      for (var r, i = 0, u = t.length; u > i; ++i)
        if ((r = t[i]).identifier === e) return J(n, r);
  }),
    (ao.behavior.drag = function () {
      function n() {
        this.on("mousedown.drag", u).on("touchstart.drag", o);
      }
      function e(n, t, e, u, o) {
        return function () {
          function a() {
            var n,
              e,
              r = t(h, v);
            r &&
              ((n = r[0] - M[0]),
              (e = r[1] - M[1]),
              (g |= n | e),
              (M = r),
              p({
                type: "drag",
                x: r[0] + c[0],
                y: r[1] + c[1],
                dx: n,
                dy: e,
              }));
          }
          function l() {
            t(h, v) &&
              (y.on(u + d, null).on(o + d, null), m(g), p({ type: "dragend" }));
          }
          var c,
            f = this,
            s = ao.event.target.correspondingElement || ao.event.target,
            h = f.parentNode,
            p = r.of(f, arguments),
            g = 0,
            v = n(),
            d = ".drag" + (null == v ? "" : "-" + v),
            y = ao
              .select(e(s))
              .on(u + d, a)
              .on(o + d, l),
            m = W(s),
            M = t(h, v);
          i
            ? ((c = i.apply(f, arguments)), (c = [c.x - M[0], c.y - M[1]]))
            : (c = [0, 0]),
            p({ type: "dragstart" });
        };
      }
      var r = N(n, "drag", "dragstart", "dragend"),
        i = null,
        u = e(b, ao.mouse, t, "mousemove", "mouseup"),
        o = e(G, ao.touch, m, "touchmove", "touchend");
      return (
        (n.origin = function (t) {
          return arguments.length ? ((i = t), n) : i;
        }),
        ao.rebind(n, r, "on")
      );
    }),
    (ao.touches = function (n, t) {
      return (
        arguments.length < 2 && (t = k().touches),
        t
          ? co(t).map(function (t) {
              var e = J(n, t);
              return (e.identifier = t.identifier), e;
            })
          : []
      );
    });
  var Uo = 1e-6,
    jo = Uo * Uo,
    Fo = Math.PI,
    Ho = 2 * Fo,
    Oo = Ho - Uo,
    Io = Fo / 2,
    Yo = Fo / 180,
    Zo = 180 / Fo,
    Vo = Math.SQRT2,
    Xo = 2,
    $o = 4;
  (ao.interpolateZoom = function (n, t) {
    var e,
      r,
      i = n[0],
      u = n[1],
      o = n[2],
      a = t[0],
      l = t[1],
      c = t[2],
      f = a - i,
      s = l - u,
      h = f * f + s * s;
    if (jo > h)
      (r = Math.log(c / o) / Vo),
        (e = function (n) {
          return [i + n * f, u + n * s, o * Math.exp(Vo * n * r)];
        });
    else {
      var p = Math.sqrt(h),
        g = (c * c - o * o + $o * h) / (2 * o * Xo * p),
        v = (c * c - o * o - $o * h) / (2 * c * Xo * p),
        d = Math.log(Math.sqrt(g * g + 1) - g),
        y = Math.log(Math.sqrt(v * v + 1) - v);
      (r = (y - d) / Vo),
        (e = function (n) {
          var t = n * r,
            e = rn(d),
            a = (o / (Xo * p)) * (e * un(Vo * t + d) - en(d));
          return [i + a * f, u + a * s, (o * e) / rn(Vo * t + d)];
        });
    }
    return (e.duration = 1e3 * r), e;
  }),
    (ao.behavior.zoom = function () {
      function n(n) {
        n.on(L, s)
          .on(Wo + ".zoom", p)
          .on("dblclick.zoom", g)
          .on(R, h);
      }
      function e(n) {
        return [(n[0] - k.x) / k.k, (n[1] - k.y) / k.k];
      }
      function r(n) {
        return [n[0] * k.k + k.x, n[1] * k.k + k.y];
      }
      function i(n) {
        k.k = Math.max(A[0], Math.min(A[1], n));
      }
      function u(n, t) {
        (t = r(t)), (k.x += n[0] - t[0]), (k.y += n[1] - t[1]);
      }
      function o(t, e, r, o) {
        (t.__chart__ = { x: k.x, y: k.y, k: k.k }),
          i(Math.pow(2, o)),
          u((d = e), r),
          (t = ao.select(t)),
          C > 0 && (t = t.transition().duration(C)),
          t.call(n.event);
      }
      function a() {
        b &&
          b.domain(
            x
              .range()
              .map(function (n) {
                return (n - k.x) / k.k;
              })
              .map(x.invert)
          ),
          w &&
            w.domain(
              _.range()
                .map(function (n) {
                  return (n - k.y) / k.k;
                })
                .map(_.invert)
            );
      }
      function l(n) {
        z++ || n({ type: "zoomstart" });
      }
      function c(n) {
        a(), n({ type: "zoom", scale: k.k, translate: [k.x, k.y] });
      }
      function f(n) {
        --z || (n({ type: "zoomend" }), (d = null));
      }
      function s() {
        function n() {
          (a = 1), u(ao.mouse(i), h), c(o);
        }
        function r() {
          s.on(q, null).on(T, null), p(a), f(o);
        }
        var i = this,
          o = D.of(i, arguments),
          a = 0,
          s = ao.select(t(i)).on(q, n).on(T, r),
          h = e(ao.mouse(i)),
          p = W(i);
        Il.call(i), l(o);
      }
      function h() {
        function n() {
          var n = ao.touches(g);
          return (
            (p = k.k),
            n.forEach(function (n) {
              n.identifier in d && (d[n.identifier] = e(n));
            }),
            n
          );
        }
        function t() {
          var t = ao.event.target;
          ao.select(t).on(x, r).on(b, a), _.push(t);
          for (var e = ao.event.changedTouches, i = 0, u = e.length; u > i; ++i)
            d[e[i].identifier] = null;
          var l = n(),
            c = Date.now();
          if (1 === l.length) {
            if (500 > c - M) {
              var f = l[0];
              o(
                g,
                f,
                d[f.identifier],
                Math.floor(Math.log(k.k) / Math.LN2) + 1
              ),
                S();
            }
            M = c;
          } else if (l.length > 1) {
            var f = l[0],
              s = l[1],
              h = f[0] - s[0],
              p = f[1] - s[1];
            y = h * h + p * p;
          }
        }
        function r() {
          var n,
            t,
            e,
            r,
            o = ao.touches(g);
          Il.call(g);
          for (var a = 0, l = o.length; l > a; ++a, r = null)
            if (((e = o[a]), (r = d[e.identifier]))) {
              if (t) break;
              (n = e), (t = r);
            }
          if (r) {
            var f = (f = e[0] - n[0]) * f + (f = e[1] - n[1]) * f,
              s = y && Math.sqrt(f / y);
            (n = [(n[0] + e[0]) / 2, (n[1] + e[1]) / 2]),
              (t = [(t[0] + r[0]) / 2, (t[1] + r[1]) / 2]),
              i(s * p);
          }
          (M = null), u(n, t), c(v);
        }
        function a() {
          if (ao.event.touches.length) {
            for (
              var t = ao.event.changedTouches, e = 0, r = t.length;
              r > e;
              ++e
            )
              delete d[t[e].identifier];
            for (var i in d) return void n();
          }
          ao.selectAll(_).on(m, null), w.on(L, s).on(R, h), N(), f(v);
        }
        var p,
          g = this,
          v = D.of(g, arguments),
          d = {},
          y = 0,
          m = ".zoom-" + ao.event.changedTouches[0].identifier,
          x = "touchmove" + m,
          b = "touchend" + m,
          _ = [],
          w = ao.select(g),
          N = W(g);
        t(), l(v), w.on(L, null).on(R, t);
      }
      function p() {
        var n = D.of(this, arguments);
        m
          ? clearTimeout(m)
          : (Il.call(this), (v = e((d = y || ao.mouse(this)))), l(n)),
          (m = setTimeout(function () {
            (m = null), f(n);
          }, 50)),
          S(),
          i(Math.pow(2, 0.002 * Bo()) * k.k),
          u(d, v),
          c(n);
      }
      function g() {
        var n = ao.mouse(this),
          t = Math.log(k.k) / Math.LN2;
        o(
          this,
          n,
          e(n),
          ao.event.shiftKey ? Math.ceil(t) - 1 : Math.floor(t) + 1
        );
      }
      var v,
        d,
        y,
        m,
        M,
        x,
        b,
        _,
        w,
        k = { x: 0, y: 0, k: 1 },
        E = [960, 500],
        A = Jo,
        C = 250,
        z = 0,
        L = "mousedown.zoom",
        q = "mousemove.zoom",
        T = "mouseup.zoom",
        R = "touchstart.zoom",
        D = N(n, "zoomstart", "zoom", "zoomend");
      return (
        Wo ||
          (Wo =
            "onwheel" in fo
              ? ((Bo = function () {
                  return -ao.event.deltaY * (ao.event.deltaMode ? 120 : 1);
                }),
                "wheel")
              : "onmousewheel" in fo
              ? ((Bo = function () {
                  return ao.event.wheelDelta;
                }),
                "mousewheel")
              : ((Bo = function () {
                  return -ao.event.detail;
                }),
                "MozMousePixelScroll")),
        (n.event = function (n) {
          n.each(function () {
            var n = D.of(this, arguments),
              t = k;
            Hl
              ? ao
                  .select(this)
                  .transition()
                  .each("start.zoom", function () {
                    (k = this.__chart__ || { x: 0, y: 0, k: 1 }), l(n);
                  })
                  .tween("zoom:zoom", function () {
                    var e = E[0],
                      r = E[1],
                      i = d ? d[0] : e / 2,
                      u = d ? d[1] : r / 2,
                      o = ao.interpolateZoom(
                        [(i - k.x) / k.k, (u - k.y) / k.k, e / k.k],
                        [(i - t.x) / t.k, (u - t.y) / t.k, e / t.k]
                      );
                    return function (t) {
                      var r = o(t),
                        a = e / r[2];
                      (this.__chart__ = k =
                        { x: i - r[0] * a, y: u - r[1] * a, k: a }),
                        c(n);
                    };
                  })
                  .each("interrupt.zoom", function () {
                    f(n);
                  })
                  .each("end.zoom", function () {
                    f(n);
                  })
              : ((this.__chart__ = k), l(n), c(n), f(n));
          });
        }),
        (n.translate = function (t) {
          return arguments.length
            ? ((k = { x: +t[0], y: +t[1], k: k.k }), a(), n)
            : [k.x, k.y];
        }),
        (n.scale = function (t) {
          return arguments.length
            ? ((k = { x: k.x, y: k.y, k: null }), i(+t), a(), n)
            : k.k;
        }),
        (n.scaleExtent = function (t) {
          return arguments.length
            ? ((A = null == t ? Jo : [+t[0], +t[1]]), n)
            : A;
        }),
        (n.center = function (t) {
          return arguments.length ? ((y = t && [+t[0], +t[1]]), n) : y;
        }),
        (n.size = function (t) {
          return arguments.length ? ((E = t && [+t[0], +t[1]]), n) : E;
        }),
        (n.duration = function (t) {
          return arguments.length ? ((C = +t), n) : C;
        }),
        (n.x = function (t) {
          return arguments.length
            ? ((b = t), (x = t.copy()), (k = { x: 0, y: 0, k: 1 }), n)
            : b;
        }),
        (n.y = function (t) {
          return arguments.length
            ? ((w = t), (_ = t.copy()), (k = { x: 0, y: 0, k: 1 }), n)
            : w;
        }),
        ao.rebind(n, D, "on")
      );
    });
  var Bo,
    Wo,
    Jo = [0, 1 / 0];
  (ao.color = an),
    (an.prototype.toString = function () {
      return this.rgb() + "";
    }),
    (ao.hsl = ln);
  var Go = (ln.prototype = new an());
  (Go.brighter = function (n) {
    return (
      (n = Math.pow(0.7, arguments.length ? n : 1)),
      new ln(this.h, this.s, this.l / n)
    );
  }),
    (Go.darker = function (n) {
      return (
        (n = Math.pow(0.7, arguments.length ? n : 1)),
        new ln(this.h, this.s, n * this.l)
      );
    }),
    (Go.rgb = function () {
      return cn(this.h, this.s, this.l);
    }),
    (ao.hcl = fn);
  var Ko = (fn.prototype = new an());
  (Ko.brighter = function (n) {
    return new fn(
      this.h,
      this.c,
      Math.min(100, this.l + Qo * (arguments.length ? n : 1))
    );
  }),
    (Ko.darker = function (n) {
      return new fn(
        this.h,
        this.c,
        Math.max(0, this.l - Qo * (arguments.length ? n : 1))
      );
    }),
    (Ko.rgb = function () {
      return sn(this.h, this.c, this.l).rgb();
    }),
    (ao.lab = hn);
  var Qo = 18,
    na = 0.95047,
    ta = 1,
    ea = 1.08883,
    ra = (hn.prototype = new an());
  (ra.brighter = function (n) {
    return new hn(
      Math.min(100, this.l + Qo * (arguments.length ? n : 1)),
      this.a,
      this.b
    );
  }),
    (ra.darker = function (n) {
      return new hn(
        Math.max(0, this.l - Qo * (arguments.length ? n : 1)),
        this.a,
        this.b
      );
    }),
    (ra.rgb = function () {
      return pn(this.l, this.a, this.b);
    }),
    (ao.rgb = mn);
  var ia = (mn.prototype = new an());
  (ia.brighter = function (n) {
    n = Math.pow(0.7, arguments.length ? n : 1);
    var t = this.r,
      e = this.g,
      r = this.b,
      i = 30;
    return t || e || r
      ? (t && i > t && (t = i),
        e && i > e && (e = i),
        r && i > r && (r = i),
        new mn(
          Math.min(255, t / n),
          Math.min(255, e / n),
          Math.min(255, r / n)
        ))
      : new mn(i, i, i);
  }),
    (ia.darker = function (n) {
      return (
        (n = Math.pow(0.7, arguments.length ? n : 1)),
        new mn(n * this.r, n * this.g, n * this.b)
      );
    }),
    (ia.hsl = function () {
      return wn(this.r, this.g, this.b);
    }),
    (ia.toString = function () {
      return "#" + bn(this.r) + bn(this.g) + bn(this.b);
    });
  var ua = ao.map({
    aliceblue: 15792383,
    antiquewhite: 16444375,
    aqua: 65535,
    aquamarine: 8388564,
    azure: 15794175,
    beige: 16119260,
    bisque: 16770244,
    black: 0,
    blanchedalmond: 16772045,
    blue: 255,
    blueviolet: 9055202,
    brown: 10824234,
    burlywood: 14596231,
    cadetblue: 6266528,
    chartreuse: 8388352,
    chocolate: 13789470,
    coral: 16744272,
    cornflowerblue: 6591981,
    cornsilk: 16775388,
    crimson: 14423100,
    cyan: 65535,
    darkblue: 139,
    darkcyan: 35723,
    darkgoldenrod: 12092939,
    darkgray: 11119017,
    darkgreen: 25600,
    darkgrey: 11119017,
    darkkhaki: 12433259,
    darkmagenta: 9109643,
    darkolivegreen: 5597999,
    darkorange: 16747520,
    darkorchid: 10040012,
    darkred: 9109504,
    darksalmon: 15308410,
    darkseagreen: 9419919,
    darkslateblue: 4734347,
    darkslategray: 3100495,
    darkslategrey: 3100495,
    darkturquoise: 52945,
    darkviolet: 9699539,
    deeppink: 16716947,
    deepskyblue: 49151,
    dimgray: 6908265,
    dimgrey: 6908265,
    dodgerblue: 2003199,
    firebrick: 11674146,
    floralwhite: 16775920,
    forestgreen: 2263842,
    fuchsia: 16711935,
    gainsboro: 14474460,
    ghostwhite: 16316671,
    gold: 16766720,
    goldenrod: 14329120,
    gray: 8421504,
    green: 32768,
    greenyellow: 11403055,
    grey: 8421504,
    honeydew: 15794160,
    hotpink: 16738740,
    indianred: 13458524,
    indigo: 4915330,
    ivory: 16777200,
    khaki: 15787660,
    lavender: 15132410,
    lavenderblush: 16773365,
    lawngreen: 8190976,
    lemonchiffon: 16775885,
    lightblue: 11393254,
    lightcoral: 15761536,
    lightcyan: 14745599,
    lightgoldenrodyellow: 16448210,
    lightgray: 13882323,
    lightgreen: 9498256,
    lightgrey: 13882323,
    lightpink: 16758465,
    lightsalmon: 16752762,
    lightseagreen: 2142890,
    lightskyblue: 8900346,
    lightslategray: 7833753,
    lightslategrey: 7833753,
    lightsteelblue: 11584734,
    lightyellow: 16777184,
    lime: 65280,
    limegreen: 3329330,
    linen: 16445670,
    magenta: 16711935,
    maroon: 8388608,
    mediumaquamarine: 6737322,
    mediumblue: 205,
    mediumorchid: 12211667,
    mediumpurple: 9662683,
    mediumseagreen: 3978097,
    mediumslateblue: 8087790,
    mediumspringgreen: 64154,
    mediumturquoise: 4772300,
    mediumvioletred: 13047173,
    midnightblue: 1644912,
    mintcream: 16121850,
    mistyrose: 16770273,
    moccasin: 16770229,
    navajowhite: 16768685,
    navy: 128,
    oldlace: 16643558,
    olive: 8421376,
    olivedrab: 7048739,
    orange: 16753920,
    orangered: 16729344,
    orchid: 14315734,
    palegoldenrod: 15657130,
    palegreen: 10025880,
    paleturquoise: 11529966,
    palevioletred: 14381203,
    papayawhip: 16773077,
    peachpuff: 16767673,
    peru: 13468991,
    pink: 16761035,
    plum: 14524637,
    powderblue: 11591910,
    purple: 8388736,
    rebeccapurple: 6697881,
    red: 16711680,
    rosybrown: 12357519,
    royalblue: 4286945,
    saddlebrown: 9127187,
    salmon: 16416882,
    sandybrown: 16032864,
    seagreen: 3050327,
    seashell: 16774638,
    sienna: 10506797,
    silver: 12632256,
    skyblue: 8900331,
    slateblue: 6970061,
    slategray: 7372944,
    slategrey: 7372944,
    snow: 16775930,
    springgreen: 65407,
    steelblue: 4620980,
    tan: 13808780,
    teal: 32896,
    thistle: 14204888,
    tomato: 16737095,
    turquoise: 4251856,
    violet: 15631086,
    wheat: 16113331,
    white: 16777215,
    whitesmoke: 16119285,
    yellow: 16776960,
    yellowgreen: 10145074,
  });
  ua.forEach(function (n, t) {
    ua.set(n, Mn(t));
  }),
    (ao.functor = En),
    (ao.xhr = An(m)),
    (ao.dsv = function (n, t) {
      function e(n, e, u) {
        arguments.length < 3 && ((u = e), (e = null));
        var o = Cn(n, t, null == e ? r : i(e), u);
        return (
          (o.row = function (n) {
            return arguments.length
              ? o.response(null == (e = n) ? r : i(n))
              : e;
          }),
          o
        );
      }
      function r(n) {
        return e.parse(n.responseText);
      }
      function i(n) {
        return function (t) {
          return e.parse(t.responseText, n);
        };
      }
      function u(t) {
        return t.map(o).join(n);
      }
      function o(n) {
        return a.test(n) ? '"' + n.replace(/\"/g, '""') + '"' : n;
      }
      var a = new RegExp('["' + n + "\n]"),
        l = n.charCodeAt(0);
      return (
        (e.parse = function (n, t) {
          var r;
          return e.parseRows(n, function (n, e) {
            if (r) return r(n, e - 1);
            var i = new Function(
              "d",
              "return {" +
                n
                  .map(function (n, t) {
                    return JSON.stringify(n) + ": d[" + t + "]";
                  })
                  .join(",") +
                "}"
            );
            r = t
              ? function (n, e) {
                  return t(i(n), e);
                }
              : i;
          });
        }),
        (e.parseRows = function (n, t) {
          function e() {
            if (f >= c) return o;
            if (i) return (i = !1), u;
            var t = f;
            if (34 === n.charCodeAt(t)) {
              for (var e = t; e++ < c; )
                if (34 === n.charCodeAt(e)) {
                  if (34 !== n.charCodeAt(e + 1)) break;
                  ++e;
                }
              f = e + 2;
              var r = n.charCodeAt(e + 1);
              return (
                13 === r
                  ? ((i = !0), 10 === n.charCodeAt(e + 2) && ++f)
                  : 10 === r && (i = !0),
                n.slice(t + 1, e).replace(/""/g, '"')
              );
            }
            for (; c > f; ) {
              var r = n.charCodeAt(f++),
                a = 1;
              if (10 === r) i = !0;
              else if (13 === r) (i = !0), 10 === n.charCodeAt(f) && (++f, ++a);
              else if (r !== l) continue;
              return n.slice(t, f - a);
            }
            return n.slice(t);
          }
          for (
            var r, i, u = {}, o = {}, a = [], c = n.length, f = 0, s = 0;
            (r = e()) !== o;

          ) {
            for (var h = []; r !== u && r !== o; ) h.push(r), (r = e());
            (t && null == (h = t(h, s++))) || a.push(h);
          }
          return a;
        }),
        (e.format = function (t) {
          if (Array.isArray(t[0])) return e.formatRows(t);
          var r = new y(),
            i = [];
          return (
            t.forEach(function (n) {
              for (var t in n) r.has(t) || i.push(r.add(t));
            }),
            [i.map(o).join(n)]
              .concat(
                t.map(function (t) {
                  return i
                    .map(function (n) {
                      return o(t[n]);
                    })
                    .join(n);
                })
              )
              .join("\n")
          );
        }),
        (e.formatRows = function (n) {
          return n.map(u).join("\n");
        }),
        e
      );
    }),
    (ao.csv = ao.dsv(",", "text/csv")),
    (ao.tsv = ao.dsv("	", "text/tab-separated-values"));
  var oa,
    aa,
    la,
    ca,
    fa =
      this[x(this, "requestAnimationFrame")] ||
      function (n) {
        setTimeout(n, 17);
      };
  (ao.timer = function () {
    qn.apply(this, arguments);
  }),
    (ao.timer.flush = function () {
      Rn(), Dn();
    }),
    (ao.round = function (n, t) {
      return t ? Math.round(n * (t = Math.pow(10, t))) / t : Math.round(n);
    });
  var sa = [
    "y",
    "z",
    "a",
    "f",
    "p",
    "n",
    "\xb5",
    "m",
    "",
    "k",
    "M",
    "G",
    "T",
    "P",
    "E",
    "Z",
    "Y",
  ].map(Un);
  ao.formatPrefix = function (n, t) {
    var e = 0;
    return (
      (n = +n) &&
        (0 > n && (n *= -1),
        t && (n = ao.round(n, Pn(n, t))),
        (e = 1 + Math.floor(1e-12 + Math.log(n) / Math.LN10)),
        (e = Math.max(-24, Math.min(24, 3 * Math.floor((e - 1) / 3))))),
      sa[8 + e / 3]
    );
  };
  var ha =
      /(?:([^{])?([<>=^]))?([+\- ])?([$#])?(0)?(\d+)?(,)?(\.-?\d+)?([a-z%])?/i,
    pa = ao.map({
      b: function (n) {
        return n.toString(2);
      },
      c: function (n) {
        return String.fromCharCode(n);
      },
      o: function (n) {
        return n.toString(8);
      },
      x: function (n) {
        return n.toString(16);
      },
      X: function (n) {
        return n.toString(16).toUpperCase();
      },
      g: function (n, t) {
        return n.toPrecision(t);
      },
      e: function (n, t) {
        return n.toExponential(t);
      },
      f: function (n, t) {
        return n.toFixed(t);
      },
      r: function (n, t) {
        return (n = ao.round(n, Pn(n, t))).toFixed(
          Math.max(0, Math.min(20, Pn(n * (1 + 1e-15), t)))
        );
      },
    }),
    ga = (ao.time = {}),
    va = Date;
  Hn.prototype = {
    getDate: function () {
      return this._.getUTCDate();
    },
    getDay: function () {
      return this._.getUTCDay();
    },
    getFullYear: function () {
      return this._.getUTCFullYear();
    },
    getHours: function () {
      return this._.getUTCHours();
    },
    getMilliseconds: function () {
      return this._.getUTCMilliseconds();
    },
    getMinutes: function () {
      return this._.getUTCMinutes();
    },
    getMonth: function () {
      return this._.getUTCMonth();
    },
    getSeconds: function () {
      return this._.getUTCSeconds();
    },
    getTime: function () {
      return this._.getTime();
    },
    getTimezoneOffset: function () {
      return 0;
    },
    valueOf: function () {
      return this._.valueOf();
    },
    setDate: function () {
      da.setUTCDate.apply(this._, arguments);
    },
    setDay: function () {
      da.setUTCDay.apply(this._, arguments);
    },
    setFullYear: function () {
      da.setUTCFullYear.apply(this._, arguments);
    },
    setHours: function () {
      da.setUTCHours.apply(this._, arguments);
    },
    setMilliseconds: function () {
      da.setUTCMilliseconds.apply(this._, arguments);
    },
    setMinutes: function () {
      da.setUTCMinutes.apply(this._, arguments);
    },
    setMonth: function () {
      da.setUTCMonth.apply(this._, arguments);
    },
    setSeconds: function () {
      da.setUTCSeconds.apply(this._, arguments);
    },
    setTime: function () {
      da.setTime.apply(this._, arguments);
    },
  };
  var da = Date.prototype;
  (ga.year = On(
    function (n) {
      return (n = ga.day(n)), n.setMonth(0, 1), n;
    },
    function (n, t) {
      n.setFullYear(n.getFullYear() + t);
    },
    function (n) {
      return n.getFullYear();
    }
  )),
    (ga.years = ga.year.range),
    (ga.years.utc = ga.year.utc.range),
    (ga.day = On(
      function (n) {
        var t = new va(2e3, 0);
        return t.setFullYear(n.getFullYear(), n.getMonth(), n.getDate()), t;
      },
      function (n, t) {
        n.setDate(n.getDate() + t);
      },
      function (n) {
        return n.getDate() - 1;
      }
    )),
    (ga.days = ga.day.range),
    (ga.days.utc = ga.day.utc.range),
    (ga.dayOfYear = function (n) {
      var t = ga.year(n);
      return Math.floor(
        (n - t - 6e4 * (n.getTimezoneOffset() - t.getTimezoneOffset())) / 864e5
      );
    }),
    [
      "sunday",
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
    ].forEach(function (n, t) {
      t = 7 - t;
      var e = (ga[n] = On(
        function (n) {
          return (
            (n = ga.day(n)).setDate(n.getDate() - ((n.getDay() + t) % 7)), n
          );
        },
        function (n, t) {
          n.setDate(n.getDate() + 7 * Math.floor(t));
        },
        function (n) {
          var e = ga.year(n).getDay();
          return Math.floor((ga.dayOfYear(n) + ((e + t) % 7)) / 7) - (e !== t);
        }
      ));
      (ga[n + "s"] = e.range),
        (ga[n + "s"].utc = e.utc.range),
        (ga[n + "OfYear"] = function (n) {
          var e = ga.year(n).getDay();
          return Math.floor((ga.dayOfYear(n) + ((e + t) % 7)) / 7);
        });
    }),
    (ga.week = ga.sunday),
    (ga.weeks = ga.sunday.range),
    (ga.weeks.utc = ga.sunday.utc.range),
    (ga.weekOfYear = ga.sundayOfYear);
  var ya = { "-": "", _: " ", 0: "0" },
    ma = /^\s*\d+/,
    Ma = /^%/;
  ao.locale = function (n) {
    return { numberFormat: jn(n), timeFormat: Yn(n) };
  };
  var xa = ao.locale({
    decimal: ".",
    thousands: ",",
    grouping: [3],
    currency: ["$", ""],
    dateTime: "%a %b %e %X %Y",
    date: "%m/%d/%Y",
    time: "%H:%M:%S",
    periods: ["AM", "PM"],
    days: [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
    shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    months: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    shortMonths: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
  });
  (ao.format = xa.numberFormat),
    (ao.geo = {}),
    (ft.prototype = {
      s: 0,
      t: 0,
      add: function (n) {
        st(n, this.t, ba),
          st(ba.s, this.s, this),
          this.s ? (this.t += ba.t) : (this.s = ba.t);
      },
      reset: function () {
        this.s = this.t = 0;
      },
      valueOf: function () {
        return this.s;
      },
    });
  var ba = new ft();
  ao.geo.stream = function (n, t) {
    n && _a.hasOwnProperty(n.type) ? _a[n.type](n, t) : ht(n, t);
  };
  var _a = {
      Feature: function (n, t) {
        ht(n.geometry, t);
      },
      FeatureCollection: function (n, t) {
        for (var e = n.features, r = -1, i = e.length; ++r < i; )
          ht(e[r].geometry, t);
      },
    },
    wa = {
      Sphere: function (n, t) {
        t.sphere();
      },
      Point: function (n, t) {
        (n = n.coordinates), t.point(n[0], n[1], n[2]);
      },
      MultiPoint: function (n, t) {
        for (var e = n.coordinates, r = -1, i = e.length; ++r < i; )
          (n = e[r]), t.point(n[0], n[1], n[2]);
      },
      LineString: function (n, t) {
        pt(n.coordinates, t, 0);
      },
      MultiLineString: function (n, t) {
        for (var e = n.coordinates, r = -1, i = e.length; ++r < i; )
          pt(e[r], t, 0);
      },
      Polygon: function (n, t) {
        gt(n.coordinates, t);
      },
      MultiPolygon: function (n, t) {
        for (var e = n.coordinates, r = -1, i = e.length; ++r < i; )
          gt(e[r], t);
      },
      GeometryCollection: function (n, t) {
        for (var e = n.geometries, r = -1, i = e.length; ++r < i; ) ht(e[r], t);
      },
    };
  ao.geo.area = function (n) {
    return (Sa = 0), ao.geo.stream(n, Na), Sa;
  };
  var Sa,
    ka = new ft(),
    Na = {
      sphere: function () {
        Sa += 4 * Fo;
      },
      point: b,
      lineStart: b,
      lineEnd: b,
      polygonStart: function () {
        ka.reset(), (Na.lineStart = vt);
      },
      polygonEnd: function () {
        var n = 2 * ka;
        (Sa += 0 > n ? 4 * Fo + n : n),
          (Na.lineStart = Na.lineEnd = Na.point = b);
      },
    };
  (ao.geo.bounds = (function () {
    function n(n, t) {
      M.push((x = [(f = n), (h = n)])), s > t && (s = t), t > p && (p = t);
    }
    function t(t, e) {
      var r = dt([t * Yo, e * Yo]);
      if (y) {
        var i = mt(y, r),
          u = [i[1], -i[0], 0],
          o = mt(u, i);
        bt(o), (o = _t(o));
        var l = t - g,
          c = l > 0 ? 1 : -1,
          v = o[0] * Zo * c,
          d = xo(l) > 180;
        if (d ^ (v > c * g && c * t > v)) {
          var m = o[1] * Zo;
          m > p && (p = m);
        } else if (
          ((v = ((v + 360) % 360) - 180), d ^ (v > c * g && c * t > v))
        ) {
          var m = -o[1] * Zo;
          s > m && (s = m);
        } else s > e && (s = e), e > p && (p = e);
        d
          ? g > t
            ? a(f, t) > a(f, h) && (h = t)
            : a(t, h) > a(f, h) && (f = t)
          : h >= f
          ? (f > t && (f = t), t > h && (h = t))
          : t > g
          ? a(f, t) > a(f, h) && (h = t)
          : a(t, h) > a(f, h) && (f = t);
      } else n(t, e);
      (y = r), (g = t);
    }
    function e() {
      b.point = t;
    }
    function r() {
      (x[0] = f), (x[1] = h), (b.point = n), (y = null);
    }
    function i(n, e) {
      if (y) {
        var r = n - g;
        m += xo(r) > 180 ? r + (r > 0 ? 360 : -360) : r;
      } else (v = n), (d = e);
      Na.point(n, e), t(n, e);
    }
    function u() {
      Na.lineStart();
    }
    function o() {
      i(v, d),
        Na.lineEnd(),
        xo(m) > Uo && (f = -(h = 180)),
        (x[0] = f),
        (x[1] = h),
        (y = null);
    }
    function a(n, t) {
      return (t -= n) < 0 ? t + 360 : t;
    }
    function l(n, t) {
      return n[0] - t[0];
    }
    function c(n, t) {
      return t[0] <= t[1] ? t[0] <= n && n <= t[1] : n < t[0] || t[1] < n;
    }
    var f,
      s,
      h,
      p,
      g,
      v,
      d,
      y,
      m,
      M,
      x,
      b = {
        point: n,
        lineStart: e,
        lineEnd: r,
        polygonStart: function () {
          (b.point = i),
            (b.lineStart = u),
            (b.lineEnd = o),
            (m = 0),
            Na.polygonStart();
        },
        polygonEnd: function () {
          Na.polygonEnd(),
            (b.point = n),
            (b.lineStart = e),
            (b.lineEnd = r),
            0 > ka
              ? ((f = -(h = 180)), (s = -(p = 90)))
              : m > Uo
              ? (p = 90)
              : -Uo > m && (s = -90),
            (x[0] = f),
            (x[1] = h);
        },
      };
    return function (n) {
      (p = h = -(f = s = 1 / 0)), (M = []), ao.geo.stream(n, b);
      var t = M.length;
      if (t) {
        M.sort(l);
        for (var e, r = 1, i = M[0], u = [i]; t > r; ++r)
          (e = M[r]),
            c(e[0], i) || c(e[1], i)
              ? (a(i[0], e[1]) > a(i[0], i[1]) && (i[1] = e[1]),
                a(e[0], i[1]) > a(i[0], i[1]) && (i[0] = e[0]))
              : u.push((i = e));
        for (
          var o, e, g = -(1 / 0), t = u.length - 1, r = 0, i = u[t];
          t >= r;
          i = e, ++r
        )
          (e = u[r]),
            (o = a(i[1], e[0])) > g && ((g = o), (f = e[0]), (h = i[1]));
      }
      return (
        (M = x = null),
        f === 1 / 0 || s === 1 / 0
          ? [
              [NaN, NaN],
              [NaN, NaN],
            ]
          : [
              [f, s],
              [h, p],
            ]
      );
    };
  })()),
    (ao.geo.centroid = function (n) {
      (Ea = Aa = Ca = za = La = qa = Ta = Ra = Da = Pa = Ua = 0),
        ao.geo.stream(n, ja);
      var t = Da,
        e = Pa,
        r = Ua,
        i = t * t + e * e + r * r;
      return jo > i &&
        ((t = qa),
        (e = Ta),
        (r = Ra),
        Uo > Aa && ((t = Ca), (e = za), (r = La)),
        (i = t * t + e * e + r * r),
        jo > i)
        ? [NaN, NaN]
        : [Math.atan2(e, t) * Zo, tn(r / Math.sqrt(i)) * Zo];
    });
  var Ea,
    Aa,
    Ca,
    za,
    La,
    qa,
    Ta,
    Ra,
    Da,
    Pa,
    Ua,
    ja = {
      sphere: b,
      point: St,
      lineStart: Nt,
      lineEnd: Et,
      polygonStart: function () {
        ja.lineStart = At;
      },
      polygonEnd: function () {
        ja.lineStart = Nt;
      },
    },
    Fa = Rt(zt, jt, Ht, [-Fo, -Fo / 2]),
    Ha = 1e9;
  (ao.geo.clipExtent = function () {
    var n,
      t,
      e,
      r,
      i,
      u,
      o = {
        stream: function (n) {
          return i && (i.valid = !1), (i = u(n)), (i.valid = !0), i;
        },
        extent: function (a) {
          return arguments.length
            ? ((u = Zt(
                (n = +a[0][0]),
                (t = +a[0][1]),
                (e = +a[1][0]),
                (r = +a[1][1])
              )),
              i && ((i.valid = !1), (i = null)),
              o)
            : [
                [n, t],
                [e, r],
              ];
        },
      };
    return o.extent([
      [0, 0],
      [960, 500],
    ]);
  }),
    ((ao.geo.conicEqualArea = function () {
      return Vt(Xt);
    }).raw = Xt),
    (ao.geo.albers = function () {
      return ao.geo
        .conicEqualArea()
        .rotate([96, 0])
        .center([-0.6, 38.7])
        .parallels([29.5, 45.5])
        .scale(1070);
    }),
    (ao.geo.albersUsa = function () {
      function n(n) {
        var u = n[0],
          o = n[1];
        return (t = null), e(u, o), t || (r(u, o), t) || i(u, o), t;
      }
      var t,
        e,
        r,
        i,
        u = ao.geo.albers(),
        o = ao.geo
          .conicEqualArea()
          .rotate([154, 0])
          .center([-2, 58.5])
          .parallels([55, 65]),
        a = ao.geo
          .conicEqualArea()
          .rotate([157, 0])
          .center([-3, 19.9])
          .parallels([8, 18]),
        l = {
          point: function (n, e) {
            t = [n, e];
          },
        };
      return (
        (n.invert = function (n) {
          var t = u.scale(),
            e = u.translate(),
            r = (n[0] - e[0]) / t,
            i = (n[1] - e[1]) / t;
          return (
            i >= 0.12 && 0.234 > i && r >= -0.425 && -0.214 > r
              ? o
              : i >= 0.166 && 0.234 > i && r >= -0.214 && -0.115 > r
              ? a
              : u
          ).invert(n);
        }),
        (n.stream = function (n) {
          var t = u.stream(n),
            e = o.stream(n),
            r = a.stream(n);
          return {
            point: function (n, i) {
              t.point(n, i), e.point(n, i), r.point(n, i);
            },
            sphere: function () {
              t.sphere(), e.sphere(), r.sphere();
            },
            lineStart: function () {
              t.lineStart(), e.lineStart(), r.lineStart();
            },
            lineEnd: function () {
              t.lineEnd(), e.lineEnd(), r.lineEnd();
            },
            polygonStart: function () {
              t.polygonStart(), e.polygonStart(), r.polygonStart();
            },
            polygonEnd: function () {
              t.polygonEnd(), e.polygonEnd(), r.polygonEnd();
            },
          };
        }),
        (n.precision = function (t) {
          return arguments.length
            ? (u.precision(t), o.precision(t), a.precision(t), n)
            : u.precision();
        }),
        (n.scale = function (t) {
          return arguments.length
            ? (u.scale(t),
              o.scale(0.35 * t),
              a.scale(t),
              n.translate(u.translate()))
            : u.scale();
        }),
        (n.translate = function (t) {
          if (!arguments.length) return u.translate();
          var c = u.scale(),
            f = +t[0],
            s = +t[1];
          return (
            (e = u
              .translate(t)
              .clipExtent([
                [f - 0.455 * c, s - 0.238 * c],
                [f + 0.455 * c, s + 0.238 * c],
              ])
              .stream(l).point),
            (r = o
              .translate([f - 0.307 * c, s + 0.201 * c])
              .clipExtent([
                [f - 0.425 * c + Uo, s + 0.12 * c + Uo],
                [f - 0.214 * c - Uo, s + 0.234 * c - Uo],
              ])
              .stream(l).point),
            (i = a
              .translate([f - 0.205 * c, s + 0.212 * c])
              .clipExtent([
                [f - 0.214 * c + Uo, s + 0.166 * c + Uo],
                [f - 0.115 * c - Uo, s + 0.234 * c - Uo],
              ])
              .stream(l).point),
            n
          );
        }),
        n.scale(1070)
      );
    });
  var Oa,
    Ia,
    Ya,
    Za,
    Va,
    Xa,
    $a = {
      point: b,
      lineStart: b,
      lineEnd: b,
      polygonStart: function () {
        (Ia = 0), ($a.lineStart = $t);
      },
      polygonEnd: function () {
        ($a.lineStart = $a.lineEnd = $a.point = b), (Oa += xo(Ia / 2));
      },
    },
    Ba = {
      point: Bt,
      lineStart: b,
      lineEnd: b,
      polygonStart: b,
      polygonEnd: b,
    },
    Wa = {
      point: Gt,
      lineStart: Kt,
      lineEnd: Qt,
      polygonStart: function () {
        Wa.lineStart = ne;
      },
      polygonEnd: function () {
        (Wa.point = Gt), (Wa.lineStart = Kt), (Wa.lineEnd = Qt);
      },
    };
  (ao.geo.path = function () {
    function n(n) {
      return (
        n &&
          ("function" == typeof a && u.pointRadius(+a.apply(this, arguments)),
          (o && o.valid) || (o = i(u)),
          ao.geo.stream(n, o)),
        u.result()
      );
    }
    function t() {
      return (o = null), n;
    }
    var e,
      r,
      i,
      u,
      o,
      a = 4.5;
    return (
      (n.area = function (n) {
        return (Oa = 0), ao.geo.stream(n, i($a)), Oa;
      }),
      (n.centroid = function (n) {
        return (
          (Ca = za = La = qa = Ta = Ra = Da = Pa = Ua = 0),
          ao.geo.stream(n, i(Wa)),
          Ua
            ? [Da / Ua, Pa / Ua]
            : Ra
            ? [qa / Ra, Ta / Ra]
            : La
            ? [Ca / La, za / La]
            : [NaN, NaN]
        );
      }),
      (n.bounds = function (n) {
        return (
          (Va = Xa = -(Ya = Za = 1 / 0)),
          ao.geo.stream(n, i(Ba)),
          [
            [Ya, Za],
            [Va, Xa],
          ]
        );
      }),
      (n.projection = function (n) {
        return arguments.length
          ? ((i = (e = n) ? n.stream || re(n) : m), t())
          : e;
      }),
      (n.context = function (n) {
        return arguments.length
          ? ((u = null == (r = n) ? new Wt() : new te(n)),
            "function" != typeof a && u.pointRadius(a),
            t())
          : r;
      }),
      (n.pointRadius = function (t) {
        return arguments.length
          ? ((a = "function" == typeof t ? t : (u.pointRadius(+t), +t)), n)
          : a;
      }),
      n.projection(ao.geo.albersUsa()).context(null)
    );
  }),
    (ao.geo.transform = function (n) {
      return {
        stream: function (t) {
          var e = new ie(t);
          for (var r in n) e[r] = n[r];
          return e;
        },
      };
    }),
    (ie.prototype = {
      point: function (n, t) {
        this.stream.point(n, t);
      },
      sphere: function () {
        this.stream.sphere();
      },
      lineStart: function () {
        this.stream.lineStart();
      },
      lineEnd: function () {
        this.stream.lineEnd();
      },
      polygonStart: function () {
        this.stream.polygonStart();
      },
      polygonEnd: function () {
        this.stream.polygonEnd();
      },
    }),
    (ao.geo.projection = oe),
    (ao.geo.projectionMutator = ae),
    ((ao.geo.equirectangular = function () {
      return oe(ce);
    }).raw = ce.invert =
      ce),
    (ao.geo.rotation = function (n) {
      function t(t) {
        return (t = n(t[0] * Yo, t[1] * Yo)), (t[0] *= Zo), (t[1] *= Zo), t;
      }
      return (
        (n = se((n[0] % 360) * Yo, n[1] * Yo, n.length > 2 ? n[2] * Yo : 0)),
        (t.invert = function (t) {
          return (
            (t = n.invert(t[0] * Yo, t[1] * Yo)), (t[0] *= Zo), (t[1] *= Zo), t
          );
        }),
        t
      );
    }),
    (fe.invert = ce),
    (ao.geo.circle = function () {
      function n() {
        var n = "function" == typeof r ? r.apply(this, arguments) : r,
          t = se(-n[0] * Yo, -n[1] * Yo, 0).invert,
          i = [];
        return (
          e(null, null, 1, {
            point: function (n, e) {
              i.push((n = t(n, e))), (n[0] *= Zo), (n[1] *= Zo);
            },
          }),
          { type: "Polygon", coordinates: [i] }
        );
      }
      var t,
        e,
        r = [0, 0],
        i = 6;
      return (
        (n.origin = function (t) {
          return arguments.length ? ((r = t), n) : r;
        }),
        (n.angle = function (r) {
          return arguments.length ? ((e = ve((t = +r) * Yo, i * Yo)), n) : t;
        }),
        (n.precision = function (r) {
          return arguments.length ? ((e = ve(t * Yo, (i = +r) * Yo)), n) : i;
        }),
        n.angle(90)
      );
    }),
    (ao.geo.distance = function (n, t) {
      var e,
        r = (t[0] - n[0]) * Yo,
        i = n[1] * Yo,
        u = t[1] * Yo,
        o = Math.sin(r),
        a = Math.cos(r),
        l = Math.sin(i),
        c = Math.cos(i),
        f = Math.sin(u),
        s = Math.cos(u);
      return Math.atan2(
        Math.sqrt((e = s * o) * e + (e = c * f - l * s * a) * e),
        l * f + c * s * a
      );
    }),
    (ao.geo.graticule = function () {
      function n() {
        return { type: "MultiLineString", coordinates: t() };
      }
      function t() {
        return ao
          .range(Math.ceil(u / d) * d, i, d)
          .map(h)
          .concat(ao.range(Math.ceil(c / y) * y, l, y).map(p))
          .concat(
            ao
              .range(Math.ceil(r / g) * g, e, g)
              .filter(function (n) {
                return xo(n % d) > Uo;
              })
              .map(f)
          )
          .concat(
            ao
              .range(Math.ceil(a / v) * v, o, v)
              .filter(function (n) {
                return xo(n % y) > Uo;
              })
              .map(s)
          );
      }
      var e,
        r,
        i,
        u,
        o,
        a,
        l,
        c,
        f,
        s,
        h,
        p,
        g = 10,
        v = g,
        d = 90,
        y = 360,
        m = 2.5;
      return (
        (n.lines = function () {
          return t().map(function (n) {
            return { type: "LineString", coordinates: n };
          });
        }),
        (n.outline = function () {
          return {
            type: "Polygon",
            coordinates: [
              h(u).concat(
                p(l).slice(1),
                h(i).reverse().slice(1),
                p(c).reverse().slice(1)
              ),
            ],
          };
        }),
        (n.extent = function (t) {
          return arguments.length
            ? n.majorExtent(t).minorExtent(t)
            : n.minorExtent();
        }),
        (n.majorExtent = function (t) {
          return arguments.length
            ? ((u = +t[0][0]),
              (i = +t[1][0]),
              (c = +t[0][1]),
              (l = +t[1][1]),
              u > i && ((t = u), (u = i), (i = t)),
              c > l && ((t = c), (c = l), (l = t)),
              n.precision(m))
            : [
                [u, c],
                [i, l],
              ];
        }),
        (n.minorExtent = function (t) {
          return arguments.length
            ? ((r = +t[0][0]),
              (e = +t[1][0]),
              (a = +t[0][1]),
              (o = +t[1][1]),
              r > e && ((t = r), (r = e), (e = t)),
              a > o && ((t = a), (a = o), (o = t)),
              n.precision(m))
            : [
                [r, a],
                [e, o],
              ];
        }),
        (n.step = function (t) {
          return arguments.length ? n.majorStep(t).minorStep(t) : n.minorStep();
        }),
        (n.majorStep = function (t) {
          return arguments.length ? ((d = +t[0]), (y = +t[1]), n) : [d, y];
        }),
        (n.minorStep = function (t) {
          return arguments.length ? ((g = +t[0]), (v = +t[1]), n) : [g, v];
        }),
        (n.precision = function (t) {
          return arguments.length
            ? ((m = +t),
              (f = ye(a, o, 90)),
              (s = me(r, e, m)),
              (h = ye(c, l, 90)),
              (p = me(u, i, m)),
              n)
            : m;
        }),
        n
          .majorExtent([
            [-180, -90 + Uo],
            [180, 90 - Uo],
          ])
          .minorExtent([
            [-180, -80 - Uo],
            [180, 80 + Uo],
          ])
      );
    }),
    (ao.geo.greatArc = function () {
      function n() {
        return {
          type: "LineString",
          coordinates: [
            t || r.apply(this, arguments),
            e || i.apply(this, arguments),
          ],
        };
      }
      var t,
        e,
        r = Me,
        i = xe;
      return (
        (n.distance = function () {
          return ao.geo.distance(
            t || r.apply(this, arguments),
            e || i.apply(this, arguments)
          );
        }),
        (n.source = function (e) {
          return arguments.length
            ? ((r = e), (t = "function" == typeof e ? null : e), n)
            : r;
        }),
        (n.target = function (t) {
          return arguments.length
            ? ((i = t), (e = "function" == typeof t ? null : t), n)
            : i;
        }),
        (n.precision = function () {
          return arguments.length ? n : 0;
        }),
        n
      );
    }),
    (ao.geo.interpolate = function (n, t) {
      return be(n[0] * Yo, n[1] * Yo, t[0] * Yo, t[1] * Yo);
    }),
    (ao.geo.length = function (n) {
      return (Ja = 0), ao.geo.stream(n, Ga), Ja;
    });
  var Ja,
    Ga = {
      sphere: b,
      point: b,
      lineStart: _e,
      lineEnd: b,
      polygonStart: b,
      polygonEnd: b,
    },
    Ka = we(
      function (n) {
        return Math.sqrt(2 / (1 + n));
      },
      function (n) {
        return 2 * Math.asin(n / 2);
      }
    );
  (ao.geo.azimuthalEqualArea = function () {
    return oe(Ka);
  }).raw = Ka;
  var Qa = we(function (n) {
    var t = Math.acos(n);
    return t && t / Math.sin(t);
  }, m);
  ((ao.geo.azimuthalEquidistant = function () {
    return oe(Qa);
  }).raw = Qa),
    ((ao.geo.conicConformal = function () {
      return Vt(Se);
    }).raw = Se),
    ((ao.geo.conicEquidistant = function () {
      return Vt(ke);
    }).raw = ke);
  var nl = we(function (n) {
    return 1 / n;
  }, Math.atan);
  ((ao.geo.gnomonic = function () {
    return oe(nl);
  }).raw = nl),
    (Ne.invert = function (n, t) {
      return [n, 2 * Math.atan(Math.exp(t)) - Io];
    }),
    ((ao.geo.mercator = function () {
      return Ee(Ne);
    }).raw = Ne);
  var tl = we(function () {
    return 1;
  }, Math.asin);
  (ao.geo.orthographic = function () {
    return oe(tl);
  }).raw = tl;
  var el = we(
    function (n) {
      return 1 / (1 + n);
    },
    function (n) {
      return 2 * Math.atan(n);
    }
  );
  ((ao.geo.stereographic = function () {
    return oe(el);
  }).raw = el),
    (Ae.invert = function (n, t) {
      return [-t, 2 * Math.atan(Math.exp(n)) - Io];
    }),
    ((ao.geo.transverseMercator = function () {
      var n = Ee(Ae),
        t = n.center,
        e = n.rotate;
      return (
        (n.center = function (n) {
          return n ? t([-n[1], n[0]]) : ((n = t()), [n[1], -n[0]]);
        }),
        (n.rotate = function (n) {
          return n
            ? e([n[0], n[1], n.length > 2 ? n[2] + 90 : 90])
            : ((n = e()), [n[0], n[1], n[2] - 90]);
        }),
        e([0, 0, 90])
      );
    }).raw = Ae),
    (ao.geom = {}),
    (ao.geom.hull = function (n) {
      function t(n) {
        if (n.length < 3) return [];
        var t,
          i = En(e),
          u = En(r),
          o = n.length,
          a = [],
          l = [];
        for (t = 0; o > t; t++)
          a.push([+i.call(this, n[t], t), +u.call(this, n[t], t), t]);
        for (a.sort(qe), t = 0; o > t; t++) l.push([a[t][0], -a[t][1]]);
        var c = Le(a),
          f = Le(l),
          s = f[0] === c[0],
          h = f[f.length - 1] === c[c.length - 1],
          p = [];
        for (t = c.length - 1; t >= 0; --t) p.push(n[a[c[t]][2]]);
        for (t = +s; t < f.length - h; ++t) p.push(n[a[f[t]][2]]);
        return p;
      }
      var e = Ce,
        r = ze;
      return arguments.length
        ? t(n)
        : ((t.x = function (n) {
            return arguments.length ? ((e = n), t) : e;
          }),
          (t.y = function (n) {
            return arguments.length ? ((r = n), t) : r;
          }),
          t);
    }),
    (ao.geom.polygon = function (n) {
      return ko(n, rl), n;
    });
  var rl = (ao.geom.polygon.prototype = []);
  (rl.area = function () {
    for (var n, t = -1, e = this.length, r = this[e - 1], i = 0; ++t < e; )
      (n = r), (r = this[t]), (i += n[1] * r[0] - n[0] * r[1]);
    return 0.5 * i;
  }),
    (rl.centroid = function (n) {
      var t,
        e,
        r = -1,
        i = this.length,
        u = 0,
        o = 0,
        a = this[i - 1];
      for (arguments.length || (n = -1 / (6 * this.area())); ++r < i; )
        (t = a),
          (a = this[r]),
          (e = t[0] * a[1] - a[0] * t[1]),
          (u += (t[0] + a[0]) * e),
          (o += (t[1] + a[1]) * e);
      return [u * n, o * n];
    }),
    (rl.clip = function (n) {
      for (
        var t,
          e,
          r,
          i,
          u,
          o,
          a = De(n),
          l = -1,
          c = this.length - De(this),
          f = this[c - 1];
        ++l < c;

      ) {
        for (
          t = n.slice(),
            n.length = 0,
            i = this[l],
            u = t[(r = t.length - a) - 1],
            e = -1;
          ++e < r;

        )
          (o = t[e]),
            Te(o, f, i)
              ? (Te(u, f, i) || n.push(Re(u, o, f, i)), n.push(o))
              : Te(u, f, i) && n.push(Re(u, o, f, i)),
            (u = o);
        a && n.push(n[0]), (f = i);
      }
      return n;
    });
  var il,
    ul,
    ol,
    al,
    ll,
    cl = [],
    fl = [];
  (Ye.prototype.prepare = function () {
    for (var n, t = this.edges, e = t.length; e--; )
      (n = t[e].edge), (n.b && n.a) || t.splice(e, 1);
    return t.sort(Ve), t.length;
  }),
    (tr.prototype = {
      start: function () {
        return this.edge.l === this.site ? this.edge.a : this.edge.b;
      },
      end: function () {
        return this.edge.l === this.site ? this.edge.b : this.edge.a;
      },
    }),
    (er.prototype = {
      insert: function (n, t) {
        var e, r, i;
        if (n) {
          if (((t.P = n), (t.N = n.N), n.N && (n.N.P = t), (n.N = t), n.R)) {
            for (n = n.R; n.L; ) n = n.L;
            n.L = t;
          } else n.R = t;
          e = n;
        } else
          this._
            ? ((n = or(this._)),
              (t.P = null),
              (t.N = n),
              (n.P = n.L = t),
              (e = n))
            : ((t.P = t.N = null), (this._ = t), (e = null));
        for (t.L = t.R = null, t.U = e, t.C = !0, n = t; e && e.C; )
          (r = e.U),
            e === r.L
              ? ((i = r.R),
                i && i.C
                  ? ((e.C = i.C = !1), (r.C = !0), (n = r))
                  : (n === e.R && (ir(this, e), (n = e), (e = n.U)),
                    (e.C = !1),
                    (r.C = !0),
                    ur(this, r)))
              : ((i = r.L),
                i && i.C
                  ? ((e.C = i.C = !1), (r.C = !0), (n = r))
                  : (n === e.L && (ur(this, e), (n = e), (e = n.U)),
                    (e.C = !1),
                    (r.C = !0),
                    ir(this, r))),
            (e = n.U);
        this._.C = !1;
      },
      remove: function (n) {
        n.N && (n.N.P = n.P), n.P && (n.P.N = n.N), (n.N = n.P = null);
        var t,
          e,
          r,
          i = n.U,
          u = n.L,
          o = n.R;
        if (
          ((e = u ? (o ? or(o) : u) : o),
          i ? (i.L === n ? (i.L = e) : (i.R = e)) : (this._ = e),
          u && o
            ? ((r = e.C),
              (e.C = n.C),
              (e.L = u),
              (u.U = e),
              e !== o
                ? ((i = e.U),
                  (e.U = n.U),
                  (n = e.R),
                  (i.L = n),
                  (e.R = o),
                  (o.U = e))
                : ((e.U = i), (i = e), (n = e.R)))
            : ((r = n.C), (n = e)),
          n && (n.U = i),
          !r)
        ) {
          if (n && n.C) return void (n.C = !1);
          do {
            if (n === this._) break;
            if (n === i.L) {
              if (
                ((t = i.R),
                t.C && ((t.C = !1), (i.C = !0), ir(this, i), (t = i.R)),
                (t.L && t.L.C) || (t.R && t.R.C))
              ) {
                (t.R && t.R.C) ||
                  ((t.L.C = !1), (t.C = !0), ur(this, t), (t = i.R)),
                  (t.C = i.C),
                  (i.C = t.R.C = !1),
                  ir(this, i),
                  (n = this._);
                break;
              }
            } else if (
              ((t = i.L),
              t.C && ((t.C = !1), (i.C = !0), ur(this, i), (t = i.L)),
              (t.L && t.L.C) || (t.R && t.R.C))
            ) {
              (t.L && t.L.C) ||
                ((t.R.C = !1), (t.C = !0), ir(this, t), (t = i.L)),
                (t.C = i.C),
                (i.C = t.L.C = !1),
                ur(this, i),
                (n = this._);
              break;
            }
            (t.C = !0), (n = i), (i = i.U);
          } while (!n.C);
          n && (n.C = !1);
        }
      },
    }),
    (ao.geom.voronoi = function (n) {
      function t(n) {
        var t = new Array(n.length),
          r = a[0][0],
          i = a[0][1],
          u = a[1][0],
          o = a[1][1];
        return (
          ar(e(n), a).cells.forEach(function (e, a) {
            var l = e.edges,
              c = e.site,
              f = (t[a] = l.length
                ? l.map(function (n) {
                    var t = n.start();
                    return [t.x, t.y];
                  })
                : c.x >= r && c.x <= u && c.y >= i && c.y <= o
                ? [
                    [r, o],
                    [u, o],
                    [u, i],
                    [r, i],
                  ]
                : []);
            f.point = n[a];
          }),
          t
        );
      }
      function e(n) {
        return n.map(function (n, t) {
          return {
            x: Math.round(u(n, t) / Uo) * Uo,
            y: Math.round(o(n, t) / Uo) * Uo,
            i: t,
          };
        });
      }
      var r = Ce,
        i = ze,
        u = r,
        o = i,
        a = sl;
      return n
        ? t(n)
        : ((t.links = function (n) {
            return ar(e(n))
              .edges.filter(function (n) {
                return n.l && n.r;
              })
              .map(function (t) {
                return { source: n[t.l.i], target: n[t.r.i] };
              });
          }),
          (t.triangles = function (n) {
            var t = [];
            return (
              ar(e(n)).cells.forEach(function (e, r) {
                for (
                  var i,
                    u,
                    o = e.site,
                    a = e.edges.sort(Ve),
                    l = -1,
                    c = a.length,
                    f = a[c - 1].edge,
                    s = f.l === o ? f.r : f.l;
                  ++l < c;

                )
                  (i = f),
                    (u = s),
                    (f = a[l].edge),
                    (s = f.l === o ? f.r : f.l),
                    r < u.i &&
                      r < s.i &&
                      cr(o, u, s) < 0 &&
                      t.push([n[r], n[u.i], n[s.i]]);
              }),
              t
            );
          }),
          (t.x = function (n) {
            return arguments.length ? ((u = En((r = n))), t) : r;
          }),
          (t.y = function (n) {
            return arguments.length ? ((o = En((i = n))), t) : i;
          }),
          (t.clipExtent = function (n) {
            return arguments.length
              ? ((a = null == n ? sl : n), t)
              : a === sl
              ? null
              : a;
          }),
          (t.size = function (n) {
            return arguments.length
              ? t.clipExtent(n && [[0, 0], n])
              : a === sl
              ? null
              : a && a[1];
          }),
          t);
    });
  var sl = [
    [-1e6, -1e6],
    [1e6, 1e6],
  ];
  (ao.geom.delaunay = function (n) {
    return ao.geom.voronoi().triangles(n);
  }),
    (ao.geom.quadtree = function (n, t, e, r, i) {
      function u(n) {
        function u(n, t, e, r, i, u, o, a) {
          if (!isNaN(e) && !isNaN(r))
            if (n.leaf) {
              var l = n.x,
                f = n.y;
              if (null != l)
                if (xo(l - e) + xo(f - r) < 0.01) c(n, t, e, r, i, u, o, a);
                else {
                  var s = n.point;
                  (n.x = n.y = n.point = null),
                    c(n, s, l, f, i, u, o, a),
                    c(n, t, e, r, i, u, o, a);
                }
              else (n.x = e), (n.y = r), (n.point = t);
            } else c(n, t, e, r, i, u, o, a);
        }
        function c(n, t, e, r, i, o, a, l) {
          var c = 0.5 * (i + a),
            f = 0.5 * (o + l),
            s = e >= c,
            h = r >= f,
            p = (h << 1) | s;
          (n.leaf = !1),
            (n = n.nodes[p] || (n.nodes[p] = hr())),
            s ? (i = c) : (a = c),
            h ? (o = f) : (l = f),
            u(n, t, e, r, i, o, a, l);
        }
        var f,
          s,
          h,
          p,
          g,
          v,
          d,
          y,
          m,
          M = En(a),
          x = En(l);
        if (null != t) (v = t), (d = e), (y = r), (m = i);
        else if (
          ((y = m = -(v = d = 1 / 0)), (s = []), (h = []), (g = n.length), o)
        )
          for (p = 0; g > p; ++p)
            (f = n[p]),
              f.x < v && (v = f.x),
              f.y < d && (d = f.y),
              f.x > y && (y = f.x),
              f.y > m && (m = f.y),
              s.push(f.x),
              h.push(f.y);
        else
          for (p = 0; g > p; ++p) {
            var b = +M((f = n[p]), p),
              _ = +x(f, p);
            v > b && (v = b),
              d > _ && (d = _),
              b > y && (y = b),
              _ > m && (m = _),
              s.push(b),
              h.push(_);
          }
        var w = y - v,
          S = m - d;
        w > S ? (m = d + w) : (y = v + S);
        var k = hr();
        if (
          ((k.add = function (n) {
            u(k, n, +M(n, ++p), +x(n, p), v, d, y, m);
          }),
          (k.visit = function (n) {
            pr(n, k, v, d, y, m);
          }),
          (k.find = function (n) {
            return gr(k, n[0], n[1], v, d, y, m);
          }),
          (p = -1),
          null == t)
        ) {
          for (; ++p < g; ) u(k, n[p], s[p], h[p], v, d, y, m);
          --p;
        } else n.forEach(k.add);
        return (s = h = n = f = null), k;
      }
      var o,
        a = Ce,
        l = ze;
      return (o = arguments.length)
        ? ((a = fr), (l = sr), 3 === o && ((i = e), (r = t), (e = t = 0)), u(n))
        : ((u.x = function (n) {
            return arguments.length ? ((a = n), u) : a;
          }),
          (u.y = function (n) {
            return arguments.length ? ((l = n), u) : l;
          }),
          (u.extent = function (n) {
            return arguments.length
              ? (null == n
                  ? (t = e = r = i = null)
                  : ((t = +n[0][0]),
                    (e = +n[0][1]),
                    (r = +n[1][0]),
                    (i = +n[1][1])),
                u)
              : null == t
              ? null
              : [
                  [t, e],
                  [r, i],
                ];
          }),
          (u.size = function (n) {
            return arguments.length
              ? (null == n
                  ? (t = e = r = i = null)
                  : ((t = e = 0), (r = +n[0]), (i = +n[1])),
                u)
              : null == t
              ? null
              : [r - t, i - e];
          }),
          u);
    }),
    (ao.interpolateRgb = vr),
    (ao.interpolateObject = dr),
    (ao.interpolateNumber = yr),
    (ao.interpolateString = mr);
  var hl = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,
    pl = new RegExp(hl.source, "g");
  (ao.interpolate = Mr),
    (ao.interpolators = [
      function (n, t) {
        var e = typeof t;
        return (
          "string" === e
            ? ua.has(t.toLowerCase()) || /^(#|rgb\(|hsl\()/i.test(t)
              ? vr
              : mr
            : t instanceof an
            ? vr
            : Array.isArray(t)
            ? xr
            : "object" === e && isNaN(t)
            ? dr
            : yr
        )(n, t);
      },
    ]),
    (ao.interpolateArray = xr);
  var gl = function () {
      return m;
    },
    vl = ao.map({
      linear: gl,
      poly: Er,
      quad: function () {
        return Sr;
      },
      cubic: function () {
        return kr;
      },
      sin: function () {
        return Ar;
      },
      exp: function () {
        return Cr;
      },
      circle: function () {
        return zr;
      },
      elastic: Lr,
      back: qr,
      bounce: function () {
        return Tr;
      },
    }),
    dl = ao.map({
      in: m,
      out: _r,
      "in-out": wr,
      "out-in": function (n) {
        return wr(_r(n));
      },
    });
  (ao.ease = function (n) {
    var t = n.indexOf("-"),
      e = t >= 0 ? n.slice(0, t) : n,
      r = t >= 0 ? n.slice(t + 1) : "in";
    return (
      (e = vl.get(e) || gl),
      (r = dl.get(r) || m),
      br(r(e.apply(null, lo.call(arguments, 1))))
    );
  }),
    (ao.interpolateHcl = Rr),
    (ao.interpolateHsl = Dr),
    (ao.interpolateLab = Pr),
    (ao.interpolateRound = Ur),
    (ao.transform = function (n) {
      var t = fo.createElementNS(ao.ns.prefix.svg, "g");
      return (ao.transform = function (n) {
        if (null != n) {
          t.setAttribute("transform", n);
          var e = t.transform.baseVal.consolidate();
        }
        return new jr(e ? e.matrix : yl);
      })(n);
    }),
    (jr.prototype.toString = function () {
      return (
        "translate(" +
        this.translate +
        ")rotate(" +
        this.rotate +
        ")skewX(" +
        this.skew +
        ")scale(" +
        this.scale +
        ")"
      );
    });
  var yl = { a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 };
  (ao.interpolateTransform = $r),
    (ao.layout = {}),
    (ao.layout.bundle = function () {
      return function (n) {
        for (var t = [], e = -1, r = n.length; ++e < r; ) t.push(Jr(n[e]));
        return t;
      };
    }),
    (ao.layout.chord = function () {
      function n() {
        var n,
          c,
          s,
          h,
          p,
          g = {},
          v = [],
          d = ao.range(u),
          y = [];
        for (e = [], r = [], n = 0, h = -1; ++h < u; ) {
          for (c = 0, p = -1; ++p < u; ) c += i[h][p];
          v.push(c), y.push(ao.range(u)), (n += c);
        }
        for (
          o &&
            d.sort(function (n, t) {
              return o(v[n], v[t]);
            }),
            a &&
              y.forEach(function (n, t) {
                n.sort(function (n, e) {
                  return a(i[t][n], i[t][e]);
                });
              }),
            n = (Ho - f * u) / n,
            c = 0,
            h = -1;
          ++h < u;

        ) {
          for (s = c, p = -1; ++p < u; ) {
            var m = d[h],
              M = y[m][p],
              x = i[m][M],
              b = c,
              _ = (c += x * n);
            g[m + "-" + M] = {
              index: m,
              subindex: M,
              startAngle: b,
              endAngle: _,
              value: x,
            };
          }
          (r[m] = { index: m, startAngle: s, endAngle: c, value: v[m] }),
            (c += f);
        }
        for (h = -1; ++h < u; )
          for (p = h - 1; ++p < u; ) {
            var w = g[h + "-" + p],
              S = g[p + "-" + h];
            (w.value || S.value) &&
              e.push(
                w.value < S.value
                  ? { source: S, target: w }
                  : { source: w, target: S }
              );
          }
        l && t();
      }
      function t() {
        e.sort(function (n, t) {
          return l(
            (n.source.value + n.target.value) / 2,
            (t.source.value + t.target.value) / 2
          );
        });
      }
      var e,
        r,
        i,
        u,
        o,
        a,
        l,
        c = {},
        f = 0;
      return (
        (c.matrix = function (n) {
          return arguments.length
            ? ((u = (i = n) && i.length), (e = r = null), c)
            : i;
        }),
        (c.padding = function (n) {
          return arguments.length ? ((f = n), (e = r = null), c) : f;
        }),
        (c.sortGroups = function (n) {
          return arguments.length ? ((o = n), (e = r = null), c) : o;
        }),
        (c.sortSubgroups = function (n) {
          return arguments.length ? ((a = n), (e = null), c) : a;
        }),
        (c.sortChords = function (n) {
          return arguments.length ? ((l = n), e && t(), c) : l;
        }),
        (c.chords = function () {
          return e || n(), e;
        }),
        (c.groups = function () {
          return r || n(), r;
        }),
        c
      );
    }),
    (ao.layout.force = function () {
      function n(n) {
        return function (t, e, r, i) {
          if (t.point !== n) {
            var u = t.cx - n.x,
              o = t.cy - n.y,
              a = i - e,
              l = u * u + o * o;
            if (l > (a * a) / y) {
              if (v > l) {
                var c = t.charge / l;
                (n.px -= u * c), (n.py -= o * c);
              }
              return !0;
            }
            if (t.point && l && v > l) {
              var c = t.pointCharge / l;
              (n.px -= u * c), (n.py -= o * c);
            }
          }
          return !t.charge;
        };
      }
      function t(n) {
        (n.px = ao.event.x), (n.py = ao.event.y), l.resume();
      }
      var e,
        r,
        i,
        u,
        o,
        a,
        l = {},
        c = ao.dispatch("start", "tick", "end"),
        f = [1, 1],
        s = 0.9,
        h = ml,
        p = Ml,
        g = -30,
        v = xl,
        d = 0.1,
        y = 0.64,
        M = [],
        x = [];
      return (
        (l.tick = function () {
          if ((i *= 0.99) < 0.005)
            return (e = null), c.end({ type: "end", alpha: (i = 0) }), !0;
          var t,
            r,
            l,
            h,
            p,
            v,
            y,
            m,
            b,
            _ = M.length,
            w = x.length;
          for (r = 0; w > r; ++r)
            (l = x[r]),
              (h = l.source),
              (p = l.target),
              (m = p.x - h.x),
              (b = p.y - h.y),
              (v = m * m + b * b) &&
                ((v = (i * o[r] * ((v = Math.sqrt(v)) - u[r])) / v),
                (m *= v),
                (b *= v),
                (p.x -=
                  m *
                  (y =
                    h.weight + p.weight
                      ? h.weight / (h.weight + p.weight)
                      : 0.5)),
                (p.y -= b * y),
                (h.x += m * (y = 1 - y)),
                (h.y += b * y));
          if ((y = i * d) && ((m = f[0] / 2), (b = f[1] / 2), (r = -1), y))
            for (; ++r < _; )
              (l = M[r]), (l.x += (m - l.x) * y), (l.y += (b - l.y) * y);
          if (g)
            for (ri((t = ao.geom.quadtree(M)), i, a), r = -1; ++r < _; )
              (l = M[r]).fixed || t.visit(n(l));
          for (r = -1; ++r < _; )
            (l = M[r]),
              l.fixed
                ? ((l.x = l.px), (l.y = l.py))
                : ((l.x -= (l.px - (l.px = l.x)) * s),
                  (l.y -= (l.py - (l.py = l.y)) * s));
          c.tick({ type: "tick", alpha: i });
        }),
        (l.nodes = function (n) {
          return arguments.length ? ((M = n), l) : M;
        }),
        (l.links = function (n) {
          return arguments.length ? ((x = n), l) : x;
        }),
        (l.size = function (n) {
          return arguments.length ? ((f = n), l) : f;
        }),
        (l.linkDistance = function (n) {
          return arguments.length
            ? ((h = "function" == typeof n ? n : +n), l)
            : h;
        }),
        (l.distance = l.linkDistance),
        (l.linkStrength = function (n) {
          return arguments.length
            ? ((p = "function" == typeof n ? n : +n), l)
            : p;
        }),
        (l.friction = function (n) {
          return arguments.length ? ((s = +n), l) : s;
        }),
        (l.charge = function (n) {
          return arguments.length
            ? ((g = "function" == typeof n ? n : +n), l)
            : g;
        }),
        (l.chargeDistance = function (n) {
          return arguments.length ? ((v = n * n), l) : Math.sqrt(v);
        }),
        (l.gravity = function (n) {
          return arguments.length ? ((d = +n), l) : d;
        }),
        (l.theta = function (n) {
          return arguments.length ? ((y = n * n), l) : Math.sqrt(y);
        }),
        (l.alpha = function (n) {
          return arguments.length
            ? ((n = +n),
              i
                ? n > 0
                  ? (i = n)
                  : ((e.c = null),
                    (e.t = NaN),
                    (e = null),
                    c.end({ type: "end", alpha: (i = 0) }))
                : n > 0 &&
                  (c.start({ type: "start", alpha: (i = n) }),
                  (e = qn(l.tick))),
              l)
            : i;
        }),
        (l.start = function () {
          function n(n, r) {
            if (!e) {
              for (e = new Array(i), l = 0; i > l; ++l) e[l] = [];
              for (l = 0; c > l; ++l) {
                var u = x[l];
                e[u.source.index].push(u.target),
                  e[u.target.index].push(u.source);
              }
            }
            for (var o, a = e[t], l = -1, f = a.length; ++l < f; )
              if (!isNaN((o = a[l][n]))) return o;
            return Math.random() * r;
          }
          var t,
            e,
            r,
            i = M.length,
            c = x.length,
            s = f[0],
            v = f[1];
          for (t = 0; i > t; ++t) ((r = M[t]).index = t), (r.weight = 0);
          for (t = 0; c > t; ++t)
            (r = x[t]),
              "number" == typeof r.source && (r.source = M[r.source]),
              "number" == typeof r.target && (r.target = M[r.target]),
              ++r.source.weight,
              ++r.target.weight;
          for (t = 0; i > t; ++t)
            (r = M[t]),
              isNaN(r.x) && (r.x = n("x", s)),
              isNaN(r.y) && (r.y = n("y", v)),
              isNaN(r.px) && (r.px = r.x),
              isNaN(r.py) && (r.py = r.y);
          if (((u = []), "function" == typeof h))
            for (t = 0; c > t; ++t) u[t] = +h.call(this, x[t], t);
          else for (t = 0; c > t; ++t) u[t] = h;
          if (((o = []), "function" == typeof p))
            for (t = 0; c > t; ++t) o[t] = +p.call(this, x[t], t);
          else for (t = 0; c > t; ++t) o[t] = p;
          if (((a = []), "function" == typeof g))
            for (t = 0; i > t; ++t) a[t] = +g.call(this, M[t], t);
          else for (t = 0; i > t; ++t) a[t] = g;
          return l.resume();
        }),
        (l.resume = function () {
          return l.alpha(0.1);
        }),
        (l.stop = function () {
          return l.alpha(0);
        }),
        (l.drag = function () {
          return (
            r ||
              (r = ao.behavior
                .drag()
                .origin(m)
                .on("dragstart.force", Qr)
                .on("drag.force", t)
                .on("dragend.force", ni)),
            arguments.length
              ? void this.on("mouseover.force", ti)
                  .on("mouseout.force", ei)
                  .call(r)
              : r
          );
        }),
        ao.rebind(l, c, "on")
      );
    });
  var ml = 20,
    Ml = 1,
    xl = 1 / 0;
  (ao.layout.hierarchy = function () {
    function n(i) {
      var u,
        o = [i],
        a = [];
      for (i.depth = 0; null != (u = o.pop()); )
        if ((a.push(u), (c = e.call(n, u, u.depth)) && (l = c.length))) {
          for (var l, c, f; --l >= 0; )
            o.push((f = c[l])), (f.parent = u), (f.depth = u.depth + 1);
          r && (u.value = 0), (u.children = c);
        } else r && (u.value = +r.call(n, u, u.depth) || 0), delete u.children;
      return (
        oi(i, function (n) {
          var e, i;
          t && (e = n.children) && e.sort(t),
            r && (i = n.parent) && (i.value += n.value);
        }),
        a
      );
    }
    var t = ci,
      e = ai,
      r = li;
    return (
      (n.sort = function (e) {
        return arguments.length ? ((t = e), n) : t;
      }),
      (n.children = function (t) {
        return arguments.length ? ((e = t), n) : e;
      }),
      (n.value = function (t) {
        return arguments.length ? ((r = t), n) : r;
      }),
      (n.revalue = function (t) {
        return (
          r &&
            (ui(t, function (n) {
              n.children && (n.value = 0);
            }),
            oi(t, function (t) {
              var e;
              t.children || (t.value = +r.call(n, t, t.depth) || 0),
                (e = t.parent) && (e.value += t.value);
            })),
          t
        );
      }),
      n
    );
  }),
    (ao.layout.partition = function () {
      function n(t, e, r, i) {
        var u = t.children;
        if (
          ((t.x = e),
          (t.y = t.depth * i),
          (t.dx = r),
          (t.dy = i),
          u && (o = u.length))
        ) {
          var o,
            a,
            l,
            c = -1;
          for (r = t.value ? r / t.value : 0; ++c < o; )
            n((a = u[c]), e, (l = a.value * r), i), (e += l);
        }
      }
      function t(n) {
        var e = n.children,
          r = 0;
        if (e && (i = e.length))
          for (var i, u = -1; ++u < i; ) r = Math.max(r, t(e[u]));
        return 1 + r;
      }
      function e(e, u) {
        var o = r.call(this, e, u);
        return n(o[0], 0, i[0], i[1] / t(o[0])), o;
      }
      var r = ao.layout.hierarchy(),
        i = [1, 1];
      return (
        (e.size = function (n) {
          return arguments.length ? ((i = n), e) : i;
        }),
        ii(e, r)
      );
    }),
    (ao.layout.pie = function () {
      function n(o) {
        var a,
          l = o.length,
          c = o.map(function (e, r) {
            return +t.call(n, e, r);
          }),
          f = +("function" == typeof r ? r.apply(this, arguments) : r),
          s = ("function" == typeof i ? i.apply(this, arguments) : i) - f,
          h = Math.min(
            Math.abs(s) / l,
            +("function" == typeof u ? u.apply(this, arguments) : u)
          ),
          p = h * (0 > s ? -1 : 1),
          g = ao.sum(c),
          v = g ? (s - l * p) / g : 0,
          d = ao.range(l),
          y = [];
        return (
          null != e &&
            d.sort(
              e === bl
                ? function (n, t) {
                    return c[t] - c[n];
                  }
                : function (n, t) {
                    return e(o[n], o[t]);
                  }
            ),
          d.forEach(function (n) {
            y[n] = {
              data: o[n],
              value: (a = c[n]),
              startAngle: f,
              endAngle: (f += a * v + p),
              padAngle: h,
            };
          }),
          y
        );
      }
      var t = Number,
        e = bl,
        r = 0,
        i = Ho,
        u = 0;
      return (
        (n.value = function (e) {
          return arguments.length ? ((t = e), n) : t;
        }),
        (n.sort = function (t) {
          return arguments.length ? ((e = t), n) : e;
        }),
        (n.startAngle = function (t) {
          return arguments.length ? ((r = t), n) : r;
        }),
        (n.endAngle = function (t) {
          return arguments.length ? ((i = t), n) : i;
        }),
        (n.padAngle = function (t) {
          return arguments.length ? ((u = t), n) : u;
        }),
        n
      );
    });
  var bl = {};
  ao.layout.stack = function () {
    function n(a, l) {
      if (!(h = a.length)) return a;
      var c = a.map(function (e, r) {
          return t.call(n, e, r);
        }),
        f = c.map(function (t) {
          return t.map(function (t, e) {
            return [u.call(n, t, e), o.call(n, t, e)];
          });
        }),
        s = e.call(n, f, l);
      (c = ao.permute(c, s)), (f = ao.permute(f, s));
      var h,
        p,
        g,
        v,
        d = r.call(n, f, l),
        y = c[0].length;
      for (g = 0; y > g; ++g)
        for (i.call(n, c[0][g], (v = d[g]), f[0][g][1]), p = 1; h > p; ++p)
          i.call(n, c[p][g], (v += f[p - 1][g][1]), f[p][g][1]);
      return a;
    }
    var t = m,
      e = gi,
      r = vi,
      i = pi,
      u = si,
      o = hi;
    return (
      (n.values = function (e) {
        return arguments.length ? ((t = e), n) : t;
      }),
      (n.order = function (t) {
        return arguments.length
          ? ((e = "function" == typeof t ? t : _l.get(t) || gi), n)
          : e;
      }),
      (n.offset = function (t) {
        return arguments.length
          ? ((r = "function" == typeof t ? t : wl.get(t) || vi), n)
          : r;
      }),
      (n.x = function (t) {
        return arguments.length ? ((u = t), n) : u;
      }),
      (n.y = function (t) {
        return arguments.length ? ((o = t), n) : o;
      }),
      (n.out = function (t) {
        return arguments.length ? ((i = t), n) : i;
      }),
      n
    );
  };
  var _l = ao.map({
      "inside-out": function (n) {
        var t,
          e,
          r = n.length,
          i = n.map(di),
          u = n.map(yi),
          o = ao.range(r).sort(function (n, t) {
            return i[n] - i[t];
          }),
          a = 0,
          l = 0,
          c = [],
          f = [];
        for (t = 0; r > t; ++t)
          (e = o[t]),
            l > a ? ((a += u[e]), c.push(e)) : ((l += u[e]), f.push(e));
        return f.reverse().concat(c);
      },
      reverse: function (n) {
        return ao.range(n.length).reverse();
      },
      default: gi,
    }),
    wl = ao.map({
      silhouette: function (n) {
        var t,
          e,
          r,
          i = n.length,
          u = n[0].length,
          o = [],
          a = 0,
          l = [];
        for (e = 0; u > e; ++e) {
          for (t = 0, r = 0; i > t; t++) r += n[t][e][1];
          r > a && (a = r), o.push(r);
        }
        for (e = 0; u > e; ++e) l[e] = (a - o[e]) / 2;
        return l;
      },
      wiggle: function (n) {
        var t,
          e,
          r,
          i,
          u,
          o,
          a,
          l,
          c,
          f = n.length,
          s = n[0],
          h = s.length,
          p = [];
        for (p[0] = l = c = 0, e = 1; h > e; ++e) {
          for (t = 0, i = 0; f > t; ++t) i += n[t][e][1];
          for (t = 0, u = 0, a = s[e][0] - s[e - 1][0]; f > t; ++t) {
            for (r = 0, o = (n[t][e][1] - n[t][e - 1][1]) / (2 * a); t > r; ++r)
              o += (n[r][e][1] - n[r][e - 1][1]) / a;
            u += o * n[t][e][1];
          }
          (p[e] = l -= i ? (u / i) * a : 0), c > l && (c = l);
        }
        for (e = 0; h > e; ++e) p[e] -= c;
        return p;
      },
      expand: function (n) {
        var t,
          e,
          r,
          i = n.length,
          u = n[0].length,
          o = 1 / i,
          a = [];
        for (e = 0; u > e; ++e) {
          for (t = 0, r = 0; i > t; t++) r += n[t][e][1];
          if (r) for (t = 0; i > t; t++) n[t][e][1] /= r;
          else for (t = 0; i > t; t++) n[t][e][1] = o;
        }
        for (e = 0; u > e; ++e) a[e] = 0;
        return a;
      },
      zero: vi,
    });
  (ao.layout.histogram = function () {
    function n(n, u) {
      for (
        var o,
          a,
          l = [],
          c = n.map(e, this),
          f = r.call(this, c, u),
          s = i.call(this, f, c, u),
          u = -1,
          h = c.length,
          p = s.length - 1,
          g = t ? 1 : 1 / h;
        ++u < p;

      )
        (o = l[u] = []), (o.dx = s[u + 1] - (o.x = s[u])), (o.y = 0);
      if (p > 0)
        for (u = -1; ++u < h; )
          (a = c[u]),
            a >= f[0] &&
              a <= f[1] &&
              ((o = l[ao.bisect(s, a, 1, p) - 1]), (o.y += g), o.push(n[u]));
      return l;
    }
    var t = !0,
      e = Number,
      r = bi,
      i = Mi;
    return (
      (n.value = function (t) {
        return arguments.length ? ((e = t), n) : e;
      }),
      (n.range = function (t) {
        return arguments.length ? ((r = En(t)), n) : r;
      }),
      (n.bins = function (t) {
        return arguments.length
          ? ((i =
              "number" == typeof t
                ? function (n) {
                    return xi(n, t);
                  }
                : En(t)),
            n)
          : i;
      }),
      (n.frequency = function (e) {
        return arguments.length ? ((t = !!e), n) : t;
      }),
      n
    );
  }),
    (ao.layout.pack = function () {
      function n(n, u) {
        var o = e.call(this, n, u),
          a = o[0],
          l = i[0],
          c = i[1],
          f =
            null == t
              ? Math.sqrt
              : "function" == typeof t
              ? t
              : function () {
                  return t;
                };
        if (
          ((a.x = a.y = 0),
          oi(a, function (n) {
            n.r = +f(n.value);
          }),
          oi(a, Ni),
          r)
        ) {
          var s = (r * (t ? 1 : Math.max((2 * a.r) / l, (2 * a.r) / c))) / 2;
          oi(a, function (n) {
            n.r += s;
          }),
            oi(a, Ni),
            oi(a, function (n) {
              n.r -= s;
            });
        }
        return (
          Ci(
            a,
            l / 2,
            c / 2,
            t ? 1 : 1 / Math.max((2 * a.r) / l, (2 * a.r) / c)
          ),
          o
        );
      }
      var t,
        e = ao.layout.hierarchy().sort(_i),
        r = 0,
        i = [1, 1];
      return (
        (n.size = function (t) {
          return arguments.length ? ((i = t), n) : i;
        }),
        (n.radius = function (e) {
          return arguments.length
            ? ((t = null == e || "function" == typeof e ? e : +e), n)
            : t;
        }),
        (n.padding = function (t) {
          return arguments.length ? ((r = +t), n) : r;
        }),
        ii(n, e)
      );
    }),
    (ao.layout.tree = function () {
      function n(n, i) {
        var f = o.call(this, n, i),
          s = f[0],
          h = t(s);
        if ((oi(h, e), (h.parent.m = -h.z), ui(h, r), c)) ui(s, u);
        else {
          var p = s,
            g = s,
            v = s;
          ui(s, function (n) {
            n.x < p.x && (p = n),
              n.x > g.x && (g = n),
              n.depth > v.depth && (v = n);
          });
          var d = a(p, g) / 2 - p.x,
            y = l[0] / (g.x + a(g, p) / 2 + d),
            m = l[1] / (v.depth || 1);
          ui(s, function (n) {
            (n.x = (n.x + d) * y), (n.y = n.depth * m);
          });
        }
        return f;
      }
      function t(n) {
        for (
          var t, e = { A: null, children: [n] }, r = [e];
          null != (t = r.pop());

        )
          for (var i, u = t.children, o = 0, a = u.length; a > o; ++o)
            r.push(
              ((u[o] = i =
                {
                  _: u[o],
                  parent: t,
                  children: ((i = u[o].children) && i.slice()) || [],
                  A: null,
                  a: null,
                  z: 0,
                  m: 0,
                  c: 0,
                  s: 0,
                  t: null,
                  i: o,
                }).a = i)
            );
        return e.children[0];
      }
      function e(n) {
        var t = n.children,
          e = n.parent.children,
          r = n.i ? e[n.i - 1] : null;
        if (t.length) {
          Di(n);
          var u = (t[0].z + t[t.length - 1].z) / 2;
          r ? ((n.z = r.z + a(n._, r._)), (n.m = n.z - u)) : (n.z = u);
        } else r && (n.z = r.z + a(n._, r._));
        n.parent.A = i(n, r, n.parent.A || e[0]);
      }
      function r(n) {
        (n._.x = n.z + n.parent.m), (n.m += n.parent.m);
      }
      function i(n, t, e) {
        if (t) {
          for (
            var r,
              i = n,
              u = n,
              o = t,
              l = i.parent.children[0],
              c = i.m,
              f = u.m,
              s = o.m,
              h = l.m;
            (o = Ti(o)), (i = qi(i)), o && i;

          )
            (l = qi(l)),
              (u = Ti(u)),
              (u.a = n),
              (r = o.z + s - i.z - c + a(o._, i._)),
              r > 0 && (Ri(Pi(o, n, e), n, r), (c += r), (f += r)),
              (s += o.m),
              (c += i.m),
              (h += l.m),
              (f += u.m);
          o && !Ti(u) && ((u.t = o), (u.m += s - f)),
            i && !qi(l) && ((l.t = i), (l.m += c - h), (e = n));
        }
        return e;
      }
      function u(n) {
        (n.x *= l[0]), (n.y = n.depth * l[1]);
      }
      var o = ao.layout.hierarchy().sort(null).value(null),
        a = Li,
        l = [1, 1],
        c = null;
      return (
        (n.separation = function (t) {
          return arguments.length ? ((a = t), n) : a;
        }),
        (n.size = function (t) {
          return arguments.length
            ? ((c = null == (l = t) ? u : null), n)
            : c
            ? null
            : l;
        }),
        (n.nodeSize = function (t) {
          return arguments.length
            ? ((c = null == (l = t) ? null : u), n)
            : c
            ? l
            : null;
        }),
        ii(n, o)
      );
    }),
    (ao.layout.cluster = function () {
      function n(n, u) {
        var o,
          a = t.call(this, n, u),
          l = a[0],
          c = 0;
        oi(l, function (n) {
          var t = n.children;
          t && t.length
            ? ((n.x = ji(t)), (n.y = Ui(t)))
            : ((n.x = o ? (c += e(n, o)) : 0), (n.y = 0), (o = n));
        });
        var f = Fi(l),
          s = Hi(l),
          h = f.x - e(f, s) / 2,
          p = s.x + e(s, f) / 2;
        return (
          oi(
            l,
            i
              ? function (n) {
                  (n.x = (n.x - l.x) * r[0]), (n.y = (l.y - n.y) * r[1]);
                }
              : function (n) {
                  (n.x = ((n.x - h) / (p - h)) * r[0]),
                    (n.y = (1 - (l.y ? n.y / l.y : 1)) * r[1]);
                }
          ),
          a
        );
      }
      var t = ao.layout.hierarchy().sort(null).value(null),
        e = Li,
        r = [1, 1],
        i = !1;
      return (
        (n.separation = function (t) {
          return arguments.length ? ((e = t), n) : e;
        }),
        (n.size = function (t) {
          return arguments.length ? ((i = null == (r = t)), n) : i ? null : r;
        }),
        (n.nodeSize = function (t) {
          return arguments.length ? ((i = null != (r = t)), n) : i ? r : null;
        }),
        ii(n, t)
      );
    }),
    (ao.layout.treemap = function () {
      function n(n, t) {
        for (var e, r, i = -1, u = n.length; ++i < u; )
          (r = (e = n[i]).value * (0 > t ? 0 : t)),
            (e.area = isNaN(r) || 0 >= r ? 0 : r);
      }
      function t(e) {
        var u = e.children;
        if (u && u.length) {
          var o,
            a,
            l,
            c = s(e),
            f = [],
            h = u.slice(),
            g = 1 / 0,
            v =
              "slice" === p
                ? c.dx
                : "dice" === p
                ? c.dy
                : "slice-dice" === p
                ? 1 & e.depth
                  ? c.dy
                  : c.dx
                : Math.min(c.dx, c.dy);
          for (n(h, (c.dx * c.dy) / e.value), f.area = 0; (l = h.length) > 0; )
            f.push((o = h[l - 1])),
              (f.area += o.area),
              "squarify" !== p || (a = r(f, v)) <= g
                ? (h.pop(), (g = a))
                : ((f.area -= f.pop().area),
                  i(f, v, c, !1),
                  (v = Math.min(c.dx, c.dy)),
                  (f.length = f.area = 0),
                  (g = 1 / 0));
          f.length && (i(f, v, c, !0), (f.length = f.area = 0)), u.forEach(t);
        }
      }
      function e(t) {
        var r = t.children;
        if (r && r.length) {
          var u,
            o = s(t),
            a = r.slice(),
            l = [];
          for (n(a, (o.dx * o.dy) / t.value), l.area = 0; (u = a.pop()); )
            l.push(u),
              (l.area += u.area),
              null != u.z &&
                (i(l, u.z ? o.dx : o.dy, o, !a.length),
                (l.length = l.area = 0));
          r.forEach(e);
        }
      }
      function r(n, t) {
        for (
          var e, r = n.area, i = 0, u = 1 / 0, o = -1, a = n.length;
          ++o < a;

        )
          (e = n[o].area) && (u > e && (u = e), e > i && (i = e));
        return (
          (r *= r),
          (t *= t),
          r ? Math.max((t * i * g) / r, r / (t * u * g)) : 1 / 0
        );
      }
      function i(n, t, e, r) {
        var i,
          u = -1,
          o = n.length,
          a = e.x,
          c = e.y,
          f = t ? l(n.area / t) : 0;
        if (t == e.dx) {
          for ((r || f > e.dy) && (f = e.dy); ++u < o; )
            (i = n[u]),
              (i.x = a),
              (i.y = c),
              (i.dy = f),
              (a += i.dx = Math.min(e.x + e.dx - a, f ? l(i.area / f) : 0));
          (i.z = !0), (i.dx += e.x + e.dx - a), (e.y += f), (e.dy -= f);
        } else {
          for ((r || f > e.dx) && (f = e.dx); ++u < o; )
            (i = n[u]),
              (i.x = a),
              (i.y = c),
              (i.dx = f),
              (c += i.dy = Math.min(e.y + e.dy - c, f ? l(i.area / f) : 0));
          (i.z = !1), (i.dy += e.y + e.dy - c), (e.x += f), (e.dx -= f);
        }
      }
      function u(r) {
        var i = o || a(r),
          u = i[0];
        return (
          (u.x = u.y = 0),
          u.value ? ((u.dx = c[0]), (u.dy = c[1])) : (u.dx = u.dy = 0),
          o && a.revalue(u),
          n([u], (u.dx * u.dy) / u.value),
          (o ? e : t)(u),
          h && (o = i),
          i
        );
      }
      var o,
        a = ao.layout.hierarchy(),
        l = Math.round,
        c = [1, 1],
        f = null,
        s = Oi,
        h = !1,
        p = "squarify",
        g = 0.5 * (1 + Math.sqrt(5));
      return (
        (u.size = function (n) {
          return arguments.length ? ((c = n), u) : c;
        }),
        (u.padding = function (n) {
          function t(t) {
            var e = n.call(u, t, t.depth);
            return null == e
              ? Oi(t)
              : Ii(t, "number" == typeof e ? [e, e, e, e] : e);
          }
          function e(t) {
            return Ii(t, n);
          }
          if (!arguments.length) return f;
          var r;
          return (
            (s =
              null == (f = n)
                ? Oi
                : "function" == (r = typeof n)
                ? t
                : "number" === r
                ? ((n = [n, n, n, n]), e)
                : e),
            u
          );
        }),
        (u.round = function (n) {
          return arguments.length
            ? ((l = n ? Math.round : Number), u)
            : l != Number;
        }),
        (u.sticky = function (n) {
          return arguments.length ? ((h = n), (o = null), u) : h;
        }),
        (u.ratio = function (n) {
          return arguments.length ? ((g = n), u) : g;
        }),
        (u.mode = function (n) {
          return arguments.length ? ((p = n + ""), u) : p;
        }),
        ii(u, a)
      );
    }),
    (ao.random = {
      normal: function (n, t) {
        var e = arguments.length;
        return (
          2 > e && (t = 1),
          1 > e && (n = 0),
          function () {
            var e, r, i;
            do
              (e = 2 * Math.random() - 1),
                (r = 2 * Math.random() - 1),
                (i = e * e + r * r);
            while (!i || i > 1);
            return n + t * e * Math.sqrt((-2 * Math.log(i)) / i);
          }
        );
      },
      logNormal: function () {
        var n = ao.random.normal.apply(ao, arguments);
        return function () {
          return Math.exp(n());
        };
      },
      bates: function (n) {
        var t = ao.random.irwinHall(n);
        return function () {
          return t() / n;
        };
      },
      irwinHall: function (n) {
        return function () {
          for (var t = 0, e = 0; n > e; e++) t += Math.random();
          return t;
        };
      },
    }),
    (ao.scale = {});
  var Sl = { floor: m, ceil: m };
  ao.scale.linear = function () {
    return Wi([0, 1], [0, 1], Mr, !1);
  };
  var kl = { s: 1, g: 1, p: 1, r: 1, e: 1 };
  ao.scale.log = function () {
    return ru(ao.scale.linear().domain([0, 1]), 10, !0, [1, 10]);
  };
  var Nl = ao.format(".0e"),
    El = {
      floor: function (n) {
        return -Math.ceil(-n);
      },
      ceil: function (n) {
        return -Math.floor(-n);
      },
    };
  (ao.scale.pow = function () {
    return iu(ao.scale.linear(), 1, [0, 1]);
  }),
    (ao.scale.sqrt = function () {
      return ao.scale.pow().exponent(0.5);
    }),
    (ao.scale.ordinal = function () {
      return ou([], { t: "range", a: [[]] });
    }),
    (ao.scale.category10 = function () {
      return ao.scale.ordinal().range(Al);
    }),
    (ao.scale.category20 = function () {
      return ao.scale.ordinal().range(Cl);
    }),
    (ao.scale.category20b = function () {
      return ao.scale.ordinal().range(zl);
    }),
    (ao.scale.category20c = function () {
      return ao.scale.ordinal().range(Ll);
    });
  var Al = [
      2062260, 16744206, 2924588, 14034728, 9725885, 9197131, 14907330, 8355711,
      12369186, 1556175,
    ].map(xn),
    Cl = [
      2062260, 11454440, 16744206, 16759672, 2924588, 10018698, 14034728,
      16750742, 9725885, 12955861, 9197131, 12885140, 14907330, 16234194,
      8355711, 13092807, 12369186, 14408589, 1556175, 10410725,
    ].map(xn),
    zl = [
      3750777, 5395619, 7040719, 10264286, 6519097, 9216594, 11915115, 13556636,
      9202993, 12426809, 15186514, 15190932, 8666169, 11356490, 14049643,
      15177372, 8077683, 10834324, 13528509, 14589654,
    ].map(xn),
    Ll = [
      3244733, 7057110, 10406625, 13032431, 15095053, 16616764, 16625259,
      16634018, 3253076, 7652470, 10607003, 13101504, 7695281, 10394312,
      12369372, 14342891, 6513507, 9868950, 12434877, 14277081,
    ].map(xn);
  (ao.scale.quantile = function () {
    return au([], []);
  }),
    (ao.scale.quantize = function () {
      return lu(0, 1, [0, 1]);
    }),
    (ao.scale.threshold = function () {
      return cu([0.5], [0, 1]);
    }),
    (ao.scale.identity = function () {
      return fu([0, 1]);
    }),
    (ao.svg = {}),
    (ao.svg.arc = function () {
      function n() {
        var n = Math.max(0, +e.apply(this, arguments)),
          c = Math.max(0, +r.apply(this, arguments)),
          f = o.apply(this, arguments) - Io,
          s = a.apply(this, arguments) - Io,
          h = Math.abs(s - f),
          p = f > s ? 0 : 1;
        if ((n > c && ((g = c), (c = n), (n = g)), h >= Oo))
          return t(c, p) + (n ? t(n, 1 - p) : "") + "Z";
        var g,
          v,
          d,
          y,
          m,
          M,
          x,
          b,
          _,
          w,
          S,
          k,
          N = 0,
          E = 0,
          A = [];
        if (
          ((y = (+l.apply(this, arguments) || 0) / 2) &&
            ((d =
              u === ql ? Math.sqrt(n * n + c * c) : +u.apply(this, arguments)),
            p || (E *= -1),
            c && (E = tn((d / c) * Math.sin(y))),
            n && (N = tn((d / n) * Math.sin(y)))),
          c)
        ) {
          (m = c * Math.cos(f + E)),
            (M = c * Math.sin(f + E)),
            (x = c * Math.cos(s - E)),
            (b = c * Math.sin(s - E));
          var C = Math.abs(s - f - 2 * E) <= Fo ? 0 : 1;
          if (E && (yu(m, M, x, b) === p) ^ C) {
            var z = (f + s) / 2;
            (m = c * Math.cos(z)), (M = c * Math.sin(z)), (x = b = null);
          }
        } else m = M = 0;
        if (n) {
          (_ = n * Math.cos(s - N)),
            (w = n * Math.sin(s - N)),
            (S = n * Math.cos(f + N)),
            (k = n * Math.sin(f + N));
          var L = Math.abs(f - s + 2 * N) <= Fo ? 0 : 1;
          if (N && (yu(_, w, S, k) === 1 - p) ^ L) {
            var q = (f + s) / 2;
            (_ = n * Math.cos(q)), (w = n * Math.sin(q)), (S = k = null);
          }
        } else _ = w = 0;
        if (
          h > Uo &&
          (g = Math.min(Math.abs(c - n) / 2, +i.apply(this, arguments))) > 0.001
        ) {
          v = (c > n) ^ p ? 0 : 1;
          var T = g,
            R = g;
          if (Fo > h) {
            var D =
                null == S
                  ? [_, w]
                  : null == x
                  ? [m, M]
                  : Re([m, M], [S, k], [x, b], [_, w]),
              P = m - D[0],
              U = M - D[1],
              j = x - D[0],
              F = b - D[1],
              H =
                1 /
                Math.sin(
                  Math.acos(
                    (P * j + U * F) /
                      (Math.sqrt(P * P + U * U) * Math.sqrt(j * j + F * F))
                  ) / 2
                ),
              O = Math.sqrt(D[0] * D[0] + D[1] * D[1]);
            (R = Math.min(g, (n - O) / (H - 1))),
              (T = Math.min(g, (c - O) / (H + 1)));
          }
          if (null != x) {
            var I = mu(null == S ? [_, w] : [S, k], [m, M], c, T, p),
              Y = mu([x, b], [_, w], c, T, p);
            g === T
              ? A.push(
                  "M",
                  I[0],
                  "A",
                  T,
                  ",",
                  T,
                  " 0 0,",
                  v,
                  " ",
                  I[1],
                  "A",
                  c,
                  ",",
                  c,
                  " 0 ",
                  (1 - p) ^ yu(I[1][0], I[1][1], Y[1][0], Y[1][1]),
                  ",",
                  p,
                  " ",
                  Y[1],
                  "A",
                  T,
                  ",",
                  T,
                  " 0 0,",
                  v,
                  " ",
                  Y[0]
                )
              : A.push("M", I[0], "A", T, ",", T, " 0 1,", v, " ", Y[0]);
          } else A.push("M", m, ",", M);
          if (null != S) {
            var Z = mu([m, M], [S, k], n, -R, p),
              V = mu([_, w], null == x ? [m, M] : [x, b], n, -R, p);
            g === R
              ? A.push(
                  "L",
                  V[0],
                  "A",
                  R,
                  ",",
                  R,
                  " 0 0,",
                  v,
                  " ",
                  V[1],
                  "A",
                  n,
                  ",",
                  n,
                  " 0 ",
                  p ^ yu(V[1][0], V[1][1], Z[1][0], Z[1][1]),
                  ",",
                  1 - p,
                  " ",
                  Z[1],
                  "A",
                  R,
                  ",",
                  R,
                  " 0 0,",
                  v,
                  " ",
                  Z[0]
                )
              : A.push("L", V[0], "A", R, ",", R, " 0 0,", v, " ", Z[0]);
          } else A.push("L", _, ",", w);
        } else
          A.push("M", m, ",", M),
            null != x &&
              A.push("A", c, ",", c, " 0 ", C, ",", p, " ", x, ",", b),
            A.push("L", _, ",", w),
            null != S &&
              A.push("A", n, ",", n, " 0 ", L, ",", 1 - p, " ", S, ",", k);
        return A.push("Z"), A.join("");
      }
      function t(n, t) {
        return (
          "M0," +
          n +
          "A" +
          n +
          "," +
          n +
          " 0 1," +
          t +
          " 0," +
          -n +
          "A" +
          n +
          "," +
          n +
          " 0 1," +
          t +
          " 0," +
          n
        );
      }
      var e = hu,
        r = pu,
        i = su,
        u = ql,
        o = gu,
        a = vu,
        l = du;
      return (
        (n.innerRadius = function (t) {
          return arguments.length ? ((e = En(t)), n) : e;
        }),
        (n.outerRadius = function (t) {
          return arguments.length ? ((r = En(t)), n) : r;
        }),
        (n.cornerRadius = function (t) {
          return arguments.length ? ((i = En(t)), n) : i;
        }),
        (n.padRadius = function (t) {
          return arguments.length ? ((u = t == ql ? ql : En(t)), n) : u;
        }),
        (n.startAngle = function (t) {
          return arguments.length ? ((o = En(t)), n) : o;
        }),
        (n.endAngle = function (t) {
          return arguments.length ? ((a = En(t)), n) : a;
        }),
        (n.padAngle = function (t) {
          return arguments.length ? ((l = En(t)), n) : l;
        }),
        (n.centroid = function () {
          var n = (+e.apply(this, arguments) + +r.apply(this, arguments)) / 2,
            t =
              (+o.apply(this, arguments) + +a.apply(this, arguments)) / 2 - Io;
          return [Math.cos(t) * n, Math.sin(t) * n];
        }),
        n
      );
    });
  var ql = "auto";
  ao.svg.line = function () {
    return Mu(m);
  };
  var Tl = ao.map({
    linear: xu,
    "linear-closed": bu,
    step: _u,
    "step-before": wu,
    "step-after": Su,
    basis: zu,
    "basis-open": Lu,
    "basis-closed": qu,
    bundle: Tu,
    cardinal: Eu,
    "cardinal-open": ku,
    "cardinal-closed": Nu,
    monotone: Fu,
  });
  Tl.forEach(function (n, t) {
    (t.key = n), (t.closed = /-closed$/.test(n));
  });
  var Rl = [0, 2 / 3, 1 / 3, 0],
    Dl = [0, 1 / 3, 2 / 3, 0],
    Pl = [0, 1 / 6, 2 / 3, 1 / 6];
  (ao.svg.line.radial = function () {
    var n = Mu(Hu);
    return (n.radius = n.x), delete n.x, (n.angle = n.y), delete n.y, n;
  }),
    (wu.reverse = Su),
    (Su.reverse = wu),
    (ao.svg.area = function () {
      return Ou(m);
    }),
    (ao.svg.area.radial = function () {
      var n = Ou(Hu);
      return (
        (n.radius = n.x),
        delete n.x,
        (n.innerRadius = n.x0),
        delete n.x0,
        (n.outerRadius = n.x1),
        delete n.x1,
        (n.angle = n.y),
        delete n.y,
        (n.startAngle = n.y0),
        delete n.y0,
        (n.endAngle = n.y1),
        delete n.y1,
        n
      );
    }),
    (ao.svg.chord = function () {
      function n(n, a) {
        var l = t(this, u, n, a),
          c = t(this, o, n, a);
        return (
          "M" +
          l.p0 +
          r(l.r, l.p1, l.a1 - l.a0) +
          (e(l, c)
            ? i(l.r, l.p1, l.r, l.p0)
            : i(l.r, l.p1, c.r, c.p0) +
              r(c.r, c.p1, c.a1 - c.a0) +
              i(c.r, c.p1, l.r, l.p0)) +
          "Z"
        );
      }
      function t(n, t, e, r) {
        var i = t.call(n, e, r),
          u = a.call(n, i, r),
          o = l.call(n, i, r) - Io,
          f = c.call(n, i, r) - Io;
        return {
          r: u,
          a0: o,
          a1: f,
          p0: [u * Math.cos(o), u * Math.sin(o)],
          p1: [u * Math.cos(f), u * Math.sin(f)],
        };
      }
      function e(n, t) {
        return n.a0 == t.a0 && n.a1 == t.a1;
      }
      function r(n, t, e) {
        return "A" + n + "," + n + " 0 " + +(e > Fo) + ",1 " + t;
      }
      function i(n, t, e, r) {
        return "Q 0,0 " + r;
      }
      var u = Me,
        o = xe,
        a = Iu,
        l = gu,
        c = vu;
      return (
        (n.radius = function (t) {
          return arguments.length ? ((a = En(t)), n) : a;
        }),
        (n.source = function (t) {
          return arguments.length ? ((u = En(t)), n) : u;
        }),
        (n.target = function (t) {
          return arguments.length ? ((o = En(t)), n) : o;
        }),
        (n.startAngle = function (t) {
          return arguments.length ? ((l = En(t)), n) : l;
        }),
        (n.endAngle = function (t) {
          return arguments.length ? ((c = En(t)), n) : c;
        }),
        n
      );
    }),
    (ao.svg.diagonal = function () {
      function n(n, i) {
        var u = t.call(this, n, i),
          o = e.call(this, n, i),
          a = (u.y + o.y) / 2,
          l = [u, { x: u.x, y: a }, { x: o.x, y: a }, o];
        return (
          (l = l.map(r)), "M" + l[0] + "C" + l[1] + " " + l[2] + " " + l[3]
        );
      }
      var t = Me,
        e = xe,
        r = Yu;
      return (
        (n.source = function (e) {
          return arguments.length ? ((t = En(e)), n) : t;
        }),
        (n.target = function (t) {
          return arguments.length ? ((e = En(t)), n) : e;
        }),
        (n.projection = function (t) {
          return arguments.length ? ((r = t), n) : r;
        }),
        n
      );
    }),
    (ao.svg.diagonal.radial = function () {
      var n = ao.svg.diagonal(),
        t = Yu,
        e = n.projection;
      return (
        (n.projection = function (n) {
          return arguments.length ? e(Zu((t = n))) : t;
        }),
        n
      );
    }),
    (ao.svg.symbol = function () {
      function n(n, r) {
        return (Ul.get(t.call(this, n, r)) || $u)(e.call(this, n, r));
      }
      var t = Xu,
        e = Vu;
      return (
        (n.type = function (e) {
          return arguments.length ? ((t = En(e)), n) : t;
        }),
        (n.size = function (t) {
          return arguments.length ? ((e = En(t)), n) : e;
        }),
        n
      );
    });
  var Ul = ao.map({
    circle: $u,
    cross: function (n) {
      var t = Math.sqrt(n / 5) / 2;
      return (
        "M" +
        -3 * t +
        "," +
        -t +
        "H" +
        -t +
        "V" +
        -3 * t +
        "H" +
        t +
        "V" +
        -t +
        "H" +
        3 * t +
        "V" +
        t +
        "H" +
        t +
        "V" +
        3 * t +
        "H" +
        -t +
        "V" +
        t +
        "H" +
        -3 * t +
        "Z"
      );
    },
    diamond: function (n) {
      var t = Math.sqrt(n / (2 * Fl)),
        e = t * Fl;
      return "M0," + -t + "L" + e + ",0 0," + t + " " + -e + ",0Z";
    },
    square: function (n) {
      var t = Math.sqrt(n) / 2;
      return (
        "M" +
        -t +
        "," +
        -t +
        "L" +
        t +
        "," +
        -t +
        " " +
        t +
        "," +
        t +
        " " +
        -t +
        "," +
        t +
        "Z"
      );
    },
    "triangle-down": function (n) {
      var t = Math.sqrt(n / jl),
        e = (t * jl) / 2;
      return "M0," + e + "L" + t + "," + -e + " " + -t + "," + -e + "Z";
    },
    "triangle-up": function (n) {
      var t = Math.sqrt(n / jl),
        e = (t * jl) / 2;
      return "M0," + -e + "L" + t + "," + e + " " + -t + "," + e + "Z";
    },
  });
  ao.svg.symbolTypes = Ul.keys();
  var jl = Math.sqrt(3),
    Fl = Math.tan(30 * Yo);
  (Co.transition = function (n) {
    for (
      var t,
        e,
        r = Hl || ++Zl,
        i = Ku(n),
        u = [],
        o = Ol || { time: Date.now(), ease: Nr, delay: 0, duration: 250 },
        a = -1,
        l = this.length;
      ++a < l;

    ) {
      u.push((t = []));
      for (var c = this[a], f = -1, s = c.length; ++f < s; )
        (e = c[f]) && Qu(e, f, i, r, o), t.push(e);
    }
    return Wu(u, i, r);
  }),
    (Co.interrupt = function (n) {
      return this.each(null == n ? Il : Bu(Ku(n)));
    });
  var Hl,
    Ol,
    Il = Bu(Ku()),
    Yl = [],
    Zl = 0;
  (Yl.call = Co.call),
    (Yl.empty = Co.empty),
    (Yl.node = Co.node),
    (Yl.size = Co.size),
    (ao.transition = function (n, t) {
      return n && n.transition
        ? Hl
          ? n.transition(t)
          : n
        : ao.selection().transition(n);
    }),
    (ao.transition.prototype = Yl),
    (Yl.select = function (n) {
      var t,
        e,
        r,
        i = this.id,
        u = this.namespace,
        o = [];
      n = A(n);
      for (var a = -1, l = this.length; ++a < l; ) {
        o.push((t = []));
        for (var c = this[a], f = -1, s = c.length; ++f < s; )
          (r = c[f]) && (e = n.call(r, r.__data__, f, a))
            ? ("__data__" in r && (e.__data__ = r.__data__),
              Qu(e, f, u, i, r[u][i]),
              t.push(e))
            : t.push(null);
      }
      return Wu(o, u, i);
    }),
    (Yl.selectAll = function (n) {
      var t,
        e,
        r,
        i,
        u,
        o = this.id,
        a = this.namespace,
        l = [];
      n = C(n);
      for (var c = -1, f = this.length; ++c < f; )
        for (var s = this[c], h = -1, p = s.length; ++h < p; )
          if ((r = s[h])) {
            (u = r[a][o]), (e = n.call(r, r.__data__, h, c)), l.push((t = []));
            for (var g = -1, v = e.length; ++g < v; )
              (i = e[g]) && Qu(i, g, a, o, u), t.push(i);
          }
      return Wu(l, a, o);
    }),
    (Yl.filter = function (n) {
      var t,
        e,
        r,
        i = [];
      "function" != typeof n && (n = O(n));
      for (var u = 0, o = this.length; o > u; u++) {
        i.push((t = []));
        for (var e = this[u], a = 0, l = e.length; l > a; a++)
          (r = e[a]) && n.call(r, r.__data__, a, u) && t.push(r);
      }
      return Wu(i, this.namespace, this.id);
    }),
    (Yl.tween = function (n, t) {
      var e = this.id,
        r = this.namespace;
      return arguments.length < 2
        ? this.node()[r][e].tween.get(n)
        : Y(
            this,
            null == t
              ? function (t) {
                  t[r][e].tween.remove(n);
                }
              : function (i) {
                  i[r][e].tween.set(n, t);
                }
          );
    }),
    (Yl.attr = function (n, t) {
      function e() {
        this.removeAttribute(a);
      }
      function r() {
        this.removeAttributeNS(a.space, a.local);
      }
      function i(n) {
        return null == n
          ? e
          : ((n += ""),
            function () {
              var t,
                e = this.getAttribute(a);
              return (
                e !== n &&
                ((t = o(e, n)),
                function (n) {
                  this.setAttribute(a, t(n));
                })
              );
            });
      }
      function u(n) {
        return null == n
          ? r
          : ((n += ""),
            function () {
              var t,
                e = this.getAttributeNS(a.space, a.local);
              return (
                e !== n &&
                ((t = o(e, n)),
                function (n) {
                  this.setAttributeNS(a.space, a.local, t(n));
                })
              );
            });
      }
      if (arguments.length < 2) {
        for (t in n) this.attr(t, n[t]);
        return this;
      }
      var o = "transform" == n ? $r : Mr,
        a = ao.ns.qualify(n);
      return Ju(this, "attr." + n, t, a.local ? u : i);
    }),
    (Yl.attrTween = function (n, t) {
      function e(n, e) {
        var r = t.call(this, n, e, this.getAttribute(i));
        return (
          r &&
          function (n) {
            this.setAttribute(i, r(n));
          }
        );
      }
      function r(n, e) {
        var r = t.call(this, n, e, this.getAttributeNS(i.space, i.local));
        return (
          r &&
          function (n) {
            this.setAttributeNS(i.space, i.local, r(n));
          }
        );
      }
      var i = ao.ns.qualify(n);
      return this.tween("attr." + n, i.local ? r : e);
    }),
    (Yl.style = function (n, e, r) {
      function i() {
        this.style.removeProperty(n);
      }
      function u(e) {
        return null == e
          ? i
          : ((e += ""),
            function () {
              var i,
                u = t(this).getComputedStyle(this, null).getPropertyValue(n);
              return (
                u !== e &&
                ((i = Mr(u, e)),
                function (t) {
                  this.style.setProperty(n, i(t), r);
                })
              );
            });
      }
      var o = arguments.length;
      if (3 > o) {
        if ("string" != typeof n) {
          2 > o && (e = "");
          for (r in n) this.style(r, n[r], e);
          return this;
        }
        r = "";
      }
      return Ju(this, "style." + n, e, u);
    }),
    (Yl.styleTween = function (n, e, r) {
      function i(i, u) {
        var o = e.call(
          this,
          i,
          u,
          t(this).getComputedStyle(this, null).getPropertyValue(n)
        );
        return (
          o &&
          function (t) {
            this.style.setProperty(n, o(t), r);
          }
        );
      }
      return arguments.length < 3 && (r = ""), this.tween("style." + n, i);
    }),
    (Yl.text = function (n) {
      return Ju(this, "text", n, Gu);
    }),
    (Yl.remove = function () {
      var n = this.namespace;
      return this.each("end.transition", function () {
        var t;
        this[n].count < 2 && (t = this.parentNode) && t.removeChild(this);
      });
    }),
    (Yl.ease = function (n) {
      var t = this.id,
        e = this.namespace;
      return arguments.length < 1
        ? this.node()[e][t].ease
        : ("function" != typeof n && (n = ao.ease.apply(ao, arguments)),
          Y(this, function (r) {
            r[e][t].ease = n;
          }));
    }),
    (Yl.delay = function (n) {
      var t = this.id,
        e = this.namespace;
      return arguments.length < 1
        ? this.node()[e][t].delay
        : Y(
            this,
            "function" == typeof n
              ? function (r, i, u) {
                  r[e][t].delay = +n.call(r, r.__data__, i, u);
                }
              : ((n = +n),
                function (r) {
                  r[e][t].delay = n;
                })
          );
    }),
    (Yl.duration = function (n) {
      var t = this.id,
        e = this.namespace;
      return arguments.length < 1
        ? this.node()[e][t].duration
        : Y(
            this,
            "function" == typeof n
              ? function (r, i, u) {
                  r[e][t].duration = Math.max(1, n.call(r, r.__data__, i, u));
                }
              : ((n = Math.max(1, n)),
                function (r) {
                  r[e][t].duration = n;
                })
          );
    }),
    (Yl.each = function (n, t) {
      var e = this.id,
        r = this.namespace;
      if (arguments.length < 2) {
        var i = Ol,
          u = Hl;
        try {
          (Hl = e),
            Y(this, function (t, i, u) {
              (Ol = t[r][e]), n.call(t, t.__data__, i, u);
            });
        } finally {
          (Ol = i), (Hl = u);
        }
      } else
        Y(this, function (i) {
          var u = i[r][e];
          (u.event || (u.event = ao.dispatch("start", "end", "interrupt"))).on(
            n,
            t
          );
        });
      return this;
    }),
    (Yl.transition = function () {
      for (
        var n,
          t,
          e,
          r,
          i = this.id,
          u = ++Zl,
          o = this.namespace,
          a = [],
          l = 0,
          c = this.length;
        c > l;
        l++
      ) {
        a.push((n = []));
        for (var t = this[l], f = 0, s = t.length; s > f; f++)
          (e = t[f]) &&
            ((r = e[o][i]),
            Qu(e, f, o, u, {
              time: r.time,
              ease: r.ease,
              delay: r.delay + r.duration,
              duration: r.duration,
            })),
            n.push(e);
      }
      return Wu(a, o, u);
    }),
    (ao.svg.axis = function () {
      function n(n) {
        n.each(function () {
          var n,
            c = ao.select(this),
            f = this.__chart__ || e,
            s = (this.__chart__ = e.copy()),
            h = null == l ? (s.ticks ? s.ticks.apply(s, a) : s.domain()) : l,
            p = null == t ? (s.tickFormat ? s.tickFormat.apply(s, a) : m) : t,
            g = c.selectAll(".tick").data(h, s),
            v = g
              .enter()
              .insert("g", ".domain")
              .attr("class", "tick")
              .style("opacity", Uo),
            d = ao.transition(g.exit()).style("opacity", Uo).remove(),
            y = ao.transition(g.order()).style("opacity", 1),
            M = Math.max(i, 0) + o,
            x = Zi(s),
            b = c.selectAll(".domain").data([0]),
            _ =
              (b.enter().append("path").attr("class", "domain"),
              ao.transition(b));
          v.append("line"), v.append("text");
          var w,
            S,
            k,
            N,
            E = v.select("line"),
            A = y.select("line"),
            C = g.select("text").text(p),
            z = v.select("text"),
            L = y.select("text"),
            q = "top" === r || "left" === r ? -1 : 1;
          if (
            ("bottom" === r || "top" === r
              ? ((n = no),
                (w = "x"),
                (k = "y"),
                (S = "x2"),
                (N = "y2"),
                C.attr("dy", 0 > q ? "0em" : ".71em").style(
                  "text-anchor",
                  "middle"
                ),
                _.attr(
                  "d",
                  "M" + x[0] + "," + q * u + "V0H" + x[1] + "V" + q * u
                ))
              : ((n = to),
                (w = "y"),
                (k = "x"),
                (S = "y2"),
                (N = "x2"),
                C.attr("dy", ".32em").style(
                  "text-anchor",
                  0 > q ? "end" : "start"
                ),
                _.attr(
                  "d",
                  "M" + q * u + "," + x[0] + "H0V" + x[1] + "H" + q * u
                )),
            E.attr(N, q * i),
            z.attr(k, q * M),
            A.attr(S, 0).attr(N, q * i),
            L.attr(w, 0).attr(k, q * M),
            s.rangeBand)
          ) {
            var T = s,
              R = T.rangeBand() / 2;
            f = s = function (n) {
              return T(n) + R;
            };
          } else f.rangeBand ? (f = s) : d.call(n, s, f);
          v.call(n, f, s), y.call(n, s, s);
        });
      }
      var t,
        e = ao.scale.linear(),
        r = Vl,
        i = 6,
        u = 6,
        o = 3,
        a = [10],
        l = null;
      return (
        (n.scale = function (t) {
          return arguments.length ? ((e = t), n) : e;
        }),
        (n.orient = function (t) {
          return arguments.length ? ((r = t in Xl ? t + "" : Vl), n) : r;
        }),
        (n.ticks = function () {
          return arguments.length ? ((a = co(arguments)), n) : a;
        }),
        (n.tickValues = function (t) {
          return arguments.length ? ((l = t), n) : l;
        }),
        (n.tickFormat = function (e) {
          return arguments.length ? ((t = e), n) : t;
        }),
        (n.tickSize = function (t) {
          var e = arguments.length;
          return e ? ((i = +t), (u = +arguments[e - 1]), n) : i;
        }),
        (n.innerTickSize = function (t) {
          return arguments.length ? ((i = +t), n) : i;
        }),
        (n.outerTickSize = function (t) {
          return arguments.length ? ((u = +t), n) : u;
        }),
        (n.tickPadding = function (t) {
          return arguments.length ? ((o = +t), n) : o;
        }),
        (n.tickSubdivide = function () {
          return arguments.length && n;
        }),
        n
      );
    });
  var Vl = "bottom",
    Xl = { top: 1, right: 1, bottom: 1, left: 1 };
  ao.svg.brush = function () {
    function n(t) {
      t.each(function () {
        var t = ao
            .select(this)
            .style("pointer-events", "all")
            .style("-webkit-tap-highlight-color", "rgba(0,0,0,0)")
            .on("mousedown.brush", u)
            .on("touchstart.brush", u),
          o = t.selectAll(".background").data([0]);
        o
          .enter()
          .append("rect")
          .attr("class", "background")
          .style("visibility", "hidden")
          .style("cursor", "crosshair"),
          t
            .selectAll(".extent")
            .data([0])
            .enter()
            .append("rect")
            .attr("class", "extent")
            .style("cursor", "move");
        var a = t.selectAll(".resize").data(v, m);
        a.exit().remove(),
          a
            .enter()
            .append("g")
            .attr("class", function (n) {
              return "resize " + n;
            })
            .style("cursor", function (n) {
              return $l[n];
            })
            .append("rect")
            .attr("x", function (n) {
              return /[ew]$/.test(n) ? -3 : null;
            })
            .attr("y", function (n) {
              return /^[ns]/.test(n) ? -3 : null;
            })
            .attr("width", 6)
            .attr("height", 6)
            .style("visibility", "hidden"),
          a.style("display", n.empty() ? "none" : null);
        var l,
          s = ao.transition(t),
          h = ao.transition(o);
        c && ((l = Zi(c)), h.attr("x", l[0]).attr("width", l[1] - l[0]), r(s)),
          f &&
            ((l = Zi(f)), h.attr("y", l[0]).attr("height", l[1] - l[0]), i(s)),
          e(s);
      });
    }
    function e(n) {
      n.selectAll(".resize").attr("transform", function (n) {
        return "translate(" + s[+/e$/.test(n)] + "," + h[+/^s/.test(n)] + ")";
      });
    }
    function r(n) {
      n.select(".extent").attr("x", s[0]),
        n.selectAll(".extent,.n>rect,.s>rect").attr("width", s[1] - s[0]);
    }
    function i(n) {
      n.select(".extent").attr("y", h[0]),
        n.selectAll(".extent,.e>rect,.w>rect").attr("height", h[1] - h[0]);
    }
    function u() {
      function u() {
        32 == ao.event.keyCode &&
          (C || ((M = null), (L[0] -= s[1]), (L[1] -= h[1]), (C = 2)), S());
      }
      function v() {
        32 == ao.event.keyCode &&
          2 == C &&
          ((L[0] += s[1]), (L[1] += h[1]), (C = 0), S());
      }
      function d() {
        var n = ao.mouse(b),
          t = !1;
        x && ((n[0] += x[0]), (n[1] += x[1])),
          C ||
            (ao.event.altKey
              ? (M || (M = [(s[0] + s[1]) / 2, (h[0] + h[1]) / 2]),
                (L[0] = s[+(n[0] < M[0])]),
                (L[1] = h[+(n[1] < M[1])]))
              : (M = null)),
          E && y(n, c, 0) && (r(k), (t = !0)),
          A && y(n, f, 1) && (i(k), (t = !0)),
          t && (e(k), w({ type: "brush", mode: C ? "move" : "resize" }));
      }
      function y(n, t, e) {
        var r,
          i,
          u = Zi(t),
          l = u[0],
          c = u[1],
          f = L[e],
          v = e ? h : s,
          d = v[1] - v[0];
        return (
          C && ((l -= f), (c -= d + f)),
          (r = (e ? g : p) ? Math.max(l, Math.min(c, n[e])) : n[e]),
          C
            ? (i = (r += f) + d)
            : (M && (f = Math.max(l, Math.min(c, 2 * M[e] - r))),
              r > f ? ((i = r), (r = f)) : (i = f)),
          v[0] != r || v[1] != i
            ? (e ? (a = null) : (o = null), (v[0] = r), (v[1] = i), !0)
            : void 0
        );
      }
      function m() {
        d(),
          k
            .style("pointer-events", "all")
            .selectAll(".resize")
            .style("display", n.empty() ? "none" : null),
          ao.select("body").style("cursor", null),
          q
            .on("mousemove.brush", null)
            .on("mouseup.brush", null)
            .on("touchmove.brush", null)
            .on("touchend.brush", null)
            .on("keydown.brush", null)
            .on("keyup.brush", null),
          z(),
          w({ type: "brushend" });
      }
      var M,
        x,
        b = this,
        _ = ao.select(ao.event.target),
        w = l.of(b, arguments),
        k = ao.select(b),
        N = _.datum(),
        E = !/^(n|s)$/.test(N) && c,
        A = !/^(e|w)$/.test(N) && f,
        C = _.classed("extent"),
        z = W(b),
        L = ao.mouse(b),
        q = ao.select(t(b)).on("keydown.brush", u).on("keyup.brush", v);
      if (
        (ao.event.changedTouches
          ? q.on("touchmove.brush", d).on("touchend.brush", m)
          : q.on("mousemove.brush", d).on("mouseup.brush", m),
        k.interrupt().selectAll("*").interrupt(),
        C)
      )
        (L[0] = s[0] - L[0]), (L[1] = h[0] - L[1]);
      else if (N) {
        var T = +/w$/.test(N),
          R = +/^n/.test(N);
        (x = [s[1 - T] - L[0], h[1 - R] - L[1]]), (L[0] = s[T]), (L[1] = h[R]);
      } else ao.event.altKey && (M = L.slice());
      k
        .style("pointer-events", "none")
        .selectAll(".resize")
        .style("display", null),
        ao.select("body").style("cursor", _.style("cursor")),
        w({ type: "brushstart" }),
        d();
    }
    var o,
      a,
      l = N(n, "brushstart", "brush", "brushend"),
      c = null,
      f = null,
      s = [0, 0],
      h = [0, 0],
      p = !0,
      g = !0,
      v = Bl[0];
    return (
      (n.event = function (n) {
        n.each(function () {
          var n = l.of(this, arguments),
            t = { x: s, y: h, i: o, j: a },
            e = this.__chart__ || t;
          (this.__chart__ = t),
            Hl
              ? ao
                  .select(this)
                  .transition()
                  .each("start.brush", function () {
                    (o = e.i),
                      (a = e.j),
                      (s = e.x),
                      (h = e.y),
                      n({ type: "brushstart" });
                  })
                  .tween("brush:brush", function () {
                    var e = xr(s, t.x),
                      r = xr(h, t.y);
                    return (
                      (o = a = null),
                      function (i) {
                        (s = t.x = e(i)),
                          (h = t.y = r(i)),
                          n({ type: "brush", mode: "resize" });
                      }
                    );
                  })
                  .each("end.brush", function () {
                    (o = t.i),
                      (a = t.j),
                      n({ type: "brush", mode: "resize" }),
                      n({ type: "brushend" });
                  })
              : (n({ type: "brushstart" }),
                n({ type: "brush", mode: "resize" }),
                n({ type: "brushend" }));
        });
      }),
      (n.x = function (t) {
        return arguments.length ? ((c = t), (v = Bl[(!c << 1) | !f]), n) : c;
      }),
      (n.y = function (t) {
        return arguments.length ? ((f = t), (v = Bl[(!c << 1) | !f]), n) : f;
      }),
      (n.clamp = function (t) {
        return arguments.length
          ? (c && f
              ? ((p = !!t[0]), (g = !!t[1]))
              : c
              ? (p = !!t)
              : f && (g = !!t),
            n)
          : c && f
          ? [p, g]
          : c
          ? p
          : f
          ? g
          : null;
      }),
      (n.extent = function (t) {
        var e, r, i, u, l;
        return arguments.length
          ? (c &&
              ((e = t[0]),
              (r = t[1]),
              f && ((e = e[0]), (r = r[0])),
              (o = [e, r]),
              c.invert && ((e = c(e)), (r = c(r))),
              e > r && ((l = e), (e = r), (r = l)),
              (e == s[0] && r == s[1]) || (s = [e, r])),
            f &&
              ((i = t[0]),
              (u = t[1]),
              c && ((i = i[1]), (u = u[1])),
              (a = [i, u]),
              f.invert && ((i = f(i)), (u = f(u))),
              i > u && ((l = i), (i = u), (u = l)),
              (i == h[0] && u == h[1]) || (h = [i, u])),
            n)
          : (c &&
              (o
                ? ((e = o[0]), (r = o[1]))
                : ((e = s[0]),
                  (r = s[1]),
                  c.invert && ((e = c.invert(e)), (r = c.invert(r))),
                  e > r && ((l = e), (e = r), (r = l)))),
            f &&
              (a
                ? ((i = a[0]), (u = a[1]))
                : ((i = h[0]),
                  (u = h[1]),
                  f.invert && ((i = f.invert(i)), (u = f.invert(u))),
                  i > u && ((l = i), (i = u), (u = l)))),
            c && f
              ? [
                  [e, i],
                  [r, u],
                ]
              : c
              ? [e, r]
              : f && [i, u]);
      }),
      (n.clear = function () {
        return n.empty() || ((s = [0, 0]), (h = [0, 0]), (o = a = null)), n;
      }),
      (n.empty = function () {
        return (!!c && s[0] == s[1]) || (!!f && h[0] == h[1]);
      }),
      ao.rebind(n, l, "on")
    );
  };
  var $l = {
      n: "ns-resize",
      e: "ew-resize",
      s: "ns-resize",
      w: "ew-resize",
      nw: "nwse-resize",
      ne: "nesw-resize",
      se: "nwse-resize",
      sw: "nesw-resize",
    },
    Bl = [
      ["n", "e", "s", "w", "nw", "ne", "se", "sw"],
      ["e", "w"],
      ["n", "s"],
      [],
    ],
    Wl = (ga.format = xa.timeFormat),
    Jl = Wl.utc,
    Gl = Jl("%Y-%m-%dT%H:%M:%S.%LZ");
  (Wl.iso =
    Date.prototype.toISOString && +new Date("2000-01-01T00:00:00.000Z")
      ? eo
      : Gl),
    (eo.parse = function (n) {
      var t = new Date(n);
      return isNaN(t) ? null : t;
    }),
    (eo.toString = Gl.toString),
    (ga.second = On(
      function (n) {
        return new va(1e3 * Math.floor(n / 1e3));
      },
      function (n, t) {
        n.setTime(n.getTime() + 1e3 * Math.floor(t));
      },
      function (n) {
        return n.getSeconds();
      }
    )),
    (ga.seconds = ga.second.range),
    (ga.seconds.utc = ga.second.utc.range),
    (ga.minute = On(
      function (n) {
        return new va(6e4 * Math.floor(n / 6e4));
      },
      function (n, t) {
        n.setTime(n.getTime() + 6e4 * Math.floor(t));
      },
      function (n) {
        return n.getMinutes();
      }
    )),
    (ga.minutes = ga.minute.range),
    (ga.minutes.utc = ga.minute.utc.range),
    (ga.hour = On(
      function (n) {
        var t = n.getTimezoneOffset() / 60;
        return new va(36e5 * (Math.floor(n / 36e5 - t) + t));
      },
      function (n, t) {
        n.setTime(n.getTime() + 36e5 * Math.floor(t));
      },
      function (n) {
        return n.getHours();
      }
    )),
    (ga.hours = ga.hour.range),
    (ga.hours.utc = ga.hour.utc.range),
    (ga.month = On(
      function (n) {
        return (n = ga.day(n)), n.setDate(1), n;
      },
      function (n, t) {
        n.setMonth(n.getMonth() + t);
      },
      function (n) {
        return n.getMonth();
      }
    )),
    (ga.months = ga.month.range),
    (ga.months.utc = ga.month.utc.range);
  var Kl = [
      1e3, 5e3, 15e3, 3e4, 6e4, 3e5, 9e5, 18e5, 36e5, 108e5, 216e5, 432e5,
      864e5, 1728e5, 6048e5, 2592e6, 7776e6, 31536e6,
    ],
    Ql = [
      [ga.second, 1],
      [ga.second, 5],
      [ga.second, 15],
      [ga.second, 30],
      [ga.minute, 1],
      [ga.minute, 5],
      [ga.minute, 15],
      [ga.minute, 30],
      [ga.hour, 1],
      [ga.hour, 3],
      [ga.hour, 6],
      [ga.hour, 12],
      [ga.day, 1],
      [ga.day, 2],
      [ga.week, 1],
      [ga.month, 1],
      [ga.month, 3],
      [ga.year, 1],
    ],
    nc = Wl.multi([
      [
        ".%L",
        function (n) {
          return n.getMilliseconds();
        },
      ],
      [
        ":%S",
        function (n) {
          return n.getSeconds();
        },
      ],
      [
        "%I:%M",
        function (n) {
          return n.getMinutes();
        },
      ],
      [
        "%I %p",
        function (n) {
          return n.getHours();
        },
      ],
      [
        "%a %d",
        function (n) {
          return n.getDay() && 1 != n.getDate();
        },
      ],
      [
        "%b %d",
        function (n) {
          return 1 != n.getDate();
        },
      ],
      [
        "%B",
        function (n) {
          return n.getMonth();
        },
      ],
      ["%Y", zt],
    ]),
    tc = {
      range: function (n, t, e) {
        return ao.range(Math.ceil(n / e) * e, +t, e).map(io);
      },
      floor: m,
      ceil: m,
    };
  (Ql.year = ga.year),
    (ga.scale = function () {
      return ro(ao.scale.linear(), Ql, nc);
    });
  var ec = Ql.map(function (n) {
      return [n[0].utc, n[1]];
    }),
    rc = Jl.multi([
      [
        ".%L",
        function (n) {
          return n.getUTCMilliseconds();
        },
      ],
      [
        ":%S",
        function (n) {
          return n.getUTCSeconds();
        },
      ],
      [
        "%I:%M",
        function (n) {
          return n.getUTCMinutes();
        },
      ],
      [
        "%I %p",
        function (n) {
          return n.getUTCHours();
        },
      ],
      [
        "%a %d",
        function (n) {
          return n.getUTCDay() && 1 != n.getUTCDate();
        },
      ],
      [
        "%b %d",
        function (n) {
          return 1 != n.getUTCDate();
        },
      ],
      [
        "%B",
        function (n) {
          return n.getUTCMonth();
        },
      ],
      ["%Y", zt],
    ]);
  (ec.year = ga.year.utc),
    (ga.scale.utc = function () {
      return ro(ao.scale.linear(), ec, rc);
    }),
    (ao.text = An(function (n) {
      return n.responseText;
    })),
    (ao.json = function (n, t) {
      return Cn(n, "application/json", uo, t);
    }),
    (ao.html = function (n, t) {
      return Cn(n, "text/html", oo, t);
    }),
    (ao.xml = An(function (n) {
      return n.responseXML;
    })),
    "function" == typeof define && define.amd
      ? ((this.d3 = ao), define(ao))
      : "object" == typeof module && module.exports
      ? (module.exports = ao)
      : (this.d3 = ao);
})();

// topojson/topojson-client Version 1.8.0. Copyright 2016 Mike Bostock.
!(function (n, t) {
  "object" == typeof exports && "undefined" != typeof module
    ? t(exports)
    : "function" == typeof define && define.amd
    ? define(["exports"], t)
    : t((n.topojson = n.topojson || {}));
})(this, function (n) {
  "use strict";
  function t(n) {
    if (!n) return h;
    var t,
      r,
      e = n.scale[0],
      o = n.scale[1],
      i = n.translate[0],
      u = n.translate[1];
    return function (n, f) {
      f || (t = r = 0),
        (n[0] = (t += n[0]) * e + i),
        (n[1] = (r += n[1]) * o + u);
    };
  }
  function r(n) {
    if (!n) return h;
    var t,
      r,
      e = n.scale[0],
      o = n.scale[1],
      i = n.translate[0],
      u = n.translate[1];
    return function (n, f) {
      f || (t = r = 0);
      var c = Math.round((n[0] - i) / e),
        a = Math.round((n[1] - u) / o);
      (n[0] = c - t), (n[1] = a - r), (t = c), (r = a);
    };
  }
  function e(n, t) {
    for (var r, e = n.length, o = e - t; o < --e; )
      (r = n[o]), (n[o++] = n[e]), (n[e] = r);
  }
  function o(n, t) {
    for (var r = 0, e = n.length; r < e; ) {
      var o = (r + e) >>> 1;
      n[o] < t ? (r = o + 1) : (e = o);
    }
    return r;
  }
  function i(n, t) {
    var r = {
      type: "Feature",
      id: t.id,
      properties: t.properties || {},
      geometry: u(n, t),
    };
    return null == t.id && delete r.id, r;
  }
  function u(n, r) {
    function o(n, t) {
      t.length && t.pop();
      for (var r, o = l[n < 0 ? ~n : n], i = 0, u = o.length; i < u; ++i)
        t.push((r = o[i].slice())), s(r, i);
      n < 0 && e(t, u);
    }
    function i(n) {
      return (n = n.slice()), s(n, 0), n;
    }
    function u(n) {
      for (var t = [], r = 0, e = n.length; r < e; ++r) o(n[r], t);
      return t.length < 2 && t.push(t[0].slice()), t;
    }
    function f(n) {
      for (var t = u(n); t.length < 4; ) t.push(t[0].slice());
      return t;
    }
    function c(n) {
      return n.map(f);
    }
    function a(n) {
      var t = n.type;
      return "GeometryCollection" === t
        ? { type: t, geometries: n.geometries.map(a) }
        : t in h
        ? { type: t, coordinates: h[t](n) }
        : null;
    }
    var s = t(n.transform),
      l = n.arcs,
      h = {
        Point: function (n) {
          return i(n.coordinates);
        },
        MultiPoint: function (n) {
          return n.coordinates.map(i);
        },
        LineString: function (n) {
          return u(n.arcs);
        },
        MultiLineString: function (n) {
          return n.arcs.map(u);
        },
        Polygon: function (n) {
          return c(n.arcs);
        },
        MultiPolygon: function (n) {
          return n.arcs.map(c);
        },
      };
    return a(r);
  }
  function f(n, t, r) {
    function e(n) {
      var t = n < 0 ? ~n : n;
      (a[t] || (a[t] = [])).push({ i: n, g: c });
    }
    function o(n) {
      n.forEach(e);
    }
    function i(n) {
      n.forEach(o);
    }
    function u(n) {
      "GeometryCollection" === n.type
        ? n.geometries.forEach(u)
        : n.type in s && ((c = n), s[n.type](n.arcs));
    }
    var f = [];
    if (arguments.length > 1) {
      var c,
        a = [],
        s = {
          LineString: o,
          MultiLineString: i,
          Polygon: i,
          MultiPolygon: function (n) {
            n.forEach(i);
          },
        };
      u(t),
        a.forEach(
          arguments.length < 3
            ? function (n) {
                f.push(n[0].i);
              }
            : function (n) {
                r(n[0].g, n[n.length - 1].g) && f.push(n[0].i);
              }
        );
    } else for (var l = 0, h = n.arcs.length; l < h; ++l) f.push(l);
    return { type: "MultiLineString", arcs: v(n, f) };
  }
  function c(n) {
    var t = n[0],
      r = n[1],
      e = n[2];
    return Math.abs(
      (t[0] - e[0]) * (r[1] - t[1]) - (t[0] - r[0]) * (e[1] - t[1])
    );
  }
  function a(n) {
    for (var t, r = -1, e = n.length, o = n[e - 1], i = 0; ++r < e; )
      (t = o), (o = n[r]), (i += t[0] * o[1] - t[1] * o[0]);
    return i / 2;
  }
  function s(n, t) {
    function r(n) {
      n.forEach(function (t) {
        t.forEach(function (t) {
          (o[(t = t < 0 ? ~t : t)] || (o[t] = [])).push(n);
        });
      }),
        i.push(n);
    }
    function e(t) {
      return Math.abs(a(u(n, { type: "Polygon", arcs: [t] }).coordinates[0]));
    }
    var o = {},
      i = [],
      f = [];
    return (
      t.forEach(function (n) {
        "Polygon" === n.type
          ? r(n.arcs)
          : "MultiPolygon" === n.type && n.arcs.forEach(r);
      }),
      i.forEach(function (n) {
        if (!n._) {
          var t = [],
            r = [n];
          for (n._ = 1, f.push(t); (n = r.pop()); )
            t.push(n),
              n.forEach(function (n) {
                n.forEach(function (n) {
                  o[n < 0 ? ~n : n].forEach(function (n) {
                    n._ || ((n._ = 1), r.push(n));
                  });
                });
              });
        }
      }),
      i.forEach(function (n) {
        delete n._;
      }),
      {
        type: "MultiPolygon",
        arcs: f.map(function (t) {
          var r,
            i = [];
          if (
            (t.forEach(function (n) {
              n.forEach(function (n) {
                n.forEach(function (n) {
                  o[n < 0 ? ~n : n].length < 2 && i.push(n);
                });
              });
            }),
            (i = v(n, i)),
            (r = i.length) > 1)
          )
            for (var u, f, c = 1, a = e(i[0]); c < r; ++c)
              (u = e(i[c])) > a &&
                ((f = i[0]), (i[0] = i[c]), (i[c] = f), (a = u));
          return i;
        }),
      }
    );
  }
  function l(n, t) {
    return n[1][2] - t[1][2];
  }
  var h = function () {},
    p = function (n, t) {
      return "GeometryCollection" === t.type
        ? {
            type: "FeatureCollection",
            features: t.geometries.map(function (t) {
              return i(n, t);
            }),
          }
        : i(n, t);
    },
    v = function (n, t) {
      function r(t) {
        var r,
          e = n.arcs[t < 0 ? ~t : t],
          o = e[0];
        return (
          n.transform
            ? ((r = [0, 0]),
              e.forEach(function (n) {
                (r[0] += n[0]), (r[1] += n[1]);
              }))
            : (r = e[e.length - 1]),
          t < 0 ? [r, o] : [o, r]
        );
      }
      function e(n, t) {
        for (var r in n) {
          var e = n[r];
          delete t[e.start],
            delete e.start,
            delete e.end,
            e.forEach(function (n) {
              o[n < 0 ? ~n : n] = 1;
            }),
            f.push(e);
        }
      }
      var o = {},
        i = {},
        u = {},
        f = [],
        c = -1;
      return (
        t.forEach(function (r, e) {
          var o,
            i = n.arcs[r < 0 ? ~r : r];
          i.length < 3 &&
            !i[1][0] &&
            !i[1][1] &&
            ((o = t[++c]), (t[c] = r), (t[e] = o));
        }),
        t.forEach(function (n) {
          var t,
            e,
            o = r(n),
            f = o[0],
            c = o[1];
          if ((t = u[f]))
            if ((delete u[t.end], t.push(n), (t.end = c), (e = i[c]))) {
              delete i[e.start];
              var a = e === t ? t : t.concat(e);
              i[(a.start = t.start)] = u[(a.end = e.end)] = a;
            } else i[t.start] = u[t.end] = t;
          else if ((t = i[c]))
            if ((delete i[t.start], t.unshift(n), (t.start = f), (e = u[f]))) {
              delete u[e.end];
              var s = e === t ? t : e.concat(t);
              i[(s.start = e.start)] = u[(s.end = t.end)] = s;
            } else i[t.start] = u[t.end] = t;
          else (t = [n]), (i[(t.start = f)] = u[(t.end = c)] = t);
        }),
        e(u, i),
        e(i, u),
        t.forEach(function (n) {
          o[n < 0 ? ~n : n] || f.push([n]);
        }),
        f
      );
    },
    g = function (n) {
      return u(n, f.apply(this, arguments));
    },
    d = function (n) {
      return u(n, s.apply(this, arguments));
    },
    y = function (n) {
      function t(n, t) {
        n.forEach(function (n) {
          n < 0 && (n = ~n);
          var r = i[n];
          r ? r.push(t) : (i[n] = [t]);
        });
      }
      function r(n, r) {
        n.forEach(function (n) {
          t(n, r);
        });
      }
      function e(n, t) {
        "GeometryCollection" === n.type
          ? n.geometries.forEach(function (n) {
              e(n, t);
            })
          : n.type in f && f[n.type](n.arcs, t);
      }
      var i = {},
        u = n.map(function () {
          return [];
        }),
        f = {
          LineString: t,
          MultiLineString: r,
          Polygon: r,
          MultiPolygon: function (n, t) {
            n.forEach(function (n) {
              r(n, t);
            });
          },
        };
      n.forEach(e);
      for (var c in i)
        for (var a = i[c], s = a.length, l = 0; l < s; ++l)
          for (var h = l + 1; h < s; ++h) {
            var p,
              v = a[l],
              g = a[h];
            (p = u[v])[(c = o(p, g))] !== g && p.splice(c, 0, g),
              (p = u[g])[(c = o(p, v))] !== v && p.splice(c, 0, v);
          }
      return u;
    },
    m = function () {
      function n(n, t) {
        for (; t > 0; ) {
          var r = ((t + 1) >> 1) - 1,
            o = e[r];
          if (l(n, o) >= 0) break;
          (e[(o._ = t)] = o), (e[(n._ = t = r)] = n);
        }
      }
      function t(n, t) {
        for (;;) {
          var r = (t + 1) << 1,
            i = r - 1,
            u = t,
            f = e[u];
          if (
            (i < o && l(e[i], f) < 0 && (f = e[(u = i)]),
            r < o && l(e[r], f) < 0 && (f = e[(u = r)]),
            u === t)
          )
            break;
          (e[(f._ = t)] = f), (e[(n._ = t = u)] = n);
        }
      }
      var r = {},
        e = [],
        o = 0;
      return (
        (r.push = function (t) {
          return n((e[(t._ = o)] = t), o++), o;
        }),
        (r.pop = function () {
          if (!(o <= 0)) {
            var n,
              r = e[0];
            return --o > 0 && ((n = e[o]), t((e[(n._ = 0)] = n), 0)), r;
          }
        }),
        (r.remove = function (r) {
          var i,
            u = r._;
          if (e[u] === r)
            return (
              u !== --o &&
                ((i = e[o]), (l(i, r) < 0 ? n : t)((e[(i._ = u)] = i), u)),
              u
            );
        }),
        r
      );
    },
    E = function (n, e) {
      function o(n) {
        f.remove(n), (n[1][2] = e(n)), f.push(n);
      }
      var i = t(n.transform),
        u = r(n.transform),
        f = m();
      return (
        null == e && (e = c),
        n.arcs.forEach(function (n) {
          var t,
            r,
            c,
            a,
            s = [],
            l = 0;
          for (r = 0, c = n.length; r < c; ++r)
            (a = n[r]), i((n[r] = [a[0], a[1], 1 / 0]), r);
          for (r = 1, c = n.length - 1; r < c; ++r)
            (t = n.slice(r - 1, r + 2)), (t[1][2] = e(t)), s.push(t), f.push(t);
          for (r = 0, c = s.length; r < c; ++r)
            (t = s[r]), (t.previous = s[r - 1]), (t.next = s[r + 1]);
          for (; (t = f.pop()); ) {
            var h = t.previous,
              p = t.next;
            t[1][2] < l ? (t[1][2] = l) : (l = t[1][2]),
              h && ((h.next = p), (h[2] = t[2]), o(h)),
              p && ((p.previous = h), (p[0] = t[0]), o(p));
          }
          n.forEach(u);
        }),
        n
      );
    };
  (n.mesh = g),
    (n.meshArcs = f),
    (n.merge = d),
    (n.mergeArcs = s),
    (n.feature = p),
    (n.neighbors = y),
    (n.presimplify = E),
    Object.defineProperty(n, "__esModule", { value: !0 });
});

/*! Planetary.js 1.1.3 | (c) 2013 Michelle Tilley | Released under MIT License */
!(function (n, t) {
  "function" == typeof define && define.amd
    ? define(["d3", "topojson"], function (o, e) {
        return (n.planetaryjs = t(o, e, n));
      })
    : "object" == typeof exports
    ? (module.exports = t(require("d3"), require("topojson")))
    : (n.planetaryjs = t(n.d3, n.topojson, n));
})(this, function (n, t, o) {
  "use strict";
  var e = null;
  o && (e = o.planetaryjs);
  var i = [],
    r = function (t, o, e) {
      n.timer(function () {
        if (t.stopped) return !0;
        t.context.clearRect(0, 0, o.width, o.height);
        for (var n = 0; n < e.onDraw.length; n++) e.onDraw[n]();
      });
    },
    l = function (n, t) {
      for (var o = i.length - 1; o >= 0; o--) t.unshift(i[o]);
      for (
        0 === t.length &&
          (c.plugins.earth && n.loadPlugin(c.plugins.earth()),
          c.plugins.pings && n.loadPlugin(c.plugins.pings())),
          o = 0;
        o < t.length;
        o++
      )
        t[o](n);
    },
    a = function (n, t, o) {
      if (o.onInit.length) {
        var e = 0,
          i = function (n) {
            var t = o.onInit[e];
            t.length
              ? t(function () {
                  e++, n();
                })
              : (t(), e++, setTimeout(n, 0));
          },
          l = function () {
            e >= o.onInit.length ? r(n, t, o) : i(l);
          };
        i(l);
      } else r(n, t, o);
    },
    u = function (n, t, o, e) {
      (n.canvas = t),
        (n.context = t.getContext("2d")),
        n.stopped !== !0 && l(n, o),
        (n.stopped = !1),
        a(n, t, e);
    },
    c = {
      plugins: {},
      noConflict: function () {
        return (o.planetaryjs = e), c;
      },
      loadPlugin: function (n) {
        i.push(n);
      },
      planet: function () {
        var t = [],
          o = { onInit: [], onDraw: [], onStop: [] },
          e = {
            plugins: {},
            draw: function (n) {
              u(e, n, t, o);
            },
            onInit: function (n) {
              o.onInit.push(n);
            },
            onDraw: function (n) {
              o.onDraw.push(n);
            },
            onStop: function (n) {
              o.onStop.push(n);
            },
            loadPlugin: function (n) {
              t.push(n);
            },
            stop: function () {
              e.stopped = !0;
              for (var n = 0; n < o.onStop.length; n++) o.onStop[n](e);
            },
            withSavedContext: function (n) {
              if (!this.context)
                throw new Error("No canvas to fetch context for");
              this.context.save(), n(this.context), this.context.restore();
            },
          };
        return (
          (e.projection = n.geo.orthographic().clipAngle(90)),
          (e.path = n.geo.path().projection(e.projection)),
          e
        );
      },
    };
  return (
    (c.plugins.topojson = function (t) {
      return function (o) {
        (o.plugins.topojson = {}),
          o.onInit(function (e) {
            if (t.world) (o.plugins.topojson.world = t.world), setTimeout(e, 0);
            else {
              var i = t.file || "world-110m.json";
              n.json(i, function (n, t) {
                if (n) throw new Error("Could not load JSON " + i);
                (o.plugins.topojson.world = t), e();
              });
            }
          });
      };
    }),
    (c.plugins.oceans = function (n) {
      return function (t) {
        t.onDraw(function () {
          t.withSavedContext(function (o) {
            o.beginPath(),
              t.path.context(o)({ type: "Sphere" }),
              (o.fillStyle = n.fill || "black"),
              o.fill();
          });
        });
      };
    }),
    (c.plugins.land = function (n) {
      return function (o) {
        var e = null;
        o.onInit(function () {
          var n = o.plugins.topojson.world;
          e = t.feature(n, n.objects.land);
        }),
          o.onDraw(function () {
            o.withSavedContext(function (t) {
              t.beginPath(),
                o.path.context(t)(e),
                n.fill !== !1 && ((t.fillStyle = n.fill || "white"), t.fill()),
                n.stroke &&
                  (n.lineWidth && (t.lineWidth = n.lineWidth),
                  (t.strokeStyle = n.stroke),
                  t.stroke());
            });
          });
      };
    }),
    (c.plugins.borders = function (n) {
      return function (o) {
        var e = null,
          i = {
            internal: function (n, t) {
              return n.id !== t.id;
            },
            external: function (n, t) {
              return n.id === t.id;
            },
            both: function () {
              return !0;
            },
          };
        o.onInit(function () {
          var r = o.plugins.topojson.world,
            l = r.objects.countries,
            a = n.type || "internal";
          e = t.mesh(r, l, i[a]);
        }),
          o.onDraw(function () {
            o.withSavedContext(function (t) {
              t.beginPath(),
                o.path.context(t)(e),
                (t.strokeStyle = n.stroke || "gray"),
                n.lineWidth && (t.lineWidth = n.lineWidth),
                t.stroke();
            });
          });
      };
    }),
    (c.plugins.earth = function (n) {
      n = n || {};
      var t = n.topojson || {},
        o = n.oceans || {},
        e = n.land || {},
        i = n.borders || {};
      return function (n) {
        c.plugins.topojson(t)(n),
          c.plugins.oceans(o)(n),
          c.plugins.land(e)(n),
          c.plugins.borders(i)(n);
      };
    }),
    (c.plugins.pings = function (t) {
      var o = [];
      t = t || {};
      var e = function (n, e, i) {
          (i = i || {}),
            (i.color = i.color || t.color || "white"),
            (i.angle = i.angle || t.angle || 5),
            (i.ttl = i.ttl || t.ttl || 2e3);
          var r = { time: new Date(), options: i };
          t.latitudeFirst
            ? ((r.lat = n), (r.lng = e))
            : ((r.lng = n), (r.lat = e)),
            o.push(r);
        },
        i = function (n, t, e) {
          for (var i = [], l = 0; l < o.length; l++) {
            var a = o[l],
              u = e - a.time;
            u < a.options.ttl && (i.push(a), r(n, t, e, u, a));
          }
          o = i;
        },
        r = function (t, o, e, i, r) {
          var l = 1 - i / r.options.ttl,
            a = n.rgb(r.options.color);
          (a = "rgba(" + a.r + "," + a.g + "," + a.b + "," + l + ")"),
            (o.strokeStyle = a);
          var u = n.geo
            .circle()
            .origin([r.lng, r.lat])
            .angle((i / r.options.ttl) * r.options.angle)();
          o.beginPath(), t.path.context(o)(u), o.stroke();
        };
      return function (n) {
        (n.plugins.pings = { add: e }),
          n.onDraw(function () {
            var t = new Date();
            n.withSavedContext(function (o) {
              i(n, o, t);
            });
          });
      };
    }),
    (c.plugins.zoom = function (t) {
      t = t || {};
      var o = function () {},
        e = t.onZoomStart || o,
        i = t.onZoomEnd || o,
        r = t.onZoom || o,
        l = t.afterZoom || o,
        a = t.initialScale,
        u = t.scaleExtent || [50, 2e3];
      return function (t) {
        t.onInit(function () {
          var o = n.behavior.zoom().scaleExtent(u);
          null !== a && void 0 !== a
            ? o.scale(a)
            : o.scale(t.projection.scale()),
            o
              .on("zoomstart", e.bind(t))
              .on("zoomend", i.bind(t))
              .on("zoom", function () {
                r.call(t), t.projection.scale(n.event.scale), l.call(t);
              }),
            n.select(t.canvas).call(o);
        });
      };
    }),
    (c.plugins.drag = function (t) {
      t = t || {};
      var o = function () {},
        e = t.onDragStart || o,
        i = t.onDragEnd || o,
        r = t.onDrag || o,
        l = t.afterDrag || o;
      return function (t) {
        t.onInit(function () {
          var o = n.behavior
            .drag()
            .on("dragstart", e.bind(t))
            .on("dragend", i.bind(t))
            .on("drag", function () {
              r.call(t);
              var o = n.event.dx,
                e = n.event.dy,
                i = t.projection.rotate(),
                a = t.projection.scale(),
                u = n.scale
                  .linear()
                  .domain([-1 * a, a])
                  .range([-90, 90]),
                c = u(o),
                s = u(e);
              (i[0] += c),
                (i[1] -= s),
                i[1] > 90 && (i[1] = 90),
                i[1] < -90 && (i[1] = -90),
                i[0] >= 180 && (i[0] -= 360),
                t.projection.rotate(i),
                l.call(t);
            });
          n.select(t.canvas).call(o);
        });
      };
    }),
    c
  );
});
