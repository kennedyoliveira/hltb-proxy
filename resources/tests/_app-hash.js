(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([[2888], {
    99960: function(e, t) {
        "use strict";
        var n, a;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
            t.Doctype = t.CDATA = t.Tag = t.Style = t.Script = t.Comment = t.Directive = t.Text = t.Root = t.isTag = t.ElementType = void 0,
            (a = n = t.ElementType || (t.ElementType = {})).Root = "root",
            a.Text = "text",
            a.Directive = "directive",
            a.Comment = "comment",
            a.Script = "script",
            a.Style = "style",
            a.Tag = "tag",
            a.CDATA = "cdata",
            a.Doctype = "doctype",
            t.isTag = function(e) {
                return e.type === n.Tag || e.type === n.Script || e.type === n.Style
            }
            ,
            t.Root = n.Root,
            t.Text = n.Text,
            t.Directive = n.Directive,
            t.Comment = n.Comment,
            t.Script = n.Script,
            t.Style = n.Style,
            t.Tag = n.Tag,
            t.CDATA = n.CDATA,
            t.Doctype = n.Doctype
    },
    47915: function(e, t, n) {
        "use strict";
        var a = this && this.__createBinding || (Object.create ? function(e, t, n, a) {
                        void 0 === a && (a = n);
                        var r = Object.getOwnPropertyDescriptor(t, n);
                        (!r || ("get"in r ? !t.__esModule : r.writable || r.configurable)) && (r = {
                            enumerable: !0,
                            get: function() {
                                return t[n]
                            }
                        }),
                            Object.defineProperty(e, a, r)
                    }
                    : function(e, t, n, a) {
                        void 0 === a && (a = n),
                            e[a] = t[n]
                    }
            )
            , r = this && this.__exportStar || function(e, t) {
                for (var n in e)
                    "default" === n || Object.prototype.hasOwnProperty.call(t, n) || a(t, e, n)
            }
        ;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
            t.DomHandler = void 0;
        var i = n(99960)
            , o = n(97790);
        r(n(97790), t);
        var s = {
            withStartIndices: !1,
            withEndIndices: !1,
            xmlMode: !1
        }
            , l = function() {
            function e(e, t, n) {
                this.dom = [],
                    this.root = new o.Document(this.dom),
                    this.done = !1,
                    this.tagStack = [this.root],
                    this.lastNode = null,
                    this.parser = null,
                "function" == typeof t && (n = t,
                    t = s),
                "object" == typeof e && (t = e,
                    e = void 0),
                    this.callback = null != e ? e : null,
                    this.options = null != t ? t : s,
                    this.elementCB = null != n ? n : null
            }
            return e.prototype.onparserinit = function(e) {
                this.parser = e
            }
                ,
                e.prototype.onreset = function() {
                    this.dom = [],
                        this.root = new o.Document(this.dom),
                        this.done = !1,
                        this.tagStack = [this.root],
                        this.lastNode = null,
                        this.parser = null
                }
                ,
                e.prototype.onend = function() {
                    this.done || (this.done = !0,
                        this.parser = null,
                        this.handleCallback(null))
                }
                ,
                e.prototype.onerror = function(e) {
                    this.handleCallback(e)
                }
                ,
                e.prototype.onclosetag = function() {
                    this.lastNode = null;
                    var e = this.tagStack.pop();
                    this.options.withEndIndices && (e.endIndex = this.parser.endIndex),
                    this.elementCB && this.elementCB(e)
                }
                ,
                e.prototype.onopentag = function(e, t) {
                    var n = this.options.xmlMode ? i.ElementType.Tag : void 0
                        , a = new o.Element(e,t,void 0,n);
                    this.addNode(a),
                        this.tagStack.push(a)
                }
                ,
                e.prototype.ontext = function(e) {
                    var t = this.lastNode;
                    if (t && t.type === i.ElementType.Text)
                        t.data += e,
                        this.options.withEndIndices && (t.endIndex = this.parser.endIndex);
                    else {
                        var n = new o.Text(e);
                        this.addNode(n),
                            this.lastNode = n
                    }
                }
                ,
                e.prototype.oncomment = function(e) {
                    if (this.lastNode && this.lastNode.type === i.ElementType.Comment) {
                        this.lastNode.data += e;
                        return
                    }
                    var t = new o.Comment(e);
                    this.addNode(t),
                        this.lastNode = t
                }
                ,
                e.prototype.oncommentend = function() {
                    this.lastNode = null
                }
                ,
                e.prototype.oncdatastart = function() {
                    var e = new o.Text("")
                        , t = new o.CDATA([e]);
                    this.addNode(t),
                        e.parent = t,
                        this.lastNode = e
                }
                ,
                e.prototype.oncdataend = function() {
                    this.lastNode = null
                }
                ,
                e.prototype.onprocessinginstruction = function(e, t) {
                    var n = new o.ProcessingInstruction(e,t);
                    this.addNode(n)
                }
                ,
                e.prototype.handleCallback = function(e) {
                    if ("function" == typeof this.callback)
                        this.callback(e, this.dom);
                    else if (e)
                        throw e
                }
                ,
                e.prototype.addNode = function(e) {
                    var t = this.tagStack[this.tagStack.length - 1]
                        , n = t.children[t.children.length - 1];
                    this.options.withStartIndices && (e.startIndex = this.parser.startIndex),
                    this.options.withEndIndices && (e.endIndex = this.parser.endIndex),
                        t.children.push(e),
                    n && (e.prev = n,
                        n.next = e),
                        e.parent = t,
                        this.lastNode = null
                }
                ,
                e
        }();
        t.DomHandler = l,
            t.default = l
    },
    97790: function(e, t, n) {
        "use strict";
        var a, r = this && this.__extends || (a = function(e, t) {
                    return (a = Object.setPrototypeOf || ({
                                __proto__: []
                            })instanceof Array && function(e, t) {
                                e.__proto__ = t
                            }
                            || function(e, t) {
                                for (var n in t)
                                    Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n])
                            }
                    )(e, t)
                }
                    ,
                    function(e, t) {
                        if ("function" != typeof t && null !== t)
                            throw TypeError("Class extends value " + String(t) + " is not a constructor or null");
                        function n() {
                            this.constructor = e
                        }
                        a(e, t),
                            e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype,
                                new n)
                    }
            ), i = this && this.__assign || function() {
                return (i = Object.assign || function(e) {
                        for (var t, n = 1, a = arguments.length; n < a; n++)
                            for (var r in t = arguments[n])
                                Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
                        return e
                    }
                ).apply(this, arguments)
            }
        ;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
            t.cloneNode = t.hasChildren = t.isDocument = t.isDirective = t.isComment = t.isText = t.isCDATA = t.isTag = t.Element = t.Document = t.CDATA = t.NodeWithChildren = t.ProcessingInstruction = t.Comment = t.Text = t.DataNode = t.Node = void 0;
        var o = n(99960)
            , s = function() {
            function e() {
                this.parent = null,
                    this.prev = null,
                    this.next = null,
                    this.startIndex = null,
                    this.endIndex = null
            }
            return Object.defineProperty(e.prototype, "parentNode", {
                get: function() {
                    return this.parent
                },
                set: function(e) {
                    this.parent = e
                },
                enumerable: !1,
                configurable: !0
            }),
                Object.defineProperty(e.prototype, "previousSibling", {
                    get: function() {
                        return this.prev
                    },
                    set: function(e) {
                        this.prev = e
                    },
                    enumerable: !1,
                    configurable: !0
                }),
                Object.defineProperty(e.prototype, "nextSibling", {
                    get: function() {
                        return this.next
                    },
                    set: function(e) {
                        this.next = e
                    },
                    enumerable: !1,
                    configurable: !0
                }),
                e.prototype.cloneNode = function(e) {
                    return void 0 === e && (e = !1),
                        j(this, e)
                }
                ,
                e
        }();
        t.Node = s;
        var l = function(e) {
            function t(t) {
                var n = e.call(this) || this;
                return n.data = t,
                    n
            }
            return r(t, e),
                Object.defineProperty(t.prototype, "nodeValue", {
                    get: function() {
                        return this.data
                    },
                    set: function(e) {
                        this.data = e
                    },
                    enumerable: !1,
                    configurable: !0
                }),
                t
        }(s);
        t.DataNode = l;
        var c = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.type = o.ElementType.Text,
                    t
            }
            return r(t, e),
                Object.defineProperty(t.prototype, "nodeType", {
                    get: function() {
                        return 3
                    },
                    enumerable: !1,
                    configurable: !0
                }),
                t
        }(l);
        t.Text = c;
        var u = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.type = o.ElementType.Comment,
                    t
            }
            return r(t, e),
                Object.defineProperty(t.prototype, "nodeType", {
                    get: function() {
                        return 8
                    },
                    enumerable: !1,
                    configurable: !0
                }),
                t
        }(l);
        t.Comment = u;
        var d = function(e) {
            function t(t, n) {
                var a = e.call(this, n) || this;
                return a.name = t,
                    a.type = o.ElementType.Directive,
                    a
            }
            return r(t, e),
                Object.defineProperty(t.prototype, "nodeType", {
                    get: function() {
                        return 1
                    },
                    enumerable: !1,
                    configurable: !0
                }),
                t
        }(l);
        t.ProcessingInstruction = d;
        var m = function(e) {
            function t(t) {
                var n = e.call(this) || this;
                return n.children = t,
                    n
            }
            return r(t, e),
                Object.defineProperty(t.prototype, "firstChild", {
                    get: function() {
                        var e;
                        return null !== (e = this.children[0]) && void 0 !== e ? e : null
                    },
                    enumerable: !1,
                    configurable: !0
                }),
                Object.defineProperty(t.prototype, "lastChild", {
                    get: function() {
                        return this.children.length > 0 ? this.children[this.children.length - 1] : null
                    },
                    enumerable: !1,
                    configurable: !0
                }),
                Object.defineProperty(t.prototype, "childNodes", {
                    get: function() {
                        return this.children
                    },
                    set: function(e) {
                        this.children = e
                    },
                    enumerable: !1,
                    configurable: !0
                }),
                t
        }(s);
        t.NodeWithChildren = m;
        var h = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.type = o.ElementType.CDATA,
                    t
            }
            return r(t, e),
                Object.defineProperty(t.prototype, "nodeType", {
                    get: function() {
                        return 4
                    },
                    enumerable: !1,
                    configurable: !0
                }),
                t
        }(m);
        t.CDATA = h;
        var p = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.type = o.ElementType.Root,
                    t
            }
            return r(t, e),
                Object.defineProperty(t.prototype, "nodeType", {
                    get: function() {
                        return 9
                    },
                    enumerable: !1,
                    configurable: !0
                }),
                t
        }(m);
        t.Document = p;
        var f = function(e) {
            function t(t, n, a, r) {
                void 0 === a && (a = []),
                void 0 === r && (r = "script" === t ? o.ElementType.Script : "style" === t ? o.ElementType.Style : o.ElementType.Tag);
                var i = e.call(this, a) || this;
                return i.name = t,
                    i.attribs = n,
                    i.type = r,
                    i
            }
            return r(t, e),
                Object.defineProperty(t.prototype, "nodeType", {
                    get: function() {
                        return 1
                    },
                    enumerable: !1,
                    configurable: !0
                }),
                Object.defineProperty(t.prototype, "tagName", {
                    get: function() {
                        return this.name
                    },
                    set: function(e) {
                        this.name = e
                    },
                    enumerable: !1,
                    configurable: !0
                }),
                Object.defineProperty(t.prototype, "attributes", {
                    get: function() {
                        var e = this;
                        return Object.keys(this.attribs).map(function(t) {
                            var n, a;
                            return {
                                name: t,
                                value: e.attribs[t],
                                namespace: null === (n = e["x-attribsNamespace"]) || void 0 === n ? void 0 : n[t],
                                prefix: null === (a = e["x-attribsPrefix"]) || void 0 === a ? void 0 : a[t]
                            }
                        })
                    },
                    enumerable: !1,
                    configurable: !0
                }),
                t
        }(m);
        function _(e) {
            return (0,
                o.isTag)(e)
        }
        function g(e) {
            return e.type === o.ElementType.CDATA
        }
        function v(e) {
            return e.type === o.ElementType.Text
        }
        function x(e) {
            return e.type === o.ElementType.Comment
        }
        function b(e) {
            return e.type === o.ElementType.Directive
        }
        function y(e) {
            return e.type === o.ElementType.Root
        }
        function j(e, t) {
            if (void 0 === t && (t = !1),
                v(e))
                n = new c(e.data);
            else if (x(e))
                n = new u(e.data);
            else if (_(e)) {
                var n, a = t ? N(e.children) : [], r = new f(e.name,i({}, e.attribs),a);
                a.forEach(function(e) {
                    return e.parent = r
                }),
                null != e.namespace && (r.namespace = e.namespace),
                e["x-attribsNamespace"] && (r["x-attribsNamespace"] = i({}, e["x-attribsNamespace"])),
                e["x-attribsPrefix"] && (r["x-attribsPrefix"] = i({}, e["x-attribsPrefix"])),
                    n = r
            } else if (g(e)) {
                var a = t ? N(e.children) : []
                    , o = new h(a);
                a.forEach(function(e) {
                    return e.parent = o
                }),
                    n = o
            } else if (y(e)) {
                var a = t ? N(e.children) : []
                    , s = new p(a);
                a.forEach(function(e) {
                    return e.parent = s
                }),
                e["x-mode"] && (s["x-mode"] = e["x-mode"]),
                    n = s
            } else if (b(e)) {
                var l = new d(e.name,e.data);
                null != e["x-name"] && (l["x-name"] = e["x-name"],
                    l["x-publicId"] = e["x-publicId"],
                    l["x-systemId"] = e["x-systemId"]),
                    n = l
            } else
                throw Error("Not implemented yet: ".concat(e.type));
            return n.startIndex = e.startIndex,
                n.endIndex = e.endIndex,
            null != e.sourceCodeLocation && (n.sourceCodeLocation = e.sourceCodeLocation),
                n
        }
        function N(e) {
            for (var t = e.map(function(e) {
                return j(e, !0)
            }), n = 1; n < t.length; n++)
                t[n].prev = t[n - 1],
                    t[n - 1].next = t[n];
            return t
        }
        t.Element = f,
            t.isTag = _,
            t.isCDATA = g,
            t.isText = v,
            t.isComment = x,
            t.isDirective = b,
            t.isDocument = y,
            t.hasChildren = function(e) {
                return Object.prototype.hasOwnProperty.call(e, "children")
            }
            ,
            t.cloneNode = j
    },
    27856: function(e) {
        var t;
        t = function() {
            "use strict";
            let {entries: e, setPrototypeOf: t, isFrozen: n, getPrototypeOf: a, getOwnPropertyDescriptor: r} = Object
                , {freeze: i, seal: o, create: s} = Object
                , {apply: l, construct: c} = "undefined" != typeof Reflect && Reflect;
            i || (i = function(e) {
                    return e
                }
            ),
            o || (o = function(e) {
                    return e
                }
            ),
            l || (l = function(e, t, n) {
                    return e.apply(t, n)
                }
            ),
            c || (c = function(e, t) {
                    return new e(...t)
                }
            );
            let u = j(Array.prototype.forEach)
                , d = j(Array.prototype.pop)
                , m = j(Array.prototype.push)
                , h = j(String.prototype.toLowerCase)
                , p = j(String.prototype.toString)
                , f = j(String.prototype.match)
                , _ = j(String.prototype.replace)
                , g = j(String.prototype.indexOf)
                , v = j(String.prototype.trim)
                , x = j(Object.prototype.hasOwnProperty)
                , b = j(RegExp.prototype.test)
                , y = (W = TypeError,
                    function() {
                        for (var e = arguments.length, t = Array(e), n = 0; n < e; n++)
                            t[n] = arguments[n];
                        return c(W, t)
                    }
            );
            function j(e) {
                return function(t) {
                    for (var n = arguments.length, a = Array(n > 1 ? n - 1 : 0), r = 1; r < n; r++)
                        a[r - 1] = arguments[r];
                    return l(e, t, a)
                }
            }
            function N(e, a) {
                let r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : h;
                t && t(e, null);
                let i = a.length;
                for (; i--; ) {
                    let t = a[i];
                    if ("string" == typeof t) {
                        let e = r(t);
                        e !== t && (n(a) || (a[i] = e),
                            t = e)
                    }
                    e[t] = !0
                }
                return e
            }
            function k(t) {
                let n = s(null);
                for (let[a,r] of e(t))
                    x(t, a) && (Array.isArray(r) ? n[a] = function(e) {
                        for (let t = 0; t < e.length; t++)
                            x(e, t) || (e[t] = null);
                        return e
                    }(r) : r && "object" == typeof r && r.constructor === Object ? n[a] = k(r) : n[a] = r);
                return n
            }
            function w(e, t) {
                for (; null !== e; ) {
                    let n = r(e, t);
                    if (n) {
                        if (n.get)
                            return j(n.get);
                        if ("function" == typeof n.value)
                            return j(n.value)
                    }
                    e = a(e)
                }
                return function() {
                    return null
                }
            }
            let S = i(["a", "abbr", "acronym", "address", "area", "article", "aside", "audio", "b", "bdi", "bdo", "big", "blink", "blockquote", "body", "br", "button", "canvas", "caption", "center", "cite", "code", "col", "colgroup", "content", "data", "datalist", "dd", "decorator", "del", "details", "dfn", "dialog", "dir", "div", "dl", "dt", "element", "em", "fieldset", "figcaption", "figure", "font", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "img", "input", "ins", "kbd", "label", "legend", "li", "main", "map", "mark", "marquee", "menu", "menuitem", "meter", "nav", "nobr", "ol", "optgroup", "option", "output", "p", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "section", "select", "shadow", "small", "source", "spacer", "span", "strike", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "tr", "track", "tt", "u", "ul", "var", "video", "wbr"])
                , C = i(["svg", "a", "altglyph", "altglyphdef", "altglyphitem", "animatecolor", "animatemotion", "animatetransform", "circle", "clippath", "defs", "desc", "ellipse", "filter", "font", "g", "glyph", "glyphref", "hkern", "image", "line", "lineargradient", "marker", "mask", "metadata", "mpath", "path", "pattern", "polygon", "polyline", "radialgradient", "rect", "stop", "style", "switch", "symbol", "text", "textpath", "title", "tref", "tspan", "view", "vkern"])
                , T = i(["feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feDropShadow", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence"])
                , E = i(["animate", "color-profile", "cursor", "discard", "font-face", "font-face-format", "font-face-name", "font-face-src", "font-face-uri", "foreignobject", "hatch", "hatchpath", "mesh", "meshgradient", "meshpatch", "meshrow", "missing-glyph", "script", "set", "solidcolor", "unknown", "use"])
                , P = i(["math", "menclose", "merror", "mfenced", "mfrac", "mglyph", "mi", "mlabeledtr", "mmultiscripts", "mn", "mo", "mover", "mpadded", "mphantom", "mroot", "mrow", "ms", "mspace", "msqrt", "mstyle", "msub", "msup", "msubsup", "mtable", "mtd", "mtext", "mtr", "munder", "munderover", "mprescripts"])
                , A = i(["maction", "maligngroup", "malignmark", "mlongdiv", "mscarries", "mscarry", "msgroup", "mstack", "msline", "msrow", "semantics", "annotation", "annotation-xml", "mprescripts", "none"])
                , O = i(["#text"])
                , M = i(["accept", "action", "align", "alt", "autocapitalize", "autocomplete", "autopictureinpicture", "autoplay", "background", "bgcolor", "border", "capture", "cellpadding", "cellspacing", "checked", "cite", "class", "clear", "color", "cols", "colspan", "controls", "controlslist", "coords", "crossorigin", "datetime", "decoding", "default", "dir", "disabled", "disablepictureinpicture", "disableremoteplayback", "download", "draggable", "enctype", "enterkeyhint", "face", "for", "headers", "height", "hidden", "high", "href", "hreflang", "id", "inputmode", "integrity", "ismap", "kind", "label", "lang", "list", "loading", "loop", "low", "max", "maxlength", "media", "method", "min", "minlength", "multiple", "muted", "name", "nonce", "noshade", "novalidate", "nowrap", "open", "optimum", "pattern", "placeholder", "playsinline", "popover", "popovertarget", "popovertargetaction", "poster", "preload", "pubdate", "radiogroup", "readonly", "rel", "required", "rev", "reversed", "role", "rows", "rowspan", "spellcheck", "scope", "selected", "shape", "size", "sizes", "span", "srclang", "start", "src", "srcset", "step", "style", "summary", "tabindex", "title", "translate", "type", "usemap", "valign", "value", "width", "wrap", "xmlns", "slot"])
                , R = i(["accent-height", "accumulate", "additive", "alignment-baseline", "amplitude", "ascent", "attributename", "attributetype", "azimuth", "basefrequency", "baseline-shift", "begin", "bias", "by", "class", "clip", "clippathunits", "clip-path", "clip-rule", "color", "color-interpolation", "color-interpolation-filters", "color-profile", "color-rendering", "cx", "cy", "d", "dx", "dy", "diffuseconstant", "direction", "display", "divisor", "dur", "edgemode", "elevation", "end", "exponent", "fill", "fill-opacity", "fill-rule", "filter", "filterunits", "flood-color", "flood-opacity", "font-family", "font-size", "font-size-adjust", "font-stretch", "font-style", "font-variant", "font-weight", "fx", "fy", "g1", "g2", "glyph-name", "glyphref", "gradientunits", "gradienttransform", "height", "href", "id", "image-rendering", "in", "in2", "intercept", "k", "k1", "k2", "k3", "k4", "kerning", "keypoints", "keysplines", "keytimes", "lang", "lengthadjust", "letter-spacing", "kernelmatrix", "kernelunitlength", "lighting-color", "local", "marker-end", "marker-mid", "marker-start", "markerheight", "markerunits", "markerwidth", "maskcontentunits", "maskunits", "max", "mask", "media", "method", "mode", "min", "name", "numoctaves", "offset", "operator", "opacity", "order", "orient", "orientation", "origin", "overflow", "paint-order", "path", "pathlength", "patterncontentunits", "patterntransform", "patternunits", "points", "preservealpha", "preserveaspectratio", "primitiveunits", "r", "rx", "ry", "radius", "refx", "refy", "repeatcount", "repeatdur", "restart", "result", "rotate", "scale", "seed", "shape-rendering", "slope", "specularconstant", "specularexponent", "spreadmethod", "startoffset", "stddeviation", "stitchtiles", "stop-color", "stop-opacity", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke", "stroke-width", "style", "surfacescale", "systemlanguage", "tabindex", "tablevalues", "targetx", "targety", "transform", "transform-origin", "text-anchor", "text-decoration", "text-rendering", "textlength", "type", "u1", "u2", "unicode", "values", "viewbox", "visibility", "version", "vert-adv-y", "vert-origin-x", "vert-origin-y", "width", "word-spacing", "wrap", "writing-mode", "xchannelselector", "ychannelselector", "x", "x1", "x2", "xmlns", "y", "y1", "y2", "z", "zoomandpan"])
                , D = i(["accent", "accentunder", "align", "bevelled", "close", "columnsalign", "columnlines", "columnspan", "denomalign", "depth", "dir", "display", "displaystyle", "encoding", "fence", "frame", "height", "href", "id", "largeop", "length", "linethickness", "lspace", "lquote", "mathbackground", "mathcolor", "mathsize", "mathvariant", "maxsize", "minsize", "movablelimits", "notation", "numalign", "open", "rowalign", "rowlines", "rowspacing", "rowspan", "rspace", "rquote", "scriptlevel", "scriptminsize", "scriptsizemultiplier", "selection", "separator", "separators", "stretchy", "subscriptshift", "supscriptshift", "symmetric", "voffset", "width", "xmlns"])
                , I = i(["xlink:href", "xml:id", "xlink:title", "xml:space", "xmlns:xlink"])
                , L = o(/\{\{[\w\W]*|[\w\W]*\}\}/gm)
                , F = o(/<%[\w\W]*|[\w\W]*%>/gm)
                , G = o(/\${[\w\W]*}/gm)
                , U = o(/^data-[\-\w.\u00B7-\uFFFF]/)
                , B = o(/^aria-[\-\w]+$/)
                , z = o(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i)
                , H = o(/^(?:\w+script|data):/i)
                , q = o(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g)
                , V = o(/^html$/i);
            var W, X = Object.freeze({
                __proto__: null,
                MUSTACHE_EXPR: L,
                ERB_EXPR: F,
                TMPLIT_EXPR: G,
                DATA_ATTR: U,
                ARIA_ATTR: B,
                IS_ALLOWED_URI: z,
                IS_SCRIPT_OR_DATA: H,
                ATTR_WHITESPACE: q,
                DOCTYPE_NAME: V,
                CUSTOM_ELEMENT: o(/^[a-z][.\w]*(-[.\w]+)+$/i)
            });
            let $ = {
                element: 1,
                text: 3,
                progressingInstruction: 7,
                comment: 8,
                document: 9
            }
                , Z = function(e, t) {
                if ("object" != typeof e || "function" != typeof e.createPolicy)
                    return null;
                let n = null
                    , a = "data-tt-policy-suffix";
                t && t.hasAttribute(a) && (n = t.getAttribute(a));
                let r = "dompurify" + (n ? "#" + n : "");
                try {
                    return e.createPolicy(r, {
                        createHTML: e => e,
                        createScriptURL: e => e
                    })
                } catch (e) {
                    return console.warn("TrustedTypes policy " + r + " could not be created."),
                        null
                }
            };
            return function t() {
                let n, a = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "undefined" == typeof window ? null : window, r = e => t(e);
                if (r.version = "3.1.7",
                    r.removed = [],
                !a || !a.document || a.document.nodeType !== $.document)
                    return r.isSupported = !1,
                        r;
                let {document: o} = a
                    , l = o
                    , c = l.currentScript
                    , {DocumentFragment: j, HTMLTemplateElement: L, Node: F, Element: G, NodeFilter: U, NamedNodeMap: B=a.NamedNodeMap || a.MozNamedAttrMap, HTMLFormElement: H, DOMParser: q, trustedTypes: W} = a
                    , Y = G.prototype
                    , J = w(Y, "cloneNode")
                    , K = w(Y, "remove")
                    , Q = w(Y, "nextSibling")
                    , ee = w(Y, "childNodes")
                    , et = w(Y, "parentNode");
                if ("function" == typeof L) {
                    let e = o.createElement("template");
                    e.content && e.content.ownerDocument && (o = e.content.ownerDocument)
                }
                let en = ""
                    , {implementation: ea, createNodeIterator: er, createDocumentFragment: ei, getElementsByTagName: eo} = o
                    , {importNode: es} = l
                    , el = {};
                r.isSupported = "function" == typeof e && "function" == typeof et && ea && void 0 !== ea.createHTMLDocument;
                let {MUSTACHE_EXPR: ec, ERB_EXPR: eu, TMPLIT_EXPR: ed, DATA_ATTR: em, ARIA_ATTR: eh, IS_SCRIPT_OR_DATA: ep, ATTR_WHITESPACE: ef, CUSTOM_ELEMENT: e_} = X
                    , {IS_ALLOWED_URI: eg} = X
                    , ev = null
                    , ex = N({}, [...S, ...C, ...T, ...P, ...O])
                    , eb = null
                    , ey = N({}, [...M, ...R, ...D, ...I])
                    , ej = Object.seal(s(null, {
                    tagNameCheck: {
                        writable: !0,
                        configurable: !1,
                        enumerable: !0,
                        value: null
                    },
                    attributeNameCheck: {
                        writable: !0,
                        configurable: !1,
                        enumerable: !0,
                        value: null
                    },
                    allowCustomizedBuiltInElements: {
                        writable: !0,
                        configurable: !1,
                        enumerable: !0,
                        value: !1
                    }
                }))
                    , eN = null
                    , ek = null
                    , ew = !0
                    , eS = !0
                    , eC = !1
                    , eT = !0
                    , eE = !1
                    , eP = !0
                    , eA = !1
                    , eO = !1
                    , eM = !1
                    , eR = !1
                    , eD = !1
                    , eI = !1
                    , eL = !0
                    , eF = !1
                    , eG = !0
                    , eU = !1
                    , eB = {}
                    , ez = null
                    , eH = N({}, ["annotation-xml", "audio", "colgroup", "desc", "foreignobject", "head", "iframe", "math", "mi", "mn", "mo", "ms", "mtext", "noembed", "noframes", "noscript", "plaintext", "script", "style", "svg", "template", "thead", "title", "video", "xmp"])
                    , eq = null
                    , eV = N({}, ["audio", "video", "img", "source", "image", "track"])
                    , eW = null
                    , eX = N({}, ["alt", "class", "for", "id", "label", "name", "pattern", "placeholder", "role", "summary", "title", "value", "style", "xmlns"])
                    , e$ = "http://www.w3.org/1998/Math/MathML"
                    , eZ = "http://www.w3.org/2000/svg"
                    , eY = "http://www.w3.org/1999/xhtml"
                    , eJ = eY
                    , eK = !1
                    , eQ = null
                    , e0 = N({}, [e$, eZ, eY], p)
                    , e1 = null
                    , e2 = ["application/xhtml+xml", "text/html"]
                    , e3 = null
                    , e5 = null
                    , e6 = o.createElement("form")
                    , e9 = function(e) {
                    return e instanceof RegExp || e instanceof Function
                }
                    , e7 = function() {
                    let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    if (!e5 || e5 !== e) {
                        if (e && "object" == typeof e || (e = {}),
                            e = k(e),
                            e3 = "application/xhtml+xml" === (e1 = -1 === e2.indexOf(e.PARSER_MEDIA_TYPE) ? "text/html" : e.PARSER_MEDIA_TYPE) ? p : h,
                            ev = x(e, "ALLOWED_TAGS") ? N({}, e.ALLOWED_TAGS, e3) : ex,
                            eb = x(e, "ALLOWED_ATTR") ? N({}, e.ALLOWED_ATTR, e3) : ey,
                            eQ = x(e, "ALLOWED_NAMESPACES") ? N({}, e.ALLOWED_NAMESPACES, p) : e0,
                            eW = x(e, "ADD_URI_SAFE_ATTR") ? N(k(eX), e.ADD_URI_SAFE_ATTR, e3) : eX,
                            eq = x(e, "ADD_DATA_URI_TAGS") ? N(k(eV), e.ADD_DATA_URI_TAGS, e3) : eV,
                            ez = x(e, "FORBID_CONTENTS") ? N({}, e.FORBID_CONTENTS, e3) : eH,
                            eN = x(e, "FORBID_TAGS") ? N({}, e.FORBID_TAGS, e3) : {},
                            ek = x(e, "FORBID_ATTR") ? N({}, e.FORBID_ATTR, e3) : {},
                            eB = !!x(e, "USE_PROFILES") && e.USE_PROFILES,
                            ew = !1 !== e.ALLOW_ARIA_ATTR,
                            eS = !1 !== e.ALLOW_DATA_ATTR,
                            eC = e.ALLOW_UNKNOWN_PROTOCOLS || !1,
                            eT = !1 !== e.ALLOW_SELF_CLOSE_IN_ATTR,
                            eE = e.SAFE_FOR_TEMPLATES || !1,
                            eP = !1 !== e.SAFE_FOR_XML,
                            eA = e.WHOLE_DOCUMENT || !1,
                            eR = e.RETURN_DOM || !1,
                            eD = e.RETURN_DOM_FRAGMENT || !1,
                            eI = e.RETURN_TRUSTED_TYPE || !1,
                            eM = e.FORCE_BODY || !1,
                            eL = !1 !== e.SANITIZE_DOM,
                            eF = e.SANITIZE_NAMED_PROPS || !1,
                            eG = !1 !== e.KEEP_CONTENT,
                            eU = e.IN_PLACE || !1,
                            eg = e.ALLOWED_URI_REGEXP || z,
                            eJ = e.NAMESPACE || eY,
                            ej = e.CUSTOM_ELEMENT_HANDLING || {},
                        e.CUSTOM_ELEMENT_HANDLING && e9(e.CUSTOM_ELEMENT_HANDLING.tagNameCheck) && (ej.tagNameCheck = e.CUSTOM_ELEMENT_HANDLING.tagNameCheck),
                        e.CUSTOM_ELEMENT_HANDLING && e9(e.CUSTOM_ELEMENT_HANDLING.attributeNameCheck) && (ej.attributeNameCheck = e.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),
                        e.CUSTOM_ELEMENT_HANDLING && "boolean" == typeof e.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements && (ej.allowCustomizedBuiltInElements = e.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),
                        eE && (eS = !1),
                        eD && (eR = !0),
                        eB && (ev = N({}, O),
                            eb = [],
                        !0 === eB.html && (N(ev, S),
                            N(eb, M)),
                        !0 === eB.svg && (N(ev, C),
                            N(eb, R),
                            N(eb, I)),
                        !0 === eB.svgFilters && (N(ev, T),
                            N(eb, R),
                            N(eb, I)),
                        !0 === eB.mathMl && (N(ev, P),
                            N(eb, D),
                            N(eb, I))),
                        e.ADD_TAGS && (ev === ex && (ev = k(ev)),
                            N(ev, e.ADD_TAGS, e3)),
                        e.ADD_ATTR && (eb === ey && (eb = k(eb)),
                            N(eb, e.ADD_ATTR, e3)),
                        e.ADD_URI_SAFE_ATTR && N(eW, e.ADD_URI_SAFE_ATTR, e3),
                        e.FORBID_CONTENTS && (ez === eH && (ez = k(ez)),
                            N(ez, e.FORBID_CONTENTS, e3)),
                        eG && (ev["#text"] = !0),
                        eA && N(ev, ["html", "head", "body"]),
                        ev.table && (N(ev, ["tbody"]),
                            delete eN.tbody),
                            e.TRUSTED_TYPES_POLICY) {
                            if ("function" != typeof e.TRUSTED_TYPES_POLICY.createHTML)
                                throw y('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');
                            if ("function" != typeof e.TRUSTED_TYPES_POLICY.createScriptURL)
                                throw y('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');
                            en = (n = e.TRUSTED_TYPES_POLICY).createHTML("")
                        } else
                            void 0 === n && (n = Z(W, c)),
                            null !== n && "string" == typeof en && (en = n.createHTML(""));
                        i && i(e),
                            e5 = e
                    }
                }
                    , e8 = N({}, ["mi", "mo", "mn", "ms", "mtext"])
                    , e4 = N({}, ["annotation-xml"])
                    , te = N({}, ["title", "style", "font", "a", "script"])
                    , tt = N({}, [...C, ...T, ...E])
                    , tn = N({}, [...P, ...A])
                    , ta = function(e) {
                    let t = et(e);
                    t && t.tagName || (t = {
                        namespaceURI: eJ,
                        tagName: "template"
                    });
                    let n = h(e.tagName)
                        , a = h(t.tagName);
                    return !!eQ[e.namespaceURI] && (e.namespaceURI === eZ ? t.namespaceURI === eY ? "svg" === n : t.namespaceURI === e$ ? "svg" === n && ("annotation-xml" === a || e8[a]) : !!tt[n] : e.namespaceURI === e$ ? t.namespaceURI === eY ? "math" === n : t.namespaceURI === eZ ? "math" === n && e4[a] : !!tn[n] : e.namespaceURI === eY ? (t.namespaceURI !== eZ || !!e4[a]) && (t.namespaceURI !== e$ || !!e8[a]) && !tn[n] && (te[n] || !tt[n]) : "application/xhtml+xml" === e1 && !!eQ[e.namespaceURI])
                }
                    , tr = function(e) {
                    m(r.removed, {
                        element: e
                    });
                    try {
                        et(e).removeChild(e)
                    } catch (t) {
                        K(e)
                    }
                }
                    , ti = function(e, t) {
                    try {
                        m(r.removed, {
                            attribute: t.getAttributeNode(e),
                            from: t
                        })
                    } catch (e) {
                        m(r.removed, {
                            attribute: null,
                            from: t
                        })
                    }
                    if (t.removeAttribute(e),
                    "is" === e && !eb[e]) {
                        if (eR || eD)
                            try {
                                tr(t)
                            } catch (e) {}
                        else
                            try {
                                t.setAttribute(e, "")
                            } catch (e) {}
                    }
                }
                    , to = function(e) {
                    let t = null
                        , a = null;
                    if (eM)
                        e = "<remove></remove>" + e;
                    else {
                        let t = f(e, /^[\r\n\t ]+/);
                        a = t && t[0]
                    }
                    "application/xhtml+xml" === e1 && eJ === eY && (e = '<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>' + e + "</body></html>");
                    let r = n ? n.createHTML(e) : e;
                    if (eJ === eY)
                        try {
                            t = new q().parseFromString(r, e1)
                        } catch (e) {}
                    if (!t || !t.documentElement) {
                        t = ea.createDocument(eJ, "template", null);
                        try {
                            t.documentElement.innerHTML = eK ? en : r
                        } catch (e) {}
                    }
                    let i = t.body || t.documentElement;
                    return (e && a && i.insertBefore(o.createTextNode(a), i.childNodes[0] || null),
                    eJ === eY) ? eo.call(t, eA ? "html" : "body")[0] : eA ? t.documentElement : i
                }
                    , ts = function(e) {
                    return er.call(e.ownerDocument || e, e, U.SHOW_ELEMENT | U.SHOW_COMMENT | U.SHOW_TEXT | U.SHOW_PROCESSING_INSTRUCTION | U.SHOW_CDATA_SECTION, null)
                }
                    , tl = function(e) {
                    return e instanceof H && ("string" != typeof e.nodeName || "string" != typeof e.textContent || "function" != typeof e.removeChild || !(e.attributes instanceof B) || "function" != typeof e.removeAttribute || "function" != typeof e.setAttribute || "string" != typeof e.namespaceURI || "function" != typeof e.insertBefore || "function" != typeof e.hasChildNodes)
                }
                    , tc = function(e) {
                    return "function" == typeof F && e instanceof F
                }
                    , tu = function(e, t, n) {
                    el[e] && u(el[e], e => {
                            e.call(r, t, n, e5)
                        }
                    )
                }
                    , td = function(e) {
                    let t = null;
                    if (tu("beforeSanitizeElements", e, null),
                        tl(e))
                        return tr(e),
                            !0;
                    let n = e3(e.nodeName);
                    if (tu("uponSanitizeElement", e, {
                        tagName: n,
                        allowedTags: ev
                    }),
                    e.hasChildNodes() && !tc(e.firstElementChild) && b(/<[/\w]/g, e.innerHTML) && b(/<[/\w]/g, e.textContent) || e.nodeType === $.progressingInstruction || eP && e.nodeType === $.comment && b(/<[/\w]/g, e.data))
                        return tr(e),
                            !0;
                    if (!ev[n] || eN[n]) {
                        if (!eN[n] && th(n) && (ej.tagNameCheck instanceof RegExp && b(ej.tagNameCheck, n) || ej.tagNameCheck instanceof Function && ej.tagNameCheck(n)))
                            return !1;
                        if (eG && !ez[n]) {
                            let t = et(e) || e.parentNode
                                , n = ee(e) || e.childNodes;
                            if (n && t) {
                                let a = n.length;
                                for (let r = a - 1; r >= 0; --r) {
                                    let a = J(n[r], !0);
                                    a.__removalCount = (e.__removalCount || 0) + 1,
                                        t.insertBefore(a, Q(e))
                                }
                            }
                        }
                        return tr(e),
                            !0
                    }
                    return e instanceof G && !ta(e) || ("noscript" === n || "noembed" === n || "noframes" === n) && b(/<\/no(script|embed|frames)/i, e.innerHTML) ? (tr(e),
                        !0) : (eE && e.nodeType === $.text && (t = e.textContent,
                        u([ec, eu, ed], e => {
                                t = _(t, e, " ")
                            }
                        ),
                    e.textContent !== t && (m(r.removed, {
                        element: e.cloneNode()
                    }),
                        e.textContent = t)),
                        tu("afterSanitizeElements", e, null),
                        !1)
                }
                    , tm = function(e, t, n) {
                    if (eL && ("id" === t || "name" === t) && (n in o || n in e6))
                        return !1;
                    if (eS && !ek[t] && b(em, t))
                        ;
                    else if (ew && b(eh, t))
                        ;
                    else if (!eb[t] || ek[t]) {
                        if (!(th(e) && (ej.tagNameCheck instanceof RegExp && b(ej.tagNameCheck, e) || ej.tagNameCheck instanceof Function && ej.tagNameCheck(e)) && (ej.attributeNameCheck instanceof RegExp && b(ej.attributeNameCheck, t) || ej.attributeNameCheck instanceof Function && ej.attributeNameCheck(t)) || "is" === t && ej.allowCustomizedBuiltInElements && (ej.tagNameCheck instanceof RegExp && b(ej.tagNameCheck, n) || ej.tagNameCheck instanceof Function && ej.tagNameCheck(n))))
                            return !1
                    } else if (eW[t])
                        ;
                    else if (b(eg, _(n, ef, "")))
                        ;
                    else if (("src" === t || "xlink:href" === t || "href" === t) && "script" !== e && 0 === g(n, "data:") && eq[e])
                        ;
                    else if (eC && !b(ep, _(n, ef, "")))
                        ;
                    else if (n)
                        return !1;
                    return !0
                }
                    , th = function(e) {
                    return "annotation-xml" !== e && f(e, e_)
                }
                    , tp = function(e) {
                    tu("beforeSanitizeAttributes", e, null);
                    let {attributes: t} = e;
                    if (!t)
                        return;
                    let a = {
                        attrName: "",
                        attrValue: "",
                        keepAttr: !0,
                        allowedAttributes: eb
                    }
                        , i = t.length;
                    for (; i--; ) {
                        let {name: o, namespaceURI: s, value: l} = t[i]
                            , c = e3(o)
                            , m = "value" === o ? l : v(l);
                        if (a.attrName = c,
                            a.attrValue = m,
                            a.keepAttr = !0,
                            a.forceKeepAttr = void 0,
                            tu("uponSanitizeAttribute", e, a),
                            m = a.attrValue,
                        a.forceKeepAttr || (ti(o, e),
                            !a.keepAttr))
                            continue;
                        if (!eT && b(/\/>/i, m)) {
                            ti(o, e);
                            continue
                        }
                        eE && u([ec, eu, ed], e => {
                                m = _(m, e, " ")
                            }
                        );
                        let h = e3(e.nodeName);
                        if (tm(h, c, m)) {
                            if (eF && ("id" === c || "name" === c) && (ti(o, e),
                                m = "user-content-" + m),
                            eP && b(/((--!?|])>)|<\/(style|title)/i, m)) {
                                ti(o, e);
                                continue
                            }
                            if (n && "object" == typeof W && "function" == typeof W.getAttributeType) {
                                if (s)
                                    ;
                                else
                                    switch (W.getAttributeType(h, c)) {
                                        case "TrustedHTML":
                                            m = n.createHTML(m);
                                            break;
                                        case "TrustedScriptURL":
                                            m = n.createScriptURL(m)
                                    }
                            }
                            try {
                                s ? e.setAttributeNS(s, o, m) : e.setAttribute(o, m),
                                    tl(e) ? tr(e) : d(r.removed)
                            } catch (e) {}
                        }
                    }
                    tu("afterSanitizeAttributes", e, null)
                }
                    , tf = function e(t) {
                    let n = null
                        , a = ts(t);
                    for (tu("beforeSanitizeShadowDOM", t, null); n = a.nextNode(); )
                        tu("uponSanitizeShadowNode", n, null),
                        td(n) || (n.content instanceof j && e(n.content),
                            tp(n));
                    tu("afterSanitizeShadowDOM", t, null)
                };
                return r.sanitize = function(e) {
                    let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}
                        , a = null
                        , i = null
                        , o = null
                        , s = null;
                    if ((eK = !e) && (e = "<!-->"),
                    "string" != typeof e && !tc(e)) {
                        if ("function" == typeof e.toString) {
                            if ("string" != typeof (e = e.toString()))
                                throw y("dirty is not a string, aborting")
                        } else
                            throw y("toString is not a function")
                    }
                    if (!r.isSupported)
                        return e;
                    if (eO || e7(t),
                        r.removed = [],
                    "string" == typeof e && (eU = !1),
                        eU) {
                        if (e.nodeName) {
                            let t = e3(e.nodeName);
                            if (!ev[t] || eN[t])
                                throw y("root node is forbidden and cannot be sanitized in-place")
                        }
                    } else if (e instanceof F)
                        (i = (a = to("<!---->")).ownerDocument.importNode(e, !0)).nodeType === $.element && "BODY" === i.nodeName ? a = i : "HTML" === i.nodeName ? a = i : a.appendChild(i);
                    else {
                        if (!eR && !eE && !eA && -1 === e.indexOf("<"))
                            return n && eI ? n.createHTML(e) : e;
                        if (!(a = to(e)))
                            return eR ? null : eI ? en : ""
                    }
                    a && eM && tr(a.firstChild);
                    let c = ts(eU ? e : a);
                    for (; o = c.nextNode(); )
                        td(o) || (o.content instanceof j && tf(o.content),
                            tp(o));
                    if (eU)
                        return e;
                    if (eR) {
                        if (eD)
                            for (s = ei.call(a.ownerDocument); a.firstChild; )
                                s.appendChild(a.firstChild);
                        else
                            s = a;
                        return (eb.shadowroot || eb.shadowrootmode) && (s = es.call(l, s, !0)),
                            s
                    }
                    let d = eA ? a.outerHTML : a.innerHTML;
                    return eA && ev["!doctype"] && a.ownerDocument && a.ownerDocument.doctype && a.ownerDocument.doctype.name && b(V, a.ownerDocument.doctype.name) && (d = "<!DOCTYPE " + a.ownerDocument.doctype.name + ">\n" + d),
                    eE && u([ec, eu, ed], e => {
                            d = _(d, e, " ")
                        }
                    ),
                        n && eI ? n.createHTML(d) : d
                }
                    ,
                    r.setConfig = function() {
                        let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                        e7(e),
                            eO = !0
                    }
                    ,
                    r.clearConfig = function() {
                        e5 = null,
                            eO = !1
                    }
                    ,
                    r.isValidAttribute = function(e, t, n) {
                        return e5 || e7({}),
                            tm(e3(e), e3(t), n)
                    }
                    ,
                    r.addHook = function(e, t) {
                        "function" == typeof t && (el[e] = el[e] || [],
                            m(el[e], t))
                    }
                    ,
                    r.removeHook = function(e) {
                        if (el[e])
                            return d(el[e])
                    }
                    ,
                    r.removeHooks = function(e) {
                        el[e] && (el[e] = [])
                    }
                    ,
                    r.removeAllHooks = function() {
                        el = {}
                    }
                    ,
                    r
            }()
        }
            ,
            e.exports = t()
    },
    38296: function(e, t) {
        "use strict";
        t.N9 = t.SX = void 0;
        var n = function() {
            window.dataLayer = window.dataLayer || []
        };
        t.N9 = function(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}
                , r = "ga-gtag";
            if (!document.getElementById(r)) {
                var i = document.head
                    , o = document.createElement("script");
                o.id = r,
                    o.async = !0,
                    o.src = "https://www.googletagmanager.com/gtag/js?id=".concat(e),
                    i.insertBefore(o, i.firstChild),
                    n(),
                    a("js", new Date),
                    a("config", e, t)
            }
        }
        ;
        var a = t.SX = function() {
            window.dataLayer.push(arguments)
        }
    },
    60885: function(e, t) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
            t.CASE_SENSITIVE_TAG_NAMES_MAP = t.CASE_SENSITIVE_TAG_NAMES = void 0,
            t.CASE_SENSITIVE_TAG_NAMES = ["animateMotion", "animateTransform", "clipPath", "feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDropShadow", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence", "foreignObject", "linearGradient", "radialGradient", "textPath"],
            t.CASE_SENSITIVE_TAG_NAMES_MAP = t.CASE_SENSITIVE_TAG_NAMES.reduce(function(e, t) {
                return e[t.toLowerCase()] = t,
                    e
            }, {})
    },
    38276: function(e, t) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
            t.default = function(e) {
                var t, d, m = e.match(o), h = m && m[1] ? m[1].toLowerCase() : "";
                switch (h) {
                    case a:
                        var p = u(e);
                        if (!s.test(e)) {
                            var f = p.querySelector(r);
                            null === (t = null == f ? void 0 : f.parentNode) || void 0 === t || t.removeChild(f)
                        }
                        if (!l.test(e)) {
                            var f = p.querySelector(i);
                            null === (d = null == f ? void 0 : f.parentNode) || void 0 === d || d.removeChild(f)
                        }
                        return p.querySelectorAll(a);
                    case r:
                    case i:
                        var _ = c(e).querySelectorAll(h);
                        if (l.test(e) && s.test(e))
                            return _[0].parentNode.childNodes;
                        return _;
                    default:
                        if (n)
                            return n(e);
                        var f = c(e, i).querySelector(i);
                        return f.childNodes
                }
            }
        ;
        var n, a = "html", r = "head", i = "body", o = /<([a-zA-Z]+[0-9]?)/, s = /<head[^]*>/i, l = /<body[^]*>/i, c = function(e, t) {
            throw Error("This browser does not support `document.implementation.createHTMLDocument`")
        }, u = function(e, t) {
            throw Error("This browser does not support `DOMParser.prototype.parseFromString`")
        }, d = "object" == typeof window && window.DOMParser;
        if ("function" == typeof d) {
            var m = new d;
            c = u = function(e, t) {
                return t && (e = "<".concat(t, ">").concat(e, "</").concat(t, ">")),
                    m.parseFromString(e, "text/html")
            }
        }
        if ("object" == typeof document && document.implementation) {
            var h = document.implementation.createHTMLDocument();
            c = function(e, t) {
                if (t) {
                    var n = h.documentElement.querySelector(t);
                    return n && (n.innerHTML = e),
                        h
                }
                return h.documentElement.innerHTML = e,
                    h
            }
        }
        var p = "object" == typeof document && document.createElement("template");
        p && p.content && (n = function(e) {
                return p.innerHTML = e,
                    p.content.childNodes
            }
        )
    },
    14152: function(e, t, n) {
        "use strict";
        var a = this && this.__importDefault || function(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }
        ;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
            t.default = function(e) {
                if ("string" != typeof e)
                    throw TypeError("First argument must be a string");
                if (!e)
                    return [];
                var t = e.match(o)
                    , n = t ? t[1] : void 0;
                return (0,
                    i.formatDOM)((0,
                    r.default)(e), null, n)
            }
        ;
        var r = a(n(38276))
            , i = n(1507)
            , o = /<(![a-zA-Z\s]+)>/
    },
    1507: function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
            t.formatAttributes = i,
            t.formatDOM = function e(t, n, o) {
                void 0 === n && (n = null);
                for (var s, l = [], c = 0, u = t.length; c < u; c++) {
                    var d = t[c];
                    switch (d.nodeType) {
                        case 1:
                            var m = function(e) {
                                var t;
                                return t = e = e.toLowerCase(),
                                r.CASE_SENSITIVE_TAG_NAMES_MAP[t] || e
                            }(d.nodeName);
                            (s = new a.Element(m,i(d.attributes))).children = e("template" === m ? d.content.childNodes : d.childNodes, s);
                            break;
                        case 3:
                            s = new a.Text(d.nodeValue);
                            break;
                        case 8:
                            s = new a.Comment(d.nodeValue);
                            break;
                        default:
                            continue
                    }
                    var h = l[c - 1] || null;
                    h && (h.next = s),
                        s.parent = n,
                        s.prev = h,
                        s.next = null,
                        l.push(s)
                }
                return o && ((s = new a.ProcessingInstruction(o.substring(0, o.indexOf(" ")).toLowerCase(),o)).next = l[0] || null,
                    s.parent = n,
                    l.unshift(s),
                l[1] && (l[1].prev = l[0])),
                    l
            }
        ;
        var a = n(47915)
            , r = n(60885);
        function i(e) {
            for (var t = {}, n = 0, a = e.length; n < a; n++) {
                var r = e[n];
                t[r.name] = r.value
            }
            return t
        }
    },
    50484: function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
            t.default = function(e, t) {
                void 0 === e && (e = {});
                var n = {}
                    , c = !!(e.type && s[e.type]);
                for (var u in e) {
                    var d = e[u];
                    if ((0,
                        a.isCustomAttribute)(u)) {
                        n[u] = d;
                        continue
                    }
                    var m = u.toLowerCase()
                        , h = l(m);
                    if (h) {
                        var p = (0,
                            a.getPropertyInfo)(h);
                        switch (i.includes(h) && o.includes(t) && !c && (h = l("default" + m)),
                            n[h] = d,
                        p && p.type) {
                            case a.BOOLEAN:
                                n[h] = !0;
                                break;
                            case a.OVERLOADED_BOOLEAN:
                                "" === d && (n[h] = !0)
                        }
                        continue
                    }
                    r.PRESERVE_CUSTOM_ATTRIBUTES && (n[u] = d)
                }
                return (0,
                    r.setStyleProp)(e.style, n),
                    n
            }
        ;
        var a = n(25726)
            , r = n(74606)
            , i = ["checked", "value"]
            , o = ["input", "select", "textarea"]
            , s = {
            reset: !0,
            submit: !0
        };
        function l(e) {
            return a.possibleStandardNames[e]
        }
    },
    53670: function(e, t, n) {
        "use strict";
        var a = this && this.__importDefault || function(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }
        ;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
            t.default = function e(t, n) {
                void 0 === n && (n = {});
                for (var a = [], r = "function" == typeof n.replace, l = n.transform || o.returnFirstArg, c = n.library || s, u = c.cloneElement, d = c.createElement, m = c.isValidElement, h = t.length, p = 0; p < h; p++) {
                    var f = t[p];
                    if (r) {
                        var _ = n.replace(f, p);
                        if (m(_)) {
                            h > 1 && (_ = u(_, {
                                key: _.key || p
                            })),
                                a.push(l(_, f, p));
                            continue
                        }
                    }
                    if ("text" === f.type) {
                        var g = !f.data.trim().length;
                        if (g && f.parent && !(0,
                            o.canTextBeChildOfNode)(f.parent) || n.trim && g)
                            continue;
                        a.push(l(f.data, f, p));
                        continue
                    }
                    var v = {};
                    o.PRESERVE_CUSTOM_ATTRIBUTES && "tag" === f.type && (0,
                        o.isCustomComponent)(f.name, f.attribs) ? ((0,
                        o.setStyleProp)(f.attribs.style, f.attribs),
                        v = f.attribs) : f.attribs && (v = (0,
                        i.default)(f.attribs, f.name));
                    var x = void 0;
                    switch (f.type) {
                        case "script":
                        case "style":
                            f.children[0] && (v.dangerouslySetInnerHTML = {
                                __html: f.children[0].data
                            });
                            break;
                        case "tag":
                            "textarea" === f.name && f.children[0] ? v.defaultValue = f.children[0].data : f.children && f.children.length && (x = e(f.children, n));
                            break;
                        default:
                            continue
                    }
                    h > 1 && (v.key = p),
                        a.push(l(d(f.name, v, x), f, p))
                }
                return 1 === a.length ? a[0] : a
            }
        ;
        var r = n(67294)
            , i = a(n(50484))
            , o = n(74606)
            , s = {
            cloneElement: r.cloneElement,
            createElement: r.createElement,
            isValidElement: r.isValidElement
        }
    },
    83426: function(e, t, n) {
        "use strict";
        var a = this && this.__importDefault || function(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }
        ;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
            t.htmlToDOM = t.domToReact = t.attributesToProps = t.Text = t.ProcessingInstruction = t.Element = t.Comment = void 0,
            t.default = function(e, t) {
                if ("string" != typeof e)
                    throw TypeError("First argument must be a string");
                return e ? (0,
                    o.default)((0,
                    r.default)(e, (null == t ? void 0 : t.htmlparser2) || l), t) : []
            }
        ;
        var r = a(n(14152));
        t.htmlToDOM = r.default;
        var i = a(n(50484));
        t.attributesToProps = i.default;
        var o = a(n(53670));
        t.domToReact = o.default;
        var s = n(47915);
        Object.defineProperty(t, "Comment", {
            enumerable: !0,
            get: function() {
                return s.Comment
            }
        }),
            Object.defineProperty(t, "Element", {
                enumerable: !0,
                get: function() {
                    return s.Element
                }
            }),
            Object.defineProperty(t, "ProcessingInstruction", {
                enumerable: !0,
                get: function() {
                    return s.ProcessingInstruction
                }
            }),
            Object.defineProperty(t, "Text", {
                enumerable: !0,
                get: function() {
                    return s.Text
                }
            });
        var l = {
            lowerCaseAttributeNames: !1
        }
    },
    74606: function(e, t, n) {
        "use strict";
        var a = this && this.__importDefault || function(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }
        ;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
            t.returnFirstArg = t.canTextBeChildOfNode = t.ELEMENTS_WITH_NO_TEXT_CHILDREN = t.PRESERVE_CUSTOM_ATTRIBUTES = void 0,
            t.isCustomComponent = function(e, t) {
                return e.includes("-") ? !o.has(e) : !!(t && "string" == typeof t.is)
            }
            ,
            t.setStyleProp = function(e, t) {
                if ("string" == typeof e) {
                    if (!e.trim()) {
                        t.style = {};
                        return
                    }
                    try {
                        t.style = (0,
                            i.default)(e, s)
                    } catch (e) {
                        t.style = {}
                    }
                }
            }
        ;
        var r = n(67294)
            , i = a(n(41476))
            , o = new Set(["annotation-xml", "color-profile", "font-face", "font-face-src", "font-face-uri", "font-face-format", "font-face-name", "missing-glyph"])
            , s = {
            reactCompat: !0
        };
        t.PRESERVE_CUSTOM_ATTRIBUTES = Number(r.version.split(".")[0]) >= 16,
            t.ELEMENTS_WITH_NO_TEXT_CHILDREN = new Set(["tr", "tbody", "thead", "tfoot", "colgroup", "table", "head", "html", "frameset"]),
            t.canTextBeChildOfNode = function(e) {
                return !t.ELEMENTS_WITH_NO_TEXT_CHILDREN.has(e.name)
            }
            ,
            t.returnFirstArg = function(e) {
                return e
            }
    },
    18139: function(e) {
        var t = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//g
            , n = /\n/g
            , a = /^\s*/
            , r = /^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/
            , i = /^:\s*/
            , o = /^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};])+)/
            , s = /^[;\s]*/
            , l = /^\s+|\s+$/g;
        function c(e) {
            return e ? e.replace(l, "") : ""
        }
        e.exports = function(e, l) {
            if ("string" != typeof e)
                throw TypeError("First argument must be a string");
            if (!e)
                return [];
            l = l || {};
            var u = 1
                , d = 1;
            function m(e) {
                var t = e.match(n);
                t && (u += t.length);
                var a = e.lastIndexOf("\n");
                d = ~a ? e.length - a : d + e.length
            }
            function h() {
                var e = {
                    line: u,
                    column: d
                };
                return function(t) {
                    return t.position = new p(e),
                        g(a),
                        t
                }
            }
            function p(e) {
                this.start = e,
                    this.end = {
                        line: u,
                        column: d
                    },
                    this.source = l.source
            }
            p.prototype.content = e;
            var f = [];
            function _(t) {
                var n = Error(l.source + ":" + u + ":" + d + ": " + t);
                if (n.reason = t,
                    n.filename = l.source,
                    n.line = u,
                    n.column = d,
                    n.source = e,
                    l.silent)
                    f.push(n);
                else
                    throw n
            }
            function g(t) {
                var n = t.exec(e);
                if (n) {
                    var a = n[0];
                    return m(a),
                        e = e.slice(a.length),
                        n
                }
            }
            function v(e) {
                var t;
                for (e = e || []; t = x(); )
                    !1 !== t && e.push(t);
                return e
            }
            function x() {
                var t = h();
                if ("/" == e.charAt(0) && "*" == e.charAt(1)) {
                    for (var n = 2; "" != e.charAt(n) && ("*" != e.charAt(n) || "/" != e.charAt(n + 1)); )
                        ++n;
                    if (n += 2,
                    "" === e.charAt(n - 1))
                        return _("End of comment missing");
                    var a = e.slice(2, n - 2);
                    return d += 2,
                        m(a),
                        e = e.slice(n),
                        d += 2,
                        t({
                            type: "comment",
                            comment: a
                        })
                }
            }
            return g(a),
                function() {
                    var e, n = [];
                    for (v(n); e = function() {
                        var e = h()
                            , n = g(r);
                        if (n) {
                            if (x(),
                                !g(i))
                                return _("property missing ':'");
                            var a = g(o)
                                , l = e({
                                type: "declaration",
                                property: c(n[0].replace(t, "")),
                                value: a ? c(a[0].replace(t, "")) : ""
                            });
                            return g(s),
                                l
                        }
                    }(); )
                        !1 !== e && (n.push(e),
                            v(n));
                    return n
                }()
        }
    },
    29238: function(e, t, n) {
        e.exports = window.DOMPurify || (window.DOMPurify = n(27856).default || n(27856))
    },
    91118: function(e, t, n) {
        (window.__NEXT_P = window.__NEXT_P || []).push(["/_app", function() {
            return n(95296)
        }
        ])
    },
    89973: function(e, t, n) {
        "use strict";
        var a = n(85893)
            , r = n(25675)
            , i = n.n(r)
            , o = n(41664)
            , s = n.n(o)
            , l = n(44475)
            , c = n(18765)
            , u = n.n(c);
        t.Z = function(e) {
            let t, {game: n={}, width: r, height: o, link: c=!1} = e, {game_id: d, game_image: m, game_name: h} = n, p = "https://howlongtobeat.com/games/no_boxart.png", f = m ? "https://howlongtobeat.com/games/" + m : p, _ = r, g = o, v = 20, x = 29;
            if (r && o)
                t = "".concat(f, "?width=").concat(r, "&height=").concat(o, "&crop=").concat(r, ":").concat(o, ",smart");
            else {
                var b;
                if (f === p ? (v = 1,
                    x = 1) : (null === (b = n.profile_platform) || void 0 === b ? void 0 : b.includes("Super Nintendo")) ? (v = 4,
                    x = 3) : n.profile_steam > 0 && (v = 2,
                    x = 3),
                r && !o)
                    g = Math.ceil(r / v * x);
                else {
                    if (!o || r)
                        return null;
                    _ = Math.ceil(o / x * v)
                }
                t = f + "?width=".concat(_, "&height=").concat(g, "&crop=").concat(v, ":").concat(x, ",smart")
            }
            let y = (0,
                a.jsx)(i(), {
                loader: l.X,
                src: t,
                width: _,
                height: g,
                alt: "".concat(h, " Box Art"),
                className: u().box_art_image
            });
            return c ? (0,
                a.jsx)(s(), {
                href: "/game/".concat(d),
                "aria-label": h,
                title: h,
                children: y
            }) : y
        }
    },
    76372: function(e, t, n) {
        "use strict";
        var a = n(85893)
            , r = n(93967)
            , i = n.n(r)
            , o = n(60217);
        t.Z = function(e) {
            let {name: t, id: n, className: r, value: s, onChange: l} = e
                , c = o.W_;
            return (0,
                a.jsxs)("select", {
                value: s,
                name: t,
                id: n,
                className: i()("form_select", "back_form", r),
                onChange: l,
                children: [(0,
                    a.jsx)("option", {
                    value: "",
                    children: "All"
                }), c.map(e => (0,
                    a.jsx)("option", {
                    value: e,
                    children: e
                }, e))]
            })
        }
    },
    52207: function(e, t, n) {
        "use strict";
        var a = n(85893)
            , r = n(41664)
            , i = n.n(r)
            , o = n(93967)
            , s = n.n(o)
            , l = n(50587)
            , c = n.n(l)
            , u = n(60217)
            , d = n(6725)
            , m = n(45697)
            , h = n(44310);
        function p(e) {
            let {game: t, userStats: n, isPreloaded: r, displayModifier: o=null, highlight: l=!1, searchTerms: m=""} = e
                , {currentUser: p} = (0,
                d.x)()
                , {game_id: f, game_name: _, game_alias: g, game_name_date: v, game_image: x, game_type: b, release_world: y, comp_lvl_sp: j, comp_lvl_combine: N, comp_all: k, comp_all_count: w, comp_main: S, comp_main_count: C, comp_plus: T, comp_plus_count: E, comp_100: P, comp_100_count: A, comp_lvl_co: O, comp_lvl_mp: M, invested_co: R, invested_co_count: D, invested_mp: I, invested_mp_count: L, review_score: F, count_comp: G, count_review: U, count_backlog: B, count_playing: z, count_speedrun: H, count_retired: q} = t
                , V = g ? g.split(", ").filter(e => m.trim().toLowerCase() === (null == e ? void 0 : e.toLowerCase())) : null
                , W = x ? "https://howlongtobeat.com/games/" + x : "no_boxart.png";
            if (!f || !_)
                return null;
            let X = "";
            X = "dlc" === b || "mod" === b || "hack" === b ? "linear-gradient(rgb(70, 70, 70), rgba(70, 70, 70, 0.85))" : "linear-gradient(rgb(31, 31, 31), rgba(31, 31, 31, 0.85))",
                X = "".concat(X, ", url('").concat("https://howlongtobeat.com", "/games/").concat(x, "?crop=10:3&width=563')");
            let $ = "";
            1 === v && ($ = "(".concat(y, ")"));
            let Z = [];
            return (null === o || "user_stats" === o) && (1 === j && (1 === N ? Z.push((0,
                a.jsxs)(a.Fragment, {
                children: [(0,
                    a.jsx)("div", {
                    className: s()(c().search_list_tidbit_short, "text_white", "shadow_text"),
                    children: "Solo"
                }), (0,
                    a.jsx)("div", {
                    className: s()(c().search_list_tidbit_long, "center", (0,
                        u.Ty)(w)),
                    children: (0,
                        u.$N)(k, "h", "long")
                })]
            })) : Z.push((0,
                a.jsxs)(a.Fragment, {
                children: [(0,
                    a.jsx)("div", {
                    className: s()(c().search_list_tidbit, "text_white", "shadow_text"),
                    children: "Main Story"
                }), (0,
                    a.jsx)("div", {
                    className: s()(c().search_list_tidbit, "center", (0,
                        u.Ty)(C)),
                    children: (0,
                        u.$N)(S, "h", "long")
                }), (0,
                    a.jsx)("div", {
                    className: s()(c().search_list_tidbit, "text_white", "shadow_text"),
                    children: "Main + Extra"
                }), (0,
                    a.jsx)("div", {
                    className: s()(c().search_list_tidbit, "center", (0,
                        u.Ty)(E)),
                    children: (0,
                        u.$N)(T, "h", "long")
                }), (0,
                    a.jsx)("div", {
                    className: s()(c().search_list_tidbit, "text_white", "shadow_text"),
                    children: "Completionist"
                }), (0,
                    a.jsx)("div", {
                    className: s()(c().search_list_tidbit, "center", (0,
                        u.Ty)(A)),
                    children: (0,
                        u.$N)(P, "h", "long")
                })]
            }))),
            (0 === j || 1 === N) && (1 === O || 1 === M) && (1 === O && Z.push((0,
                a.jsxs)(a.Fragment, {
                children: [(0,
                    a.jsx)("div", {
                    className: s()(c().search_list_tidbit_short, "text_white", "shadow_text"),
                    children: "Co-Op"
                }), (0,
                    a.jsx)("div", {
                    className: s()(c().search_list_tidbit_long, "center", (0,
                        u.Ty)(D)),
                    children: (0,
                        u.$N)(R, "h", "long")
                })]
            })),
            1 === M && Z.push((0,
                a.jsxs)(a.Fragment, {
                children: [(0,
                    a.jsx)("div", {
                    className: s()(c().search_list_tidbit_short, "text_white", "shadow_text"),
                    children: "Vs."
                }), (0,
                    a.jsx)("div", {
                    className: s()(c().search_list_tidbit_long, "center", (0,
                        u.Ty)(L)),
                    children: (0,
                        u.$N)(I, "h", "long")
                })]
            })))),
            "user_stats" === o && (G > 0 && Z.push((0,
                a.jsxs)(a.Fragment, {
                children: [(0,
                    a.jsx)("div", {
                    className: s()(c().search_list_tidbit, "text_white", "shadow_text"),
                    children: "Polled"
                }), (0,
                    a.jsx)("div", {
                    className: s()(c().search_list_tidbit, "center", "back_primary"),
                    children: (0,
                        u.uf)(G)
                })]
            })),
            F > 0 && Z.push((0,
                a.jsxs)(a.Fragment, {
                children: [(0,
                    a.jsx)("div", {
                    className: s()(c().search_list_tidbit, "text_white", "shadow_text"),
                    children: "Rated"
                }), (0,
                    a.jsxs)("div", {
                    className: s()(c().search_list_tidbit, "center", "back_primary"),
                    children: [(0,
                        u.Dj)({
                        rating: F,
                        roundNearest: !1,
                        short: !0,
                        userScale: null == p ? void 0 : p.set_review_scale
                    }), " by", " ", (0,
                        u.uf)(U)]
                })]
            })),
            B > 0 && Z.push((0,
                a.jsxs)(a.Fragment, {
                children: [(0,
                    a.jsx)("div", {
                    className: s()(c().search_list_tidbit, "text_white", "shadow_text"),
                    children: "Backlog"
                }), (0,
                    a.jsx)("div", {
                    className: s()(c().search_list_tidbit, "center", "back_primary"),
                    children: (0,
                        u.uf)(B)
                })]
            })),
            z > 0 && Z.push((0,
                a.jsxs)(a.Fragment, {
                children: [(0,
                    a.jsx)("div", {
                    className: s()(c().search_list_tidbit, "text_white", "shadow_text"),
                    children: "Playing"
                }), (0,
                    a.jsx)("div", {
                    className: s()(c().search_list_tidbit, "center", "back_primary"),
                    children: (0,
                        u.uf)(z)
                })]
            })),
            H > 0 && Z.push((0,
                a.jsxs)(a.Fragment, {
                children: [(0,
                    a.jsx)("div", {
                    className: s()(c().search_list_tidbit, "text_white", "shadow_text"),
                    children: "Speedruns"
                }), (0,
                    a.jsx)("div", {
                    className: s()(c().search_list_tidbit, "center", "back_primary"),
                    children: (0,
                        u.uf)(H)
                })]
            })),
            q > 0 && Z.push((0,
                a.jsxs)(a.Fragment, {
                children: [(0,
                    a.jsx)("div", {
                    className: s()(c().search_list_tidbit, "text_white", "shadow_text"),
                    children: "Retired"
                }), (0,
                    a.jsx)("div", {
                    className: s()(c().search_list_tidbit, "center", "back_primary"),
                    children: (0,
                        u.uf)(q)
                })]
            }))),
                (0,
                    a.jsx)("li", {
                    className: s()("back_darkish", c().search_list),
                    style: {
                        backgroundImage: X,
                        borderLeft: !0 === l ? "5px solid #2b7ab9" : m === (null == V ? void 0 : V[0]) ? "5px solid #3da949" : null
                    },
                    children: (0,
                        a.jsxs)("div", {
                        className: c().inside_blur,
                        children: [(0,
                            a.jsx)("div", {
                            className: s()(c().search_list_image),
                            children: (0,
                                a.jsx)(i(), {
                                href: "/game/".concat(f),
                                children: (0,
                                    a.jsx)("img", {
                                    alt: "".concat(_, " Box Art"),
                                    src: "".concat(W, "?width=", 100)
                                })
                            })
                        }), (0,
                            a.jsxs)("div", {
                            className: s()(c().search_list_details),
                            children: [(0,
                                a.jsxs)("h2", {
                                children: [(0,
                                    a.jsx)(i(), {
                                    href: "/game/".concat(f),
                                    className: !0 === l ? "text_blue" : m === (null == V ? void 0 : V[0]) ? "text_green" : "text_white",
                                    title: _,
                                    children: m === (null == V ? void 0 : V[0]) ? V[0] : _
                                }), " ", $]
                            }), (0,
                                a.jsx)("div", {
                                className: s()(c().search_list_details_block),
                                children: Z.map( (e, t) => (0,
                                    a.jsx)("div", {
                                    children: e
                                }, e.key || t))
                            })]
                        }), (0,
                            a.jsx)(h.Z, {
                            game: t,
                            userStats: n,
                            isPreloaded: r
                        })]
                    })
                })
        }
        p.propTypes = {
            game: m.object.isRequired
        },
            t.Z = p
    },
    44310: function(e, t, n) {
        "use strict";
        n.d(t, {
            Z: function() {
                return v
            }
        });
        var a = n(85893)
            , r = n(6725)
            , i = n(67294)
            , o = n(60217)
            , s = n(58221)
            , l = n(43883)
            , c = n(62196)
            , u = n(90854)
            , d = n(41664)
            , m = n.n(d)
            , h = n(12483)
            , p = n.n(h)
            , f = n(93967)
            , _ = n.n(f)
            , g = function(e) {
            var t, n, o;
            let {game: l} = e
                , {currentUser: c} = (0,
                    r.x)()
                , [u,d] = (0,
                    i.useState)(!1)
                , [h,f] = (0,
                    i.useState)(!0)
                , [g,v] = (0,
                    i.useState)(null)
                , [x,b] = (0,
                    i.useState)({
                    lists: []
                })
                , [y,j] = (0,
                    i.useState)(0)
                , [N,k] = (0,
                    i.useState)(!1)
                , [w,S] = (0,
                    i.useState)("")
                , [C,T] = (0,
                    i.useState)("")
                , [E,P] = (0,
                    i.useState)([])
                , A = async e => {
                    let {gameId: t, userId: n} = e
                        , a = await fetch("/api/game/".concat(t, "/user/").concat(n, "/quickGather"), {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            type: "collections"
                        })
                    })
                        , r = await a.json();
                    if (a.ok) {
                        if (r.count >= 0) {
                            var i, o;
                            0 === r.count && k(!0),
                                b(r),
                            (null == r ? void 0 : null === (o = r.lists) || void 0 === o ? void 0 : null === (i = o[0]) || void 0 === i ? void 0 : i.list_id) && (j(Number(r.lists[0].list_id)),
                                P(r.withIn.filter(e => {
                                        var t, n;
                                        return Number(e.list_id) === Number(null == r ? void 0 : null === (n = r.lists) || void 0 === n ? void 0 : null === (t = n[0]) || void 0 === t ? void 0 : t.list_id)
                                    }
                                ))),
                                f(!1)
                        }
                    } else
                        throw Error(r.message || "Failed to change post status!")
                }
            ;
            (0,
                i.useEffect)( () => {
                    (null == l ? void 0 : l.game_id) > 0 && (null == c ? void 0 : c.user_id) && A({
                        gameId: l.game_id,
                        userId: null == c ? void 0 : c.user_id
                    })
                }
                , [l.game_id, null == c ? void 0 : c.user_id]);
            let O = async () => {
                    if (!1 === u) {
                        if (0 === y && 0 === w.trim().length) {
                            alert("You must enter a collection name.");
                            return
                        }
                        d(!0),
                        0 === Number(y) && f(!0);
                        let e = await fetch("/api/game/".concat(l.game_id, "/user/").concat(null == c ? void 0 : c.user_id, "/actionAddCollection"), {
                            method: "POST",
                            body: JSON.stringify({
                                game: l,
                                quickAdd: {
                                    userId: null == c ? void 0 : c.user_id,
                                    userName: null == c ? void 0 : c.user_name,
                                    listId: Number(y),
                                    listName: w,
                                    listNote: C,
                                    listType: "user"
                                }
                            }),
                            headers: {
                                "Content-Type": "application/json"
                            }
                        })
                            , t = await e.json();
                        t.error ? v(t.error) : t.message && (v(),
                            A({
                                gameId: l.game_id,
                                userId: null == c ? void 0 : c.user_id
                            }),
                            k(!1),
                            S(""),
                            T(""),
                            (0,
                                s.L9)({
                                eventName: "user_quickadd",
                                params: {
                                    type: "collection",
                                    game_id: null == l ? void 0 : l.game_id
                                }
                            })),
                            d(!1)
                    }
                }
            ;
            return h ? (0,
                a.jsx)("div", {
                className: "loading_bar"
            }) : (0,
                a.jsxs)("div", {
                className: "in back_secondary shadow_box",
                style: {
                    marginBottom: "0"
                },
                children: [(0,
                    a.jsx)("h4", {
                    className: _()(p().side_header, "text_orange", "back_clear", "center"),
                    children: "Collections"
                }), (0,
                    a.jsxs)("section", {
                    children: [N ? (0,
                        a.jsx)("input", {
                        className: _()(p().collection_field, "form_text", "back_dark"),
                        type: "text",
                        placeholder: "New Collection Name...",
                        maxLength: 80,
                        value: w,
                        onChange: e => S(e.target.value)
                    }) : (0,
                        a.jsx)("select", {
                        className: _()(p().collection_field, "form_select", "back_dark"),
                        onChange: e => {
                            v(),
                                j(Number(e.target.value)),
                                P(null == x ? void 0 : x.withIn.filter(t => Number(t.list_id) === Number(e.target.value)))
                        }
                        ,
                        value: Number(y),
                        children: null == x ? void 0 : x.lists.map(e => (0,
                            a.jsx)("option", {
                            value: e.list_id,
                            children: e.list_name
                        }, e.list_id))
                    }), (0 === E.length || N) && (0,
                        a.jsx)("textarea", {
                        className: _()(p().collection_field, "form_text", "back_dark"),
                        placeholder: "Item Note",
                        value: C,
                        onChange: e => T(e.target.value),
                        maxLength: 255
                    }), (null == E ? void 0 : null === (t = E[0]) || void 0 === t ? void 0 : t.note) && !1 === N && (0,
                        a.jsx)("section", {
                        className: "left",
                        style: {
                            margin: "5px 0"
                        },
                        children: (0,
                            a.jsx)("p", {
                            className: _()(p().collection_note, "global_padding back_dark shadow_box"),
                            style: {
                                border: "1px solid #2b7ab9"
                            },
                            children: null == E ? void 0 : null === (n = E[0]) || void 0 === n ? void 0 : n.note
                        })
                    }), g && (0,
                        a.jsx)("div", {
                        className: "back_red center shadow_box",
                        children: g
                    })]
                }), N ? (0,
                    a.jsx)("button", {
                    className: _()("form_button", "back_red"),
                    style: {
                        float: "left",
                        marginRight: "10px",
                        display: (null == x ? void 0 : x.count) === 0 ? "none" : null
                    },
                    onClick: () => {
                        var e, t;
                        v(),
                            j(null == x ? void 0 : null === (t = x.lists) || void 0 === t ? void 0 : null === (e = t[0]) || void 0 === e ? void 0 : e.list_id),
                            P(null == x ? void 0 : x.withIn.filter(e => {
                                    var t, n;
                                    return Number(e.list_id) === Number(null == x ? void 0 : null === (n = x.lists) || void 0 === n ? void 0 : null === (t = n[0]) || void 0 === t ? void 0 : t.list_id)
                                }
                            )),
                            k(!1)
                    }
                    ,
                    children: "Cancel"
                }) : (0,
                    a.jsx)("button", {
                    className: _()("form_button", "form_blue", "secondary"),
                    style: {
                        float: "left",
                        marginRight: "10px"
                    },
                    onClick: () => {
                        v(),
                            j(0),
                            k(!0)
                    }
                    ,
                    children: "New"
                }), (0,
                    a.jsx)("section", {
                    className: "right",
                    children: 0 === E.length || N ? (0,
                        a.jsxs)(a.Fragment, {
                        children: [(0,
                            a.jsxs)("span", {
                            className: _()(p().collection_new, "text_grey"),
                            children: ["In ", null == x ? void 0 : x.withIn.length, " List", (null == x ? void 0 : x.withIn.length) > 1 ? "s" : ""]
                        }), (0,
                            a.jsx)("button", {
                            className: _()("form_button", "form_blue", "primary"),
                            onClick: () => O(),
                            children: "Add"
                        })]
                    }) : !1 === N && (0,
                        a.jsxs)(a.Fragment, {
                        children: [(0,
                            a.jsx)(m(), {
                            href: "/user/".concat(c.user_name, "/lists/").concat(null == E ? void 0 : null === (o = E[0]) || void 0 === o ? void 0 : o.list_id),
                            className: "text_blueish",
                            children: "View Collection"
                        }), (0,
                            a.jsx)("button", {
                            className: _()("form_button", "back_blue", "center"),
                            style: {
                                marginLeft: "10px",
                                cursor: "no-drop"
                            },
                            children: "✔"
                        })]
                    })
                })]
            })
        }
            , v = function(e) {
            var t, n, d, h, f, v, x, b;
            let {game: y, isPreloaded: j=!1, userStats: N, showToggle: k=!0, isExpanded: w=!1, categoryGap: S=!0} = e
                , {currentUser: C} = (0,
                    r.x)()
                , [T,E] = (0,
                    i.useState)(w)
                , [P,A] = (0,
                    i.useState)(!0)
                , [O,M] = (0,
                    i.useState)(!1)
                , [R,D] = (0,
                    i.useState)(null)
                , [I,L] = (0,
                    i.useState)(N)
                , [F,G] = (0,
                    i.useState)()
                , [U,B] = (0,
                    i.useState)("")
                , [z,H] = (0,
                    i.useState)("")
                , q = async e => {
                    let {gameId: t, userId: n} = e
                        , a = await fetch("/api/game/".concat(t, "/user/").concat(n, "/quickGather"), {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            type: "games"
                        })
                    })
                        , r = await a.json();
                    if (a.ok) {
                        var i;
                        (null == r ? void 0 : r.stats) ? L(r.stats) : L(),
                            (null == r ? void 0 : null === (i = r.table) || void 0 === i ? void 0 : i.length) > 0 ? G(r.table) : G(),
                            A(!1)
                    } else
                        throw Error(r.message || "Failed to change post status!")
                }
            ;
            (0,
                i.useEffect)( () => {
                    (null == y ? void 0 : y.game_id) > 0 && (null == C ? void 0 : C.user_id) && !1 === j && q({
                        gameId: y.game_id,
                        userId: null == C ? void 0 : C.user_id
                    })
                }
                , [y.game_id, null == C ? void 0 : C.user_id]);
            let V = async e => {
                    let {type: t} = e;
                    if (!1 === O) {
                        M(!0);
                        let e = await fetch("/api/game/".concat(y.game_id, "/user/").concat(null == C ? void 0 : C.user_id, "/actionAdd"), {
                            method: "POST",
                            body: JSON.stringify({
                                game: y,
                                quickAdd: {
                                    userId: null == C ? void 0 : C.user_id,
                                    custom: null == C ? void 0 : C.set_customtab,
                                    custom2: null == C ? void 0 : C.set_customtab2,
                                    custom3: null == C ? void 0 : C.set_customtab3,
                                    platform: U,
                                    storefront: z,
                                    type: t
                                }
                            }),
                            headers: {
                                "Content-Type": "application/json"
                            }
                        })
                            , n = await e.json();
                        n.error ? D(n.error) : (D(),
                            q({
                                gameId: y.game_id,
                                userId: null == C ? void 0 : C.user_id
                            }),
                            (0,
                                s.L9)({
                                eventName: "user_quickadd",
                                params: {
                                    type: t,
                                    game_id: null == y ? void 0 : y.game_id
                                }
                            })),
                            M(!1)
                    }
                }
            ;
            function W(e) {
                let {gameTableRow: t, currentUser: n} = e
                    , [r,s] = (0,
                        i.useState)()
                    , [l,c] = (0,
                        i.useState)("text_".concat((0,
                        o.dm)(t)))
                    , d = "text_".concat((0,
                        o.dm)(t, !1))
                    , {game_id: h, platform: f, id: _, custom_title: g, list_playing: v, list_backlog: x, list_replay: b, list_custom: y, list_custom2: j, list_custom3: N, list_comp: k, list_retired: w} = t
                    , S = async e => {
                        let {id: t} = e;
                        "text_green" === l ? c(d) : c("text_green");
                        let a = await fetch("/api/game/".concat(h, "/user/").concat(n.user_id, "/actionPlaying"), {
                            method: "POST",
                            body: JSON.stringify({
                                id: t
                            }),
                            headers: {
                                "Content-Type": "application/json"
                            }
                        })
                            , r = await a.json();
                        if (a.ok)
                            q({
                                gameId: h,
                                userId: null == n ? void 0 : n.user_id
                            });
                        else
                            throw Error(r.message || "Failed to change post status!")
                    }
                    , C = async e => {
                        let {id: t} = e;
                        if (!0 === confirm("Are you sure you want to delete ".concat(g).concat(f ? " on ".concat(f) : "", "?"))) {
                            let e = await fetch("/api/game/".concat(h, "/user/").concat(n.user_id, "/actionDelete"), {
                                method: "POST",
                                body: JSON.stringify({
                                    id: t
                                }),
                                headers: {
                                    "Content-Type": "application/json"
                                }
                            })
                                , a = await e.json();
                            if (e.ok)
                                q({
                                    gameId: h,
                                    userId: null == n ? void 0 : n.user_id
                                });
                            else
                                throw Error(a.message || "Failed to change post status!")
                        }
                    }
                ;
                return (0,
                    a.jsxs)("tbody", {
                    className: "spreadsheet",
                    children: [(0,
                        a.jsxs)("tr", {
                        children: [(0,
                            a.jsx)("td", {
                            children: (0,
                                a.jsx)("span", {
                                className: l,
                                children: (0,
                                    a.jsx)("strong", {
                                    children: f || "No Platform"
                                })
                            })
                        }), (0,
                            a.jsxs)("td", {
                            children: [(0,
                                a.jsx)("img", {
                                title: "Show Details",
                                alt: "Show Details",
                                src: "".concat("https://howlongtobeat.com", "/img/icon_expand.png"),
                                className: p().action_button,
                                onClick: () => r === _ ? s() : s(_)
                            }), 1 === v && 0 === x && 0 === b && 0 === y && 0 === j && 0 === N && 0 === k && 0 === w ? null : (0,
                                a.jsx)("img", {
                                alt: "Toggle Playing",
                                onClick: () => S({
                                    id: _
                                }),
                                className: p().action_button,
                                src: "".concat("https://howlongtobeat.com", "/img/icon_play.png")
                            }), (0,
                                a.jsx)(m(), {
                                href: "/submit/edit/".concat(_),
                                title: "Edit",
                                children: (0,
                                    a.jsx)("img", {
                                    alt: "Edit",
                                    src: "".concat("https://howlongtobeat.com", "/img/icon_edit.png")
                                })
                            }), (0,
                                a.jsx)("img", {
                                alt: "Delete",
                                onClick: () => C({
                                    id: _
                                }),
                                className: p().action_button,
                                src: "".concat("https://howlongtobeat.com", "/img/icon_delete.png")
                            })]
                        })]
                    }), r === _ && (0,
                        a.jsx)(u.Z, {
                        memberGamesId: _,
                        playstyle: n.set_playstyle,
                        currentUser: n,
                        currentUserHome: !0
                    })]
                })
            }
            return (0,
                a.jsxs)(a.Fragment, {
                children: [!0 === k && (0,
                    a.jsxs)("div", {
                    className: _()(p().user_details),
                    children: [(null == C ? void 0 : C.user_id) > 0 ? !1 === T ? (0,
                        a.jsxs)(a.Fragment, {
                        children: [(0,
                            a.jsx)("span", {
                            className: "right",
                            style: {
                                cursor: "pointer"
                            },
                            onClick: () => {
                                !0 === j && q({
                                    gameId: y.game_id,
                                    userId: null == C ? void 0 : C.user_id
                                }),
                                    E(!0)
                            }
                            ,
                            children: "Add to Profile"
                        }), (0,
                            a.jsxs)("div", {
                            className: p().holder,
                            children: [(null == I ? void 0 : I.user_playing) > 0 && (0,
                                a.jsx)("strong", {
                                className: "back_green",
                                children: "Playing"
                            }), (null == I ? void 0 : I.user_backlog) > 0 && (0,
                                a.jsx)("strong", {
                                className: "back_blue",
                                children: "Backlog"
                            }), (null == I ? void 0 : I.user_replays) > 0 && (0,
                                a.jsx)("strong", {
                                className: "back_blueish",
                                children: "Replay"
                            }), (null == I ? void 0 : I.user_custom) > 0 && (0,
                                a.jsx)("strong", {
                                className: "back_teal",
                                children: (null == C ? void 0 : C.set_customtab) ? C.set_customtab : "Custom"
                            }), (null == I ? void 0 : I.user_custom2) > 0 && (0,
                                a.jsx)("strong", {
                                className: "back_teal",
                                children: (null == C ? void 0 : C.set_customtab2) ? C.set_customtab2 : "Custom2"
                            }), (null == I ? void 0 : I.user_custom3) > 0 && (0,
                                a.jsx)("strong", {
                                className: "back_teal",
                                children: (null == C ? void 0 : C.set_customtab3) ? C.set_customtab3 : "Custom3"
                            }), (null == I ? void 0 : I.user_comp) > 0 && (0,
                                a.jsx)("strong", {
                                className: "back_purple",
                                children: "Completed"
                            }), (null == I ? void 0 : I.user_retired) > 0 && (0,
                                a.jsx)("strong", {
                                className: "back_red",
                                children: "Retired"
                            })]
                        })]
                    }) : (0,
                        a.jsx)("span", {
                        className: "right",
                        style: {
                            cursor: "pointer"
                        },
                        onClick: () => E(!1),
                        children: "Close Options"
                    }) : (0,
                        a.jsx)("span", {
                        className: "right",
                        children: (0,
                            a.jsx)(m(), {
                            className: "text_white",
                            href: "/login",
                            children: "Add to Profile"
                        })
                    }), (0,
                        a.jsx)("div", {
                        className: "clear"
                    })]
                }), (!0 === T || !0 === w) && (P ? (0,
                    a.jsx)("div", {
                    className: "loading_bar"
                }) : (0,
                    a.jsxs)(a.Fragment, {
                    children: [(0,
                        a.jsxs)("div", {
                        className: "in back_secondary shadow_box",
                        children: [(0,
                            a.jsx)("h4", {
                            className: _()(p().side_header, "text_orange", "back_clear", "center"),
                            children: "My Games"
                        }), (0,
                            a.jsxs)("div", {
                            className: p().quick_add,
                            children: [(0,
                                a.jsx)(l.Z, {
                                name: "quickadd_platform",
                                addonList: null === (t = y.profile_platform) || void 0 === t ? void 0 : t.split(", "),
                                hideBonusPlatforms: !1,
                                className: "back_dark",
                                defaultLabel: "Platform...",
                                value: U,
                                onChange: e => {
                                    B(e.target.value)
                                }
                            }), (0,
                                a.jsx)(c.Z, {
                                name: "quickadd_storefront",
                                className: "back_dark",
                                defaultLabel: "Storefront...",
                                value: z,
                                onChange: e => {
                                    H(e.target.value)
                                }
                            }), (0,
                                a.jsxs)("a", {
                                className: _()(p().game_options, "back_dark", "text_white"),
                                title: "Add to Playing",
                                onClick: () => {
                                    V({
                                        game: y,
                                        type: "playing"
                                    })
                                }
                                ,
                                children: [(0,
                                    a.jsx)("span", {
                                    className: _()(p().num, (null == I ? void 0 : I.user_playing) > 0 ? "back_green" : "back_darkish"),
                                    children: null !== (n = null == I ? void 0 : I.user_playing) && void 0 !== n ? n : 0
                                }), "Playing"]
                            }), (0,
                                a.jsxs)("a", {
                                className: _()(p().game_options, "back_dark", "text_white"),
                                title: "Add to Backlog",
                                onClick: () => {
                                    V({
                                        game: y,
                                        type: "backlog"
                                    })
                                }
                                ,
                                children: [(0,
                                    a.jsx)("span", {
                                    className: _()(p().num, (null == I ? void 0 : I.user_backlog) > 0 ? "back_blue" : "back_darkish"),
                                    children: null !== (d = null == I ? void 0 : I.user_backlog) && void 0 !== d ? d : 0
                                }), "Backlog"]
                            }), (0,
                                a.jsxs)("a", {
                                className: _()(p().game_options, "back_dark", "text_white"),
                                title: "Add to Replay",
                                onClick: () => {
                                    V({
                                        game: y,
                                        type: "replay"
                                    })
                                }
                                ,
                                children: [(0,
                                    a.jsx)("span", {
                                    className: _()(p().num, (null == I ? void 0 : I.user_replays) > 0 ? "back_blueish" : "back_darkish"),
                                    children: null !== (h = null == I ? void 0 : I.user_replays) && void 0 !== h ? h : 0
                                }), "Replay"]
                            }), (null == C ? void 0 : C.set_customtab) ? (0,
                                a.jsxs)("a", {
                                className: _()(p().game_options, "back_dark", "text_white"),
                                title: "Add to ".concat(null == C ? void 0 : C.set_customtab),
                                onClick: () => {
                                    V({
                                        game: y,
                                        type: "custom"
                                    })
                                }
                                ,
                                children: [(0,
                                    a.jsx)("span", {
                                    className: _()(p().num, (null == I ? void 0 : I.user_custom) > 0 ? "back_teal" : "back_darkish"),
                                    children: null !== (f = null == I ? void 0 : I.user_custom) && void 0 !== f ? f : 0
                                }), null == C ? void 0 : C.set_customtab]
                            }) : null, (null == C ? void 0 : C.set_customtab2) ? (0,
                                a.jsxs)("a", {
                                className: _()(p().game_options, "back_dark", "text_white"),
                                title: "Add to ".concat(null == C ? void 0 : C.set_customtab2),
                                onClick: () => {
                                    V({
                                        game: y,
                                        type: "custom2"
                                    })
                                }
                                ,
                                children: [(0,
                                    a.jsx)("span", {
                                    className: _()(p().num, (null == I ? void 0 : I.user_custom2) > 0 ? "back_teal" : "back_darkish"),
                                    children: null !== (v = null == I ? void 0 : I.user_custom2) && void 0 !== v ? v : 0
                                }), null == C ? void 0 : C.set_customtab2]
                            }) : null, (null == C ? void 0 : C.set_customtab3) ? (0,
                                a.jsxs)("a", {
                                className: _()(p().game_options, "back_dark", "text_white"),
                                title: "Add to ".concat(null == C ? void 0 : C.set_customtab3),
                                onClick: () => {
                                    V({
                                        game: y,
                                        type: "custom3"
                                    })
                                }
                                ,
                                children: [(0,
                                    a.jsx)("span", {
                                    className: _()(p().num, (null == I ? void 0 : I.user_custom3) > 0 ? "back_teal" : "back_darkish"),
                                    children: null !== (x = null == I ? void 0 : I.user_custom3) && void 0 !== x ? x : 0
                                }), null == C ? void 0 : C.set_customtab3]
                            }) : null, (0,
                                a.jsxs)("div", {
                                className: _()(p().game_options, "back_dark", p().completed),
                                children: [(0,
                                    a.jsx)("a", {
                                    className: _()("text_white", p().completed),
                                    title: "Add to Completions",
                                    onClick: () => {
                                        V({
                                            game: y,
                                            type: "comp"
                                        })
                                    }
                                    ,
                                    children: "Completed"
                                }), (0,
                                    a.jsx)("span", {
                                    className: _()(p().num, (null == I ? void 0 : I.user_comp) > 0 ? "back_purple" : "back_darkish"),
                                    style: {
                                        color: "#FFFFFF",
                                        float: "right"
                                    },
                                    children: null !== (b = null == I ? void 0 : I.user_comp) && void 0 !== b ? b : 0
                                }), (0,
                                    a.jsx)("span", {
                                    className: _()(p().detailed, "back_darkish"),
                                    children: (0,
                                        a.jsx)(m(), {
                                        href: "/submit/game/".concat(y.game_id, "?").concat(U ? "platform=".concat(encodeURIComponent(U), "&") : "").concat(z ? "storefront=".concat(encodeURIComponent(z), "&") : "", "completed=1"),
                                        title: "Add to Detail Completions",
                                        className: "text_white",
                                        children: "Detailed"
                                    })
                                })]
                            }), R ? (0,
                                a.jsx)("div", {
                                className: "text_red center",
                                children: R
                            }) : null, (0,
                                a.jsx)("div", {
                                className: "clear"
                            }), F ? (0,
                                a.jsxs)(a.Fragment, {
                                children: [(0,
                                    a.jsx)(function(e) {
                                    let {userTable: t, currentUser: n} = e;
                                    return (0,
                                        a.jsx)("table", {
                                        className: _()(p().profile_quick_add, "back_dark"),
                                        children: t.map(e => (0,
                                            a.jsx)(W, {
                                            gameTableRow: e,
                                            currentUser: n
                                        }, e.id))
                                    })
                                }, {
                                    userTable: F,
                                    currentUser: C
                                }), (0,
                                    a.jsx)("div", {
                                    className: "clear"
                                })]
                            }) : null]
                        })]
                    }), (null == y ? void 0 : y.game_type) !== "" && (null == y ? void 0 : y.game_type) !== null && (null == y ? void 0 : y.game_type) !== "delay" && (null == y ? void 0 : y.game_type) !== "omit" && (0,
                        a.jsxs)(a.Fragment, {
                        children: [S && (0,
                            a.jsx)("div", {
                            className: "content_break"
                        }), (0,
                            a.jsx)(g, {
                            game: y
                        })]
                    })]
                })), (0,
                    a.jsx)("div", {
                    className: "clear"
                })]
            })
        }
    },
    61367: function(e, t, n) {
        "use strict";
        var a = n(85893)
            , r = n(93967)
            , i = n.n(r)
            , o = n(60217);
        t.Z = function(e) {
            let {name: t, id: n, className: r, value: s, onChange: l} = e
                , c = o.Hc;
            return (0,
                a.jsxs)("select", {
                value: s,
                name: t,
                id: n,
                className: i()("form_select", "back_form", r),
                onChange: l,
                children: [(0,
                    a.jsx)("option", {
                    value: "",
                    children: "All"
                }), c.map(e => (0,
                    a.jsx)("option", {
                    value: e,
                    children: e
                }, e))]
            })
        }
    },
    75602: function(e, t, n) {
        "use strict";
        var a = n(85893)
            , r = n(93967)
            , i = n.n(r)
            , o = n(60217);
        t.Z = function(e) {
            let {name: t, id: n, className: r, value: s, onChange: l} = e
                , c = o.EI;
            return (0,
                a.jsxs)("select", {
                value: s,
                name: t,
                id: n,
                className: i()("form_select", "back_form", r),
                onChange: l,
                children: [(0,
                    a.jsx)("option", {
                    value: "",
                    children: "All"
                }), c.map(e => (0,
                    a.jsx)("option", {
                    value: e,
                    children: e
                }, e))]
            })
        }
    },
    43883: function(e, t, n) {
        "use strict";
        var a = n(85893)
            , r = n(93967)
            , i = n.n(r)
            , o = n(6725)
            , s = n(11163)
            , l = n(60217);
        t.Z = function(e) {
            var t;
            let {onChange: n, className: r, name: c, defaultLabel: u="All Platforms", value: d="", addonList: m=[], hideAllPlatforms: h=!1, hideBonusPlatforms: p=!0, disabled: f=!1} = e
                , _ = (0,
                s.useRouter)()
                , {currentUser: g} = (0,
                o.x)()
                , v = !1 === p ? [].concat(l.OS, l.GG) : l.OS
                , x = [];
            return m.length >= 1 && (_.asPath.includes("/submit") && "search_platform" !== c || "quickadd_platform" === c) ? x.push((0,
                a.jsx)("optgroup", {
                label: "Recommended Platforms",
                children: m.map(e => (0,
                    a.jsx)("option", {
                    value: e,
                    children: e
                }, e))
            }, "recommend_platforms")) : m.length >= 1 && _.asPath.includes("/user") && "search_platform" !== c ? (_.asPath.includes("/stats") || x.push((0,
                a.jsx)("option", {
                value: "Unlisted",
                children: "Unlisted"
            }, "platform_unlisted")),
                x.push((0,
                    a.jsx)("optgroup", {
                    label: "".concat(_.asPath.startsWith("/user/".concat(null == g ? void 0 : g.user_name)) ? "My" : "User", " Platforms"),
                    children: m.map(e => (0,
                        a.jsx)("option", {
                        value: e,
                        children: e
                    }, "my_".concat(e)))
                }, "".concat(_.asPath.startsWith("/user/".concat(null == g ? void 0 : g.user_name)) ? "My" : "User", " Platforms")))) : (null == g ? void 0 : null === (t = g.user_platforms) || void 0 === t ? void 0 : t.platform) ? x.push((0,
                a.jsx)("optgroup", {
                label: "My Platforms",
                children: g.user_platforms.platform.map(e => (0,
                    a.jsx)("option", {
                    value: e,
                    children: e
                }, "my_".concat(e)))
            }, "my_platforms")) : x.push((0,
                a.jsxs)("optgroup", {
                label: "Popular Platforms",
                children: [(0,
                    a.jsx)("option", {
                    value: "Emulated",
                    children: "Emulated"
                }), (0,
                    a.jsx)("option", {
                    value: "Nintendo 3DS",
                    children: "Nintendo 3DS"
                }), (0,
                    a.jsx)("option", {
                    value: "Nintendo Switch",
                    children: "Nintendo Switch"
                }), (0,
                    a.jsx)("option", {
                    value: "PC",
                    children: "PC"
                }), (0,
                    a.jsx)("option", {
                    value: "PlayStation 3",
                    children: "PlayStation 3"
                }), (0,
                    a.jsx)("option", {
                    value: "PlayStation 4",
                    children: "PlayStation 4"
                }), (0,
                    a.jsx)("option", {
                    value: "PlayStation 5",
                    children: "PlayStation 5"
                }), (0,
                    a.jsx)("option", {
                    value: "PlayStation Now",
                    children: "PlayStation Now"
                }), (0,
                    a.jsx)("option", {
                    value: "Wii U",
                    children: "Wii U"
                }), (0,
                    a.jsx)("option", {
                    value: "Xbox 360",
                    children: "Xbox 360"
                }), (0,
                    a.jsx)("option", {
                    value: "Xbox One",
                    children: "Xbox One"
                }), (0,
                    a.jsx)("option", {
                    value: "Xbox Series X/S",
                    children: "Xbox Series X/S"
                })]
            }, "popular_platforms")),
                v.sort( (e, t) => e.localeCompare(t, void 0, {
                    sensitivity: "base"
                })),
                (0,
                    a.jsxs)("select", {
                    "aria-label": "Platform",
                    value: d,
                    name: c,
                    autoComplete: "off",
                    className: i()("form_select", r || "back_form"),
                    disabled: f,
                    onChange: n,
                    children: [(0,
                        a.jsx)("option", {
                        value: "",
                        children: u
                    }), x, !1 === h && (0,
                        a.jsx)("optgroup", {
                        label: "All Platforms",
                        children: v.map(e => (0,
                            a.jsx)("option", {
                            value: e,
                            children: e
                        }, "all_".concat(e)))
                    }, "all_platforms")]
                })
        }
    },
    62196: function(e, t, n) {
        "use strict";
        var a = n(85893)
            , r = n(93967)
            , i = n.n(r)
            , o = n(6725)
            , s = n(11163)
            , l = n(60217);
        t.Z = function(e) {
            var t;
            let {onChange: n, className: r, name: c, defaultLabel: u="All Storefronts", value: d="", addonList: m=[], hideAllStorefronts: h=!1} = e
                , p = (0,
                s.useRouter)()
                , {currentUser: f} = (0,
                o.x)()
                , _ = [];
            !1 === h && (_ = l.j7);
            let g = [];
            m.length >= 1 ? (p.asPath.includes("/stats") || g.push((0,
                a.jsx)("option", {
                value: "Unlisted",
                children: "Unlisted"
            }, "storefront_unlisted")),
                g.push((0,
                    a.jsx)("optgroup", {
                    label: "".concat(p.asPath.startsWith("/user/".concat(null == f ? void 0 : f.user_name)) ? "My" : "User", " Storefronts"),
                    children: m.map(e => (0,
                        a.jsx)("option", {
                        value: e,
                        children: e
                    }, "user_".concat(e)))
                }, "".concat(p.asPath.startsWith("/user/".concat(null == f ? void 0 : f.user_name)) ? "My" : "User", " Storefronts")))) : (null == f ? void 0 : null === (t = f.user_platforms) || void 0 === t ? void 0 : t.storefront) && g.push((0,
                a.jsx)("optgroup", {
                label: "My Storefronts",
                children: f.user_platforms.storefront.map(e => (0,
                    a.jsx)("option", {
                    value: e,
                    children: e
                }, "my_".concat(e)))
            }, "My Storefronts"));
            let v = []
                , x = 0;
            for (let e of _) {
                let t = [];
                _[x][Object.keys(e)].forEach(e => {
                        t.push((0,
                            a.jsx)("option", {
                            value: e,
                            children: e
                        }, e))
                    }
                ),
                    x++,
                    v.push((0,
                        a.jsx)("optgroup", {
                        label: Object.keys(e),
                        children: t
                    }, Object.keys(e)))
            }
            return (0,
                a.jsxs)("select", {
                "aria-label": "Storefront",
                value: d,
                name: c,
                autoComplete: "off",
                className: i()("form_select", r || "back_form"),
                onChange: n,
                children: [(0,
                    a.jsx)("option", {
                    value: "",
                    children: u
                }), g, v]
            })
        }
    },
    20115: function(e, t, n) {
        "use strict";
        var a = n(85893)
            , r = n(93967)
            , i = n.n(r);
        t.Z = function(e) {
            let {name: t, id: n, className: r, value: o, onChange: s, years: l, defaultLabel: c="All"} = e;
            l && (l = l.filter(e => 0 !== e));
            let u = [];
            if (void 0 !== l)
                u = l;
            else
                for (let e = new Date().getFullYear(); e >= 1958; e--)
                    u.push(e);
            return (0,
                a.jsxs)("select", {
                value: o,
                name: t,
                id: n,
                className: i()("form_select", "back_form", r),
                onChange: s,
                children: [(0,
                    a.jsxs)("option", {
                    value: "",
                    children: [c, " ", void 0 !== l && "Time"]
                }), u.map(e => (0,
                    a.jsx)("option", {
                    value: e,
                    children: e
                }, e))]
            })
        }
    },
    26217: function(e, t, n) {
        "use strict";
        var a = n(85893)
            , r = n(6725);
        t.Z = function(e) {
            let {adType: t="square", location: n="top", divClass: i=null} = e
                , {currentUser: o} = (0,
                r.x)();
            return (null == o ? void 0 : o.profile_ign_prime) === 1 ? null : i ? (0,
                a.jsx)("div", {
                className: i,
                children: (0,
                    a.jsx)("div", {
                    id: "bobble_".concat(t),
                    "data-pogo": n,
                    className: "ad-padding scrollable"
                })
            }) : (0,
                a.jsx)("div", {
                id: "bobble_".concat(t),
                "data-pogo": n,
                className: "ad-padding scrollable"
            })
        }
    },
    6352: function(e, t, n) {
        "use strict";
        var a = n(85893)
            , r = n(32840)
            , i = n.n(r)
            , o = n(93967)
            , s = n.n(o)
            , l = n(67294)
            , c = n(75850)
            , u = n(11163)
            , d = n.n(u);
        t.Z = function(e) {
            let {pageType: t="page", scrollIntoView: n=!1, labelOn: r=!0, pageCurrent: o, pageTotal: m, selectColor: h="back_blue"} = e
                , {searchPage: p, setSearchPage: f, isVisible: _} = (0,
                    c.Rx)()
                , g = !0 === n && o > 1 ? Math.random().toString(36).slice(2, 7) : null
                , v = (0,
                    u.useRouter)()
                , x = (e, t) => {
                    if ("searchPage" === e)
                        f(Number(t));
                    else {
                        var n, a, r;
                        let i = {};
                        "userCollectionList" === e ? i.listId = [null === (n = v.query.listId) || void 0 === n ? void 0 : n[0], null === (a = v.query.listId) || void 0 === a ? void 0 : a[1], t > 1 ? t : null] : "userGamesList" === e ? i.lists = [null === (r = v.query.lists) || void 0 === r ? void 0 : r[0], t > 1 ? t : 1] : i[e] = encodeURIComponent(t),
                            d().replace({
                                pathname: v.pathname,
                                query: {
                                    ...v.query,
                                    ...i
                                }
                            })
                    }
                }
            ;
            (0,
                l.useEffect)( () => {
                    if (g) {
                        var e;
                        null === (e = document.getElementById(g)) || void 0 === e || e.scrollIntoView()
                    }
                }
                , [g]),
                (0,
                    l.useEffect)( () => {
                        p > 1 && !0 === _ && document.getElementById("search-results-header").scrollIntoView()
                    }
                    , [p]);
            let b = [];
            if (m <= 5e3) {
                let e = o > 100 ? o - 100 : 1;
                for (let t = e; t <= o + 100 && t <= m; t++)
                    b.push(t)
            }
            let y = () => o > 1 && (0,
                a.jsx)("button", {
                className: s()(i().left, "form_button", i().inactive),
                onClick: () => x(t, parseInt(o) - 1),
                children: "<"
            })
                , j = () => o < m && (0,
                a.jsx)("button", {
                className: s()(i().right, "form_button", i().inactive),
                onClick: () => x(t, parseInt(o) + 1),
                children: ">"
            });
            return (0,
                a.jsxs)(a.Fragment, {
                children: [!0 === r ? (0,
                    a.jsx)("strong", {
                    className: s()(i().label, "mobile_hide"),
                    children: "Page"
                }) : null, (0,
                    a.jsx)("div", {
                    className: s()(i().user_pagination),
                    id: g,
                    children: m > 6 ? (0,
                        a.jsxs)(a.Fragment, {
                        children: [y(), 1 !== o && (0,
                            a.jsx)("button", {
                            className: s()(i().left, "form_button", i().inactive),
                            onClick: () => x(t, 1),
                            children: "1"
                        }), m > 5e3 ? (0,
                            a.jsxs)(a.Fragment, {
                            children: [o - 1 > 1 && (0,
                                a.jsx)("button", {
                                className: s()(i().left, "form_button", i().inactive),
                                onClick: () => x(t, o - 1),
                                children: o - 1
                            }), (0,
                                a.jsx)("span", {
                                className: s()(i().left, "form_button", h),
                                children: o
                            }), o + 1 < m && (0,
                                a.jsx)("button", {
                                className: s()(i().left, "form_button", i().inactive),
                                onClick: () => x(t, o + 1),
                                children: o + 1
                            })]
                        }) : (0,
                            a.jsx)("select", {
                            className: s()(h, "form_select"),
                            name: "page",
                            value: o,
                            onChange: e => x(t, e.target.value),
                            children: b.map(e => (0,
                                a.jsxs)("option", {
                                value: e,
                                children: ["Page ", e]
                            }, "".concat(t, "_").concat(Math.random())))
                        }), j(), o + 1 <= m && (0,
                            a.jsx)("button", {
                            className: s()(i().right, "form_button", i().inactive),
                            onClick: () => x(t, m),
                            children: m
                        })]
                    }) : (0,
                        a.jsxs)(a.Fragment, {
                        children: [y(), b.map(e => (0,
                            a.jsx)("button", {
                            className: s()("form_button", e === o ? h : i().inactive),
                            onClick: () => x(t, e),
                            children: e
                        }, "".concat(t, "_").concat(Math.random()))), j()]
                    })
                })]
            })
        }
    },
    86600: function(e, t, n) {
        "use strict";
        var a = n(85893)
            , r = n(25675)
            , i = n.n(r)
            , o = n(41664)
            , s = n.n(o)
            , l = n(29591)
            , c = n.n(l)
            , u = n(44475);
        t.Z = function(e) {
            let {user: t, width: n, link: r=!1, overridePrivacy: o=!1} = e
                , {user_name: l, user_avatar: d="no_avatar.png", set_privacy: m=!1} = t
                , h = "https://howlongtobeat.com/avatars/" + (o || 0 === m ? d : "no_avatar.png") + "?width=" + n + "&crop=1:1,smart"
                , p = (0,
                a.jsx)(i(), {
                loader: u.X,
                src: h,
                width: n,
                height: n,
                alt: "".concat(l, "'s Avatar'"),
                className: c().user_avatar_image
            });
            return r ? (0,
                a.jsx)(s(), {
                href: "/user/".concat(l),
                "aria-label": l,
                title: l,
                children: p
            }) : p
        }
    },
    58244: function(e, t, n) {
        "use strict";
        var a = n(85893)
            , r = n(60217)
            , i = n(89973)
            , o = n(41664)
            , s = n.n(o)
            , l = n(93967)
            , c = n.n(l)
            , u = n(56881)
            , d = n.n(u);
        t.Z = function(e) {
            let {item: t, showUser: n=!1, userNameInURL: o} = e;
            return (0,
                a.jsxs)("li", {
                className: c()("back_primary", d().collection_card, "shadow_box"),
                children: [(0,
                    a.jsxs)("div", {
                    className: c()(d().headers, "back_form"),
                    children: [(0,
                        a.jsxs)("h3", {
                        children: [(0,
                            a.jsx)("span", {
                            className: c()(d().follows, t.list_privacy > 0 ? "text_grey" : "back_primary", "shadow_border"),
                            title: "".concat(t.stat_follows, " Followers"),
                            children: t.list_privacy > 0 ? (0,
                                r.wn)(t.list_privacy) : "".concat(t.stat_follows, " Followers")
                        }), (0,
                            a.jsx)(s(), {
                            className: "text_primary",
                            href: "/user/".concat(o || t.user_name, "/lists/").concat(t.list_id),
                            children: (0,
                                a.jsx)("div", {
                                className: d().title,
                                children: t.list_name
                            })
                        })]
                    }), !0 === n && (0,
                        a.jsxs)("h4", {
                        children: ["Created By ", (0,
                            a.jsx)(s(), {
                            href: "/user/".concat(t.user_name),
                            className: (0,
                                r.xe)(t.user_rights),
                            children: t.user_name
                        })]
                    })]
                }), (0,
                    a.jsxs)(s(), {
                    href: "/user/".concat(t.user_name, "/lists/").concat(t.list_id),
                    children: [(0,
                        a.jsx)("div", {
                        className: c()(d().collection_images, "mobile_hide"),
                        children: t.game_images.split(",").splice(0, 4).map(e => (0,
                            a.jsx)("div", {
                            children: (0,
                                a.jsx)(i.Z, {
                                game: {
                                    game_image: e
                                },
                                width: 70,
                                height: 70
                            })
                        }, e))
                    }), (0,
                        a.jsx)("div", {
                        className: c()(d().collection_images, "desktop_hide"),
                        children: t.game_images.split(",").splice(0, 4).map(e => (0,
                            a.jsx)("div", {
                            children: (0,
                                a.jsx)(i.Z, {
                                game: {
                                    game_image: e
                                },
                                width: 50,
                                height: 70
                            })
                        }, e))
                    })]
                }), (0,
                    a.jsxs)("div", {
                    className: c()(d().collection_card_details),
                    children: [(0,
                        a.jsx)("div", {
                        className: c()(d().collection_card_tidbit_short),
                        children: "Games"
                    }), (0,
                        a.jsx)("div", {
                        className: c()(d().collection_card_tidbit_short, "back_form", "center"),
                        children: t.total_games - t.total_dlc
                    }), (0,
                        a.jsx)("div", {
                        className: c()(d().collection_card_tidbit_short),
                        children: "Add-Ons"
                    }), (0,
                        a.jsx)("div", {
                        className: c()(d().collection_card_tidbit_short, "back_form", "center"),
                        children: t.total_dlc
                    }), (0,
                        a.jsx)("div", {
                        className: c()(d().collection_card_tidbit_short),
                        children: "Total Length"
                    }), (0,
                        a.jsx)("div", {
                        className: c()(d().collection_card_tidbit_short, "back_blue", "center"),
                        children: (0,
                            r.$N)(t.length_total, "h", "long")
                    }), (0,
                        a.jsx)("div", {
                        className: c()(d().collection_card_tidbit_short),
                        children: "Avg. Length"
                    }), (0,
                        a.jsx)("div", {
                        className: c()(d().collection_card_tidbit_short, "back_blue", "center"),
                        children: (0,
                            r.$N)(t.length_avg, "h", "long")
                    })]
                })]
            })
        }
    },
    90854: function(e, t, n) {
        "use strict";
        var a = n(85893)
            , r = n(67294)
            , i = n(60217)
            , o = n(52471)
            , s = n.n(o);
        t.Z = function(e) {
            let t, n, {game: o, memberGamesId: l, playstyle: c, reviewScale: u, currentUser: d, currentUserHome: m} = e, [h,p] = (0,
                r.useState)(o || {}), [f,_] = (0,
                r.useState)("none");
            if ((0,
                r.useEffect)( () => {
                    async function e(e) {
                        let {memberGamesId: t, playstyle: n} = e
                            , a = await fetch("/api/user/game_detail/".concat(t, "/").concat(n), {
                            method: "GET",
                            headers: {
                                "Content-Type": "application/json"
                            }
                        })
                            , r = await a.json();
                        if (!a.ok)
                            throw Error(r.message || "Something went wrong!");
                        p(r)
                    }
                    (null == o ? void 0 : o.id) || !l || e({
                        memberGamesId: l,
                        playstyle: c
                    })
                }
                , []),
                !h.id)
                return null;
            let {comp_all: g, comp_main: v, comp_main_notes: x, comp_plus: b, comp_plus_notes: y, comp_100: j, comp_100_notes: N, comp_speed: k, comp_speed_notes: w, comp_speed100: S, comp_speed100_notes: C, date_complete: T, date_updated: E, invested_co: P, invested_mp: A, invested_pro: O, list_backlog: M, list_comp: R, list_custom2: D, list_custom3: I, list_custom: L, list_playing: F, list_replay: G, list_retired: U, play_count: B, play_notes: z, play_storefront: H, play_video: q, retired_notes: V, review_notes: W, review_score: X, review_score_g: $} = h
                , Z = h["".concat(c, "_g")] || null;
            if (1 === F || 1 === M || 1 === G || 1 === L || 1 === D || 1 === I) {
                let e, n, r;
                O > 0 ? e = (0,
                    a.jsx)("h5", {
                    children: "Progress"
                }) : (Z > 0 || g > 0) && (e = (0,
                    a.jsx)("h5", {
                    children: "Time to Beat"
                })),
                O > 0 && (n = (0,
                    i.$N)(O, "hms") + " / "),
                    Z > 0 ? r = (0,
                        a.jsx)("strong", {
                        children: (0,
                            i.$N)(Z, "hms")
                    }) : g > 0 && (r = (0,
                        a.jsx)("strong", {
                        style: {
                            color: "#707070"
                        },
                        children: (0,
                            i.$N)(g, "hms")
                    })),
                    t = (0,
                        a.jsxs)("div", {
                        children: [e, (0,
                            a.jsx)("div", {
                            className: s().user_game_main,
                            children: n || r ? (0,
                                a.jsxs)("span", {
                                className: "back_light",
                                children: [n, r]
                            }) : null
                        })]
                    })
            }
            let Y = "";
            if (1 === R) {
                let e, t, n, r, o;
                (v > 0 || x && "" !== x) && (e = (0,
                    a.jsxs)(a.Fragment, {
                    children: [(0,
                        a.jsx)("h5", {
                        children: "Main Story"
                    }), (0,
                        a.jsx)("div", {
                        className: s().user_game_main,
                        children: (0,
                            a.jsx)("span", {
                            className: "back_light",
                            children: v > 0 && (0,
                                a.jsx)(a.Fragment, {
                                children: (0,
                                    i.$N)(v, "hms")
                            })
                        })
                    }), x && "" !== x && (0,
                        a.jsxs)(a.Fragment, {
                        children: [(0,
                            a.jsx)("h5", {
                            children: "Notes"
                        }), " ", (0,
                            a.jsx)("div", {
                            className: s().user_game_main,
                            children: x
                        })]
                    })]
                })),
                (b > 0 || y && "" !== y) && (t = (0,
                    a.jsxs)(a.Fragment, {
                    children: [(0,
                        a.jsx)("h5", {
                        children: "Main+Extras"
                    }), (0,
                        a.jsx)("div", {
                        className: s().user_game_main,
                        children: (0,
                            a.jsx)("span", {
                            className: "back_light",
                            children: b > 0 && (0,
                                a.jsx)(a.Fragment, {
                                children: (0,
                                    i.$N)(b, "hms")
                            })
                        })
                    }), y && "" !== y && (0,
                        a.jsxs)(a.Fragment, {
                        children: [(0,
                            a.jsx)("h5", {
                            children: "Notes"
                        }), " ", (0,
                            a.jsx)("div", {
                            className: s().user_game_main,
                            children: y
                        })]
                    })]
                })),
                (j > 0 || N && "" !== N) && (n = (0,
                    a.jsxs)(a.Fragment, {
                    children: [(0,
                        a.jsx)("h5", {
                        children: "Completionist"
                    }), (0,
                        a.jsx)("div", {
                        className: s().user_game_main,
                        children: (0,
                            a.jsx)("span", {
                            className: "back_light",
                            children: j > 0 && (0,
                                a.jsx)(a.Fragment, {
                                children: (0,
                                    i.$N)(j, "hms")
                            })
                        })
                    }), N && "" !== N && (0,
                        a.jsxs)(a.Fragment, {
                        children: [(0,
                            a.jsx)("h5", {
                            children: "Notes"
                        }), " ", (0,
                            a.jsx)("div", {
                            className: s().user_game_main,
                            children: N
                        })]
                    })]
                })),
                (k > 0 || w && "" !== w) && (r = (0,
                    a.jsxs)(a.Fragment, {
                    children: [(0,
                        a.jsx)("h5", {
                        children: "Speedrun"
                    }), (0,
                        a.jsx)("div", {
                        className: s().user_game_main,
                        children: (0,
                            a.jsx)("span", {
                            className: "back_light",
                            children: k > 0 && (0,
                                a.jsx)(a.Fragment, {
                                children: (0,
                                    i.$N)(k, "hms")
                            })
                        })
                    }), w && "" !== w && (0,
                        a.jsxs)(a.Fragment, {
                        children: [(0,
                            a.jsx)("h5", {
                            children: "Notes"
                        }), " ", (0,
                            a.jsx)("div", {
                            className: s().user_game_main,
                            children: w
                        })]
                    })]
                })),
                (S > 0 || C && "" !== C) && (o = (0,
                    a.jsxs)(a.Fragment, {
                    children: [(0,
                        a.jsx)("h5", {
                        children: "100% Speedrun"
                    }), (0,
                        a.jsx)("div", {
                        className: s().user_game_main,
                        children: (0,
                            a.jsx)("span", {
                            className: "back_light",
                            children: S > 0 && (0,
                                a.jsx)(a.Fragment, {
                                children: (0,
                                    i.$N)(S, "hms")
                            })
                        })
                    }), C && "" !== C && (0,
                        a.jsxs)(a.Fragment, {
                        children: [(0,
                            a.jsx)("h5", {
                            children: "Notes"
                        }), " ", (0,
                            a.jsx)("div", {
                            className: s().user_game_main,
                            children: C
                        })]
                    })]
                })),
                    Y = (0,
                        a.jsxs)("div", {
                        children: [(0,
                            a.jsx)("h4", {
                            className: "back_blue",
                            children: "Single-Player"
                        }), (0,
                            a.jsx)("h5", {
                            children: "Playthrough"
                        }), (0,
                            a.jsx)("div", {
                            className: s().user_game_main,
                            children: (0,
                                a.jsx)("p", {
                                children: B > 1 ? "Replay" : "First"
                            })
                        }), 1 === R && T && "0000-00-00" !== T && "" !== T && (0,
                            a.jsx)(a.Fragment, {
                            children: (0,
                                a.jsxs)("div", {
                                children: [(0,
                                    a.jsx)("h5", {
                                    children: "Completion"
                                }), (0,
                                    a.jsx)("div", {
                                    className: s().user_game_main,
                                    children: (0,
                                        a.jsx)("p", {
                                        className: "text_blue",
                                        children: (0,
                                            i.ce)(T)
                                    })
                                })]
                            })
                        }), e, t, n, r, o]
                    })
            }
            return (P > 0 || A > 0) && (n = (0,
                a.jsxs)("div", {
                children: [(0,
                    a.jsx)("h4", {
                    className: "back_pink",
                    children: "Multi-Player"
                }), P > 0 && (0,
                    a.jsxs)(a.Fragment, {
                    children: [(0,
                        a.jsx)("h5", {
                        children: "Co-Op"
                    }), (0,
                        a.jsx)("div", {
                        className: s().user_game_main,
                        children: (0,
                            a.jsx)("span", {
                            className: "back_light",
                            children: (0,
                                i.$N)(P, "hms")
                        })
                    })]
                }), A > 0 && (0,
                    a.jsxs)(a.Fragment, {
                    children: [(0,
                        a.jsx)("h5", {
                        children: "Vs."
                    }), (0,
                        a.jsx)("div", {
                        className: s().user_game_main,
                        children: (0,
                            a.jsx)("span", {
                            className: "back_light",
                            children: (0,
                                i.$N)(A, "hms")
                        })
                    })]
                })]
            })),
                (0,
                    a.jsx)("tr", {
                    children: (0,
                        a.jsx)("td", {
                        colSpan: "100%",
                        style: {
                            display: "table-cell"
                        },
                        className: "user_null",
                        children: (0,
                            a.jsxs)("div", {
                            className: s().user_game_detail,
                            children: [(0,
                                a.jsxs)("div", {
                                children: [(0,
                                    a.jsx)("h5", {
                                    children: "Lists"
                                }), (0,
                                    a.jsxs)("div", {
                                    className: s().user_game_main,
                                    children: [1 === F && (0,
                                        a.jsxs)(a.Fragment, {
                                        children: [(0,
                                            a.jsx)("span", {
                                            className: "back_green",
                                            children: "Playing"
                                        }), " "]
                                    }), 1 === M && (0,
                                        a.jsxs)(a.Fragment, {
                                        children: [(0,
                                            a.jsx)("span", {
                                            className: "back_blue",
                                            children: "Backlog"
                                        }), " "]
                                    }), 1 === G && (0,
                                        a.jsxs)(a.Fragment, {
                                        children: [(0,
                                            a.jsx)("span", {
                                            className: "back_blue",
                                            children: "Replay"
                                        }), " "]
                                    }), 1 === L && (0,
                                        a.jsxs)(a.Fragment, {
                                        children: [(0,
                                            a.jsx)("span", {
                                            className: "back_teal",
                                            children: m && void 0 !== d.set_customtab && "" !== d.set_customtab ? null == d ? void 0 : d.set_customtab : "Custom List"
                                        }), " "]
                                    }), 1 === D && (0,
                                        a.jsxs)(a.Fragment, {
                                        children: [(0,
                                            a.jsx)("span", {
                                            className: "back_teal",
                                            children: m && void 0 !== d.set_customtab2 && "" !== d.set_customtab2 ? null == d ? void 0 : d.set_customtab2 : "Custom List 2"
                                        }), " "]
                                    }), 1 === I && (0,
                                        a.jsxs)(a.Fragment, {
                                        children: [(0,
                                            a.jsx)("span", {
                                            className: "back_teal",
                                            children: m && void 0 !== d.set_customtab3 && "" !== d.set_customtab3 ? null == d ? void 0 : d.set_customtab3 : "Custom List 3"
                                        }), " "]
                                    }), 1 === R && (0,
                                        a.jsxs)(a.Fragment, {
                                        children: [(0,
                                            a.jsx)("span", {
                                            className: "back_purple",
                                            children: "Completed"
                                        }), " "]
                                    }), 1 === U && (0,
                                        a.jsxs)(a.Fragment, {
                                        children: [(0,
                                            a.jsx)("span", {
                                            className: "back_red",
                                            children: "Retired"
                                        }), " "]
                                    })]
                                })]
                            }), t, 1 === U && V && "" !== V && (0,
                                a.jsxs)(a.Fragment, {
                                children: [(0,
                                    a.jsx)("h5", {
                                    className: "text_red",
                                    children: "Retired Notes"
                                }), (0,
                                    a.jsx)("div", {
                                    className: s().user_game_main,
                                    children: V
                                })]
                            }), Y, n, (0,
                                a.jsx)("h4", {
                                className: "back_darkish",
                                children: "General"
                            }), H && "" !== H.trim() && (0,
                                a.jsxs)("div", {
                                children: [(0,
                                    a.jsx)("h5", {
                                    children: "Storefront"
                                }), (0,
                                    a.jsx)("div", {
                                    className: s().user_game_main,
                                    children: (0,
                                        a.jsx)("p", {
                                        children: H
                                    })
                                })]
                            }), z && "" !== z.trim() && (0,
                                a.jsxs)("div", {
                                children: [(0,
                                    a.jsx)("h5", {
                                    children: "Personal Notes"
                                }), (0,
                                    a.jsx)("div", {
                                    className: s().user_game_main,
                                    children: (0,
                                        a.jsx)("p", {
                                        children: z
                                    })
                                })]
                            }), (X > 0 || $ > 0) && (0,
                                a.jsxs)("div", {
                                children: [(0,
                                    a.jsx)("h5", {
                                    children: "Rated"
                                }), (0,
                                    a.jsxs)("div", {
                                    className: s().user_game_main,
                                    children: [X > 0 && (0,
                                        a.jsx)("p", {
                                        children: "User: ".concat((0,
                                            i.Dj)({
                                            rating: X,
                                            userScale: u || (null == d ? void 0 : d.set_review_scale)
                                        }))
                                    }), $ > 0 && (0,
                                        a.jsx)("p", {
                                        children: "Global: ".concat((0,
                                            i.Dj)({
                                            rating: $,
                                            roundNearest: !1,
                                            userScale: u || (null == d ? void 0 : d.set_review_scale)
                                        }))
                                    })]
                                })]
                            }), W && "" !== W.trim() && (0,
                                a.jsxs)("div", {
                                children: [(0,
                                    a.jsx)("h5", {
                                    children: "Review"
                                }), (0,
                                    a.jsxs)("div", {
                                    className: s().youtube_video,
                                    children: [(0,
                                        a.jsx)("br", {
                                        className: "desktop_hide"
                                    }), (0,
                                        i.oJ)({
                                        msg: W,
                                        allowedTags: ["quote", "spoiler", "b", "i", "u", "s"]
                                    })]
                                })]
                            }), "0000-00-00 00:00:00" !== E && "" !== E && (0,
                                a.jsxs)("div", {
                                children: [(0,
                                    a.jsx)("h5", {
                                    children: "Updated"
                                }), (0,
                                    a.jsx)("div", {
                                    className: s().user_game_main,
                                    children: (0,
                                        a.jsx)("p", {
                                        className: s().timestamp,
                                        onMouseOver: () => _("inline-block"),
                                        onMouseOut: () => _("none"),
                                        children: "0000-00-00 00:00:00" !== E && "inline-block" === f ? "".concat(E, " UTC") : (0,
                                            i.Sy)(E)
                                    })
                                })]
                            }), q && (0,
                                a.jsxs)("div", {
                                children: [(0,
                                    a.jsx)("h5", {
                                    children: "Playthrough Video"
                                }), (0,
                                    a.jsx)("div", {
                                    className: s().youtube_video,
                                    children: (0,
                                        a.jsx)("iframe", {
                                        style: {
                                            maxWidth: "100%",
                                            width: "640px",
                                            height: "360px"
                                        },
                                        src: "https://www.youtube.com/embed/".concat(q, "?rel=0"),
                                        frameBorder: "0",
                                        allowFullScreen: !0
                                    })
                                })]
                            })]
                        })
                    })
                })
        }
    },
    6725: function(e, t, n) {
        "use strict";
        n.d(t, {
            M: function() {
                return s
            },
            x: function() {
                return l
            }
        });
        var a = n(85893)
            , r = n(67294)
            , i = n(11163);
        let o = (0,
            r.createContext)({
            currentUser: {},
            setCurrentUser: () => {}
        });
        function s(e) {
            let {children: t} = e
                , [n,s] = (0,
                r.useState)({})
                , l = (0,
                i.useRouter)();
            async function c() {
                var e, t, n, a, r, i, o, c, u, d;
                let m = await fetch("/api/user", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                    , h = await m.json();
                if (!m.ok)
                    throw Error(h.message || "Something went wrong!");
                (null === (t = h.data) || void 0 === t ? void 0 : null === (e = t[0]) || void 0 === e ? void 0 : e.user_name) && ((null === (a = h.data) || void 0 === a ? void 0 : null === (n = a[0]) || void 0 === n ? void 0 : n.redirect) === "password" && ("/user/[userName]/options/account/[type]" !== l.pathname || "/login/unlock/[unlockCode]" !== l.pathname) ? l.push("/user/".concat(null === (c = h.data) || void 0 === c ? void 0 : null === (o = c[0]) || void 0 === o ? void 0 : o.user_name, "/options/account/password?forgot=true")) : (null === (i = h.data) || void 0 === i ? void 0 : null === (r = i[0]) || void 0 === r ? void 0 : r.redirect) === "email" && "/user/[userName]/options/account/[type]" !== l.pathname && l.push("/user/".concat(null === (d = h.data) || void 0 === d ? void 0 : null === (u = d[0]) || void 0 === u ? void 0 : u.user_name, "/options/account/email")),
                    s(h.data[0]))
            }
            let u = async () => {
                    let e = await fetch("/api/logout", {
                        method: "GET"
                    });
                    "success" === (await e.json()).status && (s({}),
                        l.push("/"))
                }
            ;
            return (0,
                r.useEffect)( () => {
                    "/logout" !== l.pathname && c()
                }
                , [l.pathname]),
                (0,
                    a.jsx)(o.Provider, {
                    value: {
                        logout: u,
                        currentUser: n,
                        setCurrentUser: s
                    },
                    children: t
                })
        }
        function l() {
            return (0,
                r.useContext)(o)
        }
    },
    75850: function(e, t, n) {
        "use strict";
        n.d(t, {
            Nd: function() {
                return d
            },
            Rx: function() {
                return m
            }
        });
        var a = n(85893)
            , r = n(67294)
            , i = n(11163)
            , o = n.n(i)
            , s = n(6725)
            , l = n(24697)
            , c = n(58221);
        let u = (0,
            r.createContext)();
        function d(e) {
            var t, n;
            let {children: d} = e
                , {currentUser: m} = (0,
                s.x)()
                , h = (0,
                i.useRouter)()
                , p = (null == h ? void 0 : null === (n = h.query) || void 0 === n ? void 0 : null === (t = n.q) || void 0 === t ? void 0 : t.length) > 0 ? decodeURIComponent(h.query.q) : ""
                , [f,_] = (0,
                r.useState)(!0)
                , [g,v] = (0,
                r.useState)("games")
                , [x,b] = (0,
                r.useState)(!1)
                , [y,j] = (0,
                r.useState)(p)
                , [N,k] = (0,
                r.useState)("")
                , [w,S] = (0,
                r.useState)("popular")
                , [C,T] = (0,
                r.useState)("main")
                , [E,P] = (0,
                r.useState)()
                , [A,O] = (0,
                r.useState)()
                , [M,R] = (0,
                r.useState)("")
                , [D,I] = (0,
                r.useState)("")
                , [L,F] = (0,
                r.useState)("")
                , [G,U] = (0,
                r.useState)("")
                , [B,z] = (0,
                r.useState)("")
                , [H,q] = (0,
                r.useState)("")
                , [V,W] = (0,
                r.useState)("follows")
                , [X,$] = (0,
                r.useState)("postcount")
                , [Z,Y] = (0,
                r.useState)("")
                , [J,K] = (0,
                r.useState)(0)
                , [Q,ee] = (0,
                r.useState)(0)
                , [et,en] = (0,
                r.useState)({
                count: 0,
                data: []
            })
                , [ea,er] = (0,
                r.useState)(1)
                , ei = (0,
                r.useCallback)( () => b(!0), [])
                , eo = (0,
                r.useCallback)( () => b(!1), [])
                , es = async () => {
                var e, t;
                (0,
                    c.L9)({
                    eventName: "search",
                    params: {
                        search_type: g,
                        search_terms: y,
                        search_page: ea
                    }
                }),
                ((null == h ? void 0 : null === (t = h.query) || void 0 === t ? void 0 : null === (e = t.q) || void 0 === e ? void 0 : e.length) > 0 || (null == y ? void 0 : y.length) > 0) && o().replace({
                    pathname: h.pathname,
                    query: {
                        ...h.query,
                        q: encodeURIComponent(y)
                    }
                }, void 0, {
                    shallow: !0
                });
                let n = await fetch("/api/search/".concat("5fe4b12e81a8fb4c"), {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        searchType: g,
                        searchTerms: y.trim().split(" "),
                        searchPage: ea,
                        size: 20,
                        searchOptions: {
                            games: {
                                userId: (null == m ? void 0 : m.user_id) ? m.user_id : 0,
                                platform: N,
                                sortCategory: w,
                                rangeCategory: C,
                                rangeTime: {
                                    min: parseInt(E),
                                    max: parseInt(A)
                                },
                                gameplay: {
                                    perspective: M,
                                    flow: D,
                                    genre: L
                                },
                                rangeYear: {
                                    min: G,
                                    max: B
                                },
                                modifier: H
                            },
                            users: {
                                sortCategory: X
                            },
                            lists: {
                                sortCategory: V
                            },
                            filter: Z,
                            sort: parseInt(J),
                            randomizer: parseInt(Q)
                        },
                        useCache: !((null == m ? void 0 : m.user_id) > 0)
                    })
                })
                    , a = await n.json();
                if (!n.ok)
                    throw Error(a.message || "Something went wrong!");
                en(a),
                    _(!1)
            }
                , el = (0,
                l.y1)( () => {
                    es()
                }
                , 750);
            return (0,
                r.useEffect)( () => {
                    var e, t;
                    (null == h ? void 0 : null === (t = h.query) || void 0 === t ? void 0 : null === (e = t.q) || void 0 === e ? void 0 : e.length) >= 0 ? ei() : x && eo()
                }
                , [h.query]),
                (0,
                    r.useEffect)( () => {
                        var e;
                        !x || (null == et ? void 0 : et.count) !== 0 || (null == h ? void 0 : null === (e = h.query) || void 0 === e ? void 0 : e.q) ? !x && h.query.q && (delete h.query.q,
                            h.replace({
                                pathname: h.pathname,
                                query: h.query
                            }, void 0, {
                                shallow: !0
                            })) : (_(!0),
                            el())
                    }
                    , [x]),
                (0,
                    r.useEffect)( () => {
                        x && (en({
                            count: 0,
                            data: []
                        }),
                            _(!0),
                            el())
                    }
                    , [ea]),
                (0,
                    r.useEffect)( () => {
                        x && (er(1),
                            en({
                                count: 0,
                                data: []
                            }),
                            _(!0),
                            el())
                    }
                    , [g, y, N, w, C, E, A, M, D, L, G, B, H, V, X, Z, J, Q]),
                (0,
                    a.jsx)(u.Provider, {
                    value: {
                        debounce: el,
                        isLoading: f,
                        searchType: g,
                        setSearchType: v,
                        isVisible: x,
                        searchTerms: y,
                        setSearchTerms: j,
                        searchPlatform: N,
                        setSearchPlatform: k,
                        searchSortCategory: w,
                        setSearchSortCategory: S,
                        searchRangeCategory: C,
                        setSearchRangeCategory: T,
                        searchRangeTimeMin: E,
                        setSearchRangeTimeMin: P,
                        searchRangeTimeMax: A,
                        setSearchRangeTimeMax: O,
                        searchPerspective: M,
                        setSearchPerspective: R,
                        searchFlow: D,
                        setSearchFlow: I,
                        searchGenre: L,
                        setSearchGenre: F,
                        searchRangeYearMin: G,
                        setSearchRangeYearMin: U,
                        searchRangeYearMax: B,
                        setSearchRangeYearMax: z,
                        searchModifier: H,
                        setSearchModifier: q,
                        searchSortList: V,
                        setSearchSortList: W,
                        searchSortUser: X,
                        setSearchSortUser: $,
                        searchFilter: Z,
                        setSearchFilter: Y,
                        searchOrder: J,
                        setSearchOrder: K,
                        searchRandomizer: Q,
                        setSearchRandomizer: ee,
                        results: et,
                        searchPage: ea,
                        setSearchPage: er,
                        openSearch: ei,
                        closeSearch: eo
                    },
                    children: d
                })
        }
        function m() {
            return (0,
                r.useContext)(u)
        }
        t.ZP = u
    },
    58221: function(e, t, n) {
        "use strict";
        n.d(t, {
            L9: function() {
                return o
            },
            mp: function() {
                return r
            },
            tN: function() {
                return i
            }
        });
        var a = n(38296);
        let r = () => {
            (0,
                a.N9)("G-LNSNNH2NMQ")
        }
            , i = e => {
            let {url: t, title: n, eventLabel: r="page_view", universalParams: i} = e;
            (0,
                a.SX)("event", r, {
                page_view: 1,
                page_location: t,
                page_title: n,
                ...i
            })
        }
            , o = e => {
            let {eventName: t, params: n={}} = e;
            (0,
                a.SX)("event", t, {
                engagement: 1,
                ...n
            })
        }
    },
    60217: function(e, t, n) {
        "use strict";
        n.d(t, {
            e3: function() {
                return j
            },
            oJ: function() {
                return M
            },
            Fw: function() {
                return v
            },
            Dw: function() {
                return b
            },
            YW: function() {
                return A
            },
            ce: function() {
                return P
            },
            rG: function() {
                return T
            },
            Dj: function() {
                return y
            },
            uf: function() {
                return C
            },
            pN: function() {
                return o
            },
            W_: function() {
                return u
            },
            _1: function() {
                return g
            },
            Hc: function() {
                return d
            },
            dm: function() {
                return R
            },
            EI: function() {
                return c
            },
            S_: function() {
                return D
            },
            OS: function() {
                return h
            },
            GG: function() {
                return m
            },
            wn: function() {
                return _
            },
            Ac: function() {
                return w
            },
            j7: function() {
                return p
            },
            Ty: function() {
                return S
            },
            xe: function() {
                return x
            },
            vn: function() {
                return O
            },
            Jq: function() {
                return f
            },
            NM: function() {
                return s
            },
            Nm: function() {
                return l
            },
            XV: function() {
                return N
            },
            $N: function() {
                return k
            },
            Dh: function() {
                return I
            },
            Sy: function() {
                return E
            }
        });
        var a = n(29238)
            , r = n(83426)
            , i = r.default || r;
        let o = 25;
        function s(e, t) {
            let n = Math.pow(10, t || 0);
            return Math.round(e * n) / n
        }
        function l(e, t) {
            return Math.round(e / t) * t
        }
        let c = ["First-Person", "Isometric", "Side", "Text", "Third-Person", "Top-Down", "Virtual Reality"]
            , u = ["Incremental", "Massively Multiplayer", "Multidirectional", "On-Rails", "Point-and-Click", "Real-Time", "Scrolling", "Turn-Based"]
            , d = ["Action", "Adventure", "Arcade", "Battle Arena", "Beat em Up", "Board Game", "Breakout", "Card Game", "City-Building", "Compilation", "Educational", "Fighting", "Fitness", "Flight", "Full Motion Video (FMV)", "Hack and Slash", "Hidden Object", "Horror", "Interactive Art", "Management", "Music/Rhythm", "Open World", "Party", "Pinball", "Platform", "Puzzle", "Racing/Driving", "Roguelike", "Role-Playing", "Sandbox", "Shooter", "Simulation", "Social", "Sports", "Stealth", "Strategy/Tactical", "Survival", "Tower Defense", "Trivia", "Vehicular Combat", "Visual Novel"]
            , m = ["Android", "Emulated", "iOS", "PC VR", "PlayStation Now", "PlayStation VR", "PlayStation VR2"]
            , h = ["3DO", "Acorn Archimedes", "Amazon Luna", "Amiga", "Amiga CD32", "Amstrad CPC", "Apple II", "Arcade", "Atari 2600", "Atari 5200", "Atari 7800", "Atari 8-bit Family", "Atari Jaguar", "Atari Jaguar CD", "Atari Lynx", "Atari ST", "BBC Micro", "Browser", "ColecoVision", "Commodore 64", "Commodore PET", "Commodore VIC-20", "Dreamcast", "Evercade", "FM Towns", "FM-7", "Game & Watch", "Game Boy", "Game Boy Advance", "Game Boy Color", "Gear VR", "Google Stadia", "Gizmondo", "Intellivision", "Interactive Movie", "Linux", "Mac", "Meta Quest", "Mobile", "MSX", "N-Gage", "NEC PC-88", "NEC PC-98", "NEC PC-FX", "Neo Geo", "Neo Geo CD", "Neo Geo Pocket", "NES", "Nintendo 3DS", "Nintendo 64", "Nintendo DS", "Nintendo GameCube", "Nintendo Switch", "Oculus Go", "Odyssey", "Odyssey 2", "OnLive", "Ouya", "PC", "Philips CD-i", "Playdate", "PlayStation", "PlayStation 2", "PlayStation 3", "PlayStation 4", "PlayStation 5", "PlayStation Mobile", "PlayStation Portable", "PlayStation Vita", "Plug & Play", "Sega 32X", "Sega CD", "Sega Game Gear", "Sega Master System", "Sega Mega Drive/Genesis", "Sega Pico", "Sega Saturn", "SG-1000", "Sharp X1", "Sharp X68000", "Super Nintendo", "Tiger Handheld", "TurboGrafx-16", "TurboGrafx-CD", "Vectrex", "Virtual Boy", "Wii", "Wii U", "Windows Phone", "WonderSwan", "Xbox", "Xbox 360", "Xbox One", "Xbox Series X/S", "Zeebo", "ZX81", "ZX Spectrum"]
            , p = [{
            Digital: ["Amazon Game App", "Amazon Luna", "Apple App Store", "Arc", "Battle.net", "Bethesda", "Direct Download", "Discord", "EA App", "Epic Games", "GameCenter", "Game Jolt", "GOG", "Google Play", "Google Stadia", "Humble Bundle", "IndieGala", "itch.io", "JAST USA", "Kartridge", "Legacy Games", "Meta Store", "Microsoft Store", "Nintendo eShop", "Paradox Games", "Playdate Catalog", "PlayStation Store", "Robot Cache", "Rockstar Games", "Steam", "Ubisoft Connect", "Xbox Store"]
        }, {
            Physical: ["Borrowed", "Physical", "Rented"]
        }, {
            Subscription: ["Antstream Arcade", "Apple Arcade", "EA Play", "Google Play Pass", "Google Stadia Pro", "Netflix", "Nintendo Online", "PlayStation Now", "PlayStation Plus", "Ubisoft+", "Viveport", "Xbox Game Pass", "Xbox Games w/ Gold"]
        }];
        function f(e, t) {
            return t.includes(e) || !0 === t.includes("Mobile") && ("Android" === e || "iOS" === e || "Windows Phone" === e) || !0 === t.includes("PC") && ("Linux" === e || "Mac" === e) ? "native" : !0 === t.includes("Game Boy") && ("Game Boy Color" === e || "Game Boy Advance" === e) || !0 === t.includes("Game Boy Color") && "Game Boy Advance" === e || !0 === t.includes("Game Boy Advance") && "Nintendo DS" === e || !0 === t.includes("Nintendo DS") && "Nintendo 3DS" === e || !0 === t.includes("Nintendo GameCube") && "Wii" === e || !0 === t.includes("PlayStation") && ("PlayStation 2" === e || "PlayStation 3" === e || "PlayStation Portable" === e || "PlayStation Vita" === e) || !0 === t.includes("PlayStation 2") && "PlayStation 3" === e || !0 === t.includes("PlayStation 3") && "PlayStation Now" === e || !0 === t.includes("PlayStation 4") && ("PlayStation Now" === e || "PlayStation 5" === e) || !0 === t.includes("PlayStation Portable") && "PlayStation Vita" === e || !0 === t.includes("Wii") && "Wii U" === e || !0 === t.includes("Xbox") && ("Xbox 360" === e || "Xbox One" === e || "Xbox Series X/S" === e) || !0 === t.includes("Xbox 360") && ("Xbox One" === e || "Xbox Series X/S" === e) || !0 === t.includes("Xbox One") && "Xbox Series X/S" === e ? "back-compat" : !0 === t.includes("PC") && "PC VR" === e || !0 === t.includes("PlayStation 4") && "PlayStation VR" === e || !0 === t.includes("PlayStation 5") && "PlayStation VR2" === e ? "peripheral" : "Wii" === e && (!0 === t.includes("Commodore 64") || !0 === t.includes("NES") || !0 === t.includes("Super Nintendo") || !0 === t.includes("Nintendo 64") || !0 === t.includes("TurboGrafx-16") || !0 === t.includes("TurboGrafx-CD") || !0 === t.includes("Sega Master System") || !0 === t.includes("Sega Mega Drive/Genesis") || !0 === t.includes("Neo Geo")) || "Wii U" === e && (!0 === t.includes("NES") || !0 === t.includes("Super Nintendo") || !0 === t.includes("Nintendo 64") || !0 === t.includes("Game Boy Advance") || !0 === t.includes("Nintendo DS") || !0 === t.includes("TurboGrafx-16")) || "Nintendo 3DS" === e && (!0 === t.includes("Game Boy") || !0 === t.includes("Game Boy Color") || !0 === t.includes("Sega Game Gear") || !0 === t.includes("NES") || !0 === t.includes("Super Nintendo")) || "Nintendo Switch" === e && (!0 === t.includes("Game Boy") || !0 === t.includes("Game Boy Advance") || !0 === t.includes("Game Boy Color") || !0 === t.includes("NES") || !0 === t.includes("Nintendo 64") || !0 === t.includes("Sega Mega Drive/Genesis") || !0 === t.includes("Super Nintendo")) ? "virtual-console" : "Emulated" === e && "emulated"
        }
        function _(e) {
            switch (Number(e)) {
                case 0:
                    return "Public";
                case 1:
                    return "Friends";
                case 2:
                    return "Private";
                default:
                    return null
            }
        }
        function g(e) {
            switch (e) {
                case 0:
                    return "back_red";
                case 1:
                    return "back_blue";
                case 2:
                    return "back_pink";
                case 3:
                    return "back_orange";
                case "new":
                    return "back_green";
                default:
                    return "back_darkish"
            }
        }
        function v(e) {
            var t = new Date
                , n = new Date(e)
                , a = t.getFullYear() - n.getFullYear()
                , r = t.getMonth() - n.getMonth()
                , i = t.getDate() - n.getDate();
            return (r < 0 || 0 === r && i < 0) && a--,
                a
        }
        function x(e) {
            switch (Number(e)) {
                case 10:
                    return "text_red";
                case 5:
                    return "text_orange";
                default:
                    return null
            }
        }
        function b() {
            let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            return {
                singlePlayer: {
                    enabled: e.comp_lvl_sp && e.comp_all_count,
                    header: ["Single-Player", "Rushed", "Leisure"],
                    data: {
                        comp_main: "Main Story",
                        comp_plus: "Main + Extras",
                        comp_100: "Completionist",
                        comp_all: "All PlayStyles"
                    },
                    calc: ["_avg", "_med", "_l", "_h"],
                    outputStyle: ["hm", "short"]
                },
                speedruns: {
                    enabled: e.comp_lvl_spd && e.comp_speed_count,
                    header: ["Speedruns", "Fastest", "Slowest"],
                    data: {
                        comp_speed: "Any%",
                        comp_speed100: "100%"
                    },
                    calc: ["_avg", "_med", "_min", "_max"],
                    outputStyle: ["hms", "short"]
                },
                multiPlayer: {
                    enabled: e.comp_lvl_co + e.comp_lvl_co && e.invested_co_count && e.invested_mp_count,
                    header: ["Multi-Player", "Least", "Most"],
                    data: {
                        invested_co: "Co-Op",
                        invested_mp: "Competitive"
                    },
                    calc: ["_avg", "_med", "_l", "_h"],
                    outputStyle: ["h", "long"]
                }
            }
        }
        function y(e) {
            let {rating: t, roundNearest: n=!0, userScale: a=1, short: r=!1} = e;
            return (a = Number(a),
            0 === t) ? "NR" : (.1 === a && t < 20 ? t = 10 : .05 === a && t < 20 && (t = 20),
                1 === a ? (t = !0 === n ? l(t, 5) * a : s(t * Number(a)),
                !1 === r && (t = "".concat(t, "%"))) : .1 === a ? (t = !0 === n ? l(t, 10) * a : s(t * Number(a), 1),
                !1 === r && (t = "".concat(t, "/10"))) : .05 === a && (t = !0 === n ? l(t, 20) * a : s(t * Number(a), 1),
                !1 === r && (t = "".concat(t, "/5"))),
                t)
        }
        function j(e) {
            return ((null == e ? void 0 : e.hours) > 0 ? 3600 * e.hours : 0) + ((null == e ? void 0 : e.minutes) > 0 ? 60 * e.minutes : 0) + ((null == e ? void 0 : e.seconds) > 0 ? e.seconds : 0)
        }
        function N(e) {
            return {
                hours: e > 0 ? Math.floor(e / 3600) : null,
                minutes: e > 0 ? Math.floor(e / 60) % 60 : null,
                seconds: e > 0 ? e % 60 : null
            }
        }
        function k(e) {
            let t, n, a, r, i, o, s, l, c, u = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "hm", d = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "short";
            if (isNaN(e) || e < 1)
                return "--";
            switch (d) {
                case "long":
                    t = " Days ",
                        n = " Hours ",
                        a = " Mins ",
                        r = " Secs";
                    break;
                case "digital":
                    t = n = a = ":",
                        r = "",
                        u = "hms";
                    break;
                default:
                    d = "short",
                        t = "d ",
                        n = "h ",
                        a = "m ",
                        r = "s"
            }
            switch (i = Math.floor(e / 60 / 60 / 24),
                o = Math.floor(e / 3600) % 24,
                l = Math.floor(e / 60) % 60,
                c = e % 60,
                u) {
                case "dh":
                    l >= 30 && (o += 1),
                        l = c = 0,
                        a = r = "";
                    break;
                case "h":
                    (o += 24 * i) > 0 ? ("short" === d ? l >= 30 && (o += 1) : l >= 45 ? o += 1 : o < 100 && l > 15 && l < 45 && "long" === d && (s = "\xbd"),
                        i = l = c = 0,
                        t = a = r = "") : (l > 15 ? l += 0 : l > 7 && l <= 15 ? l = 15 : c > 0 && (l = 5),
                        c = 0,
                        r = ""),
                        i = 0,
                        t = "";
                    break;
                case "hm":
                    o += 24 * i,
                        i = c = 0,
                        t = r = "";
                    break;
                case "hms":
                    o += 24 * i,
                        i = 0,
                        t = ""
            }
            return ("digital" === d && (u.indexOf("m") > 0 && (l = l.toString().padStart(2, "0")),
            u.indexOf("s") > 0 && (c = c.toString().padStart(2, "0"))),
            i > 0 || o > 0 || l > 0 || "digital" === d) ? "".concat(i > 0 ? "".concat(i).concat(t) : "").concat(o > 0 ? "".concat(o).concat(s || "").concat(n) : "").concat(l > 0 || "digital" === d ? "".concat(l).concat(a) : "").concat(c > 0 || "digital" === d ? "".concat(c).concat(r) : "").trim() : c < 60 && c > 0 ? "".concat(c).concat(r).trim() : "digital" !== d ? "--" : void 0
        }
        function w(e) {
            let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "class"
                , n = "class" === t ? "time_00" : "#404040";
            return e > 0 && e <= 39 ? n = "class" === t ? "time_30" : "#AB1A1A" : e >= 40 && e < 50 ? n = "class" === t ? "time_40" : "#FF3A3A" : e >= 50 && e < 60 ? n = "class" === t ? "time_50" : "#cc3b51" : e >= 60 && e < 70 ? n = "class" === t ? "time_60" : "#824985" : e >= 70 && e < 80 ? n = "class" === t ? "time_70" : "#5650a1" : e >= 80 && e < 90 ? n = "class" === t ? "time_80" : "#485cab" : e >= 90 && e < 100 ? n = "class" === t ? "time_90" : "#3a6db5" : e >= 100 && (n = "class" === t ? "time_100" : "#2b7ab9"),
                n
        }
        function S(e) {
            let t = "time_00";
            return e > 0 && e < 5 ? t = "time_40" : e >= 5 && e < 10 ? t = "time_50" : e >= 10 && e < 15 ? t = "time_60" : e >= 15 && e < 20 ? t = "time_70" : e >= 20 && e < 25 ? t = "time_80" : e >= 25 && e < 30 ? t = "time_90" : e >= 30 && (t = "time_100"),
                t
        }
        function C(e) {
            return !isNaN(e) && (e = e >= 1e6 ? s(e / 1e6, 1) + "M" : e >= 1e3 ? s(e / 1e3, 1) + "K" : e.toLocaleString())
        }
        function T(e) {
            return {
                year: (null == e ? void 0 : e.substring(0, 4)) ? null == e ? void 0 : e.substring(0, 4) : "0000",
                month: (null == e ? void 0 : e.substring(5, 7)) ? null == e ? void 0 : e.substring(5, 7) : "00",
                day: (null == e ? void 0 : e.substring(8, 10)) ? null == e ? void 0 : e.substring(8, 10) : "00"
            }
        }
        function E(e) {
            if (e) {
                let t, n;
                let a = ["Sec", "Min", "Hour", "Day", "Week", "Month", "Year", "Decade"]
                    , r = [60, 60, 24, 7, 4.35, 12, 10];
                e = e.replace(" ", "T");
                let i = new Date().getUTCFullYear()
                    , o = String(new Date().getUTCMonth() + 1).padStart(2, "0")
                    , l = String(new Date().getUTCDate()).padStart(2, "0")
                    , c = String(new Date().getUTCHours()).padStart(2, "0")
                    , u = String(new Date().getUTCMinutes()).padStart(2, "0")
                    , d = String(new Date().getUTCSeconds()).padStart(2, "0")
                    , m = 0
                    , h = Math.floor(Date.parse("".concat(i, "-").concat(o, "-").concat(l, "T").concat(c, ":").concat(u, ":").concat(d)) / 1e3)
                    , p = Math.floor(Date.parse(e) / 1e3);
                if (!p)
                    return "";
                h > p || h === p ? (t = h - p,
                    n = "Ago") : (t = p - h,
                    n = "From Now");
                for (let e = 0; t >= r[e] && e < r.length - 1; e++)
                    t /= r[e],
                        m = e + 1;
                return (1 !== (t = "Sec" === a[m] || "Min" === a[m] ? s(t) : Math.floor(2 * t) / 2) && (a[m] = "".concat(a[m], "s")),
                p > h && p < h + 60) ? "Now" : "".concat(t, " ").concat(a[m], " ").concat(n)
            }
        }
        function P(e) {
            let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "long";
            if (e) {
                if (e.includes(" ") && (e = e.replace(" ", "T")),
                "0000-00-00" === e)
                    return "--";
                let n = {
                    month: t,
                    day: "2-digit",
                    year: "numeric"
                };
                -1 !== e.search("-00-00") ? n = {
                    year: "numeric"
                } : -1 !== e.search("-00") && (n = {
                    month: t,
                    year: "numeric"
                });
                let a = new Date(10 === (e = e.replace(/-00/g, "-01")).length ? e + "T00:00:01" : e).toLocaleDateString("en-US", n);
                return "Invalid Date" === a ? "--" : a
            }
        }
        function A(e) {
            var t;
            return (null == e ? void 0 : null === (t = e.match(/(?:https?:\/\/)?(?:www\.)?youtu(?:\.be\/|be.com\/\S*(?:watch|embed)(?:(?:(?=\/[^&\s?]+(?!\S))\/)|(?:\S*v=|v\/)))([^&\s?)#]+)/)) || void 0 === t ? void 0 : t[1]) || null
        }
        function O(e) {
            return e && "" !== e ? i((0,
                a.sanitize)(e, {
                ALLOWED_TAGS: ["a", "blockquote", "span", "img", "iframe", "strong", "em", "u", "s", "br"],
                ALLOWED_ATTR: ["class", "rel", "href", "target", "title", "src", "alt", "width", "height", "style", "frameborder", "allowfullscreen"],
                RETURN_TRUSTED_TYPE: !0
            }).toString()) : null
        }
        function M(e) {
            let {msg: t, allowedTags: n=["url", "quote", "spoiler", "img", "youtube", "b", "i", "u", "s"]} = e;
            if (!t)
                return null;
            t = (t = (t = (t = (t = t.replace(/(<(\/|iframe|em|u|s|blockquote|span|br|strong|img|a)([^>]+)>)/gi, "")).replace(/\n/g, "<br>")).replace(/\r/g, "")).replace(/(<br>){3,}/g, "<br><br>")).replace(/http:\/\//g, "https://");
            let a = n.join("|")
                , r = RegExp("\\[(".concat(a, ")=?(.*?)\\](.+?)\\[\\/\\1\\]"), "gim");
            for (; [...t.matchAll(r)].length > 0; )
                [...t.matchAll(r)].map(e => {
                        let n, a;
                        let r = e[0]
                            , i = e[1]
                            , o = e[2]
                            , s = e[3];
                        switch (i.toLowerCase()) {
                            case "b":
                                n = "<strong>".concat(s, "</strong>");
                                break;
                            case "i":
                                n = "<em>".concat(s, "</em>");
                                break;
                            case "u":
                                n = "<u>".concat(s, "</u>");
                                break;
                            case "s":
                                n = "<s>".concat(s, "</s>");
                                break;
                            case "quote":
                                n = o ? "Originally Posted by: <strong>".concat(o, "</strong><br/><blockquote>").concat(s, "</blockquote>") : "<blockquote>".concat(s, "</blockquote>");
                                break;
                            case "spoiler":
                                n = '<span class="spoiler">'.concat(s, "</span>");
                                break;
                            case "url":
                                n = '<a rel="nofollow noopener noreferrer" target="_blank" href="'.concat(o || s, '">').concat(s, "</a>");
                                break;
                            case "img":
                                n = '<img alt="User Image" src="'.concat(s, '" />');
                                break;
                            case "youtube":
                                var l;
                                (a = null === (l = s.match(/(?:https?:\/\/)?(?:www\.)?youtu(?:\.be\/|be.com\/\S*(?:watch|embed)(?:(?:(?=\/[^&\s?]+(?!\S))\/)|(?:\S*v=|v\/)))([^&\s?)#]+)/)) || void 0 === l ? void 0 : l[1]) && (n = '<iframe style="max-width:100%;width:640px;height:360px;" title="'.concat(a, '" src="https://www.youtube.com/embed/').concat(a, '?rel=0" frameborder="0" allowfullscreen></iframe>'))
                        }
                        t = t.replace(r, n)
                    }
                );
            return O(t)
        }
        function R(e) {
            let t = !(arguments.length > 1) || void 0 === arguments[1] || arguments[1];
            return 1 === e.list_playing && !0 === t ? "green" : 1 === e.list_comp ? "purple" : 1 === e.list_retired ? "red" : 1 === e.list_custom || 1 === e.list_custom2 || 1 === e.list_custom3 ? "teal" : 1 === e.list_replay ? "blueish" : "blue"
        }
        function D(e) {
            switch (e) {
                case "3DO":
                    return "#085DAD";
                case "Amiga":
                    return "#e6e60e";
                case "Amstrad CPC":
                    return "#66cf7d";
                case "Android":
                    return "#93c348";
                case "Apple II":
                    return "#686868";
                case "Arcade":
                    return "#b700de";
                case "Atari 2600":
                    return "#874c29";
                case "Atari 5200":
                    return "#828282";
                case "Atari 7800":
                    return "#999999";
                case "Atari 8-bit Family":
                    return "#a8a88a";
                case "Atari Jaguar":
                    return "#bb0003";
                case "Atari Jaguar CD":
                    return "#f40a0e";
                case "Atari Lynx":
                    return "#e39c02";
                case "Atari ST":
                    return "#4554f7";
                case "BBC Micro":
                    return "#782e1c";
                case "Browser":
                    return "#5a96c4";
                case "ColecoVision":
                    return "#ed705c";
                case "Commodore 64":
                case "Commodore PET":
                case "Commodore VIC-20":
                    return "#F86D00";
                case "Dreamcast":
                    return "#e83007";
                case "Emulated":
                    return "#a637de";
                case "Evercade":
                    return "#d61f2c";
                case "FM Towns":
                    return "#32736b";
                case "Game & Watch":
                    return "#810f00";
                case "Game Boy":
                    return "#9c9815";
                case "Game Boy Advance":
                    return "#31318c";
                case "Game Boy Color":
                    return "#f9e62f";
                case "Gear VR":
                    return "#002fa5";
                case "Google Stadia":
                    return "#FF1902";
                case "Intellivision":
                    return "#cfb491";
                case "Interactive Movie":
                    return "#0051ff";
                case "iOS":
                    return "#282828";
                case "Linux":
                    return "#ffd133";
                case "Mac":
                    return "#5972ba";
                case "Meta Quest":
                    return "#333333";
                case "Mobile":
                case "Windows Phone":
                    return "#7E7E7E";
                case "MSX":
                    return "#302f2f";
                case "N-Gage":
                    return "#ff0204";
                case "NEC PC-88":
                case "NEC PC-98":
                case "NEC PC-FX":
                    return "#76798b";
                case "Neo Geo":
                    return "#ffc011";
                case "Neo Geo CD":
                    return "#fce300";
                case "Neo Geo Pocket":
                    return "#e7e6ca";
                case "NES":
                    return "#b33624";
                case "Nintendo 3DS":
                    return "#d5010b";
                case "Nintendo 64":
                    return "#011da9";
                case "Nintendo DS":
                    return "#959595";
                case "Nintendo GameCube":
                    return "#6a6f97";
                case "Nintendo Switch":
                    return "#e3020e";
                case "Oculus Go":
                    return "#222222";
                case "Odyssey":
                case "Odyssey 2":
                    return "#ff4242";
                case "OnLive":
                    return "#ed7b1e";
                case "Ouya":
                    return "#ffd52e";
                case "PC":
                    return "#FFC200";
                case "PC VR":
                    return "#ffe000";
                case "Philips CD-i":
                    return "#404040";
                case "Playdate":
                    return "#ffc833";
                case "PlayStation":
                    return "#76B1DE";
                case "PlayStation 2":
                    return "#5b9bcc";
                case "PlayStation 3":
                    return "#0a3246";
                case "PlayStation 4":
                    return "#10529e";
                case "PlayStation 5":
                    return "#246bbc";
                case "PlayStation Mobile":
                    return "#00b9c9";
                case "PlayStation Now":
                    return "#4ab6c7";
                case "PlayStation Portable":
                    return "#4c5053";
                case "PlayStation Vita":
                    return "#5482c7";
                case "PlayStation VR":
                    return "#66ffff";
                case "PlayStation VR2":
                    return "#00179f";
                case "Plug & Play":
                    return "#FF9900";
                case "Sega 32X":
                    return "#3d1e61";
                case "Sega CD":
                    return "#169bfa";
                case "Sega Game Gear":
                    return "#983765";
                case "Sega Master System":
                    return "#4152b5";
                case "Sega Mega Drive/Genesis":
                    return "#d2dada";
                case "Sega Saturn":
                    return "#0e3f7d";
                case "SG-1000":
                    return "#E12B23";
                case "Sharp X68000":
                    return "#fceb6a";
                case "Super Nintendo":
                    return "#4f3ea1";
                case "Tiger Handheld":
                    return "#ff0000";
                case "TurboGrafx-16":
                    return "#e37e40";
                case "TurboGrafx-CD":
                    return "#ad1a03";
                case "Vectrex":
                    return "#0001AB";
                case "Virtual Boy":
                    return "#dd0f0a";
                case "Wii":
                    return "#64d1e8";
                case "Wii U":
                    return "#2ec1e0";
                case "WonderSwan":
                    return "#cf4c38";
                case "Xbox":
                    return "#39af0c";
                case "Xbox 360":
                    return "#a4cd3c";
                case "Xbox One":
                    return "#0f7a0f";
                case "Xbox Series X/S":
                    return "#107C0F";
                case "ZX81":
                case "ZX Spectrum":
                    return "#e35936";
                default:
                    return "hsl(".concat(Math.floor(359 * Math.random()), ", 60%, 45%)")
            }
        }
        function I(e) {
            let {message: t, user: n, custom: a} = e;
            fetch("/api/error", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    message: t,
                    user: n,
                    custom: a
                })
            })
        }
    },
    44475: function(e, t, n) {
        "use strict";
        function a(e) {
            let {src: t, width: n, quality: a} = e
                , r = new URL(t);
            return r.searchParams.delete("height"),
                r.searchParams.set("width", n),
            a && r.searchParams.set("quality", a),
                r.toString()
        }
        n.d(t, {
            X: function() {
                return a
            }
        })
    },
    46691: function(e, t) {
        "use strict";
        var n, a, r, i;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
            function(e, t) {
                for (var n in t)
                    Object.defineProperty(e, n, {
                        enumerable: !0,
                        get: t[n]
                    })
            }(t, {
                ACTION_FAST_REFRESH: function() {
                    return d
                },
                ACTION_NAVIGATE: function() {
                    return s
                },
                ACTION_PREFETCH: function() {
                    return u
                },
                ACTION_REFRESH: function() {
                    return o
                },
                ACTION_RESTORE: function() {
                    return l
                },
                ACTION_SERVER_ACTION: function() {
                    return m
                },
                ACTION_SERVER_PATCH: function() {
                    return c
                },
                PrefetchCacheEntryStatus: function() {
                    return a
                },
                PrefetchKind: function() {
                    return n
                },
                isThenable: function() {
                    return h
                }
            });
        let o = "refresh"
            , s = "navigate"
            , l = "restore"
            , c = "server-patch"
            , u = "prefetch"
            , d = "fast-refresh"
            , m = "server-action";
        function h(e) {
            return e && ("object" == typeof e || "function" == typeof e) && "function" == typeof e.then
        }
        (r = n || (n = {})).AUTO = "auto",
            r.FULL = "full",
            r.TEMPORARY = "temporary",
            (i = a || (a = {})).fresh = "fresh",
            i.reusable = "reusable",
            i.expired = "expired",
            i.stale = "stale",
        ("function" == typeof t.default || "object" == typeof t.default && null !== t.default) && void 0 === t.default.__esModule && (Object.defineProperty(t.default, "__esModule", {
            value: !0
        }),
            Object.assign(t.default, t),
            e.exports = t.default)
    },
    64318: function(e, t, n) {
        "use strict";
        function a(e, t, n, a) {
            return !1
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
            Object.defineProperty(t, "getDomainLocale", {
                enumerable: !0,
                get: function() {
                    return a
                }
            }),
            n(98364),
        ("function" == typeof t.default || "object" == typeof t.default && null !== t.default) && void 0 === t.default.__esModule && (Object.defineProperty(t.default, "__esModule", {
            value: !0
        }),
            Object.assign(t.default, t),
            e.exports = t.default)
    },
    26541: function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
            Object.defineProperty(t, "Image", {
                enumerable: !0,
                get: function() {
                    return x
                }
            });
        let a = n(38754)
            , r = n(61757)
            , i = n(85893)
            , o = r._(n(67294))
            , s = a._(n(73935))
            , l = a._(n(7828))
            , c = n(17367)
            , u = n(27903)
            , d = n(54938);
        n(1997);
        let m = n(9953)
            , h = a._(n(56663))
            , p = {
            deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
            imageSizes: [80, 100, 160, 200, 250, 380, 500],
            path: "/_next/image",
            loader: "default",
            dangerouslyAllowSVG: !1,
            unoptimized: !1
        };
        function f(e, t, n, a, r, i, o) {
            let s = null == e ? void 0 : e.src;
            e && e["data-loaded-src"] !== s && (e["data-loaded-src"] = s,
                ("decode"in e ? e.decode() : Promise.resolve()).catch( () => {}
                ).then( () => {
                        if (e.parentElement && e.isConnected) {
                            if ("empty" !== t && r(!0),
                                null == n ? void 0 : n.current) {
                                let t = new Event("load");
                                Object.defineProperty(t, "target", {
                                    writable: !1,
                                    value: e
                                });
                                let a = !1
                                    , r = !1;
                                n.current({
                                    ...t,
                                    nativeEvent: t,
                                    currentTarget: e,
                                    target: e,
                                    isDefaultPrevented: () => a,
                                    isPropagationStopped: () => r,
                                    persist: () => {}
                                    ,
                                    preventDefault: () => {
                                        a = !0,
                                            t.preventDefault()
                                    }
                                    ,
                                    stopPropagation: () => {
                                        r = !0,
                                            t.stopPropagation()
                                    }
                                })
                            }
                            (null == a ? void 0 : a.current) && a.current(e)
                        }
                    }
                ))
        }
        function _(e) {
            return o.use ? {
                fetchPriority: e
            } : {
                fetchpriority: e
            }
        }
        let g = (0,
            o.forwardRef)( (e, t) => {
                let {src: n, srcSet: a, sizes: r, height: s, width: l, decoding: c, className: u, style: d, fetchPriority: m, placeholder: h, loading: p, unoptimized: g, fill: v, onLoadRef: x, onLoadingCompleteRef: b, setBlurComplete: y, setShowAltText: j, sizesInput: N, onLoad: k, onError: w, ...S} = e;
                return (0,
                    i.jsx)("img", {
                    ...S,
                    ..._(m),
                    loading: p,
                    width: l,
                    height: s,
                    decoding: c,
                    "data-nimg": v ? "fill" : "1",
                    className: u,
                    style: d,
                    sizes: r,
                    srcSet: a,
                    src: n,
                    ref: (0,
                        o.useCallback)(e => {
                            t && ("function" == typeof t ? t(e) : "object" == typeof t && (t.current = e)),
                            e && (w && (e.src = e.src),
                            e.complete && f(e, h, x, b, y, g, N))
                        }
                        , [n, h, x, b, y, w, g, N, t]),
                    onLoad: e => {
                        f(e.currentTarget, h, x, b, y, g, N)
                    }
                    ,
                    onError: e => {
                        j(!0),
                        "empty" !== h && y(!0),
                        w && w(e)
                    }
                })
            }
        );
        function v(e) {
            let {isAppRouter: t, imgAttributes: n} = e
                , a = {
                as: "image",
                imageSrcSet: n.srcSet,
                imageSizes: n.sizes,
                crossOrigin: n.crossOrigin,
                referrerPolicy: n.referrerPolicy,
                ..._(n.fetchPriority)
            };
            return t && s.default.preload ? (s.default.preload(n.src, a),
                null) : (0,
                i.jsx)(l.default, {
                children: (0,
                    i.jsx)("link", {
                    rel: "preload",
                    href: n.srcSet ? void 0 : n.src,
                    ...a
                }, "__nimg-" + n.src + n.srcSet + n.sizes)
            })
        }
        let x = (0,
            o.forwardRef)( (e, t) => {
                let n = (0,
                    o.useContext)(m.RouterContext)
                    , a = (0,
                    o.useContext)(d.ImageConfigContext)
                    , r = (0,
                    o.useMemo)( () => {
                        let e = p || a || u.imageConfigDefault
                            , t = [...e.deviceSizes, ...e.imageSizes].sort( (e, t) => e - t)
                            , n = e.deviceSizes.sort( (e, t) => e - t);
                        return {
                            ...e,
                            allSizes: t,
                            deviceSizes: n
                        }
                    }
                    , [a])
                    , {onLoad: s, onLoadingComplete: l} = e
                    , f = (0,
                    o.useRef)(s);
                (0,
                    o.useEffect)( () => {
                        f.current = s
                    }
                    , [s]);
                let _ = (0,
                    o.useRef)(l);
                (0,
                    o.useEffect)( () => {
                        _.current = l
                    }
                    , [l]);
                let[x,b] = (0,
                    o.useState)(!1)
                    , [y,j] = (0,
                    o.useState)(!1)
                    , {props: N, meta: k} = (0,
                    c.getImgProps)(e, {
                    defaultLoader: h.default,
                    imgConf: r,
                    blurComplete: x,
                    showAltText: y
                });
                return (0,
                    i.jsxs)(i.Fragment, {
                    children: [(0,
                        i.jsx)(g, {
                        ...N,
                        unoptimized: k.unoptimized,
                        placeholder: k.placeholder,
                        fill: k.fill,
                        onLoadRef: f,
                        onLoadingCompleteRef: _,
                        setBlurComplete: b,
                        setShowAltText: j,
                        sizesInput: e.sizes,
                        ref: t
                    }), k.priority ? (0,
                        i.jsx)(v, {
                        isAppRouter: !n,
                        imgAttributes: N
                    }) : null]
                })
            }
        );
        ("function" == typeof t.default || "object" == typeof t.default && null !== t.default) && void 0 === t.default.__esModule && (Object.defineProperty(t.default, "__esModule", {
            value: !0
        }),
            Object.assign(t.default, t),
            e.exports = t.default)
    },
    89577: function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
            Object.defineProperty(t, "default", {
                enumerable: !0,
                get: function() {
                    return b
                }
            });
        let a = n(38754)
            , r = n(85893)
            , i = a._(n(67294))
            , o = n(71401)
            , s = n(2045)
            , l = n(27420)
            , c = n(57201)
            , u = n(11443)
            , d = n(9953)
            , m = n(15320)
            , h = n(52905)
            , p = n(64318)
            , f = n(90953)
            , _ = n(46691)
            , g = new Set;
        function v(e, t, n, a, r, i) {
            if (i || (0,
                s.isLocalURL)(t)) {
                if (!a.bypassPrefetchedCheck) {
                    let r = t + "%" + n + "%" + (void 0 !== a.locale ? a.locale : "locale"in e ? e.locale : void 0);
                    if (g.has(r))
                        return;
                    g.add(r)
                }
                (async () => i ? e.prefetch(t, r) : e.prefetch(t, n, a))().catch(e => {}
                )
            }
        }
        function x(e) {
            return "string" == typeof e ? e : (0,
                l.formatUrl)(e)
        }
        let b = i.default.forwardRef(function(e, t) {
            let n, a;
            let {href: l, as: g, children: b, prefetch: y=null, passHref: j, replace: N, shallow: k, scroll: w, locale: S, onClick: C, onMouseEnter: T, onTouchStart: E, legacyBehavior: P=!1, ...A} = e;
            n = b,
            P && ("string" == typeof n || "number" == typeof n) && (n = (0,
                r.jsx)("a", {
                children: n
            }));
            let O = i.default.useContext(d.RouterContext)
                , M = i.default.useContext(m.AppRouterContext)
                , R = null != O ? O : M
                , D = !O
                , I = !1 !== y
                , L = null === y ? _.PrefetchKind.AUTO : _.PrefetchKind.FULL
                , {href: F, as: G} = i.default.useMemo( () => {
                    if (!O) {
                        let e = x(l);
                        return {
                            href: e,
                            as: g ? x(g) : e
                        }
                    }
                    let[e,t] = (0,
                        o.resolveHref)(O, l, !0);
                    return {
                        href: e,
                        as: g ? (0,
                            o.resolveHref)(O, g) : t || e
                    }
                }
                , [O, l, g])
                , U = i.default.useRef(F)
                , B = i.default.useRef(G);
            P && (a = i.default.Children.only(n));
            let z = P ? a && "object" == typeof a && a.ref : t
                , [H,q,V] = (0,
                h.useIntersection)({
                rootMargin: "200px"
            })
                , W = i.default.useCallback(e => {
                    (B.current !== G || U.current !== F) && (V(),
                        B.current = G,
                        U.current = F),
                        H(e),
                    z && ("function" == typeof z ? z(e) : "object" == typeof z && (z.current = e))
                }
                , [G, z, F, V, H]);
            i.default.useEffect( () => {
                    R && q && I && v(R, F, G, {
                        locale: S
                    }, {
                        kind: L
                    }, D)
                }
                , [G, F, q, S, I, null == O ? void 0 : O.locale, R, D, L]);
            let X = {
                ref: W,
                onClick(e) {
                    P || "function" != typeof C || C(e),
                    P && a.props && "function" == typeof a.props.onClick && a.props.onClick(e),
                    R && !e.defaultPrevented && function(e, t, n, a, r, o, l, c, u) {
                        let {nodeName: d} = e.currentTarget;
                        if ("A" === d.toUpperCase() && (function(e) {
                            let t = e.currentTarget.getAttribute("target");
                            return t && "_self" !== t || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.nativeEvent && 2 === e.nativeEvent.which
                        }(e) || !u && !(0,
                            s.isLocalURL)(n)))
                            return;
                        e.preventDefault();
                        let m = () => {
                                let e = null == l || l;
                                "beforePopState"in t ? t[r ? "replace" : "push"](n, a, {
                                    shallow: o,
                                    locale: c,
                                    scroll: e
                                }) : t[r ? "replace" : "push"](a || n, {
                                    scroll: e
                                })
                            }
                        ;
                        u ? i.default.startTransition(m) : m()
                    }(e, R, F, G, N, k, w, S, D)
                },
                onMouseEnter(e) {
                    P || "function" != typeof T || T(e),
                    P && a.props && "function" == typeof a.props.onMouseEnter && a.props.onMouseEnter(e),
                    R && (I || !D) && v(R, F, G, {
                        locale: S,
                        priority: !0,
                        bypassPrefetchedCheck: !0
                    }, {
                        kind: L
                    }, D)
                },
                onTouchStart: function(e) {
                    P || "function" != typeof E || E(e),
                    P && a.props && "function" == typeof a.props.onTouchStart && a.props.onTouchStart(e),
                    R && (I || !D) && v(R, F, G, {
                        locale: S,
                        priority: !0,
                        bypassPrefetchedCheck: !0
                    }, {
                        kind: L
                    }, D)
                }
            };
            if ((0,
                c.isAbsoluteUrl)(G))
                X.href = G;
            else if (!P || j || "a" === a.type && !("href"in a.props)) {
                let e = void 0 !== S ? S : null == O ? void 0 : O.locale
                    , t = (null == O ? void 0 : O.isLocaleDomain) && (0,
                    p.getDomainLocale)(G, e, null == O ? void 0 : O.locales, null == O ? void 0 : O.domainLocales);
                X.href = t || (0,
                    f.addBasePath)((0,
                    u.addLocale)(G, e, null == O ? void 0 : O.defaultLocale))
            }
            return P ? i.default.cloneElement(a, X) : (0,
                r.jsx)("a", {
                ...A,
                ...X,
                children: n
            })
        });
        ("function" == typeof t.default || "object" == typeof t.default && null !== t.default) && void 0 === t.default.__esModule && (Object.defineProperty(t.default, "__esModule", {
            value: !0
        }),
            Object.assign(t.default, t),
            e.exports = t.default)
    },
    52905: function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
            Object.defineProperty(t, "useIntersection", {
                enumerable: !0,
                get: function() {
                    return l
                }
            });
        let a = n(67294)
            , r = n(33815)
            , i = "function" == typeof IntersectionObserver
            , o = new Map
            , s = [];
        function l(e) {
            let {rootRef: t, rootMargin: n, disabled: l} = e
                , c = l || !i
                , [u,d] = (0,
                a.useState)(!1)
                , m = (0,
                a.useRef)(null)
                , h = (0,
                a.useCallback)(e => {
                    m.current = e
                }
                , []);
            return (0,
                a.useEffect)( () => {
                    if (i) {
                        if (c || u)
                            return;
                        let e = m.current;
                        if (e && e.tagName)
                            return function(e, t, n) {
                                let {id: a, observer: r, elements: i} = function(e) {
                                    let t;
                                    let n = {
                                        root: e.root || null,
                                        margin: e.rootMargin || ""
                                    }
                                        , a = s.find(e => e.root === n.root && e.margin === n.margin);
                                    if (a && (t = o.get(a)))
                                        return t;
                                    let r = new Map;
                                    return t = {
                                        id: n,
                                        observer: new IntersectionObserver(e => {
                                                e.forEach(e => {
                                                        let t = r.get(e.target)
                                                            , n = e.isIntersecting || e.intersectionRatio > 0;
                                                        t && n && t(n)
                                                    }
                                                )
                                            }
                                            ,e),
                                        elements: r
                                    },
                                        s.push(n),
                                        o.set(n, t),
                                        t
                                }(n);
                                return i.set(e, t),
                                    r.observe(e),
                                    function() {
                                        if (i.delete(e),
                                            r.unobserve(e),
                                        0 === i.size) {
                                            r.disconnect(),
                                                o.delete(a);
                                            let e = s.findIndex(e => e.root === a.root && e.margin === a.margin);
                                            e > -1 && s.splice(e, 1)
                                        }
                                    }
                            }(e, e => e && d(e), {
                                root: null == t ? void 0 : t.current,
                                rootMargin: n
                            })
                    } else if (!u) {
                        let e = (0,
                            r.requestIdleCallback)( () => d(!0));
                        return () => (0,
                            r.cancelIdleCallback)(e)
                    }
                }
                , [c, n, t, u, m.current]),
                [h, u, (0,
                    a.useCallback)( () => {
                        d(!1)
                    }
                    , [])]
        }
        ("function" == typeof t.default || "object" == typeof t.default && null !== t.default) && void 0 === t.default.__esModule && (Object.defineProperty(t.default, "__esModule", {
            value: !0
        }),
            Object.assign(t.default, t),
            e.exports = t.default)
    },
    17367: function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
            Object.defineProperty(t, "getImgProps", {
                enumerable: !0,
                get: function() {
                    return s
                }
            }),
            n(1997);
        let a = n(69919)
            , r = n(27903);
        function i(e) {
            return void 0 !== e.default
        }
        function o(e) {
            return void 0 === e ? e : "number" == typeof e ? Number.isFinite(e) ? e : NaN : "string" == typeof e && /^[0-9]+$/.test(e) ? parseInt(e, 10) : NaN
        }
        function s(e, t) {
            var n;
            let s, l, c, {src: u, sizes: d, unoptimized: m=!1, priority: h=!1, loading: p, className: f, quality: _, width: g, height: v, fill: x=!1, style: b, overrideSrc: y, onLoad: j, onLoadingComplete: N, placeholder: k="empty", blurDataURL: w, fetchPriority: S, layout: C, objectFit: T, objectPosition: E, lazyBoundary: P, lazyRoot: A, ...O} = e, {imgConf: M, showAltText: R, blurComplete: D, defaultLoader: I} = t, L = M || r.imageConfigDefault;
            if ("allSizes"in L)
                s = L;
            else {
                let e = [...L.deviceSizes, ...L.imageSizes].sort( (e, t) => e - t)
                    , t = L.deviceSizes.sort( (e, t) => e - t);
                s = {
                    ...L,
                    allSizes: e,
                    deviceSizes: t
                }
            }
            if (void 0 === I)
                throw Error("images.loaderFile detected but the file is missing default export.\nRead more: https://nextjs.org/docs/messages/invalid-images-config");
            let F = O.loader || I;
            delete O.loader,
                delete O.srcSet;
            let G = "__next_img_default"in F;
            if (G) {
                if ("custom" === s.loader)
                    throw Error('Image with src "' + u + '" is missing "loader" prop.\nRead more: https://nextjs.org/docs/messages/next-image-missing-loader')
            } else {
                let e = F;
                F = t => {
                    let {config: n, ...a} = t;
                    return e(a)
                }
            }
            if (C) {
                "fill" === C && (x = !0);
                let e = {
                    intrinsic: {
                        maxWidth: "100%",
                        height: "auto"
                    },
                    responsive: {
                        width: "100%",
                        height: "auto"
                    }
                }[C];
                e && (b = {
                    ...b,
                    ...e
                });
                let t = {
                    responsive: "100vw",
                    fill: "100vw"
                }[C];
                t && !d && (d = t)
            }
            let U = ""
                , B = o(g)
                , z = o(v);
            if ("object" == typeof (n = u) && (i(n) || void 0 !== n.src)) {
                let e = i(u) ? u.default : u;
                if (!e.src)
                    throw Error("An object should only be passed to the image component src parameter if it comes from a static image import. It must include src. Received " + JSON.stringify(e));
                if (!e.height || !e.width)
                    throw Error("An object should only be passed to the image component src parameter if it comes from a static image import. It must include height and width. Received " + JSON.stringify(e));
                if (l = e.blurWidth,
                    c = e.blurHeight,
                    w = w || e.blurDataURL,
                    U = e.src,
                    !x) {
                    if (B || z) {
                        if (B && !z) {
                            let t = B / e.width;
                            z = Math.round(e.height * t)
                        } else if (!B && z) {
                            let t = z / e.height;
                            B = Math.round(e.width * t)
                        }
                    } else
                        B = e.width,
                            z = e.height
                }
            }
            let H = !h && ("lazy" === p || void 0 === p);
            (!(u = "string" == typeof u ? u : U) || u.startsWith("data:") || u.startsWith("blob:")) && (m = !0,
                H = !1),
            s.unoptimized && (m = !0),
            G && u.endsWith(".svg") && !s.dangerouslyAllowSVG && (m = !0),
            h && (S = "high");
            let q = o(_)
                , V = Object.assign(x ? {
                position: "absolute",
                height: "100%",
                width: "100%",
                left: 0,
                top: 0,
                right: 0,
                bottom: 0,
                objectFit: T,
                objectPosition: E
            } : {}, R ? {} : {
                color: "transparent"
            }, b)
                , W = D || "empty" === k ? null : "blur" === k ? 'url("data:image/svg+xml;charset=utf-8,' + (0,
                a.getImageBlurSvg)({
                widthInt: B,
                heightInt: z,
                blurWidth: l,
                blurHeight: c,
                blurDataURL: w || "",
                objectFit: V.objectFit
            }) + '")' : 'url("' + k + '")'
                , X = W ? {
                backgroundSize: V.objectFit || "cover",
                backgroundPosition: V.objectPosition || "50% 50%",
                backgroundRepeat: "no-repeat",
                backgroundImage: W
            } : {}
                , $ = function(e) {
                let {config: t, src: n, unoptimized: a, width: r, quality: i, sizes: o, loader: s} = e;
                if (a)
                    return {
                        src: n,
                        srcSet: void 0,
                        sizes: void 0
                    };
                let {widths: l, kind: c} = function(e, t, n) {
                    let {deviceSizes: a, allSizes: r} = e;
                    if (n) {
                        let e = /(^|\s)(1?\d?\d)vw/g
                            , t = [];
                        for (let a; a = e.exec(n); a)
                            t.push(parseInt(a[2]));
                        if (t.length) {
                            let e = .01 * Math.min(...t);
                            return {
                                widths: r.filter(t => t >= a[0] * e),
                                kind: "w"
                            }
                        }
                        return {
                            widths: r,
                            kind: "w"
                        }
                    }
                    return "number" != typeof t ? {
                        widths: a,
                        kind: "w"
                    } : {
                        widths: [...new Set([t, 2 * t].map(e => r.find(t => t >= e) || r[r.length - 1]))],
                        kind: "x"
                    }
                }(t, r, o)
                    , u = l.length - 1;
                return {
                    sizes: o || "w" !== c ? o : "100vw",
                    srcSet: l.map( (e, a) => s({
                        config: t,
                        src: n,
                        quality: i,
                        width: e
                    }) + " " + ("w" === c ? e : a + 1) + c).join(", "),
                    src: s({
                        config: t,
                        src: n,
                        quality: i,
                        width: l[u]
                    })
                }
            }({
                config: s,
                src: u,
                unoptimized: m,
                width: B,
                quality: q,
                sizes: d,
                loader: F
            });
            return {
                props: {
                    ...O,
                    loading: H ? "lazy" : p,
                    fetchPriority: S,
                    width: B,
                    height: z,
                    decoding: "async",
                    className: f,
                    style: {
                        ...V,
                        ...X
                    },
                    sizes: $.sizes,
                    srcSet: $.srcSet,
                    src: y || $.src
                },
                meta: {
                    unoptimized: m,
                    priority: h,
                    placeholder: k,
                    fill: x
                }
            }
        }
    },
    69919: function(e, t) {
        "use strict";
        function n(e) {
            let {widthInt: t, heightInt: n, blurWidth: a, blurHeight: r, blurDataURL: i, objectFit: o} = e
                , s = a ? 40 * a : t
                , l = r ? 40 * r : n
                , c = s && l ? "viewBox='0 0 " + s + " " + l + "'" : "";
            return "%3Csvg xmlns='http://www.w3.org/2000/svg' " + c + "%3E%3Cfilter id='b' color-interpolation-filters='sRGB'%3E%3CfeGaussianBlur stdDeviation='20'/%3E%3CfeColorMatrix values='1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 100 -1' result='s'/%3E%3CfeFlood x='0' y='0' width='100%25' height='100%25'/%3E%3CfeComposite operator='out' in='s'/%3E%3CfeComposite in2='SourceGraphic'/%3E%3CfeGaussianBlur stdDeviation='20'/%3E%3C/filter%3E%3Cimage width='100%25' height='100%25' x='0' y='0' preserveAspectRatio='" + (c ? "none" : "contain" === o ? "xMidYMid" : "cover" === o ? "xMidYMid slice" : "none") + "' style='filter: url(%23b);' href='" + i + "'/%3E%3C/svg%3E"
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
            Object.defineProperty(t, "getImageBlurSvg", {
                enumerable: !0,
                get: function() {
                    return n
                }
            })
    },
    35666: function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
            function(e, t) {
                for (var n in t)
                    Object.defineProperty(e, n, {
                        enumerable: !0,
                        get: t[n]
                    })
            }(t, {
                default: function() {
                    return l
                },
                getImageProps: function() {
                    return s
                }
            });
        let a = n(38754)
            , r = n(17367)
            , i = n(26541)
            , o = a._(n(56663));
        function s(e) {
            let {props: t} = (0,
                r.getImgProps)(e, {
                defaultLoader: o.default,
                imgConf: {
                    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
                    imageSizes: [80, 100, 160, 200, 250, 380, 500],
                    path: "/_next/image",
                    loader: "default",
                    dangerouslyAllowSVG: !1,
                    unoptimized: !1
                }
            });
            for (let[e,n] of Object.entries(t))
                void 0 === n && delete t[e];
            return {
                props: t
            }
        }
        let l = i.Image
    },
    56663: function(e, t) {
        "use strict";
        function n(e) {
            let {config: t, src: n, width: a, quality: r} = e;
            return t.path + "?url=" + encodeURIComponent(n) + "&w=" + a + "&q=" + (r || 75)
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
            Object.defineProperty(t, "default", {
                enumerable: !0,
                get: function() {
                    return a
                }
            }),
            n.__next_img_default = !0;
        let a = n
    },
    95296: function(e, t, n) {
        "use strict";
        n.r(t),
            n.d(t, {
                default: function() {
                    return em
                }
            });
        var a = n(85893)
            , r = n(41664)
            , i = n.n(r)
            , o = n(69863)
            , s = n.n(o)
            , l = n(93967)
            , c = n.n(l)
            , u = n(67294)
            , d = n(75850)
            , m = n(11163)
            , h = n.n(m)
            , p = n(6725)
            , f = n(79694)
            , _ = n.n(f)
            , g = n(86600)
            , v = function(e) {
            let {userData: t} = e;
            if (t)
                return (0,
                    a.jsx)("li", {
                    children: (0,
                        a.jsxs)("a", {
                        children: [(0,
                            a.jsx)("div", {
                            className: c()("mobile_hide label", _().user_tools_label),
                            children: t.user_name
                        }), (0,
                            a.jsx)("div", {
                            className: c()(_().user_tools_image),
                            children: (0,
                                a.jsx)(g.Z, {
                                user: t,
                                width: 40,
                                overridePrivacy: !0
                            })
                        })]
                    })
                })
        }
            , x = n(67438)
            , b = n.n(x)
            , y = n(60217)
            , j = function(e) {
            var t, n, r;
            let {currentUser: o} = e;
            return (0,
                a.jsxs)(a.Fragment, {
                children: [(0,
                    a.jsx)("h4", {
                    className: "head_padding ".concat((null == o ? void 0 : null === (t = o.user_navigation) || void 0 === t ? void 0 : t.htmlClass) || "back_blue"),
                    children: null == o ? void 0 : null === (n = o.user_navigation) || void 0 === n ? void 0 : n.htmlLabel
                }), (0,
                    a.jsx)("ul", {
                    children: (null == o ? void 0 : null === (r = o.user_navigation) || void 0 === r ? void 0 : r.games.length) > 0 ? o.user_navigation.games.map(e => (0,
                        a.jsx)("li", {
                        children: (0,
                            a.jsxs)(i(), {
                            href: "/submit/edit/".concat(e.id),
                            className: "link_".concat((0,
                                y.dm)(e)),
                            children: [(0,
                                a.jsx)("div", {
                                className: e.htmlClass,
                                children: e.htmlLabel
                            }), (0,
                                a.jsx)("span", {
                                style: 1 === e.list_retired ? {
                                    textDecoration: "line-through"
                                } : null,
                                children: e.custom_title
                            }), (0,
                                a.jsx)("br", {}), (0,
                                a.jsx)("span", {
                                className: "text_grey",
                                style: {
                                    float: "left",
                                    fontSize: "80%",
                                    width: "55%"
                                },
                                children: e.platform
                            }), (0,
                                a.jsx)("span", {
                                className: "text_grey",
                                style: {
                                    float: "left",
                                    fontSize: "80%",
                                    width: "30%"
                                },
                                children: e.invested_sp > e.invested_pro ? (0,
                                    y.$N)(e.invested_sp) : (0,
                                    y.$N)(e.invested_pro)
                            })]
                        })
                    }, "userNavigation-".concat(e.id, "}"))) : (0,
                        a.jsxs)("div", {
                        className: "global_padding",
                        children: ["Nothing yet, ", (0,
                            a.jsx)(i(), {
                            href: "/submit",
                            children: "submit one"
                        }), "!"]
                    })
                })]
            })
        }
            , N = function(e) {
            let {currentUser: t} = e
                , n = (null == t ? void 0 : t.stats_playing) + (null == t ? void 0 : t.stats_backlog) + (null == t ? void 0 : t.stats_replays) + (null == t ? void 0 : t.stats_custom) + (null == t ? void 0 : t.stats_custom2) + (null == t ? void 0 : t.stats_custom3) + (null == t ? void 0 : t.stats_completed) + (null == t ? void 0 : t.stats_retired);
            return (0,
                a.jsxs)(a.Fragment, {
                children: [(0,
                    a.jsx)("h4", {
                    className: "head_padding back_blue",
                    children: "Games"
                }), (0,
                    a.jsxs)("ul", {
                    children: [(0,
                        a.jsx)("li", {
                        children: (0,
                            a.jsxs)(i(), {
                            className: "link_blue",
                            href: "/user/".concat(null == t ? void 0 : t.user_name, "/games/playing-backlog-replays-custom-custom2-custom3-completed-retired/1"),
                            children: ["All Games (", n, ")"]
                        })
                    }), (0,
                        a.jsx)("li", {
                        children: (0,
                            a.jsxs)(i(), {
                            href: "/user/".concat(null == t ? void 0 : t.user_name, "/games/playing/1"),
                            className: "link_green",
                            children: ["Playing (", null == t ? void 0 : t.stats_playing, ")"]
                        })
                    }), (0,
                        a.jsx)("li", {
                        children: (0,
                            a.jsxs)(i(), {
                            href: "/user/".concat(null == t ? void 0 : t.user_name, "/games/backlog/1"),
                            className: "link_blue",
                            children: ["Backlog (", null == t ? void 0 : t.stats_backlog, ")"]
                        })
                    }), (0,
                        a.jsx)("li", {
                        children: (0,
                            a.jsxs)(i(), {
                            href: "/user/".concat(null == t ? void 0 : t.user_name, "/games/replays/1"),
                            className: "link_blueish",
                            children: ["Replays (", null == t ? void 0 : t.stats_replays, ")"]
                        })
                    }), (null == t ? void 0 : t.set_customtab) ? (0,
                        a.jsx)("li", {
                        children: (0,
                            a.jsxs)(i(), {
                            href: "/user/".concat(null == t ? void 0 : t.user_name, "/games/custom/1"),
                            className: "link_teal",
                            children: [null == t ? void 0 : t.set_customtab, " (", null == t ? void 0 : t.stats_custom, ")"]
                        })
                    }) : null, (null == t ? void 0 : t.set_customtab2) ? (0,
                        a.jsx)("li", {
                        children: (0,
                            a.jsxs)(i(), {
                            href: "/user/".concat(null == t ? void 0 : t.user_name, "/games/custom2/1"),
                            className: "link_teal",
                            children: [null == t ? void 0 : t.set_customtab2, " (", null == t ? void 0 : t.stats_custom2, ")"]
                        })
                    }) : null, (null == t ? void 0 : t.set_customtab3) ? (0,
                        a.jsx)("li", {
                        children: (0,
                            a.jsxs)(i(), {
                            href: "/user/".concat(null == t ? void 0 : t.user_name, "/games/custom3/1"),
                            className: "link_teal",
                            children: [null == t ? void 0 : t.set_customtab3, " (", null == t ? void 0 : t.stats_custom3, ")"]
                        })
                    }) : null, (0,
                        a.jsx)("li", {
                        children: (0,
                            a.jsxs)(i(), {
                            href: "/user/".concat(null == t ? void 0 : t.user_name, "/games/completed/1"),
                            className: "link_purple",
                            children: ["Completed (", null == t ? void 0 : t.stats_completed, ")"]
                        })
                    }), (0,
                        a.jsx)("li", {
                        children: (0,
                            a.jsxs)(i(), {
                            href: "/user/".concat(null == t ? void 0 : t.user_name, "/games/retired/1"),
                            className: "link_red",
                            children: ["Retired (", null == t ? void 0 : t.stats_retired, ")"]
                        })
                    })]
                })]
            })
        }
            , k = function(e) {
            var t, n, r, o;
            let {currentUser: s} = e;
            return (0,
                a.jsxs)(a.Fragment, {
                children: [(0,
                    a.jsx)("h4", {
                    className: "head_padding back_pink",
                    children: "My Account"
                }), (0,
                    a.jsxs)("ul", {
                    children: [(0,
                        a.jsx)("li", {
                        children: (0,
                            a.jsx)(i(), {
                            href: "/user/".concat(null == s ? void 0 : s.user_name),
                            className: "link_pink",
                            children: "Profile"
                        })
                    }), (0,
                        a.jsx)("li", {
                        children: (0,
                            a.jsx)(i(), {
                            href: "/user/".concat(null == s ? void 0 : s.user_name, "/games"),
                            className: "link_blue",
                            children: "Games"
                        })
                    }), (0,
                        a.jsx)("li", {
                        children: (0,
                            a.jsx)(i(), {
                            href: "/user/".concat(null == s ? void 0 : s.user_name, "/reviews/latest/1"),
                            className: "link_blue",
                            children: "Reviews"
                        })
                    }), (0,
                        a.jsx)("li", {
                        children: (0,
                            a.jsx)(i(), {
                            href: "/user/".concat(null == s ? void 0 : s.user_name, "/lists"),
                            className: "link_blue",
                            children: "Collections"
                        })
                    }), (0,
                        a.jsx)("li", {
                        children: (0,
                            a.jsx)(i(), {
                            href: "/user/".concat(null == s ? void 0 : s.user_name, "/stats"),
                            className: "link_pink",
                            children: "Stats"
                        })
                    }), (0,
                        a.jsx)("li", {
                        children: (0,
                            a.jsxs)(i(), {
                            href: "/user/".concat(null == s ? void 0 : s.user_name, "/friends"),
                            className: (null == s ? void 0 : null === (t = s.user_notifications) || void 0 === t ? void 0 : t.friend_invites) > 0 ? "back_red text_white" : "link_pink",
                            children: ["Friends (", null == s ? void 0 : null === (n = s.user_notifications) || void 0 === n ? void 0 : n.friend_invites, ")"]
                        })
                    }), (0,
                        a.jsx)("li", {
                        children: (0,
                            a.jsxs)(i(), {
                            href: "/user/".concat(null == s ? void 0 : s.user_name, "/messages"),
                            className: (null == s ? void 0 : null === (r = s.user_notifications) || void 0 === r ? void 0 : r.messages_new) > 0 ? "back_red text_white" : "link_pink",
                            children: ["Messages (", null == s ? void 0 : null === (o = s.user_notifications) || void 0 === o ? void 0 : o.messages_new, ")"]
                        })
                    }), (0,
                        a.jsx)("li", {
                        children: (0,
                            a.jsx)(i(), {
                            href: "/user/".concat(null == s ? void 0 : s.user_name, "/options"),
                            className: "link_pink",
                            children: "Options"
                        })
                    }), (0,
                        a.jsx)("li", {
                        children: (0,
                            a.jsx)(i(), {
                            href: "/logout",
                            className: "link_red",
                            children: "Logout"
                        })
                    })]
                })]
            })
        }
            , w = function(e) {
            let {currentUser: t} = e;
            return (0,
                a.jsx)("div", {
                className: c()(b().nav_u_drop, b().nav_down, "back_form"),
                children: (0,
                    a.jsxs)("div", {
                    className: "contain_in",
                    children: [(0,
                        a.jsx)("div", {
                        className: c()(b().nav_playthroughs_load, "back_primary shadow_box"),
                        children: (0,
                            a.jsx)(N, {
                            currentUser: t
                        })
                    }), (0,
                        a.jsx)("div", {
                        className: c()(b().nav_profile_load, "back_primary shadow_box"),
                        children: (0,
                            a.jsx)(k, {
                            currentUser: t
                        })
                    }), (0,
                        a.jsx)("div", {
                        className: "mobile_clear"
                    }), (0,
                        a.jsx)("div", {
                        className: c()(b().nav_games_load, "back_primary shadow_box"),
                        children: (0,
                            a.jsx)(j, {
                            currentUser: t
                        })
                    }), (0,
                        a.jsx)("div", {
                        className: "clear"
                    }), (0,
                        a.jsx)("div", {
                        className: "content_break"
                    })]
                })
            })
        }
            , S = function() {
            let {openSearch: e, closeSearch: t, searchTerms: n, setSearchTerms: r, debounce: o} = (0,
                d.Rx)()
                , [l,h] = (0,
                u.useState)(!1)
                , f = (0,
                m.useRouter)();
            (0,
                u.useEffect)( () => {
                    let e = () => {
                            h(!1)
                        }
                    ;
                    return f.events.on("routeChangeComplete", e),
                        () => {
                            f.events.off("routeChangeComplete", e)
                        }
                }
                , [f.events]);
            let _ = []
                , {currentUser: g} = (0,
                p.x)();
            (null == g ? void 0 : g.user_name) ? _.push((0,
                a.jsx)("ul", {
                className: s().login,
                onClick: () => {
                    !0 === l ? h(!1) : h(!0)
                }
                ,
                children: (0,
                    a.jsx)(v, {
                    userData: g
                })
            }, "login")) : _.push((0,
                a.jsxs)("ul", {
                className: s().login,
                children: [(0,
                    a.jsx)("li", {
                    children: (0,
                        a.jsx)(i(), {
                        href: "/login",
                        className: "text_primary",
                        children: "Login"
                    })
                }), (0,
                    a.jsx)("li", {
                    className: s().join_link,
                    children: (0,
                        a.jsx)(i(), {
                        className: "mobile_hide",
                        href: "/login/signup",
                        children: "Join"
                    })
                })]
            }, "login"));
            let x = e => {
                    "Enter" === e.key ? o() : "Escape" === e.key && t()
                }
            ;
            return (0,
                a.jsx)(a.Fragment, {
                children: (0,
                    a.jsxs)("header", {
                    className: s().header,
                    children: [(0,
                        a.jsxs)("nav", {
                        className: s().nav,
                        children: [(0,
                            a.jsx)(i(), {
                            href: "/",
                            className: s().brand,
                            "aria-label": "HowLongToBeat"
                        }), (0,
                            a.jsxs)("ul", {
                            className: s().list,
                            children: [(0,
                                a.jsx)("li", {
                                children: (0,
                                    a.jsx)(i(), {
                                    href: "/forum",
                                    children: "Forum"
                                })
                            }), (0,
                                a.jsx)("li", {
                                children: (0,
                                    a.jsx)(i(), {
                                    href: "/stats",
                                    children: "Stats"
                                })
                            }), (0,
                                a.jsx)("li", {
                                children: (0,
                                    a.jsx)(i(), {
                                    href: "/submit",
                                    children: "Submit"
                                })
                            })]
                        }, "list"), _, (0,
                            a.jsx)("div", {
                            className: s().search,
                            children: (0,
                                a.jsx)("input", {
                                className: c()(s().search_box, "back_form"),
                                "aria-label": "Search",
                                tabIndex: 1,
                                type: "text",
                                name: "site-search",
                                placeholder: "Search Your Favorite Games...",
                                onClick: e,
                                onKeyUp: e => x(e),
                                onChange: e => r(e.target.value),
                                autoComplete: "off",
                                value: n,
                                disabled: !!(f.asPath.includes("/options/account/password") || f.asPath.includes("/options/account/delete"))
                            })
                        })]
                    }), (null == g ? void 0 : g.user_name) && !0 === l ? (0,
                        a.jsx)(w, {
                        currentUser: g
                    }) : null]
                })
            })
        }
            , C = n(9008)
            , T = n.n(C)
            , E = n(26217)
            , P = n(52207)
            , A = n(52805)
            , O = n.n(A)
            , M = n(45697)
            , R = n(25675)
            , D = n.n(R)
            , I = n(44475);
        function L(e) {
            let {user: t} = e;
            if (!t.user_name)
                return null;
            let n = "linear-gradient(rgb(31, 31, 31), rgba(31, 31, 31, 0.9)), url('".concat("https://howlongtobeat.com", "/avatars/").concat(t.user_avatar, "?crop=10:3&width=563')");
            return (0,
                a.jsx)("li", {
                className: c()("back_darkish", O().search_list),
                style: {
                    backgroundImage: n
                },
                children: (0,
                    a.jsxs)("div", {
                    className: O().inside_blur,
                    children: [(0,
                        a.jsxs)("div", {
                        className: c()(O().search_list_image),
                        children: [(0,
                            a.jsx)(D(), {
                            loader: I.X,
                            alt: t.user_name,
                            src: "".concat("https://howlongtobeat.com", "/avatars/").concat(t.user_avatar),
                            width: 100,
                            height: 100
                        }), (0,
                            a.jsx)("h4", {
                            className: "back_secondary center",
                            children: t.profile_local
                        })]
                    }), (0,
                        a.jsxs)("div", {
                        className: c()(O().search_list_details),
                        children: [(0,
                            a.jsxs)("h3", {
                            className: "text_white shadow_text",
                            children: [(0,
                                a.jsx)(i(), {
                                href: "/user/".concat(t.user_name),
                                title: t.user_name,
                                children: t.user_name
                            }), " "]
                        }), (0,
                            a.jsxs)("div", {
                            className: c()(O().search_list_details_block),
                            children: [(0,
                                a.jsx)("div", {
                                className: c()(O().search_list_tidbit, "text_white", "shadow_text"),
                                children: "Backlog"
                            }), (0,
                                a.jsx)("div", {
                                className: c()(O().search_list_tidbit, "center", "back_blue"),
                                children: (0,
                                    y.uf)(t.stats_backlog)
                            }), (0,
                                a.jsx)("div", {
                                className: c()(O().search_list_tidbit, "text_white", "shadow_text"),
                                children: "Complete"
                            }), (0,
                                a.jsx)("div", {
                                className: c()(O().search_list_tidbit, "center", "back_blue"),
                                children: (0,
                                    y.uf)(t.stats_completed)
                            }), (0,
                                a.jsx)("div", {
                                className: c()(O().search_list_tidbit, "text_white", "shadow_text"),
                                children: "Posts"
                            }), (0,
                                a.jsx)("div", {
                                className: c()(O().search_list_tidbit, "center", "back_green"),
                                children: (0,
                                    y.uf)(t.stats_posts)
                            })]
                        })]
                    })]
                })
            })
        }
        L.propTypes = {
            user: M.object.isRequired
        };
        var F = n(6352)
            , G = n(58221)
            , U = n(43883)
            , B = n(75602)
            , z = n(76372)
            , H = n(61367)
            , q = n(20115)
            , V = n(17883)
            , W = n.n(V)
            , X = function(e) {
            let {results: t} = e
                , {currentUser: n} = (0,
                    p.x)()
                , {searchType: r, setSearchType: i, setSearchTerms: o, searchPlatform: s, setSearchPlatform: l, searchSortCategory: m, setSearchSortCategory: h, searchRangeCategory: f, setSearchRangeCategory: _, searchRangeTimeMin: g, setSearchRangeTimeMin: v, searchRangeTimeMax: x, setSearchRangeTimeMax: b, searchPerspective: y, setSearchPerspective: j, searchFlow: N, setSearchFlow: k, searchGenre: w, setSearchGenre: S, searchRangeYearMin: C, setSearchRangeYearMin: T, searchRangeYearMax: E, setSearchRangeYearMax: P, searchModifier: A, setSearchModifier: O, searchSortList: M, setSearchSortList: R, searchSortUser: D, setSearchSortUser: I, searchFilter: L, setSearchFilter: F, setSearchOrder: V, setSearchRandomizer: X, closeSearch: $} = (0,
                    d.Rx)()
                , [Z,Y] = (0,
                    u.useState)("none")
                , J = () => {
                    o(""),
                        l(""),
                        h("popular"),
                        _("main"),
                        v(""),
                        b(""),
                        j(""),
                        k(""),
                        S(""),
                        T(""),
                        P(""),
                        O(""),
                        F(""),
                        R("follows"),
                        I("postcount"),
                        X(0)
                }
            ;
            return (0,
                a.jsxs)(a.Fragment, {
                children: [(0,
                    a.jsxs)("div", {
                    className: "content_66",
                    children: [(0,
                        a.jsx)("button", {
                        className: c()(W().search_tab, "games" === r ? "back_blue" : "back_secondary", "center shadow_box"),
                        onClick: () => {
                            X(0),
                                F(""),
                                i("games")
                        }
                        ,
                        children: "Games"
                    }), (0,
                        a.jsx)("button", {
                        className: c()(W().search_tab, "lists" === r ? "back_purple" : "back_secondary", "center shadow_box"),
                        onClick: () => {
                            X(0),
                                F(""),
                                i("lists")
                        }
                        ,
                        children: "Collections"
                    }), (0,
                        a.jsx)("button", {
                        className: c()(W().search_tab, "users" === r ? "back_pink" : "back_secondary", "center shadow_box"),
                        onClick: () => {
                            X(0),
                                F(""),
                                i("users")
                        }
                        ,
                        children: "Users"
                    }), (0,
                        a.jsx)("div", {
                        className: "clear"
                    })]
                }), (0,
                    a.jsxs)("div", {
                    className: "content_33",
                    children: [(0,
                        a.jsx)("button", {
                        className: c()(W().search_options_button, "back_form", "shadow_box"),
                        onClick: () => {
                            "block" === Z ? Y("none") : Y("block"),
                                (0,
                                    G.L9)({
                                    eventName: "search_options",
                                    params: {
                                        search_extended: "block" !== Z
                                    }
                                })
                        }
                        ,
                        children: "Search Options"
                    }), (0,
                        a.jsx)("button", {
                        className: c()(W().search_options_button, "back_form", "shadow_box"),
                        onClick: $,
                        children: "Close"
                    })]
                }), (0,
                    a.jsx)("div", {
                    className: "clear"
                }), (0,
                    a.jsxs)("div", {
                    style: {
                        display: Z
                    },
                    children: ["games" === r && (0,
                        a.jsxs)(a.Fragment, {
                        children: [(0,
                            a.jsx)("div", {
                            className: "content_33 back_secondary shadow_box",
                            children: (0,
                                a.jsxs)("div", {
                                className: "in",
                                children: [(0,
                                    a.jsx)("h5", {
                                    className: "left",
                                    children: "Platform"
                                }), (0,
                                    a.jsx)(U.Z, {
                                    name: "search_platform",
                                    value: s,
                                    className: null,
                                    onChange: e => {
                                        l(e.target.value),
                                            X(0)
                                    }
                                }), (0,
                                    a.jsx)("h5", {
                                    className: "left",
                                    children: "Sort By"
                                }), (0,
                                    a.jsxs)("select", {
                                    className: "form_select back_form",
                                    value: m,
                                    onChange: e => {
                                        h(e.target.value),
                                            X(0)
                                    }
                                    ,
                                    children: [(0,
                                        a.jsx)("option", {
                                        value: "name",
                                        children: "Name"
                                    }), (0,
                                        a.jsx)("option", {
                                        value: "main",
                                        children: "Main Story"
                                    }), (0,
                                        a.jsx)("option", {
                                        value: "mainp",
                                        children: "Main + Extras"
                                    }), (0,
                                        a.jsx)("option", {
                                        value: "comp",
                                        children: "Completionist"
                                    }), (0,
                                        a.jsx)("option", {
                                        value: "averagea",
                                        children: "Average Time"
                                    }), (0,
                                        a.jsx)("option", {
                                        value: "rating",
                                        children: "Top Rated"
                                    }), (0,
                                        a.jsx)("option", {
                                        value: "popular",
                                        children: "Most Popular"
                                    }), (0,
                                        a.jsx)("option", {
                                        value: "backlog",
                                        children: "Most Backlogs"
                                    }), (0,
                                        a.jsx)("option", {
                                        value: "usersp",
                                        children: "Most Submissions"
                                    }), (0,
                                        a.jsx)("option", {
                                        value: "playing",
                                        children: "Most Played"
                                    }), (0,
                                        a.jsx)("option", {
                                        value: "speedruns",
                                        children: "Most Speedruns"
                                    }), (0,
                                        a.jsx)("option", {
                                        value: "reviews",
                                        children: "Most Reviews"
                                    }), (0,
                                        a.jsx)("option", {
                                        value: "release",
                                        children: "Release Date"
                                    })]
                                })]
                            })
                        }), (0,
                            a.jsx)("div", {
                            className: "content_33 back_secondary shadow_box",
                            children: (0,
                                a.jsxs)("div", {
                                className: "in",
                                children: [(0,
                                    a.jsxs)("div", {
                                    className: W().search_genres,
                                    children: [(0,
                                        a.jsx)("h5", {
                                        className: "left",
                                        children: "Perspective"
                                    }), (0,
                                        a.jsx)(B.Z, {
                                        name: "search_perspective",
                                        id: "search_perspective",
                                        value: y,
                                        className: null,
                                        onChange: e => {
                                            j(e.target.value),
                                                X(0)
                                        }
                                    })]
                                }), (0,
                                    a.jsxs)("div", {
                                    className: W().search_genres,
                                    style: {
                                        margin: "0 2%"
                                    },
                                    children: [(0,
                                        a.jsx)("h5", {
                                        className: "left",
                                        children: "Flow"
                                    }), (0,
                                        a.jsx)(z.Z, {
                                        name: "search_flow",
                                        value: N,
                                        className: null,
                                        onChange: e => {
                                            k(e.target.value),
                                                X(0)
                                        }
                                    })]
                                }), (0,
                                    a.jsxs)("div", {
                                    className: W().search_genres,
                                    children: [(0,
                                        a.jsx)("h5", {
                                        className: "left",
                                        children: "Genre"
                                    }), (0,
                                        a.jsx)(H.Z, {
                                        name: "search_genre",
                                        value: w,
                                        className: null,
                                        onChange: e => {
                                            S(e.target.value),
                                                X(0)
                                        }
                                    })]
                                }), (0,
                                    a.jsx)("div", {
                                    className: "clear"
                                }), (0,
                                    a.jsx)("h5", {
                                    className: "left",
                                    children: "Release Year"
                                }), (0,
                                    a.jsx)(q.Z, {
                                    name: "search_year",
                                    className: c()(C ? W().search_range_l : null, "form_select back_form"),
                                    value: C,
                                    defaultLabel: "All",
                                    onChange: e => T(e.target.value)
                                }), C ? (0,
                                    a.jsx)(q.Z, {
                                    name: "search_year",
                                    className: c()(W().search_range_r, "form_select back_form"),
                                    value: E,
                                    defaultLabel: "(End)",
                                    onChange: e => P(e.target.value)
                                }) : null, (0,
                                    a.jsx)("div", {
                                    className: "clear"
                                })]
                            })
                        }), (0,
                            a.jsx)("div", {
                            className: "content_33 back_secondary shadow_box",
                            children: (0,
                                a.jsxs)("div", {
                                className: "in",
                                children: [(0,
                                    a.jsx)("h5", {
                                    className: "left",
                                    children: "Length Range Category"
                                }), (0,
                                    a.jsxs)("select", {
                                    className: "form_select back_form",
                                    value: f,
                                    onChange: e => {
                                        _(e.target.value),
                                            X(0)
                                    }
                                    ,
                                    children: [(0,
                                        a.jsx)("option", {
                                        value: "main",
                                        children: "Main Story"
                                    }), (0,
                                        a.jsx)("option", {
                                        value: "mainp",
                                        children: "Main + Extras"
                                    }), (0,
                                        a.jsx)("option", {
                                        value: "comp",
                                        children: "Completionist"
                                    }), (0,
                                        a.jsx)("option", {
                                        value: "averagea",
                                        children: "Average Time"
                                    })]
                                }), (0,
                                    a.jsx)("h5", {
                                    className: "left",
                                    children: "Hour Range"
                                }), (0,
                                    a.jsx)("input", {
                                    className: c()(W().search_range_l, "back_form"),
                                    type: "text",
                                    placeholder: "Min",
                                    value: g,
                                    onChange: e => {
                                        v(e.target.value),
                                            X(0)
                                    }
                                }), (0,
                                    a.jsx)("input", {
                                    className: c()(W().search_range_r, "back_form"),
                                    type: "text",
                                    placeholder: "Max",
                                    value: x,
                                    onChange: e => {
                                        b(e.target.value),
                                            X(0)
                                    }
                                }), (0,
                                    a.jsx)("div", {
                                    className: "clear"
                                })]
                            })
                        }), (0,
                            a.jsx)("div", {
                            className: "clear"
                        })]
                    }), "lists" === r && (0,
                        a.jsx)(a.Fragment, {
                        children: (0,
                            a.jsx)("div", {
                            className: "content_50 back_secondary shadow_box",
                            children: (0,
                                a.jsxs)("div", {
                                className: "in",
                                children: [(0,
                                    a.jsx)("h5", {
                                    className: "left",
                                    children: "Sort By"
                                }), (0,
                                    a.jsxs)("select", {
                                    className: "form_select back_form",
                                    value: M,
                                    onChange: e => {
                                        R(e.target.value),
                                            X(0)
                                    }
                                    ,
                                    children: [(0,
                                        a.jsx)("option", {
                                        value: "follows",
                                        children: "Followers"
                                    }), (0,
                                        a.jsx)("option", {
                                        value: "updated",
                                        children: "Recently Updated"
                                    }), (0,
                                        a.jsx)("option", {
                                        value: "totalgames",
                                        children: "Total Games"
                                    }), (0,
                                        a.jsx)("option", {
                                        value: "totallength",
                                        children: "Total Length"
                                    }), (0,
                                        a.jsx)("option", {
                                        value: "name",
                                        children: "Name"
                                    })]
                                })]
                            })
                        })
                    }), "users" === r && (0,
                        a.jsx)(a.Fragment, {
                        children: (0,
                            a.jsx)("div", {
                            className: "content_50 back_secondary shadow_box",
                            children: (0,
                                a.jsxs)("div", {
                                className: "in",
                                children: [(0,
                                    a.jsx)("h5", {
                                    className: "left",
                                    children: "Sort By"
                                }), (0,
                                    a.jsxs)("select", {
                                    className: "form_select back_form",
                                    value: D,
                                    onChange: e => {
                                        I(e.target.value),
                                            X(0)
                                    }
                                    ,
                                    children: [(0,
                                        a.jsx)("option", {
                                        value: "name",
                                        children: "Name"
                                    }), (0,
                                        a.jsx)("option", {
                                        value: "gender",
                                        children: "Gender"
                                    }), (0,
                                        a.jsx)("option", {
                                        value: "numbacklog",
                                        children: "Most Backlogs"
                                    }), (0,
                                        a.jsx)("option", {
                                        value: "numcomp",
                                        children: "Most Completed"
                                    }), (0,
                                        a.jsx)("option", {
                                        value: "postcount",
                                        children: "Top Posters"
                                    })]
                                })]
                            })
                        })
                    }), (0,
                        a.jsx)("div", {
                        className: c()("games" === r ? "content_100 back_secondary" : "content_50 back_secondary", "shadow_box"),
                        children: (0,
                            a.jsxs)("div", {
                            className: c()(W().search_general, "in"),
                            children: [(0,
                                a.jsx)("h5", {
                                className: "left",
                                children: "Other Options"
                            }), "games" === r ? (0,
                                a.jsxs)(a.Fragment, {
                                children: [(0,
                                    a.jsxs)("select", {
                                    className: c()(W().search_modifier, "form_select", "back_form"),
                                    value: A,
                                    onChange: e => {
                                        O(e.target.value),
                                            X(0)
                                    }
                                    ,
                                    children: [(0,
                                        a.jsx)("option", {
                                        children: "Modifiers"
                                    }), (null == n ? void 0 : n.user_id) ? (0,
                                        a.jsxs)("optgroup", {
                                        label: "Account Options",
                                        children: [(0,
                                            a.jsx)("option", {
                                            value: "play_exclude",
                                            children: "Exclude My Games"
                                        }), (0,
                                            a.jsx)("option", {
                                            value: "play_include",
                                            children: "Isolate My Games"
                                        })]
                                    }) : null, (0,
                                        a.jsxs)("optgroup", {
                                        label: "DLC/Mod Options",
                                        children: [(0,
                                            a.jsx)("option", {
                                            value: "hide_dlc",
                                            children: "Hide Mods & DLC"
                                        }), (0,
                                            a.jsx)("option", {
                                            value: "only_dlc",
                                            children: "Isolate DLC"
                                        }), (0,
                                            a.jsx)("option", {
                                            value: "only_mods",
                                            children: "Isolate Mods"
                                        }), (0,
                                            a.jsx)("option", {
                                            value: "only_hacks",
                                            children: "Isolate Hacks"
                                        })]
                                    }), (0,
                                        a.jsxs)("optgroup", {
                                        label: "Stat Options",
                                        children: [(0,
                                            a.jsx)("option", {
                                            value: "hidden_stats",
                                            children: "Hidden Stats"
                                        }), (0,
                                            a.jsx)("option", {
                                            value: "user_stats",
                                            children: "Show User Stats"
                                        })]
                                    })]
                                }), (0,
                                    a.jsx)("button", {
                                    type: "button",
                                    className: c()(W().search_gamepass_toggle, "form_button", "game pass" === L ? "back_green" : "back_dark"),
                                    "aria-label": "Game Pass Toggle",
                                    title: "Check out Game Pass titles!",
                                    onClick: () => {
                                        X(0),
                                            "game pass" === L ? F("") : F("game pass")
                                    }
                                    ,
                                    children: "Game Pass Toggle"
                                })]
                            }) : null, (0,
                                a.jsx)("div", {
                                className: "desktop_hide",
                                children: (0,
                                    a.jsx)("div", {
                                    className: "clear"
                                })
                            }), (0,
                                a.jsx)("button", {
                                type: "button",
                                className: c()(W().random, "form_button", "back_blue"),
                                "aria-label": "Random",
                                value: "0",
                                title: "Randomly Select One Title",
                                onClick: e => {
                                    e.target.value = Math.floor(Math.random() * (null == t ? void 0 : t.count) + 1),
                                        X(e.target.value)
                                }
                                ,
                                children: "Random"
                            }), (0,
                                a.jsx)("button", {
                                className: c()(W().button, "form_button", "back_blue"),
                                type: "button",
                                value: "0",
                                onClick: e => {
                                    var t;
                                    X(0),
                                        0 === parseInt((t = e.target).value) ? (t.value = 1,
                                            t.innerHTML = "˄ Sort") : (t.value = 0,
                                            t.innerHTML = "˅ Sort"),
                                        V(e.target.value)
                                }
                                ,
                                children: "˅ Sort"
                            }), (0,
                                a.jsx)("button", {
                                className: c()(W().button, "form_button", "back_red"),
                                type: "button",
                                onClick: () => J(),
                                children: "Reset"
                            })]
                        })
                    }), (0,
                        a.jsx)("div", {
                        className: "clear"
                    })]
                })]
            })
        }
            , $ = n(58244)
            , Z = function(e) {
            let {isVisible: t, results: n, screenWidth: r} = e
                , {isLoading: i, searchType: o, searchTerms: s, searchRandomizer: l, searchPage: u} = (0,
                    d.Rx)()
                , m = e => {
                    var t, r;
                    let {result: i} = e
                        , l = null == n ? void 0 : null === (t = n.userData.filter(e => e.game_id === i.game_id)) || void 0 === t ? void 0 : t[0];
                    return "games" === o ? (0,
                        a.jsx)(P.Z, {
                        userStats: l,
                        isPreloaded: !0,
                        game: i,
                        displayModifier: null == n ? void 0 : n.displayModifier,
                        highlight: s.trim().toLowerCase() === (null == i ? void 0 : null === (r = i.game_name) || void 0 === r ? void 0 : r.toLowerCase()),
                        searchTerms: s
                    }) : "users" === o ? (0,
                        a.jsx)(L, {
                        user: i
                    }) : (0,
                        a.jsx)($.Z, {
                        item: i,
                        showUser: !0
                    })
                }
            ;
            return !0 === t ? (0,
                a.jsxs)(a.Fragment, {
                children: [(0,
                    a.jsx)(T(), {
                    children: (0,
                        a.jsx)("title", {
                        children: "Search | HowLongToBeat"
                    })
                }), (0,
                    a.jsx)("div", {
                    className: "contain_out",
                    children: (0,
                        a.jsxs)("div", {
                        className: "contain_in",
                        children: [(0,
                            a.jsx)(X, {
                            results: n
                        }), (0,
                            a.jsx)( () => (0,
                            a.jsxs)("div", {
                            className: "content_100",
                            id: "search-results-header",
                            children: [!1 === i ? (0,
                                a.jsxs)("div", {
                                className: c()("global_padding", (null == n ? void 0 : n.color) ? "back_".concat(null == n ? void 0 : n.color) : "back_secondary", "center", "shadow_box"),
                                children: [(0,
                                    a.jsx)("h3", {
                                    className: W().search_title,
                                    children: u > 1 ? (0,
                                        a.jsx)(a.Fragment, {
                                        children: "Page ".concat(u)
                                    }) : (null == n ? void 0 : n.count) > 0 ? "We Found ".concat((0,
                                        y.uf)(null == n ? void 0 : n.count), " ").concat(null == n ? void 0 : n.category) : "No Results Found, Try A New Search"
                                }), (null == n ? void 0 : n.title) ? (0,
                                    a.jsx)("h5", {
                                    className: c()(W().search_subtitle, "global_padding", "center"),
                                    children: null == n ? void 0 : n.title
                                }) : null]
                            }) : (0,
                                a.jsx)("div", {
                                className: "loading_bar"
                            }), (0,
                                a.jsxs)("ul", {
                                children: [(null == n ? void 0 : n.count) > 0 && (null == n ? void 0 : n.data.slice(0, 2).map(e => e["".concat(o.slice(0, 4), "_id")] > 0 && (0,
                                    a.jsx)(m, {
                                    result: e
                                }, "".concat(o, "_").concat(e["".concat(o.slice(0, 4), "_id")], "_s").concat(l)))), (null == n ? void 0 : n.count) > 6 && r <= 768 && (0,
                                    a.jsxs)(a.Fragment, {
                                    children: [(0,
                                        a.jsx)("div", {
                                        className: "clear"
                                    }), (0,
                                        a.jsx)(E.Z, {
                                        adType: "wide",
                                        location: "incontent"
                                    })]
                                }), (null == n ? void 0 : n.count) >= 3 && (null == n ? void 0 : n.data.slice(2, 20).map(e => e["".concat(o.slice(0, 4), "_id")] > 0 && (0,
                                    a.jsx)(m, {
                                    result: e
                                }, "".concat(o, "_").concat(e["".concat(o.slice(0, 4), "_id")], "_s").concat(l)))), (0,
                                    a.jsx)("div", {
                                    className: "clear"
                                })]
                            })]
                        }), {}), (null == n ? void 0 : n.count) > (null == n ? void 0 : n.pageSize) && 0 === l && (0,
                            a.jsx)("div", {
                            className: c()("content_100", "back_form", "shadow_box", W().pagination),
                            children: (0,
                                a.jsx)(F.Z, {
                                pageType: "searchPage",
                                pageCurrent: null == n ? void 0 : n.pageCurrent,
                                pageTotal: null == n ? void 0 : n.pageTotal,
                                selectColor: "games" === o ? "back_blue" : "users" === o ? "back_pink" : "back_purple"
                            })
                        }), (0,
                            a.jsx)("div", {
                            className: "content_break"
                        })]
                    })
                })]
            }) : null
        }
            , Y = n(1571)
            , J = () => {
            let {currentUser: e} = (0,
                p.x)()
                , [t,n] = (0,
                u.useState)(!1)
                , {resolvedTheme: r, setTheme: i} = (0,
                Y.F)();
            return ((0,
                u.useEffect)( () => {
                    (null == e ? void 0 : e.set_theme) && i(e.set_theme),
                        n(!0)
                }
                , [null == e ? void 0 : e.set_theme]),
                t) ? (null == e ? void 0 : e.set_theme) ? void 0 : (0,
                a.jsxs)("select", {
                className: "form_select ".concat("dark" === r ? "back_dark" : "back_light"),
                onChange: e => {
                    i(e.target.value)
                }
                ,
                children: [(0,
                    a.jsx)("option", {
                    value: "system",
                    children: "System Theme"
                }), (0,
                    a.jsx)("option", {
                    value: "light",
                    children: "Light Theme"
                }), (0,
                    a.jsx)("option", {
                    value: "dark",
                    children: "Dark Theme"
                })]
            }) : null
        }
            , K = n(28157)
            , Q = n.n(K)
            , ee = function() {
            return (0,
                a.jsx)("footer", {
                className: c()(Q().footer, "back_primary"),
                children: (0,
                    a.jsxs)("div", {
                    className: Q().footer_inside,
                    children: [(0,
                        a.jsxs)("div", {
                        className: Q().footer_links,
                        children: [(0,
                            a.jsx)("h3", {
                            children: "Social"
                        }), (0,
                            a.jsxs)("ul", {
                            children: [(0,
                                a.jsx)("li", {
                                children: (0,
                                    a.jsx)("a", {
                                    href: "https://discord.gg/v5F26Dk",
                                    target: "_blank",
                                    rel: "noreferrer",
                                    children: "Discord"
                                })
                            }), (0,
                                a.jsx)("li", {
                                children: (0,
                                    a.jsx)("a", {
                                    href: "https://facebook.com/HowLongToBeat/",
                                    target: "_blank",
                                    rel: "noreferrer",
                                    children: "Facebook"
                                })
                            }), (0,
                                a.jsx)("li", {
                                children: (0,
                                    a.jsx)("a", {
                                    href: "https://twitter.com/HowLongToBeat/",
                                    target: "_blank",
                                    rel: "noreferrer",
                                    children: "Twitter"
                                })
                            })]
                        })]
                    }), (0,
                        a.jsxs)("div", {
                        className: Q().footer_links,
                        children: [(0,
                            a.jsx)("h3", {
                            children: "Information"
                        }), (0,
                            a.jsxs)("ul", {
                            children: [(0,
                                a.jsx)("li", {
                                children: (0,
                                    a.jsx)(i(), {
                                    href: "/feedback",
                                    children: "Contact Us"
                                })
                            }), (0,
                                a.jsx)("li", {
                                children: (0,
                                    a.jsx)(i(), {
                                    href: "/conduct",
                                    children: "Code of Conduct"
                                })
                            }), (0,
                                a.jsx)("li", {
                                children: (0,
                                    a.jsx)("a", {
                                    href: "https://www.ziffdavis.com/privacy-policy",
                                    children: "Privacy Policy"
                                })
                            })]
                        })]
                    }), (0,
                        a.jsxs)("div", {
                        className: Q().footer_copyright,
                        children: [(0,
                            a.jsx)("h3", {
                            children: "HowLongToBeat"
                        }), (0,
                            a.jsxs)("ul", {
                            children: [(0,
                                a.jsx)("li", {
                                children: "\xa9 2011–2024 Ziff Davis, LLC, a Ziff Davis company. All Rights Reserved."
                            }), (0,
                                a.jsxs)("li", {
                                children: [(0,
                                    a.jsx)("a", {
                                    href: "https://www.ziffdavis.com/accessibility",
                                    target: "_blank",
                                    rel: "noreferrer",
                                    children: "Accessibility"
                                }), ", ", (0,
                                    a.jsxs)("a", {
                                    href: "#",
                                    className: "showConsentTool",
                                    onClick: e => window.zdconsent.showConsentTool(e),
                                    children: [(0,
                                        a.jsx)("img", {
                                        alt: "AdChoices Icon",
                                        src: "https://c.evidon.com/pub/icong1.png",
                                        className: "evidon-consent-link-image",
                                        style: {
                                            verticalAlign: "middle"
                                        },
                                        width: 14,
                                        height: 18
                                    }), " ", "AdChoices"]
                                }), ", ", (0,
                                    a.jsx)("a", {
                                    href: "https://www.ziffdavis.com/terms-of-use",
                                    target: "_blank",
                                    rel: "noreferrer",
                                    children: "Terms of Use"
                                })]
                            }), (0,
                                a.jsx)("li", {
                                children: (0,
                                    a.jsx)(J, {})
                            })]
                        })]
                    })]
                })
            })
        }
            , et = n(78571)
            , en = n.n(et)
            , ea = function(e) {
            let {children: t, pageMetadata: n={}} = e
                , r = (0,
                u.useContext)(d.ZP)
                , {noHeader: i=!1, noTopAd: o=!1, noBottomAd: s=!1, noFooter: l=!1} = n
                , [c,m] = (0,
                u.useState)(0);
            return (0,
                u.useEffect)( () => {
                    m(window.screen.availWidth)
                }
                , [r.isVisible]),
                (0,
                    a.jsxs)("div", {
                    className: en().container,
                    children: [!i && (0,
                        a.jsx)(S, {}), !o && (!1 === r.isVisible || c > 768) && (0,
                        a.jsx)(E.Z, {
                        adType: "wide",
                        location: "top",
                        divClass: "back_secondary center"
                    }), (0,
                        a.jsx)("main", {
                        className: en().main,
                        children: !0 === r.isVisible ? (0,
                            a.jsx)(Z, {
                            isVisible: r.isVisible,
                            results: r.results,
                            screenWidth: c
                        }) : t
                    }), !s && (0,
                        a.jsx)(E.Z, {
                        adType: "wide",
                        location: "footer"
                    }), !l && (0,
                        a.jsx)(ee, {})]
                })
        }
            , er = function(e) {
            let {title: t="HowLongToBeat.com | Game Lengths, Backlogs and more!", description: n="How long are your favorite video games? HowLongToBeat has the answer. Create a backlog, submit your game times and compete with your friends!", robots: r="noodp, noydir, max-image-preview:large", image: i="".concat("https://howlongtobeat.com", "/img/hltb_brand2.png"), twitterCard: o="summary", type: s="website", canonical: l} = e;
            return (0,
                a.jsxs)(T(), {
                children: [(0,
                    a.jsx)("title", {
                    children: t
                }, "title"), (0,
                    a.jsx)("meta", {
                    name: "theme-color",
                    content: "#000000"
                }), (0,
                    a.jsx)("meta", {
                    name: "description",
                    content: n
                }, "description"), (0,
                    a.jsx)("meta", {
                    name: "robots",
                    content: r
                }, "robots"), (0,
                    a.jsx)("meta", {
                    name: "thumbnail",
                    content: i
                }), null !== l && (0,
                    a.jsxs)(a.Fragment, {
                    children: [(0,
                        a.jsx)("link", {
                        rel: "canonical",
                        href: "https://howlongtobeat.com".concat(l)
                    }, "canonical"), (0,
                        a.jsx)("meta", {
                        property: "twitter:url",
                        content: "https://howlongtobeat.com".concat(l)
                    }), (0,
                        a.jsx)("meta", {
                        property: "og:url",
                        content: "https://howlongtobeat.com".concat(l)
                    }, "og:url")]
                }), (0,
                    a.jsx)("meta", {
                    property: "og:title",
                    content: t
                }, "og:title"), (0,
                    a.jsx)("meta", {
                    property: "og:type",
                    content: s
                }, "og:type"), (0,
                    a.jsx)("meta", {
                    property: "og:image",
                    content: i
                }, "og:image"), (0,
                    a.jsx)("meta", {
                    property: "og:description",
                    content: n
                }, "og:description"), (0,
                    a.jsx)("meta", {
                    name: "twitter:card",
                    content: o
                }), (0,
                    a.jsx)("meta", {
                    name: "twitter:description",
                    content: n
                }), (0,
                    a.jsx)("meta", {
                    property: "twitter:domain",
                    content: "howlongtobeat.com"
                }), (0,
                    a.jsx)("meta", {
                    name: "twitter:site",
                    content: "@HowLongToBeat"
                }), (0,
                    a.jsx)("meta", {
                    name: "twitter:image",
                    content: i
                })]
            })
        };
        let ei = "3000068"
            , eo = function() {
                let e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
                window._comscore = window._comscore || [];
                let t = {
                    c2: ei
                }
                    , n = document.createElement("script")
                    , a = document.getElementsByTagName("script")[0];
                n.async = !0,
                    n.src = ("https:" === document.location.protocol ? "https://sb" : "http://b") + ".scorecardresearch.com/beacon.js",
                    a.parentNode.insertBefore(n, a),
                void 0 !== window._ziffIntlGeoRedirect && window._ziffIntlGeoRedirect || (t.c1 = e ? 1 : 2,
                    window._comscore.push(t))
            }
            , es = () => {
                window.COMSCORE && window.COMSCORE.beacon({
                    c1: 2,
                    c2: ei
                }),
                    el()
            }
            , el = () => {
                let e = "".concat(Date.now()).concat(Math.random());
                fetch("".concat("/static/pv_candidate.html", "?cb=").concat(e))
            }
        ;
        var ec = function(e) {
            var t, n;
            let {pageMetadata: a, gameData: r, game: i, threadData: o} = e
                , {currentUser: s} = (0,
                p.x)()
                , l = (0,
                m.useRouter)()
                , c = (0,
                u.useRef)(!1)
                , d = (0,
                u.useRef)()
                , f = (0,
                u.useRef)()
                , _ = (0,
                u.useRef)()
                , g = (0,
                u.useRef)();
            d.current = (null == a ? void 0 : a.title) || "HowLongToBeat.com | Game Lengths, Backlogs and more!",
                f.current = l.asPath,
                g.current = {
                    template: (null == a ? void 0 : a.template) || "general",
                    category: (null == a ? void 0 : a.category) || "general",
                    tags: (null == a ? void 0 : a.tags) || []
                };
            let v = f.current.split("/")
                , x = v[1] || "index"
                , b = ["reviews", "lists", "completions", "edit", "stats", "games", "friends", "messages", "options"]
                , y = v.filter(e => b.includes(e))[0] || "main"
                , {game_id: j, game_name: N} = r || (null == i ? void 0 : null === (n = i.data) || void 0 === n ? void 0 : null === (t = n.game) || void 0 === t ? void 0 : t[0]) || {}
                , {category: k, title: w, pageCurrent: S} = (null == o ? void 0 : o.thread) || {}
                , C = null != s && !!s.user_name;
            if (_.current = {
                page_type: x,
                page_section: y,
                signed_in: C
            },
            j > 0 && (_.current = {
                ..._.current,
                game_id: j,
                game_name: N
            }),
            w && "" !== w) {
                switch (k) {
                    case 1:
                        k = "Gaming";
                        break;
                    case 2:
                        k = "Off-Topic";
                        break;
                    case 3:
                        k = "Support";
                        break;
                    default:
                        k = ""
                }
                _.current = {
                    ..._.current,
                    forum_topic: k,
                    forum_title: w,
                    forum_page: S
                }
            }
            return (0,
                u.useEffect)( () => {
                    c.current || (c.current = !0,
                        eo(),
                        (0,
                            G.mp)(),
                        (0,
                            G.tN)({
                            url: f.current,
                            title: d.current,
                            universalParams: {
                                ..._.current
                            }
                        })),
                        window.PogoConfig = g.current
                }
                , []),
                (0,
                    u.useEffect)( () => {
                        let e = () => {
                                setTimeout( () => {
                                        (0,
                                            G.tN)({
                                            url: f.current,
                                            title: d.current,
                                            universalParams: {
                                                ..._.current
                                            }
                                        }),
                                            es(),
                                            window.PogoConfig = g.current,
                                            window.dispatchEvent(new Event("pogorun"), g.current)
                                    }
                                    , 500)
                            }
                        ;
                        return h().events.on("routeChangeComplete", e),
                            () => {
                                h().events.off("routeChangeComplete", e)
                            }
                    }
                    , []),
                null
        };
        class eu extends u.Component {
            static getDerivedStateFromError() {
                return {
                    hasError: !0
                }
            }
            componentDidCatch(e, t) {
                (0,
                    y.Dh)({
                    message: null == e ? void 0 : e.message,
                    custom: {
                        ...t,
                        location: "ErrorBoundary"
                    }
                })
            }
            render() {
                return this.state.hasError ? (0,
                    a.jsx)("div", {
                    className: "contain_in",
                    children: (0,
                        a.jsx)("div", {
                        className: "content_100 back_primary shadow_box center",
                        children: (0,
                            a.jsx)("div", {
                            className: "in",
                            children: "Something went wrong! Please try again later."
                        })
                    })
                }) : this.props.children
            }
            constructor(e) {
                super(e),
                    this.state = {
                        hasError: !1
                    }
            }
        }
        n(19311);
        let ed = new function(e) {
            this.start = void 0,
                this.finish = void 0;
            var t, n, a = Object.assign, r = a({
                size: 2,
                color: "#29e",
                className: "bar-of-progress",
                delay: 80
            }, e), i = {
                position: "fixed",
                top: 0,
                left: 0,
                margin: 0,
                padding: 0,
                border: "none",
                borderRadius: 0,
                backgroundColor: r.color,
                zIndex: 1e4,
                height: "number" == typeof r.size ? r.size + "px" : r.size,
                color: r.color,
                opacity: 0,
                width: "0%"
            }, o = {
                opacity: 1,
                width: "99%",
                transition: "width 10s cubic-bezier(0.1, 0.05, 0, 1)"
            }, s = {
                opacity: 0,
                width: "100%",
                transition: "width 0.1s ease-out, opacity 0.5s ease 0.2s"
            }, l = {
                opacity: .4,
                boxShadow: "3px 0 8px",
                height: "100%"
            };
            this.start = function() {
                n && n.parentNode && n.parentNode.removeChild(n),
                    (n = document.body.appendChild(document.createElement("div"))).className = r.className + " stopped",
                    a(n.style, i);
                var e = n.appendChild(document.createElement("div"));
                e.className = "glow",
                    a(e.style, l),
                null != t && clearTimeout(t),
                    t = setTimeout(function() {
                        t = void 0,
                            n.className = r.className + " started",
                            a(n.style, o)
                    }, r.delay),
                    n.scrollTop = 0
            }
                ,
                this.finish = function() {
                    null != t && (clearTimeout(t),
                        t = void 0),
                    n && (n.className = r.className + " finished",
                        a(n.style, s))
                }
        }
        ({
            size: 3,
            color: "#2b7ab9",
            className: "bar-of-progress",
            delay: 50
        });
        h().events.on("routeChangeStart", ed.start),
            h().events.on("routeChangeComplete", ed.finish),
            h().events.on("routeChangeError", ed.finish);
        var em = function(e) {
            let {Component: t, pageProps: n} = e
                , {pageMetadata: r} = n;
            return (0,
                a.jsx)(p.M, {
                children: (0,
                    a.jsx)(d.Nd, {
                    children: (0,
                        a.jsx)(Y.f, {
                        children: (0,
                            a.jsxs)(ea, {
                            pageMetadata: r,
                            children: [(0,
                                a.jsx)(er, {
                                ...r
                            }), (0,
                                a.jsx)(eu, {
                                children: (0,
                                    a.jsx)(t, {
                                    ...n
                                })
                            }), (0,
                                a.jsx)(ec, {
                                ...n
                            })]
                        })
                    })
                })
            })
        }
    },
    19311: function() {},
    18765: function(e) {
        e.exports = {
            box_art_image: "BoxArt_box_art_image__KPP9w"
        }
    },
    50587: function(e) {
        e.exports = {
            search_list: "GameCard_search_list__IuMbi",
            inside_blur: "GameCard_inside_blur__cP8_l",
            search_list_image: "GameCard_search_list_image__B2uLH",
            search_list_details: "GameCard_search_list_details__yJrue",
            search_list_page: "GameCard_search_list_page__ThTv8",
            search_list_details_block: "GameCard_search_list_details_block__XEXkr",
            search_list_tidbit_short: "GameCard_search_list_tidbit_short__lgeWh",
            search_list_tidbit: "GameCard_search_list_tidbit__0r_OP",
            search_list_tidbit_long: "GameCard_search_list_tidbit_long__2Ov22"
        }
    },
    12483: function(e) {
        e.exports = {
            user_details: "GameQuickAdd_user_details__wCUqq",
            holder: "GameQuickAdd_holder__tVYix",
            action_button: "GameQuickAdd_action_button__352Z8",
            game_options: "GameQuickAdd_game_options__dvpYG",
            completed: "GameQuickAdd_completed__FRmPY",
            num: "GameQuickAdd_num__HfNYq",
            detailed: "GameQuickAdd_detailed__hMRcB",
            collection_field: "GameQuickAdd_collection_field__KXdhn",
            collection_new: "GameQuickAdd_collection_new__7JsQn",
            collection_note: "GameQuickAdd_collection_note__igvZC",
            quick_add: "GameQuickAdd_quick_add__cw7lv",
            profile_quick_add: "GameQuickAdd_profile_quick_add__22FIF",
            side_header: "GameQuickAdd_side_header__30Eh7"
        }
    },
    28157: function(e) {
        e.exports = {
            footer_inside: "Footer_footer_inside___u1sn",
            footer_links: "Footer_footer_links__LvxWM",
            footer_copyright: "Footer_footer_copyright__aFR4E",
            footer: "Footer_footer__LxLGV"
        }
    },
    78571: function(e) {
        e.exports = {
            container: "Layout_container___dzs2",
            main: "Layout_main__RMpyO"
        }
    },
    69863: function(e) {
        e.exports = {
            header: "MainNavigation_header__JBIUU",
            nav: "MainNavigation_nav__AjhTN",
            brand: "MainNavigation_brand__zco7a",
            search_box: "MainNavigation_search_box__UUnYc",
            list: "MainNavigation_list__MZx_N",
            login: "MainNavigation_login____l2v",
            search: "MainNavigation_search__mL_ux",
            join_link: "MainNavigation_join_link__Iz_x9"
        }
    },
    32840: function(e) {
        e.exports = {
            user_pagination: "Pagination_user_pagination__gPqaa",
            label: "Pagination_label__yII1h",
            inactive: "Pagination_inactive__dnoZF",
            left: "Pagination_left__dt4_q",
            right: "Pagination_right__GwBE_"
        }
    },
    67438: function(e) {
        e.exports = {
            nav_u_drop: "UserNavigation_nav_u_drop__HAtcK",
            nav_games_load: "UserNavigation_nav_games_load__kQ7qe",
            text_grey: "UserNavigation_text_grey__6kMGT",
            nav_up: "UserNavigation_nav_up__xUow4",
            nav_down: "UserNavigation_nav_down__5no_Q",
            nav_playthroughs_load: "UserNavigation_nav_playthroughs_load__cafek",
            nav_profile_load: "UserNavigation_nav_profile_load__sm3px"
        }
    },
    17883: function(e) {
        e.exports = {
            search_tab: "SearchOptions_search_tab__iDtf_",
            search_genres: "SearchOptions_search_genres__aFYUz",
            search_options_button: "SearchOptions_search_options_button__Qbgn_",
            search_range_l: "SearchOptions_search_range_l__dk60A",
            search_range_r: "SearchOptions_search_range_r__L_VRK",
            random: "SearchOptions_random__RYN_I",
            search_title: "SearchOptions_search_title__83U9o",
            search_subtitle: "SearchOptions_search_subtitle__1W4vc",
            button: "SearchOptions_button__5EPTH",
            search_modifier: "SearchOptions_search_modifier__bhmmW",
            pagination: "SearchOptions_pagination__2_nRs",
            search_gamepass_toggle: "SearchOptions_search_gamepass_toggle__vKw54",
            search_general: "SearchOptions_search_general__HCJJj"
        }
    },
    29591: function(e) {
        e.exports = {
            user_avatar_image: "UserAvatar_user_avatar_image__awlk0"
        }
    },
    52805: function(e) {
        e.exports = {
            search_list: "UserCard_search_list__5BYkv",
            inside_blur: "UserCard_inside_blur__WD5Qq",
            search_list_image: "UserCard_search_list_image__R_Oyb",
            search_list_details: "UserCard_search_list_details__qIfxN",
            search_list_page: "UserCard_search_list_page__5BOJq",
            search_list_details_block: "UserCard_search_list_details_block__4bpG0",
            search_list_tidbit_short: "UserCard_search_list_tidbit_short__qs2jd",
            search_list_tidbit: "UserCard_search_list_tidbit__xlxIh",
            search_list_tidbit_long: "UserCard_search_list_tidbit_long__JJzjl"
        }
    },
    79694: function(e) {
        e.exports = {
            user_tools_label: "UserTools_user_tools_label__0giZT",
            user_tools_image: "UserTools_user_tools_image__9opk3",
            login: "UserTools_login___xMlM"
        }
    },
    56881: function(e) {
        e.exports = {
            collection_card: "CollectionObjectCard_collection_card__OydJa",
            headers: "CollectionObjectCard_headers__Tsj51",
            title: "CollectionObjectCard_title__M4Cu8",
            follows: "CollectionObjectCard_follows__rujij",
            collection_images: "CollectionObjectCard_collection_images___RZ9d",
            collection_card_details: "CollectionObjectCard_collection_card_details__OSVzC",
            collection_card_tidbit_short: "CollectionObjectCard_collection_card_tidbit_short__ii40_"
        }
    },
    52471: function(e) {
        e.exports = {
            user_game_main: "UserGameDetail_user_game_main__lFsAR",
            user_game_detail: "UserGameDetail_user_game_detail__uiofm",
            timestamp: "UserGameDetail_timestamp__BJOwY",
            youtube_video: "UserGameDetail_youtube_video__sEdgq"
        }
    },
    9008: function(e, t, n) {
        e.exports = n(7828)
    },
    25675: function(e, t, n) {
        e.exports = n(35666)
    },
    41664: function(e, t, n) {
        e.exports = n(89577)
    },
    11163: function(e, t, n) {
        e.exports = n(9090)
    },
    92703: function(e, t, n) {
        "use strict";
        var a = n(50414);
        function r() {}
        function i() {}
        i.resetWarningCache = r,
            e.exports = function() {
                function e(e, t, n, r, i, o) {
                    if (o !== a) {
                        var s = Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");
                        throw s.name = "Invariant Violation",
                            s
                    }
                }
                function t() {
                    return e
                }
                e.isRequired = e;
                var n = {
                    array: e,
                    bigint: e,
                    bool: e,
                    func: e,
                    number: e,
                    object: e,
                    string: e,
                    symbol: e,
                    any: e,
                    arrayOf: t,
                    element: e,
                    elementType: e,
                    instanceOf: t,
                    node: e,
                    objectOf: t,
                    oneOf: t,
                    oneOfType: t,
                    shape: t,
                    exact: t,
                    checkPropTypes: i,
                    resetWarningCache: r
                };
                return n.PropTypes = n,
                    n
            }
    },
    45697: function(e, t, n) {
        e.exports = n(92703)()
    },
    50414: function(e) {
        "use strict";
        e.exports = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"
    },
    25726: function(e, t, n) {
        "use strict";
        function a(e, t, n, a, r, i, o) {
            this.acceptsBooleans = 2 === t || 3 === t || 4 === t,
                this.attributeName = a,
                this.attributeNamespace = r,
                this.mustUseProperty = n,
                this.propertyName = e,
                this.type = t,
                this.sanitizeURL = i,
                this.removeEmptyString = o
        }
        let r = {};
        ["children", "dangerouslySetInnerHTML", "defaultValue", "defaultChecked", "innerHTML", "suppressContentEditableWarning", "suppressHydrationWarning", "style"].forEach(e => {
                r[e] = new a(e,0,!1,e,null,!1,!1)
            }
        ),
            [["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach( ([e,t]) => {
                    r[e] = new a(e,1,!1,t,null,!1,!1)
                }
            ),
            ["contentEditable", "draggable", "spellCheck", "value"].forEach(e => {
                    r[e] = new a(e,2,!1,e.toLowerCase(),null,!1,!1)
                }
            ),
            ["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(e => {
                    r[e] = new a(e,2,!1,e,null,!1,!1)
                }
            ),
            ["allowFullScreen", "async", "autoFocus", "autoPlay", "controls", "default", "defer", "disabled", "disablePictureInPicture", "disableRemotePlayback", "formNoValidate", "hidden", "loop", "noModule", "noValidate", "open", "playsInline", "readOnly", "required", "reversed", "scoped", "seamless", "itemScope"].forEach(e => {
                    r[e] = new a(e,3,!1,e.toLowerCase(),null,!1,!1)
                }
            ),
            ["checked", "multiple", "muted", "selected"].forEach(e => {
                    r[e] = new a(e,3,!0,e,null,!1,!1)
                }
            ),
            ["capture", "download"].forEach(e => {
                    r[e] = new a(e,4,!1,e,null,!1,!1)
                }
            ),
            ["cols", "rows", "size", "span"].forEach(e => {
                    r[e] = new a(e,6,!1,e,null,!1,!1)
                }
            ),
            ["rowSpan", "start"].forEach(e => {
                    r[e] = new a(e,5,!1,e.toLowerCase(),null,!1,!1)
                }
            );
        let i = /[\-\:]([a-z])/g
            , o = e => e[1].toUpperCase();
        ["accent-height", "alignment-baseline", "arabic-form", "baseline-shift", "cap-height", "clip-path", "clip-rule", "color-interpolation", "color-interpolation-filters", "color-profile", "color-rendering", "dominant-baseline", "enable-background", "fill-opacity", "fill-rule", "flood-color", "flood-opacity", "font-family", "font-size", "font-size-adjust", "font-stretch", "font-style", "font-variant", "font-weight", "glyph-name", "glyph-orientation-horizontal", "glyph-orientation-vertical", "horiz-adv-x", "horiz-origin-x", "image-rendering", "letter-spacing", "lighting-color", "marker-end", "marker-mid", "marker-start", "overline-position", "overline-thickness", "paint-order", "panose-1", "pointer-events", "rendering-intent", "shape-rendering", "stop-color", "stop-opacity", "strikethrough-position", "strikethrough-thickness", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke-width", "text-anchor", "text-decoration", "text-rendering", "underline-position", "underline-thickness", "unicode-bidi", "unicode-range", "units-per-em", "v-alphabetic", "v-hanging", "v-ideographic", "v-mathematical", "vector-effect", "vert-adv-y", "vert-origin-x", "vert-origin-y", "word-spacing", "writing-mode", "xmlns:xlink", "x-height"].forEach(e => {
                let t = e.replace(i, o);
                r[t] = new a(t,1,!1,e,null,!1,!1)
            }
        ),
            ["xlink:actuate", "xlink:arcrole", "xlink:role", "xlink:show", "xlink:title", "xlink:type"].forEach(e => {
                    let t = e.replace(i, o);
                    r[t] = new a(t,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)
                }
            ),
            ["xml:base", "xml:lang", "xml:space"].forEach(e => {
                    let t = e.replace(i, o);
                    r[t] = new a(t,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)
                }
            ),
            ["tabIndex", "crossOrigin"].forEach(e => {
                    r[e] = new a(e,1,!1,e.toLowerCase(),null,!1,!1)
                }
            ),
            r.xlinkHref = new a("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1),
            ["src", "href", "action", "formAction"].forEach(e => {
                    r[e] = new a(e,1,!1,e.toLowerCase(),null,!0,!0)
                }
            );
        let {CAMELCASE: s, SAME: l, possibleStandardNames: c} = n(78229)
            , u = RegExp.prototype.test.bind(RegExp("^(data|aria)-[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"))
            , d = Object.keys(c).reduce( (e, t) => {
                let n = c[t];
                return n === l ? e[t] = t : n === s ? e[t.toLowerCase()] = t : e[t] = n,
                    e
            }
            , {});
        t.BOOLEAN = 3,
            t.BOOLEANISH_STRING = 2,
            t.NUMERIC = 5,
            t.OVERLOADED_BOOLEAN = 4,
            t.POSITIVE_NUMERIC = 6,
            t.RESERVED = 0,
            t.STRING = 1,
            t.getPropertyInfo = function(e) {
                return r.hasOwnProperty(e) ? r[e] : null
            }
            ,
            t.isCustomAttribute = u,
            t.possibleStandardNames = d
    },
    78229: function(e, t) {
        t.SAME = 0,
            t.CAMELCASE = 1,
            t.possibleStandardNames = {
                accept: 0,
                acceptCharset: 1,
                "accept-charset": "acceptCharset",
                accessKey: 1,
                action: 0,
                allowFullScreen: 1,
                alt: 0,
                as: 0,
                async: 0,
                autoCapitalize: 1,
                autoComplete: 1,
                autoCorrect: 1,
                autoFocus: 1,
                autoPlay: 1,
                autoSave: 1,
                capture: 0,
                cellPadding: 1,
                cellSpacing: 1,
                challenge: 0,
                charSet: 1,
                checked: 0,
                children: 0,
                cite: 0,
                class: "className",
                classID: 1,
                className: 1,
                cols: 0,
                colSpan: 1,
                content: 0,
                contentEditable: 1,
                contextMenu: 1,
                controls: 0,
                controlsList: 1,
                coords: 0,
                crossOrigin: 1,
                dangerouslySetInnerHTML: 1,
                data: 0,
                dateTime: 1,
                default: 0,
                defaultChecked: 1,
                defaultValue: 1,
                defer: 0,
                dir: 0,
                disabled: 0,
                disablePictureInPicture: 1,
                disableRemotePlayback: 1,
                download: 0,
                draggable: 0,
                encType: 1,
                enterKeyHint: 1,
                for: "htmlFor",
                form: 0,
                formMethod: 1,
                formAction: 1,
                formEncType: 1,
                formNoValidate: 1,
                formTarget: 1,
                frameBorder: 1,
                headers: 0,
                height: 0,
                hidden: 0,
                high: 0,
                href: 0,
                hrefLang: 1,
                htmlFor: 1,
                httpEquiv: 1,
                "http-equiv": "httpEquiv",
                icon: 0,
                id: 0,
                innerHTML: 1,
                inputMode: 1,
                integrity: 0,
                is: 0,
                itemID: 1,
                itemProp: 1,
                itemRef: 1,
                itemScope: 1,
                itemType: 1,
                keyParams: 1,
                keyType: 1,
                kind: 0,
                label: 0,
                lang: 0,
                list: 0,
                loop: 0,
                low: 0,
                manifest: 0,
                marginWidth: 1,
                marginHeight: 1,
                max: 0,
                maxLength: 1,
                media: 0,
                mediaGroup: 1,
                method: 0,
                min: 0,
                minLength: 1,
                multiple: 0,
                muted: 0,
                name: 0,
                noModule: 1,
                nonce: 0,
                noValidate: 1,
                open: 0,
                optimum: 0,
                pattern: 0,
                placeholder: 0,
                playsInline: 1,
                poster: 0,
                preload: 0,
                profile: 0,
                radioGroup: 1,
                readOnly: 1,
                referrerPolicy: 1,
                rel: 0,
                required: 0,
                reversed: 0,
                role: 0,
                rows: 0,
                rowSpan: 1,
                sandbox: 0,
                scope: 0,
                scoped: 0,
                scrolling: 0,
                seamless: 0,
                selected: 0,
                shape: 0,
                size: 0,
                sizes: 0,
                span: 0,
                spellCheck: 1,
                src: 0,
                srcDoc: 1,
                srcLang: 1,
                srcSet: 1,
                start: 0,
                step: 0,
                style: 0,
                summary: 0,
                tabIndex: 1,
                target: 0,
                title: 0,
                type: 0,
                useMap: 1,
                value: 0,
                width: 0,
                wmode: 0,
                wrap: 0,
                about: 0,
                accentHeight: 1,
                "accent-height": "accentHeight",
                accumulate: 0,
                additive: 0,
                alignmentBaseline: 1,
                "alignment-baseline": "alignmentBaseline",
                allowReorder: 1,
                alphabetic: 0,
                amplitude: 0,
                arabicForm: 1,
                "arabic-form": "arabicForm",
                ascent: 0,
                attributeName: 1,
                attributeType: 1,
                autoReverse: 1,
                azimuth: 0,
                baseFrequency: 1,
                baselineShift: 1,
                "baseline-shift": "baselineShift",
                baseProfile: 1,
                bbox: 0,
                begin: 0,
                bias: 0,
                by: 0,
                calcMode: 1,
                capHeight: 1,
                "cap-height": "capHeight",
                clip: 0,
                clipPath: 1,
                "clip-path": "clipPath",
                clipPathUnits: 1,
                clipRule: 1,
                "clip-rule": "clipRule",
                color: 0,
                colorInterpolation: 1,
                "color-interpolation": "colorInterpolation",
                colorInterpolationFilters: 1,
                "color-interpolation-filters": "colorInterpolationFilters",
                colorProfile: 1,
                "color-profile": "colorProfile",
                colorRendering: 1,
                "color-rendering": "colorRendering",
                contentScriptType: 1,
                contentStyleType: 1,
                cursor: 0,
                cx: 0,
                cy: 0,
                d: 0,
                datatype: 0,
                decelerate: 0,
                descent: 0,
                diffuseConstant: 1,
                direction: 0,
                display: 0,
                divisor: 0,
                dominantBaseline: 1,
                "dominant-baseline": "dominantBaseline",
                dur: 0,
                dx: 0,
                dy: 0,
                edgeMode: 1,
                elevation: 0,
                enableBackground: 1,
                "enable-background": "enableBackground",
                end: 0,
                exponent: 0,
                externalResourcesRequired: 1,
                fill: 0,
                fillOpacity: 1,
                "fill-opacity": "fillOpacity",
                fillRule: 1,
                "fill-rule": "fillRule",
                filter: 0,
                filterRes: 1,
                filterUnits: 1,
                floodOpacity: 1,
                "flood-opacity": "floodOpacity",
                floodColor: 1,
                "flood-color": "floodColor",
                focusable: 0,
                fontFamily: 1,
                "font-family": "fontFamily",
                fontSize: 1,
                "font-size": "fontSize",
                fontSizeAdjust: 1,
                "font-size-adjust": "fontSizeAdjust",
                fontStretch: 1,
                "font-stretch": "fontStretch",
                fontStyle: 1,
                "font-style": "fontStyle",
                fontVariant: 1,
                "font-variant": "fontVariant",
                fontWeight: 1,
                "font-weight": "fontWeight",
                format: 0,
                from: 0,
                fx: 0,
                fy: 0,
                g1: 0,
                g2: 0,
                glyphName: 1,
                "glyph-name": "glyphName",
                glyphOrientationHorizontal: 1,
                "glyph-orientation-horizontal": "glyphOrientationHorizontal",
                glyphOrientationVertical: 1,
                "glyph-orientation-vertical": "glyphOrientationVertical",
                glyphRef: 1,
                gradientTransform: 1,
                gradientUnits: 1,
                hanging: 0,
                horizAdvX: 1,
                "horiz-adv-x": "horizAdvX",
                horizOriginX: 1,
                "horiz-origin-x": "horizOriginX",
                ideographic: 0,
                imageRendering: 1,
                "image-rendering": "imageRendering",
                in2: 0,
                in: 0,
                inlist: 0,
                intercept: 0,
                k1: 0,
                k2: 0,
                k3: 0,
                k4: 0,
                k: 0,
                kernelMatrix: 1,
                kernelUnitLength: 1,
                kerning: 0,
                keyPoints: 1,
                keySplines: 1,
                keyTimes: 1,
                lengthAdjust: 1,
                letterSpacing: 1,
                "letter-spacing": "letterSpacing",
                lightingColor: 1,
                "lighting-color": "lightingColor",
                limitingConeAngle: 1,
                local: 0,
                markerEnd: 1,
                "marker-end": "markerEnd",
                markerHeight: 1,
                markerMid: 1,
                "marker-mid": "markerMid",
                markerStart: 1,
                "marker-start": "markerStart",
                markerUnits: 1,
                markerWidth: 1,
                mask: 0,
                maskContentUnits: 1,
                maskUnits: 1,
                mathematical: 0,
                mode: 0,
                numOctaves: 1,
                offset: 0,
                opacity: 0,
                operator: 0,
                order: 0,
                orient: 0,
                orientation: 0,
                origin: 0,
                overflow: 0,
                overlinePosition: 1,
                "overline-position": "overlinePosition",
                overlineThickness: 1,
                "overline-thickness": "overlineThickness",
                paintOrder: 1,
                "paint-order": "paintOrder",
                panose1: 0,
                "panose-1": "panose1",
                pathLength: 1,
                patternContentUnits: 1,
                patternTransform: 1,
                patternUnits: 1,
                pointerEvents: 1,
                "pointer-events": "pointerEvents",
                points: 0,
                pointsAtX: 1,
                pointsAtY: 1,
                pointsAtZ: 1,
                prefix: 0,
                preserveAlpha: 1,
                preserveAspectRatio: 1,
                primitiveUnits: 1,
                property: 0,
                r: 0,
                radius: 0,
                refX: 1,
                refY: 1,
                renderingIntent: 1,
                "rendering-intent": "renderingIntent",
                repeatCount: 1,
                repeatDur: 1,
                requiredExtensions: 1,
                requiredFeatures: 1,
                resource: 0,
                restart: 0,
                result: 0,
                results: 0,
                rotate: 0,
                rx: 0,
                ry: 0,
                scale: 0,
                security: 0,
                seed: 0,
                shapeRendering: 1,
                "shape-rendering": "shapeRendering",
                slope: 0,
                spacing: 0,
                specularConstant: 1,
                specularExponent: 1,
                speed: 0,
                spreadMethod: 1,
                startOffset: 1,
                stdDeviation: 1,
                stemh: 0,
                stemv: 0,
                stitchTiles: 1,
                stopColor: 1,
                "stop-color": "stopColor",
                stopOpacity: 1,
                "stop-opacity": "stopOpacity",
                strikethroughPosition: 1,
                "strikethrough-position": "strikethroughPosition",
                strikethroughThickness: 1,
                "strikethrough-thickness": "strikethroughThickness",
                string: 0,
                stroke: 0,
                strokeDasharray: 1,
                "stroke-dasharray": "strokeDasharray",
                strokeDashoffset: 1,
                "stroke-dashoffset": "strokeDashoffset",
                strokeLinecap: 1,
                "stroke-linecap": "strokeLinecap",
                strokeLinejoin: 1,
                "stroke-linejoin": "strokeLinejoin",
                strokeMiterlimit: 1,
                "stroke-miterlimit": "strokeMiterlimit",
                strokeWidth: 1,
                "stroke-width": "strokeWidth",
                strokeOpacity: 1,
                "stroke-opacity": "strokeOpacity",
                suppressContentEditableWarning: 1,
                suppressHydrationWarning: 1,
                surfaceScale: 1,
                systemLanguage: 1,
                tableValues: 1,
                targetX: 1,
                targetY: 1,
                textAnchor: 1,
                "text-anchor": "textAnchor",
                textDecoration: 1,
                "text-decoration": "textDecoration",
                textLength: 1,
                textRendering: 1,
                "text-rendering": "textRendering",
                to: 0,
                transform: 0,
                typeof: 0,
                u1: 0,
                u2: 0,
                underlinePosition: 1,
                "underline-position": "underlinePosition",
                underlineThickness: 1,
                "underline-thickness": "underlineThickness",
                unicode: 0,
                unicodeBidi: 1,
                "unicode-bidi": "unicodeBidi",
                unicodeRange: 1,
                "unicode-range": "unicodeRange",
                unitsPerEm: 1,
                "units-per-em": "unitsPerEm",
                unselectable: 0,
                vAlphabetic: 1,
                "v-alphabetic": "vAlphabetic",
                values: 0,
                vectorEffect: 1,
                "vector-effect": "vectorEffect",
                version: 0,
                vertAdvY: 1,
                "vert-adv-y": "vertAdvY",
                vertOriginX: 1,
                "vert-origin-x": "vertOriginX",
                vertOriginY: 1,
                "vert-origin-y": "vertOriginY",
                vHanging: 1,
                "v-hanging": "vHanging",
                vIdeographic: 1,
                "v-ideographic": "vIdeographic",
                viewBox: 1,
                viewTarget: 1,
                visibility: 0,
                vMathematical: 1,
                "v-mathematical": "vMathematical",
                vocab: 0,
                widths: 0,
                wordSpacing: 1,
                "word-spacing": "wordSpacing",
                writingMode: 1,
                "writing-mode": "writingMode",
                x1: 0,
                x2: 0,
                x: 0,
                xChannelSelector: 1,
                xHeight: 1,
                "x-height": "xHeight",
                xlinkActuate: 1,
                "xlink:actuate": "xlinkActuate",
                xlinkArcrole: 1,
                "xlink:arcrole": "xlinkArcrole",
                xlinkHref: 1,
                "xlink:href": "xlinkHref",
                xlinkRole: 1,
                "xlink:role": "xlinkRole",
                xlinkShow: 1,
                "xlink:show": "xlinkShow",
                xlinkTitle: 1,
                "xlink:title": "xlinkTitle",
                xlinkType: 1,
                "xlink:type": "xlinkType",
                xmlBase: 1,
                "xml:base": "xmlBase",
                xmlLang: 1,
                "xml:lang": "xmlLang",
                xmlns: 0,
                "xml:space": "xmlSpace",
                xmlnsXlink: 1,
                "xmlns:xlink": "xmlnsXlink",
                xmlSpace: 1,
                y1: 0,
                y2: 0,
                y: 0,
                yChannelSelector: 1,
                z: 0,
                zoomAndPan: 1
            }
    },
    41476: function(e, t, n) {
        "use strict";
        var a = (this && this.__importDefault || function(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }
        )(n(5174))
            , r = n(26678);
        function i(e, t) {
            var n = {};
            return e && "string" == typeof e && (0,
                a.default)(e, function(e, a) {
                e && a && (n[(0,
                    r.camelCase)(e, t)] = a)
            }),
                n
        }
        i.default = i,
            e.exports = i
    },
    26678: function(e, t) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
            t.camelCase = void 0;
        var n = /^--[a-zA-Z0-9-]+$/
            , a = /-([a-z])/g
            , r = /^[^-]+$/
            , i = /^-(webkit|moz|ms|o|khtml)-/
            , o = /^-(ms)-/
            , s = function(e, t) {
            return t.toUpperCase()
        }
            , l = function(e, t) {
            return "".concat(t, "-")
        };
        t.camelCase = function(e, t) {
            var c;
            return (void 0 === t && (t = {}),
            !(c = e) || r.test(c) || n.test(c)) ? e : (e = e.toLowerCase(),
                (e = t.reactCompat ? e.replace(o, l) : e.replace(i, l)).replace(a, s))
        }
    },
    5174: function(e, t, n) {
        "use strict";
        var a = this && this.__importDefault || function(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }
        ;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
            t.default = function(e, t) {
                var n = null;
                if (!e || "string" != typeof e)
                    return n;
                var a = (0,
                    r.default)(e)
                    , i = "function" == typeof t;
                return a.forEach(function(e) {
                    if ("declaration" === e.type) {
                        var a = e.property
                            , r = e.value;
                        i ? t(a, r, e) : r && ((n = n || {})[a] = r)
                    }
                }),
                    n
            }
        ;
        var r = a(n(18139))
    },
    24697: function(e, t, n) {
        "use strict";
        n.d(t, {
            y1: function() {
                return r
            }
        });
        var a = n(67294);
        function r(e, t, n) {
            var r = this
                , i = (0,
                a.useRef)(null)
                , o = (0,
                a.useRef)(0)
                , s = (0,
                a.useRef)(null)
                , l = (0,
                a.useRef)([])
                , c = (0,
                a.useRef)()
                , u = (0,
                a.useRef)()
                , d = (0,
                a.useRef)(e)
                , m = (0,
                a.useRef)(!0);
            d.current = e;
            var h = "undefined" != typeof window
                , p = !t && 0 !== t && h;
            if ("function" != typeof e)
                throw TypeError("Expected a function");
            t = +t || 0;
            var f = !!(n = n || {}).leading
                , _ = !("trailing"in n) || !!n.trailing
                , g = "maxWait"in n
                , v = "debounceOnServer"in n && !!n.debounceOnServer
                , x = g ? Math.max(+n.maxWait || 0, t) : null;
            return (0,
                a.useEffect)(function() {
                return m.current = !0,
                    function() {
                        m.current = !1
                    }
            }, []),
                (0,
                    a.useMemo)(function() {
                    var e = function(e) {
                        var t = l.current
                            , n = c.current;
                        return l.current = c.current = null,
                            o.current = e,
                            u.current = d.current.apply(n, t)
                    }
                        , n = function(e, t) {
                        p && cancelAnimationFrame(s.current),
                            s.current = p ? requestAnimationFrame(e) : setTimeout(e, t)
                    }
                        , a = function(e) {
                        if (!m.current)
                            return !1;
                        var n = e - i.current;
                        return !i.current || n >= t || n < 0 || g && e - o.current >= x
                    }
                        , b = function(t) {
                        return s.current = null,
                            _ && l.current ? e(t) : (l.current = c.current = null,
                                u.current)
                    }
                        , y = function e() {
                        var r = Date.now();
                        if (a(r))
                            return b(r);
                        if (m.current) {
                            var s = t - (r - i.current);
                            n(e, g ? Math.min(s, x - (r - o.current)) : s)
                        }
                    }
                        , j = function() {
                        if (h || v) {
                            var d = Date.now()
                                , p = a(d);
                            if (l.current = [].slice.call(arguments),
                                c.current = r,
                                i.current = d,
                                p) {
                                if (!s.current && m.current)
                                    return o.current = i.current,
                                        n(y, t),
                                        f ? e(i.current) : u.current;
                                if (g)
                                    return n(y, t),
                                        e(i.current)
                            }
                            return s.current || n(y, t),
                                u.current
                        }
                    };
                    return j.cancel = function() {
                        s.current && (p ? cancelAnimationFrame(s.current) : clearTimeout(s.current)),
                            o.current = 0,
                            l.current = i.current = c.current = s.current = null
                    }
                        ,
                        j.isPending = function() {
                            return !!s.current
                        }
                        ,
                        j.flush = function() {
                            return s.current ? b(Date.now()) : u.current
                        }
                        ,
                        j
                }, [f, g, t, x, _, p, h, v])
        }
    },
    93967: function(e, t) {
        var n;
        !function() {
            "use strict";
            var a = {}.hasOwnProperty;
            function r() {
                for (var e = "", t = 0; t < arguments.length; t++) {
                    var n = arguments[t];
                    n && (e = i(e, function(e) {
                        if ("string" == typeof e || "number" == typeof e)
                            return e;
                        if ("object" != typeof e)
                            return "";
                        if (Array.isArray(e))
                            return r.apply(null, e);
                        if (e.toString !== Object.prototype.toString && !e.toString.toString().includes("[native code]"))
                            return e.toString();
                        var t = "";
                        for (var n in e)
                            a.call(e, n) && e[n] && (t = i(t, n));
                        return t
                    }(n)))
                }
                return e
            }
            function i(e, t) {
                return t ? e ? e + " " + t : e + t : e
            }
            e.exports ? (r.default = r,
                e.exports = r) : void 0 !== (n = (function() {
                    return r
                }
            ).apply(t, [])) && (e.exports = n)
        }()
    },
    1571: function(e, t, n) {
        "use strict";
        n.d(t, {
            F: function() {
                return c
            },
            f: function() {
                return u
            }
        });
        var a = n(67294)
            , r = ["light", "dark"]
            , i = "(prefers-color-scheme: dark)"
            , o = "undefined" == typeof window
            , s = a.createContext(void 0)
            , l = {
            setTheme: e => {}
            ,
            themes: []
        }
            , c = () => {
            var e;
            return null != (e = a.useContext(s)) ? e : l
        }
            , u = e => a.useContext(s) ? e.children : a.createElement(m, {
            ...e
        })
            , d = ["light", "dark"]
            , m = ({forcedTheme: e, disableTransitionOnChange: t=!1, enableSystem: n=!0, enableColorScheme: o=!0, storageKey: l="theme", themes: c=d, defaultTheme: u=n ? "system" : "light", attribute: m="data-theme", value: g, children: v, nonce: x}) => {
            let[b,y] = a.useState( () => p(l, u))
                , [j,N] = a.useState( () => p(l))
                , k = g ? Object.values(g) : c
                , w = a.useCallback(e => {
                    let a = e;
                    if (!a)
                        return;
                    "system" === e && n && (a = _());
                    let i = g ? g[a] : a
                        , s = t ? f() : null
                        , l = document.documentElement;
                    if ("class" === m ? (l.classList.remove(...k),
                    i && l.classList.add(i)) : i ? l.setAttribute(m, i) : l.removeAttribute(m),
                        o) {
                        let e = r.includes(u) ? u : null
                            , t = r.includes(a) ? a : e;
                        l.style.colorScheme = t
                    }
                    null == s || s()
                }
                , [])
                , S = a.useCallback(e => {
                    let t = "function" == typeof e ? e(e) : e;
                    y(t);
                    try {
                        localStorage.setItem(l, t)
                    } catch (e) {}
                }
                , [e])
                , C = a.useCallback(t => {
                    N(_(t)),
                    "system" === b && n && !e && w("system")
                }
                , [b, e]);
            a.useEffect( () => {
                    let e = window.matchMedia(i);
                    return e.addListener(C),
                        C(e),
                        () => e.removeListener(C)
                }
                , [C]),
                a.useEffect( () => {
                        let e = e => {
                                e.key === l && S(e.newValue || u)
                            }
                        ;
                        return window.addEventListener("storage", e),
                            () => window.removeEventListener("storage", e)
                    }
                    , [S]),
                a.useEffect( () => {
                        w(null != e ? e : b)
                    }
                    , [e, b]);
            let T = a.useMemo( () => ({
                theme: b,
                setTheme: S,
                forcedTheme: e,
                resolvedTheme: "system" === b ? j : b,
                themes: n ? [...c, "system"] : c,
                systemTheme: n ? j : void 0
            }), [b, S, e, j, n, c]);
            return a.createElement(s.Provider, {
                value: T
            }, a.createElement(h, {
                forcedTheme: e,
                disableTransitionOnChange: t,
                enableSystem: n,
                enableColorScheme: o,
                storageKey: l,
                themes: c,
                defaultTheme: u,
                attribute: m,
                value: g,
                children: v,
                attrs: k,
                nonce: x
            }), v)
        }
            , h = a.memo( ({forcedTheme: e, storageKey: t, attribute: n, enableSystem: o, enableColorScheme: s, defaultTheme: l, value: c, attrs: u, nonce: d}) => {
                let m = "system" === l
                    , h = "class" === n ? `var d=document.documentElement,c=d.classList;c.remove(${u.map(e => `'${e}'`).join(",")});` : `var d=document.documentElement,n='${n}',s='setAttribute';`
                    , p = s ? (r.includes(l) ? l : null) ? `if(e==='light'||e==='dark'||!e)d.style.colorScheme=e||'${l}'` : "if(e==='light'||e==='dark')d.style.colorScheme=e" : ""
                    , f = (e, t=!1, a=!0) => {
                    let i = c ? c[e] : e
                        , o = t ? e + "|| ''" : `'${i}'`
                        , l = "";
                    return s && a && !t && r.includes(e) && (l += `d.style.colorScheme = '${e}';`),
                        "class" === n ? t || i ? l += `c.add(${o})` : l += "null" : i && (l += `d[s](n,${o})`),
                        l
                }
                    , _ = e ? `!function(){${h}${f(e)}}()` : o ? `!function(){try{${h}var e=localStorage.getItem('${t}');if('system'===e||(!e&&${m})){var t='${i}',m=window.matchMedia(t);if(m.media!==t||m.matches){${f("dark")}}else{${f("light")}}}else if(e){${c ? `var x=${JSON.stringify(c)};` : ""}${f(c ? "x[e]" : "e", !0)}}${m ? "" : "else{" + f(l, !1, !1) + "}"}${p}}catch(e){}}()` : `!function(){try{${h}var e=localStorage.getItem('${t}');if(e){${c ? `var x=${JSON.stringify(c)};` : ""}${f(c ? "x[e]" : "e", !0)}}else{${f(l, !1, !1)};}${p}}catch(t){}}();`;
                return a.createElement("script", {
                    nonce: d,
                    dangerouslySetInnerHTML: {
                        __html: _
                    }
                })
            }
        )
            , p = (e, t) => {
            let n;
            if (!o) {
                try {
                    n = localStorage.getItem(e) || void 0
                } catch (e) {}
                return n || t
            }
        }
            , f = () => {
            let e = document.createElement("style");
            return e.appendChild(document.createTextNode("*{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}")),
                document.head.appendChild(e),
                () => {
                    window.getComputedStyle(document.body),
                        setTimeout( () => {
                                document.head.removeChild(e)
                            }
                            , 1)
                }
        }
            , _ = e => (e || (e = window.matchMedia(i)),
            e.matches ? "dark" : "light")
    }
}, function(e) {
    var t = function(t) {
        return e(e.s = t)
    };
    e.O(0, [9774, 179], function() {
        return t(91118),
            t(9090)
    }),
        _N_E = e.O()
}
]);
