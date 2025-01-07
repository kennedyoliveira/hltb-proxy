(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([[636], {
    45413: (e, t) => {
        "use strict";
        var n;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
            t.Doctype = t.CDATA = t.Tag = t.Style = t.Script = t.Comment = t.Directive = t.Text = t.Root = t.isTag = t.ElementType = void 0,
            function(e) {
                e.Root = "root",
                    e.Text = "text",
                    e.Directive = "directive",
                    e.Comment = "comment",
                    e.Script = "script",
                    e.Style = "style",
                    e.Tag = "tag",
                    e.CDATA = "cdata",
                    e.Doctype = "doctype"
            }(n = t.ElementType || (t.ElementType = {})),
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
    }
    ,
    41141: function(e, t, n) {
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
        var i = n(45413)
            , s = n(36957);
        r(n(36957), t);
        var o = {
            withStartIndices: !1,
            withEndIndices: !1,
            xmlMode: !1
        }
            , l = function() {
            function e(e, t, n) {
                this.dom = [],
                    this.root = new s.Document(this.dom),
                    this.done = !1,
                    this.tagStack = [this.root],
                    this.lastNode = null,
                    this.parser = null,
                "function" == typeof t && (n = t,
                    t = o),
                "object" == typeof e && (t = e,
                    e = void 0),
                    this.callback = null != e ? e : null,
                    this.options = null != t ? t : o,
                    this.elementCB = null != n ? n : null
            }
            return e.prototype.onparserinit = function(e) {
                this.parser = e
            }
                ,
                e.prototype.onreset = function() {
                    this.dom = [],
                        this.root = new s.Document(this.dom),
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
                        , a = new s.Element(e,t,void 0,n);
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
                        var n = new s.Text(e);
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
                    var t = new s.Comment(e);
                    this.addNode(t),
                        this.lastNode = t
                }
                ,
                e.prototype.oncommentend = function() {
                    this.lastNode = null
                }
                ,
                e.prototype.oncdatastart = function() {
                    var e = new s.Text("")
                        , t = new s.CDATA([e]);
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
                    var n = new s.ProcessingInstruction(e,t);
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
    36957: function(e, t, n) {
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
        var s = n(45413)
            , o = function() {
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
        t.Node = o;
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
        }(o);
        t.DataNode = l;
        var c = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.type = s.ElementType.Text,
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
        var d = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.type = s.ElementType.Comment,
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
        t.Comment = d;
        var u = function(e) {
            function t(t, n) {
                var a = e.call(this, n) || this;
                return a.name = t,
                    a.type = s.ElementType.Directive,
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
        t.ProcessingInstruction = u;
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
        }(o);
        t.NodeWithChildren = m;
        var h = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.type = s.ElementType.CDATA,
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
                return t.type = s.ElementType.Root,
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
                void 0 === r && (r = "script" === t ? s.ElementType.Script : "style" === t ? s.ElementType.Style : s.ElementType.Tag);
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
                s.isTag)(e)
        }
        function g(e) {
            return e.type === s.ElementType.CDATA
        }
        function v(e) {
            return e.type === s.ElementType.Text
        }
        function x(e) {
            return e.type === s.ElementType.Comment
        }
        function b(e) {
            return e.type === s.ElementType.Directive
        }
        function y(e) {
            return e.type === s.ElementType.Root
        }
        function j(e, t) {
            if (void 0 === t && (t = !1),
                v(e))
                n = new c(e.data);
            else if (x(e))
                n = new d(e.data);
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
                    , s = new h(a);
                a.forEach(function(e) {
                    return e.parent = s
                }),
                    n = s
            } else if (y(e)) {
                var a = t ? N(e.children) : []
                    , o = new p(a);
                a.forEach(function(e) {
                    return e.parent = o
                }),
                e["x-mode"] && (o["x-mode"] = e["x-mode"]),
                    n = o
            } else if (b(e)) {
                var l = new u(e.name,e.data);
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
    25454: e => {
        "use strict";
        let {entries: t, setPrototypeOf: n, isFrozen: a, getPrototypeOf: r, getOwnPropertyDescriptor: i} = Object
            , {freeze: s, seal: o, create: l} = Object
            , {apply: c, construct: d} = "undefined" != typeof Reflect && Reflect;
        s || (s = function(e) {
                return e
            }
        ),
        o || (o = function(e) {
                return e
            }
        ),
        c || (c = function(e, t, n) {
                return e.apply(t, n)
            }
        ),
        d || (d = function(e, t) {
                return new e(...t)
            }
        );
        let u = N(Array.prototype.forEach)
            , m = N(Array.prototype.pop)
            , h = N(Array.prototype.push)
            , p = N(String.prototype.toLowerCase)
            , f = N(String.prototype.toString)
            , _ = N(String.prototype.match)
            , g = N(String.prototype.replace)
            , v = N(String.prototype.indexOf)
            , x = N(String.prototype.trim)
            , b = N(Object.prototype.hasOwnProperty)
            , y = N(RegExp.prototype.test)
            , j = (X = TypeError,
                function() {
                    for (var e = arguments.length, t = Array(e), n = 0; n < e; n++)
                        t[n] = arguments[n];
                    return d(X, t)
                }
        );
        function N(e) {
            return function(t) {
                for (var n = arguments.length, a = Array(n > 1 ? n - 1 : 0), r = 1; r < n; r++)
                    a[r - 1] = arguments[r];
                return c(e, t, a)
            }
        }
        function w(e, t) {
            let r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : p;
            n && n(e, null);
            let i = t.length;
            for (; i--; ) {
                let n = t[i];
                if ("string" == typeof n) {
                    let e = r(n);
                    e !== n && (a(t) || (t[i] = e),
                        n = e)
                }
                e[n] = !0
            }
            return e
        }
        function k(e) {
            let n = l(null);
            for (let[a,r] of t(e))
                b(e, a) && (Array.isArray(r) ? n[a] = function(e) {
                    for (let t = 0; t < e.length; t++)
                        b(e, t) || (e[t] = null);
                    return e
                }(r) : r && "object" == typeof r && r.constructor === Object ? n[a] = k(r) : n[a] = r);
            return n
        }
        function S(e, t) {
            for (; null !== e; ) {
                let n = i(e, t);
                if (n) {
                    if (n.get)
                        return N(n.get);
                    if ("function" == typeof n.value)
                        return N(n.value)
                }
                e = r(e)
            }
            return function() {
                return null
            }
        }
        let C = s(["a", "abbr", "acronym", "address", "area", "article", "aside", "audio", "b", "bdi", "bdo", "big", "blink", "blockquote", "body", "br", "button", "canvas", "caption", "center", "cite", "code", "col", "colgroup", "content", "data", "datalist", "dd", "decorator", "del", "details", "dfn", "dialog", "dir", "div", "dl", "dt", "element", "em", "fieldset", "figcaption", "figure", "font", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "img", "input", "ins", "kbd", "label", "legend", "li", "main", "map", "mark", "marquee", "menu", "menuitem", "meter", "nav", "nobr", "ol", "optgroup", "option", "output", "p", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "section", "select", "shadow", "small", "source", "spacer", "span", "strike", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "tr", "track", "tt", "u", "ul", "var", "video", "wbr"])
            , T = s(["svg", "a", "altglyph", "altglyphdef", "altglyphitem", "animatecolor", "animatemotion", "animatetransform", "circle", "clippath", "defs", "desc", "ellipse", "filter", "font", "g", "glyph", "glyphref", "hkern", "image", "line", "lineargradient", "marker", "mask", "metadata", "mpath", "path", "pattern", "polygon", "polyline", "radialgradient", "rect", "stop", "style", "switch", "symbol", "text", "textpath", "title", "tref", "tspan", "view", "vkern"])
            , E = s(["feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feDropShadow", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence"])
            , A = s(["animate", "color-profile", "cursor", "discard", "font-face", "font-face-format", "font-face-name", "font-face-src", "font-face-uri", "foreignobject", "hatch", "hatchpath", "mesh", "meshgradient", "meshpatch", "meshrow", "missing-glyph", "script", "set", "solidcolor", "unknown", "use"])
            , P = s(["math", "menclose", "merror", "mfenced", "mfrac", "mglyph", "mi", "mlabeledtr", "mmultiscripts", "mn", "mo", "mover", "mpadded", "mphantom", "mroot", "mrow", "ms", "mspace", "msqrt", "mstyle", "msub", "msup", "msubsup", "mtable", "mtd", "mtext", "mtr", "munder", "munderover", "mprescripts"])
            , O = s(["maction", "maligngroup", "malignmark", "mlongdiv", "mscarries", "mscarry", "msgroup", "mstack", "msline", "msrow", "semantics", "annotation", "annotation-xml", "mprescripts", "none"])
            , M = s(["#text"])
            , R = s(["accept", "action", "align", "alt", "autocapitalize", "autocomplete", "autopictureinpicture", "autoplay", "background", "bgcolor", "border", "capture", "cellpadding", "cellspacing", "checked", "cite", "class", "clear", "color", "cols", "colspan", "controls", "controlslist", "coords", "crossorigin", "datetime", "decoding", "default", "dir", "disabled", "disablepictureinpicture", "disableremoteplayback", "download", "draggable", "enctype", "enterkeyhint", "face", "for", "headers", "height", "hidden", "high", "href", "hreflang", "id", "inputmode", "integrity", "ismap", "kind", "label", "lang", "list", "loading", "loop", "low", "max", "maxlength", "media", "method", "min", "minlength", "multiple", "muted", "name", "nonce", "noshade", "novalidate", "nowrap", "open", "optimum", "pattern", "placeholder", "playsinline", "popover", "popovertarget", "popovertargetaction", "poster", "preload", "pubdate", "radiogroup", "readonly", "rel", "required", "rev", "reversed", "role", "rows", "rowspan", "spellcheck", "scope", "selected", "shape", "size", "sizes", "span", "srclang", "start", "src", "srcset", "step", "style", "summary", "tabindex", "title", "translate", "type", "usemap", "valign", "value", "width", "wrap", "xmlns", "slot"])
            , I = s(["accent-height", "accumulate", "additive", "alignment-baseline", "amplitude", "ascent", "attributename", "attributetype", "azimuth", "basefrequency", "baseline-shift", "begin", "bias", "by", "class", "clip", "clippathunits", "clip-path", "clip-rule", "color", "color-interpolation", "color-interpolation-filters", "color-profile", "color-rendering", "cx", "cy", "d", "dx", "dy", "diffuseconstant", "direction", "display", "divisor", "dur", "edgemode", "elevation", "end", "exponent", "fill", "fill-opacity", "fill-rule", "filter", "filterunits", "flood-color", "flood-opacity", "font-family", "font-size", "font-size-adjust", "font-stretch", "font-style", "font-variant", "font-weight", "fx", "fy", "g1", "g2", "glyph-name", "glyphref", "gradientunits", "gradienttransform", "height", "href", "id", "image-rendering", "in", "in2", "intercept", "k", "k1", "k2", "k3", "k4", "kerning", "keypoints", "keysplines", "keytimes", "lang", "lengthadjust", "letter-spacing", "kernelmatrix", "kernelunitlength", "lighting-color", "local", "marker-end", "marker-mid", "marker-start", "markerheight", "markerunits", "markerwidth", "maskcontentunits", "maskunits", "max", "mask", "media", "method", "mode", "min", "name", "numoctaves", "offset", "operator", "opacity", "order", "orient", "orientation", "origin", "overflow", "paint-order", "path", "pathlength", "patterncontentunits", "patterntransform", "patternunits", "points", "preservealpha", "preserveaspectratio", "primitiveunits", "r", "rx", "ry", "radius", "refx", "refy", "repeatcount", "repeatdur", "restart", "result", "rotate", "scale", "seed", "shape-rendering", "slope", "specularconstant", "specularexponent", "spreadmethod", "startoffset", "stddeviation", "stitchtiles", "stop-color", "stop-opacity", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke", "stroke-width", "style", "surfacescale", "systemlanguage", "tabindex", "tablevalues", "targetx", "targety", "transform", "transform-origin", "text-anchor", "text-decoration", "text-rendering", "textlength", "type", "u1", "u2", "unicode", "values", "viewbox", "visibility", "version", "vert-adv-y", "vert-origin-x", "vert-origin-y", "width", "word-spacing", "wrap", "writing-mode", "xchannelselector", "ychannelselector", "x", "x1", "x2", "xmlns", "y", "y1", "y2", "z", "zoomandpan"])
            , D = s(["accent", "accentunder", "align", "bevelled", "close", "columnsalign", "columnlines", "columnspan", "denomalign", "depth", "dir", "display", "displaystyle", "encoding", "fence", "frame", "height", "href", "id", "largeop", "length", "linethickness", "lspace", "lquote", "mathbackground", "mathcolor", "mathsize", "mathvariant", "maxsize", "minsize", "movablelimits", "notation", "numalign", "open", "rowalign", "rowlines", "rowspacing", "rowspan", "rspace", "rquote", "scriptlevel", "scriptminsize", "scriptsizemultiplier", "selection", "separator", "separators", "stretchy", "subscriptshift", "supscriptshift", "symmetric", "voffset", "width", "xmlns"])
            , L = s(["xlink:href", "xml:id", "xlink:title", "xml:space", "xmlns:xlink"])
            , F = o(/\{\{[\w\W]*|[\w\W]*\}\}/gm)
            , G = o(/<%[\w\W]*|[\w\W]*%>/gm)
            , U = o(/\${[\w\W]*}/gm)
            , B = o(/^data-[\-\w.\u00B7-\uFFFF]/)
            , z = o(/^aria-[\-\w]+$/)
            , H = o(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i)
            , V = o(/^(?:\w+script|data):/i)
            , q = o(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g)
            , W = o(/^html$/i);
        var X, Y = Object.freeze({
            __proto__: null,
            ARIA_ATTR: z,
            ATTR_WHITESPACE: q,
            CUSTOM_ELEMENT: o(/^[a-z][.\w]*(-[.\w]+)+$/i),
            DATA_ATTR: B,
            DOCTYPE_NAME: W,
            ERB_EXPR: G,
            IS_ALLOWED_URI: H,
            IS_SCRIPT_OR_DATA: V,
            MUSTACHE_EXPR: F,
            TMPLIT_EXPR: U
        });
        let Q = {
            element: 1,
            text: 3,
            progressingInstruction: 7,
            comment: 8,
            document: 9
        }
            , J = function(e, t) {
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
        var Z = function e() {
            let n, a = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "undefined" == typeof window ? null : window, r = t => e(t);
            if (r.version = "3.2.1",
                r.removed = [],
            !a || !a.document || a.document.nodeType !== Q.document)
                return r.isSupported = !1,
                    r;
            let {document: i} = a
                , o = i
                , c = o.currentScript
                , {DocumentFragment: d, HTMLTemplateElement: N, Node: F, Element: G, NodeFilter: U, NamedNodeMap: B=a.NamedNodeMap || a.MozNamedAttrMap, HTMLFormElement: z, DOMParser: V, trustedTypes: q} = a
                , X = G.prototype
                , Z = S(X, "cloneNode")
                , K = S(X, "remove")
                , $ = S(X, "nextSibling")
                , ee = S(X, "childNodes")
                , et = S(X, "parentNode");
            if ("function" == typeof N) {
                let e = i.createElement("template");
                e.content && e.content.ownerDocument && (i = e.content.ownerDocument)
            }
            let en = ""
                , {implementation: ea, createNodeIterator: er, createDocumentFragment: ei, getElementsByTagName: es} = i
                , {importNode: eo} = o
                , el = {};
            r.isSupported = "function" == typeof t && "function" == typeof et && ea && void 0 !== ea.createHTMLDocument;
            let {MUSTACHE_EXPR: ec, ERB_EXPR: ed, TMPLIT_EXPR: eu, DATA_ATTR: em, ARIA_ATTR: eh, IS_SCRIPT_OR_DATA: ep, ATTR_WHITESPACE: ef, CUSTOM_ELEMENT: e_} = Y
                , {IS_ALLOWED_URI: eg} = Y
                , ev = null
                , ex = w({}, [...C, ...T, ...E, ...P, ...M])
                , eb = null
                , ey = w({}, [...R, ...I, ...D, ...L])
                , ej = Object.seal(l(null, {
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
                , ew = null
                , ek = !0
                , eS = !0
                , eC = !1
                , eT = !0
                , eE = !1
                , eA = !0
                , eP = !1
                , eO = !1
                , eM = !1
                , eR = !1
                , eI = !1
                , eD = !1
                , eL = !0
                , eF = !1
                , eG = !0
                , eU = !1
                , eB = {}
                , ez = null
                , eH = w({}, ["annotation-xml", "audio", "colgroup", "desc", "foreignobject", "head", "iframe", "math", "mi", "mn", "mo", "ms", "mtext", "noembed", "noframes", "noscript", "plaintext", "script", "style", "svg", "template", "thead", "title", "video", "xmp"])
                , eV = null
                , eq = w({}, ["audio", "video", "img", "source", "image", "track"])
                , eW = null
                , eX = w({}, ["alt", "class", "for", "id", "label", "name", "pattern", "placeholder", "role", "summary", "title", "value", "style", "xmlns"])
                , eY = "http://www.w3.org/1998/Math/MathML"
                , eQ = "http://www.w3.org/2000/svg"
                , eJ = "http://www.w3.org/1999/xhtml"
                , eZ = eJ
                , eK = !1
                , e$ = null
                , e0 = w({}, [eY, eQ, eJ], f)
                , e1 = w({}, ["mi", "mo", "mn", "ms", "mtext"])
                , e2 = w({}, ["annotation-xml"])
                , e4 = w({}, ["title", "style", "font", "a", "script"])
                , e3 = null
                , e5 = ["application/xhtml+xml", "text/html"]
                , e6 = null
                , e9 = null
                , e8 = i.createElement("form")
                , e7 = function(e) {
                return e instanceof RegExp || e instanceof Function
            }
                , te = function() {
                let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                if (!e9 || e9 !== e) {
                    if (e && "object" == typeof e || (e = {}),
                        e = k(e),
                        e6 = "application/xhtml+xml" === (e3 = -1 === e5.indexOf(e.PARSER_MEDIA_TYPE) ? "text/html" : e.PARSER_MEDIA_TYPE) ? f : p,
                        ev = b(e, "ALLOWED_TAGS") ? w({}, e.ALLOWED_TAGS, e6) : ex,
                        eb = b(e, "ALLOWED_ATTR") ? w({}, e.ALLOWED_ATTR, e6) : ey,
                        e$ = b(e, "ALLOWED_NAMESPACES") ? w({}, e.ALLOWED_NAMESPACES, f) : e0,
                        eW = b(e, "ADD_URI_SAFE_ATTR") ? w(k(eX), e.ADD_URI_SAFE_ATTR, e6) : eX,
                        eV = b(e, "ADD_DATA_URI_TAGS") ? w(k(eq), e.ADD_DATA_URI_TAGS, e6) : eq,
                        ez = b(e, "FORBID_CONTENTS") ? w({}, e.FORBID_CONTENTS, e6) : eH,
                        eN = b(e, "FORBID_TAGS") ? w({}, e.FORBID_TAGS, e6) : {},
                        ew = b(e, "FORBID_ATTR") ? w({}, e.FORBID_ATTR, e6) : {},
                        eB = !!b(e, "USE_PROFILES") && e.USE_PROFILES,
                        ek = !1 !== e.ALLOW_ARIA_ATTR,
                        eS = !1 !== e.ALLOW_DATA_ATTR,
                        eC = e.ALLOW_UNKNOWN_PROTOCOLS || !1,
                        eT = !1 !== e.ALLOW_SELF_CLOSE_IN_ATTR,
                        eE = e.SAFE_FOR_TEMPLATES || !1,
                        eA = !1 !== e.SAFE_FOR_XML,
                        eP = e.WHOLE_DOCUMENT || !1,
                        eR = e.RETURN_DOM || !1,
                        eI = e.RETURN_DOM_FRAGMENT || !1,
                        eD = e.RETURN_TRUSTED_TYPE || !1,
                        eM = e.FORCE_BODY || !1,
                        eL = !1 !== e.SANITIZE_DOM,
                        eF = e.SANITIZE_NAMED_PROPS || !1,
                        eG = !1 !== e.KEEP_CONTENT,
                        eU = e.IN_PLACE || !1,
                        eg = e.ALLOWED_URI_REGEXP || H,
                        eZ = e.NAMESPACE || eJ,
                        e1 = e.MATHML_TEXT_INTEGRATION_POINTS || e1,
                        e2 = e.HTML_INTEGRATION_POINTS || e2,
                        ej = e.CUSTOM_ELEMENT_HANDLING || {},
                    e.CUSTOM_ELEMENT_HANDLING && e7(e.CUSTOM_ELEMENT_HANDLING.tagNameCheck) && (ej.tagNameCheck = e.CUSTOM_ELEMENT_HANDLING.tagNameCheck),
                    e.CUSTOM_ELEMENT_HANDLING && e7(e.CUSTOM_ELEMENT_HANDLING.attributeNameCheck) && (ej.attributeNameCheck = e.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),
                    e.CUSTOM_ELEMENT_HANDLING && "boolean" == typeof e.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements && (ej.allowCustomizedBuiltInElements = e.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),
                    eE && (eS = !1),
                    eI && (eR = !0),
                    eB && (ev = w({}, M),
                        eb = [],
                    !0 === eB.html && (w(ev, C),
                        w(eb, R)),
                    !0 === eB.svg && (w(ev, T),
                        w(eb, I),
                        w(eb, L)),
                    !0 === eB.svgFilters && (w(ev, E),
                        w(eb, I),
                        w(eb, L)),
                    !0 === eB.mathMl && (w(ev, P),
                        w(eb, D),
                        w(eb, L))),
                    e.ADD_TAGS && (ev === ex && (ev = k(ev)),
                        w(ev, e.ADD_TAGS, e6)),
                    e.ADD_ATTR && (eb === ey && (eb = k(eb)),
                        w(eb, e.ADD_ATTR, e6)),
                    e.ADD_URI_SAFE_ATTR && w(eW, e.ADD_URI_SAFE_ATTR, e6),
                    e.FORBID_CONTENTS && (ez === eH && (ez = k(ez)),
                        w(ez, e.FORBID_CONTENTS, e6)),
                    eG && (ev["#text"] = !0),
                    eP && w(ev, ["html", "head", "body"]),
                    ev.table && (w(ev, ["tbody"]),
                        delete eN.tbody),
                        e.TRUSTED_TYPES_POLICY) {
                        if ("function" != typeof e.TRUSTED_TYPES_POLICY.createHTML)
                            throw j('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');
                        if ("function" != typeof e.TRUSTED_TYPES_POLICY.createScriptURL)
                            throw j('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');
                        en = (n = e.TRUSTED_TYPES_POLICY).createHTML("")
                    } else
                        void 0 === n && (n = J(q, c)),
                        null !== n && "string" == typeof en && (en = n.createHTML(""));
                    s && s(e),
                        e9 = e
                }
            }
                , tt = w({}, [...T, ...E, ...A])
                , tn = w({}, [...P, ...O])
                , ta = function(e) {
                let t = et(e);
                t && t.tagName || (t = {
                    namespaceURI: eZ,
                    tagName: "template"
                });
                let n = p(e.tagName)
                    , a = p(t.tagName);
                return !!e$[e.namespaceURI] && (e.namespaceURI === eQ ? t.namespaceURI === eJ ? "svg" === n : t.namespaceURI === eY ? "svg" === n && ("annotation-xml" === a || e1[a]) : !!tt[n] : e.namespaceURI === eY ? t.namespaceURI === eJ ? "math" === n : t.namespaceURI === eQ ? "math" === n && e2[a] : !!tn[n] : e.namespaceURI === eJ ? (t.namespaceURI !== eQ || !!e2[a]) && (t.namespaceURI !== eY || !!e1[a]) && !tn[n] && (e4[n] || !tt[n]) : "application/xhtml+xml" === e3 && !!e$[e.namespaceURI])
            }
                , tr = function(e) {
                h(r.removed, {
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
                    h(r.removed, {
                        attribute: t.getAttributeNode(e),
                        from: t
                    })
                } catch (e) {
                    h(r.removed, {
                        attribute: null,
                        from: t
                    })
                }
                if (t.removeAttribute(e),
                "is" === e && !eb[e]) {
                    if (eR || eI)
                        try {
                            tr(t)
                        } catch (e) {}
                    else
                        try {
                            t.setAttribute(e, "")
                        } catch (e) {}
                }
            }
                , ts = function(e) {
                let t = null
                    , a = null;
                if (eM)
                    e = "<remove></remove>" + e;
                else {
                    let t = _(e, /^[\r\n\t ]+/);
                    a = t && t[0]
                }
                "application/xhtml+xml" === e3 && eZ === eJ && (e = '<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>' + e + "</body></html>");
                let r = n ? n.createHTML(e) : e;
                if (eZ === eJ)
                    try {
                        t = new V().parseFromString(r, e3)
                    } catch (e) {}
                if (!t || !t.documentElement) {
                    t = ea.createDocument(eZ, "template", null);
                    try {
                        t.documentElement.innerHTML = eK ? en : r
                    } catch (e) {}
                }
                let s = t.body || t.documentElement;
                return (e && a && s.insertBefore(i.createTextNode(a), s.childNodes[0] || null),
                eZ === eJ) ? es.call(t, eP ? "html" : "body")[0] : eP ? t.documentElement : s
            }
                , to = function(e) {
                return er.call(e.ownerDocument || e, e, U.SHOW_ELEMENT | U.SHOW_COMMENT | U.SHOW_TEXT | U.SHOW_PROCESSING_INSTRUCTION | U.SHOW_CDATA_SECTION, null)
            }
                , tl = function(e) {
                return e instanceof z && ("string" != typeof e.nodeName || "string" != typeof e.textContent || "function" != typeof e.removeChild || !(e.attributes instanceof B) || "function" != typeof e.removeAttribute || "function" != typeof e.setAttribute || "string" != typeof e.namespaceURI || "function" != typeof e.insertBefore || "function" != typeof e.hasChildNodes)
            }
                , tc = function(e) {
                return "function" == typeof F && e instanceof F
            };
            function td(e, t, n) {
                el[e] && u(el[e], e => {
                        e.call(r, t, n, e9)
                    }
                )
            }
            let tu = function(e) {
                let t = null;
                if (td("beforeSanitizeElements", e, null),
                    tl(e))
                    return tr(e),
                        !0;
                let n = e6(e.nodeName);
                if (td("uponSanitizeElement", e, {
                    tagName: n,
                    allowedTags: ev
                }),
                e.hasChildNodes() && !tc(e.firstElementChild) && y(/<[/\w]/g, e.innerHTML) && y(/<[/\w]/g, e.textContent) || e.nodeType === Q.progressingInstruction || eA && e.nodeType === Q.comment && y(/<[/\w]/g, e.data))
                    return tr(e),
                        !0;
                if (!ev[n] || eN[n]) {
                    if (!eN[n] && th(n) && (ej.tagNameCheck instanceof RegExp && y(ej.tagNameCheck, n) || ej.tagNameCheck instanceof Function && ej.tagNameCheck(n)))
                        return !1;
                    if (eG && !ez[n]) {
                        let t = et(e) || e.parentNode
                            , n = ee(e) || e.childNodes;
                        if (n && t) {
                            let a = n.length;
                            for (let r = a - 1; r >= 0; --r) {
                                let a = Z(n[r], !0);
                                a.__removalCount = (e.__removalCount || 0) + 1,
                                    t.insertBefore(a, $(e))
                            }
                        }
                    }
                    return tr(e),
                        !0
                }
                return e instanceof G && !ta(e) || ("noscript" === n || "noembed" === n || "noframes" === n) && y(/<\/no(script|embed|frames)/i, e.innerHTML) ? (tr(e),
                    !0) : (eE && e.nodeType === Q.text && (t = e.textContent,
                    u([ec, ed, eu], e => {
                            t = g(t, e, " ")
                        }
                    ),
                e.textContent !== t && (h(r.removed, {
                    element: e.cloneNode()
                }),
                    e.textContent = t)),
                    td("afterSanitizeElements", e, null),
                    !1)
            }
                , tm = function(e, t, n) {
                if (eL && ("id" === t || "name" === t) && (n in i || n in e8))
                    return !1;
                if (eS && !ew[t] && y(em, t))
                    ;
                else if (ek && y(eh, t))
                    ;
                else if (!eb[t] || ew[t]) {
                    if (!(th(e) && (ej.tagNameCheck instanceof RegExp && y(ej.tagNameCheck, e) || ej.tagNameCheck instanceof Function && ej.tagNameCheck(e)) && (ej.attributeNameCheck instanceof RegExp && y(ej.attributeNameCheck, t) || ej.attributeNameCheck instanceof Function && ej.attributeNameCheck(t)) || "is" === t && ej.allowCustomizedBuiltInElements && (ej.tagNameCheck instanceof RegExp && y(ej.tagNameCheck, n) || ej.tagNameCheck instanceof Function && ej.tagNameCheck(n))))
                        return !1
                } else if (eW[t])
                    ;
                else if (y(eg, g(n, ef, "")))
                    ;
                else if (("src" === t || "xlink:href" === t || "href" === t) && "script" !== e && 0 === v(n, "data:") && eV[e])
                    ;
                else if (eC && !y(ep, g(n, ef, "")))
                    ;
                else if (n)
                    return !1;
                return !0
            }
                , th = function(e) {
                return "annotation-xml" !== e && _(e, e_)
            }
                , tp = function(e) {
                td("beforeSanitizeAttributes", e, null);
                let {attributes: t} = e;
                if (!t)
                    return;
                let a = {
                    attrName: "",
                    attrValue: "",
                    keepAttr: !0,
                    allowedAttributes: eb,
                    forceKeepAttr: void 0
                }
                    , i = t.length;
                for (; i--; ) {
                    let {name: s, namespaceURI: o, value: l} = t[i]
                        , c = e6(s)
                        , d = "value" === s ? l : x(l);
                    if (a.attrName = c,
                        a.attrValue = d,
                        a.keepAttr = !0,
                        a.forceKeepAttr = void 0,
                        td("uponSanitizeAttribute", e, a),
                        d = a.attrValue,
                    eF && ("id" === c || "name" === c) && (ti(s, e),
                        d = "user-content-" + d),
                    eA && y(/((--!?|])>)|<\/(style|title)/i, d)) {
                        ti(s, e);
                        continue
                    }
                    if (a.forceKeepAttr || (ti(s, e),
                        !a.keepAttr))
                        continue;
                    if (!eT && y(/\/>/i, d)) {
                        ti(s, e);
                        continue
                    }
                    eE && u([ec, ed, eu], e => {
                            d = g(d, e, " ")
                        }
                    );
                    let h = e6(e.nodeName);
                    if (tm(h, c, d)) {
                        if (n && "object" == typeof q && "function" == typeof q.getAttributeType) {
                            if (o)
                                ;
                            else
                                switch (q.getAttributeType(h, c)) {
                                    case "TrustedHTML":
                                        d = n.createHTML(d);
                                        break;
                                    case "TrustedScriptURL":
                                        d = n.createScriptURL(d)
                                }
                        }
                        try {
                            o ? e.setAttributeNS(o, s, d) : e.setAttribute(s, d),
                                tl(e) ? tr(e) : m(r.removed)
                        } catch (e) {}
                    }
                }
                td("afterSanitizeAttributes", e, null)
            }
                , tf = function e(t) {
                let n = null
                    , a = to(t);
                for (td("beforeSanitizeShadowDOM", t, null); n = a.nextNode(); )
                    td("uponSanitizeShadowNode", n, null),
                    tu(n) || (n.content instanceof d && e(n.content),
                        tp(n));
                td("afterSanitizeShadowDOM", t, null)
            };
            return r.sanitize = function(e) {
                let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}
                    , a = null
                    , i = null
                    , s = null
                    , l = null;
                if ((eK = !e) && (e = "<!-->"),
                "string" != typeof e && !tc(e)) {
                    if ("function" == typeof e.toString) {
                        if ("string" != typeof (e = e.toString()))
                            throw j("dirty is not a string, aborting")
                    } else
                        throw j("toString is not a function")
                }
                if (!r.isSupported)
                    return e;
                if (eO || te(t),
                    r.removed = [],
                "string" == typeof e && (eU = !1),
                    eU) {
                    if (e.nodeName) {
                        let t = e6(e.nodeName);
                        if (!ev[t] || eN[t])
                            throw j("root node is forbidden and cannot be sanitized in-place")
                    }
                } else if (e instanceof F)
                    (i = (a = ts("<!---->")).ownerDocument.importNode(e, !0)).nodeType === Q.element && "BODY" === i.nodeName ? a = i : "HTML" === i.nodeName ? a = i : a.appendChild(i);
                else {
                    if (!eR && !eE && !eP && -1 === e.indexOf("<"))
                        return n && eD ? n.createHTML(e) : e;
                    if (!(a = ts(e)))
                        return eR ? null : eD ? en : ""
                }
                a && eM && tr(a.firstChild);
                let c = to(eU ? e : a);
                for (; s = c.nextNode(); )
                    tu(s) || (s.content instanceof d && tf(s.content),
                        tp(s));
                if (eU)
                    return e;
                if (eR) {
                    if (eI)
                        for (l = ei.call(a.ownerDocument); a.firstChild; )
                            l.appendChild(a.firstChild);
                    else
                        l = a;
                    return (eb.shadowroot || eb.shadowrootmode) && (l = eo.call(o, l, !0)),
                        l
                }
                let m = eP ? a.outerHTML : a.innerHTML;
                return eP && ev["!doctype"] && a.ownerDocument && a.ownerDocument.doctype && a.ownerDocument.doctype.name && y(W, a.ownerDocument.doctype.name) && (m = "<!DOCTYPE " + a.ownerDocument.doctype.name + ">\n" + m),
                eE && u([ec, ed, eu], e => {
                        m = g(m, e, " ")
                    }
                ),
                    n && eD ? n.createHTML(m) : m
            }
                ,
                r.setConfig = function() {
                    let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    te(e),
                        eO = !0
                }
                ,
                r.clearConfig = function() {
                    e9 = null,
                        eO = !1
                }
                ,
                r.isValidAttribute = function(e, t, n) {
                    return e9 || te({}),
                        tm(e6(e), e6(t), n)
                }
                ,
                r.addHook = function(e, t) {
                    "function" == typeof t && (el[e] = el[e] || [],
                        h(el[e], t))
                }
                ,
                r.removeHook = function(e) {
                    if (el[e])
                        return m(el[e])
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
        }();
        e.exports = Z
    }
    ,
    79279: (e, t) => {
        "use strict";
        t.ai = t.w6 = void 0;
        var n = function() {
            window.dataLayer = window.dataLayer || []
        };
        t.ai = function(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}
                , r = "ga-gtag";
            if (!document.getElementById(r)) {
                var i = document.head
                    , s = document.createElement("script");
                s.id = r,
                    s.async = !0,
                    s.src = "https://www.googletagmanager.com/gtag/js?id=".concat(e),
                    i.insertBefore(s, i.firstChild),
                    n(),
                    a("js", new Date),
                    a("config", e, t)
            }
        }
        ;
        var a = t.w6 = function() {
            window.dataLayer.push(arguments)
        }
    }
    ,
    15270: (e, t) => {
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
    }
    ,
    65496: (e, t) => {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
            t.default = function(e) {
                var t, u, m = e.match(s), h = m && m[1] ? m[1].toLowerCase() : "";
                switch (h) {
                    case a:
                        var p = d(e);
                        if (!o.test(e)) {
                            var f = p.querySelector(r);
                            null === (t = null == f ? void 0 : f.parentNode) || void 0 === t || t.removeChild(f)
                        }
                        if (!l.test(e)) {
                            var f = p.querySelector(i);
                            null === (u = null == f ? void 0 : f.parentNode) || void 0 === u || u.removeChild(f)
                        }
                        return p.querySelectorAll(a);
                    case r:
                    case i:
                        var _ = c(e).querySelectorAll(h);
                        if (l.test(e) && o.test(e))
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
        var n, a = "html", r = "head", i = "body", s = /<([a-zA-Z]+[0-9]?)/, o = /<head[^]*>/i, l = /<body[^]*>/i, c = function(e, t) {
            throw Error("This browser does not support `document.implementation.createHTMLDocument`")
        }, d = function(e, t) {
            throw Error("This browser does not support `DOMParser.prototype.parseFromString`")
        }, u = "object" == typeof window && window.DOMParser;
        if ("function" == typeof u) {
            var m = new u;
            c = d = function(e, t) {
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
    }
    ,
    92471: function(e, t, n) {
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
                var t = e.match(s)
                    , n = t ? t[1] : void 0;
                return (0,
                    i.formatDOM)((0,
                    r.default)(e), null, n)
            }
        ;
        var r = a(n(65496))
            , i = n(67731)
            , s = /<(![a-zA-Z\s]+)>/
    },
    67731: (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
            t.formatAttributes = i,
            t.formatDOM = function e(t, n, s) {
                void 0 === n && (n = null);
                for (var o, l = [], c = 0, d = t.length; c < d; c++) {
                    var u = t[c];
                    switch (u.nodeType) {
                        case 1:
                            var m = function(e) {
                                var t;
                                return t = e = e.toLowerCase(),
                                r.CASE_SENSITIVE_TAG_NAMES_MAP[t] || e
                            }(u.nodeName);
                            (o = new a.Element(m,i(u.attributes))).children = e("template" === m ? u.content.childNodes : u.childNodes, o);
                            break;
                        case 3:
                            o = new a.Text(u.nodeValue);
                            break;
                        case 8:
                            o = new a.Comment(u.nodeValue);
                            break;
                        default:
                            continue
                    }
                    var h = l[c - 1] || null;
                    h && (h.next = o),
                        o.parent = n,
                        o.prev = h,
                        o.next = null,
                        l.push(o)
                }
                return s && ((o = new a.ProcessingInstruction(s.substring(0, s.indexOf(" ")).toLowerCase(),s)).next = l[0] || null,
                    o.parent = n,
                    l.unshift(o),
                l[1] && (l[1].prev = l[0])),
                    l
            }
        ;
        var a = n(41141)
            , r = n(15270);
        function i(e) {
            for (var t = {}, n = 0, a = e.length; n < a; n++) {
                var r = e[n];
                t[r.name] = r.value
            }
            return t
        }
    }
    ,
    20840: (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
            t.default = function(e, t) {
                void 0 === e && (e = {});
                var n = {}
                    , c = !!(e.type && o[e.type]);
                for (var d in e) {
                    var u = e[d];
                    if ((0,
                        a.isCustomAttribute)(d)) {
                        n[d] = u;
                        continue
                    }
                    var m = d.toLowerCase()
                        , h = l(m);
                    if (h) {
                        var p = (0,
                            a.getPropertyInfo)(h);
                        switch (i.includes(h) && s.includes(t) && !c && (h = l("default" + m)),
                            n[h] = u,
                        p && p.type) {
                            case a.BOOLEAN:
                                n[h] = !0;
                                break;
                            case a.OVERLOADED_BOOLEAN:
                                "" === u && (n[h] = !0)
                        }
                        continue
                    }
                    r.PRESERVE_CUSTOM_ATTRIBUTES && (n[d] = u)
                }
                return (0,
                    r.setStyleProp)(e.style, n),
                    n
            }
        ;
        var a = n(14210)
            , r = n(74958)
            , i = ["checked", "value"]
            , s = ["input", "select", "textarea"]
            , o = {
            reset: !0,
            submit: !0
        };
        function l(e) {
            return a.possibleStandardNames[e]
        }
    }
    ,
    10308: function(e, t, n) {
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
                for (var a = [], r = "function" == typeof n.replace, l = n.transform || s.returnFirstArg, c = n.library || o, d = c.cloneElement, u = c.createElement, m = c.isValidElement, h = t.length, p = 0; p < h; p++) {
                    var f = t[p];
                    if (r) {
                        var _ = n.replace(f, p);
                        if (m(_)) {
                            h > 1 && (_ = d(_, {
                                key: _.key || p
                            })),
                                a.push(l(_, f, p));
                            continue
                        }
                    }
                    if ("text" === f.type) {
                        var g = !f.data.trim().length;
                        if (g && f.parent && !(0,
                            s.canTextBeChildOfNode)(f.parent) || n.trim && g)
                            continue;
                        a.push(l(f.data, f, p));
                        continue
                    }
                    var v = {};
                    s.PRESERVE_CUSTOM_ATTRIBUTES && "tag" === f.type && (0,
                        s.isCustomComponent)(f.name, f.attribs) ? ((0,
                        s.setStyleProp)(f.attribs.style, f.attribs),
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
                        a.push(l(u(f.name, v, x), f, p))
                }
                return 1 === a.length ? a[0] : a
            }
        ;
        var r = n(96540)
            , i = a(n(20840))
            , s = n(74958)
            , o = {
            cloneElement: r.cloneElement,
            createElement: r.createElement,
            isValidElement: r.isValidElement
        }
    },
    50442: function(e, t, n) {
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
                    s.default)((0,
                    r.default)(e, (null == t ? void 0 : t.htmlparser2) || l), t) : []
            }
        ;
        var r = a(n(92471));
        t.htmlToDOM = r.default;
        var i = a(n(20840));
        t.attributesToProps = i.default;
        var s = a(n(10308));
        t.domToReact = s.default;
        var o = n(41141);
        Object.defineProperty(t, "Comment", {
            enumerable: !0,
            get: function() {
                return o.Comment
            }
        }),
            Object.defineProperty(t, "Element", {
                enumerable: !0,
                get: function() {
                    return o.Element
                }
            }),
            Object.defineProperty(t, "ProcessingInstruction", {
                enumerable: !0,
                get: function() {
                    return o.ProcessingInstruction
                }
            }),
            Object.defineProperty(t, "Text", {
                enumerable: !0,
                get: function() {
                    return o.Text
                }
            });
        var l = {
            lowerCaseAttributeNames: !1
        }
    },
    74958: function(e, t, n) {
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
                return e.includes("-") ? !s.has(e) : !!(t && "string" == typeof t.is)
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
                            i.default)(e, o)
                    } catch (e) {
                        t.style = {}
                    }
                }
            }
        ;
        var r = n(96540)
            , i = a(n(35229))
            , s = new Set(["annotation-xml", "color-profile", "font-face", "font-face-src", "font-face-uri", "font-face-format", "font-face-name", "missing-glyph"])
            , o = {
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
    19788: e => {
        var t = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//g
            , n = /\n/g
            , a = /^\s*/
            , r = /^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/
            , i = /^:\s*/
            , s = /^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};])+)/
            , o = /^[;\s]*/
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
            var d = 1
                , u = 1;
            function m(e) {
                var t = e.match(n);
                t && (d += t.length);
                var a = e.lastIndexOf("\n");
                u = ~a ? e.length - a : u + e.length
            }
            function h() {
                var e = {
                    line: d,
                    column: u
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
                        line: d,
                        column: u
                    },
                    this.source = l.source
            }
            p.prototype.content = e;
            var f = [];
            function _(t) {
                var n = Error(l.source + ":" + d + ":" + u + ": " + t);
                if (n.reason = t,
                    n.filename = l.source,
                    n.line = d,
                    n.column = u,
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
                    return u += 2,
                        m(a),
                        e = e.slice(n),
                        u += 2,
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
                            var a = g(s)
                                , l = e({
                                type: "declaration",
                                property: c(n[0].replace(t, "")),
                                value: a ? c(a[0].replace(t, "")) : ""
                            });
                            return g(o),
                                l
                        }
                    }(); )
                        !1 !== e && (n.push(e),
                            v(n));
                    return n
                }()
        }
    }
    ,
    84074: (e, t, n) => {
        e.exports = window.DOMPurify || (window.DOMPurify = n(25454).default || n(25454))
    }
    ,
    86170: (e, t, n) => {
        (window.__NEXT_P = window.__NEXT_P || []).push(["/_app", function() {
            return n(64672)
        }
        ])
    }
    ,
    65079: (e, t, n) => {
        "use strict";
        n.d(t, {
            A: () => u
        });
        var a = n(74848)
            , r = n(29965)
            , i = n.n(r)
            , s = n(91106)
            , o = n.n(s)
            , l = n(292)
            , c = n(21140)
            , d = n.n(c);
        let u = function(e) {
            let t, {game: n={}, width: r, height: s, link: c=!1} = e, {game_id: u, game_image: m, game_name: h} = n, p = "https://howlongtobeat.com/games/no_boxart.png", f = m ? "https://howlongtobeat.com/games/" + m : p, _ = r, g = s, v = 20, x = 29;
            if (r && s)
                t = "".concat(f, "?width=").concat(r, "&height=").concat(s, "&crop=").concat(r, ":").concat(s, ",smart");
            else {
                var b;
                if (f === p ? (v = 1,
                    x = 1) : (null === (b = n.profile_platform) || void 0 === b ? void 0 : b.includes("Super Nintendo")) ? (v = 4,
                    x = 3) : n.profile_steam > 0 && (v = 2,
                    x = 3),
                r && !s)
                    g = Math.ceil(r / v * x);
                else {
                    if (!s || r)
                        return null;
                    _ = Math.ceil(s / x * v)
                }
                t = f + "?width=".concat(_, "&height=").concat(g, "&crop=").concat(v, ":").concat(x, ",smart")
            }
            let y = (0,
                a.jsx)(i(), {
                loader: l.R,
                src: t,
                width: _,
                height: g,
                alt: "".concat(h, " Box Art"),
                className: d().box_art_image
            });
            return c ? (0,
                a.jsx)(o(), {
                href: "/game/".concat(u),
                "aria-label": h,
                title: h,
                children: y
            }) : y
        }
    }
    ,
    1981: (e, t, n) => {
        "use strict";
        n.d(t, {
            A: () => o
        });
        var a = n(74848)
            , r = n(46942)
            , i = n.n(r)
            , s = n(44103);
        let o = function(e) {
            let {name: t, id: n, className: r, value: o, onChange: l} = e
                , c = s.Ls;
            return (0,
                a.jsxs)("select", {
                value: o,
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
    }
    ,
    83749: (e, t, n) => {
        "use strict";
        n.d(t, {
            A: () => f
        });
        var a = n(74848)
            , r = n(91106)
            , i = n.n(r)
            , s = n(46942)
            , o = n.n(s)
            , l = n(54078)
            , c = n.n(l)
            , d = n(44103)
            , u = n(25271)
            , m = n(5556)
            , h = n(23704);
        function p(e) {
            let {game: t, userStats: n, isPreloaded: r, displayModifier: s=null, highlight: l=!1, searchTerms: m=""} = e
                , {currentUser: p} = (0,
                u.i)()
                , {game_id: f, game_name: _, game_alias: g, game_name_date: v, game_image: x, game_type: b, release_world: y, comp_lvl_sp: j, comp_lvl_combine: N, comp_all: w, comp_all_count: k, comp_main: S, comp_main_count: C, comp_plus: T, comp_plus_count: E, comp_100: A, comp_100_count: P, comp_lvl_co: O, comp_lvl_mp: M, invested_co: R, invested_co_count: I, invested_mp: D, invested_mp_count: L, review_score: F, count_comp: G, count_review: U, count_backlog: B, count_playing: z, count_speedrun: H, count_retired: V} = t
                , q = g ? g.split(", ").filter(e => m.trim().toLowerCase() === (null == e ? void 0 : e.toLowerCase())) : null
                , W = x ? "https://howlongtobeat.com/games/" + x : "no_boxart.png";
            if (!f || !_)
                return null;
            let X = "";
            X = "dlc" === b || "mod" === b || "hack" === b ? "linear-gradient(rgb(70, 70, 70), rgba(70, 70, 70, 0.85))" : "linear-gradient(rgb(31, 31, 31), rgba(31, 31, 31, 0.85))",
                X = "".concat(X, ", url('").concat("https://howlongtobeat.com", "/games/").concat(x, "?crop=10:3&width=563')");
            let Y = "";
            1 === v && (Y = "(".concat(y, ")"));
            let Q = [];
            return (null === s || "user_stats" === s) && (1 === j && (1 === N ? Q.push((0,
                a.jsxs)(a.Fragment, {
                children: [(0,
                    a.jsx)("div", {
                    className: o()(c().search_list_tidbit_short, "text_white", "shadow_text"),
                    children: "Solo"
                }), (0,
                    a.jsx)("div", {
                    className: o()(c().search_list_tidbit_long, "center", (0,
                        d.WB)(k)),
                    children: (0,
                        d.wm)(w, "h", "long")
                })]
            })) : Q.push((0,
                a.jsxs)(a.Fragment, {
                children: [(0,
                    a.jsx)("div", {
                    className: o()(c().search_list_tidbit, "text_white", "shadow_text"),
                    children: "Main Story"
                }), (0,
                    a.jsx)("div", {
                    className: o()(c().search_list_tidbit, "center", (0,
                        d.WB)(C)),
                    children: (0,
                        d.wm)(S, "h", "long")
                }), (0,
                    a.jsx)("div", {
                    className: o()(c().search_list_tidbit, "text_white", "shadow_text"),
                    children: "Main + Extra"
                }), (0,
                    a.jsx)("div", {
                    className: o()(c().search_list_tidbit, "center", (0,
                        d.WB)(E)),
                    children: (0,
                        d.wm)(T, "h", "long")
                }), (0,
                    a.jsx)("div", {
                    className: o()(c().search_list_tidbit, "text_white", "shadow_text"),
                    children: "Completionist"
                }), (0,
                    a.jsx)("div", {
                    className: o()(c().search_list_tidbit, "center", (0,
                        d.WB)(P)),
                    children: (0,
                        d.wm)(A, "h", "long")
                })]
            }))),
            (0 === j || 1 === N) && (1 === O || 1 === M) && (1 === O && Q.push((0,
                a.jsxs)(a.Fragment, {
                children: [(0,
                    a.jsx)("div", {
                    className: o()(c().search_list_tidbit_short, "text_white", "shadow_text"),
                    children: "Co-Op"
                }), (0,
                    a.jsx)("div", {
                    className: o()(c().search_list_tidbit_long, "center", (0,
                        d.WB)(I)),
                    children: (0,
                        d.wm)(R, "h", "long")
                })]
            })),
            1 === M && Q.push((0,
                a.jsxs)(a.Fragment, {
                children: [(0,
                    a.jsx)("div", {
                    className: o()(c().search_list_tidbit_short, "text_white", "shadow_text"),
                    children: "Vs."
                }), (0,
                    a.jsx)("div", {
                    className: o()(c().search_list_tidbit_long, "center", (0,
                        d.WB)(L)),
                    children: (0,
                        d.wm)(D, "h", "long")
                })]
            })))),
            "user_stats" === s && (G > 0 && Q.push((0,
                a.jsxs)(a.Fragment, {
                children: [(0,
                    a.jsx)("div", {
                    className: o()(c().search_list_tidbit, "text_white", "shadow_text"),
                    children: "Polled"
                }), (0,
                    a.jsx)("div", {
                    className: o()(c().search_list_tidbit, "center", "back_primary"),
                    children: (0,
                        d.ZV)(G)
                })]
            })),
            F > 0 && Q.push((0,
                a.jsxs)(a.Fragment, {
                children: [(0,
                    a.jsx)("div", {
                    className: o()(c().search_list_tidbit, "text_white", "shadow_text"),
                    children: "Rated"
                }), (0,
                    a.jsxs)("div", {
                    className: o()(c().search_list_tidbit, "center", "back_primary"),
                    children: [(0,
                        d.cf)({
                        rating: F,
                        roundNearest: !1,
                        short: !0,
                        userScale: null == p ? void 0 : p.set_review_scale
                    }), " by", " ", (0,
                        d.ZV)(U)]
                })]
            })),
            B > 0 && Q.push((0,
                a.jsxs)(a.Fragment, {
                children: [(0,
                    a.jsx)("div", {
                    className: o()(c().search_list_tidbit, "text_white", "shadow_text"),
                    children: "Backlog"
                }), (0,
                    a.jsx)("div", {
                    className: o()(c().search_list_tidbit, "center", "back_primary"),
                    children: (0,
                        d.ZV)(B)
                })]
            })),
            z > 0 && Q.push((0,
                a.jsxs)(a.Fragment, {
                children: [(0,
                    a.jsx)("div", {
                    className: o()(c().search_list_tidbit, "text_white", "shadow_text"),
                    children: "Playing"
                }), (0,
                    a.jsx)("div", {
                    className: o()(c().search_list_tidbit, "center", "back_primary"),
                    children: (0,
                        d.ZV)(z)
                })]
            })),
            H > 0 && Q.push((0,
                a.jsxs)(a.Fragment, {
                children: [(0,
                    a.jsx)("div", {
                    className: o()(c().search_list_tidbit, "text_white", "shadow_text"),
                    children: "Speedruns"
                }), (0,
                    a.jsx)("div", {
                    className: o()(c().search_list_tidbit, "center", "back_primary"),
                    children: (0,
                        d.ZV)(H)
                })]
            })),
            V > 0 && Q.push((0,
                a.jsxs)(a.Fragment, {
                children: [(0,
                    a.jsx)("div", {
                    className: o()(c().search_list_tidbit, "text_white", "shadow_text"),
                    children: "Retired"
                }), (0,
                    a.jsx)("div", {
                    className: o()(c().search_list_tidbit, "center", "back_primary"),
                    children: (0,
                        d.ZV)(V)
                })]
            }))),
                (0,
                    a.jsx)("li", {
                    className: o()("back_darkish", c().search_list),
                    style: {
                        backgroundImage: X,
                        borderLeft: !0 === l ? "5px solid #2b7ab9" : m === (null == q ? void 0 : q[0]) ? "5px solid #3da949" : null
                    },
                    children: (0,
                        a.jsxs)("div", {
                        className: c().inside_blur,
                        children: [(0,
                            a.jsx)("div", {
                            className: o()(c().search_list_image),
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
                            className: o()(c().search_list_details),
                            children: [(0,
                                a.jsxs)("h2", {
                                children: [(0,
                                    a.jsx)(i(), {
                                    href: "/game/".concat(f),
                                    className: !0 === l ? "text_blue" : m === (null == q ? void 0 : q[0]) ? "text_green" : "text_white",
                                    title: _,
                                    children: m === (null == q ? void 0 : q[0]) ? q[0] : _
                                }), " ", Y]
                            }), (0,
                                a.jsx)("div", {
                                className: o()(c().search_list_details_block),
                                children: Q.map( (e, t) => (0,
                                    a.jsx)("div", {
                                    children: e
                                }, e.key || t))
                            })]
                        }), (0,
                            a.jsx)(h.A, {
                            game: t,
                            userStats: n,
                            isPreloaded: r
                        })]
                    })
                })
        }
        p.propTypes = {
            game: m.object.isRequired
        };
        let f = p
    }
    ,
    23704: (e, t, n) => {
        "use strict";
        n.d(t, {
            A: () => v
        });
        var a = n(74848)
            , r = n(25271)
            , i = n(96540)
            , s = n(44103)
            , o = n(22193)
            , l = n(40710)
            , c = n(47993)
            , d = n(94474)
            , u = n(91106)
            , m = n.n(u)
            , h = n(47494)
            , p = n.n(h)
            , f = n(46942)
            , _ = n.n(f);
        let g = function(e) {
            var t, n, s;
            let {game: l} = e
                , {currentUser: c} = (0,
                    r.i)()
                , [d,u] = (0,
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
                , [N,w] = (0,
                    i.useState)(!1)
                , [k,S] = (0,
                    i.useState)("")
                , [C,T] = (0,
                    i.useState)("")
                , [E,A] = (0,
                    i.useState)([])
                , P = async e => {
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
                            var i, s;
                            0 === r.count && w(!0),
                                b(r),
                            (null == r ? void 0 : null === (s = r.lists) || void 0 === s ? void 0 : null === (i = s[0]) || void 0 === i ? void 0 : i.list_id) && (j(Number(r.lists[0].list_id)),
                                A(r.withIn.filter(e => {
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
                    (null == l ? void 0 : l.game_id) > 0 && (null == c ? void 0 : c.user_id) && P({
                        gameId: l.game_id,
                        userId: null == c ? void 0 : c.user_id
                    })
                }
                , [l.game_id, null == c ? void 0 : c.user_id]);
            let O = async () => {
                    if (!1 === d) {
                        if (0 === y && 0 === k.trim().length) {
                            alert("You must enter a collection name.");
                            return
                        }
                        u(!0),
                        0 === Number(y) && f(!0);
                        let e = await fetch("/api/game/".concat(l.game_id, "/user/").concat(null == c ? void 0 : c.user_id, "/actionAddCollection"), {
                            method: "POST",
                            body: JSON.stringify({
                                game: l,
                                quickAdd: {
                                    userId: null == c ? void 0 : c.user_id,
                                    userName: null == c ? void 0 : c.user_name,
                                    listId: Number(y),
                                    listName: k,
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
                            P({
                                gameId: l.game_id,
                                userId: null == c ? void 0 : c.user_id
                            }),
                            w(!1),
                            S(""),
                            T(""),
                            (0,
                                o.sx)({
                                eventName: "user_quickadd",
                                params: {
                                    type: "collection",
                                    game_id: null == l ? void 0 : l.game_id
                                }
                            })),
                            u(!1)
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
                        value: k,
                        onChange: e => S(e.target.value)
                    }) : (0,
                        a.jsx)("select", {
                        className: _()(p().collection_field, "form_select", "back_dark"),
                        onChange: e => {
                            v(),
                                j(Number(e.target.value)),
                                A(null == x ? void 0 : x.withIn.filter(t => Number(t.list_id) === Number(e.target.value)))
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
                            A(null == x ? void 0 : x.withIn.filter(e => {
                                    var t, n;
                                    return Number(e.list_id) === Number(null == x ? void 0 : null === (n = x.lists) || void 0 === n ? void 0 : null === (t = n[0]) || void 0 === t ? void 0 : t.list_id)
                                }
                            )),
                            w(!1)
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
                            w(!0)
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
                            href: "/user/".concat(c.user_name, "/lists/").concat(null == E ? void 0 : null === (s = E[0]) || void 0 === s ? void 0 : s.list_id),
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
            var t, n, u, h, f, v, x, b;
            let {game: y, isPreloaded: j=!1, userStats: N, showToggle: w=!0, isExpanded: k=!1, categoryGap: S=!0} = e
                , {currentUser: C} = (0,
                    r.i)()
                , [T,E] = (0,
                    i.useState)(k)
                , [A,P] = (0,
                    i.useState)(!0)
                , [O,M] = (0,
                    i.useState)(!1)
                , [R,I] = (0,
                    i.useState)(null)
                , [D,L] = (0,
                    i.useState)(N)
                , [F,G] = (0,
                    i.useState)()
                , [U,B] = (0,
                    i.useState)("")
                , [z,H] = (0,
                    i.useState)("")
                , V = async e => {
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
                            P(!1)
                    } else
                        throw Error(r.message || "Failed to change post status!")
                }
            ;
            (0,
                i.useEffect)( () => {
                    (null == y ? void 0 : y.game_id) > 0 && (null == C ? void 0 : C.user_id) && !1 === j && V({
                        gameId: y.game_id,
                        userId: null == C ? void 0 : C.user_id
                    })
                }
                , [y.game_id, null == C ? void 0 : C.user_id]);
            let q = async e => {
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
                        n.error ? I(n.error) : (I(),
                            V({
                                gameId: y.game_id,
                                userId: null == C ? void 0 : C.user_id
                            }),
                            (0,
                                o.sx)({
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
                    , [r,o] = (0,
                        i.useState)()
                    , [l,c] = (0,
                        i.useState)("text_".concat((0,
                        s.TQ)(t)))
                    , u = "text_".concat((0,
                        s.TQ)(t, !1))
                    , {game_id: h, platform: f, id: _, custom_title: g, list_playing: v, list_backlog: x, list_replay: b, list_custom: y, list_custom2: j, list_custom3: N, list_comp: w, list_retired: k} = t
                    , S = async e => {
                        let {id: t} = e;
                        "text_green" === l ? c(u) : c("text_green");
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
                            V({
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
                                V({
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
                                onClick: () => r === _ ? o() : o(_)
                            }), 1 === v && 0 === x && 0 === b && 0 === y && 0 === j && 0 === N && 0 === w && 0 === k ? null : (0,
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
                        a.jsx)(d.A, {
                        memberGamesId: _,
                        playstyle: n.set_playstyle,
                        currentUser: n,
                        currentUserHome: !0
                    })]
                })
            }
            return (0,
                a.jsxs)(a.Fragment, {
                children: [!0 === w && (0,
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
                                !0 === j && V({
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
                            children: [(null == D ? void 0 : D.user_playing) > 0 && (0,
                                a.jsx)("strong", {
                                className: "back_green",
                                children: "Playing"
                            }), (null == D ? void 0 : D.user_backlog) > 0 && (0,
                                a.jsx)("strong", {
                                className: "back_blue",
                                children: "Backlog"
                            }), (null == D ? void 0 : D.user_replays) > 0 && (0,
                                a.jsx)("strong", {
                                className: "back_blueish",
                                children: "Replay"
                            }), (null == D ? void 0 : D.user_custom) > 0 && (0,
                                a.jsx)("strong", {
                                className: "back_teal",
                                children: (null == C ? void 0 : C.set_customtab) ? C.set_customtab : "Custom"
                            }), (null == D ? void 0 : D.user_custom2) > 0 && (0,
                                a.jsx)("strong", {
                                className: "back_teal",
                                children: (null == C ? void 0 : C.set_customtab2) ? C.set_customtab2 : "Custom2"
                            }), (null == D ? void 0 : D.user_custom3) > 0 && (0,
                                a.jsx)("strong", {
                                className: "back_teal",
                                children: (null == C ? void 0 : C.set_customtab3) ? C.set_customtab3 : "Custom3"
                            }), (null == D ? void 0 : D.user_comp) > 0 && (0,
                                a.jsx)("strong", {
                                className: "back_purple",
                                children: "Completed"
                            }), (null == D ? void 0 : D.user_retired) > 0 && (0,
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
                }), (!0 === T || !0 === k) && (A ? (0,
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
                                a.jsx)(l.A, {
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
                                a.jsx)(c.A, {
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
                                    q({
                                        game: y,
                                        type: "playing"
                                    })
                                }
                                ,
                                children: [(0,
                                    a.jsx)("span", {
                                    className: _()(p().num, (null == D ? void 0 : D.user_playing) > 0 ? "back_green" : "back_darkish"),
                                    children: null !== (n = null == D ? void 0 : D.user_playing) && void 0 !== n ? n : 0
                                }), "Playing"]
                            }), (0,
                                a.jsxs)("a", {
                                className: _()(p().game_options, "back_dark", "text_white"),
                                title: "Add to Backlog",
                                onClick: () => {
                                    q({
                                        game: y,
                                        type: "backlog"
                                    })
                                }
                                ,
                                children: [(0,
                                    a.jsx)("span", {
                                    className: _()(p().num, (null == D ? void 0 : D.user_backlog) > 0 ? "back_blue" : "back_darkish"),
                                    children: null !== (u = null == D ? void 0 : D.user_backlog) && void 0 !== u ? u : 0
                                }), "Backlog"]
                            }), (0,
                                a.jsxs)("a", {
                                className: _()(p().game_options, "back_dark", "text_white"),
                                title: "Add to Replay",
                                onClick: () => {
                                    q({
                                        game: y,
                                        type: "replay"
                                    })
                                }
                                ,
                                children: [(0,
                                    a.jsx)("span", {
                                    className: _()(p().num, (null == D ? void 0 : D.user_replays) > 0 ? "back_blueish" : "back_darkish"),
                                    children: null !== (h = null == D ? void 0 : D.user_replays) && void 0 !== h ? h : 0
                                }), "Replay"]
                            }), (null == C ? void 0 : C.set_customtab) ? (0,
                                a.jsxs)("a", {
                                className: _()(p().game_options, "back_dark", "text_white"),
                                title: "Add to ".concat(null == C ? void 0 : C.set_customtab),
                                onClick: () => {
                                    q({
                                        game: y,
                                        type: "custom"
                                    })
                                }
                                ,
                                children: [(0,
                                    a.jsx)("span", {
                                    className: _()(p().num, (null == D ? void 0 : D.user_custom) > 0 ? "back_teal" : "back_darkish"),
                                    children: null !== (f = null == D ? void 0 : D.user_custom) && void 0 !== f ? f : 0
                                }), null == C ? void 0 : C.set_customtab]
                            }) : null, (null == C ? void 0 : C.set_customtab2) ? (0,
                                a.jsxs)("a", {
                                className: _()(p().game_options, "back_dark", "text_white"),
                                title: "Add to ".concat(null == C ? void 0 : C.set_customtab2),
                                onClick: () => {
                                    q({
                                        game: y,
                                        type: "custom2"
                                    })
                                }
                                ,
                                children: [(0,
                                    a.jsx)("span", {
                                    className: _()(p().num, (null == D ? void 0 : D.user_custom2) > 0 ? "back_teal" : "back_darkish"),
                                    children: null !== (v = null == D ? void 0 : D.user_custom2) && void 0 !== v ? v : 0
                                }), null == C ? void 0 : C.set_customtab2]
                            }) : null, (null == C ? void 0 : C.set_customtab3) ? (0,
                                a.jsxs)("a", {
                                className: _()(p().game_options, "back_dark", "text_white"),
                                title: "Add to ".concat(null == C ? void 0 : C.set_customtab3),
                                onClick: () => {
                                    q({
                                        game: y,
                                        type: "custom3"
                                    })
                                }
                                ,
                                children: [(0,
                                    a.jsx)("span", {
                                    className: _()(p().num, (null == D ? void 0 : D.user_custom3) > 0 ? "back_teal" : "back_darkish"),
                                    children: null !== (x = null == D ? void 0 : D.user_custom3) && void 0 !== x ? x : 0
                                }), null == C ? void 0 : C.set_customtab3]
                            }) : null, (0,
                                a.jsxs)("div", {
                                className: _()(p().game_options, "back_dark", p().completed),
                                children: [(0,
                                    a.jsx)("a", {
                                    className: _()("text_white", p().completed),
                                    title: "Add to Completions",
                                    onClick: () => {
                                        q({
                                            game: y,
                                            type: "comp"
                                        })
                                    }
                                    ,
                                    children: "Completed"
                                }), (0,
                                    a.jsx)("span", {
                                    className: _()(p().num, (null == D ? void 0 : D.user_comp) > 0 ? "back_purple" : "back_darkish"),
                                    style: {
                                        color: "#FFFFFF",
                                        float: "right"
                                    },
                                    children: null !== (b = null == D ? void 0 : D.user_comp) && void 0 !== b ? b : 0
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
    }
    ,
    54294: (e, t, n) => {
        "use strict";
        n.d(t, {
            A: () => o
        });
        var a = n(74848)
            , r = n(46942)
            , i = n.n(r)
            , s = n(44103);
        let o = function(e) {
            let {name: t, id: n, className: r, value: o, onChange: l} = e
                , c = s.w_;
            return (0,
                a.jsxs)("select", {
                value: o,
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
    }
    ,
    29699: (e, t, n) => {
        "use strict";
        n.d(t, {
            A: () => o
        });
        var a = n(74848)
            , r = n(46942)
            , i = n.n(r)
            , s = n(44103);
        let o = function(e) {
            let {name: t, id: n, className: r, value: o, onChange: l} = e
                , c = s.ph;
            return (0,
                a.jsxs)("select", {
                value: o,
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
    }
    ,
    40710: (e, t, n) => {
        "use strict";
        n.d(t, {
            A: () => c
        });
        var a = n(74848)
            , r = n(46942)
            , i = n.n(r)
            , s = n(25271)
            , o = n(86715)
            , l = n(44103);
        let c = function(e) {
            var t;
            let {onChange: n, className: r, name: c, defaultLabel: d="All Platforms", value: u="", addonList: m=[], hideAllPlatforms: h=!1, hideBonusPlatforms: p=!0, disabled: f=!1} = e
                , _ = (0,
                o.useRouter)()
                , {currentUser: g} = (0,
                s.i)()
                , v = !1 === p ? [].concat(l.kr, l.Xy) : l.kr
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
                    value: u,
                    name: c,
                    autoComplete: "off",
                    className: i()("form_select", r || "back_form"),
                    disabled: f,
                    onChange: n,
                    children: [(0,
                        a.jsx)("option", {
                        value: "",
                        children: d
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
    }
    ,
    47993: (e, t, n) => {
        "use strict";
        n.d(t, {
            A: () => c
        });
        var a = n(74848)
            , r = n(46942)
            , i = n.n(r)
            , s = n(25271)
            , o = n(86715)
            , l = n(44103);
        let c = function(e) {
            var t;
            let {onChange: n, className: r, name: c, defaultLabel: d="All Storefronts", value: u="", addonList: m=[], hideAllStorefronts: h=!1} = e
                , p = (0,
                o.useRouter)()
                , {currentUser: f} = (0,
                s.i)()
                , _ = [];
            !1 === h && (_ = l.Bd);
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
                value: u,
                name: c,
                autoComplete: "off",
                className: i()("form_select", r || "back_form"),
                onChange: n,
                children: [(0,
                    a.jsx)("option", {
                    value: "",
                    children: d
                }), g, v]
            })
        }
    }
    ,
    33336: (e, t, n) => {
        "use strict";
        n.d(t, {
            A: () => s
        });
        var a = n(74848)
            , r = n(46942)
            , i = n.n(r);
        let s = function(e) {
            let {name: t, id: n, className: r, value: s, onChange: o, years: l, defaultLabel: c="All"} = e;
            l && (l = l.filter(e => 0 !== e));
            let d = [];
            if (void 0 !== l)
                d = l;
            else
                for (let e = new Date().getFullYear(); e >= 1958; e--)
                    d.push(e);
            return (0,
                a.jsxs)("select", {
                value: s,
                name: t,
                id: n,
                className: i()("form_select", "back_form", r),
                onChange: o,
                children: [(0,
                    a.jsxs)("option", {
                    value: "",
                    children: [c, " ", void 0 !== l && "Time"]
                }), d.map(e => (0,
                    a.jsx)("option", {
                    value: e,
                    children: e
                }, e))]
            })
        }
    }
    ,
    77928: (e, t, n) => {
        "use strict";
        n.d(t, {
            A: () => i
        });
        var a = n(74848)
            , r = n(25271);
        let i = function(e) {
            let {adType: t="square", location: n="top", divClass: i=null} = e
                , {currentUser: s} = (0,
                r.i)();
            return (null == s ? void 0 : s.profile_ign_prime) === 1 ? null : i ? (0,
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
    }
    ,
    53593: (e, t, n) => {
        "use strict";
        n.d(t, {
            A: () => m
        });
        var a = n(74848)
            , r = n(69254)
            , i = n.n(r)
            , s = n(46942)
            , o = n.n(s)
            , l = n(96540)
            , c = n(30214)
            , d = n(86715)
            , u = n.n(d);
        let m = function(e) {
            let {pageType: t="page", scrollIntoView: n=!1, labelOn: r=!0, pageCurrent: s, pageTotal: m, selectColor: h="back_blue"} = e
                , {searchPage: p, setSearchPage: f, isVisible: _} = (0,
                    c.SQ)()
                , g = !0 === n && s > 1 ? Math.random().toString(36).slice(2, 7) : null
                , v = (0,
                    d.useRouter)()
                , x = (e, t) => {
                    if ("searchPage" === e)
                        f(Number(t));
                    else {
                        var n, a, r;
                        let i = {};
                        "userCollectionList" === e ? i.listId = [null === (n = v.query.listId) || void 0 === n ? void 0 : n[0], null === (a = v.query.listId) || void 0 === a ? void 0 : a[1], t > 1 ? t : null] : "userGamesList" === e ? i.lists = [null === (r = v.query.lists) || void 0 === r ? void 0 : r[0], t > 1 ? t : 1] : i[e] = encodeURIComponent(t),
                            u().replace({
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
                let e = s > 100 ? s - 100 : 1;
                for (let t = e; t <= s + 100 && t <= m; t++)
                    b.push(t)
            }
            let y = () => s > 1 && (0,
                a.jsx)("button", {
                className: o()(i().left, "form_button", i().inactive),
                onClick: () => x(t, parseInt(s) - 1),
                children: "<"
            })
                , j = () => s < m && (0,
                a.jsx)("button", {
                className: o()(i().right, "form_button", i().inactive),
                onClick: () => x(t, parseInt(s) + 1),
                children: ">"
            });
            return (0,
                a.jsxs)(a.Fragment, {
                children: [!0 === r ? (0,
                    a.jsx)("strong", {
                    className: o()(i().label, "mobile_hide"),
                    children: "Page"
                }) : null, (0,
                    a.jsx)("div", {
                    className: o()(i().user_pagination),
                    id: g,
                    children: m > 6 ? (0,
                        a.jsxs)(a.Fragment, {
                        children: [y(), 1 !== s && (0,
                            a.jsx)("button", {
                            className: o()(i().left, "form_button", i().inactive),
                            onClick: () => x(t, 1),
                            children: "1"
                        }), m > 5e3 ? (0,
                            a.jsxs)(a.Fragment, {
                            children: [s - 1 > 1 && (0,
                                a.jsx)("button", {
                                className: o()(i().left, "form_button", i().inactive),
                                onClick: () => x(t, s - 1),
                                children: s - 1
                            }), (0,
                                a.jsx)("span", {
                                className: o()(i().left, "form_button", h),
                                children: s
                            }), s + 1 < m && (0,
                                a.jsx)("button", {
                                className: o()(i().left, "form_button", i().inactive),
                                onClick: () => x(t, s + 1),
                                children: s + 1
                            })]
                        }) : (0,
                            a.jsx)("select", {
                            className: o()(h, "form_select"),
                            name: "page",
                            value: s,
                            onChange: e => x(t, e.target.value),
                            children: b.map(e => (0,
                                a.jsxs)("option", {
                                value: e,
                                children: ["Page ", e]
                            }, "".concat(t, "_").concat(Math.random())))
                        }), j(), s + 1 <= m && (0,
                            a.jsx)("button", {
                            className: o()(i().right, "form_button", i().inactive),
                            onClick: () => x(t, m),
                            children: m
                        })]
                    }) : (0,
                        a.jsxs)(a.Fragment, {
                        children: [y(), b.map(e => (0,
                            a.jsx)("button", {
                            className: o()("form_button", e === s ? h : i().inactive),
                            onClick: () => x(t, e),
                            children: e
                        }, "".concat(t, "_").concat(Math.random()))), j()]
                    })
                })]
            })
        }
    }
    ,
    45428: (e, t, n) => {
        "use strict";
        n.d(t, {
            A: () => u
        });
        var a = n(74848)
            , r = n(29965)
            , i = n.n(r)
            , s = n(91106)
            , o = n.n(s)
            , l = n(1663)
            , c = n.n(l)
            , d = n(292);
        let u = function(e) {
            let {user: t, width: n, link: r=!1, overridePrivacy: s=!1} = e
                , {user_name: l, user_avatar: u="no_avatar.png", set_privacy: m=!1} = t
                , h = "https://howlongtobeat.com/avatars/" + (s || 0 === m ? u : "no_avatar.png") + "?width=" + n + "&crop=1:1,smart"
                , p = (0,
                a.jsx)(i(), {
                loader: d.R,
                src: h,
                width: n,
                height: n,
                alt: "".concat(l, "'s Avatar'"),
                className: c().user_avatar_image
            });
            return r ? (0,
                a.jsx)(o(), {
                href: "/user/".concat(l),
                "aria-label": l,
                title: l,
                children: p
            }) : p
        }
    }
    ,
    10749: (e, t, n) => {
        "use strict";
        n.d(t, {
            A: () => m
        });
        var a = n(74848)
            , r = n(44103)
            , i = n(65079)
            , s = n(91106)
            , o = n.n(s)
            , l = n(46942)
            , c = n.n(l)
            , d = n(88026)
            , u = n.n(d);
        let m = function(e) {
            let {item: t, showUser: n=!1, userNameInURL: s} = e;
            return (0,
                a.jsxs)("li", {
                className: c()("back_primary", u().collection_card, "shadow_box"),
                children: [(0,
                    a.jsxs)("div", {
                    className: c()(u().headers, "back_form"),
                    children: [(0,
                        a.jsxs)("h3", {
                        children: [(0,
                            a.jsx)("span", {
                            className: c()(u().follows, t.list_privacy > 0 ? "text_grey" : "back_primary", "shadow_border"),
                            title: "".concat(t.stat_follows, " Followers"),
                            children: t.list_privacy > 0 ? (0,
                                r.n5)(t.list_privacy) : "".concat(t.stat_follows, " Followers")
                        }), (0,
                            a.jsx)(o(), {
                            className: "text_primary",
                            href: "/user/".concat(s || t.user_name, "/lists/").concat(t.list_id),
                            children: (0,
                                a.jsx)("div", {
                                className: u().title,
                                children: t.list_name
                            })
                        })]
                    }), !0 === n && (0,
                        a.jsxs)("h4", {
                        children: ["Created By ", (0,
                            a.jsx)(o(), {
                            href: "/user/".concat(t.user_name),
                            className: (0,
                                r.dS)(t.user_rights),
                            children: t.user_name
                        })]
                    })]
                }), (0,
                    a.jsxs)(o(), {
                    href: "/user/".concat(t.user_name, "/lists/").concat(t.list_id),
                    children: [(0,
                        a.jsx)("div", {
                        className: c()(u().collection_images, "mobile_hide"),
                        children: t.game_images.split(",").splice(0, 4).map(e => (0,
                            a.jsx)("div", {
                            children: (0,
                                a.jsx)(i.A, {
                                game: {
                                    game_image: e
                                },
                                width: 70,
                                height: 70
                            })
                        }, e))
                    }), (0,
                        a.jsx)("div", {
                        className: c()(u().collection_images, "desktop_hide"),
                        children: t.game_images.split(",").splice(0, 4).map(e => (0,
                            a.jsx)("div", {
                            children: (0,
                                a.jsx)(i.A, {
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
                    className: c()(u().collection_card_details),
                    children: [(0,
                        a.jsx)("div", {
                        className: c()(u().collection_card_tidbit_short),
                        children: "Games"
                    }), (0,
                        a.jsx)("div", {
                        className: c()(u().collection_card_tidbit_short, "back_form", "center"),
                        children: t.total_games - t.total_dlc
                    }), (0,
                        a.jsx)("div", {
                        className: c()(u().collection_card_tidbit_short),
                        children: "Add-Ons"
                    }), (0,
                        a.jsx)("div", {
                        className: c()(u().collection_card_tidbit_short, "back_form", "center"),
                        children: t.total_dlc
                    }), (0,
                        a.jsx)("div", {
                        className: c()(u().collection_card_tidbit_short),
                        children: "Total Length"
                    }), (0,
                        a.jsx)("div", {
                        className: c()(u().collection_card_tidbit_short, "back_blue", "center"),
                        children: (0,
                            r.wm)(t.length_total, "h", "long")
                    }), (0,
                        a.jsx)("div", {
                        className: c()(u().collection_card_tidbit_short),
                        children: "Avg. Length"
                    }), (0,
                        a.jsx)("div", {
                        className: c()(u().collection_card_tidbit_short, "back_blue", "center"),
                        children: (0,
                            r.wm)(t.length_avg, "h", "long")
                    })]
                })]
            })
        }
    }
    ,
    94474: (e, t, n) => {
        "use strict";
        n.d(t, {
            A: () => l
        });
        var a = n(74848)
            , r = n(96540)
            , i = n(44103)
            , s = n(66881)
            , o = n.n(s);
        let l = function(e) {
            let t, n, s, l, c, d, u, {game: m, memberGamesId: h, playstyle: p, reviewScale: f, currentUser: _, currentUserHome: g} = e, [v,x] = (0,
                r.useState)(m || {}), [b,y] = (0,
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
                        x(r)
                    }
                    (null == m ? void 0 : m.id) || !h || e({
                        memberGamesId: h,
                        playstyle: p
                    })
                }
                , []),
                !v.id)
                return null;
            let {comp_all: j, comp_main: N, comp_main_notes: w, comp_plus: k, comp_plus_notes: S, comp_100: C, comp_100_notes: T, comp_speed: E, comp_speed_notes: A, comp_speed100: P, comp_speed100_notes: O, date_start: M, date_complete: R, date_updated: I, date_added: D, invested_co: L, invested_mp: F, invested_pro: G, list_backlog: U, list_comp: B, list_custom2: z, list_custom3: H, list_custom: V, list_playing: q, list_replay: W, list_retired: X, play_count: Y, play_notes: Q, play_storefront: J, play_video: Z, retired_notes: K, review_notes: $, review_score: ee, review_score_g: et} = v
                , en = v["".concat(p, "_g")] || null
                , ea = (0,
                i.LE)({
                start: M,
                complete: R
            });
            if (1 === q || 1 === U || 1 === W || 1 === V || 1 === z || 1 === H) {
                let e, n, r;
                G > 0 ? e = (0,
                    a.jsx)("h5", {
                    children: "Progress"
                }) : (en > 0 || j > 0) && (e = (0,
                    a.jsx)("h5", {
                    children: "Time to Beat"
                })),
                G > 0 && (n = (0,
                    i.wm)(G, "hms") + " / "),
                    en > 0 ? r = (0,
                        a.jsx)("strong", {
                        children: (0,
                            i.wm)(en, "hms")
                    }) : j > 0 && (r = (0,
                        a.jsx)("strong", {
                        style: {
                            color: "#707070"
                        },
                        children: (0,
                            i.wm)(j, "hms")
                    })),
                    t = (0,
                        a.jsxs)("div", {
                        children: [e, (0,
                            a.jsx)("div", {
                            className: o().user_game_main,
                            children: n || r ? (0,
                                a.jsxs)("span", {
                                className: "back_light",
                                children: [n, r]
                            }) : null
                        })]
                    })
            }
            let er = "";
            return (N > 0 || w && "" !== w) && (n = (0,
                a.jsxs)(a.Fragment, {
                children: [(0,
                    a.jsx)("h5", {
                    children: "Main Story"
                }), (0,
                    a.jsx)("div", {
                    className: o().user_game_main,
                    children: (0,
                        a.jsx)("span", {
                        className: "back_light",
                        children: N > 0 && (0,
                            a.jsx)(a.Fragment, {
                            children: (0,
                                i.wm)(N, "hms")
                        })
                    })
                }), w && "" !== w && (0,
                    a.jsxs)(a.Fragment, {
                    children: [(0,
                        a.jsx)("h5", {
                        children: "Notes"
                    }), " ", (0,
                        a.jsx)("div", {
                        className: o().user_game_main,
                        children: w
                    })]
                })]
            })),
            (k > 0 || S && "" !== S) && (s = (0,
                a.jsxs)(a.Fragment, {
                children: [(0,
                    a.jsx)("h5", {
                    children: "Main+Extras"
                }), (0,
                    a.jsx)("div", {
                    className: o().user_game_main,
                    children: (0,
                        a.jsx)("span", {
                        className: "back_light",
                        children: k > 0 && (0,
                            a.jsx)(a.Fragment, {
                            children: (0,
                                i.wm)(k, "hms")
                        })
                    })
                }), S && "" !== S && (0,
                    a.jsxs)(a.Fragment, {
                    children: [(0,
                        a.jsx)("h5", {
                        children: "Notes"
                    }), " ", (0,
                        a.jsx)("div", {
                        className: o().user_game_main,
                        children: S
                    })]
                })]
            })),
            (C > 0 || T && "" !== T) && (l = (0,
                a.jsxs)(a.Fragment, {
                children: [(0,
                    a.jsx)("h5", {
                    children: "Completionist"
                }), (0,
                    a.jsx)("div", {
                    className: o().user_game_main,
                    children: (0,
                        a.jsx)("span", {
                        className: "back_light",
                        children: C > 0 && (0,
                            a.jsx)(a.Fragment, {
                            children: (0,
                                i.wm)(C, "hms")
                        })
                    })
                }), T && "" !== T && (0,
                    a.jsxs)(a.Fragment, {
                    children: [(0,
                        a.jsx)("h5", {
                        children: "Notes"
                    }), " ", (0,
                        a.jsx)("div", {
                        className: o().user_game_main,
                        children: T
                    })]
                })]
            })),
            (E > 0 || A && "" !== A) && (c = (0,
                a.jsxs)(a.Fragment, {
                children: [(0,
                    a.jsx)("h5", {
                    children: "Speedrun"
                }), (0,
                    a.jsx)("div", {
                    className: o().user_game_main,
                    children: (0,
                        a.jsx)("span", {
                        className: "back_light",
                        children: E > 0 && (0,
                            a.jsx)(a.Fragment, {
                            children: (0,
                                i.wm)(E, "hms")
                        })
                    })
                }), A && "" !== A && (0,
                    a.jsxs)(a.Fragment, {
                    children: [(0,
                        a.jsx)("h5", {
                        children: "Notes"
                    }), " ", (0,
                        a.jsx)("div", {
                        className: o().user_game_main,
                        children: A
                    })]
                })]
            })),
            (P > 0 || O && "" !== O) && (d = (0,
                a.jsxs)(a.Fragment, {
                children: [(0,
                    a.jsx)("h5", {
                    children: "100% Speedrun"
                }), (0,
                    a.jsx)("div", {
                    className: o().user_game_main,
                    children: (0,
                        a.jsx)("span", {
                        className: "back_light",
                        children: P > 0 && (0,
                            a.jsx)(a.Fragment, {
                            children: (0,
                                i.wm)(P, "hms")
                        })
                    })
                }), O && "" !== O && (0,
                    a.jsxs)(a.Fragment, {
                    children: [(0,
                        a.jsx)("h5", {
                        children: "Notes"
                    }), " ", (0,
                        a.jsx)("div", {
                        className: o().user_game_main,
                        children: O
                    })]
                })]
            })),
                er = (0,
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
                        className: o().user_game_main,
                        children: (0,
                            a.jsx)("p", {
                            children: Y > 1 ? "Replay" : "First"
                        })
                    }), M && "0000-00-00" !== M && "" !== M && (0,
                        a.jsx)(a.Fragment, {
                        children: (0,
                            a.jsxs)("div", {
                            children: [(0,
                                a.jsx)("h5", {
                                children: "Started"
                            }), (0,
                                a.jsx)("div", {
                                className: o().user_game_main,
                                children: (0,
                                    a.jsx)("p", {
                                    children: (0,
                                        i._4)(M)
                                })
                            })]
                        })
                    }), 1 === B && R && "0000-00-00" !== R && "" !== R && (0,
                        a.jsx)(a.Fragment, {
                        children: (0,
                            a.jsxs)("div", {
                            children: [(0,
                                a.jsx)("h5", {
                                children: "Completion"
                            }), (0,
                                a.jsx)("div", {
                                className: o().user_game_main,
                                children: (0,
                                    a.jsx)("p", {
                                    className: "text_blue",
                                    children: (0,
                                        i._4)(R)
                                })
                            })]
                        })
                    }), 1 === B && ea > 0 && (0,
                        a.jsx)(a.Fragment, {
                        children: (0,
                            a.jsxs)("div", {
                            children: [(0,
                                a.jsx)("h5", {
                                children: "Days Taken"
                            }), (0,
                                a.jsx)("div", {
                                className: o().user_game_main,
                                children: (0,
                                    a.jsx)("p", {
                                    children: .1 === ea ? "Same Day" : ea
                                })
                            })]
                        })
                    }), n, s, l, c, d]
                }),
            (L > 0 || F > 0) && (u = (0,
                a.jsxs)("div", {
                children: [(0,
                    a.jsx)("h4", {
                    className: "back_pink",
                    children: "Multi-Player"
                }), L > 0 && (0,
                    a.jsxs)(a.Fragment, {
                    children: [(0,
                        a.jsx)("h5", {
                        children: "Co-Op"
                    }), (0,
                        a.jsx)("div", {
                        className: o().user_game_main,
                        children: (0,
                            a.jsx)("span", {
                            className: "back_light",
                            children: (0,
                                i.wm)(L, "hms")
                        })
                    })]
                }), F > 0 && (0,
                    a.jsxs)(a.Fragment, {
                    children: [(0,
                        a.jsx)("h5", {
                        children: "Vs."
                    }), (0,
                        a.jsx)("div", {
                        className: o().user_game_main,
                        children: (0,
                            a.jsx)("span", {
                            className: "back_light",
                            children: (0,
                                i.wm)(F, "hms")
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
                            className: o().user_game_detail,
                            children: [(0,
                                a.jsxs)("div", {
                                children: [(0,
                                    a.jsx)("h5", {
                                    children: "Lists"
                                }), (0,
                                    a.jsxs)("div", {
                                    className: o().user_game_main,
                                    children: [1 === q && (0,
                                        a.jsxs)(a.Fragment, {
                                        children: [(0,
                                            a.jsx)("span", {
                                            className: "back_green",
                                            children: "Playing"
                                        }), " "]
                                    }), 1 === U && (0,
                                        a.jsxs)(a.Fragment, {
                                        children: [(0,
                                            a.jsx)("span", {
                                            className: "back_blue",
                                            children: "Backlog"
                                        }), " "]
                                    }), 1 === W && (0,
                                        a.jsxs)(a.Fragment, {
                                        children: [(0,
                                            a.jsx)("span", {
                                            className: "back_blue",
                                            children: "Replay"
                                        }), " "]
                                    }), 1 === V && (0,
                                        a.jsxs)(a.Fragment, {
                                        children: [(0,
                                            a.jsx)("span", {
                                            className: "back_teal",
                                            children: g && void 0 !== _.set_customtab && "" !== _.set_customtab ? null == _ ? void 0 : _.set_customtab : "Custom List"
                                        }), " "]
                                    }), 1 === z && (0,
                                        a.jsxs)(a.Fragment, {
                                        children: [(0,
                                            a.jsx)("span", {
                                            className: "back_teal",
                                            children: g && void 0 !== _.set_customtab2 && "" !== _.set_customtab2 ? null == _ ? void 0 : _.set_customtab2 : "Custom List 2"
                                        }), " "]
                                    }), 1 === H && (0,
                                        a.jsxs)(a.Fragment, {
                                        children: [(0,
                                            a.jsx)("span", {
                                            className: "back_teal",
                                            children: g && void 0 !== _.set_customtab3 && "" !== _.set_customtab3 ? null == _ ? void 0 : _.set_customtab3 : "Custom List 3"
                                        }), " "]
                                    }), 1 === B && (0,
                                        a.jsxs)(a.Fragment, {
                                        children: [(0,
                                            a.jsx)("span", {
                                            className: "back_purple",
                                            children: "Completed"
                                        }), " "]
                                    }), 1 === X && (0,
                                        a.jsxs)(a.Fragment, {
                                        children: [(0,
                                            a.jsx)("span", {
                                            className: "back_red",
                                            children: "Retired"
                                        }), " "]
                                    })]
                                })]
                            }), t, 1 === X && K && "" !== K && (0,
                                a.jsxs)(a.Fragment, {
                                children: [(0,
                                    a.jsx)("h5", {
                                    className: "text_red",
                                    children: "Retired Notes"
                                }), (0,
                                    a.jsx)("div", {
                                    className: o().user_game_main,
                                    children: K
                                })]
                            }), er, u, (0,
                                a.jsx)("h4", {
                                className: "back_darkish",
                                children: "General"
                            }), J && "" !== J.trim() && (0,
                                a.jsxs)("div", {
                                children: [(0,
                                    a.jsx)("h5", {
                                    children: "Storefront"
                                }), (0,
                                    a.jsx)("div", {
                                    className: o().user_game_main,
                                    children: (0,
                                        a.jsx)("p", {
                                        children: J
                                    })
                                })]
                            }), Q && "" !== Q.trim() && (0,
                                a.jsxs)("div", {
                                children: [(0,
                                    a.jsx)("h5", {
                                    children: "Personal Notes"
                                }), (0,
                                    a.jsx)("div", {
                                    className: o().user_game_main,
                                    children: (0,
                                        a.jsx)("p", {
                                        children: Q
                                    })
                                })]
                            }), (ee > 0 || et > 0) && (0,
                                a.jsxs)("div", {
                                children: [(0,
                                    a.jsx)("h5", {
                                    children: "Rated"
                                }), (0,
                                    a.jsxs)("div", {
                                    className: o().user_game_main,
                                    children: [ee > 0 && (0,
                                        a.jsx)("p", {
                                        children: "User: ".concat((0,
                                            i.cf)({
                                            rating: ee,
                                            userScale: f || (null == _ ? void 0 : _.set_review_scale)
                                        }))
                                    }), et > 0 && (0,
                                        a.jsx)("p", {
                                        children: "Global: ".concat((0,
                                            i.cf)({
                                            rating: et,
                                            roundNearest: !1,
                                            userScale: f || (null == _ ? void 0 : _.set_review_scale)
                                        }))
                                    })]
                                })]
                            }), $ && "" !== $.trim() && (0,
                                a.jsxs)("div", {
                                children: [(0,
                                    a.jsx)("h5", {
                                    children: "Review"
                                }), (0,
                                    a.jsxs)("div", {
                                    className: o().youtube_video,
                                    children: [(0,
                                        a.jsx)("br", {
                                        className: "desktop_hide"
                                    }), (0,
                                        i.uW)({
                                        msg: $,
                                        allowedTags: ["quote", "spoiler", "b", "i", "u", "s"]
                                    })]
                                })]
                            }), "0000-00-00 00:00:00" !== I && "" !== I && I > D && (0,
                                a.jsxs)("div", {
                                children: [(0,
                                    a.jsx)("h5", {
                                    children: "Updated"
                                }), (0,
                                    a.jsx)("div", {
                                    className: o().user_game_main,
                                    children: (0,
                                        a.jsx)("p", {
                                        className: o().timestamp,
                                        onMouseOver: () => y("inline-block"),
                                        onMouseOut: () => y("none"),
                                        children: "0000-00-00 00:00:00" !== I && "inline-block" === b ? "".concat(I, " UTC") : (0,
                                            i.fF)(I)
                                    })
                                })]
                            }), "0000-00-00 00:00:00" !== D && "" !== D && (0,
                                a.jsxs)("div", {
                                children: [(0,
                                    a.jsx)("h5", {
                                    children: "Added"
                                }), (0,
                                    a.jsx)("div", {
                                    className: o().user_game_main,
                                    children: (0,
                                        a.jsx)("p", {
                                        className: o().timestamp,
                                        onMouseOver: () => y("inline-block"),
                                        onMouseOut: () => y("none"),
                                        children: "0000-00-00 00:00:00" !== D && "inline-block" === b ? "".concat(D, " UTC") : (0,
                                            i.fF)(D)
                                    })
                                })]
                            }), Z && (0,
                                a.jsxs)("div", {
                                children: [(0,
                                    a.jsx)("h5", {
                                    children: "Playthrough Video"
                                }), (0,
                                    a.jsx)("div", {
                                    className: o().youtube_video,
                                    children: (0,
                                        a.jsx)("iframe", {
                                        style: {
                                            maxWidth: "100%",
                                            width: "640px",
                                            height: "360px"
                                        },
                                        src: "https://www.youtube.com/embed/".concat(Z, "?rel=0"),
                                        frameBorder: "0",
                                        allowFullScreen: !0
                                    })
                                })]
                            })]
                        })
                    })
                })
        }
    }
    ,
    25271: (e, t, n) => {
        "use strict";
        n.d(t, {
            Q: () => o,
            i: () => l
        });
        var a = n(74848)
            , r = n(96540)
            , i = n(86715);
        let s = (0,
            r.createContext)({
            currentUser: {},
            setCurrentUser: () => {}
        });
        function o(e) {
            let {children: t} = e
                , [n,o] = (0,
                r.useState)({})
                , l = (0,
                i.useRouter)();
            async function c() {
                var e, t, n, a, r, i, s, c, d, u;
                let m = await fetch("/api/user", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                    , h = await m.json();
                if (!m.ok)
                    throw Error(h.message || "Something went wrong!");
                (null === (t = h.data) || void 0 === t ? void 0 : null === (e = t[0]) || void 0 === e ? void 0 : e.user_name) && ((null === (a = h.data) || void 0 === a ? void 0 : null === (n = a[0]) || void 0 === n ? void 0 : n.redirect) === "password" && ("/user/[userName]/options/account/[type]" !== l.pathname || "/login/unlock/[unlockCode]" !== l.pathname) ? l.push("/user/".concat(null === (c = h.data) || void 0 === c ? void 0 : null === (s = c[0]) || void 0 === s ? void 0 : s.user_name, "/options/account/password?forgot=true")) : (null === (i = h.data) || void 0 === i ? void 0 : null === (r = i[0]) || void 0 === r ? void 0 : r.redirect) === "email" && "/user/[userName]/options/account/[type]" !== l.pathname && l.push("/user/".concat(null === (u = h.data) || void 0 === u ? void 0 : null === (d = u[0]) || void 0 === d ? void 0 : d.user_name, "/options/account/email")),
                    o(h.data[0]))
            }
            let d = async () => {
                    let e = await fetch("/api/logout", {
                        method: "GET"
                    });
                    "success" === (await e.json()).status && (o({}),
                        l.push("/"))
                }
            ;
            return (0,
                r.useEffect)( () => {
                    "/logout" !== l.pathname && c()
                }
                , [l.pathname]),
                (0,
                    a.jsx)(s.Provider, {
                    value: {
                        logout: d,
                        currentUser: n,
                        setCurrentUser: o
                    },
                    children: t
                })
        }
        function l() {
            return (0,
                r.useContext)(s)
        }
    }
    ,
    30214: (e, t, n) => {
        "use strict";
        n.d(t, {
            Ay: () => h,
            Lt: () => u,
            SQ: () => m
        });
        var a = n(74848)
            , r = n(96540)
            , i = n(86715)
            , s = n.n(i)
            , o = n(25271)
            , l = n(81591)
            , c = n(22193);
        let d = (0,
            r.createContext)();
        function u(e) {
            var t, n;
            let {children: u} = e
                , {currentUser: m} = (0,
                o.i)()
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
                , [N,w] = (0,
                r.useState)("")
                , [k,S] = (0,
                r.useState)("popular")
                , [C,T] = (0,
                r.useState)("main")
                , [E,A] = (0,
                r.useState)()
                , [P,O] = (0,
                r.useState)()
                , [M,R] = (0,
                r.useState)("")
                , [I,D] = (0,
                r.useState)("")
                , [L,F] = (0,
                r.useState)("")
                , [G,U] = (0,
                r.useState)("")
                , [B,z] = (0,
                r.useState)("")
                , [H,V] = (0,
                r.useState)("")
                , [q,W] = (0,
                r.useState)("follows")
                , [X,Y] = (0,
                r.useState)("postcount")
                , [Q,J] = (0,
                r.useState)("")
                , [Z,K] = (0,
                r.useState)(0)
                , [$,ee] = (0,
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
                , es = (0,
                r.useCallback)( () => b(!1), [])
                , eo = async () => {
                var e, t;
                (0,
                    c.sx)({
                    eventName: "search",
                    params: {
                        search_type: g,
                        search_terms: y,
                        search_page: ea
                    }
                }),
                ((null == h ? void 0 : null === (t = h.query) || void 0 === t ? void 0 : null === (e = t.q) || void 0 === e ? void 0 : e.length) > 0 || (null == y ? void 0 : y.length) > 0) && s().replace({
                    pathname: h.pathname,
                    query: {
                        ...h.query,
                        q: encodeURIComponent(y)
                    }
                }, void 0, {
                    shallow: !0
                });
                let n = await fetch("/api/lookup/".concat("e6e71df5").concat("81a39f40"), {
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
                                sortCategory: k,
                                rangeCategory: C,
                                rangeTime: {
                                    min: parseInt(E),
                                    max: parseInt(P)
                                },
                                gameplay: {
                                    perspective: M,
                                    flow: I,
                                    genre: L,
                                    difficulty: ""
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
                                sortCategory: q
                            },
                            filter: Q,
                            sort: parseInt(Z),
                            randomizer: parseInt($)
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
                l.YQ)( () => {
                    eo()
                }
                , 1e3);
            return (0,
                r.useEffect)( () => {
                    var e, t;
                    (null == h ? void 0 : null === (t = h.query) || void 0 === t ? void 0 : null === (e = t.q) || void 0 === e ? void 0 : e.length) >= 0 ? ei() : x && es()
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
                            eo())
                    }
                    , [x]),
                (0,
                    r.useEffect)( () => {
                        x && (en({
                            count: 0,
                            data: []
                        }),
                            _(!0),
                            eo())
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
                    , [g, y, N, k, C, E, P, M, I, L, G, B, H, q, X, Q, Z, $]),
                (0,
                    a.jsx)(d.Provider, {
                    value: {
                        debounce: el,
                        isLoading: f,
                        searchType: g,
                        setSearchType: v,
                        isVisible: x,
                        searchTerms: y,
                        setSearchTerms: j,
                        searchPlatform: N,
                        setSearchPlatform: w,
                        searchSortCategory: k,
                        setSearchSortCategory: S,
                        searchRangeCategory: C,
                        setSearchRangeCategory: T,
                        searchRangeTimeMin: E,
                        setSearchRangeTimeMin: A,
                        searchRangeTimeMax: P,
                        setSearchRangeTimeMax: O,
                        searchPerspective: M,
                        setSearchPerspective: R,
                        searchFlow: I,
                        setSearchFlow: D,
                        searchGenre: L,
                        setSearchGenre: F,
                        searchRangeYearMin: G,
                        setSearchRangeYearMin: U,
                        searchRangeYearMax: B,
                        setSearchRangeYearMax: z,
                        searchModifier: H,
                        setSearchModifier: V,
                        searchSortList: q,
                        setSearchSortList: W,
                        searchSortUser: X,
                        setSearchSortUser: Y,
                        searchFilter: Q,
                        setSearchFilter: J,
                        searchOrder: Z,
                        setSearchOrder: K,
                        searchRandomizer: $,
                        setSearchRandomizer: ee,
                        results: et,
                        searchPage: ea,
                        setSearchPage: er,
                        openSearch: ei,
                        closeSearch: es
                    },
                    children: u
                })
        }
        function m() {
            return (0,
                r.useContext)(d)
        }
        let h = d
    }
    ,
    22193: (e, t, n) => {
        "use strict";
        n.d(t, {
            $q: () => i,
            Vz: () => r,
            sx: () => s
        });
        var a = n(79279);
        let r = () => {
            (0,
                a.ai)("G-LNSNNH2NMQ")
        }
            , i = e => {
            let {url: t, title: n, eventLabel: r="page_view", universalParams: i} = e;
            (0,
                a.w6)("event", r, {
                page_view: 1,
                page_location: t,
                page_title: n,
                ...i
            })
        }
            , s = e => {
            let {eventName: t, params: n={}} = e;
            (0,
                a.w6)("event", t, {
                engagement: 1,
                ...n
            })
        }
    }
    ,
    44103: (e, t, n) => {
        "use strict";
        n.d(t, {
            uY: () => j,
            uW: () => I,
            Cb: () => v,
            pY: () => b,
            kE: () => M,
            _4: () => P,
            bf: () => T,
            LE: () => E,
            cf: () => y,
            ZV: () => C,
            YW: () => s,
            Ls: () => d,
            s9: () => g,
            w_: () => u,
            TQ: () => D,
            ph: () => c,
            Z$: () => L,
            kr: () => h,
            Xy: () => m,
            n5: () => _,
            F0: () => k,
            Bd: () => p,
            WB: () => S,
            dS: () => x,
            SA: () => R,
            rR: () => f,
            LI: () => o,
            wx: () => l,
            c7: () => N,
            wm: () => w,
            zT: () => F,
            fF: () => A
        });
        var a = n(84074)
            , r = n(50442);
        let i = r.default || r
            , s = 25;
        function o(e, t) {
            let n = Math.pow(10, t || 0);
            return Math.round(e * n) / n
        }
        function l(e, t) {
            return Math.round(e / t) * t
        }
        let c = ["First-Person", "Isometric", "Side", "Text", "Third-Person", "Top-Down", "Virtual Reality"]
            , d = ["Incremental", "Massively Multiplayer", "Multidirectional", "On-Rails", "Point-and-Click", "Real-Time", "Scrolling", "Turn-Based"]
            , u = ["Action", "Adventure", "Arcade", "Battle Arena", "Beat em Up", "Board Game", "Breakout", "Card Game", "City-Building", "Compilation", "Educational", "Fighting", "Fitness", "Flight", "Full Motion Video (FMV)", "Hack and Slash", "Hidden Object", "Horror", "Interactive Art", "Management", "Music/Rhythm", "Open World", "Party", "Pinball", "Platform", "Puzzle", "Racing/Driving", "Roguelike", "Role-Playing", "Sandbox", "Shooter", "Simulation", "Social", "Sports", "Stealth", "Strategy/Tactical", "Survival", "Tower Defense", "Trivia", "Vehicular Combat", "Visual Novel"]
            , m = ["Android", "Emulated", "iOS", "PC VR", "PlayStation Now", "PlayStation VR", "PlayStation VR2"]
            , h = ["3DO", "Acorn Archimedes", "Amazon Luna", "Amiga", "Amiga CD32", "Amstrad CPC", "Apple II", "Arcade", "Atari 2600", "Atari 5200", "Atari 7800", "Atari 8-bit Family", "Atari Jaguar", "Atari Jaguar CD", "Atari Lynx", "Atari ST", "BBC Micro", "Browser", "ColecoVision", "Commodore 64", "Commodore PET", "Commodore VIC-20", "Dreamcast", "Evercade", "FM Towns", "FM-7", "Game & Watch", "Game Boy", "Game Boy Advance", "Game Boy Color", "Gear VR", "Google Stadia", "Gizmondo", "Intellivision", "Interactive Movie", "Linux", "Mac", "Meta Quest", "Mobile", "MSX", "N-Gage", "NEC PC-88", "NEC PC-98", "NEC PC-FX", "Neo Geo", "Neo Geo CD", "Neo Geo Pocket", "NES", "Nintendo 3DS", "Nintendo 64", "Nintendo DS", "Nintendo GameCube", "Nintendo Switch", "Oculus Go", "Odyssey", "Odyssey 2", "OnLive", "Ouya", "PC", "Philips CD-i", "Playdate", "PlayStation", "PlayStation 2", "PlayStation 3", "PlayStation 4", "PlayStation 5", "PlayStation Mobile", "PlayStation Portable", "PlayStation Vita", "Plug & Play", "Sega 32X", "Sega CD", "Sega Game Gear", "Sega Master System", "Sega Mega Drive/Genesis", "Sega Pico", "Sega Saturn", "SG-1000", "Sharp X1", "Sharp X68000", "Super Nintendo", "Tiger Handheld", "TurboGrafx-16", "TurboGrafx-CD", "Vectrex", "Virtual Boy", "Wii", "Wii U", "Windows Phone", "WonderSwan", "Xbox", "Xbox 360", "Xbox One", "Xbox Series X/S", "Zeebo", "ZX81", "ZX Spectrum"]
            , p = [{
            Digital: ["Amazon Game App", "Amazon Luna", "Apple App Store", "Arc", "Battle.net", "Bethesda", "Direct Download", "Discord", "EA App", "Epic Games", "GameCenter", "Game Jolt", "GOG", "Google Play", "Google Stadia", "Humble Bundle", "IndieGala", "itch.io", "JAST USA", "Kartridge", "Legacy Games", "Meta Store", "Microsoft Store", "Nintendo eShop", "Paradox Games", "Playdate Catalog", "PlayStation Store", "Robot Cache", "Rockstar Games", "Steam", "Ubisoft Connect", "Xbox Store"]
        }, {
            Physical: ["Borrowed", "Physical", "Rented"]
        }, {
            Subscription: ["Antstream Arcade", "Apple Arcade", "EA Play", "Google Play Pass", "Google Stadia Pro", "Meta Quest+", "Netflix", "Nintendo Online", "PlayStation Now", "PlayStation Plus", "Ubisoft+", "Viveport", "Xbox Game Pass", "Xbox Games w/ Gold"]
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
                1 === a ? (t = !0 === n ? l(t, 5) * a : o(t * Number(a)),
                !1 === r && (t = "".concat(t, "%"))) : .1 === a ? (t = !0 === n ? l(t, 10) * a : o(t * Number(a), 1),
                !1 === r && (t = "".concat(t, "/10"))) : .05 === a && (t = !0 === n ? l(t, 20) * a : o(t * Number(a), 1),
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
        function w(e) {
            let t, n, a, r, i, s, o, l, c, d = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "hm", u = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "short";
            if (isNaN(e) || e < 1)
                return "--";
            switch (u) {
                case "long":
                    t = " Days ",
                        n = " Hours ",
                        a = " Mins ",
                        r = " Secs";
                    break;
                case "digital":
                    t = n = a = ":",
                        r = "",
                        d = "hms";
                    break;
                default:
                    u = "short",
                        t = "d ",
                        n = "h ",
                        a = "m ",
                        r = "s"
            }
            switch (i = Math.floor(e / 60 / 60 / 24),
                s = Math.floor(e / 3600) % 24,
                l = Math.floor(e / 60) % 60,
                c = e % 60,
                d) {
                case "dh":
                    l >= 30 && (s += 1),
                        l = c = 0,
                        a = r = "";
                    break;
                case "h":
                    (s += 24 * i) > 0 ? ("short" === u ? l >= 30 && (s += 1) : l >= 45 ? s += 1 : s < 100 && l > 15 && l < 45 && "long" === u && (o = "\xbd"),
                        i = l = c = 0,
                        t = a = r = "") : (l > 15 ? l += 0 : l > 7 && l <= 15 ? l = 15 : c > 0 && (l = 5),
                        c = 0,
                        r = ""),
                        i = 0,
                        t = "";
                    break;
                case "hm":
                    s += 24 * i,
                        i = c = 0,
                        t = r = "";
                    break;
                case "hms":
                    s += 24 * i,
                        i = 0,
                        t = ""
            }
            return ("digital" === u && (d.indexOf("m") > 0 && (l = l.toString().padStart(2, "0")),
            d.indexOf("s") > 0 && (c = c.toString().padStart(2, "0"))),
            i > 0 || s > 0 || l > 0 || "digital" === u) ? "".concat(i > 0 ? "".concat(i).concat(t) : "").concat(s > 0 ? "".concat(s).concat(o || "").concat(n) : "").concat(l > 0 || "digital" === u ? "".concat(l).concat(a) : "").concat(c > 0 || "digital" === u ? "".concat(c).concat(r) : "").trim() : c < 60 && c > 0 ? "".concat(c).concat(r).trim() : "digital" !== u ? "--" : void 0
        }
        function k(e) {
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
            return !isNaN(e) && (e = e >= 1e6 ? o(e / 1e6, 1) + "M" : e >= 1e3 ? o(e / 1e3, 1) + "K" : e.toLocaleString())
        }
        function T(e) {
            return {
                year: (null == e ? void 0 : e.substring(0, 4)) ? null == e ? void 0 : e.substring(0, 4) : "0000",
                month: (null == e ? void 0 : e.substring(5, 7)) ? null == e ? void 0 : e.substring(5, 7) : "00",
                day: (null == e ? void 0 : e.substring(8, 10)) ? null == e ? void 0 : e.substring(8, 10) : "00"
            }
        }
        function E(e) {
            let {start: t, complete: n} = e
                , a = e => {
                    try {
                        let[t,n,a] = e.split("-").map(Number);
                        return t > 0 && n > 0 && a > 0
                    } catch (e) {
                        return !1
                    }
                }
            ;
            if (!t || !a(t) || !n || !a(n))
                return 0;
            if (t === n)
                return .1;
            let r = new Date(t)
                , i = new Date(n);
            return r >= i ? 0 : Math.ceil(Math.abs(i - r) / 864e5)
        }
        function A(e) {
            if (e) {
                let t, n;
                let a = ["Sec", "Min", "Hour", "Day", "Week", "Month", "Year", "Decade"]
                    , r = [60, 60, 24, 7, 4.35, 12, 10];
                e = e.replace(" ", "T");
                let i = new Date().getUTCFullYear()
                    , s = String(new Date().getUTCMonth() + 1).padStart(2, "0")
                    , l = String(new Date().getUTCDate()).padStart(2, "0")
                    , c = String(new Date().getUTCHours()).padStart(2, "0")
                    , d = String(new Date().getUTCMinutes()).padStart(2, "0")
                    , u = String(new Date().getUTCSeconds()).padStart(2, "0")
                    , m = 0
                    , h = Math.floor(Date.parse("".concat(i, "-").concat(s, "-").concat(l, "T").concat(c, ":").concat(d, ":").concat(u)) / 1e3)
                    , p = Math.floor(Date.parse(e) / 1e3);
                if (!p)
                    return "";
                h > p || h === p ? (t = h - p,
                    n = "Ago") : (t = p - h,
                    n = "From Now");
                for (let e = 0; t >= r[e] && e < r.length - 1; e++)
                    t /= r[e],
                        m = e + 1;
                return (1 !== (t = "Sec" === a[m] || "Min" === a[m] ? o(t) : Math.floor(2 * t) / 2) && (a[m] = "".concat(a[m], "s")),
                p > h && p < h + 60) ? "Now" : "".concat(t, " ").concat(a[m], " ").concat(n)
            }
        }
        function P(e) {
            let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "long";
            if (!e || "0000-00-00" === e || "null" === e)
                return "--";
            try {
                let[n,a,r] = e.substring(0, 10).split("-").map(Number)
                    , i = ("long" === t ? ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"] : ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"])[a]
                    , s = "";
                if (n && a && r)
                    s = "".concat(i, " ").concat(r).concat(O(r), ", ").concat(n);
                else if (n && a)
                    s = "".concat(i, " ").concat(n);
                else if (r && a)
                    s = "".concat(i, " ").concat(r).concat(O(r));
                else if (n)
                    s = "".concat(n);
                else {
                    if (!a)
                        return "--";
                    s = "".concat(i)
                }
                return s
            } catch (e) {
                return "--"
            }
        }
        let O = e => {
                if (e > 3 && e < 21)
                    return "th";
                switch (e % 10) {
                    case 1:
                        return "st";
                    case 2:
                        return "nd";
                    case 3:
                        return "rd";
                    default:
                        return "th"
                }
            }
        ;
        function M(e) {
            var t;
            return (null == e ? void 0 : null === (t = e.match(/(?:https?:\/\/)?(?:www\.)?youtu(?:\.be\/|be.com\/\S*(?:watch|embed)(?:(?:(?=\/[^&\s?]+(?!\S))\/)|(?:\S*v=|v\/)))([^&\s?)#]+)/)) || void 0 === t ? void 0 : t[1]) || null
        }
        function R(e) {
            return e && "" !== e ? i((0,
                a.sanitize)(e, {
                ALLOWED_TAGS: ["a", "blockquote", "span", "img", "iframe", "strong", "em", "u", "s", "br"],
                ALLOWED_ATTR: ["class", "rel", "href", "target", "title", "src", "alt", "width", "height", "style", "frameborder", "allowfullscreen"],
                RETURN_TRUSTED_TYPE: !0
            }).toString()) : null
        }
        function I(e) {
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
                            , s = e[2]
                            , o = e[3];
                        switch (i.toLowerCase()) {
                            case "b":
                                n = "<strong>".concat(o, "</strong>");
                                break;
                            case "i":
                                n = "<em>".concat(o, "</em>");
                                break;
                            case "u":
                                n = "<u>".concat(o, "</u>");
                                break;
                            case "s":
                                n = "<s>".concat(o, "</s>");
                                break;
                            case "quote":
                                n = s ? "Originally Posted by: <strong>".concat(s, "</strong><br/><blockquote>").concat(o, "</blockquote>") : "<blockquote>".concat(o, "</blockquote>");
                                break;
                            case "spoiler":
                                n = '<span class="spoiler">'.concat(o, "</span>");
                                break;
                            case "url":
                                n = '<a rel="nofollow noopener noreferrer" target="_blank" href="'.concat(s || o, '">').concat(o, "</a>");
                                break;
                            case "img":
                                n = '<img alt="User Image" src="'.concat(o, '" />');
                                break;
                            case "youtube":
                                var l;
                                (a = null === (l = o.match(/(?:https?:\/\/)?(?:www\.)?youtu(?:\.be\/|be.com\/\S*(?:watch|embed)(?:(?:(?=\/[^&\s?]+(?!\S))\/)|(?:\S*v=|v\/)))([^&\s?)#]+)/)) || void 0 === l ? void 0 : l[1]) && (n = '<iframe style="max-width:100%;width:640px;height:360px;" title="'.concat(a, '" src="https://www.youtube.com/embed/').concat(a, '?rel=0" frameborder="0" allowfullscreen></iframe>'))
                        }
                        t = t.replace(r, n)
                    }
                );
            return R(t)
        }
        function D(e) {
            let t = !(arguments.length > 1) || void 0 === arguments[1] || arguments[1];
            return 1 === e.list_playing && !0 === t ? "green" : 1 === e.list_comp ? "purple" : 1 === e.list_retired ? "red" : 1 === e.list_custom || 1 === e.list_custom2 || 1 === e.list_custom3 ? "teal" : 1 === e.list_replay ? "blueish" : "blue"
        }
        function L(e) {
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
        function F(e) {
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
    }
    ,
    292: (e, t, n) => {
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
            R: () => a
        })
    }
    ,
    40627: (e, t) => {
        "use strict";
        var n, a;
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
                ACTION_HMR_REFRESH: function() {
                    return c
                },
                ACTION_NAVIGATE: function() {
                    return i
                },
                ACTION_PREFETCH: function() {
                    return l
                },
                ACTION_REFRESH: function() {
                    return r
                },
                ACTION_RESTORE: function() {
                    return s
                },
                ACTION_SERVER_ACTION: function() {
                    return d
                },
                ACTION_SERVER_PATCH: function() {
                    return o
                },
                PrefetchCacheEntryStatus: function() {
                    return a
                },
                PrefetchKind: function() {
                    return n
                }
            });
        let r = "refresh"
            , i = "navigate"
            , s = "restore"
            , o = "server-patch"
            , l = "prefetch"
            , c = "hmr-refresh"
            , d = "server-action";
        !function(e) {
            e.AUTO = "auto",
                e.FULL = "full",
                e.TEMPORARY = "temporary"
        }(n || (n = {})),
            function(e) {
                e.fresh = "fresh",
                    e.reusable = "reusable",
                    e.expired = "expired",
                    e.stale = "stale"
            }(a || (a = {})),
        ("function" == typeof t.default || "object" == typeof t.default && null !== t.default) && void 0 === t.default.__esModule && (Object.defineProperty(t.default, "__esModule", {
            value: !0
        }),
            Object.assign(t.default, t),
            e.exports = t.default)
    }
    ,
    15157: (e, t, n) => {
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
            n(2063),
        ("function" == typeof t.default || "object" == typeof t.default && null !== t.default) && void 0 === t.default.__esModule && (Object.defineProperty(t.default, "__esModule", {
            value: !0
        }),
            Object.assign(t.default, t),
            e.exports = t.default)
    }
    ,
    36526: (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
            Object.defineProperty(t, "Image", {
                enumerable: !0,
                get: function() {
                    return b
                }
            });
        let a = n(87677)
            , r = n(40544)
            , i = n(74848)
            , s = r._(n(96540))
            , o = a._(n(40961))
            , l = a._(n(86085))
            , c = n(87282)
            , d = n(72105)
            , u = n(59641);
        n(27679);
        let m = n(47644)
            , h = a._(n(15472))
            , p = n(1903)
            , f = {
            deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
            imageSizes: [80, 100, 160, 200, 250, 380, 500],
            path: "/_next/image",
            loader: "default",
            dangerouslyAllowSVG: !1,
            unoptimized: !1
        };
        function _(e, t, n, a, r, i, s) {
            let o = null == e ? void 0 : e.src;
            e && e["data-loaded-src"] !== o && (e["data-loaded-src"] = o,
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
        function g(e) {
            return s.use ? {
                fetchPriority: e
            } : {
                fetchpriority: e
            }
        }
        let v = (0,
            s.forwardRef)( (e, t) => {
                let {src: n, srcSet: a, sizes: r, height: o, width: l, decoding: c, className: d, style: u, fetchPriority: m, placeholder: h, loading: f, unoptimized: v, fill: x, onLoadRef: b, onLoadingCompleteRef: y, setBlurComplete: j, setShowAltText: N, sizesInput: w, onLoad: k, onError: S, ...C} = e
                    , T = (0,
                    s.useCallback)(e => {
                        e && (S && (e.src = e.src),
                        e.complete && _(e, h, b, y, j, v, w))
                    }
                    , [n, h, b, y, j, S, v, w])
                    , E = (0,
                    p.useMergedRef)(t, T);
                return (0,
                    i.jsx)("img", {
                    ...C,
                    ...g(m),
                    loading: f,
                    width: l,
                    height: o,
                    decoding: c,
                    "data-nimg": x ? "fill" : "1",
                    className: d,
                    style: u,
                    sizes: r,
                    srcSet: a,
                    src: n,
                    ref: E,
                    onLoad: e => {
                        _(e.currentTarget, h, b, y, j, v, w)
                    }
                    ,
                    onError: e => {
                        N(!0),
                        "empty" !== h && j(!0),
                        S && S(e)
                    }
                })
            }
        );
        function x(e) {
            let {isAppRouter: t, imgAttributes: n} = e
                , a = {
                as: "image",
                imageSrcSet: n.srcSet,
                imageSizes: n.sizes,
                crossOrigin: n.crossOrigin,
                referrerPolicy: n.referrerPolicy,
                ...g(n.fetchPriority)
            };
            return t && o.default.preload ? (o.default.preload(n.src, a),
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
        let b = (0,
            s.forwardRef)( (e, t) => {
                let n = (0,
                    s.useContext)(m.RouterContext)
                    , a = (0,
                    s.useContext)(u.ImageConfigContext)
                    , r = (0,
                    s.useMemo)( () => {
                        let e = f || a || d.imageConfigDefault
                            , t = [...e.deviceSizes, ...e.imageSizes].sort( (e, t) => e - t)
                            , n = e.deviceSizes.sort( (e, t) => e - t);
                        return {
                            ...e,
                            allSizes: t,
                            deviceSizes: n
                        }
                    }
                    , [a])
                    , {onLoad: o, onLoadingComplete: l} = e
                    , p = (0,
                    s.useRef)(o);
                (0,
                    s.useEffect)( () => {
                        p.current = o
                    }
                    , [o]);
                let _ = (0,
                    s.useRef)(l);
                (0,
                    s.useEffect)( () => {
                        _.current = l
                    }
                    , [l]);
                let[g,b] = (0,
                    s.useState)(!1)
                    , [y,j] = (0,
                    s.useState)(!1)
                    , {props: N, meta: w} = (0,
                    c.getImgProps)(e, {
                    defaultLoader: h.default,
                    imgConf: r,
                    blurComplete: g,
                    showAltText: y
                });
                return (0,
                    i.jsxs)(i.Fragment, {
                    children: [(0,
                        i.jsx)(v, {
                        ...N,
                        unoptimized: w.unoptimized,
                        placeholder: w.placeholder,
                        fill: w.fill,
                        onLoadRef: p,
                        onLoadingCompleteRef: _,
                        setBlurComplete: b,
                        setShowAltText: j,
                        sizesInput: e.sizes,
                        ref: t
                    }), w.priority ? (0,
                        i.jsx)(x, {
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
    }
    ,
    6397: (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
            Object.defineProperty(t, "default", {
                enumerable: !0,
                get: function() {
                    return y
                }
            });
        let a = n(87677)
            , r = n(74848)
            , i = a._(n(96540))
            , s = n(56847)
            , o = n(27785)
            , l = n(42772)
            , c = n(1278)
            , d = n(26185)
            , u = n(47644)
            , m = n(99258)
            , h = n(56334)
            , p = n(15157)
            , f = n(90296)
            , _ = n(40627)
            , g = n(1903)
            , v = new Set;
        function x(e, t, n, a, r, i) {
            if (i || (0,
                o.isLocalURL)(t)) {
                if (!a.bypassPrefetchedCheck && !i) {
                    let r = t + "%" + n + "%" + (void 0 !== a.locale ? a.locale : "locale"in e ? e.locale : void 0);
                    if (v.has(r))
                        return;
                    v.add(r)
                }
                (async () => i ? e.prefetch(t, r) : e.prefetch(t, n, a))().catch(e => {}
                )
            }
        }
        function b(e) {
            return "string" == typeof e ? e : (0,
                l.formatUrl)(e)
        }
        let y = i.default.forwardRef(function(e, t) {
            let n, a;
            let {href: l, as: v, children: y, prefetch: j=null, passHref: N, replace: w, shallow: k, scroll: S, locale: C, onClick: T, onMouseEnter: E, onTouchStart: A, legacyBehavior: P=!1, ...O} = e;
            n = y,
            P && ("string" == typeof n || "number" == typeof n) && (n = (0,
                r.jsx)("a", {
                children: n
            }));
            let M = i.default.useContext(u.RouterContext)
                , R = i.default.useContext(m.AppRouterContext)
                , I = null != M ? M : R
                , D = !M
                , L = !1 !== j
                , F = null === j ? _.PrefetchKind.AUTO : _.PrefetchKind.FULL
                , {href: G, as: U} = i.default.useMemo( () => {
                    if (!M) {
                        let e = b(l);
                        return {
                            href: e,
                            as: v ? b(v) : e
                        }
                    }
                    let[e,t] = (0,
                        s.resolveHref)(M, l, !0);
                    return {
                        href: e,
                        as: v ? (0,
                            s.resolveHref)(M, v) : t || e
                    }
                }
                , [M, l, v])
                , B = i.default.useRef(G)
                , z = i.default.useRef(U);
            P && (a = i.default.Children.only(n));
            let H = P ? a && "object" == typeof a && a.ref : t
                , [V,q,W] = (0,
                h.useIntersection)({
                rootMargin: "200px"
            })
                , X = i.default.useCallback(e => {
                    (z.current !== U || B.current !== G) && (W(),
                        z.current = U,
                        B.current = G),
                        V(e)
                }
                , [U, G, W, V])
                , Y = (0,
                g.useMergedRef)(X, H);
            i.default.useEffect( () => {
                    I && q && L && x(I, G, U, {
                        locale: C
                    }, {
                        kind: F
                    }, D)
                }
                , [U, G, q, C, L, null == M ? void 0 : M.locale, I, D, F]);
            let Q = {
                ref: Y,
                onClick(e) {
                    P || "function" != typeof T || T(e),
                    P && a.props && "function" == typeof a.props.onClick && a.props.onClick(e),
                    I && !e.defaultPrevented && function(e, t, n, a, r, s, l, c, d) {
                        let {nodeName: u} = e.currentTarget;
                        if ("A" === u.toUpperCase() && (function(e) {
                            let t = e.currentTarget.getAttribute("target");
                            return t && "_self" !== t || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.nativeEvent && 2 === e.nativeEvent.which
                        }(e) || !d && !(0,
                            o.isLocalURL)(n)))
                            return;
                        e.preventDefault();
                        let m = () => {
                                let e = null == l || l;
                                "beforePopState"in t ? t[r ? "replace" : "push"](n, a, {
                                    shallow: s,
                                    locale: c,
                                    scroll: e
                                }) : t[r ? "replace" : "push"](a || n, {
                                    scroll: e
                                })
                            }
                        ;
                        d ? i.default.startTransition(m) : m()
                    }(e, I, G, U, w, k, S, C, D)
                },
                onMouseEnter(e) {
                    P || "function" != typeof E || E(e),
                    P && a.props && "function" == typeof a.props.onMouseEnter && a.props.onMouseEnter(e),
                    I && (L || !D) && x(I, G, U, {
                        locale: C,
                        priority: !0,
                        bypassPrefetchedCheck: !0
                    }, {
                        kind: F
                    }, D)
                },
                onTouchStart: function(e) {
                    P || "function" != typeof A || A(e),
                    P && a.props && "function" == typeof a.props.onTouchStart && a.props.onTouchStart(e),
                    I && (L || !D) && x(I, G, U, {
                        locale: C,
                        priority: !0,
                        bypassPrefetchedCheck: !0
                    }, {
                        kind: F
                    }, D)
                }
            };
            if ((0,
                c.isAbsoluteUrl)(U))
                Q.href = U;
            else if (!P || N || "a" === a.type && !("href"in a.props)) {
                let e = void 0 !== C ? C : null == M ? void 0 : M.locale
                    , t = (null == M ? void 0 : M.isLocaleDomain) && (0,
                    p.getDomainLocale)(U, e, null == M ? void 0 : M.locales, null == M ? void 0 : M.domainLocales);
                Q.href = t || (0,
                    f.addBasePath)((0,
                    d.addLocale)(U, e, null == M ? void 0 : M.defaultLocale))
            }
            return P ? i.default.cloneElement(a, Q) : (0,
                r.jsx)("a", {
                ...O,
                ...Q,
                children: n
            })
        });
        ("function" == typeof t.default || "object" == typeof t.default && null !== t.default) && void 0 === t.default.__esModule && (Object.defineProperty(t.default, "__esModule", {
            value: !0
        }),
            Object.assign(t.default, t),
            e.exports = t.default)
    }
    ,
    56334: (e, t, n) => {
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
        let a = n(96540)
            , r = n(74959)
            , i = "function" == typeof IntersectionObserver
            , s = new Map
            , o = [];
        function l(e) {
            let {rootRef: t, rootMargin: n, disabled: l} = e
                , c = l || !i
                , [d,u] = (0,
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
                        if (c || d)
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
                                        , a = o.find(e => e.root === n.root && e.margin === n.margin);
                                    if (a && (t = s.get(a)))
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
                                        o.push(n),
                                        s.set(n, t),
                                        t
                                }(n);
                                return i.set(e, t),
                                    r.observe(e),
                                    function() {
                                        if (i.delete(e),
                                            r.unobserve(e),
                                        0 === i.size) {
                                            r.disconnect(),
                                                s.delete(a);
                                            let e = o.findIndex(e => e.root === a.root && e.margin === a.margin);
                                            e > -1 && o.splice(e, 1)
                                        }
                                    }
                            }(e, e => e && u(e), {
                                root: null == t ? void 0 : t.current,
                                rootMargin: n
                            })
                    } else if (!d) {
                        let e = (0,
                            r.requestIdleCallback)( () => u(!0));
                        return () => (0,
                            r.cancelIdleCallback)(e)
                    }
                }
                , [c, n, t, d, m.current]),
                [h, d, (0,
                    a.useCallback)( () => {
                        u(!1)
                    }
                    , [])]
        }
        ("function" == typeof t.default || "object" == typeof t.default && null !== t.default) && void 0 === t.default.__esModule && (Object.defineProperty(t.default, "__esModule", {
            value: !0
        }),
            Object.assign(t.default, t),
            e.exports = t.default)
    }
    ,
    1903: (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
            Object.defineProperty(t, "useMergedRef", {
                enumerable: !0,
                get: function() {
                    return r
                }
            });
        let a = n(96540);
        function r(e, t) {
            let n = (0,
                a.useRef)( () => {}
            )
                , r = (0,
                a.useRef)( () => {}
            );
            return (0,
                a.useMemo)( () => e && t ? a => {
                    null === a ? (n.current(),
                        r.current()) : (n.current = i(e, a),
                        r.current = i(t, a))
                }
                : e || t, [e, t])
        }
        function i(e, t) {
            if ("function" != typeof e)
                return e.current = t,
                    () => {
                        e.current = null
                    }
                    ;
            {
                let n = e(t);
                return "function" == typeof n ? n : () => e(null)
            }
        }
        ("function" == typeof t.default || "object" == typeof t.default && null !== t.default) && void 0 === t.default.__esModule && (Object.defineProperty(t.default, "__esModule", {
            value: !0
        }),
            Object.assign(t.default, t),
            e.exports = t.default)
    }
    ,
    87282: (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
            Object.defineProperty(t, "getImgProps", {
                enumerable: !0,
                get: function() {
                    return o
                }
            }),
            n(27679);
        let a = n(89197)
            , r = n(72105);
        function i(e) {
            return void 0 !== e.default
        }
        function s(e) {
            return void 0 === e ? e : "number" == typeof e ? Number.isFinite(e) ? e : NaN : "string" == typeof e && /^[0-9]+$/.test(e) ? parseInt(e, 10) : NaN
        }
        function o(e, t) {
            var n;
            let o, l, c, {src: d, sizes: u, unoptimized: m=!1, priority: h=!1, loading: p, className: f, quality: _, width: g, height: v, fill: x=!1, style: b, overrideSrc: y, onLoad: j, onLoadingComplete: N, placeholder: w="empty", blurDataURL: k, fetchPriority: S, decoding: C="async", layout: T, objectFit: E, objectPosition: A, lazyBoundary: P, lazyRoot: O, ...M} = e, {imgConf: R, showAltText: I, blurComplete: D, defaultLoader: L} = t, F = R || r.imageConfigDefault;
            if ("allSizes"in F)
                o = F;
            else {
                let e = [...F.deviceSizes, ...F.imageSizes].sort( (e, t) => e - t)
                    , t = F.deviceSizes.sort( (e, t) => e - t);
                o = {
                    ...F,
                    allSizes: e,
                    deviceSizes: t
                }
            }
            if (void 0 === L)
                throw Error("images.loaderFile detected but the file is missing default export.\nRead more: https://nextjs.org/docs/messages/invalid-images-config");
            let G = M.loader || L;
            delete M.loader,
                delete M.srcSet;
            let U = "__next_img_default"in G;
            if (U) {
                if ("custom" === o.loader)
                    throw Error('Image with src "' + d + '" is missing "loader" prop.\nRead more: https://nextjs.org/docs/messages/next-image-missing-loader')
            } else {
                let e = G;
                G = t => {
                    let {config: n, ...a} = t;
                    return e(a)
                }
            }
            if (T) {
                "fill" === T && (x = !0);
                let e = {
                    intrinsic: {
                        maxWidth: "100%",
                        height: "auto"
                    },
                    responsive: {
                        width: "100%",
                        height: "auto"
                    }
                }[T];
                e && (b = {
                    ...b,
                    ...e
                });
                let t = {
                    responsive: "100vw",
                    fill: "100vw"
                }[T];
                t && !u && (u = t)
            }
            let B = ""
                , z = s(g)
                , H = s(v);
            if ((n = d) && "object" == typeof n && (i(n) || void 0 !== n.src)) {
                let e = i(d) ? d.default : d;
                if (!e.src)
                    throw Error("An object should only be passed to the image component src parameter if it comes from a static image import. It must include src. Received " + JSON.stringify(e));
                if (!e.height || !e.width)
                    throw Error("An object should only be passed to the image component src parameter if it comes from a static image import. It must include height and width. Received " + JSON.stringify(e));
                if (l = e.blurWidth,
                    c = e.blurHeight,
                    k = k || e.blurDataURL,
                    B = e.src,
                    !x) {
                    if (z || H) {
                        if (z && !H) {
                            let t = z / e.width;
                            H = Math.round(e.height * t)
                        } else if (!z && H) {
                            let t = H / e.height;
                            z = Math.round(e.width * t)
                        }
                    } else
                        z = e.width,
                            H = e.height
                }
            }
            let V = !h && ("lazy" === p || void 0 === p);
            (!(d = "string" == typeof d ? d : B) || d.startsWith("data:") || d.startsWith("blob:")) && (m = !0,
                V = !1),
            o.unoptimized && (m = !0),
            U && d.endsWith(".svg") && !o.dangerouslyAllowSVG && (m = !0);
            let q = s(_)
                , W = Object.assign(x ? {
                position: "absolute",
                height: "100%",
                width: "100%",
                left: 0,
                top: 0,
                right: 0,
                bottom: 0,
                objectFit: E,
                objectPosition: A
            } : {}, I ? {} : {
                color: "transparent"
            }, b)
                , X = D || "empty" === w ? null : "blur" === w ? 'url("data:image/svg+xml;charset=utf-8,' + (0,
                a.getImageBlurSvg)({
                widthInt: z,
                heightInt: H,
                blurWidth: l,
                blurHeight: c,
                blurDataURL: k || "",
                objectFit: W.objectFit
            }) + '")' : 'url("' + w + '")'
                , Y = X ? {
                backgroundSize: W.objectFit || "cover",
                backgroundPosition: W.objectPosition || "50% 50%",
                backgroundRepeat: "no-repeat",
                backgroundImage: X
            } : {}
                , Q = function(e) {
                let {config: t, src: n, unoptimized: a, width: r, quality: i, sizes: s, loader: o} = e;
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
                }(t, r, s)
                    , d = l.length - 1;
                return {
                    sizes: s || "w" !== c ? s : "100vw",
                    srcSet: l.map( (e, a) => o({
                        config: t,
                        src: n,
                        quality: i,
                        width: e
                    }) + " " + ("w" === c ? e : a + 1) + c).join(", "),
                    src: o({
                        config: t,
                        src: n,
                        quality: i,
                        width: l[d]
                    })
                }
            }({
                config: o,
                src: d,
                unoptimized: m,
                width: z,
                quality: q,
                sizes: u,
                loader: G
            });
            return {
                props: {
                    ...M,
                    loading: V ? "lazy" : p,
                    fetchPriority: S,
                    width: z,
                    height: H,
                    decoding: C,
                    className: f,
                    style: {
                        ...W,
                        ...Y
                    },
                    sizes: Q.sizes,
                    srcSet: Q.srcSet,
                    src: y || Q.src
                },
                meta: {
                    unoptimized: m,
                    priority: h,
                    placeholder: w,
                    fill: x
                }
            }
        }
    }
    ,
    89197: (e, t) => {
        "use strict";
        function n(e) {
            let {widthInt: t, heightInt: n, blurWidth: a, blurHeight: r, blurDataURL: i, objectFit: s} = e
                , o = a ? 40 * a : t
                , l = r ? 40 * r : n
                , c = o && l ? "viewBox='0 0 " + o + " " + l + "'" : "";
            return "%3Csvg xmlns='http://www.w3.org/2000/svg' " + c + "%3E%3Cfilter id='b' color-interpolation-filters='sRGB'%3E%3CfeGaussianBlur stdDeviation='20'/%3E%3CfeColorMatrix values='1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 100 -1' result='s'/%3E%3CfeFlood x='0' y='0' width='100%25' height='100%25'/%3E%3CfeComposite operator='out' in='s'/%3E%3CfeComposite in2='SourceGraphic'/%3E%3CfeGaussianBlur stdDeviation='20'/%3E%3C/filter%3E%3Cimage width='100%25' height='100%25' x='0' y='0' preserveAspectRatio='" + (c ? "none" : "contain" === s ? "xMidYMid" : "cover" === s ? "xMidYMid slice" : "none") + "' style='filter: url(%23b);' href='" + i + "'/%3E%3C/svg%3E"
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
    }
    ,
    22364: (e, t, n) => {
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
                    return o
                }
            });
        let a = n(87677)
            , r = n(87282)
            , i = n(36526)
            , s = a._(n(15472));
        function o(e) {
            let {props: t} = (0,
                r.getImgProps)(e, {
                defaultLoader: s.default,
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
    }
    ,
    15472: (e, t) => {
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
    }
    ,
    64672: (e, t, n) => {
        "use strict";
        n.r(t),
            n.d(t, {
                default: () => em
            });
        var a = n(74848)
            , r = n(91106)
            , i = n.n(r)
            , s = n(64929)
            , o = n.n(s)
            , l = n(46942)
            , c = n.n(l)
            , d = n(96540)
            , u = n(30214)
            , m = n(86715)
            , h = n.n(m)
            , p = n(25271)
            , f = n(41359)
            , _ = n.n(f)
            , g = n(45428);
        let v = function(e) {
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
                                a.jsx)(g.A, {
                                user: t,
                                width: 40,
                                overridePrivacy: !0
                            })
                        })]
                    })
                })
        };
        var x = n(53003)
            , b = n.n(x)
            , y = n(44103);
        let j = function(e) {
            var t, n, r;
            let {currentUser: s} = e;
            return (0,
                a.jsxs)(a.Fragment, {
                children: [(0,
                    a.jsx)("h4", {
                    className: "head_padding ".concat((null == s ? void 0 : null === (t = s.user_navigation) || void 0 === t ? void 0 : t.htmlClass) || "back_blue"),
                    children: null == s ? void 0 : null === (n = s.user_navigation) || void 0 === n ? void 0 : n.htmlLabel
                }), (0,
                    a.jsx)("ul", {
                    children: (null == s ? void 0 : null === (r = s.user_navigation) || void 0 === r ? void 0 : r.games.length) > 0 ? s.user_navigation.games.map(e => (0,
                        a.jsx)("li", {
                        children: (0,
                            a.jsxs)(i(), {
                            href: "/submit/edit/".concat(e.id),
                            className: "link_".concat((0,
                                y.TQ)(e)),
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
                                    y.wm)(e.invested_sp) : (0,
                                    y.wm)(e.invested_pro)
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
            , w = function(e) {
            var t, n, r, s;
            let {currentUser: o} = e;
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
                            href: "/user/".concat(null == o ? void 0 : o.user_name),
                            className: "link_pink",
                            children: "Profile"
                        })
                    }), (0,
                        a.jsx)("li", {
                        children: (0,
                            a.jsx)(i(), {
                            href: "/user/".concat(null == o ? void 0 : o.user_name, "/games"),
                            className: "link_blue",
                            children: "Games"
                        })
                    }), (0,
                        a.jsx)("li", {
                        children: (0,
                            a.jsx)(i(), {
                            href: "/user/".concat(null == o ? void 0 : o.user_name, "/reviews/latest/1"),
                            className: "link_blue",
                            children: "Reviews"
                        })
                    }), (0,
                        a.jsx)("li", {
                        children: (0,
                            a.jsx)(i(), {
                            href: "/user/".concat(null == o ? void 0 : o.user_name, "/lists"),
                            className: "link_blue",
                            children: "Collections"
                        })
                    }), (0,
                        a.jsx)("li", {
                        children: (0,
                            a.jsx)(i(), {
                            href: "/user/".concat(null == o ? void 0 : o.user_name, "/stats"),
                            className: "link_pink",
                            children: "Stats"
                        })
                    }), (0,
                        a.jsx)("li", {
                        children: (0,
                            a.jsxs)(i(), {
                            href: "/user/".concat(null == o ? void 0 : o.user_name, "/friends"),
                            className: (null == o ? void 0 : null === (t = o.user_notifications) || void 0 === t ? void 0 : t.friend_invites) > 0 ? "back_red text_white" : "link_pink",
                            children: ["Friends (", null == o ? void 0 : null === (n = o.user_notifications) || void 0 === n ? void 0 : n.friend_invites, ")"]
                        })
                    }), (0,
                        a.jsx)("li", {
                        children: (0,
                            a.jsxs)(i(), {
                            href: "/user/".concat(null == o ? void 0 : o.user_name, "/messages"),
                            className: (null == o ? void 0 : null === (r = o.user_notifications) || void 0 === r ? void 0 : r.messages_new) > 0 ? "back_red text_white" : "link_pink",
                            children: ["Messages (", null == o ? void 0 : null === (s = o.user_notifications) || void 0 === s ? void 0 : s.messages_new, ")"]
                        })
                    }), (0,
                        a.jsx)("li", {
                        children: (0,
                            a.jsx)(i(), {
                            href: "/user/".concat(null == o ? void 0 : o.user_name, "/options"),
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
            , k = function(e) {
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
                            a.jsx)(w, {
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
            let {openSearch: e, closeSearch: t, searchTerms: n, setSearchTerms: r, debounce: s} = (0,
                u.SQ)()
                , [l,h] = (0,
                d.useState)(!1)
                , f = (0,
                m.useRouter)();
            (0,
                d.useEffect)( () => {
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
                p.i)();
            (null == g ? void 0 : g.user_name) ? _.push((0,
                a.jsx)("ul", {
                className: o().login,
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
                className: o().login,
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
                    className: o().join_link,
                    children: (0,
                        a.jsx)(i(), {
                        className: "mobile_hide",
                        href: "/login/signup",
                        children: "Join"
                    })
                })]
            }, "login"));
            let x = e => {
                    "Enter" === e.key ? s() : "Escape" === e.key && t()
                }
            ;
            return (0,
                a.jsx)(a.Fragment, {
                children: (0,
                    a.jsxs)("header", {
                    className: o().header,
                    children: [(0,
                        a.jsxs)("nav", {
                        className: o().nav,
                        children: [(0,
                            a.jsx)(i(), {
                            href: "/",
                            className: o().brand,
                            "aria-label": "HowLongToBeat"
                        }), (0,
                            a.jsxs)("ul", {
                            className: o().list,
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
                            className: o().search,
                            children: (0,
                                a.jsx)("input", {
                                className: c()(o().search_box, "back_form"),
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
                        a.jsx)(k, {
                        currentUser: g
                    }) : null]
                })
            })
        };
        var C = n(13368)
            , T = n.n(C)
            , E = n(77928)
            , A = n(83749)
            , P = n(86408)
            , O = n.n(P)
            , M = n(5556)
            , R = n(29965)
            , I = n.n(R)
            , D = n(292);
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
                            a.jsx)(I(), {
                            loader: D.R,
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
                                    y.ZV)(t.stats_backlog)
                            }), (0,
                                a.jsx)("div", {
                                className: c()(O().search_list_tidbit, "text_white", "shadow_text"),
                                children: "Complete"
                            }), (0,
                                a.jsx)("div", {
                                className: c()(O().search_list_tidbit, "center", "back_blue"),
                                children: (0,
                                    y.ZV)(t.stats_completed)
                            }), (0,
                                a.jsx)("div", {
                                className: c()(O().search_list_tidbit, "text_white", "shadow_text"),
                                children: "Posts"
                            }), (0,
                                a.jsx)("div", {
                                className: c()(O().search_list_tidbit, "center", "back_green"),
                                children: (0,
                                    y.ZV)(t.stats_posts)
                            })]
                        })]
                    })]
                })
            })
        }
        L.propTypes = {
            user: M.object.isRequired
        };
        var F = n(53593)
            , G = n(22193)
            , U = n(40710)
            , B = n(29699)
            , z = n(1981)
            , H = n(54294)
            , V = n(33336)
            , q = n(11996)
            , W = n.n(q);
        let X = function(e) {
            let {results: t} = e
                , {currentUser: n} = (0,
                    p.i)()
                , {searchType: r, setSearchType: i, setSearchTerms: s, searchPlatform: o, setSearchPlatform: l, searchSortCategory: m, setSearchSortCategory: h, searchRangeCategory: f, setSearchRangeCategory: _, searchRangeTimeMin: g, setSearchRangeTimeMin: v, searchRangeTimeMax: x, setSearchRangeTimeMax: b, searchPerspective: y, setSearchPerspective: j, searchFlow: N, setSearchFlow: w, searchGenre: k, setSearchGenre: S, searchRangeYearMin: C, setSearchRangeYearMin: T, searchRangeYearMax: E, setSearchRangeYearMax: A, searchModifier: P, setSearchModifier: O, searchSortList: M, setSearchSortList: R, searchSortUser: I, setSearchSortUser: D, searchFilter: L, setSearchFilter: F, setSearchOrder: q, setSearchRandomizer: X, closeSearch: Y} = (0,
                    u.SQ)()
                , [Q,J] = (0,
                    d.useState)("none")
                , Z = () => {
                    s(""),
                        l(""),
                        h("popular"),
                        _("main"),
                        v(""),
                        b(""),
                        j(""),
                        w(""),
                        S(""),
                        T(""),
                        A(""),
                        O(""),
                        F(""),
                        R("follows"),
                        D("postcount"),
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
                            "block" === Q ? J("none") : J("block"),
                                (0,
                                    G.sx)({
                                    eventName: "search_options",
                                    params: {
                                        search_extended: "block" !== Q
                                    }
                                })
                        }
                        ,
                        children: "Search Options"
                    }), (0,
                        a.jsx)("button", {
                        className: c()(W().search_options_button, "back_form", "shadow_box"),
                        onClick: Y,
                        children: "Close"
                    })]
                }), (0,
                    a.jsx)("div", {
                    className: "clear"
                }), (0,
                    a.jsxs)("div", {
                    style: {
                        display: Q
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
                                    a.jsx)(U.A, {
                                    name: "search_platform",
                                    value: o,
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
                                        a.jsx)(B.A, {
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
                                        a.jsx)(z.A, {
                                        name: "search_flow",
                                        value: N,
                                        className: null,
                                        onChange: e => {
                                            w(e.target.value),
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
                                        a.jsx)(H.A, {
                                        name: "search_genre",
                                        value: k,
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
                                    a.jsx)(V.A, {
                                    name: "search_year",
                                    className: c()(C ? W().search_range_l : null, "form_select back_form"),
                                    value: C,
                                    defaultLabel: "All",
                                    onChange: e => T(e.target.value)
                                }), C ? (0,
                                    a.jsx)(V.A, {
                                    name: "search_year",
                                    className: c()(W().search_range_r, "form_select back_form"),
                                    value: E,
                                    defaultLabel: "(End)",
                                    onChange: e => A(e.target.value)
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
                                    defaultValue: g,
                                    onChange: e => {
                                        v(e.target.value),
                                            X(0)
                                    }
                                }), (0,
                                    a.jsx)("input", {
                                    className: c()(W().search_range_r, "back_form"),
                                    type: "text",
                                    placeholder: "Max",
                                    defaultValue: x,
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
                                    value: I,
                                    onChange: e => {
                                        D(e.target.value),
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
                                    value: P,
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
                                        q(e.target.value)
                                }
                                ,
                                children: "˅ Sort"
                            }), (0,
                                a.jsx)("button", {
                                className: c()(W().button, "form_button", "back_red"),
                                type: "button",
                                onClick: () => Z(),
                                children: "Reset"
                            })]
                        })
                    }), (0,
                        a.jsx)("div", {
                        className: "clear"
                    })]
                })]
            })
        };
        var Y = n(10749);
        let Q = function(e) {
            let {isVisible: t, results: n, screenWidth: r} = e
                , {isLoading: i, searchType: s, searchTerms: o, searchRandomizer: l, searchPage: d} = (0,
                    u.SQ)()
                , m = e => {
                    var t, r;
                    let {result: i} = e
                        , l = null == n ? void 0 : null === (t = n.userData.filter(e => e.game_id === i.game_id)) || void 0 === t ? void 0 : t[0];
                    return "games" === s ? (0,
                        a.jsx)(A.A, {
                        userStats: l,
                        isPreloaded: !0,
                        game: i,
                        displayModifier: null == n ? void 0 : n.displayModifier,
                        highlight: o.trim().toLowerCase() === (null == i ? void 0 : null === (r = i.game_name) || void 0 === r ? void 0 : r.toLowerCase()),
                        searchTerms: o
                    }) : "users" === s ? (0,
                        a.jsx)(L, {
                        user: i
                    }) : (0,
                        a.jsx)(Y.A, {
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
                                    children: d > 1 ? (0,
                                        a.jsx)(a.Fragment, {
                                        children: "Page ".concat(d)
                                    }) : (null == n ? void 0 : n.count) > 0 ? "We Found ".concat((0,
                                        y.ZV)(null == n ? void 0 : n.count), " ").concat(null == n ? void 0 : n.category) : "No Results Found, Try A New Search"
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
                                children: [(null == n ? void 0 : n.count) > 0 && (null == n ? void 0 : n.data.slice(0, 2).map(e => e["".concat(s.slice(0, 4), "_id")] > 0 && (0,
                                    a.jsx)(m, {
                                    result: e
                                }, "".concat(s, "_").concat(e["".concat(s.slice(0, 4), "_id")], "_s").concat(l)))), (null == n ? void 0 : n.count) > 6 && r <= 768 && (0,
                                    a.jsxs)(a.Fragment, {
                                    children: [(0,
                                        a.jsx)("div", {
                                        className: "clear"
                                    }), (0,
                                        a.jsx)(E.A, {
                                        adType: "wide",
                                        location: "incontent"
                                    })]
                                }), (null == n ? void 0 : n.count) >= 3 && (null == n ? void 0 : n.data.slice(2, 20).map(e => e["".concat(s.slice(0, 4), "_id")] > 0 && (0,
                                    a.jsx)(m, {
                                    result: e
                                }, "".concat(s, "_").concat(e["".concat(s.slice(0, 4), "_id")], "_s").concat(l)))), (0,
                                    a.jsx)("div", {
                                    className: "clear"
                                })]
                            })]
                        }), {}), (null == n ? void 0 : n.count) > (null == n ? void 0 : n.pageSize) && 0 === l && (0,
                            a.jsx)("div", {
                            className: c()("content_100", "back_form", "shadow_box", W().pagination),
                            children: (0,
                                a.jsx)(F.A, {
                                pageType: "searchPage",
                                pageCurrent: null == n ? void 0 : n.pageCurrent,
                                pageTotal: null == n ? void 0 : n.pageTotal,
                                selectColor: "games" === s ? "back_blue" : "users" === s ? "back_pink" : "back_purple"
                            })
                        }), (0,
                            a.jsx)("div", {
                            className: "content_break"
                        })]
                    })
                })]
            }) : null
        };
        var J = n(78714);
        let Z = () => {
                let {currentUser: e} = (0,
                    p.i)()
                    , [t,n] = (0,
                    d.useState)(!1)
                    , {resolvedTheme: r, setTheme: i} = (0,
                    J.D)();
                return ((0,
                    d.useEffect)( () => {
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
        ;
        var K = n(62569)
            , $ = n.n(K);
        let ee = function() {
            return (0,
                a.jsx)("footer", {
                className: c()($().footer, "back_primary"),
                children: (0,
                    a.jsxs)("div", {
                    className: $().footer_inside,
                    children: [(0,
                        a.jsxs)("div", {
                        className: $().footer_links,
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
                        className: $().footer_links,
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
                        className: $().footer_copyright,
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
                                    a.jsx)(Z, {})
                            })]
                        })]
                    })]
                })
            })
        };
        var et = n(96720)
            , en = n.n(et);
        let ea = function(e) {
            let {children: t, pageMetadata: n={}} = e
                , r = (0,
                d.useContext)(u.Ay)
                , {noHeader: i=!1, noTopAd: s=!1, noBottomAd: o=!1, noFooter: l=!1} = n
                , [c,m] = (0,
                d.useState)(0);
            return (0,
                d.useEffect)( () => {
                    m(window.screen.availWidth)
                }
                , [r.isVisible]),
                (0,
                    a.jsxs)("div", {
                    className: en().container,
                    children: [!i && (0,
                        a.jsx)(S, {}), !s && (!1 === r.isVisible || c > 768) && (0,
                        a.jsx)(E.A, {
                        adType: "wide",
                        location: "top",
                        divClass: "back_secondary center"
                    }), (0,
                        a.jsx)("main", {
                        className: en().main,
                        children: !0 === r.isVisible ? (0,
                            a.jsx)(Q, {
                            isVisible: r.isVisible,
                            results: r.results,
                            screenWidth: c
                        }) : t
                    }), !o && (0,
                        a.jsx)(E.A, {
                        adType: "wide",
                        location: "footer"
                    }), !l && (0,
                        a.jsx)(ee, {})]
                })
        }
            , er = function(e) {
            let {title: t="HowLongToBeat.com | Game Lengths, Backlogs and more!", description: n="How long are your favorite video games? HowLongToBeat has the answer. Create a backlog, submit your game times and compete with your friends!", robots: r="noodp, noydir, max-image-preview:large", image: i="".concat("https://howlongtobeat.com", "/img/hltb_brand2.png"), twitterCard: s="summary", type: o="website", canonical: l} = e;
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
                    content: o
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
                    content: s
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
        }
            , ei = "3000068"
            , es = function() {
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
            , eo = () => {
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
            , ec = function(e) {
            var t, n;
            let {pageMetadata: a, gameData: r, game: i, threadData: s} = e
                , {currentUser: o} = (0,
                p.i)()
                , l = (0,
                m.useRouter)()
                , c = (0,
                d.useRef)(!1)
                , u = (0,
                d.useRef)()
                , f = (0,
                d.useRef)()
                , _ = (0,
                d.useRef)()
                , g = (0,
                d.useRef)();
            u.current = (null == a ? void 0 : a.title) || "HowLongToBeat.com | Game Lengths, Backlogs and more!",
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
                , {category: w, title: k, pageCurrent: S} = (null == s ? void 0 : s.thread) || {}
                , C = null != o && !!o.user_name;
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
            k && "" !== k) {
                switch (w) {
                    case 1:
                        w = "Gaming";
                        break;
                    case 2:
                        w = "Off-Topic";
                        break;
                    case 3:
                        w = "Support";
                        break;
                    default:
                        w = ""
                }
                _.current = {
                    ..._.current,
                    forum_topic: w,
                    forum_title: k,
                    forum_page: S
                }
            }
            return (0,
                d.useEffect)( () => {
                    c.current || (c.current = !0,
                        es(),
                        (0,
                            G.Vz)(),
                        (0,
                            G.$q)({
                            url: f.current,
                            title: u.current,
                            universalParams: {
                                ..._.current
                            }
                        })),
                        window.PogoConfig = g.current
                }
                , []),
                (0,
                    d.useEffect)( () => {
                        let e = () => {
                                setTimeout( () => {
                                        (0,
                                            G.$q)({
                                            url: f.current,
                                            title: u.current,
                                            universalParams: {
                                                ..._.current
                                            }
                                        }),
                                            eo(),
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
        class ed extends d.Component {
            static getDerivedStateFromError() {
                return {
                    hasError: !0
                }
            }
            componentDidCatch(e, t) {
                (0,
                    y.zT)({
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
        n(32091);
        let eu = new function(e) {
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
            }, s = {
                opacity: 1,
                width: "99%",
                transition: "width 10s cubic-bezier(0.1, 0.05, 0, 1)"
            }, o = {
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
                            a(n.style, s)
                    }, r.delay),
                    n.scrollTop = 0
            }
                ,
                this.finish = function() {
                    null != t && (clearTimeout(t),
                        t = void 0),
                    n && (n.className = r.className + " finished",
                        a(n.style, o))
                }
        }
        ({
            size: 3,
            color: "#2b7ab9",
            className: "bar-of-progress",
            delay: 50
        });
        h().events.on("routeChangeStart", eu.start),
            h().events.on("routeChangeComplete", eu.finish),
            h().events.on("routeChangeError", eu.finish);
        let em = function(e) {
            let {Component: t, pageProps: n} = e
                , {pageMetadata: r} = n;
            return (0,
                a.jsx)(p.Q, {
                children: (0,
                    a.jsx)(u.Lt, {
                    children: (0,
                        a.jsx)(J.N, {
                        children: (0,
                            a.jsxs)(ea, {
                            pageMetadata: r,
                            children: [(0,
                                a.jsx)(er, {
                                ...r
                            }), (0,
                                a.jsx)(ed, {
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
    }
    ,
    32091: () => {}
    ,
    21140: e => {
        e.exports = {
            box_art_image: "BoxArt_box_art_image__KPP9w"
        }
    }
    ,
    54078: e => {
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
    }
    ,
    47494: e => {
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
    }
    ,
    62569: e => {
        e.exports = {
            footer_inside: "Footer_footer_inside___u1sn",
            footer_links: "Footer_footer_links__LvxWM",
            footer_copyright: "Footer_footer_copyright__aFR4E",
            footer: "Footer_footer__LxLGV"
        }
    }
    ,
    96720: e => {
        e.exports = {
            container: "Layout_container___dzs2",
            main: "Layout_main__RMpyO"
        }
    }
    ,
    64929: e => {
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
    }
    ,
    69254: e => {
        e.exports = {
            user_pagination: "Pagination_user_pagination__gPqaa",
            label: "Pagination_label__yII1h",
            inactive: "Pagination_inactive__dnoZF",
            left: "Pagination_left__dt4_q",
            right: "Pagination_right__GwBE_"
        }
    }
    ,
    53003: e => {
        e.exports = {
            nav_u_drop: "UserNavigation_nav_u_drop__HAtcK",
            nav_games_load: "UserNavigation_nav_games_load__kQ7qe",
            text_grey: "UserNavigation_text_grey__6kMGT",
            nav_up: "UserNavigation_nav_up__xUow4",
            nav_down: "UserNavigation_nav_down__5no_Q",
            nav_playthroughs_load: "UserNavigation_nav_playthroughs_load__cafek",
            nav_profile_load: "UserNavigation_nav_profile_load__sm3px"
        }
    }
    ,
    11996: e => {
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
    }
    ,
    1663: e => {
        e.exports = {
            user_avatar_image: "UserAvatar_user_avatar_image__awlk0"
        }
    }
    ,
    86408: e => {
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
    }
    ,
    41359: e => {
        e.exports = {
            user_tools_label: "UserTools_user_tools_label__0giZT",
            user_tools_image: "UserTools_user_tools_image__9opk3",
            login: "UserTools_login___xMlM"
        }
    }
    ,
    88026: e => {
        e.exports = {
            collection_card: "CollectionObjectCard_collection_card__OydJa",
            headers: "CollectionObjectCard_headers__Tsj51",
            title: "CollectionObjectCard_title__M4Cu8",
            follows: "CollectionObjectCard_follows__rujij",
            collection_images: "CollectionObjectCard_collection_images___RZ9d",
            collection_card_details: "CollectionObjectCard_collection_card_details__OSVzC",
            collection_card_tidbit_short: "CollectionObjectCard_collection_card_tidbit_short__ii40_"
        }
    }
    ,
    66881: e => {
        e.exports = {
            user_game_main: "UserGameDetail_user_game_main__lFsAR",
            user_game_detail: "UserGameDetail_user_game_detail__uiofm",
            timestamp: "UserGameDetail_timestamp__BJOwY",
            youtube_video: "UserGameDetail_youtube_video__sEdgq"
        }
    }
    ,
    13368: (e, t, n) => {
        e.exports = n(86085)
    }
    ,
    29965: (e, t, n) => {
        e.exports = n(22364)
    }
    ,
    91106: (e, t, n) => {
        e.exports = n(6397)
    }
    ,
    86715: (e, t, n) => {
        e.exports = n(88440)
    }
    ,
    2694: (e, t, n) => {
        "use strict";
        var a = n(6925);
        function r() {}
        function i() {}
        i.resetWarningCache = r,
            e.exports = function() {
                function e(e, t, n, r, i, s) {
                    if (s !== a) {
                        var o = Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");
                        throw o.name = "Invariant Violation",
                            o
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
    }
    ,
    5556: (e, t, n) => {
        e.exports = n(2694)()
    }
    ,
    6925: e => {
        "use strict";
        e.exports = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"
    }
    ,
    14210: (e, t, n) => {
        "use strict";
        function a(e, t, n, a, r, i, s) {
            this.acceptsBooleans = 2 === t || 3 === t || 4 === t,
                this.attributeName = a,
                this.attributeNamespace = r,
                this.mustUseProperty = n,
                this.propertyName = e,
                this.type = t,
                this.sanitizeURL = i,
                this.removeEmptyString = s
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
            , s = e => e[1].toUpperCase();
        ["accent-height", "alignment-baseline", "arabic-form", "baseline-shift", "cap-height", "clip-path", "clip-rule", "color-interpolation", "color-interpolation-filters", "color-profile", "color-rendering", "dominant-baseline", "enable-background", "fill-opacity", "fill-rule", "flood-color", "flood-opacity", "font-family", "font-size", "font-size-adjust", "font-stretch", "font-style", "font-variant", "font-weight", "glyph-name", "glyph-orientation-horizontal", "glyph-orientation-vertical", "horiz-adv-x", "horiz-origin-x", "image-rendering", "letter-spacing", "lighting-color", "marker-end", "marker-mid", "marker-start", "overline-position", "overline-thickness", "paint-order", "panose-1", "pointer-events", "rendering-intent", "shape-rendering", "stop-color", "stop-opacity", "strikethrough-position", "strikethrough-thickness", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke-width", "text-anchor", "text-decoration", "text-rendering", "underline-position", "underline-thickness", "unicode-bidi", "unicode-range", "units-per-em", "v-alphabetic", "v-hanging", "v-ideographic", "v-mathematical", "vector-effect", "vert-adv-y", "vert-origin-x", "vert-origin-y", "word-spacing", "writing-mode", "xmlns:xlink", "x-height"].forEach(e => {
                let t = e.replace(i, s);
                r[t] = new a(t,1,!1,e,null,!1,!1)
            }
        ),
            ["xlink:actuate", "xlink:arcrole", "xlink:role", "xlink:show", "xlink:title", "xlink:type"].forEach(e => {
                    let t = e.replace(i, s);
                    r[t] = new a(t,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)
                }
            ),
            ["xml:base", "xml:lang", "xml:space"].forEach(e => {
                    let t = e.replace(i, s);
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
        let {CAMELCASE: o, SAME: l, possibleStandardNames: c} = n(96811)
            , d = RegExp.prototype.test.bind(RegExp("^(data|aria)-[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"))
            , u = Object.keys(c).reduce( (e, t) => {
                let n = c[t];
                return n === l ? e[t] = t : n === o ? e[t.toLowerCase()] = t : e[t] = n,
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
            t.isCustomAttribute = d,
            t.possibleStandardNames = u
    }
    ,
    96811: (e, t) => {
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
    }
    ,
    35229: function(e, t, n) {
        "use strict";
        var a = (this && this.__importDefault || function(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }
        )(n(51133))
            , r = n(98917);
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
    98917: (e, t) => {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
            t.camelCase = void 0;
        var n = /^--[a-zA-Z0-9_-]+$/
            , a = /-([a-z])/g
            , r = /^[^-]+$/
            , i = /^-(webkit|moz|ms|o|khtml)-/
            , s = /^-(ms)-/
            , o = function(e, t) {
            return t.toUpperCase()
        }
            , l = function(e, t) {
            return "".concat(t, "-")
        };
        t.camelCase = function(e, t) {
            var c;
            return (void 0 === t && (t = {}),
            !(c = e) || r.test(c) || n.test(c)) ? e : (e = e.toLowerCase(),
                (e = t.reactCompat ? e.replace(s, l) : e.replace(i, l)).replace(a, o))
        }
    }
    ,
    51133: function(e, t, n) {
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
        var r = a(n(19788))
    },
    81591: (e, t, n) => {
        "use strict";
        n.d(t, {
            YQ: () => r
        });
        var a = n(96540);
        function r(e, t, n) {
            var r = this
                , i = (0,
                a.useRef)(null)
                , s = (0,
                a.useRef)(0)
                , o = (0,
                a.useRef)(null)
                , l = (0,
                a.useRef)([])
                , c = (0,
                a.useRef)()
                , d = (0,
                a.useRef)()
                , u = (0,
                a.useRef)(e)
                , m = (0,
                a.useRef)(!0);
            u.current = e;
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
                            s.current = e,
                            d.current = u.current.apply(n, t)
                    }
                        , n = function(e, t) {
                        p && cancelAnimationFrame(o.current),
                            o.current = p ? requestAnimationFrame(e) : setTimeout(e, t)
                    }
                        , a = function(e) {
                        if (!m.current)
                            return !1;
                        var n = e - i.current;
                        return !i.current || n >= t || n < 0 || g && e - s.current >= x
                    }
                        , b = function(t) {
                        return o.current = null,
                            _ && l.current ? e(t) : (l.current = c.current = null,
                                d.current)
                    }
                        , y = function e() {
                        var r = Date.now();
                        if (a(r))
                            return b(r);
                        if (m.current) {
                            var o = t - (r - i.current);
                            n(e, g ? Math.min(o, x - (r - s.current)) : o)
                        }
                    }
                        , j = function() {
                        if (h || v) {
                            var u = Date.now()
                                , p = a(u);
                            if (l.current = [].slice.call(arguments),
                                c.current = r,
                                i.current = u,
                                p) {
                                if (!o.current && m.current)
                                    return s.current = i.current,
                                        n(y, t),
                                        f ? e(i.current) : d.current;
                                if (g)
                                    return n(y, t),
                                        e(i.current)
                            }
                            return o.current || n(y, t),
                                d.current
                        }
                    };
                    return j.cancel = function() {
                        o.current && (p ? cancelAnimationFrame(o.current) : clearTimeout(o.current)),
                            s.current = 0,
                            l.current = i.current = c.current = o.current = null
                    }
                        ,
                        j.isPending = function() {
                            return !!o.current
                        }
                        ,
                        j.flush = function() {
                            return o.current ? b(Date.now()) : d.current
                        }
                        ,
                        j
                }, [f, g, t, x, _, p, h, v])
        }
    }
    ,
    46942: (e, t) => {
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
    }
    ,
    78714: (e, t, n) => {
        "use strict";
        n.d(t, {
            D: () => d,
            N: () => u
        });
        var a = n(96540)
            , r = (e, t, n, a, r, i, s, o) => {
            let l = document.documentElement
                , c = ["light", "dark"];
            function d(t) {
                (Array.isArray(e) ? e : [e]).forEach(e => {
                        let n = "class" === e
                            , a = n && i ? r.map(e => i[e] || e) : r;
                        n ? (l.classList.remove(...a),
                            l.classList.add(t)) : l.setAttribute(e, t)
                    }
                ),
                o && c.includes(t) && (l.style.colorScheme = t)
            }
            if (a)
                d(a);
            else
                try {
                    let e = localStorage.getItem(t) || n
                        , a = s && "system" === e ? window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light" : e;
                    d(a)
                } catch (e) {}
        }
            , i = ["light", "dark"]
            , s = "(prefers-color-scheme: dark)"
            , o = "undefined" == typeof window
            , l = a.createContext(void 0)
            , c = {
            setTheme: e => {}
            ,
            themes: []
        }
            , d = () => {
            var e;
            return null != (e = a.useContext(l)) ? e : c
        }
            , u = e => a.useContext(l) ? a.createElement(a.Fragment, null, e.children) : a.createElement(h, {
            ...e
        })
            , m = ["light", "dark"]
            , h = ({forcedTheme: e, disableTransitionOnChange: t=!1, enableSystem: n=!0, enableColorScheme: r=!0, storageKey: o="theme", themes: c=m, defaultTheme: d=n ? "system" : "light", attribute: u="data-theme", value: h, children: v, nonce: x, scriptProps: b}) => {
            let[y,j] = a.useState( () => f(o, d))
                , [N,w] = a.useState( () => f(o))
                , k = h ? Object.values(h) : c
                , S = a.useCallback(e => {
                    let a = e;
                    if (!a)
                        return;
                    "system" === e && n && (a = g());
                    let s = h ? h[a] : a
                        , o = t ? _(x) : null
                        , l = document.documentElement
                        , c = e => {
                            "class" === e ? (l.classList.remove(...k),
                            s && l.classList.add(s)) : e.startsWith("data-") && (s ? l.setAttribute(e, s) : l.removeAttribute(e))
                        }
                    ;
                    if (Array.isArray(u) ? u.forEach(c) : c(u),
                        r) {
                        let e = i.includes(d) ? d : null
                            , t = i.includes(a) ? a : e;
                        l.style.colorScheme = t
                    }
                    null == o || o()
                }
                , [x])
                , C = a.useCallback(e => {
                    let t = "function" == typeof e ? e(y) : e;
                    j(t);
                    try {
                        localStorage.setItem(o, t)
                    } catch (e) {}
                }
                , [y])
                , T = a.useCallback(t => {
                    w(g(t)),
                    "system" === y && n && !e && S("system")
                }
                , [y, e]);
            a.useEffect( () => {
                    let e = window.matchMedia(s);
                    return e.addListener(T),
                        T(e),
                        () => e.removeListener(T)
                }
                , [T]),
                a.useEffect( () => {
                        let e = e => {
                                e.key === o && C(e.newValue || d)
                            }
                        ;
                        return window.addEventListener("storage", e),
                            () => window.removeEventListener("storage", e)
                    }
                    , [C]),
                a.useEffect( () => {
                        S(null != e ? e : y)
                    }
                    , [e, y]);
            let E = a.useMemo( () => ({
                theme: y,
                setTheme: C,
                forcedTheme: e,
                resolvedTheme: "system" === y ? N : y,
                themes: n ? [...c, "system"] : c,
                systemTheme: n ? N : void 0
            }), [y, C, e, N, n, c]);
            return a.createElement(l.Provider, {
                value: E
            }, a.createElement(p, {
                forcedTheme: e,
                storageKey: o,
                attribute: u,
                enableSystem: n,
                enableColorScheme: r,
                defaultTheme: d,
                value: h,
                themes: c,
                nonce: x,
                scriptProps: b
            }), v)
        }
            , p = a.memo( ({forcedTheme: e, storageKey: t, attribute: n, enableSystem: i, enableColorScheme: s, defaultTheme: o, value: l, themes: c, nonce: d, scriptProps: u}) => {
                let m = JSON.stringify([n, t, o, e, c, l, i, s]).slice(1, -1);
                return a.createElement("script", {
                    ...u,
                    suppressHydrationWarning: !0,
                    nonce: "undefined" == typeof window ? d : "",
                    dangerouslySetInnerHTML: {
                        __html: `(${r.toString()})(${m})`
                    }
                })
            }
        )
            , f = (e, t) => {
            let n;
            if (!o) {
                try {
                    n = localStorage.getItem(e) || void 0
                } catch (e) {}
                return n || t
            }
        }
            , _ = e => {
            let t = document.createElement("style");
            return e && t.setAttribute("nonce", e),
                t.appendChild(document.createTextNode("*,*::before,*::after{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}")),
                document.head.appendChild(t),
                () => {
                    window.getComputedStyle(document.body),
                        setTimeout( () => {
                                document.head.removeChild(t)
                            }
                            , 1)
                }
        }
            , g = e => (e || (e = window.matchMedia(s)),
            e.matches ? "dark" : "light")
    }
}, e => {
    var t = t => e(e.s = t);
    e.O(0, [6593, 8792], () => (t(86170),
        t(88440))),
        _N_E = e.O()
}
]);
