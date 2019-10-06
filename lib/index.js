module.exports = (function(e) {
  var t = {};
  function r(n) {
    if (t[n]) return t[n].exports;
    var u = (t[n] = { i: n, l: !1, exports: {} });
    return e[n].call(u.exports, u, u.exports, r), (u.l = !0), u.exports;
  }
  return (
    (r.m = e),
    (r.c = t),
    (r.d = function(e, t, n) {
      r.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: n });
    }),
    (r.r = function(e) {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(e, "__esModule", { value: !0 });
    }),
    (r.t = function(e, t) {
      if ((1 & t && (e = r(e)), 8 & t)) return e;
      if (4 & t && "object" == typeof e && e && e.__esModule) return e;
      var n = Object.create(null);
      if (
        (r.r(n),
        Object.defineProperty(n, "default", { enumerable: !0, value: e }),
        2 & t && "string" != typeof e)
      )
        for (var u in e)
          r.d(
            n,
            u,
            function(t) {
              return e[t];
            }.bind(null, u)
          );
      return n;
    }),
    (r.n = function(e) {
      var t =
        e && e.__esModule
          ? function() {
              return e.default;
            }
          : function() {
              return e;
            };
      return r.d(t, "a", t), t;
    }),
    (r.o = function(e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }),
    (r.p = ""),
    r((r.s = 1))
  );
})([
  function(e, t) {
    e.exports = require("react");
  },
  function(e, t, r) {
    "use strict";
    r.r(t),
      r.d(t, "mergeArrays", function() {
        return i;
      }),
      r.d(t, "getNextFocusedFieldIndex", function() {
        return c;
      }),
      r.d(t, "changeValueInArr", function() {
        return f;
      }),
      r.d(t, "ReactCodeField", function() {
        return l;
      });
    var n = r(0),
      u = r.n(n);
    function a(e, t) {
      return (
        (function(e) {
          if (Array.isArray(e)) return e;
        })(e) ||
        (function(e, t) {
          if (
            !(
              Symbol.iterator in Object(e) ||
              "[object Arguments]" === Object.prototype.toString.call(e)
            )
          )
            return;
          var r = [],
            n = !0,
            u = !1,
            a = void 0;
          try {
            for (
              var o, i = e[Symbol.iterator]();
              !(n = (o = i.next()).done) &&
              (r.push(o.value), !t || r.length !== t);
              n = !0
            );
          } catch (e) {
            (u = !0), (a = e);
          } finally {
            try {
              n || null == i.return || i.return();
            } finally {
              if (u) throw a;
            }
          }
          return r;
        })(e, t) ||
        (function() {
          throw new TypeError(
            "Invalid attempt to destructure non-iterable instance"
          );
        })()
      );
    }
    function o(e) {
      return (
        (function(e) {
          if (Array.isArray(e)) {
            for (var t = 0, r = new Array(e.length); t < e.length; t++)
              r[t] = e[t];
            return r;
          }
        })(e) ||
        (function(e) {
          if (
            Symbol.iterator in Object(e) ||
            "[object Arguments]" === Object.prototype.toString.call(e)
          )
            return Array.from(e);
        })(e) ||
        (function() {
          throw new TypeError(
            "Invalid attempt to spread non-iterable instance"
          );
        })()
      );
    }
    var i = function(e, t, r) {
        return e.map(function(e, n) {
          return n >= r && t[n - r] ? t[n - r] : e;
        });
      },
      c = function(e, t, r) {
        return e + t < 0 ? 0 : e + t < r ? e + t : r;
      },
      f = function(e, t, r) {
        return Object.assign(
          o(e),
          ((a = t),
          (u = r) in (n = {})
            ? Object.defineProperty(n, u, {
                value: a,
                enumerable: !0,
                configurable: !0,
                writable: !0
              })
            : (n[u] = a),
          n)
        );
        var n, u, a;
      },
      l = function(e) {
        var t = e.fields,
          r = e.onChange,
          o = e.inputType,
          l = e.listBannedChars,
          s = Object(n.useRef)([]),
          p = a(Object(n.useState)(Array(t).fill("")), 2),
          d = p[0],
          b = p[1],
          v = a(Object(n.useState)(0), 2),
          y = v[0],
          g = v[1],
          m = function(e) {
            e.preventDefault();
            var r = Number(e.target.dataset.idx),
              n = e.target.value.split("");
            "number" === o &&
              (n = n.filter(function(e) {
                return "number" == typeof +e && isFinite(+e);
              })),
              l &&
                (n = n.filter(function(e) {
                  return !l.includes(e);
                }));
            var u = i(d, n, r),
              a = c(r, n.length, t - 1);
            b(u), g(a);
          },
          j = function(e) {
            var r = e.keyCode,
              n = e.currentTarget.value,
              u = Number(e.currentTarget.dataset.idx);
            switch (r) {
              case 8:
                e.preventDefault(),
                  (function(e, r) {
                    var n = f(d, "", r),
                      u = c(r, -1, t - 1);
                    e ? b(n) : g(u);
                  })(n, u);
                break;
              case 37:
                e.preventDefault(),
                  (function(e) {
                    var r = c(e, -1, t - 1);
                    g(r);
                  })(u);
                break;
              case 39:
                e.preventDefault(),
                  (function(e) {
                    var r = c(e, 1, t - 1);
                    g(r);
                  })(u);
                break;
              case 9:
                e.preventDefault(),
                  (function(e, r) {
                    var n;
                    (n = c(e, r ? -1 : 1, t - 1)), g(n);
                  })(u, e.shiftKey);
                break;
              case 69:
                "number" === o && e.preventDefault();
            }
          },
          h = function(e) {
            e.preventDefault();
            var t = Number(e.target.dataset.idx);
            t === y ? e.target.select() : g(t);
          },
          x = function(e) {
            e.preventDefault();
            var t = Number(e.currentTarget.dataset.idx);
            t === y ? e.currentTarget.select() : g(t);
          };
        return (
          Object(n.useEffect)(
            function() {
              s.current[y] && (s.current[y].focus(), s.current[y].select());
            },
            [y]
          ),
          Object(n.useEffect)(
            function() {
              r && r(d.join(""));
            },
            [d, r]
          ),
          u.a.createElement(
            "div",
            { style: { display: "flex" } },
            d.map(function(e, t) {
              return u.a.createElement("input", {
                key: t,
                "data-idx": t,
                type: o,
                value: e,
                ref: function(e) {
                  e && s && s.current.push(e);
                },
                onInput: m,
                onFocus: h,
                onKeyDown: j,
                onMouseDown: x,
                onChange: function(e) {
                  return e.preventDefault();
                },
                style: {
                  width: "30px",
                  height: "30px",
                  textAlign: "center",
                  fontSize: "20px"
                }
              });
            })
          )
        );
      };
  }
]);
