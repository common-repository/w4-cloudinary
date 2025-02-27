var slice = [].slice,
    extend = function(child, parent) {
        function ctor() {
            this.constructor = child
        }
        for (var key in parent) hasProp.call(parent, key) && (child[key] = parent[key]);
        return ctor.prototype = parent.prototype, child.prototype = new ctor, child.__super__ = parent.prototype, child
    },
    hasProp = {}.hasOwnProperty;
! function(root, factory) {
    var name, ref, results, value;
    if ("function" == typeof define && define.amd) return define(["jquery"], factory);
    if ("object" == typeof exports) return module.exports = factory(require("jquery"));
    root.cloudinary || (root.cloudinary = {}), ref = factory(jQuery), results = [];
    for (name in ref) value = ref[name], results.push(root.cloudinary[name] = value)
}(this, function(jQuery) {
    var ArrayParam, BaseUtil, ClientHintsMetaTag, Cloudinary, CloudinaryJQuery, Condition, Configuration, Expression, ExpressionParam, FetchLayer, HtmlTag, ImageTag, Layer, LayerParam, Param, RangeParam, RawParam, SubtitlesLayer, TextLayer, Transformation, TransformationBase, TransformationParam, Util, VideoTag, addClass, allStrings, base64Encode, base64EncodeURL, camelCase, cloneDeep, cloudinary, compact, contains, convertKeys, crc32, defaults, difference, funcTag, functions, getAttribute, getData, hasClass, identity, isEmpty, isFunction, isNumberLike, isObject, isString, m, merge, objToString, objectProto, parameters, reWords, removeAttribute, setAttribute, setAttributes, setData, smartEscape, snakeCase, utf8_encode, webp, width, withCamelCaseKeys, withSnakeCaseKeys, without;
    return allStrings = function(list) {
        var item, j, len;
        for (j = 0, len = list.length; j < len; j++)
            if (item = list[j], !Util.isString(item)) return !1;
        return !0
    }, without = function(array, item) {
        var i, length, newArray;
        for (newArray = [], i = -1, length = array.length; ++i < length;) array[i] !== item && newArray.push(array[i]);
        return newArray
    }, isNumberLike = function(value) {
        return null != value && !isNaN(parseFloat(value))
    }, smartEscape = function(string, unsafe) {
        return null == unsafe && (unsafe = /([^a-zA-Z0-9_.\-\/:]+)/g), string.replace(unsafe, function(match) {
            return match.split("").map(function(c) {
                return "%" + c.charCodeAt(0).toString(16).toUpperCase()
            }).join("")
        })
    }, defaults = function() {
        var destination, sources;
        return destination = arguments[0], sources = 2 <= arguments.length ? slice.call(arguments, 1) : [], sources.reduce(function(dest, source) {
            var key, value;
            for (key in source) value = source[key], void 0 === dest[key] && (dest[key] = value);
            return dest
        }, destination)
    }, objectProto = Object.prototype, objToString = objectProto.toString, isObject = function(value) {
        var type;
        return type = typeof value, !!value && ("object" === type || "function" === type)
    }, funcTag = "[object Function]", isFunction = function(value) {
        return isObject(value) && objToString.call(value) === funcTag
    }, reWords = function() {
        var lower, upper;
        return upper = "[A-Z]", lower = "[a-z]+", RegExp(upper + "+(?=" + upper + lower + ")|" + upper + "?" + lower + "|" + upper + "+|[0-9]+", "g")
    }(), camelCase = function(source) {
        var i, word, words;
        return words = source.match(reWords), words = function() {
            var j, len, results;
            for (results = [], i = j = 0, len = words.length; j < len; i = ++j) word = words[i], word = word.toLocaleLowerCase(), i ? results.push(word.charAt(0).toLocaleUpperCase() + word.slice(1)) : results.push(word);
            return results
        }(), words.join("")
    }, snakeCase = function(source) {
        var i, word, words;
        return words = source.match(reWords), words = function() {
            var j, len, results;
            for (results = [], i = j = 0, len = words.length; j < len; i = ++j) word = words[i], results.push(word.toLocaleLowerCase());
            return results
        }(), words.join("_")
    }, convertKeys = function(source, converter) {
        var key, result, value;
        null == converter && (converter = Util.identity), result = {};
        for (key in source) value = source[key], key = converter(key), Util.isEmpty(key) || (result[key] = value);
        return result
    }, withCamelCaseKeys = function(source) {
        return convertKeys(source, Util.camelCase)
    }, withSnakeCaseKeys = function(source) {
        return convertKeys(source, Util.snakeCase)
    }, base64Encode = "undefined" != typeof btoa && isFunction(btoa) ? btoa : "undefined" != typeof Buffer && isFunction(Buffer) ? function(input) {
        return input instanceof Buffer || (input = new Buffer.from(String(input), "binary")), input.toString("base64")
    } : function(input) {
        throw new Error("No base64 encoding function found")
    }, base64EncodeURL = function(input) {
        try {
            input = decodeURI(input)
        } catch (error1) {
            error1
        }
        return input = encodeURI(input), base64Encode(input)
    }, BaseUtil = {
        allStrings: allStrings,
        camelCase: camelCase,
        convertKeys: convertKeys,
        defaults: defaults,
        snakeCase: snakeCase,
        without: without,
        isFunction: isFunction,
        isNumberLike: isNumberLike,
        smartEscape: smartEscape,
        withCamelCaseKeys: withCamelCaseKeys,
        withSnakeCaseKeys: withSnakeCaseKeys,
        base64EncodeURL: base64EncodeURL
    }, getData = function(element, name) {
        return jQuery(element).data(name)
    }, setData = function(element, name, value) {
        return jQuery(element).data(name, value)
    }, getAttribute = function(element, name) {
        return jQuery(element).attr(name)
    }, setAttribute = function(element, name, value) {
        return jQuery(element).attr(name, value)
    }, removeAttribute = function(element, name) {
        return jQuery(element).removeAttr(name)
    }, setAttributes = function(element, attributes) {
        return jQuery(element).attr(attributes)
    }, hasClass = function(element, name) {
        return jQuery(element).hasClass(name)
    }, addClass = function(element, name) {
        return jQuery(element).addClass(name)
    }, width = function(element) {
        return jQuery(element).width()
    }, isEmpty = function(item) {
        return null == item || (jQuery.isArray(item) || Util.isString(item)) && 0 === item.length || jQuery.isPlainObject(item) && jQuery.isEmptyObject(item)
    }, isString = function(item) {
        return "string" == typeof item || "[object String]" === (null != item ? item.toString() : void 0)
    }, merge = function() {
        var args, i;
        return args = function() {
            var j, len, results;
            for (results = [], j = 0, len = arguments.length; j < len; j++) i = arguments[j], results.push(i);
            return results
        }.apply(this, arguments), args.unshift(!0), jQuery.extend.apply(this, args)
    }, compact = function(arr) {
        var item, j, len, results;
        for (results = [], j = 0, len = arr.length; j < len; j++)(item = arr[j]) && results.push(item);
        return results
    }, cloneDeep = function() {
        var args;
        return args = jQuery.makeArray(arguments), args.unshift({}), args.unshift(!0), jQuery.extend.apply(this, args)
    }, contains = function(arr, item) {
        var j, len;
        for (j = 0, len = arr.length; j < len; j++)
            if (arr[j] === item) return !0;
        return !1
    }, difference = function(arr, values) {
        var item, j, len, results;
        for (results = [], j = 0, len = arr.length; j < len; j++) item = arr[j], contains(values, item) || results.push(item);
        return results
    }, functions = function(object) {
        var i, results;
        results = [];
        for (i in object) jQuery.isFunction(object[i]) && results.push(i);
        return results
    }, identity = function(value) {
        return value
    }, Util = jQuery.extend(BaseUtil, {
        hasClass: hasClass,
        addClass: addClass,
        getAttribute: getAttribute,
        setAttribute: setAttribute,
        removeAttribute: removeAttribute,
        setAttributes: setAttributes,
        getData: getData,
        setData: setData,
        width: width,
        isString: isString,
        isArray: jQuery.isArray,
        isEmpty: isEmpty,
        assign: jQuery.extend,
        merge: merge,
        cloneDeep: cloneDeep,
        compact: compact,
        contains: contains,
        difference: difference,
        functions: functions,
        identity: identity,
        isPlainObject: jQuery.isPlainObject,
        trim: jQuery.trim
    }), utf8_encode = function(argString) {
        var c1, enc, end, n, start, string, stringl, utftext;
        if (null === argString || void 0 === argString) return "";
        for (string = argString + "", utftext = "", start = void 0, end = void 0, stringl = 0, start = end = 0, stringl = string.length, n = 0; n < stringl;) c1 = string.charCodeAt(n), enc = null, c1 < 128 ? end++ : enc = c1 > 127 && c1 < 2048 ? String.fromCharCode(c1 >> 6 | 192, 63 & c1 | 128) : String.fromCharCode(c1 >> 12 | 224, c1 >> 6 & 63 | 128, 63 & c1 | 128), null !== enc && (end > start && (utftext += string.slice(start, end)), utftext += enc, start = end = n + 1), n++;
        return end > start && (utftext += string.slice(start, stringl)), utftext
    }, crc32 = function(str) {
        var crc, i, iTop, table, x, y;
        for (str = utf8_encode(str), table = "00000000 77073096 EE0E612C 990951BA 076DC419 706AF48F E963A535 9E6495A3 0EDB8832 79DCB8A4 E0D5E91E 97D2D988 09B64C2B 7EB17CBD E7B82D07 90BF1D91 1DB71064 6AB020F2 F3B97148 84BE41DE 1ADAD47D 6DDDE4EB F4D4B551 83D385C7 136C9856 646BA8C0 FD62F97A 8A65C9EC 14015C4F 63066CD9 FA0F3D63 8D080DF5 3B6E20C8 4C69105E D56041E4 A2677172 3C03E4D1 4B04D447 D20D85FD A50AB56B 35B5A8FA 42B2986C DBBBC9D6 ACBCF940 32D86CE3 45DF5C75 DCD60DCF ABD13D59 26D930AC 51DE003A C8D75180 BFD06116 21B4F4B5 56B3C423 CFBA9599 B8BDA50F 2802B89E 5F058808 C60CD9B2 B10BE924 2F6F7C87 58684C11 C1611DAB B6662D3D 76DC4190 01DB7106 98D220BC EFD5102A 71B18589 06B6B51F 9FBFE4A5 E8B8D433 7807C9A2 0F00F934 9609A88E E10E9818 7F6A0DBB 086D3D2D 91646C97 E6635C01 6B6B51F4 1C6C6162 856530D8 F262004E 6C0695ED 1B01A57B 8208F4C1 F50FC457 65B0D9C6 12B7E950 8BBEB8EA FCB9887C 62DD1DDF 15DA2D49 8CD37CF3 FBD44C65 4DB26158 3AB551CE A3BC0074 D4BB30E2 4ADFA541 3DD895D7 A4D1C46D D3D6F4FB 4369E96A 346ED9FC AD678846 DA60B8D0 44042D73 33031DE5 AA0A4C5F DD0D7CC9 5005713C 270241AA BE0B1010 C90C2086 5768B525 206F85B3 B966D409 CE61E49F 5EDEF90E 29D9C998 B0D09822 C7D7A8B4 59B33D17 2EB40D81 B7BD5C3B C0BA6CAD EDB88320 9ABFB3B6 03B6E20C 74B1D29A EAD54739 9DD277AF 04DB2615 73DC1683 E3630B12 94643B84 0D6D6A3E 7A6A5AA8 E40ECF0B 9309FF9D 0A00AE27 7D079EB1 F00F9344 8708A3D2 1E01F268 6906C2FE F762575D 806567CB 196C3671 6E6B06E7 FED41B76 89D32BE0 10DA7A5A 67DD4ACC F9B9DF6F 8EBEEFF9 17B7BE43 60B08ED5 D6D6A3E8 A1D1937E 38D8C2C4 4FDFF252 D1BB67F1 A6BC5767 3FB506DD 48B2364B D80D2BDA AF0A1B4C 36034AF6 41047A60 DF60EFC3 A867DF55 316E8EEF 4669BE79 CB61B38C BC66831A 256FD2A0 5268E236 CC0C7795 BB0B4703 220216B9 5505262F C5BA3BBE B2BD0B28 2BB45A92 5CB36A04 C2D7FFA7 B5D0CF31 2CD99E8B 5BDEAE1D 9B64C2B0 EC63F226 756AA39C 026D930A 9C0906A9 EB0E363F 72076785 05005713 95BF4A82 E2B87A14 7BB12BAE 0CB61B38 92D28E9B E5D5BE0D 7CDCEFB7 0BDBDF21 86D3D2D4 F1D4E242 68DDB3F8 1FDA836E 81BE16CD F6B9265B 6FB077E1 18B74777 88085AE6 FF0F6A70 66063BCA 11010B5C 8F659EFF F862AE69 616BFFD3 166CCF45 A00AE278 D70DD2EE 4E048354 3903B3C2 A7672661 D06016F7 4969474D 3E6E77DB AED16A4A D9D65ADC 40DF0B66 37D83BF0 A9BCAE53 DEBB9EC5 47B2CF7F 30B5FFE9 BDBDF21C CABAC28A 53B39330 24B4A3A6 BAD03605 CDD70693 54DE5729 23D967BF B3667A2E C4614AB8 5D681B02 2A6F2B94 B40BBE37 C30C8EA1 5A05DF1B 2D02EF8D", crc = 0, x = 0, y = 0, crc ^= -1, i = 0, iTop = str.length; i < iTop;) y = 255 & (crc ^ str.charCodeAt(i)), x = "0x" + table.substr(9 * y, 8), crc = crc >>> 8 ^ x, i++;
        return crc ^= -1, crc < 0 && (crc += 4294967296), crc
    }, Layer = function() {
        function Layer(options) {
            this.options = {}, null != options && ["resourceType", "type", "publicId", "format"].forEach(function(_this) {
                return function(key) {
                    var ref;
                    return _this.options[key] = null != (ref = options[key]) ? ref : options[Util.snakeCase(key)]
                }
            }(this))
        }
        return Layer.prototype.resourceType = function(value) {
            return this.options.resourceType = value, this
        }, Layer.prototype.type = function(value) {
            return this.options.type = value, this
        }, Layer.prototype.publicId = function(value) {
            return this.options.publicId = value, this
        }, Layer.prototype.getPublicId = function() {
            var ref;
            return null != (ref = this.options.publicId) ? ref.replace(/\//g, ":") : void 0
        }, Layer.prototype.getFullPublicId = function() {
            return null != this.options.format ? this.getPublicId() + "." + this.options.format : this.getPublicId()
        }, Layer.prototype.format = function(value) {
            return this.options.format = value, this
        }, Layer.prototype.toString = function() {
            var components;
            if (components = [], null == this.options.publicId) throw "Must supply publicId";
            return "image" !== this.options.resourceType && components.push(this.options.resourceType), "upload" !== this.options.type && components.push(this.options.type), components.push(this.getFullPublicId()), Util.compact(components).join(":")
        }, Layer
    }(), FetchLayer = function(superClass) {
        function FetchLayer(options) {
            FetchLayer.__super__.constructor.call(this, options), Util.isString(options) ? this.options.url = options : (null != options ? options.url : void 0) && (this.options.url = options.url)
        }
        return extend(FetchLayer, superClass), FetchLayer.prototype.url = function(url) {
            return this.options.url = url, this
        }, FetchLayer.prototype.toString = function() {
            return "fetch:" + cloudinary.Util.base64EncodeURL(this.options.url)
        }, FetchLayer
    }(Layer), TextLayer = function(superClass) {
        function TextLayer(options) {
            var keys;
            TextLayer.__super__.constructor.call(this, options), keys = ["resourceType", "resourceType", "fontFamily", "fontSize", "fontWeight", "fontStyle", "textDecoration", "textAlign", "stroke", "letterSpacing", "lineSpacing", "text"], null != options && keys.forEach(function(_this) {
                return function(key) {
                    var ref;
                    return _this.options[key] = null != (ref = options[key]) ? ref : options[Util.snakeCase(key)]
                }
            }(this)), this.options.resourceType = "text"
        }
        return extend(TextLayer, superClass), TextLayer.prototype.resourceType = function(resourceType) {
            throw "Cannot modify resourceType for text layers"
        }, TextLayer.prototype.type = function(type) {
            throw "Cannot modify type for text layers"
        }, TextLayer.prototype.format = function(format) {
            throw "Cannot modify format for text layers"
        }, TextLayer.prototype.fontFamily = function(fontFamily) {
            return this.options.fontFamily = fontFamily, this
        }, TextLayer.prototype.fontSize = function(fontSize) {
            return this.options.fontSize = fontSize, this
        }, TextLayer.prototype.fontWeight = function(fontWeight) {
            return this.options.fontWeight = fontWeight, this
        }, TextLayer.prototype.fontStyle = function(fontStyle) {
            return this.options.fontStyle = fontStyle, this
        }, TextLayer.prototype.textDecoration = function(textDecoration) {
            return this.options.textDecoration = textDecoration, this
        }, TextLayer.prototype.textAlign = function(textAlign) {
            return this.options.textAlign = textAlign, this
        }, TextLayer.prototype.stroke = function(stroke) {
            return this.options.stroke = stroke, this
        }, TextLayer.prototype.letterSpacing = function(letterSpacing) {
            return this.options.letterSpacing = letterSpacing, this
        }, TextLayer.prototype.lineSpacing = function(lineSpacing) {
            return this.options.lineSpacing = lineSpacing, this
        }, TextLayer.prototype.text = function(text) {
            return this.options.text = text, this
        }, TextLayer.prototype.toString = function() {
            var components, hasPublicId, hasStyle, publicId, re, res, start, style, text, textSource;
            if (style = this.textStyleIdentifier(), null != this.options.publicId && (publicId = this.getFullPublicId()), null != this.options.text) {
                if (hasPublicId = !Util.isEmpty(publicId), hasStyle = !Util.isEmpty(style), hasPublicId && hasStyle || !hasPublicId && !hasStyle) throw "Must supply either style parameters or a public_id when providing text parameter in a text overlay/underlay, but not both!";
                for (re = /\$\([a-zA-Z]\w*\)/g, start = 0, textSource = Util.smartEscape(this.options.text, /[,\/]/g), text = ""; res = re.exec(textSource);) text += Util.smartEscape(textSource.slice(start, res.index)), text += res[0], start = res.index + res[0].length;
                text += Util.smartEscape(textSource.slice(start))
            }
            return components = [this.options.resourceType, style, publicId, text], Util.compact(components).join(":")
        }, TextLayer.prototype.textStyleIdentifier = function() {
            var components;
            if (components = [], "normal" !== this.options.fontWeight && components.push(this.options.fontWeight), "normal" !== this.options.fontStyle && components.push(this.options.fontStyle), "none" !== this.options.textDecoration && components.push(this.options.textDecoration), components.push(this.options.textAlign), "none" !== this.options.stroke && components.push(this.options.stroke), Util.isEmpty(this.options.letterSpacing) && !Util.isNumberLike(this.options.letterSpacing) || components.push("letter_spacing_" + this.options.letterSpacing), Util.isEmpty(this.options.lineSpacing) && !Util.isNumberLike(this.options.lineSpacing) || components.push("line_spacing_" + this.options.lineSpacing), !Util.isEmpty(Util.compact(components))) {
                if (Util.isEmpty(this.options.fontFamily)) throw "Must supply fontFamily. " + components;
                if (Util.isEmpty(this.options.fontSize) && !Util.isNumberLike(this.options.fontSize)) throw "Must supply fontSize."
            }
            return components.unshift(this.options.fontFamily, this.options.fontSize), components = Util.compact(components).join("_")
        }, TextLayer
    }(Layer), SubtitlesLayer = function(superClass) {
        function SubtitlesLayer(options) {
            SubtitlesLayer.__super__.constructor.call(this, options), this.options.resourceType = "subtitles"
        }
        return extend(SubtitlesLayer, superClass), SubtitlesLayer
    }(TextLayer), Param = function() {
        function Param(name, shortName, process) {
            null == process && (process = cloudinary.Util.identity), this.name = name, this.shortName = shortName, this.process = process
        }
        return Param.prototype.set = function(origValue) {
            return this.origValue = origValue, this
        }, Param.prototype.serialize = function() {
            var val, valid;
            return val = this.value(), valid = cloudinary.Util.isArray(val) || cloudinary.Util.isPlainObject(val) || cloudinary.Util.isString(val) ? !cloudinary.Util.isEmpty(val) : null != val, null != this.shortName && valid ? this.shortName + "_" + val : ""
        }, Param.prototype.value = function() {
            return this.process(this.origValue)
        }, Param.norm_color = function(value) {
            return null != value ? value.replace(/^#/, "rgb:") : void 0
        }, Param.prototype.build_array = function(arg) {
            return null == arg && (arg = []), cloudinary.Util.isArray(arg) ? arg : [arg]
        }, Param.process_video_params = function(param) {
            var video;
            switch (param.constructor) {
                case Object:
                    return video = "", "codec" in param && (video = param.codec, "profile" in param && (video += ":" + param.profile, "level" in param && (video += ":" + param.level))), video;
                case String:
                    return param;
                default:
                    return null
            }
        }, Param
    }(), ArrayParam = function(superClass) {
        function ArrayParam(name, shortName, sep, process) {
            null == sep && (sep = "."), this.sep = sep, ArrayParam.__super__.constructor.call(this, name, shortName, process)
        }
        return extend(ArrayParam, superClass), ArrayParam.prototype.serialize = function() {
            var arrayValue, flat, t;
            return null != this.shortName ? (arrayValue = this.value(), cloudinary.Util.isEmpty(arrayValue) ? "" : cloudinary.Util.isString(arrayValue) ? this.shortName + "_" + arrayValue : (flat = function() {
                var j, len, results;
                for (results = [], j = 0, len = arrayValue.length; j < len; j++) t = arrayValue[j], cloudinary.Util.isFunction(t.serialize) ? results.push(t.serialize()) : results.push(t);
                return results
            }(), this.shortName + "_" + flat.join(this.sep))) : ""
        }, ArrayParam.prototype.value = function() {
            var j, len, ref, results, v;
            if (cloudinary.Util.isArray(this.origValue)) {
                for (ref = this.origValue, results = [], j = 0, len = ref.length; j < len; j++) v = ref[j], results.push(this.process(v));
                return results
            }
            return this.process(this.origValue)
        }, ArrayParam.prototype.set = function(origValue) {
            return null == origValue || cloudinary.Util.isArray(origValue) ? ArrayParam.__super__.set.call(this, origValue) : ArrayParam.__super__.set.call(this, [origValue])
        }, ArrayParam
    }(Param), TransformationParam = function(superClass) {
        function TransformationParam(name, shortName, sep, process) {
            null == shortName && (shortName = "t"), null == sep && (sep = "."), this.sep = sep, TransformationParam.__super__.constructor.call(this, name, shortName, process)
        }
        return extend(TransformationParam, superClass), TransformationParam.prototype.serialize = function() {
            var joined, result, t;
            return cloudinary.Util.isEmpty(this.value()) ? "" : cloudinary.Util.allStrings(this.value()) ? (joined = this.value().join(this.sep), cloudinary.Util.isEmpty(joined) ? "" : this.shortName + "_" + joined) : (result = function() {
                var j, len, ref, results;
                for (ref = this.value(), results = [], j = 0, len = ref.length; j < len; j++) null != (t = ref[j]) && (cloudinary.Util.isString(t) && !cloudinary.Util.isEmpty(t) ? results.push(this.shortName + "_" + t) : cloudinary.Util.isFunction(t.serialize) ? results.push(t.serialize()) : cloudinary.Util.isPlainObject(t) && !cloudinary.Util.isEmpty(t) ? results.push(new Transformation(t).serialize()) : results.push(void 0));
                return results
            }.call(this), cloudinary.Util.compact(result))
        }, TransformationParam.prototype.set = function(origValue1) {
            return this.origValue = origValue1, cloudinary.Util.isArray(this.origValue) ? TransformationParam.__super__.set.call(this, this.origValue) : TransformationParam.__super__.set.call(this, [this.origValue])
        }, TransformationParam
    }(Param), RangeParam = function(superClass) {
        function RangeParam(name, shortName, process) {
            null == process && (process = this.norm_range_value), RangeParam.__super__.constructor.call(this, name, shortName, process)
        }
        return extend(RangeParam, superClass), RangeParam.norm_range_value = function(value) {
            var modifier, offset;
            return offset = String(value).match(new RegExp("^" + offset_any_pattern + "$")), offset && (modifier = null != offset[5] ? "p" : "", value = (offset[1] || offset[4]) + modifier), value
        }, RangeParam
    }(Param), RawParam = function(superClass) {
        function RawParam(name, shortName, process) {
            null == process && (process = cloudinary.Util.identity), RawParam.__super__.constructor.call(this, name, shortName, process)
        }
        return extend(RawParam, superClass), RawParam.prototype.serialize = function() {
            return this.value()
        }, RawParam
    }(Param), LayerParam = function(superClass) {
        function LayerParam() {
            return LayerParam.__super__.constructor.apply(this, arguments)
        }
        return extend(LayerParam, superClass), LayerParam.prototype.value = function() {
            var layerOptions, result;
            return layerOptions = this.origValue, cloudinary.Util.isPlainObject(layerOptions) ? (layerOptions = Util.withCamelCaseKeys(layerOptions), result = "text" === layerOptions.resourceType || null != layerOptions.text ? new cloudinary.TextLayer(layerOptions).toString() : "subtitles" === layerOptions.resourceType ? new cloudinary.SubtitlesLayer(layerOptions).toString() : "fetch" === layerOptions.resourceType || null != layerOptions.url ? new cloudinary.FetchLayer(layerOptions).toString() : new cloudinary.Layer(layerOptions).toString()) : result = /^fetch:.+/.test(layerOptions) ? new FetchLayer(layerOptions.substr(6)).toString() : layerOptions, result
        }, [
            ["font_weight", "normal"],
            ["font_style", "normal"],
            ["text_decoration", "none"],
            ["text_align", null],
            ["stroke", "none"],
            ["letter_spacing", null],
            ["line_spacing", null]
        ], LayerParam.prototype.textStyle = function(layer) {
            return new cloudinary.TextLayer(layer).textStyleIdentifier()
        }, LayerParam
    }(Param), ExpressionParam = function(superClass) {
        function ExpressionParam() {
            return ExpressionParam.__super__.constructor.apply(this, arguments)
        }
        return extend(ExpressionParam, superClass), ExpressionParam.prototype.serialize = function() {
            return Expression.normalize(ExpressionParam.__super__.serialize.call(this))
        }, ExpressionParam
    }(Param), parameters = {}, parameters.Param = Param, parameters.ArrayParam = ArrayParam, parameters.RangeParam = RangeParam, parameters.RawParam = RawParam, parameters.TransformationParam = TransformationParam, parameters.LayerParam = LayerParam, parameters.ExpressionParam = ExpressionParam, Expression = function() {
        function Expression(expressionStr) {
            this.expressions = [], null != expressionStr && this.expressions.push(Expression.normalize(expressionStr))
        }
        return Expression.OPERATORS = {
                "=": "eq",
                "!=": "ne",
                "<": "lt",
                ">": "gt",
                "<=": "lte",
                ">=": "gte",
                "&&": "and",
                "||": "or",
                "*": "mul",
                "/": "div",
                "+": "add",
                "-": "sub"
            }, Expression.PREDEFINED_VARS = {
                aspect_ratio: "ar",
                aspectRatio: "ar",
                current_page: "cp",
                currentPage: "cp",
                face_count: "fc",
                faceCount: "fc",
                height: "h",
                initial_aspect_ratio: "iar",
                initial_height: "ih",
                initial_width: "iw",
                initialAspectRatio: "iar",
                initialHeight: "ih",
                initialWidth: "iw",
                page_count: "pc",
                page_x: "px",
                page_y: "py",
                pageCount: "pc",
                pageX: "px",
                pageY: "py",
                tags: "tags",
                width: "w"
            }, Expression.BOUNDRY = "[ _]+", Expression.new = function(expressionStr) {
                return new this(expressionStr)
            }, Expression.normalize = function(expression) {
                var operators, pattern, replaceRE;
                return null == expression ? expression : (expression = String(expression), operators = "\\|\\||>=|<=|&&|!=|>|=|<|/|-|\\+|\\*", pattern = "((" + operators + ")(?=[ _])|" + Object.keys(Expression.PREDEFINED_VARS).join("|") + ")", replaceRE = new RegExp(pattern, "g"), expression = expression.replace(replaceRE, function(match) {
                    return Expression.OPERATORS[match] || Expression.PREDEFINED_VARS[match]
                }), expression.replace(/[ _]+/g, "_"))
            }, Expression.prototype.serialize = function() {
                return Expression.normalize(this.expressions.join("_"))
            }, Expression.prototype.toString = function() {
                return this.serialize()
            }, Expression.prototype.getParent = function() {
                return this.parent
            }, Expression.prototype.setParent = function(parent) {
                return this.parent = parent, this
            }, Expression.prototype.predicate = function(name, operator, value) {
                return null != Expression.OPERATORS[operator] && (operator = Expression.OPERATORS[operator]), this.expressions.push(name + "_" + operator + "_" + value), this
            }, Expression.prototype.and = function() {
                return this.expressions.push("and"), this
            }, Expression.prototype.or = function() {
                return this.expressions.push("or"), this
            }, Expression.prototype.then = function() {
                return this.getParent().if(this.toString())
            }, Expression.prototype.height = function(operator, value) {
                return this.predicate("h", operator, value)
            }, Expression.prototype.width = function(operator, value) {
                return this.predicate("w", operator, value)
            }, Expression.prototype.aspectRatio = function(operator, value) {
                return this.predicate("ar", operator, value)
            }, Expression.prototype.pageCount = function(operator, value) {
                return this.predicate("pc", operator, value)
            }, Expression.prototype.faceCount = function(operator, value) {
                return this.predicate("fc", operator, value)
            }, Expression.prototype.value = function(value) {
                return this.expressions.push(value), this
            }, Expression.variable = function(name, value) {
                return new this(name).value(value)
            }, Expression.width = function() {
                return new this("width")
            }, Expression.height = function() {
                return new this("height")
            }, Expression.initialWidth = function() {
                return new this("initialWidth")
            }, Expression.initialHeight = function() {
                return new this("initialHeight")
            }, Expression.aspectRatio = function() {
                return new this("aspectRatio")
            }, Expression.initialAspectRatio = function() {
                return new this("initialAspectRatio")
            }, Expression.pageCount = function() {
                return new this("pageCount")
            },
            function() {
                return new this("faceCount")
            }, Expression.currentPage = function() {
                return new this("currentPage")
            }, Expression.tags = function() {
                return new this("tags")
            }, Expression.pageX = function() {
                return new this("pageX")
            }, Expression.pageY = function() {
                return new this("pageY")
            }, Expression
    }(), Condition = function(superClass) {
        function Condition(conditionStr) {
            Condition.__super__.constructor.call(this, conditionStr)
        }
        return extend(Condition, superClass), Condition.prototype.height = function(operator, value) {
            return this.predicate("h", operator, value)
        }, Condition.prototype.width = function(operator, value) {
            return this.predicate("w", operator, value)
        }, Condition.prototype.aspectRatio = function(operator, value) {
            return this.predicate("ar", operator, value)
        }, Condition.prototype.pageCount = function(operator, value) {
            return this.predicate("pc", operator, value)
        }, Condition.prototype.faceCount = function(operator, value) {
            return this.predicate("fc", operator, value)
        }, Condition
    }(Expression), Configuration = function() {
        function Configuration(options) {
            null == options && (options = {}), this.configuration = Util.cloneDeep(options), Util.defaults(this.configuration, DEFAULT_CONFIGURATION_PARAMS)
        }
        var DEFAULT_CONFIGURATION_PARAMS, ref;
        return DEFAULT_CONFIGURATION_PARAMS = {
            responsive_class: "cld-responsive",
            responsive_use_breakpoints: !0,
            round_dpr: !0,
            secure: "https:" === ("undefined" != typeof window && null !== window && null != (ref = window.location) ? ref.protocol : void 0)
        }, Configuration.CONFIG_PARAMS = ["api_key", "api_secret", "callback", "cdn_subdomain", "cloud_name", "cname", "private_cdn", "protocol", "resource_type", "responsive", "responsive_class", "responsive_use_breakpoints", "responsive_width", "round_dpr", "secure", "secure_cdn_subdomain", "secure_distribution", "shorten", "type", "upload_preset", "url_suffix", "use_root_path", "version"], Configuration.prototype.init = function() {
            return this.fromEnvironment(), this.fromDocument(), this
        }, Configuration.prototype.set = function(name, value) {
            return this.configuration[name] = value, this
        }, Configuration.prototype.get = function(name) {
            return this.configuration[name]
        }, Configuration.prototype.merge = function(config) {
            return null == config && (config = {}), Util.assign(this.configuration, Util.cloneDeep(config)), this
        }, Configuration.prototype.fromDocument = function() {
            var el, j, len, meta_elements;
            if (meta_elements = "undefined" != typeof document && null !== document ? document.querySelectorAll('meta[name^="cloudinary_"]') : void 0)
                for (j = 0, len = meta_elements.length; j < len; j++) el = meta_elements[j], this.configuration[el.getAttribute("name").replace("cloudinary_", "")] = el.getAttribute("content");
            return this
        }, Configuration.prototype.fromEnvironment = function() {
            var cloudinary_url, j, k, len, query, ref1, ref2, ref3, uri, uriRegex, v, value;
            if (null != (cloudinary_url = "undefined" != typeof process && null !== process && null != (ref1 = process.env) ? ref1.CLOUDINARY_URL : void 0) && (uriRegex = /cloudinary:\/\/(?:(\w+)(?:\:([\w-]+))?@)?([\w\.-]+)(?:\/([^?]*))?(?:\?(.+))?/, (uri = uriRegex.exec(cloudinary_url)) && (null != uri[3] && (this.configuration.cloud_name = uri[3]), null != uri[1] && (this.configuration.api_key = uri[1]), null != uri[2] && (this.configuration.api_secret = uri[2]), null != uri[4] && (this.configuration.private_cdn = null != uri[4]), null != uri[4] && (this.configuration.secure_distribution = uri[4]), null != (query = uri[5]))))
                for (ref2 = query.split("&"), j = 0, len = ref2.length; j < len; j++) value = ref2[j], ref3 = value.split("="), k = ref3[0], v = ref3[1], null == v && (v = !0), this.configuration[k] = v;
            return this
        }, Configuration.prototype.config = function(new_config, new_value) {
            switch (!1) {
                case void 0 === new_value:
                    return this.set(new_config, new_value), this.configuration;
                case !Util.isString(new_config):
                    return this.get(new_config);
                case !Util.isPlainObject(new_config):
                    return this.merge(new_config), this.configuration;
                default:
                    return this.configuration
            }
        }, Configuration.prototype.toOptions = function() {
            return Util.cloneDeep(this.configuration)
        }, Configuration
    }(), TransformationBase = function() {
        function TransformationBase(options) {
            var parent, trans;
            null == options && (options = {}), parent = void 0, trans = {}, this.toOptions || (this.toOptions = function(withChain) {
                var key, list, opt, ref, ref1, tr, value;
                null == withChain && (withChain = !0), opt = {};
                for (key in trans) value = trans[key], opt[key] = value.origValue;
                ref = this.otherOptions;
                for (key in ref) void 0 !== (value = ref[key]) && (opt[key] = value);
                if (withChain && !Util.isEmpty(this.chained)) {
                    list = function() {
                        var j, len, ref1, results;
                        for (ref1 = this.chained, results = [], j = 0, len = ref1.length; j < len; j++) tr = ref1[j], results.push(tr.toOptions());
                        return results
                    }.call(this), list.push(opt), opt = {}, ref1 = this.otherOptions;
                    for (key in ref1) void 0 !== (value = ref1[key]) && (opt[key] = value);
                    opt.transformation = list
                }
                return opt
            }), this.setParent || (this.setParent = function(object) {
                return parent = object, null != object && this.fromOptions("function" == typeof object.toOptions ? object.toOptions() : void 0), this
            }), this.getParent || (this.getParent = function() {
                return parent
            }), this.param || (this.param = function(value, name, abbr, defaultValue, process) {
                return null == process && (process = Util.isFunction(defaultValue) ? defaultValue : Util.identity), trans[name] = new Param(name, abbr, process).set(value), this
            }), this.rawParam || (this.rawParam = function(value, name, abbr, defaultValue, process) {
                return null == process && (process = Util.identity), process = lastArgCallback(arguments), trans[name] = new RawParam(name, abbr, process).set(value), this
            }), this.rangeParam || (this.rangeParam = function(value, name, abbr, defaultValue, process) {
                return null == process && (process = Util.identity), process = lastArgCallback(arguments), trans[name] = new RangeParam(name, abbr, process).set(value), this
            }), this.arrayParam || (this.arrayParam = function(value, name, abbr, sep, defaultValue, process) {
                return null == sep && (sep = ":"), null == defaultValue && (defaultValue = []), null == process && (process = Util.identity), process = lastArgCallback(arguments), trans[name] = new ArrayParam(name, abbr, sep, process).set(value), this
            }), this.transformationParam || (this.transformationParam = function(value, name, abbr, sep, defaultValue, process) {
                return null == sep && (sep = "."), null == process && (process = Util.identity), process = lastArgCallback(arguments), trans[name] = new TransformationParam(name, abbr, sep, process).set(value), this
            }), this.layerParam || (this.layerParam = function(value, name, abbr) {
                return trans[name] = new LayerParam(name, abbr).set(value), this
            }), this.getValue || (this.getValue = function(name) {
                var ref, ref1;
                return null != (ref = null != (ref1 = trans[name]) ? ref1.value() : void 0) ? ref : this.otherOptions[name]
            }), this.get || (this.get = function(name) {
                return trans[name]
            }), this.remove || (this.remove = function(name) {
                var temp;
                switch (!1) {
                    case null == trans[name]:
                        return temp = trans[name], delete trans[name], temp.origValue;
                    case null == this.otherOptions[name]:
                        return temp = this.otherOptions[name], delete this.otherOptions[name], temp;
                    default:
                        return null
                }
            }), this.keys || (this.keys = function() {
                var key;
                return function() {
                    var results;
                    results = [];
                    for (key in trans) null != key && results.push(key.match(VAR_NAME_RE) ? key : Util.snakeCase(key));
                    return results
                }().sort()
            }), this.toPlainObject || (this.toPlainObject = function() {
                var hash, key, list, tr;
                hash = {};
                for (key in trans) hash[key] = trans[key].value(), Util.isPlainObject(hash[key]) && (hash[key] = Util.cloneDeep(hash[key]));
                return Util.isEmpty(this.chained) || (list = function() {
                    var j, len, ref, results;
                    for (ref = this.chained, results = [], j = 0, len = ref.length; j < len; j++) tr = ref[j], results.push(tr.toPlainObject());
                    return results
                }.call(this), list.push(hash), hash = {
                    transformation: list
                }), hash
            }), this.chain || (this.chain = function() {
                var names, tr;
                return names = Object.getOwnPropertyNames(trans), 0 !== names.length && (tr = new this.constructor(this.toOptions(!1)), this.resetTransformations(), this.chained.push(tr)), this
            }), this.resetTransformations || (this.resetTransformations = function() {
                return trans = {}, this
            }), this.otherOptions || (this.otherOptions = {}), this.chained = [], Util.isEmpty(options) || this.fromOptions(options)
        }
        var VAR_NAME_RE, lastArgCallback, processVar;
        return VAR_NAME_RE = /^\$[a-zA-Z0-9]+$/, TransformationBase.prototype.trans_separator = "/", TransformationBase.prototype.param_separator = ",", lastArgCallback = function(args) {
            var callback;
            return callback = null != args ? args[args.length - 1] : void 0, Util.isFunction(callback) ? callback : void 0
        }, TransformationBase.prototype.fromOptions = function(options) {
            var key, opt;
            if (options instanceof TransformationBase) this.fromTransformation(options);
            else {
                options || (options = {}), (Util.isString(options) || Util.isArray(options)) && (options = {
                    transformation: options
                }), options = Util.cloneDeep(options, function(value) {
                    if (value instanceof TransformationBase) return new value.constructor(value.toOptions())
                }), options.if && (this.set("if", options.if), delete options.if);
                for (key in options) opt = options[key], key.match(VAR_NAME_RE) ? "$attr" !== key && this.set("variable", key, opt) : this.set(key, opt)
            }
            return this
        }, TransformationBase.prototype.fromTransformation = function(other) {
            var j, key, len, ref;
            if (other instanceof TransformationBase)
                for (ref = other.keys(), j = 0, len = ref.length; j < len; j++) key = ref[j], this.set(key, other.get(key).origValue);
            return this
        }, TransformationBase.prototype.set = function() {
            var camelKey, key, values;
            return key = arguments[0], values = 2 <= arguments.length ? slice.call(arguments, 1) : [], camelKey = Util.camelCase(key), Util.contains(Transformation.methods, camelKey) ? this[camelKey].apply(this, values) : this.otherOptions[key] = values[0], this
        }, TransformationBase.prototype.hasLayer = function() {
            return this.getValue("overlay") || this.getValue("underlay")
        }, TransformationBase.prototype.serialize = function() {
            var ifParam, j, len, paramList, ref, ref1, ref2, ref3, ref4, resultArray, t, tr, transformationList, transformationString, transformations, value, variables, vars;
            for (resultArray = function() {
                    var j, len, ref, results;
                    for (ref = this.chained, results = [], j = 0, len = ref.length; j < len; j++) tr = ref[j], results.push(tr.serialize());
                    return results
                }.call(this), paramList = this.keys(), transformations = null != (ref = this.get("transformation")) ? ref.serialize() : void 0, ifParam = null != (ref1 = this.get("if")) ? ref1.serialize() : void 0, variables = processVar(null != (ref2 = this.get("variables")) ? ref2.value() : void 0), paramList = Util.difference(paramList, ["transformation", "if", "variables"]), vars = [], transformationList = [], j = 0, len = paramList.length; j < len; j++) t = paramList[j], t.match(VAR_NAME_RE) ? vars.push(t + "_" + Expression.normalize(null != (ref3 = this.get(t)) ? ref3.value() : void 0)) : transformationList.push(null != (ref4 = this.get(t)) ? ref4.serialize() : void 0);
            switch (!1) {
                case !Util.isString(transformations):
                    transformationList.push(transformations);
                    break;
                case !Util.isArray(transformations):
                    resultArray = resultArray.concat(transformations)
            }
            return transformationList = function() {
                var l, len1, results;
                for (results = [], l = 0, len1 = transformationList.length; l < len1; l++) value = transformationList[l], (Util.isArray(value) && !Util.isEmpty(value) || !Util.isArray(value) && value) && results.push(value);
                return results
            }(), transformationList = vars.sort().concat(variables).concat(transformationList.sort()), "if_end" === ifParam ? transformationList.push(ifParam) : Util.isEmpty(ifParam) || transformationList.unshift(ifParam), transformationString = Util.compact(transformationList).join(this.param_separator), Util.isEmpty(transformationString) || resultArray.push(transformationString), Util.compact(resultArray).join(this.trans_separator)
        }, TransformationBase.prototype.listNames = function() {
            return Transformation.methods
        }, TransformationBase.prototype.toHtmlAttributes = function() {
            var attrName, height, j, key, len, options, ref, ref1, ref2, ref3, value;
            options = {}, ref = this.otherOptions;
            for (key in ref) value = ref[key], Util.contains(Transformation.PARAM_NAMES, Util.snakeCase(key)) || (attrName = /^html_/.test(key) ? key.slice(5) : key, options[attrName] = value);
            for (ref1 = this.keys(), j = 0, len = ref1.length; j < len; j++) key = ref1[j], /^html_/.test(key) && (options[Util.camelCase(key.slice(5))] = this.getValue(key));
            return this.hasLayer() || this.getValue("angle") || Util.contains(["fit", "limit", "lfill"], this.getValue("crop")) || (width = null != (ref2 = this.get("width")) ? ref2.origValue : void 0, height = null != (ref3 = this.get("height")) ? ref3.origValue : void 0, parseFloat(width) >= 1 && null == options.width && (options.width = width), parseFloat(height) >= 1 && null == options.height && (options.height = height)), options
        }, TransformationBase.prototype.isValidParamName = function(name) {
            return Transformation.methods.indexOf(Util.camelCase(name)) >= 0
        }, TransformationBase.prototype.toHtml = function() {
            var ref;
            return null != (ref = this.getParent()) && "function" == typeof ref.toHtml ? ref.toHtml() : void 0
        }, TransformationBase.prototype.toString = function() {
            return this.serialize()
        }, processVar = function(varArray) {
            var j, len, name, ref, results, v;
            if (Util.isArray(varArray)) {
                for (results = [], j = 0, len = varArray.length; j < len; j++) ref = varArray[j], name = ref[0], v = ref[1], results.push(name + "_" + Expression.normalize(v));
                return results
            }
            return varArray
        }, TransformationBase
    }(), Transformation = function(superClass) {
        function Transformation(options) {
            null == options && (options = {}), Transformation.__super__.constructor.call(this, options)
        }
        return extend(Transformation, superClass), Transformation.new = function(args) {
            return new Transformation(args)
        }, Transformation.prototype.angle = function(value) {
            return this.arrayParam(value, "angle", "a", ".", Expression.normalize)
        }, Transformation.prototype.audioCodec = function(value) {
            return this.param(value, "audio_codec", "ac")
        }, Transformation.prototype.audioFrequency = function(value) {
            return this.param(value, "audio_frequency", "af")
        }, Transformation.prototype.aspectRatio = function(value) {
            return this.param(value, "aspect_ratio", "ar", Expression.normalize)
        }, Transformation.prototype.background = function(value) {
            return this.param(value, "background", "b", Param.norm_color)
        }, Transformation.prototype.bitRate = function(value) {
            return this.param(value, "bit_rate", "br")
        }, Transformation.prototype.border = function(value) {
            return this.param(value, "border", "bo", function(border) {
                return Util.isPlainObject(border) ? (border = Util.assign({}, {
                    color: "black",
                    width: 2
                }, border), border.width + "px_solid_" + Param.norm_color(border.color)) : border
            })
        }, Transformation.prototype.color = function(value) {
            return this.param(value, "color", "co", Param.norm_color)
        }, Transformation.prototype.colorSpace = function(value) {
            return this.param(value, "color_space", "cs")
        }, Transformation.prototype.crop = function(value) {
            return this.param(value, "crop", "c")
        }, Transformation.prototype.defaultImage = function(value) {
            return this.param(value, "default_image", "d")
        }, Transformation.prototype.delay = function(value) {
            return this.param(value, "delay", "dl")
        }, Transformation.prototype.density = function(value) {
            return this.param(value, "density", "dn")
        }, Transformation.prototype.duration = function(value) {
            return this.rangeParam(value, "duration", "du")
        }, Transformation.prototype.dpr = function(value) {
            return this.param(value, "dpr", "dpr", function(_this) {
                return function(dpr) {
                    return dpr = dpr.toString(), (null != dpr ? dpr.match(/^\d+$/) : void 0) ? dpr + ".0" : Expression.normalize(dpr)
                }
            }())
        }, Transformation.prototype.effect = function(value) {
            return this.arrayParam(value, "effect", "e", ":", Expression.normalize)
        }, Transformation.prototype.else = function() {
            return this.if("else")
        }, Transformation.prototype.endIf = function() {
            return this.if("end")
        }, Transformation.prototype.endOffset = function(value) {
            return this.rangeParam(value, "end_offset", "eo")
        }, Transformation.prototype.fallbackContent = function(value) {
            return this.param(value, "fallback_content")
        }, Transformation.prototype.fetchFormat = function(value) {
            return this.param(value, "fetch_format", "f")
        }, Transformation.prototype.format = function(value) {
            return this.param(value, "format")
        }, Transformation.prototype.flags = function(value) {
            return this.arrayParam(value, "flags", "fl", ".")
        }, Transformation.prototype.gravity = function(value) {
            return this.param(value, "gravity", "g")
        }, Transformation.prototype.height = function(value) {
            return this.param(value, "height", "h", function(_this) {
                return function() {
                    return _this.getValue("crop") || _this.getValue("overlay") || _this.getValue("underlay") ? Expression.normalize(value) : null
                }
            }(this))
        }, Transformation.prototype.htmlHeight = function(value) {
            return this.param(value, "html_height")
        }, Transformation.prototype.htmlWidth = function(value) {
            return this.param(value, "html_width")
        }, Transformation.prototype.if = function(value) {
            var i, ifVal, j, trIf, trRest;
            switch (null == value && (value = ""), value) {
                case "else":
                    return this.chain(), this.param(value, "if", "if");
                case "end":
                    for (this.chain(), i = j = this.chained.length - 1; j >= 0 && "end" !== (ifVal = this.chained[i].getValue("if")) && (null == ifVal || (trIf = Transformation.new().if(ifVal), this.chained[i].remove("if"), trRest = this.chained[i], this.chained[i] = Transformation.new().transformation([trIf, trRest]), "else" === ifVal)); i = j += -1);
                    return this.param(value, "if", "if");
                case "":
                    return Condition.new().setParent(this);
                default:
                    return this.param(value, "if", "if", function(value) {
                        return Condition.new(value).toString()
                    })
            }
        }, Transformation.prototype.keyframeInterval = function(value) {
            return this.param(value, "keyframe_interval", "ki")
        }, Transformation.prototype.offset = function(value) {
            var end_o, ref, start_o;
            if (ref = Util.isFunction(null != value ? value.split : void 0) ? value.split("..") : Util.isArray(value) ? value : [null, null], start_o = ref[0], end_o = ref[1], null != start_o && this.startOffset(start_o), null != end_o) return this.endOffset(end_o)
        }, Transformation.prototype.opacity = function(value) {
            return this.param(value, "opacity", "o", Expression.normalize)
        }, Transformation.prototype.overlay = function(value) {
            return this.layerParam(value, "overlay", "l")
        }, Transformation.prototype.page = function(value) {
            return this.param(value, "page", "pg")
        }, Transformation.prototype.poster = function(value) {
            return this.param(value, "poster")
        }, Transformation.prototype.prefix = function(value) {
            return this.param(value, "prefix", "p")
        }, Transformation.prototype.quality = function(value) {
            return this.param(value, "quality", "q", Expression.normalize)
        }, Transformation.prototype.radius = function(value) {
            return this.param(value, "radius", "r", Expression.normalize)
        }, Transformation.prototype.rawTransformation = function(value) {
            return this.rawParam(value, "raw_transformation")
        }, Transformation.prototype.size = function(value) {
            var height, ref;
            if (Util.isFunction(null != value ? value.split : void 0)) return ref = value.split("x"), width = ref[0], height = ref[1], this.width(width), this.height(height)
        }, Transformation.prototype.sourceTypes = function(value) {
            return this.param(value, "source_types")
        }, Transformation.prototype.sourceTransformation = function(value) {
            return this.param(value, "source_transformation")
        }, Transformation.prototype.startOffset = function(value) {
            return this.rangeParam(value, "start_offset", "so")
        }, Transformation.prototype.streamingProfile = function(value) {
            return this.param(value, "streaming_profile", "sp")
        }, Transformation.prototype.transformation = function(value) {
            return this.transformationParam(value, "transformation", "t")
        }, Transformation.prototype.underlay = function(value) {
            return this.layerParam(value, "underlay", "u")
        }, Transformation.prototype.variable = function(name, value) {
            return this.param(value, name, name)
        }, Transformation.prototype.variables = function(values) {
            return this.arrayParam(values, "variables")
        }, Transformation.prototype.videoCodec = function(value) {
            return this.param(value, "video_codec", "vc", Param.process_video_params)
        }, Transformation.prototype.videoSampling = function(value) {
            return this.param(value, "video_sampling", "vs")
        }, Transformation.prototype.width = function(value) {
            return this.param(value, "width", "w", function(_this) {
                return function() {
                    return _this.getValue("crop") || _this.getValue("overlay") || _this.getValue("underlay") ? Expression.normalize(value) : null
                }
            }(this))
        }, Transformation.prototype.x = function(value) {
            return this.param(value, "x", "x", Expression.normalize)
        }, Transformation.prototype.y = function(value) {
            return this.param(value, "y", "y", Expression.normalize)
        }, Transformation.prototype.zoom = function(value) {
            return this.param(value, "zoom", "z", Expression.normalize)
        }, Transformation
    }(TransformationBase), Transformation.methods || (Transformation.methods = Util.difference(Util.functions(Transformation.prototype), Util.functions(TransformationBase.prototype))), Transformation.PARAM_NAMES || (Transformation.PARAM_NAMES = function() {
        var j, len, ref, results;
        for (ref = Transformation.methods, results = [], j = 0, len = ref.length; j < len; j++) m = ref[j], results.push(Util.snakeCase(m));
        return results
    }().concat(Configuration.CONFIG_PARAMS)), HtmlTag = function() {
        function HtmlTag(name, publicId, options) {
            var transformation;
            this.name = name, this.publicId = publicId, null == options && (Util.isPlainObject(publicId) ? (options = publicId, this.publicId = void 0) : options = {}), transformation = new Transformation(options), transformation.setParent(this), this.transformation = function() {
                return transformation
            }
        }
        var toAttribute;
        return HtmlTag.new = function(name, publicId, options) {
            return new this(name, publicId, options)
        }, toAttribute = function(key, value) {
            return value ? !0 === value ? key : key + '="' + value + '"' : void 0
        }, HtmlTag.prototype.htmlAttrs = function(attrs) {
            var key, value;
            return function() {
                var results;
                results = [];
                for (key in attrs)(value = attrs[key]) && results.push(toAttribute(key, value));
                return results
            }().sort().join(" ")
        }, HtmlTag.prototype.getOptions = function() {
            return this.transformation().toOptions()
        }, HtmlTag.prototype.getOption = function(name) {
            return this.transformation().getValue(name)
        }, HtmlTag.prototype.attributes = function() {
            return this.transformation().toHtmlAttributes()
        }, HtmlTag.prototype.setAttr = function(name, value) {
            return this.transformation().set("html_" + name, value), this
        }, HtmlTag.prototype.getAttr = function(name) {
            return this.attributes()["html_" + name] || this.attributes()[name]
        }, HtmlTag.prototype.removeAttr = function(name) {
            var ref;
            return null != (ref = this.transformation().remove("html_" + name)) ? ref : this.transformation().remove(name)
        }, HtmlTag.prototype.content = function() {
            return ""
        }, HtmlTag.prototype.openTag = function() {
            return "<" + this.name + " " + this.htmlAttrs(this.attributes()) + ">"
        }, HtmlTag.prototype.closeTag = function() {
            return "</" + this.name + ">"
        }, HtmlTag.prototype.toHtml = function() {
            return this.openTag() + this.content() + this.closeTag()
        }, HtmlTag.prototype.toDOM = function() {
            var element, name, ref, value;
            if (!Util.isFunction("undefined" != typeof document && null !== document ? document.createElement : void 0)) throw "Can't create DOM if document is not present!";
            element = document.createElement(this.name), ref = this.attributes();
            for (name in ref) value = ref[name], element[name] = value;
            return element
        }, HtmlTag.isResponsive = function(tag, responsiveClass) {
            var dataSrc;
            return dataSrc = Util.getData(tag, "src-cache") || Util.getData(tag, "src"), Util.hasClass(tag, responsiveClass) && /\bw_auto\b/.exec(dataSrc)
        }, HtmlTag
    }(), ImageTag = function(superClass) {
        function ImageTag(publicId, options) {
            null == options && (options = {}), ImageTag.__super__.constructor.call(this, "img", publicId, options)
        }
        return extend(ImageTag, superClass), ImageTag.prototype.closeTag = function() {
            return ""
        }, ImageTag.prototype.attributes = function() {
            var attr, options, srcAttribute;
            return attr = ImageTag.__super__.attributes.call(this) || [], options = this.getOptions(), srcAttribute = options.responsive && !options.client_hints ? "data-src" : "src", null == attr[srcAttribute] && (attr[srcAttribute] = new Cloudinary(this.getOptions()).url(this.publicId)), attr
        }, ImageTag
    }(HtmlTag), VideoTag = function(superClass) {
        function VideoTag(publicId, options) {
            null == options && (options = {}), options = Util.defaults({}, options, Cloudinary.DEFAULT_VIDEO_PARAMS), VideoTag.__super__.constructor.call(this, "video", publicId.replace(/\.(mp4|ogv|webm)$/, ""), options)
        }
        var DEFAULT_POSTER_OPTIONS, VIDEO_TAG_PARAMS;
        return extend(VideoTag, superClass), VIDEO_TAG_PARAMS = ["source_types", "source_transformation", "fallback_content", "poster"], ["webm", "mp4", "ogv"], DEFAULT_POSTER_OPTIONS = {
            format: "jpg",
            resource_type: "video"
        }, VideoTag.prototype.setSourceTransformation = function(value) {
            return this.transformation().sourceTransformation(value), this
        }, VideoTag.prototype.setSourceTypes = function(value) {
            return this.transformation().sourceTypes(value), this
        }, VideoTag.prototype.setPoster = function(value) {
            return this.transformation().poster(value), this
        }, VideoTag.prototype.setFallbackContent = function(value) {
            return this.transformation().fallbackContent(value), this
        }, VideoTag.prototype.content = function() {
            var cld, fallback, innerTags, mimeType, sourceTransformation, sourceTypes, src, srcType, transformation, videoType;
            return sourceTypes = this.transformation().getValue("source_types"), sourceTransformation = this.transformation().getValue("source_transformation"), fallback = this.transformation().getValue("fallback_content"), Util.isArray(sourceTypes) ? (cld = new Cloudinary(this.getOptions()), innerTags = function() {
                var j, len, results;
                for (results = [], j = 0, len = sourceTypes.length; j < len; j++) srcType = sourceTypes[j], transformation = sourceTransformation[srcType] || {}, src = cld.url("" + this.publicId, Util.defaults({}, transformation, {
                    resource_type: "video",
                    format: srcType
                })), videoType = "ogv" === srcType ? "ogg" : srcType, mimeType = "video/" + videoType, results.push("<source " + this.htmlAttrs({
                    src: src,
                    type: mimeType
                }) + ">");
                return results
            }.call(this)) : innerTags = [], innerTags.join("") + fallback
        }, VideoTag.prototype.attributes = function() {
            var a, attr, j, len, poster, ref, ref1, sourceTypes;
            for (sourceTypes = this.getOption("source_types"), poster = null != (ref = this.getOption("poster")) ? ref : {}, Util.isPlainObject(poster) && (defaults = null != poster.public_id ? Cloudinary.DEFAULT_IMAGE_PARAMS : DEFAULT_POSTER_OPTIONS, poster = new Cloudinary(this.getOptions()).url(null != (ref1 = poster.public_id) ? ref1 : this.publicId, Util.defaults({}, poster, defaults))), attr = VideoTag.__super__.attributes.call(this) || [], j = 0, len = attr.length; j < len; j++) a = attr[j], Util.contains(VIDEO_TAG_PARAMS) || (attr = a);
            return Util.isArray(sourceTypes) || (attr.src = new Cloudinary(this.getOptions()).url(this.publicId, {
                resource_type: "video",
                format: sourceTypes
            })), null != poster && (attr.poster = poster), attr
        }, VideoTag
    }(HtmlTag), ClientHintsMetaTag = function(superClass) {
        function ClientHintsMetaTag(options) {
            ClientHintsMetaTag.__super__.constructor.call(this, "meta", void 0, Util.assign({
                "http-equiv": "Accept-CH",
                content: "DPR, Viewport-Width, Width"
            }, options))
        }
        return extend(ClientHintsMetaTag, superClass), ClientHintsMetaTag.prototype.closeTag = function() {
            return ""
        }, ClientHintsMetaTag
    }(HtmlTag), Cloudinary = function() {
        function Cloudinary(options) {
            var configuration;
            this.devicePixelRatioCache = {}, this.responsiveConfig = {}, this.responsiveResizeInitialized = !1, configuration = new Configuration(options), this.config = function(newConfig, newValue) {
                return configuration.config(newConfig, newValue)
            }, this.fromDocument = function() {
                return configuration.fromDocument(), this
            }, this.fromEnvironment = function() {
                return configuration.fromEnvironment(), this
            }, this.init = function() {
                return configuration.init(), this
            }
        }
        var AKAMAI_SHARED_CDN, DEFAULT_POSTER_OPTIONS, DEFAULT_VIDEO_SOURCE_TYPES, OLD_AKAMAI_SHARED_CDN, SEO_TYPES, SHARED_CDN, absolutize, applyBreakpoints, cdnSubdomainNumber, closestAbove, cloudinaryUrlPrefix, defaultBreakpoints, finalizeResourceType, findContainerWidth, maxWidth, updateDpr;
        return "2.5.0", "d3jpl91pxevbkh.cloudfront.net", OLD_AKAMAI_SHARED_CDN = "cloudinary-a.akamaihd.net", AKAMAI_SHARED_CDN = "res.cloudinary.com", SHARED_CDN = AKAMAI_SHARED_CDN, DEFAULT_POSTER_OPTIONS = {
            format: "jpg",
            resource_type: "video"
        }, DEFAULT_VIDEO_SOURCE_TYPES = ["webm", "mp4", "ogv"], SEO_TYPES = {
            "image/upload": "images",
            "image/private": "private_images",
            "image/authenticated": "authenticated_images",
            "raw/upload": "files",
            "video/upload": "videos"
        }, Cloudinary.DEFAULT_IMAGE_PARAMS = {
            resource_type: "image",
            transformation: [],
            type: "upload"
        }, Cloudinary.DEFAULT_VIDEO_PARAMS = {
            fallback_content: "",
            resource_type: "video",
            source_transformation: {},
            source_types: DEFAULT_VIDEO_SOURCE_TYPES,
            transformation: [],
            type: "upload"
        }, Cloudinary.new = function(options) {
            return new this(options)
        }, finalizeResourceType = function(resourceType, type, urlSuffix, useRootPath, shorten) {
            var key, options;
            if (null == resourceType && (resourceType = "image"), null == type && (type = "upload"), Util.isPlainObject(resourceType) && (options = resourceType, resourceType = options.resource_type, type = options.type, urlSuffix = options.url_suffix, useRootPath = options.use_root_path, shorten = options.shorten), null == type && (type = "upload"), null != urlSuffix && (resourceType = SEO_TYPES[resourceType + "/" + type], type = null, null == resourceType)) throw new Error("URL Suffix only supported for " + function() {
                var results;
                results = [];
                for (key in SEO_TYPES) results.push(key);
                return results
            }().join(", "));
            if (useRootPath) {
                if (("image" !== resourceType || "upload" !== type) && "images" !== resourceType) throw new Error("Root path only supported for image/upload");
                resourceType = null, type = null
            }
            return shorten && "image" === resourceType && "upload" === type && (resourceType = "iu", type = null), [resourceType, type].join("/")
        }, absolutize = function(url) {
            var prefix;
            return url.match(/^https?:\//) || (prefix = document.location.protocol + "//" + document.location.host, "?" === url[0] ? prefix += document.location.pathname : "/" !== url[0] && (prefix += document.location.pathname.replace(/\/[^\/]*$/, "/")), url = prefix + url), url
        }, Cloudinary.prototype.url = function(publicId, options) {
            var prefix, ref, resourceTypeAndType, transformation, transformationString, url, version;
            if (null == options && (options = {}), !publicId) return publicId;
            if (options instanceof Transformation && (options = options.toOptions()), options = Util.defaults({}, options, this.config(), Cloudinary.DEFAULT_IMAGE_PARAMS), "fetch" === options.type && (options.fetch_format = options.fetch_format || options.format, publicId = absolutize(publicId)), transformation = new Transformation(options), transformationString = transformation.serialize(), !options.cloud_name) throw "Unknown cloud_name";
            if (publicId.search("/") >= 0 && !publicId.match(/^v[0-9]+/) && !publicId.match(/^https?:\//) && !(null != (ref = options.version) ? ref.toString() : void 0) && (options.version = 1), publicId.match(/^https?:/)) "upload" === options.type || "asset" === options.type ? url = publicId : publicId = encodeURIComponent(publicId).replace(/%3A/g, ":").replace(/%2F/g, "/");
            else {
                try {
                    publicId = decodeURIComponent(publicId)
                } catch (error1) {
                    error1
                }
                if (publicId = encodeURIComponent(publicId).replace(/%3A/g, ":").replace(/%2F/g, "/"), options.url_suffix) {
                    if (options.url_suffix.match(/[\.\/]/)) throw "url_suffix should not include . or /";
                    publicId = publicId + "/" + options.url_suffix
                }
                options.format && (options.trust_public_id || (publicId = publicId.replace(/\.(jpg|png|gif|webp)$/, "")), publicId = publicId + "." + options.format)
            }
            return prefix = cloudinaryUrlPrefix(publicId, options), resourceTypeAndType = finalizeResourceType(options.resource_type, options.type, options.url_suffix, options.use_root_path, options.shorten), version = options.version ? "v" + options.version : "", url || Util.compact([prefix, resourceTypeAndType, transformationString, version, publicId]).join("/").replace(/([^:])\/+/g, "$1/")
        }, Cloudinary.prototype.video_url = function(publicId, options) {
            return options = Util.assign({
                resource_type: "video"
            }, options), this.url(publicId, options)
        }, Cloudinary.prototype.video_thumbnail_url = function(publicId, options) {
            return options = Util.assign({}, DEFAULT_POSTER_OPTIONS, options), this.url(publicId, options)
        }, Cloudinary.prototype.transformation_string = function(options) {
            return new Transformation(options).serialize()
        }, Cloudinary.prototype.image = function(publicId, options) {
            var client_hints, img, ref, ref1;
            return null == options && (options = {}), img = this.imageTag(publicId, options), client_hints = null != (ref = null != (ref1 = options.client_hints) ? ref1 : this.config("client_hints")) && ref, null != options.src || client_hints || img.setAttr("src", ""), img = img.toDOM(), client_hints || (Util.setData(img, "src-cache", this.url(publicId, options)), this.cloudinary_update(img, options)), img
        }, Cloudinary.prototype.imageTag = function(publicId, options) {
            var tag;
            return tag = new ImageTag(publicId, this.config()), tag.transformation().fromOptions(options), tag
        }, Cloudinary.prototype.video_thumbnail = function(publicId, options) {
            return this.image(publicId, Util.merge({}, DEFAULT_POSTER_OPTIONS, options))
        }, Cloudinary.prototype.facebook_profile_image = function(publicId, options) {
            return this.image(publicId, Util.assign({
                type: "facebook"
            }, options))
        }, Cloudinary.prototype.twitter_profile_image = function(publicId, options) {
            return this.image(publicId, Util.assign({
                type: "twitter"
            }, options))
        }, Cloudinary.prototype.twitter_name_profile_image = function(publicId, options) {
            return this.image(publicId, Util.assign({
                type: "twitter_name"
            }, options))
        }, Cloudinary.prototype.gravatar_image = function(publicId, options) {
            return this.image(publicId, Util.assign({
                type: "gravatar"
            }, options))
        }, Cloudinary.prototype.fetch_image = function(publicId, options) {
            return this.image(publicId, Util.assign({
                type: "fetch"
            }, options))
        }, Cloudinary.prototype.video = function(publicId, options) {
            return null == options && (options = {}), this.videoTag(publicId, options).toHtml()
        }, Cloudinary.prototype.videoTag = function(publicId, options) {
            return options = Util.defaults({}, options, this.config()), new VideoTag(publicId, options)
        }, Cloudinary.prototype.sprite_css = function(publicId, options) {
            return options = Util.assign({
                type: "sprite"
            }, options), publicId.match(/.css$/) || (options.format = "css"), this.url(publicId, options)
        }, Cloudinary.prototype.responsive = function(options, bootstrap) {
            var ref, ref1, ref2, responsiveClass, timeout;
            if (null == bootstrap && (bootstrap = !0), this.responsiveConfig = Util.merge(this.responsiveConfig || {}, options), responsiveClass = null != (ref = this.responsiveConfig.responsive_class) ? ref : this.config("responsive_class"), bootstrap && this.cloudinary_update("img." + responsiveClass + ", img.cld-hidpi", this.responsiveConfig), (null == (ref1 = null != (ref2 = this.responsiveConfig.responsive_resize) ? ref2 : this.config("responsive_resize")) || ref1) && !this.responsiveResizeInitialized) return this.responsiveConfig.resizing = this.responsiveResizeInitialized = !0, timeout = null, window.addEventListener("resize", function(_this) {
                return function() {
                    var debounce, ref3, ref4, reset, run, wait, waitFunc;
                    return debounce = null != (ref3 = null != (ref4 = _this.responsiveConfig.responsive_debounce) ? ref4 : _this.config("responsive_debounce")) ? ref3 : 100, reset = function() {
                        if (timeout) return clearTimeout(timeout), timeout = null
                    }, run = function() {
                        return _this.cloudinary_update("img." + responsiveClass, _this.responsiveConfig)
                    }, waitFunc = function() {
                        return reset(), run()
                    }, wait = function() {
                        return reset(), timeout = setTimeout(waitFunc, debounce)
                    }, debounce ? wait() : run()
                }
            }(this))
        }, Cloudinary.prototype.calc_breakpoint = function(element, width, steps) {
            var breakpoints, point;
            return breakpoints = Util.getData(element, "breakpoints") || Util.getData(element, "stoppoints") || this.config("breakpoints") || this.config("stoppoints") || defaultBreakpoints, Util.isFunction(breakpoints) ? breakpoints(width, steps) : (Util.isString(breakpoints) && (breakpoints = function() {
                var j, len, ref, results;
                for (ref = breakpoints.split(","), results = [], j = 0, len = ref.length; j < len; j++) point = ref[j], results.push(parseInt(point));
                return results
            }().sort(function(a, b) {
                return a - b
            })), closestAbove(breakpoints, width))
        }, Cloudinary.prototype.calc_stoppoint = Cloudinary.prototype.calc_breakpoint, Cloudinary.prototype.device_pixel_ratio = function(roundDpr) {
            var dpr, dprString;
            return null == roundDpr && (roundDpr = !0), dpr = ("undefined" != typeof window && null !== window ? window.devicePixelRatio : void 0) || 1, roundDpr && (dpr = Math.ceil(dpr)), (dpr <= 0 || NaN === dpr) && (dpr = 1), dprString = dpr.toString(), dprString.match(/^\d+$/) && (dprString += ".0"), dprString
        }, defaultBreakpoints = function(width, steps) {
            return null == steps && (steps = 100), steps * Math.ceil(width / steps)
        }, closestAbove = function(list, value) {
            var i;
            for (i = list.length - 2; i >= 0 && list[i] >= value;) i--;
            return list[i + 1]
        }, cdnSubdomainNumber = function(publicId) {
            return crc32(publicId) % 5 + 1
        }, cloudinaryUrlPrefix = function(publicId, options) {
            var cdnPart, host, path, protocol, ref, subdomain;
            return 0 === (null != (ref = options.cloud_name) ? ref.indexOf("/") : void 0) ? "/res" + options.cloud_name : (protocol = "http://", cdnPart = "", subdomain = "res", host = ".cloudinary.com", path = "/" + options.cloud_name, options.protocol && (protocol = options.protocol + "//"), options.private_cdn && (cdnPart = options.cloud_name + "-", path = ""), options.cdn_subdomain && (subdomain = "res-" + cdnSubdomainNumber(publicId)), options.secure ? (protocol = "https://", !1 === options.secure_cdn_subdomain && (subdomain = "res"), null != options.secure_distribution && options.secure_distribution !== OLD_AKAMAI_SHARED_CDN && options.secure_distribution !== SHARED_CDN && (cdnPart = "", subdomain = "", host = options.secure_distribution)) : options.cname && (protocol = "http://", cdnPart = "", subdomain = options.cdn_subdomain ? "a" + (crc32(publicId) % 5 + 1) + "." : "", host = options.cname), [protocol, cdnPart, subdomain, host, path].join(""))
        }, Cloudinary.prototype.processImageTags = function(nodes, options) {
            var images, imgOptions, node, publicId, url;
            return null == options && (options = {}), Util.isEmpty(nodes) ? this : (options = Util.defaults({}, options, this.config()), images = function() {
                var j, len, ref, results;
                for (results = [], j = 0, len = nodes.length; j < len; j++) node = nodes[j], "IMG" === (null != (ref = node.tagName) ? ref.toUpperCase() : void 0) && (imgOptions = Util.assign({
                    width: node.getAttribute("width"),
                    height: node.getAttribute("height"),
                    src: node.getAttribute("src")
                }, options), publicId = imgOptions.source || imgOptions.src, delete imgOptions.source, delete imgOptions.src, url = this.url(publicId, imgOptions), imgOptions = new Transformation(imgOptions).toHtmlAttributes(), Util.setData(node, "src-cache", url), node.setAttribute("width", imgOptions.width), node.setAttribute("height", imgOptions.height), results.push(node));
                return results
            }.call(this), this.cloudinary_update(images, options), this)
        }, applyBreakpoints = function(tag, width, steps, options) {
            var ref, ref1, ref2, responsive_use_breakpoints;
            return responsive_use_breakpoints = null != (ref = null != (ref1 = null != (ref2 = options.responsive_use_breakpoints) ? ref2 : options.responsive_use_stoppoints) ? ref1 : this.config("responsive_use_breakpoints")) ? ref : this.config("responsive_use_stoppoints"), !responsive_use_breakpoints || "resize" === responsive_use_breakpoints && !options.resizing ? width : this.calc_breakpoint(tag, width, steps)
        }, findContainerWidth = function(element) {
            var containerWidth, style;
            for (containerWidth = 0;
                (element = null != element ? element.parentNode : void 0) instanceof Element && !containerWidth;) style = window.getComputedStyle(element), /^inline/.test(style.display) || (containerWidth = Util.width(element));
            return containerWidth
        }, updateDpr = function(dataSrc, roundDpr) {
            return dataSrc.replace(/\bdpr_(1\.0|auto)\b/g, "dpr_" + this.device_pixel_ratio(roundDpr))
        }, maxWidth = function(requiredWidth, tag) {
            var imageWidth;
            return imageWidth = Util.getData(tag, "width") || 0, requiredWidth > imageWidth && (imageWidth = requiredWidth, Util.setData(tag, "width", requiredWidth)), imageWidth
        }, Cloudinary.prototype.cloudinary_update = function(elements, options) {
            var containerWidth, dataSrc, j, len, match, ref, ref1, ref2, ref3, ref4, ref5, requiredWidth, responsive, responsiveClass, roundDpr, setUrl, tag;
            if (null == options && (options = {}), null === elements) return this;
            for (responsive = null != (ref = null != (ref1 = options.responsive) ? ref1 : this.config("responsive")) && ref, elements = function() {
                    switch (!1) {
                        case !Util.isArray(elements):
                        case "NodeList" !== elements.constructor.name:
                            return elements;
                        case !Util.isString(elements):
                            return document.querySelectorAll(elements);
                        default:
                            return [elements]
                    }
                }(), responsiveClass = null != (ref2 = null != (ref3 = this.responsiveConfig.responsive_class) ? ref3 : options.responsive_class) ? ref2 : this.config("responsive_class"), roundDpr = null != (ref4 = options.round_dpr) ? ref4 : this.config("round_dpr"), j = 0, len = elements.length; j < len; j++)
                if (tag = elements[j], (null != (ref5 = tag.tagName) ? ref5.match(/img/i) : void 0) && (setUrl = !0, responsive && Util.addClass(tag, responsiveClass), dataSrc = Util.getData(tag, "src-cache") || Util.getData(tag, "src"), !Util.isEmpty(dataSrc))) {
                    if (dataSrc = updateDpr.call(this, dataSrc, roundDpr), HtmlTag.isResponsive(tag, responsiveClass))
                        if (0 !== (containerWidth = findContainerWidth(tag))) {
                            switch (!1) {
                                case !/w_auto:breakpoints/.test(dataSrc):
                                    requiredWidth = maxWidth(containerWidth, tag), dataSrc = dataSrc.replace(/w_auto:breakpoints([_0-9]*)(:[0-9]+)?/, "w_auto:breakpoints$1:" + requiredWidth);
                                    break;
                                case !(match = /w_auto(:(\d+))?/.exec(dataSrc)):
                                    requiredWidth = applyBreakpoints.call(this, tag, containerWidth, match[2], options), requiredWidth = maxWidth(requiredWidth, tag),
                                        dataSrc = dataSrc.replace(/w_auto[^,\/]*/g, "w_" + requiredWidth)
                            }
                            //Util.removeAttribute(tag, "width"), options.responsive_preserve_height || Util.removeAttribute(tag, "height")
                        } else setUrl = !1;
                    setUrl && Util.setAttribute(tag, "src", dataSrc)
                }
            return this
        }, Cloudinary.prototype.transformation = function(options) {
            return Transformation.new(this.config()).fromOptions(options).setParent(this)
        }, Cloudinary
    }(),
    CloudinaryJQuery = function(superClass) {
        function CloudinaryJQuery(options) {
            CloudinaryJQuery.__super__.constructor.call(this, options)
        }
        return extend(CloudinaryJQuery, superClass), CloudinaryJQuery.prototype.image = function(publicId, options) {
            var client_hints, img, ref, ref1;
            return null == options && (options = {}), img = this.imageTag(publicId, options), client_hints = null != (ref = null != (ref1 = options.client_hints) ? ref1 : this.config("client_hints")) && ref, null != options.src || client_hints || img.setAttr("src", ""), img = jQuery(img.toHtml()), client_hints || img.data("src-cache", this.url(publicId, options)).cloudinary_update(options), img
        }, CloudinaryJQuery.prototype.responsive = function(options) {
            var ref, ref1, ref2, responsiveClass, responsiveConfig, responsiveResizeInitialized, timeout;
            if (responsiveConfig = jQuery.extend(responsiveConfig || {}, options), responsiveClass = null != (ref = this.responsiveConfig.responsive_class) ? ref : this.config("responsive_class"), jQuery("img." + responsiveClass + ", img.cld-hidpi").cloudinary_update(responsiveConfig), (null == (ref1 = null != (ref2 = responsiveConfig.responsive_resize) ? ref2 : this.config("responsive_resize")) || ref1) && !responsiveResizeInitialized) return responsiveConfig.resizing = responsiveResizeInitialized = !0, timeout = null, jQuery(window).on("resize", function(_this) {
                return function() {
                    var debounce, ref3, ref4, reset, run, wait;
                    return debounce = null != (ref3 = null != (ref4 = responsiveConfig.responsive_debounce) ? ref4 : _this.config("responsive_debounce")) ? ref3 : 100, reset = function() {
                        if (timeout) return clearTimeout(timeout), timeout = null
                    }, run = function() {
                        return jQuery("img." + responsiveClass).cloudinary_update(responsiveConfig)
                    }, wait = function() {
                        return reset(), setTimeout(function() {
                            return reset(), run()
                        }, debounce)
                    }, debounce ? wait() : run()
                }
            }(this))
        }, CloudinaryJQuery
    }(Cloudinary),
    jQuery.fn.cloudinary = function(options) {
        return this.filter("img").each(function() {
            var img_options, public_id, url;
            return img_options = jQuery.extend({
                width: jQuery(this).attr("width"),
                height: jQuery(this).attr("height"),
                src: jQuery(this).attr("src")
            }, jQuery(this).data(), options), public_id = img_options.source || img_options.src, delete img_options.source, delete img_options.src, url = jQuery.cloudinary.url(public_id, img_options), img_options = new Transformation(img_options).toHtmlAttributes(), jQuery(this).data("src-cache", url).attr({
                width: img_options.width,
                height: img_options.height
            })
        }).cloudinary_update(options), this
    }, jQuery.fn.cloudinary_update = function(options) {
        return null == options && (options = {}), jQuery.cloudinary.cloudinary_update(this.filter("img").toArray(), options), this
    }, webp = null, jQuery.fn.webpify = function(options, webp_options) {
        var that, webp_canary;
        return null == options && (options = {}), that = this, webp_options = null != webp_options ? webp_options : options, webp || (webp = jQuery.Deferred(), webp_canary = new Image, webp_canary.onerror = webp.reject, webp_canary.onload = webp.resolve, webp_canary.src = "data:image/webp;base64,UklGRi4AAABXRUJQVlA4TCEAAAAvAUAAEB8wAiMwAgSSNtse/cXjxyCCmrYNWPwmHRH9jwMA"), jQuery(function() {
            return webp.done(function() {
                return jQuery(that).cloudinary(jQuery.extend({}, webp_options, {
                    format: "webp"
                }))
            }).fail(function() {
                return jQuery(that).cloudinary(options)
            })
        }), this
    }, jQuery.fn.fetchify = function(options) {
        return this.cloudinary(jQuery.extend(options, {
            type: "fetch"
        }))
    }, jQuery.cloudinary = new CloudinaryJQuery, jQuery.cloudinary.fromDocument(), cloudinary = {
        utf8_encode: utf8_encode,
        crc32: crc32,
        Util: Util,
        Condition: Condition,
        Transformation: Transformation,
        Configuration: Configuration,
        HtmlTag: HtmlTag,
        ImageTag: ImageTag,
        VideoTag: VideoTag,
        ClientHintsMetaTag: ClientHintsMetaTag,
        Layer: Layer,
        FetchLayer: FetchLayer,
        TextLayer: TextLayer,
        SubtitlesLayer: SubtitlesLayer,
        Cloudinary: Cloudinary,
        VERSION: "2.5.0",
        CloudinaryJQuery: CloudinaryJQuery
    }
});
//# sourceMappingURL=cloudinary-jquery.min.js.map